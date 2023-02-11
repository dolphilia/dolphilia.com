# フック

フックとは、カスタムコールバックにより、プロセスの動作を補強したり、変更したりする手法です。

### フック一覧

### グローバルパイプラインとの相対比較

| 名前 | 説明 | 引数 |
| ---- | ----------- | --------- |
| `init` | ブックをパースした後、出力とページを生成する前に呼び出されます。 | None |
| `finish:before` | ページ生成後、アセット、カバー、...をコピーする前に呼び出されます。 | None |
| `finish` | 他のすべての後に呼び出されます。 | None |

### ページパイプラインとの相対的な関係

> ページの解析を拡張するために、templatingを使用することが推奨されます。

| 名前 | 説明 | 引数 |
| ---- | ----------- | --------- |
| `page:before` | ページでテンプレートエンジンを実行する前に呼び出される | ページオブジェクト |
| `page` | ページを出力してインデックスを作成する前に呼び出される。 | ページオブジェクト |

:memo: インクリメンタルモード(`honkit serve`)では、非変更ページのフックをスキップすることがある。

##### ページオブジェクト

```js
{
    // パーサー名
    "type": "markdown",

    // ブックルートからの相対的なファイルパス
    "path": "page.md",

    // 絶対ファイルパス
    "rawpath": "/usr/...",

    // SUMMARYのページタイトル
    "title": "",

    // ページの内容
    // Markdown/Asciidoc in "page:before"
    // HTML in "page"
    "content": "<h1>Hello</h1>"

    // ページのレベル
    "level": "1.5.3.1"

    // ページの深さ
    "depth": "3"

    // その他の属性は.mdの中で、コンテンツの先頭にある2つの「---」の間に表示されます。 
    // 例えばマークダウンの先頭では
    // ---
    // description: This is a description
    // ---
    "description": "This is a description"

    // 前の記事
    "previous": Article Object

    // 次の記事
    "next": Article Object
}
```

##### タイトルを追加する例

`page:before` フックでは、 `page.content` が markdown/asciidoc のコンテンツになります。

```js
{
    "page:before": function(page) {
        page.content = "# Title\n" +page.content;
        return page;
    }
}
```

##### 一部のhtmlを置き換える例

`page` フックでは、 `page.content` が markdown/asciidoc 変換で生成された HTML になります。

```js
{
    "page": function(page) {
        page.content = page.content.replace("<b>", "<strong>")
            .replace("</b>", "</strong>");
        return page;
    }
}
```


### 非同期操作

フック・コールバックは非同期でプロミスを返すことができます。

例:

```js
{
    "init": function() {
        return writeSomeFile()
        .then(function() {
            return writeAnotherFile();
        });
    }
}
```
