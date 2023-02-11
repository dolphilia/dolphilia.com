# コンテンツ参照

コンテンツ参照（conref）は、他のファイルや書籍からコンテンツを再利用するのに便利な仕組みです。

### ローカルファイルの取り込み

他のファイルの内容を取り込むには`include`タグを使うと簡単です。

```
{% include "./test.md" %}
```

### 他の本からファイルを取り込む

HonKitはgitを使用してインクルードパスを解決することもできます。

```
{% include "git+https://github.com/GitbookIO/documentation.git/README.md#0.0.1" %}
```

git urlのフォーマットは以下の通りです。

```
git+https://user@hostname/owner/project.git/file#commit-ish
```

実際のgitのurl部分は `.git` で終わっている必要があり、インポートするファイル名は `.git` の後にurlの断片まで抽出されます。

commit-ish` には、 `git checkout` の引数として与えられるタグ、sha、ブランチを指定することができます。デフォルトは `master` です。

### 継承

テンプレート継承は、テンプレートの再利用を容易にするための方法です。テンプレートを書くときに、子テンプレートがオーバーライドできる"block"を定義することができます。継承の連鎖は好きなだけ長くすることができます。

`block`はテンプレートのセクションを定義し、名前を付けて識別します。ベーステンプレートはブロックを指定することができ、子テンプレートは新しいコンテンツでブロックをオーバーライドすることができます。

```
{% extends "./mypage.md" %}

{% block pageContent %}
# これは私のページのコンテンツです。
{% endblock %}
```

ファイル`mypage.md` では拡張可能なブロックを指定する必要があります。

```
{% block pageContent %}
これはデフォルトのコンテンツです
{% endblock %}

# ライセンス

{% include "./LICENSE" %}
```
