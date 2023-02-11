## duk_to_int() 

1.0.0 stack

### プロトタイプ

```c
duk_int_t duk_to_int(duk_context *ctx, duk_int_t index);
```

### スタック

| ... | val | ... | -> | ... | ToInteger(val) | ... |

### 要約

index の値を ECMAScript の ToInteger() で強制された値で置き換えます。duk_get_int() で説明したアルゴリズムを用いて、 ToInteger() の結果からさらに強制された duk_int_t を返します (この 2 番目の強制は、新しいスタック値には反映されません)。index が無効な場合、エラーを投げます。。

カスタムの型強制は、型変換とテストに記載されています。

もし、ToInteger() の強制された値の double バージョンが欲しいなら、これを使います。

```c
double d;

(void) duk_to_int(ctx, -3);
d = (double) duk_get_number(ctx, -3);
```

duk_get_int() の int coercion は戻り値のみに適用され、バリュースタックには反映されない。例えば、バリュースタックに文字列 "Infinity" がある場合、スタック上の値は数値 Infinity に強制され、DUK_INT_MAX が API コールから返されます。

### 例

```c
printf("ToInteger() + int coercion: %ld\n", (long) duk_to_int(ctx, -3));
printf("ToInteger() coercion: %lf\n", (double) duk_get_number(ctx, -3));
```