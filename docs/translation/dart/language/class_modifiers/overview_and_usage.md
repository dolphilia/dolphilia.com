# クラス修飾語

::: info Version note
abstract以外のクラス修飾子は、少なくとも3.0以上の言語バージョンを必要とする。
:::

クラス修飾子は、そのクラスやミキシンが定義されているライブラリの内部からも外部からも、どのように使用できるかを制御します。

修飾子のキーワードは、クラスやミキシンの宣言の前に置きます。例えば、abstract classと書くと抽象クラスが定義されます。クラス宣言の前に指定できる修飾子には、次のようなものがあります：

- abstract
- base
- final
- interface
- sealed
- mixin

mixin宣言の前に指定できるのはbase修飾子だけです。この修飾子は、enum、typedef、extension、extension type などの他の宣言には適用されません。

クラス修飾子を使用するかどうかを決定する際には、クラスの使用目的や、クラスが依存する必要がある振る舞いを考慮してください。

::: info Note
ライブラリを管理している場合は、APIメンテナのためのクラス修飾子のページを読んで、ライブラリのためにこれらの変更をナビゲートする方法を参照してください。
:::

## 修飾語なし

どのようなライブラリからでも自由に構築やサブタイプを許可するには、修飾子なしのクラス宣言やmixin宣言を使用します。デフォルトでは

- クラスの新しいインスタンスを作成する。
- クラスを拡張して新しいサブタイプを作成する。
- クラスまたはミキシンのインタフェースを実装する。
- mixin または mixin クラスを混ぜる。

## abstract

インターフェイス全体の完全な具体的実装を必要としないクラスを定義するには、abstract修飾子を使う。

抽象クラスは、独自のライブラリであろうと外部のライブラリであろうと、どのライブラリからも構築することはできません。抽象クラスは多くの場合、抽象メソッドを持っています。

```dart
// a.dart
abstract class Vehicle {
  void moveForward(int meters);
}
```

```dart
//b.dart
import 'a.dart';

// Error: Can't be constructed.
Vehicle myVehicle = Vehicle();

// Can be extended.
class Car extends Vehicle {
  int passengers = 4;
  // ···
}

// Can be implemented.
class MockVehicle implements Vehicle {
  @override
  void moveForward(int meters) {
    // ...
  }
}
```

抽象クラスをインスタンス化できるように見せたい場合は、ファクトリー・コンストラクタを定義する。

## base

クラスやミキシンの実装を継承させるには、base修飾子を使います。基底クラスは、それ自身のライブラリ以外での実装を禁止します。これにより、以下のことが保証されます：

- 基底クラスのコンストラクタは、そのクラスのサブタイプのインスタンスが生成されるたびに呼び出されます。
- 実装されたプライベート・メンバはすべてサブタイプに存在する。
- すべてのサブタイプは新しいメンバを継承するので、基底クラスに新しい実装メンバが追加されても、サブタイプが壊れることはありません。
  - これは、サブタイプがすでに同じ名前で互換性のないシグニチャを持つメンバを宣言している場合を除きます。
  
基底クラスを実装または拡張するクラスには、base、final、sealed のいずれかのマークを付けなければなりません。これは、外部のライブラリが基底クラスの保証を破るのを防ぐためです。


```dart
// a.dart
base class Vehicle {
  void moveForward(int meters) {
    // ...
  }
}
```


```dart
// b.dart
import 'a.dart';

// Can be constructed.
Vehicle myVehicle = Vehicle();

// Can be extended.
base class Car extends Vehicle {
  int passengers = 4;
  // ...
}

// ERROR: Can't be implemented.
base class MockVehicle implements Vehicle {
  @override
  void moveForward() {
    // ...
  }
}
```

## interface

インターフェースを定義するには、interface修飾子を使う。インターフェイスを定義しているライブラリ以外のライブラリは、そのインターフェイスを実装することはできるが、拡張することはできない。これにより、以下のことが保証される：

- クラスのインスタンス・メソッドの1つがこれに関する別のインスタンス・メソッドを呼び出すとき、常に同じライブラリのメソッドの既知の実装が呼び出されます。
- 他のライブラリは、インターフェイスクラスのメソッドが後で予期しない方法で呼び出す可能性のあるメソッドをオーバーライドすることはできません。これにより、もろい基底クラスの問題が軽減されます。

```dart
// a.dart
interface class Vehicle {
  void moveForward(int meters) {
    // ...
  }
}
```


```dart
// b.dart
import 'a.dart';

// Can be constructed.
Vehicle myVehicle = Vehicle();

// ERROR: Can't be inherited.
class Car extends Vehicle {
  int passengers = 4;
  // ...
}

// Can be implemented.
class MockVehicle implements Vehicle {
  @override
  void moveForward(int meters) {
    // ...
  }
}
```

## abstract interface

interface修飾子の最も一般的な使い方は、純粋なインターフェースを定義することである。interface 修飾子と abstract 修飾子を組み合わせると、 abstract インターフェース・クラスになります。

interfaceクラスのように、他のライブラリーは純粋なinterfaceを実装することはできますが、継承することはできません。抽象クラスと同様に、純粋インターフェースも抽象メンバを持つことができます。

## final

型階層を閉じるには、final修飾子を使う。これにより、現在のライブラリの外部にあるクラスからのサブタイピングを防ぐことができます。継承と実装の両方を禁止することで、サブタイピングを完全に防ぐことができます。これは保証される：

- 安全にAPIにインクリメンタルな変更を加えることができる。
- サードパーティのサブクラスで上書きされていないことを知った上で、インスタンス・メソッドを呼び出すことができる。

finalクラスは、同じライブラリ内で拡張したり実装したりできる。final修飾子はbaseの効果を包含するため、どのサブクラスもbase、final、またはsealedとマークされなければなりません。


```dart
// a.dart
final class Vehicle {
  void moveForward(int meters) {
    // ...
  }
}
```


```dart
// b.dart
import 'a.dart';

// Can be constructed.
Vehicle myVehicle = Vehicle();

// ERROR: Can't be inherited.
class Car extends Vehicle {
  int passengers = 4;
  // ...
}

class MockVehicle implements Vehicle {
  // ERROR: Can't be implemented.
  @override
  void moveForward(int meters) {
    // ...
  }
}
```

## sealed

既知の、列挙可能なサブタイプのセットを作るには、sealed修飾子を使う。これにより、静的に網羅的であることが保証されたサブタイプのスイッチを作成することができます。

sealed修飾子は、クラスが自身のライブラリの外で拡張されたり実装されたりするのを防ぎます。sealedされたクラスは暗黙的に抽象化されます。

- そのクラス自身を構築することはできません。
- ファクトリーコンストラクタを持つことはできます。
- サブクラスが使用するコンストラクタを定義することができます。

しかし、シールされたクラスのサブクラスは暗黙の抽象ではありません。

コンパイラは、同じライブラリ内にしか存在しない直接のサブタイプが存在する可能性を認識します。このため、スイッチがそのケースで考えられるすべてのサブタイプを網羅的に処理していない場合、コンパイラーは警告を出すことができます：

```dart
sealed class Vehicle {}

class Car extends Vehicle {}

class Truck implements Vehicle {}

class Bicycle extends Vehicle {}

// ERROR: Can't be instantiated.
Vehicle myVehicle = Vehicle();

// Subclasses can be instantiated.
Vehicle myCar = Car();

String getVehicleSound(Vehicle vehicle) {
  // ERROR: The switch is missing the Bicycle subtype or a default case.
  return switch (vehicle) {
    Car() => 'vroom',
    Truck() => 'VROOOOMM',
  };
}
```

徹底的な切り替えを望まない場合や、APIを壊すことなくサブタイプを後から追加したい場合は、final修飾子を使う。より詳細な比較は、sealedとfinalを参照してください。

## 修飾語を組み合わせる

いくつかの修飾子を組み合わせることで、重層的な制限をかけることができます。クラス宣言は順に

1. (オプション) abstract。クラスが抽象メンバを含むことができるかどうかを記述し、インスタンス化を防ぎます。
2. (オプション) base、interface、final、sealed のいずれか。クラスをサブタイプ化する他のライブラリに対する制限を記述します。
3. (オプション) mixin。この宣言が混合可能かどうかを表します。
4. class キーワードそのもの。

いくつかの修飾子は、矛盾していたり、冗長であったり、互いに排他的であったりするため、組み合わせることはできません：

- sealedとabstract。sealed クラスは暗黙的に抽象です。
- interface, final または sealed に mixin を付けたものです。これらのアクセス修飾子は混在を防ぎます。

クラス修飾子がどのように組み合わせられるかについての詳しいガイダンスについては、 クラス修飾子リファレンスを参照してください。