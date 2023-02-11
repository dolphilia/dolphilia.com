## duk_require_context() 

1.0.0 stack borrowed

### プロトタイプ

```c
duk_context *duk_require_context(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

duk_get_context() と同様であるが、idx の値が Duktape スレッドでない場合、またはインデックスが無効な場合にエラーを投げます。。


### 例

```c
duk_context *new_ctx;

(void) duk_push_thread(ctx);
new_ctx = duk_require_context(ctx, -1);
```