## duk_is_boolean() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_is_boolean(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値がブール値であれば 1 を、そうでなければ 0 を返す。 idx が無効な場合も 0 を返す。


### 例

```c
if (duk_is_boolean(ctx, -3)) {
    /* ... */
}
```