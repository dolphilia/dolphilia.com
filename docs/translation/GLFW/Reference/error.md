# エラーコード

これらの使用方法については、エラー処理を参照のこと。

[[TOC]]

## マクロ

|マクロ|説明|
|---|---|
| GLFW_NO_ERROR | エラーは発生していません。 |
| GLFW_NOT_INITIALIZED | GLFWが初期化されていない。 |
| GLFW_NO_CURRENT_CONTEXT | このスレッドには現在、何の脈絡もない。 |
| GLFW_INVALID_ENUM | 関数の引数の1つが無効な列挙型値であった。 |
| GLFW_INVALID_VALUE | 関数の引数の1つが無効な値だった。 |
| GLFW_OUT_OF_MEMORY | メモリの割り当てに失敗した。 |
| GLFW_API_UNAVAILABLE | GLFWはシステム上で要求されたAPIのサポートを見つけられませんでした。 |
| LFW_VERSION_UNAVAILABLE | 要求されたOpenGLまたはOpenGL ESのバージョンが利用できません。 |
| GLFW_PLATFORM_ERROR | より具体的なカテゴリのいずれにも一致しない、プラットフォーム固有のエラーが発生した。 |
| GLFW_FORMAT_UNAVAILABLE | 要求されたフォーマットはサポートされていないか、利用できません。 |
| GLFW_NO_WINDOW_CONTEXT | 指定されたウィンドウはOpenGLまたはOpenGL ESコンテキストを持っていません。 |

::: details GLFW_NO_ERROR
エラーは発生していません。

```c
#define GLFW_NO_ERROR   0
```

__分析__:

Yay.
:::

::: details GLFW_NOT_INITIALIZED
これは、ライブラリーが初期化されない限り呼んではならないGLFW関数が呼ばれた場合に発生する。

```c
#define GLFW_NOT_INITIALIZED   0x00010001
```

__分析__:

アプリケーションプログラマーのエラー。初期化を必要とする関数を呼び出す前に、GLFWを初期化してください。
:::

::: details GLFW_NO_CURRENT_CONTEXT
これは、現在のOpenGLまたはOpenGL ESコンテキストを必要とし、それを操作するGLFW関数が呼び出されたが、呼び出されたスレッドに現在のコンテキストがない場合に発生する。そのような関数の1つがglfwSwapIntervalである。

```c
#define GLFW_NO_CURRENT_CONTEXT   0x00010002
```

__分析__:

アプリケーション・プログラマーのエラー。現在のコンテキストを必要とする関数を呼び出す前に、コンテキストが最新であることを確認してください。
:::

::: details GLFW_INVALID_ENUM
関数の引数の1つが無効な列挙型値である。例えば、glfwGetWindowAttribでGLFW_RED_BITSを要求するなど。

```c
#define GLFW_INVALID_ENUM   0x00010003
```

__分析__:

アプリケーションプログラマーのエラー。問題の呼び出しを修正してください。
:::

::: details GLFW_INVALID_VALUE
関数の引数の1つが無効な値であった。例えば、存在しないOpenGLやOpenGL ESのバージョン2.7などを要求する。

有効だが利用できないOpenGLまたはOpenGL ESのバージョンを要求すると、代わりにGLFW_VERSION_UNAVAILABLEエラーが発生します。

```c
#define GLFW_INVALID_VALUE   0x00010004
```

__分析__:

アプリケーションプログラマーのエラー。問題の呼び出しを修正してください。
:::

::: details GLFW_OUT_OF_MEMORY
メモリの割り当てに失敗した。

```c
#define GLFW_OUT_OF_MEMORY   0x00010005
```

__分析__:

GLFWまたはオペレーティングシステムのバグ。私たちの課題追跡システムにバグを報告してください。
:::

::: details GLFW_API_UNAVAILABLE
GLFWはシステム上で要求されたAPIのサポートを見つけられませんでした。

```c
#define GLFW_API_UNAVAILABLE 0x00010006
```

__分析__:
インストールされているグラフィックドライバが要求されたAPIをサポートしていないか、選択したコンテキスト作成バックエンドでサポートしていない。以下にいくつかの例を示す。

プリインストールされているWindowsグラフィックドライバの中には、OpenGLをサポートしていないものがあります。AMDはEGL経由でのみOpenGL ESをサポートし、NvidiaとIntelはWGLまたはGLXエクステンション経由でのみサポートしています。Mesa EGL、OpenGL、OpenGL ESライブラリは、Nvidiaバイナリードライバとインターフェースしません。古いグラフィックドライバはVulkanをサポートしていません。
:::

::: details GLFW_VERSION_UNAVAILABLE
要求されたOpenGLまたはOpenGL ESのバージョン（要求されたコンテキストまたはフレームバッファヒントを含む）は、このマシンでは利用できません。

```c
#define GLFW_VERSION_UNAVAILABLE   0x00010007
```

__分析__:

マシンが要件をサポートしていません。アプリケーションに十分な柔軟性がある場合は、要件をダウングレードして再試行してください。そうでない場合は、マシンが要件に適合しないことをユーザーに通知してください。

将来の無効なOpenGLとOpenGL ESのバージョン、例えば、4.xシリーズがそこまで到達する前に5.0が出た場合、OpenGL 4.8も、GLFW_INVALID_VALUEではなく、このエラーで失敗します。
:::

::: details GLFW_PLATFORM_ERROR
より具体的なカテゴリのいずれにも一致しない、プラットフォーム固有のエラーが発生した。

```c
#define GLFW_PLATFORM_ERROR   0x00010008
```

__分析__:

GLFW、基礎となるオペレーティングシステムまたはそのドライバのバグまたは設定エラー、または必要なリソースの不足。私たちのissue trackerに問題を報告してください。
:::

::: details GLFW_FORMAT_UNAVAILABLE
ウィンドウ作成時に発行された場合、要求されたピクセルフォーマットはサポートされていません。

クリップボードへの問い合わせ時に発行された場合、クリップボードの内容を要求されたフォーマットに変換できませんでした。

```c
#define GLFW_FORMAT_UNAVAILABLE   0x00010009
```

__分析__:

ウィンドウの作成時に、1つまたは複数のハード制約が使用可能なピクセル形式のいずれにも一致しませんでした。アプリケーションに十分な柔軟性がある場合は、要件をダウングレードして再試行してください。そうでない場合は、そのマシンが要件にマッチしないことをユーザーに通知してください。

クリップボードへの問い合わせ時に発生した場合は、エラーを無視するか、ユーザーに報告してください。
:::

::: details GLFW_NO_WINDOW_CONTEXT
OpenGLまたはOpenGL ESコンテキストを持たないウィンドウが、それを必要とする関数に渡されました。

```c
#define GLFW_NO_WINDOW_CONTEXT   0x0001000A
```

__分析__:

アプリケーションプログラマーのエラー。問題の呼び出しを修正してください。
:::
