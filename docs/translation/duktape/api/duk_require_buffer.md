## duk_require_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
void *duk_require_buffer(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size);
```

### スタック

| ... | val | ... |

### 要約

duk_get_buffer() と同様ですが、idx の値が (plain) buffer でない場合、またはインデックスが無効な場合にエラーを発生させます。


### 例

```c
void *ptr;
duk_size_t sz;

ptr = duk_require_buffer(ctx, -3, &sz);
printf("buf=%p, size=%lu\n", ptr, (unsigned long) sz);
```

### 参照

duk_get_buffer
duk_require_buffer_data
duk_get_buffer_data