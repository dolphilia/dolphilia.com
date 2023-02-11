## duk_get_prop_string() 

1.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_get_prop_string(duk_context *ctx, duk_idx_t obj_idx, const char *key);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... | val | (if key exists)
| ... | obj | ... | -> | ... | obj | ... | undefined | (if key doesn't exist)

### 要約

duk_get_prop() と同様ですが、プロパティ名は、NUL で終端する C 文字列キーとして与えられます。


### 例

```c
(void) duk_get_prop_string(ctx, -3, "propertyName");
printf("obj.propertyName = %s\n", duk_to_string(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_get_prop
duk_get_prop_index
duk_get_prop_lstring
duk_get_prop_literal
duk_get_prop_heapptr