## duk_push_bare_array() 

2.4.0 stack object

### プロトタイプ

```c
duk_idx_t duk_push_bare_array(duk_context *ctx);
```

### スタック

| ... | -> | ... | arr |

### 要約

duk_push_array() と似ていますが、押された配列は他のオブジェクトを継承していません、つまり、その内部プロトタイプは null です。押された配列の非負のインデックス（スタックの底からの相対位置）を返します。


### 例

```c
duk_idx_t arr_idx;

arr_idx = duk_push_bare_array(ctx);
```

### 参照

duk_push_array
duk_push_bare_object