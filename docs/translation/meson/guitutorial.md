## シンプルなSDL2アプリをゼロから作る

このページでは、Meson だけを使用して SDL2 GUI アプリケーションを定義し構築する方法を一から説明します。このドキュメントは、最も複雑なプラットフォームである Windows 用に書かれていますが、Linux や macOS でも同じ基本的な考え方が通用するはずです。

SDL 2 も C で書かれているため、サンプルアプリケーションはプレーン C で書かれています。もし C++ が好きなら、変換は非常に簡単なので、読者の練習問題として残しておきます。

このドキュメントは、Visual Studio と Meson の両方がすでにインストールされていることを前提にしています。

## ビルドディレクトリの設定

まず、すべてのものを格納する空のディレクトリを作成する必要があります。Visual Studioのツールチェーンは少し変わっていて、特定のシェルからビルドを実行する必要があります。これは、アプリケーションメニューを開き、`Visual Studio <year> -> x86_64 native tools` コマンドプロンプトを選択することで見つけることができます。

変なディレクトリに移動してしまうので、ホームディレクトリに移動する必要があります。

```
cd \users\yourusername
```

通常、`cd \users` と入力し、tabulator キーを押してユーザー名をシェルに自動補完させます。これが完了したら、ディレクトリを作成できます。

```
mkdir sdldemo
cd sdldemo
```

## Creating the sample program

ここで、ソースファイルと Meson ビルド定義ファイルを作成する必要があります。ここでは SDL をまったく使用せず、テキストを表示するだけの簡単なプログラムから始めます。一度動作させれば、グラフィックを行うように拡張できます。ソースは `sdlprog.c` というファイルに入っており、次のような内容になっています。

```c
#include <stdio.h>

int main(int argc, char **argv) {
  printf("App is running.\n");
  return 0;
}
```

ビルドの定義はmeson.buildというファイルに入っていて、以下のような感じになっています。

```
project('sdldemo', 'c')

executable('sdlprog', 'sdlprog.c')
```

これで、次のコマンドでビルドを開始することができます。

```
meson setup builddir
```

ここで`builddir`はビルドディレクトリで、ビルド中に生成されるものは全てこのディレクトリに置かれます。実行すると、次のようになります。

サンプルアプリケーションの設定

プログラムはこれでコンパイルされます。

```
meson compile -C builddir
```

C 引数は、設定されたビルドディレクトリがどこにあるかを Meson に知らせます。

プログラムはビルドディレクトリに置かれ、次のように実行することができます。

```
builddir\sdlprog
```

このように出力されるはずです。

サンプルアプリケーションの実行

## SDLを使用するためにプログラムをアップグレードする

SDLを起動するために必要なコードは少し複雑なので、その仕組みについては割愛します。単に`sdlprog.c`の内容を次のように置き換えるだけです。

```c
#include "SDL.h"

int main(int argc, char *argv[])
{
    SDL_Window *window;
    SDL_Renderer *renderer;
    SDL_Surface *surface;
    SDL_Event event;

    if (SDL_Init(SDL_INIT_VIDEO) < 0) {
        SDL_LogError(SDL_LOG_CATEGORY_APPLICATION, "Couldn't initialize SDL: %s", SDL_GetError());
        return 3;
    }

    if (SDL_CreateWindowAndRenderer(320, 240, SDL_WINDOW_RESIZABLE, &window, &renderer)) {
        SDL_LogError(SDL_LOG_CATEGORY_APPLICATION, "Couldn't create window and renderer: %s", SDL_GetError());
        return 3;
    }

    while (1) {
        SDL_PollEvent(&event);
        if (event.type == SDL_QUIT) {
            break;
        }
        SDL_SetRenderDrawColor(renderer, 0x00, 0x00, 0x00, 0x00);
        SDL_RenderClear(renderer);
        SDL_RenderPresent(renderer);
    }

    SDL_DestroyRenderer(renderer);
    SDL_DestroyWindow(window);

    SDL_Quit();

    return 0;
}
```

もう一度、meson compile -C builddirを実行して、これをコンパイルしてみましょう。

SDLアプリのビルドに失敗しました

失敗しました。この理由は、実はSDLが現在利用できないからです。何らかの方法で入手する必要があります。専門用語では SDL2 は外部依存であり、それを取得することを依存関係の解決と呼びます。

Meson には、WrapDB と呼ばれる依存関係をダウンロードして (必要なら) 構築するための Web サービスがあります。これは SDL2 を提供するので、それを直接使用することができます。まず最初に subprojects ディレクトリを作成する必要があります。Meson では一貫性を保つために、このようなサブプロジェクトはすべてこのディレクトリに保存する必要があるからです。

```
mkdir subprojects
```

そして、依存関係をインストールすることができます。

```
meson wrap install sdl2
```

こんな感じです。

WrapDB から SDL2 を取得する。

最後のステップとして、新しく取得した依存関係を使用するためにビルド定義ファイルを更新する必要があります。

```
project('sdldemo', 'c',
        default_options: 'default_library=static')

sdl2_dep = dependency('sdl2')

executable('sdlprog', 'sdlprog.c',
           win_subsystem: 'windows',
           dependencies: sdl2_dep)
```

依存関係に加え、他にもいくつかの変更があります。まず、ヘルパーライブラリを静的にビルドするように指定しています。このような単純なプロジェクトでは、これによって物事がよりシンプルになります。また、構築するプログラムがコンソールアプリケーションではなく、Windows GUI アプリケーションであることを Meson に伝える必要があります。

これだけで、再び meson compile を実行できるようになります。まず、システムは SDL2 をダウンロードし、設定します。

サンプルアプリケーションの実行

少しして、コンパイルが正常に終了しました。

サンプルアプリケーションの実行

## プログラム終了

これで、アプリケーションを

```
builddir\sdlprog
```

最終的には、黒いSDLウィンドウが表示されます。

サンプルアプリケーションを実行する

