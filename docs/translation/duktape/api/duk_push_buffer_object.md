## duk_push_buffer_object() 

1.3.0 stack buffer object

### プロトタイプ

```c
void duk_push_buffer_object(duk_context *ctx, duk_idx_t idx_buffer, duk_size_t byte_offset, duk_size_t byte_length, duk_uint_t flags);
```

### スタック

| ... | buffer | ... | -> | ... | buffer | ... | bufobj | (when creating an ArrayBuffer or a view)
| ... | ArrayBuffer | ... | -> | ... | ArrayBuffer | ... | bufobj | (when creating a view)

### 要約

新しいバッファオブジェクトまたはバッファビューオブジェクトをプッシュします。基本となるプレーンなバッファまたは ArrayBuffer (ビューを作成するときに受け取ります) が、インデックス idx_buffer で提供されます。バッファまたはビューのタイプは flags で与えられます (例: DUK_BUFOBJ_UINT16ARRAY)。バッファから使用されるアクティブな範囲または「スライス」は byte_offset と byte_length によって示されます。

利用可能なバッファの種類は以下の通りです。

定義 バッファ/ビュータイプ

DUK_BUFOBJ_NODEJS_BUFFER	Buffer (Node.js), a Uint8Array inheriting from Buffer.prototype
DUK_BUFOBJ_ARRAYBUFFER	ArrayBuffer
DUK_BUFOBJ_DATAVIEW	DataView
DUK_BUFOBJ_INT8ARRAY	Int8Array
DUK_BUFOBJ_UINT8ARRAY	Uint8Array
DUK_BUFOBJ_UINT8CLAMPEDARRAY	Uint8ClampedArray
DUK_BUFOBJ_INT16ARRAY	Int16Array
DUK_BUFOBJ_UINT16ARRAY	Uint16Array
DUK_BUFOBJ_INT32ARRAY	Int32Array
DUK_BUFOBJ_UINT32ARRAY	Uint32Array
DUK_BUFOBJ_FLOAT32ARRAY	Float32Array
DUK_BUFOBJ_FLOAT64ARRAY	Float64Array

ArrayBuffer 以外のものを作成し、引数として与えられたバッキングバッファがプレーンバッファである場合、ビューをバッキングする ArrayBuffer が自動的に作成されます。これは、ビューオブジェクトのbufferプロパティからアクセス可能です。ArrayBufferの内部byteOffsetは0になり、ArrayBufferのインデックスbyteOffsetはビューのインデックス0に一致します。ArrayBufferのbyteLengthは、ビューの範囲がArrayBufferに対して有効であるように、byte_offset + byte_lengthになるでしょう。

ArrayBufferを作成するとき、byte_offset引数は0にすることを強くお勧めします。さもなければ、ArrayBuffer上で構築されたビューの外部.byteOffsetプロパティは、誤解を招くでしょう：その値は、ArrayBufferに対する相対値ではなく、ArrayBufferの下にあるプレーンバッファに対する相対値となります。ゼロのbyte_offsetでは、2つのオフセットの間に違いはありません。

基礎となるプレーンバッファーは通常 byte_offset と byte_length 引数で示される範囲をカバーすべきですが、そうでない場合でもメモリ安全性は保証されます。例えば、基礎となるバッファの外側の値を読み込もうとすると、0が返されます。バッファオブジェクトの作成時に、意図的に基礎となるバッファのサイズをチェックしません: 作成時にバッファがバイト範囲を完全にカバーしていたとしても、後でサイズが変更されるかもしれません。


### 例

```c
/* Map byte range [100,150[ of plain buffer at idx_plain_buf into a
 * Uint16Array object which will have the following properties:
 *
 *   - length: 25             (length in Uint16 elements)
 *   - byteLength: 50         (length in bytes)
 *   - byteOffset: 100        (byte offset to start of slice)
 *   - BYTES_PER_ELEMENT: 2   (Uint16)
 *
 * The Uint16Array's .buffer property will be an ArrayBuffer with the
 * following properties:
 *
 *   - byteLength: 200
 *   - internal byteOffset: 0
 */

duk_push_buffer_object(ctx, idx_plain_buf, 100, 50, DUK_BUFOBJ_UINT16ARRAY);
```

### 参照

duk_push_buffer
duk_push_fixed_buffer
duk_push_dynamic_buffer
duk_push_external_buffer