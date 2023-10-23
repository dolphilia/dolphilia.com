# 初期化・バージョン・エラー

これは、ライブラリーの初期化と終了、バージョン管理、エラー処理に関するリファレンス・ドキュメントである。タスク指向の情報については、API入門を参照してください。

[[TOC]]

## モジュール

|モジュール|説明|
|---|---|
|エラーコード|エラーコード。|

## マクロ

|マクロ|説明|
|---|---|
|GLFW_TRUE | 1 |
|GLFW_FALSE | 0 |
|GLFW_JOYSTICK_HAT_BUTTONS | ジョイスティックのハットボタンのヒント。 |
|GLFW_COCOA_CHDIR_RESOURCES | macOS固有のinitヒント。 |
|GLFW_COCOA_MENUBAR | macOS固有のinitヒント。 |

:::details GLFW_VERSION_MAJOR
GLFWヘッダーのメジャーバージョン番号。これは、APIが互換性のない方法で変更されたときにインクリメントされる。

```c
#define GLFW_VERSION_MAJOR 3
```

:::

::: details GLFW_VERSION_MINOR
GLFWヘッダーのマイナーバージョン番号。これはAPIに機能が追加されたときにインクリメントされるが、後方互換性は保たれる。

```c
#define GLFW_VERSION_MINOR 3
```

:::

::: details GLFW_VERSION_REVISION
GLFWヘッダーのリビジョン番号。これは、APIの変更を含まないバグフィックスリリースが行われたときにインクリメントされる。

```c
#define GLFW_VERSION_REVISION 8
```

:::

::: details GLFW_TRUE
これは数字の1に対する意味上のシュガーでしかない。代わりに1、true、_True、GL_TRUE、VK_TRUEなど、1と等しいものを使うことができる。

```c
#define GLFW_TRUE 1
```

:::

::: details GLFW_FALSE
これは数字の0に対する意味上のシュガーにすぎない。 代わりに0、false、_False、GL_FALSE、VK_FALSEなど、0に等しいものを使うことができる。

```c
#define GLFW_FALSE 0
```

:::

::: details GLFW_JOYSTICK_HAT_BUTTONS
ジョイスティックのハットボタンのヒント。

```c
#define GLFW_JOYSTICK_HAT_BUTTONS 0x00050001
```

:::

::: details GLFW_COCOA_CHDIR_RESOURCES
macOS固有のinitヒント。

```c
#define GLFW_COCOA_CHDIR_RESOURCES   0x00051001
```

:::

::: details GLFW_COCOA_MENUBAR
macOS固有のinitヒント。

```c
#define GLFW_COCOA_MENUBAR   0x00051002
```

:::

## 型定義

|名前|説明|
|---|---|
| `void(* GLFWerrorfun)` | エラーコールバック用の関数ポインタ型。 |

:::details `void(* GLFWerrorfun)`
これはエラー・コールバック用の関数ポインタ型である。エラー・コールバック関数は以下のシグネチャを持つ：

```c
void callback_name(int error_code, const char* description)
```

---

```c
typedef void(* GLFWerrorfun) (int error_code, const char *description)
```

__引数__:

- `[in] error_code`: エラーコード。将来のリリースではエラーコードが追加されるかもしれない。
- `[in] description`: エラーを表すUTF-8エンコードされた文字列。

__ポインタの寿命__:

エラー説明文字列は、コールバック関数が戻るまで有効である。

__参照__:

- Error handling
- glfwSetErrorCallback

__追加__:

バージョン3.0で追加。
:::

## 関数

|関数名|説明|
|---|---|
| glfwInit | GLFWライブラリを初期化する。 |
| glfwTerminate | GLFWライブラリを終了する。 |
| glfwInitHint | 指定されたinitヒントを目的の値に設定する。 |
| glfwGetVersion | GLFWライブラリのバージョンを取得する。 |
| glfwGetVersionString | コンパイル時の設定を表す文字列を返します。 |
| glfwGetError | 呼び出し元スレッドの最後のエラーを返し、クリアする。 |
| glfwSetErrorCallback | エラー・コールバックを設定します。 |

:::details `glfwInit()`
この関数はGLFWライブラリを初期化する。ほとんどのGLFW関数が使用できるようになる前に、GLFWは初期化されなければならず、アプリケーションが終了する前に、初期化中または初期化後に割り当てられたリソースを解放するために、GLFWは終了されなければならない。

この関数が失敗した場合、戻る前にglfwTerminateを呼び出す。成功した場合は、アプリケーションが終了する前にglfwTerminateを呼び出す必要があります。

初期化に成功した後、終了する前にこの関数を追加で呼び出すと、すぐに GLFW_TRUE が返されます。

```c
int glfwInit(void )
```

__戻り値__:

成功すればGLFW_TRUE、エラーが発生すればGLFW_FALSE。

__エラー__:

考えられるエラーはGLFW_PLATFORM_ERRORである。

__備考__:

macOS: この関数は、アプリケーションのカレントディレクトリを、もし存在すれば、アプリケーションのバンドルのContents/Resourcesサブディレクトリに変更します。これはGLFW_COCOA_CHDIR_RESOURCES initヒントで無効にできます。

X11: この関数は、アプリケーションのロケールのLC_CTYPEカテゴリがまだ "C "の場合、現在の環境に従って設定します。これは、"C "ロケールがUnicodeテキスト入力を壊すためです。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Initialization and termination
- glfwTerminate

__追加__:

バージョン1.0で追加。
:::

::: details `glfwTerminate()`
この関数は、残っているウィンドウとカーソルをすべて破棄し、変更されたガンマ・ランプを復元し、その他の割り当てられたリソースを解放します。この関数が呼び出されると、ほとんどの GLFW 関数を使用できるようになる前に、再度 glfwInit を正常に呼び出す必要があります。

GLFWが正常に初期化された場合、この関数はアプリケーションが終了する前に呼ばれなければなりません。初期化に失敗した場合は，glfwInitが失敗を返す前にこの関数が呼ばれるので，この関数を呼ぶ必要はありません．

GLFWが初期化されていない場合、この関数は何の効果もない。

```c
void glfwTerminate(void)
```

__エラー__:

考えられるエラーはGLFW_PLATFORM_ERRORである。

__備考__:

この関数はglfwInitの前に呼び出される。

__警告__:

この関数が呼ばれたとき、残っているウィンドウのコンテキストは、他のスレッドで現在進行中であってはならない。

__リエントランシー__:

この関数はコールバックから呼んではならない。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Initialization and termination
- glfwInit

__追加__:

バージョン1.0で追加。
:::

::: details `glfwInitHint()`
この関数はGLFWの次の初期化のためのヒントを設定する。

ヒントを設定した値は GLFW によってリセットされることはなく、初期化中にのみ有効になります。一度GLFWが初期化されると，ライブラリが終了して再度初期化されるまで， 設定した値は無視される．

いくつかのヒントはプラットフォーム固有である。これらはどのプラットフォームでも設定できますが、その特定のプラットフォームにのみ影響します。他のプラットフォームでは無視される。これらのヒントを設定するのに、プラットフォーム固有のヘッダーや関数は必要ありません。

```c
void glfwInitHint(int hint, int value)
```

__引数__:

- `[in] hint`: 設定するinitヒント。
- `[in] value`: initヒントの新しい値。

__エラー__:

起こりうるエラーは GLFW_INVALID_ENUM と GLFW_INVALID_VALUE である。

__備考__:

この関数はglfwInitの前に呼び出される。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- init_hints
- glfwInit

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetVersion()`
この関数は、GLFWライブラリのメジャー番号、マイナー番号、リビジョン番号を取得します。GLFWを共有ライブラリとして使用していて、必要最小限のバージョンを使用していることを確認したい場合を想定しています。

バージョン引数のいずれか、またはすべては NULL であってもよい。

```c
void glfwGetVersion(int * major, int * minor, int * rev)
```

__引数__:

- `[out] major`: メジャーバージョン番号を格納する場所、またはNULL。
- `[out] minor`: マイナーバージョン番号を格納する場所、またはNULL。
- `[out] rev`: リビジョン番号を格納する場所、またはNULL。

__エラー__:

なし。

__備考__:

この関数はglfwInitの前に呼び出される。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Version management
- glfwGetVersionString

__追加__:

バージョン1.0で追加。
:::

::: details `glfwGetVersionString()`
この関数は、コンパイル時に生成されたGLFWライブラリバイナリのバージョン文字列を返します。これは、バージョン、プラットフォーム、コンパイラ、およびプラットフォーム固有のコンパイル時オプションを記述します。glGetStringで問い合わせるOpenGLやOpenGL ESのバージョン文字列と混同しないでください。

GLFWライブラリのバージョンを解析するためにバージョン文字列を使用しないでください。glfwGetVersion関数は、実行中のライブラリバイナリのバージョンを数値形式で提供します。

```c
const char * glfwGetVersionString(void)
```

__戻り値__:

ASCIIエンコードされたGLFWバージョン文字列。

__エラー__:

なし。

__備考__:

この関数はglfwInitの前に呼び出される。

__ポインタの寿命__:

返される文字列は静的で、コンパイル時に生成される。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Version management
- glfwGetVersion

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetError()`
この関数は、呼び出し元のスレッドで発生した最後のエラーのエラーコードと、オプションとして UTF-8 でエンコードされた人間が読める説明を返し、クリアする。最後の呼び出しからエラーが発生していない場合、GLFW_NO_ERROR (ゼロ) を返し、説明ポインタは NULL に設定される。

```c
int glfwGetError(const char ** description)
```

__引数__:

- `[in] description`: エラー説明ポインタを格納する場所、またはNULL。

__戻り値__:

呼び出しスレッドの最後のエラーコード、または GLFW_NO_ERROR（ゼロ）。

__エラー__:

なし。

__ポインタの寿命__:

返された文字列はGLFWによって割り当てられ、解放される。自分で解放してはならない。次のエラーが発生するかライブラリが終了するまで有効であることが保証される。

__備考__:

この関数はglfwInitの前に呼び出される。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Error handling
- glfwSetErrorCallback

__追加__:

バージョン3.3で追加。
:::

::: details `glfwSetErrorCallback()`
この関数はエラーコールバックを設定し、GLFWエラーが発生するたびにエラーコードと人間が読める説明文とともに呼び出される。

エラーコードはコールバックが呼ばれる前に設定されます。エラーコールバックからglfwGetErrorを呼び出すと、エラーコードの引数と同じ値が返されます。

エラーコールバックはエラーが発生したスレッドで呼ばれる．複数のスレッドからGLFWを使用する場合は、エラーコールバックもそれに合わせて記述する必要があります。

説明文字列はそのエラーのために特別に生成された可能性があるため、コールバックが返った後の有効性は保証されません。コールバックが返った後に使用したい場合は、コピーを作成する必要があります。

一度設定されたエラー・コールバックは、ライブラリが終了した後も設定されたままとなる。

```c
GLFWerrorfun glfwSetErrorCallback(GLFWerrorfun callback)
```

__引数__:

- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていない場合は NULL。

__コールバック署名__:

```c
void callback_name(int error_code, const char* description)
```

コールバック・パラメータの詳細については、コールバック・ポインタ・タイプを参照のこと。

__エラー__:

なし。

__備考__:

この関数はglfwInitの前に呼び出される。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Error handling
- glfwGetError

__追加__:

バージョン3.0で追加。
:::
