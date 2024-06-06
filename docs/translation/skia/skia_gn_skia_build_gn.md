# skia/gn/skia/BUILD.gn の解説

[[TOC]]

### 著作権表示とライセンス情報
```gn
# Copyright 2016 Google Inc.
#
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
```
- **説明**: この部分はファイルの著作権が2016年のGoogle Inc.にあり、BSDスタイルのライセンスに従うことを示しています。

### プラットフォーム固有の設定のインポート
```gn
if (is_fuchsia) {
  import("//build/fuchsia/sdk.gni")
}
if (is_wasm) {
  import("../toolchain/wasm.gni")
}
```
- **説明**: 
  - `is_fuchsia` が `true` の場合、Fuchsiaプラットフォーム用の設定を含む `sdk.gni` ファイルをインポートします。
  - `is_wasm` が `true` の場合、WebAssembly（Wasm）用の設定を含む `wasm.gni` ファイルをインポートします。

### 共通設定のインポート
```gn
import("../skia.gni")
```
- **説明**: Skiaプロジェクトの共通設定を含む `skia.gni` ファイルをインポートします。

### ビルド引数の宣言
```gn
declare_args() {
  extra_asmflags = []
  extra_cflags = []
  extra_cflags_c = []
  extra_cflags_cc = []
  extra_ldflags = []

  malloc = ""
  werror = false
  xcode_sysroot = ""
}
```
- **説明**: ビルド時に使用する追加の引数を宣言しています。
  - `extra_asmflags`: 追加のアセンブリフラグ。
  - `extra_cflags`: 追加のC言語フラグ。
  - `extra_cflags_c`: 追加のC言語専用フラグ。
  - `extra_cflags_cc`: 追加のC++言語専用フラグ。
  - `extra_ldflags`: 追加のリンカフラグ。
  - `malloc`: メモリ割り当て方法を指定する文字列。
  - `werror`: 警告をエラーとして扱うかどうかを示すブール値。
  - `xcode_sysroot`: Xcodeのシステムルートを指定する文字列。

### iOSおよびtvOS用のシステムルート設定
```gn
if (is_ios && xcode_sysroot == "") {
  if (is_tvos) {
    sdk = "appletvos"
    if (ios_use_simulator) {
      sdk = "appletvsimulator"
    }
  } else {
    sdk = "iphoneos"
    if (ios_use_simulator) {
      sdk = "iphonesimulator"
    }
  }
  xcode_sysroot =
      exec_script("../find_xcode_sysroot.py", [ sdk ], "trim string")
}
```
- **説明**: 
  - `is_ios` が `true` で `xcode_sysroot` が未設定の場合、iOSまたはtvOSのSDKを設定します。
  - `is_tvos` が `true` の場合、`sdk` を `"appletvos"` に設定し、シミュレータを使用する場合は `"appletvsimulator"` に変更します。
  - `is_tvos` が `false` の場合、`sdk` を `"iphoneos"` に設定し、シミュレータを使用する場合は `"iphonesimulator"` に変更します。
  - `xcode_sysroot` を設定するために、指定された `sdk` を引数としてPythonスクリプト `find_xcode_sysroot.py` を実行します。

### macOS用のシステムルート設定
```gn
if (is_mac && host_os == "mac" && xcode_sysroot == "") {
  xcode_sysroot =
      exec_script("../find_xcode_sysroot.py", [ "macosx" ], "trim string")
}
```
- **説明**: 
  - `is_mac` が `true` で `host_os` が `"mac"` であり、`xcode_sysroot` が未設定の場合、`xcode_sysroot` を設定します。
  - これを行うために、`"macosx"` を引数としてPythonスクリプト `find_xcode_sysroot.py` を実行します。

### `config("default")` ブロック
```gn
config("default") {
  asmflags = []
  cflags = []
  cflags_c = []
  cflags_cc = []
  cflags_objcc = []
  defines = []
  ldflags = []
  libs = []
```
- **説明**: `default` という名前の設定を定義します。この設定は、アセンブリ、C、C++、Objective-Cのフラグ、定義、リンカフラグ、ライブラリなどのビルドオプションを含みます。
  - `asmflags`: アセンブリ言語のフラグ
  - `cflags`: C言語とC++言語の共通フラグ
  - `cflags_c`: C言語専用のフラグ
  - `cflags_cc`: C++言語専用のフラグ
  - `cflags_objcc`: Objective-C言語専用のフラグ
  - `defines`: プリプロセッサ定義
  - `ldflags`: リンカフラグ
  - `libs`: リンクするライブラリ

### Windowsプラットフォームでの特定の設定
```gn
  # Disable warnings about unknown attributes.
  # (These unknown attribute warnings are on by default, so we don't make
  # disabling them part of :warnings, as some targets remove :warnings.)
  if (is_win && !is_clang) {
    cflags += [
      "/wd5030",
      "/wd5051",
    ]
  } else {
    cflags += [ "-Wno-attributes" ]
  }
```
- **説明**: 未知の属性に関する警告を無効にします。これらの警告はデフォルトで有効になっているため、一部のターゲットが `:warnings` を無効にしている場合を考慮して、`:warnings` の一部にしません。
  - **Windows（非Clang）**:
    - `/wd5030`: 警告番号5030を無効にするフラグ
    - `/wd5051`: 警告番号5051を無効にするフラグ
  - **その他（Clangおよび非Windows）**:
    - `-Wno-attributes`: 属性に関する警告を無効にするフラグ

### Clangコンパイラでの特定の設定
```gn
  if (is_clang && !is_win) {
    # In Clang 14, this default was changed. We turn this off to (hopefully) make our
    # GMs more consistent in the transition.
    cflags += [ "-ffp-contract=off" ]
  }
```
- **説明**: Clangコンパイラバージョン14ではデフォルト設定が変更されたため、移行中にテストの一貫性を保つために、この設定を無効にします。
  - `-ffp-contract=off`: 浮動小数点数の収縮（contract）を無効にするフラグ

### FuchsiaプラットフォームとFuchsia SDKの使用
```gn
if (is_fuchsia && using_fuchsia_sdk) {
```
- **説明**: `is_fuchsia` が `true` であり、かつ `using_fuchsia_sdk` が `true` の場合に、以下の設定を適用します。これは、Fuchsiaプラットフォーム用のビルド設定を行う条件を確認しています。

### リンカフラグとコンパイルフラグの設定
```gn
ldflags += [
  "-v",
  "--sysroot=" + rebase_path("$fuchsia_sdk_path/arch/$current_cpu/sysroot"),
]
cflags += [ "--sysroot=" +
            rebase_path("$fuchsia_sdk_path/arch/$current_cpu/sysroot") ]
```
- **説明**: 
  - **リンカフラグ（`ldflags`）**:
    - `-v`: 詳細な情報を表示するフラグ。
    - `--sysroot=`: システムルートディレクトリを指定するフラグ。`rebase_path` 関数を使用して、`$fuchsia_sdk_path/arch/$current_cpu/sysroot` のパスを基準にしています。
  - **コンパイルフラグ（`cflags`）**:
    - `--sysroot=`: 同様にシステムルートディレクトリを指定します。

### ターゲットCPUに基づく設定
```gn
if (current_cpu == "x64") {
  current_cpu = "--target=x86_64-${current_os}"
} else if (current_cpu == "arm64") {
  target_triple = "--target=aarch64-unknown-${current_os}"
} else {
  print("Unknown target CPU for Fuchsia target build.")
  assert(false)
}
```
- **説明**: `current_cpu` の値に基づいて、適切なターゲットトリプルを設定します。
  - `x64` の場合: `current_cpu` を `--target=x86_64-${current_os}` に設定します。
  - `arm64` の場合: `target_triple` を `--target=aarch64-unknown-${current_os}` に設定します。
  - それ以外の場合: 未知のターゲットCPUであるため、エラーメッセージを表示し、アサーションエラーを発生させます。

### 追加のフラグの設定
```gn
ldflags += [ target_triple ]
cflags += [ target_triple ]
asmflags += [ target_triple ]
```
- **説明**: `target_triple` をリンカフラグ（`ldflags`）、コンパイルフラグ（`cflags`）、およびアセンブリフラグ（`asmflags`）に追加します。これにより、指定されたターゲットトリプルがビルドプロセス全体で使用されます。

### 全体の流れ
1. `is_fuchsia` と `using_fuchsia_sdk` がともに `true` であることを確認。
2. `ldflags` と `cflags` にシステムルートディレクトリを設定。
3. `current_cpu` に基づいて、適切なターゲットトリプルを設定。
4. 設定された `target_triple` を `ldflags`、`cflags`、`asmflags` に追加。

### Windowsプラットフォーム向けの設定
```gn
if (is_win) {
  if (is_clang && current_cpu == "arm64") {
    cflags += [ "--target=arm64-windows" ]
  }
  cflags += [
    "/bigobj",  # Some of our files are bigger than the regular limits.
    "/utf-8",  # Set Source and Executable character sets to UTF-8.
  ]
  cflags_cc += [ "/std:c++17" ]
  defines += [
    "_CRT_SECURE_NO_WARNINGS",  # Disables warnings about sscanf().
    "_HAS_EXCEPTIONS=0",  # Disables exceptions in MSVC STL.
    "WIN32_LEAN_AND_MEAN",
    "NOMINMAX",
  ]
```
- **説明**: 
  - **ClangコンパイラとARM64ターゲットの場合**:
    - `cflags` に `--target=arm64-windows` を追加します。
  - **一般設定**:
    - `cflags` に `/bigobj` を追加して、大きなオブジェクトファイルを許可します。
    - `cflags` に `/utf-8` を追加して、ソースと実行可能ファイルの文字セットをUTF-8に設定します。
    - `cflags_cc` に `/std:c++17` を追加して、C++17標準を使用します。
    - `defines` に以下の定義を追加します:
      - `_CRT_SECURE_NO_WARNINGS`: `sscanf`に関する警告を無効にします。
      - `_HAS_EXCEPTIONS=0`: MSVC STLで例外を無効にします。
      - `WIN32_LEAN_AND_MEAN`: Windowsヘッダから不要な部分を除外します。
      - `NOMINMAX`: `min` と `max` マクロの定義を無効にします。

### Windows向けのインクルードディレクトリの設定
```gn
  _include_dirs = [
    "$win_vc/Tools/MSVC/$win_toolchain_version/include",
    "$win_sdk/Include/$win_sdk_version/shared",
    "$win_sdk/Include/$win_sdk_version/ucrt",
    "$win_sdk/Include/$win_sdk_version/um",
    "$win_sdk/Include/$win_sdk_version/winrt",
  ]

  if (is_clang) {
    foreach(dir, _include_dirs) {
      cflags += [
        "-imsvc",
        dir,
      ]
    }
  } else {
    include_dirs = _include_dirs
  }
```
- **説明**: 
  - `_include_dirs` にMSVCとWindows SDKのインクルードディレクトリを設定します。
  - Clangコンパイラの場合、各ディレクトリに対して `-imsvc` フラグを `cflags` に追加します。
  - Clangでない場合、`include_dirs` に `_include_dirs` を設定します。

### Windows向けのライブラリディレクトリの設定
```gn
  lib_dirs = [
    "$win_sdk/Lib/$win_sdk_version/ucrt/$current_cpu",
    "$win_sdk/Lib/$win_sdk_version/um/$current_cpu",
    "$win_vc/Tools/MSVC/$win_toolchain_version/lib/$current_cpu",
  ]
```
- **説明**: Windows SDKおよびMSVCのライブラリディレクトリを設定します。

### その他のプラットフォーム向けの設定
```gn
} else {
  cflags += [
    "-fstrict-aliasing",
    "-fPIC",
    "-fvisibility=hidden",
  ]
  cflags_cc += [
    "-std=c++17",
    "-fvisibility-inlines-hidden",
  ]
}
```
- **説明**: 
  - **一般設定**:
    - `cflags` に以下を追加します:
      - `-fstrict-aliasing`: 厳密なエイリアシングルールを適用します。
      - `-fPIC`: 位置独立コードを生成します。
      - `-fvisibility=hidden`: デフォルトのシンボルの可視性を隠します。
    - `cflags_cc` に以下を追加します:
      - `-std=c++17`: C++17標準を使用します。
      - `-fvisibility-inlines-hidden`: インライン関数のデフォルト可視性を隠します。

### ARMアーキテクチャ向けの設定
```gn
if (current_cpu == "arm") {
  cflags += [
    "-march=armv7-a",
    "-mfpu=neon",
    "-mthumb",
  ]
}
```
- **説明**: `current_cpu` が `"arm"` の場合、以下のコンパイルフラグを追加します。
  - `-march=armv7-a`: ARMv7-Aアーキテクチャを指定します。
  - `-mfpu=neon`: NEON浮動小数点ユニットを使用します。
  - `-mthumb`: Thumb命令セットを使用します。

### x86アーキテクチャ向けの設定（Windows以外）
```gn
else if (current_cpu == "x86" && !is_win) {
  asmflags += [ "-m32" ]
  cflags += [
    "-m32",
    "-msse2",
    "-mfpmath=sse",
  ]
  ldflags += [ "-m32" ]
}
```
- **説明**: `current_cpu` が `"x86"` で `is_win` が `false` の場合、以下のフラグを追加します。
  - **アセンブリフラグ（`asmflags`）**:
    - `-m32`: 32ビットモードでコンパイルします。
  - **コンパイルフラグ（`cflags`）**:
    - `-m32`: 32ビットモードでコンパイルします。
    - `-msse2`: SSE2命令セットを使用します。
    - `-mfpmath=sse`: SSE命令セットを使用して浮動小数点演算を行います。
  - **リンカフラグ（`ldflags`）**:
    - `-m32`: 32ビットモードでリンクします。

### カスタムメモリアロケータの設定
```gn
if (malloc != "" && !is_win) {
  cflags += [
    "-fno-builtin-malloc",
    "-fno-builtin-calloc",
    "-fno-builtin-realloc",
    "-fno-builtin-free",
  ]
  libs += [ malloc ]
}
```
- **説明**: `malloc` が空でなく、かつ `is_win` が `false` の場合、以下のフラグを追加します。
  - **コンパイルフラグ（`cflags`）**:
    - `-fno-builtin-malloc`: ビルトインの `malloc` 関数を使用しないようにします。
    - `-fno-builtin-calloc`: ビルトインの `calloc` 関数を使用しないようにします。
    - `-fno-builtin-realloc`: ビルトインの `realloc` 関数を使用しないようにします。
    - `-fno-builtin-free`: ビルトインの `free` 関数を使用しないようにします。
  - **ライブラリ（`libs`）**:
    - `malloc` ライブラリをリンクします。

### Android向けの設定
```gn
if (is_android) {
  cflags += [ "--sysroot=$ndk/toolchains/llvm/prebuilt/$ndk_host/sysroot" ]
  ldflags += [ "-static-libstdc++" ]
}
```
- **説明**: `is_android` が `true` の場合、以下のフラグを追加します。
  - **コンパイルフラグ（`cflags`）**:
    - `--sysroot=$ndk/toolchains/llvm/prebuilt/$ndk_host/sysroot`: NDKのシステムルートを指定します。
  - **リンカフラグ（`ldflags`）**:
    - `-static-libstdc++`: 静的にリンクされたlibstdc++を使用します。

### インクルードの表示設定
```gn
if (show_includes) {
  assert(is_clang, "show_includes requires clang to build.")
  if (is_win) {
    cflags += [
      "/clang:-H",
      "/clang:-fshow-skipped-includes",
    ]
  } else {
    cflags += [
      "-H",
      "-fshow-skipped-includes",
    ]
  }
}
```
- **説明**: `show_includes` が `true` の場合、`is_clang` が `true` であることを確認し、以下のフラグを追加します。
  - **Windowsの場合**:
    - `/clang:-H`: インクルードファイルのヘッダ情報を表示します。
    - `/clang:-fshow-skipped-includes`: スキップされたインクルードファイルを表示します。
  - **その他のプラットフォーム**:
    - `-H`: インクルードファイルのヘッダ情報を表示します。
    - `-fshow-skipped-includes`: スキップされたインクルードファイルを表示します。

### iOSプラットフォーム向けの設定
```gn
if (is_ios) {
```
- **説明**: `is_ios` が `true` の場合に以下の設定を行います。これはiOSプラットフォーム向けのビルド設定を行うための条件です。

### CPUアーキテクチャごとのフラグ設定
```gn
  if (current_cpu == "arm") {
    _arch_flags = [
      "-arch",
      "armv7",
    ]
  } else if (current_cpu == "arm64") {
    _arch_flags = [
      "-arch",
      "arm64",
      "-arch",
      "arm64e",
    ]
  } else if (current_cpu == "x86") {
    _arch_flags = [
      "-arch",
      "i386",
    ]
  } else if (current_cpu == "x64") {
    _arch_flags = [
      "-arch",
      "x86_64",
    ]
  } else {
    _arch_flags = [
      "-arch",
      current_cpu,
    ]
  }
```
- **説明**: `current_cpu` に基づいて、適切なアーキテクチャフラグ（`_arch_flags`）を設定します。
  - `arm`: `"-arch", "armv7"`
  - `arm64`: `"-arch", "arm64", "-arch", "arm64e"`
  - `x86`: `"-arch", "i386"`
  - `x64`: `"-arch", "x86_64"`
  - その他: `"-arch", current_cpu`

### アセンブリ、コンパイル、およびリンクフラグの設定
```gn
  asmflags += [
                "-isysroot",
                xcode_sysroot,
              ] + _arch_flags
  cflags += [
              "-isysroot",
              xcode_sysroot,
            ] + _arch_flags
  cflags_cc += [
    "-stdlib=libc++",
    "-fno-aligned-allocation",
  ]
  ldflags += [
               "-isysroot",
               xcode_sysroot,
               "-stdlib=libc++",
             ] + _arch_flags
  libs += [ "objc" ]
```
- **説明**:
  - **アセンブリフラグ（`asmflags`）**:
    - `-isysroot`, `xcode_sysroot`: Xcodeのシステムルートを指定します。
    - `_arch_flags`: 上記で設定されたアーキテクチャフラグを追加します。
  - **コンパイルフラグ（`cflags`）**:
    - `-isysroot`, `xcode_sysroot`: Xcodeのシステムルートを指定します。
    - `_arch_flags`: 上記で設定されたアーキテクチャフラグを追加します。
  - **C++コンパイルフラグ（`cflags_cc`）**:
    - `-stdlib=libc++`: libc++標準ライブラリを使用します。
    - `-fno-aligned-allocation`: アラインメント付きメモリアロケーションを無効にします。
  - **リンカフラグ（`ldflags`）**:
    - `-isysroot`, `xcode_sysroot`: Xcodeのシステムルートを指定します。
    - `-stdlib=libc++`: libc++標準ライブラリを使用します。
    - `_arch_flags`: 上記で設定されたアーキテクチャフラグを追加します。
  - **リンクするライブラリ（`libs`）**:
    - `objc`: Objective-Cランタイムライブラリを追加します。

### iOSの最小ターゲットバージョンの設定
```gn
  if (ios_min_target != "") {
    cflags += [ "-miphoneos-version-min=$ios_min_target" ]
    asmflags += [ "-miphoneos-version-min=$ios_min_target" ]
    ldflags += [ "-miphoneos-version-min=$ios_min_target" ]
  }
```
- **説明**: `ios_min_target` が空でない場合、以下のフラグを追加します。
  - **コンパイルフラグ（`cflags`）**:
    - `-miphoneos-version-min=$ios_min_target`: 最小iOSバージョンを指定します。
  - **アセンブリフラグ（`asmflags`）**:
    - `-miphoneos-version-min=$ios_min_target`: 最小iOSバージョンを指定します。
  - **リンカフラグ（`ldflags`）**:
    - `-miphoneos-version-min=$ios_min_target`: 最小iOSバージョンを指定します。

### Linuxプラットフォーム向けの設定
```gn
if (is_linux) {
  libs += [ "pthread" ]
}
```
- **説明**: `is_linux` が `true` の場合、リンクするライブラリに `pthread` を追加します。これはPOSIXスレッドライブラリであり、マルチスレッドプログラムの作成に使用されます。

### macOSプラットフォーム向けの設定
```gn
if (is_mac) {
```
- **説明**: `is_mac` が `true` の場合に以下の設定を行います。これはmacOSプラットフォーム向けのビルド設定を行うための条件です。

### Xcodeシステムルートの設定
```gn
  if (xcode_sysroot != "") {
    asmflags += [
      "-isysroot",
      xcode_sysroot,
    ]
    cflags += [
      "-isysroot",
      xcode_sysroot,
    ]
    ldflags += [
      "-isysroot",
      xcode_sysroot,
    ]
  }
```
- **説明**: `xcode_sysroot` が空でない場合、以下のフラグを追加します。これはXcodeのシステムルートを指定するためのものです。
  - **アセンブリフラグ（`asmflags`）**:
    - `-isysroot`, `xcode_sysroot`
  - **コンパイルフラグ（`cflags`）**:
    - `-isysroot`, `xcode_sysroot`
  - **リンカフラグ（`ldflags`）**:
    - `-isysroot`, `xcode_sysroot`

### リンカ警告の無効化
```gn
  ldflags += [ "-Wl,-w" ]
```
- **説明**: リンカ警告を無効にします。これにより、リンク時の警告メッセージが表示されなくなります。

### ARM64とx86_64向けのターゲット設定
```gn
  if (current_cpu == "arm64") {
    asmflags += [
      "-target",
      "arm64-apple-macos11",
    ]
    cflags += [
      "-target",
      "arm64-apple-macos11",
    ]
    ldflags += [
      "-target",
      "arm64-apple-macos11",
    ]
  } else {
    asmflags += [
      "-target",
      "x86_64-apple-macos10.13",
    ]
    cflags += [
      "-target",
      "x86_64-apple-macos10.13",
    ]
    ldflags += [
      "-target",
      "x86_64-apple-macos10.13",
    ]
  }
```
- **説明**: `current_cpu` に基づいて、適切なターゲットフラグを設定します。
  - **ARM64の場合**:
    - **アセンブリフラグ（`asmflags`）**:
      - `-target`, `arm64-apple-macos11`
    - **コンパイルフラグ（`cflags`）**:
      - `-target`, `arm64-apple-macos11`
    - **リンカフラグ（`ldflags`）**:
      - `-target`, `arm64-apple-macos11`
  - **その他（x86_64）の場合**:
    - **アセンブリフラグ（`asmflags`）**:
      - `-target`, `x86_64-apple-macos10.13`
    - **コンパイルフラグ（`cflags`）**:
      - `-target`, `x86_64-apple-macos10.13`
    - **リンカフラグ（`ldflags`）**:
      - `-target`, `x86_64-apple-macos10.13`

### WebAssembly (WASM) の設定
```gn
if (is_wasm) {
  cflags += [ "--sysroot=$skia_emsdk_dir/upstream/emscripten/cache/sysroot" ]
  ldflags += [ "--sysroot=$skia_emsdk_dir/upstream/emscripten/cache/sysroot" ]
}
```
- **説明**: `is_wasm` が `true` の場合、以下のフラグを追加します。これはWASMビルドのためのEmscriptenツールチェインのシステムルートを指定します。
  - **コンパイルフラグ（`cflags`）**:
    - `--sysroot=$skia_emsdk_dir/upstream/emscripten/cache/sysroot`
  - **リンカフラグ（`ldflags`）**:
    - `--sysroot=$skia_emsdk_dir/upstream/emscripten/cache/sysroot`

### サニタイザーの設定
```gn
# sanitize only applies to the default toolchain (usually the target).
if (current_toolchain != default_toolchain) {
  sanitize = ""
}
```
- **説明**: `sanitize` は通常ターゲットのデフォルトツールチェインにのみ適用されるため、現在のツールチェインがデフォルトツールチェインでない場合は `sanitize` を空にします。

::: details サニタイザーとは
「サニタイザー」（Sanitizer）は、プログラムの実行中にメモリエラーやデータ競合といったバグを検出するためのツールです。サニタイザーは、コンパイル時に特定のフラグを付けてコードをインストルメント化し、実行時にさまざまなチェックを行います。これにより、デバッグが困難なバグを早期に検出することができます。

以下に代表的なサニタイザーであるASAN、HWASAN、TSAN、MSANのそれぞれの詳細を示します。

### ASAN (AddressSanitizer)
- **概要**: メモリの不正使用を検出するサニタイザー。
- **検出するバグ**:
  - バッファオーバーフロー（スタック、ヒープ、グローバル）
  - ユースアフターフリー（解放後のメモリアクセス）
  - ダブルフリー（同じメモリを2回解放）
  - ワイルドポインタ（無効なポインタへのアクセス）
  - メモリリーク（ヒープメモリの未解放）

### HWASAN (Hardware-assisted AddressSanitizer)
- **概要**: ASANのハードウェア支援バージョンで、特にARM64アーキテクチャ向けに設計されています。
- **検出するバグ**: 基本的にはASANと同様ですが、ハードウェアの支援を受けることでオーバーヘッドが少なくなり、大規模アプリケーションでも効率的に動作します。
- **使用ケース**: 主にAndroidデバイスや他のARM64プラットフォームでの使用が想定されています。

### TSAN (ThreadSanitizer)
- **概要**: データ競合を検出するサニタイザー。
- **検出するバグ**:
  - データ競合（複数のスレッドが同じ変数を同時に読み書きする場合の未定義動作）
  - ロックの不正使用
- **使用ケース**: マルチスレッドプログラムで、スレッド間の同期に関するバグの検出。

### MSAN (MemorySanitizer)
- **概要**: 未初期化メモリの使用を検出するサニタイザー。
- **検出するバグ**:
  - 初期化されていないメモリへの読み取り
  - 初期化されていないスタック変数やヒープ変数の使用
- **使用ケース**: メモリが初期化されていない状態で使用されるバグを検出するために使用。

これらのサニタイザーを使用することで、実行時に見つけにくいメモリ関連のバグやデータ競合を効果的に検出し、品質の高いソフトウェアを開発することができます。サニタイザーはコンパイル時に特定のフラグを指定することで有効になります。
:::

### Windows環境でのアドレスサニタイザー設定
```gn
if (is_win && !is_clang && sanitize == "ASAN") {
  sanitizers = "address"
  cflags += [ "/fsanitize=$sanitizers" ]
} else if (sanitize != "" && sanitize != "MSVC") {
```
- **説明**: 
  - **WindowsでClangを使用しておらず、かつASANを使用する場合**:
    - `sanitizers` に `"address"` を設定します。
    - コンパイルフラグに `/fsanitize=$sanitizers` を追加します。
  - **その他のサニタイザー設定**:
    - `sanitize` が空でなく、`"MSVC"` でない場合に以下の設定を行います。

### サニタイザーの設定と特定のサニタイザーの処理
```gn
  sanitizers = sanitize

  if (sanitize == "ASAN") {
    sanitizers = "undefined,address,float-divide-by-zero"
    if (is_android) {
      sanitizers = "address"
    }
  } else if (sanitize == "HWASAN") {
    sanitizers = "hwaddress"
  } else if (sanitize == "TSAN") {
    sanitizers = "thread"
  } else if (sanitize == "MSAN") {
    sanitizers = "memory"
  }
```
- **説明**: 
  - `sanitizers` に `sanitize` の値を設定します。
  - **ASANの場合**:
    - `sanitizers` に `undefined,address,float-divide-by-zero` を設定します。
    - Android環境では `address` のみに設定します。
  - **その他のサニタイザー**:
    - `HWASAN`: `hwaddress`
    - `TSAN`: `thread`
    - `MSAN`: `memory`

### サニタイザーフラグの設定と抑制ファイルの指定
```gn
  _suppressions = rebase_path("../../tools/xsan.supp")

  cflags += [
    "-fsanitize=$sanitizers",
    "-fno-sanitize-recover=$sanitizers",
    "-fsanitize-blacklist=$_suppressions",
  ]
```
- **説明**: 
  - `_suppressions` に抑制ファイルのパスを設定します。
  - **コンパイルフラグ（`cflags`）**:
    - `-fsanitize=$sanitizers`: 指定されたサニタイザーを有効にします。
    - `-fno-sanitize-recover=$sanitizers`: 指定されたサニタイザーのリカバリを無効にします。
    - `-fsanitize-blacklist=$_suppressions`: 指定された抑制ファイルを使用します。

### Windows環境での追加設定
```gn
  if (is_win) {
    cflags += [
      "/GF-",
    ]

    assert(clang_win != "")
    libs += [ "$clang_win/lib/clang/$clang_win_version/lib/windows/clang_rt.asan-x86_64.lib" ]
  } else {
    cflags += [ "-fno-omit-frame-pointer" ]
    ldflags += [ "-fsanitize=$sanitizers" ]
  }
```
- **説明**: 
  - **Windows環境の場合**:
    - `cflags` に `/GF-` を追加してリリースビルドの文字列リテラルに関する警告を無効にします。
    - `clang_win` が空でないことを確認します。
    - `libs` に ASANランタイムライブラリを追加します。
  - **その他の環境**:
    - `cflags` に `-fno-omit-frame-pointer` を追加します。
    - `ldflags` に `-fsanitize=$sanitizers` を追加します。

### Linux環境での追加設定
```gn
  if (is_linux) {
    cflags_cc += [ "-stdlib=libc++" ]
    ldflags += [ "-stdlib=libc++" ]
  }
```
- **説明**: `is_linux` が `true` の場合、C++標準ライブラリとして `libc++` を使用するフラグを追加します。

### メモリサニタイザーの追加設定
```gn
  if (sanitizers == "memory") {
    cflags += [ "-fsanitize-memory-track-origins" ]
  }
```
- **説明**: `sanitizers` が `memory` の場合、`-fsanitize-memory-track-origins` を追加します。

### 安全スタックの追加設定
```gn
  if (sanitizers == "safe-stack") {
    cflags_cc += [ "-fno-aligned-allocation" ]
  }
```
- **説明**: `sanitizers` が `safe-stack` の場合、`-fno-aligned-allocation` を追加します。

### Objective-C++用のフラグ設定
```gn
cflags_objcc += cflags_cc
```
- **説明**: `cflags_cc` のフラグを `cflags_objcc` に追加します。これはObjective-C++のビルド設定をC++の設定と一致させるためです。

### ポインタオーバーフローの回復設定
```gn
# See skia:9731.
config("recover_pointer_overflow") {
  if (sanitize == "ASAN" && !(is_win && !is_clang)) {
    cflags = [ "-fsanitize-recover=pointer-overflow" ]
  }
}
```
- **説明**:
  - **概要**: `recover_pointer_overflow` という名前の設定を定義しています。
  - **条件**: 
    - `sanitize` が `"ASAN"` に設定されている場合。
    - Windows環境（`is_win`）かつClang以外のコンパイラを使用していない場合。
  - **設定内容**:
    - `cflags` に `-fsanitize-recover=pointer-overflow` フラグを追加します。
    - このフラグは、アドレスサニタイザー（ASAN）がポインタオーバーフローを検出した場合にリカバリを行うことを指示します。

### 例外無効化設定
```gn
config("no_exceptions") {
  # Exceptions are disabled by default on Windows.  (Use /EHsc to enable them.)
  if (!is_win) {
    cflags_cc = [ "-fno-exceptions" ]
    cflags_objcc = cflags_cc
  }
}
```
- **説明**:
  - **概要**: `no_exceptions` という名前の設定を定義しています。
  - **条件**:
    - `is_win` が `false` の場合（つまり、非Windows環境の場合）。
  - **設定内容**:
    - `cflags_cc` に `-fno-exceptions` フラグを追加します。これにより、C++コードで例外を無効にします。
    - `cflags_objcc` にも同じ `-fno-exceptions` フラグを追加します。これにより、Objective-C++コードでも例外を無効にします。
  - **注記**:
    - Windows環境では例外がデフォルトで無効になっているため、特に設定する必要はありません。例外を有効にするには、`/EHsc` フラグを使用します。

### 基本設定
```gn
config("warnings") {
  cflags = []
  cflags_cc = []
  cflags_objc = []
  cflags_objcc = []
```
- **説明**: `warnings` という名前の設定を定義します。ここでは、C、C++、Objective-C、およびObjective-C++の各種フラグ（`cflags`、`cflags_cc`、`cflags_objc`、`cflags_objcc`）を初期化しています。

### 警告をエラーとして扱う設定
```gn
  if (werror) {
    if (is_win) {
      cflags += [ "/WX" ]
    } else {
      cflags += [ "-Werror" ]
    }
  }
```
- **説明**: `werror` が `true` の場合、警告をエラーとして扱います。
  - **Windowsの場合**: `cflags` に `/WX` を追加します。
  - **その他のプラットフォーム**: `cflags` に `-Werror` を追加します。

### Windowsプラットフォーム向けの警告設定
```gn
  if (is_win) {
    cflags += [
      "/W3",  # Turn on lots of warnings.

      # Disable a bunch of warnings:
      "/wd4244",  # conversion from 'float' to 'int', possible loss of data
      "/wd4267",  # conversion from 'size_t' to 'int', possible loss of data
      "/wd4800",  # forcing value to bool 'true' or 'false' (performance warning)

      # Probably only triggers when /EHsc is enabled.
      "/wd4291",  # no matching operator delete found; memory will not be freed if initialization throws an exception

      # These only show up in shared builds:
      "/wd4251",  # class 'type' needs to have dll-interface to be used by clients of class 'type2'
      "/wd4275",  # non dll-interface class 'base' used as base for dll-interface class 'derived'

      # It'd be nice to fix these and turn this on:
      "/wd5041",  # out-of-line definition for constexpr static data member is not needed and is deprecated in C++17
    ]
    if (is_clang) {
      cflags += [
        "-Wno-unused-parameter",  # Re-enabled for header sources
      ]
    }
```
- **説明**: `is_win` が `true` の場合、Windows向けの警告フラグを設定します。
  - `/W3`: 多くの警告を有効にします。
  - `/wd4244`, `/wd4267`, `/wd4800`: 特定の警告を無効にします。
  - `/wd4291`: 例外処理に関連する警告を無効にします。
  - `/wd4251`, `/wd4275`: 共有ビルドでのみ表示される警告を無効にします。
  - `/wd5041`: C++17の仕様変更に関連する警告を無効にします。
  - **Clangを使用している場合**: `-Wno-unused-parameter` を追加します。

### 非Windowsプラットフォーム向けの警告設定
```gn
  } else {
    cflags += [
      "-Wall",
      "-Wextra",
      "-Winit-self",
      "-Wpointer-arith",
      "-Wsign-compare",
      "-Wvla",

      "-Wno-deprecated-declarations",
      "-Wno-maybe-uninitialized",
      "-Wno-psabi",
      "-Wno-unused-parameter",  # Re-enabled for header sources
    ]
    cflags_cc += [
      "-Wnon-virtual-dtor",
      "-Wno-noexcept-type",
    ]
  }
}
```
- **説明**: `is_win` が `false` の場合、非Windows向けの警告フラグを設定します。
  - **一般的な警告フラグ（`cflags`）**:
    - `-Wall`, `-Wextra`: 多くの警告を有効にします。
    - `-Winit-self`: 自己初期化に関する警告を有効にします。
    - `-Wpointer-arith`: ポインタ演算に関する警告を有効にします。
    - `-Wsign-compare`: 符号付きと符号なしの比較に関する警告を有効にします。
    - `-Wvla`: 可変長配列に関する警告を有効にします。
    - `-Wno-deprecated-declarations`, `-Wno-maybe-uninitialized`, `-Wno-psabi`, `-Wno-unused-parameter`: 特定の警告を無効にします。
  - **C++専用の警告フラグ（`cflags_cc`）**:
    - `-Wnon-virtual-dtor`: 非仮想デストラクタに関する警告を有効にします。
    - `-Wno-noexcept-type`: `noexcept` 修飾子に関する警告を無効にします。

### Clang用の基本フラグ設定
```gn
if (is_clang) {
  cflags += [
    "-fcolor-diagnostics",
    "-Weverything",
    "-Wno-unknown-warning-option",  # Let older Clangs ignore newer Clangs'
                                    # warnings.

    # This was deprecated in Clang 14 and removed in Clang 15. It might still
    # fire with older Clangs, so disable it explicitly.
    "-Wno-weak-template-vtables",
  ]
```
- **説明**:
  - `is_clang` が `true` の場合、以下のコンパイルフラグを追加します。
    - `-fcolor-diagnostics`: カラフルな診断メッセージを表示します。
    - `-Weverything`: すべての警告を有効にします。
    - `-Wno-unknown-warning-option`: 古いClangバージョンが新しいClangバージョンの警告オプションを無視するようにします。
    - `-Wno-weak-template-vtables`: Clang 14で非推奨となり、Clang 15で削除された警告を無効にします。古いClangバージョンでまだ発生する可能性があるため、明示的に無効にします。

### 特定のプラットフォームでのフラグ設定
```gn
  # See https://crbug.com/1042470: This flag prevents implicit conversions among vector types.
  # This also gives behavior closer to GCC's default. However:
  #   - clang-cl doesn't recognize the flag
  #   - The (old) Mac/iOS SDK used on the bots breaks this rule in various headers
  #     TODO: Re-enable on Apple when we update XCode
  if (!is_win && !is_apple) {
    cflags += [ "-fno-lax-vector-conversions" ]
  }
```
- **説明**:
  - リンク先のバグ報告に基づき、ベクトル型間の暗黙的な変換を防ぐためのフラグを設定します。これはGCCのデフォルトの動作に近づけます。
  - **例外**:
    - `clang-cl` はこのフラグを認識しません。
    - 古いMac/iOS SDKはこのルールを破ることがあり、XCodeを更新するまでAppleプラットフォームでは無効にします。
  - WindowsでもAppleでもない場合に `-fno-lax-vector-conversions` を追加します。

### 特定のCPUとプラットフォームでのアライメント警告の無効化
```gn
  if (current_cpu == "arm" && is_ios) {
    # Clang seems to think new/malloc will only be 4-byte aligned on 32-bit iOS.
    # We're pretty sure it's actually 8-byte alignment.
    cflags += [ "-Wno-over-aligned" ]
  }
  if (current_cpu == "x86" && is_android) {
    # Clang seems to think new/malloc will only be 4-byte aligned on 32-bit x86 Android builds.
    # We're pretty sure it's actually 8-byte alignment.  See OverAlignedTest.cpp for more info.
    cflags += [ "-Wno-over-aligned" ]
  }
```
- **説明**:
  - **32ビットiOSのARM**:
    - Clangは `new` や `malloc` が4バイトアラインメントのみであると考えますが、実際には8バイトアラインメントであることを前提としています。
    - この警告を無効にするため `-Wno-over-aligned` を追加します。
  - **32ビットx86 Android**:
    - Clangは `new` や `malloc` が4バイトアラインメントのみであると考えますが、実際には8バイトアラインメントであることを前提としています。
    - この警告を無効にするため `-Wno-over-aligned` を追加します。

### 非移植的なインクルードパスに関する警告の無効化
```gn
  # Shouldn't be necessary for local builds. With distributed Windows builds, files may lose
  # their case during copy, causing case-sensitivity mismatch on remote machines.
  cflags += [
    "-Wno-nonportable-include-path",
    "-Wno-nonportable-system-include-path",
  ]
```
- **説明**:
  - **ローカルビルドでは必要ない**:
    - 分散Windowsビルドでは、ファイルがコピー中に大文字小文字を失う可能性があり、リモートマシンでケースセンシティビティの不一致が発生することがあります。
    - 非移植的なインクルードパスに関する警告を無効にするため、以下のフラグを追加します。
    - `-Wno-nonportable-include-path`
    - `-Wno-nonportable-system-include-path`

### 全体の警告フラグ設定
```gn
# TODO: These would all be really great warnings to turn on.
cflags += [
  "-Wno-cast-align",
  "-Wno-conversion",  # -Wsign-conversion and -Wshorten-64-to-32,
                      # are re-enabled for header sources
  "-Wno-disabled-macro-expansion",
  "-Wno-documentation",
  "-Wno-documentation-unknown-command",
  "-Wno-double-promotion",
  "-Wno-exit-time-destructors",  # TODO: OK outside libskia
  "-Wno-float-equal",
  "-Wno-global-constructors",  # TODO: OK outside libskia
  "-Wno-missing-prototypes",
  "-Wno-missing-variable-declarations",
  "-Wno-pedantic",
  "-Wno-reserved-id-macro",
  "-Wno-reserved-identifier",
  "-Wno-shift-sign-overflow",
  "-Wno-signed-enum-bitfield",
  "-Wno-switch-enum",
  "-Wno-thread-safety-negative",
  "-Wno-undef",
  "-Wno-unreachable-code-break",
  "-Wno-unreachable-code-return",
  "-Wno-unused-macros",
  "-Wno-unused-member-function",
  "-Wno-non-c-typedef-for-linkage",  # Dawn, not Skia per se.

  # We would like to fix this, otherwise it could cause runtime issues
  # when compiled for WASM.
  # https://github.com/emscripten-core/emscripten/issues/16126
  "-Wno-cast-function-type-strict",
]
```
- **説明**: `cflags` に追加されるこれらのフラグは、特定の警告を無効にします。各フラグの詳細は以下の通りです。
  - `-Wno-cast-align`: アラインメントキャストに関する警告を無効にします。
  - `-Wno-conversion`: 型変換に関する警告を無効にします（特に符号付き変換と64ビットから32ビットへの変換）。
  - `-Wno-disabled-macro-expansion`: マクロ展開が無効化された場合の警告を無効にします。
  - `-Wno-documentation`: ドキュメントコメントに関する警告を無効にします。
  - `-Wno-documentation-unknown-command`: 不明なドキュメントコマンドに関する警告を無効にします。
  - `-Wno-double-promotion`: 浮動小数点のダブルプロモーションに関する警告を無効にします。
  - `-Wno-exit-time-destructors`: プログラム終了時のデストラクタに関する警告を無効にします（libskia以外で問題ない場合）。
  - `-Wno-float-equal`: 浮動小数点の比較に関する警告を無効にします。
  - `-Wno-global-constructors`: グローバルコンストラクタに関する警告を無効にします（libskia以外で問題ない場合）。
  - `-Wno-missing-prototypes`: プロトタイプが不足している場合の警告を無効にします。
  - `-Wno-missing-variable-declarations`: 変数宣言が不足している場合の警告を無効にします。
  - `-Wno-pedantic`: 厳格な標準準拠に関する警告を無効にします。
  - `-Wno-reserved-id-macro`: 予約されたIDのマクロに関する警告を無効にします。
  - `-Wno-reserved-identifier`: 予約された識別子に関する警告を無効にします。
  - `-Wno-shift-sign-overflow`: シフト演算による符号オーバーフローに関する警告を無効にします。
  - `-Wno-signed-enum-bitfield`: 符号付き列挙型のビットフィールドに関する警告を無効にします。
  - `-Wno-switch-enum`: 列挙型のスイッチ文に関する警告を無効にします。
  - `-Wno-thread-safety-negative`: スレッドセーフティに関する負の警告を無効にします。
  - `-Wno-undef`: 未定義のマクロに関する警告を無効にします。
  - `-Wno-unreachable-code-break`: 到達不能なコード（break文）に関する警告を無効にします。
  - `-Wno-unreachable-code-return`: 到達不能なコード（return文）に関する警告を無効にします。
  - `-Wno-unused-macros`: 未使用のマクロに関する警告を無効にします。
  - `-Wno-unused-member-function`: 未使用のメンバ関数に関する警告を無効にします。
  - `-Wno-non-c-typedef-for-linkage`: 非Cのtypedefに関する警告を無効にします（主にDawnプロジェクト向け）。
  - `-Wno-cast-function-type-strict`: 関数型のキャストに関する厳密な警告を無効にします。WASMでのランタイム問題を回避するため。

### C++特有の警告フラグ設定
```gn
cflags_cc += [
  "-Wno-abstract-vbase-init",
  "-Wno-weak-vtables",
]
```
- **説明**: `cflags_cc` に追加されるこれらのフラグは、C++コンパイラ特有の警告を無効にします。
  - `-Wno-abstract-vbase-init`: 抽象仮想ベースの初期化に関する警告を無効にします。
  - `-Wno-weak-vtables`: 弱い仮想テーブルに関する警告を無効にします。

### 全体の警告フラグ設定
```gn
# We are unlikely to want to fix these.
cflags += [
  "-Wno-covered-switch-default",
  "-Wno-deprecated",
  "-Wno-missing-noreturn",
  "-Wno-old-style-cast",
  "-Wno-newline-eof",
  "-Wno-padded",
  "-Wno-return-std-move-in-c++11",  # we no longer support C++11, and don't
                                    # need C++11-only performance warnings
  "-Wno-shadow-field-in-constructor",
  "-Wno-shadow-uncaptured-local",
  "-Wno-zero-as-null-pointer-constant",  # VK_NULL_HANDLE is defined as 0
  "-Wno-declaration-after-statement",
  "-Wno-unsafe-buffer-usage",  # Treats most array accesses as warnings

  # https://quuxplusone.github.io/blog/2020/08/26/wrange-loop-analysis/
  # https://bugzilla.mozilla.org/show_bug.cgi?id=1683213
  # https://reviews.llvm.org/D73007
  # May be re-enabled once clang > 12 or XCode > 12 are required.
  # When this line is removed the -Wrange-loop-construct line below can also be removed.
  "-Wno-range-loop-analysis",
]
```
- **説明**: これらのフラグは、特定の警告を無効にします。各フラグの詳細は以下の通りです。
  - `-Wno-covered-switch-default`: `switch` 文に `default` ケースがカバーされていない場合の警告を無効にします。
  - `-Wno-deprecated`: 非推奨の機能に関する警告を無効にします。
  - `-Wno-missing-noreturn`: 関数が `noreturn` 属性を持っていない場合の警告を無効にします。
  - `-Wno-old-style-cast`: 古いスタイルのキャストに関する警告を無効にします。
  - `-Wno-newline-eof`: ファイルの終わりに改行がない場合の警告を無効にします。
  - `-Wno-padded`: 構造体のパディングに関する警告を無効にします。
  - `-Wno-return-std-move-in-c++11`: C++11の `std::move` に関する警告を無効にします（C++11はサポートしていないため）。
  - `-Wno-shadow-field-in-constructor`: コンストラクタ内でフィールドが影になっている場合の警告を無効にします。
  - `-Wno-shadow-uncaptured-local`: ローカル変数がキャプチャされていない場合の警告を無効にします。
  - `-Wno-zero-as-null-pointer-constant`: `0` がヌルポインタ定数として使用されている場合の警告を無効にします（`VK_NULL_HANDLE` は `0` と定義されています）。
  - `-Wno-declaration-after-statement`: ステートメントの後に宣言がある場合の警告を無効にします。
  - `-Wno-unsafe-buffer-usage`: 配列アクセスに関する警告を無効にします。
  - `-Wno-range-loop-analysis`: 範囲ベースのループ解析に関する警告を無効にします（Clang 12またはXCode 12以降で再度有効にする予定）。

### C++特有の警告フラグ設定
```gn
cflags_cc += [
  "-Wno-c++98-compat",
  "-Wno-c++98-compat-pedantic",
  "-Wno-undefined-func-template",
]
```
- **説明**: これらのフラグは、C++コンパイラ特有の警告を無効にします。
  - `-Wno-c++98-compat`: C++98との互換性に関する警告を無効にします。
  - `-Wno-c++98-compat-pedantic`: C++98との厳密な互換性に関する警告を無効にします。
  - `-Wno-undefined-func-template`: 未定義の関数テンプレートに関する警告を無効にします。

### Objective-C特有の警告フラグ設定
```gn
cflags_objc += [
  "-Wno-direct-ivar-access",
  "-Wno-objc-interface-ivars",
]
```
- **説明**: これらのフラグは、Objective-Cコンパイラ特有の警告を無効にします。
  - `-Wno-direct-ivar-access`: インスタンス変数への直接アクセスに関する警告を無効にします。
  - `-Wno-objc-interface-ivars`: Objective-Cインターフェースのインスタンス変数に関する警告を無効にします。

### Objective-C++特有の警告フラグ設定
```gn
cflags_objcc += [
  "-Wno-direct-ivar-access",
  "-Wno-objcc-interface-ivars",
]
```
- **説明**: これらのフラグは、Objective-C++コンパイラ特有の警告を無効にします。
  - `-Wno-direct-ivar-access`: インスタンス変数への直接アクセスに関する警告を無効にします。
  - `-Wno-objcc-interface-ivars`: Objective-C++インターフェースのインスタンス変数に関する警告を無効にします。

### range-loop-analysisに関する警告フラグの設定
```gn
# Wno-range-loop-analysis turns off the whole group, but this warning was later split into
# range-loop-construct and range-loop-bind-reference. We want the former but not the latter.
# Created from clang/include/clang/Basic/DiagnosticGroups.td
cflags += [ "-Wrange-loop-construct" ]
```
- **説明**:
  - `-Wno-range-loop-analysis` フラグは、範囲ベースのループに関するすべての警告を無効にしますが、この警告は後に `range-loop-construct` と `range-loop-bind-reference` に分割されました。
  - `-Wrange-loop-construct` フラグは範囲ベースのループの構造に関する警告を有効にしますが、`range-loop-bind-reference` に関する警告は無効のままにします。

### deprecatedに関する警告フラグの設定
```gn
# Wno-deprecated turns off the whole group, but also has its own warnings like
# out-of-line definition of constexpr static data member is redundant in C++17 and is deprecated [-Werror,-Wdeprecated]
# but we would like others. Created from clang/include/clang/Basic/DiagnosticGroups.td
cflags += [
  "-Wdeprecated-anon-enum-enum-conversion",
  "-Wdeprecated-array-compare",
  "-Wdeprecated-attributes",
  "-Wdeprecated-comma-subscript",
  "-Wdeprecated-copy",
  "-Wdeprecated-copy-dtor",

  #"-Wdeprecated-declarations",
  "-Wdeprecated-dynamic-exception-spec",
  "-Wdeprecated-enum-compare",
  "-Wdeprecated-enum-compare-conditional",
  "-Wdeprecated-enum-enum-conversion",
  "-Wdeprecated-enum-float-conversion",
  "-Wdeprecated-increment-bool",
  "-Wdeprecated-register",
  "-Wdeprecated-this-capture",
  "-Wdeprecated-volatile",
  "-Wdeprecated-writable-str",
  "-Wc++98-compat-extra-semi",
]
```
- **説明**:
  - `-Wno-deprecated` フラグは、非推奨に関するすべての警告を無効にしますが、特定の警告は有効にしたい場合があります。
  - 以下の警告を個別に有効にします:
    - `-Wdeprecated-anon-enum-enum-conversion`: 匿名の列挙型から別の列挙型への変換に関する警告。
    - `-Wdeprecated-array-compare`: 配列の比較に関する警告。
    - `-Wdeprecated-attributes`: 非推奨の属性に関する警告。
    - `-Wdeprecated-comma-subscript`: コンマ演算子を使用した添字に関する警告。
    - `-Wdeprecated-copy`: 非推奨のコピー操作に関する警告。
    - `-Wdeprecated-copy-dtor`: 非推奨のコピーコンストラクタとデストラクタに関する警告。
    - `-Wdeprecated-dynamic-exception-spec`: 動的例外仕様に関する警告。
    - `-Wdeprecated-enum-compare`: 列挙型の比較に関する警告。
    - `-Wdeprecated-enum-compare-conditional`: 条件付きの列挙型の比較に関する警告。
    - `-Wdeprecated-enum-enum-conversion`: 列挙型から別の列挙型への変換に関する警告。
    - `-Wdeprecated-enum-float-conversion`: 列挙型から浮動小数点数への変換に関する警告。
    - `-Wdeprecated-increment-bool`: ブール値のインクリメントに関する警告。
    - `-Wdeprecated-register`: `register` キーワードに関する警告。
    - `-Wdeprecated-this-capture`: `this` キャプチャに関する警告。
    - `-Wdeprecated-volatile`: `volatile` キーワードに関する警告。
    - `-Wdeprecated-writable-str`: 書き込み可能な文字列リテラルに関する警告。
    - `-Wc++98-compat-extra-semi`: C++98互換の追加セミコロンに関する警告。

### GCCコンパイラ用の警告設定
```gn
# !is_clang is a proxy for gcc.
if (!is_clang && !is_win) {
  cflags += [
    "-Wno-unreachable-code",  # Causes false positives in old GCC; removed
                              # from modern GCC entirely
  ]
}
```
- **説明**:
  - `!is_clang` はGCCコンパイラを示します。
  - `is_win` ではない場合（つまり、非Windows環境でGCCを使用している場合）、以下の警告を無効にします:
    - `-Wno-unreachable-code`: 古いGCCで偽陽性を引き起こす未達コードに関する警告を無効にします。この警告は最新のGCCでは完全に削除されています。

### Objective-C++用のフラグ設定
```gn
cflags_objcc += cflags_cc
```
- **説明**: `cflags_cc` のフラグを `cflags_objcc` に追加します。これはObjective-C++のビルド設定をC++の設定と一致させるためです。

### 公開ヘッダ用の警告設定
```gn
config("warnings_for_public_headers") {
  if (is_clang) {
    cflags = [
      "-Wsign-conversion",
      "-Wunused-parameter",
      "-Wshorten-64-to-32",
    ]
  }
}
```
- **説明**:
  - **コンフィグ名**: `warnings_for_public_headers`
  - **条件**: Clangコンパイラを使用している場合（`is_clang` が `true`）
  - **設定内容**: 公開ヘッダ用の特定の警告を有効にします。
    - `-Wsign-conversion`: 符号付きと符号なしの変換に関する警告を有効にします。
    - `-Wunused-parameter`: 未使用のパラメータに関する警告を有効にします。
    - `-Wshorten-64-to-32`: 64ビットから32ビットへの縮小変換に関する警告を有効にします。

### 追加フラグの設定
```gn
config("extra_flags") {
  # extra_flags only applies to the default toolchain (usually the target).
  if (current_toolchain == default_toolchain) {
    asmflags = extra_asmflags
    cflags = extra_cflags
    cflags_c = extra_cflags_c
    cflags_cc = extra_cflags_cc
    ldflags = extra_ldflags
  }
}
```
- **説明**:
  - **コンフィグ名**: `extra_flags`
  - **条件**: 現在のツールチェインがデフォルトツールチェインと同じ場合（`current_toolchain == default_toolchain`）
  - **設定内容**: 追加のアセンブリ、コンパイル、リンクフラグを適用します。
    - `asmflags`: `extra_asmflags`
    - `cflags`: `extra_cflags`
    - `cflags_c`: `extra_cflags_c`
    - `cflags_cc`: `extra_cflags_cc`
    - `ldflags`: `extra_ldflags`

### デバッグシンボルの設定
```gn
config("debug_symbols") {
  # It's annoying to wait for full debug symbols to push over
  # to Android devices.  -gline-tables-only is a lot slimmer.
  if (is_android) {
    cflags = [
      "-gline-tables-only",
      "-funwind-tables",  # Helps make in-process backtraces fuller.
    ]
  } else if (is_win) {
    cflags = [ "/Z7" ]
    if (is_clang) {
      cflags += [ "-gcodeview-ghash" ]
      ldflags = [ "/DEBUG:GHASH" ]
    } else {
      ldflags = [ "/DEBUG:FASTLINK" ]
    }
  } else {
    cflags = [
      "-g",
      "-gdwarf-4",  # older versions of addr2line do not work well with v5
    ]
  }
}
```
- **説明**:
  - **コンフィグ名**: `debug_symbols`
  - **条件と設定内容**:
    - **Androidの場合**（`is_android` が `true`）:
      - `-gline-tables-only`: 行テーブルのみを含むデバッグ情報を生成します（これによりデバッグシンボルのサイズが小さくなります）。
      - `-funwind-tables`: アンワインドテーブルを含むデバッグ情報を生成します（スタックトレースがより詳細になります）。
    - **Windowsの場合**（`is_win` が `true`）:
      - `cflags`: `/Z7`
      - **Clangを使用している場合**（`is_clang` が `true`）:
        - `cflags` に `-gcodeview-ghash` を追加。
        - `ldflags`: `/DEBUG:GHASH`
      - **その他のコンパイラ**:
        - `ldflags`: `/DEBUG:FASTLINK`
    - **その他のプラットフォーム**:
      - `cflags`: `-g`（デバッグ情報を生成します）。
      - `-gdwarf-4`: デバッグ情報の形式としてDWARFバージョン4を使用します（古いバージョンのaddr2lineとの互換性を保つため）。

### RTTI（ランタイム型情報）の無効化設定
```gn
config("no_rtti") {
  if (sanitize != "ASAN") {  # -fsanitize=vptr requires RTTI
    if (is_win) {
      cflags_cc = [ "/GR-" ]
    } else {
      cflags_cc = [ "-fno-rtti" ]
      cflags_objcc = cflags_cc
    }
  }
}
```
- **説明**:
  - **コンフィグ名**: `no_rtti`
  - **条件**: サニタイザーがASANでない場合（`sanitize != "ASAN"`）
  - **設定内容**:
    - **Windowsの場合**（`is_win` が `true`）:
      - `cflags_cc`: `/GR-`（C++コードでRTTIを無効にします）。
    - **その他のプラットフォーム**:
      - `cflags_cc`: `-fno-rtti`（C++コードでRTTIを無効にします）。
      - `cflags_objcc`: `-fno-rtti`（Objective-C++コードでRTTIを無効にします）。

::: details
RTTI（Run-Time Type Information、ランタイム型情報）は、C++プログラムにおいて、実行時にオブジェクトの型情報を取得するための機能です。RTTIを使用することで、プログラム実行中にオブジェクトの実際の型を動的に確認し、それに基づいた処理を行うことができます。

### RTTIとは何ですか？

RTTIは、C++の標準機能であり、主に以下の3つの演算子/関数によってサポートされています：
- `typeid`: オブジェクトや型の型情報を取得するための演算子。
- `dynamic_cast`: 安全にダウンキャスト（基底クラスから派生クラスへのキャスト）を行うための演算子。キャストが失敗した場合には`nullptr`を返します。
- `std::bad_cast`: `dynamic_cast`が失敗した場合にスローされる例外。

### RTTIが有効化されるとどうなりますか？

RTTIが有効化されていると、以下のことが可能になります：
1. **`typeid` 演算子**: クラスの型情報を取得し、型名を確認することができます。
   ```cpp
   #include <iostream>
   #include <typeinfo>

   class Base { virtual void foo() {} };
   class Derived : public Base {};

   int main() {
       Base* b = new Derived();
       std::cout << typeid(*b).name() << std::endl;  // Derived型の情報が出力される
   }
   ```
2. **`dynamic_cast` 演算子**: 安全にポインタや参照を派生クラス型にキャストすることができます。
   ```cpp
   Base* b = new Derived();
   Derived* d = dynamic_cast<Derived*>(b);
   if (d) {
       std::cout << "Successful cast to Derived" << std::endl;
   }
   ```

### RTTIが無効化されるとどうなりますか？

RTTIが無効化されていると、以下の制約があります：
1. **`typeid` 演算子の使用不可**: `typeid` を使用するコードがコンパイルエラーになります。
2. **`dynamic_cast` 演算子の制限**: 基底クラスから派生クラスへのキャストがコンパイルエラーになります。ただし、ポインタに対する安全なキャストができないだけであり、参照に対するキャストも同様に失敗します。

### RTTIが生成されるライブラリに与える影響

RTTIを有効化すると、以下のような影響があります：
1. **バイナリサイズの増加**: 各クラスに対して型情報が付与されるため、生成されるバイナリのサイズが増加します。
2. **実行時オーバーヘッド**: 型情報のチェックが実行時に行われるため、わずかなオーバーヘッドが発生します。

一方、RTTIを無効化すると、これらのオーバーヘッドは回避されますが、前述のように型情報に関連する操作が制限されます。

### ライブラリ使用時におけるRTTIの影響

生成されたライブラリを使用する際に、RTTIの有無が次のように影響します：

1. **RTTIが有効なライブラリを使用する場合**：
   - RTTIを使用して型情報を取得したり、安全なキャストを行うことができます。
   - ライブラリとアプリケーションの両方でRTTIが有効である必要があります。片方だけRTTIを有効にすると、リンクエラーや実行時エラーが発生する可能性があります。

2. **RTTIが無効なライブラリを使用する場合**：
   - `typeid` や `dynamic_cast` が使用できません。
   - 通常の静的キャスト（`static_cast`）やリフレクション機能が不要な場合には問題ありません。

### まとめ

RTTIは、実行時にオブジェクトの型情報を取得し、安全にキャストするための重要な機能です。RTTIを有効にすると、便利な型情報の取得や安全なキャストが可能になりますが、バイナリサイズの増加や実行時オーバーヘッドが発生します。一方、RTTIを無効にすると、これらのオーバーヘッドは回避できますが、型情報を利用した機能が制限されます。RTTIの有無は、ライブラリの使用方法にも影響を与えるため、ライブラリとアプリケーションの両方で一致した設定を行うことが重要です。
:::

### 最適化設定
```gn
config("optimize") {
  ldflags = []
  if (is_win) {
    cflags = [
      "/O2",
      "/Zc:inline",
    ]
    if (skia_enable_optimize_size) {
      cflags += [ "/Os" ]
    }
    ldflags += [
      "/OPT:ICF",
      "/OPT:REF",
    ]
  } else {
    if (skia_enable_optimize_size) {
      cflags = [
        "-Oz",

        # We currently use bloaty 1.0 on the CI. Newer versions of Bloaty do not
        # seem to handle newer DWARF data as well.
        "-gdwarf-4",
      ]
      if (!is_android) {
        cflags += [
          # Clang 15 turns PIE (Position-indendendent Executable) on by default.
          "-fno-PIE",
          "-fno-pie",
        ]
        ldflags += [ "-nopie" ]
      }
    } else {
      cflags = [ "-O3" ]
    }
    if (is_mac || is_ios) {
      ldflags += [ "-dead_strip" ]
    } else if (!is_wasm) {
      cflags += [
        "-fdata-sections",
        "-ffunction-sections",
      ]
      ldflags += [ "-Wl,--gc-sections" ]
    }
  }
}
```
- **説明**:
  - **コンフィグ名**: `optimize`
  - **Windowsの場合**（`is_win` が `true`）:
    - `cflags`: 最適化フラグとして `/O2` と `/Zc:inline` を設定します。
    - `skia_enable_optimize_size` が `true` の場合、さらに `/Os` を追加します。
    - `ldflags`: リンカ最適化フラグとして `/OPT:ICF` と `/OPT:REF` を設定します。
  - **その他のプラットフォーム**:
    - `skia_enable_optimize_size` が `true` の場合、以下のフラグを設定します:
      - `cflags`: `-Oz`（サイズ最適化）、`-gdwarf-4`（DWARF 4デバッグ情報形式）
      - **非Androidの場合**:
        - `cflags`: `-fno-PIE`, `-fno-pie`（PIEを無効にする）
        - `ldflags`: `-nopie`
    - `skia_enable_optimize_size` が `false` の場合、`cflags` に `-O3` を設定します。
    - **macOSまたはiOSの場合**:
      - `ldflags`: `-dead_strip`（未使用コードの削除）
    - **WASM以外の場合**:
      - `cflags`: `-fdata-sections`, `-ffunction-sections`（データと関数をセクションに分ける）
      - `ldflags`: `-Wl,--gc-sections`（ガベージコレクションセクション）

### NDEBUGの設定
```gn
config("NDEBUG") {
  defines = [ "NDEBUG" ]
}
```
- **説明**:
  - **コンフィグ名**: `NDEBUG`
  - `defines` に `NDEBUG` を追加します。これにより、デバッグ用のアサートを無効にします。

### Trivial ABIの設定
```gn
config("trivial_abi") {
  if (is_clang) {
    defines = [ "SK_TRIVIAL_ABI=[[clang::trivial_abi]]" ]
  }
}
```
- **説明**:
  - **コンフィグ名**: `trivial_abi`
  - **条件**: Clangコンパイラを使用している場合（`is_clang` が `true`）
  - `defines` に `SK_TRIVIAL_ABI=[[clang::trivial_abi]]` を追加します。これにより、Clangの `trivial_abi` 属性を使用して、特定のABI（アプリケーションバイナリインターフェース）を指定します。

### 実行可能ファイルのリンカフラグ設定
```gn
config("executable") {
  if (is_android) {
    ldflags = [
      "-pie",
      "-rdynamic",
    ]
  } else if (is_mac) {
    ldflags = [ "-Wl,-rpath,@loader_path/." ]
  } else if (is_linux) {
    ldflags = [
      "-rdynamic",
      "-Wl,-rpath,\$ORIGIN",
    ]
  } else if (is_win) {
    ldflags = [
      "/SUBSYSTEM:CONSOLE",  # Quiet "no subsystem specified; CONSOLE assumed".
      "/INCREMENTAL:NO",  # Quiet warnings about failing to incrementally link
                          # by never trying to.
    ]
  }
}
```
- **説明**:
  - **コンフィグ名**: `executable`
  - **条件と設定内容**:
    - **Androidの場合**（`is_android` が `true`）:
      - `ldflags`: `-pie`（位置独立実行可能ファイル）、`-rdynamic`（すべてのシンボルを動的に解決可能にする）
    - **macOSの場合**（`is_mac` が `true`）:
      - `ldflags`: `-Wl,-rpath,@loader_path/.`（実行可能ファイルの場所にライブラリの検索パスを設定）
    - **Linuxの場合**（`is_linux` が `true`）:
      - `ldflags`: `-rdynamic`（すべてのシンボルを動的に解決可能にする）、`-Wl,-rpath,\$ORIGIN`（実行ファイルのディレクトリをライブラリ検索パスに追加）
    - **Windowsの場合**（`is_win` が `true`）:
      - `ldflags`: `/SUBSYSTEM:CONSOLE`（コンソールサブシステムを指定）、`/INCREMENTAL:NO`（増分リンクを無効にして警告を回避）

