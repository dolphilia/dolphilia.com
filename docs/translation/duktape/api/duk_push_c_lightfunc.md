## duk_push_c_lightfunc() 

 stack light func function

### プロトタイプ

```c
duk_idx_t duk_push_c_lightfunc(duk_context *ctx, duk_c_function func, duk_idx_t nargs, duk_idx_t length, duk_int_t magic);
```

### スタック

| ... | -> | ... | func |

### 要約

C 関数に関連付けられた新しい lightfunc 値をスタックにプッシュします。プッシュされた lightfunc の非負のインデックス (スタックの底に相対的) を返します。

lightfunc は、Duktape/C 関数ポインタと、関連するヒープ割り当てのない小さな内部制御フラグのセットを含むタグ付き値です。内部制御フラグは、nargs、length、および magic 値をエンコードし、それゆえ、重要な制限を持ちます。

nargsは[0,14]またはDUK_VARARGSでなければなりません。
length は [0,15] でなければならず、lightfunc の仮想長プロパティにマップされます。
magic は、[-128,127] でなければなりません。
lightfunc は、独自のプロパティを保持できず、仮想の名前と長さのプロパティのみを持ち、その他のプロパティは Function.prototype から継承されます。

nargs 引数は、func が入力されたときにバリュースタックがどのように見えるかを制御し、通常の Duktape/C 関数のように動作します（ duk_push_c_function() を参照してください）。

作成された関数は、通常の関数 (func()) としても、コンストラクタ (new func()) としても呼び出すことが可能です。この 2 つの呼び出し方は duk_is_constructor_call() を使って区別することができます。この関数はコンストラクタとして使用できますが、通常の Function オブジェクトのようにプロトタイププロパティを持つことはできません。

プッシュされた lightfunc をコンストラクタとして使用するつもりで、（Object.prototype の代わりに）カスタム プロトタイプ オブジェクトを使用したい場合、lightfunc はオブジェクト値を返さなければなりません。このオブジェクトは、コンストラクタのために自動的に作成されたデフォルトのインスタンス（これにバインドされている）を置き換え、新しい MyLightFunc() 式の値となります。

### 例

```c
duk_idx_t func_idx;

func_idx = duk_push_c_lightfunc(ctx, my_addtwo, 2 /*nargs*/, 2 /*length*/, 0 /*magic*/);
```

### 参照

duk_push_c_function