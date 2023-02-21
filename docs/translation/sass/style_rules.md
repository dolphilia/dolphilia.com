# スタイルルール

## 概要

スタイルルールはSassの基礎であり、CSSの基礎と同じです。セレクタでスタイルを設定する要素を選択し、それらの要素がどのように見えるかに影響を与えるプロパティを宣言します。

::: code-group

```scss [SCSS]
.button {
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #e1e4e8;
}
```

```css [CSS]
.button {
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #e1e4e8;
}
```

:::

### ネスティング

しかし、Sassはあなたの生活をより簡単にすることを望んでいます。同じセレクタを何度も繰り返すのではなく、あるスタイルルールを別のルールの中に書くことができます。Sassは自動的に外側のルールのセレクタを内側のルールのセレクタと結合します。

::: code-group

```scss [SCSS]
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

```css [CSS]
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```

:::

::: warning

⚠️ 気をつけよう

ネストされたルールは非常に便利ですが、実際に生成されているCSSの量を可視化するのが難しくなる場合もあります。ネストが深ければ深いほど、CSSを提供するために必要な帯域幅が増え、ブラウザがCSSをレンダリングするために必要な作業量も増えます。セレクタは浅くしましょう。

:::

#### セレクタリスト

入れ子のルールは、セレクタリスト（つまり、カンマで区切られたセレクタ）の扱いに関して巧妙です。それぞれの複合セレクタ（カンマで区切られたもの）は別々にネストされ、その後、セレクタリストに戻されます。

::: code-group

```scss [SCSS]
.alert, .warning {
  ul, p {
    margin-right: 0;
    margin-left: 0;
    padding-bottom: 0;
  }
}
```

```css [CSS]
.alert ul, .alert p, .warning ul, .warning p {
  margin-right: 0;
  margin-left: 0;
  padding-bottom: 0;
}
```

:::

#### セレクターコンビネーター

コンビネータを使用したセレクタも入れ子にすることができます。コンビネータを外側のセレクタの末尾に置いたり内側のセレクタの先頭に置いたり、 あるいはその間に単独で置いたりすることができます。

::: code-group

```scss [SCSS]
ul > {
  li {
    list-style-type: none;
  }
}

h2 {
  + p {
    border-top: 1px solid gray;
  }
}

p {
  ~ {
    span {
      opacity: 0.8;
    }
  }
}
```

```css [CSS]
ul > li {
  list-style-type: none;
}

h2 + p {
  border-top: 1px solid gray;
}

p ~ span {
  opacity: 0.8;
}
```

:::

#### 高度なネスティング

ネストされたスタイル・ルールを、単に子孫の組み合わせ（つまり、空白）で区切って順番に組み合わせるだけではなく、より多くのことを行いたい場合、Sassはあなたの背中を押します。詳しくは親セレクタのドキュメントをご覧ください。

### 補間処理

補間機能を使用すると、変数や関数呼び出しなどの式からセレクタに値を注入することができます。これは mixin を書いているときに特に便利です。 ユーザーが渡すパラメータからセレクタを作成することができるからです。

::: code-group

```scss [SCSS]
@mixin define-emoji($name, $glyph) {
  span.emoji-#{$name} {
    font-family: IconFont;
    font-variant: normal;
    font-weight: normal;
    content: $glyph;
  }
}

@include define-emoji("women-holding-hands", "👭");
```

```css [CSS]
@charset "UTF-8";
span.emoji-women-holding-hands {
  font-family: IconFont;
  font-variant: normal;
  font-weight: normal;
  content: "👭";
}
```

:::

::: tip

💡 楽しい事実

Sass は、補間が解決された後にのみセレクタをパースします。つまり、セレクタのどの部分であっても、パースされないという心配をせずに、安全に補間を使用して生成することができます。

:::

補間と親セレクタの&、@at-rootルール、セレクタ関数を組み合わせることで、セレクタを動的に生成する際に大きな力を発揮することができます。詳しくは、親セレクタのドキュメントを参照してください。

## プロパティ宣言

SassではCSSと同様に、セレクタにマッチした要素がどのようにスタイリングされるかをプロパティ宣言で定義します。しかし、Sass は宣言の記述と自動化を容易にするために、特別な機能を追加しています。まず、宣言の値は SassScript の任意の式にすることができ、評価されて結果に含まれます。

::: code-group

```scss [SCSS]
.circle {
  $size: 100px;
  width: $size;
  height: $size;
  border-radius: $size * 0.5;
}
```

```css [CSS]
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
```

:::

### 補間処理

プロパティの名前に補間を入れることができるので、必要に応じて動的にプロパティを生成することができます。プロパティ名全体を補間することも可能です。

::: code-group

```scss [SCSS]
@mixin prefix($property, $value, $prefixes) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }
  #{$property}: $value;
}

.gray {
  @include prefix(filter, grayscale(50%), moz webkit);
}
```

```css [CSS]
.gray {
  -moz-filter: grayscale(50%);
  -webkit-filter: grayscale(50%);
  filter: grayscale(50%);
}
```

:::

### ネスティング

多くのCSSプロパティは、一種の名前空間として機能する同じ接頭辞で始まります。例えば、font-family、font-size、font-weight は全て font- で始まります。Sassでは、プロパティの宣言をネストできるようにすることで、これを簡単にし、冗長性をなくしました。外側のプロパティ名は、ハイフンで区切られて内側のプロパティ名に追加されます。

::: code-group

```scss [SCSS]
.enlarge {
  font-size: 14px;
  transition: {
    property: font-size;
    duration: 4s;
    delay: 2s;
  }

  &:hover { font-size: 36px; }
}
```

```css [CSS]
.enlarge {
  font-size: 14px;
  transition-property: font-size;
  transition-duration: 4s;
  transition-delay: 2s;
}
.enlarge:hover {
  font-size: 36px;
}
```

:::

Some of these CSS properties have shorthand versions that use the namespace as the property name. For these, you can write both the shorthand value and the more explicit nested versions.

::: code-group

```scss [SCSS]
.info-page {
  margin: auto {
    bottom: 10px;
    top: 2px;
  }
}
```

```css [CSS]
.info-page {
  margin: auto;
  margin-bottom: 10px;
  margin-top: 2px;
}
```

:::

### 隠し宣言

時には、あるプロパティの宣言だけを表示させたい場合があります。宣言の値が null または引用されていない空の文字列である場合、Sass はその宣言を CSS に全くコンパイルしません。

::: code-group

```scss [SCSS]
$rounded-corners: false;

.button {
  border: 1px solid black;
  border-radius: if($rounded-corners, 5px, null);
}
```

```css [CSS]
.button {
  border: 1px solid black;
}
```

### カスタムプロパティ

互換性 (SassScript Syntax):

- Dart Sass: ✓
- LibSass: since 3.5.0
- Ruby Sass: since 3.5.0
- ▶

CSSカスタムプロパティは、CSS変数とも呼ばれ、変わった宣言構文を持っています：宣言値には、ほとんどすべてのテキストが許容されます。さらに、これらの値は JavaScript からアクセス可能であるため、どのような値でもユーザーに関係する可能性があります。これには、通常は SassScript として解析されるような値も含まれます。

このため、Sass はカスタムプロパティ宣言を他のプロパティ宣言とは異なる方法でパースします。SassScript のように見えるものも含め、すべてのトークンはそのまま CSS に渡されます。唯一の例外は補間で、これはカスタムプロパティに動的な値を注入する唯一の方法です。

::: code-group

```scss [SCSS]
$primary: #81899b;
$accent: #302e24;
$warn: #dfa612;

:root {
  --primary: #{$primary};
  --accent: #{$accent};
  --warn: #{$warn};

  // これがSass変数のように見えても、有効なCSSなので評価されません。
  --consumed-by-js: $primary;
}
```

```css [CSS]
:root {
  --primary: #81899b;
  --accent: #302e24;
  --warn: #dfa612;
  --consumed-by-js: $primary;
}
```

:::

::: warning

⚠️ 気をつけよう

残念ながら、補間は文字列から引用符を削除します。そのため、Sass 変数から来る場合、カスタムプロパティの値として引用符付きの文字列を使用することが困難です。回避策として、引用符を保持するために meta.inspect() 関数を使用することができます。

::: code-group

```scss [SCSS]
@use "sass:meta";

$font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
$font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas;

:root {
  --font-family-sans-serif: #{meta.inspect($font-family-sans-serif)};
  --font-family-monospace: #{meta.inspect($font-family-monospace)};
}
```

```css [CSS]
:root {
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas;
}
```

:::

## 親セレクタ

親セレクタ（&）は、Sassが考案した特殊なセレクタで、入れ子になったセレクタの中で外側のセレクタを参照するために使用されます。これにより、擬似クラスの追加や、親の前にセレクタを追加するなど、より複雑な方法で外部セレクタを再利用することが可能になります。

親セレクタが内部セレクタで使用されると、対応する外部セレクタに置き換わります。これは、通常の入れ子の動作の代わりに起こります。

::: code-group

```scss [SCSS]
.alert {
  // 親セレクタは、外側のセレクタに擬似クラスを追加するために使用することができます。
  &:hover {
    font-weight: bold;
  }

  // また、右から左への言語を使用するように設定されたボディなど、特定のコンテキストで外側のセレクタをスタイルするために使用することができます。
  [dir=rtl] & {
    margin-left: 0;
    margin-right: 10px;
  }

  // 擬似クラスセレクタの引数として使用することも可能です。
  :not(&) {
    opacity: 0.8;
  }
}
```

```css [CSS]
.alert:hover {
  font-weight: bold;
}
[dir=rtl] .alert {
  margin-left: 0;
  margin-right: 10px;
}
:not(.alert) {
  opacity: 0.8;
}
```

:::

::: warning

⚠️ 気をつけよう

親セレクタは h1 のようなタイプセレクタに置き換えることができるので、タイプセレクタも許可される複合セレクタの冒頭でのみ許可されます。例えば、span& は許可されません。

しかし、私たちはこの制限を緩和することを検討しています。もし、この制限を緩和することに興味があれば、GitHub issueを参照してください。

:::

### サフィックスの追加

親セレクタを使用して、外部セレクタに追加のサフィックスを追加することもできます。これは、BEMのように高度に構造化されたクラス名を使用する方法論を使用する場合に特に便利です。外部セレクタが英数字の名前で終わっている限り（クラス、ID、要素セレクタのように）、親セレクタを使用して追加のテキストを追加することができます。

::: code-group

```scss [SCSS]
.accordion {
  max-width: 600px;
  margin: 4rem auto;
  width: 90%;
  font-family: "Raleway", sans-serif;
  background: #f4f4f4;

  &__copy {
    display: none;
    padding: 1rem 1.5rem 2rem 1.5rem;
    color: gray;
    line-height: 1.6;
    font-size: 14px;
    font-weight: 500;

    &--open {
      display: block;
    }
  }
}
```

```css [CSS]
.accordion {
  max-width: 600px;
  margin: 4rem auto;
  width: 90%;
  font-family: "Raleway", sans-serif;
  background: #f4f4f4;
}
.accordion__copy {
  display: none;
  padding: 1rem 1.5rem 2rem 1.5rem;
  color: gray;
  line-height: 1.6;
  font-size: 14px;
  font-weight: 500;
}
.accordion__copy--open {
  display: block;
}
```

:::

### SassScriptでは

親セレクタは、SassScript 内でも使用できます。カンマで区切られたリスト (セレクタリスト) とスペースで区切られたリスト (複合セレクタ)、引用符で囲まれていない文字列 (複合セレクタ) から構成されています。

::: code-group

```scss [SCSS]
.main aside:hover,
.sidebar p {
  parent-selector: &;
  // => ((unquote(".main") unquote("aside:hover")),
  //     (unquote(".sidebar") unquote("p")))
}
```

```css [CSS]
.main aside:hover,
.sidebar p {
  parent-selector: .main aside:hover, .sidebar p;
}
```

:::

スタイル ルールの外で & 式が使用された場合、null が返されます。null は虚偽であるため、スタイル ルールの中でミキシンが呼び出されているかどうかを簡単に判断するために使用できることを意味します。

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

:::

#### 高度なネスティング

は通常の SassScript 式として使用できます。つまり、関数に渡したり、他のセレクタに含めたりすることができます。セレクタ関数と @at-root ルールを組み合わせて使用することで、非常に強力な方法でセレクタをネストすることができます。

例えば、外部セレクタと要素セレクタをマッチさせるセレクタを書きたいとします。このようなミキシンを書いて、selector.unify()関数を使って&とユーザーのセレクタを結合させることができます。

::: code-group

```scss [SCSS]
@use "sass:selector";

@mixin unify-parent($child) {
  @at-root #{selector.unify(&, $child)} {
    @content;
  }
}

.wrapper .field {
  @include unify-parent("input") {
    /* ... */
  }
  @include unify-parent("select") {
    /* ... */
  }
}
```

```css [CSS]
.wrapper input.field {
  /* ... */
}

.wrapper select.field {
  /* ... */
}
```

:::

::: warning

⚠️ 気をつけよう

Sassがセレクタをネストしているとき、セレクタを生成するためにどのような補間が使用されたかはわかりません。つまり、SassScript の式として & を使用した場合でも、外側のセレクタを内側のセレクタに自動的に追加してしまうのです。そのため、@at-rootルールを明示的に使用して、Sassに外側のセレクタを含めないように指示する必要があります。

:::

## プレースホルダーセレクタ

Sass には、「プレースホルダー」として知られる特別な種類のセレクタがあります。これはクラスセレクタと同じように見えますが、% で始まり、CSS の出力には含まれません。実際、プレースホルダ セレクタを含む複雑なセレクタ（カンマで囲まれたもの）は CSS に含まれませんし、セレクタがすべてプレースホルダを含むスタイル ルールも含まれません。

::: code-group

```scss [SCSS]
.alert:hover, %strong-alert {
  font-weight: bold;
}

%strong-alert:hover {
  color: red;
}
```

```css [CSS]
.alert:hover {
  font-weight: bold;
}
```

:::

発光しないセレクタの使い道は？それは、まだ拡張できることです。クラスセレクタと違って、プレースホルダは拡張されなくてもCSSが散らかることはありませんし、ライブラリのユーザがHTMLに特定のクラス名を使うことを義務付けることもありません。

::: code-group

```scss [SCSS]
%toolbelt {
  box-sizing: border-box;
  border-top: 1px rgba(#000, .12) solid;
  padding: 16px 0;
  width: 100%;

  &:hover { border: 2px rgba(#000, .5) solid; }
}

.action-buttons {
  @extend %toolbelt;
  color: #4285f4;
}

.reset-buttons {
  @extend %toolbelt;
  color: #cddc39;
}
```

```css [CSS]
.action-buttons, .reset-buttons {
  box-sizing: border-box;
  border-top: 1px rgba(0, 0, 0, 0.12) solid;
  padding: 16px 0;
  width: 100%;
}
.action-buttons:hover, .reset-buttons:hover {
  border: 2px rgba(0, 0, 0, 0.5) solid;
}

.action-buttons {
  color: #4285f4;
}

.reset-buttons {
  color: #cddc39;
}
```

:::

プレースホルダーセレクタは、各スタイルルールが使用される場合とされない場合がある Sass ライブラリを記述する場合に便利です。経験則として、自分のアプリケーションのためだけにスタイルシートを書いている場合、クラスセレクタが利用可能であれば、単にそれを拡張する方が良い場合があります。