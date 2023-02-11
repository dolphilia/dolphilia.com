# VuePress2

Vueを利用した静的サイトジェネレータ

## シンプリシティ・ファースト

マークダウン中心のプロジェクト構造で、最小限の設定により、執筆に集中することができます。

## Vue-Powered

Vueの開発体験を楽しみ、Vueコンポーネントをmarkdownで使用し、Vueでカスタムテーマを開発する。

## パフォーマンス

VuePressは、ページごとにプリレンダリングされた静的なHTMLを生成し、ページが読み込まれるとSPAとして実行されます。

## テーマ

デフォルトのテーマを提供。また、コミュニティのテーマを選択したり、独自のテーマを作成することも可能です。

## プラグイン

柔軟なプラグインAPIにより、プラグインがあなたのサイトに多くのプラグアンドプレイ機能を提供することができます。

## バンドル

デフォルトのバンドルは Vite ですが、Webpack にも対応しています。お好きな方をお選びください。

# 1、2、3 のように簡単に

PNPM:

```sh
# install in your project
pnpm add -D vuepress@next @vuepress/client@next vue

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
pnpm vuepress dev

# build to static files
pnpm vuepress build
```

YARN:

```sh
# install in your project
yarn add -D vuepress@next

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
yarn vuepress dev

# build to static files
yarn vuepress build
```

NPM:

```sh
# install in your project
npm install -D vuepress@next

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
npx vuepress dev

# build to static files
npx vuepress build
```