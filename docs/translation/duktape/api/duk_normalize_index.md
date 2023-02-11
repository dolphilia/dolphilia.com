## duk_normalize_index() 

1.0.0 stack

### プロトタイプ

```c
duk_idx_t duk_normalize_index(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

現在のフレームの底を基準として、引数のインデックスを正規化します。結果のインデックスは 0 以上となり、後のスタックの変更に影響されません。入力インデックスが無効な場合、DUK_INVALID_INDEX を返します。無効なインデックスに対してエラーを投げます。ことを望む場合は、 duk_require_normalize_index() を使用してください。


### 例

```c
duk_idx_t idx = duk_normalize_index(ctx, -3);
```

### 参照

duk_require_normalize_index