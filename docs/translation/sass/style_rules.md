# Style Rules

## Overview

Style rules are the foundation of Sass, just like they are for CSS. And they work the same way: you choose which elements to style with a selector, and declare properties that affect how those elements look.

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

### Nesting

But Sass wants to make your life easier. Rather than repeating the same selectors over and over again, you can write one style rules inside another. Sass will automatically combine the outer rule’s selector with the inner rule’s.

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

⚠️ Heads up!

Nested rules are super helpful, but they can also make it hard to visualize how much CSS you’re actually generating. The deeper you nest, the more bandwidth it takes to serve your CSS and the more work it takes the browser to render it. Keep those selectors shallow!

:::

#### Selector Lists

Nested rules are clever about handling selector lists (that is, comma-separated selectors). Each complex selector (the ones between the commas) is nested separately, and then they’re combined back into a selector list.

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

#### Selector Combinators

You can nest selectors that use combinators as well. You can put the combinator at the end of the outer selector, at the beginning of the inner selector, or even all on its own in between the two.

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

#### Advanced Nesting

If you want to do more with your nested style rules than just combine them in order with the descendant combinator (that is, a plain space) separating them, Sass has your back. See the parent selector documentation for more details.

### Interpolation

You can use interpolation to inject values from expressions like variables and function calls into your selectors. This is particularly useful when you’re writing mixins, since it allows you to create selectors from parameters your users pass in.

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

💡 Fun fact:

Sass only parses selectors after interpolation is resolved. This means you can safely use interpolation to generate any part of the selector without worrying that it won’t parse.

:::

You can combine interpolation with the parent selector &, the @at-root rule, and selector functions to wield some serious power when dynamically generating selectors. For more information, see the parent selector documentation.

## Property Declarations

In Sass as in CSS, property declarations define how elements that match a selector are styled. But Sass adds extra features to make them easier to write and to automate. First and foremost, a declaration's value can be any SassScript expression, which will be evaluated and included in the result.

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

### Interpolation

A property’s name can include interpolation, which makes it possible to dynamically generate properties as needed. You can even interpolate the entire property name!

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

### Nesting

Many CSS properties start with the same prefix that acts as a kind of namespace. For example, font-family, font-size, and font-weight all start with font-. Sass makes this easier and less redundant by allowing property declarations to be nested. The outer property names are added to the inner, separated by a hyphen.

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

### Hidden Declarations

Sometimes you only want a property declaration to show up some of the time. If a declaration’s value is null or an empty unquoted string, Sass won’t compile that declaration to CSS at all.

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

### Custom Properties

Compatibility (SassScript Syntax):

- Dart Sass: ✓
- LibSass: since 3.5.0
- Ruby Sass: since 3.5.0
- ▶

CSS custom properties, also known as CSS variables, have an unusual declaration syntax: they allow almost any text at all in their declaration values. What’s more, those values are accessible to JavaScript, so any value might potentially be relevant to the user. This includes values that would normally be parsed as SassScript.

Because of this, Sass parses custom property declarations differently than other property declarations. All tokens, including those that look like SassScript, are passed through to CSS as-is. The only exception is interpolation, which is the only way to inject dynamic values into a custom property.

::: code-group

```scss [SCSS]
$primary: #81899b;
$accent: #302e24;
$warn: #dfa612;

:root {
  --primary: #{$primary};
  --accent: #{$accent};
  --warn: #{$warn};

  // Even though this looks like a Sass variable, it's valid CSS so it's not
  // evaluated.
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

⚠️ Heads up!

Unfortunately, interpolation removes quotes from strings, which makes it difficult to use quoted strings as values for custom properties when they come from Sass variables. As a workaround, you can use the meta.inspect() function to preserve the quotes.

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

## Parent Selector

The parent selector, &, is a special selector invented by Sass that’s used in nested selectors to refer to the outer selector. It makes it possible to re-use the outer selector in more complex ways, like adding a pseudo-class or adding a selector before the parent.

When a parent selector is used in an inner selector, it’s replaced with the corresponding outer selector. This happens instead of the normal nesting behavior.

::: code-group

```scss [SCSS]
.alert {
  // The parent selector can be used to add pseudo-classes to the outer
  // selector.
  &:hover {
    font-weight: bold;
  }

  // It can also be used to style the outer selector in a certain context, such
  // as a body set to use a right-to-left language.
  [dir=rtl] & {
    margin-left: 0;
    margin-right: 10px;
  }

  // You can even use it as an argument to pseudo-class selectors.
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

⚠️ Heads up!

Because the parent selector could be replaced by a type selector like h1, it’s only allowed at the beginning of compound selectors where a type selector would also be allowed. For example, span& is not allowed.

We’re looking into loosening this restriction, though. If you’d like to help make that happen, check out this GitHub issue.

:::

### Adding Suffixes permalinkAdding Suffixes

You can also use the parent selector to add extra suffixes to the outer selector. This is particularly useful when using a methodology like BEM that uses highly structured class names. As long as the outer selector ends with an alphanumeric name (like class, ID, and element selectors), you can use the parent selector to append additional text.

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

### In SassScript

The parent selector can also be used within SassScript. It’s a special expression that returns the current parent selector in the same format used by selector functions: a comma-separated list (the selector list) that contains space-separated lists (the complex selectors) that contain unquoted strings (the compound selectors).

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

If the & expression is used outside any style rules, it returns null. Since null is falsey, this means you can easily use it to determine whether a mixin is being called in a style rule or not.

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

#### Advanced Nesting

You can use & as a normal SassScript expression, which means you can pass it to functions or include it in interpolation—even in other selectors! Using it in combination with selector functions and the @at-root rule allows you to nest selectors in very powerful ways.

For example, suppose you want to write a selector that matches the outer selector and an element selector. You could write a mixin like this one that uses the selector.unify() function to combine & with a user’s selector.

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

⚠️ Heads up!

When Sass is nesting selectors, it doesn’t know what interpolation was used to generate them. This means it will automatically add the outer selector to the inner selector even if you used & as a SassScript expression. That’s why you need to explicitly use the @at-root rule to tell Sass not to include the outer selector.

:::

## Placeholder Selectors

Sass has a special kind of selector known as a “placeholder”. It looks and acts a lot like a class selector, but it starts with a % and it's not included in the CSS output. In fact, any complex selector (the ones between the commas) that even contains a placeholder selector isn't included in the CSS, nor is any style rule whose selectors all contain placeholders.

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

What’s the use of a selector that isn’t emitted? It can still be extended! Unlike class selectors, placeholders don’t clutter up the CSS if they aren’t extended and they don’t mandate that users of a library use specific class names for their HTML.

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

Placeholder selectors are useful when writing a Sass library where each style rule may or may not be used. As a rule of thumb, if you’re writing a stylesheet just for your own app, it’s often better to just extend a class selector if one is available.