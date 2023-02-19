# Interpolation

Interpolation can be used almost anywhere in a Sass stylesheet to embed the result of a SassScript expression into a chunk of CSS. Just wrap an expression in #{} in any of the following places:

- Selectors in style rules
- Property names in declarations
- Custom property values
- CSS at-rules
- @extends
- Plain CSS @imports
- Quoted or unquoted strings
- Special functions
- Plain CSS function names
- Loud comments

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


## In SassScript permalinkIn SassScript

Compatibility (Modern Syntax):

- Dart Sass: ✓
- LibSass: ✗
- Ruby Sass: since 4.0.0 (unreleased)
- ▶

Interpolation can be used in SassScript to inject SassScript into unquoted strings. This is particularly useful when dynamically generating names (for example for animations), or when using slash-separated values. Note that interpolation in SassScript always returns an unquoted string.

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

Interpolation is useful for injecting values into strings, but other than that it’s rarely necessary in SassScript expressions. You definitely don’t need it to just use a variable in a property value. Instead of writing color: #{$accent}, you can just write color: $accent!

:::

::: warning

⚠️ Heads up!

It’s almost always a bad idea to use interpolation with numbers. Interpolation returns unquoted strings that can’t be used for any further math, and it avoids Sass’s built-in safeguards to ensure that units are used correctly.

Sass has powerful unit arithmetic that you can use instead. For example, instead of writing #{$width}px, write $width * 1px—or better yet, declare the $width variable in terms of px to begin with. That way if $width already has units, you’ll get a nice error message instead of compiling bogus CSS.

:::


## Quoted Strings permalinkQuoted Strings

In most cases, interpolation injects the exact same text that would be used if the expression were used as a property value. But there is one exception: the quotation marks around quoted strings are removed (even if those quoted strings are in lists). This makes it possible to write quoted strings that contain syntax that’s not allowed in SassScript (like selectors) and interpolate them into style rules.

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

While it’s tempting to use this feature to convert quoted strings to unquoted strings, it’s a lot clearer to use the string.unquote() function. Instead of #{$string}, write string.unquote($string)!

:::