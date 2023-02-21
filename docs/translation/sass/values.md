# 値

## 概要

Sassは多くの値型をサポートしており、そのほとんどはCSSから直接来ています。すべての式は値を生成し、変数は値を保持します。ほとんどの値型は CSS から直接来ています。

- 数字。12や100pxのような単位を持つこともあれば、持たないこともある。
- 文字列。"Helvetica Neue "やboldのように引用符を付けても付けなくてもよい。
- 色。16進数表現か、#c6538cやblueのような名前で参照されるか、rgb(107, 113, 127)やhsl(210, 100%, 20%) のように関数から返されることがある。
- 1.5em 1em 0 2em, Helvetica, Arial, sans-serif, [col1-start] のように、スペースやカンマで区切り、角括弧で囲むことも、全く括弧をつけないこともできる値のリストです。

さらにいくつか、Sassに特有のものがあります。

- ブーリアン値 true と false。
- シングルトンのヌル値。
- ("background": red, "foreground": pink) のようなキーと値を関連付けるマップ。
- get-function()で返され、call()で呼び出される関数参照。

## 数値

Sassの数字は2つの要素を持っています: 数字そのものと、その単位です。例えば、16px の場合、数値は 16 で、単位は px です。数値は単位を持たないことも、複雑な単位を持つこともできます。詳細は以下の単位をご覧ください。

```scss
@debug 100; // 100
@debug 0.8; // 0.8
@debug 16px; // 16px
@debug 5px * 2px; // 10px*px (read "square pixels")
```

Sassの数値はCSSの数値と同じフォーマットをサポートしており、科学的記数法（数値と10のべき乗の間にeを付けて表記）も可能です。ブラウザの科学的記数法のサポートは歴史的に不安定なため、Sassは常に完全に展開された数値にコンパイルします。

```scss
@debug 5.2e3; // 5200
@debug 6e-2; // 0.06
```

::: warning

⚠️ Heads up!

Sassは整数と小数を区別しないので、例えば math.div(5, 2) は2ではなく2.5を返します。これはJavaScriptと同じ動作ですが、他の多くのプログラミング言語とは異なります。

:::

### ユニット

Sassは、実際の単位計算の仕組みに基づき、単位を操作するための強力なサポートを持っています。2つの数値が掛け合わされるとき、その単位も掛け合わされます。ある数を別の数で割る場合、その結果は最初の数から分子の単位を、2番目の数から分母の単位を取得します。数字は、分子と分母の両方またはどちらか一方に、任意の数の単位を持つことができます。

```scss
@debug 4px * 6px; // 24px*px (read "square pixels")
@debug math.div(5px, 2s); // 2.5px/s (read "pixels per second")

// 3.125px*deg/s*em (read "pixel-degrees per second-em")
@debug 5px * math.div(math.div(30deg, 2s), 24em); 

$degrees-per-second: math.div(20deg, 1s);
@debug $degrees-per-second; // 20deg/s
@debug math.div(1, $degrees-per-second); // 0.05s/deg
```

::: warning

⚠️ Heads up!

CSSは平方ピクセルのような複雑な単位をサポートしていないため、プロパティ値として複雑な単位を持つ数値を使用するとエラーが発生します。しかし、これは偽装された機能です。正しい単位で終わらない場合は、通常、計算に何か問題があることを意味します。また、@debugルールを使えば、いつでも変数や式の単位をチェックすることができます。

:::

Sassは互換性のある単位を自動的に変換しますが、どの単位を選択するかは使用しているSassの実装に依存します。1in + 1emのように互換性のない単位を組み合わせようとすると、Sassはエラーを投げます。

```scss
// CSSでは1インチを96ピクセルと定義しています。
@debug 1in + 6px; // 102px or 1.0625in

@debug 1in + 1s;
//     ^^^^^^^^
// Error: 非互換のユニットsとin。
```

実際の単位計算と同様に、分子に分母の単位と互換性のある単位が含まれていれば（math.div(96px, 1in)など）、それらは相殺されるのです。このため、単位間の変換に使用する比率を簡単に定義することができます。この例では、50ピクセルあたり1秒という速度を設定し、それにトランジションがカバーするピクセル数をかけて、トランジションにかかる時間を算出しています。

::: code-group

```scss [SCSS]
$transition-speed: math.div(1s, 50px);

@mixin move($left-start, $left-stop) {
  position: absolute;
  left: $left-start;
  transition: left ($left-stop - $left-start) * $transition-speed;

  &:hover {
    left: $left-stop;
  }
}

.slider {
  @include move(10px, 120px);
}
```

```css [CSS]
.slider {
  position: absolute;
  left: 10px;
  transition: left 2.2s;
}
.slider:hover {
  left: 120px;
}
```

:::


::: warning

⚠️ Heads up!

もし、計算で間違った単位が出た場合は、おそらく計算を確認する必要があります。単位があるはずの量から、単位が抜けている可能性があります。単位を明確にすることで、Sassは何かが正しくないときに役立つエラーを出してくれるようになります。

特に、#{$number}pxのような補間の使用は避けるべきです。これは実際には数字を作成しません!これは数値のように見える引用符で囲まれていない文字列を作成しますが、数値演算や関数では動作しません。数学の単位をきれいにし、$numberがすでにpxという単位を持つようにするか、$number * 1pxと書くようにしましょう。

:::

::: warning

⚠️ Heads up!

Sassのパーセンテージは他の単位と同じように機能します。CSS では小数とパーセントは異なることを意味するため、小数と互換性がありません。例えば、50% は単位が % の数値であり、Sass では 0.5 と異なるものとして扱われます。

math.div($percentage, 100%) は対応する小数を返し、$decimal * 100% は対応するパーセンテージを返します。また、$decimal * 100% をより明示的に記述する方法として math.percentage() 関数を使用することもできます。

:::


### 高精度

互換性（10桁の初期値）。

- Dart Sass: ✓
- LibSass: ✗
- Ruby Sass: since 3.5.0
- ▶

Sassの数値は、小数点以下10桁までの精度をサポートしています。これは、いくつかの異なることを意味します。

- 生成される CSS には、小数点以下の最初の 10 桁の数字のみが含まれます。
- のような演算は、小数点以下10桁までが同じであれば、2つの数値を等価と見なします。
- 整数の引数を必要とする list.nth() などの関数では、整数から 0.0000000001 未満の数値は整数であるとみなされます。

```scss
@debug 0.012345678912345; // 0.0123456789
@debug 0.01234567891 == 0.01234567899; // true
@debug 1.00000000009; // 1
@debug 0.99999999991; // 1
```

::: tip

💡 Fun fact:

数値は、精度が関係する場所で使われる場合、10桁の精度に怠惰に丸められます。これは、数学関数が、余分な丸め誤差を蓄積しないように、内部的に完全な数値で動作することを意味します。

:::

## 文字列

文字列とは、文字（特に Unicode コードポイント）の並びのことです。Sass は、内部構造は同じでレンダリングが異なる 2 種類の文字列をサポートしています。"Helvetica Neue" のような引用符付きの文字列と、bold のような引用符なしの文字列（識別子としても知られています）です。これらは、CSSに現れるさまざまな種類のテキストをカバーします。

::: tip

💡 Fun fact:

string.unquote()関数で引用文字列を非引用文字列に変換でき、string.quote()関数で非引用文字列を引用文字列に変換することが可能です。

```scss
@use "sass:string";

@debug string.unquote(".widget:hover"); // .widget:hover
@debug string.quote(bold); // "bold"
```

:::

### Escapes

All Sass strings support the standard CSS escape codes:

- Any character other than a letter from A to F or a number from 0 to 9 (even a newline!) can be included as part of a string by writing \ in front of it.
- Any character can be included as part of a string by writing \ followed by its Unicode code point number written in hexadecimal. You can optionally include a space after the code point number to indicate where the Unicode number ends.

```scss
@debug "\""; // '"'
@debug \.widget; // \.widget
@debug "\a"; // "\a" (改行のみの文字列)
@debug "line1\a line2"; // "line1\a line2"
@debug "Nat + Liz \1F46D"; // "Nat + Liz 👭"
```

::: tip

💡 Fun fact:

文字列への出現が認められている文字については、Unicodeエスケープを記述すると、その文字そのものを記述した場合と全く同じ文字列が生成されます。

:::


### Quoted

引用符で囲まれた文字列は、"Helvetica Neue "のように一重引用符または二重引用符で囲まれて記述されます。文字列には、補間を含むことができ、また、"Helvetica Neue "以外のエスケープされていない文字も含むことができます。

- `\`を、`\\`とエスケープすることができる。
- `'` or `"`のどちらか、その文字列を定義するために使用された方を`\'` or `\"`としてエスケープすることができます。
- `\a`としてエスケープすることができる（末尾のスペースを含む）。

引用された文字列は、元のSass文字列と同じ内容を持つCSS文字列にコンパイルされることが保証されています。正確なフォーマットは実装や設定によって異なる場合があります。ダブルクォートを含む文字列は "\" や '"' にコンパイルされ、非 ASCII 文字はエスケープされる場合とされない場合があります。しかし、すべてのブラウザを含む標準に準拠した CSS 実装では、同じように解析されるはずです。

```scss
@debug "Helvetica Neue"; // "Helvetica Neue"
@debug "C:\\Program Files"; // "C:\\Program Files"
@debug "\"Don't Fear the Reaper\""; // "\"Don't Fear the Reaper\""
@debug "line1\a line2"; // "line1\a line2"

$roboto-variant: "Mono";
@debug "Roboto #{$roboto-variant}"; // "Roboto Mono"
```

::: tip

💡 Fun fact:

引用符で囲まれた文字列が補間によって別の値に注入されるとき、その引用符は取り除かれます!これにより、例えばセレクタを含む文字列を簡単に書くことができ、引用符を付けずにスタイルルールに挿入することができます。

:::

### Unquoted

引用符で囲まれていない文字列は、以下の構文図に従って CSS 識別子として記述される。また、任意の位置で補間を行うことができる。

鉄道図の著作権 © 2018 W3C® (MIT, ERCIM, Keio, Beihang).W3Cの責任、商標、寛容な文書ライセンス規則が適用されます。

```scss
@debug bold; // bold
@debug -webkit-flex; // -webkit-flex
@debug --123; // --123

$prefix: ms;
@debug -#{$prefix}-flex; // -ms-flex
```

::: warning

⚠️ Heads up!

すべての識別子が引用符なしの文字列として解析されるわけではありません。

- CSS の色名は色としてパースされます。
- null は Sass の null 値としてパースされます。
- true と false はブール値としてパースされます。
- not、and、and or はブール演算子として解析されます。

このため、引用符で囲まれていない文字列を使用する CSS プロパティの値を特別に記述する場合を除き、一般に引用符で囲んだ文字列を記述することをお勧めします。

:::

#### 引用されていない文字列のエスケープ

互換性（ノーマライゼーション）:

- Dart Sass: since 1.11.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

引用符で囲まれていない文字列が解析されるとき、エスケープのリテラルテキストは文字列の一部として解析されます。例えば、`\a ` は `\`, a, space という文字として解析されます。しかし、CSSで同じ意味を持つ引用符なしの文字列が同じように解析されるようにするために、これらのエスケープは正規化されます。各コードポイントについて、エスケープされているか、エスケープされていないか。

- もしそれが有効な識別子文字であれば、引用符で囲まれていない文字列の中にエスケープされずに含まれます。例えば、`\1F46D` は引用符で囲まれていない文字列 `👭` を返します。
- もし、改行やタブ以外の文字であれば、 `\.` の後に含まれます。例えば、 `\21` は引用されていない文字列 `\!` を返します。
- そうでない場合は、小文字のUnicodeエスケープが末尾のスペースとともに含まれます。例えば、`\7Fx` は引用符で囲まれていない文字列 `\7f x` を返します。

```scss
@use "sass:string";

@debug \1F46D; // 👭
@debug \21; // \!
@debug \7Fx; // \7f x
@debug string.length(\7Fx); // 5
```

### 文字列インデックス

Sassには、文字列内の文字を参照するインデックスと呼ばれる数値を受け取ったり、返したりする文字列関数が多数あります。インデックス 1 は、文字列の最初の文字を表します。これは、インデックスが0から始まる多くのプログラミング言語とは異なることに注意してください!Sassでは、文字列の終わりを簡単に参照することもできます。インデックス -1 は文字列の最後の文字を指し、-2 は最後から 2 番目の文字を指し、以下同様です。

```scss
@use "sass:string";

@debug string.index("Helvetica Neue", "Helvetica"); // 1
@debug string.index("Helvetica Neue", "Neue"); // 11
@debug string.slice("Roboto Mono", -4); // "Mono"
```


## Colors

互換性 (Level 4 Syntax):

- Dart Sass: since 1.14.0
- LibSass: since 3.6.0
- Ruby Sass: since 3.6.0
- ▶

Sass にはカラーバリューのサポートが組み込まれています。CSS カラーと同様に、sRGB カラースペースのポイントを表しますが、多くの Sass カラー関数は HSL 座標 (sRGB カラーを表現する別の方法) を使用して操作します。Sass の色は、Hex コード (#f2ece4 や #b37399aa) や CSS カラー名 (midnightblue, transparent) 、あるいは関数 rgb(), rgba(), hsl(), hsla() として記述することができます。

```scss
@debug #f2ece4; // #f2ece4
@debug #b37399aa; // rgba(179, 115, 153, 67%)
@debug midnightblue; // #191970
@debug rgb(204, 102, 153); // #c69
@debug rgba(107, 113, 127, 0.8); // rgba(107, 113, 127, 0.8)
@debug hsl(228, 7%, 86%); // #dadbdf
@debug hsla(20, 20%, 85%, 0.7); // rgb(225, 215, 210, 0.7)
```

::: tip

💡 Fun fact:

Sassのカラーが元々どのように書かれていても、HSLベースの関数とRGBベースの関数の両方で使用することが可能です

:::

CSS は、名前、16 進コード、関数表記など、同じ色を表すことができる多くの異なるフォーマットをサポートしています。Sass が色をコンパイルするために選択する形式は、色自体、元のスタイルシートでどのように書かれたか、そして現在の出力モードに依存します。それは非常に大きく変化するので、スタイルシートの作成者は、彼らが書く色のために特定の出力フォーマットに依存してはいけません。

Sassは多くの便利な色関数をサポートしており、色を混ぜ合わせたり、色相、彩度、明度をスケーリングして、既存の色に基づいた新しい色を作成するために使用することができます。

```scss
$venus: #998099;

@debug scale-color($venus, $lightness: +15%); // #a893a8
@debug mix($venus, midnightblue); // #594d85
```

## リスト

互換性 (角型ブラケット):

- Dart Sass: ✓
- LibSass: since 3.5.0
- Ruby Sass: since 3.5.0
- ▶

リストには、他の値のシーケンスが含まれます。Sass では、リスト内の要素はリスト内で一貫性がある限り、コンマ（Helvetica、Arial、sans-serif）、スペース（10px 15px 0 0）、スラッシュで分離することができます。他の多くの言語と異なり、Sass のリストは特別なブラケットを必要としません。スペースまたはカンマで区切られた式はすべてリストとしてカウントされます。しかし、角括弧 ([line1 line2]) を使ってリストを書くことができます。これは grid-template-columns を使うときに便利です。

Sassのリストは1つの要素、または0つの要素を含むことができます。単一要素のリストは `either (<expression>,)` または `[<expression>]` と書くことができ、0要素のリストは () または [] のどちらかで書くことができます。また、すべてのリスト関数は、リストにない個々の値を、その値を含むリストであるかのように扱うので、明示的に単一要素リストを作成する必要はほとんどありません。

::: warning

⚠️ Heads up!

括弧のない空リストは有効なCSSではないので、Sassはプロパティ値でこれを使わせない。

:::

### スラッシュで区切られたリスト

Sass のリストはスラッシュで区切ることができ、font. 12px/30px のような値を表現することができます。12px/30px は font-size と line-height を設定するための省略記法で、 hsl(80 100% 50% / 0.5) は与えられた不透明度の値で色を作成するためのシンタックスです。しかし、スラッシュで区切られたリストは現在、文字通りに書くことはできません。Sassは歴史的に分割を示すために/文字を使用していたので、既存のスタイルシートがmath.div()の使用に移行する間、スラッシュで区切られたリストはlist.slash()を使用してのみ記述することができます。

詳しくはBreaking Changeをご覧ください。スラッシュを分割に使用する」を参照してください。

### リストの使用

Sass には、リストを使用して強力なスタイル・ライブラリを作成したり、アプリケーションのスタイルシートをより簡潔で保守しやすくするための関数がいくつか用意されています。

#### インデックス

これらの関数の多くは、リストの要素を参照するインデックスと呼ばれる数値を受け取るか、返します。インデックス1というのは、リストの最初の要素を表します。これは、インデックスが0から始まる多くのプログラミング言語とは異なることに注意してください!Sassでは、リストの終わりを簡単に参照することもできます。インデックス -1 はリストの最後の要素を参照し、-2 は最後から 2 番目の要素を参照し、...と続きます。

#### 要素へのアクセス

リストから値を取り出すことができなければ、リストはあまり役に立ちません。list.nth($list, $n) 関数を使用すると、リストの指定したインデックスにある要素を取得することができます。最初の引数はリスト自身、2番目の引数は取り出したい値のインデックスです。

```scss
@debug list.nth(10px 12px 16px, 2); // 12px
@debug list.nth([line1, line2, line3], -1); // line3
```

#### すべての要素で何かをする

これは実際には関数を使用しませんが、それでもリストを使用する最も一般的な方法の1つです。eachルールは、リストの各要素に対してスタイルのブロックを評価し、その要素を変数に代入します。

::: code-group

```scss [SCSS]
$sizes: 40px, 50px, 80px;

@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}
```

```css [CSS]
.icon-40px {
  font-size: 40px;
  height: 40px;
  width: 40px;
}

.icon-50px {
  font-size: 50px;
  height: 50px;
  width: 50px;
}

.icon-80px {
  font-size: 80px;
  height: 80px;
  width: 80px;
}
```

:::


#### リストに追加する

リストに要素を追加するのも便利です。list.append($list, $val) 関数は、リストと値を受け取り、値を最後に追加したリストのコピーを返します。Sassのリストは不変なので、元のリストを修正しないことに注意してください。

```scss
@debug append(10px 12px 16px, 25px); // 10px 12px 16px 25px
@debug append([col1-line1], col1-line2); // [col1-line1, col1-line2]
```

#### リスト内の要素を検索する

ある要素がリストの中にあるかどうかを調べたり、 そのインデックスを調べたりするには、 list.index($list, $value) 関数を使用します。これは、リストとそのリストの中で探すべき値を受け取り、 その値のインデックスを返します。

```scss
@debug list.index(1px solid red, 1px); // 1
@debug list.index(1px solid red, solid); // 2
@debug list.index(1px solid red, dashed); // null
```

もしその値がリストにまったく含まれていなければ、list.index() は null を返します。nullは虚偽なので、リストが与えられた値を含むか含まないかをチェックするために、 @ifまたはif()と一緒にlist.index()を使用することができます。

```scss
@use "sass:list";

$valid-sides: top, bottom, left, right;

@mixin attach($side) {
  @if not list.index($valid-sides, $side) {
    @error "#{$side} is not a valid side. Expected one of #{$valid-sides}.";
  }

  // ...
}
```

### 不変性

Sass のリストは不変であり、リスト値のコンテンツは決して変更されません。Sassのリスト関数は、オリジナルを変更するのではなく、すべて新しいリストを返します。不変性により、スタイルシートの異なる部分で同じリストが共有されている場合に忍び込む可能性のある多くのバグを回避することができます。

しかし、新しいリストを同じ変数に代入することによって、時間をかけて状態を更新することができます。これは関数やミキシンの中で、たくさんの値を一つのリストに集めるためによく使われます。

```scss
@use "sass:list";
@use "sass:map";

$prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms);

@function prefixes-for-browsers($browsers) {
  $prefixes: ();
  @each $browser in $browsers {
    $prefixes: list.append($prefixes, map.get($prefixes-by-browser, $browser));
  }
  @return $prefixes;
}

@debug prefixes-for-browsers("firefox" "ie"); // moz ms
```

### 引数リスト

任意の引数を取る mixin や関数を宣言したとき、その値は引数リストとして知られている特別なリストです。これは、mixinや関数に渡されたすべての引数を含むリストのように動作しますが、ひとつだけ特別な機能があります。ユーザーがキーワード引数を渡した場合、引数リストを meta.keywords() 関数に渡せば、マップとしてアクセスすることができるようになります。

::: code-group

```scss [SCSS]
@use "sass:meta";

@mixin syntax-colors($args...) {
  @debug meta.keywords($args);
  // (string: #080, comment: #800, variable: #60b)

  @each $name, $color in meta.keywords($args) {
    pre span.stx-#{$name} {
      color: $color;
    }
  }
}

@include syntax-colors(
  $string: #080,
  $comment: #800,
  $variable: #60b,
)
```

```css [CSS]
pre span.stx-string {
  color: #080;
}

pre span.stx-comment {
  color: #800;
}

pre span.stx-variable {
  color: #60b;
}
```

:::

## 地図

Sassのマップはキーと値のペアを保持し、対応するキーによって値を簡単に検索できるようにします。マップは `(<式>: <式>, <式>: <式>)` と記述されます。の前の式がキーで、後の式がそのキーに対応する値です。キーは一意でなければならないが、値は重複してもよい。リストとは異なり、マップは括弧で囲んで書かなければならない。ペアを持たないマップは()と書く。

::: tip

💡 Fun fact:

鋭い読者は、空のマップ、()は空のリストと同じように書かれることに気づくかもしれない。これは、マップとリストの両方としてカウントされるからだ。実際、すべてのマップはリストとしてカウントされるのだ。すべてのマップは、キーと値のペアごとに2要素のリストを含むリストとしてカウントされる。例えば、(1: 2, 3: 4)は(1 2, 3 4)とカウントされる。

:::

マップでは、任意の Sass 値をそのキーとして使用することができます。演算子は、2つのキーが同じかどうかを判断するために使用されます。

::: warning

⚠️ Heads up!

ほとんどの場合、マップのキーには非引用符で囲まれた文字列ではなく、引用符で囲まれた文字列を使用するのがよいでしょう。これは、色名などの値の中には、引用符で囲まれていない文字列のように見えても、実際には別の型である場合があるからです。混乱を避けるために、引用符で囲んでください。

:::

### マップの使用

マップは有効な CSS の値ではないので、それ自体ではあまり何もできません。そのため、Sass はマップを作成し、マップに含まれる値にアクセスするための関数を多数用意しています。

#### 値を調べる

マップはキーと値を関連付けるものなので、当然ながらキーに関連付けられた値を取得する方法があります: map.get($map, $key) 関数です!この関数は、指定したキーに関連づけられたマップの値を返します。マップにそのキーが含まれていない場合は null を返します。

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.get($font-weights, "medium"); // 500
@debug map.get($font-weights, "extra-bold"); // null
```

#### 一組一組のために何かをする

これは実際には関数を使用しませんが、それでもマップを使用する最も一般的な方法の1つです。@eachルールは、マップのキーと値のペアごとにスタイルのブロックを評価します。キーと値は変数に代入されるので、ブロック内で簡単にアクセスできます。

::: code-group

```scss [SCSS]
$icons: ("eye": "\f112", "start": "\f12e", "stop": "\f12f");

@each $name, $glyph in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
  }
}
```

```css [CSS]
@charset "UTF-8";
.icon-eye:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
}
```

:::

#### 地図に追加する

マップに新しいペアを追加したり、既存のキーの値を置き換えたりすることも便利です。map.set($map, $key, $value)関数はこれを行います：$keyの値を$valueに設定した$mapのコピーを返します。

```scss
@use "sass:map";

$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.set($font-weights, "extra-bold", 900);
// ("regular": 400, "medium": 500, "bold": 700, "extra-bold": 900)
@debug map.set($font-weights, "bold", 900);
// ("regular": 400, "medium": 500, "bold": 900)
```

値をひとつひとつ設定する代わりに、 map.merge($map1, $map2) を使って既存の二つのマップをマージすることもできます。

```scss
@use "sass:map";

$light-weights: ("lightest": 100, "light": 300);
$heavy-weights: ("medium": 500, "bold": 700);

@debug map.merge($light-weights, $heavy-weights);
// ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
```

両方のマップが同じキーを持つ場合、2番目のマップの値が返されるマップに使用されます。

```scss
@use "sass:map";

$weights: ("light": 300, "medium": 500);

@debug map.merge($weights, ("medium": 700));
// ("light": 300, "medium": 700)
```

Sassのマップは不変なので、map.set() と map.merge() は元のリストを修正しないことに注意してください。

### 不変性

Sass のマップは immutable であり、マップの値の内容は決して変更されません。Sassのマップ関数は、オリジナルを修正するのではなく、すべて新しいマップを返します。不変性により、スタイルシートの異なる部分で同じマップが共有されたときに忍び込む可能性のある多くの卑劣なバグを回避することができます。

しかし、新しいマップを同じ変数に代入することによって、時間をかけて状態を更新することはできる。これは関数やミキシンでマップの構成を追跡するためによく使われる。

```scss
@use "sass:map";

$prefixes-by-browser: ("firefox": moz, "safari": webkit, "ie": ms);

@mixin add-browser-prefix($browser, $prefix) {
  $prefixes-by-browser: map.merge($prefixes-by-browser, ($browser: $prefix)) !global;
}

@include add-browser-prefix("opera", o);
@debug $prefixes-by-browser;
// ("firefox": moz, "safari": webkit, "ie": ms, "opera": o)
```

## true と false

ブール値とは、論理値である真と偽のことです。ブール値は、リテラル形式に加えて、等号や関係演算子、また math.comparable() や map.has-key() などの多くの組み込み関数で返されます。

```scss
@use "sass:math";

@debug 1px == 2px; // false
@debug 1px == 1px; // true
@debug 10px < 3px; // false
@debug math.comparable(100px, 3in); // true
```

ブーリアン演算子を使ってブーリアン演算を行うことができます。and演算子は、両辺が真であれば真を返し、or演算子は、どちらか一方が真であれば真を返します。not演算子は、1つの真偽値の反対を返します。

```scss
@debug true and true; // true
@debug true and false; // false

@debug true or false; // true
@debug false or false; // false

@debug not true; // false
@debug not false; // true
```

### ブール値の使用

Sassでは、ブール値を使用して様々なことを行うかどうかを選択することができます。if ルールは、その引数が真である場合にスタイルのブロックを評価します。

::: code-group

```scss [SCSS]
@mixin avatar($size, $circle: false) {
  width: $size;
  height: $size;

  @if $circle {
    border-radius: $size / 2;
  }
}

.square-av {
  @include avatar(100px, $circle: false);
}
.circle-av {
  @include avatar(100px, $circle: true);
}
```

```css [CSS]
.square-av {
  width: 100px;
  height: 100px;
}

.circle-av {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
```

:::


if()関数は、引数がtrueの場合はある値を、falseの場合は別の値を返します。

```scss
@debug if(true, 10px, 30px); // 10px
@debug if(false, 10px, 30px); // 30px
```

### 真実性と虚偽性

true または false が許される場所では、他の値も使用することができます。false と null は虚偽であり、Sass はそれらを虚偽であるとみなし、条件を失敗させることを意味します。他のすべての値は真偽があるとみなされ、Sassはそれらをtrueのように動作し、条件を成功させる原因と見なします。

例えば、文字列にスペースが含まれているかどうかをチェックしたい場合は、string.index($string, " ")と書けばよいのです。string.index() 関数は、文字列が見つからなければ null を返し、そうでなければ数値を返します。

::: warning

⚠️ Heads up!

言語によっては、false や null よりも多くの値を falsey と見なすものもあります。Sass はそれらの言語の一つではありません。空の文字列、空のリスト、そして数字の0はすべてSassではtruthyです。

:::

## null

nullは、その型の唯一の値です。値がないことを表し、結果がないことを示すために関数からよく返されます。

```scss
@use "sass:map";
@use "sass:string";

@debug string.index("Helvetica Neue", "Roboto"); // null
@debug map.get(("large": 20px), "small"); // null
@debug &; // null
```

リストに null が含まれる場合、その null は生成される CSS から省略される。

::: code-group

```scss [SCSS]
$fonts: ("serif": "Helvetica Neue", "monospace": "Consolas");

h3 {
  font: 18px bold map-get($fonts, "sans");
}
```

```css [CSS]
h3 {
  font: 18px bold;
}
```

:::


プロパティ値が NULL の場合、そのプロパティは完全に省略される。

::: code-group

```scss [SCSS]
$fonts: ("serif": "Helvetica Neue", "monospace": "Consolas");

h3 {
  font: {
    size: 18px;
    weight: bold;
    family: map-get($fonts, "sans");
  }
}
```

```css [CSS]
h3 {
  font-size: 18px;
  font-weight: bold;
}
```

:::

nullはfalseでもあり、booleanを取るルールや演算子ではfalseとしてカウントされます。このため、@ifやif()の条件としてnullになりうる値を簡単に使用することができます。

::: code-group

```scss [SCSS]
@mixin app-background($color) {
  #{if(&, '&.app-background', '.app-background')} {
    background-color: $color;
    color: rgba(#fff, 0.75);
  }
}

@include app-background(#036);

.sidebar {
  @include app-background(#c6538c);
}
```

```css [CSS]
.app-background {
  background-color: #036;
  color: rgba(255, 255, 255, 0.75);
}

.sidebar.app-background {
  background-color: #c6538c;
  color: rgba(255, 255, 255, 0.75);
}
```

## 計算

計算とは、Sassがcalc()関数やclamp()、min()、max()などの類似の関数を表現する方法です。Sassは、これらが互いに組み合わされている場合でも、可能な限り簡略化します。

互換性:

- Dart Sass: since 1.40.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

```scss
@debug calc(400px + 10%); // calc(400px + 10%)
@debug calc(400px / 2); // 200px
@debug min(100px, calc(1rem + 10%)); // min(100px, 1rem + 10%)
```

計算には、通常の SassScript とは異なる特別な構文が使用されます。これは CSS の calc() と同じ構文ですが、Sass 変数を使用したり、Sass 関数を呼び出したりする機能が追加されています。つまり、計算の中では / は常に除算演算子となります。

::: tip

💡 Fun fact:

Sass関数呼び出しの引数は、特別な計算構文ではなく、通常のSass構文を使用します!

:::

また、計算の中で補間を使うこともできます。しかし、その場合、補間を囲む括弧の中は簡略化されたり、タイプチェックされたりしないので、余計に冗長なCSSになってしまったり、無効なCSSになってしまったりすることがあります。calc(10px + #{$var}) と書くより calc(10px + $var) と書けばいいのです!

### 簡略化

Sass は、1in + 10px や 5s * 2 のように、コンパイル時に組み合わせることができる単位を使用する場合、計算の中で隣接する操作を簡略化します。例えば、clamp(0px, 30px, 20px) は 20px を返します。

::: warning

⚠️ Heads up!

つまり、計算式が必ずしも計算を返すとは限らないのです!Sassライブラリを書いている場合は、常にmeta.type-of()関数を使用して、扱っている型を決定することができます。

:::

計算は、他の計算の中でも簡略化されます。特に、calc()が他の計算の中で終わっている場合、関数呼び出しは削除され、単なる古い操作に置き換えられます。

::: code-group

```scss [SCSS]
$width: calc(400px + 10%);

.sidebar {
  width: $width;
  padding-left: calc($width / 4);
}
```

```css [CSS]
.sidebar {
  width: calc(400px + 10%);
  padding-left: calc($width / 4);
}
```

:::


### オペレーション

SassScript の + や * といった通常の操作では、計算を行うことはできません。もし、計算ができる数学関数を書きたいのであれば、それらを独自の calc() 式の中に書けばいいのです。もし、互換性のある単位で数字の束を渡されれば、普通の数字も返しますし、計算を渡されれば、計算を返します。

この制限は、計算が必要とされない場合、できるだけ早くエラーを投げるようにするために設けられている。例えば、CSS 識別子（.item-#{$n} など）には使用できませんし、Sass の組み込み数学関数にも渡すことができません。SassScript の操作をプレーンな数値に割り当てることで、計算が許可される場所と許可されない場所を明確にすることができます。

```scss
$width: calc(100% + 10px);
@debug $width * 2; // Error!
@debug calc($width * 2); // calc((100% + 10px) * 2);
```

### min() and max()

互換性 (特殊関数構文):

- Dart Sass: since >=1.11.0 <1.42.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

CSSはValues and Units Level 4でmin()とmax()関数のサポートを追加し、そこからiPhoneXをサポートするためにSafariですぐに採用されました。しかし、Sassはこれよりずっと前に独自のmin()とmax()関数をサポートしており、既存のすべてのスタイルシートと後方互換性を持つ必要がありました。そのため、特別な構文の巧妙さが必要となった。

min()またはmax()関数の呼び出しが有効な計算式である場合、それは計算として解析されます。しかし、計算式でサポートされていない SassScript の機能、例えば modulo 演算子などが含まれるとすぐに、代わりに Sass のコア min() または max() 関数の呼び出しとして解析されます。

計算は可能な限り数値に簡略化されるので、実質的な違いはSassの関数がビルド時に組み合わせられる単位のみをサポートするということだけです。

::: warning

⚠️ Heads up!

しかし、min()とmax()は違います。歴史的な理由で単位/単位なしの混合を許可しているグローバルなSass min() と max() 関数の下位互換性のために、これらの単位は、それらが直接 min() または max() 計算内に含まれている限り混合することが可能です。

:::


::: code-group

```scss [SCSS]
$padding: 12px;

.post {
  // これらのmax()呼び出しは有効な計算式であるため、
  // 計算として解析される。
  padding-left: max($padding, env(safe-area-inset-left));
  padding-right: max($padding, env(safe-area-inset-right));
}

.sidebar {
  // これらは SassScript 専用の modulo 演算子を使用するため、
  // SassScript の関数呼び出しとして解析されます。
  padding-left: max($padding % 10, 20px);
  padding-right: max($padding % 10, 20px);
}
```

```css
.post {
  padding-left: max(12px, env(safe-area-inset-left));
  padding-right: max(12px, env(safe-area-inset-right));
}

.sidebar {
  padding-left: 20px;
  padding-right: 20px;
}
```

:::

## 関数

互換性 (引数の種類):

- Dart Sass: ✓
- LibSass: since 3.5.0
- Ruby Sass: since 3.5.0
- ▶

関数も値になる!関数を直接値として書くことはできませんが、関数の名前をmeta.get-function()関数に渡すと、それを値として取得することができます。関数の値を取得したら、それをmeta.call()関数に渡して呼び出すことができます。これは、他の関数を呼び出すような高次の関数を書くときに便利です。

::: code-group

```scss
@use "sass:list";
@use "sass:meta";
@use "sass:string";

/// condition が `true` を返すすべての要素を削除した $list のコピーを返します。
@function remove-where($list, $condition) {
  $new-list: ();
  $separator: list.separator($list);
  @each $element in $list {
    @if not meta.call($condition, $element) {
      $new-list: list.append($new-list, $element, $separator: $separator);
    }
  }
  @return $new-list;
}

$fonts: Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif;

content {
  @function contains-helvetica($string) {
    @return string.index($string, "Helvetica");
  }
  font-family: remove-where($fonts, meta.get-function("contains-helvetica"));
}
```

```css
.content {
  font-family: Tahoma, Geneva, Arial, sans-serif;
}
```

:::