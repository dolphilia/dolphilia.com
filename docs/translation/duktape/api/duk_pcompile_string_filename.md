## duk_pcompile_string_filename() 

1.0.0 string protected compile

### プロトタイプ

```c
duk_int_t duk_pcompile_string_filename(duk_context *ctx, duk_uint_t flags, const char *src);
```

### スタック

| ... | filename | -> | ... | function | (if success, return value == 0)
| ... | filename | -> | ... | err | (if failure, return value != 0)

### 要約

duk_pcompile() と同様ですが、コンパイル入力は C の文字列として与えられます。

この変種では、入力ソースコードは Duktape によって インターンされないので、低メモリ環境では便利です。

### 例

```c
duk_push_string(ctx, "myFile.js");
if (duk_pcompile_string_filename(ctx, 0, "print('program code'); syntax error here=") != 0) {
    printf("compile failed: %s\n", duk_safe_to_string(ctx, -1));
} else {
    duk_call(ctx, 0);      /* [ func ] -> [ result ] */
    printf("program result: %s\n", duk_safe_to_string(ctx, -1));
}
duk_pop(ctx);
```