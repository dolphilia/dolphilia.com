## duk_put_global_heapptr() 

2.3.0 property heap ptr borrowed

### プロトタイプ

```c
duk_bool_t duk_put_global_heapptr(duk_context *ctx, void *ptr);
```

### スタック

| ... | val | -> | ... |

### 要約

duk_put_global_string() と同様ですが、プロパティ名は、例えば duk_get_heapptr() を用いて取得した Duktape ヒープポインタとして与えられます。ptr が NULL の場合、undefined がキーとして使用されます。


### 例

```c
duk_push_string(ctx, "1.2.3");
(void) duk_put_global_heapptr(ctx, my_ptr_ref);
```

### 参照

duk_put_global_string
duk_put_global_lstring
duk_put_global_literal