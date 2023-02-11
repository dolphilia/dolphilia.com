# 変数

以下はブックのパースとテーマ生成時に利用可能なデータの参考例です。

### グローバル変数

| 変数 | 説明 |
| -------- | ----------- |
| `book` | 本全体の情報 + 設定を `book.json` から取得します。詳細は以下を参照。 |
| `honkit` | HonKitの具体的な情報 |
| `gitbook` | HonKit固有の情報です。これは `honkit` のエイリアスです。 |
| `page` | 現在のページ固有の情報 |
| `file` | 現在のページの特定情報に関連するファイル |
| `readme` | Readmeに関する情報 |
| `glossary` | 用語集に関する情報 |
| `summary` | 目次に関する情報 |
| `languages` | 多言語ブックの言語一覧 |
| `output` | 出力ジェネレーターに関する情報 |
| `config` | `book.json`をダンプする。 |

### Book変数

| 変数 | 説明 |
| -------- | ----------- |
| `book.[CONFIGURATION_DATA]` | `book.json`で設定したすべての`変数`は、book変数を通して利用することができます。 |
| `book.language` | 多言語ブックの現在の言語 |

### HonKit変数

| 変数 | 説明 |
| -------- | ----------- |
| `honkit.time` | 現在の時刻（`honkit`コマンドを実行したとき）。 |
| `gitbook.time` | 現在の時刻（`honkit`コマンドを実行したとき）。 |
| `honkit.version` | ブックの生成に使用したHonKitのバージョン |
| `gitbook.version` | ブックの生成に使用したHonKitのバージョン |

### File変数

| 変数 | 説明 |
| -------- | ----------- |
| `file.path` | rawページへのパス |
| `file.mtime` | 修正時刻。ファイルが最後に変更された時間 |
| `file.type` | このファイルをコンパイルするために使用したパーサーの名前 (例: `markdown`, `asciidoc`, など) |

#### Page変数

| 変数 | 説明 |
| -------- | ----------- |
| `page.title` | ページのタイトル |
| `page.previous` | 目次の前のページ (`null` も可) |
| `page.next` | 目次の次のページ (`null` も可) |
| `page.dir` | 設定に基づくか、コンテンツから検出されたテキストの方向 (`rtl` または `ltr`)|

#### 目次変数

| 変数 | 説明 |
| -------- | ----------- |
| `summary.parts` | 目次のセクションのリスト |

目次(`SUMMARY.md`)全体にアクセスすることができる。

`summary.parts[0].articles[0].title`は、最初の記事のタイトルを返します。

#### 多言語ブック変数

| 変数 | 説明 |
| -------- | ----------- |
| `languages.list` | ブックの言語一覧 |

言語は `{ id: 'en', title: 'English' }` で定義されます。

### 出力変数

| 変数 | 説明 |
| -------- | ----------- |
| `output.name` | 出力ジェネレータの名前。指定可能な値は`website`・`json`・`ebook`です。 |
| `output.format` | `output.name == "ebook"` の場合、`format` は生成される電子書籍の形式を定義します。可能な値は`pdf`・`epub`・`mobi` です。 |

### Readme変数

| 変数 | 説明 |
| -------- | ----------- |
| `readme.path` | ブック内のReadmeへのパス |

### 用語集変数

| 変数 | 説明 |
| -------- | ----------- |
| `glossary.path` | ブックに掲載されている用語集へのパス |
