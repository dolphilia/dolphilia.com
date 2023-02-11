## duk_insert() 

1.0.0 stack

### プロトタイプ

```c
void duk_insert(duk_context *ctx, duk_idx_t to_idx);
```

### スタック

| ... | old(to_idx) | ... | val | -> | ... | val(to_idx) | old | ... |

### 要約

スタックトップからポップした値でto_idxに値を挿入します。to_idxにある前の値とその上の値は、スタックの上に1ステップ移動します。to_idxが無効なインデックスの場合、エラーを投げます。。

負のインデックスは、スタックトップの値をポップする前に評価されます。これは、例でも説明されています。

### 例

```c
duk_push_int(ctx, 123);
duk_push_int(ctx, 234);
duk_push_int(ctx, 345);       /* -> [ 123 234 345 ] */
duk_push_string(ctx, "foo");  /* -> [ 123 234 345 "foo" ] */
duk_insert(ctx, -3);          /* -> [ 123 "foo" 234 345 ] */
```

### 参照

duk_pull
duk_replace