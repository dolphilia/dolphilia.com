## duk_set_magic() 

1.0.0 magic function

### プロトタイプ

```c
void duk_set_magic(duk_context *ctx, duk_idx_t idx, duk_int_t magic);
```

### スタック

| ... | val | ... |

### 要約

idxにあるDuktape/C関数に関連する16ビット符号付き「マジック」値を設定します。もしその値がDuktape/C関数でない場合は、エラーが投げられます。


### 例

```c
duk_set_magic(ctx, -3, 0x1234);
```

### 参照

duk_get_current_magic
duk_get_magic