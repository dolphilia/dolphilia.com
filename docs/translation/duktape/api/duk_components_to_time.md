## duk_components_to_time() 

2.0.0 time

### プロトタイプ

```c
duk_double_t duk_components_to_time(duk_context *ctx, duk_time_components *comp);
```

### スタック

(バリュースタックに影響なし。)


### 要約

UTCで解釈される構成要素（年、月、日、など）を時間値に変換します。comp->weekday 引数は変換の際に無視されます。構成要素の値が無効な場合、エラーが投げられます。

ECMAScriptのDate.UTC()組み込みと若干の違いがあります。

2桁の年号を特別に扱うことはありません。例えば、Date.UTC(99, 0, 1)は1999-01-01として解釈されます。comp->time が 99 の場合、99 年と解釈されます。
ミリ秒成分は分数（サブミリ秒の分解能）が許され、結果として得られる時刻の値に分数を持たせることができます。
ECMAScript のプリミティブと同様に、成分はその自然な範囲を超えることができ、正規化されます。例えば、comp->minutesを120と指定すると、時間値に2時間追加されると解釈されます。成分はIEEE doublesで表現され、大きな値や負の値を使用できるようにします。


### 例

```c
duk_time_components comp;
duk_double_t time;

memset((void *) &comp, 0, sizeof(comp));  /* good practice even if fully initialized */
comp.year = 2016;
comp.month = 0;  /* 0-based, 1=January */
comp.day = 2;    /* 1-based: second of January */
comp.hours = 3;
comp.minutes = 4;
comp.seconds = 5;
comp.milliseconds = 6.0;  /* allows sub-millisecond resolution */
comp.weekday = 0;  /* ignored */

time = duk_components_to_time(ctx, &comp);
printf("2016-01-02 03:04:05.006Z -> %lf\n", (double) time);
```

### 参照

duk_time_to_components