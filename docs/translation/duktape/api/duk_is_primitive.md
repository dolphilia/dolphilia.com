## duk_is_primitive() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_is_primitive(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

Returns 1 if value at idx is a primitive type, as defined in ToPrimitive, otherwise returns 0. idx が無効な場合も 0 を返す。

Any standard type other than an object is a primitive type. The custom plain pointer type is also considered a primitive type. However, the custom plain buffer type (which behaves like an Uint8Array object in most situations) and lightfunc type (which behaves like a Function object in most situations) are not considered a primitive type. This matches the behavior of duk_to_primitive() which (usually) coerces e.g. a plain buffer to the string [object Uint8Array].


### 例

```c
if (duk_is_primitive(ctx, -3)) {
    /* ... */
}
```