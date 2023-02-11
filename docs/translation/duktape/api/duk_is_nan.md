## duk_is_nan() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_is_nan(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値が NaN（特殊な数値）である場合は 1 を、そうでない場合は 0 を返す。idx が無効な場合も 0 を返す。

IEEのdoublesは、多数の異なるNaN値を持っています。Duktapeは内部でNaN値を正規化することがあります。この関数は、どのような種類のNaNであっても1を返す。


### 例

```c
if (duk_is_nan(ctx, -3)) {
    /* ... */
}
```