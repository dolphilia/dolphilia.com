## duk_is_object_coercible() 

1.0.0 stack object

### プロトタイプ

```c
duk_bool_t duk_is_object_coercible(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

CheckObjectCoercible で定義されるように、idx の値がオブジェクトコアーシブルであれば 1 を返し、そうでなければ 0 を返す。 idx が無効な場合も 0 を返す。

ECMAScript のすべての型は、undefined と null 以外はオブジェクトと互換性があります。カスタムバッファとポインタ型はオブジェクト保 持可能です。


### 例

```c
if (duk_is_object_coercible(ctx, -3)) {
    /* ... */
}
```