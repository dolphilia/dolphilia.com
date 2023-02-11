
## カスタム動作 {#custom_behavior}

E5.1やその他の関連仕様から逸脱したDuktapeの動作についてまとめます。


### Duktapeビルトインとカスタム・タイプ 

Duktape組み込みは（もちろん）非標準であり、Duktape固有の機能へのアクセスを提供します。また、バッファ、ポインター、lightfunc タイプはカスタムです。


### 隠しシンボル

オブジェクトは、隠された Symbol キーを持つプロパティを持つことができます。これらは ES2015 Symbols に似ていますが、列挙されたり、Object.getOwnPropertySymbols()からも返されません。キーが意図的に無効な (拡張) UTF-8 表現を使用しているため、通常の ECMAScript コードはこのようなプロパティを参照することができません。


### "use duk notail" ディレクティブ

use duk notail" 指令は非標準です。これは、関数がテールコールされるのを防ぐものです。

### "const" はほとんど "var" のように扱われます

const キーワードは、最小限の非標準のセマンティクスでサポートされています (ECMAScript 6 で公式に定義されています)。詳しくは Const 変数を参照してください。

### Error オブジェクトと Function オブジェクトの追加プロパティ

Error オブジェクトと Function オブジェクトを参照してください。

非厳格な関数インスタンスは、E5/E5.1 仕様では呼び出し元のプロパティを持ちません。現実のコードではこのプロパティを期待するものがありますので、 DUK_USE_NONSTD_FUNC_CALLER_PROPERTY という設定オプションで有効にすることができます。

### 関数文

E5.1では、関数宣言がプログラムまたは関数のトップレベル表現の外側に現れることを許可していません。

```javascript
function test() {
    // point A
    try {
        throw new Error('test');
    } catch (e) {
        // This is a SyntaxError in E5.1
        function func() {
            print(typeof e);
        }
        // point B
    }
    // point C
}
```


これらの宣言は「関数文」とも呼ばれ、実世界のコード（test262テスト・スイートを含む）では非常に頻繁に登場するので、Duktapeでは許可しています。残念ながら、Javascriptエンジンによって使用されるセマンティクスがいくつかあります（ES2015では、残念ながら関数文のセマンティクスは指定されていません）。Duktapeは、V8の関数文の挙動に従います。

- Strict function: SyntaxErrorが投げられます（標準的な動作）。
- 非厳格な関数：関数文を通常の関数宣言のように扱い、概念的には関数の先頭に「持ち上げる」。
例として、上記の例では以下のような挙動となります。

```javascript
function test() {
    function func() {
        print(typeof e);
    }
 
    try {
        throw new Error('test');
    } catch (e) {
    }
}
```

上記の例のfunc()は、すでにポイントAで宣言され、呼び出し可能であり、ポイントA、B、Cのいずれにおいてもeバインディングにアクセスすることはできないだろう。


### RegExpのリニエンシー

ほとんどの ECMAScript エンジンは ECMAScript E5.1 仕様 (セクション 15.10.1 パターン) で保証されているよりも多くの構文をサポートしています。その結果、厳密な ECMAScript E5.1 正規表現構文では動作しないコードがかなり多くなっています。ウェブブラウザエンジンに期待される追加構文の多くは、ES2015 Annex B.1.4 Regular Expression Patterns に記載されています。しかし、Annex B Additional ECMAScript Features for Web Browsers の機能は、新しいコードには推奨されないことに注意してください。「これらの機能は、ECMAScript のコア言語の一部とはみなされません。プログラマは新しい ECMAScript コードを書くときに、これらの機能や動作を使用したり仮定したりしてはいけません。ECMAScript の実装は、その実装が Web ブラウザの一部であるか、または Web ブラウザが遭遇するのと同じレガシー ECMAScript コードを実行する必要がある場合を除いて、これらの機能を実装しないように推奨されています。"

Duktapeは、既存のコードをより良くサポートするために、一部のES2015 Annex Bの構文も許可しています。この非標準的な動作は、必要に応じて設定オプションでオフにすることができます。サポートされる追加構文の例をいくつか挙げます。

```javascript
  /{(\d+)}/    // unescaped left curly, digits, unescaped right curly; ES2015 Annex B
  /\{(\d+)\}/  // same, ES5 compliant

  /]/          // unescaped right bracket; ES2015 Annex B
  /\]/         // same, ES5 compliant

  /\$/         // literal dollar using escape; ES2015 Annex B
  /\u0024/     // same, ES5 compliant
```


### Setter/getter key 引数

ECMAScript の標準的な動作は、セッターとゲッターにはアクセスされるプロパティの名前を与えないことです。このため、複数のプロパティに対して一つのセッターやゲッターを再利用することができません。各プロパティに対して別々の関数が必要となり、不便であったり、メモリを浪費したりします。

Duktapeでは、プロパティ・キー名をセッターやゲッター関数への非標準の追加引数として提供しています。詳しくは、test-dev-nonstd-setget-key-argument.jsとProperty virtualizationを参照してください。DUK_USE_NONSTD_GETTER_KEY_ARGUMENT と DUK_USE_NONSTD_SETTER_KEY_ARGUMENT という設定オプションを無効にすると、標準に準拠した厳格な動作が可能になります。


### Object.setPrototypeOf and Object.prototype.__proto__ (ES2015)

[Object.setPrototypeOf and Object.prototype.\_\_proto\_\_]() を参照


### プロキシオブジェクト(ES2015)

Proxyオブジェクト（サブセット）を参照。


### JSON.stringify() は U+2028 と U+2029 をエスケープする

JSON.stringify()の標準的な動作は、U+2028とU+2029をエスケープせずに出力することです。これは、出力がウェブ・ページで使われたり、eval()で解析されたりしたときに、直感に反する動作につながります：U+2028とU+2029文字は行末とみなされ、構文エラー（終端がない文字列）につながります。Duktapeはこの問題を避けるために、デフォルトでU+2028とU+2029をエスケープします。設定オプションDUK_USE_NONSTD_JSON_ESC_U2028_U2029を無効にすると、準拠した動作をオンにすることができます。


### String.fromCharCode()は32ビットコードポイントを受け付けます

String.fromCharCode() の標準的な動作は、コードポイント値に対して ToUInt16() 強制を使用することです。DuktapeはデフォルトでToUint32()を使用し、非BMP文字列をより良くサポートします。DUK_USE_NONSTD_STRING_FROMCHARCODE_32BIT という設定項目を無効にすれば、強制的に準拠した動作をさせることが可能です。

### 配列インスタンスの数値インデックスの書き込み

デフォルトでは、Duktapeは、Arrayインスタンスへの書き込みに高速パスを提供します。高速パスは、数値インデックスが使用され（例： arr[7] = 'foo'）、いくつかの内部条件が満たされたときに有効になります。高速パスが採用された場合、DuktapeはArray.prototypeに矛盾するプロパティがないかチェックしません（実際のコードでは非常に稀です）。これにより、一般的な配列の書き込みが高速になります。この動作は非準拠ですが、Array.prototypeが数値キーを持つプロパティを持たない限り、外見上の差はありません。DUK_USE_NONSTD_ARRAY_WRITE と DUK_USE_ARRAY_PROP_FASTPATH という設定オプションを無効にすると、準拠した挙動をオンにすることができます。高速パスの動作の詳細については、以下を参照してください： test-misc-array-fast-write.js.


### TypedArrayバインディング

DuktapeはES2015 TypedArrayバインディングを提供しますが、いくつかの詳細はまだ修正されていません。例えば、オフセットと長さの値に対する引数の強制の小さな違いなどです。

プレーンバッファーのカスタムタイプは、ECMAScriptコードではUint8Arrayオブジェクトのように振る舞いますが、Duktape C APIでは別のタイプを持っています。


### Node.jsのBufferバインディング §。

DuktapeはNode.jsライクなBufferバインディングを提供します。Node.jsの動作とDuktapeの動作には、いくつかの違いがあります。これらの違いは以下の通りです。

- 他のバッファ・タイプとの相互運用性。ArrayBuffer、DataView、または型付き配列（Uint8Arrayなど）は、Node.jsのBufferが許されるところであれば、通常どこでも許されます。
^ バッファのデータは、割り当て時および連結時の totalLength が入力バッファの合計サイズを超えたときに、常にゼロになります。
- 読み込み/書き込みのオフセットと長さの引数は、noAssert が真であっても、メモリセーフな動作を保証するために常に検証されます。読み出しに失敗した場合はNaNを、書き込みに失敗した場合は0を返す。
- 部分的な読み込み/書き込みは決して行われない: 読み込み/書き込みの一部が有効なバッファの外にある場合、それは拒否される。
- オフセットや長さなどの引数の強制に若干の違いがある。
- 例えば、writeUInt8()を使って0x100を書き込む場合、TypeErrorを投げるのではなく、0x00に静かに強制されます。
- Duktapeは "utf8 "エンコーディングのみをサポートします（そして、スペリングのバリエーションは一切受け付けません）。ほとんどのAPIコールはエンコーディングの引数を無視し、文字列からバッファへの強制変換に暗黙のうちにUTF-8を使用します。
- UTF-8デコードの置換文字のアプローチは、Unicode Technical Committee Recommended Practice for Replacement Charactersに従っており、WHATWG Encoding API仕様と一致していますが、Node.js（少なくともバージョンv6.9.1まで）とは異なっています。


### Shebang コメントのサポート

duk_compile() フラグ DUK_COMPILE_SHEBANG により、shebang コメントのパースが可能になります。最初の行の最初のカラムに #!を付けると、その行はコメントとして扱われます。

例:

```ruby
#!/usr/bin/duk
print('Hello world!');
```


この機能は、DUK_USE_SHEBANG_COMMENTS の定義を解除することで無効にすることができます。

