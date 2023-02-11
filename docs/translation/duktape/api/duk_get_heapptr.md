## duk_get_heapptr() 

1.1.0 stack heap ptr borrowed

### プロトタイプ

```c
void *duk_get_heapptr(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx で Duktape ヒープに割り当てられた値（オブジェクト、バッファ、文字列）への参照 を借用した void * を取得します。インデックスが無効であるか、対象の値がヒープに割り当てられていない場合は NULL を返します。返されたポインタは解釈したり再参照したりしてはならないが、 duk_push_heapptr() は、後で元の値をバリュースタックにプッシュするために使うことができます。

返された void ポインタは、ガベージコレクションの観点から見て、元の値に到達可能な間だけ有効です。そうでない場合、duk_push_heapptr() を使用することはメモリ上安全ではありません。


### 例

```c
duk_context *new_ctx;
void *ptr;

duk_eval_string(ctx, "({ foo: 'bar' })");
ptr = duk_get_heapptr(ctx, -1);

/* The original value must remain reachable for Duktape up to a future
 * duk_push_heapptr().  Here we just write it to the global object, but
 * it could also be a value stack somewhere, a stash object, etc.
 */
duk_put_global_string(ctx, "ref");

/* Later, assuming the original value has been reachable all the way
 * to here:
 */

duk_push_heapptr(ctx, ptr);
duk_get_prop_string(ctx, -1, "foo");
printf("obj.foo: %s\n", duk_safe_to_string(ctx, -1));  /* prints 'bar' */
```

### 参照

duk_require_heapptr
duk_push_heapptr
duk_get_heapptr_default