# stb_truetype.h

- v1.26
- public domain

2009年から2021年までショーン・バレットが執筆 / RADゲームツール

## 無保証

信頼できないフォントファイルには使用しないでください。

このライブラリは、ファイル内で見つかったオフセットの範囲チェックを行わない。つまり、攻撃者はこれを使用して任意のメモリを読み取ることができる。

## このライブラリはTrueTypeファイルを処理する

- ファイルの解析
- グリフ配置を抽出する
- グリフ形状の抽出
- グリフをアンチエイリアス付き1チャンネルビットマップにレンダリングする (ボックスフィルタ)
- グリフを 1 チャンネルの SDF ビットマップにレンダリング (符号付き距離フィールド/関数)

## Todo

- MS以外のcmap
- 不良データへの衝突防止
- ヒンティング？(もはや特許ではない)
- クリアタイプのAA？
- 最適化：中間体にはシンプルなメモリ・アロケータを使う
- 最適化：カーブから直接エッジリストを作る
- 最適化：カーブから直接ラスタライズ？

## その他のコントリビュータ

- Mikko Mononen: 複合形状のサポート、より多くのcmapフォーマット
- Tor Andersson: カーニング、サブピクセルレンダリング
- Dougall Johnson: OpenType / Type 2フォントの取り扱い
- Daniel Ribeiro Maciel: 基本的なGPOSベースのカーニング

- その他:
  - Ryan Gordon
  - Simon Glass
  - github:IntellectualKitty
  - Imanol Celaya
  - Daniel Ribeiro Maciel

- バグ／警告の報告／修正:
  - "Zer" on mollyrocket       Fabian "ryg" Giesen   github:NiLuJe
  - Cass Everitt               Martins Mozeiko       github:aloucks
  - stoiko (Haemimont Games)   Cap Petschulat        github:oyvindjam
  - Brian Hook                 Omar Cornut           github:vassvik
  - Walter van Niftrik         Ryan Griege
  - David Gow                  Peter LaValle
  - David Given                Sergey Popov
  - Ivan-Assen Ivanov          Giumo X. Clanjor
  - Anthony Pesch              Higor Euripedes
  - Johan Duparc               Thomas Fields
  - Hou Qiming                 Derek Vinyard
  - Rob Loach                  Cort Stratton
  - Kenney Phillis Jr.         Brian Costabile
  - Ken Voskuil (kaesve)

## バージョン履歴

- 1.26 (2021-08-28) fix broken rasterizer
- 1.25 (2021-07-11) many fixes
- 1.24 (2020-02-05) fix warning
- 1.23 (2020-02-02) query SVG data for glyphs; query whole kerning table (but only kern not GPOS)
- 1.22 (2019-08-11) minimize missing-glyph duplication; fix kerning if both 'GPOS' and 'kern' are defined
- 1.21 (2019-02-25) fix warning
- 1.20 (2019-02-07) PackFontRange skips missing codepoints; GetScaleFontVMetrics()
- 1.19 (2018-02-11) GPOS kerning, STBTT_fmod
- 1.18 (2018-01-29) add missing function
- 1.17 (2017-07-23) make more arguments const; doc fix
- 1.16 (2017-07-12) SDF support
- 1.15 (2017-03-03) make more arguments const
- 1.14 (2017-01-16) num-fonts-in-TTC function
- 1.13 (2017-01-02) support OpenType fonts, certain Apple fonts
- 1.12 (2016-10-25) suppress warnings about casting away const with -Wcast-qual
- 1.11 (2016-04-02) fix unused-variable warning
- 1.10 (2016-04-02) user-defined fabs(); rare memory leak; remove duplicate typedef
- 1.09 (2016-01-16) warning fix; avoid crash on outofmem; use allocation userdata properly
- 1.08 (2015-09-13) document stbtt_Rasterize(); fixes for vertical & horizontal edges
- 1.07 (2015-08-01) allow PackFontRanges to accept arrays of sparse codepoints;
  - variant PackFontRanges to pack and render in separate phases;
  - fix stbtt_GetFontOFfsetForIndex (never worked for non-0 input?);
  - fixed an assert() bug in the new rasterizer
  - replace assert() with STBTT_assert() in new rasterizer

詳しい履歴はこのファイルの最後にある。

## ライセンス

ライセンス情報はファイルの最後を参照。

## 使い方

このファイルを参照する必要があれば、どのような場所でもインクルードする。ひとつのC/C++ファイルに、こう書く：

```c
#define STB_TRUETYPE_IMPLEMENTATION
```

このファイルの`#include`の前にある。これにより、実際の実装がそのC/C++ファイルに展開される。

実装を生成するファイルのプライベートにするには、

```c
#define STBTT_STATIC
```

## シンプルな3DAPI

(これは出荷されないが、ツールやクイックスタートには問題ない。)

- stbtt_BakeFontBitmap()  -- フォントをテクスチャとして使用するためにビットマップにベイクする
- stbtt_GetBakedQuad()    -- 与えられた文字に対して描画する四角形を計算する

## 3DAPIの改善

（より出荷しやすくなった）:

- #include "stb_rect_pack.h"           -- 任意だが、どうしても必要な場合
- stbtt_PackBegin()
- stbtt_PackSetOversampling()          -- 小さなフォントの品質を向上させる
- stbtt_PackFontRanges()               -- パックとレンダリング
- stbtt_PackEnd()
- stbtt_GetPackedQuad()

## メモリバッファからフォントファイルを「ロード」する

（バッファをロードしておく必要があります）

stbtt_InitFont()
stbtt_GetFontOffsetForIndex()        -- TTCフォントコレクションのインデックス作成
stbtt_GetNumberOfFonts()             -- TTCフォントコレクションのフォント数

## Render a unicode codepoint to a bitmap

- stbtt_GetCodepointBitmap()           -- ビットマップを割り当てて返す
- stbtt_MakeCodepointBitmap()          -- 指定したビットマップにレンダリングする
- stbtt_GetCodepointBitmapBox()        -- ビットマップの大きさ

## Character advance/positioning

- stbtt_GetCodepointHMetrics()
- stbtt_GetFontVMetrics()
- stbtt_GetFontVMetricsOS2()
- stbtt_GetCodepointKernAdvance()

バージョン1.06から、ラスタライザは、より高速で一般的に精度の高い新しいラスタライザに置き換えられました。

新しいラスタライザは、アンチエイリアシングのためのピクセルカバレッジをより正確に測定します。ただし、複数の形状が重なる場合を除く, この場合、AAピクセルのカバレッジを過大評価する。

そのため、交差する形状のアンチエイリアスがおかしく見えることがある。

これが問題であることが判明した場合、以下の方法で古いラスタライザを再度有効にすることができる。

```c
#define STBTT_RASTERIZER_VERSION 1
```

これは約15％のスピードヒットになる。

## 追加ドキュメント

このブロック・コメントの直後に、一連のサンプル・プログラムがある。サンプル・プログラムの後は、「ヘッダー・ファイル」のセクションです。このセクションには、各 API 関数のドキュメントが含まれています。

このライブラリを使用するために理解しておくべきいくつかの重要な概念:

### コードポイント

文字はユニコードのコードポイントによって定義される。例：65は大文字のA、231は小文字のcで頭文字付き、0x7e30はひらがなの "ま".

### グリフ

視覚的な文字の形 (すべてのコードポイントは何らかのグリフとしてレンダリングされる)

### グリフインデックス

グリフを表すフォント固有の整数ID

### ベースライン

グリフの形状は、ベースライン（大文字の一番下）に対して相対的に定義されます。文字はベースラインの上にも下にも伸びる.

### 現在のポイント

テキストをスクリーンに描くとき、各文字の原点である「カレントポイント」を記録する。現在の点の垂直位置がベースラインとなる。「ベイクド・フォント」でさえ、このモデルを使用している

### 縦書きフォントの指標

フォントの縦方向の特性で、文字の縦方向の位置と間隔を決めるのに使われる。stbtt_GetFontVMetrics のドキュメントを参照してください。

### フォントサイズ（ピクセルまたはポイント

stb_truetypeでフォントサイズを指定するのに適したインターフェースは、フォントの縦方向の長さをピクセル単位で指定することです。これで十分と思われる方は、次の段落を飛ばしてください。

ほとんどのフォントAPIは、代わりに「ポイント」を使用しています。ポイントとは、フォントサイズを記述するための一般的なタイポグラフィの測定方法で、1インチあたり72ポイントとして定義されています。stb_truetype は互換性のためにポイント API を提供します。しかし、コンピュータのディスプレイでは、モニターによって1インチあたりのピクセル数が異なるため、本当の「1インチあたり」の規約はあまり意味をなさない。例えば、Windowsは伝統的に1インチあたり96ピクセルという慣例を使用しているため、「インチ」測定はインチとは関係なく、事実上1点を1.333ピクセルと定義している。さらに、TrueTypeフォントデータは、与えられたフォントのグリフをポイントにスケーリングするための明示的なスケールファクターを提供するが、著者は、このスケールファクターがしばしば非商用フォントに対して間違っていることを観察してきた。したがって、TrueType仕様に従ってポイントでスケーリングされたフォントは、実際には支離滅裂なサイズになってしまう。

## 詳細使用法

### スケール

フォントの高さをポイントまたはピクセルで選択します。ScaleForPixelHeight または ScaleForMappingEmToPixels を呼び出して、他のすべての関数で使用されるスケールファクタ SF を計算します。

### ベースライン

テキストが表示されるベースラインとなるy座標を選択する必要があります。 GetFontBoundingBoxを呼び出して、すべての文字のベースライン-相対バウンディングボックスを取得する `SF*-y0`は、最悪の場合、文字がベースラインからはみ出る可能性のあるピクセルの距離になります。したがって、文字の上端を画面の一番上に表示させたい場合は、y=0とする。その場合、ベースラインを`SF*-y0`に設定することになる。

### 現在のポイント

最初の文字が表示される現在点を設定する. 最初の文字が現在点より左に伸びる可能性がある; これはフォントに依存する. カレントポイントを左端から選んで希望するか、パディングを追加するか、最初に表示する文字のバウンディングボックスまたは左辺をチェックし、それに基づいてカレントポイントを設定する。

### 文字の表示

文字のバウンディングボックスを計算する。`<current_point, baseline>`を基準とした符号付き値が格納される。例えば、x0,y0,x1,y1を返す場合、文字は `<current_point+SF*x0, baseline+SF*y0>` から `<current_point+SF*x1,baseline+SF*y1)`までの矩形内に表示される

### 次の文字のために前進する

GlyphHMetricsを呼び出し、'current_point += SF * advance'を計算する。.

## 高度な使用法

### 品質

- 文字にサブピクセルの位置決めをさせるには、最後にSubpixelを付けた関数を使用します。フォントはアンチエイリアス処理され、ヒントは表示されない。(これはベイクドフォントでは不可能である。)
- カーニングがサポートされるようになった。サブピクセルレンダリングをサポートしているのであれば、テキストに洗練された印象を与えるためにカーニングを使う価値がある。

### パフォーマンス

- Unicodeコードポイントをグリフインデックスへ変換し、グリフを操作します. これを行わないと、stb_truetypeは呼び出されるたびに変換を行うことになる。
- メモリ割り当てが多い. テンポラリ・バッファを受け取り、（フリーにせずに）テンポラリ・バッファからアロケートするように修正すべきだ。

## NOTES

システムは、.ttfファイルにある生のデータを変更することなく、また補助的なデータ構造を構築することなく使用します。これはリトルエンディアンのシステムでは少し非効率的だが（データはビッグエンディアン）、ビットマップやグリフのシェイプをキャッシュしていると仮定すれば、大きな問題にはならないだろう。

一般的な方法で、与えられたファイルのフォントをプログラムで決定するのは非常に難しいようです。私はそのためのAPIを提供しているが、お勧めはしない。

### 1.06のパフォーマンス測定

|処理|  32-bit | 64-bit |
|---|---|---|
| 前回のリリース |  8.83 s | 7.68 s |
| プール配分 |  7.72 s | 6.34 s |
| インライン・ソート |  6.54 s | 5.65 s |
| 新しいラスタライザー |  5.63 s | 5.00 s |

## サンプルプログラム

不完全なtext-in-3d-apiの例で、ロスレスになるように適切に整列された四角形を描画する。
完全版は "tests/truetype_demo_win32.c "を参照。

```c
#define STB_TRUETYPE_IMPLEMENTATION  // 実装を生成するために以下のインクルードを強制する。
#include "stb_truetype.h"

unsigned char ttf_buffer[1<<20];
unsigned char temp_bitmap[512*512];

stbtt_bakedchar cdata[96]; // ASCII 32..126 is 95 glyphs
GLuint ftex;

void my_stbtt_initfont(void)
{
   fread(ttf_buffer, 1, 1<<20, fopen("c:/windows/fonts/times.ttf", "rb"));
   stbtt_BakeFontBitmap(ttf_buffer,0, 32.0, temp_bitmap,512,512, 32,96, cdata); // これがフィットする保証はない！
   // この時点でttf_bufferを解放できる
   glGenTextures(1, &ftex);
   glBindTexture(GL_TEXTURE_2D, ftex);
   glTexImage2D(GL_TEXTURE_2D, 0, GL_ALPHA, 512,512, 0, GL_ALPHA, GL_UNSIGNED_BYTE, temp_bitmap);
   // この時点でtemp_bitmapを解放できる
   glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
}

void my_stbtt_print(float x, float y, char *text)
{
   // 単位＝スクリーンピクセル、原点＝左上の正射投影を想定
   glEnable(GL_BLEND);
   glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
   glEnable(GL_TEXTURE_2D);
   glBindTexture(GL_TEXTURE_2D, ftex);
   glBegin(GL_QUADS);
   while (*text) {
      if (*text >= 32 && *text < 128) {
         stbtt_aligned_quad q;
         stbtt_GetBakedQuad(cdata, 512,512, *text-32, &x,&y,&q,1);//1=opengl & d3d10+,0=d3d9
         glTexCoord2f(q.s0,q.t0); glVertex2f(q.x0,q.y0);
         glTexCoord2f(q.s1,q.t0); glVertex2f(q.x1,q.y0);
         glTexCoord2f(q.s1,q.t1); glVertex2f(q.x1,q.y1);
         glTexCoord2f(q.s0,q.t1); glVertex2f(q.x0,q.y1);
      }
      ++text;
   }
   glEnd();
}
```

## 完全なプログラム（これはコンパイルされる）

単一のビットマップを取得し、ASCIIアートとして印刷する。

```c
#include <stdio.h>
#define STB_TRUETYPE_IMPLEMENTATION  // 実装を生成するために以下のインクルードを強制する。
#include "stb_truetype.h"

char ttf_buffer[1<<25];

int main(int argc, char **argv)
{
   stbtt_fontinfo font;
   unsigned char *bitmap;
   int w,h,i,j,c = (argc > 1 ? atoi(argv[1]) : 'a'), s = (argc > 2 ? atoi(argv[2]) : 20);

   fread(ttf_buffer, 1, 1<<25, fopen(argc > 3 ? argv[3] : "c:/windows/fonts/arialbd.ttf", "rb"));

   stbtt_InitFont(&font, ttf_buffer, stbtt_GetFontOffsetForIndex(ttf_buffer,0));
   bitmap = stbtt_GetCodepointBitmap(&font, 0,stbtt_ScaleForPixelHeight(&font, s), c, &w, &h, 0,0);

   for (j=0; j < h; ++j) {
      for (i=0; i < w; ++i)
         putchar(" .:ioVM@"[bitmap[j*w+i]>>5]);
      putchar('\n');
   }
   return 0;
}
```

出力:

```txt
   .ii.
  @@@@@@.
 V@Mio@@o
 :i.  V@V
   :oM@@M
 :@@@MM@M
 @@o  o@M
:@@.  M@M
 @@@o@@@@
 :M@@V:@@.
```

## 完全なプログラム

バグを含む "Hello World!"バナーの印刷

```c
char buffer[24<<20];
unsigned char screen[20][79];

int main(int arg, char **argv)
{
   stbtt_fontinfo font;
   int i,j,ascent,baseline,ch=0;
   float scale, xpos=2; // 文字が左にはみ出る場合に備えて、少しパディングを残す。
   char *text = "Heljo World!"; // 'lj'の壊れっぷりを示すために意図的にスペルを間違えている。

   fread(buffer, 1, 1000000, fopen("c:/windows/fonts/arialbd.ttf", "rb"));
   stbtt_InitFont(&font, buffer, 0);

   scale = stbtt_ScaleForPixelHeight(&font, 15);
   stbtt_GetFontVMetrics(&font, &ascent,0,0);
   baseline = (int) (ascent*scale);

   while (text[ch]) {
      int advance,lsb,x0,y0,x1,y1;
      float x_shift = xpos - (float) floor(xpos);
      stbtt_GetCodepointHMetrics(&font, text[ch], &advance, &lsb);
      stbtt_GetCodepointBitmapBoxSubpixel(&font, text[ch], scale,scale,x_shift,0, &x0,&y0,&x1,&y1);
      stbtt_MakeCodepointBitmapSubpixel(&font, &screen[baseline + y0][(int) xpos + x0], x1-x0,y1-y0, 79, scale,scale,x_shift,0, text[ch]);
```

これは古いデータを踏みにじるので、文字ボックスが重なっているところに注意してください。 (例：lj)
なぜなら、このAPIはキャラクタのビットマップをテクスチャにベイクするためのものだからだ。
一連の文字をレンダリングしたい場合は、各ビットマップをテンポラリバッファにレンダリングし、それを作業バッファに「アルファブレンド」する必要がある。

```c
      xpos += (advance * scale);
      if (text[ch+1])
         xpos += scale*stbtt_GetCodepointKernAdvance(&font, text[ch],text[ch+1]);
      ++ch;
   }

   for (j=0; j < 20; ++j) {
      for (i=0; i < 78; ++i)
         putchar(" .:ioVM@"[screen[j][i]>>5]);
      putchar('\n');
   }

   return 0;
}
```

## コードベースとの統合

以下のセクションでは、Cランタイム・ライブラリとリンクしない場合などに、 stb_truetypeが使用するCライブラリ関数の代替定義を提供することができる。

```c
#ifdef STB_TRUETYPE_IMPLEMENTATION
```

これをオーバーライドするために、(u)stbtt_int8/16/32 をインクルードする前に `#define` してください。

```c
   #ifndef stbtt_uint8
   typedef unsigned char   stbtt_uint8;
   typedef signed   char   stbtt_int8;
   typedef unsigned short  stbtt_uint16;
   typedef signed   short  stbtt_int16;
   typedef unsigned int    stbtt_uint32;
   typedef signed   int    stbtt_int32;
   #endif

   typedef char stbtt__check_size32[sizeof(stbtt_int32)==4 ? 1 : -1];
   typedef char stbtt__check_size16[sizeof(stbtt_int16)==2 ? 1 : -1];
```

例）`math.h` を避けるために、独自の STBTT_ifloor/STBTT_iceil() を `#define` する。

```c
   #ifndef STBTT_ifloor
   #include <math.h>
   #define STBTT_ifloor(x)   ((int) floor(x))
   #define STBTT_iceil(x)    ((int) ceil(x))
   #endif

   #ifndef STBTT_sqrt
   #include <math.h>
   #define STBTT_sqrt(x)      sqrt(x)
   #define STBTT_pow(x,y)     pow(x,y)
   #endif

   #ifndef STBTT_fmod
   #include <math.h>
   #define STBTT_fmod(x,y)    fmod(x,y)
   #endif

   #ifndef STBTT_cos
   #include <math.h>
   #define STBTT_cos(x)       cos(x)
   #define STBTT_acos(x)      acos(x)
   #endif

   #ifndef STBTT_fabs
   #include <math.h>
   #define STBTT_fabs(x)      fabs(x)
   #endif
```

`malloc.h`を避けるために、独自の関数 "STBTT_malloc" / "STBTT_free" を `#define` する。

```c
   #ifndef STBTT_malloc
   #include <stdlib.h>
   #define STBTT_malloc(x,u)  ((void)(u),malloc(x))
   #define STBTT_free(x,u)    ((void)(u),free(x))
   #endif

   #ifndef STBTT_assert
   #include <assert.h>
   #define STBTT_assert(x)    assert(x)
   #endif

   #ifndef STBTT_strlen
   #include <string.h>
   #define STBTT_strlen(x)    strlen(x)
   #endif

   #ifndef STBTT_memcpy
   #include <string.h>
   #define STBTT_memcpy       memcpy
   #define STBTT_memset       memset
   #endif
#endif
```

## INTERFACE

```c
#ifndef __STB_INCLUDE_STB_TRUETYPE_H__
#define __STB_INCLUDE_STB_TRUETYPE_H__

#ifdef STBTT_STATIC
#define STBTT_DEF static
#else
#define STBTT_DEF extern
#endif

#ifdef __cplusplus
extern "C" {
#endif
```

プレイベート構造体

```c
typedef struct
{
   unsigned char *data;
   int cursor;
   int size;
} stbtt__buf;
```

## テクスチャー・ベーキング・API

このAPIを使えば、2つの関数を呼び出すだけで済む。

```c
typedef struct
{
   unsigned short x0,y0,x1,y1; // ビットマップ内のbboxの座標
   float xoff,yoff,xadvance;
} stbtt_bakedchar;

STBTT_DEF int stbtt_BakeFontBitmap(const unsigned char *data, int offset,
                                   float pixel_height,                   
                                   unsigned char *pixels, int pw, int ph,
                                   int first_char, int num_chars,        
                                   stbtt_bakedchar *chardata);           
```

- data, offset: フォントの位置（プレーンな .ttf の場合は offset=0 を使用）
- pixel_height: フォントの高さ（ピクセル
- pixels, pw, ph: 塗りつぶされるビットマップ
- first_char, num_chars: 文字をベイクする
- chardata: これを割り当てると、num_charsの長さになる。

- return が正の場合、ビットマップの未使用の最初の行を返します。
- return が負の場合、フィットした文字数の負の値を返します。
- return が0の場合は、文字が収まらず、行が使用されなかったことを示す。

これは非常にくだらないパッキングを使っている。

```c
typedef struct
{
   float x0,y0,s0,t0; // top-left
   float x1,y1,s1,t1; // bottom-right
} stbtt_aligned_quad;

STBTT_DEF void stbtt_GetBakedQuad(const stbtt_bakedchar *chardata, int pw, int ph,
                                  int char_index,
                                  float *xpos, float *ypos,
                                  stbtt_aligned_quad *q,
                                  int opengl_fillrule);
```

- chardata, pw, ph: 同データ
- char_index: 表示する文字
- xpos, ypos: 画面ピクセル空間における現在位置へのポインタ
- q: output: 四角形で描く
- opengl_fillrule: openglフィル・ルールの場合はtrue; DX9以前の場合はfalse

char_index = 'character - first_char'でGetBakedQuadを呼び出すと、描画に必要な四角形が作成され、現在の位置が進む。

使用される座標系はyが下方向に増加すると仮定している。

文字は現在位置の上にも下にも伸びる；
上の "BASELINE "の議論を参照。

非効率的なので、`c&p`して最適化したほうがよい。

```c
STBTT_DEF void stbtt_GetScaledFontVMetrics(const unsigned char *fontdata, int index, float size, float *ascent, float *descent, float *lineGap);
```

フォントを最初に作成しなくても、フォントの縦メトリックを取得することができます。

## 新テクスチャー・ベーキングAPI

これは1つのアトラスに複数のフォントを詰め込むオプションを提供するもので、完璧ではないが、ないよりはましだ。

```c

typedef struct
{
   unsigned short x0,y0,x1,y1; // ビットマップ内のbboxの座標
   float xoff,yoff,xadvance;
   float xoff2,yoff2;
} stbtt_packedchar;

typedef struct stbtt_pack_context stbtt_pack_context;
typedef struct stbtt_fontinfo stbtt_fontinfo;
#ifndef STB_RECT_PACK_VERSION
typedef struct stbrp_rect stbrp_rect;
#endif

STBTT_DEF int  stbtt_PackBegin(stbtt_pack_context *spc, unsigned char *pixels, int width, int height, int stride_in_bytes, int padding, void *alloc_context);
```

渡された stbtt_pack_context に格納されているパッキングコンテキストを初期化します。
今後このコンテキストを使用する呼び出しは、ここで渡されたビットマップに文字をパックします。幅*高さの1チャンネルビットマップ。
stride_in_bytesは、1つの行から次の行までの距離である（または0は、行がぎっしり詰まっていることを意味する）。
'padding' は、各文字の間に空けるパディングの量です。 (通常、バイリニアフィルタリングでテクスチャとして使用するビットマップには'1'が必要です。)

失敗すると 0 を、成功すると 1 を返す。

```c
STBTT_DEF void stbtt_PackEnd  (stbtt_pack_context *spc);
```

パッキングコンテキストを整理し、すべてのメモリを解放する。

```c
#define STBTT_POINT_SIZE(x)   (-(x))

STBTT_DEF int  stbtt_PackFontRange(stbtt_pack_context *spc, const unsigned char *fontdata, int font_index, float font_size,
                                int first_unicode_char_in_range, int num_chars_in_range, stbtt_packedchar *chardata_for_range);
```

fontdata 内で見つかる font_index 番目のフォントから文字ビットマップを作成します。(font_index=0が何かわからない場合は、font_index=0を使う。)
これは、first_unicode_chars_in_rangeから始まって増加するunicode値を持つ文字のnum_chars_in_rangeビットマップを作成します。
レンダリング方法のデータはchardata_for_rangeに格納されている。これらをstbtt_GetPackedQuadに渡して、レンダリング可能な四角形を返す。

font_sizeは、stbtt_ScaleForPixelHeightによって計算された、アセンダからディセンダまでの文字の完全な高さです。
stbtt_ScaleForMappingEmToPixels によって計算されたポイントサイズを使用するには、 STBTT_POINT_SIZE() でポイントサイズをラップし、その結果を 'font_size' として渡します。:

```c
...,                  20 , ... // フォントの最大マイナス最小 y の高さは 20 ピクセル
..., STBTT_POINT_SIZE(20), ... // 'M'の高さは20ピクセル
```

```c
typedef struct
{
   float font_size;
   int first_unicode_codepoint_in_range;  // もし0でなければ、文字が連続しており、これが最初のコードポイントである。
   int *array_of_unicode_codepoints;       // 非ゼロの場合、ユニコードのコードポイントの配列。
   int num_chars;
   stbtt_packedchar *chardata_for_range; // 出力
   unsigned char h_oversample, v_oversample; // これらは設定しないでください。
} stbtt_pack_range;

STBTT_DEF int  stbtt_PackFontRanges(stbtt_pack_context *spc, const unsigned char *fontdata, int font_index, stbtt_pack_range *ranges, int num_ranges);
```

rangeに格納された複数の文字の範囲から文字のビットマップを作成します。
これは通常、stbtt_PackFontRangeを複数回呼び出すよりも、よりよくパックされたビットマップを作成します。
これは1つのPackBegin/PackEnd内で複数回呼び出すことができることに注意してください。

```c
STBTT_DEF void stbtt_PackSetOversampling(stbtt_pack_context *spc, unsigned int h_oversample, unsigned int v_oversample);
```

フォントのオーバーサンプリングは、より高品質なサブピクセル配置を可能にすることで品質を向上させ、特にテキストサイズが小さい場合に価値があります。

この関数は、与えられたパックコンテキストに対して stbtt_PackFontRange(s) または stbtt_PackFontRangesGatherRects を呼び出す際のオーバーサンプリング量を設定します。
デフォルト（オーバーサンプリングなし）は h_oversample=1 と v_oversample=1 で実現されます。
必要な総ピクセル数は、`h_oversample*v_oversample`で、デフォルトより大きい。
たとえば、2x2 オーバーサンプリングは 1x1 の 4 倍のストレージを必要とします。
最良の結果を得るには、オーバーサンプリングテクスチャをバイリニアフィルタリングでレンダリングします。
オーバーサンプルフォントに関する情報は、stb/tests/oversampleのreadmeをご覧ください。

PackFontRangesGatherなどで使用するには、PackFontRangesGatherRectsを呼び出す前に設定する必要があります。

```c
STBTT_DEF void stbtt_PackSetSkipMissingCodepoints(stbtt_pack_context *spc, int skip);
```

`skip != 0` なら、stb_truetype に、対応するグリフがないコードポイントをスキップするように指示する。
skip=0（デフォルト）の場合, グリフのないコードポイントにはフォントの「欠落文字」グリフが返されます。慣例的に空箱が多い。

```c
STBTT_DEF void stbtt_GetPackedQuad(const stbtt_packedchar *chardata, int pw, int ph,  // 同データ
                               int char_index,             // 表示する文字
                               float *xpos, float *ypos,   // 画面ピクセル空間における現在位置へのポインタ
                               stbtt_aligned_quad *q,      // 出力: 描画する四角形
                               int align_to_integer);

STBTT_DEF int  stbtt_PackFontRangesGatherRects(stbtt_pack_context *spc, const stbtt_fontinfo *info, stbtt_pack_range *ranges, int num_ranges, stbrp_rect *rects);
STBTT_DEF void stbtt_PackFontRangesPackRects(stbtt_pack_context *spc, stbrp_rect *rects, int num_rects);
STBTT_DEF int  stbtt_PackFontRangesRenderIntoRects(stbtt_pack_context *spc, const stbtt_fontinfo *info, stbtt_pack_range *ranges, int num_ranges, stbrp_rect *rects);
```

これらの関数を順番に呼び出すことは、stbtt_PackFontRanges() を呼び出すこととほぼ同じです。
複数のフォントのパッキングをもっと制御したい場合、またはカスタムデータをフォントテクスチャにパッキングしたい場合は、stbtt_PackFontRanges()のソースを見て、これらの関数を使用してカスタムバージョンを作成してください、
たとえば、GatherRectsを複数回呼び出してrectの配列を1つ作り、PackRectsを1回呼び出して、RenderIntoRectsを繰り返し呼び出します。
こうすることで、PackFontRangesを複数回呼び出すよりも優れたパッキングができるかもしれません（できないかもしれません）。
ß
これは不透明な構造体で、PackBeginからPackEndまでに必要なすべてのコンテキストを保持する。

```c
struct stbtt_pack_context {
   void *user_allocator_context;
   void *pack_info;
   int   width;
   int   height;
   int   stride_in_bytes;
   int   padding;
   int   skip_missing;
   unsigned int   h_oversample, v_oversample;
   unsigned char *pixels;
   void  *nodes;
};
```

## FONT LOADING

```c
STBTT_DEF int stbtt_GetNumberOfFonts(const unsigned char *data);
```

この関数は、フォントファイル内のフォント数を決定します。
TrueType コレクション (.ttc) ファイルは複数のフォントを含むことができるが、TrueType フォント (.ttf) ファイルは 1 つのフォントしか含まない。
フォントの数は、インデックスが0からフォントの総数よりも1小さい場合には、前の関数でインデックス付けに用いることができます。.
エラーが発生した場合は-1が返される。

```c
STBTT_DEF int stbtt_GetFontOffsetForIndex(const unsigned char *data, int index);
```

各 .ttf/.ttc ファイルは複数のフォントを持つことができます。
各フォントは0から始まる連続したインデックス番号を持っています。
この関数を呼び出すと、指定されたインデックスのフォントオフセットを得ることができます。
インデックスが範囲外の場合は-1を返します。通常の.ttfファイルではフォントは1つしか定義されず、常にオフセット0になるので、インデックス0に対しては'0'を返し、それ以外のインデックスに対しては-1を返します。

以下の構造体はパブリックに定義されているので、スタック上やグローバルなどで宣言することができるが、不透明なものとして扱うべきである。

```c
struct stbtt_fontinfo
{
   void           * userdata;
   unsigned char  * data;              // .ttfファイルへのポインタ
   int              fontstart;         // フォント開始位置のオフセット

   int numGlyphs;                      // 範囲チェックに必要なグリフの数

   int loca,head,glyf,hhea,hmtx,kern,gpos,svg; // .ttfの先頭からのオフセットとしてのテーブルの位置
   int index_map;                              // 選んだ文字エンコーディングのcmapマッピング
   int indexToLocFormat;                       // グリフインデックスからグリフへのマッピングに必要なフォーマット

   stbtt__buf cff;                    // cffフォントデータ
   stbtt__buf charstrings;            // 文字列インデックス
   stbtt__buf gsubrs;                 // グローバル文字列サブルーチン・インデックス
   stbtt__buf subrs;                  // private charstring サブルーチン インデックス
   stbtt__buf fontdicts;              // フォント・ディクスの配列
   stbtt__buf fdselect;               // グリフからフォントディクトへのマップ
};

STBTT_DEF int stbtt_InitFont(stbtt_fontinfo *info, const unsigned char *data, int offset);
```

フォントを定義するファイルのオフセットが与えられると、この関数はシステムの残りの部分に必要なキャッシュ情報を構築します。
stbtt_fontinfoを自分で割り当てる必要があり、stbtt_InitFontがそれを埋めます。
内容は追加のデータ構造を持たない純粋な値データなので、解放するために特別なことをする必要はありません。
失敗すると0を返します。

文字とグリフ指数の変換

```c
STBTT_DEF int stbtt_FindGlyphIndex(const stbtt_fontinfo *info, int unicode_codepoint);
```

同じ文字に対して複数の処理を行う場合で、高速化を望むのであれば、処理しようとする文字でこの関数を呼び出し、コードポイントベースの関数の代わりにグリフベースの関数を使用します。
文字のコードポイントがフォント内で定義されていない場合は 0 を返します。

## CHARACTER PROPERTIES

```c
STBTT_DEF float stbtt_ScaleForPixelHeight(const stbtt_fontinfo *info, float pixels);
```

"高さ"が'ピクセル'のフォントを生成するためのスケールファクターを計算する。.
高さは、最も高いアセンダから最も低いディセンダまでの距離として測定されます；
つまり、stbtt_GetFontVMetricsを呼び出して計算するのと同じことです：

スケール = ピクセル / (上昇 - 下降)

つまり、stbtt_GetFontVMetricsを呼び出して、scale = pixels / (ascent - descent)を計算するのと同じことです。

```c
STBTT_DEF float stbtt_ScaleForMappingEmToPixels(const stbtt_fontinfo *info, float pixels);
```

は、EMサイズが'ピクセル'の高さにマッピングされたフォントを生成するためのスケールファクターを計算します。
これはおそらく従来のAPIが計算していたものだろうが、確証はない。

```c
STBTT_DEF void stbtt_GetFontVMetrics(const stbtt_fontinfo *info, int *ascent, int *descent, int *lineGap);
```

ascentは、フォントが伸びるベースラインより上の座標です；
descentは、フォントが伸びるベースラインより下の座標です（つまり、通常は負です）。
lineGapは、ある行の下降と次の行の上昇の間隔です...
したがって、垂直位置を `*ascent - *descent + *lineGap` だけ進める必要があります。
これらはスケーリングされていない座標で表現されているので、指定されたサイズのスケールファクターを掛ける必要があります。

```c
STBTT_DEF int  stbtt_GetFontVMetricsOS2(const stbtt_fontinfo *info, int *typoAscent, int *typoDescent, int *typoLineGap);
```

GetFontVMetricsに似ているが、OS/2のテーブルから "typographic "値を返す。 (MS/Windows TTFファイル専用).

成功（テーブルが存在する）なら1を、失敗なら0を返す。

```c
STBTT_DEF void stbtt_GetFontBoundingBox(const stbtt_fontinfo *info, int *x0, int *y0, int *x1, int *y1);
```

すべての可能な文字を囲むバウンディングボックス

```c
STBTT_DEF void stbtt_GetCodepointHMetrics(const stbtt_fontinfo *info, int codepoint, int *advanceWidth, int *leftSideBearing);
```

leftSideBearingは、現在の水平位置から文字の左端までのオフセット advanceWidthは、現在の水平位置から次の水平位置までのオフセット これらは拡大縮小されていない座標で表されます。

```c
STBTT_DEF int  stbtt_GetCodepointKernAdvance(const stbtt_fontinfo *info, int ch1, int ch2);
```

an additional amount to add to the 'advance' value between ch1 and ch2

```c
STBTT_DEF int stbtt_GetCodepointBox(const stbtt_fontinfo *info, int codepoint, int *x0, int *y0, int *x1, int *y1);
```

グリフの可視部分のバウンディングボックスを、拡大縮小されていない座標で取得する

```c
STBTT_DEF void stbtt_GetGlyphHMetrics(const stbtt_fontinfo *info, int glyph_index, int *advanceWidth, int *leftSideBearing);
STBTT_DEF int  stbtt_GetGlyphKernAdvance(const stbtt_fontinfo *info, int glyph1, int glyph2);
STBTT_DEF int  stbtt_GetGlyphBox(const stbtt_fontinfo *info, int glyph_index, int *x0, int *y0, int *x1, int *y1);
```

上記と同様ですが、より効率的にするために 1 つ以上のグリフインデックスを取ります。

```c
typedef struct stbtt_kerningentry
{
   int glyph1; // stbtt_FindGlyphIndexを使用する。
   int glyph2;
   int advance;
} stbtt_kerningentry;

STBTT_DEF int  stbtt_GetKerningTableLength(const stbtt_fontinfo *info);
STBTT_DEF int  stbtt_GetKerningTable(const stbtt_fontinfo *info, stbtt_kerningentry* table, int table_length);
```

フォントが与えるカニング対の全一覧を取得 stbtt_GetKerningTable は、table_length 個を超える項目を書き出すことなく、書き出した項目の数を返します。
テーブルは `(a.glyph1 == b.glyph1)?(a.glyph2 < b.glyph2):(a.glyph1 < b.glyph1)` でソートされます。

## グリフ・シェイプ

(これらはおそらく必要ないだろうが、Cの宣言順序の都合上、ビットマップの前に置かなければならない。)

```c
#ifndef STBTT_vmove // これらを事前に定義して、異なる値を使用することができます。 (でも、なぜ？)
   enum {
      STBTT_vmove=1,
      STBTT_vline,
      STBTT_vcurve,
      STBTT_vcubic
   };
#endif

#ifndef stbtt_vertex // 異なる値を使用するように事前に定義することができます。
                   // (RADの他のコードと共有しています。)
   #define stbtt_vertex_type short // stbtt_int16はヘッダーファイルで見ることができないので使えない。
   typedef struct
   {
      stbtt_vertex_type x,y,cx,cy,cx1,cy1;
      unsigned char type,padding;
   } stbtt_vertex;
#endif

STBTT_DEF int stbtt_IsGlyphEmpty(const stbtt_fontinfo *info, int glyph_index);
```

このグリフに対して何も描画されない場合、ゼロ以外を返す

```c
STBTT_DEF int stbtt_GetCodepointShape(const stbtt_fontinfo *info, int unicode_codepoint, stbtt_vertex **vertices);
STBTT_DEF int stbtt_GetGlyphShape(const stbtt_fontinfo *info, int glyph_index, stbtt_vertex **vertices);
```

頂点を `#` 個返し、その頂点へのポインタで `*vertices` を埋める。これらは "スケールなし" 座標で表される。

形状は一連の輪郭である。
それぞれSTBTT_movetoで始まり、STBTT_linetoとSTBTT_curvetoが混在した一連のセグメントで構成される。
linetoは前の端点からx,yに線を引く；
a curvetoは、cx,cyをベジェの制御点として、前の端点からそのx,yまで2次ベジェを描きます。

```c
STBTT_DEF void stbtt_FreeShape(const stbtt_fontinfo *info, stbtt_vertex *vertices);
```

確保されたデータを解放する。

```c
STBTT_DEF unsigned char *stbtt_FindSVGDoc(const stbtt_fontinfo *info, int gl);
STBTT_DEF int stbtt_GetCodepointSVG(const stbtt_fontinfo *info, int unicode_codepoint, const char **svg);
STBTT_DEF int stbtt_GetGlyphSVG(const stbtt_fontinfo *info, int gl, const char **svg);
```

svg を文字の SVG データで埋める。 SVGが見つからない場合、データサイズまたは0を返す.

## ビットマップレンダリング

```c
STBTT_DEF void stbtt_FreeBitmap(unsigned char *bitmap, void *userdata);
```

割り当てられたビットマップを解放する。

```c
STBTT_DEF unsigned char *stbtt_GetCodepointBitmap(const stbtt_fontinfo *info, float scale_x, float scale_y, int codepoint, int *width, int *height, int *xoff, int *yoff);
```

十分な大きさのシングルチャンネル8bppビットマップを確保し、指定された文字/グリフを指定されたスケールでアンチエイリアスをかけてレンダリングします。
0はカバーなし（透明）、255は完全にカバーされている（不透明）。
`*width & *height` are filled out with the width & height of the bitmap, which is stored left-to-right, top-to-bottom.

xoff/yoff はグリフの原点からビットマップの左上までのピクセル空間オフセットである。

```c
STBTT_DEF unsigned char *stbtt_GetCodepointBitmapSubpixel(const stbtt_fontinfo *info, float scale_x, float scale_y, float shift_x, float shift_y, int codepoint, int *width, int *height, int *xoff, int *yoff);
```

stbtt_GetCodepoitnBitmapと同じですが、文字のサブピクセルシフトを指定できます。

```c
STBTT_DEF void stbtt_MakeCodepointBitmap(const stbtt_fontinfo *info, unsigned char *output, int out_w, int out_h, int out_stride, float scale_x, float scale_y, int codepoint);
```

stbtt_GetCodepointBitmapと同じですが、ビットマップのストレージを 'output'の形式で、 'out_stride'バイトの行間隔で渡します。
ビットマップはout_w/out_hバイトに切り取られる。
まずstbtt_GetCodepointBitmapBoxを呼び出して、幅と高さ、位置情報を取得します。

```c
STBTT_DEF void stbtt_MakeCodepointBitmapSubpixel(const stbtt_fontinfo *info, unsigned char *output, int out_w, int out_h, int out_stride, float scale_x, float scale_y, float shift_x, float shift_y, int codepoint);
```

stbtt_MakeCodepointBitmapと同じですが、文字のサブピクセルシフトを指定できます。

```c
STBTT_DEF void stbtt_MakeCodepointBitmapSubpixelPrefilter(const stbtt_fontinfo *info, unsigned char *output, int out_w, int out_h, int out_stride, float scale_x, float scale_y, float shift_x, float shift_y, int oversample_x, int oversample_y, float *sub_x, float *sub_y, int codepoint);
```

stbtt_MakeCodepointBitmapSubpixel と同じですが、プリフィルタリングが行われます。 (stbtt_PackSetOversampling を参照。)

```c
STBTT_DEF void stbtt_GetCodepointBitmapBox(const stbtt_fontinfo *font, int codepoint, float scale_x, float scale_y, int *ix0, int *iy0, int *ix1, int *iy1);
```

グリフ原点を中心としたビットマップの bbox を取得する；
したがって、ビットマップの幅はix1-ix0、高さはyy1-iy0、ビットマップを左上に配置する位置は次のようになる。 (`leftSideBearing*scale,iy0`).
(ビットマップはy-increases-downを使うが、シェイプはy-increases-upを使うので、CodepointBitmapBoxとCodepointBoxは逆になっていることに注意。)

```c
STBTT_DEF void stbtt_GetCodepointBitmapBoxSubpixel(const stbtt_fontinfo *font, int codepoint, float scale_x, float scale_y, float shift_x, float shift_y, int *ix0, int *iy0, int *ix1, int *iy1);
```

stbtt_GetCodepointBitmapBoxと同じですが、文字のサブピクセルシフトを指定できます。

以下の関数は上記の関数と同等ですが、Unicode コードポイントの代わりにグリフインデックスを操作します（効率化のため）。

```c
STBTT_DEF unsigned char *stbtt_GetGlyphBitmap(const stbtt_fontinfo *info, float scale_x, float scale_y, int glyph, int *width, int *height, int *xoff, int *yoff);
STBTT_DEF unsigned char *stbtt_GetGlyphBitmapSubpixel(const stbtt_fontinfo *info, float scale_x, float scale_y, float shift_x, float shift_y, int glyph, int *width, int *height, int *xoff, int *yoff);
STBTT_DEF void stbtt_MakeGlyphBitmap(const stbtt_fontinfo *info, unsigned char *output, int out_w, int out_h, int out_stride, float scale_x, float scale_y, int glyph);
STBTT_DEF void stbtt_MakeGlyphBitmapSubpixel(const stbtt_fontinfo *info, unsigned char *output, int out_w, int out_h, int out_stride, float scale_x, float scale_y, float shift_x, float shift_y, int glyph);
STBTT_DEF void stbtt_MakeGlyphBitmapSubpixelPrefilter(const stbtt_fontinfo *info, unsigned char *output, int out_w, int out_h, int out_stride, float scale_x, float scale_y, float shift_x, float shift_y, int oversample_x, int oversample_y, float *sub_x, float *sub_y, int glyph);
STBTT_DEF void stbtt_GetGlyphBitmapBox(const stbtt_fontinfo *font, int glyph, float scale_x, float scale_y, int *ix0, int *iy0, int *ix1, int *iy1);
STBTT_DEF void stbtt_GetGlyphBitmapBoxSubpixel(const stbtt_fontinfo *font, int glyph, float scale_x, float scale_y,float shift_x, float shift_y, int *ix0, int *iy0, int *ix1, int *iy1);
```

@TODO: この構造を公開しない

```c
typedef struct
{
   int w,h,stride;
   unsigned char *pixels;
} stbtt__bitmap;
```

2次ベジエを持つ形状をビットマップにラスタライズする。

```c
STBTT_DEF void stbtt_Rasterize(stbtt__bitmap *result,        // 描画する1チャンネルのビットマップ
                               float flatness_in_pixels,     // 曲線の許容誤差（ピクセル
                               stbtt_vertex *vertices,       // 形状を定義する頂点の配列
                               int num_verts,                // 上記配列の頂点数
                               float scale_x, float scale_y, // 入力頂点に適用されるスケール
                               float shift_x, float shift_y, // 入力頂点に適用される変換
                               int x_off, int y_off,         // 入力に別の翻訳を適用
                               int invert,                   // 非ゼロの場合、形状を垂直に反転させる
                               void *userdata);              // STBTT_MALLOCへのコンテキスト
```

符号付き距離関数（またはフィールド）のレンダリング

```c
STBTT_DEF void stbtt_FreeSDF(unsigned char *bitmap, void *userdata);
```

以下に割り当てられたSDFビットマップを解放する。

```c
STBTT_DEF unsigned char * stbtt_GetGlyphSDF(const stbtt_fontinfo *info, float scale, int glyph, int padding, unsigned char onedge_value, float pixel_dist_scale, int *width, int *height, int *xoff, int *yoff);
STBTT_DEF unsigned char * stbtt_GetCodepointSDF(const stbtt_fontinfo *info, float scale, int codepoint, int padding, unsigned char onedge_value, float pixel_dist_scale, int *width, int *height, int *xoff, int *yoff);
```

これらの関数は、1文字の離散化されたSDFフィールドを計算し、シングルチャネルのテクスチャに格納し、バイリニアフィルタリングでサンプリングし、スケーラブルなフォントを生成するために、ある閾値より大きいかどうかをテストするのに適しています。

- info              --  フォント
- scale             --  通常のビットマップを作成するのと同じように、結果のSDFビットマップのサイズを制御します。
- glyph/codepoint   --  のSDFを生成する文字。
- padding           --  文字の周りの余分な "ピクセル "は、文字までの距離（0ではない）で埋められ、ビットアウトラインのような効果を可能にする。
- onedge_value      --  文字を再構成するためにSDFをテストする値0-255（つまり文字の等コンター）
- pixel_dist_scale  --  エッジからSDFを1ピクセル移動させたときに、SDFが増加する値。 (0～255スケール) 正の場合、`> onedge_value`が内側、負の場合、`< onedge_value`が内側
- width,height      --  SDFビットマップの出力高さと幅（パディングを含む）
- xoff,yoff         --  文字の出力元
- return value      --  0～255バイトの2次元配列で、サイズは幅*高さ

pixel_dist_scale & onedge_valueはスケールとバイアスで、精度と特殊効果をトレードオフしながら、アプリケーションのために限られた0～255を最適に利用することができます。0～255の範囲外のSDF値は0～255にクランプされます。

### 例

- scale = stbtt_ScaleForPixelHeight(22)
- padding = 5
- onedge_value = 180
- pixel_dist_scale = 180/5.0 = 36.0

これは、文字の高さが約22ピクセルで、ビットマップ全体の高さが約`22+5+5=32`ピクセルであるSDFビットマップを作成します。
塗りつぶし形状を生成するには、各ピクセルでSDFをサンプリングし、SDF値が`180/255`以上であればそのピクセルを塗りつぶす。
(実際にはアンチエイリアスをかけたいだろうが、それはこの例の範囲外だ。)
さらに、オフセット・アウトラインを計算することもできます（例えば、文字の境界線を内側と外側に描画したり、外側だけに描画したりします）。
例えば、文字の外側を3SDFピクセルまで塗りつぶすには、`(180-36.0*3)/255 = 72/255`と比較します。
上記の変数の選択は、シェイプの外側の5ピクセルから内側の2ピクセルの範囲を0～255にマッピングする；
これは主に、外側の効果のみを適用するためのものです（内側の範囲は、小さいサイズでのフォントの適切なアンチエイリアスを可能にするために必要です）。

この関数は、例えば高解像度のビットマップを作成して近似するのではなく、各SDFピクセルで解析的にSDFを計算する。
理論的には、このサイズと表現のSDFでは、品質は可能な限り高いはずだが、実際にそうなのかは不明だ（おそらく、より高解像度のビットマップを作成し、そこから計算することで、ドロップアウトを防ぐことができるだろう）。

アルゴリズムはまったく最適化されていないので、たくさんの文字や非常に大きなサイズを計算する場合は遅くなることが予想される。

## 適切なフォントを見つける

どのフォントが何であるかの表を自分で管理し、.ttfファイルから取り出そうとしないでください。
というのも、.ttfファイルからそれを取り出すのは本当に難しいからだ。ファイル内の名前は、多くの可能なエンコーディング、多くの可能な言語で表示される可能性があり、例えば、大文字と小文字を区別しない比較が必要な場合、その詳細はエンコーディングと言語に複雑に依存する（実際、truetypeでは十分に仕様化されていないが、巨大でもある）。

しかし、提供された関数を次の2つの方法で使用することができます。:

stbtt_FindMatchingFont()は、ユニコード化された名前に対して大文字小文字を区別して比較を行い、希望のフォントを見つけようとします；
stbtt_InitFont()をコールする前にこれを実行することができます。
stbtt_GetFontNameString()は、ファイルから様々な文字列を取得し、独自の比較を行うことができます。
最初にstbtt_InitFont()を呼び出す必要があります。

```c
STBTT_DEF int stbtt_FindMatchingFont(const unsigned char *fontdata, const char *name, int flags);
```

STBTT_MACSTYLE_DONTCARE を使っている場合は、マッチするフォントのオフセット （インデックスではありません） を返し、マッチしない場合は -1 を返します。
他のフラグを使う場合は、"Arial "のようなフォント名を使ってください；
これは'macStyle'ヘッダーフィールドをチェックする；
フォントがこれを一貫して設定するかどうかはわからない。

```c
#define STBTT_MACSTYLE_DONTCARE     0
#define STBTT_MACSTYLE_BOLD         1
#define STBTT_MACSTYLE_ITALIC       2
#define STBTT_MACSTYLE_UNDERSCORE   4
#define STBTT_MACSTYLE_NONE         8   // <= 0と同じではない, これにより、ビットフィールドが0かどうかをチェックする

STBTT_DEF int stbtt_CompareUTF8toUTF16_bigendian(const char *s1, int len1, const char *s2, int len2);
```

utf8として解釈された最初の文字列が、ビッグエンディアンのutf16として解釈された2番目の文字列と同一であるかどうかを1/0で返す。次の関数からの文字列に便利

```c
STBTT_DEF const char *stbtt_GetFontNameString(const stbtt_fontinfo *font, int *length, int platformID, int encodingID, int languageID, int nameID);
```

文字列を返し（ユニコードの場合など、ビッグエンディアンのダブルバイトになることもある）、バイト単位の長さを `*length` に入れる。

IDの値の一部を以下に示します。詳細については、truetypeの仕様を参照してください。:

- `http://developer.apple.com/textfonts/TTRefMan/RM06/Chap6name.html`
- `http://www.microsoft.com/typography/otspec/name.htm`

```c
enum { // platformID
   STBTT_PLATFORM_ID_UNICODE   =0,
   STBTT_PLATFORM_ID_MAC       =1,
   STBTT_PLATFORM_ID_ISO       =2,
   STBTT_PLATFORM_ID_MICROSOFT =3
};

enum { // encodingID for STBTT_PLATFORM_ID_UNICODE
   STBTT_UNICODE_EID_UNICODE_1_0    =0,
   STBTT_UNICODE_EID_UNICODE_1_1    =1,
   STBTT_UNICODE_EID_ISO_10646      =2,
   STBTT_UNICODE_EID_UNICODE_2_0_BMP=3,
   STBTT_UNICODE_EID_UNICODE_2_0_FULL=4
};

enum { // encodingID for STBTT_PLATFORM_ID_MICROSOFT
   STBTT_MS_EID_SYMBOL        =0,
   STBTT_MS_EID_UNICODE_BMP   =1,
   STBTT_MS_EID_SHIFTJIS      =2,
   STBTT_MS_EID_UNICODE_FULL  =10
};

enum { // encodingID for STBTT_PLATFORM_ID_MAC; same as Script Manager codes
   STBTT_MAC_EID_ROMAN        =0,   STBTT_MAC_EID_ARABIC       =4,
   STBTT_MAC_EID_JAPANESE     =1,   STBTT_MAC_EID_HEBREW       =5,
   STBTT_MAC_EID_CHINESE_TRAD =2,   STBTT_MAC_EID_GREEK        =6,
   STBTT_MAC_EID_KOREAN       =3,   STBTT_MAC_EID_RUSSIAN      =7
};

enum { // languageID for STBTT_PLATFORM_ID_MICROSOFT; same as LCID...
       // problematic because there are e.g. 16 english LCIDs and 16 arabic LCIDs
   STBTT_MS_LANG_ENGLISH     =0x0409,   STBTT_MS_LANG_ITALIAN     =0x0410,
   STBTT_MS_LANG_CHINESE     =0x0804,   STBTT_MS_LANG_JAPANESE    =0x0411,
   STBTT_MS_LANG_DUTCH       =0x0413,   STBTT_MS_LANG_KOREAN      =0x0412,
   STBTT_MS_LANG_FRENCH      =0x040c,   STBTT_MS_LANG_RUSSIAN     =0x0419,
   STBTT_MS_LANG_GERMAN      =0x0407,   STBTT_MS_LANG_SPANISH     =0x0409,
   STBTT_MS_LANG_HEBREW      =0x040d,   STBTT_MS_LANG_SWEDISH     =0x041D
};

enum { // languageID for STBTT_PLATFORM_ID_MAC
   STBTT_MAC_LANG_ENGLISH      =0 ,   STBTT_MAC_LANG_JAPANESE     =11,
   STBTT_MAC_LANG_ARABIC       =12,   STBTT_MAC_LANG_KOREAN       =23,
   STBTT_MAC_LANG_DUTCH        =4 ,   STBTT_MAC_LANG_RUSSIAN      =32,
   STBTT_MAC_LANG_FRENCH       =1 ,   STBTT_MAC_LANG_SPANISH      =6 ,
   STBTT_MAC_LANG_GERMAN       =2 ,   STBTT_MAC_LANG_SWEDISH      =5 ,
   STBTT_MAC_LANG_HEBREW       =10,   STBTT_MAC_LANG_CHINESE_SIMPLIFIED =33,
   STBTT_MAC_LANG_ITALIAN      =3 ,   STBTT_MAC_LANG_CHINESE_TRAD =19
};

#ifdef __cplusplus
}
#endif

#endif // __STB_INCLUDE_STB_TRUETYPE_H__
```
