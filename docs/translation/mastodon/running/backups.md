# サーバーのバックアップ

定期的なバックアップを設定する（オプション。）

実際に使用する場合は、Mastodonサーバーを定期的にバックアップすることをお勧めします。

[[TOC]]

## 概要

バックアップが必要なものを重要度の高い順に並べます。

1. PostgreSQLデータベース
2. `.env.production` ファイルまたは同等のファイルからのアプリケーションシークレット
3. ユーザがアップロードしたファイル
4. Redisデータベース

## 故障モード

一般に人が警戒するような故障は2種類ある。ディスクの破損などのハードウェアの故障と、特定のデータを誤って削除してしまうなどのヒューマンエラーやソフトウェアエラーである。この文書では、前者のみを考える。

PostgreSQLデータベースを失うと、完全にゲームオーバーです。Mastodonは最も重要なデータを全てPostgreSQLのデータベースに格納しています。データベースが消失すると、サーバー上のすべてのアカウント、投稿、フォロワーが一緒に消失してしまいます。

アプリケーションの秘密が失われた場合、マストドンの一部の機能が使えなくなり、ユーザーはログアウトされ、二要素認証が使えなくなり、Web Push API の購読ができなくなります。

ユーザーがアップロードしたファイルが失われた場合、アバター、ヘッダー、メディアの添付ファイルが失われますが、マストドンは今後動作します。

Redisデータベースの損失は、ほとんど無害です。復旧不可能なデータは、Sidekiqのキューの内容と、以前に失敗したジョブの再試行のスケジュールだけです。ホームとリストフィードはRedisに保存されていますが、tootctlで再生成することができます。

最適なバックアップは、いわゆるオフサイトバックアップ、つまりMastodon自身と同じマシンに保存されていないものです。もし、あなたがホストしているサーバーが火事になり、ハードディスクドライブが爆発した場合、同じハードディスクドライブに保存されているバックアップはあまり役に立ちません。

## アプリケーションシークレットのバックアップ

アプリケーションの秘密は、決して変更されないので、バックアップするのが最も簡単です。.env.production` を安全な場所に保存するだけです。

## PostgreSQLのバックアップ

PostgreSQLは、停電やハードディスクドライブの故障、スキーマの移行の失敗などにより、データが破損する危険性があります。そのため、時々 `pg_dump` や `pg_dumpall` を使ってバックアップを取ることをお勧めします。

高可用性環境では、ホットストリーミングレプリケーションを使用して、常に最新のデータを持つ第2のPostgreSQLサーバを用意し、もう一方のサーバがダウンした場合にすぐに切り替えられるようにすることが可能です。

## ユーザがアップロードしたファイルのバックアップ

Amazon S3、Google Cloud、Wasabiなどの外部オブジェクトストレージプロバイダを使用している場合、これらのバックアップを心配する必要はありません。ハードウェアの障害については、各社の責任において対応します。

ローカルファイルストレージを使用している場合、アップロードされたファイルがデフォルトで保存される `public/system` ディレクトリのコピーを作成するのは、あなた次第です。

## Redis のバックアップ

Redis のバックアップは簡単です。Redisは定期的に `/var/lib/redis/dump.rdb` に書き込みを行いますが、コピーを取る必要があるのはこのファイルだけです。