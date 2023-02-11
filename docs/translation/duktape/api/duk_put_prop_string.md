## duk_put_prop_string() 

1.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_put_prop_string(duk_context *ctx, duk_idx_t obj_idx, const char *key);
```

### スタック

| ... | obj | ... | val | -> | ... | obj | ... |

### 要約

duk_put_prop() のように、プロパティ名は、NUL で終端する C 文字列キーとして与えられます。


### 例

```c
duk_bool_t rc;

duk_push_string(ctx, "value");
rc = duk_put_prop_string(ctx, -3, "key");
printf("rc=%d\n", (int) rc);
```

### 参照

duk_put_prop
duk_put_prop_index
duk_put_prop_lstring
duk_put_prop_literal
duk_put_prop_heapptr