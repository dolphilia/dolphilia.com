# ネイティブコンストラクタ関数の書き方

ネイティブ・コンストラクタ関数は、ECMAScriptのコンストラクタと基本的に同じように動作しますが、Duktape/Cの関数にはデフォルトで.prototypeプロパティがないことが異なります。

コンストラクタ呼び出しによって新しいインスタンスを作成するには、（ECMAScriptでは）2つの基本的な方法があります。

- コンストラクタに自動的に渡されるデフォルトのインスタンスを使用する。
- コンストラクタから代替インスタンスを返す

## デフォルトのインスタンスを使用する

ECMAScript のコンストラクタ関数が new MyObject() として呼び出されたとき。

- デフォルトのインスタンスオブジェクトは、呼び出しが行われる前に自動的に作成されます。このオブジェクトは空になり、その内部プロトタイプは MyObject.prototype が存在すればそれに、そうでなければ Object.prototype に設定されます。
- デフォルトのインスタンスは、コンストラクタの呼び出しのために、これにバインドされます。

このデフォルトのインスタンスは、コンストラクタがオブジェクト値を返さない限り、new MyObject()の結果となります。

ECMAScript では、この基本的なイディオムは次のようになります。

```js
function MyObject(name) {
    // When called as new MyObject(), "this" will be bound to the default
    // instance object here.

    this.name = name;

    // Return undefined, which causes the default instance to be used.
}

// For an ECMAScript function an automatic MyObject.prototype value will be
// set.  That object will also have a .constructor property pointing back to
// Myobject.  You can add instance methods to MyObject.prototype.

MyObject.prototype.printName = function () {
    print('My name is: ' + this.name);
};

var obj = new MyObject('test object');
obj.printName();  // My name is: test object
```

C言語で同等のものを実装する場合、唯一の違いは、Duktape/C関数が自動的に.prototypeプロパティを持たないことです。つまり、以下のように.prototypeプロパティを手動で設定しない限り、デフォルトのインスタンスはObject.prototypeを継承することになります。

```c
/* MyObject.prototype.printName */
duk_ret_t myobject_print_name(duk_context *ctx) {
    /* Stack at entry is: [ ] */

    /* Get access to the 'this' binding. */
    duk_push_this(ctx);  /* -> stack: [ this ] */

    /* Read this.name */
    duk_get_prop_string(ctx, -1, "name");

    printf("My name is: %s\n", duk_safe_to_string(ctx, -1));

    return 0;  /* no return value (= undefined) */
}

/* MyObject */
duk_ret_t myobject_constructor(duk_context *ctx) {
    /* Stack at entry is: [ name ] */

    /* All Duktape/C functions can be called both as constructors
     * ("new func()") and functions ("func()").  Sometimes objects
     * allow both calls, sometimes not.  Here we reject a normal
     * non-constructor call.
     */
    if (!duk_is_constructor_call(ctx)) {
        return DUK_RET_TYPE_ERROR;
    }

    /* Get access to the default instance. */
    duk_push_this(ctx);  /* -> stack: [ name this ] */

    /* Set this.name to name. */
    duk_dup(ctx, 0);  /* -> stack: [ name this name ] */
    duk_put_prop_string(ctx, -2, "name");  /* -> stack: [ name this ] */

    /* Return undefined: default instance will be used. */
    return 0;
}

/* Initialize MyObject into global object. */
void myobject_init(duk_context *ctx) {
    /* Push constructor function; all Duktape/C functions are
     * "constructable" and can be called as 'new Foo()'.
     */
    duk_push_c_function(ctx, myobject_constructor, 1 /*nargs*/);

    /* Push MyObject.prototype object. */
    duk_push_object(ctx);  /* -> stack: [ MyObject proto ] */

    /* Set MyObject.prototype.printName. */
    duk_push_c_function(ctx, myobject_print_name, 0 /*nargs*/);
    duk_put_prop_string(ctx, -2, "printName");

    /* Set MyObject.prototype = proto */
    duk_put_prop_string(ctx, -2, "prototype");  /* -> stack: [ MyObject ] */

    /* Finally, register MyObject to the global object */
    duk_put_global_string(ctx, "MyObject");  /* -> stack: [ ] */
}

void test(duk_context *ctx) {
    myobject_init(ctx);

    /* Test creation of a new object from ECMAScript code. */
    duk_eval_string(ctx, "new MyObject('test object')");
    /* ... stack top has result ... */
    duk_get_prop_string(ctx, -1, "printName");  /* call obj.printName(); */
    duk_dup(ctx, -2);
    duk_call_method(ctx, 0 /*nargs*/);
    duk_pop(ctx);  /* pop call result */
    duk_pop(ctx);  /* pop instance */

    /* Test creation of a new object from C code. */
    duk_get_global_string(ctx, "MyObject");
    duk_push_string(ctx, "test object");  /* name argument */
    duk_new(ctx, 1 /*nargs*/);
    /* ... stack top has result ... */
    duk_get_prop_string(ctx, -1, "printName");  /* call obj.printName(); */
    duk_dup(ctx, -2);
    duk_call_method(ctx, 0 /*nargs*/);
    duk_pop(ctx);  /* pop call result */
    duk_pop(ctx);  /* pop instance */
}
```

あるいは、冗長なコメントをカットすると:

```c
/* MyObject.prototype.printName */
duk_ret_t myobject_print_name(duk_context *ctx) {
    duk_push_this(ctx);
    duk_get_prop_string(ctx, -1, "name");
    printf("My name is: %s\n", duk_safe_to_string(ctx, -1));
    return 0;
}

/* MyObject */
duk_ret_t myobject_constructor(duk_context *ctx) {
    if (!duk_is_constructor_call(ctx)) {
        return DUK_RET_TYPE_ERROR;
    }

    /* Set this.name = name; */
    duk_push_this(ctx);
    duk_dup(ctx, 0);
    duk_put_prop_string(ctx, -2, "name");

    return 0;  /* use default instance */
}

/* Initialize MyObject into global object. */
void myobject_init(duk_context *ctx) {
    duk_push_c_function(ctx, myobject_constructor, 1 /*nargs*/);
    duk_push_object(ctx);
    duk_push_c_function(ctx, myobject_print_name, 0 /*nargs*/);
    duk_put_prop_string(ctx, -2, "printName");
    duk_put_prop_string(ctx, -2, "prototype");
    duk_put_global_string(ctx, "MyObject");
}

void test(duk_context *ctx) {
    myobject_init(ctx);

    /* Test creation of a new object from ECMAScript code. */
    duk_eval_string(ctx, "new MyObject('test object')");
    /* ... stack top has result ... */
    duk_get_prop_string(ctx, -1, "printName");  /* call obj.printName(); */
    duk_dup(ctx, -2);
    duk_call_method(ctx, 0 /*nargs*/);
    duk_pop(ctx);  /* pop call result */
    duk_pop(ctx);  /* pop instance */

    /* Test creation of a new object from C code. */
    duk_get_global_string(ctx, "MyObject");
    duk_push_string(ctx, "test object");  /* name argument */
    duk_new(ctx, 1 /*nargs*/);
    /* ... stack top has result ... */
    duk_get_prop_string(ctx, -1, "printName");  /* call obj.printName(); */
    duk_dup(ctx, -2);
    duk_call_method(ctx, 0 /*nargs*/);
    duk_pop(ctx);  /* pop call result */
    duk_pop(ctx);  /* pop instance */
}
```

このCバージョンは、機能的にはECMAScriptバージョンとほとんど同じです。しかし、少なくとも2つの明確な違いがあります。

- ECMAScript バージョンの MyObject はコンストラクタと通常の関数呼び出しの両方を許可しています。C バージョンでは、エラーが起こりにくい非コンストラクタ呼び出しは拒否されます。
- ECMAScript 版の MyObject.prototype には .constructor の後方参照があり、 MyObject.prototype.constructor === MyObject になっています。C バージョンにはこれがありませんが、参照を追加するのは簡単です。.constructor の後方参照は ECMAScript エンジンの観点からは何の機能も持ちませんが、呼び出すコードによっては、それを見つけることを期待するかもしれません。

## Using a replacement value

これはあまり使われない方法ですが、それでもECMAScript標準では完全にサポートされています。

ECMAScript のコードでは

```js
var MyObject_prototype = {};
MyObject_prototype.printName = function () {
    print('My name is: ' + this.name)
};

function MyObject(name) {
    // "this" binding has the default instance, ignore it.
    // Create result object explicitly.
    var result = {};
    result.name = name;

    // You can set the internal prototype for the result explicitly.
    Object.setPrototypeOf(result, MyObject_prototype);

    // Important: by returning an object value the constructor
    // indicates that the return value should be used instead
    // of the default instance (which is always created).
    return result;
}

var obj = new MyObject('test object');
obj.printName();  // My name is: test object
```

Duktape/Cでは、この方法はDuktape/C関数に.prototypeオブジェクトを設定する必要がないという利点があります。デフォルトのインスタンスはObject.prototypeを継承しますが、デフォルトインスタンスを無視するので、これは重要ではありません。

```c
/* MyObject_prototype.printName */
duk_ret_t myobject_print_name(duk_context *ctx) {
    duk_push_this(ctx);  /* -> stack: [ this ] */
    duk_get_prop_string(ctx, -1, "name");
    printf("My name is: %s\n", duk_safe_to_string(ctx, -1));
    return 0;
}

/* MyObject */
duk_ret_t myobject_constructor(duk_context *ctx) {
    /* Stack at entry is: [ name ] */

    if (!duk_is_constructor_call(ctx)) {
        return DUK_RET_TYPE_ERROR;
    }

    /* Push explicitly created instance and set its prototype. */
    duk_push_object(ctx);
    duk_get_global_string(ctx, "MyObject_prototype");
    duk_set_prototype(ctx, -2);  /* -> stack: [ name result ] */

    /* Set result.name to name. */
    duk_dup(ctx, 0);
    duk_put_prop_string(ctx, -2, "name");  /* -> stack: [ name result ] */

    /* Return the 'result' object: replaces the default instance. */
    return 1;
}

/* Initialize MyObject into global object. */
void myobject_init(duk_context *ctx) {
    /* Register MyObject_prototype. */
    duk_push_object(ctx);
    duk_push_c_function(ctx, myobject_print_name, 0 /*nargs*/);
    duk_put_prop_string(ctx, -2, "printName");
    duk_put_global_string(ctx, "MyObject_prototype");

    /* Register MyObject. */
    duk_push_c_function(ctx, myobject_constructor, 1 /*nargs*/);
    duk_put_global_string(ctx, "MyObject");  /* -> stack: [ ] */
}

void test(duk_context *ctx) {
    myobject_init(ctx);

    /* Test creation of a new object from ECMAScript code. */
    duk_eval_string(ctx, "new MyObject('test object')");
    /* ... stack top has result ... */
    duk_get_prop_string(ctx, -1, "printName");  /* call obj.printName(); */
    duk_dup(ctx, -2);
    duk_call_method(ctx, 0 /*nargs*/);
    duk_pop(ctx);  /* pop call result */
    duk_pop(ctx);  /* pop instance */

    /* Test creation of a new object from C code. */
    duk_get_global_string(ctx, "MyObject");
    duk_push_string(ctx, "test object");  /* name argument */
    duk_new(ctx, 1 /*nargs*/);
    /* ... stack top has result ... */
    duk_get_prop_string(ctx, -1, "printName");  /* call obj.printName(); */
    duk_dup(ctx, -2);
    duk_call_method(ctx, 0 /*nargs*/);
    duk_pop(ctx);  /* pop call result */
    duk_pop(ctx);  /* pop instance */
}
```