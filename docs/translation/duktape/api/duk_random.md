## duk_random() 

2.3.0 random

### プロトタイプ

```c
duk_double_t duk_random(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし。)


### 要約

Math.random()に対応するC APIで、範囲 [0,1] のランダムなIEEEダブル値を返します。


### 例

```c
if (duk_random(ctx) <= 0.01) {
    printf("surprise!\n");
}
```