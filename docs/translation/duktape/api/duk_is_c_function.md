## duk_is_c_function() 

1.0.0 stack function

### プロトタイプ

```c
duk_bool_t duk_is_c_function(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値がFunctionオブジェクトであり、C関数（Duktape/C関数）と関連付けられている場合、1を返し、そうでない場合、0を返します。


### 例

```c
if (duk_is_c_function(ctx, -3)) {
    /* ... */
}
```