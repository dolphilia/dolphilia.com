# フロントマター

YAML frontmatterブロックを含むすべてのMarkdownファイルはgray-matterによって処理されます。frontmatterはMarkdownファイルの先頭になければならず、三重破線の間に有効なYAMLを設定する形式である必要があります。例

```yaml
---
title: Docs with VitePress
editLink: true
---
```

三重の破線の間には、定義済みの変数を設定したり、独自のカスタム変数を作成したりすることができます。これらの変数は、特別な変数 $frontmatter を介して使用することができます。

以下は、あなたのMarkdownファイルでどのように使用するかの例です。

```md
---
title: Docs with VitePress
editLink: true
---

# {{ $frontmatter.title }}

Guide content
```

## フロントマター・オルタナティブ・フォーマット #

VitePressは、中括弧で始まり、中括弧で終わるJSONフロントマターシンタックスもサポートしています。

```json
---
{
  "title": "Blogging Like a Hacker",
  "editLink": true
}
---
```