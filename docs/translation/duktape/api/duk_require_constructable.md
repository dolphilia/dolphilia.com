## duk_require_constructable() 

2.4.0 stack

### プロトタイプ

```c
void duk_require_constructable(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxの値が構成可能な関数でない場合、またはidxが無効な場合、エラーを投げます。。それ以外の場合は返す。


### 例

```c
duk_require_constructable(ctx, 3);
```