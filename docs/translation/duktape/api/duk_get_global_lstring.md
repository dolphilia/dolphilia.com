## duk_get_global_lstring() 

2.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_get_global_lstring(duk_context *ctx, const char *key, duk_size_t key_len);
```

### スタック

| ... | -> | ... | val | (if key exists)
| ... | -> | ... | undefined | (if key doesn't exist)

### 要約

duk_get_global_string() と同様ですが、キーは長さを明示した文字列として与えられます。


### 例

```c
(void) duk_get_global_lstring(ctx, "internal" "\x00" "nul", 12);
```

### 参照

duk_get_global_string
duk_get_global_literal
duk_get_global_heapptr