## duk_has_prop_index() 

1.0.0 property

### プロトタイプ

```c
duk_bool_t duk_has_prop_index(duk_context *ctx, duk_idx_t obj_idx, duk_uarridx_t arr_idx);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

duk_has_prop() と同様ですが、プロパティ名は符号なし整数 arr_idx として与えられます。これは特に配列要素の存在をチェックするのに便利です（ただし、これに限定されるものではありません）。

概念的には、数値はプロパティの存在をチェックするために文字列に強制され、例えば123はプロパティ名 "123 "と同じになります。Duktapeは可能な限り、明示的な強制を避けています。


### 例

```c
if (duk_has_prop_index(ctx, -3, 123)) {
    printf("obj has index 123\n");
} else {
    printf("obj does not have index 123\n");
}
```

### 参照

duk_has_prop
duk_has_prop_string
duk_has_prop_lstring
duk_has_prop_literal
duk_has_prop_heapptr