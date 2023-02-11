## duk_enum() 

1.0.0 property object

### プロトタイプ

```c
void duk_enum(duk_context *ctx, duk_idx_t obj_idx, duk_uint_t enum_flags);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... | enum |

### 要約

obj_idx にあるオブジェクトの列挙子を作成します。列挙の詳細はenum_flagsで制御することができます。対象値がオブジェクトでない場合は、エラーを投げます。。

列挙のフラグ。

DUK_ENUM_INCLUDE_NONENUMERABLE 列挙不可能なプロパティも列挙します。デフォルトでは、列挙可能なプロパティのみが列挙されます。
DUK_ENUM_INCLUDE_HIDDEN 非表示のシンボルも列挙します。デフォルトでは、非表示のシンボルは列挙されません。DUK_ENUM_INCLUDE_SYMBOLS と一緒に使用します。Duktape 1.x では、このフラグは DUK_ENUM_INCLUDE_INTERNAL と呼ばれていた。
DUK_ENUM_INCLUDE_SYMBOLS シンボルを列挙の結果に含めます。DUK_ENUM_INCLUDE_HIDDEN が指定されていない限り、隠しシンボルは含まれません。
DUK_ENUM_EXCLUDE_STRINGS 列挙結果から文字列を除外します。デフォルトでは文字列が含まれます。
DUK_ENUM_OWN_PROPERTIES_ONLY オブジェクトの「自身の」プロパティのみを列挙します。デフォルトでは、継承されたプロパティも列挙されます。
DUK_ENUM_ARRAY_INDICES_ONLY 配列のインデックス、すなわち "0"、"1"、"2" などの形式のプロパティ名のみを列挙します。
DUK_ENUM_SORT_ARRAY_INDICES ES2015 [[OwnPropertyKeys]] の列挙順序を継承レベルごとではなく、列挙結果全体に適用します。また、シンボルは通常の文字列キーの後にソートされます (どちらも挿入順です)。
DUK_ENUM_NO_PROXY_BEHAVIOR プロキシ動作を呼び出さずにプロキシオブジェクト自身を列挙します。
フラグがない場合、列挙はfor-inのように動作します。自己および継承された列挙可能なプロパティが含まれ、列挙順はECMAScript ES2015 [[OwnPropertyKeys]] 列挙順（各相続レベルに対して適用）に従っています。

列挙子を作成したら、duk_next() を使用して列挙子からキー (またはキーと値のペア) を抽出します。

ES2015 [[OwnPropertyKeys]] の列挙順は、 (1) 配列インデックスの昇順、 (2) 配列インデックス以外のキーの挿入順、 (3) シンボルの挿入順となります。このルールは継承レベルごとに別々に適用されるため、配列インデックスのキーが継承された場合、結果的に順番が狂って表示されることになります。配列のインデックスが継承されることはほとんどないため、ほとんどの実用的なコードでは、これは問題ではありません。DUK_ENUM_SORT_ARRAY_INDICES を使用すると、列挙シーケンス全体を強制的にソートすることができます。

### 例

```c
duk_enum(ctx, -3, DUK_ENUM_INCLUDE_NONENUMERABLE);

while (duk_next(ctx, -1 /*enum_idx*/, 0 /*get_value*/)) {
    /* [ ... enum key ] */
    printf("-> key %s\n", duk_get_string(ctx, -1));
    duk_pop(ctx);  /* pop_key */
}

duk_pop(ctx);  /* pop enum object */
```

### 参照

duk_next