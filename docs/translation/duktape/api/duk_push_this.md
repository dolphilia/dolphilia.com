## duk_push_this() 

1.0.0 stack function

### プロトタイプ

```c
void duk_push_this(duk_context *ctx);
```

### スタック

| ... | -> | ... | this |

### 要約

現在実行中の C 関数の this バインディングをスタックにプッシュします。


### 例

```c
duk_push_this(ctx);
```