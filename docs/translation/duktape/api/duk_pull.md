## duk_pull() 

2.5.0 stack

### プロトタイプ

```c
void duk_pull(duk_context *ctx, duk_idx_t from_idx);
```

### スタック

| ... | val | ... | -> | ... | ... | val |

### 要約

from_idxの値を削除し、バリュースタックの先頭にプッシュします。

from_idxが無効なインデックスの場合、エラーを投げます。。

### 例

```c
duk_push_int(ctx, 123);
duk_push_int(ctx, 234);
duk_push_int(ctx, 345);       /* -> [ 123 234 345 ] */
duk_pull(ctx, -2);            /* [ 123 234 345 ] -> [ 123 345 234 ] */
```

### 参照

duk_insert
duk_remove