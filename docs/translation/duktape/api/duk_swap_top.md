## duk_swap_top() 

1.0.0 stack

### プロトタイプ

```c
void duk_swap_top(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val1 | ... | val2 | -> | ... | val2 | ... | val1 |

### 要約

スタックの先頭とidxの値を入れ替えます。idxがスタックの先頭を参照している場合、この呼び出しはノー・オペレーションです。バリュースタックが空であるか、idxが無効である場合、エラーを投げます。。


### 例

```c
duk_swap_top(ctx, -3);
```