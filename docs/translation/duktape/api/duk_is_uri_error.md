## duk_is_uri_error() 

1.4.0 stack error

### プロトタイプ

```c
duk_bool_t duk_is_uri_error(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値が URIError を継承している場合は 1 を、そうでない場合は 0 を返す。 idx が無効な場合も 0 を返す。 これは、 duk_get_error_code() == DUK_ERR_URI_ERROR を使用する際の便宜的な呼び出しです。


### 例

```c
if (duk_is_uri_error(ctx, -3)) {
    /* ... */
}
```