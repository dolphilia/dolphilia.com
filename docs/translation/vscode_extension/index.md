# Extension API

Visual Studio Codeは、拡張性を念頭に置いて構築されています。UIから編集体験まで、VS Codeのほぼすべての部分は、Extension APIを通じてカスタマイズや拡張を行うことができます。実際、VS Codeの多くのコア機能は拡張機能として構築されており、同じExtension APIを使用しています。

このドキュメントでは次のことを説明しています。

- 拡張機能のビルド、実行、デバッグ、テスト、公開の方法
- VS Codeの豊富なExtension APIを活用する方法
- ガイドとコードサンプルの入手先
- ベストプラクティスのためのUXガイドラインに従う

コードサンプルは、Microsoft/vscode-extension-samplesにあります。

公開されている拡張機能をお探しの場合は、VS Code Extension Marketplaceにアクセスしてください。

## エクステンションにできることは？

ここでは、Extension APIで実現できることの一例を紹介します。

- カラーやファイルアイコンのテーマでVS Codeの外観を変更 - Theming
- UIにカスタムコンポーネントとビューを追加する - Workbenchを拡張する
- HTML/CSS/JSで構築されたカスタムWebページを表示するWebviewを作成する - Webviewガイド
- 新しいプログラミング言語をサポート - 言語拡張の概要
- 特定のランタイムのデバッグをサポート - Debugger Extension Guide

Extension APIのより包括的な概要を知りたい場合は、「Extension Capabilities Overview」ページを参照してください。Extension Guides Overview には、さまざまな Extension API の使用法を説明するコードサンプルとガイドのリストもあります。

## エクステンションを作るには？

良い拡張機能を作るには、多くの時間と労力が必要です。ここでは、APIドキュメントの各セクションがあなたの助けになることを説明します。

- Get Startedでは、Hello Worldのサンプルを使って、エクステンションを構築するための基本的な概念を学びます。
- Extension Capabilitiesは、VS Codeの膨大なAPIを細かく分類し、より詳細なトピックを紹介しています。
- Extension Guides は、VS Code Extension API の特定の使用方法を説明するガイドとコードサンプルを含みます。
- UXガイドラインは、拡張機能で優れたユーザーエクスペリエンスを提供するためのベストプラクティスを紹介します。
- 言語拡張は、プログラミング言語のサポートを追加する方法を、ガイドとコードサンプルで説明します。
- テストと公開には、拡張機能のテストや公開など、さまざまな拡張機能開発トピックに関する詳細なガイドが含まれています。
- Advanced Topics は、Extension Host、Supporting Remote Development and GitHub Codespaces、Proposed API などの高度な概念について説明します。
- References には、VS Code API、Contribution Points、その他多くのトピックに関する網羅的なリファレンスが含まれています。

## What's new?

VS Codeは毎月のように更新され、それはExtension APIにも適用されます。毎月、新しい機能やAPIが提供され、VS Codeの拡張機能のパワーと範囲が拡大します。

Extension API の最新情報を得るには、毎月のリリースノートをご覧ください。

- 拡張機能オーサリング - 最新のリリースで利用可能な新しい拡張機能APIをご紹介します。
- 提案された拡張API - 今後提案されるAPIについてレビューし、フィードバックを提供します。

## ヘルプを探す

エクステンション開発への質問がある場合は、下記に質問してみてください。

- VS Codeのディスカッション: VS Codeの拡張プラットフォームについて議論したり、質問をしたり、コミュニティの他のメンバーを助けたり、回答を得るためのGitHubコミュニティです。
- Stack Overflow: visual-studio-codeとタグ付けされた数千の質問があり、その半分以上はすでに回答があります。問題を検索したり、質問をしたり、VS Code 拡張機能の開発に関する質問に回答して仲間の開発者を助けたりしましょう
- VS Code Dev Slack: エクステンション開発者のための公開チャットルーム。VS Code チームのメンバーも会話に参加することがあります。

ドキュメントに関するフィードバックを提供するには、Microsoft/vscode-docsに新しい課題を作成してください。拡張機能に関する質問で答えが見つからない場合、またはVS Code Extension APIに関する問題がある場合は、Microsoft/vscodeに新しい課題を作成してください。