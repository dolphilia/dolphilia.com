## duk_throw() 

1.0.0 error

### プロトタイプ

```c
duk_ret_t duk_throw(duk_context *ctx);
```

### スタック

| ... | val |

### 要約

スタックの一番上にある値を投げます。。この呼び出しは決して戻りません。

この関数は決して戻りませんが、プロトタイプは戻り値を記述しており、次のようなコードを可能にします。

```c
if (argvalue < 0) {
    duk_push_error_object(ctx, DUK_ERR_TYPE_ERROR, "invalid argument: %d", (int) argvalue);
    return duk_throw(ctx);
}
```

戻り値が無視される場合、コンパイル時の警告を避けるため、voidにキャストします。

```c
if (argvalue < 0) {
    duk_push_error_object(ctx, DUK_ERR_TYPE_ERROR, "invalid argument: %d", (int) argvalue);
    (void) duk_throw(ctx);
}
```

### 例

```c
/* Throw a string value; equivalent to the ECMAScript code:
 *
 *   throw "this string is thrown";
 */

duk_push_string(ctx, "this string is thrown");
(void) duk_throw(ctx);
```

### 参照

duk_error
duk_push_error_object