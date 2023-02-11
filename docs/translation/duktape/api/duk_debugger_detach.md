## duk_debugger_detach() 

1.2.0 debugger

### プロトタイプ

```c
void duk_debugger_detach(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし。)


### 要約

Duktapeヒープからデバッガを切り離す。デバッガ・サポートがDuktapeにコンパイルされていない場合、エラーを投げます。。詳細は debugger.rst を参照のこと。


### 例

```c
duk_debugger_detach(ctx);
```

### 参照

duk_debugger_attach
duk_debugger_cooperate