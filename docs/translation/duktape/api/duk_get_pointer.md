## duk_get_pointer() 

1.0.0 stack

### プロトタイプ

```c
void *duk_get_pointer(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx にあるポインタの値を、値を変更したり強制したりすることなく、void * として取得します。値がポインタでない場合、またはインデックスが無効な場合は NULL を返す。


### 例

```c
void *ptr;

ptr = duk_get_pointer(ctx, -3);
printf("my pointer is: %p\n", ptr);
```