# Duktapeの概要 日本語訳 {#top}

[原文](https://duktape.org/index.html)

Duktapeは移植性とコンパクトなフットプリントに重点を置いた、組み込み可能なJavascriptエンジンです。

DuktapeはC/C++プロジェクトに簡単に統合できます。ビルドにduktape.c、duktape.h、duk_config.hを追加し、Duktape APIを使ってCコードからECMAScriptの関数を呼び出したり、逆にECMAScriptからCコードに関数を呼び出したりすることができます。


## 特徴 {#feature}

- 組み込み可能、ポータブル、コンパクト：160kB フラッシュと 64kB RAM のプラットフォームで実行可能。
- [ECMAScript E5/E5.1](http://www.ecma-international.org/ecma-262/5.1/)、一部のセマンティクスは ES2015+ から更新されています。
- [ECMAScript 2015 (E6)](http://www.ecma-international.org/ecma-262/6.0/index.html) と [ECMAScript 2016 (E7)](http://www.ecma-international.org/ecma-262/7.0/index.html) を部分的にサポート、[Post-ES5 feature status](http://wiki.duktape.org/PostEs5Features.html) と [kangax/compat-table](https://kangax.github.io/compat-table) を参照してください。
- ES2015 [TypedArray](https://www.khronos.org/registry/typedarray/specs/latest/)および[Node.js Buffer](https://nodejs.org/docs/v6.9.1/api/buffer.html)バインディング
- [CBOR](http://cbor.io/)バインディング
- WHATWG Encoding Living Standardに基づく[エンコーディングAPI](https://encoding.spec.whatwg.org/#api)バインディング
- [performance.now()](https://www.w3.org/TR/hr-time/#dom-performance-now)
- ビルトインデバッガ
- ビルトイン正規表現エンジン
- 内蔵のUnicodeサポート
- 最小限の、再ターゲット可能なプラットフォーム依存性
- 参照カウントとマーク＆スイープ・ガベージコレクションの組み合わせとファイナリゼーション
- コルーチン
- ECMAScript ES2015 Proxy オブジェクトのサブセットを使用したプロパティの仮想化
- コンパイルされた関数をキャッシュするためのバイトコードダンプ/ロード
- 配布可能なものには、オプションでロギングフレームワーク、CommonJSベースのモジュールロード実装などがあります。
- リベラルライセンス(MIT)


## コードとRAMのフットプリント {#footprint}

Hello worldの[例](https://github.com/svaarala/duktape/blob/master/util/index_page_sizes.sh):

| Config | Code footprint (kB) | Startup RAM (kB) |
| ---- | ---- | ---- |
| thumb default | 148 | 78 |
| thumb lowmem | 96 | 27 |
| thumb full lowmem | 119 | 1.5 |
| x86 default | 187 | 78 |
| x86 lowmem | 124 | 27 |
| x86 full lowmem | 148 | 1.5 |

コードのフットプリントを最小にするための[GCCオプション](https://github.com/svaarala/duktape/blob/master/doc/low-memory.rst#optimizing-code-footprint)を参照してください。完全な[ローメモリ](https://github.com/svaarala/duktape/blob/master/doc/low-memory.rst)では、ポインタ圧縮とROMベースの文字列/オブジェクトを使用します。ROMベースの文字列/オブジェクトは、他のローメモリオプションなしで使うこともできます。


## 現在の状況 {#status}

- 安定版


## サポート {#support}

- Duktape Wiki: [wiki.duktape.org](http://wiki.duktape.org/)
- ユーザーコミュニティのQ&A: Stack Overflowの[duktape](http://stackoverflow.com/questions/tagged/duktape)タグ
- バグや機能の要望: [GitHubのissues](https://github.com/svaarala/duktape/issues)
- 一般的な議論: IRC #duktape on chat.freenode.net ([webchat](https://webchat.freenode.net/))


## Duktapeを使用したいくつかのプロジェクト {#example}

[Duktapeを使用しているプロジェクト](http://wiki.duktape.org/ProjectsUsingDuktape.html)を参照してください。

もしあなたのプロジェクトでDuktapeを使っているなら、リストに追加するためにメールを送るか、GitHubのissuesを開いてください。


## 類似エンジン {#similar}

少なくともDuktapeと同様のユースケースをターゲットにしたJavascriptエンジンは複数存在します。

- [Espruino](https://github.com/espruino/Espruino) (MPL v2.0)
- [JerryScript](http://jerryscript.net/) (Apache License v2.0)
- [MuJS](http://mujs.com/) (Affero GPL)
- [quad-wheel](https://code.google.com/p/quad-wheel/) (MIT License)
- [QuickJS](https://bellard.org/quickjs/) (MIT License)
- [tiny-js](https://github.com/gfwilliams/tiny-js) (MIT license)
- [v7](https://github.com/cesanta/v7) (GPL v2.0)

[ECMAScriptエンジンの一覧](https://en.wikipedia.org/wiki/List_of_ECMAScript_engines)も参照してください。


## 1. ビルドに追加する {#reserve}

(詳しい紹介は[Getting started](https://duktape.org/guide.html#gettingstarted)をご覧ください)

Duktape Cのソースとヘッダをビルドに追加します。どのようなビルドシステムでも使用できます。配布物には、参考までにMakefileの例が含まれています。最も単純なケースでは

```
$ gcc -std=c99 -otest test.c duktape.c -lm
$ ./test
1+2=3
```


[Duktapeの設定をカスタマイズ](http://wiki.duktape.org/Configuring.html)するには、ここでECMAScript 6 Proxyオブジェクトのサポートを無効にしてください。

```
$ python2 duktape-2.6.0/tools/configure.py --output-directory src-duktape \
      -UDUK_USE_ES6_PROXY
$ ls src-duktape/
duk_config.h  duk_source_meta.json  duktape.c  duktape.h
$ gcc -std=c99 -otest -Isrc-duktape \
      test.c src-duktape/duktape.c -lm
$ ./test
1+2=3
```


## 2 コンテキストを初期化する {#initialize}

プログラムのどこかでDuktapeを初期化し、使用する。

```c
/* test.c */
#include <stdio.h>
#include "duktape.h"

int main(int argc, char *argv[]) {
  duk_context *ctx = duk_create_heap_default();
  duk_eval_string(ctx, "1+2");
  printf("1+2=%d\n", (int) duk_get_int(ctx, -1));
  duk_destroy_heap(ctx);
  return 0;
}
```


## 3. C関数バインディングの追加 {#binding}

ECMAScript のコードから C の関数を呼び出すには、まず C の関数を宣言します。

```c
/* 組み込みエンジンであるDuktapeは、
 * デフォルトではI/Oバインディングを提供しません。
 * 以下は引数が１つの単純なprint()関数です。
 */

static duk_ret_t native_print(duk_context *ctx) {
  printf("%s\n", duk_to_string(ctx, 0));
  return 0;  /* no return value (= undefined) */
}

/* Adder: 引数の値を加算する。 */
static duk_ret_t native_adder(duk_context *ctx) {
  int i;
  int n = duk_get_top(ctx);  /* #args */
  double res = 0.0;

  for (i = 0; i < n; i++) {
    res += duk_to_number(ctx, i);
  }

  duk_push_number(ctx, res);
  return 1;  /* one return value */
}
```


作成した関数をグローバルオブジェクトに登録するなどしてください。

```c
duk_push_c_function(ctx, native_print, 1 /*nargs*/);
duk_put_global_string(ctx, "print");
duk_push_c_function(ctx, native_adder, DUK_VARARGS);
duk_put_global_string(ctx, "adder");
```


そして、ECMAScriptのコードから関数を呼び出すことができます。

```javascript
duk_eval_string_noresult(ctx, "print('2+3=' + adder(2, 3));");
```

---

Duktape is (C) by its [authors](https://github.com/svaarala/duktape/blob/master/AUTHORS.rst) and licensed under the [MIT license](https://github.com/svaarala/duktape/blob/master/LICENSE.txt).