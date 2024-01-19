# Cosmopolitan ツールチェーン

このツールチェーンは、Linux / MacOS / Windows / FreeBSD / OpenBSD / NetBSD の x86_64 および AARCH64 アーキテクチャ上で動作する実行ファイルをコンパイルするために使用できます。ポータブルなバイナリを作成できるだけでなく、ツールチェイン自体もポータブルなバイナリで構成されているため、一貫した開発環境を持つことができ、選択したプラットフォームからより多くのユーザーを獲得することができます。

## 含まれるもの

このツールチェーンには、GCC 11.2.0、Cosmopolitan Libc、LLVM LIBCXX、LLVM compiler-rtが含まれています。追加のライブラリはMusl Libcと由緒あるBSDs OSから提供されました。これによって、あなたは可能な限り強力なGPLバリアで、素晴らしい最新のGCCコンパイラの恩恵を受けることができます。プリプロセッサはクロスコンパイラを `__COSMOCC__` と `__COSMOPOLITAN__` の両方として宣伝しているが、`cosmocc` はさらに `__FATCOSMOCC__` を定義している。

## はじめに

ツールチェーンが取り出されたら、hello worldをコンパイルすることができる：

```sh
bin/cosmocc -o hello hello.c  # creates multi-os multi-arch binary
```

これで、ホストシステム上で動作する[actually portable executable](https://justine.lol/ape.html)ができました。もし何か問題があれば、以下のGotchasとTroubleshootのセクションを参照してください。また、`hello.com.dbg` (x86-64 Linux ELF)と`hello.aarch64.elf` (AARCH64 Linux ELF)という名前の2つのELF実行ファイルも出力されているはずです。Linuxシステムでは、これらのファイルも実行可能で、GDBでプログラムを簡単に実行するのに便利である。他のOSでは、`add-symbol-file`コマンドを使用してELFを第2ステップでロードすれば、GDBはAPEプログラムをデバッグすることができる。

## 概要

`cosmocc` プログラムは `unknown-unknown-cosmocc` の略記法である。高度なビルドでは、`x86_64-unknown-cosmo-cc` と `aarch64-unknown-cosmo-cc` を別々に使用し、提供されている `apelink` プログラムで結果を結合することができる。最後に、`x86_64-linux-cosmo-cc` と `aarch64-linux-cosmocc` ツールチェーンは実際の物理的なコンパイラであり、直接呼び出すことは意図されていない (最大限の設定可能性や独立した環境が目的でない限り)。

`cosmocc`コンパイラはプラットフォーム間で決定論的な出力を生成するように設計されています。このリリースでは、Linux x86+Arm、MacOS x86+Arm、FreeBSD、OpenBSD、Windows上でhello worldのバイナリ出力が同一であることを確認しています。再現可能なビルドを必要とするユーザーは、`-U__DATE__` や `-U__TIME__` のようなマクロを定義しないことに加えて、`LC_ALL=C` や `SOURCE_DATE_EPOCH=0` のような環境変数を明示的に定義することをお勧めします。

## インストール

ツールチェーンは相対パスを使うので、特定のシステムフォルダーにインストールする必要はなく、`$PATH`に追加する必要もない。 このツールチェインを使うのに、UNIXシェル以外に必要な外部依存はない。

各ユーザーの `$TMPDIR` または `$HOME` に APE ローダーを自己解凍する APE シェルスクリプトのデフォルトの動作に依存するのではなく、システム全体に APE ローダーをインストールすることを推奨します。Apple Arm64 ユーザーは `cc -O -o ape bin/ape-m1.c` をコンパイルして `ape` を `/usr/local/bin/ape` に移動する必要がある。その他のプラットフォームでは、正規パスとして `/usr/bin/ape` を使用する。Linux と BSD のユーザーは、`bin/ape.elf` を `/usr/bin/ape` にコピーすればよい。MacOS x86-64ユーザーは、`bin/ape.macho`が必要だろう。Linuxでは、APEをbinfmt_miscに登録することで、APE実行ファイルを400マイクロ秒速く実行させることができる。

```sh
sudo sh -c "echo ':APE:M::MZqFpD::/usr/bin/ape:' >/proc/sys/fs/binfmt_misc/register"
sudo sh -c "echo ':APE-jart:M::jartsr::/usr/bin/ape:' >/proc/sys/fs/binfmt_misc/register"
sudo sh -c "echo ':qemu-aarch64:M::\x7fELF\x02\x01\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x02\x00\xb7\x00:\xff\xff\xff\xff\xff\xff\xff\x00\xff\xff\xff\xff\xff\xff\xff\xff\xfe\xff\xff\xff:/usr/bin/qemu-aarch64:CF' >/proc/sys/fs/binfmt_misc/register"
```

Qemu-userは、人気のあるautoconfベースのオープン・ソース・プロジェクトのファット・バイナリをクロスコンパイルする際に、私たちが最も成功しているので、推奨する。しかし、APEとCosmoはQemu-userの存在に依存していません。

APEバイナリをプラットフォーム・ネイティブ・フォーマットに変換する必要がある場合、このツールチェーンはそれを行う`assimilate`プログラムを提供します。使用例としては、(1) setuidのサポート、(2) GDBを毛深くなくする、(3) コード署名などがある。デフォルトでは、assimilateはホストシステムで使用されているフォーマットを選択するが、APEプログラムを任意のアーキテクチャ/OSの組み合わせに明示的に変換することも可能である。使い方の詳細については、`assimilate -h` コマンドを実行してほしい。

## ゴッチャ

zsh を使っていて APE プログラムの実行に問題がある場合は、`sh -c ./prog` を試すか、zsh 5.9+ にアップグレードしてください（2年前にパッチを当てたので）。Python の `subprocess` や古いバージョンの fish などについても同様です。

Linux の場合、`binfmt_misc` が WINE 上で APE プログラムを実行しようとしたり、 "run-detectors: unable to find an interpreter" と表示したりするかもしれません。これらのコマンドを実行することで修正できる：

```sh
sudo wget -O /usr/bin/ape https://cosmo.zip/pub/cosmos/bin/ape-$(uname -m).elf
sudo chmod +x /usr/bin/ape
sudo sh -c "echo ':APE:M::MZqFpD::/usr/bin/ape:' >/proc/sys/fs/binfmt_misc/register"
sudo sh -c "echo ':APE-jart:M::jartsr::/usr/bin/ape:' >/proc/sys/fs/binfmt_misc/register"
```

Apple Siliconでは、`aarch64-unknown-cosmo-cc`がELFバイナリを生成する。hello worldプログラムをビルドする場合は、`ape ./hello` と言う必要がある。`ape`コマンドがない場合は、`cc -o ape bin/ape-m1.c`を実行して、`/usr/local/bin/ape`に移動する必要がある。APEインタープリターはすでに `$TMPDIR/.ape-1.10` のようなパスに存在しているかもしれない。注意すべき点は、これはクロス・コンパイラだけの問題だということだ。`cosmocc`コンパイラーは実際のELFバイナリーをシェルスクリプトでラップし、必要に応じてAPEローダーを自動的に抽出してコンパイルします。また、ログインシェルがCosmopolitan Libcを使ってビルドされている場合、これは問題ではありません。これは、Cosmoの `execve()` 実装が、カーネルからの `ENOEXEC` に自動的に反応して、プログラムを `/usr/local/bin/ape` の下で再起動するからです。最後に、Apple Arm64以外のプラットフォームでは、`/usr/bin/ape`がハードコードされた正規のインタプリタ・パスとして使われていることに注意してほしい。

Windowsでは、このツールチェインのシェルスクリプト・ラッパーを実行するためにシェルが必要です。Cosmosのバイナリをダウンロードして、POSIXユーザー空間をセットアップすることをお勧めします。https://cosmo.zip/pub/cosmos/bin/dash はあなたの`C:¥bin¥sh`シェル（Cosmo語で`/c/bin/sh`）です。cosmoccのシェルスクリプトは、Cosmosで利用できる `mkdir`、`less`、`cat`、`kill` などのプログラムにも依存している。

`cosmocc`をプリプロセッサのみのモードで実行すると、`__x86_64__`や`__k8__`のようなマクロが未定義のままx86_64 Linuxツールチェーンが使用される。これは、Cプリプロセッサを使ってトリックアウトされたアセンブリ命令を生成しているソフトウェアを混乱させるかもしれない。`cosmocc`はクロス・コンパイラの便利なラッパーに過ぎないので、このような状況で使用する方が良いだろう。

## 使用方法

デフォルトでは、コンパイルしたコードはすべてX86_64とAARCH64のベースライン（K8とARMv8.0）を使用します。`Xx86_64-mssse3` や `-Xaarch64-march=armv8.2-a+dotprod` のように `-Xx86_64` や `-Xaarch64` の接頭辞を使うことで、より新しい ISA を使うためのアーキテクチャ固有のフラグを渡すことができる。

## トラブルシューティング

あなたの `cosmocc` コンパイラはフードの下で多くのコマンドを実行しています。何か問題が発生した場合、環境変数 `BUILDLOG` を設定することでそのプロセスをより詳しく知ることができます。

```sh
export BUILDLOG=log
bin/cosmocc -o hello hello.c
```

ログには、ビルドプロセスを再現するためにシェルにコピー＆ペーストできるコマンドのログが含まれます。あるいは、単にどのフラグが独立したLinuxコンパイラーに渡されているかを見ることもできる。

```sh
# bin/cosmocc -o hello hello.c
(cd /home/jart/cosmocc; bin/x86_64-linux-cosmo-gcc -o/tmp/fatcosmocc.i5lugr6bc0gu0.o -D__COSMOPOL...
(cd /home/jart/cosmocc; bin/aarch64-linux-cosmo-gcc -o/tmp/fatcosmocc.w48k03qgw8692.o -D__COSMOPO...
(cd /home/jart/cosmocc; bin/fixupobj /tmp/fatcosmocc.i5lugr6bc0gu0.o)
(cd /home/jart/cosmocc; bin/fixupobj /tmp/fatcosmocc.w48k03qgw8692.o)
(cd /home/jart/cosmocc; bin/x86_64-linux-cosmo-gcc -o/tmp/fatcosmocc.ovdo2nqvkjjg3.com.dbg c...
(cd /home/jart/cosmocc; bin/aarch64-linux-cosmo-gcc -o/tmp/fatcosmocc.d3ca1smuot0k0.aarch64.elf /...
(cd /home/jart/cosmocc; bin/fixupobj /tmp/fatcosmocc.d3ca1smuot0k0.aarch64.elf)
(cd /home/jart/cosmocc; bin/fixupobj /tmp/fatcosmocc.ovdo2nqvkjjg3.com.dbg)
(cd /home/jart/cosmocc; bin/apelink -l bin/ape.elf -l bin/ape.aarch64 -...
(cd /home/jart/cosmocc; bin/pecheck hello)
```

## オープンソースソフトウェアの構築

`cosmocc/bin/`を`$PATH`に置くと、GNU Autotoolsプロジェクトとの統合が簡単になる。ここでのコツは、cosmoccによってビルドされたソフトウェアだけを含む`--prefix`を使うことだ。Cosmopolitan Libcはあなたのディストロとは違うABIを使っているからです。

```sh
export CC="cosmocc -I/opt/cosmos/include -L/opt/cosmos/lib"
export CXX="cosmoc++ -I/opt/cosmos/include -L/opt/cosmos/lib"
export INSTALL=cosmoinstall
export AR=cosmoar
./configure --prefix=/opt/cosmos
make -j
make install
```

## ツール

あなたの`cosmocc`ツールチェーンに含まれるGNU GCCとBinutilsプログラムには説明の必要はありませんが、多くのユーザーがよく知らないかもしれない他のプログラムも含まれています。

### `assimilate`

`assimilate`プログラムは、実際にポータブルな実行ファイルをネイティブな実行 ファイルに変換するために使用することができる。デフォルトでは、このツールはホストオペレーティングシステムとアーキテクチャーで使われているフォーマットに変換します。しかし、フラグを渡すことで、APEバイナリを海外のプラットフォーム用に変換することもできる。

### `ctags`

`ctags`プログラムは exuberant-ctags 1:5.9~svn20110310-14 で、Cosmopolitan Libc の third_party ソースからビルドされています。テキストエディタ用のシンボルインデックスを生成するために使用することができます。

### `apelink`

`apelink`プログラムは実際に移植可能な実行可能リンカーである。入力として、(1) GNU ld.bfdによってリンクされた複数の実行ファイル、(2) ELFプラットフォーム用のネイティブAPEローダー実行ファイルのパス、(3) Apple Silicon APEローダーのソースコードを受け取る。そして、それらをすべてシェルスクリプトにまとめ、適切な小さな～10kbのAPEローダーを自己解凍し、その後、適切な組み込み実行ファイルの大部分をメモリにマッピングするために再実行します。

### `mkdeps`

`mkdeps` プログラムを使用すると、Makefile 用に deps ファイルを生成することができ、 どのソースファイルがどのヘッダーを含むかを宣言することができる。このコマンドは驚くほど速い。`gcc -MMD` に頼るよりもずっと速い。これはもともと Cosmopolitan Libc リポジトリ用にビルドされたもので、 ~10,000 個のソースファイルがある。`mkdeps` を使うと、Cosmo は ~70 ミリ秒で ~10 万行の `o//depend` ファイルを生成できる。

`Makefile`に次のように追加することで使用できる。

```make
FILES := $(wildcard src/*)
SRCS = $(filter %.c,$(FILES))
HDRS = $(filter %.h,$(FILES))

o/$(MODE)/depend: $(SRCS) $(HDRS)
	@mkdir -o $(@D)
	mkdeps -o $@ -r o/$(MODE)/ $(SRCS) $(HDRS)

$(SRCS):
$(HDRS):
.DEFAULT:
	@echo
	@echo NOTE: deleting o/$(MODE)/depend because of an unspecified prerequisite: $@
	@echo
	rm -f o/$(MODE)/depend

-include o/$(MODE)/depend
```

プロジェクトがCosmopolitanのように非常に大きい場合、`mkdeps`は引数ファイルをサポートする。これは、コマンドの引数に32768文字の制限があるWindowsでは特に役に立つ。

```make
SRCS = $(foreach x,$(PKGS),$($(x)_SRCS))
HDRS = $(foreach x,$(PKGS),$($(x)_HDRS))

o/$(MODE)/depend: $(SRCS) $(HDRS)
	$(file >$@.args,$(SRCS) $(HDRS))
	@mkdir -o $(@D)
	mkdeps -o $@ -r o/$(MODE)/ @$@.args
```

### `cosmoaddr2line`

`cosmoaddr2line`プログラムは、プログラムがクラッシュを報告するたびに、DWARFデータに基づいてバックトレースを表示するために使用することができる。このプログラムは `cosmocc` によって生成された ELF 実行ファイルを引数として受け取る。例えば、`cosmocc` が `hello` という名前のプログラムをコンパイルした場合、バックトレースを取得するには `hello.com.dbg` (x86-64) または `hello.aarch64.elf` を cosmoaddr2line に渡す必要がある。ELf実行ファイルの後にプログラムカウンタ（命令ポインタ）のアドレスが来るが、これは`__builtin_frame_address(0)`を使って簡単に取得できる。Cosmoは場合によってはこれを簡単にすることができます。ShowCrashReports()`機能は、より良いバックトレースを得るために実行する必要がある`cosmoaddr2line`コマンドを表示するかもしれない。Windowsでは、Cosmopolitanのランタイムは、ブロックされた致命的なシグナルや`SIG_DFL`処分によってプログラムが死ぬたびに、`--strace`ログにコマンドを出力する。

### `mktemper`

`mktemper` コマンドは、従来の `mktemp` コマンドに代わるポータブルなコマンドである。我々のバージョンでは、暗号化された `getrandom()` エントロピー源から取得した 64 ビットの乱数値をフォーマットするなどの改良も加えられている。 このコマンドを使うには、`/tmp/foo.XXXXXXXXXX`のような引数を渡す必要がある。新しく作成されたファイルは標準出力に出力される。

## About

このツールチェーンはGCCをベースにしています。それも修正されている。私たちは2kLOCパッチを書き、C言語に`switch (errno) { case EINVAL: ... }`という機能を与えた。`EINVAL`のような定数がリンク可能なシンボルである場合に、` }`を切り替えます。このような場合、あなたのコードは、Cosmopolitan Libcのシステム定数が期待通りに動作するように、代わりに一連のif文を使うように書き換えられます。GNU GCCへのわたしたちの改変はISCライセンスのもと、`https://github.com/ahgamut/gcc/tree/portcosmo-11.2` で公開されています。ここにあるバイナリは、定期的に更新される `https://github.com/ahgamut/superconfigure/releases/tag/z0.0.30` で最初に公開されました。

## Legal

あなたのCosmopolitanツールチェインはGNU GCCのような自由ソフトウェアに基づいています。このディレクトリに含まれるLICENSEファイルによって説明されるように、あなたはこのソフトウェアを使用し変更する多くの自由を持っています。GPLライセンスのヘッダやランタイムライブラリは一切含まれていませんので、このツールチェーンを使ってあなたが作るソフトウェアはGPLに拘束されることはありません。すべてのCosmopolitan Libcのランタイムライブラリは、ISC、MIT、BSDなどの寛容なライセンスで提供されています。あなたのツールチェインの構築に協力した人々の名前が書かれた、多くの著作権表示があります。あなたは、バイナリと一緒にこれらの通知を配布する義務があります。Cosmopolitanはそれを簡単にします。Cライブラリは`.ident`ディレクティブを使用するように設定されており、関連する通知が自動的にバイナリに埋め込まれます。`less <bin/foo` のようなツールを使って表示することができます。

## 連絡先

本ツールチェーンに関するご質問やお問い合わせは、ジャスティン・タニー(`jtunney@gmail.com`)までお気軽にご連絡ください。

## こちらも参照

- `https://cosmo.zip/` : cosmoccでビルドしたバイナリをダウンロードできます。
- `https://github.com/ahgamut/superconfigure/` :  cosmocc ビルドレシピ
