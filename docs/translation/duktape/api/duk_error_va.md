## duk_error_va() 

1.1.0 vararg error

### プロトタイプ

```c
duk_ret_t duk_error_va(duk_context *ctx, duk_errcode_t err_code, const char *fmt, va_list ap);
```

### スタック

| ... | -> | ... | err |

### 要約

duk_error() の Vararg 変形です。

この API コールは、呼び出し側のコードの va_end() マクロが (例えばエラースローのために) 到達しないかもしれないので、完全には移植性がない。いくつかの実装は、例えば va_start() によって割り当てられたメモリを解放するために va_end() に依存しています; https://stackoverflow.com/questions/11645282/do-i-need-to-va-end-when-an-exception-is-thrown を参照してください。しかし、そのような実装はまれであり、これは通常実用的な懸念ではありません。

### 例

```c
void my_range_error(duk_context *ctx, const char *fmt, ...) {
    va_list ap;

    va_start(ap, fmt);
    duk_error_va(ctx, DUK_ERR_RANGE_ERROR, fmt, ap);
    va_end(ap);
}
```

### 参照

duk_error
duk_throw
duk_push_error_object
duk_generic_error_va
duk_eval_error_va
duk_range_error_va
duk_reference_error_va
duk_syntax_error_va
duk_type_error_va
duk_uri_error_va
