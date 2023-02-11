# テーマ

バージョン3.0.0以降、HonKitは簡単にテーマを設定することができるようになりました。書籍では、デフォルトで [theme-default](https://github.com/honkit/honkit/tree/master/packages/%40honkit/theme-default) というテーマが使用されます。

> **ご注意ください**: カスタムテーマにより、一部のプラグインが正しく動作しない場合があります。

### テーマの構成

テーマとは、テンプレートとアセットを含むプラグインのことです。テーマは常にデフォルトのテーマを拡張するので、個々のテンプレートのオーバーライドは任意です。

| フォルダ | 説明 |
| -------- | ----------- |
| `_layouts` | すべてのテンプレートが格納されているメインフォルダー |
| `_layouts/website/page.html` | 通常ページのテンプレート |
| `_layouts/ebook/page.html` | 電子書籍生成時の通常ページ用テンプレート（PDF, ePub, Mobi） |


### ブックのテーマを拡張・カスタマイズする

ブックのソースから直接テーマのテンプレートを拡張することができます（外部テーマを作成することなく）。テンプレートはまず本の `_layouts` フォルダに、次にインストールされた plugins/themes に解決されます。

### Forkingの代わりにExtend

テーマの変更を複数のブックで利用できるようにしたい場合、デフォルトのテーマをフォークするのではなく、[templating syntax](../templating/README.md) を使って拡張することが可能です。

```html
{% extends template.self %}

{% block body %}
    {{ super() }}
    ... これは"body "ブロックに追加されます。
{% endblock %}
```

より完全な例として[API](https://github.com/GitbookIO/theme-api)テーマを見てみましょう。

### テーマを公開する

テーマはプラグイン ([関連ドキュメント](../plugins/README.md)) として `theme-` というプレフィックスを付けて公開されています。例えば、テーマ `awesome` はプラグイン `theme-awesome` からロードされ、NPM パッケージ `honkit-plugin-theme-awesome` からロードされます。
