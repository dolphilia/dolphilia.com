## duk_set_global_object() 

1.0.0 thread stack sandbox

### プロトタイプ

```c
void duk_set_global_object(duk_context *ctx);
```

### スタック

| ... | new_global | -> | ... |

### 要約

現在のコンテキストのグローバルオブジェクトを、バリュースタックの一番上にあるオブジェクトで置き換えます。値がオブジェクトでない場合は、エラーがスローされます。

この操作は、他のコンテキストのグローバルオブジェクトには影響しないことに注意してください。たとえ、この時点まで同じグローバル環境を共有していたとしてもです。他のコンテキストに変更を継承するには、duk_push_thread() を呼び出す前に、まずグローバルオブジェクトを置き換えます。

変更後の詳細な動作については、テストケース test-set-global-object.c を参照してください。


### 例

```c
/* Build a global object with a subset of bindings. */
duk_eval_string(ctx,
    "({\n"
    "    print: this.print,\n"
    "    JSON: this.JSON\n"
    "})\n");

/* Replace global object. */
duk_set_global_object(ctx);
```