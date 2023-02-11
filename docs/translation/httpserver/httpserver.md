# httpserver.h (0.7.0)

## 説明

ノンブロッキングなイベントドリブン HTTP サーバを構築するためのシングルヘッダ C ライブラリです。

## 使用方法

このファイルをCまたはC++ファイルにインクルードして実装を作成する前に。

```c
#define HTTPSERVER_IMPL
```

```c
// すなわち、このように表示されるはずです。
#include ...
#include ...
#include ...
#define HTTPSERVER_IMPL
#include "httpserver.h"
```

設定可能ないくつかの#defineがあります。これは、HTTPSERVER_IMPLを定義したのと同じファイルで行う必要があります。これらの定義はデフォルト値を持つため、設定するためには#undef'dして再定義する必要があります。

    HTTP_REQUEST_BUF_SIZE - default 1024 - The initial size in bytes of the
      read buffer for the request. This buffer grows automatically if it's
      capacity is reached but it certain environments it may be optimal to
      change this value.

    HTTP_RESPONSE_BUF_SIZE - default 1024 - Same as above except for the
      response buffer.

    HTTP_REQUEST_TIMEOUT - default 20 - The amount of seconds the request will
      wait for activity on the socket before closing. This only applies mid
      request. For the amount of time to hold onto keep-alive connections see
      below.

    HTTP_KEEP_ALIVE_TIMEOUT - default 120 - The amount of seconds to keep a
      connection alive a keep-alive request has completed.

    HTTP_MAX_TOTAL_EST_MEM_USAGE - default 4294967296 (4GB) - This is the
      amount of read/write buffer space that is allowed to be allocated across
      all requests before new requests will get 503 responses.

    HTTP_MAX_TOKEN_LENGTH - default 8192 (8KB) - This is the max size of any
      non body http tokens. i.e: header names, header values, url length, etc.

    HTTP_MAX_REQUEST_BUF_SIZE - default 8388608 (8MB) - This is the maximum
      amount of bytes that the request buffer will grow to. If the body of the
      request + headers cannot fit in this size the request body will be
      streamed in.

詳しくは、インターフェースのドキュメントと以下の例をご覧ください。

##

```c
int http_server_loop(struct http_server_s* server);
```

サーバが動作しているイベントループの ID を返します。これは Linux では epoll fd に、BSD では kqueue になります。これは、ソケットのアクティビティをリッスンするために使用することができます。唯一の注意点は、ユーザデータの最初のメンバがイベントを処理するコールバックへの関数ポインタである構造体に設定されなければならないことです。


For kevent:

```c
struct foo {
  void (*handler)(struct kevent*);
  ...
}

// イベント登録時にev.udataにfooポインタを設定する。
```

For epoll:

```c
struct foo {
  void (*handler)(struct epoll_event*);
  ...
}

// イベント登録時にev.data.ptrにfooポインタを設定する。
```


// httpサーバーを割り当て、初期化します。ポート番号と、リクエストを処理するために呼び出される関数ポインタを受け取ります。
struct http_server_s* http_server_init(int port, void (*handler)(struct http_request_s*));

// 将来の検索のためのポインタを格納する。これはライブラリでは一切使用されず、あくまでアプリケーションプログラマが使用するためのものである。
void http_server_set_userdata(struct http_server_s* server, void* data);

// イベントループとサーバーのリッスンを開始します。通常動作時、この関数は戻らない。サーバーの起動に失敗した場合、エラーコードを返します。デフォルトでは、すべてのインターフェイスをリッスンします。2番目のバージョンでは、リッスンするインターフェイスの IP アドレスを指定します。
int http_server_listen(struct http_server_s* server);
int http_server_listen_addr(struct http_server_s* server, const char* ipaddr);

// すでにループしている既存のアプリケーションにhttpサーバーを統合し、代わりにポーリング機能を使用したい場合、上記の呼び出しの代わりにこのリッスン呼び出しを使用します。これは、ゲームのように常に更新を繰り返すようなアプリケーションに適しています。デフォルトでは、すべてのインターフェイスをリッスンします。二番目の形式では、リッスンするインターフェイスの IP アドレスを指定します。
int http_server_listen_poll(struct http_server_s* server);
int http_server_listen_addr_poll(struct http_server_s* server, const char* ipaddr);

// この関数は、更新ループの中で呼び出します。この関数は、リクエストの準備ができたときに一度だけリクエストハンドラを起動します。リクエストが処理された場合は 1、何も処理されなかった場合は 0 を返します。この関数は、0 を返すまでループ内で呼び出さなければなりません。
int http_server_poll(struct http_server_s* server);

// フラグが設定されている場合は1を，そうでない場合はfalseを返す。問い合わせ可能なフラグを以下に示す。
int http_request_has_flag(struct http_request_s* request, int flag);

// このフラグは、リクエストのボディがチャンクされているとき、 あるいはボディが大きすぎて一度にメモリに収まらないときに設定されます。つまり、 http_request_read_chunk 関数を使用して、ボディをひとつひとつ読み込む必要があります。
#define HTTP_FLG_STREAMED 0x1

// HTTP リクエスト行から読み取ったリクエストメソッドを返します。
struct http_string_s http_request_method(struct http_request_s* request);

// HTTP リクエスト行から読み込まれた、完全なリクエストターゲット (url) を返します。
struct http_string_s http_request_target(struct http_request_s* request);

// Returns the request body. If no request body was sent buf and len of the
// string will be set to 0.
struct http_string_s http_request_body(struct http_request_s* request);

// Returns the request header value for the given header key. The key is case
// insensitive.
struct http_string_s http_request_header(struct http_request_s* request, char const * key);

// Procedure used to iterate over all the request headers. iter should be
// initialized to zero before calling. Each call will set key and val to the
// key and value of the next header. Returns 0 when there are no more headers.
int http_request_iterate_headers(
  struct http_request_s* request,
  struct http_string_s* key,
  struct http_string_s* val,
  int* iter
);

// Retrieve the opaque data pointer that was set with http_request_set_userdata.
void* http_request_userdata(struct http_request_s* request);

// Retrieve the opaque data pointer that was set with http_server_set_userdata.
void* http_request_server_userdata(struct http_request_s* request);

// Stores a pointer for future retrieval. This is not used by the library in
// any way and is strictly for you, the application programmer to make use
// of.
void http_request_set_userdata(struct http_request_s* request, void* data);

#define HTTP_KEEP_ALIVE 1
#define HTTP_CLOSE 0

// デフォルトでは、サーバは Connection ヘッダと HTTP バージョンを検査し、接続を維持すべきかどうかを決定します。この関数を使用すると、HTTP_KEEP_ALIVE ディレクティブと HTTP_CLOSE ディレクティブをそれぞれ渡すことで、その動作をオーバーライドして 強制的に接続を維持したり閉じたりすることができます。これは、クライアントとサーバを制御していて、常に接続を閉じたり 生かしておいたりしたいような場合に、わずかなパフォーマンスの向上をもたらす かもしれません。
void http_request_connection(struct http_request_s* request, int directive);

// HTTP リクエストを読み込むとき、サーバーはヘッダー、メソッド、ボディなどのリクエストの詳細を格納するためのバッファを割り当てます。デフォルトでは、このメモリは http_respond がコールされたときに解放されます。この関数を使用すると、http_respond がコールされる前にそのメモリを解放することができます。これは、リクエストの完了までに時間がかかり、リクエストデータを必要としない場合に便利です。http_string_s へのアクセスは、この呼び出しの後では無効となります。
void http_request_free_buffer(struct http_request_s* request);

// Allocates an http response. This memory will be freed when http_respond is
// called.
struct http_response_s* http_response_init();

// Set the response status. Accepts values between 100 and 599 inclusive. Any
// other value will map to 500.
void http_response_status(struct http_response_s* response, int status);

// Set a response header. Takes two null terminated strings.
void http_response_header(struct http_response_s* response, char const * key, char const * value);

// Set the response body. The caller is responsible for freeing any memory that
// may have been allocated for the body. It is safe to free this memory AFTER
// http_respond has been called.
void http_response_body(struct http_response_s* response, char const * body, int length);

// Starts writing the response to the client. Any memory allocated for the
// response body or response headers is safe to free after this call.
void http_respond(struct http_request_s* request, struct http_response_s* response);

// Writes a chunk to the client. The notify_done callback will be called when
// the write is complete. This call consumes the response so a new response
// will need to be initialized for each chunk. The response status of the
// request will be the response status that is set when http_respond_chunk is
// called the first time. Any headers set for the first call will be sent as
// the response headers. Headers set for subsequent calls will be ignored.
void http_respond_chunk(
  struct http_request_s* request,
  struct http_response_s* response,
  void (*notify_done)(struct http_request_s*)
);

// Ends the chunked response. Any headers set before this call will be included
// as what the HTTP spec refers to as 'trailers' which are essentially more
// response headers.
void http_respond_chunk_end(struct http_request_s* request, struct http_response_s* response);

// リクエストが Transfer-Encoding: chunked であるか、あるいはボディが大きすぎて一度にメモリに収まらない場合、通常の方法ではボディを読むことができません。その代わりに、この関数を呼んで一度にひとつのチャンクを読む必要があります。リクエストがこの形式の読み込みを要求しているかどうかを調べるには、 http_request_has_flag 関数をコールして HTTP_FLG_STREAMED フラグが設定されているかどうかを確認します。ストリームされたボディを読み込むには、チャンクの準備ができたときに呼び出されるコールバックを渡します。コールバックが呼ばれると、`http_request_chunk` を使用して現在のチャンクを取得することができます。そのチャンクが完了したら、この関数を再度呼び出して次のチャンクをリクエストします。もしチャンクのサイズが0であれば、リクエストボディは完全に読み込まれたので、応答することができます。
void http_request_read_chunk(
  struct http_request_s* request,
  void (*chunk_cb)(struct http_request_s*)
);

// Returns the current chunk of the request body. This chunk is only valid until
// the next call to `http_request_read_chunk`.
struct http_string_s http_request_chunk(struct http_request_s* request);