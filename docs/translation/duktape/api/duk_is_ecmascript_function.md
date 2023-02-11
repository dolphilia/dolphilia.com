## duk_is_ecmascript_function() 

1.0.0 stack function

### プロトタイプ

```c
duk_bool_t duk_is_ecmascript_function(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値が ECMAScript のソースコードからコンパイルされた Function オブジェクトであれば 1 を返し、そうでなければ 0 を返す。 idx が無効な場合も 0 を返す。

内部的にはECMAScriptの関数はバイトコードにコンパイルされ、ECMAScriptバイトコードインタプリタによって実行されます。


### 例

```c
if (duk_is_ecmascript_function(ctx, -3)) {
    /* ... */
}
```