# オプション機能のインストール

マストドンには、必要に応じて使用できるオプション機能がいくつか用意されています。

[[TOC]]

## 全文検索

ElasticSearchで、authored, favorited, mentioned inのステータスを検索するように設定する。

Mastodonは、ElasticSearchが利用可能な場合、全文検索に対応しています。Mastodonの全文検索は、ログインしているユーザーが自分のステータス、メンション、お気に入り、ブックマークから結果を見つけることができます。データベース全体から任意の文字列を検索することは、意図的に許可していません。

### ElasticSearchのインストール

ElasticSearchはJavaランタイムを必要とします。Javaがまだインストールされていない場合は、今すぐインストールしましょう。`root`でログインしていると仮定します。

```bash
apt install openjdk-17-jre-headless
```

aptにElasticSearchの公式リポジトリを追加します。

```bash
wget -O /usr/share/keyrings/elasticsearch.asc https://artifacts.elastic.co/GPG-KEY-elasticsearch
echo "deb [signed-by=/usr/share/keyrings/elasticsearch.asc] https://artifacts.elastic.co/packages/7.x/apt stable main" > /etc/apt/sources.list.d/elastic-7.x.list
```

これで、ElasticSearchのインストールができました。

```bash
apt update
apt install elasticsearch
```

::: warning

**セキュリティ警告:** デフォルトでは、ElasticSearchはlocalhostにのみバインドされ、外部ネットワークからはアクセスできないようになっています。ElasticSearchがどのアドレスにバインドされているかは、 `/etc/elasticsearch/elasticsearch.yml` 内の `network.host` で確認することができます。認証レイヤーがないため、ElasticSearchにアクセスできる人なら誰でも、その中のあらゆるデータにアクセスし、変更することができると考えてください。ですから、アクセスの安全性を確保することは本当に重要です。メインインストール手順](../../prerequisites/#install-a-firewall and only-whitelist-ssh-http-and-https-ports) にあるように、22、80、443ポートのみを公開するファイアウォールを設置することが推奨されます。マルチホストのセットアップを行う場合、内部トラフィックを保護する方法を知っておく必要があります。

:::

::: warning

**セキュリティ警告:** ElasticSearch の `2.0` から `2.14.1` までのバージョンには、 `log4j` ライブラリの [exploit](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2021-44228) の影響を受けています。影響を受ける場合は、ElasticSearch issue tracker の [temporary mitigation](https://github.com/elastic/elasticsearch/issues/81618#issuecomment-991000240) を参照してください。

:::

ElasticSearchを起動する。

```bash
systemctl daemon-reload
systemctl enable --now elasticsearch
```

### マストドンの構成

.env.production` を編集して、以下の変数を追加します。

```bash
ES_ENABLED=true
ES_HOST=localhost
ES_PORT=9200
```

同じマシンに複数のMastodonサーバがあり、全てのサーバで同じElasticSearchを使用する場合、インデックスを区別するために、全てのサーバの設定で `REDIS_NAMESPACE` がユニークであることを確認してください。ElasticSearchのインデックスのプレフィックスを上書きしたい場合は、`ES_PREFIX`を直接設定します。

新しい設定を保存した後、Mastodon プロセスを再起動すると、設定が有効になります。

```bash
systemctl restart mastodon-sidekiq
systemctl reload mastodon-web
```

さて、いよいよElasticSearchのインデックスを作成し、データを入れていきます。

```bash
su - mastodon
cd live
RAILS_ENV=production bin/tootctl search deploy
```

### 他言語での検索最適化

#### 中国語検索最適化

ElasticSearchのデフォルトの解析ツールは標準の解析ツールですが、特に中国語については最適とは言えないかもしれません。検索性能を向上させるには、言語固有の解析ツールをインストールすることができます。ElasticSearchでインデックスを作成する前に、以下のElasticSearchエクステンションをインストールしてください。

- [elasticsearch-analysis-ik](https://github.com/medcl/elasticsearch-analysis-ik)
- [elasticsearch-analysis-stconvert](https://github.com/medcl/elasticsearch-analysis-stconvert)

そして、Mastodonのインデックス定義を以下のように修正します。

```diff
diff --git a/app/chewy/accounts_index.rb b/app/chewy/accounts_index.rb
--- a/app/chewy/accounts_index.rb
+++ b/app/chewy/accounts_index.rb
@@ -4,7 +4,7 @@ class AccountsIndex < Chewy::Index
   settings index: { refresh_interval: '5m' }, analysis: {
     analyzer: {
       content: {
-        tokenizer: 'whitespace',
+        tokenizer: 'ik_max_word',
         filter: %w(lowercase asciifolding cjk_width),
       },

diff --git a/app/chewy/statuses_index.rb b/app/chewy/statuses_index.rb
--- a/app/chewy/statuses_index.rb
+++ b/app/chewy/statuses_index.rb
@@ -16,9 +16,17 @@ class StatusesIndex < Chewy::Index
         language: 'possessive_english',
       },
     },
+    char_filter: {
+      tsconvert: {
+        type: 'stconvert',
+        keep_both: false,
+        delimiter: '#',
+        convert_type: 't2s',
+      },
+    },
     analyzer: {
       content: {
-        tokenizer: 'uax_url_email',
+        tokenizer: 'ik_max_word',
         filter: %w(
           english_possessive_stemmer
           lowercase
@@ -27,6 +35,7 @@ class StatusesIndex < Chewy::Index
           english_stop
           english_stemmer
         ),
+        char_filter: %w(tsconvert),
       },
     },
   }
diff --git a/app/chewy/tags_index.rb b/app/chewy/tags_index.rb
--- a/app/chewy/tags_index.rb
+++ b/app/chewy/tags_index.rb
@@ -2,10 +2,19 @@

 class TagsIndex < Chewy::Index
   settings index: { refresh_interval: '15m' }, analysis: {
+    char_filter: {
+      tsconvert: {
+        type: 'stconvert',
+        keep_both: false,
+        delimiter: '#',
+        convert_type: 't2s',
+      },
+    },
     analyzer: {
       content: {
-        tokenizer: 'keyword',
+        tokenizer: 'ik_max_word',
         filter: %w(lowercase asciifolding cjk_width),
+        char_filter: %w(tsconvert),
       },

       edge_ngram: {
```


## 隠されたサービス

TORの隠しサービスでマストドンにサービスを提供。

MastodonはTorを通してonionサービスとして提供することができます。これにより、Torネットワークに接続している間だけ使用できる `*.onion` アドレスが与えられます。

### Torのインストール

まず、Tor の Debian アーカイブを apt に追加する必要があります。

```text
deb https://deb.torproject.org/torproject.org stretch main
deb-src https://deb.torproject.org/torproject.org stretch main
```

次にgpgキーを追加します。

```bash
curl https://deb.torproject.org/torproject.org/A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89.asc | gpg --import
gpg --export A3C4F0F979CAA22CDBA8F512EE8CBC9E886DDD89 | apt-key add -
```

最後に必要なパッケージをインストールします。

```bash
apt install tor deb.torproject.org-keyring
```

### Torの設定

etc/tor/torrc` にあるファイルを編集し、以下の設定を追加します。

```text
HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServiceVersion 3
HiddenServicePort 80 127.0.0.1:80
```

torを再起動します。

```bash
sudo service tor restart
```

tor のホスト名は `/var/lib/tor/hidden_service/hostname` にあることが確認できました。

### Mastodonの設定を移動する

NginxにMastodonのコンフィギュレーションを2回伝える必要があります。[DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)な状態を保つために、Mastodonの設定を独自のファイルに移動し、参照できるようにすることが必要です。

新しいファイルを `/etc/nginx/snippets/mastodon.conf` に作成します。このファイルには、`listen`, `server_name`, `include` と全ての SSL オプションを除いて、Mastodon の設定パラメータを全て入れてください。新しいファイルは以下のようなものになります。

```nginx
add_header Referrer-Policy "same-origin";

keepalive_timeout    70;
sendfile             on;
client_max_body_size 80m;

root /home/mastodon/live/public;

# …

error_page 500 501 502 503 504 /500.html;

access_log /var/log/nginx/mastodon_access.log;
error_log /var/log/nginx/mastodon_error.log warn;
```

古い Mastodon の設定の代わりに、この新しい設定ファイルに include ディレクティブを追加してください。

Nginxの設定ファイルは、以下のような形で残ります。

```nginx
server {
  listen 80;
  server_name mastodon.myhosting.com;
  return 301 https://$server_name$request_uri;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 443 ssl http2;
  list [::]:443 ssl http2;
  server_name mastodon.myhosting.com;
  include /etc/nginx/snippets/mastodon.conf;

  ssl_certificate /etc/letsencrypt/live/mastodon.myhosting.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mastodon.myhosting.com/privkey.pem;
}
```

### httpでTorを配信する

Mastodon の Tor 版を https で提供することは魅力的かもしれませんが、ほとんどの人にとって良いアイデアではありません。httpsの証明書がなぜ価値を持たないかについては、Tor Projectの[こちら](https://blog.torproject.org/facebook-hidden-services-and-https-certs)のブログポストを参照してください。オニオンドメインのSSL証明書は取得できないので、Mastodonインスタンスを使おうとすると、証明書エラーに悩まされることになります。Torの開発者は最近、Torサービスをhttpsで提供することがほとんどのユースケースで有益でない理由を明示しています[こちら](https://matt.traudt.xyz/posts/2017-12-02-dont-https-your-onions/)。

解決策は、Mastodonインスタンスをhttpで提供することですが、Torに対してのみです。これは、Nginxのコンフィギュレーションに追加のコンフィギュレーションを前置することで追加することができます。

```nginx
server {
  listen 80;
  server_name mastodon.qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7qKnFwnNH2oH4QhQ7CoRf7HYj8wCwpDwsa8ohJmcPG9JodMZvVA6psKq7.onion;
  include /etc/nginx/snippets/mastodon.conf;
}

server {
  listen 80;
  server_name mastodon.myhosting.com;
  return 301 https://$server_name$request_uri;
}

map $http_upgrade $connection_upgrade {
  default upgrade;
  ''      close;
}

server {
  listen 443 ssl http2;
  list [::]:443 ssl http2;
  server_name mastodon.myhosting.com;
  include /etc/nginx/snippets/mastodon.conf;

  ssl_certificate /etc/letsencrypt/live/mastodon.myhosting.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/mastodon.myhosting.com/privkey.pem;
}
```

ここで提供される長いハッシュを `/var/lib/tor/hidden_service/hostname` にあるファイルにあるあなたのTorドメインで置き換えてください。

onionのホスト名には "mastodon. "というプレフィックスが付いていることに注意してください。あなたのTorアドレスはワイルドカードドメインとして機能します。全てのサブドメインはルーティングされ、Nginxが任意のサブドメインに応答するように設定することができます。もしあなたのTorアドレスで他のサービスをホストしたくないのであれば、サブドメインを省略するか、別のサブドメインを選択することができます。

ここで、マストドンの設定を別のファイルに移動することの効果を確認することができます。このようにしないと、すべての設定を両方の場所にコピーしなければなりません。設定を変更する場合は、両方の場所で行わなければなりません。

Webサーバーを再起動する。

```bash
service nginx restart
```

### Gotchas

いくつか注意しなければならないことがあります。ある種のリダイレクトは、ユーザーをhttpsに押しやります。その場合、ユーザーは手動でURLをhttpに置き換えて続行する必要があります。

画像などの各種リソースは、Tor以外の通常のドメインで提供されたままとなります。これがどの程度問題になるかは、ユーザーの警戒心の程度に大きく依存します。

