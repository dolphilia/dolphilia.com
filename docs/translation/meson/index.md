# Meson Buildシステム

## 概要

Mesonはオープンソースのビルドシステムで、非常に高速で、さらに重要なことに、可能な限りユーザーフレンドリーであることを意図しています。

Meson の主な設計ポイントは、開発者がビルド定義の記述やデバッグに費やす時間はすべて1秒の無駄であるということです。また、ビルドシステムが実際にコードのコンパイルを開始するのを待つのに費やす時間も、すべて1秒です。

## Features

- Linux、macOS、Windows、GCC、Clang、Visual Studio などのマルチプラットフォームに対応。
- 対応言語は、C, C++, D, Fortran, Java, Rustです。
- 非常に読みやすく、使いやすい非チューリング完全DSLによるビルド定義
- ベアメタルだけでなく、多くのOSに対応したクロスコンパイルが可能
- 正しさを犠牲にすることなく、非常に高速なフル/インクリメンタル・ビルドを実現するために最適化されています。
- ディストロのパッケージと一緒に動作するビルトインマルチプラットフォーム依存プロバイダ
- 楽しい!

## 初心者のためのクイックスタート

プログラミングに関しては全くの初心者ですか？心配はいりません。[このビギナーガイド](https://mesonbuild.com/SimpleStart.html)を読んで、始めてみてください。

## コミュニティ

多くの人が他の Meson 開発者とつながる最も簡単な方法は、ウェブチャットです。Matrix ([ウェブインタフェース](https://app.element.io/#/room/#mesonbuild:matrix.org)) または [OFTC IRC](https://www.oftc.net/) を使って #mesonbuild というチャンネルを使用します。

その他のコミュニケーション方法としては、[メーリングリスト](https://groups.google.com/forum/#!forum/mesonbuild) (Google Groups でホストされています) や Meson GitHub リポジトリの [Discussions](https://github.com/mesonbuild/meson/discussions) セクションがあります。

## Mesonを使ったプロジェクト

多くのプロジェクトが Meson を使用しており、既存のプロジェクトを Meson に変換する際に何をすべきか（そして何をすべきでないか！）学ぶための素晴らしいリソースです。

[Mesonのユーザー一覧](https://mesonbuild.com/Users.html)はこちらでご覧になれますが、他にもたくさんのユーザーがいます。私たちは、あなたの成功談や、どのように改善されたかを聞きたいと思います。

## 開発

Meson の開発はすべて [GitHub プロジェクト](https://github.com/mesonbuild/meson)で行われています。貢献の方法は、[貢献のページ](https://mesonbuild.com/Contributing.html)で見ることができます。

Meson に貢献するために CLA に署名する必要はありません。

