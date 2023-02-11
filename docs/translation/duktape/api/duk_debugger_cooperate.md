## duk_debugger_cooperate() 

1.2.0 debugger

### プロトタイプ

```c
void duk_debugger_cooperate(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし。)


### 要約

受信したデバッグコマンドをブロックせずにチェックし、実行します。デバッグ・コマンドは、引数ctxのコンテキストで実行されます。Duktapeへの呼び出しが（どのコンテキストからも）進行中でない場合にのみ呼び出すことができます。詳細については、debugger.rst を参照してください。


### 例

```c
duk_debugger_cooperate(ctx);
```

### 参照

duk_debugger_attach
duk_debugger_detach
