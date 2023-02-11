## duk_require_pointer() 

1.0.0 stack

### プロトタイプ

```c
void *duk_require_pointer(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

duk_get_pointer() と同様であるが、idx の値がポインタでない場合、またはインデックスが無効な場合にエラーを投げます。。


### 例

```c
void *ptr;

ptr = duk_require_pointer(ctx, -3);
printf("my pointer is: %p\n", ptr);
```