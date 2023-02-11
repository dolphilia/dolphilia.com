## duk_is_lightfunc() 

stack

### プロトタイプ

```c
duk_bool_t duk_is_lightfunc(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx にある値が lightfunc であれば 1 を、そうでなければ 0 を返します。 idx が無効な場合も 0 を返す。


### 例

```c
if (duk_is_lightfunc(ctx, -3)) {
    /* ... */
}
```