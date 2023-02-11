## duk_pop_n() 

1.0.0 stack

### プロトタイプ

```c
void duk_pop_n(duk_context *ctx, duk_idx_t count);
```

### スタック

| ... | val1 | ... | valN | -> | ... |

### 要約

スタックから count 個の要素を取り出します。スタックの要素が count より少ない場合、エラーを投げます。。count が 0 の場合、この呼び出しは失敗です。負のカウントは、エラーをスローします。


### 例

```c
duk_pop_n(ctx, 10);
```