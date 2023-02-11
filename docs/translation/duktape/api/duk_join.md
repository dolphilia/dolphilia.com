## duk_join() 

1.0.0 string

### プロトタイプ

```c
void duk_join(duk_context *ctx, duk_idx_t count);
```

### スタック

| ... | sep | val1 | ... | valN | -> | ... | result |

### 要約

ゼロ個以上の値を、各値の間にセパレータを付けて結果文字列に結合します。セパレータと入力値は、ToString() で自動的に強制されます。

このプリミティブは、文字列の中間的な操作の回数を最小限に抑え、手動で文字列を結合するよりも優れています。


### 例

```c
duk_push_string(ctx, "; ");
duk_push_string(ctx, "foo");
duk_push_int(ctx, 123);
duk_push_true(ctx);
duk_join(ctx, 3);

printf("result: %s\n", duk_get_string(ctx, -1));  /* "foo; 123; true" */
duk_pop(ctx);
```

### 参照

duk_concat