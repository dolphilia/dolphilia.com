# GLFWのAPI紹介

[原文](https://www.glfw.org/docs/latest/intro_guide.html)

このガイドでは、GLFWの基本的な概念を紹介し、初期化、エラー処理、APIの保証と制限について説明します。広く、しかし浅いチュートリアルは、代わりに[Getting started](https://www.glfw.org/docs/latest/quick_guide.html)を参照してください。このカテゴリの特定の関数の詳細については、[初期化・バージョン・エラーのリファレンス](https://www.glfw.org/docs/latest/group__init.html)を参照してください。

また、GLFWの他のエリアのガイドもあります。

- [ウィンドウガイド](https://www.glfw.org/docs/latest/window_guide.html)
- [コンテキストガイド](https://www.glfw.org/docs/latest/context_guide.html)
- [Vulkanガイド](https://www.glfw.org/docs/latest/vulkan_guide.html)
- [モニターガイド](https://www.glfw.org/docs/latest/monitor_guide.html)
- [入力ガイド](https://www.glfw.org/docs/latest/input_guide.html)

## 初期化および終了

ほとんどのGLFW関数が呼ばれる前に、ライブラリは初期化されなければならない。この初期化では、マシンで利用可能な機能のチェック、モニタやジョイスティックの列挙、 タイマの初期化、プラットフォーム固有の必要な初期化などを行います。

ライブラリが正常に初期化される前に、以下の関数だけをメインスレッドから 呼び出すことができる。

- [glfwGetVersion](https://www.glfw.org/docs/latest/group__init.html#ga9f8ffaacf3c269cc48eafbf8b9b71197)
- [glfwGetVersionString](https://www.glfw.org/docs/latest/group__init.html#ga026abd003c8e6501981ab1662062f1c0)
- [glfwGetError](https://www.glfw.org/docs/latest/group__init.html#ga944986b4ec0b928d488141f92982aa18)
- [glfwSetErrorCallback](https://www.glfw.org/docs/latest/group__init.html#gaff45816610d53f0b83656092a4034f40)
- [glfwInitHint](https://www.glfw.org/docs/latest/group__init.html#ga110fd1d3f0412822b4f1908c026f724a)
- [glfwInit](https://www.glfw.org/docs/latest/group__init.html#ga317aac130a235ab08c6db0834907d85e)
- [glfwTerminate](https://www.glfw.org/docs/latest/group__init.html#gaaae48c0a18607ea4a4ba951d939f0901)

初期化に成功する前に他の関数を呼び出すと、[GLFW_NOT_INITIALIZED](https://www.glfw.org/docs/latest/group__errors.html#ga2374ee02c177f12e1fa76ff3ed15e14a)エラーが発生する。

### GLFWの初期化

ライブラリは [glfwInit](https://www.glfw.org/docs/latest/group__init.html#ga317aac130a235ab08c6db0834907d85e) で初期化され、エラーが発生した場合は GLFW_FALSE が返される。

```c
if (!glfwInit())
{
    // Handle initialization failure
}
```

初期化の一部が失敗した場合、成功した部分は、[glfwTerminate](https://www.glfw.org/docs/latest/group__init.html#gaaae48c0a18607ea4a4ba951d939f0901)が呼ばれたかのように終了される。ライブラリは一度だけ初期化する必要があり、すでに初期化されたライブラリに追加で呼び出すと、すぐにGLFW_TRUEが返されます。

いったんライブラリが正常に初期化されたら、アプリケーションが終了する前に 終了させる必要があります。最近のシステムは、終了するプログラムによって割り当てられたリソースを 解放することに非常に長けていますが、GLFW はグローバルなシステム設定を変更しな ければならないことがあり、終了しなければ元に戻せないことがあります。

### 初期設定のヒント

初期化ヒントは[glfwInit](https://www.glfw.org/docs/latest/group__init.html#ga317aac130a235ab08c6db0834907d85e)の前に設定され，ライブラリが終了するまでの動作に影響する．ヒントは[glfwInitHint](https://www.glfw.org/docs/latest/group__init.html#ga110fd1d3f0412822b4f1908c026f724a)で設定されます。

```c
glfwInitHint(GLFW_JOYSTICK_HAT_BUTTONS, GLFW_FALSE);
```

ヒントを設定した値は，GLFWによってリセットされることはなく，初期化時にのみ有効になります．GLFWが初期化されると、ライブラリが終了して再度初期化されるまで、設定した値は無視されます。

いくつかのヒントは、プラットフォーム固有のものである。これらはどのプラットフォームでも設定可能であるが、そのプラットフォームのみに影響する。他のプラットフォームでは無視されます。これらのヒントを設定するために、プラットフォーム固有のヘッダーや関数は必要ありません。

#### initのヒントの共有

GLFW_JOYSTICK_HAT_BUTTONSは、[glfwGetJoystickHats](https://www.glfw.org/docs/latest/group__input.html#ga06e660841b3e79c54da4f54a932c5a2c)がなかった以前のバージョンのGLFWとの互換性のために、 ジョイスティックハットもボタンとして公開するかどうかを指定します。指定できる値はGLFW_TRUEとGLFW_FALSEです。

#### macOS固有のinitのヒント

GLFW_COCOA_CHDIR_RESOURCES は、アプリケーションのカレントディレクトリを、アプリケーションのバンドルの Contents/Resources サブディレクトリに設定するかどうかを指定します(存在する場合)。[glfwInitHint](https://www.glfw.org/docs/latest/group__init.html#ga110fd1d3f0412822b4f1908c026f724a)で設定します。

GLFW_COCOA_MENUBARは、AppKitが初期化される最初のウィンドウの作成時に、nibまたは手動で基本的なメニューバーを作成するかどうかを指定します。[glfwInitHint](https://www.glfw.org/docs/latest/group__init.html#ga110fd1d3f0412822b4f1908c026f724a)で設定します。

#### 対応機種と初期設定値

| Initialization hint | Default value | Supported values |
| --- | --- | --- |
| GLFW_JOYSTICK_HAT_BUTTONS | GLFW_TRUE | GLFW_TRUE or GLFW_FALSE |
| GLFW_COCOA_CHDIR_RESOURCES | GLFW_TRUE | GLFW_TRUE or GLFW_FALSE |
| GLFW_COCOA_MENUBAR | GLFW_TRUE | GLFW_TRUE or GLFW_FALSE |


### GLFWの終端

アプリケーションが終了する前に、GLFWライブラリが初期化されている場合は、終了させる必要があります。これは [glfwTerminate](https://www.glfw.org/docs/latest/group__init.html#gaaae48c0a18607ea4a4ba951d939f0901) で行われます。

```c
glfwTerminate();
```

これにより、残っているウィンドウ、モニター、カーソルオブジェクトが破壊され、変更されたガンマランプが復元され、スクリーンセーバーが無効になっている場合は再有効化され、GLFWによって割り当てられた他のリソースが解放されます。

いったんライブラリが終了すると、初期化されていなかったのと同じことになり、GLFWを使用する前に再度初期化する必要があります。ライブラリが初期化されていない場合，あるいはすでに終了している場合は，すぐに復帰します．

## エラー処理

GLFWのいくつかの関数は、エラーを示す戻り値を持っていますが、何が起こったのか、なぜ起こったのかを解明しようとするとき、これはあまり役に立たないことが多いのです。他の関数は、エラーのために予約された戻り値を持たないので、エラー通知は別のチャンネルが必要です。最後に、すべてのGLFW関数が戻り値を持っているわけではありません。

呼び出したスレッドの最後の[エラーコード](https://www.glfw.org/docs/latest/group__errors.html)は、いつでも [glfwGetError](https://www.glfw.org/docs/latest/group__init.html#ga944986b4ec0b928d488141f92982aa18) で問い合わせることができます。

```c
int code = glfwGetError(NULL);
 
if (code != GLFW_NO_ERROR)
    handle_error(code);
```

最後の呼び出しからエラーが発生していない場合、[GLFW_NO_ERROR](https://www.glfw.org/docs/latest/group__errors.html#gafa30deee5db4d69c4c93d116ed87dbf4) (ゼロ) が返される。エラーは、この関数が戻る前にクリアされる。

エラーコードは、エラーの一般的なカテゴリーを示す。[GLFW_NOT_INITIALIZED](https://www.glfw.org/docs/latest/group__errors.html#ga2374ee02c177f12e1fa76ff3ed15e14a) のようないくつかのエラーコードは単一の意味しか持たないが、 [GLFW_PLATFORM_ERROR](https://www.glfw.org/docs/latest/group__errors.html#gad44162d78100ea5e87cdd38426b8c7a1) のように多くの異なるエラーに使われるものもある。

GLFWはしばしば、一般的なカテゴリよりも多くのエラーに関する情報を持っています。UTF-8でエンコードされた人間が読める説明を、エラーコードと一緒に取り出すことができます。最後の呼び出しからエラーが発生していない場合、説明文はNULLに設定される。

```c
const char* description;
int code = glfwGetError(&description);
 
if (description)
    display_error_message(code, description);
```

取得した説明文字列は、次にエラーが発生するまでしか有効ではありません。つまり、保存したい場合はコピーを取る必要があります。

また、エラーが発生するたびに呼び出されるエラーコールバックを設定することができます。これは [glfwSetErrorCallback](https://www.glfw.org/docs/latest/group__init.html#gaff45816610d53f0b83656092a4034f40) で設定されます。

```c
glfwSetErrorCallback(error_callback);
```

エラーコールバックは、[glfwGetError](https://www.glfw.org/docs/latest/group__init.html#ga944986b4ec0b928d488141f92982aa18)によって返された同じエラーコードと人間が読める説明を受け取る。

```c
void error_callback(int code, const char* description)
{
    display_error_message(code, description);
}
```

エラーコールバックはエラーが保存された後に呼び出されるため、エラーコールバック内から[glfwGetError](https://www.glfw.org/docs/latest/group__init.html#ga944986b4ec0b928d488141f92982aa18)を呼び出すと、コールバックの引数と同じ値が返されます。

コールバックに渡された説明文字列は、エラーコールバックが戻るまでしか有効ではありません。つまり、それを保持したい場合は、コピーを作成する必要があります。

報告されたエラーは決して致命的なものではありません。GLFWが正常に初期化されている限り、何度エラーが発生しても終了するまで初期化されたまま安全な状態に保たれる。初期化中に[glfwInit](https://www.glfw.org/docs/latest/group__init.html#ga317aac130a235ab08c6db0834907d85e)が失敗するようなエラーが発生した場合，初期化されていた ライブラリのいかなる部分も安全に終了する．

将来、同じ呼び出しが別のエラーを発生させたり、有効になったりするかもしれないので、特定のエラーを発生させるために、現在無効な呼び出しに依存しないこと。

## 座標系

GLFWには2つの主要な座標系があります：仮想スクリーンとウィンドウ内容領域または内容領域です。どちらも同じ単位を使います：仮想スクリーン座標、または単にスクリーン座標、これは必ずしもピクセルに対応しません。

仮想スクリーンとコンテンツ・エリアの座標系は，どちらも X 軸が右を，Y 軸が下を向いている．

ウィンドウやモニターの位置は、仮想スクリーンに対するコンテンツエリアの左上隅の位置で指定し、カーソルの位置はウィンドウのコンテンツエリアに対する相対位置で指定します。

ウィンドウのコンテンツエリア座標系の原点は、ウィンドウ位置を指定する点でもあるため、ウィンドウ位置を加えることでコンテンツエリア座標を仮想画面に変換することができる。ウィンドウフレームが存在する場合、コンテンツエリアからはみ出しますが、ウィンドウ位置には影響しません。

GLFWのほとんどすべての位置とサイズは、上記の2つの原点のうちの1つを基準としたスクリーン座標で測定されます。これには、カーソルの位置、ウィンドウの位置とサイズ、ウィンドウフレームのサイズ、モニターの位置、ビデオモードの解像度が含まれます。

2つの例外は、ミリメートルで測定される[モニターの物理サイズ](https://www.glfw.org/docs/latest/monitor_guide.html#monitor_size)と、ピクセルで測定される[フレームバッファサイズ](https://www.glfw.org/docs/latest/window_guide.html#window_fbsize)です。

ピクセルとスクリーン座標は、あなたのマシンでは1対1に対応するかもしれませんが、例えばRetinaディスプレイを搭載したMacなど、他のすべてのマシンではそうではありません。画面座標とピクセルの比率は、ウィンドウが現在どのモニタにあるとみなされるかによって、ランタイムに変更されることもあります。

## 保証と制限

このセクションでは、オペレーティングシステムやドライバのバグを除いて、 GLFWが機能すると期待される条件について説明します。これらの制限の範囲外でGLFWを使用すると、あるプラットフォーム、あるマシン、ある時間、あるバージョンのGLFWで動作するかもしれませんが、いつでも壊れる可能性があり、これはバグとは見なされません。

### ポインターの寿命

GLFWは、あなたが提供したポインタを決して解放しませんし、あなたが提供したポインタを決して解放してはいけません。

多くのGLFW関数は、動的に割り当てられた構造体、文字列、配列へのポインタを返し、いくつかのコールバックは、文字列や配列で提供されます。これらは常にGLFWによって管理され、アプリケーションによって決して解放されるべきではありません。これらのポインタの寿命は、各GLFW関数とコールバックのために文書化されています。このデータを保持する必要がある場合、その寿命が切れる前にコピーする必要があります。

多くのGLFW関数は、アプリケーションによって割り当てられた構造体や文字列への ポインターを受け取ります。これらは決してGLFWによって解放されることはなく、常にアプリケーションの責任となります。GLFWがこれらの構造体や文字列のデータを保持する必要がある場合、関数が戻る前にコピーされます。

ポインタの寿命は、将来のマイナーリリースやパッチリリースで短縮されないことが 保証されています。

### リエントランシー

GLFWのイベント処理とオブジェクトの破壊はリエントラントではありません．つまり，以下の関数は，どのコールバック関数からも呼び出してはいけないということです．

- [glfwDestroyWindow](https://www.glfw.org/docs/latest/group__window.html#gacdf43e51376051d2c091662e9fe3d7b2)
- [glfwDestroyCursor](https://www.glfw.org/docs/latest/group__input.html#ga81b952cd1764274d0db7fb3c5a79ba6a)
- [glfwPollEvents](https://www.glfw.org/docs/latest/group__window.html#ga37bd57223967b4211d60ca1a0bf3c832)
- [glfwWaitEvents](https://www.glfw.org/docs/latest/group__window.html#ga554e37d781f0a997656c26b2c56c835e)
- [glfwWaitEventsTimeout](https://www.glfw.org/docs/latest/group__window.html#ga605a178db92f1a7f1a925563ef3ea2cf)
- [glfwTerminate](https://www.glfw.org/docs/latest/group__init.html#gaaae48c0a18607ea4a4ba951d939f0901)

これらの関数は、将来のマイナーリリースやパッチリリースでリエントラントになる可能性がありますが、このリストにない関数がリエントラントにならないようにすることはありません。

### スレッドセーフ

ほとんどのGLFW関数は、メインスレッド（mainを呼び出すスレッド）からしか 呼び出すことができませんが、ライブラリが初期化されれば、どのスレッドからも 呼び出すことができるものもあります。初期化前は、ライブラリ全体がスレッドセーフではありません。

すべての GLFW 関数のリファレンス・ドキュメントには、それがメインスレッドに限定されて いるかどうかが書かれています。

初期化、終了、イベント処理、ウィンドウ、カーソル、OpenGLおよびOpenGL ESコンテキストの生成と破壊はすべて、1つまたはいくつかのプラットフォームの制限により、メインスレッドに制限されます。

イベント処理はメインスレッドで実行されなければならないので、エラーコールバック以外のすべてのコールバックはそのスレッド上でのみ呼び出されることになる。GLFW関数はエラーを生成する可能性があるため、エラーコールバックはどのスレッドでも呼び出される可能性があります。

エラーコードと説明は、どのスレッドからでも問い合わせることができます。

- [glfwGetError](https://www.glfw.org/docs/latest/group__init.html#ga944986b4ec0b928d488141f92982aa18)

空のイベントは、どのスレッドからでも投稿できます。

- [glfwPostEmptyEvent](https://www.glfw.org/docs/latest/group__window.html#gab5997a25187e9fd5c6f2ecbbc8dfd7e9)

ウィンドウユーザポインタとクローズフラグは，どのスレッドからでも読み書き可能であるが，GLFWでは同期されない．

- [glfwGetWindowUserPointer](https://www.glfw.org/docs/latest/group__window.html#gae77a4add0d2023ca21ff1443ced01653)
- [glfwSetWindowUserPointer](https://www.glfw.org/docs/latest/group__window.html#ga3d2fc6026e690ab31a13f78bc9fd3651)
- [glfwWindowShouldClose](https://www.glfw.org/docs/latest/group__window.html#ga24e02fbfefbb81fc45320989f8140ab5)
- [glfwSetWindowShouldClose](https://www.glfw.org/docs/latest/group__window.html#ga49c449dde2a6f87d996f4daaa09d6708)

OpenGLおよびOpenGL ESのコンテキストを扱うこれらの関数は、どのスレッドからも呼び出すことができますが、ウィンドウオブジェクトはGLFWによって同期されません。

- [glfwMakeContextCurrent](https://www.glfw.org/docs/latest/group__context.html#ga1c04dc242268f827290fe40aa1c91157)
- [glfwGetCurrentContext](https://www.glfw.org/docs/latest/group__context.html#gad94e80185397a6cf5fe2ab30567af71c)
- [glfwSwapBuffers](https://www.glfw.org/docs/latest/group__window.html#ga15a5a1ee5b3c2ca6b15ca209a12efd14)
- [glfwSwapInterval](https://www.glfw.org/docs/latest/group__context.html#ga6d4e0cdf151b5e579bd67f13202994ed)
- [glfwExtensionSupported](https://www.glfw.org/docs/latest/group__context.html#ga87425065c011cef1ebd6aac75e059dfa)
- [glfwGetProcAddress](https://www.glfw.org/docs/latest/group__context.html#ga35f1837e6f666781842483937612f163)

生のタイマー関数は、どのスレッドからも呼び出すことができます。

- [glfwGetTimerFrequency](https://www.glfw.org/docs/latest/group__input.html#ga3289ee876572f6e91f06df3a24824443)
- [glfwGetTimerValue](https://www.glfw.org/docs/latest/group__input.html#ga09b2bd37d328e0b9456c7ec575cc26aa)

通常のタイマーはどのスレッドからでも使用できるが、タイマーオフセットの読み書きがGLFWによって同期されていない。

- [glfwGetTime](https://www.glfw.org/docs/latest/group__input.html#gaa6cf4e7a77158a3b8fd00328b1720a4a)
- [glfwSetTime](https://www.glfw.org/docs/latest/group__input.html#gaf59589ef6e8b8c8b5ad184b25afd4dc0)

ライブラリのバージョン情報は、どのスレッドからでも問い合わせることができます。

- [glfwGetVersion](https://www.glfw.org/docs/latest/group__init.html#ga9f8ffaacf3c269cc48eafbf8b9b71197)
- [glfwGetVersionString](https://www.glfw.org/docs/latest/group__init.html#ga026abd003c8e6501981ab1662062f1c0)

Vulkanに関連するすべての関数は、どのスレッドからも呼び出すことができます。

- [glfwVulkanSupported](https://www.glfw.org/docs/latest/group__vulkan.html#ga2e7f30931e02464b5bc8d0d4b6f9fe2b)
- [glfwGetRequiredInstanceExtensions](https://www.glfw.org/docs/latest/group__vulkan.html#ga99ad342d82f4a3421e2864978cb6d1d6)
- [glfwGetInstanceProcAddress](https://www.glfw.org/docs/latest/group__vulkan.html#gadf228fac94c5fd8f12423ec9af9ff1e9)
- [glfwGetPhysicalDevicePresentationSupport](https://www.glfw.org/docs/latest/group__vulkan.html#gaff3823355cdd7e2f3f9f4d9ea9518d92)
- [glfwCreateWindowSurface](https://www.glfw.org/docs/latest/group__vulkan.html#ga1a24536bec3f80b08ead18e28e6ae965)

GLFWは、スレッドごとのコンテキストとエラー状態を管理するためにのみ、 内部で同期オブジェクトを使用します。追加の同期化はアプリケーションに任されています。

現在、どのスレッドからも呼び出せる関数は、常にそのままですが、現在メインスレッ ドに限定されている関数は、将来のリリースでどのスレッドからも呼び出せるよう に更新されるかもしれません。

### バージョン互換性

GLFWは[セマンティックバージョニング](https://semver.org/)を採用しています。これは、APIの以前のマイナーバージョンとのソースおよびバイナリ の後方互換性を保証するものです。つまり、新しいバージョンのライブラリをドロップしても、既存の プログラムは引き続きコンパイルでき、既存のバイナリは引き続き実行できます。

いったん関数や定数が追加されると、その関数のシグネチャや定数の値は、 GLFWの次のメジャーバージョンになるまで変更されることはありません。メジャーバージョン間の互換性は、いかなる種類のものでも保証されません。

文書化されていない動作、すなわち文書に記述されていない動作は、文書化されるま でいつでも変更される可能性があります。

リファレンスドキュメントと実装が異なる場合、ほとんどの場合、リファレンスドキュメントが優先され、実装は次のリリースで修正されます。また、ガイドに記載されていることよりもリファレンスドキュメントが優先されます。

### イベントの順序

関連するイベントの到着順序は、プラットフォーム間で一貫していることは保証されない。例外は合成キーとマウスボタン解放イベントで、これは常にウィンドウのデフォーカスイベントの後に配送される。

## バージョンマネジメント

GLFWは、アプリケーションがコンパイルされたGLFWのバージョンと、 現在実行されているバージョンを識別するメカニズムを提供します。GLFWを動的にロードしている場合（動的にリンクしているだけではない）、 ライブラリバイナリがアプリケーションと互換性があるかどうかを確認するために これを使うことができます。

### コンパイル時バージョン

GLFW のコンパイル時のバージョンは、GLFW_VERSION_MAJOR、GLFW_VERSION_MINOR および GLFW_VERSION_REVISION マクロで GLFW ヘッダーから提供されます。

```c
printf("Compiled against GLFW %i.%i.%i\n",
       GLFW_VERSION_MAJOR,
       GLFW_VERSION_MINOR,
       GLFW_VERSION_REVISION);
```

### ランタイムバージョン

ランタイムバージョンは[glfwGetVersion](https://www.glfw.org/docs/latest/group__init.html#ga9f8ffaacf3c269cc48eafbf8b9b71197)で取得できる．この関数はGLFWが初期化されているかどうかに関係なく呼び出すことができる．

```c
int major, minor, revision;
glfwGetVersion(&major, &minor, &revision);
 
printf("Running against GLFW %i.%i.%i\n", major, minor, revision);
```

### バージョン文字列

GLFW 3はまた、バージョン、プラットフォーム、コンパイラ、そして、 プラットフォーム固有のコンパイル時オプションを記述した、コンパイル時に生成される バージョン文字列を提供します。これは主にバグレポートを提出するためのもので、開発者がバイナリでどの コードパスが有効になっているかを確認できるようにするためのものです。

バージョン文字列は [glfwGetVersionString](https://www.glfw.org/docs/latest/group__init.html#ga026abd003c8e6501981ab1662062f1c0) 関数によって返される．この関数は GLFW が初期化されているかどうかに関係なく呼び出されることがある．

GLFW ライブラリのバージョンを解析するためにバージョン文字列を使用しないでください。[glfwGetVersion](https://www.glfw.org/docs/latest/group__init.html#ga9f8ffaacf3c269cc48eafbf8b9b71197) 関数は、すでに実行中のライブラリ・バイナリのバージョンを提供しています。

文字列のフォーマットは以下の通りです．

- GLFWのバージョン
- ウィンドウシステムAPIの名称
- コンテキスト作成APIの名前
- 追加オプションやAPIがある場合

たとえば、Win32とWGLのバックエンドを使ってGLFW 3.0をMinGWでコンパイルする場合、バージョン文字列は次のようになります。

```
3.0.0 Win32 WGL MinGW
```