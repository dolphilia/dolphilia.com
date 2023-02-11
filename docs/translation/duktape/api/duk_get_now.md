## duk_get_now() 

2.0.0 time

### プロトタイプ

```c
duk_double_t duk_get_now(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし)


### 要約

ECMAScript 環境から見た POSIX ミリ秒単位で現在の時刻を取得します。戻り値は Date.now() と一致しますが、サブミリ秒の分解能が利用できるかもしれないという留保がつきます。


### 例

```c
duk_double_t now;

now = duk_get_now(ctx);
print("timestamp: %lf\n", (double) now);
```