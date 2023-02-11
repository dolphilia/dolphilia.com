# MetalANGLE - OpenGL ESからApple Metal APIへの変換レイヤー

[原文](https://github.com/kakashidinho/metalangle/blob/master/README.md)

Googleの[ANGLEプロジェクト](https://chromium.googlesource.com/angle/angle)をフォークしたものです。Metal APIのバックエンドサポートを追加しています。Appleは2018年にOpenGL(ES)の非推奨を発表しました。そこで、MetalANGLEの目的は、OpenGL ESの描画コールをMetalの描画コールにフード内で変換することにより、OpenGL ESアプリケーションがAppleプラットフォーム上で引き続き動作するようにすることです。また、OpenGL ES & Metalの相互運用もサポートします。

__2021年6月30日更新:__ このレポのOpenGL ES 3.0をMetalで実装するコードのほとんどは、公式の `ANGLE` レポにマージされています。当初、Metalのバックエンドの開発はここだけで行われていました。アップル社も修正を行っており、その変更を公式の `ANGLE` にマージしている最中なので、現在はそうではありません。現在の [MetalANGLEと公式ANGLEの違い] (#differences-between-metalangle-and-googles-angle) を参照してください。

MetalベースのWebGLベンチマーク（[gles3-dev branch](https://github.com/kakashidinho/metalangle/tree/gles3-dev)のコードをベースにした予備的なものです。）

- Metal（54fps）対ネイティブOpenGL（46fps）で20k匹の魚を描画。:
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
- __ANGLEのエンドツーエンドテストは、ほぼ全て合格しています__. 失敗したテストの一覧を参照してください。
- __OpenGL ES 2.0コンフォーマンステストの98%に合格__. __90%以上のOpenGL ES 3.0コンフォーマンステストに合格__. [Khronos VK-GL-CTS](https://github.com/KhronosGroup/VK-GL-CTS)をご参照ください。
- これらの拡張機能は実装されています。
  - [x] [EXT_instanced_arrays](https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_instanced_arrays.txt)/[ANGLE_instanced_arrays](https://www.khronos.org/registry/OpenGL/extensions/ANGLE/ANGLE_instanced_arrays.txt): GLES 2.0用のインスタンスドローコール。
  - [x] [OES_depth_texture](https://www.khronos.org/registry/OpenGL/extensions/OES/OES_depth_texture.txt).
  - [x] [EXT_draw_buffers](https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_draw_buffers.txt): GLES 2.0に対応した複数のレンダーターゲット。
  - [x] [ANGLE_framebuffer_blit](https://www.khronos.org/registry/OpenGL/extensions/ANGLE/ANGLE_framebuffer_blit.txt).
  - [x] [APPLE_clip_distance](https://www.khronos.org/registry/OpenGL/extensions/APPLE/APPLE_clip_distance.txt): カスタムクリッププレーン
- MGLKitユーティリティクラスが追加されました。AppleのGLKitと似たような機能を提供します。
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

MetalバックエンドのDevセットアップ手順をご覧ください。

現在、便宜上、MetalANGLEは `ios/xcode` と `mac/xcode` フォルダにあるXcodeプロジェクトを使ってビルドすることもできます。このXcodeプロジェクトでは、アップルが提供するGLKitのクラスである `CAEAGLContext`, `MGLLayer`, `MGLKView`, `GLKViewController` と同様のユーティリティラッパーである MGLKit も構築されています。このライブラリを使ったiOSアプリのサンプルは `MGLKitSamples.xcodeproj` を開いてください。この documents には `GLKit` アプリを `MGLKit` に移植するためのいくつかのガイドが含まれています。

それでも、MetalバックエンドのDevセットアップ手順 にあるように、必要な環境と依存関係を適切に設定することが先決です。


## MetalANGLEとGoogleのANGLEの相違点

- 2021年6月以前は、Metalのバックエンドのコードの大半は `MetalANGLE` と `ANGLE` で共有されています。
- 2021年8月～9月以降、アップルから直接 `ANGLE` リポジトリにいくつかの変更が加えられる予定です。これらの変更は、開発上のコンフリクトのため `MetalANGLE` に含まれないかもしれません。Appleの変更のほとんどは、WebkitのWebGLの標準に役立つもので、通常の使用では最適なパフォーマンスが得られないかもしれません。Apple からの変更点は以下の通りです。
    - フラットシェーディングの最後の挑発頂点をサポートするために、 インデックスバッファをオンザフライで書き直しました。これは、OpenGL ES のフラットシェーディングの仕様に準拠 するのに役立ちますが、フラットシェーディングを使用する描画コールが 遅くなります。多くの使用例では、フラットシェーディングが最後の頂点と最初の頂点 のどちらを使用するかは、ユーザは気にしないでしょう。
- `MetalANGLE` は iOS をサポートし、Apple の非推奨 API である `EAGL` & `GLKit` を模倣した MGLKit などの高レベル API を含んでいます。これらの機能は `ANGLE` にマージされることはないでしょう。なぜなら `ANGLE` プロジェクトは近い将来 iOS をサポートする予定がないからです。