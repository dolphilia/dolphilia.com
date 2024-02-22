# クラス

Dartは、クラスとミキシンベースの継承を持つオブジェクト指向言語である。すべてのオブジェクトはクラスのインスタンスであり、Nullを除くすべてのクラスはObjectから派生します。ミキシンベースの継承とは、（トップクラスのObject?を除く）すべてのクラスが正確に1つのスーパークラスを持つことを意味しますが、クラス本体は複数のクラス階層で再利用することができます。拡張メソッドは、クラスを変更したりサブクラスを作成したりすることなく、クラスに機能を追加する方法です。クラス修飾子を使用すると、ライブラリがクラスをどのようにサブタイプ化できるかを制御できます。

## クラス・メンバーの使用

オブジェクトは関数とデータ（それぞれメソッドとインスタンス変数）からなるメンバーを持っている。メソッドを呼び出すときは、オブジェクトに対して呼び出すことになる。メソッドは、そのオブジェクトの関数とデータにアクセスできる。

インスタンス変数やメソッドを参照するにはドット(`.`)を使う：

```dart
var p = Point(2, 2);

// Get the value of y.
assert(p.y == 2);

// Invoke distanceTo() on p.
double distance = p.distanceTo(Point(4, 4));
```

左端のオペランドがNULLの場合に例外が発生しないように、`.`の代わりに`?.`を使用する：

```dart
// pがnullでない場合、変数にyの値をセットする。
var a = p?.y;
```

## コンストラクタの使用

コンストラクタを使ってオブジェクトを作成することができます。コンストラクタ名には、ClassName または ClassName.identifier を使用できます。例えば、以下のコードでは、Point() コンストラクタと Point.fromJson() コンストラクタを使用して Point オブジェクトを作成しています：

```dart
var p1 = Point(2, 2);
var p2 = Point.fromJson({'x': 1, 'y': 2});
```

次のコードも同じ効果を持つが、コンストラクター名の前にオプションのnewキーワードを使っている：

```dart
var p1 = new Point(2, 2);
var p2 = new Point.fromJson({'x': 1, 'y': 2});
```

一部のクラスは定数コンストラクタを提供しています。定数コンストラクタを使用してコンパイル時に定数を作成するには、コンストラクタ名の前に const キーワードを付けます：

```dart
var p = const ImmutablePoint(2, 2);
```

2つの同じコンパイル時定数を構築すると、1つの標準的なインスタンスになる：

```dart
var a = const ImmutablePoint(1, 1);
var b = const ImmutablePoint(1, 1);

assert(identical(a, b)); // They are the same instance!
```

定数コンテキスト内では、コンストラクタやリテラルの前のconstを省略することができる。例えば、constマップを作成する次のコードを見てほしい：

```dart
// Lots of const keywords here.
const pointAndLine = const {
  'point': const [const ImmutablePoint(0, 0)],
  'line': const [const ImmutablePoint(1, 10), const ImmutablePoint(-2, 11)],
};
```

constキーワードの最初の使用以外は省略できる：

```dart
// Only one const, which establishes the constant context.
const pointAndLine = {
  'point': [ImmutablePoint(0, 0)],
  'line': [ImmutablePoint(1, 10), ImmutablePoint(-2, 11)],
};
```

定数コンストラクタが定数コンテキストの外にあり、constなしで呼び出された場合、定数でないオブジェクトが生成される：

```dart
var a = const ImmutablePoint(1, 1); // Creates a constant
var b = ImmutablePoint(1, 1); // Does NOT create a constant

assert(!identical(a, b)); // NOT the same instance!
```

## オブジェクトの型の取得

実行時にオブジェクトの型を取得するには、Typeオブジェクトを返すObjectプロパティのruntimeTypeを使用します。

```dart
print('The type of a is ${a.runtimeType}');
```

::: warning Warning
オブジェクトの型をテストするには、runtimeTypeではなく、型テスト演算子を使用する。本番環境では、テスト・オブジェクトがTypeである方が、テスト・オブジェクトがruntimeType==Typeであるよりも安定する。
:::

ここまではクラスの使い方を見てきた。このセクションの残りの部分では、クラスを実装する方法を示します。

## インスタンス変数

インスタンス変数の宣言方法を説明しよう：

```dart
class Point {
  double? x; // Declare instance variable x, initially null.
  double? y; // Declare y, initially null.
  double z = 0; // Declare z, initially 0.
}
```

NULL可能な型で宣言された未初期化のインスタンス変数は、値がNULLになる。NULLでないインスタンス変数は、宣言時に初期化する必要があります。

すべてのインスタンス変数は暗黙のゲッター・メソッドを生成します。初期化子のない非終端インスタンス変数と後期終端インスタンス変数も、暗黙のセッター・メソッドを生成します。詳細については、ゲッターとセッターを参照してください。

```dart
class Point {
  double? x; // Declare instance variable x, initially null.
  double? y; // Declare y, initially null.
}

void main() {
  var point = Point();
  point.x = 4; // Use the setter method for x.
  assert(point.x == 4); // Use the getter method for x.
  assert(point.y == null); // Values default to null.
}
```

lateではないインスタンス変数を宣言された場所で初期化すると、コンストラクタとそのイニシャライザ・リストが実行される前に、インスタンスの生成時に値が設定されます。その結果、lateではないインスタンス変数の初期化式（=の後）はこれにアクセスできない。

```dart
double initialX = 1.5;

class Point {
  // OK, can access declarations that do not depend on `this`:
  double? x = initialX;

  // ERROR, can't access `this` in non-`late` initializer:
  double? y = this.x;

  // OK, can access `this` in `late` initializer:
  late double? z = this.x;

  // OK, `this.fieldName` is a parameter declaration, not an expression:
  Point(this.x, this.y);
}
```

インスタンス変数はfinalにすることもでき、その場合は正確に一度だけ設定しなければならない。 宣言時に最終的な、lateでないインスタンス変数を初期化する, コンストラクタのパラメータ, あるいはコンストラクタのイニシャライザーリストを使う。:

```dart
class ProfileMark {
  final String name;
  final DateTime start = DateTime.now();

  ProfileMark(this.name);
  ProfileMark.unnamed() : name = '';
}
```

コンストラクター本体の開始後にfinalインスタンス変数の値を代入する必要がある場合は、以下のいずれかを使用できる：

- ファクトリーコンストラクタを使用する。
- ただし、イニシャライザーを伴わないlate finalはAPIにセッターを追加することになるので注意が必要です。

## 暗黙のインターフェイス

すべてのクラスは、そのクラスとそのクラスが実装するインターフェースのすべてのインスタンス・メンバーを含むインターフェースを暗黙的に定義します。クラスBの実装を継承せずにクラスBのAPIをサポートするクラスAを作りたい場合、クラスAはクラスBのインターフェースを実装しなければなりません。

クラスは、implements節で1つ以上のインタフェースを宣言し、そのインタフェースが必要とするAPIを提供することで、1つ以上のインタフェースを実装します。例えば

```dart
// A person. The implicit interface contains greet().
class Person {
  // In the interface, but visible only in this library.
  final String _name;

  // Not in the interface, since this is a constructor.
  Person(this._name);

  // In the interface.
  String greet(String who) => 'Hello, $who. I am $_name.';
}

// An implementation of the Person interface.
class Impostor implements Person {
  String get _name => '';

  String greet(String who) => 'Hi $who. Do you know who I am?';
}

String greetBob(Person person) => person.greet('Bob');

void main() {
  print(greetBob(Person('Kathy')));
  print(greetBob(Impostor()));
}
```

あるクラスが複数のインターフェイスを実装していることを指定する例を挙げよう：

```dart
class Point implements Comparable, Location {...}
```

## クラス変数とメソッド

クラス全体の変数やメソッドを実装するには static キーワードを使用します。

## 静的変数

静的変数（クラス変数）は、クラス全体の状態や定数に便利です：

```dart
class Queue {
  static const initialCapacity = 16;
  // ···
}

void main() {
  assert(Queue.initialCapacity == 16);
}
```

静的変数は使われるまで初期化されない。

:: info Note
このページは、定数名にはlowerCamelCaseを使用するというスタイルガイドの推奨に従っている。
:::

## 静的メソッド

スタティック・メソッド（クラス・メソッド）はインスタンスを操作しないので、インスタンスにアクセスすることはできない。しかし、静的変数にはアクセスできます。次の例にあるように、スタティック・メソッドはクラスに対して直接呼び出すことができます：

```dart
import 'dart:math';

class Point {
  double x, y;
  Point(this.x, this.y);

  static double distanceBetween(Point a, Point b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return sqrt(dx * dx + dy * dy);
  }
}

void main() {
  var a = Point(2, 2);
  var b = Point(4, 4);
  var distance = Point.distanceBetween(a, b);
  assert(2.8 < distance && distance < 2.9);
  print(distance);
}
```

::: info Note
一般的な、あるいは広く使われているユーティリティや機能には、静的メソッドの代わりにトップレベル関数を使うことを検討しましょう。
:::

スタティック・メソッドはコンパイル時の定数として使うことができます。例えば、定数コンストラクタのパラメータとして静的メソッドを渡すことができます。