# 実際にポータブルな実行ファイル

ある日、古いコードを研究していたところ、トンプソン・シェルがshebang行を使わなかったことから、WindowsのPortable ExecutableファイルをUNIX第6版のシェルスクリプトとしてエンコードできることを知った。Unix、Windows、MacOSで使われているバイナリ・フォーマットを合成して作ることが可能だとわかってから、私はそれを実現したいという誘惑に勝てなかった。仕組みはこうだ：

```sh
MZqFpD='
BIOS BOOT SECTOR'
exec 7<> $(command -v $0)
printf '\177ELF...LINKER-ENCODED-FREEBSD-HEADER' >&7
exec "$0" "$@"
exec qemu-x86_64 "$0" "$@"
exit 1
REAL MODE...
ELF SEGMENTS...
OPENBSD NOTE...
NETBSD NOTE...
MACHO HEADERS...
CODE AND DATA...
ZIP DIRECTORY...
```

私は、実際にポータブルな実行ファイル (APE) フォーマットを実装したCosmopolitanというプロジェクトを始めた。この名前を選んだのは、伝統的な境界を超えた、制限のないソフトウェアを書く自由があるというアイデアが好きだからだ。私の目標は、C言語がグリーンフィールド開発に適したビルド・ワンス・ラン・エニウェア言語となるよう支援することであり、同時に技術者コミュニティ間でのソフトウェアの共有を妨げるような前提を避けることである。C言語を始めるのは簡単だ：

```sh
gcc -g -O -static -fno-pie -no-pie -mno-red-zone -nostdlib -nostdinc -o hello.com hello.c \
  -Wl,--oformat=binary -Wl,--gc-sections -Wl,-z,max-page-size=0x1000 -fuse-ld=bfd -gdwarf-4 \
  -Wl,-T,ape.lds -include cosmopolitan.h crt.o ape.o cosmopolitan.a
```

上記のワンライナーで、我々は基本的にLinuxの純正コンパイラを再設定し、MacOS、Windows、FreeBSD、OpenBSD、NetBSDでも動作するバイナリを出力するようにした。これらは BIOS からも起動する。これは、デスクトップGUIに興味がなく、ただstdioとソケットが欲しいだけで、開発者が苦労しない人向けであることに注意してほしい。

## プラットフォームにとらわれないC / C++ / FORTRANツール

クロスプラットフォームのネイティブビルドがこんなに簡単になるとは誰が予想できただろうか？結局のところ、驚くほど安上がりでもある。すべてのマジックナンバー、win32 utf-8ポリフィル、biosブートローダーのコードを使っても、exeはGo Hello Worldのおよそ100分の1のサイズになる：

- life.com is 12kb (symbols, source)
- hello.com is 16kb (symbols, source)

zshにはThompson Shellとのちょっとした後方互換性の不具合があることに注意してほしい（update 2021-02-15: zshは現在パッチを適用済み）。`./hello.com` ではなく、`sh hello.com` を試してほしい。それはさておき、こんなに簡単なのに、なぜ今まで誰もやらなかったのでしょうか？私が言える最善の答えは、システム・インターフェースに関連するCプリプロセッサ・マクロをシンボリックにする必要があるという、ちょっとしたABIの変更が必要だからだ。これは、`switch(errno){case EINVAL:...}` のようなケースを除けば、ほとんど問題にならない。もしルールを曲げても問題ないと感じるなら、GNUリンカは、特別なツールチェインなしで、必要なPE/Darwinデータ構造をリンク時に生成するように簡単に設定できる。

## PKZIP実行可能ファイルは非常に優れたコンテナになる

単一ファイルの実行可能ファイルはあると便利だ。zoneinfoのように、システムファイルに依存する静的な実行ファイルが理にかなっているケースもいくつかある。しかし、Windowsもサポートする複数のディストロで動作するバイナリをビルドするのであれば、そのような仮定はできない。

結局のところ、PKZIPはそのマジックマーカーをファイルの最初ではなく最後に置くように設計されているので、ZIPでもELF/PE/MachOバイナリを合成することができる！私は、数行のリンカスクリプトと、セクションをインクリメンタルに圧縮するプログラムを使って、Cosmopolitanコードベースにこれを効率的に実装することができた。

unzip -vl executable.comを実行して中身を見ることができる。Windows 10では、ファイルの拡張子を.zipに変更し、MicrosoftのバンドルされているZIP GUIで開くことも可能だ。コンパイル後のアセットを簡単に編集できるという柔軟性があるということは、ZIP経由で解釈されたソースを反射的にロードする、簡単に配布可能なJavaScriptインタプリタを作成するようなこともできるということだ。

- hellojs.com is 300kb (symbols, source)

Cosmopolitanはまた、GPLv2 (update 2020-12-28: APEは現在ISCライセンスです)の遵守を自動化するためにZIPフォーマットを使用しています。非商用の libre ビルドは、デフォルトで、hermetic make モノレポからリンクされたソースファイルを埋め込むように設定されています。そのため、バイナリがおよそ10倍大きくなります。例えば

- life2.com is 216kb (symbols, source)
- hello2.com is 256kb (symbols, source)

ロックミュージシャンは、ダイナミックレンジの圧縮と愛憎関係にある。なぜなら、圧縮は彼らの音楽から複雑な次元を取り除くが、プロフェッショナルに聞こえるためには必要だからだ。その場合、zipソースファイルの埋め込みは、クラシカルでないソフトウェアの消費者にアピールするために、リソースを浪費する、より社会的配慮のある方法かもしれない。

## x86-64 Linux ABIはかなり良いリンガフランカになる

コンピューティングの歴史において、ハードウェア・アーキテクチャが明確に淘汰されたのはごく最近のことで、それはTOP500リストが最もよく証明している。電話ルーター・メインフレーム・自動車以外では、x86を取り巻くコンセンサスはバベルの塔に例えられるほど強固だ。リーナス・トーバルズのおかげで、我々はアーキテクチャに関するコンセンサスを得ただけでなく、SYSCALL命令を介してプログラムがホストマシンと通信する入出力メカニズムに関するコンセンサスも得ることができた。リーナス・トーバルズは、自宅でバスローブ姿で巨大企業に電子メールを送り、コモンズの悲劇とは正反対のものを作るためにリソースを割くことに同意させることで、それを達成したのだ。

だから、システムエンジニアリングについて楽観的になるには、今が本当にベストな時期だと思う。私たちは、これまで以上に物事を共有することに同意している。アップルやマイクロソフトがARMにPCの軸足を移そうとしていることは、ニュースでもよく耳にする。x86_64の特許は今年で切れるはずなので、なぜCクラスのマッキントッシュが必要なのかはわからない。アップルはおそらく、ロイヤリティを支払うことなく独自のx86チップを作ることができただろう。私たちがいつも夢見てきたフリー/オープン・アーキテクチャは、すでに私たちが使っているものになるかもしれない。

マイクロプロセッサー・アーキテクチャーのコンセンサスが最終的に存在するのであれば、ソフトウェア開発者がその恩恵を受けられるような、より良いツールの構築に注力すべきだと私は思う。x86-64の実行がメモリに与える影響を視覚化する、より友好的な方法を構築することである。これにより、APEがどのように機能するかが明らかになるはずだ。


Windows PEヘッダをコードのように扱うことで、実行が開始されることに気づくだろう。例えば、ASCII文字列 "MZqFpD "は pop %r10 ; jno 0x4a ; jo 0x4a とデコードされ、文字列"177ELF"は jg 0x47 とデコードされる。その後、プログラムがブートされるのではなくユーザー空間から実行されることを示すmovステートメントを経て、エントリポイントにホップする。

マジック・ナンバーは、分散セクションとGNUアセンブラの.sleb128ディレクティブを使って、ホスト・オペレーティング・システム用に簡単にアンパックされる。UNICODEビットルックアップテーブルのような低エントロピーデータは、一般に103バイトのLZ4デコンプレッサーか17バイトのランレングスデコーダーを使ってデコードされ、ランタイムコードモーフィングはインテルの3kb x86デコーダーを使って簡単にできる。

このエミュレータは必須ではないことに注意してほしい。APEは、シェルやNTコマンドプロンプトで実行するか、BIOSからブートすれば問題なく動作します。これはJVMではない。エミュレータは必要なときだけ使う。例えば、プログラムの実行がメモリにどのような影響を与えるかをクールに視覚化できるのは便利だ。

私たちが書いたどんな普通のPCプログラムも、Raspberry PiやApple ARM上で「ただ動く」ことがわかるとうれしい。コスモポリタンがqemu-x86_64を使ってすでにやっているのと同じように、x86の実行ファイルに上記のエミュレーターのARMビルドを埋め込み、適切にモーフィングして再実行させるだけだ。トレードオフは、そうすると、バイナリがGoのHello Worldの100倍ではなく、10倍しか小さくならないということだ。もう一つのトレードオフは、GCCランタイムの例外がコードのモーフィングを禁じていることです。

x86-64-linux-gnuを可能な限り小さくし、完全なエミュレーションを利用できるようにする最も説得力のあるユースケースは、通常のシンプルなネイティブプログラムを、デフォルトでウェブブラウザを含むあらゆる場所で実行できるようにすることです。この分野で構築されたソリューションの多くは、GUIやスレッドのようなコンセンサスが得られていないインターフェースに集中しすぎる傾向がある。そうでなければ、DockerやブラウザでWindowsを実行するFabrice Bellardのように、オペレーティング・システム全体をエミュレートするだけになってしまう。

## メンテナンス不要の長寿命

私がこういった多くの古いテクノロジーを使って仕事をするのが好きな理由のひとつは、自分が関わるソフトウェアが、最小限の労力で時の試練に耐えられるものであってほしいからだ。スーパーマリオブラザーズのROMが、GitHubのissue trackerを必要とすることなく、何年も生き延びることができたのと似ている。

そうするための最善のチャンスは、すでに何十年もコンセンサスを得ているバイナリー・インターフェイスを接着し、APIを無視することだと私は信じている。例えば、ここにMac、Linux、BSD、Windowsディストロで使われているマジックナンバーがある。これらの数字は、あなたが使ったことのあるほとんどすべてのコンピューター、サーバー、電話の内部を支えているのだから。

すべてのシステムに共通する数字のサブセットに注目し、共通の祖先であるベル・システム5と比較すれば、システムエンジニアリングに関することは、バイナリレベルでは過去40年間ほとんど変わっていないことがわかる。マグナムはつまらない。プラットフォームは、自分自身を壊すことなく、それを壊すことはできない。UNIXの数秘術を変える必要がある理由について、長年にわたってビジョンを提案してきた人はほとんどいない。

### ダウンロード

- emulator.com (280k PE+ELF+MachO+ZIP+SH)
- tinyemu.com (188k PE+ELF+MachO+ZIP+SH)

### ソースコード

- ape.S
- ape.lds
- blinkenlights.c
- x86ild.greg.c
- syscalls.sh
- consts.sh

### プログラム

- life.com (12kb ape symbols)
- sha256.elf (3kb x86_64-linux-gnu)
- hello.bin (55b x86_64-linux-gnu)

### 例

```sh
bash hello.com              # runs it natively
./hello.com                 # runs it natively
./tinyemu.com hello.com     # just runs program
./emulator.com -t life.com  # show debugger gui
echo hello | ./emulator.com sha256.elf
```

### マニュアル

```txt
SYNOPSIS

  ./emulator.com [-?HhrRstv] [ROM] [ARGS...]

DESCRIPTION

  Emulates x86 Linux Programs w/ Dense Machine State Visualization
  Please keep still and only watchen astaunished das blinkenlights

FLAGS

  -h        help
  -z        zoom
  -v        verbosity
  -r        real mode
  -s        statistics
  -H        disable highlight
  -t        tui debugger mode
  -R        reactive tui mode
  -b ADDR   push a breakpoint
  -L PATH   log file location

ARGUMENTS

  ROM files can be ELF or a flat αcτµαlly pδrταblε εxεcµταblε.
  It should use x86_64 in accordance with the System Five ABI.
  The SYSCALL ABI is defined as it is written in Linux Kernel.

FEATURES

  8086, 8087, i386, x86_64, SSE3, SSSE3, POPCNT, MDA, CGA, TTY

WEBSITE

  https://justine.lol/blinkenlights/
```

### 資金調達

 [United States of Lemuria - two dollar bill - all debts public and primate]

この技術の資金は、Justine TunneyのGitHubスポンサーとPatreon購読者からのクラウドソースでした。あなたのサポートが、Actually Portable Executableのようなプロジェクトを可能にしているのです。ありがとうございました。

### 参照

ジャスティンのページ