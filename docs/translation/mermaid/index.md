# Mermaidについて

[原文](https://mermaid-js.github.io/mermaid/#/README)

__Mermaidはテキストとコードを使ってダイアグラムやビジュアライゼーションを作成することができます。__

これはJavaScriptベースのダイアグラムおよびチャート作成ツールで、Markdownにインスパイアされたテキスト定義をレンダリングし、ダイアグラムを動的に作成および変更します。

> Markdownに慣れているのであれば、[Mermaidのシンタックス]()を学ぶことに問題はないでしょう。

MermaidはJavaScriptベースのダイアグラム・チャート作成ツールで、Markdownから着想を得たテキスト定義とレンダラーを使用して、複雑なダイアグラムを作成・変更することができます。Mermaidの主な目的は、ドキュメントが開発に追いつくのを助けることです。

> 冗長な文書をMermaidが解決します。

図解やドキュメントは貴重な開発者の時間を費やし、すぐに古くなってしまいます。しかし、ダイアグラムやドキュメントがないと、生産性が損なわれ、組織の学習にも支障をきたします。
Mermaidは、ユーザーが簡単に変更可能なダイアグラムを作成できるようにすることで、この問題に取り組みます。

Mermaidは、プログラマーでなくても[Mermaid Live Editor]()を使って簡単に詳細なダイアグラムを作成することを可能にします。
[チュートリアル]()にはビデオチュートリアルがあります。Mermaidをお気に入りのアプリケーションと一緒に使うには、[Mermaidの統合と使用法]()のリストをご覧ください。

Mermaidの詳しい紹介と基本的な使い方は、[ビギナーズガイド]()と[使い方]()をご覧ください。

🌐 [CDN]() | 📖 [資料]() | 🙌 [貢献]() | 📜 [更新履歴]() | 🔌 [プラグイン]()

> 🖖 安定した脈拍を保つ：マーメイドはもっと協力者を必要としている、[続きを読む]()

__🏆マーメイドがJSオープンソースアワード（2019）の「最もエキサイティングな技術の使い方」部門にノミネートされ、受賞しました!!!!__

__関係者の皆さん、プルリクエストをコミットする人、質問に答える人、そしてプロジェクトのメンテナンスを手伝ってくれているTyler Longに特別感謝します🙏。__

私たちのリリースプロセスでは、[applitools]()を使用したビジュアルリグレッションテストに大きく依存しています。Applitoolsは、使いやすく、私たちのテストと統合しやすい、素晴らしいサービスです。


## ダイアグラムの種類

[フローチャート]()

```
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```


```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```


[シーケンス図]()

```
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```


```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```


[ガントチャート]()

```
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid
excludes weekdays 2014-01-10

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d
```


```mermaid
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid
excludes weekdays 2014-01-10

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2               :         des4, after des3, 5d
```


[クラス図]()

```
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
```


```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
```


[Gitグラフ]()

```
    gitGraph
       commit
       commit
       branch develop
       commit
       commit
       commit
       checkout main
       commit
       commit
```


```mermaid
    gitGraph
       commit
       commit
       branch develop
       commit
       commit
       commit
       checkout main
       commit
       commit
```


[エンティティ関係図 - ❗️実験]()

```
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```


```mermaid
erDiagram
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--|{ LINE-ITEM : contains
    CUSTOMER }|..|{ DELIVERY-ADDRESS : uses
```


[ユーザー旅程図]()

```
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```


```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```


#### インストール方法

詳細なガイドとサンプルは、[Getting Started]()と[Usage]()にあります。

また、mermaidの[Syntax]()について詳しく知ることもできます。


#### CDN

```
https://unpkg.com/mermaid@<version>/dist/
```

バージョンを選択する場合

\<version\>を希望のバージョン番号に置き換えてください。

最新バージョン： [https://unpkg.com/browse/mermaid@8.8.0/]()


## Mermaidを導入する

Mermaidをデプロイするために：

1. node v16をインストールし、npmをインストールする必要があります。
2. npmを使用してyarnをダウンロードします。
3. 次のコマンドを入力します: `yarn add mermaid`
4. 次に、次のコマンドを使用して、mermaid を開発依存として追加します: `yarn add --dev mermaid`


## Mermaid API:

mermaidをbundlerなしで展開するには、次のように絶対アドレスと`mermaidAPI`呼び出しを持つ`script`タグをHTMLに挿入します。

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({startOnLoad:true});
</script>
```


そうすることで、マーメイドパーサーは`class=\"mermaid \"`のついた`<div>`タグを探すよう命令します。これらのタグから、マーメイドはダイアグラム/チャートの定義を読み取り、SVGチャートにレンダリングしようとします。

[その他のサンプル]()もご覧ください。


## 姉妹プロジェクト

- Mermaid Live Editor
- Mermaid CLI
- Mermaid Webpack Demo
- Mermaid Parcel Demo


## 支援のお願い

いろいろなことが積み重なって、追いつくのが大変なんです。今後のmermaidの開発に協力するために、開発者のコアチームを作ることができたら素晴らしいことだと思います。

このチームの一員になると、リポジトリへの書き込みアクセスが可能になり、質問や問題に答える際にプロジェクトを代表することになります。

私たちは一緒に、次のような作業を続けることができます。

- マインドマップやertダイアグラムなど、より多くの種類のダイアグラムを追加する。
- 既存の図の改善

参加したい方は、遠慮なくご連絡ください。


## コントリビューター向け

### セットアップ

```
yarn install
```


### ビルド

```
yarn build:watch
```


### Lint

```
yarn lint
```

[eslint]()を使用しています。lintの結果をリアルタイムで得るために、[エディタプラグイン]()をインストールすることをお勧めします。


## テスト

```
yarn test
```


ブラウザでの手動テスト：`dist/index.html`を開く


### リリース

許可された方のみ。

`package.json`のバージョン番号を更新してください。

```
npm publish
```


上記のコマンドは、`dist`フォルダにファイルを生成し、npmjs.orgに公開するものです。


## 関連プロジェクト

- Command Line Interface
- Live Editor
- HTTP Server


## コントリビューター

マーメイドは成長中のコミュニティであり、常に新しい貢献者を受け入れています。お手伝いできることはたくさんありますし、いつでも手を差し伸べてくれる人を探しています。どこから手をつければいいのか知りたい方は、[このissue]()をご覧ください。

貢献の仕方についての詳しい情報は、[貢献ガイド]()にあります。


## ダイアグラムのセキュリティと安全性

公開サイトの場合、インターネット上のユーザーからテキストを取得し、そのコンテンツを保存して、後日ブラウザで提示するのは不安定な場合があります。なぜなら、ユーザーコンテンツには、データが表示されたときに実行される悪意のあるスクリプトが埋め込まれている可能性があるからです。特にマーメイドのダイアグラムにはhtmlで使用されている文字が多く含まれているため、標準的なサニタイジングではダイアグラムが壊れてしまい、使用することができません。私たちは、受信したコードをサニタイズするために努力し、プロセスを改善し続けていますが、ループホールがないことを保証するのは困難です。

外部ユーザーがいるサイトのセキュリティをさらに強化するために、新しいセキュリティレベルを導入することにしました。これは、より良いセキュリティのための大きな前進です。

> 残念ながら、ケーキを食べるのと同時に、インタラクティブな機能の一部が悪意のあるコードと一緒にブロックされることを意味することはできません。


## 脆弱性の報告

脆弱性を報告するには、問題の説明、問題を発生させるために行った手順、影響を受けるバージョン、および既知の場合は問題の緩和策を [security@mermaid.live]() にメールしてください。


## 感謝

Knut Sveidqvistからのコメントです。

> グラフィカルなレイアウトと描画ライブラリを提供してくれたd3プロジェクトとdagre-d3プロジェクトに感謝します! また、シーケンス図の文法を提供してくれたjs-sequence-diagramプロジェクトに感謝します。Jessica Peter には、ガント・レンダリングのインスピレーションと出発点をいただきました。2017年4月から協力者になってくれたTyler Longに感謝します。
>
> プロジェクトをここまで導いてくれた、増え続ける協力者の皆さんに感謝します。

---

Mermaidは、Knut Sveidqvistによって、より簡単にドキュメントを作成するために作られました。