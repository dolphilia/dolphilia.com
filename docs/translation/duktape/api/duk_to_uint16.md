## duk_to_uint16() 

1.0.0 stack

### プロトタイプ

```c
duk_uint16_t duk_to_uint16(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | ToUint16(val) | ... |

### 要約

idxの値をECMAScriptのToUint16()で強制された値で置き換えます。強制された値を返します。idxが無効な場合、エラーを投げます。。

カスタム型強制は型変換とテストに記載されています。


### 例

```c
printf("ToUint16(): %u\n", (unsigned int) duk_to_uint16(ctx, -3));
```