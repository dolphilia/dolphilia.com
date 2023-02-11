## duk_push_object() 

1.0.0 stack object

### プロトタイプ

```c
duk_idx_t duk_push_object(duk_context *ctx);
```

### スタック

| ... | -> | ... | obj |

### 要約

空のオブジェクトをスタックにプッシュします。押されたオブジェクトの非負のインデックス（スタックの底からの相対値）を返します。

作成されたオブジェクトの内部プロトタイプは Object.prototype です。これを変更するには、 duk_set_prototype() を使用します。


### 例

```c
duk_idx_t obj_idx;

obj_idx = duk_push_object(ctx);
duk_push_int(ctx, 42);
duk_put_prop_string(ctx, obj_idx, "meaningOfLife");

/* object is now: { "meaningOfLife": 42 } */

duk_pop(ctx);  /* pop object */
```

### 参照

duk_push_bare_object