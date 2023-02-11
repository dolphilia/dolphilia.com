## duk_put_global_string() 

1.0.0 string property

### プロトタイプ

```c
duk_bool_t duk_put_global_string(duk_context *ctx, const char *key);
```

### スタック

| ... | val | -> | ... |

### 要約

key という名前のプロパティをグローバルオブジェクトに配置します。戻り値は duk_put_prop() と同様に動作します。これは、それと同等のことをする便宜的な関数です。

```c
duk_bool_t ret;

duk_push_global_object(ctx);
duk_insert(ctx, -2);
ret = duk_put_prop_string(ctx, -2, key);
duk_pop(ctx);
/* 'ret' would be the return value from duk_put_global_string() */
```

### 例

```c
duk_push_string(ctx, "1.2.3");
(void) duk_put_global_string(ctx, "my_app_version");
```

### 参照

duk_put_global_lstring
duk_put_global_literal
duk_put_global_heapptr