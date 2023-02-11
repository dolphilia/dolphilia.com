## duk_is_strict_call() 

1.0.0 function

### プロトタイプ

```c
duk_bool_t duk_is_strict_call(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし)


### 要約

現在の（Duktape/C）関数呼び出しが厳格であるか否かをチェックします。現在の関数コールがストリクトであれば1を、そうでなければ0を返します。Duktape 0.12.0以降では、この関数はユーザーコードから呼ばれると常に1を返します（コールスタックが空でも）。


### 例

```c
if (duk_is_strict_call(ctx)) {
    printf("strict call\n");
} else {
    printf("non-strict call\n");
}
```