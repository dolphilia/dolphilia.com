## duk_is_thread() 

1.0.0 thread stack

### プロトタイプ

```c
duk_bool_t duk_is_thread(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値がオブジェクトでDuktapeスレッド（コルーチン）であれば1を返し、そうでなければ0を返します。idx が無効な場合も 0 を返す。


### 例

```c
if (duk_is_thread(ctx, -3)) {
    /* ... */
}
```