## duk_hex_encode() 

1.0.0 hex codec

### プロトタイプ

```c
const char *duk_hex_encode(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | hex_val | ... |

### 要約

任意の値をバッファに取り込み，その結果をインプレース操作で16進数にエンコードします。便宜上、結果の文字列へのポインタを返します。

バッファへの強制は，まずバッファにない値を文字列に強制し，次にその文字列をバッファに強制します。結果として得られるバッファには、CESU-8エンコーディングの文字列が格納されます。

### 例

```c
duk_push_string(ctx, "foo");
printf("hex encoded: %s\n", duk_hex_encode(ctx, -1));

/* Output:
 * hex encoded: 666f6f
 */
```

### 参照

duk_hex_decode