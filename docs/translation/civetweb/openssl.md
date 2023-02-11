# OpenSSL サポートの追加

Civetwebは、OpenSSLトランスポートレイヤーセキュリティ（TLS）ライブラリを使用した*HTTPS*接続をサポートしています。OpenSSLはフリーでオープンソースのライブラリです（http://www.openssl.org/ 参照）．OpenSSL以外のTLSライブラリ（gnuTLSやwolfSSLなど）もありますが、CivetWebの新しいTLS機能はOpenSSLのみを使用してテストされています。


## はじめに

- OpenSSLをシステムにインストールします。Windows用のセットアップと同様に、すべての主要なLinuxディストリビューション用のOpenSSLインストールパッケージがあります。
- civetweb ウェブサーバのデフォルトのビルド構成では、HTTPS 証明書が設定されている場合、必要な OpenSSL ライブラリがロードされます。


## Civetwebの構成

設定ファイルには、ポート番号に 's' が付加された https ポートを含める必要があります。httpとhttpsをそれぞれの標準ポートから提供するには、設定ファイル'civetweb.conf'で次の行を使用してください。

```
listening_ports 80, 443s
```

https のみで提供する場合。

```
listening_ports 443s
```

さらに、SSL証明書ファイルを設定する必要があります。

```
ssl_certificate d:\civetweb\certificate\server.pem
```


## 自己署名入り証明書の作成

OpenSSLはコマンドラインインタフェースを提供しており，これを用いてcivetwebが必要とする証明書ファイル(server.pem)を作成することができます．

Windowsでは以下の手順で作成します（Linuxでは「copy」を「cp」に、「type」を「cat」に置き換えてください）。

```
openssl genrsa -des3 -out server.key 1024

openssl req -new -key server.key -out server.csr

copy server.key server.key.orig

openssl rsa -in server.key.orig -out server.key

openssl x509 -req -days 3650 -in server.csr -signkey server.key -out server.crt

copy server.crt server.pem

type server.key >> server.pem
```

作成したserver.pemファイルには、「CERTIFICATE」セクションと「RSA PRIVATE KEY」セクションを含める必要があります。以下のようになります（xはBASE64でエンコードされたデータ）。

```
-----BEGIN CERTIFICATE-----
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxx
-----END CERTIFICATE-----
-----BEGIN RSA PRIVATE KEY-----
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
-----END RSA PRIVATE KEY-----
```

その他の便利なOpenSSLコマンドは、こちら（https://geekflare.com/openssl-commands-certificates/）をご覧ください。

証明書には、複数のウェブサイトをサポートするために、[サブジェクト代替名 (SAN)](https://en.wikipedia.org/wiki/Subject_Alternative_Name) を含めることができます: https://geekflare.com/san-ssl-certificate/


## 認証局からの証明書を含む

CivetWeb では、PEM 形式の証明書ファイルが 1 つ必要です。もし、認証局から複数のファイルを入手した場合は、それらの内容を1つのファイルにまとめてコピーする必要があります。このファイルには，BEGIN RSA PRIVATE KEY / END RSA PRIVATE KEYのセクションと，BEGIN CERTIFICATE / END CERTIFICATEのセクションが最低でも1つあることを確認してください．BEGIN PRIVATE KEY / END PRIVATE KEYのセクションを持つファイルを受け取った場合、手動でRSAの文字を追加することで適切なファイルを得ることができます。

設定パラメータ "ssl_certificate "に、生成された*.pemファイルのファイル名（パスを含む）を設定します。

このファイルは「自己署名入り証明書の作成」の項にあるファイルのように見える必要がありますが、BEGIN CERTIFICATE / END CERTIFICATEセクションをいくつか持つことになります。


## よくある問題

OpenSSLの設定が正しく行われていない場合、サーバーは起動しません。「civetweb.conf」でエラーログファイルを設定し、詳細な情報を取得します。

```
error_log_file error.log
```

「error.log」の内容を確認する。

```
load_dll: cannot load libeay32.*/libcrypto.*/ssleay32.*/libssl.*
```

このエラーメッセージは、SSLライブラリが（正しく）インストールされていないことを意味します。Windowsでは、ビルド済みのバイナリを使用することができます。OpenSSLプロジェクトのホームページ(http://www.openssl.org/related/binaries.html)にリンクがあります。Windowsのシステムフォルダをインストールディレクトリとして選択します - これがデフォルトの場所です。

```
set_ssl_option: cannot open server.pem: error:PEM routines:*:PEM_read_bio:no start line
set_ssl_option: cannot open server.pem: error:PEM routines:*:PEM_read_bio:bad end line
```

これらのエラーメッセージは、ssl_certificateファイルのフォーマットが、SSLライブラリの期待値と一致しないことを示しています。PEM ファイルは 'CERTIFICATE' と 'RSA PRIVATE KEY' の両方のセクションを含んでいなければなりません。それはバイト順マークのない厳密なASCIIファイルであるべきです。上記の手順は、有効な ssl_certificate ファイルを作成するために使用されます。

