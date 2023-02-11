## duk_def_prop() 

1.1.0 sandbox property

### プロトタイプ

```c
void duk_def_prop(duk_context *ctx, duk_idx_t obj_idx, duk_uint_t flags);
```

### スタック

| ... | obj | ... | key | -> | ... | obj | ... | (if have no value, setter, getter) |
| ... | obj | ... | key | value | -> | ... | obj | ... | (if have value) |
| ... | obj | ... | key | getter | -> | ... | obj | ... | (if have getter, but no setter) |
| ... | obj | ... | key | setter | -> | ... | obj | ... | (if have setter, but no getter) |
| ... | obj | ... | key | getter | setter | -> | ... | obj | ... | (if have both getter and setter) |

### 要約

Object.defineProperty() のようなセマンティクスで、 obj_idx にあるオブジェクトの property key の属性を作成または変更します。要求された変更が許可されない場合（例えば、プロパティが設定できない場合）、TypeErrorがスローされます。ターゲットがオブジェクトでない場合（またはインデックスが無効な場合）、エラーがスローされます。

flags フィールドは、どのプロパティの属性が変更されるかを示す "have" フラグを提供し、これは Object.defineProperty() で許可される部分プロパティ記述子をモデル化したものです。書き込み可能、設定可能、および列挙可能な属性の値は flags フィールドで指定し、プロパティ値、ゲッター、およびセッターはバリュースタック引数として指定します。新しいプロパティを作成するとき、属性値が見つからないと、ECMAScript のデフォルトが使用されます（すべての boolean 属性に対して false、value、getter、setter に対して undefined）；既存のプロパティを修正するとき、属性値が見つからないと、既存の属性値が変更されないことを意味します。

具体的な例として

```javascript
// Set value, set writable, clear enumerable, leave configurable untouched.
Object.defineProperty(obj, { value: 123, writable: true, enumerable: false });
```

このようにマッピングします。

```c
duk_push_uint(ctx, 123);  /* value is taken from stack */
duk_def_prop(ctx, obj_idx,
             DUK_DEFPROP_HAVE_VALUE |  /* <=> value: 123 */
             DUK_DEFPROP_HAVE_WRITABLE | DUK_DEFPROP_WRITABLE |  /* <=> writable: true */
             DUK_DEFPROP_HAVE_ENUMERABLE);  /* <=> enumerable: false */
```

DUK_DEFPROP_FORCE フラグを使用すると、拡張不可能なターゲットオブジェクトや設定不可能なプロパティのために操作が通常失敗する場合でも、プロパティの変更を強制することができます。これは ECMAScript コードから Object.defineProperty() で行うことはできず、例えばサンドボックスのセットアップに有用です。場合によっては、強制的な変更さえも不可能で、エラーが投げられることになります。例えば、内部で仮想プロパティとして実装されているプロパティは、変更不可能であったり（string .length や index プロパティなど）、制限がある場合があります（array .length プロパティは内部制限により設定や列挙ができないなど）。

以下の基本フラグが定義されています。

定義 説明
DUK_DEFPROP_WRITABLE DUK_DEFPROP_HAVE_WRITABLE が設定されている場合のみ有効です。
DUK_DEFPROP_ENUMERABLE DUK_DEFPROP_HAVE_ENUMERABLEが設定されている場合のみ有効です。
DUK_DEFPROP_CONFIGURABLE 設定可能な属性を設定します。DUK_DEFPROP_HAVE_CONFIGURABLE が設定されている場合のみ有効です。
DUK_DEFPROP_HAVE_WRITABLE 書き込み可能な属性を設定または解除します （未設定の場合は変更されません）。
DUK_DEFPROP_HAVE_ENUMERABLE 列挙可能な属性を設定または解除します (未設定の場合は変更されません)。
DUK_DEFPROP_HAVE_CONFIGURABLE コンフィギュラブル属性を設定または解除します (未設定の場合、変更されません)。
DUK_DEFPROP_HAVE_VALUE 値属性を設定します。値はバリュースタックで指定されます。
DUK_DEFPROP_HAVE_GETTER ゲッター属性を設定し、値はバリュースタックに保存されます。
DUK_DEFPROP_HAVE_SETTER セッター属性の設定、値はバリュースタックで指定されます。
DUK_DEFPROP_FORCE 属性が設定不可能な場合でも、可能であれば属性を強制的に変更します。

また、一般的なフラグの組み合わせに対応する便利な定義もあります。例えば、DUK_DEFPROP_SET_WRITABLE は DUK_DEFPROP_HAVE_WRITABLE と DUK_DEFPROP_WRITABLE に相当します。現在、以下のものが定義されています。

定義 説明
DUK_DEFPROP_{SET,CLEAR}_WRITABLE 'writable' 属性を設定またはクリアします。
DUK_DEFPROP_{SET,CLEAR}_ENUMERABLE 'enumerable' 属性を設定または解除します。
DUK_DEFPROP_{SET,CLEAR}_CONFIGURABLE '設定可能' 属性を設定または解除します。
DUK_DEFPROP_SET_{W,E,C,WE,WC,EC,WEC} 1つまたは複数の属性を設定し、他の属性には触れないようにします。
DUK_DEFPROP_CLEAR_{W,E,C,WE,WC,EC,WEC} 1つまたは複数の属性をクリアします。
DUK_DEFPROP_ATTR_{W,E,C,WE,WC,EC,WEC} 書き込み可能、 列挙可能、 設定可能な属性を設定ま たは ク リ ア し ます。例えば、DUK_DEFPROP_ATTR_WCはwritableとconfigurableを設定し、enumerableをクリアします。
DUK_DEFPROP_HAVE_{W,E,C,WE,WC,EC,WEC} 1つ以上の属性が設定／クリアされることを示します。例えば、DUK_DEFPROP_HAVE_WC は DUK_DEFPROP_HAVE_WRITABLE | DUK_DEFPROP_HAVE_CONFIGURABLE と同等です。
DUK_DEFPROP_{W,E,C,WE,WC,EC,WEC} 属性値を与えます（一致する "have" フラグが設定されている場合に有効）。例えば DUK_DEFPROP_WE は DUK_DEFPROP_WRITABLE | DUK_DEFPROP_ENUMERABLE と同じ意味です。

いくつかの例（以下にもっと例を示します）。

値を設定し、書き込み可能を設定し、列挙可能をクリアし、設定可能を設定するには、値をバリュースタックにプッシュして、フラグを設定します。
基本フラグ。DUK_DEFPROP_HAVE_VALUE | DUK_DEFPROP_HAVE_WRITABLE | DUK_DEFPROP_WRITABLE | DUK_DEFPROP_HAVE_ENUMERABLE | DUK_DEFPROP_HAVE_CONFIGURABLE; or DUK_DEFPROP_CONFIGURABLE。
便利です。DUK_defprop_have_value | DUK_defprop_attr_WC.
書き込み可能な属性を消去する（他の属性はそのままにしておく）には、 flags を設定します。
基本フラグ。DUK_DEFPROP_HAVE_WRITABLE; または
便利です。DUK_DEFPROP_CLEAR_WRITABLE、または
便宜上DUK_DEFPROP_CLEAR_W.
値を設定し、書き込み可能を消去し、列挙可能を設定するには（他の属性はそのままで）、値をバリュースタックにプッシュし、フラグを設定します。
基本フラグ。DUK_DEFPROP_HAVE_VALUE | DUK_DEFPROP_HAVE_WRITABLE | DUK_DEFPROP_HAVE_ENUMERABLE | DUK_DEFPROP_ENUMERABLE; または
便利です。DUK_DEFPROP_HAVE_VALUE | DUK_DEFPROP_CLEAR_W | DUK_DEFPROP_SET_E、または
便利です。DUK_DEFPROP_HAVE_VALUE | DUK_DEFPROP_HAVE_WE | DUK_DEFPROP_E.

このAPIコールはいろいろと便利です。

Cコードから直接、非デフォルトの属性を持つプロパティを作成します。
Cコードから直接、アクセッサ（ゲッター／セッター）プロパティを作成します。
既存のプロパティの属性を C コードから直接変更します。
より多くの例については、APIテストケースtest-def-prop.cを参照してください。

ターゲットがdefinePropertyトラップを実装しているProxyオブジェクトの場合、トラップが起動するはずです。しかし、Duktapeは現在definePropertyトラップをサポートしておらず、defineProperty()オペレーションは現在ターゲットに転送されません。サポートが追加された場合、このAPIコールはトラップを呼び出したり、操作をターゲット・オブジェクトに転送したりするようになります。

### 例

```c
duk_idx_t obj_idx = /* ... */;

/* Create an ordinary property which is writable and configurable, but
 * not enumerable.  Equivalent to:
 *
 *   Object.defineProperty(obj, 'my_prop_1', {
 *      value: 123, writable: true, enumerable: false, configurable: true
 *   });
 */

duk_push_string(ctx, "my_prop_1");
duk_push_int(ctx, 123);  /* prop value */
duk_def_prop(ctx,
             obj_idx,
             DUK_DEFPROP_HAVE_VALUE |
             DUK_DEFPROP_HAVE_WRITABLE | DUK_DEFPROP_WRITABLE |
             DUK_DEFPROP_HAVE_ENUMERABLE | 0 |
             DUK_DEFPROP_HAVE_CONFIGURABLE | DUK_DEFPROP_CONFIGURABLE);

/* The same but more readable using convenience flags. */

duk_push_string(ctx, "my_prop_1");
duk_push_int(ctx, 123);  /* prop value */
duk_def_prop(ctx, obj_idx, DUK_DEFPROP_HAVE_VALUE | DUK_DEFPROP_ATTR_WC);

/* Change the property value and make it non-writable.  Don't touch other
 * attributes.  Equivalent to:
 *
 *   Object.defineProperty(obj, 'my_prop_1', {
 *      value: 321, writable: false
 *   });
 */

duk_push_string(ctx, "my_prop_1");
duk_push_int(ctx, 321);
duk_def_prop(ctx,
             obj_idx,
             DUK_DEFPROP_HAVE_VALUE |
             DUK_DEFPROP_HAVE_WRITABLE | 0);

/* The same but more readable using convenience flags. */

duk_push_string(ctx, "my_prop_1");
duk_push_int(ctx, 321);
duk_def_prop(ctx,
             obj_idx,
             DUK_DEFPROP_HAVE_VALUE | DUK_DEFPROP_CLEAR_WRITABLE);

/* Make the property non-configurable, don't touch value or other attributes.
 * Equivalent to:
 *
 *   Object.defineProperty(obj, 'my_prop_1', {
 *      configurable: false
 *   });
 */

duk_push_string(ctx, "my_prop_1");
duk_def_prop(ctx,
             obj_idx,
             DUK_DEFPROP_HAVE_CONFIGURABLE | 0);

/* The same but more readable using convenience flags. */

duk_push_string(ctx, "my_prop_1");
duk_def_prop(ctx, obj_idx, DUK_DEFPROP_CLEAR_CONFIGURABLE);

/* Create an accessor property which is non-configurable and non-enumerable.
 * Attribute flags are not given so they default to ECMAScript defaults
 * (false) automatically.  Equivalent to:
 *
 *   object.defineproperty(obj, 'my_accessor_1', {
 *      get: my_getter, set: my_setter
 *   });
 */

duk_push_string(ctx, "my_accessor_1");
duk_push_c_function(ctx, my_getter, 0 /*nargs*/);
duk_push_c_function(ctx, my_setter, 1 /*nargs*/);
duk_def_prop(ctx,
             obj_idx,
             DUK_DEFPROP_HAVE_GETTER |
             DUK_DEFPROP_HAVE_SETTER);

/* Create an accessor property which is non-configurable but enumerable.
 * Attribute flags are given explicitly which is easier to read without
 * knowing about ECMAScript attribute default values.  Equivalent to:
 *
 *   Object.defineProperty(obj, 'my_accessor_2', {
 *      get: my_getter, set: my_setter, enumerable: true, configurable: false
 *   });
 */

duk_push_string(ctx, "my_accessor_2");
duk_push_c_function(ctx, my_getter, 0 /*nargs*/);
duk_push_c_function(ctx, my_setter, 1 /*nargs*/);
duk_def_prop(ctx,
             obj_idx,
             DUK_DEFPROP_HAVE_GETTER |
             DUK_DEFPROP_HAVE_SETTER |
             DUK_DEFPROP_HAVE_CONFIGURABLE |  /* clear */
             DUK_DEFPROP_HAVE_ENUMERABLE | DUK_DEFPROP_ENUMERABLE);  /* set */

/* The same but more readable with convenience flags. */

duk_push_string(ctx, "my_accessor_2");
duk_push_c_function(ctx, my_getter, 0 /*nargs*/);
duk_push_c_function(ctx, my_setter, 1 /*nargs*/);
duk_def_prop(ctx,
             obj_idx,
             DUK_DEFPROP_HAVE_GETTER |
             DUK_DEFPROP_HAVE_SETTER |
             DUK_DEFPROP_HAVE_CLEAR_CONFIGURABLE |
             DUK_DEFPROP_HAVE_SET_ENUMERABLE);

/* Change the value of a non-configurable property by force.
 * No ECMAScript equivalent.
 */

duk_push_string(ctx, "my_nonconfigurable_prop");
duk_push_value(ctx, 321);
duk_def_prop(ctx,
             obj_idx,
             DUK_DEFPROP_HAVE_VALUE |
             DUK_DEFPROP_FORCE);
```

### 参照

duk_get_prop_desc
