## duk_opt_c_function() 

2.1.0 stack function

### プロトタイプ

```c
duk_c_function duk_opt_c_function(duk_context *ctx, duk_idx_t idx, duk_c_function def_value);
```

### スタック

| ... | val | ... |

### 要約

Duktape/C関数に関連付けられたECMAScript関数オブジェクトから、Duktape/C関数ポインタ（duk_c_function）を取得します。もし値が未定義であるか、インデックスが無効であれば、def_value デフォルト値が返されます。その他の場合（ヌルまたは非マッチ型）は、エラーを投げます。。


### 例

```c
duk_c_function funcptr;

/* Native callback, default to nop_callback. */
funcptr = duk_opt_c_function(ctx, -3, nop_callback);
```