# HonKitのセットアップとインストール

HonKitをインストールしてすぐに使えるようにするためには数分しかかかりません。

### ローカルインストール

##### 必要条件

HonKitのインストールは簡単でわかりやすいものです。システム要件は以下の2つの満たすだけです。

* NodeJS (v10.0.0以上を推奨)
* Windows・Linux・Unix・Mac OS X

##### NPMでインストールする

HonKitをインストールする最良の方法は**NPM**または**Yarn**経由で行うことです。 ターミナルプロンプトで次のコマンドを実行するだけでHonKitがインストールされます。

```
$ npm install honkit --save-dev
# または
$ yarn add honkit --dev
```

⚠️ 警告:

- `honkit` をグローバルに (`--global`) インストールしている場合は、各プラグインのルールもグローバルに (`--global`) インストールする必要があります。
- ローカルに `honkit` をインストールした場合、各プラグインもローカルにインストールする必要があります。

ローカルに `honkit` をインストールすることをお勧めします。

##### 本を作る

HonKitは定型文を設定することができます。

```
$ npx honkit init
```

もし、本を新しいディレクトリに作成したい場合は、`honkit init ./directory` を実行してください。

以下のコマンドで本をプレビューします。

```
$ npx honkit serve
```

または、次のコマンドで静的なウェブサイトを構築します。

```
$ npx honkit build
```

`build` と `serve` コマンドを `package.json` に [npm-run-scripts](https://docs.npmjs.com/cli/run-script) として定義することができます。

```diff
  "scripts": {
    "build": "honkit build",
    "serve": "honkit serve"
  },
```

この設定後、`npm run`コマンドを使用することができます。

```
# ビルド
npm run build
# サーバへの接続開始
npm run serve
```

##### デバッグ

`--log=debug` と `--debug` オプションを使用すると、より良いエラーメッセージ (スタックトレース付き) を得ることができます。例：

```
$ honkit build ./ --log=debug --debug
```

