## duk_put_function_list() 

1.0.0 property module

### プロトタイプ

```c
void duk_put_function_list(duk_context *ctx, duk_idx_t obj_idx, const duk_function_list_entry *funcs);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

複数の関数プロパティを obj_idx にあるターゲットオブジェクトに設定します。関数は、nameがNULLのトリプル（正しさのためにfunctionもNULLであることが望ましい）で終わる、トリプル（name、function、nargs）のリストとして指定されます。

これは、例えば、Duktape/C関数のセットとして実装されたモジュールやクラスを定義する際に便利です。


### 例

```c
const duk_function_list_entry my_module_funcs[] = {
    { "tweak", do_tweak, 0 /* no args */ },
    { "adjust", do_adjust, 3 /* 3 args */ },
    { "frobnicate", do_frobnicate, DUK_VARARGS /* variable args */ },
    { NULL, NULL, 0 }
};

/* Initialize an object with a set of function properties, and set it to
 * global object 'MyModule'.
 */

duk_push_global_object(ctx);
duk_push_object(ctx);  /* -> [ ... global obj ] */
duk_put_function_list(ctx, -1, my_module_funcs);
duk_put_prop_string(ctx, -2, "MyModule");  /* -> [ ... global ] */
duk_pop(ctx);
```

### 参照

duk_put_number_list