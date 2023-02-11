## duk_get_c_function_default() 

2.1.0 stack function

### プロトタイプ

```c
duk_c_function duk_get_c_function_default(duk_context *ctx, duk_idx_t idx, duk_c_function def_value);
```

### スタック

| ... | val | ... |

### 要約

duk_get_c_function() と同様ですが、デフォルト値が明示されており、値が Duktape/C関数でない場合、あるいはインデックスが無効な場合に返されます。


### 例

```c
duk_c_function funcptr;

/* Native callback, default to nop_callback. */
funcptr = duk_get_c_function_default(ctx, -3, nop_callback);
```

### 参照

duk_get_c_function
