## duk_xmove_top() 

1.0.0 stack slice

### プロトタイプ

```c
void duk_xmove_top(duk_context *to_ctx, duk_context *from_ctx, duk_idx_t count);
```

### スタック

| ... | val1 | ... | valN | -> | ... | (on source stack, from_ctx)
| ... | -> | ... | val1 | ... | valN | (on target stack, to_ctx)

### 要約

ソーススタックの最上位から count 引数を取り除き、ターゲットスタックにプッシュします。呼び出し側は、例えば duk_require_stack() を使って、ターゲット・スタックに十分な割り当て領域があることを確認しなければなりません。ソースとターゲットの両方のスタックは、同じ Duktape ヒープに存在しなければなりません。

もしソースとターゲットのスタックが同じであれば、現在エラーが投げられています。

Lua の lua_xmove() と比較して、スタックからスタックへの順序が逆になっています。

### 例

```c
/* A Duktape/C function which executes a given function in a new thread.
 */
static duk_ret_t call_in_thread(duk_context *ctx) {
    duk_idx_t nargs;
    duk_context *new_ctx;

    /* Arguments: func, arg1, ... argN. */
    nargs = duk_get_top(ctx);
    if (nargs < 1) {
        return DUK_RET_TYPE_ERROR;  /* missing func | argument */
    }

    /* Create a new context. */
    duk_push_thread();
    new_ctx = duk_require_context(ctx, -1);

    /* Move arguments to the new context.  Note that we need to extend
     * the target stack allocation explicitly.
     */
    duk_require_stack(new_ctx, nargs);
    duk_xmove_top(new_ctx, ctx, nargs);

    /* Call the function; new_ctx is now: [ func | arg1 ... argN ]. */
    duk_call(new_ctx, nargs - 1);

    /* Return the function call result by copying it to the original stack. */
    duk_xmove_top(ctx, new_ctx, 1);
    return 1;
}
```

### 参照

duk_xcopy_top