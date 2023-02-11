## duk_generic_error_va() 

2.0.0 vararg error

### プロトタイプ

```c
duk_ret_t duk_generic_error_va(duk_context *ctx, const char *fmt, va_list ap);
```

### スタック

| ... | -> | ... | err |

### 要約

エラーコード DUK_ERR_ERROR を持つ duk_error_va() と同等の便宜的な API 呼び出し。

このAPIコールは完全には移植性がない。なぜなら、呼び出し側のコードの va_end() マクロは(例えばエラースローにより)到達しないかもしれないからです。いくつかの実装は、例えば va_start() によって割り当てられたメモリを解放するために va_end() に依存します; https://stackoverflow.com/questions/11645282/do-i-need-to-va-end-when-an-exception-is-thrown を参照してください。しかし、そのような実装はまれであり、これは通常実用的な懸念ではありません。

### 例

```c
void my_generic_error(duk_context *ctx, const char *fmt, ...) {
    va_list ap;

    va_start(ap, fmt);
    duk_generic_error_va(ctx, fmt, ap);
    va_end(ap);
}
```

### 参照

duk_error_va