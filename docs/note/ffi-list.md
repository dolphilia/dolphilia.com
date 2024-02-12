# FFIの比較

## PHP

- `FFI::addr` — C データへの管理されていないポインタを作成する。
- `FFI::alignof` — アライメントを取得
- `FFI::arrayType` — 新しいC配列型を動的に構築する
- `FFI::cast` — C 型キャストを行う
- `FFI::cdef` — 新しいFFIオブジェクトを作成する
- `FFI::free` — 管理されていないデータ構造を解放する
- `FFI::isNull` — `FFICData`がヌルポインタかどうかをチェックする。
- `FFI::load` — CヘッダーファイルからC宣言をロードする。
- `FFI::memcmp` — メモリ領域の比較
- `FFI::memcpy` — あるメモリ領域を別のメモリ領域にコピーする
- `FFI::memset` — メモリ領域を埋める
- `FFI::new` — Cデータ構造を作成する
- `FFI::scope` — プリロード中に解析されたC宣言を持つFFIオブジェクトをインスタンス化する。
- `FFI::sizeof` — Cデータまたは型のサイズを取得
- `FFI::string` — メモリ領域から PHP 文字列を作成します。
- `FFI::type` — C宣言から`FFICType`オブジェクトを生成する。
- `FFI::typeof` — `FFICData`の `FFICType` を取得する。

## Dart

- `Abi`: アプリケーション・バイナリ・インターフェース (ABI).
- `AbiSpecificInteger`: Abi 固有のすべての整数型のスーパータイプ。
- `AbiSpecificIntegerMapping`: AbiSpecificInteger のサブタイプのマッピング。
- `Allocator`: ネイティブ・ヒープ上のメモリを管理する。
- `Array<T extends NativeType>`: Tsの固定サイズの配列。
- `Dart_CObject`: 不透明で、メンバーを表に出さない。
- `DartRepresentationOf`
- `DefaultAsset`: 現在のライブラリのデフォルトのアセットIDを指定する注釈。
- `DynamicLibrary`: 動的にロードされるネイティブ・ライブラリ。
- `FfiNative<T>`: 外部関数を FFI ネイティブとしてマークするための注釈。
- `Finalizable`: 早急に確定させるべきでないオブジェクトのためのマーカー・インターフェイス。
- `Native<T>`: 外部関数をネイティブコードにバインドする方法を指定するアノテーション。
- `NativeApi`: Dart コードまたは C コードから dart_api_dl.h を介して Dart VM API にアクセスするためのユーティリティです。
- `NativeCallable<T extends Function>`: ネイティブ関数への呼び出しをリッスンするネイティブ callable。
- `NativeFinalizer`: Dart オブジェクトにアタッチできるネイティブのファイナライザ。
- `Packed`: Struct サブタイプに指定するアノテーションで、そのメンバをパックする必要があることを示す。
- `Unsized`
- 標準的なC言語の型
  - `Bool`: C言語のネイティブなブールを表す。
  - `Char`: C の char 型。
  - `Double`: C言語のネイティブ64ビットdoubleを表す。
  - `Float`: C言語のネイティブ32ビットfloatを表す。
  - `Int`: C の int 型。
  - `Int16`: C言語のネイティブ符号付き16ビット整数を表す。
  - `Int32`: C 言語のネイティブ符号付き 32 ビット整数を表します。
  - `Int64`: C 言語のネイティブ符号付き 64 ビット整数を表します。
  - `Int8`: C 言語のネイティブ符号付き 8 ビット整数を表します。
  - `IntPtr`: C の intptr_t 型。
  - `Long`: Cのlong int、別名long型。
  - `LongLong`: Cのlong long型。
  - `Short`: Cのshort型。
  - `SignedChar`: C の符号付き char 型。
  - `Size`: C の size_t 型。
  - `Uint16`: Cのネイティブ符号なし16ビット整数を表す。
  - `Uint32`: C のネイティブ符号なし 32 ビット整数を表す。
  - `Uint64`: C のネイティブ符号なし 64 ビット整数を表す。
  - `Uint8`: C のネイティブ符号なし 8 ビット整数を表す。
  - `UintPtr`:C の uintptr_t 型。
  - `Void`: C 言語の void 型を表す。
  - `WChar`: C の wchar_t 型。
  - `UnsignedChar`: C の符号なし char 型。
  - `UnsignedInt`: C の符号なし int 型。
  - `UnsignedLong`: C の符号なし long int、別名符号なし long 型。
  - `UnsignedLongLong`: C の符号なし long long 型。
  - `UnsignedShort`: C の符号なし short 型。
- 構造的なC言語の型
  - `NativeFunction<T extends Function>`: C言語の関数型を表す。
  - `Pointer<T extends NativeType>`: C ネイティブ・メモリへのポインタを表す。拡張はできない。
  - `Struct`: すべての FFI 構造体型のスーパータイプ。
  - `Union`: すべての FFI ユニオン型のスーパータイプ。
  - `VarArgs<T extends Record>`: C 言語で渡される可変引数の種類。
- 特殊なC言語の型
  - `Handle`: C 言語の Dart_Handle を表します。
  - `NativeType`: NativeTypeのサブタイプは、C言語のネイティブ型を表す。
  - `Opaque`: Opaqueのサブタイプは、C言語の不透明な型を表す。

## Python

- `ffi.NULL`:  `<cdata 'void *'>`型の定数NULL。
- `ffi.error`: 様々なケースで提起されたパイソンの例外。
- `ffi.new()`: 指定されたC型に従ってインスタンスを確保し、そのポインタを返す。
- `ffi.cast()`: 与えられた値で初期化された、指定されたC型のインスタンスを返す。
- `ffi.errnof`: errnoの値は、このスレッド内の直近のC呼び出しから受け取られ、次のC呼び出しに渡される。
- `ffi.getwinerror()`: Windowsでは、errnoに加えて、関数の呼び出しにまたがってGetLastError()の値も保存および復元される。
- `ffi.string()`: cdata'からPython文字列（またはユニコード文字列）を返す。
- `ffi.unpack()`: 与えられた長さのCデータの配列を展開し、Pythonの文字列/ユニコード/リストを返す。
- `ffi.buffer()`: 与えられた'cdata'が指す生のCデータを参照する、'size'バイトのバッファオブジェクトを返す。
- `ffi.from_buffer()`: 与えられた Python オブジェクトのデータを指す配列 cdata (デフォルトは `<cdata 'char[]'>`) を返します。
- `ffi.memmove()`: メモリ領域 src からメモリ領域 dest に n バイトコピーする。以下の例を参照のこと。C関数のmemcpy()とmemmove()にヒントを得た。
- `ffi.typeof()`: パースされた文字列に対応する `<ctype>` 型のオブジェクト、または cdata インスタンスの C 型を返す。
- `ffi.sizeof()`: 引数のサイズをバイト数で返す。
- `ffi.alignof()`: 引数のナチュラル・アライメント・サイズをバイト単位で返す。
- `ffi.offsetof()`: 与えられたフィールドの構造体内のオフセットを返します。C 言語の offsetof() に相当する。
- `ffi.addressof()`: C言語の'&'演算子に相当する：
- `ffi.CData, ffi.CType`: このドキュメントの残りの部分では `<cdata>` と `<ctype>` と呼ばれるオブジェクトの Python 型を示します。
- `ffi.gc()`: 同じデータを指す新しいcdataオブジェクトを返す。
- `ffi.new_handle()`: python_object への不透明な参照を含む void * 型の NULL ではない cdata を返します。これを C の関数に渡したり、C の構造体に格納することができます。
- `ffi.from_handle()`: 後で、ffi.from_handle(p) を使って、同じ void * ポインタを持つ値から元の python_object を取り出すことができます。
- `ffi.dlopen()`: 動的ライブラリの「ハンドル」を開き、`<lib>` オブジェクトとして返します。モジュールの準備と配布を参照してください。
- `ffi.dlclose()`: ffi.dlopen() が返す `<lib>` オブジェクトを明示的に閉じる。
- `ffi.new_allocator()`: 新しいアロケータを返す。アロケータとは、ffi.new()のように振る舞うが、提供されている低レベルのalloc関数とfree関数を使う呼び出し可能なものである。
- `ffi.release() and the context manager`: ffi.new()、ffi.gc()、ffi.from_buffer()、または ffi.new_allocator()()から、 cdata オブジェクトが保持するリソースを解放する。
- `ffi.init_once()`: 一度だけ実行する。
- `ffi.getctype()`: 与えられたC型の文字列表現を返す。
- `ffi.list_types()`: この FFI インスタンスが知っているユーザー・タイプ名を返します。

## Ruby

## Lisp

## Node.js

## ref

refはNode.jsのネイティブアドオンで、組み込みのBufferクラスを拡張して、JavaScriptでC言語プログラミングをするのを助ける：

- バッファのメモリアドレスの取得
- プロセッサのエンディアンのチェック
- バッファがNULLポインタを表すかどうかのチェック
- バッファを使った "ポインタ "の読み書き
- C文字列（NULL終端）の読み書き
- JavaScriptオブジェクト参照の読み書き
- int64_tとuint64_t値の読み書き
- バッファの内容を定義するための「型」規則

refには実に多くの機能があるが、最終的にはすべてが何らかの形で統合される。簡単に説明すると、refのAPIは3つのセクションに分けられる：

1. refのエクスポート: require('ref')から返されるエクスポートで利用可能なrefの関数とデフォルトの "型 "のすべての静的バージョン。
2. 型システム: 型システムでは、任意のBufferインスタンスに型を定義し、汎用のref()関数とderef()関数を使用して値の参照と非参照を行うことができます。
3. Bufferの拡張: Buffer.prototypeはいくつかの便利な関数で拡張されています。これらはすべて、Bufferのthis変数をバッファ変数として使用する、静的な対応関数を反映したものです。

### refのエクスポート

- ref.NULL: CのNULLポインタを参照するバッファ。このバッファからデータにアクセスするとセグメンテーション・フォールトが発生するため、長さは0である。
- ref.NULL_POINTER: NULL_POINTER is a pointer-sized Buffer instance pointing to NULL. Conceptually, it's equivalent to the following C code:
- ref.address(): Accepts a Buffer instance and returns the memory address of the buffer instance.
- ref.alloc(): Returns a new Buffer instance big enough to hold type, with the given value written to it.
- ref.allocCString(): Returns a new Buffer instance with the given String written to it with the given encoding (defaults to 'utf8'). The buffer is 1 byte longer than the string itself, and is NUL terminated.
- ref.coerceType(): Coerces a "type" object from a String or an actual "type" object. String values are looked up from the ref.types Object.
- ref.deref(): Accepts a Buffer instance and attempts to "dereference" it. That is, first it checks the indirection count of buffer's "type", and if it's greater than 1 then it merely returns another Buffer, but with one level less indirection.
- ref.derefType(): Returns a new clone of the given "type" object, with its indirection level decremented by 1.
- ref.endianness(): A string that represents the native endianness of the machine's processor. The possible values are either "LE" or "BE".
- ref.get(): Calls the get() function of the Buffer's current "type" (or the passed in type if present) at the given offset.
- ref.getType(): Returns the "type" property of the given Buffer. Creates a default type for the buffer when none exists.
- ref.isNull(): Accepts a Buffer instance and returns true if the buffer represents the NULL pointer, false otherwise.
- ref.readCString(): Returns a JavaScript String read from buffer at the given offset. The C String is read until the first NULL byte, which indicates the end of the String.
- ref.readInt64BE(): Returns a big-endian signed 64-bit int read from buffer at the given offset.
- ref.readInt64LE(): Returns a little-endian signed 64-bit int read from buffer at the given offset.
- ref.readObject(): Reads a JavaScript Object that has previously been written to the given buffer at the given offset.
- ref.readPointer(): Reads a Buffer instance from the given buffer at the given offset. The size parameter specifies the length of the returned Buffer instance, which defaults to 0.
- ref.readUInt64BE(): Returns a big-endian unsigned 64-bit int read from buffer at the given offset.
- ref.readUInt64LE(): Returns a little-endian unsigned 64-bit int read from buffer at the given offset.
- ref.ref(): ref() accepts a Buffer instance and returns a new Buffer instance that is "pointer" sized and has its data pointing to the given Buffer instance. Essentially the created Buffer is a "reference" to the original pointer, equivalent to the following C code:
- ref.refType(): Returns a new clone of the given "type" object, with its indirection level incremented by 1.
- ref.reinterpret(): Returns a new Buffer instance with the specified size, with the same memory address as buffer.
- ref.reinterpretUntilZeros(): Accepts a Buffer instance and a number of NULL bytes to read from the pointer. This function will scan past the boundary of the Buffer's length until it finds size number of aligned NULL bytes.
- ref.set(): Calls the set() function of the Buffer's current "type" (or the passed in type if present) at the given offset.
- ref.writeCString(): Writes the given string as a C String (NULL terminated) to the given buffer at the given offset. "encoding" is optional and defaults to 'utf8'.
- ref.writeInt64BE(): Writes the input Number or String as a big-endian signed 64-bit int into buffer at the given offset.
- ref.writeInt64LE(): Writes the input Number or String as a little-endian signed 64-bit int into buffer at the given offset.
- ref.writeObject(): Writes a pointer to object into buffer at the specified _offset.
- ref.writePointer(): Writes the memory address of pointer to buffer at the specified offset.
- ref.writeUInt64BE(): Writes the input Number or String as a big-endian unsigned 64-bit int into buffer at the given offset.
- ref.writeUInt64LE(): Writes the input Number or String as a little-endian unsigned 64-bit int into buffer at the given offset.
- ref._attach(): Attaches object to buffer such that it prevents object from being garbage collected until buffer does.
- ref._reinterpret(): Same as ref.reinterpret(), except that this version does not attach buffer to the returned Buffer, which is potentially unsafe if the garbage collector runs.
- ref._reinterpretUntilZeros(): Same as ref.reinterpretUntilZeros(), except that this version does not attach buffer to the returned Buffer, which is potentially unsafe if the garbage collector runs.
- ref._writeObject(): Same as ref.writeObject(), except that this version does not attach the Object to the Buffer, which is potentially unsafe if the garbage collector runs.
- ref._writePointer(): Same as ref.writePointer(), except that this version does not attach pointer to buffer, which is potentially unsafe if the garbage collector runs.

### 型システム

- types.void: The void type.
- types.int8: The int8 type.
- types.uint8: The uint8 type.
- types.int16: The int16 type.
- types.uint16: The uint16 type.
- types.int32: The int32 type.
- types.uint32: The uint32 type.
- types.int64: The int64 type.
- types.uint64: The uint64 type.
- types.float: The float type.
- types.double: The double type.
- types.Object: オブジェクト・タイプ。これは、通常のJSオブジェクトを生メモリに読み書きするために使用できる。
- types.CString: CStringsは奇妙なものだ。sizeof(char *)で、インダイレクト・レベルは1、つまり、ポインタ・サイズで、utf8文字列データを指すバッファを返さなければならない。
- types.bool: bool型。真または偽のブール型JavaScript値を受け入れ/返す、type.uint8を囲むラッパー型。
- types.byte: The byte type.
- types.char: The char type.
- types.uchar: The uchar type.
- types.short: The short type.
- types.ushort: The ushort type.
- types.int: The int type.
- types.uint: The uint type.
- types.long: The long type.
- types.ulong: The ulong type.
- types.longlong: The longlong type.
- types.ulonglong: The ulonglong type.
- types.size_t: The size_t type.

### Bufferの拡張