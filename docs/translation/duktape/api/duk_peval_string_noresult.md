## duk_peval_string_noresult() 

1.0.0 string protected compile

### プロトタイプ

```c
duk_int_t duk_peval_string_noresult(duk_context *ctx, const char *src);
```

### スタック

| ... | -> | ... |

### 要約

duk_peval_string() と同様であるが、(成功/エラー結果に関わらず) バリュースタックに結果を残さない。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では有用です。

### 例

```c
if (duk_peval_string_noresult(ctx, "print('testString'.toUpperCase());") != 0) {
    printf("eval failed\n");
} else {
    printf("eval successful\n");
}
```