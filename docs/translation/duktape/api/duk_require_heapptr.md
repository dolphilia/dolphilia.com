## duk_require_heapptr() 

1.1.0 stack heap ptr borrowed

### プロトタイプ

```c
void *duk_require_heapptr(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

duk_get_heapptr() と同様ですが、idx の値が Duktape ヒープに割り当てられた値 （オブジェクト、バッファ、文字列）でない場合、またはインデックスが無効な場合にエラーを 投げます。


### 例

```c
void *ptr;

ptr = duk_require_heapptr(ctx, -3);
```

### 参照

duk_get_heapptr
duk_push_heapptr