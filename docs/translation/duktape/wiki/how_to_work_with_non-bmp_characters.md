# BMP以外の文字を扱う方法

## ECMAScript と Duktape による非 BMP のサポート

### ECMAScript の標準文字列は 16 ビットのみ

ECMAScript 標準自体は非 BMP 文字をサポートしていません: すべてのコードポイントは厳密に 16-bit です。非 BMP 文字はサロゲートペアで表現されることを意図しています。

- E5.1 Section 8.4: http://www.ecma-international.org/ecma-262/5.1/#sec-8.4
- E6 Section 6.1.4: http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types-string-type

ES2015 RegExp の u フラグを持つパターンは、文字列データを UTF-16 として解釈することで、非 BMP 文字をサポートしています。

- http://www.ecma-international.org/ecma-262/6.0/#sec-pattern-semantics

ES2015 String.prototype.trim()では、非BMP文字に対する特別な処理も行っています（ここでも文字列はUTF-16として解釈されます）。

- http://www.ecma-international.org/ecma-262/6.0/#sec-string.prototype.trim

### Duktape文字列は最大32ビットのコードポイントをサポート

Duktapeは、拡張UTF-8形式で文字列を表現します。この形式では、任意の16ビット・コードポイント（ECMAScriptが要求するもの）と、完全な32ビット範囲の拡張コードポイントの両方が許容されます。また、（UTF-8では無効な）任意のバイト列も許容されます。

- http://duktape.org/guide.html#type-string

その結果、DuktapeはBMP以外の範囲の文字を直接サポートすることになりました。

- Cコードは、例えばduk_push_string()を使って、（拡張）UTF-8として表現された文字列を直接プッシュすることができます。
- 非 BMP 文字は、ほとんど ECMAScript コードで期待通りに動作します。標準的なバインディングはコードポイントが最大 16 ビットであることを期待しているので、期待通りに動作しない ECMAScript バインディングがいくつかあります。

## BMP非対応文字への主な対応方法

主にどちらかを選択することになります。

- サロゲートペアの使用：標準的な方法で、エンジンに依存しませんが、文字列の長さがサロゲートペアの文字を個別に数えるなど、いくつかの不都合があります。Cコードでは、非BMP文字をまずサロゲートペアにエンコードし、そのペアの各コードポイントをCESU-8でエンコードします。
- Duktape固有の非BMP文字列を使用する：Cコードにとってより自然で、.lengthは正しくなります。Cコードでは、文字列を直接UTF-8でエンコードします。

## サロゲートペアの使用

例えば、LEFT-POINTING MAGNIFYING GLASS U+1F50Dを表すには、以下のようにします。

```js
// http://www.russellcottrell.com/greek/utilities/surrogatepaircalculator.htm
var magnifyingGlass = '\uD83D\uDD0D';

print(magnifyingGlass.length);  // prints 2
print(Duktape.enc('hex', magnifyingGlass));  // prints eda0bdedb48d, surrogate codepoints eda0bd edb48d
= eda0bdedb48d
```

特に、"the \u escape "は4桁までしか受け付けないため、誤解を招く可能性があることに注意してください。

```js
// U+1F50の後にASCIIの'D'が続くとパースされる。
var magnifyingGlass = '\u1F50D';
```

もし、あなたのCコードにUTF-8を表示させたいなら、サロゲートペアを適切にエンコード/デコードする必要があります。おそらく、以下のようなヘルパーを書くのがベストでしょう。

- UTF-8文字列を値スタックにプッシュし、非BMP文字をサロゲートペア(CESU-8)に変換する。
- サロゲートペア(CESU-8)をUTF-8に変換して、文字列をスタックに読み込む。

## Duktape UTF-8を使用する

この方法は、文字列を直接UTF-8で表現できるため、変換やサロゲートペアの扱いが不要であり、Cコードに便利です。

制限としては、非BMP文字に対するECMAScriptの構文がないため、リテラルで使用できないことが挙げられます。いくつかの回避策があります。

```js
// UTF-8に対応したDuktape JXフォーマットからデコードします。
var magnifyingGlass = Duktape.dec('jx', '"\\U0001f50d"');
print(magnifyingGlass.length);  // prints 1
print(Duktape.enc('hex', magnifyingGlass));  // prints f09f948d, direct UTF-8  for U+1F50D

// UTF-8データを16進数で直接入力します。
var magnifyingGlass = Duktape.dec('hex', 'f09f948d');
print(magnifyingGlass.length);
print(Duktape.enc('hex', magnifyingGlass));

// UTF-8 データをバッファに入力し、文字列に変換する。
var magnifyingGlass = String(Duktape.Buffer(new Uint8Array([ 0xf0, 0x9f, 0x94, 0x8d ])));
print(magnifyingGlass.length);
print(Duktape.enc('hex', magnifyingGlass));

// Duktape 1.2.0 以降の fromCharCode() は、非 BMP コードポイントを受け入れるためのデフォルトの非標準動作（無効にすることが可能）になっています。
var magnifyingGlass = String.fromCharCode(0x1f50d);
print(magnifyingGlass.length);
print(Duktape.enc('hex', magnifyingGlass));
```