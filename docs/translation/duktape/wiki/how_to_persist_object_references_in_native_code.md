# Duktape/Cの引数をコール間で持続させる方法

Duktape/C関数が呼び出されると、Duktapeは呼び出しの引数をバリュー・スタックに配置します。引数がバリュー・スタック上にある間は、引数に到達できることが保証され、Duktape/C関数は安全に引数を操作することができます。

しかし、Duktape/C関数が戻ると、値スタックは巻き戻され、関数の値スタック・フレーム内の参照は失われてしまいます。特定の値への最後の参照が関数の値スタック・フレームにあった場合、その値は関数の戻り処理が行われる際にガベージ・コレクトされます。

Duktape/C関数では、引数値への参照を長期的に保存する必要がある場合があります。よくある例としては、setTimeout()のような関数の実装があり、ここではこれを実行例として使用します。

```js
setTimeout(function cb() {
    print('called after 1 second');
}, 1000);
```

このような機能を実現するための基本的な課題は、次のとおりです。

- Duktape/C関数は、ガベージ・コレクションを防ぐために、永続化された値への参照をどこかに保存しておく必要があります。言い換えれば、その値はDuktapeのガベージ・コレクターから見て到達可能でなければなりません。
- 別のDuktape/C関数は、コールバック関数を呼び出すことができるように、その参照を参照できる必要があります。複数のコールバック関数が登録されている場合、それらの関数にルックアップ・ハンドルとして文字列や数値の識別子を割り当てる必要があります。

## 永続的な参照の保存

### グローバルオブジェクト

もし、純粋なECMAScriptでsetTimeout()を実装するとしたら、その参照はグローバル・オブジェクトに保存されるでしょう。同じことを Duktape/C の関数で行うことができます。

### スタッシュオブジェクト

Duktapeの「スタッシュ」オブジェクトに参照を保存することができます。これらはグローバル・オブジェクトに似ていますが、ECMAScriptコードから（簡単に）到達することはできません。

- http://duktape.org/api.html#duk_push_heap_stash
- http://duktape.org/api.html#duk_push_global_stash
- http://duktape.org/api.html#duk_push_thread_stash

### 到達可能な任意のオブジェクト

到達可能なオブジェクトのプロパティとして参照を保存できます。オブジェクトは、グローバルオブジェクト、スタッシュ、現在のスレッドなどを通じて到達可能です。例えば

- 例えば、globalObject.callbacks を空の配列に初期化し、コールバックを配列要素として管理します。コールバックIDは、直接、配列のインデックスにすることができます。
- globalStash.callbacks を空のオブジェクトに初期化し、コールバックをオブジェクトの（文字列キー付きの）プロパティとして管理します。コールバックIDは、直接文字列キーにすることができます。

## 単一のグローバル変数を使用した例

最も簡単な方法は、コールバックをグローバル変数として保存することです。ECMAScript では、単純に

```js
var _callbackFunc;  // シングルコールバック関数

function setTimeout(cb, timeout) {
    if (typeof cb !== 'function') {
        throw new TypeError('callback not a function');
    }
    _callbackFunc = cb;
}

// Later on, a scheduler would call this
function invokeCallback() {
    var fn = _callbackFunc;
    _callbackFunc = null;
    fn();  // 設定されていない場合はTypeError
}
```

これをC言語で表現すると、次のようになる。

```c
duk_ret_t native_set_timeout(duk_context *ctx) {
    long timeout;
    duk_require_function(ctx, 0);
    timeout = (long) duk_require_uint(ctx, 1);

    duk_dup(ctx, 0);
    duk_put_global_string(ctx, "_callbackFunc");
    return 0;
}

duk_ret_t native_invoke_callback(duk_context *ctx) {
    duk_get_global_string(ctx, "_callbackFunc");
    duk_push_null(ctx);
    duk_put_global_string(ctx, "_callbackFunc");
    duk_call(ctx, 0);
    return 0;
}
```

実際には、コールバックの欠落を検出したり、コールバックのエラーを記録するのに便利です。

```c
duk_ret_t native_invoke_callback(duk_context *ctx) {
    duk_int_t rc;

    /* 現在のコールバックを取得します。 */
    duk_get_global_string(ctx, "_callbackFunc");

    /* コールバックが存在するかどうかを明示的にチェックし、コールバックがない場合はログを記録して終了します。 */
    if (!duk_is_function(ctx, -1)) {
        printf("No callback registered\n");
        return 0;
    }

    /* 登録されているコールバックを削除し、再コールしないようにする。 */
    duk_push_null(ctx);
    duk_put_global_string(ctx, "_callbackFunc");

    /* プロテクトされたコール、コールバックのエラーを記録する。 */
    rc = duk_pcall(ctx, 0);
    if (rc != 0) {
        printf("Callback failed: '%s'\n", duk_safe_to_string(ctx, -1));
    }
    duk_pop(ctx);

    return 0;
}
```

複数のコールバックを保持するためにコールバックデータ構造を変更したり、コールバックに番号や文字列IDを割り当てたりすることは、この基本的なパターンの簡単な拡張である。

