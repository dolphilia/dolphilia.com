## duk_push_array() 

1.0.0 stack object

### プロトタイプ

```c
duk_idx_t duk_push_array(duk_context *ctx);
```

### スタック

| ... | -> | ... | arr |

### 要約

空の配列をスタックにプッシュします。押された配列の非負のインデックス（スタックの底からの相対値）を返します。

生成されたオブジェクトの内部プロトタイプは Array.prototype です。これを変更するには、 duk_set_prototype() を使用します。


### 例

```c
duk_idx_t arr_idx;

arr_idx = duk_push_array(ctx);
duk_push_string(ctx, "foo");
duk_put_prop_index(ctx, arr_idx, 0);
duk_push_string(ctx, "bar");
duk_put_prop_index(ctx, arr_idx, 1);

/* array is now: [ "foo", "bar" ], and array.length is 2 (automatically
 * updated for ECMAScript arrays).
 */

duk_pop(ctx);  /* pop array */
```