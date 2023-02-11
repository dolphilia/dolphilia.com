## duk_compile_string() 

1.0.0 string compile

### プロトタイプ

```c
void duk_compile_string(duk_context *ctx, duk_uint_t flags, const char *src);
```

### スタック

| ... | -> | ... | function |

### 要約

duk_compile() と同様であるが、コンパイル入力は C の文字列として与えられますこの関数に関連するファイル名は "input" です。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では便利です。

### 例

```c
duk_compile_string(ctx, 0, "print('program code');");
```