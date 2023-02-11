## duk_put_prop_lstring() 

2.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_put_prop_lstring(duk_context *ctx, duk_idx_t obj_idx, const char *key, duk_size_t key_len);
```

### スタック

| ... | obj | ... | val | -> | ... | obj | ... |

### 要約

duk_put_prop() と同様ですが、プロパティ名は、長さを明示した文字列として与えられます。


### 例

```c
duk_bool_t rc;

duk_push_string(ctx, "value");
rc = duk_put_prop_lstring(ctx, -3, "internal" "\x00" "nul", 12);
printf("rc=%d\n", (int) rc);
```

### 参照

duk_put_prop
duk_put_prop_index
duk_put_prop_string
duk_put_prop_literal
duk_put_prop_heapptr