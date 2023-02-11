## duk_get_error_code() 

1.1.0 stack error

### プロトタイプ

```c
duk_errcode_t duk_get_error_code(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値を、その値がどの Error サブクラスを継承しているかに基づいてエラーコード DUK_ERR_xxx にマップします。たとえば、スタックトップの値が ReferenceError を継承したユーザー定義エラーである場合、返り値は DUK_ERR_REFERENCE_ERROR となります。値が Error を継承しているが、標準のサブクラス (EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError) のいずれかを継承していない場合、DUK_ERR_ERROR が返されます。値がオブジェクトでない場合、Error を継承しない場合、または idx が無効な場合、0 (= DUK_ERR_NONE) を返します。


### 例

```c
if (duk_get_error_code(ctx, -3) == DUK_ERR_URI_ERROR) {
    printf("Invalid URI\n");
}
```