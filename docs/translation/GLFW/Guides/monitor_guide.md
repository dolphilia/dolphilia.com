# GLFWモニターガイド（日本語訳）

[原文](https://www.glfw.org/docs/latest/monitor_guide.html)

このガイドでは、GLFWのモニター関連機能を紹介しています。このカテゴリの特定の機能の詳細については、[モニタのリファレンス](https://www.glfw.org/docs/latest/group__monitor.html)を参照してください。また、GLFWの他の領域のガイドもあります。

- [Introduction to the API](https://www.glfw.org/docs/latest/intro_guide.html)
- [Window guide](https://www.glfw.org/docs/latest/window_guide.html)
- [Context guide](https://www.glfw.org/docs/latest/context_guide.html)
- [Vulkan guide](https://www.glfw.org/docs/latest/vulkan_guide.html)
- [Input guide](https://www.glfw.org/docs/latest/input_guide.html)


## モニター対象

モニター・オブジェクトは現在接続されているモニターを表し、不透明な型GLFWmonitorへのポインタとして表現されます。モニターオブジェクトは、アプリケーションによって作成または破棄されることはなく、それらが表すモニターが切断されるか、ライブラリが終了するまで、そのアドレスが保持されます。

各モニターは、現在のビデオモード、サポートされているビデオモードのリスト、仮想位置、人間が読める名前、推定物理サイズ、ガンマランプを持ちます。モニタの1つがプライマリモニタである。

モニターの仮想位置はスクリーン座標で、現在のビデオモードとともに、接続されたモニターがそれらにまたがる仮想デスクトップに提供するビューポートを記述しています。

GLFWがあなたのモニターセットアップとその利用可能なビデオモードをどのように見るかを見るには、モニターテストプログラムを実行してください。


### モニターを取得する

プライマリモニタは、glfwGetPrimaryMonitorによって返されます。これはユーザーが好んで使用するモニターで、通常はタスクバーやメニューバーのようなグローバルなUI要素を持つものです。

```c
GLFWmonitor* primary = glfwGetPrimaryMonitor();
```

glfwGetMonitors で現在接続されているすべてのモニターを取得できます。返される配列の寿命については、リファレンスドキュメントを参照してください。

```c
int count;
GLFWmonitor** monitors = glfwGetMonitors(&count);
```

プライマリモニタは常に返された配列の最初のモニタですが、モニタが接続または切断されると、他のモニタは別のインデックスに移動されることがあります。


### コンフィギュレーション変更の監視

モニターの接続、切断時に通知を受けたい場合は、モニターコールバックを設定します。

```c
glfwSetMonitorCallback(monitor_callback);
```

コールバック関数は、接続または切断されたモニターのハンドルと発生したイベントを受信します。

```c
void monitor_callback(GLFWmonitor* monitor, int event)
{
    if (event == GLFW_CONNECTED)
    {
        // The monitor was connected
    }
    else if (event == GLFW_DISCONNECTED)
    {
        // The monitor was disconnected
    }
}
```

モニタが切断された場合、そのモニタ上でフルスクリーンになっているすべてのウィンドウは、コールバックが呼び出される前にウィンドウモードに切り替わります。glfwGetMonitorNameとglfwGetMonitorUserPointerだけが、切断されたモニターに対して、モニターコールバックが戻る前に、有用な値を返します。


## モニタープロパティ

各モニターは、現在のビデオモード、サポートされているビデオモードのリスト、仮想位置、コンテンツスケール、人間が読める名前、ユーザーポインタ、推定物理サイズ、ガンマランプを持つ。


### ビデオモード

GLFWは一般に、フルスクリーンウィンドウを作成したり、そのビデオモードを変更したり、ウィンドウのものをフルスクリーンにするときに、適切なビデオモードを選択するのに良い仕事をしますが、どのビデオモードがサポートされているかを正確に知っておくと便利な場合があります。

ビデオモードは GLFWvidmode 構造体として表現されます。モニターがサポートするビデオモードの配列は、glfwGetVideoModesで得ることができます。返される配列の寿命については、リファレンスドキュメントを参照してください。

```c
int count;
GLFWvidmode* modes = glfwGetVideoModes(monitor, &count);
```

モニタの現在のビデオモードを取得するには、glfwGetVideoModeを呼び出します。返されるポインタの寿命については、リファレンスドキュメントを参照してください。

```c
const GLFWvidmode* mode = glfwGetVideoMode(monitor);
```

ビデオモードの解像度はピクセルではなく、画面座標で指定します。


### 物理サイズ

ミリメートル単位のモニタの物理的サイズ、またはその推定値は、glfwGetMonitorPhysicalSizeで取得することができる。これは、現在の解像度、すなわち現在のビデオモードの幅と高さとは関係ない。

```c
int width_mm, height_mm;
glfwGetMonitorPhysicalSize(monitor, &width_mm, &height_mm);
```

これはモニターの生のDPIを計算するために使用することができますが、多くの場合、これは有用ではありません。代わりに、モニターコンテンツスケールとウィンドウコンテンツスケールを使用して、コンテンツをスケーリングしてください。


### コンテンツスケール

モニターのコンテンツスケールは、glfwGetMonitorContentScaleで取得することができます。

```c
float xscale, yscale;
glfwGetMonitorContentScale(monitor, &xscale, &yscale);
```

コンテンツスケールは、現在のDPIとプラットフォームのデフォルトDPIとの比率です。これは、テキストやUI要素で特に重要です。この比率でスケーリングされたUIのピクセル寸法があなたのマシンで適切に見えるなら、他のマシンではDPIやスケーリング設定に関係なく、妥当な大きさで表示されるはずです。これは、システムのDPIとスケーリング設定がある程度正しいことが前提になります。

コンテンツのスケールは、モニターの解像度とピクセル密度、およびユーザーの設定の両方に依存する場合があります。物理的なサイズと現在の解像度から計算される生のDPIとは大きく異なる場合があります。


### バーチャルポジション

仮想デスクトップ上のモニターの位置を画面座標で取得するには、glfwGetMonitorPosを使用します。

```c
int xpos, ypos;
glfwGetMonitorPos(monitor, &xpos, &ypos);
```


### 作業領域

グローバルタスクバーやメニューバーによって占有されていないモニタの領域は、ワークエリアです。これはスクリーン座標で指定され、glfwGetMonitorWorkareaで取得することができます。

```c
int xpos, ypos, width, height;
glfwGetMonitorWorkarea(monitor, &xpos, &ypos, &width, &height);
```


### 読みやすい名前

人間が読める、UTF-8でエンコードされたモニターの名前は、glfwGetMonitorNameによって返されます。返される文字列の寿命については、リファレンスドキュメントを参照してください。

```c
const char* name = glfwGetMonitorName(monitor);
```

モニターの名前は一意であることを保証するものではありません。同じモデル、メーカーの2台のモニターが同じ名前を持つことがあります。一意であることが保証されるのは、そのモニターが切断されるまでのモニターハンドルだけです。


### ユーザーポインタ

各モニターは、glfwSetMonitorUserPointerで設定し、glfwGetMonitorUserPointerで問い合わせることができるユーザーポインタを持っています。これは必要な目的に使用することができ、GLFWによって変更されることはありません。この値は，モニタが切断されるか，ライブラリが終了するまで保持されます．

ポインタの初期値はNULLである．

### ガンマランプ

モニターのガンマランプは、モニターハンドルとGLFWgammaramp構造体へのポインタを受け付けるglfwSetGammaRampで設定することができます。

```c
GLFWgammaramp ramp;
unsigned short red[256], green[256], blue[256];
 
ramp.size = 256;
ramp.red = red;
ramp.green = green;
ramp.blue = blue;
 
for (i = 0;  i < ramp.size;  i++)
{
    // ガンマランプアレイを任意に設定する。
}
 
glfwSetGammaRamp(monitor, &ramp);
```

ガンマランプデータは関数が戻る前にコピーされるので、ランプが設定された後にそれを保持する必要はありません。

ガンマランプは、そのモニタの現在のガンマランプと同じサイズにすることをお勧めします。

モニタの現在のガンマランプは、glfwGetGammaRampによって返されます。返された構造体の寿命については、リファレンスドキュメントを参照してください。

```c
const GLFWgammaramp* ramp = glfwGetGammaRamp(monitor);
```

もし、通常のガンマランプを設定したい場合は、glfwSetGamma を使って、希望する指数から GLFW に計算させることができ、その結果得られたランプで glfwSetGammaRamp を呼び出すことができます。

```c
glfwSetGamma(monitor, 1.0);
```

glfwSetGamma関数によるガンマ補正を試すには、ガンマテストプログラムを実行します。

> ソフトウェアで制御されるガンマランプは、ハードウェアのガンマ補正に加えて適用され、今日では通常 sRGB のガンマに近似しています。つまり、完全に直線的なランプ、つまりガンマ 1.0 を設定すると、デフォルトの（通常 sRGB に近い）動作になります。