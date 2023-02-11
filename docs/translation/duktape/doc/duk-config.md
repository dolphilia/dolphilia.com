# Duktapeの設定ヘッダー、duk_config.h

## duk_config.h の目的

**duk_config.h は外部設定ヘッダー("config header") で、プラットフォーム、コンパイラ、およびアーキテクチャに特有の機能** をすべて提供し、プラットフォーム特有のヘッダーや機能に依存せずに Duktape ソースコード本体をコンパイルできるようにするためのものです。  また、このヘッダーは、様々なDuktapeのオプション機能を有効／無効にするためのアクティブなDuktape設定オプション(``DUK_USE_xxx``)も提供します。

Duktapeのいくつかの機能（ROM組み込みサポートや使用するUnicodeテーブルなど）は、「準備された」Duktapeのソースコードに変更を加える必要があることもあります。  configure.py`` ユーティリティは ``duk_config.h`` ヘッダーと Duktape ソースファイルの準備を兼ねています。genconfig.py と同じコマンドラインオプション(とその他)を受け付けます。  **Duktape 2.0 以降では、ビルドのために config ヘッダーと Duktape ソースを作成するツールは ``tools/configure.py`` が推奨されています**。  このドキュメントでは genconfig.py の使用方法を説明しますが、genconfig.py が使用される場所では通常 configure.py を使用する必要があります。

duk_config.h で ``DUK_VERSION`` を定義することで、アプリケーションのコンフィグレーション・スニペットが必要に応じて Duktape のバージョンに反応できるようになります（例えば、新しいバージョンのみの機能を有効にする）。

外部設定ヘッダは、より多くの柔軟性を提供しますが、特にDuktapeを異国の環境に適応させる際には、もう少し考える必要があります。この文書では、コンフィグヘッダーの作成と、新しいDuktapeのリリースを使用する際の更新に関する様々なアプローチについて説明します。

## duk_config.h を作成する

``duk_config.h`` は常に Duktape のメイン・ソース・コードの外部にあり、最後の手段として必要であれば、設定ファイルを手動で編集したり、ゼロから作成することも可能です。

このように、設定ヘッダを作成する方法は複数あります。一般的なプラットフォームでは通常あまり必要ありませんが、よりエキゾチックなプラットフォームでは、より多くの手作業が必要になる場合があります。  正しい方法」はありませんが、手作業で修正するほど、Duktapeのアップデートに対応するために多くの労力が必要になります。

基本的なオプションは

* デフォルトのduk_config.hを配布物に使用する。Duktapeの配布物には、プラットフォーム、コンパイラ、アーキテクチャを自動検出し、すべてのDuktape設定オプションにデフォルト値を使用する、デフォルトのduk_config.hが含まれています。  このヘッダは、Linux、macOS、Windows、さらにいくつかのエキゾチックなプラットフォームで、「箱から出してすぐに」動作するはずです。  もし、サポートされているプラットフォームの一つを使用していて、デフォルトのオプションが許容できるのであれば、これをデフォルトの選択とすべきです。  Duktape 2.xでは、``DUK_OPT_xxx``コンパイラのコマンドラインオプションはサポートされていないことに注意してください。デフォルト以外のオプションを使用するには、configure.py（推奨）またはgenconfig.pyを実行してください。
* デフォルトの duk_config.h を手動で修正して使用する。* デフォルトの duk_config.h を使って手動で変更する: 小さな変更が必要な場合、デフォルトの duk_config.h を直接変更することができます。  このような変更は、手動で行うこともできますし、 ``sed`` などのスクリプトを使用して行うこともできます。Duktape がアップグレードされ、ソースの duk_config.h が変更された場合 (新しいバージョンでは通常そうです) には、スクリプトを使用した方がエラーが起こりにくいでしょう。  スクリプトを使用してヘッダーを調整する方法については、以下の別のセクションを参照してください。
* genconfig.py を使って duk_config.h を自動検出できるようにします。* genconfig.py を使って duk_config.h を自動検出する: ``genconfig.py`` を使って、自動検出用の duk_config.h を作成し、genconfig コマンドラインで設定オプションのオーバーライドを指定することができます。  genconfig の使用方法については、以下の別のセクションを参照してください。
* genconfig.py を使って、素の duk_config.h を作成する。duk_config.h の自動検出は便利ですが、エキゾチックなプラットフォームでは動きません。  エキゾチックなプラットフォームをサポートするために、 ``genconfig.py`` は指定されたプラットフォーム、コンパイラ、アーキテクチャの組み合わせ (それぞれを指定するか "autodetect" のままにしておきます) のテンプレート duk_config.h を生成し、あなたのターゲットにできる限り一致するようにすることができます。  その後、手動またはスクリプトでヘッダを変更することができます。
* genconfig メタデータを編集して duk_config.h を再生成してください。カスタムプラットフォームのサポートを genconfig メタデータに直接追加することもできます。  例えば、カスタムコンパイラをサポートするためには、コンパイラを検出し、そのコンパイラに不適切なデフォルトのマクロを上書きするために、コンパイラ固有の C ヘッダースニペットを追加する必要があります。その後、更新されたメタデータを使用して ``duk_config.h`` を再生成することができます。
* ゼロから duk_config.h を書いてください。しかし、typedef やマクロ、設定オプションが非常に多いので、おそらくデフォルトまたは genconfig が生成した ``duk_config.h`` を修正するのが一番簡単でしょう。

NOTE: ``genconfig.py`` を直接実行することもできますが、代わりに ``tools/configure.py`` を使用することが推奨されます。  configure.pyでは、同じ設定オプション(とそれ以上)を使用することができます。

## genconfigの使用

### genconfigの概要

Genconfig (``tools/genconfig.py``) はコンフィグを扱うための小さなユーティリティで、基本的に2つの目的があります。

* 指定されたプラットフォーム、コンパイラ、アーキテクチャに対応した ``duk_config.h`` を生成します。  それぞれは明示的に指定することもできますし (例えばコンパイラには "gcc" を使用します)、コンパイル時の自動検出にも任せられます。デフォルトの ``duk_config.h`` は、すべてを自動検出するように生成されます。  プラットフォーム、コンパイラ、アーキテクチャを明示的に定義することで、ターゲットに特化した骨太のヘッダを生成することができます。
* 設定オプションのドキュメントを生成します。

設定ヘッダは、設定オプションとターゲットのメタデータファイル、および手動で編集されたヘッダースニペットを元に生成され、それらを組み合わせて最終的なヘッダを作成します。  コンフィグオプションのメタデータを元に、ドキュメントを生成します。メタデータはYAMLファイルとして表現され、編集しやすく、diff/mergeの動作も良好です。

このドキュメントでは、利用可能なすべてのツールオプションをカバーしていません。現在のオプションの完全なリストについては、 ``python tools/genconfig.py --help`` または ``python tools/configure.py --help`` を使用してください。

### 自動検出の生成 duk_config.h

直接サポートされているプラットフォームに適した autodetect ヘッダを生成するには::

```sh
$ cd duktape-2.0.0
$ python tools/genconfig.py \
    --metadata config/ \
    --output /tmp/duk_config.h \
    duk-config-header
```

結果として ``/tmp/duk_config.h`` のヘッダは、そのまま使用するか、手動またはスクリプトで編集することができます。  tools/configure.py`` を使用した場合と同等の操作は次のようになります::

```sh
$ cd duktape-2.0.0
$ python tools/configure.py \
    --source-directory src-input \
    --config-metadata config/ \
    --output-directory /tmp/output
```

結果ディレクトリ ``/tmp/output`` には ``duk_config.h`` のヘッダが含まれますが、 ``duktape.c`` と ``duktape.h`` も含まれるので、ビルドに含めることができます。

また、いくつかの方法で個々の定義を上書きすることができます(詳細は以下の "オプションの上書き "のセクションを参照してください)。Cコンパイラーフォーマット(-Dと-Uオプション)とYAML設定ファイルまたはインラインを使用します。

DuktapeをDLLとしてビルドする場合は、 ``--dll`` オプションを使用します:.DuktapeをDLLとしてビルドする場合は、 ``--dll`` オプションを使用します。

```sh
$ python tools/genconfig.py \
    --metadata config/ \
    --dll \
    --output /tmp/duk_config.h \
    duk-config-header
```

``configure.py`` に相当します::

```sh
$ python tools/configure.py \
    --source-directory src-input \
    --config-metadata config/ \
    --output-directory /tmp/output \
    --dll
```

DLL のビルドは自動的に検出することができず、Windows のシンボルの可視性属性に影響を与えます。  dll`` オプションは、DLLがビルドされることを想定したヘッダを作成します。

include`` ステートメントを作り直すようないくつかの変更は、オーバーライドファイルとして表現することができないため、結果として得られる config ヘッダーを手動で編集するか、スクリプトを使用する必要があります。

### ベアボーン duk_config.h の生成

ベアボーンヘッダーを生成するには、genconfig: にプラットフォーム、コンパイラ、およびアーキテクチャを指定する必要があります。

```sh
$ python tools/genconfig.py \
    --metadata config/ \
    --platform linux \
    --compiler gcc \
    --architecture x64 \
    --output /tmp/duk_config.h \
    duk-config-header
```

The barebones header in ``/tmp/duk_config.h`` can then either be used as is
or edited manually or through scripting.

The platform, compiler, and architecture names map to genconfig header snippet
files.  Duktape config options will be assigned their default values specified
in config option metadata files in ``config/config-options/``.

You can override individual defines using in several ways (see "Option
overrides" section below for more details): C compiler format (-D and -U
options) or YAML config through a file or inline.

Some changes such as reworking ``#include`` statements cannot be represented
as override files; you'll need to edit the resulting config header manually
or using some scripting approach.

## Genconfig option overrides

Genconfig provides multiple ways of overriding config options when generating
an autodetect or barebones ``duk_config.h`` header:

* C compiler format::

      -DDUK_USE_TRACEBACK_DEPTH=100
      -DDUK_USE_JX
      -UDUK_USE_JC

* YAML config read from a file or given inline on the command line::

      --option-file my_config.yaml
      --option-yaml 'DUK_USE_FASTINT: true'

* A verbatim fixup header can declare custom prototypes and include custom
  headers, and can tweak ``DUK_USE_xxx`` options.  However, since Duktape 2.x
  some config options control automatic pruning of built-in objects and
  properties, and such options (like ``DUK_USE_BUFFEROBJECT_SUPPORT``)
  **MUST NOT** be modified by fixups.  It's thus recommended to modify options
  via the C compiler format or YAML.

These option formats can be mixed which allows you to specify an option
baseline (say ``--option-file low_memory.yaml``) and then apply
further overrides in various ways.  All forced options in C compiler
format and YAML format are processed first, with the last override
winning.

C compiler format
-----------------

The usual C compiler like format is supported because it's quite familiar.
In this example a low memory base configuration is read from a YAML config
file, and a few options are then tweaked using the C compiler format.  An
autodetect header is then generated::

    $ cd duktape
    $ python tools/genconfig.py \
        --metadata config/ \
        --option-file low_memory.yaml \
        -DDUK_USE_TRACEBACK_DEPTH=100 \
        -UDUK_USE_JX -UDUK_USE_JC \
        --output /tmp/duk_config.h \
        duk-config-header

YAML config
-----------

A YAML config file allows options to be specified in a structured,
programmatic manner.  An example YAML config file, ``my_config.yaml``
could contain::

    DUK_USE_OS_STRING: "\"hack-os\""  # force os name for Duktape.env
    DUK_USE_ALIGN_BY: 8  # force align-by-8
    DUK_USE_FASTINT: true
    DUK_UNREF:
      verbatim: "#define DUK_UNREF(x) do { (void) (x); } while (0)"

This file, another override file, and a few inline YAML forced options
could be used as follows to generate a barebones header::

    $ cd duktape
    $ python tools/genconfig.py \
        --metadata config/ \
        --platform linux \
        --compiler gcc \
        --architecture x64 \
        --option-file my_config.yaml \
        --option-file more_overrides.yaml \
        --option-yaml 'DUK_USE_JX: false' \
        --option-yaml 'DUK_USE_JC: false' \
        --output /tmp/duk_config.h \
        duk-config-header

For inline YAML, multiple forced options can be given either by using a YAML
value with multiple keys, or by using multiple options::

    # Multiple values for one option
    --option-yaml '{ DUK_USE_JX: false, DUK_USE_DEBUG: true }'

    # Multiple options
    --option-yaml 'DUK_USE_JX: false' \
    --option-yaml 'DUK_USE_DEBUG: true'

The YAML format for specifying options is simple: the top level value must be
an object whose keys are define names to override.  Values are as follows:

* ``false``: ``#undef`` option::

      # Produces: #undef DUK_USE_DEBUG
      DUK_USE_DEBUG: false

* ``true``: ``#define`` option::

      # Produces: #define DUK_USE_DEBUG
      DUK_USE_DEBUG: true

* number: decimal value for define::

      # Produces: #define DUK_USE_TRACEBACK_DEPTH 10
      DUK_USE_TRACEBACK_DEPTH: 10

      # Produces: #define DUK_USE_TRACEBACK_DEPTH 100000L
      # (a long constant is used automatically if necessary)
      DUK_USE_TRACEBACK_DEPTH: 100000

* string: verbatim string used as the define value::

      # Produces: #define DUK_USE_TRACEBACK_DEPTH (10 + 7)
      DUK_USE_TRACEBACK_DEPTH: "(10 + 7)"

      # Produces: #define DUK_USE_OS_STRING "linux"
      DUK_USE_OS_STRING: "\"linux\""

* C string for value::

      # Produces: #define DUK_USE_OS_STRING "linux"
      DUK_USE_OS_STRING:
        string: "linux"

* verbatim text for entire define::

      # Produces: #define DUK_UNREF(x) do {} while (0)
      DUK_UNREF:
        verbatim: "#define DUK_UNREF(x) do {} while (0)"

Fixup header
------------

In addition to YAML-based option overrides, genconfig has an option for
appending direct "fixup headers" to deal with situations which cannot be
handled with individual option overrides.  For example, you may want to
inject specific environment sanity checks.  This mechanism is similar to
Duktape 1.x ``duk_custom.h`` header.

Since Duktape 2.x some config options control automatic pruning of built-in
objects and properties, and such options (like ``DUK_USE_BUFFEROBJECT_SUPPORT``)
**MUST NOT** be modified by fixups.  It's thus recommended to modify options
via the C compiler format or YAML metadata files.

Fixup headers are emitted after all individual option overrides (in either
C compiler or YAML format) have been resolved, but before emitting option
sanity checks (if enabled).

For example, to generate a barebones header with two fixup headers::

    $ python tools/genconfig.py \
        --metadata config/ \
        --platform linux \
        --compiler gcc \
        --architecture x64 \
        --fixup-file my_env_strings.h \
        --fixup-file my_no_json_fastpath.h \
        --output /tmp/duk_config.h \
        duk-config-header

The ``my_env_strings.h`` fixup header could be::

    /* Force OS string. */
    #undef DUK_USE_OS_STRING
    #if !defined(__WIN32__)
    #error this header is Windows only
    #endif
    #define DUK_USE_OS_STRING "windows"

    /* Force arch string. */
    #undef DUK_USE_ARCH_STRING
    #if !defined(__amd64__)
    #error this header is x64 only
    #endif
    #define DUK_USE_ARCH_STRING "x64"

    /* Force compiler string. */
    #undef DUK_USE_COMPILER_STRING
    #if !defined(__GNUC__)
    #error this header is gcc only
    #endif
    #if defined(__cplusplus__)
    #define DUK_USE_COMPILER_STRING "g++"
    #else
    #define DUK_USE_COMPILER_STRING "gcc"
    #endif

The example fixup header uses dynamic detection and other environment checks
which cannot be easily expressed using individual option overrides.

The ``my_no_json_fastpath.h`` fixup header could be::

    /* Disable JSON fastpath for reduced footprint. */
    #undef DUK_USE_JSON_STRINGIFY_FASTPATH

This could have also been expressed using a simple override, e.g. as
``-UDUK_USE_JSON_STRINGIFY_FASTPATH``.

Fixup headers are appended verbatim so they must be valid C header files,
contain appropriate newlines, and must ``#undef`` any defines before
redefining them if necessary.  Fixup headers can only be used to tweak C
preprocessor defines, they naturally cannot un-include headers or un-typedef
types.

There's also a command line option to append a single fixup line for
convenience::

    # Append two lines to forcibly enable fastints
    --fixup-line '#undef DUK_USE_FASTINT' \
    --fixup-line '#define DUK_USE_FASTINT'

These can be mixed with ``--fixup-file`` options and are processed
in sequence.

Modifying a duk_config.h manually or using scripting
====================================================

The basic approach when using scripted modifications is to take a base header
(either an autodetect or barebones header) and then make specific changes
using a script.  The advantage of doing so is that if the base header is
updated, the script may often still be valid without any manual changes.

Scripting provides much more flexibility than tweaking individual options in
genconfig, but the cost is more complicated maintenance over time.

Using diff/patch
----------------

* Make the necessary changes to the base header manually.

* Use ``diff`` to store the changes::

      $ diff -u duk_config.h.base duk_config.h.edited > edits.diff

* In your build script::

      $ cp duk_config.h.base duk_config.h
      $ patch duk_config.h edits.diff

* If the patch fails (e.g. there is too much offset), you need to
  rebuild the diff file manually.

Using sed (or awk, etc) to modify an option in-place
----------------------------------------------------

If an option is defined on a single line in the base header, e.. either as::

   #define DUK_USE_FOO

or as::

   #undef DUK_USE_FOO

you can use ``sed`` to easily flip such an option::

    # enable shuffle torture
    cat duk_config.h.base | \
        sed -r -e 's/^#\w+\s+DUK_USE_SHUFFLE_TORTURE.*$/#define DUK_USE_SHUFFLE_TORTURE  \/*forced*\//' \
        > duk_config.h

The above example would flip DUK_USE_SHUFFLE_TORTURE on, regardless of
its previous setting.  You can also use a more verbose sed format which
is easier to read especially if there are multiple changes::

    cat duk_config.h.base | sed -r -e '
    s/^#\w+\s+DUK_USE_SHUFFLE_TORTURE.*$/#define DUK_USE_SHUFFLE_TORTURE  \/*forced*\//
    s/^#\w+\s+DUK_USE_OS_STRING.*$/#define DUK_USE_OS_STRING "my-custom-os"  \/*forced*\//
    ' > duk_config.h

This approach won't work if the defined option is defined/undefined
multiple times or if the define has a multiline value.

For more stateful changes you can use ``awk`` or other scripting languages
(Python, Perl, etc).

Modifying defines at __OVERRIDE_DEFINES__
-----------------------------------------

Instead of modifying options in-place as in the sed example above, you can
simply append additional preprocessor directives to undefine/redefine options
as necessary.  This is much easier to maintain in version updates than when
modifications are made in-place.

Genconfig has a direct option to append "fixups" after the main generated
header::

    # my_custom.h is applied after generated header; functionally similar
    # to Duktape 1.2.x duk_custom.h

    $ python tools/genconfig.py [...] --fixup-file my_custom.h [...]

A genconfig-generated barebones header also has the following line near the end
for detecting where to add override defines; this is easy to detect reliably::

    /* __OVERRIDE_DEFINES__ */

The ``__OVERRIDE_DEFINES__`` line is near the end of the file, before any
automatically generated option sanity checks (which are optional) so that the
sanity checks will be applied after your tweaks have been done::

    #!/bin/bash

    CONFIG_IN=duk_config.h.base
    CONFIG_OUT=duk_config.h.new

    cat $CONFIG_IN | sed -e '
    /^\/\* __OVERRIDE_DEFINES__ \*\/$/ {
        r my_overrides.h
        d
    }' > $CONFIG_OUT

Modifying defines near the end of the file is relatively easy but has a few
limitations:

* You can't change typedefs this way because there's no way to un-typedef.

* You can't undo any ``#include`` directives executed.

Modifying defines at the end of the file
----------------------------------------

Another simple approach is to simply assume that an ``#endif`` line (include
guard) is the last line in the file, i.e. there are no trailing empty lines.
Changes will then be applied after option sanity checks which is not ideal::

    #!/bin/bash

    CONFIG_IN=duk_config.h.base
    CONFIG_OUT=duk_config.h.new

    if tail -1 $CONFIG_IN | grep endif ; then
        echo "Final line of $CONFIG_IN is an #endif as expected, modifying config"
    else
        echo "Final line of $CONFIG_IN is not an #endif!"
        exit 1
    fi

    head -n -1 $CONFIG_IN > $CONFIG_OUT
    cat >> $CONFIG_OUT <<EOF
    /*
     *  Config hacks for platform XYZ.
     */

    #undef DUK_USE_FASTINT  /* undef first to avoid redefine */
    #define DUK_USE_FASTINT

    /* compiler on XYZ has a custom "unreferenced" syntax */
    #undef DUK_UNREF
    #define DUK_UNREF(x) do { __foo_compiler_unreferenced((x)); } while (0)

    #endif  /* DUK_CONFIG_H_INCLUDED */
    EOF

    echo "Wrote new config to $CONFIG_OUT, diff -u:"
    diff -u $CONFIG_IN $CONFIG_OUT

Dealing with #include files
---------------------------

Include files are often a portability problem on exotic targets:

* System headers may be missing.  You may need to provide replacement functions
  for even very basic features like string formatting functions.

* System headers may be present but in non-standard include paths.  Duktape
  can't easily autodetect such paths because there's no "#include if available"
  directive: an ``#include`` either succeeds or causes compilation to fail.

* System headers may be present but broken in some fashion so you want to avoid
  them entirely.

* Sometimes custom programming environments have "SDK headers" that conflict
  with standard headers so that you can't include them both at the same time.
  It may be necessary to include the SDK headers but provide manual declarations
  for the system functions needed.

In such cases you may need to replace all the ``#include`` statements of a
base header file and provide alternate include files or manual declarations.

Keeping a manually created duk_config.h up-to-date
--------------------------------------------------

When new Duktape versions are released, the set of config options and
other macros required of the ``duk_config.h`` config header may change.
This is the case for even minor version updates, though incompatible
changes are of course avoided when possible.

Nevertheless, when a new version is taken into use, you may need to
update your config header to match.  How to do that depends on how you
created the config header:

* If you're using the default header, no changes should be necessary.
  You should check out new config options and decide if the defaults are
  OK for them.

* If you're using a script to modify the default or genconfig-generated
  header, you should ensure your script works when the source header is
  updated to the new Duktape release.

* If you're editing a config header manually, you should look at the
  diff between the previous and new default config header to see what
  defines have changed, and then implement matching changes in your
  updated header.

Adding a new compiler, platform, or architecture
================================================

Adding a new platform "Acme OS"
-------------------------------

* Add a new detection snippet ``config/helper-snippets/DUK_F_ACMEOS.h.in``.

* Create a new ``config/platforms/platform_acmeos.h.in``.  Platform files
  should have the necessary ``#include`` statements, select the Date provider,
  and can override various broken platform calls.  For example, if ``realloc()``
  doesn't handle NULL and/or zero size correctly, you can override that.
  Compare to existing platform files for reference.

* Add the platform to ``config/platforms.yaml``, reference ``DUK_F_ACMEOS``
  for detection.

That should be enough for an autogenerated ``duk_config.h`` to support Acme OS
detection.

Adding a compiler or an architecture
------------------------------------

The process is similar for compilers and architectures; see existing files
for reference.

Notes
-----

Byte order
::::::::::

Byte order is a awkward to detect automatically:

* Sometimes byte order is best determined based on architecture, especially
  for architectures with a fixed byte order.  Some architectures can support
  multiple endianness modes, however, and it depends on the platform which
  one is used.

* Sometimes byte order is best determined from compiler defines; for example
  GCC and Clang provide built-in defines which mostly provide the necessary
  endianness information without the need to use system headers.

* Sometimes byte order is best determined from platform ``#include`` headers.
  There's a lot of variability in what defines are available, and where the
  related headers are located.

To allow endianness to be determined in each phase, platform, architecture,
and compiler files should only define endianness when not already defined::

    #if !defined(DUK_USE_BYTE_ORDER)
    #define DUK_USE_BYTE_ORDER 1
    #endif

Alignment
:::::::::

Alignment is similar to byte order for detection: it can be sometimes
detected from architecture, sometimes from platform, etc.  There are
architectures where alignment requirements are configurable, e.g. on X86
it's up to the operating system to decide if AC (Alignment Check) is enabled
for application code.

As a result, platform, architecture, and compiler files should avoid
redefinition::

    #if !defined(DUK_USE_ALIGN_BY)
    #define DUK_USE_ALIGN_BY 4
    #endif

Defines provided by duk_config.h
================================

The role of ``duk_config.h`` is to provide all typedefs, macros, structures,
system headers, etc, which are platform dependent.  Duktape internals can
then just assume these are in place and will remain clean of any detection.

These typedefs, macros, etc, include:

* Including platform specific headers (``#include <...>``) needed by any of
  the config header macros, including:

  - Standard library functions like ``sprintf()`` and ``memset()``

  - Math functions like ``acos()``

  - Any other functions called by macros defined in duk_config.h, e.g. the
    functions needed by a custom Date provider

* Typedefs for integer and floating point types (``duk_uint8_t``, etc),
  and their limit defines.

* Some IEEE double constants, including NaN and Infinity, because some
  constants cannot be reliably expressed as constants in all compilers.

* Wrapper macros for platform functions, covering string operations,
  file I/O, math, etc.  For example: ``DUK_FOPEN()``, ``DUK_SPRINTF()``,
  ``DUK_ACOS()``), etc.  Typically these are just mapped 1:1 to platform
  functions, but sometimes tweaks are needed.

* Various compiler specific macros: unreachable code, unreferenced
  variable, symbol visibility attributes, inlining control, etc.

* Duktape config options, ``DUK_USE_xxx``, including a possible custom
  Date provider.

Duktape config options are available in a machine parseable metadata form:

* ``config/config-options/DUK_USE_*.yaml``: Duktape config options.
