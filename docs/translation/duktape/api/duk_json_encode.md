## duk_json_encode() 

1.0.0 json codec

### プロトタイプ

```c
const char *duk_json_encode(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | json_val | ... |

### 要約

任意の値をインプレース操作でJSON表現にエンコードします。便宜上、結果の文字列へのポインタを返します。


### 例

```c
duk_push_object(ctx);
duk_push_int(ctx, 42);
duk_put_prop_string(ctx, -2, "meaningOfLife");
printf("JSON encoded: %s\n", duk_json_encode(ctx, -1));
duk_pop(ctx);

/* Output:
 * JSON encoded: {"meaningOfLife":42}
 */
```

### 参照

duk_json_decode