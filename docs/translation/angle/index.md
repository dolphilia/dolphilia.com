# ANGLE - ほぼネイティブなグラフィックレイヤーエンジン

[原文](https://chromium.googlesource.com/angle/angle/+/main/README.md)

ANGLEの目標は、OpenGL ES APIコールをそのプラットフォームで利用可能なハードウェアサポートAPIのいずれかに変換することにより、複数のオペレーティングシステムのユーザーがWebGLおよびその他のOpenGL ESコンテンツをシームレスに実行できるようにすることです。ANGLEは現在、OpenGL ES 2.0、3.0、3.1からVulkan、デスクトップOpenGL、OpenGL ES、Direct3D 9、Direct3D 11への変換を提供しています。将来的には、ES 3.2、MetalとMacOSへの翻訳、Chrome OS、Fuchsiaのサポートが予定されています。


### バックレンダラーによるOpenGL ESのサポートレベル

|                |  Direct3D 9   |  Direct3D 11     |   Desktop GL   |    GL ES      |    Vulkan     |    Metal      |
|----------------|:-------------:|:----------------:|:--------------:|:-------------:|:-------------:|:-------------:|
| OpenGL ES 2.0  |    complete   |    complete      |    complete    |    complete   |    complete   |    complete   |
| OpenGL ES 3.0  |               |    complete      |    complete    |    complete   |    complete   |  in progress  |
| OpenGL ES 3.1  |               | [incomplete](doc/ES31StatusOnD3D11.md) |    complete    |    complete   |    complete   |               |
| OpenGL ES 3.2  |               |                  |  in progress   |  in progress  |  in progress  |               |


### バックレンダラーによるプラットフォーム対応

|              |    Direct3D 9  |   Direct3D 11  |   Desktop GL  |    GL ES    |   Vulkan    |    Metal    |
|-------------:|:--------------:|:--------------:|:-------------:|:-----------:|:-----------:|:-----------:|
| Windows      |    complete    |    complete    |   complete    |   complete  |   complete  |             |
| Linux        |                |                |   complete    |             |   complete  |             |
| Mac OS X     |                |                |   complete    |             |             | in progress |
| iOS          |                |                |               |             |             | in progress |
| Chrome OS    |                |                |               |   complete  |   planned   |             |
| Android      |                |                |               |   complete  |   complete  |             |
| GGP (Stadia) |                |                |               |             |   complete  |             |
| Fuchsia      |                |                |               |             |   complete  |             |

ANGLE v1.0.772は、2011年10月にOpenGL ES 2.0.3のコンフォーマンステストに合格し、準拠が証明されています。

ANGLEは、Vulkanバックエンドで以下の認定を受けています。

* OpenGL ES 2.0: ANGLE 2.1.0.d46e2fb1e341 (Nov, 2019)
* OpenGL ES 3.0: ANGLE 2.1.0.f18ff947360d (Feb, 2020)
* OpenGL ES 3.1: ANGLE 2.1.0.f5dace0f1e57 (Jul, 2020)

また、ANGLEはEGL1.5仕様の実装も提供しています。

ANGLEは、Windowsプラットフォーム上のGoogle ChromeとMozilla Firefoxの両方で、デフォルトのWebGLバックエンドとして使用されています。Chromeは、高速化されたCanvas2D実装やNative Clientサンドボックス環境など、Windows上のすべてのグラフィックスレンダリングにANGLEを使用しています。

ANGLE シェーダーコンパイラの一部は、複数のプラットフォームにまたがる WebGL の実装でシェーダー検証およびトランスレータとして使用されています。Mac OS X、Linux、およびブラウザのモバイル版で使用されています。1 つのシェーダバリデータを持つことで、ブラウザやプラットフォーム間で一貫した GLSL ES シェーダのセットを受け入れることができます。シェーダ・トランスレータは、シェーダを他のシェーディング言語に翻訳したり、ネイティブ・グラフィック・ドライバのバグや癖に対処するためにシェーダの修正をオプションで適用したりするために使用できます。トランスレータは、Desktop GLSL、Vulkan GLSL、Direct3D HLSL、およびネイティブGLES2プラットフォーム用のESSLもターゲットにしています。


## 情報源

ANGLEリポジトリはChromiumプロジェクトによってホストされており、[オンラインで閲覧](https://chromium.googlesource.com/angle/angle)することができます。

    git clone https://chromium.googlesource.com/angle/angle


## ビルド

[Devセットアップ説明書](doc/DevSetup.md)をご覧ください。


## 貢献

* [Googleグループ](https://groups.google.com/group/angleproject)に参加し、最新情報を入手することができます。
* [Slack](https://chromium.slack.com) の #angle チャンネルに参加してください。Slackチャンネルに参加する手順は[Chromium開発者ページ](https://www.chromium.org/developers/slack)の説明に従ってください。Googler の方は、こちらの [ドキュメント](https://docs.google.com/document/d/1wWmRm-heDDBIkNJnureDiRO7kqcRouY2lSXlO6N2z6M/edit?usp=sharing) の指示に従って、google または chromium のメールを使用して Slack チャンネルに参加してください。
* [問題追跡システム](https://bugs.chromium.org/p/angleproject/issues/list) の [バグを報告](http://anglebug.com/new) (できれば孤立したテストケース付き)。
* [ANGLEブランチの選択](doc/ChoosingANGLEBranch.md)を使って、自分のプロジェクトでトラッキングを行うことができます。


* ANGLEの開発 [ドキュメント](doc)を読む。
* [未解決](https://chromium-review.googlesource.com/q/project:angle/angle+status:open) と [マージ](https://chromium-review.googlesource.com/q/project:angle/angle+status:merged) の変更を見てください。
* [コードの貢献者](doc/ContributingCode.md)になる。
* ANGLEの[コーディング規約](doc/CodingStandard.md)を使用する。
* [Chromium開発用ANGLEのビルド方法](doc/BuildingAngleForChromiumDevelopment.md)はこちらです。
* [ANGLEのデバッグ](doc/DebuggingTips.md)のヘルプを取得する。
* [ANGLEの方向性](doc/Orientation.md)に目を通し、[スタータープロジェクト](https://bugs.chromium.org/p/angleproject/issues/list?q=Hotlist%3DStarterBug)をふるいにかけてみてください。何か作業を引き受けると決めたら、私たちと連絡が取れるようにコメントを書き、さらに重要なことは、あなた自身をそのバグの「所有者」に設定することです。こうすることで、複数の人が誤って同じ問題に取り組むことを避けることができます。


* WebGLについては、[Khronos WebGL Wiki](http://khronos.org/webgl/wiki/Main_Page)でお読みください。
* 初期のANGLE実装の詳細については、[OpenGLインサイト ANGLE](http://www.seas.upenn.edu/~pcozzi/OpenGLInsights/OpenGLInsights-ANGLE.pdf)（これは最新のANGLE実装詳細ではないため、ここでは歴史的参考としてのみ掲載しています）とこの[ANGLEプレゼンテーション](https://drive.google.com/file/d/0Bw29oYeC09QbbHoxNE5EUFh0RGs/view?usp=sharing&resourcekey=0-CNvGnQGgFSvbXgX--Y_Iyg)でご確認ください。
* ANGLE実装の過去、現在、未来について、[本プレゼンテーション](https://docs.google.com/presentation/d/1CucIsdGVDmdTWRUbg68IxLE5jXwCb2y1E9YVhQo0thg/pub?start=false&loop=false)でご紹介しています。
* Vulkanバックエンドに関する[ショートプレゼンテーション](https://youtu.be/QrIKdjmpmaA)をご覧ください。
* [dEQPテスト適合性](doc/dEQP-Charts.md)を追跡する。
* [Vulkanバックエンド](src/libANGLE/renderer/vulkan/README.md)のデザインドキュメントを読んでください。
* ANGLEの[テストインフラ]について読む(infra/README.md)
* ANGLEの[対応拡張子](doc/ExtensionSupport.md)の情報を見る
* ANGLEをご自身のプロジェクトで使用された場合、ぜひそのお話をお聞かせください。
