## duk_push_new_target() 

2.3.0 stack function

### プロトタイプ

```c
void duk_push_new_target(duk_context *ctx);
```

### スタック

| ... | -> | ... | undefined | (if no current function or not a constructor call)
| ... | -> | ... | func | (if current function call is a constructor call)

### 要約

現在実行中の関数の new.target に相当する値をスタックにプッシュします。現在の呼び出しがコンストラクタ呼び出しでない場合、またはコールスタックが空の場合、プッシュされる値は未定義です。


### 例

```c
duk_push_new_target(ctx);
```