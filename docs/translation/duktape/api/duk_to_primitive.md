## duk_to_primitive() 

1.0.0 stack

### プロトタイプ

```c
void duk_to_primitive(duk_context *ctx, duk_idx_t idx, duk_int_t hint);
```

### スタック

| ... | val | ... | -> | ... | ToPrimitive(val) |

### 要約

idx のオブジェクトを ECMAScript の ToPrimitive() で強制された値で置き換えます。hint 引数はオブジェクトのプリミティブ型への強制に影響し、文字列 (DUK_HINT_STRING)、数値 (DUK_HINT_NUMBER)、またはその両方 (DUK_HINT_NONE) を優先することを表します。DUK_HINT_NONE は数値を優先しますが、入力値が Date インスタンスの場合は文字列を優先します (正確な強制動作は ECMAScript 仕様に記載されています)。idx が無効な場合は、エラーを投げます。

カスタム型強制。

バッファ値 (プレーン): Uint8Array のように扱われ、通常は文字列 [object Uint8Array] に強制されます。
ポインタ値(プレーン): 既存の値を保持します。
ポインタオブジェクト: その下のプレーンなポインタ値に強制されます。
Lightfunc 値 (プレーン): 関数のように扱われ、通常、文字列 [object Function] に強制されます。
カスタムの型強制については、型変換とテストに記載されています。


### 例

```c
duk_to_primitive(ctx, -3, DUK_HINT_NUMBER);
```