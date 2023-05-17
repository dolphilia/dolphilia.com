構築とテスト
==============

yyjsonをプロジェクトに組み込むには、ソースコード、パッケージマネージャ、CMakeなどの方法があります。


# ソースコード
このライブラリは、クロスプラットフォームのJSONライブラリを提供することを目的としているので、ANSI C（実際にはC99ですが、厳密にはC89と互換性があります）で記述されています。yyjson.h`とyyjson.c`をあなたのプロジェクトにコピーすれば、何の設定もなしに使い始めることができます。

このライブラリは、`gcc`, `clang`, `msvc`, `tcc` の各コンパイラで [CI](https://github.com/ibireme/yyjson/actions) でテストされています。コンパイルに問題がある場合は、[バグ報告](https://github.com/ibireme/yyjson/issues/new?template=bug_report.md) をしてください。

このライブラリは、デフォルトですべての機能が有効になっていますが、コンパイル時のオプションを追加することで、いくつかの機能を切り捨てることができます。例えば、シリアライズが不要な場合にバイナリサイズを小さくするためにJSONライターを無効にしたり、解析のパフォーマンスを向上させるためにコメントサポートを無効にしたりします。詳しくは`コンパイル時オプション`を参照してください。


# パッケージマネージャー

vcpkg`、`conan`、`xmake`など、yyjsonのダウンロードとインストールに人気のあるパッケージマネージャを使用することができます。これらのパッケージマネージャのyyjsonパッケージは、コミュニティの貢献者によって最新に保たれています。もし、バージョンが古い場合は、彼らのリポジトリにissueやpull requestを作成してください。

## vcpkgを使う

[vcpkg](https://github.com/Microsoft/vcpkg/)依存性マネージャを使ってyyjsonをビルドしインストールすることができます：

```shell
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
./bootstrap-vcpkg.sh  # ./bootstrap-vcpkg.bat for Powershell
./vcpkg integrate install
./vcpkg install yyjson
```

バージョンが古い場合は、vcpkgリポジトリに[create a issue or pull request](https://github.com/Microsoft/vcpkg)をお願いします。

# CMake

## CMakeを使ってライブラリをビルドする

リポジトリをクローンし、ビルドディレクトリを作成する：
```shell
git clone https://github.com/ibireme/yyjson.git
mkdir build
cd build
```
静的ライブラリーを構築する：
```shell
cmake .. 
cmake --build .
```

共有ライブラリを構築する：
```shell
cmake .. -DBUILD_SHARED_LIBS=ON
cmake --build .
```

サポートされているCMakeのオプション

- `-DYYJSON_BUILD_TESTS=ON`     すべてのテストをビルドします。
- `-DYYJSON_BUILD_FUZZER=ON`    LibFuzzingでファザーを構築する。
- `-DYYJSON_BUILD_MISC=ON`      ビルドミスク。
- `-DYYJSON_BUILD_DOC=ON`       doxygenでドキュメントをビルドする。
- `-DYYJSON_ENABLE_COVERAGE=ON` テストのコードカバレッジを有効にする。
- `-DYYJSON_ENABLE_VALGRIND=ON` テスト用のvalgrindメモリチェッカーを有効にする。
- `-DYYJSON_ENABLE_SANITIZE=ON` テスト用のサニタイザーを有効にする。
- `-DYYJSON_ENABLE_FASTMATH=ON` テスト用のfast-mathを有効にする。
- `-DYYJSON_FORCE_32_BIT=ON`    テスト用に32ビットを強制するようにした(gcc/clang/icc)。

- `-DYYJSON_DISABLE_READER=ON`       JSONリーダーが不要な場合は無効にしてください。
- `-DYYJSON_DISABLE_WRITER=ON`       JSONライターを必要としない場合は、無効にしてください。
- `-DYYJSON_DISABLE_UTILS=ON`        JSON Pointer、JSON Patch、JSON Merge Patchを無効化する。
- `-DYYJSON_DISABLE_FAST_FP_CONV=ON` 内蔵の高速浮動小数点数変換を無効にする。
- `-DYYJSON_DISABLE_NON_STANDARD=ON` コンパイル時に非標準のJSONサポートを無効化する。


## CMakeを依存関係として使用する

yyjsonをダウンロードしてプロジェクトフォルダに解凍し、`CMakeLists.txt`ファイルにリンクさせることができます：
```cmake
# オプションを追加する（オプション）
set(YYJSON_DISABLE_NON_STANDARD ON CACHE INTERNAL "")

# `yyjson`サブディレクトリの追加
add_subdirectory(vendor/yyjson)

# yyjsonをターゲットにリンクさせる
target_link_libraries(your_target PRIVATE yyjson)
```

CMakeのバージョンが3.14より高い場合は、以下の方法でCMakeに自動的にダウンロードさせることができます：
```cmake
include(FetchContent)

# CMakeにyyjsonをダウンロードさせる
FetchContent_Declare(
    yyjson
    GIT_REPOSITORY https://github.com/ibireme/yyjson.git
    GIT_TAG master # master、またはバージョン番号（例：0.6.0
)
FetchContent_MakeAvailable(yyjson)

# yyjsonをターゲットにリンクさせる
target_link_libraries(your_target PRIVATE yyjson)
```


## CMakeを使ってプロジェクトを生成する
他のコンパイラやIDEで`yyjson`をビルドしたりデバッグしたりしたい場合は、以下のコマンドを試してみてください：
```shell
# Clang for Linux/Unix:
cmake .. -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++

# Intel ICC for Linux/Unix:
cmake .. -DCMAKE_C_COMPILER=icc -DCMAKE_CXX_COMPILER=icpc

# Other version of GCC:
cmake .. -DCMAKE_C_COMPILER=/usr/local/gcc-8.2/bin/gcc -DCMAKE_CXX_COMPILER=/usr/local/gcc-8.2/bin/g++

# Microsoft Visual Studio for Windows:
cmake .. -G "Visual Studio 16 2019" -A x64
cmake .. -G "Visual Studio 16 2019" -A Win32
cmake .. -G "Visual Studio 15 2017 Win64"

# Xcode for macOS:
cmake .. -G Xcode

# Xcode for iOS:
cmake .. -G Xcode -DCMAKE_SYSTEM_NAME=iOS

# Xcode with XCTest
cmake .. -G Xcode -DYYJSON_BUILD_TESTS=ON
```

## CMakeを使ってドキュメントを生成する

yyjson は [doxygen](https://www.doxygen.nl/) を使ってドキュメントを生成します (`doxygen` をインストールする必要があります)：
```shell
cmake .. -DYYJSON_BUILD_DOC=ON
cmake --build .
```
このスクリプトを実行すると、doxygenは生成されたhtmlファイルを `build/doxygen/html` に出力します。また、生成されたドキュメントはオンラインで読むことができます: https://ibireme.github.io/yyjson/doc/doxygen/html/


## CMakeとCTestを使ったテスト

すべてのテストをビルドして実行する：
```shell
cmake .. -DYYJSON_BUILD_TESTS=ON
cmake --build .
ctest --output-on-failure
```

[valgrind](https://valgrind.org/)メモリチェッカーでテストをビルドして実行する（`valgrind`がインストールされている必要があります）：
```shell
cmake .. -DYYJSON_BUILD_TESTS=ON -DYYJSON_ENABLE_VALGRIND=ON
cmake --build .
ctest --output-on-failure
```

サニタイザー（コンパイラは `gcc` または `clang` ）でビルドしてテストを実行する：
```shell
cmake .. -DYYJSON_BUILD_TESTS=ON -DYYJSON_ENABLE_SANITIZE=ON
cmake --build .
ctest --output-on-failure
```

`gcc`でビルドしてコードカバレッジを実行する：
```shell
cmake .. -DCMAKE_BUILD_TYPE=Debug -DYYJSON_BUILD_TESTS=ON -DYYJSON_ENABLE_COVERAGE=ON
cmake --build . --config Debug
ctest --output-on-failure

lcov -c -d ./CMakeFiles --include "*/yyjson.*" -o cov.info
genhtml cov.info -o ./cov_report
```

`clang`でビルドしてコードカバレッジを実行する：
```shell
cmake .. -DCMAKE_BUILD_TYPE=Debug -DYYJSON_BUILD_TESTS=ON -DYYJSON_ENABLE_COVERAGE=ON -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++
cmake --build . --config Debug

export LLVM_PROFILE_FILE=cov/profile-%p.profraw
ctest --output-on-failure

ctest_files=$(grep -o "test_\w\+ " CTestTestfile.cmake | uniq | tr '\n' ' ')
ctest_files=$(echo $ctest_files | sed 's/  $//' | sed "s/ / -object /g")
llvm-profdata merge -sparse cov/profile-*.profraw -o coverage.profdata
llvm-cov show $ctest_files -instr-profile=coverage.profdata -format=html > coverage.html
```

[LibFuzzer](https://llvm.org/docs/LibFuzzer.html) を使ってファズテストをビルドして実行します (コンパイラは `LLVM Clang` とします。`Apple Clang` や `gcc` はサポートしません)：
```shell
cmake .. -DYYJSON_BUILD_FUZZER=ON -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++
cmake --build .
./fuzzer -dict=fuzzer.dict ./corpus
```


# コンパイル時オプション
yyjsonはいくつかのコンパイル時オプションをサポートしており、これらのマクロを`1`として定義することで、コンパイル時にいくつかの機能を無効化することができます。

● **YYJSON_DISABLE_READER**<br/>を指定します。
1として定義すると、JSONリーダーを無効にします。<br/>。
これは、コンパイル時にこれらの関数を無効にします：
```c
yyjson_read_opts()
yyjson_read_file()
yyjson_read()
 ```
これにより、バイナリサイズを約60%削減することができます。<br/>。
JSONをパースする必要がない場合におすすめです。

● **YYJSON_DISABLE_WRITER**<br/>を指定します。
1として定義すると、JSONライターを無効化します。
これは、コンパイル時にこれらの関数を無効にします：
```c
yyjson_write()
yyjson_write_file()
yyjson_write_opts()
yyjson_val_write()
yyjson_val_write_file()
yyjson_val_write_opts()
yyjson_mut_write()
yyjson_mut_write_file()
yyjson_mut_write_opts()
yyjson_mut_val_write()
yyjson_mut_val_write_file()
yyjson_mut_val_write_opts()
```
これにより、バイナリサイズを約30%削減できます。<br/>。
JSONをシリアライズする必要がない場合に推奨されます。

● **YYJSON_DISABLE_UTILS**<br/>を指定します。
 JSON Pointer、JSON Patch、JSON Merge Patchのサポートを無効にする場合は1を指定します。
 
 これにより、コンパイル時にこれらの機能を無効にすることができます：
 ```c
 yyjson_ptr_xxx()
 yyjson_mut_ptr_xxx()
 yyjson_doc_ptr_xxx()
 yyjson_mut_doc_ptr_xxx()
 yyjson_patch()
 yyjson_mut_patch()
 yyjson_merge_patch()
 yyjson_mut_merge_patch()
 ```
これらの機能が不要な場合におすすめです。

● **YJSON_DISABLE_FAST_FP_CONV**<br/> です。
1として定義すると、yyjsonの高速浮動小数点数変換を無効にし、代わりにlibcの `strtod/snprintf` を使用します。<br/>
これにより、バイナリサイズを約30%削減できますが、浮動小数点数の読み書きの速度が著しく低下します。<br/> また、浮動小数点数の読み書きの速度が低下するため、浮動小数点数の読み書きの速度が低下します。
浮動小数点数を多く含むJSONを扱う必要がない場合は、この方法をお勧めします。

● **YYJSON_DISABLE_NON_STANDARD**<br/>を指定します。
1として定義すると、コンパイル時に非標準のJSONサポートを無効にします：

- `NaN`、`Infinity`などのinf/nanリテラルの読み書きができます。
- 1行および複数行のコメント
- オブジェクトや配列の末尾にカンマが1つある。
- 文字列の値で無効なユニコード

これは、これらのランタイムオプションも無効にします：
```c
YYJSON_READ_ALLOW_INF_AND_NAN
YYJSON_READ_ALLOW_COMMENTS
YYJSON_READ_ALLOW_TRAILING_COMMAS
YYJSON_READ_ALLOW_INVALID_UNICODE
YYJSON_WRITE_ALLOW_INF_AND_NAN
YYJSON_WRITE_ALLOW_INVALID_UNICODE
```

これにより、バイナリサイズを約10%削減し、パフォーマンスを若干向上させます。<br/>
非標準のJSONを扱う必要がない場合に推奨されます。

● **YYJSON_EXPORTS**<br/>を指定します。
Windows DLLとしてライブラリをビルドする際に、シンボルをエクスポートする場合に1として定義します。

● **YYJSON_IMPORTS**<br/>を指定します。
Windows DLLとしてライブラリを使用する際に、シンボルをインポートするために1として定義してください。
