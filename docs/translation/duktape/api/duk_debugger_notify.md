## duk_debugger_notify() 

1.5.0 debugger

### プロトタイプ

```c
duk_bool_t duk_debugger_notify(duk_context *ctx, duk_idx_t nvalues);
```

### スタック

| ... | val1 | ... | valN | -> | ... |

### 要約

デバッグプロトコルのdvaluesにマッピングされたバリュースタックトップのnvalues値を含むアプリケーション固有のデバッガ通知（AppNotify）を送信します。戻り値は、notifyが正常に送信されたか(0以外)、送信されなかったか(0)を示します。引数nvaluesは常にスタックトップからポップオフされます。デバッガサポートがコンパイルされていない場合、またはデバッガが接続されていない場合、このコールはno-opである; いずれの場合も、コールはnotifyが送信されなかったことを示す0を返す。

アプリケーション固有の通知の使用方法に関する詳細や例については、デバッガのドキュメントを参照してください。


### 例

```c
/* Causes the following notify to be sent over the debugger protocol:
 *
 *   NFY AppNotify "BatteryStatus" 740 1000 true EOM
 */
int battery_current = 740;
int battery_limit = 1000;
int battery_charging = 1;

duk_push_string(ctx, "BatteryStatus");
duk_push_int(ctx, battery_current);
duk_push_int(ctx, battery_limit);
duk_push_boolean(ctx, battery_charging);
if (duk_debugger_notify(ctx, 4 /*nvalues*/)) {
    printf("battery status notification sent\n");
} else {
    printf("battery status notification not sent\n");
}
```