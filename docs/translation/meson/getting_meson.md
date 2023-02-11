# Mesonの取得

Meson は Python 3 で実装されており、3.7 以降が必要です。オペレーティングシステムがパッケージマネージャを提供している場合、それを使ってインストールする必要があります。パッケージマネージャがないプラットフォームでは、[Python のホームページ](https://www.python.org/downloads/) からダウンロードする必要があります。[プラットフォーム固有の Python3のクセ](https://mesonbuild.com/Getting-meson.html#platformspecific-install-quirks)については以下を参照してください。

## メゾンのダウンロード

Meson のリリースは [GitHub リリースページ](https://github.com/mesonbuild/meson/releases) からダウンロードでき、リリース内や git リポジトリ自体から特別なことをしなくても ./meson.py を実行することが可能です。

Windowsでは、Pythonスクリプトを実行可能にするインストーラオプションでPythonをインストールしなかった場合、python /path/to/meson.py (python は Python 3.7 またはそれ以降) を実行する必要があります。

最新の開発コードは [Git](https://github.com/mesonbuild/meson) から直接入手することができ、常に動作し、使用できるように努めています。すべてのコミットは、CI を実行し、いくつかのプラットフォームをテストする pull-request プロセスを通過します。

## Mesonをzipappに格納する

リリースをダウンロードした後、スクリプトを実行すると、Meson 用のスタンドアロン単一ファイル実行ファイルを作成することができます。

```
./packaging/create_zipapp.py --outfile meson.pyz --interpreter '/usr/bin/env python3' <source checkout>
```

これは、pythonのネイティブサポートである[zipapp](https://docs.python.org/3/library/zipapp.html)を使用しています。

## pipによるMesonのインストール

Meson は [Python Package Index](https://pypi.python.org/pypi/meson/) に収録されており、pip3 install --user meson でインストールすることができます。これは特別な特権を必要としません。これは ~/.local/ にパッケージをインストールするので、~/.local/bin を PATH に追加する必要があります。Meson をローカルでの開発にのみ使用する場合は、これだけで十分です。

システム ディレクトリにプロジェクトをインストールする必要がある場合、この方法ではインストールされた実行ファイルを sudo が使用されているときに利用できないため、うまくいきません。sudo pip3 install meson を使用すると、すべてのユーザーが使用できるように Meson をインストールすることができます。一般に、この方法は推奨されませんが、代わりにディストロのパッケージで提供されるバージョンを使用します。

sudo pip3 で Meson をインストールする必要がある場合は、ディストロのバージョンを最初にアンインストールしてください。システム・ディレクトリに複数のバージョンのプログラムがあると、問題が発生する可能性があります。

## MSIインストーラによるMesonとNinjaのインストール

Windows 用の Meson と Ninja の両方を一度にインストールできる MSI インストーラを [GitHub リリースページ](https://github.com/mesonbuild/meson/releases) で提供しています。また、Pythonのコピーも埋め込まれているため、[Pythonモジュール](https://mesonbuild.com/Python-module.html)を使用し、外部依存のないスクリプトは期待通りに動作し続けることができます。

これは新しい機能なので、バグレポートを期待し、歓迎します。

## 依存関係

最も一般的なケースでは、Meson のデフォルトである ninja バックエンドを使用するために [Ninja executable](https://ninja-build.org/) が必要になります。このバックエンドはすべてのプラットフォームで、GCC, Clang, Visual Studio, MinGW, ICC, ARMCCなどを含むすべてのツールチェインで使用することができます。

可能であれば、パッケージマネージャが提供するバージョンを使用することができますが、そうでなければ、[Ninjaプロジェクトのリリースページ](https://github.com/ninja-build/ninja/releases)からバイナリ実行ファイルをダウンロードすることができます。

WindowsでVisual Studioのソリューションを生成するVisual Studioバックエンド(-backend=vs)、macOSでXCodeのプロジェクトを生成するXCodeバックエンド(-backend=xcode)のみ使用する場合は、Ninjaは必要ありません。

## プラットフォーム固有のインストール時の癖

## Windows Python3のクセ

Python 3をインストールする際には、以下のようにインストーラのオプションを選択することが強く推奨されます（必須ではありません）。

インストーラのステップ 1 インストーラのステップ 2 インストーラのステップ 3

これにより、PATH に python と pip が含まれるようになり、pip で Meson をインストールできるようになります。また、meson.py スクリプトへのフルパスを指定して py -3 を実行する代わりに、Windows 上の任意のシェルで meson を直接実行できるようになります。

## MSYS2 Python3のクセ

Windows上のMSYS2を開発環境として使用する場合、Python3を提供するmsys/pythonパッケージを使用しないように注意してください。どのMinGWターゲット用にビルドするかによって、mingw32/mingw-w64-i686-python3かmingw64/mingw-w64-x86_64-python3のいずれかを使用してください。

サブページ:

- [获取Meson](https://mesonbuild.com/Getting-meson_zh.html)
- [Obtendo o Meson](https://mesonbuild.com/Getting-meson_ptbr.html)

