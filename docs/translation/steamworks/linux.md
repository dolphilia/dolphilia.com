SteamOS と Linux のための開発
Steamworks ドキュメント > ストアプレゼンス > アプリケーション > プラットフォーム > SteamOS と Linux のための開発
Linux概要
すべてのSteamユーザーに、Linux用Steamが公開されています。 Linuxをサポートするゲームが続々と追加され、Linux用Steamコミュニティグループが成長を続けている今こそ、ゲームをLinuxにポートするのに最適なタイミングです。

WindowsやmacOS開発のバックグランドを持つデベロッパーにとって、Steam用にLinuxゲームを開発することは挑戦しがいのあることかもしれません。 ここではLinux用Steamへのゲーム移植を成功するための情報を提供します。
はじめに
Linuxゲームの構築に必要なもの：

最新版のLinuxを実行している開発用マシン。 これはデュアルブートマシン、Linux専用マシーン、あるいはLinuxを実行する仮想マシンであってもかまいません。 さらに、開発は32 bitと64 bitのLinuxディストリビューションの両方でサポートされています。 推奨されるLinuxディストリビューションは、ValveとLinux コミュニティによって最もテストされている最新のUbuntu LTSリリースです。 Ubuntuはこちらからダウンロードできます。
Linux 用 Steam クライアント。
Linux 開発ツールの基本セット (e.g. g++、gcc、make ユーティリティ) は build-essential パッケージに収納されています。 Ubuntu Software Centerを使用するか、またはオープンターミナルウィンドウからapt-getコマンド、sudo apt-get install build-essentialを使用してこのパッケージをインストールしてください。
最新バージョンのSteam Linuxランタイムには、SteamでのLinux ゲーム配信に必要なすべてのツールとライブラリが入っています。 ランタイムの使用説明書は レポジトリ内のREADME.mdに入っています。

Linux Steamworksに関する一般的な質問やランタイムの問題はSteamworks開発者グループ掲示板に参加し、 Linuxセクションに投稿してください。
Linuxツール
LinuxにはコマンドラインインターフェイスからグラフィックデベロッパーIDEまで幅広い開発ツールがあります。 次の情報はValve Linuxチームの経験に基づいています。

Windows開発ツールの経験がある場合のLinux開発への最短距離は、WindowsのVisual Studioと、Visual Studioデバッグインターフェイスを使ったリモートのLinuxプロセスの デバッグを可能にするWinGDBというVisual C++拡張です。

Valve Linuxチームは、Linuxでの開発に次のツールを使っています:
QtCreator - 使い慣れたVisual StudioキーバインドのデバッガーとIDE
SlickEdit - ユーザー定義のキー割り当てが使えるベーシックで設定可能なGUI
gdb - 人気のコマンドラインデバッガー
cgdb - 実行中にソースコード内の現在地を表示する分割スクリーンを提供する gdb ラッパー 
Eclipse - Linux開発用に設定可能な他のIDE 。 Windows、
macOC、Linuxで利用可能。
vim - ベーシックなコマンドラインテキストエディタ

Valve Linuxチームは、デバッグとトレースに次のツールを使っています:
QtCreator - 上記参照。
Symbol Servers
PerfStudio - フル機能のフレームベースデバッガー。
AMDビデオカードで動作するゲームのAPIトレースをサポート。 Windowsで利用可能。
Telemetry - グラフィックカードで動作するゲーム用のフル機能プロファイラ。 Linux、Windows、macOSで
利用可能。
gDEBugger - OpenGLコードのデバッグ、プロファイル、分析を行うデバッガー。 アクティブな開発はCodeXLに移行しました。

- 様々なパフォーマンス機能を備えたコマンドラインツール Linuxで利用可能。
NVIDIA Nsight - NvidIaグラフィックカードで実行中のゲームをデバッグするためのVisual Studioの拡張機能

lTTng - Linuxトレーシングツール
apitraceプロジェクト - ゲームからのOpenGLとOpenGL ES呼び出しをトレースして再生するツールのセット
Zoom - 強力で使いやすいUIを持つCPUプロファイラー
Linux API
Vulkan は、高性能グラフィックのレンダリングに推奨されるライブラリです。 オープンでDirectX12とMetal同等です。

OpenGL は、過去におけるグラフィックレンダリングの標準でした。 ゲームの大半はOpenGLを直接呼び出しますが、レガシーレンダリングコードをOpenGLコールに変換する翻訳方法を使用しているゲームもあります。 Valveでは、Team Fortress ２やCounter–Strike: Sourceなどの古いゲームでこの方式をとっています。 OpenGLを選択する場合、ゲームにOpenGL3.0のコア機能を使用することを推奨します。

Simple Direct Media Layer (SDL) version 2.0 は、オーディオとウィンドウ化への低レベルのアクセスをその他の機能とともに提供します。 3DレンダリングのサポートはOpen GLを使用することで提供します。 インストールについてのインストラクションはこちらです。 詳細とドキュメントはSDL wikiを参照してください。 ValveはこれをSteamとほとんどのゲームにおいて、ウィンドウ化と Steam入力APIのバックエンド処理の提供に使用しています。

次のライブラリは、ゲーム開発の他の側面へのサポートを提供します。
FreeType - Linuxでのフォントレンダリング (ベクターベースとビットマップフォントの両方) 
Fontconfig - フォントアクセスの設定とカスタマイズ
Miles Sound System - Linux開発用のミドルウェアサウンドエンジン
Bink Video - ゲーム開発向けにデザインされたビデオコーデック
WebM - オープンのメディアファイル形式、QuickTimeではなくTeam Fortress 2ビデオの録音で使用
GitHub リポジトリ
次のリポジトリは、公開されており、Linux用Steam関連のプロジェクトに使用されています。
steam-for-linux - Linux用Steamのためのコンテンツと、Linux用Steamクライアントのバグトラッカーが含まれています。
steam-runtime - Steam Linux ランタイムプロジェクトが含まれます。 Steam Linux ゲームの開発に、安定したランタイム環境を提供することが目的です。
よくある質問
Q: 自分のLinuxゲームに複数の永続的な外部ライブラリ依存があります。 この問題を解決するには？
A: SDL、 OpenAL、 FreeTypeやFontconfigといった人気のライブラリの多くは、すべてSteam Linux Runtimeに入っています。 自由に再配布可能でランタイムに含まれていない他の外部ライブラリの依存関係がある場合、Linux & SteamOS Steamworks 開発掲示板でお知らせください。

Q: Linux用のSteam DRMはありますか？
A： はい! 新しい drmtoolp DRMツールはLinuxをサポートしています。 詳細はSteam DRMを参照してください。

Q: UnbuntuとWindows間でドライバーパフォーマンスを比較した場合どうですか？
A: 専用のNvidiaドライバは、安定性、性能、機能面でWindowsに匹敵します。 AMDとIntelの専用ドライバーもありますが、現時点における性能と安定性はWindowsの同等ドライバーに劣ります。

Linuxのパフォーマンスに関しては、使用するビデオカードとドライバの種類 (オープンソースか 専用か) によって変わります。 通常、専用ドライバーはオープンソースドライバーを上回り、より大きな機能セットを持ちます。 さらに、ドライバーの古さも専用とオープンソースバージョンで異なる場合があります。

Q: Steam外から起動した際にSteamオーバーレイが使えない。
A: Linuxでgameoverlayrenderer.soを起動するためには、LD_PRELOAD環境変数を設定する必要があります。

以下を参照してください:
export LD_PRELOAD=~/.local/share/Steam/ubuntu12_32/gameoverlayrenderer.so;~/.local/share/Steam/ubuntu12_64/gameoverlayrenderer.so

Q: Linuxビルドのテストにどのランタイムを使うべきですか？
A: 推奨のLinuxディストリビューションは、ValveとLinuxコミュニティによって最もテストされている、最新のUbuntu LTSリリースです。 Ubuntuはこちらからインストールできます。