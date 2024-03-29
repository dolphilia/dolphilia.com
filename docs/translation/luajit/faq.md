# よくある質問 (FAQ)

::: tip Q: LuaJITとLuaについてもっと学ぶにはどこで情報を得られますか？
- LuaJITに関連するトピックに焦点を当てたLuaJITメーリングリストがあります。
- Lua自体に関するニュースはLuaメーリングリストで見つけることができます。メーリングリストのアーカイブは、LuaJITに関する古い投稿をチェックするのに価値があります。
- Lua.orgの公式サイトには言語の完全なドキュメンテーションとLuaに関する書籍や論文へのリンクがあります。
- コミュニティ管理のLua Wikiには多様なトピックに関する情報があります。
:::

::: tip Q: LuaJITで使用されているコンパイラ技術についてもっと学ぶにはどこで情報を得られますか？
以下のGoogle Scholar検索を使用して、関連する論文を見つけてください:

- 検索キーワード: Trace Compiler
- 検索キーワード: JIT Compiler
- 検索キーワード: Dynamic Language Optimizations
- 検索キーワード: SSA Form
- 検索キーワード: Linear Scan Register Allocation

ここにLuaJITの革新的な特徴のリストがあります。
そしてもちろん、ソースコードを読むことが啓蒙への唯一の方法です。
:::

::: tip Q: 時々Ctrl-CがLuaプログラムを停止させないのはなぜですか？
割り込みシグナルハンドラはLuaのデバッグフックを設定します。しかし、これはコンパイルされたコードでは無視されます。プログラムがタイトなループで実行され、インタプリタに戻らない場合、デバッグフックは実行されず、「中断されました！」エラーを投げることができません。
プログラムを停止するには、Ctrl-Cを二回押す必要があります。これは、Luaインタプリタの下でC関数内で実行がスタックしている場合と似ています。
:::

::: tip Q: `pairs()` を使ったテーブルの反復処理で同じ順序にならないのはなぜですか？
Lua言語標準では、テーブルの反復処理の順序は明示的に未定義です。異なるLua実装やバージョンは、同一のテーブルに対して異なる順序を使用することがあります。テーブルの構築方法が異なると、順序も異なる結果になることがあります。改善されたVMのセキュリティのために、LuaJIT 2.1は、別のVM呼び出しであったり、文字列キーが新たにインターンされたときに異なる順序を使用することがあります。

プログラムが決定的な順序に依存している場合、それはバグです。キーの順序に依存しないようにプログラムを書き直すか、必要であればテーブルのキーをソートしてください。
:::

::: tip Q: Luaコードを安全にサンドボックス化できますか？
極めて制限されたLuaのサブセットについて、そして提供するすべてのインターフェース関数を徹底的に調査する場合に限り、多分可能です。Luaはいくつかのサンドボックス機能（setfenv()、フックなど）を提供していますが、Luaのコアライブラリでさえ、これを正しく実装することは非常に難しいです。もちろん、拡張ライブラリも検査する必要があります。そして、FFIライブラリのように本質的に安全ではないライブラリもあります。Lua WikiやWikipediaでさらに読むことができます。

関連して、信用できないバイトコードをロードすることは安全ではありません！悪意を持って作られたバイトコードでLuaまたはLuaJIT VMを簡単にクラッシュさせることができます。これはよく知られている事実であり、意図的にバイトコードの検証が行われていないので、バグとして報告しないでください。バイトコードのロードを無効にするために、load*()関数のmodeパラメータをチェックしてください。

一般的に、唯一有望なアプローチは、VMレベルではなくプロセスレベルでLuaコードをサンドボックス化することです。
:::

::: tip Q: Luaはどこでも動作します。なぜLuaJITは私のCPUをサポートしていないのですか？
コンパイラだからです — ネイティブマシンコードを生成する必要があります。これは、コード生成器を各アーキテクチャに移植する必要があることを意味します。また、高速インタープリタはアセンブラで書かれており、これも移植する必要があります。これはかなりの取り組みです。
インストールのドキュメントには、サポートされるアーキテクチャが示されています。
他のアーキテクチャのサポートは、十分なユーザー需要とアーキテクチャの市場関連性に基づいて追加されるかもしれません。移植自体を開発し、統合し、積極的に開発されているブランチで継続的にメンテナンスするためには、資金提供が必要です。
:::