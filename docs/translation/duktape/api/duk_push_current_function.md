## duk_push_current_function() 

1.0.0 stack function

### プロトタイプ

```c
void duk_push_current_function(duk_context *ctx);
```

### スタック

| ... | -> | ... | func | (if current function exists)
| ... | -> | ... | undefined | (if no current function)

### 要約

現在実行中の関数をスタックにプッシュします。プッシュされる値は ECMAScript Function オブジェクトです。現在実行中の関数がない場合、代わりに undefined がプッシュされます。

現在の関数が 1 つ以上のバインド関数や Proxy オブジェクトを介して呼び出されていた場合、この呼び出しから返される関数は最終的に解決された関数です（バインド関数やProxy ではありません）。

この関数により、C関数はその関数オブジェクトにアクセスすることができます。複数の関数オブジェクトは内部的に同じC関数を指すことができるので、関数オブジェクトは関数のパラメータ化のための便利な場所であり、内部の状態の隠し場所として機能することもできます。


### 例

```c
duk_push_current_function(ctx);
```