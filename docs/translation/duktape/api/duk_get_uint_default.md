## duk_get_uint_default() 

2.1.0 stack

### プロトタイプ

```c
duk_uint_t duk_get_uint_default(duk_context *ctx, duk_idx_t idx, duk_uint_t def_value);
```

### スタック

| ... | val | ... |

### 要約

duk_get_uint() と同様ですが、値が数値でないか、インデックスが無効な場合に返される、明示的なデフォルト値があります。


### 例

```c
unsigned int count = (unsigned int) duk_get_uint_default(ctx, 1, 3);  /* default: 3 */
```

### 参照

duk_get_uint