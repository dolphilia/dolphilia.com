# ANGLE開発

[原文](https://chromium.googlesource.com/angle/angle/+/main/doc/DevSetup.md)

ANGLEは、OpenGL ES 3.1およびEGL 1.5のライブラリとテストを提供しています。これらを使って、Windows、Linux、Mac、Android上でOpenGL ESアプリケーションを構築し、実行することができます。

## 開発セットアップ

### バージョン管理

ANGLEはバージョン管理にgitを使用しています。有用なドキュメントは[http://git-scm.com/documentation](http://git-scm.com/documentation)で見ることができます。

### 必要な最初のセットアップ（最初にこれを行う）

注意: Chromiumチェックアウトの中でビルドする場合[代わりにこちらの手順を参照してください](https://chromium.googlesource.com/angle/angle/+/HEAD/doc/BuildingAngleForChromiumDevelopment.md).

すべてのプラットフォームで必要です。

 * [Python 3](https://www.python.org/downloads/) がパスで利用可能である必要があります。
 * [depot_tools](https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up)
   * 依存関係のダウンロード（gclient使用）、ビルドファイルの生成（GN使用）、ANGLEのコンパイル（ninja使用）に必要です。
   * コンパイルに必要なninjaを提供する `depot_tools` がパスに入っていることを確認してください。
 * Googlerの場合は、`download_from_google_storage --config` を実行して、Google Storageにログインしてからソースを取得するようにしてください。

Windowsの場合。

 * ***重要: Googlerでない場合は、環境設定で `DEPOT_TOOLS_WIN_TOOLCHAIN=0` を設定してください***。
 * [Visual Studio Community 2022](https://visualstudio.microsoft.com/vs/)をインストールします。
 * [Windows SDK](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive/)をインストールします。
   * Visual Studio Installerがあれば、そこからインストールすることができます。最新版を探すには、`Individual components`タブに切り替える必要があるかもしれません。
   * 現在サポートされている Windows SDK のバージョンは [vs_toolchain.py](https://chromium.googlesource.com/chromium/src/build/+/refs/heads/main/vs_toolchain.py) に記載されています。
   * SDKは、GN生成のVisual Studioプロジェクト、D3D Debugランタイム、および最新のHLSL Compilerランタイムに必要です。
 * (オプション) 詳細は [Chromium Windows build instructions](https://chromium.googlesource.com/chromium/src/+/main/docs/windows_build_instructions.md) を参照してください。

Linuxの場合。

 * 依存関係は後で処理されます (下記の `install-build-deps.sh` を参照してください)。

MacOSの場合。

 * [XCode](https://developer.apple.com/xcode/) Clangと開発用ファイル用です。
 * MacOS の Googler の場合、`gclient sync` を実行する前に、まず Chromium サーバーから macOS SDK をダウンロードするための認証が必要です。cipd auth-login` を使ってこの権限を取得し、指示に従ってください。

### ソースの取得

```
mkdir angle
cd angle
fetch angle
```

コードを寄稿する場合は、Git の `commit-msg` フックも設定する必要があります。設定方法は [ContributingCode#getting-started-with-gerrit](ContributingCode.md#getting-started-with-gerrit) を参照してください。

Linuxのみ、このコマンドを実行して先に進む前に、必要なすべての依存関係をインストールする必要があります。
```
./build/install-build-deps.sh
```

これが正常に完了すると、ninjaファイルを生成する準備が整います。
```
gn gen out/Debug
```

もし、コードのチェックアウトに問題があった場合は、エラーメッセージを確認してください。Windows の場合、Googler でないなら **環境で `DEPOT_TOOLS_WIN_TOOLCHAIN=0` に設定してください**。Googler であれば、`download_from_google_storage --config` を実行したことを確認してください。

GN は ninja ファイルを生成します。デフォルトのビルドオプションは、clangと一緒にANGLEをリリースモードでビルドします。多くの場合、デフォルトのオプションは望ましいものですが、 `gn args out/Debug` を実行することによって変更することができます。開発用によくオーバーライドされるオプションは以下の通りです。

```
is_component_build = true/false      (falseは依存関係の静的リンクを強制します)
target_cpu = "x64"/"x86"             (デフォルトは "x64"です)
is_debug = true/false                (リリースビルドの場合はfalseを使用します。 is_debug = trueがデフォルトです。)
angle_assert_always_on = true/false  (リリースアサートとランタイムデバッグレイヤーを有効にします)
is_clang = false (NOT RECOMMENDED)   (clangの代わりにシステムのデフォルトコンパイラを使用するため)
```

リリースビルドの場合は、 `gn args out/Release` を実行し、 `is_debug = false` を設定します。オプションで、リリーステスト用に `angle_assert_always_on = true` を設定します。

Windowsでは、argsに `target_os = "winuwp"` を設定することで、Universal Windows Platform (UWP) 用にビルドすることができます。libEGL.dll と libGLESv2.dll をアプリケーションのディレクトリに移動し、他の DLL に依存せず自己完結することをサポートするために `is_component_build = false` の設定を強く推奨します (Direct3D バックエンドのために d3dcompiler_47.dll はまだ必要です)。また、UWPでは `is_clang = false` を使用することをお勧めします。

GNに関するより詳しい情報は `gn help` を実行してください。

以下のいずれかのコマンドで、すべてのプラットフォームでコンパイルできるように `autoninja` を使用します。

```
autoninja -C out/Debug
autoninja -C out/Release
```

`depot_tools` は `autoninja` を提供しているので、以前のステップからパスで利用できるはずです。Ninjaは設定を変更すると、自動的にGNを呼び出してビルドファイルを再生成します。`autoninja` は、システム構成に基づいて `ninja` に自動的にスレッドカウントを指定する。

### Gomaで作る（Google社員のみ）

また、Googleの社員には、分散コンパイルシステムであるgomaの使用を強く推奨しています。詳細な情報は内部で入手可能です。Gomaを有効にするには、GN argを設定します。

```
use_goma = true
```

### Visual Studioによるビルドとデバッグ

`Out/Debug/angle-debug.sln`にVisual Studioのソリューションを生成する。

```
gn gen out/Debug --sln=angle-debug --ide=vs2022
```

Visual Studioでは。
 1. ANGLEソリューションファイル `out/Debug/angle-debug.sln` を開いてください。
 2. 手動でビルドする場合は、コマンドラインから `autoninja` を使用することをお勧めします。
 3. IDEからの "Build Solution" はGNで壊れています。IDEを使用して、1度に1つのターゲットまたは1つのファイルをビルドすることができます。

ビルドが完了すると、すべてのANGLEライブラリ、テスト、およびサンプルは `out/Debug` に配置されます。

### ANGLE for Androidの構築

Android専用の[ドキュメント](DevSetupAndroid.md#ANGLE-for-Android)をご覧ください。

## ANGLEによるアプリケーション開発

ここでは、ANGLEを使用してOpenGL ESアプリケーションを構築する方法について説明します。

### Choosing a Backend

ANGLEは、プラットフォームに応じて様々なバックレンダラを使用することができます。  Windowsでは、D3D11が利用可能な場合はD3D11が、そうでない場合はD3D9がデフォルトで使用されます。  その他のデスクトッププラットフォームでは、デフォルトでGLが使用されます。  モバイルでは、デフォルトでGLESが使用されます。

ANGLE は `EGL_ANGLE_platform_angle` という EGL 拡張を提供しています．この拡張は，EGL の初期化時に eglGetPlatformDisplayEXT を特別な enum と共に呼ぶことで，どのレンダラを使用するかを選択できるようにするものです．この拡張機能の詳細は `extensions/EGL_ANGLE_platform_angle.txt` と `extensions/EGL_ANGLE_platform_angle_*.txt` にある仕様書に記載されています。また、その使用例は ANGLE サンプルとテスト、特に `util/EGLWindow.cpp` で見ることができます。

デフォルトのD3Dバックエンドを変更する場合。

 1. `src/libANGLE/renderer/d3d/DisplayD3D.cpp` を開いてください。
 2. ファイルの先頭付近にある `ANGLE_DEFAULT_D3D11` の定義を見つけて、好みの設定にします。

任意のバックエンドを完全に削除すること。

 1. `gn args <path/to/build/dir>`を実行します
 2. 適切な変数に `false` を設定します。オプションは
   - `angle_enable_d3d9`
   - `angle_enable_d3d11`
   - `angle_enable_gl`
   - `angle_enable_metal`
   - `angle_enable_null`
   - `angle_enable_vulkan`
   - `angle_enable_essl`
   - `angle_enable_glsl`

### アプリケーションでANGLEを使用するには

Windowsの場合。

 1. ビルド環境が `include` フォルダにアクセスできるように設定し、Khronosの標準的なEGLおよびGLES2ヘッダーファイルへのアクセスを提供します。
  * Visual C++の場合
     * _ソリューションエクスプローラー_でプロジェクトを右クリックし、_プロパティ_を選択します。
     * _構成のプロパティ_の分岐で、「_C/C++_」をクリックします。
     * Khronos EGLおよびGLES2ヘッダーファイルへの相対パスを_Additional Include Directories_に追加。
 2. ビルド出力ディレクトリにある `libEGL.lib` と `libGLESv2.lib` にアクセスできるようにビルド環境を設定する（[ANGLEのビルド](#building-with-visual-studio) を参照）。
   * For Visual C++
     * _ソリューションエクスプローラー_でプロジェクトを右クリックし、_プロパティ_を選択します。
     * _構成のプロパティ_の分岐で、_Linker_の分岐を開き、_Input_をクリックします。
     * 追加の依存関係_ に `libEGL.lib` ファイルと `libGLESv2.lib` ファイルの両方をセミコロンで区切って相対パスで追加します。
 3. ビルド出力ディレクトリにある `libEGL.dll` と `libGLESv2.dll` をアプリケーションフォルダにコピーします（[ANGLEのビルド](#building-with-visual-studio) を参照）。
 4. アプリケーションは、Khronos [OpenGL ES 2.0](http://www.khronos.org/registry/gles/) および [EGL 1.4](http://www.khronos.org/registry/egl/) のAPIに準拠してコーディングしてください。

LinuxとMacOSの場合, 各々:

 - アプリケーションを `libGLESv2` と `libEGL` に対してリンクする。
 - OpenGL ESとEGLのエントリーポイントをランタイムにロードするには、`dlopen`を使用します。

## GLSL ES トランスレータ

OpenGL ESとEGLのライブラリに加え、ANGLEはGLSL ESのトランスレータも提供しています。このトランスレータは、HLSL、デスクトップおよびモバイル用のGLSL、SPIR-VおよびMetal SLなど、さまざまなバックエンドをターゲットにしています。トランスレータをビルドするには、`angle_shader_translator` ターゲットをビルドします。使用法のメッセージを見るには、引数なしでトランスレータのバイナリを実行してください。

### ソースとビルディング

トランスレータのコードは ANGLE に含まれていますが、完全に独立しており、[`src/compiler`] (../src/compiler) にあります。上記の [ANGLE の入手とビルド](#getting-the-source) の手順に従って、好きなプラットフォームでトランスレータをビルドしてください。

### Usage

ANGLE [`shader_translator`](../samples/shader_translator/shader_translator.cpp) サンプルは、C++ API の基本的な使い方をデモしています。GLSL ES シェーダを変換するには、以下の関数を同じ順序で呼び出します。

 * `sh::Initialize()` トランスレータを使用する各プロセスから一度だけ呼び出される必要があります。
 * `sh::ContructCompiler()` バーテックスまたはフラグメントシェーダ用のトランスレータオブジェクトを作成します。
 * `sh::Compile()` は与えられたシェーダーを変換します。
 * `sh::Destruct()` は、指定されたトランスレータを破棄します。
 * `sh::Finalize()` トランスレータを使用している各プロセスから一度だけ呼び出す必要があります。