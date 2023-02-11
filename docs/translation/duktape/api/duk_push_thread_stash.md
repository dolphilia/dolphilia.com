## duk_push_thread_stash() 

1.0.0 thread stash stack sandbox object module

### プロトタイプ

```c
void duk_push_thread_stash(duk_context *ctx, duk_context *target_ctx);
```

### スタック

| ... | -> | ... | stash |

### 要約

target_ctx に関連する stash オブジェクトをスタックにプッシュします (ctx と target_ctx 引数は同じスレッドを参照することができます)。スレッドスタッシュは内部オブジェクトで、C コードからキー/値ペアを保存するために使用され、ガベージコレクションのために到達可能ですが、ECMAScript コードからアクセスすることができないようにします。スタッシュは、マッチする target_ctx 引数を持つ C コードからしかアクセスできません。

target_ctx が NULL の場合、エラーを投げます。


### 例

```c
duk_push_thread_stash(ctx, ctx2);
```

### 参照

duk_push_heap_stash
duk_push_global_stash