# テーミング

Visual Studio Codeでは、3種類のテーマがあります。

- **カラーテーマ**。UI Component IdentifierとText Token Identifierの両方から色へのマッピング。カラーテーマを使用すると、VS Code UIコンポーネントとエディター内のテキストの両方に好きな色を適用することができます。
- ファイルアイコンテーマ**。ファイルタイプ/ファイル名から画像へのマッピングです。ファイルエクスプローラー、クイックオープンリスト、エディタタブなど、VS Code UI全体にファイルアイコンが表示されます。
- プロダクトアイコンテーマ**。サイドバー、アクティビティバー、ステータスバーからエディターグリフマージンまで、UI全体で使用されるアイコンのセットです。

## カラーテーマ

![カラーテーマ](images/theming/color-theme.png)

図にあるように、カラーテーマはUIコンポーネントの色だけでなく、エディターでのハイライトの色も定義しています。

- UIコンポーネントの色を制御する `colors` マッピング。
- UIコンポーネントの色を制御する `colors` のマッピング。 `tokenColors` は、エディタでのハイライトの色とスタイルを定義します。Syntax Highlight guide](/api/language-extensions/syntax-highlight-guide) には、このトピックに関するより多くの情報が記載されています。
- semanticTokenColors` マッピングと `semanticHighlighting` 設定は、エディターでのハイライトを強化することができます。Semantic Highlight guide](/api/language-extensions/semantic-highlight-guide) では、それに関連するAPIを説明しています。

カラーテーマガイド](/api/extension-guides/color-theme)と[カラーテーマサンプル](https://github.com/microsoft/vscode-extension-samples/tree/main/theme-sample)でテーマの作成方法を説明しています。

## ファイルアイコンテーマ

ファイルアイコンテーマでは、以下のことが可能です。

- 一意のファイルアイコン識別子から画像またはフォントアイコンへのマッピングを作成。
- ファイル名またはファイル言語タイプによって、これらのユニークなファイルアイコン識別子にファイルを関連付けます。

ファイルアイコンテーマの作成方法については、[ファイルアイコンテーマガイド](/api/extension-guides/file-icon-theme)で説明しています。
ファイルアイコンテーマ](images/theming/file-icon-theme.png)を参照してください。

## プロダクトアイコンテーマ

プロダクトアイコンテーマでは、以下のことが可能です。

ワークベンチで使用されるすべてのビルトインアイコンを再定義します。例えば、フィルターアクションボタンやビューアイコン、ステータスバーのアイコン、ブレークポイント、ツリーやエディターの折りたたみアイコンなどがあります。

Product Icon Theme guide](/api/extension-guides/product-icon-theme)では、Product Icon Themeを作成する方法について説明します。
