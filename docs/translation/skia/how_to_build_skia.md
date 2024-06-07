# Skia のビルド方法

まず最初に Skia のダウンロード手順に従ってください。Skia はビルドを構成するために GN を使用します。

[[TOC]]

## is_official_build とサードパーティ依存関係

ほとんどの Skia ユーザーは is_official_build=true を設定するべきであり、ほとんどの開発者はデフォルトの false のままにしておくべきです。

このモードは Skia を配布に適した方法で構成します。これは、デバッグシンボルのない最適化されたビルドであり、通常のライブラリ検索パスを使用してサードパーティ依存関係に動的にリンクされます。

対照的に、開発者向けのデフォルト設定は、完全なデバッグシンボルを持つ最適化されていないビルドであり、すべてのサードパーティ依存関係がソースからビルドされて libskia に埋め込まれます。これが私たちがすべての手動および自動テストを行う方法です。

Skia は、画像をデコードするための libpng、libwebp、または libjpeg-turbo、フォントをサブセット化するための ICU および sftnly など、サードパーティライブラリを利用するいくつかの機能を提供します。これらすべてのサードパーティ依存関係はオプションであり、適切な foo に対して skia_use_foo のような GN 引数で制御できます。

skia_use_foo が有効になっている場合、skia_use_system_foo を有効にすると、システムパス上で見つかったヘッダーおよびライブラリに対して Skia をビルドおよびリンクします。is_official_build=true はデフォルトですべての skia_use_system_foo を有効にします。必要に応じて、extra_cflags および extra_ldflags を使用してインクルードパスやライブラリパスを追加できます。

## サポートおよび推奨コンパイラ

Skia は GCC、MSVC、その他のコンパイラでコンパイルできるはずですが、Skia のソフトウェアバックエンドの多くのルーチンは Clang でコンパイルしたときに最速で実行されるように書かれています。ソフトウェアラスタライズ、画像デコード、またはカラースペース変換に依存していて、Clang 以外のコンパイラで Skia をコンパイルすると、劇的に性能が低下します。この選択は優先順位の問題に過ぎず、非 Clang コンパイラに根本的な問題があるわけではありません。したがって、これが重大な問題である場合は、メーリングリストでお知らせください。

Skia は C++17 言語機能を使用しており（-std=c++17 フラグでコンパイル）、したがって C++17 対応のコンパイラが必要です。Clang 5 以降は c++17 標準のすべての機能を実装しています。C++17 サポートが不足している古いコンパイラは、明確でないコンパイルエラーを生成する可能性があります。クイックスタートに示されているように、--args='cc="clang" cxx="clang++"' のような GN ビルド引数を使用して、cc および cxx の呼び出しに特定の実行ファイルを使用するようにビルドを構成できます。これは、マシンのデフォルトのコンパイラツールチェーンを変更することなく Skia をビルドするのに便利です。

GN 引数で cc および cxx を指定しない場合、Skia はデフォルトで cc および c++ を使用します。これは多くのプラットフォームでデフォルトで GCC であり、Clang ではありません。
## クイックスタート

`gn gen` を実行してビルドファイルを生成します。`gn gen` の引数として、ビルドディレクトリの名前を渡し、オプションで --args= を渡してビルドタイプを構成します。

ビルドディレクトリを `out/Static` として Skia を静的ライブラリとしてビルドするには:

```sh
bin/gn gen out/Static --args='is_official_build=true'
```

ビルドディレクトリを `out/Shared` として Skia を共有ライブラリ (DLL) としてビルドするには:

```sh
bin/gn gen out/Shared --args='is_official_build=true is_component_build=true'
```

`bin/gn` がない場合は、以下を実行してください:

```sh
python3 tools/git-sync-deps
```

使用可能なビルド引数のリストは、`gn/skia.gni` を確認するか、次を実行して確認できます:

```sh
bin/gn args out/Debug --list
```

GN は複数のビルドフォルダーの共存を許可します。各ビルドは希望に応じて個別に構成できます。例えば:

```sh
bin/gn gen out/Debug
bin/gn gen out/Release  --args='is_debug=false'
bin/gn gen out/Clang    --args='cc="clang" cxx="clang++"'
bin/gn gen out/Cached   --args='cc_wrapper="ccache"'
bin/gn gen out/RTTI     --args='extra_cflags_cc=["-frtti"]'
```

ビルドファイルを生成したら、Ninja を実行して Skia をコンパイルおよびリンクします:

```sh
ninja -C out/Static
```

ヘッダーファイルが欠落している場合は、対応する依存関係をインストールしてください:

```sh
tools/install_dependencies.sh
```

新しい変更をプルして再ビルドするには:

```sh
git pull
python tools/git-sync-deps
ninja -C out/Static
```

## ## Android

Android 用に Skia をビルドするには、Android NDK が必要です。

NDK を持っておらず、CIPD にアクセスできる場合は、次のコマンドのいずれかを使用して、ボットが使用する NDK を取得できます:

```sh
./bin/fetch-sk
./bin/sk asset download android_ndk_linux /tmp/ndk     # Linux で
./bin/sk asset download android_ndk_darwin /tmp/ndk    # Mac で
./bin/sk.exe asset download android_ndk_windows C:/ndk # Windows で
```

GN ビルドファイルを生成する際には、ndk のパスと目的の target_cpu を渡します:

```sh
bin/gn gen out/arm   --args='ndk="/tmp/ndk" target_cpu="arm"'
bin/gn gen out/arm64 --args='ndk="/tmp/ndk" target_cpu="arm64"'
bin/gn gen out/x64   --args='ndk="/tmp/ndk" target_cpu="x64"'
bin/gn gen out/x86   --args='ndk="/tmp/ndk" target_cpu="x86"'
```

is_debug や is_component_build などの他の引数も引き続き動作します。ndk_api を調整することで、Vulkan などの新しい Android 機能にアクセスできます。

Android デバイスでテストするには、バイナリとリソースをプッシュし、通常通りに実行します。`bin/droid` を使うと便利かもしれません。

```sh
ninja -C out/arm64
adb push out/arm64/dm /data/local/tmp
adb push resources /data/local/tmp
adb shell "cd /data/local/tmp; ./dm --src gm --config gl"
```
## ChromeOS

arm ChromeOS デバイス用に Skia をクロスコンパイルするには、以下のものが必要です:

- Clang 4 以降
- armhf sysroot
- リンクするための arm Chromebook 上の (E)GL ライブラリファイル

x86 ChromeOS デバイス用に Skia をコンパイルする場合は、Clang とライブラリファイルだけが必要です。

CIPD にアクセスできる場合は、次のようにしてこれらをすべて取得できます:

```sh
./bin/sk asset download clang_linux /opt/clang
./bin/sk asset download armhf_sysroot /opt/armhf_sysroot
./bin/sk asset download chromebook_arm_gles /opt/chromebook_arm_gles
./bin/sk asset download chromebook_x86_64_gles /opt/chromebook_x86_64_gles
```

これらのアセットを使用する権限がない場合は、armhf_sysroot、chromebook_arm_gles、および chromebook_x86_64_gles の README.md ファイルを参照して、これらのアセットの作成手順を確認してください。

これらのファイルが配置されたら、次のような GN 引数を生成します:

```gn
# ARM
cc= "/opt/clang/bin/clang"
cxx = "/opt/clang/bin/clang++"

extra_asmflags = [
    "--target=armv7a-linux-gnueabihf",
    "--sysroot=/opt/armhf_sysroot/",
    "-march=armv7-a",
    "-mfpu=neon",
    "-mthumb",
]
extra_cflags=[
    "--target=armv7a-linux-gnueabihf",
    "--sysroot=/opt/armhf_sysroot",
    "-I/opt/chromebook_arm_gles/include",
    "-I/opt/armhf_sysroot/include/",
    "-I/opt/armhf_sysroot/include/c++/4.8.4/",
    "-I/opt/armhf_sysroot/include/c++/4.8.4/arm-linux-gnueabihf/",
    "-DMESA_EGL_NO_X11_HEADERS",
    "-funwind-tables",
]
extra_ldflags=[
    "--sysroot=/opt/armhf_sysroot",
    "-B/opt/armhf_sysroot/bin",
    "-B/opt/armhf_sysroot/gcc-cross",
    "-L/opt/armhf_sysroot/gcc-cross",
    "-L/opt/armhf_sysroot/lib",
    "-L/opt/chromebook_arm_gles/lib",
    "--target=armv7a-linux-gnueabihf",
]
target_cpu="arm"
skia_use_fontconfig = false
skia_use_system_freetype2 = false
skia_use_egl = true
```

# x86_64

```gn
cc= "/opt/clang/bin/clang"
cxx = "/opt/clang/bin/clang++"
extra_cflags=[
    "-I/opt/clang/include/c++/v1/",
    "-I/opt/chromebook_x86_64_gles/include",
    "-DMESA_EGL_NO_X11_HEADERS",
    "-DEGL_NO_IMAGE_EXTERNAL",
]
extra_ldflags=[
    "-stdlib=libc++",
    "-fuse-ld=lld",
    "-L/opt/chromebook_x86_64_gles/lib",
]
target_cpu="x64"
skia_use_fontconfig = false
skia_use_system_freetype2 = false
skia_use_egl = true
```

Ninja を使用して、通常通りに dm（または他の任意の実行ファイル）をコンパイルします。

バイナリを ssh 経由で Chromebook にプッシュし、gles GPU 構成を使用して通常通りに dm を実行します。

ほとんどの Chromebook はデフォルトでホームディレクトリのパーティションが noexec としてマークされています。「permission denied」エラーを避けるために、次のようなコマンドを実行することを忘れないでください:

```sh
sudo mount -i -o remount,exec /home/chronos
```
## Mac

Mac ユーザーは、`bin/gn gen` に `--ide=xcode` を渡して Xcode プロジェクトを生成することをお勧めします。

Mac の GN ビルドはデフォルトで Intel CPU を想定しています。Apple Silicon (M1 以降) 用にビルドする場合は、gn 引数に `target_cpu="arm64"` を追加します:

```sh
bin/gn gen out/AppleSilicon --args='target_cpu="arm64"'
```

Googler は、社内マシンでの Xcode セットアップ手順については [go/skia-corp-xcode](http://go/skia-corp-xcode) を参照してください。

### Python

Apple が提供する Python のバージョンは数バージョン古く、私たちのビルドシステムと相性が良くないことが知られています。最新の公式バージョンの Python を [Python.org](https://www.python.org/downloads/) からインストールすることをお勧めします。その後、`Applications/Python 3.11/Install Certificates.command` を実行します。

## iOS

GN を実行してビルドファイルを生成します。iOS 用にビルドするには、`target_os="ios"` を設定します。これにより、デフォルトで `target_cpu="arm64"` が設定されます。iOS シミュレータを使用するには、`ios_use_simulator=true` を設定し、ターゲット CPU を Mac のアーキテクチャに設定します。Intel Mac では、`target_cpu="x64"` を設定するだけで iOS シミュレータをターゲットにします。

```sh
bin/gn gen out/ios64  --args='target_os="ios"'
bin/gn gen out/ios32  --args='target_os="ios" target_cpu="arm"'
bin/gn gen out/iossim-apple --args='target_os="ios" target_cpu="arm64" ios_use_simulator=true'
bin/gn gen out/iossim-intel --args='target_os="ios" target_cpu="x64"'
```

デフォルトでは、iOS テストバイナリもパッケージ化し（シミュレータではないデバイスの場合は署名も行います）。署名をスキップしたい場合（たとえば、コンパイルのテストだけを行う場合など）は、`skia_ios_use_signing` を false に設定することで無効にできます。

署名を行う場合、ビルドはデフォルトで Google の署名アイデンティティおよびプロビジョニングプロファイルを使用します。別のものを使用するには、GN 引数 `skia_ios_identity` をコード署名アイデンティティに一致するように設定し、`skia_ios_profile` をプロビジョニングプロファイルの名前に設定します。例:

```sh
skia_ios_identity=".*Jane Doe.*"
skia_ios_profile="iPad Profile"
```

アイデンティティのリストは、コマンドラインで `security find-identity` と入力することで見つけることができます。プロビジョニングプロファイルの名前は Apple Developer サイトで確認できます。あるいは、Finder で `~/Library/MobileDevice/Provisioning Profiles` に移動し、.mobileprovision ファイルを選択してスペースキーを押すことで、インストールされているプロビジョニングプロファイルファイルを確認することもできます。`skia_ios_profile` の値は、そのファイルの上部に記載されている文字列または開発者サイトに記載されている文字列、あるいはファイルの絶対パスにすることができます。

Google の署名アイデンティティまたはプロビジョニングプロファイルが不足している場合は、[go/appledev](http://go/appledev) を確認してください。

署名されたパッケージについては、`ios-deploy` を使用するとデバイスへのインストールと実行が簡単に行えます:

```sh
ios-deploy -b out/Debug/dm.app -d --args "--match foo"
```

Xcode を通じてデプロイしたい場合は、`bin/gn gen` に `--ide=xcode` を渡してプロジェクトを生成できます。Xcode バージョン 10 以降を使用している場合は、プロジェクト設定に移動し、ビルドシステムが「レガシービルドシステム」に設定されていることを確認する必要があるかもしれません。

現在の SDK よりも古い OS を持つデバイスにデプロイする場合は、`ios_min_target` 引数を設定することで行えます:

```sh
ios_min_target = "<major>.<minor>"
```

ここで `<major>`.`<minor>` はデバイスの iOS バージョンを示します。例えば、12.0 や 11.4 などです。

## Windows

Skia は Visual Studio 2017 または 2019 で Windows 上にビルドできます。GN がこれらのいずれかを見つけられない場合、エラーメッセージが表示されます。その場合は、VC パスを `win_vc` 経由で GN に渡すことができます。

Skia は Visual Studio 2017 または 2019 の無料ビルドツールでコンパイルできます。

ボットはパッケージ化された 2019 ツールチェーンを使用しており、Googler は次のようにダウンロードできます:

```sh
./bin/sk.exe asset download win_toolchain C:/toolchain
```

その後、VC と SDK のパスを GN に設定して渡します:

```sh
win_vc = "C:\toolchain\VC"
win_sdk = "C:\toolchain\win_sdk"
```

このツールチェーンは、`target_cpu="x86"` を設定することで 32 ビットビルドをサポートする唯一の方法です。

Skia のビルドでは、PATHEXT 環境変数に「.EXE」が含まれていることを前提としています。

## 強く推奨: clang-cl でビルド

Skia は、clang でビルドされた場合にのみ最適化される生成コードを使用します。他のコンパイラでは一般的な最適化されていないコードが使用されます。

clang-cl でビルドするためには、cc および cxx の gn 引数を設定するだけでは不十分です。これらの変数は Windows では無視されます。代わりに、変数 `clang_win` を LLVM インストールディレクトリに設定します。ここからダウンロードしたプレビルドの LLVM をデフォルトの場所にインストールした場合、それは次のようになります:

```sh
clang_win = "C:\Program Files\LLVM"
```

標準の Windows パス指定に従い、MinGW の規約は使用しないでください（例: `C:\Program Files\LLVM` であり、`/c/Program Files/LLVM` ではありません）。

プログラムの残りを Clang 以外のコンパイラでコンパイルする場合は、次の GN 引数も追加します:

```sh
is_trivial_abi = false
```

### Visual Studio Solutions

If you use Visual Studio, you may want to pass --ide=vs to bin/gn gen to generate all.sln. That solution will exist within the GN directory for the specific configuration, and will only build/run that configuration.

If you want a Visual Studio Solution that supports multiple GN configurations, there is a helper script. It requires that all of your GN directories be inside the out directory. First, create all of your GN configurations as usual. Pass --ide=vs when running bin/gn gen for each one. Then:

```sh
python3 gn/gn_meta_sln.py
```

This creates a new dedicated output directory and solution file out/sln/skia.sln. It has one solution configuration for each GN configuration, and supports building and running any of them. It also adjusts syntax highlighting of inactive code blocks based on preprocessor definitions from the selected solution configuration.

## Windows ARM64

これにより、新しい専用の出力ディレクトリとソリューションファイル `out/sln/skia.sln` が作成されます。各 GN 構成に対して1つのソリューション構成があり、それらのいずれかをビルドおよび実行することができます。また、選択したソリューション構成のプリプロセッサ定義に基づいて、非アクティブなコードブロックの構文ハイライトも調整されます。

## Windows ARM64

ARM 上の Windows 10 に対する初期の実験的サポートがあります。これには現在、（最新バージョンの）MSVC および Visual Studio インストーラーの ARM64 用の Visual C++ コンパイラとライブラリ個別コンポーネントが必要です。Googler 向けには、`win_toolchain` アセットに ARM64 コンパイラが含まれています。

そのツールチェーンを使用するには、`target_cpu` GN 引数を "arm64" に設定します。なお、OpenGL は ARM 上の Windows 10 ではサポートされていないため、Skia の GL バックエンドはスタブ化されており、機能しません。ANGLE はサポートされています:

```sh
bin/gn gen out/win-arm64 --args='target_cpu="arm64" skia_use_angle=true'
```

これにより、DM でソフトウェアまたは ANGLE バックエンドを使用できる Skia のビルドが生成されます。Viewer は `--backend angle` を指定して起動した場合にのみ動作します。これは、ソフトウェアバックエンドがウィンドウの内容を表示するために OpenGL を使用しようとするためです。

## CMake

CMake プロジェクト記述を好む IDE での使用を主な目的として、GN から CMake への翻訳機能を追加しました。これは開発以外の目的には向いていません。

```sh
bin/gn gen out/config --ide=json --json-ide-script=../../gn/gn_to_cmake.py
```