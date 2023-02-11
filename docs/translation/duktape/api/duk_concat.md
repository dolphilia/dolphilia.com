## duk_concat() 

1.0.0 string

### プロトタイプ

```c
void duk_concat(duk_context *ctx, duk_idx_t count);
```

### スタック

| ... | val1 | ... | valN -> | ... | result |

### 要約

ゼロ個以上の値を結果の文字列に連結します。入力値は、ToString()で自動的に強制されます。

このプリミティブは、文字列の中間的な操作の回数を最小限に抑え、手動で文字列を連結するよりも優れています。

Array.prototype.concat() とは異なり、この API コールは配列引数の平坦化や Symbol.isConcatSpreadable のサポートは行いません。

### 例

```c
duk_push_string(ctx, "foo");
duk_push_int(ctx, 123);
duk_push_true(ctx);
duk_concat(ctx, 3);

printf("result: %s\n", duk_get_string(ctx, -1));  /* "foo123true" */
duk_pop(ctx);
```

### 参照

duk_join