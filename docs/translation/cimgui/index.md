# cimgui [![Build Status](https://travis-ci.org/cimgui/cimgui.svg?branch=master)](https://travis-ci.org/cimgui/cimgui)


これは、優れた C++ 即時モード gui [Dear ImGui](https://github.com/ocornut/imgui) のためにプログラム的に生成された、薄い c-api ラッパーです。
imgui.h のすべての関数がプログラムによってラップされています。
生成されたファイルは以下の通りです。生成されるファイルは、Cコンパイル用の `cimgui.cpp`, `cimgui.h` です。また、バインディングの作成を支援するために、関数の定義情報を含む `definitions.lua` と `structs_and_enums.lua` が生成されます。
このライブラリは、Cとのインターフェイスを持つ他の言語（Dなど - [D-binding](https://github.com/Extrawurst/DerelictImgui)を参照）からImGui様を使用できるようにするための中間層として意図されたものです。

沿革:

cimguiは当初Stephan Dillyによって手書きのコードとして開発されましたが、最近ではsonoro1234によってimguiに追いつくために自動生成されたバージョンになっています（ユーザーが希望のブランチを選択してコミットできるようにするためです）。

注意事項
* 現在、このラッパーは、バージョン [1.89.2 of Dear ImGui with internal api] に基づいています。
* imgui.h (オプションで imgui_internal.h) の関数、構造体、列挙型のみがラップされています。
* imguiのバックエンドに興味があれば、[LuaJIT-ImGui](https://github.com/sonoro1234/LuaJIT-ImGui)プロジェクトを見てください。
* cimgui_overloads テーブル(https://github.com/cimgui/cimgui/blob/master/generator/generator.lua#L60)でコード化された名前を除き、すべての命名はアルゴリズムによるものです。正式版では、このテーブルは空です。
* 現在のオーバーロードされた関数名は、(https://github.com/cimgui/cimgui/blob/master/generator/output/overloads.txt) で見ることができます。

# compilation

* clone 
  * `git clone --recursive https://github.com/cimgui/cimgui.git`
  * `git submodule update --init --recursive` (If already cloned)
* compile 
  * linux/macOS/mingwでmakefileを使う (またはCMakeでプロジェクトを生成する)
  * cmakeオプションは、IMGUI_STATIC（スタティックライブラリとしてコンパイル）、IMGUI_FREETYPE（Freetype2使用時）、FREETYPE_PATH（Freetype2 cmakeインストール場所）（cimguiがfreetypeオプションで生成された場合のみ）です。
  * または、https://github.com/sonoro1234/LuaJIT-ImGui/tree/master/build のように
  
  バックエンドでコンパイルするために、SDL2 と opengl3/vulkan のサンプルが backend_test フォルダに用意されています。
  これらは cimgui_sdl モジュールと test_sdl 実行形式を生成します。

# using generator

* これは、提供されたものと異なる imgui バージョンが必要な場合のみ（コンパイルの前に）必要で、それ以外の場合はすでに生成されています。
* LuaJIT (https://github.com/LuaJIT/LuaJIT.git better 2.1 branch) または https://luapower.com/luajit/download の linux/macOS/windows 用にプリコンパイルされたものが必要です。
* プリプロセスを行うためには、C++コンパイラも必要です: gcc (例えばWindowsのMinGW-W64-builds)、clangまたはcl (MSVC). (このレポはgccで作成されています)
* imgui` フォルダを希望のバージョンに更新します。
* gcc、clang、clのいずれかを選択し、バックエンドの選択、imgui_internalを生成するかどうか、Freetype2を使用するかどうか、コメントを生成するかどうかなどを選択します。
* ジェネレーターのデフォルトは、コンパイラーがgcc、imgui_internalが含まれ、バックエンドがsdl, glfw, vulkan, opengl2, opengl3となっています。
* config_generator.lua を編集して、選択したバックエンドで必要な include を追加します (vulkan はこれが必要です)。
* gcc、clang、またはclとLuaJITをPATHに置いて、generator.batまたはgenerator.shを実行します。
* その結果、いくつかのファイルが生成されます。コンパイル用の `cimgui.cpp`、`cimgui.h`、`cimgui_impl.h` とバインディングに関する情報を含むいくつかの lua/json ファイルが生成されます。関数情報を含む `definitions.json`、構造体とenum情報を含む `structs_and_enums.json`、バックエンドの関数情報を含む `impl_definitions.json` があります。
* 呼び出しの最後に、generator.sh または generator.bat にコンパイラのフラグを渡して、コンパイラの動作をさらに指定することができます。(例: -DIMGUI_USER_CONFIG や -DIMGUI_USE_WCHAR32 など)。

# バインディングを生成する

* CIMGUI_DEFINE_ENUMS_AND_STRUCTS を定義すると、C インターフェースが cimgui.h で公開されます。
* あなたの好きな言語で、以下のように生成されたluaまたはjsonファイルを使用することができます。
  * https://github.com/sonoro1234/LuaJIT-ImGui/blob/master/lua/build.bat (luaコードの生成はhttps://github.com/sonoro1234/LuaJIT-ImGui/blob/master/lua/class_gen.lua)
  * https://github.com/mellinoe/ImGui.NET/tree/autogen/src/CodeGenerator

### 定義説明

* オーバーロードがない場合のcimgui名をkey、オーバーロードの配列をvalueとするコレクションです（オーバーロードは1つだけかもしれません）。
* 各オーバーロードはコレクションです。関連するキーと値をいくつか紹介します。
  stname : 関数が属する構造体の名前 (ImGui 名前空間のトップレベルであれば "" になります) * ov_cimguiname : 関数が属する構造体の名前 (ImGui 名前空間のトップレベルであれば"" になります)
  * ov_cimguiname : オーバーロードされたcimguiの名前（存在しなければcimguinameから取得されます）。
  * cimguiname : オーバーロードされない名前 (ov_cimguiname がない場合はこれを使用する)
  * ret : 返り値の型
  * retref : オリジナルの戻り値の型が参照の場合に設定される．(cimguiではポインタになる）．
  * argsT : コレクションの配列（それぞれに type: 引数の型、name: 引数の名前、引数が関数ポインタの場合は ret: 返り値の型、signature: 関数のシグネチャを含む）。
  * args : argsTをカンマで区切って連結した文字列
  * call_args : imgui関数を呼び出すための引数名をカンマ区切りで並べた文字列
  * defaults : keyが引数名、valueがデフォルト値であるコレクション。
  * manual : この関数が手書きであれば真になる（生成されない）。
  * skip : この関数が生成されていない（手書きでない）場合、trueになります。
  * isvarg : ある引数がvarargである場合に設定されます。
  * コンストラクタ : この関数がクラスのコンストラクタである場合に設定されます。
  * destructor : この関数がクラスのデストラクタであり、デフォルトのデストラクタでない場合に設定されます。
  * realdestructor : 関数がクラスのデストラクタである場合に設定します．
  * templated : 関数がテンプレート化されたクラス（ImVector）に属している場合に指定されます．
  * templatedgen : 関数がテンプレートから生成された構造体(ImVector_ImWchar)に属する場合に指定されます．
  * nonUDT : もし存在すれば，元の関数はユーザ定義型を返していたので，シグネチャはUDTへのポインタを第一引数として受け入れるように変更されています．
  * location : この関数が由来するヘッダーファイルとリネン番号の名前。(imgui:000, internal:123, imgui_impl_xxx:123) * is_static_function : この関数のヘッダーファイルの名前とリネン番号。
  * is_static_function : 静的構造体である場合に設定される。

### structs_and_enums の説明

* は、3つの項目からなるコレクションです。
  * 各キーは enum のタグ名で、値はキーを持つコレクションとして表現される順序付けられた値の配列です。
    * name : この列挙された値の名前
    * value : C言語の文字列
    * calc_value : valueに対応する数値
  * キーが構造体名、値が構造体メンバの配列である構造体コレクションが得られます。各構造体は、以下のキーを持つコレクションとして提供されます。
    * type : 構造体のメンバの型
    * template_type : type にテンプレート引数がある場合（ImVector など）、以下のようになります。
    * name : 構造体メンバの名前
    * size : 配列の要素数(配列の場合)
    * bitfield : ビットフィールドの幅(ビットフィールドの場合)
  * キーはenumタグ名または構造体名で、値はヘッダーファイル名と行番号です。

# 使い方

* オリジナルの [imgui.h](https://github.com/ocornut/imgui/blob/master/imgui.h) の ImGui c++ ネームスペースにあるメソッドの先頭に `ig` をつけて使用します。
* メソッドは、同じパラメータリストと戻り値を持つ（可能な限り）。
* 構造体に属する関数は、構造体へのポインターを第一引数に持ちます。
* 関数が UDT (ユーザー定義型) を返す場合、一部のコンパイラーは文句を言うので、関数は UDT 型へのポインタを第一引数 (構造体に属している場合は第二引数) として受け入れるように生成されます。

# バックエンドでの使用

* backend_test フォルダに、SDL と opengl3 でビルドする cmake モジュールがあるはずです。

# cimgui をベースにしたバインディングの例

* [LuaJIT-ImGui](https://github.com/sonoro1234/LuaJIT-ImGui)
* [ImGui.NET](https://github.com/mellinoe/ImGui.NET)
* [nimgl/imgui](https://github.com/nimgl/imgui)
* [kotlin-imgui](https://github.com/Dominaezzz/kotlin-imgui)
* [CImGui.jl](https://github.com/Gnimuc/CImGui.jl)
* [odin-imgui](https://github.com/ThisDrunkDane/odin-imgui)
* [DerelictImgui](https://github.com/Extrawurst/DerelictImgui)
* [BindBC-CimGui](https://github.com/MrcSnm/bindbc-cimgui)
* [imgui-rs](https://github.com/Gekkio/imgui-rs)
* [imgui-pas](https://github.com/dpethes/imgui-pas)
* [crystal-imgui](https://github.com/oprypin/crystal-imgui)

# cimguiをベースにしたC言語の例

* [sdl2_opengl3](https://github.com/cimgui/cimgui/tree/docking_inter/backend_test)
* [sdl2-cimgui-demo](https://github.com/haxpor/sdl2-cimgui-demo)
* [cimgui_c_sdl2_example](https://github.com/canoi12/cimgui_c_sdl2_example/)
* [cimgui-c-example](https://github.com/peko/cimgui-c-example) with GLFW