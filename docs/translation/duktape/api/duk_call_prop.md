## duk_call_prop() 

1.0.0 property call

### プロトタイプ

```c
void duk_call_prop(duk_context *ctx, duk_idx_t obj_idx, duk_idx_t nargs);
```

### スタック

| ... | obj | ... | key arg1 | ... | argN | -> | ... | obj | ... | retval |

### 要約

このバインディングを obj に設定し、nargs 引数で obj.key を呼び出します。プロパティ名と関数引数は単一の戻り値に置き換えられ、ターゲットオブジェクトはタッチされません。関数呼び出し中のエラーは自動的に捕捉されない。

ターゲット関数が厳密でない場合、ターゲット関数が見るバインディングの値は、関数コードの入力で指定された処理によって変更されることがあります。

本APIコールは、以下と同等です。

```javascript
var retval = obj[key](arg1, ..., argN);
```

or:

```javascript
var func = obj[key];
var retval = func.call(obj, arg1, ..., argN);
```

プロパティアクセスの基本値は通常オブジェクトですが、技術的には任意の値を使用することができます。文字列やバッファの値には仮想的なインデックスプロパティがあり、例えば "foo"[2]にアクセスすることができます。また、ほとんどのプリミティブ値は何らかのプロトタイプオブジェクトを継承しているので、例えば (12345).toString(16) のようにメソッドを呼び出すことができます。

### 例

```c
/* obj.myAdderMethod(2,3) -> 5 */
duk_idx_t obj_idx = /* ... */;

duk_push_string(ctx, "myAdderMethod");
duk_push_int(ctx, 2);
duk_push_int(ctx, 3);
duk_call_prop(ctx, obj_idx, 2);  /* [ ... "myAdderMethod" 2 3 ] -> [ ... 5 ] */
printf("2+3=%ld\n", (long) duk_get_int(ctx, -1));
duk_pop(ctx);
```
