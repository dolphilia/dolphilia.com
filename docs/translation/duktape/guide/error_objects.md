## エラー・オブジェクト {#error_objects}

### プロパティの概要

ECMAScript Error オブジェクトには標準的なプロパティがほとんどないため、多くの ECMAScript 実装がかなりの数のカスタムプロパティを追加しています。Duktape は標準の Error プロパティを使用しますが、他の実装で使用されている最も有用なプロパティも借用しています。エラー・オブジェクトの "独自の "プロパティの数は、エラー・オブジェクトをできるだけ小さく保つために最小化されています。

エラー・オブジェクトは以下のプロパティを持ちます（ほとんどが継承されます）。


| Property name | Compatibility | Description |
| ------------- | ------------- | ---- |
| name          | standard      | Name of error, e.g. TypeError, inherited |
| message       | standard      | Optional message of error, own property, empty message inherited if absent |
| fileName      | Rhino         | Filename related to error source, inherited accessor |
| lineNumber    | Rhino         | Linenumber related to error source, inherited accessor |
| stack         | V8            | Traceback as a multi-line human redable string, inherited accessor |


> 最も有用なfileNameとlineNumberの割り当ては、やや複雑です。関連する問題と現在の動作は、error-objects.rstに記述されています。

Duktapeがトレースバック・サポート付きでコンパイルされている場合。

- stack, fileName, lineNumber は Error.prototype から継承されたアクセサー・プロパティです。これらのプロパティは、単純に代入することでオーバーライドできます。継承されたセッターは書き込みをキャプチャしますが、通常の代入が行われたように独自のプロパティを作成します。この動作はDuktape 1.4.0で変更され、他のエンジンとより良くマッチするようになりました。
- アクセッサ・プロパティが必要とする生のトレースバック・データは、内部プロパティ (\x82Tracedata) に格納され、ECMAScript コードからは通常アクセスできません。

Duktapeがトレースバック・サポートなしでコンパイルされた場合。

- スタックアクセサーはError.prototype.toString()と同等になり、スタックトレースの印刷は常に有用で人間が読め る結果を生成するようになります。
fileName と lineNumber は、Error オブジェクトのプロパティです。このプロパティは、代入によってオーバーライドすることができます。
- エラー・オブジェクトがCコードからDuktape APIを使用して作成され、呼び出し元がメッセージのフォーマット文字列を与えない場合、messageプロパティはAPI呼び出しで与えられた数値のエラー・コードに設定されます。この場合、メッセージのタイプは数値になります。通常、エラー・メッセージは文字列です。最小化されたDuktapeビルドでは、Duktapeが内部的に生成するすべてのエラーは、数値エラー・コードのみを使用します。

オブジェクトは、その内部プロトタイプ・チェーンが（オリジナルの）Error.prototypeオブジェクトを含んでいれば、「エラー・オブジェクト」と見なされます。この基準に一致するオブジェクトだけが、例えばトレースバック・データで補強されます。


### トレースバック

stack プロパティは、エラーに関連する印刷可能なトレースバックを提供するアクセッサ (セッター/ゲッター) プロパティです。トレースバックは、エラー・オブジェクトが作成された (スローされなかった) 時のコール・スタックを反映します。トレースバックデータは自動的に収集され、オブジェクトに追加されます。

- Error インスタンスが構築されたとき。
- Duktape APIを使用したCコードからエラーがスローされたとき。
- Duktape内部からエラーがスローされたとき。

トレースバックの作成に使用されるデータは、内部プロパティ( \x82Tracedata) に格納され、内部およびバージョンに依存した形式で error-objects.rst に記述されま す。トレースバックデータに直接アクセスしてはいけません。

印刷可能なトレースバックのフォーマットは、人間が読むことだけを目的としています。バージョン間で変更される可能性があるため、正確なトレースバック形式に依存してはいけません (例えば、トレースバックは 1.5.0 リリースで改善されました)。現在のトレースバック形式の例として、プログラム。

```javascript
// shortened from tests/ecmascript/test-dev-traceback-example.js
try {
    decodeURIComponent('%e1%a9%01');  // invalid utf-8
} catch (e) {
    print(e.stack);
}
```

このようなものが印刷されるでしょう。

```sh
URIError: invalid input
    at [anon] (duk_bi_global.c:343) internal
    at decodeURIComponent () native strict preventsyield
    at global (test.js:3) preventsyield
```


トレースバックが無効なビルドでは、スタックアクセサは、エラー時に toString() を呼び出すのと同じ値を返します。つまり、いつでも e.stack を表示して、有用な出力を得ることができるのです。

最も移植性の高いトレースバックの印刷方法は、次のようなものです。

```javascript
try {
    decodeURIComponent('%e1%a9%01');  // invalid utf-8
} catch (e) {
    // 少なくとも Duktape と V8 ではスタックトレースを表示し、
    // それ以外では標準エラー文字列を表示します。
    print(e.stack || e);
}
```


スタックへの書き込みの試みは、継承されたセッターによって捕捉され、通常の割り当てが行われたかのように、独自のプロパティを作成します。この動作は、スタックがエラーインスタンスの独自のプロパティであるV8とは異なります。


### エラー・ハンドラ（errCreate と errThrow）

Duktape.errCreate が設定されている場合、Duktape がオブジェクトにトレースバック情報を追加した直後に呼び出され、さらにエラーを処理したり、エラー値を完全に置き換えたりすることができます。エラー・ハンドラはErrorインスタンスでのみ呼び出され、その戻り値が最終的なエラー値として使用されます。エラーハンドラがエラーをスローした場合、そのエラーは元のエラーに置き換わります。エラーハンドラは通常、1つのエラーにつき1回だけ呼び出されます。しかし、コンストラクタのコーナーでは、エラーハンドラは 1 つのエラー値に対して複数回呼び出されることがあります。

エラーハンドラは、オブジェクトにすでに存在するプロパティを上書きすることは避けなければなりません。一般に、エラーハンドラはエラーを投げることを避けるべきです。なぜなら、そのエラーは元のエラーに取って代わるからです。具体的な例としては、拡張不可能なオブジェクトに新しいプロパティを追加しようとすると TypeError が発生するので、エラーハンドラはそれを回避しなければならない。

以下は、エラー発生時に作成タイムスタンプを追加するエラーハンドラの例である。

```javascript
Duktape.errCreate = function (e) {
    if (!(e instanceof Error)) {
        // this check is not really needed because errCreate only gets
        // called with Error instances
        return e;
    }
    if ('created' in e) {
        // already augmented or conflicting property present
        return e;
    }
    if (!Object.isExtensible(e)) {
        // object not extensible, don't try to add a new property
        return e;
    }
    e.created = new Date();
    return e;
}
```


ハンドラを削除するには、そのプロパティを削除してください（例えばnullに設定しても機能せず、Duktapeがnull値を呼び出そうとするとTypeErrorが発生します）。

``` javascript
// Remove error handler for error creation
delete Duktape.errCreate;
```


同様に、Duktape.errThrow が設定されている場合、エラーがスローされる直前に呼び出され、エラー値を処理したり置き換えたりすることができます。ECMAScript は任意の値の型を投げることができるので、エラーハンドラは任意の入力値（Error インスタンスだけでなく）で呼び出されるかもしれません。また、エラーは何度も再スローできるため、同じ値で複数回呼ばれることもあります。

たとえば、エラーに throw タイムスタンプ (オブジェクトが最初にスローされたときの記録) を追加するには、次のようにします。

```javascript
Duktape.errThrow = function (e) {
    if (!(e instanceof Error)) {
        // refuse to touch anything but Error instances
        return e;
    }
    if ('thrown' in e) {
        // already augmented or conflicting property present
        return e;
    }
    if (!Object.isExtensible(e)) {
        // object not extensible, don't try to add a new property
        return e;
    }
    e.thrown = new Date();
    return e;
}
```

繰り返しになりますが、ハンドラを削除するには、プロパティを削除してください。

```javascript
// Remove error handler for error throwing
delete Duktape.errThrow;
```


### 現在の制限事項

- コーズチェーンのサポートがない。原因チェーンは便利ですが、ECMAScript には原因チェーンはありませんし、そのためのデファクトスタンダードもないようです。
- これらは現在、バージョン互換性のある方法で、プログラム的にトレースバック要素にアクセスする方法はありません。しかし、_Tracedata hidden Symbol (C コードから DUK_HIDDEN_SYMBOL("Tracedata")) にアクセスすることはできますが、生の tracedata のフォーマットはマイナーバージョンでも変更される可能性があります。.stackプロパティを直接上書きすることも可能です。
- エラーがカスタム・エラー・クラスへの非コンストラクタ関数呼び出しで作成された場合（new MyError('msg') の代わりに MyError('msg') ）、トレースバック・データのようなカスタム・フィールドで拡張されることはありません。コンストラクタとして呼び出された場合、Error を継承したカスタム・エラーは通常通り追加されます。組み込みの標準エラー (TypeError など) は、コンストラクタ以外の関数呼び出しで作成された場合でも、常に拡張されます (ただし、エラーの作成方法によって、トレースバックは若干異なって見えます)。

