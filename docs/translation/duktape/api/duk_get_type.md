## duk_get_type() 

1.0.0 stack

### プロトタイプ

```c
duk_int_t duk_get_type(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx にある値の型を返します。戻り値は DUK_TYPE_xxx のいずれか、あるいは idx が無効な場合は DUK_TYPE_NONE となります。

シンボル値は、C API では文字列として見えるので、 duk_is_symbol() と duk_is_string() の両方が真となります。この動作は、Duktape 1.xの内部文字列と同様です。duk_is_symbol() を使えば、シンボルを普通の文字列と区別することができます。内部表現については、symbols.rstを参照してください。

### 例

```c
if (duk_get_type(ctx, -3) == DUK_TYPE_NUMBER) {
    printf("value is a number\n");
}
```

### 参照

duk_check_type
duk_get_type_mask
duk_check_type_mask