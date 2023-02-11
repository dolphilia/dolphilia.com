## duk_put_prop_literal() 

2.3.0 property literal

### プロトタイプ

```c
duk_bool_t duk_put_prop_literal(duk_context *ctx, duk_idx_t obj_idx, const char *key_literal);
```

### スタック

| ... | obj | ... | val | -> | ... | obj | ... |

### 要約

duk_put_prop() と同様ですが、プロパティ名は文字列リテラルとして与えられます (duk_push_literal() を参照してください)。


### 例

```c
duk_bool_t rc;

duk_push_string(ctx, "value");
rc = duk_put_prop_literal(ctx, -3, "myPropertyName");
printf("rc=%d\n", (int) rc);
```

### 参照

duk_put_prop
duk_put_prop_index
duk_put_prop_string
duk_put_prop_lstring
duk_put_prop_heapptr