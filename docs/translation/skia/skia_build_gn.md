# skia/BUILD.gn の解説

[[TOC]]

### 著作権情報とライセンス
```gn
# Copyright 2016 Google Inc.
#
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
```
このコードブロックは、ファイルの著作権情報とライセンスの情報を示しています。

### インポートセクション
```gn
import("gn/flutter_defines.gni")
import("gn/fuchsia_defines.gni")
import("gn/shared_sources.gni")
import("gn/skia.gni")
import("gn/toolchain/wasm.gni")
```
必要な定義や設定ファイルをインポートします。

### Fuchsia SDKのインポート
```gn
if (is_fuchsia) {
  import("//build/fuchsia/sdk.gni")
  import("build/fuchsia/fuchsia_download_sdk.gni")
}
```
Fuchsiaプラットフォーム向けのSDKをインポートします。

### Dawnライブラリのインポート
```gn
if (skia_use_dawn) {
  import("//third_party/externals/dawn/scripts/dawn_features.gni")
}
```
Dawnライブラリを使用する場合、その定義をインポートします。

### カスタム設定のインポート
```gn
if (defined(skia_settings)) {
  import(skia_settings)
}
```
カスタム設定が定義されている場合、それをインポートします。

### iOS設定のインポート
```gn
import("gn/ios.gni")
```
iOS向けの設定をインポートします。

### Skia Public APIの設定
```gn
config("skia_public") {
  include_dirs = [ "." ]

  defines = [ "SK_DISABLE_LEGACY_VULKAN_MUTABLE_TEXTURE_STATE" ]
  cflags_objcc = []
  if (is_component_build) {
    defines += [ "SKIA_DLL" ]
  }
  if (is_fuchsia || is_linux) {
    defines += [ "SK_R32_SHIFT=16" ]
  }
  if (skia_enable_flutter_defines) {
    defines += flutter_defines
  }
  if (skia_enable_optimize_size) {
    defines += [ "SK_ENABLE_OPTIMIZE_SIZE" ]
  }
  if (skia_enable_precompile) {
    defines += [ "SK_ENABLE_PRECOMPILE" ]
  }
  if (skia_enable_sksl_tracing) {
    defines += [ "SKSL_ENABLE_TRACING" ]
  }
  if (is_fuchsia) {
    defines += fuchsia_defines
  }
  if (is_wasm) {
    defines += wasm_defines
  }
  if (skia_gl_standard == "gles") {
    defines += [ "SK_ASSUME_GL_ES=1" ]
  } else if (skia_gl_standard == "gl") {
    defines += [ "SK_ASSUME_GL=1" ]
  } else if (skia_gl_standard == "webgl") {
    defines += [
      "SK_ASSUME_WEBGL=1",
      "SK_USE_WEBGL",
    ]
  }
  if (skia_enable_ganesh) {
    defines += [ "SK_GANESH" ]
  }
  if (skia_enable_graphite) {
    defines += [ "SK_GRAPHITE" ]
  }
  if (skia_disable_tracing) {
    defines += [ "SK_DISABLE_TRACING" ]
  }
  if (skia_use_perfetto) {
    defines += [ "SK_USE_PERFETTO" ]
  }
  if (skia_use_safe_libcxx) {
    defines += [ "_LIBCPP_ENABLE_ASSERTIONS=1" ]
  }

  if (is_mac || is_ios) {
    if (skia_enable_api_available_macro) {
      defines += [ "SK_ENABLE_API_AVAILABLE" ]
    } else {
      cflags_objcc += [ "-Wno-unguarded-availability" ]
    }
  }
}
```
SkiaのパブリックAPIに関連する設定を定義します。様々なプラットフォームや機能に応じてコンパイルオプションや定義を追加しています。

### Skia Private APIの設定
```gn
config("skia_private") {
  visibility = [ "./*" ]

  defines = [ "SK_GAMMA_APPLY_TO_A8" ]
  if (skia_use_fixed_gamma_text) {
    defines += [
      "SK_GAMMA_EXPONENT=1.4",
      "SK_GAMMA_CONTRAST=0.0",
    ]
  }
  if (is_skia_dev_build && !is_wasm) {
    defines += [
      "SK_ALLOW_STATIC_GLOBAL_INITIALIZERS=1",
      "GR_TEST_UTILS=1",
    ]
    if (skia_enable_graphite) {
      defines += [ "GRAPHITE_TEST_UTILS=1" ]
    }
  }
  libs = []
  lib_dirs = []
  if (skia_use_gl && skia_use_angle) {
    defines += [ "SK_ANGLE" ]
  }
  if (skia_use_vma) {
    defines += [ "SK_USE_VMA" ]
  }
  if (skia_enable_winuwp) {
    defines += [ "SK_WINUWP" ]
  }
  if (skia_print_sksl_shaders) {
    defines += [ "SK_PRINT_SKSL_SHADERS" ]
  }
  if (skia_print_native_shaders) {
    defines += [ "SK_PRINT_NATIVE_SHADERS" ]
  }

  defines += [ "SK_ENABLE_AVX512_OPTS" ]
}
```
Skiaの内部APIに関連する設定を定義します。開発ビルドや特定の機能に応じた定義を追加しています。

### Skiaライブラリの設定
```gn
config("skia_library") {
  visibility = [ "./*" ]
  defines = [ "SKIA_IMPLEMENTATION=1" ]
}
```
Skiaライブラリに関連する設定を定義します。

### Skiaライブラリの設定をまとめたリスト
```gn
skia_library_configs = [
  ":skia_public",
  ":skia_private",
  ":skia_library",
]
```
Skiaライブラリの設定を一つのリストにまとめています。

### CPU特化のSkiaコード用テンプレート
```gn
template("opts") {
  if (invoker.enabled) {
    skia_source_set(target_name) {
      visibility = [ ":*" ]
      check_includes = false
      configs = skia_library_configs
      forward_variables_from(invoker, "*")
      if (defined(invoker.configs)) {
        configs += invoker.configs
      }
    }
  } else {
    skia_source_set(target_name) {
      visibility = [ ":*" ]
      check_includes = false
      forward_variables_from(invoker,
                             "*",
                             [
                               "sources",
                               "cflags",
                             ])
    }
  }
}
```
CPU特化のSkiaコードをビルドするためのテンプレートを定義します。有効化されている場合、特定の設定を適用し、無効化されている場合は空のターゲットを作成します。

### プラットフォームの確認と最適化オプションの設定

```gn
is_x86 = current_cpu == "x64" || current_cpu == "x86"
```
`is_x86`変数は、現在のCPUアーキテクチャがx64またはx86であるかどうかを確認しています。

### Haswell向けの最適化設定
```gn
opts("hsw") {
  enabled = is_x86
  sources = skia_opts.hsw_sources
  if (is_win) {
    cflags = [ "/arch:AVX2" ]
  } else {
    cflags = [ "-march=haswell" ]
  }
}
```
このブロックは、Haswellアーキテクチャ向けの最適化設定を定義しています。x86アーキテクチャの場合、有効化されます。Windowsプラットフォームでは`/arch:AVX2`、それ以外のプラットフォームでは`-march=haswell`フラグを使用します。

### Skylake向けの最適化設定
```gn
opts("skx") {
  enabled = is_x86
  sources = skia_opts.skx_sources
  if (is_win) {
    cflags = [ "/arch:AVX512" ]
  } else {
    cflags = [ "-march=skylake-avx512" ]
  }
}
```
このブロックは、Skylakeアーキテクチャ向けの最適化設定を定義しています。x86アーキテクチャの場合、有効化されます。Windowsプラットフォームでは`/arch:AVX512`、それ以外のプラットフォームでは`-march=skylake-avx512`フラグを使用します。

### オプション機能のテンプレート
```gn
template("optional") {
  if (invoker.enabled) {
    config(target_name + "_public") {
      if (defined(invoker.public_defines)) {
        defines = invoker.public_defines
      }
      if (defined(invoker.public_configs)) {
        configs = invoker.public_configs
      }
      if (defined(invoker.public_include_dirs)) {
        include_dirs = invoker.public_include_dirs
      }
    }
    skia_source_set(target_name) {
      visibility = [ ":*" ]
      check_includes = false
      configs = skia_library_configs

      forward_variables_from(invoker,
                             "*",
                             [
                               "configs",
                               "public_defines",
                               "sources_for_tests",
                               "sources_when_disabled",
                             ])
      if (defined(invoker.configs)) {
        configs += invoker.configs
      }
      all_dependent_configs = [ ":" + target_name + "_public" ]
    }
    if (defined(invoker.sources_for_tests) && skia_enable_tools) {
      skia_source_set(target_name + "_tests") {
        visibility = [ ":*" ]
        check_includes = false
        configs = skia_library_configs

        forward_variables_from(invoker,
                               "*",
                               [
                                 "configs",
                                 "public_defines",
                                 "sources",
                                 "sources_for_tests",
                                 "sources_when_disabled",
                               ])
        if (defined(invoker.configs)) {
          configs += invoker.configs
        }
        testonly = true
        sources = invoker.sources_for_tests
        if (!defined(deps)) {
          deps = []
        }
        deps += [ ":test" ]
        all_dependent_configs = [ ":" + target_name + "_public" ]
      }
    }
  } else {
    skia_source_set(target_name) {
      visibility = [ ":*" ]
      configs = skia_library_configs

      forward_variables_from(invoker,
                             "*",
                             [
                               "configs",
                               "public",
                               "public_defines",
                               "public_deps",
                               "deps",
                               "libs",
                               "frameworks",
                               "sources",
                               "sources_for_tests",
                               "sources_when_disabled",
                             ])
      if (defined(invoker.configs)) {
        configs += invoker.configs
      }
      if (defined(invoker.sources_when_disabled)) {
        sources = invoker.sources_when_disabled
      }
    }
    if (defined(invoker.sources_for_tests)) {
      skia_source_set(target_name + "_tests") {
        visibility = [ ":*" ]
      }
    }
  }
}
```
このテンプレートは、Skiaのオプション機能を定義するためのものです。`enabled`が有効である場合、公開設定やソースセットを定義し、テスト用のソースセットも設定します。`enabled`が無効である場合、空のターゲットを作成し、必要な変数を転送します。

### Androidユーティリティのオプション設定
```gn
optional("android_utils") {
  enabled = skia_enable_android_utils

  public = [
    "client_utils/android/BRDAllocator.h",
    "client_utils/android/BitmapRegionDecoder.h",
    "client_utils/android/FrontBufferedStream.h",
  ]
  public_defines = [ "SK_ENABLE_ANDROID_UTILS" ]
  sources = [
    "client_utils/android/BitmapRegionDecoder.cpp",
    "client_utils/android/FrontBufferedStream.cpp",
  ]
}
```
このブロックは、Android向けのユーティリティ機能をオプションとして定義しています。`skia_enable_android_utils`が有効である場合、Androidユーティリティ関連のヘッダーファイルやソースファイルを公開し、`SK_ENABLE_ANDROID_UTILS`定義を追加します。


### Android用フォントマネージャーのオプション設定
```gn
optional("fontmgr_android") {
  enabled = skia_enable_fontmgr_android

  deps = [
    ":typeface_freetype",
    "//third_party/expat",
  ]
  public_defines = [ "SK_FONTMGR_ANDROID_AVAILABLE" ]
  public = [ "include/ports/SkFontMgr_android.h" ]
  sources = [
    "src/ports/SkFontMgr_android.cpp",
    "src/ports/SkFontMgr_android_parser.cpp",
    "src/ports/SkFontMgr_android_parser.h",
  ]
  sources_for_tests = [ "tests/FontMgrAndroidParserTest.cpp" ]
}
```
このオプションは、Android用のフォントマネージャーを有効化します。必要な依存関係として、FreeTypeとexpatライブラリが指定されています。関連するヘッダーファイルやソースファイルが定義され、テスト用のソースファイルも含まれています。

### カスタムフォントマネージャーのオプション設定
```gn
optional("fontmgr_custom") {
  enabled =
      skia_enable_fontmgr_custom_directory ||
      skia_enable_fontmgr_custom_embedded || skia_enable_fontmgr_custom_empty

  deps = [ ":typeface_freetype" ]
  public = [ "src/ports/SkFontMgr_custom.h" ]
  sources = [ "src/ports/SkFontMgr_custom.cpp" ]
}
```
このオプションは、カスタムフォントマネージャーを有効化します。ディレクトリ、埋め込み、空のいずれかのカスタムフォントマネージャーが有効な場合に適用されます。依存関係としてFreeTypeライブラリが指定されています。

### カスタムディレクトリフォントマネージャーのオプション設定
```gn
optional("fontmgr_custom_directory") {
  enabled = skia_enable_fontmgr_custom_directory
  public_defines = [ "SK_FONTMGR_FREETYPE_DIRECTORY_AVAILABLE" ]
  deps = [
    ":fontmgr_custom",
    ":typeface_freetype",
  ]
  public = [ "include/ports/SkFontMgr_directory.h" ]
  sources = [ "src/ports/SkFontMgr_custom_directory.cpp" ]
}
```
このオプションは、カスタムディレクトリフォントマネージャーを有効化します。関連するヘッダーファイルとソースファイルが定義されています。

### カスタム埋め込みフォントマネージャーのオプション設定
```gn
optional("fontmgr_custom_embedded") {
  enabled = skia_enable_fontmgr_custom_embedded
  public_defines = [ "SK_FONTMGR_FREETYPE_EMBEDDED_AVAILABLE" ]
  deps = [
    ":fontmgr_custom",
    ":typeface_freetype",
  ]
  sources = [ "src/ports/SkFontMgr_custom_embedded.cpp" ]
}
```
このオプションは、カスタム埋め込みフォントマネージャーを有効化します。関連するソースファイルが定義されています。

### カスタム空フォントマネージャーのオプション設定
```gn
optional("fontmgr_custom_empty") {
  enabled = skia_enable_fontmgr_custom_empty
  public_defines = [ "SK_FONTMGR_FREETYPE_EMPTY_AVAILABLE" ]
  deps = [
    ":fontmgr_custom",
    ":typeface_freetype",
  ]
  public = [ "include/ports/SkFontMgr_empty.h" ]
  sources = [ "src/ports/SkFontMgr_custom_empty.cpp" ]
}
```
このオプションは、カスタム空フォントマネージャーを有効化します。関連するヘッダーファイルとソースファイルが定義されています。

### Fontconfigフォントマネージャーのオプション設定
```gn
optional("fontmgr_fontconfig") {
  enabled = skia_enable_fontmgr_fontconfig
  public_defines = [ "SK_FONTMGR_FONTCONFIG_AVAILABLE" ]

  public_deps = [ "//third_party:fontconfig" ]
  public = [ "include/ports/SkFontMgr_fontconfig.h" ]
  deps = [ ":typeface_freetype" ]
  sources = [ "src/ports/SkFontMgr_fontconfig.cpp" ]
  sources_for_tests = [ "tests/FontMgrFontConfigTest.cpp" ]
}
```
このオプションは、Fontconfigフォントマネージャーを有効化します。Fontconfigライブラリに依存しており、関連するヘッダーファイル、ソースファイル、テストファイルが定義されています。

### FontConfigInterfaceフォントマネージャーのオプション設定
```gn
optional("fontmgr_FontConfigInterface") {
  enabled = skia_enable_fontmgr_FontConfigInterface

  deps = [
    ":typeface_freetype",
    "//third_party:fontconfig",
  ]
  public = [
    "include/ports/SkFontConfigInterface.h",
    "include/ports/SkFontMgr_FontConfigInterface.h",
  ]
  sources = [
    "src/ports/SkFontConfigInterface.cpp",
    "src/ports/SkFontConfigInterface_direct.cpp",
    "src/ports/SkFontConfigInterface_direct_factory.cpp",
    "src/ports/SkFontConfigTypeface.h",
    "src/ports/SkFontMgr_FontConfigInterface.cpp",
  ]
  sources_for_tests = [ "tests/FCITest.cpp" ]
}
```
このオプションは、FontConfigInterfaceフォントマネージャーを有効化します。Fontconfigライブラリに依存しており、関連するヘッダーファイル、ソースファイル、テストファイルが定義されています。

### Fuchsia用フォントマネージャーのオプション設定
```gn
optional("fontmgr_fuchsia") {
  enabled = skia_enable_fontmgr_fuchsia
  public_defines = [ "SK_FONTMGR_FUCHSIA_AVAILABLE" ]
  deps = []

  if (is_fuchsia && using_fuchsia_sdk) {
    deps += [ "//build/fuchsia/fidl:fuchsia.fonts" ]
  } else {
    deps = [ "//sdk/fidl/fuchsia.fonts" ]
  }
  public = [ "src/ports/SkFontMgr_fuchsia.h" ]
  sources = [ "src/ports/SkFontMgr_fuchsia.cpp" ]
}
```
このオプションは、Fuchsia用のフォントマネージャーを有効化します。Fuchsia SDKに依存しており、関連するヘッダーファイルとソースファイルが定義されています。

### Mac用CoreTextフォントマネージャーのオプション設定
```gn
optional("fontmgr_mac_ct") {
  enabled = skia_use_fonthost_mac

  public_defines = [
    "SK_TYPEFACE_FACTORY_CORETEXT",
    "SK_FONTMGR_CORETEXT_AVAILABLE",
  ]
  public = [
    "include/ports/SkFontMgr_mac_ct.h",
    "include/ports/SkTypeface_mac.h",
  ]
  sources = [
    "src/ports/SkFontMgr_mac_ct.cpp",
    "src/ports/SkScalerContext_mac_ct.cpp",
    "src/ports/SkScalerContext_mac_ct.h",
    "src/ports/SkTypeface_mac_ct.cpp",
    "src/ports/SkTypeface_mac_ct.h",
  ]
  sources_for_tests = [ "tests/TypefaceMacTest.cpp" ]

  if (is_mac) {
    frameworks = [
      "AppKit.framework",
      "ApplicationServices.framework",
    ]
  }

  if (is_ios) {
    frameworks = [
      "CoreFoundation.framework",
      "CoreGraphics.framework",
      "CoreText.framework",
      "UIKit.framework",
    ]
  }
}
```
このオプションは、Mac用のCoreTextフォントマネージャーを有効化します。関連するフレームワーク、ヘッダーファイル、ソースファイル、テストファイルが定義されています。MacおよびiOSプラットフォーム向けの特定のフレームワークが追加されています。

このSkiaのBUILD.gnファイルのコードは、Windows用のフォントマネージャー機能や、SKSL（Skia Shading Language）関連の設定を定義しています。以下に、このコードの日本語での解説を行います。

### Windows用フォントマネージャーのオプション設定
```gn
optional("fontmgr_win") {
  enabled = skia_enable_fontmgr_win

  public_defines = [
    "SK_TYPEFACE_FACTORY_DIRECTWRITE",
    "SK_FONTMGR_DIRECTWRITE_AVAILABLE",
  ]
  public = [ "include/ports/SkTypeface_win.h" ]
  sources = [
    "include/ports/SkFontMgr_indirect.h",
    "include/ports/SkRemotableFontMgr.h",
    "src/fonts/SkFontMgr_indirect.cpp",
    "src/ports/SkFontMgr_win_dw.cpp",
    "src/ports/SkScalerContext_win_dw.cpp",
    "src/ports/SkScalerContext_win_dw.h",
    "src/ports/SkTypeface_win_dw.cpp",
    "src/ports/SkTypeface_win_dw.h",
  ]
  if (skia_dwritecore_sdk != "") {
    defines = [ "DWRITE_CORE" ]
    if (is_win && is_clang) {
      cflags = [
        "-imsvc",
        "${skia_dwritecore_sdk}/include",
      ]
    } else {
      include_dirs = [ "${skia_dwritecore_sdk}/include" ]
    }
  }
}
```
このオプションは、Windows用のフォントマネージャーを有効化します。`skia_enable_fontmgr_win`が有効である場合に適用されます。DirectWriteを使用するための定義が追加され、関連するヘッダーファイルとソースファイルが指定されています。また、`skia_dwritecore_sdk`が指定されている場合、追加のインクルードディレクトリやコンパイルフラグが設定されます。

### Windows用GDIフォントマネージャーのオプション設定
```gn
optional("fontmgr_win_gdi") {
  enabled = skia_enable_fontmgr_win_gdi
  public_defines = [ "SK_FONTMGR_GDI_AVAILABLE" ]
  public = [ "include/ports/SkTypeface_win.h" ]
  sources = [ "src/ports/SkFontHost_win.cpp" ]
  libs = [ "Gdi32.lib" ]
}
```
このオプションは、Windows用のGDIフォントマネージャーを有効化します。`skia_enable_fontmgr_win_gdi`が有効である場合に適用され、GDI関連のヘッダーファイル、ソースファイル、ライブラリが指定されています。

### SKSL（Skia Shading Language）のlexファイルを生成する設定
```gn
if (skia_lex) {
  skia_executable("sksllex") {
    sources = [
      "src/sksl/lex/DFA.h",
      "src/sksl/lex/DFAState.h",
      "src/sksl/lex/LexUtil.h",
      "src/sksl/lex/Main.cpp",
      "src/sksl/lex/NFA.cpp",
      "src/sksl/lex/NFA.h",
      "src/sksl/lex/NFAState.h",
      "src/sksl/lex/NFAtoDFA.h",
      "src/sksl/lex/RegexNode.cpp",
      "src/sksl/lex/RegexNode.h",
      "src/sksl/lex/RegexParser.cpp",
      "src/sksl/lex/RegexParser.h",
      "src/sksl/lex/TransitionTable.cpp",
      "src/sksl/lex/TransitionTable.h",
    ]
    include_dirs = [ "." ]
  }

  action("run_sksllex") {
    script = "gn/run_sksllex.py"
    deps = [ ":sksllex(//gn/toolchain:$host_toolchain)" ]
    sources = [ "src/sksl/lex/sksl.lex" ]

    outputs = [
      "$target_out_dir/" + rebase_path("src/sksl/SkSLLexer.h", target_out_dir),
    ]
    sksllex_path = "$root_out_dir/"
    sksllex_path += "sksllex"
    if (host_os == "win") {
      sksllex_path += ".exe"
    }
    args = [
      rebase_path(sksllex_path),
      rebase_path("bin/clang-format"),
      rebase_path("bin/fetch-clang-format"),
      rebase_path("src"),
    ]
  }
} else {
  group("run_sksllex") {
  }
}
```
このブロックは、`skia_lex`が有効な場合、SKSLのlexファイルを生成するための設定を行います。`sksllex`という実行可能ファイルを生成し、`run_sksllex.py`スクリプトを実行してlexファイルを生成します。生成されたヘッダーファイルの出力先も指定されています。

### SKSLモジュールのコピー設定
```gn
if (skia_compile_modules || skia_compile_sksl_tests) {
  copy("sksl_modules") {
    sources = [
      "src/sksl/sksl_compute.sksl",
      "src/sksl/sksl_frag.sksl",
      "src/sksl/sksl_gpu.sksl",
      "src/sksl/sksl_graphite_frag.sksl",
      "src/sksl/sksl_graphite_frag_es2.sksl",
      "src/sksl/sksl_graphite_vert.sksl",
      "src/sksl/sksl_graphite_vert_es2.sksl",
      "src/sksl/sksl_public.sksl",
      "src/sksl/sksl_rt_shader.sksl",
      "src/sksl/sksl_shared.sksl",
      "src/sksl/sksl_vert.sksl",
    ]
    skslc_dir = "$root_out_dir/"
    if (host_toolchain != default_toolchain_name) {
      skslc_dir += "$host_toolchain/"
    }
    outputs = [ "$skslc_dir/{{source_file_part}}" ]
  }
}
```
このブロックは、`skia_compile_modules`または`skia_compile_sksl_tests`が有効な場合、SKSLモジュールのソースファイルを指定のディレクトリにコピーする設定を行います。コピー元のソースファイルとコピー先のディレクトリが定義されています。

571行まで

