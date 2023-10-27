# libffi

ポータブル外部関数インターフェイスライブラリ

本マニュアルは、ポータブルな外部関数インターフェイスライブラリであるlibffiライブラリのためのものです。

## コピーライト

Copyright 2008--2019, 2021, 2022 Anthony Green and Red Hat, Inc.

本ソフトウェアおよび関連文書ファイル（以下「本ソフトウェア」）の複製物を入手する者に対し、本ソフトウェアの複製物の使用、複製、変更、結合、出版、頒布、サブライセンス、および/または販売する権利を含むがこれらに限定されない、本ソフトウェアを無制限に取り扱うこと、および本ソフトウェアを提供される者にこれを許可することを、以下の条件に従い、無償で許可します：

上記の著作権表示および本許諾表示は、本ソフトウェアのすべての複製物または相当部分に含まれるものとします。

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## libffiとは？

高級言語用のコンパイラーは、特定の規約に従ったコードを生成する。これらの規約は、部分的には、個別コンパイルが機能するために必要なものである。  そのような規約のひとつに呼び出し規約がある。  呼び出し規約とは、関数の引数が関数に入るときにどこにあるかをコンパイラが仮定したものです。  呼び出し規約はまた、関数の戻り値がどこにあるかについても指定します。  呼び出し規約はABI（Application Binary Interface）と呼ばれることもあります。

プログラムによっては、関数にどのような引数を渡せばよいのか、コンパイル時に分からない場合があります。  libffiは、このようなプログラムにおいて、インタプリタ・プログラムからコンパイル済みコードへの橋渡しをするために使用することができます。

libffiライブラリーは、さまざまな呼び出し規約に対する移植性の高い高レベルプログラミングインターフェースを提供する。  これにより、プログラマーは実行時に呼び出しインターフェイス記述で指定された任意の関数を呼び出すことができます。

FFIとは、Foreign Function Interface（外国関数インターフェース）の略です。  外国関数インターフェースは、ある言語で書かれたコードが別の言語で書かれたコードを呼び出すことを可能にするインターフェースの一般的な名称です。libffiライブラリーは、実際には、完全な機能を持つ外部関数インターフェースの最下層、マシン依存のレイヤーを提供するだけである。  libffiの上には、2つの言語間で渡される値の型変換を処理する層が存在しなければならない。

## 基本

libffiは、呼び出したい関数へのポインタがあり、その関数に渡す引数の数と型、関数の戻り値の型がわかっていることを前提としています。

最初にしなければならないことは、呼び出したい関数のシグネチャにマッチするffi_cifオブジェクトを作成することです。  一つのffi_cifを使って複数の呼び出しを行うのが一般的なので、これは別のステップです。  ffi_cifのcifはCall InterFaceの略である。  コール・インターフェイス・オブジェクトを準備するには、関数ffi_prep_cifを使用する。

### cif

#### `ffi_prep_cif()`

```c
ffi_status ffi_prep_cif (ffi_cif *cif, ffi_abi abi, unsigned int nargs, ffi_type *rtype, ffi_type **argtypes)
```

与えられたパラメーターに従ってcifを初期化する。

- abiは使用するABIで、通常はFFI_DEFAULT_ABIを使用する。  通常はFFI_DEFAULT_ABIを使用する。
- nargsは、この関数が受け付ける引数の数です。
- rtypeは、関数の戻り値の型を表すffi_type構造体へのポインタです。  型。
- argtypesはffi_typeポインタのベクトルである。argtypesはnargs要素を持たなければならない。  nargsが0の場合、この引数は無視される。

ffi_prep_cifはffi_status型のlibffiステータスコードを返す。  ffi_typeオブジェクトが正しくない場合はFFI_BAD_TYPEDEF、 abiパラメータが無効な場合はFFI_BAD_ABIとなる。

呼び出される関数がバリアディック(varargs)の場合、ffi_prep_cifの代わりにffi_prep_cif_varを使わなければならない。

#### `ffi_prep_cif_var()`

```c
ffi_status ffi_prep_cif_var (ffi_cif *cif, ffi_abi abi, unsigned int nfixedargs, unsigned int ntotalargs, ffi_type *rtype, ffi_type **argtypes)
```

これは、与えられたパラメータに従ってcifを初期化するもので、バリアド関数の呼び出しに対応する。  一般的に、この操作はffi_prep_cifと同じである。:

- nfixedargsは、可変引数の前の固定引数の数である。  ゼロより大きくなければならない。
- ntotalargs 変数引数と固定引数を含む引数の総数。  argtypesはこれだけの要素を持たなければならない。

ffi_prep_cif_var は、変数引数の型が ffi_type_float (最初に ffi_type_double に昇格)、または int よりも小さい整数型 (最初に int サイズの型に昇格) の場合、FFI_BAD_ARGTYPE を返す。

異なる数の引数が渡された場合、同じ関数の呼び出しに対して異なるcifを準備しなければならないことに注意。

また、ffi_prep_cif_varをnfixedargs=nototalargsで呼び出すことは、ffi_prep_cifを呼び出すことと等価ではないことに注意。

結果として得られるffi_cifは、初期化時に使用されたすべてのffi_typeオブジェクトへのポインタを保持していることに注意してください。  これらの型オブジェクトの寿命は、少なくともffi_cifの寿命と同じになるようにしなければならない。

初期化されたffi_cifを使って関数を呼び出すには、ffi_call関数を使います：

#### `ffi_call()`

```c
void ffi_call (ffi_cif *cif, void *fn, void *rvalue, void **avalues)
```

これは、cifで与えられた説明に従って関数fnを呼び出す。  cifはすでにffi_prep_cifで準備されていなければならない。

rvalueは、関数呼び出しの結果を保持するメモリチャンクへのポインタである。  これは、結果を保持するのに十分な大きさでなければならず、システム・レジスタ・サイズ（一般に32ビットまたは64ビット）より小さくはならず、適切にアラインされていなければならない。  cifが（ffi_type_voidを使って）関数はvoidを返すと宣言した場合、rvalueは無視される。

ほとんどの場合、libffiはABIに従ってプロモーションを処理する。  しかし、歴史的な理由から、コードで処理しなければならない戻り値の特殊なケースがある。  特に、システム・レジスタ・サイズより狭い積分型（構造体ではない）については、libffiによって返り値が広げられる。  libffiはffi_argという戻り値型として使える型を提供している。  例えば、CIFがcharの戻り値型で定義された場合、libffiは完全なffi_argを戻り値に格納しようとする。

avaluesは@code{void *}ポインタのベクトルで、呼び出しの引数値を保持するメモリ・ロケーションを指す。  cifが関数に引数がないと宣言した場合（つまりnargsが0だった場合）、avaluesは無視される。

戻り値はレジスタサイズでなければならないが、引数は宣言された型と正確に一致しなければならないことに注意。  例えば、引数がshortの場合、avaluesのエントリーはshortとして宣言されたオブジェクトを指すべきである。しかし、戻り値の型がshortの場合、rvalueはより大きな型として宣言されたオブジェクト（通常はffi_arg）を指すべきである。


## 簡単な例

以下は、プットを数回呼び出す些細な例である。

```c
#include <stdio.h>
#include <ffi.h>

int main()
{
  ffi_cif cif;
  ffi_type *args[1];
  void *values[1];
  char *s;
  ffi_arg rc;

  /* Initialize the argument info vectors */
  args[0] = &ffi_type_pointer;
  values[0] = &s;

  /* Initialize the cif */
  if (ffi_prep_cif(&cif, FFI_DEFAULT_ABI, 1,
		       &ffi_type_sint, args) == FFI_OK)
    {
      s = "Hello World!";
      ffi_call(&cif, puts, &rc, values);
      /* rc now holds the result of the call to puts */

      /* values holds a pointer to the function's arg, so to
         call puts() again all we need to do is change the
         value of s */
      s = "This is cool!";
      ffi_call(&cif, puts, &rc, values);
    }

  return 0;
}
```


## 型

### プリミティブ・タイプ

Libffiは、引数や戻り値の型を記述するために使用できる多くの組み込み型記述子を提供しています：


| 名前                        | 説明                                                                                                                                                                                                       |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ffi_type_void               | The type void.  This cannot be used for argument types, only for return values.                                                                                                                            |
| ffi_type_uint8              | An unsigned, 8-bit integer type.                                                                                                                                                                           |
| ffi_type_sint8              | A signed, 8-bit integer type.                                                                                                                                                                              |
| ffi_type_uint16             | An unsigned, 16-bit integer type.                                                                                                                                                                          |
| ffi_type_sint16             | A signed, 16-bit integer type.                                                                                                                                                                             |
| ffi_type_uint32             | An unsigned, 32-bit integer type.                                                                                                                                                                          |
| ffi_type_sint32             | A signed, 32-bit integer type.                                                                                                                                                                             |
| ffi_type_uint64             | An unsigned, 64-bit integer type.                                                                                                                                                                          |
| ffi_type_sint64             | A signed, 64-bit integer type.                                                                                                                                                                             |
| ffi_type_float              | The C float type.                                                                                                                                                                                          |
| ffi_type_double             | The C double type.                                                                                                                                                                                         |
| ffi_type_uchar              | The C unsigned char type.                                                                                                                                                                                  |
| ffi_type_schar              | The C signed char type.  (Note that there is not an exact equivalent to the C char type in libffi; ordinarily you should either use ffi_type_schar or ffi_type_uchar depending on whether char is signed.) |
| ffi_type_ushort             | The C unsigned short type.                                                                                                                                                                                 |
| ffi_type_sshort             | The C short type.                                                                                                                                                                                          |
| ffi_type_uint               | The C unsigned int type.                                                                                                                                                                                   |
| ffi_type_sint               | The C int type.                                                                                                                                                                                            |
| ffi_type_ulong              | The C unsigned long type.                                                                                                                                                                                  |
| ffi_type_slong              | The C long type.                                                                                                                                                                                           |
| ffi_type_longdouble         | On platforms that have a C long double type, this is defined. On other platforms, it is not.                                                                                                               |
| ffi_type_pointer            | A generic `void *` pointer.  You should use this for all pointers, regardless of their real type.                                                                                                          |
| ffi_type_complex_float      | The C _Complex float type.                                                                                                                                                                                 |
| ffi_type_complex_double     | The C _Complex double type.                                                                                                                                                                                |
| ffi_type_complex_longdouble | The C _Complex long double type. On platforms that have a C long double type, this is defined. On other platforms, it is not.                                                                              |


それぞれffi_type型なので、ffi_prep_cifに渡すときはアドレスを取る必要がある。


### 構造体

libffi は構造体の受け渡しを完璧にこなします。まず、 libffi に新しい ffi_type オブジェクトを作成して構造を記述する必要があります。

#### ffi_type

ffi_typeには以下のメンバがある。:

|メンバ|説明|
|---|---|
| size_t size | これはlibffiによって設定されるので、ゼロに初期化する必要がある。 |
| unsigned short alignment | これはlibffiによって設定されるので、ゼロに初期化する必要がある。 |
| unsigned short type | 構造体の場合は、FFI_TYPE_STRUCT に設定する。 |
| ffi_type **elements | これはffi_typeオブジェクトへのポインタのNULL終端の配列である。  構造体のフィールドごとに1つの要素があります。 |

libffiはビットフィールドを特別にサポートしていないことに注意。  これらを手動で管理する必要がある。

サイズとアライメントのフィールドは、必要に応じてffi_prep_cifまたはffi_prep_cif_varによって埋められる。

### サイズとアライメント

libffiはffi_typeオブジェクトのサイズとアライメントのフィールドをあなたに代わって設定します。  これは
の知識を使って行います。

libffiによって設定された型に対して、これらのフィールドを単純に読み取ることができると思うかもしれない。  しかし、いくつかの注意点がある。

- いくつかの組み込み型のサイズやアライメントは、選択したABIによって異なる場合がある。
- 新しい構造体タイプのサイズとアライメントは、ffi_prep_cif または ffi_get_struct_offsets に渡されるまで libffi によって設定されない。
- 構造体タイプをABI間で共有することはできない。  代わりに、各ABIは構造体型の独自のコピーを必要とする。

したがって、これらのフィールドを調べる前に、まずffi_typeオブジェクトをffi_prep_cifかffi_get_struct_offsetsに渡すのが一番安全である。  この関数は必要なセットアップをすべて行ってくれる。

```c
ffi_type *desired_type;
ffi_abi desired_abi;

ffi_cif cif;
if (ffi_prep_cif (&cif, desired_abi, 0, desired_type, NULL) == FFI_OK)
{
    size_t size = desired_type->size;
    unsigned short alignment = desired_type->alignment;
}
```

libffiは、構造体のメンバーのオフセットを取得する方法も提供している。

#### `ffi_get_struct_offsets()`

```c
ffi_status ffi_get_struct_offsets (ffi_abi abi, ffi_type *struct_type, size_t *offsets)
```

指定された構造体タイプの各要素のオフセットを計算する。abiは使用するABIで、レイアウトがABIに依存する場合があるため必要である。

offsetsはoutパラメータである。  呼び出し側は、すべての結果を書き込むのに十分なスペース（struct_typeの各要素型につき1要素）を提供する責任を負う。  offsetsがNULLの場合、型はレイアウトされるが、それ以外は変更されない。  これは、前述のように型のサイズやレイアウトにアクセスするのに便利である。

abi が無効な場合は FFI_BAD_ABI、 struct_type が何らかの方法で無効な場合は FFI_BAD_TYPEDEF を返す。  ここではFFI_STRUCT型のみが有効であることに注意。


### 配列 ユニオン 列挙型

#### Arrays

libffiは配列やユニオンを直接サポートしていない。しかし、これらは構造体を使用してエミュレートすることができます。

配列をエミュレートするには、単に FFI_TYPE_STRUCT を使って、配列の要素と同じ数のメンバを持つ ffi_type を作成します。

```c
ffi_type array_type;
ffi_type **elements
int i;

elements = malloc ((n + 1) * sizeof (ffi_type *));
for (i = 0; i < n; ++i)
  elements[i] = array_element_type;
elements[n] = NULL;

array_type.size = array_type.alignment = 0;
array_type.type = FFI_TYPE_STRUCT;
array_type.elements = elements;
```

このように作成された構造体型は、実際のFFI_TYPE_STRUCTオブジェクトのメンバを参照するためにのみ使用されるべきである。

しかし、このようなニセの配列型を引数や戻り値の型として使用しても、libffiがエラーを起こすことはありません。  これは混乱を招くかもしれません。

#### Unions

ユニオンはFFI_TYPE_STRUCTを使ってエミュレートすることもできる。  しかしこの場合、サイズとアライメントがユニオンの実際の要求と一致するようにしなければなりません。

これを行う1つの簡単な方法は、各要素型がレイアウトされていることを確認することです。  それから、新しい構造体タイプに1つの要素、最大の要素のサイズ、同様に見られる最大のアライメントを与える。

この例では、ffi_prep_cifのトリックを使って、各要素型がレイアウトされていることを確認している。

```c
ffi_abi desired_abi;
ffi_type union_type;
ffi_type **union_elements;

int i;
ffi_type element_types[2];

element_types[1] = NULL;

union_type.size = union_type.alignment = 0;
union_type.type = FFI_TYPE_STRUCT;
union_type.elements = element_types;

for (i = 0; union_elements[i]; ++i)
{
    ffi_cif cif;
    if (ffi_prep_cif (&cif, desired_abi, 0, union_elements[i], NULL) == FFI_OK)
    {
        if (union_elements[i]->size > union_type.size)
        {
            union_type.size = union_elements[i];
            size = union_elements[i]->size;
        }
        if (union_elements[i]->alignment > union_type.alignment)
          union_type.alignment = union_elements[i]->alignment;
    }
}
```

#### 列挙体

libffi は C の列挙型を特別にサポートしていません。どの列挙型も特定の基礎となる積分型を使用して実装されていますが、どの型が使用されるかは libffi では正確に決定できません -- 列挙型の値や、-fshort-enums などのコンパイラフラグに依存する場合があります。GCCが列挙型をどのように扱うかについての詳細は、構造体の列挙型とビットフィールドの実装, , , gccを参照してください。

### タイプ例

次の例では、Linuxのtime.hのtm構造体を表すffi_typeオブジェクトを初期化している。

以下は、構造体の定義方法である：

```c
struct tm {
    int tm_sec;
    int tm_min;
    int tm_hour;
    int tm_mday;
    int tm_mon;
    int tm_year;
    int tm_wday;
    int tm_yday;
    int tm_isdst;
    /* Those are for future use. */
    long int __tm_gmtoff__;
    __const char *__tm_zone__;
};
```

以下は、この構造体をlibffiに記述するための対応するコードである：

```c
    {
      ffi_type tm_type;
      ffi_type *tm_type_elements[12];
      int i;

      tm_type.size = tm_type.alignment = 0;
      tm_type.type = FFI_TYPE_STRUCT;
      tm_type.elements = &tm_type_elements;

      for (i = 0; i < 9; i++)
          tm_type_elements[i] = &ffi_type_sint;

      tm_type_elements[9] = &ffi_type_slong;
      tm_type_elements[10] = &ffi_type_pointer;
      tm_type_elements[11] = NULL;

      /* tm_type can now be used to represent tm argument types and
	 return types for ffi_prep_cif() */
    }
```

### Complex Types

libffi は、組み込み型記述子 ffi_type_complex_float、 ffi_type_complex_double、 ffi_type_complex_longdouble を使って、 C99 標準 _Complex float、 _Complex double、 _Complex long double で定義された複素数型をサポートしています。

_Complex intのようなカスタムの複合型も使えます。libffi に複合型を記述するために、ffi_type オブジェクトを定義する必要があります。

|メンバ|説明|
|---|---|
| size_t size | This must be manually set to the size of the complex type. |
| unsigned short alignment | This must be manually set to the alignment of the complex type. |
| unsigned short type | For a complex type, this must be set to FFI_TYPE_COMPLEX. |
| ffi_type **elements |  This is a NULL-terminated array of pointers to ffi_type objects.  The first element is set to the ffi_type of the complex's base type.  The second element must be set to NULL. |

複素数の例のセクションでは、プラットフォームに依存しない方法でサイズとアライメントメンバーを決定する方法を示している。

libffiにまだ複素数のサポートがないプラットフォームでは、関数ffi_prep_cifとffi_prep_argsは複素数型に遭遇するとプログラムを中断します。

### Complex Type Example

This example demonstrates how to use complex types:

```c
#include <stdio.h>
#include <ffi.h>
#include <complex.h>

void complex_fn(_Complex float cf,
                _Complex double cd,
                _Complex long double cld)
{
  printf("cf=%f+%fi\ncd=%f+%fi\ncld=%f+%fi\n",
         (float)creal (cf), (float)cimag (cf),
         (float)creal (cd), (float)cimag (cd),
         (float)creal (cld), (float)cimag (cld));
}

int main()
{
  ffi_cif cif;
  ffi_type *args[3];
  void *values[3];
  _Complex float cf;
  _Complex double cd;
  _Complex long double cld;

  /* Initialize the argument info vectors */
  args[0] = &ffi_type_complex_float;
  args[1] = &ffi_type_complex_double;
  args[2] = &ffi_type_complex_longdouble;
  values[0] = &cf;
  values[1] = &cd;
  values[2] = &cld;

  /* Initialize the cif */
  if (ffi_prep_cif(&cif, FFI_DEFAULT_ABI, 3,
                   &ffi_type_void, args) == FFI_OK)
    {
      cf = 1.0 + 20.0 * I;
      cd = 300.0 + 4000.0 * I;
      cld = 50000.0 + 600000.0 * I;
      /* Call the function */
      ffi_call(&cif, (void (*)(void))complex_fn, 0, values);
    }

  return 0;
}
```

This is an example for defining a custom complex type descriptor
for compilers that support them:

```c
/*
 * This macro can be used to define new complex type descriptors
 * in a platform independent way.
 *
 * name: Name of the new descriptor is ffi_type_complex_<name>.
 * type: The C base type of the complex type.
 */
#define FFI_COMPLEX_TYPEDEF(name, type, ffitype)             \
  static ffi_type *ffi_elements_complex_##name [2] = {      \
    (ffi_type *)(&ffitype), NULL                             \
  };                                                        \
  struct struct_align_complex_##name {                      \
    char c;                                                  \
    _Complex type x;                                         \
  };                                                        \
  ffi_type ffi_type_complex_##name = {                      \
    sizeof(_Complex type),                                   \
    offsetof(struct struct_align_complex_##name, x),         \
    FFI_TYPE_COMPLEX,                                        \
    (ffi_type **)ffi_elements_complex_##name                 \
  }

/* Define new complex type descriptors using the macro: */
/* ffi_type_complex_sint */
FFI_COMPLEX_TYPEDEF(sint, int, ffi_type_sint);
/* ffi_type_complex_uchar */
FFI_COMPLEX_TYPEDEF(uchar, unsigned char, ffi_type_uint8);
```

The new type descriptors can then be used like one of the built-in type descriptors in the previous example.

### Multiple ABIs

A given platform may provide multiple different ABIs at once.  For instance, the x86 platform has both stdcall and fastcall functions.

libffi provides some support for this.  However, this is necessarily platform-specific.

### The Closure API

libffiは汎用関数を書く方法も提供している。任意の引数の組み合わせを受け入れ、デコードできる関数。これはインタープリターを書くときや、任意の関数のラッパーを提供するときに便利だ。

この機能はクロージャAPIと呼ばれる。クロージャはすべてのプラットフォームでサポートされているわけではありません。現在のプラットフォームでサポートされているかどうかは、FFI_CLOSURES定義で確認できます。

クロージャは実行時に小さな関数をアセンブルすることで動作するため、実行不可能なヒープを持つプラットフォームでは特別な割り当てが必要になる。  クロージャのメモリー管理は、2つの関数によって処理される：

#### `ffi_closure_alloc()`

```c
void *ffi_closure_alloc (size_t size, void **code)
```

サイズ・バイトのメモリチャンクを確保する。  これは書き込み可能なアドレスへのポインタを返し、*codeを対応する実行可能アドレスに設定する。

sizeはffi_closureオブジェクトを保持するのに十分でなければならない。


#### `ffi_closure_free()`

```c
void ffi_closure_free (void *writable)
```

ffi_closure_alloc を使って割り当てられたメモリーを解放する。  引数は返された書き込み可能なアドレスである。

Once you have allocated the memory for a closure, you must construct a ffi_cif describing the function call.  Finally you can prepare the closure function:

#### `ffi_prep_closure_loc()`

```c
ffi_status ffi_prep_closure_loc (ffi_closure *closure, ffi_cif *cif, void (*fun) (ffi_cif *cif, void *ret, void **args, void *user_data), void *user_data, void *codeloc)
```

クロージャー関数を準備する。  ffi_prep_closure_locの引数は以下の通り：

|引数名|説明|
|---|---|
| closure | The address of a ffi_closure object; this is the writable address returned by ffi_closure_alloc. |
| cif | The ffi_cif describing the function parameters.  Note that this object, and the types to which it refers, must be kept alive until the closure itself is freed. |
| user_data | An arbitrary datum that is passed, uninterpreted, to your closure function. |
| codeloc | The executable address returned by ffi_closure_alloc. |
| fun | The function which will be called when the closure is invoked.  It is called with the arguments: |
| cif | The ffi_cif passed to ffi_prep_closure_loc. |
| ret | A pointer to the memory used for the function's return value. If the function is declared as returning void, then this value is garbage and should not be used. Otherwise, fun must fill the object to which this points, following the same special promotion behavior as ffi_call. That is, in most cases, ret points to an object of exactly the size of the type specified when cif was constructed.  However, integral types narrower than the system register size are widened.  In these cases your program may assume that ret points to an ffi_arg object. |
| args | A vector of pointers to memory holding the arguments to the function. |
| user_data | The same user_data that was passed to ffi_prep_closure_loc. |

ffi_prep_closure_loc will return FFI_OK if everything went ok, and one of the other ffi_status values on error.

After calling ffi_prep_closure_loc, you can cast codeloc to the appropriate pointer-to-function type.

You may see old code referring to ffi_prep_closure.  This function is deprecated, as it cannot handle the need for separate writable and executable addresses.

### Closure Example

A trivial example that creates a new puts by binding
fputs with stdout.

```c
#include <stdio.h>
#include <ffi.h>

/* Acts like puts with the file given at time of enclosure. */
void puts_binding(ffi_cif *cif, void *ret, void* args[],
                  void *stream)
{
  *(ffi_arg *)ret = fputs(*(char **)args[0], (FILE *)stream);
}

typedef int (*puts_t)(char *);

int main()
{
  ffi_cif cif;
  ffi_type *args[1];
  ffi_closure *closure;

  void *bound_puts;
  int rc;

  /* Allocate closure and bound_puts */
  closure = ffi_closure_alloc(sizeof(ffi_closure), &bound_puts);

  if (closure)
    {
      /* Initialize the argument info vectors */
      args[0] = &ffi_type_pointer;

      /* Initialize the cif */
      if (ffi_prep_cif(&cif, FFI_DEFAULT_ABI, 1,
                       &ffi_type_sint, args) == FFI_OK)
        {
          /* Initialize the closure, setting stream to stdout */
          if (ffi_prep_closure_loc(closure, &cif, puts_binding,
                                   stdout, bound_puts) == FFI_OK)
            {
              rc = ((puts_t)bound_puts)("Hello World!");
              /* rc now holds the result of the call to fputs */
            }
        }
    }

  /* Deallocate both closure, and bound_puts */
  ffi_closure_free(closure);

  return 0;
}
```

### Thread Safety

libffi is not completely thread-safe.  However, many parts are, and if you follow some simple rules, you can use it safely in a multi-threaded program.

ffi_prep_cif may modify the ffi_type objects passed to it.  It is best to ensure that only a single thread prepares a given ffi_cif at a time.

On some platforms, ffi_prep_cif may modify the size and alignment of some types, depending on the chosen ABI.  On these platforms, if you switch between ABIs, you must ensure that there is only one call to ffi_prep_cif at a time.

Currently the only affected platform is PowerPC and the only affected type is long double.


### Memory Usage

Note that memory allocated by ffi_closure_alloc and freed by ffi_closure_free does not come from the same general pool of memory that malloc and free use.  To accomodate security settings, libffi may aquire memory, for example, by mapping temporary files into multiple places in the address space (once to write out the closure, a second to execute it).  The search follows this list, using the first that works:

- A anonymous mapping (i.e. not file-backed)
- memfd_create(), if the kernel supports it.
- A file created in the directory referenced by the environment variable LIBFFI_TMPDIR.
- Likewise for the environment variable TMPDIR.
- A file created in /tmp.
- A file created in /var/tmp.
- A file created in /dev/shm.
- A file created in the user's home directory ($HOME).
- A file created in any directory listed in /etc/mtab.
- A file created in any directory listed in @code{/proc/mounts}.


If security settings prohibit using any of these for closures, ffi_closure_alloc will fail.

### Missing Features

libffi is missing a few features.  We welcome patches to add support for these.

- Variadic closures.
- There is no support for bit fields in structures.
- The raw API is undocumented.
- The Go API is undocumented.