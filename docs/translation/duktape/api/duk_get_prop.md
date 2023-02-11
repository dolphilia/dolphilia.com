## duk_get_prop() 

1.0.0 property

### プロトタイプ

```c
duk_bool_t duk_get_prop(duk_context *ctx, duk_idx_t obj_idx);
```

### スタック

| ... | obj | ... | key -> | ... | obj | ... | val | (if key exists)
| ... | obj | ... | key -> | ... | obj | ... | undefined | (if key doesn't exist)

### 要約

obj_idx に指定された値のプロパティキーを取得します。リターンコードとエラースローの動作。

プロパティが存在する場合、1 が返され、key はバリュースタック上のプロパティ値で置き換えられます。プロパティがアクセサである場合、getter 関数はエラーを投げます。かもしれない。
プロパティが存在しない場合、0 が返され、key はバリュースタック上の undefined に置き換えられます。
obj_idx の値がオブジェクト互換でない場合、エラーを投げます。。
obj_idx が無効な場合、エラーがスローされます。
プロパティの読み取りは ECMAScript 式 res = obj[key] と同等であるが、プロパティの有無は呼び出しの戻り値で示されるという例外があります。正確なセマンティクスについては、プロパティアクセサ、GetValue（V）、および [[Get]] (P) を参照してください。ターゲット値及びキーは両方とも強制されます。

ターゲット値は自動的にオブジェクトにコーセーされます。例えば、文字列はStringに変換され、その "length "プロパティにアクセスすることができます。
key 引数は内部的に ToPropertyKey() 強制変換で文字列か Symbol に変換されます。配列や数値インデックスに対しては、明示的な文字列強制を回避する内部的な高速パスが存在するため、該当する場合は数値キーを使用します。
ターゲットが get トラップを実装する Proxy オブジェクトである場合、トラップが呼び出され、API コールは常に 1 (すなわち、プロパティが存在する) を返します: プロパティの不在/存在は、get Proxy トラップで示されません。このように、ターゲットオブジェクトが潜在的にProxyである場合、APIコールの戻り値は限定的にしか利用できない場合があります。

もしキーが固定文字列であれば、1回のAPIコールを回避して、 duk_get_prop_string() variant を使用することができます。同様に、キーが配列のインデックスである場合、 duk_get_prop_index() を使用することができます。

プロパティアクセスの基本値は通常オブジェクトですが、技術的には任意の値にすることができます。普通の文字列やバッファの値には仮想的なインデックスプロパティがあり、例えば "foo"[2] にアクセスすることができます。また、ほとんどのプリミティブな値は何らかのプロトタイプオブジェクトを継承しているので、例えば (12345).toString(16) のようにメソッドを呼び出すことができます。

### 例

```c
/* reading [global object].Math.PI */
duk_push_global_object(ctx);    /* -> [ global ] */
duk_push_string(ctx, "Math");   /* -> [ global "Math" ] */
duk_get_prop(ctx, -2);          /* -> [ global Math ] */
duk_push_string(ctx, "PI");     /* -> [ global Math "PI" ] */
duk_get_prop(ctx, -2);          /* -> [ global Math PI ] */
printf("Math.PI is %lf\n", (double) duk_get_number(ctx, -1));
duk_pop_n(ctx, 3);

/* reading a configuration value, cfg_idx is normalized
 * index of a configuration object.
 */
duk_push_string(ctx, "mySetting");
if (duk_get_prop(ctx, cfg_idx)) {
    const char *str_value = duk_to_string(ctx, -1);
    printf("configuration setting present, value: %s\n", str_value);
} else {
    printf("configuration setting missing\n");
}
duk_pop(ctx);  /* remember to pop, regardless of whether or not present */
```

### 参照

duk_get_prop_index
duk_get_prop_string
duk_get_prop_lstring
duk_get_prop_literal
duk_get_prop_heapptr