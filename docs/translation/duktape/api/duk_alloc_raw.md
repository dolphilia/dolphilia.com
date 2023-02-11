## duk_alloc_raw() 

1.0.0  memory


### プロトタイプ

```c
void *duk_alloc_raw(duk_context *ctx, duk_size_t size);
```

### スタック

(バリュースタックに影響なし)

### 要約

コンテキストに登録された生の割り当て関数を使用して、サイズバイトを割り当てます。割り当てに失敗した場合、NULL を返す。size が 0 の場合、この呼び出しは NULL を返すか、あるいは duk_free_raw() などに安全に渡すことができる非 NULL 値を返すかもしれない。また、割り当てられたメモリは自動的にガベージコレクションされません。割り当てられたメモリは自動的にゼロにされず、任意のゴミを含む可能性があります。

duk_alloc_raw() で割り当てられたメモリは、 duk_free() か duk_free_raw() で解放することができます。

### 例

```c
void *buf = duk_alloc_raw(ctx, 1024);
if (buf) {
    printf("allocation successful: %p\n", buf);
} else {
    printf("allocation failed\n");
}
```

### 参照

- duk_alloc
