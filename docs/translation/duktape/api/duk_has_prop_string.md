## duk_has_prop_string() 

1.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_has_prop_string(duk_context *ctx, duk_idx_t obj_idx, const char *key);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

duk_has_prop() のように、プロパティ名は NUL で終端する C 文字列キーとして与えられます。


### 例

```c
if (duk_has_prop_string(ctx, -3, "myProperty")) {
    printf("obj has 'myProperty'\n");
} else {
    printf("obj does not have 'myProperty'\n");
}
```

### 参照

duk_has_prop
duk_has_prop_index
duk_has_prop_lstring
duk_has_prop_literal
duk_has_prop_heapptr