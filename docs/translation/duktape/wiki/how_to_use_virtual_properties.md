# 仮想プロパティの活用方法

Duktapeは、プロパティアクセスをプログラムで操作するための2つのメカニズムを提供します。

- アクセサー・プロパティ(ゲッターとセッター)
- プロキシ・オブジェクト

## ECMAScript E5 のアクセサー・プロパティ（ゲッターとセッター）

### アクセサの概要

ECMAScript Edition 5 は、プロパティの読み取り/書き込み操作をユーザ関数で捕捉できるようにするアクセサ・プロパティ（"ゲッターとセッター "とも呼ばれる）を提供します。セッター/ゲッター関数は、ECMAScript と Duktape/C の両方の関数にすることができます。

アクセサは、ECMAScript コードからは Object.defineProperty() または Object.defineProperties() を、C コードからは duk_def_prop() を使ってセットアップされます。

### 例

obj.colorへの書き込みをキャプチャして、色値を検証し、副作用として再描画をトリガすることができるようにします。

```js
var obj = {};

function validateColor(color) {
    // 真または偽を返す
}

Object.defineProperty(obj, 'color', {
    enumerable: false,
    configurable: false,
    get: function () {
        // 現在の色は、ここで生の _color プロパティに格納されます。
        return this._color;
    },
    set: function (v) {
        if (!validateColor(v)) {
            // 有効なカラーフォーマットのみを割り当てる
            throw new TypeError('invalid color: ' + v);
        }
        this._color = v;
        redraw();
    }
});

// Change to red and trigger a redraw.
obj.color = '#ff0000';
```

### 制限事項

セッターとゲッターは、E5標準の一部であり、広く実装されているという利点があります。しかし、大きな制約もあります。

- プロパティの読み込みと書き込みの操作に限定される。プロパティの削除やオブジェクトの列挙などには対応できない。

- 事前にアクセッサとして設定した個々のプロパティにのみ適用されます。特定のオブジェクトのすべてのプロパティアクセスを捕捉することはできないため、大きなアレイの仮想化など、いくつかのシナリオで有用性が制限されます。

- 標準的なプロパティ・ゲッター／セッター関数は、プロパティ・キーを引数として取得しないため（この動作はECMAScript仕様で定義されています）、複数のプロパティに対するゲッター／セッター関数を共有することができません。しかし、Duktapeは、プロパティ名を追加の非標準引数として持つゲッター/セッター関数を提供します; 以下の議論を参照してください。

### 非標準のゲッター/セッターキー引数

Duktapeは、プロパティ・アクセスによってゲッター/セッターが引き起こされる場合、非標準的なゲッター/セッター関数の引数としてプロパティ・キーを提供します。例えば、print(foo.bar)を実行すると、"bar "プロパティのゲッターが呼び出され、その関数は非標準的な追加引数として "bar "を取得します。

```js
var obj = {};
function myGetter(key) {
    // 'this' バインディングはターゲットオブジェクト、'key' は非標準の引数です
}
function mySetter(val, key) {
    // 'this' バインディングはターゲットオブジェクト、'key' は非標準の引数です
}
Object.defineProperties(obj, {
    // こちらも同じゲッター/セッターを使用することができます。
    key1: { enumerable: true, configurable: true, get: myGetter, set: mySetter },
    key2: { enumerable: true, configurable: true, get: myGetter, set: mySetter },
    key3: { enumerable: true, configurable: true, get: myGetter, set: mySetter }
    // ...
});
```

しかし、ゲッターやセッターは、プロパティアクセスを行わずに呼び出すこともできます。このような場合は、もちろん引数がなくなります。

```js
var desc = Object.getOwnPropertyDescriptor(obj, 'key1');
var getter = desc.get;
print(getter());  // ゲッターを直接呼び出すと、キー名は 'undefined' になります。
```

この手法では，ゲッター/セッター関数を共有することができますが，それでも各アクセサープロパティをあらかじめ定義しておく必要があります．特に、配列要素の仮想化は、非常に小さい固定サイズの配列を除いて、合理的な方法で行うことができません。

test-dev-nonstd-setget-key-argument.js も参照してください。

### Duktape/Cのゲッター/セッターを、非標準のキー引数なしで共有する。

非標準のゲッター/セッター・キー引数を使いたくない場合は、以下のようにDuktape/C関数を1組共有して、複数のプロパティ・キーを仮想化することもできます。

まず、各ゲッター/セッターに対して別々のECMAScript関数が作成され、そのような関数はそれぞれ同じ基礎となるDuktape/C関数を使用します。次に、Duktape/C関数は、それが呼び出されたECMAScript関数インスタンス「経由」に格納されたプロパティを使用して、その動作を特殊化します。以下では、ECMAScript関数インスタンスに格納されているキーのプロパティを紹介します。

各プロパティに対して、以下のようにゲッター/セッター関数を作成することになる。

```c
/* key1' ゲッター/セッター用のECMAScript関数オブジェクトを作成する。 */
duk_push_c_function(my_setter, 1 /*nargs*/);
duk_push_string(ctx, "key1");
duk_put_prop_string(ctx, -2, "key");
duk_push_c_function(my_getter, 0 /*nargs*/);
duk_push_string(ctx, "key1");
duk_put_prop_string(ctx, -2, "key");
/* ... ターゲットオブジェクトにアクセッサプロパティを追加する */

/* 同様に'key2'のゲッター/セッターのためのECMAScript関数オブジェクトを作成し、残りのプロパティについても同様に作成する。 */
```

Duktape/Cのゲッター関数は、次のようになります（セッターも同様）。

```c
static duk_ret_t my_getter(duk_context *ctx) {
    const char *key;

    /* ゲッターの位置引数はありません。 */

    /* 'this' バインディングからターゲットオブジェクトを取得する（例えば "foo.bar" にアクセスした場合は "foo" を取得する）。 */
    duk_push_this(ctx);

    /* my_getter ネイティブ関数を「ラップ」した ECMAScript 関数からアクセスされている「キー」を取得します。 */
    duk_push_current_function(ctx);
    duk_get_prop_string(ctx, -1, "key");
    key = duk_require_string(ctx, -1);

    /* -> [ この関数のキー ] */

    if (strcmp(key, "key1") == 0) {
        /* key1'に対する動作 */
    } else if (strcmp(key, "key2") == 0) {
        /* key2'に対する動作 */
    }
    /* ... */
}
```

仮想化された各プロパティに対して、個別のECMAScript関数オブジェクトとターゲットオブジェクト上の事前定義されたアクセッサプロパティが依然として必要である。

## ECMAScript E6 プロキシサブセット

### プロキシの概要

Duktapeは、アクセッサに加えて、ECMAScript E6のProxy概念のサブセット実装を提供します（参照）。

- Proxyオブジェクト（サブセット）：DuktapeのProxy実装における現在の制限事項。
- プロキシ・オブジェクト（E6）。ES2015 の Proxy オブジェクトの仕様です。
- Proxy (Mozilla):MozillaによるFirefoxに実装されたProxyの説明で、多くの例を含んでいます。

Proxy オブジェクトはゲッター/セッターよりもはるかに強力ですが、ECMAScript エンジンでまだ広く使われている機能ではありません。

### has、get、set、deleteProperty トラップの例。

任意のプロパティにアクセスするたびに一行表示する。

```js
// 下地となるプレーンなオブジェクト。
var target = { foo: 'bar' };

// ハンドラテーブル、インタラクションのためのトラップを提供する（オンザフライで変更可能）。
var handler = {
    has: function (targ, key) {
        print('has called for key=' + key);
        return key in targ;  // 存在状態をそのまま返す
    },

    get: function (targ, key, recv) {
        print('get called for key=' + key);
        return targ[key];  // 修正されていない値を返す
    },

    set: function (targ, key, val, recv) {
        print('set called for key=' + key + ', val=' + val);
        targ[key] = val;  // 'set' が定義されている場合、ターゲットへの書き込みを手動で行う必要があります。
        return true;      // true: プロパティ書き込みが許可されたことを示す
    },

    deleteProperty: function (targ, key) {
        print('deleteProperty called for key=' + key);
        delete targ[key];  // 'deleteProperty'が定義されている場合は、手動で削除する必要があります。
        return true;       // true: プロパティの削除が許可されたことを示す
    }
};

// プロキシオブジェクトを作成する。
var proxy = new Proxy(target, handler);

// その後、プロキシオブジェクトは正常にアクセスされる。
print('foo' in proxy);
proxy.foo = 321;
print(proxy.foo);
delete proxy.foo;
```

Proxyオブジェクトは、基礎となるオブジェクトの読み取り専用バージョンを作成するために使用することもできます（そうしないと、かなり面倒なことになります）。

```js
var proxy = new Proxy(target, {
    // hasとgetは省略：存在チェックと読み出しは自動的にターゲットオブジェクトに通じる

    // setがfalseを返す：書き込みを拒否する
    set: function () { return false; },

    // deleteProperty が false を返す場合：削除を拒否する。
    deleteProperty: function () { return false; }
});
```

また、オブジェクトの書き込み専用バージョンを作成することもできます（他の方法では不可能です）。

```js
var proxy = new Proxy(target, {
    has: function() { throw new TypeError('has not allowed'); },
    get: function() { throw new TypeError('get not allowed'); }

    // set, deleteProperty を省略した場合： set/delete 操作は許可され、自動的にターゲットにスルーされます。
});
```

以下は、やや人為的な動作を複数組み合わせた、より複雑な例である。

```js
var target = { foo: 'bar' };

/*
 *  - 'color' はゲッター/セッターの例と同じように動作し、削除できない (削除しようとすると TypeError が発生する)。
 *
 *  - 文字列の値はすべて大文字で読み込まれます。
 *
 *  - アンダースコアで始まるプロパティ名は、いくつかの異なる方法で読み取り/書き込み/削除が保護され、その存在は否定されます。
 */

var handler = {
    has: function (targ, key) {
        // このバインディング：ハンドラテーブル
        // targ: underlying plain object (= target, above)

        if (typeof key === 'string' && key[0] === '_') {
            // pretend that property doesn't exist
            return false;
        }

        return key in targ;
    },

    get: function (targ, key, recv) {
        // このバインディング：ハンドラテーブル
        // targ: underlying plain object (= target, above)
        // key: key (can be any value, not just a string)
        // recv: object being read from (= the proxy object)

        if (typeof key === 'string' && key[0] === '_') {
            throw new TypeError('attempt to access a read-protected property');
        }

        // 戻り値：プロパティ検索結果として提供される値。
        var val = targ[key];
        return (typeof val === 'string' ? val.toUpperCase() : val);
    },

    set: function (targ, key, val, recv) {
        // this binding: ハンドラテーブル
        // targ: underlying plain object (= target, above)
        // key: key (can be any value, not just a string)
        // val: value
        // recv: object being read from (= the proxy object)

        if (typeof key === 'string') {
            if (key === 'color') {
                if (!validateColor(val)) {
                    throw new TypeError('invalid color: ' + val);
                }
                targ.color = val;
                redraw();

                // True: プロパティの書き込みが許可されていることを呼び出し元に示す。
                return true;
            } else if (key[0] === '_') {
                // False: は、プロパティの書き込みが拒否されたことを呼び出し元へ通知する。非厳密モードでは黙って無視されるが、厳密モードではTypeErrorが投げられる。
                return false;
            }
        }

        // ターゲットに書き込む。  また、ターゲットに書き込まずにtrueを返すことで、ターゲットを変更せずに書き込みに成功したことをシミュレートすることもできます。
        targ[key] = val;
        return true;
    },

    deleteProperty: function (targ, key) {
        // this binding: handler table
        // targ: underlying plain object (= target, above)
        // key: key (can be any value, not just a string)

        if (typeof key === 'string') {
            if (key === 'color') {
                // For 'color' a delete attempt causes an explicit error.
                throw new TypeError('attempt to delete the color property');
            } else if (key[0] === '_') {
                // False: は、プロパティの削除が拒否されたことを呼び出し元へ通知する。非厳密モードでは黙って無視されるが、厳密モードではTypeErrorが投げられる。
                return false;
            }
        }

        // ターゲットから削除する。また、ターゲットから削除せずに true を返すことで、ターゲットを変更せずに削除が成功したことをシミュレートすることもできます。
        delete targ[key];
        return true;
    }
};
```

ES2015のセマンティクスは、トラップが許可する場合でも、いくつかのプロパティアクセスを拒否する。これは、プロキシのターゲットオブジェクトが設定不可能な競合するプロパティを持つ場合に発生します; 詳細はE6セクション9.5.7, 9.5.8, 9.5.9, 9.5.10 を参照してください。ターゲットオブジェクトを空にし、必要なら関係のないプレーンオブジェクトに仮想プロパティをバックアップすることで、このような動作を簡単に回避することができます。

### enumerate および ownKeys トラップの例

これらのトラップは以下のように呼び出されます。

|          Call site           |   Trap    |                     Notes                      |
| ---------------------------- | --------- | ---------------------------------------------- |
| Object.keys()                | ownKeys   |                                                |
| Object.getOwnPropertyNames() | ownKeys   |                                                |
| for-in enumeration           | ownKeys   | In Duktape 2.x, matching ES2016 semantics.     |
| for-in enumeration           | enumerate | In Duktape 1.x, matching ES2015 semantics.(*1) |

(*1) ただし、配列または「配列のような」トラップ結果のみがサポートされています（ES2015初期のドラフト動作）。標準のES2015 "enumerate" トラップはイテレータを返さなければなりませんが、Duktape 1.xではイテレータはサポートされていません。ES2016のセマンティクスに合わせて "enumerate" トラップを削除し、Duktape 2.x では決して呼び出されません。

以下の例は、Duktape 1.x用です。

アンダースコアで始まるプロパティ名を列挙とObject.keys()およびObject.getOwnPropertyNames()から非表示にする。

```js
var target = {
    foo: 1,
    bar: 2,
    _quux: 3,
    _baz: 4
};

var proxy = new Proxy(target, {
    enumerate: function (targ) {
        // this binding: handler table
        // targ: underlying plain object (= target, above)

        return Object.getOwnPropertyNames(targ)
                     .filter(function (v) { return v[0] !== '_'; });
    },

    ownKeys: function (targ) {
        return Object.getOwnPropertyNames(targ)
                     .filter(function (v) { return v[0] !== '_'; });
    }
});

function test() {
    for (var k in proxy) {
        print(k);  // prints 'foo' and 'bar'
    }
}
test();

print(Object.keys(proxy));                 // prints 'foo,bar'
print(Object.getOwnPropertyNames(proxy));  // prints 'foo,bar'
```

### コンストラクタ関数でProxyを使用する

コンストラクタがオブジェクト値を返す場合、その値は、このバインディング E5.1 セクション 13.2.2 としてコンストラクタで利用できる自動的に作成されたデフォルトのインスタンスを置き換えます。これにより、コンストラクタ呼び出しの結果としてコンストラクタからProxyオブジェクトが返されるようになります。

また、thisオブジェクトを普通に初期化して、それをProxyでラップすることもできます（test-bi-proxy-in-constructor.jsを参照）。

```js
function MyConstructor() {
    // 普通に'this'を初期化する
    this.foo = 'bar';

    // プロキシで囲む
    return new Proxy(this, {
        // プロキシトラップ
    });
}

var obj = new MyConstructor();
```

## Duktapeが対応していないメカニズム

プロパティの仮想化には、さまざまな非標準のメカニズムがあります。これらはDuktapeではサポートされていません。

- Object.prototype.watch()
