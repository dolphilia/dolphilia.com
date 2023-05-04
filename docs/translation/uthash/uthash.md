# uthash ユーザーガイド

- Troy D. Hanson, Arthur O'Dwyer
- version 2.3.0, February 2021

uthashをダウンロードするには、このリンクをたどってGitHubのプロジェクトページに戻ってください。私の他のプロジェクトに戻る。

[[TOC]]

## Cのハッシュ

この文書はC言語プログラマー向けに書かれています。これを読んでいるあなたは、ハッシュがキーで項目を検索するために使われることを知っている可能性があります。スクリプト言語では、ハッシュや「辞書」は常に使用されています。C言語では、ハッシュは言語自体に存在しません。本ソフトウェアは、C言語の構造体に対してハッシュテーブルを提供します。

### どんなことができるのでしょうか？

本ソフトウェアは、ハッシュテーブル内の項目に対する以下の操作をサポートしています。:

1. add/replace
2. find
3. delete
4. count
5. iterate
6. sort

### 速いですか？

追加、検索、削除は通常、一定時間の操作です。これは、キードメインとハッシュ関数に影響されます。

このハッシュは、ミニマムで効率的なハッシュを目指しています。マクロで実装されているため、自動的にインライン化されます。ハッシュ関数がキーに適している限りは高速です。デフォルトのハッシュ関数を使うこともできますし、他のいくつかの組み込みハッシュ関数の中から性能を簡単に比較して選ぶこともできます。

### ライブラリなのでしょうか？

いいえ、uthash.hという1つのヘッダーファイルだけです。このヘッダーファイルをあなたのプロジェクトにコピーするだけです：

```c
#include "uthash.h"
```

uthashはヘッダーファイルのみなので、リンクするためのライブラリコードは存在しません。

### C/C++とプラットフォーム

本ソフトウェアは、CおよびC++プログラムで使用することができます。でテスト済みです。:

- Linux
- Windows using Visual Studio 2008 and 2010
- Solaris
- OpenBSD
- FreeBSD
- Android

#### Test suite

テストスイートを実行するには、testsディレクトリに入ります。そして

- Unixプラットフォームでは、makeを実行してください。
- Windowsの場合は、「do_tests_win32.cmd」バッチファイルを実行します。(Visual Studioが標準的でない場所にインストールされている場合は、バッチファイルを編集することができます)。

### BSDライセンス

本ソフトウェアは、改訂版BSDライセンスで提供されています。フリーでオープンソースです。

### uthashのダウンロード

https://github.com/troydhanson/uthash のリンクに従って、uthash をクローンするか、ZIP ファイルを入手してください。

### ヘルプを受ける

ご質問は、uthash Google Groupをご利用ください。uthash@googlegroups.com にメールしてください。

### 貢献度

GitHubを通じてプルリクエストを提出することができます。しかし、uthashのメンテナンス担当者は、ベルやホイッスルを追加するのではなく、uthashを変更しないことを大切にしています。

### エクストラを含む

uthashには3つの「エクストラ」が付属しています。これらはリスト、動的配列、文字列を提供します。:

- utlist.h は、C 言語の構造体に対するリンクリストマクロを提供します。
- utarray.hはマクロを使った動的配列の実装です。
- utstring.hは、基本的な動的文字列を実装しています。

### 沿革

私は2004年から2006年にかけて、私自身の目的のためにuthashを書きました。もともとはSourceForgeでホストされていました。uthashは2006年から2013年の間に約30,000回ダウンロードされ、その後GitHubに移行しました。商用ソフトウェア、学術研究、そして他のオープンソースソフトウェアに組み込まれました。また、多くのUnix系ディストロのネイティブパッケージリポジトリに追加されました。

uthashが書かれた当時は、C言語で汎用的なハッシュテーブルを作成するためのオプションは、現在よりも少なかったです。より高速なハッシュテーブル、よりメモリ効率の良いハッシュテーブル、そして全く異なるAPIが存在するのが現状です。しかし、ミニバンを運転するように、uthashは便利で、多くの用途で仕事をこなすことができます。

2016年7月現在、uthashはArthur O'Dwyerによってメンテナンスされています。

## あなたの構造

uthashでは、ハッシュテーブルは構造体で構成されています。各構造体は、キーと値の関連性を表す。構造体の1つ以上のフィールドがキーを構成する。構造体のポインタそのものが値である。

ハッシュ化可能な構造を定義する:

```c
#include "uthash.h"

struct my_struct {
    int id;                    /* キー */
    char name[10];
    UT_hash_handle hh;         /* この構造体をハッシャブルにする */
};
```

uthashでは、ハッシュテーブルに構造体を追加しても、構造体が別の場所に移動したりコピーされたりすることはない。つまり、ハッシュテーブルに構造体を追加したり削除したりしても、その構造体を安全に指す他のデータ構造を保持することができるのです。

### キーとなる

キーフィールドのデータ型や名称は特に制限されない。また、キーは、任意の名称とデータ型を持つ、連続した複数のフィールドで構成することができる。

::: info
どんなデータ型でも...本当に？

はい、キーと構造体はどのようなデータ型でもかまいません。プロトタイプが固定された関数呼び出しとは異なり、uthashはマクロで構成され、その引数は型付けされていませんので、どんなタイプの構造体やキーでも扱うことができます。
:::

#### ユニークなキー

どのハッシュでもそうですが、すべての項目は一意のキーを持たなければなりません。アプリケーションはキーの一意性を強制しなければなりません。ハッシュテーブルに項目を追加する前に、まずそのキーがすでに使用されていないことを確認する必要があります（疑問があれば、確認してください！）。ハッシュテーブルにキーが既に存在するかどうかは、HASH_FINDを使って確認することができます。

### ハッシュハンドル

UT_hash_handleフィールドは、構造体の中に存在しなければなりません。これは、ハッシュを機能させるための内部帳簿に使用されます。初期化は必要ありません。このフィールドにはどんな名前でもつけられますが、hhという名前をつけることで問題を単純化することができます。これにより、アイテムの追加、検索、削除に、より簡単な「コンビニエンス」マクロを使用することができます。

### メモリについて一言

#### オーバーヘッド

ハッシュハンドルは、32ビットシステムで1項目あたり約32バイト、64ビットシステムで1項目あたり56バイトを消費する。バケットとテーブルという他のオーバーヘッド費用は、それに比べればごくわずかなものです。HASH_OVERHEADを使用すると、ハッシュテーブルのオーバーヘッドサイズをバイト単位で取得することができます。マクロリファレンス」を参照してください。

#### クリーンアップの発生方法

uthashはどうやって内部メモリを整理しているのか、という質問がありました。答えは簡単です。ハッシュテーブルから最後の項目を削除すると、uthashはそのハッシュテーブルに関連するすべての内部メモリを解放し、そのポインタをNULLに設定します。

## ハッシュ演算

ここでは、uthashのマクロを例によって紹介します。より簡潔な一覧は、マクロリファレンスを参照してください。

::: info
便利なマクロと一般的なマクロの比較：

uthashのマクロは2つのカテゴリに分類されます。便利なマクロは、整数、ポインタ、文字列のキーで使用できます（UT_hash_handleフィールドには、従来の名前hhを選択する必要があります）。便利なマクロは一般的なマクロよりも少ない引数を取るので、これらの一般的なタイプのキーでは使い方が少し単純になります。

一般的なマクロは、あらゆるタイプのキー、マルチフィールドキー、UT_hash_handleの名前がhh以外のものである場合に使用できます。これらのマクロはより多くの引数を取り、より柔軟な見返りを提供します。しかし、もし便利なマクロがあなたのニーズに合っているならば、それを使ってください--あなたのコードはより読みやすくなるでしょう。
:::

### ハッシュを宣言する

ハッシュは、構造体へのNULL初期化ポインタとして宣言する必要があります。

```c
struct my_struct *users = NULL;    /* 重要！NULLに初期化する */
```

### 項目を追加する

適当に構造体を割り当てて初期化する。uthashにとって重要なのは、キーが一意な値で初期化されていなければならないという点だけです。次にHASH_ADDを呼び出します（ここでは、int型のキーに対して簡便に使用できる便利なマクロHASH_ADD_INTを使用します）。

#### ハッシュに項目を追加する

```c
void add_user(int user_id, char *name) {
    struct my_struct *s;

    s = malloc(sizeof *s);
    s->id = user_id;
    strcpy(s->name, name);
    HASH_ADD_INT(users, id, s);  /* id: キーフィールドの名前 */
}
```

HASH_ADD_INTの第1パラメータはハッシュテーブルで、第2パラメータはキーフィールドの名前です。ここでは、idとなっています。最後のパラメータは、追加される構造体へのポインタである。

::: info
待てよ、パラメータはフィールド名なのか？

構造体のフィールド名であるidがパラメータとして渡されることに違和感を覚えたなら...マクロの世界へようこそ。心配しないでください。Cプリプロセッサーはこれを有効なCコードに展開します。
:::

#### 使用中に鍵が変更されないようにすること

構造体がハッシュに追加された後は、そのキーの値を変更しないでください。代わりに、ハッシュからその項目を削除し、キーを変更してから、再度追加する。

#### 独自性の確認

上の例では、user_idがすでにハッシュ内の既存のアイテムのキーになっているかどうかをチェックしていません。もし、あなたのプログラムによって重複したキーが生成される可能性があるなら、キーをハッシュに追加する前に明示的に一意性をチェックする必要があります。キーがすでにハッシュ内にある場合は、項目を追加するのではなく、単にハッシュ内の既存の構造を変更すればよい。同じキーを持つ2つの項目をハッシュテーブルに追加するのはエラーです。

add_user関数を書き換えて、idがハッシュに存在するかどうかをチェックするようにしましょう。idがハッシュに存在しない場合のみ、アイテムを作成し、それを追加します。そうでない場合は、すでに存在する構造体を修正するだけです。

```c
void add_user(int user_id, char *name) {
    struct my_struct *s;
    HASH_FIND_INT(users, &user_id, s);  /* idはすでにハッシュの中にあるのか？ */
    if (s == NULL) {
      s = (struct my_struct *)malloc(sizeof *s);
      s->id = user_id;
      HASH_ADD_INT(users, id, s);  /* id: キーフィールドの名前 */
    }
    strcpy(s->name, name);
}
```

なぜuthashは鍵の一意性をチェックしないのですか？例えば、キーがインクリメントされた非反復カウンタによって生成されるプログラムなど、ハッシュ検索を必要としないプログラムのために、ハッシュ検索のコストを節約するためです。

しかし、置換が一般的な操作であれば、HASH_REPLACEマクロを使用することが可能です。このマクロは、アイテムを追加する前に、同じキーを持つアイテムを見つけ、先にそれを削除しようとします。また、置換されたアイテムへのポインタを返すので、ユーザはそのメモリの割り当てを解除する機会があります。

#### ハッシュポインタを関数に渡す

上の例ではusersはグローバル変数ですが、呼び出し側がadd_user関数にハッシュポインタを渡したいと思ったらどうでしょうか。一見すると、usersを引数として渡せばいいように見えますが、それではうまくいきません。

```c
/* bad */
void add_user(struct my_struct *users, int user_id, char *name) {
  ...
  HASH_ADD_INT(users, id, s);
}
```

ハッシュポインタへのポインタを渡す必要があります。:

```c
/* good */
void add_user(struct my_struct **users, int user_id, char *name) { ...
  ...
  HASH_ADD_INT(*users, id, s);
}
```

HASH_ADDでもポインタを再参照していることに注意してください。

ハッシュポインタのポインタを扱う必要がある理由は簡単で、ハッシュマクロがそれを変更するからです（言い換えれば、ポインタが指すものだけでなく、ポインタそのものを変更する）。

### アイテム置換

HASH_REPLACEマクロはHASH_ADDマクロと同じですが、最初にアイテムを見つけて削除しようとする点が異なります。アイテムが見つかり削除された場合、そのアイテムのポインタを出力パラメータとして返します。

### アイテムを探す

ハッシュの中の構造体を調べるには、そのキーが必要です。そして、HASH_FINDを呼び出します。(ここではint型のキーに対して便利なマクロHASH_FIND_INTを使用しています)。

#### 構造体のキーを使って構造体を探す

```c
struct my_struct *find_user(int user_id) {
    struct my_struct *s;

    HASH_FIND_INT(users, &user_id, s);  /* s：出力ポインタ */
    return s;
}
```

ここでは、ハッシュテーブルはusersで、&user_idはキー（この場合は整数）を指しています。最後に、sはHASH_FIND_INTの出力変数である。最終的な結果は、sが与えられたキーを持つ構造体を指し、キーがハッシュで見つからなかった場合はNULLになります。

::: info
Note

中間の引数は、キーへのポインタです。HASH_FINDには、キーのリテラル値を渡すことはできません。代わりにリテラル値を変数に代入し、その変数へのポインタを渡します。
:::

### 項目を削除する

ハッシュから構造体を削除するには、その構造体へのポインタを持っている必要があります。(キーしか持っていない場合は、まずHASH_FINDを実行して構造体ポインタを取得します）。

#### ハッシュから項目を削除する

```c
void delete_user(struct my_struct *user) {
    HASH_DEL(users, user);  /* user: pointer to deletee */
    free(user);             /* オプションで、あなた次第です！ */
}
```

ここでもusersはハッシュテーブルで、userはハッシュから削除したい構造体へのポインタである。

#### uthashは構造体を解放することはありません

構造体を削除してもハッシュテーブルから削除されるだけで、解放されるわけではありません。いつ構造体を解放するかは完全にあなた次第です。uthashは決して構造体を解放しません。例えば、HASH_REPLACEマクロを使用する場合、ユーザが割り当てを解除できるようにするために、置き換えられた出力引数が返されます。

#### Deleteでポインターを変更することができます

ハッシュテーブルのポインタ（最初はハッシュに追加された最初の項目を指す）は、HASH_DELに応答して（すなわち、ハッシュテーブルの最初の項目を削除した場合）変更することができます。

#### 繰り返し削除

HASH_ITERマクロは、単純なforループに展開される、削除しても安全な反復処理の構成要素です。

#### ハッシュから全項目を削除する

```c
void delete_all() {
  struct my_struct *current_user, *tmp;

  HASH_ITER(hh, users, current_user, tmp) {
    HASH_DEL(users, current_user);  /* 削除、ユーザーは次へ進む */
    free(current_user);             /* 任意-自由にしたい場合 */
  }
}
```

#### 一括削除

もし、すべての項目を削除するだけで、解放や要素ごとのクリーンアップを行わないのであれば、1回の操作でより効率的に行うことができます：

```c
HASH_CLEAR(hh, users);
```

その後、リストの先頭（ここではusers）にNULLが設定されます。

### Count items

ハッシュテーブルのアイテム数は、HASH_COUNTで取得できます：

#### ハッシュテーブルの項目数

```c
unsigned int num_users;
num_users = HASH_COUNT(users);
printf("there are %u users\n", num_users);
```

ちなみに、これはリストの先頭（ここではusers）がNULLでも動作し、その場合カウントは0になります。

### 反復処理と並べ替え

ハッシュ内の項目は、先頭から始めてhh.nextポインタをたどることでループさせることができます。

#### ハッシュの全項目に対する反復処理

```c
void print_users() {
    struct my_struct *s;

    for (s = users; s != NULL; s = s->hh.next) {
        printf("user id %d: name %s\n", s->id, s->name);
    }
}
```

また、hh.prevポインタを使えば、既知の項目からハッシュを逆行させることもできます。

#### 削除しても安全な反復処理

上の例では、forループの本体でsを削除して解放するのは安全ではありません（ループが反復するたびにsが再参照されるため）。これを正しく書き換えるのは簡単ですが（s->hh.nextポインタを一時変数にコピーしてからsを解放する）、削除しても安全な反復処理マクロHASH_ITERが含まれているため、頻繁に発生することなのです。これは、for-loopのヘッダに展開されます。このマクロを使用して、前回の例を書き直すと次のようになります：

```c
struct my_struct *s, *tmp;
HASH_ITER(hh, users, s, tmp) {
    printf("user id %d: name %s\n", s->id, s->name);
    /* ...それは削除するために安全であり、無料のSはここにあります。 */
}
```

::: info
ハッシュは二重リンクリストでもある。

hh.prevとhh.nextフィールドがあるため、ハッシュの項目を前後に反復することが可能です。ハッシュのすべての項目は、これらのポインタを繰り返したどることで到達できるため、ハッシュは二重リンクリストでもある。
:::

C++のプログラムでuthashを使う場合、forイテレータに余分なキャストが必要です。例えば、`s = static_cast<my_struct*>(s->hh.next)` のように。

#### ソート

ハッシュの項目は、hh.nextポインタをたどると「挿入順」に訪問されます。HASH_SORTを使えば、項目を新しい順番に並べ替えることができます。

```c
HASH_SORT(users, name_sort);
```

第2引数は、比較関数へのポインタである。この関数は、2つのポインタ引数（比較する項目）を受け取り、最初の項目が2番目の項目より前、等しい、または後にソートする場合、それぞれ0より小さい、0、または0より大きいintを返さなければならない。(これは、標準Cライブラリのstrcmpやqsortで使われているのと同じ規則である）。

```c
int sort_function(void *a, void *b) {
  /* compare a to b (cast a and b appropriately)
   * return (int) -1 if (a < b)
   * return (int)  0 if (a == b)
   * return (int)  1 if (a > b)
   */
}
```

以下、name_sortとid_sortがソート関数の例です。

#### ハッシュ内の項目をソートする

```c
int by_name(const struct my_struct *a, const struct my_struct *b) {
    return strcmp(a->name, b->name);
}

int by_id(const struct my_struct *a, const struct my_struct *b) {
    return (a->id - b->id);
}

void sort_by_name() {
    HASH_SORT(users, by_name);
}

void sort_by_id() {
    HASH_SORT(users, by_id);
}
```

ハッシュの項目がソートされるとき、最初の項目の位置が変わることがある。上の例では、HASH_SORTを呼び出した後、ユーザーが別の構造体を指すことがあります。

### 完全な例

すべてのコードを繰り返し、main()関数で装飾して、動作例を形成します。

このコードをuthash.hと同じディレクトリのexample.cというファイルに置くと、次のようにコンパイルして実行することができる：

```sh
cc -o example example.c
./example
```

プロンプトに従って、プログラムをお試しください。

#### 充実したプログラム

```c
#include <stdio.h>   /* printf */
#include <stdlib.h>  /* atoi, malloc */
#include <string.h>  /* strcpy */
#include "uthash.h"

struct my_struct {
    int id;                    /* キー */
    char name[21];
    UT_hash_handle hh;         /* この構造体をハッシャブルにする */
};

struct my_struct *users = NULL;

void add_user(int user_id, const char *name)
{
    struct my_struct *s;

    HASH_FIND_INT(users, &user_id, s);  /* idはすでにハッシュの中にあるのか？ */
    if (s == NULL) {
        s = (struct my_struct*)malloc(sizeof *s);
        s->id = user_id;
        HASH_ADD_INT(users, id, s);  /* idはキーフィールド */
    }
    strcpy(s->name, name);
}

struct my_struct *find_user(int user_id)
{
    struct my_struct *s;

    HASH_FIND_INT(users, &user_id, s);  /* s：出力ポインタ */
    return s;
}

void delete_user(struct my_struct *user)
{
    HASH_DEL(users, user);  /* user: pointer to deletee */
    free(user);
}

void delete_all()
{
    struct my_struct *current_user;
    struct my_struct *tmp;

    HASH_ITER(hh, users, current_user, tmp) {
        HASH_DEL(users, current_user);  /* delete it (users advances to next) */
        free(current_user);             /* free it */
    }
}

void print_users()
{
    struct my_struct *s;

    for (s = users; s != NULL; s = (struct my_struct*)(s->hh.next)) {
        printf("user id %d: name %s\n", s->id, s->name);
    }
}

int by_name(const struct my_struct *a, const struct my_struct *b)
{
    return strcmp(a->name, b->name);
}

int by_id(const struct my_struct *a, const struct my_struct *b)
{
    return (a->id - b->id);
}

const char *getl(const char *prompt)
{
    static char buf[21];
    char *p;
    printf("%s? ", prompt); fflush(stdout);
    p = fgets(buf, sizeof(buf), stdin);
    if (p == NULL || (p = strchr(buf, '\n')) == NULL) {
        puts("Invalid input!");
        exit(EXIT_FAILURE);
    }
    *p = '\0';
    return buf;
}

int main()
{
    int id = 1;
    int running = 1;
    struct my_struct *s;
    int temp;

    while (running) {
        printf(" 1. add user\n");
        printf(" 2. add or rename user by id\n");
        printf(" 3. find user\n");
        printf(" 4. delete user\n");
        printf(" 5. delete all users\n");
        printf(" 6. sort items by name\n");
        printf(" 7. sort items by id\n");
        printf(" 8. print users\n");
        printf(" 9. count users\n");
        printf("10. quit\n");
        switch (atoi(getl("Command"))) {
            case 1:
                add_user(id++, getl("Name (20 char max)"));
                break;
            case 2:
                temp = atoi(getl("ID"));
                add_user(temp, getl("Name (20 char max)"));
                break;
            case 3:
                s = find_user(atoi(getl("ID to find")));
                printf("user: %s\n", s ? s->name : "unknown");
                break;
            case 4:
                s = find_user(atoi(getl("ID to delete")));
                if (s) {
                    delete_user(s);
                } else {
                    printf("id unknown\n");
                }
                break;
            case 5:
                delete_all();
                break;
            case 6:
                HASH_SORT(users, by_name);
                break;
            case 7:
                HASH_SORT(users, by_id);
                break;
            case 8:
                print_users();
                break;
            case 9:
                temp = HASH_COUNT(users);
                printf("there are %d users\n", temp);
                break;
            case 10:
                running = 0;
                break;
        }
    }

    delete_all();  /* free any structures */
    return 0;
}
```

このプログラムは配布物のtests/example.cに含まれているので、そのディレクトリでmake exampleを実行すれば簡単にコンパイルすることができます。

## 標準的なキータイプ

このセクションでは、さまざまな種類のキーを使用する方法について詳しく説明します。整数、文字列、ポインタ、構造体など、ほとんどすべての種類のキーを使用することができます。

::: info
Note

フロートに関する注意点

浮動小数点キーを使用することができます。これには、浮動小数点数の等価性をテストするプログラムと同じ注意事項があります。つまり、2つの浮動小数点数のわずかな違いでも、別個のキーになるのです。
:::

### 整数キー

前述の例では、整数キーを使用することを示しました。要約すると、整数キーを持つ構造体には、便利なマクロHASH_ADD_INTとHASH_FIND_INTを使用します。(HASH_DELETEやHASH_SORTなどの他の操作は、すべてのタイプのキーに対して同じです）。

### 文字列キー

構造体に文字列のキーがある場合、構造体がキーを指すのか（`char *`）、文字列が構造体の中にあるのか（`char a[10]` ）によって、使用する演算が異なります。この区別は重要です。後述するように、構造体がキーを指している場合（つまり、キー自体が構造体の外にある場合）にはHASH_ADD_KEYPTRを使う必要があります。一方、構造体の中に含まれる文字列キーにはHASH_ADD_STRを使います。

::: info
Note

`char[ ]` vs. `char*`

以下の最初の例では、文字列は構造体の中にあり、nameは`char[10]`フィールドである。2番目の例では、キーは構造体の外側にあり、nameは`char *`です。つまり、最初の例ではHASH_ADD_STRを使用しますが、2番目の例ではHASH_ADD_KEYPTRを使用します。このマクロに関する情報は、マクロのリファレンスを参照してください。
:::

#### 構造体内文字列

文字列をキーとするハッシュ（構造体内文字列）。

```c
#include <string.h>  /* strcpy */
#include <stdlib.h>  /* malloc */
#include <stdio.h>   /* printf */
#include "uthash.h"

struct my_struct {
    char name[10];             /* キー（文字列は構造体の中にある） */
    int id;
    UT_hash_handle hh;         /* この構造体をハッシャブルにする */
};


int main(int argc, char *argv[]) {
    const char *names[] = { "joe", "bob", "betty", NULL };
    struct my_struct *s, *tmp, *users = NULL;

    for (int i = 0; names[i]; ++i) {
        s = (struct my_struct *)malloc(sizeof *s);
        strcpy(s->name, names[i]);
        s->id = i;
        HASH_ADD_STR(users, name, s);
    }

    HASH_FIND_STR(users, "betty", s);
    if (s) printf("betty's id is %d\n", s->id);

    /* ハッシュテーブルの内容を解放する */
    HASH_ITER(hh, users, s, tmp) {
      HASH_DEL(users, s);
      free(s);
    }
    return 0;
}
```

この例は、配布物のtests/test15.cに含まれており、プリントされます：

```
betty's id is 2
```

#### 構造体内文字列ポインタ

さて、同じ例ですが、`char [ ]`の代わりに`char *`キーを使用しています：

文字列をキーとするハッシュ（構造体は文字列を指す）

```c
#include <string.h>  /* strcpy */
#include <stdlib.h>  /* malloc */
#include <stdio.h>   /* printf */
#include "uthash.h"

struct my_struct {
    const char *name;          /* キー */
    int id;
    UT_hash_handle hh;         /* この構造体をハッシャブルにする */
};


int main(int argc, char *argv[]) {
    const char *names[] = { "joe", "bob", "betty", NULL };
    struct my_struct *s, *tmp, *users = NULL;

    for (int i = 0; names[i]; ++i) {
        s = (struct my_struct *)malloc(sizeof *s);
        s->name = names[i];
        s->id = i;
        HASH_ADD_KEYPTR(hh, users, s->name, strlen(s->name), s);
    }

    HASH_FIND_STR(users, "betty", s);
    if (s) printf("betty's id is %d\n", s->id);

    /* ハッシュテーブルの内容を解放する */
    HASH_ITER(hh, users, s, tmp) {
      HASH_DEL(users, s);
      free(s);
    }
    return 0;
}
```

この例は、tests/test40.cに含まれています。

### ポインターキー

キーはポインタにすることができます。はっきり言って、これはポインタそのものがキーになり得ることを意味します（対照的に、指されたものがキーである場合、これはHASH_ADD_KEYPTRによって処理される別のユースケースとなります）。

ここでは、構造体がキーと呼ばれるポインタメンバを持つという単純な例を示します。

#### ポインターキー

```c
#include <stdio.h>
#include <stdlib.h>
#include "uthash.h"

typedef struct {
  void *key;
  int i;
  UT_hash_handle hh;
} el_t;

el_t *hash = NULL;
char *someaddr = NULL;

int main() {
  el_t *d;
  el_t *e = (el_t *)malloc(sizeof *e);
  if (!e) return -1;
  e->key = (void*)someaddr;
  e->i = 1;
  HASH_ADD_PTR(hash, key, e);
  HASH_FIND_PTR(hash, &someaddr, d);
  if (d) printf("found\n");

  /* release memory */
  HASH_DEL(hash, e);
  free(e);
  return 0;
}
```

この例はtests/test57.cに含まれています。プログラムの終了によってハッシュから要素が削除され、（ハッシュにはもう要素が残っていないので）uthashは内部メモリを解放していることに注意してください。

### 構造キー

キーフィールドはどのようなデータ型でもかまいません。uthashにとっては、単なるバイト列です。したがって、ネストした構造体でもキーとして使用することができます。一般的なマクロであるHASH_ADDとHASH_FINDを使って、実演してみます。

::: info
Note

構造体にはパディング（構造体のメンバのアライメント要件を満たすために使用される無駄な内部空間）が含まれています。これらのパディングバイトは、ハッシュへの項目の追加や項目の検索を行う前にゼロにする必要があります。したがって、関心のあるメンバを設定する前に、常に構造体全体をゼロにする必要があります。以下の例では、memsetを2回呼び出すことでこれを実現しています。
:::

#### 構造体であるキー

```c
#include <stdlib.h>
#include <stdio.h>
#include "uthash.h"

typedef struct {
  char a;
  int b;
} record_key_t;

typedef struct {
    record_key_t key;
    /* ... other data ... */
    UT_hash_handle hh;
} record_t;

int main(int argc, char *argv[]) {
    record_t l, *p, *r, *tmp, *records = NULL;

    r = (record_t *)malloc(sizeof *r);
    memset(r, 0, sizeof *r);
    r->key.a = 'a';
    r->key.b = 1;
    HASH_ADD(hh, records, key, sizeof(record_key_t), r);

    memset(&l, 0, sizeof(record_t));
    l.key.a = 'a';
    l.key.b = 1;
    HASH_FIND(hh, records, &l.key, sizeof(record_key_t), p);

    if (p) printf("found %c %d\n", p->key.a, p->key.b);

    HASH_ITER(hh, records, p, tmp) {
      HASH_DEL(records, p);
      free(p);
    }
    return 0;
}
```

この使い方は、後述する複合キーの使い方とほぼ同じです。

なお、一般的なマクロでは、第1引数にUT_hash_handleの名前を渡す必要があります（ここでは、hhです）。一般的なマクロは、マクロリファレンスに記載されています。

## アドバンスド・トピックス

### 複合キー

キーは、連続した複数のフィールドで構成することも可能です。

#### マルチフィールドキー

```c
#include <stdlib.h>    /* malloc       */
#include <stddef.h>    /* offsetof     */
#include <stdio.h>     /* printf       */
#include <string.h>    /* memset       */
#include "uthash.h"

#define UTF32 1

typedef struct {
  UT_hash_handle hh;
  int len;
  char encoding;      /* these two fields */
  int text[];         /* comprise the key */
} msg_t;

typedef struct {
    char encoding;
    int text[];
} lookup_key_t;

int main(int argc, char *argv[]) {
    unsigned keylen;
    msg_t *msg, *tmp, *msgs = NULL;
    lookup_key_t *lookup_key;

    int beijing[] = {0x5317, 0x4eac};   /* UTF-32LE for 北京 */

    /* 構造体の確保と初期化 */
    msg = (msg_t *)malloc(sizeof(msg_t) + sizeof(beijing));
    memset(msg, 0, sizeof(msg_t)+sizeof(beijing)); /* zero fill */
    msg->len = sizeof(beijing);
    msg->encoding = UTF32;
    memcpy(msg->text, beijing, sizeof(beijing));

    /* パディングを含む鍵長を計算する。 */
    keylen =   offsetof(msg_t, text)       /* offset of last key field */
             + sizeof(beijing)             /* size of last key field */
             - offsetof(msg_t, encoding);  /* offset of first key field */

    /* ハッシュテーブルに構造体を追加する */
    HASH_ADD(hh, msgs, encoding, keylen, msg);

    /* うまくいったかどうか調べてみてください :-) */
    msg = NULL;

    lookup_key = (lookup_key_t *)malloc(sizeof(*lookup_key) + sizeof(beijing));
    memset(lookup_key, 0, sizeof(*lookup_key) + sizeof(beijing));
    lookup_key->encoding = UTF32;
    memcpy(lookup_key->text, beijing, sizeof(beijing));
    HASH_FIND(hh, msgs, &lookup_key->encoding, keylen, msg);
    if (msg) printf("found \n");
    free(lookup_key);

    HASH_ITER(hh, msgs, msg, tmp) {
      HASH_DEL(msgs, msg);
      free(msg);
    }
    return 0;
}
```

この例は、配布物のtests/test22.cに含まれています。

マルチフィールドキーを使用する場合、コンパイラは各フィールドのアライメント要件を満たすために、隣接するフィールドをパディングする（未使用のスペースを間に挿入する）ことを認識してください。例えば、charの後にintが続く構造体では、intフィールドを4の倍数アドレス（4はintの長さ）で開始させるために、charの後に通常3バイトの「無駄な」パディングがあります。

::: info
マルチフィールドキーの長さを計算する：

マルチフィールドキーを使用する場合、キー長を決定するために、コンパイラがアライメントのために追加する構造体パディングを含める必要があります。

鍵の長さを計算する簡単な方法は、`<stddef.h>`のoffsetofマクロを使用することです。計算式は以下の通りです：

```c
key length =   offsetof(last_key_field)
             + sizeof(last_key_field)
             - offsetof(first_key_field)
```

上の例では、この式で変数keylenが設定されます。
:::

マルチフィールドキーを扱う場合、ハッシュテーブルにHASH_ADDする前、またはHASH_FINDキーでそのフィールドを使用する前に、構造体をゼロフィルする必要があります。

前の例では、memsetを使用して構造体をゼロ埋めして初期化しています。これは、キーフィールド間のパディングをゼロにするものです。もし、ゼロフィルを行わなかった場合、このパディングにはランダムな値が含まれることになります。このランダムな値は、HASH_FINDの失敗の原因になります。2つの「同じ」キーが、パディングに違いがあると、不一致に見えるからです。

また、グローバル鍵比較関数と鍵ハッシュ関数をカスタマイズして、鍵のパディングを無視することも可能です。代替のキー比較関数を指定する」を参照してください。

### 多階層ハッシュテーブル

多階層ハッシュテーブルは、ハッシュテーブルの各要素がそれ自身の二次ハッシュテーブルを含む場合に発生します。レベルはいくつでも可能です。スクリプト言語では、次のように表示されることがあります：

```php
$items{bob}{age}=37
```

以下のCプログラムは、この例をuthashで構築します。ハッシュテーブルをitemsと呼びます。ハッシュテーブルはitemsと呼ばれ、1つの要素（bob）を含み、そのハッシュテーブルには値37の要素（age）が1つ含まれています。多階層のハッシュテーブルを構築するために特別な関数は必要ない。

この例では、両レベル（ボブ、エイジ）を同じ構造で表現していますが、2つの異なる構造定義でも問題ありません。また、2つのレベルではなく、3つ以上のレベルがあっても問題ないでしょう。

#### 多階層ハッシュテーブル

```c
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "uthash.h"

/* ハッシュのハッシュ */
typedef struct item {
  char name[10];
  struct item *sub;
  int val;
  UT_hash_handle hh;
} item_t;

item_t *items = NULL;

int main(int argc, char *argvp[]) {
  item_t *item1, *item2, *tmp1, *tmp2;

  /* make initial element */
  item_t *i = malloc(sizeof(*i));
  strcpy(i->name, "bob");
  i->sub = NULL;
  i->val = 0;
  HASH_ADD_STR(items, name, i);

  /* この要素からサブハッシュ・テーブルを追加する */
  item_t *s = malloc(sizeof(*s));
  strcpy(s->name, "age");
  s->sub = NULL;
  s->val = 37;
  HASH_ADD_STR(i->sub, name, s);

  /* ハッシュの要素に対して反復処理を行う  */
  HASH_ITER(hh, items, item1, tmp1) {
    HASH_ITER(hh, item1->sub, item2, tmp2) {
      printf("$items{%s}{%s} = %d\n", item1->name, item2->name, item2->val);
    }
  }

  /* 両方のハッシュテーブルをきれいにする */
  HASH_ITER(hh, items, item1, tmp1) {
    HASH_ITER(hh, item1->sub, item2, tmp2) {
      HASH_DEL(item1->sub, item2);
      free(item2);
    }
    HASH_DEL(items, item1);
    free(item1);
  }

  return 0;
}
```

上記の例は、tests/test59.cに含まれています。

### 複数のハッシュテーブルの中の項目

構造体は、複数のハッシュテーブルに追加することができます。このようなことをする理由はいくつかあります：

- 各ハッシュテーブルは、異なるキーを使用することができる；
- 各ハッシュテーブルが独自のソート順を持つことができる；
- あるいは、単にグループ化のために複数のハッシュテーブルを使用することもできます。例えば、admin_usersハッシュテーブルとusersハッシュテーブルでユーザーを持つことができます。

構造体は、それが追加されるかもしれない各ハッシュテーブルのためのUT_hash_handleフィールドを持つ必要があります。それらにどんな名前をつけてもかまいません。例えば、次のようなものです、

```c
UT_hash_handle hh1, hh2;
```

### 複数のキーを持つアイテム

IDフィールドをキーとするハッシュテーブルと、ユーザー名をキーとするハッシュテーブル（ユーザー名がユニークな場合）を作成することができます。両方のハッシュテーブルに同じユーザー構造を追加することで、（構造を重複させることなく）ユーザー名やIDでユーザー構造を参照することができます。これを実現する方法は、構造体を追加できる各ハッシュに対して、別々のUT_hash_handleを持つことです。

#### 2種類のキーを持つ構造

```c
struct my_struct {
    int id;                    /* 第一キー */
    char username[10];         /* セカンドキー */
    UT_hash_handle hh1;        /* 最初のハッシュテーブルのためのハンドル */
    UT_hash_handle hh2;        /* セカンドハッシュテーブルのハンドル */
};
```

上の例では、この構造体を2つの別々のハッシュテーブルに追加することができるようになりました。一方のハッシュではidがキーとなり、もう一方のハッシュではusernameがキーとなります。(2つのハッシュが異なるキーフィールドを持つ必要はありません。idのような同じキーを使用することも可能です)。

この構造体には2つのハッシュハンドル（hh1、hh2）があることに注意してください。以下のコードでは、それぞれのハッシュハンドルが特定のハッシュテーブルと排他的に使用されることに注目してください。(hh1はusers_by_idハッシュで、hh2はusers_by_nameハッシュテーブルで常に使用されます)。

#### 構造上の2つのキー

```c
    struct my_struct *users_by_id = NULL, *users_by_name = NULL, *s;
    int i;
    char *name;

    s = malloc(sizeof *s);
    s->id = 1;
    strcpy(s->username, "thanson");

    /* 両方のハッシュテーブルに構造体を追加する */
    HASH_ADD(hh1, users_by_id, id, sizeof(int), s);
    HASH_ADD(hh2, users_by_name, username, strlen(s->username), s);

    /* users_by_id "ハッシュテーブルからIDでユーザーを検索する。 */
    i = 1;
    HASH_FIND(hh1, users_by_id, &i, sizeof(int), s);
    if (s) printf("found id %d: %s\n", i, s->username);

    /* users_by_nameハッシュテーブルからユーザー名を指定してユーザーを検索する。 */
    name = "thanson";
    HASH_FIND(hh2, users_by_name, name, strlen(name), s);
    if (s) printf("found user %s: %d\n", name, s->id);
```

### 新規アイテムのソート挿入

ソートされたハッシュを維持したい場合、2つのオプションがあります。最初の選択肢は HASH_SRT() マクロを使うことで、順序のないリストを O(n log(n)) でソートできます。これは、ハッシュテーブルをランダムな順番で埋めていき、最終的にHASH_SRT()を1回実行するだけなら、最適な方法です。明らかに、項目を挿入する間にリストが順序付けられた状態になる必要がある場合、この方法は望んだものではありません。挿入操作のたびにHASH_SRT()を使うこともできますが、その場合、計算量はO(n^2 log n)となります。

2つ目の方法は、インオーダーアドとインオーダーリプレイスマクロを使う方法です。HASH_ADD_INORDER*マクロは、HASH_ADD*マクロと同様に動作しますが、比較関数の引数が追加されています：

```c
int name_sort(struct my_struct *a, struct my_struct *b) {
  return strcmp(a->name, b->name);
}

HASH_ADD_KEYPTR_INORDER(hh, items, &item->name, strlen(item->name), item, name_sort);
```

新しい項目は挿入時にO(n)でソートされるため、すべての項目を含むハッシュテーブルの作成にかかる総計算量はO(n^2)となる。インオーダーアドが機能するためには、新しいアイテムを挿入する前にリストが順序付けられた状態である必要があります。

### 数種類のソート順

2つのハッシュテーブルが異なるソート順を持つことは驚くべきことではありませんが、この事実を有利に利用することで、同じ項目を複数の方法でソートすることも可能です。これは、ある構造を複数のハッシュテーブルに格納できることに基づいている。

先ほどの例を拡張して、多くのユーザがいるとします。各ユーザーの構造体をusers_by_idハッシュテーブルとusers_by_nameハッシュテーブルに追加しました。(繰り返しになりますが、これは各構造体のコピーを2つ持つ必要なく行われます)。次に、2つのソート関数を定義し、HASH_SRTを使用することができます。

```c
int sort_by_id(struct my_struct *a, struct my_struct *b) {
  if (a->id == b->id) return 0;
  return (a->id < b->id) ? -1 : 1;
}
int sort_by_name(struct my_struct *a, struct my_struct *b) {
  return strcmp(a->username, b->username);
}
HASH_SRT(hh1, users_by_id, sort_by_id);
HASH_SRT(hh2, users_by_name, sort_by_name);
```

users_by_idの項目はid順に、users_by_nameの項目はname順に、それぞれ反復処理されることになります。項目はそれぞれの順番で完全に前後方向にリンクされています。したがって、1つのユーザー・セットであっても、2つのハッシュ・テーブルに格納することで、2つの異なるソート順で容易に反復処理を行うことができます。

### ブルームフィルタ(高速ミス)

公平なミス率（HASH_FINDの結果がNULL）を生成するプログラムでは、組み込みのブルームフィルタのサポートが有効です。これは、ヒットだけを生成するプログラムでは、わずかなペナルティが発生するため、デフォルトでは無効になっています。また、削除を行うプログラムでは、ブルーム・フィルターを使用するべきではありません。このプログラムは正しく動作しますが、削除はフィルターの利点を減少させます。ブルーム・フィルターを有効にするには、-DHASH_BLOOM=nのようにコンパイルします：

```
-DHASH_BLOOM=27
```

ここで、数値は32までの任意の値で、下図のようにフィルターが使用するメモリ量を決定します。より多くのメモリを使用することで、フィルタの精度が向上し、ミスした場合の救済が早くなるため、プログラムの高速化につながる可能性があります。

#### 表1.ブルームフィルタのサイズ（nの値

n  | ブルームフィルタのサイズ（ハッシュテーブルあたり）
---|-----------------------------------
16 | 8 kilobytes
20 | 128 kilobytes
24 | 2 megabytes
28 | 32 megabytes
32 | 512 megabytes

ブルームフィルタはあくまで性能のための機能であり、ハッシュ演算の結果を何ら変えるものではありません。ブルーム・フィルターがあなたのプログラムに適しているかどうかを判断する唯一の方法は、テストすることです。ブルーム・フィルターの大きさは、16～32ビットが妥当です。

### 選択

与えられた条件を満たすソースハッシュのアイテムをデスティネーションハッシュに挿入する実験的なselect操作が提供される。この挿入は、HASH_ADDを使用する場合よりもいくらか効率的に行われます。すなわち、選択された項目のキーに対してハッシュ関数が再計算されないためです。この操作では、ソースハッシュからアイテムが削除されることはない。むしろ、選択された項目は両方のハッシュで二重に存在するようになります。デスティネーションハッシュにはすでにアイテムが含まれているかもしれないが、選択されたアイテムはそれに追加される。構造体がHASH_SELECTで使用可能であるためには、2つ以上のハッシュハンドルを持つ必要があります。(ここで説明するように、構造体は同時に多くのハッシュテーブルに存在することができますが、それぞれに対して別々のハッシュハンドルを持たなければなりません）。

```c
user_t *users = NULL;   /* hash table of users */
user_t *admins = NULL;  /* hash table of admins */
typedef struct {
    int id;
    UT_hash_handle hh;  /* handle for users hash */
    UT_hash_handle ah;  /* handle for admins hash */
} user_t;
```

ここで、ユーザーを追加し、idが1024未満の管理者ユーザーだけを選択したいとします。

```c
#define is_admin(x) (((user_t*)x)->id < 1024)
HASH_SELECT(ah, admins, hh, users, is_admin);
```

最初の2つのパラメータは宛先ハッシュハンドルとハッシュテーブル、2番目の2つのパラメータは送信元ハッシュハンドルとハッシュテーブル、最後のパラメータは選択条件である。ここではマクロのis_admin(x)を使っていますが、関数を使っても同じように使えます。

```c
int is_admin(const void *userv) {
  user_t *user = (const user_t*)userv;
  return (user->id < 1024) ? 1 : 0;
}
```

選択条件が常に真と評価される場合、この操作は本質的にソースハッシュをデスティネーションハッシュにマージすることになる。

HASH_SELECTは、ソースから項目を削除することなく、デスティネーションに項目を追加するもので、ソースのハッシュテーブルは変更されません。デスティネーションハッシュテーブルはソースハッシュテーブルと同じであってはならない。

HASH_SELECTの使用例は、tests/test36.cに含まれています。

### 代替キー比較機能を指定する

HASH_FIND(hh, head, intfield, sizeof(int), out)を呼び出すと、uthashはまずHASH_FUNCTION(intfield, sizeof(int), hashvalue)を呼び出して検索対象のバケットbを決定し、バケットbの要素eltごとにuthashがelt->hh.hashv == hashvalue && elt.hh.keylen == sizeof(int) && HASH_KEYCMP(intfield, elt->hh.key, sizeof(int)) == 0. HASH_KEYCMPは、eltが一致したので返すべきことを示す0、一致要素の検索を続けるべきことを示す非ゼロの値を返すべきです。

デフォルトでは、uthashはmemcmpのエイリアスとしてHASH_KEYCMPを定義しています。memcmpを提供しないプラットフォームでは、独自の実装で代用することができます。

```c
#undef HASH_KEYCMP
#define HASH_KEYCMP(a,b,len) bcmp(a, b, len)
```

Another reason to substitute your own key comparison function is if your "key" is not trivially comparable. In this case you will also need to substitute your own HASH_FUNCTION.

```c
struct Key {
    short s;
    /* 2 bytes of padding */
    float f;
};
/* パディングバイトを比較しない; 浮動小数点数でmemcmpを使用しない */
unsigned key_hash(struct Key *s) { return s + (unsigned)f; }
bool key_equal(struct Key *a, struct Key *b) { return a.s == b.s && a.f == b.f; }

#define HASH_FUNCTION(s,len,hashv) (hashv) = key_hash((struct Key *)s)
#define HASH_KEYCMP(a,b,len) (!key_equal((struct Key *)a, (struct Key *)b))
```

独自の鍵比較関数を代用するもう一つの理由は、正しさと実際の速度をトレードオフすることです。uthashはバケットを線形探索する際、常に32ビットハッシュvを最初に比較し、ハッシュvが等しい場合にのみHASH_KEYCMPを呼び出します。つまり、HASH_KEYCMPは検索に成功するごとに少なくとも1回は呼び出されることになります。優れたハッシュ関数があれば、hashvの比較で「偽陽性」となるのは40億回に1回だけと予想されます。したがって、HASH_KEYCMPはほとんどの場合、0を返すと予想されます。もし、多くの検索が成功することが予想され、アプリケーションが時折起こる誤検出を気にしないのであれば、私たちはノーオペレーションの比較関数を代用するかもしれません：

```c
#undef HASH_KEYCMP
#define HASH_KEYCMP(a,b,len) 0  /* occasionally wrong, but very fast */
```

::: info
Note

グローバルな等価比較関数HASH_KEYCMPは、HASH_ADD_INORDERのパラメータとして渡されるlessthan-comparison関数と全く関係がありません。
:::

### ハッシュ関数内蔵

内部的には、ハッシュ関数はキーをバケツ番号に変換する。現在Jenkinsのデフォルトのハッシュ関数を使うのに、何もする必要はありません。

プログラムによっては、内蔵のハッシュ関数のうち別のものを使用した方がよい場合があります。uthashには、他のハッシュ関数がより良いパフォーマンスをもたらすかどうかを判断するのに役立つ簡単な分析ユーティリティが付属しています。

プログラムをコンパイルする際に、-DHASH_FUNCTION=HASH_xyz（xyzは以下のシンボル名のいずれか）を指定すると、別のハッシュ関数を使用することができます。例．

```sh
cc -DHASH_FUNCTION=HASH_BER -o program program.c
```

#### 表2.組み込みのハッシュ関数

Symbol | Name
-------|------------------
JEN    | Jenkins (default)
BER    | Bernstein
SAX    | シフトアドエックスオア
OAT    | One-at-a-time
FNV    | Fowler/Noll/Vo
SFH    | Paul Hsieh

#### どのハッシュ関数が最適か？

キードメインに最適なハッシュ関数を簡単に決定することができます。そのためには、データ収集パスでプログラムを一度実行し、収集したデータを付属の解析ユーティリティで実行する必要があります。

まず、解析ユーティリティを構築する必要があります。トップレベルのディレクトリから

```sh
cd tests/
make
```

ここでは、test14.cを使用して、データ収集と解析の手順を示します（ここでは、ファイルディスクリプタ3をファイルにリダイレクトするsh構文を使っています）：

#### キースタットの使用

```
% cc -DHASH_EMIT_KEYS=3 -I../src -o test14 test14.c
% ./test14 3>test14.keys
% ./keystats test14.keys
fcn  ideal%     #items   #buckets  dup%  fl   add_usec  find_usec  del-all usec
---  ------ ---------- ---------- -----  -- ---------- ----------  ------------
SFH   91.6%       1219        256    0%  ok         92        131            25
FNV   90.3%       1219        512    0%  ok        107         97            31
SAX   88.7%       1219        512    0%  ok        111        109            32
OAT   87.2%       1219        256    0%  ok         99        138            26
JEN   86.7%       1219        256    0%  ok         87        130            27
BER   86.2%       1219        256    0%  ok        121        129            27
```

::: info
Note

DHASH_EMIT_KEYS=3の3は、ファイルディスクリプタです。DHASH_EMIT_KEYS=xで有効になるデータ収集モードは、実運用コードでは使用しないでください。
:::

通常、最初に表示されるハッシュ関数を選べばよい。ここでは、SFHです。これは、鍵の分布が最も均等になる関数である。もし複数の関数が同じideal%であれば、find_usecのカラムに従って最も速いものを選択する。

#### キースタッツカラムリファレンス

name         | description
-------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
fcn          | ハッシュ関数のシンボル名
ideal%       | ハッシュテーブルの中で、理想的なステップ数で検索できる項目の割合です。(以下でさらに説明する)。
#items       | 発行された鍵ファイルから読み込まれた鍵の数
#buckets     | すべてのキーが追加された後のハッシュのバケット数
dup%         | 生成された鍵ファイルに含まれる重複した鍵の割合。キーの一意性を保つために、重複したキーはフィルタリングされます。(重複は正常です。例えば、アプリケーションがハッシュに項目を追加し、それを削除して再度追加した場合、キーは放出されたファイルに2回書き込まれる)。
flags        | はokか、あるいはExpansion internalsで説明した拡張禁止フラグが設定されている場合はnx（noexpand）です。noexpandフラグが設定されているハッシュ関数を使用することは推奨されません。
add_usec     | ハッシュのすべてのキーを追加するのに必要なクロックタイム（マイクロ秒）。
find_usec    | ハッシュのすべてのキーを検索するのに必要なクロックタイム（マイクロ秒）。
del-all usec | ハッシュの全項目を削除するのに必要な時計時間（マイクロ秒）。

ideal%

::: info
ideal%とは何ですか？

ハッシュのn個のアイテムはk個のバケットに分配される。理想的には、各バケットはアイテムの等しいシェア（n/k）を含んでいる。言い換えれば、すべてのバケットが等しく使用されている場合、バケットチェーンにおける任意のアイテムの最大線形位置はn/kとなる。あるバケツが使いすぎ、他のバケツが使いにくい場合、使いすぎたバケツには、線形位置がn/kを超えるアイテムが含まれることになります。このようなアイテムは非理想的とみなされる。

ご想像の通り、ideal%はハッシュ中の理想的なアイテムの割合です。これらの項目は、バケットチェーンにおいて有利な線形位置を持っています。ideal%が100%に近づくと、ハッシュテーブルは定時間ルックアップの性能に近づきます。
:::

### hashscan

::: info
Note

このユーティリティは、Linux、およびFreeBSD（8.1以上）のみで利用可能です。
:::

hashscanというユーティリティがtests/ディレクトリに含まれています。このディレクトリでmakeを実行すると、自動的にビルドされます。このツールは、実行中のプロセスを調査し、そのプログラムのメモリ内で見つけたuthashテーブルについて報告します。また、各テーブルのキーをkeystatsに入力できる形式で保存することもできる。

以下はhashscanの使用例です。まずビルドされていることを確認します：

```sh
cd tests/
make
```

hashscanは検査するために実行中のプログラムが必要なので、ハッシュテーブルを作成し、スリープする簡単なプログラムをテスト対象として起動することにします:

```sh
./test_sleep &
pid: 9711
```

テストプログラムができたので、そのプログラムに対してhashscanを実行してみましょう。:

```
./hashscan 9711
Address            ideal    items  buckets mc fl bloom/sat fcn keys saved to
------------------ ----- -------- -------- -- -- --------- --- -------------
0x862e038            81%    10000     4096 11 ok 16    14% JEN
```

もし、keystatsを使った外部分析のために、すべてのキーをコピーしたい場合は、-kフラグを追加します。:

```
./hashscan -k 9711
Address            ideal    items  buckets mc fl bloom/sat fcn keys saved to
------------------ ----- -------- -------- -- -- --------- --- -------------
0x862e038            81%    10000     4096 11 ok 16    14% JEN /tmp/9711-0.key
```

ここで、./keystats /tmp/9711-0.keyを実行して、この鍵のセットでどのハッシュ関数が最も良い特性を持つかを分析することができます。

#### hashscan column reference

name          | description
--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Address       | ハッシュテーブルの仮想アドレス
ideal         | 理想的なステップ数で調べることができるテーブルの項目の割合です。keystatsのセクションの`[ideal]`を参照。
items         | ハッシュテーブルの項目数
buckets       | ハッシュテーブルのバケット数
mc            | ハッシュテーブルの最大連鎖長（uthashは通常、各バケツに10個以下のアイテムを保持しようとします。）
fl            | フラグ（OK、または拡張禁止フラグが設定されている場合はNXのいずれか）
bloom/sat     | ハッシュテーブルがブルームフィルタを使用している場合、これはフィルタのサイズ（2の累乗）です（例えば、16はフィルタのサイズが2^16ビットであることを意味します）。2つ目の数値は、ビットの「飽和度」をパーセントで表したものです。パーセンテージが低いほど、キャッシュミスを素早く特定するための潜在的なメリットが高くなります。
fcn           | ハッシュ関数のシンボル名
keys saved to | キーが保存されたファイル（もしあれば

::: info
ハッシュスキャンの仕組み

hashscanが実行されると、ターゲットプロセスにアタッチされ、ターゲットプロセスを一時的にサスペンドします。この短いサスペンド中に、ターゲットの仮想メモリをスキャンしてuthashハッシュテーブルのシグネチャを探します。そして、その署名に有効なハッシュテーブル構造が付随しているかどうかをチェックし、見つけたものを報告する。デタッチすると、ターゲットのプロセスは通常通り実行を再開する。hashscanは "read-only "で実行され、ターゲット・プロセスは変更されない。hashscanは実行中のプロセスの瞬間的なスナップショットを解析しているため、実行ごとに異なる結果を返すことがあります。
:::

### 拡張インターナル

内部的には、このハッシュはバケットの数を管理し、十分な数のバケットを持つことで、各バケットには少数のアイテムしか含まれないようにすることを目標としています。

::: info
なぜバケット数が重要なのか？

キーで項目を検索する場合、このハッシュは該当するバケツ内の項目を直線的にスキャンする。線形スキャンを一定時間で実行するためには、各バケツに含まれるアイテムの数を制限する必要があります。これは、必要に応じてバケットの数を増やすことで達成される。
:::

#### 通常の拡大

このハッシュは、各バケツに10個未満のアイテムを保持することを試みる。バケツがこの数を超えるようなアイテムが追加されると、ハッシュのバケツの数は2倍になり、アイテムは新しいバケツに再分配されます。理想的には、各バケツには以前の半分の数のアイテムが入ることになります。

バケット拡張は、必要に応じて自動的かつ不可視で行われます。アプリケーション側でそのタイミングを把握する必要はありません。

#### バケットごとの拡張閾値

通常、すべてのバケットは同じ閾値（10アイテム）を共有し、その時点でバケット拡張が開始されます。uthashはバケット拡張の過程で、特定のバケットが過剰に使用されていると判断した場合、この拡張トリガー閾値をバケットごとに調整することができます。

この閾値を調整すると、10から10の倍数になります（そのバケツの場合）。この倍数は、実際の鎖の長さが理想的な長さの何倍であるかに基づいています。これは、ハッシュ関数がいくつかのバケットを過剰に使用しているが、全体の分布は良好である場合に、過剰なバケットの拡張を抑えるための実用的な措置である。しかし、全体的な分布が悪くなりすぎると、uthashは戦術を変更します。

#### 拡大抑制

特に、開発中にkeystatsユーティリティを使用して、鍵のハッシュを適切に選択した場合は、通常、このことについて知る必要も心配する必要もありません。

ハッシュ関数によって、バケツ内のアイテムの分布が不均一になることがあります。適度な量であれば問題ありません。鎖の長さが長くなるにつれて、通常のバケツ拡張が行われる。しかし、著しい不均衡が生じた場合（ハッシュ関数がキードメインに適していないため）、バケット拡張は連鎖長を減らすのに効果的でない場合があります。

バケツの数を何倍にしても、バケツ0の鎖の長さは変わりません。このような状況では、拡張を止め、O(n)のルックアップ性能を受け入れるのが最良の行動です。uthashはこれを実践しています。ハッシュ関数がキーに適していない場合、uthashは優雅に劣化する。

2回連続してバケット拡張を行った結果、ideal%値が50%を下回った場合、uthashはそのハッシュテーブルの拡張を禁止する。一度設定されたバケット拡張禁止フラグは、ハッシュにアイテムがある限り有効である。拡張が禁止されると、HASH_FINDの性能が一定時間より悪くなることがあります。

#### Diagnostic hooks

uthashがバケットを拡張したり、バケット拡張禁止フラグを設定した場合に実行される2つの「通知」フックがあります。これらのイベントに対して、アプリケーションがこれらのフックを設定したり、アクションを起こしたりする必要はありません。主に診断のために使用されます。通常、これらのフックは両方とも未定義であるため、コンパイルしても何も起こりません。

uthash_expand_fyiフックを定義することで、uthashがバケット拡張を行うたびにコードを実行することができます。

```c
#undef uthash_expand_fyi
#define uthash_expand_fyi(tbl) printf("expanded to %u buckets\n", tbl->num_buckets)
```

uthash_noexpand_fyi フックを定義することで、uthash がバケツ拡張禁止フラグを立てるたびにコードを実行することができます。

```c
#undef uthash_noexpand_fyi
#define uthash_noexpand_fyi(tbl) printf("warning: bucket expansion inhibited\n")
```

### フック類

これらのフックは、uthashの動作を変更したい場合にのみ使用することができます。フックは、プラットフォームによっては利用できない標準ライブラリ関数を置き換えたり、uthashのメモリ割り当て方法を変更したり、特定の内部イベントに応答してコードを実行したりするために使用できます。

uthash.h ヘッダは、これらのフックがすでに定義されていない限り、デフォルトの値で定義します。uthash.hをインクルードした後に#undefして再定義するか、インクルード前に定義するのが安全です。

メモリ管理機能の代替を指定する

デフォルトでは、uthashはメモリを管理するためにmallocとfreeを使用します。アプリケーションが独自のアロケータを使用している場合、uthashはそれらも使用することができます。

```c
#include "uthash.h"

/* undefine the defaults */
#undef uthash_malloc
#undef uthash_free

/* 再定義、代替機能の指定 */
#define uthash_malloc(sz) my_malloc(sz)
#define uthash_free(ptr, sz) my_free(ptr)

...
```

uthash_freeは2つのパラメータを受け取ることに注意してください。szパラメータは、独自のメモリを管理する組み込みプラットフォームでの便宜を図るためのものです。

#### 標準ライブラリ関数の代替を指定する

Uthashは、strlen（HASH_FIND_STR便利マクロなどで使用）、memset（メモリゼロにのみ使用）も使用します。これらの関数が提供されていないプラットフォームでは、独自の実装で代用することができます。

```c
#undef uthash_bzero
#define uthash_bzero(a, len) my_bzero(a, len)

#undef uthash_strlen
#define uthash_strlen(s) my_strlen(s)
```

#### メモリ不足

メモリ確保に失敗した場合 (すなわち uthash_malloc 関数が NULL を返した場合)、 デフォルトの動作は exit(-1) を呼び出してプロセスを終了させることです。これは、uthash_fatalマクロを再定義することで変更可能です。

```c
#undef uthash_fatal
#define uthash_fatal(msg) my_fatal_function(msg)
```

fatal関数は、プロセスを終了させるか、longjmpで安全な場所に戻る必要があります。割り当てに失敗すると、回復できない割り当てられたメモリが残る可能性があることに注意してください。uthash_fatalの後、ハッシュテーブルオブジェクトは使用不可能とみなされるべきです。この状態にあるとき、ハッシュテーブル上でHASH_CLEARを実行することさえ安全ではないかもしれません。

メモリが確保できない場合に「失敗を返す」ようにするには、uthash.hヘッダーファイルをインクルードする前にマクロHASH_NONFATAL_OOMを定義してください。この場合、uthash_fatalは使われず、割り当てに失敗するたびにuthash_nonfatal_oom(elt)が1回だけ呼び出されます。uthash_nonfatal_oomのデフォルトの動作は、no-opである。

```c
#undef uthash_nonfatal_oom
#define uthash_nonfatal_oom(elt) perhaps_recover((element_t *) elt)
```

uthash_nonfatal_oom を呼び出す前に、ハッシュテーブルは問題のある挿入が行われる前の状態にロールバックされます。uthash_nonfatal_oomハンドラからthrowまたはlongjmpするのは安全です。

ただし、HASH_SELECTからuthash_nonfatal_oomが呼び出された場合は、void*型になるので、使用前にキャストする必要があります。いずれの場合も、elt->hh.tblはNULLになります。

アロケーションの失敗は、ハッシュテーブルに要素を追加するとき（ADD、REPLACE、SELECT操作を含む）にのみ可能です。uthash_freeは失敗が許されません。

### デバッグモード

このハッシュを使用するプログラムが -DHASH_DEBUG=1 でコンパイルされた場合、特別な内部整合性チェックモードが有効になります。このモードでは、ハッシュ全体の整合性が、追加または削除の操作のたびにチェックされます。これはuthashソフトウェアのデバッグ用であり、実運用コードで使用するためのものではありません。

tests/ディレクトリで、make debugを実行すると、このモードですべてのテストが実行されます。

このモードでは、ハッシュデータ構造の内部エラーが発生すると、標準エラーにメッセージが出力され、プログラムが終了します。

UT_hash_handleデータ構造は、next、prev、hh_next、hh_prevフィールドを含む。前者の2つのフィールドは、「アプリケーション」の順序（つまり、挿入順序--アイテムが追加された順序）を決定します。後者の2つのフィールドは、「バケットチェーン」の順序を決定する。これらは、UT_hash_handleを二重にリンクされたリスト、すなわちバケツ・チェーンに結びつけます。

DHASH_DEBUG=1モードでのチェックです：

- ハッシュは、バケツ順とアプリケーション順の2回、全体を歩くことになります。
- 両方のウォークで遭遇したアイテムの合計数を、保存されている数と照合する。
- バケツ順に歩く間に、各アイテムのhh_prevポインタは、最後に訪れたアイテムと等しいかどうか比較されます。
- アプリケーションの順番に歩いている間、各アイテムの prev ポインタは、最後に訪れたアイテムと等しいかどうか比較されます。

::: info
マクロのデバッグ：

マクロの呼び出しが含まれる行のコンパイラ警告を解釈するのが難しい場合があります。uthashの場合、1つのマクロが数十行に展開されることがあります。この場合、マクロを展開してから再コンパイルするのが効果的です。そうすることで、警告メッセージはマクロ内の正確な行を参照することになります。

ここでは、マクロを展開してから再コンパイルする例を紹介します。これは、tests/サブディレクトリにあるtest1.cプログラムを使用しています。

```
gcc -E -I../src test1.c > /tmp/a.c
egrep -v '^#' /tmp/a.c > /tmp/b.c
indent /tmp/b.c
gcc -o /tmp/b /tmp/b.c
```

最後の行は、すべてのマクロを展開した元のプログラム（test1.c）をコンパイルしています。警告があった場合は、参照した行番号を /tmp/b.c で確認することができます。
:::

### スレッドの安全性

スレッド化されたプログラムでもuthashを使うことができます。ただし、ロックは自分で行う必要があります。同時書き込みから保護するために、読み書きロックを使用します。読者が同時にいても大丈夫です（uthash 1.5以降）。

例えばpthreadsを使うと、次のようにrwlockを作成することができます：

```c
pthread_rwlock_t lock;
if (pthread_rwlock_init(&lock, NULL) != 0) fatal("can't create rwlock");
```

そして、読者はHASH_FINDの呼び出しやハッシュ要素を反復処理する前に、リードロックを取得しなければなりません:

```c
if (pthread_rwlock_rdlock(&lock) != 0) fatal("can't get rdlock");
HASH_FIND_INT(elts, &i, e);
pthread_rwlock_unlock(&lock);
```

ライターは、更新を行う前に排他的書き込みロックを取得する必要があります。追加、削除、ソートはすべてロックされなければならない更新である。

```c
if (pthread_rwlock_wrlock(&lock) != 0) fatal("can't get wrlock");
HASH_DEL(elts, e);
pthread_rwlock_unlock(&lock);
```

お好みで、読み書きロックの代わりにミューテックスを使用することもできますが、この場合、読者の並行性は一度に1スレッドに低下します。

uthashを読み書きロックで使用するサンプルプログラムがtests/threads/test1.cに含まれています。

## マクロリファレンス

### 便利なマクロ

便利なマクロは、一般化されたマクロと同じことをしますが、必要な引数は少なくなります。

便利なマクロを利用するために

構造体の UT_hash_handle フィールドは hh という名前でなければならない。

addまたはfindの場合、keyフィールドはint型または`char[]`型またはポインタでなければならない。

#### 表3.便利なマクロ

macro            | arguments
-----------------|---------------------------------------------------
HASH_ADD_INT     | (head, keyfield_name, item_ptr)
HASH_REPLACE_INT | (head, keyfield_name, item_ptr, replaced_item_ptr)
HASH_FIND_INT    | (head, key_ptr, item_ptr)
HASH_ADD_STR     | (head, keyfield_name, item_ptr)
HASH_REPLACE_STR | (head, keyfield_name, item_ptr, replaced_item_ptr)
HASH_FIND_STR    | (head, key_ptr, item_ptr)
HASH_ADD_PTR     | (head, keyfield_name, item_ptr)
HASH_REPLACE_PTR | (head, keyfield_name, item_ptr, replaced_item_ptr)
HASH_FIND_PTR    | (head, key_ptr, item_ptr)
HASH_DEL         | (head, item_ptr)
HASH_SORT        | (head, cmp)
HASH_COUNT       | (head)

### 一般的なマクロ

これらのマクロは、ハッシュのアイテムを追加、検索、削除、ソートします。UT_hash_handleの名前がhh以外であったり、キーのデータ型がintや`char[]`でない場合は、一般的なマクロを使用する必要があります。

#### 表4.一般的なマクロ

macro                               | arguments
------------------------------------|---------------------------------------------------------------------------------
HASH_ADD                            | (hh_name, head, keyfield_name, key_len, item_ptr)
HASH_ADD_BYHASHVALUE                | (hh_name, head, keyfield_name, key_len, hashv, item_ptr)
HASH_ADD_KEYPTR                     | (hh_name, head, key_ptr, key_len, item_ptr)
HASH_ADD_KEYPTR_BYHASHVALUE         | (hh_name, head, key_ptr, key_len, hashv, item_ptr)
HASH_ADD_INORDER                    | (hh_name, head, keyfield_name, key_len, item_ptr, cmp)
HASH_ADD_BYHASHVALUE_INORDER        | (hh_name, head, keyfield_name, key_len, hashv, item_ptr, cmp)
HASH_ADD_KEYPTR_INORDER             | (hh_name, head, key_ptr, key_len, item_ptr, cmp)
HASH_ADD_KEYPTR_BYHASHVALUE_INORDER | (hh_name, head, key_ptr, key_len, hashv, item_ptr, cmp)
HASH_REPLACE                        | (hh_name, head, keyfield_name, key_len, item_ptr, replaced_item_ptr)
HASH_REPLACE_BYHASHVALUE            | (hh_name, head, keyfield_name, key_len, hashv, item_ptr, replaced_item_ptr)
HASH_REPLACE_INORDER                | (hh_name, head, keyfield_name, key_len, item_ptr, replaced_item_ptr, cmp)
HASH_REPLACE_BYHASHVALUE_INORDER    | (hh_name, head, keyfield_name, key_len, hashv, item_ptr, replaced_item_ptr, cmp)
HASH_FIND                           | (hh_name, head, key_ptr, key_len, item_ptr)
HASH_FIND_BYHASHVALUE               | (hh_name, head, key_ptr, key_len, hashv, item_ptr)
HASH_DELETE                         | (hh_name, head, item_ptr)
HASH_VALUE                          | (key_ptr, key_len, hashv)
HASH_SRT                            | (hh_name, head, cmp)
HASH_CNT                            | (hh_name, head)
HASH_CLEAR                          | (hh_name, head)
HASH_SELECT                         | (dst_hh_name, dst_head, src_hh_name, src_head, condition)
HASH_ITER                           | (hh_name, head, item_ptr, tmp_item_ptr)
HASH_OVERHEAD                       | (hh_name, head)

::: info
Note

HASH_ADD_KEYPTR は、構造体がキーそのものではなく、キーへのポインタを含む場合に使用します。
:::

HASH_VALUEと..._BYHASHVALUEマクロは、主に、異なるハッシュテーブルの異なる構造体が同一のキーを持つという特殊な場合のためのパフォーマンスメカニズムである。これにより、ハッシュ値を一度取得してから..._BYHASHVALUEマクロに渡すことができ、ハッシュ値の再計算にかかる費用を節約することができます。

#### Argument descriptions

name              | description
------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
hh_name           | 構造体の UT_hash_handle フィールドの名前です。従来はhhと呼ばれていた。
head              | ハッシュの「頭」として機能する構造体ポインタ変数です。ハッシュに追加される最初の項目を最初に指すので、この名前が付けられました。
keyfield_name     | 構造体のキーフィールドの名前です。(複数フィールドのキーの場合、これはキーの最初のフィールドとなります)。マクロを初めて使う人は、フィールドの名前をパラメータとして渡すのが奇妙に思えるかもしれません。注釈を参照してください。
key_len           | キーフィールドの長さをバイト数で指定します。例えば、整数キーの場合はsizeof(int)となり、文字列キーの場合はstrlen(key)となります。(マルチフィールドのキーについては、このメモを参照してください)。
key_ptr           | HASH_FINDの場合、ハッシュ内で検索するキーへのポインタです（ポインタなので、ここに直接リテラルの値を渡すことはできません）。HASH_ADD_KEYPTRの場合、これは追加される項目のキーのアドレスです。
hashv             | 指定されたキーのハッシュ値。これは、..._BYHASHVALUEマクロの入力パラメータであり、HASH_VALUEの出力パラメータです。同じキーに対して繰り返し検索を行う場合、キャッシュされたハッシュ値を再利用することで、パフォーマンスを最適化することができます。
item_ptr          | 追加、削除、置換、検索される構造体へのポインタ、または反復中の現在のポインタです。これは、HASH_ADD、HASH_DELETE、HASH_REPLACEマクロの入力パラメータであり、HASH_FINDとHASH_ITERの出力パラメータである。(HASH_ITERを使用して反復処理を行う場合、tmp_item_ptrはitem_ptrと同じ型の別の変数で、内部的に使用されます)。
replaced_item_ptr | HASH_REPLACE マクロで使用される。これは、置換された項目を指すように設定される出力パラメータである（置換された項目がない場合、NULLに設定される）。
cmp               | この関数は、2つの引数（比較する項目へのポインタ）を受け取り、最初の項目が2番目の項目の前、等しい、または後のいずれにソートすべきかを指定するintを返します（strcmpのような）。
condition         | 1つの引数(構造体へのvoidポインタ。適切な構造体タイプにキャストする必要がある)を受け取る関数またはマクロです。この関数またはマクロは、デスティネーションハッシュに追加するために構造体を「選択」する場合、0以外の値で評価される必要があります。