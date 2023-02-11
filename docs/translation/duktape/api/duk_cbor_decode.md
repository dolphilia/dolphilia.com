## duk_cbor_decode() 

2.5.0 experimental codec cbor

### プロトタイプ

```c
void duk_cbor_decode(duk_context *ctx, duk_idx_t idx, duk_uint_t decode_flags);
```

### スタック

| ... | cbor_val | ... | -> | ... | val | ... |

### 要約

CBORでエンコードされた値（任意のバッファタイプで与えられる）をインプレース操作でデコードします。結果の値は任意のECMAScriptの値になります。現在、フラグは定義されていませんので、フラグに0を渡してください。

CBOR から ECMAScript の値へのマッピングは実験的なもので、デコード結果は時間の経過とともに変化する可能性があります。例えば、ECMAScript 値のエンコードとデコードのラウンドトリッピングを改善するために、カスタム CBOR タグが追加されるでしょう。

### 例

```c
duk_cbor_decode(ctx, -1, 0);
```

### 参照

duk_cbor_encode
