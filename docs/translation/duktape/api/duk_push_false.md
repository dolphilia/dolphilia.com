## duk_push_false() 

1.0.0 stack

### プロトタイプ

```c
void duk_push_false(duk_context *ctx);
```

### スタック

| ... | -> | ... | false |

### 要約

false をスタックにプッシュします。duk_push_boolean(ctx, 0)を呼ぶのと同じです。


### 例

```c
duk_push_false(ctx);
```