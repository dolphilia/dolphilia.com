## duk_opt_boolean() 

2.1.0 stack

### プロトタイプ

```c
duk_bool_t duk_opt_boolean(duk_context *ctx, duk_idx_t idx, duk_bool_t def_value);
```

### スタック

| ... | val | ... |

### 要約

idx にある boolean 値を、値を変更したり強制したりすることなく取得します。 値が真のとき1、偽のとき0を返す。値が未定義の場合，あるいはインデックスが無効な場合，def_value デフォルト値が返されます。その他の場合（ヌルまたは非マッチ型）は，エラーを投げます。。


### 例

```c
duk_bool_t flag_xyz = duk_opt_boolean(ctx, 2, 1);  /* default: true */
```