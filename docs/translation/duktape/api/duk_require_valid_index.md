## duk_require_valid_index() 

1.0.0 stack

### プロトタイプ

```c
void duk_require_valid_index(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

引数indexの妥当性を確認します。indexが有効であればエラーをスローし、そうでなければ（戻り値なしで）リターンします。


### 例

```c
duk_require_valid_index(ctx, -3);
printf("index -3 is valid\n");
```

### 参照

duk_is_valid_index