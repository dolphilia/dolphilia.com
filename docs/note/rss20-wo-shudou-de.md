# RSS2.0を手動で作成する

RSSやウェブサイトに配信機能があるわけではなく、RSSを取得するツール側がリンクや文書の意味を解釈してRSSを探して受信する仕組みになっています。RSSは配信用のXML文書です。

ウェブサイトのチャンネル情報を配信するためにRSSは作られました。 RSSによって多くのブログやニュースサイトは更新情報を配信しています。ではRSSとは何でしょうか。どのように作成するのでしょうか。一緒に調べてみましょう。

[[TOC]]

## RSSとは

1. RSSはウェブサイトの記事を配信用にしたもの

RSSとはフィードの一種のことです。フィードは文書ファイルとして、ウェブサイトの記事を抜粋したものや記事全体をもとに作成されます。フィードには幾つかの書式があり、その代表的なフォーマットがRSSとAtomです。

2. 簡素化のためにAtomが作られたが、逆に複雑さが増してしまった

RSSには様々なバージョンがあります。どのバージョンを使えばよいのでしょうか。１つの解決策として文書の中にフォーマット混在という方法があります。これは現状で最も堅実な方法の１つでしょう。

RSSにはバージョンの混在や構文がやや煩雑という問題がありました。解決策としてAtomという新しいフォーマットが作られることになりました。とはいえ結果は思い通りにはゆきませんでした。RSSとAtomが併存して逆に複雑になってしまったのです。

3. ２つの解決策：RSSにAtomを含める／両方を配信する

RSSの方が普及していたため、Atomに完全に切り替えることは非現実的と判断したのでしょう。RSSとAtomを両方配信したり、RSSの内部にAtomのフォーマットも組み込んだりして、簡便さと堅実さのバランスを採ろうとする試みもされています。

この記事では簡潔さを優先して、RSSのみを配信する方法を紹介します。

## RSSの書き方

1. 最初の行に宣言を書く

RSS2.0は大きく分けて２つの点ことが関係しています。一つ目は「RSS2.0はXMLである」ということで、二つ目は「XMLはxml1.0に則っていなければならない」ということです。

それらの要求を満たすために、行頭に次のような宣言部を挿入します。

```xml
<?xml version="1.0"?>
```

XML文書はUTF-8として処理されます。そのことを明示したい場合は次のような符号化宣言を追加します。shift-jisやeuc-jpなど他の文字コードを指定することもできます。

```sml
<?xml version="1.0" encoding="UTF-8"?>
```

2. RSSのトップ・レベル要素 rss

RSSは階層構造のあるXMLです。その一番最初の要素は rss です。 rss はversionという必須属性を持っていて、その値は2.0である必要があります。

```xml
<?xml version="1.0"?>
<rss version="2.0">
</rss>
```

3. チャンネル情報を提供する channel

RSSの中で最も重要な要素は channel です。なぜならRSSはチャンネル情報を提供するために開発されたからです。RSS1.0では item と並列して記述していましたが、RSS2.0では item は channel の子要素となっています。

```xml
<?xml version="1.0"?>
<rss version="2.0">
    <channel>
    …
    </channel>
</rss>
```

4. channel に必須な３つの要素と１つの例外

channel の必須の要素は次の３つです。

- title要素
- link要素
- description要素

他にも多くのオプションの要素があります。

- link: 配信元のURL
- lastBuildDate: RSSファイルが最後に更新された日付

また item という例外的な要素があります。 item は、配信する内容を記載する重要な要素です。 item の数に制限はありません。

```xml
<?xml version="1.0"?>
<rss version="2.0">
    <channnel>
        <title> … </title>
        <link> … </link>
        <description> … </description>
        <item> … </item>
        …
        （item要素が続く）
        …
    </channnel>
</rss>
```

hannel の必須要素はそれぞれ次のような内容となっています。

- title: 配信元の名称
- link: 配信元のURL
- description: 配信元の簡単な説明

```xml
<?xml version="1.0"?>
<rss version="2.0">
    <channnel>
        <title>配信元の名称（ブログのタイトルなど）</title>
        <link>配信元のURL（http://www.???.com/など）</link>
        <description>配信元の簡単な説明</description>
        <item> … </item>
        …
        （item要素が続く）
        …
    </channnel>
</rss>
```

5. item の子要素には title か description のいずれかが必須

item の子要素に必須の要素はありませんが、 title か description のどちらかが含まれている必要があります。また両方を含めることもできます。

- title: 記事のタイトル
- description: 記事のあらすじ（または全文）
- description にはエンティティー化したHTMLを含めることができます。

他にも多くのオプションがあります。

- link: 記事のURL
- pubDate: 記事が更新された日付

```xml
<?xml version="1.0"?>
<rss version="2.0">
    <channnel>
        <title>配信元の名称（ブログのタイトルなど）</title>
        <link>配信元のURL（http://www.???.com/など）</link>
        <description>配信元の簡単な説明</description>
        <item>
            <title>記事のタイトル</title>
            <link>記事のURL</link>
            <description>記事のあらすじ</description>
        </item>
        …
        （item要素が続く）
        …
    </channnel>
</rss>
```

item の子要素について説明します。

6. pubDate lastBuildDate はRFC822の書式で日付を指定する

pubDate の内容はRFC822形式で日付を指定します。「曜日(英略), 日 月(英略) 年 時:分:秒 時間帯」という形になります。このうち曜日と秒は省略することができます。

例：Thu, 04 Oct 2007 23:59:45 GMT

※ GMTとはグリニッジ平均時（英語: Greenwich Mean Time, GMT）のことを指します。

英略の一覧表：

- 曜日：Mon Tue Wed Thu Fri Sat Sun
- 月：Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec

RSSで使うときは次のように書きます。

例：`<lastBuildDate>Thu, 24 Apr 2014</lastBuildDate>`

省略した例：`<lastBuildDate>24 Apr 2014</lastBuildDate>`

また item 要素は上から順に新しいものを追加していきます。

```xml
<?xml version="1.0"?>
<rss version="2.0">
    <channnel>
        <title>配信元の名称（ブログのタイトルなど）</title>
        <link>配信元のURL（http://www.???.com/など）</link>
        <description>配信元の簡単な説明</description>
        <lastBuildDate>日 月(英略) 年</lastBuildDate>
        …
        （新しい記事の順に、item要素を追加していく）
        …
        <item>
            <title>記事のタイトル</title>
            <link>httpで始まる記事のURL</link>
            <description>記事のあらすじ</description>
            <pubdate>日 月(英略) 年</pubdate>
        </item>
        …
        （item要素が続く）
        …
    </channnel>
</rss>
```

## RSSファイルの作り方とHTML側の設定

1. RSSファイルの作り方

RSSファイルは任意の名前で、任意の場所にアップロードすることができます。

2. HTML側の設定

「RSS auto-discovery」と呼ばれる link タグを使った設定が一般的です。次の行をhead内に記述することで設定することができます。

```xml
<link rel="alternate" type="application/rss+xml"
    title="feed（任意の名称）" href="feed.rss（任意の名称）" />
```

"feed"や"feed.rss"は任意の名称に変更することができます。

このようにRSSフィードは、ウェブサイトからRSSファイルにリンクが貼られているだけの仕組みになっています。RSS自体やウェブサイトに配信機能があるわけではなく、RSSを取得するツール側がリンクや文書の意味を解釈して"RSSを受信"しているのです。

## サンプル

これまでの内容を使って作ったサンプルです。

1. rssファイル

- ファイル名：feed.rss
- ファイルのURL：http://www.???.com/feed/

```xml
<?xml version="1.0"?>
<rss version="2.0">
    <channnel>
        <title>RSSを研究するサイト</title>
        <link>http://www.???.com/feed/</link>
        <description>RSSを研究してまとめた記事を公開しています。
            </description>
        <lastBuildDate>26 Jul 2014</lastBuildDate>
        <item>
            <title>手動でRSSを作成し配信する方法</title>
            <link>http://www.???.com/blog/2014/07/26/</link>
            <description>RSSを作成する方法を詳しく説明します。
                </description>
            <pubdate>26 Jul 2014</pubdate>
        </item>
    </channnel>
</rss>
```

2. htmlファイル

- ファイル名：index.html
- ファイルのURL：http://www.???.com/blog/2014/07/26/

```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="UTF-8">
        <title>手動でRSSを作成し配信する方法</title>
        <link rel="alternate" type="application/rss+xml"
            title="feed" href="http://www.???.com/feed/">
    </head>
    <body>
        <article>
            <h1>手動でRSSを作成し配信する方法</h1>
            <p>RSSを作成する方法を詳しく説明します。</p>
        </article>
    </body>
</html>
```