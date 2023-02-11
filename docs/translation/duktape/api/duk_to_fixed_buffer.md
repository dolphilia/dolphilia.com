## duk_to_fixed_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
void *duk_to_fixed_buffer(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size);
```

### スタック

| ... | val | ... |

### 要約

duk_to_buffer() と同様ですが、値がダイナミックバッファまたは外部バッファである場合、それを固定バッファに変換します。したがって、結果は常に（エラーが投げられない限り）固定バッファになります。


### 例

```c
duk_size_t sz;
void *buf = duk_to_fixed_buffer(ctx, -3, &sz);
```