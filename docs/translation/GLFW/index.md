# GLFWドキュメンテーション（日本語訳）

[原文](https://www.glfw.org)

[HTMLドキュメント](https://www.glfw.org/docs/latest/)にはチュートリアル・トピック別のガイド・APIリファレンスが含まれています。

[FAQ](https://www.glfw.org/faq.html)はGLFWの設計・実装・使用に関する多くの一般的な質問に答えています。

## ライセンス

GLFWは[zlib/libpng](https://www.glfw.org/license.html)ライセンスに基づき改変・配布・クローズドソースソフトウェアでの利用を許可しています。

## コード例

以下は、GLFWでウィンドウとOpenGLコンテキストをセットアップする短い例です。ここで使われている以外にも多くの関数があります。GLFWの簡単な紹介はHTMLドキュメントの[Getting started](https://www.glfw.org/docs/latest/quick.html)を参照してください。

```c
#include <GLFW/glfw3.h>

int main(void)
{
    GLFWwindow* window;

    /* ライブラリの初期化 */
    if (!glfwInit())
        return -1;

    /* ウィンドウモードのウィンドウとそのOpenGLコンテキストの作成 */
    window = glfwCreateWindow(640, 480, "Hello World", NULL, NULL);
    if (!window)
    {
        glfwTerminate();
        return -1;
    }

    /* ウィンドウのコンテキストをカレントにする */
    glfwMakeContextCurrent(window);

    /* ユーザーがウィンドウを閉じるまでループする */
    while (!glfwWindowShouldClose(window))
    {
        /* レンダリングはこちら */
        glClear(GL_COLOR_BUFFER_BIT);

        /* フロントバッファとバックバッファの入れ替え */
        glfwSwapBuffers(window);

        /* イベントのポーリングと処理 */
        glfwPollEvents();
    }

    glfwTerminate();
    return 0;
}
```