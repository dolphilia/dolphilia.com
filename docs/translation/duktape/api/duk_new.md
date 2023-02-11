## duk_new() 

1.0.0 object call

### プロトタイプ

```c
void duk_new(duk_context *ctx, duk_idx_t nargs);
```

### スタック

| ... | constructor | arg1 | ... | argN | -> | ... | retval |

### 要約

コンストラクタ関数をnargsの引数で呼び出します（関数自体を除く）。関数とその引数は、単一の戻り値に置き換えられます。コンストラクタの呼び出し中に投げられたエラーは、自動的に捕捉されません。

このバインディングのターゲット関数は、新しく作成された空のオブジェクトに設定されます。constructor.prototype がオブジェクトの場合は、新しいオブジェクトの内部プロトタイプがその値に設定され、そうでない場合は標準の組み込みオブジェクトプロトタイプが内部プロトタイプとして使用されます。ターゲット関数の戻り値は、コンストラクタ呼び出しの結果が何であるかを決定します。コンストラクタがオブジェクトを返す場合は、新しい空のオブジェクトに置き換えられます。そうでない場合は、新しい空のオブジェクト（コンストラクタによって変更される可能性があります）が返されます。[コンストラクタ]()を参照してください。


### 例

```c
/* Assume target function is already on stack at func_idx.
 * Equivalent to ECMAScript 'new func("foo", 123)'.
 */
duk_idx_t func_idx = /* ... */;

duk_dup(ctx, func_idx);
duk_push_string(ctx, "foo");
duk_push_int(ctx, 123);
duk_new(ctx, 2);  /* [ ... func "foo" 123 ] -> [ ... res ] */
printf("result is object: %d\n", (int) duk_is_object(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_pnew