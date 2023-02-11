## duk_put_prop_heapptr() 

2.2.0 property heap ptr borrowed

### プロトタイプ

```c
duk_bool_t duk_put_prop_heapptr(duk_context *ctx, duk_idx_t obj_idx, void *ptr);
```

### スタック

| ... | obj | ... | val | -> | ... | obj | ... |

### 要約

duk_put_prop() と同様ですが、プロパティ名は、例えば duk_get_heapptr() を使って取得した Duktape ヒープポインタとして与えられます。ptr が NULL の場合、undefined がキーとして使用されます。


### 例

```c
duk_bool_t rc;
void *ptr;

duk_push_string(ctx, "propertyName");
ptr = duk_get_heapptr(ctx, -1);
/* String behind 'ptr' must remain reachable! */

duk_push_string(ctx, "value");
rc = duk_put_prop_heapptr(ctx, -3, ptr);
printf("rc=%d\n", (int) rc);
```

### 参照

duk_put_prop
duk_put_prop_index
duk_put_prop_string
duk_put_prop_lstring
duk_put_prop_literal