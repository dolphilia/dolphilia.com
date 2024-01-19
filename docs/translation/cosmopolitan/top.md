# Cosmopolitan

[Cosmopolitan Libc](https://justine.lol/cosmopolitan/index.html) は、インタプリタや仮想マシンを必要としないことを除けば、C を Java のようなビルドワンスでどこでも実行できる言語にする。その代わりに、Linux + Mac + Windows + FreeBSD + OpenBSD + NetBSD + BIOS上でネイティブに動作するPOSIX公認のポリグロットフォーマットを出力するように、ストックのGCCとClangを再構成し、可能な限り最高のパフォーマンスと想像できる限り小さなフットプリントで動作します。

## 背景

このプロジェクトの紹介は、[actually portable executable](https://justine.lol/ape.html) ブログ記事と、[cosmopolitan libc](https://justine.lol/cosmopolitan/index.html) ウェブサイトをお読みください。[APIドキュメント](https://justine.lol/cosmopolitan/documentation.html)もあります。

## はじめに

https://cosmo.zip/pub/cosmocc/ から `cosmocc` コンパイラのリリースを入手することから始めることができる。

```sh
mkdir -p cosmocc
cd cosmocc
wget https://cosmo.zip/pub/cosmocc/cosmocc.zip
unzip cosmocc.zip
```

以下はそのプログラム例である：

```c
// hello.c
#include <stdio.h>

int main() {
  printf("hello world\n");
}
```

次のようにまとめることができる：

```sh
cosmocc -o hello hello.c
./hello
```

Cosmopolitan Libcランタイムは、デフォルトでいくつかのヘビー級のトラブルシューティング機能をリンクしている。ここでは、システムコールのログを取る方法を説明します：

```sh
./hello --strace
```

ここでは、関数呼び出しのログをより詳細に取得する方法を紹介する：

```sh
./hello --ftrace
```

Cosmopolitanのツールチェーンを使って、オートツールを使う従来のオープンソースプロジェクトをビルドすることができる。この戦略は通常うまくいく：

```sh
export CC=x86_64-unknown-cosmo-cc
export CXX=x86_64-unknown-cosmo-c++
./configure --prefix=/opt/cosmos/x86_64
make -j
make install
```

## Cosmopolitan ソースビルド

Cosmopolitanは私たちがサポートしているどのプラットフォームでもソースからコンパイルすることができます。Makefileは自動的にcosmoccをダウンロードします。

システム全体のAPEローダーをインストールすることをお勧めします。このコマンドは`ape`コマンドをシステムフォルダにコピーし、Linuxのbinfmt_miscに登録するために、`sudo`アクセスが必要です。

```sh
ape/apeinstall.sh
```

GNU Makeの最新バージョンでmonoレポをビルドできるようになりました。cosmoccツールチェーンは互換性が保証されており、さらにビルドシステムのサンドボックス化のための拡張機能も含まれています。

```sh
build/bootstrap/make.com -j8
o//examples/hello.com
```

Cosmopolitanのリポジトリは非常に大きいので、ある特定のものだけをビルドしたいかもしれません。比較的早くコンパイルできるターゲットの例として、LIBCのコアパッケージにのみ依存する単純なPOSIXテストを紹介します。

```sh
rm -rf o//libc o//test
build/bootstrap/make.com o//test/posix/signal_test.com
o//test/posix/signal_test.com
```

時には、個々のターゲットをリストアップすることなく、ターゲットのサブセットをビルドしたいことがあります。例えば、`TEST_POSIX` パッケージのすべてのユニットテストをビルドして実行したい場合は、次のようにします：

```sh
build/bootstrap/make.com o//test/posix
```

Cosmopolitanには様々なビルドモードがあります。例えば、本当に小さなバイナリ（12kbほどのサイズ）が欲しいなら、こう言うだろう：

```sh
build/bootstrap/make.com m=tiny
```

さらに、他のオペレーティングシステムの肥大化をカットし、CosmopolitanをMusl Libcにもっと近づけることができる。

```sh
build/bootstrap/make.com m=tinylinux
```

詳細は[//build/config.mk](build/config.mk)を参照のこと。

## Debugging

システムコールのログを標準エラー出力する：

```sh
cosmocc -o hello hello.c
./hello --strace
```

関数呼び出しのログを標準エラー出力する：

```sh
cosmocc -o hello hello.c
./hello --ftrace
```

straceもftraceも、解読不可能なkprintf()機能を使用しており、環境変数を設定することでファイルに送信することができる。

```sh
export KPRINTF_LOG=log
./hello --strace
```

## GDB

以下は推奨される `~/.gdbinit` の設定です：

```gdb
set host-charset UTF-8
set target-charset UTF-8
set target-wide-charset UTF-8
set osabi none
set complaints 0
set confirm off
set history save on
set history filename ~/.gdb_history
define asm
  layout asm
  layout reg
end
define src
  layout src
  layout reg
end
src
```

通常はgdbの下で`.com.dbg`ファイルを実行する。`.com`ファイル自体をデバッグする必要がある場合は、デバッグ・シンボルを以下のように個別にロードすることができる。

```sh
gdb foo.com -ex 'add-symbol-file foo.com.dbg 0x401000'
```

## プラットフォームノート

### シェル

zsh を使っていて APE プログラムの実行に問題がある場合は、`sh -c ./prog` を試すか、zsh 5.9+ にアップグレードしてください（2年前にパッチを当てたので）。Python の `subprocess` や古いバージョンの fish などについても同様です。

### Linux

Linuxシステムの中には、WINEでMZ実行ファイルを起動するように設定されているものがある。他のディストロでは、APEプログラムが "run-detectors: unable to find an interpreter "と表示されるように、純正インストールを設定しています。例えば

```sh
jart@ubuntu:~$ wget https://cosmo.zip/pub/cosmos/bin/dash
jart@ubuntu:~$ chmod +x dash
jart@ubuntu:~$ ./dash
run-detectors: unable to find an interpreter for ./dash
```

`binfmt_misc`でAPEを登録することで修正できる：

```sh
sudo wget -O /usr/bin/ape https://cosmo.zip/pub/cosmos/bin/ape-$(uname -m).elf
sudo chmod +x /usr/bin/ape
sudo sh -c "echo ':APE:M::MZqFpD::/usr/bin/ape:' >/proc/sys/fs/binfmt_misc/register"
sudo sh -c "echo ':APE-jart:M::jartsr::/usr/bin/ape:' >/proc/sys/fs/binfmt_misc/register"
```

これで大丈夫だ。APEは動作するだけでなく、実行ファイルの起動も400μ秒速くなる。それでもうまくいかない場合は、次のようにして`binfmt_misc`を無効にすることもできる：

```sh
sudo sh -c 'echo -1 > /proc/sys/fs/binfmt_misc/cli'     # remove Ubuntu's MZ interpreter
sudo sh -c 'echo -1 > /proc/sys/fs/binfmt_misc/status'  # remove ALL binfmt_misc entries
```

### WSL

通常、WSL環境でAPEを使用するのは安全ではありません。なぜなら、APEはWSL環境内でMZ実行可能ファイルをWIN32バイナリとして実行しようとするからです。WSLでCosmopolitanソフトを安全に使うには、これを実行してください：

```sh
sudo sh -c "echo -1 > /proc/sys/fs/binfmt_misc/WSLInterop"
```

## Discordチャットルーム

Cosmopolitan開発チームはRedbean Discordサーバーで共同作業を行っています。ぜひご参加ください！ https://discord.gg/FwAVVu7eJ4

## Support Vector

| Platform        | Min Version | Circa |
| :---            | ---:        | ---:  |
| AMD             | K8 Venus    | 2005  |
| Intel           | Core        | 2006  |
| Linux           | 2.6.18      | 2007  |
| Windows         | 8 [1]       | 2012  |
| Mac OS X        | 15.6        | 2018  |
| OpenBSD         | 7           | 2021  |
| FreeBSD         | 13          | 2020  |
| NetBSD          | 9.2         | 2021  |

Windows VistaとWindows 7で動作するCosmopolitanのコミュニティサポートバージョンについては、私たちの[vistaブランチ](https://github.com/jart/cosmopolitan/tree/vista)をご覧ください。

## スペシャルサンクス

このプロジェクトの資金は、[GitHub Sponsors](https://github.com/sponsors/jart)と[Patreon](https://www.patreon.com/jart)を利用したクラウドソーシングで調達しています。皆様のご支援がこのプロジェクトを可能にしています。ありがとうございます！また、以下のグループと個人の方々にも特別な感謝の意を表したいと思います。:

- [Joe Drumgoole](https://github.com/jdrumgoole)
- [Rob Figueiredo](https://github.com/robfig)
- [Wasmer](https://wasmer.io/)

私たちの活動を最高レベルで公的に後援してくれたことに対して。