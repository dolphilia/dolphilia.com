# CivetWebの構築

このガイドでは、スタンドアロン型ウェブサーバのビルド方法を説明します。既存のCまたはC++アプリケーションの拡張については、[Embedding.md](https://github.com/civetweb/civetweb/blob/master/docs/Embedding.md)を参照してください。ソースコード・ファイルの簡単な概要は、同様に [Embedding.md](https://github.com/civetweb/civetweb/blob/master/docs/Embedding.md) に記載されています。

#### ソースコードはどこで入手できますか？

最新の開発版は、https://github.com/civetweb/civetweb でご覧いただけます。

テスト版およびリリース版は、https://github.com/civetweb/civetweb/releases でご覧いただけます。


## Windows向けの構築

#### Visual Studioを使用する

Visual Studio で *VS/civetweb.sln* を開いてください。SSLサポートを含めるには、暗号化サポートのための追加ライブラリーを追加する必要があるかもしれません。yaSSLを使用するとよいでしょう。  ただし、GPLライセンス、もしくは商用ライセンスが使用されています。詳細は[yaSSL.md](https://github.com/civetweb/civetweb/blob/master/docs/yaSSL.md)をご覧ください。また、OpenSSLを使用することもできます。詳しくは[OpenSSL.md](https://github.com/civetweb/civetweb/blob/master/docs/OpenSSL.md)をご覧ください。

#### MinGW-w64またはTDM-GCCを使用する。

スタートメニューから、"Run terminal "バッチファイルを探して実行します。TDM-GCCの場合、これは「MinGWコマンドプロンプト」という名前です。civetwebのソースディレクトリに移動し、実行します。

```
mingw32-make CC=gcc
```

#### Qt Creatorを使用する

Qt フォルダ内の Qt Designer プロジェクトを開きます。

#### CMakeの使用

`third_party`フォルダにあるコンポーネント（LuaやDuktapeなど）を除き、CivetWebはCMakeでビルドすることも可能です。CMakeはサポートされているすべてのOSで使用することができます．


## Linux、BSD、OSX用のビルド

## Makeを使用する

```
make help
```

対応する全てのmakeオプションの一覧を取得する

```
make build
make WITH_ALL=1
```

コードをコンパイルします。オプション "WITH_ALL=1 "を使用すると、すべてのオプション機能が有効になります。

```
make install
```

システムにインストールする、Linuxのみ。

```
make lib WITH_IPV6=1
make clean slib WITH_LUA=1 WITH_WEBSOCKET=1
```

スタティック・ライブラリと共有ライブラリをビルドします。追加のmakeオプションは、アプリケーションと同じようにライブラリの設定を行います。

*slib*オプションは、位置独立コード(PIC)が必要なため、別のクリーンビルドで実行する必要があります。  スタティックライブラリやサーバーをビルドした後に実行しようとすると、リンクエラーになります。

```
make clean
```

ビルド時に生成されたファイルのクリーンアップ


## ビルドオプションの設定

Makeのオプションは、コマンドラインからmakeコマンドで次のように設定することができます。

```
make build WITH_LUA=1
```


|        Make Options         |                     Description                      |
| --------------------------- | ---------------------------------------------------- |
| `WITH_LUA=1`                | Luaをサポートしたビルド                              |
| `WITH_DUKTAPE=1`            | サーバーサイドJavaScriptをサポートしたビルド         |
| `WITH_IPV6=1`               | IPV6対応                                             |
| `WITH_WEBSOCKET=1`          | ウェブソケットをサポートしたビルド                   |
| `WITH_X_DOM_SOCKET=1`       | UNIXドメインソケットをサポートしたビルド             |
| `WITH_SERVER_STATS=1`       | サーバー統計に対応したビルド                         |
| `WITH_EXPERIMENTAL=1`       | 実験的な機能を含む (バージョンに依存)                |
| `WITH_ALL=1`                | 上記の機能をすべて含む                               |
| `WITH_DEBUG=1`              | GDBデバッグサポート付きビルド                        |
| `WITH_CPP=1`                | c++のクラスでライブラリを構築する                    |
| `CONFIG_FILE=file`          | 設定ファイルとして 'file' を使用する                 |
| `CONFIG_FILE2=file`         | バックアップ設定ファイルとして 'file' を使用する     |
| `HTMLDIR=/path`             | 初期Webページ設置場所                                |
| `DOCUMENT_ROOT=/path`       | デフォルトのドキュメントルート                       |
| `PORTS=8080`                | インストール時にリスニングポートをオーバーライドする |
| `SSL_LIB=libssl.so.0`       | バージョン管理された SSL ライブラリを使用する        |
| `CRYPTO_LIB=libcrypto.so.0` | システムバージョンアップしたCRYPTOライブラリ         |
| `PREFIX=/usr/local`         | インストール先ディレクトリを設定します。             |
| `COPT='-DNO_SSL'`           | メソッドを使用して、コンパイルフラグを挿入します。   |

*make*で使用されるWITH_*オプションは、ソースコードのプリプロセッサー定義と同一ではないことに注意してください - 通常、そこではUSE_*が使用されます。


## PREFIXを変更する

ターゲットとなるインストール先を変更するには、 `make install` (`make build` ではない) コマンドに `PREFIX` オプションを渡します。使用例:

```
$ make build
$ make -n install PREFIX=/opt/civetweb
```

> 注: `-n` は `--dry-run` オプションに相当します (何も変更しません)。make install` がインストールする場所を確認することができます。上記のコマンドの出力例です。

```
$ make -n install PREFIX=/opt/civetweb
install -d -m 755  "/opt/civetweb/share/doc/civetweb"
install -m 644 resources/itworks.html /opt/civetweb/share/doc/civetweb/index.html
install -m 644 resources/civetweb_64x64.png /opt/civetweb/share/doc/civetweb/
install -d -m 755  "/opt/civetweb/etc"
install -m 644 resources/civetweb.conf  "/opt/civetweb/etc/"
sed -i 's#^document_root.*$#document_root /opt/civetweb/share/doc/civetweb#' "/opt/civetweb/etc/civetweb.conf"
sed -i 's#^listening_ports.*$#listening_ports 8080#' "/opt/civetweb/etc/civetweb.conf"
install -d -m 755  "/opt/civetweb/share/doc/civetweb"
install -m 644 *.md "/opt/civetweb/share/doc/civetweb"
install -d -m 755 "/opt/civetweb/bin"
install -m 755 civetweb "/opt/civetweb/bin/"
```

出力が良好に見えたら`-n` オプションを外すだけで、実際にシステムにソフトがインストールされます。


## Setting compile flags

コンパイルフラグは *COPT* make オプションで以下のように設定することができます。

```
make build COPT="-DNDEBUG -DNO_CGI"
```

|        Compile Flags         |                                                     Description                                                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `NDEBUG`                     | デバッグコードを剥がす                                                                                               |
| `DEBUG`                      | ビルドデバッグバージョン（非常にノイズが多い）                                                                       |
|                              |                                                                                                                      |
| `NO_ATOMICS`                 | アトミック関数を使用せず、ロックを使用する。                                                                         |
| `NO_CACHING`                 | キャッシュ機能の無効化                                                                                               |
| `NO_CGI`                     | CGI サポートを無効にする                                                                                             |
| `NO_FILES`                   | ディレクトリからファイルを提供しない                                                                                 |
| `NO_FILESYSTEMS`             | ファイルシステムの使用を完全に禁止する (NO_FILES が必要)                                                             |
| `NO_NONCE_CHECK`             | HTTPダイジェスト認証のnonceチェックを無効化                                                                          |
| `NO_RESPONSE_BUFFERING`      | mg_response_header_send の呼び出しまでバッファリングするのではなく、すべての mg_response_header_* をすぐに送信する。 |
| `NO_SSL`                     | SSL機能を無効にする                                                                                                  |
| `NO_SSL_DL`                  | システムの libssl ライブラリにリンクする                                                                             |
| `NO_THREAD_NAME`             | pthreadの名前を設定しない                                                                                            |
|                              |                                                                                                                      |
| `USE_ALPN`                   | HTTP2 に必要な Application-Level-Protocol-Negotiation を有効にする。                                                 |
| `USE_DUKTAPE`                | サーバーサイドJavaScriptを有効にする（Duktapeライブラリを使用）。                                                    |
| `USE_HTTP2`                  | HTTP2 サポートを有効にする (実験的なものであり、実運用には推奨されません)                                            |
| `USE_IPV6`                   | IPv6 サポートを有効にする                                                                                            |
| `USE_LUA`                    | Luaのサポートを有効にする                                                                                            |
| `USE_SERVER_STATS`           | サーバー統計のサポートを有効にする                                                                                   |
| `USE_STACK_SIZE`             | システムのデフォルト値を使用するのではなく、スタックサイズを定義する                                                 |
| `USE_WEBSOCKET`              | ウェブソケットサポートを有効にする                                                                                   |
| `USE_X_DOM_SOCKET`           | unixドメインソケットのサポートを有効にする                                                                           |
| `USE_ZLIB`                   | ファイルのオンザフライ圧縮が可能（zlibを使用）                                                                       |
|                              |                                                                                                                      |
| `MG_EXPERIMENTAL_INTERFACES` | 実験用インターフェイスを含む                                                                                         |
| `MG_LEGACY_INTERFACE`        | 廃止されたインタフェースを含む (削除候補)                                                                            |
|                              |                                                                                                                      |
| `SQLITE_DISABLE_LFS`         | 大きなファイルを扱わないようにする（Luaのみ）                                                                        |
| `SSL_ALREADY_INITIALIZED`    | libcrypto を初期化しない                                                                                             |
| `OPENSSL_API_1_0`            | OpenSSL V1.0.xのインターフェイスを使用します。                                                                       |
| `OPENSSL_API_1_1`            | OpenSSL V1.1.xのインターフェイスを使用します。                                                                       |
| `OPENSSL_API_3_0`            | OpenSSL V3.xのインターフェイスを使用する                                                                             |
| `USE_MBEDTLS`                | MbedTLSを使用する（OPENSSL_API_*との併用は不可）                                                                     |
|                              |                                                                                                                      |
| `BUILD_DATE`                 | DATE__ の代わりにビルド ID として使用する文字列として定義する。                                                      |
|                              |                                                                                                                      |


> 注: `make` を使用する場合 (この [Makefile](https://github.com/civetweb/civetweb/blob/master/Makefile) を使用する場合)、 `USE_<feature>` フラグは `COPT` で渡さず、上記の `WITH_<feature>` 構文を使ってください。追加の機能があると追加のソースコードファイルを使用するかもしれないためです。


## クロスコンパイル

makeオプションに*CC*、*COPT*、*TARGET_OS*を指定することで、完全に制御することができます。TARGET_OSは、コード機能と同様に、コンパイルの詳細を決定するために使用されます。TARGET_OSの値は、*resources/Makefile.in-os*にあるものであるべきです。

```
make CC=arm-none-linux-gnueabi-gcc COPT="-march=armv7-a  -mfpu=vfp -mfloat-abi=softfp" TARGET_OS=FROG
```

## Cocoa DMGパッケージング（OSXのみ）

ビルドには、代替の*Makefile.osx*を使用してください。  追加のコンパイルとリンクのオプションが必要なため、ビルド全体は *Makefile.osx* を使って行わなければなりません。  このMakefileには、他のMakefileと同じオプションがすべてあり、さらに1つの*package*ルールが追加されています。

```
make -f Makefile.osx package
```

## Buildrootでビルドする

[Buildroot](http://buildroot.uclibc.org/)はクロスコンパイルされたファイルシステムを作成するためのツールです。  Civetwebをbuildrootに含めるのはかなり簡単です。  様々なビルドオプションのサポートさえあります。

1.まず、すでに存在するかどうかを確認します。
  - buildrootで、make menuconfig
     - ターゲットのパッケージ選択 --->
     - ネットワーキング・アプリケーション --->
     - civetweb
2.もし、そこになければ、追加するだけです。
  - Civetwebの*contrib/buildroot/*から*config.in*と*civetweb.mk*をBuildrootの*package/civetweb/*ディレクトリにコピーしてください。
  - Buildrootの*package/Config.inに、メニューで見つけられるように、次の行を挿入してください。
    > ``` source "package/civetweb/Config.in" ```


## Androidでの構築

これは，Androidでcivetwebを動かすための小さなガイドで，元々はHTC Wildfireでテストしたものです．

> 注：Androidでcivetwebを実行するには、ルートアクセスは必要ありません。

- ダウンロードページからソースをダウンロードしてください。
- Android NDKは[http://developer.android.com/tools/sdk/ndk/index.html](http://developer.android.com/tools/sdk/ndk/index.html)からダウンロードしてください。
- path-to-ndk/ndk-build -C /path-to-civetweb/resources` を実行すると、 civetweb/lib/armeabi/civetweb が生成されるはずです。
- adbツール（Android SDKがインストールされている必要があります）を使用して、生成されたcivetwebバイナリを端末の `/data/local` フォルダにプッシュしてください。
- adbシェルから、`data/local`に移動し、`./civetweb`を実行します。
- サーバーが正常に動作しているかどうかをテストするには、ウェブブラウザで `http://127.0.0.1:8080` にアクセスします。すると、`Index of /` ページが表示されるはずです。

備考:

- `jni`はJava Native Interfaceの略です。AndroidのJavaアプリケーションでcivetwebのネイティブC機能を利用する方法については、Android NDKをお読みください。


