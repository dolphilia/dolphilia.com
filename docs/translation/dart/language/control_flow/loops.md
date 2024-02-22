# 繰り返し

このページでは繰り返しとサポートステートメントを使用して、Dartコードの流れを制御する方法を紹介します：

- `for` ループ
- `while` と `do while` ループ
- `break` と `continue`

また、Dartの制御フローを操作することもできる：

- if や switch のような分岐
- try、catch、throwなどの例外処理

## for ループ

標準的なforループで反復することができる。例えば

```dart
var message = StringBuffer('Dart is fun');
for (var i = 0; i < 5; i++) {
  message.write('!');
}
```

Dartのforループ内のクロージャは、インデックスの値を取り込む。これにより、JavaScriptでよく見られる落とし穴を避けることができる。例えば

```dart
var callbacks = [];
for (var i = 0; i < 2; i++) {
  callbacks.add(() => print(i));
}

for (final c in callbacks) {
  c();
}
```

出力は予想通り、0、そして1となる。一方、JavaScriptでは、2、2の順に出力される。

ListやSetのようなIterable型に対して反復処理を行う場合、現在の反復カウンターを知る必要がないことがある。そのような場合は、for-inループを使うとコードがすっきりする：

```dart
for (final candidate in candidates) {
  candidate.interview();
}
```

イテレート可能な値から得られた値を処理するには、for-inループでパターンを使うこともできる：

```dart
for (final Candidate(:name, :yearsExperience) in candidates) {
  print('$name has $yearsExperience of experience.');
}
```

::: tip lightbulb
for-inの使い方を練習するには、イテラブル・コレクションのコードラボに従ってください。
:::

イテレート可能クラスには、別の選択肢としてforEach()メソッドもある：

```dart
var collection = [1, 2, 3];
collection.forEach(print); // 1 2 3
```

## while と do-while

whileループは、ループの前の条件を評価する：

```dart
while (!isDone()) {
  doSomething();
}
```

do-whileループは、ループの後の条件を評価する：

```dart
do {
  printLine();
} while (!atEndOfPage());
```

## break と continue

ループを止めるにはbreakを使う：

```dart
while (true) {
  if (shutDownRequested()) break;
  processIncomingRequests();
}
```

次のループ反復にスキップするにはcontinueを使う：

```dart
for (int i = 0; i < candidates.length; i++) {
  var candidate = candidates[i];
  if (candidate.yearsExperience < 5) {
    continue;
  }
  candidate.interview();
}
```

リストやセットのようなイテレート可能なものを使っている場合は、先の例の書き方は異なるかもしれない：

```dart
candidates
    .where((c) => c.yearsExperience >= 5)
    .forEach((c) => c.interview());
```