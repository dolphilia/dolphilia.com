# sokol_glue.h

sokol ヘッダ用の糊付けヘルパー関数

プロジェクトURL: https://github.com/floooh/sokol

このファイルをCまたはC++ファイルにインクルードして実装を作成する前に、

```c
#define SOKOL_IMPL
```

または

```c
#define SOKOL_GLUE_IMPL
```

を定義してください。


...オプションとして、デフォルトを上書きするために以下のマクロを提供します。

- SOKOL_ASSERT(c)     - 独自のアサートマクロ (デフォルト: assert(c))
- SOKOL_GLUE_API_DECL - 公開関数宣言のプレフィックス (デフォルト: extern)
- SOKOL_API_DECL      - SOKOL_GLUE_API_DECL と同じです。
- SOKOL_API_IMPL      - public 関数実装の接頭辞（デフォルト：-）。

sokol_glue.hをDLLとしてコンパイルする場合、宣言や実装を含める前に以下を定義してください。

`SOKOL_DLL`

Windowsでは、SOKOL_DLLは、必要に応じてSOKOL_GLUE_API_DECLを__declspec(dllexport) または __declspec(dllimport) として定義します。

## 概要

sokolコアヘッダは互いに依存してはいけませんが、時には2つ以上のsokolヘッダ間の「接着剤」としてヘルパー関数のセットを持つことが有用です。

そのために sokol_glue.h があります。このヘッダを他のsokolヘッダ（実装と宣言の両方）の後にインクルードするだけで、前にインクルードされたヘッダに応じて、sokol_glue.hが「グルー関数」を利用できるようにします。

## 提供する関数

sokol_app.hとsokol_gfx.hが含まれている場合:

```c
sg_context_desc sapp_sgcontext(void):
```

sokol_app.h の関数を呼び出して初期化した sg_context_desc 関数を返します。

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