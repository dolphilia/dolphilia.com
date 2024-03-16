# Lua/C API 拡張

LuaJITは、標準のLua/C APIにいくつかの拡張を加えています。Cコード用の必要なヘッダーをインクルードするには、コンパイラの検索パスにLuaJITのインクルードディレクトリが含まれている必要があります(-Ipath)：

```c
#include "luajit.h"
```

またはC++コードの場合：

```c
#include "lua.hpp"
```

## luaJIT_setmode(L, idx, mode) — VM の制御

これはCコードからVMを制御するためのC API拡張です。LuaJIT_setmodeの完全なプロトタイプは以下の通りです：

```c
LUA_API int luaJIT_setmode(lua_State *L, int idx, int mode);
```

返されるステータスは成功（1）または失敗（0）です。第二引数は0またはスタックインデックス（他のLua/C API関数と同様）です。

第三引数はモードを指定し、フラグと'or'されます。フラグは機能をオフにするLUAJIT_MODE_OFF、機能をオンにするLUAJIT_MODE_ON、またはキャッシュされたコードをフラッシュするLUAJIT_MODE_FLUSHにすることができます。

以下のモードが定義されています：

#### luaJIT_setmode(L, 0, LUAJIT_MODE_ENGINE|flag)

JITコンパイラ全体をオンまたはオフにするか、コンパイルされたコードのキャッシュ全体をフラッシュします。

#### luaJIT_setmode(L, idx, LUAJIT_MODE_FUNC|flag)
#### luaJIT_setmode(L, idx, LUAJIT_MODE_ALLFUNC|flag)
#### luaJIT_setmode(L, idx, LUAJIT_MODE_ALLSUBFUNC|flag)

これは、スタックインデックスidxの関数、または呼び出し関数の親(idx = 0)のモードを設定します。関数のJITコンパイルを有効にするか、無効にして既にコンパイルされたコードをフラッシュするか、既にコンパイルされたコードをフラッシュするかを行います。これはLUAJIT_MODE_ALLFUNCを用いた関数の全てのサブ関数、またはLUAJIT_MODE_ALLSUBFUNCを用いたサブ関数のみに再帰的に適用されます。

#### luaJIT_setmode(L, trace, LUAJIT_MODE_TRACE|LUAJIT_MODE_FLUSH)

指定されたルートトレースとそのすべてのサイドトレースをキャッシュからフラッシュします。他にリンクしているトレースが存在する限り、トレースのコードは保持されます。

#### luaJIT_setmode(L, idx, LUAJIT_MODE_WRAPCFUNC|flag)

このモードはC関数への呼び出しに対するラッパー関数を定義します。LUAJIT_MODE_ONで呼び出された場合、idxでのスタックインデックスは、ラッパー関数へのポインターを保持するlightuserdataオブジェクトでなければなりません。これ以降、すべてのC関数はラッパー関数を介して呼び出されます。LUAJIT_MODE_OFFで呼び出された場合、このモードはオフになり、すべてのC関数は直接呼び出されます。

ラッパー関数は、デバッグ目的や外部の例外をキャッチして変換するために使用できます。ただし、C++例外の相互運用性に関するセクションを先に読んでください。推奨される使用方法は、このC++コードの抜粋で見ることができます：

```cpp
#include <exception>
#include "lua.hpp"

// C++の例外をキャッチしてLuaエラーメッセージに変換します。
// 必要に応じて独自の例外クラスに合わせてカスタマイズしてください。
static int wrap_exceptions(lua_State *L, lua_CFunction f)
{
  try {
    return f(L);  // ラップされた関数を呼び出し、結果を返す。
  } catch (const char *s) {  // 例外をキャッチして変換する。
    lua_pushstring(L, s);
  } catch (std::exception& e) {
    lua_pushstring(L, e.what());
  } catch (...) {
    lua_pushliteral(L, "caught (...)");
  }
  return lua_error(L);  // Luaエラーとして再スローする。
}

static int myinit(lua_State *L)
{
  ...
  // ラッパー関数を定義して有効にする。
  lua_pushlightuserdata(L, (void *)wrap_exceptions);
  luaJIT_setmode(L, -1, LUAJIT_MODE_WRAPCFUNC|LUAJIT_MODE_ON);
  lua_pop(L, 1);
  ...
}
```

グローバルラッパー関数は1つだけ定義できることに注意してください。そのため、複数のC++モジュールからこのメカニズムを使用する場合は注意が必要です。また、このメカニズムにはオーバーヘッドがあることにも注意してください。