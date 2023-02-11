## duk_config_buffer() 

1.3.0 stack buffer

### プロトタイプ

```c
void duk_config_buffer(duk_context *ctx, duk_idx_t idx, void *ptr, duk_size_t len);
```

### スタック

| ... | buf | ... | -> | ... | buf | ... |

### 要約

外部バッファポインタと外部バッファ値の長さを設定します。


### 例

```c
/* Create an external buffer and point it to my_buffer containing
 * my_length bytes.
 */
duk_push_external_buffer(ctx);
duk_config_buffer(ctx, -1, my_buffer, my_length);
```

### 参照

duk_push_external_buffer