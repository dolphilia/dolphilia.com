# 組み込み型

Dart言語には、以下の特別なサポートがある。:

- 数値 (int, double)
- 文字列 (String)
- 真偽値 (bool)
- レコード ((value1, value2))
- リスト (List, also known as arrays)
- Set (Set)
- Map (Map)
- Runes (Runes; often replaced by the characters API)
- シンボル (Symbol)
- Null値 (Null)

このサポートには、リテラルを使ってオブジェクトを作成する機能も含まれる。例えば、'this is a string'は文字列リテラルであり、trueはブーリアンリテラルである。

Dartではすべての変数がオブジェクト（クラスのインスタンス）を参照するため、通常はコンストラクタを使って変数を初期化できます。組み込み型の中には独自のコンストラクタを持つものがあります。例えば、マップを作成するには Map() コンストラクタを使用します。

他のいくつかの型もDart言語で特別な役割を持っている：

- Object: Null 以外のすべての Dart クラスのスーパークラスです。
- Enum: すべての列挙型のスーパークラス。
- Future と Stream: 非同期サポートで使用される。
- Iterable: for-inループおよび同期ジェネレータ関数で使用される。
- Never: 式の評価が正常に終了しないことを示す。常に例外を投げる関数によく使われます。
- dynamic: 静的チェックを無効にすることを示す。通常は`Object`または`Object?`を使用する。
- void: 値が使用されないことを示す。リターン・タイプとしてよく使われる。

Object、`Object?`、Null、Never の各クラスは、クラス階層の中で特別な役割を持っています。これらの役割については、Understanding null safety を参照してください。

## 数値

Dartの数値は2種類ある:

__int__:

64ビット以下の整数値は、プラットフォームによって異なります。ネイティブなプラットフォームでは、値は`-2 ^ 63`から`2 ^ 63 - 1`になります。ウェブでは、整数値はJavaScript数値（小数部のない64ビット浮動小数点値）として表現され、`-2 ^ 53`から`2 ^ 53 - 1`になります。

__double__:

IEEE 754規格で規定されている64ビット（倍精度）浮動小数点数。

intとdoubleはどちらもnumのサブタイプです。num型には+、-、/、*といった基本的な演算子があり、abs()、ceil()、floor()などのメソッドもここにある。(>>のようなビット演算子はintクラスで定義されています。) numとそのサブタイプにお探しのものがない場合は、dart:mathライブラリがあるかもしれません。

整数とは、小数点のない数値のことである。以下は整数リテラルを定義する例である：

```dart
var x = 1;
var hex = 0xDEADBEEF;
```

数値に小数が含まれる場合はdoubleとなる。以下にdoubleリテラルを定義する例を挙げる：

```dart
var y = 1.1;
var exponents = 1.42e5;
```

変数をnumとして宣言することもできる。こうすると、その変数は整数値と2倍値の両方を持つことができる。

```dart
num x = 1; // x は int と double の両方の値を持つ
x += 2.5;
```

整数リテラルは必要に応じて自動的に倍数に変換される：

```dart
double z = 1; // double z = 1.0に相当。
```

ここでは、文字列を数値に、またはその逆に変換する方法を説明する：

```dart
// String -> int
var one = int.parse('1');
assert(one == 1);

// String -> double
var onePointOne = double.parse('1.1');
assert(onePointOne == 1.1);

// int -> String
String oneAsString = 1.toString();
assert(oneAsString == '1');

// double -> String
String piAsString = 3.14159.toStringAsFixed(2);
assert(piAsString == '3.14');
```

int型は、従来のビットシフト（<<、>>、>>）、補数（~）、AND（&）、OR（｜）、XOR（^）演算子を指定し、ビットフィールドのフラグを操作したりマスクしたりするのに便利です。例えば

```dart
assert((3 << 1) == 6); // 0011 << 1 == 0110
assert((3 | 4) == 7); // 0011 | 0100 == 0111
assert((3 & 4) == 0); // 0011 & 0100 == 0000
```

その他の例については、ビット演算子とシフト演算子のセクションを参照のこと。

リテラル数値はコンパイル時定数である。オペランドが数値として評価されるコンパイル時定数である限り、多くの算術式もコンパイル時定数である。

```dart
const msPerSecond = 1000;
const secondsUntilRetry = 5;
const msUntilRetry = secondsUntilRetry * msPerSecond;
```

詳細については、Dartの数字を参照してください。

## 文字列

Dartの文字列（Stringオブジェクト）は、UTF-16コードユニットのシーケンスを保持します。文字列を作成するには、一重引用符または二重引用符を使用できます：

```dart
var s1 = '文字列リテラルにはシングルクォートが有効です。';
var s2 = "二重引用符も同様に機能する。";
var s3 = '文字列の\'区切り文字\'をエスケープするのは簡単だ。';
var s4 = "他の区切り文字を使う方がもっと簡単だ。";
```

式の値を文字列の中に入れるには、`${式}`を使います。式が識別子の場合は `{}` を省略できます。オブジェクトに対応する文字列を取得するには、Dart はオブジェクトの `toString()` メソッドを呼び出します。

```dart
var s = 'string interpolation';

assert('Dart has $s, which is very handy.' ==
    'Dart has string interpolation, '
        'which is very handy.');
assert('That deserves all caps. '
        '${s.toUpperCase()} is very handy!' ==
    'That deserves all caps. '
        'STRING INTERPOLATION is very handy!');
```

::: info Note
`==`演算子は、2つのオブジェクトが等価かどうかをテストする。2つの文字列が同じコード・ユニットのシーケンスを含んでいれば等価です。
:::

隣接する文字列リテラルまたは`+`演算子を使えば、文字列を連結することができる：

```dart
var s1 = 'String '
    'concatenation'
    " works even over line breaks.";
assert(s1 ==
    'String concatenation works even over '
        'line breaks.');

var s2 = 'The + operator ' + 'works, as well.';
assert(s2 == 'The + operator works, as well.');
```

複数行の文字列を作成するには、トリプルクォーテーションをシングルクォーテーションまたはダブルクォーテーションで囲みます：

```dart
var s1 = '''
You can create
multi-line strings like this one.
''';

var s2 = """This is also a
multi-line string.""";
```

文字列の前にrを付けると、「生の」文字列を作ることができる：

```dart
var s = r'In a raw string, not even \n gets special treatment.';
```

Unicode文字を文字列で表現する方法の詳細については、Runesとgraphemeクラスタを参照してください。

リテラル文字列は、補間された式がNULLまたは数値、文字列、ブーリアン値に評価されるコンパイル時定数である限り、コンパイル時定数である。

```dart
// これらはconst文字列で動作する。
const aConstNum = 0;
const aConstBool = true;
const aConstString = 'a constant string';

// これらはconst文字列では機能しない。
var aNum = 0;
var aBool = true;
var aString = 'a string';
const aConstList = [1, 2, 3];

const validConstString = '$aConstNum $aConstBool $aConstString';
// const invalidConstString = '$aNum $aBool $aString $aConstList';
```

文字列の使い方については、文字列と正規表現をご覧ください。

## 真偽値

ブーリアン値を表現するために、Dartにはboolという型があります。bool型を持つオブジェクトは、ブーリアン定数trueとfalseの2つだけで、どちらもコンパイル時の定数です。

Dartの型安全性は、if (nonbooleanValue)やassert (nonbooleanValue)のようなコードが使えないことを意味します。代わりに、次のように明示的に値をチェックします：

```dart
// 空文字列かどうかをチェックする。
var fullName = '';
assert(fullName.isEmpty);

// ゼロを確認する。
var hitPoints = 0;
assert(hitPoints <= 0);

// ヌルがないかチェックする。
var unicorn = null;
assert(unicorn == null);

// NaNをチェックする。
var iMeantToDoThis = 0 / 0;
assert(iMeantToDoThis.isNaN);
```


## Runesとgraphemeクラスタ

Dartでは、Runesは文字列のUnicodeコードポイントを公開します。文字パッケージを使用すると、Unicode（拡張）graphemeクラスタとしても知られる、ユーザーが認識する文字を表示したり操作したりすることができます。

Unicodeは、世界のすべての文字体系で使用される各文字、数字、記号に固有の数値を定義しています。Dartの文字列はUTF-16コードユニットの列なので、文字列内でUnicodeコードポイントを表現するには特別な構文が必要です。Unicodeコードポイントを表現する通常の方法は`uXXXX`で、XXXXは4桁の16進数値です。例えば、ハート文字 (♥) は ``u2665`` です。4桁以上の16進数を指定する場合は、中かっこに値を入れる。例えば、笑う絵文字(😆)は`u{1f606}`である。

個々のUnicode文字を読み書きする必要がある場合は、charactersパッケージによってStringに定義されたcharactersゲッターを使用してください。返されるCharactersオブジェクトは、一連のgraphemeクラスタとしての文字列です。文字APIの使用例を以下に示します：

```dart
import 'package:characters/characters.dart';

void main() {
  var hi = 'Hi 🇩🇰';
  print(hi);
  print('The end of the string: ${hi.substring(hi.length - 1)}');
  print('The last character: ${hi.characters.last}');
}
```

出力は環境にもよるが、次のようになる：

```sh
$ dart run bin/main.dart
Hi 🇩🇰
The end of the string: ???
The last character: 🇩🇰
```

文字列を操作するためのcharactersパッケージの使い方については、charactersパッケージのサンプルとAPIリファレンスを参照してください。

## シンボル

Symbolオブジェクトは、Dartプログラムで宣言された演算子や識別子を表します。シンボルを使用する必要はないかもしれませんが、最小化によって識別子の名前は変更されますが、識別子のシンボルは変更されないため、識別子を名前で参照するAPIには非常に有用です。

識別子のシンボルを取得するには、シンボル・リテラルを使用します。, これは`#`の後に識別子が続くだけである：

```txt
#radix
#bar
```

シンボル・リテラルはコンパイル時の定数である。