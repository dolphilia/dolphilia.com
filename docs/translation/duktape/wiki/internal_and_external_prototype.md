# 内部および外部プロトタイプ

ECMAScriptには2つの異なるプロトタイプの概念があり、混乱する可能性があります。

- 内部プロトタイプ：すべてのオブジェクトに存在し、実際のプロパティとメソッドの検索を制御します。
- 外部プロトタイプ：コンストラクタ関数の .prototype プロパティで、コンストラクタ呼び出し（new MyConstructor()）を使用して作成されたオブジェクトの内部プロトタイプを初期化するために使用されます。

「内部プロトタイプ」と「外部プロトタイプ」は標準的な用語ではありませんが、Duktapeのドキュメントでは分かりやすくするために使用されています。

こちらもご参照ください。

- ネイティブコンストラクタ関数の書き方
- https://developer.mozilla.org/en/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
- http://stackoverflow.com/questions/383201/relation-between-prototype-and-prototype-in-javascript

## 内部プロトタイプ

内部プロトタイプは、単に "プロトタイプ "とも呼ばれ、ECMAScript 仕様では内部プロパティ \[\[Prototype\]\] として規定されている。

- http://www.ecma-international.org/ecma-262/5.1/#sec-8.6.2

obj.propのような実際のプロパティ検索に影響します。少し単純化すると、プロパティ・ルックアップ。

- プロパティが、いわゆる "自分のプロパティ" として、ターゲット・オブジェクトに直接存在するかどうかをチェックします。
- プロパティが見つかった場合、ルックアップは終了します。
- プロパティが見つからない場合、そのオブジェクトの内部プロトタイプが検索される。内部プロトタイプが NULL の場合、検索は失敗する。内部プロトタイプが NULL の場合、検索は失敗する。それ以外の場合、プロトタイプオブジェクトから再帰的にプロパティが検索される。この一連のオブジェクトの探索をプロトタイプチェーンと呼ぶ。

内部プロパティである\[\[Prototype\]\]プロパティには直接アクセスできませんが、それを使って対話することは可能です。

- obj.\_\_proto\_\_: Object.prototype を継承するオブジェクトの内部プロトタイプの読み書きを可能にする Object.prototype から継承したアクセサプロパティ（すべてのオブジェクトがそうではない！）。ES2015で指定されましたが、ES2015以前の非標準的な実装もあります。
- Object.getPrototypeOf() および Object.setPrototypeOf(): ES2015 で追加された、内部プロトタイプの読み書きを行う明示的なメソッドです。
- duk_get_prototype()およびduk_set_prototype()。内部プロトタイプを読み書きするためのDuktape C APIコール。

ECMAScript の API (\_\_proto\_\_ と Obj.setPrototypeOf) は、プロトタイプ・ループの作成を防いでいるため、作成しようとすると TypeError で失敗します。

```
duk> var obj1 = {}; var obj2 = {};
= undefined
duk> Object.setPrototypeOf(obj1, obj2); Object.setPrototypeOf(obj2, obj1);
TypeError: type error (rc -105)
    setPrototypeOf  native strict preventsyield
    global input:1 preventsyield
```

しかし、Duktape C APIはより低レベルで、プロトタイプ・ループを作成することができます（これは一般的に避けるべきものです）。Duktapeには、ループしたプロトタイプ・チェーンからのルックアップを終了させるためのサニティ・リミットがあります。

## 外部プロトタイプ

外部プロトタイプは、ほとんどの ECMAScript 関数に存在する .prototype プロパティです。これはデフォルトですべての関数に存在しますが、手動で削除することができます（また、いくつかのビルトインはこのプロパティを持ちません）。.prototype プロパティは、関数がコンストラクタとして呼び出されたときのみ効果を発揮します（例:

```js
var obj = new MyConstructor();
```

コンストラクタの呼び出しが発生したとき（詳しくは http://www.ecma-international.org/ecma-262/5.1/#sec-13.2.2 をご覧ください）。

- Duktapeは新しい空のオブジェクト（「デフォルト・インスタンス」）を作成します。その内部プロトタイプは、コンストラクタの.prototypeプロパティの現在の値に初期化されます。.prototypeの値がオブジェクトでない場合、または見つからない場合、内部プロトタイプはObject.prototypeに初期化されます。
- コンストラクタ関数は、新しく作成されたデフォルトのインスタンスを指すこのバインディングで呼び出されます。コンストラクタは、例えば this.name = "my object"; のように、デフォルトのインスタンスにプロパティを追加することができます。
- 通常、コンストラクタ関数は戻り値を持たない（または明示的に undefined を返す）ので、デフォルトのインスタンスは new MyConstructor() の値として返されます。
- しかし、コンストラクタ関数が明示的にオブジェクトの値を返す場合、例えば using var ret = { foo: 123 }; return ret; では、デフォルトのインスタンスは無視され、返されたオブジェクトが new MyConstructor() の呼び出しの値となります。これにより、コンストラクタは関数やProxyオブジェクトを返すことができます。

外部のプロトタイプが影響を与えるのは、デフォルトのインスタンスを初期化する点だけです。特に、デフォルトのインスタンスを無視してコンストラクタから明示的にオブジェクトの値を返す場合、外部プロトタイプは作成されるオブジェクトに何の影響も及ぼさない。

## ECMAScript 関数のデフォルトの外部プロトタイプオブジェクト。

ECMAScript コードで関数を宣言すると、ECMAScript セマンティクスは自動的に外部 .prototype オブジェクトを提供します。例えば、宣言するとき

```js
function MyConstructor() {
    // ...
}
```

を指定すると、以下のオブジェクトが自動的に作成されます。

- MyConstructor: コンストラクタ関数そのものです。
- MyConstructor.prototype: 新規に作成されたプロトタイプオブジェクトへのポイント。

プロトタイプオブジェクトは、コンストラクタ関数を指す .constructor プロパティを除いて空です。

```js
MyConstructor.prototype.constructor === MyConstructor
```

MyConstructor.prototype の内部プロトタイプは Object.prototype であり、new MyConstructor() で生成したオブジェクトからプロパティを検索する場合、デフォルトでプロトタイプチェーンとなります。

- The object itself
- MyConstructor.prototype
- Object.prototype

For simple objects a common idiom is for inherited methods to be added to MyConstructor.prototype.

インスタンスオブジェクトの最終的なプロトタイプチェーンを制御する方法はたくさんあります。

- MyConstructor.prototypeを編集して、別のオブジェクトを指すように置き換えることができます。これは、変更後に作成されたオブジェクトにのみ影響します。
- MyConstructor.prototypeの内部プロトタイプを変更し、別のオブジェクト（おそらく祖先）がプロトタイプチェーンに含まれるようにすることができる。Object.setPrototypeOf(MyConstructor.prototype, MyAncestor.prototype)とします。これは、すでに作成されたオブジェクトにも影響します。
- コンストラクタの呼び出しに与えられる「デフォルトのインスタンス」を別のオブジェクトに置き換えることで、インスタンスのプロトタイプチェーンを完全に制御することができます。これは明らかに、新しく作成されたインスタンスにのみ影響を与えます。
- 最後に、オブジェクトのインスタンスは作成後に編集することができます。

##Duktape/C関数のデフォルトの外部プロトタイプ・オブジェクトがない

Duktape/C関数は、コンストラクターとして呼ばれた場合、ECMAScript関数と同じように動作します： Duktape/C関数の.prototypeプロパティに基づいて、デフォルトのインスタンスが作成されるなどです。

しかし、メモリ使用量を最小限に抑えるため、Duktape/C関数はデフォルトで外部プロトタイプ（.prototypeプロパティ）を持ちません。つまり、デフォルトのインスタンスは、あなたがしない限り、Object.prototypeを継承することになります。

- Duktape/C関数に明示的に.prototypeプロパティを追加する。
- デフォルト・インスタンス」を無視し、Duktape/C関数内で明示的にインスタンス・オブジェクトを生成して返す。
- インスタンス生成後に、そのインスタンスの内部プロトタイプを編集する。

を参照してください。ネイティブ・コンストラクター関数の書き方