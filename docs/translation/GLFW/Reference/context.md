# コンテキスト

これはOpenGLとOpenGL ESのコンテキスト関連関数のリファレンス・ドキュメントです。よりタスク指向の情報については、コンテキストガイドを参照してください。

[[TOC]]

## 型定義

|型定義|説明|
|---|---|
|`typedef void(* GLFWglproc)` | クライアント API 関数のポインタ型。|

::: details `void(* GLFWglproc)`
通常のポインタからのキャストを強いることなく、クライアントAPIの関数ポインタを返すために使用される汎用関数ポインタ。

```c
typedef void(* GLFWglproc) (void)
```

__参照__:

- OpenGL and OpenGL ES extensions
- glfwGetProcAddress

__追加__:

バージョン3.0で追加。
:::

## 関数

|関数名|説明|
|---|---|
| glfwMakeContextCurrent | 指定されたウィンドウのコンテキストを、呼び出し元のスレッドに対してカレントにします。 |
| glfwGetCurrentContext | 呼び出し元のスレッドで現在のコンテキストを持つウィンドウを返します。 |
| glfwSwapInterval | 現在のコンテキストのスワップ間隔を設定します。 |
| glfwExtensionSupported | 指定した拡張子が利用可能かどうかを返します。 |
| glfwGetProcAddress | 現在のコンテキストの指定された関数のアドレスを返します。 |

::: details `glfwMakeContextCurrent()`
この関数は、指定されたウィンドウのOpenGLまたはOpenGL ESコンテキストを、呼び出したスレッドでカレントにします。コンテキストは一度に単一のスレッド上でのみカレントでなければならず、各スレッドは一度に単一のカレントコンテキストしか持つことができません。

スレッド間でコンテキストを移動させる場合は、古いスレッドで非カレントにしてから、新しいスレッドでカレントにしなければならない。

デフォルトでは、コンテキストをnon-currentにすると、暗黙的にパイプラインフラッシュが強制される。GL_KHR_context_flush_controlをサポートするマシンでは、GLFW_CONTEXT_RELEASE_BEHAVIORヒントを設定することによって、コンテキストがこのフラッシュを実行するかどうかを制御することができます。

指定されたウィンドウは、OpenGLまたはOpenGL ESのコンテキストを持っている必要があります。コンテキストのないウィンドウを指定すると、GLFW_NO_WINDOW_CONTEXTエラーが発生します。

```c
void glfwMakeContextCurrent(GLFWwindow * window)
```

__引数__:

- `window [in]`: 現在のコンテキストにするウィンドウ、または現在のコンテキストを切り離すNULL。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED、 GLFW_NO_WINDOW_CONTEXT、 GLFW_PLATFORM_ERROR です。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Current context
- glfwGetCurrentContext

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetCurrentContext()`
この関数は、OpenGLまたはOpenGL ESのコンテキストが呼び出し元のスレッドで現在使用されているウィンドウを返します。

```c
GLFWwindow * glfwGetCurrentContext(void)
```

__戻り値__:

現在のコンテキストを持つウィンドウ、または現在のコンテキストを持つウィンドウがない場合はNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Current context
- glfwMakeContextCurrent

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSwapInterval()`

この関数は、現在のOpenGLまたはOpenGL ESコンテキストのスワップ間隔を設定します。つまり、バッファをスワップして戻る前に、glfwSwapBuffersが呼び出された時点から待機する画面更新の数を設定します。これは垂直同期、垂直リトレース同期、または単にvsyncと呼ばれることがあります。

WGL_EXT_swap_control_tearおよびGLX_EXT_swap_control_tear拡張のいずれかをサポートするコンテキストは、負のスワップ間隔も受け付けます。これらの拡張がサポートされているかどうかは glfwExtensionSupported で確認できます。

コンテキストは、呼び出すスレッド上でカレントでなければならない。現在のコンテキストなしでこの関数を呼び出すと GLFW_NO_CURRENT_CONTEXT エラーが発生します。

この関数はVulkanには適用されません。Vulkanでレンダリングする場合は、代わりにスワップチェーンの現在のモードを参照してください。

```c
void glfwSwapInterval(int interval)
```

__引数__:

- `[in] interval`: glfwSwapBuffersによってバッファがスワップされるまで待つ画面更新の最小回数。

__エラー__:

起こりうるエラーは、GLFW_NOT_INITIALIZED、 GLFW_NO_CURRENT_CONTEXT、GLFW_PLATFORM_ERRORである。

__備考__:

この関数はコンテキストの作成中には呼び出されず、スワップ間隔をそのプラットフォームのデフォルト値のままにしておく。これは、GLFW が使用するスワップ間隔拡張の中には、スワップ間隔を一度ゼロ以外の値に設定するとゼロにリセットできないものがあるためである。

一部のGPUドライバは、アプリケーションの要求を上書きするユーザー設定やドライバのバグが原因で、要求されたスワップ間隔を守らないことがあります。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Buffer swapping
- glfwSwapBuffers

__追加__:

バージョン1.0で追加。
:::

:::details `glfwExtensionSupported()`
この関数は、指定されたAPI拡張が現在のOpenGLまたはOpenGL ESコンテキストでサポートされているかどうかを返します。クライアントAPI拡張とコンテキスト作成API拡張の両方を検索します。

コンテキストは呼び出し元のスレッドで現在使用されている必要があります。現在のコンテキストなしでこの関数を呼び出すと、GLFW_NO_CURRENT_CONTEXTエラーが発生します。

この関数は呼び出すたびに1つ以上の拡張文字列を検索するので、頻繁に使用する場合は結果をキャッシュしておくことを推奨します。拡張文字列はコンテキストの有効期間中に変更されることはないので、これを行うことに危険はありません。

この関数はVulkanには適用されません。Vulkan を使用している場合は、代わりに glfwGetRequiredInstanceExtensions, vkEnumerateInstanceExtensionProperties, vkEnumerateDeviceExtensionProperties を参照してください。

```c
int glfwExtensionSupported(const char * extension)
```

__引数__:

- `[in] extension`: ASCIIエンコードされた拡張子の名前。

__戻り値__:

拡張が利用可能であれば GLFW_TRUE、そうでなければ GLFW_FALSE。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、 GLFW_NO_CURRENT_CONTEXT、 GLFW_INVALID_VALUE、 GLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- OpenGL and OpenGL ES extensions
- glfwGetProcAddress

__追加__:

バージョン1.0で追加。
:::

:::details `glfwGetProcAddress()`
この関数は、指定されたOpenGLまたはOpenGL ESコアまたは拡張関数のアドレスを返します（現在のコンテキストでサポートされている場合）。

コンテキストは、呼び出し元のスレッドでカレントでなければなりません。現在のコンテキストなしでこの関数を呼び出すと、GLFW_NO_CURRENT_CONTEXTエラーが発生します。

この関数はVulkanには適用されません。Vulkanでレンダリングする場合は、代わりにglfwGetInstanceProcAddress、vkGetInstanceProcAddr、vkGetDeviceProcAddrを参照してください。

```c
GLFWglproc glfwGetProcAddress(const char * procname)
```

__引数__:

- `[in] procname`: ASCIIエンコードされた関数名。

__戻り値__:

関数のアドレス。エラーが発生した場合は NULL。

__エラー__:

起こりうるエラーは、GLFW_NOT_INITIALIZED、 GLFW_NO_CURRENT_CONTEXT、GLFW_PLATFORM_ERRORである。

__備考__:

与えられた関数のアドレスは、コンテキスト間で同じであることは保証されない。

この関数は、関連するバージョンや拡張が利用できないにもかかわらず、NULLでないアドレスを返すことがある。常に、最初にコンテキストのバージョンまたは拡張子の文字列を確認する。

__ポインタの寿命__:

返された関数ポインターは、コンテキストが破棄されるかライブラリが終了するまで有効である。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- OpenGL and OpenGL ES extensions
- glfwExtensionSupported

__追加__:

バージョン1.0で追加。
:::
