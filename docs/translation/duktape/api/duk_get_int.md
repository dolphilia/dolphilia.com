## duk_get_int() 

1.0.0 stack

### プロトタイプ

```c
duk_int_t duk_get_int(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx に数値を取得し、まず [DUK_INT_MIN, DUK_INT_MAX] の間で値をクランプし、次にゼロに向かって切り捨てることで C の duk_int_t に変換します。スタック上の値は変更されません。値がNaNであるか、数値でないか、またはインデックスが無効である場合、0を返す。

変換の例

Input	Output
-Infinity	DUK_INT_MIN
DUK_INT_MIN - 1	DUK_INT_MIN
-3.9	-3
3.9	3 
DUK_INT_MAX + 1	DUK_INT_MAX
+Infinity	DUK_INT_MAX
NaN	0
"123"	0 (non-number)

この強制は、NaN を DUK_INT_MIN に強制するような直感的でない（移植性のない）動作をする可能性のある、double から integer への基本的な C のキャストとは異なります。また、ECMAScript の ToInt32() による強制とは異なり、ネイティブな duk_int_t の全範囲が許可されます (32ビットより多くなる可能性があります)。

### 例

```c
printf("int value: %ld\n", (long) duk_get_int(ctx, -3));
```

### 参照

duk_get_int_default