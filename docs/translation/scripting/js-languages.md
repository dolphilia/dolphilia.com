---
aside: false
---

JavaScriptやその他多くのトランスパイラにコンパイル可能な言語のリスト

## 目次

- [CoffeeScript + Family & Friends](#coffeescript--family--friends)
  * [Family (share genes with CoffeeScript)](#family-share-genes-with-coffeescript)
  * [Friends (philosophically related)](#friends-philosophically-related)
- [JavaScript Extensions](#javascript-extensions)
  * [Security enforcing JavaScript](#security-enforcing-javascript)
  * [Static typing](#static-typing)
  * [Synchronous to Asynchronous JavaScript Compilers (CPS)](#synchronous-to-asynchronous-javascript-compilers-cps)
  * [JavaScript Language Extensions](#javascript-language-extensions)
- [Ruby](#ruby)
- [Python](#python)
- [Erlang](#erlang)
- [Elixir](#elixir)
- [Perl](#perl)
- [Java/JVM](#javajvm)
- [Scala](#scala)
- [C#, F#, .NET related languages](#c-f-net-related-languages)
- [Lisp, Scheme](#lisp-scheme)
  * [Clojure-like](#clojure-like)
  * [Scheme-like](#scheme-like)
  * [Other](#other)
- [OCaml](#ocaml)
- [Haskell](#haskell)
- [Smalltalk](#smalltalk)
- [C/C++](#cc)
- [Basic](#basic)
- [Pascal, Modula, Oberon](#pascal-modula-oberon)
- [Go](#go)
- [Multitarget](#multitarget)
- [Tierless languages (produce both client & server)](#tierless-languages-produce-both-client--server)
- [Visual programming tools](#visual-programming-tools)
- [SQL](#sql)
- [PHP](#php)
- [Lua](#lua)
- [Prolog](#prolog)
- [Others](#others)
- [Tools for Compiler Writers](#tools-for-compiler-writers)
  * [JavaScript Parsers and Extensions](#javascript-parsers-and-extensions)
  * [JavaScript Optimizers](#javascript-optimizers)
  * [JavaScript Parser Generators](#javascript-parser-generators)
  * [JavaScript AST, Semantics](#javascript-ast-semantics)

## CoffeeScript + Family & Friends

| Name | Description | Last commit |
| :---- | :---- | :---- |
| [CoffeeScript](http://coffeescript.org/) | Unfancy JavaScript | 2020-01-31 |
| [CoffeeScript II: The Wrath of Khan](https://github.com/michaelficarra/CoffeeScriptRedux) | Rewrite of the CS compiler | 2017-04-13 |

### Family (share genes with CoffeeScript)

| Name | Description | Last commit |
| :---- | :---- | :---- |
| [Coco](https://github.com/satyr/coco) | A CoffeeScript dialect that aims to be more radical and practical, also acts as a test bed for features that get imported in CoffeeScript. | 2014-09-28 |
| [LiveScript](http://livescript.net) | A fork of Coco that is much more compatible with CoffeeScript, more functional, and with more features. | 2018-11-11 |
| [IcedCoffeeScript](http://maxtaco.github.io/coffee-script/) | A CoffeeScript dialect that adds support for `await` and `defer` keywords which simplify async control flow. | 2019-11-27 |
| [Parsec CoffeeScript](https://github.com/fab13n/parsec-coffee-script) | CS based on parser combinators. The project's aim is to add static metaprogramming (i.e. macros + syntax extensibility) to Coffee Script (CS), similar to how Metalua adds such features to Lua. The resulting compiler, once merged with the official compiler, should be usable as a drop-in replacement for it. | 2015-11-18 |
| [Contracts.coffee](https://github.com/disnet/contracts.coffee) | A dialect of CoffeeScript that adds built-in support for contracts. | 2014-08-08 |
| [Uberscript](https://github.com/jstrachan/coffee-script/blob/master/TypeAnnotations.md) | A CoffeeScript fork that adds type annotations which are compiled to Google closure compiler type annotation comments. | 2013-09-16 |
| [ToffeeScript](https://github.com/jiangmiao/toffee-script) | A dialect of CoffeeScript that support Asynchronous Syntax and Regexp operator =~ | 2018-04-02 |
| [Caffeine](https://github.com/ich/caffeine) | A dialect of CoffeeScript that supports packages and classes import, useful for browser applications | 2013-06-03 |
| [heap.coffee](https://github.com/syg/heap.coffee) | A dialect of CoffeeScript that offers a C-like type system with manual memory management | 2012-05-13 |
| [EmberScript](http://emberscript.com) | Ember.js-infused CoffeeScript. | 2015-04-02 |
| [BlackCoffee](https://github.com/paiq/blackcoffee) | CoffeeScript with hygienic macros. See also [#3171](https://github.com/jashkenas/coffeescript/pull/3171) | 2014-11-28 |
| [Storymatic](https://storymatic.zsnout.com) | A dialect of CoffeeScript rewritten from scratch to support typed languages. | 2022-06-04 |
| [Civet](https://civet.dev/) | Written from scratch, aims to be 97+% compatible with existing CoffeeScript2 (via compiler pragmas) while also being 99% TS compatible. | 2023-02-13

### Friends (philosophically related)

| Name | Description | Last commit |
| :---- | :---- | :---- |
| [NodeScript](https://github.com/gdg/nodescript) | JavaScript without the Variable Declarations and Semicolons | 2017-11-01 |
| [Bizubee](https://github.com/bizubee/bizubee) | The World's Most Intense Programming Language! | 2017-02-08 |
| [Kaffeine](https://github.com/weepy/kaffeine) | Enhanced Syntax for JavaScript. | 2012-08-21 |
| [Moescript](https://github.com/tcdona/moescript) | Indent-based language. The original repository at https://github.com/moescript/moescript is missing. The link is to a surviving fork. | 2012-04-14 |
| [pogoscript](https://github.com/featurist/pogoscript) | Language that emphasises readability, handles async control flow nicely, is friendly to domain specific languages and compiles to regular JavaScript | 2015-08-11 |
| [LispyScript](https://github.com/santoshrajan/lispyscript) | A JavaScript with Lispy syntax and Macros. *[○](#other "this item appears twice in this list; jump to its other instance")* | 2020-01-28 |
| [Hot Cocoa Lisp](https://github.com/olleicua/hcl) | A Lisp-like language that compiles to JavaScript. *[○](#other "this item appears twice in this list; jump to its other instance")* | 2015-03-15 |
| [Sibilant](https://sibilant.org/) | JavaScript with a lisp. *[○](#other "this item appears twice in this list; jump to its other instance")* | 2017-12-20 |
| [ki](http://ki-lang.org) | Clojure-like syntax, [mori](http://swannodette.github.io/mori/)'s immutable data structures in a few [sweet.js](http://sweetjs.org) macros. Can be intermixed with JavaScript. *[○](#clojure-like "this item appears twice in this list; jump to its other instance")* | 2016-02-06 |
| [jisp](https://github.com/mitranim/jisp) | A JS-native and axiomatic Lisp that focuses on the core ideas of code-as-data, S-expressions, and macros, introducing as few new concepts as possible. *[○](#other "this item appears twice in this list; jump to its other instance")* | 2015-03-20 |
| [Ham](https://github.com/jameskeane/ham-script) | Looks very similar to JavaScript at first, but offers (hopefully) many useful features | 2013-05-27 |
| [GorillaScript](http://ckknight.github.com/gorillascript/) | Compile-to-JavaScript language designed to empower the user while attempting to prevent some common errors, offers Macros, optional Typing, and asynchronous syntax. | 2013-07-16 |
| [RedScript](https://github.com/AdamBrodzinski/RedScript) | Elixir-flavored JavaScript. | 2018-04-04 |
| [Daonode](https://github.com/chaosim/daonode) | Functional logic solver, compiler. | 2015-11-26 |
| [LiteScript](https://github.com/luciotato/LiteScript) | Literate, highly-readable, type annotated, imperative language that compiles to JavaScript. | 2018-06-22 |
| [ColaScript](https://github.com/TrigenSoftware/ColaScript) | Similar to Dart, CoffeeScript, Python and PHP | 2015-02-03 |
| [Taijilang](https://github.com/taijiweb/taijilang) | A customizable and extensible language with dynamic parser and meta language. | 2015-11-27 |
| [MoonScript](http://moonscript.org/) | MoonScript is a dynamic scripting language that compiles into Lua. The syntax of MoonScript has been heavily inspired by the syntax of CoffeeScript. | 2020-02-02 |
| [Earl Grey](http://www.earl-grey.io/) | An extensible language with pattern matching, hygienic macros and a syntax similar to Python. | 2017-08-14 |
| [Khepri](https://github.com/mattbierner/khepri) | Lightweight language that reworks Javascript's syntax to be better for untyped functional-style programming. | 2015-05-16 |
| [Spider](https://github.com/alongubkin/spider) | Spider is a programming language that compiles to JavaScript (ES5 and ES6 targets). It takes the best ideas of Go, Swift, Python, C# and CoffeeScript. | 2017-10-21 |
| [CirruScript](http://script.cirru.org/) | Write JavaScript with indentations and polish notations, similar to S-Expression but with fewer parentheses. | 2020-01-28 |
| [TLC](https://github.com/michaelchance/tlc) | Tag Line Commands is a inline macro language for calling+formatting javascript/coffeescript/livescript json output into HTML. | 2015-07-26 |
| [CokeScript](https://github.com/batiste/CokeScript) | Inspired by Python and Ruby that integrates natively with the [Virtual-DOM library](https://github.com/Matt-Esch/virtual-dom) | 2018-07-05 |
| [imba](http://imba.io/) | Full-stack programming language for the Web that compiles to performant JavaScript | 2020-02-26 |
| [Cor](http://yosbelms.github.io/cor) | Straightforward language for the Web | 2016-12-11 |
| [Iode](https://github.com/iode-lang/iode) | A language inspired by Swift | 2016-03-28 |
| [FutureScript](http://futurescript.org/) | A more radical, but more readable, different new language. | 2018-12-11 |
| [PearScript](https://github.com/kocisov/pearscript) | Shorthanding JavaScript one more time. | 2016-01-28 |
| [RamdaScript](https://github.com/yosbelms/ramdascript) | JavaScript in the Ramda way. | 2018-01-23 |
| [RoyalScript](https://github.com/jweinst1/Royalscript) | A functional language that has loops, types, structs, and much more. | 2017-03-23 |

## JavaScript Extensions

### Security enforcing JavaScript

| Name | Description |
| :---- | :---- |
| [Caja](https://developers.google.com/caja/) | Compiles ES5/strict to ES3 and supports object-capabilities |
| [ADsafe](http://www.adsafe.org/) | Client-side static verifier and API, making third party scripts safe. |
| [Jacaranda](http://jacaranda.org/) | Static verifier supporting object-capabilities. |
| [Dojo Secure](http://www.sitepen.com/blog/2008/08/01/secure-mashups-with-dojoxsecure/) | Framework for building secure mashups. |

### Static typing

**NOTE:** Some of the projects listed below are also statically typed, such as mobl, GWT, JSIL, NS Basic, and Haxe.

| Name | Description |
| :---- | :---- |
| [Dart](http://www.dartlang.org/) | C/Java-like syntax with optional typing by Google. |
| [TypeScript](http://www.typescriptlang.org/) | Typed superset of JavaScript by Microsoft. |
| [TeJaS](http://www.jswebtools.org/) | From Brown PLT. Types for JavaScript (itself). |
| [asm.js](http://asmjs.org/) | Subset of JavaScript that can be used as a low-level, efficient target language for compilers. Now included in Firefox. |
| [JavaScript++](http://www.jspplang.org/) | JavaScript superset with classes, type checking, among other features |
| [Mascara](http://www.mascaraengine.com/) | [commercial] Enhances JavaScript with powerful features like classes, namespaces and type-checking. |
| [Roy](http://roy.brianmckenna.org/) | Tries to meld JavaScript semantics with some features common in static functional languages |
| [Elm](http://elm-lang.org/) | Type-safe functional language that compiles to HTML, CSS, and JavaScript. |
| [Swym](http://cheersgames.com/swym/wiki/index.php?title=Main_Page) | Statically typed, with type inference and generics |
| [Typecast.js](http://typecastjs.org) | JavaScript platform for statically typed variables without a custom compiler. |
| [PureScript](http://purescript.org) | A small, strongly typed programming language that compiles to JavaScript and C++, featuring extensible records and effects, and type classes. |
| [Flow](http://flowtype.org) | Static type checker for JavaScript, supports optional types and null checks by Facebook. |
| [ActionScript](http://royale.apache.org/download/) | With Apache Royale ASJS (formerly FlexJS) - Based on ECMAScript 4, ActionScript provides typing and can be compiled to JavaScript. |
| [ReScript](https://rescript-lang.org/) | (Formerly BuckleScript) Compiles OCaml, and its syntax extension [Reason](https://reasonml.github.io/), to readable JavaScript, enabling powerful static type-checking, among other features. *[○](#OCaml "this item appears twice in this list; jump to its other instance")* |

### Synchronous to Asynchronous JavaScript Compilers (CPS)

| Name | Description |
| :---- | :---- |
| [Streamline.js](https://github.com/Sage/streamlinejs) | Uses underscore (\_) to stand for callbacks. This [fork](https://github.com/willconant/streamlinejs) preserves line numbers for debugging. |
| [mobl](http://www.mobl-lang.org) | The new language for programming the mobile web. |
| [StratifiedJS](http://onilabs.com/stratifiedjs/) | JavaScript + structured concurrency. |
| [NarrativeJS](http://www.neilmix.com/narrativejs/doc/) | JavaScript extension with asynchronous futures and promises. |
| [jwacs](http://chumsley.org/jwacs/) | JavaScript With Advanced Continuation Support. |
| [Wind.js](https://github.com/JeffreyZhao/wind) | Wind.js is an advanced library which enable us to control flow with plain JavaScript for asynchronous programming (and more) without additional pre-compiling steps. |
| [TameJS](http://tamejs.org/) | Adds new keywords 'await' and 'defer' |
| [Continuation.js](https://github.com/BYVoid/continuation) | A lightweight JIT compiler for simplifying asynchronous JavaScript programming with no runtime dependences. It supports both Node.js and browser-side JavaScript and is compatible with CoffeeScript (also TypeScript, and any other scripts compile to js). |
| [Kal](http://rzimmerman.github.io/kal/) | Makes asynchronous programming easy and clean by allowing functions to pause and wait for I/O, replacing an awkward callback syntax with a clean, simple syntax |
| [JSPipe](http://jspipe.org) | Provides JavaScript primitives to write async code without callbacks or chained functions. Inspired by Goroutines and Channels found in Go and in Clojure. For Web and NodeJS. ES5 and ES6. |
| [promiseLand](http://promise-land.net) | PromiseLand is a very promising Language. It includes ES5 strict mode, uses the * dereferencing operator to access promise results and introduces additional features designed to let you focus on your program logic. Such as dynamic typesafety, frame addressing, generic load and safe features. |

### JavaScript Language Extensions

| Name | Description |
| :---- | :---- |
| [ContextJS](https://www.hpi.uni-potsdam.de/hirschfeld/trac/Cop/wiki/ContextJS) | An implementation of [Context-oriented Programming](http://www.hpi.uni-potsdam.de/hirschfeld/cop/) for JavaScript. |
| [Objective-J](http://www.cappuccino.dev/learn/objective-j.html) | Shares with JavaScript the same relationship that Objective-C has with the C programming language: that of being a strict, but small, superset. |
| [Mochiscript](https://github.com/jeffsu/mochiscript) | Object-oriented JavaScript with syntactic sugar. Released as a Ruby gem. |
| [jangaroo](http://www.jangaroo.net/home/) | AS3 (ActionScript) to JavaScript. |
| [Flapjax](http://flapjax-lang.org/) | Event-driven, reactive evaluation. |
| [jLang](https://github.com/jmbrito01/jlang) | Adds object oriented syntax, namespaces, operators overriding |
| [Restrict Mode](http://restrictmode.org/) | |
| [TIScript](http://www.codeproject.com/KB/recipes/TIScript.aspx) | Gentle extension of JavaScript |
| [Six](https://github.com/matthewrobb/six) | Six is a language super-set of JavaScript that enables new syntactic features from the 6th edition of ECMAScript to be used, through a transpiler, in your scripts today. |
| [js--](https://github.com/janpaul123/jsdares/tree/master/app/jsmm-applet/jsmm) | JavaScript subset for [interactive/visual programming](http://www.jsdares.com/blindfold). |
| [Latte JS](https://github.com/tehsenaus/latte-js/) | Superset of JavaScript (eventually ES6), with similar goals to CoffeeScript, but keeping JS syntax. |
| [JSX](http://facebook.github.io/react/docs/jsx-in-depth.html) | A superset to add an XML-like syntax to represent HTML elements in React by Facebook |
| [oj](https://github.com/musictheory/oj) | Objective-C inspired superset of JavaScript with a tiny runtime, built-in obfuscator, and experimental type checker (courtesy of Typescript). |
| [mfjs](https://github.com/awto/mfjs-compiler) | Adds arbitrary side effects not already available in JavaScript. They may include but not limited to delimited continuations, asynchronous, logic, reactive, parallel, distributed and probabilistic programming. It doesn't extend syntax so it may be used with any other language compiling to JavaScript. |

## Ruby

| Name | Description |
| :---- | :---- |
| [Opal](https://opalrb.com/) | Ruby to JavaScript compiler. |
| [HotRuby](http://hotruby.yukoba.jp/) | Runs opcode, compiled by YARV on Ruby inside a web browser or in Flash. |
| [ColdRuby](https://github.com/whitequark/coldruby) | Compiler of Ruby 1.9 MRI bytecode, and a runtime written in JavaScript to aid in execution of Ruby code. |
| [rb2js](http://rb2js.rubyforge.org/) | Converts Ruby to JavaScript. |
| [RubyJS](http://rubyjs.org/) | A successor to rb2js |
| [Red](https://github.com/backtik/red) | Writes like Ruby and runs like JavaScript |
| [Quby](http://www.playmycode.com/docs/quby) | Used for game coding site, [open source](https://github.com/PlayMyCode/Quby). |
| [8ball](https://github.com/mattknox/8ball) | Ruby-to-JavaScript source-to-source transformer |
| [Ruby2JS](https://github.com/rubys/ruby2js) | Minimal yet extensible Ruby to JavaScript conversion. |
| [ruby-parser.js](https://github.com/peter-leonov/ruby-parser.js) | Original Ruby 2.0 parser ported to pure JavaScript, produces AST |

## Python

| Name | Description |
| :---- | :---- |
| [Pyodide](https://github.com/iodide-project/pyodide) | CPython, the reference Python implementation, compiled to WASM. Also includes the Python scientific stack.
| [PYXC-PJ](https://github.com/andrewschaaf/pyxc-pj/) | [CS friend] Python to JS. Can generate a (line/col)-number mappings file. (Dead. Last updated 8 years ago.) |
| [Pyjamas](http://pyjs.org/) | Python to JS. |
| [Pyjaco](https://github.com/chrivers/pyjaco) | Python to JavaScript compiler with module support. |
| [Pyjs](https://github.com/anandology/pyjs) | Python to (readable) JS. |
| [Skulpt](http://www.skulpt.org/) | Python. Client side. |
| [PyCow](https://github.com/p2k/PyCow) | Python to MooTools JS. |
| [PyvaScript](http://www.allbuttonspressed.com/blog/django/2010/07/PyvaScript-Pythonic-syntax-for-your-browser) | Python-like syntax to JavaScript. |
| [RapydScript](https://github.com/atsepkov/RapydScript) | JavaScript with a Pythonic syntax. |
| [Bulbul](https://github.com/ahmedaliadeel/bulbul) | Python3 to JavaScript/ES6/ES7 compiler. Apparently the only Python-to-JS compiler intended to provide support for AngularJS, React, Aurelia and other modern JS libs. |
| [Brython](https://github.com/brython-dev/brython) | Browser Python. Embed Python 3 in \<script type="text/python"> |
| [PythonScript](http://apppyjs.appspot.com/) | Python-like compiled to JavaScript |
| [pythonscript](https://github.com/DenerosArmy/pythonscript) | Python compiled to readable JavaScript using the AST. (proof of concept) |
| [Rusthon](https://github.com/rusthon/Rusthon) | Integrates several python to js methods into one project. ~~Very Active.~~ Dead since 2016. Not only for JS & Py, but also Go, C, Nim, etc. |
| [PyPyJS](https://github.com/pypyjs/pypyjs) | PyPy. Compiled into JavaScript using Emscripten. JIT-compiling to JavaScript at runtime. |
| [Batavia](https://github.com/pybee/batavia) | Run Python bytecode in the browser |
| [Transcrypt](http://www.transcrypt.org) | New Python 3.5 to JavaScript transpiler. Supports multiple inheritance, bound function assignment, selective operator overloading, highly readable JS output, sourcemaps, small downloads, fast execution using call memoizing. Integrated with closure compiler / minifier, optional static checker and fabric.js graphics lib for HTML5 canvas. |
| [pseudo-python](https://github.com/alehander42/pseudo-python) | A restricted python to javascript/c#/go/ruby compiler |
| [JavaScripthon](https://github.com/azazel75/metapensiero.pj) | Transpile Python3.5 to ES6 and to ES5 (with the help of BabelJS, but w/o the need for nodejs). Supports classes, generators, async functions. |
| [PScript](https://github.com/flexxui/pscript) | Python compiled to JavaScript. |

## Erlang

| Name | Description |
| :---- | :---- |
| [Shen](https://synrc.com/apps/n2o/doc/web/macros.htm) | First and yet smallest Erlang JavaScript Compiler based on Erlang AST. It allows you to translate Elixir, Joxa, [Lol](https://github.com/b0oh/lol) and Erlang programs to JavaScript with erlc. [JavaScript/OTP subset](http://synrc.github.io/shen/). Has node npm package called [erlang-shen-js](https://www.npmjs.org/package/erlang-shen-js). |
| [LuvvieScript](http://luvv.ie) | A browser-based dom-scripting language that is a strict sub-set of Erlang which is AST-to-AST transpiled to JavaScript ([code](https://github.com/hypernumbers/luvviescript)) |
| [browserl](http://svahne.github.com/browserl/) | Erlang Emulator written in JavaScript |

## Elixir

| Name | Description |
| :---- | :---- |
| [ElixirScript](https://github.com/bryanjos/elixirscript) | Converts Elixir AST to JavaScript AST to JavaScript code. |

## Perl

| Name | Description |
| :---- | :---- |
| [Perlito](https://github.com/fglock/Perlito) | Project to compile Perl 5/6 to JavaScript, Ruby, SBCL, and Go. |
| [p2js](https://github.com/urandom/p2js) | Perl to JavaScript converter |
| [perl.js](https://github.com/gfx/perl.js)

## Java/JVM

| Name | Description |
| :---- | :---- |
| [GWT](http://www.gwtproject.org/) | Google Web Toolkit, compiles Java to JavaScript. |
| [Java2Script/SwingJS](https://github.com/BobHanson/java2script) | Eclipse Java to JavaScript compiler plugin and JavaScript version of the Java 8 JVM for Java applets and applications, with over 2300+ Java8 OpenJDK classes, including gnu.jpdf, gov.nist.jama, java(applet, awt, beans, io, lang, math, net, nio, security, text, util), javax(imageio, net, print, sound, swing, xml), netscape(javascript), org(apache, json, unicode, xml), sun(applet, audio, awt, net, nio, reflect, security, swing, text, util), along with an extensive library of plaf (Plaform Look and Feel) for HTML5; tested successfully on over 400,000 lines of original working Java code in 2 major (150,000+ line) applications ([Jmol](https://github.com/BobHanson/Jmol-SwingJS) and [Jalview](http://www.jalview.org/jalview-js/)) 600+ applets and 1000+ web pages in multiple projects; nearly complete AWT and Swing implementations; actively developed (since 2012); requires minor Java-compatible code adjustment to handle multithreading and modal dialogs; extensive developer documentation and support; beta  |
| [j2js](https://github.com/decatur/j2js-compiler) | Java bytecode to JavaScript. |
| [Strongly-Typed JavaScript (STJS)](http://st-js.github.io/) | JavaScript code generator from Java source. It is built as a Maven plugin. |
| [BicaJVM](https://github.com/nurv/BicaVM) | JavaScript implementation of JVM. |
| [Doppio](http://int3.github.com/doppio/about.html) | JVM interpreter on CoffeeScript. |
| [Processing.js](http://processingjs.org/) | A Java-based visualization language that interprets to JavaScript. |
| [Kotlin](http://kotlinlang.org) | Statically typed programming language targeting the JVM and JavaScript. |
| [Ceylon](http://ceylon-lang.org/) | A modular static-typed JVM language compilable to JavaScript. |
| [GrooScript](http://grooscript.org/) | A framework to convert Groovy code to JavaScript. |
| [node-jvm](https://github.com/YaroslavGaponov/node-jvm) | Java virtual machine in pure node.js |
| [Bck2Brwsr](http://wiki.apidesign.org/wiki/Bck2Brwsr) | Run "browserified" Java Code in, well, the browser. |
| [QWT](http://qooxdoo.org/contrib/project/qwt) | QWT consists of a Java-to-JavaScript compiler, a prepared library of Qooxdoo componente (version 0.7.x) and some other tools. Similar to GWT |
| [TeaVM](https://github.com/konsoletyper/teavm) | An ahead-of-time transpiler that takes JVM bytecode and produces JavaScript. |
| [Dragome SDK](http://www.dragome.com/) | Compiles JVM bytecode to Javascript. |
| [JSweet](http://www.jsweet.org/) | A Java to JavaScript transpiler built on top of TypeScript and giving access to hundreds of JavaScript libraries in Java. |
| [j2cl](https://github.com/google/j2cl) | Compiles Java to Javascript. |
| [CheerpJ](https://github.com/leaningtech/cheerpj-meta) | convert Java bytecode to WebAssembly and JavaScript |
| [Bytecoder](https://github.com/mirkosertic/Bytecoder) | Framework to interpret and transpile JVM bytecode to JavaScript, OpenCL or WebAssembly. |
| [JWebAssembly](https://github.com/i-net-software/JWebAssembly) | Java bytecode to WebAssembly compiler (note: you then could use [binaryen](https://github.com/WebAssembly/binaryen)'s wasm2js to compile WebAssembly to JavaScript.) |
| [Online-IDE](https://github.com/martin-pabst/Online-IDE) | A java-like programming language with IDE for computer-science-education that runs inside any browser |

## Scala

| Name | Description |
| :---- | :---- |
| [Scala.js](http://www.scala-js.org/) | The official Scala to JavaScript compiler |
| [js-scala](https://github.com/js-scala/js-scala) | JavaScript as an embedded DSL in Scala |
| [scalagwt](http://scalagwt.github.io/) | Enhanced GWT (accepts jribble as well as Java) plus Scala to jribble. |
| [JScala](http://jscala.org) | Scala macro that produces JavaScript from Scala code. |

## C#, F#, .NET related languages

| Name | Description |
| :---- | :---- |
| [jsc](http://jsc.sourceforge.net/) | [experimental] Recompile your .NET assembly to JavaScript, ActionScript, PHP or Java. |
| [JSIL](https://github.com/kevingadd/JSIL) | MSIL (.NET bytecode) to JavaScript |
| [Script#](http://scriptsharp.com) | Compiles C# to JS. |
| [CilJs](https://github.com/markusjohnsson/cil.js) | Translates CIL/MSIL (.NET bytecode) (C#) to JavaScript |
| [Prefix](http://www.toptensoftware.com/prefix/) | Defunct |
| [Blade](https://github.com/vannatech/blade) | Visual Studio add-on for converting C# to JavaScript |
| [SharpKit](https://github.com/SharpKit/SharpKit) | C# to JavaScript Cross-Compiler |
| [Saltarelle](http://www.saltarelle-compiler.com/) | C# to JavaScript Compiler. Saltarelle is now part of [Bridge.NET](http://bridge.net/). |
| [FunScript](https://github.com/ZachBray/FunScript/) | F# to JavaScript compiler with JQuery etc. mappings through a TypeScript type provider |
| [Pit](https://github.com/tpetricek/pitfw) | F# to JavaScript compiler |
| [WebSharper](http://www.websharper.com/) | Lets you compile F# to JS. |
| [NemerleWeb](https://github.com/NemerleWeb/NemerleWeb/) | Nemerle language compiled to JS. |
| [Blue Storm](https://www.assembla.com/spaces/bluestorm/wiki/) | F# to JavaScript (and some other languages). |
| [JScriptSuite](http://jscriptsuite.com/) | .NET to JavaScript compiler (cross browser API, client site controls and components). |
| [DotNetWebToolkit](https://github.com/chrisdunelm/DotNetWebToolkit) | Toolkit providing a .NET CIL to JavaScript transcoder and Visual Studio project/debugging integration |
| [Netjs](https://github.com/praeclarum/Netjs) | .NET to TypeScript and JavaScript compiler. It uses multiple stages to produce JavaScript for your web apps. |
| [WootzJs](https://github.com/kswoll/WootzJs) | C# to Javascript cross-compiler built on top of Microsoft Roslyn, which handles the complex process of converting your C# code into syntax trees with symbol information |
| [Bridge.NET](http://bridge.net/) | Open Source C#-to-JavaScript compiler using [Microsoft Roslyn](https://github.com/dotnet/roslyn). Includes support for jQuery + many other frameworks. Developed and well supported by a professional team. Try online at [Deck.NET](http://deck.net). |
| [Fable](https://github.com/fsprojects/Fable) | F# to JavaScript Compiler |

## Lisp, Scheme

### Clojure-like

| Name | Description |
| :---- | :---- |
| [ClojureScript](https://github.com/clojure/clojurescript) | Clojure to JS, the official version. Supports the majority of Clojure including persistent datastructures. |
| [ClojureJS](https://github.com/kriyative/clojurejs) | Subset of Clojure to JS. |
| [Chlorinejs](https://github.com/chlorinejs/chlorine) | A fork of ClojureJS with a port of clojure.core library. |
| [wisp](https://github.com/Gozala/wisp) | A homoiconic JavaScript dialect with Clojure syntax, S-expressions and macros. Aims to be rich subset of Clojure(Script) that seamlessly interops with both Clojure(Script) and JavaScript. *[○](#friends-philosophically-related "this item appears twice in this list; jump to its other instance")* |
| [Scriptjure](https://github.com/arohner/scriptjure) | Library for generating JavaScript from Clojure forms. |
| [ki](http://ki-lang.org) | Clojure-like syntax, [mori](http://swannodette.github.io/mori/)'s immutable data structures in a few [sweet.js](http://sweetjs.org) macros. Can be intermixed with JavaScript. *[○](#friends-philosophically-related "this item appears twice in this list; jump to its other instance")* |
| [Calcit-js](https://github.com/calcit-lang/calcit_runner.rs) | A JavaScript code generator sharing ClojureScript semantics, featured macros, immutable data, and prefix notations. However, it relies on indentation-based syntax from Cirru(Script). |
| [Dak](https://www.daklang.com/) | A Lisp like language that transpiles to JavaScript. “It's still JavaScript, but wearing a Lisp outfit. It's not Common Lisp or Scheme, but a bit more like Clojure or Fennel.” |

### Scheme-like

| Name | Description |
| :---- | :---- |
| [BiwaScheme](http://www.biwascheme.org/) | Scheme(R6RS) in JavaScript |
| [Fargo](https://github.com/jcoglan/fargo) | Scheme in JavaScript |
| [LIPS](https://lips.js.org/) | Scheme (R7RS) in JavaScript |
| [Moby Scheme](https://github.com/dyoo/moby-scheme) | A Scheme running in JS. |
| [nconc](https://github.com/patrickdlogan/nconc) | Scheme interpreter in JavaScript with stack-friendly tail calls and full call/cc |
| [Scheje](http://github.com/turbopape/scheje) | A Little Scheme on Top of Clojure - compiles on Node.js and the Browser. |
| [scheme2js](http://www-sop.inria.fr/indes/scheme2js/) | Scheme to JavaScript. |
| [Spock](http://wiki.call-cc.org/eggref/4/spock) | A Scheme to JavaScript compiler that uses Henry Baker's Cheney-on-the-MTA compilation strategy |
| [Whalesong](http://hashcollision.org/whalesong/) | Racket to JS compiler |
| [RacketScript](https://github.com/vishesh/racketscript) | Lightweight Racket to JavaScript compiler. The generated code is ES6, which can be translated to ES5 using Babel or Traceur. |
| [urlang](https://github.com/soegaard/urlang) | A nanopass compiler accepting Racket-like syntax |

### Other

| Name | Description |
| :---- | :---- |
| [eslisp](https://github.com/anko/eslisp) | An S-expression syntax for ECMAScript/JavaScript, with Lisp-like hygienic macros that are just JS functions. Aims to be very close to JS, and highly experimental. |
| [EdgeLisp](https://github.com/manuel/edgelisp) | A Lisp in the tradition of Common Lisp |
| [Parenscript](http://common-lisp.net/project/parenscript/) | Subset of Common Lisp to JS. |
| [Ralph](https://github.com/turbolent/ralph) | Lisp-1 dialect that compiles to JavaScript, inspired by Dylan |
| [Oppo](https://github.com/benekastah/oppo) | A JavaScripter's lisp. Inspired by JavaScript, Clojure and CoffeeScript. Compiler built using [Jison](http://zaach.github.com/jison/docs/). |
| [LispyScript](https://github.com/santoshrajan/lispyscript) | A JavaScript with Lispy syntax and Macros. *[○](#friends-philosophically-related "this item appears twice in this list; jump to its other instance")* |
| [Outlet](https://github.com/jlongster/outlet) | A simple Lisp that supports CPS and in-browser stepping debugging, and other things. In development. |
| [Hot Cocoa Lisp](https://github.com/olleicua/hcl) | A Lisp-like language that compiles to JavaScript. *[○](#friends-philosophically-related "this item appears twice in this list; jump to its other instance")* |
| [Sibilant](https://sibilant.org/) | JavaScript with a lisp. *[○](#friends-philosophically-related "this item appears twice in this list; jump to its other instance")* |
| [jisp](http://jisp.io/) | A JS-native and axiomatic Lisp that focuses on the core ideas of code-as-data, S-expressions, and macros, introducing as few new concepts as possible. *[○](#friends-philosophically-related "this item appears twice in this list; jump to its other instance")* |
| [JSCL](https://github.com/jscl-project/jscl) | A Lisp-to-Javascript compiler bootstrapped from Common Lisp |
| [Lux](https://github.com/LuxLang/lux) | Statically typed, functional Lisp with an ML-like module system |

## OCaml

| Name | Description |
| :---- | :---- |
| [Ocamljs](https://github.com/jaked/ocamljs) | OCaml to JS. |
| [O'Browser](http://ocsigen.org/obrowser/) | OCaml bytecode interpreter in JS. |
| [Js_of_ocaml](http://ocsigen.org/js_of_ocaml/) | OCaml bytecode to JS compiler. |
| [ReScript](https://rescript-lang.org/) | (Formerly BuckleScript) Compiles OCaml, and its syntax extension [Reason](https://reasonml.github.io/), to readable JavaScript. *[○](#static-typing "this item appears twice in this list; jump to its other instance")* |

## Haskell

| Name | Description |
| :---- | :---- |
| [UHC](http://www.cs.uu.nl/wiki/bin/view/Ehc/UhcUserDocumentation#5_7_3_jscript_Core_based_JavaScr) | (Utrecht Haskell Compiler) backend converts UHC core to JavaScript, allowing the compiling of Haskell code to JS. |
| [ghcjs](https://github.com/ghcjs/ghcjs) | Compile normal Haskell into JS |
| [jmacro](http://hackage.haskell.org/package/jmacro) | Quasi-Quoted JS that you can insert Haskell values into (there is also [shakespeare-js](http://hackage.haskell.org/package/shakespeare-js) for that purpose), but also supports a more Haskellish syntactic version of JavaScript. |
| [lambdascript](https://github.com/aculich/lambdascript) | Compile a subset of Haskell into JS |
| [YHC](http://www.haskell.org/haskellwiki/Yhc/JavaScript) | (York Haskell Compiler) backend, as above but with YHC core language. |
| [jshaskell](http://code.google.com/p/jshaskell/) | |
| [haste](https://github.com/valderman/haste-compiler) | |
| [fay](https://github.com/faylang/fay/wiki) | A proper subset of Haskell that compiles to JavaScript |
| [forml](http://texodus.github.io/forml/index.html) | A contemporary programming language intended to approximate the safety of Haskell and the expressiveness of Ruby. |

## Smalltalk

| Name | Description |
| :---- | :---- |
| [Amber](http://amber-lang.net/) | Formerly known as Jtalk |
| [Clamato](http://clamato.net/) | A Smalltalk dialect that is designed to operate within the JavaScript runtime. |
| [Silver Smalltalk](http://silversmalltalk.wordpress.com/) | [commercial?] Smalltalk in the browser. (Still active?) |
| [Lively Kernel](http://www.lively-kernel.org/) | Smalltalk/squeak-like development environment in the browser. See also [Avocado](http://avocadojs.com/), built on top of it. |
| [Little Smallscript](https://github.com/ympbyc/LittleSmallscript) | Little Smalltalk to JavaScript translator. |
| [SqueakJS](https://bertfreudenberg.github.io/SqueakJS/) | Squeak VM in Javascript |
| [PharoJS](https://github.com/bouraqadi/PharoJS) | PharoJS is a [Pharo](http://pharo.org/) to JavaScript compiler and infrastructure for remote test and debugging. The goal is to enable developing apps in [Pharo](http://pharo.org/) while deploying them on top of a JavaScript engine. |

## C/C++

| Name | Description |
| :---- | :---- |
| [Emscripten](http://emscripten.org/) | LLVM to JavaScript compiler. LLVM is "an aggressive open-source compiler for C and C++," as well as other languages. |
| [Cheerp](http://leaningtech.com/cheerp/) | (formerly Duetto) "compiles C++ applications to binary code and JavaScript. Based and integrated into the LLVM/clang infrastructure" |
| [maja](https://github.com/lethalman/maja) | Vala (gobject) to JavaScript |
| [Clue](http://cluecc.sourceforge.net/) | C language compiler to different runtimes (Lua, JS, Perl 5, C, Java, CL). |
| [LLJS](http://lljs.org/) | Typed dialect of JavaScript that offers a C-like type system with manual memory management |
| [Mandreel](http://mandreel.com/) | Can convert C++ and Objective-C applications based on OpenGL ES to JavaScript or Action Script 3 web application. |
| [Bonsai-C](https://github.com/gasman/bonsai-c) | Convert C code to asm.js |

## Basic

| Name | Description |
| :---- | :---- |
| [NS Basic/App Studio](http://www.nsbasic.com/app/) | [commercial] Visual Basic-style BASIC to JavaScript compiler. Includes IDE. Targets iOS and Android |
| [qb.js](http://stevehanov.ca/blog/index.php?id=92/) | An implementation of QBASIC in JavaScript |
| [Spiderbasic](http://www.spiderbasic.com) | [commercial] SpiderBasic is new web client-side programming language based on established BASIC rules. Its main purpose is to allow development of very complex, windowed based web applications. It provides a large commandset to handle complex and reactive GUI, 2D games, and many more in a coherent manner. |
| [B4J](https://www.b4x.com/) | [free] the BANano library by Alwaysbusy transpiles B4J (Visual Basic like) code to Javascript.  Possibility to extend with other javascript libraries/web frameworks by creating BANano b4xlib libraries. Allows development of PWA, Websites, Webapps. |
| Monkey (see below) |

## Pascal, Modula, Oberon

| Name | Description |
| :---- | :---- |
| [Smart Mobile Studio](http://op4js.optimalesystemer.no/) | [commercial] Object Pascal to JavaScript compiler and Delphi like IDE that brings classes, inheritance, interfaces and more to JavaScript |
| [Elevate Web Builder](http://www.elevatesoft.com/products?category=ewb) | [commercial] Visual development tool for web applications that compiles standard Object Pascal source code into JavaScript |
| [Oberon 07](https://github.com/vladfolts/oberonjs) | Translates Oberon to JavaScript code ready to be run in web browser or nodejs. Compiler itself is written in Oberon (with extensions) and compiled to JavaScript. |
[Pas2JS](http://wiki.freepascal.org/pas2js) | Pas2js is an open source Pascal to JavaScript transpiler. It parses Object Pascal and emits JavaScript. The JavaScript is currently of level ECMAScript 5 and should run in any browser or in Node.js. |

## Go

| Name | Description |
| :---- | :---- |
| [Go2js](https://github.com/kless/go2js) | Line-to-line translator from Go to JavaScript. |
| [GopherJS](https://github.com/gopherjs/gopherjs) | A compiler from Go to JavaScript. |
| [TARDISgo](https://tardisgo.github.io) | Compile Golang to Haxe (then on to JavaScript, Flash, Java, C++, C#, PHP, Python, Lua, Neko, HashLink) |

## Multitarget

| Name | Description |
| :---- | :---- |
| [Haxe](https://haxe.org/) | Compiles to several platforms C++, JavaScript, PHP, Java, JVM, C#, Python, Lua, Neko, HashLink (both JIT and C) and Flash/SWF. |
| [Fantom](http://fantom.org/) | Evolutionary object-oriented language emphasizing succinct and effective APIs (JVM, CLR, JS). |
| [LZX (Laszlo XML)](http://labs.openlaszlo.org/trunk-nightly/laszlo-explorer/index.html?lzr=swf10#_lzbookmark=Laszlo%20in%2010%20Minutes) | LZX is [OpenLaszlo's](http://www.openlaszlo.org) declarative user interface language, which is compiled into JavaScript 2 as an intermediary format, and further compiled into either JavaScript 1.5 or ActionScript 3. |
| Clue and jsc | Target multiple runtimes in addition to JavaScript |
| [Nim](http://nim-lang.org) | Compiles to C, C++, Objective-C, and JavaScript |
| [Monkey](http://www.monkey-x.com/) | A Basic-like programming language that compiles to several platforms (JavaScript, ActionScript 3, C++, Java, C#). The main application/game framework is [commercial]. |
| [defrac](https://www.defrac.com/) | Compiles Java bytecode to several platforms (including JavaScript) |
| [Ć Programming Language](https://github.com/pfusik/cito) | Automatically translated to C, C++, C#, Java, JavaScript, Python, Swift and OpenCL. |
| [Skew](https://github.com/evanw/skew) | A web-first, cross-platform programming language with an optimizing compiler (compiles to JS and C++) |
| [Chicken Scheme](https://call-cc.org/) | an R5RS & R7RS Scheme that normally compiles to C. The [Spock](http://wiki.call-cc.org/eggref/5/spock) library allows compilation to JavaScript |

## Tierless languages (produce both client & server)

| Name | Description |
| :---- | :---- |
| [Fun](https://github.com/marcuswestin/fun) | A programming language for realtime webapps - compiles to client-side and server-side JS. |
| [Ur](http://impredicative.com/ur/) | In the tradition of ML and Haskell. |
| [mobl](http://www.mobl-lang.org) | The new language for programming the mobile web. |
| [E](http://wiki.erights.org/wiki/E-on-JS) | Compiles E to JS. E is a secure distributed persistent pure object language. |
| [Sugar](https://github.com/sebastien/sugar) | New programming language designed to replace JavaScript for client-side (and server-side) web development |
| [Opa](http://opalang.org/) | Write your complete application in just one language, and the compiler will transform it into a self-sufficient executable |
| [STIP.js](http://soft.vub.ac.be/~lphilips/jspdg/stip/stip-web/stip.html) | Slicing Tierless Programs in JavaScript |

## Visual programming tools

| Name | Description |
| :---- | :---- |
| [SCION SCXML](http://scion.scxml.io/) | Tools for W3C [State Chart XML](https://www.w3.org/TR/scxml/), a state machine language. Tools include an SCXML-to-JS compiler and graphical debugger. |
| [Waterbear](http://waterbearlang.com/) | Tool for making Scratch-inspired block-based languages on the web. Examples include blocks for JavaScript, ProcessingJS, NodeJS, and more. |
| [Snap](http://snap.berkeley.edu/snapsource/snap.html) | JavaScript of BYOB, which is a fork of [Scratch](http://scratch.mit.edu/) |
| [ScriptBlocks](http://code.google.com/p/scriptblocks/) | |
| [Illumination](http://radicalbreeze.com/) | [Commercial] Visual, cross-platform tool creates apps for Android, iPhone, iPad, Desktops and HTML5 or Flash websites. [The I language](http://blog.radicalbreeze.com/?p=213) underlies the tool. |
| [JsMaker](http://jsmaker.com/jsmaker/) | Visual JavaScript programming |
| [Meemoo](http://meemoo.org/) | Flow-based visual programming framework for hackable web apps |
| [NoFlo](http://noflojs.org/) | JavaScript implementation of Flow-Based Programming. Programs (network graphs) can be visually created with [DrawFBP](http://www.jpaulmorrison.com/cgi-bin/wiki.pl?DrawFBP) |
| [Blockly](http://code.google.com/p/google-blockly/) | Web-based, graphical programming language. Users can drag blocks together to build an application |
| [Maeda Block](http://junk.wise9.jp/maeda/) | Visual game programming language powered by enchant.js and Google Blockly. See also the [Japanese version](http://maedablock.jp/). |

## SQL

| Name | Description |
| :---- | :---- |
| [sql-parser](https://github.com/forward/sql-parser) | |
| [sqld3](https://github.com/steveyen/sqld3) | |
| [Alasql](https://github.com/agershun/alasql) | SQL to JavaScript parser and compiler |
| [sql.js](https://github.com/kripken/sql.js) | SQLite compiled to javascript |
| [RBQL](https://rbql.org) | SQL-like language that compiles to JavaScript and Python |

## PHP

| Name | Description |
| :---- | :---- |
| [phype](http://code.google.com/p/phype/) | Run PHP code directly in your browser |
| [uniter](https://github.com/asmblah/uniter) | Run PHP code in Node.js or the browser |
| [php.js](https://github.com/niklasvh/php.js) | PHP VM with JavaScript, allow to run PHP code in Node.js or the browser |

## Lua

| Name | Description |
| :---- | :---- |
| [lua.js](https://github.com/mherkender/lua.js) | Lua parser |
| [Brozula](https://github.com/creationix/brozula) | Lua bytecode interpreter |
| [Fengari](https://fengari.io/) | Lua VM in JavaScript |

## Prolog

| Name | Description |
| :---- | :---- |
| [prolog.js](https://github.com/jldupont/prolog.js) | Prolog parser, compiler, and interpreter in JavaScript |
| [Yield Prolog](http://yieldprolog.sourceforge.net/) | Compiles Prolog into JavaScript, C#, and Python |
| [Tau Prolog](http://tau-prolog.org/) | Prolog interpreter in JavaScript |

## Others

| Name | Description |
| :---- | :---- |
| [Bait](https://github.com/tiabeast/bait) | Compiled general purpose programming language with a simple syntax for building reliable software. The current main backend compiles to JavaScript. |
| [Z](https://github.com/zlanguage) | An experimental language that is basically JavaScript with nicer syntax. |
| [Pyret](https://www.pyret.org/) | A teaching language that runs in the browser. |
| [Oia](https://github.com/stevedekorte/oia) | A port of Io to JavaScript. |
| [Plaid](http://www.plaid-lang.org) | A gradually-typed, typestate-oriented language designed as a better Java. |
| [Quixe](https://github.com/erkyrath/quixe) | A Glulx VM interpreter written in JavaScript |
| [Gnusto](https://github.com/curiousdannii/gnusto) | A Z-Machine VM interpreter written in JavaScript |
| [Logo Interpreter](http://www.calormen.com/logo/) | |
| [Reb2Static](https://github.com/jankom/RebToStatic) | Rebol to JavaScript |
| [RPN](https://github.com/adrusi/rpn) | Interpreter for a language with a Reverse Polish Notation syntax. |
| [jsForth](https://github.com/brendanator/jsforth) | |
| [wForth](http://solidcoding.blogspot.com/2008/12/wforth-javascript-forth-interpreter.html) | |
| [Agda](http://wiki.portal.chalmers.se/agda/pmwiki.php) | A dependently typed functional programming language and mechanized proof assistant |
| [XLCC](https://github.com/baxtree/xlcc) | Interpret LCC into JavaScript on node |
| [SMLtoJs](http://www.smlserver.org/smltojs/) | SML to JavaScript compiler |
| [Pygmy](http://peterolson.github.com/Pygmy/Docs/index.html) | A dynamic language that compiles to JavaScript designed to be readable but concise enough to be competitive in code golf. |
| [ErlyJS](https://github.com/baryluk/erlyjs) | JavaScript to Erlang compiler |
| [Topaz](https://github.com/giesse/Project-SnowBall) | Rebol inspired language on top of JavaScript |
| [NGN APL](https://github.com/ngn/apl) | APL-to-JavaScript compiler written in CoffeeScript |
| [CobolScript](https://github.com/ajlopez/CobolScript) | COBOL language compiler to JavaScript. |
| [Idris](https://github.com/idris-lang/idris-dev) | Dependently typed functional language with a JavaScript backend. |
| [Wortel](https://github.com/atennapel/Wortel) | J/APL inspired language with Polish Notation, compiles to JavaScript. |
| [oK](https://github.com/JohnEarnest/ok) | K5 implementation on top of Javascript. |
| [JEnglish](https://github.com/JEnglishOrg/JEnglish/) | Interprets regular English statements into HTML/CSS |
| [uilang](https://github.com/bendc/uilang) & [uiscript](https://github.com/ConnorAtherton/uiscript) | Simple UI-focused script languages for web designers |
| [Hodor](http://www.hodor-lang.org/) | Hodor programming language |
| [L2](https://github.com/gjmcn/L2) | A simple, table-based language for data analysis |
| [YoptaScript](https://github.com/samgozman/YoptaScript) | Language for gopniks (post-Soviet aggressive young lower-class suburban male dwellers coming from families of poor education and income) |
| [GLSL-Transpiler](https://github.com/stackgl/glsl-transpiler) | Compile GLSL to JavaScript |
| [Kind](https://github.com/Kindelia/Kind) | Dependently-typed, functional programming and proof language. |

## Tools for Compiler Writers

### JavaScript Parsers and Extensions

| Name | Description |
| :---- | :---- |
| [Narcissus](https://github.com/mozilla/narcissus/) | Mozilla's experimental JavaScript compiler in JavaScript by Brendan Eich and others. |
| [CommonJS version in DoctorJS](https://github.com/mozilla/doctorjs/tree/master/lib/jsctags/narcissus) | |
| [Jasy: Python port of Narcissus with some enhancements](https://github.com/wpbasti/jasy/tree/master/lib/jasy/parser) | |
| [PyNarcissus](http://code.google.com/p/pynarcissus/) | Narcissus's parser ported to Python (used in [pyjon](http://code.google.com/p/pyjon/)) |
| [rbnarcissus](http://code.google.com/p/rbnarcissus/) | Narcissus' parser ported to Ruby. |
| [Traceur](http://code.google.com/p/traceur-compiler/) | Google's vehicle for JavaScript Language Design Experimentation |
| [EcmaScript 5 Parser (es-lab)](http://es-lab.googlecode.com/svn/trunk/site/esparser/index.html) | |
| [EcmaScript 5 Parser (qfox)](http://esparser.qfox.nl/) | |
| [reflect.js](https://github.com/zaach/reflect.js) | Implementation of Mozilla's (SpiderMonkey) [Parser API](https://developer.mozilla.org/en/SpiderMonkey/Parser_API) in JavaScript |
| [bdParse](https://github.com/altoviso/bdParse) | A JavaScript LL(1) parser in JavaScript |
| [parse-js](http://marijnhaverbeke.nl/parse-js/) | Common Lisp JavaScript parser |
| [ZeParser](https://github.com/qfox/ZeParser) | |
| [Esprima](http://esprima.org) | Educational (but fast) ECMAScript parser with output compatible to [Mozilla Parser API](https://developer.mozilla.org/en/SpiderMonkey/Parser_API) |
| [js.js](https://github.com/jterrace/js.js) | A JavaScript JavaScript interpreter. Instead of trying to create an interpreter from scratch, SpiderMonkey is compiled into LLVM and then emscripten translates the output into JavaScript. |
| [sweet.js](http://sweetjs.org/) | Brings hygienic macros to JavaScript. Lets you write extensions to JavaScript that must be invoked by the user. |
| [smpl.js](https://github.com/jasuperior/smpl) | The first compiler built for the purpose of transpiling first. |
| [acorn](https://github.com/marijnh/acorn/) | A small, fast, JavaScript-based JavaScript parser |
| [Babel](https://babeljs.io/) | Turn your ES6+ code into ES5 friendly code |

### JavaScript Optimizers

| Name | Description |
| :---- | :---- |
| [Closure Compiler](http://code.google.com/closure/compiler/) | An optimizing compiler. Can generate a (line/col)-number mappings file. |
| [UglifyJS](https://github.com/mishoo/UglifyJS2) |

### JavaScript Parser Generators

| Name | Description |
| :---- | :---- |
| [jison](https://github.com/zaach/jison) | Bison in JavaScript, used by CoffeeScript |
| [nearley](https://github.com/hardmath123/nearley) | A fast, lightweight Earley parser generator |
| [OMeta/JS](http://tinlizzie.org/ometa-js/#Sample_Project) | Metacompiler for many languages to many targets, including js. ([source](https://github.com/veged/ometa-js)) |
| [PEG.js](http://pegjs.majda.cz/) | Parser generator for JavaScript based on the parsing expression grammar formalism |
| [languagejs](https://github.com/tolmasky/language) | PEG parser written in JavaScript with first class errors |
| [Canopy](https://github.com/jcoglan/canopy) | Self-hosting PEG parser compiler for JavaScript, influenced by Ruby parser generators such as Treetop and Citrus |
| [JS/CC](http://jscc.phorward-software.com/) | LALR(1) parser generator |
| [jsparse](https://github.com/doublec/jsparse) | PEG by Grandmaster Chris Double |
| [ReParse](https://github.com/weaver/ReParse) | Parser combinator library for JavaScript like Haskell's Parsec |
| [p4js](https://github.com/asmyczek/p4js) | Monadic parser library for JavaScript |
| [JSGLR](http://blog.kalleberg.org/post/1256702765/prototype-of-a-scannerless-generalized-left-to-right) | Scannerless, Generalized Left-to-right Rightmost (SGLR) derivation parser for JavaScript |
| [ANTLR 3](https://github.com/antlr/examples-v3) | Has a JavaScript target. ANTLR 4 has [not implemented its JavaScript target yet](https://theantlrguy.atlassian.net/wiki/display/ANTLR4/Runtime+Libraries+and+Code+Generation+Targets). |
| [Cruiser.Parse](http://code.google.com/p/cruiser/wiki/Parse) | LL(k) parser |
| [MetaCoffee](https://github.com/xixixao/meta-coffee) | PEG parser using CoffeeScript and white-space-significant syntax |
| [Bennu](http://bennu-js.com) | Parsec inspired Javascript parser combinator library. |
| [bison-lalr1.js](https://github.com/peter-leonov/bison-lalr1.js) | JavaScript skeleton for Bison GNU Parser Generator |

### JavaScript AST, Semantics

| Name | Description |
| :---- | :---- |
| [WebAssembly](https://webassembly.org/) | W3C cross-browser collaboration on a new, portable, size- and load-time-efficient format suitable for compilation to the web. |
| [Closure Compiler AST Documentation](https://docs.google.com/viewer?url=http%3A%2F%2Fclosure-compiler.googlecode.com%2Ffiles%2Fclosure-compiler-ast.pdf) | |
| [SpiderMonkey Parser API](https://developer.mozilla.org/en/SpiderMonkey/Parser_API) | See also reflect.js above. The AST interface specification is succeeded by the ESTree specification effort. |
| [ESTree Specification](https://github.com/estree/estree) | An effort to better standardize an AST specification based on the original Spidermonkey Parser API. It is used by Acorn, Esprima, and SpiderMonkey's own parser. This succeeds the original SpiderMonkey Parser API's AST specification. |
| [Shift JavaScript AST Specification](https://github.com/shapesecurity/shift-spec) | See this [blog post](http://engineering.shapesecurity.com/2014/12/announcing-shift-javascript-ast.html) with more information |
| [JsonML AST](http://code.google.com/p/es-lab/wiki/JsonMLASTFormat) | Format used by the es5 parser |
| [treehugger](https://github.com/ajaxorg/treehugger) | JavaScript AST transformation tools |
| [JavaScript Shaper](http://jsshaper.org/) | JavaScript syntax tree shaping |
| [burrito](https://github.com/substack/node-burrito) & [js-traverse](https://github.com/substack/js-traverse) | See [this post](http://substack.net/posts/eed898) for more info, as well as [node-stackedy](https://github.com/substack/node-stackedy) for an example and [node-browserify](https://github.com/substack/node-browserify) for running it in a browser instead of node |
| [falafel](https://github.com/substack/node-falafel) | Transform the ast on a recursive walk |
| [rocambole](https://github.com/millermedeiros/rocambole) | Inspired by burrito & falafel, recursively walk and transform EcmaScript AST |
| [JavaScript types](http://cs.brown.edu/~joe/public/types/types.html) | Lambdajs and flow typing |
| [SourceMap](https://github.com/mozilla/source-map) | Map JavaScript debugger output to original source |
| [Zeon](https://github.com/qfox/Zeon) | A static visual JavaScript analyzer / editor. See also [ZeParser](https://github.com/qfox/ZeParser). |
| [escodegen](https://github.com/Constellation/escodegen) | JavaScript code generator |
| [esmangle](https://github.com/Constellation/esmangle) | Minifier for Mozilla Parser API AST |
| [estraverse](https://github.com/estools/estraverse) | ECMAScript traversal functions from esmangle project |
| [ecma-ast](https://github.com/mattbierner/ecma-ast) | AST node data structures for ECMAScript 5.1 based on the [SpiderMonkey Parser API](https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API) |
| [esast](https://github.com/mason-lang/esast) | Slow compilation? Use typed data for fast AST construction and rendering. Compatible with JSON trees following [estree](https://github.com/estree/estree). |
| [Astring](https://github.com/davidbonnet/astring) | Tiny and fast JavaScript code generator from an ESTree-compliant AST. |