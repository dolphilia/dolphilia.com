# MetalANGLE開発

[原文](https://github.com/kakashidinho/metalangle/blob/master/src/libANGLE/renderer/metal/DevSetup.md)

MetalANGLEはOpenGL ES 2.0 (ES 3.0の一部をサポート) およびEGL 1.4 ライブラリを提供します。  これらを使って、MacやiOS上でMetal APIを利用したOpenGL ES 2.0アプリケーションを構築し、実行することができます。


## 開発体制


### バージョン管理

ANGLEはバージョン管理にgitを使用しています。gitに慣れていない方は、[http://git-scm.com/documentation](http://git-scm.com/documentation)に有用なドキュメントがあります。


### Xcodeプロジェクトでクイックビルド

ANGLEのテストスイートやOpenGL ESのコンフォーマンステストでMetalANGLEをテストしたくない場合は、`mac/xcode` と `ios/xcode` フォルダにあるXcodeプロジェクトを使って、 `MetalANGLE.framework` といくつかのサンプルアプリを素早くビルドすることができます。


依存関係を取得する:

- サードパーティの依存関係を取得するために `ios/xcode/fetchDepedencies.sh` スクリプトを実行します。


MacOS版:

- `mac/xcode`フォルダにある`OpenGLES.xcodeproj`を開く。
- ターゲット `MetalANGLE_mac` は `MetalANGLE.framework` という名前のOpenGL ESフレームワークをビルドします。
- [MGLKit](#MGLKit)ライブラリを使ってサンプルアプリをビルドする場合。`OpenGLES.xcodeproj`ではなく、`MGKitSamples.xcodeproj`を開いてください（両方を同時に開かないでください）。`MGKitSamples.xcodeproj`はワークスペース内にある`OpenGLES.xcodeproj`を開くためです。
- サンプルアプリ `MGLKitSampleApp_mac` は、`MGLKit` を使って macOS 上でビューと GL コンテキストを設定する方法を示しています。
- `EAGL`/`GLKit` から `MGLKit` へアプリを移植する方法については [MGLKit](#MGLKit) の項を参照してください。


iOS版:

- `ios/xcode` フォルダにある `OpenGLES.xcodeproj` を開いてください。
- ターゲット `MetalANGLE` は `MetalANGLE.framework` という名前のOpenGL ESフレームワークをビルドします。
- tvOS版をビルドする場合は、`MetalANGLE_tvos`ターゲットを選択します。
- __Note__: サンプルアプリを実機でテストするために。XcodeのBundle Identifierを好きなものに変更する必要があります。しかも、これは全世界共通で制限されています。一人が自分のApple開発者プロファイルを使ってサンプルアプリをインストールすると、設定されたIDはその開発者用にのみ登録されます。他の開発者はそのIDを使用して自分のデバイスにインストールすることができなくなります。
- [MGLKit](#MGLKit)ライブラリを使ってサンプルアプリをビルドする場合。`OpenGLES.xcodeproj`ではなく、`MGKitSamples.xcodeproj`を開いてください（両方を同時に開かないでください）。`MGKitSamples.xcodeproj`はワークスペース内にある`OpenGLES.xcodeproj`を開くためです。
- iOS Simulatorでの実行とテストには、Xcode 11+とMacOS Catalina (10.15+)が必要です。
- サンプルアプリ `MGLKitSampleApp` は、iOS 上で `MGLKit` を使ってビューと GL コンテキストを設定する方法を示している。
- サンプルアプリ `MGLKitSampleApp_tvos` は、`MGLKit` を使って tvOS 上でビューと GL ontext を設定する方法を示している。
- サンプルアプリ `MGLPaint` は Apple の古いサンプルアプリ `GLPaint` を移植したものです。


### すべてのテストスイートを含む標準的なANGLEビルド

以下はANGLEプロジェクトの標準的なビルドプロセスで、MetalANGLEの実装を検証するための広範なテストターゲットが含まれています。標準的なANGLEのビルドプロセスでは、`MetalANGLE.framework`の代わりに `libEGL.dylib`, `libGLESv2.dylib`, `libGLESv1CM.dylib` を生成することに注意してください。.dylib`バージョンはフレームワーク版のように[MGLKit](#MGLKit)のラッパークラスを含んでいません。現在のところ、MacOS版のビルドのみサポートしています。


##### 必要なツール

すべてのプラットフォームで。

 * [depot_tools](http://dev.chromium.org/developers/how-tos/install-depot-tools)
   * プロジェクトを生成し、サードパーティの依存関係を取得するために必要です。
   * gclient, GN, ninja ツールを提供する。
 * [Xcode](https://developer.apple.com/xcode/) をClangと開発用ファイルとして使用します。
 * Bisonとflexは、Windowsでの翻訳文法生成のみをサポートするため、必要ありません。


MacOSビルドの場合:

 * GNはデフォルトのビルドシステムです。  GYPのサポートは削除されました。GNはdepot_toolsのインストールで利用できます。
 * Clangはビルドシステムによってセットアップされ、デフォルトで使用されます。


##### ソースの取得

```sh
git clone https://github.com/kakashidinho/metalangle
cd metalangle
python scripts/bootstrap.py
gclient sync
git checkout master
```

`gclient sync` を実行すると、"gs://chromium-clang-format ..." の取得に失敗したというエラーが報告されることがあります。このような場合は、ルートディレクトリにある `DEPS` ファイルを開き、以下のコードスニペットを削除してください。

```json
  {
    'name': 'clang_format_mac',
    'pattern': '.',
    'condition': 'host_os == "mac" and not build_with_chromium',
    'action': [ 'download_from_google_storage',
                '--no_resume',
                '--platform=darwin',
                '--no_auth',
                '--bucket', 'chromium-clang-format',
                '-s', '{angle_root}/buildtools/mac/clang-format.sha1',
    ],
  },
```


##### MacOS版のビルド


無事にソースを取得したら、ninjaファイルを生成する準備が整いました。

```sh
gn gen out/Debug --ide=xcode --args='mac_deployment_target="10.13" angle_enable_metal=true'
```

GN はデフォルトで ninja ファイルを生成します。  デフォルトのビルドオプションを変更するには、 `gn args out/Debug` を実行します。  よく使われるオプションは以下の通りです。

```sh
target_cpu = "x64"  (または "x86")
is_clang = false    (clang の代わりにシステムのデフォルトコンパイラを使うようにする)
is_debug = true     (デバッグを有効にする、trueがデフォルト)
strip_absolute_paths_from_debug_symbols = false (このフラグを無効にすると、xcodeが出力バイナリをデバッグできるようになります。)
```

`out/Debug`フォルダにGNが生成したXcodeワークスペースを開いてコードをブラウズしたり、テストやサンプルアプリケーションのデバッグを行うことができます。

リリースビルドの場合は、`gn args out/Release` を実行し、`is_debug = false` を設定します。

GNに関するより詳しい情報は `gn help` を実行してください。

Ninjaは、以下のいずれかのコマンドでコンパイルすることができます。

```sh
ninja -C out/Debug
ninja -C out/Release
```

Ninjaは設定を変更すると、自動的にGNを呼び出してビルドファイルを再生成します。depot_tools` は ninja を提供するので、パスに入っていることを確認すること。


## ANGLEによるアプリケーション開発

ここでは、ANGLEを使用してOpenGL ESアプリケーションを構築する方法について説明します。


### バックエンドの選択

ANGLEは、プラットフォームに応じて様々なバックレンダラーを使用することができます。  MacOSとiOSでは、デフォルトでMetalが使用されます。

ANGLEは `EGL_ANGLE_platform_angle` というEGL拡張を提供しており、特別な列挙型を使用してeglGetPlatformDisplayEXTを呼び出すことにより、EGL初期化時に使用するレンダラーを選択することができるようになっています。この拡張機能の詳細は `extensions/ANGLE_platform_angle.txt` と `extensions/ANGLE_platform_angle_*.txt` にある仕様書をご覧ください。また、ANGLE のサンプルやテスト、特に `util/EGLWindow.cpp` で使用例を見ることができます。現在、iOS版では、デフォルト（Metal）以外のレンダラーを選択することができません。


### アプリケーションでMetalANGLEを使用するには

ビルド環境が `include` フォルダにアクセスできるように設定し、クロノスの標準的なEGLおよびGLES2ヘッダーファイルへのアクセスを提供します。


#### MacOSの場合（標準ANGLEビルドシステムでビルドされた`libGLESv2.dylib`を使用）

 - ビルド出力ディレクトリにある `libEGL.dylib` と `libGLESv2.dylib` にアクセスできるようにビルド環境を設定する（[ANGLEのビルド](#Building-MacOS-version) を参照）。
 - アプリケーションを `libGLESv2.dylib` と `libEGL.dylib` に対してリンクします。
 - アプリケーションをKhronos [OpenGL ES 2.0](http://www.khronos.org/registry/gles/) および [EGL 1.4](http://www.khronos.org/registry/egl/) のAPIにコーディングします。


#### iOSとMacOSの場合（付属のXcodeプロジェクトでビルドした`MetalANGLE.framework`を使用）

 - アプリケーションを `MetalANGLE.framework` にリンクします。


##### MGLKit

 - また、`MetalANGLE.framework`には、`MGLContext`、`MGLLayer`、`MGLKView`、`MGLKViewController` などのMGLKitユーティリティクラスが含まれており、Appleが提供する `CAEAGLContext` 、 `CAEAGLLayer` 、 `GLKView` 、 `GLKViewController` などの GLKit クラスと同様のクラスが用意されています。このMGLKitのクラスを利用したサンプルアプリは `MGLKitSamples.xcodeproj` にありますので、ご覧ください。


##### AppleのEAGLとGLKitからMGLKitへのポーティング

- Appleの `EAGL` と `GLKit` クラスはOpenGL ESのコンテキストとビューを管理するためのハイレベルなAPIを提供しています。Metalangleは似たようなクラスを提供していますが、名前が違うので、アプリケーションを`EAGL`と`GLKit`から`MGLKit`に移植するには、少し修正する必要があります。例えば、`CAEAGLLayer` は `[EAGLContext renderbufferStorage: fromDrawable:]` というコールによってデフォルトのフレームバッファのストレージを手動で作成する必要があります。一方、`MGLLayer`は自動的にそれを行うので、デフォルトのフレームバッファを手動で作成する必要はない。

- 相当するクラスです。

|    Apple                      |     MetalANGLE           |
|-------------------------------|--------------------------|
|    EAGLContext                |      MGLContext          |
|    CAEAGLLayer                |      MGLLayer            |
|  EAGLRenderingAPI             |      MGLRenderingAPI     |
|    GLKView                    |      MGLKView            |
|   GLKViewDelegate             |      MGLKViewDelegate    |
|  GLKViewController            |      MGLKViewController  |
| GLKViewDrawableColorFormat    | MGLDrawableColorFormat   |
| GLKViewDrawableDepthFormat    | MGLDrawableDepthFormat   |
| GLKViewDrawableStencilFormat  | MGLDrawableStencilFormat |
| GLKViewDrawableMultisample    | MGLDrawableMultisample   |

- 典型的な古いコードでは、通常 `[GLKViewController viewDidLoad]` を `EAGLContext` と `GLKView` で構成しています。

```objective-c
- (void)viewDidLoad
{
    [super viewDidLoad];
    // OpenGL ES コンテキストを作成し、storyboard から読み込んだビューに割り当てる。
    GLKView *view = (GLKView *)self.view;
    view.context = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
    // ビューが作成するレンダーバッファーの設定
    view.drawableColorFormat = GLKViewDrawableColorFormatRGBA8888;
    view.drawableDepthFormat = GLKViewDrawableDepthFormat24;
    view.drawableStencilFormat = GLKViewDrawableStencilFormat8;
    // マルチサンプリングの有効化
    view.drawableMultisample = GLKViewDrawableMultisample4X;
}
```

- MetalANGLE`を移植する場合、上記を以下のように `[MGLKViewController viewDidLoad]`に変更する必要があります。

```objective-c
- (void)viewDidLoad
{
    [super viewDidLoad];
    // OpenGL ES コンテキストを作成し、storyboard から読み込んだビューに割り当てる。
    MGLKView *view = (MGLKView *)self.view;
    view.context = [[MGLContext alloc] initWithAPI:kMGLRenderingAPIOpenGLES2];
    // ビューが作成するレンダーバッファーの設定
    view.drawableColorFormat = MGLDrawableColorFormatRGBA8888;
    view.drawableDepthFormat = MGLDrawableDepthFormat24;
    view.drawableStencilFormat = MGLDrawableStencilFormat8;
    // マルチサンプリングの有効化
    view.drawableMultisample = MGLDrawableMultisample4X;
}
```

- あるいは、アプリが `CAEAGLLayer` をカスタム `UIView` で直接使用する場合など。

```objective-c
@interface PaintingView()
{
    EAGLContext *context;
    GLuint viewFramebuffer, viewRenderbuffer;
}
+ (Class)layerClass
{
    return [CAEAGLLayer class];
}
- (id)initWithCoder:(NSCoder*)coder
{
    if ((self = [super initWithCoder:coder]))
    {
        CAEAGLLayer *eaglLayer = (CAEAGLLayer *)self.layer;
        eaglLayer.opaque = YES;
        // このアプリケーションでは、presentRenderbuffer を呼び出した後も drawable の内容を保持したい。
        eaglLayer.drawableProperties = [NSDictionary dictionaryWithObjectsAndKeys:
                      [NSNumber numberWithBool:YES], kEAGLDrawablePropertyRetainedBacking,
                      kEAGLColorFormatRGBA8, kEAGLDrawablePropertyColorFormat,
                      nil];
        // ビューの拡大率を任意に設定できる
        self.contentScaleFactor = [[UIScreen mainScreen] scale];
        // OpenGLコンテキストの初期化
        context = [[EAGLContext alloc] initWithAPI:kEAGLRenderingAPIOpenGLES2];
        // 現在のコンテキストを設定する
        if (!context || ![EAGLContext setCurrentContext:context]) {
            return nil;
        }
        // デフォルトのフレームバッファとレンダーバッファを割り当てる。
        glGenFramebuffers(1, &viewFramebuffer);
        glGenRenderbuffers(1, &viewRenderbuffer);
        glBindFramebuffer(GL_FRAMEBUFFER, viewFramebuffer);
        glBindRenderbuffer(GL_RENDERBUFFER, viewRenderbuffer);
        [context renderbufferStorage:GL_RENDERBUFFER fromDrawable:eaglLayer];
        glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_RENDERBUFFER, viewRenderbuffer);
        // レンダーバッファーのサイズを取得する
        GLint backingWidth, backingHeight;
        glGetRenderbufferParameteriv(GL_RENDERBUFFER, GL_RENDERBUFFER_WIDTH, &backingWidth);
        glGetRenderbufferParameteriv(GL_RENDERBUFFER, GL_RENDERBUFFER_HEIGHT, &backingHeight);
        if (glCheckFramebufferStatus(GL_FRAMEBUFFER) != GL_FRAMEBUFFER_COMPLETE)
        {
          NSLog(@"Failed to make complete framebuffer objectz %x",
                glCheckFramebufferStatus(GL_FRAMEBUFFER));
          return nil;
        }
    }
    return self;
}
- (void) renderFunc
{
    [EAGLContext setCurrentContext:context];
    // バッファをクリアする
    glBindFramebuffer(GL_FRAMEBUFFER, viewFramebuffer);
    glClearColor(0.0, 0.0, 0.0, 0.0);
    glClear(GL_COLOR_BUFFER_BIT);
    // バッファを表示する
    glBindRenderbuffer(GL_RENDERBUFFER, viewRenderbuffer);
    [context presentRenderbuffer:GL_RENDERBUFFER];
}
@end
```

- もし、`MetalANGLE`を使うなら、上記は以下のように変更される（注意：`CAEAGLLayer`と違って、`MGLLayer`は自動的にデフォルトのフレームバッファを作成するので、`[EAGLContext renderbufferStorage: fromDrawable:]` でカスタムレンダバッファを作る必要はない）。

```objective-c
@interface PaintingView()
{
    MGLContext *context;
}
+ (Class)layerClass
{
    return [MGLLayer class];
}
- (id)initWithCoder:(NSCoder*)coder
{
    if ((self = [super initWithCoder:coder]))
    {
        MGLLayer *mglLayer = (MGLLayer *)self.layer;
        mglLayer.opaque = YES;
        // 今回のアプリケーションでは、presentを呼び出した後も、EAGLDrawableの内容を保持したい。
        mglLayer.retainedBacking = YES:
        mglLayer.drawableColorFormat = MGLDrawableColorFormatRGBA8888;
        // レイヤーのスケールファクターを任意に設定する
        mglLayer.contentScale = [[UIScreen mainScreen] scale];
        // OpenGLコンテキストの初期化
        context = [[MGLContext alloc] initWithAPI:kMGLRenderingAPIOpenGLES2];
        // アクティブなレイヤーを使用せずに、現在のコンテキストを設定します。テクスチャやバッファをアクティブなレイヤーなしで作成するのは全く問題ありません。しかし、GL描画コマンドを呼び出す前に、[MGLContext setCurrentContext: forLayer:]を呼び出す必要があります（下記のrenderFuncのコードを参照）。
        if (!context || ![MGLContext setCurrentContext:context]) {
            return nil;
        }
        // レンダーバッファーのサイズを取得する。
        // 注意事項  - CAEAGLLayerとは異なり、デフォルトのフレームバッファとレンダーバッファを手動で作成する必要はありません。MGLLayerはすでにそれらを内部で生成しています。  - 例えば、iOSデバイスでユーザーがビューをリサイズしたり、回転させたりすると、サイズはいつでも変更される可能性があります。だから、キャッシュしない方が良い。
        GLuint backingWidth, backingHeight;
        backingWidth = mglLayer.drawableSize.width;
        backingHeight = mglLayer.drawableSize.height;
    }
    return self;
}
- (void) renderFunc
{
    // レイヤーを描画コマンドの送信先として設定する。注：これは重要で、GL描画コマンドを発行する前に呼び出す必要があります。
    MGLLayer *mglLayer = (MGLLayer *)self.layer;
    [MGLContext setCurrentContext:context forLayer:mglLayer];
    // バッファをクリアします。次のglBindFramebuffer()呼び出しはオプションです。デフォルトのフレームバッファとは別にカスタムフレームバッファがある場合のみ必要です。
    glBindFramebuffer(GL_FRAMEBUFFER, mglLayer.defaultOpenGLFrameBufferID);
    glClearColor(0.0, 0.0, 0.0, 0.0);
    glClear(GL_COLOR_BUFFER_BIT);
    // バッファを表示する
    [context present:mglLayer];
}
@end
```