# モニター

これは、モニターに関連する関数とタイプのリファレンス・ドキュメントである。タスク指向の情報については、モニターガイドを参照してください。

[[TOC]]

## 型定義

| 名前                     | 説明                                                           |
|--------------------------|----------------------------------------------------------------|
| `struct GLFWmonitor`     | 不透明なモニターオブジェクト。                                         |
| `void(* GLFWmonitorfun)` | モニター設定コールバックの関数ポインタ型。 |
| `struct GLFWvidmode`     | ビデオモードタイプ。                                               |
| `struct GLFWgammaramp`   | ガンマランプ。                                                    |

::: details `struct GLFWmonitor`
不透明なモニターオブジェクト。

```c
typedef struct GLFWmonitor GLFWmonitor
```

__参照__:

- Monitor objects

__追加__:

バージョン3.0で追加。
:::

::: details `void(* GLFWmonitorfun)`
これは、モニター設定コールバック用の関数ポインタ型である。モニター・コールバック関数は以下のシグネチャーを持ちます：

```c
void function_name(GLFWmonitor* monitor, int event)
```

---

```c
typedef void(* GLFWmonitorfun) (GLFWmonitor *monitor, int event)
```

__引数__:

- `[in] monitor`: 接続または切断されたモニター。
- `[in] event`: GLFW_CONNECTEDまたはGLFW_DISCONNECTEDのいずれか。将来のリリースでは、さらに多くのイベントが追加されるかもしれません。

__参照__:

- Monitor configuration changes
- glfwSetMonitorCallback

__追加__:

バージョン3.0で追加。
:::

::: details `struct GLFWvidmode`
単一のビデオモードについて説明する。

```c
typedef struct GLFWvidmode GLFWvidmode
```

__参照__:

- Video modes
- glfwGetVideoMode
- glfwGetVideoModes

__追加__:

バージョン1.0で追加。GLFW 3: リフレッシュレートメンバーを追加。
:::

::: details `struct GLFWgammaramp`
モニターのガンマランプについて説明します。

```c
typedef struct GLFWgammaramp GLFWgammaramp
```

__参照__:

- Gamma ramp
- glfwGetGammaRamp
- glfwSetGammaRamp

__追加__:

バージョン3.0で追加。
:::

## 関数

| 関数名                     | 説明                                                                  |
|----------------------------|-----------------------------------------------------------------------|
| glfwGetMonitors            | 現在接続されているモニターを返します。                             |
| glfwGetPrimaryMonitor      | プライマリモニタを返します。                                          |
| glfwGetMonitorPos          | 仮想画面上のモニターのビューポートの位置を返します。 |
| glfwGetMonitorWorkarea     | モニターの作業領域を取得します。                               |
| glfwGetMonitorPhysicalSize | モニターの物理的なサイズを返します。                             |
| glfwGetMonitorContentScale | 指定したモニターのコンテンツスケールを取得します。                |
| glfwGetMonitorName         | 指定されたモニターの名前を返します。                            |
| glfwSetMonitorUserPointer  | 指定したモニターのユーザーポインターを設定します。                       |
| glfwGetMonitorUserPointer  | 指定されたモニターのユーザーポインタを返します。                    |
| glfwSetMonitorCallback     | モニター設定コールバックを設定します。                              |
| glfwGetVideoModes          | 指定したモニターで利用可能なビデオモードを返します。          |
| glfwGetVideoMode           | 指定されたモニターの現在のモードを返します。                    |
| glfwSetGamma               | ガンマランプを生成し、指定されたモニターに設定する。         |
| glfwGetGammaRamp           | 指定されたモニターの現在のガンマランプを返します。             |
| glfwSetGammaRamp           | 指定したモニターの現在のガンマランプを設定します。                |

::: details `glfwGetMonitors()`
この関数は、現在接続されているすべてのモニターのハンドルの配列を返す。プライマリ・モニターは常に返される配列の最初にある。モニターが見つからなかった場合、この関数は NULL を返します。

```c
GLFWmonitor ** glfwGetMonitors(int * count)
```

__引数__:

- `[out] count`: 返された配列のモニター数を格納する場所。エラーが発生した場合は0がセットされる。

__戻り値__:

モニターハンドルの配列、またはモニターが見つからなかったかエラーが発生した場合はNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__ポインタの寿命__:

返された配列はGLFWによって割り当てられ、解放される。自分で解放してはならない。モニターの設定が変更されるか、ライブラリーが終了するまで有効であることが保証される。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Retrieving monitors
- Monitor configuration changes
- glfwGetPrimaryMonitor

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetPrimaryMonitor()`
この関数はプライマリモニタを返す。これは通常、タスクバーやグローバルメニューバーのような要素が配置されているモニターである。

```c
GLFWmonitor * glfwGetPrimaryMonitor(void )
```

__戻り値__:

プライマリモニタ、またはモニタが見つからないかエラーが発生した場合はNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__備考__:

プライマリモニタは、glfwGetMonitorsが返す配列の中で常に最初になる。

__参照__:

- Retrieving monitors
- glfwGetMonitors

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetMonitorPos()`
この関数は、指定されたモニターの左上隅の位置をスクリーン座標で返す。

position引数のいずれか、またはすべてがNULLであってもよい。エラーが発生した場合、NULLでない位置引数はすべて0に設定されます。

```c
void glfwGetMonitorPos(GLFWmonitor * monitor, int * xpos, int * ypos)
```

__引数__:

- `[in] monitor`: 問い合わせるモニター。
- `[out] xpos`: モニターのX座標を格納する場所、またはNULL。
- `[out] ypos`: モニターのy座標を格納する場所、またはNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Monitor properties

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetMonitorWorkarea()`
この関数は、指定されたモニタの作業領域の左上隅の位置と、作業領域のサイズを画面座標で返す。作業領域は、オペレーティングシステムのタスクバーが存在する場合、それに遮られないモニタの領域として定義される。タスクバーが存在しない場合、作業領域はスクリーン座標でのモニター解像度となる。

positionとsizeの引数のいずれか、またはすべてがNULLであってもよい。エラーが発生した場合、NULLでない位置とサイズの引数はすべて0に設定される。

```c
void glfwGetMonitorWorkarea(GLFWmonitor * monitor, int * xpos, int * ypos, int * width, int * height)
```

__引数__:

- `[in] monitor`: 問い合わせるモニター。
- `[out] xpos`: モニターのX座標を格納する場所、またはNULL。
- `[out] ypos`: モニターのy座標を格納する場所、またはNULL。
- `[out] width`: モニター幅を格納する場所、またはNULL。
- `[out] height`: モニターの高さを格納する場所、またはNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Work area

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetMonitorPhysicalSize()`
この関数は、指定されたモニターの表示領域のサイズをミリメートル単位で返します。

システムによっては、モニタのEDIDデータが正しくないか、ドライバが正確に報告しないために、正確なモニタサイズ情報を提供しないものがある。

size引数のいずれかまたはすべてがNULLであってもよい。エラーが発生した場合、NULLでないsize引数はすべて0に設定されます。

```c
void glfwGetMonitorPhysicalSize(GLFWmonitor * monitor, int * widthMM, int * heightMM)
```

__引数__:

- `[in] monitor`: 問い合わせるモニター。
- `[out] widthMM`: モニターの表示領域の幅をミリメートル単位で格納する場所、またはNULL。
- `[out] heightMM`: モニターの表示領域の高さをミリメートル単位で格納する場所、またはNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__備考__:

Windows: Windows 8以前では、モニターのEDIDデータを照会する代わりに、現在の解像度とシステムDPIから物理サイズが計算されます。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Monitor properties

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetMonitorContentScale()`
この関数は、指定されたモニタのコンテンツスケールを取得する。コンテンツスケールは、現在のDPIとプラットフォームのデフォルトDPIとの比率です。これはテキストやUI要素にとって特に重要です。これによってスケーリングされたUIのピクセル寸法があなたのマシンで適切に見えるなら、他のマシンではDPIやスケーリング設定に関係なく、妥当なサイズで表示されるはずです。これは、システムのDPIとスケーリング設定がある程度正しいことに依存します。

コンテンツのスケールは、モニターの解像度とピクセル密度、およびユーザー設定の両方に依存します。物理的なサイズと現在の解像度から計算される生のDPIとは大きく異なる場合があります。

```c
void glfwGetMonitorContentScale(GLFWmonitor * monitor, float * xscale, float * yscale)
```

__引数__:

- `[in] monitor`: 問い合わせるモニター。
- `[out] xscale`: X軸の内容スケールを格納する場所、または NULL。
- `[out] yscale`: Y軸の内容スケールを格納する場所、または NULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Content scale
- glfwGetWindowContentScale

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetMonitorName()`
この関数は、指定されたモニターの、UTF-8でエンコードされた人間が読める名前を返す。この名前は通常、モニターのメーカーとモデルを反映しており、接続されているモニター間で一意であることは保証されていません。

```c
const char * glfwGetMonitorName(GLFWmonitor * monitor)
```

__引数__:

- `[in] monitor`: 問い合わせるモニター。

__戻り値__:

UTF-8エンコードされたモニター名、またはエラーが発生した場合はNULL。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__ポインタの寿命__:

返された文字列はGLFWによって割り当てられ、解放される。自分で解放してはならない．指定されたモニターが切断されるか、ライブラリが終了するまで有効です。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Monitor properties

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetMonitorUserPointer()`
この関数は、指定されたモニタのユーザ定義ポインタを設定する。 現在の値は、モニターが切断されるまで保持される。 初期値はNULL。

この関数は、切断中のモニターであっても、モニター・コールバックから呼び出すことができる。

```c
void glfwSetMonitorUserPointer(GLFWmonitor * monitor, void * pointer)
```

__引数__:

- `[in] monitor`: ポインタを設定するモニター。
- `[in] pointer`: 新しい値。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__参照__:

- User pointer
- glfwGetMonitorUserPointer

__追加__:

バージョン3.3で追加。
:::

::: details `glfwGetMonitorUserPointer()`
この関数は、指定されたモニターのユーザー定義ポインターの現在値を返す。初期値は NULL です。

この関数は、切断中のモニタに対しても、モニタコールバックから呼び出すことができます。

```c
void * glfwGetMonitorUserPointer(GLFWmonitor * monitor)
```

__引数__:

- `[in] monitor`: ポインタを返すモニター。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はどのスレッドからでも呼び出すことができる。アクセスは同期化されない。

__参照__:

- User pointer
- glfwSetMonitorUserPointer

__追加__:

バージョン3.3で追加。
:::

::: details `glfwSetMonitorCallback()`
この関数は、モニター設定コールバックを設定するか、または現在設定されているコールバックを削除します。この関数は、モニターがシステムに接続されたとき、またはシステムから切断されたときに呼び出されます。

```c
GLFWmonitorfun glfwSetMonitorCallback(GLFWmonitorfun callback)
```

__引数__:

- `[in] callback`: 新しいコールバック、または現在設定されているコールバックを削除する場合は NULL。

__戻り値__:

コールバックが設定されていないか、ライブラリが初期化されていない場合はNULL。

__コールバックのシグネチャ__:

```c
void function_name(GLFWmonitor* monitor, int event)
```

コールバック・パラメータの詳細については、関数ポインタ型を参照のこと。

__エラー__:

考えられるエラーはGLFW_NOT_INITIALIZED。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Monitor configuration changes

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetVideoModes()`
この関数は、指定されたモニタがサポートするすべてのビデオモードの配列を返す。返される配列は昇順でソートされ、最初に色ビット深度（すべてのチャンネル深度の合計）、次に解像度領域（幅と高さの積）、次に解像度幅、最後にリフレッシュレートが指定される。

```c
const GLFWvidmode * glfwGetVideoModes(GLFWmonitor * monitor, int * count)
```

__引数__:

- `[in] monitor`: 問い合わせるモニター。
- `[out] count`: ビデオモードの数を返す配列のどこに格納するか。エラーが発生した場合は 0 が格納される。

__戻り値__:

ビデオモードの配列。エラーが発生した場合は NULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

返された配列はGLFWによって割り当てられ、解放される。自分で解放してはならない。指定されたモニターが切断されるか、そのモニターに対してこの関数が再度呼び出されるか、ライブラリーが終了するまで有効です。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Video modes
- glfwGetVideoMode

__追加__:

バージョン1.0で追加。GLFW 3: 特定のモニターのモードの配列を返すように変更。
:::

::: details `glfwGetVideoMode()`
This function returns the current video mode of the specified monitor. If you have created a full screen window for that monitor, the return value will depend on whether that window is iconified.

```c
const GLFWvidmode * glfwGetVideoMode(GLFWmonitor * monitor)
```

__引数__:

- `[in] monitor`: 問い合わせるモニター。

__戻り値__:

モニターの現在のモード、またはエラーが発生した場合はNULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__ポインタの寿命__:

返された配列はGLFWによって割り当てられ、解放される。自分で解放してはならない．指定されたモニターが切断されるか、ライブラリが終了するまで有効です。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Video modes
- glfwGetVideoModes

__追加__:

バージョン 3.0 で追加されました。glfwGetDesktopMode を置き換える。
:::

::: details `glfwSetGamma()`
この関数は、指定された指数から適切な大きさのガンマ・ランプを生成し、それを使って glfwSetGammaRamp を呼び出します。この値はゼロより大きい有限の数でなければならない。

ソフトウェアで制御されるガンマランプは、ハードウェアのガンマ補正に加えて適用されます。つまり、完全に直線的なランプ、つまりガンマ1.0を設定すると、デフォルトの（通常はsRGBに近い）動作になります。

OpenGLまたはOpenGL ESでのガンマ補正レンダリングについては、GLFW_SRGB_CAPABLEヒントを参照してください。

```c
void glfwSetGamma(GLFWmonitor * monitor, float gamma)
```

__引数__:

- `[in] monitor`: ガンマランプを設定するモニター。
- `[in] gamma`: 希望する指数。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZED、GLFW_INVALID_VALUE、GLFW_PLATFORM_ERRORである。

__備考__:

Wayland: ガンマ処理は特権プロトコルであるため、この関数は決して実装されず、GLFW_PLATFORM_ERRORを返す。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Gamma ramp

__追加__:

バージョン3.0で追加。
:::

::: details `glfwGetGammaRamp()`
この関数は、指定されたモニターの現在のガンマランプを返します。

```c
const GLFWgammaramp * glfwGetGammaRamp(GLFWmonitor * monitor)
```

__引数__:

- `[in] monitor`: 問い合わせるモニター。

__戻り値__:

現在のガンマランプ、またはエラーが発生した場合は NULL。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

Wayland: ガンマ処理は特権プロトコルであるため、この関数は決して実装されず、NULLを返しながらGLFW_PLATFORM_ERRORを発する。

__ポインタの寿命__:

返された構造体とその配列はGLFWによって割り当てられ、解放される。自分で解放してはならない．それらは、指定されたモニターが切断されるか、そのモニターに対してこの関数が再び呼ばれるか、ライブラリーが終了するまで有効です。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Gamma ramp

__追加__:

バージョン3.0で追加。
:::

::: details `glfwSetGammaRamp()`
この関数は、指定されたモニターの現在のガンマランプを設定します。そのモニタのオリジナルのガンマランプは、この関数が最初に呼ばれたときにGLFWによって保存され、glfwTerminateによって復元されます。

ソフトウェアで制御されるガンマランプは、ハードウェアのガンマ補正に加えて適用されます。つまり、完全に直線的なランプ、つまりガンマ1.0を設定すると、デフォルトの（通常はsRGBに近い）動作になります。

OpenGLまたはOpenGL ESでのガンマ補正レンダリングについては、GLFW_SRGB_CAPABLEヒントを参照してください。

```c
void glfwSetGammaRamp(GLFWmonitor * monitor, const GLFWgammaramp * ramp)
```

__引数__:

- `[in] monitor`: ガンマランプを設定するモニター。
- `[in] ramp`: 使用するガンマランプ。

__エラー__:

起こりうるエラーはGLFW_NOT_INITIALIZEDとGLFW_PLATFORM_ERRORである。

__備考__:

指定されたガンマ・ランプのサイズは、そのモニターの現在のランプのサイズと一致しなければならない。

- Windows: ガンマランプのサイズは256でなければならない。
- Wayland: ガンマ処理は特権プロトコルであるため、この関数は決して実装されず、GLFW_PLATFORM_ERRORを返す。

__ポインタの寿命__:

指定されたガンマランプは、この関数が戻る前にコピーされる。

__スレッドセーフ__:

この関数はメインスレッドからのみ呼び出されなければならない。

__参照__:

- Gamma ramp

__追加__:

バージョン3.0で追加。
:::
