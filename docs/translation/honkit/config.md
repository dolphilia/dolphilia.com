# コンフィギュレーション

HonKitでは柔軟な設定により本をカスタマイズすることができます。これらのオプションは`book.json`ファイルで指定します。JSONの構文に不慣れな方は[JSONlint](http://jsonlint.com)などのツールを使って構文の検証を行うことができます。

### 基本設定

| 変数 | 説明 |
| -------- | ----------- |
| `root` | `book.json`以外のすべてのブックファイルを含むルートフォルダへのパス。 |
| `structure` | Readme、Summary、Glossaryなどのパスを指定する。[構造段落](#structure)を参照してください。 |
| `title` | 本のタイトル。デフォルトは`HonKit`です。 |
| `description` | 本の説明文。デフォルト値はREADMEから抽出したものです。 |
| `author` | 著者名（複数の場合はアンパサンドで区切ってください）。 |
| `authorSort` | 著者でソートする際に使用する文字列。 |
| `producer` | プロデューサーの名前 |
| `publisher` | 出版社名 |
| `series` | この本が所属するシリーズ |
| `seriesIndex` | このシリーズの書籍の索引。 |
| `pubdate` | 書籍の出版日。YYYY-MM-DDTHH:MM:SSのフォーマットで表示される。 |
| `isbn` | 書籍のISBN |
| `language` | 本の言語の[ISOコード](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)。デフォルト値は `en` です。 |
| `direction` | テキストの方向。`rtl` または `ltr` でデフォルト値は `language` の値に依存する。 |
| `gitbook` | 使用するHonKitのバージョン。[SemVer](http://semver.org)の仕様を使い、`">= 3.0.0"` のような条件も受け付ける。 |
| `honkit` | 使用するHonKitのバージョン。[SemVer](http://semver.org)の仕様を使い、`">= 3.0.0"` のような条件も受け付ける。 |

### プラグイン

プラグインとその設定は `book.json` で指定する。詳細は プラグインのセクションを参照してください。

バージョン3.0.0以降、HonKitはテーマを使用することができます。詳しくはthemeing sectionをご覧ください。

| 変数 | 説明 |
| -------- | ----------- |
| `plugins` | ロードするプラグインのリスト |
| `pluginsConfig` | プラグインに関する設定 |

### 構造

`root`変数に加えて、Readme・Summary・ Glossary・Languagesのファイル名をHonKitに伝えることができます（`README.md`のようなデフォルトの名前を使うのではありません）。
これらのファイルは、本のルート (またはすべての言語の本のルート) にある必要があります。`dir/MY_README.md` のようなパスは受け付けられません。

| 変数 | 説明 |
| -------- | ----------- |
| `structure.readme` | Readmeファイル名 (デフォルトは `README.md`) |
| `structure.summary` | Summaryファイル名 (デフォルトは `SUMMARY.md`) |
| `structure.glossary` | Glossaryファイル名 (デフォルトは `GLOSSARY.md`) |
| `structure.languages` | Languagesファイル名 (デフォルトは `LANGS.md`) |

### PDFオプション

PDF出力は`book.json`にある一連のオプションを使ってカスタマイズすることができます。

| 変数 | 説明 |
| -------- | ----------- |
| `pdf.pageNumbers` | 各ページの最下部にページ番号を追加 (デフォルトは `true`) |
| `pdf.fontSize` | ベースとなるフォントサイズ (デフォルトは `12`) |
| `pdf.fontFamily` | ベースとなるフォント(デフォルトは `Arial`) |
| `pdf.paperSize` | 用紙サイズ。オプションは `'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'legal', 'letter'` （デフォルトは`a4`）。 |
| `pdf.margin.top` | 上マージン (デフォルトは `56`) |
| `pdf.margin.bottom` | 下マージン（デフォルトは`56`） |
| `pdf.margin.right` | 右マージン (デフォルトは `62`) |
| `pdf.margin.left` | 左マージン (デフォルトは `62`) |
| `pdf.embedFonts` | すべてのフォントをPDFに埋め込む (デフォルトは `false`) |
