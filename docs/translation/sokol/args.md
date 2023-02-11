# sokol_args.h

ウェブとネイティブのためのクロスプラットフォームなキー/バリューのargパーシング

プロジェクトURL: https://github.com/floooh/sokol

このファイルをCまたはC++ファイルにインクルードして実装を作成する前に記述してください。

```c
#define SOKOL_IMPL
```

または

```c
#define SOKOL_ARGS_IMPL
```

オプションとして、以下の定義を独自の実装で提供する。

- SOKOL_ASSERT(c)     - 独自のアサートマクロ (デフォルト: assert(c))
- SOKOL_ARGS_API_DECL - 公開関数宣言のプレフィックス (デフォルト: extern)
- SOKOL_API_DECL      - SOKOL_ARGS_API_DECL と同じです。
- SOKOL_API_IMPL      - public 関数実装の接頭辞（デフォルト：-）。

sokol_args.hをDLLとしてコンパイルする場合、宣言や実装を含める前に以下を定義してください。

```c
SOKOL_DLL
```

Windowsでは、SOKOL_DLLは必要に応じてSOKOL_ARGS_API_DECLを __declspec(dllexport) または __declspec(dllimport) として定義します。


## 概要

sokol_args.h は、WebAssembly およびネイティブ・アプリケーションのための、シンプルで統一された引数解析 API を提供します。
ネイティブアプリのためのシンプルな統一引数解析APIを提供します。

WebAssemblyアプリとして実行する場合、引数はページURLから取得されます。

```
https://floooh.github.io/tiny8bit/kc85.html?type=kc85_3&mod=m022&snapshot=kc85/jungle.kcc
```

コマンドラインアプリに提供されるのと同じ引数です。

```
kc85 type=kc85_3 mod=m022 snapshot=kc85/jungle.kcc
```

## 引数書式

ウェブプラットフォームでは、引数は有効なURLクエリー文字列としてフォーマットされ、特殊文字には「パーセントエンコーディング」が使用されなければなりません。

文字列はUTF-8でエンコードされていることが期待されます(sokol_args.hは特別なUTF-8処理を含んでいませんが)。WindowsでWinMain()をエントリポイントとして使用する場合、 UTF-8エンコードされたargc/argvの値を取得する方法については、以下を参照してください。

ネイティブ環境では、以下のルールに従わなければなりません。

引数は一般に

```
key=value
```

の形式をとる。

キーと値のペアは空白で区切られ、有効な空白文字はスペースとタブである。

区切り文字'='の前後にある空白文字は無視されます。

```
key = value
```

以下と同じです。

```
key=value
```

key' の文字列は、エスケープシーケンスや空白を含まない単純な文字列でなければならない。

現在、値を持たない「単一のキー」は許可されていませんが、将来的には許可される可能性があります。

value' 文字列は引用符で囲むことができ、引用符で囲んだ値文字列は空白を含むことができる。

```
key = 'single-quoted value'
key = "double-quoted value"
```

一重引用符で囲まれた値文字列は二重引用符を含むことができ、その逆も可能である。

```
key = 'single-quoted value "can contain double-quotes"'
key = "double-quoted value 'can contain single-quotes'"
```

コマンドシェルでは、引用符がエスケープされていないと削除されることがあるため、シェルによっては正しい引用符付けができない場合があることに注意してください。

値の文字列は、少数のエスケープシーケンスを含むことができます。

- `\n`  - newline
- `\r`  - carriage return
- `\t`  - tab
- `\\`  - escaped backslash

(今後、エスケープコードが追加される可能性があります）。

## コード例

```c
int main(int argc, char* argv[]) {
    // sokol_args をデフォルトのパラメータで初期化する。
    sargs_setup(&(sargs_desc){
        .argc = argc,
        .argv = argv
    });

    // キーが存在するかどうか確認します。
    if (sargs_exists("bla")) {
        ...
    }

    // キーに対応する値の文字列を取得し、見つからない場合は空の文字列 "" を返す。
    const char* val0 = sargs_value("bla");

    // キーに対応する値の文字列を取得する。キーが見つからない場合は、デフォルトの文字列を取得する。
    const char* val1 = sargs_value_def("bla", "default_value");

    // キーが期待される値に一致するかどうかをチェックする
    if (sargs_equals("type", "kc85_4")) {
        ...
    }

    // キーが "true"、"yes"、"on "であるかどうかを確認する。
    if (sargs_boolean("joystick_enabled")) {
        ...
    }

    // キーと値を反復する
    for (int i = 0; i < sargs_num_args(); i++) {
        printf("key: %s, value: %s\n", sargs_key_at(i), sargs_value_at(i));
    }

    // 引数のインデックスをキー文字列で検索し、キーが見つからなければ-1を返す、 sargs_key_at() と sargs_value_at() は無効なインデックスに対しては空文字列を返す
    int index = sargs_find("bla");
    printf("key: %s, value: %s\n", sargs_key_at(index), sargs_value_at(index));

    // シャットダウン sokol-args
    sargs_shutdown();
}
```

## WinMainとargc/argv

WinMain()ベースのアプリを使用しているWindowsでは、UTF8エンコードされたコマンドライン引数を取得するのは少し複雑です。

まず、GetCommandLineW()を呼び出すと、コマンドライン全体がUTF-16文字列として返されます。次にCommandLineToArgvW()を呼びます。これはコマンドラインの文字列を通常のargc/argv形式（ただしUTF-16）にパースします。最後に WideCharToMultiByte() で argv[] 内の UTF-16 文字列を UTF-8 に変換します。

これを行う方法については、sokol_app.hの_sapp_win32_command_line_to_utf8_argv()という関数を参照してください。（もしsokol_app.hを使っていれば、もちろんコマンドラインの引数はすでにUTF-8に変換されていますので、sokol_app.hに直接それらを差し込むことができます）。

## APIドキュメント

```c
void sargs_setup(const sargs_desc* desc)
```

sokol_argsを初期化する。descには以下の設定が含まれる。

パラメータ:

- int argc        - 主関数の argc パラメータ
- char** argv     - 主関数の argv パラメータ
- int max_args    - キーと値のペアの最大数、デフォルトは16です。
- int buf_size    - 内部文字列バッファのサイズ、デフォルトは16384

なお、Web上ではargcとargvは無視され、代わりにページのURLから引数が取得されます。

sargs_setup() は2つのメモリチャンクを確保します。1つはサイズ 'max_args*8' のキー/値引数を追跡するためのもので、もう1つはサイズ 'buf_size' の文字列バッファです。

```c
void sargs_shutdown(void)
```

sokol-argsをシャットダウンし、割り当てられたメモリをすべて解放する。

```c
bool sargs_isvalid(void)
```
sargs_setup()とsargs_shutdown()の間でtrueを返す。

```c
bool sargs_exists(const char* key)
```

キーargが存在するかどうかをテストする。

```c
const char* sargs_value(const char* key)
```

key に対応する戻り値。キーが存在しない場合は、空文字列 ("") を返す。

```c
const char* sargs_value_def(const char* key, const char* default)
```

key に関連付けられた値、または値が存在しない場合は提供されたデフォルト値を返す。

```c
bool sargs_equals(const char* key, const char* val);
```

key に関連付けられた値が引数 'val' に一致する場合、true を返す。

```c
bool sargs_boolean(const char* key)
```

key' の値の文字列が 'true', 'yes', 'on' のいずれかであるとき、true を返す。

```c
int sargs_find(const char* key)
```

キー名で引数を検索し、そのインデックスを返す（見つからなければ-1）。

```c
int sargs_num_args(void)
```

キーと値のペアの数を返す。

```c
const char* sargs_key_at(int index)
```

インデックスにある引数のキー名を返す。index が範囲外の場合、空文字列を返す。

```c
const char* sargs_value_at(int index)
```

index にある引数の値を返す。index が範囲外の場合は空文字列を返す。


## メモリ割り当てのオーバーライド

次のように初期化時にメモリ割り当て関数をオーバーライドすることができます。

```c
void* my_alloc(size_t size, void* user_data) {
    return malloc(size);
}

void my_free(void* ptr, void* user_data) {
    free(ptr);
}

...
    sargs_setup(&(sargs_desc){
        // ...
        .allocator = {
            .alloc = my_alloc,
            .free = my_free,
            .user_data = ...,
        }
    });
...
```

オーバーライドが提供されない場合、malloc と free が使用されます。

これは、sokol_args.h自身によって行われるメモリ割り当ての呼び出しにのみ影響し、OSライブラリでの割り当ては影響しませんが。

## TODO

- パースエラー？

## LICENSE

zlib/libpng license

Copyright (c) 2018 Andre Weissflog

This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from the
use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

    1. The origin of this software must not be misrepresented; you must not
    claim that you wrote the original software. If you use this software in a
    product, an acknowledgment in the product documentation would be
    appreciated but is not required.

    2. Altered source versions must be plainly marked as such, and must not
    be misrepresented as being the original software.

    3. This notice may not be removed or altered from any source
    distribution.