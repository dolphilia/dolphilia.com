# Window

ウィンドウの作成、削除、イベント・ポーリングなど、ウィンドウに関連する関数やタイプのリファレンス・ドキュメントです。より詳細な情報については、Windowガイドを参照してください。

[[TOC]]

## マクロ

| 名前                          | 説明                                                               |
|-------------------------------|--------------------------------------------------------------------|
| GLFW_FOCUSED                  | 入力フォーカスウィンドウのヒントと属性。                           |
| GLFW_ICONIFIED                | ウィンドウのアイコン化ウィンドウ属性。                             |
| GLFW_RESIZABLE                | ウィンドウのリサイズが可能なウィンドウのヒントと属性。             |
| GLFW_VISIBLE                  | Window visibility ウィンドウのヒントと属性。                       |
| GLFW_DECORATED                | ウィンドウの装飾 ウィンドウのヒントと属性                          |
| GLFW_AUTO_ICONIFY             | ウィンドウの自動アイコン化のヒントと属性。                         |
| GLFW_FLOATING                 | ウィンドウの装飾 ウィンドウのヒントと属性                          |
| GLFW_MAXIMIZED                | ウィンドウの最大化のヒントと属性。                                 |
| GLFW_CENTER_CURSOR            | カーソルのセンタリングウィンドウのヒント。                         |
| GLFW_TRANSPARENT_FRAMEBUFFER  | ウィンドウのフレームバッファの透明度のヒントと属性。               |
| GLFW_HOVERED                  | マウスカーソルのホバーウィンドウ属性。                             |
| GLFW_FOCUS_ON_SHOW            | ショーウィンドウのヒントと属性を呼び出す際にフォーカスを入力する。 |
| GLFW_RED_BITS                 | フレームバッファのビット深度のヒント。                             |
| GLFW_GREEN_BITS               | フレームバッファのビット深度のヒント。                             |
| GLFW_BLUE_BITS                | フレームバッファのビット深度のヒント。                             |
| GLFW_ALPHA_BITS               | フレームバッファのビット深度のヒント。                             |
| GLFW_DEPTH_BITS               | フレームバッファのビット深度のヒント。                             |
| GLFW_STENCIL_BITS             | フレームバッファのビット深度のヒント。                             |
| GLFW_ACCUM_RED_BITS           | フレームバッファのビット深度のヒント。                             |
| GLFW_ACCUM_GREEN_BITS         | フレームバッファのビット深度のヒント。                             |
| GLFW_ACCUM_BLUE_BITS          | フレームバッファのビット深度のヒント。                             |
| GLFW_ACCUM_ALPHA_BITS         | フレームバッファのビット深度のヒント。                             |
| GLFW_AUX_BUFFERS              | フレームバッファ補助バッファのヒント。                             |
| GLFW_STEREO                   | OpenGL ステレオスコピックレンダリングのヒント。                    |
| GLFW_SAMPLES                  | フレームバッファMSAAサンプルのヒント。                             |
| GLFW_SRGB_CAPABLE             | フレームバッファのsRGBヒント。                                     |
| GLFW_REFRESH_RATE             | モニターのリフレッシュレートのヒント。                             |
| GLFW_DOUBLEBUFFER             | フレームバッファのダブルバッファリングのヒント。                   |
| GLFW_CLIENT_API               | コンテキスト・クライアント API のヒントと属性。                    |
| GLFW_CONTEXT_VERSION_MAJOR    | コンテキストクライアントAPIのメジャーバージョンのヒントと属性。    |
| GLFW_CONTEXT_VERSION_MINOR    | コンテキストクライアントAPIのマイナーバージョンのヒントと属性。    |
| GLFW_CONTEXT_REVISION         | コンテキスト・クライアントAPIのリビジョン番号属性。                |
| GLFW_CONTEXT_ROBUSTNESS       | コンテキストの堅牢性のヒントと属性。                               |
| GLFW_OPENGL_FORWARD_COMPAT    | OpenGLの前方互換性のヒントと属性。                                 |
| GLFW_OPENGL_DEBUG_CONTEXT     | デバッグモードのコンテキストヒントと属性。                         |
| GLFW_OPENGL_PROFILE           | OpenGLプロファイルのヒントと属性。                                 |
| GLFW_CONTEXT_RELEASE_BEHAVIOR | コンテキストのフラッシュオンリリースのヒントと属性。               |
| GLFW_CONTEXT_NO_ERROR         | コンテキストエラー抑制のヒントと属性。                             |
| GLFW_CONTEXT_CREATION_API     | コンテキスト作成APIのヒントと属性。                                |
| GLFW_SCALE_TO_MONITOR         | ウィンドウ内容領域のスケーリングウィンドウウィンドウのヒント。     |
| GLFW_COCOA_RETINA_FRAMEBUFFER | macOS固有のウィンドウヒント。                                      |
| GLFW_COCOA_FRAME_NAME         | macOS固有のウィンドウヒント。                                      |
| GLFW_COCOA_GRAPHICS_SWITCHING | macOS固有のウィンドウヒント。                                      |
| GLFW_X11_CLASS_NAME           | X11固有のウィンドウヒント。                                        |
| GLFW_X11_INSTANCE_NAME        | X11固有のウィンドウヒント。                                        |

::: details GLFW_FOCUSED
入力フォーカスのウィンドウヒントまたはウィンドウ属性。

```c
#define GLFW_FOCUSED   0x00020001
```

:::

::: details GLFW_ICONIFIED
ウィンドウのアイコン化ウィンドウ属性。

```c
#define GLFW_ICONIFIED   0x00020002
```

:::

::: details GLFW_RESIZABLE
ウィンドウのサイズ変更可能なウィンドウヒントとウィンドウ属性。

```c
#define GLFW_RESIZABLE   0x00020003
```

:::

::: details GLFW_VISIBLE
ウィンドウの可視性ウィンドウのヒントとウィンドウの属性。

```c
#define GLFW_VISIBLE   0x00020004
```

:::

::: details GLFW_DECORATED
ウィンドウの装飾 ウィンドウのヒントとウィンドウの属性。

```c
#define GLFW_DECORATED   0x00020005
```

:::

::: details GLFW_AUTO_ICONIFY
ウィンドウの自動アイコン化ウィンドウヒントとウィンドウ属性。

```c
#define GLFW_AUTO_ICONIFY   0x00020006
```

:::

::: details GLFW_FLOATING
ウィンドウの装飾 ウィンドウのヒントとウィンドウの属性。

```c
#define GLFW_FLOATING   0x00020007
```

:::

::: details GLFW_MAXIMIZED
ウィンドウの最大化ウィンドウヒントとウィンドウ属性。

```c
#define GLFW_MAXIMIZED   0x00020008
```

:::

::: details GLFW_CENTER_CURSOR
カーソルのセンタリングウィンドウのヒント。

```c
#define GLFW_CENTER_CURSOR   0x00020009
```

:::

::: details GLFW_TRANSPARENT_FRAMEBUFFER
ウィンドウ・フレームバッファの透明度ウィンドウ・ヒントとウィンドウ属性。

```c
#define GLFW_TRANSPARENT_FRAMEBUFFER   0x0002000A
```

:::

::: details GLFW_HOVERED
マウスカーソルのホバーウィンドウ属性。

```c
#define GLFW_HOVERED   0x0002000B
```

:::

::: details GLFW_FOCUS_ON_SHOW
入力フォーカスのウィンドウヒントまたはウィンドウ属性。

```c
#define GLFW_FOCUS_ON_SHOW   0x0002000C
```

:::

::: details GLFW_RED_BITS
フレームバッファのビット深度のヒント。

```c
#define GLFW_RED_BITS   0x00021001
```

:::

::: details GLFW_GREEN_BITS
フレームバッファのビット深度のヒント。

```c
#define GLFW_GREEN_BITS   0x00021002
```

:::

::: details GLFW_BLUE_BITS
フレームバッファのビット深度のヒント。

```c
#define GLFW_BLUE_BITS   0x00021003
```

:::

::: details GLFW_ALPHA_BITS
フレームバッファのビット深度のヒント。

```c
#define GLFW_ALPHA_BITS   0x00021004
```

:::

::: details GLFW_DEPTH_BITS
フレームバッファのビット深度のヒント。

```c
#define GLFW_DEPTH_BITS   0x00021005
```

:::

::: details GLFW_STENCIL_BITS
フレームバッファのビット深度のヒント。

```c
#define GLFW_STENCIL_BITS   0x00021006
```

:::

::: details GLFW_ACCUM_RED_BITS
フレームバッファのビット深度のヒント。

```c
#define GLFW_ACCUM_RED_BITS   0x00021007
```

:::

::: details GLFW_ACCUM_GREEN_BITS
フレームバッファのビット深度のヒント。

```c
#define GLFW_ACCUM_GREEN_BITS   0x00021008
```

:::

::: details GLFW_ACCUM_BLUE_BITS
フレームバッファのビット深度のヒント。

```c
#define GLFW_ACCUM_BLUE_BITS   0x00021009
```

:::

::: details GLFW_ACCUM_ALPHA_BITS
フレームバッファのビット深度のヒント。

```c
#define GLFW_ACCUM_ALPHA_BITS   0x0002100A
```

:::

::: details GLFW_AUX_BUFFERS
フレームバッファ補助バッファのヒント。

```c
#define GLFW_AUX_BUFFERS   0x0002100B
```

:::

::: details GLFW_STEREO
OpenGL ステレオスコピックレンダリングのヒント。

```c
#define GLFW_STEREO   0x0002100C
```

:::

::: details GLFW_SAMPLES
フレームバッファMSAAサンプルのヒント。

```c
#define GLFW_SAMPLES   0x0002100D
```

:::

::: details GLFW_SRGB_CAPABLE
フレームバッファのsRGBヒント。

```c
#define GLFW_SRGB_CAPABLE   0x0002100E
```

:::

::: details GLFW_REFRESH_RATE
モニターのリフレッシュレートのヒント。

```c
#define GLFW_REFRESH_RATE   0x0002100F
```

:::

::: details GLFW_DOUBLEBUFFER
フレームバッファのダブルバッファリングのヒント。

```c
#define GLFW_DOUBLEBUFFER   0x00021010
```

:::

::: details GLFW_CLIENT_API
コンテキスト・クライアント API のヒントと属性。

```c
#define GLFW_CLIENT_API   0x00022001
```

:::

::: details GLFW_CONTEXT_VERSION_MAJOR
コンテキストクライアントAPIのメジャーバージョンのヒントと属性。

```c
#define GLFW_CONTEXT_VERSION_MAJOR   0x00022002
```

:::

::: details GLFW_CONTEXT_VERSION_MINOR
コンテキストクライアントAPIのマイナーバージョンのヒントと属性。

```c
#define GLFW_CONTEXT_VERSION_MINOR   0x00022003
```

:::

::: details GLFW_CONTEXT_REVISION
コンテキスト・クライアントAPIのリビジョン番号属性。

```c
#define GLFW_CONTEXT_REVISION   0x00022004
```

:::

::: details GLFW_CONTEXT_ROBUSTNESS
コンテキスト・クライアントAPIのリビジョン番号のヒントと属性。

```c
#define GLFW_CONTEXT_ROBUSTNESS   0x00022005
```

:::

::: details GLFW_OPENGL_FORWARD_COMPAT
OpenGLの前方互換性のヒントと属性。

```c
#define GLFW_OPENGL_FORWARD_COMPAT   0x00022006
```

:::

::: details GLFW_OPENGL_DEBUG_CONTEXT
デバッグモードのコンテキストヒントと属性。

```c
#define GLFW_OPENGL_DEBUG_CONTEXT   0x00022007
```

:::

::: details GLFW_OPENGL_PROFILE
OpenGLプロファイルのヒントと属性。

```c
#define GLFW_OPENGL_PROFILE   0x00022008
```

:::

::: details GLFW_CONTEXT_RELEASE_BEHAVIOR
コンテキストのフラッシュオンリリースのヒントと属性。

```c
#define GLFW_CONTEXT_RELEASE_BEHAVIOR   0x00022009
```

:::

::: details GLFW_CONTEXT_NO_ERROR
コンテキストエラー抑制のヒントと属性。

```c
#define GLFW_CONTEXT_NO_ERROR   0x0002200A
```

:::

::: details GLFW_CONTEXT_CREATION_API
コンテキスト作成APIのヒントと属性。

```c
#define GLFW_CONTEXT_CREATION_API   0x0002200B
```

:::

::: details GLFW_SCALE_TO_MONITOR

```c
#define GLFW_SCALE_TO_MONITOR   0x0002200C
```

:::

::: details GLFW_COCOA_RETINA_FRAMEBUFFER

```c
#define GLFW_COCOA_RETINA_FRAMEBUFFER   0x00023001
```

:::

::: details GLFW_COCOA_FRAME_NAME

```c
#define GLFW_COCOA_FRAME_NAME   0x00023002
```

:::

::: details GLFW_COCOA_GRAPHICS_SWITCHING

```c
#define GLFW_COCOA_GRAPHICS_SWITCHING   0x00023003
```

:::

::: details GLFW_X11_CLASS_NAME

```c
#define GLFW_X11_CLASS_NAME   0x00024001
```

:::

::: details GLFW_X11_INSTANCE_NAME

```c
#define GLFW_X11_INSTANCE_NAME   0x00024002
```

:::

## 型定義

| 名前                              | 説明                                                            |
|-----------------------------------|-----------------------------------------------------------------|
| struct GLFWwindow                 | 不透明なウィンドウオブジェクト。                                           |
| void(* GLFWwindowposfun)          | ウィンドウ位置コールバックの関数ポインタタイプ。        |
| void(* GLFWwindowsizefun)         | ウィンドウサイズ・コールバックの関数ポインタ型。            |
| void(* GLFWwindowclosefun)        | ウィンドウを閉じるコールバックの関数ポインタの型。           |
| void(* GLFWwindowrefreshfun)      | ウィンドウ内容更新コールバックの関数ポインタ型。 |
| void(* GLFWwindowfocusfun)        | ウィンドウフォーカスコールバック用の関数ポインタタイプ。           |
| void(* GLFWwindowiconifyfun)      | ウィンドウアイコン化コールバックの関数ポインタタイプ。         |
| void(* GLFWwindowmaximizefun)     | ウィンドウ最大化コールバックの関数ポインタタイプ。        |
| void(* GLFWframebuffersizefun)    | フレームバッファサイズコールバック用の関数ポインタタイプ。       |
| void(* GLFWwindowcontentscalefun) | ウィンドウコンテンツスケールコールバック用の関数ポインタタイプ。   |
| struct GLFWimage                  | 画像データ。                                                     |

::: details `struct GLFWwindow`
不透明なウィンドウオブジェクト。

```c
typedef struct GLFWwindow GLFWwindow
```

__参照__:

- Window objects

__追加__:

バージョン3.0で追加。
:::

::: details `void(* GLFWwindowposfun)`
これは、ウィンドウ位置コールバック用の関数ポインタ型である。ウィンドウ位置コールバック関数は以下のシグネチャを持ちます：

```c
void callback_name(GLFWwindow* window, int xpos, int ypos)
```

---

```c
typedef void(* GLFWwindowposfun) (GLFWwindow *window, int xpos, int ypos)
```

__引数__:

- `[in] window`: 動かされたウィンドウ。
- `[in] xpos`: ウィンドウのコンテンツ領域の左上隅の、スクリーン座標での新しいx座標。
- `[in] ypos`: ウィンドウのコンテンツ領域の左上隅の、スクリーン座標での新しいy座標。

__参照__:

- Window position
- glfwSetWindowPosCallback

__追加__:

バージョン3.0で追加。
:::

::: details `void(* GLFWwindowsizefun)`
これは、ウィンドウサイズ・コールバック用の関数ポインタ型である。ウィンドウサイズ・コールバック関数は以下のシグネチャを持つ：

```c
void callback_name(GLFWwindow* window, int width, int height)
```

---

```c
typedef void(* GLFWwindowsizefun) (GLFWwindow *window, int width, int height)
```

__引数__:

- `[in] window`: リサイズされたウィンドウ。
- `[in] width`: ウィンドウの新しい幅をスクリーン座標で指定する。
- `[in] height`: ウィンドウの新しい高さをスクリーン座標で指定する。

__参照__:

- Window size
- glfwSetWindowSizeCallback

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `void(* GLFWwindowclosefun)`
これは、ウィンドウを閉じるコールバック用の関数ポインタ型である。ウィンドウを閉じるコールバック関数は以下のシグネチャを持つ：

```c
void function_name(GLFWwindow* window)
```

---

```c
typedef void(* GLFWwindowclosefun) (GLFWwindow *window)
```

__引数__:

- `[in] window`: ユーザーが閉じようとしたウィンドウ。

__参照__:

- Window closing and close flag
- glfwSetWindowCloseCallback

__追加__:

バージョン2.5で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `void(* GLFWwindowrefreshfun)`
これは、ウィンドウ・コンテンツ・リフレッシュ・コールバック用の関数ポインタ型である。ウィンドウ・コンテンツ更新コールバック関数は以下のシグネチャを持ちます：

```c
void function_name(GLFWwindow* window);
```

---

```c
typedef void(* GLFWwindowrefreshfun) (GLFWwindow *window)
```

__引数__:

- `[in] window`: 内容を更新する必要があるウィンドウ。

__参照__:

- Window damage and refresh
- glfwSetWindowRefreshCallback

__追加__:

バージョン2.5で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `void(* GLFWwindowfocusfun)`
これはウィンドウ・フォーカス・コールバック用の関数ポインタ型である。ウィンドウ・フォーカス・コールバック関数は以下のシグネチャを持ちます：

```c
void function_name(GLFWwindow* window, int focused)
```

---

```c
typedef void(* GLFWwindowfocusfun) (GLFWwindow *window, int focused)
```

__引数__:

- `[in] window`: 入力フォーカスを得た、または失ったウィンドウ。
- `[in] focused`: ウィンドウに入力フォーカスが与えられた場合はGLFW_TRUE、失われた場合はGLFW_FALSE。

__参照__:

- Window input focus
- glfwSetWindowFocusCallback

__追加__:

バージョン3.0で追加。
:::

::: details `void(* GLFWwindowiconifyfun)`
これはウィンドウ・アイコニファイ・コールバック用の関数ポインタ型である。ウィンドウアイコニファイコールバック関数は以下のシグネチャを持ちます：

```c
void function_name(GLFWwindow* window, int iconified)
```

---

```c
typedef void(* GLFWwindowiconifyfun) (GLFWwindow *window, int iconified)
```

__引数__:

- `[in] window`: アイコン化または復元されたウィンドウ。
- `[in] iconified`: ウィンドウがアイコン化された場合はGLFW_TRUE、復元された場合はGLFW_FALSE。

__参照__:

- Window iconification
- glfwSetWindowIconifyCallback

__追加__:

バージョン3.0で追加。
:::

::: details `void(* GLFWwindowmaximizefun)`
これは、ウィンドウの最大化コールバック用の関数ポインタ型である。ウィンドウ最大化コールバック関数のシグネチャは以下のとおりです：

```c
void function_name(GLFWwindow* window, int maximized)
```

---

```c
typedef void(* GLFWwindowmaximizefun) (GLFWwindow *window, int maximized)
```

__引数__:

- `[in] window`: 最大化または復元されたウィンドウ。
- `[in] maximized`: ウィンドウが最大化された場合はGLFW_TRUE、復元された場合はGLFW_FALSE。

__参照__:

- Window maximization
- glfwSetWindowMaximizeCallback

__追加__:

バージョン3.3で追加。
:::

::: details `void(* GLFWframebuffersizefun)`
これは、フレームバッファ・サイズ・コールバック用の関数ポインタ型である。フレームバッファ・サイズ・コールバック関数は以下のシグネチャを持つ：

```c
void function_name(GLFWwindow* window, int width, int height)
```

---

```c
typedef void(* GLFWframebuffersizefun) (GLFWwindow *window, int width, int height)
```

__引数__:

- `[in] window`: フレームバッファがリサイズされたウィンドウ。
- `[in] width`: フレームバッファの新しい幅（ピクセル単位）。
- `[in] height`: フレームバッファの新しい高さ（ピクセル単位）。

__参照__:

- Framebuffer size
- glfwSetFramebufferSizeCallback

__追加__:

バージョン3.0で追加。
:::

::: details `void(* GLFWwindowcontentscalefun)`
これは、ウィンドウコンテンツスケールコールバック用の関数ポインタタイプです。ウィンドウコンテンツスケールコールバック関数のシグネチャは次のとおりです：

```c
void function_name(GLFWwindow* window, float xscale, float yscale)
```

---

```c
typedef void(* GLFWwindowcontentscalefun) (GLFWwindow *window, float xscale, float yscale)
```

__引数__:

- `[in] window`: 内容スケールが変更されたウィンドウ。
- `[in] xscale`: ウィンドウの新しいX軸の内容スケール。
- `[in] yscale`: ウィンドウの新しいY軸の内容スケール。

__参照__:

- Window content scale
- glfwSetWindowContentScaleCallback

__追加__:

バージョン3.3で追加。
:::

::: details `struct GLFWimage`
これは単一の2D画像を記述する。期待されるピクセルフォーマットは、各関数のドキュメントを参照してください。

```c
typedef struct GLFWimage GLFWimage
```

__参照__:

- Custom cursor creation
- Window icon

__追加__:

バージョン2.1で追加。GLFW 3: フォーマットとピクセルあたりのバイト数のメンバーを削除。
:::

## 関数

| 関数名                            | 説明                                                                |
|-----------------------------------|---------------------------------------------------------------------|
| glfwDefaultWindowHints            | すべてのウィンドウヒントをデフォルト値にリセットする。                    |
| glfwWindowHint                    | 指定されたウィンドウヒントを目的の値に設定する。                |
| glfwWindowHintString              | 指定されたウィンドウヒントを目的の値に設定する。                |
| glfwCreateWindow                  | ウィンドウとそれに関連するコンテキストを作成します。                        |
| glfwDestroyWindow                 | 指定されたウィンドウとそのコンテキストを破棄します。                      |
| glfwWindowShouldClose             | 指定されたウィンドウのクローズフラグをチェックする。                      |
| glfwSetWindowShouldClose          | 指定したウィンドウのクローズフラグを設定する。                        |
| glfwSetWindowTitle                | 指定したウィンドウのタイトルを設定します。                             |
| glfwSetWindowIcon                 | 指定したウィンドウのアイコンを設定します。                             |
| glfwGetWindowPos                  | 指定されたウィンドウのコンテンツ領域の位置を取得します。 |
| glfwSetWindowPos                  | 指定したウィンドウのコンテンツエリアの位置を設定します。      |
| glfwGetWindowSize                 | 指定されたウィンドウのコンテンツ領域のサイズを取得します。     |
| glfwSetWindowSizeLimits           | 指定したウィンドウのサイズ制限を設定する。                       |
| glfwSetWindowAspectRatio          | 指定したウィンドウのアスペクト比を設定する。                      |
| glfwSetWindowSize                 | 指定されたウィンドウのコンテンツ領域のサイズを設定します。          |
| glfwGetFramebufferSize            | 指定されたウィンドウのフレームバッファのサイズを取得します。      |
| glfwGetWindowFrameSize            | ウィンドウの枠のサイズを取得します。                      |
| glfwGetWindowContentScale         | 指定したウィンドウのコンテンツスケールを取得します。               |
| glfwGetWindowOpacity              | ウィンドウ全体の不透明度を返します。                            |
| glfwSetWindowOpacity              | ウィンドウ全体の不透明度を設定する。                               |
| glfwIconifyWindow                 | 指定したウィンドウをアイコン化する。                                     |
| glfwRestoreWindow                 | 指定したウィンドウを復元する。                                      |
| glfwMaximizeWindow                | 指定したウィンドウを最大化する。                                     |
| glfwShowWindow                    | 指定したウィンドウを表示する。                                 |
| glfwHideWindow                    | 指定したウィンドウを非表示にします。                                         |
| glfwFocusWindow                   | 指定したウィンドウを前面に出し、入力フォーカスを設定する。          |
| glfwRequestWindowAttention        | 指定されたウィンドウにユーザーの注意を促す。                    |
| glfwGetWindowMonitor              | ウィンドウがフルスクリーンモードで使用するモニターを返します。      |
| glfwSetWindowMonitor              | ウィンドウのモード、モニター、ビデオモード、配置を設定する。       |
| glfwGetWindowAttrib               | 指定されたウィンドウの属性を返します。                       |
| glfwSetWindowAttrib               | 指定したウィンドウの属性を設定します。                          |
| glfwSetWindowUserPointer          | 指定したウィンドウのユーザーポインターを設定します。                      |
| glfwGetWindowUserPointer          | 指定されたウィンドウのユーザーポインタを返します。                   |
| glfwSetWindowPosCallback          | 指定したウィンドウの位置コールバックを設定します。                |
| glfwSetWindowSizeCallback         | 指定したウィンドウのサイズ・コールバックを設定します。                    |
| glfwSetWindowCloseCallback        | 指定したウィンドウのクローズ・コールバックを設定します。                   |
| glfwSetWindowRefreshCallback      | 指定したウィンドウのリフレッシュ・コールバックを設定します。                 |
| glfwSetWindowFocusCallback        | 指定したウィンドウのフォーカス・コールバックを設定します。                   |
| glfwSetWindowIconifyCallback      | 指定したウィンドウのiconifyコールバックを設定します。                 |
| glfwSetWindowMaximizeCallback     | 指定したウィンドウの最大化コールバックを設定します。                |
| glfwSetFramebufferSizeCallback    | 指定したウィンドウのフレームバッファ・リサイズ・コールバックを設定します。      |
| glfwSetWindowContentScaleCallback | 指定したウィンドウのコンテンツ・スケールのコールバックを設定します。    |
| glfwPollEvents                    | 保留中のすべてのイベントを処理する。                                       |
| glfwWaitEvents                    | イベントがキューに入るまで待機し、イベントを処理する。                   |
| glfwWaitEventsTimeout             | イベントがキューに入るまでタイムアウトで待機し、イベントを処理する。      |
| glfwPostEmptyEvent                | 空のイベントをイベントキューに投稿する。                            |
| glfwSwapBuffers                   | 指定したウィンドウのフロントバッファとバックバッファを入れ替える。           |

::: details `glfwDefaultWindowHints()`
この関数は、すべてのウィンドウヒントをデフォルト値にリセットする。

```c
void glfwDefaultWindowHints(void)
```

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window creation hints
- glfwWindowHint
- glfwWindowHintString

__追加__:

バージョン3.0で追加。
:::

::: details `glfwWindowHint()`
この関数は、次に glfwCreateWindow を呼び出すときのヒントを設定する。一度設定されたヒントは、この関数または glfwDefaultWindowHints の呼び出しによって変更されるか、ライブラリが終了するまで、その値を保持します。

この関数で設定できるヒントは整数値のみです。文字列値のヒントは glfwWindowHintString で設定します。

この関数は、指定されたヒント値が有効かどうかをチェックしません。ヒントに無効な値を設定した場合、代わりに次の glfwCreateWindow 呼び出しで報告されます。

いくつかのヒントはプラットフォーム固有です。これらはどのプラットフォームでも設定できますが、特定のプラットフォームにのみ影響します。他のプラットフォームでは無視されます。これらのヒントを設定するのに、プラットフォーム固有のヘッダーや関数は必要ありません。

```c
void glfwWindowHint(int hint, int value)
```

__引数__:

- `[in] hint`: 設定するウィンドウのヒント。
- `[in] value`: ウィンドウヒントの新しい値。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_INVALID_ENUM である。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window creation hints
- glfwWindowHintString
- glfwDefaultWindowHints

__追加__:

バージョン 3.0 で追加されました。glfwOpenWindowHint を置き換えます。
:::

::: details `glfwWindowHintString()`
この関数は、次に glfwCreateWindow を呼び出すときのヒントを設定する。一度設定されたヒントは、この関数または glfwDefaultWindowHints の呼び出しによって変更されるか、ライブラリが終了するまで、その値を保持します。

この関数で設定できるヒントは文字列型のみです。整数値のヒントは glfwWindowHint で設定します。

この関数は、指定されたヒント値が有効かどうかをチェックしません。ヒントに無効な値を設定した場合、代わりに次の glfwCreateWindow 呼び出しで報告されます。

いくつかのヒントはプラットフォーム固有です。これらはどのプラットフォームでも設定できますが、特定のプラットフォームにのみ影響します。他のプラットフォームでは無視されます。これらのヒントを設定するのに、プラットフォーム固有のヘッダーや関数は必要ありません。

```c
void glfwWindowHintString(int hint, const char * value)
```

__引数__:

- `[in] hint`: 設定するウィンドウのヒント。
- `[in] value`: ウィンドウヒントの新しい値。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_INVALID_ENUM である。

__ポインタの寿命__:

指定された文字列は、この関数が戻る前にコピーされる。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window creation hints
- glfwWindowHint
- glfwDefaultWindowHints

__追加__:

バージョン3.3で追加。
:::

::: details `glfwCreateWindow()`
この関数はウィンドウとそれに関連するOpenGLまたはOpenGL ESコンテキストを作成する。ウィンドウとそのコンテキストの作成方法を制御するオプションのほとんどは、ウィンドウヒントで指定されます。

作成に成功しても、現在のコンテキストは変更されない。新しく作成されたコンテキストを使用する前に、それを現在のコンテキストにする必要があります。shareパラメータについては、コンテキストオブジェクトの共有を参照してください。

すべてのパラメータとヒントがハード制約ではないため、作成されるウィンドウ、フレームバッファ、コンテキストは要求したものと異なる場合があります。これにはウィンドウのサイズ、特にフルスクリーンウィンドウのサイズも含まれます。作成されたウィンドウ、フレームバッファ、コンテキストの実際の属性を問い合わせるには、glfwGetWindowAttrib、glfwGetWindowSize、glfwGetFramebufferSizeを参照してください。

フルスクリーンウィンドウを作成するには、ウィンドウがカバーするモニタを指定する必要がある。モニターが指定されない場合、ウィンドウはウィンドウモードになります。ユーザーが特定のモニターを選択する方法がない限り、プライマリーモニターを選択することをお勧めします。接続されているモニターを問い合わせる方法については、モニターの取得を参照してください。

フルスクリーンウィンドウの場合、指定されたサイズはウィンドウの希望するビデオモードの解像度になります。フルスクリーンウィンドウがアイコン化されていない限り、希望するビデオモードに最も近いサポートされているビデオモードが指定されたモニターに設定されます。ウィンドウ付きフルスクリーンウィンドウやボーダーレスフルスクリーンウィンドウと呼ばれるウィンドウの作成を含む、フルスクリーンウィンドウに関する情報は、「ウィンドウ付きフルスクリーン」ウィンドウを参照してください。

ウィンドウを作成したら、glfwSetWindowMonitorでウィンドウモードとフルスクリーンモードを切り替えることができます。これはOpenGLやOpenGL ESのコンテキストには影響しません。

デフォルトでは、新しく作成されたウィンドウはウィンドウシステムが推奨する配置を使用します。特定の位置にウィンドウを作成するには、GLFW_VISIBLEウィンドウヒントを使用してウィンドウを最初は非表示にし、その位置を設定してから表示します。

少なくとも1つのフルスクリーンウィンドウがアイコン化されていない限り、スクリーンセーバーの起動は禁止される。

ウィンドウシステムはウィンドウサイズに制限を設けています。非常に大きいまたは非常に小さいウィンドウサイズは、作成時にウィンドウシステムによって上書きされる可能性があります。作成後に実際のサイズを確認してください。

スワップ間隔はウィンドウ作成中には設定されず、ドライバの設定やデフォルトによって初期値が異なる場合があります。

```c
GLFWwindow * glfwCreateWindow(int width, int height, const char * title, GLFWmonitor * monitor, GLFWwindow * share)
```

__引数__:

- `[in] width`: ウィンドウの幅をスクリーン座標で指定する。これはゼロより大きくなければならない。
- `[in] height`: ウィンドウの高さをスクリーン座標で指定する。これはゼロより大きくなければならない。
- `[in] title`: UTF-8でエンコードされた最初のウィンドウタイトル。
- `[in] monitor`: フルスクリーンモードで使用するモニター、またはウィンドウモードで使用するNULL。
- `[in] share`: リソースを共有するコンテキストのウィンドウ、またはリソースを共有しない場合はNULL。

__戻り値__:

作成されたウィンドウのハンドル、またはエラーが発生した場合はNULL。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED, GLFW_INVALID_ENUM, GLFW_INVALID_VALUE, GLFW_API_UNAVAILABLE, GLFW_VERSION_UNAVAILABLE, GLFW_FORMAT_UNAVAILABLE, GLFW_PLATFORM_ERROR です。

__備考__:

- Windows: Microsoft GDIソフトウェアOpenGL実装だけが利用可能な場合、ウィンドウの作成に失敗します。
- Windows: 実行ファイルにGLFW_ICONという名前のアイコンリソースがあれば、それがウィンドウの初期アイコンとして設定される。そのようなアイコンがない場合、IDI_APPLICATIONアイコンが代わりに使用されます。別のアイコンを設定するには、glfwSetWindowIconを参照してください。
- Windows: リソースを共有するコンテキストは、他のどのスレッドにも存在してはならない。
- macOS: OSはOpenGLバージョン3.2以降の前方互換性のあるコアプロファイルコンテキストのみをサポートしています。バージョン3.2以降のOpenGLコンテキストを作成する前に、それに応じてGLFW_OPENGL_FORWARD_COMPATとGLFW_OPENGL_PROFILEヒントを設定する必要があります。OpenGL 3.0と3.1のコンテキストはmacOSでは全くサポートされていません。
- macOS: GLFWウィンドウはドキュメントウィンドウではないのでアイコンはありませんが、ドックアイコンはアプリケーションバンドルのアイコンと同じになります。バンドルに関する情報は、Mac Developer Library の Bundle Programming Guide を参照してください。
- macOS: ウィンドウが最初に作られるとき、メニューバーが作られます。GLFWがMainMenu.nibを見つけた場合、それが読み込まれ、メニューバーが含まれていると仮定されます。そうでない場合は、Hide、Quit、Aboutのような一般的なコマンドを含む最小限のメニューバーが手動で作成されます。Aboutエントリは、アプリケーションのバンドルからの情報を含む最小限のaboutダイアログを開きます。メニューバーの作成はGLFW_COCOA_MENUBAR initヒントで完全に無効にすることができる。
- macOS: OS X 10.10以降では、GLFW_COCOA_RETINA_FRAMEBUFFERヒントがGLFW_TRUEで、アプリケーションバンドルのInfo.plistでNSHighResolutionCapableキーが有効になっていない限り、ウィンドウフレームはRetinaディスプレイ上でフル解像度でレンダリングされません。詳しくは、Mac Developer LibraryのHigh Resolution Guidelines for OS Xを参照してください。GLFWのテストプログラムとサンプルプログラムでは、このためにカスタムInfo.plistテンプレートを使用しています。このテンプレートはソースツリーのCMake/MacOSXBundleInfo.plist.inにあります。
- macOS: GLFW_COCOA_FRAME_NAMEでフレームの自動保存を有効にする場合、指定されたウィンドウサイズと位置は、以前に保存された値で上書きされることがあります。
- X11: ウィンドウ・マネージャーによっては、最初に隠されたウィンドウの配置を尊重しないものもあります。
- X11: X11の非同期的な性質により、ウィンドウが要求された状態に到達するまでに時間がかかることがあります。つまり、ウィンドウの作成後、最終的なサイズや位置、その他の属性を直接問い合わせることができない可能性があります。
- X11: WM_CLASSウィンドウプロパティのクラス部分は、デフォルトでこの関数に渡されたウィンドウタイトルに設定される。インスタンス部分は、環境変数RESOURCE_NAMEが存在し、空でなければ、その内容を使用するか、ウィンドウタイトルにフォールバックする。これを上書きするには、GLFW_X11_CLASS_NAME と GLFW_X11_INSTANCE_NAME ウィンドウヒントを設定する。
- Wayland: コンポジターはウィンドウを適切に装飾するために、GLFW 用の xdg-decoration プロトコルを実装する必要があります。このプロトコルがサポートされていない場合、またはコンポジターがクライアントサイドの装飾を好む場合は、wp_viewporter プロトコルを使用して非常にシンプルなフォールバックフレームが描画されます。コンポジターは、例えばキーバインドメカニズムを使用して、クローズ、最大化、フルスクリーンイベントを発行することができます。これらのプロトコルがサポートされていない場合、ウィンドウは装飾されません。
- Wayland: フルスクリーンウィンドウは、要求されたサイズやリフレッシュレートに関係なく、モードを変更しようとしません。
- Wayland: スクリーンセーバーの禁止には、アイドル・インヒビット・プロトコルがユーザーのコンポジターに実装されている必要がある。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window creation
- glfwDestroyWindow

__追加__:

バージョン 3.0 で追加されました。glfwOpenWindow を置き換える。
:::

::: details `glfwDestroyWindow()`
この関数は、指定されたウィンドウとそのコンテキストを破棄する。この関数を呼び出すと、そのウィンドウに対してそれ以降のコールバックは呼び出されません。

指定されたウィンドウのコンテキストがメインスレッドにある場合は、破棄される前に切り離されます。

```c
void glfwDestroyWindow(GLFWwindow * window)
```

__引数__:

- `[in] window`: 破棄するウィンドウ。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__注釈__:

この関数が呼び出されたとき、指定されたウィンドウのコンテキストは、他のスレッド上でカレントであってはならない。

__リエントランシー__:

この関数はコールバックから呼んではならない。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window creation
- glfwCreateWindow

__追加__:

バージョン3.0で追加。glfwCloseWindow を置き換える。
:::

::: details `glfwWindowShouldClose()`
この関数は、指定されたウィンドウのクローズフラグの値を返す。

```c
int glfwWindowShouldClose(GLFWwindow * window)
```

__引数__:

- `[in] window`: クエリーするウィンドウ。

__戻り値__:

クローズフラグの値。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__参照__:

- Window closing and close flag

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetWindowShouldClose()`
この関数は、指定されたウィンドウのクローズフラグの値を設定する。これは、ユーザがウィンドウを閉じようとするのを上書きしたり、ウィンドウを閉じるように合図したりするために使用できます。

```c
void glfwSetWindowShouldClose(GLFWwindow * window, int value)
```

__引数__:

- `[in] window`: フラグを変更するウィンドウ。
- `[in] value`: 新しい値。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__参照__:

- Window closing and close flag

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetWindowTitle()`
この関数は、指定されたウィンドウのタイトルを UTF-8 でエンコードして設定する。

```c
void glfwSetWindowTitle(GLFWwindow * window, const char * title)
```

__引数__:

- `[in] window`: タイトルを変更するウィンドウ。
- `[in] title`: UTF-8でエンコードされたウィンドウのタイトル。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

macOS: ウィンドウのタイトルは、次にイベントを処理するまで更新されない。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window title

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `glfwSetWindowIcon()`
この関数は、指定されたウィンドウのアイコンを設定する。候補画像の配列が渡された場合、システムが希望するサイズのもの、 あるいはそれに最も近いものが選択されます。画像が指定されない場合、ウィンドウはデフォルトのアイコンに戻ります。

ピクセルは32ビット、リトルエンディアン、非前乗算RGBA、つまり各チャンネル8ビットで、赤チャンネルが先。 これらは、左上から順番に詰め込まれた列として正規に並べられている。

希望する画像サイズは、プラットフォームやシステム設定によって異なります。選択された画像は必要に応じて拡大縮小されます。最適なサイズは16x16、32x32、48x48です。

```c
void glfwSetWindowIcon(GLFWwindow * window, int count, const GLFWimage * images)
```

__引数__:

- `[in] window`: アイコンを設定するウィンドウ。
- `[in] count`: 指定した配列に含まれる画像の数。デフォルトのウィンドウアイコンに戻す場合は 0。
- `[in] images`: アイコンを作成する画像。countが0の場合は無視される。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_VALUE、GLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

指定された画像データは、この関数が戻る前にコピーされる。

__備考__:

- macOS: GLFWウィンドウはドキュメントウィンドウではないのでアイコンがなく、この関数は何もしません。ドックアイコンはアプリケーションバンドルのアイコンと同じになります。バンドルに関する情報は、Mac Developer Library の Bundle Programming Guide を参照してください。
- Wayland: アイコンを変更する既存のプロトコルはないので、ウィンドウはアプリケーションのデスクトップファイルで定義されたものを継承します。この関数は常にGLFW_PLATFORM_ERRORを返します。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window icon

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetWindowPos()`
この関数は、指定されたウィンドウのコンテンツ領域の左上隅の位置をスクリーン座標で取得する。

position 引数のいずれかまたはすべては NULL であってもよい。エラーが発生した場合、NULL 以外の位置引数はすべて 0 に設定されます。

```c
void glfwGetWindowPos(GLFWwindow * window, int * xpos, int * ypos)
```

__引数__:

- `[in] window`: クエリーするウィンドウ。
- `[out] xpos`: コンテンツ領域の左上隅のx座標を格納する場所、またはNULL。
- `[out] ypos`: コンテンツ領域の左上隅のy座標を格納する場所、またはNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

- Wayland: アプリケーションがウィンドウのグローバルポジションを取得する方法はありません。この関数は常にGLFW_PLATFORM_ERRORを出します。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window position
- glfwSetWindowPos

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetWindowPos()`
この関数は、指定されたウィンドウモードのウィンドウのコンテント領域の左上隅の位置をスクリーン座標で設定する。ウィンドウがフルスクリーンウィンドウの場合、この関数は何もしません。

ユーザを混乱させたり困らせたりするので、よほどの理由がない限り、すでに表示されているウィンドウを移動するためにこの関数を使用しないでください。

ウィンドウマネージャは許可される位置に制限を加えるかもしれません。GLFWはこれらの制限を上書きすることはできませんし、またそうすべきではありません。

```c
void glfwSetWindowPos(GLFWwindow * window, int xpos, int ypos)
```

__引数__:

- `[in] window`: クエリーするウィンドウ。
- `[in] xpos`: コンテンツ領域の左上隅のx座標。
- `[in] ypos`: コンテンツ領域の左上隅のy座標。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

- Wayland: この関数は常にGLFW_PLATFORM_ERRORを出します。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window position
- glfwGetWindowPos

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `glfwGetWindowSize()`
この関数は、指定されたウィンドウのコンテンツ領域のサイズをスクリーン座標で取得する。ウィンドウのフレームバッファのサイズをピクセル単位で取得したい場合は、 glfwGetFramebufferSizeを参照してください。

size引数のいずれか、またはすべてがNULLであってもよい。エラーが発生した場合、NULLでないsize引数はすべて0に設定される。

```c
void glfwGetWindowSize(GLFWwindow * window, int * width, int * height)
```

__引数__:

- `[in] window`: 取得するウィンドウのサイズ。
- `[out] width`: コンテンツ領域の幅をスクリーン座標で格納する場所、またはNULL。
- `[out] height`: コンテンツ領域の高さをスクリーン座標で格納する場所、またはNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window size
- glfwSetWindowSize

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `glfwSetWindowSizeLimits()`
この関数は、指定されたウィンドウのコンテンツ領域のサイズ制限を設定する。ウィンドウがフルスクリーンの場合、サイズ制限はウィンドウ化されて初めて有効になる。ウィンドウがリサイズ可能でない場合、この関数は何もしません。

サイズ制限は、ウィンドウモードのウィンドウに即座に適用され、リサイズされる可能性があります。

最大寸法は最小寸法以上でなければならず、すべて0以上でなければならない。

```c
void glfwSetWindowSizeLimits(GLFWwindow * window, int minwidth, int minheight, int maxwidth, int maxheight)
```

__引数__:

- `[in] window`: 制限を設定するウィンドウ。
- `[in] minwidth`: コンテンツ領域の最小幅（スクリーン座標）、またはGLFW_DONT_CARE。
- `[in] minheight`: コンテンツ領域の最小の高さ（スクリーン座標）、またはGLFW_DONT_CARE。
- `[in] maxwidth`: コンテンツ領域のスクリーン座標での最大幅、またはGLFW_DONT_CARE。
- `[in] maxheight`: コンテンツ領域のスクリーン座標での最大の高さ、またはGLFW_DONT_CARE。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_VALUE、GLFW_PLATFORM_ERRORである。

__備考__:

サイズ制限とアスペクト比が競合するように設定した場合、結果は不定です。

- Wayland: サイズ制限は、ユーザーまたはコンポジターによって実際にウィンドウのサイズが変更されるまで適用されません。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window size limits
- glfwSetWindowAspectRatio

__追加__:

バージョン3.2で追加。
:::

::: details `glfwSetWindowAspectRatio()`
この関数は、指定されたウィンドウのコンテンツ領域に必要なアスペクト比を設定する。ウィンドウがフルスクリーンの場合、アスペクト比はウィンドウ化されて初めて有効になる。ウィンドウがリサイズ可能でない場合、この関数は何もしません。

アスペクト比は分子と分母で指定し、両方の値が0より大きくなければならない。例えば、一般的な16:9のアスペクト比は、それぞれ16と9と指定します。

分子と分母を GLFW_DONT_CARE に設定すると、アスペクト比の制限は無効になる。

アスペクト比はウィンドウモードのウィンドウに即座に適用され、リサイズされることがある。

```c
void glfwSetWindowAspectRatio(GLFWwindow * window, int numer, int denom)
```

__引数__:

- `[in] window`: 制限を設定するウィンドウ。
- `[in] numer`: 希望するアスペクト比の分子、またはGLFW_DONT_CARE。
- `[in] denom`: 希望するアスペクト比の分母、またはGLFW_DONT_CARE。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_VALUE、GLFW_PLATFORM_ERRORである。

__備考__:

サイズ制限とアスペクト比が競合するように設定した場合、結果は不定です。

- Wayland: アスペクト比は、ユーザーまたはコンポジターによってウィンドウのサイズが実際に変更されるまで適用されません。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window size limits
- glfwSetWindowSizeLimits

__追加__:

バージョン3.2で追加。
:::

::: details `glfwSetWindowSize()`
この関数は、指定されたウィンドウのコンテンツ領域のサイズをスクリーン座標で設定する。

フルスクリーンウィンドウの場合、この関数は希望するビデオモードの解像度を更新し、ウィンドウのコンテキストに影響を与えることなく、最も近いビデオモードに切り替えます。コンテキストに影響がないため、フレームバッファのビット深度は変更されません。

解像度だけでなく、希望するビデオモードのリフレッシュレートも更新したい場合は、glfwSetWindowMonitorを参照してください。

ウィンドウマネージャは許可されるサイズに制限を加えるかもしれません。GLFWはこれらの制限を上書きすることはできませんし、また、上書きすべきではありません。

```c
void glfwSetWindowSize(GLFWwindow * window, int width, int height)
```

__引数__:

- `[in] window`: リサイズするウィンドウ。
- `[in] width`: ウィンドウの内容領域の幅をスクリーン座標で指定する。
- `[in] height`: ウィンドウの内容領域の高さをスクリーン座標で指定する。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

- Wayland: フルスクリーンウィンドウは、要求されたサイズに関係なく、モードを変更しようとしない。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window size
- glfwGetWindowSize
- glfwSetWindowMonitor

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `glfwGetFramebufferSize()`
この関数は、指定されたウィンドウのフレームバッファのサイズをピクセル単位で取得する。ウィンドウのサイズをスクリーン座標で取得したい場合は、 glfwGetWindowSizeを参照してください。

size引数のいずれか、またはすべてがNULLであってもよい。エラーが発生した場合、NULLでないsize引数はすべて0に設定されます。

```c
void glfwGetFramebufferSize(GLFWwindow * window, int * width, int * height)
```

__引数__:

- `[in] window`: フレームバッファを問い合わせるウィンドウ。
- `[out] width`: フレームバッファの幅をピクセル単位で格納する場所、またはNULL。
- `[out] height`: フレームバッファの高さをピクセル単位で格納する場所、またはNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Framebuffer size
- glfwSetFramebufferSizeCallback

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetWindowFrameSize()`
この関数は、指定されたウィンドウのフレームの各辺のサイズをスクリーン座標で取得する。このサイズには、ウィンドウにタイトルバーがある場合はタイトルバーも含まれる。フレームのサイズは、それを作成するために使用されるウィンドウ関連のヒントによって異なる場合があります。

この関数は、特定の座標軸に沿ったオフセットではなく、各ウィンドウ枠の辺のサイズを取得するため、取得される値は常にゼロまたは正の値になります。

size引数のいずれか、またはすべてがNULLであってもよい。エラーが発生した場合、NULLでないsize引数はすべて0に設定されます。

```c
void glfwGetWindowFrameSize(GLFWwindow * window, int * left, int * top, int * right, int * bottom)
```

__引数__:

- `[in] window`: フレームサイズを問い合わせるウィンドウ。
- `[out] left`: ウィンドウ枠の左端のサイズをスクリーン座標で格納する場所、またはNULL。
- `[out] top`: ウィンドウ枠の上端のサイズをスクリーン座標で格納する場所、またはNULL。
- `[out] right`: ウィンドウ枠の右端のサイズをスクリーン座標で格納する場所、またはNULL。
- `[out] bottom`: ウィンドウ枠の下端のサイズをスクリーン座標で格納する場所、またはNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window size

__追加__:

バージョン3.1で追加。
:::

::: details `glfwGetWindowContentScale()`
この関数は、指定されたウィンドウのコンテンツスケールを取得します。コンテンツスケールは、現在のDPIとプラットフォームのデフォルトDPIの比率です。これはテキストやUI要素にとって特に重要です。これによってスケーリングされたUIのピクセル寸法があなたのマシンで適切に見えるなら、他のマシンではDPIやスケーリング設定に関係なく、妥当なサイズで表示されるはずです。これは、システムのDPIとスケーリング設定がある程度正しいことに依存します。

各モニターが独自のコンテンツ・スケールを持つことができるシステムでは、ウィンドウのコンテンツ・スケールは、システムがウィンドウをどのモニター上にあるとみなすかに依存します。

```c
void glfwGetWindowContentScale(GLFWwindow * window, float * xscale, float * yscale)
```

__引数__:

- `[in] window`: クエリーするウィンドウ。
- `[out] xscale`: X軸の内容スケールを格納する場所、または NULL。
- `[out] yscale`: Y軸の内容スケールを格納する場所、または NULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window content scale
- glfwSetWindowContentScaleCallback
- glfwGetMonitorContentScale

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetWindowOpacity()`
この関数は、装飾を含むウィンドウの不透明度を返します。

不透明度 (またはアルファ値) は 0 から 1 までの正の整数で、 0 は完全に透明、 1 は完全に不透明です。システムがウィンドウ全体の透過をサポートしていない場合、この関数は常に1を返します。

新しく作成されたウィンドウの不透明度の初期値は1です。

```c
float glfwGetWindowOpacity(GLFWwindow * window)
```

__引数__:

- `[in] window`: クエリーするウィンドウ。

__戻り値__:

指定したウィンドウの不透明度。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window transparency
- glfwSetWindowOpacity

__追加__:

バージョン3.3で追加。
:::

::: details `glfwSetWindowOpacity()`
この関数は、装飾を含むウィンドウの不透明度を設定する。

不透明度 (またはアルファ値) は 0 から 1 までの正の整数で、0 は完全に透明、1 は完全に不透明です。

新しく作成されたウィンドウの初期値は 1 です。

フレームバッファの透明度を使用して作成されたウィンドウは、ウィンドウ全体の透明度を使用することはできません。この場合の結果は未定義です。

```c
void glfwSetWindowOpacity(GLFWwindow * window, float opacity)
```

__引数__:

- `[in] window`: 不透明度を設定するウィンドウ。
- `[in] opacity`: 指定されたウィンドウの希望の不透明度。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window transparency
- glfwGetWindowOpacity

__追加__:

バージョン3.3で追加。
:::

::: details `glfwIconifyWindow()`
この関数は、指定されたウィンドウが以前に復元されていた場合、そのウィンドウをアイコン化（最小化）する。ウィンドウが既にアイコン化されている場合、この関数は何もしない。

指定されたウィンドウがフルスクリーンウィンドウの場合、 GLFWはモニタの元のビデオモードを復元する。ウィンドウが復元されると、ウィンドウの希望するビデオモードが再び設定される。

```c
void glfwIconifyWindow(GLFWwindow * window)
```

__引数__:

- `[in] window`: アイコン化するウィンドウ。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window iconification
- glfwRestoreWindow
- glfwMaximizeWindow

__追加__:

バージョン2.1で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `glfwRestoreWindow()`
この関数は、指定されたウィンドウが以前にアイコン化（最小化）または最大化されていた場合に、そのウィンドウを復元する。ウィンドウが既に復元されている場合、この関数は何もしません。

指定されたウィンドウがアイコン化されたフルスクリーンウィンドウである場合、 ウィンドウが復元されるときに、そのモニタに対して希望するビデオモードが再び設定される。

```c
void glfwRestoreWindow(GLFWwindow * window)
```

__引数__:

- `[in] window`: 復元するウィンドウ。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window iconification
- glfwIconifyWindow
- glfwMaximizeWindow

__追加__:

バージョン2.1で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `glfwMaximizeWindow()`
この関数は、指定されたウィンドウが以前に最大化されていなかった場合に、そのウィンドウを最大化する。ウィンドウが既に最大化されている場合、この関数は何もしない。

指定されたウィンドウがフルスクリーンウィンドウの場合、この関数は何もしない。

```c
void glfwMaximizeWindow(GLFWwindow * window)
```

__引数__:

- `[in] window`: 最大化するウィンドウ。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出すことができる。

__参照__:

- Window iconification
- glfwIconifyWindow
- glfwRestoreWindow

__追加__:

GLFW 3.2で追加。
:::

::: details `glfwShowWindow()`
この関数は、指定されたウィンドウが以前に非表示であった場合に、そのウィンドウを表示するようにする。ウィンドウがすでに表示されているか、フルスクリーンモードになっている場合、この関数は何もしません。

デフォルトでは、ウィンドウモードのウィンドウは表示されているときにフォーカスされます。 新規に作成されたすべてのウィンドウのこの動作を変更するには、GLFW_FOCUS_ON_SHOW ウィンドウヒントを設定するか、既存のウィンドウの動作を glfwSetWindowAttrib で変更します。

```c
void glfwShowWindow(GLFWwindow * window)
```

__引数__:

- `[in] window`: 可視化するウィンドウ。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

- Wayland: Waylandはデスクトップの各フレームが完全であることを望んでいるため、この関数はウィンドウをすぐには表示しない。その代わり、この呼び出しの次にウィンドウのフレームバッファが更新されたときに見えるようになります。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window visibility
- glfwHideWindow

__追加__:

バージョン3.0で追加。
:::

::: details `glfwHideWindow()`
この関数は、指定されたウィンドウが以前に表示されていた場合、そのウィンドウを非表示にする。ウィンドウがすでに非表示になっているか、フルスクリーンモードになっている場合、この関数は何もしません。

```c
void glfwHideWindow(GLFWwindow * window)
```

__引数__:

- `[in] window`: 非表示にするウィンドウ。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window visibility
- glfwShowWindow

__追加__:

バージョン3.0で追加。
:::

::: details `glfwFocusWindow()`
この関数は、指定されたウィンドウを前面に出し、入力フォーカスを設定する。ウィンドウはすでに表示されていて、アイコン化されていない必要があります。

デフォルトでは、ウィンドウモードとフルスクリーンモードの両方のウィンドウは、最初に作成されたときにフォーカスされます。この動作を無効にするにはGLFW_FOCUSEDを設定します。

また、デフォルトでは、ウィンドウモードのウィンドウは glfwShowWindow で表示されたときにフォーカスされる。この動作を無効にするには、GLFW_FOCUS_ON_SHOWを設定する。

この関数を使って他のアプリケーションからフォーカスを奪わないでください。フォーカスを奪うことは非常に邪魔になります。

ユーザーの注意を引くためのあまり破壊的でない方法については、注意要求を参照してください。

```c
void glfwFocusWindow(GLFWwindow * window)
```

__引数__:

- `[in] window`: 入力フォーカスを与えるウィンドウ。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

- Wayland: アプリケーションがウィンドウを前面に出すことはできない。この関数は常にGLFW_PLATFORM_ERRORを出します。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window input focus
- Window attention request

__追加__:

バージョン3.2で追加。
:::

::: details `glfwRequestWindowAttention()`
この関数は、指定されたウィンドウに対するユーザーの注意を要求する。これがサポートされていないプラットフォームでは、アプリケーション全体へのアテンションが要求される。

通常、ウィンドウまたはアプリケーションにフォーカスを当てることによって、ユーザーが注意を与えたら、システムは自動的に要求を終了します。

```c
void glfwRequestWindowAttention(GLFWwindow * window)
```

__引数__:

- `[in] window`: 注意を要求するウィンドウ。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

- macOS: 特定のウィンドウではなく、アプリケーション全体に注意を払うことが求められる。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window attention request

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetWindowMonitor()`
この関数は、指定されたウィンドウが全画面表示されているモニタのハンドルを返します。

```c
GLFWmonitor * glfwGetWindowMonitor(GLFWwindow * window)
```

__引数__:

- `[in] window`: クエリーするウィンドウ。

__戻り値__:

ウィンドウがウィンドウモードの場合、またはエラーが発生した場合はNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window monitor
- glfwSetWindowMonitor

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetWindowMonitor()`
この関数は、ウィンドウがフルスクリーンモードで使用するモニタを設定するか、モニタがNULLの場合はウィンドウモードにする。

モニタを設定するとき、この関数は希望するビデオモードの幅、高さ、リフレッシュレートを更新し、それに最も近いビデオモードに切り替えます。モニターを設定する場合、ウィンドウの位置は無視される。

モニタがNULLの場合、位置、幅、高さはウィンドウのコンテンツ領域を配置するために使用される。モニターが指定されていない場合、リフレッシュレートは無視される。

フルスクリーンウィンドウの解像度またはウィンドウモードウィンドウのサイズのみを更新したい場合は、 glfwSetWindowSizeを参照してください。

ウィンドウがフルスクリーンからウィンドウモードに遷移するとき、この関数は、装飾、フローティング、サイズ変更可能、サイズやアスペクト比の制限など、以前のウィンドウ設定を復元します。

```c
void glfwSetWindowMonitor(GLFWwindow * window, GLFWmonitor * monitor, int xpos, int ypos, int width, int height, int refreshRate)
```

__引数__:

- `[in] window`: モニター、サイズ、ビデオモードを設定するウィンドウ。
- `[in] monitor`: 希望するモニター、またはウィンドウモードに設定する場合は NULL。
- `[in] xpos`: コンテンツ領域の左上隅のX座標。
- `[in] ypos`: コンテンツ領域の左上隅のy座標。
- `[in] width`: コンテンツエリアまたはビデオモードの、スクリーン座標での希望の位置。
- `[in] height`: コンテンツエリアまたはビデオモードの高さを、スクリーン座標で指定する。
- `[in] refreshRate`: ビデオモードの希望リフレッシュレート（Hz）、またはGLFW_DONT_CARE。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

OpenGLやOpenGL ESのコンテキストが破壊されたり、サイズ変更やモード切り替えの影響を受けたりすることはありませんが、フレームバッファのサイズが変更された場合は、ビューポートを更新する必要があるかもしれません。

- Wayland: アプリケーションがこのプロパティを設定する方法がないため、希望のウィンドウ位置は無視される。
- Wayland: ウィンドウをフルスクリーンに設定すると、要求されたサイズやリフレッシュ・レートに関係なく、モードを変更しようとしません。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window monitor
- Full screen windows
- glfwGetWindowMonitor
- glfwSetWindowSize

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetWindowAttrib()`
この関数は、指定されたウィンドウまたはそのOpenGLまたはOpenGL ESコンテキストの属性の値を返します。

```c
int glfwGetWindowAttrib(GLFWwindow * window, int attrib)
```

__引数__:

- `[in] window`: クエリーするウィンドウ。
- `[in] attrib`: 値を返すウィンドウ属性。

__戻り値__:

属性の値。エラーが発生した場合はゼロ。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_PLATFORM_ERRORである。

__備考__:

フレームバッファ関連のヒントはウィンドウ属性ではありません。詳しくはフレームバッファ関連属性を参照してください。

ゼロはウィンドウやコンテキストに関連する多くの属性で有効な値なので、ゼロの戻り値をエラーの兆候として使うことはできない。しかし、有効な引数が渡され、ライブラリが初期化されている限り、この関数が失敗することはありません。

- Wayland: そのためGLFW_ICONIFIEDは常にGLFW_FALSEを返します。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window attributes
- glfwSetWindowAttrib

__追加__:

バージョン3.0で追加されました。glfwGetWindowParamとglfwGetGLVersionを置き換える。
:::

::: details `glfwSetWindowAttrib()`
この関数は、指定されたウィンドウの属性値を設定します。

サポートされている属性は GLFW_DECORATED, GLFW_RESIZABLE, GLFW_FLOATING, GLFW_AUTO_ICONIFY, GLFW_FOCUS_ON_SHOW です。

これらの属性のいくつかはフルスクリーンウィンドウでは無視されます。新しい値は、ウィンドウが後でウィンドウ化された場合に有効になります。

これらの属性のいくつかはウィンドウ・モードのウィンドウでは無視される。新しい値は、後にウィンドウがフルスクリーンになった場合に有効になります。

```c
void glfwSetWindowAttrib(GLFWwindow * window, int attrib, int value)
```

__引数__:

- `[in] window`: 属性を設定するウィンドウ。
- `[in] attrib`: サポートされているウィンドウ属性。
- `[in] value`: GLFW_TRUEまたはGLFW_FALSE。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_INVALID_VALUE、GLFW_PLATFORM_ERRORである。

__備考__:

glfwGetWindowAttribを呼び出すと、たとえその値がウィンドウの現在のモードで無視されたとしても、常に最新の値が返される。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window attributes
- glfwGetWindowAttrib

__追加__:

バージョン3.3で追加。
:::

::: details `glfwSetWindowUserPointer()`
この関数は、指定されたウィンドウのユーザー定義ポインターを設定する。現在の値はウィンドウが破棄されるまで保持される。初期値は NULL です。

```c
void glfwSetWindowUserPointer(GLFWwindow * window, void * pointer)
```

__引数__:

- `[in] window`: ポインタを設定するウィンドウ。
- `[in] pointer`: 新しい値。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__参照__:

- User pointer
- glfwGetWindowUserPointer

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetWindowUserPointer()`
この関数は、指定されたウィンドウのユーザー定義ポインタの現在値を返す。初期値は NULL です。

```c
void * glfwGetWindowUserPointer(GLFWwindow * window)
```

__引数__:

- `[in] window`: ポインタを返すウィンドウ。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__参照__:

- User pointer
- glfwSetWindowUserPointer

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetWindowPosCallback()`
この関数は、指定されたウィンドウの位置コールバックを設定する。このコールバックには、ウィンドウのコンテント領域の左上隅の位置をスクリーン座標で指定します。

```c
GLFWwindowposfun glfwSetWindowPosCallback(GLFWwindow * window, GLFWwindowposfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, int xpos, int ypos)
```

コールバック・パラメータについては、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__備考__:

- Wayland: アプリケーションがグローバルポジションを知る方法がないため、このコールバックが呼ばれることはない。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window position

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetWindowSizeCallback()`
この関数は、指定されたウィンドウのサイズ変更時に呼び出されるサイズコールバックを設定します。コールバックには、ウィンドウのコンテンツ領域のサイズがスクリーン座標で指定されます。

```c
GLFWwindowsizefun glfwSetWindowSizeCallback(GLFWwindow * window, GLFWwindowsizefun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, int width, int height)
```

コールバック・パラメータについては、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window size

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメータと戻り値を追加。
:::

::: details `glfwSetWindowCloseCallback()`
この関数は、指定されたウィンドウのクローズ・コールバックを設定します。このコールバックは、ユーザーがタイトルバーのクローズ・ウィジェットをクリックするなどしてウィンドウを閉じようとしたときに呼び出されます。

クローズフラグはこのコールバックが呼ばれる前に設定されますが、glfwSetWindowShouldCloseでいつでも変更できます。

閉じるコールバックは glfwDestroyWindow によってトリガされません。

```c
GLFWwindowclosefun glfwSetWindowCloseCallback(GLFWwindow * window, GLFWwindowclosefun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window)
```

コールバック・パラメータについては、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__備考__:

- macOS: アプリケーションメニューから終了を選択すると、すべてのウィンドウの終了コールバックがトリガーされます。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window closing and close flag

__追加__:

バージョン2.5で追加。GLFW 3: ウィンドウハンドルパラメータと戻り値を追加。
:::

::: details `glfwSetWindowRefreshCallback()`
この関数は、指定されたウィンドウのリフレッシュコールバックを設定します。このコールバックは、ウィンドウのコンテンツ領域を再描画する必要があるときに呼び出されます。

Aero、Compiz、Aqua、Waylandのような、ウィンドウの内容がオフスクリーンで保存されるコンポジット・ウィンドウ・システムでは、このコールバックは非常にまれにしか呼び出されないか、まったく呼び出されないかもしれません。

```c
GLFWwindowrefreshfun glfwSetWindowRefreshCallback(GLFWwindow * window, GLFWwindowrefreshfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window);
```

コールバック・パラメータについては、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window damage and refresh

__追加__:

バージョン2.5で追加。GLFW 3: ウィンドウハンドルパラメータと戻り値を追加。
:::

::: details `glfwSetWindowFocusCallback()`
この関数は、指定されたウィンドウのフォーカスコールバックを設定します。このコールバックは、ウィンドウが入力フォーカスを得たり失ったりしたときに呼び出されます。

入力フォーカスを失ったウィンドウのフォーカスコールバックが呼ばれた後、押されていたすべての合成キーとマウスボタンのリリースイベントが生成されます。詳しくは、glfwSetKeyCallback と glfwSetMouseButtonCallback を参照してください。

```c
GLFWwindowfocusfun glfwSetWindowFocusCallback(GLFWwindow * window, GLFWwindowfocusfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, int focused)
```

コールバック・パラメータについては、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window input focus

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetWindowIconifyCallback()`
この関数は、指定されたウィンドウのアイコン化コールバックを設定します。このコールバックは、ウィンドウがアイコン化されたときや復元されたときに呼び出されます。

```c
GLFWwindowiconifyfun glfwSetWindowIconifyCallback(GLFWwindow * window, GLFWwindowiconifyfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, int iconified)
```

コールバック・パラメータについては、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__備考__:

- Wayland: XDG-shell プロトコルにはアイコン化のイベントがないため、このコールバックが呼び出されることはありません。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window iconification

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetWindowMaximizeCallback()`
この関数は、指定されたウィンドウの最大化コールバックを設定します。このコールバックは、ウィンドウが最大化または復元されたときに呼び出されます。

```c
GLFWwindowmaximizefun glfwSetWindowMaximizeCallback(GLFWwindow * window, GLFWwindowmaximizefun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, int maximized)
```

コールバック・パラメータについては、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window maximization

__追加__:

バージョン3.3で追加。
:::

::: details `glfwSetFramebufferSizeCallback()`
この関数は、指定されたウィンドウのフレームバッファがサイズ変更されたときに呼び出される、指定されたウィンドウのフレームバッファリサイズコールバックを設定します。

```c
GLFWframebuffersizefun glfwSetFramebufferSizeCallback(GLFWwindow * window, GLFWframebuffersizefun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, int width, int height)
```

コールバック・パラメータについては、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Framebuffer size

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetWindowContentScaleCallback()`
この関数は、指定されたウィンドウのコンテンツスケールが変更されたときに呼び出される、 指定されたウィンドウのウィンドウコンテンツスケールコールバックを設定します。

```c
GLFWwindowcontentscalefun glfwSetWindowContentScaleCallback(GLFWwindow * window, GLFWwindowcontentscalefun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, float xscale, float yscale)
```

コールバック・パラメータについては、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Window content scale
- glfwGetWindowContentScale

__追加__:

バージョン3.3で追加。
:::

::: details `glfwPollEvents()`
この関数は、すでにイベント・キューに入っているイベントのみを処理し、すぐに戻る。イベントを処理すると、それらのイベントに関連するウィンドウ・コールバックと入力コールバックが呼び出される。

いくつかのプラットフォームでは、ウィンドウの移動、サイズ変更、メニュー操作によってイベント処理がブロックされます。これは、それらのプラットフォームでのイベント処理の設計方法によるものです。このような操作の間、必要に応じてウィンドウの内容を再描画するために、ウィンドウのリフレッシュ・コールバックを使用することができます。

設定したコールバックが、このようなイベント処理関数に応答してのみ呼び出されると思わないでください。イベントのためにポーリングすることは必要ですが、GLFWがそれ自身のコールバックを登録することを要求するウィンドウシステムは、多くのウィンドウシステム関数の呼び出しに応答してGLFWにイベントを渡すことができます。GLFWはこれらのイベントをアプリケーションのコールバックに渡してから返します。

ジョイスティック入力の動作にはイベント処理は必要ありません。

```c
void glfwPollEvents(void)
```

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__リエントランシー__:

この関数はコールバックから呼んではならない。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Event processing
- glfwWaitEvents
- glfwWaitEventsTimeout

__追加__:

バージョン1.0で追加。
:::

::: details `glfwWaitEvents()`
この関数は、イベントキューで少なくとも1つのイベントが利用可能になるまで、呼び出したスレッドをスリープさせる。すなわち、キュー内のイベントが処理され、関数はすぐに戻ります。イベントを処理すると、そのイベントに関連するウィンドウと入力のコールバックが呼び出されます。

すべてのイベントがコールバックに関連付けられているわけではないので、すべてのコールバックを監視している場合でも、コールバックが呼び出されずにこの関数が戻ることがあります。

プラットフォームによっては、ウィンドウの移動、サイズ変更、メニュー操作によってイベント処理がブロックされることがあります。これは、それらのプラットフォームでのイベント処理の設計方法によるものです。このような操作の間、必要に応じてウィンドウの内容を再描画するために、ウィンドウのリフレッシュ・コールバックを使用することができます。

設定したコールバックが、このようなイベント処理関数に応答してのみ呼び出されると思わないでください。イベントのためにポーリングすることは必要ですが、GLFWがそれ自身のコールバックを登録することを要求するウィンドウシステムは、多くのウィンドウシステム関数の呼び出しに応答してGLFWにイベントを渡すことができます。GLFWはこれらのイベントをアプリケーションのコールバックに渡してから返します。

ジョイスティック入力の動作にはイベント処理は必要ありません。

```c
void glfwWaitEvents(void)
```

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__リエントランシー__:

この関数はコールバックから呼んではならない。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Event processing
- glfwPollEvents
- glfwWaitEventsTimeout

__追加__:

バージョン2.5で追加。
:::

::: details `glfwWaitEventsTimeout()`
この関数は、イベントキューで少なくとも1つのイベントが利用可能になるまで、あるいは指定されたタイムアウトに達するまで、呼び出し元のスレッドをスリープさせる。つまり、キュー内のイベントが処理され、関数は直ちに戻ります。イベントを処理すると、そのイベントに関連するウィンドウと入力のコールバックが呼び出されます。

タイムアウト値は正の有限の数でなければなりません。

すべてのイベントがコールバックに関連付けられているわけではないので、すべてのコールバックを監視している場合でも、コールバックが呼び出されずにこの関数が戻ることがあります。

プラットフォームによっては、ウィンドウの移動、サイズ変更、メニュー操作によってイベント処理がブロックされることがあります。これは、それらのプラットフォームでのイベント処理の設計方法によるものです。このような操作の間、必要に応じてウィンドウの内容を再描画するために、ウィンドウのリフレッシュ・コールバックを使用することができます。

設定したコールバックが、このようなイベント処理関数に応答してのみ呼び出されると思わないでください。イベントのためにポーリングすることは必要ですが、GLFWがそれ自身のコールバックを登録することを要求するウィンドウシステムは、多くのウィンドウシステム関数の呼び出しに応答してGLFWにイベントを渡すことができます。GLFWはこれらのイベントをアプリケーションのコールバックに渡してから返します。

ジョイスティック入力の動作にはイベント処理は必要ありません。

```c
void glfwWaitEventsTimeout(double timeout)
```

__引数__:

- `[in] timeout`: 最大待機時間（秒）。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_VALUE、GLFW_PLATFORM_ERRORである。

__リエントランシー__:

この関数はコールバックから呼んではならない。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Event processing
- glfwPollEvents
- glfwWaitEvents

__追加__:

バージョン3.2で追加。
:::

::: details `glfwPostEmptyEvent()`
この関数は、現在のスレッドからイベントキューに空のイベントをポストし、glfwWaitEvents または glfwWaitEventsTimeout を返す。

```c
void glfwPostEmptyEvent(void)
```

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Event processing
- glfwWaitEvents
- glfwWaitEventsTimeout

__追加__:

バージョン3.1で追加。
:::

::: details `glfwSwapBuffers()`
この関数は、OpenGLまたはOpenGL ESでレンダリングするときに、指定されたウィンドウの前面バッファと背面バッファを入れ替えます。スワップ間隔が0より大きい場合、GPUドライバはバッファをスワップする前に指定された画面更新回数を待ちます。

指定されたウィンドウはOpenGLまたはOpenGL ESのコンテキストを持っていなければなりません。コンテキストのないウィンドウを指定すると GLFW_NO_WINDOW_CONTEXT エラーが発生します。

この関数はVulkanには適用されません。Vulkanでレンダリングする場合は、代わりにvkQueuePresentKHRを参照してください。

```c
void glfwSwapBuffers(GLFWwindow * window)
```

__引数__:

- `[in] window`: バッファを交換するウィンドウ。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED、 GLFW_NO_WINDOW_CONTEXT、 GLFW_PLATFORM_ERROR です。

__備考__:

- EGL: 指定されたウィンドウのコンテキストは、呼び出し元のスレッドで最新でなければならない。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Buffer swapping
- glfwSwapInterval

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::
