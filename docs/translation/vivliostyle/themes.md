# Vivliostyle Themes とは

Vivliostyle Theme は、Vivliostyle で出版物を作る際に使うスタイルテーマです。Theme の実体は、スタイルファイル、サンプル原稿、package.json です。

[[TOC]]

## 仕様

Theme を npm package として公開する場合は以下の仕様に従ってください。[create-vivliostyle-theme][] を使うと、この仕様に従った Theme を簡単に作成することができます。

### Theme 名

Theme の名前は自由に決められます。ただし、以下の点を考慮することを推奨します。

- 用途が明確な場合は、用途を表す端的な用語を含める
- 変更可能なスタイルに関する用語を避ける
  - 出版物のサイズや組み方向などは、将来的には Vivliostyle Pub などでユーザが簡単に変更できるようになる予定です。したがって、これらの変更可能なスタイルに関する用語を使うことは避けてください。
  - 避けるべき名前の例：vivliostyle-theme-a4book、vivliostyle-theme-tategaki など

### Theme に含めるスタイル

Theme は、出版物の特定の部分のみ（図表のみ、脚注のみなど）のスタイルを含んだものではなく、出版物全体のスタイルを含めるものとします。

以下に、Theme に含めることが望ましい代表的なスタイルを示します。[create-vivliostyle-theme][] で作成した Theme の雛形はこれらのスタイルを含んでいます。

- ページ（余白、柱など）
- 見出し
- 段落
- 数式
- 図とキャプション
- 表とキャプション
- ソースコード
- 脚注
- ルビ

### ディレクトリ構造

```
vivliostyle-theme-mybook/
├── LICENSE
├── README.md
├── package.json           # required
├── example/               # required
│   ├── ...
│   └── default.md
├── scss/                  # required
│   ├── ...
│   ├── theme_common.scss
│   ├── theme_print.scss
│   └── theme_screen.scss
├── theme_common.css       # required
├── theme_print.css        # required
├── theme_screen.css       # required
└── vivliostyle.config.js  # required
```

[create-vivliostyle-theme][] で Theme の雛形を作成すると、上のようなファイルが自動生成されます。次の節からは代表的なファイルの詳細を見ていきます。

### package.json

```json
{
  "name": "vivliostyle-theme-mybook",
  "author": "John Doe <john@example.com>",
  "keywords": [
    // 以下で説明
    "vivliostyle",
    "vivliostyle-theme"
  ],
  "files": ["*.css", "*.css.map", "scss", "example", "vivliostyle.config.js"],
  "vivliostyle": {
    // 以下で説明
    "theme": {
      "style": "./theme_print.css", // required
      "name": "Mybook",
      "author": "John Doe", // required
      "category": "novel",
      "topics": ["paperback"]
    }
  }
}
```

[vivliostyle-theme-scripts](https://github.com/vivliostyle/themes/tree/master/packages/vivliostyle-theme-scripts) を使うと、作成した Theme の package.json が仕様に従っているかをチェックできます。

```bash
$ vivliostyle-theme validate
```

#### `keywords` プロパティ

任意。

このプロパティの値に `"vivliostyle-theme"` を含めておくと、[Create Book][] を使って出版物を作る際、利用可能な Theme の一覧にあなたの Theme が表示されます。ただし、そのためには Theme を npm package として公開している必要があります。

Theme は Vivliostyle に関連する npm package であるため、`"vivliostyle"` も含めておくとよいでしょう。

#### `vivliostyle.theme` プロパティ

##### `style` プロパティ

必須。Theme で使うメインの CSS を指定します。

package.json のトップレベルに `style` や `main` を指定することもできます。`vivliostyle.theme.style` と同じ意味を持ちますが、優先順位は `vivliostyle.theme.style` > `style` > `main` です。

```json
{
  "style": "theme_print.css"
}
```

```json
{
  "main": "theme_print.css"
}
```

##### `author` プロパティ

必須。

##### `category` プロパティ

任意。このプロパティは、あなたの Theme を初めて使おうとするユーザが Theme の主な用途を知るためのヒントになります。Theme にもっともあてはまるものを以下のリストから選んでください。

- `"novel"`
- `"magazine"`
- `"journal"`
- `"report"`
- `"misc"`

なお、このリストは今後更新される場合があります。

##### `topics` プロパティ

任意。Theme の用途を `category` プロパティよりも具体的に説明したい場合、ここにリストアップして記述しておくとよいでしょう。

### example/

example/ ディレクトリには、Theme の端的なサンプルとなるような Markdown ファイルを 1 つ以上含めてください。ファイル名は任意です。

Markdown ファイルでは [VFM (Vivliostyle Flavored Markdown)](https://vivliostyle.github.io/vfm/#/vfm)が利用できます。

### scss/

Theme のスタイルを定義したスタイルシートを含めてください。組版用のスタイル定義は複雑になることが多いうえ、Theme を使うユーザがスタイルシートを編集して独自にカスタマイズすることもあります。そのため、変数や mixin が使える SCSS の使用を推奨しています。

Theme には複数のスタイルシートを含めることができます。詳細は [issue (vivliostyle/vivliostyle-cli #143)](https://github.com/vivliostyle/vivliostyle-cli/issues/143#issuecomment-791990973) を参照してください。たとえば、以下に示す用途を想定した 3 種類のスタイルシートを用意することができます。

- theme_print.scss: PDF として出力する場合や、Vivliostyle Viewer で閲覧する場合のスタイルを定義
- theme_screen.scss: HTML などの webpub 形式で出力する場合のスタイルを定義
- theme_common.scss: 上の 2 つに共通するスタイルを定義

### \*.css

scss/ ディレクトリのスタイルシートから生成された CSS ファイル群です。

### vivliostyle.config.js

```js
module.exports = {
  language: 'ja',
  theme: 'theme_print.css',
  entry: ['example/default.md'],
  output: [
    'book.pdf',
    {
      path: './book',
      format: 'webpub',
    },
  ],
};
```

example/ 内の Markdown ファイルから出版物を生成するための設定ファイルです。開発者が Theme を開発する際に使うほか、Theme を使うユーザがサンプル出版物を生成する際にも使います。

## チュートリアル

### はじめに

このチュートリアルでわかることは以下の通りです。

- オリジナルの Theme の作り方
- [create-vivliostyle-theme][] の使い方
- 組版用の CSS の書き方
  - カウンタ
  - 見出し
  - 目次
  - など……

CSS やサンプル原稿などの具体的な部分は Theme ごとに変わりますが、作成手順はどの Theme も同じです。なお、このチュートリアルで作成する Theme の完成品は [yamasy1549/vivliostyle-theme-my-doujin](https://github.com/yamasy1549/vivliostyle-theme-my-doujin) にあります。

#### バージョン情報

- [create-vivliostyle-theme][]: 0.4.0
- [@vivliostyle/cli](https://github.com/vivliostyle/vivliostyle-cli): 4.3.2
- [@vivliostyle/vfm](https://github.com/vivliostyle/vfm/): 1.0.2

#### チュートリアルの設定

今回作るのは、複数人の書き手による小説合同誌のための Theme です。執筆者は複数人おり、1 人が 1 章分（1 つの Markdown 原稿ファイル）を担当することになっています。合同誌制作にあたって、執筆者たちから次のような要望を受けています。

- 全体を通した**ページ番号**、**章番号**がほしい
- **目次**がほしい
- 見た目は統一するが、章（原稿ファイル）ごとに**テーマカラー**を変えたい

[create-vivliostyle-theme]: https://github.com/vivliostyle/themes/tree/master/packages/create-vivliostyle-theme

このチュートリアルは、[Vivliostyle で本を作ろう Vol.5](https://vivliostyle.org/ja/make-books-with-vivliostyle/#vivliostyle-%E3%81%A7%E6%9C%AC%E3%82%92%E4%BD%9C%E3%82%8D%E3%81%86-vol52021%E5%B9%B47%E6%9C%8811%E6%97%A5) の[Vivliostyle Theme のつくりかた](https://vivliostyle.github.io/vivliostyle_doc/ja/vivliostyle-user-group-vol5/content/yamasy/index.html)をもとにしています。

### Step 1. 雛形の生成

[create-vivliostyle-theme][] というツールを使って、`npm` または `yarn` で Theme の原型を作成します（このチュートリアルでは `yarn` を使います）。create-vivliostyle-theme は、オリジナルの Theme を作るのに便利な雛形を生成できるツールです。

```bash
$ yarn create vivliostyle-theme my-doujin
? description awesome theme
? author name John Doe
? author email john@example.com
? license AGPL-3.0
? choose category novel

Success! Created vivliostyle-theme-my-doujin.

1. cd vivliostyle-theme-my-doujin
2. edit scss/*.scss
3. publish to npm ($ npm publish)

✨  Done in 46.57s.
```

#### 雛形に含まれるファイル

これが Theme の原型です。雛形には、出版物に必須の基本的なスタイルとサンプル原稿が含まれています。🖋 マークがついたファイルをこれから編集していきます。

```bash
$ cd vivliostyle-theme-my-doujin
$ tree . -I node_modules
.
├── LICENSE
├── README.md
├── example/                 サンプル原稿
│   └── default.md           🖋 Markdownを書く
├── package.json             🖋 Themeの情報を書く
├── scss/                    デフォルトで3つのスタイルファイル
│   ├── ...
│   ├── theme_common.scss    🖋 Themeの共通部分
│   ├── theme_print.scss     🖋 出版物 (PDFなど) 印刷用スタイル
│   └── theme_screen.scss    🖋 出版物 (HTMLなど) 閲覧用スタイル
├── *.css
├── vivliostyle.config.js    🖋 Themeプレビュー用設定ファイル
└── yarn.lock
```

example/ にはその Theme の適用例となるサンプル原稿を置きます。サンプル原稿は、ユーザが [Create Book](https://github.com/vivliostyle/create-book) を使って出版物を作る際、デフォルトの原稿として採用されます。

scss/ にはスタイルを置きます。Vivliostyle Theme では SCSS を推奨しています。デフォルトで 3 つの SCSS ファイルが作成されており、それぞれの役割は以下のとおりです。もちろん、SCSS ファイルを増やしてもかまいません。

- theme_print.scss：PDF 形式の出版物を印刷するときに適用するスタイル。トンボのスタイルなどはここで定義するとよいでしょう。
- theme_screen.scss：HTML 形式の出版物を閲覧するときに適用するスタイル。コンテンツが画面幅いっぱいに表示されるのを防ぐために表示幅を制限したり、文字サイズを調整したりするとよいでしょう。
- theme_common.scss：theme_print.scss や theme_screen.scss で共通して使うスタイル。

#### 雛形のプレビュー

Theme を作り始める前に、まずは雛形のスタイルを確認してみましょう。以下のコマンドを実行すると、Vivliostyle Viewer (Chromium) が起動してプレビューが表示されます。Chromium がインストールされていない場合はインストールが始まります。

```bash
$ yarn dev
```

雛形には、組版に使う基本的なスタイルがすでに定義されています。以下がそのプレビュー画面です。デフォルトでは scss/theme_print.scss が適用されています。このスタイルファイルには、トンボや左上の theme_print という文字を表示するようなスタイルが定義されています。雛形で定義されているスタイルは自由に書き換えてかまいません。

[create-vivliostyle-theme]: https://github.com/vivliostyle/themes/tree/master/packages/create-vivliostyle-theme

### Step 2. サンプル原稿の用意

それではオリジナルの Theme を作り始めましょう。まずはサンプル原稿を用意します。

#### サンプル原稿

この Theme のコンセプトは複数人の書き手による小説合同誌なので、それらしいサンプルを用意してみました。原稿は [VFM](https://github.com/vivliostyle/vfm) を使って書くことができます。

```markdown {highlight: ['3-9']}
<!-- example/ch01.md -->

# 吾輩は猫である。

<p class="author">夏目 漱石</p>

{吾輩|わがはい}は猫である。名前はまだ無い。

どこで生れたかとんと{見当|けんとう}がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番{獰悪|どうあく}な種族であったそうだ。この書生というのは時々我々を{捕|つかま}えて{煮|に}て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の{掌|てのひら}に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。掌の上で少し落ちついて書生の顔を見たのがいわゆる人間というものの{見始|みはじめ}であろう。この時妙なものだと思った感じが今でも残っている。第一毛をもって装飾されべきはずの顔がつるつるしてまるで{薬缶|やかん}だ。その{後|ご}猫にもだいぶ{逢|あ}ったがこんな{片輪|かたわ}には一度も{出会|でく}わした事がない。のみならず顔の真中があまりに突起している。そうしてその穴の中から時々ぷうぷうと{煙|けむり}を吹く。どうも{咽|む}せぽくて実に弱った。これが人間の飲む{煙草|たばこ}というものである事はようやくこの頃知った。
```

```markdown {highlight: ['3-9']}
<!-- example/ch02.md -->

# 羅生門

<p class="author">芥川 龍之介</p>

ある日の暮方の事である。一人の{下人|げにん}が、{羅生門|らしょうもん}の下で雨やみを待っていた。

広い門の下には、この男のほかに誰もいない。ただ、所々{丹塗|にぬり}の{剥|は}げた、大きな{円柱|まるばしら}に、{蟋蟀|きりぎりす}が一匹とまっている。羅生門が、{朱雀大路|すざくおおじ}にある以上は、この男のほかにも、雨やみをする{市女笠|いちめがさ}や{揉烏帽子|もみえぼし}が、もう二三人はありそうなものである。それが、この男のほかには誰もいない。
```

#### プレビュー

サンプル原稿を追加したら、vivliostyle.config.js の `entry` にこれらを登録して、スタイルを適用した原稿をリアルタイムでプレビューできるようにします。

```js {highlight:[3,'5-9']}
// vivliostyle.config.js

module.exports = {
  language: 'ja',
  theme: 'theme_print.css',
  entry: ['example/ch01.md', 'example/ch02.md'],
  // ...
};
```

それでは、今作ったサンプル原稿に雛形のスタイル (theme_print.scss) を適用したものを Vivliostyle Viewer でプレビューしてみましょう。原稿ファイル、スタイルファイル、vivliostyle.config.js に変更があると、Vivliostyle Viewer は自動で画面をリロードしてその結果を反映します。Theme を作る際は、こまめに Vivliostyle Viewer を見ながらスタイルファイルを編集していくことになります。

```bash
$ yarn dev # すでにプレビューが起動している場合は必要ない
```

### Step 3. カウンタの表示

次に、ページ番号と章番号を表示してみましょう。SCSS ファイルを作って、そこに新たなスタイルを定義していくことにします。

```bash
$ touch scss/_my_style.scss
```

今作成した SCSS ファイルをメインのスタイルファイル (scss/theme_common.scss) でインポートします。

```scss {highlight: [15]}
// scss/theme_common.scss

// ...
@import '_variables';
@import '_vfm_code';
@import '_vfm_footnotes';
@import '_vfm_frontmatter';
@import '_vfm_hard_new_line';
@import '_vfm_image';
@import '_vfm_math_equation';
@import '_vfm_raw_html';
@import '_vfm_ruby';
@import '_vfm_sectionization';

@import '_my_style';

/* and more... 🖋 */
```

#### ページ番号

まずはページ番号です。Vivliostyle は `page` というカウンタ変数を持っているため、通常は自分でページ番号用の変数を定義する必要はありません。このカウンタ変数は自動的に一番最初のページでリセットされ、各ページでインクリメントされるようになっています。ページ番号を表示するには、次のようなスタイルを定義します。

```scss
// scss/theme_common.scss 内で定義済み

// 左ページの場合は左上に表示
@page :left {
  @top-left {
    content: counter(page);
  }
}

// 右ページの場合は右上に表示
@page :right {
  @top-right {
    content: counter(page);
  }
}
```

しかし、カウンタの挙動を変えたい場合（たとえば、目次ではページ番号をインクリメントしたくない場合など）は自分でカウンタ変数を定義する必要があります。このチュートリアルでは目次のページ番号をインクリメントしたくないので、以下のように自分で定義したカウンタ変数 `p` を使うことにします。

```scss {highlight: ['3-25']}
// scss/_my_style.scss

// 一番最初のページでリセット
@page :first {
  counter-reset: p;
}

// 各ページでインクリメント
@page {
  counter-increment: p;
}

// 左ページの場合は左上に表示
@page :left {
  @top-left {
    content: counter(p);
  }
}

// 右ページの場合は右上に表示
@page :right {
  @top-right {
    content: counter(p);
  }
}
```

#### 章番号

次に章番号を表示します。`@page :nth(1) {}` を使って、vivliostyle.config.js の `entry` に指定した各原稿ファイルの一番最初のページで、カウンタ変数の `chapter` をインクリメントします。

`@page :first {}` は出版物全体を通して最初のページを指します。一方で `@page :nth(1) {}` は、vivliostyle.config.js の `entry` で指定した原稿ファイルそれぞれの最初のページを指します（これは Vivliostyle 独自の挙動です）。

```scss {highlight: ['3-16']}
// scss/_my_style.scss

// 章番号
@page :nth(1) {
  counter-increment: chapter p;
}

// 章タイトル
section > {
  h1 {
    &::before {
      content: '第 ' counter(chapter) ' 章';
      display: block;
    }
  }
}
```

#### プレビュー

これまでの変更をふまえて、プレビューは以下のようになります。オートリロードされない場合はもう一度 `yarn dev` を試してみてください。

### Step 4. 目次の表示

ここまででページ番号と章番号を表示できました。次は目次です。

#### 目次の自動生成

Vivliostyle には `<h1>` 見出しをもとに目次を自動生成する機能があります。`<h1>` 以外の見出しが必要な場合は自分で目次を作ることもできますが、今回はこの機能を使ってみましょう。

vivliostyle.config.js に以下の記述を加えます。すると、一番最初のページに目次が表示されるようになります。

```js {highlight:[6,10,11]}
// vivliostyle.config.js

module.exports = {
  // ...
  entry: [
    { rel: 'contents', theme: 'theme_toc.css' },
    'example/ch01.md',
    'example/ch02.md',
  ],
  toc: true,
  tocTitle: '目次',
  // ...
};
```

#### プレビュー

続いて scss/theme_toc.scss という目次専用のスタイルファイルを作ります。ひとまず theme_print.scss と同様のスタイルを定義して、ページ番号をインクリメントしないようにしておきます。

```bash
$ touch scss/theme_toc.scss
```

```scss {highlight:['3-17']}
// scss/theme_toc.scss

@import 'theme_common';

@page {
  marks: crop cross;
  bleed: 3mm;

  @top-left {
    content: 'theme_print';
  }
}

// ページ番号をインクリメントしない
@page :nth(1) {
  counter-increment: none;
}
```

以下のような見た目になりました。

もうすこしシュッとした見た目にしてみましょう。まず、不要な部分を隠します。

```scss {highlight: ['7-27']}
// scss/theme_toc.scss

@import 'theme_common';

// ...

// 不要な部分を隠す
@page :left {
  @top-left {
    content: '';
  }
}
@page :right {
  @top-right {
    content: '';
  }
}
h1 {
  display: none;
}
h2 {
  text-indent: 0;
}
nav ol {
  padding: 0;
  list-style: none;
}
```

目次にも対応するページ番号と章番号を表示してみましょう。

```scss {highlight: ['7-18']}
// scss/theme_toc.scss

// ...

nav ol {
  // ...
  li a {
    &::before {
      content: '第 ' target-counter(attr(href url), chapter) ' 章';
      margin-right: 1rem;
    }
    &::after {
      content: target-counter(attr(href url), p);
      float: right;
    }
  }
}
```

一気に本らしくなりましたね！

### Step 5. 原稿ごとのスタイルの設定

原稿ファイルごとにテーマカラーを設定してみましょう。

#### スタイルの改善

まずは、全体的にもっと本らしい見た目にしてみましょう。

```scss {highlight: [6,'10-12',18,'23-24','29-40']}
// scss/_my_style.scss

// ...

// 各ページでインクリメント
// ページ上部に章ごとのタイトルを表示
@page {
  counter-increment: p;

  @top-center {
    content: string(doc-title);
  }
}

// 章タイトル
section > {
  h1 {
    border-top: 10pt solid black;

    &::before {
      content: '第 ' counter(chapter) ' 章';
      display: block;
      font-size: 80%;
      margin: 10pt auto;
    }
  }
}

// 著者名
.author {
  font-weight: bold;
  text-align: right;
  border-bottom: 10pt solid black;
  margin-bottom: 20pt;
}

// 全体
html {
  line-height: 2rem;
}
```

章タイトル部分にボーダーラインが表示されました。次の節からは、このボーダーラインの色を原稿ファイルごとに設定していきます。

#### テーマカラーの設定

では、原稿ファイルごとにテーマカラーを設定していきます。サンプル原稿を少し編集します。`---` で囲まれた [Frontmatter](https://vivliostyle.github.io/vfm/#/vfm#frontmatter) 部分に class を指定すると、html 要素と body 要素にその名前の class を付与することができます。この機能を使って、原稿ファイルごとに別々のスタイルを適用することができます。

```markdown {highlight: ['3-5']}
<!-- example/ch01.md -->

---

## class: natsume

# 吾輩は猫である。

...
```

```markdown {highlight: ['3-5']}
<!-- example/ch02.md -->

---

## class: akutagawa

# 羅生門

...
```

```scss {highlight: ['5-18']}
// scss/_my_style.scss

// ...

// テーマカラー
html.natsume {
  h1,
  .author {
    border-color: #d1307d;
  }
}

html.akutagawa {
  h1,
  .author {
    border-color: #24aae1;
  }
}
```

この方法を使えば、もちろん色だけでなく、原稿ファイルごとに文字のサイズや書体を変えることも可能です。

### Step 6. 完成！

おつかれさまです！　これで Theme が完成しました。

#### Theme を公開したい場合

npm package として公開する場合は、仕様に従ってください。

`yarn publish` して npm package として公開すると、Create Book で出版物を作る際に、以下のように Theme を選択できるようになります。

```bash
$ yarn create book test
yarn create v1.22.10
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Installed "create-book@0.5.0" with binaries:
      - create-book
? description description
? author name
? author email
? license AGPL-3.0
? choose theme (Use arrow keys)
❯ @vivliostyle/theme-bunko - 文庫用のテーマ
  @vivliostyle/theme-slide - Slide theme
  @vivliostyle/theme-techbook - Techbook (技術同人誌) theme
  @vivliostyle/theme-academic - Academic theme
  vivliostyle-theme-dnd-5e-phb - D&D 5e PHB theme for Vivliostyle
  // ここにあなたの Theme が表示されます！
(Move up and down to reveal more choices)
```

#### もっとスタイルを編集したい場合

- [Vivliostyle がサポートする CSS 機能](https://docs.vivliostyle.org/#/ja/supported-css-features)
  - スタイルシート内で使える値、セレクタ、@ルール、メディアクエリ、プロパティなどが一覧でまとまっています。
- 公式ブログ記事
  - 直近で使えるようになった機能などが紹介されています。
  - 2021 年 11 月現在は以下のブログ記事がおすすめです。
    - [最近の Vivliostyle.js の進化について](https://vivliostyle.org/ja/blog/2021/10/12/recent-vivliostyle-js-updates/)
    - [Vivliostyle の最新アップデート — CLI 改良と CSS Paged Media サポートの充実](https://vivliostyle.org/ja/blog/2021/04/21/vivliostyle-improved-css-paged-media-support/)
- Vivliostyle Core のテストケース
  - テストケースは Vivliostyle の使用例として良いサンプルになっています。CSS 組版でどのようなことができるかに興味があれば、是非チェックしてみてください。
    - [テストケース一覧](https://raw.githack.com/vivliostyle/vivliostyle.js/master/packages/core/test/files/)
    - [テストケースに対応する HTML/CSS のセット一覧](https://github.com/vivliostyle/vivliostyle.js/tree/master/packages/core/test/files)

