## duk_get_top() 

1.0.0 stack

### プロトタイプ

```c
duk_idx_t duk_get_top(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし)


### 要約

現在のスタックトップ（>= 0）を取得し、（現在の活性化の）バリュースタック上の現在の値の数を示す。


### 例

```c
printf("stack top is %ld\n", (long) duk_get_top(ctx));
```