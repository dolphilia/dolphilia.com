## duk_get_number_default() 

2.1.0 stack

### プロトタイプ

```c
duk_double_t duk_get_number_default(duk_context *ctx, duk_idx_t idx, duk_double_t def_value);
```

### スタック

| ... | val | ... |

### 要約

duk_get_number() と同様ですが、デフォルト値が明示されており、 値が数字でない場合、あるいはインデックスが無効な場合に返されます。


### 例

```c
duk_double_t backoff_multiplier = duk_get_number_default(ctx, 2, 1.5);  /* default: 1.5 */
```

### 参照

duk_get_number