# GLFWイントロダクション（日本語訳）

[原文](https://www.glfw.org/docs/latest/index.html)

GLFWはOpenGL・OpenGL ES・Vulkanアプリケーション開発のためのフリー・オープンソース・マルチプラットフォームライブラリです。ウィンドウ・コンテキスト・サーフェスの作成・入力の読み取り・イベントの処理など、シンプルでプラットフォームに依存しないAPIを提供します。

[バージョン3.3のリリースノート](https://www.glfw.org/docs/latest/news.html#news_33)には、新機能、注意点、非推奨事項が記載されています。

[Getting started](https://www.glfw.org/docs/latest/quick_guide.html)はGLFWを初めて使うユーザーのためのガイドです。小さいけれども完全なプログラムを書く方法を説明します。

API の各セクションのガイドがあります。

- [API入門](https://www.glfw.org/docs/latest/intro_guide.html) - 初期化・エラー処理・ハイレベルなデザイン
- [ウィンドウガイド](https://www.glfw.org/docs/latest/window_guide.html) - ウィンドウとフレームバッファの作成と使用方法
- [コンテキストガイド](https://www.glfw.org/docs/latest/context_guide.html) - OpenGLとOpenGL ESのコンテキストを操作する
- [Vulkanガイド](https://www.glfw.org/docs/latest/vulkan_guide.html) - Vulkanオブジェクトと拡張機能の使い方
- [モニターガイド](https://www.glfw.org/docs/latest/monitor_guide.html) - モニタとビデオモードの列挙と操作
- [入力ガイド](https://www.glfw.org/docs/latest/input_guide.html) - イベントの受信・ポーリング・入力処理

プログラムを書いたら、[GLFWのコンパイル](https://www.glfw.org/docs/latest/compile_guide.html)と[アプリケーションのビルド](https://www.glfw.org/docs/latest/build_guide.html)を参照してください。

特定の機能に関するより詳細な情報は、[リファレンスドキュメント](https://www.glfw.org/docs/latest/modules.html)を参照してください。

[GLFW 2から3への移行](https://www.glfw.org/docs/latest/moving_guide.html)では、何が変わったのか、新しいAPIを使用するために既存のコードをどのように更新すればよいのかを説明します。

ポインタの寿命・再入可能性・スレッドセーフ・イベントオーダー・後方および前方互換性についての[保証と制限](https://www.glfw.org/docs/latest/intro_guide.html#guarantees_limitations)についてのセクションがあります。

[FAQ](https://www.glfw.org/faq.html)はGLFWの設計・実装・使用に関する多くの一般的な質問に答えています。

最後に、[標準準拠](https://www.glfw.org/docs/latest/compat_guide.html)では、GLFWがどのようなAPI・標準・プロトコルを使っているか、そしてそれらが与えられたマシンに存在しない場合にどうなるかを説明しています。

このドキュメントはDoxygenで作成されました。そのソースは[ソース配布](https://www.glfw.org/download.html)と[GitHubリポジトリ](https://github.com/glfw/glfw)の両方で利用可能です。