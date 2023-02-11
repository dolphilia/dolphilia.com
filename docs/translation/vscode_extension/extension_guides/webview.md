# Webview API

webview APIにより、拡張機能はVisual Studio Code内で完全にカスタマイズ可能なビューを作成することができます。例えば、組み込みの Markdown 拡張機能は Markdown プレビューをレンダリングするために webview を使用します。Webview はまた、VS Code のネイティブ API がサポートする以上の複雑なユーザーインターフェイスを構築するために使用することができます。

webviewはVS Codeの中で拡張機能がコントロールする`iframe`と考えることができます。webview はほとんどすべての HTML コンテンツをこのフレームにレンダリングすることができ、メッセージパッシングを使って拡張機能と通信を行います。この自由度は、webview を信じられないほど強力にし、拡張機能の全く新しい可能性を切り開くものです。

WebviewはVS CodeのいくつかのAPIで使用されています。

- createWebviewPanel` を使用して作成された Webview パネルを使用します。この場合、Webview パネルは VS Code の中で個別のエディタとして表示されます。このため、カスタムUIやカスタムビジュアライゼーションを表示するのに便利です。
- カスタムエディタ](/api/extension-guides/custom-editors)のためのビューとして。カスタムエディタにより、エクステンションはワークスペース内の任意のファイルを編集するためのカスタムUIを提供することができます。カスタムエディタAPIは、保存などのファイルイベントと同様に、アンドゥやリドゥなどのエディタイベントにもフックすることができます。
- サイドバーやパネル領域でレンダリングされる [Webview views](/api/references/vscode-api#WebviewView) で使用されます。詳しくは[webview view sample extension](https://github.com/microsoft/vscode-extension-samples/tree/main/webview-view-sample)を参照してください。

このページは基本的なwebviewパネルAPIに焦点を当てていますが、ここでカバーされているほとんど全てのことは、カスタムエディタとwebviewビューで使用されるwebviewにも当てはまります。これらの API に興味がある場合でも、まずこのページを読んで Webview の基本に慣れることをおすすめします。

## Links

- [Webview sample](https://github.com/microsoft/vscode-extension-samples/blob/main/webview-sample/README.md)
- [Custom Editors documentation](/api/extension-guides/custom-editors)
- [Webview View sample](https://github.com/microsoft/vscode-extension-samples/tree/main/webview-view-sample)

### VS Code API Usage

- [`window.createWebviewPanel`](/api/references/vscode-api#window.createWebviewPanel)
- [`window.registerWebviewPanelSerializer`](/api/references/vscode-api#window.registerWebviewPanelSerializer)

## webviewを使用した方が良いですか？

Webviewはかなり素晴らしいものですが、VS CodeのネイティブAPIが不十分な場合にのみ、控えめに使用すべきものでもあります。Webビューはリソースが重く、通常の拡張機能とは別のコンテキストで実行されます。また、デザインの悪いWebviewは、VS Codeの中で簡単に場違いな存在に感じてしまいます。

Webviewを使用する前に、以下のことを考慮してください。

- この機能は本当にVS Codeの中に置く必要があるのか？別のアプリケーションやWebサイトとして使用した方が良いのか？

- その機能を実装するには、webview が唯一の方法なのか？代わりに通常のVS CodeのAPIを使用できますか？

- WebView は、その高いリソースコストを正当化するのに十分なユーザー価値を付加しますか？

覚えておいてください。WebView を使って何かできるからといって、それを使うべきとは限りません。しかし、もしあなたが WebView を使う必要があると確信しているのであれば、このドキュメントが役に立ちます。さっそく始めてみましょう。

## Webviews API の基本

Webview API を説明するために、**Cat Coding** というシンプルな拡張機能を構築する予定です。この拡張機能では、Webview を使用して、猫がコードを書いている GIF を表示します (おそらく VS Code で書かれているものと思われます)。API を使いながら、猫が書いたソースコードの行数を記録するカウンターや、猫がバグを紹介したときにユーザーに知らせる通知機能など、拡張機能の追加を続けていきます。

以下は、最初のバージョンの **Cat Coding** エクステンションの `package.json` です。サンプルアプリの完全なコードは[こちら](https://github.com/microsoft/vscode-extension-samples/blob/main/webview-sample/README.md)で確認できます。私たちの拡張機能の最初のバージョンは、`catCoding.start`というコマンド](/api/references/contribution points#contributes.commands) を投稿しています。ユーザがこのコマンドを呼び出すと、私たちの猫が描かれたシンプルなウェブビューが表示されます。ユーザーはこのコマンドを **Command Palette** から **Cat Coding.Start new cat coding** として呼び出すことができます。Start new cat coding session** として、**Command Palette** から呼び出すこともできますし、その気になればキーバインドを作成することもできます。

```json
{
  "name": "cat-coding",
  "description": "Cat Coding",
  "version": "0.0.1",
  "publisher": "bierner",
  "engines": {
    "vscode": "^1.23.0"
  },
  "activationEvents": ["onCommand:catCoding.start"],
  "main": "./out/src/extension",
  "contributes": {
    "commands": [
      {
        "command": "catCoding.start",
        "title": "Start new cat coding session",
        "category": "Cat Coding"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "tsc -p ./",
    "compile": "tsc -watch -p ./",
    "postinstall": "node ./node_modules/vscode/bin/install"
  },
  "dependencies": {
    "vscode": "*"
  },
  "devDependencies": {
    "@types/node": "^9.4.6",
    "typescript": "^2.8.3"
  }
}
```

では、`catCoding.start`コマンドを実装してみましょう。この拡張機能のメインファイルでは、`catCoding.start`コマンドを登録して、基本的なWebビューを表示するために使用します。

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      // Create and show a new webview
      const panel = vscode.window.createWebviewPanel(
        'catCoding', // Identifies the type of the webview. Used internally
        'Cat Coding', // Title of the panel displayed to the user
        vscode.ViewColumn.One, // Editor column to show the new webview panel in.
        {} // Webview options. More on these later.
      );
    })
  );
}
```

`vscode.window.createWebviewPanel` 関数はエディタにウェブビューを作成し表示します。現在の状態で`catCoding.start`コマンドを実行してみると、次のような表示になります。

![空のウェブビュー](images/webview/basics-no-content.png)

このコマンドは正しいタイトルの新しいウェブビューパネルを開きますが、コンテンツはありません!新しいパネルに私たちの猫を追加するには、`webview.html`を使用してWebviewのHTMLコンテンツを設定する必要があります。

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      // Create and show panel
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      // And set its HTML content
      panel.webview.html = getWebviewContent();
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
</body>
</html>`;
}
```

もう一度コマンドを実行すると、今度はWebviewがこのように表示されます。

![HTMLを含むウェブビュー](images/webview/basics-html.png)

進捗状況

`webview.html` は常に完全な HTML ドキュメントであるべきです。HTMLの断片や不正なHTMLは予期せぬ動作を引き起こす可能性があります。

### ウェブビューの内容を更新する

`webview.html` は、作成後のウェブビューのコンテンツを更新することもできます。これを利用して、猫の回転を導入することで、**猫コーデ**をよりダイナミックなものにしましょう。

```ts
import * as vscode from 'vscode';

const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      let iteration = 0;
      const updateWebview = () => {
        const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
        panel.title = cat;
        panel.webview.html = getWebviewContent(cat);
      };

      // Set initial content
      updateWebview();

      // And schedule updates to the content every second
      setInterval(updateWebview, 1000);
    })
  );
}

function getWebviewContent(cat: keyof typeof cats) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="${cats[cat]}" width="300" />
</body>
</html>`;
}
```

![Updating the webview content](images/webview/basics-update.gif)

webview.html` を設定すると、iframe を再読み込みするのと同じように、webview のコンテンツ全体が置き換えられます。webview.html`を設定すると、スクリプトの状態もリセットされることになるので、webviewでスクリプトを使い始めたら、このことを覚えておくことが重要です。

上記の例では、エディタに表示されるドキュメントのタイトルを変更するために `webview.title` も使用しています。タイトルを設定しても、webviewがリロードされることはありません。

### ライフサイクル

ウェブビューパネルはそれを作成した拡張機能によって所有されます。拡張機能は `createWebviewPanel` から返された Webview を保持する必要があります。拡張機能がこの参照を失うと、VS Code で Webview が表示され続けても、その Webview へのアクセスを再び取り戻すことはできません。

テキストエディタと同様に、ユーザはいつでも webview パネルを閉じることができます。Webビューパネルがユーザーによって閉じられると、Webビュー自体が破壊されます。破壊された webview を使用しようとすると、例外が発生します。つまり、上記の `setInterval` を使用した例には重要なバグがあります。ユーザーがパネルを閉じた場合、 `setInterval` は起動し続け、 `panel.webview.html` を更新しようとし、もちろん例外がスローされます。猫は例外を嫌います。これを解決しましょう

onDidDispose` イベントは、webview が破棄されたときに発生します。このイベントを使用して、それ以降の更新をキャンセルし、Webview のリソースをクリーンアップすることができます。

```ts
import * as vscode from 'vscode';

const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      let iteration = 0;
      const updateWebview = () => {
        const cat = iteration++ % 2 ? 'Compiling Cat' : 'Coding Cat';
        panel.title = cat;
        panel.webview.html = getWebviewContent(cat);
      };

      updateWebview();
      const interval = setInterval(updateWebview, 1000);

      panel.onDidDispose(
        () => {
          // When the panel is closed, cancel any future updates to the webview content
          clearInterval(interval);
        },
        null,
        context.subscriptions
      );
    })
  );
}
```

拡張機能では、`dispose()` を呼び出すことで、プログラム的に WebView を閉じることもできます。例えば、猫の出勤時間を5秒に制限したい場合。

```ts
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      panel.webview.html = getWebviewContent(cats['Coding Cat']);

      // After 5sec, programmatically close the webview panel
      const timeout = setTimeout(() => panel.dispose(), 5000);

      panel.onDidDispose(
        () => {
          // Handle user closing panel before the 5sec have passed
          clearTimeout(timeout);
        },
        null,
        context.subscriptions
      );
    })
  );
}
```

### 視認性と移動

WebView パネルを背景タブに移動すると、非表示になります。しかし、パネルが破壊されるわけではありません。VS Codeは、パネルが再びフォアグラウンドになったとき、自動的に`webview.html`からwebviewのコンテンツを復元します。

![Webview が再び表示されるようになると、Webview のコンテンツは自動的に復元されます](images/webview/basics-restore.gif)

`.visible` プロパティは、webview パネルが現在表示されているかどうかを示します。

拡張機能は `reveal()` を呼び出すことで、プログラム的に webview パネルをフォアグラウンドにすることができます。このメソッドはパネルを表示するためのターゲットビューカラムをオプションで受け取ります。webview パネルは一度に一つのエディタカラムにしか表示されないかもしれません。reveal()` を呼び出すか、webview パネルを新しいエディタカラムにドラッグすると、webview はその新しいカラムに移動します。

![タブ間でドラッグするとウェブビューが移動します](images/webview/basics-drag.gif)

一度に 1 つのウェブビューしか存在できないように、拡張機能を更新してみましょう。パネルがバックグラウンドにある場合、`catCoding.start`コマンドでフォアグラウンドにすることができます。

```ts
export function activate(context: vscode.ExtensionContext) {
  // Track currently webview panel
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const columnToShowIn = vscode.window.activeTextEditor
        ? vscode.window.activeTextEditor.viewColumn
        : undefined;

      if (currentPanel) {
        // If we already have a panel, show it in the target column
        currentPanel.reveal(columnToShowIn);
      } else {
        // Otherwise, create a new panel
        currentPanel = vscode.window.createWebviewPanel(
          'catCoding',
          'Cat Coding',
          columnToShowIn,
          {}
        );
        currentPanel.webview.html = getWebviewContent('Coding Cat');

        // Reset when the current panel is closed
        currentPanel.onDidDispose(
          () => {
            currentPanel = undefined;
          },
          null,
          context.subscriptions
        );
      }
    })
  );
}
```

新しいエクステンションの動作は以下の通りです。

![シングルパネルと公開を使用](images/webview/basics-single_panel.gif)

ウェブビューの可視性が変化したとき、またはウェブビューが新しいカラムに移動したときはいつでも、`onDidChangeViewState`イベントが発生します。私たちのエクステンションはこのイベントを使用して、ウェブビューがどのカラムに表示されているかに基づいて猫を変更することができます。

```ts
const cats = {
  'Coding Cat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
  'Compiling Cat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif',
  'Testing Cat': 'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif'
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );
      panel.webview.html = getWebviewContent('Coding Cat');

      // Update contents based on view state changes
      panel.onDidChangeViewState(
        e => {
          const panel = e.webviewPanel;
          switch (panel.viewColumn) {
            case vscode.ViewColumn.One:
              updateWebviewForCat(panel, 'Coding Cat');
              return;

            case vscode.ViewColumn.Two:
              updateWebviewForCat(panel, 'Compiling Cat');
              return;

            case vscode.ViewColumn.Three:
              updateWebviewForCat(panel, 'Testing Cat');
              return;
          }
        },
        null,
        context.subscriptions
      );
    })
  );
}

function updateWebviewForCat(panel: vscode.WebviewPanel, catName: keyof typeof cats) {
  panel.title = catName;
  panel.webview.html = getWebviewContent(catName);
}
```

![Responding to onDidChangeViewState events](images/webview/basics-ondidchangeviewstate.gif)

### WebViewの検査とデバッグ

デベロッパーToggle Developer Tools** コマンドは [Developer Tools](https://developer.chrome.com/docs/devtools/) ウィンドウを開き、WebView のデバッグや検査に使用できます。

![デベロッパーツールを参照してください。](images/webview/developer-overview.png)

VS Code 1.56 より古いバージョンを使用している場合、または `enableFindWidget` を設定している WebView をデバッグしようとしている場合、代わりに **Developer.Open Webview Developer Tools** コマンドを使用しなければならないことに注意してください。Webview Developer Tools** コマンドを使用してください。このコマンドは、すべてのウェブビューとエディタ自体で共有される Developer Tools ページを使用する代わりに、各ウェブビュー専用の Developer Tools ページを開くものです。

デベロッパーツールから、デベロッパーツールのウィンドウの左上にある inspect ツールを使用して、ウェブビューの内容を検査することができます。

![デベロッパーツールを使ってウェブビューを検査する](images/webview/developer-inspect.png)

また、デベロッパーツールのコンソールで、ウェブビューのエラーやログをすべて表示することができます。

![デベロッパーツールのコンソール](images/webview/developer-console.png)

ウェブビューのコンテキストで式を評価するには、デベロッパーツールのコンソールパネルの左上隅にあるドロップダウンから **アクティブフレーム** 環境を選択することを確認してください。

![アクティブフレームを選択する](images/webview/developer-active-frame.png)

アクティブフレーム**環境は、webview スクリプト自体が実行される場所です。

また、**Developer:Reload Webview** コマンドは、すべてのアクティブなWebビューを再読み込みします。これは、webview の状態をリセットする必要がある場合や、ディスク上の webview のコンテンツが変更され、新しいコンテンツをロードする場合に便利です。

## ローカルコンテンツの読み込み

WebView は、ローカルリソースに直接アクセスできない孤立したコンテキストで実行されます。これはセキュリティ上の理由からです。つまり、拡張機能から画像やスタイルシートなどのリソースを読み込んだり、ユーザーの現在のワークスペースからコンテンツを読み込むには、 `Webview.asWebviewUri` 関数を使用してローカルの `file:` URI を VS Code がローカルリソースのサブセットを読み込むために使用する特別な URI に変換しなければなりません。

Giphyから取得するのではなく、猫のGIFを拡張機能にバンドルすることを想像してください。これを行うには、まずディスク上のファイルへのURIを作成し、そのURIを `asWebviewUri` 関数に渡します。

```ts
import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {}
      );

      // Get path to resource on disk
      const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, 'media', 'cat.gif')
      );

      // And get the special URI to use with the webview
      const catGifSrc = panel.webview.asWebviewUri(onDiskPath);

      panel.webview.html = getWebviewContent(catGifSrc);
    })
  );
}
```

このコードをデバッグすると、`catGifSrc`の実際の値は次のようなものであることがわかるでしょう。

```
vscode-resource:/Users/toonces/projects/vscode-cat-coding/media/cat.gif
```

VS Codeはこの特別なURIを理解し、ディスクからgifを読み込むために使用します。

デフォルトでは、WebViewは以下の場所にあるリソースにしかアクセスできません。

- 拡張機能のインストールディレクトリ内
- ユーザーの現在アクティブなワークスペース内。

追加のローカルリソースへのアクセスを許可するには、 `WebviewOptions.localResourceRoots` を使用します。

また、常にデータ URI を使用して、Webview 内に直接リソースを埋め込むことができます。

### ローカルリソースへのアクセス制御

Webview は `localResourceRoots` オプションを使用して、ユーザーのマシンから読み込むことができるリソースを制御することができます。localResourceRoots` はローカルのコンテンツを読み込むためのルート URI のセットを定義します。

私たちは `localResourceRoots` を使って、 **Cat Coding** ウェブビューが拡張機能の `media` ディレクトリにあるリソースのみを読み込むように制限することができます。

```ts
import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          // Only allow the webview to access resources in our extension's media directory
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, 'media'))
          ]
        }
      );

      const onDiskPath = vscode.Uri.file(
        path.join(context.extensionPath, 'media', 'cat.gif')
      );
      const catGifSrc = panel.webview.asWebviewUri(onDiskPath);

      panel.webview.html = getWebviewContent(catGifSrc);
    })
  );
}
```

すべてのローカルリソースを無効にするには、`localResourceRoots`を `[]` に設定するだけです。

一般的に、WebView はローカルリソースの読み込みをできるだけ制限する必要があります。しかし、 `localResourceRoots` はそれ自体では完全なセキュリティ保護にはならないことに注意してください。webview が [セキュリティのベストプラクティス](#security) に従っていることを確認し、さらにロードできるコンテンツを制限するために [コンテンツセキュリティポリシー](#content-security-policy) を追加してください。

### ウェブビューコンテンツのテーミング

Webview は CSS を使って、VS Code の現在のテーマに基づいて外観を変更することができます。VS Code はテーマを3つのカテゴリにグループ分けし、現在のテーマを示す特別なクラスを `body` 要素に追加します。

- `vscode-light` - ライトなテーマです。
- `vscode-dark` - ダークなテーマです。
- `vscode-high-contrast` - ハイコントラストテーマ。

以下のCSSは、ユーザーの現在のテーマに基づいて、ウェブビューのテキスト色を変更します。

```css
body.vscode-light {
  color: black;
}

body.vscode-dark {
  color: white;
}

body.vscode-high-contrast {
  color: red;
}
```

ウェブビューアプリケーションを開発する際には、3種類のテーマで動作することを確認してください。また、視覚障がい者が使用できるように、常にハイコントラストモードでウェブビューをテストしてください。

ウェブビューは、[CSS 変数](https://developer.mozilla.org/docs/Web/CSS/Using_CSS_variables) を使用して VS Code のテーマカラーにアクセスすることもできます。これらの変数名はプレフィックスとして `vscode` が付き、 `.` を `-` に置き換えたものです。例えば、 `editor.foreground` は `var(--vscode-editor-foreground)` となります。

```css
code {
  color: var(--vscode-editor-foreground);
}
```

[テーマカラーリファレンス](/api/references/theme-color)を参照して、利用可能なテーマ変数を確認してください。[拡張機能](https://marketplace.visualstudio.com/items?itemName=connor4312.css-theme-completions)を使用すると、変数に対するインテリセンス候補を表示することができます。

また、以下のフォント関連の変数も定義されています。

- `vscode-editor-font-family` - エディタのフォントファミリー (`editor.fontFamily` 設定による).
- `--vscode-editor-font-weight` - エディタフォントの太さ (`editor.fontWeight` 設定に基づく).
- `--vscode-editor-font-size` - エディタのフォントサイズ (`editor.fontSize` 設定による)。

最後に、特定のテーマをターゲットとした CSS を記述する必要がある場合のために、webview の body 要素には `vscode-theme-id` というデータ属性があり、現在アクティブなテーマの ID が格納されます。これにより、webview にテーマ固有の CSS を記述することができます。

```css
body[data-vscode-theme-id="One Dark Pro"] {
    background: hotpink;
}
```

### 対応メディアフォーマット

WebViewはオーディオとビデオをサポートしていますが、すべてのメディアコーデックとメディアファイルコンテナタイプをサポートしているわけではありません。

Webviews で使用できる音声フォーマットは以下のとおりです。

- Wav
- Mp3
- Ogg
- Flac

ウェブビューで使用できる動画形式は以下の通りです。

- H.264
- VP8

ビデオファイルの場合、ビデオとオーディオトラックのメディアフォーマットの両方がサポートされていることを確認してください。例えば、多くの `.mp4` ファイルは、ビデオに `H.264` を使用し、オーディオに `AAC` を使用しています。VS Codeは`mp4`のビデオ部分を再生することができますが、`AAC`オーディオはサポートされていないため、音は出ません。代わりに、オーディオトラックには `mp3` を使用する必要があります。

## スクリプトとメッセージパッシング

WebView は iframe のようなもので、スクリプトを実行することもできます。WebView では JavaScript がデフォルトで無効になっていますが、`enableScripts: true` オプションを渡すことで簡単に再有効化することができます。

スクリプトを使って、猫が書いたソースコードの行数を追跡するカウンターを追加してみましょう。基本的なスクリプトを実行するのはとても簡単ですが、この例はあくまでデモンストレーションのためのものであることに注意してください。実際には、Webview は [content security policy](#content-security-policy) を使って常にインラインスクリプトを無効にする必要があります。

```ts
import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          // Enable scripts in the webview
          enableScripts: true
        }
      );

      panel.webview.html = getWebviewContent();
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        const counter = document.getElementById('lines-of-code-counter');

        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
        }, 100);
    </script>
</body>
</html>`;
}
```

![Webビューで動作するスクリプト](images/webview/scripts-basic.gif)

すごい！生産性の高い猫ですね。

ウェブビュースクリプトは、通常のウェブページ上のスクリプトができることなら、ほとんど何でもできます。しかし、ウェブビューは独自のコンテキストで存在するため、ウェブビューのスクリプトは VS Code API にアクセスできないことに注意してください。そこで、メッセージパッシングの出番です

### 拡張機能から webview へのメッセージの受け渡し

拡張機能は `webview.postMessage()` を使ってその webview にデータを送ることができます。このメソッドはシリアライズ可能な任意の JSON データを webview に送ります。メッセージは標準の `message` イベントを通して Webview 内で受信されます。

これを実証するために、現在コーディング中の猫にコードのリファクタリングを指示する（それによって総行数を減らす）新しいコマンドを **猫コーディング** に追加してみましょう。新しい `catCoding.doRefactor` コマンドは `postMessage` を使って現在のウェブビューに指示を送り、ウェブビュー内で `window.addEventListener('message', event => { ... })` を使ってメッセージを扱います。

```ts
export function activate(context: vscode.ExtensionContext) {
  // Only allow a single Cat Coder
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      if (currentPanel) {
        currentPanel.reveal(vscode.ViewColumn.One);
      } else {
        currentPanel = vscode.window.createWebviewPanel(
          'catCoding',
          'Cat Coding',
          vscode.ViewColumn.One,
          {
            enableScripts: true
          }
        );
        currentPanel.webview.html = getWebviewContent();
        currentPanel.onDidDispose(
          () => {
            currentPanel = undefined;
          },
          undefined,
          context.subscriptions
        );
      }
    })
  );

  // Our new command
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.doRefactor', () => {
      if (!currentPanel) {
        return;
      }

      // Send a message to our webview.
      // You can send any JSON serializable data.
      currentPanel.webview.postMessage({ command: 'refactor' });
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        const counter = document.getElementById('lines-of-code-counter');

        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
        }, 100);

        // Handle the message inside the webview
        window.addEventListener('message', event => {

            const message = event.data; // The JSON data our extension sent

            switch (message.command) {
                case 'refactor':
                    count = Math.ceil(count * 0.5);
                    counter.textContent = count;
                    break;
            }
        });
    </script>
</body>
</html>`;
}
```

![Passing messages to a webview](images/webview/scripts-extension_to_webview.gif)

### Webview から拡張機能へのメッセージの受け渡し

Webview は拡張モジュールにメッセージを返すこともできます。これは、Webview 内の特別な VS Code API オブジェクトの `postMessage` 関数を使用して実現されます。VS Code API オブジェクトにアクセスするには、Webview 内で `acquireVsCodeApi` を呼び出します。この関数は、セッションごとに一度だけ呼び出すことができます。このメソッドによって返された VS Code API のインスタンスを保持し、それを使用する必要がある他の関数に渡す必要があります。

VS Code API と `postMessage` を **Cat Coding** Webview で使用することで、猫がコードにバグを導入した際に拡張機能に警告を出すことができます。

```js
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          enableScripts: true
        }
      );

      panel.webview.html = getWebviewContent();

      // Handle messages from the webview
      panel.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case 'alert':
              vscode.window.showErrorMessage(message.text);
              return;
          }
        },
        undefined,
        context.subscriptions
      );
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        (function() {
            const vscode = acquireVsCodeApi();
            const counter = document.getElementById('lines-of-code-counter');

            let count = 0;
            setInterval(() => {
                counter.textContent = count++;

                // Alert the extension when our cat introduces a bug
                if (Math.random() < 0.001 * count) {
                    vscode.postMessage({
                        command: 'alert',
                        text: '🐛  on line ' + count
                    })
                }
            }, 100);
        }())
    </script>
</body>
</html>`;
}
```

![Passing messages from the webview to the main extension](images/webview/scripts-webview_to_extension.gif)

For security reasons, you must keep the VS Code API object private and make sure it is never leaked into the global scope.

### Using Web Workers

[Web Workers](https://developer.mozilla.org/docs/Web/API/Web_Workers_API/Using_web_workers) are supported inside of webviews but there are a few important restrictions to be aware of.

First off, workers can only be loaded using either a `data:` or `blob:` URI. You cannot directly load a worker from your extension's folder.

If you do need to load worker code from a JavaScript file in your extension, try using `fetch`:

```js
const workerSource = 'absolute/path/to/worker.js';

fetch(workerSource)
  .then(result => result.blob())
  .then(blob => {
    const blobUrl = URL.createObjectURL(blob)
    new Worker(blobUrl);
  });
```

Worker scripts also do not support importing source code using `importScripts` or `import(...)`. If your worker loads code dynamically, try using a bundler such as [webpack](https://webpack.js.org) to package the worker script into a single file.

With `webpack`, you can use `LimitChunkCountPlugin` to force the compiled worker JavaScript to be a single file:

```js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  target: 'webworker',
  entry: './worker/src/index.js',
  output: {
    filename: 'worker.js',
    path: path.resolve(__dirname, 'media'),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
```

## Security

As with any webpage, when creating a webview, you must follow some basic security best practices.

### Limit capabilities

A webview should have the minimum set of capabilities that it needs. For example, if your webview does not need to run scripts, do not set the `enableScripts: true`. If your webview does not need to load resources from the user's workspace, set `localResourceRoots` to `[vscode.Uri.file(extensionContext.extensionPath)]` or even `[]` to disallow access to all local resources.

### Content security policy

[Content security policies](https://developers.google.com/web/fundamentals/security/csp/) further restrict the content that can be loaded and executed in webviews. For example, a content security policy can make sure that only a list of allowed scripts can be run in the webview, or even tell the webview to only load images over `https`.

To add a content security policy, put a `<meta http-equiv="Content-Security-Policy">` directive at the top of the webview's `<head>`

```ts
function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <meta http-equiv="Content-Security-Policy" content="default-src 'none';">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Cat Coding</title>
</head>
<body>
    ...
</body>
</html>`;
}
```

The policy `default-src 'none';` disallows all content. We can then turn back on the minimal amount of content that our extension needs to function. Here's a content security policy that allows loading local scripts and stylesheets, and loading images over `https`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'none'; img-src ${webview.cspSource} https:; script-src ${webview.cspSource}; style-src ${webview.cspSource};"
/>
```

The `${webview.cspSource}` value is a placeholder for a value that comes from the webview object itself. See the [webview sample](https://github.com/microsoft/vscode-extension-samples/blob/main/webview-sample) for a complete example of how to use this value.

This content security policy also implicitly disables inline scripts and styles. It is a best practice to extract all inline styles and scripts to external files so that they can be properly loaded without relaxing the content security policy.

### Only load content over https

If your webview allows loading external resources, it is strongly recommended that you only allow these resources to be loaded over `https` and not over http. The example content security policy above already does this by only allowing images to be loaded over `https:`.

### Sanitize all user input

Just as you would for a normal webpage, when constructing the HTML for a webview, you must sanitize all user input. Failing to properly sanitize input can allow content injections, which may open your users up to a security risk.

Example values that must be sanitized:

- File contents.
- File and folder paths.
- User and workspace settings.

Consider using a helper library to construct your HTML strings, or at least ensure that all content from the user's workspace is properly sanitized.

Never rely on sanitization alone for security. Make sure to follow the other security best practices, such as having a [content security policy](#content-security-policy) to minimize the impact of any potential content injections.

## Persistence

In the standard webview [lifecycle](#lifecycle), webviews are created by `createWebviewPanel` and destroyed when the user closes them or when `.dispose()` is called. The contents of webviews however are created when the webview becomes visible and destroyed when the webview is moved into the background. Any state inside the webview will be lost when the webview is moved to a background tab.

The best way to solve this is to make your webview stateless. Use [message passing](#passing-messages-from-a-webview-to-an-extension) to save off the webview's state and then restore the state when the webview becomes visible again.

### getState and setState

Scripts running inside a webview can use the `getState` and `setState` methods to save off and restore a JSON serializable state object. This state is persisted even after the webview content itself is destroyed when a webview panel becomes hidden. The state is destroyed when the webview panel is destroyed.

```js
// Inside a webview script
const vscode = acquireVsCodeApi();

const counter = document.getElementById('lines-of-code-counter');

// Check if we have an old state to restore from
const previousState = vscode.getState();
let count = previousState ? previousState.count : 0;
counter.textContent = count;

setInterval(() => {
  counter.textContent = count++;
  // Update the saved state
  vscode.setState({ count });
}, 100);
```

`getState` and `setState` are the preferred way to persist state, as they have much lower performance overhead than `retainContextWhenHidden`.

### Serialization

By implementing a `WebviewPanelSerializer`, your webviews can be automatically restored when VS Code restarts. Serialization builds on `getState` and `setState`, and is only enabled if your extension registers a `WebviewPanelSerializer` for your webviews.

To make our coding cats persist across VS Code restarts, first add a `onWebviewPanel` activation event to the extension's `package.json`:

```json
"activationEvents": [
    ...,
    "onWebviewPanel:catCoding"
]
```

This activation event ensures that our extension will be activated whenever VS Code needs to restore a webview with the viewType: `catCoding`.

Then, in our extension's `activate` method, call `registerWebviewPanelSerializer` to register a new `WebviewPanelSerializer`. The `WebviewPanelSerializer` is responsible for restoring the contents of the webview from its persisted state. This state is the JSON blob that the webview contents set using `setState`.

```ts
export function activate(context: vscode.ExtensionContext) {
  // Normal setup...

  // And make sure we register a serializer for our webview type
  vscode.window.registerWebviewPanelSerializer('catCoding', new CatCodingSerializer());
}

class CatCodingSerializer implements vscode.WebviewPanelSerializer {
  async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
    // `state` is the state persisted using `setState` inside the webview
    console.log(`Got state: ${state}`);

    // Restore the content of our webview.
    //
    // Make sure we hold on to the `webviewPanel` passed in here and
    // also restore any event listeners we need on it.
    webviewPanel.webview.html = getWebviewContent();
  }
}
```

Now if you restart VS Code with a cat coding panel open, the panel will be automatically restored in the same editor position.

### retainContextWhenHidden

For webviews with very complex UI or state that cannot be quickly saved and restored, you can instead use the `retainContextWhenHidden` option. This option makes a webview keep its content around but in a hidden state, even when the webview itself is no longer in the foreground.

Although **Cat Coding** can hardly be said to have complex state, let's try enabling `retainContextWhenHidden` to see how the option changes a webview's behavior:

```ts
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('catCoding.start', () => {
      const panel = vscode.window.createWebviewPanel(
        'catCoding',
        'Cat Coding',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true
        }
      );
      panel.webview.html = getWebviewContent();
    })
  );
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" width="300" />
    <h1 id="lines-of-code-counter">0</h1>

    <script>
        const counter = document.getElementById('lines-of-code-counter');

        let count = 0;
        setInterval(() => {
            counter.textContent = count++;
        }, 100);
    </script>
</body>
</html>`;
}
```

![persistence retrain](images/webview/persistence-retrain.gif)

Notice how the counter does not reset now when the webview is hidden and then restored. No extra code required! With `retainContextWhenHidden`, the webview acts similarly to a background tab in a web browser. Scripts and other dynamic content are suspended, but immediately resumed once the webview becomes visible again. You cannot send messages to a hidden webview, even when `retainContextWhenHidden` is enabled.

Although `retainContextWhenHidden` may be appealing, keep in mind that this has high memory overhead and should only be used when other persistence techniques will not work.

## Accessibility

The class `vscode-using-screen-reader` will be added to your webview's main body in contexts where the user is operating VS Code with a screen reader. Additionally, the class `vscode-reduce-motion` will be added to the document's main body element in cases where the user has expressed a preference to reduce the amount of motion in the window. By observing these classes and adjusting your rendering accordingly, your webview content can better reflect the user's preferences.

## Next steps

If you'd like to learn more about VS Code extensibility, try these topics:

- [Extension API](/api) - Learn about the full VS Code Extension API.
- [Extension Capabilities](/api/extension-capabilities/overview) - Take a look at other ways to extend VS Code.
