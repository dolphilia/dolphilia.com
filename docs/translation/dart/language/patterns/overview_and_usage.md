# パターン

::: info Version note
パターンには少なくとも3.0以上の言語バージョンが必要です。
:::

パターンは、ステートメントや式と同様に、Dart言語の構文カテゴリです。パターンは、実際の値とマッチする可能性のある値の集合の形を表します。

このページでは

- パターンの役割
- Dart コードでパターンを使用できる場所。
- パターンの一般的な使用例

パターンの種類については、パターンの種類のページをご覧ください。

## どのようなパターンか

一般的に、パターンは文脈とパターンの形によって、値にマッチするか、値を構造化解除するか、あるいはその両方を行う。

まず、パターンマッチングによって、与えられた値が

- ある形をしている。
- ある一定である。
- 他の何かと等しい。
- 特定の型を持つ。

そして、パターン・デストラクチャリングは、その値を構成要素に分割するための便利な宣言構文を提供する。同じパターンを使えば、その過程で変数をその一部または全部にバインドすることもできる。

### マッチング

パターンは常に値に対してテストを行い、その値が期待する形式を持つかどうかを判断します。言い換えれば、値がパターンにマッチするかどうかをチェックしているのです。

何をもってマッチとするかは、使っているパターンの種類によって異なります。たとえば定数パターンは、値がパターンの定数と等しい場合にマッチします：

```dart
switch (number) {
  // Constant pattern matches if 1 == number.
  case 1:
    print('one');
}
```

多くのパターンはサブパターンを利用し、それぞれアウターパターン、インナーパターンと呼ばれることもある。パターンはそのサブパターンに再帰的にマッチする。例えば、コレクション型パターンの個々のフィールドは、可変パターンや定数パターンである可能性があります：

```dart
const a = 'a';
const b = 'b';
switch (obj) {
  // List pattern [a, b] matches obj first if obj is a list with two fields,
  // then if its fields match the constant subpatterns 'a' and 'b'.
  case [a, b]:
    print('$a, $b');
}
```

マッチした値の一部を無視するには、ワイルドカード・パターンをプレースホルダとして使用します。リスト・パターンの場合は、rest要素を使うことができます。

### デストラクチャリング

オブジェクトとパターンがマッチすると、パターンはオブジェクトのデータにアクセスし、それを部分的に取り出すことができる。つまり、パターンがオブジェクトを破壊するのだ：

```dart
var numList = [1, 2, 3];
// リストパターン[a, b, c]は、numList...から3つの要素を破壊する。
var [a, b, c] = numList;
// ...そして新しい変数に割り当てる。
print(a + b + c);
```

デストラクチャリング・パターンの中には、どんな種類のパターンでも入れ子にすることができる。たとえば、このケースパターンは、最初の要素が 'a' または 'b' である2要素リストにマッチし、それをデストラクチャします：

```dart
switch (list) {
  case ['a' || 'b', var c]:
    print(c);
}
```

## パターンが現れる場所

Dart言語では、いくつかの場所でパターンを使用することができます：

- ローカル変数の宣言と代入
- forループとfor-inループ
- ifケースとswitchケース
- コレクション・リテラルの制御フロー

このセクションでは、パターンを使ったマッチングとデストラクチャリングの一般的な使用例について説明する。

### 変数宣言

パターン変数宣言は、Dartがローカル変数宣言を許可する場所であればどこでも使用できる。パターンは宣言の右側にある値とマッチします。一度マッチすると、その値は破棄され、新しいローカル変数にバインドされます：

```dart
// Declares new variables a, b, and c.
var (a, [b, c]) = ('str', [1, 2]);
```

パターン変数の宣言は、varかfinalで始まり、その後にパターンが続かなければならない。

### 変数の割り当て

変数代入パターンは代入の左側に位置する。まず、マッチしたオブジェクトをデストラクトする。次に、新しい変数をバインドするのではなく、既存の変数に値を代入する。

変数代入パターンを使うと、3つ目の一時的な変数を宣言することなく、2つの変数の値を入れ替えることができます：

```dart
var (a, b) = ('left', 'right');
(b, a) = (a, b); // Swap.
print('$a $b'); // Prints "right left".
```

### Switch文と式

すべての case 節にはパターンが含まれる。これは、switch文と式、およびif-case文に適用されます。caseにはどのようなパターンでも使用できます。

caseパターンは反論可能である。これらのパターンによって、制御の流れは次のいずれかになります：

- オンになっているオブジェクトをマッチさせ、再構築する。
- オブジェクトがマッチしない場合は実行を続ける。

パターンがケース内でデストラクチャする値はローカル変数になる。そのスコープは、そのケースのボディの中だけです。

```dart
switch (obj) {
  // Matches if 1 == obj.
  case 1:
    print('one');

  // Matches if the value of obj is between the
  // constant values of 'first' and 'last'.
  case >= first && <= last:
    print('in range');

  // Matches if obj is a record with two fields,
  // then assigns the fields to 'a' and 'b'.
  case (var a, var b):
    print('a = $a, b = $b');

  default:
}
```

論理和パターンは、switch式やステートメントで複数のケースがボディを共有する場合に便利です：

```dart
var isPrimary = switch (color) {
  Color.red || Color.yellow || Color.blue => true,
  _ => false
};
```

Switch文は、論理和パターンを使わなくても、複数のケースでボディを共有することができるが、複数のケースでガードを共有することができるため、独特の便利さがある：

```dart
switch (shape) {
  case Square(size: var s) || Circle(size: var s) when s > 0:
    print('Non-empty symmetric shape');
}
```

ガード節は、caseの一部として任意の条件を評価し、その条件が偽の場合（case本体でif文を使用した場合のように）スイッチを終了することはありません。

```dart
switch (pair) {
  case (int a, int b):
    if (a > b) print('First element greater');
  // If false, prints nothing and exits the switch.
  case (int a, int b) when a > b:
    // If false, prints nothing but proceeds to next case.
    print('First element greater');
  case (int a, int b):
    print('First element not greater');
}
```

### forループとfor-inループ

forループやfor-inループでパターンを使用すると、コレクション内の値を反復処理したり再構築したりすることができます。

この例では、for-in ループでオブジェクトの再構築を使用して、`<Map>.entries` 呼び出しが返す `MapEntry` オブジェクトを再構築します：

```dart
Map<String, int> hist = {
  'a': 23,
  'b': 100,
};

for (var MapEntry(key: key, value: count) in hist.entries) {
  print('$key occurred $count times');
}
```

このオブジェクトパターンは、hist.entriesがMapEntryという名前付き型を持っていることをチェックし、名前付きフィールドのサブパターンkeyとvalueに再帰します。各反復で MapEntry の key ゲッターと value ゲッターを呼び出し、結果をそれぞれローカル変数 key と count にバインドします。

ゲッター呼び出しの結果を同じ名前の変数にバインドすることは一般的なユースケースであるため、オブジェクトパターンは変数サブパターンからゲッター名を推測することもできます。これにより、変数パターンを`:key: key`のような冗長なものから、`:key`のように単純化することができます：

```dart
for (var MapEntry(:key, value: count) in hist.entries) {
  print('$key occurred $count times');
}
```

## パターンの使用例

前のセクションでは、パターンが他のDartのコード構成にどのように適合するかを説明した。例として、2 つの変数の値を入れ替えたり、マップ内のキーと値のペアを再構築したりといった、いくつかの興味深い使用例を見ました。このセクションでは、さらに多くの使用例について説明します：

- パターンを使いたい時とその理由。
- どのような問題を解決するのか
- どのイディオムに最も適しているか

### 複数リターンの再構築

レコードは単一の関数呼び出しから複数の値を集約して返すことができます。パターンは、レコードのフィールドを関数呼び出しとインラインで直接ローカル変数に再構築する機能を追加します。

このように、レコードのフィールドごとに新しいローカル変数を宣言する代わりに、レコードのフィールドを直接ローカル変数に変換することができます：

```dart
var info = userInfo(json);
var name = info.$1;
var age = info.$2;
```

関数が返すレコードのフィールドは、変数宣言または割り当てパターンと、そのサブパターンとしてのレコードパターンを使って、ローカル変数に再構築することができる：

```dart
var (name, age) = userInfo(json);
```

### クラス・インスタンスの再構築

オブジェクトパターンは、名前付きオブジェクトの型にマッチします。これにより、オブジェクトのクラスがすでに公開しているゲッターを使用して、そのデータを再構築することができます。

クラスのインスタンスを再構築するには名前の型に続いて、括弧で囲まれた再構築するプロパティが続く：

```dart
final Foo myFoo = Foo(one: 'one', two: 2);
var Foo(:one, :two) = myFoo;
print('one $one, two $two');
```

### 代数的データ型

オブジェクトのデストラクチャリングとスイッチ・ケースは、代数的データ型のスタイルでコードを書くのに適している。このメソッドは次のような場合に使用する：

- 関連する型のファミリーがある。
- それぞれの型に固有の動作が必要な操作がある。
- さまざまな型定義にその動作を分散させるのではなく、1つの場所にまとめたい。

操作をすべての型のインスタンスメソッドとして実装する代わりに、操作のバリエーションを1つの関数にまとめ、サブタイプを切り替えるようにします：

```dart
sealed class Shape {}

class Square implements Shape {
  final double length;
  Square(this.length);
}

class Circle implements Shape {
  final double radius;
  Circle(this.radius);
}

double calculateArea(Shape shape) => switch (shape) {
      Square(length: var l) => l * l,
      Circle(radius: var r) => math.pi * r * r
    };
```

### JSON受信の検証

マップとリストのパターンは、JSONデータのキーと値のペアを再構築するのに適しています：

```dart
var json = {
  'user': ['Lily', 13]
};
var {'user': [name, age]} = json;
```

JSONデータが期待通りの構造を持っていることがわかっていれば、先の例は現実的だ。しかし、データは通常、ネットワーク上のような外部ソースからやってきます。その構造を確認するために、まずそれを検証する必要があります。

パターンがないと、検証は冗長になる：

```dart
if (json is Map<String, Object?> &&
    json.length == 1 &&
    json.containsKey('user')) {
  var user = json['user'];
  if (user is List<Object> &&
      user.length == 2 &&
      user[0] is String &&
      user[1] is int) {
    var name = user[0] as String;
    var age = user[1] as int;
    print('User $name is $age years old.');
  }
}
```

シングル・ケース・パターンでも同じ検証を行うことができる。単一のケースは、if-caseステートメントとして最適です。パターンはより宣言的で、JSONのバリデーションをより冗長でなくする方法を提供します：

```dart
if (json case {'user': [String name, int age]}) {
  print('User $name is $age years old.');
}
```

このケースパターンは、同時にそれを立証している：

- jsonはマップであり、先に進むにはまず外側のマップ・パターンにマッチしなければならないからだ。
  - また、マップなので、jsonがnullでないことも確認できる。
- jsonはキーuserを含んでいる。
- キーuserは、2つの値のリストと対になっている。
- リストの値の型はStringとintです。
- 値を保持する新しいローカル変数はnameとageです。