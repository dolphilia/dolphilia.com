# ページと概要

### 概要

HonKitは本のチャプターとサブチャプターの構造を定義するために`SUMMARY.md`ファイルを使用します。`SUMMARY.md`ファイルは本の目次を生成するために使用されます。

`SUMMARY.md` のフォーマットは単なるリンクのリストです。リンクのタイトルはその章のタイトルとして使われ、リンクのターゲットはその章のファイルへのパスとなります。

各章にインデントしたリストを追加するとサブチャプターが作成されます。

##### 簡単な例

```markdown
# 概要

* [第一部](part1/README.md)
    * [書くことは素晴らしい](part1/writing.md)
    * [HonKitは優れている](part1/honkit.md)
* [第二部](part2/README.md)
    * [大好きなフィードバック](part2/feedback_please.md)
    * [執筆者のための最良のツール](part2/better_tools.md)
```

各章には専用のページ(`part#/README.md`)があり、サブチャプターに分かれています。

##### アンカー

目次の各章はアンカーを使用してファイルの特定の部分を指すことができます。

```markdown
# 概要

### 前編

* [第一部](part1/README.md)
    * [書くことは素晴らしい](part1/README.md#writing)
    * [HonKitは優れている](part1/README.md#honkit)
* [第二部](part2/README.md)
    * [大好きなフィードバック](part2/README.md#feedback)
    * [執筆者のための最良のツール](part2/README.md#tools)
```


##### パーツ

目次は見出しや横線で区切られたパーツに分割することができます。

```markdown
# 概要

### 第一部

* [書くことは素晴らしい](part1/writing.md)
* [HonKitは優れている](part1/honkit.md)

### 第二部

* [大好きなフィードバック](part2/feedback_please.md)
* [執筆者のための最良のツール](part2/better_tools.md)

----

* [タイトルなしの最後の部分](part3/title.md)
```

パートは単なる章の集まりで専用ページはありませんが、テーマによってはナビゲーションに表示されます。

### ページ

#### Markdownの構文

HonKitのほとんどのファイルではデフォルトでMarkdown構文が使用されています。HonKitはそこからページの構造を推論します。使用される構文は[GitHub Flavored Markdown syntax](https://guides.github.com/features/mastering-markdown/)に似ています。またAsciiDoc syntaxを選択することもできます。

##### チャプターファイルの例

``` markdown
# 章のタイトル

これは素晴らしい入門書です。

## セクション１

Markdownは**本の構造**のほとんどを決定します。

## セクション２

...

```

#### フロントマター

ページはオプションでフロントマターを含むことができます。これはページの説明を定義するために使用することができます。前書きはファイルの最初のものでなければならず、三重の破線で囲まれた有効な YAML の形式をとらなければなりません。以下は基本的な例です。

```yaml
---
description: マイページについて簡単に説明します。
---

# マイページの内容
...
```

フロントマターで独自の変数を定義すると[ページ変数](templating/variables.md)に追加されるので、テンプレート化して使用することができるようになります。
