## duk_get_string() 

1.0.0 string stack

### プロトタイプ

```c
const char *duk_get_string(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx にある文字列の文字データポインタを、値を変更したり強制したりすることなく取得します。読み取り専用、NUL終端の文字列データへの非NULLポインタを返す。値が文字列でない場合、またはインデックスが無効な場合はNULLを返す。

文字列のバイト長を明示的に取得するには（文字列にNUL文字が埋め込まれている場合に有効）、 duk_get_lstring() を使用します。

これは、バッファデータポインタの扱い方とは異なります(技術的な理由による)。
シンボル値は C API では文字列として見えるので、 duk_is_symbol() と duk_is_string() の両方が真となります。この動作は、Duktape 1.xの内部文字列と同様です。duk_is_symbol()を使えば、シンボルを普通の文字列と区別することができます。内部表現については、symbols.rstを参照してください。

### 例

```c
const char *str;

str = duk_get_string(ctx, -3);
if (str) {
    printf("value is a string: %s\n", str);
}
```

### 参照

duk_get_lstring
duk_get_string_default
duk_get_lstring_default