# Home Page

VitePressのデフォルトテーマには、本サイトのトップページでも使用しているホームページレイアウトがあります。フロントマターで layout: home を指定すれば、どのページでも使用することができます。

```yaml
---
layout: home
---
```

しかし、このオプションだけでは、あまり効果がありません。ヒーローやフィーチャーなど、他のオプションを追加設定することで、ホームページにいくつかの異なるテンプレート化された「セクション」を追加することができます。

## Heroセクション

Heroセクションは、トップページの最上部に表示されます。ここでは、Heroセクションの設定方法について説明します。

```yaml
---
layout: home

hero:
  name: VitePress
  text: Vite & Vue powered static site generator.
  tagline: Lorem ipsum...
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /guide/what-is-vitepress
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress
---
```

```ts
interface Hero {
  // text`の先頭に表示される文字列。ブランドカラーを持ち、製品名などの短い文字列が想定される。
  name?: string

  // ヒーローセクションのメインテキストです。これは `h1` タグとして定義されます。
  text: string

  // `text`の下に表示されるタグライン。
  tagline?: string

  // ホームヒーローセクションに表示するアクションボタン。
  actions?: HeroAction[]
}

interface HeroAction {
  // ボタンのカラーテーマ。デフォルトは `brand` です。
  theme?: 'brand' | 'alt'

  // ボタンのラベルです。
  text: string

  // ボタンのリンク先
  link: string
}
```

### ネームカラーのカスタマイズ

VitePressは、ブランドカラー（--vp-c-brand）を名前に使用します。しかし、この色は --vp-home-hero-name-color 変数をオーバーライドすることでカスタマイズすることができます。

```css
:root {
  --vp-home-hero-name-color: blue;
}
```

また、--vp-home-hero-name-background を組み合わせて、名前の色をグラデーションにすることで、さらにカスタマイズすることができます。

```css
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
```

## 機能セクション

機能セクションでは、Heroセクションの直後に表示したい機能をいくつでもリストアップすることができます。これを設定するには、featuresオプションをfrontmatterに渡します。

```yaml
---
layout: home

features:
  - icon: ⚡️
    title: Vite, The DX that can't be beat
    details: Lorem ipsum...
  - icon: 🖖
    title: Power of Vue meets Markdown
    details: Lorem ipsum...
  - icon: 🛠️
    title: Simple and minimal, always
    details: Lorem ipsum...
---
```

```ts
interface Feature {
  // 各機能のボックスにアイコンを表示します。現在、絵文字のみ対応しています。
  icon?: string

  // 特集のタイトルです。
  title: string

  // 特集の詳細です。
  details: string

  // 機能コンポーネントをクリックしたときのリンク。リンクは、内部または外部のどちらでも可能です。例：`guide/them-home-page` や `htttps://example.com` など。
  link?: string

  // 機能コンポーネントの中に表示されるリンクテキスト。`link` オプションと一緒に使用するのがベスト。例：`詳細`、`ページを見る`など。
  linkText?: string
}
```