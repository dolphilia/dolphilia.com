## duk_peval_noresult() 

1.0.0 protected compile

### プロトタイプ

```c
duk_int_t duk_peval_noresult(duk_context *ctx);
```

### スタック

| ... | source | -> | ... |

### 要約

Like duk_peval() but leaves no result on the value stack (regardless of success/error result).


### 例

```c
duk_push_string(ctx, "print('Hello world!'); syntax error here=");
if (duk_peval_noresult(ctx) != 0) {
    printf("eval failed\n");
} else {
    printf("eval successful\n");
}
```

### 参照

duk_peval_string_noresult
duk_peval_lstring_noresult