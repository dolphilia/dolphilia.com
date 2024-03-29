# ドキュメンテーション

Sassは、CSSにコンパイルされるスタイルシート言語です。CSSと完全に互換性のある構文で、変数、ネストされたルール、ミキシン、関数などを使用することができます。Sassは大規模なスタイルシートを整理し、プロジェクト内やプロジェクト間でのデザインの共有を容易にします。

- Sass の入門書をお探しの場合は、チュートリアルをご覧ください。
- Sass の組み込み関数を調べたい場合は、組み込みモジュールのリファレンスを参照してください。
- JavaScript から Sass を呼び出している場合は、JS API ドキュメントを参照してください。
- Dart から呼び出す場合は、Dart API ドキュメントを参照してください。
- それ以外の場合は、言語リファレンスの目次を使用してください。

## 旧バージョン

このドキュメントは、Sass 言語の最新バージョン用に書かれています。Dart Sass 1.58.2 を使用している場合、ここで説明するすべての機能にアクセスすることができます。しかし、古いバージョンの Dart Sass や LibSass や Ruby Sass のような非推奨の Sass 実装を使用している場合、いくつかの動作の違いがある可能性があります。

バージョンや実装によって動作が異なる場合は、ドキュメントにこのような互換性インジケータが記載されています。

互換性 (機能名):

- Dart Sass: ✓
- LibSass: since 3.6.0
- Ruby Sass: ✗

✓のついた実装は当該機能を完全にサポートしており、✗のついた実装はすべてをサポートしていない。バージョン番号の付いた実装は、そのバージョンで当該機能のサポートを開始しています。実装は「partial」とマークすることもできます。

互換性:

- Dart Sass: ✓
- LibSass: partial
- Ruby Sass: ✗
- ▶

これは、その実装がその機能の一部の側面のみをサポートしていることを示します。これらの互換性インジケータ（および他の多くのインジケータ）には「▶」ボタンがあり、これをクリックすると、実装がどのように異なるか、どのバージョンが問題の機能のどの側面をサポートしているかについての詳細を正確に表示することができます。