# ディレクトリ構造

HonKitはシンプルなディレクトリ構造を使用しています。[SUMMARY](pages.md)にリストされたすべてのMarkdown/AsciidocファイルはHTMLに変換されます。多言語の書籍は若干[異なる構造](languages.md)になっています。

基本的なHonKitは通常、次のようなものです。

```
.
├── book.json
├── README.md
├── SUMMARY.md
├── chapter-1/
|   ├── README.md
|   └── something.md
└── chapter-2/
    ├── README.md
    └── something.md
```

それぞれの役割の概要を説明します。

| ファイル | 説明 |
| -------- | ----------- |
| `book.json` | [設定](config.md)データを格納する(__任意__) |
| `README.md` | 本の序文 / 紹介文 (**必須**) |
| `SUMMARY.md` | 目次（[ページ](pages.md)を参照） (__任意__) |
| `GLOSSARY.md` | 用語集 / 注釈を付ける用語のリスト（[用語集](lexicon.md)を参照） (__任意__) |

### 静止画ファイル・画像

静的ファイルとは`SUMMARY.md`にリストされていないファイルのことです。[無視](#ignore)されない限り、すべての静的ファイルは出力にコピーされます。

### ファイル＆フォルダの無視 {#ignore}

HonKitは`.gitignore`・`.bookignore`・`.ignore` ファイルを読み込んでスキップするファイルやフォルダのリストを取得します。
これらのファイル内のフォーマットは`.gitignore`と同じ規則に従います。

```
# これはコメントです

# test.md ファイルを無視します
test.md

# binディレクトリにあるものはすべて無視する。
bin/*
```

### サブディレクトリを使ったプロジェクト統合 {#subdirectory}

ソフトウェアプロジェクトでは、プロジェクトのドキュメント用のブックを保存するためにサブディレクトリ（`docs/`など）を使用することができます。また、[`root` オプション](config.md)でHonKitがブックのファイルを見つけることができるフォルダを設定することができます。

```
.
├── book.json
└── docs/
    ├── README.md
    └── SUMMARY.md
```

`book.json`に含めます。

```
{
    "root": "./docs"
}
```
