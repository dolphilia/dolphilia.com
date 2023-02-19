# Variables

Sass variables are simple: you assign a value to a name that begins with $, and then you can refer to that name instead of the value itself. But despite their simplicity, they're one of the most useful tools Sass brings to the table. Variables make it possible to reduce repetition, do complex math, configure libraries, and much more.

A variable declaration looks a lot like a property declaration: it’s written `<variable>: <expression>`. Unlike a property, which can only be declared in a style rule or at-rule, variables can be declared anywhere you want. To use a variable, just include it in a value.

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

⚠️ Heads up!

CSS has variables of its own, which are totally different than Sass variables. Know the differences!

- Sass variables are all compiled away by Sass. CSS variables are included in the CSS output.
- CSS variables can have different values for different elements, but Sass variables only have one value at a time.
- Sass variables are imperative, which means if you use a variable and then change its value, the earlier use will stay the same. CSS variables are declarative, which means if you change the value, it’ll affect both earlier uses and later uses.

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

💡 Fun fact:

Sass variables, like all Sass identifiers, treat hyphens and underscores as identical. This means that $font-size and $font_size both refer to the same variable. This is a historical holdover from the very early days of Sass, when it only allowed underscores in identifier names. Once Sass added support for hyphens to match CSS’s syntax, the two were made equivalent to make migration easier.

:::


## Default Values permalinkDefault Values

Normally when you assign a value to a variable, if that variable already had a value, its old value is overwritten. But if you’re writing a Sass library, you might want to allow your users to configure your library’s variables before you use them to generate CSS.

To make this possible, Sass provides the !default flag. This assigns a value to a variable only if that variable isn’t defined or its value is null. Otherwise, the existing value will be used.

Configuring Modules permalinkConfiguring Modules

Compatibility:

- Dart Sass: since 1.23.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

Variables defined with !default can be configured when loading a module with the @use rule. Sass libraries often use !default variables to allow their users to configure the library’s CSS.

To load a module with configuration, write @use `<url>` with `(<variable>: <value>, <variable>: <value>)`. The configured values will override the variables’ default values. Only variables written at the top level of the stylesheet with a !default flag can be configured.

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


## Built-in Variables

Variables that are defined by a built-in module cannot be modified.

```scss [SCSS]
@use "sass:math" as math;

// This assignment will fail.
math.$pi: 0;
```

## Scope

Variables declared at the top level of a stylesheet are global. This means that they can be accessed anywhere in their module after they’ve been declared. But that’s not true for all variables. Those declared in blocks (curly braces in SCSS or indented code in Sass) are usually local, and can only be accessed within the block they were declared.

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

  // This would fail, because $local-variable isn't in scope:
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


### Shadowing

Local variables can even be declared with the same name as a global variable. If this happens, there are actually two different variables with the same name: one local and one global. This helps ensure that an author writing a local variable doesn’t accidentally change the value of a global variable they aren’t even aware of.

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

If you need to set a global variable’s value from within a local scope (such as in a mixin), you can use the !global flag. A variable declaration flagged as !global will always assign to the global scope.

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

⚠️ Heads up!

Compatibility:

- Dart Sass: since 2.0.0
- LibSass: ✗
- Ruby Sass: ✗
- ▶

The !global flag may only be used to set a variable that has already been declared at the top level of a file. It may not be used to declare a new variable.

:::

### Flow Control Scope

Variables declared in flow control rules have special scoping rules: they don’t shadow variables at the same level as the flow control rule. Instead, they just assign to those variables. This makes it much easier to conditionally assign a value to a variable, or build up a value as part of a loop.

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

⚠️ Heads up!

Variables in flow control scope can assign to existing variables in the outer scope, but they can’t declare new variables there. Make sure the variable is already declared before you assign to it, even if you need to declare it as null.

:::


## Advanced Variable Functions permalinkAdvanced Variable Functions

The Sass core library provides a couple advanced functions for working with variables. The meta.variable-exists() function returns whether a variable with the given name exists in the current scope, and the meta.global-variable-exists() function does the same but only for the global scope.

::: warning

⚠️ Heads up!

Users occasionally want to use interpolation to define a variable name based on another variable. Sass doesn’t allow this, because it makes it much harder to tell at a glance which variables are defined where. What you can do, though, is define a map from names to values that you can then access using variables.

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