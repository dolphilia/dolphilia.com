# GLFWウィンドウガイド（日本語訳）

[原文](https://www.glfw.org/docs/latest/window_guide.html)

このガイドでは，GLFWのウィンドウに関する機能を紹介します．このカテゴリの特定の機能の詳細については、ウィンドウのリファレンスを参照してください。また、GLFWの他の領域のガイドもあります。

- Introduction to the API
- Context guide
- Vulkan guide
- Monitor guide
- Input guide


## ウィンドウズ・オブジェクト

GLFWwindow オブジェクトは、ウィンドウとコンテキストの両方をカプセル化します。これらは glfwCreateWindow で生成され、glfwDestroyWindow または glfwTerminate で破棄されます（残っている場合）。ウィンドウとコンテキストは不可分にリンクされているので、オブジェクトポインタはコンテキストとウィンドウハンドルの両方として使用されます。

ウィンドウに関連する様々なコールバックに提供されるイベントストリームを見るには、イベント テスト プログラムを実行してください。


### ウィンドウの作成

ウィンドウとそのOpenGLまたはOpenGL ESコンテキストはglfwCreateWindowで作成され、作成されたウィンドウオブジェクトへのハンドルが返されます。例えば、これは640×480のウィンドウモードのウィンドウを作成します。

```c
GLFWwindow* window = glfwCreateWindow(640, 480, "My Title", NULL, NULL);
```

ウィンドウ作成に失敗した場合は NULL を返すので、戻り値の確認が必要である。

ウィンドウハンドルは、ウィンドウに関連するすべての関数に渡され、すべての入力イベントと一緒に提供されるので、イベントハンドラはどのウィンドウがそのイベントを受け取ったかを知ることができます。


#### フルスクリーンウィンドウ

フルスクリーンウィンドウを作成するには、そのウィンドウが使用するモニタを指定する必要があります。ほとんどの場合、ユーザーのプライマリモニタが良い選択です。モニタの取得について詳しくは、「モニタの取得」を参照してください。

```c
GLFWwindow* window = glfwCreateWindow(640, 480, "My Title", glfwGetPrimaryMonitor(), NULL);
```

フルスクリーンウィンドウは、モニターの表示領域全体をカバーし、ボーダーや装飾はありません。

ウィンドウモードのウィンドウは、glfwSetWindowMonitorでモニタを設定することでフルスクリーンにすることができ、同じ関数で設定を解除することでウィンドウにすることができます。

GLFWvidmode構造体の各フィールドは、関数パラメータまたはウィンドウヒントに対応し、組み合わせてそのウィンドウの希望するビデオモードを形成する。希望するビデオモードに最も近いサポートされているビデオモードが、ウィンドウに入力フォーカスがある限り、選択されたモニターに設定される。ビデオモードの取得に関する詳細については、ビデオモードを参照してください。

| Video mode field | Corresponds to |
| --- | --- |
| GLFWvidmode.width       | width parameter of glfwCreateWindow |
| GLFWvidmode.height      | height parameter of glfwCreateWindow |
| GLFWvidmode.redBits     | GLFW_RED_BITS hint |
| GLFWvidmode.greenBits   | GLFW_GREEN_BITS hint |
| GLFWvidmode.blueBits    | GLFW_BLUE_BITS hint |
| GLFWvidmode.refreshRate | GLFW_REFRESH_RATE hint |

いったんフルスクリーンウィンドウができたら、glfwSetWindowMonitor でその解像度、リフレッシュレート、モニタを変更することができます。もし、解像度だけを変更する必要があれば、glfwSetWindowSize を呼び出すこともできます。すべての場合において、新しいビデオモードは、glfwCreateWindowによって選択されたビデオモードと同じ方法で選択されます。ウィンドウがOpenGLまたはOpenGL ESのコンテキストを持っている場合、それは影響を受けません。

デフォルトでは、モニタの元のビデオモードが復元され、入力フォーカスを失うとウィンドウがアイコン化され、ユーザがデスクトップに戻ることができるようになります。この動作は GLFW_AUTO_ICONIFY window hint で無効にすることができる。例えば、同時に複数のモニターをフルスクリーンウィンドウで覆いたい場合などである。

モニターが切断された場合、そのモニター上でフルスクリーンになっているすべてのウィンドウはウィンドウモードに切り替わります。詳しくは、モニター設定の変更を参照してください。


#### "ウィンドウズ・フル・スクリーン "ウィンドウ

希望するビデオモードに最も近いものが現在のビデオモードである場合、ビデオモードは変更されないので、ウィンドウの作成が速くなり、アプリケーションの切り替えも非常にスムーズになります。これは、ウィンドウ付きフルスクリーンまたはボーダーレスフルスクリーンウィンドウと呼ばれることもあり、フルスクリーンウィンドウとしてカウントされます。このようなウィンドウを作成するには、現在のビデオモードを要求します。

```c
const GLFWvidmode* mode = glfwGetVideoMode(monitor);
 
glfwWindowHint(GLFW_RED_BITS, mode->redBits);
glfwWindowHint(GLFW_GREEN_BITS, mode->greenBits);
glfwWindowHint(GLFW_BLUE_BITS, mode->blueBits);
glfwWindowHint(GLFW_REFRESH_RATE, mode->refreshRate);
 
GLFWwindow* window = glfwCreateWindow(mode->width, mode->height, "My Title", monitor, NULL);
```

This also works for windowed mode windows that are made full screen.

```c
const GLFWvidmode* mode = glfwGetVideoMode(monitor);
 
glfwSetWindowMonitor(window, monitor, 0, 0, mode->width, mode->height, mode->refreshRate);
```

glfwGetVideoModeは、モニタの現在のビデオモードを返すので、そのモニタに既にフルスクリーンウィンドウがあり、それをウィンドウズフルスクリーンにしたい場合、デスクトップの解像度を事前に保存しておく必要があることに注意してください。


### ウィンドウの破棄

ウィンドウが不要になったら、glfwDestroyWindowで破棄してください。

```c
glfwDestroyWindow(window);
```

ウィンドウの破棄は常に成功します。実際の破壊の前に、すべてのコールバックは削除され、ウィンドウのために配信されるそれ以降のイベントはありません。glfwTerminate が呼び出されたときに残っているすべてのウィンドウも同様に破棄されます。

フルスクリーン ウィンドウが破壊されると、そのモニタの元のビデオ モードが復元されますが、ガンマ ランプはそのまま残されます。


### ウィンドウ作成のヒント

ウィンドウやコンテキストを作成する前に設定できるヒントがいくつかあります。いくつかはウィンドウ自体に影響し、その他はフレームバッファやコンテキストに影響します。これらのヒントは、ライブラリが glfwInit で初期化されるたびにデフォルト値に設定されます。整数値のヒントはglfwWindowHintで、文字列値のヒントはglfwWindowHintStringで、それぞれ個別に設定することができます。glfwDefaultWindowHintsを使用すると、すべてを一度にデフォルトに戻すことができます。

いくつかのヒントはプラットフォーム固有です。これらは、どのプラットフォームでも常に有効ですが、特定のプラットフォームにのみ影響します。他のプラットフォームでは無視されます。これらのヒントを設定するために、プラットフォーム固有のヘッダや呼び出しは必要ありません。

> ウィンドウヒントは、指定された属性を持ちたいウィンドウとコンテキストを作成する前に設定する必要があります。これらは glfwCreateWindow への追加引数として機能します。


#### ハードとソフトの制約

いくつかのウィンドウヒントはハード制約です。これらは、ウィンドウとコンテキストの作成が成功するために、利用可能な機能に正確に一致する必要があります。ハード制約でないヒントは可能な限り一致させますが、結果のコンテキストとフレームバッファはこれらのヒントが要求したものと異なる場合があります。

以下のヒントは常にハード制約である。

- GLFW_STEREO
- GLFW_DOUBLEBUFFER
- GLFW_CLIENT_API
- GLFW_CONTEXT_CREATION_API

以下の追加ヒントは、OpenGLコンテキストの要求時にはハード制約となるが、OpenGL ESコンテキストの要求時には無視される。

- GLFW_OPENGL_FORWARD_COMPAT
- GLFW_OPENGL_PROFILE

#### ウィンドウに関するヒント

GLFW_RESIZABLE ウィンドウモードのウィンドウをユーザがサイズ変更できるかどうかを指定します。ウィンドウは、glfwSetWindowSize 関数を使用してもサイズ変更可能です。指定可能な値は GLFW_TRUE と GLFW_FALSE である。このヒントは、フルスクリーンと非装飾ウィンドウでは無視されます。

GLFW_VISIBLE は、ウィンドウモードのウィンドウを初期状態で表示するかどうかを指定する。指定可能な値は GLFW_TRUE および GLFW_FALSE である。このヒントは、フルスクリーンウィンドウでは無視される。

GLFW_DECORATED は、ウィンドウモードのウィンドウがボーダーやクローズウィジェットなどのウィンドウ装飾を持つかどうかを指定します。装飾がないウィンドウは、ユーザーがサイズを変更することはできないが、 いくつかのプラットフォームではクローズイベントを発生させることができる。使用可能な値は GLFW_TRUE と GLFW_FALSE である。このヒントは、フルスクリーンウィンドウでは無視される。

GLFW_FOCUSED ウィンドウモードのウィンドウを作成する際に、入力フォーカスを与えるかどうかを指定する。指定可能な値は GLFW_TRUE および GLFW_FALSE である。このヒントは、フルスクリーンおよび初期状態で非表示になっているウィンドウでは無視される。

GLFW_AUTO_ICONIFY は、入力フォーカスが失われたときに、フルスクリーンウィンドウが自動的にアイコン化され、以前のビデオモードに戻るかどうかを指定する。指定可能な値は GLFW_TRUE および GLFW_FALSE です。このヒントは、ウィンドウモードのウィンドウでは無視されます。

GLFW_FLOATING は、ウィンドウモードウィンドウを他の通常ウィンドウの上に浮かせるかどうかを指定します（topmost または always-on-top とも呼ばれます）。これは主にデバッグのためのものであり、フルスクリーンウィンドウを実装するためには使用できない。使用可能な値は GLFW_TRUE と GLFW_FALSE である。このヒントは、フルスクリーンウィンドウでは無視される。

GLFW_MAXIMIZED は、ウィンドウモードのウィンドウを作成するときに最大化するかどうかを指定する。指定可能な値は GLFW_TRUE および GLFW_FALSE である。このヒントは、フルスクリーンウィンドウでは無視される。

GLFW_CENTER_CURSOR は、新しく作成されたフルスクリーンウィンドウの上でカーソルを中央に配置するかどうかを指定する。指定可能な値は GLFW_TRUE および GLFW_FALSE である。このヒントは、ウィンドウモードのウィンドウでは無視されます。

GLFW_TRANSPARENT_FRAMEBUFFER は、ウィンドウフレームバッファを透明にするかどうかを指定します。有効でシステムがサポートしている場合、ウィンドウフレームバッファのアルファチャンネルは、フレームバッファと背景を結合するために使用されます。これはウィンドウの装飾には影響しない。指定可能な値は GLFW_TRUE および GLFW_FALSE である。

GLFW_FOCUS_ON_SHOW glfwShowWindowが呼ばれたとき、ウィンドウに入力フォーカスを与えるかどうかを指定します。指定可能な値は GLFW_TRUE および GLFW_FALSE です。

GLFW_SCALE_TO_MONITOR ウィンドウの内容領域が、それが配置される任意のモニタのモニタ内容尺度に基づいてサイズ変更されるべきかどうかを指定します。これは、ウィンドウが作成されたときの初期配置を含む。指定可能な値は GLFW_TRUE と GLFW_FALSE である。

このヒントは、Windows や X11 など、画面座標とピクセルが常に 1:1 で対応するプラットフォームでのみ効果を発揮します。macOS のようなプラットフォームでは、フレームバッファの解像度はウィンドウサイズとは無関係に変更されます。


#### フレームバッファ関連ヒント

GLFW_RED_BITS, GLFW_GREEN_BITS, GLFW_BLUE_BITS, GLFW_ALPHA_BITS, GLFW_DEPTH_BITS and GLFW_STENCIL_BITS デフォルトフレームバッファの様々な構成要素の希望するビット深度を指定する。GLFW_DONT_CARE の値は、アプリケーションに優先権がないことを意味する。

GLFW_ACCUM_RED_BITS, GLFW_ACCUM_GREEN_BITS, GLFW_ACCUM_BLUE_BITS and GLFW_ACCUM_ALPHA_BITS 蓄積バッファの様々な構成要素の希望するビット深度を指定する。GLFW_DONT_CAREの値は、アプリケーションに優先権がないことを意味する。

アキュムレーションバッファはOpenGLのレガシー機能であり、新しいコードで使用するべきではありません。

GLFW_AUX_BUFFERS は、希望する補助バッファの数を指定する。GLFW_DONT_CAREの値は、アプリケーションに優先権がないことを意味する。

補助バッファはOpenGLのレガシー機能であり、新しいコードで使用するべきではありません。

GLFW_STEREO は、OpenGLステレオスコピックレンダリングを使用するかどうかを指定する。指定可能な値は GLFW_TRUE および GLFW_FALSE である。これはハード制約である。

GLFW_SAMPLES は、マルチサンプリングに使用するサンプル数を指定します。0はマルチサンプリングを無効とする。GLFW_DONT_CAREの値は、アプリケーションに優先権がないことを意味する。

GLFW_SRGB_CAPABLE は、フレームバッファを sRGB 対応にするかどうかを指定します。指定可能な値は GLFW_TRUE および GLFW_FALSE である。

> OpenGL: GL_FRAMEBUFFER_SRGB enableは、システムでサポートされている場合、sRGBレンダリングを制御する。デフォルトでは、sRGBレンダリングは無効である。
> OpenGL ES: システムでサポートされている場合、コンテキストは常にsRGBレンダリングが有効になっています。

GLFW_DOUBLEBUFFER は、フレームバッファをダブルバッファにするかどうかを指定します。ほぼ常にダブルバッファリングを使用したい。これはハード的な制約である。指定可能な値は GLFW_TRUE および GLFW_FALSE である。


#### モニター関連ヒント

GLFW_REFRESH_RATE フルスクリーンウィンドウに必要なリフレッシュレートを指定する。GLFW_DONT_CAREの値は、利用可能な最も高いリフレッシュレートが使用されることを意味する。このヒントは、ウィンドウモードのウィンドウでは無視される。


#### コンテキストに関するヒント

GLFW_CLIENT_API は、どのクライアント API に対してコンテキストを作成するかを指定します。指定できる値は GLFW_OPENGL_API、GLFW_OPENGL_ES_API および GLFW_NO_API です。これはハード制約である。

GLFW_CONTEXT_CREATION_API は、コンテキストの作成に使用する API を指定します。指定可能な値は GLFW_NATIVE_CONTEXT_API, GLFW_EGL_CONTEXT_API, GLFW_OSMESA_CONTEXT_API です。これはハードな制約です。クライアントAPIが要求されない場合、このヒントは無視される。

現在のコンテキストを作成するために使用された API を知っていると仮定している拡張ローダライブラリは、 このヒントを変更すると失敗する可能性があります。これは、glfwGetProcAddress を使って関数をロードさせることで解決できます。

> Wayland: EGL APIはネイティブのコンテキスト作成APIであるため、このヒントは何の効果もない。
> X11: 一部のLinuxシステムでは、1つのプロセスでネイティブAPIとEGL APIの両方を使用してコンテキストを作成すると、アプリケーションのセグメンテーションが発生します。Linuxでは、今のところ、どちらかのAPIを使うようにしてください。
> OSMesa: その名前が示すように、OSMesaで作成されたOpenGLコンテキストは、そのバッファがスワップされたときにウィンドウの内容を更新しません。フレームバッファの内容を取得するには、OpenGL関数またはOSMesaのネイティブアクセス関数glfwGetOSMesaColorBufferとglfwGetOSMesaDepthBufferを使用します。

GLFW_CONTEXT_VERSION_MAJOR and GLFW_CONTEXT_VERSION_MINOR は、作成されるコンテキストが互換性を持たなければならないクライアントAPIのバージョンを指定します。これらのヒントの正確な動作は、要求されたクライアント API に依存します。

サポートされている最高バージョンのコンテキストをドライバに要求する方法はありませんが、GLFWは、これらのヒントのデフォルトであるバージョン1.0のコンテキストを要求したときに、これを提供しようと試みます。

これらのヒントを GLFW_VERSION_MAJOR および GLFW_VERSION_MINOR と混同しないでください。

> OpenGL: これらのヒントはハード的な制約ではありませんが、作成されたコンテキストのOpenGLバージョンが要求されたものよりも小さい場合、作成は失敗します。したがって、レガシーコードにはバージョン 1.0 のデフォルトを使用してもまったく問題ありませんし、バージョン 3.0 以上の下位互換性のあるコンテキストが利用可能な場合は、それを使用することもできます。
> OpenGL ES: これらのヒントはハード的な制約ではありませんが、作成されたコンテキストのOpenGL ESバージョンが要求されたものよりも低い場合、作成は失敗します。さらに、2.0以降が要求された場合、OpenGL ES 1.xを返すことはできませんし、その逆もまた然りです。これは、OpenGL ES 3.xは2.0と後方互換性がありますが、OpenGL ES 2.0は1.xと後方互換性がないためです。
> macOS: OS は、OpenGL バージョン 3.2 以降の前方互換性のあるコアプロファイルコンテキストのみをサポートします。バージョン 3.2 以降の OpenGL コンテキストを作成する前に、GLFW_OPENGL_FORWARD_COMPAT と GLFW_OPENGL_PROFILE ヒントをそれに応じて設定する必要があります。OpenGL 3.0 と 3.1 のコンテキストは、macOS では全くサポートされていません。

GLFW_OPENGL_FORWARD_COMPAT は、OpenGL コンテキストが前方互換性を持つかどうかを指定します。これは、要求されたOpenGLのバージョンが3.0以上の場合にのみ使用する必要があります。OpenGL ESが要求された場合、このヒントは無視されます。

前方互換性については、OpenGLリファレンスマニュアルで詳しく説明されています。

GLFW_OPENGL_DEBUG_CONTEXT は、コンテキストをデバッグモードで作成するかどうかを指定します。 これにより、エラーや診断の報告機能が追加されることがあります。使用可能な値は GLFW_TRUE および GLFW_FALSE です。

OpenGLおよびOpenGL ESのデバッグコンテキストは、GL_KHR_debug拡張によって詳細に記述されています。

GLFW_OPENGL_PROFILE どのOpenGLプロファイルのコンテキストを作成するかを指定します。可能な値は GLFW_OPENGL_CORE_PROFILE または GLFW_OPENGL_COMPAT_PROFILE のいずれか、あるいは特定のプロファイルを要求しない場合は GLFW_OPENGL_ANY_PROFILE となる。3.2以下のOpenGLバージョンを要求する場合、GLFW_OPENGL_ANY_PROFILEを使用しなければならない。OpenGL ESが要求された場合、このヒントは無視される。

OpenGLプロファイルについては、OpenGLリファレンスマニュアルで詳しく説明されています。

GLFW_CONTEXT_ROBUSTNESS は、コンテキストが使用する堅牢性戦略を指定する。GLFW_NO_RESET_NOTIFICATION あるいは GLFW_LOSE_CONTEXT_ON_RESET のいずれか、 あるいは GLFW_NO_ROBUSTNESS で堅牢性の戦略を要求しないものとすることが可能である。

GLFW_CONTEXT_RELEASE_BEHAVIOR は、コンテキストが使用するリリース動作を指定します。指定できる値は GLFW_ANY_RELEASE_BEHAVIOR、 GLFW_RELEASE_BEHAVIOR_FLUSH あるいは GLFW_RELEASE_BEHAVIOR_NONE のいずれかである。動作が GLFW_ANY_RELEASE_BEHAVIOR の場合、コンテキスト作成 API のデフォルトの動作が使用される。GLFW_RELEASE_BEHAVIOR_FLUSH を指定すると、現在のコンテキストから解放されるたびにパイプラインがフラッシュされます。GLFW_RELEASE_BEHAVIOR_NONE を指定すると、パイプラインは解放時にフラッシュされません。

コンテキスト解放の動作は，GL_KHR_context_flush_control 拡張で詳細に記述されています．

GLFW_CONTEXT_NO_ERROR は、コンテキストによってエラーを発生させるかどうかを指定する。指定可能な値は GLFW_TRUE および GLFW_FALSE である。有効にすると、エラーが発生するような状況では、代わりに未定義の動作が発生する。

OpenGLおよびOpenGL ESのエラー無しモードは、GL_KHR_no_error拡張で詳細に記述されています。


#### macOS固有のウィンドウのヒント

GLFW_COCOA_RETINA_FRAMEBUFFER は、Retinaディスプレイ上でフル解像度フレームバッファを使用するかどうかを指定します。使用可能な値は GLFW_TRUE および GLFW_FALSE です。これは他のプラットフォームでは無視される。

GLFW_COCOA_FRAME_NAME は、ウィンドウフレームの自動保存に使用するUTF-8エンコード名を指定し、空の場合はウィンドウのフレームの自動保存を無効にします。これは、他のプラットフォームでは無視されます。これは、glfwWindowHintStringで設定されます。

GLFW_COCOA_GRAPHICS_SWITCHING は、Automatic Graphics Switching、つまり、システムが OpenGL コンテキスト用に統合 GPU を選択し、必要に応じて GPU 間を移動することを許可するか、または、常にディスクリート GPU で実行することを強制するかを指定します。これは、統合GPUとディスクリートGPUの両方を持つシステムのみに影響します。使用可能な値は GLFW_TRUE および GLFW_FALSE です。他のプラットフォームでは、これは無視されます。

シンプルなプログラムやツールでは、この機能を有効にして電力を節約することができますが、ゲームや高度なレンダリングを行うその他のアプリケーションでは、無効にしておくとよいでしょう。

自動グラフィックス切り替えに参加したいバンドルアプリケーションは、そのInfo.plistでNSSupportsAutomaticGraphicsSwitchingキーをtrueに設定して、これを宣言する必要もあります。

#### X11 スペシャルウィンドウヒント

GLFW_X11_CLASS_NAME and GLFW_X11_INSTANCE_NAME は、ICCCM WM_CLASSウィンドウプロパティのクラス部とインスタンス部をASCIIエンコードしたものを指定する。これらは、glfwWindowHintStringで設定される。

#### Supported and default values

Window hint	Default value	Supported values
GLFW_RESIZABLE	GLFW_TRUE	GLFW_TRUE or GLFW_FALSE
GLFW_VISIBLE	GLFW_TRUE	GLFW_TRUE or GLFW_FALSE
GLFW_DECORATED	GLFW_TRUE	GLFW_TRUE or GLFW_FALSE
GLFW_FOCUSED	GLFW_TRUE	GLFW_TRUE or GLFW_FALSE
GLFW_AUTO_ICONIFY	GLFW_TRUE	GLFW_TRUE or GLFW_FALSE
GLFW_FLOATING	GLFW_FALSE	GLFW_TRUE or GLFW_FALSE
GLFW_MAXIMIZED	GLFW_FALSE	GLFW_TRUE or GLFW_FALSE
GLFW_CENTER_CURSOR	GLFW_TRUE	GLFW_TRUE or GLFW_FALSE
GLFW_TRANSPARENT_FRAMEBUFFER	GLFW_FALSE	GLFW_TRUE or GLFW_FALSE
GLFW_FOCUS_ON_SHOW	GLFW_TRUE	GLFW_TRUE or GLFW_FALSE
GLFW_SCALE_TO_MONITOR	GLFW_FALSE	GLFW_TRUE or GLFW_FALSE
GLFW_RED_BITS	8	0 to INT_MAX or GLFW_DONT_CARE
GLFW_GREEN_BITS	8	0 to INT_MAX or GLFW_DONT_CARE
GLFW_BLUE_BITS	8	0 to INT_MAX or GLFW_DONT_CARE
GLFW_ALPHA_BITS	8	0 to INT_MAX or GLFW_DONT_CARE
GLFW_DEPTH_BITS	24	0 to INT_MAX or GLFW_DONT_CARE
GLFW_STENCIL_BITS	8	0 to INT_MAX or GLFW_DONT_CARE
GLFW_ACCUM_RED_BITS	0	0 to INT_MAX or GLFW_DONT_CARE
GLFW_ACCUM_GREEN_BITS	0	0 to INT_MAX or GLFW_DONT_CARE
GLFW_ACCUM_BLUE_BITS	0	0 to INT_MAX or GLFW_DONT_CARE
GLFW_ACCUM_ALPHA_BITS	0	0 to INT_MAX or GLFW_DONT_CARE
GLFW_AUX_BUFFERS	0	0 to INT_MAX or GLFW_DONT_CARE
GLFW_SAMPLES	0	0 to INT_MAX or GLFW_DONT_CARE
GLFW_REFRESH_RATE	GLFW_DONT_CARE	0 to INT_MAX or GLFW_DONT_CARE
GLFW_STEREO	GLFW_FALSE	GLFW_TRUE or GLFW_FALSE
GLFW_SRGB_CAPABLE	GLFW_FALSE	GLFW_TRUE or GLFW_FALSE
GLFW_DOUBLEBUFFER	GLFW_TRUE	GLFW_TRUE or GLFW_FALSE
GLFW_CLIENT_API	GLFW_OPENGL_API	GLFW_OPENGL_API, GLFW_OPENGL_ES_API or GLFW_NO_API
GLFW_CONTEXT_CREATION_API	GLFW_NATIVE_CONTEXT_API	GLFW_NATIVE_CONTEXT_API, GLFW_EGL_CONTEXT_API or GLFW_OSMESA_CONTEXT_API
GLFW_CONTEXT_VERSION_MAJOR	1	Any valid major version number of the chosen client API
GLFW_CONTEXT_VERSION_MINOR	0	Any valid minor version number of the chosen client API
GLFW_CONTEXT_ROBUSTNESS	GLFW_NO_ROBUSTNESS	GLFW_NO_ROBUSTNESS, GLFW_NO_RESET_NOTIFICATION or GLFW_LOSE_CONTEXT_ON_RESET
GLFW_CONTEXT_RELEASE_BEHAVIOR	GLFW_ANY_RELEASE_BEHAVIOR	GLFW_ANY_RELEASE_BEHAVIOR, GLFW_RELEASE_BEHAVIOR_FLUSH or GLFW_RELEASE_BEHAVIOR_NONE
GLFW_OPENGL_FORWARD_COMPAT	GLFW_FALSE	GLFW_TRUE or GLFW_FALSE
GLFW_OPENGL_DEBUG_CONTEXT	GLFW_FALSE	GLFW_TRUE or GLFW_FALSE
GLFW_OPENGL_PROFILE	GLFW_OPENGL_ANY_PROFILE	GLFW_OPENGL_ANY_PROFILE, GLFW_OPENGL_COMPAT_PROFILE or GLFW_OPENGL_CORE_PROFILE
GLFW_COCOA_RETINA_FRAMEBUFFER	GLFW_TRUE	GLFW_TRUE or GLFW_FALSE
GLFW_COCOA_FRAME_NAME	""	A UTF-8 encoded frame autosave name
GLFW_COCOA_GRAPHICS_SWITCHING	GLFW_FALSE	GLFW_TRUE or GLFW_FALSE
GLFW_X11_CLASS_NAME	""	An ASCII encoded WM_CLASS class name
GLFW_X11_INSTANCE_NAME	""	An ASCII encoded WM_CLASS instance name

## ウィンドウのイベント処理

イベント処理を参照してください。

## ウィンドウのプロパティとイベント

### ユーザーポインタ

各ウィンドウは、glfwSetWindowUserPointer で設定し、glfwGetWindowUserPointer で問い合わせることができるユーザポインタをもっています。これは必要な目的に使用することができ，ウィンドウの寿命が尽きるまで GLFWによって変更されることはありません．

ポインタの初期値はNULLです．

### ウィンドウのクローズ方法とクローズフラグ

ユーザがウィンドウを閉じようとしたとき、例えば、閉じるウィジェットをクリックするか、Alt+F4のようなキーコードを使用すると、ウィンドウの閉じるフラグが設定されます。しかし、ウィンドウは実際には破棄されず、この状態の変化を監視しない限り、それ以上何も起こりません。

クローズフラグの現在の状態はglfwWindowShouldCloseによって返され、glfwSetWindowShouldCloseで直接設定または解除できます。よくあるパターンは、メインループの条件としてクローズフラグを使用することです。

```c
while (!glfwWindowShouldClose(window))
{
    render(window);
 
    glfwSwapBuffers(window);
    glfwPollEvents();
}
```

ユーザーがウィンドウを閉じようとしたときに通知を受けたい場合は、closeコールバックを設定します。

```c
glfwSetWindowCloseCallback(window, window_close_callback);
```

コールバック関数は、クローズフラグが設定された後に直接呼び出されます。例えば、close リクエストをフィルタリングし、特定の条件が満たされない限り close フラグを再びクリアするために使用することができる。

```c
void window_close_callback(GLFWwindow* window)
{
    if (!time_to_close)
        glfwSetWindowShouldClose(window, GLFW_FALSE);
}
```

### ウィンドウのサイズ

ウィンドウのサイズは glfwSetWindowSize で変更することができます。ウィンドウモードのウィンドウの場合、これはウィンドウのコンテンツ領域またはコンテンツ領域のサイズをスクリーン座標で設定します。ウィンドウシステムは、ウィンドウサイズに制限を課すことがあります。

```c
glfwSetWindowSize(window, 640, 480);
```

フルスクリーンウィンドウの場合、指定されたサイズはウィンドウの希望するビデオモードの新しい解像度となる。新しい希望するビデオモードに最も近いビデオモードが直ちに設定される。ウィンドウは、設定されたビデオモードの解像度に合うようにサイズが変更される。

ユーザー、システム、または独自のコードによってウィンドウのサイズが変更されたときに通知を受けたい場合は、サイズ コールバックを設定します。

```c
glfwSetWindowSizeCallback(window, window_size_callback);
```

コールバック関数は、ウィンドウのサイズ変更時に、ウィンドウのコンテンツ領域の新しいサイズをスクリーン座標で受け取る。

```c
void window_size_callback(GLFWwindow* window, int width, int height)
{
}
```

また、ウィンドウの現在のサイズを直接取得するためのglfwGetWindowSizeもあります。

```c
int width, height;
glfwGetWindowSize(window, &width, &height);
```

> glViewportや他のピクセルベースのOpenGL呼び出しにウィンドウサイズを渡さないでください。ウィンドウサイズはスクリーン座標であり、ピクセルではありません。ピクセルベースの呼び出しには、ピクセル単位であるフレームバッファサイズを使用します。

上記の関数はコンテントエリアのサイズで動作しますが、装飾されたウィンドウは通常この矩形の周りにタイトルバーとウィンドウフレームを持ちます。これらの領域は glfwGetWindowFrameSize で取得することができます。

```c
int left, top, right, bottom;
glfwGetWindowFrameSize(window, &left, &top, &right, &bottom);
```

返される値は、スクリーン座標で、コンテンツ領域の端からフルウィンドウの対応する端までの距離である。座標ではなく距離であるため、常に0または正の値である。


### フレームバッファサイズ

ウィンドウの大きさはスクリーン座標で測定されますが、OpenGLはピクセルで動作します。例えば、glViewportに渡すサイズはピクセルであるべきです。あるマシンではスクリーン座標とピクセルが同じですが、他のマシンでは同じではありません。ウィンドウのフレームバッファのサイズをピクセル単位で取得するための関数がもう1つあります。

もし、ウィンドウのフレームバッファのサイズがユーザーやシステムによって変更されたときに通知を受けたい場合は、サイズコールバックを設定します。

```c
glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);
```

コールバック関数は、フレームバッファのサイズ変更時に新しいサイズを受け取り、例えばOpenGLのビューポートを更新するために使用することができます。

```c
void framebuffer_size_callback(GLFWwindow* window, int width, int height)
{
    glViewport(0, 0, width, height);
}
```

また、ウィンドウのフレームバッファの現在のサイズを直接取得するためのglfwGetFramebufferSizeもあります。

```c
int width, height;
glfwGetFramebufferSize(window, &width, &height);
glViewport(0, 0, width, height);
```

フレームバッファのサイズは、ウィンドウのサイズとは無関係に変化することがあります。例えば、ウィンドウを通常のモニタと高DPIのモニタの間でドラッグした場合などです。


### ウィンドウの表示倍率

ウィンドウのコンテンツスケールはglfwGetWindowContentScaleで取得することができます。

```c
float xscale, yscale;
glfwGetWindowContentScale(window, &xscale, &yscale);
```

コンテンツスケールは、現在のDPIとプラットフォームのデフォルトDPIとの比率です。これは、テキストやUI要素で特に重要です。この比率でスケーリングされたUIのピクセル寸法があなたのマシンで適切に見えるなら、他のマシンではDPIやスケーリング設定に関係なく、妥当な大きさで表示されるはずです。これは、システムのDPIとスケーリング設定がある程度正しいことが前提になります。

各モニターが独自のコンテンツスケールを持つことができるシステムでは、ウィンドウのコンテンツスケールは、システムがウィンドウをどのモニター上にあると見なすかに依存します。

システム設定の変更または異なるスケールのモニタに移動したために、ウィンドウのコンテンツスケールが変更されたときに通知を受けたい場合、コンテンツスケールコールバックを設定します。

```c
glfwSetWindowContentScaleCallback(window, window_content_scale_callback);
```

コールバック関数は、ウィンドウの新しいコンテンツスケールを受け取ります。

```c
void window_content_scale_callback(GLFWwindow* window, float xscale, float yscale)
{
    set_interface_scale(xscale, yscale);
}
```

ピクセルとスクリーン座標が常に1:1に対応するプラットフォームでは、ウィンドウは異なるコンテンツスケールのモニターに移動したときに同じサイズに見えるようにリサイズされる必要がある。ウィンドウの作成時とコンテンツスケールの変更時の両方で自動的にこれを行うには、GLFW_SCALE_TO_MONITOR ウィンドウヒントを設定する。


### ウィンドウサイズ制限

ウィンドウモードのウィンドウの最小および最大サイズは、glfwSetWindowSizeLimitsによって強制することができます。アスペクト比が設定されていない限り、ユーザは指定された制限内の任意のサイズとアスペクト比にウィンドウをリサイズすることができます。

```c
glfwSetWindowSizeLimits(window, 200, 200, 400, 400);
```

最小サイズのみ、あるいは最大サイズのみを指定する場合は、もう一方のペアをGLFW_DONT_CAREに設定する。

```c
glfwSetWindowSizeLimits(window, 640, 480, GLFW_DONT_CARE, GLFW_DONT_CARE);
```

ウィンドウのサイズ制限を無効にするには、すべてをGLFW_DONT_CAREに設定します。

ウィンドウモード・ウィンドウのコンテンツ領域のアスペクト比は、 glfwSetWindowAspectRatioで強制することができる。サイズ制限が設定されていない限り、ユーザーはウィンドウのサイズを自由に変更することができますが、サイズはアスペクト比を維持するために制限されます。

```c
glfwSetWindowAspectRatio(window, 16, 9);
```

アスペクト比は、幅と高さにそれぞれ対応する分子と分母で指定します。ウィンドウのアスペクト比を維持したい場合は、現在のサイズを比率として使用します。

```c
int width, height;
glfwGetWindowSize(window, &width, &height);
glfwSetWindowAspectRatio(window, width, height);
```

ウィンドウのアスペクト比制限を無効にするには、両方の条件をGLFW_DONT_CAREに設定する。

ウィンドウのサイズ制限とアスペクト比の両方を設定することができるが、それらが衝突した場合、結果は不定である。

### ウィンドウの位置

ウィンドウモードのウィンドウの位置は、glfwSetWindowPosで変更することができます。これは、ウィンドウの内容領域の左上隅が、指定されたスクリーン座標になるようにウィンドウを移動します。ウィンドウシステムは、ウィンドウの配置に制限を加えるかもしれません。

```C
glfwSetWindowPos(window, 100, 100);
```

ユーザー、システム、または独自のコードによってウィンドウが移動されたときに通知を受けたい場合は、位置コールバックを設定します。

```c
glfwSetWindowPosCallback(window, window_pos_callback);
```

コールバック関数は、ウィンドウを移動したときのコンテンツ領域の左上隅の新しい位置をスクリーン座標で受け取る。

```c
void window_pos_callback(GLFWwindow* window, int xpos, int ypos)
{
}
```

また、ウィンドウのコンテンツ領域の現在位置を直接取得するためのglfwGetWindowPosもあります。

```c
int xpos, ypos;
glfwGetWindowPos(window, &xpos, &ypos);
```

### ウィンドウのタイトル

すべてのGLFWウィンドウはタイトルを持ちますが、装飾されていないウィンドウやフルスクリーンウィンドウはタイトルを表示しないか、タスクバーや同様のインターフェイスにのみ表示することができます。glfwSetWindowTitleでUTF-8エンコードされたウィンドウのタイトルを設定することができます。

```c
glfwSetWindowTitle(window, "My Window");
```

指定された文字列は、関数が戻る前にコピーされるので、それを保持する必要はない。

ソースファイルがUTF-8でエンコードされている限り、ソース内で任意のUnicode文字を直接使用することができます。

```c
glfwSetWindowTitle(window, "ラストエグザイル");
```

C++11、C11をお使いの場合は、UTF-8文字列リテラルを使用することができます。

```c
glfwSetWindowTitle(window, u8"This is always a UTF-8 string");
```


### ウィンドウのアイコン

一部のプラットフォームでは、装飾されたウィンドウにはアイコンが表示されます。glfwSetWindowIconで候補画像のリストを指定することで、このアイコンを設定することができます。

```c
GLFWimage images[2];
images[0] = load_icon("my_icon.png");
images[1] = load_icon("my_icon_small.png");

glfwSetWindowIcon(window, 2, images);
```

画像データは32ビット，リトルエンディアン，非前乗算のRGBA，すなわち各チャンネル8ビットで，赤チャンネルが先にある。画素は左上から順番に正規の列として配置される。

デフォルトのウィンドウアイコンに戻すには、空の画像配列を渡します。

```c
glfwSetWindowIcon(window, 0, NULL);
```


### ウィンドウズ・モニター

フルスクリーンウィンドウは、特定のモニタに関連付けられます。glfwGetWindowMonitorでこのモニタのハンドルを取得することができます。

```c
GLFWmonitor* monitor = glfwGetWindowMonitor(window);
```

このモニターハンドルは、glfwGetMonitors によって返されるもののうちの 1 つです。

ウィンドウモードのウィンドウの場合、この関数はNULLを返します。これは、フルスクリーンウィンドウとウィンドウドモードウィンドウを区別する方法です。

glfwSetWindowMonitorを使用すると、モニタ間やフルスクリーンとウィンドウモードの間でウィンドウを移動することができます。同じモニタまたは別のモニタでウィンドウをフルスクリーンにする場合、希望するモニタ、解像度、リフレッシュレートを指定します。位置の引数は無視されます。

```c
const GLFWvidmode* mode = glfwGetVideoMode(monitor);
 
glfwSetWindowMonitor(window, monitor, 0, 0, mode->width, mode->height, mode->refreshRate);
```

ウィンドウ化する場合は、任意の位置と大きさを指定する。引数のリフレッシュレートは無視される。

```c
glfwSetWindowMonitor(window, NULL, xpos, ypos, width, height, 0);
```

これにより、装飾、フローティング、サイズ変更、サイズやアスペクト比の制限など、以前のウィンドウの設定が復元されます。元々ウィンドウであったものを元のサイズと位置に戻すには、フルスクリーンにする前にこれらを保存し、上記のように渡します。

### ウィンドウのアイコン化

glfwIconifyWindowでウィンドウをアイコン化(最小化)することができます。

```c
glfwIconifyWindow(window);
```

フルスクリーンウィンドウがアイコン化されると、ユーザーまたはアプリケーションがウィンドウを復元するまで、そのモニタの元のビデオモードが復元されます。

アイコン化されたウィンドウは、glfwRestoreWindowで復元することができます。この関数は、ウィンドウを最大化した状態から復元することもできます。

```c
glfwRestoreWindow(window);
```

フルスクリーンウィンドウが復元されると、そのモニターにも希望のビデオモードが復元されます。

ユーザー、システム、または独自のコードによってウィンドウがアイコン化または復元されたときに通知を受けたい場合は、iconifyコールバックを設定します。

```c
glfwSetWindowIconifyCallback(window, window_iconify_callback);
```

コールバック関数は、ウィンドウのアイコン化状態の変化を受け取ります。

```c
void window_iconify_callback(GLFWwindow* window, int iconified)
{
    if (iconified)
    {
        // The window was iconified
    }
    else
    {
        // The window was restored
    }
}
```

また、glfwGetWindowAttribで現在のアイコン化状態を取得することができます。

```c
int iconified = glfwGetWindowAttrib(window, GLFW_ICONIFIED);
```


### ウィンドウの最大化

glfwMaximizeWindowにより、ウィンドウを最大化（ズーム）することができます。

```c
glfwMaximizeWindow(window);
```

フルスクリーンウィンドウは最大化できないので、この関数にフルスクリーンウィンドウを渡しても何も起こりません。

最大化されたウィンドウは、glfwRestoreWindowで復元することができます。この関数はアイコン化されたウィンドウも復元します。

```c
glfwRestoreWindow(window);
```

ユーザー、システム、または独自のコードによってウィンドウが最大化または復元されたときに通知を受けたい場合は、最大化コールバックを設定します。

```c
glfwSetWindowMaximizeCallback(window, window_maximize_callback);
```

コールバック関数は、ウィンドウの最大化状態の変化を受け取ります。

```c
void window_maximize_callback(GLFWwindow* window, int maximized)
{
    if (maximized)
    {
        // The window was maximized
    }
    else
    {
        // The window was restored
    }
}
```

また、glfwGetWindowAttribで現在の最大化状態を取得することができます。

```c
int maximized = glfwGetWindowAttrib(window, GLFW_MAXIMIZED);
```

デフォルトでは、新しく作成されたウィンドウは最大化されない。ウィンドウを作成する前にウィンドウヒント GLFW_MAXIMIZED を設定することにより、この動作を変更することができる。

```c
glfwWindowHint(GLFW_MAXIMIZED, GLFW_TRUE);
```


### ウィンドウの視認性

ウィンドウモードのウィンドウはglfwHideWindowで隠すことができます。

```c
glfwHideWindow(window);
```

これにより、ウィンドウはタスクバー、ドック、ウィンドウリストから削除されるなど、ユーザーから完全に見えなくなります。フルスクリーンウィンドウは隠すことができず、フルスクリーンウィンドウでglfwHideWindowを呼び出しても何も起こりません。

隠されたウィンドウは、glfwShowWindowで表示することができます。

```c
glfwShowWindow(window);
```

デフォルトでは、この関数は入力フォーカスもそのウィンドウに設定する。GLFW_FOCUS_ON_SHOW ウィンドウヒントを設定して、新しく作成されたすべてのウィンドウのこの動作を変更するか、 glfwSetWindowAttrib を使用して既存のウィンドウの動作を変更します。

また、glfwGetWindowAttribで現在の可視性状態を取得することができます。

```c
int visible = glfwGetWindowAttrib(window, GLFW_VISIBLE);
```

デフォルトでは、新しく作成されたウィンドウは表示される。ウィンドウを作成する前にウィンドウヒント GLFW_VISIBLE を設定することにより、この動作を変更することができる。

```c
glfwWindowHint(GLFW_VISIBLE, GLFW_FALSE);
```

非表示に作成されたウィンドウは、表示されるまでユーザーからは完全に見えません。これは、ウィンドウを表示する前に、例えば特定の場所に移動するなど、ウィンドウをさらに設定する必要がある場合に便利です。


### ウィンドウの入力フォーカス

glfwFocusWindowにより、ウィンドウに入力フォーカスを与え、前面に表示させることができます。

```c
glfwFocusWindow(window);
```

ウィンドウが強制的に一番上に表示されると、ユーザーにとって非常に邪魔になることを心に留めておいてください。ユーザーの注意を喚起するための、より邪魔にならない方法については、注意喚起要求を参照してください。

ユーザー、システム、または独自のコードによってウィンドウが入力フォーカスを獲得または喪失したときに通知を受けたい場合は、フォーカス コールバックを設定します。

```c
glfwSetWindowFocusCallback(window, window_focus_callback);
```

コールバック関数は、ウィンドウの入力フォーカスの状態の変化を受け取る。

```c
void window_focus_callback(GLFWwindow* window, int focused)
{
    if (focused)
    {
        // The window gained input focus
    }
    else
    {
        // The window lost input focus
    }
}
```

また、glfwGetWindowAttribで現在の入力フォーカスの状態を取得することができます。

```c
int focused = glfwGetWindowAttrib(window, GLFW_FOCUSED);
```

デフォルトでは、新しく作成されたウィンドウには入力フォーカスが与えられる。ウィンドウを作成する前にウィンドウヒント GLFW_FOCUSED を設定することにより、この動作を変更することができる。

```c
glfwWindowHint(GLFW_FOCUSED, GLFW_FALSE);
```


### ウィンドウズ・アテンション・リクエスト

割り込みをかけずにイベントを通知したい場合、glfwRequestWindowAttentionでアテンションを要求することができます。

```c
glfwRequestWindowAttention(window);
```

システムは指定されたウィンドウを、またはこれがサポートされていないプラットフォームでは、アプリケーション全体を強調表示します。ユーザーが注目すると、システムは自動的にリクエストを終了します。

### ウィンドウの損傷とリフレッシュ

ウィンドウの内容が破損し、リフレッシュする必要がある場合に通知を受けたい場合は、ウィンドウのリフレッシュ コールバックを設定します。

```c
glfwSetWindowRefreshCallback(m_handle, window_refresh_callback);
```

コールバック関数は、ウィンドウの内容を更新する必要があるときに呼び出されます。

```c
void window_refresh_callback(GLFWwindow* window)
{
    draw_editor_ui(window);
    glfwSwapBuffers(window);
}
```

> Aero、Compiz、Aquaなどの合成ウィンドウシステムで、ウィンドウの内容が画面外に保存される場合、このコールバックは、ウィンドウまたはフレームバッファのサイズが変更されたときにのみ呼び出される可能性があります。


### ウィンドウの透明度

GLFWは、フレームバッファの透過とウィンドウ全体の透過の2種類のウィンドウの透過をサポートしています．1つのウィンドウで両方の方法を使用することはできません。これを行った場合の結果は未定義である．

どちらの方法もプラットフォームがそれをサポートする必要があり、GLFWがサポートするすべてのプラットフォームのすべてのバージョンがこれを行うわけではないので、ウィンドウが本当に透明であるかどうかをチェックするメカニズムがあります。

ウィンドウフレームバッファは GLFW_TRANSPARENT_FRAMEBUFFER ウィンドウヒントでピクセル単位、フレーム単位で透明にすることができる。

```c
glfwWindowHint(GLFW_TRANSPARENT_FRAMEBUFFER, GLFW_TRUE);
```

システムでサポートされている場合、ウィンドウのコンテンツ領域は、フレームバッファのピクセル単位のアルファチャンネルを使用して背景と合成されます。これには、システム上でデスクトップ合成が有効になっていることが必要です。これはウィンドウの装飾には影響しません。

ウィンドウフレームバッファが正常に透過されたかどうかは、GLFW_TRANSPARENT_FRAMEBUFFER ウィンドウ属性で確認することができます。

```c
if (glfwGetWindowAttrib(window, GLFW_TRANSPARENT_FRAMEBUFFER))
{
    // window framebuffer is currently transparent
}
```

GLFWには、gearsというフレームバッファの透明化を有効にした例が付属しています。

装飾を含むウィンドウ全体の不透明度は、glfwSetWindowOpacityで設定することができます。

```c
glfwSetWindowOpacity(window, 0.5f);
```

不透明度（またはアルファ値）は0と1の間の正の有限の数で、0（ゼロ）は完全に透明、1（イチ）は完全に不透明になります。新しく作成されたウィンドウの初期不透明度値は1です。

ウィンドウの現在の不透明度は、glfwGetWindowOpacityで問い合わせることができます。

```c
float opacity = glfwGetWindowOpacity(window);
```

システムがウィンドウ全体の透明化をサポートしていない場合、この関数は常に1を返します。

GLFWには、opacityと呼ばれる実行時にウィンドウ全体の透明度を制御できるテストプログラムが付属しています。

### ウィンドウの属性

ウィンドウには glfwGetWindowAttrib を使用して返すことができる多くの属性があります。ユーザーの操作によって変化する状態（たとえば、入力フォーカスがあるかどうか）を反映するものもあれば、ウィンドウの固有の特性（たとえば、どのようなボーダーを持つか）を反映するものもあります。ウィンドウに関連するものと、OpenGLまたはOpenGL ESのコンテキストに関連するものがあります。

```c
if (glfwGetWindowAttrib(window, GLFW_FOCUSED))
{
    // window has input focus
}
```

GLFW_DECORATED, GLFW_RESIZABLE, GLFW_FLOATING, GLFW_AUTO_ICONIFY, GLFW_FOCUS_ON_SHOWウィンドウ属性はglfwSetWindowAttribで変更することができます。

```c
glfwSetWindowAttrib(window, GLFW_RESIZABLE, GLFW_FALSE);
```


#### ウィンドウ関連属性

GLFW_FOCUSED は、指定されたウィンドウに入力フォーカスがあるかどうかを示す。詳細は、「ウィンドウの入力フォーカス」を参照してください。

GLFW_ICONIFIED は、指定されたウィンドウがアイコン化されているかどうかを示す。詳しくは、ウィンドウのアイコン化を参照してください。

GLFW_MAXIMIZED は、指定されたウィンドウが最大化されているかどうかを示す。詳しくは、ウィンドウの最大化を参照してください。

GLFW_HOVERED は、カーソルが現在ウィンドウのコンテンツ領域の真上にあり、間に他のウィンドウがないかどうかを示す。詳細は、「カーソルの入力/離脱イベント」を参照してください。

GLFW_VISIBLE は、指定されたウィンドウが表示されているかどうかを示す。詳細は、「ウィンドウの可視性」を参照してください。

GLFW_RESIZABLE は、指定されたウィンドウがユーザーによってリサイズ可能かどうかを示す。これは、作成前に GLFW_RESIZABLE window hint で設定するか、作成後に glfwSetWindowAttrib で設定することができる。

GLFW_DECORATED 指定されたウィンドウがボーダー、クローズウィジェットなどの装飾を持つかどうかを示す。これは、作成前に GLFW_DECORATED window hint で設定するか、作成後に glfwSetWindowAttrib で設定することができる。

GLFW_AUTO_ICONIFY は、指定されたフルスクリーンウィンドウが、 フォーカスロスやクローズウィジェットなどの際にアイコン化されるかどうかを 示します。これは、作成前に GLFW_AUTO_ICONIFY window hint で設定するか、作成後に glfwSetWindowAttrib で設定することができる。

GLFW_FLOATING 指定されたウィンドウがフローティングであるかどうかを示す。これは、作成前に GLFW_FLOATING ウィンドウヒントで設定するか、作成後に glfwSetWindowAttrib で設定することができる。

GLFW_TRANSPARENT_FRAMEBUFFER は、指定されたウィンドウが透明なフレームバッファを持っているかどうか、つまりウィンドウのフレームバッファのアルファチャンネルを使用してウィンドウの内容が背景と合成されるかどうかを示します。詳細はウィンドウの透過性を参照してください。

GLFW_FOCUS_ON_SHOW glfwShowWindowが呼ばれたときに、ウィンドウに入力フォーカスを与えるかどうかを指定します。これは、作成前に GLFW_FOCUS_ON_SHOW ウィンドウヒントで設定するか、作成後に glfwSetWindowAttrib で設定することができます。


#### コンテキスト関連属性

GLFW_CLIENT_API は、ウィンドウのコンテキストが提供するクライアント API を表します。 GLFW_OPENGL_API, GLFW_OPENGL_ES_API あるいは GLFW_NO_API のいずれかです。

GLFW_CONTEXT_CREATION_API は、ウィンドウのコンテキストを作成するために使用されるコンテキスト作成APIを示します。; either GLFW_NATIVE_CONTEXT_API, GLFW_EGL_CONTEXT_API or GLFW_OSMESA_CONTEXT_API.

GLFW_CONTEXT_VERSION_MAJOR, GLFW_CONTEXT_VERSION_MINOR and GLFW_CONTEXT_REVISION は、ウィンドウのコンテキストのクライアント API バージョンを示す。

> これらの属性を GLFW_VERSION_MAJOR, GLFW_VERSION_MINOR および GLFW_VERSION_REVISION と混同しないようにしてください。

GLFW_OPENGL_FORWARD_COMPAT は、ウィンドウのコンテキストがOpenGLの前方互換性のあるものであればGLFW_TRUE、そうでない場合はGLFW_FALSEとなります。

GLFW_OPENGL_DEBUG_CONTEXT は、ウィンドウのコンテキストがデバッグモードであればGLFW_TRUE、そうでなければGLFW_FALSEです。

GLFW_OPENGL_PROFILE は、コンテキストによって使用されるOpenGLプロファイルを示します。コンテキストが既知のプロファイルを使用している場合は GLFW_OPENGL_CORE_PROFILE または GLFW_OPENGL_COMPAT_PROFILE であり、 OpenGLプロファイルが不明であるかコンテキストが OpenGL ES コンテキストである場合は GLFW_OPENGL_ANY_PROFILE になる。返されたプロファイルは、コンテキストフラグのプロファイルビットと一致しないかもしれないことに注意してください、なぜなら、ビットが設定されていないとき、GLFWはプロファイルを検出する他の手段を試すからです。

GLFW_CONTEXT_RELEASE_BEHAVIOR は、コンテキストが使用するリリースを示す。指定できる値は GLFW_ANY_RELEASE_BEHAVIOR、 GLFW_RELEASE_BEHAVIOR_FLUSH あるいは GLFW_RELEASE_BEHAVIOR_NONE のいずれかである。動作が GLFW_ANY_RELEASE_BEHAVIOR の場合、コンテキスト作成 API のデフォルトの動作が使用される。GLFW_RELEASE_BEHAVIOR_FLUSH を指定すると、現在のコンテキストから解放されるたびにパイプラインがフラッシュされます。GLFW_RELEASE_BEHAVIOR_NONE を指定すると、パイプラインは解放時にフラッシュされません。

GLFW_CONTEXT_NO_ERROR は、コンテキストによってエラーが生成されるかどうかを示す。使用可能な値は GLFW_TRUE および GLFW_FALSE である。有効にすると、エラーが発生するような状況では、代わりに未定義の動作が発生する。

GLFW_CONTEXT_ROBUSTNESS は、コンテキストによって使用される堅牢性ストラテジーを示す。ウィンドウのコンテキストが堅牢性をサポートしている場合は GLFW_LOSE_CONTEXT_ON_RESET または GLFW_NO_RESET_NOTIFICATION で、そうでない場合は GLFW_NO_ROBUSTNESS である。


#### フレームバッファ関連属性

GLFWはデフォルトフレームバッファ（すなわち、ウィンドウに接続されたフレームバッファ）の属性を公開していません。

OpenGLまたはOpenGL ESのバージョン3.0以降を使用している場合、glGetFramebufferAttachmentParameteriv関数は、赤、緑、青、アルファ、深度およびステンシルバッファチャネルのビット数を取得するために使用することができます。それ以外の場合は、glGetIntegerv関数を使用することができます。

MSAAサンプルの数は、常にglGetIntegervで取得されます。フレームバッファオブジェクトをサポートするコンテキストでは、現在バインドされているフレームバッファのサンプル数が返されます。

Attribute	glGetIntegerv	glGetFramebufferAttachmentParameteriv
Red bits	GL_RED_BITS	GL_FRAMEBUFFER_ATTACHMENT_RED_SIZE
Green bits	GL_GREEN_BITS	GL_FRAMEBUFFER_ATTACHMENT_GREEN_SIZE
Blue bits	GL_BLUE_BITS	GL_FRAMEBUFFER_ATTACHMENT_BLUE_SIZE
Alpha bits	GL_ALPHA_BITS	GL_FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE
Depth bits	GL_DEPTH_BITS	GL_FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE
Stencil bits	GL_STENCIL_BITS	GL_FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE
MSAA samples	GL_SAMPLES	Not provided by this function

glGetFramebufferAttachmentParameteriv を呼び出すと、赤、緑、青、アルファのサイズは GL_BACK_LEFT から、深度とステンシルのサイズはそれぞれ GL_DEPTH と GL_STENCIL アタッチメントから問い合わせがあります。

## バッファースワッピング

GLFWウィンドウは、デフォルトでダブルバッファリングされています。つまり、フロントバッファとバックバッファの2つのレンダリングバッファを持つということです。フロントバッファは表示されるもので、バックバッファはレンダリングされるものです。

フレーム全体のレンダリングが完了したら、バックバッファとフロントバッファを入れ替えて、レンダリング済みのものを表示し、新しいフレームのレンダリングを開始する必要があります。これは glfwSwapBuffers で行われます。

```c
glfwSwapBuffers(window);
```

時々、バッファスワップがいつ行われるかを選択することが有用です。関数glfwSwapIntervalを用いると、glfwSwapBuffersが呼ばれた時点から、バッファを交換するまでにドライバが待つべき最小限のモニタリフレッシュ回数を選択することが可能です。

```c
glfwSwapInterval(1);
```

間隔が 0 の場合、glfwSwapBuffers が呼ばれたとき、リフレッシュを待たずに、すぐにスワップが実行されます。そうでなければ、各バッファスワップの間に少なくともインターバルリトレースが経過します。ゼロのスワップ間隔を使用することは、垂直リトレースを待つためにかかる時間を測定することが望ましくない場合、ベンチマーク目的のために有用である。しかし、1つのスワップ間隔を使用すると、テアリングを回避することができます。

ドライバによっては、アプリケーションが要求するスワップ間隔を上書きするユーザ制御の設定があるため、すべてのマシンでこれが機能するとは限らないことに注意してください。

WGL_EXT_swap_control_tear または GLX_EXT_swap_control_tear 拡張のいずれかをサポートするコンテキストは、負のスワップ間隔も受け入れ、フレームが少し遅れて到着した場合でも、ドライバがすぐにスワップすることを可能にします。これは、目に見える涙のリスクと、より大きなフレームレートの安定性をトレードします。これらの拡張は glfwExtensionSupported で確認することができます。