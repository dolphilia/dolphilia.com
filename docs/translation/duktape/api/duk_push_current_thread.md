## duk_push_current_thread() 

1.0.0 thread stack function borrowed

### プロトタイプ

```c
void duk_push_current_thread(duk_context *ctx);
```

### スタック

| ... | -> | ... | thread | (if current thread exists)
| ... | -> | ... | undefined | (if no current thread)

### 要約

現在実行中の Duktape スレッドをスタックにプッシュします。プッシュされる値はスレッドオブジェクトであり、ECMAScript オブジェクトでもあります。現在のスレッドがない場合、代わりに undefined がプッシュされます。

現在のスレッドは (ほとんど常に) ctx ポインタによって表されるスレッドです。

スレッドに関連付けられた duk_context * を取得するには、 duk_get_context() を使用します。


### 例

```c
duk_push_thread(ctx);
```