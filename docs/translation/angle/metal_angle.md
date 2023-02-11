# MetalANGLE - OpenGL ESからApple Metal APIへの変換レイヤー

[原文](https://github.com/kakashidinho/metalangle/blob/master/README.md)

[![ビルド状況](https://ci.appveyor.com/api/projects/status/github/kakashidinho/metalangle?svg=true&branch=master)](https://ci.appveyor.com/project/kakashidinho/metalangle)
[![ビルド状況](https://github.com/kakashidinho/metalangle/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/kakashidinho/metalangle/actions?query=branch%3Amaster)

Googleの[ANGLEプロジェクト](https://chromium.googlesource.com/angle/angle)をフォークしたものです。Metal APIのバックエンドサポートを追加しています。Appleは2018年にOpenGL(ES)の非推奨を発表しました。そこで、MetalANGLEの目的は、OpenGL ESの描画コールをMetalの描画コールにフード内で変換することにより、OpenGL ESアプリケーションがAppleプラットフォーム上で引き続き動作するようにすることです。また、OpenGL ES & Metalの相互運用もサポートします。

__2021年6月30日更新:__ このレポのOpenGL ES 3.0をMetalで実装するコードのほとんどは、公式の `ANGLE` レポにマージされています。当初、Metalのバックエンドの開発はここだけで行われていました。アップル社も修正を行っており、その変更を公式の `ANGLE` にマージしている最中なので、現在はそうではありません。現在の [MetalANGLEと公式ANGLEの違い] (#differences-between-metalangle-and-googles-angle) を参照してください。

MetalベースのWebGLベンチマーク（[gles3-dev branch](https://github.com/kakashidinho/metalangle/tree/gles3-dev)のコードをベースにした予備的なものです。）

- Metal（54fps）対ネイティブOpenGL（46fps）で20k匹の魚を描画。:
![](src/libANGLE/renderer/metal/metal_vs_gl_aquarium_webgl.jpg)
- このベンチマークは、AMD Radeon Pro 560 GPUを使用したChromiumブラウザ上で[https://webglsamples.org/aquarium/aquarium.html](https://webglsamples.org/aquarium/aquarium.html)を実行します。.


### 現在のMetalバックエンドの実装状況

- MetalANGLEはANGLEの公式レポに移行されました。現在の[MetalANGLEと公式ANGLEの違い](#differences-between-metalangle-and-googles-angle)をご覧ください。
- __OpenGL ES 2.0__ の機能は100％完成しています。
- __OpenGL ES 3.0__ の状態になります。
  - [x] オクルージョンのクエリ。
  - [x] MSAA.
  - [x] 複数のレンダーターゲット (__古い iOS GPU では、[ピクセルストレージの制限](https://developer.apple.com/documentation/metal/texturesunderstanding_color-renderable_pixel_format_sizes?language=objc) のため、すべての GL フォーマットがサポートされているわけではありません__。問題64](https://github.com/kakashidinho/metalangle/issues/64)を参照してください)。
  - [x] 3D、アレイ、シャドウテクスチャ。
  - [x] テクスチャースウィズル (__supported on iOS 13.0+, macOS 10.15+ only__).
  - [x] ユニフォームバッファー。
  - [x] フェンスシンク (__supported on iOS 12.0+, macOS 10.14+ only__).
  - [x] ピクセルバッファオブジェクト。
  - [ ] プリミティブなリスタートMetalのプリミティブリスタートは確実に動作しません。
  - [ ] 最後に生成された頂点でフラットシェーディングを行う。Metalのデフォルトは最初の頂点です。
  - [x] フィードバックを変換する。
- __OpenGL ES 1.0__ は使用することをお勧めしません。この実装はオリジナルの `ANGLE` プロジェクトによって積極的にメンテナンスされておらず、現在バグだらけで完全には準拠していない。
- 基本的なサンプルはすべて動作しています。
- __ANGLEのエンドツーエンドテストは、ほぼ全て合格しています__. [失敗したテストの一覧](src/libANGLE/renderer/metal/README.md#Failed-ANGLE-end2-tests)を参照してください。
- __OpenGL ES 2.0コンフォーマンステストの98%に合格__. __90%以上のOpenGL ES 3.0コンフォーマンステストに合格__. [Khronos VK-GL-CTS](https://github.com/KhronosGroup/VK-GL-CTS)をご参照ください。
- これらの拡張機能は実装されています。
  - [x] [EXT_instanced_arrays](https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_instanced_arrays.txt)/[ANGLE_instanced_arrays](https://www.khronos.org/registry/OpenGL/extensions/ANGLE/ANGLE_instanced_arrays.txt): GLES 2.0用のインスタンスドローコール。
  - [x] [OES_depth_texture](https://www.khronos.org/registry/OpenGL/extensions/OES/OES_depth_texture.txt).
  - [x] [EXT_draw_buffers](https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_draw_buffers.txt): GLES 2.0に対応した複数のレンダーターゲット。
  - [x] [ANGLE_framebuffer_blit](https://www.khronos.org/registry/OpenGL/extensions/ANGLE/ANGLE_framebuffer_blit.txt).
  - [x] [APPLE_clip_distance](https://www.khronos.org/registry/OpenGL/extensions/APPLE/APPLE_clip_distance.txt): カスタムクリッププレーン
- [MGLKit](src/libANGLE/renderer/metal/DevSetup.md#MGLKit) ユーティリティクラスが追加されました。AppleのGLKitと似たような機能を提供します。
- Urho3Dエンジンのデモは、MetalANGLEを使用して問題なくテストされています。[Urho3D's MetalANGLE integration testing branch](https://github.com/kakashidinho/Urho3D/tree/angle-metal-backend)を参照してください。
- Irrlicht EngineのMetalANGLEサンプルとの連携。 [https://github.com/kakashidinho/irrlicht](https://github.com/kakashidinho/irrlicht).
- Metalとの相互運用がサポートされています。Qtの例: https://github.com/kakashidinho/qml-metalangle を参照してください。
- ~~No `GL_TRIANGLE_FAN` & `GL_LINE_LOOP` support in draw calls yet.~~
- Metalはバッファオフセットが4バイトの倍数でないことや、アトリビュートサイズの倍数でないことを許しません。したがって、サポートされていないオフセット、ストライド、および頂点フォーマットを使用する描画コールは、MetalANGLEがオンザフライで変換を行うことを余儀なくされます。
- ~~MSAA is not supported yet.~~
- 古いOpenGL ES 2.0のみの実装は、[gles2 branch](https://github.com/kakashidinho/metalangle/tree/gles2)で見ることができます。
- __対応プラットフォーム__:
  - MetalANGLEは、Macの __MacOS 10.13+__ のみ対応しています。.
  - iOSの場合、最小サポートバージョンは __iOS 9.0__ です。それ以前のバージョンでは、Metalの代わりにApple OpenGL ESのネイティブ実装を使用するようになります。さらに、ほとんどのサンプルアプリは __iOS11.0+__ 用にコンパイルされています。そのため、10.0以下のデバイスでサンプルアプリをテストしたい場合、一部のもの（例：MGLKitSampleApp_ios9.0）を除き、実行することはできません。
  - iPhone 5以下はサポート対象外です。
  - __MacCatalyst 13.0+__ に対応しています。


#### TODO lists
- [ ] ANGLEのすべてのテストに合格していることを確認。
- [x] ~~Support `GL_TRIANGLE_FAN` & `GL_LINE_LOOP` by generating index buffer on the fly using Metal compute shader.~~
- [x] ~~Use compute shader to convert unsupported offsets, strides & vertex formats.~~
- [x] ~~Support MSAA.~~
- [ ] OpenGL ES 3.0に完全対応。


## MacOS & iOS用Metal ANGLEのビルド方法

[MetalバックエンドのDevセットアップ手順](src/libANGLE/renderer/metal/DevSetup.md)をご覧ください。

現在、便宜上、MetalANGLEは `ios/xcode` と `mac/xcode` フォルダにあるXcodeプロジェクトを使ってビルドすることもできます。このXcodeプロジェクトでは、アップルが提供するGLKitのクラスである `CAEAGLContext`, `MGLLayer`, `MGLKView`, `GLKViewController` と同様のユーティリティラッパーである [MGLKit](src/libANGLE/renderer/metal/DevSetup.md#MGLKit) も構築されています。このライブラリを使ったiOSアプリのサンプルは `MGLKitSamples.xcodeproj` を開いてください。この [documents] (src/libANGLE/renderer/metal/DevSetup.md#MGLKit) には `GLKit` アプリを `MGLKit` に移植するためのいくつかのガイドが含まれています。

それでも、[MetalバックエンドのDevセットアップ手順] (src/libANGLE/renderer/metal/DevSetup.md) にあるように、必要な環境と依存関係を適切に設定することが先決です。


## MetalANGLEとGoogleのANGLEの相違点

- 2021年6月以前は、Metalのバックエンドのコードの大半は `MetalANGLE` と `ANGLE` で共有されています。
- 2021年8月～9月以降、アップルから直接 `ANGLE` リポジトリにいくつかの変更が加えられる予定です。これらの変更は、開発上のコンフリクトのため `MetalANGLE` に含まれないかもしれません。Appleの変更のほとんどは、WebkitのWebGLの標準に役立つもので、通常の使用では最適なパフォーマンスが得られないかもしれません。Apple からの変更点は以下の通りです。
    - フラットシェーディングの最後の挑発頂点をサポートするために、 インデックスバッファをオンザフライで書き直しました。これは、OpenGL ES のフラットシェーディングの仕様に準拠 するのに役立ちますが、フラットシェーディングを使用する描画コールが 遅くなります。多くの使用例では、フラットシェーディングが最後の頂点と最初の頂点 のどちらを使用するかは、ユーザは気にしないでしょう。
- `MetalANGLE` は iOS をサポートし、Apple の非推奨 API である `EAGL` & `GLKit` を模倣した [MGLKit](src/libANGLE/renderer/metal/DevSetup.md#MGLKit) などの高レベル API を含んでいます。これらの機能は `ANGLE` にマージされることはないでしょう。なぜなら `ANGLE` プロジェクトは近い将来 iOS をサポートする予定がないからです。


------


# GoogleのANGLE - ほぼネイティブなグラフィックスレイヤーエンジン

The goal of ANGLE is to allow users of multiple operating systems to seamlessly run WebGL and other
OpenGL ES content by translating OpenGL ES API calls to one of the hardware-supported APIs available
for that platform. ANGLE currently provides translation from OpenGL ES 2.0 and 3.0 to desktop
OpenGL, OpenGL ES, Direct3D 9, and Direct3D 11. Support for translation from OpenGL ES to Vulkan is
underway, and future plans include compute shader support (ES 3.1) and MacOS support.


### Level of OpenGL ES support via backing renderers

|                |  Direct3D 9   |  Direct3D 11     |   Desktop GL   |    GL ES      |    Vulkan     |    Metal      |
|----------------|:-------------:|:----------------:|:--------------:|:-------------:|:-------------:|:-------------:|
| OpenGL ES 2.0  |    complete   |    complete      |    complete    |   complete    |    complete   |  complete     |
| OpenGL ES 3.0  |               |    complete      |    complete    |   complete    |  in progress  |  90% complete |
| OpenGL ES 3.1  |               |   in progress    |    complete    |   complete    |  in progress  |               |
| OpenGL ES 3.2  |               |                  |    planned     |    planned    |    planned    |               |


### Platform support via backing renderers

|             |    Direct3D 9  |   Direct3D 11  |   Desktop GL  |    GL ES    |   Vulkan    |    Metal    |
|------------:|:--------------:|:--------------:|:-------------:|:-----------:|:-----------:|:-----------:|
| Windows     |    complete    |    complete    |   complete    |   complete  |   complete  |             |
| Linux       |                |                |   complete    |             |   complete  |             |
| Mac OS X    |                |                |   complete    |             |             | complete    |
| iOS         |                |                |               |             |             | complete    |
| Chrome OS   |                |                |               |   complete  |   planned   |             |
| Android     |                |                |               |   complete  |   complete  |             |
| Fuchsia     |                |                |               |             | in progress |             |

ANGLE v1.0.772 was certified compliant by passing the ES 2.0.3 conformance tests in October 2011.
ANGLE also provides an implementation of the EGL 1.4 specification.

ANGLE is used as the default WebGL backend for both Google Chrome and Mozilla Firefox on Windows
platforms. Chrome uses ANGLE for all graphics rendering on Windows, including the accelerated
Canvas2D implementation and the Native Client sandbox environment.

Portions of the ANGLE shader compiler are used as a shader validator and translator by WebGL
implementations across multiple platforms. It is used on Mac OS X, Linux, and in mobile variants of
the browsers. Having one shader validator helps to ensure that a consistent set of GLSL ES shaders
are accepted across browsers and platforms. The shader translator can be used to translate shaders
to other shading languages, and to optionally apply shader modifications to work around bugs or
quirks in the native graphics drivers. The translator targets Desktop GLSL, Direct3D HLSL, and even
ESSL for native GLES2 platforms.


## Sources

ANGLE repository is hosted by Chromium project and can be
[browsed online](https://chromium.googlesource.com/angle/angle) or cloned with

    git clone https://chromium.googlesource.com/angle/angle


## Building

View the [Dev setup instructions](doc/DevSetup.md).


## Contributing

* Join our [Google group](https://groups.google.com/group/angleproject) to keep up to date.
* Join us on IRC in the #ANGLEproject channel on FreeNode.
* Join us on [Slack](https://chromium.slack.com) in the #angle channel.
* [File bugs](http://anglebug.com/new) in the [issue tracker](https://bugs.chromium.org/p/angleproject/issues/list) (preferably with an isolated test-case).
* [Choose an ANGLE branch](doc/ChoosingANGLEBranch.md) to track in your own project.


* Read ANGLE development [documentation](doc).
* Look at [pending](https://chromium-review.googlesource.com/q/project:angle/angle+status:open)
  and [merged](https://chromium-review.googlesource.com/q/project:angle/angle+status:merged) changes.
* Become a [code contributor](doc/ContributingCode.md).
* Use ANGLE's [coding standard](doc/CodingStandard.md).
* Learn how to [build ANGLE for Chromium development](doc/BuildingAngleForChromiumDevelopment.md).
* Get help on [debugging ANGLE](doc/DebuggingTips.md).
* Go through [ANGLE's orientation](doc/Orientation.md) and sift through [starter projects](doc/Starter-Projects.md).


* Read about WebGL on the [Khronos WebGL Wiki](http://khronos.org/webgl/wiki/Main_Page).
* Learn about implementation details in the [OpenGL Insights chapter on ANGLE](http://www.seas.upenn.edu/~pcozzi/OpenGLInsights/OpenGLInsights-ANGLE.pdf) and this [ANGLE presentation](https://drive.google.com/file/d/0Bw29oYeC09QbbHoxNE5EUFh0RGs/view?usp=sharing).
* Learn about the past, present, and future of the ANGLE implementation in [this presentation](https://docs.google.com/presentation/d/1CucIsdGVDmdTWRUbg68IxLE5jXwCb2y1E9YVhQo0thg/pub?start=false&loop=false).
* Watch a [short presentation](https://youtu.be/QrIKdjmpmaA) on the Vulkan back-end.
* Track the [dEQP test conformance](doc/dEQP-Charts.md)
* Read design docs on the [Vulkan back-end](src/libANGLE/renderer/vulkan/README.md)
* If you use ANGLE in your own project, we'd love to hear about it!