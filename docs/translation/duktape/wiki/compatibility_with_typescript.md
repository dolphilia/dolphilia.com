# TypeScriptとの互換性

## TypeScriptでコンパイルしたコードをDuktapeで実行する。

既知の問題はありません。

## DuktapeでTypeScriptコンパイラを実行する

DuktapeでMicrosoftのTypeScriptコンパイラーを実行することができます。Duktape 1.5.0以降では、正規表現の修正は必要ありません。Duktape 1.5.0以前では、正規表現中のエスケープされていない中括弧を修正する必要がありました。

参照:

- https://github.com/svaarala/duktape/issues/523#issuecomment-172391196
- https://github.com/AtomicGameEngine/AtomicGameEngine/pull/614
