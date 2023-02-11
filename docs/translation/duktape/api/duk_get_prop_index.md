## duk_get_prop_index() 

1.0.0 property

### プロトタイプ

```c
duk_bool_t duk_get_prop_index(duk_context *ctx, duk_idx_t obj_idx, duk_uarridx_t arr_idx);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... | val | (if key exists)
| ... | obj | ... | -> | ... | obj | ... | undefined | (if key doesn't exist)

### 要約

duk_get_prop() と同様ですが、プロパティ名は符号なし整数の arr_idx として与えられます。これは特に配列の要素にアクセスするのに便利です (しかし、それに限定されるものではありません)。

概念的には、数値はプロパティを読み込むための文字列に強制されます。例えば、123 はプロパティ名 "123" に相当します。Duktapeは可能な限り、明示的な強制を避けています。


### 例

```c
(void) duk_get_prop_index(ctx, -3, 123);
printf("obj[123] = %s\n", duk_to_string(ctx, -1));
duk_pop(ctx);
```

### 参照

duk_get_prop
duk_get_prop_string
duk_get_prop_lstring
duk_get_prop_literal
duk_get_prop_heapptr