## duk_require_c_function() 

1.0.0 stack function

### プロトタイプ

```c
duk_c_function duk_require_c_function(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

duk_get_c_function() と同様ですが、idx の値が Duktape/C 関数に関連付けられた ECMAScript 関数でない場合、またはインデックスが無効な場合にエラーをスローします。


### 例

```c
duk_c_function funcptr;

funcptr = duk_require_c_function(ctx, -3);
```