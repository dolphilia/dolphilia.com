
## タイプ・アルゴリズム {#type_algorithms}

このセクションでは、比較や強制などの型に関連するECMAScriptアルゴリズムが、どのようにDuktapeカスタム型に拡張されるかについて説明します。Duktape特有の型アルゴリズム（ToBuffer()とToPointer()）も説明します。


### 表記方法

値がどのように比較されるかを示すために、次のような省略記法が使われます。

| 値 | 説明 |
| ---- | ---- |
| t | 真と比較する |
| f | 偽と比較する |
| s | 単純比較：ブーリアン同士、文字列同士（文字列の内容を比較する）|
| n | 数値の比較。NaN 値は偽を比較し、0 は符号に関係なく真を比較します (例: +0 == -0)。 |
| N | SameValue での数値比較。NaN 値は真を比較し、0 は符号に関係なく比較します (例: SameValue(+0,-0) は偽) |
| p | ヒープポインタの比較 |
| L | lightfuncの比較： Duktape/Cの関数ポインタと内部制御フラグ（「マジック」値を含む）が等しいと見なすには、一致する必要があります。 |
| 1 | string vs. number: ToNumber()で文字列を強制し、比較を再試行。 |
| 2 | boolean vs. any: ToNumber() で boolean を 0 または 1 に固定し、比較を再試行。 |
| 3 | object vs. string/number: ToPrimitive() で object を強制し、比較を再試行。 |

> Booleanオブジェクト、Stringオブジェクト、Numberオブジェクトは、自動的にアンボックスされるのではなく、他のオブジェクトと同様に比較されることに注意してください。例えば、非厳格な等式では、プレーンな文字列の値をバイト単位で比較しますが、Stringオブジェクトはオブジェクト参照で比較します（他のオブジェクトと同様）。


### 等価性（非厳格）

非厳格な等式比較は、標準型についてはThe Abstract Equality Comparison Algorithmで規定されています。カスタム型の動作は以下の通りです。

- Buffer: プレーンバッファーはヒープポインタ（参照）によって比較され、内容の比較は行われません。これはUint8Arrayの動作と一致します。
- ポインター：他の型との比較はfalseを返します。ポインタとの比較は、ポインタの値が同じ場合にのみ、真を返します。特に、数値とポインタの比較はfalseを返すことに注意してください。これは少し直感的でないように思えますが、数値は 64 ポインターを正確に表すことができないので、数値とポインターを比較するとエラーが発生しやすくなる可能性があります。
- Lightfunc: 他の型と比較すると、false が返されます。lightfuncとの比較は、Duktape/C関数ポインタと内部制御フラグ（「マジック」値を含む）の両方が一致する場合にのみ、真を返します。たとえ、Functionオブジェクトがlightfuncをオブジェクトに強制することによって作成されたとしても、lightfuncは通常のFunctionオブジェクトと等しく比較されないことに注意してください。

標準的な動作とDuktapeカスタム・タイプの動作は、以下の表にまとめられています。


|  | und | nul | boo | num | str | obj | buf | ptr | lfn |
| ---- | ---- | ---- | ---- | ---- | ---- | ----| ---- | ---- | ---- |
| und | t | t | f | f | f | f | f | f | f |
| nul |   | t | f | f | f | f | f | f | f |
| boo |   |   | s | 2 | 2 | 2 | f | f | f |
| num |   |   |   | n | 1 | 3 | f | f | f |
| str |   |   |   |   | s | 3 | f | f | f |
| obj |   |   |   |   |   | p | f | f | f |
| buf |   |   |   |   |   |   | p | f | f |
| ptr |   |   |   |   |   |   |   | s | f |
| lfn |   |   |   |   |   |   |   |   | L |


### 厳密な等価性

厳密な等式はより単純で、単純さとパフォーマンスのために可能な限り望ましいものです。これは、標準的な型のための厳密な等式比較のアルゴリズムで説明されています。カスタム型の動作は以下の通りです。

- バッファ: 非厳格な等式と同様です。
- ポインタ：非厳格な等価性のようなもの。
- Lightfunc: 非厳格な等価性のようなものです。

標準の動作とDuktapeカスタム型の動作は、以下の表にまとめられています。

|  | und | nul | boo | num | str | obj | buf | ptr | lfn |
| ---- | ---- | ---- | ---- | ---- | ---- | ----| ---- | ---- | ---- |
| und | t | f | f | f | f | f | f | f | f |
| nul |   | t | f | f | f | f | f | f | f |
| boo |   |   | s | f | f | f | f | f | f |
| num |   |   |   | n | f | f | f | f | f |
| str |   |   |   |   | s | f | f | f | f |
| obj |   |   |   |   |   | p | f | f | f |
| buf |   |   |   |   |   |   | p | f | f |
| ptr |   |   |   |   |   |   |   | s | f |
| lfn |   |   |   |   |   |   |   |   | L |


### セイムバリュー

SameValue アルゴリズムは、ユーザー・コードから呼び出すのは簡単ではありません。これは、例えば Object.defineProperty() で、プロパティの値が変更されようとしているかどうかをチェックするときに使用されます。SameValue は厳密な等値比較よりもさらに厳しく、最も顕著なのは数値の比較方法が異なることです。これは、The SameValue algorithm for standard typesで規定されています。カスタム型の動作は以下の通りです。

- バッファ：非厳格（および厳密）等値のようなものです。
- ポインター：非厳格な（および厳密な）等価性のようなものです。
- Lightfunc: 非厳格な(および厳密な)等式と同じです。

標準の動作とDuktapeカスタム型の動作は、以下の表にまとめられています。


|  | und | nul | boo | num | str | obj | buf | ptr | lfn |
| ---- | ---- | ---- | ---- | ---- | ---- | ----| ---- | ---- | ---- |
| und | t | f | f | f | f | f | f | f | f |
| nul |   | t | f | f | f | f | f | f | f |
| boo |   |   | s | f | f | f | f | f | f |
| num |   |   |   | N | f | f | f | f | f |
| str |   |   |   |   | s | f | f | f | f |
| obj |   |   |   |   |   | p | f | f | f |
| buf |   |   |   |   |   |   | p | f | f |
| ptr |   |   |   |   |   |   |   | s | f |
| lfn |   |   |   |   |   |   |   |   | L |


### 型の変換とテスト

カスタム型は、型変換とテストについて説明したECMAScriptの強制力に対して、以下のように動作します（すでに上で説明したSameValueは除く）。

|                      | buffer                                                                  | pointer                                      | lightfunc                                    |
| -------------------- | ----------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------- |
| DefaultValue         | Usually "[object Uint8Array]"; like Uint8Array                          | TypeError                                    | "light_\<PTR\>_\<FLAGS\>" (toString/valueOf) |
| ToPrimitive          | Usually "[object Uint8Array]"; like Uint8Array                          | identity                                     | "light_\<PTR\>_\<FLAGS\>" (toString/valueOf) |
| ToBoolean            | true                                                                    | false for NULL pointer, true otherwise       | true                                         |
| ToNumber             | ToNumber(String(buffer)), usually ToNumber("[object Uint8Array]") = NaN | 0 for NULL pointer, 1 otherwise              | NaN                                          |
| ToInteger            | same as ToNumber; usually 0                                             | same as ToNumber                             | 0                                            |
| ToInt32              | same as ToNumber; usually 0                                             | same as ToNumber                             | 0                                            |
| ToUint32             | same as ToNumber; usually 0                                             | same as ToNumber                             | 0                                            |
| ToUint16             | same as ToNumber; usually 0                                             | same as ToNumber                             | 0                                            |
| ToString             | Usually [object Uint8Array]; like Uint8Array                            | sprintf() with %p format (platform specific) | "light_\<PTR\>_\<FLAGS\>"                    |
| ToObject             | Uint8Array object (backs to argument plain buffer)                      | Pointer object                               | Function object                              |
| CheckObjectCoercible | allow (no error)                                                        | allow (no error)                             | allow (no error)                             |
| IsCallable           | false                                                                   | false                                        | true                                         | 
| SameValue            | (covered above)                                                         | (covered above)                              | (covered above)                              |


バッファが文字列強制されると、Uint8Arrayのように振る舞い、その結果は通常"[object Uint8Array]"となります。この動作はDuktape 2.0で変更されました。バッファの内容から文字列を生成するには、Node.jsのBufferバインディングやEncoding APIなどを使用します。

バッファがオブジェクト強制されると、新しい Uint8Array オブジェクトが作成され、新しい ArrayBuffer がプレーン バッファにバックアップされます (コピーは作成されません)。

Lightfunc が ToPrimitive() で強制されると、普通の関数のように動作します。それは Function.prototype.toString() で強制され、結果は（通常） ToString() 強制と同じになります。

lightfunc がオブジェクト強制されると、新しい Function オブジェクトが作成され、仮想プロパティ (name と length) と内部の "magic" 値が Function オブジェクトにコピーされます。


### カスタム強制（ToBuffer, ToPointer）

ToBuffer() は、例えば duk_to_buffer() API 呼び出しで、値がバッファ型に強制されるときに使用されます。強制は以下の通りです。

- バッファはそれ自身に強制される(identity)。同じバッファの値が返されます。
- その他の型（ポインタと lightfunc を含む）は、まず ToString で文字列強制され、次に結果の文字列がバイト単位で固定サイズのバッファにコピーされます。

ToPointer() の強制は、例えば、duk_to_pointer() の呼び出しで使用されます。この強制は次のようなものです。

- ポインタはそれ自身に強制される。
- ヒープで確保された型(文字列、オブジェクト、バッファ)は、その内部ヒープヘッダーを指すポインタ値に強制されます。このポインタは診断値のみを持つ。特に、バッファや文字列に対して返されるポインタは、バッファや文字列のデータ領域を指さないことに注意してください。(この強制はマイナーバージョンでも変更される可能性がありますので、依存しないようにしてください）。
- その他の型 (数値を含む) は、NULL ポインタを指すように強制されます。
- Lightfunc は NULL ポインタに強制されます。これは、C 関数ポインターを移植可能な方法で void * に強制できないためです。

オブジェクトが作成され、仮想プロパティ（名前と長さ、および内部の「マジック」値）が Function オブジェクトにコピーされます。


|          | ToBuffer                                     | ToPointer       |
| -------- | -------------------------------------------- | --------------- |
|undefined | buffer with "undefined"                      | NULL            |
|null      | buffer with "null"                           | NULL            |
|boolean   | buffer with "true" or "false"                | NULL            |
|number    | buffer with string coerced number            | NULL            |
|string    | buffer with copy of string data              | ptr to heap hdr |
|object    | buffer with ToString(value)                  | ptr to heap hdr |
|buffer    | identity                                     | ptr to heap hdr |
|pointer   | sprintf() with %p format (platform specific) | identity        |
|lightfunc | buffer with ToString(value)                  | NULL            |

> 現在、ToLightFunc()の強制はありません。Lightfuncは、Duktape C APIを使ってのみ作成することができます。


### 加算演算子

ECMAScript の加算演算子は The Addition operator (+) で指定されています。加算は、どちらかの引数が文字列である場合に特別な動作をします：もう一方の引数は文字列に強制され、その後文字列は連結されます。この動作は、以下のようにカスタム型にも拡張されます。

- 標準の型では、オブジェクトの値は最初に ToPrimitive() で強制され、プレーン バッファと lightfuncs は通常 ToString() で強制されます。プレーン バッファの場合、結果は通常 "[object Uint8Array]" になり、lightfuncs の場合は "[object Function]" になります。
- ポインタの値は、デフォルトの数値加算のケースに該当します。これらは ToNumber() で強制された後、数値として追加されます。NULL ポインタは 0 に、NULL 以外は 1 になります。

加算は、一般にカスタム型には有用ではありません。たとえば、2 つのプレーンなバッファを加算すると、結果は通常 "[object Uint8Array] [object Uint8Array]" となり、これは 2 つの Uint8Array インスタンスに対する標準的な加算の動作と同じになります。


### プロパティ・アクセス

プロパティ・アクセスのベース値としてプレーン・バッファまたはポインタが使用 される場合、プロパティは（初期の）組み込みプロトタイプ・オブジェクト（Uint8Array.prototype または Duktape.Pointer.prototype）から検索されることになります。これは、標準的な型の動作を模倣しています。

例えば

```sh
duk> buf = Duktape.dec('hex', '414243');  // plain buffer
= ABC
duk> buf.subarray();
= function subarray() {"native"}
duk> typeof buf.toString();
= string
```

Lightfuncs は、設定や書き込みができない仮想プロパティ（name と length）をいくつか持ち、残りのプロパティは Function.prototype を継承し、継承された通常の Function メソッドを呼び出すことができるようになっています。

```javascript
var bound = myLightFunc.bind('dummy', 123);
```

