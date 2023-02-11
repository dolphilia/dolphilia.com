# シングルファイルのパブリックドメイン/オープンソースライブラリで、最小限の依存性

私は、多数の[シングルファイルC/C++パブリックドメインライブラリ](https://github.com/nothings/stb)の作者です。
このようなライブラリを書いているのは私だけではないので、以下に他の類似のライブラリを紹介します。

一般的に以下はCやC++から使用可能で、32ビットと64ビットの両方のプラットフォームでコンパイルできる、小さく、統合しやすい、移植可能なライブラリのリストです。しかし私は、特定のライブラリが宣伝どおりであるかどうか、高品質のソフトウェアであるかどうか、個人的に検証したわけではありません。

### ルール

- CまたはC++から利用可能なライブラリであること（理想は両方）。
- 複数のプラットフォームで利用可能であること (理想的には、すべての主要なデスクトップおよび/またはすべての主要なモバイル)
- ライブラリは32ビットと64ビットの両方のプラットフォームでコンパイルでき、動作すること。
- ライブラリは最大でも2つのファイル（ヘッダーとソース）を使用すること。

正当な理由がある場合は例外を認めます。

### 最近の追加情報

最近追加されたものには、左列にアスタリスクが付けられています。

### 新しいライブラリと訂正

リストの後にあるディスカッションをご覧ください。

### JSONパース

ここには多くのJSONパーサーがリストアップされています。いくつかの解析とパフォーマンス結果についてはhttps://github.com/miloyip/nativejson-benchmarkをご覧ください。

### その他のリスト

また関連する別のリストにも興味があるかもしれません。

- [clib](https://github.com/clibs/clib/wiki/Packages): コンパクトな単一のC関数リスト (ライセンスはリストアップされていません)
- [CCAN](https://ccodearchive.net/list.html): 共有可能なC関数のパッケージ (混合ライセンス)

### ライブラリのリスト

**CおよびC++から利用可能なパブリックドメインのシングルファイルライブラリは太字で表示されています。** その他のライブラリは、パブリックドメインでないか、2ファイルであるか、CとC++の両方から使えないか、3つとも使えないかのいずれかです。2ファイル以上のライブラリは、ほとんど禁止されています。

API欄では"C"はCのみ、"C++"はC++のみ、"C/C++"はどちらからでも使えるC/C++を意味します。いくつかのファイルはCまたはC++として**ビルド**する必要がありますが、ヘッダーファイルが動作するように `extern "C"` を使っていれば"C/C++"として適格です。(場合によっては、ヘッダーファイルのみのライブラリはCまたはC++としてコンパイルされますが、`extern "C"`が使用されていないため、どちらか一方からしか呼び出せない実装を生成します。この場合、ほとんどのユーザーにとって障害とならないため、表はまだそれをC/C++として修飾します)

### カテゴリー:

  - 汎用
    - [データ構造](#data-structures)
    - [文字列処理](#strings)
    - [スクリプト](#scripting)
    - [ハッシュ](#hashing)
  - 数学
    - [ベクトル数学](#vectors)
    - [幾何学数学](#geometry-math)
    - [一般数学](#math)
  - パーサー
    - [JSON](#json)
    - [YAML](#yaml)
    - [CSV](#csv)
    - [その他のシリアライズ](#serialization)
    - [argv引数処理](#argv)
    - [その他のパーサー](#parsing)
  - グラフィクス
    - [テキストモード](#graphics-text)
    - [2Dグラフィックス](#graphics-2d)
    - [3Dグラフィックス](#graphics-3d)
    - [3Dジオメトリファイルの処理](#geometry-file)
    - [画像の読み込み・保存・処理](#images)
  - オーディオ/ビデオ/データ圧縮
    - [圧縮](#compression)
    - [オーディオ処理とファイル](#audio)
    - [ビデオ](#video)
  - [ビデオゲーム](#videogames)
  - オペレーティングシステム機能
    - [ファイルおよびファイル名](#files--filenames)
    - [マルチスレッド](#multithreading)
    - [ネットワーク](#network)
    - [ハードウェア・インターフェイス](#hardware)
  - デバッグ・プロファイリング・テスト
    - [デバッグ](#debugging)
    - [プロファイリング](#profiling)
    - [ユニットテストなど](#unit-testing)
  - その他
    - [AI](#ai)
    - [暗号技術](#crypto)
    - [ユーザーインターフェース](#user-interface)
    - [雑多](#miscellaneous)

# AI
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
| [Genann](https://github.com/codeplea/genann)                          | zlib                 |C/C++|  2  | シンプルニューラルネットワーク (ANN)
| [KANN](https://github.com/attractivechaos/kann)                       | MIT                  |C/C++|  2  | 自動微分 (2ファイル)
| [micropather](http://www.grinninglizard.com/MicroPather/)             | zlib                 | C++ |  2  | \* でパスファインディング

# argv
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [Argh!](https://github.com/adishavit/argh)                           | BSD                  | C++ |**1**| コマンドライン引数解析
|  [Clara](https://github.com/catchorg/Clara)                           | Boost                | C++ |**1**| C++ 11 以降に対応したコマンドラインパーサ。
|  [CLI11](https://github.com/CLIUtils/CLI11)                           | BSD                  | C++ |**1**| モダンなC++11で機能豊富なCLI構文解析を実現
|  [cmdline](https://github.com/tanakh/cmdline)                         | BSD                  | C++ |**1**| コマンドライン引数解析
|  [flags](https://github.com/sailormoon/flags)                         | **public domain**    | C++ |**1**| コマンドライン引数解析
|  [kgflags](https://github.com/kgabis/kgflags)                         | MIT                  |C/C++|**1**| コマンドライン引数解析
|  [linkom](https://github.com/hernandp/linkom)                         | MIT                  |C/C++|**1**| コマンドライン引数解析 w/ DOS風オプション
|  [optionparser](http://optionparser.sourceforge.net/)                 | MIT                  | C++ |**1**| コマンドライン引数解析
|  [parg](https://github.com/jibsen/parg)                               | **public domain**    |  C  |  2  | コマンドライン引数解析
|  [ProgramOptions.hxx](https://github.com/Fytch/ProgramOptions.hxx)    | MIT                  | C++ |**1**| コマンドライン引数解析

# audio
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [aw_ima.h](https://github.com/afterwise/aw-ima/blob/master/aw-ima.h) | MIT                  |C/C++|**1**| IMA-ADPCM オーディオデコーダ
|  [btac1c](https://github.com/cr88192/bgbtech_misc/blob/master/mini/btac1c_mini0.h)| MIT      |C/C++|**1**| MS-IMA_ADPCM バリアント
|**[dr_flac](https://github.com/mackron/dr_libs)**                      | **public domain**    |C/C++|**1**| FLACオーディオデコーダー
|**[dr_wav](https://github.com/mackron/dr_libs)**                       | **public domain**    |C/C++|**1**| WAVオーディオローダー
|  [Geneva](https://github.com/KrzysztofSzewczyk/Geneva)                | MIT                  |C/C++|**1**| 各種8ビット波形を生成するライブラリ
|  [minimp3](https://github.com/lieff/minimp3)                          | CC0                  |  C  |**1**| sse/neonをサポートするミニマルなMP3デコーダ
|**[miniaudio](https://github.com/dr-soft/miniaudio)**                  | **public domain**    |C/C++|**1**| オーディオ再生・キャプチャライブラリ
|  [pocketmod](https://github.com/rombankzero/pocketmod)                | MIT                  |C/C++|**1**| ProTracker MODファイルレンダラー
|**[sts_mixer](https://github.com/kieselsteini/sts)**                   | **public domain**    |C/C++|**1**| 簡易ステレオオーディオミキサー
|  [tinysound](https://github.com/RandyGaul/tinyheaders)                | zlib                 |C/C++|**1**| ダイレクトサウンドオーディオミキサー＆WAVローダー
|  [TinySoundFont](https://github.com/schellingb/TinySoundFont)         | MIT                  |C/C++|**1**| SoundFont2 ローダー＆シンセサイザー

# 圧縮
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [dmc_unrar](https://github.com/DrMcCoy/dmc_unrar)                    | GPLv2+               |C/C++|**1**| RARファイルの解凍
|  [fastlz](https://code.google.com/archive/p/fastlz/source/default/source) | MIT              |C/C++|  2  | 高速だが大きなLZ圧縮
|  [lz4](https://github.com/lz4/lz4)                                    | BSD                  |C/C++|  2  | 高速だが大きなLZ圧縮
|**[miniz.c](https://github.com/richgel999/miniz)**                     | MIT                  |C/C++|**1**| 圧縮、解凍、ZIPファイル、PNG書き込み
|  [microtar](https://github.com/rxi/microtar)                          | MIT                  |C/C++|  2  | 軽量tarライブラリ
|  [pithy](https://github.com/johnezang/pithy)                          | BSD                  |C/C++|  2  | 高速だが大きなLZ圧縮

# 暗号
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [Monocypher](https://monocypher.org)                                 | **public domain**    |  C  |  2  | 高品質な小型暗号ライブラリ
|  [TweetNaCl](http://tweetnacl.cr.yp.to/software.html)                 | **public domain**    |  C  |  2  | 高品質な小型暗号ライブラリ

# データ構造
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [avl](https://github.com/etherealvisage/avl)                         | **public domain**    |C/C++|  2  | AVLツリー
|  [c-bool-value](https://github.com/lduck11007/c-bool-value)           | **WTFPLv2**          |C/C++|  1  | 標準C言語によるシンプルで簡単なブーリアン値
|  [chobo-shl](https://github.com/Chobolabs/chobo-shl)                  | MIT                  | C++ |**1**| C++11標準のライブラリやヘルパーのようなもの。
|**[DG_dynarr.h](https://github.com/DanielGibson/Snippets/)**           | **public domain**    |C/C++|**1**| プレーン C のためのタイプセーフな動的配列 (std::vector のような)
|  [DynaVar](https://github.com/ArjArav98/DynaVar)                      | GPL-3.0              | C++ |  1  | 任意の種類のプリミティブデータ型を格納することができるオブジェクト
|  [klib](http://attractivechaos.github.io/klib/)                       | MIT                  |C/C++|  2  | 多くの 2 ファイルライブラリ: ハッシュ、ソート、Bツリー、その他
|  [libpqueue](https://github.com/vy/libpqueue)                         | BSD                  |C/C++|  2  | 優先順位待ち行列（ヒープ）
|  [minilibs](https://github.com/ccxvii/minilibs)                       | **public domain**    |  C  |  2  | 2ファイルバイナリートレス (also regex, etc)
|  [PackedArray](https://github.com/gpakosz/PackedArray)                | **WTFPLv2**          |  C  |  2  | 非Pow2ビット数でメモリ効率の良い要素配列
|  [simclist](http://mij.oltrelinux.com/devel/simclist)                 | BSD                  |C/C++|  2  | リンクつきリスト
|  [selist](https://github.com/ennorehling/clibs)                       | ISC                  |C/C++|  2  | スペース効率に優れたリンクリスト
|  [mempool](https://github.com/hardikp/cpp-mempool)                    | MIT                  | C++ |**1**| C++の効率的な最小メモリプール実装
|  [uthash](https://github.com/troydhanson/uthash)                      | BSD                  |C/C++|  2  | 1ヘッダ、1ライセンスファイルのライブラリ: 汎用ハッシュ、リスト、その他

# デバッグ
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [dbgtools](https://github.com/wc-duck/dbgtools)                      | zlib                 |C/C++|  2  | クロスプラットフォームデバッグユーティリティライブラリ
|  [debug-assert](https://github.com/foonathan/debug_assert)            | zlib                 | C++ |**1**| モジュール式アサーションマクロ
|  [debugbreak](https://github.com/scottt/debugbreak)                   | BSD                  |C/C++|**1**| プログラムデバッグブレーク
|  [loguru](https://github.com/emilk/loguru)                            | **public domain**    | C++ |**1**| フレキシブルロギング
|  [pempek_assert.cpp](https://github.com/gpakosz/Assert)               | **WTFPLv2**          | C++ |  2  | フレキシブルアサーション

# ファイルおよびファイル名
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|**[DG_misc.h](https://github.com/DanielGibson/Snippets/)**             | **public domain**    |C/C++|**1**| Daniel Gibson の stb.h 風のクロスプラットフォームヘルパー: path/file、文字列
|  [dirent](https://github.com/tronkko/dirent)                          | MIT                  |C/C++|**1**| dirent for Windows: ファイルとディレクトリの情報を取得します。
|  [tfile](https://github.com/rec/tfile)                                | MIT                  |C++|**1**| FILE* ラッパーが read-write-append-seek-close を行う (Win/Mac/Unix)
|  [TinyDir](https://github.com/cxong/tinydir)                          | BSD                  |  C  |**1**| クロスプラットフォームでのディレクトリ読み込み（Win/POSIX/MinGW)
|  [tinyfiles](https://github.com/RandyGaul/tinyheaders)                | zlib                 |C/C++|**1**| クロスプラットフォームでのディレクトリ読み込み（Win/Mac/Unix）
|  [whereami](https://github.com/gpakosz/whereami)                      | **WTFPLv2**          |C/C++|  2  | 実行ファイルやモジュールのパスやファイル名を取得する。

# ジオメトリファイル
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [cgltf](https://github.com/jkuhlmann/cgltf)                          | MIT                  |  C  |**1**| glTF 2.0 ファイルローダー
|  [fast_obj.h](https://github.com/thisistherk/fast_obj)                | MIT                  |  C  |**1**| wavefront OBJ ファイルローダー
|  [objzero](https://github.com/jpcy/objzero)                           | MIT                  |  C  |  2  | wavefront OBJ ファイルローダー
|  [tinyply](https://github.com/ddiakopoulos/tinyply)                   | **public domain**    | C++ |  2  | PLY メッシュファイルローダ
|  [tinyobjloader](https://github.com/syoyo/tinyobjloader)              | MIT                  | C++ |**1**| wavefront OBJ ファイルローダー
|  [tinyobjloader-c](https://github.com/syoyo/tinyobjloader-c)          | MIT                  |  C  |**1**| wavefront OBJ ファイルローダー
|  [tk_objfile](https://github.com/joeld42/tk_objfile)                  | MIT                  |C/C++|**1**| OBJ ファイルローダー
|  [yocto_obj.h](https://github.com/xelatihy/yocto-gl)                  | MIT                  |C/C++|**1**| wavefront OBJ ファイルローダー

# 幾何学数学
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [Clipper](http://www.angusj.com/delphi/clipper.php)                  | Boost                | C++ |  2  | ライン・ポリゴンのクリッピングとオフセット
|**[df](https://github.com/983/df)**                                    | **public domain**    |C/C++|**1**| ボロノイ領域を格子の大きさの線形時間で見つける。
|  [jc_voronoi](https://github.com/JCash/voronoi)                       | MIT                  |C/C++|**1**| float/double データからボロノイ領域を探す
|  [nanoflann](https://github.com/jlblancoc/nanoflann)                  | BSD                  | C++ |**1**| 点群のKDツリーを構築する
|**[nv_voronoi.h](http://www.icculus.org/~mordred/nvlib/)**             | **public domain**    |C/C++|**1**| 整数入力の格子上のボロノイ領域の探索
|  [par_msquares](https://github.com/prideout/par)                      | MIT                  |C/C++|**1**| 二値化された画像を三角形に変換する
|  [par_shapes](http://github.prideout.net/shapes)                      | MIT                  |C/C++|**1**| 様々な3次元幾何学形状を生成
|  [PolyPartition](https://github.com/ivanfratric/polypartition)        | MIT                  | C++ |  2  | ポリゴンの三角形分割、パーティショニング
|**[rjm_mc.h](https://github.com/rmitton/rjm)**                         | **public domain**    |C/C++|**1**| マーチングキューブ三角測量機
|**[sobol.h](https://github.com/Marc-B-Reynolds/Stand-alone-junk/)**    | **public domain**    |C/C++|**1**| ソボルと層別サンプリングシーケンス
|  [sdf.h](https://github.com/memononen/SDF)                            | MIT                  |C/C++|**1**| アンチエイリアス画像から符号付き距離フィールドを計算する
|  [Tomas Akenine-Moller snippets](http://tinyurl.com/ht79ndj)          | **public domain**    |C/C++|  2  | 様々な3D交差点計算、lib化されていない
|  [Voxelizer](https://github.com/karimnaaji/voxelizer)                 | MIT                  |C/C++|**1**| 三角形メッシュをボクセル三角形メッシュに変換する
|  [xatlas](https://github.com/jpcy/xatlas)                             | MIT                  | C++ |  2  | メッシュパラメタリゼーション
|  [yocto_bvh.h](https://github.com/xelatihy/yocto-gl)                  | MIT                  |C/C++|**1**| 線型キャストと境界ボリューム階層の最も近い要素クエリ
|  [yocto_shape.h](https://github.com/xelatihy/yocto-gl)                | MIT                  |C/C++|**1**| シェイプ生成、テッセレーション、法線など。

# グラフィック（テキスト）
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [rang](https://github.com/agauniyal/rang)                            | **public domain**    | C++ |**1**| クロスプラットフォーム・カラーコンソールテキスト

# グラフィクス (2d)
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [blendish](https://bitbucket.org/duangle/oui-blendish/src)           | MIT                  |C/C++|  1  | NanoVGを使ったブレンダースタイルウィジェットレンダリング
|  [Cimg](http://cimg.eu/)                                              | CeCILL/CeCILL-C      | C++ |**1**| 画像処理ツールキット(60K LoC)
|  [Immediate2D](https://github.com/npiegdon/immediate2d)               | **public domain**    | C++ |  2  | Windows用ゼロコンフィギュレーション、イミディエイトモード2Dグラフィックス
|  [noc_turtle](https://github.com/guillaumechereau/noc)                | MIT                  |C/C++|  2  | 手続き型グラフィックスジェネレータ
|  [tigr](https://bitbucket.org/rmitton/tigr/src)                       | **public domain**    |C/C++|  2  | WindowsとmacOSのためのクイック＆ダーティなウィンドウテキスト/グラフィックス

# グラフィクス (3d)
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [debug-draw](https://github.com/glampert/debug-draw)                 | **public domain**    | C++ |**1**| APIにとらわれない即時モードデバッグレンダリング
|**[lightmapper](https://github.com/ands/lightmapper#lightmapper)**     | **public domain**    |C/C++|**1**| OpenGLレンダラを使ってオフラインでライトマップを焼く
|  [mikktspace](https://developer.blender.org/diffusion/B/browse/master/intern/mikktspace)| zlib|C/C++| 2  | 法線マッピングのための接線空間を計算する
|  [rjm_raytrace.h](https://github.com/rmitton/rjm)                     | **public domain**    |C/C++|**1**| オフラインベーキングのための最小限のSSEパケットレイトレーサー
|**[seamoptimizer](https://github.com/ands/seamoptimizer)**             | **public domain**    |C/C++|**1**| ライトマップデータを修正して継ぎ目を隠す
|  [sokol_gfx.h](https://github.com/floooh/sokol)                       | MIT                  |C/C++|**1**| クロスプラットフォーム 3D API ラッパー (GLES2+3/GL3/D3D11/Metal)
|  [Swarmz](https://github.com/Cultrarius/Swarmz)                       | **public domain**    | C++ |**1**| スウォーミング/フロッキングアルゴリズム
|  [tinygizmo](https://github.com/ddiakopoulos/tinygizmo)               | **public domain**    | C++ |  2  | 3D変換をインタラクティブに編集するためのギズモオブジェクト
|**[Vertex Cache Optimizer](https://github.com/Sigkill79/sts)**         | **public domain**    |C/C++|**1**| メッシュの頂点キャッシュ最適化
|  [Vulkan Memory Allocator](https://github.com/GPUOpen-LibrariesAndSDKs/VulkanMemoryAllocator)|MIT|C/C++|**1**| Vulkan用メモリアロケータ
|  [yocto_trace.h](https://github.com/xelatihy/yocto-gl)                | MIT                  |C/C++|**1**| 物理ベース単方向パストレーサー（ダイレクトライト用MIS付き
|  [yocto_symrigid.h](https://github.com/xelatihy/yocto-gl)             | MIT                  |C/C++|**1**| 剛体シミュレータ（逐次インパルス/PGS）、凹型オブジェクト対応

# ハード
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|**[EasyTab](https://github.com/ApoorvaJ/EasyTab)**                     | **public domain**    |C/C++|**1**| マルチプラットフォーム・タブレット入力
|  [libue](https://github.com/houqp/libue)                              | MIT                  |C/C++|  1  | Linuxデバイスのホットプラグアイベント用ヘルパーライブラリ

# ハッシュ化
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [xxHash](https://github.com/Cyan4973/xxHash)                         | BSD                  |C/C++|  2  | 高速ハッシュ関数

# 画像
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  EXR [miniexr](https://github.com/aras-p/miniexr)                     | **public domain**    | C++ |  2  | OpenEXRライター、ヘッダーファイルが必要
|  EXR [tinyexr](https://github.com/syoyo/tinyexr)                      | BSD                  |C/C++|**1**| EXRイメージの読み込み/書き込み、内部でminizを使用
|  GIF [gif.h](https://github.com/ginsweater/gif-h)                     | **public domain**    | C++ |**1**| アニメーションGIFライター（1回のみ搭載可能）
|  GIF **[gif_load](https://github.com/hidefromkgb/gif_load)**          | **public domain**    |C/C++|**1**| (アニメーション) GIFリーダー
|  GIF [jo_gif.cpp](http://www.jonolick.com/home/gif-writer)            | **public domain**    | C++ |**1**| アニメーションGIFライター（CPPファイルはHファイルとしても使用可）
|  JPG [jpeg-compressor](https://github.com/richgel999/jpeg-compressor) | **public domain**    | C++ |  2  | 2ファイルJPEG圧縮、2ファイルJPEG伸張
|  JPG [NanoJPEG](http://keyj.emphy.de/nanojpeg/)                       | MIT                  |C/C++|**1**| JPEGデコーダ
|  JPG **[tiny_jpeg.h](https://github.com/serge-rgb/TinyJPEG/)**        | **public domain**    |C/C++|**1**| JPEGエンコーダ
|  JPG EXIF [easyexif](https://github.com/mayanklahiri/easyexif)        | MIT                  | C++ |  2  | JPEG画像用EXIFメタデータ抽出ツール
|  JPG EXIF [TinyEXIF](https://github.com/cdcseacave/TinyEXIF)          | BSD                  | C++ |  2  | JPEG (XMP w/ TinyXML2 lib) からの EXIF データのパース
|  PDF [PDFgen](https://github.com/AndreRenaud/PDFGen)                  | **public domain**    |  C  |  2  | PDFライター |
|  PNG [lodepng](http://lodev.org/lodepng/)                             | zlib                 |C/C++|  2  | PNGエンコーダー/デコーダー
|  PNG [picopng.cpp](http://lodev.org/lodepng/picopng.cpp)              | zlib                 | C++ |  2  | ちっちゃなPNGローダー
|  PNG [TinyPngOutput](https://www.nayuki.io/page/tiny-png-output)      | LGPLv3               |C/C++|  2  | PNGライター |
|  PNM [PNM](https://github.com/dmilos/PNM)                             | Apache 2.0           | C++ |  1  | PBM、PGM、PPMのリーダ／ライタ |
|  SVG [nanoSVG](https://github.com/memononen/nanosvg)                  | zlib                 |C/C++|**1**| 1ファイルSVGパーサ、1ファイルSVGラスタライザ
|**[cro_mipmap.h](https://github.com/thebeast33/cro_lib)**              | **public domain**    |C/C++|**1**| 平均、最小、最大ミップマップジェネレータ
|  [rjm_texbleed.h](https://github.com/rmitton/rjm)                     | **public domain**    |C/C++|**1**| alpha=0となる画素の色を塗りつぶす。

# 数学
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [amoeba](https://github.com/starwing/amoeba)                         | MIT                  |C/C++|**1**| 制約ソルバー（Cassowary）、Luaバインディング付き
|  [fft](https://github.com/wareya/fft)                                 | **public domain**    | C++ |**1**| 高速フーリエ変換 |
|  [PoissonGenerator.h](https://github.com/corporateshark/poisson-disk-generator) | MIT        | C++ |**1**| ポアソン円盤点生成器（円盤または矩形）
|  [prns.h](http://marc-b-reynolds.github.io/shf/2016/04/19/prns.html)  | **public domain**    |C/C++|**1**| シーク可能な擬似乱数列
|**[rnd.h](https://github.com/mattiasgustavsson/libs)**                 | **public domain**    |C/C++|**1**| 擬似乱数生成
|  [ShaderFastLibs](https://github.com/michaldrobot/ShaderFastLibs)     | MIT                  | C++ |**1**| (HLSLでも) シェーダ用に最適化された近似超越関数 (特にGCN)
|  [simrank.hpp](https://github.com/roukaour/simrank)                   | MIT                  | C++ |  2  | SimRankグラフ類似性アルゴリズム
|  [SummedAreaTable](https://github.com/corporateshark/Summed-Area-Table.git) | MIT            | C++ |**1**| Summed-Area Tableの生成とsum/avgクエリ
|  [TinyExpr](https://github.com/codeplea/tinyexpr)                     | zlib                 |  C  |  2  | 文字列から数式を評価する

# マルチスレッド
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [bikeshed.h](https://github.com/DanEngelbrecht/bikeshed)             | MIT                  |C/C++|**1**| クロスプラットフォーム ロックフリー 固定メモリ 階層型作業スケジューラ
|  [mm_sched.h](https://github.com/vurtun/mmx)                          | zlib                 |C/C++|**1**| [enkiTS](https://github.com/dougbinks/enkiTS) をベースとしたクロスプラットフォームなマルチスレッドタスクスケジューラ。
|**[thread.h](https://github.com/mattiasgustavsson/libs)**              | **public domain**    |C/C++|**1**| クロスプラットフォーム・スレッドプリミティブ
|  [TinyCThread](https://tinycthread.github.io/)                        | zlib                 |C/C++|  2  | C11 Threads API のクロスプラットフォーム実装
|  [TinyThread++](https://tinythreadpp.bitsnbites.eu/)                  | zlib                 | C++ |  2  | C++11 Threads API のクロスプラットフォーム実装

# ネットワーク
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [civetweb](https://github.com/civetweb/civetweb)                     | MIT                  |C/C++|  2  | HTTP サーバ、Mongoose のフォーク
|  [EWS](https://github.com/hellerf/EmbeddableWebServer)                | BSD                  |C/C++|**1**| HTTPサーバー
|  [happyhttp](https://github.com/Zintinio/HappyHTTP)                   | zlib                 | C++ |  2  | HTTPクライアントリクエスト
|**[http](https://github.com/mattiasgustavsson/libs)**                  | **public domain**    |C/C++|**1**| HTTP get/post
|  [libcluon](https://github.com/chrberger/libcluon)                    | MPL-2.0              | C++ |**1**| [Protobuf](https://developers.google.com/protocol-buffers/), [LCM](http://lcm-proj.github.io/type_specification.html)/[ZCM](http://zerocm.github.io/zcm/), JSON, [MsgPack](https://msgpack.org) のシリアライズ/デシリアライズをネイティブ実装したクロスプラットフォームのソケットラッパーとデータマーシャリング。
|  [LUrlParser](https://github.com/corporateshark/LUrlParser)           | MIT                  | C++ |  2  | 軽量URL・URIパーサ RFC 1738, RFC 3986
|  [mm_web.h](https://github.com/vurtun/mmx)                            | BSD                  |C/C++|**1**| 軽量ウェブサーバ、webby のフォーク
|  [mongoose](https://github.com/cesanta/mongoose)                      | GPLv2                |C/C++|  2  | HTTPサーバー
|  [par_easycurl.h](https://github.com/prideout/par)                    | MIT                  |C/C++|**1**| cURL ラッパー
|**[sts_net](https://github.com/kieselsteini/sts)**                     | **public domain**    |C/C++|**1**| クロスプラットフォームソケットラッパー（ソケットセット、パケットAPI）
|  [yocto](https://github.com/tom-seddon/yhs)                           | **public domain**    |C/C++|  2  | 非プロダクションユースのHTTPサーバー
|**[zed_net](https://github.com/Smilex/zed_net)**                       | **public domain**    |C/C++|**1**| クロスプラットフォームソケットラッパー
|  [znet](https://github.com/starwing/znet)                             | MIT                  |C/C++|**1**| Luaバインディングによるクロスプラットフォームネットワーキング

# シリアライズ
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [archive](https://github.com/voidah/archive)                         |**public domain**     | C++ |**1**| STLサポートによるバイナリー・シリアライズとデシリアライズ
|  [libcluon](https://github.com/chrberger/libcluon)                    | MPL-2.0              | C++ |**1**| [Protobuf](https://developers.google.com/protocol-buffers/), [LCM](http://lcm-proj.github.io/type_specification.html)/[ZCM](http://zerocm.github.io/zcm/), JSON, [MsgPack](https://msgpack.org) のネイティブ実装によるクロスプラットフォームなデータシリアライズ/デシリアライゼーション。

# json
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [ajson](https://github.com/lordoffox/ajson)                          | Boost                | C++ |**1**| JSONのシリアライズとデシリアライズ、STLのサポート
|  [cJSON](https://sourceforge.net/projects/cjson/)                     | MIT                  |C/C++|**1**| JSONパーサー
|  [json.h](https://github.com/sheredom/json.h)                         | **public domain**    |C/C++|  2  | JSONパーサー
|  [json.hpp](https://github.com/nlohmann/json)                         | MIT                  | C++ |**1**| JSONのパース、シリアライズ、デシリアライズ
|  [jzon.h](https://github.com/Zguy/Jzon)                               | MIT                  | C++ |  2  | JSONパーサー
|  [PicoJSON](https://github.com/kazuho/picojson)                       | BSD                  | C++ |**1**| JSONパース/シリアライザ
|  [parson](https://github.com/kgabis/parson)                           | MIT                  |C/C++|  2  | JSONパーサーとシリアライザー

# yaml
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [mini-yaml](https://github.com/jimmiebergmann/mini-yaml)             | MIT                  | C++ |  2  | YAML パーサーとシリアライザー

# csv
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [CSVstream](https://github.com/awdeorio/csvstream/)                  | MIT                  | C++ |**1**| CSVパーサー
|  [Fast C++ CSV Parser](https://github.com/ben-strasser/fast-cpp-csv-parser) | BSD            | C++ |**1**| CSVパーサー
|  [Rapidcsv](https://github.com/d99kris/rapidcsv/)                     | BSD                  | C++ |**1**| CSVパーサー
|  [Vince's CSV Parser](https://github.com/vincentlaucsb/csv-parser)    | MIT                  | C++ |**1**| CSVパーサおよびシリアライザ

# パーサー
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [cmp](https://github.com/camgunz/cmp)                                | MIT                  |C/C++|  2  | MessagePack パーサおよびシリアライザ
|  [inih](https://github.com/benhoyt/inih)                              | BSD                  |C/C++|  2  | .iniファイルパーサ
|**[ini.h](https://github.com/mattiasgustavsson/libs)**                 | **public domain**    |C/C++|**1**| .iniファイルパーサ
|  [minilibs](https://github.com/ccxvii/minilibs)                       | **public domain**    |  C  |  2  | 2ファイル正規表現
|  [mm_lexer.h](https://github.com/vurtun/mmx)                          | zlib                 |C/C++|**1**| C言語風言語レキサー
|  [SLRE](https://github.com/cesanta/slre)                              |_GPLv2_               |C/C++|**1**| 正規表現マッチャー
|  [tinymemfile](https://github.com/RandyGaul/tinyheaders)              | zlib                 | C++ |**1**| インメモリファイルのfscanf

# プロファイリング
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [MicroProfile](https://github.com/jonasmr/microprofile)              | **public domain**    | C++ | 2-4 | CPU(とGPU?)プロファイラ、1-3ヘッダファイル、内部でminizを使用。
|  [prof](https://github.com/cyrus-and/prof)                            | MIT                  |C/C++|**1**| Linux用プロファイラ
|  [Remotery](https://github.com/Celtoys/Remotery)                      | Apache 2.0           |C/C++|  2  | CPU/GPUプロファイラ Win/Mac/Linux、ビューワはWebブラウザを使用。

# スクリプト
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [Duktape](http://duktape.org/)                                       | MIT                  |  C  |  2  | 埋め込み型JavaScriptエンジン
|  [MY-BASIC](https://github.com/paladin-t/my_basic/)                   | MIT                  |  C  |  2  | BASIC方言のスクリプト言語用インタプリタ
|  [LIL](http://runtimeterror.com/tech/lil/)                            | zlib                 |C/C++|  2  | Tcl ライクなスクリプト言語用インタプリタ
|  [lualite](https://github.com/user1095108/lualite)                    | MIT                  | C++ |**1**| C++でLuaバインディングを生成
|  [Picol](https://chiselapp.com/user/dbohdan/repository/picol/)        | BSD                  |C/C++|**1**| Tcl ライクなスクリプト言語用インタプリタ
|  [s7](https://ccrma.stanford.edu/software/snd/snd/s7.html)            | BSD                  |C/C++|  2  | Schemeのサブセット(R5RS/R7RS)用のインタプリタです。

# 文字列
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [dfa](http://bjoern.hoehrmann.de/utf-8/decoder/dfa/)                 | MIT                  |C/C++|  2  | 高速 UTF-8 デコーダ (ヘッダファイルが必要)
|**[DG_misc.h](https://github.com/DanielGibson/Snippets/)**             | **public domain**    |C/C++|**1**| Daniel Gibson の stb.h 風のクロスプラットフォームヘルパー: path/file、文字列
|**[gb_string.h](https://github.com/gingerBill/gb)**                    | **public domain**    |C/C++|**1**| 動的文字列
|  [Obfuscate](https://github.com/adamyaxley/Obfuscate)                 | **public domain**    | C++ |**1**| C++14用コンパイル保証型文字列リテラル難読化ライブラリ
|  [inja.hpp](https://github.com/pantor/inja)                           | MIT                  | C++ |**1**| テンプレートエンジン
|**[strpool.h](https://github.com/mattiasgustavsson/libs)**             | **public domain**    |C/C++|**1**| 文字列インターン
|  [str_view.hpp](https://github.com/sawickiap/str_view)                | MIT                  | C++ |**1**| null-termination-aware string-view class
|**[utf8](https://github.com/sheredom/utf8.h)**                         | **public domain**    |C/C++|**1**| UTF-8文字列ライブラリ

# ユニットテスト
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [catch](https://github.com/philsquared/Catch)                        | Boost                | C++ |**1**| ユニットテスト
|  [catch2](https://github.com/catchorg/Catch2/)                        | Boost                | C++ |**1**| ユニットテスト
|  [doctest](https://github.com/onqtam/doctest)                         | MIT                  | C++ |**1**| ユニットテスト
|  [fctx](https://github.com/imb/fctx)                                  | BSD                  |C/C++|**1**| ユニットテスト
|  [greatest](https://github.com/silentbicycle/greatest)                | iSC                  |  C  |**1**| ユニットテスト
|  [hippomocks](https://github.com/dascandy/hippomocks)                 | LGPL                 | C++ |**1**| ユニットテスト
|**[labrat](https://github.com/squarewave/labrat)**                     | **public domain**    |C/C++|**1**| ユニットテスト
|  [minctest](https://github.com/codeplea/minctest)                     | zlib                 |  C  |**1**| ユニットテスト
|  [munit](https://github.com/nemequ/munit)                             | MIT                  |  C  |**1**| ユニットテスト
|  [SPUT](http://www.lingua-systems.com/unit-testing/)                  | BSD                  |C/C++|**1**| ユニットテスト
|  [trompeloeil](https://github.com/rollbear/trompeloeil)               | Boost                | C++ |**1**| ユニットテスト
|  [utest](https://github.com/evolutional/utest)                        | MIT                  |C/C++|**1**| ユニットテスト
|**[utest.h](https://github.com/sheredom/utest.h)**                     | **public domain**    |C/C++|**1**| ユニットテスト

# ユーザーインターフェース
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [dear imgui](https://github.com/ocornut/imgui)                       | MIT                  | C++ |  9  | 以前は "ImGui" と呼ばれていた即時モードGUI。; [サードパーティ製C言語ラッパー](https://github.com/Extrawurst/cimgui)
|  [libcmdf](https://github.com/ronen25/libcmdf)                        | **public domain**    | C   |**1**| CLI アプリケーションを書くための小さなライブラリ
|  [linenoise](https://github.com/antirez/linenoise)                    | BSD                  |C/C++|  2  | ターミナルの読み出しと履歴など
|  [noc_file_dialog.h](https://github.com/guillaumechereau/noc)         | MIT                  |C/C++|  1  | ファイルを開く/保存するダイアログ（Win/Mac/Linux）
|  [nuklear](https://github.com/vurtun/nuklear)                         | **public domain**    |C/C++|**1**| 最小限のGUIツールキット
|  [tinyfiledialogs](https://sourceforge.net/projects/tinyfiledialogs/) | ZLIB                 |C/C++|  2  | モーダルダイアログ、ファイルオープン/セーブ (Win/Mac/Linux)
|  [wcwidth9](https://github.com/joshuarubin/wcwidth9)                  | Apache 2.0           | C   |  1  | プラットフォーム非依存の wcwidth で unicode 9 を完全サポート

# ベクトル
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [algebra3.h](http://www.animats.com/source/graphics/algebra3.h)      | **public domain**    | C++ |**1**| 2、3、4 要素ベクトル用ベクトルユーティリティ（すべてインライン化
|**[ccVector.h](https://github.com/jobtalle/ccVector)**                 | **public domain**    |C/C++|**1**| ベクトル、クォータニオン、行列の計算
|**[gb_math](https://github.com/gingerBill/gb/blob/master/gb_math.h)**  | **public domain**    |C/C++|**1**| ベクトル、四元数、行列の計算をmath.hなしで行う。
|**[Handmade Math](https://github.com/StrangeZak/Handmade-Math)**       | **public domain**    |C/C++|**1**| ベクトル数学
|  [linalg.h](https://github.com/sgorsten/linalg)                       | **public domain**    | C++ |**1**| ベクトル/マトリックス/クォータニオン数学
|  [linalg](https://github.com/ilyak/linalg)                            | ISC                  |C/C++|**1**| ベクトル/マトリックス/クォータニオン数学
|  [mm_vec.h](https://github.com/vurtun/mmx)                            | BSD                  |C/C++|**1**| SIMDベクトル演算

# ビデオ
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [jo_mpeg](http://www.jonolick.com/home/mpeg-video-writer)            | **public domain**    | C++ |**1**| MPEGファイルライター

# ビデオゲーム
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|**[app.h](https://github.com/mattiasgustavsson/libs)**                 | **public domain**    |C/C++|**1**| Windows専用だが、クロスプラットフォームのゲーム的なフレームワークであること。

# 雑多
| library                                                               | license              | API |files| description
| --------------------------------------------------------------------- |:--------------------:|:---:|:---:| -----------
|  [ASAP](https://github.com/mobius3/asap)                              | MIT                  | C++ |**1**| 日付の解析、印刷、反復処理、操作を行うためのライブラリです。
|  [cpp-generators](https://github.com/c-smile/cpp-generators)          | BSD                  | C++ |**1**| C++のジェネレータ
|  [Hedley](https://nemequ.github.io/hedley/)                           | **public domain**    |C/C++|**1**| コンパイラの移植性、最適化、静的解析など。
|  [levenshtein](https://github.com/wooorm/levenshtein.c)               | MIT                  |C/C++|  2  | 2つの文字列間の編集距離を計算する
|  [MakeID.h](http://www.humus.name/3D/MakeID.h)                        | **public domain**    | C++ |**1**| 小さな整数IDを効率的に割り当て/解放する。
|  [picobench](https://github.com/iboB/picobench)                       | MIT                  | C++ |**1**| マイクロベンチマーキング
|  [PlusCallback](https://github.com/codeplea/pluscallback)             | zlib                 | C++ |**1**| 関数/メソッドコールバック
|**[process.h](https://github.com/sheredom/process.h)**                 | **public domain**    |C/C++|**1**| プロセスコントロールAPI
|  [random](https://github.com/effolkronium/random)                     | MIT                  | C++ |**1**| 乱数のための便利なAPI
|  [sokol_time.h](https://github.com/floooh/sokol)                      | MIT                  |C/C++|**1**| クロスプラットフォームでの時間計測
|  [stmr](https://github.com/wooorm/stmr.c)                             | MIT                  |  C  |  2  | 英単語の語幹を抽出する
|  [tinyformat](https://github.com/c42f/tinyformat)                     | Boost                | C++ |**1**| タイプセーフprintf
|  [tinytime](https://github.com/RandyGaul/tinyheaders)                 | zlib                 |C/C++|**1**| クイック＆ダーティタイム経過時間
|  [visit_struct](https://github.com/cbeck88/visit_struct)              | Boost                | C++ |  2  | struct-field reflection


このようなXMLライブラリもありますが、私はXMLが著しく苦手なので、よく考えてもらうために一番下に記しました。

- パース: [tinyxml2](https://github.com/leethomason/tinyxml2): XML (zlib license)
- パース: [pugixml](http://pugixml.org/): XML (MIT license)
- パース: [yxml](https://dev.yorhel.nl/yxml): XML (MIT license)

## 新しいライブラリと訂正

新しいライブラリの投稿課題として、またはプルリクエストとして提出することができます。ヘッダーファイルとソースファイルは2ファイルですが、ヘッダーファイル、ソースファイル、LICENSE（ライセンスがソースファイルにない場合）は3ファイルとなり、2ファイルではないので受け入れられませんのでご注意ください。しかし、実際には「LICENSE」はライブラリだけにスコープされているわけではないので、いずれにせよソースツリーにライブラリをドロップするだけでは問題です。したがって、ライブラリ作者は、ライセンスをソースファイルに含め、別にLICENSEを要求しないことが推奨されています。

訂正：上記のライブラリの情報が間違っている場合、issue、pull request、またはe-mailで訂正をお送りください。なお、このリストでC/C++の両方から動作するとされているライブラリが、そうでない場合、これはリストの誤りか、ライブラリのバグである可能性があります。あるライブラリが32ビットまたは64ビットで動作しないことがわかった場合、そのライブラリのバグでない限り、そのライブラリはこのリストから削除されるべきです。

## *リストFAQ*

### このリストに直接リンクすることはできますか？

はい。 [このリンクが優先されます。](https://github.com/nothings/single_file_libs)

### 3つ以上のファイルから構成されるライブラリXXXは、なぜこのリストにないのですか？

私は任意に最大2ファイルまでと線引きしています。(2つのファイルに見えるライブラリの中には、別のLICENSEファイルを必要とするものがあり、それを除外していることに注意してください）。これらのライブラリの中には、プロジェクトにドロップしてビルドするのが簡単なものもありますから、それでも構わないかもしれません。しかし、stbに来る人は、シングルファイルのパブリックドメインライブラリを求めているので、私たちがここでやっていることから離れすぎているような気がするのです。

### なぜ、最大で2つのファイルからなり、他の依存関係が最小のライブラリXXXがこのリストにないのでしょうか？

おそらく私が知らないからだと思いますが、プルリクエスト、イシュー、メール、ツイートでお気軽にお寄せください（あなた自身のライブラリでも他の人のライブラリでもかまいません）。しかし、「他の依存関係が最小限」であることや「軽量」であることなど、他のさまざまな理由から、私はそれを含めないかもしれません。

### なぜSQLiteのamalgamated buildはこのリストにないのですか？

さあ？
