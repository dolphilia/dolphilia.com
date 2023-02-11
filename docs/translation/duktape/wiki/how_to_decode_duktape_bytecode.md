# Duktapeバイトコードのデコード方法

バイトコード」という用語は、関数ダンプ/ロード形式を指す場合と、より狭 義にはバイトコードオペコード形式のみを指す場合があります。

## バイトコードオプコードのデコード方法

Duktapeのオペコード形式はバージョン保証がなく、単にランタイムコンパイラとエグゼキュータコンポーネントで共有される内部形式です。オペコードフォーマットは、例えばバイトコードの制限を拡張したり、性能を向上させたりするために、マイナーリリースで何度か変更されています。現在、ソースコード以外にオペコードフォーマットの仕様はなく、そのような仕様は簡単に時代遅れになる。

デバッグクライアントなどでバイトコードオペコードフォーマットをデコードするためのリソースを以下に紹介します。

- バイトコードヘッダーの定義: https://github.com/svaarala/duktape/blob/master/src-input/duk_js_bytecode.h
- Node.js デバッガ ウェブ UI が命令を印刷可能な形式にデコードするために使用するバイトコードメタデータ: https://github.com/svaarala/duktape/blob/master/debugger/duk_opcodes.yaml
- Node.js デバッガ ウェブ UI のデコーダ/フォーマット機能: https://github.com/svaarala/duktape/blob/v1.4.0/debugger/duk_debug.js#L1044-L1133 (リンクは 1.4.0 のものです。最新版はマスターをご確認ください)

なお、バイトコードのフォーマットはバージョン間で変更されています。Duktape 1.xと2.xの間でバイトコードの大幅な見直しが行われましたが、マイナーバージョン間でも大きな変更があります。

## dump/loadバイトコードフォーマットをデコードする

dump/load形式は、関数の実際のバイトコード（オペコードリスト）だけでなく、定数、内部関数、関数のメタデータも含みます。オペコード形式と同様に、dump/load 形式はバージョンに依存し、ソースコードにのみ記述されています。参照してください。

- dump/load に関するドキュメント: https://github.com/svaarala/duktape/blob/master/doc/bytecode.rst
- ダンプファイルをデコードして印刷するユーティリティ: https://github.com/svaarala/duktape/blob/v1.4.0/util/dump_bytecode.py (リンク先は 1.4.0 のものです。最新版はマスターをご確認ください)