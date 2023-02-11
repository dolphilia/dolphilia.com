## duk_get_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
void *duk_get_buffer(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size);
```

### スタック

| ... | val | ... |

### 要約

idxにある（プレーン）バッファ値のデータポインタを、値を変更したり強制したりすることなく取得します。値が0以外のサイズの有効なバッファである場合、非NULLポインタを返します。サイズが0のバッファの場合、NULLまたはNULLでないポインタを返すことがあります。値がバッファでない場合、またはインデックスが無効な場合は NULL を返す。out_size が非NULLの場合、バッファのサイズが *out_size に書き込まれます。

対象が固定バッファの場合、返されるポインタは安定であり、バッファの寿命が尽きるまで変化することはない。動的および外部バッファの場合、ポインタはバッファのサイズ変更または再構成に伴って変更される可能性が あります。呼び出し側は、バッファのサイズ変更/再構成後に本APIコールから返されるポインタ値が使用され ないようにする責任を負う。

サイズゼロのバッファと非バッファを返り値だけで区別する信頼できる方法はありません: 非バッファにはサイズゼロのNULLが返されます。非バッファの場合、サイズ0のNULLが返されます。サイズ0のバッファの場合、同じ値が返されるかもしれません（NULLでないポインタが返される可能性もありますが）。duk_is_buffer() や duk_is_buffer_data() 、あるいはバッファやバッファ・オブジェクトの型チェックを行う際に使用してください。

### 例

```c
void *ptr;
duk_size_t sz;

ptr = duk_get_buffer(ctx, -3, &sz);
printf("buf=%p, size=%lu\n", ptr, (unsigned long) sz);
```

### 参照

duk_require_buffer
duk_get_buffer_data
duk_require_buffer_data