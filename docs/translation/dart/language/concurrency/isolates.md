# アイソレート

このページでは、アイソレートを実装するためにアイソレートAPIを使用するいくつかの例について説明します。

アプリケーションが他の計算を一時的にブロックするような大きな計算を処理するときはいつでもアイソレートを使うべきだ。最も一般的な例はFlutterアプリケーションで、そうでなければUIが応答しなくなるような大きな計算を実行する必要がある場合です。

どのような場合にアイソレートを使わなければならないかについてのルールはありませんが、ここではアイソレートが役に立つ状況をいくつか紹介します：

- 非常に大きなJSON blobの解析とデコード。
- 写真、オーディオ、ビデオの処理と圧縮
- オーディオファイルやビデオファイルの変換
- 大規模なリストやファイルシステム内での複雑な検索やフィルタリングの実行
- データベースとの通信など、I/Oの実行
- 大量のネットワークリクエストの処理

## シンプルなワーカーアイソレーションの実装

これらの例では、単純なワーカーアイソレートを生成するメインアイソレートを実装しています。Isolate.run()はワーカーアイソレートの設定と管理の手順を簡略化します：

1. アイソレートをスポーン（開始、作成）する。
2. スポーンされたアイソレートで関数を実行する。
3. 結果をキャプチャする。
4. 結果をメインアイソレートに返す。
5. 作業が完了したら、アイソレートを終了する。
6. 例外やエラーをチェックし、キャプチャし、メインアイソレートにスローする。

::: info Flutter note
Flutterを使っている場合は、Isolate.run()の代わりにFlutterのcompute関数を使うことができる。
:::

## 新しいアイソレートで既存のメソッドを実行する

1. run() を呼び出して新しいアイソレート (バックグラウンドワーカー) を生成します：

```dart
const String filename = 'with_keys.json';

void main() async {
  // Read some data.
  final jsonData = await Isolate.run(_readAndParseJson);

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}
```

2. 最初の引数として、実行させたい関数をワーカーに渡します。この例では、既存の関数 _readAndParseJson() です：

```dart
Future<Map<String, dynamic>> _readAndParseJson() async {
  final fileData = await File(filename).readAsString();
  final jsonData = jsonDecode(fileData) as Map<String, dynamic>;
  return jsonData;
}
```

3. Isolate.run()は_readAndParseJson()が返す結果を受け取り、その値をメインアイソレートに送り返し、ワーカーアイソレートをシャットダウンする。

4. ワーカーアイソレートは結果を保持するメモリをメインアイソレートに転送します。データはコピーしません。ワーカーアイソレートは検証パスを実行し、オブジェクトの転送が許可されていることを確認します。

_readAndParseJson()は既存の非同期関数で、メインアイソレートで直接実行することもできます。Isolate.run()を使って実行することで、並行処理が可能になります。ワーカーアイソレートは_readAndParseJson()の計算を完全に抽象化します。メインアイソレートをブロックすることなく完了させることができます。

Isolate.run()の結果は常にFutureですが、これはメインアイソレート内のコードが実行され続けるためです。ワーカーアイソレートが実行する計算が同期か非同期かは、メインアイソレートには影響しません。

完全なプログラムはsend_and_receive.dartサンプルをご覧ください。

## アイソレートでクロージャを送る

メインアイソレートで直接関数リテラルまたはクロージャを使用して run() で単純なワーカーアイソレートを作成することもできます。

```dart
const String filename = 'with_keys.json';

void main() async {
  // Read some data.
  final jsonData = await Isolate.run(() async {
    final fileData = await File(filename).readAsString();
    final jsonData = jsonDecode(fileData) as Map<String, dynamic>;
    return jsonData;
  });

  // Use that data.
  print('Number of JSON keys: ${jsonData.length}');
}
```

この例も前と同じことをする。新しいアイソレートがスポーンし、何かを計算し、結果を送り返す。

しかし、今度はアイソレートがクロージャを送信する。クロージャは一般的な名前付き関数よりも、機能面でもコードへの記述方法でも制限が少ない。この例では、Isolate.run()はローカルコードのようなものを同時に実行している。その意味で、run()は「並列実行」を表すコントロール・フロー演算子のように機能すると想像できる。

## ポートを持つアイソレート間で複数のメッセージを送信する

短命なアイソレートは便利に使えますが、新しいアイソレートを生成したり、あるアイソレートから別のアイソレートにオブジェクトをコピーしたりするためのパフォーマンスオーバーヘッドが必要になります。Isolate.runを使用して同じ計算を繰り返し実行するコードに依存している場合、代わりにすぐに終了しない長寿命のアイソレートを作成することでパフォーマンスを改善できるかもしれません。

これを行うには、Isolate.runが抽象化している低レベルのアイソレートAPIの一部を使用することができます：

- Isolate.spawn() と Isolate.exit()
- ReceivePort と SendPort
- SendPort.send() メソッド

このセクションでは、新しく生成されたアイソレートとメインアイソレートとの間で双方向通信を確立するために必要な手順について説明します。最初の例であるBasic portsでは、ハイレベルなプロセスを紹介します。2つ目の例である堅牢なportsでは、最初の例に実用的な機能を徐々に追加していきます。

## ReceivePort と SendPort

アイソレート間の長期間の通信を設定するには、（アイソレートに加えて）2つのクラスが必要です：ReceivePortとSendPortです。これらのポートはアイソレート同士が通信する唯一の方法です。

ReceivePortは他のアイソレートから送信されるメッセージを処理するオブジェクトです。これらのメッセージはSendPortを介して送信されます。

::: info Note
1つのSendPortオブジェクトは正確に1つのReceivePortと関連付けられますが、1つのReceivePortは多くのSendPortを持つことができます。ReceivePortを作成すると、それ自身にSendPortが作成されます。既存のReceivePortにメッセージを送信できるSendPortを追加で作成することができます。
:::

ポートはStreamオブジェクトと同じような動作をします（実際、受信ポートはStream!を実装しています）。SendPortはStreamControllerのようなもので、SendPort.send()メソッドでメッセージを "追加 "し、それらのメッセージはリスナー（この場合はReceivePort）で処理されます。ReceivePortは、受け取ったメッセージをコールバックの引数として渡して処理します。

### Setting up ports

新しくスポーンされたアイソレートは、Isolate.spawn呼び出しを通して受け取った情報のみを持ちます。メインアイソレートが最初に生成された後も生成されたアイソレートと通信を続ける必要がある場合、生成されたアイソレートがメインアイソレートにメッセージを送信できる通信チャネルを設定する必要があります。アイソレートはメッセージパッシングによってのみ通信を行うことができます。お互いのメモリ内部を "見る "ことはできません。"アイソレート "という名前の由来です。

この双方向通信を設定するには、まずメインアイソレートにReceivePortを作成し、Isolate.spawnで新しいアイソレートを生成する際にその引数としてSendPortを渡します。次に新しいアイソレートは自身のReceivePortを作成し、そのSendPortをメインアイソレートから渡されたSendPortに送り返します。メインアイソレートはこのSendPortを受信し、これで双方がメッセージを送受信するためのオープンチャネルを持つことになります。

:::info Note
このセクションの図はハイレベルなもので、アイソレートにポートを使うというコンセプトを伝えるためのものです。実際の実装にはもう少しコードが必要で、それはこのページの後半で説明します。
:::

(図)イベントがひとつずつイベントループに送り込まれる様子を示す

1. メインアイソレートに ReceivePort を作成する。SendPortはReceivePortのプロパティとして自動的に作成される。
2. Isolate.spawn()でワーカーアイソレートをスポーンする。
3. ワーカーアイソレートに最初のメッセージとしてReceivePort.sendPortへの参照を渡す。
4. ワーカーアイソレートに別の新しいReceivePortを作成する。
5. 最初のメッセージとしてワーカーアイソレートのReceivePort.sendPortへの参照をメインアイソレートに戻します。

ポートの作成と通信の設定に加えて、ポートがメッセージを受信したときに何をすべきかを指示する必要がある。これは、それぞれのReceivePortのlistenメソッドを使って行います。

(図)イベントがひとつずつイベントループに送り込まれる様子を示す

1. メインアイソレートの参照を経由して、ワーカーアイソレートの SendPort にメッセージを送信する。
2. Worker アイソレートの ReceivePort 上のリスナーを介してメッセージを受信し、処理する。ここでメインアイソレートから移動させたい計算が実行される。
3. ワーカーアイソレートの参照を経由して、メインアイソレートのSendPortにリターンメッセージを送信する。
4. メインアイソレートの ReceivePort のリスナー経由でメッセージを受信する。

## 基本ポートの例

この例では、メインアイソレートとの間で双方向通信を行う長寿命のワーカーアイソレートを設定する方法を示します。このコードでは、JSONテキストを新しいアイソレートに送信し、そこでJSONがパースされデコードされた後、メインアイソレートに送り返される例を使用しています。

::: warning Warning
この例は、時間をかけて複数のメッセージを送受信できる新しいアイソレートを生成するために必要な最低限のことを教えるためのものです。

エラー処理、ポートのシャットダウン、メッセージのシーケンスなど、本番用ソフトウェアで期待される重要な機能についてはカバーしていません。

次のセクションの Robust ports の例では、この機能をカバーし、それがない場合に発生する可能性のある問題について説明します。
:::

## Step 1: ワーカークラスの定義

まず、バックグラウンドワーカーアイソレートクラスを作成します。このクラスには、必要なすべての機能が含まれています：

- アイソレートを生む。
- そのアイソレートにメッセージを送る。
- アイソレートにJSONをデコードさせる。
- デコードされたJSONをメインのアイソレートに送り返す。

1つはワーカーアイソレートを生成するメソッド、もう1つはワーカーアイソレートへのメッセージ送信を処理するメソッドです。

この例の残りのセクションでは、クラスメソッドをひとつひとつ埋めていく方法を紹介する。

```dart
class Worker {
  Future<void> spawn() async {
    // TODO: Add functionality to spawn a worker isolate.
  }

  void _handleResponsesFromIsolate(dynamic message) {
    // TODO: Handle messages sent back from the worker isolate.
  }

  static void _startRemoteIsolate(SendPort port) {
    // TODO: Define code that should be executed on the worker isolate.
  }

  Future<void> parseJson(String message) async {
    // TODO: Define a public method that can
    // be used to send messages to the worker isolate.
  }
}
```

## Step 2: ワーカーアイソレートをスポーンする

Worker.spawnメソッドは、Workerを分離し、メッセージを送受信できるようにするためのコードをまとめる場所です。

- まず、ReceivePortを作成します。これにより、メインアイソレートは新しくスポーンされたワーカーアイソレートから送信されたメッセージを受信できるようになります。
- 次に、ワーカーアイソレートが送り返すメッセージを処理するために、受信ポートにリスナーを追加します。リスナーに渡されるコールバック _handleResponsesFromIsolate はステップ 4 で説明します。
- 最後に、Isolate.spawn でワーカーアイソレートをスポーンします。ワーカーアイソレートで実行する関数（ステップ3で説明）と、受信ポートの sendPort プロパティです。

```dart
Future<void> spawn() async {
  final receivePort = ReceivePort();
  receivePort.listen(_handleResponsesFromIsolate);
  await Isolate.spawn(_startRemoteIsolate, receivePort.sendPort);
}
```

receivePort.sendPort引数は、コールバック(_startRemoteIsolate)がワーカーアイソレートで呼び出される際に引数として渡されます。これはワーカーアイソレートがメインアイソレートにメッセージを送り返す方法を確実にするための最初のステップです。

## Step 3: ワーカーアイソレートでコードを実行する

このステップでは、ワーカーアイソレートがスポーンしたときに実行されるメソッド _startRemoteIsolate を定義します。このメソッドはワーカーアイソレートの "main "メソッドのようなものです。

- まず、別の新しいReceivePortを作成する。このポートはメインアイソレートから将来のメッセージを受信します。
- 次に、そのポートの SendPort をメインアイソレートに送り返します。
- 最後に、新しいReceivePortにリスナーを追加します。このリスナーはメインアイソレートがワーカーアイソレートに送信するメッセージを処理します。

```dart
static void _startRemoteIsolate(SendPort port) {
  final receivePort = ReceivePort();
  port.send(receivePort.sendPort);

  receivePort.listen((dynamic message) async {
    if (message is String) {
      final transformed = jsonDecode(message);
      port.send(transformed);
    }
  });
}
```

Worker の ReceivePort 上のリスナーは、メインアイソレートから渡された JSON をデコードし、デコードされた JSON をメインアイソレートに送り返します。

このリスナーはメインアイソレートからワーカーアイソレートに送られるメッセージのエントリポイントです。ワーカーアイソレートに今後実行するコードを伝える唯一の機会です。

## Step 4: メイン・アイソレートでメッセージを扱う

最後に、ワーカーアイソレートからメインアイソレートに送り返されるメッセージの処理方法をメインアイソレートに伝える必要があります。そのためには _handleResponsesFromIsolate メソッドを埋める必要があります。このメソッドは、ステップ2で説明したように、receivePort.listenメソッドに渡されることを思い出してください：

```dart
Future<void> spawn() async {
  final receivePort = ReceivePort();
  receivePort.listen(_handleResponsesFromIsolate);
  await Isolate.spawn(_startRemoteIsolate, receivePort.sendPort);
}
```

また、ステップ3でSendPortをメインアイソレートに送り返したことを思い出してください。このメソッドは、そのSendPortの受信を処理するとともに、今後のメッセージ（デコードされたJSONになる）を処理します。

- まず、メッセージがSendPortかどうかをチェックします。もしそうなら、そのポートをクラスの _sendPort プロパティに代入し、後でメッセージの送信に使用できるようにします。
- 次に、メッセージが `Map<String, dynamic>` 型かどうかをチェックする。もしそうなら、アプリケーション固有のロジックでそのメッセージを処理します。この例では、メッセージを表示します。

```dart
void _handleResponsesFromIsolate(dynamic message) {
  if (message is SendPort) {
    _sendPort = message;
    _isolateReady.complete();
  } else if (message is Map<String, dynamic>) {
    print(message);
  }
}
```

## Step 5: アイソレートのセットアップを確実にするため、コンプリートを追加する。

クラスを完成させるために、ワーカーアイソレートにメッセージを送信する parseJson というパブリックメソッドを定義します。また、アイソレートが完全にセットアップされる前にメッセージを送信できるようにする必要があります。これを処理するには、Completer を使用します。

- まず、Completer というクラスレベルのプロパティを追加し、_isolateReady という名前を付けます。
- 次に、メッセージが SendPort の場合、_handleResponsesFromIsolate メソッド (ステップ 4 で作成) で Completer の complete() 呼び出しを追加します。
- 最後に、_sendPort.sendを追加する前に、_isolateReady.futureを追加します。これにより、ワーカーアイソレートがスポーンされ、そのSendPortをメインアイソレートに送り返すまで、メッセージがワーカーアイソレートに送信されることはありません。

```dart
Future<void> parseJson(String message) async {
  await _isolateReady.future;
  _sendPort.send(message);
}
```

## 完全な例

```dart
import 'dart:async';
import 'dart:convert';
import 'dart:isolate';

void main() async {
  final worker = Worker();
  await worker.spawn();
  await worker.parseJson('{"key":"value"}');
}

class Worker {
  late SendPort _sendPort;
  final Completer<void> _isolateReady = Completer.sync();

  Future<void> spawn() async {
    final receivePort = ReceivePort();
    receivePort.listen(_handleResponsesFromIsolate);
    await Isolate.spawn(_startRemoteIsolate, receivePort.sendPort);
  }

  void _handleResponsesFromIsolate(dynamic message) {
    if (message is SendPort) {
      _sendPort = message;
      _isolateReady.complete();
    } else if (message is Map<String, dynamic>) {
      print(message);
    }
  }

  static void _startRemoteIsolate(SendPort port) {
    final receivePort = ReceivePort();
    port.send(receivePort.sendPort);

    receivePort.listen((dynamic message) async {
      if (message is String) {
        final transformed = jsonDecode(message);
        port.send(transformed);
      }
    });
  }

  Future<void> parseJson(String message) async {
    await _isolateReady.future;
    _sendPort.send(message);
  }
}
```

## ロバスト・ポートの例

前の例では、双方向通信を行う長寿命のアイソレートをセットアップするために必要な 基本的な構成要素を説明しました。前述したように、この例にはエラー処理、ポートが使われなくなったときにポートを閉じる機能、状況によってはメッセージの順序に関する不整合など、いくつかの重要な機能が欠けています。

この例では、最初の例の情報を発展させ、これらの追加機能を持ち、より良いデザインパターンに従った長寿命のワーカーアイソレートを作成します。このコードは最初の例と似ていますが、その例の拡張ではありません。

::: info Note
この例では、前の例で取り上げたIsolate.spawnとportsを使ったアイソレート間の通信の確立について、すでに熟知していることを前提としています。
:::

## Step 1: ワーカークラスの定義

まず、バックグラウンドワーカーを隔離するクラスを作成します。このクラスには、必要なすべての機能が含まれています：

- アイソレートを生成する。
- そのアイソレートにメッセージを送る。
- アイソレートにJSONをデコードさせる。
- デコードしたJSONをメインのアイソレートに送り返す。

クラスは3つのパブリックメソッドを公開しています。1つはワーカーアイソレートを作成するメソッド、1つはワーカーアイソレートへのメッセージ送信を処理するメソッド、1つはポートが使用されなくなったときにポートをシャットダウンするメソッドです。

```dart
class Worker {
  final SendPort _commands;
  final ReceivePort _responses;

  Future<Object?> parseJson(String message) async {
    // TODO: Ensure the port is still open.
    _commands.send(message);
  }

  static Future<Worker> spawn() async {
    // TODO: Add functionality to create a new Worker object with a
    //  connection to a spawned isolate.
    throw UnimplementedError();
  }

  Worker._(this._commands, this._responses) {
    // TODO: Initialize main isolate receive port listener.
  }

  void _handleResponsesFromIsolate(dynamic message) {
    // TODO: Handle messages sent back from the worker isolate.
  }

  static void _handleCommandsToIsolate(ReceivePort rp, SendPort sp) async {
    // TODO: Handle messages sent back from the worker isolate.
  }

  static void _startRemoteIsolate(SendPort sp) {
    // TODO: Initialize worker isolate's ports.
  }
}
```

::: info Note
この例では、SendPort と ReceivePort インスタンスはベストプラクティスの命名規則に従っており、メインアイソレートに関連した名前になっています。SendPortを通してメインアイソレートからワーカーアイソレートに送られるメッセージはコマンドと呼ばれ、メインアイソレートに送り返されるメッセージはレスポンスと呼ばれます。
:::

## Step 2: Worker.spawnメソッドでRawReceivePortを作成する。

アイソレートをスポーンする前に、下位レベルのReceivePortであるRawReceivePortを作成する必要があります。RawReceivePortを使用することで、アイソレートの起動ロジックとアイソレート上のメッセージパッシングを処理するロジックを分離することができるため、好ましいパターンです。

Worker.spawnメソッドの中で：

- まず、RawReceivePortを作成する。このReceivePortはワーカーアイソレートからの最初のメッセージを受信する役割のみを果たします。
- 次に、アイソレートがメッセージを受信する準備ができたことを示すCompleterを作成します。これが完了すると、ReceivePortとSendPortを持つレコードを返します。
- 次に、RawReceivePort.handler プロパティを定義します。このプロパティは、ReceivePort.listenerのように振る舞うFunction?この関数は、このポートでメッセージが受信されると呼び出されます。
- ハンドラ関数の中で、connection.complete() を呼び出します。このメソッドは、引数としてReceivePortとSendPortを持つレコードを指定します。SendPortはワーカーアイソレートから送信される最初のメッセージで、次のステップで_commandsというクラスレベルのSendPortに割り当てられます。
- 次に、ReceivePort.fromRawReceivePortコンストラクタで新しいReceivePortを作成し、initPortを渡します。

```dart
class Worker {
  final SendPort _commands;
  final ReceivePort _responses;

  static Future<Worker> spawn() async {
    // Create a receive port and add its initial message handler.
    final initPort = RawReceivePort();
    final connection = Completer<(ReceivePort, SendPort)>.sync();
    initPort.handler = (initialMessage) {
      final commandPort = initialMessage as SendPort;
      connection.complete((
        ReceivePort.fromRawReceivePort(initPort),
        commandPort,
      ));
    };
// ···
  }
}
```

最初にRawReceivePortを作成し、次にReceivePortを作成することで、後からReceivePort.listenに新しいコールバックを追加することができる。ReceivePortはBroadcastStreamではなくStreamを実装しているためだ。

事実上、これにより、通信の設定が完了した後にメッセージを受信するロジックと、起動ロジックを分離することができます。この利点は、他のメソッド内のロジックが大きくなるにつれて、より明らかになるでしょう。

## Step 3: Isolate.spawnでワーカーアイソレートをスポーンする

このステップでは引き続きWorker.spawnメソッドを埋めていきます。アイソレートをスポーンし、このクラスからWorkerのインスタンスを返すために必要なコードを追加します。この例では、Isolate.spawnの呼び出しはtry/catchブロックでラップされており、アイソレートの起動に失敗した場合、initPortが閉じられ、Workerオブジェクトが作成されないようになっています。

- まず、try/catch ブロックでワーカーアイソレートのスポーンを試みます。ワーカーアイソレートのスポーンに失敗した場合は、前のステップで作成した受信ポートを閉じます。Isolate.spawnに渡されるメソッドについては、後のステップで説明します。
- 次に、connection.futureを待ち、それが返すレコードから送信ポートと受信ポートを再構築する。
- 最後に、Workerのプライベート コンストラクタを呼び出してWorkerのインスタンスを返します。

```dart
class Worker {
  final SendPort _commands;
  final ReceivePort _responses;

  static Future<Worker> spawn() async {
    // Create a receive port and add its initial message handler
    final initPort = RawReceivePort();
    final connection = Completer<(ReceivePort, SendPort)>.sync();
    initPort.handler = (initialMessage) {
      final commandPort = initialMessage as SendPort;
      connection.complete((
        ReceivePort.fromRawReceivePort(initPort),
        commandPort,
      ));
    };
    // Spawn the isolate.
    try {
      await Isolate.spawn(_startRemoteIsolate, (initPort.sendPort));
    } on Object {
      initPort.close();
      rethrow;
    }

    final (ReceivePort receivePort, SendPort sendPort) =
        await connection.future;

    return Worker._(sendPort, receivePort);
  }
}
```

この例では（前の例と比較して）、Worker.spawnがこのクラスの非同期静的コンストラクタとして機能し、Workerのインスタンスを作成する唯一の方法であることに注意してください。これにより API が単純化され、Worker のインスタンスを作成するコードがすっきりします。

## Step 4: アイソレートのセットアップを完了する

このステップでは、基本的なアイソレートのセットアッププロセスを完了します。これは前の例とほぼ完全に関連しており、新しい概念はありません。コードがより多くのメソッドに分割されているという若干の変更がありますが、これはこの例の残りの部分を通してより多くの機能を追加するための設計手法です。アイソレートを設定する基本的なプロセスの詳細なウォークスルーについては、基本的なポートの例を参照してください。

まず、Worker.spawn メソッドから返される private コンストラクタを作成します。コンストラクタ本体で、メインのアイソレートが使用する受信ポートにリスナーを追加し、そのリスナーに _handleResponsesFromIsolate という未定義のメソッドを渡します。

```dart
class Worker {
  final SendPort _commands;
  final ReceivePort _responses;
// ···
  Worker._(this._responses, this._commands) {
    _responses.listen(_handleResponsesFromIsolate);
  }
}
```

次に、ワーカーアイソレート上のポートを初期化するコードを _startRemoteIsolate に追加します。このメソッドはWorker.spawnメソッドでIsolate.spawnに渡され、引数としてメインアイソレートのSendPortが渡されることを思い出してください。

- 新しいReceivePortを作成する。
- そのポートのSendPortをメインアイソレートに送り返す。
- handleCommandsToIsolateという新しいメソッドを呼び出し、メインアイソレートからの新しいReceivePortとSendPortの両方を引数として渡します。

```dart
static void _startRemoteIsolate(SendPort sendPort) {
  final receivePort = ReceivePort();
  sendPort.send(receivePort.sendPort);
  _handleCommandsToIsolate(receivePort, sendPort);
}
```

次に、_handleCommandsToIsolateメソッドを追加します。このメソッドは、メインアイソレートからメッセージを受け取り、ワーカーアイソレートでjsonをデコードし、デコードしたjsonをレスポンスとして送り返す役割を果たします。

- まず、ワーカーアイソレーションの ReceivePort でリスナーを宣言する。
- リスナーに追加されたコールバック内で、try/catchブロック内でメインアイソレートから渡されたJSONのデコードを試みます。デコードに成功したら、デコードした JSON をメインアイソレートに送り返します。
- エラーが発生した場合は、RemoteError を返します。

```dart
static void _handleCommandsToIsolate(
    ReceivePort receivePort, SendPort sendPort) {
  receivePort.listen((message) {
    try {
      final jsonData = jsonDecode(message as String);
      sendPort.send(jsonData);
    } catch (e) {
      sendPort.send(RemoteError(e.toString(), ''));
    }
  });
}
```

次に、_handleResponsesFromIsolateメソッドのコードを追加する。

- まず、メッセージがRemoteErrorであるかどうかをチェックする。
- そうでない場合は、メッセージを表示します。今後のステップでは、メッセージを表示するのではなく、メッセージを返すようにこのコードを更新します。

```dart
void _handleResponsesFromIsolate(dynamic message) {
  if (message is RemoteError) {
    throw message;
  } else {
    print(message);
  }
}
```

これは、外部のコードがワーカーアイソレートにJSONを送信してデコードできるようにするパブリックメソッドです。

```dart
Future<Object?> parseJson(String message) async {
  _commands.send(message);
}
```

次のステップでこのメソッドを更新する。

## Step 5: 複数のメッセージを同時に扱う

現在のところ、worker isolate にメッセージを高速に送信すると、isolate は送信された順番ではなく、完了した順番にデコードされた json レスポンスを送信します。どのレスポンスがどのメッセージに対応するかを判断する方法はありません。

このステップでは、各メッセージに ID を与え、Completer オブジェクトを使用して、外部のコードが parseJson を呼び出したときに、その呼び出し元に返されるレスポンスが正しいレスポンスであるようにすることで、この問題を解決します。

まず、Worker に 2 つのクラスレベルのプロパティを追加します：

- `Map<int, Completer<Object?>> _activeRequests`
- `int _idCounter`

```dart
class Worker {
  final SendPort _commands;
  final ReceivePort _responses;
  final Map<int, Completer<Object?>> _activeRequests = {};
  int _idCounter = 0;
```

_activeRequests マップは、ワーカーアイソレートに送られたメッセージと Completer を関連付けます。activeRequests で使われるキーは _idCounter から取られます。

次に、ワーカーアイソレートにメッセージを送信する前に Completer を作成するように parseJson メソッドを更新します。

- 最初に Completer を作成する。
- 次に _idCounter をインクリメントして、各 Completer が一意な番号と関連付けられるようにする。
- activeRequests マップにエントリを追加する。キーは _idCounter の現在の番号で、Completer はその値である。
- ワーカーアイソレートに、id とともにメッセージを送信します。SendPort を通じて送信できる値は 1 つだけなので、id とメッセージを 1 つのレコードにまとめます。
- 最後に、completer の future を返します。この future には最終的にワーカーアイソレートからの応答が含まれます。

```dart
Future<Object?> parseJson(String message) async {
  final completer = Completer<Object?>.sync();
  final id = _idCounter++;
  _activeRequests[id] = completer;
  _commands.send((id, message));
  return await completer.future;
}
```

また、このシステムを処理するために、_handleResponsesFromIsolateと_handleCommandsToIsolateを更新する必要がある。

handleCommandsToIsolateでは、メッセージが単なるjsonテキストではなく、2つの値を持つレコードであることを考慮する必要があります。そのためには、messageから値を再構築します。

次に、jsonをデコードした後、sendPort.sendの呼び出しを更新して、idとデコードされたjsonの両方をメインのアイソレートに渡すようにします。

```dart
static void _handleCommandsToIsolate(
    ReceivePort receivePort, SendPort sendPort) {
  receivePort.listen((message) {
    final (int id, String jsonText) = message as (int, String); // New
    try {
      final jsonData = jsonDecode(jsonText);
      sendPort.send((id, jsonData)); // Updated
    } catch (e) {
      sendPort.send((id, RemoteError(e.toString(), '')));
    }
  });
}
```

最後に、_handleResponsesFromIsolateを更新する。

- まず、メッセージ引数からidとresponseを再構築します。
- 次に、_activeRequestsマップからこのリクエストに対応するcompleterを削除する。
- 最後に、エラーをスローしたりデコードされたjsonを表示したりするのではなく、レスポンスを渡してcompleterを完了させる。これが完了すると、メインアイソレートで parseJson を呼び出したコードにレスポンスが返されます。

```dart
void _handleResponsesFromIsolate(dynamic message) {
  final (int id, Object? response) = message as (int, Object?); // New
  final completer = _activeRequests.remove(id)!; // New

  if (response is RemoteError) {
    completer.completeError(response); // Updated
  } else {
    completer.complete(response); // Updated
  }
}
```

## Step 6: ポートを閉じる機能を追加

アイソレートがコードによって使用されなくなったら、メインアイソレートとワーカーアイソレートのポートを閉じる必要があります。

- まず、ポートが閉じられているかどうかを追跡するクラスレベルのブール値を追加する。
- 次に、Worker.closeメソッドを追加します。このメソッド内で
  - closedをtrueに更新する。
  - Worker アイソレートに最終メッセージを送信します。このメッセージは、"shutdown" という文字列ですが、どんなオブジェクトでもかまいません。次のコードスニペットで使用します。
- 最後に、_activeRequests が空かどうかをチェックします。空であれば、_responsesという名前のメインアイソレーションのReceivePortを閉じます。

```dart
class Worker {
  bool _closed = false;
// ···
  void close() {
    if (!_closed) {
      _closed = true;
      _commands.send('shutdown');
      if (_activeRequests.isEmpty) _responses.close();
      print('--- port closed --- ');
    }
  }
```

- 次に、ワーカーのアイソレートで "shutdown" メッセージを処理する必要があります。以下のコードを _handleCommandsToIsolate メソッドに追加します。このコードは、メッセージが "shutdown" と読める String かどうかをチェックします。もしそうなら、ワーカーアイソレートの ReceivePort を閉じて、リターンします。

```dart
static void _handleCommandsToIsolate(
  ReceivePort receivePort,
  SendPort sendPort,
) {
  receivePort.listen((message) {
    // New if-block.
    if (message == 'shutdown') {
      receivePort.close();
      return;
    }
    final (int id, String jsonText) = message as (int, String);
    try {
      final jsonData = jsonDecode(jsonText);
      sendPort.send((id, jsonData));
    } catch (e) {
      sendPort.send((id, RemoteError(e.toString(), '')));
    }
  });
}
```

- 最後に、メッセージを送信しようとする前に、ポートが閉じているかどうかをチェックするコードを追加する。Worker.parseJsonメソッドに1行追加する。

```dart
Future<Object?> parseJson(String message) async {
  if (_closed) throw StateError('Closed'); // New
  final completer = Completer<Object?>.sync();
  final id = _idCounter++;
  _activeRequests[id] = completer;
  _commands.send((id, message));
  return await completer.future;
}
```

## 完全な例

```dart
import 'dart:async';
import 'dart:convert';
import 'dart:isolate';

void main() async {
  final worker = await Worker.spawn();
  print(await worker.parseJson('{"key":"value"}'));
  print(await worker.parseJson('"banana"'));
  print(await worker.parseJson('[true, false, null, 1, "string"]'));
  print(
      await Future.wait([worker.parseJson('"yes"'), worker.parseJson('"no"')]));
  worker.close();
}

class Worker {
  final SendPort _commands;
  final ReceivePort _responses;
  final Map<int, Completer<Object?>> _activeRequests = {};
  int _idCounter = 0;
  bool _closed = false;

  Future<Object?> parseJson(String message) async {
    if (_closed) throw StateError('Closed');
    final completer = Completer<Object?>.sync();
    final id = _idCounter++;
    _activeRequests[id] = completer;
    _commands.send((id, message));
    return await completer.future;
  }

  static Future<Worker> spawn() async {
    // Create a receive port and add its initial message handler
    final initPort = RawReceivePort();
    final connection = Completer<(ReceivePort, SendPort)>.sync();
    initPort.handler = (initialMessage) {
      final commandPort = initialMessage as SendPort;
      connection.complete((
        ReceivePort.fromRawReceivePort(initPort),
        commandPort,
      ));
    };

    // Spawn the isolate.
    try {
      await Isolate.spawn(_startRemoteIsolate, (initPort.sendPort));
    } on Object {
      initPort.close();
      rethrow;
    }

    final (ReceivePort receivePort, SendPort sendPort) =
        await connection.future;

    return Worker._(receivePort, sendPort);
  }

  Worker._(this._responses, this._commands) {
    _responses.listen(_handleResponsesFromIsolate);
  }

  void _handleResponsesFromIsolate(dynamic message) {
    final (int id, Object? response) = message as (int, Object?);
    final completer = _activeRequests.remove(id)!;

    if (response is RemoteError) {
      completer.completeError(response);
    } else {
      completer.complete(response);
    }

    if (_closed && _activeRequests.isEmpty) _responses.close();
  }

  static void _handleCommandsToIsolate(
    ReceivePort receivePort,
    SendPort sendPort,
  ) {
    receivePort.listen((message) {
      if (message == 'shutdown') {
        receivePort.close();
        return;
      }
      final (int id, String jsonText) = message as (int, String);
      try {
        final jsonData = jsonDecode(jsonText);
        sendPort.send((id, jsonData));
      } catch (e) {
        sendPort.send((id, RemoteError(e.toString(), '')));
      }
    });
  }

  static void _startRemoteIsolate(SendPort sendPort) {
    final receivePort = ReceivePort();
    sendPort.send(receivePort.sendPort);
    _handleCommandsToIsolate(receivePort, sendPort);
  }

  void close() {
    if (!_closed) {
      _closed = true;
      _commands.send('shutdown');
      if (_activeRequests.isEmpty) _responses.close();
      print('--- port closed --- ');
    }
  }
}
```