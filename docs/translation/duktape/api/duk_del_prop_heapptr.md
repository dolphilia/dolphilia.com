## duk_del_prop_heapptr() 

2.2.0 property heap ptrborrowed

### プロトタイプ

```c
duk_bool_t duk_del_prop_heapptr(duk_context *ctx, duk_idx_t obj_idx, void *ptr);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

duk_del_prop() と同様ですが、プロパティ名は、例えば duk_get_heapptr() を使って取得した Duktape ヒープポインタとして与えられます。ptr が NULL の場合、undefined がキーとして使用されます。


### 例

```c
duk_bool_t rc;
void *ptr;

duk_push_string(ctx, "propertyName");
ptr = duk_get_heapptr(ctx, -1);
/* String behind 'ptr' must remain reachable! */

rc = duk_del_prop_heapptr(ctx, -3, ptr);
printf("delete obj.propertyName -> rc=%d\n", (int) rc);
```

### 参照

duk_del_prop
duk_del_prop_index
duk_del_prop_string
duk_del_prop_lstring
duk_del_prop_literal
