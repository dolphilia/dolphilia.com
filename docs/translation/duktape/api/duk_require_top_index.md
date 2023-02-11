## duk_require_top_index() 

1.0.0 stack

### プロトタイプ

```c
duk_idx_t duk_require_top_index(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし)


### 要約

スタック上の最上位の値の絶対インデックス(>= 0)を取得します。スタックが空の場合、エラーを投げます。。


### 例

```c
duk_idx_t idx_top;

/* throws error if stack is empty */
idx_top = duk_require_top_index(ctx);
printf("index of top element: %ld\n", (long) idx_top);
```

### 参照

duk_get_top_index