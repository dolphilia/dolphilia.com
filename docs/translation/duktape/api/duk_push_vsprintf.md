## duk_push_vsprintf() 

1.0.0 vararg string stack

### プロトタイプ

```c
const char *duk_push_vsprintf(duk_context *ctx, const char *fmt, va_list ap);
```

### スタック

| ... | -> | ... | str |

### 要約

vsprintf()のように（ただし安全に）文字列をフォーマットし、結果の値をバリュースタックにプッシュします。結果の文字列へのNULLでないポインタを返します。

fmtがNULLの場合、空文字列がスタックにプッシュされ、空文字列へのNULLでないポインタが返される (この動作は、少なくともLinuxでは、NULLフォーマット文字列に対するvsprintf()の動作に類似しています。)。返されたポインタは再参照可能であり、NULターミネータ文字が保証されます。

vsprintf()とは異なり、文字列のフォーマットは安全です。具体的には、この実装は、一時的にフォーマットされた値に対して十分な大きさのバッファが見つかるまで、一時的なバッファのサイズを大きくしてみます。

ap 引数は、複数回の呼び出しに対して安全に再利用することはできません。これは、vararg メカニズムの制限事項です。

このAPIコールは、呼び出し側のコードのva_end()マクロが(例えばエラースローにより)到達しないかもしれないので、完全に移植性があるわけではありません。いくつかの実装は、例えば va_start() によって割り当てられたメモリを解放するために va_end() に依存しています; https://stackoverflow.com/questions/11645282/do-i-need-to-va-end-when-an-exception-is-thrown を参照してください。しかし、そのような実装はまれであり、これは通常実用的な懸念ではありません。

### 例

```c
void test_vsprintf(duk_context *ctx, ...) {
    va_list ap;

    va_start(ap, ctx);
    duk_push_vsprintf(ctx, "test: %d+%d=%d", ap);
    va_end(ap);
}

void test(duk_context *ctx) {
    test_vsprintf(ctx, 2, 3, 5);
}
```