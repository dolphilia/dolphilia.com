# ベアメタルプラットフォームでの実行方法

ベアメタルプラットフォームは通常、最小限のリアルタイムオペレーティングシステム（RTOS）か、従来のオペレーティングシステムが全く動作しないものです。ページング、メモリ割り当てプリミティブ、ファイルシステムなど、通常のサービスはまったく利用できないかもしれません。割り込みハンドラもなく、すべてのコードがビジーポーリング・ビットバンギングループで実行されているかもしれません。通常、libc は存在しないか、その一部 (多くの場合、非準拠) のみです。

Duktape はベアメタルターゲットで動作するように設計されています。 プラットフォーム依存は慎重に最小化され、プラットフォーム関数へのアクセスはすべて duk_config.h で定義されたラッパー・マクロを介して行われます。そのため、これらはカスタムプロバイダーで簡単に置き換えることができます。

この文書では、ベアメタルターゲット上で Duktape をコンパイルし、実行する際の通常の問題について説明します。こちらもご覧ください。

- https://github.com/svaarala/duktape/blob/master/doc/low-memory.rst

## フットプリントへの期待

Duktapeの設定オプションは、最終的なフットプリントに大きな影響を与えます。以下の構成は、ARMプラットフォームで約160kBにコンパイルされ、32kBのRAMで（非常に最小限の）動作が可能です。

- 最小限のRTOSです。
- Duktapeは、ES5ベースの最小限の低メモリ構成で、RegExpsやコルーチンなどは無効化されています。sin()のような超越数学関数は、関連する大規模なlibcコードを避けるために無効化されています。カスタム日付プロバイダ。
- libc の大規模な実装を避けるための最小限の s(n)printf() と sscanf() の置き換え: https://github.com/svaarala/duktape/tree/master/extras/minimal-printf.
- シンプルなプールアロケータ: https://github.com/svaarala/duktape/tree/master/extras/alloc-pool.
- setjmp()、longjmp()、そしてサードパーティの libc 実装によって提供される様々なオッズアンドエンド。
- いくつかのネイティブバインディング、例えばシリアルリード/ライトバインディング、LEDフラッシュ。

ECMAScriptのビルトインバインディングを削除することで、160kBを大きく下回るフットプリントを実現することが可能です。

- 例えば、Duktape master の "stripped" ビルドでは、コマンドラインの eval ツールを x86 で 80kB 未満にコンパイルできます (libc などは含まれません)。しかし、Array.prototype.forEach()のようなビルトインは、このビルドには含まれていません。YAMLメタデータを使えば、特定のバインディングだけを削除するなど、より正確にバインディングをカスタマイズすることができます。

## 典型的な移植の手順

## コンフィギュレーションと duk_config.h

- カスタム設定を作成するには tools/configure.py を使用します。https://github.com/svaarala/duktape/blob/master/config/examples/low_memory.yaml にある低メモリ設定は、妥当な出発点です。
- YAML config フォーマットを使って、Duktape の設定にカスタムの微調整を加える。
- 存在しない、あるいは避けるべきプラットフォーム関数を再定義するために、fixupヘッダを使用します。例えば、`#undef DUK_FLOOR #define DUK_FLOOR my_floor_replacement` といった具合です。
- Duktapeのコンパイルがそのプロトタイプを知ることができるように、カスタム置換の宣言を提供するためにfixupヘッダを使用します： `extern double my_floor_replacement(double x);` 。
- 標準的なヘッダーが利用できない場合、duk_config.h を編集して、問題のある #include 行を削除する必要があるかもしれません。genconfig にカスタムプラットフォームを追加し、そのプラットフォーム用の duk_config.h を作成することで、よりきれいにこれを達成することができます。
- Date 組み込みは、非常に頻繁に置き換える必要があります。
- https://github.com/svaarala/duktape/blob/master/doc/datetime.rst#implementing-an-external-date-provider
- https://github.com/svaarala/duktape/tree/master/examples/dummy-date-provider
- RAM が非常に厳しい場合、"ROM built-ins "オプションにより、組み込みのバインディング・ オブジェクト（例えば Math, Math.cos, Array）を読み取り専用のコードセクションに コンパイルすることができます。これにより、パックド・ポインタも使用する場合、Duktapeは約3kBのRAMで起動することができます。ただし、ROM内蔵を使用すると、コードのフットプリントが大きくなります。

### コンパイルと実行

これは明らかにコンパイラに依存しますが、フットプリントを最小にするオプションを使用すること、最終的なリンクで未使用の関数を削除することなどが重要です。例えば、以下を参照してください。

- https://github.com/svaarala/duktape/blob/master/doc/low-memory.rst#optimizing-code-footprint

フラッシュから直接コードを実行するには、「execute in place」を有効にする必要がある場合があります。