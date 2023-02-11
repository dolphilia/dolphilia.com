## duk_dup() 

1.0.0 stack

### プロトタイプ

```c
void duk_dup(duk_context *ctx, duk_idx_t from_idx);
```

### スタック

| ... | val | ... | -> | ... | val | ... | val |

### 要約

Push a duplicate of value at from_idx to the stack. If from_idx is invalid, throws an error.


### 例

```c
duk_push_int(ctx, 123);  /* -> [ ... 123 ] */
duk_push_int(ctx, 234);  /* -> [ ... 123 234 ] */
duk_dup(ctx, -2);        /* -> [ ... 123 234 123 ] */
```

### 参照

duk_dup_top