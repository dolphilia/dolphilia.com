# cosmopolitan libc

どこでもビルド、どこでも実行可能なCライブラリ

Cosmopolitan Libcは、インタプリタや仮想マシンを必要としないことを除けば、C言語をJavaのようなビルド・エニウェア・ラン・エニウェア言語にする。その代わりに、Linux + Mac + Windows + FreeBSD + OpenBSD + NetBSD + AMD64とARM64のBIOS上でネイティブに動作するPOSIX公認のポリグロットフォーマットを出力するように、純正のGCCとClangを再設定し、可能な限り最高のパフォーマンスで動作します。

## はじめに

まず、Cosmopolitan toolchainをダウンロードする：

```sh
mkdir cosmocc
cd cosmocc
wget https://cosmo.zip/pub/cosmocc/cosmocc.zip
unzip cosmocc.zip
```

### Sanity Test

次に、システム上でAPEプログラムを実行できることを確認しよう：

```sh
bin/make --version
```

もし「zsh: exec format error」と表示されたら、zsh 5.9+にアップグレードする必要があります（2年前にパッチを当てました）。Fishも同様です。

LinuxユーザーはAPE Loaderをインストールすることをお勧めします。これにより、WINEがAPEを実行しようとしたり、"run-detectors: unable to find an interpreter "といった問題が解決されます。

```sh
# for linux users
sudo wget -O /usr/bin/ape https://cosmo.zip/pub/cosmos/bin/ape-$(uname -m).elf
sudo chmod +x /usr/bin/ape
sudo sh -c "echo ':APE:M::MZqFpD::/usr/bin/ape:' >/proc/sys/fs/binfmt_misc/register"
sudo sh -c "echo ':APE-jart:M::jartsr::/usr/bin/ape:' >/proc/sys/fs/binfmt_misc/register"
```

Windowsを使っているなら、bin/makeの名前をbin/make.exeに変更して実行してみてください。その後、名前を戻してください。cosmoccはシェルスクリプトなので、UNIXシェルが必要です。Cosmosのプログラムをダウンロードし、C:¥cosmos¥binに入れれば、bashやlessなどのプログラムが手に入る。ProTip: dashはかなり良いC:∕bin∕sh（cosmoでは/bin/shまたは/c/bin/sh）を作る。次に、WindowsストアからTerminal Previewをインストールし、C:∕bin∕bash -lがシェルになるように設定する。そうすれば、拡張子が.exeでないことは問題にならなくなる。

WSLユーザーは、このコマンドを実行して、WindowsがWSL環境内でAPEをWIN32プログラムとして実行しないようにします。

```sh
sudo sh -c "echo -1 >/proc/sys/fs/binfmt_misc/WSLInterop"
```

### ハローワールドのコンパイル

hello.cという名前のファイルを作成する：

```c
#include <stdio.h>

int main(int argc, char *argv[]) {
  printf("hello world\n");
}
```

そして次のようにコンパイルする：

```sh
bin/cosmocc -o hello hello.c
./hello
```

おめでとう！あなたは今、実際に移植可能な最初のファットな実行ファイルを作ったところだ。これは、AMD64 および ARM64 アーキテクチャ上の Linux/MacOS/Windows/FreeBSD/NetBSD/OpenBSD で動作する。

## さらに読む

さらに詳しいスタートアップのドキュメントは、こちらをご覧ください：

- cosmopolitan/README.md
- cosmopolitan/tool/cosmocc/README.md

Cosmopolitan LibcでCプログラムを開発する方法についての高品質なサンプルコードについては、こちらをご覧ください：

cosmopolitan/examples/greenbean.c

Cosmopolitan Libcでオープンソースプロジェクトを構築する方法についての高品質なサンプルコードについては、こちらをご覧ください：

- ahgamut/superconfigure

## ビルド済みソフトウェア

人気のあるオープンソースソフトウェアのビルド済みファットバイナリについては、当社のオンラインサービスをご覧ください：

- https://cosmo.zip/
- https://cosmo.zip/pub/cosmos/bin/