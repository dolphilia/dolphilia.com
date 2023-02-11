# Sokol

C で書かれたシンプルな [STB スタイル](https://github.com/nothings/stb/blob/master/docs/stb_howto.txt) の C および C++ 用のクロスプラットフォームライブラリです。

## 事例と関連プロジェクト

- [ライブサンプル](https://floooh.github.io/sokol-html5/index.html) WASM経由 ([source](https://github.com/floooh/sokol-samples))

- [Doom Shareware](https://floooh.github.io/doom-sokol/) sokolのヘッダーに移植された ([source](https://github.com/floooh/doom-sokol))

- [sokol_gp.h](https://github.com/edubart/sokol_gp) sokol_gfx.h の上にある 2 次元図形描画ライブラリ。

- [LearnOpenGLのサンプルはsokol-gfxに移植されました](https://www.geertarien.com/learnopengl-examples-html5/) by @geertarien (cool stuff!)

- [Dear ImGui starterkit](https://github.com/floooh/cimgui-sokol-starterkit) Dear ImGuiのアプリケーションをCで書くための自己完結型のスターターキットです。

- [qoiview](https://github.com/floooh/qoiview) 新しい画像ファイルフォーマットQOIの基本ビューア

- [Tiny 8-bit emulators](https://floooh.github.io/tiny8bit/)

- A 'single-file' [Pacman clone in C99](https://github.com/floooh/pacman.c/), [ジーグ](https://github.com/floooh/pacman.zig/)もあります。

- A [Minigolf game](https://mgerdes.github.io/minigolf.html) ([source](https://github.com/mgerdes/minigolf)).

- ['Dealer's Dungeon'](https://dealers-dungeon.com/demo/) ([lower graphics quality](https://dealers-dungeon.com/demo/?q=3),
[source](https://github.com/bqqbarbhg/spear))

- [コマンドラインツール](https://github.com/floooh/sokol-tools) (シェーダコンパイラ)

- [ビルドシステムを使わずにビルドする方法](https://github.com/floooh/sokol-samples#how-to-build-without-a-build-system):
Sokolヘッダをあなたのプロジェクトに統合し、お気に入りのC/C++ビルドシステムを使用するための有用な詳細情報を提供します。

## コアライブラリー

- [**sokol\_gfx.h**](https://github.com/floooh/sokol/blob/master/sokol_gfx.h): 3D-API wrapper (GL + Metal + D3D11)
- [**sokol\_app.h**](https://github.com/floooh/sokol/blob/master/sokol_app.h): app framework wrapper (エントリー＋ウィンドウ＋3Dコンテキスト＋入力)
- [**sokol\_time.h**](https://github.com/floooh/sokol/blob/master/sokol_time.h): 時間計測
- [**sokol\_audio.h**](https://github.com/floooh/sokol/blob/master/sokol_audio.h): minimal buffer-streaming audio playback
- [**sokol\_fetch.h**](https://github.com/floooh/sokol/blob/master/sokol_fetch.h): HTTPとローカルファイルシステムからの非同期データストリーミング
- [**sokol\_args.h**](https://github.com/floooh/sokol/blob/master/sokol_args.h): ウェブとネイティブアプリのための統一されたcmdline/URL argパーサー

## Utility libraries

- [**sokol\_imgui.h**](https://github.com/floooh/sokol/blob/master/util/sokol_imgui.h): sokol_gfx.h [Dear ImGui](https://github.com/ocornut/imgui) 用レンダリングバックエンド
- [**sokol\_nuklear.h**](https://github.com/floooh/sokol/blob/master/util/sokol_nuklear.h): sokol_gfx.h [Nuklear](https://github.com/Immediate-Mode-UI/Nuklear)用レンダリングバックエンド。
- [**sokol\_gl.h**](https://github.com/floooh/sokol/blob/master/util/sokol_gl.h): OpenGL 1.x style immediate-mode rendering API on top of sokol_gfx.h
- [**sokol\_fontstash.h**](https://github.com/floooh/sokol/blob/master/util/sokol_fontstash.h): sokol_gl.h [fontstash](https://github.com/memononen/fontstash) 用レンダリングバックエンド
- [**sokol\_gfx\_imgui.h**](https://github.com/floooh/sokol/blob/master/util/sokol_gfx_imgui.h): debug-inspection UI for sokol_gfx.h (implemented with Dear ImGui)
- [**sokol\_debugtext.h**](https://github.com/floooh/sokol/blob/master/util/sokol_debugtext.h): a simple text renderer using vintage home computer fonts
- [**sokol\_memtrack.h**](https://github.com/floooh/sokol/blob/master/util/sokol_memtrack.h): sokolヘッダでのメモリ割り当てを簡単に追跡することができます。
- [**sokol\_shape.h**](https://github.com/floooh/sokol/blob/master/util/sokol_shape.h): 簡単な図形を生成し、sokol-gfx のリソース作成用構造体にプラグインする。
- [**sokol\_color.h**](https://github.com/floooh/sokol/blob/master/util/sokol_color.h): X11 スタイルの色定数および sg_color オブジェクトの作成用関数

## 「公式」言語バインディング

これらは、Cヘッダーの変更に伴い自動的に更新される:

- [sokol-zig](https://github.com/floooh/sokol-zig)
- [sokol-odin](https://github.com/floooh/sokol-odin)
- [sokol-nim](https://github.com/floooh/sokol-nim)

## Notes

WebAssemblyは「一級市民」です。Sokolヘッダーの重要な動機の一つは、ウェブプラットフォームに最小限のフットプリントで、なおかつ有用なクロスプラットフォームAPIのコレクションを提供することです。

コアヘッダはスタンドアロンで、互いに独立して使用することができます。

### なぜCなのか:

- 他の言語との統合を容易にする
- 他のプロジェクトとの統合が容易
- 実行ファイルに最小限のサイズのオーバーヘッドを加えるだけ

より詳しい背景を説明したブログ記事[sokol_gfx.hのツアー](http://floooh.github.io/2017/07/29/sokol-gfx-tour.html)

# sokol_gfx.h:

- GLES2/WebGL、GLES3/WebGL2、GL3.3、D3D11、Metalのシンプルでモダンなラッパーです。
- バッファ、イメージ、シェーダー、パイプラインステートオブジェクト、レンダーパス
- ウィンドウの作成や3D APIコンテキストの初期化は行わない。
- シェーダーダイアレクトの相互変換を提供しない (**BUT** 現在、公式のシェーダー相互変換ソリューションがあります)
sokol_gfx.hとIDEをシームレスに統合する公式のシェーダクロスコンパイラソリューションがあります。[詳しくはこちらをご覧ください](https://github.com/floooh/sokol-tools/blob/master/docs/sokol-shdc.md)

C99でGLFWを使った三角形。

```c
#define SOKOL_IMPL
#define SOKOL_GLCORE33
#include "sokol_gfx.h"
#define GLFW_INCLUDE_NONE
#include "GLFW/glfw3.h"

int main() {

    /* GLFWによるウィンドウとGLコンテキストの作成 */
    glfwInit();
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GLFW_TRUE);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    GLFWwindow* w = glfwCreateWindow(640, 480, "Sokol Triangle GLFW", 0, 0);
    glfwMakeContextCurrent(w);
    glfwSwapInterval(1);

    /* セットアップ sokol_gfx */
    sg_setup(&(sg_desc){0});

    /* 頂点バッファ */
    const float vertices[] = {
        // positions            // colors
         0.0f,  0.5f, 0.5f,     1.0f, 0.0f, 0.0f, 1.0f,
         0.5f, -0.5f, 0.5f,     0.0f, 1.0f, 0.0f, 1.0f,
        -0.5f, -0.5f, 0.5f,     0.0f, 0.0f, 1.0f, 1.0f
    };
    sg_buffer vbuf = sg_make_buffer(&(sg_buffer_desc){
        .data = SG_RANGE(vertices)
    });

    /* シェーダ */
    sg_shader shd = sg_make_shader(&(sg_shader_desc){
        .vs.source =
            "#version 330\n"
            "layout(location=0) in vec4 position;\n"
            "layout(location=1) in vec4 color0;\n"
            "out vec4 color;\n"
            "void main() {\n"
            "  gl_Position = position;\n"
            "  color = color0;\n"
            "}\n",
        .fs.source =
            "#version 330\n"
            "in vec4 color;\n"
            "out vec4 frag_color;\n"
            "void main() {\n"
            "  frag_color = color;\n"
            "}\n"
    });

    /* パイプライン状態オブジェクト（三角形の場合はデフォルトのレンダリング状態でよい）。 */
    sg_pipeline pip = sg_make_pipeline(&(sg_pipeline_desc){
        .shader = shd,
        .layout = {
            .attrs = {
                [0].format=SG_VERTEXFORMAT_FLOAT3,
                [1].format=SG_VERTEXFORMAT_FLOAT4
            }
        }
    });

    /* リソースバインディング */
    sg_bindings bind = {
        .vertex_buffers[0] = vbuf
    };

    /* デフォルトパスアクション (clear to grey) */
    sg_pass_action pass_action = {0};

    /* 描画ループ */
    while (!glfwWindowShouldClose(w)) {
        int cur_width, cur_height;
        glfwGetFramebufferSize(w, &cur_width, &cur_height);
        sg_begin_default_pass(&pass_action, cur_width, cur_height);
        sg_apply_pipeline(pip);
        sg_apply_bindings(&bind);
        sg_draw(0, 3, 1);
        sg_end_pass();
        sg_commit();
        glfwSwapBuffers(w);
        glfwPollEvents();
    }

    /* 後片付け */
    sg_shutdown();
    glfwTerminate();
    return 0;
}
```

# sokol_app.h

クロスプラットフォーム対応の最小限のアプリケーション・ラッパー・ライブラリです。

- 統一されたアプリケーションエントリ
- 3Dレンダリング用のシングルウィンドウまたはキャンバス
- 3Dコンテキストの初期化
- イベントベースのキーボード、マウス、タッチ入力
- 対応プラットフォームWin32、MacOS、Linux (X11)、iOS、WASM、Android、UWP
- 対応する3D-APIGL3.3 (GLX/WGL)、Metal、D3D11、GLES2/WebGL、GLES3/WebGL2

sokol_app.hとsokol_gfx.hを用いたシンプルなクリアループのサンプルです（サンプルのCコードからObjective-Cコードを分離するために必要なsokol.c/.m実装ファイルは含まれません）。

```c
#include "sokol_gfx.h"
#include "sokol_app.h"
#include "sokol_glue.h"

sg_pass_action pass_action;

void init(void) {
    sg_setup(&(sg_desc){
        .context = sapp_sgcontext()
    });
    pass_action = (sg_pass_action) {
        .colors[0] = { .action=SG_ACTION_CLEAR, .value={1.0f, 0.0f, 0.0f, 1.0f} }
    };
}

void frame(void) {
    float g = pass_action.colors[0].value.g + 0.01f;
    pass_action.colors[0].value.g = (g > 1.0f) ? 0.0f : g;
    sg_begin_default_pass(&pass_action, sapp_width(), sapp_height());
    sg_end_pass();
    sg_commit();
}

void cleanup(void) {
    sg_shutdown();
}

sapp_desc sokol_main(int argc, char* argv[]) {
    return (sapp_desc){
        .init_cb = init,
        .frame_cb = frame,
        .cleanup_cb = cleanup,
        .width = 400,
        .height = 300,
        .window_title = "Clear Sample",
    };
}
```

# sokol_audio.h

最小限のオーディオストリーミングAPIです。

- 32-bit float サンプルのモノラルまたはステレオストリームを提供し、 sokol_audio.h がプラットフォーム固有のバックエンドに転送する。
- データを提供する2つの方法。
    1. オーディオスレッドで実行されているコールバック関数から、バックエンドのオーディオバッファに直接入力する。
    2. 代わりに、メインループからオーディオデータの小さなパケットをプッシュする。
    または、自分で作成した別のスレッドから、小さなオーディオデータのパケットをプッシュする
- プラットフォームのバックエンド
    - Windows。WASAPI
    - macOS/iOS:CoreAudio
    - LinuxALSA
    - emscriptenWebAudio + ScriptProcessorNode (emscriptenが提供するOpenALやSDLのオーディオラッパーは使用しません)

コールバックモデルを使ったシンプルなモノラル方形波ジェネレータです。

```c
// オーディオスレッドで実行されるサンプルコールバック
static void stream_cb(float* buffer, int num_frames, int num_channels) {
    assert(1 == num_channels);
    static uint32_t count = 0;
    for (int i = 0; i < num_frames; i++) {
        buffer[i] = (count++ & (1<<3)) ? 0.5f : -0.5f;
    }
}

int main() {
    // sokol-audioをデフォルトのパラメータで起動する。
    saudio_setup(&(saudio_desc){
        .stream_cb = stream_cb
    });

    // 実行メインループ
    ...

    // sokol-audioを終了する
    saudio_shutdown();
    return 0;
```

同じコードでpush-modelを使用した場合

```c
#define BUF_SIZE (32)
int main() {
    // sokol-audioをデフォルトのパラメータ、コールバック無しで起動する。
    saudio_setup(&(saudio_desc){0});
    assert(saudio_channels() == 1);

    // 小さな中間バッファを使用することで、個々のサンプルをプッシュする必要がないため、非常に非効率的である。
    float buf[BUF_SIZE];
    int buf_pos = 0;
    uint32_t count = 0;

    // メインループからサンプルをプッシュ
    bool done = false;
    while (!done) {
        // オーディオサンプルを生成し、プッシュする...
        int num_frames = saudio_expect();
        for (int i = 0; i < num_frames; i++) {
            // 簡易矩形波ジェネレータ
            buf[buf_pos++] = (count++ & (1<<3)) ? 0.5f : -0.5f;
            if (buf_pos == BUF_SIZE) {
                buf_pos = 0;
                saudio_push(buf, BUF_SIZE);
            }
        }
        // その他のフレーム単位での処理...
        ...
    }

    // sokol-audioを終了する
    saudio_shutdown();
    return 0;
}
```

# sokol_fetch.h

ファイル全体の読み込み、または HTTP (emscripten/wasm) を介した非同期データストリーム (すべてのネイティブプラットフォーム)
またはローカルファイルシステム (すべてのネイティブプラットフォーム) を介した非同期データストリーム。

単純な C99 の例では、ファイルをスタティック バッファにロードします。

```c
#include "sokol_fetch.h"

static void response_callback(const sfetch_response*);

#define MAX_FILE_SIZE (1024*1024)
static uint8_t buffer[MAX_FILE_SIZE];

// アプリケーションの開始
static void init(void) {
    ...
    // sokol-fetchをデフォルトで設定する:
    sfetch_setup(&(sfetch_desc_t){0});

    // 静的に確保されたバッファへのファイルの読み込みを開始します。:
    sfetch_send(&(sfetch_request_t){
        .path = "hello_world.txt",
        .callback = response_callback
        .buffer_ptr = buffer,
        .buffer_size = sizeof(buffer)
    });
}

// 1フレームあたり...
static void frame(void) {
    ...
    // フレームごとに sfetch_dowork() を呼び出して、「歯車を回す」必要があります。:
    sfetch_dowork();
    ...
}

// レスポンスコールバックは、興味深いことが起こる場所です。:
static void response_callback(const sfetch_response_t* response) {
    if (response->fetched) {
        // データがバッファに読み込まれたら、そのデータに対して何かをする...
        const void* data = response->buffer_ptr;
        uint64_t data_size = response->fetched_size;
    }
    // 成功時、失敗時ともにfinishedフラグが設定されます。
    if (response->failed) {
        // 仕損なった
        switch (response->error_code) {
            SFETCH_ERROR_FILE_NOT_FOUND: ...
            SFETCH_ERROR_BUFFER_TOO_SMALL: ...
            ...
        }
    }
}

// アプリケーションを終了する
static void shutdown(void) {
    ...
    sfetch_shutdown();
    ...
}
```

# sokol_time.h:

クロスプラットフォームでシンプルに時間測定。

```c
#include "sokol_time.h"
...
/* sokol_time を初期化する */
stm_setup();

/* 開始時刻を取る */
uint64_t start = stm_now();

...測定用コード...

/* 経過時間 */
uint64_t elapsed = stm_since(start);

/* 時間単位に変換する */
double seconds = stm_sec(elapsed);
double milliseconds = stm_ms(elapsed);
double microseconds = stm_us(elapsed);
double nanoseconds = stm_ns(elapsed);

/* 2つのタイムスタンプの差 */
uint64_t start = stm_now();
...
uint64_t end = stm_now();
uint64_t elapsed = stm_diff(end, start);

/* ラップタイムを計る (例：fpsの場合) */
uint64_t last_time = 0;
while (!done) {
    ...render something...
    double frame_time_ms = stm_ms(stm_laptime(&last_time));
}
```

# sokol_args.h

ウェブとネイティブアプリのための統一された引数パージング。ネイティブ環境では argc/argv を、ウェブ環境では URL クエリ文字列を使用します。

1つの引数を持つURLの例:

https://floooh.github.io/tiny8bit/kc85.html?type=kc85_4

コマンドラインアプリと同じ:

> kc85 type=kc85_4

このように解析されます:

```c
#include "sokol_args.h"

int main(int argc, char* argv[]) {
    sargs_setup(&(sargs_desc){ .argc=argc, .argv=argv });
    if (sargs_exists("type")) {
        if (sargs_equals("type", "kc85_4")) {
            // start as KC85/4
        }
        else if (sargs_equals("type", "kc85_3")) {
            // start as KC85/3
        }
        else {
            // start as KC85/2
        }
    }
    sargs_shutdown();
    return 0;
}
```

より完全なドキュメントは sokol_args.h ヘッダを、より興味深い使用例は [Tiny Emulators](https://floooh.github.io/tiny8bit/) を参照してください。
