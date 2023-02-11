## duk_call_method() 

1.0.0 call

### プロトタイプ

```c
void duk_call_method(duk_context *ctx, duk_idx_t nargs);
```

### スタック

| ... | func | this | arg | ... | argN | -> | ... | retval |

### 要約

ターゲット関数funcを明示的なthisバインディングとnargs引数（関数やthisバインディングの値はカウントしない）で呼び出します。関数オブジェクト、thisバインディング値、関数引数は、1つの戻り値に置き換えられます。関数呼び出し中に投げられたエラーは、自動的に捕捉されない。

ターゲット関数が厳密でない場合、ターゲット関数が見るバインディング値は、関数コードの入力で指定された処理によって変更されることがあります。

本APIコールは、以下と同等です。

```javascript
var retval = func.call(this_binding, arg1, ..., argN);
```

### 例

```c
/* The target function here prints:
 *
 *    this: 123
 *    2 3
 *
 * and returns 5.
 */

duk_push_string(ctx, "(function(x,y) { print('this:', this); "
                     "print(x,y); return x+y; })");
duk_eval(ctx);  /* -> [ ... func ] */
duk_push_int(ctx, 123);
duk_push_int(ctx, 2);
duk_push_int(ctx, 3);
duk_call_method(ctx, 2);  /* [ ... func 123 2 3 ] -> [ ... 5 ] */
printf("2+3=%ld\n", (long) duk_get_int(ctx, -1));  /* prints 5 */
duk_pop(ctx);
```
