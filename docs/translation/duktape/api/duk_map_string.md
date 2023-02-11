## duk_map_string() 

1.0.0 string

### プロトタイプ

```c
void duk_map_string(duk_context *ctx, duk_idx_t idx, duk_map_char_function callback, void *udata);
```

### スタック

| ... | val | ... | -> | ... | val | ... |

### 要約

idxの文字列を処理し、文字列の各コードポイントに対してコールバックを呼び出す。コールバックは、引数 udata とコードポイントを与えられ、置き換えられたコードポイントを返します。成功した場合、置換されたコードポイントからなる新しい文字列が元の文字列を置き換えます。値が文字列でない場合、またはインデックスが無効な場合は、エラーを投げます。


### 例

```c
static duk_codepoint_t map_char(void *udata, duk_codepoint_t codepoint) {
    /* Convert ASCII to uppercase. */
    if (codepoint >= (duk_codepoint_t) 'a' && codepoint <= (duk_codepoint_t) 'z') {
        return codepoint - (duk_codepoint_t) 'a' + (duk_codepoint_t) 'A';
    }
    return codepoint;
}

duk_push_string(ctx, "test_string");
duk_map_string(ctx, -1, map_char, NULL);
printf("result: %s\n", duk_to_string(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_decode_string