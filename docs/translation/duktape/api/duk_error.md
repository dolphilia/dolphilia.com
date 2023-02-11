## duk_error() 

1.0.0 error

### プロトタイプ

```c
duk_ret_t duk_error(duk_context *ctx, duk_errcode_t err_code, const char *fmt, ...);
```

### スタック

| ... | -> | ... | err |

### 要約

新しいエラーオブジェクトをスタックにプッシュし、それをスローします。この呼び出しは決して戻りません。

エラーオブジェクトのメッセージプロパティには、fmt と残りの引数を用いて sprintf フォーマットの文字列が設定されます。作成されたエラーオブジェクトの内部プロトタイプは err_code に基づいて選択されます。例えば、DUK_ERR_RANGE_ERROR は、組み込みの RangeError プロトタイプが使用されるようにします。ユーザーエラーコードの有効範囲は [1,16777215] です。

Error オブジェクトを投げずにスタックにプッシュするには、 duk_push_error_object() を使用します。

この関数は決して戻ってきませんが、プロトタイプは、以下のようなコードを可能にする戻り値を記述しています。

```c
if (argvalue < 0) {
    return duk_error(ctx, DUK_ERR_TYPE_ERROR, "invalid argument value: %d", (int) argvalue);
}
```

戻り値が無視される場合、コンパイル時の警告を避けるため、voidにキャストします。

```c
if (argvalue < 0) {
    (void) duk_error(ctx, DUK_ERR_TYPE_ERROR, "invalid argument value: %d", (int) argvalue);
}
```

### 例

```c
(void) duk_error(ctx, DUK_ERR_RANGE_ERROR, "argument out of range: %d", (int) argval);
```

### 参照

duk_error_va
duk_throw
duk_push_error_object
duk_generic_error
duk_eval_error
duk_range_error
duk_reference_error
duk_syntax_error
duk_type_error
duk_uri_error