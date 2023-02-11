# sokol_app.h

クロスプラットフォームアプリケーションラッパー

プロジェクトURL: https://github.com/floooh/sokol

このファイルをCまたはC++ファイルにインクルードする前に実装してください。

```c
#define SOKOL_IMPL
```

または

```c
#define SOKOL_APP_IMPL
```

同じ場所で、sokol_app.hで初期化されるべき3D-APIを選択するために、以下のいずれかを定義します（同じプロジェクトで両方を使用する場合は、sokol_gfx.hで選択したバックエンドと一致する必要があります）。

```c
#define SOKOL_GLCORE33
#define SOKOL_GLES2
#define SOKOL_GLES3
#define SOKOL_D3D11
#define SOKOL_METAL
#define SOKOL_WGPU
```

オプションとして、以下の定義を独自の実装で提供する。

- SOKOL_ASSERT(c)         - 独自のアサートマクロ (デフォルト: assert(c))
- SOKOL_UNREACHABLE()     - 到達不可能なコードのためのガードマクロ (デフォルト: assert(false))
- SOKOL_ABORT()           - 回復不能なエラーの後に呼び出されます (デフォルト: abort())
- SOKOL_WIN32_FORCE_MAIN  - Win32でこれを定義すると、WinMainの代わりにmain()エントリポイントを使用します。
- SOKOL_NO_ENTRY          - sokol_app.hがmain()関数を「ハイジャック」してはいけない場合に、これを定義します。
- SOKOL_APP_API_DECL      - 公開関数宣言のプレフィックス (デフォルト: extern)
- SOKOL_API_DECL          - SOKOL_APP_API_DECL と同じです。
- SOKOL_API_IMPL          - public 関数実装の接頭辞（デフォルト：-）。

オプションで以下を定義すると、リリースモードでもデバッグチェックとバリデーションを強制的に行うことができます。

- SOKOL_DEBUG         - デフォルトでは、_DEBUG が定義されている場合に定義されます。

sokol_app.hがDLLとしてコンパイルされる場合、宣言または実装を含む前に以下を定義します。

- SOKOL_DLL

Windowsでは、SOKOL_DLLは、必要に応じてSOKOL_APP_API_DECLを__declspec(dllexport) または __declspec(dllimport) として定義します。

Linuxでは、SOKOL_GLCORE33は、GLXまたはEGLのどちらかを使用することができます。GLXはデフォルトであり、SOKOL_FORCE_EGLを設定すると上書きされる。

コード例については、https://github.com/floooh/sokol-samples/tree/master/sapp を参照してください。

WindowsとLinuxのGL初期化、イベント、アイコンなどのコードの一部は、GLFW (http://www.glfw.org/) から引用しています。

iOSオンスクリーンキーボードのサポートは、libgdxに'インスパイア'されたものです。

以下のシステムライブラリとリンクしています。

- macOS + Metal: Cocoa、QuartzCore、Metal、MetalKit
- macOS + GL: Cocoa、QuartzCore、OpenGL
- iOS + Metal: Foundation、UIKit、Metal、MetalKit
- iOS + GL: Foundation、UIKit、OpenGLES、GLKit
- Linux + EGL：X11、Xi、Xcursor、EGL、GL（またはGLESv2）、dl、pthread、m(?)
- Linux + GLX: X11、Xi、Xcursor、GL、dl、pthread、m(?)
- Android: GLESv3、EGL、ログ、アンドロイド
- Windows + MSVC または Clang ツールチェイン: 操作は不要です。
- Windows + MINGW/MSYS2 + gcc : '-mwin32' でコンパイルし、_WIN32 が定義されるようにする。
    - 以下のライブラリをリンクしてください： -lkernel32 -luser32 -lshell32
    - さらにGLバックエンドで: -lgdi32
    - さらにD3D11バックエンドで: -ld3d11 -ldxgi

Linuxでは、-pthreadコンパイラとリンカオプションも使用する必要があります。そうしないと、おかしなことになります。詳しくは、こちらをご覧ください： https://github.com/floooh/sokol/issues/376

UWP用にビルドするには、最近のVisual StudioツールチェーンとWindows SDK（少なくともVS2019とWindows SDK 10.0.19041.0）が必要です。UWPバックエンドを選択した場合、sokol_app.hの実装はC++17としてコンパイルされる必要があります。

macOSおよびiOSでは、Objective-Cとして実装をコンパイルする必要があります。

## 機能概要

sokol_app.h は、3Dアプリケーションの「アプリケーション・ラッパー」部分を実装する、最小限のクロスプラットフォームAPIを提供します。

- 共通アプリケーション入力機能
- デフォルトフレームバッファ」を持つウィンドウと3D-APIコンテキスト/デバイスを作成します。
- レンダリングフレームを可視化する
- キーボード、マウス、低レベルのタッチイベントを提供します。
- プラットフォーム: macOS, iOS, HTML5, Win32, Linux/RaspberryPi, Android
- 3D-API：Metal、D3D11、GL3.2、GLES2、GLES3、WebGL、WebGL2

機能/プラットフォームマトリックス

|                   | Windows | macOS  | Linux  | iOS  | Android | UWP  | HTML5 |
| ----------------- | ------- | ------ | ------ | ---- | ------- | ---- | ----- |
| gl 3.x            | YES     | YES    | YES    | ---  | ---     | ---  | ---   |
| gles2/webgl       | ---     | ---    | YES(2) | YES  | YES     | ---  | YES   |
| gles3/webgl2      | ---     | ---    | YES(2) | YES  | YES     | ---  | YES   |
| metal             | ---     | YES    | ---    | YES  | ---     | ---  | ---   |
| d3d11             | YES     | ---    | ---    | ---  | ---     | YES  | ---   |
| KEY_DOWN          | YES     | YES    | YES    | SOME | TODO    | YES  | YES   |
| KEY_UP            | YES     | YES    | YES    | SOME | TODO    | YES  | YES   |
| CHAR              | YES     | YES    | YES    | YES  | TODO    | YES  | YES   |
| MOUSE_DOWN        | YES     | YES    | YES    | ---  | ---     | YES  | YES   |
| MOUSE_UP          | YES     | YES    | YES    | ---  | ---     | YES  | YES   |
| MOUSE_SCROLL      | YES     | YES    | YES    | ---  | ---     | YES  | YES   |
| MOUSE_MOVE        | YES     | YES    | YES    | ---  | ---     | YES  | YES   |
| MOUSE_ENTER       | YES     | YES    | YES    | ---  | ---     | YES  | YES   |
| MOUSE_LEAVE       | YES     | YES    | YES    | ---  | ---     | YES  | YES   |
| TOUCHES_BEGAN     | ---     | ---    | ---    | YES  | YES     | TODO | YES   |
| TOUCHES_MOVED     | ---     | ---    | ---    | YES  | YES     | TODO | YES   |
| TOUCHES_ENDED     | ---     | ---    | ---    | YES  | YES     | TODO | YES   |
| TOUCHES_CANCELLED | ---     | ---    | ---    | YES  | YES     | TODO | YES   |
| RESIZED           | YES     | YES    | YES    | YES  | YES     | YES  | YES   |
| ICONIFIED         | YES     | YES    | YES    | ---  | ---     | YES  | ---   |
| RESTORED          | YES     | YES    | YES    | ---  | ---     | YES  | ---   |
| FOCUSED           | YES     | YES    | YES    | ---  | ---     | ---  | YES   |
| UNFOCUSED         | YES     | YES    | YES    | ---  | ---     | ---  | YES   |
| SUSPENDED         | ---     | ---    | ---    | YES  | YES     | YES  | TODO  |
| RESUMED           | ---     | ---    | ---    | YES  | YES     | YES  | TODO  |
| QUIT_REQUESTED    | YES     | YES    | YES    | ---  | ---     | ---  | YES   |
| IME               | TODO    | TODO?  | TODO   | ???  | TODO    | ---  | ???   |
| key repeat flag   | YES     | YES    | YES    | ---  | ---     | YES  | YES   |
| windowed          | YES     | YES    | YES    | ---  | ---     | YES  | YES   |
| fullscreen        | YES     | YES    | YES    | YES  | YES     | YES  | ---   |
| mouse hide        | YES     | YES    | YES    | ---  | ---     | YES  | YES   |
| mouse lock        | YES     | YES    | YES    | ---  | ---     | TODO | YES   |
| set cursor type   | YES     | YES    | YES    | ---  | ---     | YES  | YES   |
| screen keyboard   | ---     | ---    | ---    | YES  | TODO    | TODO | YES   |
| swap interval     | YES     | YES    | YES    | YES  | TODO    | ---  | YES   |
| high-dpi          | YES     | YES    | TODO   | YES  | YES     | YES  | YES   |
| clipboard         | YES     | YES    | TODO   | ---  | ---     | TODO | YES   |
| MSAA              | YES     | YES    | YES    | YES  | YES     | TODO | YES   |
| drag'n'drop       | YES     | YES    | YES    | ---  | ---     | TODO | YES   |
| window icon       | YES     | YES(1) | YES    | ---  | ---     | TODO | YES   |

(1) macOSでは通常のウィンドウアイコンがなく、代わりにドックアイコンが変更されている
(2) EGLのみ対応(GLXは非対応)

## ステップバイステップ

初期化パラメータとコールバック関数のポインタを含むsapp_desc構造体を返すsokol_main()関数をあなたのコードに追加してください。この関数は、非常に早い段階で、通常はプラットフォームのエントリ関数(例えばmainやWinMain)の開始時に呼び出されます。あなたのコードの残りは別のスレッドから呼び出されるかもしれないので、ここではできるだけ何もしない方が良いでしょう（これはプラットフォームに依存します）。

```c
sapp_desc sokol_main(int argc, char* argv[]) {
    return (sapp_desc) {
        .width = 640,
        .height = 480,
        .init_cb = my_init_func,
        .frame_cb = my_frame_func,
        .cleanup_cb = my_cleanup_func,
        .event_cb = my_event_func,
        ...
    };
}
```

他にも多くの設定パラメータがありますが、最も重要なのはこれらです。完全なリストは、以下のsapp_desc構造体宣言を検索してください。

sokol-appはこの時点では初期化されていないので、sokol_main()の内部からsokol-appの関数を呼び出さないでください。

.widthと.heightパラメータは、3Dレンダリングキャンバスの好ましい大きさです。実際のサイズは、プラットフォームやその他の状況により、これとは異なる場合があります。また、キャンバスのサイズはいつでも変更可能です（例えば、ユーザーがアプリケーションウィンドウのサイズを変更したり、モバイルデバイスを回転させたりした場合など）。.width と .height をゼロのまま初期化すると、デフォルトサイズのウィンドウが開きます（「デフォルトサイズ」の正確な意味はプラットフォームによって異なりますが、通常はディスプレイの大部分（ただしすべてではない）をカバーするサイズです）。

提供されたすべての関数のコールバックは同じスレッドから呼び出されますが、 これは sokol_main() が呼び出されたスレッドとは異なるかもしれません。

```c
.init_cb (void (*)(void))
```

この関数は、アプリケーションウィンドウ、3Dレンダリングコンテキスト、スワップチェーンが作成された後に一度だけ呼び出されます。この関数は引数を取らず、戻り値もありません。

```c
.frame_cb (void (*)(void))
```

これはフレーム単位のコールバックで、通常1秒間に60回呼び出されます。ここで、アプリケーションは状態の大部分を更新し、すべてのレンダリングを実行することになります。

```c
.cleanup_cb (void (*)(void))
```

クリーンアップコールバックは、アプリケーションが終了する直前に一度だけ呼び出されます。

```c
.event_cb (void (*)(const sapp_event* event))
```

イベントコールバックは主に入力処理のために使用されますが、他のタイプのイベントをアプリケーションに伝達するためにも使用されます。アプリケーションでイベント処理を必要としない場合は、event_cb 構造体メンバをゼロ初期化したままにしておく。

```c
.fail_cb (void (*)(const char* msg))
```

failコールバックは、起動中に致命的なエラーが発生し、プログラムが続行できなくなったときに呼び出されます。ここでコールバックを提供することで、ユーザにエラーメッセージを表示することができます。デフォルトの動作は、SAPP_LOG(msg) です。

このように、「標準コールバック」は user_data 引数を持たないので、コールバック間で保存する必要があるデータはすべてグローバル変数に保存しなければなりません。グローバル変数に状態を保持することがオプションでない場合、user_dataポインタの引数を追加したコールバックの代替セットがあります。

```c
.user_data (void*)
```

以下のコールバックのuser-dataの引数。

```c
.init_userdata_cb (void (*)(void* user_data))
.frame_userdata_cb (void (*)(void* user_data))
.cleanup_userdata_cb (void (*)(void* user_data))
.event_userdata_cb (void(*)(const sapp_event* event, void* user_data))
.fail_userdata_cb (void(*)(const char* msg, void* user_data))
```

これらは、コールバック関数のユーザーデータバージョンです。user_data引数を持たない標準的なコールバック関数と混在させることができます。

関数sapp_userdata()は、sapp_desc構造体で提供されるuser_dataポインタを問い合わせるために使用されます。

また、sapp_query_desc() を呼び出して、元のsapp_desc 構造体のコピーを取得することもできます。

> NOTE: sokol_app.hがmain()関数を「ハイジャック」しない別のコンパイルモードもあるということです。SOKOL_NO_ENTRYで以下を検索してください。

初期化コールバック関数(init_cb)を実装する。これは、レンダリングサーフェイス、3D API、スワップチェーンがsokol_appによって初期化された後に一度だけ呼び出されるものである。すべてのsokol-app関数は、初期化コールバックの内部から呼び出すことができ、この時点で最も有用な関数は以下の通りです。

```c
int sapp_width(void)
int sapp_height(void)
```

デフォルトのフレームバッファの現在の幅と高さをピクセル単位で返します。これはフレームごとに変わる可能性があり、sapp_desc 構造体で提供される初期サイズとは異なる場合があります。

```c
float sapp_widthf(void)
float sapp_heightf(void)
```

これらは sapp_width() と sapp_height() の代替で、デフォルトのフレームバッファサイズを整数値ではなく浮動小数点値で返します。これは、C や C++ よりも強い型付け言語において、int と float の間を行ったり来たりするキャストを防ぐのに役立つかもしれません。

```c
double sapp_frame_duration(void)
```

ジッターのスパイクを滑らかにするために、複数のフレームで平均化したフレーム時間を秒単位で返します。

```c
int sapp_color_format(void)
int sapp_depth_format(void)
```

sokol-gfx の sg_pixel_format enum と互換性のある整数値として、デフォルトフレームバッファの色と深度ステンシルのピクセルフォーマット (sg_pixel_format が期待される場所に直接埋め込むことができるように)。可能な値は以下の通りです。

- 23 == SG_PIXELFORMAT_RGBA8
- 27 == SG_PIXELFORMAT_BGRA8
- 41 == SG_PIXELFORMAT_DEPTH
- 42 == SG_PIXELFORMAT_DEPTH_STENCIL

```c
int sapp_sample_count(void)
```

デフォルトフレームバッファの MSAA サンプル数を返します。

```c
bool sapp_gles2(void)
```

GLES2またはWebGLのコンテキストが作成された場合、trueを返します。これは、GLES3/WebGL2コンテキストが要求されたが利用できず、sokol_app.hがGLES2/WebGLにフォールバックしなければならない場合に有用である。

```c
const void* sapp_metal_get_device(void)
const void* sapp_metal_get_renderpass_descriptor(void)
const void* sapp_metal_get_drawable(void)
```

Metalバックエンドが選択されている場合、これらの関数はレンダリングに必要な様々なMetal APIオブジェクトへのポインタを返し、そうでない場合はNULLポインタを返します。これらの void ポインタは、実際には Objective-C ID を (ARC) __bridge キャストで変換したもので、C コードで ID をトンネルできるようにします。また、返される renderpass-descriptor と drawable へのポインタはフレームごとに変わる可能性がありますが、Metal デバイス オブジェクトだけは同じままであることが保証されていることに注意してください。

```c
const void* sapp_macos_get_window(void)
```

macOSでは、NSWindowオブジェクトポインタを取得し、それ以外はNULLポインタを取得します。Objective-Cのオブジェクトとして使用する前に、void*を(ARC)__bridgeキャストで変換して戻す必要があります。

```c
const void* sapp_ios_get_window(void)
```

iOS では UIWindow オブジェクト ポインタ、それ以外は null ポインタを取得します。Objective-C オブジェクトとして使用する前に、void* を (ARC) __bridge キャストで変換して戻す必要があります。

```c
const void* sapp_win32_get_hwnd(void)
```

Windowsでは、ウィンドウのHWNDを取得し、それ以外はヌルポインタを取得します。HWNDは、Windows.hを含まないコードからトンネルできるように、voidポインタにキャストされています。

```c
const void* sapp_d3d11_get_device(void)
const void* sapp_d3d11_get_device_context(void)
const void* sapp_d3d11_get_render_target_view(void)
const void* sapp_d3d11_get_depth_stencil_view(void)
```

Similar to the sapp_metal_* functions, the sapp_d3d11_* functions return pointers to D3D11 API objects required for rendering, only if the D3D11 backend has been selected. Otherwise they return a null pointer. Note that the returned pointers to the render-target-view and depth-stencil-view may change from one frame to the next!

```c
const void* sapp_wgpu_get_device(void)
const void* sapp_wgpu_get_render_view(void)
const void* sapp_wgpu_get_resolve_view(void)
const void* sapp_wgpu_get_depth_stencil_view(void)
```

これらは、レンダリングに必要なWebGPUオブジェクトと値を取得するためのWebGPU固有の関数です。sokol_app.hがSOKOL_WGPUでコンパイルされていない場合、これらの関数はnullを返します。

```c
const void* sapp_android_get_native_activity(void);
```

Android では、ネイティブアクティビティ ANativeActivity ポインタを取得し、それ以外は null ポインタを取得します。

この関数は init コールバックと同じスレッドで呼び出されますが、sokol_main() 関数とは異なるスレッドになる可能性があります。レンダリングフレームバッファのサイズは、フレームコールバックが最後に呼び出されてから変更されたかもしれないことに注意してください。現在のサイズを取得するために、各フレームで関数 sapp_width() と sapp_height() を呼び出してください。

オプションで、入力イベントを処理するための event-callback を実装する。

sokol-appは、以下のタイプの入力イベントを提供します。

- 仮想キーが押されたり、離されたりした。
- 一つのテキスト文字が入力された（UTF-32コードポイントとして提供される）。
- マウスのボタンが押されたり離されたりした場合（左、右、中央）
- マウスホイールまたは2Dスクロールイベント
- マウスが移動された
- マウスがアプリケーションウィンドウの境界線に入った、または、境界線から離れた
- 低レベルのポータブルマルチタッチイベント（開始、移動、終了、キャンセル）。
- アプリケーションウィンドウのサイズ変更、アイコン化、復元
- アプリケーションが一時停止または復元された (モバイルプラットフォームで)
- ユーザーまたはアプリケーションコードがアプリケーションの終了を要求した。
- 文字列がシステムのクリップボードに貼り付けられた。
- 1つまたは複数のファイルがアプリケーションウィンドウにドロップされた場合

イベントを明示的に「消費」して、オペレーティングシステムに転送されないようにするには、イベントハンドラの内部で sapp_consume_event() を呼び出します (この動作は現在一部の HTML5 イベントに対してのみ実装されています。他のプラットフォームやイベントタイプのサポートは必要に応じて追加されます。）

> 注：イベント・コールバック関数内で3D APIレンダリング関数を呼び出さないようにしてください。

cleanup-callback関数を実装してください。これは、ユーザーがアプリケーションを終了した後に一度だけ呼ばれます（終了時の動作に関する詳しい情報は、"APPLICATION QUIT "のセクションを見てください。）cleanup-callbackは、ウェブやモバイルのプラットフォームで呼び出されることは保証されていないことに注意してください。

## マウスカーソルの種類と視認性

でマウスカーソルの表示/非表示を切り替えることができます。

```c
void sapp_show_mouse(bool show)
```

そして、現在の表示状態を取得すること。

```c
bool sapp_mouse_shown(void)
```

> マウスカーソルの非表示は、マウスポインタを隠す MOUSE/POINTER LOCK 機能とは異なり、独立した機能です（MOUSE LOCK については後述します）。

マウスカーソルをあらかじめ定義されたいくつかの種類のいずれかに変更するには、この関数を呼び出します。

```c
void sapp_set_mouse_cursor(sapp_mouse_cursor cursor)
```

デフォルトのマウスカーソル SAPP_MOUSECURSOR_DEFAULT を設定すると、標準の外観が復元されます。

現在アクティブなマウスカーソルの種類を取得するには、以下を呼び出します。

```c
sapp_mouse_cursor sapp_get_mouse_cursor(void)
```

## マウスロック (AKA POINTER LOCK, AKA MOUSE CAPTURE)

通常のマウスモードでは、マウスがウィンドウズクライアント領域から外れるか、画面の境界線に当たるか（どちらか一方であるかはプラットフォームに依存します）、マウス移動イベント（SAPP_EVENTTYPE_MOUSE_MOVE）は、フレームバッファピクセルでの絶対位置が sapp_event item mouse_x と mouse_y に、相対移動が sapp_event item mouse_dx と mouse_dy に、それぞれ格納されます。

連続的なマウスの動きを得るために(マウスがウィンドウクライアントエリアから離れたり、画面の境界線に当たったりしたときにも)、呼び出すことによってマウスロックモードを有効にします。

```c
sapp_lock_mouse(true)
```

マウスロックが有効になると、マウスポインターは隠され、報告されたマウスの絶対位置（sapp_event.mouse_x/y）は凍結したように見え、sapp_event.mouse_dx/dyの相対マウス移動はもはやフレームバッファーのピクセルに直接関係なく、代わりに「生のマウス入力」（「生のマウス入力」が正確に何を意味するかもプラットフォームによって異なる）を使用します。

マウスロックを解除し、通常のマウスモードに戻るには

```c
sapp_lock_mouse(false)
```

そして最後に、マウスロックが現在有効かどうかを確認するために、以下のように呼び出します。

```c
if (sapp_mouse_locked()) { ... }
```

ネイティブ環境では、sapp_lock_mouse() および sapp_mouse_locked() 関数は期待通りに動作します (sapp_lock_mouse() が呼ばれると、マウスロックは直ちに有効または無効になり、 sapp_mouse_locked() も sapp_lock_mouse() が呼ばれた後直ちに新しい状態を返します).

Webプラットフォーム上では、sapp_lock_mouse() および sapp_mouse_locked() は、HTML5 Pointer Lock APIの制限により、異なる挙動をします。

- sapp_lock_mouse(true) はいつでも呼び出せますが、「特定のタイプの短命な入力イベントハンドラ」、つまり以下のイベントのいずれかが発生したときのみ、有効になります。
    - SAPP_EVENTTYPE_MOUSE_DOWN
    - SAPP_EVENTTYPE_MOUSE_UP
    - SAPP_EVENTTYPE_MOUSE_SCROLL
    - SAPP_EVENTTYPE_KEY_UP
    - SAPP_EVENTTYPE_KEY_DOWN
- これは、sapp_lock_mouse()を呼び出した後、sapp_mouse_locked()がすぐに新しい状態を返さないことを意味し、代わりに報告される状態は、ブラウザでポインタロックが実際に有効または無効にされたときにのみ変更されます。
- ウェブ上では、ユーザがEscキーを押すことで、いつでもマウスロックを解除することができます。このとき、sokol_app.hはsapp_lock_mouse(false)が呼ばれたときと同じように振る舞います。

例えば、次のコードは、マウスの左ボタンが押されたり離されたりしたときにマウスロック状態になり、その相対移動情報を使ってカメラを操作します（https://github.com/floooh/sokol-samples の sokol-samples リポジトリの cgltf-sapp.c サンプルから取得しました）。

```c
static void input(const sapp_event* ev) {
    switch (ev->type) {
        case SAPP_EVENTTYPE_MOUSE_DOWN:
            if (ev->mouse_button == SAPP_MOUSEBUTTON_LEFT) {
                sapp_lock_mouse(true);
            }
            break;

        case SAPP_EVENTTYPE_MOUSE_UP:
            if (ev->mouse_button == SAPP_MOUSEBUTTON_LEFT) {
                sapp_lock_mouse(false);
            }
            break;

        case SAPP_EVENTTYPE_MOUSE_MOVE:
            if (sapp_mouse_locked()) {
                cam_orbit(&state.camera, ev->mouse_dx * 0.25f, ev->mouse_dy * 0.25f);
            }
            break;

        default:
            break;
    }
}
```

## CLIPBOARD SUPPORT

アプリケーションは、UTF-8 でエンコードされたテキストデータを、システムのクリップボードと送受信することができます。デフォルトでは、クリップボードのサポートは無効であり、起動時に以下の sapp_desc 構造体メンバを介して有効にする必要があります。

- sapp_desc.enable_clipboard  - クリップボードのサポートを有効にするにはtrueに設定します。
- sapp_desc.clipboard_size    - 内部クリップボードバッファのサイズ（バイト数

クリップボードを有効にすると、UTF-8でエンコードされたテキストデータ用に、要求されたバイト数のクリップボードバッファが動的に割り当てられます（デフォルトのサイズは8KBytesです）。クリップボードバッファに収まらない文字列（終端の0を含む）は静かに切り取られます。したがって、使用するケースに応じて十分な大きさのクリップボードサイズを指定することが重要です。

クリップボードにデータを送信するには、UTF-8でエンコードされたヌル文字で終端するC文字列へのポインタを指定して、 sapp_set_clipboard_string() を呼び出してください。

> HTML5プラットフォームでは、sapp_set_clipboard_string()は 'short-lived event handler'の内部から呼び出されなければならないことに注意してください、そして、回避すべき他のいくつかのHTML5特有の注意事項が存在します。基本的には、すべてのブラウザで動作するまでいじくり回す必要があります :/（すべてのブラウザが新しいHTML5 navigator.clipboard APIに同意して実装すれば、状況は改善されるかもしれません）。

クリップボードからデータを取得するには、イベントハンドラ関数で SAPP_EVENTTYPE_CLIPBOARD_PASTED イベントを確認し、 sapp_get_clipboard_string() を呼び出して UTF-8 エンコードされた貼り付けられたテキストを取得する必要があります。

> sapp_get_clipboard_string() の挙動は、プラットフォームによって若干異なることに注意してください。

- HTML5 プラットフォームでは、内部クリップボードバッファは SAPP_EVENTTYPE_CLIPBOARD_PASTED イベントが送信される直前にのみ更新され、 sapp_get_clipboard_string() は単にクリップボードバッファの現在の内容を返します。
- ネイティブ' プラットフォームでは、 sapp_get_clipboard_string() のコールにより、 内部クリップボードバッファをシステムクリップボードからの最新データで更新します。

ポータブルコードは、SAPP_EVENTTYPE_CLIPBOARD_PASTED イベントをチェックし、 イベントハンドラ内で sapp_get_clipboard_string() を正しくコールする必要があります。

SAPP_EVENTTYPE_CLIPBOARD_PASTED イベントは、以下のように sokol-app で生成されます。

- on macOS: Cmd+Vキーが押されたとき
- on HTML5: ブラウザがグローバルな 'window' オブジェクトに 'paste' イベントを送信したとき
- 他のすべてのプラットフォームでは、Ctrl+Vキーが押されているとき

## ドラッグ＆ドロップ対応

> 注: ドラッグ＆ドロップ機能は、HTML5のドラッグ＆ドロップAPIのセキュリティ関連の制限により、WASM/HTML5とネイティブのデスクトッププラットフォーム（Win32、Linux、macOS）では異なる動作をします。WASM/HTML5の仕様については、このドキュメントセクションの最後に記載されています。

クリップボードと同様に、ドラッグ＆ドロップも起動時にsapp_desc構造体で明示的に有効化する必要があります。

```c
sapp_desc sokol_main() {
    return (sapp_desc) {
        .enable_dragndrop = true,   // default is false
        ...
    };
}
```

また、必要に応じて、ドロップ操作で受け付けるファイルの最大数や、パスの最大長（バイト単位）を調整することができます。

```c
sapp_desc sokol_main() {
    return (sapp_desc) {
        .enable_dragndrop = true,               // default is false
        .max_dropped_files = 8,                 // default is 1
        .max_dropped_file_path_length = 8192,   // in bytes, default is 2048
        ...
    };
}
```

ドラッグ＆ドロップが有効な場合、ユーザーがアプリケーションウィンドウにファイルをドロップすると、イベントコールバックは SAPP_EVENTTYPE_FILES_DROPPED タイプのイベントで呼び出されます。

SAPP_EVENTTYPE_FILES_DROPPED を受け取った後、別の関数を呼び出すことで、ドロップしたファイルの数および絶対パスを問い合わせることができます。

```c
void on_event(const sapp_event* ev) {
    if (ev->type == SAPP_EVENTTYPE_FILES_DROPPED) {
        
        // the mouse position where the drop happened
        float x = ev->mouse_x;
        float y = ev->mouse_y;

        // get the number of files and their paths like this:
        const int num_dropped_files = sapp_get_num_dropped_files();
        for (int i = 0; i < num_dropped_files; i++) {
            const char* path = sapp_get_dropped_file_path(i);
            ...
        }
    }
}
```

返されるファイルパスは、UTF-8 でエンコードされた文字列である。

sapp_get_num_dropped_files() および sapp_get_dropped_file_path() は、イベントハンドラのコールバック以外の場所でもコールすることができますが、ファイルパス文字列は、次のドロップ操作で上書きされることに注意しましょう。

ドラッグ＆ドロップ機能が有効でない場合、最後のドロップ操作に失敗した場合、ファイルパスのインデックスが範囲外の場合は、空文字列 "" が返されます。

ドラッグ＆ドロップの注意点

- sapp_desc.max_dropped_files を超える数のファイルが1回のドロップ操作でドロップされた場合、追加ファイルは黙って無視されます。
- ファイルパスのいずれかが sapp_desc.max_dropped_file_path_length (バイト数、UTF-8エンコーディング後) より長い場合、ドロップ操作全体は静かに無視されます (これは将来的に何らかのエラーフィードバックが必要です)
- ドラッグ中にマウスの位置が報告されない。

HTML5/WASMでのドラッグ＆ドロップ機能:

HTML5のドラッグ＆ドロップAPIは、ファイルのパスを返さず、代わりにブラックボックスの「ファイル・オブジェクト」を返し、ドロップしたファイルのコンテンツを読み込むために使用しなければなりません。これが、sokol_app.hがドラッグ＆ドロップAPIに2つのHTML5固有の関数を追加した理由です。

```c
uint32_t sapp_html5_get_dropped_file_size(int index)
```

ドロップされたファイルのサイズをバイト数で返す。

```c
void sapp_html5_fetch_dropped_file(const sapp_html5_fetch_request* request)
```

ドロップされたファイルの内容を、提供されたメモリバッファ（ファイルの内容を保持するのに十分な大きさでなければならない）に非同期的にロードする。

SAPP_EVENTTYPE_FILES_DROPPED イベントを受信した後、最初のドロップファイルの読み込みを開始すること。

```c
sapp_html5_fetch_dropped_file(&(sapp_html5_fetch_request){
    .dropped_file_index = 0,
    .callback = fetch_cb
    .buffer = {
        .ptr = buf,
        .size = sizeof(buf)
    },
    .user_data = ...
});
```

コールバック関数が呼ばれるまで、'buf'が指すメモリが有効であることを確認すること!

非同期ロード操作の結果、（成功したか失敗したかに関わらず）'fetch_cb' 関数が呼ばれることになります。

```c
void fetch_cb(const sapp_html5_fetch_response* response) {
    // IMPORTANT: check if the loading operation actually succeeded:
    if (response->succeeded) {
        // the size of the loaded file:
        const size_t num_bytes = response->data.size;
        // and the pointer to the data (same as 'buf' in the fetch-call):
        const void* ptr = response->data.ptr;
    }
    else {
        // on error check the error code:
        switch (response->error_code) {
            case SAPP_HTML5_FETCH_ERROR_BUFFER_TOO_SMALL:
                ...
                break;
            case SAPP_HTML5_FETCH_ERROR_OTHER:
                ...
                break;
        }
    }
}
```

ネイティブプラットフォームとWebの両方で動作する実例として、droptest-sappの例をご覧ください。

https://github.com/floooh/sokol-samples/blob/master/sapp/droptest-sapp.c

## 高精細度レンダリング

初期化中にsapp_desc.high_dpiフラグを設定することで、HighDPIディスプレイ上でフル解像度のフレームバッファを要求することができます。デフォルトの動作は、sapp_desc.high_dpi=falseで、これは、アプリケーションがHighDPIディスプレイ上で低解像度フレームバッファにレンダリングし、レンダリングされたコンテンツがウィンドウシステムコンポーザーによってアップスケールされることを意味しています。

HighDPIシナリオでは、sokol_main()中に同じウィンドウサイズを要求しますが、sapp_width()とsapp_height()が返すフレームバッファサイズは、DPIスケーリング比に従ってスケールアップされることになります。

> プラットフォームによっては、DPIスケーリングファクターがいつでも変更できることに注意してください（たとえば、ウィンドウを高dpiディスプレイから低dpiディスプレイに移動した場合など）。

現在のDPIスケーリングファクターを問い合わせるには、この関数を呼び出します。

```c
float sapp_dpi_scale(void);
```

例えばRetina Macの場合、sokol_main()から以下のようなsapp_desc構造体を返します。

```c
sapp_desc sokol_main() {
    return (sapp_desc) {
        .width = 640,
        .height = 480,
        .high_dpi = true,
        ...
    };
}
```

...関数sapp_width()、sapp_height()、sapp_dpi_scale()は、以下の値を返します。

- sapp_width:     1280
- sapp_height:    960
- sapp_dpi_scale: 2.0

high_dpiフラグがfalseの場合、またはRetinaディスプレイで動作していない場合、値は次のようになります。

- sapp_width:     640
- sapp_height:    480
- sapp_dpi_scale: 1.0

ウィンドウをRetinaディスプレイから低dpiの外部ディスプレイに移動した場合、値は次のように変化します。

- sapp_width:     1280 => 640
- sapp_height:    960  => 480
- sapp_dpi_scale: 2.0  => 1.0

現在、DPI変更に関連するイベントはありませんが、フレームバッファサイズ変更の副作用として、SAPP_EVENTTYPE_RESIZEDが送信されるでしょう。

モニターごとのDPIは、現在macOSとWindowsでサポートされています。

## アプリケーション終了

特別な終了処理を行わない場合、sokol_app.hのアプリケーションは、プラットフォームのアプリケーション・モデルがこれを妨げない限り、ユーザーがウィンドウを閉じるボタンをクリックすると「優雅に」終了します（例えば、ウェブやモバイル）。優雅な終了」とは、アプリケーションが提供するクリーンアップ・コールバックが、アプリケーションが終了する前に呼び出されることを意味します。

ネイティブのデスクトップ・プラットフォームでは、sokol_app.hはアプリケーションの終了プロセスについて、より多くの制御を提供します。アプリケーション・コードから「プログラムによる終了」を開始することができます。また、アプリケーション・ユーザーによって開始された終了を傍受することもできます（例えば、カスタムダイアログボックスを表示するため）。

この「プログラムによる終了プロトコル」は、3つの関数と1つのイベントによって実装されています。

- sapp_quit(): この関数は、ユーザーに介入する機会を与えることなく、単にアプリケーションを終了させます。通常、この関数は 'Really Quit?' ダイアログボックスで 'Ok' ボタンをクリックしたときに呼び出されます。
- sapp_request_quit(): sapp_request_quit() を呼び出すと、アプリケーションのイベントハンドラーコールバックに SAPP_EVENTTYPE_QUIT_REQUESTED イベントを送信し、ユーザーコードに介入して保留中の終了処理をキャンセルする機会を与えます（例えば 'Really Quit?）イベントハンドラーコールバックが何もしない場合、アプリケーションは通常通り終了します。これを防ぐには、イベントハンドラの内部から関数 sapp_cancel_quit() を呼び出します。
- sapp_cancel_quit(): 保留中の quit リクエストをキャンセルします。これは、ユーザがウィンドウを閉じるボタンをクリックすることによって開始されるか、 sapp_request_quit() を呼び出すことによってプログラム的に開始されます。この関数をコールする意味があるのは、 SAPP_EVENTTYPE_QUIT_REQUESTED イベントを受け取ったときのイベントハンドラーコールバック内だけです。
- SAPP_EVENTTYPE_QUIT_REQUESTED: このイベントは、ユーザがウィンドウのクローズボタンをクリックするか、 アプリケーションコードがsapp_request_quit()関数を呼び出すと送信されます。イベントハンドラーコールバックコードは、sapp_cancel_quit()を呼び出すことにより、このイベントを処理し、終了を取り消すことができます。このイベントを無視した場合、アプリケーションは通常通り終了します。

ウェブプラットフォームでは、ウェブ特有の制約があるため、終了時の動作がネイティブプラットフォームと異なる。

sapp_quit()またはsapp_request_quit()を呼び出すことで開始される`プログラムによる終了`は、上記のように動作します。クリーンアップコールバックが呼ばれ、プラットフォーム固有のクリーンアップが実行され（ウェブでは、JSイベントハンドラの登録を解除するということ）、リクエスト-アニメーションループが終了されることになります。しかし、それだけです。ウェブページ自体は存在し続けます（たとえば、ブラウザのタブをプログラム的に閉じることはできません）。

ウェブ上では、ユーザーがブラウザータブを閉じたときにカスタムコードを実行することもできないので、派手なカスタムダイアログボックスでこれを防ぐことはできません。

その代わり、標準の "Leave Site? "ダイアログボックスは、以下の関数で有効化（または無効化）することができます。

```c
sapp_html5_ask_leave_site(bool ask);
```

関連する内部フラグの初期状態は、sapp_desc.html5_ask_leave_siteを介して、起動時に提供することができます。

この機能は、重要な状況、例えばユーザがデータを失うような場合にのみ、控えめに使用されるべきです。このダイアログボックスの内容をカスタマイズしたり、ユーザーの判断でコードを実行したりすることはできないことに注意してください。また、ダイアログボックスが表示される前に、ユーザーがサイトとインタラクションしている必要があることにも注意してください。これらはすべて、釣りを防止するためのセキュリティ対策です。

Dear ImGui HighDPIサンプルには、Dear ImGuiで「本当に辞めるのか」ダイアログボックスを実装する方法（ネイティブのデスクトッププラットフォームのみ）と、Webプラットフォームで実行する際にハードワイヤーで「サイトを出るのか」ダイアログボックスを表示するためのサンプルコードが含まれています。

- https://floooh.github.io/sokol-html5/wasm/imgui-highdpi-sapp.html

## FULLSCREEN

sapp_desc.fullscreenフラグがtrueの場合、sokol-appは「適切な」ウィンドウシステム（モバイルデバイスは常にフルスクリーンを使用）を持つプラットフォームでフルスクリーンウィンドウを作成しようとします。一般的に、sokol-appはプラットフォームのウィンドウシステムにあまり干渉しない「ソフトアプローチ」を使用します（例えば、「本物の」フルスクリーンモードではなく、ボーダーレスなフルスクリーンウィンドウなど）。このような詳細は、sokol-appが様々なニーズに適応していくにつれて、変化していくかもしれません。

sapp_width()とsapp_height()を呼び出すと、代わりにフルスクリーンキャンバスの解像度を返します (ただし、ユーザがフルスクリーンからウィンドウモードに戻せる場合に、フルスクリーンではないウィンドウに、指定したサイズがまだ使われることがあります)。

プログラムでフルスクリーンモードを切り替えるには、 sapp_toggle_fullscreen() を呼び出してください。

アプリケーションウィンドウが現在フルスクリーンモードであるかどうかを確認するには、 sapp_is_fullscreen() をコールしてください。

## ウィンドウアイコン対応

いくつかのsokol_app.hバックエンドでは、プログラムによってウィンドウのアイコンを変更することができます。

- Win32の場合：ウィンドウのタイトルバーにある小さなアイコンと、タスクバーにある大きなアイコン
- Linuxの場合：使用するウィンドウマネージャに大きく依存しますが、通常はウィンドウのタイトルバーアイコンやタスクバーアイコンが表示されます
- HTML5の場合: ページのブラウザタブに表示されるファビコン

> オペレーティングシステムによってデスクトップやホーム画面に表示される実際のアプリケーションのアイコンを設定することはできないことに注意してください。これらのアイコンは、アプリケーションに関連するオペレーティングシステム固有のリソースを通じて、「伝統的に」提供されなければなりません（sokol_app.hは、プラットフォーム固有のリソースデータからのウィンドウアイコンの設定を後でサポートするかもしれませんが）。

ウィンドウのアイコンを設定する方法は2つあります。

- アプリケーションの起動時に、sokol_main()関数内で、 sapp_desc.icon 構造体を初期化することにより行います。
- またはそれ以降に関数 sapp_set_icon() を呼び出すことで実現できます。

便利なショートカットとして、sokol_app.hにはデフォルトアイコン（虹色の「S」、少なくともWindowsのアプリケーション用デフォルトアイコンよりは少し良さそう）が組み込まれており、このように有効にすることができます。

sokol_main()での起動時。

```c
sapp_desc sokol_main(...) {
    return (sapp_desc){
        ...
        icon.sokol_default = true
    };
}
```

Or later by calling:

```c
sapp_set_icon(&(sapp_icon_desc){ .sokol_default = true });
```

> 完全にゼロ初期化されたsapp_icon_desc構造体は、ウィンドウアイコンを何ら更新しないことに注意してください。これは、ウィンドウアイコンの更新を自分で処理できるようにするための「逃げ道」です (あるいは、すでに処理している場合は、sokol_app.hは邪魔になりません。この場合は、sapp_desc.icon構造体をゼロ初期化したままにしておいてください)。

独自のアイコン画像を提供することは、GLFWと全く同じように機能します（データ形式に至るまで）。

異なるサイズの「候補画像」を1つ以上提供すると、sokol_app.hプラットフォームのバックエンドが、特定のバックエンドとアイコン種類に最も合うものを選びます。

各候補画像について、あなたは以下を提供する必要があります。

- 幅をピクセル単位で指定します。
- 高さをピクセル単位で指定します。
- RGBA8 ピクセル形式の実際のピクセルデータ（例えばリトルエンディアンの CPU で 0xFFCC8844 とすると、alpha=0xFF、blue=0xCC、green=0x88、red=0x44 となります）を指定します。

例えば、サイズが16x16、32x32、64x64の3つの候補画像（小、中、大）がある場合、対応するsapp_icon_desc構造体は次のように設定されます。

```c
// the actual pixel data (RGBA8, origin top-left)
const uint32_t small[16][16]  = { ... };
const uint32_t medium[32][32] = { ... };
const uint32_t big[64][64]    = { ... };
const sapp_icon_desc icon_desc = {
    .images = {
        { .width = 16, .height = 16, .pixels = SAPP_RANGE(small) },
        { .width = 32, .height = 32, .pixels = SAPP_RANGE(medium) },
        // ...or without the SAPP_RANGE helper macro:
        { .width = 64, .height = 64, .pixels = { .ptr=big, .size=sizeof(big) } }
    }
};
```

このように初期化されたsapp_icon_desc構造体は、アプリケーション起動時にsokol_mainで適用することも可能です。

```c
sapp_desc sokol_main(...) {
    return (sapp_desc){
        ...
        icon = icon_desc
    };
}
```

...または、sapp_set_icon()を呼び出すことで、それ以降になります。

```c
sapp_set_icon(&icon_desc);
```

Some window icon caveats:

- ウィンドウのアイコンが更新されると、プラットフォームのデフォルトアイコンに戻ることはできません。これは、一部のプラットフォーム（LinuxとHTML5）では、カスタムアイコンが削除または除去されても、アイコンのビジュアルがデフォルトに切り替わらないためです。
- HTML5において、sokol_app.hのアイコンがブラウザのタブに表示されない場合、ページのindex.htmlに従来のfavicon 'link' 要素が定義されていないことを確認してください、sokol_app.hは新しいfavicon link要素を追加するだけでページ内の手動定義faviconを削除しません。

ウィンドウアイコン機能の例とテストは、sokol-samples gitリポジトリにある'icon-sapp'サンプルをチェックしてください。

## オンスクリーンキーボード

物理的なキーボードを提供しないいくつかのプラットフォームでは、sokol-appはテキスト入力のためにプラットフォームに統合されたオンスクリーンキーボードを表示することができます。オンスクリーンキーボードの表示を要求するには、以下のように呼び出します。

```c
sapp_show_keyboard(true);
```

同様に、キーボードの呼び出しを非表示にする。

```c
sapp_show_keyboard(false);
```

> ウェブプラットフォームでは、キーボードは入力ハンドラの内部からしか表示できないことに注意してください。そのようなプラットフォームでは、sapp_show_keyboard()は、sokol-appイベントコールバック関数の内部から呼び出されたときのみ、期待通りに動作します。他の場所から呼び出された場合、内部フラグが設定され、オンスクリーンキーボードは、次の「正当な」機会（次の入力イベントが処理されるとき）に呼び出されます。

## オプション: main() をハイジャックしない。 (#define SOKOL_NO_ENTRY)

デフォルトの設定では、sokol_app.hはプラットフォームの標準的なmain()関数を「ハイジャック」しています。これは、プラットフォームによってメイン関数が異なり、C言語のmain()と互換性がないためです（例えば、WindowsのWinMainは全く異なる引数を持っています）。しかし、この「メインハイジャック」は、sokol_app.hをCやC++以外の言語と統合するような使用場面では問題がありました。そこで、ユーザーコードがプラットフォームのメイン関数を提供する、代替のSOKOL_NO_ENTRYモードが追加されています。

- sokol_app.hの実装をインクルードする前に、`SOKOL_NO_ENTRY`を定義する。
- sokol_main() 関数を提供しない。
- その代わり、プラットフォームの標準的な main() 関数を提供します。
- メイン関数から、 `sapp_desc` 構造体へのポインタを受け取る関数 `sapp_run()` を呼び出します。
- `sapp_run()` はコントロールを引き継ぎ、デフォルトモデルと同じように、提供された init-、frame-、shutdown-、イベントコールバックを呼び出します。アプリケーションが終了したときのみ、この関数が返されます (emscripten など、いくつかのプラットフォームでは全く返されません)

> 注：現在、SOKOL_NO_ENTRYはAndroidではサポートされていません。

## ウィンドウズコンソール出力

Windowsでは、通常のウィンドウズ・アプリケーションはstdout/stderrテキスト出力を表示しないので、printf()デバッグや一般的にコンソールへのテキストロギングには少々面倒なことがあります。また、コンソール出力はデフォルトでローカルのコードページ設定を使用するため、国際的なUTF-8でエンコードされたテキストはゴミとして出力されます。

これらの問題を解決するために、sokol_app.hは以下のWindows固有のsapp_descフラグによって、起動時に設定することができます。

`sapp_desc.win32_console_utf8` (default: false)

true を設定すると、出力コンソールのコードページを UTF-8 に切り替えます (終了時に元のコードページに戻ります)

`sapp_desc.win32_console_attach` (default: false)

trueに設定すると、stdoutとstderrは親プロセスのコンソールにアタッチされます（親プロセスに実際にコンソールがある場合）。つまり、アプリケーションがコマンドラインウィンドウで起動された場合、stdoutとstderrの出力は、通常のコマンドラインプログラムと同様に、ターミナルに出力されます。しかし、アプリケーションがダブルクリックで起動された場合は、通常のUIアプリケーションと同じように動作し、stdout/stderrは表示されません。

`sapp_desc.win32_console_create` (default: false)

trueに設定すると、新しいコンソールウィンドウが作成され、stdout/stderrはそのコンソールウィンドウにリダイレクトされます。アプリケーションをコマンドラインから起動するか、ダブルクリックで起動するかは関係ありません。

## メモリ割り当てオーバーライド

このように初期化時にメモリ割り当て関数をオーバーライドすることができます。

```c
void* my_alloc(size_t size, void* user_data) {
    return malloc(size);
}

void my_free(void* ptr, void* user_data) {
    free(ptr);
}

sapp_desc sokol_main(int argc, char* argv[]) {
    return (sapp_desc){
        // ...
        .allocator = {
            .alloc = my_alloc,
            .free = my_free,
            .user_data = ...,
        }
    };
}
```

オーバーライドが提供されない場合、malloc と free が使用されます。

しかし、これはsokol_app.h自身によって行われるメモリ割り当ての呼び出しにのみ影響し、OSライブラリでの割り当ては影響しません。


## ログ関数オーバーライド

このように初期化時にログ関数をオーバーライドすることができます。

```c
void my_log(const char* message, void* user_data) {
    printf("sapp says: \s\n", message);
}

sapp_desc sokol_main(int argc, char* argv[]) {
    return (sapp_desc){
        // ...
        .logger = {
            .log_cb = my_log,
            .user_data = ...,
        }
    };
}
```

オーバーライドが提供されない場合、ほとんどのプラットフォームでputsが使用されます。Android では、代わりに __android_log_write が使用されます。


## TEMP NOTE DUMP

- Androidのオンスクリーンキーボードサポートには、Javaが必要です :(,,気にする必要はないでしょうか？
- sapp_desc は，深度ステンシル表面を初期化するかどうかを表すブール値を必要とします．
- GLコンテキストの初期化はもっと制御する必要がある（少なくともどのGLバージョンを初期化するか）。
- アプリケーションアイコン
- Androidの実装では、遅くともonDestroyでcleanup_cb()を呼び出してeglコンテキストを破棄しますが、Android Honeycomb以降ではonStopの後にアプリが「killable」なので、onStopでもっと早く行うべきです（現時点では、onStop後にアプリが再び開始されることがあり、sokolライフサイクルではまだコンテキストのティアダウン/ブリングアップを処理できないため、実行できない）。


## LICENSE

zlib/libpng license

Copyright (c) 2018 Andre Weissflog

This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from the
use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

    1. The origin of this software must not be misrepresented; you must not
    claim that you wrote the original software. If you use this software in a
    product, an acknowledgment in the product documentation would be
    appreciated but is not required.

    2. Altered source versions must be plainly marked as such, and must not
    be misrepresented as being the original software.

    3. This notice may not be removed or altered from any source
    distribution.