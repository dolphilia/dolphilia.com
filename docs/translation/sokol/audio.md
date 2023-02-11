## sokol_audio.h

クロスプラットフォーム・オーディオストリーミングAPI

プロジェクトURL: https://github.com/floooh/sokol

このファイルをCまたはC++ファイルにインクルードする前に記述してください。

```c
#define SOKOL_IMPL
```

または

```c
#define SOKOL_AUDIO_IMPL
```

オプションとして以下の定義を独自の実装で提供する:

- SOKOL_DUMMY_BACKEND  - ダミーバックエンドを使用する
- SOKOL_ASSERT(c)      - 独自のアサートマクロ (デフォルト: assert(c))
- SOKOL_AUDIO_API_DECL - 公開関数宣言のプレフィックス (デフォルト: extern)
- SOKOL_API_DECL       - SOKOL_AUDIO_API_DECL と同じです。
- SOKOL_API_IMPL       - public 関数実装の接頭辞（デフォルト：-）。

- SAUDIO_RING_MAX_SLOTS           - プッシュオーディオリングバッファの最大スロット数 (デフォルト 1024)
- SAUDIO_OSX_USE_SYSTEM_HEADERS   - macOS で埋め込み CoreAudio 宣言の代わりにシステムヘッダを強制的にインクルードするために、これを定義します。

sokol_audio.hがDLLとしてコンパイルされる場合、宣言または実装を含む前に以下を定義してください。:

```c
SOKOL_DLL
```

Windowsでは、SOKOL_DLLは、必要に応じてSOKOL_AUDIO_API_DECLを__declspec(dllexport) または __declspec(dllimport) として定義します。

以下のライブラリーとリンクしています。

- macOS: AudioToolbox
- iOS: AudioToolbox, AVFoundation
- Linux: asound
- Android: OpenSLESとのリンク
- Windows + MSVC または Clang ツールチェイン: pragma-comment-libによりソース内で定義されるため、何もする必要はありません。
- Windows + MINGW/MSYS2 + gcc: mwin32 でコンパイルし、-lole32 でリンクする。


## 機能概要

32ビットフロートサンプルのモノラルまたはステレオストリームを提供し、Sokol Audioがプラットフォーム固有のオーディオバックエンドにフィードします:

- Windows: WASAPI
- Linux: ALSA
- macOS: CoreAudio
- iOS: CoreAudio + AVAudioSession
- emscripten: ScriptProcessorNodeを使ったWebAudio
- Android: OpenSLES

Sokol-Audioは、バッファミキシングやボリュームコントロールは行いませんので、複数の独立したサンプルデータの入力ストリームがある場合は、Sokol Audioにデータを転送する前に自分でミキシングを行う必要があります。

サンプルデータの提供方法には、次の2つがあります。:

1. コールバックモデル。Sokol Audioが新しいサンプルを必要とするときに呼び出されるコールバック関数を提供します。emscriptenを除くすべてのプラットフォームで、この関数は別のスレッドから呼び出されます。
2. プッシュモデル。サンプルデータの小さなブロックを、メインループや作成したスレッドからプッシュするコードです。プッシュされたデータはリングバッファに格納され、必要なときにバックエンドのコードによって引き出されます。

コールバックモデルは、サンプルデータをオーディオバックエンドに送り込む最も直接的な方法であり、また可動部が少ない（あなたのコードとオーディオバックエンドの間にリングバッファがない）ため、好まれます。

時には、別のスレッドで実行されるコールバック関数で直接オーディオストリームを生成することができない場合があります。このような場合、Sokol Audioは便利なプッシュモデルを提供します。

## sokol-audio, SoLoud と MiniAudio

WASAPI, ALSA, OpenSLES, CoreAudio のバックエンドコードは SoLoud ライブラリから引用しています (若干の修正を加えているので、バグがあれば私のせいです)。もし、より高機能なオーディオソリューションが必要であれば、SoLoud をチェックしてみてください、素晴らしいです。

https://github.com/jarikomppa/soloud

SoLoudとsokol-audioの中間的な機能を持つMiniAudioは、もう一つの選択肢です:

https://github.com/mackron/miniaudio

## 用語集

- stream buffer:

内部のオーディオデータバッファで、通常はバックエンド API によって提供されます。ストリームバッファのサイズは基本レイテンシーを定義し、より小さなバッファはより低いレイテンシーを持ちますが、オーディオグリッチを引き起こす可能性があります。より大きなバッファはグリッチを軽減または除去しますが、より高い基本レイテンシを持ちます。

- stream callback:

Sokol Audioが新しいサンプルを必要とするときに呼び出される、オプションのコールバック関数です。Windows、macOS/iOS、Linuxでは、これは別のスレッドで呼び出され、WebAudioでは、ブラウザのスレッドでフレームごとに呼び出されます。

- channel:

オーディオデータのディスクリートトラックで、現在1チャンネル（モノラル）、2チャンネル（ステレオ）をサポートし、テストしています。

- sample:

ある時間における、あるチャンネルのオーディオ信号の大きさ。Sokol Audioでは、サンプルは-1.0から+1.0の範囲にある32ビット浮動小数点数である。

- frame:

ある時間における全チャンネルのサンプルの密な集合。モノラルでは1フレームは1サンプルです。ステレオの場合、1フレームは2サンプルです。

- packet:

Sokol Audioでは、メインスレッドが新しいオーディオデータを提供する速度と、ストリーミングスレッドがオーディオデータを消費する速度を切り離すために、オーディオデータの小さなチャンクがメインスレッドからオーディオストリーミングスレッドに移動されます。

## sokol-audioとの連携

まず、お好みのオーディオ再生オプションで saudio_setup() を呼び出します。ほとんどの場合、デフォルト値のままでかまいません。これらは、すべてのオーディオバックエンドにおいて、低遅延とグリッチのない再生の良いバランスを提供します。

コールバックモデルを使用したい場合は、saudio_desc.stream_cb または saudio_desc.stream_userdata_cb でストリームコールバック関数を提供する必要があり、それ以外の場合は両方の関数ポインタをゼロ初期化にしておく。

プッシュ型とデフォルトの再生パラメータを使用:

```c
saudio_setup(&(saudio_desc){0});
```

ストリームコールバックモデルとデフォルトの再生パラメータを使用する:

```c
saudio_setup(&(saudio_desc){
    .stream_cb = my_stream_callback
});
```

標準のストリームコールバックはユーザーデータ引数を持ちませんので、必要な場合は代替の stream_userdata_cb を使用し、user_data ポインタも設定します。:

```c
saudio_setup(&(saudio_desc){
    .stream_userdata_cb = my_stream_callback,
    .user_data = &my_data
});
```

saudio_desc 構造体を通じて、以下の再生パラメータを提供することができる。:

一般的なパラメータ（Stream-callbackとPush-modelの両方）。:

`int sample_rate`     -- サンプルレート（Hz）、デフォルト：44100
`int num_channels`    -- チャンネル数，デフォルト：1（モノラル）
`int buffer_frames`   -- ストリーミングバッファのフレーム数、デフォルト：2048

ストリームコールバックプロトタイプ（ユーザーデータあり、またはなし）:

```c
void (*stream_cb)(float* buffer, int num_frames, int num_channels)
void (*stream_userdata_cb)(float* buffer, int num_frames, int num_channels, void* user_data)
```

ユーザ提供ストリームコールバックへの関数ポインタ。

プッシュモデルのパラメータ。

`int packet_frames`   -- パケット内のフレーム数、デフォルト：128
`int num_packets`     -- リングバッファのパケット数、デフォルト：64

sample_rate と num_channels パラメータはオーディオバックエンド用のヒントであり、実際の再生に使用される値であることは保証されない。

実際のパラメータを取得するには、saudio_setup()の後に以下の関数を呼び出してください。

```c
int saudio_sample_rate(void)
int saudio_channels(void);
```

チャンネル数が要求と異なることはまずありませんが、サンプルレートが異なることは珍しいことではありません。

(注：オーディオバックエンドが、例えばブルートゥースヘッドセットを接続するなど、出力デバイスを切り替えたときに、異なるサンプルレートに切り替える可能性があるという未解決の問題がありますが、このケースは現在Sokol Audioでは扱われていません）。

オーディオの初期化が成功したかどうかは saudio_isvalid() で確認することができます。何らかの理由でバックエンドの初期化に失敗した場合(例えば、マシンにオーディオデバイスがない場合)、これはfalseを返します。初期化に失敗した後にSokol Audioの関数が呼ばれても、黙って失敗するので、音声出力がないことを除けば、何も悪いことは起こりません。

アプリケーションが終了する前に

```c
saudio_shutdown();
```

これにより、オーディオスレッドが停止し（Linux、Windows、macOS/iOS）、オーディオバックエンドが適切にシャットダウンされます。

## ストリームコールバックモデル

Sokol Audioをストリームコールバックモードで使用するには、 saudio_setup()を呼び出すときに、saudio_desc構造体に以下のようなコールバック関数を指定します。:

```c
void stream_cb(float* buffer, int num_frames, int num_channels) {
    ...
}
```

または、ユーザーデータ引数を指定した代替バージョン:

```c
void stream_userdata_cb(float* buffer, int num_frames, int num_channels, void* user_data) {
    my_data_t* my_data = (my_data_t*) user_data;
    ...
}
```

コールバック関数の仕事は、*buffer*を32ビットfloatサンプル値で満たすことです。

無音を出力するには、バッファをゼロで埋めます。:

```c
void stream_cb(float* buffer, int num_frames, int num_channels) {
    const int num_samples = num_frames * num_channels;
    for (int i = 0; i < num_samples; i++) {
        buffer[i] = 0.0f;
    }
}
```

ステレオ出力（num_channels == 2）の場合，左チャンネルと右チャンネルのサンプルはインターリーブされます:

```c
void stream_cb(float* buffer, int num_frames, int num_channels) {
    assert(2 == num_channels);
    for (int i = 0; i < num_frames; i++) {
        buffer[2*i + 0] = ...;  // left channel
        buffer[2*i + 1] = ...;  // right channel
    }
}
```

ストリームコールバック関数は別のスレッドで実行されていることに留意してください。もしメインスレッドとデータを共有する必要がある場合は、共有データへのアクセスをスレッドセーフにするために自分で注意する必要があります!

## プッシュ・モデル

音声データの提供に push モデルを使用するには、saudio_setup() を呼び出す際に saudio_desc 構造体の stream_cb フィールドを設定しない (ゼロ初期化にしておく) だけです。

プッシュモデルでサンプルデータを提供するには、一定の間隔で(例えば1フレームに1回)saudio_push()関数を呼び出します。saudio_expect()関数を呼んで、Sokol Audioにリングバッファの空き容量を問い合わせることもできますが、正しいサンプルレートで連続的にデータを提供するなら、saudio_expect()は必要ありません（サンプル生成コードを再生レートと同期/スロットルする簡単な方法ですが）。

saudio_push() では、個々のサンプル値をプッシュするのはあまり効率的ではないので、独自の中間サンプルバッファを維持する必要があるかもしれません。次の例は、sokol-samples (https://github.com/floooh/sokol-samples) の MOD player サンプルのものです。:

```c
const int num_frames = saudio_expect();
if (num_frames > 0) {
    const int num_samples = num_frames * saudio_channels();
    read_samples(flt_buf, num_samples);
    saudio_push(flt_buf, num_frames);
}
```

もうひとつの方法は、saudio_expect() を無視して、小さなバッチで生成されたサンプルをそのままプッシュすることです。この場合、正しいサンプルレートでサンプルを生成する必要があります。:

次の例は、Tiny Emulators プロジェクト (https://github.com/floooh/chips-test) から引用したものです。これはモノラル再生のため、 (num_samples == num_frames) となります。:

```c
// tick the sound generator
if (ay38910_tick(&sys->psg)) {
    // new sample is ready
    sys->sample_buffer[sys->sample_pos++] = sys->psg.sample;
    if (sys->sample_pos == sys->num_samples) {
        // new sample packet is ready
        saudio_push(sys->sample_buffer, sys->num_samples);
        sys->sample_pos = 0;
    }
}
```

## webaudio バックエンド

WebAudio バックエンドは、現在 ScriptProcessorNode コールバックを使用してサンプルデータを WebAudio に送り込んでいます。ScriptProcessorNodeはメインスレッドから実行されるため、しばらく非推奨でしたが、デフォルトの初期化パラメータを使えば「かなり」うまくいきます。最終的にSokol AudioはAudio Workletsを使用する予定ですが、これにはもう少し必要なものがあります（Audio Workletsをあらゆるところに実装し、SharedArrayBuffersを再び有効にし、Audio WorkletsはScriptProcessorNodeよりもずっと複雑なので、オーディオデータがメインスレッドから来る必要があるなら実装作業の観点から「低コスト」の解決法を見いだす必要があります）。

emscripten用にコンパイルする場合、WebAudioバックエンドが自動的に選択されます（__EMSCRIPTEN__定義が存在します）。

- https://developers.google.com/web/updates/2017/12/audio-worklet
- https://developers.google.com/web/updates/2018/06/audio-worklet-design-pattern

"Blob URLs": https://www.html5rocks.com/en/tutorials/workers/basics/

Also see: https://blog.paul.cx/post/a-wait-free-spsc-ringbuffer-for-the-web/

## CoreAudioのバックエンド

macOSとiOSではCoreAudioバックエンドが選択されています(__APPLE__が定義されています)。macOSではCoreAudioのAPIはCで実装されているため（Objective-Cではない）、Sokol Audioの実装部分をCのソースファイルに含めることが可能です。

しかし、iOSでは、AVAudioSessionオブジェクトに依存しているため、Sokol AudioはObjective-Cとしてコンパイルする必要があります。iOSのコードパスは、ARC（Automatic Reference Counting）の有無にかかわらず、コンパイルすることができます。

スレッドの同期には、CoreAudioバックエンドはpthread_mutex_*関数を使用します。

入力された浮動小数点サンプルは、さらに変換されることなく、直接CoreAudioに転送されます。

Sokol Audioを使用するmacOSおよびiOSアプリケーションは、AudioToolboxフレームワークと連携する必要があります。

## WASAPIバックエンド

Windowsでコンパイルする場合、WASAPIバックエンドが自動的に選択されます（_WIN32が定義されています）。

スレッドの同期にはWin32のクリティカルセクションが使用されます。

WASAPIは要求されたものとは異なるサイズのストリーミングバッファを使用することがあるので、基本レイテンシは若干大きくなるかもしれません。現在のバックエンドの実装では、入力される浮動小数点サンプル値は符号付き16ビット整数に変換されます。

必要なWindowsシステムDLLは#pragma comment(lib, ...)でリンクされているので、ビルド時に追加のリンカーライブを追加する必要はありません（そうでなければ、これはsokol_audio.hで修正されるべきバグとなります）。

## ALSAバックエンド

Linux でコンパイルする場合、ALSA バックエンドが自動的に選択されます ('linux' が定義されています)。

スレッドの同期には pthread_mutex_* 関数が使用されます。

サンプルは 32-bit float フォーマットで ALSA に直接フォワードされ、それ以上の変換は行われません。

asound' ライブラリとリンクする必要があり、 `<alsa/asoundlib.h>` ヘッダが存在しなければなりません (通常、両方とも ALSA の開発パッケージの中にインストールされています)。


## メモリ割り当てオーバーライド

初期化時のメモリ割り当て関数は、以下のようにオーバーライドすることができます。:

```c
void* my_alloc(size_t size, void* user_data) {
    return malloc(size);
}

void my_free(void* ptr, void* user_data) {
    free(ptr);
}

...
    saudio_setup(&(saudio_desc){
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

ただし、これはsokol_audio.h自身によって行われるメモリ割り当ての呼び出しにのみ影響し、OSライブラリでの割り当ては行われません。

メモリ確保は saudio_setup() が呼ばれたのと同じスレッドでのみ行われるので、スレッドセーフについて心配する必要はありません。


## ログ関数オーバーライド

初期化時に以下のようにログ関数をオーバーライドすることができます:

```c
void my_log(const char* message, void* user_data) {
    printf("saudio says: \s\n", message);
}

...
    saudio_setup(&(saudio_desc){
        // ...
        .logger = {
            .log_cb = my_log,
            .user_data = ...,
        }
    });
...
```

オーバーライドが提供されない場合、ほとんどのプラットフォームでputsが使用されます。Android では、代わりに __android_log_write が使用されます。


## LICENSE

zlib/libpng license

Copyright (c) 2018 Andre Weissflog

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