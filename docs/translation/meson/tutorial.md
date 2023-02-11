# チュートリアル

このページでは、単純なプロジェクトの Meson ビルド定義を作成する方法を一から説明します。そして、それを拡張して外部の依存関係を使用し、いかに簡単にプロジェクトに統合できるかを紹介します。

このチュートリアルは、主に Linux での使用を想定して書かれています。システム上に GTK 開発ライブラリーがあることを想定しています。UbuntuのようなDebian由来のシステムでは、以下のコマンドでインストールすることができます。

```
sudo apt install libgtk-3-dev
```

WindowsやmacOSなど、他のプラットフォームでGUIアプリケーションを構築することも可能ですが、必要な依存関係をインストールする必要があります。

## 謙虚な始まり

最も基本的なプログラム、古典的なhelloの例から始めましょう。まず、ソースを格納するファイルmain.cを作成します。これは次のようなものです。

```c
#include <stdio.h>

//
// mainはすべてのプログラムの実行を開始する場所
//
int main(int argc, char **argv) {
  printf("Hello there.\n");
  return 0;
}
```

次に、Mesonのビルド記述を作成し、同じディレクトリのmeson.buildというファイルに記述します。その内容は以下の通りです。

```
project('tutorial', 'c')
executable('demo', 'main.c')
```

以上です。Autotoolsとは異なり、ソースヘッダをソースのリストに追加する必要はないことに注意してください。

これで、アプリケーションをビルドする準備ができました。まず、ソースディレクトリに移動して、以下のコマンドを実行して、ビルドを初期化する必要があります。

```
$ meson setup builddir
```

コンパイラの出力をすべて保持するために、別のビルドディレクトリを作成します。Meson は他のいくつかのビルドシステムと異なり、インソースビルドを許可していません。常に別のビルドディレクトリを作成する必要があります。一般的な慣例では、デフォルトのビルドディレクトリをトップレベルのソースディレクトリのサブディレクトリに配置します。

Mesonを実行すると、次のような出力が表示されます。

```
The Meson build system
 version: 0.13.0-research
Source dir: /home/jpakkane/mesontutorial
Build dir: /home/jpakkane/mesontutorial/builddir
Build type: native build
Project name is "tutorial".
Using native c compiler "ccache cc". (gcc 4.8.2)
Creating build target "demo" with 1 files.
```

これで、コードをビルドする準備ができました。

```
$ cd builddir
$ ninja
```

Meson のバージョンが 0.55.0 より新しい場合、新しい backend-agnostic ビルドコマンドを使用することができます。

```
$ cd builddir
$ meson compile
```

この文書では、後者の形式を使用します。

実行ファイルがビルドされたら、それを実行することができます。

```
$ ./demo
```

これにより、期待通りの出力が得られます。

```
Hello there.
```

## 依存関係の追加

テキストを印刷するだけでは少し古い。代わりにグラフィカルなウィンドウを作成するようにプログラムを更新してみましょう。GTK+ ウィジェットツールキットを使いましょう。まず、メインファイルを編集してGTK+を使うようにします。新しいバージョンは次のようなものです。

```c
#include <gtk/gtk.h>

//
// Should provided the active view for a GTK application
//
static void activate(GtkApplication* app, gpointer user_data)
{
  GtkWidget *window;
  GtkWidget *label;

  window = gtk_application_window_new (app);
  label = gtk_label_new("Hello GNOME!");
  gtk_container_add (GTK_CONTAINER (window), label);
  gtk_window_set_title(GTK_WINDOW (window), "Welcome to GNOME");
  gtk_window_set_default_size(GTK_WINDOW (window), 400, 200);
  gtk_widget_show_all(window);
} // end of function activate

//
// main is where all program execution starts
//
int main(int argc, char **argv)
{
  GtkApplication *app;
  int status;

  app = gtk_application_new(NULL, G_APPLICATION_FLAGS_NONE);
  g_signal_connect(app, "activate", G_CALLBACK(activate), NULL);
  status = g_application_run(G_APPLICATION(app), argc, argv);
  g_object_unref(app);

  return status;
} // end of function main
```

次に、Meson ファイルを編集して、GTK+ ライブラリを見つけて使用するように指示します。

```
project('tutorial', 'c')
gtkdep = dependency('gtk+-3.0')
executable('demo', 'main.c', dependencies : gtkdep)
```

アプリで複数のライブラリを使用する必要がある場合、以下のようにそれぞれ別のdependency()コールを使用する必要があります。

```
gtkdeps = [dependency('gtk+-3.0'), dependency('gtksourceview-3.0')]
```

今の例では必要ない。

これでビルドの準備ができました。ここで注目すべきは、ビルドディレクトリを再作成したり、魔法のようなコマンドを実行したりする必要がないことです。代わりに、ビルドシステムを変更せずに、コードを再構築するのと全く同じコマンドを入力するだけです。

```
$ meson compile
```

最初にビルド・ディレクトリを設定したら、もう二度とmesonコマンドを実行する必要はありません。いつも meson compile を実行するだけです。ビルド定義に変更があった場合、Mesonが自動的に検出し、ユーザーが気にしなくていいように、すべてを処理します。この場合、次のような出力が得られます。

```
[1/1] Regenerating build files
The Meson build system
 version: 0.13.0-research
Source dir: /home/jpakkane/mesontutorial
Build dir: /home/jpakkane/mesontutorial/builddir
Build type: native build
Project name is "tutorial".
Using native c compiler "ccache cc". (gcc 4.8.2)
Found pkg-config version 0.26.
Dependency gtk+-3.0 found: YES
Creating build target "demo" with 1 files.
[1/2] Compiling c object demo.dir/main.c.o
[2/2] Linking target demo
```

Mesonがビルド定義が変更されたことに気づき、自動的に再実行したことにご注目ください。これでプログラムを実行する準備ができました。

```
$ ./demo
```

これにより、以下のようなGUIアプリケーションが作成されます。

GTK+サンプルアプリケーションのスクリーンショット