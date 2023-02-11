# Ninja

Ninjaはスピードに重点を置いた小さなビルドシステムです。他のビルドシステムとの大きな違いは、入力ファイルがより上位のビルドシステムによって生成されるように設計されていることと、ビルドをできるだけ高速に実行するように設計されていることです。


## なぜ、また新たなビルドシステムを導入するのか？

他のビルドシステムが高級言語であるのに対し、Ninjaはアセンブラを目指したのです。

Ninjaのビルドファイルは人間が読むことができますが、手で書くには特に便利なものではありません。（[Ninja本体のビルドに使用される、生成されたビルドファイル](https://ninja-build.org/build.ninja.html)をご覧ください）。このような制約のあるビルドファイルにより、Ninjaはインクリメンタル・ビルドを迅速に評価することがでます）。


## Ninjaは使うべき？

Ninjaの低レベルなアプローチは、より機能的なビルドシステムに組み込むのに最適です：[既存のツールのリスト](https://github.com/ninja-build/ninja/wiki/List-of-generators-producing-ninja-build-files)をご覧ください。NinjaはGoogle Chrome、Androidの一部、LLVMのビルドに使われており、CMakeのNinjaバックエンドにより、他の多くのプロジェクトでも使用することができます。

哲学的な背景、あなたのプロジェクトにNinjaが使えるかどうか、プラットフォームのサポート、言語のセマンティックスの詳細など、詳しくは[マニュアル](https://ninja-build.org/manual.html)をご覧ください。


## 新着情報

最後のNinjaのリリースは、2022年8月30日にリリースされたv1.11.1です。[リリースノートをお読みください](https://groups.google.com/g/ninja-build/c/R2oCyDctDf8/m/-U94Y5I8AgAJ)。


## Ninjaの取得

Ninjaのバイナリをダウンロードするか、あなたのシステムのパッケージマネージャで見つけてください。

またはソースからビルドします。

```sh
$ git clone git://github.com/ninja-build/ninja.git && cd ninja
$ git checkout release
$ cat README.md
```


## リソース

[マニュアル](https://ninja-build.org/manual.html)
[メーリングリスト](https://groups.google.com/group/ninja-build)

```
#ninja-build on irc.oftc.net
```

[GitHubリポジトリ](https://github.com/ninja-build/ninja)

