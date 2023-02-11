## duk_hex_decode() 

1.0.0 hex codec

### プロトタイプ

```c
void duk_hex_decode(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | hex_val | ... | -> | ... | val | ... |

### 要約

16進エンコードされた値をインプレース操作でバッファにデコードします。入力が無効な場合、エラーを投げます。。


### 例

```c
duk_push_string(ctx, "7465737420737472696e67");
duk_hex_decode(ctx, -1);  /* buffer */
printf("hex decoded: %s\n", duk_to_string(ctx, -1));
duk_pop(ctx);

/* Output:
 * hex decoded: test string
 */
```

### 参照

duk_hex_encode