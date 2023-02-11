## duk_push_null() 

1.0.0 stack

### プロトタイプ

```c
void duk_push_null(duk_context *ctx);
```

### スタック

| ... | -> | ... | null |

### 要約

nullをスタックにプッシュします。


### 例

```c
duk_push_null(ctx);
```