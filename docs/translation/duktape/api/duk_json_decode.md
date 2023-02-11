## duk_json_decode() 

1.0.0 json codec

### プロトタイプ

```c
void duk_json_decode(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | json_val | ... | -> | ... | val | ... |

### 要約

任意の JSON 値をインプレース操作でデコードします。入力が無効な場合、エラーを投げます。。


### 例

```c
duk_push_string(ctx, "{\"meaningOfLife\":42}");
duk_json_decode(ctx, -1);
duk_get_prop_string(ctx, -1, "meaningOfLife");
printf("JSON decoded meaningOfLife is: %s\n", duk_to_string(ctx, -1));
duk_pop_2(ctx);

/* Output:
 * JSON decoded meaningOfLife is: 42
 */
```

### 参照

duk_json_encode