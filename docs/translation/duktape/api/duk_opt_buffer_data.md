## duk_opt_buffer_data() 

2.1.0 stack buffer object buffer

### プロトタイプ

```c
void *duk_opt_buffer_data(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size, void *def_ptr, duk_size_t def_len);
```

### スタック

| ... | val | ... |

### 要約

idxにあるプレーンバッファまたはバッファオブジェクト(ArrayBuffer, Node.js Buffer, DataView, TypedArray view)の値のデータポインタを、値を変更したり強制したりすることなく取得します。値がゼロでないサイズの有効なバッファである場合、非NULLポインタを返します。サイズが0のバッファの場合、NULLまたは非NULLポインタを返すことがあります。out_size が非NULLの場合、バッファのサイズは *out_size に書き込まれます。値が未定義またはインデックスが無効な場合，def_ptr のデフォルト値が返され， def_len のデフォルト長が *out_size に書き込まれる (out_size が nonNULL の場合)．それ以外の場合(NULLや型が一致しない場合)はエラーを投げます。。また、値がバッファオブジェクトで、その「バッキングバッファ」がバッファオブジェクトの見かけのサイズを完全にカバーしていない場合にもスローされます。

戻り値のポインタと長さで示されるデータ領域は、プレーンバッファの場合は完全なバッファであり、バッファオブジェクトの場合はアクティブな「スライス」です。返される長さは (要素数ではなく) バイト数で表現され、常に ptr[0] から ptr[len - 1] にアクセスできるようになります。例については duk_get_buffer_data() を参照してください。

duk_opt_xxx() と duk_get_xxx_default() に与えられたデフォルトのポインタ値は、Duktape によって追跡されません、例えば、 duk_opt_string() は、デフォルト文字列引数のコピーを作成しません。呼び出し側は、デフォルト・ポインタがその意図された用途に有効であり続けることを保証する責任があります。例えば、 duk_opt_string(ctx, 3, "localhost") は、文字列定数が常に有効であるため、問題なく動作しますが、引数が libc に割り当てられた文字列である場合、呼び出し側は、 duk_opt_string() が返すポインタが libc に割り当てられた文字列の寿命を越えて使用されないようにしなければなりません。

### 例

```c
void *ptr;
duk_size_t sz;
char buf[256];

/* Use a buffer or buffer object given at index 2, or default to 'buf'. */
ptr = duk_opt_buffer_data(ctx, 2, &sz, (void *) buf, sizeof(buf));
```

### 参照

duk_opt_buffer