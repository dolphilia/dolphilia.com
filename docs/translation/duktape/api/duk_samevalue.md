## duk_samevalue() 

2.0.0 compare

### プロトタイプ

```c
duk_bool_t duk_samevalue(duk_context *ctx, duk_idx_t idx1, duk_idx_t idx2);
```

### スタック

| ... | val1 | ... | val2 | ... |

### 要約

idx1 と idx2 の値が等しいかどうかを比較します。ECMAScript の SameValue アルゴリズム (ES2015 では Object.is()) のセマンティクスを使用して値が等しいと見なされる場合は 1 を返し、そうでない場合は 0 を返します。また、どちらかのインデックスが無効な場合は 0 を返す。


### 例

```c
if (duk_samevalue(ctx, -3, -7)) {
    printf("values at indices -3 and -7 are SameValue() equal\n");
}
```