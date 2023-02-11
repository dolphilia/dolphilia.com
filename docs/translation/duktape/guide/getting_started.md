## スタートアップ {#getting_started}


### ダウンロード

[ダウンロード](https://duktape.org/download.html)ページからソース配布物をダウンロードします。


### テスト用コマンドラインツール

配布物を解凍します。

```sh
$ cd /tmp
$ tar xvfJ duktape-<version>.tar.xz
```


提供されたMakefileを使用して、コマンドラインツールをコンパイルしてください。

```sh
$ cd /tmp/duktape-<version>/
$ make -f Makefile.cmdline
```


Makefileはgccがインストールされていることが前提になっています。そうでない場合は、Makefileをあなたのコンパイラに合わせて編集すればよいのです（Makefileは非常にシンプルです）。

> Duktapeは移植性の問題を避けるため、ファイルやコンソールのI/Oに対する組み込みのバインディングを提供していません（例えば、I/O APIが全くないプラットフォームもあります）。コマンドライン・ユーティリティは、extras/print-alert を使って print() と alert() のバインディングを提供し、簡単に遊べるようにしています。配布物には、以下のような便利な(オプションの)バインディングを提供する「extras」があります。
>
> - print() や alert()
> - コンソールオブジェクト、例：console.log()
> 
> __このガイドの例では、説明のために print() バインディングを想定しています。__

> コマンドラインツールは、デフォルトでプラットフォーム依存を回避しています。Makefile を編集することで、linenoise による行編集のサポートを追加することができます。
> - DDUK_CMDLINE_FANCY を追加する。
> - linenoise.hのヘッダに-Ipath/to/linenoiseを追加する。
> - ソースリストに path/to/linenoise.c を追加する。
> - LinenoiseはPOSIX環境でのみ動作し、Cコンパイラが必要です(C++ではありません)


ECMAScriptのコードをインタラクティブに実行できるようになりました。

```sh
$ ./duk
((o) Duktape 2.6.0 (v2.6.0)
duk> print('Hello world!')
Hello world!
= undefined
```


また、ECMAScriptのコードをファイルから実行することができるので、機能やアルゴリズムで遊ぶのに便利です。例として、fib.js を作成します。

```javascript
// fib.js
function fib(n) {
    if (n == 0) { return 0; }
    if (n == 1) { return 1; }
    return fib(n-1) + fib(n-2);
}

function test() {
    var res = [];
    for (i = 0; i < 20; i++) {
        res.push(fib(i));
    }
    print(res.join(' '));
}

test();
```


コマンドラインからスクリプトをテストします。

```sh
$ ./duk fib.js
0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 987 1597 2584 4181
```


### Duktapeをプログラムに組み込む

コマンドラインツールは、Duktapeを組み込んだプログラムの一例です。Duktapeをあなたのプログラムに組み込むのは非常に簡単です。

- duktape-N.N.N/tools/configure.pyを実行して、ビルドのためにDuktapeを設定する。その結果、duktape.c, duktape.h, duk_config.h を含むディレクトリができます。
- duktape.c, duktape.h, duk_config.hをビルドに追加し、プログラムの他の場所からDuktape APIを呼び出してください。

Duktapeの配布物（duktape-N.N.N.tar.xz）のsrc/ディレクトリには、Duktapeのデフォルト設定のための事前設定済みのヘッダーファイルとソースファイルが含まれており、通常はそのまま使用することができます。必要であれば、設定ツールを使って、Duktapeを低メモリ・ターゲット用に最適化したり、機能を有効化／無効化したりといったDuktapeのオプションをカスタマイズすることができます。詳細と例については、コンパイルと[Configuring Duktape for build](http://wiki.duktape.org/Configuring.html)（ビルドのためのDuktapeのコンパイルと設定）を参照してください。

配布物には、このプロセスを説明する非常に簡単なサンプル・プログラム hello.c が含まれています。あらかじめ設定されたDuktapeのヘッダーとテストプログラムは、Duktapeコンテキストを作成し、それを使っていくつかのECMAScriptコードを実行します。
ソース・ファイルを使って、テスト・プログラムを例えば以下のようにコンパイルします。

```sh
$ cd /tmp/duktape-<version>/
$ gcc -std=c99 -o hello -Isrc src/duktape.c examples/hello/hello.c -lm
```


Duktapeの設定をカスタマイズするには、configure.pyを使います。

```sh
$ cd /tmp/duktape-<version>/
# ここではECMAScript 6のProxyオブジェクトのサポートを無効にしています。
$ python2 tools/configure.py --output-directory duktape-src -UDUK_USE_ES6_PROXY
$ gcc -std=c99 -o hello -Iduktape-src duktape-src/duktape.c examples/hello/hello.c -lm
```


テストプログラムは、Duktapeコンテキストを作成し、それを使っていくつかのECMAScriptコードを実行します。

```sh
$ ./hello
Hello world!
2+3=5
```


Duktapeはエンベデッドエンジンなので、プログラムの基本的な制御フローを変更する必要はありません。基本的なやり方は

- プログラムの初期化時などに、Duktapeコンテキストを作成します（スクリプトが必要な場合は、オンデマンドでも構いません）。通常、初期化時にスクリプトをロードしますが、これはオンデマンドで行うこともできます。
- コードの中でスクリプトを使用したい箇所を特定し、そこにスクリプト関数の呼び出しを挿入します。
- スクリプト関数の呼び出しを行うには、まずDuktape APIを使って呼び出しの引数をDuktapeコンテキストのバリュー・スタックにプッシュします。その後、別のDuktape APIコールを使って実際の呼び出しを開始します。
- スクリプトの実行が終了すると、制御がプログラムに戻り（APIコールが戻り）、Duktapeコンテキストのバリュー・スタックに戻り値が残されています。C言語コードは、Duktape APIを使ってこの戻り値にアクセスすることができます。

より広い意味で、Duktapeをネイティブ・コードで使用する方法には、いくつかのアプローチがあります。

- メイン・アプリケーションはC/C++コードで実行し、基本機能の拡張のためにDuktapeを呼び出す（例：プラグインやコンフィギュレーションなど）。
- メイン・アプリケーションはECMAScriptコードで実行し、I/Oやパフォーマンス重視の操作などでは、シンプルなC/C++ネイティブ・バインディングを呼び出す。ネイティブバインディングはしばしばステートレスに保たれ、ステートロジックがスクリプトコードから見えないようにします。
- ECMAScript コードでメインアプリケーションを実行し、パフォーマンス重視の操作にはより複雑でステートフルな C/C++ ネイティブバインディングを使用します。例えば、グラフィックエンジンはネイティブオブジェクトとして実装することができます。

詳しい例は、以下のWiki記事を参照してください。

- はじめに: ラインプロセッシング
- はじめに: プライマリティテスト