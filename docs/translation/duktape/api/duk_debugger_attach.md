## duk_debugger_attach() 

1.2.0 debugger

### プロトタイプ

```c
void duk_debugger_attach(duk_context *ctx,
                         duk_debug_read_function read_cb,
                         duk_debug_write_function write_cb,
                         duk_debug_peek_function peek_cb,
                         duk_debug_read_flush_function read_flush_cb,
                         duk_debug_write_flush_function write_flush_cb,
                         duk_debug_request_function request_cb,
                         duk_debug_detached_function detached_cb,
                         void *udata);
```

### スタック

(バリュースタックに影響なし。)


### 要約

Duktapeのヒープにデバッガーをアタッチします。アタッチが完了すると、デバッガは自動的にポーズ状態になります。デバッガのサポートがDuktapeにコンパイルされていない場合、エラーを投げます。。デバッガー統合の詳細については、debugger.rstを参照してください。コールバックは以下のとおりです。オプションのコールバックはNULLでもかまいません。

コールバック 必須 説明
read_cb はい デバッグトランスポート読み込みコールバック
write_cb はい デバッグトランスポートの書き込みコールバック
peek_cb No デバッグトランスポートのピークコールバック、強く推奨するがオプション
read_flush_cb No デバッグトランスポートリードフラッシュコールバック
write_flush_cb No デバッグトランスポートライトフラッシュコールバック
request_cb No アプリケーション固有のコマンド (AppRequest) コールバック、NULL は AppRequest のサポートがないことを示します。
detached_cb No デバッガーを切り離すコールバック
重要：コールバックは、以下を除き、Duktape API関数を呼び出すことはできません（そうすることで、メモリが安全でない動作が発生する可能性があります）。

request_cb AppRequestコールバックは、debugger.rstに記載されているガイドラインの範囲内で、バリュースタックを使用することができます。
Duktape 1.4.0以降では、デバッガー離脱コールバックはduk_debugger_attach()を呼び出して、すぐにデバッガーを再接続することが許可されるようになりました。Duktape 1.4.0以前では、即時再接続は潜在的にいくつかの問題を引き起こしていました。
Duk_debugger_attach_custom() と duk_debugger_attach() APIコールは、Duktape 2.xでマージされました。

### 例

```c
duk_debugger_attach(ctx,
                    my_read_cb,
                    my_write_cb,
                    my_peek_cb,
                    NULL,
                    NULL,
                    NULL,
                    my_detached_cb,
                    my_udata);
```

### 参照

duk_debugger_detach
duk_debugger_cooperate
duk_debugger_notify
