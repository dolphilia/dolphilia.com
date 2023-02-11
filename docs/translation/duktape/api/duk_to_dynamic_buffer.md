## duk_to_dynamic_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
void *duk_to_dynamic_buffer(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size);
```

### スタック

| ... | val | ... |

### 要約

duk_to_buffer() と同様ですが、結果は常に動的バッファです (エラーがスローされない限り)。値が固定バッファまたは外部バッファである場合、それをダイナミックバッファに変換します。


### 例

```c
duk_size_t sz;
void *buf = duk_to_dynamic_buffer(ctx, -3, &sz);
```