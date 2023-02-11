# プラグインのテスト

### プラグインをローカルでテストする

プラグインを公開する前に本でテストすることは、[npm link](https://docs.npmjs.com/cli/link)を使うことで可能になります。

プラグインのフォルダで実行します。

```
$ npm link
```

そしてブックのフォルダーに。

```
$ npm link honkit-plugin-<plugin's name>
```

### Travisでのユニットテスト

[gitbook-tester](https://github.com/todvora/gitbook-tester) を使うと、プラグイン用の **Node.js/Mocha** ユニットテストが簡単に書けます。[Travis.org](https://travis.org) を使うと、コミットやタグごとにテストを実行することができます。

[honkit-tester](https://github.com/vowstar/honkit-tester) 時とともに、gitbook-tester が最新版の nodejs で正しく動作しなくなる場合があります。これは gitbook-tester の移植版で、LTS 版の nodejs v10 v12 v14 で動作し、gitbook の代わりに honkit エンジンを使ってテストを実行することができるようになりました。
