# GLFW入力ガイド（日本語訳）

[原文](https://www.glfw.org/docs/latest/input_guide.html)

このガイドでは、GLFWの入力関連機能を紹介します。このカテゴリの特定の機能の詳細については、入力のリファレンスを参照してください。また、GLFWの他の領域のガイドもあります。

- Introduction to the API
- Window guide
- Context guide
- Vulkan guide
- Monitor guide

GLFWは多くの種類の入力を提供します。時間のようにポーリングしかできないものや、スクロールのように コールバックでしか受け取れないものもありますが、多くはコールバックとポー リングの両方を提供します。コールバックはポーリングより使うのに手間がかかりますが、CPUへの負荷が少なく、状態の変化を見逃さないことが保証されます。

すべての入力コールバックはウィンドウ ハンドルを受け取ります。ウィンドウ ユーザー ポインタを使用すると、コールバックから非グローバル構造体やオブジェクトにアクセスできます。

様々なイベントコールバックがどのように動作するかをより良く感じるには、イベント テストプログラムを実行してください。これはGLFWがサポートするすべてのコールバックを登録し、すべてのイベントに提供されたすべての引数を、時間とシーケンス情報とともにプリントアウトします。

## イベント処理

GLFWは、アプリケーションに入力を提供し、アプリケーションがロックアップしていないことをウィンドウシステムに証明するために、イベントのためにウィンドウシステムをポーリングする必要があります。イベント処理は、通常、バッファスワップの後、各フレームごとに行われます。ウィンドウがない場合でも、モニタやジョイスティックの接続イベントを受信するために、 イベントポーリングが必要である。

保留中のイベントを処理する関数として、glfwPollEvents、すでに受信したイベントのみを処理し、すぐにリターンするglfwPollEventの3つがあります。

```c
glfwPollEvents();
```

多くのゲームのように連続的にレンダリングする場合に最適な選択です。

新しい入力を受け取ったときだけウィンドウの内容を更新する必要がある場合は、glfwWaitEventsがより良い選択です。

```c
glfwWaitEvents();
```

少なくとも1つのイベントを受信するまでスレッドをスリープさせ、その後、受信したすべてのイベントを処理します。これはCPUサイクルを大幅に節約するもので、例えば編集ツールなどに有効です。

イベントを待ちたいが、定期的な更新が必要なUI要素や他のタスクがある場合、glfwWaitEventsTimeoutでタイムアウトを指定することができます。

```c
glfwWaitEventsTimeout(0.7);
```

少なくとも1つのイベントを受信するか、指定された秒数が経過するまで、スレッドをスリープさせる。その後、受信したイベントを処理する。

glfwWaitEventsでメインスレッドがスリープしている場合、glfwPostEmptyEventでイベントキューに空のイベントをポストすることで、他のスレッドからそれを起こすことができます。

```c
glfwPostEmptyEvent();
```

コールバックが上記の関数に応答してのみ呼び出されると仮定しないでください。上記の1つ以上の方法でイベントを処理することが必要であるが、 GLFWがそれ自身のコールバックを登録することを必要とするウィンドウシ ステムは、多くのウィンドウシステム関数呼び出しに応答して、GLFWにイベントを 渡すことができる。GLFWは、戻る前にそれらのイベントをアプリケーションコールバックに渡します。

例えば、Windowsでは、glfwSetWindowSizeが実装されているシステム関数は、すべてのウィンドウが持っているイベントコールバックにウィンドウサイズイベントを直接送り、GLFWがそのウィンドウのために実装します。ウィンドウサイズコールバックを設定した場合、GLFWはglfwSetWindowSizeの呼び出しからすべてが戻る前に、新しいサイズでそれを順番に呼び出します。


## キーボード入力

GLFWでは，キーボード入力をキーイベントと文字イベントの2つに分類しています．キーイベントは実際の物理的なキーボードキーに関連し、文字イベントはそれらのキーのいくつかを押すことによって生成されるUnicodeコードポイントに関連します。

キーと文字は1対1に対応するわけではありません。一つのキーが押されると複数の文字が生成され、一つの文字が生成されるには複数のキーが必要な場合があります。あなたのマシンではそうではないかもしれませんが、あなたのユーザーは、あなたと同じキーボードレイアウト、入力方法、あるいはオペレーティングシステムを使用しているとは限りません。

### キー入力

物理キーが押されたり離されたりしたときや、繰り返されたときに通知されたい場合は、キーのコールバックを設定します。

```c
glfwSetKeyCallback(window, key_callback);
```

コールバック関数は、キーボードキー、プラットフォーム固有のスキャンコード、キーアクション、モディファイアビットを受け取ります。

```c
void key_callback(GLFWwindow* window, int key, int scancode, int action, int mods)
{
    if (key == GLFW_KEY_E && action == GLFW_PRESS)
        activate_airship();
}
```

アクションは GLFW_PRESS, GLFW_REPEAT, GLFW_RELEASE のいずれかである。GLFW_PRESS と GLFW_RELEASE アクションを持つイベントは、キーが押されるたびに発行される。ほとんどのキーは、キーを押している間、GLFW_REPEAT アクションを持つイベントも発行される。

GLFW_REPEAT アクションを持つキーイベントは、テキスト入力のためのものである。これらは、ユーザーのキーボード設定で設定された速度で放出される。複数のキーが押されている場合でも、繰り返されるキーは1つだけである。GLFW_REPEAT アクションは、どのキーが押されているかを知るためや、アニメーションを駆動するために頼りにしてはならない。代わりに、GLFW_PRESS と GLFW_RELEASE アクションに基づいて関連するキーの状態を保存するか、基本的なキーの状態のキャッシュを提供する glfwGetKey を呼び出す必要があります。

キーは、既存のキートークンの1つであり、GLFWがそれのためのトークンを欠いている場合、 GLFW_KEY_UNKNOWNです、例えば、電子メールと再生キー。

スキャンコードは、キートークンの有無にかかわらず、すべてのキーで一意である。スキャンコードはプラットフォーム固有であるが、時間の経過とともに変化するため、キーはプラットフォームによって異なるスキャンコードを持つことになるが、ディスクに保存しても安全である。glfwGetKeyScancodeで、現在のプラットフォーム上の任意の名前のキーのスキャンコードを問い合わせることができる。

```c
const int scancode = glfwGetKeyScancode(GLFW_KEY_X);
set_key_mapping(scancode, swap_weapons);
```

最後に報告された各名前のキーの状態は、glfwGetKeyでポーリング可能なウィンドウごとの状態配列にも保存されます。

```c
int state = glfwGetKey(window, GLFW_KEY_E);
if (state == GLFW_PRESS)
{
    activate_airship();
}
```

返される状態は GLFW_PRESS または GLFW_RELEASE のいずれかである。

この関数は、キャッシュされたキーイベントの状態を返すだけです。キーの現在の物理的な状態について、システムをポーリングすることはありません。

状態をポーリングするときはいつでも、探している状態の変化を見逃す危険性があります。押されたキーが、その状態をポーリングする前に再び放された場合、キーが押されたことを見逃してしまうことになります。これに対する推奨の解決策は、キーのコールバックを使うことですが、GLFW_STICKY_KEYS入力モードもあります。

```c
glfwSetInputMode(window, GLFW_STICKY_KEYS, GLFW_TRUE);
```

スティッキーキー・モードが有効なとき、ポーリング可能なキーの状態は、そのキーの状態が glfwGetKey でポーリングされるまで GLFW_PRESS のままである。いったんポーリングされると、もしその間にキーの解放イベントが処理されていれば、状態はGLFW_RELEASEにリセットされ、そうでなければGLFW_PRESSのままになります。

入力イベントが発生したときに Caps Lock と Num Lock キーの状態がどうなっていたかを知りたい場合は、 GLFW_LOCK_KEY_MODS 入力モードを設定する。

```c
glfwSetInputMode(window, GLFW_LOCK_KEY_MODS, GLFW_TRUE);
```

この入力モードが有効な場合、モディファイアビットを受け取るすべてのコールバックは、イベントが発生したときにCaps Lockがオンだった場合はGLFW_MOD_CAPS_LOCKビット、Num Lockがオンだった場合はGLFW_MOD_NUM_LOCKビットが設定されます。

GLFW_KEY_LAST 定数は、任意の名前のキーの最高値を保持する。


### テキスト入力

GLFWは、オペレーティングシステムのテキスト入力システムが生成する、 Unicodeコードポイントのストリーム形式のテキスト入力をサポートしています。キー入力とは異なり、テキスト入力はキーボードレイアウトとモディファイアキーに従い、デッドキーによる文字の合成をサポートします。受信後、コードポイントをUTF-8やその他のお好みのエンコーディングにエンコードすることができます。

GLFW がサポートするすべてのプラットフォームでは，符号なし int は 32 ビット長なので，コードポイント引数はネイティブエンディアンの UTF-32 として扱うことができる．

通常のテキスト入力を行いたい場合は、文字コールバックを設定する。

```c
glfwSetCharCallback(window, character_callback);
```

コールバック関数は、通常のテキスト入力につながるはずのキーイベントのUnicodeコードポイントを受け取り、一般にそのプラットフォームの標準的なテキストフィールドとして動作するようにします。

```c
void character_callback(GLFWwindow* window, unsigned int codepoint)
{
}
```


### 主な名称

キーを名前で参照したい場合、glfwGetKeyNameでキーボードレイアウトに依存する印刷可能なキーの名前を問い合わせることができます。

```c
const char* key_name = glfwGetKeyName(GLFW_KEY_W, 0);
show_tutorial_hint("Press %s to move forward", key_name);
```

この関数は、キーとスキャンコードの両方を扱うことができる。指定されたキーが GLFW_KEY_UNKNOWN である場合はスキャンコードが使用され、そうでない場合は無視される。これは、キーコールバックの動作と一致する。つまり、コールバックの引数は、常にこの関数に変更されずに渡すことができる。

## マウス入力

マウス入力には、マウスの動き、ボタンの押し方、スクロールのオフセットなど、さまざまな形式があります。カーソルの外観も、カスタム画像やシステムテーマの標準的なカーソル形状に変更することができます。

### カーソル位置

カーソルがウィンドウ上を移動したときに通知を受けたい場合は、カーソル位置のコールバックを設定する。

```c
glfwSetCursorPosCallback(window, cursor_position_callback);
```

コールバック関数は、スクリーン座標で測定されたカーソル位置（ウィンドウコンテンツ領域の左上隅を基準とする）を受け取ります。これを提供するプラットフォームでは、完全なサブピクセルのカーソル位置が渡されます。

```c
static void cursor_position_callback(GLFWwindow* window, double xpos, double ypos)
{
}
```

カーソル位置はウィンドウごとに保存され、glfwGetCursorPosでポーリングすることができます。

```c
double xpos, ypos;
glfwGetCursorPos(window, &xpos, &ypos);
```


### カーソルモード

GLFW_CURSOR 入力モードは、特別な形式のマウス動作入力のために、いくつかのカーソルモードを提供する。デフォルトでは、カーソルモードは GLFW_CURSOR_NORMAL で、通常の矢印カーソル（または glfwSetCursor で設定された別のカーソル）が使われ、カーソルの動きは制限されないことを意味します。

マウスモーションによるカメラ制御や、無制限にマウスを動かす必要がある他の入力方式を実装したい場合は、カーソルモードをGLFW_CURSOR_DISABLEDに設定する。

```c
glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);
```

これはカーソルを隠し、指定されたウィンドウにロックします。GLFWはその後、カーソルの再中心化、オフセット計算、アプリケーションへの仮想カーソル位置の提供など、すべての詳細を引き受けます。この仮想位置は、通常カーソル位置コールバックとポーリングの両方を通して提供されます。

> GLFWの他の機能を使って、この機能の独自のバージョンを実装してはならない。これは、サポートされておらず、GLFW_CURSOR_DISABLEDのように堅牢に動作することはない。
もし、カーソルがウィンドウの上にあるときだけ隠されるようにしたいが、それでも通常の動作をさせたい場合は、カーソルモードをGLFW_CURSOR_HIDDENに設定すること。

```c
glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_HIDDEN);
```

カーソルの動きに制限を設けないモードです。

これらの特別なモードを終了するには、GLFW_CURSOR_NORMALカーソルモードを復元する。

```c
glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_NORMAL);
```


### 生のマウス動作

カーソルが無効の場合、生の（スケールされていない、加速されていない）マウスモーションが利用可能であれば、有効にすることができます。

生のマウスモーションは、表面を横切るマウスの実際の動きに近いです。デスクトップカーソルの動きに適用されるスケーリングとアクセラレーションの影響を受けません。この処理はカーソルに適している一方、生の動きは、例えば3Dカメラの制御に適しています。このため、生のマウスモーションはカーソルが無効になっているときのみ提供されます。

glfwRawMouseMotionSupported を呼び出して、現在のマシンが生のモーションを提供するかどうかを調べ、GLFW_RAW_MOUSE_MOTION 入力モードを設定して有効にする。デフォルトでは無効になっている．

```c
if (glfwRawMouseMotionSupported())
    glfwSetInputMode(window, GLFW_RAW_MOUSE_MOTION, GLFW_TRUE);
```

サポートされている場合、生のマウスモーションはウィンドウごとに、いつでも有効または無効にできますが、カーソルが無効になっている場合にのみ提供されます。


### カーソルオブジェクト

GLFW は、GLFWcursor オブジェクトとしてカプセル化された、カスタムカーソルと システムテーマのカーソルイメージの両方を作成することをサポートしています。それらは glfwCreateCursor または glfwCreateStandardCursor で作成され、もし残っていれば glfwDestroyCursor または glfwTerminate で破壊されます。


#### カスタムカーソルの作成

カスタムカーソルは glfwCreateCursor で作成され、作成されたカーソルオブジェクトへのハンドルが返されます。例えば、これは左上隅にホットスポットを持つ16x16の白い正方形のカーソルを作成します。

```c
unsigned char pixels[16 * 16 * 4];
memset(pixels, 0xff, sizeof(pixels));
 
GLFWimage image;
image.width = 16;
image.height = 16;
image.pixels = pixels;
 
GLFWcursor* cursor = glfwCreateCursor(&image, 0, 0);
```

カーソル作成に失敗した場合は NULL を返すので、戻り値の確認が必要である。

画像データは，32ビット，リトルエンディアン，非前乗算のRGBA，すなわち，赤チャンネルを先頭とする各チャンネル8ビットである．画素は，左上隅から順に，正規の行として配置される。


#### 標準カーソル作成

現在のシステムカーソルのテーマから標準的な形状のカーソルは、glfwCreateStandardCursorで作成することができます。

```c
GLFWcursor* cursor = glfwCreateStandardCursor(GLFW_HRESIZE_CURSOR);
```

これらのカーソルオブジェクトは、システムカーソルテーマが実際のイメージを提供することを除いて、glfwCreateCursorで作成されたものと全く同じように動作する。

#### カーソル破壊

カーソルが不要になったら、glfwDestroyCursor で破棄する。

```c
glfwDestroyCursor(cursor);
```

カーソルの破壊は常に成功する。カーソルが任意のウィンドウでカレントである場合、そのウィンドウはデフォルトカーソルに戻ります。これは、カーソルモードには影響しません。残りの全てのカーソルは、glfwTerminateが呼ばれたときに破壊されます。


#### カーソル設定

glfwSetCursorにより、ウィンドウのカレントカーソルを設定することができます。

```c
glfwSetCursor(window, cursor);
```

一度設定されると、システムカーソルがウィンドウのコンテンツ領域上にあり、カーソルモードがGLFW_CURSOR_NORMALに設定されている限り、カーソル画像が使用されるようになる。

1つのカーソルは、任意の数のウィンドウに設定することができる。

デフォルトカーソルに戻すには、そのウィンドウのカーソルをNULLに設定する。

```c
glfwSetCursor(window, NULL);
```

カーソルが破壊されると、カーソルが設定されているウィンドウはすべてデフォルトのカーソルに戻されます。これは、カーソルモードには影響しません。


### カーソル入退室イベント

カーソルがウィンドウのコンテンツ領域に入ったとき、またはコンテンツ領域から出たときに通知を受けたい場合は、カーソルの入力/離脱コールバックを設定します。

```c
glfwSetCursorEnterCallback(window, cursor_enter_callback);
```

コールバック関数は、カーソルの新しい分類を受け取ります。

```c
void cursor_enter_callback(GLFWwindow* window, int entered)
{
    if (entered)
    {
        // The cursor entered the content area of the window
    }
    else
    {
        // The cursor left the content area of the window
    }
}
```

GLFW_HOVEREDウィンドウ属性で、カーソルが現在ウィンドウのコンテンツ領域内にあるかどうかを問い合わせることができる。

```c
if (glfwGetWindowAttrib(window, GLFW_HOVERED))
{
    highlight_interface();
}
```

### マウスボタン入力

マウスボタンが押されたり離されたりしたときに通知を受けたい場合は、マウスボタンコールバックを設定します。

```c
glfwSetMouseButtonCallback(window, mouse_button_callback);
```

コールバック関数は、マウスボタン、ボタンアクション、モディファイアのビットを受け取ります。

```c
void mouse_button_callback(GLFWwindow* window, int button, int action, int mods)
{
    if (button == GLFW_MOUSE_BUTTON_RIGHT && action == GLFW_PRESS)
        popup_menu();
}
```

アクションは GLFW_PRESS または GLFW_RELEASE のいずれかである。

指定されたボタンのマウスボタンの状態は、glfwGetMouseButtonでポーリングできるウィンドウごとの状態配列に保存されます。

```c
int state = glfwGetMouseButton(window, GLFW_MOUSE_BUTTON_LEFT);
if (state == GLFW_PRESS)
{
    upgrade_cow();
}
```

返される状態は GLFW_PRESS または GLFW_RELEASE のいずれかである。

この関数は、キャッシュされたマウスボタンのイベントの状態を返すだけである。マウスボタンの現在の状態について、システムをポーリングすることはありません。

状態をポーリングするときはいつでも、探している状態の変化を見逃す危険があります。もし押されたマウスボタンが、その状態をポーリングする前に再び離された場合、ボタンが押されたことを見逃してしまうことになります。これに対する推奨される解決策は、マウスボタンのコールバックを使うことですが、GLFW_STICKY_MOUSE_BUTTONS 入力モードもあります。

```c
glfwSetInputMode(window, GLFW_STICKY_MOUSE_BUTTONS, GLFW_TRUE);
```

スティッキーマウスボタンモードが有効なとき、マウスボタンの状態が glfwGetMouseButton でポーリングされるまで、ポーリング可能な状態は GLFW_PRESS のままである。いったんポーリングされると、もしその間にマウスボタンのリリースイベントが処理されていたなら、状態はGLFW_RELEASEにリセットされ、そうでなければGLFW_PRESSのままになります。

GLFW_MOUSE_BUTTON_LAST定数は、任意の名前のボタンの最高値を保持する。


### スクロール入力

マウスホイールやタッチパッドのジェスチャーでユーザーがスクロールしたときに通知を受けたい場合は、スクロールコールバックを設定します。

```c
glfwSetScrollCallback(window, scroll_callback);
```

コールバック関数は、2次元のスクロールオフセットを受け取る。

```c
void scroll_callback(GLFWwindow* window, double xoffset, double yoffset)
{
}
```

通常のマウスホイールは垂直であるため、Y軸に沿ったオフセットが得られます。


## ジョイスティック入力

ジョイスティック機能は、接続されたジョイスティックとコントローラを公開するもので、どちらもジョイスティックと呼ばれます。GLFW_JOYSTICK_1, GLFW_JOYSTICK_2 から、 GLFW_JOYSTICK_16, GLFW_JOYSTICK_LASTまで、最大16本のジョイスティックをサポートします。ジョイスティックがあるかどうかは、glfwJoystickPresentで調べることができます。

```c
int present = glfwJoystickPresent(GLFW_JOYSTICK_1);
```

各ジョイスティックは、0以上の軸、0以上のボタン、0以上の帽子、人間が読める名前、ユーザポインタ、SDL互換のGUIDを持つ。

GLFWの初期化時に、検出されたジョイスティックが配列の先頭に追加される。一度検出されたジョイスティックは、接続が切れるかライブラリが終了するまで割り当てられたIDを保持するため、 ジョイスティックの接続・切断に伴いIDにずれが生じる可能性があります。

ジョイスティックの軸、ボタン、ハットの状態はポーリングされると更新され、ウィンドウを作成したりイベントを処理したりする必要はありません。ただし、ジョイスティックの接続・切断イベントをジョイスティックコールバックに確実に届けたい場合は、イベント処理を行う必要があります。

接続されたすべてのジョイスティックのプロパティをリアルタイムに確認するには、 joysticksテストプログラムを実行します。


### ジョイスティック軸の状態

ジョイスティックの全軸の位置はglfwGetJoystickAxesで返されます。返される配列の寿命については、リファレンスドキュメントを参照してください。

```c
int count;
const float* axes = glfwGetJoystickAxes(GLFW_JOYSTICK_5, &count);
```

返される配列の各要素は、-1.0 から 1.0 までの値である。


###  ジョイスティックボタンの状態

ジョイスティックの全ボタンの状態はglfwGetJoystickButtonsで返されます。返される配列の寿命については、リファレンスドキュメントを参照してください。

```c
int count;
const unsigned char* buttons = glfwGetJoystickButtons(GLFW_JOYSTICK_3, &count);
```

返された配列の各要素は、GLFW_PRESS または GLFW_RELEASE のいずれかである。

glfwGetJoystickHats がなかった以前のバージョンとの後方互換性のために、デフォルトでボタンの配列はすべての帽子も含んでいます。詳細は、glfwGetJoystickButtonsのリファレンスドキュメントを参照してください。

### ジョイスティックハットの状態

全てのハットの状態がglfwGetJoystickHatsによって返されます。返される配列の寿命については、リファレンスドキュメントを参照してください。

```c
int count;
const unsigned char* hats = glfwGetJoystickHats(GLFW_JOYSTICK_7, &count);
```

返された配列の各要素は、以下のいずれかである。

Name	Value
GLFW_HAT_CENTERED	0
GLFW_HAT_UP	1
GLFW_HAT_RIGHT	2
GLFW_HAT_DOWN	4
GLFW_HAT_LEFT	8
GLFW_HAT_RIGHT_UP	GLFW_HAT_RIGHT | GLFW_HAT_UP
GLFW_HAT_RIGHT_DOWN	GLFW_HAT_RIGHT | GLFW_HAT_DOWN
GLFW_HAT_LEFT_UP	GLFW_HAT_LEFT | GLFW_HAT_UP
GLFW_HAT_LEFT_DOWN	GLFW_HAT_LEFT | GLFW_HAT_DOWN

斜めの方向は、主な方向（上、右、下、左）のビット単位の組み合わせで、対応する方向とANDすることで個別にテストすることができます。

```c
if (hats[2] & GLFW_HAT_RIGHT)
{
    // State of hat 2 could be right-up, right or right-down
}
```

glfwGetJoystickHats がなかった以前のバージョンとの後方互換性のために、すべての帽子はデフォルトでボタン配列にも含まれます。詳細はglfwGetJoystickButtonsのリファレンスドキュメントを参照してください。


### ジョイスティック名

ジョイスティックの名称をUTF-8でエンコードしたものをglfwGetJoystickNameで返します。返される文字列の寿命については、リファレンスドキュメントを参照してください。

```c
const char* name = glfwGetJoystickName(GLFW_JOYSTICK_4);
```

ジョイスティックの名称は一意であることを保証するものではありません。同じモデル、同じメーカーのジョイスティックでも、同じ名前になることがあります。ジョイスティックIDだけは、そのジョイスティックが接続されなくなるまで一意であることが保証されています。


### ジョイスティック・ユーザーポインター

各ジョイスティックにはユーザポインタがあり、glfwSetJoystickUserPointerで設定し、 glfwGetJoystickUserPointerで取得することができます。これは必要な用途に使うことができ、GLFWで変更されることはありません。この値は、ジョイスティックの接続が切れるか、ライブラリが終了するまで保持されます。

ポインタの初期値はNULLである。

### ジョイスティックの設定変更

ジョイスティックの接続、切断時に通知を受けたい場合は、ジョイスティックコールバックを設定します。

```c
glfwSetJoystickCallback(joystick_callback);
```

コールバック関数は、接続・切断されたジョイスティックのID、および発生したイベントを受け取ります。

```c
void joystick_callback(int jid, int event)
{
    if (event == GLFW_CONNECTED)
    {
        // The joystick was connected
    }
    else if (event == GLFW_DISCONNECTED)
    {
        // The joystick was disconnected
    }
}
```

ジョイスティックの接続・切断イベントをすべてのプラットフォームで配信するためには、イベント処理関数のいずれかを呼び出す必要がある。ジョイスティックの切断を検知して、ジョイスティック関数からコールバックを呼び出すこともできる。この場合、関数はジョイスティックが切断されたときに返すものをそのまま返します。

glfwGetJoystickNameとglfwGetJoystickUserPointerのみが、ジョイスティック切断時に有用な値を返し、 monitorコールバックが返される前に返されるだけです。


###ゲームパッド入力

ジョイスティックの機能には、軸、ボタン、ハットなどのラベルがなく、デバイスのどこに配置されているのかもわかりません。また、同じデバイスであっても、プラットフォームによって順番が異なる場合があります。

この問題を解決するために、SDLコミュニティはSDL_GameControllerDBプロジェクトをクラウドソーシングしました。これは、さまざまなデバイスからXboxのようなゲームパッドへのマッピングを集めたデータベースです。

GLFWはこのマッピング形式をサポートしており、リリース時に利用可能なマッピングのコピーが含まれています。実行時にこれを更新する方法については、Gamepad mappingsを参照してください。ジョイスティックが接続されたり、マッピングが更新されたりすると、 マッピングは自動的にジョイスティックに割り当てられます。

ジョイスティックが存在し、かつゲームパッドマッピングがあるかどうかは、 glfwJoystickIsGamepadで確認することができます。

```c
if (glfwJoystickIsGamepad(GLFW_JOYSTICK_2))
{
    // Use as gamepad
}
```

ゲームパッド入力にのみ興味がある場合は、glfwJoystickPresentの代わりにこの関数を使用することができます。

glfwGetGamepadNameで、ゲームパッドマッピングが提供する人間にとって読みやすい名前を問い合わせることができます。これはジョイスティック名と同じかもしれませんし、違うかもしれません。

```c
const char* name = glfwGetGamepadName(GLFW_JOYSTICK_7);
```

ジョイスティックのゲームパッド状態を取得するには、glfwGetGamepadStateを呼び出します。

```c
GLFWgamepadstate state;
 
if (glfwGetGamepadState(GLFW_JOYSTICK_3, &state))
{
    if (state.buttons[GLFW_GAMEPAD_BUTTON_A])
    {
        input_jump();
    }
 
    input_speed(state.axes[GLFW_GAMEPAD_AXIS_RIGHT_TRIGGER]);
}
```

GLFWgamepadstate構造体は、ボタンの状態と軸の状態の2つの配列を持っています。各ボタンと軸の値は、glfwGetJoystickButtons と glfwGetJoystickAxes 関数と同じで、つまり、ボタンは GLFW_PRESS または GLFW_RELEASE 、軸は -1.0 ～ 1.0 (含む) です。

配列のサイズと各配列内の位置は固定である．

ボタンのインデックスは GLFW_GAMEPAD_BUTTON_A, GLFW_GAMEPAD_BUTTON_B, GLFW_GAMEPAD_BUTTON_X, GLFW_GAMEPAD_BUTTON_Y, GLFW_GAMEPAD_BUTTON_LEFT_BUMPER, GLFW_GAMEPAD_BUTTON_RIGHT_BUMPER, GLFW_GAMEPAD_BUTTON_BACK, GLFW_GAMEPAD_BUTTON_START, GLFW_GAMEPAD_BUTTON_GUIDE, GLFW_GAMEPAD_BUTTON_LEFT_THUMB, GLFW_GAMEPAD_BUTTON_RIGHT_THUMB, GLFW_GAMEPAD_BUTTON_DPAD_UP, GLFW_GAMEPAD_BUTTON_DPAD_RIGHT, GLFW_GAMEPAD_BUTTON_DPAD_DOWN and GLFW_GAMEPAD_BUTTON_DPAD_LEFT.

お好みで、A、B、X、YボタンのインデックスにGLFW_GAMEPAD_BUTTON_CROSS、GLFW_GAMEPAD_BUTTON_CIRCLE、GLFW_GAMEPAD_BUTTON_SQUARE、GLFW_GAMEPAD_BUTTON_TRIANGLEというエイリアスも存在します。

軸索は GLFW_GAMEPAD_AXIS_LEFT_X, GLFW_GAMEPAD_AXIS_LEFT_Y, GLFW_GAMEPAD_AXIS_RIGHT_X, GLFW_GAMEPAD_AXIS_RIGHT_Y, GLFW_GAMEPAD_AXIS_LEFT_TRIGGER and GLFW_GAMEPAD_AXIS_RIGHT_TRIGGER.

GLFW_GAMEPAD_BUTTON_LAST と GLFW_GAMEPAD_AXIS_LAST 定数は、各配列で利用可能な最大のインデックスに等しい。


### ゲームパッドマッピング

GLFWは、リリース時にSDL_GameControllerDBで利用可能なマッピングのコピーを含んでいます。新しいマッピングはglfwUpdateGamepadMappingsで実行時に追加することができます。

```c
const char* mappings = load_file_contents("game/data/gamecontrollerdb.txt");
 
glfwUpdateGamepadMappings(mappings);
```

この機能は、1行から、gamecontrollerdb.txtファイル全体の未修正の内容まで、すべてをサポートします。

GLFWをソースからCMakeでコンパイルする場合、update_mappingsターゲットをビルドすることで組み込みのマッピングを更新することができます。これはGenerateMappings.cmake CMakeスクリプトを実行し、gamecontrollerdb.txtをダウンロードし、mappings.hヘッダーファイルを再生成するものです。

以下は、マッピングのフォーマットについての説明です。この記述は権威あるものではないことに注意してください。このフォーマットはSDLおよびSDL_GameControllerDBプロジェクトによって定義されており、それらのドキュメントやコードが優先されます。

各マッピングは、ゲームパッドの GUID、名前、レイアウトを記述するカンマ区切りの値で構成される一行で構成されます。16進数で始まらない行は無視されます。

最初の値は常にゲームパッドのGUIDで、通常、メーカー、モデル、リビジョン、コンピューターとの接続タイプを特定する32文字長の16進文字列です。この情報がない場合、GUIDはゲームパッド名から生成される。GLFWはSDL 2.0.5+のGUID形式を使用していますが、古い形式からの変換も可能です。

2番目の値は常にゲームパッドの人間にとって読みやすい名前である。

後続の値はすべて`<field>:<value>`の形式であり，マッピングのレイアウトを記述する。これらのフィールドはすべて存在するとは限らず、またどのような順序で出現してもよい。

ボタンのフィールドは、a, b, x, y, back, start, guide, dpup, dpright, dpdown, dpleft, leftshoulder, rightshoulder, leftstick, rightstickである。

軸のフィールドは、leftx, lefty, rightx, righty, lefttrigger, righttrigger です。

axisまたはbuttonフィールドの値は、ジョイスティックボタン、ジョイスティック軸、ハットビットマスク、または空であることができます。ジョイスティックボタンはbNで指定し、例えば第3ボタンはb2である。ジョイスティック軸はaNで指定し、例えば第8ボタンはa7とする。ジョイスティックハットビットマスクはhN.Nとして指定され、例えばh0.8は最初のハットの左を意味します。マスクには複数のビットを設定することができます。

軸の前に + または - の範囲修飾子があり、たとえば4軸の正の半分は +a3 となります。これは、ジョイスティック軸の正または負の半分に入力を制限するものです。軸または半軸の後に、~inversion修飾子がある場合があります。 for example a2~ or -a7~. ゲームパッド軸の値を否定します。

ハットビットマスクはジョイスティックファンクションのハット状態と一致します。

また、マッピングが有効なプラットフォームを指定する特別なプラットフォームフィールドがあります。指定可能な値は、Windows、Mac OS X、Linuxです。

以下は、ゲームパッドのマッピングの例です。これは、WindowsのXInput API経由でアクセスするXboxコントローラのためにGLFWに組み込まれたものです。この例は、ページに収まるようにいくつかの行に分かれていますが、実際のゲームパッドマッピングは1行でなければなりません。

```
78696e70757401000000000000000000,XInput Gamepad (GLFW),platform:Windows,a:b0,
b:b1,x:b2,y:b3,leftshoulder:b4,rightshoulder:b5,back:b6,start:b7,leftstick:b8,
rightstick:b9,leftx:a0,lefty:a1,rightx:a2,righty:a3,lefttrigger:a4,
righttrigger:a5,dpup:h0.1,dpright:h0.2,dpdown:h0.4,dpleft:h0.8,
```

> GLFW は、最近 SDL に追加された出力範囲と修飾子 + と - をまだサポートしていません。入力修飾子 +, - および ~ はサポートされており、上で説明したとおりです。


## 時間入力

GLFWはglfwGetTimeにより、秒単位の高分解能な時間入力を提供します。

```c
double seconds = glfwGetTime();
```

glfwInitでライブラリが初期化されてからの秒数を返す。使用されるプラットフォーム固有の時間ソースは、通常、マイクロ秒またはナノ秒の分解能を持つ。

基準時刻はglfwSetTimeで変更することができます。

```c
glfwSetTime(4.0);
```

これは、指定された時間（秒）を設定し、そこからカウントを続けるものです。

また、glfwGetTimerValueを使用すると、上記の関数を実装するために使用された生のタイマーにアクセスすることができます。

```c
uint64_t value = glfwGetTimerValue();
```

この値は、1 / 周波数秒単位です。生タイマーの周波数は、オペレーティングシステムとハードウェアに依存します。glfwGetTimerFrequencyで周波数をHzで問い合わせることができます。

```c
uint64_t frequency = glfwGetTimerFrequency();
```


## クリップボードの入出力

システムのクリップボードにUTF-8でエンコードされた文字列がある場合、またはそれに変換できる場合、glfwGetClipboardStringでそれを取得することができます。返される文字列の寿命については、リファレンスドキュメントを参照してください。

```c
const char* text = glfwGetClipboardString(NULL);
if (text)
{
    insert_text(text);
}
```

クリップボードが空の場合、またはその内容を変換できなかった場合は、NULL を返す。

システムクリップボードの内容は、glfwSetClipboardString によって UTF-8 でエンコードされた文字列に設定することができます。

```c
glfwSetClipboardString(NULL, "A string with words in it");
```

## パスドロップ入力

ウィンドウにドロップされたファイルやディレクトリのパスを受け取りたい場合、ファイルドロップのコールバックを設定します。

```c
glfwSetDropCallback(window, drop_callback);
```

コールバック関数は、UTF-8 でエンコードされたパスの配列を受け取る。

```c
void drop_callback(GLFWwindow* window, int count, const char** paths)
{
    int i;
    for (i = 0;  i < count;  i++)
        handle_dropped_file(paths[i]);
}
```

パスの配列とその文字列は、ファイルドロップコールバックが返されるまでの間のみ有効で、そのイベントのために特別に生成されている可能性があります。パスを保持したい場合は、配列のディープコピーを作成する必要があります。