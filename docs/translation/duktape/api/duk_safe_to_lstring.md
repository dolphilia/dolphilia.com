## duk_safe_to_lstring() 

1.0.0 string stack

### プロトタイプ

```c
const char *duk_safe_to_lstring(duk_context *ctx, duk_idx_t idx, duk_size_t *out_len);
```

### スタック

| ... | val | ... | -> | ... | ToString(val) | ... |

### 要約

duk_to_lstring() と同様であるが、最初の文字列強制に失敗した場合、エラー値を文字列に強制します。それも失敗した場合、固定されたエラー文字列が返されます。

呼び出し側は、この関数を使って安全に値を文字列に強制することができ、 Cコードでは、printf()で安全に戻り値をプリントアウトするのに便利です。捕捉されないエラーは、メモリ不足とその他の内部エラーだけです。


### 例

```c
const char *ptr;
duk_size_t sz;

/* Coercion causes error. */
duk_eval_string(ctx, "({ toString: function () { throw new Error('toString error'); } })");
ptr = duk_safe_to_lstring(ctx, -1, &sz);
printf("coerced string: %s (length %lu)\n", ptr, (unsigned long) sz);  /* -> "Error: toString error" */
duk_pop(ctx);

/* Coercion causes error, and the error itself cannot be string coerced. */
duk_eval_string(ctx, "({ toString: function () { var e = new Error('cannot string coerce me');"
                     "                           e.toString = function () { throw new Error('coercion error'); };"
                     "                           throw e; } })");
ptr = duk_safe_to_lstring(ctx, -1, &sz);
printf("coerced string: %s (length %lu)\n", ptr, (unsigned long) sz);  /* -> "Error" */
duk_pop(ctx);
```

### 参照

duk_to_lstring