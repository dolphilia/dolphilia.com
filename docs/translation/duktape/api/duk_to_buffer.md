## duk_to_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
void *duk_to_buffer(duk_context *ctx, duk_idx_t idx, duk_size_t *out_size);
```

### スタック

| ... | val | ... | -> | ... | buffer(val) | ... |

### 要約

idxの値をバッファで強制された値で置き換えます。バッファデータへのポインタ (サイズゼロのバッファの場合はNULLかもしれない) を返し、バッファのサイズを *out_size に書き込む (out_size が非NULLの場合)。idx が無効な場合，エラーを投げます。。

強制適用ルール。

バッファ: 変更なし、動的/固定/外部の性質は変更なし
文字列: 固定サイズのバッファに強制され、バイト-バイトになります。
その他の型: 最初に ECMAScript ToString() を適用し、その後、バイト単位の固定サイズバッファに強制変換する

### 例

```c
void *ptr;
duk_size_t sz;

ptr = duk_to_buffer(ctx, -3, &sz);
printf("coerced data at %p, size %lu\n", ptr, (unsigned long) sz);
```

### 参照

duk_to_fixed_buffer
duk_to_dynamic_buffer