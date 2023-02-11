## duk_swap() 

1.0.0 stack

### プロトタイプ

```c
void duk_swap(duk_context *ctx, duk_idx_t idx1, duk_idx_t idx2);
```

### スタック

| ... | val1 | ... | val2 | ... | -> | ... | val2 | ... | val1 | ... |

### 要約

インデックス idx1 と idx2 の値を入れ替えます。インデックスが同じであれば、この呼び出しは失敗です。どちらかのインデックスが無効な場合、エラーを投げます。。


### 例

```c
duk_swap(ctx, -5, -1);
```

### 参照

duk_swap_top