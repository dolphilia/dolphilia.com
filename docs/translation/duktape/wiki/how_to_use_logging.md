# ロギングの使用方法

## 概要

Duktape 1.xには、小さなフットプリントと適度なパフォーマンス、そしてリダイレクト可能な出力を持つビルトイン・ロギング・フレームワークがあります。Duktape 2.xでは、このフレームワークは、エキゾチックなターゲットでの移植性の問題を 避けるために、オプションの追加機能(https://github.com/svaarala/duktape/tree/master/extras/logging)に移されました。

ロギングフレームワークの機能と内部の詳細については、https://github.com/svaarala/duktape/blob/master/doc/logging.rst を参照してください。

もちろん、他の任意のロギングフレームワーク、例えば https://github.com/svaarala/duktape/tree/master/extras/console によって提供される console.log() を使用することもできます。低メモリのターゲットでは、単一の print() バインディングのようなもっと単純なものが、最も適切なアプローチかもしれません。

## 例

基本的な使用例です。

```js
var val1 = 'foo';
var val2 = 123;
var val3 = new Date(123456789e3);

var logger = new Duktape.Logger();  // or new Duktape.Logger('logger name')
logger.info('three values:', val1, val2, val3);
```

この例では、以下のような内容が標準エラー出力に出力されます。

```
2014-10-17T19:26:42.141Z INF test.js: three values: foo 123 1973-11-29 23:33:09.000+02:00
```

## Duktape.Logger (ビルダー)

| Property  |                          Description                          |
| --------- | ------------------------------------------------------------- |
| prototype | Logger オブジェクトのプロトタイプです。                       |
| clog      | Cコードから書かれたログエントリーのための代表的なロガーです。 |

コンストラクターとして呼び出され、指定された名前（最初の引数）を持つ新しい Logger オブジェクトを作成します。名前が省略された場合、Logger は呼び出し元の関数の .fileName プロパティに基づいた名前を自動的に割り当てます。通常の関数として呼び出された場合、TypeErrorを投げます。

Loggerインスタンスは、以下のプロパティを持ちます。

- n: ロガー名。（a）与えられた名前が文字列でない場合、または（b）名前が与えられず、自動割り当てが失敗した場合、プロパティは欠落します。ロガーは、ロガー・プロトタイプから値を継承します。このプロパティは、後で希望する値に手動で設定することができます。
- l: ログ・レベル、出力する最小ログ・レベルを示します。このプロパティは、デフォルトでは割り当てられず、ロガーは、ロガー プロトタイプからデフォルトのレベルを継承します。このプロパティを手動で別の値に設定し、ロガー単位でログ レベルを制御することができます。

(テール呼び出しは、理論的には自動的な名前の割り当てに影響する場合があります (つまり、ロガー名引数が省略された場合)。しかし、コンストラクター呼び出しがテール呼び出しに変換されることはないので、これは現実的な問題ではありません)。

## Duktape.Logger.prototype

| Property |                        Description                         |
| -------- | ---------------------------------------------------------- |
| raw      | フォーマットされたログ行を出力します (バッファ値)。        |
| fmt      | 単一の（オブジェクト）引数をフォーマットする。             |
| trace    | トレースレベル（レベル0、TRC）のログエントリーを書き込む。 |
| debug    | デバッグレベル（レベル1、DBG）のログエントリーを書き込む。 |
| info     | 情報レベル（レベル2、INF）のログエントリーを書き込む。     |
| warn     | 警告レベル（レベル3、WRN）のログエントリーを書き込む。     |
| error    | エラーレベル（レベル4、ERR）のログエントリーを書き込む。   |
| fatal    | 致命的なレベル（レベル5、FTL）のログエントリを書き込む。   |
| l        | ログレベルの初期値、初期値は2（情報）です。                |
| n        | デフォルトのロガー名で、初期値は "anon "です。             |

## duk_log() C API call

```c
void duk_log(duk_context *ctx, duk_int_t level, const char *fmt, ...);
```

指定されたログレベル (DUK_LOG_xxx の一つ) で、フォーマットされたログエントリを書き込みます。ログの書き込みは、Duktape.Logger.clogger のインスタンスを使用して、ロギングフレームワークを通過します。

例

```c
duk_log(ctx, DUK_LOG_INFO, "received message, type: %d", (int) msg_type);
```

## duk_log_va() C API call

```c
void duk_log_va(duk_context *ctx, duk_int_t level, const char *fmt, va_list ap);
```

duk_log() と似ているが、vararg (va_list) の変種である。例

```c
void my_log_info(duk_context *ctx, const char *fmt, ...) {
    va_list ap;

    va_start(ap, fmt);
    duk_log_va(ctx, DUK_LOG_INFO, fmt, ap);
    va_end(ap);
}
```