# エラーオブジェクト

標準的な ECMAScript の `Error` インスタンスは、 `name` と `message` を含むだけで、非常に素っ気ないものです。Duktape を含むほとんどの ECMAScript 実装は、ファイル名、行番号、トレースバックなどの追加のエラープロパティを提供します。ECMAScriptは任意の値を投げることができるが、ほとんどのユーザーコードは `Error` コンストラクタを継承したオブジェクトを投げる。

このドキュメントでは、Duktape がどのようにして `Error` オブジェクトを作成し、投げるのか、そのようなオブジェクトが持つプロパティは何か、そしてどのようなエラーメッセージの冗長性レベルが利用可能かについて説明しています。また、内部トレースバックデータフォーマットと、人間が読めるトレースバックを提供するメカニズムについても説明します。

また、公開されている機能をより分かりやすく解説したユーザードキュメントもご覧ください。

## エラーメッセージの冗長性レベル

エラーメッセージの冗長性は3段階あり、指示された定義によって制御されます：

DUK_USE_VERBOSE_ERRORS | DUK_USE_PARANOID_ERRORS | Description
-----------------------|-------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
set                    | not set                 | 例えば、`number required, found 'xyzzy' (index -3)`のように、問題のあるキー/値を含むメッセージを表示します。これはデフォルトの動作です。
set                    | set                     | 例えば、`number required, found string (index -3)`のように、問題のあるキー/値を含まない冗長なメッセージです。エラーメッセージに含まれるキー/値がセキュリティ上問題となる可能性があると考えられる場合に有用です。
not set                | ignored                 | エラーオブジェクトは実際のエラーメッセージを持たない。エラーコードを文字列に変換したものが `.message` で提供される。メモリが非常に少ないターゲットに有用である。

今後の課題：

- エラーメッセージ文字列が存在しても、最小限の数の異なるメッセージ文字列が存在するような低メモリのエラーメッセージがあれば便利でしょう。例えば、`duk_require_xxx()`の型の不一致によるすべてのエラーは `"unexpected type"` となり、すべてのスタックインデックスのエラーは `"invalid argument"` となる。

## 誤差補強の概要

Duktapeでは、エラーオブジェクトを(1)生成時、(2)投げられる直前で拡張することができます。オブジェクトは一度しか生成されませんが、何度も投げたり、投げ直したりすることができます（ただし、オブジェクトの生成に関するコーナーケースもあります。）

`Error` のインスタンスが生成されたとき：

- Duktape はまず、トレースバックまたはファイル/ライン情報 (アクティブな設定オプションに依存) をエラーオブジェクトに追加します。
- 次に、`Duktape.errCreate`が設定されていれば、それを呼び出してエラーをさらに拡張したり、完全に置き換えたりします。このコールバックは、実装内部では**エラーハンドラ**と呼ばれています。ユーザは必要に応じてエラーハンドラを設定することができますが、デフォルトでは設定されていません。

`Error` のインスタンスであるエラー値のみが拡張され、他の種類の値 (オブジェクトであっても) はそのままであることに注意してください。ユーザーエラーハンドラーは `Error` インスタンスでのみ呼び出されます。

**任意の値**が投げられたとき（または再投げられたとき）：

- `Duktape.errThrow`が設定されている場合、投げられた値を補強または置き換えるために呼び出されます。ユーザは必要に応じてエラーハンドラを設定することができますが、デフォルトでは設定されていません。

`Error` インスタンスだけでなく、すべての値が `Duktape.errThrow` に渡され処理されることに注意してください。エラーハンドラはまた、ユーザーコンテキストで適切な方法で再投与を処理する必要があります。

## エラーオブジェクトの作成

エラーは複数の方法で作成することができます：

- ECMAScriptのコードから、通常は(常にではないが)`throw`ステートメントと結びついたエラーを作成する、例えば：

```js
throw new Error('my error');
```

この場合、Errorオブジェクトは、（`new Error(...)`で）Errorオブジェクトを生成したファイルのファイルと行をキャプチャする必要があります。

- Duktape APIを使用したCコードから、例えば：

```c
duk_error(ctx, DUK_ERR_RANGE_ERROR, "invalid argument: %d", argvalue);
```

このような場合、throwサイトの`__FILE__`と`__LINE__`が非常に便利です。エラーオブジェクトを生成するAPIコールはマクロとして実装され、`__FILE__`と`__LINE__`を便利に捕捉することができます。これは有用なトレースバックを作成するために非常に重要です。

- Duktapeの実装内部から、通常は `DUK_ERROR()` マクロを使って、例えば次のようにします：

```C
DUK_ERROR(thr, DUK_ERR_TYPE_ERROR, "invalid argument: %d", argvalue);
```

このような場合、スローサイトの `__FILE__` と `__LINE__` はスタックトレースに含まれますが、エラーオブジェクトの `.fileName` と `.lineNumber` のエラーソースとして、"blamed "されません：ファイル/ラインはDuktape内部で、ユーザーコードにとって最も有用なものではありません。

基本的な `DUK_ERROR()` マクロと同様に動作する、特定のエラー用のヘルパーマクロがいくつか用意されています。

Duktape APIを使用して、またはDuktapeの実装内部からエラーが投げられた場合、投げられた値は常に`Error`のインスタンスであるため、拡張されます。エラーの生成とスローは同時に行われます。

ECMAScriptのコードからエラーが投げられる場合、状況は異なります。ユーザーコードが、エラーの生成とエラーのスローを分離することを妨げるものは何もない：

```js
var err = new Error('value too large');
if (arg >= 100) {
    throw err;
}
```

実際、ユーザーはエラーを投げるつもりはなくても、トレースバックにアクセスしたいと思うかもしれません：

```js
var err = new Error('currently here');
print('debug: reached this point\n' + err.stack);
```

上述したように、通常、エラーはスローされたときではなく、作成されたときに増強するのが望ましいです。エラーを再度スローすると、何度も増強される可能性があり（以前の値を上書きする）、エラーによっては、スローされないかもしれませんが、トレースバック情報を持つことで恩恵を受けられます。

Duktapeの組み込みの拡張機能（基本的にトレースバックの追加）は、エラー作成時に行われます。オプションのエラーハンドラにより、エラー作成時とスローされる直前の両方を追加で処理することができます。

具体的には、コンストラクタを呼び出したとき（つまり `new Foo()` ）、呼び出し元のコードに返されようとする最終結果が検査されます。これは、コンストラクタ呼び出しの標準的な処理に対する変更であり、オブジェクトが生成されるたびに一律に適用されます（残念ながら、いくつかのオーバーヘッドが発生します）。最終的な値が `Error` インスタンスである場合、つまりその内部プロトタイプチェーンが `Error.prototype` を含んでいる場合です：

- オブジェクトが拡張可能である場合、その値はDuktapeの組み込み拡張機能によってエラー情報（例えばtraceata）で拡張される。
- `Duktape.errCreate`がセットされている場合、エラーはユーザーコールバックによってさらに処理されます。この処理を行うためにオブジェクトは拡張可能である必要はありませんが、それでも `Error` インスタンスである必要があることに注意してください。

Duktapeは、オブジェクトに既に同じ名前のフィールドがある場合、追加フィールドの追加を拒否します。例えば、作成されたオブジェクトに `_Tracedata` フィールドがある場合、拡張処理によって上書きされることはありません。(ユーザーエラーハンドラにはそのような制限はなく、エラー値を完全に置き換えることができます)。

特定のオブジェクトが2回構築されることはありませんが、現在のアプローチでは、特別な場合にエラーオブジェクトがその生成中に2回拡張される可能性があります。これは、例えば次のように実現できます：

```js
function Constructor() {
    return new Error('my error');
}

var e = new Constructor();
```

ここで、エラーオーガメント（Duktape\独自のオーガメント処理とユーザーエラーハンドラを含む）が2回発生することになる：

1. `new Error('my error')`が実行されると、結果が増大される。ユーザーエラーハンドラ（`errCreate`）が存在する場合、それが呼び出される。
2. `new Constructor()`の呼び出しが戻ると、返されたエラー値がコンストラクタに与えられたデフォルトオブジェクトを置き換えます。置換された値（すなわち `new Error('my error')` の結果）は増強される。

この動作の問題を回避するため、Duktapeの拡張コードでは、すでにフィールドが存在する場合は、エラーにフィールドを追加することを拒否しています。これにより、上記のステップ2でトレースバックデータが上書きされることがないようにします。ユーザーの `errCreate` エラーハンドラは、同じエラーオブジェクトに対する複数の呼び出しに適切に対処する必要があります。最も簡単なのは、次のような方法です：

```js
Duktape.errCreate = function (e) {
    if ('timestamp' in e) {
        return e;  // only touch once
    }
    e.timestamp = new Date();
    return e;
}
```

作成中に拡張することの欠点は、エラー情報がエラーをスローする実際の `throw` ステートメントを正確に反映しない可能性があることです。特に、ユーザーコードは、実際にエラーがスローされる場所や時間とは全く異なる場所で、全く異なる時間にエラー値を作成する可能性があります。ユーザーコードは、同じエラー値を複数回投げることもあります。

エラーオブジェクトは `Error` コンストラクタ（またはサブクラスのコンストラクタ）を通常の関数として呼び出すことによっても作成することができます。標準では、これは意味的にコンストラクタ呼び出しと同等です。Duktapeは、組み込みのエラーコンストラクタを呼び出して作成されたエラーを、通常の関数呼び出しで補強することもできます。しかし、ユーザーが作成したErrorのサブクラスは、この挙動を示さない。例えば、以下のような感じです：

```js
MyError = function(msg) { this.message = msg; this.name = 'MyError'; return this; }
MyError.prototype = Error.prototype;

var e1 = new Error('test 1');    // augmented, constructor call
var e2 = Error('test 2');        // augmented, special handling
var e3 = new MyError('test 3');  // augmented, constructor call
var e4 = MyError('test 4');      // not augmented

print(e1.stack);
print(e2.stack);
print(e3.stack);
print(e4.stack);
```

Prints out:

```sh
Error: test 1
        global test.js:4 preventsyield
Error: test 2
        Error (null) native strict preventsyield
        global test.js:5 preventsyield
MyError: test 3
        global test.js:6 preventsyield
undefined
```

なお、内部的な詳細のため、`Error`コンストラクタを通常の関数として呼び出した場合のトレースバックは異なる。

この挙動を修正し、非コンストラクタコールで呼び出されたときにユーザーエラーもオーグメントされるようにするのは難しいようです。増強が適切かどうかを検出するのは難しいでしょうし、通常の関数呼び出しのたびにオーバーヘッドを追加することになります。

## エラースロー

任意のエラー値**が投げられた場合、`Duktape.errThrow`に設定されたオプションのユーザーエラーハンドラは、エラー値を処理または置き換えることができます。どんな値でも投げられるので、これはすべての型に適用されます。

ユーザーエラーハンドラーは、以下のような対応をしなければなりません：

- エラー値の変更を関連する値のみに制限する（例：`Error`インスタンスにのみ）。
- 再スローを適切に処理する。

例えば、次のようにすると、エラーオブジェクトが最初に投げられたときに、タイムスタンプが追加されます：

```js
Duktape.errThrow = function (e) {
    if (!(e instanceof Error)) {
        return e;  // only touch errors
    }
    if ('timestamp' in e) {
        return e;  // only touch once
    }
    e.timestamp = new Date();
    return e;
}
```

## エラーハンドラを指定する

### 現在の取り組み

現在のcreate/throwエラーハンドラは `Duktape.errCreate` と `Duktape.errThrow` に格納されています。これにはいくつかの利点があります：

- `Duktape` オブジェクトは、追加の API バインディングなしで C と ECMAScript の両方のコードから簡単にアクセスすることができます。
- サンドボックスの開始時に `Duktape` オブジェクトを（ユーザーコードからアクセスできない）隠し場所に移動し、C コードから隠し場所を通してエラーハンドラを制御することができます。
- エラーハンドラのスコープは、同じ `Duktape` 組み込みを共有するすべてのスレッド、つまり、同じグローバル環境を共有するスレッドです。これは、例えば再開されたスレッドではエラーハンドラが自動的に有効になることを意味し、おそらくこれは良いデフォルトの動作である。

### デザインの選択肢

しかし、現在の方法にはいくつかの代替案があります。一つは、エラーハンドラ(複数)を

- 内部データ構造、例えば `thr->errcreate` や `thr->errthrow` などです。これはサンドボックスの観点からはより強力ですが、ハンドラを取得/設定するためのカスタムバインディングが必要になります。また、メモリ管理もフィールドについて知っておく必要がある。
- 特定の保護された呼び出しの間だけ、スレッドの値スタックを呼び出す（呼び出し元のフレームで）。このモデルはLuaで使用されており、Duktapeでも0.9.0まで使用されていた。欠点は、保護された呼び出しが、かなり稀に使用されるエラー・ハンドラを管理する必要があることです。
- グローバル・オブジェクト。これは `Duktape` オブジェクトを使うよりも全体的に悪いと思われます。なぜなら、サンドボックスのために悪くなり、明らかな利点がないからです。
- スレッドオブジェクト。これは、再開されたスレッドにエラーハンドラを継承するための余分なコードが必要になります（それは良いデフォルトの動作のように思えるので）。
- グローバルスタッシュ。サンドボックス化には良いが、デフォルトではCコードからしかアクセスできない。これは、現在の動作に対する最良の選択肢の1つであると思われます。
- スレッドスタッシュ。サンドボックス化には良いが、エラーハンドラ "inherit "の問題がある。

## エラーオブジェクトのプロパティ

次の表は、Duktapeのデフォルトの設定オプション（特に、トレースバックが有効）で、実装の制御範囲内で構築された`Error`オブジェクトのプロパティをまとめたものです：

Property    | Standard | Inherited | Description
------------|----------|-----------|-------------------------------------------------------------------
name        | yes      | yes       | 例：`TypeError`はTypeErrorを表す（通常は継承される）。
message     | yes      | no        | 自前メッセージ
fileName    | no       | yes       | 構築されたファイル名（継承されたアクセサー）
lineNumber  | no       | yes       | 構築されたファイルの行（継承されたアクセサー）。
stack       | no       | yes       | printableスタックトレースバック文字列(継承アクセサー)
\_Tracedata | no       | no        | スタックトレースバックデータ、内部生形式（自身の内部プロパティ）

`Error.prototype`は、以下の非標準的なプロパティを含む：

Property   | Standard | Description
-----------|----------|-------------------------------------------------------------------------
stack      | no       | accessor property for getting a printable traceback based on \_Tracedata
fileName   | no       | accessor property for getting a filename based on \_Tracedata
lineNumber | no       | accessor property for getting a linenumber based on \_Tracedata

オブジェクト・インスタンスが同名のownプロパティを持っていない場合に備えて、アクセサーはすべてプロトタイプに用意されています。これにより、エラーインスタンスのプロパティ数を最小限に抑えつつ、必要に応じてインスタンス固有の値を提供することができる柔軟性を持たせています。また、セッターを使用することで、ユーザーコードがインスタンス固有の値をエラーオブジェクトの "own property "として書き込むことができ、後の読み込みでアクセッサがシャドウされることに注意してください。

Notes:

- `stack`プロパティの名前はV8からのもので、動作もV8に近い。V8では、ユーザーコードが `stack` プロパティに書き込むことはできますが、同じ名前の独自のプロパティを作成することはありません。書き込まれた値は、後で `stack` が読み返されたときにも表示されます。
- `fileName`と`lineNumber`のプロパティ名はRhinoに由来します。
- Duktape 1.3.0以前のバージョンでは、ユーザーコードは `.fileName`, `.lineNumber`, `.stack` を直接書き込むことができませんでした。なぜなら、継承されたセッターはこのような書き込みを捕捉して無視するためです。ユーザーコードは `Object.defineProperty()` や `duk_def_prop()` を使って、オーバーライドするプロパティを作成することができました。Duktape 1.4.0 では、セッターが変更され、書き込みが透過的に動作するようになりました：書き込みはセッターによって捕捉されますが、セッターは自動的に自身のプロパティを作成します。
- `Tracedata`は内部フォーマットを持っており、バージョンごとに（あるいはビルドごとに）変更される可能性があります。Duktape ヒープのライフサイクル以外では、決してシリアライズしたり、使用したりしてはいけません。
- サイズを最適化したビルドでは、トレースバック情報が省略されることがあります。そのような場合、`fileName` と `lineNumber` は具体的な自身のプロパティであり、`.stack` は `ToString()` で強制されたエラー文字列、例えば `TypeError: my error message` を返す継承プロパティである。
- サイズを最適化したビルドでは、Duktape の実装によって作成されたエラーは、有用な `message` フィールドを持ちません。代わりに `message` には、エラー `code` の文字列表現が設定されます。ユーザーコードから投げられた例外は、通常 `message` を持ちます。
- `Tracedata` プロパティは、現在のコールスタックにある関数への参照を含んでいます。このような参照はサンドボックス化の懸念があるため、トレースデータは内部プロパティに格納されます。

## エラーの原因となる.fileNameと.lineNumberを選択すること

### 問題の概要

エラーが発生したとき、どのファイルや行をエラーの発生源とするかは、必ずしも明確ではありません： エラーオブジェクトの `.fileName` と `.lineNumber` プロパティは、アプリケーションプログラマがエラーの原因を特定するために役立つはずです。

該当するファイル・行のペアは

- **The \_\_FILE\_\_ and \_\_LINE\_\_ of the C call site**. これらはDuktape/C関数の一行を指すことが多いのですが、Duktape/C関数が別のファイルのヘルパーを呼び出してエラーを発生させることもありえます。例えば、ユーザー・コードが `duk_require_xxx()` を呼び出し、内部マクロ `DUK_ERROR()` を使ってスローする場合、Cの呼び出し先はDuktape内部である可能性もあります。最後に、コールスタックエントリが存在しない場合にエラーを投げることも可能です; Cコールサイト情報はまだ利用可能です。
- **コンパイル中のソーステキストのファイル/ライン**. これは、コンパイル中に投げられたエラー（通常はSyntaxErrorsですが、他のエラーもありえます）にのみ関連します。
- **エラーに至るまでのコールスタックエントリー（アクティベーション）の実際**. これらはDuktape/C関数とECMAScript関数を使用することができます。例えば、ECMAScriptの関数はデフォルトで `.name` と `.fileName` の両方のプロパティを持ちますが、Duktape/Cの関数にはありません。関数の作成後にプロパティを追加したり削除したりすることも可能です。

次のSyntaxErrorは、関連するすべてのファイル/行のソースを示しています：

```sh
duk> try { eval('\n\nfoo='); } catch (e) { print(e.stack); print(e.fileName, e.lineNumber); }
SyntaxError: parse error (line 3)
        input:3                                        <-- file/line of source text (SyntaxError)
        duk_js_compiler.c:3612                         <-- __FILE__ / __LINE__ of DUK_ERROR() call site
        eval  native strict directeval preventsyield   <-- innermost activation, eval() function
        global input:1 preventsyield                   <-- second innermost activation, caller of eval()
input 3   <-- .fileName and .lineNumber blames source text for SyntaxError
```

アプリケーションから見て、最も関連性の高いファイル/行は、通常、コールスタック内で最も近い "ユーザー機能"（"インフラ機能 "とは異なる）です。以下は、非難するのに有用でないことが多い：

- Duktape/CまたはECMAScriptの関数で、エラーチェッカー、1対1のシステムコールラッパーなど、インフラストラクチャー関数とみなされるものすべて。
- Duktape内のCコールサイト、これらは基本的に常にインフラストラクチャ関数です。
- Duktape/CまたはECMAScriptの関数で、`.fileName`プロパティがないもの。このような関数は、たとえユーザー関数であっても無視されるべきで、結果として得られるファイル/ライン情報が無意味になるからです。

この理想的な結果を実現するためには、Duktapeが、ある関数を無視した非難を行うべきかどうかを判断できるようにする必要があります。これはまだ可能ではありません。以下のサブセクションでは、現在の動作について説明します。

ファイル/ライン情報は良いエラー報告のために重要ですが、関連するすべての情報は、とにかくスタックトレースで常に利用可能であることに注意してください。不正確なファイル/行の非難は迷惑ですが、通常、重大な問題ではありません。

### Duktape 1.3動作

Duktape 1.3では、特定のファイル/行をエラーの原因とするルールは比較的単純です：

- コンパイル中に発生したエラーは、常にソーステキストファイル/行のせいにされます。コンパイルエラーは典型的なSyntaxErrorですが、メモリ不足の内部エラーなどもありえます。
- Duktapeの内部で発生したエラー（`duk_require_xxx()`のようなDuktape API関数を含む）については、C言語のコールサイトは無視され、ファイル/ライン情報については最も内側の起動が使用されます。これは、最も内側のアクティベーションの関数に `.fileName` プロパティがなく、エラー `.fileName` が `undefined` となる場合でも同じです。
- Duktape API (`duk_push_error_object()`, `duk_error()` など)を使用して作成/スローされたエラーは、常にC呼び出しサイトが責められ、エラーのファイル/行情報がC呼び出しサイトの `__FILE__`/`__LINE__` に一致するようにします。この動作はハードコードされています。ユーザーコードは、エラーオブジェクトに `.fileName` と `.lineNumber` を定義することでこの動作をオーバーライドすることができます。

このルールには、いくつかの欠点があります。

まず、C言語のコールサイトは、ユーザーが投げたエラーの責任を負わされることになりますが、これはしばしば最善の行動ではありません。例えば、次のようなことです：

```c
/* foo/bar/quux.c */

static duk_ret_t my_argument_validator(duk_context *ctx) {
        /* ... */

        /* The duk_error() call site's __FILE__ and __LINE__ will be
         * recorded into _Tracedata and will be provided when reading
         * .fileName and .lineNumber of the error, e.g.:
         *
         *     err.fileName   --> "foo/bar/quux.c"
         *     err.lineNumber --> 1234
         *
         * If this an "infrastructure function", e.g. a validator for
         * an argument value, the file/line blamed is not very useful.
         */

        duk_error(ctx, DUK_ERR_RANGE_ERROR, "argument out of range");

        /* ... */
}
```

次に、C言語のコールサイトが非難されず、最も内側のアクティベーションに `.fileName` プロパティがない場合（Duktape/C関数のデフォルト）、エラーの `.fileName` は `undefined` になります。例えば、以下のようになります：

```sh
((o) Duktape 1.3.0 (v1.3.0)
duk> try { [1,2,3].forEach(123); } catch (e) { err = e; }
= TypeError: type error (rc -105)
duk> err.fileName
= undefined
duk> err.lineNumber
= 0
duk> err.stack
= TypeError: type error (rc -105)
        forEach  native strict preventsyield
        global input:1 preventsyield
duk> Array.prototype.forEach.name
= forEach
duk> Array.prototype.forEach.fileName
= undefined
```

`forEach()`は `.name` プロパティを持っていますが、`.fileName` を持っていないので `err.fileName` が `undefined` になっています。これは明らかに使い勝手が悪い。ファイル名を持つ最も近い呼び出し先である `input` のエラーを責める方がより有用だろう。

### Duktape 1.4.0 の動作について

Duktape 1.4.0では、C言語のコールサイト情報が非難されない場合の非難動作を若干改善しました。ファイル/ライン情報を最も内側のアクティベーションから取得する代わりに、`.fileName`プロパティを持っている最も近いアクティベーションから取得するようにしました。

これにより、上記の`forEach()`の例でファイル/行の非難が改善されます：

```sh
((o) Duktape 1.3.99 (v1.3.0-294-g386260d-dirty)
duk> try { [1,2,3].forEach(123); } catch (e) { err = e; }
= TypeError: function required, found 123 (stack index 0)
duk> err.fileName
= input
duk> err.lineNumber
= 1
```

`forEach()`にファイル名が割り当てられている場合は、その代わりに非難されます：

```sh
((o) Duktape 1.3.99 (v1.3.0-294-g386260d-dirty)
duk> Array.prototype.forEach.fileName = 'dummyFilename.c';
= dummyFilename.c
duk> try { [1,2,3].forEach(123); } catch (e) { err = e; }
= TypeError: function required, found 123 (stack index 0)
duk> err.fileName
= dummyFilename.c
duk> err.lineNumber
= 0
```

コンパイル時に発生するエラー（典型的なSyntaxErrors）に対する動作に変更はない。

また、`duk_error()`を使用して明示的に投げられたエラーなど、C言語のコールサイトが責められる場合にも変更はありません。このようなエラーはインフラコードとアプリケーションコードの両方から発生する可能性があるため、このようなエラーに対して理想的なファイル/行を選択するための情報がまだ十分ではありません。

### .fileNameと.lineNumberのアクセサーを置き換える

ユーザーアプリケーションがファイルや行の非難をもっとコントロールしたい場合、継承された `Error.prototype.fileName` と `Error.prototype.lineNumber` アクセッサを置き換えて、アプリケーションに最も適したロジックを実装することが可能です。例えば、ファイル名のホワイトリスト/ブラックリストやファイル名のパターンに基づいて関数をフィルタリングすることができます。

この欠点は、アプリケーションが、バージョンに依存する形式の `_Tracedata` をデコードする必要があることです。

### 今後の改善点

#### Cコールサイトの制御非難

Cコードで、エラー生成/スローのCコールサイトをファイル/ラインの非難に関連するとみなすかどうかを指定できるようにする。この変更により、ユーザーコードはエラーごとに非難を制御できるようになります。

Duktapeでは、エラーコードとORしたフラグ(`DUK_ERCODE_FLAG_NOBLAME_FILELINE`)を使って、すでに内部でこの処理を行っています。このフラグは単にAPIで公開することもできますが、他のAPI設計のオプションもあります。

#### コンパイルエラーの制御エラー責めを行う

現在、ソーステキストファイル/行は、コンパイル時に発生したエラー（典型的なSyntaxErrors）に対して常に非難されています。

技術的には、"インフラストラクチャーコード "の内部でコンパイルエラーが発生する可能性があり、それを責めることが必ずしも正しいとは限りません。これは、コンパイルAPI呼び出しにフラグを追加することで簡単に修正できます。

#### 機能の制御エラー非難

Duktape/CおよびECMAScript関数が、その関数がファイル/ラインの非難に関連すると見なされるべきかどうかを示すフラグを提供できるようにしました。

Duktape 1.4.0では、関数の `.fileName` プロパティがある程度この目的を果たします。関数に `.fileName` がない場合、ファイル/ラインの非難では無視され、つまりインフラストラクチャ関数として扱われます。しかし、`.fileName`を持つインフラストラクチャ関数や、`.fileName`を持たない非インフラストラクチャ関数があるかもしれないので、明示的に非難動作を制御できるようになると便利だと思います。

制御フラグは `duk_hobject` フラグまたは (内部または外部の) プロパティとして実装することができます。

#### ライトファンクスの取り扱いについて

lightfuncsは非難されるべきか、されないべきか？現在、ファイル/ラインについて非難されることはない。

## コーズチェーン

現在、コーズチェーンはサポートされていません：ECMAScriptには因果連鎖の概念はなく、非公式な標準もないようです。

エラー時に `cause` プロパティを設定できるようにし、トレースバックフォーマッターをそれに従わせることで、カスタムの原因チェーンを簡単にサポートすることができます。

エラー原因を設定するためのカスタムメカニズムを使用する必要があります。非常に非侵襲的なアプローチとして、以下のようなものがあります：

```js
try {
    f();
} catch (e) {
    var e2 = new Error("something went wrong");  // line N
    e2.cause = e;                                // line N+1
    throw e2;                                    // line N+2
}
```

これはかなり厄介で、エラー行の情報が簡単に歪んでしまいます。行数の問題は、可読性を犠牲にしてでも、エラー作成を1行にまとめることで軽減できる：

```js
    try {
        f();
    } catch (e) {
        var e2 = new Error("something went wrong"); e2.cause = e; throw e2;
    }
```

また、エラーコンストラクタを拡張して、コンストラクタ呼び出しの際に原因を指定できるようにすることもできます。これはJavaの動作を模倣したもので、使い勝手は良いのですが、標準的なセマンティクスに干渉する可能性が高くなります：

```js
    try {
        f();
    } catch (e) {
        throw new Error("something went wrong", e);
    }
```

Error.prototypeから継承されたセッターメソッドを使用することは、非常に悪いアイデアです。 このような呼び出しは移植不可能であり、他のECMAScriptエンジンで使用するとエラーが発生するためです。:

```js
    try {
        f();
    } catch (e) {
        var e2 = new Error("something went wrong", e);
        e2.setCause(e);  // throws error if setCause is undefined!
        throw e2;
    }
```

Duktape APIを使用するCコードやDuktapeの実装内部からもエラーが発生（スロー）するため、これらについても原因処理を考慮する必要があります。

cause`プロパティは何でも設定できるので、実装では、例えば、以下のようなことを許容する必要があります：

```js
    // non-Error causes (print reasonably in a traceback)
    e.cause = 1;

    // cause loops (detect or sanity depth limit traceback)
    e1.cause = e2;
    e2.cause = e1;
```

## トレースバックフォーマット (\_Tracedata)

### 概要

トレースデータ `_Tracedata` 値の目的は、エラー処理によってコールスタックが巻き戻される前に、関連するコールスタック情報を非常に素早く取得することである。多くの場合、トレースバック情報は全く使用されないので、コンパクトで安価な方法で記録する必要があります。

これらの要件を満たすために、以下に説明する現在のフォーマットは、少し難解です。このフォーマットはバージョンに依存し、ユーザーコードから直接アクセスすることは想定していません。

`_Tracedata`の値はフラットな配列で、次のような値が格納されます。: (1) コンパイルエラーの可能性のある箇所、(2) C言語の呼び出しの可能性のある箇所、(3) コールスタックの内容。コールスタックの先頭から始まり、コールスタックの底か最大トレースバック深度に達するまで下へ下へと作業する。

トレースデータは、Duktapeの内部機能でのみ処理されます：

- `Error.prototype.stack`アクセサは、トレースデータを人間が読めるように印刷可能なトレースバック文字列に変換します。
- `Error.prototype.fileName` と `Error.prototype.lineNumber` アクセサは、トレースデータに基づいてエラーの原因となるファイルや行を指定します。
- 現在（Duktape 1.4時点）、ユーザーアプリケーションでトレースデータをデコードするためのヘルパーは公開されていません。しかし、ユーザーコードは `errCreate` と `errThrow` フックの `Duktape.act()` を使って現在のコールスタックを調査することができます。

Duktape 1.4.0での具体的なトレースデータの例です：

```sh
((o) Duktape 1.3.99 (v1.3.0-294-g72447fe)
duk> try { eval('\n\nfoo='); } catch (e) { err = e; }
= SyntaxError: parse error (line 3)
duk> err.stack
= SyntaxError: parse error (line 3)
        input:3
        duk_js_compiler.c:3655
        eval  native strict directeval preventsyield
        global input:1 preventsyield
duk> Duktape.enc('jx', err[Duktape.dec('hex', 'ff') + 'Tracedata'], null, 4)
= [
    "input",                \  compilation error site
    3,                      /
    "duk_js_compiler.c",    \  C call site
    4294970951,             /
    {_func:true},           \
    107374182400,           |  callstack entries
    {_func:true},           |
    34359738375             /
]
```

### トラディショナルパーツ

#### コンパイルエラー

コンパイル中にエラーが発生した場合（通常はSyntaxError）、ソーステキストのファイル/行が `_Tracedata` にプッシュされます：

- ソースファイル名（文字列）。
- 数値（double）として、問題のあるリネン番号。

#### Cコールサイト

呼び出しに関連するC言語のコールサイトがある場合、コールサイトは `_Tracedata` にプッシュされます。:

- The `__FILE__` value as a string.
- A number (double) containing the expression:

```c
(flags << 32) + (__LINE__)
```

現在の唯一のフラグは、ユーザーがエラーに関連する `fileName` または `lineNumber` を要求したときに、`__FILE__` / `__LINE__` のペアをエラー位置として \"blamed" するかどうかを示します。.

#### コールスタックエントリー

その後、コールスタック要素ごとに、`_Tracedata`に追加される配列のエントリは、以下のペアからなる：

- アクティベーションの関数オブジェクトです。関数オブジェクトには、関数の種類と名前が含まれています。また、ファイル名（またはそれに相当するもの、"global "や "eval"）と、場合によってはPCから行へのデバッグ情報も含まれます。これらは、印刷可能なトレースバックを作成するために必要である。
- 式を含む数値（double）：

```c
(activation_flags << 32) + (activation_pc)
```

C言語の関数の場合、プログラムカウンタの値は0である。起動フラグの値は `duk_hthread.h` で定義されています。PCの値は、関数オブジェクトのデバッグ情報とともに行番号に変換することができます。このフラグにより、例えばテールコールをトレースバックで記録することができます。

### 備考

- IEEE doubleは53ビットの整数を正確に保持することができるので、現在の表現ではフラグをたくさん置くスペースがあります。ただし、フラグはフラグフィールドの下位になければなりません（ビット20以下）。
- 起動ごとに `_Tracedata` 配列に追加される要素の数は、配列の先頭から値を解読できる限り一定である必要はない（言い換えれば、ランダムアクセスは今のところ重要ではない）。
- もしあれば、`this`バインディングは現在記録されていません。
- 活性化レコードの変数値は記録されない。コールスタックを検査することができ、レジスタマップ（定義されている場合）は識別子名をレジスタにマッピングする方法を提供するため、それらは実際に利用可能である。これは間違いなく将来の仕事であり、より良いデバッグサポートのために必要かもしれません。
- 現在 `_Tracedata` の値は配列ですが、メモリ使用量とパフォーマンスを最適化するために、将来的にはそれ自身の内部型に変更されるかもしれません。この内部型は基本的に型付きバッファであり、ガベージコレクションはこのバッファにアクセスする方法を知っています。
