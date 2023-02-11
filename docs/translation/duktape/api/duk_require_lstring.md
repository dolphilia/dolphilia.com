## duk_require_lstring() 

1.0.0 string stack

### プロトタイプ

```c
const char *duk_require_lstring(duk_context *ctx, duk_idx_t idx, duk_size_t *out_len);
```

### スタック

| ... | val | ... |

### 要約

duk_get_lstring() と同様であるが、idx の値が文字列でない場合、またはインデックスが無効な場合にエラーを投げます。。

これは、バッファデータポインタの扱い方とは (技術的な理由により) 異なります。

### 例

```c
const char *buf;
duk_size_t len;

buf = duk_require_lstring(ctx, -3, &len);
printf("value is a string, %lu bytes\n", (unsigned long) len);
```

### 参照

duk_require_string