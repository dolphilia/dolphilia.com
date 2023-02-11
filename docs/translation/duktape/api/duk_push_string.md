## duk_push_string() 

1.0.0 string stack

### プロトタイプ

```c
const char *duk_push_string(duk_context *ctx, const char *str);
```

### スタック

| ... | -> | ... | str | (if str != NULL)
| ... | -> | ... | null | (if str == NULL)

### 要約

C 言語の文字列をスタックに格納します。文字列の長さは、strlen()に相当するもので自動的に検出される（つまり、最初の NUL 文字を探す）。インターナルされた文字列データへのポインタが返されます。操作に失敗した場合は、エラーを投げます。。

strがNULLの場合、ECMAScriptのNULLがスタックにプッシュされ、NULLが返されます。この動作は、意図的にduk_push_lstringと異なっています。

Cコードは通常、有効なCESU-8文字列のみをスタックにプッシュすべきです。無効な CESU-8/UTF-8 バイト列の中には、Symbol 値を表すような特別な用途のために予約されているものがあります。このような無効なバイト列をプッシュすると、バリュースタック上の値は C コードでは文字列のように振る舞いますが、ECMAScript コードでは Symbol として表示されます。詳しくは、シンボルを参照してください。
入力文字列が内部 NUL 文字を含む可能性がある場合、代わりに duk_push_lstring() を使用します。


### 例

```c
duk_push_string(ctx, "foo");
duk_push_string(ctx, "foo\0bar");  /* push "foo", not "foo\0bar" */
duk_push_string(ctx, "");          /* push empty string */
duk_push_string(ctx, NULL);        /* push 'null' */
```