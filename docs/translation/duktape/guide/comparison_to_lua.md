## Luaとの比較 {#comparison_to_Lua}


Duktapeは、概念的にLuaから多くのことを借りています。以下は、Luaと比較してDuktapeで何が違うかについてのメモです。Luaに既に慣れている方には役に立つかもしれません。


### 配列とスタックのインデックスはゼロベース

配列とスタックのインデックスは全てゼロベースで、Luaのような1ベースではありません。つまり、スタックの底は 0、下から 2 番目の要素は 1、一番上の要素は -1 です。0 はもはや無効/非存在の要素を示すのに利用できないので、Duktape では代わりに定数 DUK_INVALID_INDEX が使用されます。

文字列のインデックスもゼロベースで、スライスは開始インデックスを含み、終了インデックスを含まない（すなわち\[start,end\[）で示されます。Lua では、スライスは包括的なインデックス（例：\[start,end\]）で示されます。


### オブジェクト型は、関数とスレッドを表す

Luaでは、関数とスレッドは、オブジェクトとは別の型です。Duktapeでは、オブジェクト型は、プレーンオブジェクト、ECMAScriptやネイティブ関数、スレッド（コルーチン）に使用されます。その結果、これら全てのオブジェクトは、変更可能で拡張可能なプロパティのセットを持ちます。


### Lua userdata と lightuserdata

Luaのuserdataに最も近いコンセプトはDuktapeバッファ・タイプですが、以下のような相違点があります。

- Duktapeバッファーはサイズ変更可能ですが、Lua userdataの値はサイズ変更できません。Duktapeバッファはサイズ変更可能ですが、Luaのユーザーデータはサイズ変更できません。
- Duktapeバッファはプロパティを持たない生のバイト配列であり、Lua userdataオブジェクトは環境参照を格納することができます。

LuaのlightuserdataとDuktapeのポインタは、基本的に同じものです。

Duktapeバッファにプロパティを関連付ける必要がある場合、代わりにバッファ・オブジェクトを使用します（または、独自のオブジェクトを作成し、そのプロパティとしてプレーン・バッファを格納します）。そして、そのオブジェクトにファイナライザーを追加することで、バッファに関連するすべてのリソースを解放することができます。これは、バッファへの参照を保持するものが他にない限り、うまく動作します。もしそうだとすると、オブジェクトがファイナライズされた後にバッファが使用される可能性があります。これを防ぐために、ネイティブCの構造体は、データ構造がオープンかクローズかを示すフラグを持つべきでしょう。これは、堅牢なネイティブ・コードのためのグッドプラクティスです。


### ガベージ・コレクション

Duktapeは、参照カウントと非インクリメンタルなマーク＆スイープ・ガーベージ・コレク ターを組み合わせています（マーク＆スイープは参照サイクルのみに必要です）。マーク＆スイープの任意パスを無効にすることで、収集の一時停止を避けることができます（DUK_USE_VOLUNTARY_GCを無効にする）。Lua は一時停止のないインクリメンタル・コレクターを持ちますが、参照カウントはありません。

Duktapeには、緊急ガベージコレクタがあります。Lua 5.2には緊急ガベージコレクタがありますが、Lua 5.1にはありません（ただし、緊急GCパッチはあります）。


### duk_safe_call() vs. lua_cpcall()

duk_safe_call() は、既存のバリュースタック・フレームで動作する保護された C 関数呼び出しです。関数呼び出しは、呼び出しスタック上では全て見えません。

lua_cpcall()は新しいスタック・フレームを作成します。


### バイトコードダンプ/ロード

Duktape 1.3以降、DuktapeはLuaのlua_dump()に似たバイトコード・ダンプ/ロード・メカニズムを備えています。バイトコード・ダンプ/ロードを参照してください。


### メタテーブル

ECMAScript E5/E5.1 には Lua のメタテーブルに相当するものはありませんが、ECMAScript ES2015 Proxy オブジェクトが同様の機能を提供します。E5/E5.1よりも優れたプロパティの仮想化を可能にするために、DuktapeはES2015 Proxyのサブセットを実装しています。


### lua_next()とduk_next()の比較

lua_next() は、前のキーと値を新しいペアに置き換えますが、duk_next() はそうではありません。呼び出し側は、キーや値を明示的にポップする必要があります。


### ローアクセサ

lua_rawgetのようなLuaの生のテーブルアクセス関数に相当するものはありません。以下の ECMAScript の組み込み関数を使用することで、同様の効果を得ることができます (ただし、パフォーマンスに関しては別です)。Object.getOwnPropertyDescriptor ( O, P ), Object.defineProperty ( O, P, Attributes ).


### コルーチン

Duktape APIには、コルーチン制御のためのプリミティブはありません（Lua APIには、例えばlua_resumeがあります）。コルーチンの制御は、Duktape のビルトインで公開されている関数を使用する ことによってのみ可能です。さらに、Duktapeにはコルーチンの生成に関する多くの制限があります。例えば、コルーチンはコンストラクター呼び出しやゲッター/セッター呼び出しの内部で生成することはできません。


### 複数の戻り値

Lua は複数の戻り値をサポートしていますが、Duktape (または ECMAScript) は現在サポートしていません。これは、複数の値を返す構文を持つ ECMAScript ES2015 で変わるかもしれません。Duktape/C APIは、1以上の戻り値を予約し、後で複数の戻り値に使用できるようにします。


### 弱参照(Weak references)

Luaは弱参照をサポートしています。Duktapeは、現在サポートしていません。


### Unicode

Luaは、ビルトインのUnicodeをサポートしていません（文字列はバイト列です）が、DuktapeはECMAScript準拠の一環として、16ビットUnicodeをサポートしています。


### ストリーミング・コンパイル

Luaには、ストリーミング・コンパイルAPIがあり、コードがディスクから読み込まれたり、オンザフライで解凍されたりする場合に有効です。Duktapeは現在、ストリーミング・コンパイルをサポートしていません。これは、ソース・コードに対して複数のパスが必要だからです。