## duk_safe_to_stacktrace() 

2.4.0 string stack protected

### プロトタイプ

```c
const char *duk_safe_to_stacktrace(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | val.stack | ... |

### 要約

duk_to_stacktrace() と同様であるが、もし coercion が失敗した場合、 duk_to_stacktrace() が coercion エラーに適用されます。これも失敗した場合、代わりにあらかじめ確保された固定エラー文字列 "Error" が使用されます (この文字列はあらかじめ確保されているので、メモリ不足で失敗することはありません)。

ECMAScript に相当します。

```javascript
function duk_safe_to_stacktrace(val) {
    try {
        return duk_to_stacktrace(val);
    } catch (e) {
        try {
            return duk_to_stacktrace(e);
        } catch (e2) {
            return 'Error';
        }
    }
}
```

### 例

```c
if (duk_peval_string(ctx, "1 + 2 +") != 0) {  /* => SyntaxError */
    printf("failed: %s\n", duk_safe_to_stacktrace(ctx, -1));
} else {
    printf("success\n");
}
duk_pop(ctx);
```

### 参照

duk_safe_to_string
duk_to_stacktrace