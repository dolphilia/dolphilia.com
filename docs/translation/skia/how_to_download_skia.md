# Skia のダウンロード方法

### depot_tools と Git のインストール

Chromium の depot_tools をダウンロードするための指示に従って、depot_tools（gclient、git-cl、および Ninja を含む）をインストールします。以下に必要な手順の概要を示します。

```sh
git clone 'https://chromium.googlesource.com/chromium/tools/depot_tools.git'
export PATH="${PWD}/depot_tools:${PATH}"
```

depot_tools は、Git がまだインストールされていない場合、システムに Git もインストールします。

## bazelisk のインストール

ファイルの追加や削除、または #includes の変更を行う場合、Bazel を使用して BUILD.bazel ファイルの一部を再生成する必要があります。Bazel を手動でインストールする代わりに、Bazelisk をインストールすることをお勧めします。Bazelisk は //.bazelversion で指定された適切なバージョンの Bazel を自動的に取得します。

### ninja のインストール

Ninja は gclient を使用するか、`bin/fetch-ninja` を使用して提供できます。

### Skia リポジトリのクローン作成

Skia は git または depot_tools に含まれる fetch ツールを使用してクローン作成できます。

```sh
git clone https://skia.googlesource.com/skia.git
# または
# fetch skia
cd skia
python3 tools/git-sync-deps
bin/fetch-ninja
```

## Skia の使い方の始め方

おそらく、次に Skia をビルドしたくなるでしょう。

## Skia への変更と貢献

この時点で、Skia をビルドおよび使用するために必要なすべてのものが揃っています！変更を加え、それを Skia プロジェクトに貢献したい場合は、[パッチの提出方法](https://skia.googlesource.com/skia/+/master/site/user/documentation/how_to_submit_a_patch.md) をお読みください。