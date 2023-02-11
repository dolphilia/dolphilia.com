## duk_pcompile_string() 

1.0.0 string protected compile

### プロトタイプ

```c
duk_int_t duk_pcompile_string(duk_context *ctx, duk_uint_t flags, const char *src);
```

### スタック

| ... | -> | ... | function | (if success, return value == 0)
| ... | -> | ... | err | (if failure, return value != 0)

### 要約

duk_pcompile() と同様であるが、コンパイル時の入力は C の文字列として与えられます。この関数に関連するファイル名は "input" です。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では有用です。

### 例

```c
if (duk_pcompile_string(ctx, 0, "print('program code'); syntax error here=") != 0) {
    printf("compile failed: %s\n", duk_safe_to_string(ctx, -1));
} else {
    duk_call(ctx, 0);      /* [ func ] -> [ result ] */
    printf("program result: %s\n", duk_safe_to_string(ctx, -1));
}
duk_pop(ctx);
```