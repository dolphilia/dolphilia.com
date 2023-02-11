## duk_push_c_function() 

1.0.0 stack function

### プロトタイプ

```c
duk_idx_t duk_push_c_function(duk_context *ctx, duk_c_function func, duk_idx_t nargs);
```

### スタック

| ... | -> | ... | func |

### 要約

C関数に関連付けられた新しい関数オブジェクトをスタックにプッシュします。関数オブジェクトは ECMAScript の関数オブジェクトで、呼び出されると、func は Duktape/C の関数インターフェイスを使って呼び出されます。プッシュされた関数の負でないインデックス（スタックの底からの相対値）を返します。

nargs 引数は、func が入力されたときにバリュースタックがどのように見えるかを制御します。

nargs が >= 0 であれば、それは関数が期待する引数の正確な数を示します。余分な引数は捨てられ、足りない引数は未定義値で埋められます。関数に入ると、バリュースタックの先頭は常にnargsと一致します。
nargs が DUK_VARARGS に設定されている場合、バリュースタックは実際の（可変）呼び出し引数を含み、関数は duk_get_top() で実際の引数カウントをチェックする必要があります。
作成された関数は、通常の関数 (func()) としても、コンストラクタ (new func()) としても呼び出すことが可能です。この 2 つの呼び出し方は、 duk_is_constructor_call() を使って区別することができます。この関数はコンストラクタとして使用できますが、ECMAScript 関数のような自動的なプロトタイププロパティを持ちません。

押された関数をコンストラクタとして使用するつもりであれば、通常、プロトタイプ・オブジェクトを作成し、関数のプロトタイプ・プロパティを手動で設定する必要があります。

### 例

```c
duk_ret_t my_addtwo(duk_context *ctx) {
    double a, b;

    /* Here one can expect that duk_get_top(ctx) == 2, because nargs
     * for duk_push_c_function() is 2.
     */

    a = duk_get_number(ctx, 0);
    b = duk_get_number(ctx, 1);
    duk_push_number(ctx, a + b);
    return 1;   /*  1 = return value at top
                 *  0 = return 'undefined'
                 * <0 = throw error (use DUK_RET_xxx constants)
                 */
}

void test(void) {
    duk_idx_t func_idx;

    func_idx = duk_push_c_function(ctx, my_addtwo, 2);
    duk_push_int(ctx, 2);
    duk_push_int(ctx, 3);  /* -> [ ... func 2 3 ] */
    duk_call(ctx, 2);      /* -> [ ... res ] */
    printf("2+3 is %ld\n", (long) duk_get_int(ctx, -1));
    duk_pop(ctx);
}
```

### 参照

duk_push_c_lightfunc