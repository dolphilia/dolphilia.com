# コレクション

Dartはリスト、セット、マップコレクションをビルトインでサポートしています。コレクションに含まれる型の設定については、 Generics を参照してください。

## リスト

おそらく、ほぼすべてのプログラミング言語で最も一般的なコレクションは、配列、つまりオブジェクトの順序付けられたグループです。Dartでは配列はListオブジェクトなので、ほとんどの人は単にリストと呼んでいます。

Dartのリスト・リテラルは、角括弧`（[]）`で囲まれた、カンマで区切られた式または値のリストで示されます。以下に簡単なDartリストを示します：

```dart
var list = [1, 2, 3];
```

::: info Note
Dartはリストが `List<int>` 型であると推測する。このリストに非整数のオブジェクトを追加しようとすると、アナライザやランタイムはエラーを発生させます。詳細は型推論を参照してください。
:::

Dartコレクションリテラルの最後の項目の後にカンマを追加することができます。この末尾のカンマはコレクションには影響しませんが、コピー・ペースト・エラーを防ぐのに役立ちます。

```dart
var list = [
  'Car',
  'Boat',
  'Plane',
];
```

リストはゼロ・ベースのインデックスを使用し、0が最初の値のインデックス、`list.length - 1`が最後の値のインデックスとなります。`.length`プロパティを使用してリストの長さを取得し、添え字演算子`（[]）`を使用してリストの値にアクセスできます：

```dart
var list = [1, 2, 3];
assert(list.length == 3);
assert(list[1] == 2);

list[1] = 1;
assert(list[1] == 1);
```

コンパイル時定数のリストを作るには、リスト・リテラルの前にconstを加える：

```dart
var constantList = const [1, 2, 3];
// constantList[1] = 1; // この行はエラーとなる。
```

リストの詳細については、dart:coreドキュメントのリストのセクションを参照してください。

## セット

Dartにおけるセットとは、ユニークなアイテムの順序付けされていないコレクションのことです。Dartのセットサポートは、セットリテラルとセット型によって提供されます。

以下は、セットリテラルを使用して作成された、単純なDartセットです：

```dart
var halogens = {'fluorine', 'chlorine', 'bromine', 'iodine', 'astatine'};
```

::: info Note
Dart は halogens が `Set<String>` 型であると推測します。間違った型の値をセットに追加しようとすると、アナライザやランタイムはエラーを発生します。詳細については、型推論を参照してください。
:::

空集合を作るには、`{}`の前に型引数をつけるか、`{}`をSet型の変数に代入する：

```dart
var names = <String>{};
// Set<String> names = {}; // これも有効だ。
// var names = {}; // セットではなくマップを作成する。
```

::: info セットまたはマップ?
マップ・リテラルの構文はセット・リテラルの構文と似ている。マップ・リテラルの方が先なので、`{}`のデフォルトはMap型です。型アノテーションや代入先の変数を忘れると、Dart は `Map<dynamic, dynamic>` 型のオブジェクトを作成します。
:::

`add()` メソッドまたは `addAll()` メソッドを使用して、既存のセットに項目を追加します：

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
```

`.length`を使ってセット内のアイテム数を取得する：

```dart
var elements = <String>{};
elements.add('fluorine');
elements.addAll(halogens);
assert(elements.length == 5);
```

コンパイル時定数のセットを作成するには、セット・リテラルの前にconstを追加する：

```dart
final constantSet = const {
  'fluorine',
  'chlorine',
  'bromine',
  'iodine',
  'astatine',
};
// constantSet.add('helium'); // この行はエラーとなる。
```

セットの詳細については、dart:core ドキュメントの Sets セクションを参照してください。

## マップ

一般的に、マップはキーと値を関連付けるオブジェクトである。キーも値も、どんなタイプのオブジェクトでも構わない。各キーは一度しか出現しませんが、同じ値を複数回使用することができます。Dartのマップのサポートは、マップ・リテラルとマップ・タイプによって提供されます。

以下は、マップ・リテラルを使って作成した、いくつかの簡単なDartマップである：

```dart
var gifts = {
  // Key:    Value
  'first': 'partridge',
  'second': 'turtledoves',
  'fifth': 'golden rings'
};

var nobleGases = {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};
```

::: info Note
Dartは、giftsが`Map<String, String>`型で、nobleGasesが`Map<int, String>`型であると推測します。どちらかのマップに間違った型の値を追加しようとすると、アナライザやランタイムはエラーを発生させます。詳細については、型推論についてを読んでください。
:::

Mapコンストラクタを使って同じオブジェクトを作ることができる：

```dart
var gifts = Map<String, String>();
gifts['first'] = 'partridge';
gifts['second'] = 'turtledoves';
gifts['fifth'] = 'golden rings';

var nobleGases = Map<int, String>();
nobleGases[2] = 'helium';
nobleGases[10] = 'neon';
nobleGases[18] = 'argon';
```

::: info Note
C#やJavaのような言語から来た人は、単なる`Map()`ではなく、`new Map()`を見ることを期待するかもしれない。Dartでは、newキーワードはオプションです。詳細はコンストラクタを使用するを参照してください。
:::

添え字代入演算子 `([]=)` を使用して、既存のマップに新しいキーと値のペアを追加します：

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds'; // キーと値のペアを追加する
```

添え字演算子 `([])` を使用して、マップから値を取得します：

```dart
var gifts = {'first': 'partridge'};
assert(gifts['first'] == 'partridge');
```

マップにないキーを探すと、`null`が返ってくる：

```dart
var gifts = {'first': 'partridge'};
assert(gifts['fifth'] == null);
```

`.length`を使用して、マップ内のキーと値のペアの数を取得します：

```dart
var gifts = {'first': 'partridge'};
gifts['fourth'] = 'calling birds';
assert(gifts.length == 2);
```

コンパイル時定数のマップを作成するには、マップ・リテラルの前に`const`を追加する：

```dart
final constantMap = const {
  2: 'helium',
  10: 'neon',
  18: 'argon',
};

// constantMap[2] = 'Helium'; // この行はエラーとなる。
```

マップの詳細については、dart:coreドキュメントのマップセクションを参照してください。

## オペレーター

### スプレッド演算子

Dart は、リスト、マップ、およびセット・リテラルでスプレッド演算子 (...) およびヌル対応スプレッド演算子 (...?) をサポートしています。スプレッド演算子は、コレクションに複数の値を挿入する簡潔な方法を提供します。

たとえば、スプレッド演算子（...）を使うと、あるリストのすべての値を別のリストに挿入することができます：

```dart
var list = [1, 2, 3];
var list2 = [0, ...list];
assert(list2.length == 4);
```

スプレッド演算子の右側の式がNULLになる可能性がある場合は、NULL対応のスプレッド演算子（...？）

```dart
var list2 = [0, ...?list];
assert(list2.length == 1);
```

スプレッド演算子の詳細と使用例については、スプレッド演算子の提案を参照のこと。

### フロー制御オペレーター

Dartには、リスト、マップ、およびセット・リテラルで使用するコレクションifとコレクションforがあります。これらの演算子を使用すると、条件（if）と繰り返し（for）を使用してコレクションを構築できます。

以下は、コレクション if を使用して、3つまたは4つの項目を持つリストを作成する例です：

```dart
var nav = ['Home', 'Furniture', 'Plants', if (promoActive) 'Outlet'];
```

Dartは、コレクション・リテラル内のifケースもサポートしている：

```dart
var nav = ['Home', 'Furniture', 'Plants', if (login case 'Manager') 'Inventory'];
```

以下は、コレクションのforを使って、リストの項目を操作してから別のリストに追加する例である：

```dart
var listOfInts = [1, 2, 3];
var listOfStrings = ['#0', for (var i in listOfInts) '#$i'];
assert(listOfStrings[1] == '#1');
```

コレクション if と for の詳細と使用例については、コントロール・フロー・コレクションの提案を参照してください。