# imgui.h

> ソースからコメントを括り出して日本語に訳しています。

[[TOC]]

---

dear imgui, v1.89.9 WIP

## ヘッダー

### ヘルプ

- FAQはこちら `http://dearimgui.com/faq`
- 初めての方は、`imgui.cpp`の「プログラマーガイド」をお読みください。
- `imgui_demo.cpp`の `ImGui::ShowDemoWindow()` を呼び出して読む。`examples/`にある全てのアプリケーションがそうなっている。詳細、リンク、コメントについては `imgui.cpp` を読んでほしい。

### リソース

- よくあるご質問: `http://dearimgui.com/faq`
- ホームページ: `https://github.com/ocornut/imgui`
- リリース＆変更履歴: `https://github.com/ocornut/imgui/releases`
- ギャラリー: `https://github.com/ocornut/imgui/issues/6478` (スクリーンショットやビデオを投稿してください！)
- Wiki: `https://github.com/ocornut/imgui/wiki` (いいものがたくさんある)
- はじめに: `https://github.com/ocornut/imgui/wiki/Getting-Started`
- 用語集: `https://github.com/ocornut/imgui/wiki/Glossary`
- 課題とサポート: `https://github.com/ocornut/imgui/issues`
- テストとオートメーション: `https://github.com/ocornut/imgui_test_engine`

### 始めるには？

- `https://github.com/ocornut/imgui/wiki/Getting-Started`を読む
- コンパイル・リンク・実行・フォントの読み込みに問題がある初めてのユーザーの方へ: 上記のリソースで解決策が見つからない場合は、`https://github.com/ocornut/imgui/discussions` に投稿してください。

### ライブラリのバージョン

XYYZZとしてエンコードされた整数で、`#if`プリプロセッサの条件式で使用します。例えば、`'#if IMGUI_VERSION_NUM >= 12345'`。

```cpp
#define IMGUI_VERSION     "1.89.9 WIP"
#define IMGUI_VERSION_NUM 18984
#define IMGUI_HAS_TABLE
```

### このファイルのインデックス

- Header mess
- Forward declarations and basic types
- Dear ImGui end-user API functions
- Flags & Enumerations
- Helpers
  - Memory allocations macros
  - `ImVector<>`
- ImGuiStyle
- ImGuiIO
- Misc data structures
  - ImGuiInputTextCallbackData
  - ImGuiSizeCallbackData
  - ImGuiPayload
  - ImGuiTableSortSpecs
  - ImGuiTableColumnSortSpecs
- Helpers
  - ImGuiOnceUponAFrame
  - ImGuiTextFilter
  - ImGuiTextBuffer
  - ImGuiStorage
  - ImGuiListClipper
  - Math Operators
  - ImColor
- Drawing API
  - ImDrawCallback
  - ImDrawCmd
  - ImDrawIdx
  - ImDrawVert
  - ImDrawChannel
  - ImDrawListSplitter
  - ImDrawFlags
  - ImDrawListFlags
  - ImDrawList
  - ImDrawData
- Font API
  - ImFontConfig
  - ImFontGlyph
  - ImFontGlyphRangesBuilder
  - ImFontAtlasFlags
  - ImFontAtlas
  - ImFont
- Viewports
  - ImGuiViewportFlags
  - ImGuiViewport
- Platform Dependent Interfaces
  - ImGuiPlatformImeData
- Obsolete functions and types

```cpp
#pragma once
```

### コンパイル時オプションを含む設定ファイル

ビルドシステムから `imconfig.h` または `#define IMGUI_USER_CONFIG "myfilename.h"` を編集する。

```cpp
#ifdef IMGUI_USER_CONFIG
#include IMGUI_USER_CONFIG
#endif
#include "imconfig.h"

#ifndef IMGUI_DISABLE
```

## 乱雑なヘッダー

### インクルード

```cpp
#include <float.h>  // FLT_MIN, FLT_MAX
#include <stdarg.h> // va_list, va_start, va_end
#include <stddef.h> // ptrdiff_t, NULL
#include <string.h> // memset, memmove, memcpy, strlen, strchr, strcpy, strcmp
```

### すべてのAPIシンボル宣言の属性を定義する（例：WindowsのDLLの場合）

`IMGUI_API`はimguiのコア関数に使われ、`IMGUI_IMPL_API`はデフォルトのバックエンドファイル（`imgui_impl_xxx.h`）に使われます。共有ライブラリ経由でdear imguiを使用することは推奨されません。後方互換性も前方互換性も保証されないからです（また、dear imguiは呼び出しの多いAPIなので、関数呼び出しのオーバーヘッドも発生します）。

```cpp
#ifndef IMGUI_API
#define IMGUI_API
#endif
#ifndef IMGUI_IMPL_API
#define IMGUI_IMPL_API IMGUI_API
#endif
```

### ヘルパー・マクロ

```cpp
#ifndef IM_ASSERT
#include <assert.h>
#define IM_ASSERT(_EXPR)            assert(_EXPR)                               // You can override the default assert handler by editing imconfig.h
#endif
#define IM_ARRAYSIZE(_ARR)          ((int)(sizeof(_ARR) / sizeof(*(_ARR))))     // Size of a static C-style array. Don't use on pointers!
#define IM_UNUSED(_VAR)             ((void)(_VAR))                              // Used to silence "unused variable warnings". Often useful as asserts may be stripped out from final builds.
#define IM_OFFSETOF(_TYPE,_MEMBER)  offsetof(_TYPE, _MEMBER)                    // Offset of _MEMBER within _TYPE. Standardized as offsetof() in C++11
#define IMGUI_CHECKVERSION()        ImGui::DebugCheckVersionAndDataLayout(IMGUI_VERSION, sizeof(ImGuiIO), sizeof(ImGuiStyle), sizeof(ImVec2), sizeof(ImVec4), sizeof(ImDrawVert), sizeof(ImDrawIdx))
```

ヘルパー・マクロ - `IM_FMTARGS`、`IM_FMTLIST：printf`スタイルの警告をフォーマット関数に適用する

```cpp
#if !defined(IMGUI_USE_STB_SPRINTF) && defined(__MINGW32__) && !defined(__clang__)
#define IM_FMTARGS(FMT)             __attribute__((format(gnu_printf, FMT, FMT+1)))
#define IM_FMTLIST(FMT)             __attribute__((format(gnu_printf, FMT, 0)))
#elif !defined(IMGUI_USE_STB_SPRINTF) && (defined(__clang__) || defined(__GNUC__))
#define IM_FMTARGS(FMT)             __attribute__((format(printf, FMT, FMT+1)))
#define IM_FMTLIST(FMT)             __attribute__((format(printf, FMT, 0)))
#else
#define IM_FMTARGS(FMT)
#define IM_FMTLIST(FMT)
#endif
```

関数ヘッダー/フッターで、MSVCで最もアグレッシブなデバッグ実行時チェックの一部を無効にする（一部の単純/低レベル関数で使用される）

```cpp
#if defined(_MSC_VER) && !defined(__clang__)  && !defined(__INTEL_COMPILER) && !defined(IMGUI_DEBUG_PARANOID)
#define IM_MSVC_RUNTIME_CHECKS_OFF      __pragma(runtime_checks("",off))     __pragma(check_stack(off)) __pragma(strict_gs_check(push,off))
#define IM_MSVC_RUNTIME_CHECKS_RESTORE  __pragma(runtime_checks("",restore)) __pragma(check_stack())    __pragma(strict_gs_check(pop))
#else
#define IM_MSVC_RUNTIME_CHECKS_OFF
#define IM_MSVC_RUNTIME_CHECKS_RESTORE
#endif
```

### 警告

```cpp
#ifdef _MSC_VER
#pragma warning (push)
#pragma warning (disable: 26495)    // [Static Analyzer] Variable 'XXX' is uninitialized. Always initialize a member variable (type.6).
#endif
#if defined(__clang__)
#pragma clang diagnostic push
#if __has_warning("-Wunknown-warning-option")
#pragma clang diagnostic ignored "-Wunknown-warning-option"         // warning: unknown warning group 'xxx'
#endif
#pragma clang diagnostic ignored "-Wunknown-pragmas"                // warning: unknown warning group 'xxx'
#pragma clang diagnostic ignored "-Wold-style-cast"
#pragma clang diagnostic ignored "-Wzero-as-null-pointer-constant"
#pragma clang diagnostic ignored "-Wreserved-identifier"            // warning: identifier '_Xxx' is reserved because it starts with '_' followed by a capital letter
#elif defined(__GNUC__)
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wpragmas"          // warning: unknown option after '#pragma GCC diagnostic' kind
#pragma GCC diagnostic ignored "-Wclass-memaccess"  // [__GNUC__ >= 8] warning: 'memset/memcpy' clearing/writing an object of type 'xxxx' with no trivial copy-assignment; use assignment or value-initialization instead
#endif
```

## 前方宣言と基本型

### 前方宣言

```cpp
struct ImDrawChannel;
struct ImDrawCmd;
struct ImDrawData;
struct ImDrawList;
struct ImDrawListSharedData;
struct ImDrawListSplitter;
struct ImDrawVert;
struct ImFont;
struct ImFontAtlas;
struct ImFontBuilderIO;
struct ImFontConfig;
struct ImFontGlyph;
struct ImFontGlyphRangesBuilder; 
struct ImColor;
struct ImGuiContext;
struct ImGuiIO;
struct ImGuiInputTextCallbackData;
struct ImGuiKeyData;
struct ImGuiListClipper;
struct ImGuiOnceUponAFrame;
struct ImGuiPayload;
struct ImGuiPlatformImeData;
struct ImGuiSizeCallbackData;
struct ImGuiStorage;
struct ImGuiStyle;
struct ImGuiTableSortSpecs;
struct ImGuiTableColumnSortSpecs;
struct ImGuiTextBuffer;
struct ImGuiTextFilter;
struct ImGuiViewport;
```

| 名前                       | 説明                                                                                                   |
|----------------------------|--------------------------------------------------------------------------------------------------------|
| ImDrawChannel              | `ImDrawListSplitter`と`ImDrawList::ChannelsSplit()`で使用される、描画コマンドを順番通りに出力するための一時的なストレージ。     |
| ImDrawCmd                  | 親`ImDrawList`内の単一の描画コマンド (コールバックでない限り、一般的に1GPUドローコールにマッピングされます。)                             |
| ImDrawData                 | フレームをレンダリングするために必要なすべての描画コマンドリスト＋投影行列に使用する`pos`/`size`座標。                                  |
| ImDrawList                 | 単一の描画コマンドリスト (概念的には、動的な「メッシュ」ビルダーと見ることができる。)                                                 |
| ImDrawListSharedData       | 複数のドローリスト間で共有されるデータ (通常は親`ImGui`コンテキストが所有するが、自分で作成することもできる。)                             |
| ImDrawListSplitter         | 描画リストを異なるレイヤーに分割するヘルパー。                                                                           |
| ImDrawVert                 | 単一の頂点 (`pos + uv + col = 20` バイトでデフォルト。 `IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT` でレイアウトをオーバーライドする。) |
| ImFont                     | 親ImFontAtlas内の単一フォントのランタイムデータ                                                                      |
| ImFontAtlas                | 複数フォントのランタイムデータ、単一テクスチャへの複数フォントのベイク、TTF/OTFフォントローダー                                              |
| ImFontBuilderIO            | フォントビルダーへの不透明なインターフェース (`stb_truetype` または `FreeType`).                                             |
| ImFontConfig               | フォントの追加やフォントのマージ時の設定データ                                                                           |
| ImFontGlyph                | 単一のフォントグリフ (コードポイント + `ImFontAtlas`内の座標 + オフセット)                                                  |
| ImFontGlyphRangesBuilder   | テキスト/文字列データからグリフ範囲を構築するヘルパー                                                                     |
| ImColor                    | `u32`または`float4`に変換可能な色を作成するヘルパー関数 (`OBSOLETE`の使用は避けてください。)                                |
| ImGuiContext               | ImGuiのコンテキスト (`imgui_internal.h`をインクルードしない限り、不透明な構造体。)                                          |
| ImGuiIO                    | アプリケーションとImGui間の主な設定と入出力                                                                        |
| ImGuiInputTextCallbackData | カスタム `ImGuiInputTextCallback` を使用しているときに `InputText()` の状態を共有した。 (レア/上級用)                     |
| ImGuiKeyData               | `ImGuiIO`と`IsKeyDown()`、`IsKeyPressed()`などの関数のストレージ。                                                 |
| ImGuiListClipper           | 大量のアイテムを手動でクリップするヘルパー                                                                              |
| ImGuiOnceUponAFrame        | 1フレームに1回以下のコードブロックを実行するヘルパー                                                                       |
| ImGuiPayload               | ドラッグ・アンド・ドロップ操作用のユーザー・データ・ペイロード                                                                     |
| ImGuiPlatformImeData       | `io.SetPlatformImeDataFn()`関数用のプラットフォームIMEデータ。                                                      |
| ImGuiSizeCallbackData      | `SetNextWindowSizeConstraints()` 使用時のコールバックデータ (レア/上級用)                                          |
| ImGuiStorage               | `key->value` ストレージのヘルパー。                                                                               |
| ImGuiStyle                 | スタイリング/カラー用ランタイムデータ                                                                                   |
| ImGuiTableSortSpecs        | テーブルのソート仕様 (多くの場合、1つのカラムのソート仕様を扱うが、時にはもっと多くのカラムのソート仕様を扱うこともある。)                           |
| ImGuiTableColumnSortSpecs  | テーブルの1列のソート指定                                                                                       |
| ImGuiTextBuffer            | テキストバッファを保持し、そこに追加するヘルパー (~文字列ビルダー)                                                             |
| ImGuiTextFilter            | テキストフィルタを解析・適用するヘルパー (例 `"aaaaa[,bbbbb][,ccccc]"`)                                                |
| ImGuiViewport              | プラットフォーム・ウィンドウ（'master'ブランチでは常に1つ）、将来はプラットフォーム・モニターを表すかもしれない。                                      |

### 列挙型

- 強く型付けされた列挙型は制約が増えるので、あまり使わない。 (プライベート・コードで拡張できない、ビット・フィールドに型付けされたものを保存できない、反復時に余分なキャストが発生する。)

```cpp
enum ImGuiKey : int;            // -> enum ImGuiKey
enum ImGuiMouseSource : int;    // -> enum ImGuiMouseSource
typedef int ImGuiCol;           // -> enum ImGuiCol_
typedef int ImGuiCond;          // -> enum ImGuiCond_
typedef int ImGuiDataType;      // -> enum ImGuiDataType_
typedef int ImGuiDir;           // -> enum ImGuiDir_
typedef int ImGuiMouseButton;   // -> enum ImGuiMouseButton_
typedef int ImGuiMouseCursor;   // -> enum ImGuiMouseCursor_
typedef int ImGuiSortDirection; // -> enum ImGuiSortDirection_
typedef int ImGuiStyleVar;      // -> enum ImGuiStyleVar_
typedef int ImGuiTableBgTarget; // -> enum ImGuiTableBgTarget_
```

::: tip
以下にある名前をプログラミングIDEのナビゲーション機能を使って、実際のフラグ/列挙リストを見つける！ Visual Studio IDEではCTRL+comma ("Edit.GoToAll")はコメント内の記号をフォローできますが、CTRL+F12 ("Edit.GoToImplementation")はフォローできません。 Visual Assistがインストールされている場合：ALT+G（"VAssistX.GoToImplementation"）は、コメント内のシンボルをフォローすることもできます。
:::

| 名前                | 解説                                             |
|---------------------|-------------------------------------------------|
| ImGuiKey            | キー識別子 (`ImGuiKey_XXX` または `ImGuiMod_XXX` の値) |
| ImGuiMouseSource    | マウス入力ソース識別子（マウス、タッチスクリーン、ペン）                |
| ImGuiCol_           | スタイリングのためのカラー識別子                              |
| ImGuiCond_          | 多くの `Set*()` 関数の条件                          |
| ImGuiDataType_      | 主要なデータ型                                       |
| ImGuiDir_           | 方角                                             |
| ImGuiMouseButton_   | マウスボタンの識別子 (0=左、1=右、2=中)                   |
| ImGuiMouseCursor_   | マウスカーソルの形                                       |
| ImGuiSortDirection_ | ソート方向（昇順または降順）                             |
| ImGuiStyleVar_      | スタイリング用の変数識別子                              |
| ImGuiTableBgTarget_ | `TableSetBgColor()` の対象となる色。                  |

### フラグ

古いC++との互換性、オーバーヘッドなしにフラグとして使用できること、そしてこのファイルの先頭を汚さないために、intとして宣言されている。

```cpp
typedef int ImDrawFlags;           // -> enum ImDrawFlags_         
typedef int ImDrawListFlags;       // -> enum ImDrawListFlags_     
typedef int ImFontAtlasFlags;      // -> enum ImFontAtlasFlags_    
typedef int ImGuiBackendFlags;     // -> enum ImGuiBackendFlags_   
typedef int ImGuiButtonFlags;      // -> enum ImGuiButtonFlags_    
typedef int ImGuiColorEditFlags;   // -> enum ImGuiColorEditFlags_ 
typedef int ImGuiConfigFlags;      // -> enum ImGuiConfigFlags_    
typedef int ImGuiComboFlags;       // -> enum ImGuiComboFlags_     
typedef int ImGuiDragDropFlags;    // -> enum ImGuiDragDropFlags_  
typedef int ImGuiFocusedFlags;     // -> enum ImGuiFocusedFlags_   
typedef int ImGuiHoveredFlags;     // -> enum ImGuiHoveredFlags_   
typedef int ImGuiInputTextFlags;   // -> enum ImGuiInputTextFlags_ 
typedef int ImGuiKeyChord;         // -> ImGuiKey | ImGuiMod_XXX   
typedef int ImGuiPopupFlags;       // -> enum ImGuiPopupFlags_     
typedef int ImGuiSelectableFlags;  // -> enum ImGuiSelectableFlags_
typedef int ImGuiSliderFlags;      // -> enum ImGuiSliderFlags_    
typedef int ImGuiTabBarFlags;      // -> enum ImGuiTabBarFlags_    
typedef int ImGuiTabItemFlags;     // -> enum ImGuiTabItemFlags_   
typedef int ImGuiTableFlags;       // -> enum ImGuiTableFlags_     
typedef int ImGuiTableColumnFlags; // -> enum ImGuiTableColumnFlags
typedef int ImGuiTableRowFlags;    // -> enum ImGuiTableRowFlags_  
typedef int ImGuiTreeNodeFlags;    // -> enum ImGuiTreeNodeFlags_  
typedef int ImGuiViewportFlags;    // -> enum ImGuiViewportFlags_  
typedef int ImGuiWindowFlags;      // -> enum ImGuiWindowFlags_    
```

::: tip
実際にフラグ/列挙リストを見つけるには、下の名前をプログラミングIDEのナビゲーション機能を使ってください！Visual Studio IDEではCTRL+comma ("Edit.GoToAll")はコメント内のシンボルをフォローできますが、CTRL+F12 ("Edit.GoToImplementation")はフォローできません。Visual Assistがインストールされている場合ALT+G（「VAssistX.GoToImplementation」）でも、コメント内の記号をたどることができます。
:::


| 名前                     | 対象                                                  |
|--------------------------|-------------------------------------------------------|
| ImDrawFlags_             | ImDrawList関数                                        |
| ImDrawListFlags_         | ImDrawListインスタンス                                      |
| ImFontAtlasFlags_        | ImFontAtlasビルド                                        |
| ImGuiBackendFlags_       | io.BackendFlags                                       |
| ImGuiButtonFlags_        | InvisibleButton()                                     |
| ImGuiColorEditFlags_     | ColorEdit4(), ColorPicker4() など                       |
| ImGuiConfigFlags_        | io.ConfigFlags                                        |
| ImGuiComboFlags_         | BeginCombo()                                          |
| ImGuiDragDropFlags_      | BeginDragDropSource(), AcceptDragDropPayload()        |
| ImGuiFocusedFlags_       | IsWindowFocused()                                     |
| ImGuiHoveredFlags_       | IsItemHovered(), IsWindowHovered() など                 |
| ImGuiInputTextFlags_     | InputText(), InputTextMultiline()                     |
| ImGuiKey or ImGuiMod_XXX | ImGuiKeyと1つ以上のImGuiMod_XXX値とのORオプション。              |
| ImGuiPopupFlags_         | OpenPopup*(), BeginPopupContext*(), IsPopupOpen()     |
| ImGuiSelectableFlags_    | Selectable()                                          |
| ImGuiSliderFlags_        | DragFloat(), DragInt(), SliderFloat(), SliderInt() など |
| ImGuiTabBarFlags_        | BeginTabBar()                                         |
| ImGuiTabItemFlags_       | BeginTabItem()                                        |
| ImGuiTableFlags_         | BeginTable()                                          |
| ImGuiTableColumnFlags_   | TableSetupColumn()                                    |
| ImGuiTableRowFlags_      | TableNextRow()                                        |
| ImGuiTreeNodeFlags_      | TreeNode(), TreeNodeEx(), CollapsingHeader()          |
| ImGuiViewportFlags_      | ImGuiViewport                                         |
| ImGuiWindowFlags_        | Begin(), BeginChild()                                 |

### ImTexture

レンダラバックエンドがテクスチャを識別するためのユーザーデータ。コンパイル時に設定可能な型。

- 不透明な `void*` ポインタ以外のものを使うには、`imconfig.h` ファイルで `'#define ImTextureID MyTextureType*'` などでオーバーライドしてください。
- 詳細は`ImTextureID`に関するFAQを読んでください。

```cpp
#ifndef ImTextureID
typedef void* ImTextureID;
#endif
```

`ImTextureID`: デフォルト - ポインタまたは整数のフィッティングをポインタに格納する（ほとんどのレンダラーのバックエンドはこれでOKです）。

### ImDrawIdx

頂点インデックス。コンパイル時に設定可能な型。

- 16ビットインデックスを使用し、大きなメッシュを使用できるようにするには、バックエンドは `'io.BackendFlags |= ImGuiBackendFlags_RendererHasVtxOffset'` を設定し、`ImDrawCmd::VtxOffset` を処理する必要があります（推奨）。
- 32ビットインデックスを使用するには、`'#define ImDrawIdx unsigned int'` を `imconfig.h` ファイルでオーバーライドします。

```cpp
#ifndef ImDrawIdx
typedef unsigned short ImDrawIdx;
#endif
```

`ImDrawIdx`: デフォルト - 16ビット（レンダラーのバックエンドとの互換性を最大化するため）

### スカラー・データ型

```cpp
typedef unsigned int        ImGuiID;
typedef signed char         ImS8;
typedef unsigned char       ImU8;
typedef signed short        ImS16;
typedef unsigned short      ImU16;
typedef signed int          ImS32;
typedef unsigned int        ImU32;
typedef signed   long long  ImS64;
typedef unsigned long long  ImU64;
```

|名前|説明|
|---|---|
|ImGuiID| ウィジェットで使用される一意なID (通常は文字列のスタックをハッシュした結果)|
|ImS8  | 8ビット符号付き整数|
|ImU8  | 8ビット符号なし整数|
|ImS16 | 16ビット符号付き整数|
|ImU16 | 16ビット符号なし整数|
|ImS32 | 32ビット符号付き整数 == int|
|ImU32 | 32ビット符号なし整数（パックカラーを格納するためによく使われる）|
|ImS64 | 64ビット符号付き整数|
|ImU64 | 64ビット符号なし整数|

### 文字型

APIでは通常、UTF-8でエンコードされた文字列を使用する。これは、キーボード入力や表示に使用されるデコードされた文字専用のストレージです。

```cpp
typedef unsigned short ImWchar16;
typedef unsigned int ImWchar32;
#ifdef IMGUI_USE_WCHAR32
typedef ImWchar32 ImWchar;
#else
typedef ImWchar16 ImWchar;
#endif
```

|名前|解説|
|---|---|
|ImWchar16 | デコードされた単一のU16文字/コードポイント。文字列で使用する場合は、マルチバイトUTF-8としてエンコードします。|
|ImWchar32 | デコードされた単一のU32文字/コードポイント。文字列で使用する場合は、マルチバイトUTF-8としてエンコードします。|

ImWchar

設定可能なタイプ：

imconfig.hの'#define IMGUI_USE_WCHAR32'でオーバーライドし、Unicodeプレーン1-16をサポートする。

### コールバックと関数の型

```cpp
typedef int   (*ImGuiInputTextCallback)(ImGuiInputTextCallbackData* data);
typedef void  (*ImGuiSizeCallback)(ImGuiSizeCallbackData* data);
typedef void* (*ImGuiMemAllocFunc)(size_t sz, void* user_data);
typedef void  (*ImGuiMemFreeFunc)(void* ptr, void* user_data);
```

| 名前                   | 説明                                                 |
|------------------------|----------------------------------------------------|
| ImGuiInputTextCallback | `ImGui::InputText()` のコールバック関数。                    |
| ImGuiSizeCallback      | `ImGui::SetNextWindowSizeConstraints()` のコールバック関数。 |
| ImGuiMemAllocFunc      | `ImGui::SetAllocatorFunctions()` の関数シグネチャ          |
| ImGuiMemFreeFunc       | `ImGui::SetAllocatorFunctions()` の関数シグネチャ          |

### ImVec2

位置やサイズなどを格納するために使用される2Dベクトル。コンパイル時に設定可能な型。

これは API で頻繁に使用される型である。IM_VEC2_CLASS_EXTRA を使用して、暗黙のキャストを作成することを検討しましょう。

```cpp
IM_MSVC_RUNTIME_CHECKS_OFF
struct ImVec2
{
    float                                   x, y;
    constexpr ImVec2()                      : x(0.0f), y(0.0f) { }
    constexpr ImVec2(float _x, float _y)    : x(_x), y(_y) { }
    float& operator[] (size_t idx)          { IM_ASSERT(idx == 0 || idx == 1); return ((float*)(void*)(char*)this)[idx]; }
    float  operator[] (size_t idx) const    { IM_ASSERT(idx == 0 || idx == 1); return ((const float*)(const void*)(const char*)this)[idx]; }
#ifdef IM_VEC2_CLASS_EXTRA
    IM_VEC2_CLASS_EXTRA
#endif
};
```

`float& operator[] (size_t idx)`: この[]演算子を使うことはほとんどないので、アサートのオーバーヘッドは問題ない。

`IM_VEC2_CLASS_EXTRA`: imconfig.hで追加のコンストラクタと暗黙のキャスト演算子を定義し、数学型とImVec2の間を行き来できるようにする。

### ImVec4

クリッピング矩形、色などを格納するために使用される4Dベクター。コンパイル時に設定可能な型。

```cpp
struct ImVec4
{
    float                                                     x, y, z, w;
    constexpr ImVec4()                                        : x(0.0f), y(0.0f), z(0.0f), w(0.0f) { }
    constexpr ImVec4(float _x, float _y, float _z, float _w)  : x(_x), y(_y), z(_z), w(_w) { }
#ifdef IM_VEC4_CLASS_EXTRA
    IM_VEC4_CLASS_EXTRA
#endif
};
IM_MSVC_RUNTIME_CHECKS_RESTORE
```

`IM_VEC4_CLASS_EXTRA`: imconfig.hで追加のコンストラクタと暗黙のキャスト演算子を定義し、数学型とImVec4の間を行き来できるようにする。

## Dear ImGuiエンドユーザーAPI関数

`ImGui::`は名前空間なので、`ImGui::`の関数を別のファイルに追加することができます。 imguiのソースファイルは変更しないでください！

```cpp
namespace ImGui
{
```

## コンテキストの作成とアクセス

- 各コンテキストはデフォルトで独自の`ImFontAtlas`を作成する。自分でインスタンス化して `CreateContext()` に渡せば、コンテキスト間でフォントアトラスを共有できる。
- DLLユーザー：ヒープとグローバルはDLL境界を越えて共有されません！呼び出す静的/DLL境界ごとに `SetCurrentContext()` + `SetAllocatorFunctions()` を呼び出す必要があります。詳しくはimgui.cppの「コンテキストとメモリ・アロケータ」のセクションを読んでほしい。

```cpp
IMGUI_API ImGuiContext* CreateContext(ImFontAtlas* shared_font_atlas = NULL);
IMGUI_API void          DestroyContext(ImGuiContext* ctx = NULL);
IMGUI_API ImGuiContext* GetCurrentContext();
IMGUI_API void          SetCurrentContext(ImGuiContext* ctx);
```

`DestroyContext()`: NULL = 現在のコンテキストを破棄する

### メイン

```cpp
IMGUI_API ImGuiIO&    GetIO();      
IMGUI_API ImGuiStyle& GetStyle();   
IMGUI_API void        NewFrame();   
IMGUI_API void        EndFrame();   
IMGUI_API void        Render();     
IMGUI_API ImDrawData* GetDrawData();
```

| 名前          | 説明                                                                                                                                                                                                             |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GetIO()       | IO構造にアクセスする（マウス/キーボード/ゲームパッド入力、時間、各種設定オプション/フラグ）                                                                                                                                                       |
| GetStyle()    | スタイル構造体（色、サイズ）にアクセスします。フレームの途中でスタイルを変更するには、常に `PushStyleCol()` や `PushStyleVar()` を使用します！                                                                                                             |
| NewFrame()    | この時点から`Render()`/`EndFrame()`まで、どのようなコマンドでも実行できます。                                                                                                                                                           |
| EndFrame()    | `Render()`によって自動的に呼び出されます。データをレンダリングする必要がない（レンダリングをスキップする）場合は、`Render()`を使わずに`EndFrame()`を呼び出すことができます...しかし、すでにCPUを浪費していることになります！レンダリングする必要がない場合は、ウィンドウを作成せず、`NewFrame()`を呼び出さない方がよいでしょう！ |
| Render()      | ImGuiの親フレームを終了し、描画データを確定します。その後、`GetDrawData()`を呼び出すことができます。                                                                                                                                           |
| GetDrawData() | これは、`Render()` の後、次に `NewFrame()` を呼び出すまで有効です。                                                                                                                                                             |

### デモ・デバッグ・情報

```cpp
IMGUI_API void        ShowDemoWindow(bool* p_open = NULL);     
IMGUI_API void        ShowMetricsWindow(bool* p_open = NULL);  
IMGUI_API void        ShowDebugLogWindow(bool* p_open = NULL); 
IMGUI_API void        ShowStackToolWindow(bool* p_open = NULL);
IMGUI_API void        ShowAboutWindow(bool* p_open = NULL);    
IMGUI_API void        ShowStyleEditor(ImGuiStyle* ref = NULL); 
IMGUI_API bool        ShowStyleSelector(const char* label);    
IMGUI_API void        ShowFontSelector(const char* label);     
IMGUI_API void        ShowUserGuide();                         
IMGUI_API const char* GetVersion();                            
```

| 名前                  | 説明                                                                                                   |
|-----------------------|------------------------------------------------------------------------------------------------------|
| ShowDemoWindow()      | Demoウィンドウを作成し、ImGuiのほとんどの機能をデモンストレーションします。これを呼び出して、ライブラリについて学びましょう！アプリケーションで常に利用できるようにしましょう！ |
| ShowMetricsWindow()   | Metrics/Debuggerウィンドウを作成します。ImGui内部（ウィンドウ、描画コマンド、様々な内部状態など）を表示します。                        |
| ShowDebugLogWindow()  | 重要なimguiイベントの簡易ログを表示します。                                                                         |
| ShowStackToolWindow() | スタックツールウィンドウを作成し、マウスでアイテムにカーソルを合わせると、一意のIDのソースに関する情報を照会できます。                                 |
| ShowAboutWindow()     | ImGuiのバージョン、クレジット、ビルド/システム情報を表示します。                                                                |
| ShowStyleEditor()     | ImGuiStyle構造体の参照を渡して、比較したり、元に戻したり、保存したりできます（そうしないと、デフォルトのスタイルを使用します）。                    |
| ShowStyleSelector()   | スタイル・セレクタ・ブロック（ウィンドウではない）を追加する。                                                                      |
| ShowFontSelector()    | フォントセレクタブロック（ウィンドウではない）を追加します。                                                                       |
| ShowUserGuide()       | 基本的なヘルプ/情報ブロック（ウィンドウではない）を追加：エンドユーザーとしてImGuiを操作する方法（マウス/キーボードコントロール）。                       |
| GetVersion()          | コンパイルされたバージョンの文字列を取得する。例えば、"1.80 WIP"（基本的にはimgui.cppのコンパイルされたバージョンからIMGUI_VERSIONの値を取得する）。 |

### スタイル

```cpp
IMGUI_API void StyleColorsDark(ImGuiStyle* dst = NULL);   
IMGUI_API void StyleColorsLight(ImGuiStyle* dst = NULL);  
IMGUI_API void StyleColorsClassic(ImGuiStyle* dst = NULL);
```

| 名前                 | 説明                            |
|----------------------|---------------------------------|
| StyleColorsDark()    | 新しい推奨スタイル（デフォルト）             |
| StyleColorsLight()   | ボーダーと太めのカスタムフォントとの組み合わせが最適 |
| StyleColorsClassic() | クラシックなimguiスタイル                 |

### ウィンドウ

- `Begin()` = ウィンドウをスタックにプッシュし、追加を開始する。 `End()` = スタックからウィンドウをポップする。
- `bool* p_open != NULL`を渡すと、ウィンドウの右上隅にウィンドウを閉じるウィジェットが表示され、クリックするとブール値が`false`に設定される。
- `Begin()`/`End()`ペアを複数回呼び出すことで、同じフレーム中に同じウィンドウに複数回追記することができます。`flags`や`p_open`などのいくつかの情報は、最初に `Begin()` を呼び出したときのみ考慮される。
- `Begin()`は`false`を返し、ウィンドウが折りたたまれているか、完全にクリップされていることを示す。`Begin()`が返り値を返すかどうかに関わらず、各`Begin()`の呼び出しに対して、常にマッチする`End()` を呼び出します！ 
  - 重要: レガシーな理由により、これはBeginMenu/EndMenu、BeginPopup/EndPopupなど、対応するBeginXXX関数がtrueを返した場合にのみEndXXXコールが呼ばれるべき他のほとんどの関数と矛盾しています。BeginとBeginChildだけが変です。将来のアップデートで修正される予定です。
- ウィンドウスタックの一番下には常に「Debug」というウィンドウがあることに注意。

```cpp
IMGUI_API bool Begin(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);
IMGUI_API void End();
```

### 子ウィンドウ

- 子ウィンドウを使用して、ホスト・ウィンドウ内で自己完結した独立したスクロール/クリッピング領域に開始します。子ウィンドウは自分の子を埋め込むことができます。
- サイズの各独立軸について
  - ``==0.0f``: 残りのホスト・ウィンドウ・サイズを使用する
  - `> 0.0f`: 固定サイズ
  - `< 0.0f`: 残りのウィンドウサイズから`abs(size)`を引いた値を使う
  - 各軸は異なるモード、例えば`ImVec2(0,400)`を使用できる。
- `BeginChild()`は、ウィンドウが折りたたまれているか、完全にクリップされていることを示す `false` を返します。`BeginChild()` を呼び出すたびに、その返り値に関係なく、必ず一致する `EndChild()` を呼び出します。

重要：レガシーな理由により、これはBeginMenu/EndMenu、BeginPopup/EndPopupなど、対応するBeginXXX関数がtrueを返した場合にのみEndXXXコールが呼ばれるべき他のほとんどの関数と矛盾しています。BeginとBeginChildだけが変です。将来のアップデートで修正される予定です。

```cpp
IMGUI_API bool BeginChild(const char* str_id, const ImVec2& size = ImVec2(0, 0), bool border = false, ImGuiWindowFlags flags = 0);
IMGUI_API bool BeginChild(ImGuiID id, const ImVec2& size = ImVec2(0, 0), bool border = false, ImGuiWindowFlags flags = 0);
IMGUI_API void EndChild();
```

### ウィンドウ・ユーティリティ

- 'current window' = `Begin()`/`End()`ブロックの中で、追加するウィンドウを指定します。
- 'next window' = 次のウィンドウに`Begin()`する。

```cpp
IMGUI_API bool        IsWindowAppearing();
IMGUI_API bool        IsWindowCollapsed();
IMGUI_API bool        IsWindowFocused(ImGuiFocusedFlags flags=0);
IMGUI_API bool        IsWindowHovered(ImGuiHoveredFlags flags=0);
IMGUI_API ImDrawList* GetWindowDrawList();
IMGUI_API ImVec2      GetWindowPos();
IMGUI_API ImVec2      GetWindowSize();
IMGUI_API float       GetWindowWidth();
IMGUI_API float       GetWindowHeight();
```

| 名前                | 説明                                                                                                                                                                                     |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IsWindowAppearing() |                                                                                                                                                                                          |
| IsWindowCollapsed() |                                                                                                                                                                                          |
| IsWindowFocused()   | フラグによって、現在のウィンドウがフォーカスされているか、またはそのルート/子ウィンドウがフォーカスされているかが決まる。                                                                                                                        |
| IsWindowHovered()   | 現在のウィンドウがホバーされているか（通常：ポップアップ/モーダルでブロックされていないか）。 オプションはフラグを参照。 注意：マウスがimguiにディスパッチされるべきか、それともあなたのアプリにディスパッチされるべきかをチェックしたい場合は、'`io.WantCaptureMouse`'ブール値を使うべきです！FAQをお読みください！ |
| GetWindowDrawList() | 現在のウィンドウに関連付けられた描画リストを取得し、独自の描画プリミティブを追加する。                                                                                                                               |
| GetWindowPos()      | スクリーンスペース内の現在のウィンドウ位置を取得する (note: これを使う必要はほとんどないだろう。代わりに現在のレイアウト位置を使用することを検討してください。)                                                                                  |
| GetWindowSize()     | 現在のウィンドウサイズを取得する (note: これを使う必要はほとんどないでしょう。代わりに`GetScreenCursorPos()`や`GetContentRegionAvail()`などを使用することを検討してください。)                                                          |
| GetWindowWidth()    | 現在のウィンドウ幅を取得する (`GetWindowSize().x` のショートカット。)                                                                                                                                      |
| GetWindowHeight()   | 現在のウィンドウの高さを取得する(`GetWindowSize().y` のショートカット。)                                                                                                                                     |

### ウィンドウ操作

- `SetXXX`関数（Beginの後）ではなく、`SetNextXXX`関数（Beginの前）を使用することをお勧めします。

```cpp
IMGUI_API void SetNextWindowPos(const ImVec2& pos, ImGuiCond cond = 0, const ImVec2& pivot = ImVec2(0, 0));
IMGUI_API void SetNextWindowSize(const ImVec2& size, ImGuiCond cond = 0);                 
IMGUI_API void SetNextWindowSizeConstraints(const ImVec2& size_min, const ImVec2& size_max, ImGuiSizeCallback custom_callback = NULL, void* custom_callback_data = NULL);
IMGUI_API void SetNextWindowContentSize(const ImVec2& size);                            
IMGUI_API void SetNextWindowCollapsed(bool collapsed, ImGuiCond cond = 0);              
IMGUI_API void SetNextWindowFocus();                                                    
IMGUI_API void SetNextWindowScroll(const ImVec2& scroll);                               
IMGUI_API void SetNextWindowBgAlpha(float alpha);                                       
IMGUI_API void SetWindowPos(const ImVec2& pos, ImGuiCond cond = 0);                     
IMGUI_API void SetWindowSize(const ImVec2& size, ImGuiCond cond = 0);                   
IMGUI_API void SetWindowCollapsed(bool collapsed, ImGuiCond cond = 0);                  
IMGUI_API void SetWindowFocus();                                                        
IMGUI_API void SetWindowFontScale(float scale);                                         
IMGUI_API void SetWindowPos(const char* name, const ImVec2& pos, ImGuiCond cond = 0);   
IMGUI_API void SetWindowSize(const char* name, const ImVec2& size, ImGuiCond cond = 0); 
IMGUI_API void SetWindowCollapsed(const char* name, bool collapsed, ImGuiCond cond = 0);
IMGUI_API void SetWindowFocus(const char* name);                                        
```

| 名前                           | 説明                                                                                                                                                                                                  |
|--------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SetNextWindowPos()             | 次のウィンドウ位置を設定する。`Begin()`の前に呼び出す。`pivot=(0.5f,0.5f)`を使って、指定した点を中心に置くなど。                                                                                                                 |
| SetNextWindowSize()            | 次のウィンドウサイズを設定する。軸を`0.0f`に設定して、この軸にオートフィットを強制する。`Begin()`の前に呼び出す。                                                                                                                          |
| SetNextWindowSizeConstraints() | 次のウィンドウサイズの制限を設定する。現在のサイズを保持するには、X/Y軸のいずれかに`-1,-1`を使用する。サイズは切り捨てられます。自明でないプログラム上の制約を適用するには、コールバックを使用してください。                                                                    |
| SetNextWindowContentSize()     | 次のウィンドウのコンテンツ・サイズを設定する (~ スクロールバーの範囲を強制するスクロール可能なクライアント領域). ウィンドウの装飾（タイトルバー、メニューバーなど）や`WindowPadding`は含まない。 軸を`0.0f`に設定して、自動のままにする。                                                |
| SetNextWindowCollapsed()       | 次のウィンドウの折りたたみ状態を設定する。`Begin()`の前に呼び出す。                                                                                                                                                       |
| SetNextWindowFocus()           | 次のウィンドウを最前面にする。`Begin()`の前に呼び出す。                                                                                                                                                               |
| SetNextWindowScroll()          | 次のウィンドウのスクロール値を設定する (指定された軸に影響を与えない場合は、`< 0.0f`を使用する。).                                                                                                                                 |
| SetNextWindowBgAlpha()         | 次のウィンドウの背景色アルファを設定する。 ImGuiCol_WindowBg/ChildBg/PopupBg の Alpha コンポーネントを簡単にオーバーライドするためのヘルパーです。`ImGuiWindowFlags_NoBackground`を使うこともできる。                                                      |
| SetWindowPos()                 | (非推奨) 現在のウィンドウ位置を設定する - call within Begin()/End(). prefer using SetNextWindowPos(), as this may incur tearing and side-effects.                                                              |
| SetWindowSize()                | (非推奨) set current window size - call within Begin()/End(). set to ImVec2(0, 0) to force an auto-fit. prefer using SetNextWindowSize(), as this may incur tearing and minor side-effects.           |
| SetWindowCollapsed()           | (非推奨) set current window collapsed state. prefer using SetNextWindowCollapsed().                                                                                                                   |
| SetWindowFocus()               | (非推奨) set current window to be focused / top-most. prefer using SetNextWindowFocus().                                                                                                              |
| SetWindowFontScale()           | 廃止: フォントスケールを設定する。 Adjust IO.FontGlobalScale if you want to scale all windows. This is an old API! For correct scaling, prefer to reload font + rebuild ImFontAtlas + call style.ScaleAllSizes(). |
| SetWindowPos()                 | 名前付きウィンドウの位置を設定します。                                                                                                                                                                            |
| SetWindowSize()                | 名前付きウィンドウサイズを設定する。軸を`0.0f`に設定して、この軸にオートフィットを強制する。                                                                                                                                          |
| SetWindowCollapsed()           | 名前付きウィンドウの折りたたみ状態を設定する                                                                                                                                                                        |
| SetWindowFocus()               | 指定したウィンドウを最前面にフォーカスさせる。 フォーカスを外すには `NULL` を使う。                                                                                                                                                 |

### コンテンツ領域

- 指定したポイントから使用可能な領域を取得します。`GetContentRegionAvail()`は頻繁に有用である。
- これらの関数は再設計されるに違いない (また、Min/Maxの返り値がローカルウィンドウの座標で表示されるため、混乱が増す。)

```cpp
IMGUI_API ImVec2 GetContentRegionAvail();
IMGUI_API ImVec2 GetContentRegionMax();
IMGUI_API ImVec2 GetWindowContentRegionMin();
IMGUI_API ImVec2 GetWindowContentRegionMax();
```

| 名前                        | 説明                                                                                               |
|-----------------------------|----------------------------------------------------------------------------------------------------|
| GetContentRegionAvail()     | == `GetContentRegionMax() - GetCursorPos()`                                                        |
| GetContentRegionMax()       | 現在のコンテンツの境界（通常、スクロールを含むウィンドウの境界、または現在の列の境界）。                                         |
| GetWindowContentRegionMin() | ウィンドウ座標で、ウィンドウ全体（おおよそ`(0,0)-Scroll`）のコンテンツ境界の最小値。                                         |
| GetWindowContentRegionMax() | ウィンドウ全体のコンテンツ境界の最大値（おおよそ`(0,0)+Size-Scroll`）。Sizeは`SetNextWindowContentSize()`でオーバーライドできます。 |

### ウィンドウ・スクロール

- スクロールの変更は、`Begin()`の最初の呼び出しで、次のフレームの最初に適用される。
- この遅延を回避するには、`SetScrollX()`/`SetScrollY()` を使用する代わりに、`Begin()` を呼び出す前に `SetNextWindowScroll()` を使用します。

```cpp
IMGUI_API float GetScrollX();
IMGUI_API float GetScrollY();
IMGUI_API void  SetScrollX(float scroll_x);
IMGUI_API void  SetScrollY(float scroll_y);
IMGUI_API float GetScrollMaxX();
IMGUI_API float GetScrollMaxY();
IMGUI_API void  SetScrollHereX(float center_x_ratio = 0.5f);
IMGUI_API void  SetScrollHereY(float center_y_ratio = 0.5f);
IMGUI_API void  SetScrollFromPosX(float local_x, float center_x_ratio = 0.5f);
IMGUI_API void  SetScrollFromPosY(float local_y, float center_y_ratio = 0.5f);
```

| 名前                | 説明                                                                                                                                                  |
|---------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| GetScrollX()        | スクロール量を得る `0 .. GetScrollMaxX()`                                                                                                                    |
| GetScrollY()        | スクロール量を得る `0 .. GetScrollMaxY()`                                                                                                                    |
| SetScrollX()        | スクロール量の設定 `0 .. GetScrollMaxX()`                                                                                                                   |
| SetScrollY()        | スクロール量の設定 `0 .. GetScrollMaxY()`                                                                                                                   |
| GetScrollMaxX()     | 最大スクロール量を得る ~~ `ContentSize.x - WindowSize.x - DecorationsSize.x`                                                                                 |
| GetScrollMaxY()     | 最大スクロール量を得る ~~ `ContentSize.y - WindowSize.y - DecorationsSize.y`                                                                                 |
| SetScrollHereX()    | 現在のカーソル位置が見えるようにスクロール量を調整する。 `center_x_ratio=0.0：左`、`0.5：中央、1.0：右`。「デフォルト/カレント・アイテム」を表示させる場合は、代わりに `SetItemDefaultFocus()` を使用します。 |
| SetScrollHereY()    | 現在のカーソル位置が見えるようにスクロール量を調整する。 `center_y_ratio=0.0：上`、`0.5：中央、1.0：下`。「デフォルト/カレント・アイテム」を表示させる場合は、代わりに `SetItemDefaultFocus()` を使用します。 |
| SetScrollFromPosX() | 指定した位置が見えるようにスクロール量を調整する。一般に、`GetCursorStartPos() + offset` で有効な位置を計算する。                                                              |
| SetScrollFromPosY() | 指定した位置が見えるようにスクロール量を調整する。一般に、`GetCursorStartPos() + offset` で有効な位置を計算する。                                                              |

### パラメータ・スタック（共有）

```cpp
IMGUI_API void PushFont(ImFont* font);
IMGUI_API void PopFont();
IMGUI_API void PushStyleColor(ImGuiCol idx, ImU32 col);
IMGUI_API void PushStyleColor(ImGuiCol idx, const ImVec4& col);
IMGUI_API void PopStyleColor(int count = 1);
IMGUI_API void PushStyleVar(ImGuiStyleVar idx, float val);
IMGUI_API void PushStyleVar(ImGuiStyleVar idx, const ImVec2& val);
IMGUI_API void PopStyleVar(int count = 1);
IMGUI_API void PushTabStop(bool tab_stop);
IMGUI_API void PopTabStop();
IMGUI_API void PushButtonRepeat(bool repeat);
IMGUI_API void PopButtonRepeat();
```

| 名前                                                | 説明                                                                                                                                                                                            |
|-----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| PushFont(), PopFont()                               | デフォルトフォントをプッシュするショートカットとして`NULL`を使う                                                                                                                                                            |
| PushStyleColor(), PushStyleColor(), PopStyleColor() | `NewFrame()`の後でスタイルを変更する場合は、常にこれを使用します。                                                                                                                                                 |
| PushStyleVar()                                      | `NewFrame()`の後でスタイルを変更する場合は、常にこれを使用します。                                                                                                                                                 |
| PushStyleVar(), PopStyleVar()                       | `NewFrame()`の後にスタイルを変更する場合は、常にこの変数を使用します。                                                                                                                                             |
| PushTabStop(), PopTabStop()                         | == タブストップを有効にする。 TAB/Shift-TABを使ったフォーカシングを許可します。デフォルトで有効になっていますが、特定のウィジェットでは無効にできます。                                                                                                 |
| PushButtonRepeat(), PopButtonRepeat()               | 繰り返しモードでは、`Button*()`関数は型どおりの方法で繰り返された真を返す。 (`io.KeyRepeatDelay`/`io.KeyRepeatRate`の設定を使用します。). `Button()`の後で`IsItemActive()`を呼び出すことで、ボタンが現在のフレームに保持されているかどうかを知ることができます。 |

### パラメータ・スタック（現在のウィンドウ）

```cpp
IMGUI_API void  PushItemWidth(float item_width);
IMGUI_API void  PopItemWidth();
IMGUI_API void  SetNextItemWidth(float item_width);
IMGUI_API float CalcItemWidth();
IMGUI_API void  PushTextWrapPos(float wrap_local_pos_x = 0.0f);
IMGUI_API void  PopTextWrapPos();
```

| 名前                                | 説明                                                                                                                                      |
|-------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| PushItemWidth(), PopItemWidth()     | 一般的な大きな "item+label "ウィジェットのアイテムの幅をプッシュする。 `>0.0f`: ピクセル単位の幅, `<0.0f` ウィンドウの右にxxピクセルを合わせる (そのため、`-FLT_MIN`は常に幅を右側に揃える。).   |
| SetNextItemWidth()                  | 次の一般的な大きな "item+label "ウィジェットの幅を設定する。 `>0.0f`: ピクセル単位の幅, `<0.0f` ウィンドウの右にxxピクセルを合わせる (そのため、`-FLT_MIN`は常に幅を右側に揃える。)      |
| CalcItemWidth()                     | プッシュされた設定と現在のカーソル位置が与えられたアイテムの幅。 多くの'Item'関数とは異なり、必ずしも最後のアイテムの幅とは限りません。                                                  |
| PushTextWrapPos(), PopTextWrapPos() | `Text*()` コマンドのワードラップ位置をプッシュする。 `< 0.0f`: 包装なし; `0.0f`: ウィンドウ（または列）の最後まで折り返す; `> 0.0f`: ウィンドウローカル空間の 'wrap_pos_x' 位置で折り返す。 |


## スタイルの読み込みとアクセス

- `ShowStyleEditor()` 関数を使用して、インタラクティブに色を表示/編集します。

```cpp
IMGUI_API ImFont*       GetFont();
IMGUI_API float         GetFontSize();
IMGUI_API ImVec2        GetFontTexUvWhitePixel();
IMGUI_API ImU32         GetColorU32(ImGuiCol idx, float alpha_mul = 1.0f);
IMGUI_API ImU32         GetColorU32(const ImVec4& col);
IMGUI_API ImU32         GetColorU32(ImU32 col);
IMGUI_API const ImVec4& GetStyleColorVec4(ImGuiCol idx);
```

| 名前                     | 解説                                                                                                                                               |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| GetFont()                | 現在のフォントを取得する                                                                                                                                   |
| GetFontSize()            | 現在のフォントサイズを取得する (= ピクセル単位の高さ) 現在のフォントに現在の縮尺を適用                                                                                      |
| GetFontTexUvWhitePixel() | ImDrawList APIを使ってカスタムシェイプを描画するのに便利です。                                                                                                        |
| GetColorU32()            | ImDrawListに適した32ビット値としてパックされた、適用されたスタイルアルファとオプションの追加アルファ乗数で、指定されたスタイルカラーを取得します。                                                        |
| GetColorU32()            | ImDrawListに適した32ビット値としてパックされた、スタイル・アルファが適用された指定された色を取得します。                                                                                |
| GetColorU32()            | ImDrawListに適した32ビット値としてパックされた、スタイル・アルファが適用された指定された色を取得します。                                                                                |
| GetStyleColorVec4()      | ImGuiStyle構造体に格納されているスタイル・カラーを取得します。`PushStyleColor()`にフィードバックするために使用し、そうでない場合は`GetColorU32()`を使用してスタイル・アルファを焼き付けたスタイル・カラーを取得します。 |

### カーソル / レイアウト

- 「カーソル」とは、現在の出力位置を意味する。
- 典型的なウィジェットの動作は、現在のカーソル位置に自分自身を出力し、それからカーソルを1行下に移動させる。
- ウィジェット間で`SameLine()`を呼び出すと、直前のキャリッジ・リターンを取り消し、直前のウィジェットの右側に出力することができます。
- 注意: 現在、ウィンドウローカルと絶対位置の間に矛盾があり、将来のAPIで修正する予定です：
  - ウィンドウローカル座標
    - `SameLine()`
    - `GetCursorPos()`
    - `SetCursorPos()`
    - `GetCursorStartPos()`
    - `GetContentRegionMax()`
    - `GetWindowContentRegion*()`
    - `PushTextWrapPos()`
  - 絶対座標
    - `GetCursorScreenPos()`
    - `SetCursorScreenPos()`
    - すべての `ImDrawList::` 関数。

```cpp
IMGUI_API void   Separator();
IMGUI_API void   SameLine(float offset_from_start_x=0.0f, float spacing=-1.0f);
IMGUI_API void   NewLine();
IMGUI_API void   Spacing();
IMGUI_API void   Dummy(const ImVec2& size);
IMGUI_API void   Indent(float indent_w = 0.0f);
IMGUI_API void   Unindent(float indent_w = 0.0f);
IMGUI_API void   BeginGroup();
IMGUI_API void   EndGroup();
IMGUI_API ImVec2 GetCursorPos();
IMGUI_API float  GetCursorPosX();
IMGUI_API float  GetCursorPosY();
IMGUI_API void   SetCursorPos(const ImVec2& local_pos);
IMGUI_API void   SetCursorPosX(float local_x);
IMGUI_API void   SetCursorPosY(float local_y);
IMGUI_API ImVec2 GetCursorStartPos();
IMGUI_API ImVec2 GetCursorScreenPos();
IMGUI_API void   SetCursorScreenPos(const ImVec2& pos);
IMGUI_API void   AlignTextToFramePadding();
IMGUI_API float  GetTextLineHeight();
IMGUI_API float  GetTextLineHeightWithSpacing();
IMGUI_API float  GetFrameHeight();
IMGUI_API float  GetFrameHeightWithSpacing();
```

| 名前                                                                                                           | 説明                                                                                                                                                                                                                                                                                                                  |
|----------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Separator()`                                                                                                  | セパレーター、通常は水平。 メニューバーの内側や水平レイアウトモードでは、これは垂直セパレーターになる。                                                                                                                                                                                                                                                        |
| `SameLine()`                                                                                                   | これを呼び出すことで、ウィジェットやグループを水平にレイアウトすることができます。 X位置はウィンドウ座標で指定する。                                                                                                                                                                                                                                                 |
| `NewLine()`                                                                                                    | `SameLine()`を取り消すか、水平レイアウトのコンテキストで改行を強制する。                                                                                                                                                                                                                                                                    |
| `Spacing()`                                                                                                    | 縦に間隔を空ける。                                                                                                                                                                                                                                                                                                         |
| `Dummy()`                                                                                                      | 指定されたサイズのダミーアイテムを追加する。 `InvisibleButton()`と違って、`Dummy()`はマウス・クリックを受け付けないし、ナビゲートもできない。                                                                                                                                                                                                                          |
| `Indent()`                                                                                                     | コンテンツの位置を右に移動, `indent_w`、または`indent_w <= 0`の場合はstyle.IndentSpacingで指定する。                                                                                                                                                                                                                                    |
| `Unindent()`                                                                                                   | コンテンツの位置を左に戻す, `indent_w`、または`indent_w <= 0`の場合はstyle.IndentSpacingで指定する。                                                                                                                                                                                                                                     |
| `BeginGroup()`                                                                                                 | ロック水平スタートポジション                                                                                                                                                                                                                                                                                                      |
| `EndGroup()`                                                                                                   | 水平方向の開始位置のロックを解除し、グループ全体のバウンディングボックスを1つの "アイテム"にまとめる。 (そのため、`IsItemHovered()`や、グループ全体の`SameLine()`などのレイアウト・プリミティブを使うことができる。)                                                                                                                                                                           |
| `GetCursorPos()`, `GetCursorPosX()`, `GetCursorPosY()`, `SetCursorPos()`, `SetCursorPosX()`, `SetCursorPosY()` | ウィンドウ座標でのカーソル位置 (ウィンドウの位置に対して) (いくつかの関数はウィンドウ相対座標を使用しています：`GetCursorPos`, `GetCursorStartPos`, `GetContentRegionMax`, `GetWindowContentRegion*` などです。`GetCursorScreenPos`などの他の関数や`ImDrawList::`内のすべての関数は、メインの絶対座標系を使用しています。`GetWindowPos() + GetCursorPos() == GetCursorScreenPos()` など。) |
| `GetCursorStartPos()`                                                                                          | ウィンドウ座標での初期カーソル位置                                                                                                                                                                                                                                                                                               |
| `GetCursorScreenPos()`                                                                                         | 絶対座標でのカーソル位置 (ImDrawList APIと連動すると便利です。). シングルビューポートモードでは`左上 == GetMainViewport()->Pos == (0,0)`、シングルビューポートモードでは`右下 == GetMainViewport()->Pos+Size == io.DisplaySize`。                                                                                                                                  |
| `SetCursorScreenPos()`                                                                                         | 絶対座標でのカーソル位置                                                                                                                                                                                                                                                                                                    |
| `AlignTextToFramePadding()`                                                                                    | 次のテキストのベースラインを`FramePadding.y`に垂直に合わせ、フレームで囲まれたアイテムに正しく揃うようにする。 (枠で囲まれた項目の前の行にテキストがある場合に呼び出される。)                                                                                                                                                                                                     |
| `GetTextLineHeight()`                                                                                          | ~ `FontSize`                                                                                                                                                                                                                                                                                                          |
| `GetTextLineHeightWithSpacing()`                                                                               | ~ `FontSize + style.ItemSpacing.y` (連続する2行のテキスト間のピクセル単位での距離)                                                                                                                                                                                                                                                  |
| `GetFrameHeight()`                                                                                             | ~ `FontSize + style.FramePadding.y * 2`                                                                                                                                                                                                                                                                               |
| `GetFrameHeightWithSpacing()`                                                                                  | ~ `FontSize + style.FramePadding.y * 2 + style.ItemSpacing.y` (フレーム付きウィジェットの連続する2行の間のピクセル単位での距離)                                                                                                                                                                                                             |

### IDスタック / スコープ

dear imguiでのIDの扱いについての詳細はFAQ（docs/FAQ.mdまたは`http://dearimgui.com/faq`）をお読みください。

- これらの疑問は、IDスタックシステムを理解することによって解決され、影響を受ける。:
  - "Q: ウィジェットをクリックしても反応しないのはなぜですか？"
  - "Q: ウィジェットに空のラベルを付けるには？"
  - "Q: 複数のウィジェットに同じラベルを付けるには？"
- ショートバージョン: IDはIDスタック全体のハッシュである。 ループ内でウィジェットを作成する場合、ユニークな識別子（オブジェクト・ポインタやループ・インデックスなど）をプッシュして、ウィジェットを一意に区別したい場合がほとんどでしょう。
- また、ウィジェットラベル内で "Label##foobar" 構文を使用することで、ウィジェットを区別することができます。
- このヘッダーファイルでは、"label"/"name"という用語を使って、表示される文字列とIDとして使われる文字列を表し、"str_id" はIDとしてのみ使われ、通常は表示されない文字列を表す。

```cpp
IMGUI_API void    PushID(const char* str_id);
IMGUI_API void    PushID(const char* str_id_begin, const char* str_id_end);
IMGUI_API void    PushID(const void* ptr_id);
IMGUI_API void    PushID(int int_id);
IMGUI_API void    PopID();
IMGUI_API ImGuiID GetID(const char* str_id);
IMGUI_API ImGuiID GetID(const char* str_id_begin, const char* str_id_end);
IMGUI_API ImGuiID GetID(const void* ptr_id);
```

| 名前     | 説明                                                                        |
|----------|-----------------------------------------------------------------------------|
| PushID() | 文字列をIDスタックにプッシュする（文字列をハッシュする）。                                        |
| PushID() | 文字列をIDスタックにプッシュする（文字列をハッシュする）。                                        |
| PushID() | IDスタックにポインタをプッシュする（ポインタをハッシュする）。                                            |
| PushID() | IDスタックに整数をプッシュする（整数をハッシュする）。                                            |
| PopID()  | IDスタックからポップする。                                                              |
| GetID()  | 一意なIDを計算する（IDスタック全体のハッシュ＋与えられたパラメータ）。例えば、`ImGuiStorage`にクエリーしたい場合 |


### ウィジェット: テキスト

```cpp
IMGUI_API void TextUnformatted(const char* text, const char* text_end = NULL);
IMGUI_API void Text(const char* fmt, ...)                                      IM_FMTARGS(1);
IMGUI_API void TextV(const char* fmt, va_list args)                            IM_FMTLIST(1);
IMGUI_API void TextColored(const ImVec4& col, const char* fmt, ...)            IM_FMTARGS(2);
IMGUI_API void TextColoredV(const ImVec4& col, const char* fmt, va_list args)  IM_FMTLIST(2);
IMGUI_API void TextDisabled(const char* fmt, ...)                              IM_FMTARGS(1);
IMGUI_API void TextDisabledV(const char* fmt, va_list args)                    IM_FMTLIST(1);
IMGUI_API void TextWrapped(const char* fmt, ...)                               IM_FMTARGS(1);
IMGUI_API void TextWrappedV(const char* fmt, va_list args)                     IM_FMTLIST(1);
IMGUI_API void LabelText(const char* label, const char* fmt, ...)              IM_FMTARGS(2);
IMGUI_API void LabelTextV(const char* label, const char* fmt, va_list args)    IM_FMTLIST(2);
IMGUI_API void BulletText(const char* fmt, ...)                                IM_FMTARGS(1);
IMGUI_API void BulletTextV(const char* fmt, va_list args)                      IM_FMTLIST(1);
IMGUI_API void SeparatorText(const char* label);
```

| 名前                            | 説明                                                                                                                                                                               |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TextUnformatted()               | フォーマットなしの生のテキスト。`Text("%s", text)`とほぼ同じ。しかし、'text_end' が指定されていればヌル終端文字列を必要とせず、より高速で、メモリコピーもなく、バッファサイズの制限もない。                                                        |
| Text(), TextV()                 | 書式付きテキスト                                                                                                                                                                        |
| TextColored(), TextColoredV()   | `PushStyleColor(ImGuiCol_Text, col); Text(fmt, ...); PopStyleColor();` のショートカット                                                                                                    |
| TextDisabled(), TextDisabledV() | `PushStyleColor(ImGuiCol_Text, style.Colors[ImGuiCol_TextDisabled]); Text(fmt, ...); PopStyleColor();` のショートカット                                                                    |
| TextWrapped(), TextWrappedV()   | `PushTextWrapPos(0.0f); Text(fmt, ...); PopTextWrapPos();` のショートカット。ウィンドウ幅を拡張する他のウィジェットがない場合、これは自動リサイズウィンドウでは動作しないので、`SetNextWindowSize()`を使ってサイズを設定する必要があるかもしれません。 |
| LabelText(), LabelTextV()       | text + label を value + labelウィジェットと同じように整列して表示する。                                                                                                                             |
| BulletText(), BulletTextV()     | `Bullet()` + `Text()` のショートカット                                                                                                                                                     |
| SeparatorText();                | 現在：横線付きの書式付きテキスト                                                                                                                                                           |

### ウィジェット: メイン

- ほとんどのウィジェットは、値が変更されたとき、または押された/選択されたときにtrueを返します。
- また、ウィジェットの状態を問い合わせるために、多くのIsItemXXX関数（IsItemActive、IsItemHoveredなど）のいずれかを使用することもできます。

```cpp
IMGUI_API bool Button(const char* label, const ImVec2& size = ImVec2(0, 0));
IMGUI_API bool SmallButton(const char* label);
IMGUI_API bool InvisibleButton(const char* str_id, const ImVec2& size, ImGuiButtonFlags flags = 0);
IMGUI_API bool ArrowButton(const char* str_id, ImGuiDir dir);
IMGUI_API bool Checkbox(const char* label, bool* v);
IMGUI_API bool CheckboxFlags(const char* label, int* flags, int flags_value);
IMGUI_API bool CheckboxFlags(const char* label, unsigned int* flags, unsigned int flags_value);
IMGUI_API bool RadioButton(const char* label, bool active);
IMGUI_API bool RadioButton(const char* label, int* v, int v_button);
IMGUI_API void ProgressBar(float fraction, const ImVec2& size_arg = ImVec2(-FLT_MIN, 0), const char* overlay = NULL);
IMGUI_API void Bullet();
```

| 名前                        | 説明                                                                                                      |
|-----------------------------|-----------------------------------------------------------------------------------------------------------|
| Button()                    | ボタン                                                                                                       |
| SmallButton()               | ボタンを`FramePadding=(0,0)`で簡単にテキスト内に埋め込む。                                                              |
| InvisibleButton()           | ビジュアルを排除した柔軟なボタン動作は、パブリックAPIを使用してカスタムビヘイビアを構築するのに便利です。(`IsItemActive`、`IsItemHovered`などとともに。) |
| ArrowButton()               | 矢印ボタン                                                                                                   |
| Checkbox(), CheckboxFlags() |                                                                                                           |
| RadioButton()               | `if (RadioButton("one", my_value==1)) { my_value = 1; }` などと使用する。                                       |
| RadioButton()               | 値が整数の場合に上記のパターンを処理するショートカット                                                                      |
| ProgressBar()               |                                                                                                           |
| Bullet()                    | 小さな円を描く＋カーソルを同じ線上に保つ。 カーソルの x 位置を GetTreeNodeToLabelSpacing() で進める、 TreeNode()が使用する距離と同じ   |

### ウィジェット: 画像

- ImTextureIDについてはこちら: `https://github.com/ocornut/imgui/wiki/Image-Loading-and-Displaying-Examples`

```cpp
IMGUI_API void Image(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0, 0), const ImVec2& uv1 = ImVec2(1, 1), const ImVec4& tint_col = ImVec4(1, 1, 1, 1), const ImVec4& border_col = ImVec4(0, 0, 0, 0));
IMGUI_API bool ImageButton(const char* str_id, ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0, 0), const ImVec2& uv1 = ImVec2(1, 1), const ImVec4& bg_col = ImVec4(0, 0, 0, 0), const ImVec4& tint_col = ImVec4(1, 1, 1, 1));
```

### ウィジェット: コンボボックス（ドロップダウン）

- `BeginCombo()`/`EndCombo()`APIは、例えば`Selectable()`アイテムを作成することで、コンテンツや選択状態を好きなように管理することができます。
- 古い`Combo()` APIは、`BeginCombo()`/`EndCombo()`のヘルパーで、便宜上利用できるようにしてあります。これはリストボックスの作成方法に似ています。

```cpp
IMGUI_API bool BeginCombo(const char* label, const char* preview_value, ImGuiComboFlags flags = 0);
IMGUI_API void EndCombo();
IMGUI_API bool Combo(const char* label, int* current_item, const char* const items[], int items_count, int popup_max_height_in_items = -1);
IMGUI_API bool Combo(const char* label, int* current_item, const char* items_separated_by_zeros, int popup_max_height_in_items = -1);
IMGUI_API bool Combo(const char* label, int* current_item, bool(*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int popup_max_height_in_items = -1);
```

- `EndCombo()`: 呼び出すのは、BeginCombo() が真を返す場合だけです！
- `Combo(...items_separated_by_zeros...)`: 文字列内のアイテムは `\0` で区切り、item-list は `\0\0` で終了する。例えば "`One\0Two\0Three\0`"


### ウィジェット: ドラッグスライダー

- ドラッグ・ボックスをCTRL+クリックすると、入力ボックスに変わります。手動で入力された値はデフォルトではクランプされず、範囲外に出る可能性があります。常にクランプするには `ImGuiSliderFlags_AlwaysClamp` を使ってください。
- すべての関数の`Float2/Float3/Float4/Int2/Int3/Int4`バージョンについて、'`float v[X]`'関数引数は'`float* v`'と同じであることに注意してください。 例えば、`&myvector.x`のように、連続する集合から最初の要素のアドレスを渡すことができる。
- フォーマット文字列を調整し、値を接頭辞や接尾辞で装飾したり、編集や表示の精度を調整する。 例えば `"%.3f" -> 1.234; "%5.2f secs" -> 01.23 secs; "Biscuit: %.0f" -> Biscuit: 1;` など。
- 書式文字列は`NULL`に設定することもできるし、デフォルトの書式（"`%f`"または"`%d`"）を使うこともできる。
- 速度はマウスの動き1ピクセルあたりの値です（`v_speed=0.2f`：値を1増やすにはマウスを5ピクセル動かす必要があります）。 ゲームパッド/キーボードナビゲーションの場合、最小速度は`Max(v_speed, minimum_step_at_given_precision)`となる。
- `v_min < v_max` を使用すると、編集を与えられた制限にクランプします。`ImGuiSliderFlags_AlwaysClamp`が使用されていない場合、CTRL+クリックによる手動入力はこれらの制限を上書きすることができることに注意してください。
- `v_max = FLT_MAX / INT_MAX` などで最大値へのクランプを避け、`v_min = -FLT_MAX / INT_MIN` で最小値へのクランプを避ける。
- `DragXXX()`と`SliderXXX()`関数には同じフラグを使用しています。
- レガシー：1.78以前では、`ImGuiSliderFlags flags=0'`引数の代わりに`float power=1.0f'`引数を取る`DragXXX()`関数のシグネチャがあります。 もし浮動小数点数を ImGuiSliderFlags に変換するときに警告が表示されたら、 `https://github.com/ocornut/imgui/issues/3361` を読んでください。

```cpp
IMGUI_API bool DragFloat(const char* label, float* v, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
IMGUI_API bool DragFloat2(const char* label, float v[2], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
IMGUI_API bool DragFloat3(const char* label, float v[3], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
IMGUI_API bool DragFloat4(const char* label, float v[4], float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
IMGUI_API bool DragFloatRange2(const char* label, float* v_current_min, float* v_current_max, float v_speed = 1.0f, float v_min = 0.0f, float v_max = 0.0f, const char* format = "%.3f", const char* format_max = NULL, ImGuiSliderFlags flags = 0);
IMGUI_API bool DragInt(const char* label, int* v, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);
IMGUI_API bool DragInt2(const char* label, int v[2], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);
IMGUI_API bool DragInt3(const char* label, int v[3], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);
IMGUI_API bool DragInt4(const char* label, int v[4], float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", ImGuiSliderFlags flags = 0);
IMGUI_API bool DragIntRange2(const char* label, int* v_current_min, int* v_current_max, float v_speed = 1.0f, int v_min = 0, int v_max = 0, const char* format = "%d", const char* format_max = NULL, ImGuiSliderFlags flags = 0);
IMGUI_API bool DragScalar(const char* label, ImGuiDataType data_type, void* p_data, float v_speed = 1.0f, const void* p_min = NULL, const void* p_max = NULL, const char* format = NULL, ImGuiSliderFlags flags = 0);
IMGUI_API bool DragScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, float v_speed = 1.0f, const void* p_min = NULL, const void* p_max = NULL, const char* format = NULL, ImGuiSliderFlags flags = 0);
```

- `DragFloat()`: `v_min >= v_max`の場合、境界はない。
- `DragInt()`: `v_min >= v_max`の場合、境界はない。

### ウィジェット: レギュラー・スライダー

- 任意のスライダーをCTRL+クリックすると、入力ボックスに変わります。手動で入力された値は、デフォルトではクランプされず、範囲を逸脱する可能性がある。常にクランプするには `ImGuiSliderFlags_AlwaysClamp` を使います。
- フォーマット文字列を調整し、値を接頭辞や接尾辞で装飾したり、編集や表示の精度を調整する。 例：`"%.3f" -> 1.234; "%5.2f secs" -> 01.23 secs; "Biscuit: %.0f" -> Biscuit: 1;` など。
- 書式文字列はNULLに設定することもできるし、デフォルトの書式（"%f "または"%d"）を使うこともできる。
- レガシー：1.78 より前の `SliderXXX()` 関数のシグネチャでは、`ImGuiSliderFlags flags=0` 引数の代わりに `float power=1.0f` という最終引数を取ります。 もし浮動小数点数を `ImGuiSliderFlags` に変換するときに警告が表示されたら、 `https://github.com/ocornut/imgui/issues/3361` を読んでください。

```cpp
IMGUI_API bool SliderFloat(const char* label, float* v, float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
IMGUI_API bool SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
IMGUI_API bool SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
IMGUI_API bool SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
IMGUI_API bool SliderAngle(const char* label, float* v_rad, float v_degrees_min = -360.0f, float v_degrees_max = +360.0f, const char* format = "%.0f deg", ImGuiSliderFlags flags = 0);
IMGUI_API bool SliderInt(const char* label, int* v, int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
IMGUI_API bool SliderInt2(const char* label, int v[2], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
IMGUI_API bool SliderInt3(const char* label, int v[3], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
IMGUI_API bool SliderInt4(const char* label, int v[4], int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
IMGUI_API bool SliderScalar(const char* label, ImGuiDataType data_type, void* p_data, const void* p_min, const void* p_max, const char* format = NULL, ImGuiSliderFlags flags = 0);
IMGUI_API bool SliderScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, const void* p_min, const void* p_max, const char* format = NULL, ImGuiSliderFlags flags = 0);
IMGUI_API bool VSliderFloat(const char* label, const ImVec2& size, float* v, float v_min, float v_max, const char* format = "%.3f", ImGuiSliderFlags flags = 0);
IMGUI_API bool VSliderInt(const char* label, const ImVec2& size, int* v, int v_min, int v_max, const char* format = "%d", ImGuiSliderFlags flags = 0);
IMGUI_API bool VSliderScalar(const char* label, const ImVec2& size, ImGuiDataType data_type, void* p_data, const void* p_min, const void* p_max, const char* format = NULL, ImGuiSliderFlags flags = 0);
```

- `SliderFloat()`: スライダー内ラベルや単位表示のために、値を接頭辞や接尾辞で装飾する書式を調整します。

### ウィジェット: キーボード入力

- `InputText()` を `std::string` やカスタムの動的文字列型で使用したい場合は、`misc/cpp/imgui_stdlib.h` と `imgui_demo.cpp` のコメントを参照してください。
- `ImGuiInputTextFlags` のフラグのほとんどは `InputText()` でのみ有効で、`InputFloatX`、`InputIntX`、`InputDouble` などでは有効ではありません。

```cpp
IMGUI_API bool InputText(const char* label, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
IMGUI_API bool InputTextMultiline(const char* label, char* buf, size_t buf_size, const ImVec2& size = ImVec2(0, 0), ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
IMGUI_API bool InputTextWithHint(const char* label, const char* hint, char* buf, size_t buf_size, ImGuiInputTextFlags flags = 0, ImGuiInputTextCallback callback = NULL, void* user_data = NULL);
IMGUI_API bool InputFloat(const char* label, float* v, float step = 0.0f, float step_fast = 0.0f, const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
IMGUI_API bool InputFloat2(const char* label, float v[2], const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
IMGUI_API bool InputFloat3(const char* label, float v[3], const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
IMGUI_API bool InputFloat4(const char* label, float v[4], const char* format = "%.3f", ImGuiInputTextFlags flags = 0);
IMGUI_API bool InputInt(const char* label, int* v, int step = 1, int step_fast = 100, ImGuiInputTextFlags flags = 0);
IMGUI_API bool InputInt2(const char* label, int v[2], ImGuiInputTextFlags flags = 0);
IMGUI_API bool InputInt3(const char* label, int v[3], ImGuiInputTextFlags flags = 0);
IMGUI_API bool InputInt4(const char* label, int v[4], ImGuiInputTextFlags flags = 0);
IMGUI_API bool InputDouble(const char* label, double* v, double step = 0.0, double step_fast = 0.0, const char* format = "%.6f", ImGuiInputTextFlags flags = 0);
IMGUI_API bool InputScalar(const char* label, ImGuiDataType data_type, void* p_data, const void* p_step = NULL, const void* p_step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags flags = 0);
IMGUI_API bool InputScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, const void* p_step = NULL, const void* p_step_fast = NULL, const char* format = NULL, ImGuiInputTextFlags flags = 0);
```

### ウィジェット: カラーエディター/ピッカー

::: tip
ColorEdit*関数には小さな色の四角があり、左クリックでピッカー、右クリックでオプションメニューが開きます。
:::

- C++では、'`float v[X]`'関数引数は'`float* v`'と同じであり、配列構文はアクセス可能であると期待される要素数を文書化する方法にすぎないことに注意してください。
- 連続構造体から最初の浮動小数点要素のアドレスを渡すことができる。例: `&myvector.x`

```cpp
IMGUI_API bool ColorEdit3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
IMGUI_API bool ColorEdit4(const char* label, float col[4], ImGuiColorEditFlags flags = 0);
IMGUI_API bool ColorPicker3(const char* label, float col[3], ImGuiColorEditFlags flags = 0);
IMGUI_API bool ColorPicker4(const char* label, float col[4], ImGuiColorEditFlags flags = 0, const float* ref_col = NULL);
IMGUI_API bool ColorButton(const char* desc_id, const ImVec4& col, ImGuiColorEditFlags flags = 0, const ImVec2& size = ImVec2(0, 0));
IMGUI_API void SetColorEditOptions(ImGuiColorEditFlags flags);
```

| 名前                                                       | 説明                                                                                                                               |
|------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| ColorEdit3(), ColorEdit4(), ColorPicker3(), ColorPicker4() |                                                                                                                                    |
| ColorButton()                                              | 色の四角/ボタンを表示し、ホバーで詳細を表示し、押されたらtrueを返す。                                                                                   |
| SetColorEditOptions()                                      | デフォルトのフォーマットやピッカー・タイプなどを選択したい場合は、現在のオプションを初期化します（通常はアプリケーションの起動時）。 NoOptionsフラグを渡さない限り、ユーザーは多くの設定を変更することができる。 |

### ウィジェット: Trees

- `TreeNode`関数は、ノードが開いているときにtrueを返します、 この場合、ツリー・ノードの内容を表示し終わったときに、`TreePop()` も呼び出す必要があります。

```cpp
IMGUI_API bool  TreeNode(const char* label);
IMGUI_API bool  TreeNode(const char* str_id, const char* fmt, ...) IM_FMTARGS(2);
IMGUI_API bool  TreeNode(const void* ptr_id, const char* fmt, ...) IM_FMTARGS(2);
IMGUI_API bool  TreeNodeV(const char* str_id, const char* fmt, va_list args) IM_FMTLIST(2);
IMGUI_API bool  TreeNodeV(const void* ptr_id, const char* fmt, va_list args) IM_FMTLIST(2);
IMGUI_API bool  TreeNodeEx(const char* label, ImGuiTreeNodeFlags flags = 0);
IMGUI_API bool  TreeNodeEx(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
IMGUI_API bool  TreeNodeEx(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, ...) IM_FMTARGS(3);
IMGUI_API bool  TreeNodeExV(const char* str_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
IMGUI_API bool  TreeNodeExV(const void* ptr_id, ImGuiTreeNodeFlags flags, const char* fmt, va_list args) IM_FMTLIST(3);
IMGUI_API void  TreePush(const char* str_id);
IMGUI_API void  TreePush(const void* ptr_id);
IMGUI_API void  TreePop();
IMGUI_API float GetTreeNodeToLabelSpacing();
IMGUI_API bool  CollapsingHeader(const char* label, ImGuiTreeNodeFlags flags = 0);
IMGUI_API bool  CollapsingHeader(const char* label, bool* p_visible, ImGuiTreeNodeFlags flags = 0);
IMGUI_API void  SetNextItemOpen(bool is_open, ImGuiCond cond = 0);
```

| 名前                        | 説明                                                                                                                                                |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| TreeNode()                  | ヘルパーのバリエーションで、表示された文字列から id を簡単に復号化できる。 IDを使用する理由と方法については、FAQをお読みください。任意のテキストを`TreeNode()`と同じレベルに揃えるには、`Bullet()`を使用できます。    |
| TreePush()                  | ~ `Indent()` + `PushId()`. `TreeNode()`が`true`を返すときにすでに呼び出されていますが、必要であれば自分でTreePush/TreePopを呼び出すことができます。                                   |
| TreePop()                   | ~ `Unindent()` + `PopId()`                                                                                                                          |
| GetTreeNodeToLabelSpacing() | `TreeNode*()`または`Bullet() == (g.FontSize + style.FramePadding.x*2)`をフレームなしの通常のTreeNodeに使用した場合のラベル前の水平距離。                                 |
| CollapsingHeader()          | `true`を返した場合、ヘッダーは開いている。インデントもIDスタックへのプッシュもしない。 ユーザが`TreePop()`を呼び出す必要はない。                                                                  |
| CollapsingHeader()          | `p_visible != NULL`のとき: もし `*p_visible==true` なら、ヘッダーの右上に小さなクローズボタンを追加表示し、クリックされたらブールをfalseに設定する。, もし `*p_visible==false` なら、ヘッダーを表示しない。 |
| SetNextItemOpen()           | 次のTreeNode/CollapsingHeaderのオープン状態を設定します。                                                                                                      |

### ウィジェット: セレクタブル

- カーソルを合わせるとハイライトされ、選択すると別の色を表示できる。
- 隣接する選択可能部分は、ハイライトの境界を広げ、隙間を作らないようにする。これは、選択された一連のセレクタブルが連続して見えるようにするためである。

```cpp
IMGUI_API bool Selectable(const char* label, bool selected = false, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0, 0));
IMGUI_API bool Selectable(const char* label, bool* p_selected, ImGuiSelectableFlags flags = 0, const ImVec2& size = ImVec2(0, 0));
```

| 名前         | 説明                                                                                                                                                                                                        |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Selectable() | "`bool selected`"は選択状態を保持する（読み取り専用）。`Selectable()`をクリックするとtrueが返されるので、選択状態を変更できる。 `size.x==0.0`: 残り幅の使用, `size.x>0.0`: 幅を指定する. `size.y==0.0`: 使用ラベルの高さ, `size.y>0.0`: 高さを指定する |
| Selectable() | 便利なヘルパーとして、"`bool* p_selected`"は選択状態（読み書き可能）を指す。

### ウィジェット: リストボックス

- これは基本的に、`BeginChild`/`EndChild`を使うための薄いラッパーで、いくつかのスタイル上の変更が加えられている。
- `BeginListBox()`/`EndListBox()`APIは、`Selectable()`や任意のアイテムを作成することで、コンテンツや選択状態を好きなように管理できます。
- 簡略化された/古い`ListBox()`apiは、便宜上利用可能にしておく`BeginListBox()`/`EndListBox()`上のヘルパーです。これは、コンボがどのように作成されるかに似ています。
- フレーム幅の選択:   size.x > 0.0f: カスタム  /  size.x < 0.0f or -FLT_MIN: 右寄せ   /  size.x = 0.0f (default): 現在のItemWidthを使用
- フレームの高さの選択:  size.y > 0.0f: カスタム  /  size.y < 0.0f or -FLT_MIN: 下端揃え  /  size.y = 0.0f (default): 任意のデフォルトの高さ~7アイテムに合うことができる

```cpp
IMGUI_API bool BeginListBox(const char* label, const ImVec2& size = ImVec2(0, 0));
IMGUI_API void EndListBox();
IMGUI_API bool ListBox(const char* label, int* current_item, const char* const items[], int items_count, int height_in_items = -1);
IMGUI_API bool ListBox(const char* label, int* current_item, bool (*items_getter)(void* data, int idx, const char** out_text), void* data, int items_count, int height_in_items = -1);
```

| 名前           | 説明                                                       |
|----------------|----------------------------------------------------------|
| BeginListBox() | 枠付きスクロール領域を開く                                         |
| EndListBox()   | `BeginListBox()` が真を返した場合にのみ `EndListBox()` を呼び出します！ |

### ウィジェット: データプロット

- ImPlot(`https://github.com/epezent/implot`)を使うことを検討してください！

```cpp
IMGUI_API void PlotLines(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0), int stride = sizeof(float));
IMGUI_API void PlotLines(const char* label, float(*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0));
IMGUI_API void PlotHistogram(const char* label, const float* values, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0), int stride = sizeof(float));
IMGUI_API void PlotHistogram(const char* label, float(*values_getter)(void* data, int idx), void* data, int values_count, int values_offset = 0, const char* overlay_text = NULL, float scale_min = FLT_MAX, float scale_max = FLT_MAX, ImVec2 graph_size = ImVec2(0, 0));
```

### ウィジェット: `Value()` ヘルパー

- これらは、単に`Text()`をフォーマット文字列で呼び出すショートカットに過ぎません。"name:value"形式で単一の値を出力する（ヒント：コード内で自由に宣言して型を扱える。）

```cpp
IMGUI_API void Value(const char* prefix, bool b);
IMGUI_API void Value(const char* prefix, int v);
IMGUI_API void Value(const char* prefix, unsigned int v);
IMGUI_API void Value(const char* prefix, float v, const char* float_format = NULL);
```

### ウィジェット: メニュー

- メニューバーに追加するには、`ImGuiWindowFlags_MenuBar` ウィンドウで `BeginMenuBar()` を使用します。
- `BeginMainMenuBar()`を使用して、画面上部にメニュー・バーを作成し、それに追加する。
- `BeginMenu()`を使用してメニューを作成します。同じ識別子で `BeginMenu()` を複数回呼び出して、さらに項目を追加することができます。
- `MenuItem()`のキーボードショートカットは、便宜上表示されますが、今のところDear ImGuiでは処理されません。

```cpp
IMGUI_API bool BeginMenuBar();
IMGUI_API void EndMenuBar();
IMGUI_API bool BeginMainMenuBar();
IMGUI_API void EndMainMenuBar();
IMGUI_API bool BeginMenu(const char* label, bool enabled = true);
IMGUI_API void EndMenu();
IMGUI_API bool MenuItem(const char* label, const char* shortcut = NULL, bool selected = false, bool enabled = true);
IMGUI_API bool MenuItem(const char* label, const char* shortcut, bool* p_selected, bool enabled = true);
```

| 名前               | 説明                                                                                    |
|--------------------|----------------------------------------------------------------------------------------|
| BeginMenuBar()     | 現在のウィンドウのメニューバーに追加します (親ウィンドウで `ImGuiWindowFlags_MenuBar` フラグが設定されている必要があります)。 |
| EndMenuBar()       | `EndMenuBar()`を呼び出すのは、`BeginMenuBar()`がtrueを返した場合だけです！                             |
| BeginMainMenuBar() | フルスクリーンのメニューバーを作成し、それに追加する。                                                         |
| EndMainMenuBar()   | `EndMainMenuBar()`を呼び出すのは、`BeginMainMenuBar()`がtrueを返す場合だけです！                      |
| BeginMenu()        | サブ・メニュー・エントリを作成する。これがtrueを返す場合のみ、`EndMenu()`を呼び出す！                               |
| EndMenu()          | `EndMenu()`を呼び出すのは、`BeginMenu()` が真を返す場合だけです！                                     |
| MenuItem()         | アクティブになったらtrueを返す。                                                                     |
| MenuItem()         | アクティブになったらtrueを返す + `toggle (*p_selected) if p_selected != NULL`                       |

### ツールチップ

- ツールチップはマウスに追従するウィンドウです。フォーカスを奪うことはありません。
- ツールチップウィンドウには、どのようなタイプの項目でも含めることができます。SetTooltip()は、`if (BeginTooltip()) { Text(...); EndTooltip(); }`イディオムのショートカットです。

```cpp
IMGUI_API bool BeginTooltip();
IMGUI_API void EndTooltip();
IMGUI_API void SetTooltip(const char* fmt, ...) IM_FMTARGS(1);
IMGUI_API void SetTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
```

| 名前           | 説明                                                                                                |
|----------------|---------------------------------------------------------------------------------------------------|
| BeginTooltip() | ツールチップウィンドウを開始/追加する。                                                                            |
| EndTooltip()   | `BeginTooltip()` / `BeginItemTooltip()`が`true`を返す場合にのみ`EndTooltip()`を呼び出します！                   |
| SetTooltip()   | テキストのみのツールチップを設定する。`ImGui::IsItemHovered()`チェックの後によく使われる。`SetTooltip()`への以前の呼び出しをオーバーライドする。 |

#### ツールチップ: アイテムをホバーしたときにツールチップを表示するヘルパー

- `BeginItemTooltip()` は、`if (IsItemHovered(ImGuiHoveredFlags_Tooltip) && BeginTooltip())` イディオムのショートカットです。
- `SetItemTooltip()` は `if (IsItemHovered(ImGuiHoveredFlags_Tooltip)) { SetTooltip(...); }` イディオムのショートカットです.
- `ImGuiHoveredFlags_Tooltip` 自体は、アクティブな入力タイプに応じて `style.HoverFlagsForTooltipMouse` または `style.HoverFlagsForTooltipNav` を使用するショートカットです。マウスの場合、デフォルトは `ImGuiHoveredFlags_Stationary | ImGuiHoveredFlags_DelayShort` です。

```cpp
IMGUI_API bool BeginItemTooltip();
IMGUI_API void SetItemTooltip(const char* fmt, ...) IM_FMTARGS(1);
IMGUI_API void SetItemTooltipV(const char* fmt, va_list args) IM_FMTLIST(1);
```

| BeginItemTooltip() | 直前のアイテムがホバーされた場合、ツールチップウィンドウを開始/追加する。 |
| SetItemTooltip()   | 前のアイテムがホバーされた場合、テキストのみのツールチップを設定する。 以前の SetTooltip() 呼び出しをオーバーライドします。 |

### ポップアップ・モーダル

- 通常のマウスホバー検出（したがって、ほとんどのマウス操作）を背後でブロックする。
- モーダルでない場合：モーダルの外側をクリックするか、ESCAPEキーを押して閉じることができます。
- 可視性の状態（~`bool`）は、通常の`Begin*()`呼び出しのようにプログラマーが保持するのではなく、内部的に保持される。
- 上記の3つのプロパティは関連しています。ポップアップはいつでも閉じられる可能性があるため、ポップアップの表示状態をライブラリに保持する必要があります。
- `IsItemHovered()` または `IsWindowHovered()`を呼び出す際に`ImGuiHoveredFlags_AllowWhenBlockedByPopup`を使用することで、ホバリング制限を回避できます。
- 重要：ポップアップの識別子は現在のIDスタックに対する相対的なものなので、`OpenPopup`と`BeginPopup`は一般的にスタックの同じレベルにある必要がある。 これは時に混乱を招くミスにつながっている。将来的には手直しするかもしれない。

#### ポップアップ: begin/end 関数

- `BeginPopup()`: クエリ・ポップアップの状態を確認し、開いていればウィンドウへの追加を開始します。その後、`EndPopup()`を呼び出します。`ImGuiWindowFlags`はウィンドウに転送されます。
- `BeginPopupModal()`: ウィンドウの背後にあるすべてのインタラクションをブロックし、ユーザーが閉じることはできません、調光背景を追加し、タイトルバーを持っています。

```cpp
IMGUI_API bool BeginPopup(const char* str_id, ImGuiWindowFlags flags = 0);
IMGUI_API bool BeginPopupModal(const char* name, bool* p_open = NULL, ImGuiWindowFlags flags = 0);
IMGUI_API void EndPopup();
```

| 名前              | 説明                                                     |
|-------------------|--------------------------------------------------------|
| BeginPopup()      | ポップアップが開いていればtrueを返す。                                  |
| BeginPopupModal() | モーダルが開いていれば true を返し、出力を開始できます。                    |
| EndPopup()        | `BeginPopupXXX()` が真を返す場合にのみ `EndPopup()` を呼び出します！ |

#### ポップアップ: open/close 関数

- `OpenPopup()`: ポップアップの状態をオープンに設定します。`ImGuiPopupFlags`はオプションを開くために利用可能です。
- モーダルでない場合: モーダルの外側をクリックするか、ESCAPEキーを押して閉じることができます。
- `CloseCurrentPopup()`: `BeginPopup()` / `EndPopup()`スコープ内で使用し、手動で閉じます。
- `CloseCurrentPopup()` は、`Selectable()` / `MenuItem()` がアクティブになるとデフォルトで呼び出されます。 (修正: いくつかのオプションが必要).
- `ImGuiPopupFlags_NoOpenOverExistingPopup` を使用して、同じレベルに既にポップアップがある場合にポップアップを開かないようにします。これは例えば、`OpenPopup()` の前に `!IsAnyPopupOpen()` をテストすることと同じです。
- `BeginPopup()` の後に `IsWindowAppearing()` を使用して、ウィンドウが開いたかどうかを確認します。
- 重要: `OpenPopupOnItemClick()` では、'`int mouse_button = 1`' パラメータを取る古いAPIとの後方互換性のため、例外的にデフォルトのフラグを`1 (== ImGuiPopupFlags_MouseButtonRight)`にしていることに注意してください。

```cpp
IMGUI_API void OpenPopup(const char* str_id, ImGuiPopupFlags popup_flags = 0);
IMGUI_API void OpenPopup(ImGuiID id, ImGuiPopupFlags popup_flags = 0);
IMGUI_API void OpenPopupOnItemClick(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);
IMGUI_API void CloseCurrentPopup();
```

| 名前                   | 説明                                                                                                                                            |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| OpenPopup()            | 呼び出して、ポップアップが開いているとマークします（フレームごとに呼び出さないでください！）。                                                                                            |
| OpenPopup()            | ネストしたスタックからの呼び出しを容易にするidオーバーロード                                                                                                             |
| OpenPopupOnItemClick() | 最後の項目をクリックしたときにポップアップを開くヘルパー。 デフォルトは `ImGuiPopupFlags_MouseButtonRight == 1` です。 (注：ポップアップの動作と矛盾しないように、実際にはマウスが離されたイベントがトリガーされます。) |
| CloseCurrentPopup()    | 手動でポップアップを閉じる。                                                                                                                               |

#### ポップアップ: open + beginの複合機能ヘルパー

- OpenPopup + BeginPopupを行うためのヘルパーで、Openアクションは例えばアイテムをホバーして右クリックすることでトリガーされます。
- コンテキストメニューを簡単に作成するのに便利なことから、この名前がついた。
- 重要： `BeginPopupContextXXX` は `OpenPopup()` のように `ImGuiPopupFlags` を取り、 `BeginPopup()` とは異なることに注意してください。完全な一貫性を保つために、将来的には `BeginPopupContextXXX` 関数に `ImGuiWindowFlags` を追加するかもしれません。
- 重要：'`int mouse_button = 1`'パラメータを取る古いAPIとの後方互換性のため、例外的にそれらのフラグをデフォルトで`1 (== ImGuiPopupFlags_MouseButtonRight)`にしていることに注意してください、 そのため、他のフラグを追加した場合は、 `ImGuiPopupFlags_MouseButtonRight` を再度追加することを忘れないでください。

```cpp
IMGUI_API bool BeginPopupContextItem(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);
IMGUI_API bool BeginPopupContextWindow(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);
IMGUI_API bool BeginPopupContextVoid(const char* str_id = NULL, ImGuiPopupFlags popup_flags = 1);
```

#### ポップアップ: クエリ関数

- IsPopupOpen(): ポップアップ・スタックの現在の `BeginPopup()` レベルでポップアップが開いている場合、`true` を返します。
- IsPopupOpen() with ImGuiPopupFlags_AnyPopupId: ポップアップ・スタックの現在の `BeginPopup()` レベルで開いているポップアップがあれば`true`を返します。
- IsPopupOpen() with ImGuiPopupFlags_AnyPopupId + ImGuiPopupFlags_AnyPopupLevel: ポップアップが開いていれば`true`を返す。

```cpp
IMGUI_API bool IsPopupOpen(const char* str_id, ImGuiPopupFlags flags = 0);
```

- `IsPopupOpen()`: ポップアップが開いていればtrueを返す。

### テーブル

- 古いColumns APIに代わるフル機能のAPI。
- デモコードは `Demo>Tables` を参照。一般的な解説は `imgui_tables.cpp` の先頭を参照。
- 利用可能なフラグについては `ImGuiTableFlags_` と `ImGuiTableColumnFlags_` 列挙型を参照のこと。

典型的なコールフローは次のとおりです。:

1. `BeginTable()`を呼び出して、`false`を返したらアーリーアウトする。
2. オプションで `TableSetupColumn()` を呼び出して、列の `名前/フラグ/デフォルト` を送信する。
3. オプションで `TableSetupScrollFreeze()` を呼び出して、`columns/rows` のスクロールフリーズを要求する。
4. オプションで `TableHeadersRow()` を呼び出してヘッダ行を登録する。名前は `TableSetupColumn()` のデータから取得される。
5. コンテンツの投入:
   - 大抵の場合、`TableNextRow()` + `TableSetColumnIndex(N)` で列への追加を開始することができます。
   - テーブルを一種のグリッドとして使用していて、すべての列が同じ種類の内容を保持している場合は、 `TableNextRow()` + `TableSetColumnIndex()` の代わりに `TableNextColumn()` を使用する方がよいでしょう。`TableNextColumn()` は、必要に応じて自動的に次の行に折り返します。
   - 重要：古い `Columns()` API と比較すると、最初のカラムに対して `TableNextColumn()` を呼び出す必要がある！
6. `EndTable()` を呼び出す

::: tip 可能な呼び出しの流れ
OK:

1. TableNextRow()
2. TableSetColumnIndex(0)
3. Text("Hello 0")
4. TableSetColumnIndex(1)
5. Text("Hello 1")

OK:

1. TableNextRow()
3. TableNextColumn()
3. Text("Hello 0")
4. TableNextColumn()
5. Text("Hello 1")

OK: 

`TableNextColumn()` は自動的に次の行に移動する！

1. TableNextColumn()
2. Text("Hello 0")
3. TableNextColumn()
4. Text("Hello 1")

Not OK!:

`TableSetColumnIndex()` または `TableNextColumn()` がありません！ テキストは表示されません！

1. TableNextRow()
2. Text("Hello 0")
:::

```

```cpp
IMGUI_API bool BeginTable(const char* str_id, int column, ImGuiTableFlags flags = 0, const ImVec2& outer_size = ImVec2(0.0f, 0.0f), float inner_width = 0.0f);
IMGUI_API void EndTable();
IMGUI_API void TableNextRow(ImGuiTableRowFlags row_flags = 0, float min_row_height = 0.0f);
IMGUI_API bool TableNextColumn();
IMGUI_API bool TableSetColumnIndex(int column_n);
```

| 名前                  | 説明                                                                         |
|-----------------------|----------------------------------------------------------------------------|
| EndTable()            | `EndTable()` を呼び出すのは、`BeginTable()` が真を返す場合だけです！                       |
| TableNextRow()        | 新しい行の最初のセルに追加する。                                                       |
| TableNextColumn()     | 次の列（現在最後の列にいる場合は、次の行の最初の列）に追加する。 カラムが表示されている場合はtrueを返す。 |
| TableSetColumnIndex() | 指定されたカラムに追加する。カラムが表示されている場合は true を返します。                            |

### テーブル: ヘッダー＆カラム宣言

- `TableSetupColumn()` を使用して、ラベル、リサイズポリシー、デフォルトの幅/重み、id、その他のさまざまなフラグなどを指定します。
- `TableHeadersRow()` を使用してヘッダ行を作成し、各列の `TableHeader()` を自動的に送信します。 ヘッダーは、並べ替え、並べ替え、コンテキストメニューを開くために必要です。 コンテキストメニューは、`ImGuiTableFlags_ContextMenuInBody`を使用して、カラムのボディでも利用できるようにすることができます。
- `TableNextRow()` + `TableHeader()` 呼び出しを使用して手動でヘッダを送信することもできますが、これは一部の高度な使用例（ヘッダ行にカスタムウィジェットを追加するなど）でしか役に立ちません。
- `TableSetupScrollFreeze()` を使用して列や行をロックし、スクロールしても表示されるようにします。

```cpp
IMGUI_API void TableSetupColumn(const char* label, ImGuiTableColumnFlags flags = 0, float init_width_or_weight = 0.0f, ImGuiID user_id = 0);
IMGUI_API void TableSetupScrollFreeze(int cols, int rows);
IMGUI_API void TableHeadersRow();
IMGUI_API void TableHeader(const char* label);
```

| 名前                     | 説明                                                                       |
|--------------------------|--------------------------------------------------------------------------|
| TableSetupScrollFreeze() | スクロールしても表示されるように、列や行をロックする。                                            |
| TableHeadersRow()        | `TableSetupColumn()` に提供されたデータに基づいて、すべてのヘッダ・セルを送信 + コンテキスト・メニューから送信 |
| TableHeader()            | 手動でヘッダーセルを1つ送信する（ほとんど使用されない）                                         |

### テーブル: ソートとその他の機能

- ソート: `TableGetSortSpecs()` をコールして、テーブルの最新のソート仕様を取得します。ソートしない場合は`NULL`。`sort_specs->SpecsDirty == true`の場合、データをソートする必要がある。前回のコールからソートの仕様が変更された場合、または初めてコールされた場合にtrueとなる。ソート後に必ず `SpecsDirty = false` を設定してください。そうしないと、データを毎フレーム無駄にソートする可能性があります！
- 関数の引数 `int column_n` は、デフォルト値の`-1`を、現在のカラムインデックスを渡すのと同じように扱う。

```cpp
IMGUI_API ImGuiTableSortSpecs*  TableGetSortSpecs();
IMGUI_API int                   TableGetColumnCount();
IMGUI_API int                   TableGetColumnIndex();
IMGUI_API int                   TableGetRowIndex();
IMGUI_API const char*           TableGetColumnName(int column_n = -1);
IMGUI_API ImGuiTableColumnFlags TableGetColumnFlags(int column_n = -1);
IMGUI_API void                  TableSetColumnEnabled(int column_n, bool v);
IMGUI_API void                  TableSetBgColor(ImGuiTableBgTarget target, ImU32 color, int column_n = -1);
```

| 名前                    | 説明                                                                                                                                                                                         |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| TableGetSortSpecs()     | テーブルの最新のソート仕様を取得します (ソートしていない場合は `NULL`)。ライフタイム: このポインタを複数フレームにわたって保持したり、`BeginTable()`を呼び出したりしない。                                                                             |
| TableGetColumnCount()   | カラム数を返す (BeginTable に渡された値)                                                                                                                                                              |
| TableGetColumnIndex()   | 現在のカラムインデックスを返します。                                                                                                                                                                        |
| TableGetRowIndex()      | 現在の行インデックスを返します。                                                                                                                                                                         |
| TableGetColumnName()    | カラムが `TableSetupColumn()` で宣言された名前を持っていない場合は `""` を返す。現在のカラムを使用する場合は `-1` を渡す。                                                                                                |
| TableGetColumnFlags()   | カラムの Enabled/Visible/Sorted/Hovered ステータスのフラグを問い合わせることができるように、カラムのフラグを返します。現在のカラムを使用する場合は `-1` を渡す。                                                                                |
| TableSetColumnEnabled() | ユーザがアクセス可能なカラムの有効/無効状態を変更する。カラムを非表示にするには`false`を設定します。ユーザはコンテキストメニューを使用して、この状態を変更することができます（ヘッダで右クリックするか、`ImGuiTableFlags_ContextMenuInBody`を使用してカラムの本文で右クリックします）。 |
| TableSetBgColor()       | セル、行、列の色を変更する。詳細は `ImGuiTableBgTarget_flags` を参照。                                                                                                                                   |

### レガシーなカラムAPI（テーブルを使う方がいい!）

- `SameLine(pos_x)` を使って、単純化された列を模倣することもできる。

```cpp
IMGUI_API void  Columns(int count = 1, const char* id = NULL, bool border = true);
IMGUI_API void  NextColumn();
IMGUI_API int   GetColumnIndex();
IMGUI_API float GetColumnWidth(int column_index = -1);
IMGUI_API void  SetColumnWidth(int column_index, float width);
IMGUI_API float GetColumnOffset(int column_index = -1);
IMGUI_API void  SetColumnOffset(int column_index, float offset_x);
IMGUI_API int   GetColumnsCount();
```

| 名前              | 説明                                                                                                  |
|-------------------|-----------------------------------------------------------------------------------------------------|
| NextColumn()      | 次の列、デフォルトは現在の行、または現在の行が終了した場合は次の行                                                       |
| GetColumnIndex()  | 現在の列のインデックスを取得                                                                                   |
| GetColumnWidth()  | 列の幅をピクセル単位で取得する。 現在のカラムを使用する場合は -1 を渡す                                                   |
| SetColumnWidth()  | 列の幅をピクセル単位で設定します。 現在のカラムを使用する場合は -1 を渡す                                                  |
| GetColumnOffset() | コンテンツ領域の左端から、列の行の位置をピクセル単位で取得する。 現在のカラムを使用する場合は -1、そうでない場合は 0 を渡す。 カラム0は通常0.0f |
| SetColumnOffset() | コンテンツ領域の左端から、ピクセル単位で列の位置を設定する。 現在のカラムを使用する場合は -1 を渡す                                |

### タブバー、タブ

- 注: タブはドッキングシステムによって自動的に作成されます（「ドッキング」ブランチにある場合）。自分でタブバーやタブを作成する場合は、これを使用してください。

```cpp
IMGUI_API bool BeginTabBar(const char* str_id, ImGuiTabBarFlags flags = 0);
IMGUI_API void EndTabBar();
IMGUI_API bool BeginTabItem(const char* label, bool* p_open = NULL, ImGuiTabItemFlags flags = 0);
IMGUI_API void EndTabItem();
IMGUI_API bool TabItemButton(const char* label, ImGuiTabItemFlags flags = 0);
IMGUI_API void SetTabItemClosed(const char* tab_or_docked_window_label);
```

| 名前               | 説明                                                                                                                                                   |
|--------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| BeginTabBar()      | タブバーの作成と追加                                                                                                                                         |
| EndTabBar()        | `BeginTabBar()`が`true`を返した場合のみ`EndTabBar()`を呼び出す！                                                                                                 |
| BeginTabItem()     | タブを作成する。タブが選択されている場合はtrueを返します。                                                                                                                 |
| EndTabItem()       | `BeginTabItem()` が`true`を返す場合にのみ `EndTabItem()` を呼び出します！                                                                                          |
| TabItemButton()    | クリックされると`true`を返す。タブバーで選択することはできない。                                                                                                                 |
| SetTabItemClosed() | 閉じたタブ/ウィンドウをタブバーやドッキングシステムに通知する（並べ替え可能なタブバーの視覚的なちらつきを抑えるのに便利）。 タブ・バーの場合： `BeginTabBar()`の後、タブ追加の前にコールする。それ以外の場合はウィンドウ名で呼び出す。 |

### ロギング/キャプチャ

- インターフェイスからのすべてのテキスト出力は、`tty/file/clipboard`に取り込むことができる。デフォルトでは、ロギング中にツリーノードが自動的に開かれる。

```cpp
IMGUI_API void LogToTTY(int auto_open_depth = -1);
IMGUI_API void LogToFile(int auto_open_depth = -1, const char* filename = NULL);
IMGUI_API void LogToClipboard(int auto_open_depth = -1);
IMGUI_API void LogFinish();
IMGUI_API void LogButtons();
IMGUI_API void LogText(const char* fmt, ...) IM_FMTARGS(1);
IMGUI_API void LogTextV(const char* fmt, va_list args) IM_FMTLIST(1);
```

| 名前             | 説明                                        |
|------------------|-------------------------------------------|
| LogToTTY()       | tty（標準出力）へのログ記録開始                   |
| LogToFile()      | ファイルへのログ記録開始                            |
| LogToClipboard() | OSのクリップボードへのログ記録開始                      |
| LogFinish()      | ロギングを停止する（ファイルを閉じるなど）                    |
| LogButtons()     | tty/file/clipboard へのログ記録用ボタンを表示するヘルパー |
| LogText()        | テキストデータをログに直接渡す（表示されない）                |

### ドラッグ・アンド・ドロップ

- ソース・アイテムで `BeginDragDropSource()` を呼び出し、`true` を返したら `SetDragDropPayload()` + `EndDragDropSource()` も呼び出します。
- ターゲット候補では、`BeginDragDropTarget()` を呼び出し、`true` を返したら `AcceptDragDropPayload()` + `EndDragDropTarget()` も呼び出します。
- `BeginDragDropSource()` の呼び出しを止めると、ペイロードは保持されますが、プレビューツールチップは表示されません。 (現在、フォールバックとして「...」ツールチップを表示しています。`#1725`を参照)
- アイテムはドラッグソースにもドロップターゲットにもなります。

```cpp
IMGUI_API bool BeginDragDropSource(ImGuiDragDropFlags flags = 0);
IMGUI_API bool SetDragDropPayload(const char* type, const void* data, size_t sz, ImGuiCond cond = 0);
IMGUI_API void EndDragDropSource();
IMGUI_API bool                BeginDragDropTarget();
IMGUI_API const ImGuiPayload* AcceptDragDropPayload(const char* type, ImGuiDragDropFlags flags = 0);
IMGUI_API void                EndDragDropTarget();
IMGUI_API const ImGuiPayload* GetDragDropPayload();
```

| 名前                    | 説明                                                                                                                                      |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| BeginDragDropSource()   | ドラッグされる可能性のあるアイテムを提出した後に呼び出される. これが`true`を返すとき, `SetDragDropPayload()` + `EndDragDropSource()` を呼び出すことができます。                   |
| SetDragDropPayload()    | `type`はユーザー定義の最大32文字の文字列です。 '_'で始まる文字列は、dear imguiの内部型用に予約されていますデータはコピーされ、imguiが保持する。ペイロードが受け入れられた場合は`true`を返す。 |
| EndDragDropSource()     | `BeginDragDropSource()` が `true` を返す場合にのみ `EndDragDropSource()` を呼び出します！                                                             |
| BeginDragDropTarget()   | ペイロードを受け取る可能性のあるアイテムを送信した後に呼び出される。 これがtrueを返した場合, `AcceptDragDropPayload()` + `EndDragDropTarget()` を呼び出すことができます。          |
| AcceptDragDropPayload() | 指定されたタイプのコンテンツを受け入れる. `ImGuiDragDropFlags_AcceptBeforeDelivery` が設定されていれば、マウスボタンが離される前にペイロードを覗き見ることができます。                       |
| EndDragDropTarget()     | `BeginDragDropTarget()` が `true` を返す場合にのみ `EndDragDropTarget()` を呼び出します！                                                             |
| GetDragDropPayload()    | 現在のペイロードをどこからでも直接覗くことができる。 `NULL`を返すかもしれない。 `ImGuiPayload::IsDataType()` を使用して、ペイロードのタイプをテストします。                                  |

### 無効化 [BETA API]

- すべてのユーザー インタラクションを無効にし、アイテムのビジュアルを暗くします（現在の色に `style.DisabledAlpha` を適用します）。
- これらは入れ子にすることができるが、すでに無効になっているセクションを有効にするために使うことはできない（スタック内の1つの`BeginDisabled(true)`は、すべてを無効に保つのに十分である）。
- `BeginDisabled(false)`は基本的に何の役にも立たないが、ブーリアン式を使いやすくするために用意されている。もし`BeginDisabled(False)`/`EndDisabled()`を呼ばないようにできるのであれば、それを避けるのが一番です。

```cpp
IMGUI_API void BeginDisabled(bool disabled = true);
IMGUI_API void EndDisabled();
```

### クリッピング

- マウスホバリングは `ImGui::PushClipRect()` 呼び出しの影響を受けますが、`ImDrawList::PushClipRect()` の直接呼び出しはレンダリングのみです。

```cpp
IMGUI_API void PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect);
IMGUI_API void PopClipRect();
```

### フォーカス, アクティブ化

- `if(IsWindowAppearing()) SetScrollHereY()`よりも `SetItemDefaultFocus()`を使用した方が、「これはデフォルトの項目である」ことを示すことができます。

```cpp
IMGUI_API void SetItemDefaultFocus();
IMGUI_API void SetKeyboardFocusHere(int offset = 0);
```

| 名前                   | 説明                                                                                                                  |
|------------------------|---------------------------------------------------------------------------------------------------------------------|
| SetItemDefaultFocus()  | 最後の項目をウィンドウのデフォルトのフォーカス項目にする。                                                                                   |
| SetKeyboardFocusHere() | キーボードを次のウィジェットにフォーカスする。複数のコンポーネント・ウィジェットのサブ・コンポーネントにアクセスするには、正の'offset'を使用します。前のウィジェットにアクセスするには、-1を使用してください。 |

### オーバーラッピング・モード

```cpp
IMGUI_API void SetNextItemAllowOverlap();
```

| 名前                      | 説明                                                                                                                                                                     |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SetNextItemAllowOverlap() | 次の項目が後続の項目に重なるようにする。不可視のボタン、選択可能な項目、後続の項目を追加する必要のある領域をカバーするTreenodeなどで便利です。Selectable()とTreeNode()の両方がこれを行う専用のフラグを持っていることに注意してください。 |

### アイテム/ウィジェット ユーティリティとクエリ関数

- ほとんどの関数は、前回提出されたアイテムを参照しています。
- これらの関数のほとんどをインタラクティブに視覚化するには、`Widgets->Querying Status`のデモウィンドウを参照してください。

```cpp
IMGUI_API bool    IsItemHovered(ImGuiHoveredFlags flags = 0);
IMGUI_API bool    IsItemActive();
IMGUI_API bool    IsItemFocused();
IMGUI_API bool    IsItemClicked(ImGuiMouseButton mouse_button = 0);
IMGUI_API bool    IsItemVisible();
IMGUI_API bool    IsItemEdited();
IMGUI_API bool    IsItemActivated();
IMGUI_API bool    IsItemDeactivated();
IMGUI_API bool    IsItemDeactivatedAfterEdit();
IMGUI_API bool    IsItemToggledOpen();
IMGUI_API bool    IsAnyItemHovered();
IMGUI_API bool    IsAnyItemActive();
IMGUI_API bool    IsAnyItemFocused();
IMGUI_API ImGuiID GetItemID();
IMGUI_API ImVec2  GetItemRectMin();
IMGUI_API ImVec2  GetItemRectMax();
IMGUI_API ImVec2  GetItemRectSize();
```

| 名前                         | 説明                                                                                                                                                                                                                                     |
|------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IsItemHovered()              | 最後の項目がホバーされているか？(そして使用可能か、ポップアップなどでブロックされていないか)。その他のオプションについては ImGuiHoveredFlags を参照してください。                                                                                                                                   |
| IsItemActive()               | 最後の項目がアクティブか？(例：ボタンが押されている、テキストフィールドが編集されている。アイテム上でマウスボタンを押し続けている間、これは継続的にtrueを返します。相互作用しないアイテムは常にfalseを返します)                                                                                                      |
| IsItemFocused()              | キーボード/ゲームパッドのナビゲーションのためにフォーカスされた最後の項目か？                                                                                                                                                                                              |
| IsItemClicked()              | 最後の項目がマウスカーソルを合わせてクリックされたか？ `== IsMouseClicked(mouse_button) && IsItemHovered()Important`. これは、例えば`Button()`の動作と同じではありません。関数定義のコメントを読んでください。                                                                               |
| IsItemVisible()              | 最後の項目が表示されているか？(クリッピング／スクロールのため、アイテムが見えない場合があります)                                                                                                                                                                               |
| IsItemEdited()               | 最後のアイテムがこのフレームで値を変更したか、または押されたか？これは一般的に、多くのウィジェットの "bool" 戻り値と同じです。                                                                                                                                                         |
| IsItemActivated()            | 最後にアクティブになった項目（以前はアクティブでなかった）。                                                                                                                                                                                                     |
| IsItemDeactivated()          | 最後に非アクティブになった項目（以前はアクティブだった）。 連続編集が必要なウィジェットのUndo/Redoパターンに便利です。                                                                                                                                                          |
| IsItemDeactivatedAfterEdit() | 最後の項目が非アクティブになっただけで、アクティブになったときに値を変更したか？ (例：スライダー／ドラッグの移動). 連続編集が必要なウィジェットのUndo/Redoパターンに便利です。 誤検出が発生する可能性があることに注意してください（Combo()/ListBox()/Selectable()などの一部のウィジェットは、すでに選択されている項目をクリックしてもtrueを返します）。 |
| IsItemToggledOpen()          | 最後に開いたアイテムの状態がトグルされたか？ TreeNode() によって設定される。                                                                                                                                                                                      |
| IsAnyItemHovered()           | アイテムがホバーされているか？                                                                                                                                                                                                                          |
| IsAnyItemActive()            | アクティブな項目はありますか？                                                                                                                                                                                                                        |
| IsAnyItemFocused()           | どの項目がフォーカスされているか？                                                                                                                                                                                                                      |
| GetItemID()                  | 最後のアイテムのIDを取得する (~~ しばしば同じ `ImGui::GetID(label`) を事前に取得する)                                                                                                                                                                      |
| GetItemRectMin()             | 最後のアイテムの左上境界矩形を取得する（スクリーンスペース）                                                                                                                                                                                                 |
| GetItemRectMax()             | 最後のアイテムの右下境界矩形を取得する（スクリーンスペース）                                                                                                                                                                                                 |
| GetItemRectSize()            | 最後のアイテムのサイズを取得する                                                                                                                                                                                                                     |

### ビューポート

- 現在、Dear ImGuiウィンドウをホストしているアプリケーションによって作成されたプラットフォームウィンドウを表しています。
- マルチビューポートを有効にした'ドッキング'ブランチでは、このコンセプトを拡張して、複数のアクティブビューポートを持つことができます。
- 将来的には、この概念をさらに拡張して、Platform Monitorも表現し、「メインプラットフォームウィンドウなし」の操作モードをサポートする予定です。

```cpp
IMGUI_API ImGuiViewport* GetMainViewport();
```

| 名前              | 説明                                                     |
|-------------------|----------------------------------------------------------|
| GetMainViewport() | プライマリ/デフォルトビューポートを返す。NULLになることはありません。|

### 背景／前景ドローリスト

```cpp
IMGUI_API ImDrawList* GetBackgroundDrawList();
IMGUI_API ImDrawList* GetForegroundDrawList();
```

| 名前                    | 説明                                                                            |
|-------------------------|-------------------------------------------------------------------------------|
| GetBackgroundDrawList() | この描画リストが最初に描画されます。dear imguiコンテンツの背後に図形やテキストを素早く描画するのに便利です。     |
| GetForegroundDrawList() | この描画リストは最後にレンダリングされたものになる。dear imguiコンテンツの上に素早く図形やテキストを描画するのに便利です。 |

### その他ユーティリティ

```cpp
IMGUI_API bool          IsRectVisible(const ImVec2& size);
IMGUI_API bool          IsRectVisible(const ImVec2& rect_min, const ImVec2& rect_max);
IMGUI_API double        GetTime();
IMGUI_API int           GetFrameCount();
IMGUI_API ImDrawListSharedData* GetDrawListSharedData();
IMGUI_API const char*   GetStyleColorName(ImGuiCol idx);
IMGUI_API void          SetStateStorage(ImGuiStorage* storage);
IMGUI_API ImGuiStorage* GetStateStorage();
IMGUI_API bool          BeginChildFrame(ImGuiID id, const ImVec2& size, ImGuiWindowFlags flags = 0);
IMGUI_API void          EndChildFrame();
```

| 名前                                 | 説明                                                                                                                   |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| IsRectVisible()                      | (カーソル位置から始まる、指定されたサイズの)矩形が表示されているか / クリッピングされていないかテストする。                             |
| IsRectVisible()                      | 矩形が（スクリーンスペース内で）表示されているか／クリッピングされていないかをテストする。ユーザー側で粗いクリッピングを行う。               |
| GetTime()                            | グローバルなimgui時間を取得する. フレームごとに`io.DeltaTime`だけ増加する。                                                        |
| GetFrameCount()                      | グローバルなimguiのフレーム数を取得する. 毎フレーム1ずつ増加.                                                            |
| GetDrawListSharedData()              | 独自のImDrawListインスタンスを作成する際に使用することができる。                                                          |
| GetStyleColorName()                  | 列挙型の値に対応する文字列を取得する（表示用、保存用など）。                                              |
| SetStateStorage(), GetStateStorage() | 現在のウィンドウストレージを独自のものに置き換える（自分で操作する場合は、通常はサブセクションをクリアする）。  |
| BeginChildFrame()                    | 通常のウィジェットフレームのように見える子ウィンドウ/スクロール領域を作成するヘルパー                               |
| EndChildFrame()                      | BeginChildFrame()の戻り値に関係なく、常にEndChildFrame()を呼び出す（これはウィンドウの折りたたみ/クリップを示す）。 |


### テキスト・ユーティリティ

```cpp
IMGUI_API ImVec2 CalcTextSize(const char* text, const char* text_end = NULL, bool hide_text_after_double_hash = false, float wrap_width = -1.0f);
```

### カラーユーティリティ

```cpp
IMGUI_API ImVec4 ColorConvertU32ToFloat4(ImU32 in);
IMGUI_API ImU32  ColorConvertFloat4ToU32(const ImVec4& in);
IMGUI_API void   ColorConvertRGBtoHSV(float r, float g, float b, float& out_h, float& out_s, float& out_v);
IMGUI_API void   ColorConvertHSVtoRGB(float h, float s, float v, float& out_r, float& out_g, float& out_b);
```

### 入力ユーティリティ: キーボード/マウス/ゲームパッド

- ImGuiKey列挙型には、キーボード、マウス、ゲームパッドのすべての入力が含まれます（例：ImGuiKey_A、ImGuiKey_MouseLeft、ImGuiKey_GamepadDpadUp...）。
- v1.87以前では、ImGuiKeyを使用して、各バックエンドで定義されたネイティブ/ユーザーインデックスを保持していました。これらのレガシーImGuiKey値の使用について:
  - without IMGUI_DISABLE_OBSOLETE_KEYIO (レガシーサポート): バックエンド/エンジンが`io.KeysDown[]`に格納した方法に従って、レガシーネイティブ/ユーザーインデックス（`< 512`）を使用することはできますが、ImGuiKeyにキャストする必要があります。
  - with    IMGUI_DISABLE_OBSOLETE_KEYIO (これが進むべき道だ): ImGuiKeyを使用する場合、`key < 512`でアサートされる。GetKeyIndex() はパススルーなので非推奨 (IMGUI_DISABLE_OBSOLETE_KEYIO が定義されている場合は無効).

```cpp
IMGUI_API bool        IsKeyDown(ImGuiKey key);
IMGUI_API bool        IsKeyPressed(ImGuiKey key, bool repeat = true);
IMGUI_API bool        IsKeyReleased(ImGuiKey key);
IMGUI_API int         GetKeyPressedAmount(ImGuiKey key, float repeat_delay, float rate);
IMGUI_API const char* GetKeyName(ImGuiKey key);
IMGUI_API void        SetNextFrameWantCaptureKeyboard(bool want_capture_keyboard);
```

| 名前                              | 説明                                                                                                                                                                                                                                                                                                                                           |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IsKeyDown()                       | is key being held.                                                                                                                                                                                                                                                                                                                             |
| IsKeyPressed()                    | もし`repeat=true`なら、`io.KeyRepeatDelay` / `KeyRepeatRate`を使う。                                                                                                                                                                                                                                              |
| IsKeyReleased()                   | キーが解除された（ダウンから！ダウンになった）？                                                                                                                                                                                                                                                                                                   |
| GetKeyPressedAmount()             | 指定されたリピートレート/ディレイを使用する。 カウントを返す。たいていは 0 か 1 だが、RepeatRate が十分小さくて `DeltaTime > RepeatRate` となる場合は `>1` になる。                                                                                                                                                                                                 |
| GetKeyName()                      | (デバッグ) キーの英語名を返す。これらの名前はデバッグのために提供されるものであり、比較されずに永続的に保存されることを意図したものではありません。                                                                                                                                                                                                 |
| SetNextFrameWantCaptureKeyboard() | 次のフレームでio.WantCaptureKeyboardフラグをオーバーライドする。 (このフラグはアプリケーションの処理に委ねられますが、通常、true の場合、アプリケーションは入力を無視します。). 例えば、ウィジェットがホバーされたときにキーボードを強制的にキャプチャします。これは、次のNewFrame()を呼び出した後に、"io.WantCaptureKeyboard = want_capture_keyboard "と設定することと同じです。 |


### 入力ユーティリティ： マウス専用

- マウスボタンを参照するには、ImGuiMouseButton_LeftやImGuiMouseButton_Rightのように、名前付き列挙型を使用します。
- 通常の整数の場合、0＝左、1＝右、2＝真ん中が永遠に保証される。
- ドラッグ操作は、マウスが最初のクリック位置から一定距離移動した後にのみ報告される（'lock_threshold'と'io.MouseDraggingThreshold'を参照）。

```cpp
IMGUI_API bool          IsMouseDown(ImGuiMouseButton button);
IMGUI_API bool          IsMouseClicked(ImGuiMouseButton button, bool repeat = false);
IMGUI_API bool          IsMouseReleased(ImGuiMouseButton button);
IMGUI_API bool          IsMouseDoubleClicked(ImGuiMouseButton button);
IMGUI_API int           GetMouseClickedCount(ImGuiMouseButton button);
IMGUI_API bool          IsMouseHoveringRect(const ImVec2& r_min, const ImVec2& r_max, bool clip = true);
IMGUI_API bool          IsMousePosValid(const ImVec2* mouse_pos = NULL);
IMGUI_API bool          IsAnyMouseDown();
IMGUI_API ImVec2        GetMousePos();
IMGUI_API ImVec2        GetMousePosOnOpeningCurrentPopup();
IMGUI_API bool          IsMouseDragging(ImGuiMouseButton button, float lock_threshold = -1.0f);
IMGUI_API ImVec2        GetMouseDragDelta(ImGuiMouseButton button = 0, float lock_threshold = -1.0f);
IMGUI_API void          ResetMouseDragDelta(ImGuiMouseButton button = 0);
IMGUI_API ImGuiMouseCursor GetMouseCursor();
IMGUI_API void          SetMouseCursor(ImGuiMouseCursor cursor_type);
IMGUI_API void          SetNextFrameWantCaptureMouse(bool want_capture_mouse);
```

| 名前                               | 説明                                                                                                                                                                                                                                                                 |
|------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| IsMouseDown()                      | マウスボタンが押されているか？                                                                                                                                                                                                                                                |
| IsMouseClicked()                   | マウスボタンがクリックされたか？ (!ダウンからダウンへ). GetMouseClickedCount() == 1 と同じ。.                                                                                                                                                                            |
| IsMouseReleased()                  | マウスボタンを離したか？ (ダウンから!ダウンへ)                                                                                                                                                                                                                 |
| IsMouseDoubleClicked()             | マウス・ボタンがダブルクリックされたか？GetMouseClickedCount() == 2 と同じです（ダブルクリックは IsMouseClicked() == true も報告することに注意してください）。                                                                                                                           |
| GetMouseClickedCount()             | クリックが発生した時点の連続したマウスクリックの回数を返す(それ以外は0)。                                                                                                                                                                         |
| IsMouseHoveringRect()              | 現在のクリッピング設定によってクリッピングされるが、フォーカス/ウィンドウの順序/ポップアップブロックの他の考慮は無視される。                                                                                         |
| IsMousePosValid()                  | 慣例として、(-FLT_MAX,-FLT_MAX)はマウスがないことを表す。                                                                                                                                                                                 |
| IsAnyMouseDown()                   | [WILL OBSOLETE] マウスのボタンが押されていますか？ これはバックエンドのために設計されたものだが、バックエンドが保持されているマウスボタンのマスクを保持する方が望ましい。                                                               |
| GetMousePos()                      | ImGui::GetIO().MousePosへのショートカットがユーザーによって提供される。                                                                                                                                                                              |
| GetMousePosOnOpeningCurrentPopup() | BeginPopup()でポップアップを開いたときのマウスの位置を取得します。                                                                                                                                  |
| IsMouseDragging()                  | マウスがドラッグしているか？(`lock_threshold < -1.0f` の場合 `io.MouseDraggingThreshold`を使用する)                                                                                                                                                                                       |
| GetMouseDragDelta()                | マウスボタンが押されている間、または離された直後の最初のクリック位置からのデルタを返す。 これはロックされ、マウスが距離のしきい値を少なくとも1回通過するまで0.0fを返す（`lock_threshold < -1.0f`の場合、`io.MouseDraggingThreshold`を使用する）。 |
| ResetMouseDragDelta()              |                                                                                                                                                                                                                                                                      |
| GetMouseCursor()                   | 希望するマウスカーソルの形状を取得する。 重要：ImGui::NewFrame()でリセットされ、これはフレーム中に更新されます。 Render()の前に有効です。io.MouseDrawCursorを設定してソフトウェアレンダリングを使用する場合、ImGuiはあなたのためにそれらをレンダリングします。                                          |
| SetMouseCursor()                   | マウスカーソルの形状を設定する                                                                                                                                                                                                                                       |
| SetNextFrameWantCaptureMouse()     | io.WantCaptureMouseフラグの次のフレームをオーバーライドする。 (このフラグはアプリケーションの処理に委ねられるが、典型的な場合、true にすると、アプリケーションは入力を無視するようになる。). これは、次のNewFrame()呼び出しの後に、"io.WantCaptureMouse = want_capture_mouse; "を設定することと同じです。  |


### クリップボードユーティリティ

- GUIをクリップボードに取り込んだり、テキストデータをクリップボードに簡単に出力するLogToClipboard()関数も参照してください。

```cpp
IMGUI_API const char*   GetClipboardText();
IMGUI_API void          SetClipboardText(const char* text);
```

### 設定/.Ini ユーティリティ

- ディスク関数は、io.IniFilename != NULLの場合に自動的に呼び出される（デフォルトは "imgui.ini"）。
- 手動でロード/保存する場合は、io.IniFilenameをNULLに設定してください。手動で.iniを保存する処理については、io.WantSaveIniSettingsの説明をお読みください。
- 重要：デフォルト値 "imgui.ini "は現在の作業ディレクトリからの相対パスです！ほとんどのアプリはこれを絶対パス（実行ファイルと同じパスなど）に固定したいはずです。

```cpp
IMGUI_API void        LoadIniSettingsFromDisk(const char* ini_filename);
IMGUI_API void        LoadIniSettingsFromMemory(const char* ini_data, size_t ini_size=0);
IMGUI_API void        SaveIniSettingsToDisk(const char* ini_filename);
IMGUI_API const char* SaveIniSettingsToMemory(size_t* out_ini_size = NULL);
```

| 名前                        | 説明                                                                                                                                                                                               |
|-----------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| LoadIniSettingsFromDisk()   | 呼び出しは、CreateContext() の後で NewFrame() の最初の呼び出しの前に行われます。 NewFrame() は自動的に LoadIniSettingsFromDisk(io.IniFilename) を呼び出します。                                                       |
| LoadIniSettingsFromMemory() | CreateContext() の後で NewFrame() を最初に呼び出す前に呼び出すことで、独自のデータ・ソースから .ini データを提供できます。                                                                                 |
| SaveIniSettingsToDisk()     | (io.IniFilenameが空でない場合) .iniファイルに反映されるべき変更の数秒後に自動的に呼び出される（DestroyContextによっても呼び出される）。                         |
| SaveIniSettingsToMemory()   | .iniデータを持つゼロ終端の文字列を返す。 呼び出し、io.WantSaveIniSettingsが設定されたら、独自の方法でデータを保存し、io.WantSaveIniSettingsをクリアします。 |


### デバッグ・ユーティリティ

```cpp
IMGUI_API void DebugTextEncoding(const char* text);
IMGUI_API bool DebugCheckVersionAndDataLayout(const char* version_str, size_t sz_io, size_t sz_style, size_t sz_vec2, size_t sz_vec4, size_t sz_drawvert, size_t sz_drawidx);
```

- `DebugCheckVersionAndDataLayout()`: これは IMGUI_CHECKVERSION() マクロによって呼び出される。

### メモリ・アロケータ

- これらの機能は、現在のコンテクストに依存しない。
- DLLユーザー：ヒープとグローバルはDLL境界を越えて共有されません！呼び出す静的/DLL境界ごとに、SetCurrentContext() + SetAllocatorFunctions()を呼び出す必要があります。詳しくはimgui.cppの "Context and Memory Allocators"セクションを参照してください。

```cpp
IMGUI_API void   SetAllocatorFunctions(ImGuiMemAllocFunc alloc_func, ImGuiMemFreeFunc free_func, void* user_data = NULL);
IMGUI_API void   GetAllocatorFunctions(ImGuiMemAllocFunc* p_alloc_func, ImGuiMemFreeFunc* p_free_func, void** p_user_data);
IMGUI_API void*  MemAlloc(size_t size);
IMGUI_API void   MemFree(void* ptr);

} // namespace ImGui
```

## フラグと列挙型

### `ImGui::Begin()` のフラグ

これらはウィンドウごとのフラグである。`ImGuiIO`には共有フラグがある： `io.ConfigWindowsResizeFromEdges` と `io.ConfigWindowsMoveFromTitleBarOnly` 。

```cpp
enum ImGuiWindowFlags_
{
    ImGuiWindowFlags_None                   = 0,
    ImGuiWindowFlags_NoTitleBar             = 1 << 0,
    ImGuiWindowFlags_NoResize               = 1 << 1,
    ImGuiWindowFlags_NoMove                 = 1 << 2,
    ImGuiWindowFlags_NoScrollbar            = 1 << 3,
    ImGuiWindowFlags_NoScrollWithMouse      = 1 << 4,
    ImGuiWindowFlags_NoCollapse             = 1 << 5,
    ImGuiWindowFlags_AlwaysAutoResize       = 1 << 6,
    ImGuiWindowFlags_NoBackground           = 1 << 7,
    ImGuiWindowFlags_NoSavedSettings        = 1 << 8,
    ImGuiWindowFlags_NoMouseInputs          = 1 << 9,
    ImGuiWindowFlags_MenuBar                = 1 << 10,
    ImGuiWindowFlags_HorizontalScrollbar    = 1 << 11,
    ImGuiWindowFlags_NoFocusOnAppearing     = 1 << 12,
    ImGuiWindowFlags_NoBringToFrontOnFocus  = 1 << 13,
    ImGuiWindowFlags_AlwaysVerticalScrollbar= 1 << 14,
    ImGuiWindowFlags_AlwaysHorizontalScrollbar=1<< 15,
    ImGuiWindowFlags_AlwaysUseWindowPadding = 1 << 16,
    ImGuiWindowFlags_NoNavInputs            = 1 << 18,
    ImGuiWindowFlags_NoNavFocus             = 1 << 19,
    ImGuiWindowFlags_UnsavedDocument        = 1 << 20,
    ImGuiWindowFlags_NoNav                  = ImGuiWindowFlags_NoNavInputs | ImGuiWindowFlags_NoNavFocus,
    ImGuiWindowFlags_NoDecoration           = ImGuiWindowFlags_NoTitleBar | ImGuiWindowFlags_NoResize | ImGuiWindowFlags_NoScrollbar | ImGuiWindowFlags_NoCollapse,
    ImGuiWindowFlags_NoInputs               = ImGuiWindowFlags_NoMouseInputs | ImGuiWindowFlags_NoNavInputs | ImGuiWindowFlags_NoNavFocus,

    // [Internal]
    ImGuiWindowFlags_NavFlattened           = 1 << 23,
    ImGuiWindowFlags_ChildWindow            = 1 << 24,
    ImGuiWindowFlags_Tooltip                = 1 << 25,
    ImGuiWindowFlags_Popup                  = 1 << 26,
    ImGuiWindowFlags_Modal                  = 1 << 27,
    ImGuiWindowFlags_ChildMenu              = 1 << 28,
};
```

| 名前                                       | 説明                                                                                                                                                                                                                                                                                                   |
|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiWindowFlags_None                      |                                                                                                                                                                                                                                                                                                        |
| ImGuiWindowFlags_NoTitleBar                | タイトルバーを無効にする                                                                                                                                                       |
| ImGuiWindowFlags_NoResize                  | 右下のグリップでユーザーのリサイズを無効にする                                                                                                                                                       |
| ImGuiWindowFlags_NoMove                    | ユーザーがウィンドウを移動できないようにする                                                                                                                                                       |
| ImGuiWindowFlags_NoScrollbar               | スクロールバーを無効にする (ウィンドウはマウスまたはプログラムでスクロール可能)                                                                                                                                                       |
| ImGuiWindowFlags_NoScrollWithMouse         | マウスホイールによる垂直スクロールを無効にします。子ウィンドウでは、NoScrollbar が設定されていない限り、マウスホイールは親ウィンドウに転送されます。                                                                                                                                                       |
| ImGuiWindowFlags_NoCollapse                | ウィンドウをダブルクリックすることで、ユーザーによるウィンドウの折りたたみを無効にします。ウィンドウメニューボタンとも呼ばれます（ドッキングノード内など）。                                                                                                                                                                          |
| ImGuiWindowFlags_AlwaysAutoResize          | 各ウィンドウのサイズをフレームごとに変更する                                                                                                                                                       |
| ImGuiWindowFlags_NoBackground              | 背景色（WindowBgなど）と外枠の描画を無効にする。`SetNextWindowBgAlpha(0.0f)`を使うのと似ています。                                                                                                                                                                                     |
| ImGuiWindowFlags_NoSavedSettings           | .iniファイルに設定をロード/保存しない                                                                                                                                                                                                                                              |
| ImGuiWindowFlags_NoMouseInputs             | マウスキャッチ、パススルーによるホバリングテストを無効にする。                                                                                                                                                                                                                                              |
| ImGuiWindowFlags_MenuBar                   | メニューバーがある                                                                                                                                                                                                                                              |
| ImGuiWindowFlags_HorizontalScrollbar       | 水平スクロールバーの表示を許可する（デフォルトはオフ）。Begin()を呼ぶ前に`SetNextWindowContentSize(ImVec2(width,0.0f));`を使って幅を指定してもよい。imgui_demoの「水平スクロール」セクションのコードを読む。                                                                             |
| ImGuiWindowFlags_NoFocusOnAppearing        | 非表示状態から表示状態への遷移時にフォーカスを取らないようにする。                                                                                                                                                              |
| ImGuiWindowFlags_NoBringToFrontOnFocus     | フォーカスを得たときにウィンドウを最前面に出さないようにする（例：ウィンドウをクリックしたり、プログラムでフォーカスを与えたりする）。                                                                                                                                                              |
| ImGuiWindowFlags_AlwaysVerticalScrollbar   | 常に垂直スクロールバーを表示する（`ContentSize.y < Size.y`であっても）。                                                                                                                                                              |
| ImGuiWindowFlags_AlwaysHorizontalScrollbar | 常に横スクロールバーを表示する（`ContentSize.x < Size.x`の場合でも）。                                                                                                                                                              |
| ImGuiWindowFlags_AlwaysUseWindowPadding    | ボーダーのない子ウィンドウで style.WindowPadding が使用されるようにする（ボーダーのない子ウィンドウではデフォルトで無視されます。）                                                                                                                                                              |
| ImGuiWindowFlags_NoNavInputs               | ウィンドウ内でゲームパッド／キーボードによるナビゲーションができない                                                                                                                                                                                                             |
| ImGuiWindowFlags_NoNavFocus                | ゲームパッド/キーボードナビゲーションでこのウィンドウにフォーカスを合わせない（CTRL+TABでスキップするなど）                                                                                                                                                                                                             |
| ImGuiWindowFlags_UnsavedDocument           | タイトルの横にドットを表示する。タブ/ドッキングのコンテキストで使用する場合、X をクリックしたときにタブが選択され、閉じることは想定されません（ユーザーがタブの送信をやめるまで待ちます）。そうでない場合、X を押した時点でタブが選択されたことになるので、タブバーの最後にタブが再び表示される可能性があります。 |
| ImGuiWindowFlags_NoNav                     | ImGuiWindowFlags_NoNavInputs + ImGuiWindowFlags_NoNavFocus                                                                                                                                                                                                                                             |
| ImGuiWindowFlags_NoDecoration              | ImGuiWindowFlags_NoTitleBar + ImGuiWindowFlags_NoResize + ImGuiWindowFlags_NoScrollbar + ImGuiWindowFlags_NoCollapse                                                                                                                                                                                   |
| ImGuiWindowFlags_NoInputs                  | ImGuiWindowFlags_NoMouseInputs + ImGuiWindowFlags_NoNavInputs + ImGuiWindowFlags_NoNavFocus                                                                                                                                                                                                            |
| ImGuiWindowFlags_NavFlattened              | (内部) （BETA） 子ウィンドウ上で、ゲームパッド/キーボードナビゲーションが親ボーダーを越えて、この子へ、または兄弟の子ウィンドウの間で交差することを可能にする。                                                                                                                                                       |
| ImGuiWindowFlags_ChildWindow               | (内部) 使用しないでください！BeginChild() による内部使用                                                                                                                                                                                                                                            |
| ImGuiWindowFlags_Tooltip                   | (内部) 使用しないでください！BeginTooltip() による内部使用のため。                                                                                                                                                                                                                                            |
| ImGuiWindowFlags_Popup                     | (内部) 使用しないでください！BeginPopup()による内部使用のため。                                                                                                                                                                                                                                            |
| ImGuiWindowFlags_Modal                     | (内部) 使用しないでください！BeginPopupModal()による内部使用のために                                                                                                                                                                                                                                            |
| ImGuiWindowFlags_ChildMenu                 | (内部) 使用しないでください！BeginMenu()による内部使用のため。                                                                                                                                                                                                                                            |

### ImGui::InputText() のフラグ

これらは項目ごとのフラグである。ImGuiIOには共有フラグがある：io.ConfigInputTextCursorBlinkとio.ConfigInputTextEnterKeepActive。

```cpp
enum ImGuiInputTextFlags_
{
    ImGuiInputTextFlags_None                = 0,
    ImGuiInputTextFlags_CharsDecimal        = 1 << 0,
    ImGuiInputTextFlags_CharsHexadecimal    = 1 << 1,
    ImGuiInputTextFlags_CharsUppercase      = 1 << 2,
    ImGuiInputTextFlags_CharsNoBlank        = 1 << 3,
    ImGuiInputTextFlags_AutoSelectAll       = 1 << 4,
    ImGuiInputTextFlags_EnterReturnsTrue    = 1 << 5,
    ImGuiInputTextFlags_CallbackCompletion  = 1 << 6,
    ImGuiInputTextFlags_CallbackHistory     = 1 << 7,
    ImGuiInputTextFlags_CallbackAlways      = 1 << 8,
    ImGuiInputTextFlags_CallbackCharFilter  = 1 << 9,
    ImGuiInputTextFlags_AllowTabInput       = 1 << 10,
    ImGuiInputTextFlags_CtrlEnterForNewLine = 1 << 11,
    ImGuiInputTextFlags_NoHorizontalScroll  = 1 << 12,
    ImGuiInputTextFlags_AlwaysOverwrite     = 1 << 13,
    ImGuiInputTextFlags_ReadOnly            = 1 << 14,
    ImGuiInputTextFlags_Password            = 1 << 15,
    ImGuiInputTextFlags_NoUndoRedo          = 1 << 16,
    ImGuiInputTextFlags_CharsScientific     = 1 << 17,
    ImGuiInputTextFlags_CallbackResize      = 1 << 18,
    ImGuiInputTextFlags_CallbackEdit        = 1 << 19,
    ImGuiInputTextFlags_EscapeClearsAll     = 1 << 20,

    // Obsolete names
    //ImGuiInputTextFlags_AlwaysInsertMode  = ImGuiInputTextFlags_AlwaysOverwrite   // [renamed in 1.82] name was not matching behavior
};
```

| 名前                                    | 説明                                                                                                                                                                                                                                                                                                                                              |
|-----------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiInputTextFlags_None                |                                                                                                                                                                                                                                                                                                                                                   |
| ImGuiInputTextFlags_CharsDecimal        | `0123456789.+-*/` を許可する。                                                                                                                                                                                                                                                                                                                             |
| ImGuiInputTextFlags_CharsHexadecimal    | `0123456789ABCDEFabcdef`を 許可する                                                                                                                                                                                                                                                                                                                      |
| ImGuiInputTextFlags_CharsUppercase      | `a..z` を `A..Z`にする                                                                                                                                                                                                                                                                                                                              |
| ImGuiInputTextFlags_CharsNoBlank        | スペース、タブのフィルタリング                                                                                                                                                                                                                                                                                                                           |
| ImGuiInputTextFlags_AutoSelectAll       | 最初にマウスフォーカスが当たったときにテキスト全体を選択                                                                                                                                                                                                                                                                                                  |
| ImGuiInputTextFlags_EnterReturnsTrue    | (値が変更されるたびにではなく) Enterが押されたときに'true'を返す。IsItemDeactivatedAfterEdit() 関数を見てみましょう。                                                                                                                                                                                             |
| ImGuiInputTextFlags_CallbackCompletion  | TABボタン押下時のコールバック（完了処理用）                                                                                                                                                                                                                                                                                                |
| ImGuiInputTextFlags_CallbackHistory     | 上下矢印を押したときのコールバック（履歴処理用）                                                                                                                                                                                                                                                                                       |
| ImGuiInputTextFlags_CallbackAlways      | 各反復でコールバック。ユーザー・コードは、カーソルの位置を問い合わせたり、テキスト・バッファを変更したりすることができる。                                                                                                                                                                                                                                                             |
| ImGuiInputTextFlags_CallbackCharFilter  | 文字入力を置換または破棄するためのコールバック。EventChar'を変更して置換または破棄するか、コールバックで1を返して破棄する。                                                                                                                                                                                                            |
| ImGuiInputTextFlags_AllowTabInput       | TABキーを押すと、テキストフィールドに「`\t`」が入力されます。                                                                                                                                                                                                                                                                                           |
| ImGuiInputTextFlags_CtrlEnterForNewLine | 複数行モードでは、Enterでフォーカスを外し、Ctrl+Enterで改行する（デフォルトは逆：Ctrl+Enterでフォーカスを外し、Enterで改行）。                                                                                                                                                                                                         |
| ImGuiInputTextFlags_NoHorizontalScroll  | カーソルを水平方向に追従させない                                                                                                                                                                                                                                                                                                         |
| ImGuiInputTextFlags_AlwaysOverwrite     | 上書きモード                                                                                                                                                                                                                                                                                                                                    |
| ImGuiInputTextFlags_ReadOnly            | 読み取り専用モード                                                                                                                                                                                                                                                                                                                                    |
| ImGuiInputTextFlags_Password            | パスワードモード、すべての文字を'*'として表示                                                                                                                                                                                                                                                                                                      |
| ImGuiInputTextFlags_NoUndoRedo          | アンドゥ／リドゥを無効にする。入力テキストは、アクティブな間テキストデータを所有することに注意してください。独自のアンドゥ/リドゥスタックを提供したい場合は、例えばClearActiveID()を呼び出す必要があります。                                                                                                                                                                                   |
| ImGuiInputTextFlags_CharsScientific     | `0123456789.+-*/eE`を許可する (科学表記法の入力)                                                                                                                                                                                                                                                                                               |
| ImGuiInputTextFlags_CallbackResize      | バッファ容量の変更要求があったときにコールバックし、(パラメータ 'buf_size' の値を超えて) 文字列が大きくなるようにする。文字列のサイズを変更したいときに通知する（Sizeのキャッシュを保持する文字列型の場合）。コールバックで新しいBufSizeが提供されるので、それに従う必要がある。(これを使う例は misc/cpp/imgui_stdlib.h を参照)。 |
| ImGuiInputTextFlags_CallbackEdit        | 編集時のコールバック (InputText()は編集時にすでにtrueを返していることに注意。コールバックは、主にフォーカスがアクティブなときに、その下にあるバッファを操作するのに便利です。)                                                                                                                                                                                |
| ImGuiInputTextFlags_EscapeClearsAll     | Escapeキーは、コンテンツが空でなければクリアし、そうでなければ無効化する（デフォルトのEscapeの動作とは対照的に、元に戻す）。                                                                                                                                                                                                                             |


### ImGui::TreeNodeEx(), ImGui::CollapsingHeader*() のフラグ。

```cpp
enum ImGuiTreeNodeFlags_
{
    ImGuiTreeNodeFlags_None                 = 0,
    ImGuiTreeNodeFlags_Selected             = 1 << 0,
    ImGuiTreeNodeFlags_Framed               = 1 << 1,
    ImGuiTreeNodeFlags_AllowOverlap         = 1 << 2,
    ImGuiTreeNodeFlags_NoTreePushOnOpen     = 1 << 3,
    ImGuiTreeNodeFlags_NoAutoOpenOnLog      = 1 << 4,
    ImGuiTreeNodeFlags_DefaultOpen          = 1 << 5,
    ImGuiTreeNodeFlags_OpenOnDoubleClick    = 1 << 6,
    ImGuiTreeNodeFlags_OpenOnArrow          = 1 << 7,
    ImGuiTreeNodeFlags_Leaf                 = 1 << 8,
    ImGuiTreeNodeFlags_Bullet               = 1 << 9,
    ImGuiTreeNodeFlags_FramePadding         = 1 << 10,
    ImGuiTreeNodeFlags_SpanAvailWidth       = 1 << 11,
    ImGuiTreeNodeFlags_SpanFullWidth        = 1 << 12,
    ImGuiTreeNodeFlags_NavLeftJumpsBackHere = 1 << 13,
    //ImGuiTreeNodeFlags_NoScrollOnOpen     = 1 << 14,
    ImGuiTreeNodeFlags_CollapsingHeader     = ImGuiTreeNodeFlags_Framed | ImGuiTreeNodeFlags_NoTreePushOnOpen | ImGuiTreeNodeFlags_NoAutoOpenOnLog,

#ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
    ImGuiTreeNodeFlags_AllowItemOverlap     = ImGuiTreeNodeFlags_AllowOverlap,  // Renamed in 1.89.7
#endif
};
```

| 名前                                    | 説明                                                                                                                                                                                                                                                                        |
|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTreeNodeFlags_None                 |                                                                                                                                                                                                                                                                             |
| ImGuiTreeNodeFlags_Selected             | 選択された通りに描く                                                                                                                                                |
| ImGuiTreeNodeFlags_Framed               | 背景付きフレームを描画する（CollapsingHeaderの場合など）                                                                                                                                                |
| ImGuiTreeNodeFlags_AllowOverlap         | 後続のウィジェットがこのウィジェットに重なるようにテストを実行する。                                                                                                                                                |
| ImGuiTreeNodeFlags_NoTreePushOnOpen     | オープン時にTreePush()を行わない（CollapsingHeaderの場合など） = 余分なインデントやIDスタックへのプッシュを行わない。                                                                                                                                                |
| ImGuiTreeNodeFlags_NoAutoOpenOnLog      | ロギングがアクティブなときに、自動的に一時的にノードを開かない（デフォルトでは、ロギングは自動的にツリーノードを開きます。）                                                                                                                                                |
| ImGuiTreeNodeFlags_DefaultOpen          | デフォルトでオープンするノード                                                                                                                                                |
| ImGuiTreeNodeFlags_OpenOnDoubleClick    | ノードを開くにはダブルクリックが必要                                                                                                                                                |
| ImGuiTreeNodeFlags_OpenOnArrow          | 矢印部分をクリックした時のみ開く。ImGuiTreeNodeFlags_OpenOnDoubleClickも設定されている場合、矢印をシングルクリックするか、すべてのボックスをダブルクリックすると開きます。                                                                                                                         |
| ImGuiTreeNodeFlags_Leaf                 | 折りたたみなし、矢印なし（リーフノードの便宜上使用）。                                                                                                                                                                                                              |
| ImGuiTreeNodeFlags_Bullet               | 矢印の代わりに弾丸を表示します。重要：_Leafフラグを設定しなくても、ノードは開閉マークが付けられます！                                                                                                                                                          |
| ImGuiTreeNodeFlags_FramePadding         | テキストのベースラインを通常のウィジェットの高さに垂直に揃えるには、FramePadding を使用します（フレーム化されていないテキスト・ノードに対しても）。AlignTextToFramePadding() を呼び出すのと同じです。                                                                                                              |
| ImGuiTreeNodeFlags_SpanAvailWidth       | 枠がない場合でも、ヒットボックスを右端まで拡張する。これは、同じ行に他の項目を追加できるようにするため、デフォルトではありません。将来的には、ヒットシステムをリファクタリングして前から後ろへ、自然な重なりができるようにし、これをデフォルトにすることもできるだろう。|
| ImGuiTreeNodeFlags_SpanFullWidth        | ヒット・ボックスを左端と右端に拡張する（インデントされた領域をバイパスする）。                                                                                                                                                                                            |
| ImGuiTreeNodeFlags_NavLeftJumpsBackHere | (WIP)ナビ：左方向は、その子(TreeNodeとTreePopの間に提出されたアイテム)のどれからでも、このTreeNode()に移動することができる。                                                                                                                                                  |
| (ImGuiTreeNodeFlags_NoScrollOnOpen)     | 修正: TODO: ノードが開いたばかりでコンテンツが表示されていない場合、TreePop()での自動スクロールを無効にする。
| ImGuiTreeNodeFlags_CollapsingHeader     | ImGuiTreeNodeFlags_Framed + ImGuiTreeNodeFlags_NoTreePushOnOpen + ImGuiTreeNodeFlags_NoAutoOpenOnLog, |


### `OpenPopup*()`、`BeginPopupContext*()`、`IsPopupOpen()` 関数のフラグ。

- `int mouse_button = 1` 引数を取る古いAPIとの後方互換性を保つために、小さなフラグ値をマウスボタンのインデックスとして扱う必要があります。したがって、ImGuiPopupFlagsでマウスボタンのインデックスを渡すことは正しいことが保証されています。
- 同じ理由で、BeginPopupContextXXX関数のImGuiPopupFlags引数のデフォルトは0ではなく1です。
  - 重要：デフォルトのパラメータは1（==ImGuiPopupFlags_MouseButtonRight）なので、デフォルトのパラメータに依存して他のフラグを使用したい場合は、明示的にImGuiPopupFlags_MouseButtonRightフラグを渡す必要があります。
- 現在のところ、これらの関数で複数のボタンを組み合わせたり、編集したりすることはできません。

```cpp
enum ImGuiPopupFlags_
{
    ImGuiPopupFlags_None                    = 0,
    ImGuiPopupFlags_MouseButtonLeft         = 0,
    ImGuiPopupFlags_MouseButtonRight        = 1,
    ImGuiPopupFlags_MouseButtonMiddle       = 2,
    ImGuiPopupFlags_MouseButtonMask_        = 0x1F,
    ImGuiPopupFlags_MouseButtonDefault_     = 1,
    ImGuiPopupFlags_NoOpenOverExistingPopup = 1 << 5,
    ImGuiPopupFlags_NoOpenOverItems         = 1 << 6,
    ImGuiPopupFlags_AnyPopupId              = 1 << 7,
    ImGuiPopupFlags_AnyPopupLevel           = 1 << 8,
    ImGuiPopupFlags_AnyPopup                = ImGuiPopupFlags_AnyPopupId | ImGuiPopupFlags_AnyPopupLevel,
};
```

| 名前                                    | 説明                                                                                                                   |
|-----------------------------------------|------------------------------------------------------------------------------------------------------------------------|
| ImGuiPopupFlags_None                    |                                                                                                                        |
| ImGuiPopupFlags_MouseButtonLeft         | `BeginPopupContext*()`の場合：左マウスリリース時に開く。常に== 0であることが保証される（ImGuiMouseButton_Leftと同じ）。 |
| ImGuiPopupFlags_MouseButtonRight        | `BeginPopupContext*()`の場合：右マウスを離すと開く。常に== 1であることが保証されます（ImGuiMouseButton_Rightと同じ）。 |
| ImGuiPopupFlags_MouseButtonMiddle       | `BeginPopupContext*()`の場合：Middle Mouseのリリース時に開く。常に== 2であることが保証される（ImGuiMouseButton_Middleと同じ）。 |
| ImGuiPopupFlags_MouseButtonMask_        |                                                                                                                        |
| ImGuiPopupFlags_MouseButtonDefault_     |                                                                                                                        |
| ImGuiPopupFlags_NoOpenOverExistingPopup | `OpenPopup*()`、`BeginPopupContext*()`：ポップアップ・スタックの同じレベルに既にポップアップがある場合は開きません。 |
| ImGuiPopupFlags_NoOpenOverItems         | `BeginPopupContextWindow()`について：アイテムをホバーしたときにtrueを返さず、空のスペースをホバーしたときのみtrueを返すようにしました。 |
| ImGuiPopupFlags_AnyPopupId              | `IsPopupOpen()`: ImGuiID パラメータを無視し、ポップアップがあるかどうかをテストします。                                                |
| ImGuiPopupFlags_AnyPopupLevel           | `IsPopupOpen()`: ポップアップ・スタックの任意のレベルで検索/テスト (デフォルトは現在のレベルでテスト) |
| ImGuiPopupFlags_AnyPopup                | ImGuiPopupFlags_AnyPopupId + ImGuiPopupFlags_AnyPopupLevel |

### `ImGui::Selectable()` のフラグ

```cpp
enum ImGuiSelectableFlags_
{
    ImGuiSelectableFlags_None               = 0,
    ImGuiSelectableFlags_DontClosePopups    = 1 << 0,
    ImGuiSelectableFlags_SpanAllColumns     = 1 << 1,
    ImGuiSelectableFlags_AllowDoubleClick   = 1 << 2,
    ImGuiSelectableFlags_Disabled           = 1 << 3,
    ImGuiSelectableFlags_AllowOverlap       = 1 << 4,

#ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
    ImGuiSelectableFlags_AllowItemOverlap   = ImGuiSelectableFlags_AllowOverlap,  // Renamed in 1.89.7
#endif
};
```

| 名前                                  | 説明                                                                          |
|---------------------------------------|-------------------------------------------------------------------------------|
| ImGuiSelectableFlags_None             |                                                                               |
| ImGuiSelectableFlags_DontClosePopups  | これをクリックしても親のポップアップ・ウィンドウが閉じない |
| ImGuiSelectableFlags_SpanAllColumns   | 選択可能なフレームは、すべての列にまたがることができます（テキストは現在の列に収まります）。 |
| ImGuiSelectableFlags_AllowDoubleClick | ダブルクリックでもプレスイベントを生成 |
| ImGuiSelectableFlags_Disabled         | 選択できず、テキストが灰色で表示される |
| ImGuiSelectableFlags_AllowOverlap     | (WIP)後続のウィジェットがこのウィジェットに重なるようにするためのヒットテスト |

### `ImGui::BeginCombo()` のフラグ

```cpp
enum ImGuiComboFlags_
{
    ImGuiComboFlags_None                    = 0,
    ImGuiComboFlags_PopupAlignLeft          = 1 << 0,
    ImGuiComboFlags_HeightSmall             = 1 << 1,
    ImGuiComboFlags_HeightRegular           = 1 << 2,
    ImGuiComboFlags_HeightLarge             = 1 << 3,
    ImGuiComboFlags_HeightLargest           = 1 << 4,
    ImGuiComboFlags_NoArrowButton           = 1 << 5,
    ImGuiComboFlags_NoPreview               = 1 << 6,
    ImGuiComboFlags_HeightMask_             = ImGuiComboFlags_HeightSmall | ImGuiComboFlags_HeightRegular | ImGuiComboFlags_HeightLarge | ImGuiComboFlags_HeightLargest,
};
```

| 名前                           | 説明                                                                                                                                                   |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiComboFlags_None           |                                                                                                                                                        |
| ImGuiComboFlags_PopupAlignLeft | デフォルトでポップアップを左寄せにします。 |
| ImGuiComboFlags_HeightSmall    | 最大4つのアイテムが表示されます。ヒント: コンボポップアップを特定のサイズにしたい場合は、BeginCombo() を呼び出す前に SetNextWindowSizeConstraints() を使用できます。 |
| ImGuiComboFlags_HeightRegular  | 最大～8アイテム表示（デフォルト） |
| ImGuiComboFlags_HeightLarge    | 最大～20アイテムまで表示可能 |
| ImGuiComboFlags_HeightLargest  | できるだけ多くのフィッティング・アイテム |
| ImGuiComboFlags_NoArrowButton  | 四角い矢印ボタンを使わずにプレビューボックスに表示する |
| ImGuiComboFlags_NoPreview      | 四角い矢印ボタンのみを表示 |
| ImGuiComboFlags_HeightMask_    | ImGuiComboFlags_HeightSmall + ImGuiComboFlags_HeightRegular + ImGuiComboFlags_HeightLarge + ImGuiComboFlags_HeightLargest |

### `ImGui::BeginTabBar()` のフラグ

```cpp
enum ImGuiTabBarFlags_
{
    ImGuiTabBarFlags_None                           = 0,
    ImGuiTabBarFlags_Reorderable                    = 1 << 0,
    ImGuiTabBarFlags_AutoSelectNewTabs              = 1 << 1,
    ImGuiTabBarFlags_TabListPopupButton             = 1 << 2,
    ImGuiTabBarFlags_NoCloseWithMiddleMouseButton   = 1 << 3,
    ImGuiTabBarFlags_NoTabListScrollingButtons      = 1 << 4,
    ImGuiTabBarFlags_NoTooltip                      = 1 << 5,
    ImGuiTabBarFlags_FittingPolicyResizeDown        = 1 << 6,
    ImGuiTabBarFlags_FittingPolicyScroll            = 1 << 7,
    ImGuiTabBarFlags_FittingPolicyMask_             = ImGuiTabBarFlags_FittingPolicyResizeDown | ImGuiTabBarFlags_FittingPolicyScroll,
    ImGuiTabBarFlags_FittingPolicyDefault_          = ImGuiTabBarFlags_FittingPolicyResizeDown,
};
```

| 名前                                          | 説明                                                                                                                                                                                                                 |
|-----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTabBarFlags_None                         |                                                                                                                                                                                                                      |
| ImGuiTabBarFlags_Reorderable                  | 手動でタブをドラッグして並び替えが可能 + 新しいタブがリストの最後に追加される                                                                                                                            |
| ImGuiTabBarFlags_AutoSelectNewTabs            | 新しいタブが表示されたら自動的に選択                                                                                                                            |
| ImGuiTabBarFlags_TabListPopupButton           | タブリストのポップアップを開くボタンを無効にする                                                                                                                            |
| ImGuiTabBarFlags_NoCloseWithMiddleMouseButton | タブを閉じる動作を無効にする (`p_open!=NULL`で送信されたもの)をマウスの中ボタンでクリックする。ユーザー側でこの動作を再現するには `if (IsItemHovered() && IsMouseClicked(2)) *p_open = false.` |
| ImGuiTabBarFlags_NoTabListScrollingButtons    | スクロールボタンを無効にする (フィッティングポリシーが ImGuiTabBarFlags_FittingPolicyScroll の場合に適用)                                                                                                                   |
| ImGuiTabBarFlags_NoTooltip                    | タブをホバーしたときのツールチップを無効にする                                                                                                                   |
| ImGuiTabBarFlags_FittingPolicyResizeDown      | タブのサイズが合わないときにリサイズする                                                                                                                   |
| ImGuiTabBarFlags_FittingPolicyScroll          | タブが収まらない場合のスクロール・ボタンの追加                                                                                                                   |
| ImGuiTabBarFlags_FittingPolicyMask_           | ImGuiTabBarFlags_FittingPolicyResizeDown + ImGuiTabBarFlags_FittingPolicyScroll                                                                                                                   |
| ImGuiTabBarFlags_FittingPolicyDefault_        | ImGuiTabBarFlags_FittingPolicyResizeDown                                                                                                                   |

### `ImGui::BeginTabItem()` のフラグ

```cpp
enum ImGuiTabItemFlags_
{
    ImGuiTabItemFlags_None                          = 0,
    ImGuiTabItemFlags_UnsavedDocument               = 1 << 0,
    ImGuiTabItemFlags_SetSelected                   = 1 << 1,
    ImGuiTabItemFlags_NoCloseWithMiddleMouseButton  = 1 << 2,
    ImGuiTabItemFlags_NoPushId                      = 1 << 3,
    ImGuiTabItemFlags_NoTooltip                     = 1 << 4,
    ImGuiTabItemFlags_NoReorder                     = 1 << 5,
    ImGuiTabItemFlags_Leading                       = 1 << 6,
    ImGuiTabItemFlags_Trailing                      = 1 << 7,
};
```

| 名前                                           | 説明                                                                                                                                                                                                                                                                |
|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTabItemFlags_None                         |                                                                                                                                                                                                                                                                     |
| ImGuiTabItemFlags_UnsavedDocument              | タイトルの横にドットを表示 + X をクリックするとタブが選択される + タブの終了を仮定しない（ユーザーがタブの送信をやめるまで待つ）。そうでない場合は X を押した時点でタブが閉じられたことにするので、タブバーの最後にタブが再表示される可能性がある。 |
| ImGuiTabItemFlags_SetSelected                  | BeginTabItem() を呼び出す際に、プログラムでタブを選択状態にするためのトリガーフラグ |
| ImGuiTabItemFlags_NoCloseWithMiddleMouseButton | タブを閉じる動作を無効にする (p_open != NULL で投入されたもの）をマウスの中ボタンでクリックする。 ユーザー側でこの動作を再現するには `if (IsItemHovered() && IsMouseClicked(2)) *p_open = false`.                                                |
| ImGuiTabItemFlags_NoPushId                     | BeginTabItem()/EndTabItem()でPushID(tab->ID)/PopID()を呼び出さない。                                                                                                                                                                               |
| ImGuiTabItemFlags_NoTooltip                    | 指定されたタブのツールチップを無効にする                                                                                                                                                                               |
| ImGuiTabItemFlags_NoReorder                    | このタブの順序を入れ替えたり、このタブに別のタブが重ならないようにする。                                                                                                                                                                               |
| ImGuiTabItemFlags_Leading                      | タブの位置をタブバーの左側（タブリストポップアップボタンの後）に強制する                                                                                                                                                                               |
| ImGuiTabItemFlags_Trailing                     | タブの位置をタブバーの右側（スクロールボタンの前）に強制する                                                                                                                                                                               |

### `ImGui::BeginTable()` のフラグ

- 重要なこと: サイジング・ポリシーには複雑で微妙な副作用があります。
  コメントやデモを注意深く読み、ライブデモで試してみてください。
- The DEFAULT sizing policies are:
  - デフォルトは ImGuiTableFlags_SizingFixedFitです。ScrollX がオンの場合、またはホストウィンドウが ImGuiWindowFlags_AlwaysAutoResize を持っている場合。
  - デフォルトは ImGuiTableFlags_SizingStretchSameです。ScrollXがオフの場合。
- ScrollXがオフの場合:
  - テーブルのデフォルトは ImGuiTableFlags_SizingStretchSame -> すべてのカラムのデフォルトは ImGuiTableColumnFlags_WidthStretch で、同じウェイト。
  - 許容されるカラムサイズポリシー：Stretch（デフォルト）、Fixed/Auto。
  - 固定カラムは（もしあれば）通常、要求された幅を得ます（テーブルがそれらをすべて収めることができない場合を除く）。
  - ストレッチカラムは、それぞれのウェイトに従って残りの幅を共有します。
  - 固定列とストレッチ列を混在させることも可能ですが、リサイズ動作にさまざまな副作用があります。
     典型的なサイズ調整ポリシーの混在は次のようなものです：任意の数の先頭の固定カラムと、それに続く1つまたは2つの後続のストレッチカラム。
     (これは、列の表示順序が、手動でのリサイズに対する反応に微妙だが必要な影響を与えるためである)。
- ScrollXがオンの場合：
  - テーブルのデフォルトは ImGuiTableFlags_SizingFixedFit -> すべてのカラムのデフォルトは ImGuiTableColumnFlags_WidthFixed です。
  - カラムサイズポリシー：ほとんどが固定/自動。
  - 固定カラムは必要に応じて拡大可能。テーブルは必要に応じて水平スクロールバーを表示します。
  - 自動サイズ変更可能な（サイズ変更不可能な）固定カラムを使用する場合、アイテムの右揃えを使用するためにコンテンツの幅を問い合わせること（例えば `SetNextItemWidth(-FLT_MIN)`）は意味を成さず、フィードバックループを作成します。
  - `BeginTable()` で 'inner_width' に値を指定していない限り、ScrollX がオンの場合にストレッチ・カラムを使用しても意味がないことがよくあります。
     もし'inner_width'に値を指定すれば、実質的にスクロールスペースがわかるので、StretchカラムやFixed/Stretch混在カラムが再び意味を持つようになります。
- 詳しくはimgui_tables.cppの一番上にあるドキュメントを読んでほしい。

```cpp
enum ImGuiTableFlags_
{
```

#### 特徴

```cpp
ImGuiTableFlags_None              = 0,
ImGuiTableFlags_Resizable         = 1 << 0,
ImGuiTableFlags_Reorderable       = 1 << 1,
ImGuiTableFlags_Hideable          = 1 << 2,
ImGuiTableFlags_Sortable          = 1 << 3,
ImGuiTableFlags_NoSavedSettings   = 1 << 4,
ImGuiTableFlags_ContextMenuInBody = 1 << 5,
```

| 名前                              | 説明                                                                                                                                |
|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableFlags_None              |                                                                                                                                     |
| ImGuiTableFlags_Resizable         | 列のサイズ変更を有効にする。                                                                                                            |
| ImGuiTableFlags_Reorderable       | ヘッダ行のカラムの並び替えを有効にする (ヘッダを表示するには TableSetupColumn() + TableHeadersRow() の呼び出しが必要) |
| ImGuiTableFlags_Hideable          | コンテキストメニューで列の非表示/無効を有効にする。                                                                                    |
| ImGuiTableFlags_Sortable          | 並べ替えを有効にします。TableGetSortSpecs()を呼び出して、ソートの仕様を取得します。ImGuiTableFlags_SortMulti および ImGuiTableFlags_SortTristate も参照してください。 |
| ImGuiTableFlags_NoSavedSettings   | .iniファイルで列の順序、幅、並べ替えの設定を保持しないようにする。                                                         |
| ImGuiTableFlags_ContextMenuInBody | カラムのボディ/コンテンツ上で右クリックすると、テーブル・コンテキスト・メニューが表示されます。デフォルトでは、TableHeadersRow() で利用可能です。              |

#### デコレーション

```cpp
ImGuiTableFlags_RowBg                      = 1 << 6,
ImGuiTableFlags_BordersInnerH              = 1 << 7,
ImGuiTableFlags_BordersOuterH              = 1 << 8,
ImGuiTableFlags_BordersInnerV              = 1 << 9,
ImGuiTableFlags_BordersOuterV              = 1 << 10,
ImGuiTableFlags_BordersH                   = ImGuiTableFlags_BordersInnerH | ImGuiTableFlags_BordersOuterH,
ImGuiTableFlags_BordersV                   = ImGuiTableFlags_BordersInnerV | ImGuiTableFlags_BordersOuterV,
ImGuiTableFlags_BordersInner               = ImGuiTableFlags_BordersInnerV | ImGuiTableFlags_BordersInnerH,
ImGuiTableFlags_BordersOuter               = ImGuiTableFlags_BordersOuterV | ImGuiTableFlags_BordersOuterH,
ImGuiTableFlags_Borders                    = ImGuiTableFlags_BordersInner | ImGuiTableFlags_BordersOuter,
ImGuiTableFlags_NoBordersInBody            = 1 << 11,
ImGuiTableFlags_NoBordersInBodyUntilResize = 1 << 12,
```

| 名前                                       | 説明                                                                                                                                                               |
|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableFlags_RowBg                      | ImGuiCol_TableRowBg または ImGuiCol_TableRowBgAlt を使用して、各行ごとに RowBg カラーを設定します (手動で各行に ImGuiTableBgFlags_RowBg0 を指定して TableSetBgColor を呼び出すのと同じです)。 |
| ImGuiTableFlags_BordersInnerH              | 行と行の間に水平ボーダーを引く。                                                                                                                              |
| ImGuiTableFlags_BordersOuterH              | 上下に水平のボーダーを引く。                                                                                                                     |
| ImGuiTableFlags_BordersInnerV              | 列と列の間に縦の境界線を引く。                                                                                                                             |
| ImGuiTableFlags_BordersOuterV              | 左右に縦のボーダーを引く。                                                                                                                 |
| ImGuiTableFlags_BordersH                   | ImGuiTableFlags_BordersInnerH + ImGuiTableFlags_BordersOuterH, // 水平ボーダーを引く。                                                                         |
| ImGuiTableFlags_BordersV                   | ImGuiTableFlags_BordersInnerV + ImGuiTableFlags_BordersOuterV, // 縦のボーダーを引く。                                                                           |
| ImGuiTableFlags_BordersInner               | ImGuiTableFlags_BordersInnerV + ImGuiTableFlags_BordersInnerH, // 内側の境界線を引く。                                                                              |
| ImGuiTableFlags_BordersOuter               | ImGuiTableFlags_BordersOuterV + ImGuiTableFlags_BordersOuterH, // 外枠を描く。                                                                              |
| ImGuiTableFlags_Borders                    | ImGuiTableFlags_BordersInner + ImGuiTableFlags_BordersOuter,   // すべての境界線を引く。                                                                                |
| ImGuiTableFlags_NoBordersInBody            | [ALPHA] カラムの縦のボーダーを無効にする（ボーダーは常にヘッダーに表示されます）。-> スタイルに移動する                            |
| ImGuiTableFlags_NoBordersInBodyUntilResize | [ALPHA] リサイズのためにカーソルを合わせるまで、カラム・ボディの垂直ボーダーを無効にする（ボーダーは常にヘッダーに表示される）。-> スタイルに移動する                            |

#### サイジング・ポリシー（デフォルトは上記を参照）

```cpp
ImGuiTableFlags_SizingFixedFit    = 1 << 13,
ImGuiTableFlags_SizingFixedSame   = 2 << 13,
ImGuiTableFlags_SizingStretchProp = 3 << 13,
ImGuiTableFlags_SizingStretchSame = 4 << 13,
```

| 名前                              | 説明                                                                                                                                                                                      |
|-----------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableFlags_SizingFixedFit    | カラムのデフォルトは_WidthFixedまたは_WidthAuto（リサイズ可能な場合、またはリサイズ不可能な場合）で、コンテンツの幅と一致します。                                                                                    |
| ImGuiTableFlags_SizingFixedSame   | カラムのデフォルトは_WidthFixedまたは_WidthAuto（リサイズ可能な場合、またはリサイズ不可能な場合）で、すべてのカラムの最大コンテンツ幅に一致します。ImGuiTableFlags_NoKeepColumnsVisible を暗黙的に有効にします。 |
| ImGuiTableFlags_SizingStretchProp | カラムのデフォルトは_WidthStretchで、デフォルトのウェイトは各カラムのコンテンツ幅に比例する。                                                                                       |
| ImGuiTableFlags_SizingStretchSame | カラムのデフォルトは _WidthStretch で、TableSetupColumn() によって上書きされない限り、デフォルトの重みはすべて等しくなります。                                                                                 |

#### サイズ追加オプション

```cpp
ImGuiTableFlags_NoHostExtendX        = 1 << 16,
ImGuiTableFlags_NoHostExtendY        = 1 << 17,
ImGuiTableFlags_NoKeepColumnsVisible = 1 << 18,
ImGuiTableFlags_PreciseWidths        = 1 << 19,
```

| 名前                                 | 説明                                                                                                                                                                                                                                           |
|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableFlags_NoHostExtendX        | 外側の幅をカラムに自動フィットさせ、outer_size.x の値を上書きします。ScrollX/ScrollYが無効で、Stretchカラムが使用されていない場合にのみ使用できます。                                                                                        |
| ImGuiTableFlags_NoHostExtendY        | 外側の高さを outer_size.y で正確に停止するようにします (テーブルが制限を超えて自動拡張されるのを防ぎます)。ScrollX/ScrollYが無効の場合のみ使用可能。制限値以下のデータは切り取られ、表示されません。                                          |
| ImGuiTableFlags_NoKeepColumnsVisible | ScrollXがオフでテーブルが小さくなりすぎた場合、カラムを常に最小表示にしておくことを無効にする。カラムがリサイズ可能な場合はお勧めしません。                                                                                                        |
| ImGuiTableFlags_PreciseWidths        | 余りの幅をストレッチされたカラムに分配しないようにする (100幅のテーブルで3カラムの幅を割り当てる)：このフラグなし：33,33,34.このフラグあり：33,33,33).カラム数が多くなると、リサイズがスムーズに行われなくなります。 |

#### クリッピング

```cpp
ImGuiTableFlags_NoClip = 1 << 20,
```

| 名前                   | 説明                                                                                                                                                                                          |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableFlags_NoClip | 個々の列のクリッピング矩形を無効にする(描画コマンド数を減らし、項目が他の列にはみ出すことができるようになる)。一般に、TableSetupScrollFreeze() とは互換性がありません。 |

#### パディング

```cpp
ImGuiTableFlags_PadOuterX   = 1 << 21,
ImGuiTableFlags_NoPadOuterX = 1 << 22,
ImGuiTableFlags_NoPadInnerX = 1 << 23,
```

| 名前                        | 説明                                                                                                                               |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableFlags_PadOuterX   | BordersOuterV がオンの場合のデフォルト。一番外側のパディングを有効にする。一般にヘッダーがある場合に望ましい。                                 |
| ImGuiTableFlags_NoPadOuterX | BordersOuterV が off の場合のデフォルト。一番外側のパディングを無効にする。                                                                        |
| ImGuiTableFlags_NoPadInnerX | 列間の内側パディングを無効にする（BordersOuterV がオンの場合は二重内側パディング、オフの場合は一重内側パディング）。 |

#### スクロール

```cpp
ImGuiTableFlags_ScrollX = 1 << 24,
ImGuiTableFlags_ScrollY = 1 << 25,
```

| 名前                    | 説明                                                                                                                                                                                                                                          |
|-------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableFlags_ScrollX | 水平スクロールを有効にする。BeginTable() の 'outer_size' パラメータでコンテナのサイズを指定する必要がある。既定のサイズ設定ポリシーが変更されます。これは子ウィンドウを作成するため、ScrollX を使用する場合は、現在一般的に ScrollY を推奨します。 |
| ImGuiTableFlags_ScrollY | 垂直スクロールを有効にする。BeginTable() の 'outer_size' パラメータでコンテナのサイズを指定する。                                                                                                                                      |

#### ソート

```cpp
ImGuiTableFlags_SortMulti    = 1 << 26,
ImGuiTableFlags_SortTristate = 1 << 27,
```

| 名前                         | 説明                                                                                                                      |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableFlags_SortMulti    | ヘッダをクリックするときにシフトを押したままにすると、複数の列でソートされる。TableGetSortSpecs() は、(SpecsCount > 1) の場合に Specs を返すことがあります。 |
| ImGuiTableFlags_SortTristate | ソートを許可しない、デフォルトのソートを無効にする。TableGetSortSpecs() は、(SpecsCount == 0) の specs を返す場合があります。                  |

#### (内部)コンビネーションとマスク：

```cpp
ImGuiTableFlags_SizingMask_ = ImGuiTableFlags_SizingFixedFit | ImGuiTableFlags_SizingFixedSame | ImGuiTableFlags_SizingStretchProp | ImGuiTableFlags_SizingStretchSame,
};
```

| 名前                        | 説明                                                                                                                                     |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableFlags_SizingMask_ | ImGuiTableFlags_SizingFixedFit + ImGuiTableFlags_SizingFixedSame + ImGuiTableFlags_SizingStretchProp + ImGuiTableFlags_SizingStretchSame |

### ImGui::TableSetupColumn() のフラグ

```cpp
enum ImGuiTableColumnFlags_
{
```

#### Input configuration flags

```cpp
ImGuiTableColumnFlags_None                  = 0,
ImGuiTableColumnFlags_Disabled              = 1 << 0,
ImGuiTableColumnFlags_DefaultHide           = 1 << 1, 
ImGuiTableColumnFlags_DefaultSort           = 1 << 2, 
ImGuiTableColumnFlags_WidthStretch          = 1 << 3,
ImGuiTableColumnFlags_WidthFixed            = 1 << 4,
ImGuiTableColumnFlags_NoResize              = 1 << 5, 
ImGuiTableColumnFlags_NoReorder             = 1 << 6, 
ImGuiTableColumnFlags_NoHide                = 1 << 7, 
ImGuiTableColumnFlags_NoClip                = 1 << 8, 
ImGuiTableColumnFlags_NoSort                = 1 << 9, 
ImGuiTableColumnFlags_NoSortAscending       = 1 << 10,
ImGuiTableColumnFlags_NoSortDescending      = 1 << 11,
ImGuiTableColumnFlags_NoHeaderLabel         = 1 << 12,
ImGuiTableColumnFlags_NoHeaderWidth         = 1 << 13,
ImGuiTableColumnFlags_PreferSortAscending   = 1 << 14,
ImGuiTableColumnFlags_PreferSortDescending  = 1 << 15,
ImGuiTableColumnFlags_IndentEnable          = 1 << 16,
ImGuiTableColumnFlags_IndentDisable         = 1 << 17,
```

| 名前                                       | 説明                                                                                                                                                         |
|--------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableColumnFlags_None                 |                                                                                                                                                              |
| ImGuiTableColumnFlags_Disabled             | 上書き/マスター無効化フラグ: カラムが非表示になり、コンテキストメニューに表示されない (ユーザがアクセス可能な状態を操作する TableSetColumnEnabled() の呼び出しとは異なる)|
| ImGuiTableColumnFlags_DefaultHide          | デフォルトは非表示/無効カラム。                                                                                                                         |
| ImGuiTableColumnFlags_DefaultSort          | ソート列としてのデフォルト。                                                                                                                                 |
| ImGuiTableColumnFlags_WidthStretch         | カラムがストレッチされます。水平スクロールを無効にすることが望ましいです (テーブルのサイズ設定ポリシーが _SizingStretchSame または _SizingStretchProp の場合のデフォルト)。             |
| ImGuiTableColumnFlags_WidthFixed           | カラムはストレッチされません。水平スクロールが有効であることが望ましい (テーブルのサイズ設定ポリシーが _SizingFixedFit で、テーブルがリサイズ可能な場合のデフォルト)。            |
| ImGuiTableColumnFlags_NoResize             | 手動リサイズを無効にする。                                                                                                                                     |
| ImGuiTableColumnFlags_NoReorder            | このカラムの手動並べ替えを無効にすることで、他のカラムがこのカラムをまたぐのを防ぐことができます。                                                  |
| ImGuiTableColumnFlags_NoHide               | このカラムを隠す/無効にする機能を無効にする。                                                                                                                 |
| ImGuiTableColumnFlags_NoClip               | この列のクリッピングを無効にします（すべてのNoClip列は同じ描画コマンドでレンダリングされます）。                                                                    |
| ImGuiTableColumnFlags_NoSort               | テーブルにImGuiTableFlags_Sortableが設定されていても）このフィールドのソート機能を無効にします。                                                                |
| ImGuiTableColumnFlags_NoSortAscending      | 昇順にソートする機能を無効にする。                                                                                                          |
| ImGuiTableColumnFlags_NoSortDescending     | 降順にソートする機能を無効にする。                                                                                                         |
| ImGuiTableColumnFlags_NoHeaderLabel        | TableHeadersRow() は、このカラムのラベルを送信しません。小さなカラムの場合に便利です。名前はコンテキストメニューに表示されます。                          |
| ImGuiTableColumnFlags_NoHeaderWidth        | ヘッダーテキスト幅の自動列幅への寄与を無効にする。                                                                                            |
| ImGuiTableColumnFlags_PreferSortAscending  | このカラムを最初にソートする際の最初のソート方向を昇順にします (デフォルト)。                                                                       |
| ImGuiTableColumnFlags_PreferSortDescending | このカラムを最初にソートする際に、最初のソート方向を降順にします。                                                                                |
| ImGuiTableColumnFlags_IndentEnable         | セル入力時に現在のインデント値を使用する（カラム 0 のデフォルト）。                                                                                          |
| ImGuiTableColumnFlags_IndentDisable        | セル入力時に現在のインデント値を無視する(デフォルトは列 > 0)。セル内のインデント変更はそのまま尊重される。                         |


#### 出力ステータス・フラグ, TableGetColumnFlags() による読み込み専用。

```cpp
ImGuiTableColumnFlags_IsEnabled = 1 << 24,
ImGuiTableColumnFlags_IsVisible = 1 << 25,
ImGuiTableColumnFlags_IsSorted  = 1 << 26,
ImGuiTableColumnFlags_IsHovered = 1 << 27,
```

| 名前                            | 説明                                                                                                    |
|---------------------------------|---------------------------------------------------------------------------------------------------------|
| ImGuiTableColumnFlags_IsEnabled | ステータス: 有効 == ユーザー/apiによって非表示（_DefaultHideと_NoHideでは "Hide"）フラグ。 |
| ImGuiTableColumnFlags_IsVisible | ステータス: 表示されている == 有効であり、かつスクロールによってクリッピングされていない。                                          |
| ImGuiTableColumnFlags_IsSorted  | ステータス：現在、ソート仕様の一部である。 |
| ImGuiTableColumnFlags_IsHovered | ステータス：マウスがホバーした状態 |

#### (Internal) Combinations and masks

```cpp
ImGuiTableColumnFlags_WidthMask_      = ImGuiTableColumnFlags_WidthStretch | ImGuiTableColumnFlags_WidthFixed,
ImGuiTableColumnFlags_IndentMask_     = ImGuiTableColumnFlags_IndentEnable | ImGuiTableColumnFlags_IndentDisable,
ImGuiTableColumnFlags_StatusMask_     = ImGuiTableColumnFlags_IsEnabled | ImGuiTableColumnFlags_IsVisible | ImGuiTableColumnFlags_IsSorted | ImGuiTableColumnFlags_IsHovered,
ImGuiTableColumnFlags_NoDirectResize_ = 1 << 30,
};
```

| 名前                                  | 説明                                                                                                                                 |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableColumnFlags_WidthMask_      | ImGuiTableColumnFlags_WidthStretch + ImGuiTableColumnFlags_WidthFixed                                                                |
| ImGuiTableColumnFlags_IndentMask_     | ImGuiTableColumnFlags_IndentEnable + ImGuiTableColumnFlags_IndentDisable                                                             |
| ImGuiTableColumnFlags_StatusMask_     | ImGuiTableColumnFlags_IsEnabled + ImGuiTableColumnFlags_IsVisible + ImGuiTableColumnFlags_IsSorted + ImGuiTableColumnFlags_IsHovered |
| ImGuiTableColumnFlags_NoDirectResize_ | (内部) ユーザーがこの列のサイズを直接変更できないようにする(ただし、列の左端から間接的にサイズを変更することはできる)                      |


### ImGui::TableNextRow() のフラグ

```cpp
enum ImGuiTableRowFlags_
{
    ImGuiTableRowFlags_None    = 0,
    ImGuiTableRowFlags_Headers = 1 << 0,
};
```

| 名前                       | 説明                                                                                                                   |
|----------------------------|------------------------------------------------------------------------------------------------------------------------|
| ImGuiTableRowFlags_None    |                                                                                                                        |
| ImGuiTableRowFlags_Headers | ヘッダー行を特定する（デフォルトの背景色を設定し、自動カラム幅とは異なるコンテンツの幅を設定する） |

### ImGui::TableSetBgColor() 用列挙型

背景色は3つのレイヤーでレンダリングされる：

- レイヤー0：設定されていればRowBg0カラーで描画し、設定されていなければColumnBg0で描画します。
- レイヤー 1: 設定されていれば RowBg1 色で描画し、設定されていなければ ColumnBg1 色で描画します。
- レイヤー 2: 設定されていれば CellBg カラーで描画します。

2つの行/列レイヤーの目的は、背景色の変更が既存の色を上書きするかブレンドするかを決定することです。
テーブルで ImGuiTableFlags_RowBg を使用している場合、各行には奇数/偶数行の RowBg0 カラーが自動的に設定されます。
RowBg0 の色をターゲットに設定すると、既存の RowBg0 の色が上書きされます。
RowBg1またはColumnBg1ターゲットの色を設定した場合、その色はRowBg0の色の上にブレンドされます。

```cpp
enum ImGuiTableBgTarget_
{
    ImGuiTableBgTarget_None   = 0,
    ImGuiTableBgTarget_RowBg0 = 1,
    ImGuiTableBgTarget_RowBg1 = 2,
    ImGuiTableBgTarget_CellBg = 3,
};
```

| 名前                      | 説明                                                                                                             |
|---------------------------|------------------------------------------------------------------------------------------------------------------|
| ImGuiTableBgTarget_None   |                                                                                                                  |
| ImGuiTableBgTarget_RowBg0 | 行の背景色 0 を設定する (一般的に背景に使用される。ImGuiTableFlags_RowBg が使用されると自動的に設定される) |
| ImGuiTableBgTarget_RowBg1 | 行の背景色 1 を設定する（通常、選択マーク用に使用される） |
| ImGuiTableBgTarget_CellBg | セルの背景色（一番上の色）を設定する |

### ImGui::IsWindowFocused() のフラグ

```cpp
enum ImGuiFocusedFlags_
{
    ImGuiFocusedFlags_None                          = 0,
    ImGuiFocusedFlags_ChildWindows                  = 1 << 0,
    ImGuiFocusedFlags_RootWindow                    = 1 << 1,
    ImGuiFocusedFlags_AnyWindow                     = 1 << 2,
    ImGuiFocusedFlags_NoPopupHierarchy              = 1 << 3,
    //ImGuiFocusedFlags_DockHierarchy               = 1 << 4,
    ImGuiFocusedFlags_RootAndChildWindows           = ImGuiFocusedFlags_RootWindow | ImGuiFocusedFlags_ChildWindows,
};
```

| 名前                                  | 説明                                                                                                                                                                                       |
|---------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiFocusedFlags_None                |                                                                                                                                                                                            |
| ImGuiFocusedFlags_ChildWindows        | ウィンドウの子ウィンドウにフォーカスが当たっていれば真を返す |
| ImGuiFocusedFlags_RootWindow          | ルートウィンドウ（現在の階層の最上位の親）からのテスト |
| ImGuiFocusedFlags_AnyWindow           | いずれかのウィンドウにフォーカスが当たっていればtrueを返す。重要: 低レベルの入力をどのようにディスパッチするかを指定しようとしている場合は、これを使用しないでください。代わりに 'io.WantCaptureMouse'を使用してください！FAQをお読みください！ |
| ImGuiFocusedFlags_NoPopupHierarchy    | ポップアップの階層を考慮しない (ポップアップの親としてポップアップ・エミッターを扱わない) (_ChildWindowsまたは_RootWindowと一緒に使用する場合) |
| (無効)ImGuiFocusedFlags_DockHierarchy | ドッキング階層を考慮する (ドッキングされたウィンドウの親としてドッキングスペースホストを扱う) (_ChildWindowsまたは_RootWindowと一緒に使用する場合) |
| ImGuiFocusedFlags_RootAndChildWindows | ImGuiFocusedFlags_RootWindow + ImGuiFocusedFlags_ChildWindows |

### ImGui::IsItemHovered(), ImGui::IsWindowHovered() のフラグ。

- 注意：マウスをImGuiに送るか、アプリに送るかを確認する場合は、'io.WantCaptureMouse'を使用してください！FAQをお読みください！
- 注意：ImGuiWindowFlags_NoInputsフラグを持つウィンドウは、IsWindowHovered()コールでは無視されます。

```cpp
enum ImGuiHoveredFlags_
{
ImGuiHoveredFlags_None                          = 0,
ImGuiHoveredFlags_ChildWindows                  = 1 << 0,
ImGuiHoveredFlags_RootWindow                    = 1 << 1,
ImGuiHoveredFlags_AnyWindow                     = 1 << 2,
ImGuiHoveredFlags_NoPopupHierarchy              = 1 << 3,
//ImGuiHoveredFlags_DockHierarchy               = 1 << 4,
ImGuiHoveredFlags_AllowWhenBlockedByPopup       = 1 << 5,
//ImGuiHoveredFlags_AllowWhenBlockedByModal     = 1 << 6,
ImGuiHoveredFlags_AllowWhenBlockedByActiveItem  = 1 << 7,
ImGuiHoveredFlags_AllowWhenOverlappedByItem     = 1 << 8,
ImGuiHoveredFlags_AllowWhenOverlappedByWindow   = 1 << 9,
ImGuiHoveredFlags_AllowWhenDisabled             = 1 << 10,
ImGuiHoveredFlags_NoNavOverride                 = 1 << 11,
ImGuiHoveredFlags_AllowWhenOverlapped           = ImGuiHoveredFlags_AllowWhenOverlappedByItem | ImGuiHoveredFlags_AllowWhenOverlappedByWindow,
ImGuiHoveredFlags_RectOnly                      = ImGuiHoveredFlags_AllowWhenBlockedByPopup | ImGuiHoveredFlags_AllowWhenBlockedByActiveItem | ImGuiHoveredFlags_AllowWhenOverlapped,
ImGuiHoveredFlags_RootAndChildWindows           = ImGuiHoveredFlags_RootWindow | ImGuiHoveredFlags_ChildWindows,
```

| 名前                                            | 説明                                                                                                                                                   |
|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiHoveredFlags_None                          | アイテム/ウィンドウの真上にあり、他のウィンドウに遮られておらず、アクティブなポップアップやモーダルがその下の入力をブロックしていない場合、true を返します。 |
| ImGuiHoveredFlags_ChildWindows                  | IsWindowHovered() のみ：ウィンドウの子ウィンドウがホバリングされている場合に true を返す |
| ImGuiHoveredFlags_RootWindow                    | IsWindowHovered() のみ：ルート・ウィンドウ（現在の階層の最上位の親）からのテスト |
| ImGuiHoveredFlags_AnyWindow                     | IsWindowHovered() のみ：ウィンドウがホバーされている場合に true を返す |
| ImGuiHoveredFlags_NoPopupHierarchy              | IsWindowHovered() のみ：ポップアップの階層を考慮しない (ポップアップの親としてポップアップ・エミッターを扱わない) (_ChildWindows または _RootWindow とともに使用する場合) |
| (無効)ImGuiHoveredFlags_DockHierarchy           | IsWindowHovered() のみ：ドッキング階層を考慮する(ドッキングされたウィンドウの親としてドッキングスペースホストを扱う) (_ChildWindows または _RootWindow とともに使用する場合) |
| ImGuiHoveredFlags_AllowWhenBlockedByPopup       | ポップアップウィンドウがこのアイテム/ウィンドウへのアクセスを通常ブロックしている場合でも、trueを返す。 |
| (無効)ImGuiHoveredFlags_AllowWhenBlockedByModal | モーダルポップアップウィンドウが通常このアイテム/ウィンドウへのアクセスをブロックしている場合でも、true を返します。FIXME-TODO: まだ使用できません。                                 |
| ImGuiHoveredFlags_AllowWhenBlockedByActiveItem  | アクティブなアイテムがこのアイテム/ウィンドウへのアクセスをブロックしている場合でも真を返します。Drag and Drop パターンに便利です。                                          |
| ImGuiHoveredFlags_AllowWhenOverlappedByItem     | IsItemHovered() のみ：アイテムが AllowOverlap モードを使用していて、他のホバー可能なアイテムに重なっている場合でも true を返します。                                 |
| ImGuiHoveredFlags_AllowWhenOverlappedByWindow   | IsItemHovered() のみ：他のウィンドウに遮られたり重なったりしても真を返す。                                                  |
| ImGuiHoveredFlags_AllowWhenDisabled             | IsItemHovered() のみ：アイテムが無効になっていてもtrueを返す |
| ImGuiHoveredFlags_NoNavOverride                 | IsItemHovered()のみ：アクティブ時にゲームパッド/キーボードのナビゲーション状態を使用せず、常にマウスに問い合わせる。 |
| ImGuiHoveredFlags_AllowWhenOverlapped           | ImGuiHoveredFlags_AllowWhenOverlappedByItem + ImGuiHoveredFlags_AllowWhenOverlappedByWindow                                                            |
| ImGuiHoveredFlags_RectOnly                      | ImGuiHoveredFlags_AllowWhenBlockedByPopup + ImGuiHoveredFlags_AllowWhenBlockedByActiveItem + ImGuiHoveredFlags_AllowWhenOverlapped                     |
| ImGuiHoveredFlags_RootAndChildWindows           | ImGuiHoveredFlags_RootWindow + ImGuiHoveredFlags_ChildWindows                                                                                          |

#### ツールチップモード

- 通常、IsItemHovered() + SetTooltip() シーケンスで使用します。
- これは、'style.HoverFlagsForTooltipMouse' または 'style.HoverFlagsForTooltipNav' からフラグを取得するショートカットです。
  - 例: 'TooltipHoveredFlagsForMouse' のデフォルトは 'ImGuiHoveredFlags_Stationary | ImGuiHoveredFlags_DelayShort' です。
- 頻繁にアクションを起こしたり、ツールチップを表示するアイテムには、ImGuiHoveredFlags_ForTooltip (stationary + delay)を使い、ツールチップが頻繁に表示されないようにします。
- ホバーされることが主な目的であるアイテム、アフォーダンスが低いアイテム、または一貫性のないアプリでは、遅延なし、または短い遅延を使用します。

```cpp
ImGuiHoveredFlags_ForTooltip = 1 << 12,
```

| 名前                         | 説明                                                                            |
|------------------------------|---------------------------------------------------------------------------------|
| ImGuiHoveredFlags_ForTooltip | IsItemHovered() + SetTooltip() シーケンス使用時の標準フラグのショートカット。 |

#### (詳細)マウスホバリングの遅延。

- 一般的には、ImGuiHoveredFlags_ForTooltipを使ってアプリケーション標準のフラグを使うことができます。
- 特定のオーバーライドが必要な場合は、それらを使用してください。

```cpp
ImGuiHoveredFlags_Stationary    = 1 << 13,
ImGuiHoveredFlags_DelayNone     = 1 << 14,
ImGuiHoveredFlags_DelayShort    = 1 << 15,
ImGuiHoveredFlags_DelayNormal   = 1 << 16,
ImGuiHoveredFlags_NoSharedDelay = 1 << 17,
};
```

| 名前                            | 説明                                                                                                                                                                                                         |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiHoveredFlags_Stationary    | style.HoverStationaryDelay (~0.15 秒) の間、マウスを少なくとも 1 回静止させる。この後、同じアイテム/ウィンドウ上を移動できます。静止テストを使用すると、長い遅延の必要性が減る傾向があります。 |
| ImGuiHoveredFlags_DelayNone     | IsItemHovered() のみ：すぐに真を返す（デフォルト）。これはデフォルトなので、通常は無視します。                                                                                                   |
| ImGuiHoveredFlags_DelayShort    | IsItemHovered() のみ：style.HoverDelayShort経過後（～0.15秒）にtrueを返す（アイテム間で共有） + style.HoverStationaryDelayの間、マウスが静止している必要がある（アイテムごとに1回）。                   |
| ImGuiHoveredFlags_DelayNormal   | IsItemHovered() のみ：style.HoverDelayNormalの経過後（～0.40秒）にtrueを返す（アイテム間で共有） + style.HoverStationaryDelayの間、マウスが静止している必要がある（アイテムごとに1回）。                  |
| ImGuiHoveredFlags_NoSharedDelay | IsItemHovered() のみ：あるアイテムから次のアイテムに移動すると、前のタイマーが短時間維持される共有遅延システムを無効にする(長い遅延を持つツールチップの標準) |


### ImGui::BeginDragDropSource(), ImGui::AcceptDragDropPayload() のフラグ。

```cpp
enum ImGuiDragDropFlags_
{
    ImGuiDragDropFlags_None                         = 0,
    // BeginDragDropSource() flags
    ImGuiDragDropFlags_SourceNoPreviewTooltip       = 1 << 0,
    ImGuiDragDropFlags_SourceNoDisableHover         = 1 << 1,
    ImGuiDragDropFlags_SourceNoHoldToOpenOthers     = 1 << 2,
    ImGuiDragDropFlags_SourceAllowNullID            = 1 << 3,
    ImGuiDragDropFlags_SourceExtern                 = 1 << 4,
    ImGuiDragDropFlags_SourceAutoExpirePayload      = 1 << 5,
    // AcceptDragDropPayload() flags
    ImGuiDragDropFlags_AcceptBeforeDelivery         = 1 << 10,
    ImGuiDragDropFlags_AcceptNoDrawDefaultRect      = 1 << 11,
    ImGuiDragDropFlags_AcceptNoPreviewTooltip       = 1 << 12,
    ImGuiDragDropFlags_AcceptPeekOnly               = ImGuiDragDropFlags_AcceptBeforeDelivery | ImGuiDragDropFlags_AcceptNoDrawDefaultRect,
};
```

| 名前                                        | 説明                                                                                                                                                                                                                                                                 |
|---------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiDragDropFlags_None                     |                                                                                                                                                                                                                                                                      |
| (無効)BeginDragDropSource() flags           |                                                                                                                                                                                                                                                                      |
| ImGuiDragDropFlags_SourceNoPreviewTooltip   | プレビューのツールチップを無効にします。デフォルトでは、BeginDragDropSource の呼び出しに成功すると、ツールチップが開き、ソースの内容のプレビューや説明を表示できます。このフラグは、この動作を無効にします。                                                                  |
| ImGuiDragDropFlags_SourceNoDisableHover     | デフォルトでは、ドラッグ時にデータをクリアして IsItemHovered() が false を返すようにします。このフラグはこの動作を無効にするので、ソース・アイテムの IsItemHovered() を呼び出すことができます。                                     |
| ImGuiDragDropFlags_SourceNoHoldToOpenOthers | ソース・アイテムをドラッグしている間、その上にホールドすることによって、ツリー・ノードを開いたり、ヘッダーを折りたたんだりすることができる動作を無効にする。                                                                                                                                         |
| ImGuiDragDropFlags_SourceAllowNullID        | Text()やImage()のような一意な識別子を持たないアイテムを、ウィンドウの相対位置に基づいて一時的な識別子を生成することで、ドラッグソースとして使用できるようにしました。これは親愛なるimguiエコシステムの中では非常に珍しいことなので、明示しました。 |
| ImGuiDragDropFlags_SourceExtern             | 外部ソース（親愛なるimguiの外部）から、現在のアイテム/ウィンドウ情報を読み取ろうとしません。常にtrueを返します。同時にアクティブにできる外部ソースは1つだけです。                                                                                          |
| ImGuiDragDropFlags_SourceAutoExpirePayload  | ソースが送信されなくなった場合、ペイロードは自動的に期限切れになります。 |
| (無効)AcceptDragDropPayload() flags         |                                                                                                                                                                                                                                                                      |
| ImGuiDragDropFlags_AcceptBeforeDelivery     | AcceptDragDropPayload() は、マウス・ボタンが離される前でも真を返します。その後、IsDelivery() を呼び出して、ペイロードを配信する必要があるかどうかをテストできます。                                                                                                     |
| ImGuiDragDropFlags_AcceptNoDrawDefaultRect  | ターゲット上にカーソルを置いたときに、デフォルトのハイライト矩形を描画しない。                                                                                                                                                                                               |
| ImGuiDragDropFlags_AcceptNoPreviewTooltip   | BeginDragDropTarget サイトから BeginDragDropSource ツールチップを非表示にすることを要求します。                                                                                                                                                                                    |
| ImGuiDragDropFlags_AcceptPeekOnly           | ImGuiDragDropFlags_AcceptBeforeDelivery + ImGuiDragDropFlags_AcceptNoDrawDefaultRect (配信前に先読みしてペイロードを検査するため)。                                                                                                                |

Standard Drag and Drop payload types. You can define you own payload types using short strings. Types starting with '_' are defined by Dear ImGui.

```cpp
#define IMGUI_PAYLOAD_TYPE_COLOR_3F "_COL3F"
#define IMGUI_PAYLOAD_TYPE_COLOR_4F "_COL4F"
```

| 名前                        | 説明                                                                            |
|-----------------------------|---------------------------------------------------------------------------------|
| IMGUI_PAYLOAD_TYPE_COLOR_3F | `float[3]`: アルファを含まない色の標準型。ユーザーコードはこの型を使用できる。 |
| IMGUI_PAYLOAD_TYPE_COLOR_4F | `float[4]`: 色の標準型。ユーザーコードはこの型を使用できる。                |

### 主要なデータ型

```cpp
enum ImGuiDataType_
{
    ImGuiDataType_S8,
    ImGuiDataType_U8,
    ImGuiDataType_S16,
    ImGuiDataType_U16,
    ImGuiDataType_S32,
    ImGuiDataType_U32,
    ImGuiDataType_S64,
    ImGuiDataType_U64,
    ImGuiDataType_Float,
    ImGuiDataType_Double,
    ImGuiDataType_COUNT
};
```

|名前|説明|
|---|---|
|ImGuiDataType_S8     | signed char / char (with sensible compilers) |
|ImGuiDataType_U8     | unsigned char |
|ImGuiDataType_S16    | short |
|ImGuiDataType_U16    | unsigned short |
|ImGuiDataType_S32    | int |
|ImGuiDataType_U32    | unsigned int |
|ImGuiDataType_S64    | long long / __int64 |
|ImGuiDataType_U64    | unsigned long long / unsigned __int64 |
|ImGuiDataType_Float  | float |
|ImGuiDataType_Double | double |
|ImGuiDataType_COUNT  | |

### 主要な方向

```cpp
enum ImGuiDir_
{
    ImGuiDir_None    = -1,
    ImGuiDir_Left    = 0,
    ImGuiDir_Right   = 1,
    ImGuiDir_Up      = 2,
    ImGuiDir_Down    = 3,
    ImGuiDir_COUNT
};
```

### ソートの順序

```cpp
enum ImGuiSortDirection_
{
    ImGuiSortDirection_None         = 0,
    ImGuiSortDirection_Ascending    = 1,
    ImGuiSortDirection_Descending   = 2
};
```

|名前|説明|
|---|---|
|ImGuiSortDirection_Ascending |昇順 = 0->9、A->Zなど。 |
|ImGuiSortDirection_Descending|降順 = 9->0、Z->Aなど。 |

### キーの識別子

(`ImGuiKey_XXX` または `ImGuiMod_XXX` の値): はキーボード、マウス、ゲームパッドの値を表します。

名前付きキーはすべて>= 512である。キー値0から511は、レガシーなネイティブ/不透明キー値として未使用のままになっています（< 1.87）。
1.89以降、型付けが増え（intからenumへ）、レガシーなコードではImGuiKeyへのキャストが必要になる場合があります。
1.87と1.89の移行の詳細については`https://github.com/ocornut/imgui/issues/4921`を参照してください。
Key "は物理的なキーに関連しており、入力 "Characters "とは同じ概念ではないことに注意してください。

```cpp
enum ImGuiKey : int
{
```

#### キーボード

```cpp
    ImGuiKey_None = 0,
    ImGuiKey_Tab = 512,             // == ImGuiKey_NamedKey_BEGIN
    ImGuiKey_LeftArrow,
    ImGuiKey_RightArrow,
    ImGuiKey_UpArrow,
    ImGuiKey_DownArrow,
    ImGuiKey_PageUp,
    ImGuiKey_PageDown,
    ImGuiKey_Home,
    ImGuiKey_End,
    ImGuiKey_Insert,
    ImGuiKey_Delete,
    ImGuiKey_Backspace,
    ImGuiKey_Space,
    ImGuiKey_Enter,
    ImGuiKey_Escape,
    ImGuiKey_LeftCtrl, ImGuiKey_LeftShift, ImGuiKey_LeftAlt, ImGuiKey_LeftSuper,
    ImGuiKey_RightCtrl, ImGuiKey_RightShift, ImGuiKey_RightAlt, ImGuiKey_RightSuper,
    ImGuiKey_Menu,
    ImGuiKey_0, ImGuiKey_1, ImGuiKey_2, ImGuiKey_3, ImGuiKey_4, ImGuiKey_5, ImGuiKey_6, ImGuiKey_7, ImGuiKey_8, ImGuiKey_9,
    ImGuiKey_A, ImGuiKey_B, ImGuiKey_C, ImGuiKey_D, ImGuiKey_E, ImGuiKey_F, ImGuiKey_G, ImGuiKey_H, ImGuiKey_I, ImGuiKey_J,
    ImGuiKey_K, ImGuiKey_L, ImGuiKey_M, ImGuiKey_N, ImGuiKey_O, ImGuiKey_P, ImGuiKey_Q, ImGuiKey_R, ImGuiKey_S, ImGuiKey_T,
    ImGuiKey_U, ImGuiKey_V, ImGuiKey_W, ImGuiKey_X, ImGuiKey_Y, ImGuiKey_Z,
    ImGuiKey_F1, ImGuiKey_F2, ImGuiKey_F3, ImGuiKey_F4, ImGuiKey_F5, ImGuiKey_F6,
    ImGuiKey_F7, ImGuiKey_F8, ImGuiKey_F9, ImGuiKey_F10, ImGuiKey_F11, ImGuiKey_F12,
    ImGuiKey_Apostrophe,        // '
    ImGuiKey_Comma,             // ,
    ImGuiKey_Minus,             // -
    ImGuiKey_Period,            // .
    ImGuiKey_Slash,             // /
    ImGuiKey_Semicolon,         // ;
    ImGuiKey_Equal,             // =
    ImGuiKey_LeftBracket,       // [
    ImGuiKey_Backslash,         // \ (this text inhibit multiline comment caused by backslash)
    ImGuiKey_RightBracket,      // ]
    ImGuiKey_GraveAccent,       // `
    ImGuiKey_CapsLock,
    ImGuiKey_ScrollLock,
    ImGuiKey_NumLock,
    ImGuiKey_PrintScreen,
    ImGuiKey_Pause,
    ImGuiKey_Keypad0, ImGuiKey_Keypad1, ImGuiKey_Keypad2, ImGuiKey_Keypad3, ImGuiKey_Keypad4,
    ImGuiKey_Keypad5, ImGuiKey_Keypad6, ImGuiKey_Keypad7, ImGuiKey_Keypad8, ImGuiKey_Keypad9,
    ImGuiKey_KeypadDecimal,
    ImGuiKey_KeypadDivide,
    ImGuiKey_KeypadMultiply,
    ImGuiKey_KeypadSubtract,
    ImGuiKey_KeypadAdd,
    ImGuiKey_KeypadEnter,
    ImGuiKey_KeypadEqual,
```

#### ゲームパッド

ナビゲーションアクション: そのうちのいくつかはアナログ値で、0.0fから1.0fまである
コントローラマッピングPNG/PSDのダウンロードは、`http://dearimgui.com/controls_sheets`から。

```cpp
    ImGuiKey_GamepadStart,
    ImGuiKey_GamepadBack,
    ImGuiKey_GamepadFaceLeft,
    ImGuiKey_GamepadFaceRight,
    ImGuiKey_GamepadFaceUp,
    ImGuiKey_GamepadFaceDown,
    ImGuiKey_GamepadDpadLeft,
    ImGuiKey_GamepadDpadRight,
    ImGuiKey_GamepadDpadUp,
    ImGuiKey_GamepadDpadDown,
    ImGuiKey_GamepadL1,
    ImGuiKey_GamepadR1,
    ImGuiKey_GamepadL2,
    ImGuiKey_GamepadR2,
    ImGuiKey_GamepadL3,
    ImGuiKey_GamepadR3,
    ImGuiKey_GamepadLStickLeft,
    ImGuiKey_GamepadLStickRight,
    ImGuiKey_GamepadLStickUp,
    ImGuiKey_GamepadLStickDown,
    ImGuiKey_GamepadRStickLeft,
    ImGuiKey_GamepadRStickRight,
    ImGuiKey_GamepadRStickUp,
    ImGuiKey_GamepadRStickDown,
```

|名前|ゲームパッド|説明|
|---|---|---|
|ImGuiKey_GamepadStart       | Menu (Xbox), + (Switch), Start/Options (PS) ||
|ImGuiKey_GamepadBack        | View (Xbox), - (Switch), Share (PS)         ||
|ImGuiKey_GamepadFaceLeft    | X (Xbox), Y (Switch), Square (PS)        | タップ：メニューの切り替え。ホールド：ウィンドウ・モード（ウィンドウのフォーカス／移動／サイズ変更）|
|ImGuiKey_GamepadFaceRight   | B (Xbox), A (Switch), Circle (PS)        | キャンセル / 閉じる / 終了|
|ImGuiKey_GamepadFaceUp      | Y (Xbox), X (Switch), Triangle (PS)      | テキスト入力 / オンスクリーンキーボード|
|ImGuiKey_GamepadFaceDown    | A (Xbox), B (Switch), Cross (PS)         | アクティベート / オープン / トグル / 微調整|
|ImGuiKey_GamepadDpadLeft    | D-pad Left                                       | 移動 / 微調整 / ウィンドウのサイズ変更 (ウィンドウモード)|
|ImGuiKey_GamepadDpadRight   | D-pad Right                                      | 移動 / 微調整 / ウィンドウのサイズ変更 (ウィンドウモード)|
|ImGuiKey_GamepadDpadUp      | D-pad Up                                         | 移動 / 微調整 / ウィンドウのサイズ変更 (ウィンドウモード)|
|ImGuiKey_GamepadDpadDown    | D-pad Down                                       | 移動 / 微調整 / ウィンドウのサイズ変更 (ウィンドウモード)|
|ImGuiKey_GamepadL1          | L Bumper (Xbox), L (Switch), L1 (PS)            | ゆっくり調整 / 前へフォーカス (ウィンドウモード)|
|ImGuiKey_GamepadR1          | R Bumper (Xbox), R (Switch), R1 (PS)            | より速く調整する / 次へフォーカス (ウィンドウモード)|
|ImGuiKey_GamepadL2          | L Trig. (Xbox), ZL (Switch), L2 (PS) (Analog)   ||
|ImGuiKey_GamepadR2          | R Trig. (Xbox), ZR (Switch), R2 (PS) (Analog)   ||
|ImGuiKey_GamepadL3          | L Stick (Xbox), L3 (Switch), L3 (PS)            ||
|ImGuiKey_GamepadR3          | R Stick (Xbox), R3 (Switch), R3 (PS)            ||
|ImGuiKey_GamepadLStickLeft  | (Analog)                                         | ウィンドウの移動（ウィンドウモード）|
|ImGuiKey_GamepadLStickRight | (Analog)                                         | ウィンドウの移動（ウィンドウモード）|
|ImGuiKey_GamepadLStickUp    | (Analog)                                         | ウィンドウの移動（ウィンドウモード）|
|ImGuiKey_GamepadLStickDown  | (Analog)                                         | ウィンドウの移動（ウィンドウモード）|
|ImGuiKey_GamepadRStickLeft  | (Analog)||
|ImGuiKey_GamepadRStickRight | (Analog)||
|ImGuiKey_GamepadRStickUp    | (Analog)||
|ImGuiKey_GamepadRStickDown  | (Analog)||

#### エイリアス: マウスボタン

AddMouseButtonEvent()呼び出しから自動サブミットされる。

- これは、io.MouseDown[]、io.MouseWheelにも書き込まれたデータを、標準のキーAPIでアクセスできる形式にミラーリングしている。

```cpp
    ImGuiKey_MouseLeft, ImGuiKey_MouseRight, ImGuiKey_MouseMiddle, ImGuiKey_MouseX1, ImGuiKey_MouseX2, ImGuiKey_MouseWheelX, ImGuiKey_MouseWheelY,
```

#### (内部) MODストレージ用に予約

```cpp
    ImGuiKey_ReservedForModCtrl, ImGuiKey_ReservedForModShift, ImGuiKey_ReservedForModAlt, ImGuiKey_ReservedForModSuper,
    ImGuiKey_COUNT,
```

#### キーボード修飾子

AddKeyEvent() 呼び出しによってバックエンドから明示的に送信される。

- これは、io.KeyCtrl、io.KeyShift、io.KeyAlt、io.KeySuperに書き込まれたデータを、標準的なキーAPIでアクセスできる形式にミラーリングしたもので、IsKeyPressed()、IsKeyReleased()、持続時間の問い合わせなどの呼び出しが可能です。
- すべてのキーをポーリングするコード（例えば、入力マッピングのためにキーが押されたことを検出するインターフェース）は、これらのキーを無視して、実際のキーを使用することを好むかもしれません（例えば、ImGuiMod_Ctrlの代わりにImGuiKey_LeftCtrl、ImGuiKey_RightCtrl）。
- 理論的には、キーボードモディファイアの値は、左/右キーの論理値とほぼ等しいはずです。
  - 実際には複雑です。モディファイアはしばしば異なるソースから提供されます。キーボードレイアウト、IME、スティッキーキー、バックエンドが干渉し、その等価性を壊す傾向があります。より安全な決定は、その曖昧さをエンドユーザーに伝えることです。

```cpp
    ImGuiMod_None     = 0,
    ImGuiMod_Ctrl     = 1 << 12,
    ImGuiMod_Shift    = 1 << 13,
    ImGuiMod_Alt      = 1 << 14,
    ImGuiMod_Super    = 1 << 15,
    ImGuiMod_Shortcut = 1 << 11,
    ImGuiMod_Mask_    = 0xF800,
```

|名前|説明|
|---|---|
| ImGuiMod_None     | |
| ImGuiMod_Ctrl     | Ctrl |
| ImGuiMod_Shift    | Shift |
| ImGuiMod_Alt      | Option/Menu |
| ImGuiMod_Super    | Cmd/Super/Windows |
| ImGuiMod_Shortcut | Ctrl（macOS以外）または Super（macOS）のエイリアス。 |
| ImGuiMod_Mask_    | 5-bits |

(内部) 1.87以前では、ネイティブインデックスと`io.KeyMap[]`配列を使って`io.KeysDown[512]`を埋める必要がありました。
このメソッドは捨てますが、IsKeyPressed(MY_NATIVE_KEY_CODE)などのユーザーコード用のレガシーパスは残します。
すべてのキーを反復処理する必要がある場合（入力マッパーなど）、ImGuiKey_NamedKey_BEGIN..ImGuiKey_NamedKey_ENDを使用できます。

```cpp
    ImGuiKey_NamedKey_BEGIN         = 512,
    ImGuiKey_NamedKey_END           = ImGuiKey_COUNT,
    ImGuiKey_NamedKey_COUNT         = ImGuiKey_NamedKey_END - ImGuiKey_NamedKey_BEGIN,
#ifdef IMGUI_DISABLE_OBSOLETE_KEYIO
    ImGuiKey_KeysData_SIZE          = ImGuiKey_NamedKey_COUNT,  // Size of KeysData[]: only hold named keys
    ImGuiKey_KeysData_OFFSET        = ImGuiKey_NamedKey_BEGIN,  // Accesses to io.KeysData[] must use (key - ImGuiKey_KeysData_OFFSET) index.
#else
    ImGuiKey_KeysData_SIZE          = ImGuiKey_COUNT,           // Size of KeysData[]: hold legacy 0..512 keycodes + named keys
    ImGuiKey_KeysData_OFFSET        = 0,                        // Accesses to io.KeysData[] must use (key - ImGuiKey_KeysData_OFFSET) index.
#endif

#ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
    ImGuiKey_ModCtrl = ImGuiMod_Ctrl, ImGuiKey_ModShift = ImGuiMod_Shift, ImGuiKey_ModAlt = ImGuiMod_Alt, ImGuiKey_ModSuper = ImGuiMod_Super, // Renamed in 1.89
    ImGuiKey_KeyPadEnter = ImGuiKey_KeypadEnter,    // Renamed in 1.87
#endif
};

#ifndef IMGUI_DISABLE_OBSOLETE_KEYIO
// OBSOLETED in 1.88 (from July 2022): ImGuiNavInput and io.NavInputs[].
// Official backends between 1.60 and 1.86: will keep working and feed gamepad inputs as long as IMGUI_DISABLE_OBSOLETE_KEYIO is not set.
// Custom backends: feed gamepad inputs via io.AddKeyEvent() and ImGuiKey_GamepadXXX enums.
enum ImGuiNavInput
{
    ImGuiNavInput_Activate, ImGuiNavInput_Cancel, ImGuiNavInput_Input, ImGuiNavInput_Menu, ImGuiNavInput_DpadLeft, ImGuiNavInput_DpadRight, ImGuiNavInput_DpadUp, ImGuiNavInput_DpadDown,
    ImGuiNavInput_LStickLeft, ImGuiNavInput_LStickRight, ImGuiNavInput_LStickUp, ImGuiNavInput_LStickDown, ImGuiNavInput_FocusPrev, ImGuiNavInput_FocusNext, ImGuiNavInput_TweakSlow, ImGuiNavInput_TweakFast,
    ImGuiNavInput_COUNT,
};
#endif
```

### io.ConfigFlagsに格納されている設定フラグ。

ユーザ/アプリケーションによって設定される。

```cpp
enum ImGuiConfigFlags_
{
ImGuiConfigFlags_None                 = 0,
ImGuiConfigFlags_NavEnableKeyboard    = 1 << 0,
ImGuiConfigFlags_NavEnableGamepad     = 1 << 1,
ImGuiConfigFlags_NavEnableSetMousePos = 1 << 2,
ImGuiConfigFlags_NavNoCaptureKeyboard = 1 << 3,
ImGuiConfigFlags_NoMouse              = 1 << 4,
ImGuiConfigFlags_NoMouseCursorChange  = 1 << 5,
```

| 名前                                  | 説明                                                                                                                                                                                                                                                                                                                                    |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiConfigFlags_None                 |                                                                                                                                                                                                                                                                                                                                         |
| ImGuiConfigFlags_NavEnableKeyboard    | マスターキーボードナビゲーション有効フラグ。フルタブ＋方向矢印＋スペース/エンターで有効にする。                                                                                                                                                                                                                             |
| ImGuiConfigFlags_NavEnableGamepad     | マスターゲームパッドナビゲーション有効フラグ。バックエンドもImGuiBackendFlags_HasGamepadを設定する必要がある。                                                                                                                                                                                                                                          |
| ImGuiConfigFlags_NavEnableSetMousePos | マウスカーソルの移動をナビゲーションに指示する。仮想マウスを動かすのが厄介なTV/コンソールシステムで役に立つかもしれない。io.MousePosを更新し、io.WantSetMousePos=trueを設定します。有効にした場合、バックエンドでio.WantSetMousePosリクエストに従わなければなりません。そうしないと、ImGuiはマウスが前後に飛び跳ねているかのように反応します。 |
| ImGuiConfigFlags_NavNoCaptureKeyboard | io.NavActiveが設定されているときに、io.WantCaptureKeyboardフラグを設定しないようにナビゲーションに指示する。                                                                                                                                                                                                                                                |
| ImGuiConfigFlags_NoMouse              | NewFrame()でマウスの位置/ボタンをクリアするようimguiに指示。これにより、バックエンドによって設定されたマウス情報を無視することができる。                                                                                                                                                                                                            |
| ImGuiConfigFlags_NoMouseCursorChange  | マウスカーソルの形状と可視性を変更しないようにバックエンドに指示する。バックエンドのカーソルの変更があなたのカーソルの変更と干渉していて、マウスカーソルを変更するために SetMouseCursor() を使いたくない場合に使用します。代わりに自分でGetMouseCursor()を読み込んで、imguiからの要求を尊重したい場合があります。                                                |

#### ユーザーストレージ

バックエンド/エンジンが複数のプロジェクトで共有されるコードと通信できるようにするためです。これらのフラグはImGuiのコアでは使用されません。

```cpp
ImGuiConfigFlags_IsSRGB        = 1 << 20,
ImGuiConfigFlags_IsTouchScreen = 1 << 21,
};
```

| 名前                           | 説明                                                    |
|--------------------------------|---------------------------------------------------------|
| ImGuiConfigFlags_IsSRGB        | アプリケーションはSRGBを意識している。                              |
| ImGuiConfigFlags_IsTouchScreen | アプリケーションはマウスの代わりにタッチスクリーンを使っている。 |

io.BackendFlags に格納されているバックエンド機能フラグ。imgui_impl_xxx またはカスタムバックエンドによって設定されます。

```cpp
enum ImGuiBackendFlags_
{
    ImGuiBackendFlags_None                  = 0,
    ImGuiBackendFlags_HasGamepad            = 1 << 0,
    ImGuiBackendFlags_HasMouseCursors       = 1 << 1,
    ImGuiBackendFlags_HasSetMousePos        = 1 << 2,
    ImGuiBackendFlags_RendererHasVtxOffset  = 1 << 3,
};
```

| 名前                                   | 説明                                                                                                                                                   |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| ImGuiBackendFlags_None                 |                                                                                                                                                        |
| ImGuiBackendFlags_HasGamepad           | バックエンドプラットフォームはゲームパッドをサポートしており、現在1台が接続されている。                                                                                     |
| ImGuiBackendFlags_HasMouseCursors      | バックエンドプラットフォームは、OSのカーソル形状を変更するためにGetMouseCursor()の値を尊重することをサポートします。                                                               |
| ImGuiBackendFlags_HasSetMousePos       | バックエンドプラットフォームは、OSのマウス位置を再配置するio.WantSetMousePosリクエストをサポートします（ImGuiConfigFlags_NavEnableSetMousePosが設定されている場合のみ使用されます）。 |
| ImGuiBackendFlags_RendererHasVtxOffset | バックエンド・レンダラーがImDrawCmd::VtxOffsetをサポートしました。これにより、16ビットインデックスを使用しながら、大きなメッシュ（64K以上の頂点）の出力が可能になります。                  |


### PushStyleColor() / PopStyleColor() の列挙型

```cpp
enum ImGuiCol_
{
    ImGuiCol_Text,
    ImGuiCol_TextDisabled,
    ImGuiCol_WindowBg,              // Background of normal windows
    ImGuiCol_ChildBg,               // Background of child windows
    ImGuiCol_PopupBg,               // Background of popups, menus, tooltips windows
    ImGuiCol_Border,
    ImGuiCol_BorderShadow,
    ImGuiCol_FrameBg,               // Background of checkbox, radio button, plot, slider, text input
    ImGuiCol_FrameBgHovered,
    ImGuiCol_FrameBgActive,
    ImGuiCol_TitleBg,
    ImGuiCol_TitleBgActive,
    ImGuiCol_TitleBgCollapsed,
    ImGuiCol_MenuBarBg,
    ImGuiCol_ScrollbarBg,
    ImGuiCol_ScrollbarGrab,
    ImGuiCol_ScrollbarGrabHovered,
    ImGuiCol_ScrollbarGrabActive,
    ImGuiCol_CheckMark,
    ImGuiCol_SliderGrab,
    ImGuiCol_SliderGrabActive,
    ImGuiCol_Button,
    ImGuiCol_ButtonHovered,
    ImGuiCol_ButtonActive,
    ImGuiCol_Header,                // Header* colors are used for CollapsingHeader, TreeNode, Selectable, MenuItem
    ImGuiCol_HeaderHovered,
    ImGuiCol_HeaderActive,
    ImGuiCol_Separator,
    ImGuiCol_SeparatorHovered,
    ImGuiCol_SeparatorActive,
    ImGuiCol_ResizeGrip,            // Resize grip in lower-right and lower-left corners of windows.
    ImGuiCol_ResizeGripHovered,
    ImGuiCol_ResizeGripActive,
    ImGuiCol_Tab,                   // TabItem in a TabBar
    ImGuiCol_TabHovered,
    ImGuiCol_TabActive,
    ImGuiCol_TabUnfocused,
    ImGuiCol_TabUnfocusedActive,
    ImGuiCol_PlotLines,
    ImGuiCol_PlotLinesHovered,
    ImGuiCol_PlotHistogram,
    ImGuiCol_PlotHistogramHovered,
    ImGuiCol_TableHeaderBg,         // Table header background
    ImGuiCol_TableBorderStrong,     // Table outer and header borders (prefer using Alpha=1.0 here)
    ImGuiCol_TableBorderLight,      // Table inner borders (prefer using Alpha=1.0 here)
    ImGuiCol_TableRowBg,            // Table row background (even rows)
    ImGuiCol_TableRowBgAlt,         // Table row background (odd rows)
    ImGuiCol_TextSelectedBg,
    ImGuiCol_DragDropTarget,        // Rectangle highlighting a drop target
    ImGuiCol_NavHighlight,          // Gamepad/keyboard: current highlighted item
    ImGuiCol_NavWindowingHighlight, // Highlight window when using CTRL+TAB
    ImGuiCol_NavWindowingDimBg,     // Darken/colorize entire screen behind the CTRL+TAB window list, when active
    ImGuiCol_ModalWindowDimBg,      // Darken/colorize entire screen behind a modal window, when one is active
    ImGuiCol_COUNT
};
```

### ImGuiStyle 構造体を一時的に変更する PushStyleVar() / PopStyleVar() 用の列挙型

- enumはImGuiStyleのフィールドを参照するだけなので、UIコード内でプッシュ/ポップされるのは理にかなっている。
  初期化中やフレームとフレームの間は、ImGuiStyleに直接突っ込んでください。
- ヒントプログラミングIDEのナビゲーション機能を使って、下の_2列目の名前をクリックすると、実際のメンバーとその説明が表示されます。
  Visual Studio IDEではCTRL+カンマ（"Edit.GoToAll"）はコメント内のシンボルをフォローできますが、CTRL+F12（"Edit.GoToImplementation"）はフォローできません。
  Visual Assistがインストールされている場合ALT+G（"VAssistX.GoToImplementation"）もコメント内の記号を追うことができます。
- この列挙型を変更する場合は、関連する内部テーブル GStyleVarInfo[] を適宜更新する必要があります。ここで、列挙値をメンバーのオフセット/タイプにリンクします。

```cpp
enum ImGuiStyleVar_
{
    // Enum name --------------------- // Member in ImGuiStyle structure (see ImGuiStyle for descriptions)
    ImGuiStyleVar_Alpha,               // float     Alpha
    ImGuiStyleVar_DisabledAlpha,       // float     DisabledAlpha
    ImGuiStyleVar_WindowPadding,       // ImVec2    WindowPadding
    ImGuiStyleVar_WindowRounding,      // float     WindowRounding
    ImGuiStyleVar_WindowBorderSize,    // float     WindowBorderSize
    ImGuiStyleVar_WindowMinSize,       // ImVec2    WindowMinSize
    ImGuiStyleVar_WindowTitleAlign,    // ImVec2    WindowTitleAlign
    ImGuiStyleVar_ChildRounding,       // float     ChildRounding
    ImGuiStyleVar_ChildBorderSize,     // float     ChildBorderSize
    ImGuiStyleVar_PopupRounding,       // float     PopupRounding
    ImGuiStyleVar_PopupBorderSize,     // float     PopupBorderSize
    ImGuiStyleVar_FramePadding,        // ImVec2    FramePadding
    ImGuiStyleVar_FrameRounding,       // float     FrameRounding
    ImGuiStyleVar_FrameBorderSize,     // float     FrameBorderSize
    ImGuiStyleVar_ItemSpacing,         // ImVec2    ItemSpacing
    ImGuiStyleVar_ItemInnerSpacing,    // ImVec2    ItemInnerSpacing
    ImGuiStyleVar_IndentSpacing,       // float     IndentSpacing
    ImGuiStyleVar_CellPadding,         // ImVec2    CellPadding
    ImGuiStyleVar_ScrollbarSize,       // float     ScrollbarSize
    ImGuiStyleVar_ScrollbarRounding,   // float     ScrollbarRounding
    ImGuiStyleVar_GrabMinSize,         // float     GrabMinSize
    ImGuiStyleVar_GrabRounding,        // float     GrabRounding
    ImGuiStyleVar_TabRounding,         // float     TabRounding
    ImGuiStyleVar_ButtonTextAlign,     // ImVec2    ButtonTextAlign
    ImGuiStyleVar_SelectableTextAlign, // ImVec2    SelectableTextAlign
    ImGuiStyleVar_SeparatorTextBorderSize,// float  SeparatorTextBorderSize
    ImGuiStyleVar_SeparatorTextAlign,  // ImVec2    SeparatorTextAlign
    ImGuiStyleVar_SeparatorTextPadding,// ImVec2    SeparatorTextPadding
    ImGuiStyleVar_COUNT
};
```

### Flags for InvisibleButton() [extended in imgui_internal.h]

```cpp
enum ImGuiButtonFlags_
{
    ImGuiButtonFlags_None                   = 0,
    ImGuiButtonFlags_MouseButtonLeft        = 1 << 0,   // React on left mouse button (default)
    ImGuiButtonFlags_MouseButtonRight       = 1 << 1,   // React on right mouse button
    ImGuiButtonFlags_MouseButtonMiddle      = 1 << 2,   // React on center mouse button

    // [Internal]
    ImGuiButtonFlags_MouseButtonMask_       = ImGuiButtonFlags_MouseButtonLeft | ImGuiButtonFlags_MouseButtonRight | ImGuiButtonFlags_MouseButtonMiddle,
    ImGuiButtonFlags_MouseButtonDefault_    = ImGuiButtonFlags_MouseButtonLeft,
};
```

### ColorEdit3() / ColorEdit4() / ColorPicker3() / ColorPicker4() / ColorButton() のフラグ。

```cpp
enum ImGuiColorEditFlags_
{
    ImGuiColorEditFlags_None            = 0,
    ImGuiColorEditFlags_NoAlpha         = 1 << 1,   //              // ColorEdit, ColorPicker, ColorButton: ignore Alpha component (will only read 3 components from the input pointer).
    ImGuiColorEditFlags_NoPicker        = 1 << 2,   //              // ColorEdit: disable picker when clicking on color square.
    ImGuiColorEditFlags_NoOptions       = 1 << 3,   //              // ColorEdit: disable toggling options menu when right-clicking on inputs/small preview.
    ImGuiColorEditFlags_NoSmallPreview  = 1 << 4,   //              // ColorEdit, ColorPicker: disable color square preview next to the inputs. (e.g. to show only the inputs)
    ImGuiColorEditFlags_NoInputs        = 1 << 5,   //              // ColorEdit, ColorPicker: disable inputs sliders/text widgets (e.g. to show only the small preview color square).
    ImGuiColorEditFlags_NoTooltip       = 1 << 6,   //              // ColorEdit, ColorPicker, ColorButton: disable tooltip when hovering the preview.
    ImGuiColorEditFlags_NoLabel         = 1 << 7,   //              // ColorEdit, ColorPicker: disable display of inline text label (the label is still forwarded to the tooltip and picker).
    ImGuiColorEditFlags_NoSidePreview   = 1 << 8,   //              // ColorPicker: disable bigger color preview on right side of the picker, use small color square preview instead.
    ImGuiColorEditFlags_NoDragDrop      = 1 << 9,   //              // ColorEdit: disable drag and drop target. ColorButton: disable drag and drop source.
    ImGuiColorEditFlags_NoBorder        = 1 << 10,  //              // ColorButton: disable border (which is enforced by default)

    // User Options (right-click on widget to change some of them).
    ImGuiColorEditFlags_AlphaBar        = 1 << 16,  //              // ColorEdit, ColorPicker: show vertical alpha bar/gradient in picker.
    ImGuiColorEditFlags_AlphaPreview    = 1 << 17,  //              // ColorEdit, ColorPicker, ColorButton: display preview as a transparent color over a checkerboard, instead of opaque.
    ImGuiColorEditFlags_AlphaPreviewHalf= 1 << 18,  //              // ColorEdit, ColorPicker, ColorButton: display half opaque / half checkerboard, instead of opaque.
    ImGuiColorEditFlags_HDR             = 1 << 19,  //              // (WIP) ColorEdit: Currently only disable 0.0f..1.0f limits in RGBA edition (note: you probably want to use ImGuiColorEditFlags_Float flag as well).
    ImGuiColorEditFlags_DisplayRGB      = 1 << 20,  // [Display]    // ColorEdit: override _display_ type among RGB/HSV/Hex. ColorPicker: select any combination using one or more of RGB/HSV/Hex.
    ImGuiColorEditFlags_DisplayHSV      = 1 << 21,  // [Display]    // "
    ImGuiColorEditFlags_DisplayHex      = 1 << 22,  // [Display]    // "
    ImGuiColorEditFlags_Uint8           = 1 << 23,  // [DataType]   // ColorEdit, ColorPicker, ColorButton: _display_ values formatted as 0..255.
    ImGuiColorEditFlags_Float           = 1 << 24,  // [DataType]   // ColorEdit, ColorPicker, ColorButton: _display_ values formatted as 0.0f..1.0f floats instead of 0..255 integers. No round-trip of value via integers.
    ImGuiColorEditFlags_PickerHueBar    = 1 << 25,  // [Picker]     // ColorPicker: bar for Hue, rectangle for Sat/Value.
    ImGuiColorEditFlags_PickerHueWheel  = 1 << 26,  // [Picker]     // ColorPicker: wheel for Hue, triangle for Sat/Value.
    ImGuiColorEditFlags_InputRGB        = 1 << 27,  // [Input]      // ColorEdit, ColorPicker: input and output data in RGB format.
    ImGuiColorEditFlags_InputHSV        = 1 << 28,  // [Input]      // ColorEdit, ColorPicker: input and output data in HSV format.

    // Defaults Options. You can set application defaults using SetColorEditOptions(). The intent is that you probably don't want to
    // override them in most of your calls. Let the user choose via the option menu and/or call SetColorEditOptions() once during startup.
    ImGuiColorEditFlags_DefaultOptions_ = ImGuiColorEditFlags_Uint8 | ImGuiColorEditFlags_DisplayRGB | ImGuiColorEditFlags_InputRGB | ImGuiColorEditFlags_PickerHueBar,

    // [Internal] Masks
    ImGuiColorEditFlags_DisplayMask_    = ImGuiColorEditFlags_DisplayRGB | ImGuiColorEditFlags_DisplayHSV | ImGuiColorEditFlags_DisplayHex,
    ImGuiColorEditFlags_DataTypeMask_   = ImGuiColorEditFlags_Uint8 | ImGuiColorEditFlags_Float,
    ImGuiColorEditFlags_PickerMask_     = ImGuiColorEditFlags_PickerHueWheel | ImGuiColorEditFlags_PickerHueBar,
    ImGuiColorEditFlags_InputMask_      = ImGuiColorEditFlags_InputRGB | ImGuiColorEditFlags_InputHSV,

    // Obsolete names
    //ImGuiColorEditFlags_RGB = ImGuiColorEditFlags_DisplayRGB, ImGuiColorEditFlags_HSV = ImGuiColorEditFlags_DisplayHSV, ImGuiColorEditFlags_HEX = ImGuiColorEditFlags_DisplayHex  // [renamed in 1.69]
};
```

### DragFloat()、DragInt()、SliderFloat()、SliderInt() などのフラグ。

DragXXX()とSliderXXX()関数の機能は同じであり、入れ替えが簡単になるため、同じフラグセットを使用しています。
(これらはアイテムごとのフラグです。ImGuiIOには共有フラグがある： io.ConfigDragClickToInputText)

```cpp
enum ImGuiSliderFlags_
{
    ImGuiSliderFlags_None                   = 0,
    ImGuiSliderFlags_AlwaysClamp            = 1 << 4,
    ImGuiSliderFlags_Logarithmic            = 1 << 5,
    ImGuiSliderFlags_NoRoundToFormat        = 1 << 6,
    ImGuiSliderFlags_NoInput                = 1 << 7,
    ImGuiSliderFlags_InvalidMask_           = 0x7000000F,

    // Obsolete names
    //ImGuiSliderFlags_ClampOnInput = ImGuiSliderFlags_AlwaysClamp, // [renamed in 1.79]
};
```

|名前|説明|
|---|---|
|ImGuiSliderFlags_None            | |
|ImGuiSliderFlags_AlwaysClamp     | CTRL+クリックで手動入力された場合、値を最小/最大境界にクランプする。デフォルトでは、CTRL+クリックで境界を越えることができます。|
|ImGuiSliderFlags_Logarithmic     | ウィジェットを対数にします（それ以外は線形）。桁数の少ないフォーマット文字列を使用する場合、ImGuiSliderFlags_NoRoundToFormat の使用を検討してください。|
|ImGuiSliderFlags_NoRoundToFormat | 表示フォーマット文字列の精度に合うように、基礎となる値の丸めを無効にする（例えば、%.3fの値はその3桁に丸められる）。
|ImGuiSliderFlags_NoInput         | ウィジェットに直接テキストを入力できるように、CTRL+クリックまたはEnterキーを無効にする。
|ImGuiSliderFlags_InvalidMask_    | (内部) これらのビットを使用することは、以前のAPIからこのenumにミスキャストされた'float power'引数である可能性があるとして扱います。|


### マウスボタンの識別

これらの値は安定性が保証されており、私たちは頻繁に0/1を直接使用する。便宜上、名前付き列挙型を用意した。

```cpp
enum ImGuiMouseButton_
{
    ImGuiMouseButton_Left = 0,
    ImGuiMouseButton_Right = 1,
    ImGuiMouseButton_Middle = 2,
    ImGuiMouseButton_COUNT = 5
};
```

### GetMouseCursor() の列挙

ユーザ・コードは、SetMouseCursor()を呼び出すことによって、指定されたカーソルを表示するようにバックエンドに要求することができます。

```cpp
enum ImGuiMouseCursor_
{
    ImGuiMouseCursor_None = -1,
    ImGuiMouseCursor_Arrow = 0,
    ImGuiMouseCursor_TextInput,         // When hovering over InputText, etc.
    ImGuiMouseCursor_ResizeAll,         // (Unused by Dear ImGui functions)
    ImGuiMouseCursor_ResizeNS,          // When hovering over a horizontal border
    ImGuiMouseCursor_ResizeEW,          // When hovering over a vertical border or a column
    ImGuiMouseCursor_ResizeNESW,        // When hovering over the bottom-left corner of a window
    ImGuiMouseCursor_ResizeNWSE,        // When hovering over the bottom-right corner of a window
    ImGuiMouseCursor_Hand,              // (Unused by Dear ImGui functions. Use for e.g. hyperlinks)
    ImGuiMouseCursor_NotAllowed,        // When hovering something with disallowed interaction. Usually a crossed circle.
    ImGuiMouseCursor_COUNT
};
```

|名前|説明|
|---|---|
|ImGuiMouseCursor_None = -1   ||
|ImGuiMouseCursor_Arrow = 0   ||
|ImGuiMouseCursor_TextInput   | InputTextなどにカーソルを合わせたとき。|
|ImGuiMouseCursor_ResizeAll   | (Dear ImGuiの関数で未使用)。|
|ImGuiMouseCursor_ResizeNS    | 水平ボーダー上にカーソルを置くと|
|ImGuiMouseCursor_ResizeEW    | 垂直ボーダーまたは列の上にカーソルを置いた場合|
|ImGuiMouseCursor_ResizeNESW  | ウィンドウの左下にカーソルを置いた場合|
|ImGuiMouseCursor_ResizeNWSE  | ウィンドウの右下隅にカーソルを置いた場合|
|ImGuiMouseCursor_Hand        | (Dear ImGuiの関数では未使用。ハイパーリンクなどに使用)|
|ImGuiMouseCursor_NotAllowed  | 相互作用が許可されていないものをホバリングするとき。通常は十字の円。|
|ImGuiMouseCursor_COUNT       ||

### AddMouseSourceEvent() のための列挙

マウス入力データの実際のソース。
歴史的に、ポインタ・データを示すために "Mouse" という用語をあらゆる場所で使用してきました、 例：MousePos、IsMousePressed()、io.AddMousePosEvent()
しかし、その "マウス "データは異なるソースから来る可能性があり、アプリケーションにとって知っておくと便利な場合がある。
io.AddMouseSourceEvent()を使えば、ポインタの種類を変更することができます。

```cpp
enum ImGuiMouseSource : int
{
    ImGuiMouseSource_Mouse = 0,
    ImGuiMouseSource_TouchScreen,
    ImGuiMouseSource_Pen,
    ImGuiMouseSource_COUNT
};
```

|名前|説明|
|---|---|
|ImGuiMouseSource_Mouse       | 入力は実際のマウスから。|
|ImGuiMouseSource_TouchScreen | 入力はタッチスクリーンから行われる（初回プレス前のホバリングがない、初回プレスの照準精度が低い、2軸ホイール操作が可能）。|
|ImGuiMouseSource_Pen         | 入力は筆圧／磁気ペンから（しばしば高サンプリングレートと組み合わせて使用される）。|
|ImGuiMouseSource_COUNT||

### ImGui::SetWindowXXX()、SetNextWindowXXX()、SetNextItemXXX()関数の列挙型

条件を表します。
重要: 通常の列挙型として扱う！二項演算子を使って複数の値を組み合わせてはいけません！上記の関数はすべて ImGuiCond_Always のショートカットとして 0 を扱います。

```cpp
enum ImGuiCond_
{
    ImGuiCond_None          = 0,
    ImGuiCond_Always        = 1 << 0,
    ImGuiCond_Once          = 1 << 1,
    ImGuiCond_FirstUseEver  = 1 << 2,
    ImGuiCond_Appearing     = 1 << 3,
};
```

| 名前                   | 説明                                                                                               |
|------------------------|----------------------------------------------------------------------------------------------------|
| ImGuiCond_None         | 条件なし（常に変数をセット）、_Alwaysと同じ |
| ImGuiCond_Always       | 条件なし（常に変数をセット）、_Noneと同じ |
| ImGuiCond_Once         | ランタイムセッションごとに1回変数を設定する（最初の呼び出しだけが成功する） |
| ImGuiCond_FirstUseEver | オブジェクト/ウィンドウに永続的に保存されたデータがない場合（.iniファイルにエントリがない場合）、変数を設定します。 |
| ImGuiCond_Appearing    | オブジェクト/ウィンドウが非表示/非アクティブになった後（または初めて）表示される場合に変数を設定する。 |

## ヘルパー: メモリ割り当てマクロ、 `ImVector<>`

`IM_MALLOC()`, `IM_FREE()`, `IM_NEW()`, `IM_PLACEMENT_NEW()`, `IM_DELETE()`

C++のコンストラクタは、「`new(ptr)` `Type()`」という構文で、割り当てられたメモリ上で呼び出される。
カスタム配置 `new()` をカスタムパラメータで定義することで、`<new>` をインクルードすることを回避することができる。

```cpp
struct ImNewWrapper {};
inline void* operator new(size_t, ImNewWrapper, void* ptr) { return ptr; }
inline void  operator delete(void*, ImNewWrapper, void*)   {} // This is only required so we can use the symmetrical new()
#define IM_ALLOC(_SIZE)                     ImGui::MemAlloc(_SIZE)
#define IM_FREE(_PTR)                       ImGui::MemFree(_PTR)
#define IM_PLACEMENT_NEW(_PTR)              new(ImNewWrapper(), _PTR)
#define IM_NEW(_TYPE)                       new(ImNewWrapper(), ImGui::MemAlloc(sizeof(_TYPE))) _TYPE
template<typename T> void IM_DELETE(T* p)   { if (p) { p->~T(); ImGui::MemFree(p); } }
```

### `ImVector<>`

軽量な`std::vector<>`のようなクラスは、依存関係を引きずらないようにする（また、デバッグを有効にしたSTLの実装の中には、とんでもなく遅いものもある。）

- 通常、これを気にしたり使ったりする必要はない。しかし、imgui.hで利用できるようにする必要がある。なぜなら、いくつかの公開構造体がこれに依存しているからだ。
- ここではstdのような命名規則を使っているが、このコードベースでは少し珍しい。
- 重要：clear()はメモリを解放し、resize(0)は割り当てられたバッファを保持する。resize(0)を多用するのは、フレーム間で割り当てられたバッファを意図的にリサイクルし、コストを償却するためです。
- 重要：私たちの実装では、C++のコンストラクタ/デストラクタを呼び出しません！これは意図的なものですが、特に注意してください、
  このクラスをstd::vectorの代わりとして使わないでください！dear imguiが使う構造体の多くは、zero-memsetで安全に初期化できます。

```cpp
IM_MSVC_RUNTIME_CHECKS_OFF
template<typename T>
struct ImVector
{
    int                 Size;
    int                 Capacity;
    T*                  Data;

    // Provide standard typedefs but we don't use them ourselves.
    typedef T                   value_type;
    typedef value_type*         iterator;
    typedef const value_type*   const_iterator;

    // Constructors, destructor
    inline ImVector()                                       { Size = Capacity = 0; Data = NULL; }
    inline ImVector(const ImVector<T>& src)                 { Size = Capacity = 0; Data = NULL; operator=(src); }
    inline ImVector<T>& operator=(const ImVector<T>& src)   { clear(); resize(src.Size); if (src.Data) memcpy(Data, src.Data, (size_t)Size * sizeof(T)); return *this; }
    inline ~ImVector()                                      { if (Data) IM_FREE(Data); } // Important: does not destruct anything

    inline void         clear()                             { if (Data) { Size = Capacity = 0; IM_FREE(Data); Data = NULL; } }  // Important: does not destruct anything
    inline void         clear_delete()                      { for (int n = 0; n < Size; n++) IM_DELETE(Data[n]); clear(); }     // Important: never called automatically! always explicit.
    inline void         clear_destruct()                    { for (int n = 0; n < Size; n++) Data[n].~T(); clear(); }           // Important: never called automatically! always explicit.

    inline bool         empty() const                       { return Size == 0; }
    inline int          size() const                        { return Size; }
    inline int          size_in_bytes() const               { return Size * (int)sizeof(T); }
    inline int          max_size() const                    { return 0x7FFFFFFF / (int)sizeof(T); }
    inline int          capacity() const                    { return Capacity; }
    inline T&           operator[](int i)                   { IM_ASSERT(i >= 0 && i < Size); return Data[i]; }
    inline const T&     operator[](int i) const             { IM_ASSERT(i >= 0 && i < Size); return Data[i]; }

    inline T*           begin()                             { return Data; }
    inline const T*     begin() const                       { return Data; }
    inline T*           end()                               { return Data + Size; }
    inline const T*     end() const                         { return Data + Size; }
    inline T&           front()                             { IM_ASSERT(Size > 0); return Data[0]; }
    inline const T&     front() const                       { IM_ASSERT(Size > 0); return Data[0]; }
    inline T&           back()                              { IM_ASSERT(Size > 0); return Data[Size - 1]; }
    inline const T&     back() const                        { IM_ASSERT(Size > 0); return Data[Size - 1]; }
    inline void         swap(ImVector<T>& rhs)              { int rhs_size = rhs.Size; rhs.Size = Size; Size = rhs_size; int rhs_cap = rhs.Capacity; rhs.Capacity = Capacity; Capacity = rhs_cap; T* rhs_data = rhs.Data; rhs.Data = Data; Data = rhs_data; }

    inline int          _grow_capacity(int sz) const        { int new_capacity = Capacity ? (Capacity + Capacity / 2) : 8; return new_capacity > sz ? new_capacity : sz; }
    inline void         resize(int new_size)                { if (new_size > Capacity) reserve(_grow_capacity(new_size)); Size = new_size; }
    inline void         resize(int new_size, const T& v)    { if (new_size > Capacity) reserve(_grow_capacity(new_size)); if (new_size > Size) for (int n = Size; n < new_size; n++) memcpy(&Data[n], &v, sizeof(v)); Size = new_size; }
    inline void         shrink(int new_size)                { IM_ASSERT(new_size <= Size); Size = new_size; } // Resize a vector to a smaller size, guaranteed not to cause a reallocation
    inline void         reserve(int new_capacity)           { if (new_capacity <= Capacity) return; T* new_data = (T*)IM_ALLOC((size_t)new_capacity * sizeof(T)); if (Data) { memcpy(new_data, Data, (size_t)Size * sizeof(T)); IM_FREE(Data); } Data = new_data; Capacity = new_capacity; }
    inline void         reserve_discard(int new_capacity)   { if (new_capacity <= Capacity) return; if (Data) IM_FREE(Data); Data = (T*)IM_ALLOC((size_t)new_capacity * sizeof(T)); Capacity = new_capacity; }

    // NB: It is illegal to call push_back/push_front/insert with a reference pointing inside the ImVector data itself! e.g. v.push_back(v[10]) is forbidden.
    inline void         push_back(const T& v)               { if (Size == Capacity) reserve(_grow_capacity(Size + 1)); memcpy(&Data[Size], &v, sizeof(v)); Size++; }
    inline void         pop_back()                          { IM_ASSERT(Size > 0); Size--; }
    inline void         push_front(const T& v)              { if (Size == 0) push_back(v); else insert(Data, v); }
    inline T*           erase(const T* it)                  { IM_ASSERT(it >= Data && it < Data + Size); const ptrdiff_t off = it - Data; memmove(Data + off, Data + off + 1, ((size_t)Size - (size_t)off - 1) * sizeof(T)); Size--; return Data + off; }
    inline T*           erase(const T* it, const T* it_last){ IM_ASSERT(it >= Data && it < Data + Size && it_last >= it && it_last <= Data + Size); const ptrdiff_t count = it_last - it; const ptrdiff_t off = it - Data; memmove(Data + off, Data + off + count, ((size_t)Size - (size_t)off - (size_t)count) * sizeof(T)); Size -= (int)count; return Data + off; }
    inline T*           erase_unsorted(const T* it)         { IM_ASSERT(it >= Data && it < Data + Size);  const ptrdiff_t off = it - Data; if (it < Data + Size - 1) memcpy(Data + off, Data + Size - 1, sizeof(T)); Size--; return Data + off; }
    inline T*           insert(const T* it, const T& v)     { IM_ASSERT(it >= Data && it <= Data + Size); const ptrdiff_t off = it - Data; if (Size == Capacity) reserve(_grow_capacity(Size + 1)); if (off < (int)Size) memmove(Data + off + 1, Data + off, ((size_t)Size - (size_t)off) * sizeof(T)); memcpy(&Data[off], &v, sizeof(v)); Size++; return Data + off; }
    inline bool         contains(const T& v) const          { const T* data = Data;  const T* data_end = Data + Size; while (data < data_end) if (*data++ == v) return true; return false; }
    inline T*           find(const T& v)                    { T* data = Data;  const T* data_end = Data + Size; while (data < data_end) if (*data == v) break; else ++data; return data; }
    inline const T*     find(const T& v) const              { const T* data = Data;  const T* data_end = Data + Size; while (data < data_end) if (*data == v) break; else ++data; return data; }
    inline bool         find_erase(const T& v)              { const T* it = find(v); if (it < Data + Size) { erase(it); return true; } return false; }
    inline bool         find_erase_unsorted(const T& v)     { const T* it = find(v); if (it < Data + Size) { erase_unsorted(it); return true; } return false; }
    inline int          index_from_ptr(const T* it) const   { IM_ASSERT(it >= Data && it < Data + Size); const ptrdiff_t off = it - Data; return (int)off; }
};
IM_MSVC_RUNTIME_CHECKS_RESTORE
```

## ImGuiStyle

初期化時と `NewFrame()` の前に `ImGui::GetStyle()` のメインインスタンスを変更することができます。

フレーム中、メインスタイルの値を変更するには`ImGui::PushStyleVar(ImGuiStyleVar_XXXX)`/`PopStyleVar()`を、色を変更するには`ImGui::PushStyleColor(ImGuiCol_XXXX)`/`PopStyleColor()`を使用します。

```cpp
struct ImGuiStyle
{
    float       Alpha;
    float       DisabledAlpha;
    ImVec2      WindowPadding;
    float       WindowRounding;
    float       WindowBorderSize;
    ImVec2      WindowMinSize;
    ImVec2      WindowTitleAlign;
    ImGuiDir    WindowMenuButtonPosition;
    float       ChildRounding;
    float       ChildBorderSize;
    float       PopupRounding;
    float       PopupBorderSize;            
    ImVec2      FramePadding;               
    float       FrameRounding;              
    float       FrameBorderSize;            
    ImVec2      ItemSpacing;                
    ImVec2      ItemInnerSpacing;           
    ImVec2      CellPadding;                
    ImVec2      TouchExtraPadding;          
    float       IndentSpacing;              
    float       ColumnsMinSpacing;          
    float       ScrollbarSize;              
    float       ScrollbarRounding;          
    float       GrabMinSize;                
    float       GrabRounding;               
    float       LogSliderDeadzone;          
    float       TabRounding;                
    float       TabBorderSize;              
    float       TabMinWidthForCloseButton;  
    ImGuiDir    ColorButtonPosition;        
    ImVec2      ButtonTextAlign;            
    ImVec2      SelectableTextAlign;        
    float       SeparatorTextBorderSize;    
    ImVec2      SeparatorTextAlign;         
    ImVec2      SeparatorTextPadding;       
    ImVec2      DisplayWindowPadding;       
    ImVec2      DisplaySafeAreaPadding;     
    float       MouseCursorScale;           
    bool        AntiAliasedLines;           
    bool        AntiAliasedLinesUseTex;     
    bool        AntiAliasedFill;            
    float       CurveTessellationTol;       
    float       CircleTessellationMaxError; 
    ImVec4      Colors[ImGuiCol_COUNT];
```

| 名前                       | 値       | 説明                                                                                                                                                   |
|----------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| Alpha                      | float    | グローバルalphaはDear ImGuiのすべてに適用されます。                                                                                                                    |
| DisabledAlpha              | float    | `BeginDisabled()`によって適用される追加のアルファ乗数。現在のアルファ値に乗算する。                                                                                          |
| WindowPadding              | ImVec2   | ウィンドウ内のパディング。                                                                                                                                         |
| WindowRounding             | float    | ウィンドウの角を丸める半径。`0.0f`に設定するとウィンドウが長方形になる。大きな値は様々なアーチファクトにつながる傾向があり、推奨されません。                                                              |
| WindowBorderSize           | float    | ウィンドウの周りのボーダーの太さ。通常は `0.0f` または `1.0f` に設定する。 (その他の値は十分にテストされておらず、よりCPU/GPUコストがかかる。).                                                        |
| WindowMinSize              | ImVec2   | 最小ウィンドウサイズ。これはグローバルな設定です。個々のウィンドウを制限したい場合は `SetNextWindowSizeConstraints()` を使用してください。                                                      |
| WindowTitleAlign           | ImVec2   | タイトルバーテキストのアラインメント。デフォルトは `(0.0f, 0.5f)` で、左揃え、縦中央揃え。                                                                                            |
| WindowMenuButtonPosition   | ImGuiDir | タイトルバーの折りたたみ/ドッキングボタンのサイド（なし/左/右）。デフォルトは `ImGuiDir_Left` です。                                                                                        |
| ChildRounding              | float    | 子ウィンドウの角を丸める半径。長方形のウィンドウにするには `0.0f` を設定する。                                                                                                  |
| ChildBorderSize            | float    | 子ウィンドウの周りのボーダーの太さ。 通常は`0.0f`または`1.0f`に設定する。 (その他の値は十分にテストされておらず、よりCPU/GPUコストがかかる。).                                                         |
| PopupRounding              | float    | ポップアップウィンドウの角を丸める半径。 (ツールチップウィンドウは`WindowRounding`を使用することに注意してください。)                                                                           |
| PopupBorderSize            | float    | ポップアップ/ツールチップウィンドウの周りのボーダーの太さ。 通常は`0.0f`または`1.0f`に設定する。 (その他の値は十分にテストされておらず、よりCPU/GPUコストがかかる。).                                              |
| FramePadding               | ImVec2   | 枠で囲まれた矩形内のパディング (ほとんどのウィジェットで使用される).                                                                                                            |
| FrameRounding              | float    | フレームの角を丸める半径。`0.0f`に設定すると長方形のフレームになります。 (ほとんどのウィジェットで使用される).                                                                                |
| FrameBorderSize            | float    | 枠の太さ。通常は0.0fまたは1.0fに設定する。 (その他の値は十分にテストされておらず、よりCPU/GPUコストがかかる。).                                                                            |
| ItemSpacing                | ImVec2   | ウィジェット/行の水平方向と垂直方向の間隔.                                                                                                                      |
| ItemInnerSpacing           | ImVec2   | 構成されたウィジェットの要素間の水平方向と垂直方向の間隔 (例：スライダーとそのラベル).                                                                                          |
| CellPadding                | ImVec2   | 表セル内のパディング                                                                                                                                           |
| TouchExtraPadding          | ImVec2   | タッチ位置の精度が十分でないタッチ・ベース・システムのために、リアクティブ・バウンディング・ボックスを拡張する。 残念ながら、ウィジェットはソートされないので、オーバーラップの優先順位は常に最初のウィジェットに与えられます。 だから、あまり大きくしないでほしい！ |
| IndentSpacing              | float    | ツリーノードに入るときなどの水平インデント。 一般的に `== (FontSize + FramePadding.x*2)`.                                                                                  |
| ColumnsMinSpacing          | float    | 2本の柱の間の水平方向の最小間隔。 できれば `> (FramePadding.x + 1)`.                                                                                            |
| ScrollbarSize              | float    | 垂直スクロールバーの幅、水平スクロールバーの高さ。                                                                                                                        |
| ScrollbarRounding          | float    | スクロールバーのグラブコーナーの半径。                                                                                                                                  |
| GrabMinSize                | float    | スライダー/スクロールバーのグラブボックスの最小幅/高さ。                                                                                                                      |
| GrabRounding               | float    | グラブの角を丸める半径。`0.0f`に設定すると長方形のスライダーグラブになります。                                                                                                    |
| LogSliderDeadzone          | float    | ゼロを横切る対数スライダーのゼロ付近のデッドゾーンのピクセルサイズ。                                                                                                               |
| TabRounding                | float    | タブの上角の半径。`0.0f`に設定すると長方形のタブになります。                                                                                                             |
| TabBorderSize              | float    | タブの周りのボーダーの太さ。                                                                                                                                       |
| TabMinWidthForCloseButton  | float    | 選択されていないタブにマウスカーソルを置いたときに、閉じるボタンが表示される最小幅。 `0.0f`に設定するとホバーリング時に常に表示され、`FLT_MAX`に設定すると選択されていない限り閉じるボタンを表示しない。                    |
| ColorButtonPosition        | ImGuiDir | `ColorEdit4`ウィジェットのカラーボタンのサイド（左/右）。デフォルトは`ImGuiDir_Right`。                                                                                           |
| ButtonTextAlign            | ImVec2   | ボタンがテキストより大きい場合のボタンテキストの配置。デフォルトは (`0.5f, 0.5f`) (中央揃え) です。                                                                                    |
| SelectableTextAlign        | ImVec2   | 選択可能なテキストの配置。デフォルトは (`0.0f, 0.0f`) （左上揃え）。 複数の項目を同じ行に並べたい場合は、一般的に左揃えにすることが重要です。                                               |
| SeparatorTextBorderSize    | float    | `SeparatorText()`のボーダーの太さ                                                                                                                             |
| SeparatorTextAlign         | ImVec2   | セパレータ内のテキストの配置。デフォルトは (`0.0f, 0.5f`) (左寄せ、中央揃え)。                                                                                               |
| SeparatorTextPadding       | ImVec2   | セパレータの各辺からのテキストの水平オフセット＋他の軸の間隔。一般に小さい値。 `.y` は `== FramePadding.y`であることが推奨される。                                                           |
| DisplayWindowPadding       | ImVec2   | ウィンドウの位置は、表示領域またはモニター内に少なくともこの量だけ表示されるようにクランプされます。通常のウィンドウにのみ適用されます。                                                                    |
| DisplaySafeAreaPadding     | ImVec2   | スクリーンの端が見えない場合（テレビなど）、セーフエリアのパディングを大きくしてください。 通常のウィンドウだけでなく、ポップアップやツールチップにも適用されます。 注意：テレビを正しく設定してください！                                   |
| MouseCursorScale           | float    | ソフトウェアでレンダリングされたマウスカーソルのスケール（`io.MouseDrawCursor`が有効な場合）. 後で取り外すこともできる。                                                                         |
| AntiAliasedLines           | bool     | アンチエイリアス線/ボーダーを有効にする。CPU/GPUに余裕がない場合は無効にしてください。 フレームの最初にラッチされる（`ImDrawList`にコピーされる）。                                                        |
| AntiAliasedLinesUseTex     | bool     | 可能であれば、テクスチャを使用してアンチエイリアス線/ボーダーを有効にします。 バイリニアフィルタリングでレンダリングするバックエンドを必要とする（ポイント/ニアレストフィルタリングではない）。フレームの最初にラッチされる（`ImDrawList`にコピーされる）。       |
| AntiAliasedFill            | bool     | 塗りつぶされたシェイプ（丸みを帯びた長方形、円など）のエッジにアンチエイリアスをかける。 CPU/GPUに余裕がない場合は無効にしてください。フレームの最初にラッチされる（`ImDrawList`にコピーされる）。                             |
| CurveTessellationTol       | float    | 特定のセグメント数を指定せずに `PathBezierCurveTo()`を使用した場合のテセレーション許容度。 高度にテッセレーションされたカーブ（より高い品質、より多くのポリゴン）の場合は減少させ、品質を低下させる場合は増加させる。   |
| CircleTessellationMaxError | float    | `AddCircle()`/`AddCircleFilled()`を使用する場合、またはセグメント数が明示的に指定されていない角丸矩形を描画する場合に許容される最大誤差（ピクセル単位）。品質が高いがジオメトリが多い場合は減少させる。 |
| Colors[ImGuiCol_COUNT]     | ImVec4   |                                                                                                                                                        |

### ビヘイビア

ImGuiIOのコンフィギュレーション・フィールドなどとは異なり、特定の動作が必要な場合は、これらのフィールドをフレームの途中で変更することができる。

```cpp
    float             HoverStationaryDelay;
    float             HoverDelayShort;
    float             HoverDelayNormal;
    ImGuiHoveredFlags HoverFlagsForTooltipMouse;
    ImGuiHoveredFlags HoverFlagsForTooltipNav;

    IMGUI_API ImGuiStyle();
    IMGUI_API void ScaleAllSizes(float scale_factor);
};
```

| 名前                      | 説明                                                                                                                                      |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| HoverStationaryDelay      | IsItemHovered(ImGuiHoveredFlags_Stationary)のディレイ。マウスが静止しているとみなすのに必要な時間。                                        |
| HoverDelayShort           | IsItemHovered(ImGuiHoveredFlags_DelayShort)の遅延。通常、HoverStationaryDelayと共に使用される。                                      |
| HoverDelayNormal          | IsItemHovered(ImGuiHoveredFlags_DelayNormal)の遅延。" |
| HoverFlagsForTooltipMouse | マウス使用時に IsItemHovered(ImGuiHoveredFlags_ForTooltip) または BeginItemTooltip()/SetItemTooltip() を使用した場合のデフォルトのフラグ。            |
| HoverFlagsForTooltipNav   | キーボード/ゲームパッド使用時にIsItemHovered(ImGuiHoveredFlags_ForTooltip)またはBeginItemTooltip()/SetItemTooltip()を使用した場合のデフォルトフラグ。 |

## ImGuiIO

この構造体を使って、ほとんどの設定と入出力をDear ImGuiに伝えます。`ImGui::GetIO()`経由でアクセスする。一般的な使用方法については、`.cpp`ファイルの「プログラマー・ガイド」をお読みください。

内部: `IsKeyDown()`, `IsKeyPressed()` などの関数で使用するストレージ。1.87より前に`io.KeysDownDuration[]`（これはinternalとマークされていた）を使用していた場合は、`io.KeysData[key]->DownDuration`ではなく、`GetKeyData(key)->DownDuration`を使用する必要があります。

```cpp
struct ImGuiKeyData
{
    bool  Down;            
    float DownDuration;    
    float DownDurationPrev;
    float AnalogValue;     
};
```

| 名前             | 説明                                                                |
|------------------|-------------------------------------------------------------------|
| Down             | キーが押されている場合は真                                                   |
| DownDuration     | キーが押されていた時間 (`< 0.0f`：押されていない、`0.0f`：押されただけ、`> 0.0f`：保持時間) |
| DownDurationPrev | キーが押されていた最後のフレーム時間                                             |
| AnalogValue      | `0.0f..1.0f`、ゲームパッド値用                                             |

### 構成

```cpp
struct ImGuiIO
{
ImGuiConfigFlags   ConfigFlags;
ImGuiBackendFlags  BackendFlags;
ImVec2       DisplaySize;
float        DeltaTime;
float        IniSavingRate;
const char*  IniFilename;
const char*  LogFilename;
void*        UserData;
ImFontAtlas* Fonts;
float        FontGlobalScale;
bool         FontAllowUserScaling;
ImFont*      FontDefault;
ImVec2       DisplayFramebufferScale;
```

| 名前                     | デフォルト値         | 説明                                                                                                                                                                                                                             |
|--------------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ConfigFlags              | 0               | `ImGuiConfigFlags_`列挙を参照のこと。ユーザー/アプリケーションによって設定される。ゲームパッド/キーボードナビゲーションオプションなど。                                                                                                                                 |
| BackendFlags             | 0               | `ImGuiBackendFlags_` 列挙を参照。バックエンド (imgui_impl_xxx ファイルまたはカスタムバックエンド) がサポートする機能を伝えるために設定します。                                                                                         |
| DisplaySize              | `<unset>`       | メインディスプレイのサイズ（ピクセル単位）（一般的には== `GetMainViewport()->Size`）。フレームごとに変わる可能性があります。                                                                                                                                   |
| DeltaTime                | 1.0f/60.0f      | 最後のフレームからの経過時間（秒）。フレームごとに変化する可能性がある。                                                                                                                                                               |
| IniSavingRate            | 5.0f            | ポジション/サイズを.iniファイルに保存するまでの最短時間（秒）。                                                                                                                                                            |
| IniFilename              | "imgui.ini"     | .iniファイルへのパス（重要：デフォルトの "imgui.ini "は現在の作業ディレクトリからの相対パスです！）。 自動 .ini ロード/保存を無効にする場合、または手動で LoadIniSettingsXXX() / SaveIniSettingsXXX() 関数を呼び出す場合は、NULL を設定します。 |
| LogFilename              | "imgui_log.txt" | .logファイルへのパス(ファイルを指定しない場合のImGui::LogToFileのデフォルトパラメータ)。                                                                                                                                             |
| UserData                 | NULL            | 自分のデータを保存する。                                                                                                                                                                                                             |
| Fonts                    | `<auto>`        | フォントアトラス：1つまたは複数のフォントを1つのテクスチャにロード、ラスタライズ、パックします。                                                                                                                                                    |
| FontGlobalScale          | 1.0f            | すべてのフォントをグローバルに拡大縮小                                                                                                                                                                                                           |
| FontAllowUserScaling     | false           | CTRL+ホイールで個々のウィンドウのテキストを拡大縮小できるようにした。                                                                                                                                                                    |
| FontDefault              | NULL            | `NewFrame()`で使用するフォント。NULL を使用すると `Fonts->Fonts[0]` を使用する。                                                                                                                                                                 |
| DisplayFramebufferScale; | (1, 1)          | Retinaディスプレイや、ウィンドウ座標がフレームバッファ座標と異なるその他の状況用。これは一般的に`ImDrawData::FramebufferScale`で終わる。                                                              |

#### その他のオプション

```cpp
bool  MouseDrawCursor;
bool  ConfigMacOSXBehaviors;
bool  ConfigInputTrickleEventQueue;
bool  ConfigInputTextCursorBlink;
bool  ConfigInputTextEnterKeepActive;
bool  ConfigDragClickToInputText;
bool  ConfigWindowsResizeFromEdges;
bool  ConfigWindowsMoveFromTitleBarOnly;
float ConfigMemoryCompactTimer;
```

| 名前                              | デフォルト値              | 説明                                                                                                                                                                                                                                                                                                |
|-----------------------------------|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MouseDrawCursor                   | false                | ImGuiにマウスカーソルの描画を依頼する（マウスカーソルのないプラットフォームの場合）。io.ConfigXXX'はバックエンドの実装で頻繁に使用されるため、簡単にリネームできない。                                                                                              |
| ConfigMacOSXBehaviors             | `defined(__APPLE__)` | OS Xスタイル：テキスト編集のカーソル移動はCtrlの代わりにAltを使用、ショートカットはCtrlの代わりにCmd/Superを使用、行/テキストの開始と終了はHome/Endの代わりにCmd+矢印を使用、ダブルクリックはテキスト全体を選択する代わりに単語単位で選択、リスト内の複数選択はCtrlの代わりにCmd/Superを使用。 |
| ConfigInputTrickleEventQueue      | true                 | 入力キューのトリッキングを有効にする：同じフレーム中に送信されたいくつかのタイプのイベント（例：ボタンダウン＋アップ）は、複数のフレームに分散され、低フレームレートでのインタラクションを改善します。                                                                                                         |
| ConfigInputTextCursorBlink        | true                 | カーソルの点滅を有効にする（一部のユーザーは邪魔になると考えているため、オプション）。                                                                                                                                                                                                                      |
| ConfigInputTextEnterKeepActive    | false                | (BETA) Enterを押すと、項目がアクティブに保たれ、内容が選択されます（単一行のみ）。                                                                                                                                                                                                                 |
| ConfigDragClickToInputText        | false                | (BETA) DragXXXウィジェットを、マウスをクリック・リリースするだけで（移動せずに）テキスト入力にできるようにする。キーボードのないデバイスでは望ましくありません。                                                                                                                                              |
| ConfigWindowsResizeFromEdges      | true                 | ウィンドウの端と左下隅からのリサイズを有効にする。マウスカーソルのフィードバックが必要なので、(io.BackendFlags & ImGuiBackendFlags_HasMouseCursors)が必要です。(これは以前はウィンドウごとのImGuiWindowFlags_ResizeFromAnySideフラグでした)                                      |
| ConfigWindowsMoveFromTitleBarOnly | false                | タイトルバーをクリックしたときのみウィンドウを移動できるようにする。タイトルバーのないウィンドウには適用されません。                                                                                                                                                                               |
| ConfigMemoryCompactTimer          | 60.0f                | 未使用時にトランジェントウィンドウ/テーブルメモリバッファを解放するタイマー(秒)。無効にするには-`1.0f`に設定する。                                                                                                                                                                                            |


#### 入力ビヘイビア

その他の変数（UIコード内で調整されることが期待されるもの）は、ImGuiStyleで公開される。

```cpp
float MouseDoubleClickTime;
float MouseDoubleClickMaxDist;
float MouseDragThreshold;
float KeyRepeatDelay;
float KeyRepeatRate;
```

| 名前                    | デフォルト値 | 説明                                                                                                       |
|-------------------------|---------|------------------------------------------------------------------------------------------------------------|
| MouseDoubleClickTime    | 0.30f   | ダブルクリックにかかる時間（秒）。                                                                       |
| MouseDoubleClickMaxDist | 6.0f    | ダブルクリックを有効にするために滞在する距離のしきい値をピクセル単位で指定する。                                       |
| MouseDragThreshold      | 6.0f    | ドラッグしていると考える前の距離のしきい値。                                                     |
| KeyRepeatDelay          | 0.275f  | キー／ボタンを押し続けているとき、リピートを開始するまでの時間を秒単位で表示（リピートモードなどのボタンの場合）。 |
| KeyRepeatRate           | 0.050f  | キー/ボタンを押し続けているとき、そのキー/ボタンが繰り返される速度（秒単位）。                                           |


### デバッグ・オプション

Begin/EndおよびBeginChild/EndChildの正しい動作をテストするツール。

現在、Begin()/End()およびBeginChild()/EndChild()は、BeginXXX()の戻り値に関係なく、常に同時に呼び出される必要がある。
これは他のBeginXXX関数と矛盾しており、多くのユーザーに混乱をもたらす。
いずれAPIを更新する予定です。その間、私たちはユーザー・コードの動作をチェックしやすくするためのツールを提供します。

```cpp
bool ConfigDebugBeginReturnValueOnce;
bool ConfigDebugBeginReturnValueLoop;
```

| 名前                            | デフォルト値 | 説明                                                                                                                                                                                                                                                               |
|---------------------------------|---------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ConfigDebugBeginReturnValueOnce | false   | Begin()/BeginChild()を初めて呼び出すと、falseが返されます。ウィンドウを見逃したくない場合は、アプリケーションの起動時に設定する必要があります。                                                                                                                            |
| ConfigDebugBeginReturnValueLoop | false   | Begin()/BeginChild()の呼び出しの中にはfalseを返すものがあります。ウィンドウの深さを循環し、繰り返します。おすすめの使い方：メインループに "io.ConfigDebugBeginReturnValue = io.KeyShift "を追加し、時々SHIFTを押す。実行中はウィンドウがちらつくはずだ。 |


io.AddFocusEvent(false)の処理を無効にするオプション。フォーカスの消失が入力データのクリアにつながる場合、デバッガとのインタラクションを容易にするかもしれません。
バックエンドは、フォーカスを失うという他の副作用を持つかもしれない。, そのため、副作用を減らすことはできるが、すべてを取り除く必要はない。
追加のフィルタとして、例えばWin32のIsDebuggerPresent()を使用することを検討してください（Unix互換バージョンについてはimgui_test_engine/imgui_te_utils.cppのImOsIsDebuggerPresent()を参照してください）。

```cpp
bool ConfigDebugIgnoreFocusLoss;
```

| 名前                       | デフォルト値 | 説明                                                                                              |
|----------------------------|---------|---------------------------------------------------------------------------------------------------|
| ConfigDebugIgnoreFocusLoss | false   | io.AddFocusEvent(false)を無視し、入力処理でio.ClearInputKeys()を呼び出さない。 |


#### .iniデータの監査オプション

```cpp
bool ConfigDebugIniSettings;
```

| 名前                   | デフォルト値 | 説明                                                                                           |
|------------------------|---------|------------------------------------------------------------------------------------------------|
| ConfigDebugIniSettings | false   | .iniデータを追加コメント付きで保存（特にドッキングに便利ですが、保存が遅くなります。） |

### Platform Functions

imgui_impl_xxxx のバックエンドファイルが、あなたのためにそれらをセットアップしてくれます。

オプション：プラットフォーム/レンダラバックエンド名 (情報提供のみ。アバウトウィンドウに表示されます) + バックエンド/ラッパーが独自のものを保存するためのユーザーデータ。

```cpp
const char* BackendPlatformName;
const char* BackendRendererName;
void*       BackendPlatformUserData;
void*       BackendRendererUserData;
void*       BackendLanguageUserData;
```

| 名前                    | デフォルト値 | 説明                                               |
|-------------------------|---------|----------------------------------------------------|
| BackendPlatformName     | NULL    |                                                    |
| BackendRendererName     | NULL    |                                                    |
| BackendPlatformUserData | NULL    | プラットフォーム・バックエンドのユーザーデータ |
| BackendRendererUserData | NULL    | レンダラバックエンド用ユーザーデータ |
| BackendLanguageUserData | NULL    | 非C++プログラミング言語バックエンドのユーザーデータ |

オプション:OSのクリップボードにアクセスする

Windows ではデフォルトで Win32 ネイティブクリップボードを使用し、そうでない場合はプライベートクリップボードを使用します。他のアーキテクチャでOSのクリップボードにアクセスするようにオーバーライドする。

```cpp
const char* (*GetClipboardTextFn)(void* user_data);
void        (*SetClipboardTextFn)(void* user_data, const char* text);
void*       ClipboardUserData;
```

オプション: テキスト入力位置のカーソルの画面位置をOSのInput Method Editorに通知する（例：Windowsで日本語/中国語IMEを使用する場合）。
(デフォルトはWindowsのネイティブimm32 apiを使用)

```cpp
    void        (*SetPlatformImeDataFn)(ImGuiViewport* viewport, ImGuiPlatformImeData* data);
#ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
    void*       ImeWindowHandle; // = NULL // [Obsolete] Set ImGuiViewport::PlatformHandleRaw instead. Set this to your HWND to get automatic IME cursor positioning.
#else
    void*       _UnusedPadding;            // Unused field to keep data structure the same size.
#endif
```

オプション：プラットフォームロケール

```cpp
ImWchar PlatformLocaleDecimalPoint;
```

| 名前                       | デフォルト値 | 説明                                                                                                                                               |
|----------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| PlatformLocaleDecimalPoint | '.'     | (実験的) 小数点の設定 例：'.'や','はドイツ語など一部の言語に有効です。, 一般的には `*localeconv()->decimal_point` から引っ張ってくる。 |


### 入力 - NewFrame() を呼び出す前に呼び出します。

入力関数

```cpp
    IMGUI_API void  AddKeyEvent(ImGuiKey key, bool down);
    IMGUI_API void  AddKeyAnalogEvent(ImGuiKey key, bool down, float v);
    IMGUI_API void  AddMousePosEvent(float x, float y);
    IMGUI_API void  AddMouseButtonEvent(int button, bool down);
    IMGUI_API void  AddMouseWheelEvent(float wheel_x, float wheel_y);
    IMGUI_API void  AddMouseSourceEvent(ImGuiMouseSource source);
    IMGUI_API void  AddFocusEvent(bool focused);
    IMGUI_API void  AddInputCharacter(unsigned int c);
    IMGUI_API void  AddInputCharacterUTF16(ImWchar16 c);
    IMGUI_API void  AddInputCharactersUTF8(const char* str);
    IMGUI_API void  SetKeyEventNativeData(ImGuiKey key, int native_keycode, int native_scancode, int native_legacy_index = -1);
    IMGUI_API void  SetAppAcceptingEvents(bool accepting_events);
    IMGUI_API void  ClearEventsQueue();
    IMGUI_API void  ClearInputKeys();
#ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
    IMGUI_API void  ClearInputCharacters(); // [Obsolete] Clear the current frame text input buffer. Now included within ClearInputKeys().
#endif
```

|名前|説明|
|---|---|
|AddKeyEvent()            | 新しいキーのダウン/アップイベントをキューに入れる。キーは "翻訳 "されたものでなければならない（一般的に、ImGuiKey_Aはエンドユーザーが'A'文字を発するときに使うキーと一致する）。|
|AddKeyAnalogEvent()      | アナログ値（例えばImGuiKey_Gamepad_値）用の新しいキーダウン・アップイベントをキューに入れる。デッドゾーンはバックエンドが処理する。|
|AddMousePosEvent()       | マウス位置の更新をキューに入れる。FLT_MAX,-FLT_MAXを使用して、マウスがないことを示す（例えば、アプリがフォーカスされておらず、ホバーされていない）。|
|AddMouseButtonEvent()    | マウスボタンの変更をキューに入れる|
|AddMouseWheelEvent()     | `wheel_y<0`: 下スクロール、`wheel_y>0`: 上スクロール、`wheel_x<0`: 右スクロール、`wheel_x>0`: 左スクロール。|
|AddMouseSourceEvent()    | マウスソースの変更をキューに入れる（マウス/タッチスクリーン/ペン）|
|AddFocusEvent()          | アプリケーションのフォーカスの増減をキューに入れる（一般に、OS/プラットフォームのウィンドウのフォーカスに基づく）|
|AddInputCharacter()      | 新しい文字入力をキューに入れる|
|AddInputCharacterUTF16() | UTF-16文字からの新しい文字入力をキューに入れる。|
|AddInputCharactersUTF8() | UTF-8文字列から新しい文字の入力をキューに入れる。|
|SetKeyEventNativeData()  | (オプション) レガシー `<1.87` IsKeyXXX() 関数のネイティブ・インデックスを指定する。|
|SetAppAcceptingEvents()  | キー／マウス／テキスト・イベントを受け付けるかどうかのマスター・フラグを設定する（デフォルトはtrue）。ネイティブのダイアログボックスがアプリケーションのループやリフレッシュに割り込み、アプリがフリーズしている間にキューに入れられるイベントを無効にしたい場合に便利です。|
|ClearEventsQueue()       | すべての受信イベントを消去する。|
|ClearInputKeys()         | 現在のキーボード／マウス／ゲームパッドの状態＋現在のフレームのテキスト入力バッファをクリアする。すべてのキー/ボタンを解放するのと同じ。|


### 出力 - NewFrame() または EndFrame()/Render() によって更新されます。

io.WantCaptureMouse、io.WantCaptureKeyboardフラグを読み取って入力をディスパッチする場合は、一般的に、NewFrame()を呼び出す前にその状態を使用する方が簡単で、より正しいです。詳細はFAQを参照してください！

```cpp
bool   WantCaptureMouse;
bool   WantCaptureKeyboard;
bool   WantTextInput;
bool   WantSetMousePos;
bool   WantSaveIniSettings;
bool   NavActive;
bool   NavVisible;
float  Framerate;
int    MetricsRenderVertices;
int    MetricsRenderIndices;
int    MetricsRenderWindows;
int    MetricsActiveWindows;
int    MetricsActiveAllocations;
ImVec2 MouseDelta;
```

| 名前                     | 説明                                                                                                                                                                                                                                                                                    |
|--------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| WantCaptureMouse         | ImGuiがマウス入力を使用するタイミングを設定します。この場合、マウス入力をメインゲーム/アプリケーションにディスパッチしません(いずれにせよ、常にマウス入力をimguiに渡します)。(例：クリックされていないマウスがimguiウィンドウの上にある、ウィジェットがアクティブ、マウスがimguiウィンドウの上でクリックされた、など)。 |
| WantCaptureKeyboard      | ImGuiがキーボード入力を使用するタイミングを設定します。この場合、キーボード入力をメインゲーム/アプリケーションにディスパッチしません（いずれにせよ、常にキーボード入力をimguiに渡します）。(例：InputTextがアクティブになっている、imguiウィンドウがフォーカスされていてナビゲーションが有効になっている、など)。                               |
| WantTextInput            | Mobile/console: 設定すると、オンスクリーンキーボードを表示できます。これはDear ImGuiがキーボード入力をさせたい時（InputTextウィジェットがアクティブな時など）に設定します。                                                                                                     |
| WantSetMousePos          | MousePosが変更され、バックエンドは次のフレームでマウスを再配置する必要があります。めったに使われない！ImGuiConfigFlags_NavEnableSetMousePos フラグが有効な場合のみ設定されます。                                                                                                                             |
| WantSaveIniSettings      | 手動.iniロード/セーブがアクティブな場合(io.IniFilename == NULL)、これはアプリケーションにSaveIniSettingsToMemory()を呼び出して自分でセーブできることを通知するために設定されます。重要：保存後、io.WantSaveIniSettingsをクリアしてください！                                                |
| NavActive                | 現在、キーボード／ゲームパッドによるナビゲーションが許可されている (ImGuiKey_NavXXX イベントを処理する。) = ウィンドウがフォーカスされ、ImGuiWindowFlags_NoNavInputsフラグが使われていない。                                                                                                                   |
| NavVisible               | キーボード／ゲームパッドナビゲーションが表示され、許可されている (ImGuiKey_NavXXX イベントを処理する。).                                                                                                                                                                                                |
| Framerate                | アプリケーションのフレームレートの見積もり (io.DeltaTimeに基づく60フレームのローリング平均値), フレーム/秒。利便性のためだけだ。 低速のアプリケーションは移動平均を使いたくなかったり、時々バッファをリセットしたくなるかもしれない。                                    |
| MetricsRenderVertices    | 最後に Render() を呼び出したときに出力された頂点。                                                                                                                                                    |
| MetricsRenderIndices     | 最後にRender()を呼び出したときに出力されたインデックス = 三角形の数 * 3                                                                                                                                                    |
| MetricsRenderWindows     | 見える窓の数                                                                                                                                                    |
| MetricsActiveWindows     | アクティブウィンドウ数                                                                                                                                                    |
| MetricsActiveAllocations | 現在のコンテキストに基づいてMemAlloc/MemFreeによって更新される、アクティブなアロケーションの数。複数のimguiコンテキストがある場合はずれるかもしれない。                                                                                                                                                    |
| MouseDelta               | マウスのデルタ。現在の位置と前の位置のどちらかが無効な場合（-FLT_MAX,-FLT_MAX）、これはゼロになるので、マウスが消えたり現れたりしても、大きなデルタは発生しないことに注意。                                                                                                                |

レガシー：1.87以前では、バックエンドが初期化時にio.KeyMap[]（imgui->ネイティブ・マップ）を満たし、毎フレームio.KeysDown[]（ネイティブ・インデックス）を満たす必要がありました。
これはレガシー機能としてまだ一時的にサポートされている。しかし、バックエンドがio.AddKeyEvent()を呼び出すのが新しい望ましい方式です。
  古い (`<1.87`):  ImGui::IsKeyPressed(ImGui::GetIO().KeyMap[ImGuiKey_Space]) --> New (1.87+) ImGui::IsKeyPressed(ImGuiKey_Space)

```cpp
#ifndef IMGUI_DISABLE_OBSOLETE_KEYIO
    int   KeyMap[ImGuiKey_COUNT];         // [LEGACY] Input: map of indices into the KeysDown[512] entries array which represent your "native" keyboard state. The first 512 are now unused and should be kept zero. Legacy backend will write into KeyMap[] using ImGuiKey_ indices which are always >512.
    bool  KeysDown[ImGuiKey_COUNT];       // [LEGACY] Input: Keyboard keys that are pressed (ideally left in the "native" order your engine has access to keyboard keys, so you can use your own defines/enums for keys). This used to be [512] sized. It is now ImGuiKey_COUNT to allow legacy io.KeysDown[GetKeyIndex(...)] to work without an overflow.
    float NavInputs[ImGuiNavInput_COUNT]; // [LEGACY] Since 1.88, NavInputs[] was removed. Backends from 1.60 to 1.86 won't build. Feed gamepad inputs via io.AddKeyEvent() and ImGuiKey_GamepadXXX enums.
#endif
```

### (内部) Dear ImGuiはこれらのフィールドを維持します。

前方互換性は保証されません！

```cpp
ImGuiContext* Ctx;
```

- `Ctx`: 親UIコンテキスト（親が明示的に設定する必要がある）。

#### メイン入力状態

このブロックは以前はバックエンドによって書き込まれていたが、1.87以降は直接書き込まず、代わりに上記のAddXXX関数を呼び出すのがベストである。
変数がどこかに移動する可能性は極めて低いので、変数からの読み込みはフェアゲームです。

```cpp
ImVec2      MousePos;
bool        MouseDown[5];
float       MouseWheel;
float       MouseWheelH;
ImGuiMouseSource MouseSource;
bool        KeyCtrl;
bool        KeyShift;
bool        KeyAlt;
bool        KeySuper;
```

| 名前        | 説明                                                                                                                                                                                                                                                                   |
|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MousePos    | マウスの位置（ピクセル単位）。マウスが使用できない場合 (別の画面など) は ImVec2(-FLT_MAX, -FLT_MAX) に設定する。                                                                                                                                                         |
| MouseDown   | マウスボタン：0=左、1=右、2=中央 + extra (ImGuiMouseButton_COUNT == 5)。Dear ImGuiは、主に左右のボタンを使用します。 その他のボタンにより、アプリケーションでマウスが使用されているかどうかを追跡することができます。`IsMouse**` API 経由で便宜的にユーザーに提供する。 |
| MouseWheel  | マウスホイール 垂直：1ユニットで約5行のテキストをスクロールします。`>0`で上スクロール、`<0`で下スクロール。SHIFTを押し続けると縦スクロールが横スクロールになる。                                                                                                                |
| MouseWheelH | マウスホイール 水平。`>0`で左スクロール、`<0`で右スクロール。ほとんどのユーザは水平ホイールを持つマウスを持っていないので、すべてのバックエンドで満たされるとは限りません。                                                                                                              |
| MouseSource | マウス実際の入力周辺機器（マウス/タッチスクリーン/ペン）。                                                                                                                                                                                                                 |
| KeyCtrl     | キーボードの修飾子を下にコントロール                                                                                                              |
| KeyShift    | キーボード修飾子を下にシフト                                                                                                              |
| KeyAlt      | キーボードの修飾子を下げる：Alt                                                                                                              |
| KeySuper    | キーボード修飾子を下にCmd/Super/Windows                                                                                                              |

上記のデータから維持されるその他の状態＋IO関数呼び出し

```cpp
    ImGuiKeyChord KeyMods;
    ImGuiKeyData  KeysData[ImGuiKey_KeysData_SIZE];
    bool        WantCaptureMouseUnlessPopupClose;
    ImVec2      MousePosPrev;
    ImVec2      MouseClickedPos[5];
    double      MouseClickedTime[5];
    bool        MouseClicked[5];
    bool        MouseDoubleClicked[5];
    ImU16       MouseClickedCount[5];
    ImU16       MouseClickedLastCount[5];
    bool        MouseReleased[5];
    bool        MouseDownOwned[5];
    bool        MouseDownOwnedUnlessPopupClose[5];
    bool        MouseWheelRequestAxisSwap;
    float       MouseDownDuration[5];
    float       MouseDownDurationPrev[5];
    float       MouseDragMaxDistanceSqr[5];
    float       PenPressure;
    bool        AppFocusLost;
    bool        AppAcceptingEvents;
    ImS8        BackendUsingLegacyKeyArrays;
    bool        BackendUsingLegacyNavInputArray;
    ImWchar16   InputQueueSurrogate;
    ImVector<ImWchar> InputQueueCharacters;

    IMGUI_API   ImGuiIO();
};
```

| 名前                             | 説明                                                                                                                                                                                                                                                    |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| KeyMods                          | キー修飾フラグ (ImGuiMod_Ctrl/ImGuiMod_Shift/ImGuiMod_Alt/ImGuiMod_Super フラグのいずれか, io.KeyCtrl/KeyShift/KeyAlt/KeySuperと同じですが、フラグに統合されています。 ImGuiMod_Shortcut は含まれていません。). 読み取り専用。NewFrame()によって更新される。 |
| KeysData                         | すべての既知のキーのキー状態。これにアクセスするには IsKeyXXX() 関数を使用します。                                                                                                                                                                                  |
| WantCaptureMouseUnlessPopupClose | WantCaptureMouseの代替: (WantCaptureMouse == true && WantCaptureMouseUnlessPopupClose == false) when a click over void is expected to close a popup.                                                                                           |
| MousePosPrev                     | 前のマウスの位置 (どちらかの位置が無効な場合、MouseDeltaは== MousePos-MousePosPrevである必要はないことに注意。)                                                                                                                            |
| MouseClickedPos                  | クリック時のポジション                                                                                                                                                                             |
| MouseClickedTime                 | 最後にクリックした時間（ダブルクリックの計算に使用）                                                                                                                                                                             |
| MouseClicked                     | マウスボタンが`!Down`から`Down`になった（`MouseClickedCount[x] != 0`と同じ）                                                                                                                                                                             |
| MouseDoubleClicked               | マウスボタンがダブルクリックされたか (`MouseClickedCount[x] == 2` と同じ)                                                                                                                                                                             |
| MouseClickedCount                | == 0（クリックされていない）、== 1（`MouseClicked[]`と同じ）、== 2（ダブルクリック）、== 3（トリプルクリック）など。 `!ダウン`から`ダウン`になるとき。                                                                                                                      |
| MouseClickedLastCount            | クリックの連続回数をカウントする。マウスを離しても有効。再度クリックするとリセットされます。                                                                                                                                                  |
| MouseReleased                    | マウスボタンが`Down`から`!Down`になった。                                                                                                                                                                                                                    |
| MouseDownOwned                   | dear ImGuiウィンドウの中でボタンがクリックされたか、ポップアップによってブロックされたボイドの上でボタンがクリックされたかを追跡する。 ImGuiの範囲外でクリックが開始された場合、アプリケーションからマウス・キャプチャを要求しない。                                                                      |
| MouseDownOwnedUnlessPopupClose   | dear imguiウィンドウ内でボタンがクリックされたかどうかを追跡する。                                                                                                                                                                                                 |
| MouseWheelRequestAxisSwap        | Mac以外のシステムでは、SHIFTを押したままWheelYにWheelXと同等のイベントを実行するように要求します。 Macのシステムでは、これはすでにシステムによって強制されている。                                                                                                 |
| MouseDownDuration                | マウスボタンが押されていた時間 (0.0f == クリックされた直後)                                                                                                                    |
| MouseDownDurationPrev            | マウスボタンが押されていた時間                                                                                                                    |
| MouseDragMaxDistanceSqr          | クリックポイントからのマウスの移動距離の最大値の2乗（閾値の移動に使用）                                                                                                                    |
| PenPressure                      | タッチ/ペンの圧力（0.0f～1.0f、MouseDown[0] == trueの時のみ0.0fを超えるはずです）。現在ImGuiでは未使用のヘルパーストレージです。                                                                                                                       |
| AppFocusLost                     | AddFocusEvent() でのみ変更可能。                                                                                                                    |
| AppAcceptingEvents               | SetAppAcceptingEvents() でのみ変更可能。                                                                                                                    |
| BackendUsingLegacyKeyArrays      | -1: 不明, 0: AddKeyEvent() を使用, 1: レガシーio.KeysDown[]を使用                                                                                                                    |
| BackendUsingLegacyNavInputArray  | 0: AddKeyAnalogEvent()を使用、1: レガシーio.NavInputs[]に直接書き込む。                                                                                                                    |
| InputQueueSurrogate              | AddInputCharacterUTF16()用                                                                                                                    |
| InputQueueCharacters             | 入力された文字のキュー (プラットフォームバックエンドによって取得される)。AddInputCharacter() ヘルパーを使って入力する。                                                                                                                                                      |


## その他のデータ構造

`ImGuiInputTextFlags_Callback*` フラグが使用されている場合、コールバック関数の引数として渡されます。コールバック関数はデフォルトで0を返す必要があります。

コールバック (詳細は ImGuiInputTextFlags_ declarations のコメントを参照してください。)

- ImGuiInputTextFlags_CallbackEdit: バッファ編集時のコールバック(InputText()は編集時にすでにtrueを返していることに注意。コールバックは主に、フォーカスがアクティブな間にその下のバッファを操作するのに便利です)
- ImGuiInputTextFlags_CallbackAlways: 各反復のコールバック
- ImGuiInputTextFlags_CallbackCompletion: TABボタン押下時のコールバック
- ImGuiInputTextFlags_CallbackHistory: 上下の矢印を押すとコールバック
- ImGuiInputTextFlags_CallbackCharFilter: 文字入力を置換または破棄するためのコールバック。EventChar'を変更して置換または破棄するか、コールバックで1を返して破棄する。
- ImGuiInputTextFlags_CallbackResize: バッファの容量変更要求時にコールバックされ、(パラメータ 'buf_size' の値を超えて) 文字列が大きくなる。

```cpp
struct ImGuiInputTextCallbackData
{
    ImGuiContext*       Ctx;            // Parent UI context
    ImGuiInputTextFlags EventFlag;      // One ImGuiInputTextFlags_Callback*    // Read-only
    ImGuiInputTextFlags Flags;          // What user passed to InputText()      // Read-only
    void*               UserData;       // What user passed to InputText()      // Read-only

    // Arguments for the different callback events
    // - To modify the text buffer in a callback, prefer using the InsertChars() / DeleteChars() function. InsertChars() will take care of calling the resize callback if necessary.
    // - If you know your edits are not going to resize the underlying buffer allocation, you may modify the contents of 'Buf[]' directly. You need to update 'BufTextLen' accordingly (0 <= BufTextLen < BufSize) and set 'BufDirty'' to true so InputText can update its internal state.
    ImWchar             EventChar;      // Character input                      // Read-write   // [CharFilter] Replace character with another one, or set to zero to drop. return 1 is equivalent to setting EventChar=0;
    ImGuiKey            EventKey;       // Key pressed (Up/Down/TAB)            // Read-only    // [Completion,History]
    char*               Buf;            // Text buffer                          // Read-write   // [Resize] Can replace pointer / [Completion,History,Always] Only write to pointed data, don't replace the actual pointer!
    int                 BufTextLen;     // Text length (in bytes)               // Read-write   // [Resize,Completion,History,Always] Exclude zero-terminator storage. In C land: == strlen(some_text), in C++ land: string.length()
    int                 BufSize;        // Buffer size (in bytes) = capacity+1  // Read-only    // [Resize,Completion,History,Always] Include zero-terminator storage. In C land == ARRAYSIZE(my_char_array), in C++ land: string.capacity()+1
    bool                BufDirty;       // Set if you modify Buf/BufTextLen!    // Write        // [Completion,History,Always]
    int                 CursorPos;      //                                      // Read-write   // [Completion,History,Always]
    int                 SelectionStart; //                                      // Read-write   // [Completion,History,Always] == to SelectionEnd when no selection)
    int                 SelectionEnd;   //                                      // Read-write   // [Completion,History,Always]

    // Helper functions for text manipulation.
    // Use those function to benefit from the CallbackResize behaviors. Calling those function reset the selection.
    IMGUI_API ImGuiInputTextCallbackData();
    IMGUI_API void      DeleteChars(int pos, int bytes_count);
    IMGUI_API void      InsertChars(int pos, const char* text, const char* text_end = NULL);
    void                SelectAll()             { SelectionStart = 0; SelectionEnd = BufTextLen; }
    void                ClearSelection()        { SelectionStart = SelectionEnd = BufTextLen; }
    bool                HasSelection() const    { return SelectionStart != SelectionEnd; }
};
```

カスタム制約を適用するためのリサイズ コールバック データ。SetNextWindowSizeConstraints() によって有効になります。コールバックは、次の Begin() の間に呼び出されます。
注釈: 各軸の基本的な最小/最大サイズ制約の場合は、コールバックを使用する必要はありません！SetNextWindowSizeConstraints() パラメータで十分です。

```cpp
struct ImGuiSizeCallbackData
{
    void*   UserData;       // Read-only.   What user passed to SetNextWindowSizeConstraints(). Generally store an integer or float in here (need reinterpret_cast<>).
    ImVec2  Pos;            // Read-only.   Window position, for reference.
    ImVec2  CurrentSize;    // Read-only.   Current window size.
    ImVec2  DesiredSize;    // Read-write.  Desired size, based on user's mouse position. Write to this field to restrain resizing.
};
```

ドラッグ＆ドロップ操作のデータペイロード：AcceptDragDropPayload() および GetDragDropPayload() 。

```cpp
struct ImGuiPayload
{
    // Members
    void*           Data;               // Data (copied and owned by dear imgui)
    int             DataSize;           // Data size

    // [Internal]
    ImGuiID         SourceId;           // Source item id
    ImGuiID         SourceParentId;     // Source parent id (if available)
    int             DataFrameCount;     // Data timestamp
    char            DataType[32 + 1];   // Data type tag (short user-supplied string, 32 characters max)
    bool            Preview;            // Set when AcceptDragDropPayload() was called and mouse has been hovering the target item (nb: handle overlapping drag targets)
    bool            Delivery;           // Set when AcceptDragDropPayload() was called and mouse button is released over the target item.

    ImGuiPayload()  { Clear(); }
    void Clear()    { SourceId = SourceParentId = 0; Data = NULL; DataSize = 0; memset(DataType, 0, sizeof(DataType)); DataFrameCount = -1; Preview = Delivery = false; }
    bool IsDataType(const char* type) const { return DataFrameCount != -1 && strcmp(type, DataType) == 0; }
    bool IsPreview() const                  { return Preview; }
    bool IsDelivery() const                 { return Delivery; }
};
```

テーブルの1カラムのソート指定 (sizeof == 12 bytes)

```cpp
struct ImGuiTableColumnSortSpecs
{
    ImGuiID                     ColumnUserID;       // User id of the column (if specified by a TableSetupColumn() call)
    ImS16                       ColumnIndex;        // Index of the column
    ImS16                       SortOrder;          // Index within parent ImGuiTableSortSpecs (always stored in order starting from 0, tables sorted on a single criteria will always have a 0 here)
    ImGuiSortDirection          SortDirection : 8;  // ImGuiSortDirection_Ascending or ImGuiSortDirection_Descending (you can use this or SortSign, whichever is more convenient for your sort function)

    ImGuiTableColumnSortSpecs() { memset(this, 0, sizeof(*this)); }
};
```

テーブルのソート仕様 (多くの場合は単一のカラムのソート仕様を扱いますが、場合によってはそれ以上のものもあります)。
TableGetSortSpecs()をコールすることで得られる。
SpecsDirty == true' の場合、データをソートすることができます。前回コールしたとき、あるいは初めてコールしたときからソート仕様が変更されている場合に真になります。
ソート後に必ず 'SpecsDirty = false' を設定しないと、毎フレームデータを無駄にソートしてしまう可能性があります！

```cpp
struct ImGuiTableSortSpecs
{
    const ImGuiTableColumnSortSpecs* Specs;     // Pointer to sort spec array.
    int                         SpecsCount;     // Sort spec count. Most often 1. May be > 1 when ImGuiTableFlags_SortMulti is enabled. May be == 0 when ImGuiTableFlags_SortTristate is enabled.
    bool                        SpecsDirty;     // Set to true when specs have changed since last time! Use this to sort again, then clear the flag.

    ImGuiTableSortSpecs()       { memset(this, 0, sizeof(*this)); }
};
```

## ヘルパー

- ImGuiOnceUponAFrame
- ImGuiTextFilter
- ImGuiTextBuffer
- ImGuiStorage
- ImGuiListClipper
- Math Operators
- ImColor

ヘルパー: Unicodeの定義

```cpp
#define IM_UNICODE_CODEPOINT_INVALID 0xFFFD     // Invalid Unicode code point (standard value).
#ifdef IMGUI_USE_WCHAR32
#define IM_UNICODE_CODEPOINT_MAX     0x10FFFF   // Maximum Unicode code point supported by this build.
#else
#define IM_UNICODE_CODEPOINT_MAX     0xFFFF     // Maximum Unicode code point supported by this build.
#endif
```

### ImGuiOnceUponAFrame ヘルパー

1フレームに最大1回、コードのブロックを実行する。フレームごとに複数回実行される深いネストされたコードの中にUIを素早く作成したい場合に便利です。

使用法: `static ImGuiOnceUponAFrame oaf; if (oaf) ImGui::Text("This will be called only once per frame")；`

```cpp
struct ImGuiOnceUponAFrame
{
    ImGuiOnceUponAFrame() { RefFrame = -1; }
    mutable int RefFrame;
    operator bool() const { int current_frame = ImGui::GetFrameCount(); if (RefFrame == current_frame) return false; RefFrame = current_frame; return true; }
};
```

### ImGuiTextFilter ヘルパー

テキストフィルタを解析し、適用する。形式 "aaaaa[,bbbb][,ccccc]"

```cpp
struct ImGuiTextFilter
{
    IMGUI_API           ImGuiTextFilter(const char* default_filter = "");
    IMGUI_API bool      Draw(const char* label = "Filter (inc,-exc)", float width = 0.0f);  // Helper calling InputText+Build
    IMGUI_API bool      PassFilter(const char* text, const char* text_end = NULL) const;
    IMGUI_API void      Build();
    void                Clear()          { InputBuf[0] = 0; Build(); }
    bool                IsActive() const { return !Filters.empty(); }

    // [Internal]
    struct ImGuiTextRange
    {
        const char*     b;
        const char*     e;

        ImGuiTextRange()                                { b = e = NULL; }
        ImGuiTextRange(const char* _b, const char* _e)  { b = _b; e = _e; }
        bool            empty() const                   { return b == e; }
        IMGUI_API void  split(char separator, ImVector<ImGuiTextRange>* out) const;
    };
    char                    InputBuf[256];
    ImVector<ImGuiTextRange>Filters;
    int                     CountGrep;
};
```

### ImGuiTextBuffer ヘルパー

テキストを記録/蓄積するための成長可能なテキストバッファ

これは'ImGuiTextBuilder'/'ImGuiStringBuilder'と呼ぶこともできる

```cpp
struct ImGuiTextBuffer
{
    ImVector<char>      Buf;
    IMGUI_API static char EmptyString[1];

    ImGuiTextBuffer()   { }
    inline char         operator[](int i) const { IM_ASSERT(Buf.Data != NULL); return Buf.Data[i]; }
    const char*         begin() const           { return Buf.Data ? &Buf.front() : EmptyString; }
    const char*         end() const             { return Buf.Data ? &Buf.back() : EmptyString; }   // Buf is zero-terminated, so end() will point on the zero-terminator
    int                 size() const            { return Buf.Size ? Buf.Size - 1 : 0; }
    bool                empty() const           { return Buf.Size <= 1; }
    void                clear()                 { Buf.clear(); }
    void                reserve(int capacity)   { Buf.reserve(capacity); }
    const char*         c_str() const           { return Buf.Data ? Buf.Data : EmptyString; }
    IMGUI_API void      append(const char* str, const char* str_end = NULL);
    IMGUI_API void      appendf(const char* fmt, ...) IM_FMTARGS(2);
    IMGUI_API void      appendfv(const char* fmt, va_list args) IM_FMTLIST(2);
};
```

### ImGuiStorage ヘルパー

`Key->Value` ストレージ

通常、各ウィンドウ内にストレージが保持されているため、これを気にする必要はない。
例えば、ツリー（Int 0/1）の崩壊状態を保存するために使用します。
これは効率的なルックアップ（連続したバッファへの二分割）とまれな挿入（通常、ユーザーとのインタラクション、つまり1フレームに1回まで）のために最適化されています。
一時的な値のためのカスタム・ユーザー・ストレージとして使用できる。例えば次のような場合、独自のストレージを宣言する：
- インターフェイスの特定のサブツリーの開閉状態を操作したい場合（ツリーノードはInt 0/1を使用して状態を保存します）。
- コードに構造を追加したり編集したりすることなく、カスタム・デバッグ・データを簡単に保存したい場合（おそらく効率的ではないが、便利である）。
型は保存されないので、Keyが異なる型と衝突しないようにするのはあなた次第です。

```cpp
struct ImGuiStorage
{
    // [Internal]
    struct ImGuiStoragePair
    {
        ImGuiID key;
        union { int val_i; float val_f; void* val_p; };
        ImGuiStoragePair(ImGuiID _key, int _val_i)      { key = _key; val_i = _val_i; }
        ImGuiStoragePair(ImGuiID _key, float _val_f)    { key = _key; val_f = _val_f; }
        ImGuiStoragePair(ImGuiID _key, void* _val_p)    { key = _key; val_p = _val_p; }
    };

    ImVector<ImGuiStoragePair>      Data;

    // - Get***() functions find pair, never add/allocate. Pairs are sorted so a query is O(log N)
    // - Set***() functions find pair, insertion on demand if missing.
    // - Sorted insertion is costly, paid once. A typical frame shouldn't need to insert any new pair.
    void                Clear() { Data.clear(); }
    IMGUI_API int       GetInt(ImGuiID key, int default_val = 0) const;
    IMGUI_API void      SetInt(ImGuiID key, int val);
    IMGUI_API bool      GetBool(ImGuiID key, bool default_val = false) const;
    IMGUI_API void      SetBool(ImGuiID key, bool val);
    IMGUI_API float     GetFloat(ImGuiID key, float default_val = 0.0f) const;
    IMGUI_API void      SetFloat(ImGuiID key, float val);
    IMGUI_API void*     GetVoidPtr(ImGuiID key) const; // default_val is NULL
    IMGUI_API void      SetVoidPtr(ImGuiID key, void* val);

    // - Get***Ref() functions finds pair, insert on demand if missing, return pointer. Useful if you intend to do Get+Set.
    // - References are only valid until a new value is added to the storage. Calling a Set***() function or a Get***Ref() function invalidates the pointer.
    // - A typical use case where this is convenient for quick hacking (e.g. add storage during a live Edit&Continue session if you can't modify existing struct)
    //      float* pvar = ImGui::GetFloatRef(key); ImGui::SliderFloat("var", pvar, 0, 100.0f); some_var += *pvar;
    IMGUI_API int*      GetIntRef(ImGuiID key, int default_val = 0);
    IMGUI_API bool*     GetBoolRef(ImGuiID key, bool default_val = false);
    IMGUI_API float*    GetFloatRef(ImGuiID key, float default_val = 0.0f);
    IMGUI_API void**    GetVoidPtrRef(ImGuiID key, void* default_val = NULL);

    // Use on your own storage if you know only integer are being stored (open/close all tree nodes)
    IMGUI_API void      SetAllInt(int val);

    // For quicker full rebuild of a storage (instead of an incremental one), you may add all your contents and then sort once.
    IMGUI_API void      BuildSortByKey();
};
```

### ImGuiListClipper ヘルパー

大量のリストを手動でクリップ。

たくさんのアイテムが等間隔に並んでいて、リストへのランダムアクセスが可能な場合、可視性に基づいて粗いクリッピングを実行し、表示されているアイテムだけをサブミットすることができます。
クリッパーは可視アイテムの範囲を計算し、カーソルを進めて、スキップした非可視アイテムを補います。
(ImGuiはすでにアイテムの境界に基づいてアイテムをクリッピングしていますが、: そのためにはまずアイテムをレイアウトする必要があり、一般的に独自のデータをフェッチ/サブミットするには追加のコストがかかります。ImGuiListClipperを使った粗いクリッピングは、数万アイテムのリストでも問題なく簡単に拡大縮小できます)

```cpp
//使い方
ImGuiListClipper clipper;
clipper.Begin(1000); // 1000個のエレメントが等間隔に並んでいる。
while (clipper.Step())
    for (int i = clipper.DisplayStart; i < clipper.DisplayEnd; i++)
        ImGui::Text("line number %d", i);
```

一般的に何が起こるかというと
- クリッパーは、最初の要素（DisplayStart = 0, DisplayEnd = 1）を、それが表示されているかどうかに関係なく処理します。
- ユーザーコードはその1つの要素を送信します。
- Clipper は最初の要素の高さを測定できます。
- クリッパーは、現在のクリッピング矩形に基づいて表示する要素の実際の範囲を計算し、カーソルを最初の可視要素の前に配置します。
- ユーザー・コードで可視要素をサブミットします。
- クリッパーはまた、キーボード/ゲームパッドのナビゲーションや折り返しなどに関連する様々な微妙な処理も行います。

```cpp
struct ImGuiListClipper
{
    ImGuiContext*   Ctx;                // Parent UI context
    int             DisplayStart;       // First item to display, updated by each call to Step()
    int             DisplayEnd;         // End of items to display (exclusive)
    int             ItemsCount;         // [Internal] Number of items
    float           ItemsHeight;        // [Internal] Height of item after a first step and item submission can calculate it
    float           StartPosY;          // [Internal] Cursor position at the time of Begin() or after table frozen rows are all processed
    void*           TempData;           // [Internal] Internal data

    // items_count: Use INT_MAX if you don't know how many items you have (in which case the cursor won't be advanced in the final step)
    // items_height: Use -1.0f to be calculated automatically on first step. Otherwise pass in the distance between your items, typically GetTextLineHeightWithSpacing() or GetFrameHeightWithSpacing().
    IMGUI_API ImGuiListClipper();
    IMGUI_API ~ImGuiListClipper();
    IMGUI_API void  Begin(int items_count, float items_height = -1.0f);
    IMGUI_API void  End();             // Automatically called on the last call of Step() that returns false.
    IMGUI_API bool  Step();            // Call until it returns false. The DisplayStart/DisplayEnd fields will be set and you can process/draw those items.

    // Call IncludeItemByIndex() or IncludeItemsByIndex() *BEFORE* first call to Step() if you need a range of items to not be clipped, regardless of their visibility.
    // (Due to alignment / padding of certain items it is possible that an extra item may be included on either end of the display range).
    inline void     IncludeItemByIndex(int item_index)                  { IncludeItemsByIndex(item_index, item_index + 1); }
    IMGUI_API void  IncludeItemsByIndex(int item_begin, int item_end);  // item_end is exclusive e.g. use (42, 42+1) to make item 42 never clipped.

#ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
    inline void IncludeRangeByIndices(int item_begin, int item_end)      { IncludeItemsByIndex(item_begin, item_end); } // [renamed in 1.89.9]
    inline void ForceDisplayRangeByIndices(int item_begin, int item_end) { IncludeItemsByIndex(item_begin, item_end); } // [renamed in 1.89.6]
    //inline ImGuiListClipper(int items_count, float items_height = -1.0f) { memset(this, 0, sizeof(*this)); ItemsCount = -1; Begin(items_count, items_height); } // [removed in 1.79]
#endif
};
```

#### ImVec2/ImVec4 演算子

- ユーザー空間に漏れないように、デフォルトで無効にしておくことが重要だ。
- これは、ImVec2/ImVec4 と独自の型との間の暗黙のキャスト演算を可能にするためである。 (imconfig.hでIM_VEC2_CLASS_EXTRAを使用する。)
- `define IMGUI_DEFINE_MATH_OPERATORS`を使って、我々の演算子をインポートすることができます。

```cpp
#ifdef IMGUI_DEFINE_MATH_OPERATORS
#define IMGUI_DEFINE_MATH_OPERATORS_IMPLEMENTED
IM_MSVC_RUNTIME_CHECKS_OFF
static inline ImVec2  operator*(const ImVec2& lhs, const float rhs)     { return ImVec2(lhs.x * rhs, lhs.y * rhs); }
static inline ImVec2  operator/(const ImVec2& lhs, const float rhs)     { return ImVec2(lhs.x / rhs, lhs.y / rhs); }
static inline ImVec2  operator+(const ImVec2& lhs, const ImVec2& rhs)   { return ImVec2(lhs.x + rhs.x, lhs.y + rhs.y); }
static inline ImVec2  operator-(const ImVec2& lhs, const ImVec2& rhs)   { return ImVec2(lhs.x - rhs.x, lhs.y - rhs.y); }
static inline ImVec2  operator*(const ImVec2& lhs, const ImVec2& rhs)   { return ImVec2(lhs.x * rhs.x, lhs.y * rhs.y); }
static inline ImVec2  operator/(const ImVec2& lhs, const ImVec2& rhs)   { return ImVec2(lhs.x / rhs.x, lhs.y / rhs.y); }
static inline ImVec2  operator-(const ImVec2& lhs)                      { return ImVec2(-lhs.x, -lhs.y); }
static inline ImVec2& operator*=(ImVec2& lhs, const float rhs)          { lhs.x *= rhs; lhs.y *= rhs; return lhs; }
static inline ImVec2& operator/=(ImVec2& lhs, const float rhs)          { lhs.x /= rhs; lhs.y /= rhs; return lhs; }
static inline ImVec2& operator+=(ImVec2& lhs, const ImVec2& rhs)        { lhs.x += rhs.x; lhs.y += rhs.y; return lhs; }
static inline ImVec2& operator-=(ImVec2& lhs, const ImVec2& rhs)        { lhs.x -= rhs.x; lhs.y -= rhs.y; return lhs; }
static inline ImVec2& operator*=(ImVec2& lhs, const ImVec2& rhs)        { lhs.x *= rhs.x; lhs.y *= rhs.y; return lhs; }
static inline ImVec2& operator/=(ImVec2& lhs, const ImVec2& rhs)        { lhs.x /= rhs.x; lhs.y /= rhs.y; return lhs; }
static inline ImVec4  operator+(const ImVec4& lhs, const ImVec4& rhs)   { return ImVec4(lhs.x + rhs.x, lhs.y + rhs.y, lhs.z + rhs.z, lhs.w + rhs.w); }
static inline ImVec4  operator-(const ImVec4& lhs, const ImVec4& rhs)   { return ImVec4(lhs.x - rhs.x, lhs.y - rhs.y, lhs.z - rhs.z, lhs.w - rhs.w); }
static inline ImVec4  operator*(const ImVec4& lhs, const ImVec4& rhs)   { return ImVec4(lhs.x * rhs.x, lhs.y * rhs.y, lhs.z * rhs.z, lhs.w * rhs.w); }
IM_MSVC_RUNTIME_CHECKS_RESTORE
#endif
```

#### 32ビット・エンコード・カラーを生成するマクロ

ユーザーは、imconfigファイルに5つの_SHIFT/_MASKマクロを#defineすることで、独自のフォーマットを宣言できる。

```cpp
#ifndef IM_COL32_R_SHIFT
#ifdef IMGUI_USE_BGRA_PACKED_COLOR
#define IM_COL32_R_SHIFT    16
#define IM_COL32_G_SHIFT    8
#define IM_COL32_B_SHIFT    0
#define IM_COL32_A_SHIFT    24
#define IM_COL32_A_MASK     0xFF000000
#else
#define IM_COL32_R_SHIFT    0
#define IM_COL32_G_SHIFT    8
#define IM_COL32_B_SHIFT    16
#define IM_COL32_A_SHIFT    24
#define IM_COL32_A_MASK     0xFF000000
#endif
#endif
#define IM_COL32(R,G,B,A)    (((ImU32)(A)<<IM_COL32_A_SHIFT) | ((ImU32)(B)<<IM_COL32_B_SHIFT) | ((ImU32)(G)<<IM_COL32_G_SHIFT) | ((ImU32)(R)<<IM_COL32_R_SHIFT))
#define IM_COL32_WHITE       IM_COL32(255,255,255,255)  // Opaque white = 0xFFFFFFFF
#define IM_COL32_BLACK       IM_COL32(0,0,0,255)        // Opaque black
#define IM_COL32_BLACK_TRANS IM_COL32(0,0,0,0)          // Transparent black = 0x00000000
```

### ImColor ヘルパー

ImColor() は暗黙的に、色を ImU32 (4x1 バイト詰め) または ImVec4 (4x1 float) に変換します。

ImDrawList APIで使用するために、コンパイル時に保証されたImU32が必要な場合は、IM_COL32()マクロを使用することをお勧めします。
ImColorの保存は避ける！ImVec4のu32を保存する。これはフル機能のカラー・クラスではありません。MAY OBSOLETE.
ImGuiのどのAPIもImColorを直接使用していませんが、ImU32またはImVec4形式で色を渡すための便宜として使用できます。必要であればImU32またはImVec4に明示的にキャストしてください。

```cpp
struct ImColor
{
    ImVec4          Value;

    constexpr ImColor()                                             { }
    constexpr ImColor(float r, float g, float b, float a = 1.0f)    : Value(r, g, b, a) { }
    constexpr ImColor(const ImVec4& col)                            : Value(col) {}
    constexpr ImColor(int r, int g, int b, int a = 255)             : Value((float)r * (1.0f / 255.0f), (float)g * (1.0f / 255.0f), (float)b * (1.0f / 255.0f), (float)a* (1.0f / 255.0f)) {}
    constexpr ImColor(ImU32 rgba)                                   : Value((float)((rgba >> IM_COL32_R_SHIFT) & 0xFF) * (1.0f / 255.0f), (float)((rgba >> IM_COL32_G_SHIFT) & 0xFF) * (1.0f / 255.0f), (float)((rgba >> IM_COL32_B_SHIFT) & 0xFF) * (1.0f / 255.0f), (float)((rgba >> IM_COL32_A_SHIFT) & 0xFF) * (1.0f / 255.0f)) {}
    inline operator ImU32() const                                   { return ImGui::ColorConvertFloat4ToU32(Value); }
    inline operator ImVec4() const                                  { return Value; }

    // FIXME-OBSOLETE: May need to obsolete/cleanup those helpers.
    inline void    SetHSV(float h, float s, float v, float a = 1.0f){ ImGui::ColorConvertHSVtoRGB(h, s, v, Value.x, Value.y, Value.z); Value.w = a; }
    static ImColor HSV(float h, float s, float v, float a = 1.0f)   { float r, g, b; ImGui::ColorConvertHSVtoRGB(h, s, v, r, g, b); return ImColor(r, g, b, a); }
};
```

## 描画API

- ImDrawCmd
- ImDrawIdx
- ImDrawVert
- ImDrawChannel
- ImDrawListSplitter
- ImDrawListFlags
- ImDrawList
- ImDrawData

一連の描画コマンドを保持する。ユーザは`ImDrawList`の配列を含む`ImDrawData`のレンダラーを提供する。

アンチエイリアスされたテクスチャをベイクする最大線幅。ベイクを無効にするために `ImFontAtlasFlags_NoBakedLines` でアトラスをビルドします。

```cpp
#ifndef IM_DRAWLIST_TEX_LINES_WIDTH_MAX
#define IM_DRAWLIST_TEX_LINES_WIDTH_MAX     (63)
#endif
```

ImDrawCallback：高度な用途のための描画コールバック [設定可能なタイプ: imconfig.hのoverride]。
注意：独自のウィジェットやカスタマイズされたUIレンダリングを作成するためだけに、描画コールバックを使用する必要はないでしょう！描画コールバックは、例えば以下のような場合に便利です：
A.GPUのレンダリング状態を変更する、
B. UIエレメント内の複雑な3Dシーンを、中間テクスチャ/レンダーターゲットなしでレンダリングする、など。
レンダリング関数から期待される動作は '`if (cmd.UserCallback != NULL) { cmd.UserCallback(parent_list, cmd); } else { RenderTriangles() }`' です。
ImDrawCallbackのシグネチャをオーバーライドしたい場合は、例えば '#define ImDrawCallback MyDrawCallback' (in imconfig.h) を使用し、それに応じてレンダリングバックエンドを更新するだけです。

```cpp
#ifndef ImDrawCallback
typedef void (*ImDrawCallback)(const ImDrawList* parent_list, const ImDrawCmd* cmd);
#endif
```

グラフィックス/レンダリング状態のリセットをレンダラーのバックエンドに要求するための特別な Draw コールバック値。
レンダラーのバックエンドはこの特別な値を処理する必要があります。そうしないと、このアドレスの関数を呼び出そうとしてクラッシュします。
これは、レンダリング状態が変更されたことがわかっているコールバックを送信し、それを復元したい場合などに便利です。
これはデフォルトでは行われません。というのも、imguiコンテンツのレンダリング状態を変更する方法として、コールバックは非常に有用だからです（イメージ呼び出しの前にシェーダー/ブレンド設定を変更する場合など）。

```cpp
#define ImDrawCallback_ResetRenderState     (ImDrawCallback)(-1)
```

通常、1コマンド＝1GPUドローコール（コマンドがコールバックでない限り）
- VtxOffset：io.BackendFlags & ImGuiBackendFlags_RendererHasVtxOffset' が有効な場合、このフィールドによって16ビットインデックスを維持したまま64K頂点より大きなメッシュをレンダリングできます。
  `<1.71.`用に作られたバックエンドは、通常VtxOffsetフィールドを無視します。
- ClipRect/TextureId/VtxOffsetフィールドは、一緒にmemcmp()するので、連続している必要があります（これはアサートされます）。

```cpp
struct ImDrawCmd
{
    ImVec4          ClipRect;           // 4*4  // Clipping rectangle (x1, y1, x2, y2). Subtract ImDrawData->DisplayPos to get clipping rectangle in "viewport" coordinates
    ImTextureID     TextureId;          // 4-8  // User-provided texture ID. Set by user in ImfontAtlas::SetTexID() for fonts or passed to Image*() functions. Ignore if never using images or multiple fonts atlas.
    unsigned int    VtxOffset;          // 4    // Start offset in vertex buffer. ImGuiBackendFlags_RendererHasVtxOffset: always 0, otherwise may be >0 to support meshes larger than 64K vertices with 16-bit indices.
    unsigned int    IdxOffset;          // 4    // Start offset in index buffer.
    unsigned int    ElemCount;          // 4    // Number of indices (multiple of 3) to be rendered as triangles. Vertices are stored in the callee ImDrawList's vtx_buffer[] array, indices in idx_buffer[].
    ImDrawCallback  UserCallback;       // 4-8  // If != NULL, call the function instead of rendering the vertices. clip_rect and texture_id will be set normally.
    void*           UserCallbackData;   // 4-8  // The draw callback code can access this.

    ImDrawCmd() { memset(this, 0, sizeof(*this)); } // Also ensure our padding fields are zeroed

    // Since 1.83: returns ImTextureID associated with this draw call. Warning: DO NOT assume this is always same as 'TextureId' (we will change this function for an upcoming feature)
    inline ImTextureID GetTexID() const { return TextureId; }
};
```

頂点レイアウト

```cpp
#ifndef IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT
struct ImDrawVert
{
    ImVec2  pos;
    ImVec2  uv;
    ImU32   col;
};
#else
```

imconfig.hでIMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUTを定義することで、頂点フォーマットのレイアウトをオーバーライドできます。
コードでは、ImVec2 pos (8バイト)、ImVec2 uv (8バイト)、ImU32 col (4バイト)を想定していますが、エンジンへの統合を簡単にするために、必要に応じて並べ替えたり、他のフィールドを追加することができます。
型はマクロ内に記述する必要があります（構造体を宣言するか、typedefを使用します）。これは、ImVec2/ImU32は、型を設定したい時点では宣言されていない可能性が高いためです。
注意：imguiは構造体をクリアせず、コンストラクタも呼び出さないので、カスタムフィールドは初期化されません。余分なフィールド（z座標など）を追加した場合は、レンダリング時にクリアするか、無視する必要があります。

```cpp
IMGUI_OVERRIDE_DRAWVERT_STRUCT_LAYOUT;
#endif
```

[内部] ImDrawListで使用

```cpp
struct ImDrawCmdHeader
{
    ImVec4          ClipRect;
    ImTextureID     TextureId;
    unsigned int    VtxOffset;
};
```

[内部] ImDrawListSplitter で使用する。

```cpp
struct ImDrawChannel
{
    ImVector<ImDrawCmd>         _CmdBuffer;
    ImVector<ImDrawIdx>         _IdxBuffer;
};
```

### Split/Merge関数

描画リストを異なるレイヤーに分割するために使用されます。
これはColumns/Tables APIで使用され、各カラムのアイテムを同じ描画呼び出しでまとめて描画することができます。

```cpp
struct ImDrawListSplitter
{
    int                         _Current;    // Current channel number (0)
    int                         _Count;      // Number of active channels (1+)
    ImVector<ImDrawChannel>     _Channels;   // Draw channels (not resized down so _Count might be < Channels.Size)

    inline ImDrawListSplitter()  { memset(this, 0, sizeof(*this)); }
    inline ~ImDrawListSplitter() { ClearFreeMemory(); }
    inline void                 Clear() { _Current = 0; _Count = 1; } // Do not clear Channels[] so our allocations are reused next frame
    IMGUI_API void              ClearFreeMemory();
    IMGUI_API void              Split(ImDrawList* draw_list, int count);
    IMGUI_API void              Merge(ImDrawList* draw_list);
    IMGUI_API void              SetCurrentChannel(ImDrawList* draw_list, int channel_idx);
};
```

### ImDrawList 関数のフラグ

レガシー：ビット0は常にImDrawFlags_Closedに対応しなければならない。ビット1～3は未使用。

```cpp
enum ImDrawFlags_
{
    ImDrawFlags_None                        = 0,
    ImDrawFlags_Closed                      = 1 << 0, // PathStroke(), AddPolyline(): specify that shape should be closed (Important: this is always == 1 for legacy reason)
    ImDrawFlags_RoundCornersTopLeft         = 1 << 4, // AddRect(), AddRectFilled(), PathRect(): enable rounding top-left corner only (when rounding > 0.0f, we default to all corners). Was 0x01.
    ImDrawFlags_RoundCornersTopRight        = 1 << 5, // AddRect(), AddRectFilled(), PathRect(): enable rounding top-right corner only (when rounding > 0.0f, we default to all corners). Was 0x02.
    ImDrawFlags_RoundCornersBottomLeft      = 1 << 6, // AddRect(), AddRectFilled(), PathRect(): enable rounding bottom-left corner only (when rounding > 0.0f, we default to all corners). Was 0x04.
    ImDrawFlags_RoundCornersBottomRight     = 1 << 7, // AddRect(), AddRectFilled(), PathRect(): enable rounding bottom-right corner only (when rounding > 0.0f, we default to all corners). Wax 0x08.
    ImDrawFlags_RoundCornersNone            = 1 << 8, // AddRect(), AddRectFilled(), PathRect(): disable rounding on all corners (when rounding > 0.0f). This is NOT zero, NOT an implicit flag!
    ImDrawFlags_RoundCornersTop             = ImDrawFlags_RoundCornersTopLeft | ImDrawFlags_RoundCornersTopRight,
    ImDrawFlags_RoundCornersBottom          = ImDrawFlags_RoundCornersBottomLeft | ImDrawFlags_RoundCornersBottomRight,
    ImDrawFlags_RoundCornersLeft            = ImDrawFlags_RoundCornersBottomLeft | ImDrawFlags_RoundCornersTopLeft,
    ImDrawFlags_RoundCornersRight           = ImDrawFlags_RoundCornersBottomRight | ImDrawFlags_RoundCornersTopRight,
    ImDrawFlags_RoundCornersAll             = ImDrawFlags_RoundCornersTopLeft | ImDrawFlags_RoundCornersTopRight | ImDrawFlags_RoundCornersBottomLeft | ImDrawFlags_RoundCornersBottomRight,
    ImDrawFlags_RoundCornersDefault_        = ImDrawFlags_RoundCornersAll, // Default to ALL corners if none of the _RoundCornersXX flags are specified.
    ImDrawFlags_RoundCornersMask_           = ImDrawFlags_RoundCornersAll | ImDrawFlags_RoundCornersNone,
};
```

ImDrawList インスタンスのフラグ。これらは ImGui:: 関数によって ImGuiIO の設定から自動的に設定されるもので、一般的には直接操作することはできません。
しかし、ImDrawList::関数を呼び出す間にフラグを一時的に変更することは可能です。

```cpp
enum ImDrawListFlags_
{
    ImDrawListFlags_None                    = 0,
    ImDrawListFlags_AntiAliasedLines        = 1 << 0,  // Enable anti-aliased lines/borders (*2 the number of triangles for 1.0f wide line or lines thin enough to be drawn using textures, otherwise *3 the number of triangles)
    ImDrawListFlags_AntiAliasedLinesUseTex  = 1 << 1,  // Enable anti-aliased lines/borders using textures when possible. Require backend to render with bilinear filtering (NOT point/nearest filtering).
    ImDrawListFlags_AntiAliasedFill         = 1 << 2,  // Enable anti-aliased edge around filled shapes (rounded rectangles, circles).
    ImDrawListFlags_AllowVtxOffset          = 1 << 3,  // Can emit 'VtxOffset > 0' to allow large meshes. Set when 'ImGuiBackendFlags_RendererHasVtxOffset' is enabled.
};
```

### 描画コマンドリスト

これは、ImGui::関数が充填するポリゴンの低レベルリストです。フレームの終わりには、すべてのコマンドリストがレンダリングのために ImGuiIO::RenderDrawListFn 関数に渡されます。
それぞれの親愛なるimguiウィンドウはそれ自身のImDrawListを含んでいます。ImGui::GetWindowDrawList()を使って、現在のウィンドウ描画リストにアクセスし、カスタムプリミティブを描画することができます。
通常のImGui::の呼び出しと、現在の描画リストへのプリミティブの追加をインターリーブすることができます。
シングルビューポートモードでは、左上は== GetMainViewport()->Pos (一般的には0,0)、右下は== GetMainViewport()->Pos+Size (一般的にはio.DisplaySize)です。
データにどのような変換行列を適用するかは完全に自由です（変換の用途によっては、ClipRectにも適用したくなるかもしれません！）。
重要：プリミティブは常にリストに追加され、カリングされません（カリングはImGui::関数によってより高いレベルで行われます）。

```cpp
struct ImDrawList
{
    // This is what you have to render
    ImVector<ImDrawCmd>     CmdBuffer;          // Draw commands. Typically 1 command = 1 GPU draw call, unless the command is a callback.
    ImVector<ImDrawIdx>     IdxBuffer;          // Index buffer. Each command consume ImDrawCmd::ElemCount of those
    ImVector<ImDrawVert>    VtxBuffer;          // Vertex buffer.
    ImDrawListFlags         Flags;              // Flags, you may poke into these to adjust anti-aliasing settings per-primitive.

    // [Internal, used while building lists]
    unsigned int            _VtxCurrentIdx;     // [Internal] generally == VtxBuffer.Size unless we are past 64K vertices, in which case this gets reset to 0.
    ImDrawListSharedData*   _Data;              // Pointer to shared draw data (you can use ImGui::GetDrawListSharedData() to get the one from current ImGui context)
    const char*             _OwnerName;         // Pointer to owner window's name for debugging
    ImDrawVert*             _VtxWritePtr;       // [Internal] point within VtxBuffer.Data after each add command (to avoid using the ImVector<> operators too much)
    ImDrawIdx*              _IdxWritePtr;       // [Internal] point within IdxBuffer.Data after each add command (to avoid using the ImVector<> operators too much)
    ImVector<ImVec4>        _ClipRectStack;     // [Internal]
    ImVector<ImTextureID>   _TextureIdStack;    // [Internal]
    ImVector<ImVec2>        _Path;              // [Internal] current path building
    ImDrawCmdHeader         _CmdHeader;         // [Internal] template of active commands. Fields should match those of CmdBuffer.back().
    ImDrawListSplitter      _Splitter;          // [Internal] for channels api (note: prefer using your own persistent instance of ImDrawListSplitter!)
    float                   _FringeScale;       // [Internal] anti-alias fringe is scaled by this value, this helps to keep things sharp while zooming at vertex buffer content

    // If you want to create ImDrawList instances, pass them ImGui::GetDrawListSharedData() or create and use your own ImDrawListSharedData (so you can use ImDrawList without ImGui)
    ImDrawList(ImDrawListSharedData* shared_data) { memset(this, 0, sizeof(*this)); _Data = shared_data; }

    ~ImDrawList() { _ClearFreeMemory(); }
    IMGUI_API void  PushClipRect(const ImVec2& clip_rect_min, const ImVec2& clip_rect_max, bool intersect_with_current_clip_rect = false);  // Render-level scissoring. This is passed down to your render function but not used for CPU-side coarse clipping. Prefer using higher-level ImGui::PushClipRect() to affect logic (hit-testing and widget culling)
    IMGUI_API void  PushClipRectFullScreen();
    IMGUI_API void  PopClipRect();
    IMGUI_API void  PushTextureID(ImTextureID texture_id);
    IMGUI_API void  PopTextureID();
    inline ImVec2   GetClipRectMin() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.x, cr.y); }
    inline ImVec2   GetClipRectMax() const { const ImVec4& cr = _ClipRectStack.back(); return ImVec2(cr.z, cr.w); }

    // Primitives
    // - Filled shapes must always use clockwise winding order. The anti-aliasing fringe depends on it. Counter-clockwise shapes will have "inward" anti-aliasing.
    // - For rectangular primitives, "p_min" and "p_max" represent the upper-left and lower-right corners.
    // - For circle primitives, use "num_segments == 0" to automatically calculate tessellation (preferred).
    //   In older versions (until Dear ImGui 1.77) the AddCircle functions defaulted to num_segments == 12.
    //   In future versions we will use textures to provide cheaper and higher-quality circles.
    //   Use AddNgon() and AddNgonFilled() functions if you need to guarantee a specific number of sides.
    IMGUI_API void  AddLine(const ImVec2& p1, const ImVec2& p2, ImU32 col, float thickness = 1.0f);
    IMGUI_API void  AddRect(const ImVec2& p_min, const ImVec2& p_max, ImU32 col, float rounding = 0.0f, ImDrawFlags flags = 0, float thickness = 1.0f);   // a: upper-left, b: lower-right (== upper-left + size)
    IMGUI_API void  AddRectFilled(const ImVec2& p_min, const ImVec2& p_max, ImU32 col, float rounding = 0.0f, ImDrawFlags flags = 0);                     // a: upper-left, b: lower-right (== upper-left + size)
    IMGUI_API void  AddRectFilledMultiColor(const ImVec2& p_min, const ImVec2& p_max, ImU32 col_upr_left, ImU32 col_upr_right, ImU32 col_bot_right, ImU32 col_bot_left);
    IMGUI_API void  AddQuad(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, ImU32 col, float thickness = 1.0f);
    IMGUI_API void  AddQuadFilled(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, ImU32 col);
    IMGUI_API void  AddTriangle(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, ImU32 col, float thickness = 1.0f);
    IMGUI_API void  AddTriangleFilled(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, ImU32 col);
    IMGUI_API void  AddCircle(const ImVec2& center, float radius, ImU32 col, int num_segments = 0, float thickness = 1.0f);
    IMGUI_API void  AddCircleFilled(const ImVec2& center, float radius, ImU32 col, int num_segments = 0);
    IMGUI_API void  AddNgon(const ImVec2& center, float radius, ImU32 col, int num_segments, float thickness = 1.0f);
    IMGUI_API void  AddNgonFilled(const ImVec2& center, float radius, ImU32 col, int num_segments);
    IMGUI_API void  AddText(const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL);
    IMGUI_API void  AddText(const ImFont* font, float font_size, const ImVec2& pos, ImU32 col, const char* text_begin, const char* text_end = NULL, float wrap_width = 0.0f, const ImVec4* cpu_fine_clip_rect = NULL);
    IMGUI_API void  AddPolyline(const ImVec2* points, int num_points, ImU32 col, ImDrawFlags flags, float thickness);
    IMGUI_API void  AddConvexPolyFilled(const ImVec2* points, int num_points, ImU32 col);
    IMGUI_API void  AddBezierCubic(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, ImU32 col, float thickness, int num_segments = 0); // Cubic Bezier (4 control points)
    IMGUI_API void  AddBezierQuadratic(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, ImU32 col, float thickness, int num_segments = 0);               // Quadratic Bezier (3 control points)

    // Image primitives
    // - Read FAQ to understand what ImTextureID is.
    // - "p_min" and "p_max" represent the upper-left and lower-right corners of the rectangle.
    // - "uv_min" and "uv_max" represent the normalized texture coordinates to use for those corners. Using (0,0)->(1,1) texture coordinates will generally display the entire texture.
    IMGUI_API void  AddImage(ImTextureID user_texture_id, const ImVec2& p_min, const ImVec2& p_max, const ImVec2& uv_min = ImVec2(0, 0), const ImVec2& uv_max = ImVec2(1, 1), ImU32 col = IM_COL32_WHITE);
    IMGUI_API void  AddImageQuad(ImTextureID user_texture_id, const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, const ImVec2& uv1 = ImVec2(0, 0), const ImVec2& uv2 = ImVec2(1, 0), const ImVec2& uv3 = ImVec2(1, 1), const ImVec2& uv4 = ImVec2(0, 1), ImU32 col = IM_COL32_WHITE);
    IMGUI_API void  AddImageRounded(ImTextureID user_texture_id, const ImVec2& p_min, const ImVec2& p_max, const ImVec2& uv_min, const ImVec2& uv_max, ImU32 col, float rounding, ImDrawFlags flags = 0);

    // Stateful path API, add points then finish with PathFillConvex() or PathStroke()
    // - Filled shapes must always use clockwise winding order. The anti-aliasing fringe depends on it. Counter-clockwise shapes will have "inward" anti-aliasing.
    inline    void  PathClear()                                                 { _Path.Size = 0; }
    inline    void  PathLineTo(const ImVec2& pos)                               { _Path.push_back(pos); }
    inline    void  PathLineToMergeDuplicate(const ImVec2& pos)                 { if (_Path.Size == 0 || memcmp(&_Path.Data[_Path.Size - 1], &pos, 8) != 0) _Path.push_back(pos); }
    inline    void  PathFillConvex(ImU32 col)                                   { AddConvexPolyFilled(_Path.Data, _Path.Size, col); _Path.Size = 0; }
    inline    void  PathStroke(ImU32 col, ImDrawFlags flags = 0, float thickness = 1.0f) { AddPolyline(_Path.Data, _Path.Size, col, flags, thickness); _Path.Size = 0; }
    IMGUI_API void  PathArcTo(const ImVec2& center, float radius, float a_min, float a_max, int num_segments = 0);
    IMGUI_API void  PathArcToFast(const ImVec2& center, float radius, int a_min_of_12, int a_max_of_12);                // Use precomputed angles for a 12 steps circle
    IMGUI_API void  PathBezierCubicCurveTo(const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, int num_segments = 0); // Cubic Bezier (4 control points)
    IMGUI_API void  PathBezierQuadraticCurveTo(const ImVec2& p2, const ImVec2& p3, int num_segments = 0);               // Quadratic Bezier (3 control points)
    IMGUI_API void  PathRect(const ImVec2& rect_min, const ImVec2& rect_max, float rounding = 0.0f, ImDrawFlags flags = 0);

    // Advanced
    IMGUI_API void  AddCallback(ImDrawCallback callback, void* callback_data);  // Your rendering function must check for 'UserCallback' in ImDrawCmd and call the function instead of rendering triangles.
    IMGUI_API void  AddDrawCmd();                                               // This is useful if you need to forcefully create a new draw call (to allow for dependent rendering / blending). Otherwise primitives are merged into the same draw-call as much as possible
    IMGUI_API ImDrawList* CloneOutput() const;                                  // Create a clone of the CmdBuffer/IdxBuffer/VtxBuffer.

    // Advanced: Channels
    // - Use to split render into layers. By switching channels to can render out-of-order (e.g. submit FG primitives before BG primitives)
    // - Use to minimize draw calls (e.g. if going back-and-forth between multiple clipping rectangles, prefer to append into separate channels then merge at the end)
    // - This API shouldn't have been in ImDrawList in the first place!
    //   Prefer using your own persistent instance of ImDrawListSplitter as you can stack them.
    //   Using the ImDrawList::ChannelsXXXX you cannot stack a split over another.
    inline void     ChannelsSplit(int count)    { _Splitter.Split(this, count); }
    inline void     ChannelsMerge()             { _Splitter.Merge(this); }
    inline void     ChannelsSetCurrent(int n)   { _Splitter.SetCurrentChannel(this, n); }

    // Advanced: Primitives allocations
    // - We render triangles (three vertices)
    // - All primitives needs to be reserved via PrimReserve() beforehand.
    IMGUI_API void  PrimReserve(int idx_count, int vtx_count);
    IMGUI_API void  PrimUnreserve(int idx_count, int vtx_count);
    IMGUI_API void  PrimRect(const ImVec2& a, const ImVec2& b, ImU32 col);      // Axis aligned rectangle (composed of two triangles)
    IMGUI_API void  PrimRectUV(const ImVec2& a, const ImVec2& b, const ImVec2& uv_a, const ImVec2& uv_b, ImU32 col);
    IMGUI_API void  PrimQuadUV(const ImVec2& a, const ImVec2& b, const ImVec2& c, const ImVec2& d, const ImVec2& uv_a, const ImVec2& uv_b, const ImVec2& uv_c, const ImVec2& uv_d, ImU32 col);
    inline    void  PrimWriteVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col)    { _VtxWritePtr->pos = pos; _VtxWritePtr->uv = uv; _VtxWritePtr->col = col; _VtxWritePtr++; _VtxCurrentIdx++; }
    inline    void  PrimWriteIdx(ImDrawIdx idx)                                     { *_IdxWritePtr = idx; _IdxWritePtr++; }
    inline    void  PrimVtx(const ImVec2& pos, const ImVec2& uv, ImU32 col)         { PrimWriteIdx((ImDrawIdx)_VtxCurrentIdx); PrimWriteVtx(pos, uv, col); } // Write vertex with unique index

    // Obsolete names
    //inline  void  AddBezierCurve(const ImVec2& p1, const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, ImU32 col, float thickness, int num_segments = 0) { AddBezierCubic(p1, p2, p3, p4, col, thickness, num_segments); } // OBSOLETED in 1.80 (Jan 2021)
    //inline  void  PathBezierCurveTo(const ImVec2& p2, const ImVec2& p3, const ImVec2& p4, int num_segments = 0) { PathBezierCubicCurveTo(p2, p3, p4, num_segments); } // OBSOLETED in 1.80 (Jan 2021)

    // [Internal helpers]
    IMGUI_API void  _ResetForNewFrame();
    IMGUI_API void  _ClearFreeMemory();
    IMGUI_API void  _PopUnusedDrawCmd();
    IMGUI_API void  _TryMergeDrawCmds();
    IMGUI_API void  _OnChangedClipRect();
    IMGUI_API void  _OnChangedTextureID();
    IMGUI_API void  _OnChangedVtxOffset();
    IMGUI_API int   _CalcCircleAutoSegmentCount(float radius) const;
    IMGUI_API void  _PathArcToFastEx(const ImVec2& center, float radius, int a_min_sample, int a_max_sample, int a_step);
    IMGUI_API void  _PathArcToN(const ImVec2& center, float radius, float a_min, float a_max, int num_segments);
};
```

Dear ImGuiフレームをレンダリングするためのすべての描画データ

注：ここのスタイルと命名規則には少し一貫性がありません。これはライブラリによって公開される最も古い構造の1つであるため、後方互換性の目的のために、現在これらを保存しています！基本的には、ImDrawList == CmdListです。

```cpp
struct ImDrawData
{
    bool                Valid;              // Only valid after Render() is called and before the next NewFrame() is called.
    int                 CmdListsCount;      // Number of ImDrawList* to render (should always be == CmdLists.size)
    int                 TotalIdxCount;      // For convenience, sum of all ImDrawList's IdxBuffer.Size
    int                 TotalVtxCount;      // For convenience, sum of all ImDrawList's VtxBuffer.Size
    ImVector<ImDrawList*> CmdLists;         // Array of ImDrawList* to render. The ImDrawLists are owned by ImGuiContext and only pointed to from here.
    ImVec2              DisplayPos;         // Top-left position of the viewport to render (== top-left of the orthogonal projection matrix to use) (== GetMainViewport()->Pos for the main viewport, == (0.0) in most single-viewport applications)
    ImVec2              DisplaySize;        // Size of the viewport to render (== GetMainViewport()->Size for the main viewport, == io.DisplaySize in most single-viewport applications)
    ImVec2              FramebufferScale;   // Amount of pixels for each unit of DisplaySize. Based on io.DisplayFramebufferScale. Generally (1,1) on normal display, (2,2) on OSX with Retina display.
    ImGuiViewport*      OwnerViewport;      // Viewport carrying the ImDrawData instance, might be of use to the renderer (generally not).

    // Functions
    ImDrawData()    { Clear(); }
    IMGUI_API void  Clear();
    IMGUI_API void  AddDrawList(ImDrawList* draw_list);     // Helper to add an external draw list into an existing ImDrawData.
    IMGUI_API void  DeIndexAllBuffers();                    // Helper to convert all buffers from indexed to non-indexed, in case you cannot render indexed. Note: this is slow and most likely a waste of resources. Always prefer indexed rendering!
    IMGUI_API void  ScaleClipRects(const ImVec2& fb_scale); // Helper to scale the ClipRect field of each ImDrawCmd. Use if your final output buffer is at a different scale than Dear ImGui expects, or if there is a difference between your window resolution and framebuffer resolution.
};
```

## フォントAPI

- ImFontConfig
- ImFontGlyph
- ImFontAtlasFlags
- ImFontAtlas
- ImFontGlyphRangesBuilder
- ImFont

```cpp
struct ImFontConfig
{
    void*           FontData;               //          // TTF/OTF data
    int             FontDataSize;           //          // TTF/OTF data size
    bool            FontDataOwnedByAtlas;   // true     // TTF/OTF data ownership taken by the container ImFontAtlas (will delete memory itself).
    int             FontNo;                 // 0        // Index of font within TTF/OTF file
    float           SizePixels;             //          // Size in pixels for rasterizer (more or less maps to the resulting font height).
    int             OversampleH;            // 2        // Rasterize at higher quality for sub-pixel positioning. Note the difference between 2 and 3 is minimal. You can reduce this to 1 for large glyphs save memory. Read https://github.com/nothings/stb/blob/master/tests/oversample/README.md for details.
    int             OversampleV;            // 1        // Rasterize at higher quality for sub-pixel positioning. This is not really useful as we don't use sub-pixel positions on the Y axis.
    bool            PixelSnapH;             // false    // Align every glyph to pixel boundary. Useful e.g. if you are merging a non-pixel aligned font with the default font. If enabled, you can set OversampleH/V to 1.
    ImVec2          GlyphExtraSpacing;      // 0, 0     // Extra spacing (in pixels) between glyphs. Only X axis is supported for now.
    ImVec2          GlyphOffset;            // 0, 0     // Offset all glyphs from this font input.
    const ImWchar*  GlyphRanges;            // NULL     // THE ARRAY DATA NEEDS TO PERSIST AS LONG AS THE FONT IS ALIVE. Pointer to a user-provided list of Unicode range (2 value per range, values are inclusive, zero-terminated list).
    float           GlyphMinAdvanceX;       // 0        // Minimum AdvanceX for glyphs, set Min to align font icons, set both Min/Max to enforce mono-space font
    float           GlyphMaxAdvanceX;       // FLT_MAX  // Maximum AdvanceX for glyphs
    bool            MergeMode;              // false    // Merge into previous ImFont, so you can combine multiple inputs font into one ImFont (e.g. ASCII font + icons + Japanese glyphs). You may want to use GlyphOffset.y when merge font of different heights.
    unsigned int    FontBuilderFlags;       // 0        // Settings for custom font builder. THIS IS BUILDER IMPLEMENTATION DEPENDENT. Leave as zero if unsure.
    float           RasterizerMultiply;     // 1.0f     // Brighten (>1.0f) or darken (<1.0f) font output. Brightening small fonts may be a good workaround to make them more readable.
    ImWchar         EllipsisChar;           // -1       // Explicitly specify unicode codepoint of ellipsis character. When fonts are being merged first specified ellipsis will be used.

    // [Internal]
    char            Name[40];               // Name (strictly to ease debugging)
    ImFont*         DstFont;

    IMGUI_API ImFontConfig();
};
```

1グリフ分のレンダリングデータを保持する。

(注：言語パーサによっては、31+1ビットフィールドのメンバの変換に失敗することがあります。)

```cpp
struct ImFontGlyph
{
    unsigned int    Colored : 1;        // Flag to indicate glyph is colored and should generally ignore tinting (make it usable with no shift on little-endian as this is used in loops)
    unsigned int    Visible : 1;        // Flag to indicate glyph has no visible pixels (e.g. space). Allow early out when rendering.
    unsigned int    Codepoint : 30;     // 0x0000..0x10FFFF
    float           AdvanceX;           // Distance to next character (= data from font + ImFontConfig::GlyphExtraSpacing.x baked in)
    float           X0, Y0, X1, Y1;     // Glyph corners
    float           U0, V0, U1, V1;     // Texture coordinates
};
```

テキスト/文字列データからグリフ範囲を構築するヘルパー。アプリケーションに文字列/文字を与えてから BuildRanges()を呼び出す。
これは基本的に、64kブーリアン = 8KBストレージのベクタを密にパックしたものです。

```cpp
struct ImFontGlyphRangesBuilder
{
    ImVector<ImU32> UsedChars;            // Store 1-bit per Unicode code point (0=unused, 1=used)

    ImFontGlyphRangesBuilder()              { Clear(); }
    inline void     Clear()                 { int size_in_bytes = (IM_UNICODE_CODEPOINT_MAX + 1) / 8; UsedChars.resize(size_in_bytes / (int)sizeof(ImU32)); memset(UsedChars.Data, 0, (size_t)size_in_bytes); }
    inline bool     GetBit(size_t n) const  { int off = (int)(n >> 5); ImU32 mask = 1u << (n & 31); return (UsedChars[off] & mask) != 0; }  // Get bit n in the array
    inline void     SetBit(size_t n)        { int off = (int)(n >> 5); ImU32 mask = 1u << (n & 31); UsedChars[off] |= mask; }               // Set bit n in the array
    inline void     AddChar(ImWchar c)      { SetBit(c); }                      // Add character
    IMGUI_API void  AddText(const char* text, const char* text_end = NULL);     // Add string (each character of the UTF-8 string are added)
    IMGUI_API void  AddRanges(const ImWchar* ranges);                           // Add ranges, e.g. builder.AddRanges(ImFontAtlas::GetGlyphRangesDefault()) to force add all of ASCII/Latin+Ext
    IMGUI_API void  BuildRanges(ImVector<ImWchar>* out_ranges);                 // Output new ranges
};
```

ImFontAtlas::AddCustomRectXXX 関数を参照してください。

```cpp
struct ImFontAtlasCustomRect
{
    unsigned short  Width, Height;  // Input    // Desired rectangle dimension
    unsigned short  X, Y;           // Output   // Packed position in Atlas
    unsigned int    GlyphID;        // Input    // For custom font glyphs only (ID < 0x110000)
    float           GlyphAdvanceX;  // Input    // For custom font glyphs only: glyph xadvance
    ImVec2          GlyphOffset;    // Input    // For custom font glyphs only: glyph display offset
    ImFont*         Font;           // Input    // For custom font glyphs only: target font
    ImFontAtlasCustomRect()         { Width = Height = 0; X = Y = 0xFFFF; GlyphID = 0; GlyphAdvanceX = 0.0f; GlyphOffset = ImVec2(0, 0); Font = NULL; }
    bool IsPacked() const           { return X != 0xFFFF; }
};
```

### ImFontAtlas ビルドのフラグ

```cpp
enum ImFontAtlasFlags_
{
    ImFontAtlasFlags_None               = 0,
    ImFontAtlasFlags_NoPowerOfTwoHeight = 1 << 0,   // Don't round the height to next power of two
    ImFontAtlasFlags_NoMouseCursors     = 1 << 1,   // Don't build software mouse cursors into the atlas (save a little texture memory)
    ImFontAtlasFlags_NoBakedLines       = 1 << 2,   // Don't build thick line textures into the atlas (save a little texture memory, allow support for point/nearest filtering). The AntiAliasedLinesUseTex features uses them, otherwise they will be rendered using polygons (more expensive for CPU/GPU).
};
```

複数のTTF/OTFフォントを同じテクスチャにロードしてラスタライズ。フォントアトラスは単一のテクスチャ保持を構築します：
 - 1つまたは複数のフォント。
 - Dear ImGuiが必要とするシェイプをレンダリングするために必要なカスタムグラフィックデータ。
 - ソフトウェアカーソルレンダリングのためのマウスカーソル形状（フォントアトラスの'Flags |= ImFontAtlasFlags_NoMouseCursors'を設定しない限り）。
アトラスをセットアップ/ビルドし、ピクセルデータをグラフィックスAPIでアクセス可能なテクスチャにアップロードするのは、ユーザーコードの責任です。
 - オプションとして、AddFont***関数のいずれかを呼び出します。何も呼び出さない場合は、コードに埋め込まれたデフォルトフォントが読み込まれます。
 - GetTexDataAsAlpha8()またはGetTexDataAsRGBA32()を呼び出して、ピクセルデータを構築し、取得します。
 - ピクセルデータをグラフィックシステム内のテクスチャにアップロードします（imgui_impl_xxxx.cppの例を参照）。
 - SetTexID(my_tex_id)を呼び出し、グラフィックスAPIに適したフォーマットでテクスチャへのポインタ/識別子を渡します。
   この値は、テクスチャを識別するために、レンダリング中にあなたに返されます。詳しくはImTextureIDに関するFAQを参照してください。
よくある落とし穴
- `AddFont***` 関数に 'glyph_ranges' 配列を渡す場合、その配列がアトラスが構築されるまで持続することを確認する必要があります。
  (`GetTexData***`またはBuild()を呼び出すとき)。ポインタをコピーするだけで、データはコピーしません。
- 重要: デフォルトでは、AddFontFromMemoryTTF() はデータの所有権を取ります。たとえ書き込みを行わなくても、破棄時にポインタを解放します。
  font_cfg->FontDataOwnedByAtlas=false に設定すれば、データの所有権を保持し、解放されることはありません、
- 多くの関数に "TTF" というサフィックスがついていますが、OTF データも同様にサポートされています。
- これは古いAPIであり、現状ではこれらの理由やその他さまざまな理由で不便です！将来的には対応する予定です！

```cpp
struct ImFontAtlas
{
    IMGUI_API ImFontAtlas();
    IMGUI_API ~ImFontAtlas();
    IMGUI_API ImFont*           AddFont(const ImFontConfig* font_cfg);
    IMGUI_API ImFont*           AddFontDefault(const ImFontConfig* font_cfg = NULL);
    IMGUI_API ImFont*           AddFontFromFileTTF(const char* filename, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);
    IMGUI_API ImFont*           AddFontFromMemoryTTF(void* font_data, int font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // Note: Transfer ownership of 'ttf_data' to ImFontAtlas! Will be deleted after destruction of the atlas. Set font_cfg->FontDataOwnedByAtlas=false to keep ownership of your data and it won't be freed.
    IMGUI_API ImFont*           AddFontFromMemoryCompressedTTF(const void* compressed_font_data, int compressed_font_size, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL); // 'compressed_font_data' still owned by caller. Compress with binary_to_compressed_c.cpp.
    IMGUI_API ImFont*           AddFontFromMemoryCompressedBase85TTF(const char* compressed_font_data_base85, float size_pixels, const ImFontConfig* font_cfg = NULL, const ImWchar* glyph_ranges = NULL);              // 'compressed_font_data_base85' still owned by caller. Compress with binary_to_compressed_c.cpp with -base85 parameter.
    IMGUI_API void              ClearInputData();           // Clear input data (all ImFontConfig structures including sizes, TTF data, glyph ranges, etc.) = all the data used to build the texture and fonts.
    IMGUI_API void              ClearTexData();             // Clear output texture data (CPU side). Saves RAM once the texture has been copied to graphics memory.
    IMGUI_API void              ClearFonts();               // Clear output font data (glyphs storage, UV coordinates).
    IMGUI_API void              Clear();                    // Clear all input and output.

    // Build atlas, retrieve pixel data.
    // User is in charge of copying the pixels into graphics memory (e.g. create a texture with your engine). Then store your texture handle with SetTexID().
    // The pitch is always = Width * BytesPerPixels (1 or 4)
    // Building in RGBA32 format is provided for convenience and compatibility, but note that unless you manually manipulate or copy color data into
    // the texture (e.g. when using the AddCustomRect*** api), then the RGB pixels emitted will always be white (~75% of memory/bandwidth waste.
    IMGUI_API bool              Build();                    // Build pixels data. This is called automatically for you by the GetTexData*** functions.
    IMGUI_API void              GetTexDataAsAlpha8(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 1 byte per-pixel
    IMGUI_API void              GetTexDataAsRGBA32(unsigned char** out_pixels, int* out_width, int* out_height, int* out_bytes_per_pixel = NULL);  // 4 bytes-per-pixel
    bool                        IsBuilt() const             { return Fonts.Size > 0 && TexReady; } // Bit ambiguous: used to detect when user didn't build texture but effectively we should check TexID != 0 except that would be backend dependent...
    void                        SetTexID(ImTextureID id)    { TexID = id; }

    //-------------------------------------------
    // Glyph Ranges
    //-------------------------------------------

    // Helpers to retrieve list of common Unicode ranges (2 value per range, values are inclusive, zero-terminated list)
    // NB: Make sure that your string are UTF-8 and NOT in your local code page.
    // Read https://github.com/ocornut/imgui/blob/master/docs/FONTS.md/#about-utf-8-encoding for details.
    // NB: Consider using ImFontGlyphRangesBuilder to build glyph ranges from textual data.
    IMGUI_API const ImWchar*    GetGlyphRangesDefault();                // Basic Latin, Extended Latin
    IMGUI_API const ImWchar*    GetGlyphRangesGreek();                  // Default + Greek and Coptic
    IMGUI_API const ImWchar*    GetGlyphRangesKorean();                 // Default + Korean characters
    IMGUI_API const ImWchar*    GetGlyphRangesJapanese();               // Default + Hiragana, Katakana, Half-Width, Selection of 2999 Ideographs
    IMGUI_API const ImWchar*    GetGlyphRangesChineseFull();            // Default + Half-Width + Japanese Hiragana/Katakana + full set of about 21000 CJK Unified Ideographs
    IMGUI_API const ImWchar*    GetGlyphRangesChineseSimplifiedCommon();// Default + Half-Width + Japanese Hiragana/Katakana + set of 2500 CJK Unified Ideographs for common simplified Chinese
    IMGUI_API const ImWchar*    GetGlyphRangesCyrillic();               // Default + about 400 Cyrillic characters
    IMGUI_API const ImWchar*    GetGlyphRangesThai();                   // Default + Thai characters
    IMGUI_API const ImWchar*    GetGlyphRangesVietnamese();             // Default + Vietnamese characters

    //-------------------------------------------
    // [BETA] Custom Rectangles/Glyphs API
    //-------------------------------------------

    // You can request arbitrary rectangles to be packed into the atlas, for your own purposes.
    // - After calling Build(), you can query the rectangle position and render your pixels.
    // - If you render colored output, set 'atlas->TexPixelsUseColors = true' as this may help some backends decide of prefered texture format.
    // - You can also request your rectangles to be mapped as font glyph (given a font + Unicode point),
    //   so you can render e.g. custom colorful icons and use them as regular glyphs.
    // - Read docs/FONTS.md for more details about using colorful icons.
    // - Note: this API may be redesigned later in order to support multi-monitor varying DPI settings.
    IMGUI_API int               AddCustomRectRegular(int width, int height);
    IMGUI_API int               AddCustomRectFontGlyph(ImFont* font, ImWchar id, int width, int height, float advance_x, const ImVec2& offset = ImVec2(0, 0));
    ImFontAtlasCustomRect*      GetCustomRectByIndex(int index) { IM_ASSERT(index >= 0); return &CustomRects[index]; }

    // [Internal]
    IMGUI_API void              CalcCustomRectUV(const ImFontAtlasCustomRect* rect, ImVec2* out_uv_min, ImVec2* out_uv_max) const;
    IMGUI_API bool              GetMouseCursorTexData(ImGuiMouseCursor cursor, ImVec2* out_offset, ImVec2* out_size, ImVec2 out_uv_border[2], ImVec2 out_uv_fill[2]);

    //-------------------------------------------
    // Members
    //-------------------------------------------

    ImFontAtlasFlags            Flags;              // Build flags (see ImFontAtlasFlags_)
    ImTextureID                 TexID;              // User data to refer to the texture once it has been uploaded to user's graphic systems. It is passed back to you during rendering via the ImDrawCmd structure.
    int                         TexDesiredWidth;    // Texture width desired by user before Build(). Must be a power-of-two. If have many glyphs your graphics API have texture size restrictions you may want to increase texture width to decrease height.
    int                         TexGlyphPadding;    // Padding between glyphs within texture in pixels. Defaults to 1. If your rendering method doesn't rely on bilinear filtering you may set this to 0 (will also need to set AntiAliasedLinesUseTex = false).
    bool                        Locked;             // Marked as Locked by ImGui::NewFrame() so attempt to modify the atlas will assert.
    void*                       UserData;           // Store your own atlas related user-data (if e.g. you have multiple font atlas).

    // [Internal]
    // NB: Access texture data via GetTexData*() calls! Which will setup a default font for you.
    bool                        TexReady;           // Set when texture was built matching current font input
    bool                        TexPixelsUseColors; // Tell whether our texture data is known to use colors (rather than just alpha channel), in order to help backend select a format.
    unsigned char*              TexPixelsAlpha8;    // 1 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight
    unsigned int*               TexPixelsRGBA32;    // 4 component per pixel, each component is unsigned 8-bit. Total size = TexWidth * TexHeight * 4
    int                         TexWidth;           // Texture width calculated during Build().
    int                         TexHeight;          // Texture height calculated during Build().
    ImVec2                      TexUvScale;         // = (1.0f/TexWidth, 1.0f/TexHeight)
    ImVec2                      TexUvWhitePixel;    // Texture coordinates to a white pixel
    ImVector<ImFont*>           Fonts;              // Hold all the fonts returned by AddFont*. Fonts[0] is the default font upon calling ImGui::NewFrame(), use ImGui::PushFont()/PopFont() to change the current font.
    ImVector<ImFontAtlasCustomRect> CustomRects;    // Rectangles for packing custom texture data into the atlas.
    ImVector<ImFontConfig>      ConfigData;         // Configuration data
    ImVec4                      TexUvLines[IM_DRAWLIST_TEX_LINES_WIDTH_MAX + 1];  // UVs for baked anti-aliased lines

    // [Internal] Font builder
    const ImFontBuilderIO*      FontBuilderIO;      // Opaque interface to a font builder (default to stb_truetype, can be changed to use FreeType by defining IMGUI_ENABLE_FREETYPE).
    unsigned int                FontBuilderFlags;   // Shared flags (for all fonts) for custom font builder. THIS IS BUILD IMPLEMENTATION DEPENDENT. Per-font override is also available in ImFontConfig.

    // [Internal] Packing data
    int                         PackIdMouseCursors; // Custom texture rectangle ID for white pixel and mouse cursors
    int                         PackIdLines;        // Custom texture rectangle ID for baked anti-aliased lines

    // [Obsolete]
    //typedef ImFontAtlasCustomRect    CustomRect;         // OBSOLETED in 1.72+
    //typedef ImFontGlyphRangesBuilder GlyphRangesBuilder; // OBSOLETED in 1.67+
};
```

### フォント・ランタイム・データとレンダリング

ImFontAtlasは、GetTexDataAsAlpha8()またはGetTexDataAsRGBA32()を呼び出すと、自動的にデフォルトの埋め込みフォントをロードします。

```cpp
struct ImFont
{
    // Members: Hot ~20/24 bytes (for CalcTextSize)
    ImVector<float>             IndexAdvanceX;      // 12-16 // out //            // Sparse. Glyphs->AdvanceX in a directly indexable way (cache-friendly for CalcTextSize functions which only this this info, and are often bottleneck in large UI).
    float                       FallbackAdvanceX;   // 4     // out // = FallbackGlyph->AdvanceX
    float                       FontSize;           // 4     // in  //            // Height of characters/line, set during loading (don't change after loading)

    // Members: Hot ~28/40 bytes (for CalcTextSize + render loop)
    ImVector<ImWchar>           IndexLookup;        // 12-16 // out //            // Sparse. Index glyphs by Unicode code-point.
    ImVector<ImFontGlyph>       Glyphs;             // 12-16 // out //            // All glyphs.
    const ImFontGlyph*          FallbackGlyph;      // 4-8   // out // = FindGlyph(FontFallbackChar)

    // Members: Cold ~32/40 bytes
    ImFontAtlas*                ContainerAtlas;     // 4-8   // out //            // What we has been loaded into
    const ImFontConfig*         ConfigData;         // 4-8   // in  //            // Pointer within ContainerAtlas->ConfigData
    short                       ConfigDataCount;    // 2     // in  // ~ 1        // Number of ImFontConfig involved in creating this font. Bigger than 1 when merging multiple font sources into one ImFont.
    ImWchar                     FallbackChar;       // 2     // out // = FFFD/'?' // Character used if a glyph isn't found.
    ImWchar                     EllipsisChar;       // 2     // out // = '...'/'.'// Character used for ellipsis rendering.
    short                       EllipsisCharCount;  // 1     // out // 1 or 3
    float                       EllipsisWidth;      // 4     // out               // Width
    float                       EllipsisCharStep;   // 4     // out               // Step between characters when EllipsisCount > 0
    bool                        DirtyLookupTables;  // 1     // out //
    float                       Scale;              // 4     // in  // = 1.f      // Base font scale, multiplied by the per-window font scale which you can adjust with SetWindowFontScale()
    float                       Ascent, Descent;    // 4+4   // out //            // Ascent: distance from top to bottom of e.g. 'A' [0..FontSize]
    int                         MetricsTotalSurface;// 4     // out //            // Total surface in pixels to get an idea of the font rasterization/texture cost (not exact, we approximate the cost of padding between glyphs)
    ImU8                        Used4kPagesMap[(IM_UNICODE_CODEPOINT_MAX+1)/4096/8]; // 2 bytes if ImWchar=ImWchar16, 34 bytes if ImWchar==ImWchar32. Store 1-bit for each block of 4K codepoints that has one active glyph. This is mainly used to facilitate iterations across all used codepoints.

    // Methods
    IMGUI_API ImFont();
    IMGUI_API ~ImFont();
    IMGUI_API const ImFontGlyph*FindGlyph(ImWchar c) const;
    IMGUI_API const ImFontGlyph*FindGlyphNoFallback(ImWchar c) const;
    float                       GetCharAdvance(ImWchar c) const     { return ((int)c < IndexAdvanceX.Size) ? IndexAdvanceX[(int)c] : FallbackAdvanceX; }
    bool                        IsLoaded() const                    { return ContainerAtlas != NULL; }
    const char*                 GetDebugName() const                { return ConfigData ? ConfigData->Name : "<unknown>"; }

    // 'max_width' stops rendering after a certain width (could be turned into a 2d size). FLT_MAX to disable.
    // 'wrap_width' enable automatic word-wrapping across multiple lines to fit into given width. 0.0f to disable.
    IMGUI_API ImVec2            CalcTextSizeA(float size, float max_width, float wrap_width, const char* text_begin, const char* text_end = NULL, const char** remaining = NULL) const; // utf8
    IMGUI_API const char*       CalcWordWrapPositionA(float scale, const char* text, const char* text_end, float wrap_width) const;
    IMGUI_API void              RenderChar(ImDrawList* draw_list, float size, const ImVec2& pos, ImU32 col, ImWchar c) const;
    IMGUI_API void              RenderText(ImDrawList* draw_list, float size, const ImVec2& pos, ImU32 col, const ImVec4& clip_rect, const char* text_begin, const char* text_end, float wrap_width = 0.0f, bool cpu_fine_clip = false) const;

    // [Internal] Don't use!
    IMGUI_API void              BuildLookupTable();
    IMGUI_API void              ClearOutputData();
    IMGUI_API void              GrowIndex(int new_size);
    IMGUI_API void              AddGlyph(const ImFontConfig* src_cfg, ImWchar c, float x0, float y0, float x1, float y1, float u0, float v0, float u1, float v1, float advance_x);
    IMGUI_API void              AddRemapChar(ImWchar dst, ImWchar src, bool overwrite_dst = true); // Makes 'dst' character/glyph points to 'src' character/glyph. Currently needs to be called AFTER fonts have been built.
    IMGUI_API void              SetGlyphVisible(ImWchar c, bool visible);
    IMGUI_API bool              IsGlyphRangeUnused(unsigned int c_begin, unsigned int c_last);
};
```

## ビューポート

`ImGuiViewport::Flags`に格納されているフラグで、プラットフォームのバックエンドに指示を与える。

```cpp
enum ImGuiViewportFlags_
{
    ImGuiViewportFlags_None                     = 0,
    ImGuiViewportFlags_IsPlatformWindow         = 1 << 0,   // Represent a Platform Window
    ImGuiViewportFlags_IsPlatformMonitor        = 1 << 1,   // Represent a Platform Monitor (unused yet)
    ImGuiViewportFlags_OwnedByApp               = 1 << 2,   // Platform Window: is created/managed by the application (rather than a dear imgui backend)
};
```

- 現在、親愛なるImGuiウィンドウをホストしているアプリケーションによって作成されたプラットフォームウィンドウを表しています。
- マルチビューポートを有効にした'ドッキング'ブランチでは、このコンセプトを拡張して、複数のアクティブビューポートを持つことができます。
- 将来的には、この概念をさらに拡張して、Platform Monitorも表現し、「メインプラットフォームウィンドウなし」の操作モードをサポートする予定です。
- メインエリアとワークエリアについて：
  - メインエリア＝ビューポート全体。
  - ワークエリア＝ビューポート全体から、メインメニューバー（プラットフォームウィンドウの場合）、またはタスクバー（プラットフォームモニターの場合）が使用する部分を除いたもの。
  - ウィンドウは通常、ホストビューポートのワークエリア内に留まろうとします。

```cpp
struct ImGuiViewport
{
    ImGuiViewportFlags  Flags;                  // See ImGuiViewportFlags_
    ImVec2              Pos;                    // Main Area: Position of the viewport (Dear ImGui coordinates are the same as OS desktop/native coordinates)
    ImVec2              Size;                   // Main Area: Size of the viewport.
    ImVec2              WorkPos;                // Work Area: Position of the viewport minus task bars, menus bars, status bars (>= Pos)
    ImVec2              WorkSize;               // Work Area: Size of the viewport minus task bars, menu bars, status bars (<= Size)

    // Platform/Backend Dependent Data
    void*               PlatformHandleRaw;      // void* to hold lower-level, platform-native window handle (under Win32 this is expected to be a HWND, unused for other platforms)

    ImGuiViewport()     { memset(this, 0, sizeof(*this)); }

    // Helpers
    ImVec2              GetCenter() const       { return ImVec2(Pos.x + Size.x * 0.5f, Pos.y + Size.y * 0.5f); }
    ImVec2              GetWorkCenter() const   { return ImVec2(WorkPos.x + WorkSize.x * 0.5f, WorkPos.y + WorkSize.y * 0.5f); }
};
```

## プラットフォーム依存のインターフェース

(オプション) `io.SetPlatformImeDataFn()`関数によるIME(Input Method Editor)のサポート。

```cpp
struct ImGuiPlatformImeData
{
    bool    WantVisible;
    ImVec2  InputPos;
    float   InputLineHeight;

    ImGuiPlatformImeData() { memset(this, 0, sizeof(*this)); }
};
```

|名前|説明|
|---|---|
| WantVisible        | ウィジェットはIMEを表示したい |
| InputPos           | 入力カーソルの位置 |
| InputLineHeight    | ラインの高さ |

## 廃止された関数と型

(Will be removed! Read 'API BREAKING CHANGES' section in imgui.cpp for details)

Please keep your copy of dear imgui up to date! Occasionally set '#define IMGUI_DISABLE_OBSOLETE_FUNCTIONS' in imconfig.h to stay ahead.

```cpp
namespace ImGui
{
#ifndef IMGUI_DISABLE_OBSOLETE_KEYIO
    IMGUI_API ImGuiKey     GetKeyIndex(ImGuiKey key);  // map ImGuiKey_* values into legacy native key index. == io.KeyMap[key]
#else
    static inline ImGuiKey GetKeyIndex(ImGuiKey key)   { IM_ASSERT(key >= ImGuiKey_NamedKey_BEGIN && key < ImGuiKey_NamedKey_END && "ImGuiKey and native_index was merged together and native_index is disabled by IMGUI_DISABLE_OBSOLETE_KEYIO. Please switch to ImGuiKey."); return key; }
#endif
}

#ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS
namespace ImGui
{
    // OBSOLETED in 1.89.7 (from June 2023)
    IMGUI_API void      SetItemAllowOverlap();                                              // Use SetNextItemAllowOverlap() before item.
    // OBSOLETED in 1.89.4 (from March 2023)
    static inline void  PushAllowKeyboardFocus(bool tab_stop)                               { PushTabStop(tab_stop); }
    static inline void  PopAllowKeyboardFocus()                                             { PopTabStop(); }
    // OBSOLETED in 1.89 (from August 2022)
    IMGUI_API bool      ImageButton(ImTextureID user_texture_id, const ImVec2& size, const ImVec2& uv0 = ImVec2(0, 0), const ImVec2& uv1 = ImVec2(1, 1), int frame_padding = -1, const ImVec4& bg_col = ImVec4(0, 0, 0, 0), const ImVec4& tint_col = ImVec4(1, 1, 1, 1)); // Use new ImageButton() signature (explicit item id, regular FramePadding)
    // OBSOLETED in 1.88 (from May 2022)
    static inline void  CaptureKeyboardFromApp(bool want_capture_keyboard = true)           { SetNextFrameWantCaptureKeyboard(want_capture_keyboard); } // Renamed as name was misleading + removed default value.
    static inline void  CaptureMouseFromApp(bool want_capture_mouse = true)                 { SetNextFrameWantCaptureMouse(want_capture_mouse); }       // Renamed as name was misleading + removed default value.
    // OBSOLETED in 1.86 (from November 2021)
    IMGUI_API void      CalcListClipping(int items_count, float items_height, int* out_items_display_start, int* out_items_display_end); // Calculate coarse clipping for large list of evenly sized items. Prefer using ImGuiListClipper.
    // OBSOLETED in 1.85 (from August 2021)
    static inline float GetWindowContentRegionWidth()                                       { return GetWindowContentRegionMax().x - GetWindowContentRegionMin().x; }

    // Some of the older obsolete names along with their replacement (commented out so they are not reported in IDE)
    //-- OBSOLETED in 1.81 (from February 2021)
    //static inline bool  ListBoxHeader(const char* label, const ImVec2& size = ImVec2(0, 0))         { return BeginListBox(label, size); }
    //static inline bool  ListBoxHeader(const char* label, int items_count, int height_in_items = -1) { float height = GetTextLineHeightWithSpacing() * ((height_in_items < 0 ? ImMin(items_count, 7) : height_in_items) + 0.25f) + GetStyle().FramePadding.y * 2.0f; return BeginListBox(label, ImVec2(0.0f, height)); } // Helper to calculate size from items_count and height_in_items
    //static inline void  ListBoxFooter()                                                             { EndListBox(); }
    //-- OBSOLETED in 1.79 (from August 2020)
    //static inline void  OpenPopupContextItem(const char* str_id = NULL, ImGuiMouseButton mb = 1)    { OpenPopupOnItemClick(str_id, mb); } // Bool return value removed. Use IsWindowAppearing() in BeginPopup() instead. Renamed in 1.77, renamed back in 1.79. Sorry!
    //-- OBSOLETED in 1.78 (from June 2020): Old drag/sliders functions that took a 'float power > 1.0f' argument instead of ImGuiSliderFlags_Logarithmic. See github.com/ocornut/imgui/issues/3361 for details.
    //IMGUI_API bool      DragScalar(const char* label, ImGuiDataType data_type, void* p_data, float v_speed, const void* p_min, const void* p_max, const char* format, float power = 1.0f)                                                            // OBSOLETED in 1.78 (from June 2020)
    //IMGUI_API bool      DragScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, float v_speed, const void* p_min, const void* p_max, const char* format, float power = 1.0f);                                          // OBSOLETED in 1.78 (from June 2020)
    //IMGUI_API bool      SliderScalar(const char* label, ImGuiDataType data_type, void* p_data, const void* p_min, const void* p_max, const char* format, float power = 1.0f);                                                                        // OBSOLETED in 1.78 (from June 2020)
    //IMGUI_API bool      SliderScalarN(const char* label, ImGuiDataType data_type, void* p_data, int components, const void* p_min, const void* p_max, const char* format, float power = 1.0f);                                                       // OBSOLETED in 1.78 (from June 2020)
    //static inline bool  DragFloat(const char* label, float* v, float v_speed, float v_min, float v_max, const char* format, float power = 1.0f)    { return DragScalar(label, ImGuiDataType_Float, v, v_speed, &v_min, &v_max, format, power); }     // OBSOLETED in 1.78 (from June 2020)
    //static inline bool  DragFloat2(const char* label, float v[2], float v_speed, float v_min, float v_max, const char* format, float power = 1.0f) { return DragScalarN(label, ImGuiDataType_Float, v, 2, v_speed, &v_min, &v_max, format, power); } // OBSOLETED in 1.78 (from June 2020)
    //static inline bool  DragFloat3(const char* label, float v[3], float v_speed, float v_min, float v_max, const char* format, float power = 1.0f) { return DragScalarN(label, ImGuiDataType_Float, v, 3, v_speed, &v_min, &v_max, format, power); } // OBSOLETED in 1.78 (from June 2020)
    //static inline bool  DragFloat4(const char* label, float v[4], float v_speed, float v_min, float v_max, const char* format, float power = 1.0f) { return DragScalarN(label, ImGuiDataType_Float, v, 4, v_speed, &v_min, &v_max, format, power); } // OBSOLETED in 1.78 (from June 2020)
    //static inline bool  SliderFloat(const char* label, float* v, float v_min, float v_max, const char* format, float power = 1.0f)                 { return SliderScalar(label, ImGuiDataType_Float, v, &v_min, &v_max, format, power); }            // OBSOLETED in 1.78 (from June 2020)
    //static inline bool  SliderFloat2(const char* label, float v[2], float v_min, float v_max, const char* format, float power = 1.0f)              { return SliderScalarN(label, ImGuiDataType_Float, v, 2, &v_min, &v_max, format, power); }        // OBSOLETED in 1.78 (from June 2020)
    //static inline bool  SliderFloat3(const char* label, float v[3], float v_min, float v_max, const char* format, float power = 1.0f)              { return SliderScalarN(label, ImGuiDataType_Float, v, 3, &v_min, &v_max, format, power); }        // OBSOLETED in 1.78 (from June 2020)
    //static inline bool  SliderFloat4(const char* label, float v[4], float v_min, float v_max, const char* format, float power = 1.0f)              { return SliderScalarN(label, ImGuiDataType_Float, v, 4, &v_min, &v_max, format, power); }        // OBSOLETED in 1.78 (from June 2020)
    //-- OBSOLETED in 1.77 and before
    //static inline bool  BeginPopupContextWindow(const char* str_id, ImGuiMouseButton mb, bool over_items) { return BeginPopupContextWindow(str_id, mb | (over_items ? 0 : ImGuiPopupFlags_NoOpenOverItems)); } // OBSOLETED in 1.77 (from June 2020)
    //static inline void  TreeAdvanceToLabelPos()               { SetCursorPosX(GetCursorPosX() + GetTreeNodeToLabelSpacing()); }   // OBSOLETED in 1.72 (from July 2019)
    //static inline void  SetNextTreeNodeOpen(bool open, ImGuiCond cond = 0) { SetNextItemOpen(open, cond); }                       // OBSOLETED in 1.71 (from June 2019)
    //static inline float GetContentRegionAvailWidth()          { return GetContentRegionAvail().x; }                               // OBSOLETED in 1.70 (from May 2019)
    //static inline ImDrawList* GetOverlayDrawList()            { return GetForegroundDrawList(); }                                 // OBSOLETED in 1.69 (from Mar 2019)
    //static inline void  SetScrollHere(float ratio = 0.5f)     { SetScrollHereY(ratio); }                                          // OBSOLETED in 1.66 (from Nov 2018)
    //static inline bool  IsItemDeactivatedAfterChange()        { return IsItemDeactivatedAfterEdit(); }                            // OBSOLETED in 1.63 (from Aug 2018)
    //-- OBSOLETED in 1.60 and before
    //static inline bool  IsAnyWindowFocused()                  { return IsWindowFocused(ImGuiFocusedFlags_AnyWindow); }            // OBSOLETED in 1.60 (from Apr 2018)
    //static inline bool  IsAnyWindowHovered()                  { return IsWindowHovered(ImGuiHoveredFlags_AnyWindow); }            // OBSOLETED in 1.60 (between Dec 2017 and Apr 2018)
    //static inline void  ShowTestWindow()                      { return ShowDemoWindow(); }                                        // OBSOLETED in 1.53 (between Oct 2017 and Dec 2017)
    //static inline bool  IsRootWindowFocused()                 { return IsWindowFocused(ImGuiFocusedFlags_RootWindow); }           // OBSOLETED in 1.53 (between Oct 2017 and Dec 2017)
    //static inline bool  IsRootWindowOrAnyChildFocused()       { return IsWindowFocused(ImGuiFocusedFlags_RootAndChildWindows); }  // OBSOLETED in 1.53 (between Oct 2017 and Dec 2017)
    //static inline void  SetNextWindowContentWidth(float w)    { SetNextWindowContentSize(ImVec2(w, 0.0f)); }                      // OBSOLETED in 1.53 (between Oct 2017 and Dec 2017)
    //static inline float GetItemsLineHeightWithSpacing()       { return GetFrameHeightWithSpacing(); }                             // OBSOLETED in 1.53 (between Oct 2017 and Dec 2017)
    //IMGUI_API bool      Begin(char* name, bool* p_open, ImVec2 size_first_use, float bg_alpha = -1.0f, ImGuiWindowFlags flags=0); // OBSOLETED in 1.52 (between Aug 2017 and Oct 2017): Equivalent of using SetNextWindowSize(size, ImGuiCond_FirstUseEver) and SetNextWindowBgAlpha().
    //static inline bool  IsRootWindowOrAnyChildHovered()       { return IsWindowHovered(ImGuiHoveredFlags_RootAndChildWindows); }  // OBSOLETED in 1.52 (between Aug 2017 and Oct 2017)
    //static inline void  AlignFirstTextHeightToWidgets()       { AlignTextToFramePadding(); }                                      // OBSOLETED in 1.52 (between Aug 2017 and Oct 2017)
    //static inline void  SetNextWindowPosCenter(ImGuiCond c=0) { SetNextWindowPos(GetMainViewport()->GetCenter(), c, ImVec2(0.5f,0.5f)); } // OBSOLETED in 1.52 (between Aug 2017 and Oct 2017)
    //static inline bool  IsItemHoveredRect()                   { return IsItemHovered(ImGuiHoveredFlags_RectOnly); }               // OBSOLETED in 1.51 (between Jun 2017 and Aug 2017)
    //static inline bool  IsPosHoveringAnyWindow(const ImVec2&) { IM_ASSERT(0); return false; }                                     // OBSOLETED in 1.51 (between Jun 2017 and Aug 2017): This was misleading and partly broken. You probably want to use the io.WantCaptureMouse flag instead.
    //static inline bool  IsMouseHoveringAnyWindow()            { return IsWindowHovered(ImGuiHoveredFlags_AnyWindow); }            // OBSOLETED in 1.51 (between Jun 2017 and Aug 2017)
    //static inline bool  IsMouseHoveringWindow()               { return IsWindowHovered(ImGuiHoveredFlags_AllowWhenBlockedByPopup | ImGuiHoveredFlags_AllowWhenBlockedByActiveItem); }       // OBSOLETED in 1.51 (between Jun 2017 and Aug 2017)
    //-- OBSOLETED in 1.50 and before
    //static inline bool  CollapsingHeader(char* label, const char* str_id, bool framed = true, bool default_open = false) { return CollapsingHeader(label, (default_open ? (1 << 5) : 0)); } // OBSOLETED in 1.49
    //static inline ImFont*GetWindowFont()                      { return GetFont(); }                                               // OBSOLETED in 1.48
    //static inline float GetWindowFontSize()                   { return GetFontSize(); }                                           // OBSOLETED in 1.48
    //static inline void  SetScrollPosHere()                    { SetScrollHere(); }                                                // OBSOLETED in 1.42
}

// OBSOLETED in 1.82 (from Mars 2021): flags for AddRect(), AddRectFilled(), AddImageRounded(), PathRect()
typedef ImDrawFlags ImDrawCornerFlags;
enum ImDrawCornerFlags_
{
    ImDrawCornerFlags_None      = ImDrawFlags_RoundCornersNone,         // Was == 0 prior to 1.82, this is now == ImDrawFlags_RoundCornersNone which is != 0 and not implicit
    ImDrawCornerFlags_TopLeft   = ImDrawFlags_RoundCornersTopLeft,      // Was == 0x01 (1 << 0) prior to 1.82. Order matches ImDrawFlags_NoRoundCorner* flag (we exploit this internally).
    ImDrawCornerFlags_TopRight  = ImDrawFlags_RoundCornersTopRight,     // Was == 0x02 (1 << 1) prior to 1.82.
    ImDrawCornerFlags_BotLeft   = ImDrawFlags_RoundCornersBottomLeft,   // Was == 0x04 (1 << 2) prior to 1.82.
    ImDrawCornerFlags_BotRight  = ImDrawFlags_RoundCornersBottomRight,  // Was == 0x08 (1 << 3) prior to 1.82.
    ImDrawCornerFlags_All       = ImDrawFlags_RoundCornersAll,          // Was == 0x0F prior to 1.82
    ImDrawCornerFlags_Top       = ImDrawCornerFlags_TopLeft | ImDrawCornerFlags_TopRight,
    ImDrawCornerFlags_Bot       = ImDrawCornerFlags_BotLeft | ImDrawCornerFlags_BotRight,
    ImDrawCornerFlags_Left      = ImDrawCornerFlags_TopLeft | ImDrawCornerFlags_BotLeft,
    ImDrawCornerFlags_Right     = ImDrawCornerFlags_TopRight | ImDrawCornerFlags_BotRight,
};

// RENAMED and MERGED both ImGuiKey_ModXXX and ImGuiModFlags_XXX into ImGuiMod_XXX (from September 2022)
// RENAMED ImGuiKeyModFlags -> ImGuiModFlags in 1.88 (from April 2022). Exceptionally commented out ahead of obscolescence schedule to reduce confusion and because they were not meant to be used in the first place.
typedef ImGuiKeyChord ImGuiModFlags;      // == int. We generally use ImGuiKeyChord to mean "a ImGuiKey or-ed with any number of ImGuiMod_XXX value", but you may store only mods in there.
enum ImGuiModFlags_ { ImGuiModFlags_None = 0, ImGuiModFlags_Ctrl = ImGuiMod_Ctrl, ImGuiModFlags_Shift = ImGuiMod_Shift, ImGuiModFlags_Alt = ImGuiMod_Alt, ImGuiModFlags_Super = ImGuiMod_Super };
//typedef ImGuiKeyChord ImGuiKeyModFlags; // == int
//enum ImGuiKeyModFlags_ { ImGuiKeyModFlags_None = 0, ImGuiKeyModFlags_Ctrl = ImGuiMod_Ctrl, ImGuiKeyModFlags_Shift = ImGuiMod_Shift, ImGuiKeyModFlags_Alt = ImGuiMod_Alt, ImGuiKeyModFlags_Super = ImGuiMod_Super };

#endif // #ifndef IMGUI_DISABLE_OBSOLETE_FUNCTIONS

// RENAMED IMGUI_DISABLE_METRICS_WINDOW > IMGUI_DISABLE_DEBUG_TOOLS in 1.88 (from June 2022)
#if defined(IMGUI_DISABLE_METRICS_WINDOW) && !defined(IMGUI_DISABLE_OBSOLETE_FUNCTIONS) && !defined(IMGUI_DISABLE_DEBUG_TOOLS)
#define IMGUI_DISABLE_DEBUG_TOOLS
#endif
#if defined(IMGUI_DISABLE_METRICS_WINDOW) && defined(IMGUI_DISABLE_OBSOLETE_FUNCTIONS)
#error IMGUI_DISABLE_METRICS_WINDOW was renamed to IMGUI_DISABLE_DEBUG_TOOLS, please use new name.
#endif

//-----------------------------------------------------------------------------

#if defined(__clang__)
#pragma clang diagnostic pop
#elif defined(__GNUC__)
#pragma GCC diagnostic pop
#endif

#ifdef _MSC_VER
#pragma warning (pop)
#endif

// Include imgui_user.h at the end of imgui.h (convenient for user to only explicitly include vanilla imgui.h)
#ifdef IMGUI_INCLUDE_IMGUI_USER_H
#include "imgui_user.h"
#endif

#endif // #ifndef IMGUI_DISABLE
```
