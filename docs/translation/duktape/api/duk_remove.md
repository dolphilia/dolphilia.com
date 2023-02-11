## duk_remove() 

1.0.0 stack

### プロトタイプ

```c
void duk_remove(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val(idx) | ... | -> | ... | ... |

### 要約

idxの値を削除します。idxより上の要素は、スタックの下に一段階シフトされます。idxが無効なインデックスの場合、エラーを投げます。。


### 例

```c
duk_push_int(ctx, 123);
duk_push_int(ctx, 234);
duk_push_int(ctx, 345);       /* -> [ 123 234 345 ] */
duk_remove(ctx, -2);          /* -> [ 123 345 ] */
```
