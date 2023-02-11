## duk_pnew() 

1.3.0 protected object call

### プロトタイプ

```c
duk_ret_t duk_pnew(duk_context *ctx, duk_idx_t nargs);
```

### スタック

| ... | constructor | arg1 | ... | argN | -> | ... | retval | (if success, return value == 0)
| ... | constructor | arg1 | ... | argN | -> | ... | err | (if failure, return value != 0)

### 要約

duk_new() と同様ですが、エラーを捕捉します。0 の返り値は成功を示し、コンストラクタの結果はスタックトップに残されます。0 ではない返り値はエラーを示し、そのエラーはスタックトップに残されます。

スタックトップが低すぎる (nargs + 1 より小さい) 場合、または nargs が負である場合、エラーがスローされます。


### 例

```c
duk_ret_t rc;

/* Protected call to: new MyConstructor("foo", 123) */
duk_eval_string(ctx, "MyConstructor");
duk_push_string(ctx, "foo");
duk_push_int(ctx, 123);
rc = duk_pnew(ctx, 2);  /* [ ... func "foo" 123 ] -> [ ... res ] */
if (rc != 0) {
    printf("failed: %s\n", duk_safe_to_string(ctx, -1));
} else {
    printf("success\n");
}
duk_pop(ctx);
```

### 参照

duk_new