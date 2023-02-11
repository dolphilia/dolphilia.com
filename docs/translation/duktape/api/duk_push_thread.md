## duk_push_thread() 

1.0.0 thread stack borrowed

### プロトタイプ

```c
duk_idx_t duk_push_thread(duk_context *ctx);
```

### スタック

| ... | -> | ... | thr |

### 要約

新しい Duktape スレッド (コンテキスト、コルーチン) をスタックにプッシュします。プッシュされたスレッドの負でないインデックス(スタックの底からの相対値)を返します。新しいスレッドは、引数 ctx と同じ Duktape ヒープに関連付けられ、同じグローバルオブジェクト環境を共有します。

Duktape API で新しいスレッドと対話するには、API 呼び出し用のコンテキスト・ポインタを取得するために duk_get_context() を使用します。


### 例

```c
duk_idx_t thr_idx;
duk_context *new_ctx;

thr_idx = duk_push_thread(ctx);
new_ctx = duk_get_context(ctx, thr_idx);
```

### 参照

duk_push_thread_new_globalenv