## duk_to_stacktrace() 

2.4.0 string stack

### プロトタイプ

```c
const char *duk_to_stacktrace(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | val.stack | ... |

### 要約

任意の値をスタックトレースに出力します。idxの値はErrorインスタンスであることが期待されますが、必須ではありません。引数がオブジェクトの場合、この呼び出しは引数の .stack プロパティを検索し、プロパティ値が文字列であればその結果になります。そうでなければ、引数は文字列の結果を確実にするために duk_to_string(val) で置き換えられます。副作用やメモリ不足のために強制が失敗した場合、エラーが投げられるかもしれません。

この API 呼び出しの安全なバージョンとして、 duk_safe_to_stacktrace() があり、これは、エラーを処理する際に、より有用かもしれません。

ECMAScript の値強制に相当します。

```javascript
function duk_to_stacktrace(val) {
    if (typeof val === 'object' && val !== null) {  // Require val to be an object.
        var t = val.stack;  // Side effects, may throw.
        if (typeof t === 'string') {  // Require .stack to be a string.
            return t;
        }
    }
    return String(val);  // Side effects, may throw.
}
```

この強制は、別のグローバル環境（Realm）で作成された外部Errorオブジェクトでも動作するように、（継承に基づく）instanceofチェックを意図的に回避しています。


### 例

```c
if (duk_peval_string(ctx, "1 + 2 +") != 0) {  /* => SyntaxError */
    printf("failed: %s\n", duk_to_stacktrace(ctx, -1));  /* Note: may throw */
} else {
    printf("success\n");
}
duk_pop(ctx);
```

### 参照

duk_to_string
duk_safe_to_stacktrace