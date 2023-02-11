## duk_peval() 

1.0.0 protected compile

### プロトタイプ

```c
duk_int_t duk_peval(duk_context *ctx);
```

### スタック

| ... | source | -> | ... | result | (if success, return value == 0)
| ... | source | -> | ... | err | (if failure, return value != 0)

### 要約

duk_eval() と同様ですが、コンパイルに関連するエラー (ソースのシンタックスエラーなど) を捕捉します。0 の返り値は成功を表し、eval の結果はスタックトップに残されます。0 以外の返り値はエラーを示し、そのエラーはスタックトップに残されます。

スタックトップが低すぎる (1より小さい) 場合は、エラーがスローされます。


### 例

```c
duk_push_string(ctx, "print('Hello world!'); syntax error here=");
if (duk_peval(ctx) != 0) {
    printf("eval failed: %s\n", duk_safe_to_string(ctx, -1));
} else {
    printf("result is: %s\n", duk_safe_to_string(ctx, -1));
}
duk_pop(ctx);
```

### 参照

duk_eval
duk_peval_noresult
duk_peval_string
duk_peval_string_noresult
duk_peval_lstring
duk_peval_lstring_noresult