## duk_replace() 

1.0.0 stack

### プロトタイプ

```c
void duk_replace(duk_context *ctx, duk_idx_t to_idx);
```

### スタック

| ... | old(to_idx) | ... | val | -> | ... | val(to_idx) | ... |

### 要約

to_idxにある値をスタックトップからポップした値で置き換えます。to_idxが無効なインデックスの場合、エラーを投げます。。

負のインデックスは、スタックトップにある値をポップする前に評価されます。これは、例でも説明されています。

### 例

```c
duk_push_int(ctx, 123);
duk_push_int(ctx, 234);
duk_push_int(ctx, 345);       /* -> [ 123 234 345 ] */
duk_push_string(ctx, "foo");  /* -> [ 123 234 345 "foo" ] */
duk_replace(ctx, -3);         /* -> [ 123 "foo" 345 ] */
```

### 参照

duk_insert