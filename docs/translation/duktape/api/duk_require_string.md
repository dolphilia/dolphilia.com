## duk_require_string() 

1.0.0 string stack

### プロトタイプ

```c
const char *duk_require_string(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

duk_get_string() と同様であるが、idx の値が文字列でない場合、またはインデックスが無効な場合にエラーを投げます。。

これは、バッファデータポインタの扱い方とは (技術的な理由により) 異なります。
シンボル値は C API では文字列として見えるので、 duk_is_symbol() と duk_is_string() の両方が真となります。この動作は、Duktape 1.xの内部文字列と同様です。duk_is_symbol() を使えば、シンボルを普通の文字列と区別することができます。内部表現については、symbols.rstを参照してください。

### 例

```c
const char *buf;

buf = duk_require_string(ctx, -3);
printf("value is a string: %s\n", buf);
```

### 参照

duk_require_lstring