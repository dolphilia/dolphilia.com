## duk_get_memory_functions() 

1.0.0 memory heap

### プロトタイプ

```c
void duk_get_memory_functions(duk_context *ctx, duk_memory_functions *out_funcs);
```

### スタック

(バリュースタックに影響なし)


### 要約

コンテキストが使用するメモリ管理関数を取得します。

通常、この関数を呼び出す理由はない。 duk_alloc(), duk_realloc(), duk_free() のようなラップされたメモリ管理関数を通して、メモリ管理プリミティブを使用することができるからです。


### 例

```c
duk_memory_functions funcs;

duk_get_memory_functions(ctx, &funcs);
```