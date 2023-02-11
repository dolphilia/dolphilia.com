# API Cタイプ

## 概要

Duktape APIは、エキゾチックなプラットフォームへの移植性を確保するために、duk_int_tのようなtypedefでラップされたCの型をほぼ独占的に使用しています。この記事では、いくつかの背景を説明し、型を要約し、呼び出し側のコードが移植性を最大化するためにどのように型を使用すべきかを説明します。

## Duktape APIを使用するコードのためのガイドライン

移植性を最大化するために、変数を宣言する際にはduk_idx_tやduk_ret_t（後述）のようなDuktape型を使ってください。あるいは、（intやlongのような）普通の型を使うこともできますが、コードの移植性は低くなり、警告を避けるためにキャストを使用する必要があるかもしれません。long は、プラットフォームによっては 16 ビット幅しかない int よりも優れたデフォルトの整数型であることに注意してください。

printf()フォーマットでは、Duktape型をワイドな整数型にキャストし、標準的なフォーマット指定子を使用して、型と指定子が常に一致するようにします。整数の場合、longとunsigned longは、C99/C++11を必要とせず、通常Duktapeの型指定で使用される全ての整数値を保持できるため、通常良い選択となります。例えば

```c
printf("Result: %ld\n", (long) duk_get_int(ctx, -3));
```

ANSI Cフォーマット文字列をサポートするDuktape APIコールは、プラットフォーム のvsnprintf()関数にフォーマット文字列とコール引数を渡すだけです。移植性を最大化するために、書式指定子は慎重に選択し、型が一致するように引数をキャストしてください。例えば

```c
duk_int_t val = 123;
duk_push_sprintf(ctx, "My integer: %ld", (long) val);
```

いくつかの標準的な書式指定子。

|     Type      |                               Specifier                               |
| ------------- | --------------------------------------------------------------------- |
| long          | %ld                                                                   |
| unsigned long | %lu                                                                   |
| double        | %f or %lf for printf(), %lf for scanf()                               |
| size_t        | %zu in C99, C99以前のコンパイラには、様々なカスタム指定子があります。 |
| intmax_t      | %jd in C99                                                            |
| uintmax_t     | %ju in C99                                                            |

printf()とscanf()で使用されるフォーマット指定子は異なる場合がありま す。scanf()では、標準の型と標準のフォーマット・コードを使用し、必要に応じて Duktapeの型にキャストしてください。この場合も、longとunsigned longはデフォルトの良い選択です。例えば

```c
long val;
sscanf(my_str, "%ld", &val);
duk_push_int(ctx, (duk_int_t) val);
```

16ビットより大きな定数にはL（またはUL）サフィックスをつけると移植性が高くなります。int型と同様、サフィックスをつけない整数型定数は16ビット幅しか保証されません。Lサフィックスをつけると、最低でも32ビット幅の定数が保証されます。例

```c
duk_push_int(ctx, 1234567L);
```

Duktape 1.xのAPIコールでファイルシステムのパスを引数に取る場合、単にそのパスをfopen()に渡します（Duktape 2.xではファイル入出力APIコールを一切提供していません）。エンコーディングを指定したり、広い文字セットをサポートする方法はありません。これを行うには、プラットフォーム固有のヘルパーを自分で実装する必要があります。

## Duktape APIで使用されているラップ型

ほとんどの場合、これらの型ラッパーについて心配する必要はありません。これは、型のビット数などに関する一般的な仮定が成り立たないエキゾチックな環境を想定しています。

APIドキュメントでは、Duktapeでラップされたtypedef名（duk_idx_tなど）が使用されています。コンパイラが使用する具象型は、プラットフォームとコンパイラに依存します。APIドキュメントでプロトタイプにカーソルを合わせると、C99/C++11の型が利用可能で、プラットフォームのintが少なくとも32ビット幅（最近ではほとんどそうなっています）の場合に、どの具象型が使われるかがツール・チップに表示されます。

次の表は、いくつかの中心的な型定義と、様々な環境（例）で選択される具象型とをまとめたものである。また、この表は、移植性のあるフォーマット/スキャンのために printf() と scanf() のキャストに使用すべきプレーンタイプを示唆しています。

|  Duktape type   | C99/C++11 32-bit int | Legacy 32-bit int | Legacy 16-bit int |        printf        |        scanf         |                                                         Notes                                                         |
| --------------- | -------------------- | ----------------- | ----------------- | -------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| duk_int_t       | int                  | int               | long              | %ld<br>long          | %ld<br>long          | オールラウンドな整数型、範囲は [DUK_INT_MIN, DUK_INT_MAX] です。                                                      |
| duk_uint_t      | unsigned int         | unsigned int      | unsigned long     | %lu<br>unsigned long | %lu<br>unsigned long | オールラウンドな符号なし整数型、範囲は [0, DUK_UINT_MAX] です。                                                       |
| duk_int32_t     | int32_t              | int               | long              | %ld<br>long          | %ld<br>long          | ToInt32() の強制適用のための正確な型                                                                                  |
| duk_uint32_t    | uint32_t             | unsigned int      | unsigned long     | %lu<br>unsigned long | %lu<br>unsigned long | ToUint32()強制のための正確な型                                                                                        |
| duk_uint16_t    | uint16_t             | unsigned short    | unsigned short    | %u<br>unsigned int   | %u<br>unsigned int   | ToUint16()強制のための正確な型                                                                                        |
| duk_idx_t       | int                  | int               | long              | %ld<br>long          | %ld<br>long          | 値スタックインデックス                                                                                                |
| duk_uarridx_t   | unsigned int         | unsigned int      | unsigned long     | %lu<br>unsigned long | %lu<br>unsigned long | ECMAScriptの配列インデックス                                                                                          |
| duk_codepoint_t | int                  | int               | long              | %ld<br>long          | %ld<br>long          | ユニコードコードポイント                                                                                              |
| duk_errcode_t   | int                  | int               | long              | %ld<br>long          | %ld<br>long          | Duktape APIで使用される整数エラーコード（ユーザーコードの範囲は[1,16777215]）。                                       |
| duk_bool_t      | int                  | int               | int               | %d<br>int            | %d<br>int            | ブール値の返り値                                                                                                      |
| duk_ret_t       | int                  | int               | int               | %d<br>int            | %d<br>int            | Duktape/C関数の戻り値                                                                                                 |
| duk_size_t      | size_t               | size_t            | size_t            | %lu<br>unsigned long | %lu<br>unsigned long | 現在1:1マッピング、将来の使用のためにラップされる。範囲は [0, DUK_SIZE_MAX] です。C99 フォーマット指定子は %zu です。 |
| duk_double_t    | double               | double            | double            | %f or %lf<br>double  | %lf<br>double        | 現在は1:1マッピング、将来はカスタムソフトウェア浮動小数点ライブラリなどのためにラップされます。                       |

## C/C++の型付け問題の背景

このセクションでは、C言語の型付けに関する背景と根拠を説明します。

ポータブルな C/C++ のタイピングは、以下のような複雑な問題を含んでいます。

- C99、C++11、および古い環境に対するポータブルな型検出。
- 利用可能な型のビットサイズと範囲、最適な型の選択（例えば、最小または正確なビットサイズが保証された最も高速または最小の型）。
- INT_MINのような型範囲用の定数。
- printf()やscanf()のフォーマット文字列で型が使用される場合のフォーマット指定子。

(Duktapeは、2の補数演算が可能なプラットフォームでのみ動作します)。

### ビットサイズが標準ではない（高速な32ビット型が保証されていない）

intのような一般的な型のビットサイズは、実装によって異なる。C99/C++11では、int32_t（正確な符号付き32ビット型）やint_fast32_t（少なくとも符号付き32ビット範囲を持つ高速整数型）といった標準的な整数の型定義が提供されています。これらの型定義は古いコンパイラでは利用できないので，プラットフォームに依存した型検出が必要です．

Duktapeは、アーキテクチャにとって便利で、なおかつ32ビット幅が保証された 整数型を必要としています。このような型は、配列のインデックスやUnicodeポイントなどを表現するのに必要です。しかし、そのような標準的な型はなく、少なくとも以下のようなバリエーションが見受けられます。

- 16 ビット int と 32 ビット long
- 32ビットintと32ビットlong
- 32ビットintと64ビットlong（64ビットlongはプロセッサにとって非効率的です
- 64ビットintとlong

見ての通り、全てのケースにおいてCの組み込み型は適切ではないので、型検出が必要です。Duktapeはこれらの目的のためにduk_int_t型（CPUに都合の良い、少なくとも32ビット幅）を検出し、定義しています。通常、Duktapeがint型が32ビット幅以上であることを確実に検出できる場合、それはint型にマッピングされます。そうでない場合、C99型が利用可能であればint_fast32_tが使われます。C99型が利用できない場合、Duktapeはプラットフォーム特有の検出を行い、適切な型を決定します。duk_uint_t は同じですが、符号なしです。API の他のほとんどの型（duk_idx_t など）は duk_(u)int_t にマップされていますが、これは将来必要に応じて変更される可能性があります。

他の特殊な型も必要です。例えば、N ビット幅の整数も、いくつかのケースで適切なオーバーフロー動作を保証するために必要です。

### Format specifiers

C/C++の型はprintf()やscanf()でよく使われ、それぞれの型は書式指定子を持つ。書式指定子のセットは部分的にしか標準化されていませんが(例えば、ビットサイズに関係なく、intには%dが使われます)、カスタムコードが使われることもあります。

型ラッパーを使用する場合、正しいフォーマットコードは型検知に依存する。例えば、duk_int_t は少なくとも 32 ビット幅を持つ便利な整数型にマップされます。あるプラットフォームでは、基礎となる型はint（書式指定子 %d）かもしれませんし、別のプラットフォームではlong（書式指定子 %ld）かもしれません。呼び出し側のコードは、プリプロセッサの定義から適切な書式を取得するか、固定書式指定子を使用して引数をキャストしない限り、このような値を文字列書式で安全に使用することができません。

```c
duk_int_t val = /* ... */;

/* 型と形式が一致するように値をキャストします。  適切なキャスト先を選択することは問題であり、呼び出し側は「安全策」をとらなければならない。  C99の型に頼らずとも、符号付き整数の場合は通常 "long "がよいでしょう。
 */
printf("value is: %ld\n", (long) val);

/* C99 型を想定した場合（移植性が制限される）、maxint_t はすべての符号付き整数を表すことが保証されており、標準的な書式指定子 "%jd" を持つ。  符号なし値に対しては、umaxint_t と "%ju" である。
 */
printf("value is: %jd\n", (maxint_t) val);
```

C99では、inttypes.hにC99型のプリプロセッサ定義があります。例えば、int_fast32_tのprintf()10進フォーマット指定子は、PRIdFAST32です。

```c
int_fast32_t val = /* ... */;

printf("value is: " PRIdFAST32 "\n", val);
```

Duktapeは現在、フォーマット指定子定義のためのラッパーを提供していません。

printf()とscanf()の書式指定子は異なるかもしれません。その理由の1つは、printf()ではfloat引数が自動的にdoubleに昇格されますが、 scanf()では別個の型として扱われるからです。http://stackoverflow.com/questions/210590/why-does-scanf-need-lf-for-doubles-when-printf-is-okay-with-just-f を参照してください。

printf()におけるdoubleのための正しい書式指定子は%fです(float値は自動的にdoubleに昇格します)が、%lfも受け入れられます。Duktapeの例では、わかりやすくするために後者が使われています。http://stackoverflow.com/questions/4264127/correct-format-specifier-for-double-in-printf を参照してください。