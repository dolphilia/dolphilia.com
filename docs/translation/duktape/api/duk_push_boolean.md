## duk_push_boolean() 

1.0.0 stack

### プロトタイプ

```c
void duk_push_boolean(duk_context *ctx, duk_bool_t val);
```

### スタック

| ... | -> | ... | true | (if val != 0)
| ... | -> | ... | false | (if val == 0)

### 要約

真（val != 0の場合）または偽（val == 0の場合）をスタックにプッシュします。


### 例

```c
duk_push_boolean(ctx, 0);  /* -> [ ... false ] */
duk_push_boolean(ctx, 1);  /* -> [ ... false true ] */
duk_push_boolean(ctx, 123);  /* -> [ ... false true true ] */
```