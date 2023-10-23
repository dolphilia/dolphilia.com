# Vulkanサポート

これは、Vulkan関連の関数と型のリファレンス・ドキュメントです。フォースク指向の情報については、Vulkanガイドを参照してください。

[[TOC]]

## 型定義

|名前|説明|
|---|---|
| void(* GLFWvkproc) | Vulkan API関数ポインタタイプ。 |

::: details `void(* GLFWvkproc)`
通常のポインタからキャストを強制せずにVulkan API関数ポインタを返すために使用される汎用関数ポインタ。

```c
typedef void(* GLFWvkproc) (void)
```

__参照__:

- Querying Vulkan function pointers
- glfwGetInstanceProcAddress

__追加__:

バージョン3.2で追加。
:::

## 関数

| 名前                                     | 説明                                                           |
|------------------------------------------|----------------------------------------------------------------|
| glfwVulkanSupported                      | VulkanローダーとICDが見つかったかどうかを返します。 |
| glfwGetRequiredInstanceExtensions        | GLFWが必要とするVulkanインスタンス拡張を返す。       |
| glfwGetInstanceProcAddress               | 指定されたVulkanインスタンス関数のアドレスを返します。 |
| glfwGetPhysicalDevicePresentationSupport | 指定されたキューファミリが画像を提示できるかどうかを返します。 |
| glfwCreateWindowSurface                  | 指定したウィンドウのVulkanサーフェスを作成します。             |

::: details `glfwVulkanSupported()`
この関数は、Vulkanローダーと最低限機能するICDが見つかったかどうかを返します。

VulkanローダーとICDが利用可能であっても、それ自体がサーフェス作成やインスタンス作成が可能であることを保証するものではありません。glfwGetRequiredInstanceExtensionsを呼び出して、Vulkanサーフェス作成に必要な拡張が利用可能かどうかをチェックし、glfwGetPhysicalDevicePresentationSupportを呼び出して、物理デバイスのキューファミリが画像プレゼンテーションをサポートしているかどうかをチェックします。

```c
int glfwVulkanSupported(void)
```

__戻り値__:

Vulkanが最低限利用可能であればGLFW_TRUE、そうでなければGLFW_FALSE。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Querying for Vulkan support

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetRequiredInstanceExtensions()`
この関数は、GLFW ウィンドウ用の Vulkan サーフェスを作成するために GLFW が必要とする Vulkan インスタンス拡張の名前の配列を返します。成功した場合、リストは常に VK_KHR_surface を含むので、追加の拡張を必要としない場合は、このリストを VkInstanceCreateInfo 構造体に直接渡すことができます。

Vulkanがマシンで利用できない場合、この関数はNULLを返し、GLFW_API_UNAVAILABLEエラーを生成します。glfwVulkanSupportedを呼び出して、Vulkanが少なくとも最低限利用可能かどうかを確認してください。

Vulkanが利用可能であっても、ウィンドウサーフェス作成を可能にする拡張機能のセットが見つからなかった場合、この関数はNULLを返します。オフスクリーンレンダリングや計算作業のためにVulkanを使用することはできます。

```c
const char ** glfwGetRequiredInstanceExtensions(uint32_t * count)
```

__引数__:

- `[out] count`: 返された配列の拡張子の数を格納する場所。エラーが発生した場合は 0 が格納される。

__戻り値__:

ASCII エンコードされた拡張子名の配列。エラーが発生した場合は NULL。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_API_UNAVAILABLE である。

__備考__:

GLFW の将来のバージョンでは、追加の拡張が必要になるかもしれません。VkInstanceCreateInfo 構造体の中で一度だけ拡張を指定するのはエラーであるため、有効にしたい拡張がすでに返された配列の中にあるかどうかを確認する必要があります。

__ポインタの寿命__:

返された配列はGLFWによって割り当てられ、解放される。自分で解放してはならない。ライブラリが終了するまで有効であることが保証されている。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Querying required Vulkan extensions
- glfwCreateWindowSurface

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetInstanceProcAddress()`
この関数は、指定されたインスタンスの指定されたVulkanコアまたは拡張関数のアドレスを返します。instanceがNULLに設定されている場合、少なくとも以下の関数を含む、Vulkanローダーからエクスポートされた任意の関数を返すことができます：

- vkEnumerateInstanceExtensionProperties
- vkEnumerateInstanceLayerProperties
- vkCreateInstance
- vkGetInstanceProcAddr

Vulkanがマシンで利用できない場合、この関数はNULLを返し、GLFW_API_UNAVAILABLEエラーを生成します。glfwVulkanSupportedを呼び出して、Vulkanが少なくとも最低限利用可能かどうかをチェックします。

この関数は、フォールバックとしてVulkanローダーのプラットフォーム固有のクエリでvkGetInstanceProcAddrを呼び出すことと同等です。

```c
GLFWvkproc glfwGetInstanceProcAddress(VkInstance instance, const char * procname)
```

__引数__:

- `[in] instance`: 問い合わせるVulkanインスタンス、またはインスタンス生成に関連する関数を取得する場合はNULL。
- `[in] procname`: ASCIIエンコードされた関数名。

__戻り値__:

関数のアドレス。エラーが発生した場合は NULL。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_API_UNAVAILABLE である。

__ポインタの寿命__:

返された関数ポインターは、ライブラリーが終了するまで有効である。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Querying Vulkan function pointers

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetPhysicalDevicePresentationSupport()`
この関数は、指定された物理デバイスの指定されたキューファミリーが、GLFWが構築されたプラットフォームへの表示をサポートしているかどうかを返します。

Vulkanまたは必要なウィンドウサーフェス作成インスタンス拡張がマシン上で利用できない場合、または指定されたインスタンスが必要な拡張で作成されなかった場合、この関数はGLFW_FALSEを返し、GLFW_API_UNAVAILABLEエラーを生成します。glfwVulkanSupportedを呼び出してVulkanが最低限利用可能かどうかをチェックし、glfwGetRequiredInstanceExtensionsを呼び出してどのインスタンス拡張が必要かをチェックする。

```c
int glfwGetPhysicalDevicePresentationSupport(VkInstance instance, VkPhysicalDevice device, uint32_t queuefamily)
```

__引数__:

- `[in] instance`: 物理デバイスが属するインスタンス。
- `[in] device`: キューファミリが属する物理デバイス。
- `[in] queuefamily`: 問い合わせるキューファミリーのインデックス。

__戻り値__:

キューファミリーがプレゼンテーションをサポートしていれば GLFW_TRUE、そうでなければ GLFW_FALSE。

__エラー__:

起こりうるエラーは、GLFW_NOT_INITIALIZED、 GLFW_API_UNAVAILABLE、GLFW_PLATFORM_ERRORである。

__備考__:

macOS: VK_MVK_macos_surface と VK_EXT_metal_surface 拡張は `vkGetPhysicalDevice*PresentationSupport` タイプの関数を提供していないため、この関数は現在常に GLFW_TRUE を返します。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができます。Vulkanオブジェクトの同期の詳細については、Vulkan仕様を参照してください。

__参照__:

Vulkanプレゼンテーション・サポートの問い合わせ

__追加__:

バージョン3.2で追加。
:::

::: details `glfwCreateWindowSurface()`
この関数は、指定されたウィンドウのVulkanサーフェスを作成します。

Vulkanローダーまたは少なくとも1つの最低限機能するICDが見つからなかった場合、この関数はVK_ERROR_INITIALIZATION_FAILEDを返し、GLFW_API_UNAVAILABLEエラーを生成します。glfwVulkanSupportedを呼び出して、Vulkanが少なくとも最低限利用可能かどうかをチェックする。

必要なウィンドウサーフェス作成インスタンス拡張が利用できない場合、または指定されたインスタンスがこれらの拡張を有効にして作成されていない場合、この関数はVK_ERROR_EXTENSION_NOT_PRESENTを返し、GLFW_API_UNAVAILABLEエラーを生成します。どのようなインスタンス拡張が必要かを確認するには， glfwGetRequiredInstanceExtensions を呼び出します．

ウィンドウサーフェスは他のAPIと共有できないので、ウィンドウはGLFW_NO_APIに設定されたクライアントAPIヒントで作成されなければなりません、そうでなければGLFW_INVALID_VALUEエラーを生成し、VK_ERROR_NATIVE_WINDOW_IN_USE_KHRを返します。

ウィンドウサーフェスは、指定されたVulkanインスタンスの前に破棄されなければなりません。ウィンドウサーフェスを破棄するのは呼び出し元の責任です。GLFWはあなたのためにそれを破壊しません。サーフェスを破棄するにはvkDestroySurfaceKHRを呼び出します。

```c
VkResult glfwCreateWindowSurface(VkInstance instance, GLFWwindow * window, const VkAllocationCallbacks * allocator, VkSurfaceKHR * surface)
```

__引数__:

- `[in] instance`: サーフェスを作成するVulkanインスタンス。
- `[in] window`: サーフェスを作成するウィンドウ。
- `[in] allocator`: デフォルトのアロケータを使う場合は NULL。
- `[out] surface`: サーフェスのハンドルを格納する場所。エラーが発生した場合は VK_NULL_HANDLE に設定されます。

__戻り値__:

成功した場合はVK_SUCCESS、エラーが発生した場合はVulkanエラーコード。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED、 GLFW_API_UNAVAILABLE、 GLFW_PLATFORM_ERROR、 GLFW_INVALID_VALUE です。

__備考__:

作成呼び出しが行われる前にエラーが発生した場合、GLFWはそのエラーに最も適したVulkanエラーコードを返します。glfwVulkanSupportedとglfwGetRequiredInstanceExtensionsを適切に使用することで、これらのエラーの発生はほとんどなくなるはずです。

- macOS: GLFW は VK_EXT_metal_surface エクステンションを優先し、VK_MVK_macos_surface エクステンションをフォールバックとします。もしあれば、選択された拡張の名前は glfwGetRequiredInstanceExtensions が返す配列に含まれます。
- macOS: この関数は、MoltenVKが機能するために必要なウィンドウコンテンツビュー用のCAMetalLayerインスタンスを生成し、設定する。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができます。Vulkanオブジェクトの同期の詳細については、Vulkan仕様を参照してください。

__参照__:

- Creating a Vulkan window surface
- glfwGetRequiredInstanceExtensions

__追加__:

バージョン3.2で追加。
:::
