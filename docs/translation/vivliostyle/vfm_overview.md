# Vivliostyle Flavored Markdown 概要

Vivliostyle Flavored Markdown (VFM) は、ブックオーサリングに最適化されたMarkdownシンタックスです。Vivliostyleとその兄弟プロジェクトのために標準化され、公開されています。

[[TOC]]

## インストール

```bash
npm install -g @vivliostyle/vfm
```

## 使い方

```bash
vfm --help
vfm README.md
echo "# Hello" | vfm
```

### `vivliostyle` コマンドでの使用法

```bash
npm i -g @vivliostyle/cli
vfm README.md --style https://raw.githubusercontent.com/jagat-xpub/cosmology/gh-pages/css/scholarly.css > book.html
vivliostyle build book.html -s A4
```

## API

```bash
npm install --save @vivliostyle/vfm
# or
yarn add @vivliostyle/vfm
```

```js
import { stringify } from '@vivliostyle/vfm';

console.log(
  stringify(`
# はじめに

{Vivliostyle|ビブリオスタイル}の世界へようこそ。
`),
);
```

このスニペットは生成されます:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>はじめに</title>
  </head>
  <body>
    <h1>はじめに</h1>
    <p>
      <ruby>Vivliostyle<rt>ビブリオスタイル</rt></ruby
      >の世界へようこそ。
    </p>
  </body>
</html>
```

### オプション

#### `style` (default: `undefined`)

指定された値を `<link rel="stylesheet">` の `href` 属性として設定します。

```js
stringify('# Hello', { style: 'https://example.com/book.css' });
```

生成:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://example.com/book.css" />
  </head>
  <body>
    <p><h1>Hello</h1></p>
  </body>
</html>
```

`style` には、スタイルの配列を指定することができます。

```js
stringify('# Hello', {
  style: ['https://example.com/book.css', 'https://example.com/extra.css'],
});
```

生成:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://example.com/book.css" />
    <link rel="stylesheet" href="https://example.com/extra.css" />
  </head>
  <body>
    <p><h1>Hello</h1></p>
  </body>
</html>
```

#### `partial` (default: `false`)

`true` を指定すると、`<body>` で定義された HTML のみが出力される。

```js
stringify('# Hello', { partial: true });
```

生成:

```html
<p><h1>Hello</h1></p>
```

#### `title` (default: `undefined`)

Set the specified value as the text of `<title>`.

```js
stringify('# Hello', { title: 'Hello' });
```

生成:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Hello</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <p><h1>Hello</h1></p>
  </body>
</html>
```

#### `language` (default: `undefined`)

指定された値を `<html>` の `lang` 属性として設定する。

```js
stringify('# Hello', { language: 'ja' });
```

生成:

```html
<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <p><h1>Hello</h1></p>
  </body>
</html>
```

#### `hardLineBreaks` (default: `false`)

改行を `<br>` に変換する。

```js
stringify(
  `
new
line
`,
  { hardLineBreaks: true },
);
```

生成:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <p>
      new<br />
      line
    </p>
  </body>
</html>
```

#### `disableFormatHtml` (default: `false`)

HTMLの自動整形を無効にする。開発時やデバッグ時に非正規のHTMLが必要な場合は、明示的にtrueを指定します。

```js
stringify(
  `text`,
  { disableFormatHtml: true },
);
```

生成:

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
<p>text</p>
</body>
</html>
```

#### `math` (default: `true`)

数学の構文を処理する。デフォルト値は `true` で、これは有効である。

```js
stringify(
  `$x = y$`
);
```

生成:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML"></script>
  </head>
  <body data-math-typeset="true">
    <p><span class="math inline">\(x = y\)</span></p>
  </body>
</html>
```

明示的に無効にするには、このオプションに `false` を、MarkdownのFrontmatterには `math: false` を指定してください。

```js
stringify(
  `$x = y$`,
  { math: false }
);
```

生成:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <p>$x = y$</p>
  </body>
</html>
```

### 高度な使用方法

#### ユニファイドプロセッサー

```js
import { VFM } from '@vivliostyle/vfm';

const processor = VFM({ partial: true });
const html = processor.processSync('# Hello').toString();
```

#### ユニファイドプラグイン

```js
import unified from 'unified';
import vfm from '@vivliostyle/vfm/lib/revive-parse';
import html from '@vivliostyle/vfm/lib/revive-rehype';

function main() {
  unified()
    .use(vfm)
    .use(customRemarkPlugin)
    .use(html)
    .use(customRehypePlugin)
    .processSync('# Hello');
}
```

#### readMetadata

Markdownのフロントマターからメタデータを読み込む。

Markdownのパースやメタデータのタイピング（TypeScript用）はVFM側で行うので、メタデータを取得したいだけの場合に便利です。

`readMetadata(md: string, customKeys: string[]): Metadata`

- params:
  - `md`: `String` Markdownのテキストです。
  - `customKeys`: `String[]` メタ処理で無視されるキー名のコレクション。
- returns:
  - `metadata`: `Metadata` メタデータです。

```js
import { readMetadata } from '@vivliostyle/vfm'

const md = `---
id: 'my-page'
lang: 'en'
dir: 'ltr'
class: 'my-class'
title: 'Title'
vfm:
  math: false
  theme: 'sample.css'
---
`;

const metadata = readMetadata(md);
console.log(metadata);
```

メタデータの詳細については、[VFM](https://vivliostyle.github.io/vfm/#/vfm)の「Frontmatter」またはTypeScriptの型情報を参照してください。

**`customKeys`について**

サードパーティツールでカスタムメタデータを追加する場合に使用します。

VFMとして定義されていないキーは `meta` として扱われる。customKeys` にキー名を指定すると、キーとそのデータ型が保存され、`meta` ではなく `custom` に格納される。

```js
import { readMetadata } from '@vivliostyle/vfm'

const md = `---
title: 'Title'
tags: ['foo', 'bar']
---
`;

const metadata = readMetadata(md, ['tags']);
console.log(metadata);
```

結果:

```js
{
  title: 'title',
  custom: {
    tags: ['foo', 'bar']
  }
}
```

`tag`は `meta` の代わりに `custom` に格納され、構造を保持する。

`title` のようなデフォルトのキーを指定した場合は、 `custom` として処理される。

#### ユーザー指定のメタデータ

メタデータは `stringify` に指定することができ、この指定は Frontmatter よりも優先される。

以下のような使い方を想定している。

- Frontmatter 以外のメタデータを利用する
- `readMetadata` で取得した Frontmatter のメタデータを処理する。

```js
stringify(
  '# Title',
  {},
  { title: 'My Page', body: [{ name: 'id', value: 'page' }] },
);
```

HTML:

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body id="page">
    <section id="title" class="level1">
      <h1>Title</h1>
    </section>
  </body>
</html>
```

## スペック

[現在の状況](https://github.com/vivliostyle/vfm/projects/1)

### Principles

1. **オープン**：オープンな議論と膨大なコミュニティからのフィードバックにより、着実に改善していきます。
1. **一貫性**。VFMをパースしてHTMLに変換するためのリファレンス実装を提供し、Vivliostyle以外のプロジェクトがこの構文を目的に使用できるようにします。

### リンク

- [Vivliostyle Flavored Markdown](https://vivliostyle.github.io/vfm/#/vfm)
- [Theme Design Guidelines](https://github.com/vivliostyle/themes/tree/master/DESIGN.md)

## 貢献

We want you to:

- Join [Discussion](https://github.com/vivliostyle/vfm/issues) to improve spec
- Implement [alpha-stage specs](https://github.com/vivliostyle/vfm/issues?q=is%3Aissue+is%3Aopen+label%3Astage%3Aalpha) and send a PR
- Test [beta-stage features](https://github.com/vivliostyle/vfm/issues?q=is%3Aissue+is%3Aopen+label%3Astage%3Abeta) and report a bug

### Maintainers

- [Akabeko](https://github.com/akabekobeko)
- [Yasuaki Uechi](https://github.com/uetchy)