# プラグインの作成と公開

HonKitプラグインとは、NPMで公開されている定義された規約に従ったノードパッケージのことです。

## 構造

#### package.json

`package.json` は、**Node.js モジュール** を記述するためのマニフェスト形式です。HonKitプラグインは、Nodeモジュールの上に構築されます。これは依存関係・バージョン・所有権・HonKitでプラグインを実行するために必要なその他の情報を宣言します。このドキュメントでは、スキーマの詳細を説明します。

プラグインマニフェスト `package.json` には、必要な設定についての詳細を含めることができます。設定スキーマは `package.json` の `honkit` フィールドで定義されます（このフィールドは [JSON-Schema](http://json-schema.org) ガイドラインに従います）。

```js
{
    "name": "honkit-plugin-mytest",
    "version": "0.0.1",
    "description": "This is my first HonKit plugin",
    "engines": {
        "honkit": ">1.x.x"
    },
    "honkit": {
        "properties": {
            "myConfigKey": {
                "type": "string",
                "default": "it's the default value",
                "description": "It defines my awesome config!"
            }
        }
    }
}
```

`package.json`については、[NPMドキュメント](https://docs.npmjs.com/files/package.json)で詳しく説明されています。

**パッケージ名**は、以下のパターンで始まる必要があります。

- `@<scope>/honkit-plugin-`
- `honkit-plugin-`
- `@<scope>/gitbook-plugin-`
- `gitbook-plugin-`

また、**パッケージエンジン** には `honkit` または `gitbook` が含まれている必要があります。

#### index.js

index.js`はプラグインランタイムの主要なエントリポイントです。

```js
module.exports = {
    // Map of hooks
    hooks: {},

    // Map of new blocks
    blocks: {},

    // Map of new filters
    filters: {}
};
```

## プラグインを公開する

HonKitプラグインは[NPM](https://www.npmjs.com)で公開することができます。

新しいプラグインを公開するには、[npmjs.com](https://www.npmjs.com)にアカウントを作成し、コマンドラインから公開する必要があります。

```
$ npm publish
```

## プライベートプラグイン

プライベートプラグインはGitHubでホストされ、`git` URLを使用してインクルードすることができます。

```
{
    "plugins": [
        "myplugin@git+https://github.com/MyCompany/myhonkitplugin.git#1.0.0"
    ]
}
```
