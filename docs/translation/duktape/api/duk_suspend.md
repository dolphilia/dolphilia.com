## duk_suspend() 

1.6.0 thread

### プロトタイプ

```c
void duk_suspend(duk_context *ctx, duk_thread_state *state);
```

### スタック

| ... | -> | ... | state(N) | (number of pushed stack entries may vary)

### 要約

別のネイティブ・スレッドが同じDuktapeヒープ上で操作できるように、現在のコール・スタックを一時停止します。必要な内部状態は、バリュースタックや提供された状態割り当てに格納されます。状態ポインタはNULLであってはならず、さもなければメモリ不安全な動作が発生します。実行は、後で duk_resume() を使って再開されなければなりません。後で実行が再開されない場合、いくつかの内部帳簿が矛盾した状態で残されます。Duktapeの実行が中断されている間、（duk_suspend()を呼び出した）現在のネイティブ・スレッドのネイティブ・コール・スタックは巻き戻されてはいけません。

このAPIコールは、直接または間接的に、以下の場所から使用してはならない。

ファイナライザー・コール
Duktape.errCreate()エラー補強コール
Duktapeは、一度に特定のDuktapeヒープにアクセスするネイティブ・スレッドだけを確保するためのロッキングを提供しません。アプリケーション・コードでそのようなメカニズムを提供する必要があります。
スレッディングを参照してください。


### 例

```c
/* Example of a blocking connect which suspends Duktape execution while the
 * connect blocks.  The example assumes an external locking mechanism for
 * ensuring only one native thread accesses the Duktape heap at a time.
 * When my_blocking_connect() is entered, the currently executing native
 * thread is assumed to have already obtained the lock.
 */

duk_ret_t my_blocking_connect(duk_context *ctx) {
    duk_thread_state st;
    const char *host;
    int port;
    int success;

    host = duk_require_string(ctx, 0);
    port = (int) duk_require_int(ctx, 1);

    /* Suspend the Duktape thread.  Once duk_suspend() returns you must
     * not call into the Duktape API before doing a duk_resume().
     */
    duk_suspend(ctx, &st);
    my_release_lock();

    /* Blocks until connect attempt is finished.  Another native thread
     * may call into Duktape while we're blocked provided that application
     * guarantees only thread does so at a time.
     */
    success = blocking_connect(host, port);

    /* When we want to resume execution we must ensure no other thread is
     * active for the Duktape heap.  We then call duk_resume() and proceed
     * normally.
     */
    my_acquire_lock();
    duk_resume(ctx, &st);

    if (!success) {
        duk_type_error(ctx, "failed to connect");
    }
    return 0;
}
```

### 参照

duk_resume