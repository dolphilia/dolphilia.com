## 関数オブジェクト {#function_objects}

### ECMAScriptの関数

Duktape Function オブジェクトは、標準的な ECMAScript プロパティにいくつかのプロパティを追加します。以下の表は、新しく作成された関数インスタンスに割り当てられたプロパティをまとめたものです（もちろん、プロパティは後から追加したり削除したりすることができます）。


| プロパティ | 互換性   | 説明 |
| ---- | ---- | ---- |
| length    | standard | Function (nominal) 引数の数 (該当する場合)。バインドされた関数を含む全てのFunctionオブジェクトに存在する。 |
| prototype | standard | コンストラクタとして呼び出されたとき、新しいオブジェクトに使用されるプロトタイプです。ほとんどの構築可能なFunctionオブジェクトに存在し、バインドされた関数にはコピーされない。|
| caller    | standard | エラーを投げるアクセサです。ストリクト関数とバインド関数に存在します。バインドされた関数にはコピーされません。(DUK_USE_NONSTD_FUNC_CALLER_PROPERTY が与えられた場合、非厳密関数は非標準の呼び出し側プロパティを取得します)。 |
| arguments | standard | アクセサで、エラーを投げます。厳密な関数とバインドされた関数に存在します。バインドされた関数にはコピーされません。 |
| name      | Duktape  | 関数名、下記参照。バウンド関数名は、このプロパティに基づいて、"bound " という接頭辞が付きます（ES2015の標準的な動作です）。
| fileName  | Duktape  | 関数が宣言されたファイル名またはコンテキスト（エラートレースバックと同じ名前）。ターゲット関数からバインド関数にコピーされます。
| callee    | n/a      | デフォルトでは割り当てられない（"caller" プロパティとの関係を明確にするために、ここに記載）。 |


name プロパティは、すべての関数に割り当てられ、トレースバックで使用される名前でもあります。以下のように割り当てられる。

```javascript
function funcDecl() {
    /* Function declaration: 'name' is declaration name, here 'funcDecl'. */
}

var foo = function namedFunc() {
    /* Named function expression: 'name' is the name used in expression,
     * here 'namedFunc' (not 'foo').
     */
}

var bar = function () {
    /* Anonymous function expression: 'name' is the empty string. */
}
```

> ECMAScript のいくつかの組み込み関数は、ユーザーが作成した関数とは異なるプロパティを持ちます。


### Duktape/C関数

ユーザーが作成したDuktape/C関数（duk_push_c_function()）は、Functionオブジェクトのメモリフットプリントを削減するために、異なるプロパティのセットを持っています。

| プロパティ | 互換性 | 説明 |
| ---- | ---- | ---- |
| length | standard | Functionの引数カウント、duk_push_c_function()への引数にマッチ、 varargsの場合は0。書き込み不可、設定不可。


特に、標準のprototype、caller、argumentsプロパティがデフォルトで欠落していることに注意。これは厳密にはコンプライアンスではありませんが、関数のフットプリントを小さくするためには重要です。もちろん、ユーザがこれらのプロパティを設定することは可能ですが、設定する必要はありません。

また、（非標準の）name プロパティもありません。手動で設定すると、トレースバックで関数がどのように表示されるかに影響するため、便利です。


### 軽量Duktape/C関数

軽量 Duktape/C 関数 (lightfuncs) は、ECMAScript 環境でネイティブ関数を表現するための非常にメモリ効率の良い方法です。Lightfuncs はプロパティ・テーブルを持たないので、プロパティを保持することはできま せん。しかし、Function.prototype を継承し、以下の仮想プロパティ（設定不可、書き込み不可）を持っています。


| Property name | Compatibility | Description |
| ------------- | ------------- | ----------- |
| length        | standard      | Function (nominal) argument count. |
| name          | Duktape       | Function name: "light_\<PTR\>_\<FLAGS\>". |


nameプロパティは自動生成された仮想関数名です。\<PTR\>はDuktape/C関数ポインタのプラットフォーム依存ダンプ、\<FLAGS\>は16ビット内部制御フィールドの生の16進ダンプです（フォーマットはDuktape内部）。特定のフォーマットに依存してはいけません。例えば

```javascript
duk> print(myLightFunc.name);
light_0805b94c_0511
```

通常の関数と同様に、lightfunc は実装に依存した文字列に強制されます。特定のフォーマットに依存してはいけません。例えば


```javascript
duk> print(myLightFunc);
function light_0805b94c_0511() {"light"}
```


詳しくは、こちらをご覧ください。

- lightfuncsの使い方
- アルゴリズムを入力する
- lightweight-functions.rst

