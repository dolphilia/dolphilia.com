

## カスタムJSONフォーマット {#custom_json_formats}

### ECMAScript の JSON の欠点

標準の JSON フォーマットは、ECMAScript で使用する場合、いくつかの欠点があります。

-未定義値や関数値はサポートされていません。
-NaN と無限大の値はサポートされていません。
-Duktapeのカスタム・タイプは、もちろんサポートされていません。
-BMP以上のコードポイントは、サロゲート・ペアとしてしか表現できない
-U+10FFFF以上のコードポイントは、サロゲート・ペアとしても表現できません。
-出力が印刷可能なASCIIでないため、不便なことが多い

これらの制限は、ECMAScript仕様の一部であり、より甘い動作を明示的に禁止しています。Duktapeは、よりプログラマフレンドリーな2種類のカスタムJSONフォーマットを提供しています。JXとJCで、以下に説明します。

### カスタムJXフォーマット

JXは、すべての値を非常に読みやすい方法でエンコードし、ほとんどすべての値を忠実にパースして返します（関数値は最も重要な例外です）。出力は純粋に印刷可能なASCIIで、U+FFFF以上のコードポイントはカスタムエスケープ形式でエンコードされ、オブジェクトキーの周りの引用符はほとんどの場合省略されます。JXはJSON互換ではありませんが、非常に読みやすいフォーマットで、デバッグやロギングなどに最も適しています。

JXは以下のように使用します。

```javascript
var obj = { foo: 0/0, bar: [ 1, undefined, 3 ] };
print(Duktape.enc('jx', obj));
// prints out: {foo:NaN,bar:[1,undefined,3]}

var dec = Duktape.dec('jx', '{ foo: 123, bar: undefined, quux: NaN }');
print(dec.foo, dec.bar, dec.quux);
// prints out: 123 undefined NaN
```


### カスタム JC フォーマット§。

JCは、すべての値を標準的なJSONにエンコードします。標準的なJSONでサポートされていない値は、アンダースコアで始まるマーカーキーを持つオブジェクトとしてエンコードされます（例： {"_ptr": "0xdeadbeef"}）。このような値は、通常のオブジェクトとしてパースバックされます。しかし、多かれ少なかれ、手動でそれらを復活させることができます。U+FFFF以上のコードポイントは、"U+nnnnn "のフォーマットでプレーンな文字列データとしてエンコードされます(例: U+0010fedc)。

JCは以下のように使用します。

```javascript
var obj = { foo: 0/0, bar: [ 1, undefined, 3 ] };
print(Duktape.enc('jc', obj));
// prints out: {"foo":{"_nan":true},"bar":[1,{"_undef":true},3]}

var dec = Duktape.dec('jc', '{ "foo": 123, "bar": {"_undef":true}, "quux": {"_nan":true} }');
print(dec.foo, dec.bar, dec.quux);
// prints out: 123 [object Object] [object Object]
```


JCデコーダは、現時点では、基本的に標準のJSONデコーダと同じです。すべてのJC出力は有効なJSONであり、カスタム構文は必要ありません。例で示したように、カスタム値（{"_undef":true}など）は自動的には復活しません。それらは、代わりに普通のオブジェクトとしてパースバックされます。


### U+FFFF以上のコードポイントと無効なUTF-8データについて

すべての標準ECMAScript文字列は、内部的には有効なCESU-8データなので、U+FFFF以上のコードポイントに対する動作は、コンプライアンス上の問題を引き起こすことはありません。しかし、Duktapeの文字列は、拡張UTF-8コードポイントを含み、さらに無効なUTF-8データを含む可能性があります。

標準のECMAScript JSON APIを含むDuktape JSON実装は、無効なUTF-8データを処理するために置換文字を使用します。結果として得られる文字列は少し奇妙に見えるかもしれませんが、この動作はエラーを投げるよりも望ましいものです。


### JSONフォーマット例

以下の表は、各エンコーディングで異なる値がどのようにエンコードされるかをまとめたものです。


| Value        | Standard JSON  | JX            | JC                    | Notes |
| ------------ | -------------- | ------------- | --------------------- | ----- |
| undefined    | n/a            | undefined     | {"_undef":true}       | Standard JSON: encoded as null inside arrays, otherwise omitted |
| null         | null           | null          | null                  | standard JSON |
| true         | true           | true          | true                  | standard JSON |
| false        | false          | false         | false                 | standard JSON |
| 123.4        | 123.4          | 123.4         | 123.4                 | standard JSON |
| +0           | 0              | 0             | 0                     | standard JSON |
| -0           | 0              | -0            | -0                    | Standard JSON allows -0 but serializes negative zero as 0 (losing the sign unnecessarily) |
| NaN          | null           | NaN           | {"_nan":true}         | Standard JSON: always encoded as null |
| Infinity     | null           | Infinity      | {"_inf":true}         | Standard JSON: always encoded as null |
| -Infinity    | null           | -Infinity     | {"_ninf":true}        | Standard JSON: always encoded as null |
| "köhä"       | "köhä"         | "k\xf6h\xe4"  | "k\u00f6h\u00e4"      |   |
| U+00FC       | "\u00fc"       | "\xfc"        | "\u00fc"              |   |
| U+ABCD       | "\uabcd"       | "\uabcd"      | "\uabcd"              |   |
| U+1234ABCD   | "U+1234abcd"   | "\U1234abcd"  | "U+1234abcd"          | Non-BMP characters are not standard ECMAScript, JX format borrowed from Python |
| object       | {"my_key":123} | {my_key:123}  | {"my_key":123}        | ASCII keys matching identifer requirements encoded without quotes in JX |
| array	       | ["foo","bar"]  | ["foo","bar"] | ["foo","bar"]         |   |	
| buffer	   | n/a            | \|deadbeef\|  | {"_buf":"deadbeef"}   |   |
| pointer	   | n/a            | (0xdeadbeef)  | {"_ptr":"0xdeadbeef"} |   |
|              |                | (DEADBEEF)    | {"_ptr":"DEADBEEF"}   | Representation inside parentheses or quotes is platform specific |
| NULL pointer | n/a            | (null)        | {"_ptr":"null"}       |   |
| function     | n/a            | {_func:true}  | {"_func":true}        | Standard JSON: encoded as null inside arrays, otherwise omitted |
| lightfunc    | n/a            | {_func:true}  | {"_func":true}        | Formats like ordinary functions |


### 制限事項

いくつかの制限事項があります。

- 列挙可能な自身のプロパティのみが、どのフォーマットでもシリアライズされます。
- 配列のプロパティ（エントリ以外）はシリアライズされません。これは、例えばロギングなどで [1,2,3, "type": "point"] のように有用でしょう。
- 配列のギャップは保存されず、未定義としてパースバックされます。
- JCデータの解析時に、特殊な値を自動的に復活させることはありません。
- 正規のエンコーディングがない。これは、エンコード時にオブジェクトのキーをソートする簡単なオプションで簡単にアレンジできるだろう。

(今後の課題については、内部ドキュメントを参照してください)。

