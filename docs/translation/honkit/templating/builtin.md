# 組み込みのテンプレートヘルパー

本キットではテンプレートの作成を支援するために、一連の組み込みフィルタとブロックを提供しています。

### フィルター

`value|default(default, [boolean])`
値が厳密に未定義の場合はデフォルトをそうでない場合は値を返します。booleanが真の場合、JavaScriptのファルシーな値はすべてデフォルトを返します（false, "", など）。

`arr|sort(reverse, caseSens, attr)`
arrをJavaScriptのarr.sort関数でソートします。reverseがtrueの場合、結果が反転します。デフォルトでは大文字と小文字を区別しませんが、caseSens を true にすると大文字と小文字を区別するようになります。attrが渡された場合は、各項目のattrを比較します。

### ブロック

`{% markdown %}Markdown string{% endmarkdown %}`
インラインマークダウンのレンダリング

`{% asciidoc %}AsciiDoc string{% endasciidoc %}`
インラインのAsciidocをレンダリングする
