# APIリファレンス

VitePressは、アプリのデータにアクセスするためのいくつかのAPIを内蔵しています。また、VitePressにはグローバルに利用できるいくつかの組み込みコンポーネントがあります。

ヘルパーメソッドはvitepressからグローバルにインポート可能で、通常、カスタムテーマのVueコンポーネントで使用されます。しかし、マークダウンファイルはVueの単一ファイルコンポーネントにコンパイルされるため、.mdページ内でも使用可能です。

use*で始まるメソッドは、Vue 3 Composition API関数であることを示し、setup()または `<script setup>`の内部でのみ使用可能です。

## useData

ページ固有のデータを返す。返されるオブジェクトの型は以下の通りです。

```ts
interface VitePressData {
  site: Ref<SiteData>
  page: Ref<PageData>
  theme: Ref<any> // themeConfig from .vitepress/config.js
  frontmatter: Ref<PageData['frontmatter']>
  lang: Ref<string>
  title: Ref<string>
  description: Ref<string>
  localePath: Ref<string>
  isDark: Ref<boolean>
}
```

例:

```vue
<script setup>
import { useData } from 'vitepress'

const { theme } = useData()
</script>

<template>
  <h1>{{ theme.footer.copyright }}</h1>
</template>
```

## useRoute

現在のルートオブジェクトを、以下のタイプで返します。

```ts
interface Route {
  path: string
  data: PageData
  component: Component | null
}
```

## useRouter

プログラムによって別のページに移動できるように、VitePressルータのインスタンスを返します。

```ts
interface Router {
  route: Route
  go: (href?: string) => Promise<void>
}
```

## withBase

- Type: (path: string) => string

指定されたURLのパスに設定されたベースを追加します。Base URL も参照してください。

## `<Content />`

`<Content />` コンポーネントはレンダリングされたマークダウンコンテンツを表示します。独自のテーマを作成する際に便利です。

```vue
<template>
  <h1>Custom Layout!</h1>
  <Content />
</template>
```

## `<ClientOnly />`

`<ClientOnly />` コンポーネントは、クライアント側でのみスロットをレンダリングします。

VitePressアプリケーションは、静的ビルドを生成する際にNode.jsでサーバーレンダリングされるため、Vueの使用はユニバーサルコード要件に準拠する必要があります。つまり、Browser / DOM APIへのアクセスは、beforeMountまたはmountされたフックに限定するようにしてください。

SSRフレンドリーでないコンポーネント（たとえば、カスタムディレクティブを含む）を使用またはデモする場合は、ClientOnlyコンポーネント内にそれらをラップすることができます。

```template
<ClientOnly>
  <NonSSRFriendlyComponent />
</ClientOnly>
```