## duk_to_uint32() 

1.0.0 stack

### プロトタイプ

```c
duk_uint32_t duk_to_uint32(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | ToUint32(val) | ... |

### 要約

idxの値をECMAScriptのToUint32()で強制された値で置き換えます。強制された値を返します。idxが無効な場合、エラーを投げます。。

カスタム型強制は型変換とテストに記載されています。


### 例

```c
printf("ToUint32(): %lu\n", (unsigned long) duk_to_uint32(ctx, -3));
```