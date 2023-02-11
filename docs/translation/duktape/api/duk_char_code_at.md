## duk_char_code_at() 

1.0.0 string

### プロトタイプ

```c
duk_codepoint_t duk_char_code_at(duk_context *ctx, duk_idx_t idx, duk_size_t char_offset);
```

### スタック

| ... | str | ... |

### 要約

文字列の文字オフセット char_offset にある文字のコードポイントを idx で取得します。idxの値が文字列でない場合は、エラーがスローされます。文字列が（拡張）UTF-8デコードできない場合、結果はU+FFFD（Unicode置換文字）です。char_offset が無効な場合（文字列の外側）には、0 が返されます。


### 例

```c
printf("char code at char index 12: %ld\n", (long) duk_char_code_at(ctx, -3, 12));
```