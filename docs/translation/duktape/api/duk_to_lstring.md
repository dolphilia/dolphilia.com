## duk_to_lstring() 

1.0.0 string stack

### プロトタイプ

```c
const char *duk_to_lstring(duk_context *ctx, duk_idx_t idx, duk_size_t *out_len);
```

### スタック

| ... | val | ... | -> | ... | ToString(val) | ... |

### 要約

idx の値を ECMAScript の ToString() で強制された値で置き換えます。読み取り専用で NUL 終端の文字列データへの非 NULL ポインタを返し、文字列のバイト長を *out_len に書き込む (out_len が非 NULL の場合)。idx が無効な場合、エラーを投げます。。

カスタムの型強制については、型変換とテストに記載されています。


### 例

```c
const char *ptr;
duk_size_t sz;

ptr = duk_to_lstring(ctx, -3, &sz);
printf("coerced string: %s (length %lu)\n", ptr, (unsigned long) sz);
```

### 参照

duk_safe_to_lstring