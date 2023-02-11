## duk_substring() 

1.0.0 string

### プロトタイプ

```c
void duk_substring(duk_context *ctx, duk_idx_t idx, duk_size_t start_char_offset, duk_size_t end_char_offset);
```

### スタック

| ... | str | ... | -> | ... | substr | ... |

### 要約

idx にある文字列を、文字列自身の部分文字列 [start_char_offset, end_char_offset[ ]で置換します。idxの値が文字列でない場合、またはインデックスが無効な場合は、エラーを投げます。。

部分文字列操作は、バイトではなく文字で動作し、オフセットは文字オフセットです。この呼び出しのセマンティクスは String.prototype.substring (start, end) に類似しています。オフセット値は文字列長にクランプされ（size_t は符号なしなので負の値をクランプする必要はない）、開始オフセットが終了オフセットより大きい場合、結果は空文字列です。

バイト単位の部分文字列を得るには、 duk_get_lstring() で文字列データポインタと長さを取得し、 duk_push_lstring() でバイトのスライスをプッシュします。

### 例

```c
/* String at index -3 is 'foobar'.  Substring [2,5[ is "oba". */

duk_substring(ctx, -3, 2, 5);
printf("substring: %s\n", duk_get_string(ctx, -3));
```