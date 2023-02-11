## duk_require_undefined() 

1.0.0 stack

### プロトタイプ

```c
void duk_require_undefined(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値が未定義でない場合、またはインデックスが無効な場合にエラーを投げます。。

get" プリミティブ (duk_get_undefined()) は存在しません。

### 例

```c
duk_require_undefined(ctx, -3);
```