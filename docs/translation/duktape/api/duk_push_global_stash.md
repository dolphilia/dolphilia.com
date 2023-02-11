## duk_push_global_stash() 

1.0.0 stash stack sandbox object module

### プロトタイプ

```c
void duk_push_global_stash(duk_context *ctx);
```

### スタック

| ... | -> | ... | stash |

### 要約

グローバルスタッシュオブジェクトをスタックにプッシュします。グローバルスタッシュは内部オブジェクトで、C コードからキー/値のペアを保存してガベージコレクションに到達できるようにするために使用できますが、ECMAScript コードからアクセスすることはできません。スタッシュは、同じグローバルオブジェクトに関連付けられた ctx 引数を持つ C コードからしかアクセスできません。


### 例

```c
duk_ret_t set_timer_callback(duk_context *ctx) {
    duk_push_global_stash(ctx);
    duk_dup(ctx, 0);  /* timer callback */
    duk_put_prop_string(ctx, -2, "timerCallback");
    return 0;
}
```

### 参照

duk_push_heap_stash
duk_push_thread_stash