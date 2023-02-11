## duk_to_null() 

1.0.0 stack

### プロトタイプ

```c
void duk_to_null(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | null | ... |

### 要約

前の値に関係なく、idxの値をnullに置き換えます。indexが無効な場合はエラーを投げます。。

duk_push_null() に続いて、ターゲット・インデックスに duk_replace() を実行するのと同等です。

### 例

```c
duk_to_null(ctx, -3);
```