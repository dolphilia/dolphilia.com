# 動的従属性

Available since Ninja 1.10.

一部のユースケースでは、最初の実行時に正しくビルドするために、ビルド中にソースファイルのコンテンツから暗黙の依存情報を動的に検出する必要があります（例：Fortranモジュールの依存性）。これは、2回目以降の実行時にのみ正しく再構築するために必要とされるヘッダ依存性とは異なります。build文は、動的依存性情報をファイルから読み込む必要があることを指定するために、その入力の1つを指定するdyndepバインディングを持つことができます。たとえば、次のようになります。

```
build out: ... || foo
  dyndep = foo
build foo: ...
```

これは、ファイルfooがdyndepファイルであることを指定するものである。これは入力であるため、fooがビルドされる前にoutのビルド文が実行されることはない。foo が終了するとすぐに Ninja はそれを読み込んで、動的に発見された out の依存情報をロードします。このとき、暗黙の入力や出力が追加されることがある。Ninjaはそれに応じてビルドグラフを更新し、あたかもその情報が元々あったかのようにビルドを進める。

## Dyndepファイルリファレンス

dyndepバインディングで指定されたファイルは、忍者ビルドファイルと同じ字句の構文を使用し、以下のようなレイアウトになります。

1:

`<major>[.<minor>][<suffix>]` という形式のバージョン番号。 

```
ninja_dyndep_version = 1
```

現在、バージョン番号は常に1または1.0でなければならないが、任意の接尾辞を付けることができる。

2:

形式の1つまたは複数のビルドステートメント。

```
build out | imp-outs... : dyndep | imp-ins...
```

すべてのステートメントは、正確に1つの明示的な出力を指定し、ルール名dyndepを使用しなければなりません。 imp-outs...と｜imp-ins...の部分は任意です。

3:
各ビルドステートメントにオプションのrestat変数バインディングを設定します。

dyndepファイルのbuild文は、dyndepバインディングでdyndepファイルを名付けるninja buildファイルのbuild文と一対一の対応を持っていなければならない。dyndepのビルド文を省略したり、追加のビルド文を指定することはできない。

## Dyndep 例

### Fortranモジュール

モジュール foo.mod を提供する Fortran ソースファイル foo.f90 (コンパイルの暗黙の出力) と、そのモジュールを使用する別のソースファイル bar.f90 (コンパイルの暗黙の入力) があるとします。この暗黙の依存関係は、foo.f90より先にbar.f90がコンパイルされることがなく、foo.modが変更されるとbar.f90が再コンパイルされるように、どちらのソースもコンパイル前に発見されなければなりません。これを実現するには、次のようにします。

```
rule f95
  command = f95 -o $out -c $in
rule fscan
  command = fscan -o $out $in

build foobar.dd: fscan foo.f90 bar.f90

build foo.o: f95 foo.f90 || foobar.dd
  dyndep = foobar.dd
build bar.o: f95 bar.f90 || foobar.dd
  dyndep = foobar.dd
```

この例では、順序のみの依存関係により、foobar.ddはどちらのソースもコンパイルされる前に生成されます。仮想的なfscanツールはソースファイルをスキャンし、それぞれが同じ名前の.oにコンパイルされると仮定し、次のような内容のfoobar.ddを書き込みます。

```
ninja_dyndep_version = 1
build foo.o | foo.mod: dyndep
build bar.o: dyndep |  foo.mod
```

Ninjaはこのファイルをロードして、foo.oの暗黙の出力とbar.oの暗黙の入力としてfoo.modを追加する。これにより、Fortranソースが常に正しい順序でコンパイルされ、必要時にリコンパイルされる。

### ターボール抽出

抽出したいtarball foo.tarがあるとする。抽出時間はfoo.tar.stampファイルで記録しておけば、tarballが変更されても抽出が繰り返されますが、出力のいずれかが欠落している場合は再抽出したいとも思います。しかし、出力のリストはtarballの内容に依存し、ninjaのビルドファイルで明示的に記述することはできません。次のようにすれば実現できます。

```
rule untar
  command = tar xf $in && touch $out
rule scantar
  command = scantar --stamp=$stamp --dd=$out $in
build foo.tar.dd: scantar foo.tar
  stamp = foo.tar.stamp
build foo.tar.stamp: untar foo.tar || foo.tar.dd
  dyndep = foo.tar.dd
```

この例では、順序のみの依存関係は、tarball が展開される前に foo.tar.dd がビルドされることを保証します。仮想的な scantar ツールは、(例えば tar tf を使って) tarball を読み、次のような内容を持つ foo.tar.dd を書き出します。

```
ninja_dyndep_version = 1
build foo.tar.stamp | file1.txt file2.txt : dyndep
  restat = 1
```

Ninjaはこのファイルを読み込んで、foo.tar.stampの暗黙の出力としてfile1.txtとfile2.txtを追加し、再フォーマットのためにビルド文をマークします。今後のビルドでは、暗黙の出力が欠落した場合、tarballは再び展開される。restatバインディングは、暗黙の出力がtarball自身よりも新しい修正時刻を持っていないことを許容するようにNinjaに指示する（ビルド毎に再解凍するのを避ける）。