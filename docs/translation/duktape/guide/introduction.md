## はじめに {#introduction}

Version: 2.6.0 (2020-10-13)


### ドキュメントの範囲 {#introduction1}

このガイドではあなたのプログラムでDuktapeを使用するための入門書を提供します。基本的な使い方に慣れてきたら、APIの詳細を調べるための簡潔な[APIリファレンス](https://duktape.org/api.html)があります。[Duktape Wiki](http://wiki.duktape.org/)では、より詳細な例やベストプラクティスを提供しています。

この文書ではDuktapeの内部構造はカバーしていません。内部構造をいじりたい場合は、[Duktapeのリポジトリ](https://github.com/svaarala/duktape/tree/master/doc)を参照してください。


### Duktapeとは？

Duktapeは移植性とコンパクトなフットプリントを重視した、組み込み可能なECMAScript®エンジンです。DuktapeをC/C++プログラムに組み込むことでスクリプトによる機能拡張を簡単に行うことができます。また、プログラムの主要な制御フローをECMAScriptで構築し、重い処理を行うために高速なCコード関数を使用することも可能です。

Duktapeを組み込むアプリケーションは、どのネイティブ・バインディングをどのような方法で提供するかを制御することができます。例えば、コンソールへのテキスト出力やファイル・システムとのやり取りに関するデフォルトのバインディングは存在しません。Duktapeの配布パッケージにはサンプル・プロバイダーが含まれており、ニーズに合わせて簡単に統合することができます。

ECMAScriptとJavascriptという用語は、しばしば多かれ少なかれ同等だと考えられていますが、Javascriptとその亜種は技術的にはECMAScript言語が使用される環境の一つに過ぎません。ブラウザ以外のECMAScript環境でもブラウザ固有のビルトインが提供されていることがよくあるので、両者の境界は実際にはあまり明確ではありません。それでもDuktapeが実装している言語を指すために、ここではECMAScriptという用語を使用します。


### 準拠

DuktapeはES5.0/ES5.1に準拠し、必要に応じてES2015以降からセマンティクスを更新しています。

- [ECMAScript言語仕様書第5版](http://www.ecma-international.org/publications/files/ECMA-ST-ARCH/ECMA-262%205th%20edition%20December%202009.pdf)
- [ECMAScript®言語仕様5.1版](http://www.ecma-international.org/ecma-262/5.1/)

Duktapeは、セマンティクスとビルトインに関する最新のECMAScript仕様を追跡しています（ただし、ES2015以降のサポートはまだ不完全です）、ご参照ください。

- [ECMAScript® 2015言語仕様](http://www.ecma-international.org/ecma-262/6.0/)
- [ECMAScript® 2016言語仕様](http://www.ecma-international.org/ecma-262/7.0/)

特定のケースで、Duktapeは仕様のドラフトに従うことがあります（[TC39/ecma262](https://github.com/tc39/ecma262)で進行中の作業を参照）。これは、最新仕様の機能が現実のコードと衝突する場合に行われます（例えば、[RegExp.prototypeのissues](https://github.com/tc39/ecma262/pull/263)を参照）。

TypedArrayのサポートはES2016 TypedArrayに基づいています。初期の実装はKhronos TypedArrayの仕様に基づいていました。

- [TypedArray Specification (Editor's Draft 18 July 2013)](https://www.khronos.org/registry/typedarray/specs/latest/) (注: リンクは最新版です)
- svn co -r 30720 https://cvs.khronos.org/svn/repos/registry/trunk/public/typedarray

Node.jsのBufferサポートは以下のものをベースにしています。

- [Buffer Node.js v6.9.1](https://nodejs.org/docs/v6.9.1/api/buffer.html)

TextEncoder()とTextDecoder()のバインディングは以下を参考にしています。

- [Encoding API](https://encoding.spec.whatwg.org/#api), WHATWG Encoding Living Standard

Performance.now()バインディングは以下をベースにしています。

- [High Resolution Time Level 2](https://www.w3.org/TR/hr-time/#dom-performance-now)


### 機能紹介

DuktapeはECMAScriptの標準的な機能の他に、以下の追加機能を備えています（一部はアプリケーションから見えるもので、そのほかは内部的なものです）。

- ES2015 [TypedArray](https://www.khronos.org/registry/typedarray/specs/latest/)および[Node.js Buffer](https://nodejs.org/docs/v6.9.1/api/buffer.html)バインディング、プレーンなバッファタイプ(軽量なUint8Array)
- ECMAScript 2015 (ES6) から: setPrototypeOf/\_\_proto\_\_, Proxyオブジェクトのサブセット, Reflect, 計算されたプロパティ名, 最小限のconstサポート
- ECMAScript 2016 (ES7) から: 指数演算子 (\*\*, \*\*=)
- WHATWG Encoding Living Standardに基づく[エンコーディングAPI](https://encoding.spec.whatwg.org/#api)バインディング
- Duktape固有のビルトイン：Duktapeグローバル・オブジェクトによって提供されます。
- 拡張型：カスタムの「バッファ」と「ポインタ」型、任意のバイナリ文字列と非[BMP](http://en.wikipedia.org/wiki/Plane_(Unicode)#Basic_Multilingual_Plane)文字列をサポートする拡張文字列型（標準ECMAScriptは16ビットコードポイントしかサポートしていません）。
- 参照カウントとマーク＆スイープガベージコレクションの組み合わせ、ファイナライザーと緊急ガベージコレクション（マーク＆スイープだけで構築することも可能です）
- コルーチンのサポート
- テールコールのサポート
- デバッガプロトコルに基づく内蔵デバッガフレームワーク
- プラットフォーム依存のない組み込みの正規表現エンジン
- プラットフォームに依存しない組込みのUnicodeサポート
- プラットフォームに依存しない組込みの数値解析と書式設定
- バイナリシリアライゼーション用の組込みCBORバインディング
- 追加のカスタムJSONフォーマット（JXとJC）
- コンパイル済み関数をキャッシュするためのバイトコードダンプ/ロード機構


### 目標

__コンプライアンス__: ECMAScript E5/E5.1と実世界でのコンプライアンス。ECMAScriptのコンプライアンスには正規表現とUnicodeのサポートが必要です。可能であれば最新またはドラフトECMAScript仕様から機能を実装し、Duktapeカスタム機能を最小化します。

__移植性__: Duktapeはシステムライブラリへの依存を最小限に抑えることで移植性を高めています。例えば、数値のフォーマットやパース、正規表現、Unicodeは、すべてDuktapeが内部で実装しています。完全に排除できない数少ない依存性の1つが、Date組み込みによるシステムの日付／時刻の統合です。Duktapeは主要なプラットフォームを直接サポートしていますが、エキゾチックなプラットフォームでは、外部のDateプロバイダーを使用することも可能です。

__簡単なC言語インターフェース__: DuktapeとC言語プログラムとの間のインターフェースは、自然でエラーに強いものであるべきです。特に文字列の表現がUTF-8であり、C言語の一般的な使用法に適合するように、自動的にNULターミネータが付加される必要があります。

__フットプリントが小さいこと__: 小さなプログラムであっても、コードとデータのフットプリントは可能な限り小さくすべきです。Duktapeは標準ライブラリのない「ベアメタル」ターゲットにも移植可能です。これは性能よりも重要なことです。なぜなら、非常に高速なエンジンはすでにいくつかありますが、非常にコンパクトでポータブルなエンジンは少ないからです。

__適度な性能__: フットプリントが小さい（そしてある程度ポータビリティがある）ため、おそらく競争力のあるJITベースのエンジンの可能性はなく、SpiderMonkey（およびその最適化バージョン）やGoogle V8などの非常に高度なJITベースのエンジンと競争する現実的な方法はありません。それでも、典型的な組み込みプログラムでは、性能は妥当なものであるはずです。この点では、[Lua](http://www.lua.org/)が良いベンチマークになります。(オプションで、JIT化やオフラインコンパイルのサポートを追加するのも良いでしょう)。

__ASCII文字列の性能__: プレーンなASCII文字列を扱う操作が非常に高速であることは重要です。ASCIIはほとんどの組み込み用途で支配的です。ASCII以外の文字列を扱う操作は、それなりに高速である必要がありますが、重要ではありません。これは必要なトレードオフです。C互換文字列を使うということは、本質的にUTF-8文字列表現を使うということであり、文字列インデックスや他の多くの操作が、固定サイズの文字表現を使う場合よりも遅くなるのです。それでも、文字列を順次（どちらかの方向に）効率的に反復するような一般的なイディオムをサポートすることは重要です。


### ドキュメントの構成

本書ではDuktapeのダウンロードからコンパイル、そしてプログラムへの組み込みまでを説明します。また、スクリプト機能をどのようにプログラムに組み込むか、具体的な例を示しています。

プログラミングモデル、スタック型、C型では、ヒープ、コンテキスト、バリュースタック、Duktape API、Duktape/C関数など、Duktapeの中核となる概念について説明します。Duktapeのスタック型とC言語の型ラッパーについても詳しく説明しています。

Duktape特有のECMAScriptの機能については、複数のセクションで説明しています。型アルゴリズム（カスタム型用）、Duktape組み込み機能（追加の組み込み機能）、Post-ES5機能（ES2016以降に実装された機能）、カスタム動作（標準とは異なる動作）、カスタムJSON形式、カスタムディレクティブ、バッファオブジェクト、エラーオブジェクト（プロパティとトレースバックサポート）、関数オブジェクト（プロパティ）、日付と時刻、乱数、デバッグ、モジュール、最終化、コルーチン、仮想プロパティ、記号、バイトコードダンプ/読み込み、スレッド化、サンドボックス化。

パフォーマンスでは、パフォーマンスを向上させ、パフォーマンスの落とし穴を回避するためのDuktape固有のヒントをいくつか提供しています。Memory usage（メモリー使用法）では、Duktapeのメモリー使用法を要約し、使用量を最小限に抑えるためのポインターを提供します。コンパイルでは、アプリケーションの一部としてDuktapeを構成し、コンパイルする方法について説明しています。移植性では、プラットフォームやコンパイラーに特有の問題や、その他の移植性に関する問題を扱います。互換性では、DuktapeのECMAScript方言、拡張機能、フレームワークとの互換性について説明します。バージョン管理では、Duktapeのバージョン管理について、またどのようなバージョン互換性が期待されるかについて説明します。制限事項では、現在知られている制限事項を要約し、可能な回避策を提供します。

Luaとの比較では、LuaとDuktapeの違いについて説明します。すでにLuaに慣れている方には有益な情報かもしれません。
