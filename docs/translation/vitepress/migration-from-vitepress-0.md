# VitePress 0.xからの移行

VitePress 0.xから移行される場合、新機能や機能強化のためにいくつかのブレークダウンがあります。このガイドに従って、あなたのアプリを最新のVitePressに移行してください。

## アプリの設定

- 国際化機能は未実装です。

## テーマの設定

- sidebarオプションの構造が変更されました。
  - children keyはitemsという名前になりました。
  - トップレベルのアイテムは、現時点ではリンクを含んでいないかもしれません。復活させる予定です。
- repo, repoLabel, docsDir, docsBranch, editLinks, editLinkText は、より柔軟な API を優先して削除されました。
  - ナビにGitHubのアイコン付きリンクを追加するには、ソーシャルリンク機能を利用します。
  - 「このページを編集する」機能を追加するには、リンクの編集機能を利用します。
- lastUpdatedオプションは、config.lastUpdatedとthemeConfig.lastUpdatedTextに分割されました。
- carbonAds.carbonをcarbonAds.codeに変更。

## フロントマターの設定

- home: true のオプションが layout: home に変更されました。また、多くのホームページ関連の設定が変更され、機能が追加されています。詳しくはホームページガイドをご覧ください。
- footerオプションは、themeConfig.footerに移動しました。