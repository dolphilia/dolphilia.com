## duk_check_type_mask() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_check_type_mask(duk_context *ctx, duk_idx_t idx, duk_uint_t mask);
```

### スタック

| ... | val | ... |

### 要約

idxにある値の型とmaskで与えられた型マスクビットをマッチさせます。値の型が型マスクビットの1つに一致する場合は1を，そうでない場合は0を返す。


### 例

```c
if (duk_check_type_mask(ctx, -3, DUK_TYPE_MASK_STRING |
                                 DUK_TYPE_MASK_NUMBER)) {
    printf("value is a string or a number\n");
}
```