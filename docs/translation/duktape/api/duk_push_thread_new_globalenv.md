## duk_push_thread_new_globalenv() 

1.0.0 thread stack borrowed

### プロトタイプ

```c
duk_idx_t duk_push_thread_new_globalenv(duk_context *ctx);
```

### スタック

| ... | -> | ... | thr |

### 要約

新しい Duktape スレッド (コンテキスト、コルーチン) をスタックにプッシュします。プッシュされたスレッドの負でないインデックス(スタックの底からの相対値)を返します。新しいスレッドは、引数 ctx と同じ Duktape ヒープに関連付けられますが、新しいグローバルオブジェクト環境 (ctx が使用する環境とは別) を持つことになります。

Duktape API で新しいスレッドと対話するには、duk_get_context() を使って API 呼び出しのためのコンテキスト・ポインタを取得します。


### 例

```c
duk_idx_t thr_idx;
duk_context *new_ctx;

thr_idx = duk_push_thread_new_globalenv(ctx);
new_ctx = duk_get_context(ctx, thr_idx);
```

### 参照

duk_push_thread