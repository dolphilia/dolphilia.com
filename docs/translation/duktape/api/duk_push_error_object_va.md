## duk_push_error_object_va() 

1.1.0 vararg stack object error

### プロトタイプ

```c
duk_idx_t duk_push_error_object_va(duk_context *ctx, duk_errcode_t err_code, const char *fmt, va_list ap);
```

### スタック

| ... | -> | ... | err |

### 要約

duk_push_error_object() の Vararg 変形です。

この API 呼び出しは、呼び出し側のコードの va_end() マクロが (例えばエラースローのために) 到達しないかもしれないので、完全に移植性があるわけではありません。いくつかの実装は、例えば va_start() によって割り当てられたメモリを解放するために va_end() に依存しています; https://stackoverflow.com/questions/11645282/do-i-need-to-va-end-when-an-exception-is-thrown を参照してください。しかし、そのような実装はまれであり、これは通常実用的な懸念ではありません。

### 例

```c
duk_idx_t my_type_error(duk_context *ctx, const char *fmt, ...) {
    va_list ap;
    duk_idx_t err_idx;

    va_start(ap, fmt);
    err_idx = duk_push_error_object_va(ctx, DUK_ERR_TYPE_ERROR, fmt, ap);
    va_end(ap);

    return err_idx;
}
```

### 参照

duk_push_error_object