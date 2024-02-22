# ジェネリクス

基本的な配列型であるListのAPIドキュメントを見ると、この型は実際には`List<E>`であることがわかる。`<...>`という表記は、Listがジェネリクス（またはパラメータ化）型、つまり正式な型パラメータを持つ型であることを示しています。慣習上、ほとんどの型変数はE、T、S、K、Vのような1文字の名前を持っています。

## なぜジェネリクスを使うのか？

ジェネリクスは型安全性のために必要とされることが多いが、コードの実行を可能にするだけでなく、それ以上の利点がある：

- ジェネリック型を適切に指定することで、より良いコードが生成される。
- ジェネリックを使えば、コードの重複を減らすことができる。

リストに文字列だけを含めるつもりなら、`List<String>`（"文字列のリスト "と読んでほしい）と宣言すればいい。そうすることで、あなたや仲間のプログラマー、そしてツールは、リストに文字列以外を代入するのはおそらく間違いであることを検出できる。以下はその例だ：

::: danger ✗ static analysis: failuredart
```dart
var names = <String>[];
names.addAll(['Seth', 'Kathy', 'Lars']);
names.add(42); // Error
```
:::

ジェネリクスを使うもうひとつの理由は、コードの重複を減らすことだ。ジェネリックスは、静的解析の利点を生かしながら、多くの型間で単一のインターフェースと実装を共有することができる。例えば、オブジェクトをキャッシュするためのインターフェースを作るとする：

```dart
abstract class ObjectCache {
  Object getByKey(String key);
  void setByKey(String key, Object value);
}
```

このインターフェイスの文字列に特化したバージョンが欲しいことがわかったので、別のインターフェイスを作成する：

```dart
abstract class StringCache {
  String getByKey(String key);
  void setByKey(String key, String value);
}
```

その後、このインターフェイスの番号別バージョンが欲しいと思うようになる...。おわかりだろう。

ジェネリック型を使えば、これらのインターフェースを作る手間が省ける。その代わりに、型パラメーターを受け取るインターフェースを1つ作ることができる：

```dart
abstract class Cache<T> {
  T getByKey(String key);
  void setByKey(String key, T value);
}
```

このコードでは、Tが代用型である。これは、開発者が後で定義する型と考えることができるプレースホルダーだ。

## コレクション・リテラルの使用

リスト、セット、マップ・リテラルをパラメータ化することができます。パラメータ化されたリテラルは、`<type>`（リストとセットの場合）または`<keyType, valueType>`（マップの場合）を開始括弧の前に追加する以外は、すでに見たリテラルと同じです。以下は、型付きリテラルの使用例です：

```dart
var names = <String>['Seth', 'Kathy', 'Lars'];
var uniqueNames = <String>{'Seth', 'Kathy', 'Lars'};
var pages = <String, String>{
  'index.html': 'Homepage',
  'robots.txt': 'Hints for web robots',
  'humans.txt': 'We are people, not machines'
};
```

## コンストラクタでパラメータ化された型を使用する

コンストラクタを使用するときに1つ以上の型を指定するには、クラス名のすぐ後に角括弧`（<...>）`で型を囲みます。例えば

```dart
var nameSet = Set<String>.from(names);
```

次のコードは、View型の整数キーと値を持つマップを作成します：

```dart
var views = Map<int, View>();
```

## 一般的なコレクションとそれが含む型

Dartのジェネリック型は再定義されており、実行時に型情報を持ち運びます。例えば、コレクションの型をテストすることができます：

```dart
var names = <String>[];
names.addAll(['Seth', 'Kathy', 'Lars']);
print(names is List<String>); // true
```

::: info Note
対照的に、Javaのジェネリックスは消去を使う。つまり、ジェネリック型のパラメータは実行時に削除される。Javaでは、オブジェクトがListかどうかをテストすることはできるが、`List<String>`かどうかをテストすることはできない。
:::

## パラメータ化された型の制限

ジェネリック型を実装するとき、引数として指定できる型を制限して、引数が特定の型のサブタイプでなければならないようにしたい場合があります。これを行うにはextendsを使用します。

よくあるユースケースは、（デフォルトのObject?ではなく）Objectのサブタイプにすることで、型がNull不可能であることを保証することである。

```dart
class Foo<T extends Object> {
  // TのためにFooに提供される型は、ヌルであってはならない。
}
```

extendsはObject以外の型でも使うことができる。以下はSomeBaseClassをextendsして、SomeBaseClassのメンバをT型のオブジェクトから呼び出せるようにした例です：

```dart
class Foo<T extends SomeBaseClass> {
  // 実装はここから...
  String toString() => "Instance of 'Foo<$T>'";
}

class Extender extends SomeBaseClass {...}
```

SomeBaseClassやそのサブタイプをジェネリクス引数として使っても構わない：

```dart
var someBaseClassFoo = Foo<SomeBaseClass>();
var extenderFoo = Foo<Extender>();
```

また、一般的な引数を指定しなくても構わない：

```dart
var foo = Foo();
print(foo); // Instance of 'Foo<SomeBaseClass>'
```

SomeBaseClass以外の型を指定するとエラーになります：

::: danger ✗ static analysis: failuredart
```dart
var foo = Foo<Object>();
```
:::

## ジェネリクス・メソッドの使用

メソッドや関数も型引数をとることができる：

```dart
T first<T>(List<T> ts) {
  // 初期作業やエラーチェックを行い、それから...。
  T tmp = ts[0];
  // 追加のチェックや処理を行う
  return tmp;
}
```

ここでは、最初のジェネリック型パラメータ`（<T>）`によって、型引数Tを複数の場所で使用することができる：

- 関数の戻り値の型（`T`）。
- 引数の型（`List<T>`）。
- ローカル変数の型(`T tmp`)。