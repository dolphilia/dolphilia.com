## duk_resume() 

1.6.0 thread

### プロトタイプ

```c
void duk_resume(duk_context *ctx, const duk_thread_state *state);
```

### スタック

| ... | state(N) | -> | ... | (number of popped stack entries may vary)

### 要約

duk_suspend() で一時停止した Duktape の実行を再開します。state 引数は NULL であってはならない。Value スタックと state は、 duk_suspend() によって残された状態でなければならない； そうでない場合、メモリ不安全な動作が起こります。


### 例

```c
/* See example for duk_suspend(). */
```

### 参照

duk_suspend