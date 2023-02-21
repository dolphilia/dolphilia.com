# 組み込みモジュール

## 概要

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

Sass には、便利な関数 (および時折の mixin) を含む多くの組み込みモジュールがあります。これらのモジュールは、他のユーザ定義スタイルシートと同様に @use 規則でロードすることができ、その関数は他のモジュール・メンバーと同様に呼び出すことができます。すべての組み込みモジュールの URL は、Sass 自体の一部であることを示すために sass: で始まっています。

::: warning

⚠️ Heads up!

Sassモジュールシステムが導入される以前は、全てのSass関数が常にグローバルに利用可能でした。多くの関数は現在でもグローバルエイリアスを持っています（これらはドキュメントに記載されています）。Sass チームはこれらの使用を推奨しておらず、いずれは非推奨とする予定ですが、現時点では古い Sass バージョンや LibSass (モジュールシステムをまだサポートしていない) との互換性のために、これらの関数が残っています。

いくつかの関数は、新しいモジュールシステムでもグローバルにしか利用できません。これは、特別な評価動作 (if()) や、組み込みの CSS 関数 (rgb() と hsl()) の上に追加の動作を追加しているためです。これらは非推奨になることはなく、自由に使うことができます。

:::

::: code-group

```scss [SCSS]
@use "sass:color";

.button {
  $primary-color: #6b717f;
  color: $primary-color;
  border: 1px solid color.scale($primary-color, $lightness: 20%);
}
```

```css [CSS]
.button {
  color: #6b717f;
  border: 1px solid #878d9a;
}
```

:::


Sassには、以下の組み込みモジュールが用意されています。

- sass:math モジュールは、数値に対して操作する関数を提供します。
- sass:string モジュールは、文字列の結合、検索、分割を簡単に行うことができるようにします。
- sass:color モジュールは、既存の色に基づいて新しい色を生成し、カラーテーマを簡単に構築します。
- sass:list モジュールは、リスト内の値にアクセスし、変更することができる。
- sass:map モジュールは、マップ内のキーに関連付けられた値を検索することを可能にします。
- sass:selector モジュールは、Sass の強力なセレクタエンジンにアクセスするためのモジュールです。
- sass:meta モジュールは、Sass の内部動作の詳細を公開します。

グローバル関数パーマリンクグローバル関数

---

```scss
hsl($hue $saturation $lightness)
hsl($hue $saturation $lightness / $alpha)
hsl($hue, $saturation, $lightness, $alpha: 1)
hsla($hue $saturation $lightness)
hsla($hue $saturation $lightness / $alpha)
hsla($hue, $saturation, $lightness, $alpha: 1) //=> color 
```

互換性 (Level 4 Syntax):

- Dart Sass: since 1.15.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

互換性 (Percent Alpha):

- Dart Sass: ✓
- LibSass: ✗
- Ruby Sass: since 3.7.0
- ▶

与えられた色相、彩度、明度、およびアルファチャンネルを持つ色を返します。

色相は 0deg から 360deg の間の数値で、単位を持たないこともあります。彩度・明度は 0% から 100% の間の数値で、単位はありません。アルファチャンネルは、0 から 1 の間の単位を持たない数値、または 0% から 100% の間のパーセントで指定します。

::: tip

💡 Fun fact:

hsl()の引数の代わりに calc() や var() のような特殊な関数を渡すことができます。複数の引数の代わりに var() を使うことさえできます。色関数をこの方法で呼び出すと、呼び出されたときと同じシグネチャを使用した引用符なしの文字列が返されます。

```scss
@debug hsl(210deg 100% 20% / var(--opacity)); // hsl(210deg 100% 20% / var(--opacity))
@debug hsla(var(--peach), 20%); // hsla(var(--peach), 20%)
```

::: warning

⚠️ Heads up!

スラッシュで区切られた値に対する Sass の特別なパースルールは、 hsl($hue $saturation $lightness / $alpha) シグネチャを使うときに $lightness や $alpha の変数を渡すことを困難にしています。代わりに hsl($hue, $saturation, $lightness, $alpha) を使うことを検討してください。

:::

```scss
@debug hsl(210deg 100% 20%); // #036
@debug hsl(34, 35%, 92%); // #f2ece4
@debug hsl(210deg 100% 20% / 50%); // rgba(0, 51, 102, 0.5)
@debug hsla(34, 35%, 92%, 0.2); // rgba(242, 236, 228, 0.2)
```

---

```scss
if($condition, $if-true, $if-false) 
```

条件が真であれば$if-trueを、そうでなければ$if-falseを返します。

この関数は、返されない引数を評価しないという点で特別です。 そのため、未使用の引数がエラーを投げるような場合でも安全に呼び出すことができます。

```scss
@debug if(true, 10px, 15px); // 10px
@debug if(false, 10px, 15px); // 15px
@debug if(variable-defined($var), $var, null); // null
```

---

```scss
rgb($red $green $blue)
rgb($red $green $blue / $alpha)
rgb($red, $green, $blue, $alpha: 1)
rgb($color, $alpha)
rgba($red $green $blue)
rgba($red $green $blue / $alpha)
rgba($red, $green, $blue, $alpha: 1)
rgba($color, $alpha) //=> color 
```

互換性 (Level 4 Syntax):

- Dart Sass: since 1.15.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

互換性 (Percent Alpha):

- Dart Sass: ✓
- LibSass: ✗
- Ruby Sass: since 3.7.0
- ▶

red, $green, $blue、そしてオプションで $alpha が渡された場合、 与えられた赤、緑、青、アルファチャンネルを持つ色を返します。

各チャンネルは、0 から 255 までの単位を持たない数値、 あるいは 0% から 100% までのパーセンテージで指定することができます。アルファチャンネルは，0 から 1 までの単位を持たない数値，または 0 から 100 までのパーセントで指定します．

::: tip

💡 Fun fact:

rgb()の引数の代わりに calc() や var() などの特殊な関数を渡すことができます。複数の引数の代わりに var() を使用することもできます。色関数をこの方法で呼び出すと、呼び出されたときと同じシグネチャを使用した引用符なしの文字列が返されます。

```scss
@debug rgb(0 51 102 / var(--opacity)); // rgb(0 51 102 / var(--opacity))
@debug rgba(var(--peach), 0.2); // rgba(var(--peach), 0.2)
```

:::

::: warning

⚠️ Heads up!

Sassのスラッシュで区切られた値の特別な解析ルールは、rgb($red $green $blue / $alpha)署名を使用するときに$blueまたは$alphaの変数を渡すことを難しくします。代わりにrgb($red, $green, $blue, $alpha)を使用することを検討してください。

:::


```scss
@debug rgb(0 51 102); // #036
@debug rgb(95%, 92.5%, 89.5%); // #f2ece4
@debug rgb(0 51 102 / 50%); // rgba(0, 51, 102, 0.5)
@debug rgba(95%, 92.5%, 89.5%, 0.2); // rgba(242, 236, 228, 0.2)
```

color と $alpha が渡された場合、これは $color に与えられた $alpha チャンネルを、 元のアルファチャンネルのかわりに付けて返します。

```scss
@debug rgb(#f2ece4, 50%); // rgba(242, 236, 228, 0.5);
@debug rgba(rgba(0, 51, 102, 0.5), 1); // #003366
```

## sass:color

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

---

```scss
color.adjust($color,
  $red: null, $green: null, $blue: null,
  $hue: null, $saturation: null, $lightness: null,
  $whiteness: null, $blackness: null,
  $alpha: null)
adjust-color(...) //=> color 
```

互換性 ($whiteness and $blackness):

- Dart Sass: since 1.28.0
- LibSass: ✗
- Ruby Sass: ✗

color の 1 つまたは複数のプロパティを固定値で増減します。

各キーワード引数に渡された値を、色の対応するプロパティに追加し、調整後の色を返します。RGB プロパティ ($red、$green、および $blue) と HSL プロパティ ($hue、$saturation、および $lightness) を同時に指定したり、それらのいずれかと HWB プロパティ ($hue、$whiteness、および $blackness) を同時に指定するとエラーになります。

オプションの引数は、すべて数字でなければなりません。red、$green、$blueの各引数は、単位を持たず、-255から255の間（この値を含む）でなければなりません。hueは、単位がdegであるか、または単位なしである必要があります。saturation、$lightness、$whiteness、$blacknessは-100%から100%の間でなければならず、無単位であってはな りません。alphaは、-1以上1以下（単位なし）でなければなりません。

こちらも参照してください。

- 色のプロパティを流動的に拡大縮小する color.scale()。
- 色のプロパティを設定するには color.change() を使用します。

```scss
@debug color.adjust(#6b717f, $red: 15); // #7a717f
@debug color.adjust(#d2e1dd, $red: -10, $blue: 10); // #c8e1e7
@debug color.adjust(#998099, $lightness: -30%, $alpha: -0.4); // rgba(71, 57, 71, 0.6)
```

---

```scss
adjust-hue($color, $degrees) //=> color 
```

color の色相を増減します。

hue は、-360deg から 360deg (この値を含む) までの数値で、 $color の色相に加算します。単位を持たないこともできますが、deg 以外の単位を持つことはできません。

色の属性を調整する color.adjust() も参照してください。

::: warning

⚠️ Heads up!

adjust-hue()はadjust()と冗長なので、新しいモジュールシステムには直接含まれません。adjust-hue($color, $amount) の代わりに、 color.adjust($color, $hue: $amount) と書くことができます。

:::

```scss
// Hue 222deg becomes 282deg.
@debug adjust-hue(#6b717f, 60deg); // #796b7f

// Hue 164deg becomes 104deg.
@debug adjust-hue(#d2e1dd, -60deg); // #d6e1d2

// Hue 210deg becomes 255deg.
@debug adjust-hue(#036, 45); // #1a0066
```

---

```scss
color.alpha($color)
alpha($color)
opacity($color) //=> number 
```

color のアルファチャンネルを 0 から 1 の間の数値で返します。

特殊なケースとして、これは Internet Explorer の alpha(opacity=20) という構文もサポートしており、その場合は引用符で囲まれていない文字列を返します。

こちらも参照ください。

- color.red() は色の赤チャンネルを取得します。
- color.green() は、色の緑チャンネルを取得します。
- color.blue() は、色の青チャンネルを取得します。
- color.hue() は、色の色相を取得します。
- color.saturation() は、色の彩度を取得します。
- color.lightness() は、色の明度を取得します。

```scss
@debug color.alpha(#e1d7d2); // 1
@debug color.opacity(rgb(210, 225, 221, 0.4)); // 0.4
@debug alpha(opacity=20); // alpha(opacity=20)
```

---

```scss
color.blackness($color) //=> number 
```

互換性:

- Dart Sass: since 1.28.0
- LibSass: ✗
- Ruby Sass: ✗

0%から100%の間の数値として$colorのHWB黒さを返します。

こちらも参照ください。

- 色の赤チャンネルを取得するには color.red() を使用します。
- 色の緑チャネルを得るには color.green() を使用します。
- color.hue() は、色の色相を取得します。
- color.saturation() は、色の彩度を取得します。
- color.lightness() は、色の明度を取得します。
- color.whiteness() は、色の白色度を取得します。
- color.alpha() は、色のアルファチャンネルを取得します。

```scss
@debug color.blackness(#e1d7d2); // 11.7647058824%
@debug color.blackness(white); // 0%
@debug color.blackness(black); // 100%
```

---

```scss
color.blue($color)
blue($color) //=> number 
```

color の青チャンネルを 0 から 255 までの数で返します。

こちらも参照ください。

- 色の赤チャンネルを取得するには color.red() を使用します。
- 色の緑チャネルを得るには color.green() を使用します。
- color.hue() は、色の色相を取得します。
- color.saturation() は、色の彩度を取得します。
- color.lightness() は、色の明度を取得します。
- color.whiteness() は、色の白色度を取得します。
- color.blackness() は、色の黒さを取得します。
- color.alpha() は、色のアルファチャンネルを取得します。

```scss
@debug color.blue(#e1d7d2); // 210
@debug color.blue(white); // 255
@debug color.blue(black); // 0
```

---

```scss
color.change($color,
  $red: null, $green: null, $blue: null,
  $hue: null, $saturation: null, $lightness: null,
  $whiteness: null, $blackness: null,
  $alpha: null)
change-color(...) //=> color 
```

互換性 ($whiteness and $blackness):

- Dart Sass: since 1.28.0
- LibSass: ✗
- Ruby Sass: ✗

色の1つまたは複数のプロパティを新しい値に設定します。

各キーワード引数に渡された値を、色の対応するプロパティの代わりに使用し、 変更後の色を返します。RGB プロパティ ($red、$green、および $blue) と HSL プロパティ ($hue、$saturation、および $lightness) を同時に指定したり、それらのいずれかと HWB プロパティ ($hue、$whiteness、および $blackness) を同時に指定するとエラーになります。

オプションの引数は、すべて数字でなければなりません。red、$green、$blueの各引数は、単位を持たず、0から255の間（この値を含む）でなければなりません。hueは、単位がdegであるか、または単位なしである必要があります。saturation、$lightness、$whiteness、$blacknessは0%から100%の間でなければならず、無単位であってはな りません。alpha引数は、0から1（を含む）の間の単位なしである必要があります。

こちらも参照してください。

- 色のプロパティを流動的に拡大縮小する color.scale()。
- 色のプロパティを固定値で調整する color.adjust()。

```scss
@debug color.change(#6b717f, $red: 100); // #64717f
@debug color.change(#d2e1dd, $red: 100, $blue: 50); // #64e132
@debug color.change(#998099, $lightness: 30%, $alpha: 0.5); // rgba(85, 68, 85, 0.5)
```

---

```scss
color.complement($color)
complement($color) //=> color 
```

colorのRGB補数を返します。

これは color.adjust($color, $hue: 180deg) と同じです。

```scss
// Hue 222deg becomes 42deg.
@debug color.complement(#6b717f); // #7f796b

// Hue 164deg becomes 344deg.
@debug color.complement(#d2e1dd); // #e1d2d6

// Hue 210deg becomes 30deg.
@debug color.complement(#036); // #663300
```

---

```scss
darken($color, $amount) //=> color 
```

色を濃くします。

$amountは0%から100%の間の数値でなければなりません（これを含む）。$colorのHSL明度をその値だけ下げます。

::: warning

⚠️ Heads up!

darken()関数は、明るさを一定量減少させますが、これはしばしば望ましい効果ではありません。ある色をある割合で暗くするには、代わりに color.scale() を使用します。

darken() は通常、色を暗くする最良の方法ではないので、新しいモジュールシステムには直接含まれません。しかし、既存の動作を維持する必要がある場合、 darken($color, $amount) は color.adjust($color, $lightness: -$amount) と書くことができます。

```scss
// #036は明度20%なので、darken()で30%減算しても黒が返ってくるだけです。
@debug darken(#036, 30%); // black

// scale()の代わりに、元々あった色より30%暗くします。
@debug color.scale(#036, $lightness: -30%); // #002447
```

:::


```scss
// Lightness 92% becomes 72%.
@debug darken(#b37399, 20%); // #7c4465

// Lightness 85% becomes 45%.
@debug darken(#f2ece4, 40%); // #b08b5a

// Lightness 20% becomes 0%.
@debug darken(#036, 30%); // black
```

---

```scss
desaturate($color, $amount) //=> color 
```

色彩の彩度を低くします。

amountは0%から100%（を含む）の間の数値でなければなりません。その値だけ、$color の HSL 彩度を下げます。

::: warning

⚠️ Heads up!

desaturate() 関数は彩度を一定量下げるものですが、これは望ましい効果でないことがよくあります。ある色の彩度を一定量だけ下げるには、代わりに color.scale() を使用します。

desaturate()は通常、色の彩度を下げるのに最適な方法ではないので、新しいモジュールシステムには直接含まれていません。しかし、既存の動作を維持する必要がある場合、 desaturate($color, $amount) は color.adjust($color, $saturation: -$amount) と書くことができます。

```scss
// #d2e1ddは彩度20%なので、desaturate()で30%減算してもグレーが返ってくるだけです。
@debug desaturate(#d2e1dd, 30%); // #dadada

// scale()の代わりに、元々あった彩度より30%低い彩度にします。
@debug color.scale(#6b717f, $saturation: -30%); // #6e727c
```

:::

```scss
// Saturation 100% becomes 80%.
@debug desaturate(#036, 20%); // #0a335c

// Saturation 35% becomes 15%.
@debug desaturate(#f2ece4, 20%); // #eeebe8

// Saturation 20% becomes 0%.
@debug desaturate(#d2e1dd, 30%); // #dadada
```

---

```scss
color.grayscale($color)
grayscale($color) //=> color 
```

color と同じ明度の灰色を返します。

これは color.change($color, $saturation: 0%) と同じです。

```scss
@debug color.grayscale(#6b717f); // #757575
@debug color.grayscale(#d2e1dd); // #dadada
@debug color.grayscale(#036); // #333333
```

---

```scss
color.green($color)
green($color) //=> number 
```

color の緑チャンネルを 0 から 255 までの数で返します。

こちらも参照ください。

- 色の赤チャンネルを取得するには color.red() を使用します。
- 色の青チャンネルを得るには color.blue() を使用します。
- color.hue() は色の色相を取得します。
- color.saturation() は、色の彩度を取得します。
- color.lightness() は、色の明度を取得します。
- color.whiteness() は、色の白色度を取得します。
- color.blackness() は、色の黒さを取得します。
- color.alpha() は、色のアルファチャンネルを取得します。

```scss
@debug color.green(#e1d7d2); // 215
@debug color.green(white); // 255
@debug color.green(black); // 0
```

---

```scss
color.hue($color)
hue($color) //=> number 
```

color の色相を 0deg から 360deg の間の数値で返します。

こちらも参照ください。

- 色の赤チャンネルを取得するには color.red() を使用します。
- 色の緑チャネルを得るには color.green() を使用します。
- color.blue() は、色の青チャンネルを取得します。
- color.saturation() は、色の彩度を取得します。
- color.lightness() は、色の明度を取得します。
- color.whiteness() は、色の白色度を取得します。
- color.blackness() は、色の黒さを取得します。
- color.alpha() は、色のアルファチャンネルを取得します。

```scss
@debug color.hue(#e1d7d2); // 20deg
@debug color.hue(#f2ece4); // 34.2857142857deg
@debug color.hue(#dadbdf); // 228deg
```

---

```scss
color.hwb($hue $whiteness $blackness)
color.hwb($hue $whiteness $blackness / $alpha)
color.hwb($hue, $whiteness, $blackness, $alpha: 1) //=> color 
```

互換性:

- Dart Sass: since 1.28.0
- LibSass: ✗
- Ruby Sass: ✗

与えられた色相、白さ、黒さ、および与えられたアルファチャンネルを持つ色を返します。

色相は 0deg から 360deg (この値を含む) の間の数値です。白色度および黒色度は、0% から 100% の間の数値です（この値を含む）。色相は無単位でもよいが、白さと黒さは単位を持たなければならない。アルファチャンネルは、0 から 1 の間の単位を持たない数値、または 0 から 100 の間のパーセントで指定することができます。

::: warning

⚠️ Heads up!

Sassのスラッシュで区切られた値の特別なパースルールは、 color.hwb($hue $whiteness $blackness / $alpha) シグネチャを使うときに$blackness や $alpha の変数を渡すことを困難にしています。代わりに color.hwb($hue, $whiteness, $blackness, $alpha) を使うことを検討してください。

```

```scss
@debug color.hwb(210, 0%, 60%); // #036
@debug color.hwb(34, 89%, 5%); // #f2ece4
@debug color.hwb(210 0% 60% / 0.5); // rgba(0, 51, 102, 0.5)
```

---

```scss
color.ie-hex-str($color)
ie-hex-str($color) //=> unquoted string 
```

Internet Explorerの-ms-filterプロパティで期待される#AARRGGBB形式の$colorを表す引用符なしの文字列を返します。

```scss
@debug color.ie-hex-str(#b37399); // #FFB37399
@debug color.ie-hex-str(#808c99); // #FF808C99
@debug color.ie-hex-str(rgba(242, 236, 228, 0.6)); // #99F2ECE4
```

---

```scss
color.invert($color, $weight: 100%)
invert($color, $weight: 100%) //=> color 
```

color の逆数または負の値を返します。

重み付けは、0%から100% (この値を含む) の間の数値でなければなりません。重みが大きいと結果は負に近くなり、小さいと $color に近くなります。重み50%は常に#808080を生成します。

```scss
@debug color.invert(#b37399); // #4c8c66
@debug color.invert(black); // white
@debug color.invert(#550e0c, 20%); // #663b3a
```

---

```scss
lighten($color, $amount) //=> color 
```

カラーを薄くします。

amountは0%から100%（を含む）の間の数値でなければなりません。その値だけ、$color の HSL 明度を増加させます。

::: warning

⚠️ Heads up!

lighten() 関数は、 明度を一定量だけ上げるものですが、これは望ましい効果ではないことがよくあります。ある色をある割合で明るくするには、代わりに scale() を使用します。

lighten() は通常、色を明るくする最良の方法ではないため、新しいモジュールシステムには直接含まれません。しかし、既存の挙動を維持する必要がある場合は、 lighten($color, $amount) は adjust($color, $lightness: $amount) と書くことができます。

```scss
// #e1d7d2は明度85%なので、lighten()で30%追加しても白になるだけです。
@debug lighten(#e1d7d2, 30%); // white

// scale()の代わりに、元々あったものより30%軽くします。
@debug color.scale(#e1d7d2, $lightness: 30%); // #eae3e0
```

:::


```scss
// Lightness 46% becomes 66%.
@debug lighten(#6b717f, 20%); // #a1a5af

// Lightness 20% becomes 80%.
@debug lighten(#036, 60%); // #99ccff

// Lightness 85% becomes 100%.
@debug lighten(#e1d7d2, 30%); // white
```

---

```scss
color.lightness($color)
lightness($color) //=> number 
```

0%から100%の間の数値として$colorのHSL明度を返します。

See also:

- color.red() は、色の赤チャンネルを取得するためのものです。
- color.green() は色の緑チャンネルを取得します。
- color.blue() は色の青チャンネルを取得します。
- color.hue() は色の色相を取得します。
- color.saturation() は色の彩度を取得します。
- color.whiteness() は色の白色度を取得します。
- color.blackness() は色の黒さを取得します。
- color.alpha() は、色のアルファチャンネルを取得します。

```scss
@debug color.lightness(#e1d7d2); // 85.2941176471%
@debug color.lightness(#f2ece4); // 92.1568627451%
@debug color.lightness(#dadbdf); // 86.4705882353%
```

---

```scss
color.mix($color1, $color2, $weight: 50%)
mix($color1, $color2, $weight: 50%) //=> color 
```

color1 と $color2 を混ぜた色を返します。

各色の重みと相対的な不透明度の両方が、 結果に含まれる各色の量を決定します。重み付けは、0% から 100% (この値を含む) の間の数値でなければなりません。重みが大きければ大きいほど、$color1 を多く使うべきであり、小さければ小さいほど $color2 を多く使うべきであると示します。

```scss
@debug color.mix(#036, #d2e1dd); // #698aa2
@debug color.mix(#036, #d2e1dd, 75%); // #355f84
@debug color.mix(#036, #d2e1dd, 25%); // #9eb6bf
@debug color.mix(rgba(242, 236, 228, 0.5), #6b717f); // rgba(141, 144, 152, 0.75)
```

---

```scss
opacify($color, $amount)
fade-in($color, $amount) //=> color 
```

color をより不透明にします。

amount は、0 から 1 までの数字でなければなりません（この値を含む）。color のアルファチャンネルをその分増加させます。

::: warning

⚠️ Heads up!

opacify() 関数はアルファチャンネルを固定値で増加させますが、これは望ましい効果ではないことがよくあります。ある色を以前より一定割合だけ不透明にするには、代わりに scale() を使用します。

opacify() は通常、色をより不透明にする最適な方法ではないため、新しいモジュールシステムには直接含まれていません。しかし、もし既存の動作を維持しなければならないのなら、 opacify($color, $amount) は adjust($color, $alpha: -$amount) と書くことができます。

```scss
// rgba(#036, 0.7) はアルファ 0.7 なので、opacify() で 0.3 を加えると、完全に不透明な色が返されます。
@debug opacify(rgba(#036, 0.7), 0.3); // #036

// scale() の代わりに、元々あったものより30%不透明化されます。
@debug color.scale(rgba(#036, 0.7), $alpha: 30%); // rgba(0, 51, 102, 0.79)
```

:::


```scss
@debug opacify(rgba(#6b717f, 0.5), 0.2); // rgba(107, 113, 127, 0.7)
@debug fade-in(rgba(#e1d7d2, 0.5), 0.4); // rgba(225, 215, 210, 0.9)
@debug opacify(rgba(#036, 0.7), 0.3); // #036
```

---

```scss
color.red($color)
red($color) //=> number 
```

color の赤チャンネルを 0 から 255 までの数で返します。

こちらも参照ください。

- 色の緑チャネルを取得するには color.green() を使用します。
- 色の青チャンネルを得るには color.blue() を使用します。
- color.hue() は色の色相を取得します。
- color.saturation() は、色の彩度を取得します。
- color.lightness() は、色の明度を取得します。
- color.whiteness() は、色の白色度を取得します。
- color.blackness() は、色の黒さを取得します。
- color.alpha() は、色のアルファチャンネルを取得します。

```scss
@debug color.red(#e1d7d2); // 225
@debug color.red(white); // 255
@debug color.red(black); // 0
```

---

```scss
saturate($color, $amount)
saturate($color, $amount) //=> color 
```

カラーをより飽和状態にします。

amountは0%から100%（を含む）の間の数値でなければなりません。その値だけ、$color の HSL 彩度を増加させます。

::: warning

⚠️ Heads up!

saturate()関数は、彩度を一定量上げるものですが、これはしばしば望ましい効果ではありません。ある色の彩度を以前より一定割合高くするには、代わりに scale() を使用します。

saturate() は通常、色をより飽和させる最良の方法ではないため、新しいモジュールシステムには直接含まれていません。しかし、既存の動作を維持しなければならない場合、 saturate($color, $amount) は adjust($color, $saturation: $amount) と書くことができます。

```scss
// #0e4982は彩度80%なので、saturate()で30%を追加すると彩度100%になります。
@debug saturate(#0e4982, 30%); // #004990

// scale()の代わりに、元々あった彩度より30%高い彩度にします。
@debug color.scale(#0e4982, $saturation: 30%); // #0a4986
```

:::

```scss
// Saturation 50% becomes 70%.
@debug saturate(#c69, 20%); // #e05299

// Saturation 35% becomes 85%.
@debug desaturate(#f2ece4, 50%); // #ebebeb

// Saturation 80% becomes 100%.
@debug saturate(#0e4982, 30%)  // #004990
```

---

```scss
color.saturation($color)
saturation($color) //=> number 
```

color の HSL 彩度を 0% から 100% の間の数値で返します。

こちらも参照ください。

- 色の赤チャンネルを取得するには color.red() を使用します。
- 色の緑チャネルを得るには color.green() を使用します。
- color.blue() は、色の青チャンネルを取得します。
- color.hue() は、色の色相を取得します。
- color.lightness() は、色の明度を取得します。
- color.whiteness() は、色の白色度を取得します。
- color.blackness() は、色の黒さを取得します。
- color.alpha() は、色のアルファチャンネルを取得します。

```scss
@debug color.saturation(#e1d7d2); // 20%
@debug color.saturation(#f2ece4); // 30%
@debug color.saturation(#dadbdf); // 7.2463768116%
```

---

```scss
color.scale($color,
  $red: null, $green: null, $blue: null,
  $saturation: null, $lightness: null,
  $whiteness: null, $blackness: null,
  $alpha: null)
scale-color(...) //=> color 
```

互換性 ($whiteness and $blackness):

- Dart Sass: since 1.28.0
- LibSass: ✗
- Ruby Sass: ✗

colorの1つまたは複数のプロパティを流動的にスケーリングします。

各キーワード引数は、-100% から 100% (これを含む) の間の数値でなければなりません。これは、対応するプロパティを元の位置から最大値 (引数が正の場合) または最小値 (引数が負の場合) に向かってどれだけ移動させるべきかを表します。これは、例えば$lightness: 50%は、すべての色を完全に白にすることなく、50%最大の明るさに近づけることを意味します。

RGBプロパティ（$red、$green、$blue）とHSLプロパティ（$saturation、$lightness）、またはそれらのいずれかとHWBプロパティ（$whiteness、$blackness）を同時に指定することはエラーとなります。

こちらもご覧ください。

- 色のプロパティを一定量だけ変化させる color.adjust() も参照してください。
- 色のプロパティを設定する color.change()。

```scss
@debug color.scale(#6b717f, $red: 15%); // #81717f
@debug color.scale(#d2e1dd, $lightness: -10%, $saturation: 10%); // #b3d4cb
@debug color.scale(#998099, $alpha: -40%); // rgba(153, 128, 153, 0.6)
```

---

```scss
transparentize($color, $amount)
fade-out($color, $amount) //=> color 
```

カラーをより透明にします。

amount は、0 から 1 までの数字でなければなりません（この値を含む）。color のアルファチャンネルをその値だけ減らします。

::: warning

⚠️ Heads up!

transparentize() 関数はアルファチャンネルを固定量だけ減少させますが、これはしばしば望ましい効果ではありません。ある色を以前より一定割合だけ透明にするには、代わりに color.scale() を使用します。

transparentize() は通常、色をより透明にする最良の方法ではないため、新しいモジュールシステムには直接含まれていません。しかし、既存の動作を維持する必要がある場合は、 transparentize($color, $amount) は color.adjust($color, $alpha: -$amount) と書くことができます。

```scss
// rgba(#036, 0.3) はアルファ 0.3 なので、transparentize() で 0.3 を引くと完全に透明な色が返されます。
@debug transparentize(rgba(#036, 0.3), 0.3); // rgba(0, 51, 102, 0)

// scale()は、その代わりに、元々あったものより30％透明度を高くします。
@debug color.scale(rgba(#036, 0.3), $alpha: -30%); // rgba(0, 51, 102, 0.21)
```

:::

```scss
@debug transparentize(rgba(#6b717f, 0.5), 0.2)  // rgba(107, 113, 127, 0.3)
@debug fade-out(rgba(#e1d7d2, 0.5), 0.4)  // rgba(225, 215, 210, 0.1)
@debug transparentize(rgba(#036, 0.3), 0.3)  // rgba(0, 51, 102, 0)
```

---

```scss
color.whiteness($color) //=> number 
互換性:
```

- Dart Sass: since 1.28.0
- LibSass: ✗
- Ruby Sass: ✗

color の HWB 白色度を 0% から 100% の間の数値で返します。

こちらも参照ください。

- color.red() は、色の赤チャンネルを取得するためのものです。
- color.green() は、色の緑チャンネルを取得します。
- color.hue() は、色の色相を取得します。
- color.saturation() は、色の彩度を取得します。
- color.lightness() は、色の明度を取得します。
- color.blackness() は、色の黒さを取得します。
- color.alpha() は、色のアルファチャンネルを取得します。

```scss
@debug color.whiteness(#e1d7d2); // 82.3529411765%
@debug color.whiteness(white); // 100%
@debug color.whiteness(black); // 0%
```

## sass:list

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

::: tip

💡 Fun fact:

Sass では、すべてのマップは、各キー/バリュー・ペアの 2 要素リストを含むリストとしてカウントされます。例えば、(1: 2, 3: 4) は (1 2, 3 4) とカウントされます。ですから、これらの関数はすべてマップに対しても有効です。

個々の値もリストとしてカウントされます。これらの関数はすべて、1pxを値1pxを含むリストとして扱います。

:::

---

```scss
list.append($list, $val, $separator: auto)
append($list, $val, $separator: auto) //=> list 
```

listのコピーに$valを末尾に追加したものを返します。

separator がカンマ、スペース、スラッシュの場合、返すリストはそれぞれカンマ区切り、スペース区切り、スラッシュ区切りとなります。auto (デフォルト) の場合は、$list と同じ区切り文字を使用します ($list に区切り文字がない場合は空白を使用します)。それ以外の値は許されません。

list.join()とは異なり、$valがリストの場合は、 そのすべての要素が返されるリストに追加されるのではなく、 返されるリストの中にネストされることに注意しましょう。

```scss
@debug list.append(10px 20px, 30px); // 10px 20px 30px
@debug list.append((blue, red), green); // blue, red, green
@debug list.append(10px 20px, 30px 40px); // 10px 20px (30px 40px)
@debug list.append(10px, 20px, $separator: comma); // 10px, 20px
@debug list.append((blue, red), green, $separator: space); // blue red green
```

---

```scss
list.index($list, $value)
index($list, $value) //=> number | null 
```

リスト内の$valueのインデックスを返します。

値が$list内に存在しない場合、これはnullを返します。値が$list内に複数回出現する場合、これは、その最初の出現のインデックスを返します。

```scss
@debug list.index(1px solid red, 1px); // 1
@debug list.index(1px solid red, solid); // 2
@debug list.index(1px solid red, dashed); // null
```

---

```scss
list.is-bracketed($list)
is-bracketed($list) //=> boolean 
```

リストが角括弧を持つかどうかを返します。

```scss
@debug list.is-bracketed(1px 2px 3px); // false
@debug list.is-bracketed([1px, 2px, 3px]); // true
```

---

```scss
list.join($list1, $list2, $separator: auto, $bracketed: auto)
join($list1, $list2, $separator: auto, $bracketed: auto) //=> list 
```

list1の要素に続いて$list2の要素を含む新しいリストを返します。

::: warning

⚠️ Heads up!

個々の値は単一要素のリストとしてカウントされるので、 list.join() を使ってリストの末尾に値を追加することが可能です。しかし、これは推奨されません。なぜなら、その値がリストである場合、連結されてしまうため、おそらくあなたが期待しているものとは異なるからです。

代わりに list.append() を使用して、リストにひとつの値を追加します。list.join() は、ふたつのリストをひとつにまとめるときだけ使用します。
separator がカンマ、スペース、スラッシュの場合は、それぞれカンマ区切り、スペース区切り、スラッシュ区切りのリストが返されます。auto (デフォルト) の場合、返されるリストは、$list1 がセパレータを持つ場合はそれと同じセパレータを使い、$list2 がセパレータを持つ場合はそれ以外のものを使い、$space の場合はそれ以外のものを用います。それ以外の値は許されません。

:::

bracketedがauto(デフォルト)の場合、$list1が括弧付きであれば、返されるリストも括弧付きになります。それ以外の場合は、$bracketed が真であれば角括弧が付き、$bracketed が偽であれば括弧が付きません。

```scss
@debug list.join(10px 20px, 30px 40px); // 10px 20px 30px 40px
@debug list.join((blue, red), (#abc, #def)); // blue, red, #abc, #def
@debug list.join(10px, 20px); // 10px 20px
@debug list.join(10px, 20px, $separator: comma); // 10px, 20px
@debug list.join((blue, red), (#abc, #def), $separator: space); // blue red #abc #def
@debug list.join([10px], 20px); // [10px 20px]
@debug list.join(10px, 20px, $bracketed: true); // [10px 20px]
```

---

```scss
list.length($list)
length($list) //=> number 
```

listの長さを返します。

これは、マップ内のペアの数を返すこともできます。

```scss
@debug list.length(10px); // 1
@debug list.length(10px 20px 30px); // 3
@debug list.length((width: 10px, height: 20px)); // 2
```

---

```scss
list.separator($list)
list-separator($list) //=> unquoted string 
```

listが使用するセパレータの名前（スペース、カンマ、スラッシュのいずれか）を返します。

もし$listがセパレータを持たない場合、スペースを返します。

```scss
@debug list.separator(1px 2px 3px); // space
@debug list.separator(1px, 2px, 3px); // comma
@debug list.separator('Helvetica'); // space
@debug list.separator(()); // space
```

---

```scss
list.nth($list, $n)
nth($list, $n) 
```

listのインデックス$nにある要素を返します。

nが負の場合は、$listの末尾から数えます。インデックス$nに要素がない場合は、エラーをスローします。

```scss
@debug list.nth(10px 12px 16px, 2); // 12px
@debug list.nth([line1, line2, line3], -1); // line3
```

---

```scss
list.set-nth($list, $n, $value)
set-nth($list, $n, $value) //=> list 
```

インデックス$nの要素を$valueに置き換えた$listのコピーを返します。

nが負の場合は、$listの末尾から数えます。インデックス$nに要素が存在しない場合は、エラーをスローします。

```scss
@debug list.set-nth(10px 20px 30px, 1, 2em); // 2em 20px 30px
@debug list.set-nth(10px 20px 30px, -1, 8em); // 10px, 20px, 8em
@debug list.set-nth((Helvetica, Arial, sans-serif), 3, Roboto); // Helvetica, Arial, Roboto
```

---

```scss
list.slash($elements...) //=> list 
```

要素を含む、スラッシュで区切られたリストを返します。

::: warning

⚠️ Heads up!

この関数は、スラッシュで区切られたリストを作成するための一時的な解決策です。最終的には、1px / 2px / solid のように文字通りスラッシュで記述することになりますが、当面はスラッシュは分割のために使用されるので、古い構文が削除されるまで Sass は新しい構文のためにスラッシュを使用することはできません。

:::

```scss
@debug list.slash(1px, 50px, 100px); // 1px / 50px / 100px
```

---

```scss
list.zip($lists...)
zip($lists...) //=> list 
```

lists に含まれるすべてのリストを、1つのサブリストにまとめます。

返されたリストの各要素は、$lists のその位置のすべての要素を含みます。返されるリストの長さは、$lists の中で最も短いリストと同じです。

返されるリストは常にカンマで区切られ、サブリストは常にスペースで区切られます。

```scss
@debug list.zip(10px 50px 100px, short mid long); // 10px short, 50px mid, 100px long
@debug list.zip(10px 50px 100px, short mid); // 10px short, 50px mid
```

## sass:map

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

:::

💡 Fun fact:

Sassライブラリやデザインシステムは、ネストされたマップ（マップを含むマップを含むマップ）として表現される設定を共有し、上書きする傾向があります。

ネストされたマップを操作しやすくするために、いくつかのマップ関数は深い操作をサポートしています。例えば、複数のキーを map.get() に渡すと、それらのキーを辿って目的のネストされたマップを見つけます。

```scss
$config: (a: (b: (c: d)));
@debug map.get($config, a, b, c); // d
```

:::

---

```scss
map.deep-merge($map1, $map2) //=> map 
```

互換性:

- Dart Sass: since 1.27.0
- LibSass: ✗
- Ruby Sass: ✗

map.merge()と同じ。ただし、ネストしたマップの値も再帰的にマージされる。

```scss
$helvetica-light: (
  "weights": (
    "lightest": 100,
    "light": 300
  )
);
$helvetica-heavy: (
  "weights": (
    "medium": 500,
    "bold": 700
  )
);

@debug map.deep-merge($helvetica-light, $helvetica-heavy);
// (
//   "weights": (
//     "lightest": 100,
//     "light": 300,
//     "medium": 500,
//     "bold": 700
//   )
// )
@debug map.merge($helvetica-light, $helvetica-heavy);
// (
//   "weights": (
//     "medium: 500,
//     "bold": 700
//   )
// )
```

---

```scss
map.deep-remove($map, $key, $keys...) //=> map 
```

互換性:

- Dart Sass: since 1.27.0
- LibSass: ✗
- Ruby Sass: ✗

keysが空の場合、$keyに関連する値を除いた$mapのコピーを返します。

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.deep-remove($font-weights, "regular");
// ("medium": 500, "bold": 700)
```

$keysが空でない場合、$keyを含み$keysの最後のキーを除くキーの集合を左から右へ辿って、更新対象の入れ子マップを探す。

対象となるマップが $keys の最後のキーに関連付けられた値を持っていない場合、$map のコピーを返します。

```scss
$fonts: (
  "Helvetica": (
    "weights": (
      "regular": 400,
      "medium": 500,
      "bold": 700
    )
  )
);

@debug map.deep-remove($fonts, "Helvetica", "weights", "regular");
// (
//   "Helvetica": (
//     "weights: (
//       "medium": 500,
//       "bold": 700
//     )
//   )
// )
```

---

```scss
map.get($map, $key, $keys...)
map-get($map, $key, $keys...) 
```

もし$keysが空の場合、$keyに関連する$mapの値を返します。

mapに$keyに関連する値がない場合は、nullを返します。

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.get($font-weights, "medium"); // 500
@debug map.get($font-weights, "extra-bold"); // null
```

互換性:

- Dart Sass: since 1.27.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

$keysが空でない場合、$keyを含み$keysの最後のキーを除くキーの集合を左から右にたどり、検索対象のネストしたマップを見つける。

$keysの最後のキーに関連付けられた、対象となるマップ内の値を返します。

マップにそのキーに関連する値がない場合、または $keys 内のいずれかのキーがマップから外れている場合、あるいはマップでない値を参照している場合は null を返します。

```scss
$fonts: (
  "Helvetica": (
    "weights": (
      "regular": 400,
      "medium": 500,
      "bold": 700
    )
  )
);

@debug map.get($fonts, "Helvetica", "weights", "regular"); // 400
@debug map.get($fonts, "Helvetica", "colors"); // null
```

---

```scss
map.has-key($map, $key, $keys...)
map-has-key($map, $key, $keys...) //=> boolean 
```

$keys が空の場合、$map に $key に対応する値が含まれているかどうかを返します。

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.has-key($font-weights, "regular"); // true
@debug map.has-key($font-weights, "bolder"); // false
```

互換性:

- Dart Sass: since 1.27.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

If $keys is not empty, follows the set of keys including $key and excluding the last key in $keys, from left to right, to find the nested map targeted for searching.

Returns true if the targeted map contains a value associated with the last key in $keys.

Returns false if it does not, or if any key in $keys is missing from a map or references a value that is not a map.

```scss
$fonts: (
  "Helvetica": (
    "weights": (
      "regular": 400,
      "medium": 500,
      "bold": 700
    )
  )
);

@debug map.has-key($fonts, "Helvetica", "weights", "regular"); // true
@debug map.has-key($fonts, "Helvetica", "colors"); // false
```

---

```scss
map.keys($map)
map-keys($map) //=> list 
```

$mapに含まれるすべてのキーのカンマ区切りリストを返します。

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.keys($font-weights); // "regular", "medium", "bold"
```

---

```scss
map.merge($map1, $map2)
map-merge($map1, $map2)
map.merge($map1, $keys..., $map2)
map-merge($map1, $keys..., $map2) //=> map 
```

::: warning

⚠️ Heads up!

実際には、map.merge($map1, $keys..., $map2) への実際の引数は map.merge($map1, $args...) として渡されます。ここでは、説明のために $map1, $keys..., $map2 と記述しています。

:::


キーが渡されない場合、$map1 と $map2 の両方からすべてのキーと値を含む新しいマップを返します。

map1と$map2の両方が同じキーを持つ場合、$map2の値が優先されます。

返されたマップの中で $map1 にも含まれるキーはすべて、 $map1 と同じ順番で並びます。map2からの新しいキーは、マップの末尾に表示されます。

```scss
$light-weights: ("lightest": 100, "light": 300);
$heavy-weights: ("medium": 500, "bold": 700);

@debug map.merge($light-weights, $heavy-weights);
// ("lightest": 100, "light": 300, "medium": 500, "bold": 700)
```

互換性:

- Dart Sass: since 1.27.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

$keysが空でない場合、$keysをたどってマージ対象のネストされたマップを探します。keysの中のいずれかのキーがマップから外れているか、マップでない値を参照している場合、そのキーの値を空のマップに設定します。

対象となるマップが、対象となるマップと $map2 の両方のすべてのキーと値を含む新しいマップに置き換えられた $map1 のコピーを返します。

```scss
$fonts: (
  "Helvetica": (
    "weights": (
      "lightest": 100,
      "light": 300
    )
  )
);
$heavy-weights: ("medium": 500, "bold": 700);

@debug map.merge($fonts, "Helvetica", "weights", $heavy-weights);
// (
//   "Helvetica": (
//     "weights": (
//       "lightest": 100,
//       "light": 300,
//       "medium": 500,
//       "bold": 700
//     )
//   )
// )
```

---

```scss
map.remove($map, $keys...)
map-remove($map, $keys...) //=> map 
```

キーに関連する値を除いた $map のコピーを返します。

もし$keysのキーが$mapに関連する値を持っていない場合、それは無視されます。

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.remove($font-weights, "regular"); // ("medium": 500, "bold": 700)
@debug map.remove($font-weights, "regular", "bold"); // ("medium": 500)
@debug map.remove($font-weights, "bolder");
// ("regular": 400, "medium": 500, "bold": 700)
```

---


```scss
map.set($map, $key, $value)
map.set($map, $keys..., $key, $value) //=> map 
```

::: warning

⚠️ Heads up!

実際には、map.set($map, $keys..., $key, $value)の実際の引数は、map.set($map, $args...)として渡されています。ここでは説明のために、$map, $keys..., $key, $valueと記述しています。

:::

キーが渡されない場合、$keyの値を$valueに設定した$mapのコピーを返します。

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.set($font-weights, "regular", 300);
// ("regular": 300, "medium": 500, "bold": 700)
```

互換性:

- Dart Sass: since 1.27.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

keyが渡された場合、$keysをたどって更新対象のネストされたマップを探します。keysに含まれるキーがマップにない場合、あるいはマップでない値を参照している場合、 そのキーの値を空のマップに設定します。

ターゲット・マップの$keyの値を$valueに設定した$mapのコピーを返します。

```scss
$fonts: (
  "Helvetica": (
    "weights": (
      "regular": 400,
      "medium": 500,
      "bold": 700
    )
  )
);

@debug map.set($fonts, "Helvetica", "weights", "regular", 300);
// (
//   "Helvetica": (
//     "weights": (
//       "regular": 300,
//       "medium": 500,
//       "bold": 700
//     )
//   )
// )
```

---

```scss
map.values($map)
map-values($map) //=> list 
```

$mapに含まれるすべての値をカンマ区切りで返します。

```scss
$font-weights: ("regular": 400, "medium": 500, "bold": 700);

@debug map.values($font-weights); // 400, 500, 700
```


## sass:math


互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

### Variables

```scss
math.$e
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

数学定数eの値に等しい。

```Scss
@debug math.$e; // 2.7182818285
```

---

```scss
math.$pi
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

数学定数πの値に等しい。

```scss
@debug math.$pi; // 3.1415926536
```

### Bounding Functions

```scss
math.ceil($number)
ceil($number) //=> number 
```

$numberを次の最も大きい整数に切り上げます。

```scss
@debug math.ceil(4); // 4
@debug math.ceil(4.2); // 5
@debug math.ceil(4.9); // 5
```

---

```scss
math.clamp($min, $number, $max) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

$number を $min から $max までの範囲に制限します。number が $min より小さい場合は $min を、 $max より大きい場合は $max を返します。

$min、$number、$maxは、互換性のある単位を持つか、すべて単位なしである必要があります。

```scss
@debug math.clamp(-1, 0, 1); // 0
@debug math.clamp(1px, -1px, 10px); // 1px
@debug math.clamp(-1in, 1cm, 10mm); // 10mm
```

---

```scss
math.floor($number)
floor($number) //=> number 
```

$numberを切り捨て、次の最小の整数にします。

```scss
@debug math.floor(4); // 4
@debug math.floor(4.2); // 4
@debug math.floor(4.9); // 4
```

---

```scss
math.max($number...)
max($number...) //=> number 
```

1つまたは複数の数値のうち、最も大きい数値を返します。

```scss
@debug math.max(1px, 4px); // 4px

$widths: 50px, 30px, 100px;
@debug math.max($widths...); // 100px
```

---

```scss
math.min($number...)
min($number...) //=> number 
```

1つまたは複数の数値のうち、最も小さい数値を返します。

```scss
@debug math.min(1px, 4px); // 1px

$widths: 50px, 30px, 100px;
@debug math.min($widths...); // 30px
```

---

```scss
math.round($number)
round($number) //=> number 
```

最も近い整数に $number を丸めます。

```scss
@debug math.round(4); // 4
@debug math.round(4.2); // 4
@debug math.round(4.9); // 5
```


### Distance Functions

```scss
math.abs($number)
abs($number) //=> number 
```

numberの絶対値を返します。numberが負の場合は-$numberを、正の場合は$numberをそのまま返します。

```scss
@debug math.abs(10px); // 10px
@debug math.abs(-10px); // 10px
```

---

```scss
math.hypot($number...) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

各$numberに等しい成分を持つ、n次元ベクトルの長さを返します。例えば、a, b, cの3つの数に対して、これはa² + b² + c²の平方根を返します。

数値はすべて互換性のある単位を持つか、すべて単位を持たないかのどちらかでなければなりません。そして、数値の単位が異なる場合があるので、出力は最初の数値の単位をとります。

```scss
@debug math.hypot(3, 4); // 5

$lengths: 1in, 10cm, 50px;
@debug math.hypot($lengths...); // 4.0952775683in
```


### Exponential Functions

```scss
math.log($number, $base: null) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

$numberの$baseに対する対数を返します。baseがNULLの場合は、自然対数を計算します。

$numberと$baseは無単位でなければならない。

```scss
@debug math.log(10); // 2.302585093
@debug math.log(10, 10); // 1
```

---

```scss
math.pow($base, $exponent) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

$baseを$exponentのべき乗に引き上げます。

$baseと$exponentは無単位でなければなりません。

```scss
@debug math.pow(10, 2); // 100
@debug math.pow(100, math.div(1, 3)); // 4.6415888336
@debug math.pow(5, -2); // 0.04
```

---

```scss
math.sqrt($number) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

$numberの平方根を返します。

$numberは無単位でなければなりません。

```scss
@debug math.sqrt(100); // 10
@debug math.sqrt(math.div(1, 3)); // 0.5773502692
@debug math.sqrt(-1); // NaN
```


### 三角関数

```scss
math.cos($number) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

$numberのcosを返します。

$numberは角度（単位はdegと互換性があること）または単位なしである必要があります。numberに単位がない場合は、radであるとみなされます。

```scss
@debug math.cos(100deg); // -0.1736481777
@debug math.cos(1rad); // 0.5403023059
@debug math.cos(1); // 0.5403023059
```

---

```scss
math.sin($number) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

$numberの正弦を返します。

$numberは角度（単位はdegと互換性があること）または単位なしである必要があります。numberに単位がない場合は、radであるとみなされます。

```scss
@debug math.sin(100deg); // 0.984807753
@debug math.sin(1rad); // 0.8414709848
@debug math.sin(1); // 0.8414709848
```

---

```scss
math.tan($number) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

numberのタンジェントを返します。

$numberは角度（単位はdegと互換性があること）または単位なしである必要があります。numberに単位がない場合は、radであると見なされます。

```scss
@debug math.tan(100deg); // -5.6712818196
@debug math.tan(1rad); // 1.5574077247
@debug math.tan(1); // 1.5574077247
```

---

```scss
math.acos($number) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

$numberのアークサインをdegで返します。

$numberは無単位でなければなりません。

```scss
@debug math.acos(0.5); // 60deg
@debug math.acos(2); // NaNdeg
```

---

```scss
math.asin($number) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

$numberのアークサインをdegで返します。

$numberは無単位でなければなりません。

```scss
@debug math.asin(0.5); // 30deg
@debug math.asin(2); // NaNdeg
```

---

```scss
math.atan($number) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

$numberのアークタンジェントをdegで返します。

$numberは無単位でなければなりません。

```scss
@debug math.atan(10); // 84.2894068625deg
```

---

```scss
math.atan2($y, $x) //=> number 
```

互換性:

- Dart Sass: since 1.25.0
- LibSass: ✗
- Ruby Sass: ✗

$yと$xの2引数のアークタンジェントをdegで返します。

$yと$xは互換性のある単位を持つか、単位なしである必要があります。

::: tip

💡 Fun fact:

math.atan2($y, $x) と atan(math.div($y, $x)) は、問題の点の象限を保持するため、区別されます。例えば， math.atan2(1, -1) は点 (-1, 1) に対応し，135deg を返します． これに対して， math.atan(math.div(1, -1)) と math.atan(math.div(-1, 1)) は最初に atan(-1) に解決するので，両方とも -45deg を返します．

:::

```scss
@debug math.atan2(-1, 1); // 135deg
```

### ユニット関数

```scss
math.compatible($number1, $number2)
comparable($number1, $number2) //=> boolean 
```

$number1 と $number2 が互換性のある単位を持っているかどうかを返します。

これが真を返した場合、$number1 と $number2 は安全に加算、減算、および比較することができます。そうでない場合は、エラーが発生します。

::: warning

⚠️ Heads up!

この関数のグローバル名はcomparableですが、sass:mathモジュールに追加されたときに、この関数が何をするのかをより明確に伝えるためにcompatibleに名前が変更されました。

:::

```scss
@debug math.compatible(2px, 1px); // true
@debug math.compatible(100px, 3em); // false
@debug math.compatible(10cm, 3mm); // true
```

---

```scss
math.is-unitless($number)
unitless($number) //=> boolean 
```

$numberが単位を持たないかどうかを返します。

```scss
@debug math.is-unitless(100); // true
@debug math.is-unitless(100px); // false
```

---

```scss
math.unit($number)
unit($number) //=> quoted string 
```

$numberの単位を文字列で返します。

::: warning

⚠️ Heads up!

この関数はデバッグ用です。その出力形式は、Sass のバージョンまたは実装間で一貫していることは保証されません。

:::

```scss
@debug math.unit(100); // ""
@debug math.unit(100px); // "px"
@debug math.unit(5px * 10px); // "px*px"
@debug math.unit(math.div(5px, 1s)); // "px/s"
```

### Other Functions

```scss
math.div($number1, $number2) //=> number 
```

互換性:

- Dart Sass: since 1.33.0
- LibSass: ✗
- Ruby Sass: ✗

$number1 を $number2 で割った結果を返します。

両方の数字に共通する単位は、すべて相殺されます。$number1にあって$number2にない単位は戻り値の分子に、$number2にあって$number1にない単位は戻り値の分母に入ることになります。

::: warning

⚠️ Heads up!

後方互換性のために、これは非推奨の/演算子と全く同じ結果を返し、間に/文字がある2つの文字列を連結することを含む。しかし、この動作はいずれ削除されるため、新しいスタイルシートでは使用しない方が良い。

:::

```scss
@debug math.div(1, 2); // 0.5
@debug math.div(100px, 5px); // 20
@debug math.div(100px, 5); // 20px
@debug math.div(100px, 5s); // 20px/s
```

---

```scss
math.percentage($number)
percentage($number) //=> number 
```

単位のない $number (通常は 0 と 1 の間の 10 進数) をパーセンテージに変換します。

::: tip

💡 Fun fact:

この関数は、$number * 100% と同じです。

:::

```scss
@debug math.percentage(0.2); // 20%
@debug math.percentage(math.div(100px, 50px)); // 200%
```

---

```scss
math.random($limit: null)
random($limit: null) //=> number 
```

$limit が NULL の場合、0 から 1 までのランダムな 10 進数を返します。

```scss
@debug math.random(); // 0.2821251858
@debug math.random(); // 0.6221325814
```

$limitが1以上の数値の場合、1から$limitまでの間のランダムな整数を返します。

::: warning

⚠️ Heads up!

random() は、$limit の単位を無視します。この動作は非推奨で、 random($limit) は引数 $limit と同じ単位のランダムな整数を返します。

```scss
@debug math.random(100px); // 42
```

:::

```scss
@debug math.random(10); // 4
@debug math.random(10000); // 5373
```

## sass:meta

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

### Mixins

```scss
meta.load-css($url, $with: null) 
```

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

$url にあるモジュールをロードし、その CSS をこの mixin のコンテンツとして書き込んだかのように含めます。with パラメータは、モジュールの設定を行います。渡す場合は、変数名（$なし）から、読み込んだモジュールで使用するそれらの変数の値へのマップである必要があります。

$url が relative の場合、meta.load-css() が含まれるファイルからの相対パスとして解釈されます。

`@use`ルールのように。

- これは、与えられたモジュールが異なる方法で複数回ロードされたとしても、一度だけ評価します。
- これは、すでにロードされたモジュールに設定を提供することはできません。

`@use`ルールとは異なります。

- これは、ロードされたモジュールのメンバーを現在のモジュールで利用できるようにするものではありません。
- これはスタイルシートのどこでも使用することができます。スタイル・ルールの中に入れて、ネストされたスタイルを作成することもできます。
- 読み込まれるモジュールの URL は、変数から得ることができ、補間を含むことができます。

::: warning

⚠️ Heads up!

$urlパラメータは、@useルールに渡すようなURLを含む文字列でなければなりません。CSSのurl()であってはいけません!

:::

::: code-group

```scss [SCSS]
// dark-theme/_code.scss
$border-contrast: false !default;

code {
  background-color: #6b717f;
  color: #d2e1dd;
  @if $border-contrast {
    border-color: #dadbdf;
  }
}

// style.scss
@use "sass:meta";

body.dark {
  @include meta.load-css("dark-theme/code",
      $with: ("border-contrast": true));
}
```

```css [CSS]
body.dark code {
  background-color: #6b717f;
  color: #d2e1dd;
  border-color: #dadbdf;
}
```

:::


### Functions

```scss
meta.calc-args($calc) //=> list 
```

互換性:

- Dart Sass: since 1.40.0
- LibSass: ✗
- Ruby Sass: ✗

指定された計算の引数を返します。

引数が数値またはネストされた計算である場合、その型として返されます。それ以外の場合は、引用符で囲まれていない文字列として返される。

```scss
@debug meta.calc-args(calc(100px + 10%)); // unquote("100px + 10%")
@debug meta.calc-args(clamp(50px, var(--width), 1000px)); // 50px, unquote("var(--width)"), 1000px
```

---

```scss
meta.calc-name($calc) //=> quoted string 
```

互換性:

- Dart Sass: since 1.40.0
- LibSass: ✗
- Ruby Sass: ✗

指定された計算の名前を返します。

```scss
@debug meta.calc-name(calc(100px + 10%)); // "calc"
@debug meta.calc-name(clamp(50px, var(--width), 1000px)); // "clamp"
```

---

```scss
meta.call($function, $args...)
call($function, $args...) 
```

互換性 (引数の種類):

- Dart Sass: ✓
- LibSass: since 3.5.0
- Ruby Sass: since 3.5.0
- ▶

$args を指定して $function を起動し、結果を返します。

この$functionは、meta.get-function()によって返される関数でなければなりません。

::: code-group

```scss
@use "sass:list";
@use "sass:meta";
@use "sass:string";

/// $condition が `true` を返すすべての要素を削除した $list のコピーを返します。
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

---

```scss
meta.content-exists()
content-exists() //=> boolean 
```

現在の mixin に `@content` ブロックが渡されたかどうかを返します。

ミキシンの外部で呼び出された場合はエラーをスローします。

```scss
@mixin debug-content-exists {
  @debug meta.content-exists();
  @content;
}

@include debug-content-exists; // false
@include debug-content-exists { // true
  // Content!
}
```

---

```scss
meta.feature-exists($feature)
feature-exists($feature) //=> boolean 
```

現在の Sass 実装が $feature をサポートしているかどうかを返します。

feature は文字列である必要があります。現在認識されている機能は以下の通りです。

- global-variable-shadowing は、ローカル変数がグローバル変数をシャドウすることを意味します（!global フラグがない限り）。
- extend-selector-pseudoclass, これは @extend ルールが :not() のような擬似クラスにネストされたセレクタに影響することを意味します。
- units-level3, これは、単位演算が CSS Values and Units Level 3 で定義された単位をサポートすることを意味します。
- at-error, これは @error ルールがサポートされることを意味します。
- custom-property は、カスタムプロパティ宣言の値が補間以外の表現に対応していないことを意味します。

認識できない$featureに対してはfalseを返します。

```scss
@debug meta.feature-exists("at-error"); // true
@debug meta.feature-exists("unrecognized"); // false
```

---

```scss
meta.function-exists($name, $module: null)
function-exists($name) //=> boolean 
```

$nameという名前の関数が、組み込み関数として、あるいはユーザー定義関数として定義されているかどうかを返します。

$moduleが渡された場合、これは、$moduleという名前のモジュールに関数が定義されているかどうかもチェックします。moduleは、現在のファイルの[@use rule][]の名前空間と一致する文字列である必要があります。

```scss
@use "sass:math";

@debug meta.function-exists("div", "math"); // true
@debug meta.function-exists("scale-color"); // true
@debug meta.function-exists("add"); // false

@function add($num1, $num2) {
  @return $num1 + $num2;
}
@debug meta.function-exists("add"); // true
```

---

```scss
meta.get-function($name, $css: false, $module: null)
get-function($name, $css: false, $module: null) //=> function 
```

$nameという名前の関数を返します。

$moduleがNULLの場合、名前空間なしで$nameという名前の関数を返します(グローバル組み込み関数を含む)。そうでない場合は、$moduleは現在のファイル内の@useルールの名前空間に一致する文字列でなければならず、その場合、これは$nameという名前のそのモジュール内の関数を返します。

デフォルトでは、$nameがSass関数を参照していない場合、これはエラーを投げます。しかし、$cssがtrueの場合、代わりにプレーンなCSS関数を返します。

返された関数は、meta.call() を使って呼び出すことができます。

```scss
@use "sass:list";
@use "sass:meta";
@use "sass:string";

/// $condition が `true` を返すすべての要素を削除した $list のコピーを返します。
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

---

```scss
meta.global-variable-exists($name, $module: null)
global-variable-exists($name, $module: null) //=> boolean 
```

$nameという名前のグローバル変数が（$を除いた）存在するかどうかを返します。

$moduleがNULLの場合、名前空間を持たない$nameという変数が存在するかどうかを返します。そうでない場合は、$moduleは現在のファイル内の@useルールの名前空間に一致する文字列でなければならず、その場合、これはそのモジュールが$nameという名前の変数を持っているかどうかを返します。

meta.variable-exists()も参照してください。

```scss
@debug meta.global-variable-exists("var1"); // false

$var1: value;
@debug meta.global-variable-exists("var1"); // true

h1 {
  // $var2 is local.
  $var2: value;
  @debug meta.global-variable-exists("var2"); // false
}
```

---

```scss
meta.inspect($value)
inspect($value) //=> unquoted string 
```

$value の文字列表現を返します。

CSS で表現できる値だけでなく、あらゆる Sass 値の表現を返します。そのため、その戻り値は有効なCSSであることは保証されません。

::: warning

⚠️ Heads up!

この関数はデバッグ用です。その出力形式は、Sass のバージョンまたは実装間で一貫していることは保証されません。

:::

```scss
@debug meta.inspect(10px 20px 30px); // unquote("10px 20px 30px")
@debug meta.inspect(("width": 200px)); // unquote('("width": 200px)')
@debug meta.inspect(null); // unquote("null")
@debug meta.inspect("Helvetica"); // unquote('"Helvetica"')
```

---

```scss
meta.keywords($args)
keywords($args) //=> map 
```

任意の引数を取る mixin や関数に渡されたキーワードを返します。引数$argsは引数リストである必要があります。

キーワードは、引用符で囲まれていない文字列（$を含まない）としての 引数名から、それらの引数の値へのマップとして返されます。

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


---

```scss
meta.mixin-exists($name, $module: null)
mixin-exists($name, $module: null) //=> boolean 
```

$nameという名前のミキシンが存在するかどうかを返します。

もし $module が null ならば、名前空間を持たない $name という名前の mixin が存在するかどうかを返します。それ以外の場合は、 $module は現在のファイル内の @use ルールの名前空間にマッチする文字列でなければなりません。

```scss
@debug meta.mixin-exists("shadow-none"); // false

@mixin shadow-none {
  box-shadow: none;
}

@debug meta.mixin-exists("shadow-none"); // true
```

---

```scss
meta.module-functions($module) //=> map 
```

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

あるモジュールで定義されているすべての関数を、関数名から関数値へのマップとして返します。

$moduleパラメータは、現在のファイル内の@useルールの名前空間と一致する文字列でなければなりません。

```scss
// _functions.scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}

//
@use "sass:map";
@use "sass:meta";

@use "functions";

@debug meta.module-functions("functions"); // ("pow": get-function("pow"))

@debug meta.call(map.get(meta.module-functions("functions"), "pow"), 3, 4); // 81
```

---

```scss
meta.module-variables($module) //=> map 
```

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

モジュールで定義されたすべての変数を、変数名（$なし）からそれらの変数の値へのマップとして返します。

$moduleパラメータは、現在のファイルの@useルールの名前空間と一致する文字列でなければなりません。

```scss
// _variables.scss
$hopbush: #c69;
$midnight-blue: #036;
$wafer: #e1d7d2;

//
@use "sass:meta";

@use "variables";

@debug meta.module-variables("variables");
// (
//   "hopbush": #c69,
//   "midnight-blue": #036,
//   "wafer": #e1d7d2
// )
```

---

```scss
meta.type-of($value)
type-of($value) //=> unquoted string 
```

$valueの型を返します。

これは、以下の値を返すことができます。

- number
- string
- color
- list
- map
- calculation
- bool
- null
- function
- arglist

将来、新しい可能な値が追加されるかもしれない。また、()の場合は、map 関数から返されたものかどうかによって、list か map のどちらかを返すことがある。

```scss
@debug meta.type-of(10px); // number
@debug meta.type-of(10px 20px 30px); // list
@debug meta.type-of(()); // list
```

---

```scss
meta.variable-exists($name)
variable-exists($name) //=> boolean 
```

name ($ を含まない) という名前の変数が現在のスコープに存在するかどうかを返します。

meta.global-variable-exists()も参照ください。

```scss
@debug meta.variable-exists("var1"); // false

$var1: value;
@debug meta.variable-exists("var1"); // true

h1 {
  // $var2 is local.
  $var2: value;
  @debug meta.variable-exists("var2"); // true
}
```


## sass:selector

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

### Selector Values

このモジュールの関数はセレクタを検査し、操作します。セレクタを返すときはいつも、引用符で囲まれていない文字列（複合セレクタ）を含むスペースで区切られたリスト（複合セレクタ）を含むカンマで区切られたリスト（セレクタリスト）であることが多いです。たとえば、セレクタ .main aside:hover, .sidebar p は、次のように返されます。

```scss
@debug ((unquote(".main") unquote("aside:hover")),
        (unquote(".sidebar") unquote("p")));
// .main aside:hover, .sidebar p
```

これらの関数へのセレクタ引数は、同じ形式であっても、通常の文字列（引用符で囲むか囲まないか）、またはその組み合わせであってもかまいません。例えば、".main aside:hover, .sidebar p" は有効なセレクタ引数です。

---

```scss
selector.is-superselector($super, $sub)
is-superselector($super, $sub) //=> boolean 
```

セレクタ $super が、セレクタ $sub がマッチするすべての要素にマッチするかどうかを返します。

たとえ $super が $sub よりも多くの要素にマッチしたとしても、真を返します。

$super と $sub セレクタは、プレースホルダセレクタを含むことができますが、 親セレクタを含むことはできません。

```scss
@debug selector.is-superselector("a", "a.disabled"); // true
@debug selector.is-superselector("a.disabled", "a"); // false
@debug selector.is-superselector("a", "sidebar a"); // true
@debug selector.is-superselector("sidebar a", "a"); // false
@debug selector.is-superselector("a", "a"); // true
```

---

```scss
selector.append($selectors...)
selector-append($selectors...) //=> selector 
```

$selectorsを、子孫の組紐を使わずに、つまり空白を使わずに組み合わせます。

$selectors のセレクタがセレクタリストの場合は、 それぞれのセレクタが個別に結合されます。

$selectorsにはプレースホルダセレクタを含めることができますが、 親セレクタは含められません。

selector.nest() も参照ください。

```scss
@debug selector.append("a", ".disabled"); // a.disabled
@debug selector.append(".accordion", "__copy"); // .accordion__copy
@debug selector.append(".accordion", "__copy, __image");
// .accordion__copy, .accordion__image
```

---

```scss
selector.extend($selector, $extendee, $extender)
selector-extend($selector, $extendee, $extender) //=> selector 
```

@extendルールと同様に$selectorを拡張します。

以下の @extend ルールで変更した $selector のコピーを返します。

```scss
#{$extender} {
  @extend #{$extendee};
}
```

言い換えると、$selector に含まれる $extendee のインスタンスをすべて $extendee, $extender に置き換えます。もし $selector が $extendee を含んでいない場合は、そのまま返します。

$selector、$extendee、$extender セレクタは、プレースホルダセレクタを含むことができますが、親セレクタを含むことはできません。

selector.replace()も参照ください。

```scss
@debug selector.extend("a.disabled", "a", ".link"); // a.disabled, .link.disabled
@debug selector.extend("a.disabled", "h1", "h2"); // a.disabled
@debug selector.extend(".guide .info", ".info", ".content nav.sidebar");
// .guide .info, .guide .content nav.sidebar, .content .guide nav.sidebar
```

---

```scss
selector.nest($selectors...)
selector-nest($selectors...) //=> selector 
```

$selectorsを、スタイルシートの中で互いに入れ子になっているかのように結合します。

$selectorsは、プレースホルダセレクタを含むことができます。他のセレクタ関数と異なり、最初のセレクタを除くすべてのセレクタは親セレクタを含むことができます。

selector.append()も参照してください。

```scss
@debug selector.nest("ul", "li"); // ul li
@debug selector.nest(".alert, .warning", "p"); // .alert p, .warning p
@debug selector.nest(".alert", "&:hover"); // .alert:hover
@debug selector.nest(".accordion", "&__copy"); // .accordion__copy
```

---

```scss
selector.parse($selector)
selector-parse($selector) //=> selector 
```

セレクタの値のフォーマットで $selector を返します。

```scss
@debug selector.parse(".main aside:hover, .sidebar p");
// ((unquote(".main") unquote("aside:hover")),
//  (unquote(".sidebar") unquote("p")))
```

---

```scss
selector.replace($selector, $original, $replacement)
selector-replace($selector, $original, $replacement) //=> selector 
```

$original のすべてのインスタンスを $replacement で置き換えた $selector のコピーを返します。

これは、@extend ルールのインテリジェントな統合機能を使用して、 $replacement が $selector にシームレスに統合されることを確認します。selector が $original を含んでいない場合は、そのまま返します。

$selector、$original および $replacement セレクタはプレースホルダセレクタを含むことができますが、 親セレクタを含むことはできません。

selector.extend() も参照ください。

```scss
@debug selector.replace("a.disabled", "a", ".link"); // .link.disabled
@debug selector.replace("a.disabled", "h1", "h2"); // a.disabled
@debug selector.replace(".guide .info", ".info", ".content nav.sidebar");
// .guide .content nav.sidebar, .content .guide nav.sidebar
```

---

```scss
selector.unify($selector1, $selector2)
selector-unify($selector1, $selector2) //=> selector | null 
```

$selector1 と $selector2 の両方にマッチする要素にのみマッチするセレクタを返します。

$selector1 と $selector2 が同じ要素にマッチしない場合、 あるいはそれらの重複を表すセレクタが存在しない場合は null を返します。

@extend 規則で生成されるセレクタと同様、返されるセレクタも、 $selector1 と $selector2 がともに複雑なセレクタの場合、 両方の要素にマッチすることは保証されません。

```scss
@debug selector.unify("a", ".disabled"); // a.disabled
@debug selector.unify("a.disabled", "a.outgoing"); // a.disabled.outgoing
@debug selector.unify("a", "h1"); // null
@debug selector.unify(".warning a", "main a"); // .warning main a, main .warning a
```

---

```scss
selector.simple-selectors($selector)
simple-selectors($selector) //=> list 
```

単純なセレクタの一覧を $selector で返します。

$selector は、複合セレクタを含む単一の文字列でなければなりません。つまり、コンバイネータ (空白を含む) やカンマを含んではいけないということです。

返されるリストはカンマ区切りで、単純なセレクタは引用符で囲まれていない文字列となります。

```scss
@debug selector.simple-selectors("a.disabled"); // a, .disabled
@debug selector.simple-selectors("main.blog:after"); // main, .blog, :after
```


## sass:string

互換性:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

```scss
string.quote($string)
quote($string) //=> string 
```

引用符で囲まれた文字列として$stringを返します。

```scss
@debug string.quote(Helvetica); // "Helvetica"
@debug string.quote("Helvetica"); // "Helvetica"
```

---

```scss
string.index($string, $substring)
str-index($string, $substring) //=> number 
```

文字列中の $substring の最初のインデックスを返します。$string が $substring を含まない場合は null を返します。

```scss
@debug string.index("Helvetica Neue", "Helvetica"); // 1
@debug string.index("Helvetica Neue", "Neue"); // 11
```

---

```scss
string.insert($string, $insert, $index)
str-insert($string, $insert, $index) //=> string 
```

インデックスに$insertを挿入した$stringのコピーを返します。

```scss
@debug string.insert("Roboto Bold", " Mono", 7); // "Roboto Mono Bold"
@debug string.insert("Roboto Bold", " Mono", -6); // "Roboto Mono Bold"
```

$indexが$stringの長さより大きい場合、$insertは末尾に追加されます。もし$indexが文字列の負の長さより小さければ、$insertは先頭に追加されます。

```scss
@debug string.insert("Roboto", " Bold", 100); // "Roboto Bold"
@debug string.insert("Bold", "Roboto ", -100); // "Roboto Bold"
```

---

```scss
string.length($string)
str-length($string) //=> number 
```

$stringの文字数を返します。

```scss
@debug string.length("Helvetica Neue"); // 14
@debug string.length(bold); // 4
@debug string.length(""); // 0
```

---

```scss
string.slice($string, $start-at, $end-at: -1)
str-slice($string, $start-at, $end-at: -1) //=> string 
```

インデックス $start-at で始まり、インデックス $end-at で終わる (両方を含む) $string のスライスを返します。

```scss
@debug string.slice("Helvetica Neue", 11); // "Neue"
@debug string.slice("Helvetica Neue", 1, 3); // "Hel"
@debug string.slice("Helvetica Neue", 1, -6); // "Helvetica"
```

---

```scss
string.to-upper-case($string)
to-upper-case($string) //=> string 
```

ASCII文字を大文字に変換した$stringのコピーを返します。

```scss
@debug string.to-upper-case("Bold"); // "BOLD"
@debug string.to-upper-case(sans-serif); // SANS-SERIF
```

---

```scss
string.to-lower-case($string)
to-lower-case($string) //=> string 
```

ASCII文字を小文字に変換した$stringのコピーを返します。

```scss
@debug string.to-lower-case("Bold"); // "bold"
@debug string.to-lower-case(SANS-SERIF); // sans-serif
```

---

```scss
string.unique-id()
unique-id() //=> string 
```

有効な CSS 識別子であり、現在の Sass コンパイル内で一意であることが保証されている、ランダムに生成される引用符なしの文字列を返します。

```scss
@debug string.unique-id(); // uabtrnzug
@debug string.unique-id(); // u6w1b1def
```

---

```scss
string.unquote($string)
unquote($string) //=> string 
```

$stringを引用符で囲まれていない文字列として返します。これは、有効なCSSでない文字列を生成する可能性があるので、注意して使用してください。

```scss
@debug string.unquote("Helvetica"); // Helvetica
@debug string.unquote(".widget:hover"); // .widget:hover
```