# 非同期のサポート

Dartライブラリには、FutureやStreamオブジェクトを返す関数がたくさんあります。これらの関数は非同期です。（I/Oのような）時間のかかる処理を設定した後に、その処理が完了するのを待たずに返します。

asyncとawaitキーワードは非同期プログラミングをサポートし、同期コードに似た非同期コードを書くことができます。

## Futuresハンドリング

完了したFutureの結果が必要な場合、2つの選択肢があります：

- ここや非同期プログラミングのコードラボで説明されているように、asyncとawaitを使う。
- dart:async ドキュメントで説明されている Future API を使う。

asyncとawaitを使用したコードは非同期ですが、同期コードによく似ています。例えば、非同期関数の結果を待つためにawaitを使用するコードを以下に示します：

```dart
await lookUpVersion();
```

awaitを使うには、コードが非同期関数（asyncとマークされた関数）の中になければならない：

```dart
Future<void> checkVersion() async {
  var version = await lookUpVersion();
  // Do something with version
}
```

::: info Note
非同期関数は時間のかかる処理を実行するかもしれないが、その処理を待つことはない。その代わり、async関数は最初のawait式に出会うまで実行します。そしてFutureオブジェクトを返し、await式が完了してから実行を再開します。
:::

try、catch、finallyを使用して、awaitを使用するコードのエラーとクリーンアップを処理する：

```dart
try {
  version = await lookUpVersion();
} catch (e) {
  // React to inability to look up the version
}
```

awaitは非同期関数の中で複数回使うことができる。例えば、以下のコードは関数の結果を3回待つ：

```dart
var entrypoint = await findEntryPoint();
var exitCode = await runExecutable(entrypoint, args);
await flushThenExit(exitCode);
```

await式では、expressionの値は通常Futureです。そうでない場合は、値は自動的にFutureにラップされます。このFutureオブジェクトは、オブジェクトを返すという約束を示します。await式の値は、その返されたオブジェクトです。await式は、そのオブジェクトが利用可能になるまで実行を一時停止させる。

awaitの使用時にコンパイルエラーが発生する場合は、awaitが非同期関数内にあることを確認してください。例えば、アプリのmain()関数でawaitを使うには、main()の本体がasyncとしてマークされていなければならない：

```dart
void main() async {
  checkVersion();
  print('In main: version is ${await lookUpVersion()}');
}
```

::: info Note
前述の例では、結果を待たずに非同期関数（checkVersion()）を使用しています。 これは、コードが関数の実行が終了したと仮定すると問題を引き起こす可能性がある。 この問題を避けるには、unawaited_futuresリインター・ルールを使う。
:::

futures、async、awaitの使い方をインタラクティブに紹介するには、非同期プログラミングのコードラボを参照。

## 非同期関数の宣言

非同期関数は、ボディにasync修飾子が付いた関数です。

関数にasyncキーワードを追加すると、その関数はFutureを返すようになります。例えば、Stringを返すこの同期関数を考えてみましょう：

```dart
String lookUpVersion() => '1.0.0';
```

非同期関数に変更した場合、例えば、Futureの実装には時間がかかるため、戻り値はフューチャーとなる：

```dart
Future<String> lookUpVersion() async => '1.0.0';
```

関数本体がFuture APIを使う必要はないことに注意してください。Dartは必要に応じてFutureオブジェクトを生成します。関数が有用な値を返さない場合は、戻り値の型を `Future<void>` にしてください。

future、async、awaitの使い方をインタラクティブに紹介した、非同期プログラミングのコードラボを参照してください。

## Streamsハンドリング

ストリームから値を取得する必要がある場合、2つの選択肢がある：

- asyncと非同期forループ（await for）を使用します。
- dart:async ドキュメントで説明されているように、Stream API を使用します。

::: info Note
await forを使う前に、それがコードを明瞭にし、本当にストリームのすべての結果を待ちたいのかどうかを確認してください。例えば、UIイベントリスナーにはawait forを使うべきではありません。なぜなら、UIフレームワークはイベントの無限のストリームを送信するからです。
:::

非同期forループは次のような形をしている：

```dart
await for (varOrType identifier in expression) {
  // Executes each time the stream emits a value.
}
```

式の値はStream型でなければならない。実行は以下のように進む：

1. ストリームが値を返すまで待つ。
2. 変数にその値がセットされた状態で、forループの本体を実行する。
3. ストリームが閉じるまで1と2を繰り返す。

ストリームのリッスンを停止するには、break文またはreturn文を使用する。

非同期forループを実装する際にコンパイルエラーが発生した場合は、await forが非同期関数内にあることを確認してください。例えば、アプリのmain()関数で非同期forループを使用するには、main()の本体が非同期としてマークされていなければなりません：

```dart
void main() async {
  // ...
  await for (final request in requestServer) {
    handleRequest(request);
  }
  // ...
}
```

Dartの非同期プログラミングサポートの詳細については、dart:asyncライブラリのドキュメントを参照してください。