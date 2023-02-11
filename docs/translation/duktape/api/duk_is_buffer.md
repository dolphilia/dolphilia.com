## duk_is_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
duk_bool_t duk_is_buffer(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値がプレーンバッファである場合は1を、そうでない場合は0を返します。 idx が無効な場合も 0 を返す。


### 例

```c
if (duk_is_buffer(ctx, -3)) {
    /* ... */
}
```

### 参照

duk_is_buffer_data