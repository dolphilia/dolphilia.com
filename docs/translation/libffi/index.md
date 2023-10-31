# libffi

ポータブルな外部関数インターフェイスライブラリ

libffi-3.4.4は2022年10月23日にリリースされた。githubからダウンロードしてください。: https://github.com/libffi/libffi/releases/download/v3.4.4/libffi-3.4.4.tar.gz.

libffiはフリーソフトウェアです。非常に自由なライセンスです。

## libffiとは？

高級言語用のコンパイラーは、特定の規約に従ったコードを生成する。これらの規約は、部分的には、個別コンパイルが機能するために必要なものである。そのような規約のひとつが「呼び出し規約」である。呼び出し規約」とは、関数の引数が関数に入るときにどこにあるかについて、コンパイラが仮定したものです。呼び出し規約」はまた、関数の戻り値がどこにあるかについても指定します。

プログラムによっては、関数にどのような引数が渡されるのか、コンパイル時には分からないものもある。例えば、ある関数を呼び出すときに使われる引数の数と種類を、実行時にインタプリタに知らせることがあります。Libffiはそのようなプログラムで、インタプリタ・プログラムからコンパイルされたコードへの橋渡しをするために使うことができます。

libffiライブラリーは、様々な呼び出し規約に対する移植性の高い高レベルプログラミングインターフェースを提供します。これにより、プログラマーは、呼び出しインターフェイス記述によって指定された任意の関数を実行時に呼び出すことができます。

FFIとは、Foreign Function Interface（外部関数インターフェース）の略である。外部関数インターフェースは、ある言語で書かれたコードが別の言語で書かれたコードを呼び出すことを可能にするインターフェースの一般的な名称です。libffiライブラリーは、実際には、完全な機能を持つ外部関数インターフェースの、最も低い、マシン依存のレイヤーを提供するだけである。libffiの上には、2つの言語間で渡される値の型変換を処理する層が存在しなければならない。

## 誰が使うのか？

libffiライブラリーは、インタープリタ型コードとネイティブ・コンパイル型コードの間のブリッジを構築しようとするすべての人に有用である。代表的なユーザーは以下の通り。:

- CPython - Pythonプログラミング言語のデフォルトで最も広く使われている実装では、標準ctypesライブラリのlibffiが使われている。
- OpenJDK - Java Platform Standard Editionのオープンソース実装では、いくつかのプラットフォームでインタプリタとネイティブコード間のブリッジにlibffiが使われている。
- js-ctypes - MozillaがFirefox 3.6で提供する予定のjavascript用の外部関数インターフェース。
- Dalvik - Dalvikは、Androidモバイル・デバイス上でJavaプラットフォームを実行する仮想マシンである。libffiは、カスタム・ブリッジング・コードが書かれていないAndroidポートで使用される。
- Java Native Access (JNA) - Javaからネイティブ・コードを呼び出すJNIフリーの方法。
- Ruby-FFI - Ruby の Foreign Function Interface 拡張。
- fsbv - Foreign Structure By Valueは、Common Lispの外部関数インターフェース・ライブラリで、標準のCFFIパッケージを拡張し、構造体の引数を値で渡す機能をサポートしています。
- JSCocoa - Mac OSXとiPhone（libffi-iphoneポート経由）でjavascriptからObjective-Cコードを呼び出す。
- PyObjC - Mac OSX上でPythonからObjective-Cのコードを呼び出す。
- RubyCocoa - Mac OSX上のRubyからObjective-Cのコードを呼び出す。
- The Glasgow Haskell Compiler - この人気のあるHaskell実装からCコードを呼び出す。
- Racket - この有名なScheme処理系からCコードを呼び出す。
- gcj - Javaプログラミング言語用GNUコンパイラのランタイム・ライブラリであるlibffiは、解釈されたコードとネイティブにコンパイルされたコードとの間を行き来するコールを処理するために使われる。 gcjはGCC（GNU Compiler Collection）の一部である。

## 対応プラットフォーム

Libffiは多くの異なるプラットフォームに移植されています。具体的な設定の詳細とテスト状況については、READMEファイルを参照してください。リリース時点では、以下の基本構成がテストされています：

| アーキテクチャ | OS |
|---|--|
| AArch64 (ARM64) | iOS |
| AArch64 | Linux |
| AArch64 | Windows |
| Alpha | Linux |
| Alpha | Tru64 |
| ARC | Linux |
| ARM | Linux |
| ARM | iOS |
| ARM | Windows |
| AVR32 | Linux |
| Blackfin | uClinux |
| CSKY | Linux |
| HPPA | HPUX |
| IA-64 | Linux |
| KVX | Linux |
| LoongArch64 | Linux |
| M68K | FreeMiNT |
| M68K | Linux |
| M68K | RTEMS |
| M88K | OpenBSD/mvme88k |
| Meta | Linux |
| MicroBlaze | Linux |
| MIPS | IRIX |
| MIPS | Linux |
| MIPS | RTEMS |
| MIPS64 | Linux |
| Moxie | Bare metal |
| Nios II | Linux |
| OpenRISC | Linux |
| PowerPC 32-bit | AIX |
| PowerPC 64-bit | AIX |
| PowerPC | AMIGA |
| PowerPC | Linux |
| PowerPC | Mac OSX |
| PowerPC | FreeBSD |
| PowerPC 64-bit | FreeBSD |
| PowerPC 64-bit | Linux ELFv1 |
| PowerPC 64-bit | Linux ELFv2 |
| RISC-V 32-bit | Linux |
| RISC-V 64-bit | Linux |
| S390 | Linux |
| S390X | Linux |
| SPARC | Linux |
| SPARC | Solaris |
| SPARC | Solaris |
| SPARC64 | Linux |
| SPARC64 | FreeBSD |
| SPARC64 | Solaris |
| TILE-Gx/TILEPro | Linux |
| VAX | OpenBSD/vax |
| X86 | FreeBSD |
| X86 | GNU HURD |
| X86 | Interix |
| X86 | kFreeBSD |
| X86 | Linux |
| X86 | Mac OSX |
| X86 | OpenBSD |
| X86 | OS/2 |
| X86 | Solaris |
| X86 | Solaris |
| X86 | Windows/Cygwin |
| X86 | Windows/MingW |
| X86-64 | FreeBSD |
| X86-64 | Linux |
| X86-64 | Linux/x32 |
| X86-64 | OpenBSD |
| X86-64 | Solaris |
| X86-64 | Windows/Cygwin |
| X86-64 | Windows/MingW |
| X86-64 | Mac OSX |
| Xtensa | Linux |

Please send additional platform test results to libffi-discuss@sourceware.org and feel free to update the wiki page above.

## 入手方法

最新版はgithubからダウンロードできます。: https://github.com/libffi/libffi/releases/download/v3.4.4/libffi-3.4.4.tar.gz.

http://github.com/libffi/libffi の開発用gitリポジトリから最新版をチェックすることもできます。方法は以下の通り：

```sh
git clone git://github.com/libffi/libffi.git
```

また、http://github.com/libffi/libffi でソースを閲覧することもできる。

## メーリングリスト

このような小さなソフトウェアには、たくさんのメーリングリストが用意されている。

- libffi-announce は libffi のリリースアナウンス用の低容量メーリングリストです。
- libffi-discuss は質問やバグ報告などのためのメーリングリストです。

## 著者とクレジット

libffiの原作者はAnthony Greenである。

GNUコンパイラコレクションプロジェクトの開発者は、無数の貴重な貢献をしました。詳しくは、ソース配布物のこの変更ログファイルをご覧ください。

libffiの背後にあるアイデアのいくつかは、Gianni MarianiのSilicon Graphicsマシン用のフリーなgencallライブラリに触発されたものです。

クロージャ機構は Kresten Krab Thorup が設計し実装した。

主なプロセッサアーキテクチャの移植は、以下の開発者が貢献した：

|アーキテクチャ|開発者|
|---|---|
| aarch64         | Marcus Shawcroft, James Greenhalgh |
| alpha           | Richard Henderson |
| arc             | Hackers at Synopsis |
| arm             | Raffaele Sena |
| avr32           | Bradley Smith |
| blackfin        | Alexandre Keunecke I. de Mendonca |
| cris            | Simon Posnjak, Hans-Peter Nilsson |
| csky            | Ma Jun, Zhang Wenmeng |
| frv             | Anthony Green |
| ia64            | Hans Boehm |
| kvx             | Yann Sionneau |
| loongarch64     | Cheng Lulu, Xi Ruoyao, Xu Hao,Zhang Wenlong, Pan Xuefeng |
| m32r            | Kazuhiro Inaoka |
| m68k            | Andreas Schwab |
| m88k            | Miod Vallat |
| metag           | Hackers at Imagination Technologies |
| microblaze      | Nathan Rossi |
| mips            | Anthony Green, Casey Marshall |
| mips64          | David Daney |
| moxie           | Anthony Green |
| nios ii         | Sandra Loosemore |
| openrisc        | Sebastian Macke |
| pa              | Randolph Chung, Dave Anglin, Andreas Tobler |
| powerpc         | Geoffrey Keating, Andreas Tobler, David Edelsohn, John Hornkvist |
| powerpc64       | Jakub Jelinek |
| riscv           | Michael Knyszek, Andrew Waterman, Stef O'Rear |
| s390            | Gerhard Tonn, Ulrich Weigand |
| sh              | Kaz Kojima |
| sh64            | Kaz Kojima |
| sparc           | Anthony Green, Gordon Irlam |
| tile-gx/tilepro | Walter Lee |
| vax             | Miod Vallat |
| x86             | Anthony Green, Jon Beniston |
| x86-64          | Bo Thorsen |
| xtensa          | Chris Zankel |

イェスパー・スコフとアンドリュー・ヘイリーが、コードを調べたりバグを追跡したりと、分担以上の仕事をしてくれた。

また、Tom Tromeyにはバグフィックス、ドキュメンテーション、コンフィギュレーションの手助けをしてもらった。

libffi のインターフェースについて有益なフィードバックをくれた Jim Blandy にも感謝する。

Andreas Toblerはtestsuiteに多大な労力を費やしてくれた。

Alex Oliva は SElinux の実行可能ページの問題を解決してくれた。

上記のリストはほぼ間違いなく不完全で不正確です。ご要望があれば、喜んで修正や追加を行います。

問題があったり、バグを見つけたりした場合は、issue tracker https://github.com/libffi/libffi/issues に問題を申請してください。作者への連絡先は green@moxielogic.com です。