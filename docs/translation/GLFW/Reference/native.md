# ネイティブサポート

> ネイティブのアクセス関数を使用することで、自分が何をしているのか、そしてアクセス関数を使用することで発生する問題の修正方法を知っていることを保証することになる。そうでないなら、使うべきではありません。

glfw3native.hをインクルードする前に、0個以上のウィンドウシステムAPIマクロと0個以上のコンテキスト生成APIマクロを定義することができる。

選択したバックエンドは、ライブラリがコンパイルされたものと一致しなければならない。これを行わないと、リンク時にエラーが発生する。

利用可能なウィンドウAPIマクロは以下のとおりである：

- GLFW_EXPOSE_NATIVE_WIN32
- GLFW_EXPOSE_NATIVE_COCOA
- GLFW_EXPOSE_NATIVE_X11
- GLFW_EXPOSE_NATIVE_WAYLAND

The available context API macros are:

- GLFW_EXPOSE_NATIVE_WGL
- GLFW_EXPOSE_NATIVE_NSGL
- GLFW_EXPOSE_NATIVE_GLX
- GLFW_EXPOSE_NATIVE_EGL
- GLFW_EXPOSE_NATIVE_OSMESA

これらのマクロは、どのネイティブ・アクセス関数を宣言し、どのプラット フォーム固有のヘッダーを含めるかを選択する。どの関数を定義するかは、（定義上、プラットフォーム固有の）コード次第です。

プラットフォーム固有のヘッダをインクルードしたくない場合は、glfw3native.h ヘッダをインクルードする前に GLFW_NATIVE_INCLUDE_NONE を定義してください。

```c
#define GLFW_EXPOSE_NATIVE_WIN32
#define GLFW_EXPOSE_NATIVE_WGL
#define GLFW_NATIVE_INCLUDE_NONE
#include <GLFW/glfw3native.h>
```

[[TOC]]

## 関数

| 関数名                    | 説明                                                               |
|---------------------------|--------------------------------------------------------------------|
| glfwGetWin32Adapter       | 指定されたモニタのアダプタデバイス名を返します。          |
| glfwGetWin32Monitor       | 指定されたモニターの表示デバイス名を返します。          |
| glfwGetWin32Window        | 指定されたウィンドウのHWNDを返します。                          |
| glfwGetWGLContext         | 指定されたウィンドウのHGLRCを返します。                         |
| glfwGetCocoaMonitor       | 指定されたモニターの CGDirectDisplayID を返します。            |
| glfwGetCocoaWindow        | 指定されたウィンドウのNSWindowを返します。                      |
| glfwGetNSGLContext        | 指定されたウィンドウの NSOpenGLContext を返します。               |
| glfwGetX11Display         | GLFW が使用する Display を返す。                                  |
| glfwGetX11Adapter         | 指定されたモニターのRRCrtcを返す。                       |
| glfwGetX11Monitor         | 指定されたモニターの RROutput を返す。                     |
| glfwGetX11Window          | 指定したウィンドウのWindowを返します。                        |
| glfwSetX11SelectionString | 現在の主選択範囲を指定された文字列に設定する。        |
| glfwGetX11SelectionString | 現在の一次選択範囲の内容を文字列として返す。 |
| glfwGetGLXContext         | 指定されたウィンドウの GLXContext を返します。                    |
| glfwGetGLXWindow          | 指定されたウィンドウのGLXWindowを返します。                     |
| glfwGetWaylandDisplay     | GLFWが使用する`wl_display*`構造体を返す。                       |
| glfwGetWaylandMonitor     | 指定されたモニターの`wl_output*`構造体を返す。            |
| glfwGetWaylandWindow      | 指定されたウィンドウのメイン構造体 `wl_surface*` を返します。       |
| glfwGetEGLDisplay         | GLFWが使用するEGLDisplayを返す。                               |
| glfwGetEGLContext         | 指定されたウィンドウの EGLContext を返します。                    |
| glfwGetEGLSurface         | 指定されたウィンドウのEGLSurfaceを返します。                    |
| glfwGetOSMesaColorBuffer  | 指定されたウィンドウに関連付けられたカラーバッファを取得します。   |
| glfwGetOSMesaDepthBuffer  | 指定されたウィンドウに関連付けられている深度バッファを取得します。   |
| glfwGetOSMesaContext      | 指定されたウィンドウのOSMesaContextを返します。                 |

::: details `glfwGetWin32Adapter()`

```c
const char * glfwGetWin32Adapter(GLFWmonitor * monitor)
```

__戻り値__:

指定されたモニターの UTF-8 エンコードされたアダプタデバイス名 (例 `\\.\DISPLAY1`) またはエラーが発生した場合は NULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.1で追加。
:::

::: details `glfwGetWin32Monitor()`

```c
const char * glfwGetWin32Monitor(GLFWmonitor * monitor)
```

__戻り値__:

指定されたモニターのUTF-8エンコードされた表示デバイス名（例 `\\.\DISPLAY1\Monitor0`）、エラーが発生した場合はNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.1で追加。
:::

::: details `glfwGetWin32Window()`

```c
HWND glfwGetWin32Window(GLFWwindow * window)
```

__戻り値__:

指定されたウィンドウのHWND、またはエラーが発生した場合はNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__備考__:

ウィンドウに関連付けられたHDCは、GetDC関数で照会できる。

```c
HDC dc = GetDC(glfwGetWin32Window(window));
```

このDCは非公開であり、公開する必要はない。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetWGLContext()`

```c
HGLRC glfwGetWGLContext(GLFWwindow * window)
```

__戻り値__:

指定されたウィンドウのHGLRC、またはエラーが発生した場合はNULL。

__エラー__:

考えられるエラーは GLFW_NO_WINDOW_CONTEXT と GLFW_NOT_INITIALIZED です。

__備考__:

ウィンドウに関連付けられたHDCは、GetDC関数で照会できる。

```c
HDC dc = GetDC(glfwGetWin32Window(window));
```

このDCは非公開であり、公開する必要はない。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetCocoaMonitor()`

```c
CGDirectDisplayID glfwGetCocoaMonitor(GLFWmonitor * monitor)
```

__戻り値__:

指定されたモニターのCGDirectDisplayID、またはエラーが発生した場合はkCGNullDirectDisplay。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.1で追加。
:::

::: details `glfwGetCocoaWindow()`

```c
id glfwGetCocoaWindow(GLFWwindow * window)
```

__戻り値__:

指定されたウィンドウのNSWindow、またはエラーが発生した場合はnil。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetNSGLContext()`

```c
id glfwGetNSGLContext(GLFWwindow * window)
```

__戻り値__:

指定されたウィンドウの NSOpenGLContext、またはエラーが発生した場合は nil。

__エラー__:

考えられるエラーは GLFW_NO_WINDOW_CONTEXT と GLFW_NOT_INITIALIZED です。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetX11Display()`

```c
Display * glfwGetX11Display(void )
```

__戻り値__:

GLFWが使用するDisplay、エラーが発生した場合はNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetX11Adapter()`

```c
RRCrtc glfwGetX11Adapter(GLFWmonitor * monitor)
```

__戻り値__:

指定されたモニターのRRCrtc、またはエラーが発生した場合はNone。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.1で追加。
:::

::: details `glfwGetX11Monitor()`

```c
RROutput glfwGetX11Monitor(GLFWmonitor * monitor)
```

__戻り値__:

指定されたモニターのRROutput、またはエラーが発生した場合はNone。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.1で追加。
:::

::: details `glfwGetX11Window()`

```c
Window glfwGetX11Window(GLFWwindow * window)
```

__戻り値__:

指定したウィンドウのWindow、エラーが発生した場合はNone。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetX11SelectionString()`

```c
void glfwSetX11SelectionString(const char * string)
```

__引数__:

- `[in] string`: UTF-8でエンコードされた文字列。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

指定された文字列は、この関数が戻る前にコピーされる。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Clipboard input and output
- glfwGetX11SelectionString
- glfwSetClipboardString

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetX11SelectionString()`
選択範囲が空であるか、その内容が変換できない場合、NULL が返され、 GLFW_FORMAT_UNAVAILABLE エラーが発生する。

```c
const char * glfwGetX11SelectionString(void )
```

__戻り値__:

UTF-8エンコードされた文字列としての選択内容の内容、またはエラーが発生した場合はNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

返された文字列はGLFWによって割り当てられ、解放される。自分で解放してはいけない．それは，次にglfwGetX11SelectionStringまたはglfwSetX11SelectionStringを呼ぶか，ライブラリが終了するまで有効である．

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Clipboard input and output
- glfwSetX11SelectionString
- glfwGetClipboardString

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetGLXContext()`

```c
GLXContext glfwGetGLXContext(GLFWwindow * window)
```

__戻り値__:

指定されたウィンドウのGLXContext、またはエラーが発生した場合はNULL。

__エラー__:

考えられるエラーは GLFW_NO_WINDOW_CONTEXT と GLFW_NOT_INITIALIZED です。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetGLXWindow()`

```c
GLXWindow glfwGetGLXWindow(GLFWwindow * window)
```

__戻り値__:

指定されたウィンドウのGLXWindow、またはエラーが発生した場合はNone。

__エラー__:

考えられるエラーは GLFW_NO_WINDOW_CONTEXT と GLFW_NOT_INITIALIZED です。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetWaylandDisplay()`

```c
struct wl_display * glfwGetWaylandDisplay(void)
```

__戻り値__:

GLFWが使用する`wl_display*`構造体、またはエラーが発生した場合はNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetWaylandMonitor()`

```c
struct wl_output * glfwGetWaylandMonitor(GLFWmonitor * monitor)
```

__戻り値__:

指定されたモニターの`wl_output*`構造体、またはエラーが発生した場合はNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetWaylandWindow()`

```c
struct wl_surface * glfwGetWaylandWindow(GLFWwindow * window)
```

__戻り値__:

指定されたウィンドウのメイン構造体 `wl_surface*` またはエラーが発生した場合は NULL。

__エラー__:

Possible errors include GLFW_NOT_INITIALIZED.

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetEGLDisplay()`

```c
EGLDisplay glfwGetEGLDisplay(void)
```

__戻り値__:

GLFWが使用するEGLDisplay、エラーが発生した場合はEGL_NO_DISPLAY。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__備考__:

EGLはオンデマンドで初期化されるため、EGLを介して最初のコンテキストが作成されるまで、この関数はEGL_NO_DISPLAYを返す。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetEGLContext()`

```c
EGLContext glfwGetEGLContext(GLFWwindow * window)
```

__戻り値__:

指定されたウィンドウのEGLContext、エラーが発生した場合はEGL_NO_CONTEXT。

__エラー__:

考えられるエラーは GLFW_NO_WINDOW_CONTEXT と GLFW_NOT_INITIALIZED です。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetEGLSurface()`

```c
EGLSurface glfwGetEGLSurface(GLFWwindow * window)
```

__戻り値__:

指定されたウィンドウのEGLSurface、エラーが発生した場合はEGL_NO_SURFACE。

__エラー__:

考えられるエラーは GLFW_NO_WINDOW_CONTEXT と GLFW_NOT_INITIALIZED です。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetOSMesaColorBuffer()`

```c
int glfwGetOSMesaColorBuffer(GLFWwindow * window, int * width, int * height, int * format, void ** buffer)
```

__引数__:

- `[in] window`: カラーバッファを取得するウィンドウ。
- `[out] width`: カラーバッファの幅を格納する場所、または NULL。
- `[out] height`: カラーバッファの高さを格納する場所、または NULL。
- `[out] format`: カラーバッファのOSMesaピクセルフォーマットを格納する場所、またはNULL。
- `[out] buffer`: カラーバッファのアドレスを格納する場所、またはNULL。

__戻り値__:

成功すればGLFW_TRUE、エラーが発生すればGLFW_FALSE。

__エラー__:

考えられるエラーは GLFW_NO_WINDOW_CONTEXT と GLFW_NOT_INITIALIZED です。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetOSMesaDepthBuffer()`

```c
int glfwGetOSMesaDepthBuffer(GLFWwindow * window, int * width, int * height, int * bytesPerValue, void ** buffer)
```

__引数__:

- `[in] window`: 深度バッファを取得するウィンドウ。
- `[out] width`: デプスバッファの幅を格納する場所、またはNULL。
- `[out] height`: 深度バッファの高さを格納する場所、またはNULL。
- `[out] bytes`: PerValue深度バッファ要素ごとのバイト数を格納する場所、またはNULL。
- `[out] buffer`: デプスバッファのアドレスを格納する場所、またはNULL。

__戻り値__:

成功すればGLFW_TRUE、エラーが発生すればGLFW_FALSE。

__エラー__:

考えられるエラーは GLFW_NO_WINDOW_CONTEXT と GLFW_NOT_INITIALIZED です。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetOSMesaContext()`

```c
OSMesaContext glfwGetOSMesaContext(GLFWwindow * window)
```

__戻り値__:

指定されたウィンドウの OSMesaContext、またはエラーが発生した場合は NULL。

__エラー__:

考えられるエラーは GLFW_NO_WINDOW_CONTEXT と GLFW_NOT_INITIALIZED です。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__追加__:

バージョン3.3で追加。
:::
