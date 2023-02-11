## duk_to_undefined() 

1.0.0 stack

### プロトタイプ

```c
void duk_to_undefined(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | undefined | ... |

### 要約

前の値に関係なく、idxの値をundefinedに置き換えます。indexが無効な場合はエラーを投げます。。

duk_push_undefined() の後に duk_replace() を実行し、対象インデックスを指定するのと 同等。

### 例

```c
duk_to_undefined(ctx, -3);
```