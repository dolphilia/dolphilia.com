## duk_push_literal() 

2.3.0 stack literal

### プロトタイプ

```c
const char *duk_push_literal(duk_context *ctx, const char *str_literal);
```

### スタック

| ... | -> | ... | str |

### 要約

C 言語のリテラルをスタックにプッシュし、インターンした文字列データ領域へのポインタを返す（引数リテラルと同じであってもなくてもよい）。引数str_literal。

は、例えばsizeof(str)を使って操作できる、 "foo "のような非NULLのCリテラルでなければなりません。sizeof()は、自動的なNULターミネータを含む文字列長（例えば、 sizeof("foo") は4）を生成します。
データ内容が不変であること。すなわち、読み取り専用メモリ、または書き込み可能なメモリであるが、変更されないことが保証されていること。
内部のNUL文字を含んではならず、Cの文字列と同様に終端NULを持たなければならない。
引数str_literalはAPIマクロにより複数回評価される場合があります。str_literalの引数に対して、実行時のNULLポインタチェックは行われませんので、NULLを渡すとメモリセーフでない動作になります。

このコールは概念的には duk_push_string() と同じです。呼び出し側のコードは、フットプリントや速度のわずかな違いが問題となる場合にのみ、これを使用する必要があります。不変のCリテラルが持つ特性により、Duktape内部でちょっとした最適化が可能です。

文字列の長さは、コンパイル時に sizeof(str_literal) - 1 を使って、呼び出し側で計算することができます。
デフォルトでは、Cリテラル（duk_push_literal()またはduk_get_prop_literal()のようなリテラル便利コール）を介してアクセスされるヒープ文字列は、次のマーク＆スイープラウンドまで自動的に固定され、Cリテラルアドレスを固定された内部ヒープ文字列にマップするためのルックアップキャッシュが存在します。この最適化では、文字列の重複排除（一般的ですが、保証されていません）を想定していません。
文字列データは不変であると仮定しているので、内部文字列表現はコピーを作成する代わりにデータを指すだけでよいのです。(Duktape 2.5では、この最適化は行われていません）。
入力文字列が内部に NUL 文字を含む可能性がある場合、代わりに duk_push_lstring() を使ってください。duk_push_literal() での埋め込み NUL の扱いは設定オプションに依存し、呼び出し側のコードは 決してその挙動に依存してはいけません。


### 例

```c
/* Basic case. */
duk_push_literal(ctx, "foo");

/* Argument may involve compile time concatenation and parentheses. */
duk_push_literal(ctx, ("foo" "bar"));

/* Argument may also be e.g. DUK_HIDDEN_SYMBOL() which produces a literal. */
duk_push_literal(ctx, DUK_HIDDEN_SYMBOL("mySymbol"));
```