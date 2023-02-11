## duk_eval_lstring_noresult() 

1.0.0 string compile

### プロトタイプ

```c
void duk_eval_lstring_noresult(duk_context *ctx, const char *src, duk_size_t len);
```

### スタック

| ... | -> | ... |

### 要約

duk_eval_lstring() と同様だが、バリュースタックに結果を残さない。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では有用です。

### 例

```c
const char *src = /* ... */;
duk_size_t len = /* ... */;

duk_eval_lstring_noresult(ctx, src, len);
```