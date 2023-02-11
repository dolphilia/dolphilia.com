# 初心者のためのMermaidユーザーガイド（デプロイメント）

[原文](https://mermaid-js.github.io/mermaid/#/n00b-gettingStarted)

Mermaidは3つの部分から構成されています。デプロイメント、[シンタックス]()、コンフィギュレーションです。

このセクションでは、Mermaidをデプロイするための様々な方法について説明します。シンタックスを学ぶことは初心者に大きな助けとなるでしょう。

> 一般的に、マーメイドの一般的な使い方はライブエディタで十分であり、学習を始めるには良い場所です。

__全くの初心者の方は、ライブエディターのビデオ[チュートリアル]()をご覧になり、マーメイドをより深く理解することをお勧めします。__

## mermaidの4つの使い方

1. [mermaid.live]()にあるMermaid Live Editorを使う。
2. 使い慣れたプログラムで[mermaidのプラグイン]()を使用する。
3. Mermaid JavaScript APIを呼び出す。
4. 依存関係としてマーメイドをデプロイする。

__注：すべてのアプローチを検討し、あなたのプロジェクトに最適なものを選択することをお勧めします。__

> より詳細な情報は、Usageで見ることができます。


## 1. ライブエディターを使う

[mermaid.live]()で利用可能

`Code`セクションでは、生のマーメイドコードを書いたり編集したりすることができ、その横にあるパネルでレンダリング結果を即座に`Preview`することができます。

`Configration`セクションは、mermaidダイアグラムの外観と動作を変更するためのものです。[高度な使用法]()のセクションで、mermaidの設定について簡単に紹介されています。デフォルト値をカタログ化した完全な設定リファレンスは、[mermaidAPI]()ページで見つけることができます。


### 履歴の編集

コードは1分ごとに「履歴」の「タイムライン」タブに自動保存され、最新の30項目が表示されます。

手動でコードを保存するには、HistoryセクションのSaveアイコンをクリックします。また、「Saved」タブからもアクセスできます。これは、ブラウザのストレージにのみ保存されます。


### ダイアグラムを保存する

以下のいずれかの方法を選択して、保存することができます。

__後日、編集や修正を行うために、どの方法を選択しても、ダイアグラムコードを保存することをお勧めします。__


### ダイアグラムの編集

編集は、`Live Editor`の`code`セクションにダイアグラムのコードを貼り付けるだけで、簡単に行えます。

### Gistからの読み込み

作成したGistには、code.mmdファイルと、オプションでconfig.jsonが含まれているはずです。[例]()

エディタに gist を読み込むには、[https://mermaid.live/edit?gist=https://gist.github.com/sidharthv96/6268a23e673a533dcb198f241fd7012a]() を使用します。

View には、[https://mermaid.live/view?gist=https://gist.github.com/sidharthv96/6268a23e673a533dcb198f241fd7012a]()を使用します。


## 2. マーメイドプラグインの使用

プラグインを使用して、一般的なアプリケーションの中からマーメイド図を生成することができます。ライブエディタと同じ方法で行うことができます。以下は、[Mermaid Plugins]()のリストです。

これについては、[使用方法のセクション]()でより詳しく説明します。


## 3. JavaScript API の呼び出し

この方法は、Apache、IIS、nginx、node expressなどの一般的なWebサーバーで使用することができます。

また、.htmlファイルを生成するために、Notepad++のようなテキスト編集ツールが必要です。このファイルは、Webブラウザ（Firefox、Chrome、Safariなど、ただしInternet Explorerは不可）によって展開されます。

APIは、ページ上に図を表示するために、ソースの`mermaid.js`からレンダリング命令を引き出して動作します。


### Mermaid APIの要件

.htmlファイルを書くとき、htmlコードの内部で3つの指示をWebブラウザに与えます。

a. `mermaid.js`または`mermaid.min.js`を通じてオンラインマーメイドレンダラをフェッチするためのリファレンス。
b. 作成したいダイアグラムのMermaidコード。
c. `mermaid.initialize()`呼び出し。図の外観を決定し、レンダリング処理も開始します。

__a. `<script src>`タグ内の外部CDNへの参照、または別ファイルとしてのmermaid.jsへの参照:__

```html
<body>
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
</body>
```


__b. `<div class="mermaid">`の中に埋め込まれたマーメイド図の定義:__

```html
<body>
    Here is a mermaid diagram:
    <div class="mermaid">
        graph TD 
        A[Client] --> B[Load Balancer] 
        B --> C[Server01] 
        B --> D[Server02]
    </div>
</body>
```


注：マーメイドチャート/グラフ/ダイアグラムの定義には、それぞれ別の`<div<`タグが必要です。


__c. `mermaid.initialize()`の呼び出し。__

`mermaid.initialize()`は、html本体で見つけたすべての`<div class="mermaid">`タグに含まれるすべての定義を受け取り、それらをダイアグラムにレンダリングします。例

```html
<body>
    <script>
        mermaid.initialize({ startOnLoad: true });
    </script>
</body>
```


注：Mermaidの描画は`mermaid.initialize()`の呼び出しで初期化されます。`mermaid.initialize()`は、簡潔にするために`mermaid.min.js`の中に入れてもかまいません。しかし、逆にすることで、`mermaid.initialize()`でウェブページ内の`<div>`タグを探し始めるタイミングを制御することができます。これは、`mermaid.min.js`の実行時にすべての`<div>`タグがロードされていない可能性があると思われる場合に便利です。

`startOnLoad`は`mermaid.initialize()`で定義できるパラメータの1つです。

| パラメータ | 説明 | タイプ | 値 |
| :---: | :---: | :---: | :---: |
| startOnLoad | ロード時にレンダリングを行うかどうかのトグル |Boolean | true, false |


### 動作例

CDN経由でmermaidAPIを呼び出した場合の動作例を示します。


```html
<html>
    <body>
        <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
        <script>
            mermaid.initialize({ startOnLoad: true });
        </script>

        Here is one mermaid diagram:
        <div class="mermaid">
            graph TD 
            A[Client] --> B[Load Balancer] 
            B --> C[Server1] 
            B --> D[Server2]
        </div>

        And here is another:
        <div class="mermaid">
            graph TD 
            A[Client] -->|tcp_123| B
            B(Load Balancer) 
            B -->|tcp_456| C[Server1] 
            B -->|tcp_456| D[Server2]
        </div>
    </body>
</html>
```


もう一つの選択肢：この例では、mermaid.jsは別のJavaScriptファイルとして`src`で参照され、例のPathにあります。


```html
<html lang="en">
    <head>
        <meta charset="utf-8" />
    </head>
    <body>
        <div class="mermaid">
            graph LR 
            A --- B 
            B-->C[fa:fa-ban forbidden] 
            B-->D(fa:fa-spinner);
        </div>
        <div class="mermaid">
            graph TD 
            A[Client] --> B[Load Balancer] 
            B --> C[Server1] 
            B --> D[Server2]
        </div>
        <script src="The\Path\In\Your\Package\mermaid.js"></script>
        <script>
            mermaid.initialize({ startOnLoad: true });
        </script>
    </body>
</html>
```

## 4. Mermaidを依存関係として追加する

1. npmが搭載されているnode v16をインストールします。
2. npm install -g yarn と入力して、npmを使用してyarnをダウンロードします。
3. yarnのインストールが完了したら、以下のコマンドを入力します： yarn add mermaid
4. MermaidをDev依存として追加する場合 yarn add --dev mermaid

__mermaidの作者であるKnut Sveidqvistのコメントです。__

- mermaidの初期のバージョンでは、`<script src>`タグはウェブページの`<head>`部分で呼び出されました。現在では、上記のように`<body>`に配置することができます。ドキュメントの古い部分には、以前の方法がよく反映されていますが、それは今でも有効です。