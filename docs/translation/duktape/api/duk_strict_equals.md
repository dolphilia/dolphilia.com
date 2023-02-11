## duk_strict_equals() 

1.0.0 compare

### プロトタイプ

```c
duk_bool_t duk_strict_equals(duk_context *ctx, duk_idx_t idx1, duk_idx_t idx2);
```

### スタック

| ... | val1 | ... | val2 | ... |

### 要約

idx1 と idx2 の値が等しいかどうかを比較します。ECMAScript Strict Equals operator (===)のセマンティクスにより、値が等しいとみなされた場合は1を、そうでない場合は0を返す。また、どちらかのインデックスが無効な場合は0を返す。

Strict Equals 演算子が使用する Strict Equality Comparison Algorithm は値の強制を行わないので、比較に副作用はなく、エラーを発生させることもありません。

Duktapeカスタム型の比較アルゴリズムについては、厳密な等価性で説明されています。


### 例

```c
if (duk_strict_equals(ctx, -3, -7)) {
    printf("values at indices -3 and -7 are strictly equal\n");
}
```

### 参照

duk_equals