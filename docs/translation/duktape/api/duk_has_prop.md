## duk_has_prop() 

1.0.0 property

### プロトタイプ

```c
duk_bool_t duk_has_prop(duk_context *ctx, duk_idx_t obj_idx);
```

### スタック

| ... | obj | ... | key | -> | ... | obj | ... |

### 要約

obj_idx の値が property key を持つかどうかを調べますす。 key はスタックから取り除かれます。リターンコードとエラースローの動作

プロパティが存在する場合、1 が返されます。
プロパティが存在しない場合、0 が返されます。
obj_idx の値がオブジェクトでない場合、エラーがスローされます。
obj_idx が無効の場合、エラーがスローされます。
プロパティの存在チェックは、ECMAScript の式 res = key in obj と同等です。セマンティクスについては、Property Accessors, The in operator, および [[HasProperty]] (P) を参照してください。キーは強制されます。

key 引数は、文字列または Symbol になる ToPropertyKey() 強制適用を使用して、内部で強制適用されます。配列と数値インデックスには、明示的な文字列強制を回避する内部高速パスが存在するため、該当する場合は数値キーを使用します。
ターゲットがhasトラップを実装するProxyオブジェクトである場合、トラップが呼び出され、APIコールの戻り値はトラップの戻り値に一致します。

ほとんどのプロパティ関連APIコールのように）任意のオブジェクト強制値を受け入れる代わりに、このコールはそのターゲット値としてオブジェクトのみを受け入れます。これは、ECMAScriptの演算子セマンティクスに従うため、意図的なものです。
もしキーが固定文字列なら、一つの API コールを避けて、 duk_has_prop_string() 変数を使用することができます。同様に、もしキーが配列のインデックスなら、 duk_has_prop_index() variant を使うことができます。


### 例

```c
duk_push_string(ctx, "myProperty");
if (duk_has_prop(ctx, -3)) {
    printf("obj has 'myProperty'\n");
} else {
    printf("obj does not have 'myProperty'\n");
}
```

### 参照

duk_has_prop_index
duk_has_prop_string
duk_has_prop_lstring
duk_has_prop_literal
duk_has_prop_heapptr