# 共通機能

共通機能は、拡張機能のための重要な構成要素です。ほとんどすべての拡張機能が、これらの機能のいくつかを使用しています。ここでは、これらの機能を利用する方法を説明します。

## コマンド

コマンドは、VS Codeの動作の中心となるものです。コマンドパレットを開いてコマンドを実行したり、カスタムキーバインドをコマンドにバインドしたり、右クリックでコンテキストメニューのコマンドを呼び出したりします。

拡張機能では

- `vscode.commands`](/api/references/vscode-api#commands) APIでコマンドの登録と実行を行います。
- 貢献ポイント[`contributes.commands`](/api/references/contribution points#contributes.commands) でコマンドパレットでコマンドを利用できるようにする。

コマンドについては、[Extension Guides / Command](/api/extension-guides/command) トピックで詳しく説明されています。

## コンフィギュレーション

拡張機能は、[`contributes.configuration`](/api/references/contribution points#contributes.configuration) Contribution Pointで拡張機能固有の設定を提供し、[`workspace.getConfiguration`](/api/references/vscode-api#workspace.getConfiguration) APIでそれを読み取ることができます。

## キーバインド

拡張機能では、カスタムキーバインドを追加することができます。詳しくは [`contributes.keybindings`](/api/references/contribution-points#contributes.keybindings) と [Key Bindings](/docs/getstarted/keybindings) トピックをご覧ください。

## コンテキストメニュー

拡張機能では、右クリック時にVS Code UIのさまざまな場所に表示されるカスタムコンテキストメニューの項目を登録することができます。詳しくは、[`contributes.menus`](/api/references/contribution points#contributes.menus) Contribution Pointで説明します。

## データストレージ

データの保存方法には、4つの選択肢があります。

- [`ExtensionContext.workspaceState`](/api/references/vscode-api#ExtensionContext.workspaceState):キーと値のペアを書き込むことができるワークスペース・ストレージ。VS Codeはこのストレージを管理し、同じワークスペースを再び開いたときに復元します。
- [`ExtensionContext.globalState`](/api/references/vscode-api#ExtensionContext.globalState):キーと値のペアを書き込むことができるグローバルストレージです。VS Codeはこのストレージを管理し、拡張機能を起動するたびにリストアします。globalState` の `setKeysForSync` メソッドを使用して同期するキーを設定することで、グローバルストレージのキーと値のペアを選択的に同期させることができます。
- [`ExtensionContext.storagePath`](/api/references/vscode-api#ExtensionContext.storagePath):拡張機能が読み書き可能なローカルディレクトリを指す、ワークスペース固有のストレージパスです。これは、現在のワークスペースからしかアクセスできない大きなファイルを保存する必要がある場合に良いオプションです。
- [`ExtensionContext.globalStoragePath`](/api/references/vscode-api#ExtensionContext.globalStoragePath).GlobalStoragePath は、ローカルディレクトリを指す、グローバルなストレージパスです。拡張機能が読み書き可能なローカルディレクトリを指す、グローバルストレージパスです。これは、すべてのワークスペースからアクセスできる大きなファイルを保存する必要がある場合に、良いオプションです。

拡張コンテキストは、[Extension Entry File](/api/get-started/extension-anatomy#extension-entry-file) の `activate` 関数で利用することができます。

### setKeysForSyncの例

もしあなたの拡張機能が異なるマシン間でユーザーの状態を保持する必要がある場合、 `vscode.ExtensionContext.globalState.setKeysForSync` を使って [Setting Sync](/docs/editor/settings-sync) にその状態を提供することができます。

以下のようなパターンを使うことができます。

```TypeScript
// on activate
const versionKey = 'shown.version';
context.globalState.setKeysForSync([versionKey]);

// later on show page
const currentVersion = context.extension.packageJSON.version;
const lastVersionShown = context.globalState.get(versionKey);
if (isHigher(currentVersion, lastVersionShown)) {
    context.globalState.update(versionKey, currentVersion);
}
```

マシン間で状態を共有することで、解任または閲覧フラグを共有し、ユーザーがウェルカムページやアップデートページの複数のインスタンスを見るという問題を回避することができます。

## お知らせを表示する

ほとんどすべてのエクステンションは、ある時点でユーザーに情報を提示する必要があります。VS Code は、異なる重要度の通知メッセージを表示するための 3 つの API を提供します。

- [`window.showInformationMessage`](/api/references/vscode-api#window.showInformationMessage)
- [`window.showWarningMessage`](/api/references/vscode-api#window.showWarningMessage)
- [`window.showErrorMessage`](/api/references/vscode-api#window.showErrorMessage)

## クイックピック

[`vscode.QuickPick`](/api/references/vscode-api#QuickPick) API を使用すると、ユーザ入力を簡単に収集したり、複数の選択肢からユーザに選択させることができます。QuickInput sample](https://github.com/microsoft/vscode-extension-samples/tree/main/quickinput-sample)はこのAPIを説明するものです。

## ファイルピッカー

Extensions は [`vscode.window.showOpenDialog`](/api/references/vscode-api#vscode.window.showOpenDialog) API を使ってシステムファイルピッカーを開き、ファイルやフォルダーを選択することができます。

## 出力チャンネル

出力パネルは [`OutputChannel`](/api/references/vscode-api#OutputChannel) のコレクションを表示し、これはロギング目的に最適です。これはロギングに最適です。[`window.createOutputChannel`](/api/references/vscode-api#window.createOutputChannel) APIを使って簡単に利用することができます。

## プログレス API

進捗の更新をユーザに報告するために [`vscode.Progress`](/api/references/vscode-api#Progress) API を使用することができます。

進捗は [`ProgressLocation`](/api/references/vscode-api#ProgressLocation) オプションを使用して異なる場所に表示することができます。

- Notificationsエリア
- ソースコントロールビュー
- VS Codeウィンドウの一般的な進行状況

Progressサンプル](https://github.com/microsoft/vscode-extension-samples/tree/main/progress-sample)は、このAPIを説明するものです。
