## duk_has_prop_literal() 

2.3.0 property literal

### プロトタイプ

```c
duk_bool_t duk_has_prop_literal(duk_context *ctx, duk_idx_t obj_idx, const char *key_literal);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

duk_has_prop() と同様ですが、プロパティ名は文字列リテラルとして与えられます (duk_push_literal() を参照して下さい)。


### 例

```c
if (duk_has_prop_literal(ctx, -3, "myPropertyKey");
    printf("obj has 'myPropertyKey'\n");
} else {
    printf("obj does not have 'myPropertyKey'\n");
}
```

### 参照

duk_has_prop
duk_has_prop_index
duk_has_prop_string
duk_has_prop_lstring
duk_has_prop_heapptr