# skia/gn/toolchain/BUILD.gn の解説

[[TOC]]

### WASMおよびFuchsia用の設定ファイルのインポート
```gn
if (is_wasm) {
  import("wasm.gni")
}
if (is_fuchsia) {
  import("//build/fuchsia/sdk.gni")
}
```
- **説明**:
  - `is_wasm` が `true` の場合、`wasm.gni` ファイルをインポートします。
  - `is_fuchsia` が `true` の場合、`//build/fuchsia/sdk.gni` ファイルをインポートします。

### コンパイラとリンカの設定
```gn
declare_args() {
  host_ar = ar
  host_cc = cc
  host_cxx = cxx
```
- **説明**:
  - `host_ar`, `host_cc`, `host_cxx` をそれぞれ `ar`, `cc`, `cxx` で初期化します。これはホスト環境で使用するツールの設定です。

### Android用の設定
```gn
  if (is_android) {
    _prefix = "$ndk/toolchains/llvm/prebuilt/$ndk_host/bin"
    if (host_os == "win") {
      target_ar = "$_prefix/llvm-ar.exe"
      target_cc = "$_prefix/clang.exe --target=$ndk_target$ndk_api -fno-addrsig"
      target_cxx =
          "$_prefix/clang++.exe --target=$ndk_target$ndk_api -fno-addrsig"
    } else {
      target_ar = "$_prefix/llvm-ar"
      target_cc = "$_prefix/$ndk_target$ndk_api-clang"
      target_cxx = "$_prefix/$ndk_target$ndk_api-clang++"
    }
```
- **説明**:
  - `is_android` が `true` の場合、Android用のコンパイラおよびリンカの設定を行います。
  - `_prefix` はNDKツールチェインのパスです。
  - `host_os` がWindowsの場合とそれ以外の場合で、それぞれ `target_ar`, `target_cc`, `target_cxx` のパスとコマンドを設定します。

### Fuchsia用の設定
```gn
  } else if (is_fuchsia && using_fuchsia_sdk) {
    target_ar = rebase_path("$fuchsia_toolchain_path/bin/llvm-ar")
    target_cc = rebase_path("$fuchsia_toolchain_path/bin/clang")
    target_cxx = rebase_path("$fuchsia_toolchain_path/bin/clang++")
    cflags = "--sysroot=" +
             rebase_path("$fuchsia_toolchain_path/$target_cpu/sysroot")
    link = rebase_path("$fuchsia_toolchain_path/bin/ld.lld")
```
- **説明**:
  - `is_fuchsia` が `true` で `using_fuchsia_sdk` も `true` の場合、Fuchsia用のコンパイラおよびリンカの設定を行います。
  - `target_ar`, `target_cc`, `target_cxx` のパスをFuchsiaツールチェインのパスに設定します。
  - `cflags` にFuchsia用のシステムルートを設定します。
  - `link` にリンカのパスを設定します。

### デフォルトの設定
```gn
  } else {
    target_ar = ar
    target_cc = cc
    target_cxx = cxx
  }

  cc_wrapper = ""
```
- **説明**:
  - AndroidでもFuchsiaでもない場合、`target_ar`, `target_cc`, `target_cxx` をデフォルトの `ar`, `cc`, `cxx` に設定します。
  - `cc_wrapper` は空文字列に設定します。

### dsymutilプールの深さ設定
```gn
  # dsymutil seems to kill the machine when too many processes are run in
  # parallel, so we need to use a pool to limit the concurrency when passing
  # large -j to Ninja (e.g. Goma build). Unfortunately this is also one of the
  # slowest steps in a build, so we don't want to limit too much. Use the number
  # of CPUs as a default.
  dlsymutil_pool_depth = exec_script("num_cpus.py", [], "value")
```
- **説明**:
  - `dsymutil` は並列に実行されるとパフォーマンスが低下するため、Ninjaで大量の `-j` を使用する場合にはプールを使って同時実行数を制限します。
  - `dlsymutil_pool_depth` を `num_cpus.py` スクリプトの実行結果（CPUの数）に設定します。

### リンクプールの深さ設定
```gn
  # Too many linkers running at once causes issues for some builders. Allow
  # such builders to limit the number of concurrent link steps.
  # link_pool_depth < 0 means no pool, 0 means cpu count, > 0 sets pool size.
  link_pool_depth = -1
}
```
- **説明**:
  - 多くのリンカが同時に実行されると問題が発生することがあるため、リンクステップの同時実行数を制限できるようにします。
  - `link_pool_depth` が0より小さい場合はプールを使用せず、0の場合はCPUの数を使用し、0より大きい場合は指定されたプールサイズを使用します。
  - デフォルト値として `-1` を設定します。

### リンク設定の宣言
```gn
declare_args() {
  host_link = host_cxx
  target_link = target_cxx
}
```
- **説明**:
  - `host_link` と `target_link` をそれぞれ `host_cxx` と `target_cxx` に設定します。これにより、ホストとターゲットのリンクに使用するデフォルトのリンクコマンドが決まります。

### シェルコマンドの設定
```gn
# For 'shell' see https://ninja-build.org/manual.html#ref_rule_command
if (host_os == "win") {
  shell = "cmd.exe /c "
  stamp = "$shell echo >"
} else {
  shell = ""
  stamp = "touch"
}
```
- **説明**:
  - **Windowsの場合**:
    - `shell` を `"cmd.exe /c "` に設定します。これにより、コマンドを実行する際にWindowsのコマンドプロンプトを使用します。
    - `stamp` を `"cmd.exe /c echo >"` に設定します。これは、ファイルに何かを書き込むことでタイムスタンプを更新するためのコマンドです。
  - **その他のプラットフォームの場合**:
    - `shell` を空文字列に設定します。これにより、標準のシェル（通常は `/bin/sh`）が使用されます。
    - `stamp` を `touch` に設定します。これは、ファイルのタイムスタンプを更新する標準的なUNIXコマンドです。

### プール設定
```gn
if (current_toolchain == default_toolchain) {
  pool("dsymutil_pool") {
    depth = dlsymutil_pool_depth
  }
  if (0 <= link_pool_depth) {
    pool("link_pool") {
      if (link_pool_depth == 0) {
        depth = exec_script("num_cpus.py", [], "value")
      } else {
        depth = link_pool_depth
      }
    }
  }
}
```
- **説明**:
  - `current_toolchain` が `default_toolchain` と一致する場合にプール設定を行います。
  - **`dsymutil_pool` の設定**:
    - `dsymutil_pool` プールを作成し、その深さを `dlsymutil_pool_depth` に設定します。これは、`dsymutil` コマンドの並列実行数を制限するためのものです。
  - **`link_pool` の設定**:
    - `link_pool_depth` が0以上の場合に `link_pool` プールを作成します。
    - `link_pool_depth` が0の場合、スクリプト `num_cpus.py` を実行してCPUの数を取得し、それを `depth` に設定します。
    - `link_pool_depth` が0より大きい場合、その値を `depth` に設定します。

### 全体の流れ
1. **リンク設定**: ホストとターゲットのリンクコマンドを設定します。
2. **シェルコマンドの設定**: ホストOSに応じて、シェルコマンドとファイルのタイムスタンプ更新コマンドを設定します。
3. **プール設定**: 並列ビルド時のコマンド実行数を制限するために、`dsymutil` と `link` のプールを設定します。

### MSVCツールチェインのテンプレート
```gn
template("msvc_toolchain") {
  toolchain(target_name) {
    toolchain_target_cpu = invoker.cpu
    lib_switch = ""
    lib_dir_switch = "/LIBPATH:"

    bin = "$win_vc/Tools/MSVC/$win_toolchain_version/bin/HostX64/$toolchain_target_cpu"
```
- **説明**:
  - `template("msvc_toolchain")` は、MSVCツールチェインを設定するためのテンプレートです。
  - `toolchain(target_name)` ブロック内でツールチェインの設定が行われます。
  - `toolchain_target_cpu` は、呼び出し元から渡されるCPUアーキテクチャです。
  - `lib_switch` と `lib_dir_switch` は、ライブラリパス設定用のスイッチです。
  - `bin` は、MSVCツールのバイナリが存在するディレクトリパスです。

### 環境設定のスクリプト
```gn
    env_setup = ""
    if (toolchain_target_cpu == "x86") {
      env_setup = "$shell $win_sdk/bin/SetEnv.cmd /x86 && "
    } else if (toolchain_target_cpu == "arm64") {
      env_setup = "$shell set \"PATH=%PATH%;$win_vc\\Tools\\MSVC\\$win_toolchain_version\\bin\\HostX64\\x64\" && "
    }
```
- **説明**:
  - `env_setup` は、特定のCPUアーキテクチャに応じた環境設定コマンドです。
  - `x86` 用のビルドでは、`SetEnv.cmd` スクリプトを実行して環境を設定します。
  - `arm64` 用のビルドでは、必要なDLLを含むディレクトリをパスに追加します。

### Clangを使用する場合の設定
```gn
    cl_m32_flag = ""

    if (clang_win != "") {
      if (toolchain_target_cpu == "x86") {
        cl_m32_flag = "-m32"
      }
      if (host_os == "win") {
        cl = "\"$clang_win/bin/clang-cl.exe\""
        lib = "\"$clang_win/bin/lld-link.exe\" /lib"
        link = "\"$clang_win/bin/lld-link.exe\""
      } else {
        cl = "\"$clang_win/bin/clang-cl\""
        lib = "\"$clang_win/bin/lld-link\" /lib"
        link = "\"$clang_win/bin/lld-link\""
      }
    } else {
      cl = "\"$bin/cl.exe\""
      lib = "\"$bin/lib.exe\""
      link = "\"$bin/link.exe\""
    }
```
- **説明**:
  - `clang_win` が設定されている場合、Clangを使用する設定を行います。
  - `x86` の場合、`-m32` フラグを追加して32ビットターゲットを指定します。
  - `host_os` がWindowsの場合とそれ以外の場合で、使用するコンパイラとリンカのパスを設定します。
  - Clangが使用されない場合、MSVCの標準ツール (`cl.exe`, `lib.exe`, `link.exe`) を使用します。

### アセンブリツールの設定
```gn
    tool("asm") {
      _ml = "ml"
      if (toolchain_target_cpu == "x64") {
        _ml += "64"
      }
      command = "$env_setup \"$bin/$_ml.exe\" {{asmflags}} /nologo /c /Fo {{output}} {{source}}"
      outputs = [
        "{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.obj",
      ]
      description = "assemble {{source}}"
    }
  }
}
```
- **説明**:
  - `tool("asm")` ブロックは、アセンブリツールの設定を行います。
  - `_ml` にはアセンブラツール `ml` の名前を設定し、`x64` ターゲットの場合は `ml64` を使用します。
  - `command` には、アセンブルコマンドを設定します。環境設定コマンド（`$env_setup`）と共に、アセンブラツールを実行します。
  - `outputs` には、生成されるオブジェクトファイルのパスを指定します。
  - `description` は、ビルドログに出力されるコマンドの説明です。

### C言語コンパイラの設定 (`cc`)
```gn
tool("cc") {
  precompiled_header_type = "msvc"
  pdbname = "{{target_out_dir}}/{{label_name}}_c.pdb"

  # Label names may have spaces so pdbname must be quoted.
  command = "$env_setup $cc_wrapper $cl /nologo /showIncludes /FC {{defines}} {{include_dirs}} {{cflags}} $cl_m32_flag {{cflags_c}} /c {{source}} /Fo{{output}} /Fd\"$pdbname\""
  depsformat = "msvc"
  outputs = [
    "{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.obj",
  ]
  description = "compile {{source}}"
}
```
- **説明**:
  - **プリコンパイルヘッダのタイプ**: `precompiled_header_type` を `"msvc"` に設定。
  - **PDBファイル名**: デバッグ情報のファイル名を `pdbname` に設定。
  - **コンパイルコマンド**: `command` で指定。環境設定コマンド（`$env_setup`）と共に、コンパイラツール（`$cl`）を実行。その他のフラグや設定も含まれます。
    - `{{defines}}`: 定義済みマクロ
    - `{{include_dirs}}`: インクルードディレクトリ
    - `{{cflags}}`, `{{cflags_c}}`: コンパイルフラグ
    - `{{source}}`, `{{output}}`: ソースファイルと出力ファイル
  - **依存関係フォーマット**: `depsformat` を `"msvc"` に設定。
  - **出力ファイル**: `outputs` で、オブジェクトファイルのパスを設定。
  - **説明**: `description` にコンパイルタスクの説明を設定。

### C++コンパイラの設定 (`cxx`)
```gn
tool("cxx") {
  precompiled_header_type = "msvc"
  pdbname = "{{target_out_dir}}/{{label_name}}_c.pdb"

  # Label names may have spaces so pdbname must be quoted.
  command = "$env_setup $cc_wrapper $cl /nologo /showIncludes /FC {{defines}} {{include_dirs}} {{cflags}} $cl_m32_flag {{cflags_cc}} /c {{source}} /Fo{{output}} /Fd\"$pdbname\""
  depsformat = "msvc"
  outputs = [
    "{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.obj",
  ]
  description = "compile {{source}}"
}
```
- **説明**: `cc` ツールの設定と同様に、C++コンパイラの設定を行います。違いは `{{cflags_cc}}` が使用される点のみです。

### アセンブラの設定
前の回答に含まれていた部分ですので省略しますが、`tool("asm")` ブロックでアセンブラツールの設定を行っています。

### アーカイブツールの設定 (`alink`)
```gn
tool("alink") {
  rspfile = "{{output}}.rsp"

  command = "$env_setup $lib /nologo /ignore:4221 {{arflags}} /OUT:{{output}} @$rspfile"
  outputs = [
    # Ignore {{output_extension}} and always use .lib, there's no reason to
    # allow targets to override this extension on Windows.
    "{{root_out_dir}}/{{target_output_name}}{{output_extension}}",
  ]
  default_output_extension = ".lib"
  default_output_dir = "{{target_out_dir}}"

  # inputs_newline works around a fixed per-line buffer size in the linker.
  rspfile_content = "{{inputs_newline}}"
  description = "link {{output}}"
  if (0 <= link_pool_depth) {
    pool = ":link_pool($default_toolchain)"
  }
}
```
- **説明**:
  - **レスポンスファイル**: `rspfile` に出力ファイルのレスポンスファイルパスを設定。
  - **コマンド**: `command` で指定。環境設定コマンド（`$env_setup`）と共に、アーカイブツール（`$lib`）を実行。
    - `{{arflags}}`: アーカイブフラグ
    - `{{output}}`: 出力ファイル
    - `@$rspfile`: レスポンスファイルの内容を使用
  - **出力ファイル**: `outputs` で、出力ライブラリファイルのパスを設定。Windowsでは常に `.lib` 拡張子を使用。
  - **デフォルト出力拡張子**: `default_output_extension` を `".lib"` に設定。
  - **デフォルト出力ディレクトリ**: `default_output_dir` を設定。
  - **レスポンスファイルの内容**: `rspfile_content` で入力ファイルを改行で区切ってリスト化。
  - **説明**: `description` にリンクタスクの説明を設定。
  - **プール設定**: `link_pool_depth` が0以上の場合、`link_pool` を使用してリンクタスクの同時実行数を制限。

### 共有ライブラリのリンク設定 (`solink`)
```gn
tool("solink") {
  dllname = "{{output_dir}}/{{target_output_name}}{{output_extension}}"
  libname = "${dllname}.lib"
  pdbname = "${dllname}.pdb"
  rspfile = "${dllname}.rsp"

  command = "$env_setup $link /nologo /IMPLIB:$libname /DLL /OUT:$dllname /PDB:$pdbname @$rspfile"
  outputs = [
    dllname,
    libname,
    pdbname,
  ]
  default_output_extension = ".dll"
  default_output_dir = "{{root_out_dir}}"

  link_output = libname
  depend_output = libname
  runtime_outputs = [
    dllname,
    pdbname,
  ]

  # I don't quite understand this.  Aping Chrome's toolchain/win/BUILD.gn.
  restat = true

  # inputs_newline works around a fixed per-line buffer size in the linker.
  rspfile_content = "{{inputs_newline}} {{libs}} {{solibs}} {{ldflags}}"
  description = "link {{output}}"
  if (0 <= link_pool_depth) {
    pool = ":link_pool($default_toolchain)"
  }
}
```
- **説明**:
  - **dllname**: 出力されるDLLファイルの名前。
  - **libname**: DLLに対応するインポートライブラリの名前。
  - **pdbname**: デバッグ情報のファイル名。
  - **rspfile**: リンカコマンドのレスポンスファイル名。
  - **command**: リンクコマンド。`$env_setup` と `$link` を使用し、DLLの出力ファイル、PDBファイル、レスポンスファイルを指定。
  - **outputs**: リンクコマンドの出力ファイルリスト。
  - **default_output_extension**: デフォルトの出力ファイル拡張子を `.dll` に設定。
  - **default_output_dir**: デフォルトの出力ディレクトリを設定。
  - **link_output** と **depend_output**: リンクと依存の出力ファイルを `libname` に設定。
  - **runtime_outputs**: 実行時に必要な出力ファイルリスト。
  - **restat**: ファイルの再スタンプを有効にするフラグ。
  - **rspfile_content**: リンカコマンドのレスポンスファイル内容。
  - **description**: リンクタスクの説明。
  - **pool**: `link_pool_depth` が0以上の場合にリンクプールを設定。

### 実行ファイルのリンク設定 (`link`)
```gn
tool("link") {
  exename = "{{root_out_dir}}/{{target_output_name}}{{output_extension}}"
  pdbname = "$exename.pdb"
  rspfile = "$exename.rsp"

  command = "$env_setup $link /nologo /OUT:$exename /PDB:$pdbname @$rspfile"
  default_output_extension = ".exe"
  default_output_dir = "{{root_out_dir}}"
  outputs = [ exename ]

  # inputs_newline works around a fixed per-line buffer size in the linker.
  rspfile_content = "{{inputs_newline}} {{libs}} {{solibs}} {{ldflags}}"
  description = "link {{output}}"
  if (0 <= link_pool_depth) {
    pool = ":link_pool($default_toolchain)"
  }
}
```
- **説明**:
  - **exename**: 出力される実行ファイルの名前。
  - **pdbname**: デバッグ情報のファイル名。
  - **rspfile**: リンカコマンドのレスポンスファイル名。
  - **command**: リンクコマンド。`$env_setup` と `$link` を使用し、実行ファイルの出力ファイル、PDBファイル、レスポンスファイルを指定。
  - **default_output_extension**: デフォルトの出力ファイル拡張子を `.exe` に設定。
  - **default_output_dir**: デフォルトの出力ディレクトリを設定。
  - **outputs**: リンクコマンドの出力ファイルリスト。
  - **rspfile_content**: リンカコマンドのレスポンスファイル内容。
  - **description**: リンクタスクの説明。
  - **pool**: `link_pool_depth` が0以上の場合にリンクプールを設定。

### スタンプツールの設定 (`stamp`)
```gn
tool("stamp") {
  command = "$stamp {{output}}"
  description = "stamp {{output}}"
}
```
- **説明**:
  - **command**: スタンプコマンド。`$stamp` を使用して出力ファイルをスタンプします。
  - **description**: スタンプタスクの説明。

### コピーツールの設定 (`copy`)
```gn
tool("copy") {
  cp_py = rebase_path("../cp.py")
  command = "$shell python3 \"$cp_py\" {{source}} {{output}}"
  description = "copy {{source}} {{output}}"
}
```
- **説明**:
  - **cp_py**: コピー用のPythonスクリプト `cp.py` のパス。
  - **command**: コピーコマンド。`$shell` と `python3` を使用して `cp.py` スクリプトを実行し、ソースファイルを出力ファイルにコピーします。
  - **description**: コピータスクの説明。

### ツールチェインの引数設定
```gn
toolchain_args = {
  current_cpu = invoker.cpu
  current_os = invoker.os
}
```
- **説明**:
  - **toolchain_args**: 現在のCPUとOSの情報を設定します。`invoker.cpu` と `invoker.os` を使用します。

### MSVCツールチェインの設定

#### MSVCツールチェインの宣言
```gn
msvc_toolchain("msvc") {
  cpu = current_cpu
  os = current_os
}
```
- **説明**: `msvc` という名前のツールチェインを定義します。
  - `cpu` は `current_cpu` に設定されます。
  - `os` は `current_os` に設定されます。

#### MSVCホストツールチェインの宣言
```gn
msvc_toolchain("msvc_host") {
  cpu = host_cpu
  os = host_os
}
```
- **説明**: `msvc_host` という名前のホストツールチェインを定義します。
  - `cpu` は `host_cpu` に設定されます。
  - `os` は `host_os` に設定されます。

### GCCライクなツールチェインの設定

#### GCCライクなツールチェインのテンプレート
```gn
template("gcc_like_toolchain") {
  toolchain(target_name) {
    ar = invoker.ar
    cc = invoker.cc
    cxx = invoker.cxx
    link = invoker.link
    lib_switch = "-l"
    lib_dir_switch = "-L"
```
- **説明**: `gcc_like_toolchain` というテンプレートを定義します。このテンプレートはGCCライクなツールチェインを設定します。
  - `ar`, `cc`, `cxx`, `link` は、呼び出し元（`invoker`）からの引数を使用します。
  - `lib_switch` はライブラリ指定用のスイッチを `"-l"` に設定します。
  - `lib_dir_switch` はライブラリディレクトリ指定用のスイッチを `"-L"` に設定します。

#### Cコンパイラの設定
```gn
    tool("cc") {
      depfile = "{{output}}.d"
      command = "$cc_wrapper $cc -MD -MF $depfile {{defines}} {{include_dirs}} {{cflags}} {{cflags_c}} -c {{source}} -o {{output}}"
      depsformat = "gcc"
      outputs = [ "{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.o" ]
      description = "compile {{source}}"
    }
```
- **説明**: `cc` ツール（Cコンパイラ）の設定を行います。
  - `depfile` は依存関係ファイルの名前です。
  - `command` にはコンパイルコマンドを設定します。`$cc_wrapper` と `$cc` を使用し、必要なフラグやパスを指定します。
  - `depsformat` は依存関係のフォーマットを `"gcc"` に設定します。
  - `outputs` には出力ファイルのパスを設定します。
  - `description` にはコンパイルタスクの説明を設定します。

#### C++コンパイラの設定
```gn
    tool("cxx") {
      depfile = "{{output}}.d"
      command = "$cc_wrapper $cxx -MD -MF $depfile {{defines}} {{include_dirs}} {{cflags}} {{cflags_cc}} -c {{source}} -o {{output}}"
      depsformat = "gcc"
      outputs = [ "{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.o" ]
      description = "compile {{source}}"
    }
```
- **説明**: `cxx` ツール（C++コンパイラ）の設定を行います。
  - `cc` ツールとほぼ同じ設定ですが、`cxx` コンパイラを使用し、`{{cflags_cc}}` を追加しています。

#### Objective-Cコンパイラの設定
```gn
    tool("objc") {
      depfile = "{{output}}.d"
      command = "$cc_wrapper $cc -MD -MF $depfile {{defines}} {{include_dirs}} {{framework_dirs}} {{cflags}} {{cflags_objc}} -c {{source}} -o {{output}}"
      depsformat = "gcc"
      outputs = [ "{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.o" ]
      description = "compile {{source}}"
    }
```
- **説明**: `objc` ツール（Objective-Cコンパイラ）の設定を行います。
  - `framework_dirs` を追加して、フレームワークディレクトリを指定します。
  - `{{cflags_objc}}` を追加しています。

#### Objective-C++コンパイラの設定
```gn
    tool("objcxx") {
      depfile = "{{output}}.d"
      command = "$cc_wrapper $cxx -MD -MF $depfile {{defines}} {{include_dirs}} {{framework_dirs}} {{cflags}} {{cflags_objcc}} -c {{source}} -o {{output}}"
      depsformat = "gcc"
      outputs = [ "{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.o" ]
      description = "compile {{source}}"
    }
```
- **説明**: `objcxx` ツール（Objective-C++コンパイラ）の設定を行います。
  - `objc` ツールと同様ですが、`cxx` コンパイラを使用し、`{{cflags_objcc}}` を追加しています。

#### アセンブラの設定
```gn
    tool("asm") {
      depfile = "{{output}}.d"
      command = "$cc_wrapper $cc -MD -MF $depfile {{defines}} {{include_dirs}} {{asmflags}} -c {{source}} -o {{output}}"
      depsformat = "gcc"
      outputs = [ "{{source_out_dir}}/{{target_output_name}}.{{source_name_part}}.o" ]
      description = "assemble {{source}}"
    }
```
- **説明**: `asm` ツール（アセンブラ）の設定を行います。
  - `cc` コンパイラを使用してアセンブルを行います。
  - `{{asmflags}}` を追加しています。

### MacおよびiOS用の設定
```gn
if (is_mac || is_ios) {
  not_needed([ "ar" ])  # We use libtool instead.
}
```
- **説明**:
  - MacおよびiOSでは、`ar` ツールが必要ないため、`libtool` を使用します。

### 静的ライブラリのリンク設定 (`alink`)
```gn
tool("alink") {
  if (is_mac || is_ios) {
    command = "libtool -static -o {{output}} -no_warning_for_no_symbols {{inputs}}"
  } else {
    rspfile = "{{output}}.rsp"
    rspfile_content = "{{inputs}}"
    rm_py = rebase_path("../rm.py")
    command = "$shell python3 \"$rm_py\" \"{{output}}\" && $ar rcs {{output}} @$rspfile"
  }

  outputs = [ "{{root_out_dir}}/{{target_output_name}}{{output_extension}}" ]
  default_output_extension = ".a"
  output_prefix = "lib"
  description = "link {{output}}"
  if (0 <= link_pool_depth) {
    pool = ":link_pool($default_toolchain)"
  }
}
```
- **説明**:
  - **MacおよびiOSの場合**:
    - `libtool` コマンドを使用して静的ライブラリをリンクします。`-static` オプションで静的ライブラリを作成し、`-no_warning_for_no_symbols` オプションでシンボルがない場合の警告を抑制します。
  - **その他のプラットフォームの場合**:
    - レスポンスファイル `{{output}}.rsp` を作成し、その内容に `{{inputs}}` を含めます。
    - リンクコマンドでは、`rm.py` スクリプトを使用して既存の出力ファイルを削除し、その後 `ar` コマンドで静的ライブラリを作成します。
  - **共通設定**:
    - `outputs`: 出力ファイルのリストを設定。
    - `default_output_extension`: デフォルトの出力ファイル拡張子を `.a` に設定。
    - `output_prefix`: 出力ファイルのプレフィックスを `lib` に設定。
    - `description`: リンクタスクの説明を設定。
    - `link_pool_depth` が0以上の場合、リンクプールを設定。

### 共有ライブラリのリンク設定 (`solink`)
```gn
tool("solink") {
  soname = "{{target_output_name}}{{output_extension}}"

  rpath = "-Wl,-soname,$soname"
  if (is_mac || is_ios) {
    rpath = "-Wl,-install_name,@rpath/$soname"
  }

  rspfile = "{{output}}.rsp"
  rspfile_content = "{{inputs}}"

  _start_group = "-Wl,--start-group"
  _end_group = "-Wl,--end-group"
  if (is_mac || is_ios || is_fuchsia) {
    _start_group = ""
    _end_group = ""
  }

  command = "$link -shared {{ldflags}} $_start_group @$rspfile {{frameworks}} {{solibs}} $_end_group {{libs}} $rpath -o {{output}}"
  outputs = [ "{{root_out_dir}}/$soname" ]
  output_prefix = "lib"
  if (is_mac || is_ios) {
    default_output_extension = ".dylib"
  } else {
    default_output_extension = ".so"
  }
  description = "link {{output}}"
  if (0 <= link_pool_depth) {
    pool = ":link_pool($default_toolchain)"
  }
}
```
- **説明**:
  - **共有ライブラリの名前**: `soname` に設定。
  - **ランタイム検索パス（RPATH）**:
    - 通常のプラットフォームでは、`-Wl,-soname,$soname` を使用。
    - MacおよびiOSでは、`-Wl,-install_name,@rpath/$soname` を使用。
  - **レスポンスファイル**: `{{output}}.rsp` に `{{inputs}}` を含めます。
  - **リンクグループ**:
    - 通常のプラットフォームでは、`--start-group` と `--end-group` を使用して複数の `.a` ファイルをリンク。
    - Mac、iOS、およびFuchsiaではこれらのフラグを使用しない。
  - **リンクコマンド**: 
    - `$link -shared` で共有ライブラリを作成し、`{{ldflags}}`、`{{frameworks}}`、`{{solibs}}`、`{{libs}}` を含めます。
    - `-o {{output}}` で出力ファイルを指定。
  - **共通設定**:
    - `outputs`: 出力ファイルのリストを設定。
    - `output_prefix`: 出力ファイルのプレフィックスを `lib` に設定。
    - `default_output_extension`: MacおよびiOSでは `.dylib`、それ以外では `.so` に設定。
    - `description`: リンクタスクの説明を設定。
    - `link_pool_depth` が0以上の場合、リンクプールを設定。

### 実行ファイルのリンク設定 (`link`)
```gn
tool("link") {
  exe_name = "{{root_out_dir}}/{{target_output_name}}{{output_extension}}"
  rspfile = "$exe_name.rsp"
  rspfile_content = "{{inputs}}"

  _start_group = "-Wl,--start-group"
  _end_group = "-Wl,--end-group"
  if (is_mac || is_ios || is_fuchsia) {
    _start_group = ""
    _end_group = ""
  }
  command = "$link {{ldflags}} $_start_group @$rspfile {{frameworks}} {{solibs}} $_end_group {{libs}} -o $exe_name"

  outputs = [ "$exe_name" ]
  description = "link {{output}}"
  if (0 <= link_pool_depth) {
    pool = ":link_pool($default_toolchain)"
  }
}
```
- **説明**:
  - **exe_name**: 出力される実行ファイルの名前。
  - **rspfile**: リンカコマンドのレスポンスファイルの名前。
  - **rspfile_content**: レスポンスファイルに含める入力ファイルリスト。
  - **リンクグループ**: `--start-group` と `--end-group` を使用して複数の `.a` ファイルをリンク。これはGNU ldやGoldリンカで必要です。ただし、Mac/iOSリンカやLLDでは不要です。
  - **command**: リンクコマンド。`$link` を使用し、必要なフラグや入力ファイルを指定して実行ファイルを作成します。
  - **outputs**: 出力ファイルのリスト。
  - **description**: リンクタスクの説明。
  - **pool**: `link_pool_depth` が0以上の場合、リンクプールを設定。

### スタンプツールの設定 (`stamp`)
```gn
tool("stamp") {
  command = "$stamp {{output}}"
  description = "stamp {{output}}"
}
```
- **説明**:
  - **command**: スタンプコマンド。`$stamp` を使用して出力ファイルをスタンプします。
  - **description**: スタンプタスクの説明。

### コピーツールの設定 (`copy`)
```gn
tool("copy") {
  cp_py = rebase_path("../cp.py")
  command = "python3 \"$cp_py\" {{source}} {{output}}"
  description = "copy {{source}} {{output}}"
}
```
- **説明**:
  - **cp_py**: コピー用のPythonスクリプト `cp.py` のパス。
  - **command**: コピーコマンド。`python3` を使用して `cp.py` スクリプトを実行し、ソースファイルを出力ファイルにコピーします。
  - **description**: コピータスクの説明。

### バンドルデータのコピーツールの設定 (`copy_bundle_data`)
```gn
tool("copy_bundle_data") {
  cp_py = rebase_path("../cp.py")
  command = "python3 \"$cp_py\" {{source}} {{output}}"
  description = "copy_bundle_data {{source}} {{output}}"
}
```
- **説明**:
  - **cp_py**: コピー用のPythonスクリプト `cp.py` のパス。
  - **command**: コピーコマンド。`python3` を使用して `cp.py` スクリプトを実行し、バンドルデータをコピーします。
  - **description**: バンドルデータのコピータスクの説明。

### Xcodeアセットのコンパイルツールの設定 (`compile_xcassets`)
```gn
tool("compile_xcassets") {
  command = "true"
  description = "compile_xcassets {{output}}"
}
```
- **説明**:
  - **command**: ダミーコマンド `true` を設定。現在、Xcodeアセットのコンパイルは不要なため、何もしません。
  - **description**: Xcodeアセットのコンパイルタスクの説明。

### ツールチェインの引数設定
```gn
toolchain_args = {
  current_cpu = invoker.cpu
  current_os = invoker.os
}
```
- **説明**:
  - **toolchain_args**: 現在のCPUとOSの情報を設定します。`invoker.cpu` と `invoker.os` を使用します。

### 標準的なGCCライクツールチェインの設定
```gn
gcc_like_toolchain("gcc_like") {
  cpu = current_cpu
  os = current_os
  ar = target_ar
  cc = target_cc
  cxx = target_cxx
  link = target_link
}
```
- **説明**:
  - `gcc_like_toolchain("gcc_like")` は標準的なGCCライクツールチェインを定義します。
  - `cpu` と `os` はそれぞれ `current_cpu` と `current_os` に設定されます。
  - `ar`、`cc`、`cxx`、`link` は、それぞれターゲット環境用のアーカイブ、Cコンパイラ、C++コンパイラ、リンカのパスを設定します。

### ホスト環境用GCCライクツールチェインの設定
```gn
gcc_like_toolchain("gcc_like_host") {
  cpu = host_cpu
  os = host_os
  ar = host_ar
  cc = host_cc
  cxx = host_cxx
  link = host_link
}
```
- **説明**:
  - `gcc_like_toolchain("gcc_like_host")` はホスト環境用のGCCライクツールチェインを定義します。
  - `cpu` と `os` はそれぞれ `host_cpu` と `host_os` に設定されます。
  - `ar`、`cc`、`cxx`、`link` は、それぞれホスト環境用のアーカイブ、Cコンパイラ、C++コンパイラ、リンカのパスを設定します。

### WebAssembly（WASM）用ツールチェインの設定
```gn
if (is_wasm) {
  gcc_like_toolchain("wasm") {
    cpu = "wasm"
    os = "wasm"
    if (host_os == "win") {
      ar = "$skia_emsdk_dir/upstream/emscripten/emar.bat"
      cc = "$skia_emsdk_dir/upstream/emscripten/emcc.bat"
      cxx = "$skia_emsdk_dir/upstream/emscripten/em++.bat"
    } else {
      ar = "$skia_emsdk_dir/upstream/emscripten/emar"
      cc = "$skia_emsdk_dir/upstream/emscripten/emcc"
      cxx = "$skia_emsdk_dir/upstream/emscripten/em++"
    }
    link = cxx
  }
}
```
- **説明**:
  - `is_wasm` が `true` の場合、WebAssembly（WASM）用のGCCライクツールチェインを定義します。
  - `cpu` と `os` はそれぞれ `"wasm"` に設定されます。
  - **Windowsの場合**:
    - `ar`、`cc`、`cxx` はそれぞれ、`$skia_emsdk_dir/upstream/emscripten` ディレクトリにある `emar.bat`、`emcc.bat`、`em++.bat` を使用します。
  - **その他のプラットフォームの場合**:
    - `ar`、`cc`、`cxx` はそれぞれ、`$skia_emsdk_dir/upstream/emscripten` ディレクトリにある `emar`、`emcc`、`em++` を使用します。
  - `link` は `cxx` に設定します。

