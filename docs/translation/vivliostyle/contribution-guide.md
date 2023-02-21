# Vivliostyle.js コントリビューションガイド

[[TOC]]

## モジュール構成

Vivliostyle.js は2つのコンポーネントで構成されています:

| [Core](https://github.com/vivliostyle/vivliostyle.js/tree/master/packages/core) | [Viewer](https://github.com/vivliostyle/vivliostyle.js/tree/master/packages/viewer) |
| --------------------------------- | --------------------------------- |
| Vivliostyle.js Core layout engine | Vivliostyle.js Viewer UI          |

## 開発環境のセットアップ

以下のものがインストールされていることを確認してください:

- [Node.js](https://nodejs.org)
- [Yarn](https://classic.yarnpkg.com)
- [Git](https://git-scm.com)

[vivliostyle.js](https://github.com/vivliostyle/vivliostyle.js)をクローンします。

```shell
git clone https://github.com/vivliostyle/vivliostyle.js.git
cd vivliostyle.js
```

`@vivliostyle/core` は `@vivliostyle/viewer` 内の `package.json` でdependencyに含まれています。開発時には、`@vivliostyle/core` はnpmからインストールされたパッケージではなくローカルのコピーを用います。このため、`yarn bootstrap` を使ってシンボリックリンクを作成します。

```shell
yarn install    # 依存関係をインストールする
yarn bootstrap  # セットアップ開発環境
```

## ビルド・開発サーバーの立ち上げ

```shell
yarn build-dev  # CoreとViewerの両方を開発版としてビルドします。
yarn dev        # start watching source files and open browser.
```

`yarn dev` を使用すると、（[Browsersync](https://browsersync.io/) によりライブリロードが有効な）Webサーバーが起動し、Google Chromeが自動的に開きます。 ブラウザーが開かない場合は、`http://localhost:3000/core/test/files/`>`を開きます。 ソースファイルを保存すると、ブラウザは自動的にリロードされます。

### ビューワーとテストファイル

開発モード中のビューワーHTMLファイルは `packages/viewer/lib/vivliostyle-viewer-dev.html` にあります。`#src=` ハッシュパラメータを指定して、ビューワーHTMLファイルから相対の(X)HTMLファイルをURLで指定できます。例えば、`http://localhost:3000/viewer/lib/vivliostyle-viewer-dev.html#src=../../core/test/files/print_media/index.html` は `packages/core/test/files/print_media/index.html` にあるprint mediaのテストファイルを開きます。

開発中に使用することを目的としたテストHTMLファイルは、 `packages/core/test/files/` にあります。 機能の実装と検証に役立つテストファイルを追加することをお勧めします。

`packages/core/scripts/package-artifacts/samples/` ディレクトリにテスト用のサンプルファイルがあります。より多くのサンプルが [vivliostyle.orgのサンプルページ](https://vivliostyle.org/samples) にあります。

### テスト

TypeScriptで書かれたソースファイルは、Rollupによってコンパイル・minifyされます。 JavaScriptファイルのminifiedバージョンをビルドするには、（リポジトリのルートディレクトリで）`yarn build` を実行します。 ソースは型チェックされ、minifyされたファイルは `packages/core/lib/` と `packages/viewer/lib` ディレクトリの下に生成されます。

[Jasmine](http://jasmine.github.io/) はユニットテストに使用されます。 スペックファイルは `packages/core/test/spec/` の下にあります。 ローカルマシンでテストを実行するには、`yarn test` を実行します。

ユニットテストはGitHubにプッシュした際に [Travis CI](https://travis-ci.org/vivliostyle/vivliostyle.js) が自動的に実行されます。masterにプッシュされると、すべてのテストに合格した後、コードは自動的に[Canary release](https://vivliostyle.github.io/#canary-release-equivalent-to-master)にデプロイされます。masterへのプッシュ（PRのマージ）には注意してくだい。

### 開発モード

開発モード (`yarn dev`) では、ブラウザの開発者ツールでVivliostyle.jsのTypeScriptソースコードをデバッグできます。

### Lint とコードのフォーマット

### Lint / code formatting

vivliostyleのソースコードは、`yarn lint` を実行（[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) を用いた [ESLint](https://eslint.org/)）して、コード整形してください。

`yarn format` で [prettier](https://prettier.io/) によるコードのフォーマットを行います。

### リリースのフロー

リリース処理の前に、次のコードを実行して、リリースビルドが作成されることを確認します。

```shell
yarn lint
yarn test
yarn clean
yarn build
```

#### 1. プレリリース

`yarn version:prerelease` を実行してプレリリース版を作成します。そして、 `yarn version:bump` でプレリリース番号を上げます。

#### 2. 安定版(Stable)リリース

現在のバージョンがプレリリース（例 v2.0.0-pre.4）なら、次を実行します:

```shell
yarn version:graduate
```

安定版から次の安定版（例 v2.0.0 -> v2.0.1）にバージョンアップする場合:

```shell
yarn version:bump
```

## 一貫した命名ガイドライン

1. 一貫性を保つために、クラス名とそのファイル名を一致させます。
2. モジュールのインポート名にはPascalCaseを、ファイル名にはkebab-caseを使用して、違いを視覚的に区別しやすくします。
3. 分かりやすさのために、ファイル名とクラス名に省略語を使わないようにします。ただし以下を除きます:
    1. イニシャリズム（EPUB、PDFなど）。
    2. 長い名前（conditional-properties よりも conditional-props が好ましい）。

## コミットメッセージのガイドライン

このプロジェクトへの重要な変更は `CHANGELOG.md` に記録されます。
そのためのコミットメッセージのガイドラインは [Conventional Commits](https://conventionalcommits.org) を参照。

## トラブルシューティング

### Cannot find `node_modules/@vivliostyle/core`

これは `yarn add` の後に発生します。 インストール後にシンボリックリンクを再作成するには、 `lerna link` を実行します。それ以外の場合は、`yarn add` の代わりに `lerna add` を使用します。

## ドキュメントのメンテナンス

以下のドキュメントを開発中に更新してください。

- [`CHANGELOG.md`](https://github.com/vivliostyle/vivliostyle.js/blob/master/CHANGELOG.md)
  - [Conventional Commits](https://conventionalcommits.org) により自動で生成されます.
- [Supported CSS Features](./supported-css-features.md)
  - VivliostyleでサポートされるCSS機能(values, selectors, at-rules, media queries and properties)

## ソースファイル

`packages/core/src/` 以下のソースファイルについて簡単に説明します。

### `vivliostyle/core-viewer.ts`

- vivliostyle-coreの公開インターフェースです。Vivliostyle-coreを使用するには、Vivliostyle.CoreViewerをインスタンス化し、オプションを設定し、addListenerメソッドでイベントリスナーを登録し、loadDocumentまたはloadPublicationメソッドを呼び出す必要があります。

### `vivliostyle/constants.ts`

- ライブラリ全体で使用される定数を定義しています。

### `vivliostyle/task.ts`

- タスクのスケジューリング。

### `vivliostyle/exprs.ts`

- Adaptive Layoutの[expressions](http://www.idpf.org/epub/pgt/#s2)の定義です。

### `vivliostyle/css.ts`

- 各種 CSS 値の定義。

### `vivliostyle/css-parser.ts`

- CSSパーサー.

### `vivliostyle/css-cascade.ts`

- セレクタのマッチングとカスケード計算を行うクラスです。

### `vivliostyle/vtree.ts`

- ツリーデータ構造を表示します。

### `vivliostyle/css-styler.ts`

- CSSカスケードを文書に段階的に適用する。

### `vivliostyle/font.ts`

- Webフォントの取り扱い。

### `vivliostyle/page-masters.ts`

- [Adaptive Layoutのページマスター](http://www.idpf.org/epub/pgt/#s3.4)のクラスです。

### `vivliostyle/page-floats.ts`

- ページのフロート.

### `vivliostyle/vgen.ts`

- ビューツリーの生成。

### `vivliostyle/layout.ts`

- リージョン内のコンテンツレイアウト（カラムブレイクなど）。

### `vivliostyle/css-page.ts`

- [CSS Paged Media](https://drafts.csswg.org/css-page/)に対応。

### `vivliostyle/ops.ts`

- ページマスタ、レイアウト領域（列）を1つずつ選択する等。

### `vivliostyle/epub.ts`

- EPUBメタデータの処理、ページのレンダリングなど。

> (もっと多くのファイルがあります... `pakcages/core/src` ディレクトリを参照してください。)

## その他の開発ドキュメント

- Vivliostyle API Reference
- Migration to TypeScript