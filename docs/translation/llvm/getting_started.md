# LLVMシステム入門

## 概要

LLVMプロジェクトへようこそ！

LLVMプロジェクトには複数のコンポーネントがあります。プロジェクトの中核は "LLVM "と呼ばれるものです。これには、中間表現を処理してオブジェクト・ファイルに変換するために必要なツール、ライブラリ、ヘッダーファイルのすべてが含まれています。ツールには、アセンブラ、逆アセンブラ、ビットコードアナライザ、ビットコードオプティマイザが含まれる。また、基本的なリグレッション・テストも含まれている。

Cライクな言語はClangフロントエンドを使う。このコンポーネントは、C、C++、Objective C、Objective C++のコードをLLVMビットコードにコンパイルし、そこからLLVMを使ってオブジェクト・ファイルにコンパイルする。

その他のコンポーネントには、libc++ C++標準ライブラリー、LLDリンカーなどがある。

## ソースコードの入手とLLVMのビルド

1. LLVM（Clangのようなサブプロジェクトを含む）をチェックアウトする:

```sh
git clone https://github.com/llvm/llvm-project.git
```

Windowsでは:

```sh
git clone --config core.autocrlf=false https://github.com/llvm/llvm-project.git
```

ストレージを節約し、チェックアウト時間を短縮するために、浅いクローンを行いたい場合がある。例えば、LLVMプロジェクトの最新リビジョンを取得するには

```sh
git clone --depth 1 https://github.com/llvm/llvm-project.git
```

2. LLVMとClangの設定とビルド:

```sh
cd llvm-project
cmake -S llvm -B build -G <generator> [options]
```

一般的なビルド・システム・ジェネレーターには次のようなものがある:

- Ninja - Ninja のビルドファイルを生成します。ほとんどの llvm 開発者は Ninja を使っています。
- Unix Makefiles - make 互換の並列 makefile を生成します。
- Visual Studio - Visual Studio プロジェクトとソリューションを生成します。
- Xcode - Xcodeプロジェクトを生成します。
- より包括的なリストは CMake docs を参照してください。

一般的なオプション:

- `-DLLVM_ENABLE_PROJECTS='...'` — 追加でビルドしたいLLVMサブプロジェクトのセミコロン区切りのリスト。clang、clang-tools-extra、lldb、lld、polly、cross-project-testsのいずれかを含めることができます。例えば、LLVM、Clang、LLDをビルドするには、`-DLLVM_ENABLE_PROJECTS="clang;lld"`とします。
- `-DCMAKE_INSTALL_PREFIX=directory` — ディレクトリには、LLVMツールとライブラリをインストールする場所のフルパス名を指定します（デフォルトは`/usr/local`）。
- `-DCMAKE_BUILD_TYPE=type` — ビルドの最適化レベルとデバッグ情報を制御します。有効なオプションは Debug、Release、RelWithDebInfo、MinSizeRel です。詳細は CMAKE_BUILD_TYPE を参照してください。
- `DLLVM_ENABLE_ASSERTIONS=ON` — アサーション・チェックを有効にしてコンパイルする（デフォルトはDebugビルドでON、その他のビルド・タイプではOFF）。
- `DLLVM_USE_LINKER=lld` — あなたのシステムにlldリンカーがインストールされていれば、それを使ってリンクする。デフォルトのリンカーが遅い場合、これでリンク時間を劇的に短縮できる。
- `DLLVM_PARALLEL_{COMPILE,LINK}_JOBS=N` — 同時に並行して実行されるコンパイル/リンクジョブの数を制限する。リンクは大量のメモリーを使用することがあるため、これはリンクにおいて特に重要です。LLVMのビルドでメモリの問題に遭遇した場合は、同時に実行するコンパイル／リンク・ジョブの最大数を制限するように設定してみてください。

```sh
cmake --build build [--target <target>]
```

または上記で指定したビルドシステムを直接使用する。

- デフォルトのターゲット (`cmake --build build` または `make -C build`) は LLVM のすべてをビルドする。
- check-allターゲット（`ninja check-all`）はリグレッションテストを実行し、すべてが正常に動作することを確認します。
- CMakeは各ツールとライブラリのビルドターゲットを生成し、ほとんどのLLVMサブプロジェクトは独自の `check-<project>` ターゲットを生成します。
- シリアル・ビルドを実行すると遅くなります。速度を改善するには、並列ビルドを試してください。Ninjaではデフォルトで並列ビルドが実行されます。makeでは `-j NN` オプションを使います。NNは並列ジョブの数で、例えば利用可能なCPUの数です。

LLVMのみをビルドし、他のサブプロジェクトはビルドしない、基本的なCMakeとビルド/テストの呼び出し:

```sh
cmake -S llvm -B build -G Ninja -DCMAKE_BUILD_TYPE=Debug
ninja -C build check-llvm
```

これにより、デバッグ情報を含むLLVMビルドがセットアップされ、LLVMがコンパイルされ、LLVMテストが実行される。

- CMakeオプションの詳細については、CMakeを参照してください。
- ビルドやテストに失敗した場合は、以下を参照してください。

LLVMの設定とコンパイルの詳細については、「LLVMを始める」のセクションを参照してください。ソースコード・ツリーのレイアウトについては、「ディレクトリのレイアウト」を参照してください。

### スタンドアローン・ビルド

スタンドアロン・ビルドは、あなたのシステムにすでに存在するclangやllvmライブラリのビルド済みバージョンに対してサブプロジェクトをビルドすることを可能にします。

スタンドアロンビルドを行うには、llvm-project の標準チェックアウトからソースコードを使うことができます（上で説明しました）。

スタンドアロンビルドを行うには、他のプロジェクトのスタンドアロンビルドで利用できるように適切に設定された llvm インストールが必要です。これは、ディストロが提供するLLVMインストールでもよいし、次のように自分でビルドしてもよい:

```sh
cmake -G Ninja -S path/to/llvm-project/llvm -B $builddir \
      -DLLVM_INSTALL_UTILS=ON \
      -DCMAKE_INSTALL_PREFIX=/path/to/llvm/install/prefix \
      < other options >

ninja -C $builddir install
```

llvmをインストールしたら、スタンドアロンビルド用にプロジェクトを設定するために、CMakeを次のように起動します。:

```sh
cmake -G Ninja -S path/to/llvm-project/$subproj \
      -B $buildir_subproj \
      -DLLVM_EXTERNAL_LIT=/path/to/lit \
      -DLLVM_ROOT=/path/to/llvm/install/prefix
```

注目してください：

- スタンドアロンビルドは、LLVMNがビルドされた元のフォルダではないフォルダで行う必要があります（`$builddir!=$builddir_subproj`）。
- `LLVM_ROOT`はllvmのインストール先の接頭辞を指す必要があります。例えば、llvmが`/usr/bin`と`/usr/lib64`にインストールされている場合、`-DLVM_ROOT=/usr/`を渡す必要があります。
- `LLVM_ROOT`オプションと`LLVM_EXTERNAL_LIT`オプションは、すべてのサブプロジェクトのスタンドアロンビルドを行うために必要です。各サブ・プロジェクトに必要なその他のオプションは、以下の表にある。

`check-$subproj`と`install`ビルド・ターゲットは、以下の表に記載されているサブ・プロジェクトでサポートされています。

| Sub-Project | Required Sub-Directories | Required CMake Options                                     |
|-------------|--------------------------|------------------------------------------------------------|
| llvm        | llvm, cmake, third-party | `LLVM_INSTALL_UTILS=ON`                                    |
| clang       | clang, cmake             | `CLANG_INCLUDE_TESTS=ON` (Required for `check-clang` only) |
| lld         | lld, cmake               |                                                            |

スタンドアロン `clang` のビルド例:

```sh
#!/bin/sh

build_llvm=`pwd`/build-llvm
build_clang=`pwd`/build-clang
installprefix=`pwd`/install
llvm=`pwd`/llvm-project
mkdir -p $build_llvm
mkdir -p $installprefix

cmake -G Ninja -S $llvm/llvm -B $build_llvm \
      -DLLVM_INSTALL_UTILS=ON \
      -DCMAKE_INSTALL_PREFIX=$installprefix \
      -DCMAKE_BUILD_TYPE=Release

ninja -C $build_llvm install

cmake -G Ninja -S $llvm/clang -B $build_clang \
      -DLLVM_EXTERNAL_LIT=$build_llvm/utils/lit \
      -DLLVM_ROOT=$installprefix

ninja -C $build_clang
```

## 必要条件

LLVMシステムを使い始める前に、以下の要件を確認してください。どのようなハードウェアとソフトウェアが必要かを前もって知っておくことで、トラブルを避けることができるかもしれません。

### ハードウェア

LLVMは以下のホスト・プラットフォームで動作することが知られている:

| OS           | Arch            | Compilers     |
|--------------|-----------------|---------------|
| Linux        | x86(1)          | GCC, Clang    |
| Linux        | amd64           | GCC, Clang    |
| Linux        | ARM             | GCC, Clang    |
| Linux        | Mips            | GCC, Clang    |
| Linux        | PowerPC         | GCC, Clang    |
| Linux        | SystemZ         | GCC, Clang    |
| Solaris      | V9 (Ultrasparc) | GCC           |
| DragonFlyBSD | amd64           | GCC, Clang    |
| FreeBSD      | x86(1)          | GCC, Clang    |
| FreeBSD      | amd64           | GCC, Clang    |
| NetBSD       | x86(1)          | GCC, Clang    |
| NetBSD       | amd64           | GCC, Clang    |
| OpenBSD      | x86(1)          | GCC, Clang    |
| OpenBSD      | amd64           | GCC, Clang    |
| macOS(2)     | PowerPC         | GCC           |
| macOS        | x86             | GCC, Clang    |
| Cygwin/Win32 | x86(1, 3)       | GCC           |
| Windows      | x86(1)          | Visual Studio |
| Windows x64  | x86-64          | Visual Studio |

::: info 備考

1. Pentiumプロセッサー以上でコード生成をサポート
2. コード生成は32ビットABIのみサポート
3. Win32ベースのシステムでLLVMモジュールを使用するには、`-DBUILD_SHARED_LIBS=On`でLLVMを設定することができます。

:::

デバッグビルドには多くの時間とディスク容量が必要であることに注意してください。LLVMのみのビルドの場合、1～3GB程度のスペースが必要です。LLVMとClangの完全なビルドには、約15～20GBのディスク・スペースが必要です。正確な必要容量はシステムによって異なります。(これは、すべてのデバッグ情報と、ライブラリーが複数のツールに静的にリンクされているためです)。

スペースに制約がある場合は、選択したツールまたは選択したターゲットのみをビルドすることができます。Releaseビルドでは、かなり少ないスペースで済みます。

LLVMスイートは他のプラットフォームでもコンパイルできる可能性がありますが、その保証はありません。コンパイルが成功すれば、LLVMユーティリティはLLVMビットコードをアセンブル、逆アセンブル、解析、最適化できるはずです。コード生成も同様に動作するはずだが、生成されたネイティブ・コードはあなたのプラットフォームでは動作しないかもしれない。

### ソフトウェア

LLVMをコンパイルするには、いくつかのソフトウェア・パッケージがインストールされている必要があります。以下の表は、それらの必要なパッケージの一覧です。Packageの列は、LLVMが依存するソフトウェア・パッケージの通常の名前です。Versionの列には、パッケージの「動作確認済み」バージョンが記載されています。Notes列には、LLVMがそのパッケージをどのように使用するか、その他の詳細が記載されています。

| Package  | Version          | Notes                        |
|----------|------------------|------------------------------|
| CMake    | `>=3.20.0`       | Makefile/workspace generator |
| GCC      | `>=7.1.0`        | C/C++ compiler(1)            |
| python   | `>=3.6`          | Automated test suite(2)      |
| zlib     | `>=1.2.3.4`      | Compression library(3)       |
| GNU Make | `3.79`, `3.79.1` | Makefile/build processor(4)  |

::: info 備考

1. 必要なのはC言語とC++言語だけなので、LLVMの目的のために他の言語をビルドする必要はない。具体的なバージョン情報については以下を参照のこと。
2. llvm/test`ディレクトリで自動テストスイートを実行したい場合にのみ必要。
3. オプションで、選択したLLVMツールに圧縮/解凍機能を追加します。
4. オプションで、CMake がサポートしている他のビルドツールを使うことができます。

:::

さらに、コンパイル・ホストには、通常のUnixユーティリティの数々があることが期待される。具体的には:

- ar — アーカイブ・ライブラリー・ビルダー
- bzip2 — ディストリビューション生成用bzip2コマンド
- bunzip2 — bunzip2コマンドによる配布チェック
- chmod — ファイルのパーミッションを変更する
- cat — 出力連結ユーティリティ
- cp — コピーファイル
- date — 現在の日時を表示する
- echo — 標準出力にプリントする
- egrep — 拡張正規表現検索ユーティリティ
- find — ファイルシステム内のファイル/ディレクトリを検索する
- grep — 正規表現検索ユーティリティ
- gzip — 配信生成用gzipコマンド
- gunzip — 配布チェックのためのgunzipコマンド
- install — インストール・ディレクトリ/ファイル
- mkdir — ディレクトリを作成する
- mv — ファイルを移動する
- ranlib — アーカイブライブラリ用シンボルテーブルビルダー
- rm — ファイルとディレクトリを削除する
- sed — 出力を変換するストリームエディター
- sh — make ビルドスクリプト用ボーンシェル
- tar — 配信用テープアーカイブ
- test — ファイルシステムでテストする
- unzip — 配布チェックのためのunzipコマンド
- zip — ディストリビューション生成用zipコマンド

### ホストC++ツールチェーン（コンパイラと標準ライブラリの両方）

LLVMはホストとなるC++コンパイラに対して非常に厳しい要求をしており、そのためコンパイラのバグが露呈しがちである。また、C++言語とライブラリの改良と開発にも、それなりに忠実に従おうとしています。そのため、LLVMをビルドするには、コンパイラと標準ライブラリの両方を含む最新のホストC++ツールチェーンが必要です。

LLVMは、コーディング標準に文書化されているC++のサブセットを使用して記述されています。この言語バージョンを強制するため、ビルド・システムでは、最もよく使われるホスト・ツールチェインの特定の最小バージョンをチェックしている：

- Clang 5.0
- Apple Clang 10.0
- GCC 7.1
- Visual Studio 2019 16.7

これらのツールチェーンより古いものは動作するかもしれないが、特別なオプションでビルド・システムを強制する必要があり、実際にサポートされているホスト・プラットフォームではない。また、これらのコンパイラーの古いバージョンは、しばしばLLVMをクラッシュさせたり、ミスコンパイルさせたりすることに注意してください。

ICCやxlCのようなあまり広く使われていないホスト・ツールチェインの場合、LLVMで使われているC++の機能をすべてサポートするには、非常に新しいバージョンが必要になることがあるので注意してください。

私たちは、ホストツールチェインの一部として使用されたときに失敗することが知られているソフトウェアの特定のバージョンを追跡しています。これにはリンカーも含まれることがあります。

GNU ld 2.16.X. いくつかの2.16.Xバージョンのldリンカーは、".gnu.linkonce.t.*"シンボルが破棄されたセクションに定義されているという、非常に長い警告メッセージを出力します。これらのメッセージは誤りで、リンケージは正しいので、無視しても大丈夫です。これらのメッセージは、ld 2.17を使うと消える。

GNU binutils 2.17: Binutils 2.17には、LLVMをビルドするときにリンクに膨大な時間(秒ではなく分)がかかるバグがあります。新しいバージョン(2.17.50.0.4以降)にアップグレードすることを推奨します。

GNU Binutils 2.19.1 Gold：このバージョンのGoldには、位置に依存しないコードでLLVMをビルドする際に断続的に失敗するバグが含まれています。症状は周期的依存性に関するエラーです。新しいバージョンのGoldにアップグレードすることをお勧めします。

#### 最新のホストC++ツールチェーンの入手

このセクションは、主にLinuxと古いBSDに適用されます。macOSでは、十分に最新のXcodeがあるはずで、そうなるまでアップグレードが必要になる可能性が高い。Windowsには「システム・コンパイラ」がないので、Visual Studio 2019（またはそれ以降）か、mingw64の最新バージョンのいずれかをインストールする必要があります。FreeBSD 10.0以降には、システム・コンパイラとして最新のClangがあります。

しかし、一部のLinuxディストリビューションや他の、あるいは古いBSDでは、GCCのバージョンが非常に古いことがあります。これらの手順は、そのようなシステムであってもコンパイラをアップグレードする手助けをしようとするものです。しかし、可能な限り、これらの要件を満たす最新のシステム・コンパイラを搭載した最近のバージョンのディストリビューションを使うことをお勧めします。ホスト・コンパイラとしてClangとlibc++の以前のバージョンをインストールするのは魅力的ですが、libc++は比較的最近までLinux上でビルドするための十分なテストやセットアップが行われていなかったことに注意してください。そのため、このガイドでは、ブートストラップの最初のホストとしてlibstdc++と最新のGCCを使い、その後Clang（と潜在的にはlibc++）を使うことを提案します。

最初のステップは、最近のGCCツールチェーンをインストールすることです。バージョン要件でユーザーが苦労している最も一般的なディストリビューションは、Ubuntu Precise, 12.04 LTSです。このディストリビューションの場合、1つの簡単なオプションは、ツールチェーンテストPPAをインストールし、それを使って最新のGCCをインストールすることです。この方法については、ask ubuntu stack exchangeや、更新されたコマンドを含むgithub gistに、とても良い議論があります。しかし、すべてのユーザがPPAを使えるわけではなく、他にも多くのディストリビューションがあるので、ソースからGCCをビルドしてインストールすることが必要かもしれません（あるいは、あなたがここにいるのであれば、結局のところコンパイラ開発をしているのですから、単に便利なだけかもしれません）。また、最近はとても簡単です。

GCC 7.1.0をインストールする簡単な手順:

```sh
% gcc_version=7.1.0
% wget https://ftp.gnu.org/gnu/gcc/gcc-${gcc_version}/gcc-${gcc_version}.tar.bz2
% wget https://ftp.gnu.org/gnu/gcc/gcc-${gcc_version}/gcc-${gcc_version}.tar.bz2.sig
% wget https://ftp.gnu.org/gnu/gnu-keyring.gpg
% signature_invalid=`gpg --verify --no-default-keyring --keyring ./gnu-keyring.gpg gcc-${gcc_version}.tar.bz2.sig`
% if [ $signature_invalid ]; then echo "Invalid signature" ; exit 1 ; fi
% tar -xvjf gcc-${gcc_version}.tar.bz2
% cd gcc-${gcc_version}
% ./contrib/download_prerequisites
% cd ..
% mkdir gcc-${gcc_version}-build
% cd gcc-${gcc_version}-build
% $PWD/../gcc-${gcc_version}/configure --prefix=$HOME/toolchains --enable-languages=c,c++
% make -j$(nproc)
% make install
```

詳細については、私がこの情報のほとんどをここから得た、優れたGCC wikiのエントリーをチェックしてほしい。

GCCツールチェーンを入手したら、ホスト・コンパイラとC++標準ライブラリに新しいツールチェーンを使用するように、LLVMのビルドを設定する。新バージョンのlibstdc++はシステム・ライブラリの検索パス上にないため、リンク時（`-L`）と実行時（`-rpath`）に見つけられるように、追加のリンカ・フラグを渡す必要がある。CMakeを使用している場合、この呼び出しによって動作するバイナリが生成されるはずです：

```sh
% mkdir build
% cd build
% CC=$HOME/toolchains/bin/gcc CXX=$HOME/toolchains/bin/g++ \
  cmake .. -DCMAKE_CXX_LINK_FLAGS="-Wl,-rpath,$HOME/toolchains/lib64 -L$HOME/toolchains/lib64"
```

`-rpath`の設定に失敗すると、ほとんどのLLVMバイナリーは起動時にローダーから` libstdc++.so.6`: `version 'GLIBCXX_3.4.20' not found`のようなメッセージが表示されて失敗する。これは、`-rpath`リンカー・フラグを調整する必要があることを意味する。

この方法では、すべての実行ファイルのrpathに絶対パスが追加される。ローカルで開発する分には問題ない。ビルドしたバイナリを古いシステムでも動作するように配布したい場合は、`libstdc++.so.6` を `lib/` ディレクトリにコピーする。LLVMの出荷バイナリはすべてrpathが `$ORIGIN/../lib` を指しているので、そこで `libstdc++.so.6` を見つけることができる。非配布バイナリはrpathが設定されていないので、`libstdc++.so.6`は見つからない。cmake に `-DLLVM_LOCAL_RPATH="$HOME/toolchains/lib64"` を渡すと、上記のように `libstdc++.so.6` への絶対パスが追加される。これらのバイナリは配布されないので、ローカルに絶対パスがあっても問題ない。

Clangをビルドするときに、ブートストラップの一部として新しいホストとして使うために、モダンなC++標準ライブラリにアクセスできるようにする必要があります。Clangと一緒にlibc++をビルドして（インストールして）、コンパイルとリンクのフラグを`-stdlib=libc++`にして使うか、GCCと同じプレフィックス（上の`$HOME/toolchains`）にClangをインストールするかです。Clangは自分のプレフィックス内でlibstdc++を探し、見つかったらそれを使います。また、`--gcc-toolchain=/opt/my/gcc/prefix` フラグで、Clang が GCC ツールチェーンを探すための接頭辞を明示的に追加できます。

## LLVM入門

このガイドの残りの部分は、LLVMを使い始め、LLVM環境についての基本的な情報を提供するためのものです。

このガイドの後のセクションでは、LLVMソース・ツリーの一般的なレイアウト、LLVMツール・チェーンを使用した簡単な例、LLVMに関する詳細情報を検索したり、電子メールでヘルプを入手したりするためのリンクについて説明します。

### 用語と表記

このマニュアルでは、ローカルシステムと作業環境に固有のパスを示すために、以下の名前を使用します。これらは、あなたが設定する必要のある環境変数ではなく、以下の本書の残りの部分で使用される単なる文字列です。以下のどの例でも、これらの名前をローカルシステム上の適切なパス名に置き換えるだけでよい。これらのパスはすべて絶対パスです：

`SRC_ROOT`

これはLLVMソース・ツリーのトップ・レベルのディレクトリです。

`OBJ_ROOT`

LLVMオブジェクトツリーのトップレベルのディレクトリ（オブジェクトファイルとコンパイルされたプログラムが置かれるツリー）。SRC_ROOTと同じにすることもできる）。

### LLVMアーカイブの解凍

LLVMディストリビューションをお持ちの場合、コンパイルを始める前に解凍する必要があります。LLVMはいくつかの異なるサブプロジェクトとして配布されています。それぞれ、gzipプログラムで圧縮されたTARアーカイブがダウンロードされます。

ファイルは以下の通りで、x.yはバージョン番号を示している：

```sh
llvm-x.y.tar.gz
```

LLVMライブラリとツールのソースリリース。

```sh
cfe-x.y.tar.gz
```

Clangフロントエンドのソースリリース。

### GitからLLVMをチェックアウトする

GitからLLVMのソースコードをチェックアウトすることもできます。

::: info 備考

``.gitattribute` の設定を正しく調整すれば、将来的には `--config core.autocrlf=false` を渡す必要はなくなりますが、この記事を書いている時点ではWindowsユーザーには必要です。

:::

単に実行する:

```sh
git clone https://github.com/llvm/llvm-project.git
```

またはWindowsの場合:

```sh
git clone --config core.autocrlf=false https://github.com/llvm/llvm-project.git
```

これにより、カレント・ディレクトリに'llvm-project'ディレクトリが作成され、LLVMと関連するすべてのサブプロジェクトのソースコード、テスト・ディレクトリ、ドキュメント・ファイルのローカル・コピーがすべて含まれるようになります。各サブプロジェクトが別々のファイルに含まれている tarball とは異なり、git リポジトリにはすべてのプロジェクトが一緒に含まれていることに注意してください。

最新のリビジョンではなく）特定のリリースを取得したい場合は、リポジトリをクローンした後でタグをチェックアウトできます。例えば、上のコマンドで作成した llvm-project ディレクトリ内の `llvmorg-6.0.1` を `git checkout` します。`git tag -l` を使って、すべてのタグをリストアップします。

#### パッチの送信

コントリビューションを参照してください。

#### コミットを二分する

LLVM で `git bisect` を使う方法については LLVM コードのバイセクト を参照してください。

#### 変更の取り消し

git を使って変更を取り消す場合、デフォルトのメッセージは「This reverts commit XYZ」となります。このメッセージはコミットメッセージの最後に書きますが、その前になぜそのコミットを取り消すのかについての詳細を書きます。簡単な説明や問題を示すボットへのリンクで十分です。

### ローカルLLVM設定

リポジトリをチェックアウトしたら、ビルドする前にLLVMスイートのソースコードを設定する必要がある。このプロセスにはCMakeを使用します。通常の`configure`スクリプトを使わないで、CMakeはあなたが要求したフォーマットでビルドファイルと、様々な`*.inc`ファイル、`llvm/include/llvm/Config/config.h.cmake`を生成します。

変数はコマンドラインで `-D<variable name>=<value>` という形式で cmake に渡します。以下の変数はLLVMを開発している人がよく使うオプションです。

| Variable                | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CMAKE_C_COMPILER`        | 使用するCコンパイラーをcmakeに指示する。デフォルトでは `/usr/bin/cc` となる。                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `CMAKE_CXX_COMPILER`      | 使用するC++コンパイラーをcmakeに指示する。デフォルトでは `/usr/bin/c++` となる。                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `CMAKE_BUILD_TYPE`        | cmake に、ファイルを生成するビルドのタイプを指定します。有効なオプションは、`Debug`、`Release`、`RelWithDebInfo`、および `MinSizeRel` です。デフォルトは`Debug`です。                                                                                                                                                                                                                                                                                                                                                                        |
| `CMAKE_INSTALL_PREFIX`    | ビルドファイルのインストールアクションを実行する際にターゲットとするインストールディレクトリを指定します。                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `Python3_EXECUTABLE`      | Python インタプリタへのパスを渡すことで、CMake に特定の Python バージョンを使わせます。デフォルトでは、PATH にあるインタプリタの Python バージョンが使われます。                                                                                                                                                                                                                                                                                                                                                                 |
| `LLVM_TARGETS_TO_BUILD`   | セミコロンで区切られたリストで、どのターゲットをビルドしてllvmにリンクするかを制御します。デフォルトのリストは`LLVM_ALL_TARGETS`として定義され、ツリー外のターゲットを含むように設定できます。デフォルト値には`AArch64`、`AMDGPU`、`ARM`、`AVR`、`BPF`、`Hexagon`、`Lanai`、`Mips`、`MSP430`、`NVPTX`、`PowerPC`、`RISCV`、`Sparc`、`SystemZ`、`WebAssembly`、`X86`、`XCore`。これを `"host"`に設定すると、ホスト・アーキテクチャのみがコンパイルされます（例えば、x86ホスト・マシンで`X86`を指定するのと同じです）。これにより、コンパイルとテストの時間が大幅に短縮されます。|
| LLVM_ENABLE_DOXYGEN     | ソースコードからdoxygenベースのドキュメントをビルドする 時間がかかり、多くの出力を生成するため、デフォルトでは無効になっています。                                                                                                                                                                                                                                                                                                                                                                                            |
| `LLVM_ENABLE_PROJECTS`    | セミコロンで区切られたリストで、どのLLVMサブプロジェクトを追加ビルドするかを選択します。(git経由などでサイドバイサイドのプロジェクトレイアウトを使用する場合にのみ有効です)。デフォルトのリストは空です。指定できるのは、`clang`、`clang-tools-extra`、`cross-project-tests`、`flang`、`libc`、`libclc`、`lld`、`lldb`、`mlir`、`openmp`、`polly`、`pstl`です。                                                                                                                                                                                                    |
| `LLVM_ENABLE_RUNTIMES`    | どのランタイムをビルドするかを選択するセミコロン区切りのリスト。(完全なモノレポ・レイアウトを使用する場合のみ有効)。デフォルトのリストは空です。`compiler-rt`、`libc`、`libcxx`、`libcxxabi`、`libunwind`、または`openmp`を含めることができる。                                                                                                                                                                                                                                                                                                  |
| `LLVM_ENABLE_SPHINX`      | ソースコードからsphinxベースのドキュメントをビルドする。これは遅く、多くの出力を生成するため、デフォルトでは無効になっています。Sphinxバージョン1.5以降を推奨します。                                                                                                                                                                                                                                                                                                                                                   |
| `LLVM_BUILD_LLVM_DYLIB`   | `libLLVM.so`を生成する。このライブラリにはLLVMコンポーネントのデフォルト・セットが含まれており、`LLVM_DYLIB_COMPONENTS`でオーバーライドできる。デフォルトはLLVMのほとんどを含み、`tools/llvm-shlib/CMakelists.txt`で定義されている。このオプションはWindowsでは使用できません。                                                                                                                                                                                                                                                                    |
| `LLVM_OPTIMIZED_TABLEGEN` | LLVMビルド中に使用されるリリース・テーブルジェンをビルドする。これにより、デバッグ・ビルドが劇的に速くなる。                                                                                                                                                                                                                                                                                                                                                                                                                    |

LLVMを設定するには、以下の手順に従ってください：

1. ディレクトリをオブジェクト・ルート・ディレクトリに変更する：

```sh
% cd OBJ_ROOT
```

2. cmakeを実行する：

```sh
% cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=<type> -DCMAKE_INSTALL_PREFIX=/install/path
  [other options] SRC_ROOT
```

### LLVMスイート・ソース・コードのコンパイル

オートツールとは異なり、CMakeではビルドタイプは設定時に定義されます。ビルドタイプを変更したい場合は、以下のコマンドでcmakeを再実行します：

```sh
% cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=<type> SRC_ROOT
```

実行の間、CMake はすべてのオプションに設定された値を保持します。CMakeには以下のビルドタイプが定義されています：

`Debug`

これらのビルドがデフォルトである。ビルド・システムは、デバッグ情報とアサートが有効な状態で、最適化されていないツールとライブラリをコンパイルする。

`Release`

これらのビルドでは、ビルド・システムは最適化を有効にしてツールとライブラリをコンパイルし、デバッグ情報を生成しない。CMakesのデフォルトの最適化レベルは`-O3`です。これは、CMakeコマンドラインで`CMAKE_CXX_FLAGS_RELEASE`変数を設定することで設定できます。

`RelWithDebInfo`

これらのビルドはデバッグ時に便利である。デバッグ情報とともに最適化されたバイナリが生成されます。CMakesのデフォルトの最適化レベルは-O2です。これは CMake コマンドラインで `CMAKE_CXX_FLAGS_RELWITHDEBINFO` 変数を設定することで設定できます。

LLVMを設定したら、OBJ_ROOTディレクトリに入り、以下のコマンドを実行することでビルドできます：

```sh
% make
```

ビルドに失敗した場合、LLVMをコンパイルしないことが知られているGCCのバージョンを使っていないか、ここで確認してください。

あなたのマシンに複数のプロセッサがある場合、GNU Makeが提供する並列ビルドオプションのいくつかを使いたいかもしれません。たとえば、次のコマンドを使うことができます：

```sh
% make -j2
```

LLVMソースコードで作業するときに便利な特別なターゲットがいくつかある：

```sh
make clean
```

ビルドによって生成されたすべてのファイルを削除します。これには、オブジェクト・ファイル、生成された C/C++ ファイル、ライブラリ、実行可能ファイルが含まれます。

```sh
make install
```

LLVM のヘッダーファイル、ライブラリ、ツール、ドキュメントを `CMAKE_INSTALL_PREFIX` で指定した `$PREFIX` 以下の階層にインストールする。

```sh
make docs-llvm-html
```

`-DLLVM_ENABLE_SPHINX=On`で設定すると、`OBJ_ROOT/docs/html`にHTML形式のドキュメントを含むディレクトリが生成される。

### LLVMのクロスコンパイル

LLVM自体をクロスコンパイルすることも可能です。つまり、LLVMの実行ファイルやライブラリを、ビルドするプラットフォームとは異なるプラットフォームでホストするように作成することができます（カナディアンクロスビルド）。クロスコンパイル用のビルドファイルを生成するために、CMakeは`CMAKE_TOOLCHAIN_FILE`という変数を提供しており、CMakeのテスト操作中に使用されるコンパイラーフラグや変数を定義することができます。

このようなビルドの結果は、ビルドホストでは実行できませんが、ターゲットでは実行できる実行ファイルです。例として、以下のCMakeの呼び出しは、iOSをターゲットとしたビルドファイルを生成することができます。これは最新のXcodeを搭載したmacOSでも動作します：

```sh
% cmake -G "Ninja" -DCMAKE_OSX_ARCHITECTURES="armv7;armv7s;arm64"
  -DCMAKE_TOOLCHAIN_FILE=<PATH_TO_LLVM>/cmake/platforms/iOS.cmake
  -DCMAKE_BUILD_TYPE=Release -DLLVM_BUILD_RUNTIME=Off -DLLVM_INCLUDE_TESTS=Off
  -DLLVM_INCLUDE_EXAMPLES=Off -DLLVM_ENABLE_BACKTRACES=Off [options]
  <PATH_TO_LLVM>
```

注：iOS SDKの制限により、iOS用にビルドする際に渡さなければならない追加のフラグがいくつかある。

クロスコンパイルについての詳しい情報は、Clang/LLVMを使ってClang/LLVMをクロスコンパイルする方法と、一般的なクロスコンパイル方法についてのClangのドキュメントをチェックしてください。

### LLVMオブジェクトファイルの場所

LLVMビルド・システムは、1つのLLVMソース・ツリーを複数のLLVMビルドで共有することができます。したがって、同じソース・ツリーを使用して、複数の異なるプラットフォームまたは構成向けにLLVMをビルドすることができます。

LLVMオブジェクト・ファイルを置くディレクトリを変更します：

```sh
% cd OBJ_ROOT
```

cmakeを実行する:

```sh
% cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Release SRC_ROOT
```

LLVMビルドは、OBJ_ROOTの下にLLVMソースツリーと一致する構造を作成します。ソースツリーにソースファイルが存在する各レベルには、OBJ_ROOTに対応するCMakeFilesディレクトリが存在します。そのディレクトリの下には、.dirで終わる名前の別のディレクトリがあり、その下に各ソースのオブジェクトファイルがあります。

例えば:

```sh
% cd llvm_build_dir
% find lib/Support/ -name APFloat*
lib/Support/CMakeFiles/LLVMSupport.dir/APFloat.cpp.o
```

### オプション設定項目

`binfmt_misc`モジュールをサポートするLinuxシステムで実行しており、そのシステムのrootアクセス権を持っている場合、LLVMビットコード・ファイルを直接実行するようにシステムを設定することができます。これを行うには、次のようなコマンドを使用します（すでにモジュールを使用している場合は、最初のコマンドは必要ないかもしれません）:

```sh
% mount -t binfmt_misc none /proc/sys/fs/binfmt_misc
% echo ':llvm:M::BC::/path/to/lli:' > /proc/sys/fs/binfmt_misc/register
% chmod u+x hello.bc   (if needed)
% ./hello.bc
```

これにより、LLVMビットコード・ファイルを直接実行できる。Debianでは、上記の'echo'コマンドの代わりに次のコマンドを使うこともできる。:

```sh
% sudo update-binfmts --install llvm /path/to/lli --magic 'BC'
```

## ディレクトリのレイアウト

LLVMソース・ベースに関する有用な情報源の1つは、`llvm.org/doxygen/` にあるLLVM doxygenドキュメントです。以下は、コード・レイアウトの簡単な紹介です。:

### llvm/cmake

システムビルドファイルを生成する。

`llvm/cmake/modules`

llvm ユーザ定義オプションのビルド設定。コンパイラのバージョンとリンカのフラグをチェックする。

`llvm/cmake/platforms`

Android NDK、iOSシステム、MSVCをターゲットとする非Windowsホスト用のツールチェーン設定。

### llvm/examples

- カスタム言語用のコンパイラとしてLLVMを使用する方法を示すいくつかの簡単な例 - 低域化、最適化、コード生成を含む。
- Kaleidoscopeチュートリアル：Kaleidoscope言語チュートリアルでは、手書きのレキサー、パーサー、AST、LLVMを使用したコード生成サポート（静的（先読み）コンパイルとJIT（Just In Time）コンパイルへの様々なアプローチの両方）を含む、自明でない言語のための素晴らしい小さなコンパイラの実装を実行します。完全な初心者向けのKaleidoscopeチュートリアル。
- BuildingAJIT: BuildingAJITチュートリアルの例は、LLVMのORC JIT APIがLLVMの他の部分とどのように相互作用するかを示しています。LLVMのORC JIT APIがLLVMの他の部分とどのように相互作用するかを示しています。また、それらをどのように組み替えて、あなたのユースケースに適したカスタムJITを構築するかを教えています。

### llvm/include

LLVMライブラリからエクスポートされた公開ヘッダーファイル。3つの主なサブディレクトリ:

`llvm/include/llvm`

LLVM固有のすべてのヘッダーファイルと、LLVMのさまざまな部分（`Analysis`、`CodeGen`、`Target`、`Transforms`など）のサブディレクトリ。

`llvm/include/llvm/Support`

LLVMと共に提供されるが、必ずしもLLVMに特化したものではない汎用サポート・ライブラリ。例えば、いくつかのC++ STLユーティリティやコマンドラインオプション処理ライブラリは、ここにヘッダファイルを格納する。

`llvm/include/llvm/Config`

cmakeによって設定されるヘッダーファイル。これらは、"標準的な "UNIXやCのヘッダーファイルをラップします。ソースコードはこれらのヘッダーファイルをインクルードすることができ、 cmake が生成する条件付き `#includes` を自動的に処理します。

### llvm/lib

ほとんどのソースファイルはここにある。コードをライブラリに置くことで、LLVMはツール間でのコードの共有を容易にする。

`llvm/lib/IR/`

InstructionやBasicBlockなどのコア・クラスを実装するLLVMのコア・ソース・ファイル。

`llvm/lib/AsmParser/`

LLVMアセンブリ言語パーサー・ライブラリのソースコード。

`llvm/lib/Bitcode/`

ビットコードを読み書きするためのコード。

`llvm/lib/Analysis/`

コールグラフ、誘導変数、自然ループの識別など、さまざまなプログラム解析。

`llvm/lib/Transforms/`

積極的なデッドコード除去、スパース条件付き定数伝搬、インライン化、ループ不変コードモーション、デッドグローバル除去など、IRからIRへのプログラム変換。

`llvm/lib/Target/`

コード生成のターゲットとなるアーキテクチャを記述したファイル。例えば、`llvm/lib/Target/X86` には `X86` マシンの記述があります。

`llvm/lib/CodeGen/`

コード・ジェネレーターの主要部分：命令セレクタ、命令スケジューリング、レジスタ割り当て。

`llvm/lib/MC/`

ライブラリはマシンコードレベルでコードを表現し、処理する。アセンブリとオブジェクトファイルのエミッションを処理します。

`llvm/lib/ExecutionEngine/`

インタープリタ型およびJITコンパイル型のシナリオで、実行時にビットコードを直接実行するためのライブラリ。

`llvm/lib/Support/`

`llvm/include/ADT/` と `llvm/include/Support/` にあるヘッダファイルに対応するソースコード。

### llvm/bindings

LLVMコンパイラー・インフラストラクチャーのバインディングが含まれており、CやC++以外の言語で書かれたプログラムでもLLVMインフラストラクチャーを利用することができます。LLVMプロジェクトはOCamlとPythonの言語バインディングを提供しています。

### llvm/projects

厳密にはLLVMの一部ではないが、LLVMとともに出荷されるプロジェクト。また、LLVMビルド・システムを活用する、あなた自身のLLVMベースのプロジェクトを作成するためのディレクトリでもあります。

### llvm/test

LLVMインフラストラクチャの機能テストとリグレッション・テスト、その他のサニティ・チェック。これらは迅速に実行され、網羅的でなくとも多くの領域をカバーすることを意図している。

### test-suite

LLVM用の包括的な正しさ、パフォーマンス、ベンチマーク・テスト・スイート。これは別のgitリポジトリ `github.com/llvm/llvm-test-suite` で提供されています。なぜなら、様々なライセンスのサードパーティ・コードが大量に含まれているからです。詳細はTesting Guideドキュメントを参照してください。

### llvm/tools

上記のライブラリからビルドされた実行ファイルで、ユーザー・インターフェースの主要部分を形成する。`tool_name -help`と入力すれば、いつでもツールのヘルプを得ることができる。以下は最も重要なツールの簡単な紹介である。より詳細な情報はコマンドガイドにあります。

`bugpoint`

`bugpoint` は、最適化パスやコード生成バックエンドのデバッグに使用され、与えられたテストケースを、クラッシュやコンパイルミスなどの問題を引き起こすパスや命令の最小数に絞り込みます。`bugpoint` の使い方については `HowToSubmitABug.html` を参照してください。

`llvm-ar`

アーカイバは、指定されたLLVMビットコードファイルを含むアーカイブを生成します。

`llvm-as`

アセンブラは、人間が読めるLLVMアセンブリをLLVMビットコードに変換する。

`llvm-dis`

ディスアセンブラは、LLVMビットコードを人間が読めるLLVMアセンブリに変換する。

`llvm-link`

`llvm-link`は、驚くことではないが、複数のLLVMモジュールを1つのプログラムにリンクする。

`lli`

`lli`はLLVMインタプリタであり、LLVMビットコードを直接実行することができます（非常に遅いですが...）。サポートしているアーキテクチャ（現在のところx86、Sparc、PowerPC）では、デフォルトでlliはジャストインタイム・コンパイラとして機能し（機能がコンパイルされている場合）、インタプリタよりもはるかに高速にコードを実行します。

`llc`

`llc`はLLVMバックエンドコンパイラで、LLVMビットコードをネイティブコードのアセンブリファイルに変換する。

`opt`

`opt`はLLVMビットコードを読み込み、一連のLLVMからLLVMへの変換（コマンドラインで指定される）を適用し、結果のビットコードを出力する。`opt -help`は、LLVMで利用可能なプログラム変換のリストを得るための良い方法である。

`opt`では、入力されたLLVMビットコード・ファイルに対して特定の解析を実行し、その結果を表示することもできます。主に、解析のデバッグや、解析が何をするのかを理解するのに便利です。

### llvm/utils

LLVMソースコードで作業するためのユーティリティ。インフラストラクチャの一部のコード・ジェネレータであるため、ビルド・プロセスの一部となっているものもある。

`codegen-diff`

`codegen-diff`は、LLCが生成するコードとLLIが生成するコードの違いを見つける。LLCが生成するコードとLLIが生成するコードの違いを見つけることができる。完全なユーザーマニュアルは `perldoc codegen-diff` を実行してほしい。

`emacs/`

LLVMアセンブリ・ファイルおよびTableGen記述ファイル用のEmacsおよびXEmacsシンタックス・ハイライト。これらの使用方法についてはREADMEを参照してください。

`getsrcs.sh`

ディレクトリをまたいで多くの開発を行い、各ファイルを探したくない場合に便利です。使い方の1つは、例えば、LLVMソースツリーの先頭から`xemacs 'utils/getsources.sh'` を実行することである。

`llvmgrep`

LLVMの各ソースファイルに対して`egrep -H -n`を実行し、`llvmgrep`のコマンドラインで提供された正規表現を渡します。これは、特定の正規表現に対してソースベースを検索する効率的な方法です。

`TableGen/`

一般的な TableGen 記述ファイルからレジスタ記述、命令セット記述、さらにはアセンブラを生成するためのツールが含まれています。

`vim/`

LLVMアセンブリ・ファイルとTableGen記述ファイルのvimシンタックス・ハイライト。使い方はREADMEを参照してください。

## LLVMツールチェーンを使った例

このセクションでは、ClangフロントエンドでLLVMを使う例を示す。

### clangを使った例

まず、簡単なCファイルを作成し、名前を'hello.c'とする。:

```c
#include <stdio.h>

int main() {
  printf("hello world\n");
  return 0;
}
```

次に、Cファイルをネイティブの実行ファイルにコンパイルする：

```sh
% clang hello.c -o hello
```

::: info Note

ClangはデフォルトではGCCと同じように動作する。標準の`-S`と`-c`引数は通常通り働きます（それぞれネイティブの`.s`ファイルか`.o`ファイルを生成します）。

:::

次に、CファイルをLLVMビットコード・ファイルにコンパイルする：

```sh
% clang -O3 -emit-llvm hello.c -c -o hello.bc
```

`-emit-llvm`オプションを`-S`または`-c`オプションと一緒に使用すると、コードのLLVM `.ll`または`.bc`ファイル（それぞれ）を生成できます。これにより、ビットコード・ファイルで標準的なLLVMツールを使うことができる。

両方の形式でプログラムを実行する。プログラムを実行するには

```sh
% ./hello
```

そして

```sh
% lli hello.bc
```

2つ目の例は、LLVM JITである`lli`を呼び出す方法を示している。

`llvm-dis`ユーティリティを使って、LLVMのアセンブリコードを見てください：

```sh
% llvm-dis < hello.bc | less
```

LLCコードジェネレータを使用して、プログラムをネイティブアセンブリにコンパイルする：

```sh
% llc hello.bc -o hello.s
```

ネイティブ・アセンブリ言語ファイルをプログラムにアセンブルする：

```sh
% /opt/SUNWspro/bin/cc -xarch=v9 hello.s -o hello.native   # On Solaris

% gcc hello.s -o hello.native                              # On others
```

ネイティブ・コードのプログラムを実行する：

```sh
% ./hello.native
```

ネイティブコードに直接コンパイルするためにclangを使う場合（つまり`-emit-llvm`オプションがない場合）は、6/7/8のステップを代わりにやってくれることに注意してほしい。

## よくある問題

LLVMのビルドや使用に問題がある場合、またはLLVMに関するその他の一般的な質問がある場合は、「よくある質問」のページを参照してください。

限られたメモリとビルド時間に問題がある場合は、makeの代わりにninjaでビルドしてみてください。cmakeで以下のオプションを設定することを検討してください：

- `-G` Ninja このオプションを設定すると、makeの代わりにninjaでビルドできるようになる。ninjaでビルドすると、特にインクリメンタルビルドのビルド時間が大幅に短縮され、メモリ使用量も改善されます。
- `-DLLVM_USE_LINKER` このオプションをlldに設定すると、LinuxのようなELFベースのプラットフォーム上で、LLVM実行ファイルのリンク時間が大幅に短縮される。LLVMを初めてビルドする場合で、lldがバイナリ・パッケージとして利用できない場合は、GNU ldに代わる高速なリンカーとして、goldリンカーを使用するとよいでしょう。
- `-DCMAKE_BUILD_TYPE` ビルドの最適化レベルとデバッグ情報を制御します。この設定は RAM とディスクの使用量に影響します。詳細は CMAKE_BUILD_TYPE を参照してください。
- `-DLLVM_ENABLE_ASSERTIONS` このオプションのデフォルトは、DebugビルドではON、ReleaseビルドではOFFである。前のオプションで述べたように、Release ビルド・タイプを使用してアサーションを有効にすることは、Debug ビルド・タイプを使用する良い選択肢となるでしょう。
- `-DLLVM_PARALLEL_LINK_JOBS` これは、同時に実行したいジョブの数と同じに設定する。これはmakeで使われる-jオプションに似ているが、リンクジョブにのみ使われる。このオプションは忍者でのみ使用できる。ジョブの数を非常に少なくすると、ビルド処理中に使用するメモリの量を大幅に減らすことができるからである。メモリが限られている場合は、これを 1 に設定するとよい。
- `-DLLVM_TARGETS_TO_BUILD` ビルドしたいターゲットと同じに設定してください。X86に設定したいかもしれませんが、ターゲットの完全なリストはllvm-project/llvm/lib/Targetディレクトリにあります。
- `-DLLVM_OPTIMIZED_TABLEGEN` これをONに設定すると、ビルド中に完全に最適化されたtablegenが生成されます。これにより、ビルド時間が大幅に短縮される。これは Debug ビルド・タイプを使用している場合にのみ有効です。
- `-DLLVM_ENABLE_PROJECTS` この値を、コンパイルしたいプロジェクト（clang、lldなど）と同じにする。 複数のプロジェクトをコンパイルする場合は、項目をセミコロンで区切ってください。セミコロンで問題が発生した場合は、シングルクォートで囲んでみてください。
- `-DLLVM_ENABLE_RUNTIMES` コンパイルしたいランタイム（libcxx、libcxxabiなど）と等しくなるように設定する。 複数のランタイムをコンパイルする場合は、セミコロンで区切ってください。セミコロンに問題がある場合は、シングルクォートで囲んでください。
- `-DCLANG_ENABLE_STATIC_ANALYZER` clangスタティック・アナライザーが不要な場合は、このオプションをオフに設定してください。これでビルド時間が少し改善されるはずです。
- `-DLLVM_USE_SPLIT_DWARF` デバッグビルドが必要な場合は、この設定を ON にすると、リンカにかかる メモリ負荷が軽減されます。バイナリにデバッグ情報が含まれなくなるため、リンクが非常に高速になります。これは、LinuxなどのELFを使用するホスト・プラットフォームにのみ適用されます。

## リンク

このドキュメントは、LLVMを使って簡単なことをする方法の紹介に過ぎません...ここに書かれていない、もっと面白くて複雑なことはたくさんあります（でも、もしあなたが何か書きたいなら、喜んでパッチを受け付けます！）。LLVMの詳細については、以下をチェックしてください：

- LLVM Homepage
- LLVM Doxygen Tree
- Starting a Project that Uses LLVM