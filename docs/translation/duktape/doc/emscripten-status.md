# Emscriptenの互換性の状況

## Hello world test

早速、ハローワールドテスト::

```sh
$ emcc --memory-init-file 0 \.
        -s WASM=0 -s POLYFILL_OLD_MATH_FUNCTIONS=1 \.
        tests/hello_world.cpp -o /tmp/test.js
$ duk /tmp/test.js
```

微調整が必要です。

* `--memory-init-file 0`: 外部メモリファイルを使用しないようにします。
* `-s WASM=0`: DuktapeがWebAssemblyをサポートしていないため、WebAssemblyのサポートを無効にします。
* `-s POLYFILL_OLD_MATH_FUNCTIONS`: Math.fround() のようなES5.1以降のMath関数を仮定しないようにしました。

通常、これで十分です。  もし、Duktapeを少量のメモリで実行している場合（例えば、Duktapeコマンドラインツールを `-r` オプションで実行している場合）、以下の追加オプションでEmscriptionの「仮想メモリ」サイズを縮小する必要があるかもしれません。

* `-s TOTAL_MEMORY=2097152` : メモリー不足にならないように総メモリー容量を減らします。
* `-s TOTAL_STACK=524288` : 減らしたメモリサイズに収まるようにスタックサイズを小さくします。

Duktapeのバージョンにおける変更点。

* Duktape 1.3から、ES2015 TypedArraysをサポートし、Duktape 1.2よりもEmscriptenの動作が良くなり、Emscripten fastcompを使用できるようになりました。
* Duktape 1.5以降、Emscriptenで生成されたコードを実行するための修正は必要ありません。また、関数 `.toString()` の出力が、Emscriptenの正規表現に適合するように変更されました。  以前はフィックスアップスクリプトが必要でした::

```sh
$ python $DUKTAPE/util/fix_emscripten.py < /tmp/test.js > /tmp/test-fixed.js
```

## Duktape 用の emcc のセットアップ

動作する `emcc` をセットアップする Docker イメージファイルについては docker/ を参照してください。

## 以下も参照してください。

* https://github.com/kripken/emscripten/wiki/Optimizing-Code
* http://mozakai.blogspot.fi/2013/08/outlining-workaround-for-jits-and-big.html
