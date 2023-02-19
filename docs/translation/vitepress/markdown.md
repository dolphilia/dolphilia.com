# Markdown Extensions

VitePressには、Markdown Extensionsが組み込まれています。

## ヘッダーアンカー

ヘッダーには自動的にアンカーリンクが適用されます。アンカーのレンダリングは `markdown.anchor` オプションで設定することができる。

## リンク

内部リンク、外部リンクともに特別な扱いを受けています。

### 内部リンク

SPAのナビゲーションとして、内部リンクはルーターリンクに変換されます。また、各サブディレクトリに含まれる `index.md` は自動的に `index.html` に変換され、対応する URL は `/` となります。

例えば、次のようなディレクトリ構成があったとします。

```
.
├─ index.md
├─ foo
│  ├─ index.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ index.md
   ├─ three.md
   └─ four.md
```

And providing you are in `foo/one.md`:

```md
[Home](/) <!-- ユーザーをルートの index.md に送ります。 -->
[foo](/foo/) <!-- foo ディレクトリの index.html にユーザーを送る。 -->
[foo heading](./#heading) <!-- foo インデックスファイル内の見出しにユーザーを固定します。 -->
[bar - three](../bar/three) <!-- 拡張子を省略することができます。 -->
[bar - three](../bar/three.md) <!-- .mdを追加することができます。 -->
[bar - four](../bar/four.html) <!-- または、.html を追加してください。 -->
```

### ページサフィックス

ページと内部リンクは、デフォルトで `.html` という接尾辞で生成されます。

### 外部リンク

外部リンクは、自動的に `target="_blank" rel="noreferrer"` を取得します。

- [vuejs.org](https://vuejs.org)
- [VitePress on GitHub](https://github.com/vuejs/vitepress)

## フロントマター

[YAML frontmatter](https://jekyllrb.com/docs/front-matter/)は、そのままサポートされます。

```yaml
---
title: Blogging Like a Hacker
lang: en-US
---
```

このデータは、すべてのカスタムコンポーネントとテーマコンポーネントとともに、ページの残りの部分から利用できるようになります。

詳しくは、Frontmatterをご覧ください。

## GitHubスタイルのテーブル

**Input**

```
| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |
```

**Output**

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

## Emoji :tada:

**Input**

```
:tada: :100:
```

**Output**

:tada: :100:

[全絵文字の一覧](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)があります。

## Table of Contents

**Input**

```
[[toc]]
```

**Output**

[[toc]]

TOCのレンダリングは `markdown.toc` オプションで設定することができます。

## カスタムコンテナ

カスタムコンテナは、タイプ、タイトル、コンテンツによって定義することができます。

### デフォルトのタイトル

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

### カスタムタイトル

コンテナの "type "の直後にテキストを追加することで、カスタムタイトルを設定することができます。

**Input**

````md
::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code
```js
console.log('Hello, VitePress!')
```
:::
````

**Output**

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code
```js
console.log('Hello, VitePress!')
```
:::

### `raw`

これは、VitePressのスタイルとルータの競合を防ぐために使用できる特別なコンテナです。これは、特にコンポーネントライブラリのドキュメントを作成するときに便利です。また、[whyframe](https://whyframe.dev/docs/integrations/vitepress) をチェックすると、より良い分離ができるかもしれません。

**Syntax**

```md
::: raw
Wraps in a <div class="vp-raw">
:::
```

`vp-raw` クラスは、エレメントにも直接使用することができます。スタイル分離は現在オプトインです。

::: details

- Install required deps with your preferred package manager:

  ```sh
  $ yarn add -D postcss postcss-prefix-selector
  ```

- Create a file named `docs/.postcssrc.cjs` and add this to it:

  ```js
  module.exports = {
    plugins: {
      'postcss-prefix-selector': {
        prefix: ':not(:where(.vp-raw *))',
        includeFiles: [/vp-doc\.css/],
        transform(prefix, _selector) {
          const [selector, pseudo = ''] = _selector.split(/(:\S*)$/)
          return selector + prefix + pseudo
        }
      }
    }
  }
  ```

:::

## コードブロックのシンタックスハイライト

VitePressは[Shiki](https://shiki.matsu.io/)を使用して、Markdownコードブロック内の言語シンタックスをカラーテキストでハイライトしています。Shikiは様々なプログラミング言語をサポートしています。必要なことは、コードブロックの最初のバックティックに有効な言語エイリアスを追加することだけです。

**Input**

````
```js
export default {
  name: 'MyComponent',
  // ...
}
```
````

````
```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```
````

**Output**

```js
export default {
  name: 'MyComponent'
  // ...
}
```

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">
    {{ todo.text }}
  </li>
</ul>
```

[有効言語一覧](https://github.com/shikijs/shiki/blob/main/docs/languages.md)は、Shikiのリポジトリで公開されています。

また、アプリの設定でシンタックスハイライトのテーマをカスタマイズすることができます。詳しくは `markdown` オプションを参照してください。

## コードブロックのラインハイライト

**Input**

````
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

1行だけでなく、複数の1行、範囲、またはその両方を指定することも可能です。

- 行の範囲：例えば `{5-8}`, `{3-10}`, `{10-17}`
- Multiple single lines: for example `{4,7,9}`
- Line ranges and single lines: for example `{4,7-13,16,23-27,40}`

**Input**

````
```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum'
    }
  }
}
```
````

**Output**

```js{1,4,6-8}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

また、`// [!code hl]` というコメントを使うことで、その行に直接ハイライトを入れることも可能です。

**Input**

````
```js
export default {
  data () {
    return {
      msg: 'Highlighted!' // [!code  hl]
    }
  }
}
```
````

**Output**

```js
export default {
  data() {
    return {
      msg: 'Highlighted!' // [!code hl]
    }
  }
}
```

## コードブロックにフォーカス

行に `// [!code focus]` というコメントを付けると、その行にフォーカスが当たり、他の部分がぼやけます。

さらに、`// [!code focus:<lines>]` を使って、フォーカスする行数を定義することができます。

**Input**

なお、`!code`の後に必要なスペースは1つだけですが、ここでは処理落ちを防ぐために2つにしています。

````
```js
export default {
  data () {
    return {
      msg: 'Focused!' // [!code  focus]
    }
  }
}
```
````

**Output**

```js
export default {
  data() {
    return {
      msg: 'Focused!' // [!code focus]
    }
  }
}
```

## コードブロックのカラー差分

行に `// [!code --]` または `// [!code ++]` コメントを追加すると、コードブロックの色を維持したまま、その行の diff を作成することができます。

**Input**

なお、`!code`の後に必要なスペースは1つだけですが、ここでは処理落ちを防ぐために2つにしています。

````
```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code  --]
      msg: 'Added' // [!code  ++]
    }
  }
}
```
````

**Output**

```js
export default {
  data () {
    return {
      msg: 'Removed' // [!code --]
      msg: 'Added' // [!code ++]
    }
  }
}
```

## Errors and Warnings in Code Blocks

行に `// [!コード警告]` または `// [!コードエラー]` のコメントを追加すると、それに応じて色がつきます。

**Input**

なお、`!code`の後に必要なスペースは1つだけですが、ここでは処理落ちを防ぐために2つにしています。

````
```js
export default {
  data () {
    return {
      msg: 'Error', // [!code  error]
      msg: 'Warning' // [!code  warning]
    }
  }
}
```
````

**Output**

```js
export default {
  data() {
    return {
      msg: 'Error', // [!code error]
      msg: 'Warning' // [!code warning]
    }
  }
}
```

## ライン番号

設定により、各コードブロックの行番号を有効にすることができます。

```js
export default {
  markdown: {
    lineNumbers: true
  }
}
```

詳しくは `markdown` オプションを参照してください。

フェンスで囲まれたコードブロックに `:line-numbers` / `:no-line-numbers` マークを追加することで、設定で設定した値をオーバーライドすることができます。

**Input**

````md
```ts {1}
// line-numbers is disabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```
````

**Output**

```ts {1}
// line-numbers is disabled by default
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

```ts:line-numbers {1}
// line-numbers is enabled
const line2 = 'This is line 2'
const line3 = 'This is line 3'
```

## Import Code Snippets

以下の構文で、既存のファイルからコードスニペットをインポートすることができます。

```md
<<< @/filepath
```

また、[ラインハイライト](#line-highlighting-in-code-blocks)にも対応しています。

```md
<<< @/filepath{highlightLines}
```

**Input**

```md
<<< @/snippets/snippet.js{2}
```

**Code file**

<<< @/snippets/snippet.js

**Output**

<<< @/snippets/snippet.js{2}

::: tip
値は、ソースルートに対応します。デフォルトでは、`srcDir`が設定されていない限り、VitePressプロジェクトのルートになります。
:::

また、[VS Code region](https://code.visualstudio.com/docs/editor/codebasics#_folding)を使って、コードファイルの対応する部分のみを含めることができます。ファイルパスに続く `#` の後に、カスタムリージョン名を指定することができます。

**Input**

```md
<<< @/snippets/snippet-with-region.js#snippet{1}
```

**Code file**

<<< @/snippets/snippet-with-region.js

**Output**

<<< @/snippets/snippet-with-region.js#snippet{1}

また、次のように中括弧（`{}`）の中に言語を指定することもできます。

```md
<<< @/snippets/snippet.cs{c#}

<!-- with line highlighting: -->

<<< @/snippets/snippet.cs{1,2,4-6 c#}

<!-- with line numbers: -->

<<< @/snippets/snippet.cs{1,2,4-6 c#:line-numbers}
```

これは、ファイルの拡張子からソース言語が推測できない場合に便利です。

## コードグループ

このように、複数のコードブロックをグループ化することができます。

**Input**

````md
::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::
````

**Output**

::: code-group

```js [config.js]
/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
}

export default config
```

```ts [config.ts]
import type { UserConfig } from 'vitepress'

const config: UserConfig = {
  // ...
}

export default config
```

:::

## Markdownファイルのインクルージョン

マークダウン・ファイルを別のマークダウン・ファイルにインクルードすることができます。

**Input**

```md
# Docs

## Basics

<!--@include: ./parts/basics.md-->
```

**Part file** (`parts/basics.md`)

```md
Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

**Equivalent code**

```md
# Docs

## Basics

Some getting started stuff.

### Configuration

Can be created using `.foorc.json`.
```

::: warning
ただし、ファイルが存在しない場合はエラーを出しません。したがって、この機能を使用する場合は、コンテンツが期待通りにレンダリングされることを確認してください。
:::

## アドバンスト・コンフィグレーション

VitePressはMarkdownレンダラとして[markdown-it](https://github.com/markdown-it/markdown-it)を使用しています。上記の拡張機能の多くは、カスタムプラグインによって実装されています。さらに、 `.vitepress/config.js` の `markdown` オプションを使用すると、 `markdown-it` インスタンスをカスタマイズすることができます。

```js
const anchor = require('markdown-it-anchor')

module.exports = {
  markdown: {
    // options for markdown-it-anchor
    // https://github.com/valeriangalliat/markdown-it-anchor#usage
    anchor: {
      permalink: anchor.permalink.headerLink()
    },

    // options for @mdit-vue/plugin-toc
    // https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc#options
    toc: { level: [1, 2] },

    config: (md) => {
      // use more markdown-it plugins!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```

設定可能なプロパティの一覧はConfigsをご覧ください。アプリの設定(Config)