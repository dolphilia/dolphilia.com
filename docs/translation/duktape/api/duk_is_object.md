## duk_is_object() 

1.0.0 stack object

### プロトタイプ

```c
duk_bool_t duk_is_object(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値がオブジェクトである場合は 1 を、そうでない場合は 0 を返す。 idx が無効な場合も 0 を返す。

多くの値がオブジェクトとみなされることに注意してください。

ECMAScript object
ECMAScript array
ECMAScript function
Duktape thread (coroutine)
Duktape internal objects

特定のオブジェクトタイプは、例えば duk_is_array() のような別の API コールでチェックすることができます。


### 例

```c
if (duk_is_object(ctx, -3)) {
    /* ... */
}
```