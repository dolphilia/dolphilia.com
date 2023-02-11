## duk_check_type() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_check_type(duk_context *ctx, duk_idx_t idx, duk_int_t type);
```

### スタック

| ... | val | ... |

### 要約

idxにある値の型とtypeをマッチさせます。型が一致する場合は1を，そうでない場合は0を返す。


### 例

```c
if (duk_check_type(ctx, -3, DUK_TYPE_NUMBER)) {
    printf("value is a number\n");
}
```