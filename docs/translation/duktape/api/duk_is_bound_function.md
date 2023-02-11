## duk_is_bound_function() 

1.0.0 stack function

### プロトタイプ

```c
duk_bool_t duk_is_bound_function(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値が ECMAScript の Function.prototype.bind() により生成された Function オブジェクトである場合には 1 を返し、そうでない場合には 0 を返す。

バインドされた関数は ECMAScript の概念であり、ターゲット関数を指し示し、this バインディングと 0 個以上の引数バインディングを提供します。Function.prototype.bind (thisArg [, arg1 [, arg2, ...]]) を参照のこと。


### 例

```c
if (duk_is_bound_function(ctx, -3)) {
    /* ... */
}
```