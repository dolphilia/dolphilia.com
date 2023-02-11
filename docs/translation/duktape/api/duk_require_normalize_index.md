## duk_require_normalize_index() 

1.0.0 stack

### プロトタイプ

```c
duk_idx_t duk_require_normalize_index(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

現在のフレームの底を基準として、引数のインデックスを正規化します。結果として得られるインデックスは0以上になり、後のスタックの変更に依存しなくなります。入力インデックスが無効な場合は、エラーを投げます。。


### 例

```c
duk_idx_t idx = duk_require_normalize_index(-3);
```

### 参照

duk_normalize_index