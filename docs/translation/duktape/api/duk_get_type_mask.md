## duk_get_type_mask() 

1.0.0 stack

### プロトタイプ

```c
duk_uint_t duk_get_type_mask(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxにある値の型マスクを返します。戻り値は DUK_TYPE_MASK_xxx のいずれかであり、 idx が無効な場合は DUK_TYPE_MASK_NONE です。

タイプマスクは、例えば、複数の型を一度に比較するのに便利です (この目的のためには、 duk_check_type_mask() 呼び出しがより便利です)。

シンボル値は C API では文字列として見えるので、 duk_is_symbol() と duk_is_string() の両方が真となります。この動作は、Duktape 1.xの内部文字列に類似しています。duk_is_symbol() を使えば、シンボルを普通の文字列と区別することができます。内部表現については、symbols.rstを参照してください。

### 例

```c
if (duk_get_type_mask(ctx, -3) & (DUK_TYPE_MASK_STRING |
                                  DUK_TYPE_MASK_NUMBER)) {
    printf("value is a string or a number\n");
}
```

### 参照

duk_get_type
duk_check_type_mask