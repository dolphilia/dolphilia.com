# 関数呼び出しの方法

関数を呼び出すための API 呼び出しは、ほとんどが非常に簡単で、ターゲット関数と引数のリストが与えられます。しかし、以下の ECMAScript 固有の詳細が問題を少し複雑にしています。

- ECMAScript の関数/メソッド呼び出しには "this" バインディングが含まれますが、これは API 呼び出しと ECMAScript の呼び出しイディオムで異なります。もし与えられなければ、"this" バインディングはデフォルトで undefined になります（しかし、ターゲット関数が strict でない限り、グローバルオブジェクトに強制されます；Duktape/C 関数は常に strict です）。

- コンストラクタの呼び出しは、"this "バインディングとその戻り値に対して特別な動作があります。this」バインディングは「デフォルト・インスタンス」に初期化され、戻り値は特別な処理を行い、デフォルト・インスタンスを置き換えることができるようになります。内部プロトタイプと外部プロトタイプを参照してください。

C APIには、protectedとunprotectedのバリエーションがあります。その違いは、protectedの呼び出しはエラーを捕捉することです。エラーはC API呼び出しの戻り値で示され、エラーオブジェクトは値スタックに配置されます。これにより、例えばエラーのトレースバックを読むことができる。

下の表は、unprotectedコールを例にしてAPIコールをまとめたものです。

|                ECMAScript idiom                 |                                                                                          Duktape C API idiom                                                                                           | This binding |                  Value stack                   |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ | ---------------------------------------------- |
| var result = func('foo', 'bar');                | duk_get_global_string(ctx, "func");<br>duk_push_string(ctx, "foo");<br>duk_push_string(ctx, "bar")<br>duk_call(ctx, 2 /nargs/);<br>/* result on stack top */                                           | undefined    | [ func "foo" "bar" ] -><br>[ result ]          |
| var result = func.call('myThis', 'foo', 'bar'); | duk_get_global_string(ctx, "func");<br>duk_push_string(ctx, "myThis");<br>duk_push_string(ctx, "foo");<br>duk_push_string(ctx, "bar")<br>duk_call_method(ctx, 2 /nargs/);<br>/* result on stack top */ | "myThis"     | [ func "myThis" "foo" "bar" ] -><br>[ result ] |
| var result = obj.func('foo', 'bar');            | duk_push_string(ctx, "func");<br>duk_push_string(ctx, "foo");<br>duk_push_string(ctx, "bar")<br>duk_call_prop(ctx, obj_idx, 2 /nargs);<br>/* result on stack top */                                    | obj          | [ "func" "foo" "bar" ] -><br>[ result ]        |
