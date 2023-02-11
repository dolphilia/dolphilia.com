## duk_is_valid_index() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_is_valid_index(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

引数インデックスを検証し、インデックスが有効であれば1、そうでなければ0を返す。


### 例

```c
if (duk_is_valid_index(ctx, -3)) {
    printf("index -3 is valid\n");
} else {
    printf("index -3 is not valid\n");
}
```

### 参照

duk_require_valid_index