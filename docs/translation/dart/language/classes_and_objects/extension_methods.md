# 拡張メソッド

拡張メソッドは、既存のライブラリに機能を追加するものです。知らず知らずのうちに拡張メソッドを使っているかもしれない。例えば、IDEでコード補完を使うと、通常のメソッドと一緒に拡張メソッドも提案してくれます。

ビデオを見るのが勉強になるという方は、[拡張メソッドの概要]()をご覧ください。

## 概要

他人のAPIを使う場合や、広く使われているライブラリを実装する場合、APIを変更するのは現実的でなかったり、不可能だったりすることが多い。しかし、それでも何らかの機能を追加したいと思うかもしれない。

例えば、文字列を解析して整数に変換する次のコードを考えてみよう：

```dart
int.parse('42')
```

その機能をStringに持たせれば、より短く、ツールも使いやすくなる：

```dart
'42'.parseInt()
```

このコードを有効にするには、Stringクラスの拡張を含むライブラリをインポートすればよい：

```dart
import 'string_apis.dart';
// ···
print('42'.parseInt()); // Use an extension method.
```

エクステンションはメソッドだけでなく、ゲッター、セッター、演算子など他のメンバーも定義できる。また、拡張モジュールには名前をつけることができます。これは、API の衝突が発生したときに役立ちます。ここでは、拡張メソッド parseInt() を、文字列を操作する拡張モジュール (NumberParsing という名前) を使用して実装します：

```dart
// lib/string_apis.dart
extension NumberParsing on String {
  int parseInt() {
    return int.parse(this);
  }
  // ···
}
```

次のセクションでは、拡張メソッドの使い方について説明する。そのあとは、拡張メソッドの実装についてのセクションです。

## 拡張メソッドを使う

すべての Dart コードと同様に、拡張メソッドはライブラリにあります。拡張メソッドの使い方はすでに説明しました。そのライブラリのメソッドをインポートして、普通のメソッドと同じように使います：

```dart
// Import a library that contains an extension on String.
import 'string_apis.dart';
// ···
print('42'.padLeft(5)); // Use a String method.
print('42'.parseInt()); // Use an extension method.
```

通常、拡張メソッドを使うために必要な知識はこれだけだ。コードを書いていくうちに、拡張メソッドが（動的なものとは対照的に）静的な型にどのように依存するのか、APIの衝突をどのように解決するのかについても知っておく必要があるかもしれません。

## スタティック・タイプとダイナミック・タイプ

dynamic型の変数に対して拡張メソッドを呼び出すことはできない。例えば、以下のコードは実行時例外になります：

```dart
dynamic d = '2';
print(d.parseInt()); // Runtime exception: NoSuchMethodError
```

拡張メソッドはDartの型推論で動作します。変数vはString型であると推論されるので、以下のコードは問題ありません：

```dart
var v = '2';
print(v.parseInt()); // Output: 2
```

ダイナミックでうまくいかない理由は、拡張メソッドはレシーバーの静的型に対して解決されるからだ。拡張メソッドは静的に解決されるため、静的な関数を呼び出すのと同じ速さだ。

静的型と動的の詳細については、Dart型システムを参照してください。

## APIの競合

エクステンション・メンバーがインターフェースや他のエクステンション・メンバーと衝突する場合、いくつかの選択肢があります。

そのひとつは、競合するエクステンションのインポート方法を変更することです：

```dart
// Defines the String extension method parseInt().
import 'string_apis.dart';

// Also defines parseInt(), but hiding NumberParsing2
// hides that extension method.
import 'string_apis_2.dart' hide NumberParsing2;

// ···
// Uses the parseInt() defined in 'string_apis.dart'.
print('42'.parseInt());
```

もうひとつの選択肢は、拡張機能を明示的に適用することで、あたかも拡張機能がラッパークラスであるかのようなコードになる：

```dart
// Both libraries define extensions on String that contain parseInt(),
// and the extensions have different names.
import 'string_apis.dart'; // Contains NumberParsing extension.
import 'string_apis_2.dart'; // Contains NumberParsing2 extension.

// ···
// print('42'.parseInt()); // Doesn't work.
print(NumberParsing('42').parseInt());
print(NumberParsing2('42').parseInt());
```

両方の拡張子が同じ名前である場合、プレフィックスを使ってインポートする必要があるかもしれません：

```dart
// Both libraries define extensions named NumberParsing
// that contain the extension method parseInt(). One NumberParsing
// extension (in 'string_apis_3.dart') also defines parseNum().
import 'string_apis.dart';
import 'string_apis_3.dart' as rad;

// ···
// print('42'.parseInt()); // Doesn't work.

// Use the ParseNumbers extension from string_apis.dart.
print(NumberParsing('42').parseInt());

// Use the ParseNumbers extension from string_apis_3.dart.
print(rad.NumberParsing('42').parseInt());

// Only string_apis_3.dart has parseNum().
print('42'.parseNum());
```

この例が示すように、プレフィックスを使ってインポートしても、暗黙的に拡張メソッドを呼び出すことができます。プレフィックスを使用する必要があるのは、明示的に拡張モジュールをコールする際に 名前が衝突しないようにするためだけです。

## 拡張メソッドの実装

エクステンションを作成するには、以下の構文を使用します：

```txt
extension <extension name>? on <type> {
  (<member definition>)*
}
```

例えば、Stringクラスの拡張機能を実装する方法を以下に示す：

```dart
// lib/string_apis.dart
extension NumberParsing on String {
  int parseInt() {
    return int.parse(this);
  }

  double parseDouble() {
    return double.parse(this);
  }
}
```

拡張モジュールのメンバには、メソッド、ゲッター、セッター、演算子があります。エクステンションは静的フィールドや静的ヘルパーメソッドを持つこともできます。拡張モジュール宣言の外部で静的メンバにアクセスするには、クラス変数やメソッドと同じように宣言名で呼び出します。

## 無名のエクステンション

エクステンションを宣言するとき、名前を省略することができます。名前のないエクステンションは、宣言されたライブラリでのみ表示されます。名前を持たないので、APIの衝突を解決するために明示的に適用することはできません。

```dart
extension on String {
  bool get isBlank => trim().isEmpty;
}
```

::: info Note
無名拡張モジュールの静的メンバを呼び出せるのは、拡張モジュールの宣言内だけです。
:::

## 汎用エクステンションの実装

拡張モジュールはジェネリックな型パラメータを持つことができます。例えば、組み込みの` List<T>` 型をゲッター、演算子、メソッドで拡張したコードを以下に示します：

```dart
extension MyFancyList<T> on List<T> {
  int get doubleLength => length * 2;
  List<T> operator -() => reversed.toList();
  List<List<T>> split(int at) => [sublist(0, at), sublist(at)];
}
```

型Tは、メソッドが呼び出されるリストの静的型に基づいてバインドされる。

## リソース

エクステンション・メソッドの詳細については、以下を参照のこと：

- 記事: Dart拡張メソッドの基礎
- 機能仕様
- 拡張メソッドのサンプル