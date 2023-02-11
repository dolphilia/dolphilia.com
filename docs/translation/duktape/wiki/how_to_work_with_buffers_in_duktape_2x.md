# Duktape 2.xでバッファを操作する方法

このページは、Duktape 2.xにのみ適用されます。

## はじめに

### バッファタイプの概要

|          Buffer type          |        Standard        |   C API type   |     ECMAScript type      |                                                                                                                                   Description                                                                                                                                   |
| ----------------------------- | ---------------------- | -------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plain buffer                  | No<br>Duktape specific | DUK_TAG_BUFFER | [object Uint8Array]      | メモリ効率の良いバッファ値(オブジェクトではない)。ECMAScript のほとんどの動作は Uint8Array を模倣しており、C API では別の型となっています。オブジェクトは実際の Uint8Array のインスタンスに強制されます。仮想インデックスプロパティを持つ。(Duktape2.xで動作が変更されました。) |
| ArrayBuffer object            | Yes<br>ES2015          | DUK_TAG_OBJECT | [object ArrayBuffer]     | バイト配列を表現するための標準的なオブジェクト型。非標準の仮想インデックスプロパティを追加で持つ。                                                                                                                                                                              |
| DataView, typed array objects | Yes<br>ES2015          | DUK_TAG_OBJECT | [object Uint8Array], etc | 標準的なビューオブジェクトで、基礎となる ArrayBuffer にアクセスする。                                                                                                                                                                                                           |
| Node.js Buffer object         | No<br>Node.js-like     | DUK_TAG_OBJECT | [object Uint8Array]      | Node.jsのBuffer APIを使ったオブジェクトです。現在、Node.jsのバージョンは6.7.0ですが、Duktapeは少し遅れて最新のものをトラッキングしています。                                                                                                                                    |

### ArrayBufferおよび型付き配列の推奨値

新しいコードでは、特別な理由がない限り、ES2015のArrayBufferと型付き配列（Uint8Arrayなど）を使用することをお勧めします。型付き配列を使い始めるためのチュートリアルはこちらです。

- http://www.html5rocks.com/en/tutorials/webgl/typed_arrays/

ArrayBufferはバイトバッファをカプセル化します。例えば、Uint32Arrayは32ビットの連続した配列に対応する仮想配列を提供します。型付き配列はホスト固有のエンディアンを持ち、基礎となるバッファに対してアライメントが必要です。DataViewはArrayBufferの中の任意にアラインされた要素（整数や浮動小数点）を読み書きするためのアクセサリ群を提供します。エンディアンは明示的に指定できるので、DataViewは例えばファイルフォーマット操作に便利です。

### 低メモリ環境向けのプレーンバッファ

非常に少ないメモリ環境では、通常 Uint8Array が使用される場所でプレーンバッファーを使用することができます。プレーンバッファは ECMAScript コードに対して Uint8Array の動作をかなり忠実に模倣しており、実際の Uint8Array とプレーンバッファの間を移動する際に、しばしば小さな ECMAScript コード変更のみが必要となります。しかし、C のコードでは型付けの違いに注意する必要があります。

プレーン バッファは、バッファへの uint8 アクセスを提供するだけです。プレーン・バッファには、固定バッファ、動的バッファ（サイズ変更可能）、外部バッファ（Duktapeの制御外のユーザ制御バッファを指す）の3種類があります。プレーン バッファの値オブジェクトは Uint8Array オブジェクトに変換されます。これは、プレーン文字列オブジェクトが String オブジェクトに変換されるのと同様です。

Duktapeの設定でバッファ・オブジェクトのサポートが無効になっている場合、プレーン・バッファのみが使用可能になります。これらは Uint8Array.prototype を継承し、プレーンバッファーの値 (例: buf.\_\_proto\_\_) から到達可能ですが、グローバルオブジェクトには登録されません。すべての型付き配列メソッドは存在しません。この意図は、Cコードからバッファを操作することにあります。

### Node.js バッファバインディング

Node.jsのBufferバインディングは、Node.js互換のコードを扱うときに便利です。

Node.jsのBufferは、uint8の仮想配列とDataViewのようなエレメントアクセッサのセットを、すべて1つのオブジェクトで提供します。Node.js は ES2015 のように安定した仕様ではないので、Node.js Buffer は型付き配列よりも動きのあるターゲットです。

### バッファタイプのミキシングをサポートするが、推奨しない

すべてのバッファオブジェクトの内部データ型は同じなので、ある程度は混ぜることができます。例えば、Node.js の Buffer.concat() は任意のバッファタイプを連結して使用することができます。しかし、混在の動作は時間の経過とともに変化しやすいので、混在させることに明確な利点がない限り、混在させない方が良いでしょう。

### 今後の変更点

今後のリリースの開発の方向性としては、以下のようなものが考えられます。

- バッファのセマンティクスをES2015+に近づける。
- 標準的な型は、よりメモリ効率と性能の高いものにする。
- C API のプレーンバッファと型付き配列オブジェクトの区別をなくす。

### 参考文献

- buffer" タグのついた API コールで、プレーンなバッファを扱います。
- bufferobject "タグの付いたAPIコールでバッファオブジェクトを扱えます。
- ES2015 型付き配列仕様 (ArrayBufferコンストラクタ、型付き配列コンストラクタ、ArrayBufferオブジェクト、DataViewオブジェクト)
- Node.js バッファAPI
- buffers.rstに内部を記述しています。
- オブジェクトのプロパティや強制の動作など、各オブジェクトタイプのより詳細な表 https://github.com/svaarala/duktape/blob/master/doc/buffers.rst#summary-of-buffer-related-values

## API概要

### バッファの作成

|         Type          |                                                    C                                                    |                            ECMAScript                             |                                                                             Notes                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plain buffer          | duk_push_buffer()<br>duk_push_fixed_buffer()<br>duk_push_dynamic_buffer()<br>duk_push_external_buffer() | Uint8Array.allocPlain()<br>Uint8Array.plainOf()                   | Uint8Array.plainOf() は、バッファオブジェクトから、コピーを作成せずに、基礎となるプレーンバッファを取得します。スライスのオフセットと長さの情報は失われます。 |
| ArrayBuffer object    | duk_push_buffer_object()                                                                                | new ArrayBuffer()                                                 |                                                                                                                                                               |
| DataView object       | duk_push_buffer_object()                                                                                | new DataView()                                                    |                                                                                                                                                               |
| Typed array objects   | duk_push_buffer_object()                                                                                | new Uint8Array()<br>new Int32Array()<br>new Float64Array()<br>etc |                                                                                                                                                               |
| Node.js Buffer object | duk_push_buffer_object()                                                                                | new Buffer()                                                      |                                                                                                                                                               |

型付き配列が作成されると、ArrayBufferオブジェクトも作成され、型付き配列の.bufferプロパティとして利用できるようになります。Duktape 2.0は型付き配列が作成される際にArrayBufferを作成しますが、 Duktape 2.1は.bufferプロパティの最初の読み込み時にArrayBufferを遅延して作成します。

### 型チェック用バッファ

|         Type          |                    C                    |          ECMAScript          | Notes |
| --------------------- | --------------------------------------- | ---------------------------- | ----- |
| plain buffer          | duk_is_buffer()<br>duk_is_buffer_data() | n/a                          |       |
| ArrayBuffer object    | duk_is_buffer_data()                    | v instanceof ArrayBuffer     |       |
| DataView object       | duk_is_buffer_data()                    | v instanceof DataView        |       |
| Typed array objects   | duk_is_buffer_data()                    | v instanceof Uint8Array, ... |       |
| Node.js Buffer object | duk_is_buffer_data()                    | Buffer.isBuffer()            |       |

### バッファーデータにアクセスする

|         Type          |                         C                          |                                              ECMAScript                                              |                                                                        Notes                                                                        |
| --------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| plain buffer          | duk_get_buffer()<br>duk_require_buffer()           | buf[0], buf[1], ...<br>buf.length<br>buf.byteLength<br>buf.byteOffset<br>buf.BYTES_PER_ELEMENT       | 非標準の型です。.bufferプロパティは、オンザフライで生成されたArrayBufferを返します（アクセスのたびに新しいインスタンスが生成されます）。            |
| ArrayBuffer object    | duk_get_buffer_data()<br>duk_require_buffer_data() | new Uint8Array(buf)[0], ...<br>buf.byteLength                                                        | バッファに直接アクセスできない。Uint8Arrayのような型付き配列ビューを介してバッファにアクセスします。                                                |
| DataView object       | duk_get_buffer_data()<br>duk_require_buffer_data() | view.getInt16()<br>view.setUint32()<br>...<br>view.byteLength<br>view.byteOffset                     | .bufferプロパティは、ビューが操作するArrayBufferを含みます。このプロパティは遅延です; ArrayBufferは最初のアクセスで作成され、その後も同じままです。 |
| Typed array objects   | duk_get_buffer_data()<br>duk_require_buffer_data() | view[0], view[1], ...<br>view.length<br>view.byteLength<br>view.byteOffset<br>view.BYTES_PER_ELEMENT | .bufferプロパティは、ビューが操作するArrayBufferを含みます。このプロパティは遅延です; ArrayBufferは最初のアクセスで作成され、その後も同じままです。 |
| Node.js Buffer object | duk_get_buffer_data()<br>duk_require_buffer_data() | buf[0], buf[1], ...<br>buf.length<br>buf.byteLength<br>buf.byteOffset<br>buf.BYTES_PER_ELEMENT       | Node.js v6.7.0+ では、Buffer は Uint8Array として実装され、カスタムプロトタイプオブジェクトを使用します。                                           |

### Configuring buffers

|         Type          |                                C                                 | ECMAScript |                                                                                                            Notes                                                                                                             |
| --------------------- | ---------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| plain buffer          | duk_config_buffer()<br>duk_resize_buffer()<br>duk_steal_buffer() | n/a        | 固定プレーンバッファーは設定できません。動的プレーンバッファーはサイズを変更することができ、現在の割り当てを「盗む」ことができます。外部プレーンバッファは、異なるメモリ領域にマッピングするように再設定することができます。 |
| ArrayBuffer object    | n/a                                                              | n/a        | ArrayBufferオブジェクトは作成後、変更することができません。しかし、その下にあるプレーンバッファは（そのタイプに応じて）再構成することができます。                                                                            |
| DataView object       | n/a                                                              | n/a        | 作成後、DataViewオブジェクトは変更することができません。しかし、その下にあるプレーンバッファは再構成することができます（そのタイプに依存します）。                                                                           |
| Typed array objects   | n/a                                                              | n/a        | 型付き配列オブジェクトは、作成後、変更することができません。しかし、その下にあるプレーンバッファは（その型に依存して）再構成することができます。                                                                             |
| Node.js Buffer object | n/a                                                              | n/a        | Node.js Buffer オブジェクトは、作成後、変更することはできません。しかし、その基礎となるプレーンなバッファは（そのタイプによって）再構成することができます。                                                                  |

### Buffer-to-string conversion

|             Call              |                                                                                                                                       Description                                                                                                                                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| duk_buffer_to_string()        | バッファのデータは、内部文字列表現として1対1で使用される。有効なECMAScript文字列を作成したい場合、データはCESU-8エンコーディングであるべきである。シンボル値を作成することは可能です（意図的であれ、偶然であれ）。バッファのデータに対して duk_push_lstring() を使用することは同等です。 |
| new TextDecoder().decode(buf) | バッファをUTF-8文字列としてデコードし、ECMAScriptの有効な文字列を出力します。無効なバイト列はU+FFFDに、BMP以外の文字はサロゲートペアに置き換わります。                                                                                                                                   |
| duk_to_string()               | あまり有用ではありません。ECMAScript の ToString() を呼び出すと、[object Uint8Array] のような文字列になってしまいます。                                                                                                                                                                  |
| String(buf)                   | あまり有用ではない: duk_to_string() と同様に ECMAScript の ToString() の強制を呼び出す。                                                                                                                                                                                                 |

### String-to-buffer conversion

|             Call              |                                                                        Description                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| duk_to_buffer()               | 文字列の内部表現からのバイトは結果バッファにバイト単位でコピーされる。有効なECMAScript文字列の場合、結果はCESU-8で符号化される。                          |
| new TextEncoder().encode(str) | 文字列の内部表現は、拡張CESU-8/UTF-8としてデコードされ、その後UTF-8にエンコードされる。サロゲートペアは結合され、無効なバイト列はU+FFFDに置き換えられる。 |
| new Buffer(str)               | 文字列はTextEncoderと同じように扱われます。                                                                                                               |
| Uint8Array.allocPlain(str)    | 文字列の内部表現は、duk_to_buffer()と同様に、結果のバッファにバイト単位でコピーされる。                                                                   |

### String/buffer conversion use cases

|       Conversion        |           C            |          ECMAScript           |                                                                            Notes                                                                            |
| ----------------------- | ---------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Buffer-to-string UTF-8  | n/a                    | new TextDecoder().decode(buf) | バッファはUTF-8として解釈され、無効なUTF-8シーケンスはU+FFFDに置き換えられ、非BMPコードポイントはサロゲートペアに展開されます。                             |
| Buffer-to-string CESU-8 | n/a                    | n/a                           | バッファはCESU-8として解釈され、現在バインディングはない。                                                                                                  |
| Buffer-to-string 1:1    | duk_buffer_to_string() | n/a                           | バッファはデコードされずに内部表現（拡張CESU-8/UTF-8）にバイト単位で変換される。この強制はシンボル値になることもある。                                      |
| String-to-buffer UTF-8  | n/a                    | new TextEncoder().encode(str) | 文字列は、16ビットコードポイントリストからUTF-8に変換される。有効なサロゲートペアは結合され、無効なサロゲートペアと無効なバイト列はU+FFFDに置き換えられる。 |
| String-to-buffer CESU-8 | n/a                    | n/a                           | 今はこれといった縛りがない。                                                                                                                                |
| String-to-buffer 1:1    | duk_to_buffer()        | n/a                           | 文字列は内部表現からバイト単位でバッファに変換される。有効なECMAScript文字列の場合、結果は有効なCESU-8であり、内部表現として使用される。                    |

## Plain buffers

プレーンバッファーの値はUint8Arrayのインスタンスを模倣し、仮想的なプロパティを持つ。

```js
// 8バイトのプレーンバッファーを作成します。
var plain = Uint8Array.allocPlain(8);  // Duktapeカスタムコール

// インデックスプロパティを使用して記入する。
for (var i = 0; i < plain.length; i++) {
    plain[i] = 0x41 + i;
}

// その他の仮想プロパティを出力します。
print(plain.length);             // -> 8
print(plain.byteLength);         // -> 8
print(plain.byteOffset);         // -> 0
print(plain.BYTES_PER_ELEMENT);  // -> 1

// プレーンバッファは実際のプロパティテーブルを持っていないので、新しいプロパティを追加することはできません（この動作はプレーン文字列に似ています）。
plain.dummy = 'foo';
print(plain.dummy);              // -> undefined

// Duktape JXフォーマットでダンプ可能
print(Duktape.enc('jx', plain)); // -> |4142434445464748|

// プレーンなバッファは、Uint8Arrayの動作を模倣しています。
print(typeof plain);             // -> object, like Uint8Array
print(String(plain));            // -> [object Uint8Array], like Uint8Array
```

Uint8Array は、プレーンバッファーの「対応するオブジェクト」です。Stringオブジェクトがプレーンな文字列をラップするのと同じように、プレーンバッファーをラップします。Uint8Arrayは同じ仮想プロパティを持ち、実際のプロパティテーブルを持つので、新しいプロパティも普通に追加することができます。

両者の変換は簡単にできます。

```js
// 8バイトのプレーンバッファーを作成します。
var plain1 = Uint8Array.allocPlain(8);

// プレーンなバッファと完全なUint8Arrayを変換し、両方とも同じ基礎となるバッファを指すようにします。
var u8 = Object(plain1);

// Uint8Arrayにラップされたプレーンバッファーを取得します。
var plain2 = Uint8Array.plainOf(u8);  // Duktapeカスタムコール

// この処理では、'plain1'のコピーは作成されない。
print(plain1 === plain2);  // -> true
```

プレーンバッファには継承された .buffer プロパティ (ゲッター) があり、同じプレーンバッファへの ArrayBuffer のバッキングを返します。プロパティテーブルがないため、.buffer を読み込むたびに新しい ArrayBuffer インスタンスが作成されます。.bufferプロパティは、コピーを作成せずにプレーンバッファーの上に別のビューを作成することを可能にします。

```js
var plain = Uint8Array.allocPlain(8);

// 型付き配列コンストラクタは、Uint8Arrayのようなプレーンな配列を解釈し、初期化配列として扱い、コピーを作成する。  ここで、Uint16Arrayを構築する場合、各入力バイトは16ビットに拡張されます。
var u16 = new Uint16Array(plain);  // 共有ストレージなし

// .bufferを使用すると、共有ビューを作成することができます。  ここでは、8バイトのプレーンバッファーの上に2要素のUint32Arrayが作成されています。
var u32 = new Uint32Array(plain.buffer);  // 共有ストレージ
```

要約すると、プレーンバッファとUint8Arrayの主な違いは以下の通りです。

|                             |                                                  Plain buffer                                                  |                        Uint8Array                        |                                                                                             Notes                                                                                              |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Creation                    | Uint8Array.allocPlain(length)<br>Uint8Array.allocPlain('stringValue')<br>Uint8Array.allocPlain([ 1, 2, 3, 4 ]) | new Uint8Array(length)<br>new Uint8Array([ 1, 2, 3, 4 ]) | Uint8Array.allocPlain() は引数の種類が多く、文字列は特別に扱われます（文字列の内部表現がバッファに1:1でコピーされます）。もちろん、CのAPIもバッファの作成に使用できます。                      |
| typeof                      | object                                                                                                         | object                                                   |                                                                                                                                                                                                |
| Object.prototype.toString() | [object Uint8Array]                                                                                            | [object Uint8Array]                                      |                                                                                                                                                                                                |
| instanceof Uint8Array       | true                                                                                                           | true                                                     |                                                                                                                                                                                                |
| Property table              | No                                                                                                             | Yes                                                      | プレーンバッファーはプロパティテーブルを持たず、Uint8Array.prototypeを継承しています。プロパティの書き込みは通常無視されますが、例えば、継承されたセッターは書き込みを捕捉することができます。 |
| .buffer property            | Yes                                                                                                            | Yes                                                      | プレーンバッファーは、プレーンバッファーのバックとなるArrayBufferを返す継承された.bufferゲッターを持っています。読み込むたびに新しい ArrayBuffer のインスタンスが作成されます。                |
| Allow finalizer             | No                                                                                                             | Yes                                                      | プレーンバッファはUint8Array.prototypeを継承していても、ファイナライザはサポートされていません。                                                                                               |
| Object.isExtensible()       | false                                                                                                          | true                                                     |                                                                                                                                                                                                |
| buf.subarray() result       | Uint8Array                                                                                                     | Uint8Array                                               | プレーンバッファーはスライスオフセットを表現できないため、プレーンバッファーの .subarray() の結果は Uint8Array オブジェクトになります。                                                        |

その他の注意事項

- 組み込みの型付き配列バインディングの引数として渡された場合、プレーンバッファはUint8Arrayのように振る舞います。多くの場合、内部実装はまずプレーンバッファを (一時的な) Uint8Array オブジェクトに昇格させ、それを操作に使用します。これは、いくつかのECMAScriptバインディングでプレーンバッファーを使用する際のパフォーマンスに影響します。
- Duktape.dec() のような Duktape 組み込み関数は、メモリ空間を節約するためにプレーンバッファを作成します。もし Uint8Array オブジェクトを明示的に処理したい場合は、例えば Object(Duktape.dec('hex', 'deadbeef')) を使用できます。

## JSONとJXのシリアライズ

Node.jsのBuffer型は.toJSON()メソッドを持っているので、標準的なJSON.stringify()でシリアライズされることになります。

```js
var buf = new Buffer('ABCD');
print(JSON.stringify(buf));

// Output:
// {"type":"Buffer","data":[65,66,67,68]}
```

ArrayBufferは列挙可能な独自のプロパティを持たず、.toJSON()もないため、空のオブジェクトとしてシリアライズされます（DataViewも同様）。

```js
var buf = Duktape.dec('hex', 'deadbeef');
print(JSON.stringify([ 1, buf, 2 ]));

// Output:
// [1,{},2]
```

プレーンなバッファと型付き配列には列挙可能なインデックスプロパティがありますが、.toJSON()がないため、（配列ではなく）オブジェクトとしてシリアライズされます。

```js
var plain = Uint8Array.allocPlain('foo');
var u16 = new Uint16Array([ 0x1111, 0x2222, 0x3333 ]);
print(JSON.stringify({ plain: plain, u16: u16 }));

// Output:
// {"plain":{"0":102,"1":111,"2":111},"u16":{"0":4369,"1":8738,"2":13107}}
You can of course add a .toJSON() yourself:

Uint8Array.prototype.toJSON = function (v) {
    var res = [];
    var nybbles = '0123456789abcdef';
    var u8 = this;
    for (var i = 0; i < u8.length; i++) {
        res[i] = nybbles[(u8[i] >> 4) & 0x0f] +
                 nybbles[u8[i] & 0x0f];
    }
    return res.join('');
};
var u8 = new Uint8Array([ 0x41, 0x42, 0x43, 0x44 ]);
print(JSON.stringify({ myBuffer: u8 }));

// Output:
// {"myBuffer":"41424344"}
```

Duktape JXフォーマットは、すべてのバッファ・オブジェクトを直接サポートし、.toJSON()メソッドが存在しない限り、プレーン・バッファのようにエンコードします。

```js
var u8 = new Uint8Array([ 0x41, 0x42, 0x43, 0x44 ]);
print(Duktape.enc('jx', { myBuffer: u8 }));

// Output:
// {myBuffer:|41424344|}
```

JXはスライス情報を尊重します。

```js
var u8a = new Uint8Array([ 0x41, 0x42, 0x43, 0x44 ]);
var u8b = u8a.subarray(2);
print(Duktape.enc('jx', { myBuffer: u8a, mySlice: u8b }));

// Output:
// {myBuffer:|41424344|,mySlice:|4344|}
```

.toJSON()はJXビルトインバッファーのシリアライズよりも優先されるため（少なくともDuktape 2.xでは）、Node.jsバッファーは、.toJSON()を持っていても、JSON.stringify()と同様にシリアライズされるでしょう。

## Cコードでのバッファの使用

### タイピング

C API では、プレーン バッファとバッファオブジェクトは少し異なる動作をします。

- バッファのスタックタイプは DUK_TYPE_BUFFER で、これらは duk_is_buffer() と duk_is_buffer_data() の両方に対して真を判定します。
- バッファオブジェクトスタックタイプは DUK_TYPE_OBJECT で、これらは duk_is_buffer() では偽、duk_is_buffer_data() では真と判定されます。

これは、文字列が現在 API でどのように動作しているかを模倣しています。文字列オブジェクトも DUK_TYPE_OBJECT タイプタグを持ち、 duk_is_string() に対して false をテストします。しかし、これはおそらく後日、プレーンバッファとバッファオブジェクト（およびプレーン文字列とStringオブジェクト）を互換的に使用できるように変更されるでしょう。

### プレーンバッファ

#### 固定バッファの操作

固定バッファは、作成後にサイズを変更することはできませんが、最もメモリ効率の良いバッファタイプで、安定したデータポインタを持ちます。固定バッファを作成するには

```c
unsigned char *ptr;

ptr = (unsigned char *) duk_push_fixed_buffer(ctx, 256 /*size*/);

/* これで，バッファが回収されるまで ptr[0] ... ptr[255] の間で安全に読み書きができるようになりました． */
```

#### プレーンなダイナミックバッファでの作業

ダイナミックバッファは作成後にサイズを変更することができますが、サイズ変更を可能にするために2つのヒープ割り当てを必要とします。ダイナミックバッファのデータポインタはサイズ変更の際に変更される可能性があるため、サイズ変更されたバッファからデータポインタを再ルックアップする必要があります。最も安全な方法は、アクセスする直前に再ルックアップすることです。

```c
unsigned char *ptr;
duk_size_t len;

/* 動的なバッファを作成し、後で duk_resize_buffer() を使用してサイズを変更できます。 */
ptr = (unsigned char *) duk_push_dynamic_buffer(ctx, 64 /*size*/);

/* バッファのリサイズ（またはガベージコレクション）が行われるまで，ptr[0] ... ptr[63] の間で安全に読み書きができるようになりました． */

/* バッファは後でサイズ変更することができる。  リサイズAPIコールは、便宜上、新しいデータポインタを返す。 */
ptr = (unsigned char *) duk_resize_buffer(ctx, -1, 256 /*new_size*/);

/* バッファのリサイズまで ptr[0] ... ptr[255] の間で安全に読み書きができるようになりました。 */

/* また、明示的に現在のポインタと長さを取得することもできます。最も安全なイディオムは、読み書きの直前にこれを行うことである。 */
ptr = (unsigned char *) duk_require_buffer(ctx, -1, &len);

/* [0,len[ の間で安全に読み書きができるようになりました。 */
```

#### プレーンな外部バッファでの作業

外部バッファは、ユーザー・コードによって管理されるデータ領域を持っています。Duktapeは、現在のポインタと長さを保存し、すべての読み書きの操作を指定されたメモリ範囲に向けます。ユーザー・コードは、このデータ領域が読み書きに有効であることを保証する責任があり、また、この領域が最終的に解放されることを保証しなければなりません。

外部バッファを作成するには:

```c
/* 想像例：外部バッファはここで確保されたフレームバッファ。 */
size_t framebuffer_len;
unsigned char *framebuffer_ptr = init_my_framebuffer(&framebuffer_len);

/* 外部バッファをプッシュする。  初期状態では、データポインタはNULL、長さは0である。 */
duk_push_external_buffer(ctx);

/* duk_config_buffer() を用いて、特定のメモリ領域に対して外部バッファを設定する。  ポインタは、呼び出し元が既に知っているので、返されません。 */
duk_config_buffer(ctx, -1, (void *) framebuffer_ptr, (duk_size_t) framebuffer_len);

/* 外部バッファは後から何度でも設定し直すことができます。 */

/* また、明示的に現在のポインタと長さを取得することもできます。最も安全なイディオムは、読み書きの直前にこれを行うことである。 */
ptr = (unsigned char *) duk_require_buffer(ctx, -1, &len);
```

#### タイプチェック

すべてのプレーンバッファーのバリエーションは、スタックタイプ DUK_TYPE_BUFFER を持ちます:

```c
if (duk_is_buffer(ctx, idx_mybuffer)) {
    /* 値はプレーンバッファ（固定、動的、または外部）です。 */
}
```

または同等に:

```c
if (duk_get_type(ctx, idx_mybuffer) == DUK_TYPE_BUFFER) {
    /* 値はプレーンバッファ（固定、動的、または外部）です。 */
}
```

### バッファーオブジェクト

基本的な使い方をしたテストケースを紹介します。

- https://github.com/svaarala/duktape/blob/master/tests/api/test-bufferobject-example-1.c

#### バッファオブジェクトの作成

バッファオブジェクトとビューオブジェクトは、全て duk_push_buffer_object() API 呼び出しで作成されます。

```c
/* 1000バイトのバッキングバッファを作成します。  以下に作成するビューでは、バッファの一部のみが表示されます。 */
duk_push_fixed_buffer(ctx, 1000);

/* バイトオフセット100から始まり、バイト長50で、インデックス-1のプレーンバッファにバックアップされた25要素のUint16Arrayを作成します。 */
duk_push_buffer_object(ctx,
                       -1 /*index of plain buffer*/,
                       100 /*byte offset*/,
                       50 /*byte (!) length */,
                       DUK_BUFOBJ_UINT16ARRAY /*flags and type*/);
```

これは以下と同等です:

```c
// 引数プレーンバッファ
var plainBuffer = Uint8Array.allocPlain(1000);

// 既存のプレーンバッファーの上にUint16Arrayを作成します。
var view = new Uint16Array(plainBuffer.buffer,
                           100 /*byte offset*/,
                           25 /*length in elements (!)*/);

// Outputs: 25 100 50 2
print(view.length, view.byteOffset, view.byteLength, view.BYTES_PER_ELEMENT);
```

C の呼び出しはバイト長の引数 (50) を取り、ECMAScript の同等品は要素長の引数 (25) を取ることに注意してください。C API ではバッファの長さは常にバイトで表現されるため、これは一貫性を保つための意図的なものです。

#### バッファオブジェクトデータポインタの取得

バッファオブジェクトのデータポインタと長さを取得します(プレーンバッファでも可能)。

```c
unsigned char *ptr;
duk_size_t len;
duk_size_t i;

/* バッファオブジェクトのアクティブスライスへのデータポインタを取得します。  プレーン バッファも受け付けます。 */
ptr = (unsigned char *) duk_require_buffer_data(ctx, -3 /*idx*/, &len);

/* You can now safely access indices [0, len[ of 'ptr'. */
for (i = 0; i < len; i++) {
    /* Uppercase ASCII characters. */
    if (ptr[i] >= (unsigned char) 'a' && ptr[i] <= (unsigned char) 'z') {
        ptr[i] += (unsigned char) ('A' - 'a');
    }
}
```

#### タイプチェック

現在のところ、値がバッファオブジェクトであるかどうかをチェックしたり、 特定の型をチェックしたりするための明示的な型チェック API コールは存在しません。しかし、duk_is_buffer_data() APIコールは、プレーンバッファとバッファオブジェクトの両方に対して真を返します。

```c
if (duk_is_buffer_data(ctx, 0)) {
    /* ... */
}
```

同様に、duk_get_buffer_data() と duk_require_buffer_data() は、プレーン バッファとバッファオブジェクトの両方を受け付け、C コードでバッファデータを扱うのに適した デフォルトのイディオムです。

```c
/* 第一引数には、プレーンバッファまたはバッファオブジェクトを指定します。 */
duk_size_t len;
char *buf = (char *) duk_require_buffer_data(ctx, 0, &len);
/* ... buf で作業する場合、有効なオフセット範囲は [0,len[. */
```

### ポインターの安定性と有効性

Duktape APIを通じて取得したバッファ・データ・ポインタは、プレーン・バッファやバッファ・オブジェクトがガベージ・コレクトされた時点で無効となります。データ・ポインターを使用している間、Duktapeがそのバッファに到達可能であることを確認する必要があります。

これに加えて、バッファに関連するデータ・ポインタは時々変更される可能性があります。

- 固定バッファの場合、データポインタは (ガベージコレクションが行われるまで) 安定しています。
- 動的バッファでは、バッファが duk_buffer_resize() を使ってサイズ変更されると、データポインタが変更されるかもしれません。
- 外部バッファの場合、バッファが duk_buffer_config() を使って再構成されると、データポインタが変化する可能性があります。
- バッファオブジェクトのポインタの安定性は、その下にあるプレーンバッファに依存します。

Duktapeは、古いポインターの使用からユーザー・コードを保護することができないので、Cコードで使用されるデータ・ポインターが有効であることを確認することが重要です。最も安全な方法は、バッファ・データ・ポインタを使用する前に、常に明示的にバッファ・データ・ポインタを取得することです。例えば、デフォルトでは、バッファポインタをグローバルに保存するのではなく、ループの前にバッファポインタを取得する必要があります（ただし、パフォーマンス上の利点があるなどの理由で正当化される場合はこの限りではありません）。

```c
unsigned char *buf;
duk_size_t len, i;

buf = (unsigned char *) duk_require_buffer(ctx, -3 /*idx*/, &len);
for (i = 0; i < len; i++) {
    buf[i] ^= 0x80;  /* flip highest bit */
}
```

duk_get_buffer_data() と duk_require_buffer_data() は、プレーン バッファとバッファオブジェクトの両方に対して動作するので、この方がより一般的です。

```c
unsigned char *buf;
duk_size_t len, i;

buf = (unsigned char *) duk_require_buffer_data(ctx, -3 /*idx*/, &len);
for (i = 0; i < len; i++) {
    buf[i] ^= 0x80;  /* flip highest bit */
}
```

#### ゼロ長のバッファとNULLと非NULLのポインタ

後述の技術的な理由により、長さが 0 のバッファは NULL または非 NULL のデータポインタを持つことができます。バッファ長が 0 の場合、ポインタを介した読み込み/書き込みは許可されないため、ポインタの値は重要ではありません (例えば ptr[0] はバッファの有効範囲外のバイトを参照することになります)。

しかし、これはコードを構成する上で実際的な影響があります。

```c
unsigned char *buf;
duk_size_t len;

buf = (unsigned char *) duk_get_buffer(ctx, -3, &len);
if (buf != NULL) {
    /* 値は間違いなくバッファであり、バッファの長さはゼロかもしれない。 */
} else {
    /* 値がバッファでない、または長さが0のバッファであり、NULLデータポインタを持っている可能性があります。 */
}
```

型付けを気にしないのであれば、ポインタのチェックを無視して len だけに頼ることもできます。

```c
unsigned char *buf;
duk_size_t len, i;

/* value がバッファでない場合、buf == NULL, len == 0 となる。 */
buf = (unsigned char *) duk_get_buffer(ctx, -3, &len);

/* 'buf' と 'len' を直接使用できる。  ただし、len == 0 の場合、'buf' の有効なデリファレンスはないことに注意。  のようなループではOK。 */
for (i = 0; i < len; i++) {
    /* Never entered if len == 0. */
    printf("%i: %d\n", (int) i, (int) buf[i]);
}
```

もし、このような曖昧さが嫌なら、バッファの種類を明示的にチェックすることができます。

```c
unsigned char *buf;
duk_size_t len, i;

/* プレーンなバッファに対しては duk_is_buffer() 、プレーンバッファまたはバッファオブジェクトに対しては duk_is_buffer_data() 。 */
if (duk_is_buffer(ctx, -3)) {
    buf = (unsigned char *) duk_get_buffer(ctx, -3, &len);

    for (i = 0; i < len; i++) {
        /* Never entered if len == 0. */
        printf("%i: %d\n", (int) i, (int) buf[i]);
    }
}
```

もし、バッファ以外の値に対してエラーを投げることが許容されるなら、これはおそらく最もクリーンなアプローチでしょう。

```c
unsigned char *buf;
duk_size_t len, i;

/* または duk_require_buffer_data(). */
buf = (unsigned char *) duk_require_buffer(ctx, -3, &len);

/* buf はまだ NULL であるかもしれないが、len == 0 の場合のみである。 */

for (i = 0; i < len; i++) {
    /* len == 0 の場合、入力されません。 */
    printf("%i: %d\n", (int) i, (int) buf[i]);
}
```

この動作の技術的な理由は、プレーンバッファーのバリエーションごとに異なっています。

- 固定バッファのデータ領域はバッファのヒープヘッダと一緒に割り当てられます (ヘッダに直接従います) ので、固定バッファのデータポインタは長さがゼロであっても常に非NULLです。データポインタは単純に (void *) ((duk_hbuffer *) heaphdr + 1) となります。
- ダイナミックバッファのデータ領域は、別の alloc/realloc 呼び出しで割り当てられます。ANSI C では、ゼロサイズの malloc()/realloc() に対して NULL または非 NULL ポインタを返す実装を認めていますが、そのポインタが後の free() 呼び出しで適切に無視される限りにおいてです。この動作はDuktapeの割り当て関数でも許可されています。ダイナミック・バッファのゼロ長ポインタの動作は、使用するアロケータ関数に直接依存します。
- 外部バッファのデータ領域は、ユーザー・コードによって制御されます。ユーザー・コードでは、ゼロ長バッファに対してNULLまたは非NULLポインタを使用することができ、Duktapeは使用するポインタ値を変更しません。

## 複合的な使用

Duktape 2.0では、プレーンなバッファはUint8Arrayを模倣し、Node.jsバッファの動作は、バッファがカスタムプロトタイプのUint8ArrayインスタンスであるNode.js v6.7.0 と一致しました。

その結果、Duktape 2.0では、Duktape 1.xのようにバッファ・タイプを混在させることは一般的に不可能（もしくは必要）になっています。例えば、Duktape.Bufferを何らかのカスタム動作で新しいUint16Array（）の入力引数として使用することができます。

## 共通の課題とベストプラクティス

### バッファのサイズ変更およびデータの追加

標準の ArrayBuffer と Node.js の Buffer タイプのどちらもバッファのリサイズを許さないので、ArrayBuffer や Node.js バッファにデータを効率的に追加する簡単な方法はありません。些細なことですが、非効率的なアプローチは、常に追加されたデータ用に新しいバッファを作成することです。

```js
// Node.jsの例
var data = new Buffer(0);

function received(buf) {
    data = Buffer.concat([ data, buf ]);
}
```

より一般的な手法としては、部品を蓄積しておき、入力が終わった時点で連結する方法がある。

```js
// Node.jsの例
var parts = [];

function received(buf) {
    parts.push(buf);
}

function finalize() {
    var final = Buffer.concat(parts);
}
```

もう一つの効率的な方法は、ある程度の予備を持ち、容量が足りなくなったときにバッファを2倍にするなどして、過剰なコピーを避けることです。

```js
// 型付き配列の例
var data = new Uint8Array(64);
var offset = 0;

function received(buf) {
    // 受信データ('buf')はUint8Arrayである。

    while (data.length - offset < buf.byteLength) {
        // スペースが足りないので、リサイズしてスペースを空けてください。
        var newBuf = new Uint8Array(data.length * 2);
        newBuf.set(data);  // 古いバイトをコピーする
        data = newBuf;
    }

    data.set(new Uint8Array(buf), offset);
    offset += buf.byteLength;
}

// 蓄積を終了すると、以下のように最終データを抽出することができる。
var finalArrayBuffer = data.buffer.slice(0, offset);
```

Duktape固有のソリューションを使用したい場合、動的なプレーンバッファーは最小限のコストでオンザフライにサイズを変更することができます。動的バッファはECMAScriptのコードからはArrayBufferとして見え、その .length と .byteLength はバッファのリサイズを反映して単に変更されるだけです。動的なプレーンバッファーは C コードからしかサイズ変更できません。外部プレーンバッファはオンザフライで再構成することができ、例えばサイズ変更を可能にします。

## Duktapeのカスタムビヘイビアを回避する

ECMAScriptにおけるバッファの「ベスト・スタンダード」であるため、ES2015の型付き配列から始めるのがベストでしょう。その際、本当に必要でない限り、Duktape特有の動作は避けてください。特に厄介な点については、以下で説明します。

### Node.jsバッファのメモリゼロ化に頼らない

ES2015の仕様では、新しいArrayBufferの値にはゼロが埋められることが要求されています。Duktape 1.4.0から、DUK_USE_ZERO_BUFFER_DATA設定オプションがオフの場合でも、Duktapeはこれに従います。

Node.jsはデフォルトで、割り当てられたBufferオブジェクトをゼロにしません。Duktapeは、DUK_USE_ZERO_BUFFER_DATAコンフィグオプションがオフになっていない限り、Node.jsのBufferオブジェクトもゼロにします。

## セキュリティへの配慮

Duktapeは、どのECMAScriptコードも、基礎となるプレーン・バッファに境界外からアクセスできないことを保証します。

この保証は、動的なプレーン・バッファを使用してバッファ・オブジェクトを初期化し、それがサイズ変更されて、概念的なバッファ・オブジェクトがサイズ変更後のバッファを越えて拡張された場合でも適用されます。このような場合、Duktapeはあまりきれいな動作を提供しませんが（あるオペレーションは0を返し、あるオペレーションはTypeErrorを投げるなど）、その動作はメモリセーフであることが保証されます。この状況は、次のテストケースで説明されています（そしてテストされています）。

- https://github.com/svaarala/duktape/blob/master/tests/api/test-bufferobject-dynamic-safety.c

プロパティの読み書きを通じてバッファとやりとりするCコードは、メモリセーフであることが保証されています。C のコードでは、バッファへのポインタと長さをフェッチして、それを直接操作することができま すが、その場合のメモリ安全性はユーザコード次第です。

外部のプレーンバッファを使用する場合、バッファに設定されたポインタと長さが有効であること、すなわちその範囲内のすべてのバイトが読み取りおよび書き込み可能であることを保証するのはユーザコードに任されています。もしそうでない場合、メモリに安全でない動作が発生する可能性があります。