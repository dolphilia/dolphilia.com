## duk_free() 

1.0.0 memory

### プロトタイプ

```c
void duk_free(duk_context *ctx, void *ptr);
```

### スタック

(バリュースタックに影響なし)


### 要約

duk_free_raw() と同様ですが、ガベージコレクションのステップを含むかもしれません。ガベージコレクションとの相互作用は、操作を失敗させる原因にはなりません。

duk_alloc() や duk_alloc_raw() で割り当てられたメモリや、それらの再割り当ての派生型のメモリを解放するために、 duk_free() を使用することが可能です。

現在のところ、duk_free() は決してガベージコレクションをパスさせません。

### 例

```c
void *buf = duk_alloc(ctx, 1024);
/* ... */

duk_free(ctx, buf);  /* safe even if 'buf' is NULL */
```

### 参照

duk_free_raw