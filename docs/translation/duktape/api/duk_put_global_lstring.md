## duk_put_global_lstring() 

2.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_put_global_lstring(duk_context *ctx, const char *key, duk_size_t key_len);
```

### スタック

| ... | val | -> | ... |

### 要約

duk_put_global_string() と同様ですが、キーは長さを明示した文字列として与えられます。


### 例

```c
duk_push_string(ctx, "1.2.3");
(void) duk_put_global_lstring(ctx, "internal" "\x00" "nul", 12);
```

### 参照

duk_put_global_string
duk_put_global_literal
duk_put_global_heapptr