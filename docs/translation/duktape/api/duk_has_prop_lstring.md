## duk_has_prop_lstring() 

2.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_has_prop_lstring(duk_context *ctx, duk_idx_t obj_idx, const char *key, duk_size_t key_len);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

duk_has_prop() と同様ですが、プロパティ名は長さを明示した文字列として与えられます。


### 例

```c
if (duk_has_prop_lstring(ctx, -3, "internal" "\x00" "nul", 12)) {
    printf("obj has 'internal[00]nul'\n");
} else {
    printf("obj does not have 'internal[00]nul'\n");
}
```

### 参照

duk_has_prop
duk_has_prop_index
duk_has_prop_string
duk_has_prop_literal
duk_has_prop_heapptr