## duk_fatal() 

1.0.0 error

### プロトタイプ

```c
duk_ret_t duk_fatal(duk_context *ctx, const char *err_msg);
```

### スタック

(バリュースタックに影響ナシ)


### 要約

致命的なエラーハンドラをオプションのメッセージ付きで呼び出します (err_msg は NULL かもしれません)。Duktape のすべての文字列と同様に、エラーメッセージは UTF-8 文字列であるべきですが、純粋な ASCII が強く推奨されます。

致命的なエラー・ハンドラは決して戻らず、例えば現在のプロセスを終了させるかもしれません。エラー捕捉ポイント (try-catch 文やエラー捕捉 API 呼び出しなど) は回避され、ファイナライザは実行されない。この関数は、本当に致命的な、回復不可能なエラーが発生したときにのみ呼び出すべきです。

この関数は決して戻りませんが、プロトタイプは以下のようなコードを可能にする戻り値を記述しています。

```c
if (argvalue < 0) {
    return duk_fatal(ctx, "argvalue invalid, cannot continue execution");
}
```

### 例

```c
duk_fatal(ctx, "assumption failed");
```