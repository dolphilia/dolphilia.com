## duk_base64_decode() 

1.0.0 codec base64

### プロトタイプ

```c
void duk_base64_decode(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | base64_val | ... | -> | ... | val | ... |

### 要約

base-64でエンコードされた値をインプレース操作でバッファにデコードします。入力が無効な場合、エラーを投げます。。

### 例

```c
duk_push_string(ctx, "Zm9v");
duk_base64_decode(ctx, -1);  /* buffer */
printf("base-64 decoded: %s\n", duk_to_string(ctx, -1));
duk_pop(ctx);

/* Output:
 * base-64 decoded: foo
 */
```

### 参照

duk_base64_encode