# テーマ紹介

VitePressには、デフォルトで多くの機能を備えたテーマが用意されています。各機能の詳細については、以下の専用ページをご覧ください。

- Nav
- Sidebar
- Prev Next Link
- Edit Link
- Last Updated
- Layout
- Home Page
- Team Page
- Badge
- Footer
- Search
- Carbon Ads

探している機能が見つからない場合や、自分でテーマを作りたい場合は、VitePressをカスタマイズすることができます。以下のセクションでは、VitePressのテーマをカスタマイズする方法について、それぞれ説明していきます。

## カスタムテーマの使用

.vitepress/theme/index.js または .vitepress/theme/index.ts ファイル（「テーマ入力ファイル」）を追加することにより、カスタムテーマを有効にすることができます。

```
.
├─ docs
│  ├─ .vitepress
│  │  ├─ theme
│  │  │  └─ index.js
│  │  └─ config.js
│  └─ index.md
└─ package.json
```

VitePressのカスタムテーマは、4つのプロパティを含むオブジェクトで、以下のように定義されています。

```ts
interface Theme {
  Layout: Component // Vue 3 component
  NotFound?: Component
  enhanceApp?: (ctx: EnhanceAppContext) => void
  setup?: () => void
}

interface EnhanceAppContext {
  app: App // Vue 3 app instance
  router: Router // VitePress router instance
  siteData: Ref<SiteData>
}
```

テーマエントリーファイルは、テーマをそのデフォルトのエクスポートとしてエクスポートする必要があります。

```js
// .vitepress/theme/index.js
import Layout from './Layout.vue'

export default {
  // 各ページを包むルートコンポーネント
  Layout,

  // これはVue 3の機能コンポーネントです
  NotFound: () => 'custom 404',

  enhanceApp({ app, router, siteData }) {
    // app は `createApp()` によるVue 3アプリのインスタンスです。 router はVitePressのカスタムルーターです。siteData` は、現在のサイトレベルのメタデータの `ref` です。
  },

  setup() {
    // この関数は、VitePressAppのセットアップフックの中で実行されます。
  }
}
```

...ここで、Layoutコンポーネントは、次のようになります。

```vue
<!-- .vitepress/theme/Layout.vue -->
<template>
  <h1>Custom Layout!</h1>

  <!-- this is where markdown content will be rendered -->
  <Content />
</template>
```

デフォルトのエクスポートは、カスタム・テーマのための唯一の契約です。カスタムテーマの内部では、通常のVite + Vue 3アプリケーションと同じように動作します。テーマは、SSRと互換性がある必要があることに注意してください。

テーマを配布するには、パッケージエントリでオブジェクトをエクスポートするだけです。外部テーマを消費するには、カスタムテーマのエントリからインポートして再エクスポートします。

```js
// .vitepress/theme/index.js
import Theme from 'awesome-vitepress-theme'

export default Theme
```

## デフォルトテーマの拡張

デフォルトのテーマを拡張してカスタマイズしたい場合は、vitepress/themeからインポートして、カスタムテーマエントリで補強することができます。以下は、一般的なカスタマイズの例です。

### グローバルコンポーネントの登録

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // デフォルトのテーマのカスタム動作を拡張します。
    DefaultTheme.enhanceApp(ctx)

    // カスタムグローバルコンポーネントの登録
    ctx.app.component('MyGlobalComponent' /* ... */)
  }
}
```

今回はViteを使用しているので、Viteのグロブインポート機能を利用して、コンポーネントのディレクトリを自動登録することもできます。

### CSSのカスタマイズ

デフォルトのテーマCSSは、ルートレベルのCSS変数をオーバーライドすることでカスタマイズ可能です。

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

```css
/* .vitepress/theme/custom.css */
:root {
  --vp-c-brand: #646cff;
  --vp-c-brand-light: #747bff;
}
```

オーバーライド可能なデフォルトのテーマCSS変数を参照してください。

### レイアウトスロット

デフォルトテーマの `<Layout/>` コンポーネントにはいくつかのスロットがあり、ページの特定の位置にコンテンツを挿入するために使用できます。以下は、before outlineにコンポーネントを注入する例です。

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyLayout from './MyLayout.vue'

export default {
  ...DefaultTheme,
  // スロットを注入するラッパーコンポーネントでレイアウトをオーバーライドします。
  Layout: MyLayout
}
```

```vue
<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #aside-outline-before>
      My custom sidebar top content
    </template>
  </Layout>
</template>
```

あるいは、レンダー機能も使える。

```js
// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import MyComponent from './MyComponent.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'aside-outline-before': () => h(MyComponent)
    })
  }
}
```

デフォルトのテーマレイアウトで利用可能なスロットの全リストです。

- レイアウトの場合: 'doc'(デフォルト)がfrontmatterを介して有効になっている場合。
  - doc-footer-before
  - doc-before
  - doc-after
  - sidebar-nav-before
  - sidebar-nav-after
  - aside-top
  - aside-bottom
  - aside-outline-before
  - aside-outline-after
  - aside-ads-before
  - aside-ads-after
- レイアウトの場合: 'home' が frontmatter で有効になっている場合。
  - home-hero-before
  - home-hero-after
  - home-features-before
  - home-features-after
- いつもの:
  - layout-top
  - layout-bottom
  - nav-bar-title-before
  - nav-bar-title-after
  - nav-bar-content-before
  - nav-bar-content-after
  - nav-screen-content-before
  - nav-screen-content-after