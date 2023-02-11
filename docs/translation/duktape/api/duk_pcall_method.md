## duk_pcall_method() 

1.0.0 protected call

### プロトタイプ

```c
duk_int_t duk_pcall_method(duk_context *ctx, duk_idx_t nargs);
```

### スタック

| ... | func | this | arg | ... | argN | -> | ... | retval | (if success, return value == 0)
| ... | func | this | arg | ... | argN | -> | ... | err | (if failure, return value != 0)

### 要約

duk_pcall() と同様であるが、ターゲット関数 func は、バリュースタック上で明示的に与えられた this バインディングで呼び出されます。


### 例

```c
/* The target function here prints:
 *
 *    this: 123
 *    2 3
 *
 * and returns 5.
 */

duk_int_t rc;

duk_push_string(ctx, "(function(x,y) { print('this:', this); "
                     "print(x,y); return x+y; })");
duk_eval(ctx);  /* -> [ ... func ] */
duk_push_int(ctx, 123);
duk_push_int(ctx, 2);
duk_push_int(ctx, 3);
rc = duk_pcall_method(ctx, 2);  /* [ ... func 123 2 3 ] -> [ 5 ] */
if (rc == DUK_EXEC_SUCCESS) {
    printf("2+3=%ld\n", (long) duk_get_int(ctx, -1));  /* prints 5 */
} else {
    printf("error: %s\n", duk_to_string(ctx, -1));
}
duk_pop(ctx);
```