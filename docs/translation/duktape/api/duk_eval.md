## duk_eval() 

1.0.0 compile

### プロトタイプ

```c
void duk_eval(duk_context *ctx);
```

### スタック

| ... | source | -> | ... | result |

### 要約

ECMAScript のソースコードをスタックの一番上で評価し、スタックの一番上に単一の戻り値を残す。このようなエラーは自動的には捕捉されません。一時的なeval関数に関連するファイル名は "eval "です。

このAPIコールは、基本的に次のようなショートカットになっています。

```c
duk_push_string(ctx, "eval");
duk_compile(ctx, DUK_COMPILE_EVAL);  /* [ ... source filename ] -> [ function ] */
duk_call(ctx, 0);
```

ソースコードは、明示的な "use strict" 指令を含まない限り、非厳密モードで評価されます。特に、現在のコンテキストの厳密性は eval のコードには反映されません。これにより、Duktape/Cの関数呼び出しの内部でevalを使うか（strictモード）、外部で使うか（non-strictモード）で、evalの厳密性が変わってしまうような混乱が避けられます。

eval の入力が固定文字列の場合、duk_eval_string() を使うこともできます。


### 例

```c
/* Eval result in ECMAScript is the last non-empty statement; here, the
 * result of the eval is the number 123.
 */

duk_push_string(ctx, "print('Hello world!'); 123;");
duk_eval(ctx);
printf("return value is: %lf\n", (double) duk_get_number(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_peval
duk_eval_noresult
duk_eval_string
duk_eval_string_noresult
duk_eval_lstring
duk_eval_lstring_noresult