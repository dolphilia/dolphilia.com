## duk_push_global_object() 

1.0.0 stack object

### プロトタイプ

```c
void duk_push_global_object(duk_context *ctx);
```

### スタック

| ... | -> | ... | global |

### 要約

グローバルオブジェクトをスタックにプッシュします。


### 例

```c
duk_push_global_object(ctx);
```