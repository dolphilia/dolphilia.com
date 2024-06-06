# skia/gn/BUILDCONFIG.gn の解説

[[TOC]]

### 著作権とライセンス
```gn
# Copyright 2016 Google Inc.
#
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
```
- **説明**: この部分はファイルの著作権が2016年のGoogle Inc.にあり、BSDスタイルのライセンスに従うことを示しています。

### グローバルフラグの定義
```gn
is_skia_standalone = true

# It's best to keep the names and defaults of is_foo flags consistent with Chrome.
```
- **説明**:
  - `is_skia_standalone` を `true` に設定します。これはSkiaが独立したプロジェクトとしてビルドされることを示します。
  - フラグ名とデフォルト値をChromeと一致させることを推奨しています。

### ビルド引数の宣言（第一部）
```gn
declare_args() {
  is_official_build = false
  is_component_build = false
  ndk = ""

  # Android 5.0, Lollipop
  ndk_api = 21

  sanitize = ""

  ar = "ar"
  cc = "cc"
  cxx = "c++"

  win_sdk = "C:/Program Files (x86)/Windows Kits/10"
  win_sdk_version = ""

  win_vc = ""
  win_toolchain_version = ""

  clang_win = ""
  clang_win_version = ""

  ios_min_target = ""
  ios_use_simulator =
      target_os == "ios" && (target_cpu == "x86" || target_cpu == "x64")

  # Enable -H, which prints the include tree during compilation.
  # For use by external tools for analyzing include files.
  show_includes = false
}
```
- **説明**: ここでは、ビルドに関連するさまざまな引数を宣言しています。
  - `is_official_build`: 公式ビルドかどうかを示すフラグ。デフォルトは `false`。
  - `is_component_build`: コンポーネントビルドかどうかを示すフラグ。デフォルトは `false`。
  - `ndk`: Android NDKのパス。
  - `ndk_api`: 使用するNDKのAPIレベル。デフォルトは21（Android 5.0, Lollipop）。
  - `sanitize`: サニタイザーの種類。
  - `ar`: アーカイブツールの名前。デフォルトは `"ar"`。
  - `cc`: Cコンパイラの名前。デフォルトは `"cc"`。
  - `cxx`: C++コンパイラの名前。デフォルトは `"c++"`。
  - `win_sdk`: Windows SDKのパス。
  - `win_sdk_version`: Windows SDKのバージョン。
  - `win_vc`: Visual C++のパス。
  - `win_toolchain_version`: Visual C++ツールチェインのバージョン。
  - `clang_win`: Windows用Clangのパス。
  - `clang_win_version`: Windows用Clangのバージョン。
  - `ios_min_target`: iOSの最小ターゲットバージョン。
  - `ios_use_simulator`: iOSシミュレータを使用するかどうかを示すフラグ。`target_os` が `ios` かつ `target_cpu` が `x86` または `x64` の場合に `true`。
  - `show_includes`: コンパイル時にインクルードツリーを表示するかどうかを示すフラグ。デフォルトは `false`。

### ビルド引数の宣言（第二部）
```gn
declare_args() {
  is_debug = !is_official_build

  # This affects Skia's ABI; must be set consistently for Skia and dependents.
  is_trivial_abi = !is_official_build
}
```
- **説明**: ここでは追加のビルド引数を宣言しています。
  - `is_debug`: デバッグビルドかどうかを示すフラグ。`is_official_build` が `false` の場合に `true` になります。
  - `is_trivial_abi`: Trivial ABIを使用するかどうかを示すフラグ。`is_official_build` が `false` の場合に `true` になります。この設定はSkiaのABIに影響を与え、Skiaとその依存関係で一貫して設定する必要があります。

### デバッグビルドと公式ビルドの矛盾チェック
```gn
assert(!(is_debug && is_official_build))
```
- **説明**: デバッグビルドと公式ビルドが同時に設定されていないことを確認します。両方が同時に `true` になることは許容されません。

### WebAssemblyターゲットの設定
```gn
if (target_cpu == "wasm") {
  target_os = "wasm"
}
```
- **説明**: `target_cpu` が `"wasm"` の場合、`target_os` を `"wasm"` に設定します。

### プラットフォームの検出
```gn
if (target_os == "") {
  target_os = host_os
  if (ndk != "") {
    target_os = "android"
  }
}
if (current_os == "") {
  current_os = target_os
}
```
- **説明**:
  - `target_os` が空の場合、`host_os` を `target_os` に設定します。
  - さらに、`ndk` が設定されている場合、`target_os` を `"android"` に設定します。
  - `current_os` が空の場合、`current_os` を `target_os` に設定します。

### プラットフォームのフラグ設定
```gn
is_android = current_os == "android"
is_fuchsia = current_os == "fuchsia"
is_ios = current_os == "ios" || current_os == "tvos"
is_tvos = current_os == "tvos"
is_linux = current_os == "linux"
is_mac = current_os == "mac"
is_wasm = current_os == "wasm"
is_win = current_os == "win"
```
- **説明**: `current_os` に基づいて各プラットフォームのフラグを設定します。
  - `is_android`: `current_os` が `"android"` の場合に `true`。
  - `is_fuchsia`: `current_os` が `"fuchsia"` の場合に `true`。
  - `is_ios`: `current_os` が `"ios"` または `"tvos"` の場合に `true`。
  - `is_tvos`: `current_os` が `"tvos"` の場合に `true`。
  - `is_linux`: `current_os` が `"linux"` の場合に `true`。
  - `is_mac`: `current_os` が `"mac"` の場合に `true`。
  - `is_wasm`: `current_os` が `"wasm"` の場合に `true`。
  - `is_win`: `current_os` が `"win"` の場合に `true`。

### ChromeOSおよびAppleプラットフォームの設定
```gn
# This is just to make the Dawn build files happy. Skia itself uses target_os = "linux"
# for ChromeOS, so this variable will not affect Skia proper.
is_chromeos = false

# This is to make the ANGLE build files happy. Skia always uses is_mac and/or is_ios.
is_apple = is_mac || is_ios
```
- **説明**:
  - `is_chromeos`: `false` に設定。これはDawnのビルドファイルのために存在しますが、Skia自体には影響しません。
  - `is_apple`: `is_mac` または `is_ios` が `true` の場合に `true`。これはANGLEのビルドファイルのために存在します。

### ターゲットCPUの設定
```gn
if (target_cpu == "") {
  target_cpu = host_cpu
  if (is_android || is_ios) {
    target_cpu = "arm64"
  }
}
if (target_cpu == "x86_64") {
  target_cpu = "x64"
}
if (current_cpu == "") {
  current_cpu = target_cpu
}
```
- **説明**:
  - `target_cpu` が空の場合、`host_cpu` を `target_cpu` に設定します。
  - さらに、`is_android` または `is_ios` が `true` の場合、`target_cpu` を `"arm64"` に設定します。
  - `target_cpu` が `"x86_64"` の場合、`target_cpu` を `"x64"` に設定します。
  - `current_cpu` が空の場合、`current_cpu` を `target_cpu` に設定します。

### Clangコンパイラの判定
```gn
is_clang = is_android || is_ios || is_mac || is_fuchsia || is_wasm ||
           (cc == "clang" && cxx == "clang++") || clang_win != ""
if (!is_clang && !is_win) {
  is_clang = exec_script("//gn/is_clang.py",
                         [
                           cc,
                           cxx,
                         ],
                         "value")
}
```
- **説明**:
  - `is_clang` は、以下のいずれかの条件が満たされた場合に `true` になります:
    - `is_android`, `is_ios`, `is_mac`, `is_fuchsia`, `is_wasm` のいずれかが `true`
    - `cc` が `"clang"` で `cxx` が `"clang++"`
    - `clang_win` が空でない
  - これらの条件に当てはまらず、かつ `is_win` でもない場合、スクリプト `is_clang.py` を実行して `cc` と `cxx` を引数に渡し、Clangコンパイラであるかを判定します。

### Android NDKの設定
```gn
if (is_android) {
  ndk_host = ""
  ndk_target = ""

  if (host_os == "linux") {
    ndk_host = "linux-x86_64"
  } else if (host_os == "mac") {
    ndk_host = "darwin-x86_64"
  } else if (host_os == "win") {
    ndk_host = "windows-x86_64"
  }

  if (target_cpu == "arm64") {
    ndk_target = "aarch64-linux-android"
  } else if (target_cpu == "arm") {
    ndk_target = "armv7a-linux-androideabi"
  } else if (target_cpu == "x64") {
    ndk_target = "x86_64-linux-android"
  } else if (target_cpu == "x86") {
    ndk_target = "i686-linux-android"
  }
}
```
- **説明**:
  - `is_android` が `true` の場合、Android NDKのホストシステムおよびターゲットシステムを設定します。
  - `host_os` に基づいて `ndk_host` を設定します:
    - Linux: `"linux-x86_64"`
    - macOS: `"darwin-x86_64"`
    - Windows: `"windows-x86_64"`
  - `target_cpu` に基づいて `ndk_target` を設定します:
    - `arm64`: `"aarch64-linux-android"`
    - `arm`: `"armv7a-linux-androideabi"`
    - `x64`: `"x86_64-linux-android"`
    - `x86`: `"i686-linux-android"`

### Windows用MSVCコンパイラの検出
```gn
if (target_os == "win") {
  # By default we look for 2017 (Enterprise, Pro, and Community), then 2015. If MSVC is installed in a
  # non-default location, you can set win_vc to inform us where it is.

  if (win_vc == "") {
    win_vc = exec_script("//gn/find_msvc.py", [], "trim string")
  }
  assert(win_vc != "")  # Could not find VC installation. Set win_vc to your VC
                        # directory.
}
```
- **説明**:
  - `target_os` が `"win"` の場合、MSVCコンパイラのインストール場所を検出します。
  - デフォルトでは、Visual Studio 2017（Enterprise、Pro、Community）の順に探し、それが見つからなければ2015を探します。MSVCがデフォルト以外の場所にインストールされている場合は、`win_vc` を設定して場所を指定できます。
  - `win_vc` が空の場合、スクリプト `find_msvc.py` を実行してMSVCのインストール場所を取得します。
  - `win_vc` が空でないことを確認するために `assert` を使用し、空の場合はエラーメッセージを出力します。

### Windowsプラットフォームの設定
```gn
if (target_os == "win") {
```
- **説明**: この部分は、ターゲットOSがWindowsである場合にのみ実行される設定を含んでいます。

### Visual Studioツールチェインのバージョン設定
```gn
  if (win_toolchain_version == "") {
    win_toolchain_version = exec_script("//gn/highest_version_dir.py",
                                        [
                                          "$win_vc/Tools/MSVC",
                                          "[0-9]{2}\.[0-9]{2}\.[0-9]{5}",
                                        ],
                                        "trim string")
  }
```
- **説明**:
  - `win_toolchain_version` が空の場合、スクリプト `highest_version_dir.py` を実行して、Visual Studioツールチェインのバージョンを取得します。
  - スクリプトには、`$win_vc/Tools/MSVC` ディレクトリと、バージョン形式を指定する正規表現 `[0-9]{2}\.[0-9]{2}\.[0-9]{5}` を渡します。
  - 結果を `trim string` 形式で返し、`win_toolchain_version` に設定します。

### Windows SDKのバージョン設定
```gn
  if (win_sdk_version == "") {
    win_sdk_version = exec_script("//gn/highest_version_dir.py",
                                  [
                                    "$win_sdk/Include",
                                    "[0-9]{2}\.[0-9]\.[0-9]{5}\.[0-9]",
                                  ],
                                  "trim string")
  }
```
- **説明**:
  - `win_sdk_version` が空の場合、スクリプト `highest_version_dir.py` を実行して、Windows SDKのバージョンを取得します。
  - スクリプトには、`$win_sdk/Include` ディレクトリと、バージョン形式を指定する正規表現 `[0-9]{2}\.[0-9]\.[0-9]{5}\.[0-9]` を渡します。
  - 結果を `trim string` 形式で返し、`win_sdk_version` に設定します。

### Clang for Windowsのバージョン設定
```gn
  if (clang_win != "" && clang_win_version == "") {
    clang_win_version = exec_script("//gn/highest_version_dir.py",
                                    [
                                      "$clang_win/lib/clang",
                                      "[0-9]+\.[0-9]+\.[0-9]+",
                                    ],
                                    "trim string")
  }
}
```
- **説明**:
  - `clang_win` が空でなく、かつ `clang_win_version` が空の場合、スクリプト `highest_version_dir.py` を実行して、Clang for Windowsのバージョンを取得します。
  - スクリプトには、`$clang_win/lib/clang` ディレクトリと、バージョン形式を指定する正規表現 `[0-9]+\.[0-9]+\.[0-9]+` を渡します。
  - 結果を `trim string` 形式で返し、`clang_win_version` に設定します。

### 全体の流れ
- この設定は、Windows環境でのビルドに必要なツールチェインとSDKのバージョンを自動的に検出し、設定することを目的としています。これにより、開発者は特定のバージョンを手動で設定する手間を省くことができます。
- `highest_version_dir.py` スクリプトは、指定されたディレクトリ内で最も高いバージョン番号を持つサブディレクトリを検索し、その名前を返すように設計されています。

### コンポーネントの定義
```gn
# A component is either a static or a shared library.
template("component") {
  _component_mode = "static_library"
  if (is_component_build) {
    _component_mode = "shared_library"
  }

  target(_component_mode, target_name) {
    forward_variables_from(invoker, "*")
  }
}
```
- **説明**:
  - **テンプレート名**: `component`
  - **目的**: コンポーネントは静的ライブラリまたは共有ライブラリとして定義されます。
  - **条件**: `is_component_build` が `true` の場合、`_component_mode` を `"shared_library"` に設定し、それ以外の場合は `"static_library"` に設定します。
  - **ターゲットの定義**: `_component_mode` に基づいてターゲットを定義し、`invoker` からすべての変数を引き継ぎます。

### デフォルトコンフィグの定義
```gn
# Default configs
default_configs = [
  "//gn/skia:default",
  "//gn/skia:no_exceptions",
  "//gn/skia:no_rtti",
]
if (!is_debug) {
  default_configs += [
    "//gn/skia:optimize",
    "//gn/skia:NDEBUG",
  ]
}
if (is_trivial_abi) {
  default_configs += [ "//gn/skia:trivial_abi" ]
}
if (!is_official_build) {
  default_configs += [ "//gn/skia:debug_symbols" ]
}
default_configs += [ "//gn/skia:extra_flags" ]
```
- **説明**:
  - **基本コンフィグ**:
    - `"//gn/skia:default"`
    - `"//gn/skia:no_exceptions"`
    - `"//gn/skia:no_rtti"`
  - **追加コンフィグ**:
    - `!is_debug` の場合: `"//gn/skia:optimize"` と `"//gn/skia:NDEBUG"`
    - `is_trivial_abi` の場合: `"//gn/skia:trivial_abi"`
    - `!is_official_build` の場合: `"//gn/skia:debug_symbols"`
  - **共通コンフィグ**: `"//gn/skia:extra_flags"`

### ターゲットごとのデフォルト設定
```gn
set_defaults("executable") {
  configs = [ "//gn/skia:executable" ] + default_configs
}

set_defaults("source_set") {
  configs = default_configs
}

set_defaults("static_library") {
  configs = default_configs
}

set_defaults("shared_library") {
  configs = default_configs
}

set_defaults("component") {
  configs = default_configs
  if (!is_component_build) {
    complete_static_lib = true
  }
}
```
- **説明**:
  - **`executable` ターゲット**:
    - `configs` に `"//gn/skia:executable"` と `default_configs` を設定。
  - **`source_set` ターゲット**:
    - `configs` に `default_configs` を設定。
  - **`static_library` ターゲット**:
    - `configs` に `default_configs` を設定。
  - **`shared_library` ターゲット**:
    - `configs` に `default_configs` を設定。
  - **`component` ターゲット**:
    - `configs` に `default_configs` を設定。
    - `is_component_build` が `false` の場合、`complete_static_lib` を `true` に設定。

### Skiaのデフォルトコンフィグ設定
```gn
skia_target_default_configs = []
if (!is_official_build) {
  skia_target_default_configs += [ "//gn/skia:warnings" ]
}
```
- **説明**:
  - `skia_target_default_configs` は、Skiaのターゲットに適用されるデフォルトのビルドコンフィグのリストです。
  - `is_official_build` が `false` の場合、デフォルトの警告設定 `//gn/skia:warnings` を追加します。

### Skiaのヘッダ用デフォルトコンフィグ設定
```gn
skia_header_target_default_configs = []
if (!is_official_build) {
  skia_header_target_default_configs +=
      [ "//gn/skia:warnings_for_public_headers" ]
}
```
- **説明**:
  - `skia_header_target_default_configs` は、Skiaの公開ヘッダに適用されるデフォルトのビルドコンフィグのリストです。
  - `is_official_build` が `false` の場合、公開ヘッダ用の警告設定 `//gn/skia:warnings_for_public_headers` を追加します。

### ツールチェインの設定
```gn
if (is_win) {
  # Windows tool chain
  set_default_toolchain("//gn/toolchain:msvc")
  default_toolchain_name = "msvc"
  host_toolchain = "msvc_host"
} else if (is_wasm) {
  set_default_toolchain("//gn/toolchain:wasm")
  default_toolchain_name = "wasm"
  host_toolchain = "wasm"
} else {
  # GCC-like toolchains, including Clang.
  set_default_toolchain("//gn/toolchain:gcc_like")
  default_toolchain_name = "gcc_like"
  host_toolchain = "gcc_like_host"
}
```
- **説明**:
  - **Windowsの場合**（`is_win` が `true`）:
    - デフォルトのツールチェインを `//gn/toolchain:msvc` に設定します。
    - `default_toolchain_name` を `"msvc"` に設定します。
    - `host_toolchain` を `"msvc_host"` に設定します。
  - **WebAssemblyの場合**（`is_wasm` が `true`）:
    - デフォルトのツールチェインを `//gn/toolchain:wasm` に設定します。
    - `default_toolchain_name` を `"wasm"` に設定します。
    - `host_toolchain` を `"wasm"` に設定します。
  - **その他のプラットフォーム**:
    - デフォルトのツールチェインを `//gn/toolchain:gcc_like` に設定します。
    - `default_toolchain_name` を `"gcc_like"` に設定します。
    - `host_toolchain` を `"gcc_like_host"` に設定します。
