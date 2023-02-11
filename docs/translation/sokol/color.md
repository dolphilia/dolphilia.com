# sokol_color.h

sg_colorユーティリティ

このヘッダはgen_sokol_color.pyによって生成されました。修正しないでください。

プロジェクトURL: https://github.com/floooh/sokol

sokol_color.h をインクルードする前に、以下のヘッダをインクルードしてください。:

- `sokol_gfx.h`

## 機能概要

sokol_color.h は X11 の色名に基づいたプリセットカラーを定義し、sg_color オブジェクトを作成および変更するユーティリティ関数と並行して提供します。

事前定義された色は X11 の色名に基づいています。

- https://en.wikipedia.org/wiki/X11_color_names

このパレットはプロトタイピングに便利です。多くのプログラマーは、X11、Web開発、XNA / MonoGameでこの色を使用しているため、この色になじみがあります。また、使い慣れた色を参照したいが、手書きで書き出したくない場合にも便利です。

## COLORS

パレットは，静的なconst（C++コンパイラを使用している場合はconstexpr）オブジェクトを使用して定義されます．これらのオブジェクトは小文字の名前を使用する。

```c
static SOKOL_COLOR_CONSTEXPR sg_color sg_red = SG_RED;
static SOKOL_COLOR_CONSTEXPR sg_color sg_green = SG_GREEN;
static SOKOL_COLOR_CONSTEXPR sg_color sg_blue = SG_BLUE;
```

sg_redのようなsg_colorプリセットオブジェクトはsg_pass_actionを初期化するために使用することができます。

```c
sg_pass_action pass_action = {
    .colors[0] = { .action=SG_ACTION_CLEAR, .value = sg_red }
};
```

静的な保存期間を持つオブジェクトの初期化は、C言語の規則により、より複雑になります。これを回避するために、パレットは中括弧で囲まれた一連のリストマクロ定義として定義されています。これらの定義では、大文字の名前を使用しています。

```c
#define SG_RED { 1.0f, 0.0f, 0.0f, 1.0f }
#define SG_GREEN { 0.0f, 1.0f, 0.0f, 1.0f }
#define SG_BLUE { 0.0f, 0.0f, 1.0f, 1.0f }
```

SG_RED のようなプリセットマクロは、静的な保存期間を持つオブジェクトを初期化するために使用することができます。

```c
static struct {
    sg_pass_action pass_action;
} state = {
    .pass_action = {
        .colors[0] = { .action = SG_ACTION_CLEAR, .value = SG_RED }
    }
};
```

32ビット整数値でパックされた色用のマクロ定義がもう一つ存在する。これらの定義も大文字ですが、_RGBA32 というサフィックスを使用します。

```c
#define SG_RED_RGBA32 0xFF0000FF
#define SG_GREEN_RGBA32 0x00FF00FF
#define SG_BLUE_RGBA32 0x0000FFFF
```

これは、sokol_gl.h がその内部頂点フォーマットに使用しているように、パックカラーを使用するコードであれば便利です。

```c
sgl_begin_triangles();
sgl_v2f_c1i( 0.0f,  0.5f, SG_RED_RGBA32);
sgl_v2f_c1i( 0.5f, -0.5f, SG_GREEN_RGBA32);
sgl_v2f_c1i(-0.5f, -0.5f, SG_BLUE_RGBA32);
sgl_end();
```

## UTILITY FUNCTIONS

カラーを作成するためのユーティリティ機能を提供します。

```c
sg_make_color_4b(uint8_t r, uint8_t g, uint8_t b, uint8_t a)
```

R, G, B, A の各バイトから sg_color オブジェクトを作成します。

```c
sg_make_color_1i(uint32_t rgba)
```

32ビット符号なし整数にパックされたRGBAバイトからsg_colorオブジェクトを作成します。

```c
sg_color_lerp(const sg_color* color_a, const sg_color* color_b, float amount)
```

色を直線的に補間する。

```c
sg_color_lerp_precise(const sg_color* color_a, const sg_color* color_b, float amount)
```

色を直線的に補間します。sg_color_lerp よりも効率は悪いが、より正確である。

```c
sg_color_multiply(const sg_color* color, float scale)
```

各色成分にスケールファクターを乗じる。


## LICENSE

zlib/libpng license

Copyright (c) 2020 Stuart Adams

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