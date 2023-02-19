# ソースからのインストール

マストドンを利用したウェブサイトを作成するための解説書です。

[[TOC]]

## 前提条件

* **Ubuntu 20.04**または**Debian 11**が動作しているマシンで、root権限を持っていること。
* Mastodon サーバーの **ドメイン名** (またはサブドメイン) 例: `example.com`.
* メール配信サービスなどの **SMTP サーバー** が必要です。

コマンドは root で実行することになります。root でない場合は、root に切り替えてください。`sudo su -`

### システムレポジトリ

curl, wget, gnupg, apt-transport-https, lsb-release, ca-certificates が先にインストールされていることを確認してください。

```bash
apt install -y curl wget gnupg apt-transport-https lsb-release ca-certificates
```

#### Node.js

```bash
curl -sL https://deb.nodesource.com/setup_16.x | bash -
```

#### PostgreSQL

```bash
wget -O /usr/share/keyrings/postgresql.asc https://www.postgresql.org/media/keys/ACCC4CF8.asc
echo "deb [signed-by=/usr/share/keyrings/postgresql.asc] http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/postgresql.list
```

### システムパッケージ

```bash
apt update
apt install -y \
  imagemagick ffmpeg libpq-dev libxml2-dev libxslt1-dev file git-core \
  g++ libprotobuf-dev protobuf-compiler pkg-config nodejs gcc autoconf \
  bison build-essential libssl-dev libyaml-dev libreadline6-dev \
  zlib1g-dev libncurses5-dev libffi-dev libgdbm-dev \
  nginx redis-server redis-tools postgresql postgresql-contrib \
  certbot python3-certbot-nginx libidn11-dev libicu-dev libjemalloc-dev
```

#### Yarn

```bash
corepack enable
yarn set version classic
```

### Rubyのインストール

Rubyのバージョン管理にはrbenvを使います。正しいバージョンを取得し、新しいリリースが出たらアップデートするのが簡単だからです。rbenvは単一のLinuxユーザに対してインストールする必要があるので、まずMastodonが動作するユーザを作成します。

```bash
adduser --disabled-login mastodon
```

その後、ユーザーに切り替わります。

```bash
su - mastodon
```

そして、rbenvとrbenv-buildのインストールに進みます。

```bash
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
cd ~/.rbenv && src/configure && make -C src
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec bash
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
```

これが終われば、正しいRubyのバージョンをインストールすることができます。

```bash
RUBY_CONFIGURE_OPTS=--with-jemalloc rbenv install 3.0.4
rbenv global 3.0.4
```

また、bundlerのインストールも必要です。

```bash
gem install bundler --no-document
```

ルートユーザーに戻る。

```bash
exit
```

## セットアップ

### PostgreSQLのセットアップ

#### パフォーマンス・コンフィギュレーション（オプション）

最適なパフォーマンスを得るためには、`systemctl restart postgresql`でPostgreSQLを再起動する前に、[pgTune](https://pgtune.leopard.in.ua/#/) で適切な設定を生成して `/etc/postgresql/15/main/postgresql.conf` に値を入れておくとよいでしょう。

#### ユーザーの作成

Mastodonが使用できるPostgreSQLユーザを作成する必要があります。つまり、PostgreSQLユーザは個別のパスワードを持たず、Linuxユーザが同じユーザ名で使用できるようにすることです。

プロンプトを開きます。

```bash
sudo -u postgres psql
```

プロンプトで、実行します。

```sql
CREATE USER mastodon CREATEDB;
\q
```

完了！

### マストドンのセットアップ

マストドンのコードをダウンロードする時が来ました。マストドン・ユーザーに切り替えてください。

```bash
su - mastodon
```

#### コードのチェックアウト

git を使って Mastodon の最新の安定版リリースをダウンロードしてください。

```bash
git clone https://github.com/mastodon/mastodon.git live && cd live
git checkout $(git tag -l | grep -v 'rc[0-9]*$' | sort -V | tail -n 1)
```

#### 最後の依存関係のインストール

次に、RubyとJavaScriptの依存関係をインストールします。

```bash
bundle config deployment 'true'
bundle config without 'development test'
bundle install -j$(getconf _NPROCESSORS_ONLN)
yarn install --pure-lockfile
```

::: info

2つの `bundle config` コマンドが必要なのは、依存関係をインストールする最初のときだけです。もし、後で依存関係を更新したり、再インストールしたりするのであれば、 `bundle install` だけで十分でしょう。

:::

#### コンフィギュレーションを生成する

対話型セットアップウィザードを実行します。

```bash
RAILS_ENV=production bundle exec rake mastodon:setup
```

これなら

* 設定ファイルの作成
* アセット・プリコンパイルの実行
* データベーススキーマの作成

設定ファイルは `.env.production` という名前で保存されます。それを見て、お好みで編集することができます。設定に関するドキュメントを参照してください。

mastodonユーザは一旦終了し、rootに戻ります。

```bash
exit
```

### nginxのセットアップ

Mastodon ディレクトリから nginx 用の設定テンプレートをコピーします。

```bash
cp /home/mastodon/live/dist/nginx.conf /etc/nginx/sites-available/mastodon
ln -s /etc/nginx/sites-available/mastodon /etc/nginx/sites-enabled/mastodon
```

次に、`/etc/nginx/sites-available/mastodon` を編集して `example.com` を自分のドメイン名に置き換え、その他必要な調整をします。

変更を有効にするために、nginx をリロードします。


```bash
systemctl reload nginx
```

### SSL証明書の取得

Let's Encryptを使って、無料のSSL証明書を取得することにします。

```bash
certbot --nginx -d example.com
```

これは証明書を取得し、新しい証明書を使用するために `/etc/nginx/sites-available/mastodon` を自動的に更新し、変更を有効にするために nginx を再読み込みします。

この時点で、ブラウザで自分のドメインにアクセスして、elephant hitting the computer screenのエラーページを見ることができるはずです。これは、まだ Mastodon プロセスを開始していないためです。

### systemd サービスのセットアップ

Mastodon ディレクトリから systemd サービス・テンプレートをコピーします。

```sh
cp /home/mastodon/live/dist/mastodon-*.service /etc/systemd/system/
```

デフォルトから外れた箇所があれば、ユーザー名とパスが正しいかどうか確認してください。

```sh
$EDITOR /etc/systemd/system/mastodon-*.service
```

最後に、新しい systemd サービスを起動し、有効化します。

```sh
systemctl daemon-reload
systemctl enable --now mastodon-web mastodon-sidekiq mastodon-streaming
```

これで、起動時に自動的に起動するようになります。

::: tip

**ばんざーい! これだよこれ。これで、ブラウザで自分のドメインにアクセスできるようになりました**

:::