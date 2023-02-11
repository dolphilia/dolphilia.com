## プライマリーテスト

入門：行処理の例では、ECMAScriptでは簡単だがCでは難しいことを、CコードがECMAScriptに呼び出すことができることを説明しました。

この記事の例はその逆で、ECMAScript のコードが C のコードを呼び出す方法を説明します：スクリプトは多くのことに有用ですが、低レベルのバイトや文字処理には最適ではありません。最適化された C ヘルパーを呼び出すことができれば、スクリプト・ロジックの大部分を美しい ECMAScript で書き、パフォーマンスが重要な部分については C を呼び出すことができます。ネイティブ関数を使用するもう一つの理由は、ネイティブライブラリへのアクセスを提供することです。

ネイティブ関数を実装するには、Duktape/Cバインディングという特別な呼び出し方法に従った普通のC関数を書きます。Duktape/C関数は1つの引数（Duktapeコンテキスト）を取り、エラーまたは戻り値の数を示す1つの値を返します。関数は、Duktape APIで操作されたDuktapeコンテキストの値スタックを介して、呼び出しの引数にアクセスし、戻り値を提供します。Duktape/CバインディングとDuktape APIについては、後ほど詳しく説明します。

### 簡単な例：数値を二乗する

簡単な例を挙げます。

```c
duk_ret_t my_native_func(duk_context *ctx) {
    double arg = duk_require_number(ctx, 0 /*index*/);
    duk_push_number(ctx, arg * arg);
    return 1;
}
```


これを一行ずつ見ていきましょう。

```c
double arg = duk_require_number(ctx, 0 /*index*/);
```


値スタックインデックス0（スタックの底、関数呼び出しの第1引数）の数値が数値であるかどうかをチェックし、そうでない場合はエラーを投げて決して戻りません。値が数値の場合、doubleとして返す。

```c
duk_push_number(ctx, arg * arg);
```

引数の2乗を計算し、値スタックにプッシュする。

```c
return 1;
```


関数呼び出しから戻り、値スタックの最上位に（単一の）戻り値があることを示す。複数の戻り値はまだサポートされていません。0を返して戻り値がないことを示すこともできますが、その場合DuktapeのデフォルトはECMAScriptのundefinedになります。負の戻り値は、自動的にエラーをスローします。これは、エラーをスローするための便利な省略記法です。Duktape は、関数が戻った時に自動的にその処理を行います。詳しくは、プログラミング・モデルを参照してください。

### プライマリーテスト

ECMAScriptのアルゴリズムを高速化するためにネイティブコードを使用する例として、プリマリティテストを使用することにします。具体的には、私たちのテストプログラムは1000000以下のプリムで、数字'9999'で終わるものを探します。このプログラムのECMAScriptバージョンは次の通りです。

- https://github.com/svaarala/duktape/blob/master/examples/guide/prime.js

このプログラムはネイティブヘルパーがあればそれを使い、なければECMAScriptバージョンにフォールバックすることに注意してください。これにより、ECMAScriptのコードは他の含むプログラムで使用することができます。また、プライムチェックのプログラムが、変更しないとネイティブ版がコンパイルできない別のプラットフォームに移植された場合、ヘルパーが移植されるまで、プログラムは（速度は遅いですが）機能し続けます。この場合、ネイティブヘルパーの検出はスクリプトがロードされたときに行われます。また、実際にコードが呼び出されたときに検出することもでき、より柔軟な対応が可能です。

primeCheckECMAScript() と同等の機能を持つネイティブヘルパーは、 非常に簡単に実装することができます。プログラムmainを追加し、ECMAScriptグローバルオブジェクトに単純なprint()バインディングを追加すると、primecheck.cが得られます。

- https://github.com/svaarala/duktape/blob/master/examples/guide/primecheck.c

Getting started: line processingと比較した新しいコールは、一行一行です。

```c
int val = duk_require_int(ctx, 0);
int lim = duk_require_int(ctx, 1);
```

これらの 2 つのコールは、ネイティブヘルパーに与えられた 2 つの引数値をチェックします。もし値が ECMAScript の数値型でない場合はエラーがスローされます。数値であれば、その値は整数に変換され、val と lim ロケールに代入されます。インデックス 0 は最初の関数引数を、インデックス 1 は 2 番目の関数引数を指します。

技術的には、duk_require_int() は duk_int_t を返します。この間接型は、int が 16 ビット幅しかない稀なプラットフォームを除いて、常に int にマップされます。通常のアプリケーションコードでは、このことを気にする必要はありません。

```c
duk_push_false(ctx);
return 1;
```

ECMAScript の false を値スタックにプッシュします。C の戻り値 1 は、ECMAScript の呼び出し元に false 値が返されることを示す。

```c
duk_push_global_object(ctx);
duk_push_c_function(ctx, native_prime_check, 2 /*nargs*/);
duk_put_prop_string(ctx, -2, "primeCheckNative");
```


最初の呼び出しは、前と同様に、ECMAScript グローバルオブジェクトを値スタックにプッシュします。2 番目の呼び出しは ECMAScript Function オブジェクトを作成し、それを値スタックにプッシュします。この Function オブジェクトは Duktape/C の関数 native_prime_check() に束縛されています：ここで作成された ECMAScript 関数が ECMAScript から呼び出されると、C 関数が呼び出されます。第2呼び出し引数(2)は、C関数が値スタック上にいくつの引数を取得するかを示す。呼び出し側が与える引数が少なければ、不足する引数は undefined で埋められ、呼び出し側が与える引数が多ければ、余分な引数は自動的に削除される。最後に、3回目の呼び出しで、関数オブジェクトを primeCheckNative という名前でグローバルオブジェクトに登録し、関数値をスタックからポップアウトします。

```c
duk_get_prop_string(ctx, -1, "primeTest");
if (duk_pcall(ctx, 0) != 0) {
    printf("Error: %s\n", duk_safe_to_string(ctx, -1));
}
duk_pop(ctx);  /* ignore result */
```


ここに来たとき、値スタックはすでにスタックの一番上にグローバルオブジェクトを含んでいます。1 行目は、グローバルオブジェクト（ロードされたスクリプトによって定義された）から primeTest 関数を検索しています。2-4 行目は、primeTest 関数を引数ゼロで呼び出し、エラーが発生した場合は安全にプリントアウトします。5 行目では、呼び出しの結果をスタックから取り出しています。

### コンパイルと実行

前回と同様にコンパイルします。

```sh
# src/ contains Duktape sources from the distributable or prepared
# explicitly using tools/configure.py.

$ gcc -std=c99 -o primecheck -Isrc/ src/duktape.c primecheck.c -lm
```


テスト実行、prime.jsがカレントディレクトリにあることを確認します。

```sh
$ time ./primecheck
Have native helper: true
49999 59999 79999 139999 179999 199999 239999 289999 329999 379999 389999
409999 419999 529999 599999 619999 659999 679999 769999 799999 839999 989999

real    0m2.985s
user    0m2.976s
sys 0m0.000s
```


実行時間のほとんどはプライムチェックに費やされるため、プレーンなECMAScriptと比較して大幅なスピードアップを実現しています。prime.jsを編集して、ネイティブヘルパーの使用を無効にすることで確認できます。

```javascript
// Select available helper at load time
var primeCheckHelper = primeCheckECMAScript;
```


再コンパイルして、テストを再実行する。

```sh
$ time ./primecheck
Have native helper: false
49999 59999 79999 139999 179999 199999 239999 289999 329999 379999 389999
409999 419999 529999 599999 619999 659999 679999 769999 799999 839999 989999

real    0m23.609s
user    0m23.573s
sys 0m0.000s
```