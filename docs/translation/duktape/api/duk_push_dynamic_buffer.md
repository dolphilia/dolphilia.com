## duk_push_dynamic_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
void *duk_push_dynamic_buffer(duk_context *ctx, duk_size_t size);
```

### スタック

| ... | -> | ... | buf |

### 要約

動的な (サイズ変更可能な) バッファを割り当て、それをバリュースタックにプッシュします。dynamic = 1 での duk_push_buffer() のショートカットです。


### 例

```c
void *p;

p = duk_push_dynamic_buffer(ctx, 1024);
printf("allocated buffer, data area: %p\n", p);
```