## duk_pcall_prop() 

1.0.0 protected property call

### プロトタイプ

```c
duk_int_t duk_pcall_prop(duk_context *ctx, duk_idx_t obj_idx, duk_idx_t nargs);
```

### スタック

| ... | obj | ... | key arg1 | ... | argN | -> | ... | obj | ... | retval | (if success, return value == 0)
| ... | obj | ... | key arg1 | ... | argN | -> | ... | obj | ... | err | (if failure, return value != 0)

### 要約

duk_pcall() と同様ですが、ターゲット関数は obj.key から検索され、obj は関数の this バインディングとして使用されます。


### 例

```c
/* obj.myAdderMethod(2,3) -> 5 */
duk_idx_t obj_idx;
duk_int_t rc;

duk_push_string(ctx, "myAdderMethod");
duk_push_int(ctx, 2);
duk_push_int(ctx, 3);
rc = duk_pcall_prop(ctx, obj_idx, 2);  /* [ ... "myAdderMethod" 2 3 ] -> [ ... 5 ] */
if (rc == DUK_EXEC_SUCCESS) {
    printf("2+3=%ld\n", (long) duk_get_int(ctx, -1));
} else {
    printf("error: %s\n", duk_to_string(ctx, -1));
}
duk_pop(ctx);
```