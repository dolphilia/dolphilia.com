# Dartの紹介

このページでは、Dart言語の主な機能のサンプルを通して、Dart言語を簡単に紹介します。

Dart言語についてさらに詳しく知りたい方は、左サイドメニューの「言語」の下にある詳細な各トピックのページをご覧ください。

Dartのコアライブラリについては、[コアライブラリのドキュメント]()をご覧ください。また、より実践的な入門書として、[Dartチートシートcodelab]()を試すこともできます。

## Hello World

すべてのアプリは、実行を開始するトップレベルの`main()`関数を必要とする。明示的に値を返さない関数の戻り値はvoid型です。コンソールにテキストを表示するには、トップレベルの`print()`関数を使用します：

``` dart
void main() {
  print('Hello, World!');
}
```

コマンドライン引数のオプション・パラメータを含め、詳しくは[main()関数]()をお読みください。

## 変数

[型安全]()な Dart コードであっても、var を使って明示的に型を指定しなくても、ほとんどの変数を宣言することができます。 型推論のおかげで、これらの変数の型は初期値によって決定されます：

``` dart
var name = 'Voyager I';
var year = 1977;
var antennaDiameter = 3.7;
var flybyObjects = ['Jupiter', 'Saturn', 'Uranus', 'Neptune'];
var image = {
  'tags': ['saturn'],
  'url': '//path/to/saturn.jpg'
};
```

デフォルト値、final キーワードと const キーワード、静的型など、Dart の変数についての[詳細をご覧ください]()。

## 制御フロー文

Dartは通常の制御フロー文をサポートしている：

``` dart
if (year >= 2001) {
  print('21st century');
} else if (year >= 1901) {
  print('20th century');
}

for (final object in flybyObjects) {
  print(object);
}

for (int month = 1; month <= 12; month++) {
  print(month);
}

while (year < 2016) {
  year += 1;
}
```

Dartの制御フロー文について、詳しくは[breakとcontinue]()、[switchとcase]()、[assert]()をご覧ください。

## 関数

各関数の引数と戻り値の型を指定することをお勧めします：

``` dart
int fibonacci(int n) {
  if (n == 0 || n == 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

var result = fibonacci(20);
```

省略記法の `=> (arrow)` 構文は、単一のステートメントを含む関数に便利です。この構文は特に無名関数を引数として渡すときに便利です：

``` dart
flybyObjects.where((name) => name.contains('turn')).forEach(print);
```

無名関数（`where()`の引数）を示すだけでなく、このコードは関数を引数として使用できることを示している：トップレベルの`print()`関数は`forEach()`の引数である。

オプションのパラメータ、デフォルトのパラメータ値、レキシカルスコープなど、Dart の関数についての[詳細をご覧ください]()。

## コメント

Dartのコメントは通常`//`で始まる。

```dart
// これは普通の1行コメントだ。

/// これはドキュメント・コメントで、ライブラリやクラス、
/// そのメンバをドキュメント化するために使われます。
/// IDEやdartdocのようなツールはdocコメントを特別に扱います。

/* こんなコメントも支持されている。 */
```

ドキュメンテーションツールの仕組みなど、Dartのコメントについての[詳細をご覧ください]()。

## include

他のライブラリで定義されているAPIにアクセスするには、importを使う。

```dart
// コア・ライブラリのインポート
import 'dart:math';

// 外部パッケージからのライブラリのインポート
import 'package:test/test.dart';

// ファイルのインポート
import 'path/to/my_other_file.dart';
```

ライブラリの接頭辞、表示と非表示、`deferred`キーワードによる遅延ロードなど、Dartにおけるライブラリと可視性についての[詳細をご覧ください]()。

## クラス

3つのプロパティ、2つのコンストラクター、1つのメソッドを持つクラスの例です。プロパティの1つは直接設定できないので、（変数の代わりに）ゲッター・メソッドを使って定義します。このメソッドでは、文字列リテラル内に変数の文字列等価物を表示するために文字列補間を使用しています。

```dart
class Spacecraft {
  String name;
  DateTime? launchDate;

  // 読み取り専用の非最終プロパティ
  int? get launchYear => launchDate?.year;

  // コンストラクタで、メンバに代入するための糖衣構文を持つ。
  Spacecraft(this.name, this.launchDate) {
    // 初期化コードはここに置く。
  }

  // デフォルトのコンストラクタにフォワードする名前付きコンストラクタ。
  Spacecraft.unlaunched(String name) : this(name, null);

  // メソッド
  void describe() {
    print('Spacecraft: $name');
    // 型推進はゲッターでは機能しない。
    var launchDate = this.launchDate;
    if (launchDate != null) {
      int years = DateTime.now().difference(launchDate).inDays ~/ 365;
      print('Launched: $launchYear ($years years ago)');
    } else {
      print('Unlaunched');
    }
  }
}
```

文字列補間、リテラル、式、`toString()` メソッドなど、文字列についての[詳細はこちら]()。

`Spacecraft`クラスはこのように使うことができる：

```dart
var voyager = Spacecraft('Voyager I', DateTime(1977, 9, 5));
voyager.describe();

var voyager3 = Spacecraft.unlaunched('Voyager III');
voyager3.describe();
```

イニシャライザーリスト、オプションの`new`と`const`、コンストラクターのリダイレクト、ファクトリーコンストラクター、ゲッター、セッターなど、Dartのクラスについての[詳細をご覧ください]()。

## 列挙

列挙型とは、あらかじめ定義された値やインスタンスの集合を、その型のインスタンスが他に存在しないように列挙する方法である。

以下は、定義済みの惑星型の単純なリストを定義する単純な列挙型の例である：

```dart
enum PlanetType { terrestrial, gas, ice }
```

以下は、惑星を記述するクラスの拡張列挙型宣言の例である。定数インスタンスの定義されたセット、すなわち太陽系の惑星を持つ。

```dart
/// 太陽系のさまざまな惑星とその特性のいくつかを列挙する列挙型。
enum Planet {
  mercury(planetType: PlanetType.terrestrial, moons: 0, hasRings: false),
  venus(planetType: PlanetType.terrestrial, moons: 0, hasRings: false),
  // ···
  uranus(planetType: PlanetType.ice, moons: 27, hasRings: true),
  neptune(planetType: PlanetType.ice, moons: 14, hasRings: true);

  /// 定数生成コンストラクタ
  const Planet(
      {required this.planetType, required this.moons, required this.hasRings});

  /// インスタンス変数はすべてfinal
  final PlanetType planetType;
  final int moons;
  final bool hasRings;

  /// 拡張された列挙型は、ゲッターとその他のメソッドをサポートします。
  bool get isGiant =>
      planetType == PlanetType.gas || planetType == PlanetType.ice;
}
```

`Planet`列挙型はこのように使うことができる：

```dart
final yourPlanet = Planet.earth;

if (!yourPlanet.isGiant) {
  print('Your planet is not a "giant planet".');
}
```

拡張された列挙型の要件、自動的に導入されるプロパティ、列挙型値名へのアクセス、switch文のサポートなど、Dartにおける列挙型について[詳しくお読みください]()。

## 継承

Dartは単一継承です。

```dart
class Orbiter extends Spacecraft {
  double altitude;

  Orbiter(super.name, DateTime super.launchDate, this.altitude);
}
```

クラスの拡張や、オプションの`@override`アノテーションなどについては、[こちらをお読みください]()。

## ミックスイン

ミックスインは、複数のクラス階層でコードを再利用する方法である。以下はミキシンの宣言である：

```dart
mixin Piloted {
  int astronauts = 1;

  void describeCrew() {
    print('Number of astronauts: $astronauts');
  }
}
```

ミックスインの機能をクラスに追加するには、そのクラスをミキシンで拡張すればいい。

```dart
class PilotedCraft extends Spacecraft with Piloted {
  // ···
}
```

`PilotedCraft``にdescribeCrew()`メソッドと同様に`astronauts`フィールドが追加されました。

mixin について[もっと読む]()。

## インターフェイスと抽象クラス

すべてのクラスは暗黙のうちにインターフェースを定義している。したがって、どんなクラスでも実装することができます。

```dart
class MockSpaceship implements Spacecraft {
  // ···
}
```

詳しくは[暗黙的インターフェイス]()、または[明示的インターフェイスキーワード]()をお読みください。

抽象クラスを作成し、具象クラスで拡張（または実装）することができます。抽象クラスには、抽象メソッド（ボディは空）を含めることができます。

```dart
abstract class Describable {
  void describe();

  void describeWithEmphasis() {
    print('=========');
    describe();
    print('=========');
  }
}
```

Describable を継承するクラスは describeWithEmphasis() メソッドを持ち、エクステンダの describe() の実装を呼び出します。

抽象クラスとメソッドについて[もっと読む]()。

## 非同期

`async`と`await`を使うことで、コールバック地獄を避け、コードをより読みやすくすることができる。

```dart
const oneSecond = Duration(seconds: 1);
// ···
Future<void> printWithDelay(String message) async {
  await Future.delayed(oneSecond);
  print(message);
}
```

上記の方法は以下と等価である：

```dart
Future<void> printWithDelay(String message) {
  return Future.delayed(oneSecond).then((_) {
    print(message);
  });
}
```

次の例が示すように、`async`と`await`は非同期コードを読みやすくするのに役立つ。

```dart
Future<void> createDescriptions(Iterable<String> objects) async {
  for (final object in objects) {
    try {
      var file = File('$object.txt');
      if (await file.exists()) {
        var modified = await file.lastModified();
        print(
            'File for $object already exists. It was modified on $modified.');
        continue;
      }
      await file.create();
      await file.writeAsString('Start describing $object in this file.');
    } on IOException catch (e) {
      print('Cannot create description for $object: $e');
    }
  }
}
```

`async*`を使うこともでき、ストリームを構築するための読みやすい方法が得られる。

```dart
Stream<String> report(Spacecraft craft, Iterable<String> objects) async* {
  for (final object in objects) {
    await Future.delayed(oneSecond);
    yield '${craft.name} flies by $object';
  }
}
```

`async`関数、`Future`、`Stream`、非同期ループ（`await for`）など、非同期のサポートについては[こちらをご覧ください]()。

## 例外

例外を発生させるには `throw` を使う：

```dart
if (astronauts == 0) {
  throw StateError('No astronauts.');
}
```

例外をキャッチするには、`try`文に`on`か`catch`（あるいは両方）を付ける：

```dart
Future<void> describeFlybyObjects(List<String> flybyObjects) async {
  try {
    for (final object in flybyObjects) {
      var description = await File('$object.txt').readAsString();
      print(description);
    }
  } on IOException catch (e) {
    print('Could not describe object: $e');
  } finally {
    flybyObjects.clear();
  }
}
```

上記のコードは非同期であることに注意。`try`は同期コードでも`async`関数内のコードでも機能する。

スタック・トレース、`rethrow`、`Error`と`Exception`の違いなど、例外についての[詳細はこちら]()。

## 重要な概念

Dart言語について学習を続ける際には、以下の事実と概念に留意してください：

- 変数に入れられるものはすべてオブジェクトであり、すべてのオブジェクトはクラスのインスタンスである。数値や関数、`null`もオブジェクトです。`null`（[sound null safety]()を有効にした場合）を除いて、すべてのオブジェクトは[Object]()クラスを継承します。

::: info バージョンノート
[Null safety]()はDart 2.12で導入された。Null safetyを使用するには、少なくとも 2.12 の言語バージョンが必要です。
:::

- Dartは強く型付けされているが、Dartは型を推論できるため、型アノテーションはオプションである。`var number = 101`では、`number`は`int`型であると推測されます。
- Null safetyを有効にすると、変数に`null`を含めることはできなくなる。変数の型の最後にクエスチョンマーク（`?`）例えば、`int?`型の変数は整数かもしれないし、`null`かもしれない。ある式が`null`と評価されることはないとわかっているが、Dartがそれに同意しない場合は、`!`を追加して`null`でないことを保証することができます（`null`の場合は例外をスローします）。例： `int x = nullableButNotNullInt！`
- どんな型でも許されることを明示したい場合は、`Object?`(Null safetyを有効にしている場合)、`Object`、または実行時まで型チェックを延期する必要がある場合は、[特殊なdynamic型]()を使用します。
- Dartは、`List<int>`（整数のリスト）や`List<Object>`（任意の型のオブジェクトのリスト）のようなジェネリック型をサポートしている。
- Dartは、トップレベルの関数（`main()`など）や、クラスやオブジェクトに結びついた関数（それぞれスタティックメソッドやインスタンスメソッド）をサポートしています。また、関数の中に関数を作成することもできます（ネストされた関数やローカル関数）。
- 同様に、Dartはトップレベルの変数だけでなく、クラスやオブジェクトに結びついた変数（静的変数とインスタンス変数）もサポートしています。インスタンス変数は、フィールドやプロパティと呼ばれることもあります。
- Javaとは異なり、Dartには`public`、`protected`、`private`というキーワードがない。識別子がアンダースコア（`_`）で始まる場合、そのライブラリはプライベートです。詳細については、[ライブラリとインポート]()を参照してください。
- 識別子は、文字またはアンダースコア（`_`）で始まり、それらの文字と数字の組み合わせで始まる。
- Dartには式（実行時の値を持つ）と文（実行時の値を持たない）がある。例えば、[条件式]()`condition ? expr1 : expr2`は、`expr1`または`expr2`の値を持つ。[if-else文]()は値を持ちません。ステートメントには1つ以上の式が含まれることがよくありますが、式に直接ステートメントを含めることはできません。
- Dartツールは、警告とエラーという2種類の問題を報告することができます。警告は、コードが動作しない可能性を示すもので、プログラムの実行を妨げるものではありません。エラーには、コンパイル時と実行時があります。コンパイル時のエラーはコードの実行を妨げ、実行時のエラーはコードの実行中に[例外]()が発生します。

## その他のリソース

[コアライブラリのドキュメント]()と [Dart API リファレンス]()に、より多くのドキュメントとコードサンプルがあります。このサイトのコードは、[Dartスタイルガイド]()の規約に従っています。