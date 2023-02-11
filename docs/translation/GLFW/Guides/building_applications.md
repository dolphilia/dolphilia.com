# GLFWビルディングアプリケーション（日本語訳）

[原文](https://www.glfw.org/docs/latest/build_guide.html)

GLFWを使ったアプリケーションのコンパイルとリンクについて扱います。アプリケーションの書き方については[入門チュートリアル](https://www.glfw.org/docs/latest/quick_guide.html)から始めてください。GLFWライブラリ自体のコンパイル方法については[GLFWのコンパイル](https://www.glfw.org/docs/latest/compile_guide.html)を参照してください。

このガイドはコンパイルやリンクのためのチュートリアルではありません。Cプログラムのコンパイルとリンクの方法、およびあなたが選んだ開発環境の特定のコンパイラの使用方法についての基本的な理解を前提としています。コンパイルとリンクのプロセスは、C言語プログラミングの教材や開発環境のドキュメントで説明されているはずです。

## GLFWヘッダーファイルのインクルード

OpenGLまたはGLFWを使用するソースファイルには、GLFWヘッダをインクルードする必要があります。

```c
#include <GLFW/glfw3.h>
```

このヘッダはGLFW APIのすべての定数を定義し、すべての型と関数プロトタイプを宣言しています。デフォルトでは開発環境にあるOpenGLヘッダも含まれます。OpenGL ESヘッダを選択する方法などは[オプションマクロ](https://www.glfw.org/docs/latest/build_guide.html#build_macros)を参照してください。

GLFWヘッダはOpenGLヘッダが必要とするプラットフォーム固有のマクロも定義しているので、ウィンドウシステムヘッダを必要とせずにインクルードすることができます。

これは必要なときだけ行なうので、ウィンドウシステムヘッダが含まれていても、 GLFWヘッダはそれらのシンボルを再定義しません。逆にWin32のシンボルがすでに定義されている場合はwindows.hは対処できません。

要点：

- OpenGLまたはOpenGL ESヘッダをポータブルにインクルードするにはGLFWヘッダを使用します
- これらのAPIを直接使用するのでなければウィンドウシステムヘッダを含めないでください
- このようなヘッダが必要な場合はGLFWヘッダの前にインクルードしてください。

[glad](https://github.com/Dav1dde/glad)のようなOpenGL拡張ローダーライブラリを使用している場合、拡張ローダーヘッダはGLFWのものよりも先に含まれる必要があります。GLFWは、それ以前に含まれるOpenGLまたはOpenGL ESヘッダー、あるいは拡張ローダーヘッダーを検出しようとし、その後デフォルトのOpenGLヘッダーの包含を無効にします。ほとんどの拡張ローダーはそれ以下の類似のヘッダーを無効にするマクロを定義します。

```c
#include <glad/gl.h>
#include <GLFW/glfw3.h>
```

これらのメカニズムは両方とも、拡張ローダーヘッダが既知のマクロを定義することに依存します。そうでない場合、あるいはユーザーがどちらを選ぶかわからない場合、[GLFW_INCLUDE_NONE](https://www.glfw.org/docs/latest/build_guide.html#GLFW_INCLUDE_NONE)マクロはGLFWヘッダーがOpenGLヘッダーを含むことを明示的に防止します。これはまた、2つのヘッダを任意の順序でインクルードすることを可能にします。

```c
#define GLFW_INCLUDE_NONE
#include <GLFW/glfw3.h>
#include <glad/gl.h>
```

## GLFWヘッダーオプションマクロ

これらのマクロはGLFWヘッダをインクルードする前に定義され、その動作に影響を与えることがあります。

GLFW_DLLは、WindowsでGLFW DLLを使用する場合に必要であり、コンパイラにGLFW関数がDLLで定義されていることを知らせます。

以下のマクロは、どのOpenGLまたはOpenGL ES APIヘッダを含めるかを制御します。一度に定義できるのはこれらのうちの1つだけです。

> Note:
> GLFWでは、以下に挙げるAPIヘッダは提供していません。これらはあなたの開発環境、あるいはOpenGL、OpenGL ES、Vulkan SDKから提供され、そのほとんどはKhronos Registryからダウンロードすることができます。

GLFW_INCLUDE_GLCOREARBはGLFWヘッダーに、通常のOpenGLヘッダーの代わりに最新のGL/glcorearb.hヘッダー（macOSではOpenGL/gl3.h）を含ませるようにします。

GLFW_INCLUDE_ES1はGLFWヘッダーに、通常のOpenGLヘッダーの代わりにOpenGL ES 1.x GLES/gl.hヘッダーをインクルードするようにします。

GLFW_INCLUDE_ES2はGLFWヘッダーに、通常のOpenGLヘッダーの代わりにOpenGL ES 2.0 GLES2/gl2.hヘッダーをインクルードするようにします。

GLFW_INCLUDE_ES3はGLFWヘッダーに、通常のOpenGLヘッダーの代わりにOpenGL ES 3.0 GLES3/gl3.hヘッダーを含めるようにします。

GLFW_INCLUDE_ES31はGLFWヘッダーに、通常のOpenGLヘッダーの代わりにOpenGL ES 3.1 GLES3/gl31.hヘッダーをインクルードするようにsimasu
。

GLFW_INCLUDE_ES32はGLFWヘッダーに、通常のOpenGLヘッダーの代わりにOpenGL ES 3.2 GLES3/gl32.hヘッダーをインクルードするようにしました。

GLFW_INCLUDE_NONEはGLFWヘッダーがOpenGLまたはOpenGL ES APIヘッダーを一切含まないようにします。これは拡張ローディング・ライブラリとの組み合わせで有効です。

上記のインクルードマクロのいずれも定義されていない場合、GLFWが知っているOpenGL、OpenGL ES、拡張ローダーヘッダのインクルードガードを検出しない限り、標準のOpenGL GL/gl.h (macOSではOpenGL/gl.h)がインクルードされます．

以下のマクロは、追加のAPIヘッダーの包含を制御します。これらのうちのいくつでも、同時に、そして/または、上記のマクロのうちの1つと一緒に定義することができます。

GLFW_INCLUDE_VULKANは、GLFWヘッダーに、選択されたOpenGLまたはOpenGL ESヘッダーに加え、Vulkan vulkan/vulkan.hヘッダーを含めるようにします。

GLFW_INCLUDE_GLEXT は、GLFW ヘッダーに、上で選択された OpenGL または OpenGL ES ヘッダーの後に、そのヘッダーに加え、適切な拡張ヘッダーをインクルードするようにします。

GLFW_INCLUDE_GLUは、ヘッダーに、上で選択されたヘッダーに加え、GLUヘッダーをインクルードするようにします。これは、標準のOpenGLヘッダと一緒に、レガシーコードとの互換性のためにのみ、使用されるべきです。GLUは非推奨であり、新しいコードで使用するべきではありません。

> これらのマクロは、GLFW自体のコンパイル中には定義してはいけません。もし、あなたのビルドがGLFWを含み、あなたのビルドファイルでこれらを定義した場合、それらがGLFWのソースに適用されないことを確認してください。

## 適切なライブラリとのリンク

GLFWは本質的に、様々なプラットフォーム固有のAPIのラッパーであり、そのため、多くの異なるシステムライブラリに対してリンクする必要があります。GLFWを共有ライブラリ/ダイナミックライブラリ/DLLとして使用する場合、これらのリンクはGLFWが行います。しかし、GLFW を静的ライブラリとして使っている場合は、あなたの実行ファイル がこれらのライブラリにリンクする必要があります。

WindowsとmacOSでは、システムライブラリのリストは静的で、ビルド環境にハードコードすることができます。以下の開発環境に関するセクションを参照してください。Linuxやその他のUnix系OSの場合、リストは様々ですが、以下のように様々な方法で取得することができます。

リンクの一般的な入門書としては、David Drysdale著 [Beginner's Guide to Linkers](https://www.lurklurk.org/linkers/linkers.html) がよいでしょう。

## WindowsでMinGWまたはVisual C++を使用した場合

GLFWライブラリの静的バージョンはglfw3という名前です。このバージョンを使用する場合、GLFWが使用するいくつかのライブラリとのリンクも必要です。

MinGWを使用してGLFWの静的バージョンとアプリケーションをリンクする場合、明示的にgdi32ともリンクする必要があります。MinGW-w64を含む他のツールチェーンでは、user32やkernel32などの他の依存関係とともに、デフォルトのライブラリのセットに含まれています。

GLFW DLLのリンクライブラリはglfw3dllという名前です．GLFWのDLL版を使うアプリケーションをコンパイルするときは、 GLFWヘッダをインクルードする前に、[GLFW_DLL](https://www.glfw.org/docs/latest/build_guide.html#GLFW_DLL)マクロを定義する必要があります。これは、コンパイラのスイッチか、ソースコードに定義することで可能です。

## CMakeとGLFWのソースで

このセクションでは、CMakeを使って、アプリケーションと一緒にGLFWをコンパイル・リンクする方法について説明します。もし、代わりにインストールされたバイナリを使いたい場合は、 [CMakeとインストールされたGLFWバイナリ(https://www.glfw.org/docs/latest/build_guide.html#build_link_cmake_package)を参照して下さい。

CMakeLists.txtを少し変更するだけで、アプリケーションと一緒にGLFWのソースツリーをビルドすることができます。

GLFWをビルドの一部として含める場合、おそらくGLFWのテスト、サンプル、ドキュメントをビルドしたくないと思います。これらを無効にするには、GLFWソースツリーを追加する前に、対応するキャッシュ変数を設定します。

```sh
set(GLFW_BUILD_DOCS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_TESTS OFF CACHE BOOL "" FORCE)
set(GLFW_BUILD_EXAMPLES OFF CACHE BOOL "" FORCE)
```

GLFWのソースツリーのルートディレクトリをプロジェクトに追加します。これで、glfwターゲットがプロジェクトに追加されます。

```sh
add_subdirectory(path/to/glfw)
```

GLFWが追加されたら、あなたのアプリケーションをglfwターゲットに対してリンクしてください。これにより、現在設定されている GLFW ライブラリとそのリンク時の依存関係、 GLFW ヘッダのインクルードディレクトリ、そして、該当する場合は[GLFW_DLL](https://www.glfw.org/docs/latest/build_guide.html#GLFW_DLL)マクロが追加されます。

```sh
target_link_libraries(myapp glfw)
```

GLFWはランタイムに必要なOpenGL、OpenGL ESまたはVulkanライブラリをロードするので、glfwターゲットはOpenGLに依存しないことに注意してください。もしあなたのアプリケーションが、最新の[拡張ローダーライブラリ](https://www.glfw.org/docs/latest/context_guide.html#context_glext_auto)を使う代わりに、OpenGLを直接呼び出すなら、OpenGL CMakeパッケージを使ってください。

```sh
find_package(OpenGL REQUIRED)
```

OpenGLが見つかった場合、OpenGL::GLターゲットがあなたのプロジェクトに追加され、ライブラリとインクルードディレクトリのパスが含まれます。他のライブラリと同様に、これに対してリンクしてください。

```sh
target_link_libraries(myapp OpenGL::GL)
```

CMakeでビルドしたプログラムとGLFWソースの最小限の例については、GitHubの[GLFW CMake Starter](https://github.com/juliettef/GLFW-CMake-starter)をご覧ください。

## CMakeとインストールされたGLFWバイナリで

この節では、GLFWがビルドされインストールされた後、CMakeを使って GLFWをリンクする方法について説明します。もし、あなたのアプリケーションと一緒にビルドしたいのであれば、 [CMakeとGLFWのソース](https://www.glfw.org/docs/latest/build_guide.html#build_link_cmake_source)を使ってをご覧ください。

CMakeLists.txtを少し変更するだけで、GLFWのインストール時に生成されるパッケージとターゲットファイルの場所を特定することができます。

```sh
find_package(glfw3 3.3 REQUIRED)
```

GLFWがプロジェクトに追加されたら、glfwターゲットでそれに対してリンクします。これにより、GLFWライブラリとそのリンク時の依存関係、GLFWヘッダのインクルードディレクトリ、そして、該当する場合は、[GLFW_DLL](https://www.glfw.org/docs/latest/build_guide.html#GLFW_DLL)マクロが追加されます。

```sh
target_link_libraries(myapp glfw)
```

GLFWはランタイムに必要なOpenGL、OpenGL ESまたはVulkanライブラリをロードするので、glfwターゲットはOpenGLに依存しないことに注意してください。もしあなたのアプリケーションが、最新の拡張ローダーライブラリを使う代わりに、OpenGLを直接呼び出すなら、OpenGL CMakeパッケージを使ってください。

```sh
find_package(OpenGL REQUIRED)
```

OpenGLが見つかった場合、OpenGL::GLターゲットがあなたのプロジェクトに追加され、ライブラリとインクルードディレクトリのパスが含まれます。他のライブラリと同様に、これに対してリンクしてください。

```sh
target_link_libraries(myapp OpenGL::GL)
```

## Unixでmakefileとpkg-configを使用した場合

GLFWは[pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/)をサポートしており、glfw3.pcのpkg-configファイルはGLFWライブラリのビルド時に生成され、ライブラリとともにインストールされます。pkg-configファイルにはライブラリを使用するために必要なコンパイル時およびリンク時のフラグと依存関係がすべて記述されています。それらが更新されたとき、あるいはシステム間で異なる場合、自動的に正しいものを取得することができます。

GLFWライブラリのスタティック版を使用する場合の典型的なコンパイルとリンクのコマンドラインは、次のようになります。

``sh
cc $(pkg-config --cflags glfw3) -o myprog myprog.c $(pkg-config --static --libs glfw3)
``

GLFWライブラリの共有版を使用する場合は、--staticフラグを省略します。

``sh
cc $(pkg-config --cflags glfw3) -o myprog myprog.c $(pkg-config --libs glfw3)
``

また、PKG_CONFIG_PATH環境変数を使用することで、先にglfw3.pcをインストールせずに使用することも可能です。

```sh
env PKG_CONFIG_PATH=path/to/glfw/src cc $(pkg-config --cflags glfw3) -o myprog myprog.c $(pkg-config --libs glfw3)
```

GLFWは必要なOpenGL、OpenGL ES、Vulkanライブラリをランタイムにロードするので、依存関係にOpenGLは含まれません。もしあなたのアプリケーションが、最新の[拡張ローダーライブラリ](https://www.glfw.org/docs/latest/context_guide.html#context_glext_auto)を使う代わりに、OpenGLを直接呼び出すのであれば、gl pkg-configパッケージを追加する必要があります。

```sh
cc $(pkg-config --cflags glfw3 gl) -o myprog myprog.c $(pkg-config --libs glfw3 gl)
```

## macOSのXcodeで

GLFWのダイナミックライブラリ版を使用する場合は、プロジェクトの依存関係に追加してください。

GLFWのスタティックライブラリ版を使用している場合は、それとCocoa・OpenGL・IOKitの各フレームワークを依存関係としてプロジェクトに追加してください。これらはすべて /System/Library/Frameworks で見つけることができます。

## macOSのコマンドラインで

macOSでコマンドラインからビルドする場合は、pkg-configを使用することをお勧めします。そうすることで、新しい依存関係が自動的に追加されます。それでも手動でビルドしたい場合は、-l と -framework スイッチを使って、必要なフレームワークとライブラリを自分でコマンドラインに追加する必要があります。

libglfw.3.dylibという名前のダイナミックGLFWライブラリを使用している場合、このように書きます。

```sh
cc -o myprog myprog.c -lglfw -framework Cocoa -framework OpenGL -framework IOKit
```

libglfw3.aという静的ライブラリを使用する場合は、-lglfwの代わりに-lglfw3としてください。

なお、コマンドラインからリンクする場合は、フレームワークに.frameworkという拡張子をつけないことに注意してください。

> あなたのマシンにはlibGL.*.dylibスタイルのOpenGLライブラリがあるかもしれませんが、それはX Window System用であり、macOSネイティブバージョンのGLFWでは動きません。