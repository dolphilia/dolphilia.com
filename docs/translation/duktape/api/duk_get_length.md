## duk_get_length() 

1.0.0 stack

### プロトタイプ

```c
duk_size_t duk_get_length(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idxにある値の型固有の "長さ "を取得します。

String: 文字列の文字数 (バイト数ではない)
オブジェクト。Math.floor(ToNumber(obj.length)): 結果が duk_size_t unsigned の範囲内にあれば、それ以外は 0 (配列の場合、結果は Array .length になる)
バッファ: バッファのバイト長
その他の型、または無効なスタックインデックス。0
文字列のバイト長を得るには、duk_get_lstring() を使用します。


### 例

```c
if (duk_is_string(ctx, -3)) {
    printf("string char len is %lu\n", (unsigned long) duk_get_length(ctx, -3));
}
```

### 参照

duk_set_length