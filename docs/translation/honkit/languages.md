# 多言語

HonKitは複数の言語で書かれた本の構築をサポートしています。各言語は通常のHonKitのフォーマットに従ったサブディレクトリとし、リポジトリのルートに `LANGS.md` という名前のファイルを以下のフォーマットで存在させる必要があります。

```markdown
# 言語

* [English](en/)
* [French](fr/)
* [Español](es/)
```

### 各言語の設定

言語ブック（例：`en`）が `book.json` を持つ場合、その設定はメインの設定を拡張することになります。

唯一の例外はプラグインで、プラグインはグローバルに指定され、言語固有のプラグインを指定することはできません。