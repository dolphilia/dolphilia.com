# シンタックス

## Overview

Sass supports two different syntaxes. Each one can load the other, so it's up to you and your team which one to choose.

### SCSS

The SCSS syntax uses the file extension .scss. With a few small exceptions, it’s a superset of CSS, which means essentially all valid CSS is valid SCSS as well. Because of its similarity to CSS, it’s the easiest syntax to get used to and the most popular.

SCSS looks like this:

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

### The Indented Syntax

The indented syntax was Sass’s original syntax, and so it uses the file extension .sass. Because of this extension, it’s sometimes just called “Sass”. The indented syntax supports all the same features as SCSS, but it uses indentation instead of curly braces and semicolons to describe the format of the document.

In general, any time you’d write curly braces in CSS or SCSS, you can just indent one level deeper in the indented syntax. And any time a line ends, that counts as a semicolon. There are also a few additional differences in the indented syntax that are noted throughout the reference.

::: warning

⚠️ Heads up!

The indented syntax currently doesn’t support expressions that wrap across multiple lines. See issue #216.

:::

The indented syntax looks like this:

```scss
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

## Parsing a Stylesheet

A Sass stylesheet is parsed from a sequence of Unicode code points. It's parsed directly, without first being converted to a token stream.

### Input Encoding

Compatibility:

- Dart Sass: ✗
- LibSass: ✓
- Ruby Sass: ✓
- ▶

It’s often the case that a document is initially available only as a sequence of bytes, which must be decoded into Unicode. Sass performs this decoding as follows:

- If the sequence of bytes begins with the UTF-8 or UTF-16 encoding of U+FEFF BYTE ORDER MARK, the corresponding encoding is used.
- If the sequence of bytes begins with the plain ASCII string @charset, Sass determines the encoding using step 2 of the CSS algorithm for determining the fallback encoding.
- Otherwise, UTF-8 is used.

### Parse Errors

When Sass encounters invalid syntax in a stylesheet, parsing will fail and an error will be presented to the user with information about the location of the invalid syntax and the reason it was invalid.

Note that this is different than CSS, which specifies how to recover from most errors rather than failing immediately. This is one of the few cases where SCSS isn’t strictly a superset of CSS. However, it’s much more useful to Sass users to see errors immediately, rather than having them passed through to the CSS output.

The location of parse errors can be accessed through implementation-specific APIs. For example, in Dart Sass you can access SassException.span, and in Node Sass’s and Dart Sass’s JS API you can access the file, line, and column properties.

## Structure of a Stylesheet

Just like CSS, most Sass stylesheets are mainly made up of style rules that contain property declarations. But Sass stylesheets have many more features that can exist alongside these.

### Statements

A Sass stylesheet is made up of a series of statements, which are evaluated in order to build the resulting CSS. Some statements may have blocks, defined using { and }, which contain other statements. For example, a style rule is a statement with a block. That block contains other statements, such as property declarations.

In SCSS, statements are separated by semicolons (which are optional if the statement uses a block). In the indented syntax, they’re just separated by newlines.

#### Universal Statements

These types of statements can be used anywhere in a Sass stylesheet:

- Variable declarations, like $var: value.
- Flow control at-rules, like @if and @each.
- The @error, @warn, and @debug rules.

#### CSS Statements

These statements produce CSS. They can be used anywhere except within a @function:

- Style rules, like h1 { /* ... */ }.
- CSS at-rules, like @media and @font-face.
- Mixin uses using @include.
- The @at-root rule.

#### Top-Level Statements

These statements can only be used at the top level of a stylesheet, or nested within a CSS statement at the top level:

- Module loads, using @use.
- Imports, using @import.
- Mixin definitions using @mixin.
- Function definitions using @function.

#### Other Statements

Property declarations like width: 100px may only be used within style rules and some CSS at-rules.
The @extend rule may only be used within style rules.

### Expressions

An expression is anything that goes on the right-hand side of a property or variable declaration. Each expression produces a value. Any valid CSS property value is also a Sass expression, but Sass expressions are much more powerful than plain CSS values. They’re passed as arguments to mixins and functions, used for control flow with the @if rule, and manipulated using arithmetic. We call Sass’s expression syntax SassScript.

#### Literals

The simplest expressions just represent static values:

- Numbers, which may or may not have units, like 12 or 100px.
- Strings, which may or may not have quotes, like "Helvetica Neue" or bold.
- Colors, which can be referred to by their hex representation or by name, like #c6538c or blue.
- The boolean literals true or false.
- The singleton null.
- Lists of values, which may be separated by spaces or commas and which may be enclosed in square brackets or no brackets at all, like 1.5em 1em 0 2em, Helvetica, Arial, sans-serif, or [col1-start].
- Maps that associate values with keys, like ("background": red, "foreground": pink).

#### Operations

Sass defines syntax for a number of operations:

- == and != are used to check if two values are the same.
- +, -, *, /, and % have their usual mathematical meaning for numbers, with special behaviors for units that matches the use of units in scientific math.
- <, <=, >, and >= check whether two numbers are greater or less than one another.
- and, or, and not have the usual boolean behavior. Sass considers every value “true” except for false and null.
- +, -, and / can be used to concatenate strings.
- ( and ) can be used to explicitly control the precedence order of operations.

#### Other Expressions

- Variables, like $var.
- Function calls, like nth($list, 1) or var(--main-bg-color), which may call Sass core library functions or user-defined functions, or which may be compiled directly to CSS.
- Special functions, like calc(1px + 100%) or url(http://myapp.com/assets/logo.png), that have their own unique parsing rules.
- The parent selector, &.
- The value !important, which is parsed as an unquoted string.

## Comments

The way Sass comments work differs substantially between SCSS and the indented syntax. Both syntaxes support two types of comments: comments defined using /* */ that are (usually) compiled to CSS, and comments defined using // that are not.

### In SCSS

Comments in SCSS work similarly to comments in other languages like JavaScript. Single-line comments start with //, and go until the end of the line. Nothing in a single-line comment is emitted as CSS; as far as Sass is concerned, they may as well not exist. They’re also called silent comments, because they don’t produce any CSS.

Multi-line comments start with /* and end at the next */. If a multi-line comment is written somewhere that a statement is allowed, it’s compiled to a CSS comment. They’re also called loud comment, by contrast with silent comments. A multi-line comment that’s compiled to CSS may contain interpolation, which will be evaluated before the comment is compiled.

By default, multi-line comments be stripped from the compiled CSS in compressed mode. If a comment begins with /*!, though, it will always be included in the CSS output.

::: code-group

```scss [SCSS]
// This comment won't be included in the CSS.

/* But this comment will, except in compressed mode. */

/* It can also contain interpolation:
 * 1 + 1 = #{1 + 1} */

/*! This comment will be included even in compressed mode. */

p /* Multi-line comments can be written anywhere
   * whitespace is allowed. */ .sans {
  font: Helvetica, // So can single-line comments.
        sans-serif;
}
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

### In Sass

Comments in the indented syntax work a little differently: they’re indentation-based, just like the rest of the syntax. Like SCSS, silent comments written with // are never emitted as CSS, but unlike SCSS everything indented beneath the opening // is also commented out.

Indented syntax comments that start with /* work with indentation the same way, except that they are compiled to CSS. Because the extend of the comment is based on indentation, the closing */ is optional. Also like SCSS, /* comments can contain interpolation and can start with /*! to avoid being stripped in compressed mode.

Comments can also be used within expressions in the indented syntax. In this case, they have exactly the same syntax as they do in SCSS.

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

### Documentation Comments

When writing style libraries using Sass, you can use comments to document the mixins, functions, variables, and placeholder selectors that your library provides, as well as the library itself. These are comments are read by the SassDoc tool, which uses them to generate beautiful documentation. Check out the Susy grid engine’s documentation to see it in action!

Documentation comments are silent comments, written with three slashes (///) directly above the thing you’re documenting. SassDoc parses text in the comments as Markdown, and supports many useful annotations to describe it in detail.

SCSS

```scss
/// Computes an exponent.
///
/// @param {number} $base
///   The number to multiply by itself.
/// @param {integer (unitless)} $exponent
///   The number of `$base`s to multiply together.
/// @return {number} `$base` to the power of `$exponent`.
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}
```

## Special Functions

CSS defines many functions, and most of them work just fine with Sass’s normal function syntax. They’re parsed as function calls, resolved to plain CSS functions, and compiled as-is to CSS. There are a few exceptions, though, which have special syntax that can’t just be parsed as a SassScript expression. All special function calls return unquoted strings.

## url()

The url() function is commonly used in CSS, but its syntax is different than other functions: it can take either a quoted or unquoted URL. Because an unquoted URL isn’t a valid SassScript expression, Sass needs special logic to parse it.

If the url()‘s argument is a valid unquoted URL, Sass parses it as-is, although interpolation may also be used to inject SassScript values. If it’s not a valid unquoted URL—for example, if it contains variables or function calls—it’s parsed as a normal plain CSS function call.

::: code-group

```scss [SCSS]
$roboto-font-path: "../fonts/roboto";

@font-face {
    // This is parsed as a normal function call that takes a quoted string.
    src: url("#{$roboto-font-path}/Roboto-Thin.woff2") format("woff2");

    font-family: "Roboto";
    font-weight: 100;
}

@font-face {
    // This is parsed as a normal function call that takes an arithmetic
    // expression.
    src: url($roboto-font-path + "/Roboto-Light.woff2") format("woff2");

    font-family: "Roboto";
    font-weight: 300;
}

@font-face {
    // This is parsed as an interpolated special function.
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

Compatibility (calc()):

- Dart Sass: since <1.40.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

Compatibility (clamp()):

- Dart Sass: since >=1.31.0 <1.40.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

The element() function is defined in the CSS spec, and because its IDs could be parsed as colors, they need special parsing.

expression() and functions beginning with progid: are legacy Internet Explorer features that use non-standard syntax. Although they’re no longer supported by recent browsers, Sass continues to parse them for backwards compatibility.

Sass allows any text in these function calls, including nested parentheses. Nothing is interpreted as a SassScript expression, with the exception that interpolation can be used to inject dynamic values.

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