# パターンの種類

このページは、さまざまな種類のパターンについてのリファレンスです。パターンがどのように機能するのか、Dartでパターンを使用できる場所、一般的な使用例などの概要については、メインのパターンのページをご覧ください。

__パターンの優先順位__:

演算子の優先順位と同様に、パターンの評価も優先順位の規則に従います。括弧でくくられたパターンを使えば、優先順位の低いパターンから先に評価することができる。

この文書では、優先順位の高い順にパターン・タイプを列挙する。:

- 論理和パターンは論理積パターンよりも優先順位が低く、論理積パターンは関係パターンよりも優先順位が低い、といった具合だ。
- ポストフィックスの単項パターン（cast、null-check、null-assert）は同じ優先度を共有する。
- 残りのプライマリ・パターンは最も高い優先度を共有する。コレクション型（record、list、map）とObjectパターンは他のデータを含むため、外側パターンとして最初に評価されます。

## 論理和

`subpattern1 || subpattern2`

論理和パターンはサブパターンを `||` で区切り、いずれかのブランチがマッチした場合にマッチします。分岐は左から右に評価されます。ある枝がマッチすると、残りの枝は評価されません。

```dart
var isPrimary = switch (color) {
  Color.red || Color.yellow || Color.blue => true,
  _ => false
};
```

論理和パターンのサブパターンは変数をバインドできますが、パターンがマッチしたときに評価されるのは1つのブランチだけなので、ブランチは同じ変数セットを定義しなければなりません。

## 論理積

`subpattern1 && subpattern2`

`&&`で区切られたパターンのペアは、両方のサブパターンがマッチする場合にのみマッチする。左のブランチがマッチしない場合、右のブランチは評価されません。

ロジカルアンドパターンのサブパターンは変数をバインドできますが、パターンがマッチした場合は両方がバインドされるので、それぞれのサブパターンの変数はオーバーラップしてはいけません：

```dart
switch ((1, 2)) {
  // エラー、両方のサブパターンが'b'をバインドしようとしている。
  case (var a, var b) && (var b, var c): // ...
}
```

## 関係

`== expression`

`< expression`

関係パターンは、等号演算子または関係演算子のいずれかを使用して、マッチした値と与えられた定数を比較します：`==、!=、<、>、<=、>=`。

パターンがマッチするのは、マッチした値に対して定数を引数として適切な演算子を呼び出すとtrueが返される場合である。

関係パターンは、特に論理積パターンと組み合わせると、数値範囲のマッチングに便利です：

```dart
String asciiCharType(int char) {
  const space = 32;
  const zero = 48;
  const nine = 57;

  return switch (char) {
    < space => 'control',
    == space => 'space',
    > space && < zero => 'punctuation',
    >= zero && <= nine => 'digit',
    _ => ''
  };
}
```

## キャスト

`foo as String`

キャスト・パターンを使えば、値を別のサブパターンに渡す前に、デストラクチャリングの途中で型キャストを挿入することができる：

```dart
(num, Object) record = (1, 's');
var (i as int, s as String) = record;
```

Castパターンは、値が指定された型を持っていない場合にスローします。null-assertパターンと同様に、これを使うと、構造化されていない値の期待される型を強制的にアサートすることができます。

## Nullチェック

`subpattern?`

Nullチェックパターンは、まず値がnullでないかどうかをマッチさせ、 それから同じ値に対して内部パターンをマッチさせます。このパターンを使うと、マッチする null 値の型が null でない基底型である変数をバインドすることができます。

NULL 値をスローせずにマッチ失敗として扱うには、NULL チェックパターンを使用します。

```dart
String? maybeString = 'nullable with base type String';
switch (maybeString) {
  case var s?:
  // 's'はここでは非NULLのString型である。
}
```

値がnullのときにマッチさせるには、定数パターンnullを使う。

## Nullアサート

`subpattern!`

Null-assertパターンは、まずオブジェクトがNULLでない場合にマッチし、次に値に対してマッチする。NULLでない値の通過は許可しますが、マッチした値がNULLの場合はスローします。

NULL 値が黙ってマッチ失敗として扱われないようにするには、 マッチ時に NULL-assert パターンを使用します：

```dart
List<String?> row = ['user', null];
switch (row) {
  case ['user', var name!]: // ...
  // name'はここではヌルでない文字列である。
}
```

変数宣言パターンからNULL値を取り除くには、NULL-assertパターンを使う：

```dart
(int?, int?) position = (2, 3);

var (x!, y!) = position;
```

値がnullのときにマッチさせるには、定数パターンnullを使う。

## 定数

`123, null, 'string', math.pi, SomeClass.constant, const Thing(1, 2), const (1 + 2)`

定数パターンは、値が定数と等しいときにマッチする：

```dart
switch (number) {
  // Matches if 1 == number.
  case 1: // ...
}
```

単純なリテラルや名前付き定数への参照は、定数パターンとして直接使用できる：

- 数値リテラル (`123`, `45.56`)
- ブール文字 (`true`)
- 文字列リテラル (`'string'`)
- 名前付き定数 (`someConstant`, `math.pi`, `double.infinity`)
- 定数コンストラクタ (`const Point(0, 0)`)
- 定数コレクション・リテラル (`const []`, `const {1, 2}`)

より複雑な定数式は括弧で囲み、その前にconst（`const (1 + 2)`）を付けなければならない：

```dart
// リストまたはマップパターン：
case [a, b]: // ...

// リストまたは地図リテラル：
case const [a, b]: // ...
```

## 変数

`var bar, String str, final int _`

変数パターンは、新しい変数を、マッチまたは構造化解除された値にバインドする。通常は、構造化解除された値をキャプチャするために、構造化解除パターンの一部として発生します。

変数は、パターンがマッチしたときにのみ到達可能なコード領域にスコープされます。

```dart
switch ((1, 2)) {
  // 'var a'と'var b'は、それぞれ1と2にバインドする変数パターンである。
  case (var a, var b): // ...
  // 'a'と'b'はケース本体のスコープ内にある。
}
```

型付き変数パターンは、マッチした値が宣言された型を持っている場合のみマッチし、そうでない場合は失敗する：

```dart
switch ((1, 2)) {
  // 一致しない。
  case (int a, String b): // ...
}
```

ワイルドカード・パターンを変数パターンとして使うことができる。

## 特定する

`foo, _`

識別子パターンは、出現する文脈によって、定数パターンのように振る舞うこともあれば、変数パターンのように振る舞うこともある：

- Declaration context: declares a new variable with identifier name: var (a, b) = (1, 2);
- Assignment context: assigns to existing variable with identifier name: (a, b) = (3, 4);
- Matching context: treated as a named constant pattern (unless its name is _):

```dart
const c = 1;
switch (2) {
  case c:
    print('match $c');
  default:
    print('no match'); // Prints "no match".
}
```

- Wildcard identifier in any context: matches any value and discards it: case [_, var y, _]: print('The middle element is $y');

## Parenthesized

`(subpattern)`

括弧で囲まれた式と同様に、パターン内の括弧でパターンの優先順位を制御し、より高い優先順位のパターンが期待される場所に、より低い優先順位のパターンを挿入することができます。

たとえば、ブーリアン定数x、y、zがそれぞれtrue、true、falseに等しいとする：

```dart
// ...
x || y && z => 'matches true',
(x || y) && z => 'matches false',
// ...
```

最初のケースでは、論理積 パターンの方が論理和 パターンよりも優先順位が高いため、論理積 パターン `y && z` が最初に評価される。次のケースでは、論理和パターンが括弧でくくられています。これは最初に評価され、異なるマッチになります。

## リスト

`[subpattern1, subpattern2]`

リストパターンはリストを実装する値にマッチし、そのサブパターンをリストの要素に再帰的にマッチさせて、位置によって構造を変えます：

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

リスト・パターンでは、パターン内の要素数がリスト全体と一致する必要があります。しかし、リスト内の任意の要素数を考慮するために、プレースホルダーとして残りの要素を使用することができます。

## Rest element

リスト・パターンには1つのレスト要素（...）を含めることができ、任意の長さのリストとマッチングさせることができる。

```dart
var [a, b, ..., c, d] = [1, 2, 3, 4, 5, 6, 7];
// Prints "1 2 6 7".
print('$a $b $c $d');
```

レスト要素は、リスト内の他のサブパターンにマッチしないエレメントを新しいリストに集めるサブパターンを持つこともできる：

```dart
var [a, b, ...rest, c, d] = [1, 2, 3, 4, 5, 6, 7];
// Prints "1 2 [3, 4, 5] 6 7".
print('$a $b $rest $c $d');
```

## Map

`{"key": subpattern1, someConst: subpattern2}`

MapパターンはMapを実装する値にマッチし、そのサブパターンをマップのキーに再帰的にマッチさせて、マップを構造化解除する。

マップパターンでは、パターンがマップ全体にマッチする必要はありません。マップパターンは、パターンにマッチしないマップのキーを無視します。

## Record

`(subpattern1, subpattern2)`

`(x: subpattern1, y: subpattern2)`

レコード・パターンはレコード・オブジェクトにマッチし、そのフィールドを再構築します。値がパターンと同じ形状のレコードでない場合、マッチは失敗します。そうでない場合は、フィールドのサブパターンがレコードの対応するフィールドとマッチします。

レコード パターンでは、パターンがレコード全体に一致する必要があります。パターンを使用して名前付きフィールドを持つレコードを再構築するには、パターンにフィールド名を含めます：

```dart
var (myString: foo, myNumber: bar) = (myString: 'string', myNumber: 1);
```

ゲッター名は省略可能で、フィールドサブパターンの変数パターンまたは識別子パターンから推測される。これらのパターンのペアはそれぞれ等価です：

```dart
// Record pattern with variable subpatterns:
var (untyped: untyped, typed: int typed) = record;
var (:untyped, :int typed) = record;

switch (record) {
  case (untyped: var untyped, typed: int typed): // ...
  case (:var untyped, :int typed): // ...
}

// Record pattern with null-check and null-assert subpatterns:
switch (record) {
  case (checked: var checked?, asserted: var asserted!): // ...
  case (:var checked?, :var asserted!): // ...
}

// Record pattern with cast subpattern:
var (untyped: untyped as int, typed: typed as String) = record;
var (:untyped as int, :typed as String) = record;
```

## オブジェクト

`SomeClass(x: subpattern1, y: subpattern2)`

オブジェクトパターンは、オブジェクトのプロパティのゲッターを使ってデータを構造化するために、マッチした値を指定された型と照合します。値が同じ型を持っていない場合は拒否されます。

```dart
switch (shape) {
  // Matches if shape is of type Rect, and then against the properties of Rect.
  case Rect(width: var w, height: var h): // ...
}
```

ゲッター名は省略可能で、フィールドサブパターンの変数パターンや識別子パターンから推測される：

```dart
// Binds new variables x and y to the values of Point's x and y properties.
var Point(:x, :y) = Point(1, 2);
```

オブジェクトパターンでは、パターンがオブジェクト全体にマッチする必要はありません。オブジェクトに余分なフィールドがあり、パターンがそれを構造化しない場合でも、マッチすることがあります。

## Wildcard

`_`

`_`という名前のパターンはワイルドカードで、変数パターンか識別子パターンのどちらかで、どの変数にもバインドしたり代入したりしない。

これは、後で位置値を再構築するためにサブパターンが必要な場所でのプレースホルダーとして便利である：

```dart
var list = [1, 2, 3];
var [_, two, _] = list;
```

型アノテーション付きのワイルドカード名は、値の型をテストしたいが、値を名前にバインドしたくない場合に便利です：

```dart
switch (record) {
  case (int _, String _):
    print('First field is int and second is String.');
}