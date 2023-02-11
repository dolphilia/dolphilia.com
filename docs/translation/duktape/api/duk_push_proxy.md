## duk_push_proxy() 

2.2.0 stack object

### プロトタイプ

```c
duk_idx_t duk_push_proxy(duk_context *ctx, duk_uint_t proxy_flags);
```

### スタック

| ... | target | handler | -> | ... | proxy |

### 要約

new Proxy(target, handler)に相当する、ターゲットとハンドラのテーブルに対する 新しいProxyオブジェクトをバリュースタックにプッシュします。proxy_flagsは現在(Duktape 2.5まで)未使用です。


### 例

```c
duk_idx_t proxy_idx;

duk_push_object(ctx);  /* target */
duk_push_object(ctx);  /* handler */
duk_push_c_function(ctx, my_get, 3);  /* 'get' trap */
duk_put_prop_string(ctx, -2, "get");
proxy_idx = duk_push_proxy(ctx, 0);  /* [ target handler ] -> [ proxy ] */
```