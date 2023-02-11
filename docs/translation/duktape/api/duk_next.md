## duk_next() 

1.0.0 property object

### プロトタイプ

```c
duk_bool_t duk_next(duk_context *ctx, duk_idx_t enum_idx, duk_bool_t get_value);
```

### スタック

| ... | enum | ... | -> | ... | enum | ... | (if enum empty; function returns zero)
| ... | enum | ... | -> | ... | enum | ... | key | (if enum not empty and get_value == 0; function returns non-zero)
| ... | enum | ... | -> | ... | enum | ... | key | value | (if enum not empty and get_value != 0; function returns non-zero)

### 要約

duk_enum() で作成した列挙体から、次のキー（とオプションで値）を取得します。列挙が使い果たされた場合、スタックには何もプッシュされず、この関数は 0 を返します。そうでなければ、キーがスタックに押され、 get_value が0でなければ値がそれに続き、この関数は0以外の値を返す。

値を取得すると，ゲッターを呼び出したり，Proxyトラップを発生させたりして，任意の副作用が発生する可能性があることに注意してください（エラーを投げます。可能性もあります）．


### 例

```c
while (duk_next(ctx, enum_idx, 1)) {
    printf("key=%s, value=%s\n", duk_to_string(ctx, -2), duk_to_string(ctx, -1));
    duk_pop_2(ctx);
}
```

### 参照

duk_enum