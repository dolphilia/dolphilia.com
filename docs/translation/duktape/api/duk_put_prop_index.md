## duk_put_prop_index() 

1.0.0 property

### プロトタイプ

```c
duk_bool_t duk_put_prop_index(duk_context *ctx, duk_idx_t obj_idx, duk_uarridx_t arr_idx);
```

### スタック

| ... | obj | ... | val | -> | ... | obj | ... |

### 要約

duk_put_prop() と同様ですが、プロパティ名は符号なし整数の arr_idx として与えられます。これは特に配列要素への書き込みに便利です（ただし、これに限定されるものではありません）。

概念的には、プロパティ書き込みのために数値は文字列に強制されます。例えば、123 はプロパティ名 "123" と同等です。Duktapeは可能な限り、明示的な強制を避けています。


### 例

```c
duk_push_string(ctx, "value");
rc = duk_put_prop_index(ctx, -3, 123);  /* write to obj[123] */
printf("rc=%d\n", (int) rc);
```

### 参照

duk_put_prop
duk_put_prop_string
duk_put_prop_lstring
duk_put_prop_literal
duk_put_prop_heapptr