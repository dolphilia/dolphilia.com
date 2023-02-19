# admin CLIを使用する

CLIから実行可能なtootctlコマンド。

Mastodon のコマンドラインインターフェースは、Mastodon のルートディレクトリの `bin` ディレクトリにある `tootctl` という実行ファイルである。このファイルを実行する際には、環境変数 `RAILS_ENV` を指定して、どの環境を使用するかを指定しなければなりません。ローカルマシンで作業している開発者でない限り、`RAILS_ENV=production`を使用する必要があります。もし、他の環境(開発、テスト、ステージングなど)が絶対に必要でないと確信がある場合は、便宜上 `.bashrc` ファイルに追加することもできます。

```bash
echo "export RAILS_ENV=production" >> ~/.bashrc
```

もしそうであれば、インラインで毎回指定する必要はありません。そうでなければ、Mastodonのコードが `/home/mastodon/live` にチェックアウトされていると仮定して、 `tootctl` の呼び出しは通常このようになります。

```bash
cd /home/mastodon/live
RAILS_ENV=production bin/tootctl help
```

[[TOC]]

## ベースCLI

### `tootctl self-destruct`

このサーバーをフェデレーションから削除するには、他のすべての既知のサーバーにアカウント削除のアクティビティをブロードキャストします。これにより、他のサーバーにキャッシュを残さず、Mastodonサーバーの運営から「きれいに去る」ことができる。このコマンドは常に対話式で、2回の確認が必要である。

データベースを空にするか、VPS 全体を削除する方が速いため、実際にはローカルデータは削除されません。このコマンドを実行した後にインスタンスの運用を続けると、状態の不一致が発生し、フェデレーションに不具合や問題が発生する可能性があります。

::: warning

**このコマンドを実行する前に、自分が何をしているのかを正確に把握しておいてください。**このコマンドを実行した後、サーバーは BROKEN 状態になります。実行中のSidekiqプロセスが必要ですので、キューが完全にクリアされるまで、サーバーをシャットダウンしないでください。

:::

- `--dry-run`:何も実行せず、期待される結果のみを表示する。

**Version history:** 2.8.0 - added


### `tootctl --version`

現在動作している Mastodon インスタンスのバージョンを表示します。

**Version history:** 2.7.0 - added


## アカウントCLI


### `tootctl accounts rotate`

セキュリティメンテナンスの一環として、新しいRSA鍵を生成し、ブロードキャストします。

- `USERNAME`:アカウントのローカルユーザー名。
- `--all`:USERNAME` の代わりに指定することで、すべてのローカルアカウントの鍵をローテーションさせることができる。

**Version history:** 2.5.0 - added


### `tootctl accounts create`

与えられた `USERNAME` と与えられた `--email` で新しいユーザーアカウントを作成します。

- `USERNAME`: 新しいアカウントのローカルユーザー名
- `--email EMAIL`: ユーザーに付与するメールアドレス
- `--confirmed`: 確認メールの送信をスキップして、すぐにアカウントを有効にします。
- `--role ROLE`: 新しいアカウントのカスタムロールを定義するために、ロールの `name` を指定します。デフォルトのロールは `Owner`, `Admin`, `Moderator` (大文字と小文字を区別する)です。
- `--reattach`: アカウントが削除された後に、古いUSERNAMEを再利用する。
- `--force`: この `USERNAME` を持つ既存のアカウントを強制的に削除し、新しいアカウントを (削除されたばかりの) アカウントの代わりに再アタッチします。
- `--skip-sign-in-token`: 強制的に、ユーザーに電子メールでのセキュリティコードの入力を求めないようにします。

**Version history:** 2.6.0 - added, 4.0.0 - `--role` は、ハードコードされた `user`, `moderator`, `admin` ロールを受け付けないようになりました。代わりにカスタムロールの名前を指定します (大文字と小文字は区別されます)。


### `tootctl accounts modify`

ユーザーアカウントのロール、電子メール、アクティブなステータス、承認モード、または2FAの要件を変更することができます。

- `USERNAME`: アカウントのローカルユーザー名
- `--role ROLE`: 既存のアカウントのカスタムロールを定義するために、ロールの `name` を指定する。デフォルトのロールは `Owner`, `Admin`, `Moderator` (大文字と小文字を区別する) である。
- `--remove-role`: 現在のロールをユーザーから削除します。
- `--email EMAIL`: ユーザーのメールアドレスを `EMAIL` に更新します。
- `--confirm`: 確認メールをスキップします。`--email` と一緒に使用した場合。
- `--disable`: `USERNAME`をアカウントからロックする。
- `--enable`: `USERNAME` のアカウントが無効になっている場合、ロックを解除する。
- `--approve`: 承認モードになっている場合、`USERNAME`のアカウントを承認する。
- `--disable-2fa`: 追加要素を削除し、パスワードでのログインを許可します。
- `--reset-password`: 指定されたアカウントのパスワードをリセットする。
- `--skip-sign-in-token`: ユーザーに電子メールでのセキュリティコードの入力を求めないように強制します。

**Version history:**

- 2.6.0 - added
- 3.1.2 - added `--reset-password`
- 4.0.0 - `--role` は、ハードコードされた `user`, `moderator`, `admin` ロールを受け付けないようになりました。代わりにカスタムロールの名前を指定します (大文字と小文字は区別されます)。現在のロールを削除するには、 `--remove-role` を使用します。

### `tootctl accounts delete`

指定されたUSERNAMEを持つユーザーアカウントを削除します。

- USERNAME`:新しいアカウントのローカルユーザ名。

**Version history:** 2.6.0 - added


### `tootctl accounts backup`

指定されたUSERNAMEを持つユーザーアカウントのバックアップを要求します。バックアップは非同期でSidekiqに作成され、完了するとそのリンクを含むメールがユーザーに送信されます。

- USERNAME`: 新しいアカウントのローカルユーザー名。

**Version history:** 2.6.0 - added


### `tootctl accounts cull`

存在しなくなったリモートアカウントを削除します。データベース内のすべてのリモートアカウントを照会して、それがオリジンサーバーにまだ存在するかどうかを判断し、存在しない場合はデータベースから削除します。サーバーがダウンしている場合に備えて、過去1週間以内に確認されたアクティビティがあるアカウントはチェックから除外されます。

- `domain[...]`: を指定します。オプションで、カリングするドメインを指定することができます。
- `--concurrency N`: このタスクで使用するワーカーの数です。デフォルトは N=5 です。
- `--dry-run`: アクションを実行せず、期待される結果のみを表示します。

**Version history:**

- 2.6.0 - added
- 2.8.0 - add `--dry-run`
- 3.5.0 - 特定のドメインを渡す機能を追加

### `tootctl accounts refresh`

1つまたは複数のアカウントのリモートユーザーのデータおよびファイルを再取得します。

- `USERNAME`: リモートアカウントのユーザー名@ドメイン。
- `--all`: すべてのリモートアカウントをリフレッシュするために `USERNAME` の代わりに指定することができます。
- `--domain DOMAIN`: `USERNAME` の代わりに指定することができます。この `DOMAIN` からのリモートアカウントに対してのみ動作する。
- `--concurrency N`: このタスクで使用するワーカーの数。デフォルトは N=5 です。
- `--verbose`: タスクの処理中に追加情報を表示する。
- `--dry-run`: アクションを実行せず、期待される結果のみを表示します。

**Version history:** 2.6.0 - added


### `tootctl accounts merge`

2つのリモートアカウントを1つに統合します。これは主に、他のサーバーがドメインを変更したことによる重複を修正するためのものです。デフォルトでは、公開鍵が同じ場合にのみ動作しますが、これは上書きすることができます。

- `FROM`: 削除するリモートアカウントのユーザー名@ドメイン。
- `TO`: 保持するリモートアカウントのユーザー名@ドメイン。
- `--force`:公開鍵のチェックを無効にします。

**Version history:** 3.3.0 - added


### `tootctl accounts follow`

usernameで指定されたローカルアカウントに、すべてのローカルアカウントを強制的に従わせる。

- `USERNAME`: ローカルでのユーザー名
- `--concurrency N`: このタスクで使用するワーカーの数。デフォルトは N=5 です。
- `--verbose`: タスクの処理中に追加情報を表示する。タスクの処理中に追加情報を表示する。

**Version history:**

- 2.7.0 - added
- 3.0.0 - `ACCT` の代わりに `USERNAME` を使用するようになりました。


### `tootctl accounts unfollow`

すべてのローカルアカウントに、アドレスで指定されたアカウントのフォローを強制的に解除させる。

- `ACCT`: `username@domain` アドレスです。
- `--concurrency N`:このタスクで使用するワーカーの数。デフォルトは N=5 です。
- `--verbose`: タスクの処理中に追加情報を表示する。タスクの処理中に追加情報を表示する。

**Version history:** 2.7.0 - added


### `tootctl accounts reset-relationships`

ローカルアカウントのフォローやフォロワーの関係をすべてリセットする。

- `USERNAME`: ローカルでのユーザー名
- `--follows`: `USERNAME` を強制的に全員をアンフォローし、その後再フォローする。
- `--followers`: `USERNAME` のフォロワーを全て削除する。

**Version history:** 2.8.0 - added


### `tootctl accounts approve`

インスタンスが承認モードのときに新規登録を承認する。

- `USERNAME`: ローカルでのユーザー名
- `--number N`: 直近のN件の登録を承認します。
- `--all`: 保留中の登録をすべて承認します。

**Version history:** 2.8.0 - added


## キャッシュCLI

### `tootctl cache clear`

キャッシュストレージをクリアする。

**Version history:** 2.8.1 - added

### `tootctl cache recount`

参照されたレコードを一から数えて、TYPEのハードキャッシュされたカウンターを更新する。データベースのサイズによっては、完了までに非常に長い時間がかかる場合があります。アカウントは、フォロワー、フォロー、ステータスのカウントが更新されます。ステータスは、返信数、ブースト数、お気に入り数が更新されます。

- `TYPE`: `accounts` または `statuses` を指定する
- `--concurrency N`: このタスクに使用するワーカーの数。デフォルトは N=5 です。
- `--verbose`: タスクの処理中に追加情報を印刷する。

**Version history:** 3.0.0 - added

## ドメイン CLI

### `tootctl domains purge`

与えられたドメインから、記録を残さずにすべてのアカウントを削除します。停止とは異なり、DOMAINがまだ野放しにされている場合、再び解決されればアカウントは復活する可能性があるということです。

- `DOMAIN[...]`: パージするドメイン。スペースで区切られる。
- `--by-uri`: Webfingerのアドレスではなく、アクターのURIに含まれるドメインに一致させる。
- `--limited-federation-mode`: DOMAINの代わりに提供することができます。単一のドメインからパージする代わりに、許可リストにないドメインからのすべてのアカウントをデータベースから削除します。制限付きフェデレーションモードを有効にし、許可リストを定義した後に、これを使用します。
- `--concurrency N`: このタスクに使用するワーカーの数。デフォルトは5です。
- `--verbose`: タスクの処理中に追加情報を印刷する。
- `--dry-run`: Print expected results only, without performing any actions.

**Version history:**

- 2.6.0 - added
- 2.8.0 - add `--whitelist-mode`
- 2.9.0 - remove custom emoji as well
- 3.0.0 - accept multiple domains
- 3.2.0 - rename `--whitelist-mode` to `--limited-federation-mode`
- 3.5.0 - add `--by-uri`


### `tootctl domains crawl`

すべての既知のピアを公開するMastodon REST APIエンドポイントを使用して既知のフェディバースをクロールし、それらのピアから統計を収集します（それらのピアがそれらのAPIエンドポイントをサポートする限りにおいて）。START が与えられていない場合、コマンドは、クロールの種となる既知のピアのサーバー自身のデータベースを使用します。総サーバー数、総登録ユーザー数、先週の総アクティブユーザー数、および先週の総参加ユーザー数を返します。

- `START`: オプションで、別のドメイン名から開始することもできます。
- `--exclude-suspended`: 出力には、停止したインスタンスは含めないでください。また、サブドメインも含まれます。
- `--concurrency N`: このタスクに使用するワーカーの数。デフォルトは N=50 です。
- `--format FORMAT`: 結果をどのように返すかを制御する。`summary` はサマリーを表示する。`domain` は、発見されたすべてのピアのリストを改行で区切って返します。`json` は、集約された生データをダンプします。デフォルトは `summary` である。

**Version history:**

- 2.7.0 - added
- 3.0.0 - add `--exclude-suspended`

## メールドメインブロック CLI

### `tootctl email-domain-blocks list`

現在ブロックされているメールドメインをすべてリストアップします。

**Version history:** 3.2.0 - added

### `tootctl email-domain-blocks add`

メールドメインブロックリストにエントリーを追加する。

- `DOMAIN[...]`: ブロックする電子メールドメイン。スペースで区切ってください。
- `--with-dns-records`: 提供された場合、A、AAAA、MXレコードも検索し、同様にブロックします。

**Version history:** 3.2.0 - added

### `tootctl email-domain-blocks remove`

電子メールドメインブロックリストのエントリーを削除する。

- `DOMAIN[...]`: ブロックを解除する電子メールドメイン。スペースで区切ってください。

**Version history:** 3.2.0 - added

## 絵文字 CLI

### `tootctl emoji export`

PATHにある `export.tar.gz` にカスタム絵文字をエクスポートします。

- `PATH`: 画像を含む.tar.gzアーカイブを作成するためのパス。
- `--overwrite`: PATH` にある既存のアーカイブを上書きする。
- `--category CATEGORY`: 指定された `CATEGORY` のみをエクスポートする。指定しない場合は、すべての絵文字をエクスポートする。

**Version history:** 3.1.4 - added


### `tootctl emoji import`

指定されたパスにある .tar.gz アーカイブからカスタム絵文字を読み込みます。アーカイブには 50KB 以下の PNG または GIF ファイルが含まれている必要があり、ショートコードはファイル名から拡張子を除いたものになります。

- `PATH`: 画像を含む .tar.gz アーカイブを作成するためのパス。
- `--prefix PREFIX`: 生成されたショートコードの先頭にPREFIXを追加。
- `--suffix SUFFIX`: 生成されたショートコードの末尾にSUFFIXを追加。
- `--overwrite`: 既存の絵文字をスキップする代わりに、同じショートコードで発見された絵文字に置き換えます。
- `--category CATEGORY`: ピッカーのCATEGORYの下に加工した絵文字をグループ化します。
- `--unlisted`: 処理された絵文字は、絵文字ピッカーには表示されず、その直接のショートコードでのみ使用できるようになります。

**Version history:** 2.5.0 - added

### `tootctl emoji purge`

カスタム絵文字をすべて削除します。

- `--remote-only`: 提供された場合、リモートドメインからのみ削除する。

**Version history:**

- 2.8.0 - added
- 3.1.0 - add `--remote-only`


## フィード CLI

### `tootctl feeds build`

1人または全ユーザーのホームフィードとリストフィードを構築します。フィードはデータベースから構築され、Redisを使ってインメモリキャッシュされます。Mastodon は、アクティブなユーザーのホームフィードを自動的に管理します。

- `USERNAME`: フィードを再生成するローカルユーザ名。
- `--all`: すべてのリモートアカウントをリフレッシュするために、 `USERNAME` の代わりに指定することができる。
- `--concurrency N`: このタスクに使用するワーカーの数。デフォルトは N=5 です。
- `--verbose`: タスクの処理中に追加情報を印刷する。
- `--dry-run`: 何も実行せず、期待される結果のみを印刷する。

**Version history:** 2.6.0 - added

### `tootctl feeds clear`

Redisからホームとリストのフィードをすべて削除します。

**Version history:** 2.6.0 - added

## メンテナンス CLI

### `tootctl maintenance fix-duplicates`

照合順序規則の変更に起因するデータベースインデックスの破損を修正します。重複するアカウント、ステータス、絵文字などを削除またはマージします。このタスクを実行するには、Mastodon を停止する必要があり、長時間を要し、破壊的となる可能性があります。https://wiki.postgresql.org/wiki/Locale_data_changes のような問題でデータベースのインデックスが破損している場合に有効です。

**Version history:** 3.3.0 - added

## メディア CLI

### `tootctl media remove`

他のサーバーから添付されたメディアのローカルキャッシュコピーを削除します。

- `--days N`: メディアの添付ファイルが削除されるまでの時間。デフォルトは7です。
- `--concurrency N`: このタスクに使用するワーカーの数。デフォルトは N=5 です。
- `--verbose`: タスクの処理中に追加情報を印刷する。
- `--dry-run`: 何も実行せず、期待される結果のみを印刷する。

**Version history:**

- 2.5.0 - added
- 2.6.2 - show freed disk space

### `tootctl media remove-orphans`

既存のメディア添付に属さないファイルをスキャンし、削除します。ストレージプロバイダーによっては、オブジェクトを一覧表示するために必要なAPIリクエストに課金される場合があることに注意してください。また、この操作では、すべてのファイルを個別に反復処理する必要があるため、処理速度が低下します。

- `--start-after`: ループを開始するPaperclipアタッチメントキー。このオプションは、コマンドが途中で中断された場合に使用します。
- `--dry-run`: 何も実行せず、期待される結果のみを表示します。
- `--prefix`: システム内の特定の接頭辞のファイルのみをトラバースします。
- `--fix-permissions`: S3 ACL を環境変数に応じたデフォルトに設定する。

**Version history:**

- 3.1.0 - added
- 3.1.3 - added `--prefix`
- 3.3.0 - added `--fix-permissions`


### `tootctl media refresh` 

他のサーバからリモートのメディア添付ファイルを再取得する。メディアの添付ファイルの取得元を、 `--status`, `--account`, または `--domain` のいずれかで指定する必要があります。添付ファイルがすでにデータベースに存在している場合、 `--force` を使用しない限り上書きされることはない。

- `--account ACCT`: アカウントの文字列 `username@domain` ハンドル
- `--domain DOMAIN`: FQDN文字列
- `--status ID`: データベース内のステータスのローカル数値ID。
- `--concurrency N`: このタスクに使用するワーカーの数。デフォルトは5です。
- `--verbose`: タスクの処理中に追加情報を印刷する。
- `--dry-run`: 何も実行せず、期待される結果のみを印刷する。
- `--force`: リモートリソースを強制的に再ダウンロードし、ローカルの添付ファイルを上書きします。

**Version history:**

- 3.0.0 - added
- 3.0.1 - add `--force` and skip already downloaded attachments by default

### `tootctl media usage`

Mastodonが消費するディスク容量を計算します。

**Version history:** 3.0.1 - added

### `tootctl media lookup`

メディアのURLを要求し、そのメディアが表示されているステータスを検索します。

**Version history:** 3.1.0 - added

## プレビューカード CLI

### `tootctl preview_cards remove`

プレビューカードのローカルサムネイルを削除しました。

- `--days N`: メディアの添付ファイルが削除されるまでの時間。デフォルトは180です。(注意: プレビューカードを過去14日以内に削除することはお勧めしません。プレビューカードは、前回から2週間後にリンクが再投稿されない限り、リフェッチされないからです)。
- `--concurrency N`: このタスクに使用するワーカーの数。デフォルトは N=5 です。
- `--verbose`: タスクの処理中に追加情報を印刷する。
- `--dry-run`: 何も実行せず、期待される結果のみを印刷する。
- `--link`: リンクタイプのプレビューカードのみを削除し、ビデオカードとフォトカードはそのまま残す。

**Version history:** 3.0.0 - added

## 検索CLI

### `tootctl search deploy`

ElasticSearchのインデックスを作成または更新し、そのインデックスにデータを取り込みます。ElasticSearchが空の場合、このコマンドは必要なインデックスを作成し、データベースからそれらのインデックスにデータをインポートします。このコマンドは、前回の実行以降に基礎となるスキーマが変更された場合、インデックスのアップグレードも行います。

- `--batch-size`: デフォルトは1000です。バッチサイズを小さくすることで、ElasticSearchのレコード処理をより高速に行うことができます。
- `--only INDEX`: インデックス名 [`accounts`, `tags`, `statuses`] を指定すると、そのインデックスのみを作成または更新することができます。
- `--concurrency N`: コマンドの実行を複数のスレッドで並列化する。デフォルトは N=2 です。

**Version history:**

- 2.8.0 - added
- 3.0.0 - add `--processes` for parallelization
- 3.3.0 - options changed
- 3.5.0 - add `--batch-size`

## 設定CLI

### `tootctl settings registrations open`

登録受付を開始します。

**Version history:** 2.6.0 - added

### `tootctl settings registrations close`

登録を終了する。

**Version history:** 2.6.0 - added

### `tootctl settings registrations approved`

登録を承認を必要とするように設定する。

**Version history:** 3.5.2 - added

`--require_reason`: trueの場合、ユーザーは登録時に理由を入力する必要があります。

## ステータスCLI

### `tootctl statuses remove`

リレーから来たステータスや、もはやどのローカルアカウントからもフォローされていないユーザーからのステータスなど、参照されていないステータスをデータベースから削除し、返信やその他のインタラクションが行われていないものを削除します。

これは、開始前に余分なデータベースインデックスを作成し、終了後にそれらを削除する、計算負荷の高い手続きである。

- `--days N`: ステータスが削除されるまでの時間。デフォルトは90です。
- `--skip-media-remove`: S3がエラーになった場合に、メディアの削除をスキップする。デフォルトはfalseです。

**Version history:**

- 2.8.0 - added
- 3.1.3 - added `--skip-media-remove`
- 3.5.0 - now removes orphaned records and performs additional cleanup tasks

## アップグレードCLI

### `tootctl upgrade storage-schema`

ストレージスキーマをアップグレードして、すべての非ローカルメディアリソースをトップレベルのキャッシュディレクトリに格納します。警告：これはオプションであり、v3.1.4より前のデプロイメントにのみ適用されます。このコマンドは、何テラバイトものデータを移動するため、オブジェクトストレージのコストが膨大になる可能性があります。

- `--verbose`: タスクの処理中に追加情報を印刷する。
- `--dry-run`: 何も実行せず、期待される結果のみを印刷する。

**Version history:** 3.1.4 - added