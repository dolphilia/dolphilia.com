## duk_get_global_string() 

1.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_get_global_string(duk_context *ctx, const char *key);
```

### スタック

| ... | -> | ... | val | (if key exists)
| ... | -> | ... | undefined | (if key doesn't exist)

### 要約

グローバルオブジェクトから key という名前のプロパティを取得します。そのプロパティが存在する場合は非ゼロを、そうでない場合はゼロを返します。これは、以下の関数と同等のことを行う便利な関数です。

```c
duk_bool_t ret;

duk_push_global_object(ctx);
ret = duk_get_prop_string(ctx, -1, key);
duk_remove(ctx, -2);
/* 'ret' would be the return value from duk_get_global_string() */
```

### 例

```c
(void) duk_get_global_string(ctx, "encodeURIComponent");
duk_push_string(ctx, "foo bar");
duk_call(ctx, 1);  /* [ ... encodeURIComponent "foo bar" ] -> [ "foo%20bar" ] */
printf("encoded: %s\n", duk_to_string(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_get_global_lstring
duk_get_global_literal
duk_get_global_heapptr