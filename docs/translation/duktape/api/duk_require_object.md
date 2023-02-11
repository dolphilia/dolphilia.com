## duk_require_object() 

2.2.0 stack

### プロトタイプ

```c
void duk_require_object(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値がオブジェクトでない場合、またはインデックスが無効な場合、エラーを投げます。。

get" プリミティブ (duk_get_object()) は存在しません。なぜなら、そのような関数は無用だからです。

### 例

```c
duk_require_object(ctx, -3);
```