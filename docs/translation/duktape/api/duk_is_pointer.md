## duk_is_pointer() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_is_pointer(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値がポインタの場合は1を、それ以外の場合は0を返す。 idx が無効な場合も 0 を返す。


### 例

```c
if (duk_is_pointer(ctx, -3)) {
    /* ... */
}
```