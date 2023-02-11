## duk_to_number() 

1.0.0 stack

### プロトタイプ

```c
duk_double_t duk_to_number(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | ToNumber(val) | ... |

### 要約

idx の値を ECMAScript の ToNumber() で強制された値で置き換えます。強制された値を返す。idx が無効な場合、エラーを投げます。。

カスタム型強制は型変換とテストに記載されています。


### 例

```c
printf("coerced number: %lf\n", (double) duk_to_number(ctx, -3));
```