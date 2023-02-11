## duk_pcompile_lstring() 

1.0.0 string protected compile

### プロトタイプ

```c
duk_int_t duk_pcompile_lstring(duk_context *ctx, duk_uint_t flags, const char *src, duk_size_t len);
```

### スタック

| ... | -> | ... | function | (if success, return value == 0)
| ... | -> | ... | err | (if failure, return value != 0)

### 要約

duk_pcompile() と同様であるが、コンパイル入力は長さを明示した C 文字列として与えられます。この関数に関連するファイル名は "input" です。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では有用です。

### 例

```c
const char *src = /* ... */;
duk_size_t len = /* ... */;

if (duk_pcompile_lstring(ctx, 0, src, len) != 0) {
    printf("compile failed: %s\n", duk_safe_to_string(ctx, -1));
} else {
    duk_call(ctx, 0);      /* [ func ] -> [ result ] */
    printf("program result: %s\n", duk_safe_to_string(ctx, -1));
}
duk_pop(ctx);
```