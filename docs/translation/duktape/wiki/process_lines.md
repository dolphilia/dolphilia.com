## ライン処理

### 概要

簡単なサンプルプログラムを見てみましょう。このプログラムはCのメインループを使って標準入力から行を読み込み、ECMAScriptヘルパーを呼び出して行を変換し、その結果をプリントアウトします。行処理機能は、正規表現のようなECMAScriptの良いところを利用することができ、Cプログラムを再コンパイルすることなく簡単に変更することができる。

スクリプトのコードはprocess.jsに配置される。行処理関数の例では、プレーンテキストの行をHTMLに変換し、星の間のテキストを自動的に太字にする。

- https://github.com/svaarala/duktape/blob/master/examples/guide/process.js

C言語のコードprocesslines.cは、Duktapeコンテキストを初期化し、スクリプトを評価した後、標準入力から行を処理し、各行に対してprocessLine()を呼び出します。

- https://github.com/svaarala/duktape/blob/master/examples/guide/processlines.c

### processlines.cの内訳

このサンプルコードのDuktape固有の部分を一つ一つ見ていきましょう。ここでは簡潔にするため、いくつかの詳細について説明します。詳細については、プログラミング・モデルを参照してください。

```c
/* For brevity assumes a maximum file length of 16kB. */
static void push_file_as_string(duk_context *ctx, const char *filename) {
    FILE *f;
    size_t len;
    char buf[16384];

    f = fopen(filename, "rb");
    if (f) {
        len = fread((void *) buf, 1, sizeof(buf), f);
        fclose(f);
        duk_push_lstring(ctx, (const char *) buf, (duk_size_t) len);
    } else {
        duk_push_undefined(ctx);
    }
}
```


Duktapeは埋め込み可能なエンジンであり、最小限の仮定を行うため、デフォルトのCまたはECMAScript APIにはファイルI/Oバインディングがありません。上記のヘルパーは、ファイルの内容を文字列としてプッシュする方法の例です。この例では簡潔にするために固定の読み込みバッファを使っていますが、より良い実装ではまずファイルのサイズをチェックして、そのバッファを確保することになるでしょう。Duktapeの配布物には「extras」が含まれており、ファイルI/Oヘルパーを含む、便利なCやECMAScriptヘルパーが提供されています。

```c
ctx = duk_create_heap_default();
if (!ctx) {
    printf("Failed to create a Duktape heap.\n");
    exit(1);
}
```


まず、Duktapeコンテキストを作成します。コンテキストは、値をスタックにプッシュしたりポッピングしたりすることで、ECMAScriptコードと値を交換できるようにします。Duktape APIのほとんどの呼び出しは、値スタックを操作し、スタック上の値をプッシュ、ポッピング、検査します。実運用コードでは、致命的なエラー・ハンドラを設定できるように duk_create_heap() を使用する必要があります。エラー処理のベストプラクティスについては、 エラー処理 を参照してください。

```c
push_file_as_string(ctx, "process.js");
if (duk_peval(ctx) != 0) {
    printf("Error: %s\n", duk_safe_to_string(ctx, -1));
    goto finished;
}

duk_pop(ctx);  /* ignore result */
```


まず、ファイルヘルパーを使って、process.js を文字列としてバリュースタックにプッシュします。それから duk_peval() を使ってスクリプトをコンパイルし、実行します。このスクリプトは、後で使用するために processLine() を ECMAScript グローバルオブジェクトに登録します。保護された呼び出しである duk_peval() はスクリプトの実行に使用され、構文エラーのようなスクリプトのエラーは致命的なエラーを引き起こすことなく捕捉され処理されるようにします。エラーが発生した場合、エラーメッセージは duk_safe_to_string() を使って安全に強制され、さらなるエラーを発生させないことが保証されます。文字列強制の結果は、読み取り専用で NUL 終端の UTF-8 エンコード文字列を指す const char * で、printf() で直接使用することができます。この文字列は、対応する文字列値が値スタック上にある限り、有効である。文字列は、値が値スタックからポップ・オフされると、自動的に解放される。

```c
duk_push_global_object(ctx);
duk_get_prop_string(ctx, -1 /*index*/, "processLine");
```

最初の呼び出しは、ECMAScript のグローバルオブジェクトを値スタックにプッシュします。2 番目の呼び出しは、グローバルオブジェクトの processLine プロパティを検索します (process.js 内のスクリプトで定義されています)。負の値はスタック要素を上から順に参照するので、-1 はスタックの最上位要素であるグローバルオブジェクトを参照します。

```c
duk_push_string(ctx, line);
```


line が指す文字列を値スタックにプッシュする。文字列の長さは、 strlen() のように NUL ターミネータをスキャンすることで自動的に決定されます。Duktape は、文字列がスタックにプッシュされたときにそのコピーを作成するので、呼び出しが返されたときにラインバッファを自由に変更することができる。

```c
if (duk_pcall(ctx, 1 /*nargs*/) != 0) {
    printf("Error: %s\n", duk_safe_to_string(ctx, -1));
} else {
    printf("%s\n", duk_safe_to_string(ctx, -1));
}
duk_pop(ctx);  /* pop result/error */
```


このとき、値スタックに含まれる（スタックは右側に成長する）。

```
[ globalObject processLine line ]
```


duk_pcall() メソッドは、バリュースタック上に指定された数の引数で関数を呼び出し、関数と引数の値の両方を関数の戻り値に置き換えます。ここでは、nargs の数が 1 なので、processLine 関数と行が戻り値に置き換えられ、結果的にバリュースタックは次のようになります。

```
[ globalObject callResult ]
```


この呼び出しは、エラーを捕捉してプリントできるように保護されている。duk_safe_to_string() API 呼び出しは、エラーを安全に印刷するために再び使用されます。一度印刷されると、結果（またはエラー）は値スタックからポップオフされ、グローバルオブジェクトはまだスタックに残ります。

```c
duk_destroy_heap(ctx);
```


最後に、Duktapeコンテキストは破棄され、コンテキストが保持するすべてのリソースが解放されます。この呼び出しによって、値スタックと値スタック上の全ての参照が解放されます。この例では、グローバル・オブジェクトを意図的に値スタックに残しています。これは問題ではありません。ヒープが破壊されたときに値スタックが空でなくても、メモリリークは発生しません。

### コンパイル

単純に次のようにコンパイルします。

```sh
# src/ contains Duktape sources from the distributable or prepared
# explicitly using tools/configure.py.

$ gcc -std=c99 -o processlines -Isrc/ src/duktape.c processlines.c -lm
```


テスト実行、process.jsがカレントディレクトリにあることを確認する。

```sh
$ echo "I like *Sam & Max*." | ./processlines
I like <b>Sam & Max</b>.
```
