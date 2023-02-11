# Natural Docsのセットアップ（日本語訳）

[原文](https://www.naturaldocs.org/getting_started/getting_set_up/)

## ダウンロードとインストール

最初に行う必要があるのはNatural Docsをダウンロードすることです。ここからダウンロードします。

[Download](https://www.naturaldocs.org/download)

### Windowsの説明

WindowsのNatural Docsには.NET 3.5以降が必要です。Windows 7以降を使用している場合は、すでにそれを使用しています。

Natural Docsはコマンドライン（コンソール）アプリケーションなので、開発環境とビルドプロセスに統合することができます。つまり、グラフィカルインターフェースはありません。コマンドラインアプリケーションに既に慣れている場合は、「新しいプロジェクトを開始する」まで読み進めることができます。そうでない場合はこの後のセクションを読みながら、この説明を手元に置いてください。

Natural Docsへのショートカットを作成することにより、アイコンからNatural Docsを実行することができます。デスクトップの空の部分を右クリックし、新規 > ショートカットを選択します。場所フィールドに引用符で囲んだNaturalDocs.exeのフルパスを入力し（例えば「C:¥Program Files (x86)¥Natural Docs¥NaturalDocs.exe 」）、引用符の外に必要なパラメータを入力します。どのパラメータを使用するかについては後に説明します。このような感じになります。

```
"C:¥Program Files (x86)¥Natural Docs¥Natural Docs¥NaturalDocs.exe" C:¥My Project¥ND Config --pause-before-exit
```

Nextをクリックし、名前を付けて、Finishをクリックします。これでダブルクリックできるアイコンができ、これらのパラメータで Natural Docsを実行することができます。変更する必要がある場合は、ショートカットを右クリックして、プロパティを選択し、ターゲットフィールドのパラメータを変更します。

Natural Docsをこの方法で実行する場合、パラメータリストに--pause-before-exitを常に追加して、コンソールウィンドウが自動的に閉じないようにしてステータスメッセージを見ることができるようにすることをお勧めします。すべてが思い通りに動作するようになったら、-pause-on-errorに変更し、問題がある場合にのみ開いたままにすることができます。

### macOSとLinuxの説明

Natural Docsは、macOSとLinuxで動作するためにMono 4.0以降が必要です。[ここからダウンロードしてください](http://www.mono-project.com/download)。

以下のすべての例では、コマンドラインの前に "mono" を追加し、Unixパスを使用することになります。

```
NaturalDocs.exe C:\My Project\ND Config
```

このように使用します。

```
mono NaturalDocs.exe /My Project/ND Config
```

Natural Docs はコマンドライン（ターミナル）アプリケーションなので、開発環境やビルドプロセスに統合することができます。つまり、グラフィカルインターフェースはありません。手動で実行する場合は、ターミナルウィンドウから実行する必要があります。

## 新規プロジェクトの開始

コードで既に古いバージョンのNatural Docsを使用している場合は、「1.x プロジェクトのアップグレード」に進んでください。

まず、2つのフォルダーを作成する必要があります。そのうちの1つは生成されたドキュメント用で、もう1つはNatural Docsの構成と作業データ用になります。後者はプロジェクト構成フォルダと呼ばれます。

プロジェクト構成フォルダをパラメータとしてNatural Docsを実行します。ちょうどこのようなものです。

```
NaturalDocs.exe C:\My Project\ND Config
```

すると、3つの設定ファイルが作成されるので、それを編集します。Comments.txtとLanguages.txtは今は気にする必要はなく、Project.txtだけが必要です。開いてみてください。

すべての設定ファイルにはオプションの説明が含まれているので、覚える必要はありません。プロジェクト情報のセクションが最初に表示されるので、プロジェクトの名前を書いたタイトル行を追加してください。

```
Title: My Project
```

次にSource Codeセクションまでスクロールダウンします。ここでNatural Docsにスキャンするフォルダを指定します。Source Folder行にそれらを追加します。

```
Source Folder: C:\My Project\Source
```

複数持つこともできますが数が多い場合は、親フォルダを置き、代わりに不要なものを除外するオプションもあります。ソースフィルタリングのセクションまでスクロールすれば、その方法がわかります。

次に、Generated Documentationセクションまでスクロールし、HTML Output Folder行を追加して、Natural Docsにその場所を知らせます。

```
HTML Output Folder: C:\My Project\Documentation
```

これだけです。これでコマンドラインでプロジェクト構成フォルダ名を指定してNatural Docsを実行するたびに、これらのフォルダを検索してコードを探し、そのためのドキュメントを構築します。

```
NaturalDocs.exe C:\My Project\ND Config
```

もし、あなたが使っている言語が完全にサポートされていれば、すぐに使えるドキュメントを得ることができます。基本的なサポートしかない場合は、コードを文書化するまで出力に何も表示されないでしょう。

## 1.xプロジェクトのアップグレード

コードで既に Natural Docs 1.x を使用している場合、アップグレードは簡単です。まず、古いファイルが混ざらないようにドキュメントフォルダの中身を削除します。また、プロジェクト構成フォルダのDataフォルダを削除します。このフォルダには.ndファイルだけが含まれているはずで、プロジェクト構成フォルダ内の.txtファイルは削除しないでください。

あとは、新しいバージョンを以前と同じコマンドラインで実行するだけです。このようなことは、今でも有効です。

```
NaturalDocs.exe -i c:\My Project\Source
                -p c:\My Project\ND Config
                -o HTML C:\My Project\Documentation
```

これで終わりです。今後、コマンドラインを使用し続けるか、Project.txt を使用するように切り替えることができます。これはプロジェクト構成フォルダ内のファイルで、以前はコマンドラインで行っていたすべての設定を保存するため、将来はこの方法でNatural Docsを実行できます。

```
NaturalDocs.exe c:\My Project\ND Config
```

コマンドラインでプロジェクトの設定フォルダを指定するだけで、もう-pは必要ありません。変更を加えるにはProject.txtを編集するだけです。また、プロジェクトのタイトルや著作権など、いくつかの設定をMenu.txtからコピーしています。Menu.txtはもう使われないので、初回実行後に削除してもかまいません。Topics.txtも同様で、その設定は初回実行時にComments.txtにコピーされ、今後使用されることはないでしょう。