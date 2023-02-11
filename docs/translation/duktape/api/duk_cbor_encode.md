## duk_cbor_encode() 

2.5.0 experimental codec cbor

### プロトタイプ

```c
void duk_cbor_encode(duk_context *ctx, duk_idx_t idx, duk_uint_t encode_flags);
```

### スタック

| ... | val | ... | -> | ... | cbor_val | ... |

### 要約

インプレース操作で任意の値をCBOR表現にエンコードします。結果として得られる値は、（今のところ）ArrayBufferです。現時点ではフラグは定義されていないので、フラグには0を渡します。

ECMAScript の値から CBOR へのマッピングは実験的なもので、エンコーディングの結果は時間の経過とともに変化する可能性があります。例えば、ECMAScript の値のエンコードとデコードのラウンドトリッピングを改善するために、カスタム CBOR タグが追加される予定です。また、結果の型（ArrayBuffer）も後で変更されるかもしれません。

### 例

```c
unsigned char *buf;
duk_size_t len;

duk_push_object(ctx);
duk_push_int(ctx, 42);
duk_put_prop_string(ctx, -2, "meaningOfLife");
duk_cbor_encode(ctx, -1, 0);
buf = duk_require_buffer_data(ctx, -1, &len);
/* CBOR data is in buf[0] ... buf[len - 1]. */
duk_pop(ctx);
```

### 参照

duk_cbor_decode
