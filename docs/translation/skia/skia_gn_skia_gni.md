# skia/gn/skia.gni の解説

[[TOC]]

### 1. 著作権表示とライセンス情報
```gn
# Copyright 2019 Google LLC.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
```
この部分はファイルの著作権がGoogle LLCにあり、BSDスタイルのライセンスに従うことを示しています。

### 2. `is_skia_standalone` の定義
```gn
if (!defined(is_skia_standalone)) {
  is_skia_standalone = false
}
```
`is_skia_standalone` が未定義の場合、デフォルトで `false` に設定します。

### 3. `is_skia_dev_build` の定義
```gn
is_skia_dev_build = is_skia_standalone && !is_official_build
```
`is_skia_standalone` が `true` で `is_official_build` が `false` の場合、`is_skia_dev_build` を `true` に設定します。これは開発ビルドかどうかを示します。

### 4. `declare_args` の定義
```gn
declare_args() {
  skia_android_serial = ""
  skia_compile_modules = false
  skia_compile_sksl_tests = false
  ...
}
```
`declare_args` 関数内で、Skiaプロジェクトのビルド設定に関する複数の引数が定義されています。以下は各引数の説明です。

### `skia_android_serial`
- **デフォルト値**: `""`
- **説明**: Androidビルド用のシリアル番号を指定します。

### `skia_compile_modules`
- **デフォルト値**: `false`
- **説明**: モジュールのコンパイルを行うかどうかを指定します。

### `skia_compile_sksl_tests`
- **デフォルト値**: `false`
- **説明**: SKSL（Skia Shading Language）テストをコンパイルするかどうかを指定します。

### `skia_dwritecore_sdk`
- **デフォルト値**: `""`
- **説明**: DWriteCore SDKのパスを指定します。

### `skia_enable_api_available_macro`
- **デフォルト値**: `true`
- **説明**: API利用可能マクロを有効にするかどうかを指定します。

### `skia_enable_android_utils`
- **デフォルト値**: `is_skia_dev_build`
- **説明**: Androidユーティリティを有効にするかどうかを指定します。

### `skia_enable_discrete_gpu`
- **デフォルト値**: `true`
- **説明**: ディスクリートGPUを有効にするかどうかを指定します。

### `skia_enable_flutter_defines`
- **デフォルト値**: `false`
- **説明**: Flutter定義を有効にするかどうかを指定します。

### `skia_enable_fontmgr_empty`
- **デフォルト値**: `false`
- **説明**: 空のフォントマネージャを有効にするかどうかを指定します。

### `skia_enable_fontmgr_fuchsia`
- **デフォルト値**: `is_fuchsia`
- **説明**: Fuchsiaフォントマネージャを有効にするかどうかを指定します。

### `skia_enable_fontmgr_win`
- **デフォルト値**: `is_win`
- **説明**: Windowsフォントマネージャを有効にするかどうかを指定します。

### `skia_enable_gpu_debug_layers`
- **デフォルト値**: `is_skia_dev_build && is_debug`
- **説明**: GPUデバッグレイヤーを有効にするかどうかを指定します。

### `skia_enable_optimize_size`
- **デフォルト値**: `false`
- **説明**: サイズ最適化を有効にするかどうかを指定します。

### `skia_enable_pdf`
- **デフォルト値**: `!is_wasm`
- **説明**: PDFサポートを有効にするかどうかを指定します。

### `skia_enable_precompile`
- **デフォルト値**: `true`
- **説明**: プリコンパイルを有効にするかどうかを指定します。

### `skia_enable_skottie`
- **デフォルト値**: `!is_component_build`
- **説明**: Skottie（アニメーションのレンダリング）を有効にするかどうかを指定します。

### `skia_enable_svg`
- **デフォルト値**: `!is_component_build`
- **説明**: SVGサポートを有効にするかどうかを指定します。

### `skia_enable_tools`
- **デフォルト値**: `is_skia_dev_build`
- **説明**: 開発ツールを有効にするかどうかを指定します。

### `skia_disable_tracing`
- **デフォルト値**: `is_official_build`
- **説明**: トレースを無効にするかどうかを指定します。

### `skia_enable_vello_shaders`
- **デフォルト値**: `false`
- **説明**: Velloシェーダーを有効にするかどうかを指定します。

### `skia_disable_vma_stl_shared_mutex`
- **デフォルト値**: `false`
- **説明**: VMA STL共有ミューテックスを無効にするかどうかを指定します。

### `skia_enable_winuwp`
- **デフォルト値**: `false`
- **説明**: Windows UWP（ユニバーサルWindowsプラットフォーム）を有効にするかどうかを指定します。

### `skia_generate_workarounds`
- **デフォルト値**: `false`
- **説明**: ワークアラウンドを生成するかどうかを指定します。

### `skia_include_multiframe_procs`
- **デフォルト値**: `false`
- **説明**: マルチフレームプロセスを含めるかどうかを指定します。

### `skia_lex`
- **デフォルト値**: `false`
- **説明**: Lexサポートを有効にするかどうかを指定します。

### `skia_print_sksl_shaders`
- **デフォルト値**: `false`
- **説明**: SKSLシェーダーを印刷するかどうかを指定します。

### `skia_print_native_shaders`
- **デフォルト値**: `false`
- **説明**: ネイティブシェーダーを印刷するかどうかを指定します。

### `skia_tools_require_resources`
- **デフォルト値**: `false`
- **説明**: ツールがリソースを必要とするかどうかを指定します。

### `skia_update_fuchsia_sdk`
- **デフォルト値**: `false`
- **説明**: Fuchsia SDKを更新するかどうかを指定します。

### `skia_use_angle`
- **デフォルト値**: `false`
- **説明**: ANGLE（Almost Native Graphics Layer Engine）を使用するかどうかを指定します。

### `skia_use_client_icu`
- **デフォルト値**: `false`
- **説明**: クライアントのICU（International Components for Unicode）を使用するかどうかを指定します。

### `skia_use_dawn`
- **デフォルト値**: `false`
- **説明**: Dawn（WebGPUの実装）を使用するかどうかを指定します。

### `skia_use_direct3d`
- **デフォルト値**: `false`
- **説明**: Direct3Dを使用するかどうかを指定します。

### `skia_use_egl`
- **デフォルト値**: `false`
- **説明**: EGL（Embedded-System Graphics Library）を使用するかどうかを指定します。

### `skia_use_expat`
- **デフォルト値**: `!is_wasm`
- **説明**: Expat（XMLパーサー）を使用するかどうかを指定します。

### `skia_use_ffmpeg`
- **デフォルト値**: `false`
- **説明**: FFmpeg（マルチメディアフレームワーク）を使用するかどうかを指定します。

### `skia_use_fixed_gamma_text`
- **デフォルト値**: `is_android`
- **説明**: 固定ガンマテキストを使用するかどうかを指定します。

### `skia_use_fontconfig`
- **デフォルト値**: `is_linux`
- **説明**: Fontconfigを使用するかどうかを指定します。

### `skia_use_fontations`
- **デフォルト値**: `false`
- **説明**: Fontations（フォントライブラリ）を使用するかどうかを指定します。

### `skia_use_fonthost_mac`
- **デフォルト値**: `is_mac || is_ios`
- **説明**: MacおよびiOSのフォントホストを使用するかどうかを指定します。

### `skia_use_freetype`
- **デフォルト値**: `is_android || is_fuchsia || is_linux || is_wasm`
- **説明**: FreeType（フォントレンダリングライブラリ）を使用するかどうかを指定します。

### `skia_use_harfbuzz`
- **デフォルト値**: `true`
- **説明**: HarfBuzz（テキストシェーピングエンジン）を使用するかどうかを指定します。

### `skia_use_gl`
- **デフォルト値**: `!is_fuchsia`
- **説明**: OpenGLを使用するかどうかを指定します。

### `skia_use_icu`
- **デフォルト値**: `!is_fuchsia`
- **説明**: ICU（International Components for Unicode）を使用するかどうかを指定します。

### `skia_use_icu4x`
- **デフォルト値**: `false`
- **説明**: ICU4Xを使用するかどうかを指定します。

### `skia_use_jpeg_gainmaps`
- **デフォルト値**: `is_skia_dev_build`
- **説明**: JPEGゲインマップを使用する

かどうかを指定します。

### `skia_use_libavif`
- **デフォルト値**: `false`
- **説明**: libavif（AVIFエンコーディングおよびデコーディングライブラリ）を使用するかどうかを指定します。

### `skia_use_libgrapheme`
- **デフォルト値**: `false`
- **説明**: libgraphemeを使用するかどうかを指定します。

### `skia_use_libheif`
- **デフォルト値**: `is_skia_dev_build`
- **説明**: libheif（HEIFエンコーディングおよびデコーディングライブラリ）を使用するかどうかを指定します。

### `skia_use_libjpeg_turbo_decode`
- **デフォルト値**: `true`
- **説明**: libjpeg-turboを使用してJPEGデコードを行うかどうかを指定します。

### `skia_use_libjpeg_turbo_encode`
- **デフォルト値**: `true`
- **説明**: libjpeg-turboを使用してJPEGエンコードを行うかどうかを指定します。

### `skia_use_no_jpeg_encode`
- **デフォルト値**: `false`
- **説明**: JPEGエンコードを無効にするかどうかを指定します。

### `skia_use_libjxl_decode`
- **デフォルト値**: `false`
- **説明**: libjxl（JPEG XLエンコーディングおよびデコーディングライブラリ）を使用してデコードを行うかどうかを指定します。

### `skia_use_libpng_decode`
- **デフォルト値**: `true`
- **説明**: libpngを使用してPNGデコードを行うかどうかを指定します。

### `skia_use_libpng_encode`
- **デフォルト値**: `true`
- **説明**: libpngを使用してPNGエンコードを行うかどうかを指定します。

### `skia_use_no_png_encode`
- **デフォルト値**: `false`
- **説明**: PNGエンコードを無効にするかどうかを指定します。

### `skia_use_libwebp_decode`
- **デフォルト値**: `true`
- **説明**: libwebpを使用してWebPデコードを行うかどうかを指定します。

### `skia_use_libwebp_encode`
- **デフォルト値**: `!is_wasm`
- **説明**: libwebpを使用してWebPエンコードを行うかどうかを指定します。

### `skia_use_no_webp_encode`
- **デフォルト値**: `false`
- **説明**: WebPエンコードを無効にするかどうかを指定します。

### `skia_use_lua`
- **デフォルト値**: `is_skia_dev_build && !is_ios`
- **説明**: Luaスクリプトを使用するかどうかを指定します。

### `skia_use_metal`
- **デフォルト値**: `false`
- **説明**: Metal（AppleのグラフィックスAPI）を使用するかどうかを指定します。

### `skia_use_ndk_images`
- **デフォルト値**: `is_android && defined(ndk_api) && ndk_api >= 30`
- **説明**: Android NDKイメージを使用するかどうかを指定します。

### `skia_use_perfetto`
- **デフォルト値**: `is_linux || is_mac || is_android`
- **説明**: Perfetto（トレースツール）を使用するかどうかを指定します。

### `skia_android_framework_use_perfetto`
- **デフォルト値**: `false`
- **説明**: AndroidフレームワークでPerfettoを使用するかどうかを指定します。

### `skia_use_piex`
- **デフォルト値**: `!is_win && !is_wasm`
- **説明**: PIE（Portable Image Exchange）を使用するかどうかを指定します。

### `skia_use_sfml`
- **デフォルト値**: `false`
- **説明**: SFML（Simple and Fast Multimedia Library）を使用するかどうかを指定します。

### `skia_use_webgl`
- **デフォルト値**: `is_wasm`
- **説明**: WebGLを使用するかどうかを指定します。

### `skia_use_webgpu`
- **デフォルト値**: `is_wasm`
- **説明**: WebGPUを使用するかどうかを指定します。

### `skia_use_wuffs`
- **デフォルト値**: `true`
- **説明**: Wuffs（ファスト画像デコーディングライブラリ）を使用するかどうかを指定します。

### `skia_use_x11`
- **デフォルト値**: `is_linux`
- **説明**: X11（X Window System）を使用するかどうかを指定します。

### `skia_use_xps`
- **デフォルト値**: `true`
- **説明**: XPS（XML Paper Specification）を使用するかどうかを指定します。

### `skia_use_safe_libcxx`
- **デフォルト値**: `false`
- **説明**: libc++のセーフモードを使用するかどうかを指定します。

### `skia_enable_gpu`
- **デフォルト値**: `true`
- **説明**: GPUサポートを有効にするかどうかを指定します。

### `skia_enable_graphite`
- **デフォルト値**: `false`
- **説明**: Graphiteサポートを有効にするかどうかを指定します。

### `skia_use_zlib`
- **デフォルト値**: `true`
- **説明**: zlib（圧縮ライブラリ）を使用するかどうかを指定します。

### iOSビルド特定の設定
```gn
if (is_ios) {
  skia_ios_identity = ".*Google.*"
  skia_ios_profile = "Google Development"
}
```
- **説明**: iOSビルドの場合、`skia_ios_identity` と `skia_ios_profile` を設定します。

### `skia_build_rust_targets`
- **デフォルト値**: `false`
- **説明**: Rustターゲットをビルドするかどうかを指定します。

### `skia_enable_ganesh` の定義
```gn
declare_args() {
  skia_enable_ganesh = skia_enable_gpu
}
```
- **説明**: `skia_enable_ganesh` は、 `skia_enable_gpu` の値をそのまま使用して設定されます。GaneshはSkiaのGPUレンダリングエンジンです。GPUサポートが有効であれば、Ganeshも有効になります。

### `skia_enable_sksl_tracing` の定義
```gn
declare_args() {
  skia_enable_sksl_tracing = is_skia_dev_build && !skia_enable_optimize_size
}
```
- **説明**: `skia_enable_sksl_tracing` は、Skiaが開発ビルドであり、かつサイズ最適化が有効でない場合に `true` になります。SKSLトレース機能はシェーダーのデバッグに役立ちます。

### `skia_gl_standard` と `skia_use_vulkan` の設定
```gn
declare_args() {
  if (is_mac) {
    skia_gl_standard = "gl"
  } else if (is_ios) {
    skia_gl_standard = "gles"
  } else if (is_wasm && skia_enable_ganesh) {
    skia_gl_standard = "webgl"
  } else {
    skia_gl_standard = ""
  }

  if (is_fuchsia) {
    skia_use_vulkan = true
  } else {
    skia_use_vulkan = false
  }

  skia_build_fuzzers = is_clang && is_linux && target_cpu == "x64"
  skia_use_libfuzzer_defaults = true
}
```
- **説明**:
  - `skia_gl_standard` は、プラットフォームに応じて異なるOpenGL標準を設定します。
    - macOSの場合は `"gl"`
    - iOSの場合は `"gles"`
    - WebAssembly（Wasm）でGaneshが有効な場合は `"webgl"`
    - それ以外の場合は空文字列
  - `skia_use_vulkan` は、Fuchsiaプラットフォームでは `true` に、その他のプラットフォームでは `false` に設定されます。Vulkanは高性能なグラフィックスAPIです。
  - `skia_build_fuzzers` は、Clangコンパイラを使用し、Linuxプラットフォームであり、ターゲットCPUがx64の場合に `true` になります。これはファジング（セキュリティテスト）のビルド設定です。
  - `skia_use_libfuzzer_defaults` は常に `true` に設定され、libFuzzerのデフォルト設定を使用します。

### `skia_enable_skunicode` の定義
```gn
declare_args() {
  skia_enable_skunicode = skia_use_icu || skia_use_client_icu ||
                          skia_use_libgrapheme || skia_use_icu4x
}
```
- **説明**: `skia_enable_skunicode` は、いずれかのUnicode処理ライブラリ（ICU、Client ICU、libgrapheme、ICU4X）が有効である場合に `true` になります。Unicodeサポートを有効にする設定です。

### `skia_use_angle` と `skia_gl_standard` のチェック
```gn
if (skia_use_angle && skia_gl_standard != "gles") {
  skia_gl_standard = ""
}
```
- **説明**: `skia_use_angle` が有効であり、かつ `skia_gl_standard` が `"gles"` でない場合、`skia_gl_standard` を空文字列に設定します。これはANGLE（Almost Native Graphics Layer Engine）を使用する場合の設定です。

### `skia_pdf_subset_harfbuzz` の定義
```gn
declare_args() {
  skia_pdf_subset_harfbuzz = skia_use_harfbuzz
}
```
- **説明**: `skia_pdf_subset_harfbuzz` は、`skia_use_harfbuzz` の値をそのまま使用して設定されます。これはPDFサブセットでHarfBuzz（テキストシェーピングエンジン）を使用するかどうかを指定します。

### `skia_enable_fontmgr_android`
```gn
skia_enable_fontmgr_android = skia_use_expat && skia_use_freetype
```
- **説明**: Android用のフォントマネージャを有効にするかどうかを設定します。`skia_use_expat` と `skia_use_freetype` が有効な場合に `true` になります。

### `skia_enable_fontmgr_custom_directory`
```gn
skia_enable_fontmgr_custom_directory = skia_use_freetype && !is_fuchsia && !is_wasm
```
- **説明**: カスタムディレクトリのフォントマネージャを有効にするかどうかを設定します。`skia_use_freetype` が有効で、かつ `fuchsia` や `wasm` でない場合に `true` になります。

### `skia_enable_fontmgr_custom_embedded`
```gn
skia_enable_fontmgr_custom_embedded = skia_use_freetype && !is_fuchsia
```
- **説明**: 埋め込み用のカスタムフォントマネージャを有効にするかどうかを設定します。`skia_use_freetype` が有効で、かつ `fuchsia` でない場合に `true` になります。

### `skia_enable_fontmgr_custom_empty`
```gn
skia_enable_fontmgr_custom_empty = skia_use_freetype && !is_wasm
```
- **説明**: 空のカスタムフォントマネージャを有効にするかどうかを設定します。`skia_use_freetype` が有効で、かつ `wasm` でない場合に `true` になります。

### `skia_enable_fontmgr_fontconfig`
```gn
skia_enable_fontmgr_fontconfig = skia_use_freetype && skia_use_fontconfig
```
- **説明**: Fontconfigを使用するフォントマネージャを有効にするかどうかを設定します。`skia_use_freetype` と `skia_use_fontconfig` が有効な場合に `true` になります。

### `skia_enable_fontmgr_win_gdi`
```gn
skia_enable_fontmgr_win_gdi = is_win && !skia_enable_winuwp
```
- **説明**: Windows GDIを使用するフォントマネージャを有効にするかどうかを設定します。`is_win` が `true` で、かつ `skia_enable_winuwp` が `false` の場合に `true` になります。

### `skia_enable_fontmgr_FontConfigInterface`
```gn
skia_enable_fontmgr_FontConfigInterface = skia_use_freetype && skia_use_fontconfig
```
- **説明**: FontConfigインターフェースを使用するフォントマネージャを有効にするかどうかを設定します。`skia_use_freetype` と `skia_use_fontconfig` が有効な場合に `true` になります。

### `skia_enable_spirv_validation`
```gn
skia_enable_spirv_validation = is_skia_dev_build && is_debug && !skia_use_dawn
```
- **説明**: SPIR-Vのバリデーションを有効にするかどうかを設定します。`is_skia_dev_build` と `is_debug` が `true` で、かつ `skia_use_dawn` が `false` の場合に `true` になります。

### `skia_use_dng_sdk`
```gn
skia_use_dng_sdk = !is_fuchsia && !is_wasm && skia_use_libjpeg_turbo_decode && skia_use_zlib
```
- **説明**: DNG SDKを使用するかどうかを設定します。`is_fuchsia` と `is_wasm` が `false` で、`skia_use_libjpeg_turbo_decode` と `skia_use_zlib` が有効な場合に `true` になります。

### `skia_use_sfntly`
```gn
skia_use_sfntly = skia_use_icu
```
- **説明**: SFNTlyライブラリを使用するかどうかを設定します。`skia_use_icu` が有効な場合に `true` になります。

### `skia_enable_vulkan_debug_layers`
```gn
skia_enable_vulkan_debug_layers = skia_enable_gpu_debug_layers
```
- **説明**: Vulkanのデバッグレイヤーを有効にするかどうかを設定します。`skia_enable_gpu_debug_layers` が有効な場合に `true` になります。

### `skia_enable_direct3d_debug_layer`
```gn
skia_enable_direct3d_debug_layer = skia_enable_gpu_debug_layers
```
- **説明**: Direct3Dのデバッグレイヤーを有効にするかどうかを設定します。`skia_enable_gpu_debug_layers` が有効な場合に `true` になります。

### `skia_enable_metal_debug_info`
```gn
skia_enable_metal_debug_info = skia_enable_gpu_debug_layers
```
- **説明**: Metalのデバッグ情報を有効にするかどうかを設定します。`skia_enable_gpu_debug_layers` が有効な場合に `true` になります。

### `skia_use_vma`
```gn
skia_use_vma = skia_use_vulkan
```
- **説明**: Vulkan Memory Allocator（VMA）を使用するかどうかを設定します。`skia_use_vulkan` が有効な場合に `true` になります。

### `skia_vulkan_memory_allocator_dir`
```gn
skia_vulkan_memory_allocator_dir = "//third_party/externals/vulkanmemoryallocator"
```
- **説明**: Vulkan Memory Allocatorのディレクトリを指定します。

### `skia_build_for_debugger`
```gn
skia_build_for_debugger = false
```
- **説明**: デバッガー用にビルドするかどうかを設定します。デフォルトは `false` です。

### `skia_icu_bidi_third_party_dir`
```gn
skia_icu_bidi_third_party_dir = "//third_party/icu_bidi"
```
- **説明**: ICU BiDi（双方向テキスト処理）のサードパーティディレクトリを指定します。

### `skia_libgrapheme_third_party_dir`
```gn
skia_libgrapheme_third_party_dir = "//third_party/libgrapheme"
```
- **説明**: libgrapheme（グラフェメ処理ライブラリ）のサードパーティディレクトリを指定します。

### `assert` 文による制約の確認
```gn
assert(!skia_use_dawn || skia_enable_graphite)  # Dawn is Graphite-only
```
- **説明**: `skia_use_dawn` が `true` の場合、`skia_enable_graphite` も `true` でなければならないという制約を確認しています。これは、Dawn（WebGPUの実装）がGraphite専用であるためです。

### ツールの有効化条件
```gn
# Our tools require static linking (they use non-exported symbols), and the Ganesh backend.
skia_enable_tools =
    skia_enable_tools && !is_component_build && skia_enable_ganesh
```
- **説明**: Skiaのツールを有効にする条件として、静的リンク（非エクスポートシンボルを使用）とGaneshバックエンドの使用が必要であることを指定しています。具体的には、`skia_enable_tools` が `true` であり、`is_component_build` が `false` であり、`skia_enable_ganesh` が `true` である必要があります。

### サイズ最適化の制約
```gn
if (skia_enable_optimize_size) {
  assert(
      !is_debug,
      "Must set is_debug to false for skia_enable_optimize_size to do anything. If you want to build with debug mode and the correct define, add extra_cflags=['-DSK_ENABLE_OPTIMIZE_SIZE'] to your GN args.")
}
```
- **説明**: サイズ最適化（`skia_enable_optimize_size`）が有効な場合、デバッグモード（`is_debug`）が無効でなければならないことを確認しています。デバッグモードでサイズ最適化を有効にしたい場合は、追加のフラグ（`-DSK_ENABLE_OPTIMIZE_SIZE`）を指定する必要があることを示しています。

### Perfettoの排他性の確認
```gn
# Current Perfetto integrations are mutually exclusive
assert(!skia_use_perfetto || !skia_android_framework_use_perfetto)
```
- **説明**: 現在のPerfetto（トレースツール）の統合は相互に排他的であるため、`skia_use_perfetto` と `skia_android_framework_use_perfetto` の両方が `true` になることは許可されません。

### `skia_target` テンプレートの定義
```gn
template("skia_target") {
  target(invoker._skia_target_type, target_name) {
    # set_defaults(invoker._skia_target_type) might not exist or set configs
    if (!defined(configs)) {
      configs = []
    }

    # Explicit configs instead of set_defaults("skia_target")
    # Allows template("skia_*") below to avoid the configs dance.
    if (defined(skia_target_default_configs)) {
      configs += skia_target_default_configs
    }

    # "*" clobbers the current scope; append to existing configs
    forward_variables_from(invoker, "*", [ "configs" ])
    if (defined(invoker.configs)) {
      configs += invoker.configs
    }
  }
}
```
- **説明**: Skiaのターゲットを定義するためのテンプレートを設定しています。このテンプレートは、他のGNビルドシステム内でSkiaのターゲットをビルドする際に使用されます。
  - `configs` が未定義の場合、空のリストとして初期化します。
  - `skia_target_default_configs` が定義されている場合、それらの設定を `configs` に追加します。
  - `invoker` からすべての変数（`configs` を除く）を現在のスコープに転送し、既存の `configs` に追加します。

### `skia_executable` テンプレート
```gn
template("skia_executable") {
  skia_target(target_name) {
    assert(!defined(configs), "No set_defaults(skia_target)")
    _skia_target_type = "executable"
    forward_variables_from(invoker, "*")
  }
}
```
- **説明**: このテンプレートは実行可能ファイル（executable）を定義します。
  - `skia_target` 関数を呼び出し、`target_name` を渡します。
  - `configs` が定義されていないことを確認するアサーションを行います。
  - `_skia_target_type` を `"executable"` に設定します。
  - `invoker` からすべての変数を現在のスコープに転送します。

### `skia_source_set` テンプレート
```gn
template("skia_source_set") {
  skia_target(target_name) {
    assert(!defined(configs), "No set_defaults(skia_target)")
    _skia_target_type = "source_set"
    forward_variables_from(invoker, "*")
  }
}
```
- **説明**: このテンプレートはソースセット（source set）を定義します。
  - `_skia_target_type` を `"source_set"` に設定する点を除き、`skia_executable` テンプレートと同様のロジックを持ちます。

### `skia_static_library` テンプレート
```gn
template("skia_static_library") {
  skia_target(target_name) {
    assert(!defined(configs), "No set_defaults(skia_target)")
    _skia_target_type = "static_library"
    forward_variables_from(invoker, "*")
  }
}
```
- **説明**: このテンプレートは静的ライブラリ（static library）を定義します。
  - `_skia_target_type` を `"static_library"` に設定する点を除き、他のテンプレートと同様のロジックを持ちます。

### `skia_shared_library` テンプレート
```gn
template("skia_shared_library") {
  skia_target(target_name) {
    assert(!defined(configs), "No set_defaults(skia_target)")
    _skia_target_type = "shared_library"
    forward_variables_from(invoker, "*")
  }
}
```
- **説明**: このテンプレートは共有ライブラリ（shared library）を定義します。
  - `_skia_target_type` を `"shared_library"` に設定する点を除き、他のテンプレートと同様のロジックを持ちます。

### `skia_component` テンプレート
```gn
template("skia_component") {
  skia_target(target_name) {
    assert(!defined(configs), "No set_defaults(skia_target)")
    _skia_target_type = "component"
    forward_variables_from(invoker, "*")
  }
}
```
- **説明**: このテンプレートはコンポーネント（component）を定義します。
  - `_skia_target_type` を `"component"` に設定する点を除き、他のテンプレートと同様のロジックを持ちます。

### 共通のロジック
各テンプレートは共通のロジックを持っています：
1. `skia_target` 関数を呼び出し、`target_name` を渡します。
2. `configs` が定義されていないことを確認するアサーションを行います。
3. `_skia_target_type` をそれぞれのターゲットタイプに設定します。
4. `invoker` からすべての変数を現在のスコープに転送します。