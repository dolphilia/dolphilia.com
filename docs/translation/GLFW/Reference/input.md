# 入力

これは、入力に関連する関数と型に関する参考文書である。タスク指向の情報については、入力ガイドを参照してください。

[[TOC]]

## モジュール

| 名前                     | 説明                             |
|--------------------------|----------------------------------|
| ゲームパッドの軸         | ゲームパッドの軸。               |
| ゲームパッドのボタン     | ゲームパッドのボタン             |
| ジョイスティック・ハット | ジョイスティック・ハットの状態。 |
| ジョイスティック         | ジョイスティックのID。           |
| キーボードのキー         | キーボードのキーID。             |
| 修飾キー・フラグ         | 修飾キーのフラグ。               |
| マウスボタン             | マウスボタンのID。               |
| 標準カーソル形状         | 標準システムのカーソル形状。     |

## マクロ

|マクロ|説明|
|---|---|
|GLFW_RELEASE|キーまたはマウスボタンが離された。|
|GLFW_PRESS|キーまたはマウスボタンが押された。|
|GLFW_REPEAT|キーは繰り返されるまで押し続けられた。|

::: details GLFW_RELEASE
キーまたはマウスボタンが離された。

```c
#define GLFW_RELEASE 0
```

:::

::: details GLFW_PRESS
キーまたはマウスボタンが押された。

```c
#define GLFW_PRESS   1
```

:::

::: details GLFW_REPEAT
キーは繰り返されるまで押し続けられた。

```c
#define GLFW_REPEAT   2
```

:::

## 型定義

|名前|説明|
|---|---|
| `struct GLFWcursor`          | 不透明なカーソルオブジェクト。 |
| `void(* GLFWmousebuttonfun)` | マウスボタンコールバック用の関数ポインタタイプ。 |
| `void(* GLFWcursorposfun)`   | カーソル位置コールバックの関数ポインタタイプ。 |
| `void(* GLFWcursorenterfun)` | カーソル入力/離脱コールバックの関数ポインタタイプ。 |
| `void(* GLFWscrollfun)`      | スクロールコールバックの関数ポインタタイプ。 |
| `void(* GLFWkeyfun)`         | キーボード・キー・コールバックの関数ポインタ・タイプ。 |
| `void(* GLFWcharfun)`        | Unicode 文字コールバック用の関数ポインタ型。 |
| `void(* GLFWcharmodsfun)`    | Unicode 文字修飾子付きコールバック用の関数ポインタ型。 |
| `void(* GLFWdropfun)`        | パス・ドロップ・コールバックの関数ポインタ型。 |
| `void(* GLFWjoystickfun)`    | ジョイスティック設定コールバックの関数ポインタ型。 |
| `struct GLFWgamepadstate`    | ゲームパッドの入力状態。 |

::: details `struct GLFWcursor`

不透明なカーソルオブジェクト。

```c
typedef struct GLFWcursor GLFWcursor
```

__参照__:

- Cursor objects

__追加__:

バージョン3.1で追加。
:::

::: details `void(* GLFWmousebuttonfun)`

これは、マウスボタンコールバック関数のための関数ポインタタイプです。マウスボタンコールバック関数は以下のシグネチャを持ちます：

```c
void function_name(GLFWwindow* window, int button, int action, int mods)
```

---

```c
typedef void(* GLFWmousebuttonfun) (GLFWwindow *window, int button, int action, int mods)
```

__引数__:

- `[in] window`: イベントを受信したウィンドウ。
- `[in] button`: 押された、または離されたマウスボタン。
- `[in] action`: GLFW_PRESSまたはGLFW_RELEASEのいずれか。将来のリリースでは、さらに多くのアクションが追加されるかもしれません。
- `[in] mods`: どの修飾キーが押されたかを示すビットフィールド。

__参照__:

- Mouse button input
- glfwSetMouseButtonCallback

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルとモディファイアマスクのパラメータを追加。
:::

::: details `void(* GLFWcursorposfun)`
これは、カーソル位置コールバック用の関数ポインタ・タイプである。カーソル位置コールバック関数は以下のシグネチャを持つ：

```c
void function_name(GLFWwindow* window, double xpos, double ypos);
```

---

```c
typedef void(* GLFWcursorposfun) (GLFWwindow *window, double xpos, double ypos)
```

__引数__:

- `[in] window`: イベントを受信したウィンドウ。
- `[in] xpos`: コンテンツ領域の左端からの相対的な、新しいカーソルのX座標。
- `[in] ypos`: コンテンツ領域の上端からの相対的な、新しいカーソルのy座標。

__参照__:

- Cursor position
- glfwSetCursorPosCallback

__追加__:

バージョン3.0で追加。GLFWmouseposfun を置き換える。
:::

::: details `void(* GLFWcursorenterfun)`
これは、カーソル・エンター/リーブ・コールバック用の関数ポインタ・タイプである。カーソル入力/離脱コールバック関数は以下のシグネチャを持つ：

```c
void function_name(GLFWwindow* window, int entered)
```

---

```c
typedef void(* GLFWcursorenterfun) (GLFWwindow *window, int entered)
```

__引数__:

- `[in] window`: イベントを受信したウィンドウ。
- `[in] entered`: カーソルがウィンドウのコンテンツ領域に入った場合はGLFW_TRUE、ウィンドウから出た場合はGLFW_FALSE。

__参照__:

- Cursor enter/leave events
- glfwSetCursorEnterCallback

__追加__:
バージョン3.0で追加。
:::

::: details `void(* GLFWscrollfun)`
これは、スクロールコールバック用の関数ポインタ型である。スクロールコールバック関数は以下のシグネチャを持ちます：

```c
void function_name(GLFWwindow* window, double xoffset, double yoffset)
```

---

```c
typedef void(* GLFWscrollfun) (GLFWwindow *window, double xoffset, double yoffset)
```

__引数__:

- `[in] window`: イベントを受信したウィンドウ。
- `[in] xoffset`: X軸に沿ったスクロールオフセット。
- `[in] yoffset`: Y軸方向のスクロールオフセット。

__参照__:

- Scroll input
- glfwSetScrollCallback

__追加__:

バージョン3.0で追加。GLFWmousewheelfun を置き換える。
:::

::: details `void(* GLFWkeyfun)`
これは、キーボード・キー・コールバック用の関数ポインタ・タイプである。キーボード・キー・コールバック関数は以下のシグネチャを持つ：

```c
void function_name(GLFWwindow* window, int key, int scancode, int action, int mods)
```

---

```c
typedef void(* GLFWkeyfun) (GLFWwindow *window, int key, int scancode, int action, int mods)
```

__引数__:

- `[in] window`: イベントを受信したウィンドウ。
- `[in] key`: 押された、または離されたキーボードキー。
- `[in] scancode`: キーのシステム固有のスキャンコード。
- `[in] action`: GLFW_PRESS, GLFW_RELEASE または GLFW_REPEAT.将来のリリースでは、さらに多くのアクションが追加されるかもしれません。
- `[in] mods`: どの修飾キーが押されたかを示すビットフィールド。

__参照__:

- Key input
- glfwSetKeyCallback

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドル、スキャンコード、モディファイアマスクパラメーターを追加。
:::

::: details `void(* GLFWcharfun)`
これは、Unicode 文字コールバック用の関数ポインタ型です。Unicode文字コールバック関数は以下のシグネチャを持ちます：

```c
void function_name(GLFWwindow* window, unsigned int codepoint)
```

---

```c
typedef void(* GLFWcharfun) (GLFWwindow *window, unsigned int codepoint)
```

__引数__:

- `[in] window`: イベントを受信したウィンドウ。
- `[in] codepoint`: 文字のUnicodeコードポイント。

__参照__:

- Text input
- glfwSetCharCallback

__追加__:

バージョン2.4で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `void(* GLFWcharmodsfun)`
これは、Unicode 文字修飾子付きコールバック用の関数ポインタ型です。どの修飾キーが押されているかに関係なく、入力文字ごとに呼び出されます。Unicode修飾子付き文字コールバック関数は以下のシグネチャを持ちます：

```c
void function_name(GLFWwindow* window, unsigned int codepoint, int mods)
```

---

```c
typedef void(* GLFWcharmodsfun) (GLFWwindow *window, unsigned int codepoint, int mods)
```

__引数__:

- `[in] window`: イベントを受信したウィンドウ。
- `[in] codepoint`: 文字のUnicodeコードポイント。
- `[in] mods`: どの修飾キーが押されたかを示すビットフィールド。

__参照__:

- Text input
- glfwSetCharModsCallback

__非推奨__:

バージョン4.0で削除予定。

__追加__:

バージョン3.1で追加。
:::

::: details `void(* GLFWdropfun)`
これは、パスドロップ・コールバック用の関数ポインタ型である。パス・ドロップ・コールバック関数は以下のシグネチャを持つ：

```c
void function_name(GLFWwindow* window, int path_count, const char* paths[])
```

---

```c
typedef void(* GLFWdropfun) (GLFWwindow *window, int path_count, const char *paths[])
```

__引数__:

- `[in] window`: イベントを受信したウィンドウ。
- `[in] path_count`: ドロップされたパスの数。
- `[in] paths`: UTF-8エンコードされたファイルやディレクトリのパス名。

__ポインタの寿命__:

パス配列とその文字列は、コールバック関数が戻るまで有効である。

__参照__:

- Path drop input
- glfwSetDropCallback

__追加__:

バージョン3.1で追加。
:::

::: details `void(* GLFWjoystickfun)`
これはジョイスティック設定コールバック用の関数ポインタ型である。ジョイスティック設定コールバック関数は以下のシグネチャを持ちます：

```c
void function_name(int jid, int event)
```

---

```c
typedef void(* GLFWjoystickfun) (int jid, int event)
```

__引数__:

- `[in] jid`: 接続または切断されたジョイスティック。
- `[in] event`: GLFW_CONNECTEDまたはGLFW_DISCONNECTEDのいずれか。将来のリリースでは、さらに多くのイベントが追加されるかもしれません。

__参照__:

- Joystick configuration changes
- glfwSetJoystickCallback

__追加__:

バージョン3.2で追加。
:::

::: details `struct GLFWgamepadstate`
ゲームパッドの入力状態を表します。

```c
typedef struct GLFWgamepadstate GLFWgamepadstate
```

__参照__:

- Gamepad input
- glfwGetGamepadState

__追加__:

バージョン3.3で追加。
:::

## 関数

| 関数名                      | 説明                                                                               |
|-----------------------------|------------------------------------------------------------------------------------|
| glfwGetInputMode            | 指定したウィンドウの入力オプションの値を返します。                                 |
| glfwSetInputMode            | 指定したウィンドウの入力オプションを設定する。                                     |
| glfwRawMouseMotionSupported | 生のマウスモーションがサポートされているかどうかを返します。                       |
| glfwGetKeyName              | 指定された印刷可能キーのレイアウト固有の名前を返します。                           |
| glfwGetKeyScancode          | 指定されたキーのプラットフォーム固有のスキャンコードを返します。                   |
| glfwGetKey                  | 指定したウィンドウのキーボードのキーが最後に報告された状態を返します。             |
| glfwGetMouseButton          | 指定されたウィンドウで、最後に報告されたマウスボタンの状態を返します。             |
| glfwGetCursorPos            | ウィンドウのコンテンツ領域に対するカーソルの位置を取得する。                       |
| glfwSetCursorPos            | ウィンドウのコンテンツ領域からの相対的なカーソルの位置を設定する。                 |
| glfwCreateCursor            | カスタムカーソルを作成する。                                                       |
| glfwCreateStandardCursor    | 標準的な形状のカーソルを作成する。                                                 |
| glfwDestroyCursor           | カーソルを破壊する。                                                               |
| glfwSetCursor               | ウィンドウのカーソルを設定する。                                                   |
| glfwSetKeyCallback          | キー・コールバックを設定する。                                                     |
| glfwSetCharCallback         | Unicode文字コールバックを設定します。                                              |
| glfwSetCharModsCallback     | 修飾子付きUnicode文字コールバックを設定します。                                    |
| glfwSetMouseButtonCallback  | マウスボタンのコールバックを設定します。                                           |
| glfwSetCursorPosCallback    | カーソル位置のコールバックを設定する。                                             |
| glfwSetCursorEnterCallback  | カーソルの入力/離脱コールバックを設定する。                                        |
| glfwSetScrollCallback       | スクロールコールバックを設定します。                                               |
| glfwSetDropCallback         | パス・ドロップ・コールバックを設定します。                                         |
| glfwJoystickPresent         | 指定されたジョイスティックが存在するかどうかを返します。                           |
| glfwGetJoystickAxes         | 指定したジョイスティックの全軸の値を返す。                                         |
| glfwGetJoystickButtons      | 指定したジョイスティックのすべてのボタンの状態を返します。                         |
| glfwGetJoystickHats         | 指定したジョイスティックのすべてのハットの状態を返します。                         |
| glfwGetJoystickName         | 指定されたジョイスティックの名前を返します。                                       |
| glfwGetJoystickGUID         | 指定したジョイスティックのSDL互換GUIDを返します。                                  |
| glfwSetJoystickUserPointer  | 指定したジョイスティックのユーザーポインターを設定します。                         |
| glfwGetJoystickUserPointer  | 指定されたジョイスティックのユーザポインタを返します。                             |
| glfwJoystickIsGamepad       | 指定されたジョイスティックがゲームパッドマッピングを持っているかどうかを返します。 |
| glfwSetJoystickCallback     | ジョイスティック設定コールバックを設定します。                                     |
| glfwUpdateGamepadMappings   | 指定した SDL_GameControllerDB ゲームパッドマッピングを追加します。                 |
| glfwGetGamepadName          | 指定されたジョイスティックの、人間が読めるゲームパッド名を返します。               |
| glfwGetGamepadState         | ゲームパッドとしてリマップされた指定されたジョイスティックの状態を取得する。       |
| glfwSetClipboardString      | 指定した文字列をクリップボードに設定する。                                         |
| glfwGetClipboardString      | クリップボードの内容を文字列として返す。                                           |
| glfwGetTime                 | GLFWの時間を返す。                                                                 |
| glfwSetTime                 | GLFWの時間を設定する。                                                             |
| glfwGetTimerValue           | 生タイマーの現在値を返す。                                                         |
| glfwGetTimerFrequency       | 生タイマーの周波数を Hz 単位で返します。                                           |

::: details `glfwGetInputMode()`
この関数は指定されたウィンドウの入力オプションの値を返す。モードは GLFW_CURSOR, GLFW_STICKY_KEYS, GLFW_STICKY_MOUSE_BUTTONS, GLFW_LOCK_KEY_MODS, GLFW_RAW_MOUSE_MOTION のいずれかでなければならない。

```c
int glfwGetInputMode(GLFWwindow * window, int mode)
```

__引数__:

- `[in] window`: クエリーするウィンドウ。
- `[in] mode`: GLFW_CURSOR、GLFW_STICKY_KEYS、GLFW_STICKY_MOUSE_BUTTONS、GLFW_LOCK_KEY_MODS、GLFW_RAW_MOUSE_MOTIONのいずれか。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_INVALID_ENUM である。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- glfwSetInputMode

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetInputMode()`
この関数は指定されたウィンドウの入力モードオプションを設定します。モードは GLFW_CURSOR, GLFW_STICKY_KEYS, GLFW_STICKY_MOUSE_BUTTONS, GLFW_LOCK_KEY_MODS, GLFW_RAW_MOUSE_MOTION のいずれかでなければならない。

モードがGLFW_CURSORの場合、値は以下のカーソルモードのいずれかでなければならない：

- GLFW_CURSOR_NORMAL: カーソルが表示され、正常に動作するようにする。
- GLFW_CURSOR_HIDDEN: カーソルがウィンドウのコンテンツ領域上にあるとき、カーソルを不可視にするが、カーソルが離れることは制限しない。
- GLFW_CURSOR_DISABLED: カーソルを隠したりつかんだりすることで、仮想的で無制限のカーソル移動を提供する。これは、例えば3Dカメラコントロールの実装に便利です。

モードが GLFW_STICKY_KEYS の場合、スティッキーキーを有効にするには GLFW_TRUE を、無効にするには GLFW_FALSE を指定しなければならない。スティッキーキーが有効な場合、キーが押されると、glfwGetKey が次に呼ばれたとき、たとえその前にキーが離されていたとしても、 GLFW_PRESS が返される。これは、キーが押されたかどうかだけに興味があり、いつ、どの順番で押されたかには興味がない場合に便利である。

モードが GLFW_STICKY_MOUSE_BUTTONS の場合、値はスティッキーマウスボタンを有効にする GLFW_TRUE か、無効にする GLFW_FALSE のどちらかでなければならない。スティッキーマウスボタンが有効な場合、マウスボタンが押されると、glfwGetMouseButton が次に呼ばれたとき、たとえその前にマウスボタンが離されていたとしても、GLFW_PRESS を返す。これは、マウスボタンが押されたかどうかだけに興味があるが、いつ、どの順番で押されたかには興味がない場合に便利である。

モードが GLFW_LOCK_KEY_MODS の場合、値はロックキー修飾ビットを有効にする GLFW_TRUE か、無効にする GLFW_FALSE のいずれかでなければならない。有効な場合、修飾ビットを受け取るコールバックは、イベントがCaps Lockがオンの時に生成された場合はGLFW_MOD_CAPS_LOCKビットもセットされ、Num Lockがオンの時はGLFW_MOD_NUM_LOCKビットもセットされる。

モードがGLFW_RAW_MOUSE_MOTIONの場合、カーソルが無効になっているときに生の（スケールされず加速されない）マウスモーションを有効にするにはGLFW_TRUE、無効にするにはGLFW_FALSEのどちらかの値でなければならない。生の動きがサポートされていない場合、これを設定しようとするとGLFW_PLATFORM_ERRORが出る。glfwRawMouseMotionSupportedを呼び出してサポートの有無を確認する。

```c
void glfwSetInputMode(GLFWwindow * window, int mode, int value)
```

__引数__:

- `[in] window`: 入力モードを設定するウィンドウ。
- `[in] mode`: GLFW_CURSOR、GLFW_STICKY_KEYS、GLFW_STICKY_MOUSE_BUTTONS、GLFW_LOCK_KEY_MODS、GLFW_RAW_MOUSE_MOTIONのいずれか。
- `[in] value`: 指定された入力モードの新しい値。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- glfwGetInputMode

__追加__:

バージョン 3.0 で追加された。glfwEnable と glfwDisable を置き換える。
:::

::: details `glfwRawMouseMotionSupported()`
この関数は、生のマウスモーションが現在のシステムでサポートされているかどうかを返す。このステータスはGLFWが初期化された後も変化しないので、一度だけ確認すればよい。生モーションをサポートしていないシステムで生モーションを有効にしようとすると、GLFW_PLATFORM_ERRORが発生します。

生のマウスモーションは、表面を横切るマウスの実際の動きに近い。デスクトップカーソルの動きに適用されるスケーリングや加速度の影響を受けません。 この処理はカーソルに適しているが、生の動きは例えば3Dカメラのコントロールに適している。このため、生のマウスモーションはカーソルが無効な場合にのみ提供される。

```c
int glfwRawMouseMotionSupported(void)
```

__戻り値__:

現在のマシンで生のマウスモーションがサポートされていればGLFW_TRUE、そうでなければGLFW_FALSE。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Raw mouse motion
- glfwSetInputMode

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetKeyName()`
この関数は、指定された印字可能キーの名前をUTF-8でエンコードして返します。これは通常、修飾キーなしでキーが生成する文字であり、キーバインディングをユーザーに表示するためのものです。デッドキーの場合は、通常、文字に付加される発音記号です。

この関数をテキスト入力に使わないでください。多くの言語でテキスト入力ができなくなります。

キーが GLFW_KEY_UNKNOWN の場合、スキャンコードがキーを識別するために使われる。印字不可能なキー、または GLFW_KEY_UNKNOWN と印字不可能なキーに対応するスキャンコードを指定した場合、この関数は NULL を返すがエラーは発生しない。

この動作により、キー・コールバックの引数を常にそのまま渡すことができます。

印刷可能なキーは以下の通りです：

- GLFW_KEY_APOSTROPHE
- GLFW_KEY_COMMA
- GLFW_KEY_MINUS
- GLFW_KEY_PERIOD
- GLFW_KEY_SLASH
- GLFW_KEY_SEMICOLON
- GLFW_KEY_EQUAL
- GLFW_KEY_LEFT_BRACKET
- GLFW_KEY_RIGHT_BRACKET
- GLFW_KEY_BACKSLASH
- GLFW_KEY_WORLD_1
- GLFW_KEY_WORLD_2
- GLFW_KEY_0 to GLFW_KEY_9
- GLFW_KEY_A to GLFW_KEY_Z
- GLFW_KEY_KP_0 to GLFW_KEY_KP_9
- GLFW_KEY_KP_DECIMAL
- GLFW_KEY_KP_DIVIDE
- GLFW_KEY_KP_MULTIPLY
- GLFW_KEY_KP_SUBTRACT
- GLFW_KEY_KP_ADD
- GLFW_KEY_KP_EQUAL

印字可能なキーの名前はキーボードレイアウトに依存し、印字不可能なキーの名前はレイアウトを問わず同じですが、アプリケーション言語に依存するため、他のユーザーインターフェーステキストと一緒にローカライズする必要があります。

```c
const char * glfwGetKeyName(int key, int scancode)
```

__引数__:

- `[in] key`: 問い合わせるキー、または GLFW_KEY_UNKNOWN.
- `[in] scancode`: 問い合わせるキーのスキャンコード。

__戻り値__:

UTF-8でエンコードされたレイアウト固有のキー名、またはNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

キーボードレイアウト変更イベントを受信すると、返される文字列の内容が変更されることがある。

__ポインタの寿命__:

返された文字列はGLFWによって割り当てられ、解放される。自分で解放してはいけない。ライブラリが終了するまで有効である．

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Key names

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetKeyScancode()`
この関数は、指定されたキーのプラットフォーム固有のスキャンコードを返します。

キーが GLFW_KEY_UNKNOWN またはキーボード上に存在しない場合、このメソッドは -1 を返します。

```c
int glfwGetKeyScancode(int key)
```

__引数__:

- `[in] key`: 任意の名前付きキー。

__戻り値__:

キーのプラットフォーム固有のスキャンコード。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Key input

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetKey()`
この関数は、指定されたキーに対して最後に報告されたウィンドウの状態を返します。返される状態は GLFW_PRESS または GLFW_RELEASE のいずれかです。アクションGLFW_REPEATはキーコールバックにのみ報告されます。

GLFW_STICKY_KEYS入力モードが有効な場合、この関数は、押されたキーに対して最初に呼び出されたとき、そのキーがすでにリリースされていても、GLFW_PRESSを返します。

key関数は物理的なキーを扱い、標準的なUSキーボードレイアウトで使用されるキーにちなんで名付けられたキートークンを持つ。テキストを入力したい場合は、代わりにUnicode文字コールバックを使用してください。

修飾キーのビットマスクはキートークンではないので、この関数では使用できません。

テキスト入力を実装するためにこの関数を使用しないでください。

```c
int glfwGetKey(GLFWwindow * window, int key)
```

__引数__:

- `[in] window`: 目的のウィンドウ。
- `[in] key`: キーボードのキー。GLFW_KEY_UNKNOWN はこの関数では有効なキーではない。

__戻り値__:

GLFW_PRESS または GLFW_RELEASE のいずれか。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_INVALID_ENUM である。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Key input

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `glfwGetMouseButton()`
この関数は、指定されたウィンドウに対して指定されたマウスボタンが最後に報告した状態を返す。返される状態は GLFW_PRESS または GLFW_RELEASE のいずれかである。

GLFW_STICKY_MOUSE_BUTTONS入力モードが有効な場合、この関数は、押されたマウスボタンに対して最初に呼び出されたとき、そのマウスボタンがすでにリリースされていても、GLFW_PRESSを返します。

```c
int glfwGetMouseButton(GLFWwindow * window, int button)
```

__引数__:

- `[in] window`: 目的のウィンドウ。
- `[in] button`: 希望のマウスボタン。

__戻り値__:

GLFW_PRESS または GLFW_RELEASE のいずれか。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_INVALID_ENUM である。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Mouse button input

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメーターを追加。
:::

::: details `glfwGetCursorPos()`
この関数は、指定されたウィンドウのコンテンツ領域の左上隅からの相対的なカーソルの位置を、スクリーン座標で返す。

カーソルが（GLFW_CURSOR_DISABLEDで）無効になっている場合、カーソル位置は束縛されず、doubleの最小値と最大値によってのみ制限される。

座標は、floor 関数で整数に変換できる。 整数型への直接のキャストは、正の座標では機能するが、負の座標では失敗する。

位置引数のいずれかまたはすべてがNULLであってもよい。エラーが発生した場合、NULLでない位置引数はすべて0に設定される。

```c
void glfwGetCursorPos(GLFWwindow * window, double * xpos, double * ypos  )
```

__引数__:

- `[in] window`: 目的のウィンドウ。
- `[out] xpos`: カーソルのX座標を格納する場所。コンテンツ領域の左端からの相対座標、またはNULL。
- `[out] ypos`: カーソルのy座標を格納する場所。コンテンツ領域の上端からの相対座標、またはNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Cursor position
- glfwSetCursorPos

__追加__:

バージョン3.0で追加。glfwGetMousePos を置き換える。
:::

::: details `glfwSetCursorPos()`
この関数は、指定されたウィンドウのコンテンツ領域の左上隅に対するカーソルの位置を、スクリーン座標で設定する。ウィンドウには入力フォーカスがなければならない。この関数が呼び出されたときにウィンドウに入力フォーカスがなければ、無言で失敗する。

カメラコントロールのようなものを実装するためにこの関数を使用しないでください。GLFWはすでにGLFW_CURSOR_DISABLEDカーソルモードを提供しており、カーソルを隠し、透過的に再中心化し、制約のないカーソルモーションを提供しています。詳細はglfwSetInputModeを参照してください。

カーソルモードがGLFW_CURSOR_DISABLEDの場合、カーソル位置は制約されず、doubleの最小値と最大値によってのみ制限される。

```c
void glfwSetCursorPos(GLFWwindow * window, double xpos, double ypos  )
```

__引数__:

- `[in] window`: 目的のウィンドウ。
- `[in] xpos`: コンテンツ領域の左端を基準としたX座標。
- `[in] ypos`: コンテンツ領域の上端からの相対的なy座標。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

Wayland: この関数は、カーソルモードがGLFW_CURSOR_DISABLEDのときのみ動作し、そうでないときは何もしない。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Cursor position
- glfwGetCursorPos

__追加__:
バージョン3.0で追加。glfwSetMousePos を置き換える。
:::

::: details `glfwCreateCursor()`
glfwSetCursorでウィンドウに設定できる新しいカスタムカーソル画像を作成します。カーソルは glfwDestroyCursor で破棄できます。残りのカーソルはglfwTerminateで破棄されます。

ピクセルは32ビット、リトルエンディアン、非前置乗算RGBA、すなわち赤チャンネルを最初にチャンネルあたり8ビットである。ピクセルは左上から順番に並べられます。

カーソルのホットスポットは、カーソル画像の左上隅を基準にピクセル単位で指定されます。GLFWの他のすべての座標系と同様に、X軸は右を指し、Y軸は下を指す。

```c
GLFWcursor * glfwCreateCursor(const GLFWimage * image, int xhot, int yhot)
```

__引数__:

- `[in] image`: 希望のカーソル画像。
- `[in] xhot`: カーソルのホットスポットのX座標をピクセル単位で指定する。
- `[in] yhot`: カーソルのホットスポットのy座標をピクセル単位で指定する。

__戻り値__:

作成されたカーソルのハンドル、またはエラーが発生した場合はNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_VALUE、GLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

指定された画像データは、この関数が戻る前にコピーされる。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Cursor objects
- glfwDestroyCursor
- glfwCreateStandardCursor

__追加__:

バージョン3.1で追加。
:::

::: details `glfwCreateStandardCursor()`
glfwSetCursorでウィンドウに設定できる標準的な形状のカーソルを返します。

```c
GLFWcursor * glfwCreateStandardCursor(int shape)
```

__引数__:

- `[in] shape`: 標準的な形状のひとつ。

__戻り値__:

使用可能な新しいカーソル、またはエラーが発生した場合は NULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Cursor objects
- glfwCreateCursor

__追加__:

バージョン3.1で追加。
:::

::: details `glfwDestroyCursor()`
この関数は、以前に glfwCreateCursor で作成されたカーソルを破棄する。残りのカーソルは glfwTerminate によって破棄されます。

指定されたカーソルがウィンドウのカレントカーソルである場合、そのウィンドウはデフォルトカーソルに戻されます。これはカーソルモードには影響しません。

```c
void glfwDestroyCursor(GLFWcursor * cursor)
```

__引数__:

- `[in] cursor`: 破棄するカーソルオブジェクト。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__リエントランシー__:

この関数はコールバックから呼んではならない。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Cursor objects
- glfwCreateCursor

__追加__:

Added in version 3.1.
:::

::: details `glfwSetCursor()`
この関数は、指定されたウィンドウのコンテンツ領域上にカーソルがある場合に使用するカーソル画像を設定します。設定されたカーソルは、ウィンドウのカーソルモードが GLFW_CURSOR_NORMAL の場合にのみ表示されます。

いくつかのプラットフォームでは、設定されたカーソルはウィンドウが入力フォーカスを持たない限り表示されないかもしれません。

```c
void glfwSetCursor(GLFWwindow * window, GLFWcursor * cursor)
```

__引数__:

- `[in] window`: カーソルを設定するウィンドウ。
- `[in] cursor`: 設定するカーソル、またはデフォルトの矢印カーソルに戻るにはNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Cursor objects

__追加__:

バージョン3.1で追加。
:::

::: details `glfwSetKeyCallback()`
この関数は、キーが押されたり、繰り返されたり、離されたりしたときに呼び出される、指定されたウィンドウのキーコールバックを設定します。

key関数は物理的なキーを扱い、レイアウトに依存しないキートークンは標準的なUSキーボード・レイアウトの値にちなんで命名されます。テキストを入力したい場合は、代わりに文字コールバックを使用してください。

ウィンドウが入力フォーカスを失うと、押されたすべてのキーに対して合成キー・リリース・イベントが生成されます。合成キー・リリース・イベントは、フォーカス喪失イベントが処理された後、つまりウィンドウ・フォーカス・コールバックが呼び出された後に生成されます。

キーのスキャンコードは、そのプラットフォーム、または時にはそのマシンに固有です。スキャンコードは、ユーザーがGLFWキートークンを持たないキーをバインドできるようにするためのものです。そのようなキーはGLFW_KEY_UNKNOWNに設定され、その状態は保存されないので、glfwGetKeyで問い合わせることはできません。

時々、GLFWは合成キーイベントを生成する必要があり、その場合、scancodeは0になるかもしれません。

```c
GLFWkeyfun glfwSetKeyCallback(GLFWwindow * window, GLFWkeyfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, int key, int scancode, int action, int mods)
```

コールバック・パラメータの詳細については、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Key input

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメータと戻り値を追加。
:::

::: details `glfwSetCharCallback()`
この関数は、ユニコード文字が入力されたときに呼び出される、指定されたウィンドウの文字コールバックを設定します。

文字コールバックはUnicodeテキスト入力用です。文字を扱うため、キーボード レイアウトに依存しますが、キー コールバックは依存しません。キーは0文字、1文字、またはそれ以上の文字を入力することができるため、文字は物理的なキーに1対1で対応するわけではありません。特定の物理キーが押されたか離されたかを知りたい場合は、代わりにキー・コールバックを参照してください。

文字コールバックは通常のシステムテキスト入力と同じように動作し、そのプラットフォームで通常のテキスト入力を妨げるような修飾キー、例えばmacOSのSuper（Command）キーやWindowsのAltキーが押されたままになっている場合は呼び出されません。

```c
GLFWcharfun glfwSetCharCallback(GLFWwindow * window, GLFWcharfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, unsigned int codepoint)
```

コールバック・パラメータの詳細については、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Text input

__追加__:

バージョン2.4で追加。GLFW 3: ウィンドウハンドルパラメータと戻り値を追加。
:::

::: details `glfwSetCharModsCallback()`
この関数は、どの修飾キーが使われているかにかかわらず、Unicode文字が入力されたときに呼び出される、指定されたウィンドウの修飾子付き文字コールバックを設定します。

修飾子付き文字コールバックは、カスタムUnicode文字入力を実装するためのものです。通常のUnicodeテキスト入力については、characterコールバックを参照してください。characterコールバックと同様に、character with modifiersコールバックは文字を扱い、キーボードレイアウトに依存します。1つのキーが0文字、1文字、またはそれ以上の文字を入力する可能性があるため、文字は物理的なキーに1:1でマッピングされません。特定の物理キーが押されたか離されたかを知りたい場合は、代わりにkeyコールバックを参照してください。

```c
GLFWcharmodsfun glfwSetCharModsCallback(GLFWwindow * window, GLFWcharmodsfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、エラーが発生した場合は NULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, unsigned int codepoint, int mods)
```

コールバック・パラメータの詳細については、関数ポインタ型を参照のこと。

__非推奨__:

バージョン4.0で削除予定。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Text input

__追加__:

バージョン3.1で追加。
:::

::: details `glfwSetMouseButtonCallback()`
この関数は、マウスボタンが押されたり離されたりしたときに呼び出される、指定されたウィンドウのマウスボタンコールバックを設定します。

ウィンドウが入力フォーカスを失うと、押されたすべてのマウスボタンに対して合成マウスボタン解放イベントが生成されます。これらのイベントは、フォーカス喪失イベントが処理された後、つまりウィンドウ・フォーカス・コールバックが呼び出された後に合成イベントが生成されるという事実によって、ユーザが生成したイベントと見分けることができます。

```c
GLFWmousebuttonfun glfwSetMouseButtonCallback(GLFWwindow * window, GLFWmousebuttonfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, int button, int action, int mods)
```

コールバック・パラメータの詳細については、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Mouse button input

__追加__:

バージョン1.0で追加。GLFW 3: ウィンドウハンドルパラメータと戻り値を追加。
:::

::: details `glfwSetCursorPosCallback()`
この関数は、指定されたウィンドウのカーソル位置コールバックを設定します。このコールバックは、カーソルが移動したときに呼び出されます。 コールバックには、ウィンドウのコンテンツ領域の左上隅からの相対的な位置をスクリーン座標で指定する。

```c
GLFWcursorposfun glfwSetCursorPosCallback(GLFWwindow * window, GLFWcursorposfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, double xpos, double ypos);
```

コールバック・パラメータの詳細については、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Cursor position

__追加__:

バージョン 3.0 で追加されました。glfwSetMousePosCallback を置き換える。
:::

::: details `glfwSetCursorEnterCallback()`
この関数は、指定されたウィンドウのカーソル境界通過コールバックを設定します。このコールバックは、カーソルがウィンドウのコンテンツ領域に入るとき、またはウィンドウのコンテンツ領域から離れるときに呼び出されます。

```c
GLFWcursorenterfun glfwSetCursorEnterCallback(GLFWwindow * window, GLFWcursorenterfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, int entered)
```

コールバック・パラメータの詳細については、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Cursor enter/leave events

__追加__:

バージョン3.0で追加。
:::

::: details glfwSetScrollCallback()
この関数は、指定されたウィンドウのスクロールコールバックを設定する。このコールバックは、マウスホイールやタッチパッドのスクロール領域などのスクロールデバイスが使用されたときに呼び出される。

スクロールコールバックは、マウスホイールやタッチパッドのスクロールエリアからのようなすべてのスクロール入力を受け取ります。

```c
GLFWscrollfun glfwSetScrollCallback(GLFWwindow * window, GLFWscrollfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいスクロールコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, double xoffset, double yoffset)
```

コールバック・パラメータの詳細については、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Scroll input

__追加__:

バージョン 3.0 で追加されました。glfwSetMouseWheelCallback を置き換える。
:::

::: details `glfwSetDropCallback()`
この関数は、ドラッグされたパスがウィンドウにドロップされたときに呼び出される、 指定されたウィンドウのパスドロップコールバックを設定します。

パスの配列とその文字列は、そのイベントのために特別に生成されたものである可能性があるため、コールバックが返された後の有効性は保証されません。コールバックが返された後にそれらを使用したい場合は、ディープ コピーを作成する必要があります。

```c
GLFWdropfun glfwSetDropCallback(GLFWwindow * window, GLFWdropfun callback)
```

__引数__:

- `[in] window`: コールバックを設定するウィンドウ。
- `[in] callback`: 新しいファイルドロップコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWwindow* window, int path_count, const char* paths[])
```

コールバック・パラメータの詳細については、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__備考__:

Wayland: ファイルドロップは現在未実装。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Path drop input

__追加__:

バージョン3.1で追加。
:::

::: details `glfwJoystickPresent()`
この関数は、指定されたジョイスティックが存在するかどうかを返します。

ジョイスティックIDを受け付ける他の関数の前にこの関数を呼ぶ必要はありません。

```c
int glfwJoystickPresent(int jid)
```

__引数__:

- `[in] jid`: 照会するジョイスティック。

__戻り値__:

ジョイスティックがあればGLFW_TRUE、なければGLFW_FALSE。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Joystick input

__追加__:

バージョン3.0で追加されました。glfwGetJoystickParam を置き換える。
:::

::: details `glfwGetJoystickAxes()`
この関数は、指定されたジョイスティックのすべての軸の値を返します。配列の各要素は-1.0〜1.0の値である。

指定されたジョイスティックが存在しない場合、この関数はNULLを返しますがエラーは発生しません。glfwJoystickPresentを最初に呼び出す代わりに使用できます。

```c
const float * glfwGetJoystickAxes(int jid, int * count)
```

__引数__:

- `[in] jid`: 照会するジョイスティック。
- `[out] count`: 返された配列の軸値の数を格納する場所。ジョイスティックが存在しないか、エラーが発生した場合は0がセットされる。

__戻り値__:

ジョイスティックが存在しないか、エラーが発生した場合はNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

返された配列はGLFWによって割り当てられ、解放される。自分で解放してはいけません。指定したジョイスティックが切断されるか、ライブラリが終了するまで有効です。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Joystick axis states

__追加__:

バージョン3.0で追加。glfwGetJoystickPos を置き換える。
:::

::: details `glfwGetJoystickButtons()`
この関数は指定されたジョイスティックのすべてのボタンの状態を返す。配列の各要素はGLFW_PRESSかGLFW_RELEASEである。

glfwGetJoystickHatsがなかった以前のバージョンとの後方互換性のために、 button配列にはすべての帽子も含まれ、それぞれ4つのボタンとして表現される。帽子は glfwGetJoystickHats が返すのと同じ順番で、上、右、下、左の順です。これらの余分なボタンを無効にするには、初期化の前にGLFW_JOYSTICK_HAT_BUTTONS initヒントを設定する。

指定されたジョイスティックが存在しない場合、この関数はNULLを返しますが、エラーは発生しません。これは最初にglfwJoystickPresentを呼ぶ代わりに使うことができる。

```c
const unsigned char * glfwGetJoystickButtons(int jid, int * count)
```

__引数__:

- `[in] jid`: 照会するジョイスティック。
- `[out] count`: 返された配列のボタンの状態の数を格納する場所。ジョイスティックが存在しないかエラーが発生した場合は0がセットされる。

__戻り値__:

ジョイスティックが存在しないかエラーが発生した場合はNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

返された配列はGLFWによって割り当てられ、解放される。自分で解放してはいけません。指定したジョイスティックが切断されるか、ライブラリが終了するまで有効です。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Joystick button states

__追加__:

バージョン2.2で追加。GLFW 3: 動的配列を返すように変更。
:::

::: details `glfwGetJoystickHats()`
この関数は、指定されたジョイスティックのすべてのハットの状態を返します。配列の各要素は以下の値のいずれかである：

- GLFW_HAT_CENTERED0
- GLFW_HAT_UP1
- GLFW_HAT_RIGHT2
- GLFW_HAT_DOWN4
- GLFW_HAT_LEFT8
- GLFW_HAT_RIGHT_UPGLFW_HAT_RIGHT | GLFW_HAT_UP
- GLFW_HAT_RIGHT_DOWNGLFW_HAT_RIGHT | GLFW_HAT_DOWN
- GLFW_HAT_LEFT_UPGLFW_HAT_LEFT | GLFW_HAT_UP
- GLFW_HAT_LEFT_DOWNGLFW_HAT_LEFT | GLFW_HAT_DOWN

対角線方向は、主要な方向（上、右、下、左）のビット単位の組み合わせであり、対応する方向とANDすることで、これらを個別にテストすることができる。

```c
if (hats[2] & GLFW_HAT_RIGHT) {
    // State of hat 2 could be right-up, right or right-down
}
```

指定されたジョイスティックが存在しない場合、この関数はNULLを返しますが、エラーは発生しません。glfwJoystickPresentを最初に呼び出す代わりに使用することができます。

```c
const unsigned char * glfwGetJoystickHats(int jid, int * count)
```

__引数__:

- `[in] jid`: 照会するジョイスティック。
- `[out] count`: ハット状態の数を返す配列のどこに格納するか。ジョイスティックが存在しないかエラーが発生した場合は0がセットされる。

__戻り値__:

ジョイスティックが存在しないか、エラーが発生した場合はNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

返された配列はGLFWによって割り当てられ、解放される。自分で解放してはいけません。指定したジョイスティックが切断されるか、そのジョイスティックに対して再度この関数が呼ばれるか、 ライブラリが終了するまで有効です。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Joystick hat states

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetJoystickName()`
この関数は、指定されたジョイスティックの名前をUTF-8でエンコードして返します。返された文字列はGLFWによって確保・解放されます。自分で解放してはいけません。

指定されたジョイスティックが存在しない場合、この関数はNULLを返しますが、エラーは発生しません。最初にglfwJoystickPresentを呼ぶ代わりに、この関数を使ってもよい。

```c
const char * glfwGetJoystickName(int jid)
```

__引数__:

- `[in] jid`: 照会するジョイスティック。

__戻り値__:

ジョイスティックのUTF-8エンコード名。ジョイスティックが存在しないかエラーが発生した場合はNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

返された文字列はGLFWによって割り当てられ、解放される。自分で解放してはいけません。指定されたジョイスティックが切断されるか、ライブラリが終了するまで有効です。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Joystick name

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetJoystickGUID()`
この関数は、指定されたジョイスティックのSDL互換のGUIDを、UTF-8でエンコードされた16進文字列として返します。返された文字列はGLFWによって割り当てられ、解放される。自分で解放してはいけない。

GUIDはジョイスティックとゲームパッドマッピングを結びつけるものです。ゲームパッドマッピングが割り当てられていなくても、 接続されたジョイスティックは常にGUIDを持ちます。

指定されたジョイスティックが存在しない場合、この関数はNULLを返しますがエラーにはなりません。この関数はglfwJoystickPresentを最初に呼ぶ代わりに使うことができます。

GUIDはSDL 2.0.5で導入された形式を使用する。このGUIDはジョイスティックのメーカーとモデルを一意に識別しようとするもので、特定のユニットを識別するものではない。プラットフォーム固有のAPIがどのようなハードウェア情報を提供するかによって、 ユニットのGUIDはプラットフォーム間で異なる可能性があります。

```c
const char * glfwGetJoystickGUID(int jid)
```

__引数__:

- `[in] jid`: 照会するジョイスティック。

__戻り値__:

ジョイスティックのGUIDをUTF-8エンコードしたもの、またはジョイスティックが存在しないかエラーが発生した場合はNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_ENUM、GLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

返された文字列はGLFWによって割り当てられ、解放される。自分で解放してはいけません。指定されたジョイスティックが切断されるか、ライブラリが終了するまで有効です。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Gamepad input

__追加__:

バージョン3.3で追加。
:::

::: details `glfwSetJoystickUserPointer()`
この関数は、指定されたジョイスティックのユーザー定義ポインタを設定します。現在の値はジョイスティックが切断されるまで保持されます。初期値はNULLです。

この関数は、切断中のジョイスティックに対しても、 ジョイスティックコールバックから呼び出すことができます。

```c
void glfwSetJoystickUserPointer(int jid, void * pointer)
```

__引数__:

- `[in] jid`: ポインターを設定するジョイスティック。
- `[in] pointer`: 新しい値。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__参照__:

- Joystick user pointer
- glfwGetJoystickUserPointer

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetJoystickUserPointer()`
この関数は、指定されたジョイスティックのユーザ定義ポインタの現在値を返します。初期値はNULLです。

この関数は、切断中のジョイスティックに対しても、 ジョイスティックコールバックから呼び出すことができます。

```c
void * glfwGetJoystickUserPointer(int jid)
```

__引数__:

- `[in] jid`: ジョイスティックのポインタを戻す。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__参照__:

- Joystick user pointer
- glfwSetJoystickUserPointer

__追加__:

バージョン3.3で追加。
:::

::: details `glfwJoystickIsGamepad()`
この関数は、指定されたジョイスティックが存在し、かつゲームパッドマッピングがあるかどうかを返します。

指定されたジョイスティックが存在するがゲームパッドマッピングがない場合、この関数はGLFW_FALSEを返しますが、エラーは発生しません。glfwJoystickPresentを呼び出すと、ジョイスティックが存在するかどうかをマッピングの有無にかかわらずチェックすることができます。

```c
int glfwJoystickIsGamepad(int jid)
```

__引数__:

- `[in] jid`: 照会するジョイスティック。

__戻り値__:

ジョイスティックが存在し、ゲームパッドマッピングがある場合はGLFW_TRUE、そうでない場合はGLFW_FALSE。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_INVALID_ENUM である。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Gamepad input
- glfwGetGamepadState

__追加__:

バージョン3.3で追加。
:::

::: details `glfwSetJoystickCallback()`
この関数は、ジョイスティック設定コールバックを設定するか、 現在設定されているコールバックを削除します。ジョイスティックがシステムに接続されたり、 システムから切断されたりしたときに呼び出されます。

ジョイスティックの接続・切断イベントをすべてのプラットフォームで配信するには、 イベント処理関数のいずれかを呼び出す必要があります。ジョイスティックの切断を検出し、ジョイスティック関数からコールバックを呼び出すこともできます。この関数は、ジョイスティックが存在しない場合に返すものをそのまま返します。

```c
GLFWjoystickfun glfwSetJoystickCallback(GLFWjoystickfun callback)
```

__引数__:

- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(int jid, int event)
```

コールバック・パラメータの詳細については、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

ジョイスティックの設定変更

__追加__:

バージョン3.2で追加。
:::

::: details `glfwUpdateGamepadMappings()`
この関数は指定されたASCIIエンコード文字列を解析し、見つかったゲームパッドマッピングで内部リストを更新する。この文字列は、単一のゲームパッドマッピングか、改行で区切られた多数のマッピングを含むことができます。パーサは、空行やコメントを含む、gamecontrollerdb.txt ソースファイルの完全なフォーマットをサポートします。

フォーマットの説明は Gamepad mappings を参照してください。

内部リストに指定されたGUIDのゲームパッドマッピングが既にある場合、それはこの関数に渡されたもので置き換えられます。ライブラリを終了して再初期化すると、内部リストは組み込みのデフォルトに戻ります。

```c
int glfwUpdateGamepadMappings(const char * string)
```

__引数__:

- `[in] string`: ゲームパッドのマッピングを含む文字列。

__戻り値__:

成功すればGLFW_TRUE、エラーが発生すればGLFW_FALSE。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_INVALID_VALUE である。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Gamepad input
- glfwJoystickIsGamepad
- glfwGetGamepadName

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetGamepadName()`
この関数は、指定されたジョイスティックに割り当てられたゲームパッドマッピングから、ゲームパッドの名前を可読形式で返します。

指定されたジョイスティックが存在しないか、ゲームパッドマッピングを持っていない場合、 この関数はNULLを返しますが、エラーは発生しません。glfwJoystickPresentを呼び出すと、 マッピングの有無にかかわらず存在するかどうかをチェックすることができます。

```c
const char * glfwGetGamepadName(int jid)
```

__引数__:

- `[in] jid`: 照会するジョイスティック。

__戻り値__:

ゲームパッドのUTF-8エンコード名、またはジョイスティックが存在しないか、マッピングがないか、エラーが発生した場合はNULL。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_INVALID_ENUM である。

__ポインタの寿命__:

返された文字列はGLFWによって割り当てられ、解放される。自分で解放してはいけません。指定されたジョイスティックが切断されるか、ゲームパッドのマッピングが更新されるか、 ライブラリが終了するまで有効です。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Gamepad input
- glfwJoystickIsGamepad

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetGamepadState()`
この関数は、Xboxのようなゲームパッドにリマップされた指定されたジョイスティックの状態を取得する。

指定されたジョイスティックが存在しないか、ゲームパッドのマッピングがない場合、この関数はGLFW_FALSEを返しますが、エラーは発生しません。glfwJoystickPresentを呼び出すと、マッピングの有無にかかわらず、ジョイスティックが存在するかどうかを調べることができます。

ガイドボタンはシステムやSteamクライアントによってフックされていることが多いため、入力できないことがあります。

すべてのデバイスがGLFWgamepadstateによって提供されるすべてのボタンや軸を持っているわけではありません。利用できないボタンと軸は、常にそれぞれGLFW_RELEASEと0.0を報告します。

```c
int glfwGetGamepadState(int jid, GLFWgamepadstate * state)
```

__引数__:

- `[in] jid`: 照会するジョイスティック。
- `[out] state`: ジョイスティックのゲームパッド入力状態。

__戻り値__:

成功した場合はGLFW_TRUE、ジョイスティックが接続されていない、ゲームパッドマッピングがない、エラーが発生した場合はGLFW_FALSEとなる。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_INVALID_ENUM である。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Gamepad input
- glfwUpdateGamepadMappings
- glfwJoystickIsGamepad

__追加__:

バージョン3.3で追加。
:::

::: details `glfwSetClipboardString()`
この関数は、指定されたUTF-8でエンコードされた文字列をシステムクリップボードに設定する。

```c
void glfwSetClipboardString(GLFWwindow * window, const char * string)
```

__引数__:

- `[in] window`: 非推奨。有効なウィンドウまたはNULL。
- `[in] string`: UTF-8でエンコードされた文字列。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

指定された文字列は、この関数が戻る前にコピーされる。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Clipboard input and output
- glfwGetClipboardString

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetClipboardString()`
この関数は、システムクリップボードの内容が UTF-8 でエンコードされた文字列を含むか、 または変換可能である場合に、その内容を返す。クリップボードが空であるか、その内容が変換できない場合、NULL が返され、 GLFW_FORMAT_UNAVAILABLE エラーが発生する。

```c
const char * glfwGetClipboardString(GLFWwindow * window)
```

__引数__:

- `[in] window`: 非推奨。有効なウィンドウまたはNULL。

__戻り値__:

クリップボードの内容をUTF-8エンコードした文字列、またはエラーが発生した場合はNULL。

__エラー__:

起こりうるエラーは、GLFW_NOT_INITIALIZED、 GLFW_FORMAT_UNAVAILABLE、GLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

返された文字列はGLFWによって割り当てられ、解放される。自分で解放してはならない．それは，次にglfwGetClipboardStringまたはglfwSetClipboardStringを呼ぶか，ライブラリが終了するまで有効である．

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Clipboard input and output
- glfwSetClipboardString

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetTime()`
この関数は現在の GLFW の時間を秒単位で返します。glfwSetTimeで時間が設定されていない限り、GLFWが初期化されてからの経過時間を測定する。

この関数とglfwSetTimeは、glfwGetTimerFrequencyとglfwGetTimerValueの上位のヘルパー関数です。

タイマーの分解能はシステムに依存するが、通常は数マイクロ秒またはナノ秒のオーダーである。サポートされている各プラットフォームで最も分解能の高い単調時間ソースを使用する。

```c
double glfwGetTime(void)
```

__戻り値__:

秒単位の現在時刻。エラーが発生した場合はゼロ。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。内部基準時刻の読み書きはアトミックではないので、glfwSetTimeの呼び出しと外部で同期させる必要がある。

__参照__:

- Time input

__追加__:

バージョン1.0で追加。
:::

::: details `glfwSetTime()`
この関数は現在のGLFW時間を秒単位で設定する。値は18446744073.0以下の正の有限数でなければならず、これは約584.5年である。

この関数とglfwGetTimeは、glfwGetTimerFrequencyとglfwGetTimerValueの上位のヘルパー関数です。

```c
void glfwSetTime(double time)
```

__引数__:

- `[in] time`: 秒単位の新しい値。

__エラー__:

起こりうるエラーは GLFW_NOT_INITIALIZED と GLFW_INVALID_VALUE である。

__備考__:

GLFW時間の上限はfloor((264 - 1) / 109)として計算され、実装がナノ秒を64ビットで保存するためである。この上限は将来引き上げられる可能性がある。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。内部基準時刻の読み書きはアトミックではないので、glfwGetTimeの呼び出しと外部で同期させる必要がある。

__参照__:

- Time input

__追加__:

バージョン2.2で追加。
:::

::: details `glfwGetTimerValue()`
この関数は、生のタイマーの現在値を 1 / 周波数の秒数で返します。周波数を取得するには、glfwGetTimerFrequencyを呼び出します。

```c
uint64_t glfwGetTimerValue(void)
```

__戻り値__:

タイマーの値。エラーが発生した場合はゼロ。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Time input
- glfwGetTimerFrequency

__追加__:

バージョン3.2で追加。
:::

::: details `glfwGetTimerFrequency()`
この関数は、生のタイマーの周波数をHz単位で返す。

```c
uint64_t glfwGetTimerFrequency(void )
```

__戻り値__:

タイマーの周波数をHzで表し、エラーが発生した場合はゼロ。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。

__参照__:

- Time input
- glfwGetTimerValue

__追加__:
バージョン3.2で追加。
:::
