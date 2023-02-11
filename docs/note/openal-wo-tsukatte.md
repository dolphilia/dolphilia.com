# OpenALを使ってホワイトノイズを再生する

ほとんどのコンピュータには音を再生したり録音したりする端子がついています。あなたのコンピュータにもヘッドフォン端子が付いていることでしょう。それらの端子はサウンドカードと呼ばれる基板とつながっています

サウンドカードはコンピュータの信号を再生できる波形として出力したり、マイクからの電気信号を一時的に蓄積してそれをコンピュータが取り出せるようにしたりしています。しかしプログラムがサウンドカードにある端子を直接操作することはできません。そのためデバイスドライバと呼ばれるハードウェアを制御するためのソフトウェアを用いて、データを読み書きします

デバイスドライバはサウンドカードごとに異なります。とはいえオペレーティングシステムは多くのサウンドカードやデバイスドライバをサポートしています。そして共通のコードを書くための機能を提供しています

プログラマが音を再生するプログラムを書くには、オペレーティングシステムの用意する方法に精通しなければなりません。それぞれ次のような方法が用意されています。

- Windows – Win32 マルチメディア API
- Mac OSX – Core Audio Frameworks
- Linux – ALSA

これらは原始的なものです。そのため、さらに抽象的な方法が開発者によって備えられてきました。そのうちの１つがOpenALです

## 多様なオペレーティングシステムで動作するサウンドライブラリ

OpenALは多様なサウンド処理を行なうためのサウンドライブラリです。多様なオペレーティングシステムに対応しているため、異なるハードウェアのサウンド機能をほぼ同じコードで呼び出すことができます。例えばWindowsやLinuxの他に、WiiやPlayStation 3などのゲーム機、iOSやAndroidといったモバイルOSでも採用されています

現在はクリエイティブテクノロジーが開発を担っていますが、開発元はコンピュータゲームの移植を行っていたLoki Software です。Windows のゲームをLinuxに移植しやすくするために開発したものであり、OpenGLに似せて作られています。OpenGLは3Dグラフィックスのためのライブラリです

## OpenALを構成する３つの要素：Buffer, Source, Listener

Buffer、Source、Listenerの３つがOpenALのプログラムを構成します。Bufferによって音声データが管理され、Sourceによってそのデータを再生します。Source（音源）とListener（音の検出点）は3D空間上に配置することができ、音の聞こえ方をシミュレートすることができます

- Buffer – 音声データを保存しておくメモリ領域
- Source – 空間上の位置、再生や音量の情報などの音源の情報
- Listener – 空間上の位置、移動や向きの情報など音の検出点の情報

OpenALはMP3やAACなどの圧縮フォーマットに対応していないので、それらのファイルを用いる場合は、別途ライブラリを利用する必要があります

## OpenALでホワイトノイズを再生するプログラムを作る

1. OpenALの準備

OpenALのCプログラムを書く場合、まずOpenALを使える状態にしなければなりません。Linuxの例とMacOSXの場合とを説明します

MacOSXでは最初からOpenALが開発環境に含まれています。そのためXcodeをインストールしたら、すでに開発環境が整っていることになります。次のようなプリプロセッサで機能を読み込むことができます

```c
// (macOSの場合)
#include <OpenAL/al.h>
#include <OpenAL/alc.h>
```

コンパイルには -framework OpenAL オプションをつけます。たとえば次のようにコンパイルします

```sh
# (macOSの場合)
gcc test.c -framework OpenAL -o test
```

Linuxでは最初にopenal開発環境をインストールする必要があるでしょう。Ubuntuであれば端末に次のように入力することで、環境をインストールすることができます

```sh
# (Ubuntuの場合)
sudo apt-get install libopenal-dev
sudo apt-get install libalut-dev
```

プリプロセッサは次のようにします

```c
// (Ubuntuの場合)
#include <AL/al.h>
#include <AL/alc.h>
```

コンパイルは次のようにします

```sh
# (Ubuntuの場合)
gcc test.c -lalut -lopenal -o test
```

2. OpenALの初期化

OpenALを使うには、まず初期化を行なう必要があります。最初にOpenALデバイスを開き、次にOpenALコンテキストを作成します。操作に使うコンテキストを選択する必要もあります

```c
ALCdevice *device;
ALCcontext *context;
device = alcOpenDevice(NULL);
context = alcCreateContext(device, NULL);
```

プログラムに出てくるALCはOpenALのコンテキスト管理のためのAPIです。この例では alcOpenDevice関数 を使ってプログラムがデバイスに接続します。またalcCreateContextでコンテキストを生成します。もし関数でエラーがあった場合はNULLが返ります

次に操作に使うコンテキストを選択するために alcMakeContextCurrent関数 を使います

```c
alcMakeContextCurrent(context);
```

戻り値が ALC_TRUE の場合は成功で、ALC_FALSE の場合はエラーを意味します

3. 乱数でノイズ成分を生成する

ノイズ成分を生成するために、C言語のrand関数を用います。任意の範囲の乱数を得る関数を用意します

```c
int rnd(int min, int max) {
    return min + (int)(rand() * (max-min + 1.0) / (1.0 + RAND_MAX));
}
```

この関数を用いて、ホワイトノイズの波形データを作ります

```c
ALshort data[44100*3]; //44.1kHで３秒のデータ

//ノイズを生成
for(int i = 0; i < 44100*3; i++)
    data[i]=rnd(-32767, 32767);
```

ALshort型はC言語のshort型と同等です

4. バッファとソースを作成する

alGenBuffersを使って任意の数のバッファを要求します。この関数はいつでも呼び出し可能で、複数呼び出したときは複数のバッファの組を生成します

```c
alGenBuffers(1, &buffer);
```

バッファの内容、つまりサンプルデータを設定するにはalBufferData関数を使います。使用できるフォーマットは次のとおりです

- AL_FORMAT_MONO8
- AL_FORMAT_MONO16
- AL_FORMAT_STEREO8
- AL_FORMAT_STEREO16

８ビットデータは０から２５５の符号なし値で表現されます。１２８が無音の出力となります。１６ビットデータは-32768から32767の符号あり値で表現されます。０が無音の出力です

１チャネル以上のオーディオデータを含むバッファは3D空間化機能なしで再生されます。そのため、それらの形式はBGMに向いていると言えます

```c
void alBufferData(ALuint buffer,ALenum format,const ALvoid *data,ALsizei size,ALsizei freq);
```

それぞれ次のように設定します

- buffer – バッファ
- format – データのフォーマット
- data – サンプルデータ
- size – データのサイズ
- freq – 周波数

```c
alBufferData(buffer, AL_FORMAT_MONO16, data, sizeof(data), 44100);
```

次にソースを作成します。ソースは、位置や速度、サンプルデータを伴うバッファのような属性を持ちます。alGensourcesを使って任意の数のソースを要求します

```C
alGenSources(1, &source);
```

ソースの各種設定はalSourceiで行います。alSourcei（ソース、設定したい項目を表す定数、設定値）;というように設定します

```c
alSourcei(source, AL_BUFFER, buffer);
```

5. ソースを再生する

プログラムは、alGetSourceとパラメータ AL_SOURCE_STAT を使用して、現在のソースのステートを取得することができます。現在のステートはAL_INITIAL、AL_PLAYING、AL_PAUSED、AL_STOPPEDの４つのうちの１つでしょう。AL_PLAYINGかAL_PAUSEDであればソースは有効であり、AL_STOPPEDかAL_INITIALのどちらかであればソースは無効であると考えられます。既定のステートはINITIALです

ソースを操作する以下のような関数があります

```C
void alSourcePlay (ALuint sName);
void alSourcePause (ALuint sName);
void alSourceStop (ALuint sName);
void alSourceRewind (ALuint sName);
```

ソースを再生するには以下のようにします

```c
alSourcePlay(source);
```

プログラムがすぐに終了してしまわないように、sleep関数を用いて指定の時間スリープさせます

```C
sleep(3);
```

その後、ソースに割り当てられているバッファを停止します。これはsourceをAL_STOPEDすなわち停止状態にします

```c
alSourceStop(source);
```

6. ソースの削除とバッファの解放

alDeleteSourcesを使って任意の数のソースの削除を要求できます。再生中のソースも削除可能です。ソースは自動的に停止され、そして削除されます

```c
alDeleteSources(1, &source);
```

alDeleteBuffersを使って任意の数のバッファの削除を要求できます。alIsBuffer(bname)はバッファの削除を証明するのに使う事ができます。ソースに割り当てられたバッファは削除不能です

```c
alDeleteBuffers(1, &buffer);
```

7. 終了処理

コンテキストを破棄するためには、まずそのコンテキストをalcMakeCurrent関数にNULLコンテキストを渡して解放する必要があります。そのようにしてコンテキストをカレントから解除しています。コンテキストに含まれる全てのソースはコンテキスト破棄時に自動的に削除されます。コンテキストの削除はalcDestroyContext関数で行います

```c
alcMakeContextCurrent(NULL);
alcDestroyContext(context);
```

プログラムをデバイスから切断するにはalcCloseDevice関数を用います。成功すればALC_TRUEが、失敗したならALC_FALSEが返ります。一旦クローズするとコンテキストとソースは使えなくなります

```c
alcCloseDevice(device);
```

8. 作成したプログラム例（Linuxの例）

```c
// Macの場合は
// #include <OpenAL/al.h>
// #include <OpenAL/alc.h>
// とする。コンパイルは
// gcc test.c -framework OpenAL -o test
// などとする。
// Linuxの場合、コンパイルは
// gcc test.c -lalut -lopenal -o test
// などとする。

#include <AL/al.h>
#include <AL/alc.h>
#include <stdlib.h>

int rnd(int min, int max) {
    return min + (int)(rand() * (max – min + 1.0) / (1.0 + RAND_MAX));

}

int main() {
    ALCdevice *device;
    ALCcontext *context;
    ALshort data[44100*3];
    ALuint buffer,source;
    device = alcOpenDevice(NULL);
    context = alcCreateContext(device, NULL);
    alcMakeContextCurrent(context);
    alGenBuffers(1, &buffer);
    for(int i = 0; i < 44100 * 3; i++)
        data[i]=rnd(-32767, 32767);
    alBufferData(buffer, AL_FORMAT_MONO16, data, sizeof(data), 44100);
    alGenSources(1, &source);
    alSourcei(source, AL_BUFFER, buffer);
    alSourcePlay(source);
    sleep(3);
    alSourceStop(source);
    alDeleteSources(1, &source);
    alDeleteBuffers(1, &buffer);
    alcMakeContextCurrent(NULL);
    alcDestroyContext(context);
    alcCloseDevice(device);
    return 0;
}
```