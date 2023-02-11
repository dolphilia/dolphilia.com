## duk_to_int32() 

1.0.0 stack

### プロトタイプ

```c
duk_int32_t duk_to_int32(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | ToInt32(val) | ... |

### 要約

idx の値を ECMAScript の ToInt32() で強制された値で置き換えます。強制された値を返す。idx が無効な場合、エラーを投げます。。

カスタム型強制は型変換とテストに記載されています。


### 例

```c
printf("ToInt32(): %ld\n", (long) duk_to_int32(ctx, -3));
```