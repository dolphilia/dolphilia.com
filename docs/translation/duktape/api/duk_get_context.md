## duk_get_context() 

1.0.0 stack borrowed

### プロトタイプ

```c
duk_context *duk_get_context(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxにあるDuktapeスレッドのコンテキスト・ポインタを取得します。idxの値がDuktapeスレッドでない場合、またはインデックスが無効な場合、 NULLを返します。

返されたコンテキスト・ポインタは、ガベージコレクションの観点から Duktapeスレッドに到達可能な間だけ有効です。

無効な値やインデックスに対してエラーを投げたい場合は、 duk_require_context() を使ってください。


### 例

```c
duk_context *new_ctx;

/* Create a new thread and get a context pointer. */

(void) duk_push_thread(ctx);
new_ctx = duk_get_context(ctx, -1);

/* You can use new_ctx as long as the related thread is reachable
 * from a garbage collection point of view.
 */

duk_push_string(new_ctx, "foo");

/* This duk_pop() makes the new thread unreachable (assuming there
 * is no other reference to it), so new_ctx is no longer valid
 * afterwards.
 */

duk_pop(ctx);

/* Using new_ctx here may cause a crash. */
```

### 参照

duk_get_context_default