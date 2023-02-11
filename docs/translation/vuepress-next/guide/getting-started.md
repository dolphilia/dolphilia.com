# Getting Started

> warning: VuePress v2は現在`beta`の段階です。サイト構築に使用することは可能ですが、設定やAPIが十分に安定していないため、マイナーリリースの間に壊れるような変更がある可能性があります。そのため、ベータ版をアップグレードする際には、毎回 [changelog](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md)をよく読んでください。

## 前提条件

- [Node.js v14.18.0+](https://nodejs.org/)
- [Yarn v1 classic](https://classic.yarnpkg.com/en/) (Optional)

> tip: 
> - [pnpm](https://pnpm.io/) では、`vue` と `@vuepress/client` を相互依存としてインストールする必要があるかもしれません。例えば、`pnpm add -D vue @vuepress/client@next` です。
> - [yarn 2](https://yarnpkg.com/) では、[`.yarnrc.yml`](https://yarnpkg.com/configuration/yarnrc#nodeLinker) ファイルで `nodeLinker: 'node-modules'` を設定する必要があります。

## マニュアルインストール

このセクションでは、基本的なVuePressのドキュメントサイトを一から構築するのに役立ちます。すでにプロジェクトがあり、その中にドキュメントを保管したい場合は、ステップ3から始めてください。

- **Step 1**: 新しいディレクトリを作成し、そこに変更する

```bash
mkdir vuepress-starter
cd vuepress-starter
```

- **Step 2**: プロジェクトの初期化

PNPM:

```bash
git init
pnpm init
```

YARN:

```bash
git init
yarn init
```

NPM:

```bash
git init
npm init
```


- **Step 3**: VuePressをローカルにインストールする

PNPM:

```bash
pnpm add -D vuepress@next @vuepress/client@next vue
```

YARN:

```bash
yarn add -D vuepress@next
```

NPM:

```bash
npm install -D vuepress@next
```

- **Step 4**: `package.json`にいくつかの[scripts](https://classic.yarnpkg.com/en/docs/package-json#toc-scripts)を追加する。

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

- **Step 5**: デフォルトの temp と cache ディレクトリを `.gitignore` ファイルに追加する。

```bash
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
```

- **Step 6**: 最初のドキュメントを作成する

```bash
mkdir docs
echo '# Hello VuePress' > docs/README.md
```

- **Step 7**: ローカルサーバーでドキュメントサイトを提供する

PNPM:

```bash
pnpm docs:dev
```

YARN:

```bash
yarn docs:dev
```

NPM:

```bash
npm run docs:dev
```

VuePressは、[http://localhost:8080](http://localhost:8080)でホットリロードの開発サーバを起動します。マークダウンファイルを修正すると、ブラウザ上のコンテンツが自動更新されます。

ここまでで、基本的ではありますが、機能的なVuePressのドキュメントサイトができあがったはずです。次は、VuePressの[configuration](./configuration.md)の基本について学びましょう。
