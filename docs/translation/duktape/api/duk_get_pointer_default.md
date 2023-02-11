## duk_get_pointer_default() 

2.1.0 stack

### プロトタイプ

```c
void *duk_get_pointer_default(duk_context *ctx, duk_idx_t idx, void *def_value);
```

### スタック

| ... | val | ... |

### 要約

duk_get_pointer() と同様ですが、明示的にデフォルト値が設定されており、値がポインタでない場合、あるいはインデックスが無効な場合に返されます。


### 例

```c
void *ptr;

ptr = duk_get_pointer_default(ctx, -3, (void *) 0x12345678);
printf("my pointer is: %p\n", ptr);
```

### 参照

duk_get_pointer