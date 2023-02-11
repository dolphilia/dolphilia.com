## duk_realloc() 

1.0.0 memory

### プロトタイプ

```c
void *duk_realloc(duk_context *ctx, void *ptr, duk_size_t size);
```

### スタック

(バリュースタックに影響なし)


### 要約

duk_realloc_raw() と同様ですが、要求を満たすためにガベージコレクションを起動させることがあります。しかし、割り当てられたメモリ自体は、自動的にガベージコレクションされません。割り当てられたサイズが前回の割り当てから拡張された場合、新たに割り当てられたバイトは自動的にゼロにされず、任意のゴミを含む可能性があります。

duk_realloc() で再割り当てされたメモリは、duk_free() または duk_free_raw() で解放することができます。


### 例

```c
void *buf = duk_alloc(ctx, 1024);
if (buf) {
    void *buf2 = duk_realloc(ctx, 2048);
    if (!buf2) {
        printf("failed to reallocate, 'buf' still valid\n");
    } else {
        printf("reallocate successful, 'buf2' now valid\n");
    }
}
```

### 参照

duk_realloc_raw