## duk_to_uint() 

1.0.0 stack

### プロトタイプ

```c
duk_uint_t duk_to_uint(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | ToInteger(val) | ... |

### 要約

duk_to_int() と同様だが、戻り値の強制は duk_get_uint() と同様です。

duk_get_uint() の int強制は戻り値のみに適用され、バリュースタックには反映されない。例えば、バリュースタックに文字列 "Infinity" があった場合、スタック上の値は数値 Infinity に強制され、APIコールから DUK_UINT_MAX が返されることになります。

### 例

```c
printf("ToInteger() + uint coercion: %lu\n", (unsigned long) duk_to_uint(ctx, -3));
printf("ToInteger() coercion: %lf\n", (double) duk_get_number(ctx, -3));
```