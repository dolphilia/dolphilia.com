## duk_get_boolean_default() 

2.1.0 stack

### プロトタイプ

```c
duk_bool_t duk_get_boolean_default(duk_context *ctx, duk_idx_t idx, duk_bool_t def_value);
```

### スタック

| ... | val | ... |

### 要約

duk_get_boolean() と同様ですが、デフォルト値が明示されており、値が boolean でない場合、あるいはインデックスが無効な場合に返されます。


### 例

```c
duk_bool_t flag_xyz = duk_get_boolean_default(ctx, 2, 1);  /* default: true */
```

### 参照

duk_get_boolean