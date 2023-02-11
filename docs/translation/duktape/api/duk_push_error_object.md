## duk_push_error_object() 

1.0.0 stack object error

### プロトタイプ

```c
duk_idx_t duk_push_error_object(duk_context *ctx, duk_errcode_t err_code, const char *fmt, ...);
```

### スタック

| ... | -> | ... | err |

### 要約

新しいエラーオブジェクトを作成し、それをバリュースタックにプッシュします（エラーはスローされません）。プッシュされたエラーオブジェクトの非負のインデックス（スタックの底からの相対値）を返します。

エラーオブジェクトの message プロパティには、fmt と残りの引数を使用して sprintf フォーマットの文字列が設定されます。作成されたエラーオブジェクトの内部プロトタイプは err_code に基づいて選択されます。例えば、DUK_ERR_RANGE_ERROR は、組み込みの RangeError プロトタイプが使用されるようにします。ユーザーエラーコードの有効範囲は [1,16777215] です。


### 例

```c
duk_idx_t err_idx;

err_idx = duk_push_error_object(ctx, DUK_ERR_TYPE_ERROR, "invalid argument value: %d", arg_value);
```

### 参照

duk_push_error_object_va