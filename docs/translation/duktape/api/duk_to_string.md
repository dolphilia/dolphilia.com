## duk_to_string() 

1.0.0 string stack

### プロトタイプ

```c
const char *duk_to_string(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | ToString(val) | ... |

### 要約

idx の値を ECMAScript の ToString() で強制された値で置き換えます。読み取り専用で NUL 終端の文字列データへの非 NULL ポインタを返します。idx が無効な場合、エラーを投げます。。

カスタムの型強制については、型変換とテストに記載されています。

Symbol値に対するToString()強制はTypeErrorを発生させます。
Duktape 2.xでは、プレーン・バッファはUint8Arrayオブジェクトを模倣しており、通常ToString()は "[object Uint8Array]" に強制されます。バッファやバッファ・オブジェクトの内容を文字列に変換するには、 duk_buffer_to_string() (Duktape 2.0 の新機能) を使ってください。

### 例

```c
printf("coerced string: %s\n", duk_to_string(ctx, -3));
```

### 参照

duk_safe_to_string
duk_buffer_to_string