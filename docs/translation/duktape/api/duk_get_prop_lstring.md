## duk_get_prop_lstring() 

2.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_get_prop_lstring(duk_context *ctx, duk_idx_t obj_idx, const char *key, duk_size_t key_len);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... | val | (if key exists)
| ... | obj | ... | -> | ... | obj | ... | undefined | (if key doesn't exist)

### 要約

duk_get_prop() と同様ですが、プロパティ名は、長さを明示した文字列として与えられます。


### 例

```c
(void) duk_get_prop_lstring(ctx, -3, "internal" "\x00" "nul", 12);
printf("obj.internal[00]nul = %s\n", duk_to_string(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_get_prop
duk_get_prop_index
duk_get_prop_string
duk_get_prop_literal
duk_get_prop_heapptr