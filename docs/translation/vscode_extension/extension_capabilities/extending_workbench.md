# 伸びる作業台

"Workbench "は、以下のUIコンポーネントを包含するVisual Studio CodeのUI全体を指します。

- タイトルバー
- アクティビティバー
- サイドバー
- パネル
- エディタグループ
- ステータスバー

VS Codeには、独自のコンポーネントをWorkbenchに追加するための様々なAPIが用意されています。例えば、下の画像では

![ワークベンチ・コントリビューション](images/extending-workbench/workbench-contribution.png)

- アクティビティバーです。Azure App Service 拡張](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) は、[ビュー コンテナ](#views-container) を追加しています。
- サイドバー。組み込みの[NPM extension](https://github.com/microsoft/vscode/tree/main/extensions/npm)は、エクスプローラビューに[ツリービュー](#tree-view)を追加します。
- エディタグループ。ビルトインの[Markdown extension](https://github.com/microsoft/vscode/tree/main/extensions/markdown-language-features)はエディターグループの他のエディターの隣に[Webview](#webview)を追加します。
- ステータスバーVSCodeVimエクステンション](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)は、ステータスバーに[ステータスバーアイテム](#status-bar-item)を追加します。

## ビューコンテナ

contributes.viewsContainers`](/api/references/contribution-points#contributes.viewsContainers) 貢献ポイントを使用すると、5つの組み込みビューコンテナの隣に表示する新しいビューコンテナを追加することができます。詳細は、[Tree View](/api/extension-guides/tree-view) トピックで説明します。

## ツリービュー

contributes.views`](/api/references/contribution-points#contributes.views) 貢献ポイントを使用すると、任意のビューコンテナに表示される新しいViewを追加することができます。詳細は、[Tree View](/api/extension-guides/tree-view) トピックで説明します。

## ウェブビュー

Webview は、HTML/CSS/JavaScript で構築された、高度にカスタマイズ可能なビューです。エディターグループの領域で、テキストエディターの隣に表示されます。Webviewについては、[Webview guide](/api/extension-guides/webview)で詳しく説明されています。

## ステータスバー項目

エクステンションはステータスバーに表示されるカスタム[`StatusBarItem`](/api/references/vscode-api#StatusBarItem)を作成することができます。ステータスバーアイテムは、テキストやアイコンを表示したり、クリックイベントでコマンドを実行したりすることができます。

- テキストとアイコンの表示
- クリック時にコマンドを実行する

ステータスバー拡張サンプル](https://github.com/microsoft/vscode-extension-samples/tree/main/statusbar-sample)をご覧いただくと、より詳しくご理解いただけます。
