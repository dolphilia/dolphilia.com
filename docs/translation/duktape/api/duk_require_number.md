## duk_require_number() 

1.0.0 stack

### プロトタイプ

```c
duk_double_t duk_require_number(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

duk_get_number() と同様であるが、idx の値が数値でない場合、またはインデックスが無効な場合にエラーを投げます。。


### 例

```c
printf("value: %lf\n", (double) duk_require_number(ctx, -3));
```