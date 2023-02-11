## duk_get_prop_heapptr() 

2.2.0 property heap ptr borrowed

### プロトタイプ

```c
duk_bool_t duk_get_prop_heapptr(duk_context *ctx, duk_idx_t obj_idx, void *ptr);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... | val | (if key exists)
| ... | obj | ... | -> | ... | obj | ... | undefined | (if key doesn't exist)

### 要約

duk_get_prop() と同様ですが、プロパティ名は、例えば duk_get_heapptr() を使って取得した Duktape ヒープポインタとして与えられます。ptr が NULL の場合、undefined がキーとして使用されます。


### 例

```c
void *ptr;

duk_push_string(ctx, "propertyName");
ptr = duk_get_heapptr(ctx, -1);
/* String behind 'ptr' must remain reachable! */

(void) duk_get_prop_heapptr(ctx, -3, ptr);
printf("obj.propertyName = %s\n", duk_to_string(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_get_prop
duk_get_prop_index
duk_get_prop_string
duk_get_prop_lstring
duk_get_prop_literal