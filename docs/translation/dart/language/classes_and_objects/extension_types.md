# 拡張型

拡張型はコンパイル時に抽象化されるもので、既存の型を別の静的なインターフェイスのみで "ラップ "する。拡張型は静的JSのインターオプの主要な構成要素である。なぜなら、既存の型のインターフェイスを簡単に変更できるからである（どのような種類のインターオプにとっても重要である）。

拡張型は、表現型と呼ばれる基礎となる型のオブジェクトが利用できる操作のセット（またはインターフェイス）に規律を課す。拡張型のインタフェースを定義する際、表現型のいくつかのメンバを再利用したり、他のメンバを省略したり、他のメンバを置き換えたり、新しい機能を追加したりすることができます。

以下の例では、int型をラップして、ID番号に対して意味のある操作のみを許可する拡張型を作成しています：

```dart
extension type IdNumber(int id) {
  // Wraps the 'int' type's '<' operator:
  operator <(IdNumber other) => id < other.id;
  // Doesn't declare the '+' operator, for example,
  // because addition does not make sense for ID numbers.
}

void main() {
  // Without the discipline of an extension type,
  // 'int' exposes ID numbers to unsafe operations:
  int myUnsafeId = 42424242;
  myUnsafeId = myUnsafeId + 10; // This works, but shouldn't be allowed for IDs.

  var safeId = IdNumber(42424242);
  safeId + 10; // Compile-time error: No '+' operator.
  myUnsafeId = safeId; // Compile-time error: Wrong type.
  myUnsafeId = safeId as int; // OK: Run-time cast to representation type.
  safeId < IdNumber(42424241); // OK: Uses wrapped '<' operator.
}
```

::: info Note
拡張型はラッパークラスと同じ役割を果たしますが、余計なランタイム・オブジェクトを作成する必要はありません。拡張型は静的なもので、実行時にコンパイルされるため、基本的にコストはゼロです。

拡張メソッド（単に「エクステンション」とも呼ばれる）は、拡張型に似た静的な抽象化です。しかし、拡張メソッドは、その基礎となる型のすべてのインスタンスに直接機能を追加します。拡張型のインターフェイスは、静的な型がその拡張型である式にのみ適用されます。拡張型のインターフェースは、デフォルトではその基底型のインターフェースとは異なります。
:::

## 構文

### 宣言

新しい拡張型を定義するには、拡張型宣言と名前を指定し、その後に括弧で表現型宣言を続けます：

```dart
extension type E(int i) {
  // Define set of operations.
}
```

表現型宣言（int i）は、拡張型Eの基本型がintであり、表現オブジェクトへの参照がiであることを指定する：

- 表現型を戻り値とする、表現オブジェクトの暗黙のゲッター。
- 暗黙のコンストラクタ：E(int i) : i = i.

表現オブジェクトは、基礎となる型のオブジェクトへのアクセスを拡張型に与えます。このオブジェクトは拡張型本体のスコープ内にあり、その名前をゲッターとして使ってアクセスすることができます：

- i（またはコンストラクタ内のthis.i）を使用して、拡張タイプ本体内で。
- e.i（eは静的型として拡張型を持つ）を使用したプロパティ抽出。

拡張型の宣言には、クラスやエクステンションと同様に型パラメーターを含めることができます：

```dart
extension type E<T>(List<T> elements) {
  // ...
}
```

### コンストラクター

拡張型のボディでは、オプションでコンストラクタを宣言できます。表現宣言自体は暗黙のコンストラクタであり、デフォルトでは拡張型の無名コンストラクタの代わりになります。リダイレクトされない生成コンストラクタは、イニシャライザリストまたは正式なパラメータでthis.iを使用して、表現オブジェクトのインスタンス変数を初期化する必要があります。

```dart
extension type E(int i) {
  E.n(this.i);
  E.m(int j, String foo) : i = j + foo.length;
}

void main() {
  E(4); // Implicit unnamed constructor.
  E.n(3); // Named constructor.
  E.m(5, "Hello!"); // Named constructor with additional parameters.
}
```

あるいは、表現宣言のコンストラクタに名前を付けることもでき、その場合はボディに無名のコンストラクタを置く余地がある：

```dart
extension type const E._(int it) {
  E(): this._(42);
  E.otherName(this.it);
}

void main2() {
  E();
  const E._(2);
  E.otherName(3);
}
```

また、コンストラクタを完全に隠すこともできる。コンストラクタを新しく定義する代わりに、クラスと同じプライベート・コンストラクタ構文`_`を使う。たとえば、基本型がintであるにもかかわらず、クライアントにEをStringでコンストラストさせたい場合です：

```dart
extension type E._(int i) {
  E.fromString(String foo) : i = int.parse(foo);
}
```

また、生成コンストラクタやファクトリーコンストラクタ（サブ拡張型のコンストラクタに転送することもできる）を宣言することもできる。

### メンバー

クラスのメンバと同じように、拡張型の本体でメンバを宣言し、そのインタフェースを定義します。拡張型のメンバには、メソッド、ゲッター、セッター、演算子を指定できます (外部インスタンス変数と抽象メンバは使用できません)：

```dart
extension type NumberE(int value) {
  // Operator:
  NumberE operator +(NumberE other) =>
      NumberE(value + other.value);
  // Getter:
  NumberE get myNum => this;
  // Method:
  bool isValid() => !value.isNegative;
}
```

表現型のインターフェース・メンバは、デフォルトでは拡張型のインターフェース・メンバではありません。表現型の単一のメンバを拡張型で使用できるようにするには、NumberE の演算子 + のように、拡張型の定義にその宣言を記述する必要があります。また、i ゲッターや isValid メソッドのように、表現型とは関係のない新しいメンバを定義することもできます。

### Implements

オプションでimplements句を使用すると、次のようになります。:

- Introduce a subtype relationship on an extension type, AND
- Add the members of the representation object to the extension type interface.

implements節は、拡張メソッドとそのon型の間のような適用関係を導入します。スーパータイプに適用可能なメンバは、サブタイプに同じメンバ名の宣言がない限り、サブタイプにも適用可能です。

拡張タイプは:

- その表現型。これにより、表現型のすべてのメンバが暗黙のうちに拡張型で利用できるようになる。

```dart
extension type NumberI(int i) 
  implements int{
  // 'NumberI' can invoke all members of 'int',
  // plus anything else it declares here.
}
```

- 表現型のスーパータイプ。これにより、スーパータイプのメンバを利用できるようになるが、表現型のメンバをすべて利用できるとは限らない。

```dart
extension type Sequence<T>(List<T> _) implements Iterable<T> {
  // Better operations than List.
}

extension type Id(int _id) implements Object {
  // Makes the extension type non-nullable.
  static Id? tryParse(String source) => int.tryParse(source) as Id?;
}
```

- 同じ表現タイプで有効な別の拡張タイプ。これにより、複数の拡張タイプにまたがって操作を再利用することができる（多重継承に似ている）。

```dart
extension type const Opt<T>._(({T value})? _) { 
  const factory Opt(T value) = Val<T>;
  const factory Opt.none() = Non<T>;
}
extension type const Val<T>._(({T value}) _) implements Opt<T> { 
  const Val(T value) : this._((value: value));
  T get value => _.value;
}
extension type const Non<T>._(Null _) implements Opt<Never> {
  const Non() : this._(null);
}
```

さまざまなシナリオにおけるインプリメントの効果については、使用法のセクションをお読みください。

### `@redeclare`

スーパータイプのメンバと同じ名前を持つ拡張タイプのメンバを宣言することは、クラス間のようなオーバーライドの関係ではなく、再宣言になります。拡張型のメンバの宣言は、同じ名前のスーパー型のメンバを完全に置き換えます。同じ関数の代替実装を提供することはできない。

redeclareアノテーションを使うと、スーパータイプのメンバと同じ名前を使うことを承知の上で選択していることをコンパイラに伝えることができます。実際にそうでない場合、例えばどちらかの名前が間違って入力された場合などには、アナライザが警告を発します。

```dart
extension type MyString(String _) implements String {
  // Replaces 'String.operator[]'
  @redeclare
  int operator [](int index) => codeUnitAt(index);
}
```

また、lint annotate_redeclaresを有効にすると、@redeclareでアノテーションされていないスーパーインターフェイス・メンバーを隠す拡張型メソッドを宣言した場合に警告が表示されます。

## 使用方法

拡張型を使うには、クラスと同じようにコンストラクタを呼び出してインスタンスを作成する：

```dart
extension type NumberE(int value) {
  NumberE operator +(NumberE other) =>
      NumberE(value + other.value);

  NumberE get next => NumberE(value + 1);
  bool isValid() => !value.isNegative;
}

void testE() { 
  var num = NumberE(1);
}
```

そして、クラス・オブジェクトと同じように、オブジェクトのメンバーを呼び出すことができる。

拡張型には2つの同じように有効な、しかし本質的には異なる使用例があります：

1. 既存の型に拡張インターフェースを提供する。
2. 既存の型に別のインターフェースを提供する。

::: info Note
いずれにせよ、拡張型の表現型がそのサブタイプになることはないので、拡張型が必要な場所で表現型を互換的に使用することはできない。
:::

### 1. 既存の型に拡張インターフェースを提供する

拡張型がその表現型を実装している場合、それを「透過的」とみなすことができる。

透明な拡張型は、（再宣言されていない）表現型のすべてのメンバと、その拡張型が定義する補助的なメンバを呼び出すことができる。これにより、既存の型に新しい拡張インターフェースが作成されます。この新しいインターフェースは、静的な型が拡張型である式で使用できます。

つまり、（非透過拡張型とは異なり）表現型のメンバを次のように呼び出すことができる：

```dart
extension type NumberT(int value) 
  implements int {
  // Doesn't explicitly declare any members of 'int'.
  NumberT get i => this;
}

void main () {
  // All OK: Transparency allows invoking `int` members on the extension type:
  var v1 = NumberT(1); // v1 type: NumberT
  int v2 = NumberT(2); // v2 type: int
  var v3 = v1.i - v1;  // v3 type: int
  var v4 = v2 + v1; // v4 type: int
  var v5 = 2 + v1; // v5 type: int
  // Error: Extension type interface is not available to representation type
  v2.i;
}
```

スーパータイプから与えられたメンバ名を再宣言することで、新しいメンバを追加し、他のメンバを適応させる「ほとんど透過的な」拡張型を持つこともできる。これによって、たとえばメソッドの一部のパラメータでより厳格な型を使用したり、異なるデフォルト値を使用したりできるようになる。

もう1つのほとんど透過的な拡張型のアプローチは、表現型のスーパータイプである型を実装することである。例えば、表現型はプライベートであるが、そのスーパー型がクライアントにとって重要なインターフェースの部分を定義している場合である。

### 2. 既存の型に別のインターフェイスを提供する

透過的でない（その表現型を実装していない）拡張型は、静的に、その表現型とは異なる、まったく新しい型として扱われます。拡張型をその表現型に代入することはできず、その表現型のメンバを公開することもできません。

例えば、Usageで宣言したNumberE拡張型を考えてみましょう：

```dart
void testE() { 
  var num1 = NumberE(1);
  int num2 = NumberE(2); // Error: Can't assign 'NumberE' to 'int'.
  
  num.isValid(); // OK: Extension member invocation.
  num.isNegative(); // Error: 'NumberE' does not define 'int' member 'isNegative'.
  
  var sum1 = num1 + num1; // OK: 'NumberE' defines '+'.
  var diff1 = num1 - num1; // Error: 'NumberE' does not define 'int' member '-'.
  var diff2 = num1.value - 2; // OK: Can access representation object with reference.
  var sum2 = num1 + 2; // Error: Can't assign 'int' to parameter type 'NumberE'. 
  
  List<NumberE> numbers = [
    NumberE(1), 
    num1.next, // OK: 'next' getter returns type 'NumberE'.
    1, // Error: Can't assign 'int' element to list type 'NumberE'.
  ];
}
```

このように拡張型を使用すると、既存の型のインタフェースを置き換えることができます。これによって、新しい型の制約（冒頭のIdNumberの例のように）に対して意味のあるインタフェースをモデル化することができ、同時にintのような単純な定義済みの型のパフォーマンスと利便性の恩恵を受けることができます。

このユースケースは、ラッパークラスの完全なカプセル化に限りなく近いものです（しかし、現実的には多少保護された抽象化に過ぎません）。

## タイプ別考慮事項

拡張型はコンパイル時のラッピング構造である。実行時には、拡張型の痕跡はまったく残りません。型クエリや同様の実行時操作は、すべて表現型に対して行われます。

このため、拡張型は安全でない抽象となります。なぜなら、実行時には常に表現型を見つけることができ、基礎となるオブジェクトにアクセスすることができるからです。

動的型検査（e is T）、キャスト（e as T）、その他の実行時型問い合わせ（switch (e) ... や if (e case ...) など）はすべて、基礎となる表現オブジェクトに対して評価され、そのオブジェクトの実行時型に対して型検査を行います。これは、eの静的型が拡張型である場合と、拡張型に対してテストする場合(case MyExtensionType()：...).

```dart
void main() {
  var n = NumberE(1);

  // Run-time type of 'n' is representation type 'int'.
  if (n is int) print(n.value); // Prints 1.

  // Can use 'int' methods on 'n' at run time.
  if (n case int x) print(x.toRadixString(10)); // Prints 1.
  switch (n) {
    case int(:var isEven): print("$n (${isEven ? "even" : "odd"})"); // Prints 1 (odd).
  }
}
```

同様に、マッチした値のスタティック・タイプは、この例ではエクステンション・タイプのものである：

```dart
void main() {
  int i = 2;
  if (i is NumberE) print("It is"); // Prints 'It is'.
  if (i case NumberE v) print("value: ${v.value}"); // Prints 'value: 2'.
  switch (i) {
    case NumberE(:var value): print("value: $value"); // Prints 'value: 2'.
  }
}
```

拡張型を使用する際には、この性質を認識しておくことが重要だ。拡張型はコンパイル時には存在し、重要であるが、コンパイル時には消去されるということを常に念頭に置いてほしい。

静的な型として拡張型Eと表現型Rを持つ式は、実行時には型Rを持つオブジェクトになります。`List<E>`は実行時には`List<R>`とまったく同じものになる。

言い換えれば、本当のラッパー・クラスはラップされたオブジェクトをカプセル化することができますが、拡張型はラップされたオブジェクトのコンパイル時のビューに過ぎません。本物のラッパーの方が安全ですが、拡張型はラッパーのオブジェクトを避けることができるため、シナリオによってはパフォーマンスを大幅に向上させることができます。