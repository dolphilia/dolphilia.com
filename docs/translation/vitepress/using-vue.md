# MarkdownでVueを使用する

VitePressでは、各マークダウンファイルはHTMLにコンパイルされ、Vue Single-File Componentとして処理されます。つまり、マークダウン内で動的テンプレート、Vueコンポーネントの使用、または`<script>`タグを追加することによる任意のページ内Vueコンポーネントロジックなど、あらゆるVue機能を使用することができます。

また、VitePressはVue 3のコンパイラを利用して、マークダウンの純粋に静的な部分を自動的に検出し、最適化することも重要なポイントです。静的なコンテンツは単一のプレースホルダーノードに最適化され、ページのJavaScriptペイロードから排除されます。また、クライアントサイドのハイドレーションでもスキップされます。要するに、どのページでも、動的な部分に対してのみ支払いが発生するのです。

## Templating

## 補間

各Markdownファイルは、まずHTMLにコンパイルされ、その後VueコンポーネントとしてViteのプロセスパイプラインに渡されます。つまり、テキストにVueスタイルの補間が使えるということです。

Input

```md
{{ 1 + 1 }}
```

Output

```
2
```

### ディレクティブ

ディレクティブも有効です。

Input

```html
<span v-for="i in 3">{{ i }}</span>
```

Output

```
1 2 3 
```

### サイト・ページデータへのアクセス

useDataヘルパーを`<script>`ブロック内で使用し、データをページに公開することができます。

Input

```html
<script setup>
import { useData } from 'vitepress'

const { page } = useData()
</script>

<pre>{{ page }}</pre>
```

Output

```json
{
  "path": "/using-vue.html",
  "title": "Using Vue in Markdown",
  "frontmatter": {}
}
```

### エスケープ

デフォルトでは、フェンスで囲まれたコードブロックは、自動的にv-preでラップされます。インラインのコード・スニペットやプレーン・テキストの中に生のヒゲやVue固有の構文を表示するには、v-preカスタム・コンテナで段落をラップする必要があります。

Input

```md
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

Output

```
{{ This will be displayed as-is }}
```

## コンポーネントの使用

より柔軟性が必要な場合、VitePressは独自のVue Componentsでオーサリングツールボックスを拡張することができます。

### マークダウンでコンポーネントをインポートする

コンポーネントの使用箇所が少ない場合は、使用するファイル内でコンポーネントをインポートする方法が推奨されます。

```md
<script setup>
import CustomComponent from '../components/CustomComponent.vue'
</script>

# Docs

This is a .md using a custom component

<CustomComponent />

## More docs

...
```

### テーマへのグローバルコンポーネントの登録

もしコンポーネントがdocsの複数のページにわたって使用されるのであれば、テーマにグローバルに登録することができます（または、VitePressのデフォルトテーマを拡張する一環として登録できます）。詳細については、テーマガイドをご覧ください。

.vitepress/theme/index.jsでは、enhanceApp関数がVueアプリのインスタンスを受け取るので、通常のVueアプリで行うようにコンポーネントを登録することができます。

```js
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx)
    ctx.app.component('VueClickAwayExample', VueClickAwayExample)
  }
}
```

マークダウンファイルの後半では、コンポーネントをコンテンツの間に挟み込むことができます。

```md
# Vue Click Away

<VueClickAwayExample />
```

> 重要: カスタムコンポーネントの名前にハイフンが含まれているか、PascalCase であることを確認してください。さもなければ、インライン要素として扱われ、 `<p>` タグで囲まれます。これは、 `<p>` がその中にブロック要素を置くことを許さないため、水和の不一致につながります。

### ヘッダーでコンポーネントを使用する ⚡

Vueのコンポーネントをヘッダで使用することができますが、以下の構文の違いに注意してください。

|      Markdown       |                Output HTML                | Parsed Header |
| ------------------- | ----------------------------------------- | ------------- |
| # text `<Tag/>`     | `<h1>text <Tag/></h1>`                    | text          |
| # text \``<Tag/>`\` | `<h1>text <code>&lt;Tag/&gt;</code></h1>` | `text <Tag/>` |

`<code>` でラップされたHTMLはそのまま表示され、ラップされていないHTMLのみがVueによってパースされます。

> ヒント: 出力されたHTMLはmarkdown-itによって実現され、解析されたヘッダーはVitePressによって処理されます（そしてサイドバーと文書タイトルの両方に使用されます）。

## CSSプリプロセッサーを利用する

VitePressは、CSSプリプロセッサー（.scss, .sass, .less, .styl, .stylusファイル）をビルトインでサポートしています。Vite特有のプラグインをインストールする必要はありませんが、対応するプリプロセッサー自体をインストールする必要があります。

```
# .scss and .sass
npm install -D sass

# .less
npm install -D less

# .styl and .stylus
npm install -D stylus
```

そして、Markdownやテーマのコンポーネントで以下のように使用することができます。

```vue
<style lang="sass">
.title
  font-size: 20px
</style>
```

## スクリプト＆スタイル ホイスティング

時々、いくつかのJavaScriptまたはCSSを現在のページのみに適用する必要がある場合があります。そのような場合、Markdownファイルに直接ルートレベルの `<script>` または `<style>` ブロックを記述することができます。これらはコンパイルされたHTMLからホイストされ、結果として得られるVueの単一ファイルコンポーネントの `<script>` および `<style>` ブロックとして使用されます。

これは、インラインスクリプトでレンダリングされ、インラインCSSでスタイルされます。

## 組み込みコンポーネント

VitePressは、ClientOnlyやOutboundLinkのようなVueの組み込みコンポーネントを提供しています。詳細については、グローバルコンポーネントガイドをご覧ください。

また、こちらもご覧ください。

- ヘッダーでコンポーネントを使用する

## ブラウザAPIアクセス制限

VitePressアプリケーションは、静的ビルドを生成する際にNode.jsでサーバーレンダリングされるため、Vueの使用はユニバーサルコード要件に準拠する必要があります。つまり、Browser / DOM APIへのアクセスは、beforeMountまたはmountされたフックに限定するようにしてください。

SSRフレンドリーでないコンポーネント（例えば、カスタムディレクティブを含む）を使用またはデモする場合は、組み込みの `<ClientOnly>` コンポーネントの中にそれらをラップすることができます。

```md
<ClientOnly>
  <NonSSRFriendlyComponent />
</ClientOnly>
```

これは、インポート時にブラウザAPIにアクセスするコンポーネントやライブラリを修正するものではないことに注意してください。インポート時にブラウザ環境を仮定するコードを使用するには、適切なライフサイクルフックでそれらを動的にインポートする必要があります。

```vue
<script>
export default {
  mounted() {
    import('./lib-that-access-window-on-import').then((module) => {
      // use code
    })
  }
}
</script>
```

モジュールエクスポートのデフォルトがVueコンポーネントであれば、動的に登録することができます。

```vue
<template>
  <component
    v-if="dynamicComponent"
    :is="dynamicComponent">
  </component>
</template>

<script>
export default {
  data() {
    return {
      dynamicComponent: null
    }
  },

  mounted() {
    import('./lib-that-access-window-on-import').then((module) => {
      this.dynamicComponent = module.default
    })
  }
}
</script>
```

こちらもご覧ください。

- Vue.js > Dynamic Components