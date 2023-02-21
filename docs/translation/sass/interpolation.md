# 補間

補間は、Sass スタイルシートのほぼすべての場所で使用でき、SassScript 式の結果を CSS のチャンクに埋め込むことができます。以下のいずれかの場所で、式を#{}で囲むだけです。

- スタイルルールのセレクタ
- 宣言の中のプロパティ名
- カスタムプロパティ値
- CSSのアット・ルール
- @extends
- プレーン CSS @imports
- 引用符で囲むか囲まないかの文字列
- 特殊関数
- プレーンなCSSの関数名
- 大きなコメント

::: code-group

```scss [SCSS]
@mixin corner-icon($name, $top-or-bottom, $left-or-right) {
  .icon-#{$name} {
    background-image: url("/icons/#{$name}.svg");
    position: absolute;
    #{$top-or-bottom}: 0;
    #{$left-or-right}: 0;
  }
}

@include corner-icon("mail", top, left);
```

```css [CSS]
.icon-mail {
  background-image: url("/icons/mail.svg");
  position: absolute;
  top: 0;
  left: 0;
}
```

:::


## SassScriptでは

互換性 (Modern Syntax):

- Dart Sass: ✓
- LibSass: ✗
- Ruby Sass: since 4.0.0 (unreleased)
- ▶

SassScript で補間を使用すると、引用符で囲まれていない文字列に SassScript を挿入することができます。これは、動的に名前を生成する場合 (アニメーションなど) や、スラッシュで区切られた値を使用する場合に特に有用です。SassScript の補間は、常に引用符で囲まれていない文字列を返すことに注意してください。

::: code-group

```scss [SCSS]
@mixin inline-animation($duration) {
  $name: inline-#{unique-id()};

  @keyframes #{$name} {
    @content;
  }

  animation-name: $name;
  animation-duration: $duration;
  animation-iteration-count: infinite;
}

.pulse {
  @include inline-animation(2s) {
    from { background-color: yellow }
    to { background-color: red }
  }
}
```

```css [CSS]
.pulse {
  animation-name: inline-u1mlkw6ry;
  animation-duration: 2s;
  animation-iteration-count: infinite;
}
@keyframes inline-u1mlkw6ry {
  from {
    background-color: yellow;
  }
  to {
    background-color: red;
  }
}
```

:::

::: tip

💡 Fun fact:

補間は文字列に値を注入するのに便利ですが、それ以外では SassScript の式で必要になることはほとんどありません。プロパティの値で変数を使用するだけなら、間違いなく必要ありません。color と書く代わりに#と書く代わりに、color: $accentと書けばいいのです!

:::

::: warning

⚠️ Heads up!

数値の補間を使用することは、ほとんどの場合、悪い考えです。補間は、それ以上の計算に使用できない引用符で囲まれていない文字列を返し、単位が正しく使用されていることを保証するための Sass の組み込みの安全策を回避します。

Sass には強力な単位演算機能があり、代わりに使用することができます。たとえば、#{$width}px と書く代わりに $width * 1px と書くか、よりよい方法として、$width 変数を px の単位で宣言します。そうすれば、$widthがすでに単位を持っている場合、偽のCSSをコンパイルする代わりに、適切なエラーメッセージが表示されます。

:::


## Quoted Strings

ほとんどの場合、補間は、式がプロパティ値として使用される場合と全く同じテキストを注入します。しかし、1つだけ例外があります。引用された文字列を囲む引用符は削除されます (引用された文字列がリストであっても)。これにより、SassScript で許可されていない構文 (セレクタなど) を含む引用文字列を記述し、スタイル ルールに挿入することができるようになります。

::: code-group

```scss
.example {
  unquoted: #{"string"};
}
```

```css
.example {
  unquoted: string;
}
```

:::

::: warning

⚠️ Heads up!

この機能を使って引用符で囲まれた文字列を引用符で囲まれていない文字列に変換したいところですが、string.unquote()関数を使った方がずっと分かりやすいでしょう。`#{$string}`の代わりに、`string.unquote($string)`と書いてください!

:::