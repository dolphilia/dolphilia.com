## duk_get_prop_literal() 

2.3.0 property literal

### プロトタイプ

```c
duk_bool_t duk_get_prop_literal(duk_context *ctx, const char *key_literal);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... | val | (if key exists)
| ... | obj | ... | -> | ... | obj | ... | undefined | (if key doesn't exist)

### 要約

duk_get_prop() と同様ですが、プロパティ名は文字列リテラルとして与えられます (duk_push_literal() を参照してください)。


### 例

```c
(void) duk_get_prop_literal(ctx, -3, "myPropertyName");
printf("obj.myPropertyName = %s\n", duk_to_string(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_get_prop
duk_get_prop_index
duk_get_prop_string
duk_get_prop_lstring
duk_get_prop_heapptr