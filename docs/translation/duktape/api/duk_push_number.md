## duk_push_number() 

1.0.0 stack

### プロトタイプ

```c
void duk_push_number(duk_context *ctx, duk_double_t val);
```

### スタック

| ... | -> | ... | val |

### 要約

数値（IEEE double）valをスタックにプッシュします。

val が NaN の場合、他の NaN 形式に正規化される場合があります。


### 例

```c
duk_push_number(ctx, 123.0);
```