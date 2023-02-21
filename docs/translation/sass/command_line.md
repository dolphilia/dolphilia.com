# コマンドライン

## 概要

Sass の異なる実装は、コマンドラインからそれらを使用するときに異なるインターフェイスを持っています。

- Dart Sass はどのようにインストールしても同じコマンドラインインターフェースを持っています。
- Ruby Sass は非推奨であり、他の実装に移行することを推奨します。

## Dart Sass

### 使用方法

Dart Sass 実行ファイルは、2 つのモードのいずれかで呼び出すことができます。

#### 一対一モード

```bash
sass <input.scss> [output.css]
```

One-to-one モードは、一つの入力ファイル (input.scss) を一つの出力場所 (output.css) にコンパイルします。出力先が指定されない場合、コンパイルされたCSSは端末に出力されます。

入力ファイルは、拡張子が .scss の場合は SCSS として、拡張子が .sass の場合は字下げ構文として、拡張子が .css の場合はプレーンな CSS としてパースされます。拡張子が .scss でない場合、あるいは標準入力から入力された場合は、デフォルトで SCSS としてパースされます。これは --indented フラグで制御することができます。

入力ファイルの代わりに特殊文字列 - を渡すと、標準入力から入力ファイルを読み込むように Sass に指示することができます。Sass は、--indented フラグが渡されない限り、デフォルトで SCSS として解析されます。

#### 多対多モード

互換性:

- Dart Sass: since 1.4.0

```bash
sass [<input.scss>:<output.css>] [<input/>:<output/>]...
```

多対多モードは、1つまたは複数の入力ファイルを1つまたは複数の出力ファイルにコンパイルします。入力と出力はコロンで区切られます。また、あるディレクトリにあるすべての Sass ファイルを、別のディレクトリにある同じ名前の CSS ファイルにコンパイルすることもできます。

```bash
​# Compiles style.scss to style.css.
$ sass style.scss:style.css

​# Compiles light.scss and dark.scss to light.css and dark.css.
$ sass light.scss:light.css dark.scss:dark.css

​# Compiles all Sass files in themes/ to CSS files in public/css/.
$ sass themes:public/css
```

ディレクトリ全体をコンパイルするとき、Sass は _ で始まる名前の部分ファイルを無視します。不要な出力ファイルを大量に作成することなく、スタイルシートを分離するために部分ファイルを使用することができます。


### オプション

入出力パーマリンク入出力

これらのオプションは、Sass が入力ファイルをロードする方法と出力ファイルを生成する方法を制御します。

#### –stdin

このフラグは、Sass に入力ファイルを標準入力から読み込むように指示する代替方法です。このフラグが渡された場合、入力ファイルは渡されないかもしれません。

```bash
$ echo "h1 {font-size: 40px}" | sass --stdin h1.css
$ echo "h1 {font-size: 40px}" | sass --stdin
h1 {
  font-size: 40px;
}
```

多対多のモードでは --stdin フラグは使用できません。

#### –indented

このフラグは、入力ファイルをインデントされた構文でパースするように Sass に指示します。多対多モードで使用した場合、すべての入力ファイルはインデントされた構文として解析されますが、使用するファイルは通常通り構文が決定されます。その逆、--no-indented を使用すると、すべての入力ファイルを SCSS として解析するように強制することができます。

入力ファイルが標準入力であり、その構文が自動的に決定されない場合に --indented フラグが有用であることが多い。

```bash
$ echo -e 'h1\n  font-size: 40px' | sass --indented -
h1 {
  font-size: 40px;
}
```

#### –load-path

このオプション（短縮形 -I）は、Sass がスタイルシートを探すための追加のロードパスを追加します。これは、複数のロードパスを提供するために複数回渡すことができます。早いロードパスは遅いロードパスより優先されます。

```bash
$ sass --load-path=node_modules/bootstrap/dist/css style.scss style.css
```

#### –style

このオプション（略称：-s）は、生成されるCSSの出力スタイルを制御します。Dart Sassは2つの出力スタイルをサポートしています。

- expanded (デフォルト) は、各セレクタと宣言をそれ自身の行に記述します。
- compressed は、可能な限り余分な文字を削除し、スタイルシート全体を1行で記述します。

```bash
$ sass --style=expanded style.scss
h1 {
  font-size: 40px;
}

$ sass --style=compressed style.scss
h1{font-size:40px}
```

#### –no-charset

互換性:

- Dart Sass: since 1.19.0

このフラグは、@charset 宣言または UTF-8 バイトオーダーマークを決して発行しないように Sass に指示します。デフォルト、または --charset が渡された場合、スタイルシートに非 ASCII 文字が含まれていると、Sass は @charset 宣言 (expanded output モード) または byte-order mark (compressed output モード) のいずれかを挿入します。

```scss
$ echo 'h1::before {content: "👭"}' | sass --no-charset
h1::before {
  content: "👭";
}

$ echo 'h1::before {content: "👭"}' | sass --charset
@charset "UTF-8";
h1::before {
  content: "👭";
}
```

#### –error-css

互換性:

- Dart Sass: since 1.20.0

このフラグは、コンパイル中にエラーが発生したときに CSS ファイルを出力するかどうかを Sass に指示します。この CSS ファイルはコメントと body::before の content プロパティにエラーを記述し、ターミナルに戻ることなくブラウザでエラーメッセージを確認できるようにします。

デフォルトでは、（標準出力ではなく）ディスク上の少なくとも1つのファイルにコンパイルしている場合、エラーCSSが有効になります。明示的に --error-css を渡すと、標準出力にコンパイルしているときでも有効になり、 --no-error-css を渡すと、すべての場所で無効になります。無効にした場合、--updateフラグと--watchフラグは、エラーが発生したときに代わりにCSSファイルを削除します。

```bash
$ sass --error-css style.scss style.css
/* Error: Incompatible units em and px.
 *   ,
 * 1 | $width: 15px + 2em;
 *   |         ^^^^^^^^^^
 *   '
 *   test.scss 1:9  root stylesheet */

body::before {
  font-family: "Source Code Pro", "SF Mono", Monaco, Inconsolata, "Fira Mono",
      "Droid Sans Mono", monospace, monospace;
  white-space: pre;
  display: block;
  padding: 1em;
  margin-bottom: 1em;
  border-bottom: 2px solid black;
  content: "Error: Incompatible units em and px.\a   \2577 \a 1 \2502  $width: 15px + 2em;\a   \2502          ^^^^^^^^^^\a   \2575 \a   test.scss 1:9  root stylesheet";
}
Error: Incompatible units em and px.
  ╷
1 │ $width: 15px + 2em;
  │         ^^^^^^^^^^
  ╵
  test.scss 1:9  root stylesheet
```

#### –update

互換性:

- Dart Sass: since 1.4.0

update フラグが渡された場合、Sass は対応する CSS ファイルが生成されたよりも最近に依存関係が変更されたスタイルシートのみをコンパイルします。また、スタイルシートを更新する際にステータス・メッセージを表示します。

```bash
$ sass --update themes:public/css
Compiled themes/light.scss to public/css/light.css.
```

#### Source Maps

互換性:

- Dart Sass: since 1.3.0

ソースマップは、CSS を消費するブラウザやその他のツールに、その CSS が生成された Sass ファイルとどのように対応しているかを伝えるためのファイルです。これにより、ブラウザで Sass ファイルを確認したり、編集したりすることが可能になります。Chrome と Firefox でソースマップを使用する手順を参照してください。

Dart Sass はデフォルトで、生成するすべての CSS ファイルに対してソースマップを生成します。


#### –no-source-map

no-source-map フラグが渡された場合、Sass はソースマップを生成しません。

```bash
$ sass --no-source-map style.scss style.css
```


#### –source-map-urls

このオプションは、Sass が生成するソースマップが、生成された CSS に貢献した Sass ファイルにリンクバックする方法を制御します。Dart Sass は 2 種類の URL をサポートしています。

- relative（デフォルト）は、ソースマップファイルの位置から Sass ソースファイルの位置への相対 URL を使用します。
- absolute は、絶対的なファイルを使用します。Sass ソースファイルの URL を使用します。絶対 URL は、CSS がコンパイルされたのと同じコンピュータ上でのみ動作することに注意してください。

```bash
​# Generates a URL like "../sass/style.scss".
$ sass --source-map-urls=relative sass/style.scss css/style.css

​# Generates a URL like "file:///home/style-wiz/sassy-app/sass/style.scss".
$ sass --source-map-urls=absolute sass/style.scss css/style.css
```

#### –embed-sources

このフラグは、生成された CSS に貢献した Sass ファイルのコンテンツ全体をソースマップに埋め込むように Sass に指示します。これにより、非常に大きなソースマップが生成される可能性がありますが、CSS がどのように提供されるかに関係なく、どのコンピュータでもソースが利用できるようになることが保証されます。

```bash
$ sass --embed-sources sass/style.scss css.style.css
```

#### –embed-source-map

このフラグは、別個のファイルを作成してCSSからリンクするのではなく、生成されたCSSにソースマップファイルの内容を埋め込むようにSassに指示します。

```bash
$ sass --embed-source-map sass/style.scss css.style.css
```

#### その他のオプション

#### –watch

互換性:

- Dart Sass: since 1.6.0

このフラグ（短縮形 -w）は --update フラグのように動作しますが、最初のコンパイルが完了した後、Sass はオープンな状態を維持し、スタイルシートやその依存関係が変更されるたびにコンパイルを続行します。

Sassは、コマンドラインでそのまま渡したディレクトリ、コマンドラインで渡したファイル名の親ディレクトリ、およびロードパスのみを監視します。ファイルの @import/@use/@forward 規則に基づく追加のディレクトリは監視しません。

```bash
$ sass --watch themes:public/css
Compiled themes/light.scss to public/css/light.css.

​# Then when you edit themes/dark.scss...
Compiled themes/dark.scss to public/css/dark.css.
```

#### –poll

互換性:

- Dart Sass: since 1.8.0

このフラグは --watch と一緒に渡すことで、Sass にソースファイルの変更をオペレーティングシステムからの通知に頼らず、手動で頻繁に確認するように指示します。これは、オペレーティングシステムの通知システムが機能しないリモートドライブで Sass を編集している場合に必要な場合があります。

```bash
$ sass --watch --poll themes:public/css
Compiled themes/light.scss to public/css/light.css.

​# Then when you edit themes/dark.scss...
Compiled themes/dark.scss to public/css/dark.css.
```

#### –stop-on-error

互換性:

- Dart Sass: since 1.8.0

このフラグは、エラーが検出されたときに、エラーを含まない他の Sass ファイルのコンパイルを試みるのではなく、直ちにコンパイルを停止するように Sass に指示します。これは主に多対多モードで有用です。

```bash
$ sass --stop-on-error themes:public/css
Error: Expected expression.
   ╷
42 │ h1 {font-face: }
   │                ^
   ╵
  themes/light.scss 42:16  root stylesheet
```

#### –interactive

互換性:

- Dart Sass: since 1.5.0

このフラグ (略称 -i) は、SassScript 式を記述してその結果を確認できるインタラクティブ モードで実行するように Sass に指示します。インタラクティブモードは、変数と @use ルールもサポートしています。

```scss
$ sass --interactive
>> 1px + 1in
97px
>> @use "sass:map"
>> $map: ("width": 100px, "height": 70px)
("width": 100px, "height": 70px)
>> map.get($map, "width")
100px
```

#### –color

このフラグ (短縮形 -c) は Sass にターミナルの色を表示するように指示し、その逆の --no-color は色を表示しないように指示します。デフォルトでは、色をサポートするターミナル上で実行されているように見える場合、色を表示します。

```scss
$ sass --color style.scss style.css
Error: Incompatible units em and px.
  ╷
1 │ $width: 15px + 2em
  │         ^^^^^^^^^^
  ╵
  style.scss 1:9  root stylesheet

$ sass --no-color style.scss style.css
Error: Incompatible units em and px.
  ╷
1 │ $width: 15px + 2em
  │         ^^^^^^^^^^
  ╵
  style.scss 1:9  root stylesheet
```

#### –no-unicode

互換性:

- Dart Sass: since 1.17.0

このフラグは、エラーメッセージの一部として ASCII 文字のみを端末に出力するよう Sass に指示します。デフォルト、または --unicode が渡された場合、Sass はこれらのメッセージのために非 ASCII 文字を出力します。このフラグは CSS 出力には影響を与えません。

```scss
$ sass --no-unicode style.scss style.css
Error: Incompatible units em and px.
  ,
1 | $width: 15px + 2em;
  |         ^^^^^^^^^^
  '
  test.scss 1:9  root stylesheet

$ sass --unicode style.scss style.css
Error: Incompatible units em and px.
  ╷
1 │ $width: 15px + 2em;
  │         ^^^^^^^^^^
  ╵
  test.scss 1:9  root stylesheet
```

#### –quiet

このフラグ（短縮形 -q）は、コンパイル時に警告を出さないように Sass に指示します。デフォルトでは、Sass は非推奨の機能が使用されたとき、または @warn ルールに遭遇したときに警告を出します。また、@debug ルールも無効になります。

```bash
$ sass --quiet style.scss style.css
```

#### –quiet-deps

このフラグは、依存関係から来る非推奨の警告を発しないように Sass に指示します。ロードパスを通して過渡的にインポートされるすべてのファイルを「依存関係」と見なします。このフラグは @warn ルールや @debug ルールには影響を与えません。

```bash
$ sass --load-path=node_modules --quiet-deps style.scss style.css
```

#### –trace

このフラグは、エラーが発生したときに、Dart または JavaScript の完全なスタックトレースを表示するように Sass に指示します。これは、Sass チームがエラーのデバッグを行う際に使用します。

```scss
$ sass --trace style.scss style.css
Error: Expected expression.
   ╷
42 │ h1 {font-face: }
   │                ^
   ╵
  themes/light.scss 42:16  root stylesheet

package:sass/src/visitor/evaluate.dart 1846:7                        _EvaluateVisitor._addExceptionSpan
package:sass/src/visitor/evaluate.dart 1128:12                       _EvaluateVisitor.visitBinaryOperationExpression
package:sass/src/ast/sass/expression/binary_operation.dart 39:15     BinaryOperationExpression.accept
package:sass/src/visitor/evaluate.dart 1097:25                       _EvaluateVisitor.visitVariableDeclaration
package:sass/src/ast/sass/statement/variable_declaration.dart 50:15  VariableDeclaration.accept
package:sass/src/visitor/evaluate.dart 335:13                        _EvaluateVisitor.visitStylesheet
package:sass/src/visitor/evaluate.dart 323:5                         _EvaluateVisitor.run
package:sass/src/visitor/evaluate.dart 81:10                         evaluate
package:sass/src/executable/compile_stylesheet.dart 59:9             compileStylesheet
package:sass/src/executable.dart 62:15                               main
```

#### –help

このフラグ(短縮形 -h)は、このドキュメントの要約を表示します。

```scss
$ sass --help
Compile Sass to CSS.

Usage: sass <input.scss> [output.css]
       sass <input.scss>:<output.css> <input/>:<output/>

...
```

#### –version

このフラグは、Sass の現在のバージョンを表示します。

```scss
$ sass --version
1.58.3
```


## Ruby Sass

::: warning

⚠️ Heads up!

Ruby Sassは寿命が尽き、現在は全くメンテナンスされていません。Dart Sass または LibSass に切り替えてください。

:::


### Usage

Ruby Sassの実行ファイルは、2つのモードのいずれかで呼び出すことができます。

#### One-to-Oneモード

```bash
sass [input.scss] [output.css]
```

One-to-one モードは、一つの入力ファイル (input.scss) を一つの出力場所 (output.css) にコンパイルします。出力場所が渡されない場合、コンパイルされたCSSは端末に出力されます。入力も出力も渡されない場合、CSS は標準入力から読み込まれ、端末に出力されます。

入力ファイルは、拡張子が .scss の場合は SCSS として、拡張子が .sass の場合はインデントされた構文として解析されます。拡張子が .scss でない場合、あるいは標準入力から読み込まれた場合は、デフォルトでインデントされた構文として解析されます。これは、-scss フラグで制御することができます。

#### 多対多モード

```bash
sass [<input.css>:<output.css>] [<input/>:<output/>] [input.css] [input/]...
```

多対多モードは、1つまたは複数の入力ファイルを1つまたは複数の出力ファイルにコンパイルします。入力と出力はコロンで区切られます。また、ディレクトリ内のすべての Sass ファイルを、別のディレクトリにある同じ名前の CSS ファイルにコンパイルすることもできます。多対多モードは、いずれかの引数にコロンが含まれている場合、または --update フラグや --watch フラグが渡された場合に有効になります。

入力ファイルが対応する出力ファイルなしで渡された場合、入力ファイルと同じ名前の CSS ファイルにコンパイルされますが、拡張子は .css に置き換えられます。入力ディレクトリが対応する出力ディレクトリなしで渡された場合、その中のすべての Sass ファイルは同じディレクトリの CSS ファイルにコンパイルされます。

```scss
$ sass style.scss:style.css
      write style.css
      write style.css.map
$ sass light.scss:light.css dark.scss:dark.css
      write light.css
      write light.css.map
      write dark.css
      write dark.css.map
$ sass themes:public/css
      write public/css/light.css
      write public/css/light.css.map
      write public/css/dark.css
      write public/css/dark.css.map
```

ディレクトリ全体をコンパイルするとき、Sass は _ で始まる名前の部分ファイルを無視します。不必要な出力ファイルを大量に作成することなく、スタイルシートを分離するために部分ファイルを使用することができます。

多対多モードでは、対応する CSS ファイルが生成されたよりも最近に依存関係が変更されたスタイルシートのみをコンパイルします。また、スタイルシートを更新する際にステータスメッセージを表示する。


### オプション

#### 共通

##### –load-path

このオプション（短縮形 -I）は、Sass がスタイルシートを探すための追加のロードパスを追加します。これは、複数のロードパスを提供するために複数回渡すことができます。早いロードパスは遅いロードパスより優先されます。

```bash
$ sass --load-path=node_modules/bootstrap/dist/css style.scss style.css
```

ロードパスは、SASS_PATH環境変数が設定されている場合、その変数からも読み込まれます。この変数は ; (Windows) または : (その他のオペレーティングシステム) で区切られたパスのリストである必要があります。SASS_PATH にあるロードパスは、コマンドラインで渡されたロードパスより優先されます。

```bash
$ SASS_PATH=node_modules/bootstrap/dist/css sass style.scss style.css
```

##### –require

このオプション（略称：-r）は、Sassを実行する前にRuby gemをロードします。Ruby で定義された関数を Sass 環境にロードするために使用できます。

```bash
$ sass --require=rails-sass-images style.scss style.css
```

###### –compass

このフラグは、Compassフレームワークをロードし、そのミキシンと関数をSassで使用できるようにします。

```bash
$ sass --compass style.scss style.css
```

###### –style

このオプション (略称 -t) は、生成される CSS の出力スタイルを制御します。Ruby Sassは4つの出力スタイルをサポートしています。

- nested (デフォルト) は、Sass ソースの入れ子に一致するように CSS 規則をインデントします。
- expanded は、各セレクタと宣言をそれぞれの行に記述します。
- compact は、各 CSS ルールを 1 行にまとめます。
- compressed は、余分な文字を可能な限り削除し、スタイルシート全体を1行で記述します。

```bash
$ sass --style=nested
h1 {
  font-size: 40px; }
  h1 code {
    font-face: Roboto Mono; }

$ sass --style=expanded style.scss
h1 {
  font-size: 40px;
}
h1 code {
  font-face: Roboto Mono;
}

$ sass --style=compact style.scss
h1 { font-size: 40px; }
h1 code { font-face: Roboto Mono; }

$ sass --style=compressed style.scss
h1{font-size:40px}h1 code{font-face:Roboto Mono}
```

##### –help

このフラグ(短縮形は-hと-?)は、このドキュメントの要約を表示します。

```bash
$ sass --help
Usage: sass [options] [INPUT] [OUTPUT]

Description:
  Converts SCSS or Sass files to CSS.

...
```

##### –version

このフラグは、Sass の現在のバージョンを表示します。

```bash
$ sass --version
```

#### Watching and Updating

これらのオプションは多対多モードに影響します。

##### –watch

多対多モードを有効にし、スタイルシートやその依存関係が変更されるたびに、Sass を開いたままにしてコンパイルを続行します。

```bash
$ sass --watch themes:public/css
      write public/css/light.css
      write public/css/light.css.map

​# Then when you edit themes/dark.scss...
      write public/css/dark.css
      write public/css/dark.css.map
```

###### –poll

このフラグは --watch と一緒に渡すことで、Sass にソースファイルの変更をオペレーティングシステムからの通知に頼らず、手動で頻繁に確認するように指示します。これは、オペレーティングシステムの通知システムが機能しないリモートドライブで Sass を編集している場合に必要な場合があります。

```bash
$ sass --watch --poll themes:public/css
      write public/css/light.css
      write public/css/light.css.map

​# Then when you edit themes/dark.scss...
      write public/css/dark.css
      write public/css/dark.css.map
```

##### –update

このフラグは、引数がコロンで区切られたペアでない場合でも、多対多のモードを有効にします。

```bash
$ sass --update style.scss
      write style.css
      write style.css.map
```

##### –force

このフラグ (短縮形 -f) は多対多モードでのみ渡すことができます。このフラグを指定すると、ソースファイルが出力ファイルよりも最新である場合にのみコンパイルされるのではなく、Sass ファイルが常に CSS ファイルにコンパイルされるようになります。

--force フラグは --watch フラグと一緒に渡すことはできません。

```bash
$ sass --force style.scss:style.css
      write style.css
      write style.css.map
```

##### –stop-on-error

このフラグは多対多のモードでのみ渡すことができます。エラーが検出された場合、エラーが含まれていない他の Sass ファイルのコンパイルを試みるのではなく、直ちにコンパイルを停止するように Sass に指示します。

```bash
$ sass --stop-on-error themes:public/css
Error: Invalid CSS after "h1 {font-size: ": expected expression (e.g. 1px, bold), was "}"
        on line 1 of test.scss
  Use --trace for backtrace.
```

#### Input and Output

これらのオプションは、Sassが入力ファイルを読み込む方法と出力ファイルを作成する方法を制御します。

##### –scss

このフラグは、Sass に標準入力を SCSS としてパースするように指示します。

```bash
$ echo "h1 {font-size: 40px}" | sass --scss
h1 {
  font-size: 40px;
}
```

##### –sourcemap

このオプションは、Sass がソースマップを生成する方法を制御します。ソースマップは、CSS を消費するブラウザやその他のツールに、その CSS が生成元の Sass ファイルにどのように対応するかを伝えるためのファイルです。これにより、ブラウザで Sass ファイルを確認したり、編集したりすることが可能になります。Chrome と Firefox でソースマップを使用する手順を参照してください。4つの値があります。

- auto（デフォルト）は、可能な限りソースマップから Sass スタイルシートへのリンクに相対 URL を使用し、それ以外は絶対ファイルです。URL を使用します。
- file は常に絶対的なファイルを使用します。URL を使用して、ソースマップから Sass スタイルシートへリンクします。
- inline は Sass スタイルシートのテキストをソースマップに直接含めます。
- none はソースマップを全く生成しません。

```bash​
# Generates a URL like "../sass/style.scss".
$ sass --sourcemap=auto sass/style.scss css/style.css

​# Generates a URL like "file:///home/style-wiz/sassy-app/sass/style.scss".
$ sass --sourcemap=file sass/style.scss css/style.css

​# Includes the full text of sass/style.scss in the source map.
$ sass --sourcemap=inline sass/style.scss css/style.css

​# Doesn't generate a source map.
$ sass --sourcemap=none sass/style.scss css/style.css
```

##### –stdin

このフラグ (短縮形 -s) は、Sass に入力ファイルを標準入力から読み込むように指示します。このフラグが渡された場合、入力ファイルは渡されないかもしれません。

```bash
$ echo -e 'h1\n  font-size: 40px' | sass --stdin
h1 {
  font-size: 40px;
}
```

多対多のモードでは --stdin フラグは使用できません。

##### –default-encoding

このオプション (省略形 -E) は、文字エンコーディングを明示的に指定しないソース・ファイルを読み込む際に Sass が使用するデフォルトの文字エンコーディングを制御します。デフォルトは、オペレーティング・システムのデフォルト・エンコーディングです。

```bash
$ sass --default-encoding=Shift-JIS style.scss style.css
```

##### –unix-newlines

このフラグは、オペレーティングシステムのデフォルト（Windows では、U+000D CARRIAGE RETURN と U+000A LINE FEED）とは対照的に、U+000A LINE FEED 文字で行を区切る出力ファイルを生成するように Sass に指示します。Unixスタイルの改行がデフォルトのシステムでは常にそうである。

```bash
$ sass --unix-newlines style.scss style.css
```

##### –debug-info

このフラグ (短縮形 -g) を指定すると、Sass は各スタイル規則がソース stylehseet のどこで定義されたかを示すダミーの @media クエリーを出力します。

::: warning

⚠️ Heads up!

このフラグは後方互換性のためにのみ存在します。ソースマップは、CSS を生成した Sass にマッピングするための推奨方法となりました。

:::

```bash
$ sass --debug-info style.scss
@media -sass-debug-info{filename{font-family:file\:\/\/\/home\/style-wiz\/sassy-app\/style\.scss}line{font-family:\000031}}
h1 {
  font-size: 40px; }
```

##### –line-comments

このフラグ（--line-numbers、略称：-lとしても使用可能）を使用すると、Sassは各スタイル・ルールがソース・スタイルシートのどこで定義されたかを示すコメントを出力するようになります。

```bash
$ sass --line-numbers style.scss
/* line 1, style.scss */
h1 {
  font-size: 40px; }
```

#### その他のオプション

##### –interactive

このフラグ (略称 -i) は、SassScript 式を記述してその結果を確認できるインタラクティブ モードで実行するように Sass に指示します。インタラクティブ・モードは変数もサポートしています。

```bash
$ sass --interactive
>> 1px + 1in
97px
>> $map: ("width": 100px, "height": 70px)
("width": 100px, "height": 70px)
>> map-get($map, "width")
100px
```

##### –check

このフラグ（-c）は、入力ファイルの構文が有効であるかどうかを、そのファイルを実行せずに確認するように Sass に指示します。シンタックスが有効な場合、ステータス 0 で終了します。

```bash
$ sass --check style.scss
```

##### –precision

このオプションは、Sassが小数点を表示する際に何桁の精度を使用するかを指定します。

```bash
$ echo -e 'h1\n  font-size: (100px / 3)' | sass --precision=20
h1 {
  font-size: 33.333333333333336px; }
```

##### –cache-location

このオプションは、Sassがパースしたファイルのキャッシュをどこに保存するかを指定します。デフォルトは .sass-cache です。

```bash
$ sass --cache-location=/tmp/sass-cache style.scss style.css
```

##### –no-cache

このフラグ (短縮形 -C) は、パースされたファイルをまったくキャッシュしないように Sass に指示します。

```bash
$ sass --no-cache style.scss style.css
```

##### –trace

このフラグは、エラーが発生したときに Ruby の完全なスタックトレースを表示するように Sass に指示します。これは、Sass チームがエラーのデバッグを行う際に使用します。

```bash
Traceback (most recent call last):
        25: from /usr/share/gems/sass/bin/sass:13:in `<main>'
        24: from /usr/share/gems/sass/lib/sass/exec/base.rb:18:in `parse!'
        23: from /usr/share/gems/sass/lib/sass/exec/base.rb:50:in `parse'
        22: from /usr/share/gems/sass/lib/sass/exec/sass_scss.rb:63:in `process_result'
        21: from /usr/share/gems/sass/lib/sass/exec/sass_scss.rb:396:in `run'
        20: from /usr/share/gems/sass/lib/sass/engine.rb:290:in `render'
        19: from /usr/share/gems/sass/lib/sass/engine.rb:414:in `_to_tree'
        18: from /usr/share/gems/sass/lib/sass/scss/parser.rb:41:in `parse'
        17: from /usr/share/gems/sass/lib/sass/scss/parser.rb:137:in `stylesheet'
        16: from /usr/share/gems/sass/lib/sass/scss/parser.rb:697:in `block_contents'
        15: from /usr/share/gems/sass/lib/sass/scss/parser.rb:707:in `block_child'
        14: from /usr/share/gems/sass/lib/sass/scss/parser.rb:681:in `ruleset'
        13: from /usr/share/gems/sass/lib/sass/scss/parser.rb:689:in `block'
        12: from /usr/share/gems/sass/lib/sass/scss/parser.rb:697:in `block_contents'
        11: from /usr/share/gems/sass/lib/sass/scss/parser.rb:708:in `block_child'
        10: from /usr/share/gems/sass/lib/sass/scss/parser.rb:743:in `declaration_or_ruleset'
         9: from /usr/share/gems/sass/lib/sass/scss/parser.rb:820:in `try_declaration'
         8: from /usr/share/gems/sass/lib/sass/scss/parser.rb:1281:in `rethrow'
         7: from /usr/share/gems/sass/lib/sass/scss/parser.rb:807:in `block in try_declaration'
         6: from /usr/share/gems/sass/lib/sass/scss/parser.rb:999:in `value!'
         5: from /usr/share/gems/sass/lib/sass/scss/parser.rb:1161:in `sass_script'
         4: from /usr/share/gems/sass/lib/sass/script/parser.rb:68:in `parse'
         3: from /usr/share/gems/sass/lib/sass/script/parser.rb:855:in `assert_expr'
         2: from /usr/share/gems/sass/lib/sass/script/lexer.rb:240:in `expected!'
         1: from /usr/share/gems/sass/lib/sass/scss/parser.rb:1305:in `expected'
test.scss:1: Invalid CSS after "h1 {font-size: ": expected expression (e.g. 1px, bold), was "}" (Sass::SyntaxError)
```

##### –quiet

このフラグ（短縮形 -q）は、コンパイル時に警告を出さないように Sass に指示します。デフォルトでは、Sass は非推奨の機能が使用されたとき、または @warn ルールに遭遇したときに警告を出します。また、@debug ルールも無効になります。

```bash
$ sass --quiet style.scss style.css
```

## Migrator

Sass migrator は Sass ファイルを自動的に更新し、最新かつ最高のバージョンの言語への移行を支援します。各コマンドは単一の機能を移行するため、いつ何を更新するかについて可能な限り制御することができます。

### 使用方法

Sass migrator を使用するには、どのマイグレーションを実行したいか、どの Sass ファイルをマイグレーションしたいかを指定します。

```bash
sass-migrator <migration> <entrypoint.scss...>
```

デフォルトでは、migrator はコマンドラインで明示的に渡したファイルのみを変更します。migrate-deps オプションを渡すと、@use ルール、@forward ルール、または @import ルールを使って読み込まれたすべてのスタイルシートも変更するよう migrator に指示します。また、実際に保存することなく、どのような変更が行われるかをテスト実行したい場合は、-dry-run --verbose (略して -nv) を渡すことができます。

```bash
$ cat style.scss
$body-bg: #000;
$body-color: #111;

@import "bootstrap";

@include media-breakpoint-up(sm) {
  .navbar {
    display: block;
  }
}
$ sass-migrator --migrate-deps module style.scss
$ cat style.scss
@use "bootstrap" with (
  $body-bg: #000,
  $body-color: #111
);

@include bootstrap.media-breakpoint-up(sm) {
  .navbar {
    display: block;
  }
}
```

### インストール

Sass migrator は、Dart Sass と同じ場所からインストールすることができます。

#### スタンドアロン

Windows、Mac、Linux に Sass migrator をインストールするには、GitHub からあなたのオペレーティングシステム用のパッケージをダウンロードし、PATH に追加します。

#### npm

Node.js を使用している場合、npm を使用して Sass migrator をインストールすることもできます。

```bash
npm install -g sass-migrator
```

#### Chocolatey

Windows 用の Chocolatey パッケージマネージャを使用している場合、Sass migrator をインストールするには、次のように実行します。

```bash
choco install sass-migrator
```

#### Homebrew

Mac OS X 用の Homebrew パッケージ・マネージャを使用している場合、Dart Sass をインストールするには、次のように実行します。

```bash
brew install sass/sass/migrator
```

### グローバルオプション

これらのオプションは、すべてのマイグレーターで利用可能です。

#### –migrate-deps

このオプション (短縮形 -d) は、コマンドラインで明示的に渡されたスタイルシートだけでなく、@use ルール、@forward ルール、または @import ルールによって依存するすべてのスタイルシートも変更するよう migrator に指示します。

```bash
$ sass-migrator module --verbose style.scss
Migrating style.scss
$ sass-migrator module --verbose --migrate-deps style.scss
Migrating style.scss
Migrating _theme.scss
Migrating _fonts.scss
Migrating _grid.scss
```

::: warning

⚠️ Heads up!

モジュール migrator は @use ルールや @forward ルールを使って依存しているスタイルシートはすでにモジュールシステムに移行されていると仮定して、--migrate-deps オプションが渡された場合でも移行を試みない。

:::

#### –load-path

このオプション (短縮形 -I) は migrator がスタイルシートを探すロードパスを指定します。複数のロードパスを指定するために、このオプションを複数回渡すことができる。先に指定したロードパスが後に指定したロードパスより優先される。

ロードパスから読み込まれる依存関係はサードパーティライブラリと見なされるため、--migrate-deps オプションが渡された場合でも migrator はそれらを移行しない。

#### –dry-run

このフラグ (短縮形 -n) は、migrator に変更をディスクに保存しないように指示します。その代わり、変更したであろうファイルのリストを表示する。これは、一般に --verbose オプションと組み合わせて、同様に変更されたであろう内容を表示するために使われる。

```scss
$ sass-migrator module --dry-run --migrate-deps style.scss
Dry run. Logging migrated files instead of overwriting...

style.scss
_theme.scss
_fonts.scss
_grid.scss
```

#### –no-unicode

このフラグは、Sass migrator がエラーメッセージの一部として ASCII 文字を端末に出力することのみを指示します。デフォルト、または --unicode が渡された場合、migrator はこれらのメッセージに対して非 ASCII 文字を出力します。このフラグは CSS 出力に影響を与えません。

```bash
$ sass-migrator --no-unicode module style.scss
line 1, column 9 of style.scss: Error: Could not find Sass file at 'typography'.
  ,
1 | @import "typography";
  |         ^^^^^^^^^^^^
  '
Migration failed!

$ sass-migrator --unicode module style.scss
line 1, column 9 of style.scss: Error: Could not find Sass file at 'typography'.
  ╷
1 │ @import "typography";
  │         ^^^^^^^^^^^^
  ╵
Migration failed!
```

#### –verbose

このフラグ (短縮形 -v) は、migrator に追加情報をコンソールに表示するように指示します。デフォルトでは、変更されたファイルの名前を表示するだけですが、 --dry-run オプションと組み合わせると、それらのファイルの新しい内容も表示します。

```bash
$ sass-migrator module --verbose --dry-run style.scss
Dry run. Logging migrated files instead of overwriting...
<==> style.scss
@use "bootstrap" with (
  $body-bg: #000,
  $body-color: #111
);

@include bootstrap.media-breakpoint-up(sm) {
  .navbar {
    display: block;
  }
}
$ sass-migrator module --verbose style.scss
Migrating style.scss
```

### Migrations

#### Division

この移行は、/ を除算として使用しているスタイルシートを、代わりに組み込みの math.div 関数を使用するように変換します。

#### –pessimistic

デフォルトでは、migrator は / 操作が評価されたときに除算になるかどうかがわからない場合でも math.div に変換します。他のことを行っていると静的に判断できる場合のみ、そのままにします（SassScript が関与していない場合や、オペランドの 1 つが文字列である場合など）。math.div 関数は現在 / 演算子と同じように機能するので、これは安全ですが、実行時に math.div への引数の 1 つが数値でない場合、新しい警告が発生する可能性があります。

この動作を回避したい場合は、-pessimistic フラグを渡すことができます。このフラグを指定すると、migrator は確実に除算を行うことが分かっている / 操作のみを変換します。これにより、不必要な math.div の変換を防ぐことができますが、静的に判断できない除算は移行されないまま放置される可能性があります。

#### モジュール

このマイグレーションは、依存関係をロードするために古い @import ルールを使用しているスタイルシートを変換し、代わりに @use ルールを介して Sass モジュールシステムを使用するようにします。単純に @import を @uses に変更するだけでなく、スタイルシートが以前と同じように動作するよう、インテリジェントに更新します。

- 他のモジュールのメンバ（変数、ミキシン、関数）の使用に名前空間を追加する。
- メンバーをインポートせずに使用していたスタイルシートに、新しい @use 規則を追加します。
- オーバーライドされたデフォルト変数をwith句に変換します。
- 他のファイルから使用されているメンバーから自動的に - と _ 接頭辞を削除します（そうしないとプライベートと見なされ、宣言されたモジュールでのみ使用できるため）。
- ネストされたインポートを、代わりに meta.load-css() ミキシンを使用するように変換します。

::: warning

⚠️ Heads up!

モジュール migrator はメンバー定義とメンバー名の両方を変更する必要があるため、 --migrate-deps オプションを付けて実行するか、パッケージまたはアプリケーション内のすべてのスタイルシートを渡すようにすることが重要です。

:::

```bash
$ cat style.scss
$body-bg: #000;
$body-color: #111;

@import "bootstrap";

@include media-breakpoint-up(sm) {
  .navbar {
    display: block;
  }
}
$ sass-migrator --migrate-deps module style.scss
$ cat style.scss
@use "bootstrap" with (
  $body-bg: #000,
  $body-color: #111
);

@include bootstrap.media-breakpoint-up(sm) {
  .navbar {
    display: block;
  }
}
```

#### 依存関係の読み込み

モジュール migrator は、--migrate-deps オプションが渡されなくても、移行先のスタイルシートが依存しているものをすべて読み込むことができる必要があります。migrator が依存関係を見つけるのに失敗すると、エラーが発生します。

```bash
$ ls .
style.scss  node_modules
$ sass-migrator module style.scss
Error: Could not find Sass file at 'dependency'.
  ,
1 | @import "dependency";
  |         ^^^^^^^^^^^^
  '
  style.scss 1:9  root stylesheet
Migration failed!
$ sass-migrator --load-path node_modules module style.scss
```

スタイルシートをコンパイルする際にロードパスを使用する場合は、 --load-path オプションを使用して migrator にそれを渡すことを確認してください。

残念ながら、migrator はカスタムインポーターをサポートしていませんが、Webpack がサポートしているのと同じように、node_modules で検索して ~ で始まる URL を解決するための組み込みサポートがあります。

#### –remove-prefix

このオプション (短縮形 -p) は、変数名、ミキシン、関数名を移行する際に、それらの名前の先頭から削除する識別子の接頭辞を取ります。このプレフィックスで始まらないメンバは変更されないままです。

@import ルールはすべてのトップレベルメンバーをひとつのグローバルスコープに置くため、スタイルシートを読み込む標準的な方法であったときは、他のスタイルシートのものを誤って再定義しないように、すべてのメンバー名にプレフィックスを追加する動機付けがありました。モジュールシステムはこの問題を解決してくれるので、不要になった古い接頭辞を自動的に取り除くのに便利です。

```bash
$ cat style.scss
@import "theme";

@mixin app-inverted {
  color: $app-bg-color;
  background-color: $app-color;
}
$ sass-migrator --migrate-deps module --remove-prefix=app- style.scss
$ cat style.scss
@import "theme";

@mixin inverted {
  color: theme.$bg-color;
  background-color: theme.$color;
}
```

このオプションを渡すと、ライブラリをインポートしていたユーザーの後方互換性を維持するために、マイグレータは接頭辞を追加したすべてのメンバーを転送するインポート専用のスタイルシートも生成します。

このオプションは複数回、あるいはカンマで区切った複数の値で指定することができます。各プレフィックスは、それを持つすべてのメンバーから削除されます。ひとつのメンバーが複数のプレフィックスにマッチする場合は、 いちばん長いプレフィックスが削除されます。

#### –forward

このオプションは、@forward ルールを使用して転送するメンバーを migrator に指示します。以下の設定をサポートしています。

- none (既定) は、どのメンバーも転送しません。
- all は、オリジナルのスタイルシートで - または _ で始まるメンバーを除くすべてのメンバーを転送します。
- prefixed は、--remove-prefix オプションに渡されたプレフィックスで始まるメンバーのみを 転送します。このオプションは --remove-prefix オプションと一緒に使うことだけが可能である。

コマンドラインで明示的に渡されたファイルはすべて、そのファイルから@importルールで過渡的にロードされたメンバーを転送します。migrate-deps オプションを使用してロードされたファイルは、新しいメンバーを転送しません。このオプションは、Sass ライブラリを移行する際に特に有用で、そのライブラリのユーザーは、そのライブラリが定義するすべてのメンバーに引き続きアクセスできることが保証されるためです。

```bash
$ cat _index.scss
@import "theme";
@import "typography";
@import "components";
$ sass-migrator --migrate-deps module --forward=all style.scss
$ cat _index.scss
@forward "theme";
@forward "typography";
@forward "components";
```

#### 名前空間

このマイグレーションにより、スタイルシートの @use ルールの名前空間を簡単に変更することができます。モジュール migrator が競合を解決するために生成する名前空間が理想的でない場合、またはルールの URL に基づいて Sass が決定するデフォルトの名前空間を使用したくない場合に便利です。

##### –rename

どの名前空間を変更させたいかは、--rename オプションに式を渡すことで指定できます。

これらの式は `<old-namespace>` から `<new-namespace>` または url `<rule-url>` から `<new-namespace>` という形式をとります。これらの式において、 `<old-namespace>` と `<rule-url>` はそれぞれ既存の名前空間または @use ルールの URL 全体に対してマッチする正規表現です。

単純な使用例では、これは --rename 'old to new' のように見えるだけで、名前空間が old の @use ルールの名前を、代わりに new に変更するものです。

しかし、より複雑な名前の変更もこの方法で行うことができます。例えば、以前は次のようなスタイルシートがあったとします。

```scss
@import "components/button/lib/mixins";
@import "components/input/lib/mixins";
@import "components/table/lib/mixins";
// ...
```

これらの URL はすべて @use ルールに移行されるとデフォルトの名前空間ミキシンを持つことになるので、モジュールマイグレータは次のようなものを生成してしまうかもしれません。

```scss
@use "components/button/lib/mixins" as button-lib-mixins;
@use "components/input/lib/mixins" as input-lib-mixins;
@use "components/table/lib/mixins" as table-lib-mixins;
// ...
```

名前空間が衝突しないのでこれは有効なコードですが、必要以上に複雑になっています。URLの関連する部分はコンポーネント名なので、その部分を抽出するために名前空間マイグレータを使用することができます。

namespace migrator を --rename 'url components/(\w+)/lib/mixins to \1' で実行すると、以下のようになります。

```scss
@use "components/button/lib/mixins" as button;
@use "components/input/lib/mixins" as input;
@use "components/table/lib/mixins" as table;
// ...
```

このリネームスクリプトでは、URL が components/(\w+)/lib/mixins のような @use ルールをすべて検索します（正規表現での \w+ は、1 文字以上の任意の単語にマッチすることを意味します）。出力節にある \1 は、正規表現の最初の括弧の中身を代入することを意味します（グループと呼びます）。

複数のリネームを適用したい場合は、--rename オプションを複数回渡すか、セミコロンまたは改行で区切ります。与えられたルールに適用される最初のリネームのみが使用されるので、 --rename 'a to b; b to a' のように渡すと、名前空間 a と b を入れ替えることができる。

##### –force

デフォルトでは、マイグレーション後に2つ以上の@useルールが同じ名前空間を持つ場合、マイグレータは失敗し、変更は行われません。

この場合、通常は --rename スクリプトを調整して衝突が起こらないようにしたいところですが、強制的に移行させたい場合は、代わりに --force を渡すとよいでしょう。

--force を指定すると、競合が発生した場合、最初の @use ルールに優先名前空間が付与され、同じ優先名前空間を持つ後続の @use ルールには数値サフィックスが付与されます。