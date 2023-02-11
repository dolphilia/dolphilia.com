## duk_eval_string_noresult() 

1.0.0 string compile

### プロトタイプ

```c
void duk_eval_string_noresult(duk_context *ctx, const char *src);
```

### スタック

| ... | -> | ... |

### 要約

duk_eval_string() と同様であるが、バリュースタックに結果を残さない。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では有用です。

### 例

```c
duk_eval_string_noresult(ctx, "print('testString'.toUpperCase())");
```