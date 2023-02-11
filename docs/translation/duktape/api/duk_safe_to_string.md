## duk_safe_to_string() 

1.0.0 string stack protected

### プロトタイプ

```c
const char *duk_safe_to_string(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | ToString(val) | ... |

### 要約

duk_to_string() と同様であるが、最初の文字列強制に失敗した場合、エラー値を文字列に強制します。これも失敗した場合、あらかじめ確保された固定エラー文字列 "Error" が代わりに使用される (文字列はあらかじめ確保されているので、メモリ不足で失敗することはない)。

呼び出し側は、この関数を使って安全に値を文字列に変換することができます。これは、Cコードでprintf()を使って安全に戻り値をプリントアウトするのに便利な機能です。捕捉されないエラーは、メモリ不足とその他の内部エラーのみです。

ECMAScriptに相当します。

```javascript
function duk_safe_to_string(val) {
    function tostr(x) {
        try {
            return String(x);
        } catch (e) {
            return e;
        }
    }

    // Initial coercion attempt.
    var t = tostr(val);
    if (typeof t === 'string') {
        // ToString() coercion succeeded with a string result, or
        // coercion failed with a plain string error value; return as is.
        return t;
    }

    // Result was an Error or a non-string, try to coerce again.
    t = tostr(t);
    if (typeof t === 'string') {
        return t;
    }

    // Still an Error or a non-string, return fixed value.
    return 'Error';
}
```

文字列の強制は、エラースローから安全ですが、現在の実装では副作用があるかもしれません。特に、文字列の強制は無限ループに入り、決して戻ってこないかもしれない。

### 例

```c
/* Coercion causes error. */
duk_eval_string(ctx, "({ toString: function () { throw new Error('toString error'); } })");
printf("coerced string: %s\n", duk_safe_to_string(ctx, -1));  /* -> "Error: toString error" */
duk_pop(ctx);

/* Coercion causes error, and the error itself cannot be string coerced. */
duk_eval_string(ctx, "({ toString: function () { var e = new Error('cannot string coerce me');"
                     "                           e.toString = function () { throw new Error('coercion error'); };"
                     "                           throw e; } })");
printf("coerced string: %s\n", duk_safe_to_string(ctx, -1));  /* -> "Error" */
duk_pop(ctx);
```

### 参照

duk_to_string