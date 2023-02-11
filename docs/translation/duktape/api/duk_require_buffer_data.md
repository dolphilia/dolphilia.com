## duk_require_buffer_data() 

1.3.0 stack buffer object buffer

### プロトタイプ

```c
void *duk_require_buffer_data(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size);
```

### スタック

| ... | val | ... |

### 要約

duk_get_buffer_data() と同様ですが、idx の値がプレーンバッファまたはバッファオブジェクトでない場合、値がバッファオブジェクトでその「バッキングバッファ」がバッファオブジェクトの見た目のサイズを完全にカバーしていない場合、またはインデックスが無効な場合にエラーを送出します。


### 例

```c
void *ptr;
duk_size_t sz;

ptr = duk_require_buffer_data(ctx, -3, &sz);
printf("buf=%p, size=%lu\n", ptr, (unsigned long) sz);
```

### 参照

duk_get_buffer_data
duk_require_buffer
duk_get_buffer