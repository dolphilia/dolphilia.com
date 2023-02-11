## duk_del_prop_literal() 

2.3.0 property literal

### プロトタイプ

```c
duk_bool_t duk_del_prop_literal(duk_context *ctx, duk_idx_t obj_idx, const char *key_literal);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

duk_del_prop() と同様ですが、プロパティ名は文字列リテラルとして与えられます (duk_push_literal() を参照してください)。


### 例

```c
duk_bool_t rc;

rc = duk_del_prop_literal(ctx, -3, "myPropertyKey");
printf("delete obj.myPropertyKey -> rc=%d\n", (int) rc);
```

### 参照

duk_del_prop
duk_del_prop_index
duk_del_prop_string
duk_del_prop_lstring
duk_del_prop_heapptr