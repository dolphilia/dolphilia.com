## duk_instanceof() 

1.3.0 compare

### プロトタイプ

```c
duk_bool_t duk_instanceof(duk_context *ctx, duk_idx_t idx1, duk_idx_t idx2);
```

### スタック

| ... | val1 | ... | val2 | ... |

### 要約

ECMAScript の instanceof 演算子を使用して idx1 と idx2 の値を比較します。val1がval2をインスタンス化した場合は1を、そうでない場合は0を返します。どちらかのインデックスが無効な場合はエラーを投げます。。instanceof自体も引数の型が無効な場合はエラーを投げます。。

無効なインデックスに対してエラーを投げます。動作は、例えば duk_equals() の動作とは異なり、instanceof の厳密さと一致します。例えば、rval (idx2) が呼び出し可能なオブジェクトでない場合、instanceof は TypeError を投げます。。インデックスが無効な場合にエラーを投げます。のは、instanceofの厳密性と一致します。

### 例

```c
duk_idx_t idx_val;

duk_get_global_string(ctx, "Error");

if (duk_instanceof(ctx, idx_val, -1)) {
    printf("value at idx_val is an instanceof Error\n");
}
```