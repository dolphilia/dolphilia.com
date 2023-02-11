## duk_eval_string() 

1.0.0 string compile

### プロトタイプ

```c
void duk_eval_string(duk_context *ctx, const char *src);
```

### スタック

| ... | -> | ... | result |

### 要約

duk_eval() と同様ですが、eval の入力は C の文字列として与えられます。

この変種では、入力ソースコードは Duktape によってインター ネットされないので、低メモリ環境では有用です。

### 例

```c
duk_eval_string(ctx, "'testString'.toUpperCase()");
printf("result is: %s\n", duk_get_string(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_eval_string_noresult