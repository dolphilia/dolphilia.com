# グローバルオブジェクトへの参照を取得する方法

ECMAScript にはグローバル・オブジェクトのための標準的な名前付きバインディングがないので、スクリプトは様々なイディオムを使ってグローバル・オブジェクトにアクセスします。Duktape 2.1以降では、https://github.com/tc39/proposal-global に基づいて、明示的なグローバル・バインディングが利用できます。

次のスニペットは、グローバル（プログラム）コード、evalコード、関数コードなど、どのコンテキストからでもグローバルオブジェクトに簡単にアクセスできます（暗号化されているとしても）。

```js
var globalObject = new Function('return this;')();
```

globalは標準化される可能性が高いので、以下のようなpolyfillが望ましいかもしれません（https://github.com/svaarala/duktape/blob/master/polyfills/global.js）。

```js
if (typeof global === 'undefined') {
    (function () {
        var global = new Function('return this;')();
        Object.defineProperty(global, 'global', {
            value: global,
            writable: true,
            enumerable: false,
            configurable: true
        });
    })();
}
```

new Function(...) は、引数として与えられたボディを持つ新しい関数を作成します。他の多くのコンテキストとは異なり、周囲のコードの厳密性は継承されないので、作成された関数は厳密ではないので、これは一貫してグローバルオブジェクトにバインドされます。