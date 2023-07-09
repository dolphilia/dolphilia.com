# ANTLR

## What is ANTLR?

ANTLR（ANother Tool for Language Recognition）は、構造化テキストファイルやバイナリファイルの読み取り、処理、実行、翻訳のための強力なパーサー・ジェネレーターです。言語、ツール、フレームワークの構築に広く使用されている。ANTLRは文法から、解析木を構築して歩くことができるパーサーを生成します。

terenceTerence Parr is a tech lead at Google and until 2022 was a professor of data science / computer science at Univ. of San Francisco. He is the maniac behind ANTLR and has been working on language tools since 1989.

Check out Terence impersonating a machine learning droid: explained.ai

## Quick Start

すぐにANTLRを試すには、新しいANTLRラボにジャンプしてください！

To install locally, use antlr4-tools, which installs Java and ANTLR if needed and creates antlr4 and antlr4-parse executables:

```sh
$ pip install antlr4-tools
```

(WindowsはPATHに..\LocalCache\local-packages\Python310\Scriptsを追加する必要があります)。入門ドキュメントを参照。以下の文法をExpr.g4に貼り付けて、そのディレクトリからantlr4-parseコマンドを実行する。Unixではcontrol-D（Windowsではcontrol-Z）を押して、入力終了を示します。解析ツリーを示すウィンドウが表示されます。

```java
grammar Expr;
prog:   (expr NEWLINE)* ;
expr:   expr ('*'|'/') expr
    |   expr ('+'|'-') expr
    |   INT
    |   '(' expr ')'
    ;
NEWLINE : [\r\n]+ ;
INT     : [0-9]+ ;
```

```sh
$ antlr4-parse Expr.g4 prog -gui
10+20*30
^D
$ antlr4 Expr.g4  # gen code
$ ls ExprParser.java
ExprParser.java
sample3
```