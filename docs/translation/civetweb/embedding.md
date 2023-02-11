# CivetWebの組み込み

CivetWebは、主にアプリケーションがHTTPおよびHTTPSサーバーやWebSocket（WSおよびWSS）サーバー機能を簡単に追加できるように設計されています。例えば、C/C++アプリケーションは、CivetWebを使用して、Webサービスや設定インタフェースを有効にしたり、HTML5データ可視化インタフェースを追加したり、自動化やリモート制御、プロトコルゲートウェイ、ファイアウォール越えのためのHTTP/WebSocketクライアントとして使用することが可能です。CivetWebを組み込む最も簡単な方法は、既存のCプロジェクトにcivetweb.cファイルを追加することです（下記参照）。

また，CivetWebはスタンドアロンの実行ファイルとして使用することもできます．静的ファイルを配信することができ、サーバーサイドのLua、JavaScript、CGIをサポートする機能が組み込まれています。スタンドアロンサーバの構築方法については，[Building.md](https://github.com/civetweb/civetweb/blob/master/docs/Building.md)に記載されています．


## ファイル

アプリケーションにコンパイルするための小さなファイル群だけですが、ライブラリが必要な場合は [Building.md](https://github.com/CivetWeb/CivetWeb/blob/master/docs/Building.md) を参照してください。


#### INLファイルの拡張子について

*INL*ファイル拡張子は、ソースファイルにインラインで静的に含まれるコードを表します。  C++とは若干異なり、技術的に静的なコードとは異なる「インライン」コードを意味します。CivetWeb では、直接コンパイルすべきではないファイルに .c 拡張子をつけるのと対照的に、わかりやすくするためにこの拡張子をオーバーロードしています。


#### HTTPサーバーのソースファイル

これらのファイルはCivetWebライブラリを構成しています。メインとなる関数はありませんが、HTTPサーバを動作させるために必要なすべての関数が含まれています。

- HTTPサーバAPI
  - include/civetweb.h
- C言語の実装
  - src/civetweb.c
  - src/md5.inl (MD5計算)
  - src/sha1.inl (SHA計算)
  - src/handle_form.inl (HTMLフォーム処理関数)
  - src/response.inl (HTTPレスポンスヘッダ生成用ヘルパー)
  - src/sort.inl (ソート、qsort_r 代替)
  - src/match.inl (パターンマッチ)
  - src/timer.inl (オプションでタイマーをサポート)
  - src/http2.inl (オプションで HTTP2 のサポート)
- オプションでC++ラッパー
  - include/CivetServer.h (C++インターフェース)
  - src/CivetServer.cpp (C++ ラッパー実装)
- オプションサードパーティ製コンポーネント
  - src/third_party/* (サードパーティ製コンポーネント。主にスタンドアロン・サーバで使用)
  - src/mod_*.inl (Civetwebからサードパーティコンポーネントにアクセスするためのモジュール)


> 注：C++ラッパーは，サーバ自体に機能を追加することなく，公式のCインターフェイス (civetweb.h) を使用しています．  C インターフェースで利用可能ないくつかの機能は、C++ インターフェースでは欠落しています。  すべての機能はCインターフェイスを使ってアクセスできるはずですが、これはC++インターフェイスの設計目標ではありません。新しいコードはCインターフェイスを使うことをお勧めします。なぜなら、これはユニットテストされており、新しいAPI関数はそこでしか追加されないことが多いからです。


#### 実行可能ファイルの追加ソースファイル

これらのファイルは、サーバの実行ファイルを作成するために使用することができます。これらのファイルには、HTTPサーバを起動する `main` 関数が含まれています。

- スタンドアロンCサーバー
    - src/main.c
- リファレンス組み込みCサーバー
    - examples/embedded\_c/embedded\_c.c
- リファレンス組込みC++サーバー
    - examples/embedded\_cpp/embedded\_cpp.cpp

> 注："embedded "サンプルは活発にメンテナンス、更新、拡張、テストされています。examples/ フォルダにある他のサンプルは古くなっているかもしれませんが、参考のために残してあります。


## クイックスタート

デフォルトでは、サーバーは通常のHTTPサーバーのように自動的にファイルを提供します。  組み込みサーバーは、ほとんどの場合、この機能に過負荷をかけることになります。

### C

- C インターフェース `civetweb.h` をインクルードします。
- サーバを起動するには `mg_start()` を使用します。
    - *options* を使って、ポートやドキュメントルートなどを選択します。
    - 独自のフックを追加するには、*callbacks* を使用します。
- `mg_set_request_handler()` を使用して、簡単に独自のリクエストハンドラを追加します。
- サーバを停止させるには、`mg_stop()` を使用します。

### C++

- CivetWebはClean Cであり，C++インターフェイス `CivetServer.h` はCインターフェイスのラッパーレイヤーに過ぎないことに注意してください．Cで利用可能なすべてのCivetWebの機能がC++でも利用できるわけではありません．
- 各URIに対応するCivetHandlerを作成します．
- `CivetServer::addHandler()` でハンドラを登録します．
- `CivetServer` は構築時に起動し、破壊時に停止する。
- コンストラクタの *options* を使用して、ポートやドキュメントルートなどを選択します。
- コンストラクタの *callbacks* を使って、独自のフックを追加することができます。

別のクイックスタートサンプルをご覧ください。 embedded\_c と embedded\_cpp


## 機能選択

CivetWebは、起動時の設定だけでなく、構築時のカスタマイズも可能です。

##### 開始時間オプション

開始時間オプションは `mg_start` に渡されます。これらは [UserManual.md](https://github.com/civetweb/civetweb/blob/master/docs/UserManual.md) に記述されています。

##### コールバック

コールバック関数へのポインタは、`mg_start` にも渡されます。これらは [civetweb.h](https://github.com/civetweb/civetweb/blob/master/include/civetweb.h) とコールバック [API documentation](https://github.com/civetweb/civetweb/blob/master/docs/api/mg_callbacks.md) でドキュメント化されています。

##### コンパイラの定義

いくつかの機能は、コンパイル時に定義することで「オン」「オフ」にすることができます。CivetWebは合理的なデフォルトの機能セットでビルドされます。デフォルトに含まれないオプションの機能は、 `USE_<feature>` 定義を追加することで追加することができます。デフォルトの機能は `NO_<feature>` 定義を追加することで削除することができます。例えば、Luaをサポートしてビルドするには `#define USE_LUA` (-DUSE_LUA) を、CGIをサポートしないでビルドするには `#define NO_CGI` (-DNO_CGI) を設定する。機能定義の一覧は [Building.md](https://github.com/civetweb/civetweb/blob/master/docs/Building.md) にあります。いくつかのバージョンでは、ドキュメント化されていない機能定義が追加されているかもしれません。文書化されていない定義は、将来のバージョンで予告なく使用できなくなる可能性があります。

##### 外部提供機能

特殊なケースでは，[civetweb.c](https://github.com/civetweb/civetweb/blob/master/src/civetweb.c)の内部関数を完全にあなた自身の実装に置き換えることが有意義な場合があります．CivetWebはMITライセンスで保護されたフリーでオープンなソフトウェアなので、あなたの必要性に応じてcivetweb.cを自由に編集することができます。しかし、サーバーを更新したり、新しい機能やバグフィックスをメインリポジトリから取得する際に、これは迷惑になるかもしれません。いくつかの関数については、 `MG_EXTERNAL_FUNCTION_<internal_function_name>` という定義を使って、あなた自身の実装を提供することが可能です。この仕組みの詳細については、ソースコード [civetweb.c](https://github.com/civetweb/civetweb/blob/master/src/civetweb.c) を直接ご覧ください。インターフェースや内部関数の名前さえも予告なく変更される可能性があります。これらの定義を使用する場合、CivetWebを更新するたびにこれを確認する必要があります。それでも、毎回パッチを適用するよりは手間がかからないかもしれません。このカスタマイズ・オプションは、現在、評価段階にあります。もし、追加の関数定義が必要な場合は、GitHub で issue を作成し、あなたの使用状況を説明し、これが適切な解決策であるかどうかを議論してください - 一般的には、他のカスタマイズオプションが好まれます。


## スタックサイズ

Windows や Linux を実行しているデスクトップ PC など、十分なメモリを持つシステムで実行する場合、スタック・サイズは通常、気にする必要はありません。CivetWebは、これらのシステムのデフォルトのスタックサイズ(Windowsでは通常1MB、Linuxでは最大8MB)を各スレッドに使用します。CivetWebは、HTTP接続ごとに1つのスレッドを使用するため、リクエストハンドラがブロッキングを使用する場合、この接続のみがブロックされ、他の接続は影響を受けません。スレッドの数は設定することができます([UserManual.md](https://github.com/civetweb/civetweb/blob/master/docs/UserManual.md#num_threads-50)を参照)．  この数は、同時に処理できるスレッド数の制限も定義します - 追加のリクエストはキューに入れられますが、処理されません。ウェブブラウザなどのHTTPクライアントは、1つのページを読み込む際に同じサーバーに対して複数のコネクションを開く傾向があるため、1つのブラウザを使用するユーザーが1人だけの場合でも、5〜10スレッド未満では遅延が発生する可能性があります。すべてのスタックに必要な仮想メモリの総量は、`num_threads` にスレッドごとのスタックサイズ (たとえば、Windows で 50 スレッドなら 50 MB) を乗じたものです。この仮想メモリ (より正確には予約された仮想アドレス空間) は、スタックが本当にこのレベルまで使用されるとき、「本当の」物理メモリだけを必要とします。プロセス全体の中で1つのスタックがその仮想アドレス空間の制限を超えると、プロセス全体がクラッシュします。したがって、十分なリソースを持つシステムでは、大きなスタックを大きなリザーブで使用することが推奨されます。

しかし、小さな組み込みデバイスでは、特に、すべての仮想メモリの割り当てに対してすぐに物理メモリをコミットする場合、50MB はすでに多いかもしれません。スタックサイズを制限するために、 `USE_STACK_SIZE` という定義を設定することができます。スタックは（すべてのメモリと同様に）4096バイトのページで提供されることに注意してください（X86 CPU と他のCPUの場合）、したがって `USE_STACK_SIZE` は常にこのページサイズの整数の倍数である必要があります。追加機能を使用しない場合、各スレッドのスタックは 4 ページ (16kB) で十分でしょう。  これより小さいスタックサイズを使用すると、いくつかのバッファサイズ (例: `MG_BUF_LEN`) を小さくする必要があるかもしれません。(注意: これらの数値は、今回のバージョンだけでなく、過去や将来のバージョンについても保証されていません)。


## Lua対応

Luaは、サーバーサイドのインクルード機能です。  .luaで終わるファイルは、Luaで処理されます。

##### 以下のCFLAGSを追加します。

  - `-DLUA_COMPAT_ALL`
  - `-DUSE_LUA`
  - `-DUSE_LUA_SQLITE3`
  - `-DUSE_LUA_FILE_SYSTEM`

##### 以下のソースを追加します。

  - src/mod\_lua.inl
  - src/third\_party/lua-5.2.4/src
     + lapi.c
     + lauxlib.c
     + lbaselib.c
     + lbitlib.c
     + lcode.c
     + lcorolib.c
     + lctype.c
     + ldblib.c
     + ldebug.c
     + ldo.c
     + ldump.c
     + lfunc.c
     + lgc.c
     + linit.c
     + liolib.c
     + llex.c
     + lmathlib.c
     + lmem.c
     + loadlib.c
     + lobject.c
     + lopcodes.c
     + loslib.c
     + lparser.c
     + lstate.c
     + lstring.c
     + lstrlib.c
     + ltable.c
     + ltablib.c
     + ltm.c
     + lundump.c
     + lvm.c
     + lzio.c
  - src/third\_party/sqlite3.c
  - src/third\_party/sqlite3.h
  - src/third\_party/lsqlite3.c
  - src/third\_party/lfs.c
  - src/third\_party/lfs.h
  - src/third\_party/lua_struct.c
  

このビルドは、LuaバージョンLua 5.2で有効です。Lua 5.1 (LuaJITを含む), Lua 5.3, Lua 5.4でビルドすることも可能です。


## JavaScript対応

CivetWebは、Duktapeライブラリを組み込むことで、サーバサイドのJavaScriptをサポートした状態で構築することが可能です。


## CivetWebの内部構造

CivetWeb はマルチスレッド対応のウェブサーバです。`mg_start()` 関数は、Web サーバインスタンスに関するすべての情報を保持する Web サーバコンテキスト (`struct mg_context`) を確保します。

- 設定オプションを指定します。CivetWebは、渡されたオプションの内部コピーを作成することに注意してください。
- SSL コンテキスト(もしあれば)
- ユーザ定義のコールバック
- オープンしたリスニング・ソケット
- 受け付けたソケットのキュー
- スレッド間同期のためのミューテックスと条件変数

`mg_start()` が戻ったとき、すべての初期化が完了していることが保証されます（例：リスニングポートのオープン、SSLの初期化、など）。`mg_start()` はいくつかのスレッドを起動します。新しい接続を受け付けるマスタースレッドと、受け付けた接続を処理するいくつかのワーカスレッドです。ワーカスレッドの数は `num_threads` オプションで設定することができます。この数は、CivetWebが同時に処理できるリクエストの数に制限をかけます。CivetWeb を CivetWeb 以外の SSL を利用するプログラムに組み込む場合、`mg_start()` を呼び出す前に SSL を初期化し、プロセッサ前の定義として `SSL_ALREADY_INITIALIZED` を設定する必要があるかもしれません。CivetWeb内でのみSSLを利用する場合は、この必要はありません。

マスタースレッドが新しい接続を受け入れると、新しいソケット (`struct socket` で記述) が `MGSQLEN` (デフォルト20) サイズのソケットキューに格納される。アイドル状態のワーカスレッドは、このキューからソケットを取得することができる。すべてのワーカスレッドがビジー状態であれば、マスタースレッドはさらに最大 20 の TCP 接続を受け付け、キューをいっぱいにすることができる。さらに受け付けた接続をキューに入れようとすると、 キューに空きができるまでマスタースレッドはブロックします。マスタースレッドが満杯のキューでブロックされた場合、 オペレーティングシステムは入ってくる接続をキューに入れることもできる。この数は `listen()` のコールパラメータ (`SOMAXCONN`) によって制限され、プラットフォームによって異なる。

ワーカースレッドは無限ループで動作しており、簡略化すると次のようになります。

```c
static void *worker_thread() {
  while (consume_socket()) {
    process_new_connection();
  }
}
```

関数 `consume_socket()` は CivetWeb のソケットキューから新しい受け入れソケットを取得し、キューからアトミックに削除する。キューが空の場合、`consume_socket()` はブロックし、マスタースレッドによって新しいソケットがキューに入れられるまで待つ。

`process_new_connection()` は実際に接続を処理します。つまり、リクエストを読み、それをパースし、パースされたリクエストに応じて適切なアクションを実行します。

マスタースレッドは `poll()` と `accept()` を使用して、リスニングしているソケットに新しい接続を受け付けます。`poll()` は `select()` の `FD_SETSIZE` の制限を回避するために使用されます。リスニングしているソケットの数は少ないので、 `epoll()` や `kqueue()` のようなハイパフォーマンスな代替手段を使う理由はありません。ワーカスレッドはデータの読み書きのために、受け付けたソケットのブロッキングIOを使用します。すべてのソケットは `SO_RCVTIMEO` と `SO_SNDTIMEO` というソケットオプションが設定されています (CivetWeb のオプション `request_timeout_ms` で制御できます。デフォルトは 30 秒です)。これはクライアント接続における読み込み/書き込みのタイムアウト時間を指定します。


## 最小限の例

HTTPサーバーの初期化

```c
{
    /* サーバーコンテキストハンドル */
    struct mg_context *ctx;

    /* ライブラリの初期化 */
    mg_init_library(0);

    /* サーバーを起動する */
    ctx = mg_start(NULL, 0, NULL);

    /* ハンドラの追加 */
    mg_set_request_handler(ctx, "/hello", handler, "Hello world");

    ... アプリケーションを実行する ...
    
    /* サーバーを停止する */
    mg_stop(ctx);

    /* ライブラリの初期化を解除する */
    mg_exit_library();
}
```

シンプルなコールバック(HTTP/1.xとHTTP/2をサポートする新しい構造)。

```c
static int
handler(struct mg_connection *conn, void *ignored)
{
	const char *msg = "Hello world";
	unsigned long len = (unsigned long)strlen(msg);

	mg_send_http_ok(conn, "text/plain", len);

	mg_write(conn, msg, len);

	return 200; /* HTTP state 200 = OK */
}
```

単純なコールバック(HTTP/1.xのみをサポートする非推奨の構造)。
(注意: 古い例ではこのパターンが使われていますが、新しいコードでは推奨されません)。

```c
static int
handler(struct mg_connection *conn, void *ignored)
{
	const char *msg = "Hello world";
	unsigned long len = (unsigned long)strlen(msg);

	mg_printf(conn,
	          "HTTP/1.1 200 OK\r\n"
	          "Content-Length: %lu\r\n"
	          "Content-Type: text/plain\r\n"
	          "Connection: close\r\n\r\n",
	          len);

	mg_write(conn, msg, len);

	return 200;
}
```