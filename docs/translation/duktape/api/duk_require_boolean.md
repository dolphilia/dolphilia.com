## duk_require_boolean() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_require_boolean(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

duk_get_boolean() と同様ですが、idx の値が boolean でない場合、あるいはインデックスが無効な場合にエラーを発生します。


### 例

```c
if (duk_require_boolean(ctx, -3)) {
    printf("value is true\n");
}
```