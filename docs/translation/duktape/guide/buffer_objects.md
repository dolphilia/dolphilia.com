## バッファ・オブジェクト {#buffer_objects}

### バッファ・タイプの概要

Duktapeは、以下のバッファ・タイプおよびバッファ関連タイプを提供します。

| Type                          | Standard            | Duktape version | Description |
| ----------------------------- | ------------------- | --------------- | ---- |
| Plain buffer                  | No Duktape specific |	1.0             | Plain, primitive buffer value (not an object), similar to how a plain string relates to a String object. Behaves like an Uint8Array instance where possible, object coerces to an actual Uint8Array. |
| ArrayBuffer object            | Yes ES2015          | 1.3             | Standard object type for representing a byte array. References an underlying plain buffer. |
| DataView, typed array objects | Yes ES2015          | 1.3             | View objects to access an underlying ArrayBuffer. References an underlying plain buffer. |
| Node.js Buffer object         | No Node.js-like     | 1.3             | Object with Node.js Buffer API, inherits from Uint8Array.prototype. References an underlying plain buffer. |


バッファの種類とそのプロパティの詳細な表など、詳しい説明はbuffers.rstを参照してください。


### プレーン バッファ

プレーンバッファーは、バッファーのデータを表現するための非標準的なメモリ効率の良い方法です。プレーンバッファーは Uint8Array.prototype を継承し、型付き配列のコンストラクターの引数として受け付けられるなど、Uint8Array オブジェクトを模倣しています。プレーンバッファーはプロパティテーブルを持たず、それ自身のプロパティを保持できませんが、以下の仮想または継承されたプロパティを持っています（例の値は24バイトのバッファーのものです）。

| Property name     | Example value | Description |
| ----------------- | ------------- | ----------- |
| \[index\]         | 0-255         | Index properties in the range [0, length-1]. Reads and writes behave like for Uint8Array. |
| length            | 24            | Length of buffer in bytes. Length is not writable, so you can't resize a buffer by assigning its length. |
| byteOffset        | 0             | Always 0, present to match typed arrays. |
| byteLength        | 24            | Same as .length. |
| BYTES_PER_ELEMENT | 1             | Always 1, present to match typed arrays. |
| buffer            |               | Getter property which returns a new ArrayBuffer instance backing to the plain buffer without making a copy. Because plain buffers don't have a property table, a new ArrayBuffer is created on every property read. Absent if buffer object support is disabled in Duktape configuration. |


ArrayBuffer や Node.js Buffer などのバッファオブジェクトは、プレーンなバッファ値の上に実装され、ビュー/スライスのサポート、型付きアクセッサ、異なるエンディアンのデータを操作するメソッドなどの追加機能を提供します。しかし、これらはプレーンなバッファよりもオーバーヘッドがあります。

詳しくは、以下を参照してください。

- バッファの扱い方
- 型付けアルゴリズム
- buffers.rst


### バッファを使った作業

バッファの値は C と ECMAScript の両方のコードで動作します。

- ECMAScript コードでは、ほとんどの動作は関連する API 標準で定義されていますが、異なるバッファ・タイプの混在のような Duktape 固有の機能については例外があります。
- Cコードでは、プレーン・バッファとバッファ・オブジェクトを操作するためのAPIコールがあります。

例としては、How to work with buffers (バッファの扱い方) を参照してください。


> 特殊なケースでは、バッファ・オブジェクトをバックアップするプレーン・バッファが、バッファ・オブジェクトの見かけ上のサイズをカバーするのに十分な大きさでないことがあります。Duktapeはこのようなバッファに対してメモリセーフな動作を保証していますが、それ以外の動作は呼び出しによって異なります。例えば、ある呼び出しがこの状況を無視して黙ってundefined、NaN、または0を返すこともあれば、TypeErrorを投げることもあります。アンバックアップバッファの動作はバージョン保証の対象外であり、マイナーバージョン間で変更される可能性があります。


### 現在の制限事項

- TypedArrayバインディングのカスタム動作を参照してください。
- Node.jsのBufferバインディングのカスタム動作を参照してください。

