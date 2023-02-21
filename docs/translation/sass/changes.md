# ブレイキングチェンジ

[[TOC]]

## 概要

Sass の新バージョンは可能な限り後方互換性を保っていますが、時には破壊的な変更が必要な場合があります。Sass は進化する CSS 仕様に対応する必要があり、古い言語設計の誤りを修正する必要がある場合があります。

各破壊的な変更がリリースされる前に、Sass の実装は動作が変更されるスタイルシートに対して非推奨の警告を生成します。可能な限り、これらの警告には、非推奨のスタイルを更新して前方互換性を確保する方法についての提案が含まれます。

実装によって、変更点の修正と非推奨に関するポリシーが異なります。Dart Sass では、廃止予定の警告を廃止予定の変更をリリースする前に少なくとも3ヶ月間表示し、その変更が CSS の互換性のために必要でない限り、新しいメジャーバージョン番号で廃止予定の変更をリリースします。CSS 互換性のための変更は、多くの場合、破壊的でなく時間的制約があるため、代わりに新しいマイナー・バージョン番号でリリースされることがあります。

これらの変更は、近日中にリリースされるか、最近リリースされたものです。

- Dart Sass 1.32.0 以降、関数が許可するユニットがより厳しくなりました。
- Dart Sass 1.54.0 から、無効なコンビネータを持つセレクタは無効となります。
- Dart Sass 1.33.0 から `/` が分割演算子からリストセパレータに変更されました。
- Dart Sass 1.7.2 から @-moz-document の特殊な構文のパースが無効になる。
- Dart Sass 1.0.0 および Ruby Sass 4.0.0 で複合セレクタを拡張することができなかった。
- Dart Sass 1.0.0, LibSass 3.5.0, Ruby Sass 3.5.0 で、CSS カスタムプロパティ値の構文が変更されました。

## 厳密な単項演算子

Sass は歴史的に `-` と `+` を、作者が二項演算子か単項演算子かを曖昧にするような方法で使用することを許可してきました。この紛らわしい構文は非推奨となっています。

このプロパティはどのようにコンパイルされるのですか？

```scss
$size: 10px;

div {
  margin: 15px -$size;
}
```

ユーザーによっては、「-は$sizeとくっついているから、margin: 20px -10pxにするべきだ」と言うかもしれません。また、「-は20pxと$sizeの間にあるから、margin: 5pxにすべき」と言う人もいるかもしれません。Sassは現在、後者の意見に賛成していますが、本当の問題は、そもそもそれがとても紛らわしいということなのです!これは、CSSのスペースで区切られたリスト構文とSassの算術構文が組み合わされた、自然ではあるが不幸な結果です。

そのため、私たちはこれをエラーにするように動き出しています。今後、二項演算子（2つの数値を引き算または足し算する演算子）を使用したい場合は、両側またはどちらにも空白を入れる必要があります。

- Valid: 15px - $size
- Valid: (15px)-$size
- Invalid: 15px -$size

単項の - や + 演算子をスペースで区切られたリストの一部として使用したい場合は、（やはり）括弧で囲む必要があります。

- Valid: 15px (-$size)

### Transition Period

互換性:

- Dart Sass: since 1.55.0
- LibSass: ✗
- Ruby Sass: ✗

Dart Sass 2.0.0では、これをエラーとする予定ですが、それまでは非推奨の警告が表示されるだけでしょう。

::: tip

💡 Fun fact:

覚えておいてほしいのは、自分が管理していないライブラリからの非推奨の警告を黙らせることができるということです!コマンドラインインターフェイスを使用している場合は --quiet-deps フラグを、JavaScript API を使用している場合は quietDeps オプションを true に設定することができます。

:::


### 自動マイグレーション

Sass migrator を使用してスタイルシートを自動的に更新し、- または + 演算子の後にスペースを追加することで、これらのスタイルシートの既存の動作を維持することができます。

```bash
$ npm install -g sass-migrator
$ sass-migrator strict-unary **/*.scss
```

## Random With Units (none)

## 無効なコンビネータ

Sassは歴史的にセレクタでの先行、後続、繰り返しの組み合わせについて非常に寛容でした。これらのコンビーネーターは、入れ子にするのに便利な場合を除いて、非推奨となります。

Sassは歴史的に3つの無効なコンビーネータの使用をサポートしてきました。

- Leading combinators, as in + .error {color: red}.
- Trailing combinators, as in .error + {color: red}.
- Repeated combinators, as in div > > .error {color: red}.

これらはいずれも有効な CSS ではなく、いずれもブラウザが問題のスタイル ルールを無視する原因となります。これらをサポートすると、Sass の実装が大幅に複雑になり、特に @extend ルールに関連するさまざまなバグを修正することが難しくなります。そのため、これらの用途のサポートを削除することを決定しました。

ひとつだけ大きな例外があります。先頭と末尾のコンビネータは、ネストの目的でまだ使用することができます。例えば、次のようなものはまだ非常に多くサポートされています。

::: code-group

```scss [SCSS]
.sidebar > {
  .error {
    color: red;
  }
}
```

```css [CSS]
.sidebar > .error {
  color: red;
}
```

:::

Sassは、入れ子が解決された後、セレクタにまだ先頭または末尾のコンビネータがある場合にのみエラーを発生させます。一方、繰り返されるコンビネータは常にエラーとなります。

既存のスタイルシートが（おそらく偶然に）無効なコンビネータを含んでいることを確認するために、Dart Sass の次のメジャーリリースまで移行期間をサポートします。

### 移行期間

互換性:

- Dart Sass: since 1.54.0
- LibSass: ✗
- Ruby Sass: ✗

まず、すべてのダブルコンビネータと、ネスト解決後にセレクタの中で終わるリーディングまたはトレーリングコンビネータに対して非推奨の警告を出します。

::: tip

💡 Fun fact:

覚えておいてほしいのは、自分が管理していないライブラリからの非推奨の警告を黙らせることができるということです!コマンドラインインターフェイスを使用している場合は --quiet-deps フラグを渡すことができ、JavaScript API を使用している場合は quietDeps オプションを true に設定することができます。
さらに、コンパイルされたCSSから無効なCSSであることが分かっているセレクタを直ちに省略し始めます。ただし、1つの例外を除いて、先頭がコンビネータで始まるセレクタは省略しません。これは、@importルールやmeta.load-css() mixinがネストされて使用されている可能性があるためです。しかし、私たちはこのパターンを推奨しておらず、Dart Sass 2.0.0ではこのパターンのサポートを停止する予定です。

:::


## Media Queries Level 4

Sass は CSS Media Queries Level 4 仕様をサポートするようになりました。これはもともと、いくつかの Sass 固有の構文と衝突していたため、この構文は非推奨となり、現在は CSS 標準に従って解釈されます。

互換性:

- Dart Sass: since 1.56.0
- LibSass: ✗
- Ruby Sass: ✗

Sassは括弧付きのメディア条件でほぼ全てのSass表現をサポートしているため、Media Queries Level 4のフルサポートを追加したことで意味が変わってしまった構成がいくつかありました。具体的には

- media (not (foo)) は歴史的に @media (#{not (foo)}) の意味としてSassによって解釈されていたため、@media (false) にコンパイルされました。
- media ((foo) and (bar)) と @media ((foo) or (bar)) は同様にSassScriptの論理演算子として解釈され、それぞれ @media (bar) と @media (foo) にコンパイルされました。

幸いなことに、これらは実際にはほとんど出てきません。

### 移行期間

互換性:

- Dart Sass: since 1.54.0
- LibSass: ✗
- Ruby Sass: ✗

まず、これまでのあいまいなケースに対して非推奨の警告を発しました。これらには、既存の動作を維持する方法、あるいは新しいCSS構文を使用する方法についての提案があります。

## / as Divisions

Sass は現在、ある文脈では / を分割操作として扱い、他の文脈では区切り記号として扱っています。このため、Sass ユーザーは任意の / が何を意味するのかを知ることが難しく、また / をセパレータとして使用する新しい CSS 機能と連携することが難しくなっています。

互換性:

- Dart Sass: partial
- LibSass: ✗
- Ruby Sass: ✗

今日、Sassは複雑なヒューリスティックを使って、/が分割として扱われるべきか、それともセパレータとして扱われるべきかを判断しています。それでも、セパレータとしては、Sass内部から検査するのが難しい引用符で囲まれていない文字列が生成されるだけです。CSS Gridや新しいrgb()やhsl()の構文など、ますます多くのCSS機能が/をセパレータとして使うようになり、これはSassユーザにとってますます苦痛になってきています。

SassはCSSのスーパーセットなので、/をセパレータとしてのみ再定義することでCSSの構文に合わせます。/ は新しいタイプのリストセパレータとして扱われ、今日 , がどのように機能するかと同様です。除算は、代わりに新しい math.div() 関数を使って記述されます。この関数は、現在の / と全く同じ動作をします。

この非推奨は calc() 式の中での / の使用には影響しません。

::: code-group

```scss [SCSS]
@use "sass:math";

// 未来のSass、まだ動いてない！？
.item3 {
  $row: span math.div(6, 2) / 7; // スラッシュで区切られた2つの要素からなるリスト。
  grid-row: $row;
}
```

```css [CSS]
.item3 {
  grid-row: span 3 / 7;
}
```

:::


### 移行期間

互換性 (math.div() and list.slash()):

- Dart Sass: since 1.33.0
- LibSass: ✗
- Ruby Sass: ✗

この移行を容易にするために、まず math.div() 関数を追加しました。演算子 / は今のところまだ除算を行いますが、除算の際に非推奨の警告が表示されます。ユーザーはすべての除算を、代わりに math.div() を使用するように切り替える必要があります。

::: tip

💡 Fun fact:

覚えておいてほしいのは、自分が管理していないライブラリからの非推奨の警告を黙らせることができるということです!コマンドラインインターフェイスを使用している場合は --quiet-deps フラグを、JavaScript API を使用している場合は quietDeps オプションを true に設定することができます。

:::


```scss
@use "sass:math";

// 誤り。今後のSassバージョンでは動作しません。
@debug (12px/4px); // 3

// RIGHT, 将来の Sass バージョンで動作するようになります。
@debug math.div(12px, 4px); // 3
```

スラッシュで区切られたリストも移行期間中に利用可能になる予定です。まだ / で作成できないため、list.slash() 関数を追加して作成する予定です。また、list.join() 関数と list.append() 関数に $separator として "スラッシュ" を渡すことができるようになります。

::: code-group

```scss [SCSS]
@use "sass:list";
@use "sass:math";

.item3 {
  $row: list.slash(span math.div(6, 2), 7);
  grid-row: $row;
}
```

```css [CSS]
.item3 {
  grid-row: span 3 / 7;
}
```

:::


互換性 (First-class calc):

- Dart Sass: since 1.40.0
- LibSass: ✗
- Ruby Sass: ✗

また、割り算をcalc()式で囲むと、Sassはそれを一つの数値に単純化することができます。

```scss
// WRONG, will not work in future Sass versions.
@debug (12px/4px); // 3

// RIGHT, will work in future Sass versions.
@debug calc(12px / 4px); // 3
```

### 自動マイグレーション

Sass migrator を使用して、math.div() および list.slash() を使用するようにスタイルシートを自動的に更新することができます。

```bash
$ npm install -g sass-migrator
$ sass-migrator division **/*.scss
```

## Function Units

様々な組み込み関数が、許可する単位をより厳しくし、それらの単位をより一貫して処理するようになります。これにより、SassはCSS仕様との互換性を高め、より迅速にエラーを検出できるようになります。

### Hue

互換性:

- Dart Sass: since 1.32.0
- LibSass: ✗
- Ruby Sass: ✗

色の色相を指定する場合、CSSでは角度の単位（deg、grad、rad、turn）を指定することができます。また、単位を持たない数値も許容し、これはdegとして解釈されます。歴史的に、Sassは任意の単位を許容し、それをdegとして解釈してきました。これは特に問題で、有効な CSS 表現である hsl(0.5turn, 100%, 50%) が Sass によって許可されても、全く間違った解釈をされることを意味します。

この問題を修正し、SassをCSS仕様に沿うようにするため、複数のフェーズで変更を加えています。

#### Phase 1

互換性:

- Dart Sass: since 1.32.0
- LibSass: ✗
- Ruby Sass: ✗

当初、Sassは色相としてdeg以外の単位を持つ数値を渡すと非推奨の警告を出すだけでした。単位を持たない数値を渡すことはまだ可能です。

#### Phase 2

互換性:

- Dart Sass: since 1.52.1
- LibSass: ✗
- Ruby Sass: ✗

次に、色相パラメータの角度単位の扱い方をCSSの仕様に合わせました。つまり、grad、rad、turnの単位を持つ数値はdegに変換され、0.5turnは180degに、100gradは90degに、といった具合に変換されます。

この変更は CSS の互換性を維持するために必要なものであるため、Dart Sass の互換性ポリシーに従って、わずかなバージョンアップで実現されました。しかし、Sass が CSS 仕様に従ってすべての有効な CSS を解釈することを確実にするために、可能な限り小さな動作の変更にとどめています。

#### Phase 3

互換性:

- Dart Sass: ✗
- LibSass: ✗
- Ruby Sass: ✗

最後に、Dart Sass 2.0.0の色関数は、角度以外の単位を持つ色相パラメータを渡された場合、エラーを発生します。単位なしの色相はまだ許可されています。

### 彩度と明度

HSL 色の彩度と明度を指定する場合、CSS では % 単位しか許されていません。色相の場合とは異なり）単位のない数字も許されません。歴史的に、Sassはどんな単位でも許容し、それを%として解釈してきた。hsl(0, 100px, 50s)と書けば、Sassは赤色を返します。

この問題を解決し、SassをCSS仕様に沿うようにするために、2段階に分けて変更を行います。

#### Phase 1

互換性:

- Dart Sass: since 1.32.0
- LibSass: ✗
- Ruby Sass: ✗

現在、Sassでは、単位を持たない数値や、%以外の単位を明度や彩度として関数に渡すと、非推奨の警告が表示されるだけです。

#### Phase 2

互換性:

- Dart Sass: ✗
- LibSass: ✗
- Ruby Sass: ✗

Dart Sass 2.0.0では、彩度や明度のパラメータに単位がない、あるいは％でない単位が渡されると、色関数はエラーを発生させるようになっています。

### Alpha

色のアルファ値を指定する場合、CSS（Colors Level 4時点）では、0から1の間の単位なしの値、または0%から100%の間の%値のいずれかを許可しています。ほとんどの場合、Sassはこの動作に従いますが、関数color.adjust()とcolor.change()は歴史的にどんな単位でも許容し、それをユニットレスとして解釈してきました。color.change(red, $alpha: 1%) と書けば、Sassは不透明な色である黒を返してくれることさえあります。

この問題を解決し、SassをCSS仕様に沿うようにするために、3つのフェーズで変更を行います。

#### Phase 1

互換性:

- Dart Sass: since 1.56.0
- LibSass: ✗
- Ruby Sass: ✗

現在、Sassはアルファ値として、%を含む任意の単位の数値をcolor.change()またはcolor.adjust()に渡すと、非推奨の警告を出すだけです。

#### Phase 2

互換性:

- Dart Sass: ✗
- LibSass: ✗
- Ruby Sass: ✗

次に、color.change()とcolor.adjust()のアルファ引数で、%単位の扱い方を変更することにします。単位が%であるアルファは100%で割られ、0から1までの単位を持たない数値に変換されます。

この変更は、他のSass関数との整合性を高めるためのバグフィックスであるため、マイナーバージョンアップのみで行われる予定です。ユーザーがコードを調整し、バグを回避する時間を確保するため、フェーズ 1 がリリースされてから最低でも 3 ヶ月後に変更される予定です。

#### Phase 3

互換性:

- Dart Sass: ✗
- LibSass: ✗
- Ruby Sass: ✗

最後に、Dart Sass 2.0.0 の color.change() と color.adjust() は、アルファパラメータに%以外の単位が渡されるとエラーを投げます。単位なしのアルファはまだ許可されています。

### math.random()

math.random()関数は、歴史的に$limitの単位を無視し、単位のない値を返してきました。例えば math.random(100px) は "px" を削除し、42 のような値を返します。

Sassの将来のバージョンでは、$limit引数の単位を無視しなくなり、同じ単位を持つランダムな整数が返されるようになる予定です。

```scss
// Future Sass, doesn't work yet!
@debug math.random(100px); // 42px
```

#### Phase 1

互換性:

- Dart Sass: since 1.54.5
- LibSass: ✗
- Ruby Sass: ✗

現在、Sassは、math.random()に単位付きの$limitを渡すと、非推奨の警告を発します。

#### Phase 2

互換性:

- Dart Sass: ✗
- LibSass: ✗
- Ruby Sass: ✗

Dart Sass 2.0.0 では、単位付きの $limit 数を渡すとエラーになります。

#### Phase 3

互換性:

- Dart Sass: ✗
- LibSass: ✗
- Ruby Sass: ✗

Dart Sass 2.0.0 以降のマイナーリリースでは、 math.random() 関数に単位付きの $limit を渡すことが再び許可されるようになりました。これは、単位のない数値の代わりに、$limit と同じ単位のランダムな整数を返します。


### Weight

color.mix() 関数と color.invert() 関数は、歴史的に $weight 引数が概念的にパーセンテージを表すにもかかわらず、その単位を無視しました。Sassの将来のバージョンでは、単位を%にすることが要求されます。

#### Phase 1

互換性:

- Dart Sass: since 1.56.0
- LibSass: ✗
- Ruby Sass: ✗

現在、Sassは、単位のない$weightや%以外の単位をcolor.mix()やcolor.invert()に渡すと、非推奨の警告を発します。

#### Phase 2

互換性:

- Dart Sass: ✗
- LibSass: ✗
- Ruby Sass: ✗

Dart Sass 2.0.0 では、color.mix() と color.invert() は、単位なしの $weight または%以外の単位が渡されるとエラーを投げます。


### Index

list.nth() 関数と list.set-nth() 関数は、歴史的に $n 引数の単位を無視してきました。Sassの将来のバージョンでは、単位は一切禁止される予定です。

#### Phase 1

互換性:

- Dart Sass: since 1.56.0
- LibSass: ✗
- Ruby Sass: ✗

現在、Sassは、単位のない$weightや%以外の単位をcolor.mix()やcolor.invert()に渡すと、非推奨の警告を発します。

#### Phase 2

互換性:

- Dart Sass: ✗
- LibSass: ✗
- Ruby Sass: ✗

Dart Sass 2.0.0 では、list.nth() および list.set-nth() は、インデックス $n に単位が渡されるとエラーを投げます。


## -moz-document

Firefox では、かつて @-moz-document ルールがあり、特別なパースが必要でした。Firefoxのサポートが終了したため、Sassもそれらをパースするサポートを終了する方向で進めています。

Sass は歴史的に @-moz-document ルールの特別なパージングをサポートしてきました。Firefox がそれらのサポートを打ち切ったため、Sass も特別な解析のサポートを打ち切り、未知の at-rule として扱います。

1つだけ例外があります。空の url prefix 関数は、Firefox をターゲットにしたハックで使用されているため、まだ許可されています。

::: code-group

```scss [SCSS]
@-moz-document url-prefix() {
  .error {
    color: red;
  }
}
```

```css [CSS]
@-moz-document url-prefix() {
  .error {
    color: red;
  }
}
```

:::

### 移行期間

互換性:

- Dart Sass: since 1.7.2
- LibSass: ✗
- Ruby Sass: ✗

まず、空の url-prefix のハックを除く @-moz-document のすべての使用法について非推奨の警告を出します。

Dart Sass 2.0 では、@-moz-document は未知の at-rule として扱われる予定です。


## 複合セレクタの拡張

LibSassは現在、.message.infoのような複合セレクタを拡張することができますが、その拡張方法は@extendが意図する方法とは一致しません。

互換性:

- Dart Sass: ✓
- LibSass: ✗
- Ruby Sass: ✗

あるセレクタが別のセレクタを拡張すると、Sassは拡張子にマッチするすべての要素を、拡張されているクラスにもマッチするかのようにスタイルします。つまり、.heads-up {@extend .info} と書くと、HTMLの class="heads-up" を class="heads-up info" に置き換えたのと同じように動作します。

その論理に従えば、.heads-up {@extend .message.info} は class="heads-up" を class="heads-up info message" に置き換えたように動作すると思うでしょう。しかし、LibSassとRuby Sassの現在の動作はそうではありません。.infoまたは.messageを持つすべてのセレクタに.heads-upを追加するのではなく、.info.messageを一緒に持つセレクタだけに追加されます。

```scss
// これらは両方とも延長されるはずですが、されません。
.message {
  border: 1px solid black;
}
.info {
  font-size: 1.5rem;
}

.heads-up {
  @extend .message.info;
}
```

この問題を解決し、混乱を避け、実装をクリーンで効率的にするために、Dart Sassでは複合セレクタの拡張機能はサポートされておらず、LibSassの将来のバージョンで削除される予定です。互換性を保つため、ユーザーは各単純なセレクタを別々に拡張する必要があります。


::: code-group

```scss [SCSS]
.message {
  border: 1px solid black;
}
.info {
  font-size: 1.5rem;
}

.heads-up {
  @extend .message, .info;
}
```

```css [CSS]
.message, .heads-up {
  border: 1px solid black;
}

.info, .heads-up {
  font-size: 1.5rem;
}
```

:::


::: warning

⚠️ Heads up!

SassはCSSがスタイル付けするHTMLの詳細を知らないため、@extendは特定のHTMLに適用されない余分なセレクタを生成する必要がある場合があります。これは、複合セレクタの拡張から切り替えた場合に特に当てはまります。

ほとんどの場合、これらの余分なセレクタは何の問題も起こさず、gzip 圧縮された CSS に数バイト追加されるだけです。しかし、スタイルシートによっては、古い動作に大きく依存している場合があります。そのような場合は、複合セレクターをプレースホルダーセレクターに置き換えることをお勧めします。

::: code-group

```scss [SCSS]
// Instead of just `.message.info`.
%message-info, .message.info {
  border: 1px solid black;
  font-size: 1.5rem;
}

.heads-up {
  // Instead of `.message.info`.
  @extend %message-info;
}
```

```css [CSS]
.heads-up, .message.info {
  border: 1px solid black;
  font-size: 1.5rem;
}
```

:::


## CSS 変数構文

LibSass と Ruby Sass の古いバージョンでは、カスタムプロパティ宣言を他のプロパティ宣言と同様に解析し、SassScript のすべての式を値として使用することができました。しかし、これは CSS と互換性がありませんでした。

互換性:

- Dart Sass: ✓
- LibSass: since 3.5.0
- Ruby Sass: since 3.5.0

CSS仕様では、カスタムプロパティ宣言にほとんどすべての文字列を使用することができます。これらの値は CSS プロパティとしては意味をなさないかもしれませんが、JavaScript からアクセスすることは可能です。SassScript の値として解析される場合、プレーン CSS として有効な構文が解析に失敗することがありました。たとえば、Polymer ライブラリでは、プレーン CSS ミキシンをサポートするためにこれを使用していました。

::: code-group

```scss [SCSS]
:root {
  --flex-theme: {
    border: 1px solid var(--theme-dark-blue);
    font-family: var(--theme-font-family);
    padding: var(--theme-wide-padding);
    background-color: var(--theme-light-blue);
  };
}
```

```css [CSS]
:root {
  --flex-theme: {
    border: 1px solid var(--theme-dark-blue);
    font-family: var(--theme-font-family);
    padding: var(--theme-wide-padding);
    background-color: var(--theme-light-blue);
  };
}
```

:::

プレーン CSS との互換性を最大限に高めるため、最近のバージョンの Sass では、カスタム プロパティ値内の SassScript 式を補間内に記述することが要求されています。補間は古いバージョンの Sass でも動作するため、すべてのスタイルシートで使用することをお勧めします。

::: code-group

```scss [SCSS]
$accent-color: #fbbc04;

:root {
  // WRONG, will not work in recent Sass versions.
  --accent-color-wrong: $accent-color;

  // RIGHT, will work in all Sass versions.
  --accent-color-right: #{$accent-color};
}
```

```css [CSS]
:root {
  --accent-color-wrong: $accent-color;
  --accent-color-right: #fbbc04;
}
```

:::


:::

⚠️ Heads up!

引用符で囲まれた文字列は、補間によって引用符が削除されるため、引用符を保持するために meta.inspect() 関数で囲む必要がある場合があります。

::: code-group

```scss
@use "sass:meta";

$font-family-monospace: Menlo, Consolas, "Courier New", monospace;

:root {
  --font-family-monospace: #{meta.inspect($font-family-monospace)};
}
```

```css
:root {
  --font-family-monospace: Menlo, Consolas, "Courier New", monospace;
}
```

:::