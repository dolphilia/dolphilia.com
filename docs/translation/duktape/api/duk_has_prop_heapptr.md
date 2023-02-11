## duk_has_prop_heapptr() 

2.2.0 property heap ptr borrowed

### プロトタイプ

```c
duk_bool_t duk_has_prop_heapptr(duk_context *ctx, duk_idx_t obj_idx, void *ptr);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

duk_has_prop() と同様ですが、プロパティ名は、例えば duk_get_heapptr() を使って得られた Duktape ヒープ・ポインタとして与えられます。ptr が NULL ならば、undefined がキーとして使用されます。


### 例

```c
void *ptr;

duk_push_string(ctx, "propertyName");
ptr = duk_get_heapptr(ctx, -1);
/* String behind 'ptr' must remain reachable! */

if (duk_has_prop_heapptr(ctx, -3, ptr)) {
    printf("obj has 'myProperty'\n");
} else {
    printf("obj does not have 'myProperty'\n");
}
```

### 参照

duk_has_prop
duk_has_prop_index
duk_has_prop_string
duk_has_prop_lstring
duk_has_prop_literal