# コンテキストとAPI

HonKitsはプラグインに様々なAPIとコンテキストを提供します。これらのAPIは使用するHonKitのバージョンによって異なる可能性があるので、プラグインはそれに応じて `package.json` の `engines.gitbook` フィールドを指定しなければなりません。

#### ブックインスタンス

`Book` クラスは、HonKit の中心的な存在であり、すべてのアクセス・リード・メソッドを集約しています。このクラスは [book.js] (https://github.com/honkit/honkit/blob/master/lib/book.js) で定義されている。

```js
// book.jsonから設定を読み込む
var value = book.config.get('title', 'Default Value');

// ファイル名を絶対パスに変換する。
var filepath = book.resolve('README.md');

// インラインのマークアップ文字列をレンダリングする
book.renderInline('markdown', 'This is **Markdown**')
    .then(function(str) { ... })

// マークアップ文字列をレンダリングする（ブロックモード）
book.renderBlock('markdown', '* This is **Markdown**')
    .then(function(str) { ... })
```

#### 出力インスタンス

`Output`クラスは、出力/書き込み処理を表す。

```js
// 出力のルートフォルダを返す
var root = output.root();

// 出力フォルダー内のファイルを解決する
var filepath = output.resolve('myimage.png');

// ファイル名をURLに変換する（htmlファイルへのパスを返す）。
var fileurl = output.toURL('mychapter/README.md');

// 出力フォルダにファイルを書き込む
output.writeFile('hello.txt', 'Hello World')
    .then(function() { ... });

// ファイルを出力先フォルダにコピーする
output.copyFile('./myfile.jpg', 'cover.jpg')
    .then(function() { ... });

// ファイルが存在することを確認する
output.hasFile('hello.txt')
    .then(function(exists) { ... });
```

#### ページインスタンス

現在解析されているページを表すページインスタンス。

```js
// ページのタイトル (SUMMARYより)
page.title

// ページの内容（ステージに応じたMarkdown/Asciidoc/HTML)
page.content

// ブックの相対パス
page.path

// ファイルへの絶対パス
page.rawPath

// このファイルに使用されたパーサーの種類
page.type ('markdown' or 'asciidoc')
```

#### ブロックとフィルタのコンテキスト

ブロックとフィルターは同じコンテキストにアクセスでき、このコンテキストはテンプレート・エンジンの実行にバインドされます。

```js
{
    // 現在のテンプレート構文
    "ctx": {
        // For example, after a {% set message = "hello" %}
        "message": "hello"
    },

    // ブックインスタンス
    "book" <Book>,

    // 出力インスタンス
    "output": <Output>
}
```

例えば、フィルタやブロック関数は、`this.book`のように現在のブックにアクセスできます。

#### フックのコンテキスト

フックは `this.book` を使って `<Book>` インスタンスにのみアクセスすることができます。
