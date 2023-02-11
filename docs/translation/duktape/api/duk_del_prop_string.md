## duk_del_prop_string() 

1.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_del_prop_string(duk_context *ctx, duk_idx_t obj_idx, const char *key);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

Like duk_del_prop(), but the property name is given as a NUL-terminated C string key.


### 例

```c
duk_bool_t rc;

rc = duk_del_prop_string(ctx, -3, "propertyName");
printf("delete obj.propertyName -> rc=%d\n", (int) rc);
```

### 参照

duk_del_prop
duk_del_prop_index
duk_del_prop_lstring
duk_del_prop_literal
duk_del_prop_heapptr