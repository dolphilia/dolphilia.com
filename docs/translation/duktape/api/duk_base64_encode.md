## duk_base64_encode() 

1.0.0 codec base64

### プロトタイプ

```c
const char *duk_base64_encode(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | base64_val | ... |

### 要約

任意の値をバッファにコピーし、その結果をインプレース操作でbase-64にエンコードします。便宜上、結果の文字列へのポインタを返します。

バッファへの強制は，まずバッファ以外の値を文字列に強制し，次にその文字列をバッファに強制します。結果として得られるバッファは、CESU-8エンコーディングの文字列を含む。

### 例

```c
duk_push_string(ctx, "foo");
printf("base-64 encoded: %s\n", duk_base64_encode(ctx, -1));

/* Output:
 * base-64 encoded: Zm9v
 */
```

### 参照

duk_base64_decode
