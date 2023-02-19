# サーバーのスケールアップ

より多くのユーザーにサービスを提供するためにできる最適化。

[[TOC]]

## 並行処理の管理

Mastodonには3種類のプロセスがあります。

* Web (Puma)
* ストリーミングAPI
* バックグラウンド処理(Sidekiq)

### Web (Puma)

Webプロセスは、アプリケーションの大部分において、短時間のHTTPリクエストを提供します。以下の環境変数がそれを制御します。

* `WEB_CONCURRENCY` はワーカープロセスの数をコントロールします。
* `MAX_THREADS` はプロセスごとのスレッド数をコントロールする。

スレッドは親プロセスのメモリを共有する。スレッドは親プロセスのメモリを共有します。異なるプロセスは独自のメモリを割り当てますが、コピーオンライトによって一部のメモリを共有します。スレッドの数が多ければ多いほど、まず CPU が最大になり、プロセスの数が多ければ多いほど、まず RAM が最大になります。

これらの値は、同時にいくつの HTTP リクエストを処理できるかに影響します。

スループットの面では、スレッド数よりもプロセス数の方が優れています。

### ストリーミングAPI

ストリーミングAPIは、HTTPおよびWebSocketの長時間接続を処理し、クライアントがリアルタイムの更新を受け取るためのものです。以下の環境変数がこれを制御します。

* `STREAMING_CLUSTER_NUM` はワーカープロセスの数を制御する。
* `STREAMING_API_BASE_URL` はストリーミング API のベース URL を制御する。

1つのプロセスで、それなりに多くのコネクションを処理することができる。例えば、nginx が接続をプロキシすることによるオーバーヘッドを避けたい場合は、Streaming API を別のサブドメインでホストすることができる。

### バックグラウンド処理（Sidekiq）

Mastodonの多くのタスクは、HTTPリクエストを高速に処理し、HTTPリクエストのアボートがそれらのタスクの実行に影響するのを防ぐために、バックグラウンド処理に委ねられています。Sidekiqは1つのプロセスで、スレッドの数は設定可能です。

#### スレッド数

ウェブプロセスのスレッド数は、エンドユーザーに対するMastodonインスタンスの応答性に影響しますが、バックグラウンド処理に割り当てられたスレッド数は、投稿を著者から他の人にどれだけ早く届けられるか、メールをどれだけ早く送信できるか、などに影響します。

この場合、スレッドの量は環境変数ではなく、Sidekiqを呼び出す際のコマンドライン引数で制御します。

```bash
bundle exec sidekiq -c 15
```

15スレッドでsidekiqプロセスを開始します。各スレッドがデータベースに接続できる必要があることに注意してください。これは、データベースプールがすべてのスレッドをサポートするのに十分な大きさである必要があることを意味します。データベースプールのサイズは環境変数 `DB_POOL` で制御でき、少なくともスレッド数と同じである必要があります。

#### キュー

Sidekiqは、重要度の異なるタスクに対して異なるキューを使用します。重要度は、キューが動作していない場合に、サーバーのローカルユーザーのユーザー体験にどれだけ影響を与えるかによって定義され、重要度が低い順に並べられます。

|    Queue    |                                                                       Significance                                                                       |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default`   | ローカルユーザーに影響を与えるすべてのタスク                                                                                                             |
| `push`      | 他のサーバーへのペイロードの配信                                                                                                                         |
| `mailers`   | 電子メールの配信                                                                                                                                         |
| `pull`      | インポート、バックアップ、スレッド解決、ユーザー削除、返信転送など優先度の低いタスクの処理                                                               |
| `scheduler` | トレンドのハッシュタグの更新やログのクリーンアップなどのcronジョブを実行する                                                                             |
| `ingress`   | リモートアクティビティーの着信。デフォルトのキューよりも優先度が低いため、サーバーの負荷が高い場合でもローカルユーザーは自分の投稿を見ることができます。 |

デフォルトのキューとその優先順位は [config/sidekiq.yml](https://github.com/mastodon/mastodon/blob/main/config/sidekiq.yml) に格納されていますが、Sidekiqのコマンドライン呼び出しによって上書きすることができます。

```bash
bundle exec sidekiq -q default
```

デフォルトのキューだけを実行する。

Sidekiqがキューで動作する方法は、まず最初のキューからタスクをチェックし、何もない場合は次のキューをチェックします。つまり、最初のキューが一杯になると、他のキューが遅れをとることになります。

解決策として、例えばSidekiqのために複数のsystemdサービスを異なる引数で作成することで、真に並列実行を保証するためにキューに対して異なるSidekiqプロセスを起動することが可能です。

**実行中の `scheduler` キューが1つだけであることを確認してください!**


## pgBouncerによるトランザクションプーリング

### なぜPgBouncerが必要なのでしょうか？

もしPostgresの接続数(デフォルトは100)が不足し始めたら、PgBouncerが良い解決策になる可能性があります。このドキュメントでは、Mastodonのデフォルトの設定と同様に、いくつかの一般的な問題点を説明します。

管理画面の "PgHero "で、現在使用されているPostgresの接続数を確認することができます。通常、MastodonはPuma、Sidekiq、ストリーミングAPIを合わせたスレッド数と同数の接続を使用します。

### PgBouncerのインストール

DebianとUbuntuの場合。

```bash
sudo apt install pgbouncer
```

### PgBouncerの設定

#### パスワードの設定

まず、Postgresのユーザ`mastodon`がパスワード無しで設定されている場合、パスワードを設定する必要があります。

以下は、パスワードの再設定方法です。

```bash
psql -p 5432 -U mastodon mastodon_production -w
```

そして、（当然ながら、「パスワード」という言葉とは別のパスワードを使用します）。

```sql
ALTER USER mastodon WITH PASSWORD 'password';
```

その後、`q`で終了します。

#### userlist.txtの設定

`etc/pgbouncer/userlist.txt` を編集します。

後でpgbouncer.iniでユーザ/パスワードを指定する限り、userlist.txtの値は実際のPostgreSQLのロールに対応する必要は_ないのです。ユーザとパスワードは任意に定義できますが、簡略化のために「本当の」認証情報を再利用することができます。`userlist.txt` に `mastodon` ユーザーを追加してください。

```text
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
```

ここでは、md5 スキームを使用しています。md5 パスワードは、 `password + username` の md5sum に `md5` という文字列を付加しただけのものです。例えば、パスワードが `password` のユーザ `mastodon` のハッシュを導き出すには、以下のようにする。

```bash
# ubuntu, debian, etc.
echo -n "passwordmastodon" | md5sum
# macOS, openBSD, etc.
md5 -s "passwordmastodon"
```

そして、その先頭に `md5` を追加するだけです。

また、PgBouncerの管理データベースにログインするために、`pgbouncer`という管理ユーザを作成します。以下は`userlist.txt`のサンプルです。

```text
"mastodon" "md5d75bb2be2d7086c6148944261a00f605"
"pgbouncer" "md5a45753afaca0db833a6f7c7b2864b9d9"
```

どちらの場合も、パスワードは単に `password` となります。

#### pgbouncer.iniの設定

`etc/pgbouncer/pgbouncer.ini` を編集します。

`[データベース]`の下に、接続したいPostgresデータベースを列挙した行を追加します。ここでは、PgBouncerが同じユーザ名/パスワードとデータベース名を使用して、Postgresのデータベースに接続するようにします。

```text
[databases]
mastodon_production = host=127.0.0.1 port=5432 dbname=mastodon_production user=mastodon password=password
```

`listen_addr`と`listen_port`は、PgBouncerがどのアドレス/ポートで接続を受け入れるかを指定します。デフォルトで問題ありません。

```text
listen_addr = 127.0.0.1
listen_port = 6432
```

`auth_type` に `md5` を指定します (`userlist.txt` で md5 形式を使用していると仮定しています)。

`pgbouncer` のユーザが管理者であることを確認してください。

**この次の部分は非常に重要です！** デフォルトのプーリングモードはセッションベースですが、Mastodonではトランザクションベースにしたいのです。つまり、Postgresの接続は、トランザクションが作成されたときに作成され、トランザクションが終了したときに切断されます。そのため、`pool_mode` を `session` から `transaction` に変更したいと思います。

次に、 `max_client_conn` はPgBouncer自身が受け入れる接続数を定義し、 `default_pool_size` はフード下で開かれるPostgres接続の数に制限をかけます。(PgHeroでは、PgBouncerの知識がないため、報告される接続の数は `default_pool_size` に対応します)。

最初はデフォルトで問題ありませんし、後でいつでも増やせます。

```text
max_client_conn = 100
default_pool_size = 20
```

変更後は、pgbouncerをリロードまたは再起動することを忘れないでください。

```bash
sudo systemctl reload pgbouncer
```

#### すべて動作することを確認するデバッグ

Postgresと同じようにPgBouncerに接続することができるはずです。

```bash
psql -p 6432 -U mastodon mastodon_production
```

そして、パスワードを使ってログインしてください。

このようにPgBouncerのログを確認することもできます。

```bash
tail -f /var/log/postgresql/pgbouncer.log
```

#### MastodonがPgBouncerと会話するための設定

.env.production` ファイルで、まずこの設定がされていることを確認します。

```bash
PREPARED_STATEMENTS=false
```

トランザクションベースのプーリングを使用しているので、プリペアドステートメントを使用することはできません。

次に、Mastodonがポート5432（Postgres）ではなく、6432（PgBouncer）を使用するように設定すれば、完了です。

```bash
DB_HOST=localhost
DB_USER=mastodon
DB_NAME=mastodon_production
DB_PASS=password
DB_PORT=6432
```

::: warning

pgBouncerを使用して`db:migrate`タスクを実行することはできません。しかし、これは簡単に回避することができます。postgresとpgbouncerが同じホスト上にある場合、タスクを呼び出すときに`DB_PORT=5432`を`RAILS_ENV=production`と一緒に定義するだけで、簡単に実行できます。

:::

#### PgBouncerの管理について

一番簡単なリブートの方法は

```bash
sudo systemctl restart pgbouncer
```

しかし、PgBouncerの管理者ユーザーを設定している場合は、管理者として接続することも可能です。

```bash
psql -p 6432 -U pgbouncer pgbouncer
```

そして、実行する。

```sql
RELOAD;
```

その後、終了するには `q` を使用します。

## キャッシュ用にRedisを分離する

Redisはアプリケーション全体で広く使われていますが、いくつかの用途は他の用途よりも重要です。ホームフィード、リストフィード、Sidekiqキュー、そしてストリーミングAPIはRedisによってバックアップされており、それは失いたくない重要なデータです（たとえ損失が存続できるとしても、PostgreSQLデータベースの損失とは異なります - 絶対に失わないでください！）。しかし、Redisは揮発性キャッシュにも使用されます。もし、スケールアップする段階で、Redisがすべてを処理できるかどうか心配な場合は、キャッシュ用に別のRedisデータベースを使用することができます。この環境では、`CACHE_REDIS_URL` や `CACHE_REDIS_HOST`, `CACHE_REDIS_PORT` などの個々のパーツを指定することができる。指定しなかった部分は、キャッシュプレフィックスを指定しなかった場合と同じ値にフォールバックします。

Redisデータベースの設定に関しては、基本的にディスクへのバックグラウンド保存を廃止することができます。なぜなら、再起動時にデータが失われるのは問題ではなく、その分ディスクI/Oを節約することができるからです。また、最大メモリ制限やキーエビクションポリシーを追加することも可能ですが、これについてはこちらのガイドを参照してください。[RedisをLRUキャッシュとして使用する](https://redis.io/topics/lru-cache)

## リードレプリカ

Postgresqlサーバーの負荷を軽減するために、ホットストリーミングレプリケーション(リードレプリカ)を設定するとよいでしょう。[例としてこのガイドを参照してください](https://cloud.google.com/community/tutorials/setting-up-postgres-hot-standby)。マストドンでは、このような方法でレプリカを利用することができます。

* ストリーミングAPIサーバーは書き込みを全く行わないので、そのままレプリカに接続することができます。しかし、どうせデータベースへの問い合わせはあまりしないので、この影響はほとんどありません。
* WebとsidekiqのプロセスでMakaraドライバを使用し、書き込みはマスターデータベースへ、読み込みはレプリカへ行くようにします。それについて説明しましょう。

`config/database.yml` ファイルを編集して、`production` セクションを以下のように置き換える必要があります。

```yaml
production:
  <<: *default
  adapter: postgresql_makara
  prepared_statements: false
  makara:
    id: postgres
    sticky: true
    connections:
      - role: master
        blacklist_duration: 0
        url: postgresql://db_user:db_password@db_host:db_port/db_name
      - role: slave
        url: postgresql://db_user:db_password@db_host:db_port/db_name
```

URLがあなたのPostgreSQLサーバーのある場所を指していることを確認してください。複数のレプリカを追加することができます。例えば、"mastodon "はマスターに、"mastodon_replica "はレプリカに接続するため、上記のファイルでは、両方のURLは同じユーザー、パスワード、ホスト、ポートで、異なるデータベース名のローカルpgBouncerを指すことになります。このように多くの可能性があります。Makaraの詳細については、[彼らのドキュメントを参照してください](https://github.com/taskrabbit/makara#databaseyml)。

::: warning

Sidekiqは、わずかなレプリケーションの遅れでも、キューに入れられたレコードが見つからず、ジョブが失敗してしまうため、確実にリードレプリカを使用することができません。

:::