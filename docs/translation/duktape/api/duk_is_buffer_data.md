## duk_is_buffer_data() 

2.0.0 stack buffer object buffer

### プロトタイプ

```c
duk_bool_t duk_is_buffer_data(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値がプレーンバッファまたはバッファオブジェクト型であれば1を、そうでなければ0を返す。


### 例

```c
if (duk_is_buffer_data(ctx, -3)) {
    /* ... */
}
```

### 参照

duk_is_buffer
