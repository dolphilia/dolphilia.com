## duk_push_uint() 

1.0.0 stack

### プロトタイプ

```c
void duk_push_uint(duk_context *ctx, duk_uint_t val);
```

### スタック

| ... | -> | ... | val |

### 要約

valをIEEEダブルに変換し、スタックにプッシュします。

これは duk_push_number(ctx, (duk_double_t) val) を呼び出すための省略記法です。


### 例

```c
duk_push_uint(ctx, 123);
```