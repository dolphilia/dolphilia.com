# 健全なNull安全性

Dart言語は健全なヌル安全性を実装しています。

NULL セーフティは、NULL に設定された変数への意図しないアクセスによるエラーを防ぎます。

例えば、あるメソッドが整数を予期していたのにNULLを受け取った場合、アプリは実行時エラーを引き起こします。この種のエラー（null dereference エラー）はデバッグが困難です。

健全なNul安全性では、すべての変数が値を必要とします。つまり、Dartはすべての変数をnull不可と見なします。int i=42 のように、宣言された型の値のみを代入することができます。デフォルトの変数型にヌル値を代入することはできません。変数型がヌル値を持つことができることを指定するには、型注釈の後に ? を追加します。

健全なNull安全性は、潜在的な実行時エラーを編集時の解析エラーに変えます。ヌル・セーフティを使用すると、Dart アナライザおよびコンパイラは、NULL 値を 持たない変数にフラグを付けます：

- NULL以外の値で初期化されていない
- NULL値が割り当てられている

これらのチェックにより、アプリをデプロイする前にこれらのエラーを修正することができます。

## 実例による紹介

Null安全を使えば、以下のコードの変数はどれもNullにはならない：

```dart
// With null safety, none of these can ever be null.
var i = 42; // Inferred to be an int.
String name = getFileName();
final b = Foo();
```

変数がNULL値を持つ可能性があることを示すには、型宣言に`?`を追加すればよい：

```dart
int? aNullableInt = null;
```

- インタラクティブな例を試すには、Dartのチートシートにあるヌル・セーフティ指向の例をいくつか試してみてください。
- ヌル安全性についての詳細は、Understanding null safetyを参照してください。

## Null安全性の原則

Dartは、以下の2つの基本設計原則を使用してヌルの安全性をサポートしています：

- デフォルトでは NULL 値を許容しない。変数が NULL になる可能性があることを Dart に明示的に指示しない限り、その変数は NULL にならないものと見なされます。このデフォルトは、APIにおいてnon-nullが最も一般的な選択肢であるという調査結果を受けて選択されました。
- 完全に健全です。DartのNULL安全性は健全であり、コンパイラの最適化を可能にします。型システムが何かをnullではないと判断した場合、その何かがnullになることはありません。プロジェクト全体とその依存関係をヌル・セーフに移行すれば、バグが減るだけでなく、バイナリが小さくなり、実行速度が速くなるだけでなく、サウンド・セーフのメリットをフルに享受できます。

## Dart3とNull安全性

Dart 3にはサウンド・ヌル・セーフティが組み込まれている。Dart 3はNull安全のないコードが実行されるのを防ぎます。

Dart 3への移行方法については、Dart 3移行ガイドを参照してください。Null安全をサポートせずに開発されたパッケージは、依存関係を解決する際に問題を引き起こします：

```txt
$ dart pub get

Because pkg1 doesn't support null safety, version solving failed.
The lower bound of "sdk: '>=2.9.0 <3.0.0'" must be 2.12.0 or higher to enable null safety.
```

Dart 3と互換性のないライブラリは、解析エラーやコンパイルエラーを引き起こす。

```txt
$ dart analyze .
Analyzing ....                         0.6s

  error • lib/pkg1.dart:1:1 • The language version must be >=2.12.0. 
  Try removing the language version override and migrating the code.
  • illegal_language_version_override
```

```txt
$ dart run bin/my_app.dart
../pkg1/lib/pkg1.dart:1:1: Error: Library doesn't support null safety.
// @dart=2.9
^^^^^^^^^^^^
```

これらの問題を解決するために：

1. pub.devからインストールしたパッケージのNull安全バージョンをチェックする。
2. すべてのソースコードを健全なNull安全を使用するように移行する。

Dart 3はDartとFlutterの安定版チャンネルにあります。詳細については、ダウンロードページをご覧ください。Dart 3との互換性をテストするには、Dart 3以降を使用してください。

```txt
$ dart --version                     # make sure this reports 3.0.0-417.1.beta or higher
$ dart pub get / flutter pub get     # this should resolve without issues
$ dart analyze / flutter analyze     # this should pass without errors
```

pub get ステップが失敗した場合は、依存関係のステータスを確認します。

analyze ステップが失敗した場合は、アナライザがリストした問題を解決するためにコードを更新してください。

## Dart 2.x のNull安全

Dart 2.12 から 2.19 では、Null安全を有効にする必要があります。Dart 2.12 より前のバージョンの SDK では、ヌルセーフティを使用できません。

健全なNull安全を有効にするには、SDK 制約の下界を言語バージョン 2.12 以降に設定します。たとえば、pubspec.yaml ファイルには以下の制約があります：

```yaml
environment:
  sdk: '>=2.12.0 <3.0.0'
```

## 既存コードの移行

::: warning Warning
Dart 3 では、dart migrate ツールが削除されました。コードの移行にお困りの場合は、2.19 SDKでツールを実行し、Dart 3にアップグレードしてください。

ツールを使わなくても移行は可能ですが、手作業によるコードの編集が必要になります。
:::

Null安全をサポートせずに記述された Dart コードは、Null安全を使用するように移行できます。Dart SDKバージョン2.12～2.19に含まれるdart migrateツールの使用をお勧めします。

```txt
$ cd my_app
$ dart migrate
```

コードをNull安全に移行する方法については、移行ガイドをご覧ください。

### 詳細はこちら

Null安全についてもっと知りたい方は、以下のリソースをご覧ください：

- Null安全を理解する
- 既存コードのための移行ガイド
- Null安全のFAQ
- Null安全のサンプルコード