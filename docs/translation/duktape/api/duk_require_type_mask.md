## duk_require_type_mask() 

1.0.0 stack

### プロトタイプ

```c
void duk_require_type_mask(duk_context *ctx, duk_idx_t idx, duk_uint_t mask);
```

### スタック

| ... | val | ... |

### 要約

duk_check_type_mask() と同様ですが、val の型がどのマスクビットにも一致しない場合、 TypeError を投げます。


### 例

```c
duk_require_type_mask(ctx, -3, DUK_TYPE_MASK_STRING |
                               DUK_TYPE_MASK_NUMBER);
```