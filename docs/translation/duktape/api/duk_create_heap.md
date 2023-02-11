## duk_create_heap() 

1.0.0 heap

### プロトタイプ

```c
duk_context *duk_create_heap(duk_alloc_function alloc_func,
                             duk_realloc_function realloc_func,
                             duk_free_function free_func,
                             void *heap_udata,
                             duk_fatal_function fatal_handler);
```

### スタック

(バリュースタックに影響なし。)


### 要約

新しいDuktapeヒープを作成し、初期コンテキスト(スレッド)を返す。ヒープの初期化に失敗した場合、NULLが返されます。現在のところ、より詳細なエラー情報を得る方法はない。

呼び出し側は、alloc_func、realloc_func、free_func でカスタムメモリ管理関数を提供することができます。ポインタはすべてNULLでなければなりませんし、すべて非NULLでなければなりません。ポインタが NULL の場合，デフォルトのメモリ管理関数 (ANSI C の malloc(), realloc() および free()) が使用される．メモリ管理関数は、同じ不透明なユーザデータポインタである heap_udata を共有します。このユーザーデータポインターは、致命的なエラー処理や低メモリーポインター圧縮マクロなど、他のDuktape機能にも使用されています。

致命的なエラー・ハンドラはfatal_handlerで提供されます。このハンドラは、キャッチできないエラー、ガベージコレクションで解決できないメモリ不足のエラー、セルフテストエラーなどの回復不能なエラー状況で呼び出されます。呼び出し側は、ほとんどのアプリケーションで致命的なエラーハンドラを実装すべきです(SHOULD)。もし指定がなければ、Duktapeに組み込まれたデフォルトの致命的なエラーハンドラが代わりに使われます。デフォルトの致命的エラーハンドラは、(duk_config.h で上書きされない限り) abort() を呼び出し、stdout や stderr にエラーメッセージを表示しない。より詳細な情報と例については、致命的なエラーの処理方法を参照してください。

デフォルトの設定で Duktape ヒープを作成するには、 duk_create_heap_default() を使用して下さい。

同じヒープにリンクされた新しいコンテキストは、 duk_push_thread() と duk_push_thread_new_globalenv() で作成できます。


### 例

```c
/*
 *  Simple case: use default allocation functions and fatal error handler
 */

duk_context *ctx = duk_create_heap(NULL, NULL, NULL, NULL, NULL);
if (ctx) {
    /* success */
} else {
    /* error */
}

/*
 *  Customized handlers
 */

duk_context *ctx = duk_create_heap(my_alloc, my_realloc, my_free,
                                   (void *) 0xdeadbeef, my_fatal);
if (ctx) {
    /* success */

    /* ... after heap is no longer needed: */
    duk_destroy_heap(ctx);
} else {
    /* error */
}
```

### 参照

duk_create_heap_default
duk_destroy_heap
