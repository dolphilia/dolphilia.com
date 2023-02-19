# トラブルシューティングエラー

[[TOC]]

### **何か問題が発生したというエラーページが表示されるのですが。何が問題なのかを調べるにはどうしたらいいですか？

スタックトレース付きの全てのエラーメッセージはシステムログに書き込まれます。systemd を使っている場合、各 systemd サービスのログは `journalctl -u mastodon-web` (正しいサービス名で置き換えてください) で参照することができます。Docker を使用している場合は、`docker logs mastodon_web_1` (正しいコンテナ名に置き換えてください) で同様のことができます。

サーバーサイドのエラーの詳細は、決して一般に公開されません。

マストドンのウェブサーバーからの各レスポンスには、固有のリクエストIDを持つヘッダーがあり、これはログにも反映される。エラーページのヘッダーを検査することで、対応するスタックトレースを簡単にログで見つけることができる。

### **新しいバージョンにアップグレードした後、いくつかのページが奇妙に見え、スタイル化されていない要素があるように見えます。なぜでしょうか？

アップグレード後に `RAILS_ENV=production bin/rails assets:precompile` を実行したか確認し、Mastodon のウェブプロセスを再起動してください。古いスタイルシートやスクリプトが提供されているように見えるからです。また、webpackは残念ながら非常にメモリを消費するため、RAM不足でプリコンパイルが失敗する可能性もあります。そのような場合は、スワップ領域を確保してください。あるいは、別のマシンでアセットをプリコンパイルし、`public/packs`ディレクトリにコピーすることも可能です。

### **新しいバージョンにアップグレードした後、いくつかのリクエストが失敗し、ログにカラムやテーブルが見つからないというエラーメッセージが表示されます。なぜでしょうか？

アップグレード後に `RAILS_ENV=production bin/rails db:migrate` を実行したか確認してください。Mastodonのコードが新しいか古いデータベーススキーマにアクセスしているように見えるからです。PgBouncerを使用している場合、PgBouncerはマイグレーションで使用されるテーブルロックをサポートしていないので、このコマンドがPostgreSQLに直接接続することを確認してください。

### **`tootctl` や `rake`/`rails` コマンドを実行しようとしていますが、初期化されていない定数に関するエラーしか発生しません。どうしたのでしょうか？

コマンドの前に `RAILS_ENV=production` と正しい環境が指定されているか確認してください。デフォルトでは、環境は開発環境とみなされ、開発関連のgemsをロードしようとします。しかし、本番環境ではそれらのgemsのインストールを避けるので、そこからエラーが発生します。

### **`RAILS_ENV=production bundle exec rails assets:precompile` rails assets:precompileを実行中にコンパイルエラーが発生しました。 が、それ以上の情報はない。どうすれば直るのでしょうか **。

通常、アセットをコンパイルしている間にサーバーがメモリ不足になったことが原因です。swapfileを使用するか、スワップ領域を増やしてメモリ容量を増やしてください。`RAILS_ENV=production bundle exec rake tmp:cache:clear` を実行してキャッシュをクリアし、次に `RAILS_ENV=production bundle exec rails assets:precompile` を実行して再度コンパイルしてください。コンパイルエラーの後にキャッシュをクリアすることを確認してください。さもないと、「Everything's OK」と表示されますが、アセットは変更されないままです。


## データベースのインデックス破損

データベースのインデックス破損から復旧する方法

やや一般的な設定の問題で、データベース全体のインデックスが破損することがあります。このページでは、これが発生する理由とその修正方法について説明します。

### ロケールデータと照合順序

データベース内のテキスト値、例えばユーザー名や状態識別子は、いわゆる照合順序や大文字小文字の変更方法を定義した照合規則を用いて比較されます。
データベースをセットアップする際、Mastodon はデータベースサーバーのデフォルトのロケール設定を使用し、デフォルトの照合順序ルールも使用します。

残念ながら、2018年後半、`glibc`のアップデートにより、多くのロケールの照合規則が変更され、影響を受けるロケールを使用しているデータベースでは、テキスト値の順序が異なるようになりました。
データベースのインデックスは、インデックスを作成する値の順序に依存するアルゴリズム構造であるため、その一部が不整合になるのです。

詳細はこちら: https://wiki.postgresql.org/wiki/Locale_data_changes https://postgresql.verite.pro/blog/2018/08/27/glibc-upgrade.html

### 私はこの問題の影響を受けているのでしょうか？

照合順序の設定に `C` または `POSIX` を使用していない場合（`SELECT datcollate FROM pg_database WHERE datname = current_database();` でチェックできます）。
glibc 2.28より前のバージョンで実行していて、glibc 2.28以降に更新した後にすぐにデータベースのインデックスを再作成しなかった場合、インデックスに不整合が生じる可能性があります。

::: info

このページは、"Duplicate Indexes" に関する **PgHero** の警告のために訪れたかもしれません。このような警告は、Mastodonのデプロイやアップデートに問題があることを示している場合がありますが、 **データベースのインデックス破損とは関係ありませんし、データベースの機能的な問題を示すものではありません**。

:::

インデックスが整合しているかどうかは、[PostgreSQL の `amcheck` モジュール](https://www.postgresql.org/docs/10/amcheck.html) を使って確認できます。データベースサーバのスーパーユーザとして、Mastodon データベースに接続し、次のように実行してください（しばらく時間がかかるかもしれません）。

```SQL
CREATE EXTENSION IF NOT EXISTS amcheck;
SELECT bt_index_check(c.oid)
FROM pg_index i
JOIN pg_class c ON i.indexrelid = c.oid
WHERE c.relname IN ('index_account_domain_blocks_on_account_id_and_domain',
  'index_account_proofs_on_account_and_provider_and_username',
  'index_accounts_on_username_and_domain_lower', 'index_accounts_on_uri',
  'index_accounts_on_url', 'index_conversations_on_uri',
  'index_custom_emoji_categories_on_name',
  'index_custom_emojis_on_shortcode_and_domain',
  'index_devices_on_access_token_id', 'index_domain_allows_on_domain',
  'index_domain_blocks_on_domain', 'index_email_domain_blocks_on_domain',
  'index_invites_on_code', 'index_markers_on_user_id_and_timeline',
  'index_media_attachments_on_shortcode', 'index_preview_cards_on_url',
  'index_statuses_on_uri', 'index_tags_on_name_lower',
  'index_tombstones_on_uri', 'index_unavailable_domains_on_domain',
  'index_users_on_email', 'index_webauthn_credentials_on_external_id'
);
```

これでエラーが発生した場合は、データベースが破損しており、修復が必要です。そうでない場合は、より詳細なチェックを行う必要があるかもしれません。
これまでのチェックとは異なり、これらのチェックは実行時にテーブルをロックするため、インスタンスの可用性に支障をきたします。

```SQL
CREATE EXTENSION IF NOT EXISTS amcheck;
SELECT bt_index_parent_check(c.oid)
FROM pg_index i
JOIN pg_class c ON i.indexrelid = c.oid
WHERE c.relname IN ('index_account_domain_blocks_on_account_id_and_domain',
  'index_account_proofs_on_account_and_provider_and_username',
  'index_accounts_on_username_and_domain_lower', 'index_accounts_on_uri',
  'index_accounts_on_url', 'index_conversations_on_uri',
  'index_custom_emoji_categories_on_name',
  'index_custom_emojis_on_shortcode_and_domain',
  'index_devices_on_access_token_id', 'index_domain_allows_on_domain',
  'index_domain_blocks_on_domain', 'index_email_domain_blocks_on_domain',
  'index_invites_on_code', 'index_markers_on_user_id_and_timeline',
  'index_media_attachments_on_shortcode', 'index_preview_cards_on_url',
  'index_statuses_on_uri', 'index_tags_on_name_lower',
  'index_tombstones_on_uri', 'index_unavailable_domains_on_domain',
  'index_users_on_email', 'index_webauthn_credentials_on_external_id'
);
```

これが成功し、エラーを返さなければ、データベースの整合性が保たれ、Mastodonが `db:migrate` を実行する際に出す警告を無視しても大丈夫です。

### 問題の修正

この問題が発生した場合、対策を講じない限り、時間が経つにつれてデータベースの整合性が取れなくなる可能性があります。そのため、できるだけ早く修正することが重要です。

Mastodon 3.2.2以降には、これらの破損を可能な限り修正するための半対話型スクリプトが付属しています。それ以前のバージョンを使っている場合は、まず 3.2.2 にアップデートしてください。3.2.2へのデータベース移行は、そのような破損のために失敗する可能性がありますが、Mastodon 3.2.2に付属するメンテナンスツールで回復できる状態にする必要があります。

データベースの修復を試みる前に、**Mastodon を停止してデータベースのバックアップをとってください**。その後、**Mastodon を停止したまま**、メンテナンススクリプトを実行します。

```
RAILS_ENV=production tootctl maintenance fix-duplicates
```

このスクリプトは、データベースの中を歩いて、自動的に重複を見つけ、修正します。場合によっては、それらの操作は破壊的である。最も破壊的なケースでは、どのレコードを残し、どのレコードを破棄するかを選択するように要求される。いずれの場合も、重複を探すためにデータベース全体を歩き回るのは、非常に長い操作となる。

::: warning

場合によっては、重複したレコードに両立しない競合が発生することがあります（たとえば、2つの異なるローカルユーザーが同じユーザー名を共有している場合など）。このような場合、重複排除操作は**部分的に破壊的**になることがあり、どのレコードを変更せず、どのレコードを変更するかを尋ねられる。
したがって、このスクリプトは半対話的である。どのような場合でも、重複を検索するためにデータベース全体を歩き回ることは非常に長い操作である。

:::

::: warning

**メンテナンススクリプトは一時的にインデックスを削除するため、追加の重複が発生しないよう、全工程でMastodonを完全に停止する必要があります**。

:::

### 問題の回避

この問題を回避するには、libc の更新後すぐにデータベースのインデックスを再作成してください。
[SQL コマンド `REINDEX`](https://www.postgresql.org/docs/current/sql-reindex.html) や [`reindexdb` コマンドラインツール](https://www.postgresql.org/docs/current/app-reindexdb.html) が役に立つかもしれません。