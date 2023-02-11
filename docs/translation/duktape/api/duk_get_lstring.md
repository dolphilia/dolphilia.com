## duk_get_lstring() 

1.0.0 string stack

### プロトタイプ

```c
const char *duk_get_lstring(duk_context *ctx, duk_idx_t idx, duk_size_t *out_len);
```

### スタック

| ... | val | ... |

### 要約

idx にある文字列の文字データポインタと長さを、値を変更したり強制したりすることなく取得します。読み取り専用で NUL 終端の文字列データへの非 NULL ポインタを返し、文字列のバイト長を *out_len に書き込む (out_len が非 NULL の場合)。値が文字列でない場合、またはインデックスが無効な場合は、NULL を返し、*out_len に 0 を書き込む (out_len が NULL でない場合)。

文字列の文字数（バイト数ではなく）を取得するには、 duk_get_length() を使用します。

これは、バッファデータポインタの扱い方とは異なります(技術的な理由による)。

### 例

```c
const char *str;
duk_size_t len;

str = duk_get_lstring(ctx, -3, &len);
if (str) {
    printf("value is a string, %lu bytes\n", (unsigned long) len);
}
```

### 参照

duk_get_string
duk_get_lstring_default
duk_get_string_default