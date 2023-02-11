## duk_realloc_raw() 

1.0.0 memory

### プロトタイプ

```c
void *duk_realloc_raw(duk_context *ctx, void *ptr, duk_size_t size);
```

### スタック

(バリュースタックに影響なし。)


### 要約

コンテキストに登録されたアロケーション関数で作成された以前のアロケーションのサイズを変更します。ptr 引数は以前の割り当てを指し、size は新しい割り当てのサイズです。この呼び出しは、以前のものと異なるポインタを持つ可能性のある、新しい割り当てへのポインタを返します。再割り当てに失敗した場合、NULL が返され、以前の割り当てはまだ有効です。再配置の失敗は、新しいサイズが以前のサイズよりも大きい場合にのみ起こり得ます (つまり、呼び出し側が割り当てを大きくしようとした場合)。再割り当ての試みはガベージコレクションを引き起こすことはできず、割り当てられたメモリは自動的にガベージコレクションされることはありません。割り当てられたサイズが以前の割り当てから拡張された場合、新しく割り当てられたバイトは自動的にゼロにされず、任意のゴミを含む可能性があります。

正確な動作は、以下のように ptr と size の引数に依存します。

ptr が NULL でなく、size が 0 より大きい場合、以前の割り当てはサイズ変更されます。
ptr が非 NULL で size が 0 の場合、この呼び出しは duk_free_raw() と等価です。
ptr が NULL で size が 0 より大きい場合、この呼び出しは duk_alloc_raw() と等価です。
ptr が NULL で size が 0 の場合、この呼び出しは size 引数が 0 の duk_alloc_raw() と等価です。
duk_realloc_raw() で再割り当てされたメモリは、 duk_free() または duk_free_raw() で解放することができます。


### 例

```c
void *buf = duk_alloc_raw(ctx, 1024);
if (buf) {
    void *buf2 = duk_realloc_raw(ctx, 2048);
    if (!buf2) {
        printf("failed to reallocate, 'buf' still valid\n");
    } else {
        printf("reallocate successful, 'buf2' now valid\n");
    }
}
```

### 参照

duk_realloc