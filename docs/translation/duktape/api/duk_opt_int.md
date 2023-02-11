## duk_opt_int() 

2.1.0 stack

### プロトタイプ

```c
duk_int_t duk_opt_int(duk_context *ctx, duk_idx_t idx, duk_int_t def_value);
```

### スタック

| ... | val | ... |

### 要約

idx に数値を取得し、まず [DUK_INT_MIN, DUK_INT_MAX] の間で値をクランプし、次にゼロに向かって切り捨てることで C の duk_int_t に変換します。スタック上の値は変更されません。値が未定義であるかインデックスが無効である場合、def_value デフォルト値が返されます。その他の場合（ヌルまたは非マッチ型）は，エラーを投げます。。


### 例

```c
int port = (int) duk_opt_int(ctx, 1, 80);  /* default: 80 */
```