## duk_push_nan() 

1.0.0 stack

### プロトタイプ

```c
void duk_push_nan(duk_context *ctx);
```

### スタック

| ... | -> | ... | NaN |

### 要約

NaN (not-a-number) をスタックにプッシュします。


### 例

```c
duk_push_nan(ctx);

printf("NaN is number: %d\n", (int) duk_is_number(ctx, -1));
```