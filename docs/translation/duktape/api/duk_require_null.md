## duk_require_null() 

1.0.0 stack

### プロトタイプ

```c
void duk_require_null(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値が NULL でない場合、またはインデックスが無効な場合にエラーを投げます。

get" プリミティブ (duk_get_null()) は存在しない。なぜなら、そのような関数は無意味だからです。

### 例

```c
duk_require_null(ctx, -3);
```