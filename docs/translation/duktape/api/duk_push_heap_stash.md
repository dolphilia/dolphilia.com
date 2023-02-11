## duk_push_heap_stash() 

1.0.0 stash stack sandbox object module

### プロトタイプ

```c
void duk_push_heap_stash(duk_context *ctx);
```

### スタック

| ... | -> | ... | stash |

### 要約

ヒープスタッシュオブジェクトをスタックにプッシュします。ヒープ・スタッシュは内部オブジェクトで、Cコードからキー/値のペアを保存してガベージコレクションに到達できるようにするために使用できますが、ECMAScriptコードからアクセスすることはできません。スタッシュはCコードからのみアクセス可能で、同じDuktapeヒープを共有する全てのコードで同じスタッシュオブジェクトが使用されます（同じグローバルオブジェクトを共有しない場合でも）。


### 例

```c
duk_push_heap_stash(ctx);
```

### 参照

duk_push_global_stash
duk_push_thread_stash