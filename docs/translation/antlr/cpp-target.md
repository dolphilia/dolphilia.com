# C++

C++ターゲットは、MS Visual Studio 2013（またはそれ以降）、XCode 7（またはそれ以降）、CMake（C++11が必要）のいずれかを実行できるすべてのプラットフォームをサポートしています。すべてのビルド・ツールで、スタティック・ライブラリまたはダイナミック・ライブラリを作成できます。さらに、XCodeはiOSライブラリを作成できます。Antlr4 for C++ with CMake: A practical exampleも参照してください。

## C++レキサーやパーサーを作成するには？
これは、例えば言語ターゲットを指定する必要があることを除けば、Javaレキサーやパーサーを作成するのとほとんど同じです：

```
$ antlr4 -Dlanguage=Cpp MyGrammar.g4
```

この呼び出しによって生成されたファイルが大量にあることがわかるだろう。visitorやlistenerが抑制されていない場合（これがデフォルト）、次のようになる：

* MyGrammarLexer.h + MyGrammarLexer.cpp
* MyGrammarParser.h + MyGrammarParser.cpp
* MyGrammarVisitor.h + MyGrammarVisitor.cpp
* MyGrammarBaseVisitor.h + MyGrammarBaseVisitor.cpp
* MyGrammarListener.h + MyGrammarListener.cpp
* MyGrammarBaseListener.h + MyGrammarBaseListener.cpp

## ランタイムはどこで入手できますか？

レキサーやパーサーのコードを生成したら、ランタイムをダウンロードまたはビルドする必要があります。Windows（Visual Studio 2013/2015）、OSX/macOS、iOS用のビルド済みC++ランタイムバイナリは、ANTLRウェブサイトで入手できます：

* http://www.antlr.org

CMakeを使用してLinuxライブラリをビルドする（OSXでも動作するが、iOSライブラリでは動作しない）。

ビルド済みのバイナリをダウンロードする代わりに、OSXやWindows上で独自のライブラリを簡単にビルドすることもできる。XCodeまたはVisual Studio用に提供されているプロジェクトを使ってビルドするだけです。依存関係を追加することなく、すぐに動作するはずだ。


## 生成されたレキサーやパーサーを実行するにはどうすればよいですか？

パーサーを動作させるためにすべてをまとめるのはとても簡単です。簡単な例として、runtime/Cpp/demoフォルダを見てください。そこにあるREADMEには、OSX、Windows、Linux上でデモをビルドして実行する方法が簡単に説明されています。

::: info ANTLR 4 C++ ターゲットのデモアプリケーション

このデモアプリケーションは、動的および静的ライブラリとしてANTLRランタイムを構築する方法と、簡単なデモ文法から生成されたパーサーを使用する方法を示しています。

これを動作させるにはいくつかのステップが必要です：

- 現在のANTLR jarをダウンロードし、このフォルダに置きます。
- お使いのプラットフォーム用の生成スクリプト（Windowsの場合はgenerate.cmd、*nix/OSXの場合はgenerate.sh）を開き、LOCATION varをダウンロードしたjarの実際の名前に更新します。
- 生成スクリプトを実行する。generated "という名前のサブフォルダーに、テスト用のパーサーとレキサー、リスナーとビジターのクラスが生成されます。デモ・アプリケーションはここでこれらのファイルを探します。
- あなたのシステムに合ったフォルダでプロジェクトを開いてください。
- コンパイルして実行してください。

コンパイルはruntime/cpp/readme.mdファイルに記述されているとおりに行う。

:::

## カスタムリスナーを作成し、実行するには？

上記の生成ステップでは、リスナーとベース・リスナー・クラスを作成しました。リスナー・クラスは抽象インターフェースで、各パーサー・ルールの入力メソッドと終了メソッドを宣言します。ベース・リスナーはこれらの抽象メソッドをすべて空のボディで実装するので、1つの関数を実装したいだけなら自分で実装する必要はありません。したがって、このベース・リスナーをカスタム・リスナーのベース・クラスとして使用します：

```cpp
#include <iostream>

#include "antlr4-runtime.h"
#include "MyGrammarLexer.h"
#include "MyGrammarParser.h"
#include "MyGrammarBaseListener.h"

using namespace antlr4;

class TreeShapeListener : public MyGrammarBaseListener {
public:
  void enterKey(ParserRuleContext *ctx) override {
	// キー・ルールを入力する際に何かをする。
  }
};


int main(int argc, const char* argv[]) {
  std::ifstream stream;
  stream.open(argv[1]);
  ANTLRInputStream input(stream);
  MyGrammarLexer lexer(&input);
  CommonTokenStream tokens(&lexer);
  MyGrammarParser parser(&tokens);

  tree::ParseTree *tree = parser.key();
  TreeShapeListener listener;
  tree::ParseTreeWalker::DEFAULT.walk(&listener, tree);

  return 0;
}

```
 
この例では、`enterKey`関数が生成された`key`というパーサールールが文法に含まれていると仮定しています。

## このANTLRターゲットの特殊なケース

C++ ANTLRターゲットだけが扱わなければならないことがいくつかある。それらについて説明します。

### コード生成の側面
コード生成（ANTLR4 jarの実行）では、生成されたファイルをアプリケーションにうまく統合するために役立つと思われる2つの値を指定できます（どちらもオプションです）：

* 名前空間: `-package`パラメーターを使用して、必要な名前空間を指定します。
* エクスポートマクロ: 特にVC++では、DLLからクラスをエクスポートするために余分な作業が必要になります。これは通常、DLL を作成するかインポートするかによって異なる値を持つマクロによって実現される。ANTLR4 ランタイム自体も、クラスに対してマクロを使用します：

```c++
  #ifdef ANTLR4CPP_EXPORTS
    #define ANTLR4CPP_PUBLIC __declspec(dllexport)
  #else
    #ifdef ANTLR4CPP_STATIC
      #define ANTLR4CPP_PUBLIC
    #else
      #define ANTLR4CPP_PUBLIC __declspec(dllimport)
    #endif
  #endif
```
`ANTLR4CPP_PUBLIC`マクロのように、生成されるクラスに独自のマクロを指定するには、`-DexportMacro=...`コマンドラインパラメータを使用します。
文法ファイルのオプション `options {exportMacro='...';}` を使用して、生成されるクラスに独自のマクロを指定することができます。

Visual Studioでスタティックライブラリを作成するには、スタティックライブラリのプロジェクト設定に加えて、`ANTLR4CPP_STATIC`マクロを定義します（ランタイムを自分でコンパイルする場合）。

gccとclangでは、`-fvisibility=hidden`設定を使用することで、default-visibleに設定されているシンボル（ランタイムのすべてのパブリッククラスに対して定義されている）以外のすべてのシンボルを非表示にすることができます。

### コンパイル・アスペクト

生成されたファイルをコンパイルするとき、必要に応じてコンパイルオプションを設定することができます（これもオプションです）：

* スレッドローカルの DFA マクロ：コンパイルオプションに `-DANTLR4_USE_THREAD_LOCAL_CACHE=1` を追加する。
を追加すると、スレッドローカルDFAキャッシュの使用が有効になる（デフォルトでは無効）。
これにより、スレッドローカルDFAを保存するためのメモリ使用量と、スレッドローカルDFAを構築するための冗長な計算量が増加します（それほど多くはありません）。
メリットは、複数のスレッドで実行する同時実行性能を向上させることができることだ。
つまり、コンカレント・スループットが十分でないと感じたら、このオプションをオンにすることを検討すべきである。

### メモリ管理
C++には組み込みのメモリー管理がないため、私たちは細心の注意を払う必要がある。そのために、私たちは主にスマート・ポインタに頼っているが、注意して使わないと、時間的ペナルティやメモリの副作用（巡回参照など）を引き起こす可能性がある。しかし現在のところ、メモリ・ハウスは非常に安定している。一般的に、コードの中で生のポインターを見かけたら、これは別の場所で管理されていると考えてください。そのようなポインターを管理しようとしてはいけません（削除、スマート・ポインターへの割り当てなど）。

したがって、構文解析ツリーはその構文解析ツリーの有効期間のみ有効である。パーサーはそのトークンストリームの寿命の間だけ有効で、元の `ANTLRInputStream`（または同等のもの）に戻ります。関数の呼び出しにまたがってツリーを保持するには、これらのすべてを作成して保存し、必要がなくなったらツリー以外のすべてを `delete` する必要があります。

### ユニコードのサポート
つまり、レキサーがテキスト入力をレキサートークンに変換するときである。パーサーはエンコーディングをまったく意識しません。

C++ターゲットは常にUTF-8の入力（文字列またはストリーム）を期待し、それがUTF-32（char32_t配列）に変換されてレキサーに送られます。

### 名前付きアクション
生成ファイルのカスタマイズを助けるために、いわゆる名前付きアクションがいくつか追加されています。これらのアクションは生成されたコードの特定の領域にタイトで、カスタム（ターゲット固有）のコードを追加することができます。すべてのターゲットはこれらのアクションをサポートしています

* @parser::header
* @parser::members
* @lexer::header
* @lexer::members

(そのスコープレスの代替である `@header` と `@members` がある。) ここで、headerはC/C++のヘッダーファイルではなく、コードファイルの先頭を意味する。ヘッダーアクションの内容は、生成されたすべてのファイルの最初の行に表示されます。そのため、ライセンス/著作権情報のようなものに適しています。

*members*アクションの内容は、レキサーやパーサーのクラス宣言のpublicセクションに置かれる。したがって、文法述語で使用されるパブリック変数や述語関数に使用することができます。すべてのターゲットは *header* + *members* をサポートしているので、他の言語の生成ファイルでも利用できるようにするための最適な場所です。

それに加えて、C++ターゲットでは、このような名前付きアクションがさらに多数サポートされている。残念ながら、新しいスコープ（たとえば、*parser*に加えて*listener*）を定義することはできないので、既存のスコープ（*lexer*または*parser*）の一部として定義する必要がある。デモアプリケーションの文法は、参考のため、すべての名前付きアクションを含んでいます。これがそのリストです：

* **@lexer::preinclude** - 最初の#includeの直前に置かれる（例えば、最初に置かなければならないヘッダーや、システムヘッダーなどに適している）。lexer hとcppファイルの両方に現れます。
* **@lexer::postinclude** - 最後の#includeの直後で、クラス・コードの前に置かれる（例：名前空間の追加）。lexerのhファイルとcppファイルの両方に現れます。
* **@lexer::context** - レキサー・クラス宣言の直前に置く。追加型、エイリアス、前方宣言などに使用する。lexer hファイルに記述する。
* **@lexer::declarations** - レキサー宣言のprivateセクションに置きます（すべてのクラスで生成されるセクションは、public、protected、privateというパターンに上から下へと厳密に従います）。privateな変数などに使用します。
* **@lexer::definitions** - cppファイル内の他の実装の前に置く（ただし@postincludeの後）。プライベート型などを実装する場合に使用する。

パーサーには、上記のレキサーと同じアクションがある。それに加えて、ビジター・クラスとリスナー・クラスのためのアクションがさらにあります：

* **@parser::listenerpreinclude**
* **@parser::listenerpostinclude**
* **@parser::listenerdeclarations**
* **@parser::listenermembers**
* **@parser::listenerdefinitions**
* 
* **@parser::baselistenerpreinclude**
* **@parser::baselistenerpostinclude**
* **@parser::baselistenerdeclarations**
* **@parser::baselistenermembers**
* **@parser::baselistenerdefinitions**
* 
* **@parser::visitorpreinclude**
* **@parser::visitorpostinclude**
* **@parser::visitordeclarations**
* **@parser::visitormembers**
* **@parser::visitordefinitions**
* 
* **@parser::basevisitorpreinclude**
* **@parser::basevisitorpostinclude**
* **@parser::basevisitordeclarations**
* **@parser::basevisitormembers**
* **@parser::basevisitordefinitions**

で説明できる。注：リスナーや訪問者のためのコンテキストアクションはありません。なぜなら、それらは他のアクションよりも使われることが少なく、すでにたくさんあるからです。