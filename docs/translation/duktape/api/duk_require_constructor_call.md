## duk_require_constructor_call() 

2.4.0 stack

### プロトタイプ

```c
void duk_require_constructor_call(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし)


### 要約

現在の関数がコンストラクタ呼び出し (new Foo()) ではなく、通常の関数呼び出し (Foo()) として呼び出された場合にエラーをスローします。また、現在の呼び出しが進行中でない場合にもスローします。それ以外の場合は、次のようになります。


### 例

```c
duk_require_constructor_call(ctx);
```