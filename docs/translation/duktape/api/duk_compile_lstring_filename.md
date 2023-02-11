## duk_compile_lstring_filename() 

1.0.0 string compile

### プロトタイプ

```c
void duk_compile_lstring_filename(duk_context *ctx, duk_uint_t flags, const char *src, duk_size_t len);
```

### スタック

| ... | filename -> | ... | function |

### 要約

duk_compile() と同様ですが、コンパイル入力は長さを明示した C 文字列として与えられます。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では便利です。

### 例

```c
const char *src = /* ... */;
duk_size_t len = /* ... */;

duk_push_string(ctx, "myFile.js");
duk_compile_lstring_filename(ctx, 0, src, len);
```
