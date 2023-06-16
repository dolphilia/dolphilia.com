---
aside: false
---

# lua-languages

## Luaにコンパイル可能な言語

Luaは有名ですが、騙されるほどシンプルで、多くの異なるプログラミングパラダイムを可能にします。Javascriptのように、より専門的な構文を追加することで輝かせることが可能です。このリストは、私がML/F#のような言語を探して見つけた言語を記録するために始めました。

注：未整備の言語には(*)を、アーカイブ言語には(^)を付けています。

プルリクエストを歓迎します！

### バイトコードにコンパイルする

[Rochus Keller](https://github.com/rochus-keller)が始めたOberonからLuaJITへのバイトコードコンパイラの開発は、エコシステムを活用するエレガントな方法として興味深いものです：

 - https://github.com/rochus-keller/Oberon/
  Oberon compiler
 - (*) https://github.com/franko/luajit-lang-toolkit
  A Lua to LuaJIT bytecode compiler/toolkit to enable different language frontends and different compilation backends.
 - https://github.com/rochus-keller/LjTools 
  LuaJIT tools, a Qt5 GUI parser, browser, assembler and test VM for LuaJIT 2.0 bytecode

### VM forks
 - https://github.com/mingodad/ljs *ljs* JS-like syntax with modified VMs for PUC Lua, LuaJIT and RaptorJIT
 - https://github.com/PlutoLang/Pluto A superset of Lua 5.4 — with unique features, optimizations, and improvements.

### Tier 1

より良い呼称はありませんが、これらのプロジェクトはよく知られており、または既存の言語をコンパイルしています。

 - http://yuescript.org/
 Yuescript, an extended and actively developed form of Moonscript.
 - http://moonscript.org/
 Moonscript, indentation based syntax, based on the ideas of Coffeescript.
 - http://haxe.org
 Haxe, strongly typed language with both functional and object-oriented features, that has multiple backends
 - https://github.com/yanghuan/CSharp.lua
 C# transpiler

### Go/Go-like

 - (*) https://github.com/gijit/gi translates Go into Lua. It targets LuaJIT for 64-bit integer support.
 - (*) https://github.com/theFox6/LuaVenusCompiler
 Transpiler for [Venus](https://github.com/retroverse/venus), a Go-like language
 - https://github.com/erde-lang/erde Transpiler with Go-like syntax favoring symbols over words

### Typed Lua
 - (^) https://github.com/devcat-studio/kailua
 KaiLua
 - https://github.com/pallene-lang/pallene
 Pallene, friendly fork of Titan
 - (*) https://github.com/titan-lang/titan-v0
 Titan
 - (*) https://github.com/ggVGc/Tua
 Tua
 - https://github.com/teal-language/tl 
 Teal
 - https://github.com/CapsAdmin/NattLua 
 NattLua

### Binary compiled Lua-like
 - https://github.com/dibyendumajumdar/ravi
 and http://ravilang.github.io/
 Ravi
 - http://terralang.org/
 Terra
 - https://github.com/edubart/nelua-lang
 Nelua, Natively Extensible Lua
 
### Strongly typed
 - https://github.com/rochus-keller/Oberon/
 Oberon
 - https://github.com/wu-lang/wu Slightly Rusty with classes and traits

### Javascript
 - (*) https://github.com/PaulBernier/castl
 Javascript transpiler
 - (*) https://github.com/seanjensengrey/colony-js
 Javascript transpiler
 - (*) https://github.com/saharNooby/lua-js-syntax Javascript inspired syntax

### TypeScript
- https://github.com/roblox-ts/roblox-ts
- (*) https://github.com/ASDAlexander77/TypeScriptLua
- https://github.com/TypeScriptToLua/TypeScriptToLua

### Functional
- (^) https://amulet.works An ML-like functional programming language that transpiles to lua
- https://github.com/kindl/Hypatia Hypatia, an ML-like language that transpiles to Lua
- (*) https://github.com/ptol/oczor
Haskell-like language that compiles to Lua, Javascript, Emacs lisp and Ruby
- (*) https://github.com/iitalics/Lua-ML Basic ML language
- (*) https://github.com/hengestone/pumpkin ML-like language with an experimental Lua back-end
- https://github.com/minoki/LunarML A Standard ML compiler that produces Lua
- https://github.com/Russoul/Idris2-Lua A Lua backend for Idris 2
 
### Lisp
There are so many Lisp variants, they deserve their own category.
 - (*) https://squiddev.github.io/urn/
 Urn, Lisp dialect, extensive libraries
 - https://github.com/bakpakin/Fennel
 Lisp compiler and library
 - (*) https://github.com/meric/l2l
 l2l (lisp) superset of Lua
 - (*) https://github.com/larme/hua
 Hua, Lisp dialect
 - (*) http://leafo.net/moonlisp/
 Lisp implemented in Moonscript
 - (*) https://github.com/sctb/lumen Small Lisp
 - (*) https://github.com/bullno1/mLisp
 - (*) https://github.com/WeirdConstructor/lal
 Scheme
 - (*) https://github.com/adamrk/scheme2luac
 Scheme
 - https://github.com/LuxLang/lux
 Statically typed, functional lisp with an ML-like module system
 
 ### C
 - (*) https://github.com/davidgiven/clue
 
 ### Python
  - (*) https://github.com/MrVallentin/PyLua
  - (*) https://github.com/NeonMercury/python-lua
  - https://github.com/MhadhbiXissam/pythonicLua
 
### Ruby
 - (*) https://github.com/Kilobyte22/Mlc
 
### Rust
 - https://github.com/ClueLang/Clue
 Clue, a language similar to Rust that compiles to any version of Lua
 
### Unique
 - (*) https://github.com/presidentbeef/brat Brat, using [MoonJIT](https://github.com/moonjit/moonjit)
 - (*) https://github.com/richardhundt/shine Shine, using [TvmJit](https://github.com/perl11/tvmjit)
 - (*) https://github.com/apotheon/vortex Vortex 
 - (*) https://github.com/tommo/yu Yu
 - (*) https://github.com/Reuh/candran Candran
 
### Other
 - (*) https://github.com/marcoonroad/moonforth Forth to Lua transpiler
 - https://github.com/tjdevries/vim9jit vim9script to Lua transpiler
