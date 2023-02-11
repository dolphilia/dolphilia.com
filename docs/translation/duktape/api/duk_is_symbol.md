## duk_is_symbol() 

2.0.0 symbol string stack

### プロトタイプ

```c
duk_bool_t duk_is_symbol(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値がシンボルであれば1を、そうでなければ0を返す。

シンボル値はC APIでは文字列として見えるので、 duk_is_symbol() と duk_is_string() の両方が真となります。この動作は、Duktape 1.xの内部文字列に類似しています。duk_is_symbol() を使えば、シンボルを普通の文字列と区別することができます。内部表現については、symbols.rstを参照してください。

### 例

```c
if (duk_is_symbol(ctx, -3)) {
    /* ... */
}
```