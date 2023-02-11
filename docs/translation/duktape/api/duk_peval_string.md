## duk_peval_string() 

1.0.0 string protected compile

### プロトタイプ

```c
duk_int_t duk_peval_string(duk_context *ctx, const char *src);
```

### スタック

| ... | -> | ... | result | (if success, return value == 0)
| ... | -> | ... | err | (if failure, return value != 0)

### 要約

duk_peval() と同様ですが、eval の入力は C の文字列として与えられます。一時的なeval関数に関連するファイル名は "eval "です。

このバリエーションでは、入力ソースコードは Duktape によって インターンされないので、低メモリ環境では便利です。

### 例

```c
if (duk_peval_string(ctx, "'testString'.toUpperCase()") != 0) {
    printf("eval failed: %s\n", duk_safe_to_string(ctx, -1));
} else {
    printf("result is: %s\n", duk_get_string(ctx, -1));
}
duk_pop(ctx);
```

### 参照

duk_peval_string_noresult