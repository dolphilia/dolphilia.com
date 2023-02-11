## 互換性 {#compatibility}

このセクションでは、ECMAScriptの方言、拡張、フレームワーク、およびテスト・スイートとDuktapeの互換性について説明します。


### ECMAScript E5 / E5.1

Duktapeの主な互換性目標は、ECMAScript E5/E5.1互換であることです。しかし、ES5の機能セマンティクスは、より新しい仕様バージョンで互換性のない変更が行われた場合、ES2015（またはそれ以降）に更新されます。現在の互換性レベルはかなり高いはずです。


### ECMAScript 2015 (E6)

DuktapeはECMAScript 2015（E6）の機能を一部実装していますが、一般的にE6との互換性はまだありません。


### ECMAScript 2016（E7）

DuktapeはECMAScript 2016（E7）からいくつかの機能を実装していますが、一般的にE7との互換性はまだありません。


### ECMAScript E3 

E5/E5.1仕様で要求される以外に、ECMAScript E3との互換性を維持するための努力はしていません。

### CoffeeScript

CoffeeScriptは、Duktapeと互換性があるはずのJavaScriptにコンパイルされます。既知の互換性の問題はありません。

いくつかのCoffeeScriptのサンプルが配布物に含まれています。単に examples/coffee/ で make を実行するだけです。例えば、hello.coffee:

```coffee
print 'Hello world!'
print 'version: ' + Duktape.version
```

コンパイルすると

```javascript
(function() {

  print('Hello world!');

  print('version: ' + Duktape.version);

}).call(this);
```


### Coco

CoffeeScriptと同じく、CocoはJavascriptにコンパイルします。既知の問題はありません。


### LiveScript

CoffeeScript と同様に、LiveScript は Javascript にコンパイルされます。既知の問題はありません。


### TypeScript

TypeScript は Javascript にコンパイルされます。Microsoft TypeScript コンパイラ（ES5/CommonJS モード）を使って TypeScript をコンパイルし、Duktape を使って結果の Javascript を実行しても、既知の問題はありません。また、DuktapeでTypeScriptコンパイラーを実行することも可能です。


### Underscore.js

Underscore.jsは、プレーンなECMAScriptに多くの便利なユーティリティを提供します。Duktapeは、Underscoreのほぼ全てのテストケースをパスします。現在の互換性ステータスについてはunderscore-status.rstを参照してください。


### Test262

test262はE5.1互換性をテストするためのテスト・スイートですが、標準のE5.1以外のテストも含まれています。Duktape は test262 のほぼ全てのケースに合格しています。現在の互換性ステータスは test262-status.rst を参照してください。


### Asm.js

asm.js は「コンパイラのための低レベルで効率的なターゲット言語として使用できる、JavaScript の厳密なサブセット」です。JavaScriptのサブセットとして、asm.jsの型注釈を使った関数は、Duktapeと完全に互換性があるはずです。しかし、Duktapeはasm.jsを特にサポートしておらず、asm.jsのコードを最適化することはありません。実際、asm.jsのコードは不要なバイトコードを生成し、通常のECMAScriptのコードよりも実行速度が遅くなります。asm.jsによって指定された "use asm "指示は、Duktapeでは無視されます。


### Emscripten

Emscriptenは、C/C++をJavascriptにコンパイルします。Duktapeは現在（Duktape 1.5.0時点）Emscriptenと互換性があり、Emscriptenのfastcompが使用できるES2015 TypedArrayをサポートしています。

Duktapeコンパイラが仮想レジスタを使い果たすため、大規模なプログラムは失敗する可能性があります。また、Duktapeはインタプリタ型エンジンであるため、性能はやや制限されます。現在の互換性の状況は emscripten-status.rst を見てください。

Duktape自体はEmscriptenでコンパイルされているので、例えばWebページの中でDuktapeを実行することも可能です（Dukweb REPLを参照）。


### Lua.js

lua.jsは、LuaのコードをJavascriptに変換します。生成されたJavascriptを実行する上で既知の問題はありませんが、Duktapeがlua.jsが期待するconsole.logを提供しないことが挙げられます。これは簡単に改善できます。例えば、以下のように前置きをします。

```lua
console = { log: function() { print(Array.prototype.join.call(arguments, ' ')); } };
```


### JS-Interpreter

JS-Interpreterは、JavascriptをJavascriptの中で解釈します。JS-InterpreterはDuktapeと一緒に動作しますが、DuktapeはJS-Interpreterが期待するウィンドウを提供しません。これは、プリペンドすることで修正可能です。

```javascript
window = {};
```
