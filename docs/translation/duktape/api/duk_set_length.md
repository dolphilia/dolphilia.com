## duk_set_length() 

2.0.0 stack

### プロトタイプ

```c
void duk_set_length(duk_context *ctx, duk_idx_t idx, duk_size_t len);
```

### スタック

| ... | val | ... |

### 要約

idxの値に対して "length "を設定します。ECMAScriptのobj.length = len;と等価です。


### 例

```c
/* Set array length to zero, deleting elements as a side effect. */
duk_set_length(ctx, -3, 0);
```

### 参照

duk_get_length