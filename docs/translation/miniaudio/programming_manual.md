# プログラミング・マニュアル

[[TOC]]

## 1. はじめに

miniaudioは、オーディオの再生とキャプチャのためのシングルファイルライブラリです。使用するには、以下のように1つの.cファイルに記述します：

```c
#define MINIAUDIO_IMPLEMENTATION
#include "miniaudio.h"
```

他の部分のプログラムでも、通常のヘッダーと同様に`#include "miniaudio.h"`と記述することができます。

miniaudioには、低レベルAPIと高レベルAPIの両方が含まれています。低レベルAPIは、自分でミキシングをすべて行いたい人や、基盤となるオーディオデバイスに軽量なインターフェースを求める人に適しています。一方、高レベルAPIは、複雑なミキシングやエフェクトの要件がある人に適しています。

miniaudioでは、オブジェクトは透明な構造体です。他の多くのライブラリとは異なり、不透明なオブジェクトへのハンドルはありません。そのため、オブジェクトのメモリを自分で確保する必要があります。このドキュメントに示されている例では、オブジェクトがスタック上に宣言されていることがよくあります。これらの例を自分のコードに翻訳する際には、オブジェクトを誤ってスタック上に宣言してしまい、関数が戻ると無効になってしまわないよう注意が必要です。また、オブジェクトのメモリアドレスがその寿命中ずっと同じであることを確保しなければなりません。したがって、オブジェクトのコピーを作成することはできません。

ライブラリ全体で、config/initパターンが使用されています。このパターンは、configオブジェクトを設定し、それを初期化ルーチンに渡すというものです。このシステムの利点は、configオブジェクトを論理的なデフォルト値で初期化し、新しいプロパティを追加してもAPIを壊さないことです。configオブジェクトはスタック上に確保することができ、対応するオブジェクトの初期化後に保持する必要はありません。

### 1.1. 低レベルAPI

低レベルAPIでは、オーディオデバイスの生のオーディオデータにアクセスできます。再生、キャプチャ、全二重通信、およびループバック（WASAPIのみ）をサポートしています。デバイスを列挙して、接続したい物理デバイスを特定できます。

低レベルAPIでは、物理デバイスの抽象化として「デバイス」の概念を使用します。このアイデアは、オーディオを発するまたはキャプチャする物理デバイスを選択し、miniaudioが指示する際にデバイスにデータを送受信するというものです。データはデバイスに対して、初期化時に指定するコールバックを通じて非同期に送受信されます。

デバイスを初期化する際には、まずそれを構成する必要があります。デバイス構成では、コールバックを通じて提供されるデータの形式、内部バッファのサイズ、およびオーディオを発するまたはキャプチャするデバイスのIDなどを指定できます。

デバイス構成を設定したら、デバイスを初期化できます。デバイスを初期化する際には、事前にデバイスオブジェクトのメモリを割り当てる必要があります。これにより、アプリケーションはメモリの割り当て方法を完全に制御できます。以下の例では、スタック上に再生デバイスを初期化していますが、状況に応じてヒープに割り当てることもできます。

```c
void data_callback(ma_device* pDevice, void* pOutput, const void* pInput, ma_uint32 frameCount)
{
    // 再生モードではデータをpOutputにコピーします。キャプチャモードではpInputからデータを読み取ります。
    // 全二重モードでは、pOutputとpInputの両方が有効になり、pInputからpOutputにデータを移動できます。
    // frameCount以上のフレームを処理しないようにしてください。
}

int main()
{
    ma_device_config config = ma_device_config_init(ma_device_type_playback);
    config.playback.format   = ma_format_f32;   // デバイスのネイティブフォーマットを使用するにはma_format_unknownを設定します。
    config.playback.channels = 2;               // デバイスのネイティブチャンネル数を使用するには0を設定します。
    config.sampleRate        = 48000;           // デバイスのネイティブサンプルレートを使用するには0を設定します。
    config.dataCallback      = data_callback;   // miniaudioがデータを必要とするときにこの関数が呼び出されます。
    config.pUserData         = pMyCustomData;   // デバイスオブジェクト（device.pUserData）からアクセスできます。

    ma_device device;
    if (ma_device_init(NULL, &config, &device) != MA_SUCCESS) {
        return -1;  // デバイスの初期化に失敗しました。
    }

    ma_device_start(&device);     // デバイスはデフォルトでスリープ状態なので、手動で起動する必要があります。

    // ここで何かを実行します。おそらくプログラムのメインループです。

    ma_device_uninit(&device);
    return 0;
}
```
上記の例では、`data_callback()`がデバイスからオーディオデータを読み書きする場所です。再生モードでは、出力バッファ（例では`pOutput`）にオーディオデータを書き込むことでスピーカーから音を出します。キャプチャモードでは、入力バッファ（`pInput`）からデータを読み取り、マイクロフォンでキャプチャされた音を抽出します。`frameCount`パラメータは、出力バッファに書き込めるフレーム数と入力バッファから読み取れるフレーム数を示します。フレームとは、各チャンネルに対して1つのサンプルを指します。例えば、ステレオストリーム（2チャンネル）では、1フレームは2つのサンプル（左用と右用）です。チャンネル数はデバイス構成で定義され、各サンプルのバイトサイズはデバイス構成で指定されるサンプルフォーマットによって決まります。マルチチャンネルオーディオデータは常にインターリーブ形式で、各フレームのサンプルがメモリ内で隣接して格納されます。例えば、ステレオストリームでは、最初のペアのサンプルが最初のフレームの左と右のサンプル、次のペアが2番目のフレームの左と右のサンプル、という具合です。

デバイスの構成は`ma_device_config`構造体で定義されます。構成オブジェクトは常に`ma_device_config_init()`で初期化されます。これにより、論理的なデフォルトで初期化され、新しいメンバーが`ma_device_config`構造体に追加されてもプログラムが壊れないようにします。上記の例では、比較的シンプルで標準的なデバイス構成を使用しています。`ma_device_config_init()`の呼び出しには1つのパラメータがあり、それはデバイスが再生、キャプチャ、デュプレックスまたはループバックデバイスかどうかを指定します（ループバックデバイスはすべてのバックエンドでサポートされているわけではありません）。`config.playback.format`メンバーはサンプルフォーマットを設定し、以下のいずれかになります（すべてのフォーマットはネイティブエンディアンです）：

|記号|説明|範囲|
|---|---|---|
|ma_format_f32|32ビット浮動小数点|[-1, 1]|
|ma_format_s16|16ビット符号付き整数|[-32768, 32767]|
|ma_format_s24|24ビット符号付き整数（タイトパック）|[-8388608, 8388607]|
|ma_format_s32|32ビット符号付き整数|[-2147483648, 2147483647]|
|ma_format_u8|8ビット符号なし整数|[0, 255]|

`config.playback.channels`メンバーは、デバイスで使用するチャンネル数を設定します。チャンネル数は`MA_MAX_CHANNELS`を超えることはできません。`config.sampleRate`メンバーはサンプルレートを設定し（フルデュプレックス構成では再生とキャプチャの両方で同じでなければなりません）、通常は44100または48000に設定されますが、任意の値に設定できます。ただし、8000から384000の間に保つことが推奨されます。

フォーマット、チャンネル数、およびサンプルレートをデフォルト値のままにすると、内部デバイスのネイティブ構成が使用されるため、miniaudioの自動データ変換のオーバーヘッドを回避したい場合に便利です。

サンプルフォーマット、チャンネル数、サンプルレートに加えて、データコールバックとユーザーデータポインタも構成を介して設定されます。ユーザーデータポインタはコールバックにパラメータとして渡されるのではなく、`ma_device`の`pUserData`メンバーに設定されます。これは、すべてのminiaudio構造体が透明であるため、直接アクセスできます。

デバイスの初期化は`ma_device_init()`で行います。これにより、何か問題があれば結果コードが返されます。成功した場合は`MA_SUCCESS`が返されます。初期化が完了すると、デバイスは停止状態になります。起動するには`ma_device_start()`を使用します。デバイスの初期化解除はデバイスを停止させますが、上記の例が行っているように、`ma_device_stop()`でもデバイスを停止できます。デバイスを再開するには、単に再び`ma_device_start()`を呼び出します。コールバック内でデバイスを停止または起動しないことが重要です。これを行うとデッドロックが発生します。代わりに、デバイスを停止する必要があることを示す変数を設定するか、イベントをシグナルして、別のスレッドで処理します。以下のAPIはコールバック内で呼び出してはいけません：

```c
ma_device_init()
ma_device_init_ex()
ma_device_uninit()
ma_device_start()
ma_device_stop()
```

コールバック内でデバイスの初期化解除や再初期化を試みてはいけません。また、コールバック内でデバイスを停止および起動することも避けるべきです。他にも要件に応じてコールバック内で行うべきでないことがいくつかありますが、これはスレッドセーフの問題ではなく、リアルタイム処理の問題であり、この入門の範囲を超えています。

上記の例では再生デバイスの初期化を示していますが、キャプチャでも全く同じように機能します。設定時にデバイスタイプを`ma_device_type_playback`から`ma_device_type_capture`に変更するだけです。例えば次のようにします：

```c
ma_device_config config = ma_device_config_init(ma_device_type_capture);
config.capture.format   = MY_FORMAT;
config.capture.channels = MY_CHANNEL_COUNT;
```

データコールバック内では、入力バッファ（上記の例では`pInput`）からデータを読み取り、出力バッファはそのままにします（デバイスタイプが`ma_device_type_capture`に設定されている場合、出力バッファはNULLになります）。

以下は利用可能なデバイスタイプと、コールバック内でのバッファの扱い方です：

|デバイスタイプ|コールバックの動作|
|---|---|
|ma_device_type_playback|出力バッファに書き込み、入力バッファはそのまま。|
|ma_device_type_capture|入力バッファから読み取り、出力バッファはそのまま。|
|ma_device_type_duplex|入力バッファから読み取り、出力バッファに書き込み。|
|ma_device_type_loopback|入力バッファから読み取り、出力バッファはそのまま。|

上記の例では、サンプルフォーマットとチャンネル数が再生とキャプチャで別々に指定されていることに気づくでしょう。これは、フルデュプレックスシステムにおいて再生デバイスとキャプチャデバイスで異なるデータフォーマットをサポートするためです。例えば、モノラルストリーム（一つのチャンネル）としてオーディオデータをキャプチャし、ステレオスピーカーシステムに音を出力したい場合があります。フルデュプレックス構成で再生とキャプチャに異なるフォーマットを使用する場合は、自分でデータを変換する必要があります。これを助けるための関数が用意されており、それについては後で説明します。

上記の例では、接続する物理デバイスを指定していないため、オペレーティングシステムのデフォルトデバイスが使用されます。複数の物理デバイスが接続されていて、特定のデバイスを使用したい場合は、構成内でデバイスIDを指定する必要があります。以下のように設定します：

```c
config.playback.pDeviceID = pMyPlaybackDeviceID;    // 再生またはデュプレックスデバイスの場合のみ。
config.capture.pDeviceID = pMyCaptureDeviceID;      // キャプチャ、デュプレックス、またはループバックデバイスの場合のみ。
```

デバイスIDを取得するには、デバイス列挙を実行する必要があります。しかし、これは「コンテキスト」という新しい概念の使用を必要とします。概念的には、コンテキストはデバイスの上位に位置します。1つのコンテキストには多くのデバイスが属します。コンテキストの目的は、バックエンドをよりグローバルなレベルで表現し、個々のデバイスの範囲外の操作を実行することです。主に、バックエンドライブラリに対するランタイムリンクの実行、バックエンドの初期化、およびデバイスの列挙に使用されます。以下の例はデバイスを列挙する方法を示しています。

```c
ma_context context;
if (ma_context_init(NULL, 0, NULL, &context) != MA_SUCCESS) {
    // エラー。
}

ma_device_info* pPlaybackInfos;
ma_uint32 playbackCount;
ma_device_info* pCaptureInfos;
ma_uint32 captureCount;
if (ma_context_get_devices(&context, &pPlaybackInfos, &playbackCount, &pCaptureInfos, &captureCount) != MA_SUCCESS) {
    // エラー。
}

// 各デバイス情報をループ処理し、何らかの操作を行います。ここでは、インデックスと共に名前を印刷しています。
// ユーザーにどのデバイスを使用するか選択させることができます。
for (ma_uint32 iDevice = 0; iDevice < playbackCount; iDevice += 1) {
    printf("%d - %s\n", iDevice, pPlaybackInfos[iDevice].name);
}

ma_device_config config = ma_device_config_init(ma_device_type_playback);
config.playback.pDeviceID = &pPlaybackInfos[chosenPlaybackDeviceIndex].id;
config.playback.format    = MY_FORMAT;
config.playback.channels  = MY_CHANNEL_COUNT;
config.sampleRate         = MY_SAMPLE_RATE;
config.dataCallback       = data_callback;
config.pUserData          = pMyCustomData;

ma_device device;
if (ma_device_init(&context, &config, &device) != MA_SUCCESS) {
    // エラー。
}

...

ma_device_uninit(&device);
ma_context_uninit(&context);
```

この例で最初に行うことは、`ma_context_init()`を使用して`ma_context`オブジェクトを初期化することです。最初のパラメータは`ma_backend`値のリストへのポインタで、デフォルトのバックエンド優先順位を上書きするために使用されます。この例のようにNULLの場合、miniaudioのデフォルト優先順位が使用されます。2番目のパラメータは、最初のパラメータが指す配列にリストされているバックエンドの数です。3番目のパラメータは`ma_context_config`オブジェクトへのポインタで、NULLにするとデフォルト値が使用されます。コンテキスト構成は、ログコールバック、カスタムメモリ割り当てコールバック、ユーザー定義データ、および一部のバックエンド固有の構成を設定するために使用されます。

コンテキストを初期化すると、デバイスを列挙できます。上記の例では、よりシンプルな`ma_context_get_devices()`を使用していますが、`ma_context_enumerate_devices()`を使用してデバイスを処理するコールバックを使用することもできます。`ma_context_get_devices()`を使用する場合、出力時にma_device_info構造体のリストを含むバッファへのポインタが設定されるポインタを提供します。また、返されたバッファ内の項目数を受け取るunsigned integerへのポインタも提供します。返されたバッファはminiaudioが内部でメモリ管理を行うため、自分で解放しないでください。

`ma_device_info`構造体には、デバイス構成に渡すIDである`id`メンバーが含まれています。また、UIを介してユーザーにデバイスのリストを提示するのに役立つデバイス名も含まれています。

自分のコンテキストを作成する場合、デバイスを初期化するときにそれを`ma_device_init()`に渡します。最初の例のようにNULLを渡すと、miniaudioがコンテキストを作成しますが、既にコンテキストを作成している場合はそれを避けたいでしょう。内部的にコンテキストはそのポインタによってのみ追跡されるため、`ma_context`オブジェクトの位置を変更してはいけません。もしこれが問題になる場合は、`malloc()`を使用してコンテキストのメモリを確保することを検討してください。

### 1.2. 高レベルAPI

高レベルAPIは主に次の3つの部分から構成されています：

- サウンドの読み込みとストリーミングのためのリソース管理
- 高度なミキシングとエフェクト処理のためのノードグラフ
- リソースマネージャーとノードグラフをラップする高レベル「エンジン」

リソースマネージャー（`ma_resource_manager`）は、サウンドの読み込みに使用されます。完全にメモリにサウンドを読み込むことや、ストリーミングをサポートしています。また、参照カウントを処理し、同じサウンドが複数回読み込まれるのを防ぎます。

ノードグラフはミキシングとエフェクト処理に使用されます。アイデアとしては、各ノードの出力を別のノードの入力に接続することで、複数のノードをグラフに接続します。各ノードは独自のエフェクトを実装できます。ノードを連鎖させることで、高度なミキシングとエフェクト処理が可能になります。

エンジンはリソースマネージャーとノードグラフの両方をカプセル化して、シンプルで使いやすい高レベルAPIを提供します。リソースマネージャーとノードグラフのAPIについては、このマニュアルの後のセクションで詳しく説明します。

以下のコードは、デフォルトの構成を使用してエンジンを初期化する方法を示しています。

```c
ma_result result;
ma_engine engine;

result = ma_engine_init(NULL, &engine);
if (result != MA_SUCCESS) {
    return result;  // エンジンの初期化に失敗しました。
}
```

これはエンジンインスタンスを作成し、内部的にデバイスを初期化します。このデバイスには`ma_engine_get_device()`を使用してアクセスできます。また、リソースマネージャーも初期化され、`ma_engine_get_resource_manager()`を使用してアクセスできます。エンジン自体はノードグラフ（`ma_node_graph`）であるため、エンジンオブジェクトへのポインタを任意の`ma_node_graph` APIにキャストして渡すことができます。代わりに、キャストの代わりに`ma_engine_get_node_graph()`を使用することもできます。

miniaudioのすべてのオブジェクト、上記の例にある`ma_engine`オブジェクトを含む、は透明な構造体です。miniaudioには不透明な構造体へのハンドルはありませんので、それらをどのように宣言するかに注意が必要です。上記の例ではスタック上に宣言していますが、これでは関数が戻ると構造体が無効になります。エンジンをヒープに割り当てる方が適切な場合、標準の`malloc()`呼び出しや好きなヒープ割り当てルーチンを使用して簡単に行えます：

```c
ma_engine* pEngine = malloc(sizeof(*pEngine));
```

`ma_engine` APIはminiaudio全体で使用されるconfig/initパターンを使用しています。エンジンを構成するには、`ma_engine_config`オブジェクトに記入し、それを`ma_engine_init()`の最初のパラメータに渡します：

```c
ma_result result;
ma_engine engine;
ma_engine_config engineConfig;

engineConfig = ma_engine_config_init();
engineConfig.pResourceManager = &myCustomResourceManager;   // <-- 前の段階で初期化されたもの。

result = ma_engine_init(&engineConfig, &engine);
if (result != MA_SUCCESS) {
    return result;
}
```

これにより、カスタム設定を使用してエンジンインスタンスが作成されます。この例では、エンジンが内部的にリソースマネージャを初期化するのではなく、カスタムリソースマネージャを指定する方法を示しています。これは、複数のエンジンが同じリソースマネージャを共有したい場合に特に便利です。

エンジンは不要になったときに`ma_engine_uninit()`で初期化解除する必要があります。

デフォルトではエンジンは開始されますが、サウンドが初期化されていないため何も再生されません。最も簡単で柔軟性のないサウンド再生方法は次のようになります：

```c
ma_engine_play_sound(&engine, "my_sound.wav", NULL);
```

これは、miniaudioが「インライン」サウンドと呼ぶものを再生します。この方法では、サウンドは一度再生され、その後内部サウンドはリサイクルのために準備されます。最後のパラメータはサウンドが関連付けられるサウンドグループを指定するために使用されますが、これは後で説明します。この方法は簡単ですが、柔軟性と機能に欠けます。より柔軟な方法は、最初にサウンドを初期化することです：

```c
ma_result result;
ma_sound sound;

result = ma_sound_init_from_file(&engine, "my_sound.wav", 0, NULL, NULL, &sound);
if (result != MA_SUCCESS) {
    return result;
}

ma_sound_start(&sound);
```

これは指定されたサウンドファイルの単一インスタンスを表す`ma_sound`オブジェクトを返します。同じファイルを同時に複数回再生したい場合、インスタンスごとにサウンドを作成する必要があります。

サウンドは`ma_sound_uninit()`で初期化解除する必要があります。

サウンドはデフォルトでは開始されません。`ma_sound_start()`でサウンドを開始し、`ma_sound_stop()`で停止します。サウンドが停止されても最初に巻き戻されることはありません。サウンドの最初に戻るには、`ma_sound_seek_to_pcm_frame(&sound, 0)`を使用します。デフォルトでは、サウンドの開始と停止は即時に行われますが、特定の時間にサウンドを開始または停止するようにスケジュールすることが便利な場合があります。これは次の関数を使用して行えます：

```c
ma_sound_set_start_time_in_pcm_frames()
ma_sound_set_start_time_in_milliseconds()
ma_sound_set_stop_time_in_pcm_frames()
ma_sound_set_stop_time_in_milliseconds()
```

開始/停止時間はエンジンによって制御される絶対タイマーに基づいて指定する必要があります。現在のグローバルタイム（PCMフレーム単位）は`ma_engine_get_time_in_pcm_frames()`で取得できます。必要に応じて、同期目的のためにエンジンのグローバルタイムを`ma_engine_set_time_in_pcm_frames()`で変更できます。開始時間をスケジュールするには、明示的に`ma_sound_start()`を呼び出す必要があります：

```c
ma_sound_set_start_time_in_pcm_frames(&sound, ma_engine_get_time_in_pcm_frames(&engine) + (ma_engine_get_sample_rate(&engine) * 2));
ma_sound_start(&sound);
```

`ma_sound_init_from_file()`の第3パラメータは、サウンドの読み込み方法とそのサウンドの機能を制御するフラグのセットです。デフォルトでは、サウンドはファイルシステムから完全にメモリに同期的に読み込まれ、デコードは行われません。サウンドをメモリに格納する前にデコードしたい場合は、`MA_SOUND_FLAG_DECODE`フラグを指定する必要があります。これは、ロード段階などの早い段階でデコードのコストを負担したい場合に便利です。このオプションを指定しない場合、デコードはミキシング時に動的に行われ、オーディオスレッドで高コストになる可能性があります。

サウンドを非同期で読み込みたい場合は、`MA_SOUND_FLAG_ASYNC`フラグを指定できます。これにより、`ma_sound_init_from_file()`はすぐに戻りますが、サウンドがデコードされるまで再生は開始されません。

第4パラメータはサウンドグループへのポインタです。サウンドグループは、エフェクト処理とボリュームコントロールを持つグループにサウンドを整理するためのメカニズムです。例として、ゲームでは効果音（sfx）、ボイス、音楽に別々のグループを持つことがあります。これらの各グループは独立したボリュームコントロールを持ちます。サウンドグループを初期化するには、`ma_sound_group_init()`または`ma_sound_group_init_ex()`を使用します。

サウンドとサウンドグループはエンジンのノードグラフ内のノードであり、任意の`ma_node` APIに接続できます。これにより、サウンドとサウンドグループをエフェクトノードに接続して複雑なエフェクトチェーンを作成することが可能になります。

サウンドのボリュームは`ma_sound_set_volume()`で変更できます。デシベルボリュームコントロールを好む場合は、`ma_volume_db_to_linear()`を使用してデシベル表現からリニア表現に変換できます。

パンニングとピッチングは`ma_sound_set_pan()`と`ma_sound_set_pitch()`でサポートされています。サウンドのピッチが`ma_sound_set_pitch()`やドップラー効果で変更されることがない場合、最適化のためにサウンドの初期化時に`MA_SOUND_FLAG_NO_PITCH`フラグを指定できます。

デフォルトでは、サウンドとサウンドグループには空間化（スペーシャライゼーション）が有効になっています。サウンドを空間化したくない場合は、`MA_SOUND_FLAG_NO_SPATIALIZATION`フラグを指定してサウンドを初期化します。空間化モデルは比較的シンプルで、機能面ではOpenALとほぼ同等です。HRTF（頭部伝達関数）や環境閉塞は現在サポートされていませんが、将来的には計画されています。サポートされている機能には以下が含まれます：

- サウンドとリスナーの位置と向きの制御（コーンを使用）
- 減衰モデル：なし、逆数、線形、指数
- ドップラー効果

サウンドは`ma_sound_set_fade_in_pcm_frames()`を使用してフェードインおよびフェードアウトさせることができます。

サウンドが現在再生中かどうかを確認するには、`ma_sound_is_playing()`を使用します。サウンドが終わりに到達しているかどうかを確認するには、`ma_sound_at_end()`を使用します。サウンドのループ再生は、`ma_sound_set_looping()`で制御できます。サウンドがループ再生されているかどうかを確認するには、`ma_sound_is_looping()`を使用します。

## 2. ビルド

miniaudioは、依存関係をダウンロードまたはインストールすることなく、そのまま動作するはずです。プラットフォーム固有の詳細については以下を参照してください。

GCCおよびClangでは、SIMD最適化のために`-msse2`, `-mavx2`などが必要です。

`__sync_val_compare_and_swap_8`, `__atomic_load_8`などの未定義の参照に関するエラーが発生した場合、`-latomic`でリンクする必要があります。

### 2.1. Windows

Windowsビルドは、すべての一般的なコンパイラでインクルードパスやライブラリのリンクを設定することなくクリーンにコンパイルされるはずです。

UWPビルドでは、`ActivateAudioInterfaceAsync()`の未解決外部シンボルに関するエラーが発生した場合、`mmdevapi.lib`とリンクする必要があります。

### 2.2. macOSおよびiOS

macOSビルドは、依存関係をダウンロードしたり、ライブラリやフレームワークにリンクしたりすることなくクリーンにコンパイルされるはずです。iOSビルドはObjective-Cとしてコンパイルされ、関連するフレームワークにリンクする必要がありますが、Xcodeでそのままクリーンにコンパイルされるはずです。コマンドラインからコンパイルする場合は、`-lpthread`および`-lm`とリンクする必要があります。

miniaudioがランタイムにフレームワークにリンクする方法のため、アプリケーションがAppleの公証プロセスに合格しない可能性があります。これを修正するためには、次の2つのオプションがあります。1つ目は、以下のように`MA_NO_RUNTIME_LINKING`オプションを使用する方法です：

```c
#ifdef __APPLE__
    #define MA_NO_RUNTIME_LINKING
#endif
#define MINIAUDIO_IMPLEMENTATION
#include "miniaudio.h"
```

これにより、`-framework CoreFoundation -framework CoreAudio -framework AudioToolbox`とリンクする必要があります。`AudioToolbox`に関するエラーが発生した場合は、代わりに`-framework AudioUnit`を試してください。これは、古いバージョンのiOSを使用している場合に発生する可能性があります。代替手段として、ランタイムリンクを継続して使用したい場合は、`entitlements.xcent`ファイルに次の内容を追加します：

```xml
<key>com.apple.security.cs.allow-dyld-environment-variables</key>
<true/>
<key>com.apple.security.cs.allow-unsigned-executable-memory</key>
<true/>
```

詳しくは、このディスカッションを参照してください：https://github.com/mackron/miniaudio/issues/203。

### 2.3. Linux

Linuxビルドでは、`-ldl`, `-lpthread`, `-lm`にリンクするだけで動作します。開発パッケージは必要ありません。32ビットARM向けにコンパイルする場合は、`-latomic`にリンクする必要があるかもしれません。

### 2.4. BSD

BSDビルドでは、`-lpthread`, `-lm`にリンクするだけで動作します。NetBSDはaudio(4)を使用し、OpenBSDはsndioを使用し、FreeBSDはOSSを使用します。32ビットARM向けにコンパイルする場合は、`-latomic`にリンクする必要があるかもしれません。

### 2.5. Android

Androidでは、AAudioが最優先のバックエンドです。これはコンパイラの設定なしでそのまま動作するはずです。AAudioのサポートはAndroid 8から始まるため、それ以前のバージョンではOpenSL|ESにフォールバックし、これはAPIレベル16以上が必要です。

一部のAndroidベースのデバイスで、`dlopen()`が「libOpenSLES.so」を開けないためにOpenSL|ESバックエンドが初期化に失敗するという報告があります。この問題が発生する場合は、`MA_NO_RUNTIME_LINKING`を使用してランタイムリンクを無効にし、`-lOpenSLES`とリンクする必要があります。

### 2.6. Emscripten

EmscriptenビルドはWeb Audio JavaScriptを直接出力し、そのままクリーンにコンパイルされるはずです。`-std=c*`コンパイラフラグや`-ansi`は使用できません。

AudioWorkletの使用を有効にするには、`MA_ENABLE_AUDIO_WORKLETS`を定義し、次のオプションでコンパイルします：

`AUDIO_WORKLET=1 -sWASM_WORKERS=1 -sASYNCIFY`

AudioWorkletサポートを有効にしてコンパイルする例は次のようになります：

```sh
emcc program.c -o bin/program.html -DMA_ENABLE_AUDIO_WORKLETS -sAUDIO_WORKLET=1 -sWASM_WORKERS=1 -sASYNCIFY
```

ローカルで実行するには、`emrun`を使用する必要があります：

```sh
emrun bin/program.html
```

### 2.7. ビルドオプション

以下のオプションを `miniaudio.h` をインクルードする前に `#define` してください。

|オプション|説明|
|---|---|
|MA_NO_WASAPI|WASAPI バックエンドを無効にします。|
|MA_NO_DSOUND|DirectSound バックエンドを無効にします。|
|MA_NO_WINMM|WinMM バックエンドを無効にします。|
|MA_NO_ALSA|ALSA バックエンドを無効にします。|
|MA_NO_PULSEAUDIO|PulseAudio バックエンドを無効にします。|
|MA_NO_JACK|JACK バックエンドを無効にします。|
|MA_NO_COREAUDIO|Core Audio バックエンドを無効にします。|
|MA_NO_SNDIO|sndio バックエンドを無効にします。|
|MA_NO_AUDIO4|audio(4) バックエンドを無効にします。|
|MA_NO_OSS|OSS バックエンドを無効にします。|
|MA_NO_AAUDIO|AAudio バックエンドを無効にします。|
|MA_NO_OPENSL|OpenSL バックエンドを無効にします。|
|MA_NO_WEBAUDIO|Web Audio バックエンドを無効にします。|
|MA_NO_NULL|null バックエンドを無効にします。|
|MA_ENABLE_ONLY_SPECIFIC_BACKENDS|デフォルトで全てのバックエンドを無効にし、特定のバックエンドを有効にするには MA_ENABLE_* を設定します。|
|MA_ENABLE_WASAPI|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して WASAPI バックエンドを有効にします。|
|MA_ENABLE_DSOUND|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して DirectSound バックエンドを有効にします。|
|MA_ENABLE_WINMM|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して WinMM バックエンドを有効にします。|
|MA_ENABLE_ALSA|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して ALSA バックエンドを有効にします。|
|MA_ENABLE_PULSEAUDIO|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して PulseAudio バックエンドを有効にします。|
|MA_ENABLE_JACK|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して JACK バックエンドを有効にします。|
|MA_ENABLE_COREAUDIO|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して Core Audio バックエンドを有効にします。|
|MA_ENABLE_SNDIO|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して sndio バックエンドを有効にします。|
|MA_ENABLE_AUDIO4|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して audio(4) バックエンドを有効にします。|
|MA_ENABLE_OSS|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して OSS バックエンドを有効にします。|
|MA_ENABLE_AAUDIO|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して AAudio バックエンドを有効にします。|
|MA_ENABLE_OPENSL|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して OpenSL バックエンドを有効にします。|
|MA_ENABLE_WEBAUDIO|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して Web Audio バックエンドを有効にします。|
|MA_ENABLE_NULL|MA_ENABLE_ONLY_SPECIFIC_BACKENDS と併用して null バックエンドを有効にします。|
|MA_NO_DECODING|デコードAPIを無効にします。|
|MA_NO_ENCODING|エンコードAPIを無効にします。|
|MA_NO_WAV|組み込みの WAV デコーダーとエンコーダーを無効にします。|
|MA_NO_FLAC|組み込みの FLAC デコーダーを無効にします。|
|MA_NO_MP3|組み込みの MP3 デコーダーを無効にします。|
|MA_NO_DEVICE_IO|再生と録音を無効にします。これにより、`ma_context` と `ma_device` API が無効になります。miniaudioのデータ変換および/またはデコードAPIのみを使用したい場合に便利です。|
|MA_NO_RESOURCE_MANAGER|リソースマネージャを無効にします。エンジンを使用する場合、次の関数も無効になります：`ma_sound_init_from_file()`, `ma_sound_init_from_file_w()`, `ma_sound_init_copy()`, `ma_engine_play_sound_ex()`, `ma_engine_play_sound()`。`ma_sound` オブジェクトを初期化する唯一の方法は、データソースから初期化することです。|
|MA_NO_NODE_GRAPH|ノードグラフAPIを無効にします。これにより、ノードグラフに依存するエンジンAPIも無効になります。|
|MA_NO_ENGINE|エンジンAPIを無効にします。|
|MA_NO_THREADING|`ma_thread`, `ma_mutex`, `ma_semaphore`, `ma_event` API を無効にします。このオプションは、データ変換、デコード、および/またはエンコードのためにのみ miniaudio を使用する場合に便利です。いくつかのAPIファミリーはスレッド化を必要とするため、次のオプションも設定する必要があります：`MA_NO_DEVICE_IO`。|
|MA_NO_GENERATION|`ma_waveform` や `ma_noise` のような生成APIを無効にします。|
|MA_NO_SSE2|SSE2最適化を無効にします。|
|MA_NO_AVX2|AVX2最適化を無効にします。|
|MA_NO_NEON|NEON最適化を無効にします。|
|MA_NO_RUNTIME_LINKING|ランタイムリンクを無効にします。これはAppleの公証プロセスを通過するために便利です。これを有効にすると、`timespec` や `timeval` データ型との競合によりコンパイルエラーが発生する可能性があるため、Linuxビルドで `-std=c89` や `-std=c99` の使用を避ける必要があります。ターゲットプラットフォームが `dlopen()` を介したランタイムリンクを許可しない場合にこれを有効にする必要があります。|
|MA_DEBUG_OUTPUT|デバッグログ（`MA_LOG_LEVEL_DEBUG`）の `printf()` 出力を有効にします。|
|MA_COINIT_VALUE|Windows専用。内部の `CoInitializeEx()` 呼び出しに渡す値。デフォルトは `COINIT_MULTITHREADED`。|
|MA_API|パブリックAPIの装飾方法を制御します。デフォルトは `extern`。|

## 3. 定義

このセクションでは、miniaudio全体で使用される一般的な用語を定義します。オーディオ分野では用語の使用に曖昧さがあることが多いため、ここではminiaudioが各用語をどのように使用しているかを明確にします。

### 3.1. サンプル

サンプルは、オーディオデータの単一単位です。サンプルフォーマットがf32の場合、1サンプルは1つの32ビット浮動小数点数です。

### 3.2. フレーム / PCMフレーム

フレームは、チャンネル数に等しい数のサンプルのグループです。例えば、ステレオストリームのフレームは2サンプル、モノラルフレームは1サンプル、5.1サラウンドサウンドフレームは6サンプルです。miniaudioでは「フレーム」と「PCMフレーム」は同じ意味です。これは圧縮フレームとは異なることに注意してください。miniaudioが圧縮フレーム（例えばFLACフレーム）を参照する必要がある場合は、必ず「FLACフレーム」のように明確にします。

### 3.3. チャンネル

スピーカーシステムの個々のスピーカーから出力される、またはマイクシステムの個々のマイクから受信されるモノラルオーディオのストリームです。ステレオストリームには2つのチャンネル（左チャンネルと右チャンネル）があり、5.1サラウンドサウンドシステムには6つのチャンネルがあります。一部のオーディオシステムでは、チャンネルを他のチャンネルとミックスして最終的なミックスを作成する複雑なオーディオストリームとして参照することがありますが、これはminiaudioの「チャンネル」という用語の使用法とは完全に異なり、混同しないでください。

### 3.4. サンプルレート

miniaudioにおけるサンプルレートは常にHzで表され、例えば44100、48000などです。これは、1秒あたりに処理されるPCMフレームの数を示します。

### 3.5. フォーマット

miniaudio全体で、さまざまなサンプルフォーマットが参照されます：

|記号|説明|範囲|
|---|---|---|
|ma_format_f32|32ビット浮動小数点|[-1, 1]|
|ma_format_s16|16ビット符号付き整数|[-32768, 32767]|
|ma_format_s24|24ビット符号付き整数（タイトパック）|[-8388608, 8388607]|
|ma_format_s32|32ビット符号付き整数|[-2147483648, 2147483647]|
|ma_format_u8|8ビット符号なし整数|[0, 255]|

すべてのフォーマットはネイティブエンディアンです。

## 4. データソース

miniaudioのデータソース抽象化は、何らかのソースからオーディオデータを取得するために使用されます。例としては、`ma_decoder`、`ma_noise`、`ma_waveform`などがあります。miniaudioの上位レベルの概念を理解するためには、データソースについて理解しておく必要があります。

`ma_data_source` APIは、データソースから読み取るための汎用インターフェースです。データソースインターフェースを実装する任意のオブジェクトは、任意の`ma_data_source`関数に接続できます。

データソースからデータを読み取るには、以下のようにします：

```c
ma_result result;
ma_uint64 framesRead;

result = ma_data_source_read_pcm_frames(pDataSource, pFramesOut, frameCount, &framesRead);
if (result != MA_SUCCESS) {
    return result;  // データソースからのデータ読み取りに失敗しました。
}
```

読み取られたフレーム数が必要ない場合は、`pFramesRead`パラメータにNULLを渡すことができます。この関数が要求されたフレーム数より少ない値を返す場合、それはファイルの終端に到達したことを意味します。読み取られたフレーム数が0の場合にのみ`MA_AT_END`が返されます。

`ma_data_source_init()`および`ma_data_source_uninit()`を除く任意のデータソース関数を呼び出す場合、データソースを実装する任意のオブジェクトを渡すことができます。例えば、デコーダを次のように接続できます：

```c
ma_result result;
ma_uint64 framesRead;
ma_decoder decoder;   // <-- これは ma_decoder_init_*() で初期化されます。

result = ma_data_source_read_pcm_frames(&decoder, pFramesOut, frameCount, &framesRead);
if (result != MA_SUCCESS) {
    return result;  // デコーダからのデータ読み取りに失敗しました。
}
```

前方にシークしたい場合は、`pFramesOut`パラメータにNULLを渡すことができます。あるいは、`ma_data_source_seek_pcm_frames()`を使用することもできます。

特定のPCMフレームにシークするには、次のようにします：

```c
result = ma_data_source_seek_to_pcm_frame(pDataSource, frameIndex);
if (result != MA_SUCCESS) {
    return result;  // PCMフレームへのシークに失敗しました。
}
```

データソースの全長をPCMフレームで取得することもできますが、ノイズや波形のように長さの概念がないデータソースや、一部のデコーダのように長さを決定する方法がないデータソースもあります。長さを取得するには、次のようにします：

```c
ma_uint64 length;

result = ma_data_source_get_length_in_pcm_frames(pDataSource, &length);
if (result != MA_SUCCESS) {
    return result;  // 長さの取得に失敗しました。
}
```

基礎となるデコーダが長さの不定なデータストリーム（インターネットラジオや放送など）からデータを引き出している場合、長さの取得には注意が必要です。この場合、`ma_data_source_get_length_in_pcm_frames()`が返ってこないことがあります。

カーソルの現在位置をPCMフレームで取得することもできます：

```c
ma_uint64 cursor;

result = ma_data_source_get_cursor_in_pcm_frames(pDataSource, &cursor);
if (result != MA_SUCCESS) {
    return result;  // カーソル位置の取得に失敗しました。
}
```

読み取り後に返されるデータ形式を知る必要があることがよくあります。これを取得するには次のようにします：

```c
ma_format format;
ma_uint32 channels;
ma_uint32 sampleRate;
ma_channel channelMap[MA_MAX_CHANNELS];

result = ma_data_source_get_data_format(pDataSource, &format, &channels, &sampleRate, channelMap, MA_MAX_CHANNELS);
if (result != MA_SUCCESS) {
    return result;  // データ形式の取得に失敗しました。
}
```

特定のデータ形式プロパティが必要ない場合は、対応するパラメータにNULLを渡します。

基礎となるデータの特定の範囲内のみを読み取りたい場合は、範囲を使用できます：

```c
result = ma_data_source_set_range_in_pcm_frames(pDataSource, rangeBegInFrames, rangeEndInFrames);
if (result != MA_SUCCESS) {
    return result;  // 範囲の設定に失敗しました。
}
```

これは、複数のサウンドが同じファイルに保存されているサウンドバンクがあり、そのうちの1つのサブサウンドだけをデータソースで再生したい場合に便利です。範囲が設定されると、カーソルやループポイントなどの位置を取るすべてのものは、常に範囲の開始から相対的に扱う必要があることに注意してください。範囲が設定されると、以前に定義されたループポイントはリセットされます。

カスタムループポイントもデータソースで使用できます。デフォルトでは、データソースはデータソースの終端に達した後にループしますが、特定の場所でループする必要がある場合は、次のようにします：

```c
result = ma_data_set_loop_point_in_pcm_frames(pDataSource, loopBegInFrames, loopEndInFrames);
if (result != MA_SUCCESS) {
    return result;  // ループポイントの設定に失敗しました。
}
```

ループポイントは現在の範囲に対して相対的です。

データソースを連結してシームレスな移行を実現することが有用な場合があります。これを行うには、連結を使用します：

```c
ma_decoder decoder1;
ma_decoder decoder2;

// ... デコーダを ma_decoder_init_*() で初期化する ...

result = ma_data_source_set_next(&decoder1, &decoder2);
if (result != MA_SUCCESS) {
    return result;  // 次のデータソースの設定に失敗しました。
}

result = ma_data_source_read_pcm_frames(&decoder1, pFramesOut, frameCount, pFramesRead);
if (result != MA_SUCCESS) {
    return result;  // デコーダからの読み取りに失敗しました。
}
```

上記の例では、デコーダを使用しています。連結されたチェーンから読み取る場合は、常にチェーンの最上位のデータソースから読み取る必要があります。上記の例では、decoder1がチェーンの最上位のデータソースです。decoder1が終端に達すると、decoder2がシームレスに開始されます。

ループが有効な場合、ループされるのは現在のデータソースのみです。チェーン全体をループさせるには、次のようにループ内でリンクします：

```c
ma_data_source_set_next(&decoder1, &decoder2);  // decoder1 -> decoder2
ma_data_source_set_next(&decoder2, &decoder1);  // decoder2 -> decoder1（最初に戻るループ）。
```

チェーンの設定はスレッドセーフではないため、オーディオスレッドが読み取り中にリンクを動的に変更する場合は注意が必要です。

同じサウンドの複数のインスタンスを同時に再生するために、`ma_decoder_seek_to_pcm_frame()`を使用してデータソースを再利用する手段として使用しないでください。データソースの種類によっては非常に非効率であり、内部フィルタの状態の微妙な変化によってグリッチが発生する可能性があります。その代わりに、各インスタンスのために複数のデータソースを初期化してください。

### 4.1. カスタムデータソース

`ma_data_source_vtable`の関数を実装することでカスタムデータソースを実装できます。カスタムオブジェクトは、最初のメンバーとして`ma_data_source_base`を持つ必要があります：

```c
struct my_data_source
{
    ma_data_source_base base;
    ...
};
```

初期化ルーチンでは、ベースオブジェクト（`ma_data_source_base`）を設定するために`ma_data_source_init()`を呼び出す必要があります：

```c
static ma_result my_data_source_read(ma_data_source* pDataSource, void* pFramesOut, ma_uint64 frameCount, ma_uint64* pFramesRead)
{
    // ここでデータを読み取ります。出力は my_data_source_get_data_format() で返されるのと同じ形式にします。
}

static ma_result my_data_source_seek(ma_data_source* pDataSource, ma_uint64 frameIndex)
{
    // ここで特定のPCMフレームにシークします。シークがサポートされていない場合は MA_NOT_IMPLEMENTED を返します。
}

static ma_result my_data_source_get_data_format(ma_data_source* pDataSource, ma_format* pFormat, ma_uint32* pChannels, ma_uint32* pSampleRate, ma_channel* pChannelMap, size_t channelMapCap)
{
    // ここでデータの形式を返します。
}

static ma_result my_data_source_get_cursor(ma_data_source* pDataSource, ma_uint64* pCursor)
{
    // ここでカーソルの現在位置を取得します。カーソルの概念がない場合は MA_NOT_IMPLEMENTED を返し、*pCursor を 0 に設定します。
}

static ma_result my_data_source_get_length(ma_data_source* pDataSource, ma_uint64* pLength)
{
    // ここで長さをPCMフレーム単位で取得します。長さの概念がない場合や長さが不明な場合は MA_NOT_IMPLEMENTED を返し、*pLength を 0 に設定します。
}

static ma_data_source_vtable g_my_data_source_vtable =
{
    my_data_source_read,
    my_data_source_seek,
    my_data_source_get_data_format,
    my_data_source_get_cursor,
    my_data_source_get_length
};

ma_result my_data_source_init(my_data_source* pMyDataSource)
{
    ma_result result;
    ma_data_source_config baseConfig;

    baseConfig = ma_data_source_config_init();
    baseConfig.vtable = &g_my_data_source_vtable;

    result = ma_data_source_init(&baseConfig, &pMyDataSource->base);
    if (result != MA_SUCCESS) {
        return result;
    }

    // ... ここでカスタムデータソースの初期化を行います ...

    return MA_SUCCESS;
}

void my_data_source_uninit(my_data_source* pMyDataSource)
{
    // ... ここでカスタムデータソースの初期化解除を行います ...

    // ベースデータソースの初期化解除を行う必要があります。
    ma_data_source_uninit(&pMyDataSource->base);
}
```

`ma_data_source_init()`と`ma_data_source_uninit()`はカスタムデータソースの外部で直接呼び出されることはありません。これらの関数はカスタムデータソース自体がその初期化/解除関数内で呼び出す必要があります。

## 5. エンジン

`ma_engine` APIは、サウンドとエフェクト処理を管理およびミキシングするための高レベルAPIです。`ma_engine`オブジェクトはリソースマネージャーとノードグラフをカプセル化しており、これらについては後で詳しく説明します。

サウンドは`ma_sound`と呼ばれ、エンジンから作成されます。サウンドは`ma_sound_group`というミキシンググループに関連付けることができ、これもエンジンから作成されます。`ma_sound`と`ma_sound_group`オブジェクトは、エンジンのノードグラフ内のノードです。

エンジンが初期化されると、通常は内部的にデバイスが作成されます。デバイスを自分で管理したい場合は、エンジンを初期化する際にデバイスへのポインタをエンジン構成を介して渡すことができます。また、デバイスを使用せずにエンジンを使用することもでき、これもエンジン構成で設定できます。

最も基本的なエンジンの初期化方法は、デフォルトの構成を使用することです。次のようにします：

```c
ma_result result;
ma_engine engine;

result = ma_engine_init(NULL, &engine);
if (result != MA_SUCCESS) {
    return result;  // エンジンの初期化に失敗しました。
}
```

これにより、エンジンはオペレーティングシステムのデフォルトデバイスを使用して再生デバイスを初期化します。多くのユースケースではこれで十分ですが、より柔軟性が必要な場合は、エンジン構成を使用してエンジンを構成することができます：

```c
ma_result result;
ma_engine engine;
ma_engine_config engineConfig;

engineConfig = ma_engine_config_init();
engineConfig.pDevice = &myDevice;

result = ma_engine_init(&engineConfig, &engine);
if (result != MA_SUCCESS) {
    return result;  // エンジンの初期化に失敗しました。
}
```

上記の例では、事前に初期化されたデバイスを渡しています。呼び出し側がデバイスのデータコールバックを制御しているため、データコールバック内で手動で`ma_engine_read_pcm_frames()`を呼び出す責任があります：

```c
void playback_data_callback(ma_device* pDevice, void* pOutput, const void* pInput, ma_uint32 frameCount)
{
    ma_engine_read_pcm_frames(&g_Engine, pOutput, frameCount, NULL);
}
```

デバイスを全く使用せずにエンジンを使用することもできます：

```c
ma_result result;
ma_engine engine;
ma_engine_config engineConfig;

engineConfig = ma_engine_config_init();
engineConfig.noDevice   = MA_TRUE;
engineConfig.channels   = 2;        // デバイスを使用しない場合は設定する必要があります。
engineConfig.sampleRate = 48000;    // デバイスを使用しない場合は設定する必要があります。

result = ma_engine_init(&engineConfig, &engine);
if (result != MA_SUCCESS) {
    return result;  // エンジンの初期化に失敗しました。
}
```

デバイスを使用しない場合、設定でチャンネル数とサンプルレートを指定する必要があります。そうしないと、miniaudioが何を使用すればよいかわからなくなります（通常、miniaudioはデバイスを使用してこれを判断します）。デバイスを使用しない場合、`ma_engine_read_pcm_frames()`を使用してエンジンからオーディオデータを処理する必要があります。このような設定は、オフライン処理を行う場合や、SDLなどの別のオーディオシステムを再生に使用したい場合に便利です。

サウンドがロードされると、リソースマネージャを通過します。デフォルトでは、エンジンは内部的にリソースマネージャを初期化しますが、事前に初期化されたリソースマネージャを指定することもできます：

```c
ma_result result;
ma_engine engine1;
ma_engine engine2;
ma_engine_config engineConfig;

engineConfig = ma_engine_config_init();
engineConfig.pResourceManager = &myResourceManager;

ma_engine_init(&engineConfig, &engine1);
ma_engine_init(&engineConfig, &engine2);
```

この例では、同じリソースマネージャを共有する2つのエンジンを初期化しています。これは、複数のエンジン間で同じファイルをロードする場合にメモリを節約するのに特に便利です。共有リソースマネージャを使用しない場合、各エンジンインスタンスは独自のリソースマネージャを使用し、両方のエンジンで使用されるサウンドが2回ロードされることになります。共有リソースマネージャを使用することで、サウンドは1回だけロードされます。複数のエンジンを使用することは、例えばローカルマルチプレイヤーゲームで各プレイヤーが自分のヘッドフォンセットを使用している場合など、複数の再生デバイスに出力する必要があるときに便利です。

デフォルトではエンジンは開始状態になります。エンジンを自動的に開始しないようにするには、次のように設定します：

```c
engineConfig.noAutoStart = MA_TRUE;

// エンジンは手動で開始する必要があります。
ma_engine_start(&engine);

// 後でエンジンは ma_engine_stop() で停止できます。
ma_engine_stop(&engine);
```

エンジンの開始または停止の概念は、デバイスを使用している場合にのみ関連します。デバイスに関連付けられていないエンジンを開始または停止しようとすると、`MA_INVALID_OPERATION`が返されます。

エンジンのマスターボリュームは`ma_engine_set_volume()`で制御できます。この関数はリニアスケールを取り、0は無音を、1以上は増幅を意味します。デシベルベースのボリュームコントロールを好む場合は、`ma_volume_db_to_linear()`を使用してdBからリニアに変換します。

サウンドが空間化されると、リスナーに対して相対的に行われます。エンジンは複数のリスナーを持つように設定でき、これは次のように構成できます：

```c
engineConfig.listenerCount = 2;
```

リスナーの最大数は`MA_ENGINE_MAX_LISTENERS`に制限されています。デフォルトでは、サウンドが空間化されるとき、それは最も近いリスナーに対して行われます。サウンドを特定のリスナーに固定することもできますが、それについては後で説明します。リスナーは位置、方向、コーン、速度（ドップラー効果用）を持ちます。リスナーはインデックスで参照され、その意味は呼び出し側に依存します（インデックスは0から始まり、リスナーの数-1を超えることはできません）。位置、方向、速度はすべて絶対値で指定されます：

```c
ma_engine_listener_set_position(&engine, listenerIndex, worldPosX, worldPosY, worldPosZ);
```

リスナーの方向はその前方ベクトルを表します。リスナーの上向きベクトルも指定でき、デフォルトではY軸の+1になります。

```c
ma_engine_listener_set_direction(&engine, listenerIndex, forwardX, forwardY, forwardZ);
ma_engine_listener_set_world_up(&engine, listenerIndex, 0, 1, 0);
```

エンジンは指向性減衰をサポートしています。リスナーはコーンを持ち、リスナーの方向に基づいてサウンドがどのように減衰するかを制御できます。サウンドが内側のコーンと外側のコーンの間にある場合、それは1からコーンの外側ゲインの間で減衰します：

```c
ma_engine_listener_set_cone(&engine, listenerIndex, innerAngleInRadians, outerAngleInRadians, outerGain);
```

サウンドが内側のコーン内にある場合、指向性減衰は適用されません。サウンドが外側のコーンの外にある場合、減衰は上記の例で`outerGain`に設定されます。サウンドが内側と外側のコーンの間にある場合、減衰は1と外側ゲインの間で補間されます。

エンジンの座標系はOpenGLの座標系に従い、正のX軸は右を指し、正のY軸は上を指し、負のZ軸は前方を指します。

サウンドを再生する最も簡単で柔軟性のない方法は次のとおりです：

```c
ma_engine_play_sound(&engine, "my_sound.wav", pGroup);
```

これは「使い捨て」スタイルの関数です。エンジンは内部的に`ma_sound`オブジェクトを管理します。サウンドの再生が終了すると、それはリサイクルのために準備されます。より柔軟性が必要な場合は、サウンドオブジェクトを初期化します：

```c
ma_sound sound;

result = ma_sound_init_from_file(&engine, "my_sound.wav", flags, pGroup, NULL, &sound);
if (result != MA_SUCCESS) {
    return result;  // サウンドのロードに失敗しました。
}
```

サウンドは`ma_sound_uninit()`で初期化解除する必要があります。

上記の例では、ファイルからサウンドをロードしています。リソースマネージャが無効化されている場合、この関数を使用できず、代わりにデータソースから直接サウンドを初期化する必要があります：

```c
ma_sound sound;

result = ma_sound_init_from_data_source(&engine, &dataSource, flags, pGroup, &sound);
if (result != MA_SUCCESS) {
    return result;
}
```

各`ma_sound`オブジェクトはサウンドの単一インスタンスを表します。同じサウンドを同時に複数回再生したい場合は、別々の`ma_sound`オブジェクトを初期化する必要があります。

サウンドを初期化する際に最も柔軟性を持たせるには、`ma_sound_init_ex()`を使用します。これはminiaudioの標準のconfig/initパターンを使用します：

```c
ma_sound sound;
ma_sound_config soundConfig;

soundConfig = ma_sound_config_init();
soundConfig.pFilePath   = NULL; // ファイルパスからロードする場合に設定します。
soundConfig.pDataSource = NULL; // 既存のデータソースから初期化する場合に設定します。
soundConfig.pInitialAttachment = &someNodeInTheNodeGraph;
soundConfig.initialAttachmentInputBusIndex = 0;
soundConfig.channelsIn  = 1;
soundConfig.channelsOut = 0;    // エンジンのネイティブチャンネル数を使用するには0を設定します。

result = ma_sound_init_ex(&soundConfig, &sound);
if (result != MA_SUCCESS) {
    return result;
}
```

上記の例では、ファイルやデータソースを使わずにサウンドを初期化しています。これは有効で、この場合サウンドはノードグラフの中間ノードとして機能します。つまり、他のサウンドをこのサウンドに接続し、サウンドグループのように機能させることができます。実際、これはまさに`ma_sound_group`の機能です。

サウンドをロードする際、サウンドがどのようにロードされるかや、どの機能が有効になるかを制御する一連のフラグを指定します。フラグが設定されていない場合、サウンドはファイルシステムに保存されている形式のままメモリに完全にロードされます。リソースマネージャはメモリブロックを割り当て、ファイルを直接その中にロードします。オーディオデータを読み取る際、それは動的にデコードされます。オーディオスレッドでの処理時間を節約するために、サウンドを事前にデコードすることが有益かもしれません。これを行うには`MA_SOUND_FLAG_DECODE`フラグを使用します：

```c
ma_sound_init_from_file(&engine, "my_sound.wav", MA_SOUND_FLAG_DECODE, pGroup, NULL, &sound);
```

デフォルトでは、サウンドは同期的にロードされます。つまり、`ma_sound_init_*()`はサウンドが完全にロードされるまで戻りません。これが問題になる場合は、`MA_SOUND_FLAG_ASYNC`フラグを指定してサウンドを非同期でロードすることができます：

```c
ma_sound_init_from_file(&engine, "my_sound.wav", MA_SOUND_FLAG_DECODE | MA_SOUND_FLAG_ASYNC, pGroup, NULL, &sound);
```

これにより、`ma_sound_init_*()`はすぐに戻りますが、サウンドはまだ完全にはロードされていません。サウンドを開始すると、一部のサウンドが利用可能になるまで何も出力しません。`MA_SOUND_FLAG_DECODE`が指定されている場合、サウンドが完全にデコードされる前にオーディオの出力を開始します。

非同期でロードされたサウンドが完全にロードされるのを待つ必要がある場合は、フェンスを使用できます。miniaudioのフェンスは、内部カウンタがゼロになるまで単純にブロックする同期機構です。フェンスは次のように指定します：

```c
ma_result result;
ma_fence fence;
ma_sound sounds[4];

result = ma_fence_init(&fence);
if (result != MA_SUCCESS) {
    return result;
}

// サウンドを非同期でロードします。
for (int iSound = 0; iSound < 4; iSound += 1) {
    ma_sound_init_from_file(&engine, mySoundFilesPaths[iSound], MA_SOUND_FLAG_DECODE | MA_SOUND_FLAG_ASYNC, pGroup, &fence, &sounds[iSound]);
}

// ... その間に他の処理を行います ...

// すべてのサウンドのロードが完了するのを待ちます。
ma_fence_wait(&fence);
```

サウンド全体をメモリにロードするのが困難な場合は、エンジンを設定してオーディオデータをストリーミングすることもできます：

```c
ma_sound_init_from_file(&engine, "my_sound.wav", MA_SOUND_FLAG_STREAM, pGroup, NULL, &sound);
```

ストリーミングサウンドの場合、2秒分のオーディオデータがメモリに保存されます。短いサウンドにストリーミングを使用するのは非効率ですが、ゲームの音楽トラックのようなものには便利です。

ファイルパスからサウンドをロードする場合、エンジンはファイルがすでにメモリにロードされているかどうかを確認するために参照カウントを行います。サウンドを初期化解除すると、参照カウントがデクリメントされ、ゼロになるとサウンドはメモリからアンロードされます。この参照カウントシステムはストリームには使用されません。エンジンはファイルパスを比較する際にファイル名の64ビットハッシュを使用するため、名前の衝突が発生する可能性があります。これが問題になる場合は、衝突するファイルパスのいずれかに異なる名前を使用するか、ファイルからロードせずにデータソースからロードする必要があります。

`ma_sound_init_copy()`を使用して、別のサウンドのコピーを初期化できます。ただし、これは`ma_sound_init_from_file()`で初期化され、`MA_SOUND_FLAG_STREAM`フラグがないサウンドに対してのみ機能します。

サウンドを初期化する際、サウンドグループを指定すると、そのサウンドは自動的にそのグループにアタッチされます。NULLに設定すると、サウンドは自動的にエンジンのエンドポイントにアタッチされます。デフォルトでサウンドをアタッチしないようにしたい場合は、`MA_SOUND_FLAG_NO_DEFAULT_ATTACHMENT`フラグを指定できます。これは、複雑なノードグラフを設定したい場合に便利です。

サウンドはデフォルトでは開始されません。サウンドを開始するには、`ma_sound_start()`を使用します。サウンドを停止するには、`ma_sound_stop()`を使用します。

サウンドのボリュームは、エンジンのマスターボリュームと同じように`ma_sound_set_volume()`で制御できます。

サウンドはステレオパンとピッチングをサポートしています。パンは`ma_sound_set_pan()`で設定します。パンを0に設定すると、サウンドはパンされません。-1に設定するとすべてが左にシフトし、+1に設定すると右にシフトします。ピッチは`ma_sound_set_pitch()`で制御できます。値が大きいほどピッチが高くなります。ピッチは0より大きい必要があります。

エンジンはサウンドの3D空間化をサポートしています。デフォルトではサウンドに空間化が有効になっていますが、空間化が不要な場合は無効にするのが最適です。サウンドの空間化を無効にする方法は2つあります：

```c
// フラグを使って初期化時に空間化を無効にする方法：
ma_sound_init_from_file(&engine, "my_sound.wav", MA_SOUND_FLAG_NO_SPATIALIZATION, NULL, NULL, &sound);

// 初期化後に動的に空間化を無効または有効にする方法：
ma_sound_set_spatialization_enabled(&sound, isSpatializationEnabled);
```

デフォルトでは、サウンドは最も近いリスナーに基づいて空間化されます。サウンドが常に特定のリスナーに対して空間化されるべき場合、それを特定のリスナーに固定できます：

```c
ma_sound_set_pinned_listener_index(&sound, listenerIndex);
```

リスナーと同様に、サウンドには位置があります。デフォルトでは、サウンドの位置は絶対空間ですが、リスナーに対して相対的に変更することができます：

```c
ma_sound_set_positioning(&sound, ma_positioning_relative);
```

サウンドの相対位置設定は、リスナーが1人しかいない場合、またはサウンドが特定のリスナーに固定されている場合にのみ意味があります。サウンドの位置を設定するには、次のようにします：

```c
ma_sound_set_position(&sound, posX, posY, posZ);
```

方向はリスナーと同じように機能し、サウンドの前方方向を表します：

```c
ma_sound_set_direction(&sound, forwardX, forwardY, forwardZ);
```

サウンドにも方向性減衰を制御するためのコーンがあります。これはリスナーと全く同じように機能します：

```c
ma_sound_set_cone(&sound, innerAngleInRadians, outerAngleInRadians, outerGain);
```

サウンドの速度はドップラー効果に使用され、次のように設定できます：

```c
ma_sound_set_velocity(&sound, velocityX, velocityY, velocityZ);
```

エンジンは異なる減衰モデルをサポートしており、サウンドごとに設定できます。デフォルトの減衰モデルは`ma_attenuation_model_inverse`で、これはOpenALの`AL_INVERSE_DISTANCE_CLAMPED`に相当します。減衰モデルは次のように設定します：

```c
ma_sound_set_attenuation_model(&sound, ma_attenuation_model_inverse);
```

サポートされている減衰モデルには次のものがあります：

|減衰モデル|説明|
|---|---|
|ma_attenuation_model_none|距離による減衰なし。|
|ma_attenuation_model_inverse|`AL_INVERSE_DISTANCE_CLAMPED`に相当。|
|ma_attenuation_model_linear|線形減衰。|
|ma_attenuation_model_exponential|指数減衰。|

リスナーから離れるにつれてサウンドがどのように減衰するかを制御するには、ロールオフを設定する必要があります：

```c
ma_sound_set_rolloff(&sound, rolloff);
```

空間化による最小ゲインと最大ゲインを制御できます：

```c
ma_sound_set_min_gain(&sound, minGain);
ma_sound_set_max_gain(&sound, maxGain);
```

同様に、減衰の計算では、最小距離と最大距離を制御できます。これは、リスナーが離れた後にサウンドが一定のボリューム以下に落ちないようにするため、またリスナーが一定の距離内にいるときにサウンドが最大ボリュームで再生されるようにするために役立ちます：

```c
ma_sound_set_min_distance(&sound, minDistance);
ma_sound_set_max_distance(&sound, maxDistance);
```

エンジンの空間化システムはドップラー効果をサポートしています。ドップラーファクターはサウンドごとに設定できます：

```c
ma_sound_set_doppler_factor(&sound, dopplerFactor);
```

サウンドのフェードインとフェードアウトは`ma_sound_set_fade_in_pcm_frames()`および`ma_sound_set_fade_in_milliseconds()`で設定できます。開始ボリュームとして現在のボリュームを使用するには、ボリュームを-1に設定します：

```c
// 1秒でフェードインします。
ma_sound_set_fade_in_milliseconds(&sound, 0, 1, 1000);

// ...しばらく後...

// 現在のボリュームから始めて1秒でフェードアウトします。
ma_sound_set_fade_in_milliseconds(&sound, -1, 0, 1000);
```

デフォルトでは、サウンドは即時に開始されますが、タイミングや同期の目的でサウンドの開始や停止をスケジュールすることが有用な場合があります：

```c
// 1秒後にサウンドを開始します。
ma_sound_set_start_time_in_pcm_frames(&sound, ma_engine_get_time_in_pcm_frames(&engine) + (ma_engine_get_sample_rate(&engine) * 1));

// 2秒後にサウンドを停止します。
ma_sound_set_stop_time_in_pcm_frames(&sound, ma_engine_get_time_in_pcm_frames(&engine) + (ma_engine_get_sample_rate(&engine) * 2));
```

開始時間をスケジュールする場合でも、何かが再生される前に明示的に`ma_sound_start()`を呼び出す必要があることに注意してください。

時間はエンジンによって制御されるグローバルタイムで指定されます。エンジンの現在時刻は`ma_engine_get_time_in_pcm_frames()`で取得できます。エンジンのグローバルタイムはオーディオデータの読み取りに応じて自動的に増加しますが、何らかの理由で再同期する必要がある場合は`ma_engine_set_time_in_pcm_frames()`でリセットできます。

サウンドが現在再生中かどうかを判断するには、`ma_sound_is_playing()`を使用します。これにはスケジュールされた開始時間と停止時間が考慮されます。

サウンドをループさせるかどうかは`ma_sound_set_looping()`で制御できます。デフォルトではサウンドはループしません。サウンドがループしているかどうかを判断するには、`ma_sound_is_looping()`を使用します。

`ma_sound_at_end()`を使用して、サウンドが現在終端にあるかどうかを確認できます。ループするサウンドの場合、これが`true`を返すことはありません。代わりに、サウンドが終端に達したときに発生するコールバックを設定できます。このコールバックはオーディオスレッドから発生するため、コールバックからサウンドを初期化解除することはできません。コールバックを設定するには、`ma_sound_set_end_callback()`を使用します。また、`ma_sound_init_ex()`を使用する場合は、次のように構成に渡すこともできます：

```c
soundConfig.endCallback = my_end_callback;
soundConfig.pEndCallbackUserData = pMyEndCallbackUserData;
```

エンドコールバックは次のように宣言します：

```c
void my_end_callback(void* pUserData, ma_sound* pSound)
{
    ...
}
```

内部的には、サウンドはデータソースをラップしています。主に便利なために、基礎となるデータソースを制御するためのいくつかのAPIが存在します：

```c
ma_sound_seek_to_pcm_frame(&sound, frameIndex);
ma_sound_get_data_format(&sound, &format, &channels, &sampleRate, pChannelMap, channelMapCapacity);
ma_sound_get_cursor_in_pcm_frames(&sound, &cursor);
ma_sound_get_length_in_pcm_frames(&sound, &length);
```

サウンドグループもサウンドと同じAPIを持ちますが、`ma_sound_group`と呼ばれ、データソースの概念がないため、データソースに関連する機能は利用できません。

内部的には、サウンドデータは`ma_decoder` APIを介してロードされます。デフォルトでは、miniaudioで組み込みサポートされているファイル形式のみがサポートされますが、カスタムデコーダを使用して任意のファイル形式をサポートするように拡張できます。これを行うには、自己管理型のリソースマネージャを使用し、適切に設定する必要があります。これを設定する方法の詳細については、以下の「リソース管理」セクションを参照してください。

## 6. リソース管理

多くのプログラムは、参照カウントやストリーミングのためにサウンドリソースを管理したいと考えるでしょう。これは`ma_resource_manager` APIを介してminiaudioでサポートされています。

リソースマネージャは主に以下の役割を担っています：

- 参照カウントを使用してサウンドファイルをメモリにロードすること。
- サウンドデータのストリーミング。

サウンドファイルをロードすると、リソースマネージャは`ma_resource_manager_data_source`と呼ばれる`ma_data_source`互換のオブジェクトを返します。このオブジェクトは任意の`ma_data_source` APIに渡すことができ、これによりオーディオデータの読み取りやシークが可能になります。サウンドファイルをロードする際には、サウンドをメモリに完全にロードするか（オプションで事前デコードも可能）、ストリーミングするかを指定します。メモリにロードする場合、データを非同期でロードするかどうかも指定できます。

以下の例は、デフォルトの設定を使用してリソースマネージャを初期化する方法です：

```c
ma_resource_manager_config config;
ma_resource_manager resourceManager;

config = ma_resource_manager_config_init();
result = ma_resource_manager_init(&config, &resourceManager);
if (result != MA_SUCCESS) {
    ma_device_uninit(&device);
    printf("Failed to initialize the resource manager.");
    return -1;
}
```

デコードされたオーディオデータのフォーマット、チャンネル数、サンプルレートを設定することができます。デフォルトではファイルのネイティブデータフォーマットが使用されますが、一貫したフォーマットを使用するように設定することも可能です。これは、データ変換のコストをミキシング時ではなくロード時にオフロードするのに役立ちます。これを行うには、以下のコードのようにデコードフォーマット、チャンネル数、サンプルレートを設定します：

```c
config = ma_resource_manager_config_init();
config.decodedFormat     = device.playback.format;
config.decodedChannels   = device.playback.channels;
config.decodedSampleRate = device.sampleRate;
```

上記のコードでは、リソースマネージャが設定され、デコードされたオーディオデータがデバイスのネイティブデータフォーマットにロード時に事前変換されます。デフォルトを使用し、ファイルのデータフォーマットがデバイスのデータフォーマットと一致しない場合、ミキシング時にデータを変換する必要があり、これはゲームのような高性能および大規模なシナリオでは負担となる可能性があります。

内部的には、リソースマネージャは`ma_decoder` APIを使用してサウンドをロードします。これはデフォルトでminiaudioに組み込まれているデコーダのみをサポートすることを意味します。カスタムデコーダを使用して追加のエンコーディングフォーマットをサポートすることが可能です。これを行うには、カスタムデコーダの`ma_decoding_backend_vtable`をリソースマネージャの設定に渡します：

```c
ma_decoding_backend_vtable* pCustomBackendVTables[] =
{
    &g_ma_decoding_backend_vtable_libvorbis,
    &g_ma_decoding_backend_vtable_libopus
};

...

resourceManagerConfig.ppCustomDecodingBackendVTables = pCustomBackendVTables;
resourceManagerConfig.customDecodingBackendCount     = sizeof(pCustomBackendVTables) / sizeof(pCustomBackendVTables[0]);
resourceManagerConfig.pCustomDecodingBackendUserData = NULL;
```

このシステムを使用すると、任意のファイル形式をサポートすることができます。カスタムデコーダを実装する方法の詳細については、「デコード」セクションを参照してください。miniaudioリポジトリには、libopusおよびlibopusfileを使用したOpus、libvorbisおよびlibvorbisfileを使用したVorbisの例が含まれています。

非同期性はジョブシステムを介して実現されます。ページのデコードなどの操作が必要な場合、ジョブがキューに投稿され、それがジョブスレッドによって処理されます。デフォルトでは、1つのジョブスレッドのみが実行されますが、次のように設定することで変更できます：

```c
config = ma_resource_manager_config_init();
config.jobThreadCount = MY_JOB_THREAD_COUNT;
```

デフォルトではジョブスレッドはリソースマネージャによって内部的に管理されますが、たとえば既存のジョブインフラにジョブ処理を統合したい場合や、単にリソースマネージャの方法が気に入らない場合は、ジョブスレッドを自分で管理することもできます。これを行うには、ジョブスレッドの数を0に設定し、手動でジョブを処理します。ジョブを処理するには、まず`ma_resource_manager_next_job()`を使用してジョブを取得し、次に`ma_job_process()`を使用してそれを処理します：

```c
config = ma_resource_manager_config_init();
config.jobThreadCount = 0;                            // ジョブスレッドを内部で管理しない。
config.flags = MA_RESOURCE_MANAGER_FLAG_NON_BLOCKING; // オプション。ma_resource_manager_next_job() を非ブロッキングにします。

// ... カスタムジョブスレッドを初期化 ...

void my_custom_job_thread(...)
{
    for (;;) {
        ma_job job;
        ma_result result = ma_resource_manager_next_job(pMyResourceManager, &job);
        if (result != MA_SUCCESS) {
            if (result == MA_NO_DATA_AVAILABLE) {
                // ジョブが利用可能ではありません。継続します。これはリソースマネージャが MA_RESOURCE_MANAGER_FLAG_NON_BLOCKING
                // で初期化された場合にのみ発生します。
                continue;
            } else if (result == MA_CANCELLED) {
                // MA_JOB_TYPE_QUIT が投稿されました。終了します。
                break;
            } else {
                // 他のエラーが発生しました。
                break;
            }
        }

        ma_job_process(&job);
    }
}
```

上記の例では、`MA_JOB_TYPE_QUIT`イベントが終了インジケータとして使用されていますが、スレッドを終了するために任意の方法を使用できます。`ma_resource_manager_next_job()`の呼び出しはデフォルトではブロッキングですが、`MA_RESOURCE_MANAGER_FLAG_NON_BLOCKING`設定フラグを使用してリソースマネージャを初期化することで非ブロッキングに設定できます。`MA_JOB_TYPE_QUIT`はジョブキューから削除されることはありません。これは、すべてのスレッドがこのイベントをキャッチし、自然に終了する機会を持つためです。

ファイルをロードする際、標準の`fopen()`、`fclose()`などの代わりに、ファイルの開閉や読み取り方法をカスタマイズできると便利な場合があります。miniaudioはデフォルトでこれらの標準関数を使用しますが、リソースマネージャの設定の`pVFS`メンバーを設定することでカスタマイズできます：

```c
// カスタムVFSオブジェクトを初期化します。VFSの情報についてはドキュメントを参照してください。
my_custom_vfs vfs = my_custom_vfs_init();

config = ma_resource_manager_config_init();
config.pVFS = &vfs;
```

これは、通常のファイルシステムではなくアーカイブから直接読み取るようなゲームのようなプログラムに特に有用です。カスタムVFSを指定しない場合、リソースマネージャはオペレーティングシステムの通常のファイル操作を使用します。

サウンドファイルをロードしてデータソースを作成するには、`ma_resource_manager_data_source_init()`を呼び出します。サウンドをロードする際には、ファイルパスとサウンドのロード方法に関するオプションを指定する必要があります。デフォルトでは、サウンドは同期的にロードされます。返されるデータソースは呼び出し側が所有するため、データソースの割り当てと解放は呼び出し側の責任となります。以下はデータソースを初期化する例です：

```c
ma_resource_manager_data_source dataSource;
ma_result result = ma_resource_manager_data_source_init(pResourceManager, pFilePath, flags, &dataSource);
if (result != MA_SUCCESS) {
    // エラー。
}

// ...

// ma_resource_manager_data_sourceオブジェクトはma_data_source APIと互換性があります。データを読み取るには、
// 通常のデータソースと同様にma_data_source_read_pcm_frames()を呼び出すだけです。
result = ma_data_source_read_pcm_frames(&dataSource, pDecodedData, frameCount, &framesRead);
if (result != MA_SUCCESS) {
    // PCMフレームの読み取りに失敗しました。
}

// ...

ma_resource_manager_data_source_uninit(&dataSource);
```

`flags`パラメータはサウンドファイルのロード方法を指定します。次のフラグの組み合わせを使用できます：

- MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_STREAM
- MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_DECODE
- MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_ASYNC
- MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_WAIT_INIT

フラグが指定されていない場合（0に設定）、サウンドはメモリに完全にロードされますが、デコードはされません。つまり、メモリには生のファイルデータが格納され、`ma_data_source_read_pcm_frames()`が呼び出されると動的にデコードされます。オーディオデータをメモリに格納する前にデコードしたい場合は、`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_DECODE`フラグを使用します。デフォルトでは、サウンドファイルは同期的にロードされ、`ma_resource_manager_data_source_init()`はファイル全体がロードされた後にのみ返されます。これはシンプルですが、非常に遅くなる可能性があります。代わりに、`MA_RESOURCE_MANAGER_DATA_SOURCE_ASYNC`フラグを使用してサウンドを非同期でロードできます。これにより、`ma_resource_manager_data_source_init()`はすぐに返されますが、データが利用可能になるまで`ma_data_source_read_pcm_frames()`からデータは返されません。非同期デコードが追いついていないためにデータが利用できない場合、`ma_data_source_read_pcm_frames()`は`MA_BUSY`を返します。

大きなサウンドの場合、ファイル全体をメモリに保存するのはコストがかかりすぎることがよくあります。これを軽減するために、`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_STREAM`フラグを指定してオーディオデータをストリーミングすることができます。ストリーミングの場合、データは1秒ごとにページ単位でデコードされます。新しいページをデコードする必要がある場合、ジョブがジョブキューに投稿され、その後ジョブスレッドで処理されます。

メモリ内サウンドの場合、参照カウントが使用され、データが一度だけロードされることを保証します。つまり、同じファイルパスで`ma_resource_manager_data_source_init()`を複数回呼び出すと、ファイルデータは一度だけロードされます。各`ma_resource_manager_data_source_init()`の呼び出しには、`ma_resource_manager_data_source_uninit()`の呼び出しを対応させる必要があります。プログラムが自己管理型の生オーディオデータを登録し、それをファイルパスに関連付けることが有用な場合があります。これを行うには、`ma_resource_manager_register_*()`および`ma_resource_manager_unregister_*()` APIを使用します。`ma_resource_manager_register_decoded_data()`は、指定されたデータ形式の生の自己管理型デコードオーディオデータへのポインタを指定された名前に関連付けるために使用されます。同様に、`ma_resource_manager_register_encoded_data()`は、生の自己管理型エンコードオーディオデータ（生ファイルデータ）へのポインタを指定された名前に関連付けるために使用されます。これらの名前は実際のファイルパスである必要はありません。`ma_resource_manager_data_source_init()`が呼び出されると（`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_STREAM`フラグなしで）、リソースマネージャはこれらの明示的に登録されたデータバッファを探し、見つかった場合はデータソースのバックデータとして使用します。リソースマネージャはこのデータのコピーを作成しないため、呼び出し元がそのポインタが有効であることを保証する必要があります。自己管理型データを登録解除するには、`ma_resource_manager_unregister_data()`を使用します。また、ファイルを登録および登録解除するために`ma_resource_manager_register_file()`および`ma_resource_manager_unregister_file()`を使用することもできます。自己管理型データポインタに対して`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_STREAM`フラグを使用するのは意味がありません。

### 6.1. 非同期ローディングと同期

非同期ローディング時には、ローディングが完了したかどうかをポーリングすることが有用です。これを判断するには、`ma_resource_manager_data_source_result()`を使用します。メモリ内サウンドの場合、ファイルが完全にデコードされたときに`MA_SUCCESS`が返されます。サウンドがまだデコード中の場合、`MA_BUSY`が返されます。それ以外の場合、サウンドのロードに失敗した場合は他のエラーコードが返されます。ストリーミングデータソースの場合、最初のページがデコードされ、サウンドが再生準備が整ったときに`MA_SUCCESS`が返されます。最初のページがまだデコード中の場合、`MA_BUSY`が返されます。それ以外の場合、サウンドのロードに失敗した場合は他のエラーコードが返されます。

ポーリングに加えて、非同期でロードされたサウンドが終了するのを待つために「フェンス」と呼ばれるシンプルな同期オブジェクトを使用することもできます。これは`ma_fence`と呼ばれます。フェンスを使用する利点は、個々のサウンドを待つのではなく、一群のサウンドがロードを完了するのを待つために使用できることです。サウンドをロードするには2つのステージがあります：

- 内部デコーダの初期化
- ファイルのデコード完了（ファイルが完全にデコードされる）

各ステージに対して別々のフェンスを指定できます。内部デコーダの初期化を待つことは、ファイルのサンプル形式、チャンネル数、およびサンプルレートを知る必要がある場合に重要です。

以下の例では、複数のサウンドをロードする際にフェンスを使用する方法を示しています：

```c
// このフェンスはすべてのサウンドのロードが完全に終了したときに解除されます。
ma_fence fence;
ma_fence_init(&fence);

// これは各サウンドの初期化ルーチンに渡されます。
ma_resource_manager_pipeline_notifications notifications = ma_resource_manager_pipeline_notifications_init();
notifications.done.pFence = &fence;

// ここで複数のサウンドをロードします：
for (iSound = 0; iSound < soundCount; iSound += 1) {
    ma_resource_manager_data_source_init(pResourceManager, pSoundFilePaths[iSound], flags, &notifications, &pSoundSources[iSound]);
}

// ... サウンドがロードされている間に他の処理を行います ...

// サウンドのロードが終了するのを待ちます。
ma_fence_wait(&fence);
```

上記の例では、ファイル全体が完全にデコードされるのを待つためにフェンスを使用しました。内部デコーダの初期化が完了するのを待つだけで良い場合は、`ma_resource_manager_pipeline_notifications`オブジェクトの`init`メンバーを使用できます：

```c
notifications.init.pFence = &fence;
```

フェンスが適していない場合は、個別のサウンドごとにトリガーされるコールバックを使用することもできます。これはフェンスと非常に似た方法で行われます：

```c
typedef struct
{
    ma_async_notification_callbacks cb;
    void* pMyData;
} my_notification;

void my_notification_callback(ma_async_notification* pNotification)
{
    my_notification* pMyNotification = (my_notification*)pNotification;

    // サウンドのロード完了に応じて何かを行います。
}

...

my_notification myCallback;
myCallback.cb.onSignal = my_notification_callback;
myCallback.pMyData     = pMyData;

ma_resource_manager_pipeline_notifications notifications = ma_resource_manager_pipeline_notifications_init();
notifications.done.pNotification = &myCallback;

ma_resource_manager_data_source_init(pResourceManager, "my_sound.wav", flags, &notifications, &mySound);
```

上記の例では、`ma_async_notification_callbacks`オブジェクトを拡張し、そのインスタンスを`ma_resource_manager_pipeline_notifications`にフェンスと同様に渡していますが、`pFence`の代わりに`pNotification`を設定しています。これらの両方を同時に設定することができ、それぞれが期待通りに機能します。`pNotification`システムを使用する場合、`ma_async_notification_callbacks`オブジェクトが有効であることを確認する必要があります。

### 6.2. リソースマネージャの実装詳細

リソースは主に次の2つの方法で管理されます：

- サウンド全体をメモリ内バッファ（データバッファと呼ばれる）に格納する方法
- オーディオデータをリアルタイムでストリーミングする方法（データストリームと呼ばれる）

リソース管理データソース（`ma_resource_manager_data_source`）は、データソースが`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_STREAM`フラグで初期化されたかどうかに応じて、データバッファまたはデータストリームをカプセル化します。フラグが指定された場合、`ma_resource_manager_data_stream`オブジェクトを使用します。そうでない場合は、`ma_resource_manager_data_buffer`オブジェクトを使用します。これらのオブジェクトはデータソースであるため、任意の`ma_data_source_*()` APIと一緒に使用できます。

リソースマネージャのもう一つの主要な機能は、オーディオファイルを非同期にデコードする能力です。これにより、オーディオスレッドが時間のかかるデコード作業から解放され、スケーラビリティに悪影響を与えずに済みます。非同期デコードはジョブシステムを通じて実現されます。中心にはマルチプロデューサー、マルチコンシューマー、固定容量のジョブキューがあります。非同期作業が必要な場合、ジョブがキューに投稿され、ジョブスレッドによって読み取られます。ジョブスレッドの数はスケーラビリティ向上のために設定可能で、ジョブスレッドは並行して実行され、実行順序を気にする必要はありません（これがどのように実現されるかは後述します）。

サウンドが非同期にロードされている場合、完全にデコードされる前に再生を開始できます。これにより、アプリケーションはサウンドの再生をすぐに開始し、同時にリソースマネージャがバックグラウンドでロードを続行できます。特定の時間にロードされているサウンドの数よりもスレッド数が少ない場合、デコード時間をバランスよく公平に保つために簡単なスケジューリングシステムが使用されます。リソースマネージャはデコードをページと呼ばれるチャンクに分割することでこれを解決します。デフォルトでは、各ページは1秒間です。ページがデコードされると、次のページのデコードを開始する新しいジョブが投稿されます。デコードをページに分割することで、個々のサウンドが他のすべてのサウンドの最初のページのデコードを遅らせることはありません。もちろん、多くのサウンドを同時にロードする場合、キュー内のジョブを処理するために必要な時間があり、負荷が高い状況では多少の遅延が発生することはあります。データソースがフレームの読み取り準備ができているかどうかを判断するには、`ma_resource_manager_data_source_get_available_frames()`を使用します。これは、現在の位置から利用可能なフレーム数を返します。

#### 6.2.1. ジョブキュー

リソースマネージャは、マルチプロデューサー、マルチコンシューマー、固定容量のジョブキューを使用します。このジョブキューは現在、ロックフリーではなく、スピンロックを使用してスレッドセーフを実現しています。ジョブは固定数しか割り当てられず、キューに挿入されることができます。これは、固定サイズの配列にインデックスを割り当てるためのロックフリーデータ構造を介して行われ、ABA問題の緩和のために参照カウントを使用します。参照カウントは32ビットです。

多くのタイプのジョブでは、特定の順序で実行されることが重要です。このような場合、ジョブは直列に実行されます。リソースマネージャにおいては、ジョブの直列実行はオブジェクト単位（データバッファまたはデータストリームごと）でのみ必要です。各オブジェクトは実行カウンタを持っています。ジョブが投稿されると、それは実行カウンタと関連付けられます。ジョブが処理されるとき、ジョブの実行カウンタが所有オブジェクトの実行カウンタと一致するかどうかを確認し、一致する場合にジョブを処理します。カウンタが一致しない場合、ジョブは後で処理するためにジョブキューに再投稿されます。ジョブの処理が完了すると、メインオブジェクトの実行順序がインクリメントされます。このシステムにより、いくつのジョブスレッドが実行されても、個々のサウンドのデコードは常に直列に処理されます。同時に複数のサウンドをロードする場合、複数のスレッドを持つ利点が発揮されます。

リソースマネージャのジョブキューは100％ロックフリーではなく、ごく一部のコードセクションでスピンロックを使用してスレッドセーフを実現しています。これはリソースマネージャが複数のジョブスレッドを使用する場合にのみ関連します。デフォルトである単一のジョブスレッドを使用する場合、実際にはロックが待機状態になることはありません。ロックに費やす時間は非常に短いはずですが、厳密なロックフリー要件を持ち、複数のジョブスレッドを使用する必要がある場合は注意が必要です。このロックは将来のバージョンで削除する計画があります。

さらに、ジョブを投稿することでセマフォが解放されます。これはWin32では`ReleaseSemaphore`で実装され、POSIXプラットフォームでは条件変数を介して実装されます：

```c
pthread_mutex_lock(&pSemaphore->lock);
{
    pSemaphore->value += 1;
    pthread_cond_signal(&pSemaphore->cond);
}
pthread_mutex_unlock(&pSemaphore->lock);
```

これもまた、オーディオスレッドで厳密なロックフリー要件がある場合に関連します。これを回避するには、非ブロッキングモード（`MA_JOB_QUEUE_FLAG_NON_BLOCKING`フラグを使用）を使用し、独自のジョブ処理ルーチンを実装することができます（詳細は上記の「リソースマネージャ」セクションを参照してください）。

#### 6.2.2. データバッファ

初期化時に`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_STREAM`フラグが除外されている場合、リソースマネージャはデータをメモリ内データバッファにロードしようとします。しかし、その前に指定されたファイルが既にロードされているかどうかを確認します。ロードされている場合、参照カウンタをインクリメントし、既にロードされているデータを使用します。これにより、時間とメモリを節約できます。データバッファが初期化解除されると、参照カウンタがデクリメントされます。カウンタがゼロになると、ファイルはアンロードされます。この点を理解しておくことが重要です。これにより、サウンドの過剰なロードおよびアンロードが発生する可能性があるためです。例えば、次のシーケンスは、ファイルが2回ロードされる結果になります：

```c
ma_resource_manager_data_source_init(pResourceManager, "my_file", ..., &myDataBuffer0); // 参照カウント = 1。初回ロード。
ma_resource_manager_data_source_uninit(&myDataBuffer0);                                 // 参照カウント = 0。アンロード。

ma_resource_manager_data_source_init(pResourceManager, "my_file", ..., &myDataBuffer1); // 参照カウント = 1。前回のuninit()により再ロード。
ma_resource_manager_data_source_uninit(&myDataBuffer1);                                 // 参照カウント = 0。アンロード。
```

バイナリ検索木（BST）は、データバッファの保存に使用されます。これは効率性とシンプルさのバランスが良いためです。BSTのキーは、`ma_resource_manager_data_source_init()`に渡されたファイルパスの64ビットハッシュです。ハッシュを使用する利点は、メモリの節約、比較の高速化、およびハッシュのランダムな性質によりほぼバランスの取れたBSTが得られることです。欠点は、ファイル名が大文字小文字を区別することと、名前の衝突の可能性があることです。大文字小文字の区別が問題になる場合は、データソースを初期化する前にファイル名を大文字または小文字に正規化するべきです。名前の衝突が問題になる場合は、衝突する名前の一方を変更するか、リソースマネージャを使用しないようにする必要があります。

サウンドファイルが既にロードされておらず、`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_ASYNC`フラグが除外されている場合、ファイルは呼び出しスレッドによって同期的にデコードされます。データバッファにオーディオを保存する方法には、エンコードされたまま保存するか、デコードして保存するかの2つのオプションがあります。`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_DECODE`オプションが除外されている場合、生のファイルデータがメモリに保存されます。それ以外の場合は、メモリに保存する前にサウンドがデコードされます。同期ロードは非常にシンプルで標準的なプロセスであり、BSTにアイテムを追加し、メモリブロックを割り当て、次にデコードする（`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_DECODE`が指定されている場合）という手順です。

`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_ASYNC`フラグが指定されている場合、データバッファのロードは非同期で行われます。この場合、ジョブがキューに投稿され、ロードが開始され、その後関数はすぐに戻り、内部結果コードが`MA_BUSY`に設定されます。この結果コードは、プログラムが`ma_resource_manager_data_source_result()`を呼び出したときに返されます。デコードが完全に完了すると、`MA_SUCCESS`が返されます。これにより、ロードが完全に完了したかどうかを確認できます。

非同期ロード時には、`MA_JOB_TYPE_RESOURCE_MANAGER_LOAD_DATA_BUFFER_NODE`タイプの単一ジョブがキューに投稿されます。これには、ファイルパスのコピーを作成し、それをジョブと関連付けることが含まれます。ジョブスレッドがジョブを処理するとき、まずリソースマネージャに関連付けられたVFSを使用してファイルをロードします。カスタムVFSを使用する場合、完全にスレッドセーフであることが重要です。個々のファイルは常に一度に1つのスレッドによってのみアクセスされるべきです。VFS経由でファイルを開いた後、ジョブはファイルがデコードされているかどうかを判断します。デコードされていない場合、メモリブロックを割り当てて生ファイル内容をロードし、戻ります。ファイルがデコードされている場合、まずヒープにデコーダを割り当てて初期化します。次に、ファイルの長さが既知かどうかを確認します。既知であれば、デコード出力を保存するためのメモリブロックを割り当て、無音に初期化します。サイズが不明な場合、1ページ分の領域を割り当てます。メモリが割り当てられた後、最初のページがデコードされます。サウンドが1ページより短い場合、結果コードは`MA_SUCCESS`に設定され、完了イベントがシグナルされ、ロードは完了します。しかし、デコードするものが残っている場合、`MA_JOB_TYPE_RESOURCE_MANAGER_PAGE_DATA_BUFFER_NODE`コードのジョブが投稿されます。このジョブは次のページをデコードし、終端に達すると同じプロセスを実行します。デコードするものがさらにある場合、次の`MA_JOB_TYPE_RESOURCE_MANAGER_PAGE_DATA_BUFFER_NODE`ジョブが投稿され、このプロセスはサウンドが完全にデコードされるまで続きます。長さが不明なサウンドの場合、各ページはリンクリストとしてリンクされます。内部的には、これは`ma_paged_audio_buffer`オブジェクトを介して実装されます。

#### 6.2.3. データストリーム

データストリームは各インスタンスごとに常に2ページ分のデータのみを保存します。これらは、メモリに完全にデコードするとメモリを大量に消費するゲームの音楽トラックのような大きなサウンドに最適です。ページからの全フレームが読み取られると、次のページをロードするジョブがVFSから実行されるように投稿されます。

データストリームの場合、`MA_RESOURCE_MANAGER_DATA_SOURCE_FLAG_ASYNC`フラグはデータソースの初期化が2ページ分のデコードを待つかどうかを決定します。このフラグが設定されていない場合、`ma_resource_manager_data_source_init()`は2ページ分がロードされるまで待ちます。それ以外の場合はすぐに戻ります。

データストリームからフレームを読み取るときに、利用可能なフレームがない場合、`ma_resource_manager_data_source_read_pcm_frames()`は`MA_BUSY`を返します。利用可能なフレームがある場合でも、要求された数より少ない場合は`MA_SUCCESS`を返しますが、実際に読み取られるフレーム数は要求された数より少なくなります。データストリームの非同期性のため、シークも非同期になります。データストリームがシークの途中である場合、フレームを読み取ろうとすると`MA_BUSY`が返されます。

`ma_resource_manager_data_source_read_pcm_frames()`がページを完全に消費すると、新しいページをロードするジョブが投稿されます。これは`ma_resource_manager_data_source_read_pcm_frames()`を呼び出したのと同じスレッドから投稿されます。

データストリームはキューにジョブを投稿することによって初期化解除されますが、そのジョブが処理されるまで関数は戻りません。これは、呼び出し元がデータストリームオブジェクトを所有しており、miniaudioが呼び出し元に制御を戻す前にすべてが完了することを確認する必要があるためです。また、ページのデコードが進行中にデータストリームが初期化解除される場合、関連するオブジェクトを破棄する前にそれらが完了しなければならず、ジョブシステムがこれをクリーンに処理します。

新しいページをロードする必要がある場合、ジョブはオーディオスレッドからリソースマネージャのジョブスレッドに投稿されます。厳密なロックフリーオーディオスレッドが必要な場合は、イベントを投稿する際のロックに関する「ジョブキュー」セクションで言及された詳細を考慮する必要があります。

## 7. ノードグラフ

miniaudioのルーティングインフラはノードグラフのパラダイムに従います。基本的なアイデアは、出力が他のノードの入力に接続されたノードを作成し、グラフを形成することです。グラフ内にはさまざまなタイプのノードがあり、各ノードは入力データを処理して出力を生成し、それがチェーンを通じて伝達されます。グラフ内の各ノードは独自のカスタムエフェクトを適用できます。グラフの開始点には通常、データソースノードがあり、これらは入力を持たず、データソースからデータを取得します。グラフの終端にはエンドポイントがあり、最終出力がそこから抽出されます。

各ノードにはいくつかの入力バスと出力バスがあります。ノードの出力バスは他のノードの入力バスに接続されます。複数のノードが出力バスを他のノードの入力バスに接続することができ、その場合、出力はノードによって処理される前にミックスされます。以下は仮想ノードグラフの設定を示す図です：

```txt
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> データは左から右に流れます >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

+---------------+                              +-----------------+
| データソース 1 =----+    +----------+    +----= ローパスフィルタ  =----+
+---------------+    |    |          =----+    +-----------------+    |    +----------+
                     +----= スプリッタ  |                                +----= エンドポイント |
+---------------+    |    |          =----+    +-----------------+    |    +----------+
| データソース 2 =----+    +----------+    +----= エコー / ディレイ  =----+
+---------------+                              +-----------------+
```

上記のグラフでは、2つのデータソースから始まり、その出力がスプリッタノードの入力に接続されています。この時点で、2つのデータソースがミックスされます。ミックスの後、スプリッタは処理ルーチンを実行し、入力ストリームの複製を生成する2つの出力を生成します。1つの出力はローパスフィルタに接続され、もう1つの出力はエコー/ディレイに接続されます。ローパスフィルタとエコーの出力はエンドポイントに接続されており、両方とも同じ入力バスに接続されているため、ミックスされます。

各入力バスは同じチャンネル数を受け入れるように構成する必要がありますが、入力バスで使用されるチャンネル数は出力バスのチャンネル数と異なる場合があります。この場合、miniaudioは自動的に入力データを出力チャンネル数に変換してから処理します。あるノードの出力バスのチャンネル数は、それが接続される入力バスのチャンネル数と一致しなければなりません。ノードが初期化された後にチャンネル数を変更することはできません。出力バスを異なるチャンネル数の入力バスに接続しようとすると、接続は失敗します。

ノードグラフを使用するには、まず `ma_node_graph` オブジェクトを初期化する必要があります。これは、グラフ全体を囲むコンテナのようなものです。`ma_node_graph` オブジェクトは、後で説明するスレッドセーフの問題に必要です。`ma_node_graph` オブジェクトは、miniaudioの標準的な設定/初期化システムを使用して初期化されます：

```c
ma_node_graph_config nodeGraphConfig = ma_node_graph_config_init(myChannelCount);

result = ma_node_graph_init(&nodeGraphConfig, NULL, &nodeGraph);    // 第2引数はアロケーションコールバックのポインタ。
if (result != MA_SUCCESS) {
    // ノードグラフの初期化に失敗しました。
}
```

ノードグラフを初期化するときに、エンドポイントのチャンネル数を指定します。エンドポイントは特別なノードであり、1つの入力バスと1つの出力バスを持ち、どちらも設定で指定された同じチャンネル数を持ちます。エンドポイントに直接接続するノードは、その出力バスのチャンネル数がエンドポイントのチャンネル数と一致するように構成する必要があります。ノードグラフからオーディオデータを読み取ると、設定で指定したチャンネル数のデータが取得されます。グラフからデータを読み取るには、次のようにします：

```c
ma_uint32 framesRead;
result = ma_node_graph_read_pcm_frames(&nodeGraph, pFramesOut, frameCount, &framesRead);
if (result != MA_SUCCESS) {
    // ノードグラフからのデータ読み取りに失敗しました。
}
```

オーディオデータを読み取るとき、miniaudioはノードグラフのエンドポイントノードから開始し、その入力アタッチメントからデータを取得します。これが再帰的にその入力からデータを取得し、最終的にデータソースノードにたどり着きます。グラフの開始点には、入力が0でデータソースから直接読み取るデータソースノードがあります。基本ノードは文字通り `ma_data_source` オブジェクトから読み取る必要はありませんが、常に何らかのオーディオソースとなる基底オブジェクトを持っています。`ma_data_source_node` ノードは `ma_data_source` から読み取るために使用できます。データは常に浮動小数点形式であり、グラフが初期化されたときに指定されたチャンネル数です。サンプルレートは基底のデータソースによって定義されます。これらが一貫した適切なサンプルレートを使用するようにするのはあなたの責任です。

`ma_node` APIは、カスタムノードを比較的容易に実装できるように設計されていますが、miniaudioには一般的な機能のためのいくつかの標準ノードが含まれています。以下は、miniaudioに付属している標準ノードの1つであるデータソースから直接読み取るノード（`ma_data_source_node`）を初期化する方法です：

```c
ma_data_source_node_config config = ma_data_source_node_config_init(pMyDataSource);

ma_data_source_node dataSourceNode;
result = ma_data_source_node_init(&nodeGraph, &config, NULL, &dataSourceNode);
if (result != MA_SUCCESS) {
    // データソースノードの作成に失敗しました。
}
```

データソースノードは出力チャンネル数を使用して出力バスのチャンネル数を決定します。出力バスは1つで入力バスは0です（データはデータソースから直接取得されます）。データソースは浮動小数点形式（`ma_format_f32`）で出力する必要があります。そうでない場合、`ma_data_source_node_init()` はエラーを返します。

デフォルトでは、ノードはグラフに接続されていません。接続するには、`ma_node_attach_output_bus()`を使用します：

```c
result = ma_node_attach_output_bus(&dataSourceNode, 0, ma_node_graph_get_endpoint(&nodeGraph), 0);
if (result != MA_SUCCESS) {
    // ノードの接続に失敗しました。
}
```

上記のコードはデータソースノードをエンドポイントに直接接続します。データソースノードには単一の出力バスしかないため、インデックスは常に0です。同様に、エンドポイントには単一の入力バスしかないため、入力バスのインデックスも常に0です。

特定の出力バスを切り離すには、`ma_node_detach_output_bus()`を使用します。すべての出力バスを切り離すには、`ma_node_detach_all_output_buses()`を使用します。出力バスをある接続から別の接続に移動するだけの場合、最初に切り離す必要はありません。`ma_node_attach_output_bus()`を呼び出すだけで、自動的に処理されます。

カスタムエフェクトを適用するために独自の処理コールバックを実装する特殊なノードを作成する必要があることもあります。これは、標準ノードタイプの1つを初期化するのに似ていますが、今回は処理関数へのポインタと入力および出力バスの数を含むvtableへのポインタを指定する必要があります。例：

```c
static void my_custom_node_process_pcm_frames(ma_node* pNode, const float** ppFramesIn, ma_uint32* pFrameCountIn, float** ppFramesOut, ma_uint32* pFrameCountOut)
{
    // ppFramesInの処理（入力バスごとに1つのオーディオデータストリーム）
    const float* pFramesIn_0 = ppFramesIn[0]; // インデックス0の入力バス。
    const float* pFramesIn_1 = ppFramesIn[1]; // インデックス1の入力バス。
    float* pFramesOut_0 = ppFramesOut[0];     // インデックス0の出力バス。

    // 処理を行います。入力時に、pFrameCountInはppFramesIn内の各バッファの入力フレーム数、
    // pFrameCountOutはppFramesOut内の各バッファの容量です。出力時には、pFrameCountInには
    // ノードが消費した入力フレーム数を設定し、pFrameCountOutには生成された出力フレーム数を設定します。
    //
    // できるだけ多くのフレームを処理する必要があります。エフェクトが入力フレームを出力フレームと
    // 同じ速度で消費する場合（リサンプリングを行わない限り常にそうです）、ppFramesOutを見て
    // その正確な数のフレームを処理するだけです。リサンプリングを行う場合は、pFrameCountInと
    // pFrameCountOutの両方を適切に設定する必要があります。
}

static ma_node_vtable my_custom_node_vtable =
{
    my_custom_node_process_pcm_frames, // カスタムノードを処理するために呼び出される関数。ここでエフェクト処理を実装します。
    NULL,   // オプション。指定された出力フレーム数を処理するために必要な入力フレーム数を計算するためのコールバック。
    2,      // 2つの入力バス。
    1,      // 1つの出力バス。
    0       // デフォルトフラグ。
};

...

// 各バスにはチャンネル数を指定する必要があります。これを行うには、チャンネル数を配列で指定し、
// それをノード設定に渡します。
ma_uint32 inputChannels[2];     // vtableで指定された入力チャンネルの数と同じサイズ。
ma_uint32 outputChannels[1];    // vtableで指定された出力チャンネルの数と同じサイズ。

inputChannels[0]  = channelsIn;
inputChannels[1]  = channelsIn;
outputChannels[0] = channelsOut;

ma_node_config nodeConfig = ma_node_config_init();
nodeConfig.vtable          = &my_custom_node_vtable;
nodeConfig.pInputChannels  = inputChannels;
nodeConfig.pOutputChannels = outputChannels;

ma_node_base node;
result = ma_node_init(&nodeGraph, &nodeConfig, NULL, &node);
if (result != MA_SUCCESS) {
    // ノードの初期化に失敗しました。
}
```

カスタムノードを初期化する場合、上記のコードのように、通常はvtableを静的領域に配置します。入力バスと出力バスの数はvtableの一部として指定されます。ノードごとに可変数のバスが必要な場合、vtableの該当するバス数を`MA_NODE_BUS_COUNT_UNKNOWN`に設定する必要があります。この場合、バス数はノード設定で指定する必要があります。

```c
static ma_node_vtable my_custom_node_vtable =
{
    my_custom_node_process_pcm_frames, // カスタムノードを処理するために呼び出される関数。ここでエフェクト処理を実装します。
    NULL,   // オプション。指定された出力フレーム数を処理するために必要な入力フレーム数を計算するためのコールバック。
    MA_NODE_BUS_COUNT_UNKNOWN,  // 入力バスの数はノードごとに決定されます。
    1,      // 1つの出力バス。
    0       // デフォルトフラグ。
};

...

ma_node_config nodeConfig = ma_node_config_init();
nodeConfig.vtable          = &my_custom_node_vtable;
nodeConfig.inputBusCount   = myBusCount;        // <-- vtableがMA_NODE_BUS_COUNT_UNKNOWNを指定している場合、入力バスの数をここで設定します。
nodeConfig.pInputChannels  = inputChannels;     // <-- この配列にはnodeConfig.inputBusCount個の要素があることを確認してください。
nodeConfig.pOutputChannels = outputChannels;    // <-- vtableが1つの出力バスを指定しているため、この配列には1つの要素がある必要があります。
```

上記の例では、vtableが明示的なカウントを指定している場合、`inputBusCount`および`outputBusCount`メンバーをデフォルト以外の値に設定しないようにすることが重要です。これらのメンバーは、vtableが該当するバス数に`MA_NODE_BUS_COUNT_UNKNOWN`を指定している場合にのみ設定できます。

ほとんどの場合、ノードをいくつかの追加データと共にカプセル化する構造体を作成したくなるでしょう。この場合、`ma_node_base`オブジェクトが構造体の最初のメンバーであることを確認する必要があります。

```c
typedef struct
{
    ma_node_base base; // <-- 常に最初のメンバーであることを確認します。
    float someCustomData;
} my_custom_node;
```

このようにすることで、あなたのオブジェクトはすべての`ma_node` APIと互換性があり、他のノードと同様にグラフに接続できます。

カスタム処理コールバック（上記の例では`my_custom_node_process_pcm_frames()`）では、各バスのチャンネル数はノードが`ma_node_init()`で初期化されたときに設定で指定されたものです。さらに、各入力バスへのすべてのアタッチメントはminiaudioによって事前にミックスされています。設定により、各入力バスおよび出力バスのチャンネル数を個別に指定できます。エフェクトはそれを適切に処理する必要があり、処理できない場合は初期化ルーチンでエラーを返す必要があります。

カスタムノードには、その動作を説明するためのフラグを割り当てることができます。これらはvtableを介して設定され、以下のようなものがあります：

|フラグ名|説明|
|---|---|
|MA_NODE_FLAG_PASSTHROUGH|オーディオ処理を行わず、時間の追跡、イベントの処理などに使用されるノードに便利です。また、内部エンドポイントノードでも使用されます。入力バスから出力バスに直接読み込みます。このフラグを持つノードは、正確に1つの入力バスと1つの出力バスを持ち、両方のバスは同じチャンネル数でなければなりません。|
|MA_NODE_FLAG_CONTINUOUS_PROCESSING|入力アタッチメントからデータを読み取ることができない場合でも、処理コールバックを呼び出します。ノードに少なくとも1つの入力バスがあり、入力が接続されていないか、入力がデータを提供しない場合、ノードの処理コールバックは呼び出されません。このフラグを設定すると、入力データが受信されているかどうかに関係なく、常にコールバックが呼び出されます。これは、エコーのような効果に有用です。この効果では、元のデータソースが終了した後でも処理する必要があるオーディオデータの尾部が残ります。入力が接続されていない場合でも処理コールバックを常に呼び出す必要があるノードにも有用です。|
|MA_NODE_FLAG_ALLOW_NULL_INPUT|MA_NODE_FLAG_CONTINUOUS_PROCESSINGと組み合わせて使用されます。これが設定されている場合、処理コールバックのppFramesInパラメータは、利用可能な入力フレームがない場合にNULLに設定されます。これが設定されていない場合、処理コールバックに対して無音が提供されます。|
|MA_NODE_FLAG_DIFFERENT_PROCESSING_RATES|入力フレームと出力フレームが異なるレートで処理されることをminiaudioに伝えるために使用されます。リサンプリングを行うノードに対して設定する必要があります。|
|MA_NODE_FLAG_SILENT_OUTPUT|ノードが無音の出力のみを生成することをminiaudioに伝えます。これは、出力を最終ミックスに寄与させたくないノードに有用です。例として、ストリームを分割し、一方の分岐をファイルに出力する場合があります。このフラグを使用する場合、ノードの処理コールバックの出力バッファに書き込むのは避けるべきです。miniaudioはそれを無視するためです。|

エフェクト処理のためにオーディオストリームのコピーが必要な場合、`ma_splitter_node`と呼ばれるスプリッタノードを使用できます。これは1つの入力バスを持ち、ストリームを2つの出力バスに分割します。以下のように使用できます：

```c
ma_splitter_node_config splitterNodeConfig = ma_splitter_node_config_init(channels);

ma_splitter_node splitterNode;
result = ma_splitter_node_init(&nodeGraph, &splitterNodeConfig, NULL, &splitterNode);
if (result != MA_SUCCESS) {
    // ノードの作成に失敗しました。
}

// 出力バスを2つの異なる入力バス（2つの異なるノードでも可）に接続します。
ma_node_attach_output_bus(&splitterNode, 0, ma_node_graph_get_endpoint(&nodeGraph), 0); // エンドポイントに直接接続。
ma_node_attach_output_bus(&splitterNode, 1, &myEffectNode, 0); // あるエフェクトノードの入力バス0に接続。
```

出力バスの音量はバスごとに設定できます：

```c
ma_node_set_output_bus_volume(&splitterNode, 0, 0.5f);
ma_node_set_output_bus_volume(&splitterNode, 1, 0.5f);
```

以下のコードでは、前述のスプリッターノードを使用し、コピーされた各ストリームの音量を変更しています。

ノードを開始および停止するには、次のようにします：

```c
ma_node_set_state(&splitterNode, ma_node_state_started);    // デフォルトの状態。
ma_node_set_state(&splitterNode, ma_node_state_stopped);
```

デフォルトでは、ノードは開始状態にありますが、何にも接続されていないため、接続されるまでノードグラフによって実際には呼び出されません。ノードを停止すると、その入力接続からデータが読み取られなくなります。この特性を利用して、一連のサウンドを一度に停止できます。

ノードの初期状態を設定するには、その設定内で次のようにします：

```c
nodeConfig.initialState = ma_node_state_stopped;
```

ストックされた特殊ノードの場合、すべての設定にはベースノードに使用する設定である`nodeConfig`メンバーがあります。これは、特殊ノードの初期状態を設定する場所です：

```c
dataSourceNodeConfig.nodeConfig.initialState = ma_node_state_stopped;
```

`ma_data_source_node`や`ma_splitter_node`などの特殊ノードを使用する場合は、`nodeConfig`オブジェクトの`vtable`メンバーを変更しないように注意してください。

### 7.1. タイミング

ノードグラフは、ノードを特定の時間に開始および停止するスケジュールをサポートしています。これは、データソースノードをセットアップして、特定の時間に再生を開始する場合に特に便利です。時計にはローカルとグローバルの2種類があります。

ローカルクロックはノードごとに存在し、グローバルクロックはグラフ全体に存在します。開始および停止のスケジュール設定はグローバルクロックに基づいてのみ行えます。これは、ノードが停止している間はローカルクロックが進行しないためです。グローバルクロックは`ma_node_graph_read_pcm_frames()`が呼び出されるたびに進行します。一方、ローカルクロックはノードの処理コールバックが呼び出されると進行し、出力フレーム数に基づいて進行します。

グローバル時間を取得するには、`ma_node_graph_get_time()`を使用します。グローバル時間を設定するには、`ma_node_graph_set_time()`を使用します。これは、グローバルタイムライン上でシークを行う場合に役立ちます。ローカル時間の取得と設定も同様です。`ma_node_get_time()`を使用してローカル時間を取得し、`ma_node_set_time()`を使用してローカル時間を設定します。グローバル時間とローカル時間はオーディオスレッドによって進行するため、データ競合を避けるために注意が必要です。理想的には、ノード処理コールバックの外部でこれらの関数を呼び出すのは避けるべきです。処理コールバックは常にオーディオスレッド上で実行されます。

ノードの開始と停止のスケジュール設定には基本的なサポートがあります。一度に1つの開始と1つの停止しかスケジュールできません。これは主に、フレーム単位で正確にノードを開始または停止するために設計されています。このメカニズムがない場合、ノードの開始と停止は`ma_node_graph_read_pcm_frames()`の呼び出しの解像度に制限され、通常は数ミリ秒単位のブロックになります。以下のAPIを使用してノードの状態をスケジュールできます：

```c
ma_node_set_state_time()
ma_node_get_state_time()
```

時間は絶対値で、グローバルクロックに基づく必要があります。以下に例を示します：

```c
ma_node_set_state_time(&myNode, ma_node_state_started, sampleRate*1);   // 1秒遅延して開始。
ma_node_set_state_time(&myNode, ma_node_state_stopped, sampleRate*5);   // 5秒遅延して停止。
```

相対時間を使用して状態を変更する例です。

```c
ma_node_set_state_time(&myNode, ma_node_state_started, sampleRate*1 + ma_node_graph_get_time(&myNodeGraph));
ma_node_set_state_time(&myNode, ma_node_state_stopped, sampleRate*5 + ma_node_graph_get_time(&myNodeGraph));
```

マルチスレッドの性質上、時間が100％正確でない場合があります。これが問題となる場合、処理コールバック内で状態変更をスケジュールすることを検討してください。パススルートリガーノードを使用して時間を追跡し、イベントを処理する方法が考えられます。

### 7.2. スレッドセーフティとロック

オーディオ処理時には、オーディオスレッドでロックを使用しないことが理想的です。`ma_node_graph_read_pcm_frames()`はオーディオスレッドで実行されることが期待されているため、ロックなしで実行されます。このセクションでは、miniaudioで使用されている実装と、この目標を達成するためにminiaudioが採用したいくつかの妥協点について説明します。現在の実装が理想的でない可能性があることに注意してください。フィードバックと批評は大歓迎です。

ノードグラフAPIは完全にロックフリーではありません。`ma_node_graph_read_pcm_frames()`のみがロックフリーであることが期待されています。ノードのアタッチ、デタッチ、アンイニシャライズには、実装を簡素化するためにロックが使用されますが、これらの操作はオーディオデータの読み取り時にはロックを必要としないように作成されています。これらの領域でのロックはスピンロックによって達成されます。

`ma_node_graph_read_pcm_frames()`をロックフリーに保つための主な問題は、ノードがアンイニシャライズされ、そのメモリがオーディオスレッドで処理中に解放される可能性があるという事実に起因します。オーディオスレッドがノードを参照している場合があるため、ノードのアンイニシャライズプロセスは、オーディオスレッドが終了するまで戻りを遅延させ、呼び出し元に制御が渡されてノードのメモリを解放する機会が与えられないようにする必要があります。

オーディオスレッドがノードを処理する際には、そのノードの各出力バスからデータを読み取ります。ノードが出力バスのデータを処理するためには、各入力バスからデータを読み取る必要があります。そのため、ノードのすべての出力バスがデタッチされると、そのノード全体が切断され、出力バスが再接続されない限り（ノードがアンイニシャライズされる際には再接続は行われません）、それ以上の処理は行われなくなります。`ma_node_detach_output_bus()`がオーディオスレッドの処理が完了するまで待機することで、いくつかのことが簡素化されますが、その代わりに`ma_node_detach_output_bus()`が少し遅くなります。このようにすることで、`ma_node_uninit()`の実装が簡単になります。つまり、すべての出力ノードをデタッチし、その後、各入力ノードへの接続をデタッチし、最後に必要なクリーンアップを行います。

上記の設計において、最悪の場合、`ma_node_detach_output_bus()`はデタッチする出力バスの処理にかかる時間と同じだけの時間がかかります。これは、オーディオスレッドがそのノードの処理を開始したばかりのタイミングで呼び出された場合に発生します。`ma_node_detach_output_bus()`の呼び出し元は、オーディオスレッドが終了するまで待機しなければなりません。これには、入力データを再帰的に処理するコストも含まれます。これは、miniaudioが採用したロックフリーの処理システムにおける最大の妥協点です。パイプラインの初期段階（データソースなど）でのノードのデタッチコストは、最終的な後処理エンドポイントなどの上位レベルのノードのデタッチコストよりも安価です。大量のデタッチが必要な場合は、最下位のノードから始めて、最終エンドポイントノードに向かってデタッチを進めてください（ただし、ノードグラフのエンドポイントをデタッチしようとしないでください）。オーディオスレッドが実行されていない場合、デタッチは迅速に行われ、順序に関係なく同じ速度で行われます。ノードが入力接続の処理を完了するのを待つ必要があるのは、データソース間の同期ずれの可能性があるためです。ノードが入力の処理中に処理を終了すると、いくつかの基礎となるデータソースが読み取られ、他のデータソースは読み取られない可能性があります。これにより、上位レベルのノードをデタッチおよび再接続する際に同期ずれが発生する可能性があります。これを解決する1つの方法は、すべての入力接続を処理する前に処理を終了するオプションを持つことです。

もう1つの妥協点は、ノードのアタッチおよびデタッチ時のロックです。これは、メモリオーバーヘッドを減らすためにスピンロックを使用して達成されます。入力バスと出力バスのそれぞれにロックがあります。ノードの出力バスが他のノードの入力バスに接続されるとき、出力バスと入力バスの両方がロックされます。このロックは異なるスレッド間でのアタッチおよびデタッチのためのものであり、`ma_node_graph_read_pcm_frames()`には影響しません。ロックおよびアンロックは基本的に自明ですが、アタッチおよびデタッチが発生している間にリストを反復処理する必要がある場合のために、少し直感的でない側面もあります。

アタッチおよびデタッチは非常にシンプルです。ノードの出力バスが他のノードの入力バスに接続されると、リンクリストに追加されます。基本的に、入力バスはリンクリストであり、リストの各項目は出力バスです。実装を簡素化するために、リンクリストで行うことにいくつかの制約があります。まず、リストを反復処理する必要がある場合、前方方向にのみ行う必要があります。後方方向の反復処理はサポートされていません。また、項目はリストの先頭にのみ追加できます。

リンクリストは二重リンクリストであり、リストの各項目（出力バス）は次の項目へのポインタと前の項目へのポインタを持ちます。前の項目へのポインタはノードの高速デタッチのためにのみ必要であり、反復処理には使用されません。これは重要な特性であり、反復処理の観点から見ると、項目のアタッチおよびデタッチは単一のアトミックな代入で行うことができます。これは、アタッチおよびデタッチプロセスの両方で利用されます。ノードをアタッチする際、最初に行うのはノードのローカルな「次」および「前」のポインタの設定です。その後、項目はヘッドポインタを使用してアトミックに交換することでリストに「アタッチ」されます。その後、次の項目の「前」ポインタが設定されていなくても、反復処理の観点からはリストに「アタッチ」されます。反復処理は前方方向にのみ行われるため、「前」ポインタは実際には使用されません。同様のプロセスがデタッチにも適用されます。`ma_node_attach_output_bus()`および`ma_node_detach_output_bus()`の実装を参照してください。

## 8. デコード

`ma_decoder` APIはオーディオファイルを読み取るために使用されます。デコーダはデバイスから完全に切り離されており、独立して使用することができます。以下の形式については、組み込みのサポートが含まれています：

|形式|
|---|
|WAV|
|MP3|
|FLAC|

組み込みのデコーダを無効にするには、miniaudioの実装前に以下のオプションのうち1つまたは複数を指定します：

```c
#define MA_NO_WAV
#define MA_NO_MP3
#define MA_NO_FLAC
```

miniaudioはカスタムデコーダのプラグイン機能をサポートしています。カスタムデコーダの使用方法については、以下のセクションを参照してください。

デコーダは、`ma_decoder_init_file()`でファイルから、`ma_decoder_init_memory()`でメモリブロックから、またはコールバック経由でデータを受け取る`ma_decoder_init()`から初期化できます。以下は、ファイルからデコーダをロードする例です：

```c
ma_decoder decoder;
ma_result result = ma_decoder_init_file("MySong.mp3", NULL, &decoder);
if (result != MA_SUCCESS) {
    return false;   // エラーが発生しました。
}

...

ma_decoder_uninit(&decoder);
```

デコーダを初期化するときには、オプションで`ma_decoder_config`オブジェクトへのポインタを渡すことができます（上の例ではNULL引数）。これにより、出力形式、チャンネル数、サンプルレート、およびチャンネルマップを設定できます：

```c
ma_decoder_config config = ma_decoder_config_init(ma_format_f32, 2, 48000);
```

`ma_decoder_init*()`にデコーダ構成でNULLを渡すと、出力形式はデコードバックエンドによって定義されたものと同じになります。

デコーダからデータをPCMフレームとして読み取ります。これは実際に読み取られたPCMフレームの数を出力します。これが要求されたPCMフレーム数より少ない場合は、終端に達したことを意味します。返り値がMA_AT_ENDである場合、サンプルが読み取られず終端に達しています。

```c
ma_result result = ma_decoder_read_pcm_frames(pDecoder, pFrames, framesToRead, &framesRead);
if (framesRead < framesToRead) {
    // 終端に達しました。
}
```

また、特定のフレームにシークすることもできます：

```c
ma_result result = ma_decoder_seek_to_pcm_frame(pDecoder, targetFrame);
if (result != MA_SUCCESS) {
    return false;   // エラーが発生しました。
}
```

先頭に戻ってループさせたい場合は、単に最初のPCMフレームにシークします：

```c
ma_decoder_seek_to_pcm_frame(pDecoder, 0);
```

デコーダをロードする際、miniaudioは適切なデコードバックエンドを見つけるために試行錯誤の手法を使用します。これはタイプが既に判明している場合、不要な非効率を引き起こす可能性があります。この場合、デバイス構成内の`encodingFormat`変数を使用してデコードしたい特定のエンコーディング形式を指定できます：

```c
decoderConfig.encodingFormat = ma_encoding_format_wav;
```

利用可能なエンコーディング形式については、`ma_encoding_format`列挙型を参照してください。

`ma_decoder_init_file()` APIは、ファイル拡張子を使用して優先されるデコードバックエンドを判断しようとします。

### 8.1. カスタムデコーダ

カスタムデコーダを実装してminiaudioにプラグインすることが可能です。これは、`ma_decoder` APIを使用したいが、miniaudioが標準でサポートしていないエンコーディング形式をサポートする必要がある場合に非常に有用です。特に、`ma_engine`および/または`ma_resource_manager` APIを使用する際に役立ちます。これらは内部で`ma_decoder`を使用するためです。例えば、Opusをサポートしたい場合、カスタムデコーダを使用して実現できます（miniaudioリポジトリの"extras"フォルダには、libopus + libopusfileを使用した参考用のOpusデコーダがあります）。

カスタムデコーダはデータソースを実装する必要があります。`ma_decoding_backend_vtable`と呼ばれるvtableを実装し、デコーダ構成に渡します：

```c
ma_decoding_backend_vtable* pCustomBackendVTables[] =
{
    &g_ma_decoding_backend_vtable_libvorbis,
    &g_ma_decoding_backend_vtable_libopus
};

...

decoderConfig = ma_decoder_config_init_default();
decoderConfig.pCustomBackendUserData = NULL;
decoderConfig.ppCustomBackendVTables = pCustomBackendVTables;
decoderConfig.customBackendCount     = sizeof(pCustomBackendVTables) / sizeof(pCustomBackendVTables[0]);
```

`ma_decoding_backend_vtable` vtableには以下の関数があります：

- `onInit`
- `onInitFile`
- `onInitFileW`
- `onInitMemory`
- `onUninit`

実装が必要なのは、`onInit`と`onUninit`の2つの関数だけです。他の関数は、ファイルパスやメモリからのロードに関する小さな最適化のために実装できます。これらが指定されていない場合、miniaudioが汎用実装を使用して処理します。

カスタムデータソースを初期化する際（vtableの`onInit`関数を実装することにより）、カスタムデコーダを実装する`ma_data_source`へのポインタを出力する必要があります。これの実装方法については、データソースに関するセクションを参照してください。または、miniaudioリポジトリの"custom_decoders"の例を参照してください。

`onInit`関数は、任意のソースから生のオーディオデータを読み取るためのコールバックへのポインタを取ります。これらの関数を使用して生データから読み取り、デコードを行います。呼び出す際には、関連するパラメータに`pReadSeekTellUserData`ポインタを渡します。

`onInit`の`pConfig`パラメータは、適切な場合にバックエンドを設定するために使用できます。これはあくまでヒントとして使われるものであり、無視しても構いません。しかし、これらのプロパティがデコーダに関連する場合、最適な実装ではこれらのプロパティを適切に処理します。

メモリ割り当てが必要な場合は、可能であれば指定された割り当てコールバック（`pAllocationCallbacks`パラメータ）を介して行うべきです。

デコーダの初期化中にエラーが発生した場合は、`ppBackend`を設定せずに、またはNULLに設定し、すべてを適切にクリーンアップして適切な結果コードを返すようにしてください。複数のカスタムバックエンドが指定されている場合、miniaudioはデコーダ設定に渡された配列にリストされている順序でvtableを巡回するため、初期化ルーチンがクリーンであることが重要です。

デコーダが初期化解除されると、`onUninit`コールバックが呼び出され、内部データをクリーンアップする機会が与えられます。

## 9. エンコーディング

`ma_encoding` APIはオーディオファイルの書き込みに使用されます。唯一サポートされている出力形式はWAVです。これを無効にするには、miniaudioの実装前に次のオプションを指定します：

```c
#define MA_NO_WAV
```

エンコーダは`ma_encoder_init_file()`を使用してファイルに書き込むために初期化するか、コールバックを介して提供されるデータから初期化します。以下は、エンコーダを初期化してファイルに出力する例です。

```c
ma_encoder_config config = ma_encoder_config_init(ma_encoding_format_wav, FORMAT, CHANNELS, SAMPLE_RATE);
ma_encoder encoder;
ma_result result = ma_encoder_init_file("my_file.wav", &config, &encoder);
if (result != MA_SUCCESS) {
    // エラー処理
}

...

ma_encoder_uninit(&encoder);
```

エンコーダを初期化する際には、`ma_encoder_config_init()`で初期化された設定を指定する必要があります。ここで、ファイルタイプ、出力サンプル形式、出力チャンネル数、出力サンプルレートを指定します。以下のファイルタイプがサポートされています：

|列挙型|説明|
|---|---|
|ma_encoding_format_wav|WAV|

形式、チャンネル数、サンプルレートが出力ファイルタイプでサポートされていない場合はエラーが返されます。エンコーダはデータ変換を行わないため、オーディオデータを出力する前に変換する必要があります。オーディオデータを出力するには、以下の例のように`ma_encoder_write_pcm_frames()`を使用します：

```c
ma_uint64 framesWritten;
result = ma_encoder_write_pcm_frames(&encoder, pPCMFramesToWrite, framesToWrite, &framesWritten);
if (result != MA_SUCCESS) {
    ... エラー処理 ...
}
```

`framesWritten`変数には実際に書き込まれたPCMフレームの数が含まれます。これは任意であり、必要ない場合はNULLを渡すことができます。

エンコーダは`ma_encoder_uninit()`で初期化解除する必要があります。

## 10. データ変換

miniaudioには、ほとんどのデータ変換要件をサポートするデータ変換APIが含まれています。これには、サンプルフォーマット、チャンネル数（チャンネルマッピングを含む）、およびサンプルレート間の変換が含まれます。

### 10.1. サンプルフォーマット変換

サンプルフォーマット間の変換は、ma_pcm_*_to_*()、ma_pcm_convert()、およびma_convert_pcm_frames_format() APIを使用して実現されます。特定のフォーマット間の変換にはma_pcm_*_to_*()を使用します。ma_pcm_convert()はma_format変数に基づいて変換を行います。ma_convert_pcm_frames_format()は、フレーム数とチャンネル数を変数として指定してPCMフレームを変換する場合に使用します。

### 10.1.1. ディザリング

ディザリングはditherModeパラメータを使用して設定できます。

効率の順に、異なるディザリングモードは次の通りです：

|タイプ|列挙子|
|---|---|
|なし|ma_dither_mode_none|
|長方形|ma_dither_mode_rectangle|
|三角形|ma_dither_mode_triangle|

ディザーモードがma_dither_mode_none以外に設定されていても、ディザリングが必要ない変換では無視されることに注意してください。ディザリングは次の変換で利用可能です：

- s16 -> u8
- s24 -> u8
- s32 -> u8
- f32 -> u8
- s24 -> s16
- s32 -> s16
- f32 -> s16

ディザが使用されない変換でma_dither_mode_none以外を指定してもエラーにはなりません。ただし、無視されます。

### 10.2. チャンネル変換

チャンネル変換は、チャンネルの再配置およびチャンネル数の変換に使用されます。ma_channel_converter APIはチャンネル変換に使用されます。以下は、モノラルからステレオへの単純なチャンネルコンバータを初期化する例です。

```c
ma_channel_converter_config config = ma_channel_converter_config_init(
    ma_format,                      // サンプルフォーマット
    1,                              // 入力チャンネル数
    NULL,                           // 入力チャンネルマップ
    2,                              // 出力チャンネル数
    NULL,                           // 出力チャンネルマップ
    ma_channel_mix_mode_default);   // チャンネルを組み合わせる際のミキシングアルゴリズム

result = ma_channel_converter_init(&config, NULL, &converter);
if (result != MA_SUCCESS) {
    // エラー処理
}
```

変換を実行するには、次のようにma_channel_converter_process_pcm_frames()を呼び出します：

```c
ma_result result = ma_channel_converter_process_pcm_frames(&converter, pFramesOut, pFramesIn, frameCount);
if (result != MA_SUCCESS) {
    // エラー処理
}
```

出力バッファが新しいPCMフレームを収容できる十分なサイズであることを呼び出し元が確認する必要があります。

入力および出力のPCMフレームは常にインターリーブされています。デインターリーブされたレイアウトはサポートされていません。

### 10.2.1. チャンネルマッピング

上記の例のように、チャンネル数を変換するだけでなく、チャンネルコンバータはチャンネルを再配置するためにも使用できます。チャンネルコンバータを初期化する際に、入力および出力フレームのチャンネルマップをオプションで渡すことができます。チャンネル数が同じで、各チャンネルマップに同じチャンネル位置が含まれている場合（順序が異なるだけの場合）、単純なチャンネルのシャッフルが行われます。しかし、チャンネル位置の1:1のマッピングが存在しない場合や、チャンネル数が異なる場合は、ma_channel_converter_configオブジェクトを初期化する際に指定されたミキシングモードに基づいて入力チャンネルがミックスされます。

モノラルからマルチチャンネルに変換する場合、モノラルチャンネルは各出力チャンネルに単純にコピーされます。逆にマルチチャンネルからモノラルに変換する場合は、各出力チャンネルの音声が単純に平均化され、モノラルチャンネルにコピーされます。

より複雑な場合では、ブレンディングが使用されます。ma_channel_mix_mode_simpleモードでは、余分なチャンネルを削除し、追加のチャンネルを無音にします。例えば、4チャンネルから2チャンネルに変換する場合、3番目と4番目のチャンネルは削除され、2チャンネルから4チャンネルに変換する場合、3番目と4番目のチャンネルには無音が入ります。

ma_channel_mix_mode_rectangleモードは、矩形に基づいた空間的な位置を使用して、入力と出力の間の単純な分布を計算します。部屋の中央に座り、壁に設置されたスピーカーがチャンネル位置を表していると想像してください。MA_CHANNEL_FRONT_LEFT位置は、前面と左側の壁の角にあると考えられます。

最後に、ma_channel_mix_mode_custom_weightsモードを使用して、カスタムのユーザー定義のウェイトを使用できます。カスタムウェイトは、ma_channel_converter_config_init()の最後のパラメータとして渡すことができます。

事前定義されたチャンネルマップは、ma_channel_map_init_standard()で取得できます。これは、最初のパラメータとしてma_standard_channel_map列挙を受け取り、以下のいずれかを指定できます：

|名前|説明|
|---|---|
|ma_standard_channel_map_default|miniaudioが使用するデフォルトのチャンネルマップ。以下を参照。|
|ma_standard_channel_map_microsoft|Microsoftのビットフィールドチャンネルマップ。|
|ma_standard_channel_map_alsa|デフォルトのALSAチャンネルマップ。|
|ma_standard_channel_map_rfc3551|RFC 3551。AIFFに基づく。|
|ma_standard_channel_map_flac|FLACチャンネルマップ。|
|ma_standard_channel_map_vorbis|Vorbisチャンネルマップ。|
|ma_standard_channel_map_sound4|FreeBSDのsound(4)。|
|ma_standard_channel_map_sndio|sndioチャンネルマップ。http://www.sndio.org/tips.html。|
|ma_standard_channel_map_webaudio|https://webaudio.github.io/web-audio-api/#ChannelOrdering|

以下は、miniaudioでデフォルトで使用されるチャンネルマップ（ma_standard_channel_map_default）です：

|チャンネル数|マッピング|
|---|---|
|1 (モノラル)|0: MA_CHANNEL_MONO|
|2 (ステレオ)|0: MA_CHANNEL_FRONT_LEFT<br>1: MA_CHANNEL_FRONT_RIGHT|
|3|0: MA_CHANNEL_FRONT_LEFT<br>1: MA_CHANNEL_FRONT_RIGHT<br>2: MA_CHANNEL_FRONT_CENTER|
|4 (サラウンド)|0: MA_CHANNEL_FRONT_LEFT<br>1: MA_CHANNEL_FRONT_RIGHT<br>2: MA_CHANNEL_FRONT_CENTER<br>3: MA_CHANNEL_BACK_CENTER|
|5|0: MA_CHANNEL_FRONT_LEFT<br>1: MA_CHANNEL_FRONT_RIGHT<br>2: MA_CHANNEL_FRONT_CENTER<br>3: MA_CHANNEL_BACK_LEFT<br>4: MA_CHANNEL_BACK_RIGHT|
|6 (5.1)|0: MA_CHANNEL_FRONT_LEFT<br>1: MA_CHANNEL_FRONT_RIGHT<br>2: MA_CHANNEL_FRONT_CENTER<br>3: MA_CHANNEL_LFE<br>4: MA_CHANNEL_SIDE_LEFT<br>5: MA_CHANNEL_SIDE_RIGHT|
|7|0: MA_CHANNEL_FRONT_LEFT<br>1: MA_CHANNEL_FRONT_RIGHT<br>2: MA_CHANNEL_FRONT_CENTER<br>3: MA_CHANNEL_LFE<br>4: MA_CHANNEL_BACK_CENTER<br>4: MA_CHANNEL_SIDE_LEFT<br>5: MA_CHANNEL_SIDE_RIGHT|
|8 (7.1)|0: MA_CHANNEL_FRONT_LEFT<br>1: MA_CHANNEL_FRONT_RIGHT<br>2: MA_CHANNEL_FRONT_CENTER<br>3: MA_CHANNEL_LFE<br>4: MA_CHANNEL_BACK_LEFT<br>5: MA_CHANNEL_BACK_RIGHT<br>6: MA_CHANNEL_SIDE_LEFT<br>7: MA_CHANNEL_SIDE_RIGHT|
|その他|すべてのチャンネルは0に設定されます。これはデバイスと同じマッピングと同等です。|
### 10.3. リサンプリング

リサンプリングは、ma_resamplerオブジェクトを使用して行われます。リサンプリングオブジェクトを作成するには、次のようにします：

```c
ma_resampler_config config = ma_resampler_config_init(
    ma_format_s16,
    channels,
    sampleRateIn,
    sampleRateOut,
    ma_resample_algorithm_linear);

ma_resampler resampler;
ma_result result = ma_resampler_init(&config, &resampler);
if (result != MA_SUCCESS) {
    // エラーが発生しました...
}
```

リサンプリングを終了するには、次のようにします：

```c
ma_resampler_uninit(&resampler);
```

データを処理する例を以下に示します：

```c
ma_uint64 frameCountIn  = 1000;
ma_uint64 frameCountOut = 2000;
ma_result result = ma_resampler_process_pcm_frames(&resampler, pFramesIn, &frameCountIn, pFramesOut, &frameCountOut);
if (result != MA_SUCCESS) {
    // エラーが発生しました...
}

// この時点で、frameCountInには消費された入力フレーム数が、frameCountOutには書き込まれた出力フレーム数が含まれています。
```

リサンプリングを初期化するには、最初にma_resampler_config_init()を使用してconfig（ma_resampler_config）を設定する必要があります。使用するサンプルフォーマット、チャンネル数、入力および出力のサンプルレート、およびアルゴリズムを指定する必要があります。

サンプルフォーマットはma_format_s16またはma_format_f32のいずれかです。別のフォーマットが必要な場合は、必要に応じて自分で前処理および後処理を行う必要があります。フォーマットは入力と出力の両方で同じです。初期化後にフォーマットを変更することはできません。

リサンプリングは複数のチャンネルをサポートしており、常にインターリーブ形式（入力と出力の両方）です。チャンネル数は初期化後に変更することはできません。

サンプルレートはゼロ以外の任意の値に設定でき、常にヘルツ（Hz）単位で指定されます。例えば、44100などに設定します。サンプルレートは、初期化後に変更できる唯一の設定プロパティです。

miniaudioのリサンプリングは、以下のアルゴリズムをサポートしています：

|アルゴリズム|Enumトークン|
|---|---|
|リニア|ma_resample_algorithm_linear|
|カスタム|ma_resample_algorithm_custom|

アルゴリズムは初期化後に変更することはできません。

処理は常にPCMフレーム単位で行われ、入力と出力のインターリーブ形式を前提とします。ディインターリーブ形式の処理はサポートされていません。フレームを処理するには、ma_resampler_process_pcm_frames()を使用します。この関数は、入力として出力バッファに収まる出力フレーム数と入力バッファに含まれる入力フレーム数を取ります。出力では、これらの変数には出力バッファに書き込まれた出力フレーム数と処理中に消費された入力フレーム数が含まれます。入力バッファにNULLを渡すと、無限に大きなゼロのバッファとして扱われます。出力バッファもNULLにすることができ、その場合、処理はシークとして扱われます。

サンプルレートは動的に変更することができます。これを行うには、明示的なサンプルレートを使用するma_resampler_set_rate()や、比率（in/out）を使用するma_resampler_set_rate_ratio()を使います。

特定の出力フレーム数を出力するために必要な入力フレーム数を正確に知りたい場合があります。これにはma_resampler_get_required_input_frame_count()を使用します。同様に、特定の入力フレーム数に対して出力されるフレーム数を知りたい場合もあります。これにはma_resampler_get_expected_output_frame_count()を使用します。

リサンプリングの動作の特性上、リサンプリングにはある程度の遅延が生じます。この遅延は、入力レートおよび出力レートの両方でma_resampler_get_input_latency()およびma_resampler_get_output_latency()を使用して取得できます。

#### 10.3.1. リサンプリングアルゴリズム

リサンプリングアルゴリズムの選択は、状況や要件によって異なります。

##### 10.3.1.1. 線形リサンプリング

線形リサンプリングは最も高速ですが、その代わりに品質が低下します。ただし、線形リサンプリングの品質には一定の制御があり、要件に応じて適したオプションとなる場合があります。

線形リサンプリングは、サンプルレートの変換時にダウンサンプリングまたはアップサンプリングの前後でローパスフィルタリングを行います。サンプルレートを下げる場合、ダウンサンプリングの前にローパスフィルタが適用されます。サンプルレートを上げる場合は、アップサンプリングの後に適用されます。デフォルトでは4次のローパスフィルタが適用されますが、これはlpfOrder設定変数で構成できます。0に設定するとフィルタリングが無効になります。

ローパスフィルタにはカットオフ周波数があり、これはデフォルトで入力および出力サンプルレートのうち低い方の半分のサンプルレート（ナイキスト周波数）に設定されます。

線形リサンプラのAPIは、主なリサンプラAPIと同じですが、ma_linear_resamplerと呼ばれます。

##### 10.3.2. カスタムリサンプラ

カスタムリサンプラを実装するには、ma_resample_algorithm_customリサンプリングアルゴリズムを使用し、リサンプラ設定でvtableを設定します：

```c
ma_resampler_config config = ma_resampler_config_init(..., ma_resample_algorithm_custom);
config.pBackendVTable = &g_customResamplerVTable;
```

カスタムリサンプラは、標準のアルゴリズムが適していない場合に役立ちます。ma_resampling_backend_vtableに必要な関数を実装する必要があります。すべての関数を実装する必要はありませんが、実装可能であれば実装すべきです。

ma_linear_resamplerオブジェクトを使用して、vtableを実装する方法の例を確認できます。onGetHeapSizeコールバックは、指定された設定に基づいてカスタムリサンプラが必要とする内部ヒープ割り当てのサイズを計算するために使用されます。onInitコールバックを介してリサンプラを初期化するとき、ヒープ割り当てへのポインタが提供されるので、そこでヒープ割り当てデータを保存する必要があります。このデータはonUninitで解放しないでください。miniaudioが管理します。

onProcessコールバックは、実際にリサンプリングが行われる場所です。入力として、pFrameCountInはpFramesInバッファ内のフレーム数を含む変数を指し、pFrameCountOutはpFramesOutバッファの容量をフレーム単位で含む変数を指します。出力として、pFrameCountInは完全に消費された入力フレーム数に設定され、pFrameCountOutはpFramesOutに書き込まれたフレーム数に設定されます。

onSetRateコールバックはオプションで、サンプルレートを動的に変更するために使用されます。動的レート変更がサポートされていない場合、このコールバックをNULLに設定できます。

onGetInputLatencyおよびonGetOutputLatency関数は、それぞれ入力および出力レートの遅延を取得するために使用されます。これらはNULLに設定することもでき、その場合、遅延計算はNULLとして仮定されます。

onGetRequiredInputFrameCountコールバックは、指定された出力フレーム数を生成するために必要な入力フレーム数についてminiaudioにヒントを与えるために使用されます。同様に、onGetExpectedOutputFrameCountコールバックは、指定された入力フレーム数に対して生成される出力フレーム数を決定するために使用されます。miniaudioはこれらをヒントとして使用しますが、オプションであり、実装できない場合はNULLに設定できます。

### 10.4. 一般的なデータ変換

ma_data_converter APIは、サンプルフォーマット変換、チャンネル変換、およびリサンプリングを1つの操作にまとめるために使用できます。これは、デバイスが初期化されたときに要求されたフォーマットとバックエンドのネイティブデバイスのフォーマット間の変換を行うためにminiaudioが内部で使用しているものです。一般的なデータ変換のAPIはリサンプリングAPIと非常に似ています。ma_data_converterオブジェクトを次のように作成します：

```c
ma_data_converter_config config = ma_data_converter_config_init(
    inputFormat,
    outputFormat,
    inputChannels,
    outputChannels,
    inputSampleRate,
    outputSampleRate
);

ma_data_converter converter;
ma_result result = ma_data_converter_init(&config, NULL, &converter);
if (result != MA_SUCCESS) {
    // エラーが発生しました...
}
```

上記の例ではma_data_converter_config_init()を使用してconfigを初期化していますが、チャンネルマップやリサンプリングの品質など、さらに多くのプロパティを構成できます。以下のような設定が、要件によってはより適しているかもしれません：

```c
ma_data_converter_config config = ma_data_converter_config_init_default();
config.formatIn = inputFormat;
config.formatOut = outputFormat;
config.channelsIn = inputChannels;
config.channelsOut = outputChannels;
config.sampleRateIn = inputSampleRate;
config.sampleRateOut = outputSampleRate;
ma_channel_map_init_standard(ma_standard_channel_map_flac, config.channelMapIn, sizeof(config.channelMapIn)/sizeof(config.channelMapIn[0]), config.channelCountIn);
config.resampling.linear.lpfOrder = MA_MAX_FILTER_ORDER;
```

データコンバータを終了するには、次の操作を行います：

```c
ma_data_converter_uninit(&converter, NULL);
```

以下の例は、データを処理する方法を示しています：

```c
ma_uint64 frameCountIn  = 1000;
ma_uint64 frameCountOut = 2000;
ma_result result = ma_data_converter_process_pcm_frames(&converter, pFramesIn, &frameCountIn, pFramesOut, &frameCountOut);
if (result != MA_SUCCESS) {
    // エラーが発生しました...
}

// この時点で、frameCountInには消費された入力フレームの数が、frameCountOutには出力されたフレームの数が入っています。
```

データコンバータは複数のチャンネルをサポートしており、常にインターリーブ形式です（入力も出力も）。チャンネル数は初期化後に変更することはできません。

サンプルレートはゼロ以外の任意の値を指定できます。通常、44100Hzなどの値を設定します。サンプルレートは初期化後に変更できる唯一の構成プロパティですが、変更するにはma_data_converter_configのresampling.allowDynamicSampleRateメンバーをMA_TRUEに設定する必要があります。サンプルレートを変更するには、ma_data_converter_set_rate()またはma_data_converter_set_rate_ratio()を使用します。比率はin/outで指定します。リサンプリングアルゴリズムは初期化後に変更することはできません。

処理は常にPCMフレーム単位で行われ、常にインターリーブされた入力および出力を前提としています。デインターリーブされた処理はサポートされていません。フレームを処理するには、ma_data_converter_process_pcm_frames()を使用します。入力として、この関数は出力バッファに収まる出力フレーム数と、入力バッファに含まれる入力フレーム数を受け取ります。出力として、これらの変数には出力バッファに書き込まれた出力フレーム数と、処理中に消費された入力フレーム数が入ります。入力バッファにNULLを渡すと、無限大のゼロバッファとして扱われます。出力バッファもNULLにすることができ、その場合、処理はシークとして扱われます。

特定のフレーム数を出力するために必要な入力フレーム数を正確に知ることが有用な場合があります。これを計算するには、ma_data_converter_get_required_input_frame_count()を使用します。同様に、特定の入力フレーム数に対して出力されるフレーム数を正確に知ることも有用です。これを行うには、ma_data_converter_get_expected_output_frame_count()を使用します。

リサンプリングが必要な場合、その性質上、データコンバータはある程度の遅延を引き起こします。これは、入力レートおよび出力レートの両方に関して、ma_data_converter_get_input_latency()およびma_data_converter_get_output_latency()で取得できます。

## 11. フィルタリング

### 11.1. バイカッドフィルタリング

バイカッドフィルタリングは `ma_biquad` API を使用して実現されます。例：

```c
ma_biquad_config config = ma_biquad_config_init(ma_format_f32, channels, b0, b1, b2, a0, a1, a2);
ma_result result = ma_biquad_init(&config, &biquad);
if (result != MA_SUCCESS) {
    // エラーが発生しました。
}

...

ma_biquad_process_pcm_frames(&biquad, pFramesOut, pFramesIn, frameCount);
```

バイカッドフィルタリングは、変換直列形式2（transposed direct form 2）を使用して実装されています。分子の係数は b0、b1、b2 で、分母の係数は a0、a1、a2 です。a0 係数は必須で、係数は事前に正規化されていてはなりません。

サポートされているフォーマットは `ma_format_s16` と `ma_format_f32` です。異なるフォーマットを使用する場合は、事前に自分で変換する必要があります。`ma_format_s16` を使用する場合、バイカッドフィルタは固定小数点演算を使用し、`ma_format_f32` を使用する場合、浮動小数点演算を使用します。

入力と出力のフレームは常にインターリーブされています。

フィルタリングは、入力と出力バッファに同じポインタを渡すことでインプレースに適用できます。例：

```c
ma_biquad_process_pcm_frames(&biquad, pMyData, pMyData, frameCount);
```

係数の値を変更する必要があるが、レジスタの値を保持したい場合は、`ma_biquad_reinit()` を使用できます。これは、フィルタの特性を変更しつつ、レジスタの値を有効に保ち、グリッチを避けるために役立ちます。`ma_biquad_init()` を使用しないでください。これはレジスタを0にクリアする完全な初期化を行います。初期化後にフォーマットやチャンネル数を変更することは無効であり、エラーが発生します。

### 11.2. ローパスフィルタリング

ローパスフィルタリングは次のAPIを使用して実現されます：

|API|説明|
|---|---|
|ma_lpf1|1次ローパスフィルタ|
|ma_lpf2|2次ローパスフィルタ|
|ma_lpf|高次ローパスフィルタ（バターワース）|

ローパスフィルタの例：

```c
ma_lpf_config config = ma_lpf_config_init(ma_format_f32, channels, sampleRate, cutoffFrequency, order);
ma_result result = ma_lpf_init(&config, &lpf);
if (result != MA_SUCCESS) {
    // エラーが発生しました。
}

...

ma_lpf_process_pcm_frames(&lpf, pFramesOut, pFramesIn, frameCount);
```

サポートされているフォーマットは `ma_format_s16` と `ma_format_f32` です。異なるフォーマットを使用する場合は、事前に自分で変換する必要があります。入力と出力のフレームは常にインターリーブされています。

フィルタリングは、入力と出力バッファに同じポインタを渡すことでインプレースに適用できます。例：

```c
ma_lpf_process_pcm_frames(&lpf, pMyData, pMyData, frameCount);
```

フィルタの最大順序は `MA_MAX_FILTER_ORDER` に制限されており、これは8に設定されています。これ以上の順序が必要な場合は、1次および2次フィルタを連結することができます。

```c
for (iFilter = 0; iFilter < filterCount; iFilter += 1) {
    ma_lpf2_process_pcm_frames(&lpf2[iFilter], pMyData, pMyData, frameCount);
}
```

フィルタの設定を変更する必要があるが、内部レジスタの状態を保持したい場合、`ma_lpf_reinit()` を使用することができます。これにより、スムーズな遷移を維持しながらサンプルレートやカットオフ周波数を動的に変更する場合に役立ちます。初期化後にフォーマットやチャンネル数を変更することは無効であり、エラーが発生します。

`ma_lpf` オブジェクトは設定可能な順序をサポートしていますが、1次フィルタのみが必要な場合は `ma_lpf1` を、2次フィルタのみが必要な場合は `ma_lpf2` を使用することを検討してください。これらを使用する利点は、より軽量で効率的であることです。

偶数のフィルタ順序が指定された場合、2次フィルタのシリーズがチェーンで処理されます。奇数のフィルタ順序が指定された場合、1次フィルタが適用され、その後に2次フィルタのシリーズがチェーンで処理されます。

### 11.3. ハイパスフィルタリング

ハイパスフィルタリングは次のAPIを使用して実現されます：

|API|説明|
|---|---|
|ma_hpf1|1次ハイパスフィルタ|
|ma_hpf2|2次ハイパスフィルタ|
|ma_hpf|高次ハイパスフィルタ（バターワース）|

ハイパスフィルタはローパスフィルタと同じように動作しますが、APIは `ma_hpf1`、`ma_hpf2`、および `ma_hpf` と呼ばれます。ローパスフィルタの使用例を参照してください。

### 11.4. バンドパスフィルタリング

バンドパスフィルタリングは次のAPIを使用して実現されます：

|API|説明|
|---|---|
|ma_bpf2|2次バンドパスフィルタ|
|ma_bpf|高次バンドパスフィルタ|

バンドパスフィルタはローパスフィルタと同じように動作しますが、APIは `ma_bpf2` と `ma_bpf` と呼ばれます。ローパスフィルタの使用例を参照してください。バンドパスフィルタの順序は偶数である必要があるため、ローパスフィルタやハイパスフィルタとは異なり、1次バンドパスフィルタは存在しません。

### 11.5. ノッチフィルタリング

ノッチフィルタリングは次のAPIを使用して実現されます：

|API|説明|
|---|---|
|ma_notch2|2次ノッチフィルタ|

### 11.6. ピーキングEQフィルタリング

ピーキングフィルタリングは次のAPIを使用して実現されます：

|API|説明|
|---|---|
|ma_peak2|2次ピーキングフィルタ|

### 11.7. ローシェルフフィルタリング

ローシェルフフィルタリングは次のAPIを使用して実現されます：

|API|説明|
|---|---|
|ma_loshelf2|2次ローシェルフフィルタ|

ハイパスフィルタが低周波数を除去するのに対して、ローシェルフフィルタはそれらを完全に除去するのではなく、単に音量を下げるために使用できます。

### 11.8. ハイシェルフフィルタリング

ハイシェルフフィルタリングは次のAPIを使用して実現されます：

|API|説明|
|---|---|
|ma_hishelf2|2次ハイシェルフフィルタ|

ハイシェルフフィルタはローシェルフフィルタと同じAPIを持っていますが、`ma_loshelf` の代わりに `ma_hishelf` を使用します。ローシェルフフィルタが低周波数の音量を調整するのに対し、ハイシェルフフィルタは高周波数の音量を調整します。

## 12. 波形とノイズの生成

### 12.1. 波形

miniaudioは、サイン波、矩形波、三角波、のこぎり波の生成をサポートしています。これは、ma_waveform APIを使用して実現されます。例：

```c
ma_waveform_config config = ma_waveform_config_init(
    FORMAT,
    CHANNELS,
    SAMPLE_RATE,
    ma_waveform_type_sine,
    amplitude,
    frequency);

ma_waveform waveform;
ma_result result = ma_waveform_init(&config, &waveform);
if (result != MA_SUCCESS) {
    // エラー処理
}

...

ma_waveform_read_pcm_frames(&waveform, pOutput, frameCount);
```

振幅、周波数、タイプ、およびサンプルレートは、それぞれ ma_waveform_set_amplitude()、ma_waveform_set_frequency()、ma_waveform_set_type()、ma_waveform_set_sample_rate() を使用して動的に変更できます。

振幅を負の値に設定することで波形を反転できます。これを利用して、例えばのこぎり波が正のランプか負のランプかを制御できます。

サポートされている波形タイプは以下の通りです：

|列挙型名|
|---|
|ma_waveform_type_sine|
|ma_waveform_type_square|
|ma_waveform_type_triangle|
|ma_waveform_type_sawtooth|

### 12.2. ノイズ

miniaudioは、ホワイトノイズ、ピンクノイズ、ブラウニアンノイズの生成をma_noise APIを介してサポートしています。例：

```c
ma_noise_config config = ma_noise_config_init(
    FORMAT,
    CHANNELS,
    ma_noise_type_white,
    SEED,
    amplitude);

ma_noise noise;
ma_result result = ma_noise_init(&config, &noise);
if (result != MA_SUCCESS) {
    // エラー処理
}

...

ma_noise_read_pcm_frames(&noise, pOutput, frameCount);
```

ノイズAPIはシンプルなLCG乱数生成を使用しています。再現性が求められる自動テストなどに便利なカスタムシードをサポートしています。シードをゼロに設定すると、MA_DEFAULT_LCG_SEEDがデフォルトで使用されます。

振幅とシードは、それぞれ ma_noise_set_amplitude() および ma_noise_set_seed() を使用して動的に変更できます。

デフォルトでは、ノイズAPIは異なるチャンネルに異なる値を使用します。例えば、ステレオストリームの左チャンネルと右チャンネルは異なる値になります。同じランダム値を各チャンネルに使用するには、ノイズコンフィグのduplicateChannelsメンバーをtrueに設定します。例：

```c
config.duplicateChannels = MA_TRUE;
```

サポートされているノイズタイプは以下の通りです。

|列挙型名|
|---|
|ma_noise_type_white|
|ma_noise_type_pink|
|ma_noise_type_brownian|

## 13. オーディオバッファ

miniaudioは、ma_audio_buffer APIを介して生のオーディオデータのバッファからの読み取りをサポートしています。これは、アプリケーションによって管理されるメモリから読み取ることができますが、内部的にメモリ管理も行えます。メモリ管理は柔軟で、ほとんどの使用ケースに対応できます。

オーディオバッファは、miniaudio全体で使用される標準の構成システムを使用して初期化されます。

```c
ma_audio_buffer_config config = ma_audio_buffer_config_init(
    format,
    channels,
    sizeInFrames,
    pExistingData,
    &allocationCallbacks);

ma_audio_buffer buffer;
result = ma_audio_buffer_init(&config, &buffer);
if (result != MA_SUCCESS) {
    // エラー処理
}

...

ma_audio_buffer_uninit(&buffer);
```

上記の例では、pExistingDataが指すメモリはコピーされず、これはアプリケーションが自己管理するメモリ割り当てを行う方法です。データをコピーしたい場合は、ma_audio_buffer_init_copy()を使用します。バッファの初期化解除には、ma_audio_buffer_uninit()を使用します。

場合によっては、ma_audio_buffer構造体と生のオーディオデータのメモリを連続したブロックに割り当てると便利です。つまり、生のオーディオデータはma_audio_buffer構造体の直後に配置されます。これを行うには、ma_audio_buffer_alloc_and_init()を使用します。

```c
ma_audio_buffer_config config = ma_audio_buffer_config_init(
    format,
    channels,
    sizeInFrames,
    pExistingData,
    &allocationCallbacks);

ma_audio_buffer* pBuffer;
result = ma_audio_buffer_alloc_and_init(&config, &pBuffer);
if (result != MA_SUCCESS) {
    // エラー処理
}

...

ma_audio_buffer_uninit_and_free(&pBuffer);
```

バッファをma_audio_buffer_alloc_and_init()で初期化した場合は、ma_audio_buffer_uninit_and_free()で初期化解除する必要があります。上記の例では、pExistingDataが指すメモリはバッファにコピーされます。これはma_audio_buffer_init()の動作とは異なります。

オーディオバッファにはデコーダと同様に再生カーソルがあります。バッファからフレームを読み取ると、カーソルは前方に進みます。最後のパラメータ（ループ）は、バッファをループさせるかどうかを決定するために使用されます。戻り値は実際に読み取られたフレーム数です。これが要求されたフレーム数より少ない場合は、終端に達したことを意味します。ループパラメータがtrueに設定されている場合、これは発生しません。手動で開始位置に戻す場合は、ma_audio_buffer_seek_to_pcm_frame(pAudioBuffer, 0)を使用できます。以下に、オーディオバッファからデータを読み取る例を示します。

```c
ma_uint64 framesRead = ma_audio_buffer_read_pcm_frames(pAudioBuffer, pFramesOut, desiredFrameCount, isLooping);
if (framesRead < desiredFrameCount) {
    // ループしていない場合、これは終端に達したことを意味します。ループモードで有効な入力がある場合、これは発生しないはずです。
}
```

時々、内部バッファと出力バッファ間のデータ移動のコストを避けたいことがあります。その代わりに、メモリマッピングを使用してデータのセグメントへのポインタを取得できます。

```c
void* pMappedFrames;
ma_uint64 frameCount = frameCountToTryMapping;
ma_result result = ma_audio_buffer_map(pAudioBuffer, &pMappedFrames, &frameCount);
if (result == MA_SUCCESS) {
    // マッピングが成功しました。frameCountの値は、実際にマッピングされたフレーム数になります。バッファの終端に達したために少なくなることがあります。
    ma_copy_pcm_frames(pFramesOut, pMappedFrames, frameCount, pAudioBuffer->format, pAudioBuffer->channels);

    // バッファのマッピングを解除する必要があります。
    ma_audio_buffer_unmap(pAudioBuffer, frameCount);
}
```

メモリマッピングを使用するときは、ma_audio_buffer_unmap()に渡されたフレーム数によって読み取りカーソルが増加します。すべてのフレームを処理しない場合は、ma_audio_buffer_map()によって返された値より小さい値を渡すことができます。メモリマッピングを使用する際の欠点は、ループ処理を自動的に行わないことです。バッファが終端に達したかどうかを確認するには、ma_audio_buffer_at_end()を使用するか、ma_audio_buffer_unmap()の戻り値を調べて、それがMA_AT_ENDと等しいかどうかを確認します。ma_audio_buffer_unmap()がMA_AT_ENDを返した場合、それをエラーとして扱うべきではありません。

## 14. リングバッファ

miniaudioは、ロックフリー（シングルプロデューサー、シングルコンシューマー）のリングバッファをサポートしており、これらはma_rbとma_pcm_rb APIを介して利用できます。ma_rb APIはバイト単位で動作し、ma_pcm_rbはPCMフレーム単位で動作します。それ以外の点では、ma_pcm_rbはma_rbのラッパーに過ぎないため、両者は同一です。

他の多くのminiaudioのAPIとは異なり、リングバッファはインターリーブおよびデインターリーブストリームの両方をサポートしています。呼び出し側は、リングバッファが内部で使用するメモリを自己管理のために割り当てることもできます。そうでない場合、リングバッファは内部メモリを管理します。

以下の例では、最も一般的に使用されるであろうPCMフレームバリアントのリングバッファを使用しています。リングバッファを初期化するには、次のようにします。

```c
ma_pcm_rb rb;
ma_result result = ma_pcm_rb_init(FORMAT, CHANNELS, BUFFER_SIZE_IN_FRAMES, NULL, NULL, &rb);
if (result != MA_SUCCESS) {
    // エラー処理
}
```

ma_pcm_rb_init()関数は、リングバッファAPIのPCMバリアントであるため、サンプル形式とチャネル数をパラメータとして取ります。バイト単位で動作する通常のリングバッファの場合は、ma_rb_init()を呼び出し、これらのパラメータを省略し、フレーム数の代わりにバッファのサイズをバイト単位で指定します。第四パラメータはオプションの事前割り当てバッファであり、第五パラメータはカスタムメモリアロケーションルーチンのためのma_allocation_callbacks構造体へのポインタです。これにNULLを渡すと、MA_MALLOC()とMA_FREE()が使用されます。

デインターリーブバッファが必要な場合は、ma_pcm_rb_init_ex()を使用します。各サブバッファのデータはストライドに基づいてオフセットされます。サブバッファを管理するには、ma_pcm_rb_get_subbuffer_stride()、ma_pcm_rb_get_subbuffer_offset()、およびma_pcm_rb_get_subbuffer_ptr()を使用できます。

ma_pcm_rb_acquire_read()とma_pcm_rb_acquire_write()を使用して、リングバッファのセクションへのポインタを取得します。必要なフレーム数を指定すると、出力時に実際に取得されたフレーム数が設定されます。読み取りまたは書き込みポインタが、要求されたフレーム数がループを必要とする位置にある場合、それはバッファの終端にクランプされます。したがって、取得されるフレーム数は要求された数より少ない場合があります。

ma_pcm_rb_acquire_read()またはma_pcm_rb_acquire_write()を呼び出した後、バッファ上で作業を行い、ma_pcm_rb_commit_read()またはma_pcm_rb_commit_write()でそれを「コミット」します。これにより、読み取り/書き込みポインタが更新されます。コミットするときには、先にma_pcm_rb_acquire_read()またはma_pcm_rb_acquire_write()の呼び出しで返されたバッファを渡す必要があります。これは検証のためにのみ使用されます。ma_pcm_rb_commit_read()およびma_pcm_rb_commit_write()に渡すフレーム数は、ポインタをインクリメントするために使用され、最初に要求された数より少なくてもかまいません。

書き込みポインタと読み取りポインタの間のドリフトを修正したい場合は、ma_pcm_rb_pointer_distance()、ma_pcm_rb_seek_read()、ma_pcm_rb_seek_write()の組み合わせを使用できます。ポインタを前方にのみ移動できることに注意してください。また、読み取りポインタはコンシューマースレッドによって前方に移動され、書き込みポインタはプロデューサースレッドによって前方に移動されるべきです。ポインタ間にスペースが多すぎる場合は、読み取りポインタを前方に移動します。ポインタ間にスペースが少なすぎる場合は、書き込みポインタを前方に移動します。

バイトレベルのリングバッファを使用したい場合は、ma_rb APIを使用できます。これは完全に同じですが、ma_pcm_rbの代わりにma_rb関数を使用し、フレーム数の代わりにバイト数を渡します。

バッファの最大サイズは0x7FFFFFFF-(MA_SIMD_ALIGNMENT-1)バイトです。これは最上位ビットがループフラグのエンコードに使用され、内部管理バッファが常にMA_SIMD_ALIGNMENTに揃えられているためです。

リングバッファは、単一のコンシューマースレッドと単一のプロデューサースレッドによって使用される場合にのみスレッドセーフであることに注意してください。

## 15. バックエンド

miniaudioがサポートするバックエンドは以下の通りです。これらはデフォルトの優先順位順にリストされています。コンテキストやデバイスを初期化する際にバックエンドが指定されていない場合、miniaudioは以下の表に記載されている順にバックエンドを試行します。

ビルドターゲットによって使用できないバックエンドはビルドに含まれないことに注意してください。たとえば、Linux専用のALSAはWindowsビルドには含まれません。

|名前|列挙名|サポートされるオペレーティングシステム|
|---|---|---|
|WASAPI|ma_backend_wasapi|Windows Vista+|
|DirectSound|ma_backend_dsound|Windows XP+|
|WinMM|ma_backend_winmm|Windows 95+|
|Core Audio|ma_backend_coreaudio|macOS, iOS|
|sndio|ma_backend_sndio|OpenBSD|
|audio(4)|ma_backend_audio4|NetBSD, OpenBSD|
|OSS|ma_backend_oss|FreeBSD|
|PulseAudio|ma_backend_pulseaudio|クロスプラットフォーム（Windows、BSD、Androidでは無効）|
|ALSA|ma_backend_alsa|Linux|
|JACK|ma_backend_jack|クロスプラットフォーム（BSD、Androidでは無効）|
|AAudio|ma_backend_aaudio|Android 8+|
|OpenSL ES|ma_backend_opensl|Android (APIレベル16+)|
|Web Audio|ma_backend_webaudio|Web (Emscripten経由)|
|カスタム|ma_backend_custom|クロスプラットフォーム|
|Null|ma_backend_null|クロスプラットフォーム（Webでは使用されない）|

一部のバックエンドには注意すべき微妙な詳細があります。

### 15.1. WASAPI

- アプリケーションが定義したサンプルレートがデバイスのネイティブサンプルレートと異なる場合、低遅延の共有モードは無効になります。この問題を回避するには、デバイス構成で`wasapi.noAutoConvertSRC`をtrueに設定してください。これは、`IAudioClient3_InitializeSharedAudioStream()`が`AUDCLNT_STREAMFLAGS_AUTOCONVERTPCM`フラグを指定したときに失敗するためです。`wasapi.noAutoConvertSRC`を設定すると、miniaudioの内部リサンプラが使用され、それにより低遅延の共有モードが有効になります。

### 15.2. PulseAudio

- Arch Linuxでひどいグリッチングやノイズが発生する場合、Archのwikiにある以下の修正を試してください: https://wiki.archlinux.org/index.php/PulseAudio/Troubleshooting#Glitches,_skips_or_crackling。または、ALSAなどの別のバックエンドを検討してください。

### 15.3. Android

- Androidで音声をキャプチャするには、マニフェストに`RECORD_AUDIO`の許可を追加することを忘れないでください: `<uses-permission android:name="android.permission.RECORD_AUDIO" />`
- OpenSL|ESを使用する場合、同時にアクティブにできる`ma_context`は1つだけです。これはOpenSL|ESの制限によるものです。
- AAudioを使用する場合、デフォルトデバイスのみが列挙されます。これは、AAudioに列挙APIがなく（デバイスはJavaを通じて列挙されます）、ただし、Javaを使用して独自にデバイスを列挙し、そのIDを`ma_device_id`構造体に設定して`ma_device_init()`に渡すことができます。
- バックエンドAPIは可能な限りリサンプリングを実行します。これは、ドライバーが実装する可能性のあるデバイス固有の最適化を活用するためです。

### BSD

- sndioバックエンドは現在、OpenBSDビルドでのみ有効です。
- audio(4)バックエンドはOpenBSDでサポートされていますが、使用する前にsndiodを無効にする必要がある場合があります。

### 15.4. UWP

- UWPはデフォルトの再生およびキャプチャデバイスのみをサポートしています。
- UWPでは、アプリケーションのマニフェスト（`Package.appxmanifest`）でマイク機能を有効にする必要があります:

```xml
<Package ...>
    ...
    <Capabilities>
        <DeviceCapability Name="microphone" />
    </Capabilities>
</Package>
```

### 15.5. Web Audio / Emscripten

- `-std=c*`や`-ansi`のコンパイラフラグは使用できません。これはEmscriptenビルドにのみ適用されます。
- コンテキストが初めて初期化されるとき、"miniaudio"という名前のグローバルオブジェクトが作成され、主にデバイスオブジェクトのファクトリとして機能します。
- 現在、Web Audioバックエンドは`ScriptProcessorNode`を使用していますが、これらは非推奨になっているため、将来的には変更が必要になるかもしれません。
- Googleは、ユーザーからの入力を受け取らない限り、自動的なメディア出力を禁止するポリシーをブラウザに実装しています。詳細は次のウェブページにあります: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes。ユーザー入力を処理する前に再生を開始しようとすると、デバイスの開始が失敗することがあります。

## 16. 最適化のヒント

以下に、パフォーマンスを向上させるためのヒントをいくつか紹介します。

### 16.1. 低レベルAPI

- データコールバック内で、出力バッファにコピーする前にデータが既にクリップされている場合、デバイス構成の`noClip`オプションを`true`に設定してください。これにより、miniaudioの内蔵クリッピング機能が無効になります。
- デフォルトでは、miniaudioはデータコールバックの出力バッファを事前に消音します。常に有効なデータを出力バッファに書き込むことが分かっている場合は、デバイス構成の`noPreSilence`オプションを`true`に設定して事前消音を無効にすることができます。

### 16.2. 高レベルAPI

- サウンドがドップラー効果やピッチシフトを必要としない場合、`MA_SOUND_FLAG_NO_PITCH`フラグを使用してサウンドを初期化することでピッチングを無効にすることを検討してください。
- サウンドが空間化を必要としない場合、`MA_SOUND_FLAG_NO_SPATIALIZATION`フラグを使用してサウンドを初期化することで空間化を無効にします。初期化後に`ma_sound_set_spatialization_enabled()`で再度有効にすることもできます。
- すべてのサウンドが常に同じサンプルレートであることが分かっている場合、エンジンのサンプルレートをサウンドのサンプルレートに合わせて設定してください。同様に、自己管理型リソースマネージャーを使用している場合は、デコードされたサンプルレートをサウンドに合わせて設定することを検討してください。すべての設定を一貫したサンプルレートにすることで、サンプルレート変換を回避できます。

## 17. その他の注意事項

- 自動ストリームルーティングはバックエンドごとに有効になります。WASAPIとCore Audioでは明示的にサポートが有効になっていますが、PulseAudioなどの他のバックエンドでも自然にサポートされる場合がありますが、すべてがテストされているわけではありません。
- VC6およびそれ以前のバージョンでコンパイルする場合、デコードは2GB未満のファイルに制限されます。これは、64ビットのファイルAPIが利用できないためです。