# 文字列バッファライブラリ

文字列バッファライブラリは、文字列のようなデータの高性能な操作を可能にします。

Luaの文字列が定数であるのに対し、文字列バッファは8ビット（バイナリ透過的な）文字の可変シーケンスです。データは文字列バッファに格納、フォーマット、エンコードされ、後で変換、抽出、デコードされます。

便利な文字列バッファAPIは、多くの中間文字列を作成することを要求する通常の文字列操作タスクを簡素化します。文字列バッファは冗長なメモリコピー、オブジェクト生成、文字列インターニング、ガーベージコレクションのオーバーヘッドを排除することでパフォーマンスを向上させます。FFIライブラリと併用することで、ゼロコピー操作を可能にします。

文字列バッファライブラリには、Luaオブジェクトのための高性能なシリアライザも含まれています。

## 文字列バッファライブラリの使用

文字列バッファライブラリはLuaJITにデフォルトで組み込まれていますが、デフォルトで読み込まれるわけではありません。その関数が必要なLuaファイルの先頭に次のコードを追加します：

```lua
local buffer = require("string.buffer")
```

このページに示されている構文の慣習では、bufferはバッファライブラリを指し、bufは個々のバッファオブジェクトを指します。

Lua関数呼び出し（例: buffer.new()、ドット付き）とLuaメソッド呼び出し（例: buf:reset()、コロン付き）の違いに注意してください。

### バッファオブジェクト

バッファオブジェクトは、ガーベージコレクションされるLuaオブジェクトです。buffer.new()で作成された後、多くの操作に再利用することができ（そしてすべきです）。バッファオブジェクトへの最後の参照がなくなると、最終的にガーベージコレクタによって割り当てられたバッファスペースと共に解放されます。

バッファはFIFO（先入れ先出し）データ構造のように動作します。データはバッファの末尾に追加（書き込み）され、バッファの前から消費（読み取り）されます。これらの操作は自由に混在させることができます。

バッファに保持される文字のスペースは自動的に管理されます。必要に応じて拡大し、既に消費されたスペースは再利用されます。より詳細な制御が必要な場合は、buffer.new(size) と buf:free() を使用します。

単一バッファの最大サイズはLua文字列の最大サイズと同じで、2ギガバイト未満です。巨大なデータサイズの場合、文字列でもバッファでも適切なデータ構造ではありません。OSの仮想メモリ制限まで直接メモリまたはファイルをマップするには、FFIライブラリを使用してください。

### バッファメソッドの概要

- buf:put*() のようなメソッドは、バッファの末尾に文字を追加（書き込み）します。
- buf:get*() のようなメソッドは、バッファの前から文字を消費（読み取り）します。
- buf:tostring() のような他のメソッドは、バッファの内容を読み取るだけで、バッファを変更しません。
- buf:set() メソッドは、文字列やFFI cdataオブジェクトをバッファとしてゼロコピー消費することを可能にします。
- FFI特有のメソッドは、ゼロコピーの読み書きスタイルの操作を可能にするか、またはバッファの内容をその場で変更します。FFIの注意点も確認してください。
- 特に返す必要がないメソッドは、便宜上バッファオブジェクト自体を返します。これにより、メソッドチェーンが可能になります。例えば：buf:reset():encode(obj) や buf:skip(len):get() など。

## バッファの作成と管理

### `local buf = buffer.new([size [,options]])`
### `local buf = buffer.new([options])`

新しいバッファオブジェクトを作成します。

オプションのsize引数は、最小の初期バッファサイズを保証します。これは、必要なバッファサイズが事前に分かっている場合の最適化に過ぎません。いずれにせよ、バッファスペースは必要に応じて拡大します。

オプションのtable optionsは、さまざまなシリアライゼーションオプションを設定します。

### buf = buf:reset()

バッファをリセット（空に）します。割り当てられたバッファスペースは解放されず、再利用されることがあります。

文字が格納されるバッファスペースは自動的に管理され、必要に応じて拡大し、既に消費されたスペースはリサイクルされます。より詳細な制御が必要な場合は、`buffer.new(size)`や`buf:free()`を使用します。

単一のバッファの最大サイズは、Lua文字列の最大サイズと同じで、約2ギガバイト未満です。巨大なデータサイズには、文字列もバッファも適切なデータ構造ではありません。オペレーティングシステムの仮想メモリ制限までメモリやファイルを直接マッピングするためにFFIライブラリを使用してください。

### バッファメソッドの概要

- `buf:put*()`系のメソッドは、バッファの末尾に文字を追加（書き込み）します。
- `buf:get*()`系のメソッドは、バッファの前から文字を消費（読み取り）します。
- `buf:tostring()`のような他のメソッドはバッファの内容を読み取るだけで、バッファを変更しません。
- `buf:set()`メソッドは、文字列またはFFI cdataオブジェクトをバッファとしてゼロコピーで消費することを可能にします。
- FFI固有のメソッドはゼロコピーの読み書きスタイルの操作を許可するか、バッファの内容をその場で変更します。FFIの注意点も確認してください。
- 特定のものを返す必要のないメソッドは便宜上バッファオブジェクト自体を返します。これにより、メソッドチェーンが可能になります。例：`buf:reset():encode(obj)`や`buf:skip(len):get()`

## バッファの作成と管理

### `local buf = buffer.new([size [,options]])`
### `local buf = buffer.new([options])`

新しいバッファオブジェクトを作成します。

任意のサイズ引数は、最小の初期バッファサイズを保証します。これは、必要なバッファサイズが事前にわかっている場合の最適化です。いずれにせよ、バッファスペースは必要に応じて拡大します。

任意のオプションテーブルは、様々なシリアライゼーションオプションを設定します。

### `buf = buf:reset()`

バッファをリセット（空に）します。割り当てられたバッファスペースは解放されず、再利用されるかもしれません。

### `buf = buf:free()`

バッファオブジェクトのバッファスペースは解放されます。オブジェクト自体はそのままで、空で再利用可能です。

::: info 注意
通常、このメソッドを使用する必要はありません。バッファオブジェクトが収集されると、ガーベージコレクタが自動的にバッファスペースを解放します。関連するメモリを直ちに解放する必要がある場合にこのメソッドを使用してください。
:::

## バッファライター

### `buf = buf:put([str|num|obj] [,…])`

文字列`str`、数値`num`、または`__tostring`メタメソッドを持

つ任意のオブジェクト`obj`をバッファに追加します。複数の引数は指定された順序で追加されます。

バッファをバッファに追加することは可能であり、内部的には短絡されますが、それでもコピーが発生します。バッファの書き込みを組み合わせて単一のバッファを使用する方が良いでしょう。

### `buf = buf:putf(format, …)`

フォーマットされた引数をバッファに追加します。フォーマット文字列は`string.format()`と同じオプションをサポートします。

### `buf = buf:putcdata(cdata, len) FFI`

FFI cdataオブジェクトによって指されるメモリから指定された`len`バイト数をバッファに追加します。オブジェクトは（定数）ポインタに変換可能である必要があります。

### `buf = buf:set(str)`
### `buf = buf:set(cdata, len) FFI`

このメソッドは、文字列またはFFI cdataオブジェクトをバッファとしてゼロコピーで消費することを可能にします。渡された文字列`str`またはFFI cdataオブジェクトへの参照がバッファに格納されます。元々割り当てられていたバッファスペースは解放されます。これは`buf:put*()`メソッドとは異なり、追加操作ではありません。

このメソッドを呼び出した後、バッファは`buf:free():put(str)`または`buf:free():put(cdata, len)`が呼び出されたかのように振る舞います。しかし、バッファが消費されるだけであれば、データは参照されるだけでコピーされません。

後にバッファに書き込みが行われる場合、参照されたデータはコピーされ、オブジェクト参照は削除されます（書き込み時コピーのセマンティクス）。

格納された参照はガーベージコレクタのためのアンカーであり、元々渡された文字列やFFI cdataオブジェクトを生存させ続けます。

### `ptr, len = buf:reserve(size)` FFI
### `buf = buf:commit(used)` FFI

`reserve`メソッドは、バッファ内に少なくともsizeバイトの書き込みスペースを予約します。このスペースを指すuint8_t * FFI cdataポインタ`ptr`を返します。

利用可能な長さはバイト単位で`len`に返されます。これは少なくともsizeバイトですが、効率的なバッファ成長を容易にするためにより多くなることがあります。追加スペースを利用することも、`len`を無視してsizeバイトだけを使用することもできます。

`commit`メソッドは、以前に返された書き込みスペースの使用済みバイトをバッファデータに追加します。

このメソッドの組み合わせは、Cの読み込みスタイルAPIをゼロコピーで使用することを可能にします：

```lua
local MIN_SIZE = 65536
repeat
  local ptr, len = buf:reserve(MIN_SIZE)
  local n = C.read(fd, ptr, len)
  if n == 0 then break end -- EOF.
  if n < 0 then error("read error") end
  buf:commit(n)
until false
```

予約された書き込みスペースは初期化されていません。`commit`メソッドを呼び出す前に、少なくとも使用されたバイト数を書き込む必要があります。バッファに何も追加されない場合（例えば、エラーが発生した場合）は、`commit`メソッドを呼び出す必要はありません。

## バッファリーダー

### `len = #buf`

バッファデータの現在の長さをバイト単位で返します。

### `res = str|num|buf .. str|num|buf […]`

Luaの連結演算子`..`は、文字列や数値と同様に、バッファも受け入れます。これは常に文字列を返し、バッファは返しません。

ただし、これは便宜上サポートされていますが、バッファを使用する主な理由の1つである文字列の割り当てを避けることを妨げます。`buf:put()`や`buf:get()`で書き直してください。

`__concat`メタメソッドを持つ関連しないオブジェクトとこれを混在させると機能しない可能性があります。これらはおそらく文字列だけを期待しているでしょう。

### `buf = buf:skip(len)`

バッファの現在のデータ長までの`len`バイトをスキップ（消費）します。

### `str, … = buf:get([len|nil] [,…])`

バッファデータを消費して、1つまたは複数の文字列を返します。引数なしで呼び出された場合、バッファデータ全体が消費されます。数値で呼び出された場合、最大`len`バイトが消費されます。`nil`引数は残りのバッファスペースを消費します（これは最後の引数としてのみ意味があります）。複数の引数は、与えられた順序でバッファデータを消費します。

::: info 注意
ゼロの長さ、または残りのバッファデータがない場合は、`nil`ではなく空の文字列を返します。
:::

### `str = buf:tostring()`
### `str = tostring(buf)`

バッファデータから文字列を生成しますが、それを消費しません。バッファは変わらずに残ります。

バッファオブジェクトは`__tostring`メタメソッドも定義しています。これは、バッファを`tostring()`グローバル関数や文字列の代わりに受け入れる他の多くの関数に渡すことができることを意味します。`io.write()`のような関数での重要な内部使用は、中間文字列オブジェクトの生成を避けるためにショートサーキットされます。

### `ptr, len = buf:ref() FFI`

バッファデータを指す`uint8_t * FFI cdata`ポインター`ptr`を返します。バッファデータの長さ（バイト単位）は`len`で返されます。

返されたポインタは、バッファと長さを期待するC関数に直接渡すことができます。また、バッファデータのバイト単位での読み取り（`local x = ptr[i]`）や書き込み（`ptr[i] = 0x40`）も可能です。

`skip`メソッドと組み合わせることで、Cの書き込みスタイルAPIのゼロコピー使用が可能になります：

```lua
repeat
  local ptr, len = buf:ref()
  if len == 0 then break end
  local n = C.write(fd, ptr, len)
  if n < 0 then error("write error") end
  buf:skip(n)
until n >= len
```

Lua文字列とは異なり、バッファデータは暗黙的にゼロ終了されません。`ptr`をゼロ終了文字列を期待するC関数に渡すことは安全ではありません。`len`を使用していない場合は、何か間違ったことをしています。

## Luaオブジェクトのシリアライズ

以下の関数とメソッドは、Luaオブジェクトを文字列に高速でシリアライズ（エンコード）し、それを再びLuaオブジェクトにデコードすることを可能にします。これにより、構造化されたデータの便利な保存と転送が可能になります。

エンコードされたデータは内部バイナリフォーマットです。このデータはファイル、バイナリ透過的なデータベースに保存されるか、スレッド、プロセス、またはネットワークを越えて他のLuaJITインスタンスに送信されます。

エンコーディング速度は、多くの小さなオブジェクトをシリアライズしても、現代のデスクトップまたはサーバークラスのシステムで秒速1ギガバイトに達することがあります。デコーディング速度は主にオブジェクト生成コストによって制限されます。

シリアライザは、ほとんどのLuaタイプ、一般的なFFI数値タイプ、およびネストされた構造を処理します。関数、スレッドオブジェクト、その他のFFI cdata、完全なユーザーデータは（まだ）シリアライズできません。

エンコーダーは、ネストされた構造を木としてシリアライズします。単一のオブジェクトへの複数の参照は個別に保存され、デコード後に別々のオブジェクトを生成します。循環参照はエラーを引き起こします。

### シリアライズ関数とメソッド

#### `str = buffer.encode(obj)`
#### `buf = buf:encode(obj)`

Luaオブジェクト`obj`をシリアライズ（エンコード）します。スタンドアロン関数は文字列`str`を返し、バッファメソッドはエンコーディングをバッファに追加します。

`obj`はサポートされているLuaタイプのいずれかであればよく、Luaテーブルである必要はありません。

この関数は、サポートされていないオブジェクトタイプ、循環参照、または深くネストされたテーブルをシリアライズしようとしたときにエラーをスローすることがあります。

#### `obj = buffer.decode(str)`
#### `obj = buf:decode()`

スタンドアロン関数は文字列`str`をデシリアライズ（デコード）し、バッファメソッドはバッファから1つのオブジェクトをデシリアライズします。どちらもLuaオブジェクト`obj`を返します。

返されるオブジェクトは、サポートされているLuaタイプのいずれかである可能性があります。

この関数は、形式が正しくないまたは不完全なエンコードデータを受け取った場合にエラーを投げることがあります。スタンドアロン関数は、シングルトップレベルオブジェクトのデコード後に残りのデータがある場合にエラーを投げます。バッファメソッドは、残りのデータをバッファに残します。

FFIタイプをデシリアライズしようとすると、FFIライブラリが組み込まれていないか、まだ読み込まれていない場合、エラーが発生します。

### シリアライズオプション

`buffer.new()`に渡されたオプションテーブルには、以下のメンバー（すべて任意）が含まれている可能性があります：

- `dict`は、シリアライズしているオブジェクトのテーブルキーとしてよく出現する文字列の辞書を保持するLuaテーブルです。これらのキーはシリアライズ中にインデックスとしてコンパクトにエンコードされます。適切に選ばれた辞書は、スペースを節約し、シリアライズ性能を向上させます。
- `metatable`は、シリアライズしているテーブルオブジェクトのメタテーブルの辞書を保持するLuaテーブルです。

`dict`は文字列の配列であり、`metatable`はテーブルの配列でなければなりません。どちらもインデックス1から始まり、穴がない（間に`nil`がない）状態です。テーブルはバッファオブジェクトにアンカーされ、内部的に双方向インデックスに変更されます（自分でこれを行わないでください、単なる配列を渡してください）。テーブルは、`buffer.new()`に渡された後に変更してはなりません。

エンコーダーとデコーダーに使用される`dict`と`metatable`テーブルは同じでなければなりません。最も一般的なエントリを前面に置きます。後方互換性を保証するためには、末尾に追加してください。古いエンコーディングも読み取れるようになります。いくつかのインデックスを`false`に設定して、明示的に後方互換性を切り捨てることもできます。これらのインデックスを使用する古いエンコーディングは、デコード時にエラーを投げます。

エンコーディング時に`metatable`辞書にないメタテーブルは無視されます。デコードは`nil`メタテーブルを持つテーブルを返します。

::: info 注意
オプションテーブルの解析と準備はややコストがかかります。バッファオブジェクトは一度だけ作成し、複数回再利用してください。エンコーダーバッファとデコーダーバッファを混在させないようにしてください。`buf:set()`メソッドは既に割り当てられたバッファスペースを解放するためです：
:::

```lua
local options = {
  dict = { "commonly", "used", "string", "keys" },
}
local buf_enc = buffer.new(options)
local buf_dec = buffer.new(options)

local function encode(obj)
  return buf_enc:reset():encode(obj):get()
end

local function decode(str)
  return buf_dec:set(str):decode()
end
```

### Streaming Serialization

In some contexts, it's desirable to do piecewise serialization of large datasets, also known as streaming.

This serialization format can be safely concatenated and supports streaming. Multiple encodings can simply be appended to a buffer and later decoded individually:

```lua
local buf = buffer.new()
buf:encode(obj1)
buf:encode(obj2)
local copy1 = buf:decode()
local copy2 = buf:decode()
```

Here's how to iterate over a stream:

```lua
while #buf ~= 0 do
  local obj = buf:decode()
  -- Do something with obj.
end
```

Since the serialization format doesn't prepend a length to its encoding, network applications may need to transmit the length, too.

### Serialization Format Specification

This serialization format is designed for internal use by LuaJIT applications. Serialized data is upwards-compatible and portable across all supported LuaJIT platforms.

It's an 8-bit binary format and not human-readable. It uses e.g. embedded zeroes and stores embedded Lua string objects unmodified, which are 8-bit-clean, too. Encoded data can be safely concatenated for streaming and later decoded one top-level object at a time.

The encoding is reasonably compact, but tuned for maximum performance, not for minimum space usage. It compresses well with any of the common byte-oriented data compression algorithms.

Although documented here for reference, this format is explicitly not intended to be a 'public standard' for structured data interchange across computer languages (like JSON or MessagePack). Please do not use it as such.

The specification is given below as a context-free grammar with a top-level object as the starting point. Alternatives are separated by the | symbol and * indicates repeats. Grouping is implicit or indicated by {…}. Terminals are either plain hex numbers, encoded as bytes, or have a .format suffix.

```txt
object    → nil | false | true
          | null | lightud32 | lightud64
          | int | num | tab | tab_mt
          | int64 | uint64 | complex
          | string

nil       → 0x00
false     → 0x01
true      → 0x02

null      → 0x03                            // NULL lightuserdata
lightud32 → 0x04 data.I                   // 32 bit lightuserdata
lightud64 → 0x05 data.L                   // 64 bit lightuserdata

int       → 0x06 int.I                                 // int32_t
num       → 0x07 double.L

tab       → 0x08                                   // Empty table
          | 0x09 h.U h*{object object}          // Key/value hash
          | 0x0a a.U a*object                    // 0-based array
          | 0x0b a.U a*object h.U h*{object object}      // Mixed
          | 0x0c a.U (a-1)*object                // 1-based array
          | 0x0d a.U (a-1)*object h.U h*{object object}  // Mixed
tab_mt    → 0x0e (index-1).U tab          // Metatable dict entry

int64     → 0x10 int.L                             // FFI int64_t
uint64    → 0x11 uint.L                           // FFI uint64_t
complex   → 0x12 re.L im.L                         // FFI complex

string    → (0x20+len).U len*char.B
          | 0x0f (index-1).U                 // String dict entry

.B = 8 bit
.I = 32 bit little-endian
.L = 64 bit little-endian
.U = prefix-encoded 32 bit unsigned number n:
     0x00..0xdf   → n.B
     0xe0..0x1fdf → (0xe0|(((n-0xe0)>>8)&0x1f)).B ((n-0xe0)&0xff).B
   0x1fe0..       → 0xff n.I
```

## Error handling

Many of the buffer methods can throw an error. Out-of-memory or usage errors are best caught with an outer wrapper for larger parts of code. There's not much one can do after that, anyway.

OTOH, you may want to catch some errors individually. Buffer methods need to receive the buffer object as the first argument. The Lua colon-syntax obj:method() does that implicitly. But to wrap a method with pcall(), the arguments need to be passed like this:

```lua
local ok, err = pcall(buf.encode, buf, obj)
if not ok then
  -- Handle error in err.
end
```

## FFI caveats

The string buffer library has been designed to work well together with the FFI library. But due to the low-level nature of the FFI library, some care needs to be taken:

First, please remember that FFI pointers are zero-indexed. The space returned by buf:reserve() and buf:ref() starts at the returned pointer and ends before len bytes after that.

I.e. the first valid index is `ptr[0]` and the last valid index is `ptr[len-1]`. If the returned length is zero, there's no valid index at all. The returned pointer may even be NULL.

The space pointed to by the returned pointer is only valid as long as the buffer is not modified in any way (neither append, nor consume, nor reset, etc.). The pointer is also not a GC anchor for the buffer object itself.

Buffer data is only guaranteed to be byte-aligned. Casting the returned pointer to a data type with higher alignment may cause unaligned accesses. It depends on the CPU architecture whether this is allowed or not (it's always OK on x86/x64 and mostly OK on other modern architectures).

FFI pointers or references do not count as GC anchors for an underlying object. E.g. an array allocated with ffi.new() is anchored by buf:set(array, len), but not by buf:set(array+offset, len). The addition of the offset creates a new pointer, even when the offset is zero. In this case, you need to make sure there's still a reference to the original array as long as its contents are in use by the buffer.

Even though each LuaJIT VM instance is single-threaded (but you can create multiple VMs), FFI data structures can be accessed concurrently. Be careful when reading/writing FFI cdata from/to buffers to avoid concurrent accesses or modifications. In particular, the memory referenced by buf:set(cdata, len) must not be modified while buffer readers are working on it. Shared, but read-only memory mappings of files are OK, but only if the file does not change.