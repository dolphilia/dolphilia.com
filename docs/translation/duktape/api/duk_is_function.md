## duk_is_function() 

1.0.0 stack function

### プロトタイプ

```c
duk_bool_t duk_is_function(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx の値がオブジェクトであり、かつ関数である場合（内部クラス Function を持つ）には 1 を返し、そうでない場合には 0 を返す。 idx が無効な場合も 0 を返す。

この関数は、以下の ECMAScript 式が真であるとき、1を返す。

```javascript
Object.prototype.toString.call(val) === '[object Function]'
```

機能の具体的な種類を判断するには、以下を使用します。

- duk_is_c_function()
- duk_is_ecmascript_function()
- duk_is_bound_function()

### 例

```c
if (duk_is_function(ctx, -3)) {
    /* ... */
}
```