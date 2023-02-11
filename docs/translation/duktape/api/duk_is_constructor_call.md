## duk_is_constructor_call() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_is_constructor_call(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし)


### 要約

現在の関数がコンストラクタとして呼び出された場合（Foo() の代わりに new Foo()）、0 以外を返します。

この呼び出しにより、C関数が通常の呼び出しとコンストラクタ呼び出しで異なる動作をすることができます（多くの組み込み関数がそうです）。


### 例

```c
if (duk_is_constructor_call(ctx)) {
    printf("called as a constructor\n");
} else {
    printf("called as a normal function\n");
}
```