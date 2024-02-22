# コンストラクター

コンストラクタを宣言するには、クラスと同じ名前の関数を作成します（オプションで、名前付きコンストラクタで説明する識別子を追加します）。

最も一般的なコンストラクタである生成コンストラクタを使用して、クラスの新しいインスタンスを作成し、必要に応じてインスタンス変数をインスタンス化するための形式パラメータを初期化する：

```dart
class Point {
  double x = 0;
  double y = 0;

  // Generative constructor with initializing formal parameters:
  Point(this.x, this.y);
}
```

このキーワードは現在のインスタンスを指す。

::: info Note
これは名前の衝突がある場合にのみ使用する。そうでない場合、Dartスタイルはthisを省略する。
:::

## 形式パラメータの初期化

Dart には、コンストラクタの引数をインスタンス変数に代入する一般的なパターンを簡略化するために、形式パラメータを初期化する機能があります。コンストラクタの宣言ではthis.propertyNameを直接使用し、ボディは省略します。

また、パラメータを初期化することで、NULL 値を持たないインスタンス変数や FINAL インスタンス変数を初期化できます：

```dart
class Point {
  final double x;
  final double y;

  Point(this.x, this.y);
  // Sets the x and y instance variables
  // before the constructor body runs.
}
```

初期化フォーマルによって導入された変数は、暗黙のうちにfinalとなり、イニシャライザー・リストのスコープ内にのみ存在する。

イニシャライザー・リストでは表現できないロジックを実行する必要がある場合は、そのロジックを持つファクトリー・コンストラクター（またはスタティック・メソッド）を作成し、計算された値を通常のコンストラクターに渡します。

## デフォルトのコンストラクター

コンストラクタを宣言しない場合は、デフォルトのコンストラクタが用意されています。デフォルトコンストラクタは引数を持たず、スーパークラスの引数なしコンストラクタを呼び出します。

## コンストラクタは継承されない

サブクラスはスーパークラスからコンストラクタを継承しません。コンストラクタを宣言していないサブクラスには、デフォルト（引数なし、名前なし）のコンストラクタしかありません。

## 名前付きコンストラクタ

クラスに対して複数のコンストラクタを実装する場合や、より明確にする場合は、名前付きコンストラクタを使用します：

```dart
const double xOrigin = 0;
const double yOrigin = 0;

class Point {
  final double x;
  final double y;

  Point(this.x, this.y);

  // 名前付きコンストラクタ
  Point.origin()
      : x = xOrigin,
        y = yOrigin;
}
```

つまり、スーパークラスの名前付きコンストラクタはサブクラスに継承されません。スーパークラスで定義された名前付きコンストラクタを使ってサブクラスを作成したい場合は、サブクラスでそのコンストラクタを実装する必要があります。

## デフォルトでないスーパークラスのコンストラクタを呼び出す

デフォルトでは、サブクラスのコンストラクタはスーパークラスの無名の引数なしコンストラクタを呼び出します。スーパークラスのコンストラクタはコンストラクタ本体の先頭で呼び出されます。イニシャライザー・リストも使用されている場合は、スーパークラスが呼び出される前に実行されます。まとめると、実行順序は以下のようになります：

1. イニシャライザーリスト
2. スーパークラスの引数なしコンストラクタ
3. メインクラスの引数なしコンストラクタ

スーパークラスに無名の引数なしコンストラクタがない場合は、スーパークラスのコンストラクタを手動で呼び出す必要があります。スーパークラスのコンストラクタは、コロン (:) の後、コンストラクタ本体 (もしあれば) の直前に指定します。

以下の例では、Employee クラスのコンストラクタは、そのスーパークラス Person の名前付きコンストラクタを呼び出します。

```dart
class Person {
  String? firstName;

  Person.fromJson(Map data) {
    print('in Person');
  }
}

class Employee extends Person {
  // Person does not have a default constructor;
  // you must call super.fromJson().
  Employee.fromJson(super.data) : super.fromJson() {
    print('in Employee');
  }
}

void main() {
  var employee = Employee.fromJson({});
  print(employee);
  // Prints:
  // in Person
  // in Employee
  // Instance of 'Employee'
}
```

スーパークラスのコンストラクタの引数は、コンストラクタを呼び出す前に評価されるため、引数は関数呼び出しのような式になります：

```dart
class Employee extends Person {
  Employee() : super.fromJson(fetchDefaultData());
  // ···
}
```

::: warning Warning
スーパークラスのコンストラクタの引数には、このアクセス権がない。例えば、引数はスタティック・メソッドを呼び出すことはできますが、インスタンス・メソッドを呼び出すことはできません。
:::

## スーパーパラメーター

コンストラクタのスーパー呼び出しに各パラメータを手動で渡す手間を省くために、 スーパーイニシャライザパラメータを使用すると、 指定したスーパークラスのコンストラクタやデフォルトのスーパークラスのコンストラクタに パラメータを転送することができます。この機能は、リダイレクトコンストラクタでは使用できません。スーパーイニシャライザーパラメーターは、正式なパラメーターを初期化するのと似た構文とセマンティクスを持っています：

```dart
class Vector2d {
  final double x;
  final double y;

  Vector2d(this.x, this.y);
}

class Vector3d extends Vector2d {
  final double z;

  // Forward the x and y parameters to the default super constructor like:
  // Vector3d(final double x, final double y, this.z) : super(x, y);
  Vector3d(super.x, super.y, this.z);
}
```

スーパー・コンストラクタの呼び出しにすでに位置の引数がある場合、スーパー・イニシャライザの引数を位置の引数にすることはできません：

```dart
class Vector2d {
  // ...

  Vector2d.named({required this.x, required this.y});
}

class Vector3d extends Vector2d {
  // ...

  // Forward the y parameter to the named super constructor like:
  // Vector3d.yzPlane({required double y, required this.z})
  //       : super.named(x: 0, y: y);
  Vector3d.yzPlane({required super.y, required this.z}) : super.named(x: 0);
}
```

::: info Version note
スーパーイニシャライザー・パラメーターを使用するには、少なくとも2.17の言語バージョンが必要です。それ以前の言語バージョンを使用している場合は、すべてのスーパー・コンストラクタ・パラメータを手動で渡す必要があります。
:::

## イニシャライザーリスト

スーパークラスのコンストラクタを呼び出す以外にも、コンストラクタ本体が実行される前にインスタンス変数を初期化することができます。初期化子はカンマで区切ります。

```dart
// Initializer list sets instance variables before
// the constructor body runs.
Point.fromJson(Map<String, double> json)
    : x = json['x']!,
      y = json['y']! {
  print('In Point.fromJson(): ($x, $y)');
}
```

::: warning Warning
イニシャライザーの右辺はこれにアクセスできない。
:::

開発中は、イニシャライザー・リストのassertを使うことで、入力を検証することができる。

```dart
Point.withAssert(this.x, this.y) : assert(x >= 0) {
  print('In Point.withAssert(): ($x, $y)');
}
```

イニシャライザー・リストは最終フィールドを設定するときに便利です。以下の例では、イニシャライザー・リストで3つの最終フィールドを初期化します。

```dart
import 'dart:math';

class Point {
  final double x;
  final double y;
  final double distanceFromOrigin;

  Point(double x, double y)
      : x = x,
        y = y,
        distanceFromOrigin = sqrt(x * x + y * y);
}

void main() {
  var p = Point(2, 3);
  print(p.distanceFromOrigin);
}
```


## コンストラクタのリダイレクト

コンストラクタの唯一の目的が、同じクラスの別のコンストラクタにリダイレクトすることであることもあります。リダイレクトするコンストラクタのボディは空で、コロン (:) の後にコンストラクタの呼び出し (クラス名の代わりにこれを使用します) が表示されます。

```dart
class Point {
  double x, y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(double x) : this(x, 0);
}
```

## 定数コンストラクタ

クラスが決して変化しないオブジェクトを生成する場合、これらのオブジェクトをコンパイル時に定数にすることができます。これを行うには、コンストラクタを定義し、すべてのインスタンス変数が final であることを確認します。

```dart
class ImmutablePoint {
  static const ImmutablePoint origin = ImmutablePoint(0, 0);

  final double x, y;

  const ImmutablePoint(this.x, this.y);
}
```

定数コンストラクタは常に定数を生成するわけではありません。詳細はコンストラクタの使用法のセクションを参照してください。

## ファクトリーコンストラクタ

常にそのクラスの新しいインスタンスを作成するわけではないコンストラクタを実装する場合は、 ファクトリ・キーワードを使用します。たとえば、ファクトリーコンストラクタはキャッシュからインスタンスを返したり、サブタイプのインスタンスを返したりします。ファクトリーコンストラクタのもう一つの使用例は、イニシャライザーリストでは処理できないロジックを使用して最終変数を初期化することです。

::: tip Tip
final変数の遅い初期化を処理するもうひとつの方法は、late finalを使うことだ（注意深く！）。
:::

次の例では、Loggerファクトリーコンストラクターはキャッシュからオブジェクトを返し、Logger.fromJsonファクトリーコンストラクターはJSONオブジェクトから最終変数を初期化します。

```dart
class Logger {
  final String name;
  bool mute = false;

  // _cache is library-private, thanks to
  // the _ in front of its name.
  static final Map<String, Logger> _cache = <String, Logger>{};

  factory Logger(String name) {
    return _cache.putIfAbsent(name, () => Logger._internal(name));
  }

  factory Logger.fromJson(Map<String, Object> json) {
    return Logger(json['name'].toString());
  }

  Logger._internal(this.name);

  void log(String msg) {
    if (!mute) print(msg);
  }
}
```

::: info Note
ファクトリーのコンストラクターはこれにアクセスできない。
:::

他のコンストラクタと同じように、ファクトリーコンストラクタを呼び出します：

```dart
var logger = Logger('UI');
logger.log('Button clicked');

var logMap = {'name': 'UI'};
var loggerJson = Logger.fromJson(logMap);
```