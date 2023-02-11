## duk_get_uint() 

1.0.0 stack

### プロトタイプ

```c
duk_uint_t duk_get_uint(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx で数値を取得し、まず [0, DUK_UINT_MAX] の間で値をクランプし、次に 0 に向かって切り捨てることで C の duk_uint_t に変換します。スタック上の値は変更されない。値がNaNであるか、数値でないか、またはインデックスが無効である場合、0を返す。

変換の例

Input	Output
-Infinity	0
-1	0
-3.9	0
3.9	3 
DUK_UINT_MAX + 1	DUK_UINT_MAX
+Infinity	DUK_UINT_MAX
NaN	0
"123"	0 (non-number)

この強制は、例えばNaN値に対して直感的でない（そして移植性のない）動作をする可能性のある、doubleから符号なし整数への基本的なCキャストとは異なります。また、ECMAScript の ToUint32() による強制とは異なり、ネイティブな duk_uint_t の全範囲が許可されます (32ビットより多くなる可能性があります)。

### 例

```c
printf("unsigned int value: %lu\n", (unsigned long) duk_get_uint(ctx, -3));
```

### 参照

duk_get_uint_default