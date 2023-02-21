# シンタックス

[[TOC]]

## 概要

Sassは2つの異なる構文をサポートしています。それぞれを読み込むことができるので、どちらを選択するかはあなたやあなたのチーム次第です。

### SCSS

SCSSの構文は、ファイル拡張子.scssを使用します。わずかな例外を除き、CSSのスーパーセットであり、基本的にすべての有効なCSSはSCSSも有効であることを意味します。CSSと似ているため、最も馴染みやすく、最も普及している構文です。

SCSSは次のようなものです。

```scss
@mixin button-base() {
  @include typography(button);
  @include ripple-surface;
  @include ripple-radius-bounded;

  display: inline-flex;
  position: relative;
  height: $button-height;
  border: none;
  vertical-align: middle;

  &:hover { cursor: pointer; }

  &:disabled {
    color: $mdc-button-disabled-ink-color;
    cursor: default;
    pointer-events: none;
  }
}
```

### インデントされた構文

インデント構文は Sass のオリジナルの構文であり、そのためファイル拡張子として .sass が使用されています。この拡張子のため、単に "Sass" と呼ばれることもあります。インデント構文は SCSS と同じ機能をサポートしていますが、中括弧やセミコロンの代わりにインデントを使用してドキュメントの形式を記述します。

一般に、CSS や SCSS で中括弧を記述する場合は、インデント構文で 1 レベル深くインデントすればよいのです。また、行の終わりはいつでもセミコロンとしてカウントされます。また、インデント構文にはさらにいくつかの違いがあり、このリファレンスの中で説明されています。

::: warning

⚠️ Heads up!

インデント構文は、現在、複数行にまたがる式をサポートしていません。issue #216 を参照してください。

:::

インデントされた構文は次のようになります。

```sass
@mixin button-base()
  @include typography(button)
  @include ripple-surface
  @include ripple-radius-bounded

  display: inline-flex
  position: relative
  height: $button-height
  border: none
  vertical-align: middle

  &:hover
    cursor: pointer

  &:disabled
    color: $mdc-button-disabled-ink-color
    cursor: default
    pointer-events: none
```

## スタイルシートの解析

Sass スタイルシートは、一連の Unicode コードポイントから解析されます。最初にトークンストリームに変換されることなく、直接パースされます。

### 入力エンコーディング

互換性があります。

- Dart Sass: ✗
- LibSass: ✓
- Ruby Sass: ✓
- ▶

ドキュメントが最初はバイト列としてのみ利用可能で、それを Unicode にデコードする必要があることはよくあります。Sass はこのデコードを次のように行います。

- バイト列が U+FEFF BYTE ORDER MARK の UTF-8 または UTF-16 エンコーディングで始まる場合、対応するエンコーディングが使用されます。
- バイト列がプレーンな ASCII 文字列 @charset で始まる場合、Sass はフォールバックエンコーディングを決定するための CSS アルゴリズムのステップ 2 を使用してエンコーディングを決定します。
- それ以外の場合は、UTF-8 が使用されます。

### パースエラー

Sass がスタイルシート内で無効な構文に遭遇すると、パースに失敗し、無効な構文の場所と無効な理由についての情報を含むエラーがユーザーに表示されます。

これは、すぐに失敗するのではなく、ほとんどのエラーから回復する方法を指定するCSSとは異なることに注意してください。これは、SCSSが厳密にはCSSのスーパーセットでない数少ないケースのひとつです。しかし、Sassのユーザーにとっては、CSSの出力にエラーが渡されるよりも、エラーをすぐに確認できる方がはるかに便利です。

パースエラーの位置は、実装固有の API を介してアクセスすることができます。例えば、Dart Sass では SassException.span にアクセスでき、Node Sass と Dart Sass の JS API では、ファイル、行、列のプロパティにアクセスすることが可能です。

## スタイルシートの構造

CSS と同様に、ほとんどの Sass スタイルシートはプロパティ宣言を含むスタイル規則で主に構成されています。しかし、Sass スタイルシートには、これらと並行して存在しうる多くの機能があります。

### ステートメント

Sass スタイルシートは一連のステートメントで構成され、これらのステートメントは結果の CSS を構築するために評価されます。いくつかのステートメントには、他のステートメントを含む { と } を使用して定義されたブロックが含まれることがあります。たとえば、スタイル ルールはブロックを持つステートメントです。このブロックには、プロパティの宣言など、他のステートメントが含まれています。

SCSS では、ステートメントはセミコロンで区切られます（ステートメントがブロックを使用する場合、セミコロンは省略可能です）。インデントされた構文では、それらは単に改行で区切られています。

#### ユニバーサルステートメント

これらのタイプのステートメントは、Sass スタイルシートのどこでも使用することができます。

- $var: valueのような変数宣言。
- @ifや@eachのようなフロー制御のアットルール
- @error、@warn、@debugの規則。

#### CSSステートメント

CSSを記述します。関数の中以外ならどこでも使えます。

- h1 { /* ... */ }のようなスタイルルール。
- @mediaや@font-faceなどのCSSのat-rule。
- Mixinの@includeによる使用
- @at-rootルール。

#### トップレベルステートメント

これらの文は、スタイルシートのトップレベル、またはトップレベルのCSS文の中にネストしてのみ使用することができます。

- モジュールのロード（@useを使用
- importは、@importを使用しています。
- @mixinを使ったMixin定義。
- @functionを使った関数定義

#### その他のステートメント

width: 100px などのプロパティ宣言は、スタイルルールおよび一部の CSS アットルール内でのみ使用可能です。
@extend 規則は、スタイル規則の中でのみ使用可能です。

### 式

式とは、プロパティや変数宣言の右辺に書かれるものである。各式は値を生成します。有効な CSS プロパティーの値はすべて Sass 式でもありますが、Sass 式はプレーンな CSS 値よりもはるかに強力です。Sass 式は mixin や関数への引数として渡され、@if 規則で制御フローに使用され、算術演算で操作されます。Sassの式の構文をSassScriptと呼びます。

#### 文字

最も単純な式は、静的な値を表すだけです。

- 数字。12や100pxのような単位を持つこともあれば、持たないこともある。
- 文字列。"Helvetica Neue "やboldのように引用符があってもなくてもよい。
- 色。16進数表現か、#c6538cやblueのような名前で参照することができる。
- ブーリアンリテラルのtrueとfalse。
- シングルトン null。
- 1.5em 1em 0 2em, Helvetica, Arial, sans-serif, [col1-start] のように、スペースやカンマで区切ったり、角括弧で囲んだり、括弧をつけない値のリスト。
- ("background": red, "foreground": pink)のように、キーと値を関連付けるマップ。

#### 演算子

Sass では、多くの操作のためのシンタックスを定義しています。

- ==と!=は、2つの値が同じかどうかを確認するために使用されます。
- +, -, *, /, %は、数値に対する通常の数学的意味を持ち、科学的数学における単位の使用と一致するような単位に対する特別な動作があります。
- <, <=, >, >=は、2つの数値が互いに大きいか小さいかをチェックする。
- and, or, and not は通常のブーリアン演算を行います。Sassはfalseとnullを除くすべての値を「真」と見なします。
- +,-と / は、文字列の連結に使用できます。
- ( と ) は、操作の優先順位を明示的に制御するために使用されます。

#### その他の表現

- 変数 ($var など)。
- nth($list, 1) や var(-main-bg-color) のような関数呼び出し。Sass コアライブラリ関数やユーザー定義関数を呼び出したり、CSS に直接コンパイルされることがあります。
- calc(1px + 100%) や url(http://myapp.com/assets/logo.png) などの特殊な関数は、独自の解析規則を持っています。
- 親セレクタ、&。
- importantは、引用符で囲まれていない文字列として解析されます。

## コメント

Sassコメントの動作方法は、SCSSとインデント構文とで大きく異なります。どちらの構文も 2 種類のコメントをサポートしています。（通常）CSS にコンパイルされる /* */ を使用して定義されたコメントと、そうでない // を使用して定義されたコメントです。

### SCSSでは

SCSSのコメントは、JavaScriptなどの他の言語のコメントと似たような働きをします。単一行コメントは // で始まり、行末まで続きます。単一行コメントには何も含まれませんが、CSS として出力されます。Sass に関する限り、これらは存在しないも同然です。これらは CSS を生成しないため、サイレント・コメントとも呼ばれます。

複数行のコメントは /* で始まり、次の */ で終わります。もし、複数行コメントが許される場所に書かれた場合、それはCSSコメントにコンパイルされます。無声コメントと対比して、ラウドコメントとも呼ばれます。CSS にコンパイルされる複数行のコメントには補間が含まれることがありますが、これはコメントがコンパイルされる前に評価されます。

デフォルトでは、圧縮モードでコンパイルされた CSS から複数行のコメントが取り除かれます。ただし、コメントが /*!で始まる場合は、常に CSS の出力に含まれます。

::: code-group

```scss [SCSS]
// このコメントはCSSには含まれません。

/* しかし、このコメントは、圧縮モード以外では、そうなります。 */

/* また、補間を含むことも可能です。
 * 1 + 1 = #{1 + 1} */

/*! このコメントは、圧縮モードでも含まれます。 */

p /* 複数行のコメントは、空白が許される場所であれば
   * どこにでも書くことができます。 */ .sans {
  font: Helvetica, // 一行コメントも可能です。
        sans-serif;
}
```

```css [CSS]
/* しかし、このコメントは、圧縮モード以外では、そうなります。 */
/* また、補間を含むことも可能です。
 * 1 + 1 = 2 */
/*! このコメントは、圧縮モードでも含まれます。 */
p .sans {
  font: Helvetica, sans-serif;
}
```

:::

### Sassで

インデント構文でのコメントは、他の構文と同じようにインデントに基づいて動作します。SCSS と同様、// で書かれた無言のコメントは CSS として出力されませんが、SCSS とは異なり、冒頭の // の下にインデントされたものはすべてコメントアウトされます。

で始まるインデントされた構文のコメントは、CSS にコンパイルされることを除いて、インデントと同じように動作します。コメントの拡張はインデントに基づいて行われるため、最後の */ は省略可能です。また、SCSS と同様に、/* コメントは補間を含むことができ、圧縮モードで除去されるのを避けるために /*!

コメントは、インデントされた構文の式の中で使用することもできます。この場合、SCSS と全く同じ構文になります。

::: code-group

```scss [SCSS]
// This comment won't be included in the CSS.
   This is also commented out.

/* But this comment will, except in compressed mode.

/* It can also contain interpolation:
   1 + 1 = #{1 + 1}

/*! This comment will be included even in compressed mode.

p .sans
  font: Helvetica, /* Inline comments must be closed. */ sans-serif
```

```css [CSS]
/* But this comment will, except in compressed mode. */
/* It can also contain interpolation:
 * 1 + 1 = 2 */
/*! This comment will be included even in compressed mode. */
p .sans {
  font: Helvetica, sans-serif;
}
```

:::

### ドキュメンテーション コメント

Sass を使用してスタイル・ライブラリを記述する場合、ライブラリ自体だけでなく、ライブラリが提供するミキシン、関数、変数、プレースホルダー・セレクターを文書化するためにコメントを使用することができます。これらのコメントは、SassDoc ツールによって読み込まれ、美しいドキュメントを生成するために使用されます。Susy グリッドエンジンのドキュメントをチェックして、実際に使用しているところをご覧ください。

ドキュメント・コメントは、無言のコメントであり、ドキュメント対象の直上に 3 つのスラッシュ (///) で記述されます。SassDoc はコメント内のテキストを Markdown として解析し、詳細を記述するための多くの便利な注釈をサポートします。

SCSS

```scss
/// 指数を計算する。
///
/// @param {number} $base
///   掛け合わせる数値。
/// @param {integer (unitless)} $exponent
///   掛け合わせる`$base`の数。
/// @return {number} `base` に `$exponent` のべき乗を乗じたものです。
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}
```

## 特殊機能

CSS は多くの関数を定義していますが、そのほとんどは Sass の通常の関数構文で問題なく動作します。これらは関数呼び出しとして解析され、プレーンな CSS 関数に解決され、そのまま CSS にコンパイルされます。しかし、いくつかの例外があります。それは、SassScript 式として解析することができない特別な構文を持っているものです。特殊な関数呼び出しはすべて引用符で囲まれていない文字列を返します。

## url()

url() 関数は CSS でよく使用されますが、その構文は他の関数とは異なります：url() は引用された URL か引用されていない URL のどちらかを取ることができます。引用符で囲まれていないURLは有効なSassScript式ではないため、Sassはそれをパースするための特別なロジックを必要とします。

url() の引数が有効な引用符で囲まれていない URL である場合、Sass はそれをそのままパースしますが、SassScript の値を埋め込むために補間が使用されることもあります。有効な引用符で囲まれていない URL でない場合、例えば変数や関数呼び出しが含まれている場合、通常の CSS 関数呼び出しとしてパースされます。

::: code-group

```scss [SCSS]
$roboto-font-path: "../fonts/roboto";

@font-face {
    // これは、引用符で囲まれた文字列を受け取る通常の関数呼び出しとして解析されます。
    src: url("#{$roboto-font-path}/Roboto-Thin.woff2") format("woff2");

    font-family: "Roboto";
    font-weight: 100;
}

@font-face {
    // これは、算術式を受け取る通常の関数呼び出しとして解析される。
    src: url($roboto-font-path + "/Roboto-Light.woff2") format("woff2");

    font-family: "Roboto";
    font-weight: 300;
}

@font-face {
    // これは、補間された特殊関数として解析される。
    src: url(#{$roboto-font-path}/Roboto-Regular.woff2) format("woff2");

    font-family: "Roboto";
    font-weight: 400;
}
```

```css [CSS]
@font-face {
  src: url("../fonts/roboto/Roboto-Thin.woff2") format("woff2");
  font-family: "Roboto";
  font-weight: 100;
}
@font-face {
  src: url("../fonts/roboto/Roboto-Light.woff2") format("woff2");
  font-family: "Roboto";
  font-weight: 300;
}
@font-face {
  src: url(../fonts/roboto/Roboto-Regular.woff2) format("woff2");
  font-family: "Roboto";
  font-weight: 400;
}
```

:::

### element(), progid:…(), and expression()

互換性 (calc()):

- Dart Sass: since <1.40.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

互換性 (clamp()):

- Dart Sass: since >=1.31.0 <1.40.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

element() 関数は CSS 仕様で定義されており、その ID は色として解析される可能性があるため、特別な解析が必要である。

expression() と progid: で始まる関数は Internet Explorer のレガシー機能で、非標準の構文が使用されています。これらは最近のブラウザではサポートされていませんが、Sassは後方互換性を保つために、これらの関数を引き続き解析します。

Sass は、ネストされた括弧を含め、これらの関数呼び出しで任意のテキストを許可します。SassScript の式として解釈されるものはありません。ただし、動的な値を挿入するために補間を使用することは可能です。

::: code-group

```scss [SCSS]
$logo-element: logo-bg;

.logo {
  background: element(##{$logo-element});
}
```

```css [CSS]
.logo {
  background: element(#logo-bg);
}
```

:::