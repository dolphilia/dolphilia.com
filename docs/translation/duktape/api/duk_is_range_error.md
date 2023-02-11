## duk_is_range_error() 

1.4.0 stack error

### プロトタイプ

```c
duk_bool_t duk_is_range_error(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

Returns 1 if value at idx inherits from RangeError, otherwise returns 0. idx が無効な場合も 0 を返す。 This is a convenience call for using duk_get_error_code() == DUK_ERR_RANGE_ERROR.


### 例

```c
if (duk_is_range_error(ctx, -3)) {
    /* ... */
}
```