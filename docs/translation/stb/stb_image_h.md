# stb_image.h

- stb_image
- v2.28
- パブリックドメイン・イメージローダー
- `http://nothings.org/stb`

無保証、自己責任でご使用ください。

こうする：

```c
#define STB_IMAGE_IMPLEMENTATION
```

このファイルを1つのCまたはC++ファイルにインクルードして実装を作成する前に。

つまり、次のようになるはず：

```c
#include ...
#include ...
#include ...
#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"
```

`assert.h`の使用を避けるために、`#include`の前に`STBI_ASSERT(x)`を`#define`することができます。
また、`malloc`、`realloc`、`free`の使用を避けるために、`STBI_MALLOC`、`STBI_REALLOC`、`STBI_FREE`を`#define`します。

## クイック・ノート

主にゲーム開発者や、問題のある画像を避け、些細なインターフェイスだけを必要とする人たちが興味を持つ。

|画像形式|説明|
|---|---|
|JPEG |ベースライン & プログレッシブ (12 bpc/算術演算はサポートされていない。純正 IJG lib と同じ)
|PNG  |1/2/4/8/16-bit-per-channel
|TGA  |(サブセットであるとしても、どのサブセットかはわからない)
|BMP  |非1bpp、非RLE
|PSD  |(コンポジットビューのみ、追加チャンネルなし、8/16ビット/チャンネル)
|GIF  |(コンポは常に4チャンネルとして報告する)
|HDR  |(輝度rgbEフォーマット)
|PIC  |(ソフトイメージPIC)
|PNM  |(PPMおよびPGMバイナリのみ)

アニメーションGIFにはまだ適切なAPIが必要だが、ここに一つの方法がある。:

`http://gist.github.com/urraka/685d9a6340b26b830d49`

- メモリまたはFILEからデコードする（STBI_NO_STDIOを定義してコードを削除する）
- 任意のI/Oコールバックからのデコード
- x86/x64（SSE2）およびARM（NEON）のSIMDアクセラレーション

以下の「DOCUMENTATION」にある全文書を参照。

## ライセンス

ライセンス情報はファイルの最後を参照。

## 最近の改訂履歴

- 2.28  (2023-01-29) many error fixes, security errors, just tons of stuff
- 2.27  (2021-07-11) document stbi_info better, 16-bit PNM support, bug fixes
- 2.26  (2020-07-13) many minor fixes
- 2.25  (2020-02-02) fix warnings
- 2.24  (2020-02-02) fix warnings; thread-local failure_reason and flip_vertically
- 2.23  (2019-08-11) fix clang static analysis warning
- 2.22  (2019-03-04) gif fixes, fix warnings
- 2.21  (2019-02-25) fix typo in comment
- 2.20  (2019-02-07) support utf8 filenames in Windows; fix warnings and platform ifdefs
- 2.19  (2018-02-11) fix warning
- 2.18  (2018-01-30) fix warnings
- 2.17  (2018-01-29) bugfix, 1-bit BMP, 16-bitness query, fix warnings
- 2.16  (2017-07-23) all functions have 16-bit variants; optimizations; bugfixes
- 2.15  (2017-03-18) fix png-1,2,4; all Imagenet JPGs; no runtime SSE detection on GCC
- 2.14  (2017-03-03) remove deprecated STBI_JPEG_OLD; fixes for Imagenet JPGs
- 2.13  (2016-12-04) experimental 16-bit API, only for PNG so far; fixes
- 2.12  (2016-04-02) fix typo in 2.11 PSD fix that caused crashes
- 2.11  (2016-04-02) 16-bit PNGS; enable SSE2 in non-gcc x64
  - RGB-format JPEG; remove white matting in PSD;
  - allocate large structures on the stack;
  - correct channel count for PNG & BMP
- 2.10  (2016-01-22) avoid warning introduced in 2.09
- 2.09  (2016-01-16) 16-bit TGA; comments in PNM files; STBI_REALLOC_SIZED

改訂履歴はファイル末尾を参照のこと。

## Contributors

```txt
 Image formats                          Extensions, features
    Sean Barrett (jpeg, png, bmp)          Jetro Lauha (stbi_info)
    Nicolas Schulz (hdr, psd)              Martin "SpartanJ" Golini (stbi_info)
    Jonathan Dummer (tga)                  James "moose2000" Brown (iPhone PNG)
    Jean-Marc Lienher (gif)                Ben "Disch" Wenger (io callbacks)
    Tom Seddon (pic)                       Omar Cornut (1/2/4-bit PNG)
    Thatcher Ulrich (psd)                  Nicolas Guillemot (vertical flip)
    Ken Miller (pgm, ppm)                  Richard Mitton (16-bit PSD)
    github:urraka (animated gif)           Junggon Kim (PNM comments)
    Christopher Forseth (animated gif)     Daniel Gibson (16-bit TGA)
                                           socks-the-fox (16-bit PNG)
                                           Jeremy Sawicki (handle all ImageNet JPGs)
 Optimizations & bugfixes                  Mikhail Morozov (1-bit BMP)
    Fabian "ryg" Giesen                    Anael Seghezzi (is-16-bit query)
    Arseny Kapoulkine                      Simon Breuss (16-bit PNM)
    John-Mark Allen
    Carmelo J Fdez-Aguera

 Bug & warning fixes
    Marc LeBlanc            David Woo          Guillaume George     Martins Mozeiko
    Christpher Lloyd        Jerry Jansson      Joseph Thomson       Blazej Dariusz Roszkowski
    Phil Jordan                                Dave Moore           Roy Eltham
    Hayaki Saito            Nathan Reed        Won Chun
    Luke Graham             Johan Duparc       Nick Verigakis       the Horde3D community
    Thomas Ruf              Ronny Chevalier                         github:rlyeh
    Janez Zemva             John Bartholomew   Michal Cichon        github:romigrou
    Jonathan Blow           Ken Hamada         Tero Hanninen        github:svdijk
    Eugene Golushkov        Laurent Gomila     Cort Stratton        github:snagar
    Aruelien Pocheville     Sergio Gonzalez    Thibault Reuille     github:Zelex
    Cass Everitt            Ryamond Barbiero                        github:grim210
    Paul Du Bois            Engin Manap        Aldo Culquicondor    github:sammyhw
    Philipp Wiesemann       Dale Weiler        Oriol Ferrer Mesia   github:phprus
    Josh Tobin              Neil Bickford      Matthew Gregan       github:poppolopoppo
    Julian Raschke          Gregory Mullen     Christian Floisand   github:darealshinji
    Baldur Karlsson         Kevin Schmidt      JR Smith             github:Michaelangel007
                            Brad Weinberger    Matvey Cherevko      github:mosra
    Luca Sas                Alexander Veselov  Zack Middleton       [reserved]
    Ryan C. Gordon          [reserved]                              [reserved]
                     DO NOT ADD YOUR NAME HERE

                     Jacko Dirks
```

クレジットに名前を追加するには、真ん中の空白を適当に選んで埋めてください。
stbのPRでマージが衝突する原因の80%は、クレジットの最後に自分の名前を追加することである。

```c
#ifndef STBI_INCLUDE_STB_IMAGE_H
#define STBI_INCLUDE_STB_IMAGE_H
```

## ドキュメント

### 制限事項

- 12ビット/チャンネルJPEGなし
- 算術符号化JPEGなし
- GIFは常に*comp=4を返す

### 基本的な使い方

(HDRの使用法については、下記のHDRディスカッションを参照):

```c
int x,y,n;
unsigned char *data = stbi_load(filename, &x, &y, &n, 0);
// ... NULLでなければデータを処理する ...
// ... x = width, y = height, n = # ピクセルあたり8ビット成分 ...
// ... '0' を '1' ... '4'に置き換えて、ピクセルあたりのコンポーネント数を指定する。
// ... しかし、'n'は常に0と言った場合の数になる
stbi_image_free(data);
```

### 標準パラメータ

|引数|説明|
|---|---|
|`int *x`                | 画像の幅をピクセル単位で出力 |
|`int *y`                | 画像の高さをピクセル単位で出力 |
|`int *channels_in_file` | 画像ファイル内の画像構成要素の # を出力 |
|`int desired_channels`  | 非ゼロの場合、resultで要求された画像成分の # |

画像ローダーの戻り値は、ピクセルデータを指す `unsigned char *` であり、割り当てに失敗した場合や、画像が破損していたり無効な場合は`NULL`となります。

ピクセルデータは`*x`ピクセルの`*y`スキャンラインで構成され、各ピクセルはインターリーブされたN個の8ビット成分で構成される。

フォーマットに関係なく、画像の走査線間やピクセル間にパディングはありません。

コンポーネントの数Nは、desired_channelsが0でない場合は'desired_channels'となり、そうでない場合は`*channels_in_file`となる。

difired_channelsが0でない場合、`*channels_in_file`は、そうでなければ出力されたであろうコンポーネントの数を持つ。

例えば、desired_channelsを4に設定すると、常にRGBA出力が得られるが、*channels_in_fileをチェックすることで、例えばソース画像に3つのチャンネルしかなかったために些細なことで不透明になっていないかどうかを確認できる。

N個の成分を持つ出力画像は、各画素に以下の成分がこの順序でインターリーブされている。:

| N=#comp | コンポーネント
|---|---|
| 1       | grey
| 2       | grey, alpha
| 3       | red, green, blue
| 4       | red, green, blue, alpha

何らかの理由で画像の読み込みに失敗した場合、戻り値は NULL となり、 `*x`, `*y`, `*channels_in_file` は変更されない。

`stbi_failure_reason()`関数をクエリすると、ロードに失敗した理由を、極めて簡潔で、エンドユーザーにとって不親切な説明を得ることができます。

これらの文字列をまったくコンパイルしないようにするには`STBI_NO_FAILURE_STRINGS`を定義し、もう少しユーザーフレンドリーな文字列を得るには`STBI_FAILURE_USERMSG`を定義する。

パレット化されたPNG、BMP、GIF、PIC画像は自動的にデパレット化されます。

ファイル全体をデコードすることなく、画像の幅、高さ、コンポーネント数を調べるには、stbi_info ファミリーの関数を使います。:

```c
int x,y,n,ok;
ok = stbi_info(filename, &x, &y, &n);
// 画像がサポートされているフォーマットであれば ok=1 を返し、x, y, n をセットし、そうでなければ 0 を返す。
```

stb_imageのパブリックAPIでは、メモリバッファのサイズも含め、intをサイズとして広く使用していることに注意。

これは今やAPIの一部であり、故障を起こさずに変更するのは難しい。

その結果、さまざまな画像ローダーはすべて、画像サイズに一定の制限を設けている。これらはフォーマットによって多少異なるが、一般的には2GB弱か1GB弱のどちらかに絞られる。

デコードされた画像がこれより大きい場合、stb_imageのデコードは失敗する。

さらに, stb_imageは、設定可能な`STBI_MAX_DIMENSIONS`（デフォルトは`2**24 = 16777216`ピクセル）よりも大きな寸法に設定された画像ファイルを拒否します。

上記のメモリ制限のため、このような寸法の画像を正しく読み込むには、かなり極端なアスペクト比にするしかない。

いずれにせよ、ここでの仮定は、そのような大きな画像は不正または悪意のあるものである可能性が高いということです。それよりも大きなサイズの画像を読み込む必要があり、それでも全体のサイズ制限に収まる場合は、自分で`STBI_MAX_DIMENSIONS`を`#define`して、より大きなサイズにすることができます。

## UNICODE

Windows 用にコンパイルし、Unicode ファイル名を使用したい場合は、次のようにコンパイルします。

```c
#define STBI_WINDOWS_UTF8
```

を呼び、utf8エンコードされたファイル名を渡す。stbi_convert_wchar_to_utf8をコールして、Windowsのwchar_tファイル名を utf8に変換する。

## 哲学

stbライブラリーは以下の優先順位で設計されています。:

1. 使いやすい
2. メンテナンスが容易
3. 良好なパフォーマンス

時には、「メンテナンスのしやすさ」よりも「パフォーマンスの良さ」の方が優先されることもあるし、最高のパフォーマンスを実現するために、使いやすいAPIに加えて、より高いパフォーマンスを実現する使いにくいAPIを提供することもある。

とはいえ、このライブラリーの顧客であるあなたの立場からすれば、あなたが気にするのは#1と#3だけであり、stbライブラリーは何よりも#3を重視しないということを心に留めておくことが重要だ。

副次的な優先事項の中には、最初の2つから直接派生するものもあり、パフォーマンスを重視できないより明確な理由を示すものもある。

- ポータブル（使いやすい）
- ソースコードのフットプリントが小さい (メンテナンスが容易)
- 依存関係なし (使いやすい)

## I/Oコールバック

I/Oコールバックは、パッケージ化されたファイルやその他のソースなど、任意のソースからの読み込みを可能にする。

コールバックから読み込まれたデータは、オーバーヘッドを減らすために小さな内部バッファ（現在は128バイト）を通して処理される。

定義しなければならない3つの関数は、"read"（データを何バイトか読み込む）、"skip"（データを何バイトか読み飛ばす）、"eof"（ストリームが終端かどうかを報告する）である。

## SIMDサポート

JPEGデコーダーは、コンパイラーがサポートしている場合、x86上で自動的にSIMDカーネルを使おうとする。

ARM Neonのサポートについては、明示的にリクエストする必要があります。

(古いDIY SIMD APIは、現在のコードではサポートされなくなった。)

x86では、ランタイム・テストに基づき、利用可能な場合は自動的にSSE2が使用される；

そうでない場合は、一般的なCバージョンがフォールバックとして使用される。

ARMターゲットでは、NEONデバイス用と非NEONデバイス用に別々のビルドを用意するのが一般的です（少なくともiOSとAndroidではそうです）。

したがって、NEONのサポートはビルド・フラグで切り替えられる：STBI_NEONを定義すればNEONループが得られる。

何らかの理由でSIMDコードを使用したくない場合、またはコンパイルに問題がある場合は、`STBI_NO_SIMD`を定義することでSIMDコードを完全に無効にすることができます。

## HDR画像のサポート

(STBI_NO_HDR を定義して無効にする。)

stb_imageはHDR画像全般の読み込みをサポートしており、現在はRadianceの`.HDR`ファイル形式を特にサポートしています。

既存のインターフェイスを使用して任意のファイルをロードすることは可能です。

HDRファイルを読み込もうとすると、ガンマ`2.2`と任意のスケールファクター（デフォルトは1）を想定して、自動的にLDRにリマップされます；

これらの定数はいずれも、このインターフェイスを使って再設定できる：

```c
stbi_hdr_to_ldr_gamma(2.2f);
stbi_hdr_to_ldr_scale(1.0f);
```

(note, 逆定数を使用しない; stbi_imageはそれらを適切に反転する).

さらに、ファイルを（リニア）フロートとして読み込み、フルダイナミックレンジを維持するための新しいパラレルインターフェイスがある：

```c
float *data = stbi_loadf(filename, &x, &y, &n, 0);
```

このインターフェイスを使ってLDR画像をロードすると、それらの画像は浮動小数点値に昇格し、上記に対応する定数の逆数を介して実行される：

```c
stbi_ldr_to_hdr_scale(1.0f);
stbi_ldr_to_hdr_gamma(2.2f);
```

最後に、画像データを含むファイル名（またはオープンファイルかメモリブロック--詳細はヘッダファイルを参照）を指定すると、使用する「最も適切な」インターフェイス（つまり、画像がHDRかどうか）を、次のようにして問い合わせることができる：

```c
stbi_is_hdr(char *filename);
```

## iPhone PNGのサポート

iPhone フォーマットの PNG (あらかじめ乗算された BGRA が格納されている) を RGB に戻す変換をオプションでサポートしています。この変換を有効にするには、 `stbi_convert_iphone_png_to_rgb(1)` を呼び出します。

`stbi_set_unpremultiply_on_load(1)` も呼び出して、画像ファイルに事前乗算データがあると明示されている場合にのみ、事前乗算されたアルファを除去するためにピクセル単位の分割を強制する (現在は iPhone の画像でのみ発生し、iPhone の変換から rgb への処理がオンの場合のみ)。

## 追加設定

実装を作成する前に以下のシンボルを1つ以上`#define`することで、デコーダーの実装を抑制し、コードのフットプリントを減らすことができます。

- STBI_NO_JPEG
- STBI_NO_PNG
- STBI_NO_BMP
- STBI_NO_PSD
- STBI_NO_TGA
- STBI_NO_GIF
- STBI_NO_HDR
- STBI_NO_PIC
- STBI_NO_PNM   (.ppm and .pgm)

特定のデコーダーのみを要求し、それ以外のデコーダーを抑制することができる（新しいデコーダーを追加する際、明示的に無効化する必要がないため、この方が上位互換性が高くなる）

- STBI_ONLY_JPEG
- STBI_ONLY_PNG
- STBI_ONLY_BMP
- STBI_ONLY_PSD
- STBI_ONLY_TGA
- STBI_ONLY_GIF
- STBI_ONLY_HDR
- STBI_ONLY_PIC
- STBI_ONLY_PNM   (.ppm and .pgm)

STBI_NO_PNG（またはPNGなしのONLY）を使用し、zlibデコーダを引き続き使用したい場合は、`#define STBI_SUPPORT_ZLIB`

STBI_MAX_DIMENSIONS を定義した場合, stb_imageは、そのサイズ(幅または高さのいずれか)を超える画像を、それ以上処理することなく拒否します。

これは、信頼できないデータに対するDoS攻撃を防ぐために、上限を設定するようにするためである。巨大なサイズの有効な画像を生成し、stb_imageに巨大なメモリブロックを割り当てさせ、そのデコードに不釣り合いな時間を使わせることができるからである。

デフォルトでは（`1 << 24`）に設定されており、これは`16777216`だが、それでも非常に大きい。

```c
#ifndef STBI_NO_STDIO
#include <stdio.h>
#endif // STBI_NO_STDIO

#define STBI_VERSION 1

enum
{
   STBI_default = 0, // only used for desired_channels

   STBI_grey       = 1,
   STBI_grey_alpha = 2,
   STBI_rgb        = 3,
   STBI_rgb_alpha  = 4
};

#include <stdlib.h>
typedef unsigned char stbi_uc;
typedef unsigned short stbi_us;

#ifdef __cplusplus
extern "C" {
#endif

#ifndef STBIDEF
#ifdef STB_IMAGE_STATIC
#define STBIDEF static
#else
#define STBIDEF extern
#endif
#endif
```

## プライマリーAPI

あらゆる種類の画像に対応

ファイル名、オープンファイル、メモリバッファによる画像のロード

```c
typedef struct
{
   int      (*read)  (void *user,char *data,int size);
   void     (*skip)  (void *user,int n);
   int      (*eof)   (void *user);
} stbi_io_callbacks;
```

|名前|説明|
|---|---|
|read()| 'data'を'size'バイトで埋める。実際に読み込んだバイト数を返す |
|skip()| 次の'n'バイトをスキップするか、負の場合は最後の-nバイトを'unget'する。 |
|eof() | ファイル/データの末尾にある場合、ゼロ以外を返す。 |

## 8ビット/チャンネル・インターフェース

```c
STBIDEF stbi_uc *stbi_load_from_memory   (stbi_uc           const *buffer, int len   , int *x, int *y, int *channels_in_file, int desired_channels);
STBIDEF stbi_uc *stbi_load_from_callbacks(stbi_io_callbacks const *clbk  , void *user, int *x, int *y, int *channels_in_file, int desired_channels);

#ifndef STBI_NO_STDIO
STBIDEF stbi_uc *stbi_load            (char const *filename, int *x, int *y, int *channels_in_file, int desired_channels);
STBIDEF stbi_uc *stbi_load_from_file  (FILE *f, int *x, int *y, int *channels_in_file, int desired_channels);
```

stbi_load_from_fileの場合、ファイルポインタは画像の直後を指す。

```c
#endif

#ifndef STBI_NO_GIF
STBIDEF stbi_uc *stbi_load_gif_from_memory(stbi_uc const *buffer, int len, int **delays, int *x, int *y, int *z, int *comp, int req_comp);
#endif

#ifdef STBI_WINDOWS_UTF8
STBIDEF int stbi_convert_wchar_to_utf8(char *buffer, size_t bufferlen, const wchar_t* input);
#endif
```

## 16ビット/チャンネル・インターフェース

```c
STBIDEF stbi_us *stbi_load_16_from_memory   (stbi_uc const *buffer, int len, int *x, int *y, int *channels_in_file, int desired_channels);
STBIDEF stbi_us *stbi_load_16_from_callbacks(stbi_io_callbacks const *clbk, void *user, int *x, int *y, int *channels_in_file, int desired_channels);

#ifndef STBI_NO_STDIO
STBIDEF stbi_us *stbi_load_16          (char const *filename, int *x, int *y, int *channels_in_file, int desired_channels);
STBIDEF stbi_us *stbi_load_from_file_16(FILE *f, int *x, int *y, int *channels_in_file, int desired_channels);
#endif
```

## float-per-channel interface

```c
#ifndef STBI_NO_LINEAR
   STBIDEF float *stbi_loadf_from_memory     (stbi_uc const *buffer, int len, int *x, int *y, int *channels_in_file, int desired_channels);
   STBIDEF float *stbi_loadf_from_callbacks  (stbi_io_callbacks const *clbk, void *user, int *x, int *y,  int *channels_in_file, int desired_channels);

   #ifndef STBI_NO_STDIO
   STBIDEF float *stbi_loadf            (char const *filename, int *x, int *y, int *channels_in_file, int desired_channels);
   STBIDEF float *stbi_loadf_from_file  (FILE *f, int *x, int *y, int *channels_in_file, int desired_channels);
   #endif
#endif

#ifndef STBI_NO_HDR
   STBIDEF void   stbi_hdr_to_ldr_gamma(float gamma);
   STBIDEF void   stbi_hdr_to_ldr_scale(float scale);
#endif // STBI_NO_HDR

#ifndef STBI_NO_LINEAR
   STBIDEF void   stbi_ldr_to_hdr_gamma(float gamma);
   STBIDEF void   stbi_ldr_to_hdr_scale(float scale);
#endif // STBI_NO_LINEAR
```

stbi_is_hdrは常に定義されるが、STBI_NO_HDRの場合は常にfalseを返す。

```c
STBIDEF int    stbi_is_hdr_from_callbacks(stbi_io_callbacks const *clbk, void *user);
STBIDEF int    stbi_is_hdr_from_memory(stbi_uc const *buffer, int len);
#ifndef STBI_NO_STDIO
STBIDEF int    stbi_is_hdr          (char const *filename);
STBIDEF int    stbi_is_hdr_from_file(FILE *f);
#endif // STBI_NO_STDIO
```

ほとんどのコンパイラ（そして最近の主流コンパイラすべて）で、失敗の理由を簡単に説明します。

```c
STBIDEF const char *stbi_failure_reason  (void);
```

読み込んだ画像を解放する -- これは単なるfree()

```c
STBIDEF void     stbi_image_free      (void *retval_from_stbi_load);
```

完全にデコードすることなく、画像の寸法とコンポーネントを取得する

```c
STBIDEF int stbi_info_from_memory(stbi_uc const *buffer, int len, int *x, int *y, int *comp);
STBIDEF int stbi_info_from_callbacks(stbi_io_callbacks const *clbk, void *user, int *x, int *y, int *comp);
STBIDEF int stbi_is_16_bit_from_memory(stbi_uc const *buffer, int len);
STBIDEF int stbi_is_16_bit_from_callbacks(stbi_io_callbacks const *clbk, void *user);

#ifndef STBI_NO_STDIO
STBIDEF int stbi_info               (char const *filename,     int *x, int *y, int *comp);
STBIDEF int stbi_info_from_file     (FILE *f,                  int *x, int *y, int *comp);
STBIDEF int stbi_is_16_bit          (char const *filename);
STBIDEF int stbi_is_16_bit_from_file(FILE *f);
#endif
```

アルファを事前に乗算していることを明示している画像フォーマットの場合は、ファイルに保存されている色をそのまま返します。このフラグを設定すると、掛け算を行わないようにする。オーバーフローさせると、結果は未定義になる。

```c
STBIDEF void stbi_set_unpremultiply_on_load(int flag_true_if_should_unpremultiply);
```

iphoneの画像をカノニカル形式に戻すべきか、あるいは "そのまま" 通すかを示す 。

```c
STBIDEF void stbi_convert_iphone_png_to_rgb(int flag_true_if_should_convert);
```

画像を垂直に反転させ、出力配列の最初のピクセルを左下にする。

```c
STBIDEF void stbi_set_flip_vertically_on_load(int flag_true_if_should_flip);
```

この関数は、コンパイラがスレッドローカル変数をサポートしている場合にのみ使用できます。

```c
STBIDEF void stbi_set_unpremultiply_on_load_thread(int flag_true_if_should_unpremultiply);
STBIDEF void stbi_convert_iphone_png_to_rgb_thread(int flag_true_if_should_convert);
STBIDEF void stbi_set_flip_vertically_on_load_thread(int flag_true_if_should_flip);
```

ZLIBクライアント - PNGで使用され、他の目的に使用可能

```c
STBIDEF char *stbi_zlib_decode_malloc_guesssize(const char *buffer, int len, int initial_size, int *outlen);
STBIDEF char *stbi_zlib_decode_malloc_guesssize_headerflag(const char *buffer, int len, int initial_size, int *outlen, int parse_header);
STBIDEF char *stbi_zlib_decode_malloc(const char *buffer, int len, int *outlen);
STBIDEF int   stbi_zlib_decode_buffer(char *obuffer, int olen, const char *ibuffer, int ilen);

STBIDEF char *stbi_zlib_decode_noheader_malloc(const char *buffer, int len, int *outlen);
STBIDEF int   stbi_zlib_decode_noheader_buffer(char *obuffer, int olen, const char *ibuffer, int ilen);


#ifdef __cplusplus
}
#endif
```

## 終了ヘッダーファイル

```c
#endif // STBI_INCLUDE_STB_IMAGE_H
```
