# HASPROP: Exposed Property 存在チェック ("in" 演算子)

## 背景

プロパティの存在チェックは、ECMAScript のコード内で ``in`` 演算子を用いて行われます。

```js
print('foo' in bar);  // foo.barが存在するかどうかを確認する
```

これには

* 左辺の式
* 右辺の式
* ``in`` セマンティクス (E5 Section 11.8.7)
* ``[[HasProperty]]`` への呼び出し。

## 初稿

プロパティアクセサから始めて、 ``in`` を適用する (そして、未使用のステップをスキップする)。
を適用する(未使用のステップはスキップする)。

1.1. ``CheckObjectCoercible`` をベース値に対して呼び出します。  実際には、ベース値が ``null`` や ``undefined`` の場合は、 ``TypeError`` をスローします。
2.2. 基底値がオブジェクトでない場合、 ``TypeError`` を投げる。
3.3. ``ToString()`` を使用して、プロパティ名を文字列に変換します。
4.4. ``[[HasProperty]]`` を、ベースオブジェクトと強制されたプロパティ名で呼び出します。

なお、このエラーは無条件に発生するので、厳密でないコードでも発生します: 。

```js
// throws TypeError
"foo" in "bar";
```

より正式には、``O`` が基本値、``P`` がプロパティ名の値であるとする。

1. If ``O`` is ``null`` or ``undefined``, throw a ``TypeError``
2. If ``O`` is not an object, throw a ``TypeError``
3. ``P`` = ``ToString(P)``
4. Call ``O.[[HasProperty]](P)``, and return its result

ステップ1は不要です（ステップ2で十分です）。

1. If ``O`` is not an object, throw a ``TypeError``
2. ``P`` = ``ToString(P)``
3. Call ``O.[[HasProperty]](P)``, and return its result

## インライン化 HasProperty

E5 8.12.6 項の ``[[HasProperty]]`` をインライン化しました。

1. If ``O`` is not an object, throw a ``TypeError``
2. ``P`` = ``ToString(P)``
3. Let ``desc`` be the result of calling the ``[[GetProperty]]`` internal method of ``O`` with property name ``P``.
4. If ``desc`` is ``undefined``, then return ``false``.
5. Else return ``true``.
