# sokol_fetch.h

非同期データロード/ストリーミング

プロジェクトURL: https://github.com/floooh/sokol

このファイルを C または C++ ファイルに１つインクルードする前に。

```c
#define SOKOL_IMPL
```

または

```c
#define SOKOL_FETCH_IMPL
```

オプションとして、以下の定義を独自の実装で提供する:

- SOKOL_ASSERT(c)             - 独自のアサートマクロ (デフォルト: assert(c))
- SOKOL_UNREACHABLE()         - 到達不可能なコードのためのガードマクロ (デフォルト: assert(false))
- SOKOL_FETCH_API_DECL        - 公開関数宣言のプレフィックス (デフォルト: extern)
- SOKOL_API_DECL              - SOKOL_FETCH_API_DECL と同じです。
- SOKOL_API_IMPL              - public 関数実装の接頭辞（デフォルト：-）。
- SFETCH_MAX_PATH             - UTF-8ファイルシステムのパス/URLの最大長(デフォルト: 1024バイト)
- SFETCH_MAX_USERDATA_UINT64  - uint64_t の数で表した組み込みユーザーデータの最大サイズ、ユーザーデータは各インフライトリクエストに関連付けられた8バイトにアラインされたメモリ領域にコピーされます、デフォルト値は16（= 128バイト）です。
- SFETCH_MAX_CHANNELS         - IO チャンネルの最大数 (デフォルトは 16、 sfetch_desc_t.num_channels も参照)

sokol_fetch.hがDLLとしてコンパイルされる場合、宣言または実装を含む前に以下を定義します:

```c
SOKOL_DLL
```

Windowsでは、SOKOL_DLLは必要に応じてSOKOL_FETCH_API_DECLを __declspec(dllexport) または __declspec(dllimport) として定義します。

> 注: 以下のドキュメントでは、「IOスレッド」について多く語られています。実際のスレッドは、スレッドが利用可能なプラットフォームでのみ使用されます。Web版（emscripten/wasm）では、POSIXスタイルのスレッドを使用せず、コールバックで連鎖した非同期Javascriptコールを使用しています。しかし、この2つのアプローチの実際のソースコードの違いは最小限に抑えられています。

## 機能概要

- 非同期に完全なファイルを読み込むか、HTTP（ウェブプラットフォーム）またはローカルファイルシステム（ネイティブプラットフォーム）を介して増分的にファイルをストリームする

- リクエスト/レスポンスコールバックモデル、ユーザーコードはファイルロードを開始するためにリクエストを送信し、sokol_fetch.hはデータが準備できたとき、またはユーザーコードが応答する必要があるときに同じスレッドでレスポンスコールバックを呼び出します。

- メインスレッドや単一スレッドに限定されない。sokol-fetchの「コンテキスト」はどのスレッドでも生きることができ、複数のコンテキストが異なるスレッド上で並んで動作することができます。

- データ・バッファのメモリ管理は、ユーザー・コードの完全な制御下にあります。sokol_fetch.hは、設定された後にメモリを割り当てません。

- 自動速度制限により、一度に処理されるリクエストの最大数のみが保証され、すべてのデータが固定サイズの事前割り当てバッファにストリーミングされるゼロアロケーションモデルが可能になります。

- アクティブリクエストは、このリクエストを送信したユーザースレッドのどこからでも、一時停止、継続、キャンセルが可能です。


## 例題コード

これは、最大サイズが既知の単一のデータファイルを読み込むための最も単純なサンプルコードです。:

(1) デフォルトのパラメータでsokol-fetchを初期化する (ただし、デフォルトの設定パラメータは、安全だが遅い「直列化」操作を提供することに注意):

```c
sfetch_setup(&(sfetch_desc_t){ 0 });
```

(2) カレントディレクトリからファイルを読み込むために fetch-request を送り、ファイルの全内容を保持できる大きさのバッファに格納します:

```c
static uint8_t buf[MAX_FILE_SIZE];

sfetch_send(&(sfetch_request_t){
    .path = "my_file.txt",
    .callback = response_callback,
    .buffer = {
        .ptr = buf,
        .size = sizeof(buf)
    }
});
```

buf' が値(例えば配列や構造体アイテム)の場合、 .buffer アイテムは SFETCH_RANGE() ヘルパーマクロで初期化することができます。:

```c
sfetch_send(&(sfetch_request_t){
    .path = "my_file.txt",
    .callback = response_callback,
    .buffer = SFETCH_RANGE(buf)
});
```

(3) 'response-callback'関数を書きます。これは、ユーザーコードがリクエストの状態変化に反応しなければならないときにいつでも呼び出されます（最も重要なのは、データがロードされたときです）:

```C
void response_callback(const sfetch_response_t* response) {
    if (response->fetched) {
        // data has been loaded, and is available via the
        // sfetch_range_t struct item 'data':
        const void* ptr = response->data.ptr;
        size_t num_bytes = response->data.size;
    }
    if (response->finished) {
        // the 'finished'-flag is the catch-all flag for when the request
        // is finished, no matter if loading was successful or failed,
        // so any cleanup-work should happen here...
        ...
        if (response->failed) {
            // 'failed' is true in (addition to 'finished') if something
            // went wrong (file doesn't exist, or less bytes could be
            // read from the file than expected)
        }
    }
}
```

(4)  sokol-fetchメッセージキューをポンピングし、レスポンスコールバックを呼び出す。

```c
sfetch_dowork();
```

イベント駆動型アプリでは、イベントループの中で呼び出されるはずです。sokol-appを使用している場合は、frame_cb関数の中で呼び出すことになります。

(5) 最後に、アプリケーションの終了時に sfetch_shutdown() を呼び出します:

例えば、バッファを前もって提供する必要はなく、レスポンスコールバックで実現することも可能です。

また、巨大なファイルを小さな固定サイズのバッファに流し込んで、ダウンロードの一時停止と継続を行うことも可能です。

複数のファイルを並行して取得することで、「パイプラインのスループット」を向上させることも可能ですが、同時に「飛行中」のリクエストの最大数を制限することも可能です。

この仕組みについては、以下のドキュメントセクションをご覧ください :)


## APIドキュメント

```c
void sfetch_setup(const sfetch_desc_t* desc)
```

まず、同じスレッドで他の sokol-fetch 関数を呼び出す前に、任意のスレッドで sfetch_setup(const sfetch_desc_t*) を呼び出します。

sfetch_setup() は、セットアップパラメータを持つ sfetch_desc_t 構造体へのポインタを受け取ります。デフォルト値を使うべきパラメータは、ゼロ初期化されなければなりません。:

`max_requests` (uint32_t):

常に生きているリクエストの最大数で、デフォルトは128です。

`num_channels` (uint32_t):

リクエストを並列化し、優先順位をつけるために使用する「IOチャンネル」の数、デフォルトは1。

`num_lanes` (uint32_t):

1つのチャネルの「レーン」の数。あるチャンネルで現在「進行中」の各リクエストは、そのリクエストが終了するまで 1 つのレーンを占有します。これは自動的なレート制限に使われます (詳しくは下の CHANNELS AND LANES で検索してください)。デフォルトのレーン数は1です。

例えば、C99で最大1024アクティブリクエスト、4チャンネル、チャンネルあたり8レーンのためにsokol-fetchをセットアップする場合。

```c
sfetch_setup(&(sfetch_desc_t){
    .max_requests = 1024,
    .num_channels = 4,
    .num_lanes = 8
});
```

sfetch_setup() は、sokol-fetch がメモリを確保する唯一の場所です。

> 注: デフォルトのセットアップパラメータである 1 チャンネル、1 チャンネルあたり 1 レーンでは、「パイプラインスループット」が非常に悪くなります。スループットを向上させる方法については、以下の「LATENCY AND THROUGHPUT」を検索してください。

> 注: 複数のスレッドで sfetch_setup() を呼び出すと、各スレッドはそれ自身のスレッドローカルの sokol-fetch インスタンスを取得し、それは他のスレッドの sokol-fetch インスタンスとは独立して動作するようになること。

```c
void sfetch_shutdown(void)
```

アプリケーションの終了時に sfetch_shutdown() を呼び出し、あらゆる IO スレッドを停止し、 sfetch_setup() で割り当てられたすべてのメモリを解放します。

```c
sfetch_handle_t sfetch_send(const sfetch_request_t* request)
```

データのロードを開始するために sfetch_send() を呼び出します。この関数はリクエストパラメータを持つ sfetch_request_t 構造体へのポインタを取り、後の呼び出しのためにリクエストを識別する sfetch_handle_t を返します。少なくとも、パス/URL とコールバックは提供されなければなりません。

```c
sfetch_handle_t h = sfetch_send(&(sfetch_request_t){
    .path = "my_file.txt",
    .callback = my_response_callback
});
```

sfetch_send() は、利用可能なすべてのリクエスト項目が 'in-flight' であるために内部プールから割り当てることができない場合、無効なハンドルを返します。

sfetch_request_t 構造体は、以下のパラメータを含む (提供されないオプションのパラメータはゼロ初期化する必要がある)。

`path (const char*, required)`

ファイルシステムのパスまたは HTTP URL を表す、UTF-8 エンコードされた C 言語文字列へのポインタを指定します。この文字列は、内部データ構造にコピーされ、(必要なエンコーディング変換を除いて) そのまま fopen(), CreateFileW() あるいは XMLHttpRequest に渡されます。文字列の最大長は SFETCH_MAX_PATH 設定定義で定義され、デフォルトは 0 終端バイトを含む 1024 バイトです。

`callback (sfetch_callback_t, required)`

リクエストが「ユーザコードの注意」を必要とするときに呼び出される、 レスポンスコールバック関数へのポインタ。レスポンスコールバックでのレスポンス処理の詳細については、 「リクエストの状態およびレスポンスコールバック」を参照してください。

`channel (uint32_t, optional)`

リクエストが処理されるべき IO チャンネルのインデックス。チャンネルは、リクエストを並列化し、相対的に優先順位をつけるために使用されます。詳しくは、以下の「チャンネルとレーン」を参照してください。デフォルトのチャンネルは 0 です。

`chunk_size (uint32_t, optional)`

chunk_size メンバは、小さなチャンクで増分的にデータをストリーミングするために使用されます。chunk_size' バイトがストリーミング・バッファーにロードされた後、応答コールバックは現在のチャンクのためにフェッチされたデータを含むバッファーで呼び出されるでしょう。chunk_size が 0 (デフォルト) の場合、ファイル全体が読み込まれます。ウェブサーバーが圧縮データを提供している場合にストリーミングがどのように動作するかの重要な情報については、以下の「CHUNK SIZE AND HTTP COMPRESSION」を検索してください。

`buffer (sfetch_range_t)`

これは、データがロードされるメモリのチャンクを記述するオプションのポインタ/サイズのペアです (バッファが前もって提供されない場合、これはレスポンスコールバックで行われなければなりません)。バッファが提供される場合、それはファイル全体（もし chunk_size がゼロなら）、またはダウンロードしたチャンクの *非圧縮* データ（もし chunk_size が > 0なら）を保持するのに十分な大きさでなければなりません。

`user_data (sfetch_range_t)`

user_data ptr/size 構造体は、内部メモリブロックにコピーされるリクエストに関連付けられたオプションの POD blob (plain-old-data) を記述します(!)。このメモリブロックのデフォルトの最大サイズは 128 バイトです (ただし、通知を含める前に SFETCH_MAX_USERDATA_UINT64 を定義することでオーバーライドできます。この定義はバイト数ではなく「uint64_t の数」であることに注意してください)。ユーザーデータブロックは 8 バイトアラインで、memcpy() でコピーされます (したがって、C++ の「スマートメンバー」をそこに置かないでください)。

> 注: リクエストハンドルは厳密にスレッドローカルで、ハンドルが作成されたスレッド内でのみ一意であり、リクエストハンドルを含むすべての関数呼び出しはその同じスレッドで行われなければならないこと。

```c
bool sfetch_handle_valid(sfetch_handle_t request)
```

これは、与えられたリクエストハンドルが有効かどうか、そして現在アクティブな リクエストに関連しているかどうかをチェックします。もしそうなら、それは false を返します。

sfetch_send() が無効なハンドルを返した。内部のリクエストプールから新しいリクエストを割り当てることができなかったから (すべて飛行中だから)。

ハンドルに関連付けられたリクエストがもう生きていない (正常に終了したか、何らかの理由でリクエストが失敗したため)

```c
void sfetch_dowork(void)
```

sfetch_setup() と同じスレッドで sfetch_dowork(void) を一定間隔で (例えばフレームごとに一度) 呼び出して、「歯車を回す」ようにします。リクエストを送信しているのに、レスポンスコールバック関数で返事が返ってこない場合、最も考えられる理由は、フレームごとの関数で sfetch_dowork() の呼び出しを追加し忘れていることです。

sfetch_dowork()は大まかに以下の作業を行う。

最後に sfetch_dowork() をコールしてから sfetch_send() で送られた新しいリクエストは、 IO チャンネルにディスパッチされ、空きレーンが割り当てられます。そのチャンネル上のすべてのレーンが '飛行中の' リクエストによって占有されている場合、入ってくるリクエストはレーンが利用可能になるまで待たねばなりません。

バッファが割り当てられていないチャネルでキューに入れられたすべての新しいリクエストに対して、レスポンスコールバックは (response->dispatched == true) で呼び出され、レスポンスコールバックは動的に割り当てられたレーンを検査してリクエストにバッファをバインドします (より詳細には、以下の CHANNELS AND LANE を参照してください)。

チャンネルにディスパッチされた新しいリクエストごとに、「ユーザー側」から「IOスレッド側」への状態遷移が発生します。

チャネルにディスパッチされたリクエストは、そのチャネルのワーカスレッドに転送されるか (ネイティブプラットフォームの場合)、非同期の XMLHttpRequest を介して HTTP リクエストが送信されます (ウェブプラットフォームの場合)。

現在の IO 操作を終えたすべてのリクエストに対して、「IO スレッド側」から「ユーザー側」への状態遷移が起こり、応答コールバックが呼び出されて、取り出したデータを処理できるようになります。

完全に終了したリクエスト (ファイルのコンテンツがすべて読み込まれたか、FAILED 状態になったか) は解放されます (これは「リクエストプール」での状態を変更するだけで、実際のメモリは解放されません)。

まだ完了していないリクエストは、チャネルの 'incoming' キューに戻され、サイクルが再び開始されます。

```c
void sfetch_cancel(sfetch_handle_t request)
```

これは次の sfetch_dowork() 呼び出しでリクエストをキャンセルし、 (response.failed == true) と (response.finished == true) で応答コールバックを呼び出し、 ユーザーコードにリクエストのクリーンアップ作業をする機会を与えます。sfetch_cancel() がもはや生きていないリクエストのために呼ばれた場合、何も悪いことは起こりません (この呼び出しは単に何もしません)。

```c
void sfetch_pause(sfetch_handle_t request)
```

これは次の sfetch_dowork() 呼び出しでアクティブなリクエストを一時停止して、PAUSED 状態にします。PAUSED 状態のすべてのリクエストに対して、レスポンスコールバックは sfetch_dowork() の各コールで呼ばれ、ユーザーコードにリクエストを継続する機会を与えます (sfetch_continue() を呼び出すことで)。リクエストを一時停止することは、ストリーミングシナリオにおける動的なレート制限のために意味があります (固定数のストリーミングバッファを持つビデオ/オーディオストリーミングのようなものです。利用可能なすべてのバッファがダウンロード データで満たされるとすぐに、ビデオ/オーディオの再生が追いつき、新しいダウンロード データ用に空のバッファを解放できるように、さらなるデータのダウンロードが阻止されなければなりません。

```c
void sfetch_continue(sfetch_handle_t request)
```

sfetch_pause() 関数と対になるもので、一時停止したリクエストを続行します。

```c
void sfetch_bind_buffer(sfetch_handle_t request, sfetch_range_t buffer)
```

これは新しいバッファを(ポインタとサイズのペアで)アクティブなリクエストに 「バインド」します。この関数はレスポンスコールバックの内部から呼ばれなければならず、また、すでに別のバッファがバインドされていてはいけません。

```c
void* sfetch_unbind_buffer(sfetch_handle_t request)
```

これはリクエストから現在のバッファバインディングを削除し、以前のバッファへのポインタを返します (バッファが動的に割り当てられ、それを解放しなければならない場合に有用です)。

sfetch_unbind_buffer() はレスポンスコールバック内部から呼び出されなければなりません*。

レスポンスコールバックで異なるバッファをバインドするための通常のコードシーケンスは、次のようになります。

```c
void response_callback(const sfetch_response_t* response) {
    if (response.fetched) {
        ...
        // switch to a different buffer (in the FETCHED state it is
        // guaranteed that the request has a buffer, otherwise it
        // would have gone into the FAILED state
        void* old_buf_ptr = sfetch_unbind_buffer(response.handle);
        free(old_buf_ptr);
        void* new_buf_ptr = malloc(new_buf_size);
        sfetch_bind_buffer(response.handle, new_buf_ptr, new_buf_size);
    }
    if (response.finished) {
        // unbind and free the currently associated buffer,
        // the buffer pointer could be null if the request has failed
        // NOTE that it is legal to call free() with a nullptr,
        // this happens if the request failed to open its file
        // and never goes into the OPENED state
        void* buf_ptr = sfetch_unbind_buffer(response.handle);
        free(buf_ptr);
    }
}
```

```c
sfetch_desc_t sfetch_desc(void)
```

sfetch_desc() は、 sfetch_setup() に渡された sfetch_desc_t 構造体のコピーを、ゼロ初期化された値をデフォルト値に置き換えて返します。

```c
int sfetch_max_userdata_bytes(void)
```

SFETCH_MAX_USERDATA_UINT64 の設定値をバイト数で返します(つまり SFETCH_MAX_USERDATA_UINT64*8) 。

```c
int sfetch_max_path(void)
```

SFETCH_MAX_PATH 設定の値を返します。


## リクエストステートとレスポンスコールバック

リクエストは、そのライフタイムの間にいくつかの状態を通過します。リクエストの現在の状態によって、それは「ユーザースレッド」 (リクエストが送られた場所) か IO スレッドによって「所有」されることになります。

リクエストは IO スレッドとユーザースレッドの間で「ピンポン」していると考えることができ、 実際の IO 作業は IO スレッドで行われ、応答コールバックの呼び出しはユーザースレッドで行われます。

すべての状態遷移とコールバックの呼び出しは sfetch_dowork() 関数の内部で起こります。

アクティブなリクエストは以下の状態を通過します。

`ALLOCATED` (user-thread)

リクエストは sfetch_send() で割り当てられ、その IO チャンネルにディスパッチされるのを待っています。これが起こると、リクエストは DISPATCHED 状態に遷移します。

`DISPATCHED` (IO thread)

リクエストがそのIOチャンネルにディスパッチされ、レーンが割り当てられた。

sfetch_send() でバッファが提供された場合、リクエストは直ちに FETCHING 状態に移行し、バッファへのデータのロードを開始します。

sfetch_send() でバッファが提供されなかった場合、レスポンスコールバックは (response->dispatched == true) で呼び出され、レスポンスコールバックがバッファをリクエストにバインドできるようにします。レスポンスコールバックでバッファをバインドすることは、バッファが動的に割り当てられず、代わりにリクエストのチャネルとレーンから事前に割り当てられたバッファを選択しなければならない場合に意味があります。

これは、HTTP ではファイル全体をダウンロードする前にファイルサイズを問い合わせることができないためです (ウェブサーバがファイルを圧縮して提供する場合など)。

ファイルを開くことに失敗した場合、リクエストはエラーコード SFETCH_ERROR_FILE_NOT_FOUND で FAILED 状態に遷移します。

`FETCHING (IO thread)`

リクエストがFETCHING状態にある間、データはユーザー提供のバッファにロードされる。

バッファが提供されていない場合、リクエストはエラーコード SFETCH_ERROR_NO_BUFFER で FAILED 状態になります。

バッファが提供されたが、取得したデータを格納するには小さすぎる場合、 リクエストはエラーコード SFETCH_ERROR_BUFFER_TOO_SMALL を伴って FAILED ステートになります。

ファイルから読み込めるデータが予想より少ない場合、リクエストはエラーコード SFETCH_ERROR_UNEXPECTED_EOF で FAILED ステートとなります。

バッファへのデータロードが予想通りに行われた場合、リクエストは FETCHED 状態になります。

`FETCHED (user thread)`

リクエストは、ファイル全体が提供されたバッファにロードされたとき (request.chunk_size == 0のとき)、またはチャンクがバッファにロードされたとき (そしてオプションで解凍されたとき) にFETCHEDステートになります (request.chunk_size > 0のとき).

レスポンスコールバックは、ユーザーコードが次の sfetch_response_t 構造体のメンバを使用して読み込まれたデータを処理できるように呼び出されます。

- data.ptr: 取り出したデータの先頭を指すポインタ
- data.size: 提供されたバッファのバイト数
- data_offset: ファイル全体におけるロードされたデータチャンクのバイトオフセット（これはストリーミングシナリオにおいてのみ0以外の値に設定されます）。

すべてのファイルデータの読み込みが完了すると、レスポンスコールバックの sfetch_response_t 引数に 'finished' フラグが設定されます。

ユーザーコールバックが戻り、すべてのファイルデータがロードされた後 (response.finished フラグが設定された後)、リクエストは寿命に達し、リサイクルされます。

そうでなければ、ロードするデータがまだある場合 (ストリーミングがゼロでない request.chunk_size を提供することによって要求されたため)、リクエストはデータの次のチャンクをロードするために FETCHING 状態にスイッチバックします。

レスポンスコールバックで sfetch_bind_buffer() を呼び出すことで、異なるバッファやバッファサイズをリクエストに関連付けることができることに注意してください。

FETCHED 状態のレスポンスコールバックでチェックし、リクエストが終了したかどうかを独立に確認する。

```c
void response_callback(const sfetch_response_t* response) {
    if (response->fetched) {
        // request is in FETCHED state, the loaded data is available
        // in .data.ptr, and the number of bytes that have been
        // loaded in .data.size:
        const void* data = response->data.ptr;
        size_t num_bytes = response->data.size;
    }
    if (response->finished) {
        // the finished flag is set either when all data
        // has been loaded, the request has been cancelled,
        // or the file operation has failed, this is where
        // any required per-request cleanup work should happen
    }
}
```

`FAILED (user thread)`

次のような場合、リクエストはFAILED状態に遷移する。

- ファイルが存在しないか、その他の理由で開けなかった場合(SFETCH_ERROR_FILE_NOT_FOUND)
- FETCHING 状態のリクエストにバッファが関連付けられていない場合(SFETCH_ERROR_NO_BUFFER)
- 提供されたバッファが小さすぎてファイル全体を保持できない場合 (request.chunk_size == 0 の場合)、または (解凍された可能性のある) 部分データチャンクを保持できない場合 (SFETCH_ERROR_BUFFER_TOO_SMALL の場合)。
- ファイルから読み込めたバイト数が予想より少なかった場合(SFETCH_ERROR_UNEXPECTED_EOF)
- sfetch_cancel() でキャンセルされた場合(SFETCH_ERROR_CANCELLED)

レスポンスコールバックは、リクエストが FAILED 状態になった後に、 'response->finished' と 'response->failed' フラグを true に設定して一度だけ呼ばれることになる。

これは、ユーザーコードにリクエストに関連するリソースをクリーンアップする機会を与える。

レスポンスコールバックでfailed状態を確認するには、以下のようにします。

```c
void response_callback(const sfetch_response_t* response) {
    if (response->failed) {
        // specifically check for the failed state...
    }
    // or you can do a catch-all check via the finished-flag:
    if (response->finished) {
        if (response->failed) {
            // if more detailed error handling is needed:
            switch (response->error_code) {
                ...
            }
        }
    }
}
```

`PAUSED (user thread)`

ユーザーコードがリクエストのハンドル上で関数 sfetch_pause() を呼び出した後、リクエストは PAUSED 状態に移行します。通常、これはストリーミングのシナリオで、データのストリーミングがデータデコーダ(ビデオ/オーディオプレーヤーのような)に追いつくのを待つ必要があるときに、レスポンスコールバックの中で起こります。

リクエストが PAUSED 状態である間、レスポンスコールバックはそれぞれの sfetch_dowork() の中で呼び出され、ユーザーコードは sfetch_continue() を呼ぶことでリクエストを継続するか、sfetch_cancel() を呼ぶことでリクエストをキャンセルできるようになります。

一時停止したリクエストで sfetch_continue() を呼び出すとき、リクエストは FETCHING 状態に遷移します。そうでなければ sfetch_cancel() が呼ばれた場合、リクエストは FAILED ステートに切り替わります。

レスポンスコールバックで PAUSED 状態を確認するには。

```c
void response_callback(const sfetch_response_t* response) {
    if (response->paused) {
        // we can check here whether the request should
        // continue to load data:
        if (should_continue(response->handle)) {
            sfetch_continue(response->handle);
        }
    }
}
```

## チャンクサイズとhttp圧縮

なぜなら、ウェブサーバはデータを圧縮して提供することを決定し、チャンクサイズは「圧縮バイト」で与えられなければならず、バッファは「非圧縮バイト」を受け取るからです。HTTP では、圧縮されたダウンロードが終了するまで、その圧縮されていないサイズを問い合わせることはできません。

vanilla HTTP では、最初にファイル全体をダウンロードしなければ、ファイルの実際のサイズを問い合わせることはできません (Content-Length レスポンスヘッダは圧縮されたサイズのみを提供します)。さらに、HTTP の範囲指定リクエストでは、範囲は圧縮されたデータで指定され、圧縮されていないデータでは指定されません。したがって、もしウェブサーバがデータを圧縮してサーバに送ることに決めた場合、content-length と range-request のパラメータは sokol-fetch バッファに到着した圧縮されていないデータに対応せず、JS や WASM からは (Accept-Encoding フィールドを設定するなどして) 圧縮されていないダウンロードを強制したり、圧縮データにアクセスする方法がなくなります。

これはsokol_fetch.hにいくつかの影響を与えます。最も重要なことは、データが実際にダウンロードされる前にHTTPからそのサイズを問い合わせることができないので、バッファが正確に正しいサイズで提供されないということです。

ファイル全体を一度にダウンロードする場合、基本的には他の手段 (例えば、読み込む必要がある各ファイルのファイルサイズと他のメタデータを含む別のメタデータファイル) によって前もって最大ファイルサイズを知っておくことが期待されます。

ストリーミングダウンロードの場合、状況はもう少し複雑になります。これらはHTTP range-requestsを使用し、これらの範囲はJS/WASM側がアクセスできない（潜在的な）圧縮データ上で定義されます。しかし、JS/WASM側は圧縮されていないデータしか見ておらず、範囲要求が終了する前にその圧縮されていないサイズを問い合わせることはできません。

もし提供されたバッファが小さすぎて圧縮されていないデータを格納できない場合は、エラーコード SFETCH_ERROR_BUFFER_TOO_SMALL でリクエストは失敗します。


## チャネルとレーン

チャネルとレーンは、並列化、優先順位付け、レート制限を管理するための（やや人工的な）概念です。

ユーザーコードは、他のリクエストと並行して実行する必要があるストリーミングダウンロード用に1つのチャンネルを予約し、別のチャンネルを「通常の」ダウンロード用に、さらに別の優先度の高いチャンネルをすぐに読み込みを開始する必要がある小さなファイル用にのみ使用することができます。

各チャンネルには、独自の IO スレッドと、スレッドにメッセージを出し入れするためのメッセージキューが付属しています。リクエストが処理されるチャンネルは、メッセージの送信時に手動で選択されます。

```c
sfetch_send(&(sfetch_request_t){
    .path = "my_file.txt",
    .callback = my_response_callback,
    .channel = 2
});
```

チャンネル数は、起動時に sfetch_setup() で設定され、その後変更することはできない。

チャンネルは互いに完全に分離しており、 リクエストがあるチャンネルから別のチャンネルに "ホップ" することは決してありません。

各チャンネルは、自動的な速度制限のための固定数の "レーン" で構成されています。

リクエストが sfetch_send() によってチャネルに送られると、 「空きレーン」が選ばれ、リクエストに割り当てられます。リクエストが sfetch_send() によってチャネルに送られると、「空きレーン」が選ばれてリクエストに割り当てられます。リクエストは、そのライフタイム全体にわたって (一時停止している間も) このレーンを占有します。もしチャネルのすべてのレーンが占有されている場合、新しいリクエストはレーンが空くまで待つ必要があります。

チャンネルとレーンの数は前もってわかっているので、一度に「num_channels * num_lanes」を超える数のリクエストがフライトすることはないことが保証されています。

この保証により、短時間に多くのリクエストが送られたときに、 予期せぬ負荷やメモリスパイクを排除することができ、 sokol-fetch コンテキストの「寿命」全体にわたって再利用できる 固定数のメモリバッファをあらかじめ割り当てることができます。

最も単純なシナリオは、最大ファイルサイズがわかっている場合です。
はこのように静的に割り当てることができます。

```c
uint8_t buffer[NUM_CHANNELS][NUM_LANES][MAX_FILE_SIZE];
```

そして、ユーザーコールバックで、チャンネルとレーンによってバッファを選び、次のようにリクエストに関連付けます。

```c
void response_callback(const sfetch_response_t* response) {
    if (response->dispatched) {
        void* ptr = buffer[response->channel][response->lane];
        sfetch_bind_buffer(response->handle, ptr, MAX_FILE_SIZE);
    }
    ...
}
```

## パイプラインのレイテンシとスループットを最適化するための注意事項

1チャンネル1レーンというデフォルトの構成では、sokol_fetch.hは複数のファイルを読み込むと、衝撃的なほど読み込み性能が悪くなるようです。

これには2つの理由があります。

(1) データを読み込む際のすべての並列化が無効になりました。新しいリクエストは、最後のリクエストが終了したときにのみ処理されます。

(2) コールバックは sfetch_dowork() の中からしか呼ばれないので、レスポンスコールバックの呼び出しはリクエストに1フレームのレイテンシーを追加します。

sokol-fetchは、ステップ(2)を改善し、リクエストの「固有の待ち時間」を減らすために、いくつかのショートカットを使っています。

- バッファが前もって提供されている場合、応答コールバックは DISPATCHED 状態では呼ばれず、データがすでにバッファに読み込まれた FETCHED 状態から開始されます。
- ロードが終了した（またはリクエストが失敗した）ときにコールバックが別途呼び出されるCLOSED状態はなく、代わりにfinishedとfailedフラグが最後のFETCHED呼び出しの一部として設定されます。

つまり、ファイル全体を収めるのに十分な大きさのバッファを提供することが最良のケースで、レスポンスコールバックは一度だけ、理想的には次のフレームで呼ばれます (または sfetch_dowork() を 2 回呼び出します)。

バッファが前もって提供されない場合、ユーザー コードがバッファをバインドできるように、応答コールバックが DISPATCHED 状態で呼び出される必要があるため、1 フレームの遅延が追加されます。

これは、前もって提供されたバッファを持たないリクエストの最良のケースは、2フレーム（または sfetch_dowork() の3回の呼び出し）であることを意味します。

単一のリクエストのレイテンシを改善するためにできることはこれくらいですが、本当に重要なステップは全体のスループットを改善することです。何千ものファイルをロードする必要がある場合、それが完全にシリアライズされることを望んではいません。

スループットを向上させるための最も重要なアクションは、チャネルあたりのレーン数を増やすことです。これは、1つのチャネルで同時にいくつのリクエストが「飛行中」になるかを定義します。どれだけのレーン数が「余裕」あるかの指針となる決定要因は、バッファ用に確保したいメモリサイズです。各レーンは、あるリクエストのためにロードされたデータが、別のリクエストのためにロードされたデータの上に走り回ることがないように、それ自身のバッファを必要とします。

ここでは、1、2、4 のレーンを持つチャンネルで、アップフロントバッファなしで 4 つのリクエストを送信する簡単な例を示します（各行は 1 フレームです）。

1 LANE (8フレーム):

    Lane 0:
    -------------
    REQ 0 DISPATCHED
    REQ 0 FETCHED
    REQ 1 DISPATCHED
    REQ 1 FETCHED
    REQ 2 DISPATCHED
    REQ 2 FETCHED
    REQ 3 DISPATCHED
    REQ 3 FETCHED

リクエストは重ならないので、すべて同じバッファを使用することができることに注意してください。

2 LANES (4 frames):

    Lane 0:             Lane 1:
    ------------------------------------
    REQ 0 DISPATCHED    REQ 1 DISPATCHED
    REQ 0 FETCHED       REQ 1 FETCHED
    REQ 2 DISPATCHED    REQ 3 DISPATCHED
    REQ 2 FETCHED       REQ 3 FETCHED


これにより、全体の時間は4フレームに短縮されますが、要求がお互いに走り書きしないように、2つのバッファが必要になります。

4 LANES (2 frames):

    Lane 0:             Lane 1:             Lane 2:             Lane 3:
    ----------------------------------------------------------------------------
    REQ 0 DISPATCHED    REQ 1 DISPATCHED    REQ 2 DISPATCHED    REQ 3 DISPATCHED
    REQ 0 FETCHED       REQ 1 FETCHED       REQ 2 FETCHED       REQ 3 FETCHED

これで、1つのリクエストを送るのと同じ「最良の場合」のレイテンシになりました。

ストリーミングバッファのメモリ要件 (これはあなたの制御下にあります) を除けば、レーン数には十分な余裕があり、処理のオーバーヘッドを追加することはありません。

レイテンシーとスループットを調整するための最後のオプションは、チャネルです。各チャンネルは他のチャンネルから独立して動作します。したがって、あるチャンネルが大量のリクエスト（または非常に長いストリーミングのダウンロード）を処理するのに忙しくても、できるだけ早く開始する必要があるリクエストのために優先度の高いチャンネルを確保することが可能です。

スレッドサポートのあるプラットフォームでは、各チャンネルはそれ自身のスレッドで実行されますが、これは主に従来のファイル IO 関数のブロッキングを回避するための実装の詳細であり、パフォーマンスの理由ではありません。


## メモリ割り当てオーバーライド

このように初期化時にメモリ割り当て関数をオーバーライドすることができます。

```c
void* my_alloc(size_t size, void* user_data) {
    return malloc(size);
}

void my_free(void* ptr, void* user_data) {
    free(ptr);
}

...
    sfetch_setup(&(sfetch_desc_t){
        // ...
        .allocator = {
            .alloc = my_alloc,
            .free = my_free,
            .user_data = ...,
        }
    });
...
```

オーバーライドが提供されない場合、malloc と free が使用されます。

しかし、これは sokol_fetch.h 自身が行うメモリ割り当ての呼び出しにのみ影響し、 OS ライブラリでの割り当ては影響しません。

メモリ割り当ては sfetch_setup() が呼ばれたのと同じスレッドでのみ行われるので、スレッドセーフについて心配する必要はありません。


## ログ関数オーバーライド

このように初期化時にログ関数をオーバーライドすることができます。

```c
void my_log(const char* message, void* user_data) {
    printf("sfetch says: \s\n", message);
}

...
    sfetch_setup(&(sfetch_desc_t){
        // ...
        .logger = {
            .log_cb = my_log,
            .user_data = ...,
        }
    });
...
```

オーバーライドが提供されない場合、ほとんどのプラットフォームでputsが使用されます。Android では、代わりに __android_log_write が使用されます。


## 将来計画／V2.0アイデアダンプ

- オプションのポーリングAPI(コールバックAPIの代わり)
- バッファ管理をAPIに移行する？バッファ管理のためのAPIサポートは、リクエストが互いのバッファを走り回るのを防いだり、動的に割り当てられたバッファの自動ガベージコレクションや、静的バッファのサイズが十分でない場合に自動的に動的割り当てにフォールバックするなどのケースを単純化します。
- 他の「ソース」からデータをロードするためのプラグイン可能なリクエストハンドラ (特に libcurl などによるネイティブプラットフォームでの HTTP ダウンロードが便利です)
- ユーザーデータブロックの扱いに不満があります。ユーザーデータの取得と更新はAPI関数でラップされるべきです（バインド/アンバインドバッファのようなものです）。


## LICENSE

zlib/libpng license

Copyright (c) 2019 Andre Weissflog

This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from the
use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

    1. The origin of this software must not be misrepresented; you must not
    claim that you wrote the original software. If you use this software in a
    product, an acknowledgment in the product documentation would be
    appreciated but is not required.

    2. Altered source versions must be plainly marked as such, and must not
    be misrepresented as being the original software.

    3. This notice may not be removed or altered from any source
    distribution.