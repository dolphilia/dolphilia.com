## duk_get_top_index() 

1.0.0 stack

### プロトタイプ

```c
duk_idx_t duk_get_top_index(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし)


### 要約

スタック上の最上位値の絶対インデックス(>= 0)を取得します。スタックが空の場合、DUK_INVALID_INDEX を返します。


### 例

```c
duk_idx_t idx_top;

idx_top = duk_get_top_index(ctx);
if (idx_top == DUK_INVALID_INDEX) {
    printf("stack is empty\n");
} else {
    printf("index of top element: %ld\n", (long) idx_top);
}
```

### 参照

duk_require_top_index