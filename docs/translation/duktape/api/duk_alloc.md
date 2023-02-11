## duk_alloc() 

1.0.0  memory

### プロトタイプ

```c
void *duk_alloc(duk_context *ctx, duk_size_t size);
```

### スタック

(バリュースタックに影響なし)

### 概要

duk_alloc_raw() と同様ですが、要求を満たすためにガベージコレクションを起動させることがあります。しかし、割り当てられたメモリ自体は自動的にガベージコレクションされません。ガベージコレクションの後でも、割り当て要求は失敗することがあり、その場合は NULL が返されます。割り当てられたメモリは自動的にゼロにされないので、任意のゴミを含む可能性があります。

duk_alloc() で割り当てられたメモリは、duk_free() または duk_free_raw() で解放することができます。

### 例

```c
/* Although duk_alloc() triggers a GC if necessary, it can still fail to
 * allocate the desired amount of memory.  Caller must check for NULL
 * (however, if allocation size is 0, a NULL may be returned even in
 * a success case).
 */
void *buf = duk_alloc(ctx, 1024);
if (buf) {
    printf("allocation successful: %p\n", buf);
} else {
    printf("allocation failed\n");
}
```

### 参照

- duk_alloc_raw
