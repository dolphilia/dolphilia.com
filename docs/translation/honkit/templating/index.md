# テンプレート化

HonKitは、ページやテーマのテンプレートを処理するために、[Nunjucks templating language](https://mozilla.github.io/nunjucks/)を使用しています。

Nunjucksの構文は、**Jinja2** や **Liquid** に非常によく似ています。この構文では、中括弧 `{ }` を使って、処理する必要のあるコンテンツをマークします。

### 変数

変数はテンプレートのコンテキストから値を探します。単に変数を表示したい場合は、 `{{ variable }}` という構文を使用します。例えば．

```twig
はじめまして。{{ name }}と申します。
```

これはコンテキストからユーザー名を検索して表示します。変数名には、JavaScriptと同じようにプロパティを検索するドットを入れることができます。また、角括弧の構文も使えます。

```twig
{{ foo.bar }}
{{ foo["bar"] }}
```

値が未定義の場合は何も表示しません。以下は全てfooが未定義の場合、何も出力しません。

```twig
{{ foo }}, {{ foo.bar }}, {{ foo.bar.baz }}
```

HonKitはコンテキストから[定義済み変数](variables.md)のセットを提供します。

### フィルター

フィルタは基本的に変数に適用することができる関数です。パイプ演算子 (`|`) を使って呼び出され、引数を取ることができます。


```twig
{{ foo | title }}
{{ foo | join(",") }}
{{ foo | replace("foo", "bar") | capitalize }}
```


3つ目の例は、フィルタを連鎖させる方法を示しています。この例では、まず "foo "を "bar "に置き換えてから大文字にして、"Bar "と表示させる。

### タグ

##### if

`if` は条件をテストし、選択的にコンテンツを表示することができます。JavaScriptの `if` と全く同じ動作をします。

```twig
{% if variable %}
  It is true
{% endif %}
```

変数が定義されており、評価値がtrueであれば、"It is true "と表示されます。そうでなければ、何も表示されません。

`elif` と `else` で代替条件を指定することができる。

```twig
{% if hungry %}
  I am hungry
{% elif tired %}
  I am tired
{% else %}
  I am good!
{% endif %}
```

##### for

`for` は配列や辞書を繰り返し処理します。

```twig
# HonKitに関する章

{% for article in glossary.terms['gitbook'].articles %}
* [{{ article.title }}]({{ article.path }})
{% endfor %}
```

##### set

set` は、変数を作成/変更することができます。

```twig
{% set softwareVersion = "1.0.0" %}

Current version is {{ softwareVersion }}.
[Download it](website.com/download/{{ softwareVersion }})
```

##### インクルード・ブロック

インクルージョンと継承については[コンテンツ参照](conrefs.md) のセクションで詳しく説明しています。

### エスケープ

もしHonKitに特別なテンプレートタグを無視させたい場合はrawを使用すれば、その中のものはプレーンテキストとして出力されます。

``` twig
{% raw %}
  this will {{ not be processed }}
{% endraw %}
```