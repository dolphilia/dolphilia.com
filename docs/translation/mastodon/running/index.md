# マシンを準備する

新しいマシンをセットアップする場合は、最初にセキュアにしておくことをお勧めします。**Ubuntu 20.04**を使用していると仮定した場合。

[[TOC]]

## パスワードによるSSHログインを許可しない(鍵のみ)

まず、パスワードではなく鍵を使って実際にサーバにログインしていることを確認してください。そうしないと、ロックアウトされてしまいます。多くのホスティングプロバイダーは公開鍵のアップロードをサポートしており、新しいマシンに鍵ベースのルートログインを自動的にセットアップしてくれます。

`etc/ssh/sshd_config` を編集して、`PasswordAuthentication` を見つけます。コメントアウトが解除され、`no` に設定されていることを確認します。もし、変更したのであれば、sshd を再起動します。

```bash
systemctl restart ssh.service
```

## システムパッケージのアップデート

```bash
apt update && apt upgrade -y
```

## fail2banをインストールし、繰り返し行われるログイン試行をブロックする。

まず、fail2banをインストールします。

```bash
apt install fail2ban
```

`etc/fail2ban/jail.local` を編集し、以下を記述します。

```text
[DEFAULT]
destemail = your@email.here
sendername = Fail2Ban

[sshd]
enabled = true
port = 22

[sshd-ddos]
enabled = true
port = 22
```

最後にfail2banを再起動します。

```bash
systemctl restart fail2ban
```

## ファイアウォールを設置し、SSH, HTTP, HTTPSのポートだけを許可する

まず、iptables-persistentをインストールします。インストール時に、現在のルールを維持するかどうか尋ねられますが、拒否してください。

```bash
apt install -y iptables-persistent
```

`etc/iptables/rules.v4` を編集し、以下を記述します。

```text
*filter

#  ループバック（lo0）のトラフィックをすべて許可し、lo0を使用しない127/8へのトラフィックをすべてドロップする。
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d 127.0.0.0/8 -j REJECT

#  確立されたすべてのインバウンドコネクションを受け入れる
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#  すべてのアウトバウンドトラフィックを許可する - 特定のトラフィックのみを許可するように変更することができます。
-A OUTPUT -j ACCEPT

#  どこからでもHTTPとHTTPSの接続を許可する（WebサイトとSSL用の通常のポート）。
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT

#  SSH接続を許可する
#  dport番号は、sshd_configで設定したポート番号と同じにする必要があります。
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  Pingを許可する
-A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT

# 宛先不明メッセージを許可する。特にコード4（断片化が必要）が必要、またはPMTUDが壊れる。
-A INPUT -p icmp -m icmp --icmp-type 3 -j ACCEPT

#  iptablesの拒否された呼び出しのログ
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  その他の受信をすべて拒否する - 明示的に許可されたポリシー以外はデフォルトで拒否する
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

iptables-persistentでは、その設定は起動時にロードされます。しかし、今はリブートしていないので、初めて手動でロードする必要があります。

```bash
iptables-restore < /etc/iptables/rules.v4
```

IPv6でも到達可能な場合は、`/etc/iptables/rules.v6`を編集して、その中にこれを追加してください。

```text
*filter

#  ループバック（lo0）のトラフィックをすべて許可し、lo0を使用しない127/8へのトラフィックをすべてドロップする。
-A INPUT -i lo -j ACCEPT
-A INPUT ! -i lo -d ::1/128 -j REJECT

#  確立されたすべてのインバウンドコネクションを受け入れる
-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

#  すべてのアウトバウンドトラフィックを許可する - 特定のトラフィックのみを許可するように変更することができます。
-A OUTPUT -j ACCEPT

#  どこからでもHTTPとHTTPSの接続を許可する（WebサイトとSSL用の通常のポート）。
-A INPUT -p tcp --dport 80 -j ACCEPT
-A INPUT -p tcp --dport 443 -j ACCEPT

#  SSH接続を許可する
#  dport番号は、sshd_configで設定したポート番号と同じである必要があります。
-A INPUT -p tcp -m state --state NEW --dport 22 -j ACCEPT

#  Pingを許可する
-A INPUT -p icmpv6 -j ACCEPT

#  iptablesの拒否された呼び出しのログ
-A INPUT -m limit --limit 5/min -j LOG --log-prefix "iptables denied: " --log-level 7

#  その他の受信をすべて拒否する - 明示的に許可されたポリシー以外はデフォルトで拒否する
-A INPUT -j REJECT
-A FORWARD -j REJECT

COMMIT
```

IPv4ルールと同様に、以下のように手動で読み込むことができます。

```bash
ip6tables-restore < /etc/iptables/rules.v6
```
