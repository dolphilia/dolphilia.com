# 概要

CivetWeb は、小型で使いやすい Web サーバです。C/C++のホストアプリケーションに埋め込むこともできますし、スタンドアロンサーバとして使用することもできます。CivetWebをホストアプリケーションに組み込むための情報は `Embedding.md` を参照してください。

スタンドアロンサーバーは自己完結型であり、動作に外部ソフトウェアを必要としません。一部のWindowsユーザーでは、[Visual C++ Redistributable](http://www.microsoft.com/en-us/download/details.aspx?id=30679)のインストールが必要な場合があります。


## インストール

Windows, UNIX, Macでは，CivetWebのスタンドアローン実行ファイルをコマンドラインから起動することができます．ターミナルで `CivetWeb` を実行し、オプションとして設定パラメータ (`CivetWeb [OPTIONS]`) または設定ファイル名 (`CivetWeb [config_file_name]`) を続ければ、Web サーバを起動することができます。

UNIX,Macの場合，CivetWebはターミナルから切り離されることはありません．`Ctrl-C`キーを押すとサーバが停止します．

Windowsでは，CivetWebを起動すると，システムトレイアイコンにアイコン化されます．アイコンを右クリックするとメニューが表示され，CivetWebの停止，設定，Windowsサービスとしてのインストールが可能です．

オプションなしで起動した場合，サーバはローカルのディレクトリを [http](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) 8080番ポートで公開します．したがって，Windowsでフォルダを共有する最も簡単な方法は， `CivetWeb.exe` をこのフォルダにコピーして，exeをダブルクリックし， [http://localhost:8080](http://localhost:8080) でブラウザを立ち上げることです．なお，他のコンピュータからフォルダにアクセスする場合は，'localhost'をマシン名に変更する必要があります．

CivetWebは起動すると，まず設定ファイルを探します．コマンドラインで明示的に設定ファイルが指定された場合，すなわち `CivetWeb path_to_config_file` と指定された場合は，その設定ファイルが使用されます．それ以外の場合，CivetWebは実行ファイルと同じディレクトリにある `CivetWeb.conf` というファイルを探し，それを使用します．この設定ファイルの指定は任意です．

設定ファイルは一連の行からなり、各行には1つのコマンドライン引数名とそれに対応する値が記述されます。空行や、`#` で始まる行は無視されます。以下は `CivetWeb.conf` ファイルの例です。

```
document_root c:\www
listening_ports 80,443s
ssl_certificate c:\CivetWeb\ssl_cert.pem
```

設定ファイルが使用される場合、追加のコマンドライン引数が設定ファイルの設定を上書きすることがあります。すべてのコマンドライン引数は `-` で始まらなければなりません。

例えば上記の `CivetWeb.conf` ファイルを使用し、CivetWeb を `CivetWeb -document_root D:\web` として起動した場合、`D:↵web` ディレクトリがドキュメントルートとして提供されます。この場合、コマンドラインオプションが設定ファイルよりも優先されるため、`D:⇄web`ディレクトリがドキュメントルートとして扱われます。CivetWebの機能については，以下の設定オプションのセクションをご覧ください．

コマンドラインの設定オプションは `-` で始まる必要がありますが、その名前は設定ファイルのものと同じであることに注意してください。すべてのオプション名は次のセクションに記載されています。したがって，以下の2つの設定は等価です．

```
# Using command line arguments
$ CivetWeb -listening_ports 1234 -document_root /var/www

# Using config file
$ cat CivetWeb.conf
listening_ports 1234
document_root /var/www
$ CivetWeb
```

CivetWeb は `.htpasswd` パスワードファイルの変更にも使用できます。

```
CivetWeb -A <htpasswd_file> <realm> <user> <passwd>
```

## コンフィギュレーションオプション

以下は、CivetWebが理解する設定オプションのリストです。各オプションの後には、デフォルト値が続きます。デフォルト値が存在しない場合、デフォルトは空です。

## 設定オプションのパターンマッチ

CivetWebでは、いくつかの設定オプションにシェルのようなグロブパターンを使用しています。例えば、CGI、SSI、Luaスクリプトファイルはファイル名パターンで認識されます。パターン・マッチは文字列の先頭から始まるため、基本的にパターンはプレフィックス・パターンとなります。構文は次のとおりです。

```
**      Matches everything
*       Matches everything but the slash character ('/')
?       Matches any character but the slash character ('/')
$       Matches the end of the string
|       Matches if pattern on the left side or the right side matches.
```

パターン内の他のすべての文字は、それ自身にマッチします。例

```
**.cgi$          Any string that ends with .cgi
/foo             Any string that begins with /foo
**a$|**b$        Any string that ends with a or b

/data/????.css$  Matches css files with 4 letter names in "/data" folder.
/data/*.js$      Matches all js file names in "/data" folder.
/api/*/*.cgi$    Matches "/api/resourcetype/resourcename.cgi"
/*.jpg$|/*.jpeg$ JPG and JPEG files in root folder
**.jpg$|**.jpeg$ JPG and JPEG files anywhere
```


## `civetweb.c`のオプション

`civetweb.c`では、以下のオプションがサポートされています。これらは、CivetWebを組み込んだアプリケーションだけでなく、スタンドアロンの実行ファイルにも使用することができます。スタンドアロン実行ファイルでは、さらにいくつかのオプションがサポートされています: *`MAIN.C`* のオプションを参照してください。オプションはアルファベット順に説明されています。まず、*document_root*, *listening_ports*, *error_log_file*, (for HTTPS) *ssl_certificate* をチェックしてください。

### access\_control\_allow\_headers `*`

Access-Control-Allow-Headers ヘッダーフィールド、CORS (cross-origin resource sharing) のプリフライトリクエストに使用される。[WikipediaのCORSのページ](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)を参照してください。

空文字列に設定すると、プリフライトは追加ヘッダを許可しません。に設定すると、プリフライトは要求されたすべてのヘッダを許可します。有効な HTTP ヘッダーのカンマ区切りリストを設定すると、プリフライトは、許可されたヘッダーとしてこのリストだけを返します。それ以外の方法で設定された場合、結果は不定です。

### access\_control\_allow\_methods `*`

Access-Control-Allow-Methods ヘッダーフィールド、CORS (cross-origin resource sharing) のプリフライトリクエストに使用される。[WikipediaのCORSに関するページ](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)を参照してください。

空文字列に設定すると、プレフライトはサーバーによって直接サポートされませんが、スクリプトはOPTIONSメソッドを適切に処理することによってプレフライトをサポートすることができます。に設定すると、プレフライトは、要求されたすべてのメソッドを許可します。有効なHTTPメソッドをカンマで区切ったリストを設定した場合、プリフライトは、許可されたメソッドとしてこのリストだけを返します。それ以外の方法で設定した場合、結果は不定です。

### access\_control\_allow\_origin `*`

Access-Control-Allow-Origin ヘッダーフィールドで、CORS (cross-origin resource sharing) のために使用される。[WikipediaのCORSのページ](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing)を参照してください。

### access\_control\_list

アクセス制御リスト(ACL)は、WebサーバーにアクセスできるIPアドレスのリストに制限を加えることができます。CivetWebの場合、ACLはIPサブネットのカンマ区切りリストで、各サブネットの先頭に`-`または`+`記号を付けます。プラス記号は許可を意味し、マイナス記号は拒否を意味します。`1.2.3.4`のようにサブネットマスクが省略された場合、そのIPアドレスだけを拒否することを意味します。

この値が設定されていない場合、すべてのアクセスが許可されます。そうでなければ、デフォルトではすべてのアクセスを拒否する設定になっています。各リクエストにおいて、リスト全体が走査され、最後にマッチしたものが勝利します。例

```
+192.168.0.0/16,+fe80::/64    deny all accesses, allow 192.168.0.0/16 and fe80::/64 subnet
                              (The second one is valid only if IPv6 support is enabled)
```

サブネットマスクについて詳しく知りたい方は、[Wikipediaのサブネットワークに関するページ](http://en.wikipedia.org/wiki/Subnetwork)を参照してください。

### access\_log\_file

アクセスログを記録するファイルへのパス。フルパスか、現在の作業ディレクトリからの相対パス。省略した場合（デフォルト）、アクセスはログに記録されません。

### additional\_header

リクエストごとに追加の HTTP レスポンスヘッダー行を送信します。キーと値を含む完全なヘッダー行を指定する必要があり、キャリッジリターンの改行は除きます。

例 (コマンドラインオプションとして使用)。例 (コマンドラインオプションとして使用): `-additional_header "X-Frame-Options:SAMEORIGIN"`。

このオプションは複数回指定することができます。指定したすべてのヘッダ行が送信されます。

### allow\_index\_script\_resource `no`

インデックススクリプト (`index.cgi` や `index.lua` など) は、スクリプト処理されたリソースを持つことができます。

この機能を有効にすると、/some/path/file.ext が処理されるようになる可能性がある。

1. /some/path/file.ext (with PATH\_INFO='/', if ext = cgi)
2. /some/path/index.lua with mg.request\_info.path\_info='/file.ext'
3. /some/path/index.cgi with PATH\_INFO='/file.ext'
4. /some/path/index.php with PATH\_INFO='/file.ext'
5. /some/index.lua with mg.request\_info.path\_info=='/path/file.ext'
6. /some/index.cgi with PATH\_INFO='/path/file.ext'
7. /some/index.php with PATH\_INFO='/path/file.ext'
8. /index.lua with mg.request\_info.path\_info=='/some/path/file.ext'
9. /index.cgi with PATH\_INFO='/some/path/file.ext'
10. /index.php with PATH\_INFO='/some/path/file.ext'

注意: この例は、`index_files`、`cgi_pattern`、`lua_script_pattern`のデフォルト値を使用し、CGIとLuaのサポートを有効にしてサーバーを構築した場合に有効です。

この機能が有効でない場合、最初のファイル (/some/path/file.cgi) のみを受け付けます。

> 注：このパラメータはインデックススクリプトにのみ影響します。/here/script.cgi/handle/this.ext のようなパスは、このオプションが `yes` または `no` に設定されていても、 PATH_INFO='/handle/this.ext' で /here/script.cgi が呼び出されます。

この機能を使うと、URLからスクリプトの拡張子を完全に隠すことができる。

### allow\_sendfile\_call `yes`

このオプションは Linux の `sendfile` システムコールの使用を有効または無効にするために使用されます。このオプションは Linux システムでのみ利用可能で、 `throttle` が有効でない場合に HTTP 接続 (HTTPS 接続ではない) にのみ影響します。`sendfile` コールを使用すると、HTTP 接続のパフォーマンスが向上しますが、ファイルシステムやオペレーティングシステムのバージョンによっては、このコールが壊れている可能性があります。

### authentication\_domain `mydomain.com`

HTTP ダイジェスト認証に使用する Authorization realm (認証領域)。このドメインは `.htpasswd` 認証ファイルのエンコーディングにも使用されます。ドメインを過去にさかのぼって変更すると、既存のパスワードは役に立たなくなります。

### case\_sensitive `no`

このオプションを使用すると、Windowsサーバーで大文字のURLを有効にすることができます。これはWindowsシステムでのみ利用可能です。  Windowsのファイルシステムは大文字と小文字を区別しませんが、ファイル名は大文字と小文字を含めて保存されます。このオプションを`yes`に設定すると、URIとWindowsのファイル名の比較で大文字と小文字が区別されるようになります。

### cgi\_environment

標準の環境変数に加えて、CGI スクリプトに渡される追加の環境変数を指定します。このリストは、以下のような名前=値のペアをカンマで区切ったリストである必要があります。 `VARIABLE1=VALUE1,VARIABLE2=VALUE2`.

### cgi\_interpreter

スクリプトファイルの拡張子に関係なく、__all__ CGIスクリプトのCGIインタープリタとして使用する実行ファイルへのパス。このオプションが設定されていない場合(デフォルト)、CivetWebはCGIスクリプトの最初の行、 [shebang line](http://en.wikipedia.org/wiki/Shebang_(Unix)) からインタプリタを探します(LinuxとMacだけでなくWindowsも同様)。

例えば、PHPとPerlのCGIを使用する場合、`#!/path/to/php-cgi.exe` と `#!/path/to/perl.exe` はそれぞれのCGIスクリプトの先頭行でなければなりません。パスは，ファイルのフルパスか，CivetWebサーバのカレントワーキングディレクトリからの相対パスである必要があることに注意してください．WindowsでマウスのダブルクリックでCivetWebを起動した場合は，CivetWebの実行ファイルがあるディレクトリがカレント・ワーキング・ディレクトリとなり，それ以外のディレクトリでCivetWebを起動した場合は，CivetWebの実行ファイルがあるディレクトリがカレント・ワーキング・ディレクトリとなります．

すべてのCGIが同じインタプリタを使用する場合、例えば、すべてPHPであれば、 `cgi_interpreter` に `php-cgi.exe` へのパスを設定するとより効果的です。この場合、CGIスクリプトのshebang行は省略することができる。PHPスクリプトの実行ファイルには `php.exe` ではなく、 `php-cgi.exe` を指定する必要があることに注意すること。

### cgi\_interpreter\_args

WindowsのCGIインタプリタプログラムに渡されるオプションの追加引数。

### cgi\_pattern `**.cgi$|**.pl$|**.php$`

`cgi_pattern` にマッチするすべてのファイルがCGIファイルとして扱われる。デフォルトのパターンでは、CGI ファイルはどこにでも存在することができます。CGI を特定のディレクトリに制限するには、パターンとして `/path/to/cgi-bin/**.cgi` を使用します。URIではなく、ファイルのフルパスがパターンにマッチすることに注意してください。

ビルドの設定によっては、追加のパターン `cgi2_pattern`、`cgi3_pattern`、`cgi4_pattern` を利用することができます。これにより、異なる cgi インタプリタプログラム (`cgi2_interpreter`, ...), 環境 (`cgi2_environment` ...), インタプリタ引数 (`cgi2_interpreter_argument`, ...) を使用することができるようになります。すべての追加 CGI ファイルパターンのデフォルトは空です - これらは明示的に設定されない限り、使用されません。

### cgi\_timeout\_ms

Maximum allowed runtime for CGI scripts.  CGI processes are terminated by the server after this time.  The default is "no timeout", so scripts may run or block for undefined time.

### cgi\_buffering `yes`

CGIプログラムの応答をクライアントに送信する前に、バッファリングできるようにします。バッファリングが有効な場合、CGI スクリプトによって作成されたコンテンツはバッファに集められ、より大きなブロックとしてクライアントに転送されるため、効率が向上します。コンテンツの一部をクライアントに送信する必要がある場合、 `cgi_buffering` を `no` に、 `allow_sendfile_call` を `no` に、 `tcp_nodelay` を `1` に設定してみてください。この設定はパフォーマンスを低下させますが、CGI プログラムとクライアントコードの間でバッファリングが行われないことを保証するものではありません。

### decode\_query\_string `no`

URL サーバー内のすべてのクエリ文字列をデコードします。  このオプションを `yes` に設定すると、すべてのコールバックとスクリプトはすでにデコードされたクエリ文字列のみを参照することになる。このオプションを `no` に設定すると、すべてのコールバックとスクリプトは、必要であれば、自分でクエリ文字列をデコードしなければならない。このオプションを `yes` に設定すると、"GET" リクエストによるフォームデータの送信には対応しないことに注意してください (しかし、"POST" メソッドによるフォームデータの送信には対応します。ほとんどの使用例では "POST" の使用を推奨します)。

### decode\_url `yes`

サーバはHTTPの標準に従ってURLをデコードする必要があります。つまり、`http://mydomain.com/this%20file.txt` は `this file.txt` にデコードされます (%20 はスペース文字のURLエンコーディングに対応します)。このオプションを `no` に設定するのは、コールバックのみを使用していて、エンコードされたURLにアクセスする必要がある場合のみである。

### document\_root `.`

提供するディレクトリ。デフォルトでは、カレントワーキングディレクトリがサービスされます。カレントディレクトリは、一般にドット(`.`)で参照される。間違って違うディレクトリを表示しないように、document_rootには絶対パスを指定することが推奨されます。

### enable\_auth\_domain\_check `yes`

絶対URLを使用する場合、ホストが認証用_ドメインと同一であることを確認します。有効な場合、絶対 URL へのリクエストは、そのドメインに向けられたものである場合にのみ処理されます。無効な場合、どのホストへの絶対URLも受け入れられます。

### enable\_directory\_listing `yes`

ディレクトリのリストアップを有効にする、`yes` または `no` のどちらか。

### enable\_http2 `no`

HTTP2 プロトコルを有効にします。  注意: このオプションは、サーバーが `USE_HTTP2` 定義でコンパイルされている場合のみ利用可能です。  CivetWebサーバは、HTTP2機能の一部のみをサポートしています。

### enable\_keep\_alive `no`

コネクション・キープ・アライブを有効にする、`yes` または `no` のいずれか。

クライアントが後続の HTTP リクエストで TCP 接続を再利用することを可能にし、パフォーマンスを向上させます。リクエストハンドラを使用しているときにこれが動作するためには、 各リクエストに正しい Content-Length HTTP ヘッダを追加することが重要です。もしこれを忘れると、クライアントはタイムアウトしてしまいます。

Note: If you set keep_alive to `yes`, you set keep_alive_timeout_ms to some value > 0 (e.g. 500).keep_alive を `no` に設定した場合、keep_alive_timeout_ms を 0 に設定する。現在、この設定はデフォルト値として行われているが、この設定は冗長である。将来のバージョンでは、keep_alive設定オプションは削除され、timeout > 0が設定されると自動的に`yes`に設定されるかもしれない。

### enable\_webdav `no`

この設定オプションを `yes` に設定すると、WebDAV 固有の HTTP メソッドを扱えるようになります。propfind, proppatch, lock, unlock, move, copy.これらのメソッドは、この設定オプションが `no` に設定されている場合は使用できません。

### enable\_websocket\_ping\_pong `no`

この設定値がyesに設定された場合、websocket_timeout_msで設定されたタイムアウトが経過すると、サーバーはwebsocket PINGメッセージをwebsocketクライアントに送信します。この機能をサポートするクライアント(ウェブブラウザ)はPONGメッセージで応答する。

この設定値が `no` に設定されている場合、タイムアウトが終了すると、ウェブソケットサーバーは接続を終了する。

注意: この設定値は、websocketのサポートを有効にしてサーバーを構築した場合のみ存在します。

### error\_log\_file

エラーログを記録するファイルへのパス。フルパスか、現在の作業ディレクトリからの相対パスです。存在しない場合（デフォルト）、エラーは記録されません。

### error\_pages

このオプションは、ユーザー定義のエラー・ページのためのディレクトリを指定するために使用されます。ディレクトリを指定するには、名前がバックスラッシュ (Windows) またはスラッシュ (Linux、MacOS、...) で終わっていることを確認します。エラーページは、個々のhttpステータスコード（例：404 - クライアントが要求したページが見つからない）、httpステータスコードのグループ（例：4xx - すべてのクライアントエラー）、またはすべてのエラーに対して指定することができます。対応するエラーページは error404.ext, error4xx.ext, error.ext のいずれかでなければならず、 ファイル拡張子は index_files オプションで指定した拡張子のいずれかでなければなりません。[HTTPステータスコードに関するWikipediaのページ](http://en.wikipedia.org/wiki/HTTP_status_code)を参照してください。

### extra\_mime\_types

`extension1=type1,exten-sion2=type2,...` という形式の余分な MIME タイプ。Wikipedia のインターネットメディアタイプのページ](http://en.wikipedia.org/wiki/Internet_media_type) を参照してください。拡張子は最初のドットを含まなければなりません。例：`.cpp=plain/text,.java=plain/text`。

### global\_auth\_file

グローバルパスワードファイルへのパス (フルパスか現在の作業ディレクトリからの相対パス) を指定します。設定された場合、ディレクトリごとの `.htpasswd` ファイルは無視され、すべてのリクエストはそのファイルに対して認証されます。

このファイルには `authentication_domain` で設定したレルムと、ダイジェスト形式のパスワードが含まれていなければなりません。

```
user:realm:digest
test:test.com:ce0220efc2dd2fad6185e1f1af5a4327
```

パスワードファイルは、上で説明したように `CivetWeb -A` を使って生成することもできますし、 [this generator](http://www.askapache.com/online-tools/htpasswd-generator) のようなオンラインツールを使って生成することもできます。

### hide\_files\_patterns

非表示にするファイルのパターン。このパターンにマッチするファイルはディレクトリ一覧には表示されず、要求された場合には `404 Not Found` を返します。パターンはファイル名のみで、ディレクトリ名は含まれません。例

```
CivetWeb -hide_files_patterns secret.txt|**.hide
```

> 注: hide_file_patterns は、上記のパターンを使用します。特定の拡張子を持つすべてのファイルを隠したい場合は、(*.extension だけでなく) **.extension を必ず使用してください。

### index\_files `index.xhtml,index.html,index.htm,index.cgi,index.shtml,index.php`

ディレクトリインデックスファイルとして扱うファイルのカンマ区切りリスト。一致するファイルがディレクトリに複数存在する場合、左側にリストされたものがディレクトリインデックスとして使用されます。

組み込みのLuaサポートが有効な場合、`index.lp, index.lsp, index.lua` が追加のデフォルトインデックスファイルとなり、 `index.cgi` の前に並べられます。

### keep\_alive\_timeout\_ms `500` or `0`

1つのキープアライブ接続における、2つのリクエスト間のアイドルタイムアウト。keep alive が有効な場合、同じコネクションを使った複数のリクエストが可能です。これにより、1つのサーバーから複数のリソースを読み込む際のコネクションを開いたり閉じたりするオーバーヘッドを減らすことができますが、このコネクションの有効期間中にサーバーの1つのポートと1つのスレッドをブロックすることになります。残念ながら、ブラウザは、ウェブサイトの表示に必要なすべてのリソースを読み込んだ後、キープアライブ接続を閉じません。サーバーは、このタイムアウトの間にクライアントからの追加のリクエストがない場合、keep-alive 接続を閉じます。

> 注: enable_keep_alive is set to `no`, the value of keep_alive genus_timeout_ms should be set to `0`, if enable_keep_alive is set to `yes`, the value of keep_alive genus_timeout genus_ms must be >0.現在、enable_keep_alive が no の場合は keep_alive_timeout_ms は無視されるが、将来のバージョンでは enable_keep_alive の設定値を削除し、keep_alive_timeout_ms が 0 でない場合は自動的に keep-alive を使用するようになるかもしれない。

### linger\_timeout\_ms

ソケットを閉じるまでの TCP ソケット・リンガー・タイムアウトを設定する (SO_LINGER オプション)。設定値は、ミリ秒単位のタイムアウトです。0に設定すると、クローズが失敗します (サーバー側からソケットがクローズされた場合)。また、-1 を設定すると、linger を無効にします。この値を設定しない(または-2)と、CivetWebはlingerオプションを全く設定しません。

注意: 他のタイムアウト設定との一貫性を保つため、この値はミリ秒単位で設定されます。しかし、TCPソケット層は通常秒単位でしかタイムアウトを提供しないため、この値は1000の整数倍である必要があります。

### listening\_ports `8080`

リッスンするポートのカンマ区切りのリスト。例えば、`80,443s`と指定すると、ポート80とポート443が開かれ、ポート443への接続はSSL化されます。非SSLポートでは、'redirect'を意味する文字`r`を付加することができます。リダイレクトポートは、すべてのトラフィックを最初に設定されたSSLポートにリダイレクトします。例えば、`listening_ports`が `80r,443s` の場合、ポート80に来るすべてのHTTPトラフィックは、HTTPSポート443にリダイレクトされます。

バインドするIPアドレスを指定することも可能である。この場合、ポート番号の前にIPアドレスとコロンを付ける必要がある。たとえば、ループバックインターフェースに80番ポートで、すべてのインターフェースにHTTPSポート443でバインドする場合は、 `127.0.0.1:80,443s` と指定します。

If the server is built with IPv6 support, `[::]:8080` can be used to listen to IPv6 connections to port 8080. IPv6 addresses of network interfaces can be specified as well, e.g. `[::1]:8080` for the IPv6 loopback interface.

[::]:80はIPv6のみポート80にバインドされます。IPv4とIPv6の両方でポート80を使用するには、`80,[::]:80` (IPv4用とIPv6用のソケットを1つずつ作成) もしくは `+80` (IPv4とIPv6の両方で1つのソケットを作成) のいずれかの設定を使用してください。IPv4 と IPv6 を使い分けるための `+` という表記は、ネットワークインターフェースが指定されていない場合のみ有効です。OS のバージョンや IPv6 のネットワーク環境によっては、期待通りに動作しないこともあるので、実際に試してみて最適な設定を見つける必要があります。もし、`+80`があなたの環境で動作しない場合、`80,[::]:80`を使用する必要があります。

ネットワークインターフェイスのアドレス (例: `192.0.2.3:80`, `[2001:0db8::1234]:80`) を使用することも可能です。利用可能なネットワークインターフェースアドレスのリストを得るには、 `ipconfig` (Windowsの `cmd` ウィンドウ) または `ifconfig` (Linuxのシェル) を使用します。あるいは、インターフェースのホスト名を使うこともできます。オペレーティングシステムのhostsファイルをチェックして、適切なホスト名(Windowsの場合、通常C:³³³³にあり、ほとんどのLinuxディストリビューションの場合。Windowsの場合はC:↵WindowsSystem32↵Drivers↵、Linuxの場合は/etc/hosts）。例えば、IPv6のローカルホストをバインドするには、`ip6-localhost:80`を使用することができます。これは，`[::1]:80`と変換されます．hosts ファイル以外にも、いくつかの名前解決サービスがあります。自分のホスト名を使うと、localhostや外部のインターフェイスにバインドされるかもしれません。適切なネットワークサービス(Zeroconf, mDNS, Bonjour, Avahi)がインストールされていれば、 `hostname.local` を試すこともできます。ホスト名を使う場合、あなたの特定のネットワーク環境でテストする必要があります - 場合によっては、固定IPアドレスに頼る必要があるかもしれません。

もし、ephemeral port (オペレーティングシステムにポート番号を選択させる) を使いたい場合は、ポート番号に `0` を使ってください。この場合、mDNS (Zeroconf, Bonjour, Avahi) などの他の手段で、クライアントにポート番号を伝える必要があります。

サーバーが `USE_X_DOM_SOCKET` オプションを設定してビルドされている場合、unix ドメインソケットもリッスンすることができます。ドメインソケットは、小文字の `x` の後にドメインソケットのパスを指定します (例: `x/tmp/sockname`)。ドメインソケットはポート番号を必要とせず、常に HTTP (HTTPS ではない) を使用し、リダイレクトを行うことはありません。したがって、 `:` は使用できません。一方、設定の末尾にある `r` や `s` は、ドメインソケットパスの一部として解釈されます。ドメインソケットパスは，Unix/Linuxシステム上の存在しないファイルへの有効なパスである必要があります．CivetWebプロセスは，Unix/Linuxファイルシステムにドメインソケットを作成するために，書き込み/作成のアクセス権が必要です．ドメインソケットのパスには，英数字，アンダースコア，`/`のみを使用してください（特に，`,;:`は避けてください）．

すべてのソケット/プロトコルタイプは `,` で区切って組み合わせることができます。例:127.0.0.1:80,[::1]:80,x/tmp/sockname` はIPv4、IPv6、ドメインソケット `/tmp/sockname` を使用してローカルホストのhttp接続を待ち受けます。

### lua\_background\_script

あらゆる接続から独立したバックグラウンドでLuaスクリプトを実行します。スクリプトは、サーバーへのネットワークアクセスが可能になる前に開始されます。ドキュメントルートの準備（ファイルの更新、ファイルの圧縮など）、外部リソースのチェック、古いログファイルの削除などに利用できます。

スクリプトでは、サーバーの起動・停止時に通知されるコールバックを定義することができます。さらに、ログのフィルタリングやフォーマットにも使用可能です。  Luaの状態は、サーバーが停止するまでオープンなままです。

利用可能なLuaコールバックの詳細については、後述の「Luaバックグラウンド・スクリプト」の項を参照してください。

### lua\_background\_script\_params

バックグラウンドスクリプトに動的なパラメータを追加できる。パラメータはmg.paramsにテーブルとしてマッピングされます。例: `paramName1=paramValue1,paramName2=2`.

### lua\_preload\_file

この設定オプションは、実際のWebページスクリプト（Luaスクリプト、Luaサーバーページ、Lua Webソケット）の前に実行されるLuaスクリプトファイルを指定するために使用されます。例えば、追加ライブラリのロードや、全てのスクリプトに必要な関数の定義など、全てのウェブページ・スクリプトのLua環境を変更するために使用できます。また、廃止された関数を定義することにより、後方互換性を確保することも可能です。

### lua\_script\_pattern `"**.lua$`

サーバーがLuaスクリプトとして解釈するファイルのパターンです。Luaサーバーページとは異なり、Luaスクリプトでは、Luaの文法がそのまま使用されます。testディレクトリに例があります。

### lua\_server\_page\_pattern `**.lp$|**.lsp$`

このパターンに合致するファイルは、Luaサーバーページとして扱われます。Luaスクリプトとは異なり、Luaサーバーページのコンテンツは、直接クライアントに配信されます。Luaスクリプトは、<?>タグで区切られ、標準的なコンテンツと区別されます。testディレクトリにサンプルがあります。

### lua\_websocket\_pattern `"**.lua$`

サーバーでLuaスクリプトとして解釈されるwebsocketスクリプトファイルのパターンです。

### max\_request\_size `16384`

HTTPリクエストヘッダーとCGIスクリプトから返されるヘッダーデータのサイズ制限 (Bytes)。設定されたサイズのバッファは、各ワーカスレッドにあらかじめ割り当てられます。 max_request_size は、クエリ文字列とクッキーを含むHTTPヘッダーを制限しますが、HTTPボディの長さには影響しません。サーバーは、クライアントまたはCGIスクリプトからヘッダー全体を読み込んでから、処理する必要があります。ヘッダーが max_request_size より長い場合、リクエストは無効か DoS 攻撃とみなされる。設定値はおおよその値であり、実際の制限は数バイトずれている可能性がある。最小値は1024(1kB)です。

### num\_threads `50`

ワーカスレッドの数。CivetWeb は、着信した各接続を個別のスレッドで処理します。したがって、このオプションの値は実質的に CivetWeb が同時に扱える HTTP 接続の数となります。

より多くの同時リクエスト (接続の試み) がある場合、それらはキューに入れられます。すべての接続試行は、まず受け入れられる必要があります (`listen_backlog` の待ち受け接続の制限まで)。次にそれは受け入れられ、次に利用可能なワーカスレッドのためにキューに入れられます (最大で `connection_queue` の数まで)。最後にワーカスレッドが、コネクションで受け取った全てのリクエストを処理します (`num_threads` の数まで)。

クライアントが Web ブラウザの場合、 `num_threads` を少なくとも 5 個使用することが推奨されます。ブラウザは、リンクされたドキュメント (CSS、JavaScript、画像など) をすべて含む 1 つの Web ページを読み込むために複数の接続を確立することがよくあるからです。

### listen\_backlog `200`

サーバーOSが受け付けるのを待っているコネクションの最大数。内部的には、このパラメータは "listen "ソケット/システムコールに渡される。

### connection\_queue `20`

ワーカスレッドがディスパッチするのを待っている、受け付けたコネクションの最大数。

### protect\_uri

与えられたURIがPATHで指定されたパスワードファイルで保護されなければならないことを指定する、URI=PATHのペアのカンマ区切りのリスト。すべてのPATHは、ファイルのフルパスでなければなりません。

### put\_delete\_auth\_file

PUT と DELETE リクエスト用のパスワードファイルです。パスワードファイルがないと、サーバーに新しいファイルをPUTしたり、既存のファイルをDELETEすることができなくなります。PUT と DELETE リクエストは、Lua スクリプトと CGI ページによって処理される可能性があります。

### request\_timeout\_ms `30000`

ネットワークの読み取りと書き込み操作のタイムアウトをミリ秒単位で指定します。クライアントが長時間接続を維持するつもりなら、この値を大きくするか、（よりよい）キープアライブメッセージを使用する。

### run\_as\_user

起動後に指定されたユーザ認証情報に切り替えます。通常，このオプションは，CivetWebがUNIX上の特権ポートにバインドする必要がある場合に必要となります．そのためには、CivetWebをrootとして起動する必要があります。セキュリティの観点から，rootで起動することは好ましくありません．そのため，このオプションを使用することで，特権を放棄することができます．例

```
civetweb -listening_ports 80 -run_as_user webserver
```

### ssi\_pattern `**.shtml$|**.shtm$`

`ssi_pattern` にマッチするすべてのファイルは、Server Side Includes (SSI) として扱われます。

SSI は単純な解釈のサーバーサイドスクリプト言語で、ウェブページに別のファイルの内容を含めるために最もよく使われます。例えば、ヘッダーとフッターのように、ウェブサイト全体に共通のコードを含めることが望ましい場合に便利です。

ウェブページが SSI 対応の HTML ファイルを認識するためには、ファイル名の最後に特別な拡張子が必要です。デフォルトでは、拡張子は `.shtml` または `.shtm` のいずれかです。これらの拡張子は `ssi_pattern` オプションを使用して変更することができます。

未知のSSIディレクティブは、CivetWebによって静かに無視されます。現在、2つのSSIディレクティブ、 `<!--#include ...>` と `<!--#exec "command">` がサポートされています。なお、`<!--#include ...>` ディレクティブは、3つのパス指定に対応しています。

```
<!--#include virtual="path">  Path is relative to web server root
<!--#include abspath="path">  Path is absolute or relative to
                              web server working dir
<!--#include file="path">,    Path is relative to current document
<!--#include "path">
```

`include` ディレクティブは、ファイルの内容やCGIスクリプトの実行結果を含めるために使用されます。exec` ディレクティブは、サーバ上でコマンドを実行し、そうでなければ標準出力 (ターミナルウィンドウ) に出力されたであろう出力を表示するために使用されます。例

```
<!--#exec "ls -l" -->
```

Server Side Includesの詳細については、Wikipediaをご覧ください。[サーバーサイドインクルード](http://en.wikipedia.org/wiki/Server_Side_Includes)

### ssl\_ca\_file

信頼できる証明書を含む .pem ファイルへのパス。このファイルには、複数の証明書を含めることができます。

### ssl\_ca\_path

信頼できる CA 証明書を含むディレクトリの名前。ディレクトリ内の各ファイルには、1つのCA証明書のみを含める必要があります。ファイル名は、サブジェクト名のハッシュと「.0」の拡張子で指定する必要があります。同じサブジェクト名の証明書が複数ある場合は、それぞれ拡張子が「.0」、「.1」、「.2」...となる必要があります。

### ssl\_cache\_timeout `-1`

SSL/TLSセッションのキャッシュを許可して、同じクライアントから同じサーバーへのHTTPS接続をより速く確立できるようにします。0を超える値を設定すると、セッションキャッシュが有効になります。設定値は、キャッシュされたセッションの最大有効期限を秒単位で指定します。デフォルトでは、セッションキャッシュは無効になっています。

### ssl\_certificate

SSL証明書ファイルへのパス。このオプションは `listening_ports` の少なくとも1つがSSLである場合にのみ必要です。ファイルはPEMフォーマットでなければならず、秘密鍵と証明書の両方を持っていなければなりません。例えば、[ssl_cert.pem](https://github.com/civetweb/civetweb/blob/master/resources/ssl_cert.pem) 証明書の作成方法については、doc/OpenSSL.mdに記載されています。

### ssl\_certificate\_chain

SSL証明書チェーンファイルへのパス。デフォルトでは、ssl_certificate ファイルが使用されます。

### ssl\_cipher\_list

クライアントに提示する暗号のリスト。入力はコロン、カンマ、スペースで区切る。

```
ALL           All available ciphers
ALL:!eNULL    All ciphers excluding NULL ciphers
AES128:!MD5   AES 128 with digests other than MD5
```

オプションの完全なリストと追加の例については、OpenSSL ドキュメントの [このエントリ](https://www.openssl.org/docs/manmaster/apps/ciphers.html) を参照してください。OpenSSL の暗号文字列は、IANA とは異なる暗号名を使用しています ([このマッピング](https://testssl.sh/openssl-iana.mapping.html) を参照してください)。

CivetWeb が OpenSSL 以外の TLS ライブラリ (例: [mbedTLS](https://tls.mbed.org/supported-ssl-ciphersuites)) で構築されている場合、暗号名が異なる可能性があります。

### ssl\_default\_verify\_paths `yes`

openssl のコンパイル時に設定されたデフォルトの信頼できる証明書の場所をロードします。

### ssl\_protocol\_version `4`

表に従って、SSL/TLSプロトコルの最小限の受け入れバージョンを設定する。

|               Protocols               | Value |
| ------------------------------------- | ----- |
| SSL2+SSL3+TLS1.0+TLS1.1+TLS1.2+TLS1.3 | 0     |
| SSL3+TLS1.0+TLS1.1+TLS1.2+TLS1.3      | 1     |
| TLS1.0+TLS1.1+TLS1.2+TLS1.3           | 2     |
| TLS1.1+TLS1.2+TLS1.3                  | 3     |
| TLS1.2+TLS1.3                         | 4     |
| TLS1.3                                | 5     |

TLSバージョン1.3は、最新のTLSライブラリを使用している場合のみ利用可能です。CivetWeb 1.14では、デフォルトの設定が0から4に変更されました。

### ssl\_short\_trust `no`

短命の証明書を使用できるようにします。これにより、 `ssl_certificate`、`ssl_ca_file` および `ssl_ca_path` で指定した証明書と鍵が、サーバーの実行中に交換され、再読み込みされるようになります。

自動化された環境では、まず新しい pem ファイルを別のファイル名で書き出し、それを設定した pem ファイル名にリネームすると、証明書を交換する際のパフォーマンスが向上することをお勧めします。

証明書と鍵を非常に高いスループットを持つシステムのtmpfs（linux）に保存しておくと、ディスクIOのパフォーマンスが向上することがあります。

### ssl\_verify\_depth `9`

証明書チェーンの最大長を設定します。クライアントの証明書チェーンがここで設定した深さよりも長い場合、接続は拒否されます。

### ssl\_verify\_peer `no`

サーバーによるクライアントの証明書検証を有効にする。

### static\_file\_cache\_control

静的ファイルのレスポンスに `Cache-Control` ヘッダを設定します。文字列の値がそのまま使用されます。

例: この設定。

`static_file_cache_control no-cache, max-age=31536000`

このヘッダーが追加されることになります。

`Cache-Control: no-cache, max-age=31536000`

static_file_max_ageオプションよりも優先されます。

### static\_file\_max\_age `3600`

キャッシュが静的ファイルを保存できる最大時間(秒)を設定します。

このオプションは、静的ファイルの `Cache-Control: max-age` 値を設定します。動的に生成されたコンテンツ、つまりスクリプトやコールバックによって作成されたコンテンツは、それ自身でキャッシュコントロールヘッダを送信する必要があります。

値 >0 は、秒単位で許容される最大キャッシュ時間に対応します。この値は1年を超えてはならない（RFC 2616, Section 14.21）。値0は、すべての静的ファイルに対して "do not cache at all "ヘッダを送信します。値 <0 および値 >31622400 (366日) の場合、動作は未定義です。

### strict\_transport\_security\_max\_age

`Strict-Transport-Security` ヘッダを設定し、`max-age` 値を設定します。これはウェブブラウザに対して、サーバとのやりとりを HTTPS のみで行い、決して HTTP では行わないように指示します。設定された場合、スクリプト(CGI, Lua, ...)とコールバックを除き、サーバーが直接処理するすべてのリクエストに対してこのヘッダーが送信されます。これらは、独自にHTTPヘッダを送信する必要があります。

時間は秒単位で指定されます。この設定がない場合、または -1 に設定されている場合、 `Strict-Transport-Security` ヘッダは送信されません。値 <-1 と値 >31622400 の場合、動作は未定義です。

### tcp\_nodelay `0`

クライアント接続でTCP_NODELAYソケットオプションを有効にする。

このソケットオプションが設定されると、接続時に Nagle のアルゴリズムを無効にし、バッファがいっぱいになったりタイムアウトが発生するのを待たずに、できるだけ早くパケットを送信するようになります。

```
0    デフォルトのままにしておく。Nagelのアルゴリズムが有効
1    すべてのソケットでNagelのアルゴリズムを無効にする
```

### throttle

クライアントのダウンロード速度を制限する。  スロットル(throttle)はカンマで区切られたキーと値のペアのリストで、キーは次のようなものです。

```
*                   limit speed for all connections
x.x.x.x/mask        limit speed for specified subnet
[IPv6-addr]/mask    limit speed for specified IPv6 subnet (needs square brackets)
uri_prefix_pattern  limit speed for given URIs
```

この値は1秒あたりのバイト数を表す浮動小数点数で、オプションで `k` や `m` (それぞれキロバイトやメガバイトを意味する) を後に付けることができます。制限値0は無制限を意味します。最後にマッチしたルールが優先されます。例

```
*=1k,10.0.0.0/8=0   limit all accesses to 1 kilobyte per second,
                    but give connections the from 10.0.0.0/8 subnet
                    unlimited speed

/downloads/=5k      limit accesses to all URIs in `/downloads/` to
                    5 kilobytes per second. All other accesses are unlimited
```

### url\_rewrite\_patterns

カンマで区切られた `uri_pattern=file_or_directory_path` 形式の URL リライトのリストです。CivetWeb は何らかのリクエストを受け取ると、 `document_root` と URI を組み合わせて表示するファイル名を作成する。しかし、rewriteオプションが使用されていて、 `uri_pattern` がリクエストされたURIにマッチする場合、 `document_root` は無視されます。代わりに `file_or_directory_path` が使用され、フルパス名かウェブサーバーのカレントワーキングディレクトリからの相対パスである必要があります。なお、 `uri_pattern` は、CivetWeb のすべてのパターンと同様に、プレフィックスパターンであることに注意してください。

これにより、 `document_root` 以外の多くのディレクトリを提供したり、すべてのリクエストをスクリプトにリダイレクトしたり、その他のトリッキーなことが可能になります。例えば、`.doc` ファイルへのアクセスをすべて特別なスクリプトにリダイレクトするには、次のようにします。

```
CivetWeb -url_rewrite_patterns **.doc$=/path/to/cgi-bin/handle_doc.cgi
```

または、ユーザーホームディレクトリのサポートを模倣するために、そうします。

```
CivetWeb -url_rewrite_patterns /~joe/=/home/joe/,/~bill=/home/bill/
```

### websocket\_root

CivetWebがLuaとwebsocketをサポートして構築されている場合、websocket用にもLuaスクリプトが使用される場合があります。Webソケットは、他のhttpページ（http、https）とは異なるURLスキーム（ws、wss）を使用するため、Webソケットに使用するLuaスクリプトも異なるディレクトリから提供される場合があります。デフォルトでは、document_rootがwebsocket_rootとして使用されます。

### websocket\_timeout\_ms

WS(S) のネットワークリード、ネットワークライト操作のタイムアウトをミリ秒単位で指定する。この値を設定しない場合、HTTP(S)でもWS(S)でもrequest_timeout_msの値が使用される。また、websocket_timeout_msを設定した場合、HTTP(S)とWS(S)で異なるタイムアウトを使用することができる。

注意: この設定値は、サーバーがウェブソケットサポートを有効にして構築された場 合にのみ存在します。


## Options from `main.c`

以下のオプションは、スタンドアロン実行ファイルの追加ソースファイルである `main.c` でサポートされています。これらのオプションは、`civetweb.c`を埋め込む他のアプリケーションで追加されない限り、サポートされません。

### title

設定した文字列をサーバー名として使用します。  Windowsの場合、ウィンドウのタイトルとして表示されます。

### icon

Windowsの場合、CivetWeb標準のアイコンに代わって、このアイコンファイルをシステムトレイに表示します。  Linuxの場合、このオプションは効果がありません。

### website

Windowsの場合、CivetWebのデフォルトのリンクの代わりに、このウェブサイトをシステムトレイのリンクとして使用します。

### hide\_tray `no`

Windowsの場合。トレイアイコンを表示しない。`Yes` (隠す) または `no` (表示する、デフォルト) を指定します。

### daemonize `no`

このオプションは、サーバが `DAEMONIZE` コンパイルオプションでビルドされている場合、Linux でのみ利用可能です。  (非推奨) `daemon()` BSD 関数を呼び出して、サーバプロセスをコントロール端末から切り離し、バックグラウンドでシステムデーモンとして動作させます。

### add\_domain

追加の設定ファイルをロードするオプションで、ホストする追加のドメインを指定する。  複数のドメインを追加するには、各ドメインに1つの設定ファイルを使用して、add_domainオプションを複数回使用します。このオプションは、WindowsおよびLinuxオペレーティング・システムで利用可能です。

内部的には、オプションは `mg_start_domain` API 関数に渡されます。もし、`main.c` を使用していない場合、追加のドメインを有効にするために、このAPI関数を呼び出す必要があります。

すべてのドメイン設定ファイルには、メインサーバ設定ファイルで利用可能なオプションのサブセットを含めることができますが、いくつかの例外があります。   いくつかの設定はサーバーごとにあり、他の設定はドメインごとに利用可能です。

ポート、ソケット、プロセス、スレッド固有のパラメータは、すべてサーバーごとに設定します。 `allow_sendfile_call`, `case_sensitive`, `connection_queue`, `decode_url`, `enable_http2`, `enable_keep_alive`, `enable_websocket_ping_pong`, `keep_alive_timeout_ms`, `linger_timeout_ms`, `listen_backlog`, `listening_ports`, `lua_background_script`, `lua_background_script_params`, `max_request_size`, `num_threads`, `request_timeout_ms`, `run_as_user`, `tcp_nodelay`, `throttle`, `websocket_timeout_ms` + すべてのオプションは `main.c` から.

その他のオプションはドメインごとに設定することができます。特に `authentication_domain` と `document_root` と (HTTPS の場合) `ssl_certificate` はドメインを追加するごとに設定しなければなりません。

`error_log_file` のようないくつかのオプションはドメインごとに設定されますが、サーバが特定のリクエストに対して正しいドメインを決定できなかった場合、初期 (メイン) ドメインの設定が使用されるかもしれません。


## スクリプト

### LuaスクリプトとLuaサーバーページ

WindowsおよびMac用のCivetWebバイナリには、Luaスクリプトが組み込まれており、Lua Server Pagesもサポートされています。

Luaスクリプト（デフォルトの拡張子：*.lua）は、プレーンなLua構文を使用します。Luaスクリプトは、関数mg.write(text)を呼び出して、ヘッダーとウェブページのコンテンツを送信する必要があります。

Luaサーバーページ（デフォルトの拡張子：*.lsp、*.lp）は、PHPの代わりにLuaプログラミング言語を使用し、PHPと同様のスクリプト要素を含むhtmlページです。Luaスクリプト要素は`<? ?>`ブロックで囲む必要があり、ページ上のどこにでも表示することができます。さらに、Luaサーバーページでは、PHPと同様にLua変数名を`<?= ?>`ブロックで囲むことにより、変数の内容を挿入することが可能です。例えば、現在の曜日名と現在のページのURIを表示するには、以下のように記述します。

```
<p>
  <span>Today is:</span>
  <? mg.write(os.date("%A")) ?>
</p>
<p>
  URI is <?=mg.request_info.uri?>
</p>
```

バージョン1.11より、CivetWebでは従来のLuaページの構文に加え、「Kepler Syntax」をサポートしています。Kepler Syntaxでは、スクリプト要素に `<?lua ?>` または `<% %>` ブロック（上記の `<? ?>` に対応）、変数コンテンツに `<?lua= ?>` または `<%= %>` を使用します（ `<?= ?>` に対応）。

```
<ul>
   <% for key, value in pairs(mg.request_info) do %>
   <li> <%= key %>: <%= value %> </li>
   <% end %>
</ul>
```

現在、拡張された「ケプラー構文」はHTMLでのみ利用可能です（下記のHTTPヘッダーに関する注記を参照）。

Luaは、高速かつ小型であることが特徴です。CivetWebのデフォルトのLuaバージョンは、Lua 5.2.4です。Lua 5.2リファレンスマニュアル](http://www.lua.org/manual/5.2/)に記載されています。ただし、CivetWebはLua 5.1、5.2、5.3、5.4（現在はプレリリース）およびLuaJITでビルドすることが可能です。

この例では、Webクライアントにデータを送信する関数 `mg.write()` を使用していることに注意してください。Luaのコード内部からWebコンテンツを生成するには、`mg.write()`を使用します。また、`mg.write()`以外にも、Luaの標準的なライブラリ関数には、Luaのコードからアクセスできます(詳細は、リファレンスマニュアルを参照してください)。ファイルに対して動作するLua関数（例：`io.open`）は、CivetWebプロセスの作業パスからの相対パスを使用します。Webサーバーのコンテンツは、パス `mg.document_root` に配置される。リクエストに関する情報は、リクエストメソッドやすべての HTTP ヘッダなど、`mg.request_info` オブジェクトで利用可能です。

[page2.lua](https://github.com/civetweb/civetweb/blob/master/test/page2.lua) は、プレーンなLuaスクリプトの例です。

[page2.lp](https://github.com/civetweb/civetweb/blob/master/test/page2.lp) は、Luaサーバーページの例です。

[page4kepler.lp](https://github.com/civetweb/civetweb/blob/master/test/page4kepler.lp) は、従来のCivetWeb Lua Server Pagesの構文に加え、「Kepler構文」を表示したLua Server Pageです。

これらの例では、`mg.request_info` オブジェクトの内容がページのコンテンツとして表示されます。mg.request_info` オブジェクトの要素に関する追加情報は、[CivetWeb.h](https://github.com/civetweb/civetweb/blob/master/include/civetweb.h) の `struct mg_request_info` の定義 を参照してください。

CivetWebでは，Luaの[LuaSQLite3インタフェース](http://lua.sqlite.org/index.cgi/doc/tip/doc/lsqlite3.wiki)を介して，[SQlite3データベース](http://www.sqlite.org/)にアクセスすることもできます．例として，[page.lua](https://github.com/civetweb/civetweb/blob/master/test/page.lua) と [page.lp](https://github.com/civetweb/civetweb/blob/master/test/page.lp) が挙げられます．

CivetWebは以下の機能をLuaにエクスポートします．

mg (table):

```lua
mg.read()                   -- reads a chunk from POST data, returns it as a string
mg.write(str)               -- writes string to the client
mg.cry(str)                 -- logs error string to stderr
mg.include(filename, [pathtype]) -- include another Lua Page file (Lua Pages only)
                            -- pathtype can be "abs", "rel"/"file" or "virt[ual]"
                            -- like defined for SSI #include
mg.redirect(uri)            -- redirect to internal URI
mg.onerror(msg)             -- error handler, can be overridden
mg.auth_domain              -- a string that holds the HTTP authentication domain
mg.document_root            -- a string that holds the document root directory
mg.lua_type                 -- a string that holds the lua script type
mg.system                   -- a string that holds the operating system name
mg.version                  -- a string that holds CivetWeb version
mg.get_cookie(str, cookie)  -- extract cookie from a string
mg.get_info(infotype)       -- get server status information
mg.get_mime_type(filename)  -- get MIME type of a file
mg.get_option(name)         -- get configuration option value from name
mg.get_response_code_text(n)-- get response code text for n, nil otherwise
mg.get_var(str, varname, [occurance])  -- extract the first occurance of variable from (query) string
                            --     otherwise the nth occurance if supplied, nil if not found
mg.send_file(filename)      -- send a file, including all required HTTP headers
mg.send_file_body(filename) -- send a file, excluding HTTP headers
mg.send_http_error(n,str)   -- send http error code n with string body
mg.send_http_ok(mime,body)  -- send http 200 OK with content-type mime and string body
mg.send_http_ok(mime,length)-- send http 200 OK with content-type mime and integer content-length length
mg.send_http_redirect(url,n)-- redirect to url with status code n
mg.split_form_data(form)    -- returns a table of the split form data
mg.url_encode(str)          -- URL encode a string
mg.url_decode(str, [form])  -- URL decode a string. If form=true, replace + by space.
mg.base64_encode(str)       -- BASE64 encode a string
mg.base64_decode(str)       -- BASE64 decode a string
mg.md5(str)                 -- return the MD5 hash of a string
mg.keep_alive(bool)         -- allow/forbid to use http keep-alive for this request
mg.time([bool])             -- get the current unix timestamp with milliseconds
                            --     if bool is true then it is the time since startup
mg.trace(n,message,...)     -- trace level n messages into tracefile
mg.uuid()                   -- generate a uuid
mg.random()                 -- get a random floating point number
mg.request_info             -- a table with the following request information
     .content_length        -- Request content-length as a float
     .content_type          -- Request content-type, nil otherwise
     .request_link          -- Requested link
     .request_uri           -- Request URI
     .uri                   -- Local request URI
     .path_info             -- Request URI, nil otherwise
     .status                -- Request status code, nil otherwise
     .remote_addr           -- IP address of the client as string
     .remote_port           -- remote port number
     .server_port           -- server port number
     .request_method        -- HTTP method (e.g.: GET, POST)
     .http_version          -- HTTP protocol version (e.g.: 1.1)
     .http_headers          -- Table of HTTP headers
     .num_headers           -- Number of headers
     .query_string          -- query string if present, nil otherwise
     .script_name           -- name of the Lua script, nil otherwise
     .https                 -- true if accessed by https://, false otherwise
     .remote_user           -- user name if authenticated, nil otherwise
     .auth_type             -- Digest
     .client_cert           -- Table with ssl certificate infomation
          .subject          -- Certificate subject
          .issuer           -- Certificate issuer
          .serial           -- Certificate serial number
          .finger           -- Certificate finger
```

ウェブソケットとタイマーのサポートが有効な場合、以下も利用可能です。

```lua
mg.set_timeout(fn,delay,[interval])  -- call function after delay at an interval
mg.set_interval(fn,delay,[interval]) -- call function after delay at an interval
mg.websocket_root                    -- a string that holds the websocket root
```

connect (function):

```lua
-- Connect to the remote TCP server. This function is an implementation
-- of simple socket interface. It returns a socket object with three
-- methods: send, recv, close, which are synchronous (blocking).
-- connect() throws an exception on connection error.
-- use_ssl is not implemented.
connect(host, port, use_ssl)

-- Example of using connect() interface:
local host = 'www.example.com'  -- IP address or domain name
local ok, sock = pcall(connect, host, 80, 0)
if ok then
  sock:send('GET / HTTP/1.0\r\n' ..
            'Host: ' .. host .. '\r\n\r\n')
  local reply = sock:recv()
  sock:close()
  -- reply now contains the web page http://www.example.com/
end
```

すべてのファイル名引数は、CivetWebの作業ディレクトリ（ドキュメントルートやLuaスクリプト/ページファイルではない）に対する絶対値または相対値です。

Luaページを提供するために、CivetWebはLuaコンテキストを作成します。このコンテキストは、ページ内の全てのLuaブロックに使用されます。つまり、同じページにある全てのLuaブロックは、同じコンテキストを共有することになります。例えば、あるブロックが変数を定義した場合、その変数は、それに続く全てのブロックに表示されます。


**HTTPヘッダに関する重要な注意事項:**

Luaスクリプトは、HTTPヘッダを自ら送信しなければならない(MUST)(例:Luaスクリプト)。

```lua
mg.write('HTTP/1.0 200 OK\r\nContent-Type: text/html\r\n\r\n')
```

Lua Server Pagesは、次のようなHTTPリプライヘッダを送信することができます。

```
HTTP/1.0 200 OK
Content-Type: text/html

<html><body>
  ... the rest of the web page ...
```

またはLuaコードを使用します。

```
<? mg.write('HTTP/1.0 200 OK\r\nContent-Type: text/html\r\n\r\n') ?>
<html><body>
  ... the rest of the web page ...
```

またはLuaサーバーページがHTMLコンテンツを生成する場合、HTTPヘッダーの行を省略することができます。この場合、CivetWeb は自動的に "200 OK"/"Content-Type: text/html" 応答ヘッダを作成します。この場合、ドキュメントは"<!DOCTYPE html>"または"<html>"で始まっている必要があります。

現在、拡張「ケプラー構文」は、独自のHTTPヘッダーを送信しないtext/htmlページに対してのみ利用可能です。したがって、「ケプラー構文」はHTMLページにのみ使用でき、従来のCivetWeb構文はcontent-typeヘッダーを送信し、あらゆる種類のファイルを生成するために使用することが可能です。


## Lua用Websocket

CivetWebでは、Luaでのウェブソケットもサポートしています。LuaスクリプトやLuaサーバーページとは対照的に、Luaウェブソケットスクリプトは全てのクライアントで共有されます。

Luaウェブソケット・スクリプトは、以下の関数を定義する必要があります。

```lua
`ready(arg)`   -- called after a connection has been established
`data(arg)`    -- called when the server receives data from the client
`close(arg)`   -- called when a websocket connection is closed
```

すべての関数は、クライアントを識別するための少なくとも1つのフィールド "client "を持つ table 型の引数で呼び出される。openが呼ばれた場合、引数テーブルには、上記で定義されたrequest_infoテーブルが追加される。data ハンドラでは、data というフィールドが追加で利用可能である。open"、"ready "および "data "関数は、接続を開いたままにするために、trueを返さなければならない。

Luaウェブソケットページは、シングルショット（タイムアウト）およびインターバルタイマーに対応しています。

その例を[websocket.lua](https://github.com/civetweb/civetweb/blob/master/test/websocket.lua)に示します。


## Lua バックグラウンドスクリプト

Luaバックグラウンドスクリプトは、サーバー起動時、クライアントが接続できるようになる前にロードされます。ウェブコンテンツの準備やログファイルのクリーニングなど、準備やメンテナンスに利用できます。

スクリプトファイルの名前とパスは `lua_background_script` として設定されます。追加のパラメータは `lua_background_script_params` を使って指定することができます。

バックグラウンドスクリプトは、サーバーが起動する前にロードされます。このスクリプトはブール値を返します。false" を返した場合、サーバーは起動しません。スクリプトがロードされた時点では、サーバーは完全に初期化されていないので、"mg "ライブラリのいくつかの機能はまだ使用できません。代わりに "start() "コールバック関数を使用してください。

Luaのバックグラウンドスクリプトでは、以下の関数を定義することができます。

```lua
`start()`        -- called wnen the server is started
`stop()`         -- called when the server is stopped
`log(req, res)`  -- called when an access log entry is created
```

`start` と `stop` の戻り値は無視されます。`start` コールバックはタイマーを作成するために使用することができる。

オプションの関数 `log` は、アクセスログファイルのエントリをフィルタリングしたり、フォーマットしたりするために使用できる。最初の引数として `request_info` テーブルが与えられる (このテーブルの内容: 上記を参照)。第2引数はリクエストの処理結果である。これは、ヘッダー情報を含む読み込みと書き込みのバイト数、秒単位の `processing_time` 、プロトコル ("http", "https", "ws" または "wss") を含んでいる。内部で生成されたレスポンスと `mg_response_*()` API を用いて生成されたレスポンスについては、http の `status` コードとレスポンスの `http_headers` テーブルを含みます (CGI のレスポンスはすべてのヘッダを持ちません)。

この関数はブール値を返すことができます: エントリをログに記録する場合は true、記録しない場合は false です。また、文字列を返すこともできます。これはログメッセージとして使用されます (空の文字列はログに記録されません)。

Luaスクリプトの例を参照してください。[background.lua](https://github.com/civetweb/civetweb/blob/master/test/lua_backbround_script_timer.lua)。

## Using CGI

CivetWebは、他のWebサーバと異なり、CGIスクリプトを特別なディレクトリに配置する必要がありません。CGIスクリプトのファイルは、ファイル名のパターンによって認識され、どこにでも置くことができます。

CGIを使用する場合、CGIファイル名がサーバに設定されている `cgi_pattern` パラメータと一致することを確認してください。さらに、すべてのCGIスクリプトに使用する `cgi_interpreter` を設定するか、すべてのスクリプトを `#!` で始め、その後に CGI インタプリタの実行ファイルを記述する必要があります (例)。例: `#!/path/to/perl.exe` または `#!/bin/sh`.

詳しくは `cgi_pattern` と `cgi_interpreter` を参照してください。

また、CGIを完全に無効にするために、`NO_CGI` を定義してサーバを構築することも可能である。この定義は `fork/exec` や `CreateProcess` をサポートしていないオペレーティングシステムで必要になります (CGI は子プロセスを生成することに基づいているため、原理的にそのようなオペレーティングシステムでは使用できません)。

すべての CGI リクエストは新しい子プロセスを生成します。HTTP クライアントからサーバに送られたデータは子プロセスの標準入力に渡され、子プロセスによって標準出力に書き込まれたデータは HTTP クライアントに送り返されます。

CGI スクリプトが特定のリクエストを処理できない場合、stdout に書き込む代わりに stderr に短いエラーメッセージを書き込むことがあります。このエラーメッセージはサーバーのエラーログに追加されます。

スクリプトは、stdoutに応答ヘッダを書き込んだ後にstderrに書き込むべきではありません。CGIライブラリがstderrに書き込む場合（例：ロギング/デバッグのため）、CGIスクリプトはスクリプトの始めにstderrをユーザー定義のログファイルにリダイレクトする必要があります。


## FAQ

# よくある問題

- PHPが動作しません。空のページが表示されたり、'File not found' エラーが発生したりします。その原因は、インタプリタへのパスが正しくないことにあります。PHPでは、正しいインタープリタは `php-cgi.exe` (UNIXでは `php-cgi`) であることを思い出してください。解決策: PHPのインタプリタへのフルパスを指定します。   CivetWeb -cgi_interpreter /full/path/to/php-cgi` のように指定します．

- Mac OS X などでは `php-cgi` は利用できません。php` バイナリがインストールされている限り、コマンドラインモードで CGI プログラムを実行することができます (以下の例を参照してください)。このモードでは `$_GET` とその仲間は利用できないので、 [parse_str](http://php.net/manual/en/function.parse-str.php) と `QUERY_STRING` 環境変数を使って手動でクエリー文字列をパースしなければならないことに注意してください。

```php
#!/usr/bin/php
<?php
echo "Content-Type: text/html\r\n\r\n";
echo "Hello World!\n";
?>
```

- CivetWebの起動に失敗する．CivetWebが起動時にすぐに終了してしまう場合，通常は設定ファイル（デフォルトでは `civetweb.conf` という名前）かコマンドライン引数にシンタックスエラーがあることを示しています．CivetWebでは，サイズを小さくするために，構文チェックを省いています．しかし，マニュアルは参考になるはずです．注意: 構文は時々変更されるので，実行ファイルを更新した後は，設定ファイルの更新が必要かもしれません．詳しくは *error_log_file* オプションを使用してみてください。

- WindowsでOpenSSLを利用したエンベッディングを行う場合、呼び出しの規則が原因で失敗することがあります。CivetWebで強制的に`__stdcall`を使用するには、Visual Studioコンパイラで`/Gz`コンパイルフラグを追加してください。