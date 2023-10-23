# GLFWコンテキストガイド

このガイドでは，GLFWのOpenGLおよびOpenGL ESのコンテキスト関連機能を紹介する．このカテゴリの特定の関数の詳細については、コンテキストのリファレンスを参照してください。また、GLFW API の他の領域のガイドもあります。

- API紹介
- ウィンドウズガイド
- Vulkanガイド
- モニターガイド
- 入力ガイド

[[TOC]]

## コンテキストオブジェクト

ウィンドウオブジェクトはトップレベルのウィンドウとOpenGLまたはOpenGL ESのコンテキストをカプセル化します。作成はglfwCreateWindowで、破棄はglfwDestroyWindowまたはglfwTerminateで行います。より詳細な情報はウィンドウの作成を参照してください．

ウィンドウとコンテキストは不可分にリンクされているので、ウィンドウオブジェクトはコンテキストハンドルとßしても機能します。

さまざまな種類のコンテキストの作成をテストし、そのプロパティを見るには、glfwinfo テストプログラムを実行してください。

::: info
Vulkan はコンテキストを持たず、Vulkan インスタンスは Vulkan API 自体を経由して作成されます。Vulkan を使用してウィンドウにレンダリングする場合は、GLFW_CLIENT_API ヒントを GLFW_NO_API に設定することで、コンテキストの生成を無効にしてください。詳細については、Vulkan ガイドを参照してください。
:::

### コンテキスト作成のヒント

どのようなコンテキストが作成されるかに関連する、glfwWindowHintを使用して指定されるいくつかのヒントがあります。ウィンドウガイドのコンテキスト関連のヒントを参照してください。

## コンテキストオブジェクトの共有

glfwCreateWindowでウィンドウとそのOpenGLまたはOpenGL ESコンテキストを作成するとき、新しいウィンドウがそのオブジェクト（テクスチャ、頂点と要素バッファなど）を共有する必要がある別のウィンドウのコンテキストを指定することができます。

```c
GLFWwindow* second_window = glfwCreateWindow(640, 480, "Second Window", NULL, first_window);
```

オブジェクトの共有は、オペレーティングシステムとグラフィックスドライバによって実装されます。どのタイプのオブジェクトを共有するかを選択できるプラットフォームでは、GLFWはすべてのタイプのオブジェクトを共有するよう要求する。

詳しくは[OpenGL](https://www.opengl.org/registry/)または[OpenGL ES](https://www.khronos.org/opengles/)のリファレンスドキュメントの関連する章を参照してください。この章の名前と番号は、残念ながらバージョンとAPIによって異なりますが、共有オブジェクトとマルチコンテキストという名前だったこともあります。

GLFWには、sharingと呼ばれる素のオブジェクト共有のサンプルプログラムが付属しています。

### オフスクリーンコンテキスト

GLFW は、関連するウィンドウのないコンテキストの作成をサポートしていない。しかし、隠されたウィンドウを持つコンテキストは、GLFW_VISIBLEウィンドウヒントを用いて作成することができる。

```c
glfwWindowHint(GLFW_VISIBLE, GLFW_FALSE);
 
GLFWwindow* offscreen_context = glfwCreateWindow(640, 480, "", NULL, NULL);
```

ウィンドウは決して表示する必要がなく、そのコンテキストはプレーンなオフスクリーンコンテキストとして使用することができます。ウィンドウマネージャによっては、隠されたウィンドウのフレームバッファのサイズを使用または変更できないことがあるので、そのようなコンテキストでレンダリングする場合はフレームバッファオブジェクトを使用することをお勧めします。

少なくとも1つのウィンドウがある限り、たとえどのウィンドウも表示されていなくても、イベントを処理する必要があります。

macOS: 最初にウィンドウを作成するときに、メニューバーが作成されます。これは、例えば、コマンドラインのみのアプリケーションを書くときには望ましくありません。メニューバーの作成は、GLFW_COCOA_MENUBAR initヒントで無効にすることができます。

### コンテキストのないウィンドウ

GLFW_CLIENT_APIヒントを GLFW_NO_API に設定することにより、 コンテキストの生成を無効にすることができる。コンテキストのない Windows は glfwMakeContextCurrent や glfwSwapBuffers に渡してはならない．

## 現在の状況

OpenGLやOpenGL ESの呼び出しを行う前に、正しいタイプの現在のコンテキストを持つ必要があります。コンテキストは一度に1つのスレッドに対してのみカレントとなり、スレッドは一度に1つのコンテキストしかカレントとすることができません。

スレッド間でコンテキストを移動する場合、古いスレッドで非カレントにしてから新しいスレッドでカレントにする必要があります。

ウィンドウのコンテキストは glfwMakeContextCurrent でカレントにされる。

```c
glfwMakeContextCurrent(window);
```

現在のコンテキストのウィンドウは glfwGetCurrentContext で返されます。

```c
GLFWwindow* window = glfwGetCurrentContext();
```

以下の GLFW 関数は、現在のコンテキストを必要とします。現在のコンテキストを持たずにこれらの関数を呼び出すと、 GLFW_NO_CURRENT_CONTEXT エラーが発生する。

- glfwSwapInterval
- glfwExtensionSupported
- glfwGetProcAddress

## バッファスワッピング

ウィンドウガイドのバッファスワッピングを参照してください。

## OpenGLおよびOpenGL ESの拡張機能

OpenGLとOpenGL ESの利点の1つは、その拡張性です。ハードウェアベンダは、その機能がOpenGLまたはOpenGL ES仕様の新バージョンに含まれる前に、APIを拡張する拡張機能をその実装に含めることができます。また、拡張機能の中には、決して含まれず、陳腐化するまで拡張機能のままであるものもあります。

拡張機能は次のように定義されます。

- An extension name (e.g. GL_ARB_gl_spirv)
- New OpenGL tokens (e.g. GL_SPIR_V_BINARY_ARB)
- New OpenGL functions (e.g. glSpecializeShaderARB)

ARBのアフィックスは、Architecture Review Boardの略で、公式の拡張子に使用されることに注意してください。上の拡張子はARBによって作成されたものですが、NvidiaにはNV、AMDにはAMDというように、さまざまな接頭辞が存在します。また、どのグループも一般的なEXT接頭辞を使用することができます。拡張機能の一覧とその仕様は、[OpenGL Registry](https://www.opengl.org/registry/)と[OpenGL ES Registry](https://www.khronos.org/registry/gles/)に掲載されています。

### ローダーライブラリで拡張機能をロードする

拡張ローダーライブラリは、OpenGLとOpenGL ESの拡張と、コアOpenGLまたはOpenGL ES APIの現代版の両方にアクセスする最も簡単で最良の方法です。彼らは、あなたが必要とするすべてのものを宣言し、ロードするためのすべての詳細を引き受けます。そのようなライブラリの1つがgladで、他にもいくつかあります。

以下の例では、gladを使用しますが、すべての拡張ローダーライブラリは同様に動作します。

まず、glad Pythonスクリプトを使用してソースファイルを生成する必要があります。この例では、任意のバージョンのOpenGL用のローダーを生成しています。これはGLFWとgladの両方のデフォルトですが、OpenGL ES用のローダーや、特定のAPIバージョンと拡張セット用のローダーも生成可能です。生成されたファイルは出力ディレクトリに書き込まれます。

```sh
python main.py --generator c --no-loader --out-path output
```

--no-loader オプションが追加されたのは、GLFWがすでにOpenGLとOpenGL ESの関数ポインタを読み込むための関数を提供しており、選択したコンテキスト作成APIを自動的に使用するもので、gladは独自に実装する代わりにこれを呼び出すことができるからです。他にもいくつかのコマンドラインオプションがあります。詳しくはgladのドキュメントを参照してください。

生成された output/src/glad.c, output/include/glad/glad.h, output/include/KHR/khrplatform.h ファイルをビルドに追加してください。次に、開発環境のOpenGLヘッダを置き換えるgladヘッダファイルをインクルードする必要があります。gladヘッダをGLFWヘッダの前にインクルードすることで、開発環境のOpenGLまたはOpenGL ESヘッダを抑制することができます。

```c
#include <glad/glad.h>
#include <GLFW/glfw3.h>
```

最後に、適切な現在のコンテキストが得られたら、gladを初期化する必要があります。

```c
window = glfwCreateWindow(640, 480, "My Window", NULL, NULL);
if (!window)
{
    ...
}
 
glfwMakeContextCurrent(window);
 
gladLoadGLLoader((GLADloadproc) glfwGetProcAddress);
```

gladがロードされると、作成したコンテキストと生成したgladローダーの両方がサポートするすべてのOpenGLコアおよび拡張関数にアクセスできるようになり、レンダリングを開始する準備ができます。

コンテキストヒントで、最低限必要なOpenGLまたはOpenGL ESバージョンを指定することができます。より複雑なニーズがある場合は、コンテキスト属性で実際のOpenGLまたはOpenGL ESのバージョンを確認するか、またはGLAD_GL_VERSION_x_xブール値を使用して特定のバージョンが現在のコンテキストでサポートされているかどうかを確認することができます。

```c
if (GLAD_GL_VERSION_3_2)
{
    // Call OpenGL 3.2+ specific code
}
```

特定の拡張機能がサポートされているかどうかを確認するには、GLAD_GL_xxxブール値を使用します。

```c
if (GLAD_GL_ARB_gl_spirv)
{
    // Use GL_ARB_gl_spirv
}
```

### 拡張機能を手動で読み込む

絶対に必要な場合以外は、このテクニックを使わないでください。拡張ローダーライブラリ]を使えば、面倒で繰り返しの多い、エラーを起こしやすい作業を大幅に減らすことができます。

ある拡張機能を使うには、まずコンテキストがその拡張機能をサポートしているか どうか確認し、新しい関数が導入されていれば、その関数へのポインタを取得する必要があ ります。GLFW は，拡張や新しい API 関数を手動で読み込むために，glfwExtensionSupported と glfwGetProcAddress を提供しています．

このセクションでは、OpenGL拡張の手動ロードを実演します。OpenGL ES拡張のロードは、拡張ヘッダーの名前以外は同じです。

#### glext.h ヘッダー

glext.h拡張ヘッダーは、すべてのOpenGL拡張のためのインターフェイスを定義する継続的に更新されるファイルです。これの最新版は、常に[OpenGLレジストリ](https://www.opengl.org/registry/)で見つけることができます。また、OpenGL ESのさまざまなバージョンのための拡張ヘッダが[OpenGL ES Registry](https://www.khronos.org/registry/gles/)にあります。開発環境に含まれているものは数年前のものであったり、使いたい拡張機能が含まれていない可能性があるので、拡張ヘッダーのコピーを自分で使うことを強くお勧めします。

ヘッダーは、サポートするすべての拡張機能のすべての関数に対する関数ポインタの型を定義しています。これらはPFNGLSPECIALIZESHADERARBPROC（glSpecializeShaderARB用）のような名前で、つまり名前を大文字にしてPFN（関数へのポインタ）とPROC（手続き）を末尾に追加しています。

拡張ヘッダをインクルードするには、GLFWヘッダをインクルードする前に、GLFW_INCLUDE_GLEXTを定義してください。

```c
#define GLFW_INCLUDE_GLEXT
#include <GLFW/glfw3.h>
```

#### 拡張子のチェック

与えられたマシンは、実際には拡張機能をサポートしていないかもしれません (古いドライバや必要なハードウェア機能が不足しているグラフィックカードを使っているかもしれません) 。これは glfwExtensionSupported で行われます。

```c
if (glfwExtensionSupported("GL_ARB_gl_spirv"))
{
    // The extension is supported by the current context
}
```

引数はヌル文字で終端する ASCII 文字列で、拡張機能名を指定する。拡張機能がサポートされている場合、glfwExtensionSupported は GLFW_TRUE を返し、そうでない場合は GLFW_FALSE を返します。

#### 関数ポインタの取得

すべてではありませんが、多くの拡張機能では、新しい OpenGL 関数を使用する必要があります。これらの関数は、オペレーティングシステムのクライアントAPIライブラリにエントリポイントを持たないことが多く、実行時にそれらを取得する必要があります。これらの関数へのポインタは、glfwGetProcAddressで取得することができます。

```c
PFNGLSPECIALIZESHADERARBPROC pfnSpecializeShaderARB = glfwGetProcAddress("glSpecializeShaderARB");
```

一般に、関数ポインタ変数に関数と（全く）同じ名前をつけるのは避けるべきです。その代わり、上記のような別の接頭辞をつけるか、他の命名法を用いることができます。

さて、すべてのパーツが紹介されましたが、これらを一緒に使用するとどのようになるでしょうか。

```c
#define GLFW_INCLUDE_GLEXT
#include <GLFW/glfw3.h>
 
#define glSpecializeShaderARB pfnSpecializeShaderARB
PFNGLSPECIALIZESHADERARBPROC pfnSpecializeShaderARB;
 
// Flag indicating whether the extension is supported
int has_ARB_gl_spirv = 0;
 
void load_extensions(void)
{
    if (glfwExtensionSupported("GL_ARB_gl_spirv"))
    {
        pfnSpecializeShaderARB = (PFNGLSPECIALIZESHADERARBPROC)
            glfwGetProcAddress("glSpecializeShaderARB");
        has_ARB_gl_spirv = 1;
    }
}
 
void some_function(void)
{
    if (has_ARB_gl_spirv)
    {
        // Now the extension function can be called as usual
        glSpecializeShaderARB(...);
    }
}
```