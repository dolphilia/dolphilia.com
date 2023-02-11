## duk_decode_string() 

1.0.0 string

### プロトタイプ

```c
void duk_decode_string(duk_context *ctx, duk_idx_t idx, duk_decode_char_function callback, void *udata);
```

### スタック

| ... | val | ... |

### 要約

idxの文字列を処理し、文字列の各コードポイントに対してコールバックを呼び出す。コールバックには、引数udataとコードポイントが渡されます。入力文字列は変更されない。値が文字列でない場合、またはインデックスが無効な場合は、エラーを投げます。。


### 例

```c
static void decode_char(void *udata, duk_codepoint_t codepoint) {
    printf("codepoint: %ld\n", (long) codepoint);
}

duk_push_string(ctx, "test_string");
duk_decode_string(ctx, -1, decode_char, NULL);
```

### 参照

duk_map_string