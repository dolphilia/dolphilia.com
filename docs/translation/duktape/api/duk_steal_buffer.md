## duk_steal_buffer() 

1.3.0 stack buffer

### プロトタイプ

```c
void *duk_steal_buffer(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size);
```

### スタック

| ... | val | ... |

### 要約

idx にあるダイナミックバッファの現在のアロケーションを盗用します。具体的には、Duktape は以前の割り当てを忘れ、バッファをゼロサイズ (および NULL データポインタ) にリセットします。以前の割り当てへのポインタが返され、以前の割り当ての長さは、非NULLの場合、out_sizeに書き込まれます。ダイナミックバッファ自体はバリュースタック上に残り、再利用することができます。呼び出し元は、duk_free() を使用して前の割り当てを解放する責任があります。Duktapeは、ガベージコレクションやDuktapeヒープが破壊されたときでさえ、以前の割り当てを解放しません。

このAPIコールは、動的バッファがバッファ操作アルゴリズムにおいて安全な一時的バッファと して使用される場合に便利です（エラーが発生した場合に備えて、自動的にメモリ管 理されます）。このようなアルゴリズムの最後に、呼び出し元はバッファを盗んで、ダイナミック・バッファ自体が解放されても、Duktapeガベージ・コレクションによって解放されないようにしたい場合があります。


### 例

```c
duk_size_t sz;
void *ptr;

ptr = duk_push_dynamic_buffer(ctx, 256);  /* initial size */
for (;;) {
    /* Error prone algorithm, resizes and appends to buffer.  If an error
     * occurs, the dynamic buffer is automatically freed.
     */

    /* ... */
    duk_resize_buffer(ctx, -1, new_size);
}

/* Algorithm is done, we want to own the buffer.  The duk_steal_buffer()
 * API call returns the final data pointer (in case it has been changed
 * by resizes etc).
 */
ptr = duk_steal_buffer(ctx, -1, &sz);

/* At this point the dynamic buffer is still on the value stack.
 * Its size is zero and the current allocation is empty.  Here we
 * just pop it as unneeded.
 */
duk_pop(ctx);

/* ... */

/* Eventually, when done with the buffer, you must free it yourself,
 * otherwise memory will be leaked.  Duktape won't free the allocation
 * automatically, even at Duktape heap destruction.
 */
duk_free(ctx, ptr);
```