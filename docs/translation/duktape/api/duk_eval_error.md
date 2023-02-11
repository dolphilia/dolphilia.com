## duk_eval_error() 

2.0.0 error

### プロトタイプ

```c
duk_ret_t duk_eval_error(duk_context *ctx, const char *fmt, ...);
```

### スタック

| ... | -> | ... | err |

### 要約

エラーコード DUK_ERR_EVAL_ERROR を持つ duk_error() と同等の便宜的な API 呼び出し。


### 例

```c
return duk_eval_error(ctx, "my error: %d", (int) argval);
```

### 参照

duk_error