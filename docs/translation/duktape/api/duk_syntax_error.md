## duk_syntax_error() 

2.0.0 error

### プロトタイプ

```c
duk_ret_t duk_syntax_error(duk_context *ctx, const char *fmt, ...);
```

### スタック

| ... | -> | ... | err |

### 要約

エラーコード DUK_ERR_SYNTAX_ERROR を持つ duk_error() に相当する便利な API コールです。


### 例

```c
return duk_syntax_error(ctx, "my error: %d", (int) argval);
```

### 参照

duk_error