## duk_require_int() 

1.0.0 stack

### プロトタイプ

```c
duk_int_t duk_require_int(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

duk_get_int() と同様であるが、idx の値が数値でない場合、またはインデックスが無効な場合にエラーを投げます。。


### 例

```c
printf("int value: %ld\n", (long) duk_require_int(ctx, -3));
```