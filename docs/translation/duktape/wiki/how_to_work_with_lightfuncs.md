# lightfuncsとの連携方法

## Lightfunc の概要

通常のネイティブ関数が duk_push_c_function() を使って作成される場合、2 つのヒープ割り当てが必要です。

- ECMAScript コードで関数を表現するために Function オブジェクトが作成されます。この関数は内部の duk_hnatfunc 構造体によって表現され、これは汎用 duk_hobject 構造体のサブタイプです。
- 構造体の一般的な duk_hobject の部分は、別々に割り当てられたプロパティテーブルを提供します。
- 構造体の duk_hnatfunc 部分は、ECMAScript コードが関数を呼び出すときに呼び出される Duktape/C 関数を指し、引数カウントや「マジック」値のような様々な関数パラメータを格納します。
- プロパティ・テーブルは、例えば、.lengthプロパティを保持するために割り当てられています。組み込み関数は .name プロパティも持っている。

非常に低メモリ環境では、この表現によるメモリコストは、例えば100個の関数に対して乗算されたときに加算されます。

lightfunc型は、関数オブジェクトを表現するための非常に軽量な代替手段を提供します。lightfunc は、タグ付き値 (duk_tval) を使ってネイティブ関数を表し、ヒープの割り当ては行いませんので、例えば、ブール値を表すよりも多くのスペースを必要としません。具体的には、以下のようになります。

- 具体的には、32 ビットプラットフォームでパックされた duk_tval が使用される場合、lightfuncs は 8 バイトを取ります。このうち 2 バイトがタイプタグ、4 バイトがネイティブ関数ポインタ、そして 2 バイトがフラグになります。flags フィールド（16 ビット）には、関数の引数カウント（nargs）、.length フィールド、および 8 ビットのマジック値が格納されます。
- パックされていない duk_tval が使用されている場合、lightfuncs は通常 16 バイトを必要とします。フィールドは論理的には同じですが、レイアウトが異なります。

lightfuncs に関連するヒープの割り当てがないため、いくつかの制限がありますが、最も重要なものは以下のとおりです。

- Lightfuncs はプロパティ・テーブルを持たないので、プロパティを保持できません。
- その結果、lightfuncs は手動で設定する .name プロパティを持つことができません。ただし、仮想的な .name プロパティはあり、トレースバックなどに表示されます。
- Lightfuncs は、.prototype プロパティを保持することもできません。コンストラクタとして使用することはできますが、作成されるデフォルトのインスタンスは、常に Object.prototype を継承します。ネイティブ関数は、プロトタイプを明示的に上書きするか、「置換値」を返すことができます。ネイティブのコンストラクタ関数の書き方」を参照してください。

lightfuncの名前の例。

```sh
duk> Math.cos.name
= "light_08067ce4_0511"
```

名前は自動生成され、ネイティブ関数ポインタ（ここでは08067ce4）と16ビットフラグフィールド（ここでは0x0511）が含まれます。

http://duktape.org/guide.html#type-lightfunc も参照してください。

## lightfuncsの作成

Lightfuncsは、C言語コードからしか作成することができません。

```c
/* http://duktape.org/api.html#duk_push_c_lightfunc */

duk_push_c_lightfunc(ctx, my_adder, 2 /*nargs*/, 2 /*length*/, 0 /*magic*/);
```

通常、nargs と length フィールドは同じ値を持つ。magicフィールドは、ネイティブ関数が必要としない場合は無視し、0に設定することができます。

## 組み込みlightfuncs関数の作成

ECMAScript の組み込み関数 Math.cos, Array.prototype.join などはすべてデフォルトで普通の Function オブジェクトであり、かなりの量のメモリを消費します（32 ビットの低メモリターゲットで 20kB 以上）。

メモリを節約するために、次のオプションを有効にすることができます。

- duk_use_lightfunc_builtins

有効にすると、ビルトイン関数は初期化中に lightfuncs に変換されます。いくつかのビルトイン関数は、安全に lightfuncs に変換できないので、通常の関数のままです。

このオプションの欠点は、変換されたビルトインは、たとえば、あまり有用でない .nameを持つことです。