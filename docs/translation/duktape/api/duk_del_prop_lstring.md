## duk_del_prop_lstring() 

2.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_del_prop_lstring(duk_context *ctx, duk_idx_t obj_idx, const char *key, duk_size_t key_len);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

duk_del_prop() と同様ですが、プロパティ名は長さを明示的に指定した文字列として与えられます。


### 例

```c
duk_bool_t rc;

rc = duk_del_prop_lstring(ctx, -3, "internal" "\x00" "nul", 12);
printf("delete obj.internal[00]nul -> rc=%d\n", (int) rc);
```

### 参照

duk_del_prop
duk_del_prop_index
duk_del_prop_string
duk_del_prop_literal
duk_del_prop_heapptr
