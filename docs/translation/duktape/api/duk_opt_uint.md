## duk_opt_uint() 

2.1.0 stack

### プロトタイプ

```c
duk_uint_t duk_opt_uint(duk_context *ctx, duk_idx_t idx, duk_uint_t def_value);
```

### スタック

| ... | val | ... |

### 要約

idx で数値を取得し、まず [0, DUK_UINT_MAX] の間で値をクランプし、次に 0 に向かって切り捨てることで C の duk_uint_t に変換します。スタック上の値は変更されません。値が未定義であるかインデックスが無効である場合、def_value デフォルト値が返されます。その他の場合（ヌルまたは非マッチ型）は，エラーを投げます。


### 例

```c
unsigned int count = (unsigned int) duk_opt_uint(ctx, 1, 3);  /* default: 3 */
```