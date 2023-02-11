## duk_get_buffer_data_default() 

2.1.0 stack buffer

### プロトタイプ

```c
void *duk_get_buffer_data_default(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size, void *def_ptr, duk_size_t def_len);
```

### スタック

| ... | val | ... |

### 要約

duk_get_buffer_data() と同様ですが、明示的にデフォルト値が設定されており、値がプレーンバッファ、バッファオブジェクトでない場合、またはインデックスが無効な場合に返されます。

duk_opt_xxx() と duk_get_xxx_default() に与えられたデフォルト・ポインタ値は、Duktape によって追跡されません、例えば、 duk_opt_string() は、デフォルト文字列引数のコピーを作成しません。呼び出し側は、デフォルト・ポインタがその意図された用途に有効であり続けることを保証する責任があります。例えば、 duk_opt_string(ctx, 3, "localhost") は、文字列定数が常に有効であるため、問題なく動作しますが、引数が libc に割り当てられた文字列である場合、呼び出し側は、 duk_opt_string() が返すポインタが libc に割り当てられた文字列の寿命を越えて使用されないようにしなければなりません。

### 例

```c
void *ptr;
duk_size_t sz;
char buf[256];

/* Use a buffer or buffer object given at index 2, or default to 'buf'. */
ptr = duk_get_buffer_data_default(ctx, 2, &sz, (void *) buf, sizeof(buf));
```

### 参照

duk_get_buffer_data
duk_get_buffer_default