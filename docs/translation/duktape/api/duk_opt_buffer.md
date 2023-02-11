## duk_opt_buffer() 

2.1.0 stack buffer

### プロトタイプ

```c
void *duk_opt_buffer(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size, void *def_ptr, duk_size_t def_len);
```

### スタック

| ... | val | ... |

### 要約

idxにある(プレーン)バッファ値のデータポインタを，値を変更したり強制したりすることなく取得します。値が0以外のサイズの有効なバッファである場合、非NULLポインタを返します。サイズが0のバッファの場合、NULLまたは非NULLポインタを返すことがあります。out_size が非NULLの場合、バッファのサイズは *out_size に書き込まれます。値が未定義またはインデックスが無効な場合，def_ptr のデフォルト値が返され， def_len のデフォルト長が *out_size に書き込まれる (out_size が nonNULL の場合)．その他の場合(NULLおよび型が一致しない場合)は，エラーを投げます。。

duk_opt_xxx() と duk_get_xxx_default() に与えられたデフォルトポインタ値は、Duktape によって追跡されない。例えば、 duk_opt_string() は、デフォルト文字列引数のコピーを作らない。呼び出し側は、デフォルト・ポインタがその意図された用途に有効であり続けることを保証する責任があります。例えば、 duk_opt_string(ctx, 3, "localhost") は、文字列定数が常に有効であるため、問題なく動作しますが、引数が libc で割り当てられた文字列の場合、呼び出し側は duk_opt_string() から返されたポインタが libc で割り当てられた文字列の寿命以上に使用されないようにしなければなりません。
サイズゼロのバッファと非バッファを、戻り値だけから区別する信頼できる方法はありません。非バッファの場合、サイズ0のNULLが返されます。サイズ0のバッファの場合、同じ値が返されるかもしれません（NULLでないポインタが返される可能性もありますが）。duk_is_buffer() や duk_is_buffer_data() 、あるいはバッファやバッファ・オブジェクトの型チェックを行う際に使用してください。

### 例

```c
void *ptr;
duk_size_t sz;
char buf[256];

/* Use a buffer given at index 2, or default to 'buf'. */
ptr = duk_opt_buffer(ctx, 2, &sz, (void *) buf, sizeof(buf));
printf("buf=%p, size=%lu\n", ptr, (unsigned long) sz);
```

### 参照

duk_opt_buffer_data