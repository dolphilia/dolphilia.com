# はじめてのエクステンション

このトピックでは、拡張機能を構築するための基本的な概念をお教えします。Node.jsとGitがインストールされていることを確認し、YeomanとVS Code Extension Generatorを一緒にインストールします。

```sh
npm install -g yo generator-code
```

このジェネレータは、TypeScriptまたはJavaScriptのプロジェクトを開発するための足場となるものです。ジェネレータを実行し、TypeScriptプロジェクト用のいくつかのフィールドを埋めてください。

```sh
yo code

# ? What type of extension do you want to create? New Extension (TypeScript)
# ? What's the name of your extension? HelloWorld
### Press <Enter> to choose default for all options below ###

# ? What's the identifier of your extension? helloworld
# ? What's the description of your extension? LEAVE BLANK
# ? Initialize a git repository? Yes
# ? Bundle the source code with webpack? No
# ? Which package manager to use? npm

# ? Do you want to open the new folder with Visual Studio Code? Open with `code`

```

次に、エディタ内でF5キーを押します。これで拡張機能がコンパイルされ、新しいExtension Development Hostウィンドウで実行されます。

新しいウィンドウのCommand Palette (⇧⌘P)からHello Worldコマンドを実行します。

HelloWorldからのHello World！の通知が表示されるはずです。成功です

## エクステンションの開発

メッセージに変更を加えよう。

1. extension.ts でメッセージを "Hello World from HelloWorld!" から "Hello VS Code" に変更します。
2. Developerを実行します。新しいウィンドウでウィンドウを再読み込みします。
3. 再びHello Worldコマンドを実行します。

更新されたメッセージが表示されるはずです。

以下は、あなたが試すべきいくつかのアイデアです。

- コマンドパレットにあるHello Worldコマンドに新しい名前をつけてください。
- 情報メッセージに現在時刻を表示する別のコマンドを提供する。コントリビューション ポイントとは、コマンド、メニュー、キーバインドを拡張するために package.json Extension Manifest で行う静的な宣言のことです。
- vscode.window.showInformationMessage を他の VS Code API 呼び出しに置き換えて、警告メッセージを表示させます。

## エクステンションのデバッグ

VS Codeに搭載されたデバッグ機能により、拡張機能のデバッグが簡単に行えます。行の横にあるガッターをクリックしてブレークポイントを設定すると、VS Codeがブレークポイントをヒットします。エディタ内の変数にカーソルを合わせたり、左の「実行とデバッグ」ビューを使って、変数の値を確認することができます。デバッグコンソールでは、式を評価することができます。


VS Code での Node.js アプリのデバッグについては、Node.js デバッグトピックで詳しく説明されています。

## 次のステップ

次のトピック「拡張機能解剖」では、Hello Worldサンプルのソースコードを詳しく見て、重要な概念を説明します。

このチュートリアルのソースコードは、https://github.com/microsoft/vscode-extension-samples/tree/main/helloworld-sample で見ることができます。Extension Guides トピックには、他のサンプルも含まれており、それぞれが異なる VS Code API や Contribution Point を説明し、UX ガイドラインの推奨事項に従っています。

### JavaScriptの使用

このガイドでは、主にTypeScriptでVS Code拡張を開発する方法を説明します。なぜなら、TypeScriptはVS Code拡張の開発において最高の体験を提供すると信じているからです。しかし、もしあなたがJavaScriptを好むのであれば、helloworld-minimal-sampleを使用してフォローすることができます。

### UXガイドライン

また、この機会にUXガイドラインを確認し、VS Codeのベストプラクティスに従った拡張機能のユーザーインターフェイスの設計を始めるのもよいでしょう。