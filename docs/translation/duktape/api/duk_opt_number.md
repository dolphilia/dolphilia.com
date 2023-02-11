## duk_opt_number() 

2.1.0 stack

### プロトタイプ

```c
duk_double_t duk_opt_number(duk_context *ctx, duk_idx_t idx, duk_double_t def_value);
```

### スタック

| ... | val | ... |

### 要約

idxにある数値の値を、値を変更したり強制したりすることなく取得します。値が未定義であるか、インデックスが無効である場合、def_value デフォルト値が返されます。その他の場合（ヌルまたは非マッチ型）は、エラーを投げます。。


### 例

```c
double backoff_multiplier = (double) duk_opt_number(ctx, 2, 1.5);  /* default: 1.5 */
```