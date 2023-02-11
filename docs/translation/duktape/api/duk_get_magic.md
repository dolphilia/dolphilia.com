## duk_get_magic() 

1.0.0 magic function

### プロトタイプ

```c
duk_int_t duk_get_magic(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxにあるDuktape/C関数に関連する16ビット符号付き「マジック」値を取得します。もしその値がDuktape/C関数でない場合は、エラーが投げられます。

軽量関数は、符号付き整数（-128から127）として解釈される8ビットのマジック・バリューのためのスペースしか持っていません。

### 例

```c
duk_int_t my_flags = duk_get_magic(ctx, -3);
```

### 参照

duk_get_current_magic
duk_set_magic