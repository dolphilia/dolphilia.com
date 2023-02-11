# はじめに

このセクションではVitePressの基本的なドキュメントサイトを一から構築するお手伝いをします。すでにプロジェクトがあり、その中にドキュメントを保管したい場合はステップ2から始めてください。

また、StackBlitzでVitePressをオンラインで試すことができます。これは、ブラウザ上で直接VitePressベースのサイトを実行するため、ローカルセットアップとほとんど同じですが、あなたのマシンに何もインストールする必要がありません。

> WARNING: VitePressは現在アルファ版の状態です。すでに、すぐにドキュメントを作成するのに適した状態になっていますが、マイナーリリースの間に設定やテーマ設定のAPIが変更される可能性が残っています。

## ステップ1: 新規プロジェクトを作成する

新しいディレクトリを作成し、そこに移動します。

```sh
$ mkdir vitepress-starter && cd vitepress-starter
```

その後、お好みのパッケージマネージャで初期化します。

```sh
$ yarn init
```

## ステップ2: VitePressをインストールする

プロジェクトにVitePressとVueをdevencyとして追加します。

```sh
$ yarn add --dev vitepress vue
```

### ピアデバイスが見つからないという警告が出ますか？

docsearch/js はそのピア依存性で特定の問題を抱えています。もし、それが原因でコマンドが失敗するようであれば、とりあえずこの回避策を試してみてください。

PNPMを使用する場合は、package.jsonに追加してください。

```json
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search"
    ]
  }
}
```

...


最初のドキュメントを作成します。

```sh
$ mkdir docs && echo '# Hello VitePress' > docs/index.md
```

## ステップ3: 開発環境を起動する

package.jsonにいくつかのスクリプトを追加します。

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  },
  ...
}
```

ローカルサーバーでドキュメントサイトを提供します。

```sh
$ yarn docs:dev
```

VitePressがホットリロード対応開発サーバー（http://localhost:5173）を開始します。

## ステップ4: ページを追加する

もう1ページ追加してみましょう。ステップ2で作成したindex.mdと一緒にgetting-started.mdというファイル名を作成します。ディレクトリ構造は次のようになります。

```
.
├─ docs
│  ├─ getting-started.md
│  └─ index.md
└─ package.json
```

その後、http://localhost:5173/getting-started.html にアクセスしてみるとget-started.mdの内容が表示されるはずです。

VitePressは基本的にこのような仕組みになっています。ディレクトリ構造はURLのパスと対応しています。ファイルを追加してアクセスするだけです。

## 次はどうする？

ここまでで基本的ではありますが機能的なVitePressのドキュメントサイトができあがったはずです。しかし現状では例えばこのサイトにあるサイドバーメニューがないため、ユーザはサイト内を移動することができません。

これらのナビゲーションを有効にするにはサイトにいくつかの設定を追加する必要があります。VitePressの設定方法については設定ガイドをご覧ください。

ページ内でできること、たとえばマークダウン・コンテンツの作成・Vueコンポーネントの使用などについては、ドキュメントの『Writing』セクションを参照してください。Markdownガイドが出発点として最適でしょう。

サイトの見え方をカスタマイズする方法（Theme）や、VitePressのデフォルトテーマが提供する機能を知りたい場合は、Theme:Introductionをご覧ください。

あなたのドキュメントサイトが形になり始めたら、デプロイメントガイドを必ず読んでください。