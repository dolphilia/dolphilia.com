## duk_eval_noresult() 

1.0.0 compile

### プロトタイプ

```c
void duk_eval_noresult(duk_context *ctx);
```

### スタック

| ... | source | -> | ... |

### 要約

duk_eval() と同様であるが、バリュースタックに結果を残さない。


### 例

```c
duk_push_string(ctx, "print('Hello world!');");
duk_eval_noresult(ctx);
```

### 参照

duk_eval_string_noresult
duk_eval_lstring_noresult