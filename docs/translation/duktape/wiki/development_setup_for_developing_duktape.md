# 開発セットアップ

## 概要

ほとんどのアプリケーション・コードは、Duktapeのソースとヘッダーをアプリケーションのビルドに含める以外に特別な開発設定をすることなく、直接使用できるビルド済みdistパッケージを使用する必要があります。以下のようなビルド済み dist パッケージがあります。

- 公式リリース: http://duktape.org/download.html
- マスターからのスナップショット: http://duktape.org/snapshots/

Duktapeの内部を変更する必要がある場合があります。例えば、Duktapeのプライベートフォークを特定のターゲットに使用することがあります。その場合、アプリケーションのビルドに "make dist" のステップを含める必要があるかもしれません。あるいは、ただ単に内部を少しハックして何が起こるか見てみたいだけかもしれません。

この文書では、distパッケージ（Linux、Windows、OS X）を作成し、DuktapeのトップレベルのMakefile（Linuxのみ）を使用するための要件を説明しています。

## dist パッケージを作成するための最小限のセットアップ

dist パッケージを作成するために最低限必要なものは以下の通りです。

- https://github.com/svaarala/duktape またはフォークをチェックアウトしている。
- Python 2 と PyYAML、dist ツールに必要です。

以下はオプションですが、便利です。

- "git describe" や他のバージョンのメタデータを取得するために使用する Git コマンドラインツール。
- Duktape 1.x: ビルドに埋め込まれたいくつかのECMAScriptコード用のminifier（ClosureまたはUglifyJS2）。この依存関係は、Duktape 2.xで取り除かれました。

Duktapeのソースやメタデータなどに変更を加えた後。

```sh
# Use --help for option help.
$ python util/make_dist.py
```

これは、duktape-1.4.0.tar.xz のようなビルド済みの dist パッケージと同じ内容の dist ディレクトリを作成します。いくつか注意点があります。

- 依存関係を最小にするために、dist tar パッケージ自体は自動的には作成されません。
- Git がインストールされていない場合は、コマンドラインオプションでバージョン関連の情報を与えることができますので、参照してください。$ python util/make_dist.py --help.
- git cloneの代わりに、コマンドラインオプションにgitのバージョンメタデータを指定すれば、バージョン管理されていないスナップショットディレクトリを使用することもできます。
- オプションのminifierは、Duktape 1.xでは、Duktapeビルドに埋め込まれる非常に小さなECMAScript初期化スクリプト（src/duk_initjs.js）に使用されます。もし、-minifyでminifierを提供しない場合、スクリプトはminifyされません。フットプリントへの影響は非常に小さく、約500バイトです。Duktape 2.xでは、この初期化スクリプトを埋め込まないため、minifierは必要ありません。

distパッケージの作成は、プライベートフォークを効率的に扱うために必要な最小限のステップです。そのため、distプロセスは非常に移植性が高く、少なくともLinux、Windows（Cygwinあり/なし）、OS Xで動作するはずで、Python 2とPyYAML以上の必須の依存関係はほとんどありません。トップレベルの Makefile は dist パッケージの作成には使われないし、必要とされないので、"make" があることは必須ではないことに注意してください。

## 手動でdistパッケージを作成する場合

dist パッケージを作りたいとき。

- Duktapeのソースコードを修正したり、プライベートフォークから作業する。
- 作業中のブランチから dist パッケージを作成する。
- デフォルトの dist パッケージでは有効になっていない ROM ビルトインサポートのような、よりエキゾチックなオプションを有効にする。

## その他の開発ステップ（Linuxのみ）

ウェブサイトの構築やテストケースの実行など、その他の開発に関することは、Linuxのみを対象としたMakefileがベースになっています。Makefileを使用する基本的な手順は以下の通りです。

```sh
# 必要なパッケージのインストール (正確なパッケージはディストリビューションに依存します)
$ sudo apt-get install nodejs nodejs-legacy npm perl ant openjdk-7-jdk \
      libreadline6-dev libncurses-dev python-rdflib python-bs4 python-yaml \
      clang llvm bc

# コマンドラインツール('duk')のコンパイル
$ git clone https://github.com/svaarala/duktape.git
$ cd duktape
$ make

# dukweb.jsのビルドやEmscriptenターゲットの実行には、Emscripten fastcompを手動で設定する必要があります。ステップバイステップの手順は、doc/emscripten-status.rstを参照してください。

# ECMAScript と API のテストケース、およびその他のテストの実行
$ make ecmatest
$ make apitest
$ make regfuzztest
$ make underscoretest    # see doc/underscore-status.rst
$ make test262test       # see doc/test262-status.rst
$ make emscriptentest    # see doc/emscripten-status.rst
$ make emscriptenmandelbrottest  # run Emscripten-compiled mandelbrot.c with Duktape
$ make emscripteninceptiontest   # run Emscripten-compiled Duktape with Duktape
$ make jsinterpretertest
$ make luajstest
$ make dukwebtest        # then browse to file:///tmp/dukweb-test/dukweb.html
$ make xmldoctest
$ make bluebirdtest
# etc
```

OSX や Windows (Cygwin を使用) でも Makefile を動作させることは可能ですが、現時点ではサポートされていません。Makefile のターゲットには (いくつかの API テストケースなど) Linux 固有の仮定があります (例: /tmp/ が存在すること)。

## Platform notes

### Ubuntu, Debian, etc

make_dist.pyに対応するため。

```sh
# Linuxでは、多くの場合、パッケージからインストールするか、'pip'を使用してインストールすることができます。
$ sudo apt-get install python python-yaml
$ python util/make_dist.py
```

テストケースの実行などは、上記の「その他の開発手順（Linuxのみ）」をご覧ください。

### ArchLinux

必要なPythonのパッケージをインストールします。

```sh
# python2-beautifulsoup4 と python2-rdflib は plain dist では必要ありません。
$ sudo pacman -S --needed python2 python2-beautifulsoup4 python2-rdflib python2-yaml
```

テストケースなどを実行する場合は、Node.jsのフィックスアップが必要になる場合があります。

```sh
$ sudo ln -s /usr/bin/node /usr/bin/nodejs
```

その他の開発基礎は、distパッケージのビルドには必要ないはずです。

```sh
$ sudo pacman -S --needed base-devel clang llvm git bc
```

Based on:

- https://github.com/svaarala/duktape/issues/466

### Windows

```
; Install Python 2.7.x from python.org, and add it to PATH
> pip install PyYAML
> python util\make_dist.py
```

OS X

```sh
# Install Python 2.7.x
$ pip install PyYAML
$ python util/make_dist.py
```