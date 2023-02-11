## duk_time_to_components() 

2.0.0 time

### プロトタイプ

```c
void duk_time_to_components(duk_context *ctx, duk_double_t time, duk_time_components *comp);
```

### スタック

(バリュースタックに影響なし。)


### 要約

UTCで解釈されるコンポーネント（年、月、日など）に時間値を変換します。時間値が無効な場合、例えば ECMAScript の有効な時間範囲を超えている場合、エラーがスローされます。

Date.prototype.getUTCMinutes() のような ECMAScript の Date UTC アクセッサといくつかの相違点があります。

時間値は、ミリ秒コンポーネントが分数を持つことができるように、分数（サブミリ秒の解像度）を持つことが許可されています。

### 例

```c
duk_double_t time = 1451703845006.0;  /* 2016-01-02 03:04:05.006Z */
duk_time_components comp;
const char *weekdays[7] = {
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
};

/* Note that month is zero-based to match the ECMAScript API, so for
 * human readable printing add 1 to the month.  Time components are
 * IEEE doubles to match ECMAScript Date behavior.
 */
duk_time_to_components(ctx, time, &comp);
printf("Datetime: %04d-%02d-%02d %02d:%02d:%02d.%03dZ\n",
       (int) comp.year, (int) comp.month + 1, (int) comp.day,
       (int) comp.hours, (int) comp.minutes, (int) comp.seconds,
       (int) comp.milliseconds);

printf("Weekday is: %s\n", weekdays[(int) comp.weekday]);  /* 0=Sunday */
```

### 参照

duk_components_to_time