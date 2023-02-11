## duk_free_raw() 

1.0.0 memory

### プロトタイプ

```c
void duk_free_raw(duk_context *ctx, void *ptr);
```

### スタック

(バリュースタックに影響なし)


### 要約

コンテキストに登録されたアロケーション機能で割り当てられたメモリを解放します。この操作は失敗しない．ptr が NULL の場合，この呼び出しは失敗です．

duk_free_raw() は、 duk_alloc() や duk_alloc_raw() およびそれらの再割り当て関数で割り当てられたメモリを解放するために使用できます。


### 例

```c
void *buf = duk_alloc_raw(ctx, 1024);
/* ... */

duk_free_raw(ctx, buf);  /* safe even if 'buf' is NULL */
```

### 参照

duk_free