
## duk_equals() 

1.0.0 compare

### プロトタイプ

```c
duk_bool_t duk_equals(duk_context *ctx, duk_idx_t idx1, duk_idx_t idx2);
```

### スタック

| ... | val1 | ... | val2 | ... |

### 要約

idx1 と idx2 の値が等しいかどうかを比較します。ECMAScript の Equals 演算子 (==) のセマンティクスを使用して値が等しいと見なされる場合は 1 を、そうでない場合は 0 を返す。また、どちらかのインデックスが無効な場合は0を返す。

Equals 演算子が使用する Abstract Equality Comparison Algorithm は値の強制を行うため (ToNumber() および ToPrimitive()) 、この比較には副作用があり、エラーをスローする可能性があります。duk_strict_equals() で使用できる厳密な等式比較には副作用がありません。

Duktapeカスタム型の比較アルゴリズムは、Equality (non-strict) で説明されています。


### 例

```c
if (duk_equals(ctx, -3, -7)) {
    printf("values at indices -3 and -7 are equal\n");
}
```

### 参照

duk_strict_equals