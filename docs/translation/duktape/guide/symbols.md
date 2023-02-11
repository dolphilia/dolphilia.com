
## シンボル {#symbols}

DuktapeはES2015 Symbolをサポートしており、Duktape 1.xの内部文字列に似たDuktape特有の隠しSymbolも提供しています。隠しSymbolは、通常のECMAScriptコードから隠されるという点でES2015 Symbolと異なります：ECMAScriptコードから作成できず、列挙やJSON-シリアライズもできませんし、オブジェクト・getOwnPropertyName（）からも返らず、オブジェクトgetOwnPropertySymbols（）からも返されません。非表示のSymbolキーを持つプロパティは、非表示のSymbolへの参照を保持している場合にのみ、直接プロパティの読み取り/書き込みでアクセスすることができます。

現在使用されているフォーマットについては、symbol.rstを参照してください。アプリケーションの隠しシンボルは、0xFFバイトのプレフィックスで始まり、その後にアプリケーションで選択された任意の文字列が続きます。Cのコードがduk_push_string()などで文字列をプッシュし、そのバイト列が内部のシンボル・フォーマットにマッチした場合、その文字列値は自動的にシンボルとして解釈されます。

Duktapeでは、オブジェクトのファイナライザーの参照を保存するなど、様々な実装固有の目的のために隠れたSymbolも使用します。Duktape 2.2以降、Duktapeの隠しSymbolには異なるバイト・プレフィックスが使用されており、0xFFプレフィックスは完全にアプリケーション用に予約されています。アプリケーション・コードは、Duktapeの隠されたシンボルのキー付きプロパティにアクセスしようとしないでください： そのようなプロパティのセットは、バージョン間で任意に変更される可能性があります。

> 内部の UTF-8 バイト・シーケンスは、ECMAScript コードから有効な ECMAScript 文字列として作成することができないことに注意してください。例えば、隠されたSymbolは、ff 78 79 7aというバイトシーケンスで表現されますが、ECMAScriptの文字列" \u00ffxyz" は、メモリ内でc3 bf 78 79 7aというCESU-8バイトとして表現されます。

Symbolの作成はCコードから簡単に行えます。

```c
/* プロパティの読み取り/書き込みに使用できる、
 * 隠されたシンボルを作成します。
 * このシンボルは他の文字列やシンボルと同様に、
 * ECMAScript コードに渡すことができます。
 */

duk_push_string(ctx, DUK_HIDDEN_SYMBOL("mySymbol"));
```


Duktape 2.2以前は、DUK_HIDDEN_SYMBOL()や他のシンボル・リテラル・マクロは使用できず、内部表現を直接使用することになります。

```c
/* Terminating a string literal after a hex escape is safest to avoid some
 * ambiguous cases like "\xffab".  For more discussion, see:
 * https://github.com/svaarala/duktape/blob/master/misc/c_hex_esc.c
 */
duk_push_string(ctx, "\xff" "mySymbol");
```


隠しシンボルは、ECMAScript コードからデフォルトのビルトインだけを使って作成することはできません。標準的な ES2015 Symbol は Symbol.for('foo') のように Symbol 組み込みで作成することができます。サンドボックス化する場合、アプリケーションの C バインディングが、入力バッファをエンコードせずにそのまま文字列に変換するなどして、隠れた Symbol を作成するメカニズムを誤って提供しないようにしてください。

現在、Hidden Symbolをキーとするプロパティに対する特別なアクセス制御はありません。ユーザーコードがSymbolにアクセスできれば、プロパティ値の読み書きが可能です。これは将来のメジャーバージョンで変更される可能性が高く、ECMAScript コードは、隠された Symbol 値への参照を保持している場合でも、隠された Symbol キーを持つプロパティにアクセスできないようにします。

