## duk_type_error() 

2.0.0 error

### プロトタイプ

```c
duk_ret_t duk_type_error(duk_context *ctx, const char *fmt, ...);
```

### スタック

| ... | -> | ... | err |

### 要約

エラーコード DUK_ERR_TYPE_ERROR を持つ duk_error() に相当する便利な API コールです。


### 例

```c
return duk_type_error(ctx, "my error: %d", (int) argval);
```

### 参照

duk_error