## duk_require_function() 

1.4.0 stack

### プロトタイプ

```c
void duk_require_function(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値が関数でない場合、またはインデックスが無効な場合にエラーを投げます。。

任意の関数に対する有用なCの戻り値がないため、getプリミティブ(duk_get_function())は存在しない。

### 例

```c
duk_require_function(ctx, -3);
```