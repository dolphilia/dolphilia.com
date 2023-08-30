# C++アドオン

Addons は C++ で書かれた動的にリンクされる共有オブジェクトです。`require()`関数はアドオンを通常のNode.jsモジュールとしてロードすることができます。アドオンは JavaScript と C/C++ ライブラリ間のインタフェースを提供します。

アドオンの実装には3つのオプションがある：Node-API、nan、または内部 V8、libuv、Node.js ライブラリの直接使用です。Node-APIで公開されていない機能に直接アクセスする必要がない限り、Node-APIを使用してください。Node-API の詳細については、C/C++ addons with Node-API を参照してください。

Node-API を使用しない場合、アドオンの実装は複雑で、複数のコンポーネントや API の知識が必要になります：

* V8: Node.js が JavaScript 実装を提供するために使用する C++ ライブラリ。V8は、オブジェクトの作成や関数の呼び出しなどのメカニズムを提供します。V8 の API は `v8.h` ヘッダーファイル（Node.js のソースツリーでは `deps/v8/include/v8.h`）に記述されています。
* libuv：libuv: Node.js のイベントループ、ワーカースレッド、プラットフォームの非同期ビヘイビアを実装する C ライブラリです。また、クロスプラットフォームの抽象化ライブラリとしても機能し、ファイルシステム、ソケット、タイマー、システムイベントとのやり取りなど、多くの一般的なシステムタスクに対して、すべての主要なオペレーティングシステム上でPOSIXライクなアクセスを簡単に提供します。libuvはまた、標準のイベントループを超える高度な非同期アドオンのために、POSIXスレッドに似たスレッド抽象化を提供します。アドオンの作者は、libuv を介した作業をノンブロッキングのシステム操作、ワーカースレッド、または libuv スレッドのカスタム使用にオフロードすることで、I/O やその他の時間のかかるタスクでイベントループをブロックすることを避ける必要があります。
* 内部 Node.js ライブラリ: Node.js 自身が、アドオンが使用できる C++ API をエクスポートしており、その中で最も重要なものは `node::ObjectWrap` クラスです。
* Node.js は OpenSSL を含む他の静的にリンクされたライブラリを含んでいます。これらのライブラリは Node.js ソースツリーの `deps/` ディレクトリにあります。libuv, OpenSSL, V8, zlib シンボルだけが Node.js によって意図的に再エクスポートされ、アドオンによって様々な範囲で使用されます。追加情報については、Node.js に含まれるライブラリへのリンクを参照してください。

以下のサンプルはすべてダウンロード可能で、アドオンの開始点として使用することができます。

## Hello world

この「Hello world」の例は、C++で書かれたシンプルなアドオンで、次のJavaScriptコードに相当する：

```js
module.exports.hello = () => 'world';
```

まず、`hello.cc`ファイルを作成する：

```cpp
// hello.cc
#include <node.h>

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void Method(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, "world").ToLocalChecked());
}

void Initialize(Local<Object> exports) {
  NODE_SET_METHOD(exports, "hello", Method);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

}  // namespace demo
```

すべてのNode.jsアドオンは、パターンに従った初期化関数をエクスポートする必要があります：

```cpp
void Initialize(Local<Object> exports);
NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)
```

関数ではないので、`NODE_MODULE`の後にセミコロンはありません（`node.h`を参照）。

モジュール名 `module_name` は最終的なバイナリのファイル名と一致しなければならない（接尾辞 `.node` は除く）。

`hello.cc` の例では、初期化関数は `Initialize` で、アドオンモジュール名は `addon` となる。

`node-gyp` でアドオンをビルドする場合、`NODE_GYP_MODULE_NAME` マクロを `NODE_MODULE()` の最初のパラメータとして使用することで、最終的なバイナリの名前を `NODE_MODULE()` に渡すことができます。

NODE_MODULE()` で定義したアドオンは、複数のコンテキストや複数のスレッドで同時にロードすることはできません。

### コンテキスト対応アドオン

Node.js アドオンを複数のコンテキストで複数回ロードする必要がある環境があります。例えば、Electron ランタイムは Node.js の複数のインスタンスを単一のプロセスで実行します。各インスタンスは独自の `require()` キャッシュを持つため、各インスタンスは `require()` 経由でロードされたときに正しく動作するネイティブアドオンが必要になります。つまり、アドオンは複数の初期化をサポートする必要があります。

マクロ `NODE_MODULE_INITIALIZER` は、Node.js がアドオンをロードする際に見つけることを期待する関数の名前に展開されます。以下の例のように、アドオンを初期化することができます：

```cpp
using namespace v8;

extern "C" NODE_MODULE_EXPORT void
NODE_MODULE_INITIALIZER(Local<Object> exports,
                        Local<Value> module,
                        Local<Context> context) {
  /* ここでアドオンの初期化を行います。 */
}
```

マクロ `NODE_MODULE_INIT()` を使用する方法もあります。`NODE_MODULE_INIT()`は、指定されたアドオンのイニシャライザ関数を中心にアドオンを構築するために使用される `NODE_MODULE()` とは異なり、関数本体に続くイニシャライザの宣言として機能します。

NODE_MODULE_INIT()`の呼び出しに続く関数本体の内部では、以下の3つの変数を使用することができる：

* `Local<Object> exports`,
* `Local<Value> module`, and
* `Local<Context> context`

コンテキストを意識したアドオンを構築するという選択には、グローバルな静的データを注意深く管理するという責任が伴います。アドオンは複数回ロードされる可能性があり、異なるスレッドからロードされる可能性もあるため、アドオンに保存されるグローバル静的データは適切に保護されなければならず、JavaScript オブジェクトへの永続的な参照を含んではなりません。なぜなら、JavaScript オブジェクトは 1 つのコンテキストでのみ有効であり、間違ったコンテキストからアクセスしたり、作成時と異なるスレッドからアクセスしたりすると、クラッシュを引き起こす可能性が高いからです。

コンテキスト対応アドオンは、以下の手順を実行することで、グローバルな静的データを回避する構造にすることができます：

* アドオンインスタンスごとのデータを保持し、以下の形式の静的メンバを持つクラスを定義します。

```cpp
static void DeleteInstance(void* data) {
  // Cast `data` to an instance of the class and delete it.
}
  ```
* アドオンのイニシャライザでこのクラスのインスタンスをヒープ確保する。これは `new` キーワードを使用して実現できます。
* `node::AddEnvironmentCleanupHook()`を呼び出し、上記で作成したインスタンスと `DeleteInstance()` へのポインタを渡します。これにより、環境が取り壊されるときにインスタンスが確実に削除されます。
* クラスのインスタンスを `v8::External` に格納する。
* `v8::External`を `v8::FunctionTemplate::New()` または `v8::Function::New()` に渡して、JavaScript に公開するすべてのメソッドに渡す。`v8::FunctionTemplate::New()`または `v8::Function::New()` の3番目のパラメータは `v8::External` を受け取り、`v8::FunctionCallbackInfo::Data()` メソッドを用いてネイティブコールバックで利用できるようにする。

これにより、アドオンインスタンスごとのデータが、JavaScript から呼び出せる各バインディングに確実に届くようになります。アドオンインスタンスごとのデータは、アドオンが作成する非同期コールバックにも渡される必要があります。

次の例は、コンテキスト対応アドオンの実装を示しています：

```cpp
#include <node.h>

using namespace v8;

class AddonData {
 public:
  explicit AddonData(Isolate* isolate):
      call_count(0) {
    // 環境のクリーンアップ時に、このアドオンインスタンスごとのデータが削除されるようにします。
    node::AddEnvironmentCleanupHook(isolate, DeleteInstance, this);
  }

  // アドオンごとのデータ。
  int call_count;

  static void DeleteInstance(void* data) {
    delete static_cast<AddonData*>(data);
  }
};

static void Method(const v8::FunctionCallbackInfo<v8::Value>& info) {
  // アドンインスタンスごとのデータを取得する。
  AddonData* data =
      reinterpret_cast<AddonData*>(info.Data().As<External>()->Value());
  data->call_count++;
  info.GetReturnValue().Set((double)data->call_count);
}

// このアドオンがコンテキストを認識するように初期化する。
NODE_MODULE_INIT(/* exports, module, context */) {
  Isolate* isolate = context->GetIsolate();

  // このアドオンのインスタンス用に `AddonData` の新しいインスタンスを作成し、そのライフサイクルを Node.js 環境のライフサイクルと関連付ける。
  AddonData* data = new AddonData(isolate);

  // データを `v8::External` でラップして、公開するメソッドに渡せるようにする。
  Local<External> external = External::New(isolate, data);

  // メソッド `Method` を JavaScript に公開し、`FunctionTemplate` コンストラクタの 3 番目のパラメータとして `external` を渡して、上で作成したアドオンインスタンスごとのデータを受け取るようにする。
  exports->Set(context,
               String::NewFromUtf8(isolate, "method").ToLocalChecked(),
               FunctionTemplate::New(isolate, Method, external)
                  ->GetFunction(context).ToLocalChecked()).FromJust();
}
```

#### Workerサポート

<!-- YAML
changes:
  - version:
    - v14.8.0
    - v12.19.0
    pr-url: https://github.com/nodejs/node/pull/34572
    description: Cleanup hooks may now be asynchronous.
-->

メインスレッドやWorkerスレッドなど、複数のNode.js環境からロードするためには、アドオンは以下のいずれかを行う必要がある：

* Node-API アドオンである。
* 上記のように `NODE_MODULE_INIT()` を使用してコンテキスト対応として宣言されている。

`Worker` スレッドをサポートするために、アドオンはそのようなスレッドが存在するときに割り当てたリソースをクリーンアップする必要があります。これは `AddEnvironmentCleanupHook()` 関数を使うことで実現できる：

```cpp
void AddEnvironmentCleanupHook(v8::Isolate* isolate,
                               void (*fun)(void* arg),
                               void* arg);
```

この関数は、与えられた Node.js インスタンスがシャットダウンする前に実行されるフックを追加する。必要であれば、同じシグネチャを持つ `RemoveEnvironmentCleanupHook()` を使って、実行前にフックを削除することができます。コールバックは最後から順に実行されます。

必要であれば、追加の `AddEnvironmentCleanupHook()` と `RemoveEnvironmentCleanupHook()` オーバーロードのペアがあり、クリーンアップフックはコールバック関数を受け取る。これは、アドオンによって登録された libuv ハンドルのような非同期リソースをシャットダウンするために使用できます。

次の `addon.cc` は `AddEnvironmentCleanupHook` を使用している：

```cpp
// addon.cc
#include <node.h>
#include <assert.h>
#include <stdlib.h>

using node::AddEnvironmentCleanupHook;
using v8::HandleScope;
using v8::Isolate;
using v8::Local;
using v8::Object;

// 注：実際のアプリケーションでは、静的／グローバルなデータに依存しないこと。
static char cookie[] = "yum yum";
static int cleanup_cb1_called = 0;
static int cleanup_cb2_called = 0;

static void cleanup_cb1(void* arg) {
  Isolate* isolate = static_cast<Isolate*>(arg);
  HandleScope scope(isolate);
  Local<Object> obj = Object::New(isolate);
  assert(!obj.IsEmpty());  // アサートVMはまだ生きている
  assert(obj->IsObject());
  cleanup_cb1_called++;
}

static void cleanup_cb2(void* arg) {
  assert(arg == static_cast<void*>(cookie));
  cleanup_cb2_called++;
}

static void sanity_check(void*) {
  assert(cleanup_cb1_called == 1);
  assert(cleanup_cb2_called == 1);
}

// このアドオンがコンテキストを認識するように初期化する。
NODE_MODULE_INIT(/* exports, module, context */) {
  Isolate* isolate = context->GetIsolate();

  AddEnvironmentCleanupHook(isolate, sanity_check, nullptr);
  AddEnvironmentCleanupHook(isolate, cleanup_cb2, cookie);
  AddEnvironmentCleanupHook(isolate, cleanup_cb1, isolate);
}
```

Test in JavaScript by running:

```js
// test.js
require('./build/Release/addon');
```

### 建物

ソースコードを書き終えたら、バイナリの `addon.node` ファイルにコンパイルしなければならない。そのためには、プロジェクトのトップレベルに `binding.gyp` というファイルを作成し、JSON ライクなフォーマットでモジュールのビルド設定を記述する。このファイルは、Node.jsアドオンをコンパイルするために特別に書かれたツールであるnode-gypによって使用されます。

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "hello.cc" ]
    }
  ]
}
```

`node-gyp` ユーティリティのバージョンは Node.js にバンドルされ、 `npm` の一部として配布される。このバージョンは開発者が直接使用できるようにはなっておらず、アドオンをコンパイルしてインストールするために `npm install` コマンドを使用する機能をサポートすることのみを目的としています。node-gyp` を直接使いたい開発者は `npm install -g node-gyp` コマンドを使ってインストールすることができる。プラットフォーム固有の要件など、詳細については `node-gyp` のインストール手順を参照してほしい。

binding.gyp` ファイルを作成したら、 `node-gyp configure` を使用して、現在のプラットフォームに適したプロジェクトのビルドファイルを生成する。これは `Makefile` (Unix プラットフォームの場合) または `vcxproj` ファイル (Windows の場合) を `build/` ディレクトリに生成します。

次に、コンパイルした `addon.node` ファイルを生成するために `node-gyp build` コマンドを実行する。このファイルは `build/Release/` ディレクトリに置かれる。

npm install` を使用して Node.js アドオンをインストールする場合、npm はバンドルされているバージョンの `node-gyp` を使用して、これと同じ一連のアクションを実行し、ユーザのプラットフォーム用にコンパイルされたバージョンのアドオンを必要に応じて生成します。

一度ビルドされたバイナリアドオンは、ビルドされた `addon.node` モジュールに `require()` を指定することで Node.js 内から使用することができます：

```js
// hello.js
const addon = require('./build/Release/addon');

console.log(addon.hello());
// Prints: 'world'
```

コンパイルされたアドオンバイナリの正確なパスはコンパイル方法によって異なるため (`./build/Debug/` にあることもあります)、アドオンは bindings パッケージを使ってコンパイルされたモジュールをロードすることができます。

`bindings` パッケージの実装は、アドオンモジュールを見つける方法がより洗練されていますが、基本的には `try...catch` に似たパターンを使用しています：

```js
try {
  return require('./build/Release/addon.node');
} catch (err) {
  return require('./build/Debug/addon.node');
}
```

### Node.jsに含まれるライブラリへのリンク

Node.jsは、V8、libuv、OpenSSLなどの静的にリンクされたライブラリを使用します。すべてのアドオンは V8 にリンクする必要があり、他の依存ライブラリにもリンクできます。一般的には、適切な `#include <...>` ステートメント（例えば `#include <v8.h>`）を含めるだけで、 `node-gyp` が適切なヘッダを自動的に探してくれます。ただし、いくつか注意すべき点があります：

* `node-gyp` が実行されると、Node.js の特定のリリースバージョンを検出し、完全なソースの tarball またはヘッダーのみをダウンロードします。node-gyp` が実行されると、Node.js の特定のリリースバージョンを検出し、完全なソースの tarball か、ヘッダーのみをダウンロードします。しかし、Node.js ヘッダのみがダウンロードされた場合、Node.js によってエクスポートされたシンボルのみが利用可能になります。

* `node-gyp` は、ローカルの Node.js ソースイメージを指す `--nodedir` フラグを使用して実行できます。このオプションを使用すると、アドオンは依存関係のフルセットにアクセスできるようになります。

### `require()`を使ったアドオンの読み込み

コンパイルされたアドオンバイナリの拡張子は `.node` です (`.dll` や `.so` とは異なります)。require()`関数は `.node` という拡張子のファイルを探し、ダイナミックリンクライブラリとして初期化するように書かれています。

`require()`を呼び出すとき、通常は拡張子 `.node` を省略することができ、Node.js はアドオンを見つけて初期化します。ただし、注意点として、Node.js は最初に同じベース名を持つモジュールや JavaScript ファイルを探してロードしようとします。例えば、バイナリの `addon.node` と同じディレクトリに `addon.js` ファイルがある場合、 `require('addon')` は `addon.js` ファイルを優先してロードします。

## Node.jsのネイティブ抽象化機能

このドキュメントで説明する各例では、アドオンを実装するために Node.js と V8 API を直接使用しています。V8 API は、V8 のリリースごとに（そして Node.js のメジャーリリースごとに）劇的に変更される可能性があります。変更のたびに、アドオンは機能し続けるために更新と再コンパイルが必要になるかもしれません。Node.jsのリリーススケジュールは、このような変更の頻度と影響を最小限に抑えるように設計されていますが、V8 APIの安定性を確保するためにNode.jsができることはほとんどありません。

Native Abstractions for Node.js (または `nan`) は、アドオン開発者が V8 と Node.js の過去と将来のリリース間の互換性を保つために使用することを推奨するツールのセットを提供します。どのように使用できるかは `nan` のサンプルを参照してください。

## Node-API

> Stability: 2 - Stable

Node-APIは、ネイティブアドオンを構築するためのAPIです。基礎となるJavaScriptランタイム（例えばV8）から独立しており、Node.js自体の一部として維持されています。このAPIは、Node.jsのバージョン間でアプリケーション・バイナリ・インタフェース（ABI）が安定しています。これは、基礎となるJavaScriptエンジンの変更からアドオンを隔離し、あるバージョン用にコンパイルされたモジュールが再コンパイルすることなくNode.jsの後のバージョンで実行できるようにすることを目的としています。アドオンは、このドキュメント（node-gyp など）で概説されているのと同じアプローチ/ツールでビルド/パッケージ化されます。唯一の違いは、ネイティブコードで使用されるAPIのセットです。V8 または Native Abstractions for Node.jsAPI を使用する代わりに、Node-API で利用可能な関数が使用されます。

Node-API によって提供される ABI の安定性の恩恵を受けるアドオンの作成と保守には、 特定の実装上の考慮事項が伴います。

上記の「Hello world」の例で Node-API を使用するには、`hello.cc` の内容を以下に置き換えます。その他の命令はすべて同じです。

```cpp
// hello.cc using Node-API
#include <node_api.h>

namespace demo {

napi_value Method(napi_env env, napi_callback_info args) {
  napi_value greeting;
  napi_status status;

  status = napi_create_string_utf8(env, "world", NAPI_AUTO_LENGTH, &greeting);
  if (status != napi_ok) return nullptr;
  return greeting;
}

napi_value init(napi_env env, napi_value exports) {
  napi_status status;
  napi_value fn;

  status = napi_create_function(env, nullptr, 0, Method, nullptr, &fn);
  if (status != napi_ok) return nullptr;

  status = napi_set_named_property(env, exports, "hello", fn);
  if (status != napi_ok) return nullptr;
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, init)

}  // namespace demo
```

利用可能な関数とその使用方法は、Node-APIを使用したC/C++アドオンに記載されています。

## アドオンの例

以下は、開発者がアドオンを始めるためのサンプルです。例では V8 API を使用しています。また、ハンドル、スコープ、関数テンプレートなどの概念については、V8 Embedder's Guideを参照してください。

これらの例では次の `binding.gyp` ファイルを使用しています：

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc" ]
    }
  ]
}
```

``.cc`ファイルが複数ある場合は、追加したファイル名を `sources` 配列に追加するだけでよい：

```json
"sources": ["addon.cc", "myexample.cc"]
```

`binding.gyp`ファイルの準備ができたら、`node-gyp`を使用してサンプルアドオンを設定し、ビルドすることができます：

```bash
node-gyp configure build
```

### 関数引数

アドオンは通常、Node.js 内で実行されている JavaScript からアクセスできるオブジェクトや関数を公開します。関数がJavaScriptから呼び出される場合、入力引数と戻り値はC/C++コードとマッピングされなければなりません。

次の例では、JavaScript から渡された関数引数を読み取り、結果を返す方法を説明します：

```cpp
// addon.cc
#include <node.h>

namespace demo {

using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

// 入力引数は、const FunctionCallbackInfo<Value>& args structを使用して渡される。
void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  // 渡された引数の数をチェックする。
  if (args.Length() < 2) {
    // JavaScriptに返されるエラーを投げる
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate,
                            "Wrong number of arguments").ToLocalChecked()));
    return;
  }

  // 引数のタイプをチェックする
  if (!args[0]->IsNumber() || !args[1]->IsNumber()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate,
                            "Wrong arguments").ToLocalChecked()));
    return;
  }

  // オペレーションの実施
  double value =
      args[0].As<Number>()->Value() + args[1].As<Number>()->Value();
  Local<Number> num = Number::New(isolate, value);

  // 戻り値を設定する（渡されたFunctionCallbackInfo<Value>&を使用）。
  args.GetReturnValue().Set(num);
}

void Init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "add", Add);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo
```

コンパイルが完了したら、Node.js 内から例のアドオンを要求し、使用することができます：

```js
// test.js
const addon = require('./build/Release/addon');

console.log('This should be eight:', addon.add(3, 5));
```

### コールバック

アドオンでは、JavaScript 関数を C++ 関数に渡し、そこから実行するのが一般的です。次の例は、このようなコールバックを呼び出す方法を示しています：

```cpp
// addon.cc
#include <node.h>

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Null;
using v8::Object;
using v8::String;
using v8::Value;

void RunCallback(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();
  Local<Function> cb = Local<Function>::Cast(args[0]);
  const unsigned argc = 1;
  Local<Value> argv[argc] = {
      String::NewFromUtf8(isolate,
                          "hello world").ToLocalChecked() };
  cb->Call(context, Null(isolate), argc, argv).ToLocalChecked();
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", RunCallback);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo
```

この例では、2 つの引数を持つ `Init()` を使用し、2 番目の引数として完全な `module` オブジェクトを受け取ります。これにより、アドオンは `exports` のプロパティとして関数を追加するのではなく、単一の関数で `exports` を完全に上書きすることができる。

テストするには、以下のJavaScriptを実行する：

```js
// test.js
const addon = require('./build/Release/addon');

addon((msg) => {
  console.log(msg);
// Prints: 'hello world'
});
```

この例では、コールバック関数は同期的に呼び出される。

### オブジェクト・ファクトリ

アドオンは、次の例に示すように、C++ 関数内から新しいオブジェクトを作成して返すことができます。オブジェクトが作成され、`createObject()` に渡された文字列を echo する `msg` プロパティとともに返される：

```cpp
// addon.cc
#include <node.h>

namespace demo {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  Local<Object> obj = Object::New(isolate);
  obj->Set(context,
           String::NewFromUtf8(isolate,
                               "msg").ToLocalChecked(),
                               args[0]->ToString(context).ToLocalChecked())
           .FromJust();

  args.GetReturnValue().Set(obj);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", CreateObject);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo
```

JavaScriptでテストする：

```js
// test.js
const addon = require('./build/Release/addon');

const obj1 = addon('hello');
const obj2 = addon('world');
console.log(obj1.msg, obj2.msg);
// Prints: 'hello world'
```

### 関数ファクトリ

もうひとつのよくあるシナリオは、C++関数をラップしたJavaScript関数を作り、それをJavaScriptに返すというものだ：

```cpp
// addon.cc
#include <node.h>

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void MyFunction(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(
      isolate, "hello world").ToLocalChecked());
}

void CreateFunction(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  Local<Context> context = isolate->GetCurrentContext();
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, MyFunction);
  Local<Function> fn = tpl->GetFunction(context).ToLocalChecked();

  // 匿名にする場合は省略
  fn->SetName(String::NewFromUtf8(
      isolate, "theFunction").ToLocalChecked());

  args.GetReturnValue().Set(fn);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", CreateFunction);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace demo
```

To test:

```js
// test.js
const addon = require('./build/Release/addon');

const fn = addon();
console.log(fn());
// Prints: 'hello world'
```

### C++オブジェクトのラッピング

JavaScriptの `new` 演算子を使用して新しいインスタンスを作成できるように、C++ オブジェクト/クラスをラップすることも可能です：

```cpp
// addon.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using v8::Local;
using v8::Object;

void InitAll(Local<Object> exports) {
  MyObject::Init(exports);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)

}  // namespace demo
```

次に、`myobject.h` でラッパークラスは `node::ObjectWrap` を継承する：

```cpp
// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include <node_object_wrap.h>

namespace demo {

class MyObject : public node::ObjectWrap {
 public:
  static void Init(v8::Local<v8::Object> exports);

 private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);

  double value_;
};

}  // namespace demo

#endif
```

`myobject.cc`で、公開するメソッドを実装する。以下では、コンストラクタのプロトタイプにメソッド `plusOne()` を追加して公開している：

```cpp
// myobject.cc
#include "myobject.h"

namespace demo {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::ObjectTemplate;
using v8::String;
using v8::Value;

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

void MyObject::Init(Local<Object> exports) {
  Isolate* isolate = exports->GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  Local<ObjectTemplate> addon_data_tpl = ObjectTemplate::New(isolate);
  addon_data_tpl->SetInternalFieldCount(1);  // 1 field for the MyObject::New()
  Local<Object> addon_data =
      addon_data_tpl->NewInstance(context).ToLocalChecked();

  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New, addon_data);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);

  Local<Function> constructor = tpl->GetFunction(context).ToLocalChecked();
  addon_data->SetInternalField(0, constructor);
  exports->Set(context, String::NewFromUtf8(
      isolate, "MyObject").ToLocalChecked(),
      constructor).FromJust();
}

void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new MyObject(...)`
    double value = args[0]->IsUndefined() ?
        0 : args[0]->NumberValue(context).FromMaybe(0);
    MyObject* obj = new MyObject(value);
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `MyObject(...)`, turn into construct call.
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons =
        args.Data().As<Object>()->GetInternalField(0).As<Function>();
    Local<Object> result =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(result);
  }
}

void MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.Holder());
  obj->value_ += 1;

  args.GetReturnValue().Set(Number::New(isolate, obj->value_));
}

}  // namespace demo
```

このサンプルをビルドするには、`myobject.cc`ファイルを`binding.gyp`に追加しなければならない：

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [
        "addon.cc",
        "myobject.cc"
      ]
    }
  ]
}
```

Test it with:

```js
// test.js
const addon = require('./build/Release/addon');

const obj = new addon.MyObject(10);
console.log(obj.plusOne());
// Prints: 11
console.log(obj.plusOne());
// Prints: 12
console.log(obj.plusOne());
// Prints: 13
```

ラッパー・オブジェクトのデストラクタは、そのオブジェクトがガベージ・コレクションされたときに実行されます。デストラクタのテストのために、強制的にガベージ・コレクションを実行できるコマンドライン・フラグがあります。これらのフラグはV8 JavaScriptエンジンによって提供されています。これらはいつでも変更または削除される可能性があります。これらは Node.js や V8 によって文書化されておらず、テスト以外では決して使用しないでください。

プロセスやワーカースレッドのシャットダウン時に、JSエンジンはデストラクタを呼び出しません。したがって、これらのオブジェクトを追跡し、リソースリークを避けるために適切に破棄するのはユーザーの責任です。

### ラップされたオブジェクトのファクトリー

あるいは、ファクトリーパターンを使って、JavaScript の `new` 演算子を使った明示的なオブジェクトインスタンスの生成を避けることもできます：

```js
const obj = addon.createObject();
// instead of:
// const obj = new addon.Object();
```

まず、`createObject()` メソッドは `addon.cc` に実装されている：

```cpp
// addon.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  MyObject::NewInstance(args);
}

void InitAll(Local<Object> exports, Local<Object> module) {
  MyObject::Init(exports->GetIsolate());

  NODE_SET_METHOD(module, "exports", CreateObject);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)

}  // namespace demo
```

`myobject.h`では、オブジェクトのインスタンスを生成するための静的メソッド `NewInstance()` が追加されている。このメソッドはJavaScriptで `new` を使う代わりとなる：

```cpp
// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include <node_object_wrap.h>

namespace demo {

class MyObject : public node::ObjectWrap {
 public:
  static void Init(v8::Isolate* isolate);
  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);

 private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void PlusOne(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Global<v8::Function> constructor;
  double value_;
};

}  // namespace demo

#endif
```

`myobject.cc`の実装は前の例と似ている：

```cpp
// myobject.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using node::AddEnvironmentCleanupHook;
using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Global;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

// 警告このアドオンはワーカースレッドには使用できません。
Global<Function> MyObject::constructor;

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

void MyObject::Init(Isolate* isolate) {
  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  NODE_SET_PROTOTYPE_METHOD(tpl, "plusOne", PlusOne);

  Local<Context> context = isolate->GetCurrentContext();
  constructor.Reset(isolate, tpl->GetFunction(context).ToLocalChecked());

  AddEnvironmentCleanupHook(isolate, [](void*) {
    constructor.Reset();
  }, nullptr);
}

void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new MyObject(...)`
    double value = args[0]->IsUndefined() ?
        0 : args[0]->NumberValue(context).FromMaybe(0);
    MyObject* obj = new MyObject(value);
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `MyObject(...)`, turn into construct call.
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    Local<Object> instance =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(instance);
  }
}

void MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  const unsigned argc = 1;
  Local<Value> argv[argc] = { args[0] };
  Local<Function> cons = Local<Function>::New(isolate, constructor);
  Local<Context> context = isolate->GetCurrentContext();
  Local<Object> instance =
      cons->NewInstance(context, argc, argv).ToLocalChecked();

  args.GetReturnValue().Set(instance);
}

void MyObject::PlusOne(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.Holder());
  obj->value_ += 1;

  args.GetReturnValue().Set(Number::New(isolate, obj->value_));
}

}  // namespace demo
```

もう一度言うが、このサンプルをビルドするには、`myobject.cc`ファイルを`binding.gyp`に追加しなければならない：

```json
{
  "targets": [
    {
      "target_name": "addon",
      "sources": [
        "addon.cc",
        "myobject.cc"
      ]
    }
  ]
}
```

テストする:

```js
// test.js
const createObject = require('./build/Release/addon');

const obj = createObject(10);
console.log(obj.plusOne());
// Prints: 11
console.log(obj.plusOne());
// Prints: 12
console.log(obj.plusOne());
// Prints: 13

const obj2 = createObject(20);
console.log(obj2.plusOne());
// Prints: 21
console.log(obj2.plusOne());
// Prints: 22
console.log(obj2.plusOne());
// Prints: 23
```

### ラップされたオブジェクトの受け渡し

C++ オブジェクトをラップして返すだけでなく、Node.js のヘルパー関数 `node::ObjectWrap::Unwrap` を使ってラップを解いて、ラップされたオブジェクトを渡すこともできる。以下の例では、2 つの `MyObject` オブジェクトを入力引数として受け取ることができる関数 `add()` を示している：

```cpp
// addon.cc
#include <node.h>
#include <node_object_wrap.h>
#include "myobject.h"

namespace demo {

using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::String;
using v8::Value;

void CreateObject(const FunctionCallbackInfo<Value>& args) {
  MyObject::NewInstance(args);
}

void Add(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  MyObject* obj1 = node::ObjectWrap::Unwrap<MyObject>(
      args[0]->ToObject(context).ToLocalChecked());
  MyObject* obj2 = node::ObjectWrap::Unwrap<MyObject>(
      args[1]->ToObject(context).ToLocalChecked());

  double sum = obj1->value() + obj2->value();
  args.GetReturnValue().Set(Number::New(isolate, sum));
}

void InitAll(Local<Object> exports) {
  MyObject::Init(exports->GetIsolate());

  NODE_SET_METHOD(exports, "createObject", CreateObject);
  NODE_SET_METHOD(exports, "add", Add);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)

}  // namespace demo
```

`myobject.h`では、オブジェクトをアンラップした後にプライベートな値にアクセスできるように、新しいpublicメソッドが追加されている。

```cpp
// myobject.h
#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <node.h>
#include <node_object_wrap.h>

namespace demo {

class MyObject : public node::ObjectWrap {
 public:
  static void Init(v8::Isolate* isolate);
  static void NewInstance(const v8::FunctionCallbackInfo<v8::Value>& args);
  inline double value() const { return value_; }

 private:
  explicit MyObject(double value = 0);
  ~MyObject();

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Global<v8::Function> constructor;
  double value_;
};

}  // namespace demo

#endif
```

`myobject.cc`の実装は以前と似ている：

```cpp
// myobject.cc
#include <node.h>
#include "myobject.h"

namespace demo {

using node::AddEnvironmentCleanupHook;
using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Global;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;

// 警告このアドオンはワーカースレッドには使用できません。
Global<Function> MyObject::constructor;

MyObject::MyObject(double value) : value_(value) {
}

MyObject::~MyObject() {
}

void MyObject::Init(Isolate* isolate) {
  // コンストラクタ・テンプレートの準備
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "MyObject").ToLocalChecked());
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  Local<Context> context = isolate->GetCurrentContext();
  constructor.Reset(isolate, tpl->GetFunction(context).ToLocalChecked());

  AddEnvironmentCleanupHook(isolate, [](void*) {
    constructor.Reset();
  }, nullptr);
}

void MyObject::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  Local<Context> context = isolate->GetCurrentContext();

  if (args.IsConstructCall()) {
    // コンストラクタとして呼び出される: `new MyObject(...)`
    double value = args[0]->IsUndefined() ?
        0 : args[0]->NumberValue(context).FromMaybe(0);
    MyObject* obj = new MyObject(value);
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // プレーンな関数 `MyObject(...)` として呼び出されると、コンストラクトコールに変わる。
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    Local<Object> instance =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(instance);
  }
}

void MyObject::NewInstance(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  const unsigned argc = 1;
  Local<Value> argv[argc] = { args[0] };
  Local<Function> cons = Local<Function>::New(isolate, constructor);
  Local<Context> context = isolate->GetCurrentContext();
  Local<Object> instance =
      cons->NewInstance(context, argc, argv).ToLocalChecked();

  args.GetReturnValue().Set(instance);
}

}  // namespace demo
```

テストする：

```js
// test.js
const addon = require('./build/Release/addon');

const obj1 = addon.createObject(10);
const obj2 = addon.createObject(20);
const result = addon.add(obj1, obj2);

console.log(result);
// Prints: 30
```

- Electron
- Embedder's Guide
- Linking to libraries included with Node.js
- Native Abstractions for Node.js
- V8
- `Worker`
- bindings
- download
- examples
- implementation considerations
- installation instructions
- libuv
- node-gyp
- require
- v8-docs