## duk_push_undefined() 

1.0.0 stack

### プロトタイプ

```c
void duk_push_undefined(duk_context *ctx);
```

### スタック

| ... | -> | ... | undefined |

### 要約

未定義をスタックに積む。


### 例

```c
duk_push_undefined(ctx);
```