# コメント

Dartは1行コメント、複数行コメント、ドキュメント・コメントをサポートしています。

## 単一行コメント

単一行コメントは `//` で始まります。Dartコンパイラは、`//`から行末までの間をすべて無視します。

``` dart
void main() {
  // TODO: refactor into an AbstractLlamaGreetingFactory?
  print('Welcome to my Llama farm!');
}
```

## 複数行コメント

複数行コメントは `/*` で始まり、`*/` で終わります。`/*`と`*/`の間は、Dartコンパイラによって無視されます（ただし、そのコメントがドキュメント・コメントである場合を除きます。）複数行コメントは入れ子にすることができます。

```dart
void main() {
  /*
   * This is a lot of work. Consider raising chickens.

  Llama larry = Llama();
  larry.feed();
  larry.exercise();
  larry.clean();
   */
}
```

## 文書コメント

ドキュメントコメントは `///` または `/**` で始まる複数行または1行のコメントです。連続した行で `///` を使用すると、複数行のドキュメントコメントと同じ効果があります。

ドキュメント・コメント内では、括弧で囲まれていない限り、アナライザーはすべてのテキストを無視します。括弧を使用すると、クラス、メソッド、フィールド、トップレベル変数、関数、パラメー タを参照することができます。括弧内の名前は、ドキュメント化されたプログラム要素のレキシカル・スコープで解決されます。

以下は、他のクラスや引数を参照したドキュメント・コメントの例です：

```dart
/// A domesticated South American camelid (Lama glama).
///
/// Andean cultures have used llamas as meat and pack
/// animals since pre-Hispanic times.
///
/// Just like any other animal, llamas need to eat,
/// so don't forget to [feed] them some [Food].
class Llama {
  String? name;

  /// Feeds your llama [food].
  ///
  /// The typical llama eats one bale of hay per week.
  void feed(Food food) {
    // ...
  }

  /// Exercises your llama with an [activity] for
  /// [timeLimit] minutes.
  void exercise(Activity activity, int timeLimit) {
    // ...
  }
}
```

クラスの生成ドキュメントでは、feed はfeedメソッドのドキュメントへのリンクになり、FoodはFoodクラスのドキュメントへのリンクになります。

Dart コードを解析して HTML ドキュメントを生成するには、Dart のドキュメント生成ツール dart doc を使用します。生成されたドキュメントの例については、Dart API ドキュメントを参照してください。コメントの構成方法については、「Effective Dart：ドキュメントを参照してください。