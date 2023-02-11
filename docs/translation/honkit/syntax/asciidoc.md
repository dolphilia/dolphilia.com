# AsciiDoc

バージョン `2.0.0` 以降、HonKit は入力フォーマットとして AsciiDoc も受け入れることができるようになりました。

フォーマットの詳細については、[AsciiDoc Syntax Quick Reference](http://asciidoctor.org/docs/asciidoc-syntax-quick-reference/)を参照してください。

マークダウンと同じように、HonKitは構造を抽出するためにいくつかの特別なファイルを使用しています。`README.adoc`・`SUMMARY.adoc`・`LANGS.adoc`・`GLOSSARY.adoc`です。

### README.adoc

本のメインとなる「はじめに」の部分です。このファイルは **必須** です。

### SUMMARY.adoc

このファイルはチャプターとサブチャプターのリストを定義します。Markdownと同じように、`SUMMARY.adoc`のフォーマットは単にリンクのリストで、リンクの名前は章の名前として使われ、ターゲットはその章のファイルへのパスとなります。

サブチャプターは、親チャプターにネストしたリストを追加するだけで定義できます。

```asciidoc
= Summary

. link:chapter-1/README.adoc[Chapter 1]
.. link:chapter-1/ARTICLE1.adoc[Article 1]
.. link:chapter-1/ARTICLE2.adoc[Article 2]
... link:chapter-1/ARTICLE-1-2-1.adoc[Article 1.2.1]
. link:chapter-2/README.adoc[Chapter 2]
. link:chapter-3/README.adoc[Chapter 3]
. link:chapter-4/README.adoc[Chapter 4]
.. Unfinished article
. Unfinished Chapter
```

### LANGS.adoc

[多言語](./languages.md)では、このファイルを使って、さまざまなサポート言語と翻訳を定義します。

このファイルは `SUMMARY.adoc` と同じシンタックスに従っています。

```asciidoc
= Languages

. link:en/[English]
. link:fr/[French]
```

### GLOSSARY.adoc

このファイルは、用語の定義に使用されます。[用語集の項を参照](./lexicon.md)。

```asciidoc
= Glossary

== Magic

Sufficiently advanced technology, beyond the understanding of the
observer producing a sense of wonder.

== PHP

A popular web programming language, used by many large websites such
as Facebook. Rasmus Lerdorf originally created PHP in 1994 to power
his personal homepage (PHP originally stood for "Personal Home Page"
but now stands for "PHP: Hypertext Preprocessor"). 
```


