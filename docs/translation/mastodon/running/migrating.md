# 新しいマシンへの移行

Mastodonのインストールを何も失うことなく新しいサーバーにコピーします。

様々な理由で、Mastodonインスタンスをあるサーバーから別のサーバーに移行したい場合があります。幸いなことに、これはダウンタイムが発生するものの、それほど難しい作業ではありません。

::: info

このガイドは、Ubuntu Serverを念頭に置いて書かれています。

:::

[[TOC]]

## 基本ステップ

1. プロダクションガイドを参考に、新しいMastodonサーバーをセットアップする（ただし、`mastodon:setup`は実行しない）。
2. 古いサーバーの Mastodon を停止する (例: `systemctl stop 'mastodon-*.service'`).
3. Postgres データベースのダンプとロードを以下の手順で行います。
4. 以下の手順で `system/` ファイルをコピーします。(注意: S3を使用している場合、このステップはスキップできます)。
5. `.env.production` ファイルをコピーします。
6. `RAILS_ENV=production bundle exec rails assets:precompile` を実行し、Mastodon をコンパイルします。
7. 各ユーザーのホームタイムラインを再構築するために `RAILS_ENV=production ./bin/tootctl feeds build` を実行します。
8. 新しいサーバーでマストドンを起動する。
9. DNS 設定を更新し、新しいサーバーを指すようにします。
10. Nginxの設定を更新またはコピーし、必要に応じてLetsEncryptを再実行します。
11. 新しいサーバーをお楽しみください。

## 詳細手順

### どのようなデータを移行する必要があるか

大まかには、以下のものをコピーする必要があります。

* `~/live/public/system` ディレクトリには、ユーザーがアップロードした画像や動画が格納されています (S3 を使用する場合は、これは必要ありません)。
* Postgresデータベース（[pg_dump](https://www.postgresql.org/docs/9.1/static/backup-dump.html)を使用します。）
* サーバーの設定とシークレットを含む `~/live/.env.production` ファイル

あまり重要ではありませんが、利便性のために以下もコピーしておくとよいでしょう。

* nginx の設定ファイル (`/etc/nginx/sites-available/default` の下)
* systemd の設定ファイル (`/etc/systemd/system/mastodon-*.service`): サーバーの調整とカスタマイズが含まれているかもしれません。
* pgbouncer の設定ファイル(`/etc/pgbouncer`) (使用している場合)

### Postgresのダンプとロード

`mastodon:setup` を実行する代わりに、`template0` データベースを使用して空の Postgres データベースを作成します (これは Postgres のダンプをリストアするときに便利です。[pg_dump のドキュメントに記載](https://www.postgresql.org/docs/9.1/static/backup-dump.html#BACKUP-DUMP-RESTORE))。

古いシステムの `mastodon` ユーザーでこれを実行してください。

```bash
pg_dump -Fc mastodon_production -f backup.dump
```

`rsync` または `scp` を使って `backup.dump` ファイルをコピーしてください。次に、新しいシステムで `mastodon` ユーザで空のデータベースを作成します。

```bash
createdb -T template0 mastodon_production
```

そして、それをインポートする。

```bash
pg_restore -Fc -U mastodon -n public --no-owner --role=mastodon \
  -d mastodon_production backup.dump
```

(新しいサーバでユーザ名が `mastodon` でない場合、上記の `-U` と `--role` の値を変更する必要があることに注意してください。2つのサーバ間でユーザ名が異なっていても大丈夫です)。

### ファイルをコピーする

不必要な再コピーを避けるため、`rsync` を使用することをお勧めします。古いマシンで、`mastodon` ユーザで、実行します。

```bash
rsync -avz ~/live/public/system/ mastodon@example.com:~/live/public/system/
```

旧サーバー上のファイルに変更があった場合は、再実行することをお勧めします。

また、secretを含む `.env.production` ファイルもコピーしておくとよいでしょう。

オプションとして、nginx、systemd、pgbouncerの設定ファイルをコピーしたり、一から書き直したりすることができます。

### 移行中

既存のユーザーに移行が進行中であることを知らせるために、素敵なエラーメッセージを表示したい場合は、古いマシンの `~/live/public/500.html` ページを編集することができます。

また、DNSのTTLを1日ほど前に小さなもの(30-60分)に設定して、新しいIPアドレスを指定するとDNSが迅速に伝搬するようにしておくとよいでしょう。

### マイグレーション後

[Whatsmydns.net](https://whatsmydns.net/)をチェックすることで、DNSのプロパゲーションの進捗を確認できます。このプロセスを開始するには、いつでも `/etc/hosts` ファイルを編集して新しいサーバーを指すようにすれば、早い段階でサーバーをいじり始めることができます。