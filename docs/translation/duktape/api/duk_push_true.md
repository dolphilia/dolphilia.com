## duk_push_true() 

1.0.0 stack

### プロトタイプ

```c
void duk_push_true(duk_context *ctx);
```

### スタック

| ... | -> | ... | true |

### 要約

スタックにtrueをプッシュします。duk_push_boolean(ctx, 1)を呼ぶのと同等です。


### 例

```c
duk_push_true(ctx);
```