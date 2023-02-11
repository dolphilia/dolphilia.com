# Nuklear

[![](https://github.com/Immediate-Mode-UI/Nuklear/workflows/C%2FC++%20CI/badge.svg )](https://github.com/Immediate-Mode-UI/Nuklear/actions)

これは、ANSI C で書かれたミニマルステート、イミディエイトモードのグラフィカルユーザーインターフェースツールキットで、パブリックドメインの下でライセンスされています。アプリケーションに簡単に組み込めるユーザインタフェースとして設計され、依存関係やデフォルトのレンダーバックエンド、OSのウィンドウ／入力処理を持たず、代わりに高度にモジュール化されたライブラリベースのアプローチを提供し、入力にはシンプルな入力ステート、出力にはプリミティブな形状を記述したドローコマンドを使用するようになっています。そのため、多くのプラットフォームやレンダーバックエンドを抽象化しようとするレイヤーライブラリを提供する代わりに、実際のUIにのみフォーカスしています。

## 特徴

- イミディエイトモード・グラフィカルユーザーインターフェース・ツールキット
- シングルヘッダーライブラリ
- C89 (ANSI C) で書かれています。
- 小さなコードベース (~18kLOC)
- 移植性、効率性、単純性に重点を置く
- 依存性なし (必要なければ標準ライブラリさえも)
- 完全なスキニングとカスタマイズが可能
- 低メモリフットプリントで、必要であればメモリ使用量を完全に制御可能
- UTF-8のサポート
- グローバルまたは非表示の状態なし
- カスタマイズ可能なライブラリモジュール（必要なものだけをコンパイルして使用することができます。）
- オプションでフォントベーカーと頂点バッファの出力が可能
- [ドキュメント](https://Immediate-Mode-UI.github.io/Nuklear/doc/nuklear.html)

## 建物

このライブラリは、1つのヘッダーファイルに自己完結しており、ヘッダーのみで使用するモードと、実装モードで使用するモードがあります。ヘッダーのみモードは、インクルード時にデフォルトで使用され、他のヘッダーの中にこのヘッダーを含めることができ、実際の実装は含まれません。

実装モードでは、プリプロセッサマクロ `NK_IMPLEMENTATION` を *one* .c/.cpp ファイルに定義してから、このファイルを `#include` する必要があります、例えば。

```c
#define NK_IMPLEMENTATION
#include "nuklear.h"
```

重要："nuklear.h" をインクルードするたびに、同じオプションのフラグを定義する必要があります。これは非常に重要なことで、これを行わないとコンパイラーエラーや、さらに悪いことにスタック破壊を引き起こす。

## ギャラリー

![screenshot](https://cloud.githubusercontent.com/assets/8057201/11761525/ae06f0ca-a0c6-11e5-819d-5610b25f6ef4.gif)
![screen](https://cloud.githubusercontent.com/assets/8057201/13538240/acd96876-e249-11e5-9547-5ac0b19667a0.png)
![screen2](https://cloud.githubusercontent.com/assets/8057201/13538243/b04acd4c-e249-11e5-8fd2-ad7744a5b446.png)
![node](https://cloud.githubusercontent.com/assets/8057201/9976995/e81ac04a-5ef7-11e5-872b-acd54fbeee03.gif)
![skinning](https://cloud.githubusercontent.com/assets/8057201/15991632/76494854-30b8-11e6-9555-a69840d0d50b.png)
![gamepad](https://cloud.githubusercontent.com/assets/8057201/14902576/339926a8-0d9c-11e6-9fee-a8b73af04473.png)

## 例

```c
/* init gui state */
struct nk_context ctx;
nk_init_fixed(&ctx, calloc(1, MAX_MEMORY), MAX_MEMORY, &font);

enum {EASY, HARD};
static int op = EASY;
static float value = 0.6f;
static int i =  20;

if (nk_begin(&ctx, "Show", nk_rect(50, 50, 220, 220),
    NK_WINDOW_BORDER|NK_WINDOW_MOVABLE|NK_WINDOW_CLOSABLE)) {
    /* fixed widget pixel width */
    nk_layout_row_static(&ctx, 30, 80, 1);
    if (nk_button_label(&ctx, "button")) {
        /* event handling */
    }

    /* fixed widget window ratio width */
    nk_layout_row_dynamic(&ctx, 30, 2);
    if (nk_option_label(&ctx, "easy", op == EASY)) op = EASY;
    if (nk_option_label(&ctx, "hard", op == HARD)) op = HARD;

    /* custom widget pixel width */
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

![example](https://cloud.githubusercontent.com/assets/8057201/10187981/584ecd68-675c-11e5-897c-822ef534a876.png)

## バインディング

他の作者によって、さまざまな言語用のnuklearバインディングが作成されています。私はこれらの言語のいずれにも精通しているわけではないので、その品質を保証することはできません。また、すべてのバインディングが常に最新である保証はありません。

- [Java](https://github.com/glegris/nuklear4j) by Guillaume Legris
- [D](https://github.com/Timu5/bindbc-nuklear) by Mateusz Muszyński
- [Golang](https://github.com/golang-ui/nuklear) by golang-ui@github.com
- [Rust](https://github.com/snuk182/nuklear-rust) by snuk182@github.com
- [Chicken](https://github.com/wasamasa/nuklear) by wasamasa@github.com
- [Nim](https://github.com/zacharycarter/nuklear-nim) by zacharycarter@github.com
- Lua
  - [LÖVE-Nuklear](https://github.com/keharriso/love-nuklear) by Kevin Harrison
  - [MoonNuklear](https://github.com/stetre/moonnuklear) by Stefano Trettel
- Python
  - [pyNuklear](https://github.com/billsix/pyNuklear) by William Emerison Six (ctypes-based wrapper)
  - [pynk](https://github.com/nathanrw/nuklear-cffi) by nathanrw@github.com (cffi binding)
- [CSharp/.NET](https://github.com/cartman300/NuklearDotNet) by cartman300@github.com
- [V](https://github.com/nsauzede/vnk) by Nicolas Sauzede

## クレジット

開発：Micha Mettke、およびGitHubに直接または間接的に貢献したすべての人々。

Sean Barrett氏による `stb_texedit`、`stb_truetype`、`stb_rectpack` を埋め込みます（パブリックドメイン） Tristan Grimmer氏による `ProggyClean.ttf` フォントを埋め込みます（MITライセンス）。

Omar Cornut (ocornut@github) の [imgui](https://github.com/ocornut/imgui) ライブラリとこのライブラリのインスピレーション、Casey Muratori の handmade hero と彼のオリジナル即時モードグラフィックユーザーインターフェースのアイデア、Sean Barrett の素晴らしいシングルヘッダ [libraries](https://github.com/nothings/stb) は私のライブラリへの信頼を取り戻し、私自身のライブラリを作成するきっかけとなりました。最後に、Apoorva Joshi のシングルヘッダ [file packer](http://apoorvaj.io/single-header-packer.html)です。

## License

```
------------------------------------------------------------------------------
This software is available under 2 licenses -- choose whichever you prefer.
------------------------------------------------------------------------------
ALTERNATIVE A - MIT License
Copyright (c) 2017 Micha Mettke
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
-----------------------------------------------------------------------------
```

## Reviewers guide

When reviewing pull request there are common things a reviewer should keep
in mind.

Reviewing changes to `src/*` and `nuklear.h`:

* Ensure C89 compatibility.
* The code should work for several backends to an acceptable degree.
* Check no other parts of `nuklear.h` are related to the PR and thus nothing is missing.
* Recommend simple optimizations.
  * Pass small structs by value instead of by pointer.
  * Use local buffers over heap allocation when possible.
* Check that the coding style is consistent with code around it.
  * Variable/function name casing.
  * Indentation.
  * Curly bracket (`{}`) placement.
* Ensure that the contributor has bumped the appropriate version in
  [clib.json](https://github.com/Immediate-Mode-UI/Nuklear/blob/master/clib.json)
  and added their changes to the
  [CHANGELOG](https://github.com/Immediate-Mode-UI/Nuklear/blob/master/src/CHANGELOG).
* Have at least one other person review the changes before merging.

Reviewing changes to `demo/*`, `example/*` and other files in the repo:

* Focus on getting working code merged.
  * We want to make it easy for people to get started with Nuklear, and any
    `demo` and `example` improvements helps in this regard.
* Use of newer C features, or even other languages is not discouraged.
  * If another language is used, ensure that the build process is easy to figure out.
* Messy or less efficient code can be merged so long as these outliers are pointed out
  and easy to find.
* Version shouldn't be bumped for these changes.
* Changes that improves code to be more inline with `nuklear.h` are ofc always welcome.
