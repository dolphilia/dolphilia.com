## duk_require_callable() 

1.4.0 stack

### プロトタイプ

```c
void duk_require_callable(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値が呼び出し可能でない場合、またはインデックスが無効な場合にエラーを投げます。。

任意の callable 値に対する有用な C の戻り値がないので、"get" プリミティブ (duk_get_callable()) は存在しません。現時点では、この呼び出しはduk_require_function()の呼び出しと等価です。

### 例

```c
duk_require_callable(ctx, -3);
```