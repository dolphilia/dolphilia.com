## duk_push_fixed_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
void *duk_push_fixed_buffer(duk_context *ctx, duk_size_t size);
```

### スタック

| ... | -> | ... | buf |

### 要約

固定サイズのバッファを割り当てて、それをバリュースタックにプッシュします。dynamic = 0 での duk_push_buffer() のショートカットです。


### 例

```c
void *p;

p = duk_push_fixed_buffer(ctx, 1024);
printf("allocated buffer, data area: %p\n", p);
```