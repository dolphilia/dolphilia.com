# 演算子

## 概要

Sass は、さまざまな値を扱うための便利な演算子をサポートしています。これらの演算子には、`+` や `*` といった標準的な数学演算子や、その他の様々な型の演算子が含まれます。

- `==` と `!=` は、2つの値が同じかどうかを確認するために使用されます。
- `+, -, *, /, %` は、数値に対する通常の数学的意味を持ち、科学的数学における単位の使用と一致するような単位に対する特別な動作があります。
- `<, <=, >, >=` は、2つの数値が互いに大きいか小さいかをチェックする。
- `and, or, and not` は通常のブーリアン演算を行います。Sassはfalseとnullを除くすべての値を "true "と見なします。
- `+, -, /` は文字列の連結に使用されます。


::: warning

⚠️ Heads up!

Sassの歴史の初期には、色に対する数学的な操作のサポートが追加されました。この演算は色の RGB チャンネルを個別に操作するため、2 色を足すとその赤チャンネルの合計を赤チャンネルとした色が生成され、以下同様となります。

このようなチャンネルごとのRGB演算は、人間の色の感じ方とうまく対応していないため、あまり便利な動作ではありませんでした。より便利な色関数が追加され、色演算は非推奨とされました。LibSassとRuby Sassではまだサポートされていますが、警告が出るので避けることが強く推奨されます。

:::

### 操作順序

Sassは、最も緊密なものから最も緩やかなものまで、かなり標準的な操作順序を持ちます。

- 単項演算子 not, +, -, および /。
- 演算子 *、/、および %。
- `+` および `-` 演算子。
- The >, >=, <, <= 演算子。
- 演算子 == および !=
- and 演算子
- or 演算子
- 利用可能な場合は、=演算子。

```scss
@debug 1 + 2 * 3 == 1 + (2 * 3); // true
@debug true or false and false == true or (false and false); // true
```

#### 括弧内

括弧を使用すると、操作の順序を明示的に制御することができます。括弧の中にある演算は、常に括弧の外にある演算よりも先に評価されます。括弧は入れ子にすることもでき、その場合は最も内側の括弧が最初に評価されます。

```scss
@debug (1 + 2) * 3; // 9
@debug ((1 + 2) * 3 + 4) * 5; // 65
```

### シングルイコールズ

Sassは、関数の引数でのみ使用できる特別な=演算子をサポートしており、2つのオペランドを=で区切って引用符なしの文字列を作成するだけです。これは、非常に古いIE専用の構文との後方互換性のために存在します。

::: code-group

```scss [SCSS]
.transparent-blue {
  filter: chroma(color=#0000ff);
}
```

```css [CSS]
.transparent-blue {
  filter: chroma(color=#0000ff);
}
```

:::


## 等価性

互換性 (単位なしイコール):

- Dart Sass: ✓
- LibSass: ✗
- Ruby Sass: since 4.0.0 (unreleased)
- ▶

等式演算子は、2つの値が同じかどうかを返します。これらは `<expression> == <expression>` と書き、2つの式が等しいかどうかを返し、 `<expression> != <expression>` と書くと、2つの式が等しくないかどうかを返します。2つの値は同じ型、同じ値であれば等しいとみなされますが、型によって意味が異なります。

- 数値は、同じ値で同じ単位の場合、または単位を相互に変換したときに値が等しい場合に等しいとされます。
- 文字列は、引用されていない文字列と引用された文字列が同じ内容であれば等しいとみなされるという点で特殊である。
- 色は、赤、緑、青、アルファ値が同じであれば等しい。
- リストは、その内容が同じであれば等しい。カンマ区切りのリストとスペース区切りのリストは等しくありませんし、括弧付きのリストと括弧なしのリストは等しくありません。
- マップは、キーと値が等しい場合に等しくなります。
- 計算は、その名前と引数がすべて等しい場合に等しくなります。演算の引数はテキストで比較されます。
- true、false、nullはそれ自身としか等しくありません。
- 関数は、同じ関数と等しい。関数は参照で比較されるので、2つの関数が同じ名前と定義を持っていても、同じ場所で定義されていなければ、異なるものとみなされます。

```scss
@debug 1px == 1px; // true
@debug 1px != 1em; // true
@debug 1 != 1px; // true
@debug 96px == 1in; // true

@debug "Helvetica" == Helvetica; // true
@debug "Helvetica" != "Arial"; // true

@debug hsl(34, 35%, 92.1%) == #f2ece4; // true
@debug rgba(179, 115, 153, 0.5) != rgba(179, 115, 153, 0.8); // true

@debug (5px 7px 10px) == (5px 7px 10px); // true
@debug (5px 7px 10px) != (10px 14px 20px); // true
@debug (5px 7px 10px) != (5px, 7px, 10px); // true
@debug (5px 7px 10px) != [5px 7px 10px]; // true

$theme: ("venus": #998099, "nebula": #d2e1dd);
@debug $theme == ("venus": #998099, "nebula": #d2e1dd); // true
@debug $theme != ("venus": #998099, "iron": #dadbdf); // true

@debug true == true; // true
@debug true != false; // true
@debug null != false; // true

@debug get-function("rgba") == get-function("rgba"); // true
@debug get-function("rgba") != get-function("hsla"); // true
```


## リレーショナル

関係演算子は、数値が互いに大きいか小さいかを判断します。また、互換性のある単位間の変換も自動的に行います。

- `<expression> < <expression>` は、最初の式の値が2番目の式の値より小さいかどうかを返します。
- `<expression> <= <expression>` は最初の式の値が2番目の式の値より小さいかどうかを返します。
- `<expression> > <expression>` は最初の式の値が2番目の式の値より大きいかどうかを返します。
- `<expression> >= <expression>` は、最初の式の値が2番目の式の値より大きいかどうかを返します。second’s.

```scss
@debug 100 > 50; // true
@debug 10px < 17px; // true
@debug 96px >= 1in; // true
@debug 1000ms <= 1s; // true
```

単位のない数値は、どんな数値とも比較することができます。自動的にその数値の単位に変換されます。

```scss
@debug 100 > 50px; // true
@debug 10px < 17; // true
```

互換性のないユニットとの数値は比較できない。

```scss
@debug 100px > 10s;
//     ^^^^^^^^^^^
// Error: Incompatible units px and s.
```

## 数値

Sass は、数値のための数学演算子の標準セットをサポートしています。これらは互換性のある単位間で自動的に変換されます。

- `<expression> + <expression>` は最初の式の値を2番目の式に加えます。
- `<expression> - <expression>` は2番目の式の値から1番目の式の値を引きます。
- `<expression> * <expression>` は最初の式の値と2番目の式の値を掛け合わせます。
- `<expression> % <expression>` は最初の式の値を2番目の式の値で割った余りを返します。これはモジュロ演算子として知られています。

```scss
@debug 10s + 15s; // 25s
@debug 1in - 10px; // 0.8958333333in
@debug 5px * 3px; // 15px*px
@debug 1in % 9px; // 0.0625in
```

単位なしの数値は、どのような単位の数値でも使用できます。

```scss
@debug 100px + 50; // 150px
@debug 4s * 10; // 40s
```

単位に互換性のない数値は、加算、減算、モジュロで使用することはできません。

```scss
@debug 100px + 10s;
//     ^^^^^^^^^^^
// Error: Incompatible units px and s.
```

### 単項演算子

単項演算子として、`+` と `-` を書くこともできます。

- `+<expression>` は式の値をそのまま返す。
- `-<expression>` は式の値のマイナス版を返す。

```scss
@debug +(5s + 7s); // 12s
@debug -(50px + 30px); // -80px
@debug -(10px - 15px); // 5px
```

::: warning

⚠️ Heads up!

は引き算と単項の否定の両方を意味するため、スペースで区切られたリストではどちらがどちらかわからなくなることがあります。念のため。

- 引き算をするときは、常に `-` の両側にスペースを入れる。
- 負の数、単項の否定は `-` の前にスペースを書き、後には書かない。
- 単項の否定がスペースで区切られたリストの中にある場合は、括弧でくくる。

Sass における `-` の異なる意味は、以下の順序で優先される。

1. 識別子の一部として `-` を使用することができます。Sass では通常、有効な識別子であれば何でも使用できますが、ユニットにはハイフンの後に数字を含めることはできません。
2. 式とリテラル数値の間の `-` は、空白を含まず、減算としてパースされます。
3. リテラル数値の先頭にある `-` は負数としてパースされます。
4. 空白に関係なく、2つの数値の間にある `-` は、引き算として解析されます。
5. 数値以外の値の前に`-`がある場合、単項の否定として処理されます。

```scss
@debug a-1; // a-1
@debug 5px-3px; // 2px
@debug 5-3; // 2
@debug 1 -2 3; // 1 -2 3

$number: 2;
@debug 1 -$number 3; // -1 3
@debug 1 (-$number) 3; // 1 -2 3
```

:::


### 除算

互換性 (math.div()):

- Dart Sass: since 1.33.0
- LibSass: ✗
- Ruby Sass: ✗

他の数学的操作とは異なり、Sassにおける除算は math.div() 関数で行われます。多くのプログラミング言語では / を除算演算子として使用しますが、CSS では / は区切り文字として使用します (font.Px/32px や hsl(120 100% 50% / 0.8) のように)。15px/32px や hsl(120 100% 50% / 0.8) のように）。Sassは/を除算演算子として使用することをサポートしていますが、これは非推奨であり、将来のバージョンで削除される予定です。

#### スラッシュで区切られた値

Sassがまだ/を除算演算子としてサポートしている間は、/をセパレータとして、/を除算として曖昧さをなくす方法を持たなければなりません。これを実現するために、2つの数値が/で区切られている場合、以下の条件のいずれかが満たされない限り、Sassは結果を分割ではなくスラッシュで区切ったものとして表示するようにします。

- どちらかの式がリテラルな数値以外であること。
- 結果は変数に格納されるか、関数によって返されます。
- 演算は括弧で囲まれます。ただし、括弧が演算を含むリストの外側にある場合は除きます。
- 結果が他の操作の一部として使用される（/以外）。

[list.slash()]を使用すると、強制的に/をセパレータとして使用することができます。

```scss
@use "sass:list";

@debug 15px / 30px; // 15px/30px
@debug (10px + 5px) / 30px; // 0.5
@debug list.slash(10px + 5px, 30px); // 15px/30px

$result: 15px / 30px;
@debug $result; // 0.5

@function fifteen-divided-by-thirty() {
  @return 15px / 30px;
}
@debug fifteen-divided-by-thirty(); // 0.5

@debug (15px/30px); // 0.5
@debug (bold 15px/30px sans-serif); // bold 15px/30px sans-serif
@debug 15px/30px + 1; // 1.5
```

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
// CSS defines one inch as 96 pixels.
@debug 1in + 6px; // 102px or 1.0625in

@debug 1in + 1s;
//     ^^^^^^^^
// Error: Incompatible units s and in.
```

実際の単位計算と同様に、分子に分母の単位と互換性のある単位が含まれていれば（math.div(96px, 1in)など）、それらは相殺されるのです。このため、単位間の変換に使用する比率を簡単に定義することができます。この例では、50ピクセルあたり1秒という速度を設定し、それにトランジションがカバーするピクセル数をかけて、トランジションにかかる時間を算出しています。

::: code-group

```scss
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

```css
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

もし、計算で間違った単位が出た場合は、おそらく計算を確認する必要があります。単位があるはずの量から、単位が抜けている可能性があります。単位を明確にすることで、Sassは何かが正しくないときに役立つエラーを出してくれます。

特に、#{$number}pxのような補間の使用は避けるべきです。これは実際には数字を作成しません!これは数値のように見える引用符で囲まれていない文字列を作成しますが、数値演算や関数では動作しません。数学の単位をきれいにし、$numberがすでにpxという単位を持つようにするか、$number * 1pxと書くようにしましょう。

:::


::: warning

⚠️ Heads up!

Sassのパーセンテージは他の単位と同じように機能します。CSS では小数とパーセントは異なることを意味するため、小数と互換性がありません。例えば、50% は単位が % の数値であり、Sass では 0.5 と異なるものとして扱われます。

math.div($percentage, 100%) は対応する小数を返し、$decimal * 100% は対応するパーセンテージを返します。また、$decimal * 100% をより明示的に記述する方法として math.percentage() 関数を使用することもできます。

:::


## 文字列

Sass は、文字列を生成するいくつかの演算子をサポートしています。

- `<expression> + <expression>` は、両方の式の値を含む文字列を返します。どちらかの値が引用符で囲まれた文字列である場合、結果は引用符で囲まれた文字列となります。
- `<expression> - <expression>` は、-で区切られた両方の式の値を含む、引用符で囲まれていない文字列を返します。これはレガシーな演算子であり、一般的には補間を行う必要があります。

```scss
@debug "Helvetica" + " Neue"; // "Helvetica Neue"
@debug sans- + serif; // sans-serif
@debug sans - serif; // sans-serif
```

これらの演算子は、文字列に対してのみ有効なわけではありません。CSS に書き込むことができるすべての値に対して使用することができます。

- 数値は独自の演算子を持っているので、左辺の値として使用することはできません。
- 色は左辺の値として使用できません。なぜなら、以前は独自の演算子を持っていたからです。

```scss
@debug "Elapsed time: " + 10s; // "Elapsed time: 10s";
@debug true + " is a boolean value"; // "true is a boolean value";
```

::: warning

⚠️ Heads up!

この演算子に頼るよりも、補間を用いて文字列を作成した方が、すっきりして分かりやすいことが多い。

:::


### 単項演算子

歴史的な理由により、Sassは1つの値のみを取る単項演算子として、/と-もサポートしています。

- `/<expression>` は / で始まる引用符で囲まれていない文字列と、その後に続く式の値を返す。
- `-<expression>` は - で始まり、その後に式の値が続く引用符で囲まれていない文字列を返す。

```scss
@debug / 15px; // /15px
@debug - moz; // -moz
```


## ブーリアン

JavaScriptなどの言語とは異なり、Sassはブーリアン演算子に記号ではなく単語を使用します。

- `not <expression>` は式の値の反対を返します。つまり、true を false に、false を true に変えます。
- `<expression> and <expression>` は、両方の式の値が true であれば true を、どちらかが false であれば false を返します。
- `<expression> or <expression>` はどちらかの式の値がtrueであればtrueを、両方がfalseであればfalseを返します。

```scss
@debug not true; // false
@debug not false; // true

@debug true and true; // true
@debug true and false; // false

@debug true or false; // true
@debug false or false; // false
```

### 真実性と虚偽性

true または false が許される場所では、他の値も使用することができます。false と null は虚偽であり、Sass はそれらが虚偽であることを示し、条件を失敗させると考えることを意味します。他のすべての値は真偽があるとみなされ、Sassはそれらをtrueのように動作し、条件を成功させる原因と見なします。

例えば、文字列にスペースが含まれているかどうかをチェックしたい場合は、string.index($string, " ")と書けばよいのです。string.index() 関数は、文字列が見つからなければ null を返し、そうでなければ数値を返します。

::: warning

⚠️ Heads up!

言語によっては、false や null よりも多くの値を falsey と見なすものもあります。Sass はそれらの言語の一つではありません。空の文字列、空のリスト、そして数字の0はすべてSassではtruthyです。

:::