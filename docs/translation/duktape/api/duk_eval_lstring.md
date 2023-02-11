## duk_eval_lstring() 

1.0.0 string compile

### プロトタイプ

```c
void duk_eval_lstring(duk_context *ctx, const char *src, duk_size_t len);
```

### スタック

| ... | -> | ... | result |

### 要約

duk_eval() と同様ですが、eval の入力は、長さを明示した C 文字列として与えられます。

この変種では、入力ソースコードは Duktape によってインターンされないので、 低メモリ環境では便利です。

### 例

```c
const char *src = /* ... */;
duk_size_t len = /* ... */;

duk_eval_lstring(ctx, src, len);
printf("result is: %s\n", duk_get_string(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_eval_lstring_noresult