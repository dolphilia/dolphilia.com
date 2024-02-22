# Dartの型システム

Dart言語は型安全です。静的な型チェックと実行時のチェックを組み合わせて、変数の値が常にその変数の静的な型と一致するようにします。型は必須ですが、型推論のため型注釈は省略可能です。

静的型チェックの利点の1つは、Dartの静的アナライザを使ってコンパイル時にバグを発見できることだ。

ジェネリクス・クラスに型アノテーションを追加することで、ほとんどの静的解析エラーを修正することができます。最も一般的なジェネリクス・クラスは、コレクション型の`List<T>`と`Map<K,V>`です。

例えば、以下のコードでは`printInts()`関数が整数リストを表示し、`main()`がリストを作成して`printInts()`に渡しています。

::: danger ✗ static analysis: failuredart
```dart
void printInts(List<int> a) => print(a);

void main() {
  final list = [];
  list.add(1);
  list.add('2');
  printInts(list);
}
```
:::

先のコードでは、printInts(list)の呼び出しでlist（上で強調表示）の型エラーが発生する：

```txt
error - The argument type 'List<dynamic>' can't be assigned to the parameter type 'List<int>'. - argument_type_not_assignable
```

このエラーは、`List<dynamic>`から`List<int>`への不健全な暗黙のキャストを強調しています。`list`変数は静的な`List<dynamic>`型を持っています。これは、初期化宣言 `var list = []` が、`dynamic` よりも具体的な型引数を推測するのに十分な情報を解析器に提供していないためです。`printInts()`関数は、`List<int>`型のパラメータを予期しているため、型の不一致が発生します。

リストの作成時に型アノテーション（`<int>`）を追加すると（以下でハイライト）、文字列引数をintパラメータに代入できないとアナライザーが文句を言う。`list.add('2')`の引用符を削除すると、静的解析をパスし、エラーや警告なしで実行されるコードになります。

```dart
// ✔ static analysis: successdart
void printInts(List<int> a) => print(a);

void main() {
  final list = <int>[];
  list.add(1);
  list.add(2);
  printInts(list);
}
```

## 健全性とは何か？

健全性とは、プログラムが特定の無効な状態に陥らないことを保証することである。健全な型システムとは、ある式が評価されたときに、その式の静的型と一致しない値が返されるような状態にならないことを意味します。例えば、式の静的型がStringの場合、実行時に式を評価すると文字列しか得られないことが保証されます。

Dartの型システムは、JavaやC#の型システムと同様、健全です。静的チェック（コンパイル時のエラー）と実行時のチェックを組み合わせることで、その健全性を強化している。例えば、Stringをintに代入するのはコンパイル時のエラーである。オブジェクトがStringでない場合、as Stringを使ってオブジェクトをStringにキャストすると、実行時エラーになる。

## 健全性のメリット

健全な型システムにはいくつかの利点がある：

- コンパイル時に型関連のバグを明らかにする: 健全な型システムは、コードがその型について曖昧でないことを強制する。そのため、実行時には見つけにくい型関連のバグが、コンパイル時に明らかになる。
- より読みやすいコード: コードが読みやすくなるのは、値が実際に指定された型を持つことを信頼できるからです。健全性のあるDartでは、型は嘘をつけない。
- 保守性の高いコード: 健全な型システムでは、あるコードを変更したときに、型システムが他のコードが壊れたことを警告してくれる。
- より良い先行（AOT）コンパイル: 型がなくてもAOTコンパイルは可能だが、生成されるコードの効率はかなり落ちる。

## 静的解析をパスするためのヒント

静的型のルールのほとんどは理解しやすい。ここでは、あまり目立たないルールをいくつか紹介しよう：

- メソッドをオーバーライドするときは、健全な戻り値の型を使用する。
- メソッドをオーバーライドするときは、適切なパラメータ・タイプを使用する。
- 動的リストを型付きリストとして使用しない。

以下の型階層を使った例で、これらのルールを詳しく見てみよう：

(図)スーパータイプがAnimalで、サブタイプがAlligator、Cat、HoneyBadgerである動物の階層。CatにはLionとMaineCoonのサブタイプがあります。

### メソッドをオーバーライドするときは、サウンド・リターン・タイプを使用する

サブクラスのメソッドのリターン・タイプは、スーパークラスのメソッドのリターン・タイプと同じか、そのサブタイプでなければならない。Animalクラスのゲッター・メソッドを考えてみましょう：

```dart
class Animal {
  void chase(Animal a) { ... }
  Animal get parent => ...
}
```

親ゲッターメソッドはAnimalを返します。HoneyBadgerのサブクラスでは、ゲッターの戻り値の型をHoneyBadger（またはAnimalの他のサブタイプ）に置き換えることができますが、無関係な型を指定することはできません。

```dart
// ✔ static analysis: successdart
class HoneyBadger extends Animal {
  @override
  void chase(Animal a) { ... }

  @override
  HoneyBadger get parent => ...
}
```

::: danger ✗ static analysis: failuredart
``` dart
class HoneyBadger extends Animal {
  @override
  void chase(Animal a) { ... }

  @override
  Root get parent => ...
}
```
:::

### メソッドをオーバーライドするときは、健全なパラメータ型を使用する

オーバーライドされたメソッドのパラメータは、スーパークラスの対応するパラメータと同じ型またはスーパー型のいずれかを持つ必要があります。パラメータ型を元のパラメータのサブタイプに置き換えて "タイト化" してはいけません。

::: info Note
サブタイプを使う正当な理由があれば、covariantキーワードを使うことができる。
:::

Animalクラスのchase(Animal)メソッドを考えてみよう：

```dart
class Animal {
  void chase(Animal a) { ... }
  Animal get parent => ...
}
```

chase()メソッドはAnimalを取る。HoneyBadgerは何でも追いかける。chase()メソッドをオーバーライドして、何でも（Object）を受け取るようにしても構わない。

```dart
//✔ static analysis: successdart
class HoneyBadger extends Animal {
  @override
  void chase(Object a) { ... }

  @override
  Animal get parent => ...
}
```

次のコードでは、chase()メソッドのパラメータをAnimalからAnimalのサブクラスであるMouseに変更している。

::: danger ✗ static analysis: failuredart
```dart
class Mouse extends Animal { ... }

class Cat extends Animal {
  @override
  void chase(Mouse a) { ... }
}
```
:::

このコードは型安全ではない。なぜなら、ネコを定義してワニの後を追わせることが可能になってしまうからだ：

```dart
Animal a = Cat();
a.chase(Alligator()); // 猫には安全ではない。
```

### ダイナミック・リストを型付きリストとして使わない

ダイナミック・リストは、さまざまな種類のものを含むリストを持ちたい場合に適している。しかし、動的リストを型付きリストとして使うことはできない。

このルールはジェネリック型のインスタンスにも適用される。

以下のコードでは、Dogの動的リストを作成し、それをCat型のリストに代入しているが、これは静的解析時にエラーを発生させる。

::: danger ✗ static analysis: failuredart
```
void main() {
  List<Cat> foo = <dynamic>[Dog()]; // Error
  List<dynamic> bar = <dynamic>[Dog(), Cat()]; // OK
}
```
:::

## ランタイム・チェック

ランタイム・チェックは、コンパイル時には検出できない型安全性の問題を扱う。

例えば、以下のコードは犬のリストを猫のリストにキャストするのはエラーなので、実行時に例外をスローする：

::: danger ✗ runtime: failuredart
```dart
void main() {
  List<Animal> animals = <Dog>[Dog()];
  List<Cat> cats = animals as List<Cat>;
}
```
:::

## 型推論

解析器はフィールド、メソッド、ローカル変数、そしてほとんどの汎用型引数の型を推論することができます。特定の型を推測するのに十分な情報がない場合は、動的型を使用します。

ジェネリックスの型推論の例を示します。この例では、argumentsという変数に、文字列のキーとさまざまな型の値をペアにしたマップが格納されています。

この変数を明示的に型付けすると、次のようになります：

```dart
Map<String, dynamic> arguments = {'argA': 'hello', 'argB': 42};
```

あるいは、varまたはfinalを使い、Dartに型を推測させることもできる：

```dart
var arguments = {'argA': 'hello', 'argB': 42}; // Map<String, Object>
```

マップ・リテラルはその項目から型を推測し、次に変数はマップ・リテラルの型から型を推測する。このマップでは、キーは両方とも文字列だが、値は異なる型を持っている。 (Object を始まりとする String と int). つまり、マップリテラルの型は`Map<String, Object>`であり、引数変数も同様である。

### フィールドとメソッドの推論

型の指定がなく、スーパークラスのフィールドまたはメソッドをオーバーライドするフィールドまたはメソッドは、スーパークラスのメソッドまたはフィールドの型を継承します。

宣言または継承された型を持たないが、初期値とともに宣言されたフィールドは、初期値に基づいて推論された型を取得します。

### 静的フィールド推論

静的フィールドと変数は、イニシャライザーから型を推論します。推論がサイクルに遭遇すると失敗することに注意してください（つまり、変数の型を推論するかどうかは、その変数の型を知っているかどうかに依存します）。

### 局所変数の推論

ローカル変数の型は、初期化子があればそこから推測される。それ以降の代入は考慮されません。このため、正確すぎる型が推論される可能性があります。その場合は、型アノテーションを追加します。

::: danger ✗ static analysis: failuredart
```dart
var x = 3; // x is inferred as an int.
x = 4.0;
```
:::

```dart
// ✔ static analysis: successdart
num y = 3; // A num can be double or int.
y = 4.0;
```

### Type argument inference

コンストラクタ呼び出しやジェネリクスメソッド呼び出しの型引数は、発生コンテキストからの下向きの情報と、コンストラクタやジェネリクスメソッドの引数からの上向きの情報の組み合わせに基づいて推論されます。推論が思い通りにならない場合は、いつでも明示的に型引数を指定することができます。

```dart
//✔ static analysis: successdart
// Inferred as if you wrote <int>[].
List<int> listOfInt = [];

// Inferred as if you wrote <double>[3.0].
var listOfDouble = [3.0];

// Inferred as Iterable<int>.
var ints = listOfDouble.map((x) => x.toInt());
```

最後の例では、xは下向きの情報を使ってdoubleと推論される。クロージャの戻り値の型は、上向きの情報を使用して `int` と推論されます。Dart は、`map()` メソッドの型引数を推論する際に、この戻り値の型を上方情報として使用します：`<int>` です。

## タイプの代用

メソッドをオーバーライドする場合、（古いメソッドの）ある型を、（新しいメソッドの）新しい型に置き換えることになります。同様に、関数に引数を渡すとき、ある型を持つもの（宣言された型を持つパラメータ）を別の型を持つもの（実際の引数）に置き換えることになります。ある型を持つものを、サブタイプやスーパータイプを持つものに置き換えることができるのは、どのような場合でしょうか？

型を置き換える場合、消費者と生産者という観点から考えることが役に立つ。消費者はタイプを吸収し、生産者はタイプを生成する。

コンシューマーの型をスーパータイプに、プロデューサーの型をサブタイプに置き換えることができる。

単純な型の代入とジェネリック型による代入の例を見てみよう。

## 単純なタイプ割り当て

オブジェクトをオブジェクトに割り当てるとき、いつ型を別の型に置き換えることができるだろうか？答えは、オブジェクトがコンシューマーかプロデューサーのどちらであるかによって決まる。

次のような型階層を考えてみよう：

(図)スーパータイプがAnimalで、サブタイプがAlligator、Cat、HoneyBadgerである動物の階層。CatはLionとMaineCoonのサブタイプを持つ。

`Cat c`がコンシューマーで、`Cat()`がプロデューサーである次のような単純な割り当てを考えてみよう：

```dart
Cat c = Cat();
```

消費する立場では、特定の種類を消費するもの（猫）を、何でも消費するもの（動物）に置き換えても問題ない。したがって、Cat cをAnimal cに置き換えることは可能である。

```dart
// ✔ static analysis: successdart
Animal c = Cat();
```

しかし、`Cat c`を`MaineCoon c`に置き換えると、スーパークラスが`Lion`のような異なる振る舞いをする`Cat`の型を提供する可能性があるため、型安全性が壊れてしまう：

::: danger ✗ static analysis: failuredart
```dart
MaineCoon c = Cat();
```
:::

In a producing position, it's safe to replace something that produces a type (Cat) with a more specific type (MaineCoon). So, the following is allowed:

```dart
// ✔ static analysis: successdart
Cat c = MaineCoon();
```

### Generic type assignment

ジェネリック・タイプでもルールは同じですか？そうだ。CatのリストはAnimalのリストのサブタイプであり、MaineCoonのリストのスーパータイプです：

(図)`List<Animal> -> List<Cat> -> List<MaineCoon>`

次の例では、`List<MaineCoon>` は `List<Cat>` のサブタイプなので、メインクーンのリストを myCats に代入することができる：

```dart
//✔ static analysis: successdart
List<MaineCoon> myMaineCoons = ...
List<Cat> myCats = myMaineCoons;
```

他の方向はどうだろう？`List<Cat>`にAnimalリストを割り当てることはできますか？

::: danger ✗ static analysis: failuredart
```dart
List<Animal> myAnimals = ...
List<Cat> myCats = myAnimals;
```
:::

この代入は暗黙のダウンキャストを作成するため、静的解析を通過しない。これはAnimalのような非動的型では禁止されている。

この種のコードを静的解析に合格させるには、明示的なキャストを使えばいい。

```dart
List<Animal> myAnimals = ...
List<Cat> myCats = myAnimals as List<Cat>;
```

しかし、明示的なキャストは、キャストされるリストの実際の型（myAnimals）によっては、実行時に失敗するかもしれない。

## 方法

メソッドをオーバーライドする場合も、プロデューサとコンシューマのルールは適用されます。例えば

(図)Animalクラスでは、chaseメソッドがコンシューマー、parentゲッターがプロデューサーです。

コンシューマー（chase(Animal)メソッドなど）では、パラメーターの型をスーパータイプに置き換えることができます。プロデューサ（親ゲッターメソッドなど）の場合は、戻り値の型をサブタイプに置き換えることができます。

詳細は、"メソッドをオーバーライドする場合は健全なリターン型を使用する" および "メソッドをオーバーライドする場合は健全なパラメータ型を使用する" を参照してください。

## その他のリソース

Dartの健全性に関する詳しい情報は、以下のリソースをご参照ください：

- 一般的な型に関する問題の解決 - 健全なDartのコードを記述する際に遭遇する可能性のあるエラーとその解決方法。
- 型推進エラーの修正 - 型推進エラーを理解し、修正する方法を学ぶ。
- 健全なヌル安全性 - 健全なヌル安全性を持つコードの記述について学びます。
- 静的解析のカスタマイズ - 解析オプション・ファイルを使用してアナライザとリンターを設定し、カスタマイズする方法。