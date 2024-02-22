# エラー処理

## 例外処理

Dartのコードでは、例外をスローしたりキャッチしたりすることができます。例外は予期せぬことが起こったことを示すエラーです。例外がキャッチされない場合、例外を発生させたアイソレートは中断され、通常アイソレートとそのプログラムは終了します。

Javaとは対照的に、Dartの例外はすべてチェックされていない例外です。メソッドはどの例外をスローするかを宣言しませんし、例外をキャッチする必要もありません。

Dartには、Exception型とError型のほか、定義済みの多数のサブタイプが用意されています。もちろん、独自の例外を定義することもできます。ただし、Dartのプログラムでは、ExceptionやErrorオブジェクトだけでなく、NULLでないあらゆるオブジェクトを例外として投げることができます。

## throw

例外をスロー（発生）させる例である：

```dart
throw FormatException('Expected at least 1 section');
```

また、任意のオブジェクトを投げることもできる：

```dart
throw 'Out of llamas!';
```

::: info Note
プロダクション・クオリティのコードは通常、ErrorやExceptionを実装した型を投げる。
:::

例外のスローは式なので、例外をスローできるのは `=>` ステートメント内だけでなく、式が使える場所ならどこでも可能だ：

```dart
void distanceTo(Point other) => throw UnimplementedError();
```

## Catch

例外をキャッチ（捕捉）することで、（例外を再スローしない限り）例外の伝播を止めることができます。例外をキャッチすることで、その例外を処理するチャンスが得られます：

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  buyMoreLlamas();
}
```

複数の型の例外を投げるコードを処理するには、複数のcatch句を指定します。スローされたオブジェクトの型にマッチする最初のcatch節が例外を処理します。catch節が型を指定しない場合、その節はどの型のスローされたオブジェクトでも処理できます：

```dart
try {
  breedMoreLlamas();
} on OutOfLlamasException {
  // A specific exception
  buyMoreLlamas();
} on Exception catch (e) {
  // Anything else that is an exception
  print('Unknown exception: $e');
} catch (e) {
  // No specified type, handles all
  print('Something really unknown: $e');
}
```

先のコードが示すように、onかcatchのどちらか、あるいは両方を使うことができる。onは、例外の型を指定する必要があるときに使う。catchは、例外ハンドラーが例外オブジェクトを必要とするときに使います。

catch() には、1 つまたは 2 つのパラメータを指定できます。1つ目はスローされた例外で、2つ目はスタック・トレース（StackTraceオブジェクト）です。

```dart
try {
  // ···
} on Exception catch (e) {
  print('Exception details:\n $e');
} catch (e, s) {
  print('Exception details:\n $e');
  print('Stack trace:\n $s');
}
```

例外を伝播させながら部分的に処理するには、rethrow キーワードを使用する。

```dart
void misbehave() {
  try {
    dynamic foo = true;
    print(foo++); // Runtime error
  } catch (e) {
    print('misbehave() partially handled ${e.runtimeType}.');
    rethrow; // Allow callers to see the exception.
  }
}

void main() {
  try {
    misbehave();
  } catch (e) {
    print('main() finished handling ${e.runtimeType}.');
  }
}
```

## finnaly

例外がスローされたかどうかにかかわらず、あるコードが確実に実行されるようにするには、finally節を使う。例外にマッチするcatch句がない場合、例外はfinally句が実行された後に伝播される：

```dart
try {
  breedMoreLlamas();
} finally {
  // Always clean up, even if an exception is thrown.
  cleanLlamaStalls();
}
```

finally節は、一致するcatch節の後に実行される：

```dart
try {
  breedMoreLlamas();
} catch (e) {
  print('Error: $e'); // Handle the exception first.
} finally {
  cleanLlamaStalls(); // Then clean up.
}
```

詳しくは、コア・ライブラリーの例外に関するドキュメントをご覧ください。

## assert

開発中は assert 文 - `assert(<condition>, <optionalMessage>);` - を使って、ブール値の条件が偽の場合に通常の実行を中断させます。

```dart
// Make sure the variable has a non-null value.
assert(text != null);

// Make sure the value is less than 100.
assert(number < 100);

// Make sure this is an https URL.
assert(urlString.startsWith('https'));
```

アサーションにメッセージを添付するには、assert の 2 番目の引数に文字列を追加します (末尾にカンマを付けることもできます)：

```dart
assert(urlString.startsWith('https'),
    'URL ($urlString) should start with "https".');
```

assert の最初の引数には、ブール値に解決する任意の式を指定できます。式の値が true の場合、アサーションは成功し、実行が続行されます。偽の場合はアサーションに失敗し、例外 (AssertionError) がスローされます。

アサーションは、具体的にいつ動作するのでしょうか?それは、使用しているツールやフレームワークによって異なります：

- Flutterはデバッグモードでアサーションを有効にします。
- webdev serveのような開発専用のツールは、通常デフォルトでアサーションを有効にします。
- dart run や dart compile js などのいくつかのツールは、コマンドラインフラグ --enable-asserts でアサーションをサポートしています。

実運用コードでは、アサーションは無視され、アサーションの引数は評価されません。