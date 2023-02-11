## duk_is_callable() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_is_callable(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値が呼び出し可能であれば1を返し、そうでなければ0を返す。また、idxが無効な場合は0を返す。

現在、これは duk_is_function() と同じです。


### 例

```c
if (duk_is_callable(ctx, -3)) {
    /* ... */
}
```