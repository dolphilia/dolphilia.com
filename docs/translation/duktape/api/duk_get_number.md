## duk_get_number() 

1.0.0 stack

### プロトタイプ

```c
duk_double_t duk_get_number(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx にある数値の値を、値を変更したり強制したりすることなく取得します。値が数値でない場合、またはインデックスが無効な場合は NaN を返す。


### 例

```c
printf("value: %lf\n", (double) duk_get_number(ctx, -3));
```

### 参照

duk_get_number_default