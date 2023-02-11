## duk_get_c_function() 

1.0.0 stack function

### プロトタイプ

```c
duk_c_function duk_get_c_function(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

Duktape/C関数に関連付けられたECMAScript関数オブジェクトからDuktape/C関数ポインタ（duk_c_function）を取得します。値がそのような関数でない場合、または idx が無効な場合、NULL を返します。

もし、無効な値やインデックスに対してエラーが投げられることを望むなら、 duk_require_c_function() を使用してください。


### 例

```c
duk_c_function funcptr;

funcptr = duk_get_c_function(ctx, -3);
```

### 参照

duk_get_c_function_default