## duk_create_heap_default() 

1.0.0 heap

### プロトタイプ

```c
duk_context *duk_create_heap_default(void);
```

### スタック

(バリュースタックに影響なし。)


### 要約

新しいDuktapeヒープを作成し、初期コンテキスト(スレッド)を返す。ヒープの初期化に失敗した場合は、NULLを返します。現在のところ、より詳細なエラー情報を得る方法はない。

作成されたヒープには、デフォルトのメモリ管理関数と致命的なエラーハンドラ関数が使用されます。このAPIコールは、以下と同等です。

```c
ctx = duk_create_heap(NULL, NULL, NULL, NULL, NULL);
```

### 例

```c
duk_context *ctx = duk_create_heap_default();
if (ctx) {
    /* success */

    /* ... after heap is no longer needed: */
    duk_destroy_heap(ctx);
} else {
    /* error */
}
```