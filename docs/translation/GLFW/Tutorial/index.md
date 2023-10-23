# GLFWチュートリアル

このガイドではGLFW3を使った簡単なアプリケーションの書き方を説明します。 このアプリケーションはウィンドウとOpenGLコンテキストを作成し、回転する三角形を描画して、ユーザがウィンドウを閉じるかEscapeキーを押すと終了するようになっています。このガイドでは最もよく使われる関数をいくつか紹介しますが、他にもたくさんあります。

このガイドは以前のバージョンのGLFWの経験がないことを前提にしています。過去にGLFW2を使っていた人は、GLFW2から3への移行を読んでください。GLFW3ではいくつかの関数の動作が異なるからです。

[[TOC]]

## ステップ・バイ・ステップ

### GLFWヘッダーをインクルードする

GLFWを使用するアプリケーションのソースファイルで、そのヘッダファイルをインクルードする必要があります。

```c
#include <GLFW/glfw3.h>
```

このヘッダはGLFW APIのすべての定数・型・関数プロトタイプを提供します。

デフォルトではあなたの開発環境のOpenGLヘッダも含まれます。いくつかのプラットフォームでは、このヘッダーはOpenGLの古いバージョンしかサポートしていません。最も極端なケースはWindowsで、通常OpenGL1.2しかサポートしていません。

ほとんどのプログラムは代わりに拡張ローダーライブラリを使用し、そのヘッダを含めます。この例ではgladによって生成されたファイルを使用しています。GLFWヘッダはそのようなヘッダが最初にインクルードされていれば、そのほとんどを検出し、開発環境からのヘッダをインクルードしないようにすることができます。

```c
#include <glad/gl.h>
#include <GLFW/glfw3.h>
```

ヘッダーの衝突がないことを確認するために、GLFWヘッダーの前にGLFW_INCLUDE_NONEを定義して、開発環境ヘッダーを含めることを明示的に禁止することができます。これにより、2つのヘッダを任意の順番でインクルードすることもできます。

```c
#define GLFW_INCLUDE_NONE
#include <GLFW/glfw3.h>
#include <glad/gl.h>
```

### GLFWの初期化と終了

ほとんどのGLFW関数は使用する前にライブラリを初期化する必要があります。初期化に成功するとGLFW_TRUEが返されます。エラーが発生した場合はGLFW_FALSEが返されます。

```c
if (!glfwInit())
{
    // 初期化に失敗しました
}
```

GLFW_TRUEとGLFW_FALSEは常に1と0であることに注意してください。

GLFWを使い終わったら、通常はアプリケーションが終了する直前にGLFWを終了させる必要があります。

```c
glfwTerminate();
```

これは残っているウィンドウをすべて破棄し、GLFWによって割り当てられたその他のリソースを解放します。この呼び出しの後、それを必要とするGLFW関数を使う前に、再びGLFWを初期化する必要があります。

### エラーコールバックを設定する

ほとんどのイベントはキーが押された・GLFWウィンドウが移動した・エラーが発生したなどのコールバックを通じて報告されます。コールバックは、イベントを記述した引数でGLFWによって呼び出されるC関数（またはC++の静的メソッド）です。

GLFWの関数が失敗した場合、GLFWのエラーコールバックにエラーが報告されます。これらの報告はエラーコールバックで受け取ることができます。この関数は以下のシグネチャを持つ必要がありますが、他のコールバックで許可されていることは何でもできます。

```c
void error_callback(int error, const char* description)
{
    fprintf(stderr, "Error: %s\n", description);
}
```

コールバック関数はセットする必要があり、GLFWはそれらを呼び出すことができます。エラーコールバックを設定する関数は初期化前に呼び出すことができる数少ないGLFW関数のひとつで、これにより初期化中と初期化後の両方でエラーが通知されるようになります。

```c
glfwSetErrorCallback(error_callback);
```

### ウィンドウとコンテキストの作成

ウィンドウとそのOpenGLコンテキストはglfwCreateWindowを1回呼び出すだけで作成され、作成されたウィンドウとコンテキストを組み合わせたオブジェクトへのハンドルが返されます。

```c
GLFWwindow* window = glfwCreateWindow(640, 480, "My Title", NULL, NULL);
if (!window)
{
    // ウィンドウまたはOpenGLコンテキストの作成に失敗しました
}
```

この例では、640 x 480 のウィンドウモード・ウィンドウとOpenGLコンテキストを作成しています。ウィンドウやOpenGLコンテキストの作成に失敗した場合はNULLが返されます。常に戻り値をチェックする必要があります。ウィンドウの作成に失敗することはほとんどありませんが、 コンテキストの作成は適切にインストールされたドライバに依存し、 必要なハードウェアを備えたマシンであっても失敗することがあります。

デフォルトでは、GLFWが作成するOpenGLコンテキストは任意のバージョンを持つことができます。作成前にGLFW_CONTEXT_VERSION_MAJORとGLFW_CONTEXT_VERSION_MINORヒントを設定することにより、最小限のOpenGLバージョンを要求することができます。必要な最小バージョンがマシンでサポートされていない場合、コンテキスト（およびウィンドウ）の作成は失敗します。

```c
glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 2);
glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);
GLFWwindow* window = glfwCreateWindow(640, 480, "My Title", NULL, NULL);
if (!window)
{
    // ウィンドウまたはコンテキストの作成に失敗しました
}
```

ウィンドウハンドルはウィンドウに関連するすべての関数に渡され、ウィンドウに関連するすべてのコールバックに提供されるため、どのウィンドウがイベントを受け取ったかを知ることができます。

ウィンドウとコンテキストが不要になったら、それを破棄します。

```c
glfwDestroyWindow(window);
```

この関数が呼ばれるとウィンドウのイベントは配信されなくなり、ハンドルは無効になります。

### OpenGLコンテキストのカレント化

OpenGL APIを使用する前に現在のOpenGLコンテキストを持つ必要があります。

```c
glfwMakeContextCurrent(window);
```

このコンテキストは他のコンテキストをカレントにするか、現在のコンテキストを所有するウィンドウが破壊されるまでカレントのままです。

OpenGLにアクセスするために拡張ローダーライブラリを使用している場合、ローダーはロードするために現在のコンテキストを必要とします。この例ではgladを使用していますが、このようなライブラリにはすべて同じルールが適用されます。

```c
gladLoadGL(glfwGetProcAddress);
```

### ウィンドウクローズ・フラグの確認

各ウィンドウにはそのウィンドウを閉じるかどうかを示すフラグがあります。

ユーザーがタイトルバーのクローズボタンを押すか、 Alt+F4などのキーコンビネーションでウィンドウを閉じようとすると、このフラグが1にセットされます。ウィンドウは実際には閉じないので、このフラグを監視してウィンドウを破棄するか、ユーザーに何らかのフィードバックを与えることが期待されていることに注意してください。

```c
while (!glfwWindowShouldClose(window))
{
    // 実行し続ける
}
```

glfwSetWindowCloseCallbackでクローズコールバックを設定することにより、ユーザがウィンドウを閉じようとするときに通知を受けることができます。コールバックはクローズフラグが設定された直後に呼び出されます。

またglfwSetWindowShouldCloseを使って自分で設定することもできます。これは、例えばEscapeキーを押すような、他の種類の入力をウィンドウを閉じるものとして解釈したい場合に便利です。

### 入力イベントの受信

各ウィンドウには多数のコールバック関数があり、様々な種類のイベントをすべて受信できるように設定することができます。キーを押したり離したりするイベントを受信するには、キーコールバック関数を作成します。

```c
static void key_callback(GLFWwindow* window, int key, int scancode, int action, int mods)
{
    if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS)
        glfwSetWindowShouldClose(window, GLFW_TRUE);
}
```

キーコールバックは他のウィンドウ関連のコールバックと同様にウィンドウごとに設定されます。

```c
glfwSetKeyCallback(window, key_callback);
```

イベント発生時にイベントコールバックを呼び出すためにはイベントを設定する必要があります。

### OpenGLによるレンダリング

現在のOpenGLのコンテキストがあれば問題なくOpenGLを使うことができます。このチュートリアルでは多色の回転する三角形がレンダリングされます。glViewportのためにフレームバッファサイズを取得する必要があります。

```c
int width, height;
glfwGetFramebufferSize(window, &width, &height);
glViewport(0, 0, width, height);
```

またglfwSetFramebufferSizeCallbackを使用してフレームバッファサイズコールバックを設定し、サイズが変更されたときに通知されるようにすることができます。

OpenGLでレンダリングする方法の詳細はこのチュートリアルの範囲外ですが、最新のOpenGLを学ぶための優れたリソースはたくさんあります。ここではそのうちのいくつかを紹介します。

- [AntonのOpenGL 4チュートリアル](https://antongerdelan.net/opengl/)
- [OpenGLを学ぶ](https://learnopengl.com/)
- [Open.GL](https://open.gl/)

これらはすべてたまたまGLFWを使用していますが、OpenGL自体はあなたがウィンドウとコンテキストを作成するために使用するどのようなAPIでも同じように動作します。

### タイマーの読み取り

滑らかなアニメーションを作るには時間のソースが必要です。GLFWは初期化からの秒数を返すタイマーを提供しています。使用する時間ソースは各プラットフォームで最も正確なもので、一般にマイクロ秒またはナノ秒の分解能を持っています。

```c
double time = glfwGetTime();
```

### バッファの入れ替え

GLFWウィンドウはデフォルトでダブルバッファリングを使用します。つまり、各ウィンドウはフロントバッファとバックバッファの2つのレンダリングバッファを持っています。フロントバッファは表示されるもので、バックバッファはレンダリングされるものです。

フレーム全体のレンダリングが完了したら、バッファを入れ替える必要があります。バックバッファがフロントバッファになり、その逆もまた然りです。

```c
glfwSwapBuffers(window);
```

swap intervalはバッファのスワップ（一般にvsyncとして知られている）まで何フレーム待つかを示します。デフォルトではswap intervalは0であり、バッファのスワップが即座に行われることを意味します。高速なマシンではこれらのフレームの多くは決して表示されません。なぜなら画面は通常1秒間に60～75回しか更新されないので、多くのCPUとGPUサイクルを浪費するからです。

また画面更新の途中でバッファが入れ替わるため、画面のテアリングが発生します。

これらの理由からアプリケーションは通常、スワップ間隔を1に設定することを望むでしょう。それ以上の値に設定することも可能ですが、入力遅延が発生するため、通常は推奨されません。

```c
glfwSwapInterval(1);
```

この関数は現在のコンテキストに対して動作し、コンテキストが存在しない場合は失敗します。

### イベントの処理

GLFWはイベントを受け取るためと、アプリケーションがロックアップしていないことを示すために、ウィンドウシステムと定期的に通信する必要があります。イベント処理は表示可能なウィンドウがある間は定期的に行われなければならず、通常はバッファスワップの後に各フレームで行われます。

保留中のイベントを処理する方法には、ポーリングとウェイトの2つがあります。この例ではイベントポーリングを使用します。これは、すでに受信したイベントのみを処理し、すぐにリターンします。

```c
glfwPollEvents();
```

ほとんどのゲームのように継続的にレンダリングする場合はこれが最適な選択です。その代わりに、新しい入力を受け取ったときだけレンダリングを更新する必要がある場合は、glfwWaitEventsがより良い選択となります。これは、少なくとも1つのイベントが受信されるまで待機し、その間スレッドをスリープさせ、受信したすべてのイベントを処理します。これは非常に多くのCPUサイクルを節約し、例えば多くの種類の編集ツールに有用です。

### 組み立てる

GLFWの初期化・ウィンドウの作成・キーボード入力のポーリングの方法がわかったので簡単なプログラムを作成することができます。

このプログラムは、640×480のウィンドウモードのウィンドウを作成し、画面をクリアして三角形を描画し、ユーザーがEscapeを押すかウィンドウを閉じるまでイベントを処理するループを開始します。

```c
#include <glad/gl.h>
#define GLFW_INCLUDE_NONE
#include <GLFW/glfw3.h>
 
#include "linmath.h"
 
#include <stdlib.h>
#include <stdio.h>
 
static const struct
{
    float x, y;
    float r, g, b;
} vertices[3] =
{
    { -0.6f, -0.4f, 1.f, 0.f, 0.f },
    {  0.6f, -0.4f, 0.f, 1.f, 0.f },
    {   0.f,  0.6f, 0.f, 0.f, 1.f }
};
 
static const char* vertex_shader_text =
"#version 110\n"
"uniform mat4 MVP;\n"
"attribute vec3 vCol;\n"
"attribute vec2 vPos;\n"
"varying vec3 color;\n"
"void main()\n"
"{\n"
"    gl_Position = MVP * vec4(vPos, 0.0, 1.0);\n"
"    color = vCol;\n"
"}\n";
 
static const char* fragment_shader_text =
"#version 110\n"
"varying vec3 color;\n"
"void main()\n"
"{\n"
"    gl_FragColor = vec4(color, 1.0);\n"
"}\n";
 
static void error_callback(int error, const char* description)
{
    fprintf(stderr, "Error: %s\n", description);
}
 
static void key_callback(GLFWwindow* window, int key, int scancode, int action, int mods)
{
    if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS)
        glfwSetWindowShouldClose(window, GLFW_TRUE);
}
 
int main(void)
{
    GLFWwindow* window;
    GLuint vertex_buffer, vertex_shader, fragment_shader, program;
    GLint mvp_location, vpos_location, vcol_location;
 
    glfwSetErrorCallback(error_callback);
 
    if (!glfwInit())
        exit(EXIT_FAILURE);
 
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 2);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);
 
    window = glfwCreateWindow(640, 480, "Simple example", NULL, NULL);
    if (!window)
    {
        glfwTerminate();
        exit(EXIT_FAILURE);
    }
 
    glfwSetKeyCallback(window, key_callback);
 
    glfwMakeContextCurrent(window);
    gladLoadGL(glfwGetProcAddress);
    glfwSwapInterval(1);
 
    // NOTE: OpenGL error checks have been omitted for brevity
 
    glGenBuffers(1, &vertex_buffer);
    glBindBuffer(GL_ARRAY_BUFFER, vertex_buffer);
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);
 
    vertex_shader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertex_shader, 1, &vertex_shader_text, NULL);
    glCompileShader(vertex_shader);
 
    fragment_shader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragment_shader, 1, &fragment_shader_text, NULL);
    glCompileShader(fragment_shader);
 
    program = glCreateProgram();
    glAttachShader(program, vertex_shader);
    glAttachShader(program, fragment_shader);
    glLinkProgram(program);
 
    mvp_location = glGetUniformLocation(program, "MVP");
    vpos_location = glGetAttribLocation(program, "vPos");
    vcol_location = glGetAttribLocation(program, "vCol");
 
    glEnableVertexAttribArray(vpos_location);
    glVertexAttribPointer(vpos_location, 2, GL_FLOAT, GL_FALSE,
                          sizeof(vertices[0]), (void*) 0);
    glEnableVertexAttribArray(vcol_location);
    glVertexAttribPointer(vcol_location, 3, GL_FLOAT, GL_FALSE,
                          sizeof(vertices[0]), (void*) (sizeof(float) * 2));
 
    while (!glfwWindowShouldClose(window))
    {
        float ratio;
        int width, height;
        mat4x4 m, p, mvp;
 
        glfwGetFramebufferSize(window, &width, &height);
        ratio = width / (float) height;
 
        glViewport(0, 0, width, height);
        glClear(GL_COLOR_BUFFER_BIT);
 
        mat4x4_identity(m);
        mat4x4_rotate_Z(m, m, (float) glfwGetTime());
        mat4x4_ortho(p, -ratio, ratio, -1.f, 1.f, 1.f, -1.f);
        mat4x4_mul(mvp, p, m);
 
        glUseProgram(program);
        glUniformMatrix4fv(mvp_location, 1, GL_FALSE, (const GLfloat*) mvp);
        glDrawArrays(GL_TRIANGLES, 0, 3);
 
        glfwSwapBuffers(window);
        glfwPollEvents();
    }
 
    glfwDestroyWindow(window);
 
    glfwTerminate();
    exit(EXIT_SUCCESS);
}
```

上のプログラムは[ソースパッケージ](https://www.glfw.org/download.html)のexamples/simple.cにあり、GLFWをビルドするときに他のすべてのサンプルと一緒にコンパイルされます。GLFWをソースパッケージからビルドした場合、Windowsではsimple.exe、Linuxではsimple、macOSではsimple.appとして、すでにこのプログラムが存在しています。

このチュートリアルでは、GLFWが提供する多くの機能のうち、ほんの一部だけを使いました。GLFWがカバーする各分野のガイドがあります。それぞれのガイドでは、そのカテゴリの全機能を紹介しています。

- API紹介
- ウィンドウガイド
- コンテキストガイド
- モニターガイド
- 入力ガイド

GLFWの関数をクリックすると、その機能のリファレンスドキュメントにアクセスでき、各関数のリファレンスは、関連する関数やガイドのセクションにリンクしています。

チュートリアルはここで終了です。GLFWを使うプログラムを書いたら、それをコンパイルしリンクする必要があります。その方法は、あなたが使っている開発環境に依存し、その環境のドキュメントで最もよく説明されています。GLFWに特有の詳細については、アプリケーションのビルドを参照してください。