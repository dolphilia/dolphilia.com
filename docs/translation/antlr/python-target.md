# Python (2 and 3)

ANTLR 4の本からPythonに変換した例はこちらです。

2つのPythonターゲットがあります：`Python2` と `Python3` です。これは、この2つのバージョン間には限られた互換性しかないためです。詳細はPythonのドキュメントを参照してください。

Pythonのレキサーやパーサーを作るには？
これはJavaのレキサーやパーサーを作るのとほとんど同じですが、例えば言語ターゲットを指定する必要があります：

```
$ antlr4 -Dlanguage=Python2 MyGrammar.g4
```

or

```
$ antlr4 -Dlanguage=Python3 MyGrammar.g4
```

antlr4ツールオプションの完全なリストについては、ツールのドキュメントページをご覧ください。

## ランタイムはどこで入手できますか？

レキサーやパーサーのコードを生成したら、ランタイムをダウンロードする必要があります。PythonのランタイムはPyPIから入手できます：

* https://pypi.python.org/pypi/antlr4-python2-runtime/
* https://pypi.python.org/pypi/antlr4-python3-runtime/

ランタイムはソースコードの形で提供されるため、追加のインストールは必要ない。

Pythonプロジェクトからランタイムを参照する方法は、プロジェクトの種類やIDEによって大きく異なるため、ここでは説明しません。

## 生成されたレキサーやパーサーを実行するにはどうすればよいですか？

あなたの文法が上記のように "MyGrammar "という名前だとしよう。このパーサーは "startRule "という名前のルールで構成されているとする。このツールは以下のファイルを生成します：

* MyGrammarLexer.py
* MyGrammarParser.py
* MyGrammarListener.py (if you have not activated the -no-listener option)
* MyGrammarVisitor.py (if you have activated the -visitor option)

(Java/C#のAntLRに慣れている開発者は、生成されるベースリスナーやビジターがないことに気づくでしょう。これは、Pythonがインタフェースをサポートしていないためで、生成されるリスナーとビジターは完全なクラスです)

完全に機能するスクリプトは以下のようになります：
 
```python
import sys
from antlr4 import *
from MyGrammarLexer import MyGrammarLexer
from MyGrammarParser import MyGrammarParser
 
def main(argv):
    input_stream = FileStream(argv[1])
    lexer = MyGrammarLexer(input_stream)
    stream = CommonTokenStream(lexer)
    parser = MyGrammarParser(stream)
    tree = parser.startRule()
 
if __name__ == '__main__':
    main(sys.argv)
```

このプログラムは機能する。しかし、次のいずれかを実行しない限り、役に立ちません：

* カスタム・リスナーを使って解析ツリーを訪問する。
* カスタムビジターを使って解析ツリーにアクセスする
* 文法が（ANTLR3のような）プロダクションコードで構成されている。

(プロダクションコードはターゲットに依存するため、プロダクションコードを含むマルチターゲットの文法を作成することはできません。)
 
## カスタムリスナーを作成して実行するには？

MyGrammar文法が2つのルールで構成されているとしましょう："key "と "value "です。antlr4ツールは以下のリスナーを生成します：

```python
class MyGrammarListener(ParseTreeListener):
    def enterKey(self, ctx):
        pass
    def exitKey(self, ctx):
        pass
    def enterValue(self, ctx):
        pass
    def exitValue(self, ctx):
        pass
```
 
カスタム・ビヘイビアを提供するために、次のようなクラスを作りたいかもしれない：
  
```python
class KeyPrinter(MyGrammarListener):     
    def exitKey(self, ctx):         
        print("Oh, a key!") 
```
 
このリスナーを実行するには、上記のコードに以下の行を追加するだけだ：
 
```
       ...
       tree = parser.startRule() - only repeated here for reference
   printer = KeyPrinter()
   walker = ParseTreeWalker()
   walker.walk(printer, tree)
```
 
詳細については、ANTLR 4 決定版ガイドを参照されたい。

PythonのANTLRの実装はJavaのものにできるだけ近いので、サンプルをPythonに適応させるのは難しくないと思います。

## ターゲットにとらわれない文法

もしあなたの文法がPythonだけをターゲットにしているのであれば、以下は無視してかまいません。しかし、JavaパーサをPythonでも動作させることが目的であれば、役に立つかもしれません。

1. プロダクション・コードを文法の中に埋め込まないでください。これはポータブルではありませんし、今後もそうなることはないでしょう。すべてのコードをリスナーかVisitorに移してください。
1. 文法に付随して絶対に必要なプロダクション・コードは、意味述語だけであるべきだ：
```
ID {$text.equals("test")}?
```

残念ながら、JavaとPython（および他のターゲット言語）では、最も単純な言語要素以外の構文が異なるため、これは移植性がない。  しかし、これを回避することはできる。その方法とは

* BaseParserのような、あなたが提供するパーサーからあなたのパーサーを派生させる。
* このBaseParserで、"isEqualText "のようなユーティリティメソッドを、ターゲット言語ごとに異なるファイルに実装する。
* `$parser`オブジェクトから意味述語でユーティリティメソッドを呼び出す。

上記のおかげで、上記の意味述語を次のように書き換えることができるはずだ：

File `MyGrammarParser.g4`:
```
options { superClass = MyGrammarBaseParser; }
...
ID {$parser.isEqualText($text,"test")}?
```

File `MyGrammarBaseParser.py`:
```python
from antlr4 import *

class MyGrammarBaseParser(Parser):

   def isEqualText(a, b):
      return a is b
```

File `MyGrammarBaseParser.java`:
```java
import org.antlr.v4.runtime.*;

public abstract class MyGrammarBaseParser extends Parser {

   public static boolean isEqualText(a, b) {
      return a.equals(b);
   }
}
```