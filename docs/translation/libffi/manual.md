# libffi

ポータブル外部関数インターフェイスライブラリ

本マニュアルはポータブルな外部関数インターフェイスライブラリであるlibffiライブラリのためのものです。

## コピーライト

Copyright 2008--2019, 2021, 2022 Anthony Green and Red Hat, Inc.

本ソフトウェアおよび関連文書ファイル（以下「本ソフトウェア」）の複製物を入手する者に対し、本ソフトウェアの複製物の使用、複製、変更、結合、出版、頒布、サブライセンス、および/または販売する権利を含むがこれらに限定されない、本ソフトウェアを無制限に取り扱うこと、および本ソフトウェアを提供される者にこれを許可することを、以下の条件に従い、無償で許可します：

上記の著作権表示および本許諾表示は、本ソフトウェアのすべての複製物または相当部分に含まれるものとします。

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## libffiとは

高級言語用のコンパイラーは特定の規約に従ったコードを生成する。これらの規約は、部分的には個別コンパイルが機能するために必要なものである。そのような規約のひとつに呼び出し規約がある。呼び出し規約とは、関数の引数が関数に入るときにどこにあるかをコンパイラが仮定したものです。呼び出し規約はまた、関数の戻り値がどこにあるかについても指定します。呼び出し規約はABI（Application Binary Interface）と呼ばれることもあります。

プログラムによっては関数にどのような引数を渡せばよいのか、コンパイル時に分からない場合があります。libffiは、このようなプログラムにおいて、インタプリタ・プログラムからコンパイル済みコードへの橋渡しをするために使用することができます。

libffiライブラリーは、さまざまな呼び出し規約に対する移植性の高い高レベルプログラミングインターフェースを提供する。これにより、プログラマーは実行時に呼び出しインターフェイス記述で指定された任意の関数を呼び出すことができます。

FFIとは、Foreign Function Interface（外部関数インターフェース）の略です。外部関数インターフェースは、ある言語で書かれたコードが別の言語で書かれたコードを呼び出すことを可能にするインターフェースの一般的な名称です。libffiライブラリーは、実際には、完全な機能を持つ外部関数インターフェースの最下層、マシン依存のレイヤーを提供するだけである。libffiの上には、2つの言語間で渡される値の型変換を処理する層が存在しなければならない。

## 基本

libffi は呼び出したい関数へのポインタがあり、その関数に渡す引数の数と型・関数の戻り値の型がわかっていることを前提としています。

最初にしなければならないことは、呼び出したい関数のシグネチャにマッチするffi_cifオブジェクトを作成することです。一つのffi_cifを使って複数の呼び出しを行うのが一般的なので、これは別のステップです。ffi_cifのcifはCall InterFaceの略である。コール・インターフェイス・オブジェクトを準備するには、関数ffi_prep_cifを使用する。

### cif

#### `ffi_prep_cif()`

```c
ffi_status ffi_prep_cif (ffi_cif *cif, ffi_abi abi, unsigned int nargs, ffi_type *rtype, ffi_type **argtypes)
```

与えられたパラメーターに従ってcifを初期化する。

- abiは使用するABIで、通常はFFI_DEFAULT_ABIを使用する。通常はFFI_DEFAULT_ABIを使用する。
- nargsは、この関数が受け付ける引数の数です。
- rtypeは、関数の戻り値の型を表すffi_type構造体へのポインタです。
- argtypesはffi_typeポインタのベクトルである。argtypesはnargs要素を持たなければならない。nargsが0の場合、この引数は無視される。

ffi_prep_cifはffi_status型のlibffiステータスコードを返す。ffi_typeオブジェクトが正しくない場合はFFI_BAD_TYPEDEF、 abiパラメータが無効な場合はFFI_BAD_ABIとなる。

呼び出される関数がバリアディック(varargs)の場合、ffi_prep_cifの代わりにffi_prep_cif_varを使わなければならない。

#### `ffi_prep_cif_var()`

```c
ffi_status ffi_prep_cif_var (ffi_cif *cif, ffi_abi abi, unsigned int nfixedargs, unsigned int ntotalargs, ffi_type *rtype, ffi_type **argtypes)
```

これは、与えられたパラメータに従ってcifを初期化するもので、バリアド関数の呼び出しに対応する。一般的に、この操作はffi_prep_cifと同じである。:

- nfixedargsは、可変引数の前の固定引数の数である。ゼロより大きくなければならない。
- ntotalargs 変数引数と固定引数を含む引数の総数。argtypesはこれだけの要素を持たなければならない。

ffi_prep_cif_var は、変数引数の型が ffi_type_float (最初に ffi_type_double に昇格)、または int よりも小さい整数型 (最初に int サイズの型に昇格) の場合、FFI_BAD_ARGTYPE を返す。

異なる数の引数が渡された場合、同じ関数の呼び出しに対して異なるcifを準備しなければならないことに注意。

また、ffi_prep_cif_varをnfixedargs=nototalargsで呼び出すことは、ffi_prep_cifを呼び出すことと等価ではないことに注意。

結果として得られるffi_cifは、初期化時に使用されたすべてのffi_typeオブジェクトへのポインタを保持していることに注意してください。これらの型オブジェクトの寿命は、少なくともffi_cifの寿命と同じになるようにしなければならない。

初期化されたffi_cifを使って関数を呼び出すには、ffi_call関数を使います：

#### `ffi_call()`

```c
void ffi_call (ffi_cif *cif, void *fn, void *rvalue, void **avalues)
```

cifで与えられた説明に従って関数fnを呼び出す。cifはすでにffi_prep_cifで準備されていなければならない。

- rvalueは、関数呼び出しの結果を保持するメモリチャンクへのポインタである。これは、結果を保持するのに十分な大きさでなければならず、システム・レジスタ・サイズ（一般に32ビットまたは64ビット）より小さくはならず、適切にアラインされていなければならない。cifが（ffi_type_voidを使って）関数はvoidを返すと宣言した場合、rvalueは無視される。

ほとんどの場合、libffiはABIに従ってプロモーションを処理する。しかし、歴史的な理由から、コードで処理しなければならない戻り値の特殊なケースがある。特に、システム・レジスタ・サイズより狭い積分型（構造体ではない）については、libffiによって返り値が広げられる。libffiはffi_argという戻り値型として使える型を提供している。例えば、CIFがcharの戻り値型で定義された場合、libffiは完全なffi_argを戻り値に格納しようとする。

- avaluesは`void *`ポインタのベクトルで、呼び出しの引数値を保持するメモリ・ロケーションを指す。cifが関数に引数がないと宣言した場合（つまりnargsが0だった場合）、avaluesは無視される。

戻り値はレジスタサイズでなければならないが、引数は宣言された型と正確に一致しなければならないことに注意。例えば、引数がshortの場合、avaluesのエントリーはshortとして宣言されたオブジェクトを指すべきである。しかし、戻り値の型がshortの場合、rvalueはより大きな型として宣言されたオブジェクト（通常はffi_arg）を指すべきである。


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

  /* 引数情報ベクトルを初期化する */
  args[0] = &ffi_type_pointer;
  values[0] = &s;

  /* cifの初期化 */
  if (ffi_prep_cif(&cif, FFI_DEFAULT_ABI, 1,
		       &ffi_type_sint, args) == FFI_OK)
    {
      s = "Hello World!";
      ffi_call(&cif, puts, &rc, values);
      /* rcはプットのコール結果を保持する。 */

      /* の値は関数のargへのポインタを保持しているので、puts()を再び呼び出すために必要なのは、sの値を変更することだけである。 */
      s = "This is cool!";
      ffi_call(&cif, puts, &rc, values);
    }

  return 0;
}
```


## 型

### プリミティブ・タイプ

Libffiは、引数や戻り値の型を記述するために使用できる多くの組み込み型記述子を提供しています：


| 名前                        | 説明                                                                                                                                   |
|-----------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| ffi_type_void               | void型。これは引数型には使用できず、戻り値にのみ使用できる。                                                                                       |
| ffi_type_uint8              | 符号なしの8ビット整数型。                                                                                                                 |
| ffi_type_sint8              | 符号付き8ビット整数型。                                                                                                                 |
| ffi_type_uint16             | 符号なし16ビット整数型。                                                                                                                 |
| ffi_type_sint16             | 符号付き16ビット整数型。                                                                                                                |
| ffi_type_uint32             | 符号なし32ビット整数型。                                                                                                                 |
| ffi_type_sint32             | 符号付き32ビット整数型。                                                                                                                |
| ffi_type_uint64             | 符号なし64ビット整数型。                                                                                                                 |
| ffi_type_sint64             | 符号付き64ビット整数型。                                                                                                                |
| ffi_type_float              | C の浮動小数点型。                                                                                                                   |
| ffi_type_double             | C のdouble型。                                                                                                                       |
| ffi_type_uchar              | C の符号なし char 型。                                                                                                                 |
| ffi_type_schar              | C の符号付き char 型。(libffiには、Cのchar型と正確に等価なものがないことに注意してください。通常、charが符号付きかどうかによって、ffi_type_scharかffi_type_ucharを使うべきです。) |
| ffi_type_ushort             | C の符号なし short 型。                                                                                                                |
| ffi_type_sshort             | C の short 型。                                                                                                                      |
| ffi_type_uint               | C の符号なし int 型。                                                                                                                  |
| ffi_type_sint               | C の int 型。                                                                                                                        |
| ffi_type_ulong              | C の符号なし long 型。                                                                                                                 |
| ffi_type_slong              | C の long 型。                                                                                                                       |
| ffi_type_longdouble         | Cのlong double型を持つプラットフォームでは、これは定義されている。その他のプラットフォームでは定義されていない。                                                              |
| ffi_type_pointer            | 汎用 `void *` ポインタ。実際の型に関係なく、すべてのポインタにこれを使うべきである。                                                                          |
| ffi_type_complex_float      | C _Complex float型。                                                                                                                |
| ffi_type_complex_double     | C の _Complex double型。                                                                                                             |
| ffi_type_complex_longdouble | C _Complex long double型。 Cのlong double型を持つプラットフォームでは、これは定義されている。他のプラットフォームでは定義されていない。                                      |


それぞれffi_type型なので、ffi_prep_cifに渡すときはアドレスを取る必要がある。


### 構造体

libffi は構造体の受け渡しを完璧にこなします。まず、 libffi に新しい ffi_type オブジェクトを作成して構造を記述する必要があります。

#### ffi_type

ffi_typeには以下のメンバがある。:

| メンバ                      | 説明                                                                    |
|--------------------------|-----------------------------------------------------------------------|
| size_t size              | これはlibffiによって設定されるので、ゼロに初期化する必要がある。                          |
| unsigned short alignment | これはlibffiによって設定されるので、ゼロに初期化する必要がある。                          |
| unsigned short type      | 構造体の場合は、FFI_TYPE_STRUCT に設定する。                               |
| ffi_type **elements      | これはffi_typeオブジェクトへのポインタのNULL終端の配列である。構造体のフィールドごとに1つの要素があります。 |

libffiはビットフィールドを特別にサポートしていないことに注意。これらを手動で管理する必要がある。

サイズとアライメントのフィールドは、必要に応じてffi_prep_cifまたはffi_prep_cif_varによって埋められる。

### サイズとアライメント

libffiはffi_typeオブジェクトのサイズとアライメントのフィールドをあなたに代わって設定します。

libffiによって設定された型に対して、これらのフィールドを単純に読み取ることができると思うかもしれない。しかし、いくつかの注意点がある。

- いくつかの組み込み型のサイズやアライメントは、選択したABIによって異なる場合がある。
- 新しい構造体タイプのサイズとアライメントは、ffi_prep_cif または ffi_get_struct_offsets に渡されるまで libffi によって設定されない。
- 構造体タイプをABI間で共有することはできない。代わりに、各ABIは構造体型の独自のコピーを必要とする。

したがって、これらのフィールドを調べる前に、まずffi_typeオブジェクトをffi_prep_cifかffi_get_struct_offsetsに渡すのが一番安全である。この関数は必要なセットアップをすべて行ってくれる。

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

offsetsはoutパラメータである。呼び出し側は、すべての結果を書き込むのに十分なスペース（struct_typeの各要素型につき1要素）を提供する責任を負う。offsetsがNULLの場合、型はレイアウトされるが、それ以外は変更されない。これは、前述のように型のサイズやレイアウトにアクセスするのに便利である。

abi が無効な場合は FFI_BAD_ABI、 struct_type が何らかの方法で無効な場合は FFI_BAD_TYPEDEF を返す。ここではFFI_STRUCT型のみが有効であることに注意。


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

しかし、このようなニセの配列型を引数や戻り値の型として使用しても、libffiがエラーを起こすことはありません。これは混乱を招くかもしれません。

#### Unions

ユニオンはFFI_TYPE_STRUCTを使ってエミュレートすることもできる。しかしこの場合、サイズとアライメントがユニオンの実際の要求と一致するようにしなければなりません。

これを行う1つの簡単な方法は、各要素型がレイアウトされていることを確認することです。それから、新しい構造体タイプに1つの要素、最大の要素のサイズ、同様に見られる最大のアライメントを与える。

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
    /* 将来のため */
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

      /* tm_type が ffi_prep_cif() の tm 引数型と戻り値の型を表すのに使えるようになった。 */
    }
```

### Complex型

libffi は、組み込み型記述子 ffi_type_complex_float、 ffi_type_complex_double、 ffi_type_complex_longdouble を使って、 C99 標準 _Complex float、 _Complex double、 _Complex long double で定義された複素数型をサポートしています。

_Complex intのようなカスタムの複合型も使えます。libffi にComplex型を記述するために、ffi_type オブジェクトを定義する必要があります。

| メンバ                      | 説明                                                                                                                                                                            |
|--------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| size_t size              | これはComplex型のサイズに手動で設定しなければならない。                                                                                                                  |
| unsigned short alignment | これはComplex型のアライメントに手動で設定しなければならない。                                                                                                            |
| unsigned short type      | Complex型の場合は、FFI_TYPE_COMPLEXに設定しなければならない。                                                                                                                   |
| ffi_type **elements      | これはffi_typeオブジェクトへのポインタのNULL終端の配列である。最初の要素にはComplexの基本型のffi_typeが設定される。2番目の要素はNULLに設定されなければならない。 |

Complexの例のセクションでは、プラットフォームに依存しない方法でサイズとアライメントメンバーを決定する方法を示している。

libffiにまだComplexのサポートがないプラットフォームでは、関数ffi_prep_cifとffi_prep_argsは複素数型に遭遇するとプログラムを中断します。

### Complex 型の例

この例は、Complex型の使い方を示している：

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

  /* 引数情報ベクトルを初期化する */
  args[0] = &ffi_type_complex_float;
  args[1] = &ffi_type_complex_double;
  args[2] = &ffi_type_complex_longdouble;
  values[0] = &cf;
  values[1] = &cd;
  values[2] = &cld;

  /* cifの初期化 */
  if (ffi_prep_cif(&cif, FFI_DEFAULT_ABI, 3,
                   &ffi_type_void, args) == FFI_OK)
    {
      cf = 1.0 + 20.0 * I;
      cd = 300.0 + 4000.0 * I;
      cld = 50000.0 + 600000.0 * I;
      /* 関数を呼び出す */
      ffi_call(&cif, (void (*)(void))complex_fn, 0, values);
    }

  return 0;
}
```

これは、カスタム複合型記述子をサポートするコンパイラ用に定義する例である。:

```c
/*
 * このマクロは、プラットフォームに依存しない方法で新しい複合型記述子を定義するために使用できる。
 *
 * name: 新しい記述子の名前はffi_type_complex_<name>である。. type: 複合型のCの基本型。
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

/* マクロを使って新しい複合型記述子を定義する: */
/* ffi_type_complex_sint */
FFI_COMPLEX_TYPEDEF(sint, int, ffi_type_sint);
/* ffi_type_complex_uchar */
FFI_COMPLEX_TYPEDEF(uchar, unsigned char, ffi_type_uint8);
```

新しい型記述子は、前の例の組み込み型記述子のように使うことができる。

### 複数のABI

あるプラットフォームが複数の異なるABIを同時に提供することがある。例えば、x86プラットフォームにはstdcall関数とfastcall関数がある。

libffiはこれをある程度サポートしている。しかし、これは必然的にプラットフォーム固有となる。

### クロージャAPI

libffiは汎用関数を書く方法も提供している。任意の引数の組み合わせを受け入れ、デコードできる関数。これはインタープリターを書くときや、任意の関数のラッパーを提供するときに便利だ。

この機能はクロージャAPIと呼ばれる。クロージャはすべてのプラットフォームでサポートされているわけではありません。現在のプラットフォームでサポートされているかどうかは、FFI_CLOSURES定義で確認できます。

クロージャは実行時に小さな関数をアセンブルすることで動作するため、実行不可能なヒープを持つプラットフォームでは特別な割り当てが必要になる。クロージャのメモリー管理は、2つの関数によって処理される：

#### `ffi_closure_alloc()`

```c
void *ffi_closure_alloc (size_t size, void **code)
```

サイズ・バイトのメモリチャンクを確保する。これは書き込み可能なアドレスへのポインタを返し、*codeを対応する実行可能アドレスに設定する。

sizeはffi_closureオブジェクトを保持するのに十分でなければならない。


#### `ffi_closure_free()`

```c
void ffi_closure_free (void *writable)
```

ffi_closure_alloc を使って割り当てられたメモリーを解放する。引数は返された書き込み可能なアドレスである。

クロージャ用のメモリーを割り当てたら、関数コールを記述するffi_cifを作成しなければならない。最後にクロージャー関数を用意する。:

#### `ffi_prep_closure_loc()`

```c
ffi_status ffi_prep_closure_loc (ffi_closure *closure, ffi_cif *cif, void (*fun) (ffi_cif *cif, void *ret, void **args, void *user_data), void *user_data, void *codeloc)
```

クロージャー関数を準備する。ffi_prep_closure_locの引数は以下の通り：

| 引数名    | 説明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| closure   | これは ffi_closure_alloc が返す書き込み可能なアドレスです。                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| cif       | 関数のパラメータを記述するffi_cif。このオブジェクトと、それが参照する型は、クロージャ自体が解放されるまで生きていなければならないことに注意してください。                                                                                                                                                                                                                                                                                                                                                                                                 |
| user_data | クロージャ関数に解釈されずに渡される任意のデータ。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| codeloc   | ffi_closure_alloc が返す実行可能アドレス。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| fun       | クロージャが呼び出されたときに呼び出される関数。引数とともに呼び出される：                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| cif       | ffi_prep_closure_locに渡されるffi_cif。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ret       | 関数の戻り値に使用されるメモリへのポインタ。関数がvoidを返すと宣言されている場合、この値はガベージであり、使用すべきではありません。そうでない場合、funは、ffi_callと同じ特別なプロモーション動作に従って、この値が指すオブジェクトを埋めなければなりません。つまり、ほとんどの場合、retはcifが構築されたときに指定された型のサイズにぴったりのオブジェクトを指す。しかし、システム・レジスタ・サイズより狭い積分型は拡張される。このような場合、プログラムはretがffi_argオブジェクトを指していると仮定することができる。 |
| args      | 関数の引数を保持するメモリへのポインタのベクトル。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| user_data | ffi_prep_closure_locに渡されたものと同じuser_data。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

ffi_prep_closure_locは、問題がなければFFI_OKを返し、エラーがあれば他のffi_status値のいずれかを返す。

ffi_prep_closure_locを呼び出した後、codelocを適切な関数へのポインタ型にキャストすることができる。

ffi_prep_closureを参照する古いコードを見かけるかもしれません。この関数は、書き込み可能アドレスと実行可能アドレスを別々にする必要性に対応できないため、非推奨となっている。

### クロージャーの例

fputsをstdoutにバインドして新しいputsを作成する些細な例。

```c
#include <stdio.h>
#include <ffi.h>

/* 封入時に与えられたファイルでputsのように動作する。 */
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

  /* クロージャとbound_putsの割り当て */
  closure = ffi_closure_alloc(sizeof(ffi_closure), &bound_puts);

  if (closure)
    {
      /* 引数情報ベクトルを初期化する */
      args[0] = &ffi_type_pointer;

      /* cifの初期化 */
      if (ffi_prep_cif(&cif, FFI_DEFAULT_ABI, 1,
                       &ffi_type_sint, args) == FFI_OK)
        {
          /* クロージャを初期化し、ストリームを標準出力に設定する。 */
          if (ffi_prep_closure_loc(closure, &cif, puts_binding,
                                   stdout, bound_puts) == FFI_OK)
            {
              rc = ((puts_t)bound_puts)("Hello World!");
              /* rcはfputsの呼び出し結果を保持する。 */
            }
        }
    }

  /* クロージャとbound_putsの両方をデアロケートする。 */
  ffi_closure_free(closure);

  return 0;
}
```

### スレッドの安全性

libffiは完全なスレッドセーフではありません。しかし、多くの部分はスレッドセーフであり、いくつかの簡単なルールに従えば、マルチスレッドプログラムで安全に使用することができる。

ffi_prep_cifは渡されたffi_typeオブジェクトを変更することがある。一度に一つのスレッドだけが与えられたffi_cifを準備するようにするのが最善である。

いくつかのプラットフォームでは、ffi_prep_cifは、選択されたABIに応じて、いくつかの型のサイズとアライメントを変更するかもしれない。このようなプラットフォームでは、ABIを切り替えた場合、一度にffi_prep_cifを呼び出すのは1回だけにしなければならない。

現在、影響を受けるプラットフォームはPowerPCのみで、影響を受ける型はlong doubleのみである。


### メモリ使用量

ffi_closure_allocによって割り当てられ、ffi_closure_freeによって解放されるメモリは、mallocとfreeが使用するのと同じ一般的なメモリプールからではないことに注意してください。セキュリティ設定に対応するために、libffiは、例えば、一時ファイルをアドレス空間の複数の場所にマッピングすることによって、メモリを獲得することができる(一度目はクロージャを書き出すために、二度目はそれを実行するために)。検索はこのリストに従い、最初に動作したものを使用する：

- 匿名マッピング（つまりファイルバックされていない）。
- memfd_create()、カーネルがサポートしている場合。
- 環境変数 LIBFFI_TMPDIR が参照するディレクトリに作成されるファイル。
- 環境変数 TMPDIR も同様。
- tmpに作成されるファイル。
- var/tmpに作成されるファイル。
- dev/shmに作成されるファイル。
- ユーザーのホーム・ディレクトリ ($HOME) に作成されるファイル。
- etc/mtabにリストされているディレクトリに作成されるファイル。
- proc/mountsにリストされているディレクトリに作成されたファイル。


セキュリティ設定により、クロージャにこれらのいずれかを使用することが禁止されている場合、ffi_closure_allocは失敗する。

### 欠落している機能

libffiにはいくつかの機能が欠けています。これらのサポートを追加するパッチを歓迎します。

- 可変クロージャ。
- 構造体のビットフィールドをサポートしていない。
- 生の API は文書化されていません。
- Go API は文書化されていません。