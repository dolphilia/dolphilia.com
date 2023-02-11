# エラーオブジェクトの補強方法

## エラーオブジェクトのプロパティ

エラーオブジェクトは「独自の」プロパティとError.prototypeから継承したプロパティの両方を持ちます。いくつかのプロパティは通常のデータプロパティであり、他のプロパティは仮想的なものです。参照:

- http://duktape.org/guide.html#errorobjects

## .fileName、.lineNumber、および.stackを上書きする。

### Duktape 1.4.0 以降

これらのプロパティは、Error.prototypeから継承したアクセサ（ゲッター／セッター）で提供されます。ゲッターは、エラーが作成されたときにエラーに追加された内部の_Tracedataプロパティに基づいて、要求された結果（例：fileName）を提供します。

Duktape 1.4.0以降では、単純なプロパティ書き込みで、.fileName, .lineNumber, .stackをオーバーライドすることが可能です。

```js
var err = new Error('aiee');
err.fileName = 'dummy.js';
print(err.fileName);  // -> dummy.js
```

C言語で同等に。

```c
duk_push_error_object(ctx, DUK_ERR_RANGE_ERROR, "invalid arg: %d", myarg);
duk_push_string(ctx, "dummy.c");
duk_put_prop_string(ctx, -2, "fileName");
```

### Duktape 1.4.0以前

Duktape 1.4.0以前では、単純なプロパティ書き込みがうまくいきません。なぜなら、継承されたプロパティはアクセッサであり、書き込みの試みを「捕捉」して無視するからです。

```js
// Duktape 1.3.0
var err = new Error('aiee');
err.fileName = 'dummy.js';
print(err.fileName);  // not changed
```

これらのプロパティは、Object.defineProperty()を使用してオーバーライドすることができます。これは、継承されたアクセッサが設定可能であるため、オーバーライドする「自身の」プロパティをエラーに追加することができるためです。

```js
var err = new Error('aiee');
Object.defineProperty(err, 'fileName', {
    value: 'dummy.js',
    writable: true,
    enumerable: false,
    configurable: true
});
print(err.fileName);  // dummy.js
```

Cコードでは、duk_def_prop()を同様に使用することができます。

```c
duk_push_string(ctx, "fileName");
duk_push_string(ctx, "dummy.js");
duk_def_prop(ctx, idx_err, DUK_DEFPROP_HAVE_VALUE |
                           DUK_DEFPROP_HAVE_WRITABLE | DUK_DEFPROP_WRITABLE |
                           DUK_DEFPROP_HAVE_ENUMERABLE | /*not enumerable */
                           DUK_DEFPROP_HAVE_CONFIGURABLE | DUK_DEFPROP_CONFIGURABLE);
```

### Duktape 1.4.0の動作を保証します。

Duktape 1.4.0の挙動を旧バージョンに提供するためのポリフィルが存在します。

- https://github.com/svaarala/duktape/blob/master/polyfills/duktape-error-setter-writable.js