## duk_is_error() 

1.1.0 stack error

### プロトタイプ

```c
duk_bool_t duk_is_error(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx にある値が Error を継承している場合は 1 を、そうでない場合は 0 を返す。idx が無効な場合も、以下を返す。0.


### 例

```c
if (duk_is_error(ctx, -3)) {
    /* Inherits from Error, attempt to print stack trace */
    duk_get_prop_string(ctx, -3, "stack");
    printf("%s\n", duk_safe_to_string(ctx, -1));
    duk_pop(ctx);
}
```