# インストール

> このドキュメントはLuaJIT 2.1用です。バージョン固有のドキュメントについては、各gitブランチのdocディレクトリを確認してください。

LuaJITはソースコードとしてのみ配布されています。gitリポジトリから入手してください。このページでは、LuaJITのバイナリとライブラリを異なるオペレーティングシステムでビルドおよびインストールする方法を説明します。

焦っている人のために（POSIXシステム上で）：

```sh
make && sudo make install
```

## 要件

LuaJITはほとんどのシステムでそのままビルドできます。サポートされているオペレーティングシステムとCPUアーキテクチャについては、ステータスページで確認してください。

LuaJITをビルドするには、GCC、Clang/LLVM、またはMSVC++に基づく最新のツールチェインが必要です。

MakefileベースのビルドシステムにはGNU Makeが必要で、クロスビルドをサポートしています。

MSVC++ビルドとコンソールクロスビルド用のバッチファイルが用意されています。

## LuaJITの設定

標準の設定は、ほとんどのインストールで問題なく動作するはずです。通常、設定を調整する必要はありません。以下のファイルにすべてのユーザー設定可能な設定が含まれています：

- MakefileにはLuaJITのインストール設定があります（POSIXのみ）。
- src/MakefileにはPOSIX、MinGW、またはCygwin下でLuaJITをコンパイルするための設定があります。
- src/msvcbuild.batにはMSVC（Visual Studio）でLuaJITをコンパイルするための設定があります。

設定を変更する前に、これらのファイルに記載されている指示を読んでください。

LuaJITの64ビットポートはデフォルトで64ビットGCオブジェクトを使用します（LJ_GC64）。x64では、makeコマンドにXCFLAGS=-DLUAJIT_DISABLE_GC64を追加することで、古い32-on-64ビットモードを選択できます。バイトコード形式の違いについての注意も確認してください。

## POSIXシステム（Linux、macOS、*BSDなど）

### 必要条件

配布によっては、コンパイラ（GCCまたはClang/LLVM）、開発ヘッダ、または完全なSDKのパッケージをインストールする必要がある場合があります。例えば、現在のDebian/Ubuntuでは、パッケージマネージャでbuild-essentialをインストールします。

### LuaJITのビルド

提供されたMakefileは、オペレーティングシステムとコンパイラに必要な設定を自動的に検出しようとします。GNU Makeで実行する必要があり、おそらくシステムのデフォルトです。単純に実行します：

``` sh
make
```

これは常にホストOSに依存するネイティブバイナリをビルドします。クロスコンパイルのセクションでより多くのオプションを確認してください。
デフォルトでは、モジュールは/usr/localのプレフィックスの下でのみ検索されます。

検索パスに追加のプレフィックスを追加するには、PREFIXオプションを追加します。例えば：

```sh
make PREFIX=/home/myself/lj2
```

macOSの注意：ツールチェーンでサポートされている値にMACOSX_DEPLOYMENT_TARGET環境変数を設定する必要があります：

```sh
MACOSX_DEPLOYMENT_TARGET=XX.YY make
```

### LuaJITのインストール

トップレベルのMakefileはデフォルトでLuaJITを/usr/localにインストールします。つまり、実行可能ファイルは/usr/local/binに配置されます。このパスに書き込むにはroot権限が必要です。したがって、システムにsudoがインストールされていると仮定して、次のコマンドを実行し、sudoパスワードを入力します：

```sh
sudo make install
```

それ以外の場合は、絶対パスとしてディレクトリプレフィックスを指定します。例えば：

```sh
make install PREFIX=/home/myself/lj2
```

明らかに、ビルド時とインストール時のプレフィックスは同じである必要があります。

## Windowsシステム

### 必要条件

オープンソースSDKの1つ（MinGWまたはCygwin）をインストールします。これには、必要な開発ヘッダーが含まれた修正されたGCCが含まれています。または、MicrosoftのVisual Studio（MSVC）をインストールします。

### MSVCでのビルド

"Visual Studio Command Prompt"（x86、x64、またはARM64）を開き、ソースコードのディレクトリにcdして、次のコマンドを実行します：

```sh
cd src
msvcbuild
```

より多くのオプションについてはmsvcbuild.batファイルを確認してください。その後、以下のインストール手順に従ってください。

x64からARM64へのクロスビルドを行うには、最初にこれを実行します：vcvarsall.bat x64_arm64

### MinGWまたはCygwinでのビルド

コマンドプロンプトウィンドウを開き、MinGWまたはCygwinのプログラムがパス内にあることを確認します。次に、gitリポジトリのディレクトリにcdします。MinGWの場合はこのコマンドを実行します：

```sh
mingw32-make
```

Cygwinの場合はこのコマンドを実行します：

```sh
make
```

その後、以下のインストール手順に従ってください。

### LuaJITのインストール

srcディレクトリでビルドされたluajit.exeとlua51.dllを新しく作成したディレクトリ（任意の場所で可）にコピーします。その下にluaとlua\jitディレクトリを追加し、配布物のsrc\jitディレクトリからすべてのLuaファイルを後者のディレクトリにコピーします。

絶対パス名はハードコードされていません。すべてのモジュールは、luajit.exeがインストールされているディレクトリに対して相対的にロードされます（src/luaconf.hを参照）。

## LuaJITのクロスコンパイル

まず、用語をいくつか明確にしましょう：

- ホスト：これは、通常x64またはx86 CPUに基づく開発システムです。
- ターゲット：これは、LuaJITを実行するターゲットシ

ステムです。例えば、Android/ARMです。
- ツールチェーン：これにはCコンパイラ、リンカー、アセンブラ、および一致するCライブラリが含まれます。
- ホスト（またはシステム）ツールチェーン：これは、ホストシステム用のネイティブバイナリをビルドするために使用されるツールチェーンです。
- クロスコンパイルツールチェーン：これは、ターゲットシステム用のバイナリをビルドするために使用されるツールチェーンです。これらはターゲットシステムでのみ実行できます。

GNU Makefileベースのビルドシステムは、任意のホストでサポートされているターゲットに対してクロスコンパイルを許可します：

- はい、ホストとターゲットの両方のためのツールチェーンが必要です！
- ホストとターゲットのアーキテクチャは同じポインタサイズを持っている必要があります。
- 例えば、64ビットホストで32ビットターゲットにクロスコンパイルしたい場合、multilib開発パッケージ（例：Debian/Ubuntuではlibc6-dev-i386）をインストールし、32ビットホスト部分をビルドする必要があります（HOST_CC="gcc -m32"）。
- 一部のディストリビューションでは、multilibはクロスコンパイラと競合します。回避策は、x86クロスコンパイラパッケージgcc-i686-linux-gnuをインストールし、それを使用してホスト部分をビルドすることです（HOST_CC=i686-linux-gnu-gcc）。
- 64ビットターゲットは常に64ビットホストでのコンパイルを必要とします。

ホストOSとターゲットOSが異なる場合、アセンブラやリンカーエラーを避けるためにTARGET_SYSを指定する必要があります：

- 例えば、組み込みLinuxまたはAndroid用にWindowsまたはmacOSホストでコンパイリングする場合、以下の例にTARGET_SYS=Linuxを追加する必要があります。
- 最小限のターゲットOSの場合、src/Makefileで組み込みのアロケータを無効にし、TARGET_SYS=Otherを使用する必要があります。
- インストールステップでも同じTARGET_SYSを指定することを忘れないでください。
ここでは、ホストとターゲットが同じCPUを持つ例をいくつか紹介します：

```sh
# マルチリブx64 OS上で32ビットバイナリにクロスコンパイル
make CC="gcc -m32"

# Debian/Ubuntu上でWindowsにクロスコンパイル（mingw32パッケージ）
make HOST_CC="gcc -m32" CROSS=i586-mingw32msvc- TARGET_SYS=Windows
```

CROSSプレフィックスを使用して、標準GNUクロスコンパイルツールチェーン（Binutils、GCC、および一致するlibc）を指定できます。プレフィックスは、ツールチェーンがビルドされた--targetに依存して異なる場合があります（CROSSプレフィックスには末尾に"-"があります）。以下の例では、Linux用の標準ツールチェーントリプレットを使用しています。

実行時にCPUの機能を検出する簡単な方法がしばしばないため、適切なCPUまたはアーキテクチャ設定でコンパイルすることが重要です：

- 一貫した結果を得る最良の方法は、ツールチェーンを自分でビルドする際に正しい設定を指定することです。
- あらかじめビルドされた汎用ツールチェーンには、TARGET_CFLAGSに `-mcpu=...` または `-march=...` およびその他必要なフラグを追加します。
- ARMでは、正しい `-mfloat-abi=...` 設定も重要です。さもないとLuaJITはターゲットCPUの全性能を発揮できない可能性があります。
- MIPSでは、サポートされているABI（MIPS32ではo32、MIPS64ではn64）を選択し、プロジェクトを一貫してhard-floatまたはsoft-floatのコンパイラ設定でコンパイルすることが重要です。

ホストと異なるCPUのターゲットの例をいくつか紹介します：

```sh
# ARM soft-float
make HOST_CC="gcc -m32" CROSS=arm-linux-gnueabi- \
     TARGET_CFLAGS="-mfloat-abi=soft"

# ARM soft-float ABI with VFP (Cortex-A9の例)
make HOST_CC="gcc -m32" CROSS=arm-linux-gnueabi- \
     TARGET_CFLAGS="-mcpu=cortex-a9 -mfloat-abi=softfp"

# ARM hard-float ABI with VFP (armhf、最も近代的なツールチェーン)
make HOST_CC="gcc -m32" CROSS=arm-linux-gnueabihf-

# ARM64
make CROSS=aarch64-linux-gnu-

# PPC
make HOST_CC="gcc -m32" CROSS=powerpc-linux-gnu-

# MIPS32 big-endian
make HOST_CC="gcc -m32" CROSS=mips-linux-gnu-
# MIPS32 little-endian
make HOST_CC="gcc -m32" CROSS=mipsel-linux-gnu-

# MIPS64 big-endian
make CROSS=mips-linux- TARGET_CFLAGS="-mips64r2 -mabi=64"
# MIPS64 little-endian
make CROSS=mipsel-linux- TARGET_CFLAGS="-mips64r2 -mabi=64"
```

Android NDKを使用してAndroid用にクロスコンパイルすることができます。環境変数をインストール場所と希望のターゲットプラットフォームに合わせて調整してください。例えば、Android 4.1はABIレベル16に対応しています。

```sh
# Android/ARM64、aarch64、Android 5.0+ (L)
NDKDIR=/opt/android/ndk
NDKBIN=$NDKDIR/toolchains/llvm/prebuilt/linux-x86_64/bin
NDKCROSS=$NDKBIN/aarch64-linux-android-
NDKCC=$NDKBIN/aarch64-linux-android21-clang
make CROSS=$NDKCROSS \
     STATIC_CC=$NDKCC DYNAMIC_CC="$NDKCC -fPIC" \
     TARGET_LD=$NDKCC TARGET_AR="$NDKBIN/llvm-ar rcus" \
     TARGET_STRIP=$NDKBIN/llvm-strip

# Android/ARM、armeabi-v7a (ARMv7 VFP)、Android 4.1+ (JB)
NDKDIR=/opt/android/ndk
NDKBIN=$NDKDIR/toolchains/llvm/prebuilt/linux-x86_64/bin
NDKCROSS=$NDKBIN/arm-linux-androideabi-
NDKCC=$NDKBIN/armv7a-linux-androideabi16-clang
make HOST_CC="gcc -m32" CROSS=$NDKCROSS \
     STATIC_CC=$NDKCC DYNAMIC_CC="$NDKCC -fPIC" \
     TARGET_LD=$NDKCC TARGET_AR="$NDKBIN/llvm-ar rcus" \
     TARGET_STRIP=$NDKBIN/llvm-strip
```

iOS SDKを使用してiOS 3.0+（iPhone/iPad）用にクロスコンパイルすることもできます：

::: info 注意
iOS用のJITコンパイラは無効にされています。通常のiOSアプリでは実行時にコードを生成することが許可されていないためです。そのため、iOSではLuaJITのインタープリタのパフォーマンスのみが得られます。これは通常のLuaよりも速いですが、JITコンパイラよりはかなり遅いです。Appleに不満を言ってください。またはAndroidを使ってください。:-p
:::

```sh
# iOS/ARM64
ISDKP=$(xcrun --sdk iphoneos --show-sdk-path)
ICC=$(xcrun --sdk iphoneos --find clang)
ISDKF="-arch arm64 -isysroot $ISDKP"
make DEFAULT_CC=clang CROSS="$(dirname $ICC)/" \
     TARGET_FLAGS="$ISDKF" TARGET_SYS=iOS
```

### コンソール用のクロスコンパイル

コンソール用のLuaJITをビルドするには、サポートされているホストコンパイラ（x86またはx64）と公式のコンソールSDKからのクロスコンパイラが必要です。

コンソールの制限により、JITコンパイラは無効にされ、高速なインタープリタのみがビルドされます。これは通常のLuaよりも速いですが、JITコンパイラよりはかなり遅いです。FFIも無効にされています。そのため、そのような環境ではあまり役に立ちません。

以下のコマンドは静的ライブラリlibluajit.aをビルドし、Luaライブラリと同様にゲームにリンクできます。

Linuxホスト（32ビットGCC、つまりマルチリブLinux/x64が必要）またはWindowsホスト（32ビットMinGWが必要）からPS3用にクロスコンパイルするには、このコマンドを実行します：

```sh
make HOST_CC="gcc -m32" CROSS=ppu-lv2-
```

他のコンソール用にWindowsホストからクロスコンパイルするには、「VS用ネイティブツールコマンドプロンプト」を開きます。ターゲットに合わせてホストコンパイラの32ビットまたは64ビットバージョンを選択する必要があります。次に、ソースコードの下のsrcディレクトリにcdし、表に記載されているビルドコマンドを実行します：

|コンソール|ビット|ビルドコマンド|
|---|---|---|
|PS4|64|ps4build|
|PS5|64|ps5build|
|PS Vita|32|psvitabuild|
|Xbox 360|32|xedkbuild|
|Xbox One|64|xb1build|
|Nintendo Switch NX32|32|nxbuild|
|Nintendo Switch NX64|64|nxbuild|

詳細については、対応する*.batファイルのコメントを確認してください。

## LuaJITの組み込み

LuaJITはLua 5.1とAPI互換性があります。既にLuaをアプリケーションに組み込んでいる場合、異なるライブラリでリンクする以外にLuaJITに切り替えるために何もする必要はないかもしれません：

- LuaJITを個別にビルドすることを強くお勧めします。ビルドシステムで提供されているものを使用してください。個々のソースファイルをビルドツリーに統

合しようとすることはお勧めしません。内部ビルドの依存関係を間違えるか、コンパイラフラグを乱す可能性があります。LuaJITを他の外部ライブラリと同様に扱い、ニーズに応じて動的または静的ライブラリでアプリケーションをリンクしてください。
- 通常のLuaでコンパイルされたCモジュールを `require()` で読み込む場合、公開シンボル（例えば `lua_pushnumber`）もエクスポートされている必要があります：
  - POSIXシステムでは、共有ライブラリにリンクするか、静的ライブラリをアプリケーションにリンクすることができます。後者の場合、主実行ファイルからすべての公開シンボルをエクスポートする必要があります（例：Linuxでは `-Wl,-E`）し、外部依存関係を追加する必要があります（例：Linuxでは `-lm -ldl`）。
  - Windowsではシンボルが特定のDLL名にバインドされているため、LuaJITビルドによって作成された `lua51.dll` にリンクする必要があります（DLLの名前を変更しないでください）。Windows上でLuaJITを静的にリンクすることは、実行時にLua/Cモジュールをロードするつもりがない場合のみ可能です。

C API関数を使用してLuaJITを初期化するための追加のヒント：

- LuaまたはLuaJITをアプリケーションに組み込むためのシンプルな例がこちらです。
- `luaL_newstate` の使用を確認してください。これは、（遅い）デフォルトのメモリアロケータを使用する `lua_newstate` の使用を避けるためです（64ビットアーキテクチャではサポートされていません）。
- `luaopen_base` などを直接呼び出す古いLua 5.0スタイルではなく、`luaL_openlibs` を使用してください。
- 標準ライブラリのロードリストを変更または拡張するには、`src/lib_init.c` をプロジェクトにコピーしてそれに応じて変更してください。JITコンパイラをアクティブにするには、jitライブラリがロードされていることを確認してください。
- ビット単位の操作のための `bit.*` モジュールは既に組み込まれています。Lua BitOpをアプリケーションに静的にリンクする必要はありません。

## ディストリビューションメンテナー向けのヒント

LuaJITビルドシステムは、ほとんどのPOSIXベースのディストリビューションのニーズに対応するための追加機能を備えています。ディストリビューションのパッケージメンテナーの場合は、これらの機能を利用して、ビルドシステムを不適切な方法でパッチ適用、回避、autotoolizing、乱用することを避けてください。

luaconf.hやMakefileをパッチする必要は絶対にありません。また、パッケージ用にファイルを選び出すこともしないでください。単に `make install` が生成するものを使用してください。それが作成する全てのファイルやディレクトリには理由があります。

ビルドシステムはGNU makeを使用し、ビルドするホストに基づいてほとんどの設定を自動検出します。これは、サンドボックス環境でも、ネイティブビルドに対してうまく機能するはずです。通常の配布ビルドのために、以下のフラグを `make` および `make install` コマンドラインの両方に渡す必要があるかもしれません：

- `PREFIX` はインストールパスを上書きし、通常は `/usr` に設定されるべきです。これを設定すると、モジュールパスと共有ライブラリを見つけるためのパスも変更されます。
- `DESTDIR` は絶対パスで、ビルドシステムのルートツリーではなくシャドウツリーにインストールすることを可能にします。
- `MULTILIB` はマルチリブシステムのためのアーキテクチャ固有のライブラリパスコンポーネントを設定します。デフォルトは `lib` です。
- トップレベルのMakefileとsrc/Makefileを見て、調整可能な追加の変数を確認してください。以下の変数は上書き可能ですが、クロスビルドのような特別なニーズがない限り推奨されません：`BUILDMODE`、`CC`、`HOST_CC`、`STATIC_CC`、`DYNAMIC_CC`、`CFLAGS`、`HOST_CFLAGS`、`TARGET_CFLAGS`、`LDFLAGS`、`HOST_LDFLAGS`、`TARGET_LDFLAGS`、`TARGET_SHLDFLAGS`、`TARGET_FLAGS`、`LIBS`、`HOST_LIBS`、`TARGET_LIBS`、`CROSS`、`HOST_SYS`、`TARGET_SYS`

ビルドシステムには統合ビルド用の特別なターゲット、すなわち `make amalg` があります。これはLuaJITのコアを一つの大きなCファイルとしてコンパイルし、GCCによりより速く、より短いコードを生成させます。残念ながら、これにはビルド中に多くのメモリを必要とします。これが一部のユーザーにとって問題となる可能性がありますが、デフォルトで有効にはされていません。しかし、ほとんどのビルドファームでは問題になることはありません。バイナリ配布ではこのターゲットをLuaJITビルドに使用することを推奨します。

上記の要約：

```sh
make amalg PREFIX=/usr && \
make install PREFIX=/usr DESTDIR=/tmp/buildroot
```

最後に、もし何か問題に遭遇したら、予期せぬユーザーに不完全なパッケージをリリースするのではなく、まず私に連絡してください。というのも、通常、彼ら（ユーザー）はあなた（パッケージメンテナ）ではなく私（上流）に文句を言うからです。