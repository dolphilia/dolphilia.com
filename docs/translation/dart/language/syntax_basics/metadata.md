# メタデータ

メタデータは、コードに関する追加情報を与えるために使用します。メタデータ注釈は@で始まり、その後にコンパイル時定数（deprecatedなど）への参照や定数コンストラクタの呼び出しが続きます。

全てのDartコードには、4つのアノテーションが用意されています：Deprecated、@deprecated、@override、@pragmaです。overrideの使用例については、クラスの拡張を参照してください。以下は、@Deprecated アノテーションの使用例です：

```dart
class Television {
  /// Use [turnOn] to turn the power on instead.
  @Deprecated('Use turnOn instead')
  void activate() {
    turnOn();
  }

  /// Turns the TV's power on.
  void turnOn() {...}
  // ···
}
```

メッセージを指定したくない場合は@deprecatedを使うことができる。しかし、常に@Deprecatedでメッセージを指定することをお勧めします。

独自のメタデータアノテーションを定義することができます。以下は、2つの引数を取る@Todoアノテーションを定義する例です：

```dart
class Todo {
  final String who;
  final String what;

  const Todo(this.who, this.what);
}
```

そしてこれが、その@Todoアノテーションの使用例だ：

```dart
@Todo('Dash', 'Implement this function')
void doSomething() {
  print('Do something');
}
```

メタデータは、ライブラリ、クラス、typedef、型パラメタ、コンストラクタ、ファクトリ、関数、フィールド、パラメタ、変数の宣言の前や、importディレクティブやexportディレクティブの前に書くことができる。