## duk_pcompile_lstring_filename() 

1.0.0 string protected compile

### プロトタイプ

```c
duk_int_t duk_pcompile_lstring_filename(duk_context *ctx, duk_uint_t flags, const char *src, duk_size_t len);
```

### スタック

| ... | filename | -> | ... | function | (if success, return value == 0)
| ... | filename | -> | ... | err | (if failure, return value != 0)

### 要約

duk_pcompile() と同様ですが、コンパイル入力は、長さを明示した C 文字列として与えられます。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では有用です。

### 例

```c
const char *src = /* ... */;
duk_size_t len = /* ... */;

duk_push_string(ctx, "myFile.js");
if (duk_pcompile_lstring_filename(ctx, 0, src, len) != 0) {
    printf("compile failed: %s\n", duk_safe_to_string(ctx, -1));
} else {
    duk_call(ctx, 0);      /* [ func ] -> [ result ] */
    printf("program result: %s\n", duk_safe_to_string(ctx, -1));
}
duk_pop(ctx);
```