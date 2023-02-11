## duk_get_int_default() 

2.1.0 stack

### プロトタイプ

```c
duk_int_t duk_get_int_default(duk_context *ctx, duk_idx_t idx, duk_int_t def_value);
```

### スタック

| ... | val | ... |

### 要約

duk_get_int() と同様ですが、デフォルト値が明示されており、値が数値でない場合、あるいはインデックスが無効な場合に返されます。


### 例

```c
int port = (int) duk_get_int_default(ctx, 1, 80);  /* default: 80 */
```

### 参照

duk_get_int