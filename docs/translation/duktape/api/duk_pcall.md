## duk_pcall() 

1.0.0 protected call

### プロトタイプ

```c
duk_int_t duk_pcall(duk_context *ctx, duk_idx_t nargs);
```

### スタック

| ... | func | arg1 | ... | argN | -> | ... | retval | (if success, return value == 0)
| ... | func | arg1 | ... | argN | -> | ... | err | (if failure, return value != 0)

### 要約

ターゲット関数funcをnargsの引数で呼び出す（関数自体を除く）。関数とその引数は、単一の戻り値または単一のエラー値で置き換えられます。関数呼び出し中に投げられたエラーはキャッチされます。

戻り値はduk_exec_success (0)です。呼び出しが成功した場合、nargs 引数は単一の戻り値で置き換えられます。(この戻り値コード定数はゼロであることが保証されているので、「ゼロかゼロでないか」のチェックで成功を確認することができる)。
DUK_EXEC_ERROR: 呼び出しに失敗、nargs 引数は単一のエラー値で置き換えられます。(例外的に、例えばバリュースタック上の引数が少なすぎる場合、呼び出しは投げます。かもしれない)。
ほとんどのDuktape APIコールとは異なり、このコールは成功時にゼロを返します。これにより、複数のエラー・コードを後で定義することができます。
捕捉されたエラー・オブジェクトは通常Errorのインスタンスで、.stack、.fileName、.lineNumberなどの有用なプロパティを持ちます。これらは通常のプロパティメソッドでアクセスすることができます。しかし、任意の値が投げられる可能性があるので、常にそうであると仮定することは避けるべきです。

このバインディングの対象関数は、初期状態では未定義に設定されています。ターゲット関数が厳密でない場合、関数が呼び出される前にバインディングはグローバルオブジェクトに置き換えられます。関数コードの入力を参照してください。このバインディングを制御したい場合は、代わりに duk_pcall_method() または duk_pcall_prop() を使用することができます。


### 例

```c
/* Assume target function is already on stack at func_idx; the target
 * function adds arguments and returns the result.
 */

duk_idx_t func_idx;
duk_int_t rc;

/* Basic example: function call and duk_safe_to_string() error print. */

duk_dup(ctx, func_idx);
duk_push_int(ctx, 2);
duk_push_int(ctx, 3);
rc = duk_pcall(ctx, 2);  /* [ ... func 2 3 ] -> [ 5 ] */
if (rc == DUK_EXEC_SUCCESS) {
    printf("2+3=%ld\n", (long) duk_get_int(ctx, -1));
} else {
    /* Coercing with duk_safe_to_string() is a useful default, but you can
     * also look up e.g. the .stack property of the error.
     */
    printf("error: %s\n", duk_safe_to_string(ctx, -1));
}
duk_pop(ctx);

/* Accessing .stack to print a stack trace if the value caught is an
 * Error instance.
 */

duk_dup(ctx, func_idx);
duk_push_int(ctx, 2);
duk_push_int(ctx, 3);
rc = duk_pcall(ctx, 2);  /* [ ... func 2 3 ] -> [ 5 ] */
if (rc == DUK_EXEC_SUCCESS) {
    printf("2+3=%ld\n", (long) duk_get_int(ctx, -1));
} else {
    if (duk_is_error(ctx, -1)) {
        /* Accessing .stack might cause an error to be thrown, so wrap this
         * access in a duk_safe_call() if it matters.
         */
        duk_get_prop_string(ctx, -1, "stack");
        printf("error: %s\n", duk_safe_to_string(ctx, -1));
        duk_pop(ctx);
    } else {
        /* Non-Error value, coerce safely to string. */
        printf("error: %s\n", duk_safe_to_string(ctx, -1));
    }
}
duk_pop(ctx);
```

### 参照

duk_pcall_method
duk_pcall_prop