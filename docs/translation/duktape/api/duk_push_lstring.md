## duk_push_lstring() 

1.0.0 string stack

### プロトタイプ

```c
const char *duk_push_lstring(duk_context *ctx, const char *str, duk_size_t len);
```

### スタック

| ... | -> | ... | str |

### 要約

明示的な長さの文字列をスタックにプッシュします。文字列は、内部の NUL 文字を含む任意のデータを含むことができます。内部文字列データへのポインタが返されます。操作に失敗した場合は，エラーを投げます。。

str が NULL の場合、len に関係なく空の文字列がスタックに押され、空の文字列への非 NULL ポインタが返されます。返されたポインタは再参照可能であり、NUL終端文字が保証されます。この動作は、意図的に duk_push_string と異なっています。

Cコードは通常、有効なCESU-8文字列のみをスタックにプッシュすべきです。


### 例

```c
const char tmp1[5] = { 'f', '\0', '\0', 'x', 'y' };
const char tmp2[1] = { '\0' };

duk_push_lstring(ctx, tmp1, 5);   /* push the string "f\x00\x00xy" */
duk_push_lstring(ctx, tmp2, 1);   /* push the string "\x00" */
duk_push_lstring(ctx, tmp2, 0);   /* push empty string */
duk_push_lstring(ctx, NULL, 0);   /* push empty string */
duk_push_lstring(ctx, NULL, 10);  /* push empty string */
```