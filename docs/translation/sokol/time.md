# sokol_time.h

シンプルなクロスプラットフォームの時間測定

プロジェクトURL: https://github.com/floooh/sokol

このファイルをCまたはC++ファイルにインクルードする前に実装を作成します。

```c
#define SOKOL_IMPL
```

または

```c
#define SOKOL_TIME_IMPL
```

オプションとして、以下の定義を独自の実装で提供する:

- SOKOL_ASSERT(c)     - 独自のアサートマクロ (デフォルト: assert(c))
- SOKOL_TIME_API_DECL - 公開関数宣言のプレフィックス (デフォルト: extern)
- SOKOL_API_DECL      - SOKOL_TIME_API_DECL と同じ。
- SOKOL_API_IMPL      - public 関数実装の接頭辞（デフォルト：-）。

sokol_time.hがDLLとしてコンパイルされた場合、宣言または実装を含む前に以下を定義します。:

- SOKOL_DLL

Windowsでは、SOKOL_DLLは必要に応じて、SOKOL_TIME_API_DECLを__declspec(dllexport) または __declspec(dllimport) として定義します。

```c
void stm_setup();
```

sokol_timeを初期化するために他の関数の前に一度だけ呼び出す (これは例えばWindowsのQueryPerformanceFrequencyのように呼び出す)

```c
uint64_t stm_now();
```

現在の時刻を不特定の 'ticks' 単位で取得する。返される値は、「壁時計」の時間とは関係なく、また特定の時間単位でもなく、時差を計算するためにのみ有用である。

```c
uint64_t stm_diff(uint64_t new, uint64_t old);
```

新旧の時間差を計算する。これは常に正の、ゼロでない値を返す。

```c
uint64_t stm_since(uint64_t start);
```

現在時刻を取得し、開始からの経過時間を返す (これは "stm_diff(stm_now(), start)" のショートカットである)

```c
uint64_t stm_laptime(uint64_t* last_time);
```

これは、フレーム時間やその他の繰り返し発生するイベントの測定に便利である。現在の時刻を受け取り、last_time の値との時間差を返し、次の呼び出しのために last_time に現在の時刻を格納する。last_timeの値が0であれば、戻り値は0になる（これは通常、一番最初の呼び出しで起こる）。

```c
uint64_t stm_round_to_common_refresh_rate(uint64_t duration)
```

この奇妙な名前の関数は、測定されたフレーム時間を受け取り、最も近い「近くの」一般的なディスプレイのリフレッシュレートのフレーム時間をticksで返します。入力期間がどの一般的なディスプレイのリフレッシュレートにも近いものでない場合、入力期間はフォールバックとして変更されずに返されます。この関数の主な目的は、測定されたフレーム時間からジッター/不正確さを取り除き、代わりにフレーム時間としてディスプレイのリフレッシュレートを使用することです。

> 注: より強固なフレームタイミングを得るには、sokol_app.h の関数 sapp_frame_duration() の利用を検討してください。

ティック単位の継続時間を有用な時間単位に変換するには、以下の関数を使用します:

```c
double stm_sec(uint64_t ticks);
double stm_ms(uint64_t ticks);
double stm_us(uint64_t ticks);
double stm_ns(uint64_t ticks);
```

ティック値を秒、ミリ秒、マイクロ秒、ナノ秒に変換します。すべてのプラットフォームがナノ秒やマイクロ秒の精度を持つわけではないことに注意してください。

ボンネットの中で以下の時間測定機能を使用します。:

- Windows:        QueryPerformanceFrequency() / QueryPerformanceCounter()
- MacOS/iOS:      mach_absolute_time()
- emscripten:     emscripten_get_now()
- Linux+others:   clock_gettime(CLOCK_MONOTONIC)

## zlib/libpng license

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