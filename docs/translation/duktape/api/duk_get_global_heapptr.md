## duk_get_global_heapptr() 

2.3.0 property heap ptr borrowed

### プロトタイプ

```c
duk_bool_t duk_get_global_heapptr(duk_context *ctx, void *ptr);
```

### スタック

| ... | -> | ... | val | (if key exists)
| ... | -> | ... | undefined | (if key doesn't exist)

### 要約

duk_get_global_string() と同様ですが、プロパティ名は、例えば duk_get_heapptr() を使って取得した Duktape ヒープポインタとして与えられます。ptr が NULL の場合、undefined がキーとして使用されます。


### 例

```c
(void) duk_get_global_heapptr(ctx, my_ptr_ref);
```

### 参照

duk_get_global_string
duk_get_global_lstring
duk_get_global_literal