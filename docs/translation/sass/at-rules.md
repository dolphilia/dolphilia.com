# `@ルール`

[[TOC]]

## 概要

Sassの追加機能の多くは、CSSの上に追加される新しいアットルールという形で提供されます。

- `@use` は他のSassスタイルシートからミキシン、関数、変数をロードし、複数のスタイルシートからCSSを一緒に結合します。
- `@forward` は Sass スタイルシートをロードし、そのミキシン、関数、変数を `@use` ルールでスタイルシートがロードされたときに利用できるようにします。
- `@import` は CSS の at-rule を拡張して、他のスタイルシートからスタイル、ミキシン、関数、変数を読み込むことができるようにします。
- `@mixin` と `@include` は、スタイルのチャンクを簡単に再利用できるようにします。
- `@function` は、SassScript の式で使用することができるカスタム関数を定義します。
- `@extend` はセレクタが互いにスタイルを継承できるようにします。
- `@at-root` は、セレクタのスタイルをCSSドキュメントのルートに配置します。
- `@error` はコンパイルに失敗し、エラーメッセージを表示します。
- `@warn` は、コンパイルを完全に停止せずに警告を表示します。
- `@debug` はデバッグのためのメッセージを表示します。
- `@if`, `@each`, `@for`, `@while` などのフロー制御ルールは、スタイルが何回発行されるかを制御します。

Sass には、プレーンな CSS の at-rule に対して、補間を含むことができ、スタイル・ルールの中にネストすることができるという、いくつかの特別な動作もあります。また、`@media` や `@supports` などのルールでは、SassScript を補間せずに直接ルール内で使用することができます。

[[TOC]]

## `@use`

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

`@use` ルールは、他の Sass スタイルシートから mixin、関数、変数をロードし、複数のスタイルシートから CSS を一緒に結合します。`@use` によって読み込まれたスタイルシートは "モジュール" と呼ばれます。また、Sassには便利な機能を満載したビルトインモジュールが用意されています。

最も単純な `@use` ルールは `@use "<url>"` と書かれ、与えられた URL にあるモジュールをロードします。この方法で読み込まれたスタイルは、何度読み込まれたとしても、コンパイルされたCSSの出力に一度だけ含まれます。

::: warning

⚠️ Heads up!

スタイルシートの `@use` ルールは、スタイルルールを含む `@forward` 以外のどのルールよりも前になければなりません。しかし、モジュールを設定する際に使用する変数を `@use` ルールの前に宣言することができます。

:::

::: code-group

```scss [SCSS]
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}
// fou
ndation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}

// style.scss
@use 'foundation/code';
@use 'foundation/lists';
```

```css [CSS]
code {
  padding: .25em;
  line-height: 0;
}

ul, ol {
  text-align: left;
}
ul ul, ol ol {
  padding-bottom: 0;
  padding-left: 0;
}
```

:::


### 読み込みメンバー

別のモジュールから変数や関数、ミキシンにアクセスするには、 `<名前空間>.<変数>` や `<名前空間>.<関数>()`、 `@include <名前空間>.<ミキシン>()` と記述してください。デフォルトでは、名前空間はモジュールの URL の最後の要素に過ぎません。

`@use` でロードされたメンバー（変数、関数、ミキシン）は、それらをロードしたスタイルシートのみで見ることができます。他のスタイルシートもそれらにアクセスしたい場合は、独自の `@use` 規則を記述する必要があります。これは、各メンバーがどこから来ているのかを正確に把握することを容易にします。一度に多くのファイルからメンバーをロードしたい場合は、`@forward`ルールを使用して、1つの共有ファイルからすべてのメンバーを転送することができます。

::: tip

💡 Fun fact:

`@use` はメンバ名に名前空間を追加するので、スタイルシートを書くときには $radius や $width のような非常にシンプルな名前を選ぶと安全です。これは、他のライブラリとの衝突を避けるために $mat-corner-radius のような長い名前を書くことを奨励していた古い `@import` ルールとは異なっており、スタイルシートを明確で読みやすい状態に保つのに役立ちます!

:::


::: code-group

```scss [SCSS]
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}
// style.scss
@use "src/corners";

.button {
  @include corners.rounded;
  padding: 5px + corners.$radius;
}
```

```css [CSS]
.button {
  border-radius: 3px;
  padding: 8px;
}
```

:::


#### ネームスペースの選択

デフォルトでは、モジュールの名前空間はファイル拡張子を除いた URL の最後の要素になります。しかし、時には別の名前空間を選択したいこともあるでしょう。よく参照するモジュールには短い名前を使いたいとか、同じファイル名で複数のモジュールを読み込んでいるとか。このような場合は、`@use "<url>" as <namespace>` と記述してください。

::: code-group

```scss [SCSS]
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}

// style.scss
@use "src/corners" as c;

.button {
  @include c.rounded;
  padding: 5px + c.$radius;
}
```

```css [CSS]
.button {
  border-radius: 3px;
  padding: 8px;
}
```

:::

`@use "<url>" as *` と書くことで、名前空間なしでモジュールをロードすることもできます。しかし、これはあなたが書いたスタイルシートのみに行うことをお勧めします。そうしないと、新しいメンバーを導入してしまい、名前の衝突を引き起こすかもしれません

:::

::: code-group

```scss [SCSS]
// src/_corners.scss
$radius: 3px;

@mixin rounded {
  border-radius: $radius;
}

// style.scss
@use "src/corners" as *;

.button {
  @include rounded;
  padding: 5px + $radius;
}
```

```css [CSS]
.button {
  border-radius: 3px;
  padding: 8px;
}
```

:::


#### プライベートメンバー

スタイルシートの作成者として、定義したすべてのメンバーをスタイルシートの外部で利用できるようにしたくない場合があります。Sass では、名前を `-` または `_` で始めることで、簡単にプライベート・メンバーを定義することができます。これらのメンバーは、定義したスタイルシート内では通常のように動作しますが、モジュールのパブリック API の一部にはなりません。つまり、あなたのモジュールを読み込むスタイルシートは、それらを見ることができないのです!

::: tip

💡 Fun fact:

もし、あるメンバーを単一のモジュールではなく、パッケージ全体に対してプライベートにしたい場合は、パッケージのエントリポイント（パッケージを使用するためにユーザーに読み込ませるスタイルシート）からそのモジュールを転送しないようにすればよいのです。残りのモジュールを転送している間、そのメンバーを隠すこともできます!

:::

```scss
// src/_corners.scss
$-radius: 3px;

@mixin rounded {
  border-radius: $-radius;
}

// style.scss
@use "src/corners";

.button {
  @include corners.rounded;

  // これはエラーです! $-radiusは`_corners.scss`の外では見えません。
  padding: 5px + corners.$-radius;
}
```

### コンフィギュレーション

スタイルシートは変数を設定可能にするために !default フラグで定義することができます。モジュールを設定付きでロードするには、`@use <url> with (<variable>: <value>, <variable>: <value>)` と記述してください。設定された値は、変数のデフォルト値を上書きします。

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

#### ミキシンを使って

モジュールを `@use` ... with で設定することは、特に `@import` ルールで動作するように書かれたライブラリを使用する場合には、非常に便利です。しかし、特に柔軟性があるわけではありませんし、より高度なユースケースにはお勧めしません。一度に多くの変数を設定したい、マップを設定として渡したい、モジュールがロードされた後に設定を更新したいといった場合には、変数を設定するための mixin とスタイルを注入するための mixin を書くことを検討してください。

::: code-group

```scss [SCSS]
// _library.scss
$-black: #000;
$-border-radius: 0.25rem;
$-box-shadow: null;

/// ユーザーが `$-box-shadow` を設定した場合、その設定値を返します。
/// それ以外の場合は `$-black` から派生した値を返します。
@function -box-shadow() {
  @return $-box-shadow or (0 0.5rem 1rem rgba($-black, 0.15));
}

@mixin configure($black: null, $border-radius: null, $box-shadow: null) {
  @if $black {
    $-black: $black !global;
  }
  @if $border-radius {
    $-border-radius: $border-radius !global;
  }
  @if $box-shadow {
    $-box-shadow: $box-shadow !global;
  }
}

@mixin styles {
  code {
    border-radius: $-border-radius;
    box-shadow: -box-shadow();
  }
}

// style.scss
@use 'library';

@include library.configure(
  $black: #222,
  $border-radius: 0.1rem
);

@include library.styles;
```

```css [CSS]
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.15);
}
```

:::

#### 変数の再割り当て

モジュールをロードした後、その変数を再割り当てすることができます。

```scss
// _library.scss
$color: red;

// _override.scss
@use 'library';
library.$color: blue;

// style.scss
@use 'library';
@use 'override';
@debug library.$color;  //=> blue
```

これは、`as *`を使って名前空間を持たないモジュールをインポートした場合にも有効です。そのモジュールで定義された変数名に代入すると、そのモジュールの値が上書きされます。

::: warning

⚠️ Heads up!

組み込みモジュール変数(math.$piなど)は再代入できません。

:::


### モジュールの検索

読み込むスタイルシートごとに絶対的な URL を書き出すのは面白くないので、モジュールを見つけるための Sass のアルゴリズムがそれを少し簡単にしてくれます。まず始めに、ロードしたいファイルの拡張子を明示的に書き出す必要はありません; `@use "variables"` は自動的に variables.scss, variables.sass, または variables.css をロードします。

::: warning

⚠️ Heads up!

スタイルシートがすべてのオペレーティングシステムで動作するように、SassはファイルパスではなくURLでファイルをロードします。つまり、Windows でもバックスラッシュではなく、フォワードスラッシュを使用する必要があります。

:::


#### ロードパス

全ての Sass 実装では、ユーザがロードパスを提供することができます：モジュールを探すときに Sass が参照するファイルシステム上のパスです。例えば、ロードパスとして node_modules/susy/sass を渡した場合、 `@use "susy"` を使って node_modules/susy/sass/susy.scss をロードすることができます。

しかし、モジュールは常に最初に現在のファイルから相対的にロードされます。ロードパスは、モジュールの URL にマッチする相対ファイルが存在しない場合にのみ使用されます。これにより、新しいライブラリを追加したときに、誤って相対的なインポートを台無しにすることがないようにします。

::: tip

💡 Fun fact:

他のいくつかの言語とは異なり、Sass では相対インポートに `./` を使用する必要はありません。相対インポートは常に利用可能です。

:::


#### パーシャル

慣習として、モジュールとしてのみロードされることを意図した Sass ファイルは、`_` で始まります (_code.scss のように)。これらはパーシャルと呼ばれ、Sassツールにこれらのファイルを独自にコンパイルしようとしないように伝えます。パーシャルをインポートするときは、`_`を省略することができます。


#### インデックスファイル

フォルダ内に _index.scss や _index.sass を記述しておくと、フォルダ自体の URL を読み込む際にインデックスファイルが自動的に読み込まれるようになります。

::: code-group

```scss [SCSS]
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}

// foundation/_index.scss
@use 'code';
@use 'lists';

// style.scss
@use 'foundation';
```

```css [CSS]
code {
  padding: .25em;
  line-height: 0;
}

ul, ol {
  text-align: left;
}
ul ul, ol ol {
  padding-bottom: 0;
  padding-left: 0;
}
```

:::


### CSSの読み込み

.sass と .scss ファイルの読み込みに加え、Sass は普通の .css ファイルも読み込むことができます。

::: code-group

```scss [SCSS]
// code.css
code {
  padding: .25em;
  line-height: 0;
}

// style.scss
@use 'code';
```

```css [CSS]
code {
  padding: .25em;
  line-height: 0;
}
```

:::

モジュールとしてロードされたCSSファイルは、特別なSass機能を許可しないため、Sass変数、関数、ミキシンを公開することができません。作者が誤ってCSSにSassを記述しないようにするため、有効なCSSでないSass機能はすべてエラーになります。そうでない場合は、CSSはそのままレンダリングされます。拡張も可能です

### `@import`との違い

`@use` ルールは、古い `@import` ルールを置き換えるためのものですが、意図的に異なる動作をするように設計されています。以下は、両者の大きな違いです。

- `@use` は、変数、関数、ミキシンを現在のファイルのスコープ内で利用できるようにするだけです。グローバルスコープに追加することはありません。これにより、Sass ファイルが参照する各名称がどこから来たのかを簡単に把握することができ、衝突の危険性なしに短い名前を使用することができます。
- `@use` は、各ファイルを一度だけ読み込みます。これにより、依存関係にある CSS を誤って何度も重複して読み込んでしまうことがありません。
- `@use` はファイルの最初に記述する必要があり、スタイルルールの中に入れ子にすることはできません。
- 各 `@use` ルールに指定できる URL は 1 つだけです。
- インデントされた構文を使用する場合でも、`@use` は URL を引用符で囲む必要があります。


## `@forward`

`@forward` ルールは Sass スタイルシートをロードし、そのミキシン、関数、変数を `@use` ルールでスタイルシートがロードされた際に利用できるようにします。これにより、多くのファイルにまたがる Sass ライブラリを整理することができ、一方でユーザは単一のエントリポイント・ファイルをロードすることができるようになります。

ルールは、`@forward "<url>"` と記述します。これは `@use` と同様に指定された URL にあるモジュールをロードしますが、ロードされたモジュールのパブリックメンバーは、あたかもあなたのモジュールで直接定義されているかのように、モジュールのユーザが利用できるようにします。しかし、これらのメンバーはあなたのモジュールでは利用できません。もし利用したいのであれば、 `@use` ルールも書く必要があります。心配しないでください、モジュールのロードは一度だけです!

同じファイルに同じモジュールの `@forward` と `@use` の両方を書いた場合、常に `@forward` を先に書くのがよいでしょう。そうすれば、ユーザーが転送されるモジュールを設定したい場合、`@use`が設定なしでモジュールをロードする前に、その設定が `@forward` に適用されます。

::: tip

💡 Fun fact:

`@forward` ルールは、モジュールの CSS に関しては `@use` と同じように動作します。転送されたモジュールのスタイルはコンパイルされたCSSの出力に含まれ、 `@forward` を指定したモジュールは、それが `@used` でもない場合でも、それを拡張することができます。

:::

::: code-group

```scss [SCSS]
// src/_list.scss
@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

// bootstrap.scss
@forward "src/list";

// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```

```css [CSS]
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

:::


### プリフィックスの追加

モジュールのメンバは通常名前空間とともに使用されるので、短くてシンプルな名前が通常最も読みやすいオプションです。しかし、これらの名前は定義されたモジュールの外では意味をなさないかもしれません。そこで `@forward` には、転送するすべてのメンバーに余分なプレフィックスを追加するオプションがあります。

これは `@forward "<url>" as <prefix>-*` と書き、モジュールが転送するすべてのミキシン、関数、変数名の先頭に、指定したプレフィックスを追加するものです。例えば、モジュールが reset という名前のメンバーを定義しており、それが list-* として転送された場合、下流のスタイルシートはそれを list-reset として参照することになります。

::: code-group

```scss [SCSS]
// src/_list.scss
@mixin reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

// bootstrap.scss
@forward "src/list" as list-*;

// styles.scss
@use "bootstrap";

li {
  @include bootstrap.list-reset;
}
```

```css [CSS]
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

:::


### 視認性のコントロール

モジュールからすべてのメンバーを転送したくない場合があります。パッケージのみが使用できるようにいくつかのメンバーを非公開にしたい場合や、ユーザーに別の方法でメンバーをロードするように要求したい場合があります。どのメンバーを転送するかは、`@forward "<url>" hide <members...>` や `@forward "<url>" show <members...>` と書くことで正確に制御することができます。

hideは、リストされたメンバーは転送されないが、それ以外は転送されることを意味します。showは、指定されたメンバーのみを転送することを意味します。どちらの形式でも、ミキシン、関数、変数($を含む)の名前をリストアップします。

```scss
// src/_list.scss
$horizontal-list-gap: 2em;

@mixin list-reset {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin list-horizontal {
  @include list-reset;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: $horizontal-list-gap;
    }
  }
}

// bootstrap.scss
@forward "src/list" hide list-reset, $horizontal-list-gap;
```

### モジュールの設定

互換性

- Dart Sass: since 1.24.0
- LibSass: ✗
- Ruby Sass: ✗

また、`@forward` ルールは設定付きでモジュールをロードすることができます。これはほとんど `@use` と同じように動作しますが、1つだけ付け加えると、`@forward` ルールの設定に !default フラグを使用することができるようになります。これにより、モジュールは上流のスタイルシートのデフォルトを変更しつつ、下流のスタイルシートがそれをオーバーライドできるようになります。

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

// _opinionated.scss
@forward 'library' with (
  $black: #222 !default,
  $border-radius: 0.1rem !default
);

// style.scss
@use 'opinionated' with ($black: #333);
```

```css [CSS]
code {
  border-radius: 0.1rem;
  box-shadow: 0 0.5rem 1rem rgba(51, 51, 51, 0.15);
}
```

:::


## `@import`

Sass は CSS の `@import` ルールを拡張し、Sass と CSS スタイルシートをインポートし、ミキシン、関数、変数へのアクセスや複数のスタイルシートの CSS を一緒に結合する機能を提供します。ブラウザがページをレンダリングする際に複数のHTTPリクエストを行う必要があるプレーンなCSSインポートとは異なり、Sassインポートはコンパイル時に完全に処理されます。

Sass import は CSS import と同じ構文ですが、複数の import をそれぞれ `@import` で区切るのではなく、カンマで区切ることができます。また、インデントされた構文では、インポートされたURLは引用符で囲む必要はありません。

::: warning

⚠️ Heads up!

Sass チームは `@import` ルールの継続的な使用を推奨していません。Sass は今後数年の間に徐々にこのルールを廃止し、最終的には言語から完全に削除する予定です。代わりに `@use` ルールを推奨します。(現在、Dart Sass のみ `@use` をサポートしていることに注意してください。他の実装のユーザは、代わりに `@import` ルールを使用しなければなりません)。

**`@import`の何が問題なのか？**

`@import`ルールは、深刻な問題をいくつも抱えています。

- `@import` はすべての変数、mixin、関数をグローバルにアクセスできるようにします。このため、人（やツール）がどこで何が定義されているのかを知ることは非常に困難です。
- すべてがグローバルなので、ライブラリは名前の衝突を避けるために、すべてのメンバーにプレフィックスを付けなければなりません。
- `@extend` ルールもグローバルであるため、どのスタイルルールが拡張されるかを予測することが難しくなっています。
- 各スタイルシートは `@import` されるたびに実行され、その CSS が出力されるため、コンパイル時間が長くなり、出力が肥大化します。
- 下流のスタイルシートからアクセスできないプライベートメンバーやプレースホルダーセレクタを定義する方法がありませんでした。

新しいモジュール・システムと `@use` ルールは、これらの問題すべてに対処しています。

**どのように移行するのですか？**

私たちは、ほとんどの `@import-based` コードを `@use-based` コードに瞬時に自動変換するマイグレーションツールを書きました。エントリーポイントを指定し、実行させるだけです!

:::

::: code-group

```scss [SCSS]
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}

// style.scss
@import 'foundation/code', 'foundation/lists';
```

```css [CSS]
code {
  padding: .25em;
  line-height: 0;
}

ul, ol {
  text-align: left;
}
ul ul, ol ol {
  padding-bottom: 0;
  padding-left: 0;
}
```

:::


Sass がファイルをインポートするとき、そのファイルは `@import` の代わりにそのコンテンツが直接現れたかのように評価されます。インポートされたファイルのミキシン、関数、変数はすべて利用可能になり、そのすべての CSS は `@import` が書かれた場所に含まれます。さらに、`@import`の前に定義されていたミキシン、関数、変数（他の `@import` のものも含む）は、インポートされたスタイルシートで利用することができます。

:::

⚠️ Heads up!

同じスタイルシートが複数回インポートされた場合、そのたびに再度評価されます。関数やミキシンを定義しているだけなら、通常は大きな問題にはなりませんが、スタイルルールを含んでいる場合は、複数回CSSにコンパイルされることになります。

:::

### ファイルを探す

インポートする全てのスタイルシートに絶対的な URL を書き出すのは面白くないので、インポートするファイルを見つけるための Sass のアルゴリズムがそれを少し簡単にしてくれます。まず始めに、インポートしたいファイルの拡張子を明示的に書き出す必要はありません; `@import` "variables" は自動的に variables.scss, variables.sass, または variables.css をロードします。

:::

⚠️ Heads up!

スタイルシートがすべてのオペレーティングシステムで動作するように、SassはファイルパスではなくURLでファイルをインポートします。これは Windows であってもバックスラッシュではなくフォワードスラッシュを使用する必要があることを意味します。

:::

#### ロードパス

全ての Sass 実装では、ユーザーがロードパスを提供することができます。これは、インポートを解決する際に Sass が参照するファイルシステム上のパスです。例えば、ロードパスとして node_modules/susy/sass を渡した場合、 `@import` "susy" を使用して node_modules/susy/sass/susy.scss をロードすることが可能です。

しかし、Importは常に最初に現在のファイルから相対的に解決されます。ロードパスは、インポートにマッチする相対ファイルが存在しない場合にのみ使用されます。これは、新しいライブラリを追加するときに、誤って相対的なimportを台無しにすることがないことを保証します。

::: tip

💡 Fun fact:

他のいくつかの言語とは異なり、Sass では相対インポートに ./ を使用する必要はありません。相対インポートは常に利用可能です。

:::

#### パーシャル

慣習として、インポートされるだけの Sass ファイルは _ で始まります (例: _code.scss)。これらはパーシャルと呼ばれ、Sassツールにこれらのファイルを独自にコンパイルしようとしないように伝えます。パーシャルをインポートするときは、_を省略することができます。

#### インデックスファイル

互換性:

- Dart Sass: ✓
- LibSass: since 3.6.0
- Ruby Sass: since 3.6.0

フォルダ内に _index.scss や _index.sass を記述しておくと、フォルダ自体をインポートする際にそのファイルが代わりに読み込まれるようになります。

::: code-group

```scss [SCSS]
// foundation/_code.scss
code {
  padding: .25em;
  line-height: 0;
}

// foundation/_lists.scss
ul, ol {
  text-align: left;

  & & {
    padding: {
      bottom: 0;
      left: 0;
    }
  }
}

// foundation/_index.scss
@import 'code', 'lists';

// style.scss
@import 'foundation';
```

```css [CSS]
code {
  padding: .25em;
  line-height: 0;
}

ul, ol {
  text-align: left;
}
ul ul, ol ol {
  padding-bottom: 0;
  padding-left: 0;
}
```

#### カスタムインポーター

すべての Sass 実装はカスタムインポーターを定義する方法を提供します。これは、`@imports` がスタイルシートを見つける方法を制御します。

- Node SassとDart Sass on npmは、JS APIの一部としてインポーターオプションを提供します。
- Dart Sass on pub は、カスタムインポーターが拡張できる抽象的な Importer クラスを提供します。
- Ruby Sassは、カスタムインポーターが拡張できる抽象的なImporters::Baseクラスを提供します。

### ネスティング

Importsは通常スタイルシートの最上位に記述されますが、必ずしもそうである必要はありません。スタイルルールやプレーンCSSのat-ruleの中に入れ子にすることもできます。インポートされたCSSはそのコンテキストにネストされるため、ネストされたインポートはCSSの塊を特定の要素やメディアクエリにスコープするのに便利です。ただし、ネストされたインポートで定義されたトップレベルのミキシン、関数、変数は、まだグローバルに定義されていることに注意してください。

::: code-group

```scss [SCSS]
// _theme.scss
pre, code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}

// style.scss
.theme-sample {
  @import "theme";
}
```

```css [CSS]
.theme-sample pre, .theme-sample code {
  font-family: 'Source Code Pro', Helvetica, Arial;
  border-radius: 4px;
}
```

:::

::: tip

💡 Fun fact:

ネストされたインポートはサードパーティのスタイルシートをスコープするのに非常に便利ですが、もしあなたがインポートするスタイルシートの作者であれば、通常はスタイルをミキシンで書き、そのミキシンをネストしたコンテキストに含める方がよいでしょう。mixinはより柔軟な方法で使用することができ、インポートされたスタイルシートを見れば、それがどのように使用されることを意図しているのかが明確になります。

:::

::: warning

⚠️ Heads up!

ネストされたimportのCSSはmixinのように評価され、任意の親セレクタはスタイルシートがネストされているセレクタを参照することになる。

::: code-group

``` scss [SCSS]
// _theme.scss
ul li {
  $padding: 16px;
  padding-left: $padding;
  [dir=rtl] & {
    padding: {
      left: 0;
      right: $padding;
    }
  }
}

// style.scss
.theme-sample {
  @import "theme";
}
```

```css [CSS]
.theme-sample ul li {
  padding-left: 16px;
}
[dir=rtl] .theme-sample ul li {
  padding-left: 0;
  padding-right: 16px;
}
```

:::


### CSSのインポート

互換性:

- Dart Sass: since 1.11.0
- LibSass: partial
- Ruby Sass: ✗
- ▶

.sass と .scss ファイルのインポートに加え、Sass は古い .css ファイルもインポートすることができます。唯一のルールは、拡張子 .css を明示的に含んではいけないということです。なぜなら、拡張子はプレーンな CSS `@import` を示すために使用されるからです。

::: code-group

```scss [SCSS]
// code.css
code {
  padding: .25em;
  line-height: 0;
}

// style.scss
@import 'code';
```

```css [CSS]
code {
  padding: .25em;
  line-height: 0;
}
```

:::

SassによってインポートされたCSSファイルは、Sassの特別な機能を許可していません。作者が誤ってCSSにSassを記述しないようにするため、有効なCSSでもないSassの機能はすべてエラーを発生させます。そうでなければ、CSSはそのままレンダリングされます。拡張も可能です

### プレーンなCSS `@imports`

互換性:

- Dart Sass: ✓
- LibSass: partial
- Ruby Sass: ✓
- ▶

`@import` は CSS でも定義されているため、Sass はコンパイル時にファイルをインポートしようとせず、プレーンな CSS `@imports` をコンパイルする方法を必要としています。これを実現するために、また、SCSSが可能な限りCSSのスーパーセットであることを保証するために、Sassは以下の特徴を持つ `@imports` をプレーンなCSS importsにコンパイルします。

- URLが.cssで終わるものをインポートしています。
- URLが http:// または https:// で始まるImport。
- URLがurl()として記述されているImport。
- メディアクエリを持つImport。

::: code-group

```scss [SCSS]
@import "theme.css";
@import "http://fonts.googleapis.com/css?family=Droid+Sans";
@import url(theme);
@import "landscape" screen and (orientation: landscape);
```

```css
@import url(theme.css);
@import "http://fonts.googleapis.com/css?family=Droid+Sans";
@import url(theme);
@import "landscape" screen and (orientation: landscape);
```

:::

#### 補間処理

Sass のインポートは補間を使用できませんが（ミキシン、関数、変数がどこから来たのか常に分かるようにするため）、プレーン CSS のインポートは使用できます。これにより、例えばミキシンのパラメータに基づいて動的にインポートを生成することができます。

::: code-group

```scss
@mixin google-font($family) {
  @import url("http://fonts.googleapis.com/css?family=#{$family}");
}

@include google-font("Droid Sans");
```

```css
@import url("http://fonts.googleapis.com/css?family=Droid Sans");
```

:::

### インポートとモジュール

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

Sass のモジュールシステムは `@import` とシームレスに統合されており、`@use` のルールを含むファイルをインポートする場合でも、インポートを含むファイルをモジュールとしてロードする場合でも、同じように統合されます。私たちは `@import` から `@use` への移行を可能な限りスムーズに行いたいと考えています。

#### モジュールシステムファイルのインポート

`@use` ルールを含むファイルをインポートすると、インポートファイルはそのファイルで直接定義されたすべてのメンバー（プライベートメンバーも含む）にアクセスできますが、そのファイルがロードしたモジュールからのメンバーにはアクセスできません。しかし、そのファイルに `@forward` ルールが含まれている場合、インポートするファイルは転送されたメンバーにアクセスすることができます。これは、モジュールシステムで使用するために書かれたライブラリをインポートできることを意味します。

::: warning

⚠️ Heads up!

`@use` ルールを持つファイルがインポートされると、それらによって過渡的に読み込まれたすべての CSS が、たとえ他のインポートによって既に含まれていたとしても、結果のスタイルシートに含まれます。注意しないと、これはCSSの出力を肥大化させる結果になりかねません!

:::

#### インポート専用ファイル

`@use` で意味がある API は `@import` では意味がないかもしれない。例えば、 `@use` はデフォルトですべてのメンバーに名前空間を追加するので、短い名前を安全に使用できますが、 `@import` はそうではないので、長い名前が必要になるかもしれません。もしあなたがライブラリの作者なら、新しいモジュールシステムを使うためにライブラリをアップデートしたら、既存の `@import-based` ユーザが壊れてしまうのではないかと心配になるかもしれません。

これを簡単にするために、Sass はインポートオンリーのファイルもサポートしています。ファイル名を `<名前>`.import.scss とすると、`@uses` ではなく import に対してのみ読み込まれます。この方法では、 `@import` ユーザーの互換性を維持しながら、新しいモジュールシステムのユーザーには素晴らしい API を提供することができます。

```scss
// _reset.scss

// モジュールシステムユーザは `@include reset.list()` を書きます。
@mixin list() {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

// _reset.import.scss

// レガシーインポートユーザーは `@include reset-list()` を書き続けることができます。
@forward "reset" as reset-*;
```

#### インポートによるモジュールの設定

互換性:

- Dart Sass: since 1.24.0
- LibSass: ✗
- Ruby Sass: ✗

モジュールを最初にロードする `@import` の前にグローバル変数を定義することで、`@import` を通してロードされるモジュールを設定することができます。

::: code-group

```scss
// _library.scss
$color: blue !default;

a {
  color: $color;
}

// _library.import.scss
@forward 'library' as lib-*;

// style.sass
$lib-color: green;
@import "library";
```

```css
a {
  color: green;
}
```

:::

::: warning

⚠️ Heads up!

モジュールは一度だけロードされるので、初めてモジュールを `@import` した後に (間接的にでも) 設定を変更すると、そのモジュールを再度 `@import` したときに変更が無視されます。

:::

#### インポートを含むモジュールのロード

`@use` (または `@forward`) を使って `@import` を使用するモジュールをロードすると、そのモジュールはロードしたスタイルシートによって定義されたすべてのパブリックメンバーと、スタイルシートが推移的にインポートするすべてのものを含むようになります。言い換えれば、インポートされたものはすべて、あたかも一つの大きなスタイルシートに書かれているかのように扱われます。

このため、あなたが依存しているすべてのライブラリが新しいモジュールシステムに変換される前でも、スタイルシートで `@use` を使い始めることが簡単に変換できるようになります。しかし、もしライブラリが変換されたら、APIが変わってしまうかもしれないことに注意してください。


## `@mixin` と `@include`

Mixinを使うと、スタイルシート全体で再利用できるスタイルを定義することができます。これにより、.float-leftのような非意味的なクラスの使用を避け、ライブラリでスタイルのコレクションを配布することが容易になります。

ミキシンは `@mixin` というアットルールによって定義され、`@mixin <name> { ... }` と記述します。 または `@mixin name(<arguments...>) { ....}`. mixin の名前は任意の Sass 識別子にすることができ、トップレベル ステートメント以外のステートメントを含めることができます。また、他のルールにネストされたり、スタイルシートのトップレベルに含まれたりする独自のスタイルルールを含むこともできますし、単に変数を変更するために使用することもできます。

ミキシンは `@include` というアットルールを使って現在のコンテキストにインクルードされます。これは、 `@include <name>` または `@include <name>(<arguments...>)` と記述し、ミキシンの名前をインクルードすることになります。

::: code-group

```scss [SCSS]
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  @include reset-list;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  @include horizontal-list;
}
```

```css [CSS]
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  margin-left: -2px;
  margin-right: 2em;
}
```

:::

::: tip

💡 Fun fact:

Mixin 名は、他の Sass 識別子と同様に、ハイフンとアンダースコアを同一として扱います。つまり、reset-list と reset_list はどちらも同じ mixin を参照していることになります。これは、Sassのごく初期に、識別子名にアンダースコアしか使用できなかったことに由来します。SassがCSSの構文に合わせてハイフンをサポートするようになると、移行を容易にするためにこの2つは等価になりました。

:::

### 論証

mixin は引数を取ることができます。これにより、呼び出されるたびに動作をカスタマイズすることができます。引数は `@mixin` ルールの中で、Mixin の名前の後に括弧で囲まれた変数名のリストとして指定します。次に、Mixin には同じ数の引数を SassScript の式の形で含める必要があります。これらの式の値は、対応する変数として mixin のボディで使用できます。

::: code-group

```scss [SCSS]
@mixin rtl($property, $ltr-value, $rtl-value) {
  #{$property}: $ltr-value;

  [dir=rtl] & {
    #{$property}: $rtl-value;
  }
}

.sidebar {
  @include rtl(float, left, right);
}
```

```css [CSS]
.sidebar {
  float: left;
}
[dir=rtl] .sidebar {
  float: right;
}
```

:::

::: tip

💡 Fun fact:

引数リストには、末尾にカンマを付けることができます。これにより、スタイルシートのリファクタリング時に構文エラーを回避することが容易になります。

:::

#### オプションの引数

通常、mixin が宣言している引数は、その mixin をインクルードする際に必ず渡さなければなりません。しかし、引数を省略可能にするには、その引数が渡されなかった場合に使用されるデフォルト値を定義します。デフォルト値は、変数宣言と同じ構文を使用します。変数名、コロン、SassScript 式が続きます。これにより、単純な方法から複雑な方法まで柔軟に使用できる mixin API を簡単に定義することができます。

::: code-group

```scss [SCSS]
@mixin replace-text($image, $x: 50%, $y: 50%) {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;

  background: {
    image: $image;
    repeat: no-repeat;
    position: $x $y;
  }
}

.mail-icon {
  @include replace-text(url("/images/mail.svg"), 0);
}
```

```css [CSS]
.mail-icon {
  text-indent: -99999em;
  overflow: hidden;
  text-align: left;
  background-image: url("/images/mail.svg");
  background-repeat: no-repeat;
  background-position: 0 50%;
}
```

:::

::: tip

💡 Fun fact:

デフォルト値は、任意の SassScript 式を指定でき、以前の引数を参照することも可能です。

:::

#### キーワードの引数

mixin をインクルードするとき、引数は引数リスト内の位置だけでなく、名前でも渡すことができます。これは、複数のオプション引数を持つ mixin や、名前を指定しないと意味がわからない boolean 引数を持つ mixin で特に有用です。キーワード引数は、変数宣言やオプション引数と同じ構文を使用します。

::: code-group

```scss [SCSS]
@mixin square($size, $radius: 0) {
  width: $size;
  height: $size;

  @if $radius != 0 {
    border-radius: $radius;
  }
}

.avatar {
  @include square(100px, $radius: 4px);
}
```

```css [CSS]
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 4px;
}
```

::: warning

⚠️ Heads up!

どのような引数でも名前で渡すことができるので、mixinの引数の名前を変更するときには注意が必要です...ユーザーが壊れてしまうかもしれません!しばらくの間、古い名前をオプションの引数として残しておき、誰かがそれを渡すと警告を表示して、新しい引数に移行するように知らせるのが便利です。

:::

#### 引数を任意に取る

時には、mixin が任意の数の引数を取ることができるようにすると便利です。もし、 `@mixin` 宣言の最後の引数が ... で終わっていれば、その mixin に渡されるすべての追加引数はリストとしてその引数に渡されます。この引数は、引数リストと呼ばれます。

::: code-group

```scss [SCSS]
@mixin order($height, $selectors...) {
  @for $i from 0 to length($selectors) {
    #{nth($selectors, $i + 1)} {
      position: absolute;
      height: $height;
      margin-top: $i * $height;
    }
  }
}

@include order(150px, "input.name", "input.address", "input.zip");
```

```css [CSS]
input.name {
  position: absolute;
  height: 150px;
  margin-top: 0px;
}

input.address {
  position: absolute;
  height: 150px;
  margin-top: 150px;
}

input.zip {
  position: absolute;
  height: 150px;
  margin-top: 300px;
}
```

:::

#### キーワードの引数を任意に取る

引数リストを使用して、任意のキーワード引数を取ることもできます。meta.keywords()関数は、引数リストを受け取り、ミキシンに渡された余分なキーワードを、引数名($を含まない)からそれらの引数の値へのマップとして返します。

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

::: tip

💡 Fun fact:

meta.keywords() 関数に引数リストを渡さない場合、その引数リストでは余分なキーワード引数を許しません。これは、mixinの呼び出し側が、引数名のスペルを間違えていないことを確認するのに役立ちます。

:::

#### 任意の引数を渡す

引数リストによってmixinが任意の位置やキーワードの引数を取ることができるように、同じ構文を使ってmixinに位置やキーワードの引数を渡すことができます。もし、includeの最後の引数として、リストの後に ... を渡すと、その要素は追加の位置引数として扱われます。同様に、mapの後に...を渡すと、追加のキーワード引数として扱われます。一度に両方を渡すことも可能です。

```scss
$form-selectors: "input.name", "input.address", "input.zip" !default;

@include order(150px, $form-selectors...);
```

::: tip

💡 Fun fact:

引数リストには、位置引数とキーワード引数の両方が記録されているので、それを使って、一度に両方の引数を別のmixinに渡すことができます。そのため、Mixinのエイリアスを定義するのはとても簡単です。

```scss
@mixin btn($args...) {
  @warn "btn() ミキシンは非推奨です。代わりに button() を入れてください。";
  @include button($args...);
}
```

:::

### コンテンツブロック

引数を取るだけでなく、Mixin はコンテントブロックと呼ばれるスタイルのブロック全体を取ることができます。mixin は `@content` というアットルールをボディに含めることで、コンテンツブロックを受け取ることを宣言できます。コンテンツブロックは、Sass の他のブロックと同様に中括弧を使用して渡され、 `@content` ルールの代わりに注入されます。

::: code-group

```scss [SCSS]
@mixin hover {
  &:not([disabled]):hover {
    @content;
  }
}

.button {
  border: 1px solid black;
  @include hover {
    border-width: 2px;
  }
}
```

```css [CSS]
.button {
  border: 1px solid black;
}
.button:not([disabled]):hover {
  border-width: 2px;
}
```

:::

::: tip

💡 Fun fact:

mixinは複数の `@content` のat-ruleを含むことができます。その場合、コンテンツブロックはそれぞれの `@content` に対して個別にインクルードされます。

:::

::: warning

⚠️ Heads up!

コンテンツブロックはレキシックスコープされます。つまり、ミキシンが含まれるスコープ内のローカル変数のみを参照することができます。つまり、ミキシンが含まれているスコープ内のローカル変数しか見ることができません。

:::

#### コンテンツブロックに引数を渡す

互換性:

- Dart Sass: since 1.15.0
- LibSass: ✗
- Ruby Sass: ✗

mixinはcontentブロックに対して、他のmixinに引数を渡すのと同じように `@content(<arguments...>)` と記述することで引数を渡すことができます。コンテンツブロックを書いているユーザは、`@include <name> using (<arguments...>)` と書くことで、引数を受け取ることができます。コンテンツブロックの引数リストはミキシンの引数リストと同じように動作し、 `@content` から渡される引数はミキシンに引数を渡すのと同じように動作します。

::: warning

⚠️ Heads up!

mixin がそのコンテンツブロックに引数を渡す場合、そのコンテンツブロックはそれらの引数を受け入れることを宣言しなければなりません。これは、（名前ではなく）位置によってのみ引数を渡すことが良いアイデアであり、より多くの引数を渡すことは、破壊的な変更であることを意味します。

コンテンツ・ブロックに渡す情報を柔軟に変えたい場合は、コンテンツ・ブロックが必要とする情報を含むマップを渡すことを検討してみてください。

:::

::: code-group

```scss [SCSS]
@mixin media($types...) {
  @each $type in $types {
    @media #{$type} {
      @content($type);
    }
  }
}

@include media(screen, print) using ($type) {
  h1 {
    font-size: 40px;
    @if $type == print {
      font-family: Calluna;
    }
  }
}
```

```css [CSS]
@media screen {
  h1 {
    font-size: 40px;
  }
}
@media print {
  h1 {
    font-size: 40px;
    font-family: Calluna;
  }
}
```

:::


### インデントされたミキシンのシンタックス

インデントされた構文では、標準の `@mixin` と `@include` に加えて、ミキシンを定義したり使用するための特別な構文があります。ミキシンは `=` という文字で定義し、 `+` という文字でインクルードします。この構文はより簡単ですが、一目で理解するのが難しいので、ユーザーは避けることが推奨されます。

::: code-group

```sass [SASS]
=reset-list
  margin: 0
  padding: 0
  list-style: none

=horizontal-list
  +reset-list

  li
    display: inline-block
    margin:
      left: -2px
      right: 2em

nav ul
  +horizontal-list
```

```css [CSS]
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav ul li {
  display: inline-block;
  margin-left: -2px;
  margin-right: 2em;
}
```

:::

## `@function`

関数を使用すると、SassScript の値に対する複雑な操作を定義して、スタイルシート全体で再利用することができます。これにより、一般的な数式や動作を読みやすい方法で簡単に抽象化することができます。

関数は `@function` というアットルールを使って定義します。これは `@function <name>(<arguments...>) { ...}`.関数の名前には、任意のSass識別子を使用することができます。また、関数の呼び出しの結果として使用する値を示す `@return` アトリビュートも含めることができます。関数は、通常の CSS 関数構文で呼び出すことができます。

::: code-group

```scss [SCSS]
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;
}
```

```CSS [CSS]
.sidebar {
  float: left;
  margin-left: 64px;
}
```

:::

::: tip

💡 Fun fact:

関数名は、すべての Sass 識別子のように、ハイフンやアンダースコアを同一として扱います。つまり、scale-color と scale_color はどちらも同じ関数を参照していることになります。これは、Sassのごく初期に、識別子名にアンダースコアしか使用できなかったことに由来しています。SassがCSSの構文に合わせてハイフンのサポートを追加した後、移行を容易にするためにこの2つが等価になりました。

:::

::: warning

⚠️ Heads up!

関数がグローバル変数の設定などの副作用を持つことは技術的には可能ですが、これは強く推奨されません。副作用のためにミキシンを使用し、関数は値を計算するためだけに使用してください。

:::

### 引数

引数によって、関数は呼び出されるたびにその動作をカスタマイズすることができます。引数は `@function` ルールの中で関数名の後に、括弧で囲まれた変数名のリストとして指定します。関数は、SassScript の式の形式で同じ数の引数を指定して呼び出す必要があります。これらの式の値は、対応する変数として関数の本文中で使用できます。

::: tip

💡 Fun fact:

引数リストには、末尾にカンマを付けることができます。これにより、スタイルシートのリファクタリング時に構文エラーを回避することが容易になります。

:::

#### オプションの引数

通常、関数が宣言しているすべての引数は、その関数が含まれるときに渡されなければなりません。しかし、引数が渡されない場合に使用されるデフォルト値を定義することで、引数をオプションにすることができます。デフォルト値は、変数宣言と同じ構文を使用します。変数名、コロン、SassScript 式が続きます。これにより、単純な方法から複雑な方法まで柔軟に使用できる関数 API を簡単に定義することができます。

::: code-group

```scss [SCSS]
@function invert($color, $amount: 100%) {
  $inverse: change-color($color, $hue: hue($color) + 180);
  @return mix($inverse, $color, $amount);
}

$primary-color: #036;
.header {
  background-color: invert($primary-color, 80%);
}
```

```css [CSS]
.header {
  background-color: #523314;
}
```

:::

::: tip

💡 Fun fact:

デフォルト値は、任意の SassScript 式を指定でき、以前の引数を参照することも可能です。

:::


#### キーワードの引数

関数を呼び出す際には、引数リスト内の位置だけでなく名前でも引数を渡すことができます。これは、複数のオプション引数を持つ関数や、名前を指定しないと意味がわからないようなブール型引数を持つ関数で特に有用です。キーワード引数は、変数宣言やオプション引数と同じ構文が使用されます。

::: code-group

```scss [SCSS]
$primary-color: #036;
.banner {
  background-color: $primary-color;
  color: scale-color($primary-color, $lightness: +40%);
}
```

```css [CSS]
.banner {
  background-color: #036;
  color: #0a85ff;
}
```

:::

::: warning

⚠️ Heads up!

どのような引数でも名前で渡すことができるので、関数の引数の名前を変更するときには注意が必要です......ユーザーが壊れてしまうかもしれません!しばらくの間、古い名前をオプションの引数として残しておき、誰かがそれを渡すと警告を表示して、新しい引数に移行することを知らせるようにすると便利です。

:::

#### 引数を任意に取る

時には、関数が任意の数の引数を取ることができると便利なことがあります。もし `@function` 宣言の最後の引数が ... で終わっていれば、その関数のすべての余分な引数はリストとしてその引数に渡されます。この引数は引数リストとして知られています。

::: code-group

```scss [SCSS]
@function sum($numbers...) {
  $sum: 0;
  @each $number in $numbers {
    $sum: $sum + $number;
  }
  @return $sum;
}

.micro {
  width: sum(50px, 30px, 100px);
}
```

```css [CSS]
.micro {
  width: 180px;
}
```

:::


#### キーワードの引数を任意に取る

引数リストを使用すると、任意のキーワード引数を取ることもできます。meta.keywords() 関数は引数リストを受け取り、関数に渡された任意のキーワードを引数名 ($ を含まない) からそれらの引数の値へのマップとして返します。

::: tip

💡 Fun fact:

meta.keywords()関数に引数リストを渡さなかった場合、 その引数リストでは余分なキーワード引数を許しません。これは、関数の呼び出し側が引数名のスペルを間違えていないことを確認するのに役立ちます。

:::

#### 任意の引数を渡す

引数リストによって関数が任意の位置やキーワードの引数を取ることができるように、同じ構文を使って位置やキーワードの引数を関数に渡すことができます。関数呼び出しの最後の引数として、リストの後に ... を渡すと、その要素は追加の位置引数として扱われます。同様に、マップの後に ... を渡すと、追加のキーワード引数として扱われます。一度に両方を渡すことも可能です。

::: code-group

```scss [SCSS]
$widths: 50px, 30px, 100px;
.micro {
  width: min($widths...);
}
```

```css [CSS]
.micro {
  width: 30px;
}
```

:::

::: tip

💡 Fun fact:

引数リストには位置引数とキーワード引数の両方が記録されているので、それを使って別の関数に一度に両方の引数を渡すことができます。そのため、関数の別名を定義するのが非常に簡単です。

```scss [SCSS]
@function fg($args...) {
  @warn "The fg() function is deprecated. Call foreground() instead.";
  @return foreground($args...);
}
```

:::


### `@return`

`@return` アットルールは、関数を呼び出した結果として使用する値を指定します。これは `@function` 本体の中でのみ使用可能で、各 `@function` は `@return` で終わらなければなりません。

`@return` に出会ったら、すぐに関数を終了してその結果を返します。早期に結果を返すことは、エッジケースを処理する場合や、関数全体を `@else` ブロックでラップせずに、より効率的なアルゴリズムが利用できる場合などに便利です。

```scss
@use "sass:string";

@function str-insert($string, $insert, $index) {
  // Avoid making new strings if we don't need to.
  @if string.length($string) == 0 {
    @return $insert;
  }

  $before: string.slice($string, 0, $index);
  $after: string.slice($string, $index);
  @return $before + $insert + $after;
}
```

### その他の関数

ユーザー定義関数に加え、Sass には常に使用可能な組み込み関数の充実したコア・ライブラリが用意されています。Sass の実装では、ホスト言語でカスタム関数を定義することも可能です。もちろん、CSS の関数（奇妙な構文の関数も含む）を呼び出すこともできます。

#### プレーンCSS関数

ユーザー定義関数でも組み込み関数でもない関数呼び出しは、プレーン CSS 関数にコンパイルされます（Sass 引数構文を使用していない場合）。引数は CSS にコンパイルされ、そのまま関数呼び出しに含まれます。これにより、新しい関数が追加されるたびに新しいバージョンをリリースする必要がなく、SassがすべてのCSS関数をサポートすることが保証されます。

```scss
@debug var(--main-bg-color); // var(--main-bg-color)

$primary: #f2ece4;
$accent: #e1d7d2;
@debug radial-gradient($primary, $accent); // radial-gradient(#f2ece4, #e1d7d2)
```

::: warning

⚠️ Heads up!

未知の関数はCSSにコンパイルされるため、関数名をタイプミスしてしまうと簡単に見逃してしまいます。スタイルシートの出力に対してCSSリンターを実行し、このような事態が発生した場合に通知を受けることを検討してください。

:::

::: tip

💡 Fun fact:

calc() や element() など、いくつかの CSS 関数は変わった構文を持っています。Sassはこれらの関数を引用符で囲まれていない文字列として特別にパースします。

:::

## `@extend`

ページをデザインするとき、あるクラスが他のクラスのすべてのスタイルと、それ自身の固有のスタイルを持つべき場合がよくあります。たとえば、BEMの手法では、ブロックや要素クラスと同じ要素につける修飾クラスを推奨しています。しかし、これではHTMLが乱雑になり、両方のクラスを含めるのを忘れることによるエラーが発生しやすく、マークアップに非意味的なスタイルの懸念がもたらされる可能性があります。

```html
<div class="error error--serious">
  やばい、ハッキングされてる!
</div>
```
 
```css
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.error--serious {
  border-width: 3px;
}
```

Sassの `@extend` ルールがこれを解決してくれます。これは `@extend <selector>` と記述し、あるセレクタが他のセレクタのスタイルを継承するようにSassに指示するものです。

::: code-group

```scss [SCSS]
.error {
  border: 1px #f00;
  background-color: #fdd;

  &--serious {
    @extend .error;
    border-width: 3px;
  }
}
```

```css [CSS]
.error, .error--serious {
  border: 1px #f00;
  background-color: #fdd;
}
.error--serious {
  border-width: 3px;
}
```

:::

あるクラスが別のクラスを拡張するとき、Sassは拡張子にマッチするすべての要素を、拡張されるクラスにもマッチするかのようにスタイル付けします。あるクラスセレクタが別のクラスを拡張するとき、それはあたかも拡張クラスをすでに持っているHTMLのすべての要素に追加したかのように動作します。class="error--serious" と書けば、Sassはそれがあたかもclass="error "を持つかのようにスタイル付けを行うのです。

もちろん、セレクタはそれ自体でスタイルルールに使われるだけではありません。Sassはセレクタが使用されるあらゆる場所で拡張することを知っています。これにより、拡張されたセレクタにマッチしたかのように、要素が正確にスタイルされることを保証します。

::: code-group

```scss [SCSS]
.error:hover {
  background-color: #fee;
}

.error--serious {
  @extend .error;
  border-width: 3px;
}
```

```css [CSS]
.error:hover, .error--serious:hover {
  background-color: #fee;
}

.error--serious {
  border-width: 3px;
}
```

::: warning

⚠️ Heads up!

Extendsは、スタイルシートの残りの部分がコンパイルされた後に解決されます。特に、親セレクタが解決された後に行われます。つまり、`@extend .error` の場合、`.error { &__icon { ... }}`の内部セレクタには影響を与えません。.また、SassScriptの親セレクタはextendの結果を見ることができないことも意味しています。

:::

### 仕組み

スタイルを現在のスタイル・ルールにコピーする mixin とは異なり、`@extend` は拡張セレクタを含むスタイル・ルールを更新し、拡張セレクタも含むようにします。セレクタを拡張する際、Sassはインテリジェントな統一を行います。

- main#footerのような、どの要素にもマッチしないセレクタは生成されません。
- 複雑なセレクタは、HTML要素がどの順番でネストされても動作するように、インターリーブされます。
- エクステンダーと同等以上の特異性を確保しつつ、冗長なセレクタを可能な限り切り詰めます。
- あるセレクタが他のセレクタのすべてにマッチするとき、それを知っていて、それらを一緒に結合することができます。
- コンビネータ、ユニバーサルセレクタ、セレクタを含む擬似クラスをインテリジェントに扱います。

::: code-group

```scss [SCSS]
.content nav.sidebar {
  @extend .info;
}

// これは拡張されません。なぜなら `p` は `nav` と互換性がないからです。
p.info {
  background-color: #dee9fc;
}

// <div class="guide">` が `<div class="content">` の中に入るのか
// 外に出るのか知る術はないので、Sass は安全のために両方を生成します。
.guide .info {
  border: 1px solid rgba(#000, 0.8);
  border-radius: 2px;
}

// Sass は "main.content" にマッチするすべての要素が ".content" にも
// マッチすることを認識し、不要なインターリーブ・セレクタの生成を回避しています。
main.content .info {
  font-size: 0.8em;
}
```

```css
p.info {
  background-color: #dee9fc;
}

.guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar {
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 2px;
}

main.content .info, main.content nav.sidebar {
  font-size: 0.8em;
}
```

:::

::: tip

💡 Fun fact:

セレクタ関数を使って、Sassのインテリジェントな単一化に直接アクセスすることができます!selector.unify() 関数は、2つのセレクタの交差点にマッチするセレクタを返します。一方、selector.extend() 関数は `@extend` のように動作しますが、1つのセレクタに対してのみ動作します。

:::

::: warning

⚠️ Heads up!

`@extend` は拡張セレクタを含むスタイルルールを更新するので、それらのスタイルは `@extend` が現れる場所ではなく、拡張セレクタのスタイルルールが現れる場所に基づいて、カスケードで優先されます。これは混乱するかもしれませんが、覚えておいてください：これは、拡張クラスをHTMLに追加した場合にこれらのルールが持つのと同じ優先順位です

:::

### プレースホルダーセレクタ

拡張されることだけを意図したスタイル規則を書きたい場合があります。この場合、プレースホルダーセレクタを使用します。これは、.の代わりに%で始まるクラスセレクタのように見えます。プレースホルダーを含むセレクタは CSS 出力に含まれませんが、それを拡張するセレクタは含まれます。

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


#### プライベートプレースホルダー

モジュール・メンバーのように、プレースホルダー・セレクターは、その名前を-か_のどちらかで始めることによって、プライベートとマークすることができます。プライベート・プレースホルダー・セレクターは、それを定義しているスタイルシートの中でのみ拡張することができます。他のスタイルシートに対しては、そのセレクタが存在しないかのように見えます。

### 拡張スコープ

あるスタイルシートがセレクタを拡張するとき、その拡張は上流のモジュールに書かれたスタイル・ルールだけに影響します。つまり、そのスタイルシートが `@use` ルールや `@forward` ルールでロードしたモジュール、それらのモジュールによってロードされたモジュールなどです。これは `@extend` ルールをより予測しやすくし、それを書いたときに意識していたスタイルだけに影響を与えることを保証するのに役立ちます。

::: warning

⚠️ Heads up!

拡張機能は `@import` ルールを使用している場合、全くスコープされません。あなたがインポートするすべてのスタイルシートに影響を与えるだけでなく、あなたのスタイルシートをインポートするすべてのスタイルシート、それらのスタイルシートがインポートするすべてのもの、などなどにも影響を与えます。use` がなければ、エクステンションはグローバルなものとなります。

:::

### 必須およびオプションのエクステンド

通常、`@extend`がスタイルシート内のどのセレクタにもマッチしない場合、Sassはエラーを発生させます。これは、タイプミスや、継承するセレクタの名前を変更することなくセレクタの名前を変更することを防ぐのに役立ちます。拡張されたセレクタが存在することを必要とする拡張は必須です。

しかし、これは必ずしも望むことではありません。もし、拡張セレクタが存在しない場合に `@extend` が何もしないようにしたい場合は、末尾に !optional を追加してください。

### エクステンドかミキシンか？

Extends と Mixins はどちらも Sass でスタイルをカプセル化し、再利用する方法です。ミキシンは、引数を使用してスタイルを構成する必要がある場合に明らかに必要ですが、それらが単にスタイルの塊である場合はどうでしょうか？

経験則から言うと、セマンティッククラス（または他のセマンティックセレクタ）間の関係を表現する場合は、extendsが最適な選択肢となります。クラス .error--serious を持つ要素はエラーであるため、.error を拡張することは理にかなっています。しかし、セマンティックでないスタイルのコレクションでは、ミキシンを書くことでカスケードの頭痛の種を回避し、後々の設定を容易にすることができます。

::: tip

💡 Fun fact:

ほとんどのウェブサーバーは、同じテキストの繰り返しの塊を扱うのが得意なアルゴリズムを使って、CSS を圧縮して提供します。つまり、mixinはextendsよりも多くのCSSを生成するかもしれませんが、おそらくユーザーがダウンロードする必要のある量を大幅に増加させることはないでしょう。ですから、最も少ないCSSを生成する機能ではなく、あなたのユースケースに最も適した機能を選択してください。

:::

### 制限事項

許可されないセレクタ パーマリンク許可されないセレクタ

互換性 (複合エクステンションの禁止):

- Dart Sass: ✓
- LibSass: ✗
- Ruby Sass: ✗
- ▶

単純なセレクタ、つまり .info や a のような個々のセレクタだけが拡張できます。もし .message.info が拡張可能なら、`@extend` の定義では、拡張子にマッチした要素は .message.info にマッチしたかのようにスタイルされると言っています。これは .message と .info の両方にマッチするのと同じことなので、`@extend` .message, .info の代わりにそう書いても何のメリットもないでしょう。

同様に、もし.main .infoを拡張することができれば、それは.infoをそれ自体で拡張するのと(ほとんど)同じことをすることになります。微妙な違いは、実質的に違うことをやっているように見えるという混乱に見合うものではないので、これも許されません。

```scss
.alert {
  @extend .message.info;
  //      ^^^^^^^^^^^^^
  // Error: Write @extend .message, .info instead.

  @extend .main .info;
  //      ^^^^^^^^^^^
  // Error: write @extend .info instead.
}
```

#### HTMLヒューリスティック

`@extend` が複雑なセレクタを連結するとき、祖先のセレクタのすべての可能な組み合わせを生成するわけではありません。生成できるセレクタの多くは実際のHTMLにマッチしそうにありませんし、それらをすべて生成すると、スタイルシートが大きくなりすぎて、実際の価値はほとんどありません。その代わりに、ヒューリスティックな方法を使います。それは、各セレクタの祖先が他のセレクタの祖先と交わることなく自己完結していると仮定することです。

::: code-group

```scss [SCSS]
header .warning li {
  font-weight: bold;
}

aside .notice dd {
  // <dd>に合わせたCSSはSassでは生成されません。
  //
  // <header>
  //   <aside>
  //     <div class="warning">
  //       <div class="notice">
  //         <dd>...</dd>
  //       </div>
  //     </div>
  //   </aside>
  // </header>
  //
  // というのも、このようにすべての要素にマッチさせると、
  // 2つだけでなく9つの新しいセレクタを生成する必要があるからです。
  @extend li;
}
```

```css [CSS]
header .warning li, header .warning aside .notice dd, aside .notice header .warning dd {
  font-weight: bold;
}
```

:::

#### `@media`で拡張する

`@extend` は `@media` や他の CSS アットルール内では許されますが、そのアットルール外に現れるセレクタを拡張することはできません。これは、拡張するセレクタは与えられたメディア コンテキスト内にのみ適用され、スタイル ルール全体を複製せずに、生成されるセレクタにその制限が維持されることを確認する方法がないためです。

```scss
@media screen and (max-width: 600px) {
  .error--serious {
    @extend .error;
    //      ^^^^^^
    // Error: ".error"は@mediaの中で拡張されたが、その外で使用された。
  }
}

.error {
  border: 1px #f00;
  background-color: #fdd;
}
```


## `@error` 

引数を取る mixin や関数を書くとき、通常はそれらの引数が API が期待する型や形式を持っていることを確認したいと思います。もしそうでなければ、ユーザーに通知して mixin/function の実行を停止させる必要があります。

Sassは、`@error <expression>`と書かれた `@error` ルールでこれを簡単にします。 式の値（通常は文字列）と、現在のミキシンまたは関数がどのように呼び出されたかを示すスタックトレースが表示されます。 エラーが表示されると、Sassはスタイルシートのコンパイルを中止し、実行しているシステムにエラーが発生したことを伝えます。

```scss
@mixin reflexive-position($property, $value) {
  @if $property != left and $property != right {
    @error "Property #{$property} must be either left or right.";
  }

  $left-value: if($property == right, initial, $value);
  $right-value: if($property == right, $value, initial);

  left: $left-value;
  right: $right-value;
  [dir=rtl] & {
    left: $right-value;
    right: $left-value;
  }
}

.sidebar {
  @include reflexive-position(top, 12px);
  //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Error: プロパティトップは左または右のいずれかでなければなりません。
}
```

エラーとスタックトレースの正確なフォーマットは、実装によって異なり、またビルドシステムにも依存する場合があります。Dart Sassでコマンドラインから実行すると、このように表示されます。

```
Error: "Property top must be either left or right."
  ╷
3 │     @error "Property #{$property} must be either left or right.";
  │     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  ╵
  example.scss 3:5   reflexive-position()
  example.scss 19:3  root stylesheet
```


## `@warn` 

mixinや関数を書くとき、ある引数やある値を渡すのをやめさせたいと思うことがあるかもしれません。現在では廃止されているレガシーな引数を渡していたり、最適とは言えない方法でAPIを呼び出していたりする可能性があります。

そのために設計されたのが `@warn` ルールです。これは `@warn <expression>` と書かれ、ユーザーに対して式の値 (通常は文字列) を表示し、現在の mixin や関数がどのように呼び出されたかを示すスタックトレースも表示されます。しかし、`@error`ルールとは異なり、Sassを完全に停止するわけではありません。

::: code-group

```scss [SCSS]
$known-prefixes: webkit, moz, ms, o;

@mixin prefix($property, $value, $prefixes) {
  @each $prefix in $prefixes {
    @if not index($known-prefixes, $prefix) {
      @warn "Unknown prefix #{$prefix}.";
    }

    -#{$prefix}-#{$property}: $value;
  }
  #{$property}: $value;
}

.tilt {
  // おっと、「webkit」を「wekbit」と打ち間違えてしまいました。
  @include prefix(transform, rotate(15deg), wekbit ms);
}
```

```css [CSS]
.tilt {
  -wekbit-transform: rotate(15deg);
  -ms-transform: rotate(15deg);
  transform: rotate(15deg);
}
```

:::

警告とスタックトレースの正確な形式は、実装によって異なります。Dart Sassではこのようになっています。

```
Warning: Unknown prefix wekbit.
    example.scss 6:7   prefix()
    example.scss 16:3  root stylesheet
```


## `@debug` 

スタイルシートの開発中に変数や式の値を確認するのに便利なことがあります。これは `@debug <expression>` と書かれ、ファイル名と行番号とともに式の値を表示します。

```scss
@mixin inset-divider-offset($offset, $padding) {
  $divider-offset: (2 * $padding) + $offset;
  @debug "divider offset: #{$divider-offset}";

  margin-left: $divider-offset;
  width: calc(100% - #{$divider-offset});
}
```

デバッグメッセージの正確なフォーマットは、実装によって異なります。Dart Sassではこのような感じです。

```
test.scss:3 Debug: divider offset: 132px
```

::: tip

💡 Fun fact:

`@debug` には文字列だけでなく、どんな値でも渡すことができます。これは、meta.inspect()関数と同じ表現でその値を表示します。

:::


## `@at-root`

`@at-root` ルールは、通常 `@at-root <selector> { ... }` と記述します。}` と記述し、通常のネストではなく、ドキュメントのルートで発行されるようにします。SassScript の親セレクタとセレクタ関数で高度なネストを行う際によく使用されます。

例えば、外側のセレクタと要素のセレクタをマッチさせるセレクタを書きたい場合を考えてみましょう。このようにmixinを書いて、selector.unify()関数を使って&とユーザーのセレクタを結合させることができます。

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

Sassはセレクタの入れ子を行う際に、セレクタを生成するためにどのような補間が行われたかを知らないため、`@at-root`ルールが必要です。つまり、SassScriptの式に&を使用した場合でも、自動的に外側のセレクタを内側のセレクタに追加してしまうのです。`@at-root` は、外側のセレクタを含めないように Sass に明示的に指示します。

::: tip

💡 Fun fact:

`@at-root`ルールは、`@at-root { ... }`と書くこともできます。 と書くこともでき、複数のスタイル・ルールをドキュメントのルートに置くことができます。実際、`@at-root <selector> { ... }` は `@at-root { <selector> { ... }}` の略語に過ぎません。!

:::

### Beyond Style Rules

それ自身は、`@at-root`はスタイルルールを取り除くだけです。`@media` や `@supports` のようなアットルールはすべて残ります。 もし、これが気に入らない場合は、メディアクエリ機能のような構文を使って、何を含むか、何を含まないかを正確に制御することができます。`@at-root (with: <rules...>) { ....}` または `@at-root (without: <rules...>) { ....}`。 `(without: ...)` クエリは、どのルールを除外するかをSassに指示し、 `(with: ...)` クエリは、リストにあるルール以外を除外します。

::: code-group

```scss [SCSS]
@media print {
  .page {
    width: 8in;

    @at-root (without: media) {
      color: #111;
    }

    @at-root (with: rule) {
      font-size: 1.2em;
    }
  }
}
```

```css [CSS]
@media print {
  .page {
    width: 8in;
  }
}
.page {
  color: #111;
}
.page {
  font-size: 1.2em;
}
```

:::

アットルールの名前に加えて、クエリで使用できる特別な値が2つあります。

- rule はスタイルルールを参照します。例えば、`@at-root` (with: rule)はすべてのat-ruleを除外しますが、スタイルルールは維持します。
- allはすべてのアットルールを指し、スタイルルールは除外されるべきです。


## フロー制御ルール

Sass には、スタイルが出力されるかどうかを制御したり、小さなバリエーションで何度も出力することを可能にする、いくつかの at-rules が用意されています。また、ミックスインや関数の中で使用することで、小さなアルゴリズムを記述し、Sassの記述を容易にすることができます。Sassは4つのフロー制御ルールをサポートしています。

- `@if` はブロックが評価されるかどうかを制御します。
- `@each` はリストの各要素、またはマップの各ペアに対してブロックを評価します。
- `@for` はブロックをある回数だけ評価します。
- `@while` は特定の条件が満たされるまでブロックを評価します。

### `@if` and `@else`

`@if` ルールは `@if <expression> { ... }` と記述します。 と書かれ、ブロックが評価されるかどうか（CSSとしてスタイルを出力するかどうかも含めて）を制御します。式は通常、真か偽のどちらかを返します。式が真を返した場合、ブロックは評価され、偽を返した場合は評価されません。

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


#### `@else`

`@if` ルールの後には、オプションで `@else` ルールを記述することができます（`@else { ... }`と記述します).このルールのブロックは、 `@if` 式が false を返した場合に評価されます。

::: code-group

```scss [SCSS]
$light-background: #f2ece4;
$light-text: #036;
$dark-background: #6b717f;
$dark-text: #d2e1dd;

@mixin theme-colors($light-theme: true) {
  @if $light-theme {
    background-color: $light-background;
    color: $light-text;
  } @else {
    background-color: $dark-background;
    color: $dark-text;
  }
}

.banner {
  @include theme-colors($light-theme: true);
  body.dark & {
    @include theme-colors($light-theme: false);
  }
}
```

```css [CSS]
.banner {
  background-color: #f2ece4;
  color: #036;
}
body.dark .banner {
  background-color: #6b717f;
  color: #d2e1dd;
}
```

:::


条件式は、ブール演算子（and, or, not）を含むことができる。

#### `@else if`

また、`@else`ルールのブロックを評価するかどうかは、`@else if <expression> { ... }`と書くことで選択できます.この場合、直前の `@if's` 式が false を返し、かつ `@else if's` 式が true を返した場合にのみ、ブロックが評価されます。

実際には、 `@if` の後に `@else if` を好きなだけ連鎖させることができます。鎖の中で式が真を返す最初のブロックが評価され、それ以外のブロックは評価されません。もし、鎖の最後にプレーンな `@else` があれば、他のすべてのブロックが失敗しても、そのブロックが評価されます。

::: code-group

```scss [SCSS]
@use "sass:math";

@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;

  border-color: transparent;
  border-style: solid;
  border-width: math.div($size, 2);

  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.next {
  @include triangle(5px, black, right);
}
```

```css [CSS]
.next {
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 2.5px;
  border-left-color: black;
}
```

:::


##### 真実性と虚偽性

true または false が許される場所では、他の値も使用することができます。false と null は虚偽であり、Sass はそれらを虚偽であるとみなし、条件を失敗させることを意味します。他のすべての値は真偽があるとみなされ、Sassはそれらをtrueのように動作し、条件を成功させる原因と見なします。

例えば、文字列にスペースが含まれているかどうかをチェックしたい場合は、string.index($string, " ")と書けばよいのです。string.index() 関数は、文字列が見つからなければ null を返し、そうでなければ数値を返します。

::: warning

⚠️ Heads up!

言語によっては、false や null よりも多くの値を falsey と見なすものもあります。Sass はそれらの言語の一つではありません。空の文字列、空のリスト、そして数字の 0 はすべて Sass では真実になります。

:::

### `@each`

`@each` ルールを使うと、リストの各要素やマップの各ペアに対して、簡単にスタイルを発行したり、コードを評価したりすることができます。これは、いくつかのバリエーションしかないような、繰り返しの多いスタイルに最適です。通常、`@each <variable> in <expression> { ... }`と記述します。 と書き、式はリストを返します。このブロックはリストの各要素に対して順番に評価され、与えられた変数名に代入されます。

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

#### With Maps

また、`@each` を使って、マップ内のすべてのキーと値のペアを反復処理することもできます。例えば、`@each <variable>, <variable> in <expression> { ... }`.最初の変数名にはキーが、2番目の変数名には要素が代入されます。

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

#### デストラクチャリング

リストのリストがある場合、 `@each` を使って、 `@each <variable...> in <expression> { ... }` と書くことで、内側のリストの各値に自動的に変数を代入することができます。. これは、変数が内部のリストの構造と一致することから、「デストラクチャリング」と呼ばれています。各変数名には、リスト内の対応する位置の値が代入され、リストに十分な値がない場合は null が代入されます。

::: code-group

```scss [SCSS]
$icons:
  "eye" "\f112" 12px,
  "start" "\f12e" 16px,
  "stop" "\f12f" 10px;

@each $name, $glyph, $size in $icons {
  .icon-#{$name}:before {
    display: inline-block;
    font-family: "Icon Font";
    content: $glyph;
    font-size: $size;
  }
}
```

```css [CSS]
@charset "UTF-8";
.icon-eye:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 12px;
}

.icon-start:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 16px;
}

.icon-stop:before {
  display: inline-block;
  font-family: "Icon Font";
  content: "";
  font-size: 10px;
}
```

::: tip

💡 Fun fact:

`@each` はデストラクチャリングをサポートしており、マップはリストのリストとしてカウントされるので、 `@each` のマップサポートは特にマップに対する特別なサポートを必要とせずに動作します。

:::

### `@for`

`@for` ルールは、`@for <variable> from <expression> to <expression> { ... }`と書きます。 または `@for <variable> from <expression> through <expression> { ... }` と書くと、ある数字（最初の式の結果）から別の数字（2番目の式の結果）までカウントアップまたはカウントダウンし、その間にある各数字に対してブロックを評価することになります。 途中の各数値は、与えられた変数名に代入される。toが使われた場合は、最後の数字は除外され、throughが使われた場合は、含まれる。

::: code-group

```scss [SCSS]
$base-color: #036;

@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}
```

```css [CSS]
ul:nth-child(3n + 1) {
  background-color: #004080;
}

ul:nth-child(3n + 2) {
  background-color: #004d99;
}

ul:nth-child(3n + 3) {
  background-color: #0059b3;
}
```

:::

### `@while`

`@while <expression> { ... }`と書かれた `@while` ルールは、その式が真を返した場合にブロックを評価します。 は、その式が真を返したら、そのブロックを評価します。そして、その式がまだ真を返していれば、そのブロックを再び評価します。これは、最終的に式が偽を返すまで続けられます。

::: code-group

```scss [SCSS]
@use "sass:math";

/// `$value`を`$base`以下になるまで`$ratio`で割る。
@function scale-below($value, $base, $ratio: 1.618) {
  @while $value > $base {
    $value: math.div($value, $ratio);
  }
  @return $value;
}

$normal-font-size: 16px;
sup {
  font-size: scale-below(20px, 16px);
}
```

```css [CSS]
sup {
  font-size: 12.36094px;
}
```

:::

::: warning

⚠️ Heads up!

`@while` は特に複雑なスタイルシートでは必要ですが、通常は `@each` か `@for` のどちらかを使った方がよいでしょう。これらの方が読者にとってわかりやすく、また、コンパイルも速くなることが多いからです。

:::

#### 真実性と虚偽性

true または false が許される場所では、他の値も使用することができます。false と null は虚偽であり、Sass はそれらを虚偽であるとみなし、条件を失敗させることを意味します。他のすべての値は真偽があるとみなされ、Sassはそれらをtrueのように動作し、条件を成功させる原因と見なします。

例えば、文字列にスペースが含まれているかどうかをチェックしたい場合は、string.index($string, " ")と書けばよいのです。string.index() 関数は、文字列が見つからなければ null を返し、そうでなければ数値を返します。

::: warning

⚠️ Heads up!

言語によっては、false や null よりも多くの値を falsey と見なすものもあります。Sass はそれらの言語の一つではありません。空の文字列、空のリスト、そして数字の 0 はすべて Sass では真実になります。

:::

## CSSから

互換性 (Name Interpolation):

- Dart Sass: since 1.15.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

Sassは、CSSに含まれる全てのat-ruleをサポートしています。柔軟性を保ち、将来のバージョンの CSS と互換性を保つために、Sass はデフォルトでほぼ全ての at-rule をサポートします。CSS のアットルールは、`@<name> <value>, @<name> { ... }` と記述されます。または `@<name> <value> { ... }`. nameは識別子でなければならず、valueは（存在すれば）ほとんど何でもかまいません。名前と値の両方が補間を含むことができます。

::: code-group

```scss [SCSS]
@namespace svg url(http://www.w3.org/2000/svg);

@font-face {
  font-family: "Open Sans";
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
}

@counter-style thumbs {
  system: cyclic;
  symbols: "\1F44D";
}
```

```css [CSS]
@namespace svg url(http://www.w3.org/2000/svg);
@font-face {
  font-family: "Open Sans";
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2");
}
@counter-style thumbs {
  system: cyclic;
  symbols: "\1F44D";
}
```

CSSのat-ruleがスタイルルールの中に入れ子になっている場合、at-ruleがCSS出力のトップレベルに、スタイルルールがその中にあるように、両者は自動的に位置を交換する。これにより、スタイル・ルールのセレクタを書き換えることなく、条件付きスタイルを簡単に追加することができます。

::: code-group

```scss [SCSS]
.print-only {
  display: none;

  @media print { display: block; }
}
```

```css [CSS]
.print-only {
  display: none;
}
@media print {
  .print-only {
    display: block;
  }
}
```

:::


### `@media`

互換性 (Range Syntax):

- Dart Sass: since 1.11.0
- LibSass: ✗
- Ruby Sass: since 3.7.0
- ▶

`@media` ルールは、上記のすべてとそれ以上のことを行います。補間だけでなく、SassScript 式を機能クエリで直接使用することができます。

::: code-group

```scss [SCSS]
$layout-breakpoint-small: 960px;

@media (min-width: $layout-breakpoint-small) {
  .hide-extra-small {
    display: none;
  }
}
```

```css [CSS]
@media (min-width: 960px) {
  .hide-extra-small {
    display: none;
  }
}
```

:::

可能な場合、Sass はネストされた `@media` 規則をまだネイティブでサポートしていないブラウザをサポートしやすくするために、互いにネストされたメディアクエリをマージします。

::: code-group

```scss [SCSS]
@media (hover: hover) {
  .button:hover {
    border: 2px solid black;

    @media (color) {
      border-color: #036;
    }
  }
}
```

```css [CSS]
@media (hover: hover) {
  .button:hover {
    border: 2px solid black;
  }
}
@media (hover: hover) and (color) {
  .button:hover {
    border-color: #036;
  }
}
```


### `@supports`

また、`@supports`ルールにより、宣言クエリでSassScriptの式を使用することができます。

::: code-group

```scss [SCSS]
@mixin sticky-position {
  position: fixed;
  @supports (position: sticky) {
    position: sticky;
  }
}

.banner {
  @include sticky-position;
}
```

```css [CSS]
.banner {
  position: fixed;
}
@supports (position: sticky) {
  .banner {
    position: sticky;
  }
}
```

:::


### `@keyframes`

`@keyframes` ルールは、子ルールが通常のセレクタではなく、有効なキーフレーム・ルール (`<number>%`, `from`, `to`) でなければならないことを除いて、一般のアットルール同様に機能します。

::: code-group

```scss [SCSS]
@keyframes slide-in {
  from {
    margin-left: 100%;
    width: 300%;
  }

  70% {
    margin-left: 90%;
    width: 150%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}
```

```css [CSS]
@keyframes slide-in {
  from {
    margin-left: 100%;
    width: 300%;
  }
  70% {
    margin-left: 90%;
    width: 150%;
  }
  to {
    margin-left: 0%;
    width: 100%;
  }
}
```

:::