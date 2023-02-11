## duk_del_prop() 

1.0.0 property

### プロトタイプ

```c
duk_bool_t duk_del_prop(duk_context *ctx, duk_idx_t obj_idx);
```

### スタック

| ... | obj | ... | key | -> | ... | obj | ... |

### 要約

obj_idx にある値のプロパティ key を削除します。 key はスタックから削除されます。リターンコードとエラースローの動作。

property が存在し、かつ設定可能な場合（削除可能）、property を削除し、1 を返す。
property が存在し、設定可能でない場合、エラーを投げます。（strict mode semantics）。
property が存在しない場合、1 を返す（0 ではない）。
obj_idx の値がオブジェクト互換でない場合、エラーを投げます。。
obj_idx が無効な場合、エラーを投げます。。
プロパティの削除は、ECMAScript の式 res = delete obj[key] と等価です。正確な意味は、Property Accessors, The delete operator and [[Delete]] (P, Throw) を参照してください。戻り値とエラースローの動作は、ECMAScriptのdelete演算子の動作を反映しています。対象値とキーは共に強制されます。

ターゲット値は、自動的にオブジェクトに強制されます。しかし、このオブジェクトは一時的なものであり、そのプロパティを削除することはあまり有益ではありません。
key引数は内部的にToPropertyKey()強制を使って強制され、結果は文字列かSymbolになります。配列と数値インデックスには、明示的な文字列強制を避ける内部高速パスがあるので、該当する場合は数値キーを使用します。
ターゲットが deleteProperty トラップを実装する Proxy オブジェクトの場合、トラップが呼び出され、API 呼び出しの戻り値はトラップの戻り値に一致します。

このAPIコールは、ターゲットプロパティが存在しない場合、1を返します。これはあまり直感的ではありませんが、ECMAScript のセマンティクスに従っています: delete obj.nonexistent も true と評価されます。
もしキーが固定文字列であれば、1 つの API 呼び出しを回避して、 duk_del_prop_string() 変数を使用することができます。同様に、もしキーが配列のインデックスであれば、 duk_del_prop_index() 変数を使うことができます。

プロパティアクセスのベースとなる値は通常オブジェクトですが、技術的には任意の値でありえます。普通の文字列やバッファの値には仮想的なインデックスプロパティがあり、例えば "foo"[2] にアクセスすることができます。また、ほとんどのプリミティブな値は何らかのプロトタイプオブジェクトを継承しているので、例えば (12345).toString(16) のようにメソッドを呼び出すことができます。

### 例

```c
duk_bool_t rc;

duk_push_string(ctx, "myProperty");
rc = duk_del_prop(ctx, -3);
printf("delete obj.myProperty -> rc=%d\n", (int) rc);
```

### 参照

duk_del_prop_index
duk_del_prop_string
duk_del_prop_lstring
duk_del_prop_literal
duk_del_prop_heapptr