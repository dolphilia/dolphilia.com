## duk_safe_call() 

1.0.0 protected call

### プロトタイプ

```c
duk_int_t duk_safe_call(duk_context *ctx, duk_safe_call_function func, void *udata, duk_idx_t nargs, duk_idx_t nrets);
```

### スタック

| ... | arg1 | ... | argN | -> | ... | ret1 | ... | retN |

### 要約

現在のバリュースタックフレーム内で保護された純粋な C 関数呼び出しを実行します (呼び出しはコールスタック上で見えません)。現在のバリュースタックフレーム内の nargs 最上位値は呼び出し引数として識別され、nrets 戻り値は呼び出しが戻った後に提供されます。呼び出し元のコードは、例えば duk_check_stack() を使用して、バリュースタックが nrets のために予約されていること、および予約エラーを処理することを確認する必要があります。

udata (userdata) ポインタは、そのまま func に渡され、バリュースタックを使用せずに、1つまたは複数の C 値をターゲット関数に簡単に渡すことができます。複数の値を渡すには、スタックに確保されたC構造体に値を詰め、その構造体へのポインタをuserdataとして渡します。userdata引数はDuktapeでは解釈されません。もしそれが必要でなければ、単にNULLを渡して、セーフコールターゲットのudata引数を無視してください。

戻り値は

DUK_EXEC_SUCCESS (0) です。call が成功した場合、nargs 引数は nrets の戻り値に置き換えられます。(この戻り値コード定数はゼロであることが保証されているので、「ゼロかゼロ以外か」のチェックで成功を確認することができる)
DUK_EXEC_ERROR: 呼び出しに失敗、nargs 引数は nrets 値に置き換えられ、そのうちの最初の値はエラー値で、残りは未定義です。(例外的なケースとして、例えばバリュースタック上の引数が少なすぎる場合、呼び出しは投げます。かもしれない)。
ほとんどのDuktape APIコールとは異なり、このコールは成功時にゼロを返します。これにより、複数のエラーコードを後で定義することができます。
このコールは現在のバリュースタック・フレーム上で動作するため、スタックの動作とリターン・コードの処理は、他のコール・タイプと少し異なっています。

スタックtopのnargs要素は、funcへの引数として識別され、戻りスタックのための「ベース・インデックス」を確立するように。

```c
(duk_get_top() - nargs)
```

func が戻るとき、その戻り値で、スタックの一番上にプッシュした戻り値の数を示す；複数またはゼロの戻り値も可能です。スタックは、呼び出し前に設定された「基本インデックス」から始まるちょうどnrets個の値が存在するように操作されます。

func はバリュースタックへのフルアクセスを持っているので、意図した引数の下のスタックを変更し、スタックから「ベースインデックス」の下の要素をポップすることさえできることに注意してください。このような要素は、リターン時にスタックが常に一貫した状態になるように、リターン前に未定義の値でリストアされます。

エラーが発生した場合、スタックは「ベースインデックス」にnretsの値を持つことになります。nrets が 0 の場合、スタック上にエラーは存在しない (戻り値のスタックトップは "base index" に等しい) ので、 nrets を 0 としてこの関数を呼び出すと、起こりうるエラーの原因がわからなくなり、あまり役に立たないかもしれない。

nargs = 3, nrets = 2, func returns 4 でのバリュースタックの動作例。パイプ文字は論理的なバリュースタックの境界を示す。

```sh
      .--- frame bottom
      |
      |     .--- "base index"
      v     v
[ ... | ... | a b c ]            stack before calling 'func'

[ ... | ... | a b | x y z w ]    stack after calling 'func', which has
                                 popped one argument and written four
                                 return values (and returned 4)

[ ... | ... | x y ]              stack after duk_safe_call() returns,
                                 2 (= nrets) first 'func' return values
                                 are left at "base index"
```

func は呼び出し元のスタックフレームを使用するので、呼び出し元のコンテキストがわからない限り、 'func' 内でのボトムベースの参照は危険であることに注意してください。
userdata引数はDuktape 2.xで追加されました。

### 例

```c
typedef struct {
  int floor;
} my_safe_args;

duk_ret_t my_safe_func(duk_context *ctx, void *udata) {
    my_safe_args *args = (my_safe_args *) udata;
    double a, b, c, t;

    a = duk_get_number(ctx, -3);
    b = duk_get_number(ctx, -2);
    c = duk_get_number(ctx, -1);  /* ignored on purpose */
    t = a + b;
    if (args->floor) {
        t = floor(t);
    }
    duk_push_number(ctx, t);

    /* Indicates that there is only one return value.  Because the caller
     * requested two (nrets == 2), Duktape will automatically add an
     * additional "undefined" result value.
     */
    return 1;
}

my_safe_args args;  /* C struct whose pointer is passed as userdata */
duk_int_t rc;

args.floor = 1;
duk_push_int(ctx, 10);
duk_push_int(ctx, 11);
duk_push_int(ctx, 12);
rc = duk_safe_call(ctx, my_func, (void *) &args, 3 /*nargs*/, 2 /*nrets*/);
if (rc == DUK_EXEC_SUCCESS) {
    printf("1st return value: %s\n", duk_to_string(ctx, -2));  /* 21 */
    printf("2nd return value: %s\n", duk_to_string(ctx, -1));  /* undefined */
} else {
    printf("error value: %s\n", duk_to_string(ctx, -2));
}
duk_pop_2(ctx);
```