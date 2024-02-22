# 列挙型

列挙型は、しばしば列挙型または列挙型と呼ばれ、固定数の定数値を表すために使われる特別な種類のクラスである。

::: info Note
すべての列挙型は自動的にEnumクラスを継承します。また、Enum は封印されており、サブクラス化したり、実装したり、混ぜたり、明示的にインスタンス化したりすることはできません。

抽象クラスやミキシンはEnumを明示的に実装したり拡張したりすることができますが、Enum宣言によって実装されたりミックスされたりしない限り、オブジェクトが実際にそのクラスやミキシンの型を実装することはできません。
:::

## 単純な列挙型の宣言

単純な列挙型を宣言するには、enumキーワードを使用し、列挙したい値を列挙します：

```dart
enum Color { red, green, blue }
```

::: tip Tip
また、列挙型を宣言するときに末尾にカンマを使用すると、コピー・ペースト・エラーを防ぐことができる。
:::

## 拡張列挙型の宣言

Dartでは、既知の定数インスタンスの数に制限されたフィールド、メソッド、コンストラクタを持つクラスを宣言するためのenum宣言も可能です。

拡張列挙型を宣言するには、通常のクラスと同様の構文に従いますが、いくつかの追加要件があります：

- インスタンス変数は、mixin によって追加されたものも含めて、final でなければならない。
- すべての生成コンストラクタは定数でなければならない。
- ファクトリーのコンストラクターは、固定された既知のEnumインスタンスの1つだけを返すことができる。
- Enumは自動的に拡張されるため、他のクラスを拡張することはできない。
- index、hashCode、等号演算子 `==` をオーバーライドすることはできません。
- valuesという名前のメンバをenumで宣言することはできません。自動生成される静的値ゲッターと衝突してしまうからです。
- 列挙型のインスタンスはすべて宣言の冒頭で宣言する必要があり、少なくとも1つのインスタンスが宣言されていなければなりません。

拡張列挙型のインスタンスメソッドは、これを使用して現在の列挙型の値を参照できる。

以下は、複数のインスタンス、インスタンス変数、ゲッター、実装されたインターフェイスを持つ拡張列挙型を宣言する例です：

```dart
enum Vehicle implements Comparable<Vehicle> {
  car(tires: 4, passengers: 5, carbonPerKilometer: 400),
  bus(tires: 6, passengers: 50, carbonPerKilometer: 800),
  bicycle(tires: 2, passengers: 1, carbonPerKilometer: 0);

  const Vehicle({
    required this.tires,
    required this.passengers,
    required this.carbonPerKilometer,
  });

  final int tires;
  final int passengers;
  final int carbonPerKilometer;

  int get carbonFootprint => (carbonPerKilometer / passengers).round();

  bool get isTwoWheeled => this == Vehicle.bicycle;

  @override
  int compareTo(Vehicle other) => carbonFootprint - other.carbonFootprint;
}
```

::: info Version note
拡張された列挙型には、少なくとも2.17の言語バージョンが必要です。
:::

## 列挙型の使用

他の静的変数と同じように、列挙型の値にアクセスします：

```dart
final favoriteColor = Color.blue;
if (favoriteColor == Color.blue) {
  print('Your favorite color is blue!');
}
```

enumの各値にはインデックスゲッターがあり、enum宣言における値のゼロベースの位置を返す。例えば、最初の値はインデックス0、2番目の値はインデックス1です。

```dart
assert(Color.red.index == 0);
assert(Color.green.index == 1);
assert(Color.blue.index == 2);
```

列挙されたすべての値のリストを取得するには、列挙型のvalues定数を使用する。

```dart
List<Color> colors = Color.values;
assert(colors[2] == Color.blue);
```

switch文の中でenumを使うことができ、enumの値をすべて処理しないと警告が出る：

```dart
var aColor = Color.blue;

switch (aColor) {
  case Color.red:
    print('Red as roses!');
  case Color.green:
    print('Green as grass!');
  default: // Without this, you see a WARNING.
    print(aColor); // 'Color.blue'
}
```

Color.blueから'blue'のような列挙値の名前にアクセスする必要がある場合は、.nameプロパティを使用します：

```dart
print(Color.blue.name); // 'blue'
```

通常のオブジェクトと同じように、列挙値のメンバーにアクセスできる：

```dart
print(Vehicle.car.carbonFootprint);
```