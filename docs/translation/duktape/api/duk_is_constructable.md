## duk_is_constructable() 

2.2.0 stack

### プロトタイプ

```c
duk_bool_t duk_is_constructable(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値が構築可能であれば1を、そうでなければ0を返す。また、idxが無効な場合は0を返す。


### 例

```c
if (duk_is_constructable(ctx, -3)) {
    /* ... */
}
```