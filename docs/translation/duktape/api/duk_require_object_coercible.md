## duk_require_object_coercible() 

1.0.0 stack object

### プロトタイプ

```c
void duk_require_object_coercible(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

duk_is_object_coercible() と同様ですが、val がオブジェクト保 持可能でない場合、TypeError を投げます。


### 例

```c
duk_require_object_coercible(ctx, -3);
```