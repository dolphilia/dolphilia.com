## duk_is_syntax_error() 

1.4.0 stack error

### プロトタイプ

```c
duk_bool_t duk_is_syntax_error(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx にある値が SyntaxError を継承している場合は 1 を、そうでない場合は 0 を返します。 idx が無効な場合も 0 を返す。 これは、duk_get_error_code() == DUK_ERR_SYNTAX_ERROR を使用するための便利なコールです。


### 例

```c
if (duk_is_syntax_error(ctx, -3)) {
    /* ... */
}
```