# CivetWebインストールガイド

このガイドは，CivetWebのビルド済みバイナリ配布物を対象としています．最新のソースコード版は[https://github.com/civetweb/civetweb](https://github.com/civetweb/civetweb)で入手可能です．


## Windows

このプリビルド版では、Luaをサポートするようにビルドされています。SSLをサポートするためのライブラリは、ライセンス上の制約から含まれていませんが、ユーザー自身でSSLライブラリを追加することができます。SSL対応の方法は、[https://github.com/civetweb/civetweb/tree/master/docs](https://github.com/civetweb/civetweb/tree/master/docs)に記載されています。

1. Visual C++ 再配布可能ファイル」は、ほとんどのWindows PCに既にインストールされています。万が一、不足している場合は、サーバー起動時に「msvcr##.dllがありません」というエラーメッセージが表示されます。[Redistributable for Visual Studio 2015](http://www.microsoft.com/en-us/download/details.aspx?id=48145)をダウンロードし、インストールする必要があります。
  - 注: 再配布可能ファイルの必要バージョンは、CivetWebのバージョンによって異なる場合があります。
2. 最新の *civetweb-win.zip* は [SourceForge](https://sourceforge.net/projects/civetweb/files/) からダウンロードしてください。
3. 起動すると、CivetWebはトレイに自分自身を置く。


## CivetWebの構築 - vcpkgの使用方法

CivetWebは，依存関係管理ツールである[vcpkg](https://github.com/Microsoft/vcpkg)を用いて，ダウンロードおよびインストールすることが可能です．

```sh
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
./bootstrap-vcpkg.sh
./vcpkg integrate install
./vcpkg install civetweb
```

vcpkgのCivetWebポートは、マイクロソフトのチームメンバーやコミュニティの貢献者によって、常に最新の状態に保たれています。もしバージョンが古くなった場合は、vcpkgリポジトリに[create an issue or pull request](https://github.com/Microsoft/vcpkg)をしてください。


## Linux

1. SourceForge](https://sourceforge.net/projects/civetweb/files/) または [GitHub](https://github.com/civetweb/civetweb/releases) から最新の *civetweb.tar.gz* をダウンロードしてください。
2. アーカイブを開き、新しいディレクトリに変更する。
3. make help
4. make
5. make install
6. プログラム ``/usr/local/bin/civetweb`` を実行すると、設定ファイル */usr/local/etc/civetweb.conf* が使用されます。

ほとんどのLinuxシステムは，コマンドライン引数の自動補完をサポートしています．  CivetWebスタンドアロン実行ファイルのbash自動補完を有効にするには、completeコマンドとして*resources/complete.lua*を設定します。  詳細な手順については、このファイルのコメントを参照してください。
