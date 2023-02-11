## duk_del_prop_index() 

1.0.0 property

### プロトタイプ

```c
duk_bool_t duk_del_prop_index(duk_context *ctx, duk_idx_t obj_idx, duk_uarridx_t arr_idx);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

duk_del_prop() と同様ですが、プロパティ名は符号なし整数 arr_idx として与えられます。これは特に配列の要素を削除するのに便利です (しかし、それに限定されるものではありません)。

概念的には、プロパティ削除のために数値は文字列に強制されます。例えば、123はプロパティ名 "123 "と同等です。Duktapeは可能な限り、明示的な強制を避けています。


### 例

```c
duk_bool_t rc;

rc = duk_del_prop_index(ctx, -3, 123);
printf("delete obj[123] -> rc=%d\n", (int) rc);
```

### 参照

duk_del_prop
duk_del_prop_string
duk_del_prop_lstring
duk_del_prop_literal
duk_del_prop_heapptr