# 環境を設定する

Mastodonのインストールに必要な環境変数を設定します。

マストドンは環境変数を設定として使用します。

便宜上、Mastodon ディレクトリにある `.env.production` というフラットファイル("dotenv" ファイルと呼ばれます)から読み込むことができますが、特定のプロセスで常にオーバーライドすることができます。例えば、systemd のサービスファイルは `EnvironmentFile` や `Environment` を使ったインライン定義から環境変数を読み込むことができるので、特定のサービスに対して異なる設定パラメータを持たせることができます。また、コマンドラインから Mastodon を呼び出す際にも、環境変数を指定することができる。

[[TOC]]

## 基本

### フェデレーションとディスプレイ

#### `LOCAL_DOMAIN`

これは、ネットワーク内であなたのサーバーを一意に識別するものです。これを変更すると、リモートサーバーが既存のアカウントと全く新しいアカウントを混同してしまうため、後で安全に変更することはできません。これは、あなたがサーバを運用しているドメイン名でなければなりません (プロトコル部分を除いたもの、例えば `example.com` だけです)。

#### `WEB_DOMAIN`

`WEB_DOMAIN` はオプションの環境変数で、あるドメインにマストドンをインストールし、ユーザーのハンドルは別のドメインにすることができます。例えば、ユーザーアドレスは `@alice@example.com` で、マストドンには `mastodon.example.com` でアクセスすることができます。これは、ドメイン名がすでに別のウェブサイトで使用されているが、見た目が良い、または短いので、マストドンの識別子として使用したい場合に便利です。

`LOCAL_DOMAIN` と同様に、`WEB_DOMAIN` は一度設定すると安全に変更することができません。なぜなら、以前の設定を知っているリモートサーバーを混乱させ、彼らとの通信を中断したり信頼性を低下させたりする可能性があるためです。この問題は、リモートサーバーがあなたのアカウントを理解することにあるため、Mastodonを一からインストールし直しても問題は解決しません。従って、`LOCAL_DOMAIN`と`WEB_DOMAIN`の設定には細心の注意を払うようにしてください。

Mastodon を `mastodon.example.com` にインストールして、 `@alice@example.com` にサービスを提供できるようにするには、 `LOCAL_DOMAIN` を `example.com` に、 `WEB_DOMAIN` を `mastodon.example.com` にセットしてください。また、`https://example.com/.well-known/webfinger` へのリクエストを `https://mastodon.example.com/.well-known/webfinger` にリダイレクトまたはプロキシするために、`example.com` をホストするサーバーに追加の設定が必要です。例えば、nginxの場合、以下のような構成になる。

```
location /.well-known/webfinger {
  add_header Access-Control-Allow-Origin '*';
  return 301 https://mastodon.example.com$request_uri;
}
```

#### `ALTERNATE_DOMAINS`

複数のドメインがMastodonサーバーを指している場合、この設定により、ユーザーが他のドメインを使用してアドレス指定されたときに、Mastodonが自分自身を認識することができます。ドメインはカンマで区切ってください。例：`foo.com,bar.com`。

#### `ALLOWED_PRIVATE_ADDRESSES`

送信するHTTPクエリーで許可する特定のアドレス/サブネットをカンマ区切りで指定。

#### `AUTHORIZED_FETCH`

「セキュアモード」とも呼ばれます。`true`に設定すると、以下のような変更が行われます。

- Mastodon は公開投稿にリンクされたデータの署名を生成しなくなる。これは、正確な制御ができないまま効率的に再配布されることを防ぐためである。署名付きのリンクデータ・オブジェクトは完全に自己完結しているので、署名の発信元であるサーバーに余計なリクエストをすることなく受け渡しすることができる。
- Mastodonは、通常認証なしで利用できる公開投稿とプロフィールのActivityPub表現に、HTTP署名認証を要求します。プロフィールは、認証が行われない場合、最低限の技術情報のみを返します。
- v4.0.0以前： Mastodonは、REST/ストリーミングAPIにアクセスする際、ユーザーコンテキスト（アクティブユーザーによるOAuth認証画面）を必要とします。

その結果、認証の仕組みや、自分のサーバーを介さない再配信の仕組みを避けることで、自分のサーバーから公開コンテンツを取得できる人とできない人、例えばドメインをブロックしているサーバーを強制することができるようになります。

::: warning

残念ながら、セキュアモードには欠点があり、そのためデフォルトでは有効になっていません。特に、3.0 より古い Mastodon サーバでは、いくつかの機能が壊れてしまいます。また、最新のサーバであっても、公開会話スレッドをより完全なものにするためにリンクデータ署名が使われるため、有用な機能を失ってしまいます。

:::

::: warning

セキュアモードでは、公開された投稿やプロフィールの HTML 表現は隠蔽されません。HTML は、ファーストクラスの ActivityPub 表現や REST API と比べると、よりロッシーなフォーマットですが、それでもコンテンツをスクレイピングするための潜在的なベクトルであることに変わりはありません。

:::

#### `LIMITED_FEDERATION_MODE`

`true` に設定すると、Mastodon はフェデレーションを手動で承認したサーバのみに制限し、すべての公開ページと一部の REST API を無効にします。制限付きフェデレーションモードは、セキュアモード (`AUTHORIZED_FETCH`) に基づいている。

既存のインスタンスを制限付きフェデレーションモードに切り替える場合、以下のコマンドを使用して、許可されていないドメインに既に存在するデータを削除する必要があります。

```
tootctl domain purge --limited-federation-mode
```

::: warning

このモードは、マストドンのミッションである分散化に反して、事実上データサイロを形成してしまうため、学術機関や企業内ネットワークなどの私的利用のみを想定しています。

:::

::: info

This setting was known as `WHITELIST_MODE` prior to 3.1.5.

:::

#### `DISALLOW_UNAUTHENTICATED_API_ACCESS`

Mastodon v4.0.0 では、ログアウトしている視聴者であっても、すべてのリクエストのレンダリングにウェブアプリが使用されるようになりました。これらのビューを動作させるために、ウェブアプリはアカウントとステータスを取得するためにパブリックAPIリクエストを行います。これを許可しない場合は、この変数を `true` に設定してください。認証されていないAPIアクセスを禁止すると、ログアウトしたユーザーに対してプロフィールや投稿のパーマリンクがエラーを返すことになるので、実質的にコンテンツを見るにはローカルでログインするかActivityPub経由で取得するしかないことに注意してください。

#### `SINGLE_USER_MODE`

true`に設定すると、Mastodonサーバーのフロントページは常にデータベースの最初のプロファイルにリダイレクトされ、登録は無効となります。

#### `DEFAULT_LOCALE`

デフォルトでは、マストドンはブラウザのヘッダーから訪問者の言語を自動的に検出し、その言語でマストドンのインターフェイスを表示します（サポートされている場合）。もし、あなたが言語固有のサーバーや地域的なサーバーを運営している場合、その動作はあなたの言語を話さない訪問者をあなたのサーバーにサインアップさせるように誤解させるかもしれません。このため、この変数を特定の言語に設定するとよいでしょう。

値の例: `de`

対応言語

- `ar`
- `ast`
- `bg`
- `bn`
- `br`
- `ca`
- `co`
- `cs`
- `cy`
- `da`
- `de`
- `el`
- `en`
- `eo`
- `es`
- `es-AR`
- `et`
- `eu`
- `fa`
- `fi`
- `fr`
- `ga`
- `gl`
- `he`
- `hi`
- `hr`
- `hu`
- `hy`
- `id`
- `io`
- `is`
- `it`
- `ja`
- `ka`
- `kab`
- `kk`
- `kn`
- `ko`
- `lt`
- `lv`
- `mk`
- `ml`
- `mr`
- `ms`
- `nl`
- `nn`
- `no`
- `oc`
- `pl`
- `pt-BR`
- `pt-PT`
- `ro`
- `ru`
- `sk`
- `sl`
- `sq`
- `sr`
- `sr-Latn`
- `sv`
- `ta`
- `te`
- `th`
- `tr`
- `uk`
- `ur`
- `vi`
- `zh-CN`
- `zh-HK`
- `zh-TW`

### シークレット

#### `SECRET_KEY_BASE`

`rake secret`で生成します。これを変更すると、すべてのアクティブなブラウザセッションが壊れます。

#### `OTP_SECRET`

`rake secret`で生成します。これを変更すると、2要素認証が解除されます。

#### `VAPID_PRIVATE_KEY`

生成には `rake mastodon:webpush:generate_vapid_key` を使用します。これを変更すると、プッシュ通知が壊れます。

#### `VAPID_PUBLIC_KEY`

生成には `rake mastodon:webpush:generate_vapid_key` を使用します。これを変更すると、プッシュ通知が壊れます。

### デプロイ

#### `RAILS_ENV`

環境。`production`, `development`, または `test` を指定することができる。開発目的で個人所有のコンピュータで Mastodon を動作させる場合は、 `development` を使用する。これはデフォルトでもある。オンラインで Mastodon を動作させる場合は、 `production` を使用する。Mastodon は環境に応じて異なるデフォルトの設定をロードする。

::: warning

この変数は、dotenv (`.env`) ファイルがロードされる前に使用されるため、dotenv ファイルで定義することはできません。

:::

#### `RAILS_SERVE_STATIC_FILES`

true に設定すると、Mastodon は `public` ディレクトリにあるファイルへのリクエストに応答するようになります。これは、リバースプロキシ (例えば nginx) が、コンテナ環境など `public` ディレクトリ自体へのファイルシステムのアクセス権を持っていない場合に必要になることがあります。静的ファイルをファイルシステムから直接提供する方が、Ruby on Rails のプロセスを通して提供するよりも常にずっと速いため、これは最適とはいえない設定です。

#### `RAILS_LOG_LEVEL`

Mastodon が生成するログの量を決定する。デフォルトは `info` で、Mastodon が処理するすべてのリクエストとバックグラウンドジョブについてのログが生成される。これは便利な機能だが、トラフィックやアクティビティが多い場合、ノイズが多くなり、マシンの I/O に負担がかかることがある。そのような場合は、 `warn` を推奨する。これは、うまくいっていないことについての情報のみを出力し、それ以外は静かにしている。使用できる値は `debug`、`info`、`warn`、`error`、`fatal` および `unknown` である。

#### `TRUSTED_PROXY_IP`

Mastodonのウェブおよびストリーミングプロセスに、どのIPが信頼できるリバースプロキシとして機能するかを伝えます（例：nginx、Cloudflare）。Mastodonが各リクエストのソースIPを決定する方法に影響し、重要なレート制限とセキュリティ機能に使用されます。この値が正しく設定されていない場合、マストドンは実際のソースではなく、リバースプロキシのIPを使用する可能性があります。

デフォルトでは、ループバックアドレスとプライベートネットワークアドレスの範囲が信頼されます。具体的には

 * `127.0.0.1/8`
 * `::1/128`
 * `10.0.0.0/8`
 * `172.16.0.0/12`
 * `192.168.0.0/16`
 * `fc00::/7`

リバースプロキシが1つで、それがMastodonのウェブやストリーミングのプロセスと同じマシンや同じプライベートネットワークで動作している場合、この設定を変更する必要はなく、デフォルトのままでよいでしょう。また、複数のリバースプロキシサーバーを使用していて、それらがすべてMastodonのウェブおよびストリーミングプロセスと同じプライベートネットワーク内にある場合は、やはりデフォルトのままでよいでしょう。しかし、リバースプロキシサーバーを使用していて、パブリックIPアドレス経由でMastodonのウェブ・ストリーミングサーバーに到達する場合（例えばCloudflareや同様のプロキシを使用している場合）、この変数を設定する必要があります。これは、使用しているすべてのリバースプロキシのIPを、[CIDR表記](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing#CIDR_notation)を使用してIPまたはIP範囲のカンマ区切りリストとして指定する必要があります。この変数が設定されると、(上記の) デフォルトの範囲は信頼されなくなるので、もし外部のリバースプロキシと ローカルホストのプロキシの両方がある場合は、両方の IP (または IP の範囲) を含めなければならないことに注意してください。

#### `SOCKET`

`127.0.0.1` のような IP アドレスにバインドする代わりに、Unix ソケットにバインドすることができます。この変数は、プロセスごとに異なる値が必要で、ウェブ (Puma) プロセスとストリーミング API (Node.js) プロセスの両方で動作します。

::: warning

この変数は、dotenv (`.env`) ファイルがロードされる前に使用されるため、dotenv ファイルで定義することはできません。

:::

#### `PORT`

Unix ソケットを使用していない場合、プロセスがどのポートをリッスンするのかを定義します。この変数はプロセス固有で、例えばプロセスごとに異なる値が必要です。また、ウェブ (Puma) プロセスとストリーミング API (Node.js) プロセスの両方に対して機能します。デフォルトでは、ウェブは `3000` で、ストリーミング API は `4000` でリッスンします。

::: warning

この変数は、dotenv (`.env`) ファイルがロードされる前に使用されるため、dotenv ファイルで定義することはできません。

:::

#### `NODE_ENV`

`RAILS_ENV` と同等であるが、ストリーミング API (Node.js) 用のものである。

::: warning

この変数は、dotenv (`.env`) ファイルがロードされる前に使用されるため、dotenv ファイルで定義することはできません。

:::

#### `BIND`

Unixソケットを使用していない場合、これはプロセスがバインドするIPを定義します。複数のプロセスが異なるポートでリッスンしている限り、同じIPにバインドすることができます。デフォルトは `127.0.0.1` です。

::: warning

この変数は、dotenv (`.env`) ファイルがロードされる前に使用されるため、dotenv ファイルで定義することはできません。

:::

### スケーリングオプション

#### `SIDEKIQ_CONCURRENCY`

4.1で追加されました。Sidekiqに特化し、この変数はSidekiqがいくつの異なるプロセスにフォークするかを決定します。デフォルトは `5` です。

#### `WEB_CONCURRENCY`

Puma 固有のもので、この変数は Puma がいくつの異なるプロセスにフォークするかを決定する。デフォルトは `2` です。

#### `MAX_THREADS`

Puma 固有の変数で、各 Puma プロセスが維持するスレッドの数を決定する。デフォルトは `5` です。

#### `PERSISTENT_TIMEOUT`

Puma 固有の変数で、Puma が接続を閉じるまでの待ち時間を決定します。デフォルトは `20` です。

#### `PREPARED_STATEMENTS`

デフォルトでは、MastodonはPostgreSQLのプリペアドステートメント機能を使用し、いくつかのパフォーマンス上の利点を提供します。この機能は、トランザクション間で接続を共有するコネクションプールを使用している場合は使用できず、`false`に設定する必要がある。規模が大きくなると、トランザクションベースのコネクションプールの利点が、プリペアドステートメントによる利点よりも大きくなります。

#### `STREAMING_API_BASE_URL`

ストリーミングAPIは、異なるドメイン／サブドメインに配置することができます。デフォルトの設定では、長時間のストリーミングAPIリクエストはnginxを介してプロキシされるため、これによってストリーミングAPIのパフォーマンスが向上する可能性がある。一方、別のドメイン／サブドメインからストリーミングAPIを提供すれば、nginxを完全にスキップすることができる。

値の例: `wss://streaming.example.com`.

#### `STREAMING_CLUSTER_NUM`

ストリーミングAPIに特化し、この変数はストリーミングAPIがいくつの異なるプロセスにフォーカスを当てるかを決定する。デフォルトは CPU コアの数から 1 を引いた値である。

## バックエンド

### PostgreSQL

#### `DB_HOST`

デフォルトは `localhost` です。

#### `DB_USER`

デフォルトは `mastodon` です。

#### `DB_NAME`

デフォルトは `mastodon_production` です。

#### `DB_PASS`

デフォルトなし。

#### `DB_PORT`

デフォルトは `5432` です。

#### `DB_POOL`

プロセス内でプールするデータベース接続の数。この値はプロセス内のすべてのスレッドをカバーする必要がある。そのため、デフォルトでは `MAX_THREADS` の値になる。

#### `DB_SSLMODE`

Postgresの[SSLモード](https://www.postgresql.org/docs/10/libpq-ssl.html)を指定します。デフォルトは `prefer` です。

#### `DATABASE_URL`

指定した場合は、`DB_HOST`、`DB_USER`、`DB_NAME`、`DB_PASS` および `DB_PORT` よりも優先される。

値の例: `postgresql://user:password@localhost:5432`.

### Redis

::: info

揮発性キャッシュのために別のRedisサーバーを使用することが可能です。Redisサーバーに負荷がかかり始めたら、そうするのがよいでしょう。

:::

#### `REDIS_HOST`

デフォルトは `localhost` です。

#### `REDIS_PORT`

デフォルトは `6379` である。

#### `REDIS_URL`

指定された場合、 `REDIS_HOST` と `REDIS_PORT` よりも優先される。

例：`redis://user:password@localhost:6379`。

#### `REDIS_NAMESPACE`

指定すると、すべての Redis キーを名前空間化します。これにより、異なるプロジェクトやMastodonサーバー間で同じRedisデータベースを共有することができます。

#### `CACHE_REDIS_HOST`

デフォルトは `REDIS_HOST` の値である。

#### `CACHE_REDIS_PORT`

デフォルトは `REDIS_PORT` の値である。

#### `CACHE_REDIS_URL`

提供された場合、 `CACHE_REDIS_HOST` と `CACHE_REDIS_PORT` よりも優先されます。デフォルトは `REDIS_URL` の値です。

#### `CACHE_REDIS_NAMESPACE`

デフォルトは `REDIS_NAMESPACE` の値である。

#### `SIDEKIQ_REDIS_URL`

### エラスティックサーチ

#### `ES_ENABLED`

true`に設定すると、Mastodonは検索機能にElasticSearchを使用します。

#### `ES_HOST`

ElasticSearchサーバーのホスト。デフォルトは `localhost` です。

#### `ES_PORT`

ElasticSearchサーバのポート番号。デフォルトは `9200` です。

#### `ES_USER`

ElasticSearchで任意に認証を行うために使用します。

#### `ES_PASS`

ElasticSearchで任意に認証を行うために使用します。

#### `ES_PREFIX`

ElasticSearch サーバを複数のプロジェクトや異なる Mastodon サーバで共有する場合に有用です。デフォルトは `REDIS_NAMESPACE` の値である。

### StatsD

#### `STATSD_ADDR`

この設定を行うと、Mastodonはホスト名とポートで識別されるStatsDインスタンスにいくつかのイベントとメトリックスを記録します。

値の例：`localhost:8125`。

#### `STATSD_NAMESPACE`

設定すると、すべての StatsD キーのプレフィックスにこの文字が含まれるようになります。デフォルトは、`RAILS_ENV` が `production` の場合は `Mastodon.production` で、`development` の場合は `Mastodon.development` などとなります。

### SMTPメール配信

#### `SMTP_SERVER`
#### `SMTP_PORT`
#### `SMTP_LOGIN`
#### `SMTP_PASSWORD`
#### `SMTP_FROM_ADDRESS`
#### `SMTP_DOMAIN`
#### `SMTP_DELIVERY_METHOD`
#### `SMTP_AUTH_METHOD`
#### `SMTP_CA_FILE`
#### `SMTP_OPENSSL_VERIFY_MODE`
#### `SMTP_ENABLE_STARTTLS_AUTO`
#### `SMTP_ENABLE_STARTTLS`

`auto` (デフォルト)、`always`、または `never` に設定する。

**Version history:** 4.0.0 - added

#### `SMTP_TLS`
#### `SMTP_SSL`

## ファイルストレージ

### CDN

#### `CDN_HOST`

静的アセット（ロゴ、絵文字、CSS、JSなど）は、CDN（Content Delivery Network）のような別のホストから提供すると、ユーザーの読み込み時間を短縮することができます。

値の例: `https://assets.example.com`

::: info

CORS ヘッダを付けてファイルを提供しなければ、Mastodon の Web UI の一部の機能が動作しません。例えば、`Access-Control-Allow-Origin:*`

:::

#### `S3_ALIAS_HOST`

`CDN_HOST` と同様に、別のホストから *ユーザーアップロードされた* ファイルを提供することができます。実際、Amazon S3、Minio、Google Cloudなどの外部ストレージを使用している場合、デフォルトでこれらのサービスのURLからファイルを提供することになります。

いくつかの理由から、ご自身のホストを利用されることを強くお勧めします。

1. 外部ストレージプロバイダーの帯域は従量制で、料金が高い
2. 古いリンクを壊さずに、後で別のプロバイダに切り替えたい場合

値の例：`files.example.com`。

::: info

CORS ヘッダを付けてファイルを提供しなければ、Mastodon の Web UI の一部の機能が動作しません。例えば、`Access-Control-Allow-Origin:*`

:::

### ローカルファイルストレージ

#### `PAPERCLIP_ROOT_PATH`
#### `PAPERCLIP_ROOT_URL`

### Amazon S3および互換性のある

#### `S3_ENABLED`
#### `S3_BUCKET`
#### `AWS_ACCESS_KEY_ID`
#### `AWS_SECRET_ACCESS_KEY`
#### `S3_REGION`
#### `S3_PROTOCOL`
#### `S3_HOSTNAME`
#### `S3_ENDPOINT`
#### `S3_SIGNATURE_VERSION`
#### `S3_OVERRIDE_PATH_STYLE`
#### `S3_OPEN_TIMEOUT`
#### `S3_READ_TIMEOUT`
#### `S3_FORCE_SINGLE_REQUEST`

### Swift

#### `SWIFT_ENABLED`
#### `SWIFT_USERNAME`
#### `SWIFT_TENANT`
#### `SWIFT_PASSWORD`
#### `SWIFT_PROJECT_ID`
#### `SWIFT_AUTH_URL`
#### `SWIFT_CONTAINER`
#### `SWIFT_OBJECT_URL`
#### `SWIFT_REGION`
#### `SWIFT_DOMAIN_NAME`
#### `SWIFT_CACHE_TTL`

## 外部認証

### OmniAuth

#### `OMNIAUTH_ONLY`

### LDAP

#### `LDAP_ENABLED`
#### `LDAP_HOST`
#### `LDAP_PORT`
#### `LDAP_METHOD`
#### `LDAP_BASE`
#### `LDAP_BIND_DN`
#### `LDAP_PASSWORD`
#### `LDAP_UID`
#### `LDAP_SEARCH_FILTER`
#### `LDAP_MAIL`
#### `LDAP_UID_CONVERSTION_ENABLED`

### PAM

#### `PAM_ENABLED`
#### `PAM_EMAIL_DOMAIN`
#### `PAM_DEFAULT_SERVICE`
#### `PAM_CONTROLLED_SERVICE`

### CAS

#### `CAS_ENABLED`
#### `CAS_DISPLAY_NAME`
#### `CAS_URL`
#### `CAS_HOST`
#### `CAS_PORT`
#### `CAS_SSL`
#### `CAS_VALIDATE_URL`
#### `CAS_CALLBACK_URL`
#### `CAS_LOGOUT_URL`
#### `CAS_LOGIN_URL`
#### `CAS_UID_FIELD`
#### `CAS_CA_PATH`
#### `CAS_DISABLE_SSL_VERIFICATION`
#### `CAS_UID_KEY`
#### `CAS_NAME_KEY`
#### `CAS_EMAIL_KEY`
#### `CAS_NICKNAME_KEY`
#### `CAS_FIRST_NAME_KEY`
#### `CAS_LAST_NAME_KEY`
#### `CAS_LOCATION_KEY`
#### `CAS_IMAGE_KEY`
#### `CAS_PHONE_KEY`
#### `CAS_SECURITY_ASSUME_EMAIL_IS_VERIFIED`

### SAML

#### `SAML_ENABLED`
#### `SAML_ACS_URL`
#### `SAML_ISSUER`
#### `SAML_IDP_SSO_TARGET_URL`
#### `SAML_IDP_CERT`
#### `SAML_IDP_CERT_FINGERPRINT`
#### `SAML_NAME_IDENTIFIER_FORMAT`
#### `SAML_CERT`
#### `SAML_PRIVATE_KEY`
#### `SAML_SECURITY_WANT_ASSERTION_SIGNED`
#### `SAML_SECURITY_WANT_ASSERTION_ENCRYPTED`
#### `SAML_SECURITY_ASSUME_EMAIL_IS_VERIFIED`
#### `SAML_ATTRIBUTES_STATEMENTS_UID`
#### `SAML_ATTRIBUTES_STATEMENTS_EMAIL`
#### `SAML_ATTRIBUTES_STATEMENTS_FULL_NAME`
#### `SAML_ATTRIBUTES_STATEMENTS_FIRST_NAME`
#### `SAML_ATTRIBUTES_STATEMENTS_LAST_NAME`
#### `SAML_UID_ATTRIBUTE`
#### `SAML_ATTRIBUTES_STATEMENTS_VERIFIED`
#### `SAML_ATTRIBUTES_STATEMENTS_VERIFIED_EMAIL`

## 隠しサービス

### TOR

#### `http_proxy`
#### `http_hidden_proxy`
#### `ALLOW_ACCESS_TO_HIDDEN_SERVICE`

## 制限事項

### メールドメイン

#### `EMAIL_DOMAIN_ALLOWLIST`

設定された場合、指定されたドメインからのメール以外では登録ができなくなります。パイプで区切られた値、例:`foo.com|bar.com` のようになります。

#### `EMAIL_DOMAIN_DENYLIST`

設定された場合、指定されたドメインからの電子メールでは登録ができなくなります。パイプで区切られた値、例:例：`foo.com|bar.com`。

::: warning

このオプションは非推奨です。管理画面または `tootctl` コマンドラインインタフェースから、電子メールのドメインを動的にブロックすることができます。

:::

### セッション

#### `MAX_SESSION_ACTIVATIONS`

ユーザーごとに許可されるブラウザセッションの数を指定します。デフォルトは `10` です。新しいブラウザセッションが作成された場合、最も古いセッションは削除されます（例: そのブラウザのユーザーはログアウトされます）。

### Home feeds

#### `USER_ACTIVE_DAYS`

Mastodon はホームフィードを RAM (具体的には Redis データベース) に保存します。そのため、アクセスや更新は非常に高速に行えますが、使われないのにそこに置いておくのは好ましくありませんし、アクセスされない新しいアイテムをホームフィードに挿入するためにリソースを使いたくありません。そのため、Mastodonでは、しばらくオンラインになっていないユーザーのホームフィードを定期的に消去し、再び現れたらデータベースのデータからそのホームフィードを再生成するようにしています。デフォルトでは、過去7日間にオンラインであったユーザはアクティブとみなされます。

ホームフィードの再生成は計算コストがかかります。もしSidekiqが、ユーザーが3日ごとにオンラインになるにもかかわらず、`USER_ACTIVE_DAYS`が2に設定されているために常にそれを行っているなら、それを調整することを検討してみてください。

::: info

この設定は、月間アクティブユーザー数などの統計上、どのユーザーをアクティブと見なすかとは関係ありません。

:::

## その他

### DBマイグレーション

#### `SKIP_POST_DEPLOYMENT_MIGRATIONS`

この変数は `rake db:migrate` を実行したときのみ効果を発揮し、Mastodon のアップグレード処理に極めて特有なものです。データベースのマイグレーションには、新しいコードがデプロイされて実行される前に実行されるものと、実行された後に実行されるものの 2 種類があります。デフォルトでは、両方のタイプのマイグレーションが実行されます。もし、マイグレーションを実行する前にすべての Mastodon プロセスをシャットダウンすれば、何の違いもありません。この変数は、ゼロダウンタイムのアップグレードのために意味をなします。この変数が必要かどうかは、特定の Mastodon バージョンのアップグレードの説明書をご覧ください。

### 未分類または未分類のもの

#### `BUNDLE_GEMFILE`
#### `DEEPL_API_KEY`
#### `DEEPL_PLAN`
#### `LIBRE_TRANSLATE_ENDPOINT`
#### `LIBRE_TRANSLATE_API_KEY`
#### `CACHE_BUSTER_ENABLED`
#### `CACHE_BUSTER_SECRET_HEADER`
#### `CACHE_BUSTER_SECRET`
#### `GITHUB_REPOSITORY`

デフォルトは `mastodon/mastodon` です。

#### `SOURCE_BASE_URL`

デフォルトは `https://github.com/$GITHUB_REPOSITORY` です。

#### `FFMPEG_BINARY`
#### `LOCAL_HTTPS`
#### `PATH`
#### `MAX_FOLLOWS_THRESHOLD`

デフォルトは `7500` です。

#### `MAX_FOLLOWS_RATIO`

デフォルトは `1.1` です。

#### `IP_RETENTION_PERIOD`

デフォルトは `31536000` (1年)

#### `SESSION_RETENTION_PERIOD`

デフォルトは `31536000` (1年)

#### `BACKTRACE`

1` に設定すると、Rails フレームワークのコードへのバックトラックが可能になります。

#### `DISABLE_SIMPLECOV`

#### `EMAIL_DOMAIN_LISTS_APPLY_AFTER_CONFIRMATION`

#### `DISABLE_FOLLOWERS_SYNCHRONIZATION`

#### `MAX_REQUEST_POOL_SIZE`

デフォルトは `512` である。

#### `GITHUB_API_TOKEN`

Github のコミット履歴から AUTHORS.md を生成するための rake タスクで使用します。