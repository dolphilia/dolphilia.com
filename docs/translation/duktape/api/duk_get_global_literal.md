## duk_get_global_literal() 

2.3.0 property literal

### プロトタイプ

```c
duk_bool_t duk_get_global_literal(duk_context *ctx, const char *key_literal);
```

### スタック

| ... | -> | ... | val | (if key exists)
| ... | -> | ... | undefined | (if key doesn't exist)

### 要約

duk_get_global_string() と同様ですが、プロパティ名は文字列リテラルとして与えられます (duk_push_literal() を参照)。


### 例

```c
(void) duk_get_global_literal(ctx, "encodeURIComponent");
duk_push_string(ctx, "foo bar");
duk_call(ctx, 1);  /* [ ... encodeURIComponent "foo bar" ] -> [ "foo%20bar" ] */
printf("encoded: %s\n", duk_to_string(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_get_global_string
duk_get_global_lstring
duk_get_global_heapptr