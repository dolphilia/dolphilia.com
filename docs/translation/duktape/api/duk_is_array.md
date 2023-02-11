## duk_is_array() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_is_array(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値がオブジェクトであり、ECMAScript の配列（内部クラス Array を持つ）であれば 1 を返し、そうでなければ 0 を返す。また、value が Array をラップした Proxy である場合にも 1 を返す。idx が無効な場合は、0 を返す。

この関数は、以下の ECMAScript 式が真であるとき 1 を返す。

```javascript
Object.prototype.toString.call(val) === '[object Array]'
```

### 例

```c
if (duk_is_array(ctx, -3)) {
    /* ... */
}
```