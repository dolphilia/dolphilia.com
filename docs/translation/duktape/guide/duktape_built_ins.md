

## Duktapeのビルトイン {#duktape_built_ins}

このセクションでは、Duktape 固有の、そして ECMAScript 以外の組み込みオブジェクト、メソッド、および値についてまとめます。


### グローバルオブジェクトプロパティの追加

| プロパティ | 説明 |
| ---- | ---- |
| globalThis | グローバル・オブジェクト自体を参照します。proposal-global を参照してください。 |
| Duktape | Duktape組み込みオブジェクト。雑多な実装固有のものが含まれています。 |
| CBOR | cbor-jsをベースにしたCBOR実験用API。 |
| TextEncoder | WHATWG Encoding API の TextEncoder()。UTF-8エンコーディングで文字列をバッファに変換します。 |
| TextDecoder | TextDecoder() WHATWG Encoding APIより。UTF-8エンコーディングを使って、バッファを文字列に変換します。 |
| performance | High Resolution Time Level 2のperformance.now()。Navigation Timing の performance.timing のようなバインディングはサポートされていません。 |


### globalThis

グローバルオブジェクトそのものを参照します（proposal-globalを参照）。(バインディングは当初'global'という名前でしたが、いくつかのWebサイトが壊れたため変更されました。)。


### Duktapeオブジェクト

| プロパティ | 説明 |
| ----  | ---- |
| version | Duktapeのバージョン番号：(メジャー * 10000) + (マイナー * 100) + patch. |
| env | エンディアンとアーキテクチャのような最も重要で効果的なオプションのバージョン依存の要約。 |
| fin | オブジェクトのファイナライザーを設定または取得する。 |
| enc | 値をエンコードする(hex, base-64, JX, JC)。Duktape.enc('hex', 'foo')。 |
| dec | 値（hex、base-64、JX、JC）をデコードする。Duktape.dec('base64', 'Zm9v')。 |
| info | 値の内部情報（ヒープアドレスやアロックサイズなど）をバージョン固有のフォーマットで取得する。C API の同等品は duk_inspect_value() である。 |
| act | コールスタックエントリに関する情報を取得する。C APIでは、duk_inspect_callstack_entry()がこれに相当する。 |
| gc | マーク・アンド・スイープ・ガベージ・コレクションをトリガする。 |
| compact | 値（オブジェクト）に割り当てられたメモリをコンパクトにする。 |
| errCreate | 作成されたエラーを修正/置換するためのコールバック。 |
| errThrow | スローされようとしているエラーを修正／置換するためのコールバック。 |
| Pointer | ポインタのコンストラクタ(関数)。 |
| Thread | スレッド コンストラクタ（関数）。 |


#### version

versionプロパティは、バージョンに基づく機能の検出と動作を可能にします。バージョン番号は直接比較することができます：論理的に高いバージョンは、数値的にも高くなります。例えば

```javascript
if (typeof Duktape !== 'object') {
    print('not Duktape');
} else if (Duktape.version >= 20403) {
    print('Duktape 2.4.3 or higher');
} else if (Duktape.version >= 10500) {
    print('Duktape 1.5.0 or higher (but lower than 2.4.3)');
} else {
    print('Duktape lower than 1.5.0');
}
```


プレリリースのバージョンの値は、実際のリリースより1つ少なくなります。例えば、0.12.0プレリリースは1199、1.3.0プレリリースは10299となります。バージョニングを参照してください。

機能検出を行う際には、Duktapeが存在するかどうかを確認することを忘れないでください。あなたのコードは通常、できるだけ多くのエンジンで動作するはずです。チェックの際に、識別子の直接参照を使うというよくある落とし穴は避けてください。

```javascript
// Bad idea: ReferenceError if missing
if (!Duktape) {
    print('not Duktape');
}

// Better: check through 'this' (bound to global)
if (!this.Duktape) {
    print('not Duktape');
}

// Better: use typeof to check also type explicitly
if (typeof Duktape !== 'object') {
    print('not Duktape');
}
```


#### env

envは、最も重要で効果的なコンパイルオプションを、バージョン固有の、かなり不可解な方法で要約したものです。この形式はバージョンに依存し、プログラム的に解析することは意図されていません。これは主に開発者のために役立ちます（値を設定するコードについては duk_hthread_builtins.c を参照してください）。

Duktape 1.1.0 の例です。

```c
ll u n p2 a4 x64 linux gcc     // l|b|m integer endianness, l|b|m IEEE double endianness
                               // p|u packed/unpacked tval
                               // n|various, memory optimization options (n = none)
                               // p1|p2|p3 prop memory layout
                               // a1|a4|a8: align target
                               // x64|x86|arm|etc: architecture
                               // linux|windows|etc: operating system
                               // gcc|clang|msvc|etc: compiler
```


エンディアンは、lがリトルエンディアン、bがビッグエンディアン、mがミックスエンディアン（レガシーARMデバイス、The FPAアーキテクチャなど参照）を表わします。


#### fin()

単一の引数で呼び出された場合、オブジェクトの現在のファイナライザを取得します。

```javascript
var currFin = Duktape.fin(o);
```


2つの引数で呼ばれた場合、オブジェクトのファイナライザを設定する（未定義を返す）。

```javascript
Duktape.fin(o, function(x) { print('finalizer called'); });
Duktape.fin(o, undefined);  // disable
```

#### enc

enc() は、その引数の値を選択されたフォーマットにエンコードします。最初の引数はフォーマット（現在サポートされているのは "hex", "base64", "jx", "jc"）、2番目の引数はエンコードする値、それ以降の引数はフォーマットに依存するものである。

hex "と "base64 "の場合、バッファの値はそのままエンコードされ、その他の値は文字列強制された後、内部バイト表現（拡張UTF-8）がエンコードされる。その結果が文字列となる。例えば、ある文字列をbase64にエンコードする場合。

```javascript
var result = Duktape.enc('base64', 'foo');
print(result);  // prints 'Zm9v'
```


jx"、"jc "の場合、フォーマット名に続く引数リストは、JSON.stringify()と同様、value、replacer（オプション）、スペース（オプション）である。たとえば

```javascript
var result = Duktape.enc('jx', { foo: 123 }, null, 4);
print(result);  // prints JX encoded {foo:123} with 4-space indent
```


#### dec()

dec() は enc() の逆機能を提供します。

hex" と "base64" については、入力値はまず文字列強制されます (文字列をデコードすることにのみ意味があります)。結果は常にプレーンなバッファとなります。たとえば

```javascript
var result = Duktape.dec('base64', 'Zm9v');
print(typeof result, result);  // prints 'object foo'
```


もし、プレーンなバッファよりも完全なUint8Arrayを好むのであれば、以下のように結果を強制することができます。

```javascript
var result = Object(Duktape.dec('base64', 'Zm9v'));
print(typeof result, result);  // prints 'object foo'
```


文字列の値を取得したい場合は、以下のようにプレーンバッファを文字列に変換することができます。

```javascript
// 入力をUTF-8としてデコードするTextDecoderを使用します。
// また、Node.jsのBufferバインディングを使用しても同様の結果を得ることができます。

var result = new TextDecoder().decode(Duktape.dec('base64', 'Zm9v'));
print(typeof result, result);  // prints 'string foo'
```


jx"、"jc "の場合、フォーマット名に続く引数リストは、JSON.parse()と同様、text、reviver（オプション）である。例えば

```javascript
var result = Duktape.dec('jx', "{foo:123}");
print(result.foo);  // prints 123
```


#### info()

Duktape.info()は、その引数値に関連する内部情報を公開するオブジェクトを返します。現在のフィールドの説明については、 duk_inspect_value() を参照してください。

> 結果オブジェクトのプロパティはバージョン保証の対象外であり、マイナーバージョン（パッチバージョンは除く）であっても互換性のない形で変更される可能性があります。


#### act()

コールスタックのエントリに関する情報を取得します。1 は最上位 (最内周) のエントリ、-2 はその下のエントリなどです。コールスタックエントリを記述したオブジェクトを返すか、エントリが存在しない場合は未定義を返す。現在のフィールドの説明については、 duk_inspect_callstack_entry() を参照してください。

> 結果オブジェクトのプロパティはバージョン保証の対象外であり、マイナーバージョンでも互換性のない形で変更される可能性がある（パッチバージョンは不可）。

例:

```javascript
function dump() {
    var i, t;
    for (i = -1; ; i--) {
        t = Duktape.act(i);
        if (!t) { break; }
        print(i, t.lineNumber, t.function.name, Duktape.enc('jx', t));
    }
}

dump();
```


この例をコマンドラインツールで実行すると、現在、次のようなものが表示されます。

```javascript
-1 0 act {lineNumber:0,pc:0,function:{_func:true}}
-2 4 dump {lineNumber:4,pc:16,function:{_func:true}}
-3 10 global {lineNumber:10,pc:5,function:{_func:true}}
```


興味深い項目は lineNumber と function で、これは例えば関数名などを提供します。

Duktape.act() を使って、現在の行番号を取得するヘルパーを実装することも可能です。

```javascript
function getCurrentLine() {
    'use duk notail';

    // テールコールを防止し、呼び出しの活性化を確保します。
    // Call stack indices: -1 = Duktape.act, -2 = getCurrentLine, -3 = caller
     

    var a = Duktape.act(-3) || {};
    return a.lineNumber;
}
print('running on line:', getCurrentLine());
```


#### gc()

強制的なマーク＆スイープ収集のトリガーをかける。この呼び出しは、オプションで整数の flags フィールドを取る。定数については、 duktape.h を参照のこと。


#### compact()

ターゲットオブジェクトに割り当てられたメモリを最小にする。C API コール duk_compact() と同じですが、ECMAScript コードからアクセス可能です。オブジェクト以外の引数で呼び出された場合、この呼び出しはノー・オペレーションです。引数の値は関数によって返され、これにより、以下のようなコードが可能になります。

```javascript
var obj = {
    foo: Duktape.compact({ bar: 123 })
}
```


この呼び出しは、オブジェクトが新しいプロパティを獲得する可能性が低いことがわかっているが、万が一獲得した場合にオブジェクトを封印またはフリーズしたくない場合に有用である。


#### errCreate() と errThrow()

これらは、ユーザーコードによって設定され、エラー作成時（errCreate）またはエラースロー時（errThrow）に処理/置換することができる。どちらの値も初期状態では存在しません。

詳細はエラーハンドラ(errCreateとerrThrow)を参照してください。


### Duktape.Pointer (コンストラクタ) 

| プロパティ | 説明 |
| ---- | ---- |
| prototype | Pointer オブジェクトのプロトタイプ |


Pointer コンストラクタは、通常の関数としてもコンストラクタとしても呼び出すことができる関数です。

- 関数として呼び出された場合は、カスタムの ToPointer クラスタを使って最初の引数をポインタに変換します。戻り値は普通のポインタです（Pointerオブジェクトではありません）。
- コンストラクタとして呼び出された場合、カスタムのToPointer強制を使って最初の引数をポインタに強制変換します。内部値は、強制終了の結果得られたポインタである Pointer オブジェクトを返す。新しく作成されたPointerの内部プロトタイプはDuktape.Pointer.prototypeオブジェクトになります。


### Duktape.Pointer.prototype

| プロパティ | 説明 |
| ---- | ---- |
| toString | Pointer を印字可能な文字列に変換する |
| valueOf | Pointer が保持するプリミティブポインタの値を返す |


toString() と valueOf は、プレーンなポインタと Pointer オブジェクトの両方をこのバインディングとして受け付けます。これにより、次のようなコードが可能になります。

```javascript
var plain_ptr = Duktape.Pointer({ test: 'object' });
print(plain_ptr.toString());
```


### Duktape.Thread (コンストラクタ)

| プロパティ | 説明 |
| ---- | ---- |
| prototype | Thread オブジェクトのプロトタイプ |
| resume | 値またはエラーでターゲットスレッドを再開する。引数： ターゲットスレッド、値、値を投げるかどうかを示すフラグ（オプション、デフォルトfalse） |
| yield | 現在のスレッドから値またはエラーを投げる。引数： value、value を投げるかどうかのフラグ（オプション、デフォルトfalse） |
| current | 現在実行中のスレッドオブジェクト |


Threadコンストラクタは、通常の関数としてもコンストラクタとしても呼び出すことができる関数です。動作はどちらの場合も同じです。

最初の引数は関数であるかどうかチェックされます（もしそうでなければ TypeError が投げられます）。この関数は ECMAScript の関数でなければなりません（バインドまたは非バインド）。戻り値は、初期関数が引数関数であると記録された新しいスレッドである（この関数は新しいスレッドが最初に再開されたときに実行を開始する）。新しく作られたスレッドの内部プロトタイプは、Duktape.Thread.prototypeオブジェクトになります。


### Duktape.Thread.prototype

| Property | Description |
| ---- | ---- |
| No properties at the moment. | |


### CBOR

CBOR (Concise Binary Object Representation) は、任意の構造化された値のためのコンパクトなバイナリ符号化方式です。JSONよりも高速で、一部のECMAScriptの値をより正確に符号化することができる。JSONの代替として、状態のシリアライゼーションやIPCなどに適している。参照。

CBOR - Concise Binary Object Representation (cbor.io) を参照。
コンサイスバイナリオブジェクト表現(CBOR) (RFC 7049)
CBORオブジェクトは、任意のECMAScriptの値をCBORに、またはその逆に変換するエンコード/デコード関数を提供します。公式のCBOR APIはまだないので、今のところAPIはcbor-jsをベースにしています。また、CBORのためのC言語のAPIもあります。

> このバインディングは現在実験的なものであり、詳細は時間の経過とともに変更される可能性があります。例えば、ECMAScript の値をより正確にシリアライズするためのカスタム CBOR タグが登録されつつあります。

例:

```javascript
var enc = CBOR.encode([ 'foo', 'bar', { quux: true } ]);
print(Duktape.enc('hex', enc));  // = 8363666f6f63626172a16471757578f5
var dec = CBOR.decode(enc);
print(Duktape.enc('jx', dec));   // = ["foo","bar",{quux:true}]
```


### TextEncoder

TextEncoder() は WHATWG エンコーディング API の一部で、 文字列を UTF-8 エンコーディングでバッファ (Uint8Array) に格納するためのクリーンな方法を提供します。サロゲートペアは処理中に結合されます。例えば

```javascript
var str = '\u{1f4a9}';                   // non-BMP codepoint
print(str.length);                       // length is 2, represented as a surrogate pair
var u8 = new TextEncoder().encode(str);
print(u8.length);                        // length is 4, a single UTF-8 codepoint
print(Duktape.enc('jx', u8));            // |f09f92a9|, UTF-8 bytes F0 9F 92 A9
```


### TextDecoder

TextDecoder() は WHATWG エンコーディング API の一部で、バッファを UTF-8 エンコーディングの文字列にデコードするためのすっきりした方法を提供します。BMP 以外のコードポイントは、結果の文字列の中でサロゲートペアとして表現されます。例えば

```javascript
var u8 = new Uint8Array([ 0xf0, 0x9f, 0x92, 0xa9 ]);  // a single non-BMP codepoint
var str = new TextDecoder().decode(u8);
print(str.length);                       // length is 2, represented as a surrogate pair
print(str.charCodeAt(0));                // 55357, high surrogate
print(str.charCodeAt(1));                // 56489, low surrogate
```


### performance

performance.now() は、指定されない原点からのミリ秒単位の単調時間 (利用可能な場合は端数を含む) を提供します。返り値は DUK_USE_GET_MONOTONIC_TIME() のもので、 DUK_USE_DATE_GET_NOW() にフォールバックしています。実際のモノトニック時間プロバイダが利用可能な場合、戻り値は日付/時間の調整による「タイムジャンプ」なしでリアルタイムで進むことが保証されます。これは、パフォーマンス測定、壁時計時間ではなく現在時刻を基準としたイベントのスケジューリング、レート制限などに有用です。例

```javascript
function testFunction() {
    for (var i = 0; i < 1e6; i++) {}
}

var t1 = performance.now();
testFunction();
var t2 = performance.now();
print('test took:', (t2 - t1), 'milliseconds');
```


performance.timeOriginは、現在（Duktape 2.2.0）、Duktapeでのセマンティクスが決定されるまで、意図的に欠落させています。

performance.timingのようなNavigation Timingバインディングは、現在サポートされていません。

