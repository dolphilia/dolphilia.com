# Duktapeでモジュールを使用する方法（日本語訳）

[原文](https://wiki.duktape.org/howtomodules)

## はじめに

Duktape 1.xにはモジュール・ローディングのフレームワークが組み込まれていますが、Duktape 2.xではオプションとして追加されました。このドキュメントでは、Duktape 1.xモジュール・ローディングのフレームワークの使用方法とその例について説明します。Duktape 2.xの配布物には、他のモジュール・ローダーの選択肢もあります（Node.jsのセマンティクスを持つローダーなど、Duktape 1.xでも動きます）。また、ゼロからカスタムモジュールローダーを実装することも可能です。

Duktape 2.xの場合、モジュール・ロードを使用する前にmodule-duktape extraを初期化することを忘れないでください。https://github.com/svaarala/duktape/tree/master/extras/module-duktape/README.rst を参照してください。

ECMAScriptのコードからモジュールを読み込むには、グローバルなrequire()関数を使用します。

```javascript
var mod = require('foo/bar');
mod.hello();
```

モジュールは、CommonJSのモジュール仕様で定義された特別な環境で実行されます。この環境の中では、変数や関数の宣言はモジュールに局所的であり、グローバルオブジェクトには影響を与えません。モジュールのシンボルをエクスポートするexports、モジュールのメタデータ（特にmodule.id）を提供するmodule、現在のモジュールのコンテキストで解決された相対モジュール識別子でさらにモジュールをロードするrequire()の3つの特別なシンボルも提供する環境です。例

```javascript
// foo/bar.js
var text = 'Hello world!';     // モジュール外では見えない
var quux = require('./quux');  // loads foo/quux
exports.hello = function () {
    print(text);
};
```

などのラッパー関数を用いて、モジュール環境を内部に実装しています。

```javascript
function (require, exports, module) {
    // モジュールソースはこちら
}
```


```javascript
// foo/bar.js
module.exports = function adder(x, y) { return x + y; };

// main.js
var adder = require('foo/bar');
print('2 + 3 = ' + adder(2, 3));
```

Duktapeは組み込み可能で、様々な環境に移植できるため、モジュールを検索するための標準的な方法はありません。モジュールのロードが機能するためには、ユーザーコードはDuktape.modSearchでモジュール検索関数を提供する必要があります。モジュール検索関数は、基本的にモジュールの識別子とモジュールのソースコードを対応付けます（詳しくは以下を参照）。例

```javascript
// モジュール検索機能の詳細は下記をご覧ください。
Duktape.modSearch = function (id) {
    print('loading module:', id);
    // モジュールのソースコードを返すか、エラーを投げる。
};
```

## プロパティ

- require: モジュールをロードするためのグローバル関数で、すでにロードされている場合はキャッシュされた値を返します。モジュールは、相対的な識別子が正しく解決されるように、現在のモジュール ID を認識するローカルの require() 関数を見ます。
- Duktape.modSearch: modSearch() は、モジュールのロードをサポートするためにユーザコードが提供しなければならないモジュール検索関数である。
- Duktape.modLoaded: modLoaded は Duktape が維持する内部モジュールロード追跡テーブルで、 完全にロードされているか現在ロード中のモジュールについて、解決された絶対モジュール 識別子をモジュールのモジュールオブジェクトにマップします (module.exports は require() が返すエクスポートされた値です)。


## モジュール検索機能概要

モジュール検索機能は、モジュール検索パスやファイルシステムアクセスなど、特定の識別子に一致するモジュールを見つけるためのプラットフォーム特有の懸念事項をすべてカプセル化します。

```javascript
Duktape.modSearch = function (id, require, exports, module) {
    // ...
};
```

モジュール検索機能の引数は以下の通りです。

- 完全に解決されたモジュールID。相対IDは絶対IDに変換され、未解決の.IDや.IDの項は存在しない。
- さらなるモジュールをロードするための require() 関数です。相対モジュール ID は、現在のモジュールからの相対パスで解決されます。例えば、foo/bar がロードされている場合、モジュール検索関数に与えられた require() 関数は ./quux を foo/quux に解決することになります。
- モジュール検索時にシンボルをエクスポートするための exports オブジェクトです。モジュール検索機能で export を書き込むのは、通常、ネイティブ (Duktape/C) モジュールをロードするときだけです。
- ロードされるモジュールに関する追加情報を提供するモジュールオブジェクトです。

モジュール検索機能は、通常、引数のidに基づいて、モジュールを検索することが期待される、と。

- モジュールが見つからない場合、エラーをスローします。このエラーは、もともと require() をコールしたコードに伝搬されるので、 モジュールの識別子を含む有用なエラーメッセージを持たなければなりません。エラーをスローする前に exports に加えられたすべての変更は破棄されます。
- もしモジュールが見つかり、それがECMAScriptソースコード（おそらくネイティブバインディングに加えて）を持っていれば、モジュールECMAScriptソースコードを含む文字列を返します。Duktapeは、モジュール・コードのコンパイルと実行を行い、モジュール・シンボルがmodule.exportsオブジェクトに登録されるようにします。
- モジュールは見つかったが、ECMAScript のソースコードがないことを示すために undefined を返します。これは、modSearch() によって直接扱われるネイティブモジュールに便利です。

文字列や未定義を返すことに加え、modSearch() 関数は直接 export にシンボルを追加したり、module.exports を新しい値、例えば、ネイティブ関数/コンストラクタに置き換えたりすることができます。これにより、ネイティブモジュールやネイティブと ECMAScript のハイブリッドモジュールをロードすることができます。ネイティブモジュールは、静的にリンクされたネイティブコードから、またはプラットフォーム固有の DLL ロードによって初期化することができます。

モジュール検索機能は、ECMAScript関数、Duktape/C関数のいずれでも可能です。

こちらもご覧ください。

- C言語モジュールの記述に推奨される（ただし必須ではない）規約：c-module-convention.rst。

## Duktapeのモジュール・オブジェクト

modSearch()とロード中の ECMAScript モジュールの双方に与えられる module 引数は、以下の特性を持つ。

- プロパティ: 説明
- .id: 絶対モジュールIDを解決しました。例えば、foo/quux/./../barはfoo/barに解決します。
- .exports: 現在の輸出表で、最初は exports と同じです。modSearch() や ECMAScript モジュールによって上書きされることがあります。module.exports を上書きすると、Cモジュールやネイティブ関数/コンストラクタが require() から直接返されるようになります。Duktape 1.3 で追加されました。
- .filename: モジュールに関連付けられたファイル名で、モジュールのロード中に一時的なモジュールラッパー関数の .fileName プロパティとして使用され、トレースバックなどに影響します。デフォルトでは未設定で、完全に解決されたモジュール ID (例: foo/bar) がモジュール関数 .fileName プロパティに使用されます。大文字（module.fileNameの代わりにmodule.filename）は、Node.jsのmodule.filenameと一致します。Duktape 1.5で追加されたDuktape固有の機能です。
- .name: モジュールに関連付けられた関数名で、モジュールのロード中に一時的なモジュールラッパー関数の .name プロパティとして使用され、トレースバックなどに影響します。modSearch() で設定できます。デフォルトでは未設定で、完全に解決されたモジュール ID の最後のコンポーネント (例: bar) がモジュール関数 .name プロパティに使用されることになります。Duktape 1.5で追加されたDuktape固有の機能です。

## モジュール検索機能の実装

ここでは、2つのモジュールを提供するシンプルなモジュール検索スタブを紹介します。

```javascript
Duktape.modSearch = function (id) {
    if (id === 'foo') {
        return 'exports.hello = function() { print("Hello from foo!"); };';
    } else if (id === 'bar') {
        return 'exports.hello = function() { print("Hello from bar!"); };';
    }
    throw new Error('module not found: ' + id);
};
```

モジュールはディスクから読み込むことがほとんどなので、より実用的なモジュー ル検索機能はほとんどプラットフォームに依存します。通常、ファイルシステムにアクセスするためには、Duktape/C のバインディングが必要です。以下の例では、仮想的な readFile() 関数を使ってモジュールをロードしています。

```javascript
Duktape.modSearch = function (id) {
    // readFile() は、ディスクからファイルを読み込み、文字列または未定義を返します。id' は解決済みの正規形であるため、項とスラッシュのみを含み、 '.' や '...' は含まれない。
    var res;

    print('loading module:', id);

    res = readFile('/modules/' + id + '.js');
    if (typeof res === 'string') {
        return res;
    }

    throw new Error('module not found: ' + id);
}
```

以下のモジュール検索機能は、純粋なC、純粋なECMAScript、および混合モジュールをサポートしています。Cモジュールは、DLLをロードする仮想のloadAndInitDll()関数でロード・初期化されます。

```javascript
Duktape.modSearch = function (id, require, exports, module) {
    // readFile()：上記と同様。
    // loadAndInitDll()：DLLをロードし、そのinit関数を呼び出し、モジュールのinit関数の戻り値（通常はモジュールの関数/定数バインディングを含むオブジェクト）を返します。  DLLが見つからない場合は未定義を返す。
    var name;
    var src;
    var found = false;
    var mod;

    print('loading module:', id);

    // DLLをチェックします。  DLL init関数はプラットフォーム依存です。
    // DLLローダーはさらにモジュールをロードするために例えば'require'を必要とすることもありますが、一般的にネイティブモジュールはサブモジュールをロードする必要はありません。
    name = '/modules/' + id + '.so';
    mod = loadAndInitDll(name);
    if (mod) {
        print('loaded DLL:', name);
        module.exports = mod;  // exports テーブルをモジュールの export に置き換える。
        found = true;
    }

    // ECMAScriptのチェック。
    name = '/modules/' + id + '.js';
    src = readFile(name);
    if (typeof src === 'string') {
        print('loaded ECMAScript:', name);
        found = true;
    }

    // DLLまたはECMAScriptファイルのどちらか（または両方）を見つける必要があります */
    if (!found) {
        throw new Error('module not found: ' + id);
    }

    // 純粋なC言語モジュールの場合、'src'は未定義でもかまいません。
    return src;
}
```

モジュール検索機能は、圧縮されたインメモリストアからモジュールをロードしたり、ネットワーク経由でモジュールをロードしたりすることも可能です。しかし、モジュール検索関数はコルーチン降伏ができないため、ネットワークアクセスはアプリケーションをブロックしてしまう。

## ネイティブなmodSearch()関数の実装

modSearch()関数は、例えば、ネイティブ関数として実装することも可能です。

```javascript
duk_ret_t my_mod_search(duk_context *ctx) {
    // Nargsは4と与えられ、次のようなスタック引数が得られました。
    //   index 0: id
    //   index 1: require
    //   index 2: exports
    //   index 3: module

    // ...
}
```

CコードからネイティブのmodSearch()関数を登録するには、以下のようにします。

```javascript
duk_get_global_string(ctx, "Duktape");
duk_push_c_function(ctx, my_mod_search, 4 /*nargs*/);
duk_put_prop_string(ctx, -2, "modSearch");
duk_pop(ctx);
```

## modSearch() からネイティブ関数/コンストラクタを返します。

modSearch() 関数は module.exports を上書きして、require() から返される関数/コンストラクタを制御することができます。

```javascript
Duktape.modSearch = function (id, require, exports, module) {
    // この例では'id'は無視する。
    // modSearch() の中で module.exports を上書きすることで、最終的に `require()` から返される値を置き換えることができます（引数 'exports' も無視します）。  ここでは、コンストラクタを直接返します。

    module.exports = function MyConstructor(name) {
        this.name = name;
    };

    return; // ノーローディング
};

var MyFunc = require('dummy');  // MyConstructor を返す
print(typeof MyFunc);  // prints "function"

var obj = new MyFunc('myname');
print(obj.name);  // prints "myname"
```

modSearch()がDuktape/C関数として実装されている場合でも、modSearch()からネイティブ関数/コンストラクタを返すために同じ方法が有効です。

```javascript
duk_ret_t my_mod_search(duk_context *ctx) {
    // Nargsは4と与えられ、次のようなスタック引数が得られました。
    //   index 0: id
    //   index 1: require
    //   index 2: exports
    //   index 3: module

    // 通常は'id'を見てどのモジュールをロードするかを決めますが、この例では無視します。

    // ネイティブのコンストラクタをプッシュします（ここでは省略）。 */
    duk_push_c_function(ctx, my_native_constructor, 1 /*nargs*/);

    // module.exportsを上書きする。
    duk_put_prop_string(ctx, 3 /*idx of 'module'*/, "exports");

    // ソースコードがない場合は'undefined'を返す。
    return 0;
}
```

## C言語によるモジュールの作成

Cモジュールの書き方には、推奨される（必須ではない）規約があります。c-module-convention.rstを参照してください。

ほとんどのCモジュールは、以下の部分を必要とします。

```c
// モジュールの識別

// duktape.h と必要なプラットフォームヘッダをインクルードしてください。
#include "duktape.h"

// モジュール機能を提供するDuktape/C機能。

static duk_ret_t my_func_1(duk_context *ctx) {
    // ...
}

static duk_ret_t my_func_2(duk_context *ctx) {
    // ...
}

// ...

// モジュール初期化

static const duk_function_list_entry my_module_funcs[] = {
    { "func1", my_func_1, 3 /*nargs*/ },
    { "func2", my_func_2, DUK_VARARGS /*nargs*/ },
    { NULL, NULL, 0 }
};

static const duk_number_list_entry my_module_consts[] = {
    { "FLAG_FOO", (double) (1 << 0) },
    { NULL, 0.0 }
};

// 初期化関数名は dukopen_<modname> です。
duk_ret_t dukopen_my_module(duk_context *ctx) {
    duk_push_object(ctx);
    duk_put_function_list(ctx, -1, my_module_funcs);
    duk_put_number_list(ctx, -1, my_module_consts);

    // 戻り値はモジュールオブジェクトです。  この値をどのように使うか、例えばグローバルオブジェクトに書き込むかは呼び出し側次第です。  また、オブジェクトの代わりに関数やコンストラクタにすることもできます。
    return 1;
}
```

このように書かれたモジュールは、CommonJSのモジュール読み込みフレームワークの外から、単に次のように使うことができます。

```c
int main(int argc, char *argv[]) {
    duk_context *ctx;

    ctx = duk_create_heap_default();
    if (!ctx) {
        /* ... */
    }

    // モジュールのロードは、Duktape/Cコールラッパーで行われます。
    duk_push_c_function(ctx, dukopen_my_module, 0 /*nargs*/);
    duk_call(ctx, 0);
    duk_put_global_string(ctx, "my_module");

    // my_module がグローバルオブジェクトに登録されました。
    duk_eval_string_noresult(ctx, "my_module.func2()");

    // ...

    duk_destroy_heap(ctx);
    return 0;
}
```

また、Duktape CommonJS module loaderを使用してモジュールをロードすることもできます。

- modSearch()は、例えばDLLから配置されたinit関数dukopen_my_module()を呼び出すでしょう。
- modSearch() は init 関数から返されたモジュール・オブジェクトを (Duktape の値スタックの一番上にある) module.exports に割り当て、モジュールに関連する ECMAScript ソースコードがないことを示すために undefined を返します。
- dukopen_my_module() から返されたモジュールオブジェクトは、そのまま require('my_module') の返り値として表示されます。

## 制限事項

- モジュール検索機能でネイティブ・モジュールを実装する場合、モジュール検索機能が終了する前に、モジュールのexportsテーブルがDuktapeに「ロード中のモジュール」として登録されないため、循環的なモジュール参照はサポートされません。循環モジュール参照は純粋なECMAScriptモジュールではサポートされています。