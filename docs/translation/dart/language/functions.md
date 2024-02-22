# 関数

Dartは真のオブジェクト指向言語なので、関数もオブジェクトであり、Functionという型を持つ。つまり、関数を変数に代入したり、他の関数の引数として渡すことができます。また、Dartクラスのインスタンスを関数のように呼び出すこともできます。詳細については、呼び出し可能なオブジェクトを参照してください。

関数を実装する例を挙げよう：

```dart
bool isNoble(int atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

Effective DartはパブリックAPIに型アノテーションを付けることを推奨しているが、この関数は型を省略しても動作する：

```dart
isNoble(atomicNumber) {
  return _nobleGases[atomicNumber] != null;
}
```

式を1つだけ含む関数では、省略記法が使えます：

```dart
bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
```

`=>` expr構文は`{ return expr; }`の省略記法である。この表記法はアロー構文と呼ばれることもある。

:: info Note
矢印（`=>`）とセミコロン（`;`）の間には、ステートメントではなく、式だけを書くことができる。たとえば、if文をここに書くことはできないが、条件式を使うことはできる。
:::

## Parameters

関数は、必要な位置パラメーターをいくつでも持つことができる。これらのパラメータは、名前付きパラメータか、オプションの位置パラメータに続くことができる（両方は不可）。

::: info Note
APIによっては、特にFlutterのウィジェットコンストラクタのように、必須パラメータであっても名前付きパラメータしか使わないものもある。詳しくは次のセクションを参照してください。
:::

関数に引数を渡すときや、関数のパラメータを定義するときに、末尾にカンマを使うことができます。

## 名前付きパラメータ

名前付きパラメータは、明示的に必須とマークされていない限りオプションである。

関数を定義する際には、`{param1, param2, ...}`を使用して名前付きパラメータを指定します。デフォルト値を指定しなかったり、名前付きパラメータを必須とマークしたりした場合、デフォルト値はnullになるため、それらの型はnullableでなければなりません：

```dart
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool? bold, bool? hidden}) {...}
```

関数を呼び出す際には、paramName: valueで名前付き引数を指定することができます。例えば

```dart
enableFlags(bold: true, hidden: false);
```

null以外の名前付きパラメータのデフォルト値を定義するには、`=`を使ってデフォルト値を指定する。指定する値はコンパイル時定数でなければならない。例えば

```dart
/// Sets the [bold] and [hidden] flags ...
void enableFlags({bool bold = false, bool hidden = false}) {...}

// bold will be true; hidden will be false.
enableFlags(bold: true);
```

代わりに、名前付きパラメータを必須とし、呼び出し元がパラメータの値を提供することを要求する場合は、requiredとアノテーションする：

```dart
const Scrollbar({super.key, required Widget child});
```

child引数を指定せずにスクロールバーを作成しようとすると、アナライザが問題を報告します。

::: info Note
requiredとマークされたパラメータは、まだnull可能である可能性があります：

```dart
const Scrollbar({super.key, required Widget? child});
```
:::

位置引数を最初に置きたいと思うかもしれないが、Dartはそれを要求しない。Dartでは、APIに合った名前付き引数を引数リストの任意の場所に置くことができます：

```dart
repeat(times: 2, () {
  ...
});
```

## オプションの位置パラメーター

関数パラメータを `[]` で囲むと、オプションの位置パラメータとして扱われます。デフォルト値を指定しない場合、デフォルト値はnullになるので、それらの型はnullableでなければなりません：

```dart
String say(String from, String msg, [String? device]) {
  var result = '$from says $msg';
  if (device != null) {
    result = '$result with a $device';
  }
  return result;
}
```

この関数をオプションのパラメーターなしで呼び出す例を以下に示す：

```dart
assert(say('Bob', 'Howdy') == 'Bob says Howdy');
```

そして、この関数を3番目のパラメーターで呼び出す例を以下に示す：

```dart
assert(say('Bob', 'Howdy', 'smoke signal') ==
    'Bob says Howdy with a smoke signal');
```

null以外のオプションの位置パラメーターのデフォルト値を定義するには、`=`を使ってデフォルト値を指定する。指定する値はコンパイル時定数でなければならない。例えば

```dart
String say(String from, String msg, [String device = 'carrier pigeon']) {
  var result = '$from says $msg with a $device';
  return result;
}

assert(say('Bob', 'Howdy') == 'Bob says Howdy with a carrier pigeon');
```

## main()関数

すべてのアプリにはトップレベルの`main()`関数が必要です。`main()`関数は`void`を返し、オプションで引数の`List<String>`パラメータを持ちます。

ここに簡単な`main()`関数がある：

```dart
void main() {
  print('Hello, World!');
}
```

以下は、引数を取るコマンドライン・アプリの`main()`関数の例である：


```dart
// args.dart
// Run the app like this: dart run args.dart 1 test
void main(List<String> arguments) {
  print(arguments);

  assert(arguments.length == 2);
  assert(int.parse(arguments[0]) == 1);
  assert(arguments[1] == 'test');
}
```

コマンドライン引数の定義と解析には args ライブラリを使用できる。

## 第一級オブジェクトとしての関数

関数を別の関数のパラメータとして渡すことができます。例えば

```dart
void printElement(int element) {
  print(element);
}

var list = [1, 2, 3];

// printElement をパラメータとして渡す。
list.forEach(printElement);
```

また、次のように関数を変数に代入することもできる：

```dart
var loudify = (msg) => '!!! ${msg.toUpperCase()} !!!';
assert(loudify('hello') == '!!! HELLO !!!');
```

この例では無名関数を使っている。無名関数については次のセクションで説明する。

## 無名機能

ほとんどの関数は、main()やprintElement()のように名前が付けられている。無名関数、あるいはラムダやクロージャと呼ばれる無名の関数を作成することもできます。例えば、無名関数を変数に代入して、コレクションに追加したり削除したりすることができます。

無名関数は、名前付き関数に似ている。0個以上のパラメーターをカンマで区切り、オプションの型注釈を括弧で囲む。

その後に続くコード・ブロックが関数本体です：

```dart
([[Type] param1[, …]]) {
  codeBlock;
};
```

次の例では、itemという型付きでないパラメータを持つ無名関数を定義し、それをmap関数に渡している。この関数は、リストの各項目に対して呼び出され、各文字列を大文字に変換します。そして、forEachに渡された無名関数の中で、変換された文字列が長さとともに出力されます。

```dart
const list = ['apples', 'bananas', 'oranges'];
list.map((item) {
  return item.toUpperCase();
}).forEach((item) {
  print('$item: ${item.length}');
});
```

関数に式やreturn文が1つしか含まれていない場合は、矢印記法を使って短縮することができます。次の行をDartPadに貼り付け、実行をクリックして関数と等価であることを確認してください。

```dart
list
    .map((item) => item.toUpperCase())
    .forEach((item) => print('$item: ${item.length}'));
```

## レキシカル・スコープ

つまり、変数のスコープはコードのレイアウトによって静的に決定される。変数がスコープ内にあるかどうかを確認するには、「中括弧を外側にたどる」ことができる。

以下は、各スコープ・レベルに変数を持つ関数を入れ子にした例です：

```dart
bool topLevel = true;

void main() {
  var insideMain = true;

  void myFunction() {
    var insideFunction = true;

    void nestedFunction() {
      var insideNestedFunction = true;

      assert(topLevel);
      assert(insideMain);
      assert(insideFunction);
      assert(insideNestedFunction);
    }
  }
}
```

nestedFunction()が、トップレベルまでのすべてのレベルの変数を使用できることに注目してほしい。

## レキシカル・クロージャー

クロージャとは、その関数が本来のスコープ外で使用される場合でも、レキシカル・スコープ内の変数にアクセスできる関数オブジェクトのことである。

関数は、周囲のスコープで定義された変数をクローズすることができる。以下の例では、makeAdder()が変数addByをキャプチャしている。返された関数がどこに行っても、addByを覚えている。

```dart
/// Returns a function that adds [addBy] to the
/// function's argument.
Function makeAdder(int addBy) {
  return (int i) => addBy + i;
}

void main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}
```

## 関数が等しいかどうかのテスト

トップレベル関数、スタティック・メソッド、インスタンス・メソッドが等しいかどうかをテストする例を示します：

```dart
void foo() {} // トップレベルの関数

class A {
  static void bar() {} // 静的メソッド
  void baz() {} // インスタンス・メソッド
}

void main() {
  Function x;

  // トップレベルの関数を比較する。
  x = foo;
  assert(foo == x);

  // 静的メソッドの比較。
  x = A.bar;
  assert(A.bar == x);

  // インスタンスメソッドの比較。
  var v = A(); // Instance #1 of A
  var w = A(); // Instance #2 of A
  var y = w;
  x = w.baz;

  // These closures refer to the same instance (#2),
  // so they're equal.
  assert(y.baz == x);

  // These closures refer to different instances,
  // so they're unequal.
  assert(v.baz != w.baz);
}
```

## 戻り値

すべての関数は値を返す。戻り値が指定されない場合は、関数本体に return null; という文が暗黙のうちに付加されます。

```dart
foo() {}

assert(foo() == null);
```

関数で複数の値を返すには、レコード内の値を集約します。

```dart
(String, int) foo() {
  return ('something', 42);
}
```

## ジェネレータ

一連の値を簡単に生成する必要がある場合は、ジェネレータ関数の使用を検討してください。Dartには、2種類のジェネレータ関数が組み込まれています：

- 同期ジェネレータ: Iterable オブジェクトを返します。
- 非同期ジェネレーター: Stream オブジェクトを返します。

同期ジェネレーター関数を実装するには、関数本体を`sync*`とマークし、`yield`文を使って値を送出する：

```dart
Iterable<int> naturalsTo(int n) sync* {
  int k = 0;
  while (k < n) yield k++;
}
```

非同期ジェネレーター関数を実装するには、関数本体を`async*`としてマークし、`yield`文を使って値を渡す：

```dart
Stream<int> asynchronousNaturalsTo(int n) async* {
  int k = 0;
  while (k < n) yield k++;
}
```

ジェネレーターが再帰的な場合、`yield*`を使用することでパフォーマンスを向上させることができます：

```dart
Iterable<int> naturalsDownFrom(int n) sync* {
  if (n > 0) {
    yield n;
    yield* naturalsDownFrom(n - 1);
  }
}
```

## 外部機能

外部関数は、宣言とは別に本体が実装される関数である。関数宣言の前にexternalキーワードを次のように記述します：

```dart
external void someFunc(int i);
```

外部関数の実装は、他の Dart ライブラリや、より一般的には他の言語から取得することができます。相互運用のコンテキストでは、外部関数は外部関数や外部値の型情報を導入し、それらを Dart で使用できるようにします。実装や使用方法はプラットフォームによって大きく異なるため、C や JavaScript などの interop ドキュメントを参照してください。

外部関数には、トップレベル関数、インスタンスメソッド、ゲッター、セッター、リダイレクトしないコンストラクターがあります。インスタンス変数も外部変数にすることができ、これは外部ゲッターと（変数がfinalでない場合は）外部セッターに相当します。