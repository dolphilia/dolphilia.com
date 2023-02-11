## duk_set_finalizer() 

1.0.0 object finalizer

### プロトタイプ

```c
void duk_set_finalizer(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | finalizer | -> | ... | val | ... |

### 要約

idx の値のファイナライザをスタックトップにある値に設定します。対象がオブジェクトでない場合は、エラーを投げます。。ファイナライザの値は任意であり、関数以外の値は、ファイナライザが設定されていないものとして扱われます。オブジェクトからファイナライザを削除するには、undefinedを設定します。

Proxyオブジェクトのファイナライザは現在未対応です。オブジェクトが拡張不可能な場合、ファイナライザを設定することはできませんので、オブジェクトを封印/凍結する前にファイナライザを設定してください。

### 例

```c
duk_ret_t my_finalizer(duk_context *ctx) {
    /* Object being finalized is at stack index 0. */
    printf("object being finalized\n");
    return 0;
}

/* Create an object whose finalizer is my_finalizer(). */
duk_push_object(ctx);
duk_push_c_function(ctx, my_finalizer, 1 /*nargs*/);
duk_set_finalizer(ctx, -2);
```

### 参照

duk_get_finalizer