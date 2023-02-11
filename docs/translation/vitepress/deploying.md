# デプロイメント

以下のガイドはいくつかの共通の前提に基づくものです。

- プロジェクトのdocsディレクトリの中にドキュメントを配置するのです。
- デフォルトのビルド出力場所（.vitepress/dist）を使用しています。
- VitePressはプロジェクトのローカル依存関係としてインストールされ、package.jsonに以下のスクリプトが設定されています。

```json
{
  "scripts": {
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
}
```

> ヒント：あなたのサイトがサブディレクトリ（https://example.com/subdir/）で提供される場合、あなたのdocs/.vitepress/config.jsで '/subdir/' をベースとして設定する必要があります。例えば、Github (または GitLab) ページを使用していて user.github.io/repo/ にデプロイしている場合は、ベースを /repo/ に設定します。

## ローカルでのビルドとテスト

- このコマンドを実行するとドキュメントをビルドすることができます。

```sh
$ yarn docs:build
```

- ドキュメントをビルドしたらローカルで実行することでテストすることができます。

```sh
$ yarn docs:serve
```

serve コマンドはローカルの静的ウェブサーバを起動し.vitepress/dist にあるファイルを http://localhost:4173 で配信します。これは本番環境のビルドがあなたのローカル環境で問題なく見えるかどうかをチェックする簡単な方法です。

- 引数に --port を渡すと、サーバーのポートを設定することができます。

```json
{
  "scripts": {
    "docs:serve": "vitepress serve docs --port 8080"
  }
}
```

これでdocs:serveメソッドは http://localhost:8080 でサーバーを起動するようになります。

## Netlify, Vercel, AWS Amplify, Cloudflare Pages, Render

新しいプロジェクトを立ち上げ、ダッシュボードを使用してこれらの設定を変更します。

- ビルドコマンド：yarn docs:build
- 出力ディレクトリ: docs/.vitepress/dist
- Node Version: 14 (またはそれ以上。デフォルトでは通常14または16になりますが、Cloudflare Pagesではデフォルトはまだ12なので、変更する必要があるかもしれません)

> 警告: HTMLコードの自動最小化などのオプションは有効にしないでください。Vueにとって意味のあるコメントを出力から削除してしまいます。 削除された場合、ハイドレーションミスマッチエラーが表示されることがあります。

## GitHub Pages

### GitHub Actionsを利用する

1. テーマの設定ファイル docs/.vitepress/config.js で、base プロパティを GitHub リポジトリの名前に設定します。https://foo.github.io/bar/ にサイトをデプロイする予定なら、base を '/bar/' に設定します。常にスラッシュで始まり、スラッシュで終わる必要があります。
2. プロジェクトの .github/workflows ディレクトリ内に deploy.yml というファイルを作成し、以下の内容を記述します。

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: yarn
      - run: yarn install --frozen-lockfile

      - name: Build
        run: yarn docs:build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: docs/.vitepress/dist
          # cname: example.com # if wanna deploy to custom domain
```

> ヒント: 対応するブランチ名を置き換えてください。たとえば、ビルドしたいブランチが master であれば、上記のファイルでは main を master に置き換えてください。

3. コードをコミットして、mainブランチにプッシュします。
4. アクションが完了するのを待ちます。
5. リポジトリの「設定」の「ページ」メニューで、GitHub Pages のソースとして gh-pages ブランチを選択します。これで、プッシュするたびにドキュメントが自動的にデプロイされるようになります。

## GitLab Pages

### GitLab CIを利用する

1. docs/.vitepress/config.js の outDir を ../public に設定します。
2. .gitlab-ci.yml というファイルをプロジェクトのルートに作成し、以下のような内容を記述します。これにより、コンテンツに変更を加えるたびに、サイトがビルドされ、デプロイされます。

```yaml
image: node:16
pages:
  cache:
    paths:
      - node_modules/
  script:
    - yarn install
    - yarn docs:build
  artifacts:
    paths:
      - public
  only:
    - main
```

## Azure Static Web Apps

1. 公式ドキュメントに従う。
2. 設定ファイルにこれらの値を設定する（api_locationのような不要なものは削除する）。

- app_location:/
- output_location: docs/.vitepress/dist
- app_build_command: yarn docs:build

## Firebase

1. プロジェクトのルートにfirebase.jsonと.firebasercを作成します。

firebase.json:

```json
{
  "hosting": {
    "public": "docs/.vitepress/dist",
    "ignore": []
  }
}
```

.firebaserc:

```json
{
  "projects": {
    "default": "<YOUR_FIREBASE_ID>"
  }
}
```

2. yarn docs:buildを実行した後、このコマンドを実行するとデプロイされます。

```sh
firebase deploy
```

## Surge

1. yarn docs:buildを実行した後、このコマンドを実行するとデプロイされます。

```sh
npx surge docs/.vitepress/dist
```

## Heroku

1. heroku-buildpack-static にあるドキュメントとガイドに従ってください。
2. プロジェクトのルートにstatic.jsonというファイルを作成し、以下の内容を記述します。

```json
{
  "root": "docs/.vitepress/dist"
}
```

## Layer0

Layer0を使ったVitePressアプリの作成とデプロイを参照してください。