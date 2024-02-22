# 呼び出し可能なオブジェクト

Dartクラスのインスタンスを関数のように呼び出すには、call()メソッドを実装します。

call() メソッドを使用すると、定義したクラスのインスタンスが関数をエミュレートできます。このメソッドは、パラメータや戻り値の型など、通常の関数と同じ機能をサポートしています。

次の例では、WannabeFunction クラスが call() 関数を定義しています。この関数は、3 つの文字列を受け取り、それぞれをスペースで区切って連結し、感嘆符を追加します。

```dart
class WannabeFunction {
  String call(String a, String b, String c) => '$a $b $c!';
}

var wf = WannabeFunction();
var out = wf('Hi', 'there,', 'gang');

void main() => print(out);
```