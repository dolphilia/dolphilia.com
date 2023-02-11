## duk_resize_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
void *duk_resize_buffer(duk_context *ctx, duk_idx_t idx, duk_size_t new_size);
```

### スタック

| ... | val | ... |

### 要約

idx のダイナミックバッファを new_size バイトにリサイズします。new_size が現在のサイズより大きい場合、新しく割り当てられたバイト（古いサイズより大きい）は自動的にゼロにされます。新しいバッファのデータ領域へのポインタを返す。new_size が 0 の場合、NULL または NULL 以外の値を返す。サイズ変更に失敗した場合、idxの値がダイナミックバッファでない場合、 idxが無効な場合、エラーを投げます。。


### 例

```c
void *ptr;

ptr = duk_resize_buffer(ctx, -3, 4096);
```