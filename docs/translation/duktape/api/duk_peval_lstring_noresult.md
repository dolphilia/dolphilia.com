## duk_peval_lstring_noresult() 

1.0.0 string protected compile

### プロトタイプ

```c
duk_int_t duk_peval_lstring_noresult(duk_context *ctx, const char *src, duk_size_t len);
```

### スタック

| ... | -> | ... |

### 要約

duk_peval_lstring() と同様ですが、(成功/エラーの結果に関わらず) バリュースタックに結果を残しません。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では有用です。

### 例

```c
const char *src = /* ... */;
duk_size_t len = /* ... */;

if (duk_peval_lstring_noresult(ctx, src, len) != 0) {
    printf("eval failed\n");
} else {
    printf("eval successful\n");
}
```