# Nuklear

![](https://cloud.githubusercontent.com/assets/8057201/11761525/ae06f0ca-a0c6-11e5-819d-5610b25f6ef4.gif)

## 内容

1. セクションについて
2. ハイライト編
3. 特集
4. 使用法編
    1. フラグセクション
    2. 定数セクション
    3. 依存関係セクション
5. 例題編
6. APIセクション
    1. コンテキストセクション
    2. 入力部
    3. 描画部
    4. ウィンドウ部
    5. レイアウト部
    6. グループセクション
    7. ツリーセクション
    8. プロパティセクション
7. ライセンスセクション
8. 変更履歴セクション
9. ギャラリーセクション
10. クレジットセクション

## Nuklearについて

これは、ANSI C で書かれ、パブリックドメインの下でライセンスされた、最小限の状態の即時モードのグラフィカルユーザーインターフェイスツールキットです。アプリケーションに組み込むためのシンプルなユーザインタフェースとして設計されており、依存関係やデフォルトのレンダーバックエンド、OSのウィンドウや入力処理を持たず、代わりにシンプルな入力状態を入力に、プリミティブな図形を記述した描画コマンドを出力に使用する、非常にモジュール的なライブラリアプローチを提供します。そのため、多くのプラットフォームやレンダーバックエンドを抽象化しようとするレイヤーライブラリを提供する代わりに、実際のUIにのみフォーカスしています。

## ハイライト

- グラフィカル・ユーザー・インターフェイス・ツールキット
- シングルヘッダーライブラリ
- C89 (別名 ANSI C または ISO C90) で書かれています。
- 小さなコードベース (~18kLOC)
- 移植性、効率性、単純性に重点を置く
- 依存性がない (必要なければ標準ライブラリでさえも)
- 完全なスキニングとカスタマイズが可能
- 低メモリフットプリントで、必要であればメモリを完全に制御可能
- UTF-8のサポート
- グローバルまたは非表示の状態なし
- カスタマイズ可能なライブラリモジュール（必要なものだけをコンパイルして使用することができます。）
- オプションのフォントベーカーと頂点バッファ出力

## 特徴

- プラットフォーム依存のコードを一切排除
- メモリ管理はfrom/toまで制御可能
    - 標準ライブラリから全てアロケートすることによる使い勝手の良さ
    - ライブラリ内のメモリを1バイト単位で制御
- フォント処理の制御（～/～まで
    - 独自のフォント実装を使用可能
    - 本ライブラリ内部のフォントベイクおよび処理APIの利用
- 描画出力の制御（～/～）が可能
    - 描画機能を持つ高レベルのAPIのためのシンプルな形状
    - ハードウェアからアクセス可能なアンチエイリアス頂点バッファ出力
- カスタマイズ可能な色とプロパティ（～/～まで
    - シンプルなカラーテーブルを埋めることによる簡単な色の変更
    - ウィジェットを装飾するためのスキニング機能による完全な制御
- 曲げられるUIライブラリ、ウィジェットの種類は以下の通りです。
    - ボタン、チェックボックス、スライダーなどの基本的なウィジェット
    - 抽象的なコンボボックス、コンテクストメニューなどの高度なウィジェット
- 必要なものだけをコンパイルするためのコンパイル時設定
    - 標準ライブラリをリンクまたは使用したくない場合に使用できるサブセット
- フレーム更新の代わりにユーザ入力のみで更新するように簡単に変更可能


## 使用方法

このライブラリは、1つのヘッダーファイルに含まれており、ヘッダーのみ、または実装モードのいずれかで使用することができます。ヘッダーのみモードは、デフォルトで使用され、他のヘッダーにこのヘッダーを含めることができ、実際の実装は含まれていません。

実装モードでは、プリプロセッサマクロ NK_IMPLEMENTATION を .c/.cpp ファイルに *定義してから #このファイルをインクルードする必要があります、例．

```c
#define NK_IMPLEMENTATION
#include "nuklear.h"
```

また、追加機能を使用したい場合や、ライブラリの制御を強化したい場合には、ヘッダーモードおよび実装モードで、以下の「OPTIONAL DEFINES」のセクションに記載されているシンボルをオプションで定義してください。

警告: nuklear が含まれるたびに、同じコンパイラ・フラグを定義してください。これは非常に重要です。そうしないと、コンパイラーエラーや、さらに悪いことにスタック破壊を引き起こす可能性があります。


### フラグ

Flag                            | Description
--------------------------------|------------------------------------------
NK_PRIVATE                      | 定義されている場合、すべての関数は static と宣言され、実装を含むファイル内でのみアクセスすることができます。
NK_INCLUDE_FIXED_TYPES          | 定義されていれば、固定サイズの型のためのヘッダー `<stdint.h>` をインクルードします。これが失敗するとコンパイラエラーが発生し、自分で正しい型を選択する必要があります。
NK_INCLUDE_DEFAULT_ALLOCATOR    | 定義された場合、ヘッダ `<stdlib.h>` をインクルードし、メモリ割り当て制御を気にせずにこのライブラリを使用するための追加機能を提供し、メモリ管理を容易にします。
NK_INCLUDE_STANDARD_IO          | 定義されていれば、ヘッダ `<stdio.h>` をインクルードし、ファイルの読み込みに応じた追加機能を提供する。
NK_INCLUDE_STANDARD_VARARGS     | 定義された場合、ヘッダー `<stdio.h>` をインクルードし、ファイルの読み込みに応じて追加の機能を提供します。
NK_INCLUDE_VERTEX_BUFFER_OUTPUT | これを定義すると、このライブラリに頂点描画コマンドリストバックエンドが追加され、キューコマンドを頂点描画コマンドに変換することができるようになります。これは主に、OpenGL、DirectX、Vulkan、Metal、...でハードウェアからアクセス可能な形式が必要な場合に使用します。
NK_INCLUDE_FONT_BAKING          | これを定義すると、このライブラリに `stb_truetype` と `stb_rect_pack` の実装が追加され、フォントベイクとレンダリングを行うことができるようになる。すでにフォントハンドリングを行っている場合や、このフォントハンドリングを使用したくない場合は、定義する必要はない。
NK_INCLUDE_DEFAULT_FONT         | これを定義すると、デフォルトのフォントが追加されます。ProggyClean.ttf をこのライブラリに追加します。これはフォントアトラスに読み込むことができ、truetype フォントを持たずにこのライブラリを使用できるようになります。
NK_INCLUDE_COMMAND_USERDATA     | これを定義すると、各コマンドにuserdataポインタが追加されます。例えば、使用するウィジェットに応じたカスタムシェーダを提供したい場合に便利です。スタイル構造体と組み合わせることができます。
NK_BUTTON_TRIGGER_ON_RELEASE    | プラットフォームによって、ボタンのクリックは、ボタンが押されたとき（上→下）か、離されたとき（下→上）に発生する必要があります。デフォルトでは、このライブラリはボタンが押されたときに反応しますが、これを定義すると、ボタンが離されたときのみトリガーされるようになります。
NK_ZERO_COMMAND_MEMORY          | これを定義すると、(nk_command_buffer_push 内で) 描画キューに追加される各描画コマンドのメモリがゼロになります。コマンドメモリをゼロにすることは、コマンドバッファが等しいかどうかを (memcmp を使って) 高速にチェックし、前のフレームから画面上に何も変化がないときにフレームを描画するのを避けるために非常に便利です。
NK_UINT_DRAW_INDEX              | これを定義すると、NK_VERTEX_BUFFER_OUTPUT使用時の頂点インデックス要素のサイズがデフォルトの16bitではなく、32bitに設定されます。
NK_KEYSTATE_BASED_INPUT         | バックエンドがキーの押下/離脱イベントではなく、各フレームのキーステートを使用する場合に定義します。

警告：以下のフラグは、標準Cライブラリを引き込みます。

- NK_INCLUDE_DEFAULT_ALLOCATOR
- NK_INCLUDE_STANDARD_IO
- NK_INCLUDE_STANDARD_VARARGS

警告: 以下のフラグが定義されている場合、ヘッダーと実装の両方で定義する必要があります。

- NK_INCLUDE_FIXED_TYPES
- NK_INCLUDE_DEFAULT_ALLOCATOR
- NK_INCLUDE_STANDARD_VARARGS
- NK_INCLUDE_VERTEX_BUFFER_OUTPUT
- NK_INCLUDE_FONT_BAKING
- NK_INCLUDE_DEFAULT_FONT
- NK_INCLUDE_STANDARD_VARARGS
- NK_INCLUDE_COMMAND_USERDATA
- NK_UINT_DRAW_INDEX

### Constants

Define                          | Description
--------------------------------|---------------------------------------
NK_BUFFER_DEFAULT_INITIAL_SIZE  | NK_INCLUDE_DEFAULT_ALLOCATOR を定義することによって含まれるデフォルトのアロケータ関数を使用している間、すべてのバッファで割り当てられる初期バッファサイズ。もし、デフォルトの4kメモリを割り当てたくない場合は、再定義してください。
NK_MAX_NUMBER_BUFFER            | floatとstring間の変換バッファの最大バッファサイズ 通常の環境下では、十分すぎるほどであるべきである。
NK_INPUT_MAX                    | 1フレームにテキスト入力として追加できる最大バイト数を定義します。通常の場合、これは十分すぎるほどである。

警告: 以下の定数が定義されている場合、ヘッダーと実装の両方で定義する必要があります。

- NK_MAX_NUMBER_BUFFER
- NK_BUFFER_DEFAULT_INITIAL_SIZE
- NK_INPUT_MAX

### 依存関係

Function    | Description
------------|---------------------------------------------------------------
NK_ASSERT   | これを定義しないと、nuklear は assert() で <assert.h> を使用する。
NK_MEMSET   | これは 'memset' またはあなた自身の memset 実装の代替に定義することができます。そうしないと、nuklear は独自のバージョンを使用します。
NK_MEMCPY   | これは 'memcpy' またはあなた自身の memcpy 実装の代替に定義できます。そうしないと、nuklear は独自のバージョンを使用します。
NK_SQRT     | これを 'sqrt' に定義するか、あるいは独自の sqrt 実装に置き換えることができます。そうしないと、nuklear は独自の遅くて精度の低いバージョンを使用する。
NK_SIN      | これは 'sinf' またはあなた自身のサイン実装の置き換えに定義することができます。そうしないと、nuklear は独自の近似実装を使用する。
NK_COS      | cosf' または独自のコサイン実装の置き換えを定義することができます。そうしないと、nuklear は独自の近似実装を使用します。
NK_STRTOD   | これは `strtod` またはあなた自身の文字列をダブル変換する実装の置き換えとして定義することができる。定義されていない場合、nuklear はそれ自身の不正確で、おそらく安全でないバージョンを使用します (nan や infinity は扱えません!)。
NK_DTOA     | これは `dtoa` か、あるいはあなた自身の double から string への変換実装を置き換えるために定義することができます。定義されていない場合、nuklear はそれ自身の不正確で、おそらく安全でないバージョンを使用します (nan や無限大を処理しません!)。
NK_VSNPRINTF| `NK_INCLUDE_STANDARD_VARARGS` と `NK_INCLUDE_STANDARD_IO` を定義し、安全性を確保したい場合、C や C++ の遅いバージョンをサポートするコンパイラでは、これを `vsnprintf` に定義してください。デフォルトでは C の stdlib のバージョンと C++ のコンパイラのバージョンをチェックします。もし、`vsnprintf`があれば、直接`vsnprintf`に定義します。もし、定義されておらず、古いバージョンのCやC++を使用している場合は、安全でない`vsprintf`に定義されます。

警告：以下の依存関係は、再定義しない場合、標準Cライブラリに引き込まれます。

- NK_ASSERT

警告: 以下の依存関係が定義されている場合は、ヘッダーと実装の両方で定義する必要があります。

- NK_ASSERT

警告：以下の依存関係が定義されている場合は、実装部に対してのみ定義する必要があります。

- NK_MEMSET
- NK_MEMCPY
- NK_SQRT
- NK_SIN
- NK_COS
- NK_STRTOD
- NK_DTOA
- NK_VSNPRINTF

## Example

```c
// init gui state
enum {EASY, HARD};
static int op = EASY;
static float value = 0.6f;
static int i =  20;
struct nk_context ctx;
nk_init_fixed(&ctx, calloc(1, MAX_MEMORY), MAX_MEMORY, &font);
if (nk_begin(&ctx, "Show", nk_rect(50, 50, 220, 220),
    NK_WINDOW_BORDER|NK_WINDOW_MOVABLE|NK_WINDOW_CLOSABLE)) {
    // fixed widget pixel width
    nk_layout_row_static(&ctx, 30, 80, 1);
    if (nk_button_label(&ctx, "button")) {
        // event handling
    }
    // fixed widget window ratio width
    nk_layout_row_dynamic(&ctx, 30, 2);
    if (nk_option_label(&ctx, "easy", op == EASY)) op = EASY;
    if (nk_option_label(&ctx, "hard", op == HARD)) op = HARD;
    // custom widget pixel width
    nk_layout_row_begin(&ctx, NK_STATIC, 30, 2);
    {
        nk_layout_row_push(&ctx, 50);
        nk_label(&ctx, "Volume:", NK_TEXT_LEFT);
        nk_layout_row_push(&ctx, 110);
        nk_slider_float(&ctx, 0, &value, 1.0f, 0.1f);
    }
    nk_layout_row_end(&ctx);
}
nk_end(&ctx);
```

![](https://cloud.githubusercontent.com/assets/8057201/10187981/584ecd68-675c-11e5-897c-822ef534a876.png)


## API


### コンテキスト

コンテキストは nuklear の主要なエントリポイントであり、必要なすべての状態を含んでいる。これらはウィンドウ、メモリ、入力、スタイル、スタック、コマンド、時間管理に使用され、すべての nuklear GUI 固有の関数に渡される必要がある。


#### 使用方法

コンテキストを使用するには、まず最初に `nk_init_default`, `nk_init_fixed`, `nk_init`, `nk_init_custom` のいずれかを呼び出して初期化する必要があります。それぞれ、フォントハンドルと特定のメモリ処理方法を受け取ります。メモリ制御は、標準ライブラリから、nuklear が自分自身で管理しなければならない固定サイズのメモリブロックを指定するものまであります。

```c
struct nk_context ctx;
nk_init_xxx(&ctx, ...);
while (1) {
    // [...]
    nk_clear(&ctx);
}
nk_free(&ctx);
```


#### リファレンス

|       Function       |                                                       Description                                                       |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| __nk_init_default__  | 標準ライブラリのメモリ割り当て（malloc,free）でコンテキストを初期化する。                                               |
| __nk_init_fixed__    | 固定サイズのメモリブロック1つからコンテキストを初期化                                                                   |
| __nk_init__          | alloc と free のためのメモリアロケータコールバックでコンテキストを初期化する。                                          |
| __nk_init_custom__   | 2つのバッファからコンテキストを初期化する。一つは描画コマンド用、もう一つはウィンドウ/パネル/テーブルの割り当て用です。 |
| __nk_clear__         | フレームの終了時に呼び出され、コンテキストをリセットして次のフレームに備える                                            |
| __nk_free__          | コンテキスト内に割り当てられたすべてのメモリをシャットダウンし、解放します。                                            |
| __nk_set_user_data__ | 描画コマンドにユーザデータを渡すユーティリティ関数                                                                      |


#### nk_init_default

デフォルトの標準ライブラリアロケータで `nk_context` 構造体を初期化する。nuklear でメモリ管理に煩わされたくない場合に使用する。

```c
int nk_init_default(struct nk_context *ctx, const struct nk_user_font *font);
```

Parameter   | Description
------------|---------------------------------------------------------------
__ctx__     | スタックまたはヒープに確保された `nk_context` 構造体を指す必要がある。
__font__    | 以前に初期化されたフォントハンドルを指す必要があります。

失敗したら `false(0)` を、成功したら `true(1)` を返します。


#### nk_init_fixed

固定サイズのメモリブロックから `nk_context` 構造体を初期化する。 nuklear のメモリ管理を完全に制御したい場合に使用する必要がある。特に、メモリが少ないシステムや、仮想メモリを使用するシステムで使用することを推奨します。後者の場合、例えば 16MB の仮想メモリを確保するだけで、必要な量のメモリのみが実際にコミットされる。

```c
int nk_init_fixed(struct nk_context *ctx, void *memory, nk_size size, const struct nk_user_font *font);
```

警告: `nk_draw_commands` に渡されたメモリブロックが正しくアラインメントされていることを確認してください。

Parameter   | Description
------------|--------------------------------------------------------------
__ctx__     | スタックまたはヒープに確保された `nk_context` 構造体を指す必要がある。
__memory__  | 以前に割り当てられたメモリブロックを指す必要がある
__size__    | メモリ__の総サイズを含む必要があります。
__font__    | 以前に初期化されたフォントハンドルを指す必要があります。

失敗したら `false(0)` を、成功したら `true(1)` を返します。


#### nk_init

nuklear がメモリを確保するためのコールバックを持つ `nk_context` 構造体を初期化する。内部的には `nk_init_default` で使用され、nuklear にキッチンシンク的なメモリ割り当てインタフェースを提供する。メモリの消費を監視するような場合に便利である。

```c
int nk_init(struct nk_context *ctx, struct nk_allocator *alloc, const struct nk_user_font *font);
```

Parameter   | Description
------------|---------------------------------------------------------------
__ctx__     | スタックまたはヒープに確保された `nk_context` 構造体を指す必要がある。
__alloc__   | 以前に割り当てられたメモリアロケータを指す必要がある
__font__    | 以前に初期化されたフォントハンドルを指す必要があります。

失敗したら `false(0)` を、成功したら `true(1)` を返します。


#### nk_init_custom

2 つの異なる固定またはグロウンバッファから `nk_context` 構造体を初期化します。最初のバッファは描画コマンドを割り当てるためのもので、2番目のバッファはウィンドウ、パネル、ステートテーブルを割り当てるために使用されます。

```c
int nk_init_custom(struct nk_context *ctx, struct nk_buffer *cmds, struct nk_buffer *pool, const struct nk_user_font *font);
```

| Parameter |                                                    Description                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------ |
| __ctx__   | スタックまたはヒープに確保された `nk_context` 構造体を指す必要がある。                                             |
| __cmds__  | 描画コマンドを格納するために、事前に初期化されたメモリバッファ（固定または動的）を指す必要があります。             |
| __pool__  | ウィンドウ、パネル、テーブルを格納するために、事前に初期化された固定または動的メモリバッファを指す必要があります。 |
| __font__  | 以前に初期化されたフォントハンドルを指す必要があります。                                                           |

失敗したら `false(0)` を、成功したら `true(1)` を返します。

#### nk_clear

フレームの終了時にコンテキストの状態をリセットします。これには、ウィンドウの削除や、呼び出されていないテーブルの削除など、ガベージコレクタのタスクが主に含まれます。

```c
void nk_clear(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。

#### nk_free

nuklear によって割り当てられた全てのメモリを解放します。コンテキストが `nk_init_fixed` で初期化されている場合は不要です。

```c
void nk_free(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。

#### nk_set_user_data

各描画コマンドに引き渡される、現在渡されたユーザーデータを設定します。

```c
void nk_set_user_data(struct nk_context *ctx, nk_handle data);
```

Parameter   | Description
------------|--------------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。
__data__    | 各描画コマンドに渡されるポインタまたはインデックスを持つハンドル。

### 入力

入力 API は、マウス、キー、テキスト入力の各状態からなる現在の入力状態を保持する役割を担う。注目すべきは、nuklear では OS やウィンドウを直接扱わないことである。代わりに、すべての入力状態はプラットフォーム固有のコードによって提供されなければならない。これは一方ではユーザの作業を増やし、使い方を複雑にするが、他方では多くのプラットフォームやライブラリ、その他既に提供されている機能に対する簡単な抽象化を提供する。

```c
nk_input_begin(&ctx);
while (GetEvent(&evt)) {
    if (evt.type == MOUSE_MOVE)
        nk_input_motion(&ctx, evt.motion.x, evt.motion.y);
    else if (evt.type == [...]) {
        // [...]
    }
} nk_input_end(&ctx);
```

#### 使用方法

入力状態は、最初に `nk_input_begin` を呼んで nuklear に提供する必要があります。これはマウスの位置の差分やボタンの遷移などの内部状態をリセットします。`nk_input_begin` の後に、現在のすべての入力状態を提供する必要があります。これには、マウスの動き、ボタンやキーの押下と解放、テキスト入力やスクロールが含まれます。この API では `イベントベース` と `ステートベース` のどちらの入力処理もサポートされており、問題なく動作するはずです。最後に、すべての入力状態がミラーリングされた後に `nk_input_end` を呼び出して入力処理を終了させる必要があります。

```c
struct nk_context ctx;
nk_init_xxx(&ctx, ...);
while (1) {
    Event evt;
    nk_input_begin(&ctx);
    while (GetEvent(&evt)) {
        if (evt.type == MOUSE_MOVE)
            nk_input_motion(&ctx, evt.motion.x, evt.motion.y);
        else if (evt.type == [...]) {
            // [...]
        }
    }
    nk_input_end(&ctx);
    // [...]
    nk_clear(&ctx);
} nk_free(&ctx);

```

#### Reference

Function            | Description
--------------------|-------------------------------------------------------
__nk_input_begin__  | 入力のミラーリング処理を開始する。他のすべての `nk_input_xxx` の呼び出しの前に呼び出される必要があります。
__nk_input_motion__ | マウスカーソル位置のミラーリング
__nk_input_key__    | キーが押されているか離されているかの状態をミラーリング
__nk_input_button__ | マウスボタンが押されているか離されているかの状態をミラーリングします。
__nk_input_scroll__ | マウスのスクロール値をミラーリング
__nk_input_char__   | 内部テキストバッファにASCIIテキストを1文字追加します。
__nk_input_glyph__  | 内部テキストバッファにマルチバイトのUTF-8文字を1文字追加する。
__nk_input_unicode__| 単一のUnicodeルーンを内部テキストバッファに追加します。
__nk_input_end__    | 状態の変化を計算して、入力ミラーリング処理を終了する。この呼び出しの後は、上記で参照した `nk_input_xxx` 関数を一切呼び出さないでください。

#### nk_input_begin

テキスト、スクロールマウス、前のマウスの位置と動き、キーの状態遷移をリセットして、入力のミラーリング処理を開始します。

```c
void nk_input_begin(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。

#### nk_input_motion

マウスの現在位置をnuklearにミラーリングする

```c
void nk_input_motion(struct nk_context *ctx, int x, int y);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。
__x__       | 現在のマウスカーソルの x 位置を表す整数を保持する必要があります。
__y__       | 現在のマウスカーソルの Y 位置を表す整数を保持する必要があります。


#### nk_input_key

特定のキーの状態をnuklearにミラーリングします。

```c
void nk_input_key(struct nk_context*, enum nk_keys key, int down);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。
__key__     | enum `nk_keys` で指定された、ミラーリングが必要な任意の値でなければならない。
__down__    | キーがアップしている場合は0、ダウンしている場合は1でなければなりません。


#### nk_input_button

特定のマウスボタンの状態をnuklearにミラーリングする

```c
void nk_input_button(struct nk_context *ctx, enum nk_buttons btn, int x, int y, int down);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。
__btn__     | enum `nk_buttons` で指定された、ミラーリングが必要な任意の値でなければならない。
__x__       | 上下にクリックしたときのマウスカーソルの x 位置を表す整数が含まれている必要がある
__y__       | 上下にクリックしたときのマウスカーソルの y 位置を表す整数を含む必要がある。
__down__    | キーがアップしている場合は0、ダウンしている場合は1でなければなりません。


#### nk_input_scroll

最後のマウススクロール値をnuklearにコピーする。一般的にスクロールの値です。だから、マウスから来る必要はありませんし、起源になる可能性もあります TODO この文章を終える

```c
void nk_input_scroll(struct nk_context *ctx, struct nk_vec2 val);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。
__val__     | ベクターで、XとYの両方のスクロール値を持つ。


#### nk_input_char

ASCII 文字 1 文字を内部テキストバッファにコピーする これは基本的に、ASCII 文字を素早く nuklear に押し込むためのヘルパー関数である。

Note: `nk_input_begin` と `nk_input_end` の間に最大で NK_INPUT_MAX バイトを格納する。

```c
void nk_input_char(struct nk_context *ctx, char c);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。
__c__       | ASCII文字（印刷可能な文字）であることが望ましい。


#### nk_input_glyph

エンコードされたUnicodeのルーンをUTF-8に変換し、結果を内部のテキストバッファにコピーする。

注意: `nk_input_begin` と `nk_input_end` の間に最大で NK_INPUT_MAX バイトを格納する。

```c
void nk_input_glyph(struct nk_context *ctx, const nk_glyph g);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。
__g__       | UTF-32ユニコードコードポイント


#### nk_input_unicode

unicodeのルーンをUTF-8に変換し、結果を内部のテキストバッファにコピーします。

Note: `nk_input_begin` と `nk_input_end` の間に最大で NK_INPUT_MAX バイトを格納する。

```c
void nk_input_unicode(struct nk_context*, nk_rune rune);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。
__rune__    | UTF-32ユニコードコードポイント


#### nk_input_end

マウスカーソルが無制限に掴まれないように、マウスグラビング状態をリセットして入力ミラーリング処理を終了します。

```c
void nk_input_end(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | あらかじめ初期化された `nk_context` 構造体を指す必要がある。


### 描画

このライブラリは、レンダーバックエンドに依存しないように設計されており、画面には直接何も描画しません。その代わり、描画されたすべての図形、ウィジェットは、メモリにバッファリングされ、コマンドキューを構成しています。したがって、各フレームは、ユーザーと彼自身のレンダーバックエンドによって実行される必要がある描画コマンドでコマンドバッファを満たします。その後、コマンドバッファはクリアされる必要があり、新しいフレームを開始することができます。コマンドバッファは主要な描画 API であり、オプションの頂点バッファ API はこの形式を受け取り、ハードウェアがアクセスできる形式に変換するだけであることに注意することが重要でしょう。


#### 使用方法

フレームに蓄積されたすべての描画コマンドを描画するには、多くの2Dプリミティブを描画できる独自のレンダーバックエンドが必要です。これには、少なくとも塗りつぶしや描画のある矩形、円、テキスト、線、三角形、はさみなどが含まれます。この基準が満たされると、各描画コマンドを反復処理し、インタプリタのような方法で各描画コマンドを実行できるようになります。

```c
const struct nk_command *cmd = 0;
nk_foreach(cmd, &ctx) {
    switch (cmd->type) {
    case NK_COMMAND_LINE:
        your_draw_line_function(...)
        break;
    case NK_COMMAND_RECT
        your_draw_rect_function(...)
        break;
    case //...:
        //[...]
    }
}
```

プログラムフローのコンテキストでは、描画コマンドは入力が収集され、ウィンドウとそれに含まれるウィジェットを含む完全な UI が実行された後、以前に割り当てられたすべての描画コマンドを解放する `nk_clear` を呼び出す前に実行される必要があります。

```c
struct nk_context ctx;
nk_init_xxx(&ctx, ...);
while (1) {
    Event evt;
    nk_input_begin(&ctx);
    while (GetEvent(&evt)) {
        if (evt.type == MOUSE_MOVE)
            nk_input_motion(&ctx, evt.motion.x, evt.motion.y);
        else if (evt.type == [...]) {
            [...]
        }
    }
    nk_input_end(&ctx);
    //
    // [...]
    //
    const struct nk_command *cmd = 0;
    nk_foreach(cmd, &ctx) {
    switch (cmd->type) {
    case NK_COMMAND_LINE:
        your_draw_line_function(...)
        break;
    case NK_COMMAND_RECT
        your_draw_rect_function(...)
        break;
    case ...:
        // [...]
    }
    nk_clear(&ctx);
}
nk_free(&ctx);
```

フレームごとにすべてのUIを描画する必要があり、非常に無駄が多いことにお気づきでしょう。実際のUI更新ループは非常に高速ですが、実際にUIを必要としないレンダリングは高速ではありません。そこで、できることは複数あります。まず、入力があったときだけ更新する方法です。もちろん、これはアプリケーションがUIにのみ依存し、外部からの計算を必要としない場合にのみ有効なオプションです。実際に入力時にのみ更新する場合は、各フレームで2回UIを更新し、最初のパスの後に直接 `nk_clear` を呼び出し、2回目のパスでは描画のみを行うようにしてください。さらに、UIが1秒間に一定のフレーム数以上描画されないように、追加のタイマーを追加することをお勧めします。

```c
struct nk_context ctx;
nk_init_xxx(&ctx, ...);
while (1) {
    // [...wait for input ]
    // [...do two UI passes ...]
    do_ui(...)
    nk_clear(&ctx);
    do_ui(...)
    //
    // draw
    const struct nk_command *cmd = 0;
    nk_foreach(cmd, &ctx) {
    switch (cmd->type) {
    case NK_COMMAND_LINE:
        your_draw_line_function(...)
        break;
    case NK_COMMAND_RECT
        your_draw_rect_function(...)
        break;
    case ...:
        //[...]
    }
    nk_clear(&ctx);
}
nk_free(&ctx);
```

2 番目の、おそらくより応用的なトリックは、何か変化があったときだけ描画することです。これは連続的な描画ループを持つアプリケーションではあまり役に立ちませんが、デスクトップアプリケーションではかなり役に立ちます。実際に nuklear に変更時のみ描画させるためには、まず `NK_ZERO_COMMAND_MEMORY` を定義し、各独自の描画出力を格納するメモリバッファを割り当てる必要があります。各フレームの後、ライブラリ内の描画コマンドメモリと割り当てられたバッファを memcmp で比較します。memcmp が違いを検出した場合、コマンドバッファを割り当てられたバッファにコピーし、通常のように描画する必要があります (この例では固定メモリを使用していますが、動的に割り当てられたメモリを使用することも可能です)。

```c
//[... other defines ...]
#define NK_ZERO_COMMAND_MEMORY
#include "nuklear.h"
//
// setup context
struct nk_context ctx;
void *last = calloc(1,64*1024);
void *buf = calloc(1,64*1024);
nk_init_fixed(&ctx, buf, 64*1024);
//
// loop
while (1) {
    // [...input...]
    // [...ui...]
    void *cmds = nk_buffer_memory(&ctx.memory);
    if (memcmp(cmds, last, ctx.memory.allocated)) {
        memcpy(last,cmds,ctx.memory.allocated);
        const struct nk_command *cmd = 0;
        nk_foreach(cmd, &ctx) {
            switch (cmd->type) {
            case NK_COMMAND_LINE:
                your_draw_line_function(...)
                break;
            case NK_COMMAND_RECT
                your_draw_rect_function(...)
                break;
            case ...:
                // [...]
            }
        }
    }
    nk_clear(&ctx);
}
nk_free(&ctx);
```

最後に、X11 や Win32 のような抽象度の高いプラットフォームや描画ライブラリでは、描画コマンドを使用することは理にかなっていますが、グラフィックスハードウェアを直接使用することが望ましい場合も多くあります。そのため、オプションの頂点出力を含む `NK_INCLUDE_VERTEX_BUFFER_OUTPUT` を定義することが可能になっています。頂点出力にアクセスするには、まず `nk_convert` を呼び出して、すべての描画コマンドを頂点に変換する必要があります。すべての描画コマンドの変換に成功したら、すべての頂点の描画コマンドを繰り返し実行します。

```c
// fill configuration
struct your_vertex
{
    float pos[2]; // important to keep it to 2 floats
    float uv[2];
    unsigned char col[4];
};
struct nk_convert_config cfg = {};
static const struct nk_draw_vertex_layout_element vertex_layout[] = {
    {NK_VERTEX_POSITION, NK_FORMAT_FLOAT, NK_OFFSETOF(struct your_vertex, pos)},
    {NK_VERTEX_TEXCOORD, NK_FORMAT_FLOAT, NK_OFFSETOF(struct your_vertex, uv)},
    {NK_VERTEX_COLOR, NK_FORMAT_R8G8B8A8, NK_OFFSETOF(struct your_vertex, col)},
    {NK_VERTEX_LAYOUT_END}
};
cfg.shape_AA = NK_ANTI_ALIASING_ON;
cfg.line_AA = NK_ANTI_ALIASING_ON;
cfg.vertex_layout = vertex_layout;
cfg.vertex_size = sizeof(struct your_vertex);
cfg.vertex_alignment = NK_ALIGNOF(struct your_vertex);
cfg.circle_segment_count = 22;
cfg.curve_segment_count = 22;
cfg.arc_segment_count = 22;
cfg.global_alpha = 1.0f;
cfg.tex_null = dev->tex_null;
//
// setup buffers and convert
struct nk_buffer cmds, verts, idx;
nk_buffer_init_default(&cmds);
nk_buffer_init_default(&verts);
nk_buffer_init_default(&idx);
nk_convert(&ctx, &cmds, &verts, &idx, &cfg);
//
// draw
nk_draw_foreach(cmd, &ctx, &cmds) {
if (!cmd->elem_count) continue;
    //[...]
}
nk_buffer_free(&cms);
nk_buffer_free(&verts);
nk_buffer_free(&idx);
```


#### リファレンス

Function            | Description
--------------------|-------------------------------------------------------
__nk__begin__       | コンテクスト描画コマンドリストのうち、最初に描画される描画コマンドを返します。
__nk__next__        | 描画コマンドのイテレータを、コンテキストの描画コマンドリストの次のコマンドまでインクリメントします。
__nk_foreach__      | コンテキストの描画コマンドリスト内の各描画コマンドを反復処理します。
__nk_convert__      | 抽象的な描画コマンドリストから、ハードウェアからアクセス可能な頂点フォーマットに変換する。
__nk_draw_begin__   | コンテキスト頂点描画リストで最初に実行される頂点コマンドを返します。
__nk__draw_next__   | 頂点コマンドのイテレータを、コンテキスト頂点コマンドリスト内の次のコマンドまでインクリメントします。
__nk__draw_end__    | 頂点描画リストの終端を返します。
__nk_draw_foreach__ | 頂点描画リスト内の各頂点描画コマンドを反復処理する。


#### nk__begin

1フレームに蓄積されたすべての描画コマンドを反復する描画コマンドリストイテレータを返します。

```c
const struct nk_command* nk__begin(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | フレームが終了した時点で、以前に初期化された `nk_context` 構造体を指す必要があります。

描画コマンドリスト内の最初のコマンドを指す描画コマンドポインタを返します。


#### nk__next

描画コマンドリスト内の次のコマンドを指す描画コマンドポインタを返します。

```c
const struct nk_command* nk__next(struct nk_context*, const struct nk_command*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | フレームの最後には、以前に初期化された `nk_context` 構造体を指す必要があります。
__cmd__     | nk__begin` または `nk__next` によって返される以前の描画コマンドを指す必要があります。

描画コマンドリスト内の次のコマンドを指す描画コマンドポインタを返します。


#### nk_foreach

コンテキストの描画コマンドリスト内の各描画コマンドを反復処理します。

```c
#define nk_foreach(c, ctx)
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | フレームの最後には、以前に初期化された `nk_context` 構造体を指す必要があります。
__cmd__     | コマンドポインタをNULLに初期化

コンテキストの描画コマンドリスト内の各描画コマンドを反復処理します。

#### nk_convert

すべての内部描画コマンドを頂点描画コマンドに変換し、3つのバッファを頂点、頂点描画コマンド、頂点インデックスで埋めます。頂点のフォーマットやその他の設定値は `nk_convert_config` 構造体を埋めて設定する必要があります。

```c
nk_flags nk_convert(struct nk_context *ctx, struct nk_buffer *cmds,
    struct nk_buffer *vertices, struct nk_buffer *elements, const struct nk_convert_config*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | フレームの最後には、以前に初期化された `nk_context` 構造体を指す必要があります。
__cmds__    | 変換された頂点描画コマンドを保持するために、事前に初期化されたバッファを指す必要があります。
__vertices__| 生成されたすべての頂点を保持するために，あらかじめ初期化されたバッファを指す必要があります。
__elements__| 生成されたすべての頂点インデックスを保持するために、事前に初期化されたバッファを指す必要があります。
__config__  | 変換処理を設定するために、入力された `nk_config` 構造体を指す必要がある。

enum nk_convert_result のエラーコードのいずれかを返します。

Parameter                       | Description
--------------------------------|-----------------------------------------------------------
NK_CONVERT_SUCCESS              | 描画コマンドから頂点バッファへの変換が正常に行われたことを示す。
NK_CONVERT_INVALID_PARAM        | 関数呼び出しの際に無効な引数が渡された
NK_CONVERT_COMMAND_BUFFER_FULL  | 描画コマンドを格納するための提供されたバッファが満杯であるか、より多くのメモリを割り当てることに失敗しました。
NK_CONVERT_VERTEX_BUFFER_FULL   | 頂点を格納するために提供されたバッファが満杯であるか、より多くのメモリを割り当てることに失敗した
NK_CONVERT_ELEMENT_BUFFER_FULL  | インデックスを格納するための提供されたバッファが満杯であるか、より多くのメモリを割り当てることに失敗しました。


#### nk__draw_begin

頂点描画コマンドバッファを反復処理するためのイテレータを返します。

```c
const struct nk_draw_command* nk__draw_begin(const struct nk_context*, const struct nk_buffer*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | フレームの最後には、以前に初期化された `nk_context` 構造体を指す必要があります。
__buf__     | 以前に `nk_convert` によって埋め尽くされた頂点描画コマンドバッファを指す必要があります。

頂点描画コマンドバッファ内の最初のコマンドを指す頂点描画コマンドポインタを返します。


#### nk__draw_end

頂点描画コマンドバッファの終端にある頂点描画コマンドを返します。

```c
const struct nk_draw_command* nk__draw_end(const struct nk_context *ctx, const struct nk_buffer *buf);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | フレームの最後には、以前に初期化された `nk_context` 構造体を指す必要があります。
__buf__     | 以前に `nk_convert` によって埋め尽くされた頂点描画コマンドバッファを指す必要があります。

頂点描画コマンドバッファ内の最後の頂点描画コマンドの終端を指す頂点描画コマンドポインタを返します。


#### nk__draw_next

頂点描画コマンドバッファイテレータをインクリメントします。

```c
const struct nk_draw_command* nk__draw_next(const struct nk_draw_command*, const struct nk_buffer*, const struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__cmd__     | 以前に `nk__draw_begin` または `nk__draw_next` によって返された頂点描画コマンドを指している必要があります。
__buf__     | 以前に `nk_convert` によって埋め尽くされた頂点描画コマンドバッファを指す必要があります。
__ctx__     | フレームの最後には、以前に初期化された `nk_context` 構造体を指す必要があります。

頂点描画コマンドバッファ内の最後の頂点描画コマンドの終端を指す頂点描画コマンドポインタを返します。


#### nk_draw_foreach

頂点描画コマンドバッファ内の各頂点描画コマンドを繰り返し処理します。

```c
#define nk_draw_foreach(cmd,ctx, b)
```

Parameter   | Description
------------|-----------------------------------------------------------
__cmd__     | nk_draw_command` のイテレータが NULL に設定されました。
__buf__     | 以前に `nk_convert` によって埋め尽くされた頂点描画コマンドバッファを指す必要があります。
__ctx__     | フレームの最後には、以前に初期化された `nk_context` 構造体を指す必要があります。


### ウィンドウ

ウィンドウは nuklear の内部で使用される主な永続的な状態であり、各フレームごとにウィンドウを「リタッチ」（すなわち呼び出し）するだけでライフタイム制御が可能です。nuklear 内のすべてのウィジェットは、関数ペア `nk_begin_xxx` と `nk_end` の内部でのみ追加することができます。この2つの関数の外でウィジェットを呼び出すと、デバッグモードではアサートされ、リリースモードでは状態が変化しないことになります。

各ウィンドウは、位置、サイズ、フラグ、ステートテーブル、およびガベージコレクションされた内部永続ウィジェットステートのようなフレームの永続的な状態を保持します。各ウィンドウは、描画とオーバーラップの順序を決定するウィンドウ スタック リストにリンクされています。これにより、一番上のウィンドウが現在アクティブなウィンドウとなります。

スタック内のウィンドウの位置を変更するには、ユーザがクリックすることで自動的に行われるか、プログラムによって `nk_window_focus` を呼び出すことで行われます。デフォルトのウィンドウは、フラグ `NK_WINDOW_HIDDEN` で明示的に定義されているか、フラグ `NK_WINDOW_CLOSABLE` のウィンドウでユーザが閉じるボタンをクリックしたか、または `nk_window_show` を呼び出して明示的にウィンドウを隠さない限り、可視状態になっています。明示的にウィンドウを閉じて破棄するには、 `nk_window_close` を呼び出します。


#### 使用方法

ウィンドウを作成して保持するには、ウィンドウの宣言を開始するために 2 つの `nk_begin_xxx` 関数のいずれかを呼び出し、終了時に `nk_end` 関数を呼び出す必要があります。さらに、`nk_begin_xxx`の戻り値をチェックして、その値が0でない場合にのみウィンドウ内のウィジェットを処理することをお勧めします。いずれにせよ、ウィンドウの宣言の最後に `nk_end` を呼び出す必要があります。さらに、`nk_begin_xxx` の呼び出しを入れ子にしないようにしてください。うまくいけばアサートが発生し、そうでなければセグメンテーションフォールトが発生します。

```c
if (nk_begin_xxx(...) {
    // [... widgets ...]
}
nk_end(ctx);
```

ウィンドウやウィジェットの宣言は、入力処理の後、画面への描画の前に行うのが基本です。そうしないと、レイテンシーが高くなったり、最悪の場合、動作がおかしくなったりします。さらに、`nk_clear` がフレームの終わりで呼ばれることを確認してください。nuklear のデフォルトのプラットフォームバックエンドは既に `nk_clear` を呼び出していますが、独自のバックエンドを作成する場合は `nk_clear` を呼び出さないと、アサートや最悪の場合未定義の動作が発生する可能性があります。

```c
struct nk_context ctx;
nk_init_xxx(&ctx, ...);
while (1) {
    Event evt;
    nk_input_begin(&ctx);
    while (GetEvent(&evt)) {
        if (evt.type == MOUSE_MOVE)
            nk_input_motion(&ctx, evt.motion.x, evt.motion.y);
        else if (evt.type == [...]) {
            nk_input_xxx(...);
        }
    }
    nk_input_end(&ctx);
    if (nk_begin_xxx(...) {
        //[...]
    }
    nk_end(ctx);
    const struct nk_command *cmd = 0;
    nk_foreach(cmd, &ctx) {
    case NK_COMMAND_LINE:
        your_draw_line_function(...)
        break;
    case NK_COMMAND_RECT
        your_draw_rect_function(...)
        break;
    case //...:
        //[...]
    }
    nk_clear(&ctx);
}
nk_free(&ctx);
```


#### リファレンス

Function                            | Description
------------------------------------|----------------------------------------
nk_begin                            | 新しいウィンドウを開始します。（非表示でない限り）すべてのウィンドウに対してフレームごとに呼び出される必要があり、さもなければウィンドウが削除されます
nk_begin_titled                     | タイトルと識別子を分離してウィンドウを開始する機能を拡張し、タイトルが同じでない複数のウィンドウを使用できるようにしました。
nk_end                              | ウィンドウ構築処理の最後に呼び出され、スケーリング、スクロールバー、および一般的なクリーンアップを処理する必要があります。
nk_window_find                      | 指定された名前のウィンドウを検索して返します。
nk_window_get_bounds                | 現在処理中のウィンドウの画面位置と大きさを矩形で返す。
nk_window_get_position              | 現在処理中のウィンドウの位置を返す
nk_window_get_size                  | 現在処理中のウィンドウのサイズを幅と高さで返します。
nk_window_get_width                 | 現在処理中のウィンドウの幅を返す
nk_window_get_height                | 現在処理中のウィンドウの高さを返します。
nk_window_get_panel                 | 現在のウィンドウの全ての処理状態を含むパネルを返します。
nk_window_get_content_region        | 現在処理中のウィンドウ内で、現在表示されている非クリップ空間の位置と大きさを返す
nk_window_get_content_region_min    | 現在処理中のウィンドウ内で、現在表示されている非クリップ空間の上部矩形位置を返す
nk_window_get_content_region_max    | 現在処理中のウィンドウ内で、現在表示されている非クリップ空間の上部矩形位置を返す
nk_window_get_content_region_size   | 現在処理中のウィンドウ内の可視かつ非クリップ空間の大きさを返す
nk_window_get_canvas                | 描画コマンドバッファを返します。カスタムウィジェットの描画に使用できる
nk_window_get_scroll                | 現在のウィンドウのスクロールオフセットを取得する
nk_window_has_focus                 | 現在処理中のウィンドウがアクティブであるか否かを返す
nk_window_is_collapsed              | 指定された名前のウィンドウが現在最小化/折りたたみされているかどうかを返します。
nk_window_is_closed                 | 現在処理中のウィンドウが閉じられたかどうかを返します
nk_window_is_hidden                 | 現在処理中のウィンドウが非表示であったかどうかを返します
nk_window_is_active                 | なぜか `nk_window_has_focus` と同じです。
nk_window_is_hovered                | 現在処理中のウィンドウがマウスでホバーされているかどうかを返します。
nk_window_is_any_hovered            | 現在ホバリングしているウィンドウがあるかどうかを返す
nk_item_is_any_active               | ウィンドウまたはウィジェットが現在ホバーされているか、またはアクティブであるかを返します。
nk_window_set_bounds                | 現在処理中のウィンドウの位置とサイズを更新する
nk_window_set_position              | 現在処理中のウィンドウの位置を更新する
nk_window_set_size                  | 現在処理中のウィンドウのサイズを更新する
nk_window_set_focus                 | 現在処理中のウィンドウをアクティブウィンドウに設定する
nk_window_set_scroll                | 現在のウィンドウのスクロールオフセットを設定する
nk_window_close                     | 指定されたウィンドウ名でウィンドウを閉じ、フレームの最後にウィンドウを削除します。
nk_window_collapse                  | 指定されたウィンドウ名でウィンドウを折りたたみます
nk_window_collapse_if               | 指定された条件を満たした場合に、指定されたウィンドウ名でウィンドウを折りたたみます。
nk_window_show                      | 表示されているウィンドウを非表示にしたり、非表示になっているウィンドウを再表示にしたりします。
nk_window_show_if                   | 条件によってウィンドウを表示/非表示にする


#### nk_panel_flags

Flag                        | Description
----------------------------|----------------------------------------
NK_WINDOW_BORDER            | ウィンドウの周囲にボーダーを描き、ウィンドウと背景を視覚的に分離します
NK_WINDOW_MOVABLE           | 可動フラグは、ユーザー入力またはウィンドウヘッダーのドラッグによってウィンドウを移動できることを示す。
NK_WINDOW_SCALABLE          | スケーラブルフラグは、ウィンドウのボタンにあるスケーラアイコンをドラッグすることで、ユーザー入力によりウィンドウを拡大縮小できることを示します
NK_WINDOW_CLOSABLE          | ヘッダーにクローズ可能なアイコンを追加する
NK_WINDOW_MINIMIZABLE       | ヘッダーに最小化アイコンを追加
NK_WINDOW_NO_SCROLLBAR      | ウィンドウからスクロールバーを削除する
NK_WINDOW_TITLE             | ウィンドウの上部にタイトルを示すヘッダーを強制的に表示します。
NK_WINDOW_SCROLL_AUTO_HIDE  | ユーザーインタラクションがない場合、ウィンドウスクロールバーを自動的に隠す: 各フレームで `nk_context` にデルタタイムを設定する必要もある
NK_WINDOW_BACKGROUND        | ウィンドウを常にバックグラウンドで表示
NK_WINDOW_SCALE_LEFT        | ウィンドウスケーラーを右下ではなく左下に配置する
NK_WINDOW_NO_INPUT          | ウィンドウの拡大縮小、移動、フォーカスの取得を防止します。


#### nk_collapse_states

State           | Description
----------------|-----------------------------------------------------------
__NK_MINIMIZED__| UIセクションが折りたたまれ、最大化されるまで表示されない
__NK_MAXIMIZED__| UIセクションは拡張され、最小化されるまで表示されます。


#### nk_begin

新しいウィンドウを開始します。（非表示でない限り）すべてのウィンドウに対してフレームごとに呼び出される必要があり、さもなければウィンドウが削除されます

```c
int nk_begin(struct nk_context *ctx, const char *title, struct nk_rect bounds, nk_flags flags);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__title__   | ウィンドウのタイトルと識別子。ウィンドウを識別するために、フレーム間で持続する必要があります。
__bounds__  | 初期位置とウィンドウサイズです。ただし、 `NK_WINDOW_SCALABLE` や `NK_WINDOW_MOVABLE` を定義しない場合は、ウィンドウの位置とサイズをフレームごとに設定することができます。
__flags__   | nk_panel_flags セクションで定義されたウィンドウのフラグで、さまざまなウィンドウの動作があります。

この時点から `nk_end` までの間にウィンドウをウィジェットで埋め尽くすことができれば `true(1)` を、そうでなければ `false(0)` を返します (例えば最小化されている場合など)。


#### nk_begin_titled

タイトルと識別子を分離してウィンドウを開始できるように拡張し、同じタイトルで名前がないウィンドウを複数作成できるようにしました。

```c
int nk_begin_titled(struct nk_context *ctx, const char *name, const char *title, struct nk_rect bounds, nk_flags flags);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | ウィンドウの識別子。ウィンドウを識別するためにフレーム間で永続的である必要があります。
__title__   | フラグ `NK_WINDOW_TITLE` または `NK_WINDOW_CLOSABLE` か `NK_WINDOW_MINIMIZED` が設定されている場合に、ウィンドウのタイトルがヘッダ内に表示される。
__bounds__  | 初期位置とウィンドウサイズです。ただし、 `NK_WINDOW_SCALABLE` や `NK_WINDOW_MOVABLE` を定義しない場合は、ウィンドウの位置とサイズをフレームごとに設定することができます。
__flags__   | nk_panel_flags セクションで定義されたウィンドウのフラグで、さまざまなウィンドウの動作があります。

この時点から `nk_end` までの間にウィンドウをウィジェットで埋め尽くすことができれば `true(1)` を、そうでなければ `false(0)` を返します (例えば最小化されている場合など)。


#### nk_end

スケーリング、スクロールバー、一般的なクリーンアップを処理するために、ウィンドウ構築プロセスの最後に呼び出される必要がある。この関数の後にウィジェットを呼び出すと、アサートが発生するか、状態が変化しない。

```c
void nk_end(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。


#### nk_window_find

渡された名前からウィンドウを検索して返す

```c
struct nk_window *nk_window_find(struct nk_context *ctx, const char *name);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | ウィンドウの識別子

指定したウィンドウを指す `nk_window` 構造体を返します。指定した名前のウィンドウが見つからない場合は NULL を返します。


#### nk_window_get_bounds

現在処理中のウィンドウの画面位置と大きさを矩形で返す

警告: この関数は、`nk_begin_xxx` と `nk_end` の呼び出しの間だけ呼び出します。

```c
struct nk_rect nk_window_get_bounds(const struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

ウィンドウの左上端の位置とサイズを持つ `nk_rect` 構造体を返す。


#### nk_window_get_position

現在処理中のウィンドウの位置を返します。

警告: この関数は `nk_begin_xxx` と `nk_end` の呼び出しの間でのみコールしてください。

```c
struct nk_vec2 nk_window_get_position(const struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

ウィンドウの左上端を持つ `nk_vec2` 構造体を返す。


#### nk_window_get_size

現在処理中のウィンドウのサイズを幅と高さで返します。

警告: この関数は `nk_begin_xxx` と `nk_end` の呼び出しの間でのみコールしてください。

```c
struct nk_vec2 nk_window_get_size(const struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

ウィンドウの幅と高さを持つ `nk_vec2` 構造体を返す。


#### nk_window_get_width

現在処理中のウィンドウの幅を返します。

警告: この関数は、`nk_begin_xxx` と `nk_end` の呼び出しの間だけ呼び出します。

```c
float nk_window_get_width(const struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

現在のウィンドウ幅を返す


#### nk_window_get_height

現在処理中のウィンドウの高さを返します。

警告: この関数は `nk_begin_xxx` と `nk_end` の呼び出しの間でのみコールしてください。

```c
float nk_window_get_height(const struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

現在のウィンドウの高さを返します。


#### nk_window_get_panel

現在のウィンドウのすべての処理状態を含む基礎となるパネルを返します。

警告: この関数は `nk_begin_xxx` と `nk_end` の間のみにコールしてください。
警告: 返されたパネルポインタを保持しないでください。

```c
struct nk_panel* nk_window_get_panel(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

ウィンドウ内部の `nk_panel` 状態へのポインタを返します。


#### nk_window_get_content_region

現在処理中のウィンドウ内で、現在表示されている非クリップ空間の位置と大きさを返す。

警告: この関数は `nk_begin_xxx` と `nk_end` の間のみにコールしてください。

```c
struct nk_rect nk_window_get_content_region(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

カレントウィンドウ内の可視領域の画面位置とサイズ (スクロールバーオフセットなし) を含む `nk_rect` 構造体を返す。


#### nk_window_get_content_region_min

現在処理中のウィンドウ内の可視かつ非クリップ空間の左上位置を返す。

警告: この関数は `nk_begin_xxx` と `nk_end` の間のみにコールしてください。

```c
struct nk_vec2 nk_window_get_content_region_min(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

カレントウィンドウの可視領域の左上隅の位置（スクロールバーのオフセットなし）を `nk_vec2` 構造体として返します。


#### nk_window_get_content_region_max

現在処理中のウィンドウ内で、現在表示されている非クリップ空間の画面右下の位置を返します。

警告: この関数は、`nk_begin_xxx` と `nk_end` の呼び出しの間だけ呼び出します。

```c
struct nk_vec2 nk_window_get_content_region_max(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

現在のウィンドウの右下にある可視領域の位置 (スクロールバーオフセットなし) を `nk_vec2` 構造体に格納した結果を返します。


#### nk_window_get_content_region_size

現在処理中のウィンドウ内の可視かつ非クリップ空間の大きさを返す

警告: この関数は、`nk_begin_xxx` と `nk_end` の呼び出しの間だけ呼び出します。

```c
struct nk_vec2 nk_window_get_content_region_size(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

カレントウィンドウの可視領域をサイズ指定した `nk_vec2` 構造体を返します。


#### nk_window_get_canvas

描画コマンドバッファを返します。カスタムウィジェットの描画に使用できる

警告: この関数は `nk_begin_xxx` と `nk_end` の間にのみ呼び出してください。
警告: 返されたコマンドバッファポインタは `nk_end` までしか有効ではないので、その周りに保持しないでください。

```c
struct nk_command_buffer* nk_window_get_canvas(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

描画キャンバスとして使用されるウィンドウ内部の `nk_command_buffer` 構造体へのポインタを返します。カスタム描画を行うために使用することができます。


#### nk_window_get_scroll

現在のウィンドウのスクロールオフセットを取得します。

警告: この関数は `nk_begin_xxx` と `nk_end` の間にのみコールしてください。

```c
void nk_window_get_scroll(struct nk_context *ctx, nk_uint *offset_x, nk_uint *offset_y);
```

Parameter    | Description
-------------|-----------------------------------------------------------
__ctx__      | 以前に初期化された `nk_context` 構造体を指す必要がある。
__offset_x__ | x オフセット出力へのポインタ（または無視する場合は NULL）
__offset_y__ | y オフセット出力へのポインタ（無視する場合は NULL）．

#### nk_window_has_focus

現在処理中のウィンドウがアクティブであるか否かを返す

警告: この関数は、`nk_begin_xxx` と `nk_end` の呼び出しの間だけ呼び出します。

```c
int nk_window_has_focus(const struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

カレントウィンドウがアクティブでない場合は `false(0)` を、アクティブな場合は `true(1)` を返します。


#### nk_window_is_hovered

現在のウィンドウがホバーされているかどうかを返す

警告: この関数は、`nk_begin_xxx` と `nk_end` の呼び出しの間だけ呼び出します。

```c
int nk_window_is_hovered(struct nk_context *ctx);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | Must point to an previously initialized `nk_context` struct

カレントウィンドウがホバリングされている場合は `true(1)` 、そうでない場合は `false(0)` を返します。


#### nk_window_is_collapsed

指定された名前のウィンドウが現在最小化/折りたたみされているかどうかを返します。

```c
int nk_window_is_collapsed(struct nk_context *ctx, const char *name);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | 折りたたまれているかどうかを確認したいウィンドウの識別子

現在のウィンドウが最小化されていれば `true(1)` を、ウィンドウが見つからなかったり最小化されていなければ `false(0)` を返します。


#### nk_window_is_closed

与えられた名前のウィンドウが `nk_close` を呼び出して閉じられたかどうかを返します。

```c
int nk_window_is_closed(struct nk_context *ctx, const char *name);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | 閉じているかどうかを確認したいウィンドウの識別子

現在のウィンドウが閉じていれば `true(1)` を、ウィンドウが見つからないか閉じていなければ `false(0)` を返します。


#### nk_window_is_hidden

指定された名前のウィンドウが非表示であるかどうかを返します。

```c
int nk_window_is_hidden(struct nk_context *ctx, const char *name);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | 非表示になっているかどうかを確認したいウィンドウの識別子

現在のウィンドウが非表示であれば `true(1)` を、ウィンドウが見つからないか表示されていれば `false(0)` を返します。


#### nk_window_is_active

なぜか `nk_window_has_focus` と同じです。

```c
int nk_window_is_active(struct nk_context *ctx, const char *name);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | アクティブかどうかを確認したいウィンドウの識別子

カレントウィンドウがアクティブであれば `true(1)` を、ウィンドウが見つからないかアクティブでなければ `false(0)` を返します。


#### nk_window_is_any_hovered

任意のウィンドウがホバーされているかどうかを返します。

```c
int nk_window_is_any_hovered(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

ウィンドウがホバリングされた場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_item_is_any_active

任意のウィンドウがホバーされているか、または任意のウィジェットが現在アクティブであるかを返します。入力がUIで処理されるか、特定の入力処理で処理されるかを決定するために使用することができます。例えば、3D空間内を移動するために、UIと3Dカメラを使用することができます。

```c
int nk_item_is_any_active(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。

ウィンドウがホバーされているか、アイテムがアクティブであれば `true(1)` を、そうでなければ `false(0)` を返します。


#### nk_window_set_bounds

渡された名前でウィンドウの位置と大きさを更新する

```c
void nk_window_set_bounds(struct nk_context*, const char *name, struct nk_rect bounds);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | 位置とサイズの両方を変更するウィンドウの識別子
__bounds__  | 新しい位置とサイズを持つ `nk_rect` 構造体を指す必要があります．


#### nk_window_set_position

渡された名前を持つウィンドウの位置を更新する

```c
void nk_window_set_position(struct nk_context*, const char *name, struct nk_vec2 pos);
```
Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | 両者の位置を変更するウィンドウの識別子
__pos__     | 新しい位置を持つ `nk_vec2` 構造体を指す必要があります．


#### nk_window_set_size

渡された名前を持つウィンドウのサイズを更新する

```c
void nk_window_set_size(struct nk_context*, const char *name, struct nk_vec2);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | ウィンドウサイズを変更するウィンドウの識別子
__size__    | 新しいウィンドウサイズを持つ `nk_vec2` 構造体を指す必要があります．


#### nk_window_set_focus

指定された名前のウィンドウをアクティブとして設定する

```c
void nk_window_set_focus(struct nk_context*, const char *name);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | フォーカスを設定するウィンドウの識別子


#### nk_window_set_scroll

現在のウィンドウのスクロールオフセットを設定します

警告: この関数は、`nk_begin_xxx` と `nk_end` の呼び出しの間だけ呼び出します。

```c
void nk_window_set_scroll(struct nk_context *ctx, nk_uint offset_x, nk_uint offset_y);
```

Parameter    | Description
-------------|-----------------------------------------------------------
__ctx__      | 以前に初期化された `nk_context` 構造体を指す必要がある。
__offset_x__ | スクロールするためのXオフセット
__offset_y__ | スクロール先のyオフセット


#### nk_window_close

ウィンドウを閉じ、フレーム終了時に解放されるようにマークします。

```c
void nk_window_close(struct nk_context *ctx, const char *name);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | 閉じるウィンドウの識別子


#### nk_window_collapse

指定された名前のウィンドウの崩壊状態を更新する

```c
void nk_window_collapse(struct nk_context*, const char *name, enum nk_collapse_states state);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | 閉じるウィンドウの識別子
__state__   | nk_collapse_states セクションから取り出した値。


#### nk_window_collapse_if

指定された条件が満たされた場合、指定された名前のウィンドウの崩壊状態を更新する

```c
void nk_window_collapse_if(struct nk_context*, const char *name, enum nk_collapse_states, int cond);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | 折りたたみまたは最大化するウィンドウの識別子
__state__   | nk_collapse_states セクションから値を取り出し、ウィンドウを以下の状態にします。
__cond__    | 崩壊状態変更を実際にコミットするために満たさなければならない条件


#### nk_window_show

指定された名前のウィンドウの可視性状態を更新する

```c
void nk_window_show(struct nk_context*, const char *name, enum nk_show_states);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | 折りたたみまたは最大化するウィンドウの識別子
__state__   | でウィンドウを変更する場合は、visible または hidden のいずれかを指定します。


#### nk_window_show_if

指定された条件を満たす場合、指定された名前のウィンドウの可視性状態を更新する

```c
void nk_window_show_if(struct nk_context*, const char *name, enum nk_show_states, int cond);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__name__    | 表示/非表示を切り替えるウィンドウの識別子
__state__   | でウィンドウを変更する場合は、visible または hidden のいずれかを指定します。
__cond__    | 可視性の状態変化を実際にコミットするために満たさなければならない条件


### レイアウト

レイアウトは、一般的にウィジェットをウィンドウ内に位置とサイズで配置することを説明します。この実装では、レイアウトのための5つの異なるAPIがあり、それぞれ制御と使いやすさの間で異なるトレードオフがあります。

このライブラリに含まれるすべてのレイアウトメソッドは、行という概念に基づいています。行は、ウィンドウの高さと列の数を持ち、各レイアウトメソッドは、各ウィジェットがどのように行の中に配置されるかを指定します。レイアウト関数を呼び出して行を割り当てた後、ウィジェットを配置すると、割り当てた行の上に内部ポインタが進みます。

実際にレイアウトを定義するには、適切なレイアウト関数を呼び出すだけで、その後の各ウィジェット呼び出しは、指定されたとおりにウィジェットを配置します。ここで重要なのは、もしウィジェットの数がレイアウト関数の中で定義された列よりも多い場合、別のレイアウト関数を呼び出すことなく次の行が割り当てられるということです。

`nk_layout_space_xxx` API の外でこれらの API を使用する際の最大の制限は、それぞれの行の高さを定義しなければならないことです。しかし、行の高さはしばしばフォントの高さに依存します。

この問題を解決するために、nuklear は内部的に、現在アクティブなフォントの高さにパディングを加えた値を最小行高として使用し、行高が 0 の場合はその値を上書きしています。

手動で行の高さの最小値を変更したい場合は nk_layout_set_min_row_height を使用し、 nk_layout_reset_min_row_height でそれをリセットしてフォントの高さに由来するものに戻します。

また、nuklearでフォントを変更すると、自動的に最小行の高さが変更されます。つまり、フォントを変更しても、行の高さをフォントより小さくしたい場合は、値を再投入しなければなりません。

より高度なUIのためには、`nk_layout_space_xxx`レイアウトメソッドとcassowary制約ソルバー（githubにライセンスモデルを許可したバージョンがあります）を組み合わせて、ウィジェットレイアウトのすべての制御を自分で行うこともお勧めします。しかし、素早く、汚いレイアウトを行うには、他のすべてのレイアウト関数を使用しても問題ないでしょう。

#### 使用方法

1.  __nk_layout_row_dynamic__

最も簡単なレイアウト関数は、`nk_layout_row_dynamic` です。これは、各ウィジェットに同じ水平方向のスペースを提供し、ウィンドウの幅が大きくなると動的に拡大されます。つまり、列の数によって、各ウィジェットのサイズが動的に計算式で決定されます。

```c
widget_width = (window_width - padding - spacing) * (1/colum_count)
```

他のレイアウトAPIと同様に、ウィジェットがカラムより多く定義された場合、このライブラリは新しい行を割り当て、以前に定義されたすべてのレイアウトパラメータを維持します。

```c
if (nk_begin_xxx(...) {
    // first row with height: 30 composed of two widgets
    nk_layout_row_dynamic(&ctx, 30, 2);
    nk_widget(...);
    nk_widget(...);
    //
    // second row with same parameter as defined above
    nk_widget(...);
    nk_widget(...);
    //
    // third row uses 0 for height which will use auto layouting
    nk_layout_row_dynamic(&ctx, 0, 2);
    nk_widget(...);
    nk_widget(...);
}
nk_end(...);
```

2.  __nk_layout_row_static__

もうひとつの簡単なレイアウト関数は `nk_layout_row_static` です。これは、各ウィジェットが行の中で同じ水平方向のピクセル幅を持つようにし、所有するウィンドウが小さくなったり大きくなったりしても、ウィジェットが大きくならないようにします。

```c
if (nk_begin_xxx(...) {
    // first row with height: 30 composed of two widgets with width: 80
    nk_layout_row_static(&ctx, 30, 80, 2);
    nk_widget(...);
    nk_widget(...);
    //
    // second row with same parameter as defined above
    nk_widget(...);
    nk_widget(...);
    //
    // third row uses 0 for height which will use auto layouting
    nk_layout_row_static(&ctx, 0, 80, 2);
    nk_widget(...);
    nk_widget(...);
}
nk_end(...);
```

3.  __nk_layout_row_xxx__

もう少し高度なレイアウト API として、関数 `nk_layout_row_begin`, `nk_layout_row_push`, `nk_layout_row_end` が用意されています。これらの関数では、行の各カラムピクセルやウィンドウの比率を直接指定することができます。カラムごとのピクセル幅を直接指定するか、ウィジェットのウィンドウ比率を直接指定するかをサポートしますが、両方を指定することはできません。さらに、これは即時モードAPIなので、各値はウィジェットを呼び出す前に直接プッシュされます。したがって、前2つのレイアウト関数のように、レイアウトが自動的に繰り返されることはありません。

```c
if (nk_begin_xxx(...) {
    // first row with height: 25 composed of two widgets with width 60 and 40
    nk_layout_row_begin(ctx, NK_STATIC, 25, 2);
    nk_layout_row_push(ctx, 60);
    nk_widget(...);
    nk_layout_row_push(ctx, 40);
    nk_widget(...);
    nk_layout_row_end(ctx);
    //
    // second row with height: 25 composed of two widgets with window ratio 0.25 and 0.75
    nk_layout_row_begin(ctx, NK_DYNAMIC, 25, 2);
    nk_layout_row_push(ctx, 0.25f);
    nk_widget(...);
    nk_layout_row_push(ctx, 0.75f);
    nk_widget(...);
    nk_layout_row_end(ctx);
    //
    // third row with auto generated height: composed of two widgets with window ratio 0.25 and 0.75
    nk_layout_row_begin(ctx, NK_DYNAMIC, 0, 2);
    nk_layout_row_push(ctx, 0.25f);
    nk_widget(...);
    nk_layout_row_push(ctx, 0.75f);
    nk_widget(...);
    nk_layout_row_end(ctx);
}
nk_end(...);
```

4.  __nk_layout_row__

API nk_layout_row_xxx に対応する配列は、単一の nk_layout_row 関数です。すべてのウィジェットにピクセルやウィンドウの比率を指定する代わりに、配列で定義することができます。コントロールが少なくなる代わりに、`nk_layout_row` は自動的に繰り返されます。それ以外の動作は同じです。

```c
if (nk_begin_xxx(...) {
    // two rows with height: 30 composed of two widgets with width 60 and 40
    const float size[] = {60,40};
    nk_layout_row(ctx, NK_STATIC, 30, 2, ratio);
    nk_widget(...);
    nk_widget(...);
    nk_widget(...);
    nk_widget(...);
    //
    // two rows with height: 30 composed of two widgets with window ratio 0.25 and 0.75
    const float ratio[] = {0.25, 0.75};
    nk_layout_row(ctx, NK_DYNAMIC, 30, 2, ratio);
    nk_widget(...);
    nk_widget(...);
    nk_widget(...);
    nk_widget(...);
    //
    // two rows with auto generated height composed of two widgets with window ratio 0.25 and 0.75
    const float ratio[] = {0.25, 0.75};
    nk_layout_row(ctx, NK_DYNAMIC, 30, 2, ratio);
    nk_widget(...);
    nk_widget(...);
    nk_widget(...);
    nk_widget(...);
}
nk_end(...);
```

5.  __nk_layout_row_template_xxx__

最も複雑で 2 番目に柔軟な API は、動的なウィジェットのための行の折り返しやウェイトがない、簡略化されたフレックスボックスのバージョンです。これは即時モードの API ですが、`nk_layout_row_xxx` とは異なり、オートリピート動作があり、テンプレート化されたウィジェットを呼び出す前に呼び出す必要があります。行テンプレートのレイアウトには、ウィジェットごとに 3 種類のサイズ指定があります。2 つ目のサイズ指定は `nk_layout_row_template_push_variable` で、これはウィジェットの最小サイズを定義しますが、他のウィジェットによって占有されていないスペースがあれば、大きくすることができます。最後に動的なウィジェットとして `nk_layout_row_template_push_dynamic` があります。これは完全に柔軟で、可変ウィジェットとは異なり、十分なスペースがない場合はゼロまで縮小することができます。

```c
if (nk_begin_xxx(...) {
    // two rows with height: 30 composed of three widgets
    nk_layout_row_template_begin(ctx, 30);
    nk_layout_row_template_push_dynamic(ctx);
    nk_layout_row_template_push_variable(ctx, 80);
    nk_layout_row_template_push_static(ctx, 80);
    nk_layout_row_template_end(ctx);
    //
    // first row
    nk_widget(...); // dynamic widget can go to zero if not enough space
    nk_widget(...); // variable widget with min 80 pixel but can grow bigger if enough space
    nk_widget(...); // static widget with fixed 80 pixel width
    //
    // second row same layout
    nk_widget(...);
    nk_widget(...);
    nk_widget(...);
}
nk_end(...);
```

6.  __nk_layout_space_xxx__

最後に最も柔軟なAPIは、ウィジェットを直接ウィンドウ内に配置できるようにするものです。スペースレイアウトAPIは、行の自動繰り返しをサポートしない即時モードAPIで、ウィジェットの位置と大きさを直接設定します。位置とサイズは、割り当てられたスペースに対する比率で指定するか、割り当てられたスペースのローカルな位置とピクセルサイズで指定することができます。このAPIは非常に強力なので、利用可能なスペースを取得したり、ローカルな割り当てスペースとスクリーンスペースを変換するためのユーティリティ関数が多数用意されています。

```c
if (nk_begin_xxx(...) {
    // static row with height: 500 (you can set column count to INT_MAX if you don't want to be bothered)
    nk_layout_space_begin(ctx, NK_STATIC, 500, INT_MAX);
    nk_layout_space_push(ctx, nk_rect(0,0,150,200));
    nk_widget(...);
    nk_layout_space_push(ctx, nk_rect(200,200,100,200));
    nk_widget(...);
    nk_layout_space_end(ctx);
    //
    // dynamic row with height: 500 (you can set column count to INT_MAX if you don't want to be bothered)
    nk_layout_space_begin(ctx, NK_DYNAMIC, 500, INT_MAX);
    nk_layout_space_push(ctx, nk_rect(0.5,0.5,0.1,0.1));
    nk_widget(...);
    nk_layout_space_push(ctx, nk_rect(0.7,0.6,0.1,0.1));
    nk_widget(...);
}
nk_end(...);
```


#### リファレンス

Function                                | Description
----------------------------------------|------------------------------------
nk_layout_set_min_row_height            | 現在使用されている最小行の高さを指定した値に設定する
nk_layout_reset_min_row_height          | 現在使用されている最小行の高さをフォントの高さにリセットします。
nk_layout_widget_bounds                 | 静的レイアウトの行がウィンドウ内に収まる現在の幅を計算します。
nk_layout_ratio_from_pixel              | 画素サイズからウィンドウ比を計算するユーティリティ関数
nk_layout_row_dynamic                   | 現在のレイアウトは、同じ大きさの成長する列がn個に分割されています。
nk_layout_row_static                    | 現在のレイアウトは、同じ固定サイズのカラムに分割されています。
nk_layout_row_begin                     | 指定された高さと列数で新しい行を開始します。
nk_layout_row_push                      | 指定されたサイズまたはウィンドウの比率で別の列をプッシュします。
nk_layout_row_end                       | 先に開始した行を終了させる
nk_layout_row                           | 配列の行と列を、ウィンドウの比率またはサイズで指定する。
nk_layout_row_template_begin            | 行テンプレートの宣言を開始する
nk_layout_row_template_push_dynamic     | 動的に増加するカラムを追加し、十分なスペースがない場合はゼロにすることができます。
nk_layout_row_template_push_variable    | 指定したピクセル幅より小さくはならないが、動的に大きくなる可変カラムを追加する。
nk_layout_row_template_push_static      | 成長せず、常に同じサイズを持つ静的カラムを追加します。
nk_layout_row_template_end              | 行テンプレートの終端をマークする
nk_layout_space_begin                   | 各ウィジェットの位置や大きさを指定できるレイアウトスペースを新たに追加
nk_layout_space_push                    | 次のウィジェットの位置と大きさを、ピクセルまたは比率で、自分の座標空間にプッシュします。
nk_layout_space_end                     | レイアウト空間の終了を示すマーク
nk_layout_space_bounds                  | nk_layout_space_begin の後に呼び出され、割り当てられた空間の合計を返す。
nk_layout_space_to_screen               | nk_layout_space 座標空間から画面空間へベクトルを変換する。
nk_layout_space_to_local                | スクリーン空間から nk_layout_space 座標にベクトルを変換する。
nk_layout_space_rect_to_screen          | 矩形を nk_layout_space の座標空間から画面空間に変換する。
nk_layout_space_rect_to_local           | 矩形を画面空間から nk_layout_space の座標に変換する。


#### nk_layout_set_min_row_height

現在使用されている行の高さの最小値を設定します。

警告: 渡された高さは、希望する行の高さとパディングの両方を含む必要があります。内部パディングは追加されない。

```c
void nk_layout_set_min_row_height(struct nk_context*, float height);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__height__  | 行の高さの自動生成に使用される新しい最小行の高さ


#### nk_layout_reset_min_row_height

現在使われている行の最小の高さを `font_height + text_padding + padding` に戻す。

```c
void nk_layout_reset_min_row_height(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。


#### nk_layout_widget_bounds

レイアウト関数のいずれかによって確保された次の行の幅を返します。

```c
struct nk_rect nk_layout_widget_bounds(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。

次の行の位置とサイズを指定して `nk_rect` を返す。


#### nk_layout_ratio_from_pixel

画素サイズからウィンドウ比を計算するユーティリティ関数

```c
float nk_layout_ratio_from_pixel(struct nk_context*, float pixel_width);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__pixel__   | ウィンドウの比率に変換するためのピクセル幅

次の行の位置とサイズを指定して `nk_rect` を返します。


#### nk_layout_row_dynamic

cols 個のウィジェットの間で水平方向のスペースを均等に共有するために、現在の行のレイアウトを設定します。一度呼び出されると、それ以降に呼び出されたウィジェットが @cols より大きい場合は、同じレイアウトで新しい行が割り当てられます。

```c
void nk_layout_row_dynamic(struct nk_context *ctx, float height, int cols);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__height__  | 各ウィジェットの行の高さを保持、または自動レイアウトの場合は0を保持
__columns__ | 行内のウィジェットの数


#### nk_layout_row_static

現在の行のレイアウトを、同じ @item_width の水平サイズで、行内のウィジェットの数 @cols だけ埋めるように設定します。一度呼び出されると、それ以降に呼び出されたウィジェットが @cols より大きい場合は、同じレイアウトで新しい行が割り当てられます。

```c
void nk_layout_row_static(struct nk_context *ctx, float height, int item_width, int cols);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__height__  | 各ウィジェットの行の高さを保持、または自動レイアウトの場合は0を保持
__width__   | 行内の各ウィジェットのピクセル幅を保持します。
__columns__ | 行内のウィジェットの数


#### nk_layout_row_begin

指定された高さと列数で、新しい動的または固定的な行を開始します。

```c
void nk_layout_row_begin(struct nk_context *ctx, enum nk_layout_format fmt, float row_height, int cols);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__fmt__     | ウィンドウの比率を指定する場合は `NK_DYNAMIC` を、固定サイズのカラムを指定する場合は `NK_STATIC` を指定する。
__height__  | 各ウィジェットの行の高さを保持します。自動レイアウトの場合は0となります。
__columns__ | 行内のウィジェットの数


#### nk_layout_row_push

ウィンドウの比率または1列の幅を指定します。

```c
void nk_layout_row_push(struct nk_context*, float value);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__value__   | 前の `nk_layout_row_begin` 呼び出しの @fmt に依存して、ウィンドウの比率または固定幅になります。


#### nk_layout_row_end

先に開始した行を終了させる

```c
void nk_layout_row_end(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。


#### nk_layout_row

配列の行と列を、ウィンドウの比率またはサイズで指定する。

```c
void nk_layout_row(struct nk_context*, enum nk_layout_format, float height, int cols, const float *ratio);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__fmt__     | ウィンドウの比率を指定する場合は `NK_DYNAMIC` 、固定サイズのカラムを指定する場合は `NK_STATIC` のいずれかを指定する。
__height__  | 各ウィジェットの行の高さを保持します。
__columns__ | 行内のウィジェットの数


#### nk_layout_row_template_begin

行テンプレート宣言の開始

```c
void nk_layout_row_template_begin(struct nk_context*, float row_height);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__height__  | 各ウィジェットの行の高さを保持します。


#### nk_layout_row_template_push_dynamic

動的に増加するカラムを追加し、十分なスペースがない場合はゼロにすることができます。

```c
void nk_layout_row_template_push_dynamic(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__height__  | 各ウィジェットの行の高さを保持、または自動レイアウトの場合は0を保持


#### nk_layout_row_template_push_variable

指定したピクセル幅より小さくはならないが、動的に大きくなる可変カラムを追加する。

```c
void nk_layout_row_template_push_variable(struct nk_context*, float min_width);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__width__   | 次の列の最小ピクセル幅を常に保持します。


#### nk_layout_row_template_push_static

成長せず、常に同じサイズを持つ静的カラムを追加します。

```c
void nk_layout_row_template_push_static(struct nk_context*, float width);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__width__   | 次の列のピクセル幅の絶対値を保持する。


#### nk_layout_row_template_end

行テンプレートの終端をマークする

```c
void nk_layout_row_template_end(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。


#### nk_layout_space_begin

各ウィジェットの位置や大きさを指定できる新しいレイアウト空間を開始します。

```c
void nk_layout_space_begin(struct nk_context*, enum nk_layout_format, float height, int widget_count);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_begin_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__fmt__     | ウィンドウの比率を指定する場合は `NK_DYNAMIC` 、固定サイズのカラムを指定する場合は `NK_STATIC` のいずれかを指定する。
__height__  | 各ウィジェットの行の高さを保持、または自動レイアウトの場合は0を保持
__columns__ | 行内のウィジェットの数


#### nk_layout_space_push

次のウィジェットの位置と大きさを、ピクセルまたは比率で、自分の座標空間にプッシュします。

```c
void nk_layout_space_push(struct nk_context *ctx, struct nk_rect bounds);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_layout_space_begin` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__bounds__  | LAOYUT空間における位置と大きさ ローカル座標


#### nk_layout_space_end

レイアウト空間の終端を示すマーク

```c
void nk_layout_space_end(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_layout_space_begin` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。


#### nk_layout_space_bounds

`nk_layout_space` に割り当てられた空間の総量を計算するユーティリティ関数

```c
struct nk_rect nk_layout_space_bounds(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_layout_space_begin` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。

割り当てられた領域の合計を `nk_rect` として返す。


#### nk_layout_space_to_screen

nk_layout_space 座標空間から画面空間へベクトルを変換する。

```c
struct nk_vec2 nk_layout_space_to_screen(struct nk_context*, struct nk_vec2);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_layout_space_begin` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__vec__     | レイアウト空間から画面座標空間へ変換する位置

変換後の `nk_vec2` をスクリーン空間座標で返す。


#### nk_layout_space_to_local

ベクターをレイアウト空間から画面空間に変換します。

```c
struct nk_vec2 nk_layout_space_to_local(struct nk_context*, struct nk_vec2);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_layout_space_begin` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__vec__     | 画面空間からレイアウト座標空間へ変換する位置

変換後の `nk_vec2` をレイアウト空間座標系で返す。


#### nk_layout_space_rect_to_screen

矩形を画面空間からレイアウト空間に変換する

```c
struct nk_rect nk_layout_space_rect_to_screen(struct nk_context*, struct nk_rect);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_layout_space_begin` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__bounds__  | レイアウト空間から画面空間に変換するための矩形

変換後の `nk_rect` をスクリーン空間座標で返す。


#### nk_layout_space_rect_to_local

矩形をレイアウト空間から画面空間に変換する。

```c
struct nk_rect nk_layout_space_rect_to_local(struct nk_context*, struct nk_rect);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_layout_space_begin` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__bounds__  | レイアウト空間から画面空間に変換するための矩形

変換された `nk_rect` をレイアウト空間座標系で返します。


### グループ

グループは、基本的にウィンドウの中にあるウィンドウです。ウィンドウ内のスペースを細分化し、ウィジェットをグループとしてレイアウトすることができます。ウィジェットレイアウトの複雑な要件は、グループと基本的なレイアウト機能で解決できます。グループはウィンドウと同様に一意の名前で識別され、デフォルトではスクロールバーのオフセットを内部で追跡します。しかし、スクロールバーを直接管理するための追加バージョンも提供されています。


#### 使用方法

グループを作成するには、3つの `nk_group_begin_xxx` 関数のいずれかを呼び出してグループ宣言を開始し、 `nk_group_end` を終了する必要があります。さらに、`nk_group_begin_xxx` の戻り値をチェックし、その値が 0 でない場合にのみウィンドウ内のウィジェットを処理することが要求されます。多くのレイアウトスキームがネストによってのみ実現できるため、グループのネストは可能であり、推奨されています。グループはウィンドウとは異なり、対応する `nk_group_begin_xxx` が 0 を返さない場合にのみ `nk_group_end` が呼ばれる必要があります。

```c
if (nk_group_begin_xxx(ctx, ...) {
    // [... widgets ...]
    nk_group_end(ctx);
}
```

グランドコンセプトでは、グループは `nk_begin_xxx` でウィンドウを起動した後、 `nk_end` を呼び出す前に呼び出すことができます。

```c
struct nk_context ctx;
nk_init_xxx(&ctx, ...);
while (1) {
    // Input
    Event evt;
    nk_input_begin(&ctx);
    while (GetEvent(&evt)) {
        if (evt.type == MOUSE_MOVE)
            nk_input_motion(&ctx, evt.motion.x, evt.motion.y);
        else if (evt.type == [...]) {
            nk_input_xxx(...);
        }
    }
    nk_input_end(&ctx);
    //
    // Window
    if (nk_begin_xxx(...) {
        // [...widgets...]
        nk_layout_row_dynamic(...);
        if (nk_group_begin_xxx(ctx, ...) {
            //[... widgets ...]
            nk_group_end(ctx);
        }
    }
    nk_end(ctx);
    //
    // Draw
    const struct nk_command *cmd = 0;
    nk_foreach(cmd, &ctx) {
    switch (cmd->type) {
    case NK_COMMAND_LINE:
        your_draw_line_function(...)
        break;
    case NK_COMMAND_RECT
        your_draw_rect_function(...)
        break;
    case ...:
        // [...]
    }
    nk_clear(&ctx);
}
nk_free(&ctx);
```


#### リファレンス

Function                        | Description
--------------------------------|-------------------------------------------
nk_group_begin                  | 内部スクロールバー処理による新しいグループの開始
nk_group_begin_titled           | 名前とタイトルを分離し、内部スクロールバーを処理する新しいグループを開始する
nk_group_end                    | グループを終了させる。nk_group_begin が 0 以外を返した場合にのみ呼び出される必要がある。
nk_group_scrolled_offset_begin  | スクロールバーのXオフセットとYオフセットを手動で分離して処理する新規グループの開始
nk_group_scrolled_begin         | スクロールバーを手動で操作して新しいグループを開始する
nk_group_scrolled_end           | 手動スクロールバー処理でグループを終了させる。nk_group_begin が 0 以外を返した場合のみ呼び出されるべきである。
nk_group_get_scroll             | 指定されたグループのスクロールオフセットを取得します。
nk_group_set_scroll             | 指定されたグループのスクロールオフセットを設定します


#### nk_group_begin

新しいウィジェットグループを開始します。pos/sizeを指定するために、以前のレイアウト機能が必要です。

```c
int nk_group_begin(struct nk_context*, const char *title, nk_flags);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__title__   | グループヘッダにも使用される、このグループに固有の識別子である必要があります。
__flags__   | nk_panel_flags セクションで定義されたウィンドウ・フラグで、さまざまなグループ動作があります。

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_group_begin_titled

新しいウィジェットグループを開始します。pos/sizeを指定するために、以前のレイアウト機能が必要です。

```c
int nk_group_begin_titled(struct nk_context*, const char *name, const char *title, nk_flags);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__id__      | このグループに対して一意な識別子でなければならない
__title__   | グループヘッダーのタイトル
__flags__   | nk_panel_flags セクションで定義されたウィンドウ・フラグで、さまざまなグループ動作があります。

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_group_end

ウィジェットグループを終了する

```c
void nk_group_end(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。


#### nk_group_scrolled_offset_begin

新しいウィジェットグループを開始します。サイズを指定するために、以前のレイアウト機能を必要とします。スクロールバーを追跡しません。

```c
int nk_group_scrolled_offset_begin(struct nk_context*, nk_uint *x_offset, nk_uint *y_offset, const char *title, nk_flags flags);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__x_offset__| グループ内のすべてのウィジェットを水平方向にオフセットするスクロールバーのx-offsetを指定します。
__y_offset__| グループ内のすべてのウィジェットを垂直方向にオフセットするスクロールバーのyオフセット
__title__   | グループヘッダに表示されるウィンドウ固有のグループタイトル。
__flags__   | nk_panel_flagsセクションのウィンドウ・フラグ

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_group_scrolled_begin

新しいウィジェットグループを開始します。サイズを指定するために、以前のレイアウト機能が必要です。スクロールバーを追跡しません。

```c
int nk_group_scrolled_begin(struct nk_context*, struct nk_scroll *off, const char *title, nk_flags);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__off__     | x、yの両スクロールオフセット。手動でのスクロールバーコントロールを可能にする
__title__   | グループヘッダに表示されるウィンドウ固有のグループタイトル。
__flags__   | nk_panel_flags セクションのウィンドウ・フラグ

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_group_scrolled_end

nk_group_scrolled_offset_begin や nk_group_scrolled_begin を呼び出した後、ウィジェットグループを終了します。

```c
void nk_group_scrolled_end(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。


#### nk_group_get_scroll

指定されたグループのスクロール位置を取得します。

```c
void nk_group_get_scroll(struct nk_context*, const char *id, nk_uint *x_offset, nk_uint *y_offset);
```

Parameter    | Description
-------------|-----------------------------------------------------------
__ctx__      | 以前に初期化された `nk_context` 構造体を指す必要がある。
__id__       | スクロール位置を取得するグループの ID。
__x_offset__ | x オフセット出力へのポインタ（または無視する場合は NULL）
__y_offset__ | y オフセット出力へのポインタ（無視する場合は NULL）．


#### nk_group_set_scroll

指定されたグループのスクロール位置を設定します。

```c
void nk_group_set_scroll(struct nk_context*, const char *id, nk_uint x_offset, nk_uint y_offset);
```

Parameter    | Description
-------------|-----------------------------------------------------------
__ctx__      | 以前に初期化された `nk_context` 構造体を指す必要がある。
__id__       | スクロールするグループのID
__x_offset__ | スクロールするためのXオフセット
__y_offset__ | スクロール先のyオフセット


### ツリー

ツリーは、2つの異なる概念を表しています。まず、折り畳み可能なUIセクションの概念で、非表示または表示状態のいずれかにすることができる。これにより、UIユーザーは、現在表示されているUIのセットを選択的に最小化して理解することができます。もうひとつは、ツリーを視覚的に表現するためのツリーウィジェットです。

ツリーは、ネストして表現することができ、複数のネストした折りたたみ可能なUIセクションを持つことができます。すべてのツリーは、 `nk_tree_xxx_push_tree` 関数を呼び出すことで始まり、 `nk_tree_xxx_pop_xxx()` 関数のいずれかを呼び出すことで終了します。それぞれの開始関数は、タイトルラベルと、オプションとして表示される画像、そして nk_collapse_states セクションにある初期折りたたみ状態を受け取ります。

ツリーの実行時の状態は、呼び出し元がライブラリの外部に保存するか、一意のIDを必要とする内部に保存するかのいずれかである。一意の ID は、関数 `nk_tree_push` によって `__FILE__` と `__LINE__` から自動的に生成されるか、関数 `nk_tree_push_id` によって `__FILE__` とループインデックスなどのユーザ提供 ID によって生成されるか、関数 `nk_tree_push_hashed` によって完全にユーザから提供されるかのいずれかである。


#### 使用方法

ツリーを作成するには、7つの `nk_tree_xxx_push_xxx` 関数のいずれかを呼び出して折りたたみ可能なUIセクションを開始し、 `nk_tree_xxx_pop` で終了します。それぞれの開始関数は、ツリーが折りたたまれているか隠れていてコンテンツで埋める必要がなければ `false(0)` 、見えていて埋める必要があれば `true(1)` を返すようになっています。

注意: ツリーヘッダーはレイアウト関数を必要とせず、代わりに現在使用されているフォントサイズに基づいて自動高さを計算します。 ツリーの終了関数は、ツリーのコンテンツが実際に表示されている場合にのみ呼び出される必要があります。したがって、ツリーのプッシュ関数は `if` でガードし、ポップ関数はツリーが表示されているときだけ呼び出されるようにします。

```c
if (nk_tree_push(ctx, NK_TREE_TAB, "Tree", NK_MINIMIZED)) {
    nk_layout_row_dynamic(...);
    nk_widget(...);
    nk_tree_pop(ctx);
}
```


#### リファレンス

Function                    | Description
----------------------------|-------------------------------------------
nk_tree_push                | 内部状態管理で折りたたみ可能なUIセクションを開始する
nk_tree_push_id             | 内部状態管理呼び出し可能な折りたたみ式UIセクションをルックで開始する
nk_tree_push_hashed         | 状態を保存するために使用する内部ユニークIDを完全に制御して、内部状態管理を行う折りたたみ式UIセクションを開始する
nk_tree_image_push          | 画像とラベルのヘッダーを持つ折りたたみ可能なUIセクションを開始する
nk_tree_image_push_id       | 画像とラベルのヘッダーと内部状態管理の callable を持つ折りたたみ可能な UI セクションをルックで開始する
nk_tree_image_push_hashed   | 画像とラベルのヘッダーを持つ折りたたみ可能なUIセクションを開始し、状態を保存するために使用する内部ユニークIDを完全に制御する内部状態管理
nk_tree_pop                 | 折りたたみ可能なUIセクションを終了する
nk_tree_state_push          | 外部状態管理で折りたたみ可能なUIセクションを起動する
nk_tree_state_image_push    | 画像とラベルのヘッダーと外部状態管理で折りたたみ可能なUIセクションを開始する
nk_tree_state_pop           | 折りたたみ式UIセクションの終了


#### nk_tree_type

Flag            | Description
----------------|----------------------------------------
NK_TREE_NODE    | 折りたたみ可能なUIセクションをマークするハイライトされたツリーヘッダー
NK_TREE_TAB     | ハイライトされていないツリーヘッダーをツリー表現に近づける。


#### nk_tree_push

内部状態管理で折りたたみ可能なUIセクションを起動する

警告: ランタイムツリーの折りたたみ状態を記録するために、この関数は `__FILE__` と `__LINE__` の定義を使って一意の ID を生成します。この関数をループで呼び出したい場合は、代わりに `nk_tree_push_id` または `nk_tree_push_hashed` を使ってください。

```c
#define nk_tree_push(ctx, type, title, state)
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__type__    | nk_tree_type セクションの値で、ツリーノードのヘッダを折りたたみ可能なUIセクションまたはツリーノードのいずれかとして視覚的にマークする。
__title__   | ツリーのヘッダーに印刷されるラベル
__state__   | nk_collapse_statesのうち、ツリー状態の初期値

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_tree_push_id

ルックで内部状態管理を呼び出し可能な折りたたみ式UIセクションを開始します。

```c
#define nk_tree_push_id(ctx, type, title, state, id)
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__type__    | nk_tree_type セクションの値で、ツリーノードのヘッダを折りたたみ可能なUIセクションまたはツリーノードのいずれかとして視覚的にマークする。
__title__   | ツリーのヘッダーに印刷されるラベル
__state__   | nk_collapse_statesのうち、ツリー状態の初期値
__id__      | この関数がループ内で呼び出された場合のループカウンタのインデックス

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_tree_push_hashed

状態を保存するために使用される内部ユニークIDを完全に制御する内部状態管理で折りたたみ可能なUIセクションを開始する

```c
int nk_tree_push_hashed(struct nk_context*, enum nk_tree_type, const char *title, enum nk_collapse_states initial_state, const char *hash, int len,int seed);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__type__    | nk_tree_type セクションの値で、ツリーノードのヘッダを折りたたみ可能なUIセクションまたはツリーノードのいずれかとして視覚的にマークする。
__title__   | ツリーのヘッダーに印刷されるラベル
__state__   | nk_collapse_statesのうち、ツリー状態の初期値
__hash__    | IDを生成するためのメモリブロックまたは文字列
__len__     | 渡されたメモリブロックまたは文字列のサイズ(__hash__)
__seed__    | この関数がループ内で呼ばれた場合のシード値、またはデフォルトは `0` 。

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_tree_image_push

画像とラベルのヘッダーを持つ折りたたみ可能なUIセクションを開始する

警告: ランタイムツリーの折りたたみ状態を記録するために、この関数は `__FILE__` と `__LINE__` の定義を使って一意の ID を生成します。この関数をループで呼び出したい場合は、代わりに `nk_tree_image_push_id` または `nk_tree_image_push_hashed` を使ってください。

```c
#define nk_tree_image_push(ctx, type, img, title, state)
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__type__    | nk_tree_type セクションの値で、ツリーノードのヘッダを折りたたみ可能なUIセクションまたはツリーノードのいずれかとして視覚的にマークする。
__img__     | ラベルの左側のヘッダー内に表示する画像
__title__   | ツリーのヘッダーに印刷されるラベル
__state__   | nk_collapse_statesのうち、ツリー状態の初期値

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_tree_image_push_id

画像とラベルのヘッダーと内部状態管理の callable を持つ折りたたみ可能な UI セクションをルックで開始する

```c
#define nk_tree_image_push_id(ctx, type, img, title, state, id)
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__type__    | nk_tree_type セクションの値で、ツリーノードのヘッダを折りたたみ可能なUIセクションまたはツリーノードのいずれかとして視覚的にマークする。
__img__     | ラベルの左側のヘッダー内に表示する画像
__title__   | ツリーのヘッダーに印刷されるラベル
__state__   | nk_collapse_statesのうち、ツリー状態の初期値
__id__      | この関数がループ内で呼び出された場合のループカウンタのインデックス

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_tree_image_push_hashed

状態を保存するために使用される内部ユニークIDを完全に制御する内部状態管理で折りたたみ可能なUIセクションを開始する

```c
int nk_tree_image_push_hashed(struct nk_context*, enum nk_tree_type, struct nk_image, const char *title, enum nk_collapse_states initial_state, const char *hash, int len,int seed);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | 以前に初期化された `nk_context` 構造体を指す必要がある。
__type__    | nk_tree_type セクションの値で、ツリーノードのヘッダを折りたたみ可能なUIセクションまたはツリーノードのいずれかとして視覚的にマークする。
__img__     | ラベルの左側のヘッダー内に表示する画像
__title__   | ツリーのヘッダーに印刷されるラベル
__state__   | nk_collapse_statesのうち、ツリー状態の初期値
__hash__    | IDを生成するためのメモリブロックまたは文字列
__len__     | 渡されたメモリブロックまたは文字列のサイズ(__hash__)
__seed__    | この関数がループ内で呼ばれた場合のシード値、またはデフォルトは `0` 。

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_tree_pop

折りたたみ式UIセクションの終了

```c
void nk_tree_pop(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_tree_xxx_push_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。


#### nk_tree_state_push

外部状態管理で折りたたみ可能なUIセクションを起動する

```c
int nk_tree_state_push(struct nk_context*, enum nk_tree_type, const char *title, enum nk_collapse_states *state);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | nk_tree_xxx_push_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__type__    | nk_tree_type セクションの値で、ツリーノードのヘッダを折りたたみ可能なUIセクションまたはツリーノードのいずれかとして視覚的にマークする。
__title__   | ツリーのヘッダーに印刷されるラベル
__state__   | 更新する永続的な状態

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_tree_state_image_push

画像とラベルのヘッダーと外部状態管理で折りたたみ可能なUIセクションを開始する

```c
int nk_tree_state_image_push(struct nk_context*, enum nk_tree_type, struct nk_image, const char *title, enum nk_collapse_states *state);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_tree_xxx_push_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__img__     | ラベルの左側のヘッダー内に表示する画像
__type__    | nk_tree_type セクションの値で、ツリーノードのヘッダを折りたたみ可能なUIセクションまたはツリーノードのいずれかとして視覚的にマークする。
__title__   | ツリーのヘッダーに印刷されるラベル
__state__   | 更新する永続的な状態

ウィジェットが表示され、かつフィルできる場合は `true(1)` を、そうでない場合は `false(0)` を返します。


#### nk_tree_state_pop

折りたたみ式UIセクションの終了

```c
void nk_tree_state_pop(struct nk_context*);
```

Parameter   | Description
------------|-----------------------------------------------------------
__ctx__     | `nk_tree_xxx_push_xxx` を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。


### プロパティ

プロパティは、Nuklear の主要な値変更ウィジェットです。値の変更は、ドラッグ、ボタンクリックによる段階的な追加・削除、数値の直接入力で行うことができます。


#### 使用方法

各プロパティには、識別のためのユニークな名前が必要で、それはラベルを表示するためにも使用されます。同じ名前を複数回使用したい場合は、名前の前に'#'を付けてください。この'#'は表示されませんが、一意のIDを生成します。また、各プロパティには、最小値と最大値が設定されています。もし、ある型のすべての数値範囲を使用したい場合は、 `limits.h` から提供されている型制限を使用すればよい。例えば、 `nk_property_int` と `nk_propertyi` には `INT_MIN` と `INT_MAX` を指定します。さらに、各プロパティはインクリメントボタンがクリックされたときに加算または減算されるインクリメント値を受け取ります。最後に、ドラッグされたピクセルあたりの増分値があり、その値から加減されます。

```c
int value = 0;
struct nk_context ctx;
nk_init_xxx(&ctx, ...);
while (1) {
    // Input
    Event evt;
    nk_input_begin(&ctx);
    while (GetEvent(&evt)) {
        if (evt.type == MOUSE_MOVE)
            nk_input_motion(&ctx, evt.motion.x, evt.motion.y);
        else if (evt.type == [...]) {
            nk_input_xxx(...);
        }
    }
    nk_input_end(&ctx);
    //
    // Window
    if (nk_begin_xxx(...) {
        // Property
        nk_layout_row_dynamic(...);
        nk_property_int(ctx, "ID", INT_MIN, &value, INT_MAX, 1, 1);
    }
    nk_end(ctx);
    //
    // Draw
    const struct nk_command *cmd = 0;
    nk_foreach(cmd, &ctx) {
    switch (cmd->type) {
    case NK_COMMAND_LINE:
        your_draw_line_function(...)
        break;
    case NK_COMMAND_RECT
        your_draw_rect_function(...)
        break;
    case ...:
        // [...]
    }
    nk_clear(&ctx);
}
nk_free(&ctx);
```


#### リファレンス

Function            | Description
--------------------|-------------------------------------------
nk_property_int     | 渡された値を直接変更する整数プロパティ
nk_property_float   | 渡された値を直接変更するFloatプロパティ
nk_property_double  | 渡された値を直接変更するダブルプロパティ
nk_propertyi        | 修正後の int 値を返す整数型プロパティ
nk_propertyf        | 修正後の浮動小数点値を返す Float プロパティ
nk_propertyd        | Double プロパティは、変更後の Double 値を返す。


#### nk_property_int

渡された値を直接変更する整数プロパティ

警告：同じラベルを使用してユニークなプロパティIDを生成するには、先頭に `#` を挿入することを確認してください。これは表示されませんが、正しい動作を保証するものです。

```c
void nk_property_int(struct nk_context *ctx, const char *name, int min, int *val, int max, int step, float inc_per_pixel);
```

Parameter           | Description
--------------------|-----------------------------------------------------------
__ctx__             | レイアウト関数を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__name__            | ラベルとして、またユニークな識別子として使用される文字列
__min__             | アンダーフローが許されない最小値
__val__             | 変更する整数ポインタ
__max__             | オーバーフローが許されない最大値
__step__            | インクリメントボタン、デクリメントボタンでインクリメントを加算、減算する。
__inc_per_pixel__   | ドラッグ時の1画素あたりの加算・減算値


#### nk_property_float

渡された値を直接変更するFloatプロパティ

警告：同じラベルを使用してユニークなプロパティIDを生成するには、先頭に `#` を挿入することを確認してください。これは表示されませんが、正しい動作を保証するものです。

```c
void nk_property_float(struct nk_context *ctx, const char *name, float min, float *val, float max, float step, float inc_per_pixel);
```

Parameter           | Description
--------------------|-----------------------------------------------------------
__ctx__             | レイアウト関数を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__name__            | ラベルとして、またユニークな識別子として使用される文字列
__min__             | アンダーフローが許されない最小値
__val__             | 変更するフロートポインタ
__max__             | オーバーフローが許されない最大値
__step__            | インクリメントボタン、デクリメントボタンでインクリメントを加算、減算する。
__inc_per_pixel__   | ドラッグ時の1画素あたりの加算・減算値


#### nk_property_double

渡された値を直接変更するダブルプロパティ

警告：同じラベルを使用してユニークなプロパティIDを生成するには、先頭に `#` を挿入することを確認してください。これは表示されませんが、正しい動作を保証するものです。

```c
void nk_property_double(struct nk_context *ctx, const char *name, double min, double *val, double max, double step, double inc_per_pixel);
```

Parameter           | Description
--------------------|-----------------------------------------------------------
__ctx__             | レイアウト関数を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__name__            | ラベルとして、またユニークな識別子として使用される文字列
__min__             | アンダーフローが許されない最小値
__val__             | 変更されるダブルポインタ
__max__             | オーバーフローが許されない最大値
__step__            | インクリメントボタン、デクリメントボタンでインクリメントの加算、減算を行う。
__inc_per_pixel__   | ドラッグ時の1画素あたりの加算・減算値


#### nk_propertyi

整数型プロパティで、渡された値を変更し、新しい値を返します。

警告: 同じラベルを使用してユニークなプロパティIDを生成するには、先頭に `#` を挿入することを確認してください。これは表示されませんが、正しい動作を保証するものです。

```c
int nk_propertyi(struct nk_context *ctx, const char *name, int min, int val, int max, int step, float inc_per_pixel);
```

Parameter           | Description
--------------------|-----------------------------------------------------------
__ctx__             | レイアウト関数を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__name__            | ラベルとして、またユニークな識別子として使用される文字列
__min__             | アンダーフローが許されない最小値
__val__             | 修正されて返される現在の整数値
__max__             | オーバーフローが許されない最大値
__step__            | インクリメントボタン、デクリメントボタンでインクリメントを加算、減算する。
__inc_per_pixel__   | ドラッグ時の1画素あたりの加算・減算値

変更後の新しい整数値を返す

#### nk_propertyf

Float プロパティは、渡された値を変更し、新しい値を返します。

警告：同じラベルを使用してユニークなプロパティIDを生成するには、先頭に `#` を挿入することを確認してください。これは表示されませんが、正しい動作を保証するものです。

```c
float nk_propertyf(struct nk_context *ctx, const char *name, float min, float val, float max, float step, float inc_per_pixel);
```

Parameter           | Description
--------------------|-----------------------------------------------------------
__ctx__             | レイアウト関数を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__name__            | ラベルとして、またユニークな識別子として使用される文字列
__min__             | アンダーフローが許されない最小値
__val__             | 修正されて返される現在のフロート値
__max__             | オーバーフローが許されない最大値
__step__            | インクリメントボタン、デクリメントボタンでインクリメントを加算、減算する。
__inc_per_pixel__   | ドラッグ時の1画素あたりの加算・減算値

変更された新しい浮動小数点数値を返す


#### nk_propertyd

Float プロパティは、渡された値を変更し、新しい値を返します。

警告：同じラベルを使用してユニークなプロパティIDを生成するには、先頭に `#` を挿入することを確認してください。これは表示されませんが、正しい動作を保証するものです。

```c
float nk_propertyd(struct nk_context *ctx, const char *name, double min, double val, double max, double step, double inc_per_pixel);
```

Parameter           | Description
--------------------|-----------------------------------------------------------
__ctx__             | レイアウト関数を呼び出した後は、以前に初期化された `nk_context` 構造体を指す必要があります。
__name__            | ラベルとして、またユニークな識別子として使用される文字列
__min__             | アンダーフローが許されない最小値
__val__             | 修正されて返される現在のdouble値
__max__             | オーバーフローが許されない最大値
__step__            | インクリメントボタン、デクリメントボタンでインクリメントの加算、減算を行う。
__inc_per_pixel__   | ドラッグ時の1画素あたりの加算・減算値

新しい修正後の double 値を返す

        -XXX.XXX-  X...X  -         X...X         -X....X           -           X....X"
X...XXXXXXXXXXXXX...X -           "

## License

```
------------------------------------------------------------------------------
This software is available under 2 licenses -- choose whichever you prefer.
------------------------------------------------------------------------------
ALTERNATIVE A - MIT License
Copyright (c) 2016-2018 Micha Mettke
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
------------------------------------------------------------------------------
ALTERNATIVE B - Public Domain (www.unlicense.org)
This is free and unencumbered software released into the public domain.
Anyone is free to copy, modify, publish, use, compile, sell, or distribute this
software, either in source code form or as a compiled binary, for any purpose,
commercial or non-commercial, and by any means.
In jurisdictions that recognize copyright laws, the author or authors of this
software dedicate any and all copyright interest in the software to the public
domain. We make this dedication for the benefit of the public at large and to
the detriment of our heirs and successors. We intend this dedication to be an
overt act of relinquishment in perpetuity of all present and future rights to
this software under copyright law.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
------------------------------------------------------------------------------
```


## Changelog

```
[date][x.yy.zz]-[description]
-[date]: date on which the change has been pushed
-[x.yy.zz]: Numerical version string representation. Each version number on the right
            resets back to zero if version on the left is incremented.
   - [x]: Major version with API and library breaking changes
   - [yy]: Minor version with non-breaking API and library changes
   - [zz]: Bug fix version with no direct changes to API
- 2020/04/09 (4.02.1) - Removed unused nk_sqrt function to fix compiler warnings
                      - Fixed compiler warnings if you bring your own methods for
                       nk_cos/nk_sin/nk_strtod/nk_memset/nk_memcopy/nk_dtoa
- 2020/04/06 (4.01.10) - Fix bug: Do not use pool before checking for NULL
- 2020/03/22 (4.01.9) - Fix bug where layout state wasn't restored correctly after
                       popping a tree.
- 2020/03/11 (4.01.8) - Fix bug where padding is subtracted from widget
- 2020/03/06 (4.01.7) - Fix bug where width padding was applied twice
- 2020/02/06 (4.01.6) - Update stb_truetype.h and stb_rect_pack.h and separate them
- 2019/12/10 (4.01.5) - Fix off-by-one error in NK_INTERSECT
- 2019/10/09 (4.01.4) - Fix bug for autoscrolling in nk_do_edit
- 2019/09/20 (4.01.3) - Fixed a bug wherein combobox cannot be closed by clicking the header
                       when NK_BUTTON_TRIGGER_ON_RELEASE is defined.
- 2019/09/10 (4.01.2) - Fixed the nk_cos function, which deviated significantly.
- 2019/09/08 (4.01.1) - Fixed a bug wherein re-baking of fonts caused a segmentation
                       fault due to dst_font->glyph_count not being zeroed on subsequent
                       bakes of the same set of fonts.
- 2019/06/23 (4.01.0) - Added nk_***_get_scroll and nk_***_set_scroll for groups, windows, and popups.
- 2019/06/12 (4.00.3) - Fix panel background drawing bug.
- 2018/10/31 (4.00.2) - Added NK_KEYSTATE_BASED_INPUT to "fix" state based backends
                       like GLFW without breaking key repeat behavior on event based.
- 2018/04/01 (4.00.1) - Fixed calling `nk_convert` multiple time per single frame.
- 2018/04/01 (4.00.0) - BREAKING CHANGE: nk_draw_list_clear no longer tries to
                       clear provided buffers. So make sure to either free
                       or clear each passed buffer after calling nk_convert.
- 2018/02/23 (3.00.6) - Fixed slider dragging behavior.
- 2018/01/31 (3.00.5) - Fixed overcalculation of cursor data in font baking process.
- 2018/01/31 (3.00.4) - Removed name collision with stb_truetype.
- 2018/01/28 (3.00.3) - Fixed panel window border drawing bug.
- 2018/01/12 (3.00.2) - Added `nk_group_begin_titled` for separated group identifier and title.
- 2018/01/07 (3.00.1) - Started to change documentation style.
- 2018/01/05 (3.00.0) - BREAKING CHANGE: The previous color picker API was broken
                       because of conversions between float and byte color representation.
                       Color pickers now use floating point values to represent
                       HSV values. To get back the old behavior I added some additional
                       color conversion functions to cast between nk_color and
                       nk_colorf.
- 2017/12/23 (2.00.7) - Fixed small warning.
- 2017/12/23 (2.00.7) - Fixed `nk_edit_buffer` behavior if activated to allow input.
- 2017/12/23 (2.00.7) - Fixed modifyable progressbar dragging visuals and input behavior.
- 2017/12/04 (2.00.6) - Added formatted string tooltip widget.
- 2017/11/18 (2.00.5) - Fixed window becoming hidden with flag `NK_WINDOW_NO_INPUT`.
- 2017/11/15 (2.00.4) - Fixed font merging.
- 2017/11/07 (2.00.3) - Fixed window size and position modifier functions.
- 2017/09/14 (2.00.2) - Fixed `nk_edit_buffer` and `nk_edit_focus` behavior.
- 2017/09/14 (2.00.1) - Fixed window closing behavior.
- 2017/09/14 (2.00.0) - BREAKING CHANGE: Modifying window position and size functions now
                       require the name of the window and must happen outside the window
                       building process (between function call nk_begin and nk_end).
- 2017/09/11 (1.40.9) - Fixed window background flag if background window is declared last.
- 2017/08/27 (1.40.8) - Fixed `nk_item_is_any_active` for hidden windows.
- 2017/08/27 (1.40.7) - Fixed window background flag.
- 2017/07/07 (1.40.6) - Fixed missing clipping rect check for hovering/clicked
                       query for widgets.
- 2017/07/07 (1.40.5) - Fixed drawing bug for vertex output for lines and stroked
                       and filled rectangles.
- 2017/07/07 (1.40.4) - Fixed bug in nk_convert trying to add windows that are in
                       process of being destroyed.
- 2017/07/07 (1.40.3) - Fixed table internal bug caused by storing table size in
                       window instead of directly in table.
- 2017/06/30 (1.40.2) - Removed unneeded semicolon in C++ NK_ALIGNOF macro.
- 2017/06/30 (1.40.1) - Fixed drawing lines smaller or equal zero.
- 2017/06/08 (1.40.0) - Removed the breaking part of last commit. Auto layout now only
                       comes in effect if you pass in zero was row height argument.
- 2017/06/08 (1.40.0) - BREAKING CHANGE: while not directly API breaking it will change
                       how layouting works. From now there will be an internal minimum
                       row height derived from font height. If you need a row smaller than
                       that you can directly set it by `nk_layout_set_min_row_height` and
                       reset the value back by calling `nk_layout_reset_min_row_height.
- 2017/06/08 (1.39.1) - Fixed property text edit handling bug caused by past `nk_widget` fix.
- 2017/06/08 (1.39.0) - Added function to retrieve window space without calling a `nk_layout_xxx` function.
- 2017/06/06 (1.38.5) - Fixed `nk_convert` return flag for command buffer.
- 2017/05/23 (1.38.4) - Fixed activation behavior for widgets partially clipped.
- 2017/05/10 (1.38.3) - Fixed wrong min window size mouse scaling over boundaries.
- 2017/05/09 (1.38.2) - Fixed vertical scrollbar drawing with not enough space.
- 2017/05/09 (1.38.1) - Fixed scaler dragging behavior if window size hits minimum size.
- 2017/05/06 (1.38.0) - Added platform double-click support.
- 2017/04/20 (1.37.1) - Fixed key repeat found inside glfw demo backends.
- 2017/04/20 (1.37.0) - Extended properties with selection and clipboard support.
- 2017/04/20 (1.36.2) - Fixed #405 overlapping rows with zero padding and spacing.
- 2017/04/09 (1.36.1) - Fixed #403 with another widget float error.
- 2017/04/09 (1.36.0) - Added window `NK_WINDOW_NO_INPUT` and `NK_WINDOW_NOT_INTERACTIVE` flags.
- 2017/04/09 (1.35.3) - Fixed buffer heap corruption.
- 2017/03/25 (1.35.2) - Fixed popup overlapping for `NK_WINDOW_BACKGROUND` windows.
- 2017/03/25 (1.35.1) - Fixed windows closing behavior.
- 2017/03/18 (1.35.0) - Added horizontal scroll requested in #377.
- 2017/03/18 (1.34.3) - Fixed long window header titles.
- 2017/03/04 (1.34.2) - Fixed text edit filtering.
- 2017/03/04 (1.34.1) - Fixed group closable flag.
- 2017/02/25 (1.34.0) - Added custom draw command for better language binding support.
- 2017/01/24 (1.33.0) - Added programmatic way to remove edit focus.
- 2017/01/24 (1.32.3) - Fixed wrong define for basic type definitions for windows.
- 2017/01/21 (1.32.2) - Fixed input capture from hidden or closed windows.
- 2017/01/21 (1.32.1) - Fixed slider behavior and drawing.
- 2017/01/13 (1.32.0) - Added flag to put scaler into the bottom left corner.
- 2017/01/13 (1.31.0) - Added additional row layouting method to combine both
                       dynamic and static widgets.
- 2016/12/31 (1.30.0) - Extended scrollbar offset from 16-bit to 32-bit.
- 2016/12/31 (1.29.2) - Fixed closing window bug of minimized windows.
- 2016/12/03 (1.29.1) - Fixed wrapped text with no seperator and C89 error.
- 2016/12/03 (1.29.0) - Changed text wrapping to process words not characters.
- 2016/11/22 (1.28.6) - Fixed window minimized closing bug.
- 2016/11/19 (1.28.5) - Fixed abstract combo box closing behavior.
- 2016/11/19 (1.28.4) - Fixed tooltip flickering.
- 2016/11/19 (1.28.3) - Fixed memory leak caused by popup repeated closing.
- 2016/11/18 (1.28.2) - Fixed memory leak caused by popup panel allocation.
- 2016/11/10 (1.28.1) - Fixed some warnings and C++ error.
- 2016/11/10 (1.28.0) - Added additional `nk_button` versions which allows to directly
                       pass in a style struct to change buttons visual.
- 2016/11/10 (1.27.0) - Added additional `nk_tree` versions to support external state
                       storage. Just like last the `nk_group` commit the main
                       advantage is that you optionally can minimize nuklears runtime
                       memory consumption or handle hash collisions.
- 2016/11/09 (1.26.0) - Added additional `nk_group` version to support external scrollbar
                       offset storage. Main advantage is that you can externalize
                       the memory management for the offset. It could also be helpful
                       if you have a hash collision in `nk_group_begin` but really
                       want the name. In addition I added `nk_list_view` which allows
                       to draw big lists inside a group without actually having to
                       commit the whole list to nuklear (issue #269).
- 2016/10/30 (1.25.1) - Fixed clipping rectangle bug inside `nk_draw_list`.
- 2016/10/29 (1.25.0) - Pulled `nk_panel` memory management into nuklear and out of
                       the hands of the user. From now on users don't have to care
                       about panels unless they care about some information. If you
                       still need the panel just call `nk_window_get_panel`.
- 2016/10/21 (1.24.0) - Changed widget border drawing to stroked rectangle from filled
                       rectangle for less overdraw and widget background transparency.
- 2016/10/18 (1.23.0) - Added `nk_edit_focus` for manually edit widget focus control.
- 2016/09/29 (1.22.7) - Fixed deduction of basic type in non `<stdint.h>` compilation.
- 2016/09/29 (1.22.6) - Fixed edit widget UTF-8 text cursor drawing bug.
- 2016/09/28 (1.22.5) - Fixed edit widget UTF-8 text appending/inserting/removing.
- 2016/09/28 (1.22.4) - Fixed drawing bug inside edit widgets which offset all text
                       text in every edit widget if one of them is scrolled.
- 2016/09/28 (1.22.3) - Fixed small bug in edit widgets if not active. The wrong
                       text length is passed. It should have been in bytes but
                       was passed as glyphs.
- 2016/09/20 (1.22.2) - Fixed color button size calculation.
- 2016/09/20 (1.22.1) - Fixed some `nk_vsnprintf` behavior bugs and removed `<stdio.h>`
                       again from `NK_INCLUDE_STANDARD_VARARGS`.
- 2016/09/18 (1.22.0) - C89 does not support vsnprintf only C99 and newer as well
                       as C++11 and newer. In addition to use vsnprintf you have
                       to include <stdio.h>. So just defining `NK_INCLUDE_STD_VAR_ARGS`
                       is not enough. That behavior is now fixed. By default if
                       both varargs as well as stdio is selected I try to use
                       vsnprintf if not possible I will revert to vsprintf. If
                       varargs but not stdio was defined I will use my own function.
- 2016/09/15 (1.21.2) - Fixed panel `close` behavior for deeper panel levels.
- 2016/09/15 (1.21.1) - Fixed C++ errors and wrong argument to `nk_panel_get_xxxx`.
- 2016/09/13 (1.21.0) - !BREAKING! Fixed nonblocking popup behavior in menu, combo,
                       and contextual which prevented closing in y-direction if
                       popup did not reach max height.
                       In addition the height parameter was changed into vec2
                       for width and height to have more control over the popup size.
- 2016/09/13 (1.20.3) - Cleaned up and extended type selection.
- 2016/09/13 (1.20.2) - Fixed slider behavior hopefully for the last time. This time
                       all calculation are correct so no more hackery.
- 2016/09/13 (1.20.1) - Internal change to divide window/panel flags into panel flags and types.
                       Suprisinly spend years in C and still happened to confuse types
                       with flags. Probably something to take note.
- 2016/09/08 (1.20.0) - Added additional helper function to make it easier to just
                       take the produced buffers from `nk_convert` and unplug the
                       iteration process from `nk_context`. So now you can
                       just use the vertex,element and command buffer + two pointer
                       inside the command buffer retrieved by calls `nk__draw_begin`
                       and `nk__draw_end` and macro `nk_draw_foreach_bounded`.
- 2016/09/08 (1.19.0) - Added additional asserts to make sure every `nk_xxx_begin` call
                       for windows, popups, combobox, menu and contextual is guarded by
                       `if` condition and does not produce false drawing output.
- 2016/09/08 (1.18.0) - Changed confusing name for `NK_SYMBOL_RECT_FILLED`, `NK_SYMBOL_RECT`
                       to hopefully easier to understand `NK_SYMBOL_RECT_FILLED` and
                       `NK_SYMBOL_RECT_OUTLINE`.
- 2016/09/08 (1.17.0) - Changed confusing name for `NK_SYMBOL_CIRLCE_FILLED`, `NK_SYMBOL_CIRCLE`
                       to hopefully easier to understand `NK_SYMBOL_CIRCLE_FILLED` and
                       `NK_SYMBOL_CIRCLE_OUTLINE`.
- 2016/09/08 (1.16.0) - Added additional checks to select correct types if `NK_INCLUDE_FIXED_TYPES`
                       is not defined by supporting the biggest compiler GCC, clang and MSVC.
- 2016/09/07 (1.15.3) - Fixed `NK_INCLUDE_COMMAND_USERDATA` define to not cause an error.
- 2016/09/04 (1.15.2) - Fixed wrong combobox height calculation.
- 2016/09/03 (1.15.1) - Fixed gaps inside combo boxes in OpenGL.
- 2016/09/02 (1.15.0) - Changed nuklear to not have any default vertex layout and
                       instead made it user provided. The range of types to convert
                       to is quite limited at the moment, but I would be more than
                       happy to accept PRs to add additional.
- 2016/08/30 (1.14.2) - Removed unused variables.
- 2016/08/30 (1.14.1) - Fixed C++ build errors.
- 2016/08/30 (1.14.0) - Removed mouse dragging from SDL demo since it does not work correctly.
- 2016/08/30 (1.13.4) - Tweaked some default styling variables.
- 2016/08/30 (1.13.3) - Hopefully fixed drawing bug in slider, in general I would
                       refrain from using slider with a big number of steps.
- 2016/08/30 (1.13.2) - Fixed close and minimize button which would fire even if the
                       window was in Read Only Mode.
- 2016/08/30 (1.13.1) - Fixed popup panel padding handling which was previously just
                       a hack for combo box and menu.
- 2016/08/30 (1.13.0) - Removed `NK_WINDOW_DYNAMIC` flag from public API since
                       it is bugged and causes issues in window selection.
- 2016/08/30 (1.12.0) - Removed scaler size. The size of the scaler is now
                       determined by the scrollbar size.
- 2016/08/30 (1.11.2) - Fixed some drawing bugs caused by changes from 1.11.0.
- 2016/08/30 (1.11.1) - Fixed overlapping minimized window selection.
- 2016/08/30 (1.11.0) - Removed some internal complexity and overly complex code
                       handling panel padding and panel border.
- 2016/08/29 (1.10.0) - Added additional height parameter to `nk_combobox_xxx`.
- 2016/08/29 (1.10.0) - Fixed drawing bug in dynamic popups.
- 2016/08/29 (1.10.0) - Added experimental mouse scrolling to popups, menus and comboboxes.
- 2016/08/26 (1.10.0) - Added window name string prepresentation to account for
                       hash collisions. Currently limited to `NK_WINDOW_MAX_NAME`
                       which in term can be redefined if not big enough.
- 2016/08/26 (1.10.0) - Added stacks for temporary style/UI changes in code.
- 2016/08/25 (1.10.0) - Changed `nk_input_is_key_pressed` and 'nk_input_is_key_released'
                       to account for key press and release happening in one frame.
- 2016/08/25 (1.10.0) - Added additional nk_edit flag to directly jump to the end on activate.
- 2016/08/17 (1.09.6) - Removed invalid check for value zero in `nk_propertyx`.
- 2016/08/16 (1.09.5) - Fixed ROM mode for deeper levels of popup windows parents.
- 2016/08/15 (1.09.4) - Editbox are now still active if enter was pressed with flag
                       `NK_EDIT_SIG_ENTER`. Main reasoning is to be able to keep
                       typing after committing.
- 2016/08/15 (1.09.4) - Removed redundant code.
- 2016/08/15 (1.09.4) - Fixed negative numbers in `nk_strtoi` and remove unused variable.
- 2016/08/15 (1.09.3) - Fixed `NK_WINDOW_BACKGROUND` flag behavior to select a background
                       window only as selected by hovering and not by clicking.
- 2016/08/14 (1.09.2) - Fixed a bug in font atlas which caused wrong loading
                       of glyphs for font with multiple ranges.
- 2016/08/12 (1.09.1) - Added additional function to check if window is currently
                       hidden and therefore not visible.
- 2016/08/12 (1.09.1) - nk_window_is_closed now queries the correct flag `NK_WINDOW_CLOSED`
                       instead of the old flag `NK_WINDOW_HIDDEN`.
- 2016/08/09 (1.09.0) - Added additional double version to nk_property and changed
                       the underlying implementation to not cast to float and instead
                       work directly on the given values.
- 2016/08/09 (1.08.0) - Added additional define to overwrite library internal
                       floating pointer number to string conversion for additional
                       precision.
- 2016/08/09 (1.08.0) - Added additional define to overwrite library internal
                       string to floating point number conversion for additional
                       precision.
- 2016/08/08 (1.07.2) - Fixed compiling error without define `NK_INCLUDE_FIXED_TYPE`.
- 2016/08/08 (1.07.1) - Fixed possible floating point error inside `nk_widget` leading
                       to wrong wiget width calculation which results in widgets falsely
                       becoming tagged as not inside window and cannot be accessed.
- 2016/08/08 (1.07.0) - Nuklear now differentiates between hiding a window (NK_WINDOW_HIDDEN) and
                       closing a window (NK_WINDOW_CLOSED). A window can be hidden/shown
                       by using `nk_window_show` and closed by either clicking the close
                       icon in a window or by calling `nk_window_close`. Only closed
                       windows get removed at the end of the frame while hidden windows
                       remain.
- 2016/08/08 (1.06.0) - Added `nk_edit_string_zero_terminated` as a second option to
                       `nk_edit_string` which takes, edits and outputs a '\0' terminated string.
- 2016/08/08 (1.05.4) - Fixed scrollbar auto hiding behavior.
- 2016/08/08 (1.05.3) - Fixed wrong panel padding selection in `nk_layout_widget_space`.
- 2016/08/07 (1.05.2) - Fixed old bug in dynamic immediate mode layout API, calculating
                       wrong item spacing and panel width.
- 2016/08/07 (1.05.1) - Hopefully finally fixed combobox popup drawing bug.
- 2016/08/07 (1.05.0) - Split varargs away from `NK_INCLUDE_STANDARD_IO` into own
                       define `NK_INCLUDE_STANDARD_VARARGS` to allow more fine
                       grained controlled over library includes.
- 2016/08/06 (1.04.5) - Changed memset calls to `NK_MEMSET`.
- 2016/08/04 (1.04.4) - Fixed fast window scaling behavior.
- 2016/08/04 (1.04.3) - Fixed window scaling, movement bug which appears if you
                       move/scale a window and another window is behind it.
                       If you are fast enough then the window behind gets activated
                       and the operation is blocked. I now require activating
                       by hovering only if mouse is not pressed.
- 2016/08/04 (1.04.2) - Fixed changing fonts.
- 2016/08/03 (1.04.1) - Fixed `NK_WINDOW_BACKGROUND` behavior.
- 2016/08/03 (1.04.0) - Added color parameter to `nk_draw_image`.
- 2016/08/03 (1.04.0) - Added additional window padding style attributes for
                       sub windows (combo, menu, ...).
- 2016/08/03 (1.04.0) - Added functions to show/hide software cursor.
- 2016/08/03 (1.04.0) - Added `NK_WINDOW_BACKGROUND` flag to force a window
                       to be always in the background of the screen.
- 2016/08/03 (1.03.2) - Removed invalid assert macro for NK_RGB color picker.
- 2016/08/01 (1.03.1) - Added helper macros into header include guard.
- 2016/07/29 (1.03.0) - Moved the window/table pool into the header part to
                       simplify memory management by removing the need to
                       allocate the pool.
- 2016/07/29 (1.02.0) - Added auto scrollbar hiding window flag which if enabled
                       will hide the window scrollbar after NK_SCROLLBAR_HIDING_TIMEOUT
                       seconds without window interaction. To make it work
                       you have to also set a delta time inside the `nk_context`.
- 2016/07/25 (1.01.1) - Fixed small panel and panel border drawing bugs.
- 2016/07/15 (1.01.0) - Added software cursor to `nk_style` and `nk_context`.
- 2016/07/15 (1.01.0) - Added const correctness to `nk_buffer_push' data argument.
- 2016/07/15 (1.01.0) - Removed internal font baking API and simplified
                       font atlas memory management by converting pointer
                       arrays for fonts and font configurations to lists.
- 2016/07/15 (1.00.0) - Changed button API to use context dependent button
                       behavior instead of passing it for every function call.
```

## Gallery

![Figure [blue]: Feature overview with blue color styling](https://cloud.githubusercontent.com/assets/8057201/13538240/acd96876-e249-11e5-9547-5ac0b19667a0.png)
![Figure [red]: Feature overview with red color styling](https://cloud.githubusercontent.com/assets/8057201/13538243/b04acd4c-e249-11e5-8fd2-ad7744a5b446.png)
![Figure [widgets]: Widget overview](https://cloud.githubusercontent.com/assets/8057201/11282359/3325e3c6-8eff-11e5-86cb-cf02b0596087.png)
![Figure [blackwhite]: Black and white](https://cloud.githubusercontent.com/assets/8057201/11033668/59ab5d04-86e5-11e5-8091-c56f16411565.png)
![Figure [filexp]: File explorer](https://cloud.githubusercontent.com/assets/8057201/10718115/02a9ba08-7b6b-11e5-950f-adacdd637739.png)
![Figure [opengl]: OpenGL Editor](https://cloud.githubusercontent.com/assets/8057201/12779619/2a20d72c-ca69-11e5-95fe-4edecf820d5c.png)
![Figure [nodedit]: Node Editor](https://cloud.githubusercontent.com/assets/8057201/9976995/e81ac04a-5ef7-11e5-872b-acd54fbeee03.gif)
![Figure [skinning]: Using skinning in Nuklear](https://cloud.githubusercontent.com/assets/8057201/15991632/76494854-30b8-11e6-9555-a69840d0d50b.png)
![Figure [bf]: Heavy modified version](https://cloud.githubusercontent.com/assets/8057201/14902576/339926a8-0d9c-11e6-9fee-a8b73af04473.png)

## Credits

Developed by Micha Mettke and every direct or indirect github contributor. 

Embeds [stb_texedit](https://github.com/nothings/stb/blob/master/stb_textedit.h), [stb_truetype](https://github.com/nothings/stb/blob/master/stb_truetype.h) and [stb_rectpack](https://github.com/nothings/stb/blob/master/stb_rect_pack.h) by Sean Barret (public domain) 

Uses [stddoc.c](https://github.com/r-lyeh/stddoc.c) from r-lyeh@github.com for documentation generation

Embeds ProggyClean.ttf font by Tristan Grimmer (MIT license).

Big thank you to Omar Cornut (ocornut@github) for his [imgui library](https://github.com/ocornut/imgui) and giving me the inspiration for this library, Casey Muratori for handmade hero and his original immediate mode graphical user interface idea and Sean Barret for his amazing single header libraries which restored my faith in libraries and brought me to create some of my own. Finally Apoorva Joshi for his single header file packer.