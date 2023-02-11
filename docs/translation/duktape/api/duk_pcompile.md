## duk_pcompile() 

1.0.0 protected compile

### プロトタイプ

```c
duk_int_t duk_pcompile(duk_context *ctx, duk_uint_t flags);
```

### スタック

| ... | source | filename | -> | ... | function | (if success, return value == 0)
| ... | source | filename | -> | ... | err | (if failure, return value != 0)

### 要約

duk_compile() と同様であるが、コンパイルに関連するエラー (ソースのシンタックスエラーなど) を捕捉します。0 の返り値は成功を示し、コンパイルされた関数はスタックトップに残されます。0 以外の返り値はエラーを示し、そのエラーはスタックトップに残されます。

スタックトップが低すぎる (2 より小さい) 場合は、エラーがスローされます。


### 例

```c
duk_push_string(ctx, "print('program'); syntax error here=");
duk_push_string(ctx, "hello-with-syntax-error");
if (duk_pcompile(ctx, 0) != 0) {
    printf("compile failed: %s\n", duk_safe_to_string(ctx, -1));
} else {
    duk_call(ctx, 0);      /* [ func ] -> [ result ] */
    printf("program result: %s\n", duk_safe_to_string(ctx, -1));
}
duk_pop(ctx);
```

### 参照

duk_compile
duk_pcompile_string
duk_pcompile_string_filename
duk_pcompile_lstring
duk_pcompile_lstring_filename