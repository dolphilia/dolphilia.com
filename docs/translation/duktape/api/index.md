# Duktape APIリファレンス（日本語訳）

[原文](https://duktape.org/api.html)

## はじめに

バージョン: 2.6.0 (2020-10-13)


### ドキュメントスコープ

Duktape API（duktape.hで定義）は定数とAPIコールのセットで、C/C++プログラムがECMAScriptコードとインターフェースできるようにし、値の表現などの内部詳細から保護するものです。

この文書では、Duktape APIとそのコア・コンセプトに関する簡潔なリファレンスを提供します。Duktapeに初めて触れる方は、まず「Duktapeプログラマーズ・ガイド」をお読みください。


### ブラウザ検索を使った関数の検索

ブラウザ検索（通常はCTRL-F）を使って、検索語の前にドットを付けることで関数定義を検索することができます。例えば、duk_example_func()を探すには、".duk_example_func "を使用します。ほとんどのブラウザでは、関数を定義している実際のセクションのみが検索されるはずです。

### API の安全性

一般的なルールとして、APIコールはすべてのパラメータをチェックし、安全でない動作（クラッシュ）なしにNULL引数や無効な値のスタック・インデックスを許容しています。

一つの大きな例外は、Duktape コンテキストの初期引数である ctx です。特に断りのない限り、これはチェックされず、NULLでないことが要求され、さもなければ安全でない動作が発生する可能性があります。これは、この引数に対する明示的なチェックは、コードのフットプリントを増加させ、実用的な利益をほとんどもたらさないからです。

また、エラー処理のベストプラクティス、特に診断が困難な致命的なエラーにつながるキャッチされないエラーを回避するためにを参照してください。

### APIコールはマクロであってもよい

Duktapeの全てのAPIコールはマクロである可能性があります。あるAPIコールの実装は、互換性のあるリリース間であっても、マクロと実際の関数の間で変更される可能性があります。詳しくは Duktape API を参照してください。

### 最小限のDuktapeプログラム

```c
#include "duktape.h"

int main(int argc, const char *argv[]) {
    duk_context *ctx = duk_create_heap_default();
    if (ctx) {
        duk_eval_string(ctx, "print('Hello world from Javascript!');");
        duk_destroy_heap(ctx);
    }
    return 0;
}
```


## 表記法

### バリュースタック

この文書では、以下のスタック表記を使用します。スタックは、右に行くほど大きくなるように視覚的に表現されます。

例：

```c
duk_push_number(ctx, 123);
duk_push_string(ctx, "foo");
duk_push_true(ctx);
```


スタックは次のようになります。

```
| 123 | "foo" | true |
```


スタック上の要素のうち、操作に影響を与えないものは、1つの要素に省略記号（"..."）を付けて表記しています。

```
| ... |
```


読み取り、書き込み、挿入、削除などアクティブに操作される要素は、背景が白になります。

```
| ... | <obj> | <key> | 
```


APIコールの明示的なインデックスで識別される要素は、スタックのどこにあってもよいことを強調するために、周囲を省略記号で囲んで表示されます。

```
| ... | <obj> | ... | <key> | <value> | 
```


場合によっては、要素のインデックスを括弧内の数値またはシンボル値で強調することがあります。

```
| ... | <val(index)> | <val(index+1)> | ... |
```


スタック変換は矢印と2つのスタックで表現します。

```
| ... | <obj> | ... | <key> | <value> |  ->  | ... | <obj> | ... |
```


## 概念

### ヒープ

ガベージコレクションのための単一の領域です。1つ以上のコンテキストで共有されます。


### コンテキスト

Duktape APIで使用されるハンドルで、Duktapeスレッド（コルーチン）およびそのコールスタックとバリュースタックに関連付けられます。


### コールスタック

コンテキストのアクティブな関数呼び出しチェーンのブックキーピングです。ECMAScriptと Duktape/Cの両方の関数呼び出しが含まれます。

### バリュースタック

コンテキストのコールスタックで、現在のアクティブ化に属するタグ付けされた値のためのストレージです。

バリュースタックに保持される値は、伝統的なタグ付き型です。スタック・エントリーは、最も最近の関数呼び出しの下 (>= 0) または上 (< 0) からインデックスが付けられます。

### バリュースタックのインデックス

非負 (>= 0) のインデックスは、現在のスタックフレームのスタックエントリを、フレームの底を基準にして指します。

```
| 0 | 1 | 2 | 3 | 4 | <5> | 
```


負（< 0）のインデックスは、フレームトップからの相対的なスタックエントリを指します。

```
| -6 | -5 | -4 | -3 | -2 | <-1> | 
```


特殊定数 DUK_INVALID_INDEX は、無効なスタックインデックスを示す負の整数ですこれは API 呼び出しから返されることがあり、また「値がない」ことを示すためにいくつかの API 呼び出しに与えられることがあります。

バリュースタックトップ(または単に「トップ」)は、最高使用インデックスのすぐ上の虚数要素の非負のインデックスです。例えば、最も使用されているインデックスの上は 5 であるので、スタックトップは 6 です。 トップは現在のスタックサイズを示し、スタックにプッシュされる次の要素のインデックスでもあります。

```
| 0 | 1 | 2 | 3 | 4 | <5> | (6) |
```


> API のスタック操作は、常に現在のスタックフレームに限定されます。現在のフレームより下のスタックエントリを参照する方法はない。これは、コールスタック内の関数が互いの値に影響を与えないようにするためで、意図的なものです。


### スタックタイプ

| Type      | Type constant      | Type mask constant      | Description | Heap alloc |
| --------- | ------------------ | ----------------------- | ---- | ---- |
| (none)    | DUK_TYPE_NONE      | DUK_TYPE_MASK_NONE      | no type (missing value, invalid index, etc) | no |
| undefined	| DUK_TYPE_UNDEFINED | DUK_TYPE_MASK_UNDEFINED | undefined | no |
| null      | DUK_TYPE_NULL	     | DUK_TYPE_MASK_NULL      | null | no |
| boolean   | DUK_TYPE_BOOLEAN   | DUK_TYPE_MASK_BOOLEAN   | true and false | no |
| number    | DUK_TYPE_NUMBER    | DUK_TYPE_MASK_NUMBER    | IEEE double | no |
| string    | DUK_TYPE_STRING    | DUK_TYPE_MASK_STRING    | immutable string | yes |
| object    | DUK_TYPE_OBJECT    | DUK_TYPE_MASK_OBJECT    | object with properties | yes |
| buffer    | DUK_TYPE_BUFFER    | DUK_TYPE_MASK_BUFFER    | mutable byte buffer, fixed/dynamic | yes |
| pointer   | DUK_TYPE_POINTER   | DUK_TYPE_MASK_POINTER   | opaque pointer (void *) | no |
| lightfunc | DUK_TYPE_LIGHTFUNC | DUK_TYPE_MASK_LIGHTFUNC | plain Duktape/C pointer (non-object) | no |


Heap alloc カラムは、タグ付けされた値がヒープで割り当てられたオブジェクトを指しているかどうかを示し、（オブジェクトのプロパティテーブルのように）追加で割り当てられる可能性があることを示す。

### スタックタイプマスク

各スタックタイプにはビットインデックスがあり、スタックタイプのセットをビットマスクとして表現することができます。呼び出し側のコードはこのようなビットセットを使って、例えばあるスタック値があるタイプのセットに属するかどうかをチェックすることができます。

例：

```c
if (duk_get_type_mask(ctx, -3) & (DUK_TYPE_MASK_NUMBER |
                                  DUK_TYPE_MASK_STRING |
                                  DUK_TYPE_MASK_OBJECT)) {
    printf("type is number, string, or object\n");
}
```

さらに便利にタイプのセットをマッチングさせるための特定のAPIコールがあります。

```c
if (duk_check_type_mask(ctx, -3, DUK_TYPE_MASK_NUMBER |
                                 DUK_TYPE_MASK_STRING |
                                 DUK_TYPE_MASK_OBJECT)) {
    printf("type is number, string, or object\n");
}
```


### 配列のインデックス

ECMAScript のオブジェクトと配列のキーは文字列のみです。配列のインデックス (0, 1, 2, ...) も文字列で表現され、これは [0, 2**32-2] 範囲のすべての整数に対するそれぞれの数値の標準文字列表現 ("0", "1", "2", ...) として表現されます。概念的には、プロパティ・ルックアップで使われるキーは、まず文字列に強制されます。つまり、obj[123]は実際にはobj["123"]の略語に過ぎないのです。

Duktapeは、可能な限り、配列へのアクセスにおいて明示的な数値から文字列への変換を避けようとします。そのため、ECMAScriptコードとDuktape APIを使用するCコードの両方で、数値配列インデックスを使用することが望ましいと言えます。文字列と数値のインデックスを受け付けるAPIコールのバリエーションが一般的に存在します。

### Duktape/C関数

Duktape/C API 署名のある C 関数は、ECMAScript 関数オブジェクトまたは lightfunc 値と関連付けることができ、関連付けられた値が ECMAScript コードから呼び出されたときに呼び出されます。

例：

```c
duk_ret_t my_func(duk_context *ctx) {
    duk_push_int(ctx, 123);
    return 1;
}
```

バリュースタックで与えられる引数の数は、対応する ECMAScript 関数オブジェクトが作成されるときに指定されます: 引数を "そのまま" 取得するための DUK_VARARGS の固定数の引数のどちらかです。

- 固定数の引数を使用する場合、余分な引数は削除され、不足する引数は必要に応じて undefined で埋められます。
- DUK_VARARGS を使用する場合、実際の引数の数を決定するために duk_get_top() を使用します。

関数の戻り値。

- 戻り値1：スタックトップが戻り値を含む。
- 戻り値0：戻り値は未定義です。
- DUK_ERR_xxx の否定形である DUK_RET_xxx 定数を使用します。
- 戻り値 >1: 予約済み、現在は無効。
 
エラーの省略記法を使用した場合、エラーメッセージは表示されません。

```c
duk_ret_t my_func(duk_context *ctx) {
    if (duk_get_top(ctx) == 0) {
        /* throw TypeError if no arguments given */
        return DUK_RET_TYPE_ERROR;
    }
    /* ... */
}
```


### スタッシュ

スタッシュとは、Duktape/C API を使用して C コードから到達可能で、ECMAScript コードから到達不可能なオブジェクトのことです。スタッシュは、C コードが ECMAScript コードから安全に分離された内部状態を保存することを可能にします。スタッシュは3つあります。

- ヒープ・スタッシュ：同じヒープ内のすべてのスレッドで共有されます。
- グローバルスタッシュ: グローバルオブジェクトを共有するすべてのスレッドで共有されます。
- スレッドキャッシュ: 特定のスレッドに固有のもの。


## ヘッダ定義

このセクションでは、duktape.h で一般的に必要とされるいくつかのヘッダ 定義を要約します。これは完全なものではなく、抜粋は読みやすさのために再 編成されています。特定の定義値には頼らず、定義名だけを頼りにしてください。疑問があれば、ヘッダを直接参照してください。

### Duktapeバージョン

Duktape のバージョンは、DUK_VERSION 定義によって利用可能です。

- DUK_VERSION: 数値（メジャー * 10000 + マイナー * 100 + パッチ）。

例えば、バージョン2.3.4は、値20304となります。同じ値が Duktape.version を通して ECMAScript コードで利用できます。プレリリースの場合、DUK_VERSION は実際のリリースより 1 つ少ない値です。例えば、2.4.0 プレリリースは 20399 となります。バージョニングを参照してください。

### Git情報

以下のGit識別子が利用可能です（すべてDuktapeのGitHubリポジトリを参照）。

- DUK_GIT_DESCRIBE: DuktapeビルドのGit記述文字列です。公式リリースの場合は、"v1.0.0 "などですが、スナップショット・ビルドの場合は、"v1.0.0-155-g5b7ef1f-dirty "などの有用なバージョン情報を提供します。
- DUK_GIT_COMMIT: 配布ファイルのビルド元となる正確なコミットハッシュ。
- DUK_GIT_BRANCH: 配布ファイルのビルド元となったブランチ。これは、開発ブランチからビルドされたプロトタイプを識別するのに便利です。

ECMAScript 環境では、これと同等の定義がありません。

### デバッグプロトコルバージョン

デバッグ・プロトコルのバージョン番号です。

- DUK_DEBUG_PROTOCOL_VERSION デバッグプロトコルのバージョン番号 (1つの整数)。

### 構造体・型定義

```c
typedef struct duk_hthread duk_context;

typedef duk_ret_t (*duk_c_function)(duk_context *ctx);
typedef void *(*duk_alloc_function) (void *udata, duk_size_t size);
typedef void *(*duk_realloc_function) (void *udata, void *ptr, duk_size_t size);
typedef void (*duk_free_function) (void *udata, void *ptr);
typedef void (*duk_fatal_function) (void *udata, const char *msg);
typedef void (*duk_decode_char_function) (void *udata, duk_codepoint_t codepoint);
typedef duk_codepoint_t (*duk_map_char_function) (void *udata, duk_codepoint_t codepoint);
typedef duk_ret_t (*duk_safe_call_function) (duk_context *ctx, void *udata);
typedef duk_size_t (*duk_debug_read_function) (void *udata, char *buffer, duk_size_t length);
typedef duk_size_t (*duk_debug_write_function) (void *udata, const char *buffer, duk_size_t length);
typedef duk_size_t (*duk_debug_peek_function) (void *udata);
typedef void (*duk_debug_read_flush_function) (void *udata);
typedef void (*duk_debug_write_flush_function) (void *udata);
typedef void (*duk_debug_detached_function) (duk_context *ctx, void *udata);

struct duk_memory_functions {
        duk_alloc_function alloc_func;
        duk_realloc_function realloc_func;
        duk_free_function free_func;
        void *udata;
};
typedef struct duk_memory_functions duk_memory_functions;

struct duk_function_list_entry {
	const char *key;
	duk_c_function value;
	duk_int_t nargs;
};
typedef struct duk_function_list_entry duk_function_list_entry;

struct duk_number_list_entry {
	const char *key;
	duk_double_t value;
};
typedef struct duk_number_list_entry duk_number_list_entry;
```


### エラーコード

duk_error() などで使用されるエラーコードです。

- duk_err_none:エラーなし。例えば duk_get_error_code() から。
- DUK_ERR_ERROR: エラー。
- DUK_ERR_EVAL_ERROR: EvalError。
- DUK_ERR_RANGE_ERROR:RangeError：レンジエラー
- DUK_ERR_REFERENCE_ERROR:リファレンス・エラー
- DUK_ERR_SYNTAX_ERROR: 構文エラー
- DUK_ERR_TYPE_ERROR: TypeError (タイプエラー)
- DUK_ERR_URI_ERROR: URIエラー


### Duktape/C関数のリターンコード

例えば return DUK_RET_TYPE_ERROR は duk_type_error() を呼び出すのと似ていますが、より短いものです。

- DUK_RET_ERROR: DUK_ERR_ERROR と一緒に投げます。のと似ています。
- DUK_RET_EVAL_ERROR: DUK_ERR_EVAL_ERROR での投擲と同様です。
- DUK_RET_RANGE_ERROR: DUK_ERR_RANGE_ERROR でのスローイングに似ている
- DUK_RET_REFERENCE_ERROR: DUK_ERR_REFERENCE_ERROR と一緒に投げます。のと似ている
- DUK_RET_SYNTAX_ERROR: DUK_ERR_SYNTAX_ERROR とスローするのと似ています。
- DUK_RET_TYPE_ERROR: DUK_ERR_TYPE_ERROR とスローするのと似ている
- DUK_RET_URI_ERROR: DUK_ERR_URI_ERROR とスローするのと似ている


### 保護された呼び出しのためのリターンコード

保護された呼び出し（例：duk_safe_call()、duk_pcall()）に対するリターンコード。

- duk_exec_success:呼び出しはエラーなしで終了
- duk_exec_error:呼び出しに失敗、エラーは捕捉された


### duk_compileのためのコンパイルフラグ

duk_compile() や duk_eval() などのためのコンパイルフラグです。

- DUK_COMPILE_EVAL: (プログラムではなく)評価コードをコンパイルする
- DUK_COMPILE_FUNCTION: (プログラムの代わりに)関数コードをコンパイルする
- DUK_COMPILE_STRICT:プログラム、eval、または関数に対して、厳密な（外側の）コンテキストを使用する


### duk_def_propのフラグについて

duk_def_prop() とその派生型のためのフラグです。

- DUK_DEFPROP_WRITABLE: 書き込み可能に設定する (DUK_DEFPROP_HAVE_WRITABLE が設定されている場合のみ有効)。
- DUK_DEFPROP_ENUMERABLE: 列挙可能に設定する（DUK_DEFPROP_HAVE_ENUMERABLEが設定されている場合に有効）。
- DUK_DEFPROP_CONFIGURABLE: 設定可能 (DUK_DEFPROP_HAVE_CONFIGURABLE が設定されている場合のみ有効)
- DUK_DEFPROP_HAVE_WRITABLE: 書き込み可能かどうかを設定/解除する
- DUK_DEFPROP_HAVE_ENUMERABLE: 列挙可能を設定または解除します。
- DUK_DEFPROP_HAVE_CONFIGURABLE: コンフィギュラブルを設定/解除します。
- DUK_DEFPROP_HAVE_VALUE: 値を設定します (バリュースタックで指定されます)。
- DUK_DEFPROP_HAVE_GETTER: ゲッターを設定します (バリュースタックに保存されます)
- DUK_DEFPROP_HAVE_SETTER: (バリュースタックにある)セッターを設定する
- DUK_DEFPROP_FORCE:可能であれば変更を強制。仮想プロパティなどではまだ失敗する可能性があります
- DUK_DEFPROP_SET_WRITABLE: (DUK_DEFPROP_HAVE_WRITABLE | DUK_DEFPROP_WRITABLE)
- DUK_DEFPROP_CLEAR_WRITABLE: DUK_DEFPROP_HAVE_WRITABLE
- DUK_DEFPROP_SET_ENUMERABLE: (DUK_DEFPROP_HAVE_ENUMERABLE | DUK_DEFPROP_ENUMERABLE)
- DUK_DEFPROP_CLEAR_ENUMERABLE: DUK_DEFPROP_HAVE_ENUMERABLE
- DUK_DEFPROP_SET_CONFIGURABLE: (DUK_DEFPROP_HAVE_CONFIGURABLE | DUK_DEFPROP_CONFIGURABLE)
- DUK_DEFPROP_CLEAR_CONFIGURABLE: DUK_DEFPROP_HAVE_CONFIGURABLE

いくつかの便利なバリアントは省略され、 duk_def_prop() を参照。


### duk_enumの列挙型フラグ

duk_enum() の列挙フラグ。

- DUK_ENUM_INCLUDE_NONENUMERABLE: 列挙可能なプロパティに加え、列挙不可能なプロパティも列挙します。
- DUK_ENUM_INCLUDE_HIDDEN: 隠されたシンボルも列挙する (Duktape 1.x では内部プロパティと呼ばれる)
- DUK_ENUM_INCLUDE_SYMBOLS: シンボルを列挙します。Symbolのキーを列挙する (デフォルトは列挙しない)
- DUK_ENUM_EXCLUDE_STRINGS: 文字列のキーを列挙しない（デフォルトは列挙する）
- DUK_ENUM_OWN_PROPERTIES_ONLY: プロトタイプチェーンは歩かず、自身のプロパティのみをチェックする
- DUK_ENUM_ARRAY_INDICES_ONLY: 配列のインデックスのみを列挙する
- DUK_ENUM_SORT_ARRAY_INDICES: 配列インデックスのソート(継承された配列インデックスを含む全列挙結果に適用)
- DUK_ENUM_NO_PROXY_BEHAVIOR: プロキシ動作を起動せず、プロキシオブジェクト自体を列挙します。


### duk_gcのガーベッジコレクションフラグ

duk_gc() のフラグ。

- DUK_GC_COMPACT: ヒープオブジェクトをコンパクトに


### 強制力のヒント

強制力のヒント

- DUK_HINT_NONE: 強制入力が Date でない場合は、String を優先する（E5 8.12.8 セクション）。
- DUK_HINT_STRING: 文字列を優先する
- DUK_HINT_NUMBER: 数値を優先する


### シンボルリテラルマクロ

以下のマクロは、C リテラルとして内部 Symbol 表現を作成するために定義されています。すべての引数は文字列リテラルでなければならず、計算値であってはなりません。

- DUK_HIDDEN_SYMBOL(x): Duktape固有の隠しシンボルのCリテラル。
- DUK_GLOBAL_SYMBOL(x): グローバルシンボルのCリテラル。Symbol.for(x)と同等。
- DUK_LOCAL_SYMBOL(x,uniq): ローカルシンボルのCリテラル、Symbol(x)と同等、'uniq'で提供されるユニークパートはDuktape内部フォーマットと衝突してはならない、推奨はユニークパートの前に"!"をつけること。
- DUK_WELLKNOWN_SYMBOL(x): Symbol.iteratorのようなよく知られたシンボルを表すCリテラル
- DUK_INTERNAL_SYMBOL(x): Duktape内部シンボルのCリテラル。アプリケーションは通常このマクロを全く使うべきでなく、Duktape内部シンボルのみに予約されています（バージョン保証なし）。


### その他の定義

- DUK_INVALID_INDEX: スタックインデックスが無効、なし、またはn/aです。
- DUK_VARARGS: 関数が変数の引数を取る
- DUK_API_ENTRY_STACK: 関数エントリ時に確保が保証されているバリュースタックエントリ数
