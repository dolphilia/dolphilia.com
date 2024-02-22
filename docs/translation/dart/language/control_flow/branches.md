# 分岐

このページでは、ブランチを使ってDartコードの流れを制御する方法を紹介します：

- if文と要素
- if-case文と要素
- switch文と式

また、Dartの制御フローを操作することもできる：

- forやwhileなどのループ
- try、catch、throwなどの例外処理

## if

Dartでは、if文にオプションでelse句を付けることができる。ifの後の括弧内の条件は、ブール値として評価される式でなければなりません：

```dart
if (isRaining()) {
  you.bringRainCoat();
} else if (isSnowing()) {
  you.wearJacket();
} else {
  car.putTopDown();
}
```

式のコンテキストでのifの使い方については、条件式をご覧ください。

## if-case

Dartのif文は、パターンに続くcase句をサポートしている：

```dart
if (pair case [int x, int y]) return Point(x, y);
```

もしパターンが値にマッチすれば、そのパターンが定義した変数をスコープに入れて分岐が実行される。

前の例では、リスト・パターン`[int x, int y]`は値のペアにマッチするので、分岐の戻り値`Point(x, y)`はパターンが定義した変数xとyで実行される。

そうでない場合は、実行するelse分岐があればそちらに制御フローが進む：

```dart
if (pair case [int x, int y]) {
  print('Was coordinate array $x,$y');
} else {
  throw FormatException('Invalid coordinates.');
}
```

if-case文は、1つのパターンに対してマッチとデストラクチャを行う方法を提供する。複数のパターンに対して値をテストするには switch を使う。

::: info Version note
if文のcase句には、少なくとも3.0以上の言語バージョンが必要です。
:::

## switchステートメント

switch文は、一連のcaseに対して値式を評価する。各 case 節は、マッチする値のパターンです。caseにはどのようなパターンでも使用できます。

値がcaseのパターンにマッチすると、case本体が実行される。空でない case 節は、完了後にスイッチの最後にジャンプします。break文は必要ありません。空でないcase句を終了させる他の有効な方法は、continue、throw、return文です。

case句がマッチしない場合にコードを実行するには、デフォルトまたはワイルドカードの_句を使用します：

```dart
var command = 'OPEN';
switch (command) {
  case 'CLOSED':
    executeClosed();
  case 'PENDING':
    executePending();
  case 'APPROVED':
    executeApproved();
  case 'DENIED':
    executeDenied();
  case 'OPEN':
    executeOpen();
  default:
    executeUnknown();
}
```

空のケースは次のケースにフォールスルーされるため、ケースはボディを共有できる。フォールスルーしない空のケースには、breakを使用する。非連続的なフォールスルーには、continue文とラベルを使うことができる：

```dart
switch (command) {
  case 'OPEN':
    executeOpen();
    continue newCase; // Continues executing at the newCase label.

  case 'DENIED': // Empty case falls through.
  case 'CLOSED':
    executeClosed(); // Runs for both DENIED and CLOSED,

  newCase:
  case 'PENDING':
    executeNowClosed(); // Runs for both OPEN and PENDING.
}
```

論理和パターンを使用すると、ケースでボディやガードを共有することができます。パターンと case 節の詳細については、Switch 文と式のパターンのドキュメントを参照してください。

## 表現の切り替え

switch式は、どのcaseにマッチしても、式本体に基づいて値を生成します。switch式は、式文の先頭を除き、Dartで式を使用できる場所であればどこでも使用できます。例えば

```dart
var x = switch (y) { ... };

print(switch (x) { ... });

return switch (x) { ... };
```

式文の最初にスイッチを使いたい場合は、switch文を使う。

switch式を使うと、switch文を次のように書き換えることができる：

```dart
// Where slash, star, comma, semicolon, etc., are constant variables...
switch (charCode) {
  case slash || star || plus || minus: // Logical-or pattern
    token = operator(charCode);
  case comma || semicolon: // Logical-or pattern
    token = punctuation(charCode);
  case >= digit0 && <= digit9: // Relational and logical-and patterns
    token = number();
  default:
    throw FormatException('Invalid');
}
```

このように表現する：

```dart
token = switch (charCode) {
  slash || star || plus || minus => operator(charCode),
  comma || semicolon => punctuation(charCode),
  >= digit0 && <= digit9 => number(),
  _ => throw FormatException('Invalid')
};
```

switch式の構文は、switch文の構文とは異なる：

- ケースはcaseキーワードでは始まらない。
- case 本体は、一連の文ではなく、単一の式です。
- 各ケースには必ずボディが必要で、空のケースに対する暗黙のフォールスルーはありません。
- ケース・パターンは、: の代わりに `=>` を使用して本体と区切られます。
- ケースは `,` で区切られる（オプションで末尾に , を付けることもできる）。
- デフォルトのケースは、デフォルトと`_`の両方を使用できる代わりに、`_`のみを使用することができます。

::: info Version note
スイッチ式には、少なくとも3.0以上の言語バージョンが必要です。
:::

## 網羅性チェック

網羅性チェックは、ある値がスイッチに入る可能性があるにもかかわらず、どのケースにもマッチしない場合にコンパイル時エラーを報告する機能である。

```dart
// Non-exhaustive switch on bool?, missing case to match null possibility:
switch (nullableBool) {
  case true:
    print('yes');
  case false:
    print('no');
}
```

デフォルトのケース（`default`または`_`）は、スイッチを通過する可能性のあるすべての値をカバーする。これにより、どのような型のスイッチも網羅的になる。

列挙型とsealed型はスイッチに特に有用です。なぜなら、デフォルト・ケースがなくても、それらの可能な値は既知であり、完全に列挙可能だからです。あるクラスでsealed修飾子を使用すると、そのクラスのサブタイプを切り替えるときに網羅性チェックを行うことができます：

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

誰かがShapeの新しいサブクラスを追加した場合、このスイッチ式は不完全なものになる。網羅性チェックによって、足りないサブタイプが通知される。これにより、Dartをやや関数的な代数的データ型のスタイルで使用することができる。

## ガード節

case 節の後にオプションのガード節を設定するには、キーワード when を使用する。ガード節は、if caseやswitch文、式の後に続くことができます。

```dart
// Switch statement:
switch (something) {
  case somePattern when some || boolean || expression:
    //             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Guard clause.
    body;
}

// Switch expression:
var value = switch (something) {
  somePattern when some || boolean || expression => body,
  //               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Guard clause.
}

// If-case statement:
if (something case somePattern when some || boolean || expression) {
  //                           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Guard clause.
  body;
}
```

ガードは、マッチング後に任意のブーリアン式を評価します。これにより、ケース本体が実行されるべきかどうかの制約をさらに追加することができます。ガード節がfalseと評価されると、スイッチ全体を終了するのではなく、次のケースに進みます。