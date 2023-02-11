## duk_call() 

1.0.0 call

### プロトタイプ

```c
void duk_call(duk_context *ctx, duk_idx_t nargs);
```

### スタック

| ... | func | arg1 | ... | argN | -> | ... | retval |

### 要約

ターゲット関数funcをnargsの引数で呼び出す（関数自体を除く）。関数とその引数は、単一の戻り値に置き換えられます。関数呼び出し中に投げられたエラーは、自動的に捕捉されない。

このバインディングのターゲット関数は、初期状態では未定義に設定されています。ターゲット関数が厳密でない場合、バインディングは、関数が呼び出される前にグローバルオブジェクトに置き換えられます。「関数コードの入力」を参照してください。このバインディングを制御したい場合は、代わりに duk_call_method() または duk_call_prop() を使用することができます。

このAPIコールは、以下と同等です。

```javascript
var retval = func(arg1, ..., argN);
```

または

```javascript
var retval = func.call(undefined, arg1, ..., argN);
```

### 例

```c
/* Assume target function is already on stack at func_idx; the target
 * function adds arguments and returns the result.
 */
duk_idx_t func_idx = /* ... */;

duk_dup(ctx, func_idx);
duk_push_int(ctx, 2);
duk_push_int(ctx, 3);
duk_call(ctx, 2);  /* [ ... func 2 3 ] -> [ ... 5 ] */
printf("2+3=%ld\n", (long) duk_get_int(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_call_method
duk_call_prop