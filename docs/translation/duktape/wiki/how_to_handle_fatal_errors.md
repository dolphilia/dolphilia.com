# 致命的なエラーの対処法

## エラーの種類

Duktapeが扱うエラーは3種類あります。

- throw、duk_error()、duk_throw()などで発生する通常のエラー。
- 捕捉されないエラー、duk_fatal()の明示的な呼び出し、あるいは Duktape内部での回復不能なエラーによって引き起こされる致命的なエラー。
- Duktapeのヒープやスレッドのコンテキストを持たない致命的なエラーで、 Duktape内部のアサーションに失敗した場合などに発生します。

通常のエラーは、longjmpやC++の例外を使用して内部的に伝播されます（設定に依存します）。これらのエラーはECMAScriptのtry-catchやprotected C APIコールを使って捕捉されます。

捕捉されないエラーなどによる致命的なエラーは、duk_create_heap() で登録された致命的なエラーハンドラの呼び出しをトリガーします。handler 引数に NULL が指定された場合、組み込みのデフォルトの致命的エラーハンドラが代わりに使用されます。デフォルトの致命的なエラーハンドラは、DUK_USE_CPP_EXCEPTIONS 設定オプションに応じて、 abort() を呼び出すか、C++ 例外 (duk_fatal_exception) を投げるかのどちらかです。カスタムの致命的なエラーハンドラを提供することが強く推奨されます。

コンテキストがない致命的なエラーは、現在アサーション失敗に限定されていますが、コンテキストがないとヒープ関連のハンドラを検索できないので、常に組み込みのデフォルトの致命的なエラーハンドラの呼び出しをトリガーします。これらは、明示的にアサーションを有効にした場合のみ発生します。

## 致命的なエラーハンドラの例

ヒープ作成時にハンドラを登録する。

```js
duk_context *ctx;
void *my_udata = (void *) 0xdeadbeef;  /* 最も有用なものは、NULLである。 */

ctx = duk_create_heap(NULL, NULL, NULL, my_udata, my_fatal);
/* ... */
```

致命的なエラーハンドラは、例えば、次のようなものがある。

```js
static void my_fatal(void *udata, const char *msg) {
    (void) udata;  /* この場合、サイレント警告は無視されます */

    /* 'msg' は NULL でもよいことに注意すること。 */
    fprintf(stderr, "*** FATAL ERROR: %s\n", (msg ? msg : "no message"));
    fflush(stderr);
    abort();
}
```

Duktape 1.xでは、致命的なエラーハンドラ関数にエラーコードの引数が追加されていました。

## デフォルトの致命的なエラーハンドラを内蔵

組み込みのデフォルトの致命的なエラーハンドラは、基礎となるプラットフォームに関する最小限の仮定に対して最適化されています。デフォルトの動作は DUK_USE_CPP_EXCEPTIONS コンフィグオプションに依存します。

- DUK_USE_CPP_EXCEPTIONS が無効な場合 (デフォルト)、 デフォルトのハンドラはデバッグログエントリを書き (ただし stdout や stderr には何も書きません!)、 DUK_ABORT() 設定定義を通じて abort() を呼び出します (これは置き換え可能です)。abort() が返されると、ハンドラは無限ループに入り、致命的なエラーの後に実行が続かないことを確認します (これは明らかに決して起こってはいけません)。

- DUK_USE_CPP_EXCEPTIONS が有効な場合: デフォルトのハンドラは、デバッグログエントリを書き (stdout や stderr には何も書きません)、duk_fatal_exception を投げます。この例外は std::runtime_error を継承しており、致命的なエラーメッセージにアクセスするための ::what() メソッドを提供します。この例外は捕捉可能ですが、捕捉した後に実行を継続することは安全ではありません。

- Duktape 2.3以前では、DUK_USE_CPP_EXCEPTIONSの動作は少し異なっていました。キャッチできないエラーはduk_internal_exceptionとして伝播し、他の致命的なエラー（アサーション失敗など）はabort()を使用します。

デフォルトの動作はほとんどの環境ではあまり有用ではないので、そうすべきです。

1.ヒープを作成するときに致命的なエラーハンドラを提供する。これは良い習慣です。なぜなら、致命的なエラー(アサーション失敗を除く)がどのように処理されるかを制御できるからです。
2.これは、明示的な致命的エラー・ハンドラを持たないDuktapeヒープや、 コンテキストなしで引き起こされる致命的エラー（アサーション・エラーのような） の致命的エラー処理を改善するものです。デフォルト・ハンドラをオーバーライドすることは、Duktapeをシステム・ ライブラリとして提供する場合に特に重要です。
Example of overriding the default fatal error handler in duk_config.h:

```js
/* stdio.h' が含まれていることを確認する。 */

#define DUK_USE_FATAL_HANDLER(udata,msg) do { \
        const char *fatal_msg = (msg); /* 二重評価を避ける */ \
        (void) udata; \
        fprintf(stderr, "*** FATAL ERROR: %s\n", fatal_msg ? fatal_msg : "no message"); \
        fflush(stderr); \
        abort(); \
    } while (0)
```

また、genconfig --option-file のようにすると、ハンドラを指定することができます。

```yaml
# my_fatal.yaml
DUK_USE_FATAL_HANDLER:
  verbatim: |
    #define DUK_USE_FATAL_HANDLER(udata,msg) do { \
            const char *fatal_msg = (msg); /* 二重評価を避ける */ \
            (void) udata; \
            fprintf(stderr, "*** FATAL ERROR: %s\n", fatal_msg ? fatal_msg : "no message"); \
            fflush(stderr); \
            abort(); \
        } while (0)
```