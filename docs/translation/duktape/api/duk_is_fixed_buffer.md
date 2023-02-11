## duk_is_fixed_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
duk_bool_t duk_is_fixed_buffer(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値が固定バッファの場合は1を、それ以外の場合は0を返す。 idx が無効な場合も 0 を返す。


### 例

```c
if (duk_is_fixed_buffer(ctx, -3)) {
    /* ... */
}
```