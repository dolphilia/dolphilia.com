# 変数

[[TOC]]

## 概要

Sass変数はシンプルです。$で始まる名前に値を代入し、値自体の代わりにその名前を参照することができます。しかし、そのシンプルさにもかかわらず、Sassがもたらす最も便利なツールの一つです。変数によって、繰り返しの削減、複雑な計算、ライブラリの設定、その他多くのことが可能になります。

変数の宣言は、プロパティの宣言とよく似ています。`<variable>: <expression>` と書かれます。プロパティはスタイルルールやアットルールの中でしか宣言できませんが、変数はどこでも好きなところで宣言できます。変数を使うには、それを値の中に含めればいいのです。

::: code-group

```scss [SCSS]
$base-color: #c6538c;
$border-dark: rgba($base-color, 0.88);

.alert {
  border: 1px solid $border-dark;
}
```

```css [CSS]
.alert {
  border: 1px solid rgba(198, 83, 140, 0.88);
}
```

:::


::: warning

⚠️ 気をつけよう

CSSには独自の変数があり、それはSassの変数とは全く異なります。その違いを知ってください。

- Sass変数は、Sassによってすべてコンパイルされます。CSS変数は、CSSの出力に含まれます。
- CSS変数は要素ごとに異なる値を持つことができますが、Sass変数は一度に一つの値しか持ちません。
- Sass変数は命令型です。つまり、ある変数を使用した後にその値を変更すると、先に使用した値はそのまま残ります。CSS変数は宣言的であり、値を変更すると、以前の使用と後の使用の両方に影響します。

::: code-group

```scss [SCSS]
$variable: value 1;
.rule-1 {
  value: $variable;
}

$variable: value 2;
.rule-2 {
  value: $variable;
}
```

```css [CSS]
.rule-1 {
  value: value 1;
}

.rule-2 {
  value: value 2;
}
```

:::

::: tip

💡 楽しい事実

Sass変数は、すべてのSass識別子と同様に、ハイフンとアンダースコアを同一として扱います。つまり、$font-size と $font_size はどちらも同じ変数を指しているということです。これは、Sass のごく初期のころ、識別子の名前にアンダースコアしか使用できなかったころの名残です。SassがCSSの構文に合わせてハイフンのサポートを追加した後、移行を容易にするためにこの2つを等価にしました。

:::


## デフォルト値

通常、変数に値を代入すると、その変数がすでに値を持っていた場合、古い値が上書きされます。しかし、Sassライブラリを書いている場合、CSSの生成に使用する前に、ユーザーがライブラリの変数を設定できるようにしたいと思うかもしれません。

これを可能にするために、Sass は !default フラグを用意しています。これは、変数が定義されていない場合、またはその値が NULL の場合にのみ、変数に値を割り当てます。それ以外の場合は、既存の値が使用されます。

## モジュールの設定

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

defaultで定義された変数は、@useルールでモジュールをロードする際に設定することができます。Sassライブラリは、ユーザーがライブラリのCSSを設定できるようにするために、しばしば!default変数を使用します。

モジュールを設定付きでロードするには、@use `<url>` に `(<variable>: <value>, <variable>: <value>)` を記述します。設定された値は、変数のデフォルト値を上書きします。設定できるのはスタイルシートのトップレベルに !default フラグを付けて書かれた変数だけです。

::: code-group

```scss [SCSS]
// _library.scss
$black: #000 !default;
$border-radius: 0.25rem !default;
$box-shadow: 0 0.5rem 1rem rgba($black, 0.15) !default;

code {
  border-radius: $border-radius;
  box-shadow: $box-shadow;
}

// style.scss
@use 'library' with (
  $black: #222,
  $border-radius: 0.1rem
);
```

```css [CSS]
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```

:::


## 内蔵変数

ビルトインモジュールで定義された変数は変更できません。

```scss [SCSS]
@use "sass:math" as math;

// This assignment will fail.
math.$pi: 0;
```

## スコープ

スタイルシートのトップレベルで宣言された変数はグローバルである。これは、それらが宣言された後、そのモジュール内のどこにでもアクセスできることを意味する。しかし、これはすべての変数に当てはまるわけではない。ブロック（SCSSでは中括弧、Sassではインデントされたコード）で宣言されたものは通常ローカルであり、宣言されたブロック内でのみアクセスすることができます。

::: code-group

```scss [SCSS]
$global-variable: global value;

.content {
  $local-variable: local value;
  global: $global-variable;
  local: $local-variable;
}

.sidebar {
  global: $global-variable;

  // これでは失敗してしまいます。 なぜなら、$local-variable はスコープ内にないからです。
  // local: $local-variable;
}
```

```css [CSS]
.content {
  global: global value;
  local: local value;
}

.sidebar {
  global: global value;
}
```

:::


### シャドーイング

ローカル変数は、グローバル変数と同じ名前で宣言されることもあります。この場合、実際には同じ名前の変数が2つ存在することになります。1つはローカル変数、もう1つはグローバル変数です。これは、ローカル変数を記述した作者が、自分でも気づいていないグローバル変数の値を誤って変更しないようにするためのものです。

::: code-group

```scss [SCSS]
$variable: global value;

.content {
  $variable: local value;
  value: $variable;
}

.sidebar {
  value: $variable;
}
```

```css [CSS]
.content {
  value: local value;
}

.sidebar {
  value: global value;
}
```

:::

ローカルスコープからグローバル変数の値を設定する必要がある場合（ミキシン内など）には、!global フラグを使用することができます。グローバルフラグを付けた変数宣言は、常にグローバルスコープに代入されます。

::: code-group

```scss [SCSS]
$variable: first global value;

.content {
  $variable: second global value !global;
  value: $variable;
}

.sidebar {
  value: $variable;
}
```

```css [CSS]
.content {
  value: second global value;
}

.sidebar {
  value: second global value;
}
```

:::


::: warning

⚠️ 気をつけよう

互換性:

- Dart Sass: since 2.0.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

グローバルフラグは、ファイルのトップレベルですでに宣言されている変数を設定するためにのみ使用することができます。新しい変数を宣言するために使用することはできません。

:::

### フロー制御の範囲

フロー制御ルールで宣言された変数は、フロー制御ルールと同じレベルの変数をシャドウしない、特別なスコープ・ルールを持ちます。その代わり、これらの変数に代入するだけである。これにより、条件付きで変数に値を代入したり、ループの一部として値を蓄積したりすることが非常に容易になる。

::: code-group

```scss [SCSS]
$dark-theme: true !default;
$primary-color: #f8bbd0 !default;
$accent-color: #6a1b9a !default;

@if $dark-theme {
  $primary-color: darken($primary-color, 60%);
  $accent-color: lighten($accent-color, 60%);
}

.button {
  background-color: $primary-color;
  border: 1px solid $accent-color;
  border-radius: 3px;
}
```

```css [CSS]
.button {
  background-color: #750c30;
  border: 1px solid #f5ebfc;
  border-radius: 3px;
}
```

:::

::: warning

⚠️ 気をつけよう

フローコントロールスコープにある変数は、外部スコープにある既存の変数に代入することはできますが、そこで新しい変数を宣言することはできません。たとえNULL宣言が必要であっても、代入する前にその変数がすでに宣言されていることを確認します。

:::


## 高度な変数機能

Sass コアライブラリには、変数を扱うための高度な関数がいくつか用意されています。meta.variable-exists() 関数は、与えられた名前の変数が現在のスコープに存在するかどうかを返します。また meta.global-variable-exists() 関数は、同じことを行いますがグローバルスコープに対してのみ行います。

::: warning

⚠️ 気をつけよう

ユーザーは時々、別の変数に基づいて変数名を定義するために補間を使用したいと思うことがあります。Sassはこれを許可しません。なぜなら、どの変数がどこに定義されているのかを一目で見分けるのが難しくなるからです。しかし、できることは、名前から値へのマップを定義し、変数を使ってアクセスできるようにすることです。

::: code-group

```scss [SCSS]
@use "sass:map";

$theme-colors: (
  "success": #28a745,
  "info": #17a2b8,
  "warning": #ffc107,
);

.alert {
  // Instead of $theme-color-#{warning}
  background-color: map.get($theme-colors, "warning");
}
```

```css [CSS]
.alert {
  background-color: #ffc107;
}
```

:::