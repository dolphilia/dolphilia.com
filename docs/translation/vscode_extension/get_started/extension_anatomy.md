# エクステンションアナトミー

前回のトピックでは、基本的なエクステンションを動作させることができました。その中身はどうなっているのでしょうか？

Hello Worldエクステンションは、3つのことを行います。

- onCommand Activation Event: onCommand:helloworld.helloWorld を登録し、ユーザが Hello World コマンドを実行したときに拡張機能が有効になるようにします。
- contributes.commands Contribution Point を使って、Hello World コマンドをコマンドパレットで利用できるようにし、コマンド ID helloworld.helloWorld にバインドしています。
- commands.registerCommand VS Code API を使って、登録されたコマンド ID helloworld.helloWorld に関数をバインドしています。

これら3つの概念を理解することは、VS Code で拡張機能を記述する上で非常に重要です。

- アクティベーション・イベント: 拡張機能が有効になるためのイベント。
- Contribution Points: パッケージ.jsonのExtension Manifestで作成する、VS Codeを拡張するための静的な宣言。
- VS Code API: 拡張機能のコードで呼び出すことができる JavaScript API のセットです。

一般的に、拡張機能は Contribution Points と VS Code API を組み合わせて使用し、VS Code の機能を拡張します。拡張機能の概要では、拡張機能に適した Contribution Point と VS Code API を見つけるのに役立つ情報を提供します。

Hello World サンプルのソースコードを詳しく見て、これらの概念がどのように適用されるかを見てみましょう。

## エクステンションのファイル構成

```
.
├── .vscode
│   ├── launch.json     // 拡張機能の起動とデバッグのための設定
│   └── tasks.json      // TypeScriptをコンパイルするビルドタスクの設定
├── .gitignore          // ビルド出力と node_modules を無視する。
├── README.md           // 拡張機能の説明を読みやすくする
├── src
│   └── extension.ts    // エクステンション ソースコード
├── package.json        // エクステンション マニフェスト
├── tsconfig.json       // TypeScriptの設定
```

設定ファイルについては、こちらをご覧ください。

- VS Code Debuggingの設定に使用されるlaunch.json
- VS Codeのタスクを定義するためのtasks.json
- tsconfig.jsonはTypeScriptハンドブックを参照してください。

しかし、ここでは、Hello World 拡張を理解するために不可欠な package.json と extension.ts に焦点を当てます。

### エクステンションマニフェスト

VS Code の各拡張機能は、拡張機能マニフェストとして package.json を持つ必要があります。package.json には、scripts や devDependencies などの Node.js フィールドと、 publisher や activationEvents、 contributes などの VS Code 固有のフィールドが混在しています。VS Code固有のフィールドの説明は、Extension Manifest Referenceに記載されています。ここでは、最も重要なフィールドをいくつか紹介します。

- という名前とパブリッシャーがあります。VS Codeは<publisher>.<name>を拡張機能の一意のIDとして使用します。例えば、Hello Worldサンプルは、vscode-samples.helloworld-sampleというIDを持っています。VS CodeはこのIDを使って、拡張機能を一意に識別します。
- main:拡張機能のエントリポイントです。
- activationEventsとcontributes。アクティベーション・イベントとコントリビューション・ポイント。
- engines.vscode。拡張機能が依存する VS Code API の最小バージョンを指定します。

```json
{
  "name": "helloworld-sample",
  "displayName": "helloworld-sample",
  "description": "HelloWorld example for VS Code",
  "version": "0.0.1",
  "publisher": "vscode-samples",
  "repository": "https://github.com/microsoft/vscode-extension-samples/helloworld-sample",
  "engines": {
    "vscode": "^1.51.0"
  },
  "categories": ["Other"],
  "activationEvents": ["onCommand:helloworld.helloWorld"],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "helloworld.helloWorld",
        "title": "Hello World"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./"
  },
  "devDependencies": {
    "@types/node": "^8.10.25",
    "@types/vscode": "^1.51.0",
    "tslint": "^5.16.0",
    "typescript": "^3.4.5"
  }
}
```

## エクステンション エントリーファイル

activate は、登録された Activation Event が発生したときに実行されます。多くのエクステンションでは、明示的なクリーンアップは必要ないかもしれないので、deactivate メソッドは削除することができます。しかし、VS Code がシャットダウンするときや、拡張機能が無効またはアンインストールされるときに、拡張機能が操作を実行する必要がある場合、このメソッドが使用されます。

VS Codeの拡張機能APIは、@types/vscodeの型定義で宣言されています。vscode型定義のバージョンは、package.jsonのengines.vscodeフィールドの値で制御されます。vscode型は、インテリセンスやGo to DefinitionなどのTypeScript言語の機能をコードに付与するものです。

```ts
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "helloworld-sample" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
```