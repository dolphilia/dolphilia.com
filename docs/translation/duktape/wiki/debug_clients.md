# 既知のDuktapeデバッグクライアントの実装

もしあなたがデバッグ・クライアントを実装したり、Duktapeデバッグをあなたのプロジェクトに統合したならば、Duktape Wikiで課題を開き、ここに追加してください。

テーブル・カラム:

- デバッグクライアント/プロキシ "は、デバッグクライアントまたはプロキシのメインページにリンクしています。
- Transport "は、デバッグクライアントがサポートするトランスポートを説明します。
- プロトコル」は、デバッグクライアントがDuktapeとどのように通信するかを示します。バイナリdvalueプロトコルを直接実装する場合は「binary」、デバッグクライアントがJSONプロキシに依存している場合は「json」です。
- "Description "は追加情報を提供します。

| Debug client/proxy |   Transport    | Protocol |                                                                                   Description                                                                                   |
| ------------------ | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| duk_debug.js       | TCP            | binary   | duk_debug.js は Node.js ベースのデバッグクライアントとウェブ UI を組み合わせたものを提供します。Duktapeにバンドルされています。                                                 |
| duk_debug.js       | TCP            | binary   | duk_debug.js は、Node.js ベースの JSON デバッグプロキシも提供します。Duktapeにバンドルされています。                                                                            |
| duk_debug_proxy.js | TCP            | binary   | DukLuv で書かれた JSON デバッグプロキシで、非常に移植性が高く、あなたのアプリケーションに簡単にバンドルできます (DukLuv は MIT ライセンスです)。Duktapeにバンドルされています。 |
| AllJoyn.js         | AllJoyn custom | binary   | コンソールと Python UI の両方を提供します。デバッグトランスポートはターゲットにローカルで、デバッグのためのAllJoynスキーマを公開します。                                        |
| Minisphere         | TCP            | binary   | Minisphereは、GUIとコンソールの両方のデバッグクライアントを提供しています。スクリーンショット：screenshot1, screenshot2, screenshot3, screenshot4.                              |
| duk4vb             | In process     | binary   | Visual Basic 6で動作するDuktape用デバッガ。スクリーンショット：スクリーンショット1.                                                                                             |
| VSCode duk-debug   | TCP            | binary   | Duktape ランタイム用の Visual Studio Code デバッガ拡張。<br>Source: https://github.com/harold-b/vscode-duktape-debug<br>Screenshots: screenshot1, screenshot2.                  |