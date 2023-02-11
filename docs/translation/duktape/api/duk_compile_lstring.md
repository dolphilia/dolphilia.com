## duk_compile_lstring() 

1.0.0 string compile

### プロトタイプ

```c
void duk_compile_lstring(duk_context *ctx, duk_uint_t flags, const char *src, duk_size_t len);
```

### スタック

| ... | -> | ... | function |

### 要約

duk_compile() と同様であるが、コンパイル入力は長さを明示した C 文字列として与えられます。この関数に関連するファイル名は "input" です。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では便利です。

### 例

```c
const char *src = /* ... */;
duk_size_t len = /* ... */;

duk_compile_lstring(ctx, 0, src, len);
```
