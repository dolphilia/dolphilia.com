## duk_require_uint() 

1.0.0 stack

### プロトタイプ

```c
duk_uint_t duk_require_uint(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

duk_get_uint() と同様であるが、idx の値が数値でない場合、あるいはインデックスが無効な場合にエラーを発生させます。


### 例

```c
printf("unsigned int value: %lu\n", (unsigned long) duk_require_uint(ctx, -3));
```