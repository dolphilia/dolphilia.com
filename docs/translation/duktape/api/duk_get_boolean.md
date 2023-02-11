## duk_get_boolean() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_get_boolean(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... |

### 要約

idx にある boolean 値を、値を変更したり強制したりすることなく取得します。値が真であれば1を、値が偽であるか、booleanでないか、またはインデックスが無効であれば0を返す。

値は強制されないので、ECMAScript の「真実の」値（空でない文字列など）であっても、偽として扱われることに注意してください。値を強制したい場合は、duk_to_boolean()を使用してください。


### 例

```c
if (duk_get_boolean(ctx, -3)) {
    printf("value is true\n");
}
```

### 参照

duk_get_boolean_default