## duk_to_boolean() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_to_boolean(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | ToBoolean(val) | ... |

### 要約

idx の値を ECMAScript の ToBoolean() で強制された値で置き換えます。強制の結果が真であれば1を、そうでなければ0を返します。idx が無効な場合、エラーを投げます。。

カスタム型強制は型変換とテストに記載されています。


### 例

```c
if (duk_to_boolean(ctx, -3)) {
    printf("coerced value is true\n");
}
```