# メソッド

メソッドはオブジェクトに動作を提供する関数である。

## インスタンス・メソッド

オブジェクトのインスタンス・メソッドは、インスタンス変数やthisにアクセスできます。以下のサンプルのdistanceTo()メソッドはインスタンス・メソッドの一例です：

```dart
import 'dart:math';

class Point {
  final double x;
  final double y;

  Point(this.x, this.y);

  double distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return sqrt(dx * dx + dy * dy);
  }
}
```

## オペレーター

演算子は特別な名前を持つインスタンスメソッドです。Dartでは、以下のような名前の演算子を定義できます：

`< | + | | | >>> > | / | ^ | [] <= | ~/ | & | []= >= | * | << | ~ - | % | >> | ==`

::: info Note
`!=`のような演算子が名前のリストにないことにお気づきだろうか。それは単なる構文上の糖分だからだ。例えば、`e1 != e2`という式は、`!(e1==e2)`の構文上の糖分である。
:::

演算子宣言は、組み込み識別子演算子を使用して識別されます。以下の例では、ベクトルの加算(`+`)、減算(`-`)、等号(`==`)を定義しています：

```dart
class Vector {
  final int x, y;

  Vector(this.x, this.y);

  Vector operator +(Vector v) => Vector(x + v.x, y + v.y);
  Vector operator -(Vector v) => Vector(x - v.x, y - v.y);

  @override
  bool operator ==(Object other) =>
      other is Vector && x == other.x && y == other.y;

  @override
  int get hashCode => Object.hash(x, y);
}

void main() {
  final v = Vector(2, 3);
  final w = Vector(2, 2);

  assert(v + w == Vector(4, 5));
  assert(v - w == Vector(0, 1));
}
```

## ゲッターとセッター

ゲッターとセッターは、オブジェクトのプロパティに読み書きできる特別なメソッドです。各インスタンス変数には暗黙のゲッターと、必要に応じてセッターがあることを思い出してください。ゲッターとセッターを実装することで、getキーワードとsetキーワードを使って追加のプロパティを作成することができます：

```dart
class Rectangle {
  double left, top, width, height;

  Rectangle(this.left, this.top, this.width, this.height);

  // Define two calculated properties: right and bottom.
  double get right => left + width;
  set right(double value) => left = value - width;
  double get bottom => top + height;
  set bottom(double value) => top = value - height;
}

void main() {
  var rect = Rectangle(3, 4, 20, 15);
  assert(rect.left == 3);
  rect.right = 12;
  assert(rect.left == -8);
}
```

ゲッターとセッターを使えば、クライアント・コードを変更することなく、インスタンス変数から始めてメソッドでラップすることができる。

::: info Note
インクリメント(`++`)のような演算子は、ゲッターが明示的に定義されているか否かにかかわらず、期待される方法で動作する。予期せぬ副作用を避けるため、演算子はゲッターを一度だけ呼び出し、その値を一時変数に保存する。
:::

## abstract メソッド

インスタンス・メソッド、ゲッター・メソッド、セッター・メソッドは抽象化することができ、インターフェースを定義しますが、その実装は他のクラスに委ねられます。抽象メソッドは抽象クラスかミキシンの中にしか存在できません。

メソッドを抽象化するには、メソッド本体の代わりにセミコロン（;）を使用します：

```dart
abstract class Doer {
  // Define instance variables and methods...

  void doSomething(); // Define an abstract method.
}

class EffectiveDoer extends Doer {
  void doSomething() {
    // Provide an implementation, so the method is not abstract here...
  }
}
```