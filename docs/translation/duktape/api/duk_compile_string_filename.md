## duk_compile_string_filename() 

1.0.0 string compile

### プロトタイプ

```c
void duk_compile_string_filename(duk_context *ctx, duk_uint_t flags, const char *src);
```

### スタック

| ... | filename -> | ... | function |

### 要約

duk_compile() と同様であるが、コンパイル入力は C の文字列として与えられます。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では有用です。

### 例

```c
duk_push_string(ctx, "myFile.js");
duk_compile_string_filename(ctx, 0, "print('program code');");
```
