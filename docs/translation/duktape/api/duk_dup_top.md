## duk_dup_top() 

1.0.0 stack

### プロトタイプ

```c
void duk_dup_top(duk_context *ctx);
```

### スタック

| ... | val | -> | ... | val | val |

### 要約

スタックトップにある値の複製をスタックにプッシュします。バリュースタックが空の場合、エラーを投げます。。

duk_dup(ctx, -1) を呼び出すのと同等です。


### 例

```c
duk_push_int(ctx, 123);  /* -> [ ... 123 ] */
duk_push_int(ctx, 234);  /* -> [ ... 123 234 ] */
duk_dup_top(ctx);        /* -> [ ... 123 234 234 ] */
```