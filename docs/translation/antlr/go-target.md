# ANTLR4言語ターゲット、Go用ランタイム

### ANTLR 4.12.0からの変更点

ANTLR Goランタイムの変更点を参照してください：
  - Goランタイムは現在 `antlr4-go/antlr` リポジトリに格納されています。
    インポートを変更して、古い場所を `go.mod` から削除して、`go get github.com/antlr4-go/antlr` を使ってください。
  - 生成されるインポート文とレコグナイザーの構造に追加するための新しい `@action` がいくつかあります。
  - パフォーマンス上の理由から、レコグナイザーのルールはインターフェイス経由で呼び出されなくなった。
  - メモリ使用量の改善
  - パフォーマンスの向上
  - 真の Go 形式のドキュメント
  - Git タグが go ツールで正しく動作するようになりました。

### v4以外のコードの削除

v4タグ付きランタイムがリリースされる前は、Goランタイムモジュールのソースコードは`runtime/Go/antlr`（v4以前のバージョン）と`runtime/Go/antlr/v4`に存在していた。もしあなたのプロジェクトがモジュールを使っていなければ、単にmasterブランチの最新のハッシュに同期してコードを使うことができた。これは変更されました。

現在のリリースでは、Goランタイムモジュールのソースコードは独自のGitHub組織内の独自のリポジトリに移動しました。現在のところ、モジュールなしでコードを使用することはできますが、メインの ANTLR リポジトリのコードではなく github.com/antlr4-go/antlr のリポジトリにあるコードを使用する必要があります。

これは歴史的な理由によるもので、このコードはもともとモジュールが存在する前に書かれたものであり、goのランタイムソースは`antlr/antlr4/...`であるmonorepoの一部でした。

非V4ディレクトリにあるgo.modを適切に非推奨にすることができないのは、ソースツリーのこの深さではv4モジュールのタグを使えないのと同じ理由です。

必須ではありませんが、モジュールを使うことを強くお勧めします。詳細は以下を参照してください。

ANTLR Go Maintainer: Jim Idle

### はじめの一歩

#### 1.ANTLR4をインストールする

以下を参照してください: スタートガイドを参照。

#### 2.Go ANTLRランタイムを入手する

ANTLRの各ターゲット言語には、ANTLR4で生成された認識器を実行するためのランタイムパッケージがあります。ランタイムは、パーサ/レクサを使用するための共通ツールセットを提供します。既存のプロジェクトがあり、まだ `v1.x.x` モジュールを `v4` モジュールに置き換えていない場合は、 *以前のバージョンから v4 にアップグレードする* のセクションに進んでください。

Goランタイムはモジュールを使用し、他のランタイムやツール自体のランタイムバージョンと同期するために `/v4` というバージョンパスを持っています。

セットアップは他のモジュールベースのプロジェクトと同じです：

```bash
$ cd mymodproject
$ go mod init mymodproject
```

その後、go getを使用して、ANTLR v4ランタイムの最新リリースバージョンを取得することができる：

```bash
go get github.com/antlr4-go/antlr
```

あなたのプロジェクトがすでにANTLRのメインレポからv4ランタイムを使用していた場合、モジュール内の`github.com/antlr/antlr4/runtime/Go/antlr/v4`参照を削除し、プロジェクトコード内の関連するインポートを変更することで、最新リリースにアップグレードすることができます。インポートを変更するには、以下のスクリプトが便利です：

```shell
find . -type f \
    -name '*.go' \
    -exec sed -i -e 's,github.com/antlr/antlr4/runtime/Go/antlr/v4,github.com/antlr4-go/antlr/v4,g' {} \;
```
importパッケージは最終パスを`antlr`としてインポートするので、importステートメント自体を変更するだけでよい。

もし既にこのレポを使用していて、`github.com/antlr4-go/antlr/v4`をインポートしている場合は、標準を使用して最新バージョンにアップグレードできます。

```shell
go get -u github.com/antlr4-go/antlr
```

既存のプロジェクトをまだ `/v4` モジュールパスにアップグレードしていない場合は、 *以前のバージョンから v4 にアップグレードする* を参照してください。

ANTLR ランタイムの外部への一時的な依存関係は 1 つだけで、それは go システム自体の一部です：

```
golang.org/x/exp
```

リリースの完全なリストはリリースページにあります。そのため、`antlr4-go/antlr` リポジトリにあるリリース 4.13.0 には `v4.13.0` というタグが付けられ、go get は ANTLR リポジトリからタグを取得します。

#### 3.プロジェクトで `go generate` を設定する

繰り返しビルドの利用を促進するために、最新のツール jar をプロジェクトのリポジトリに追加し、`generate.sh` と `generate.go` ファイルを設定すると便利なことが多い。もちろん、ツールの実行に必要なjavaコマンドをグローバルにエイリアスすることもできる。あなた自身のCIと開発環境があなたを導いてくれるだろう。

ここでは、ANTLR の文法ファイルをプロジェクト構造内の独自のパッケージに配置するという一般的な推奨に従って、`go generate` を設定する方法を説明する。ここでは、出発点として一般的なテンプレートを示します：

```
	.
	├── myproject
	├── parser
	│     ├── mygrammar.g4
	│     ├── antlr-4.13.0-complete.jar
	│     ├── generate.go
	│     └── generate.sh
	├── parsing  # Generated code goes here
	│     └── error_listeners.go
	├── go.mod
	├── go.sum
	├── main.go
	└── main_test.go
```

`generate.go`ファイルは次のようになります。generate.go`ファイルはこのようになる：

```golang
	package parser

	//go:generate ./generate.sh
```

そして`generate.sh`ファイルは以下のようになる：

```shell
	#!/bin/sh

	alias antlr4='java -Xmx500M -cp "./antlr-4.13.0-complete.jar:$CLASSPATH" org.antlr.v4.Tool'
	antlr4 -Dlanguage=Go -no-visitor -package parsing *.g4
```

パッケージのルート、つまり`go.mod`ファイルの場所にあるコマンドラインから、次のコマンドを実行すればよい：

```shell
	go generate ./...
```

まだ`go get`を実行していない場合は、`go mod tidy`を実行し、`go get`の内容を更新してください。

#### 4.パーサーを手動で生成する

ANTLR4の「ツール」を使用してパーサーを生成します。これらは、上記でインストールしたANTLRランタイムを参照します。

UNIXシステムを使用していて、スタートガイドに記載されているようにANTLR4ツールのエイリアスを設定したとします。

goパーサーを生成するには、以下のコマンドを実行する必要があります：

```shell
    antlr4 -Dlanguage=Go MyGrammar.g4
```

antlr4ツールオプションの完全なリストは、ツールのドキュメントページをご覧ください。

### デフォルトパスから `/v4` へのアップグレード

NB: 新しいモジュールパスへの切り替えは通常、ランタイムのパブリックインターフェースが変更されたことを意味しますが、実際にはそうではありません。リポジトリ変更の主なポイントは、git タグ付けが ANTLR Go ランタイムと go ツールで動作するようにすることです。

リリース v4.11.0 より前の Go ランタイムはモジュールと一緒に出荷されていましたが、モジュールにはバージョンパスがありませんでした。これは ANTLR リポジトリのタグが機能しないことを意味します。なぜなら、`v1` 以上のタグは一致するモジュールのパスを参照しなければならないからです。  そのため、`go get github.com/antlr/antlr4/runtime/Go/antlr` というコマンドは、master ブランチの `HEAD` にあるものを持ってくるだけだった。これは*一応*うまくいったが、明らかに問題があり、Goの慣用的なやり方には合わない。

v4.13.0では、ランタイムコードは独自のリポジトリ `github.com/antlr4-go/antlr` に存在し、正しくタグ付けされている。しかし、これは `/v4` パスにアップグレードするために、いくつかの簡単なアクションを実行する必要があることを意味します。

 - まず、バージョン番号が 4.13.0 以上の ANTLR ツール jar を使用していることを確認する。
 - 次に、go ソースファイル内の ANTLR への古い (デフォルトの) パスの記述をすべて置き換えます。
 - モジュールを使用している場合は、ANTLR Goランタイムへの既存の参照をすべて削除します。
 - 文法ファイルを手動または `go generate ./...` (上記参照) を使って再生成します。
 - プロジェクトでモジュールを使用するように移行できるかどうかを検討します。

元のモジュールのパス参照を置き換える簡単な方法は、モジュールのベースディレクトリからこのスクリプトを使うことです：

```shell
find . -type f \
    -name '*.go' \
    -exec sed -i -e 's,github.com/antlr/antlr4/runtime/Go/antlr,github.com/antlr4-go/antlr/v4,g' {} \;
```

上記の手順を実行した後、発行モジュールを使用します：

```shell
go mod tidy
```
ANTLRのGoランタイムの`v4`バージョンのみを参照するように`go.mod`ファイルを修正する必要があります：

```shell
require github.com/antlr/antlr4/runtime/Go/antlr/v4 v4.13.0
```

この時点から、go modコマンドはANTLRレポで正しく動作し、アップグレードやダウングレードも期待通りに動作するようになります。devのようなブランチバージョンも同様です。

### Go ANTLRランタイムの参照

go ANTLR ランタイムパッケージは次のように参照できます：

```golang
import "github.com/antlr4-go/antlr/v4"
```

### 完全な例

parserディレクトリに置かれた github.com/antlr/grammars-v4/tree/master/json のJSON文法を使い、`go mod`ファイルを初期化したとします。

そして、`antlr4 -Dlanguage=Go JSON.g4`を実行します。その結果、`parser` ディレクトリに以下のような .go ファイルが作成されます：
```
json_parser.go
json_base_listener.go
json_lexer.go
json_listener.go
```

ANTLRツールのもう一つの一般的なオプションは `-visitor` で、これは解析ツリービジターを生成するが、ここではそれを行わない。  antlr4ツールのオプションの完全なリストについては、ツールのドキュメントページを参照してください。

生成されたパーサー/レクサーを呼び出す小さなmain funcを書きます。これは遭遇した `ParseTreeContext` を書き出す。生成されたパーサーのコードが `parser` ディレクトリにあると仮定すると、このコードと相対的なものになる：

```golang
package main

import (
	"github.com/antlr4-go/antlr/v4"
	"./parser"  // モジュールの場合、相対 immport パスが使えない場合があることに注意してください。
	"os"
	"fmt"
)

type TreeShapeListener struct {
	*parser.BaseJSONListener
}

func NewTreeShapeListener() *TreeShapeListener {
	return new(TreeShapeListener)
}

func (this *TreeShapeListener) EnterEveryRule(ctx antlr.ParserRuleContext) {
	fmt.Println(ctx.GetText())
}

func main() {
	input, _ := antlr.NewFileStream(os.Args[1])
	lexer := parser.NewJSONLexer(input)
	stream := antlr.NewCommonTokenStream(lexer,0)
	p := parser.NewJSONParser(stream)
	p.AddErrorListener(antlr.NewDiagnosticErrorListener(true))
	p.BuildParseTrees = true
	tree := p.Json()
	antlr.ParseTreeWalkerDefault.Walk(NewTreeShapeListener(), tree)
}
```

`go.mod`ファイルを修正する：

```shell
go mod tidy
```

これは、コマンドラインで入力が渡されることを想定している：

```
go run test.go input
```

出力はこうだ：

```
{"a":1}
{"a":1}
"a":1
1
```