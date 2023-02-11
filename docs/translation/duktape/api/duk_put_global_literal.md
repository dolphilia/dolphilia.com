## duk_put_global_literal() 

2.3.0 property literal

### プロトタイプ

```c
duk_bool_t duk_put_global_literal(duk_context *ctx, const char *key_literal);
```

### スタック

| ... | val | -> | ... |

### 要約

duk_put_global_string() と同様ですが、プロパティ名は文字列リテラルとして与えられます (duk_push_literal() を参照してください)。


### 例

```c
duk_push_string(ctx, "1.2.3");
(void) duk_put_global_literal(ctx, "my_app_version");
```

### 参照

duk_put_global_string
duk_put_global_lstring
duk_put_global_heapptr