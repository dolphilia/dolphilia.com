## duk_compile() 

1.0.0 compile

### プロトタイプ

```c
void duk_compile(duk_context *ctx, duk_uint_t flags);
```

### スタック

| ... | source | filename -> | ... | function |

### 要約

ECMAScript のソースコードをコンパイルし、コンパイルされた関数オブジェクトに置き換えます（コードは実行されません）。filename 引数は結果の関数の fileName プロパティとして保存され、例えばトレースバックで関数を識別するために使用される名前となります。コンパイル時のエラー（メモリ不足、内部制限エラーなどの通常の内部エラーに加えて）に対しては、SyntaxError を投げます。ことがあります。

以下のフラグを指定することができます。

- DUK_COMPILE_EVAL 入力を ECMAScript プログラムとしてではなく、eval コードとしてコンパイルします。
- DUK_COMPILE_FUNCTION 入力を ECMAScript プログラムとしてではなく、関数としてコンパイルします。
- DUK_COMPILE_STRICT 入力を強制的にストリクトモードでコンパイルする
- DUK_COMPILE_SHEBANG 入力の最初の行で、非標準の shebang コメント (#! ...) を許可する

コンパイルされるソースコードは、以下のようなものであってもよい。

- グローバルコード: 引数ゼロの関数にコンパイルされ、トップレベルのECMAScriptプログラムのように実行されます。
- 評価コード：ECMAScript の eval コールのように実行される、引数ゼロの関数にコンパイルされます (DUK_COMPILE_EVAL フラグ)
- 関数コード：0 個以上の引数を持つ関数にコンパイルされます (フラグ DUK_COMPILE_FUNCTION)

これらは全て、ECMAScript では若干異なるセマンティクスを持っています。詳細な議論については、実行コンテキストの確立を参照してください。一つの大きな違いは、グローバルコンテキストと eval コンテキストには暗黙の戻り値があることです：最後の空でない文の値がプログラムや eval コードの自動的な戻り値であるのに対し、関数には自動的な戻り値がないのです。

グローバルコードと eval コードには、明示的な関数構文がありません。例えば、次のようなものはグローバル式としても eval 式としてもコンパイルできます。

```javascript
print("Hello world!");
123;  // implicit return value
```

関数コードはECMAScriptの関数構文に従う（関数名は省略可能）。

```javascript
function adder(x,y) {
    return x+y;
}
```

関数をコンパイルすることは，関数式を含む eval コードをコンパイルすることと同じです．そうしないと、evalコードは関数値を返す代わりに、adderという名前のグローバル関数を登録することになります。

```javascript
(function adder(x,y) {
    return x+y;
})
```

グローバルコードと eval コードで生成されるバイトコードは、現在、関数で生成されるバイトコードよりも遅いです。プログラムコードと eval コードでは、すべての変数アクセスに「スローパス」が使用され、プログラムコードと eval コードの暗黙の戻り値処理により、不要なバイトコードがいくつか生成されます。性能の観点（メモリ性能と実行性能）から言えば、できるだけ多くのコードを関数の中に置くことが望ましい。

eval やグローバル式をコンパイルする際には、ECMAScript の通常のゴッチャを避けるように注意してください。

```javascript
/* Function at top level is a function declaration which registers a global
 * function, and is different from a function expression.  Use parentheses
 * around the top level expression.
 */

eval("function adder(x,y) { return x+y; }");   /* registers 'adder' to global */
eval("function (x,y) { return x+y; }");        /* not allowed */
eval("(function (x,y) { return x+y; })");      /* function expression (anonymous) */
eval("(function adder(x,y) { return x+y; })"); /* function expression (named) */

/* Opening curly brace at top level is interpreted as start of a block
 * expression, not an object literal.  Use parentheses around the top
 * level expression.
 */

eval("{ myfunc: 1 }");   /* block with -label- "myfunc" and statement "1" (!) */
eval("({ myfunc: 1 })";  /* object literal { myfunc: 1 } */
```

### 例

```c
/* Global code.  Note that the hello() function is a function
 * declaration which gets registered into the global object when
 * executed.  Implicit return value is 123.
 */

duk_push_string(ctx, "print('global');\n"
                     "function hello() { print('Hello world!'); }\n"
                     "123;");
duk_push_string(ctx, "hello");
duk_compile(ctx, 0);   /* [ source filename ] -> [ func ] */
duk_call(ctx, 0);      /* [ func ] -> [ result ] */
printf("program result: %lf\n", (double) duk_get_number(ctx, -1));
duk_pop(ctx);

/* Eval code */

duk_push_string(ctx, "2+3");
duk_push_string(ctx, "eval");
duk_compile(ctx, DUK_COMPILE_EVAL);
duk_call(ctx, 0);      /* [ func ] -> [ result ] */
printf("eval result: %lf\n", (double) duk_get_number(ctx, -1));
duk_pop(ctx);

/* Function code */

duk_push_string(ctx, "function (x,y) { return x+y; }");
duk_push_string(ctx, "function");
duk_compile(ctx, DUK_COMPILE_FUNCTION);
duk_push_int(ctx, 5);
duk_push_int(ctx, 6);
duk_call(ctx, 2);      /* [ func 5 6 ] -> [ result ] */
printf("function result: %lf\n", (double) duk_get_number(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_pcompile
duk_compile_string
duk_compile_string_filename
duk_compile_lstring
duk_compile_lstring_filename