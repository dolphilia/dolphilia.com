# クラスの継承

サブクラスを作成するには extends を使い、スーパークラスを参照するには super を使う：

```dart
class Television {
  void turnOn() {
    _illuminateDisplay();
    _activateIrSensor();
  }
  // ···
}

class SmartTelevision extends Television {
  void turnOn() {
    super.turnOn();
    _bootNetworkInterface();
    _initializeMemory();
    _upgradeApps();
  }
  // ···
}
```

extendsの別の使い方については、ジェネリクスのページのパラメータ化された型の議論を参照のこと。

## オーバーライド・メンバー

サブクラスは、インスタンス・メソッド (演算子を含む)、ゲッター、およびセッターをオーバーライドできます。オーバーライド・アノテーションを使用すると、メンバを意図的にオーバーライドしていることを示すことができます：

```dart
class Television {
  // ···
  set contrast(int value) {...}
}

class SmartTelevision extends Television {
  @override
  set contrast(num value) {...}
  // ···
}
```

オーバーライド・メソッド宣言は、いくつかの点でオーバーライドするメソッドと一致しなければならない：

- リターン・タイプは、オーバーライドされたメソッドのリターン・タイプと同じタイプ (またはそのサブタイプ) でなければなりません。
- パラメータ型は、オーバーライドされたメソッドのパラメータ型と同じ型 (またはそのスーパー型) である必要があります。前述の例では、SmartTelevision の contrast セッタは、パラメータ・タイプを int からスーパータイプの num に変更しています。
- オーバーライドされるメソッドが n 個の位置パラメータを受け入れる場合、オーバーライドされるメソッドも n 個の位置パラメータを受け入れなければなりません。
- ジェネリック・メソッドは非ジェネリック・メソッドをオーバーライドできず、非ジェネリック・メソッドはジェネリック・メソッドをオーバーライドできません。

メソッド・パラメーターやインスタンス変数の型を絞り込みたい場合があります。これは通常のルールに反し、実行時に型エラーを引き起こす可能性があるという点で、ダウンキャストと似ている。それでも、型エラーが発生しないことを保証できるコードであれば、型を狭めることは可能です。この場合、パラメータ宣言で covariant キーワードを使用できます。詳細については、Dart言語仕様を参照してください。

::: warning Warning
`==`をオーバーライドする場合は、ObjectのhashCodeゲッターもオーバーライドする必要があります。`==`とhashCodeをオーバーライドする例については、マップ・キーの実装を参照してください。
:::

## noSuchMethod()

存在しないメソッドやインスタンス変数を使おうとするコードを検出したり反応させたりするには、noSuchMethod() をオーバーライドします：

```dart
class A {
  // Unless you override noSuchMethod, using a
  // non-existent member results in a NoSuchMethodError.
  @override
  void noSuchMethod(Invocation invocation) {
    print('You tried to use a non-existent member: '
        '${invocation.memberName}');
  }
}
```

以下のいずれかが真でない限り、未実装のメソッドを呼び出すことはできない：

- レシーバは静的型 dynamic を持つ。
- レシーバーは未実装のメソッドを定義した静的型（abstractでOK）を持ち、レシーバーの動的型はクラスObjectのものとは異なるnoSuchMethod()の実装を持つ。

詳細については、非公式のnoSuchMethod転送仕様を参照のこと。