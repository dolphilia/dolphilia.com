# utlist: C構造体用リンクリストマクロ

- Troy D. Hanson <tdh@tkhanson.net>
- v2.3.0, February 2021

[GitHubプロジェクトページ](https://github.com/troydhanson/uthash)へのリンクです。

## はじめに

`utlist.h`には、uthashと一緒にCの構造体のための汎用の「リンクリスト」マクロが含まれている。これらのマクロを自分のCプログラムで使うには、`utlist.h`をソースディレクトリにコピーして、自分のプログラムで使うだけでよい。

```c
#include "utlist.h"
```

これらのマクロは、基本的なリンクリストの操作（要素の追加と削除、ソート、繰り返し）をサポートしている。

### ダウンロード

`utlist.h`ヘッダーファイルをダウンロードするには、https://github.com/troydhanson/uthash のリンクに従ってuthashをクローンするか、zipファイルを入手し、src/サブディレクトリを探す。

### BSDライセンス

このソフトウェアは、license.html (revised BSD license)というリンクの下で利用可能です。フリーでオープンソースです。

### プラットフォーム

utlist マクロは以下のプラットフォームでテストされている：

- Linux
- Mac OS X
- Windows, using Visual Studio 2008, Visual Studio 2010, or Cygwin/MinGW.

## utlistを使う

### リストの種類

3種類のリンクリストがサポートされている：

- *singly-linked* リスト
- *doubly-linked* リスト
- *circular, doubly-linked* リスト

#### 効率性

__要素の前置__:

すべてのリストタイプで一定時間。

__追加__

単一連結リストでは'O(n)'、二重連結リストでは定数時間。(2重リンクリストのutlist実装では、`head->prev`に末尾ポインタを保持するので、追加を定数時間で行うことができる)。

__エレメントの削除__

一重連結リストでは'O(n)'、二重連結リストでは定数時間。

__ソート__

すべてのリストタイプで'O(n log(n))'。

__順番に挿入（ソートされたリストの場合）__

すべてのリストタイプで「O(n)」。

__反復、カウント、検索__

すべてのリストタイプで「O(n)」。

### リスト要素

これらのマクロでは、構造体に `next` ポインタが含まれていれば、どのような構造体でも使用することができます。二重にリンクされたリストを作りたい場合は、要素にも `prev` ポインタが必要です。

```c
typedef struct element {
    char *name;
    struct element *prev; /* 二重リンクリストにのみ必要 */
    struct element *next; /* 単一または二重リンクリストに必要 */
} element;
```

構造体の名前は何でもいい。上の例では`element`と呼んでいる。特定のリスト内では、すべての要素は同じ型でなければならない。

##### 柔軟な前/次ネーミング

prev`と`next`のポインタには別の名前をつけることができる。その場合、同じように動作するが、これらの名前を追加引数として受け取る flex_names,family of macrosがある。

### リストヘッド

リストヘッドは、単にエレメント構造へのポインターである。名前は何でもよい。NULL`で初期化しなければならない。

```c
element *head = NULL;
```

### リスト操作

リストは、要素の挿入や削除、要素のソート、要素の反復処理をサポートしている。

|Singly-linked             | Doubly-linked              | Circular, doubly-linked |
|---|---|--- |
|LL_PREPEND(head,add);     | DL_PREPEND(head,add);      | CDL_PREPEND(head,add); |
|LL_PREPEND_ELEM(head,ref,add); | DL_PREPEND_ELEM(head,ref,add); | CDL_PREPEND_ELEM(head,ref,add); |
|LL_APPEND_ELEM(head,ref,add); | DL_APPEND_ELEM(head,ref,add); | CDL_APPEND_ELEM(head,ref,add); |
|LL_REPLACE_ELEM(head,del,add); | DL_REPLACE_ELEM(head,del,add); | CDL_REPLACE_ELEM(head,del,add); |
|LL_APPEND(head,add);      | DL_APPEND(head,add);       | CDL_APPEND(head,add); |
|LL_INSERT_INORDER(head,add,cmp); | DL_INSERT_INORDER(head,add,cmp); | CDL_INSERT_INORDER(head,add,cmp); |
|LL_CONCAT(head1,head2);   | DL_CONCAT(head1,head2);    | |
|LL_DELETE(head,del);      | DL_DELETE(head,del);       | CDL_DELETE(head,del); |
|LL_SORT(head,cmp);        | DL_SORT(head,cmp);         | CDL_SORT(head,cmp); |
|LL_FOREACH(head,elt) {...}| DL_FOREACH(head,elt) {...} | CDL_FOREACH(head,elt) {...} |
|LL_FOREACH_SAFE(head,elt,tmp) {...}| DL_FOREACH_SAFE(head,elt,tmp) {...} | CDL_FOREACH_SAFE(head,elt,tmp1,tmp2) {...} |
|LL_SEARCH_SCALAR(head,elt,mbr,val);| DL_SEARCH_SCALAR(head,elt,mbr,val); | CDL_SEARCH_SCALAR(head,elt,mbr,val); |
|LL_SEARCH(head,elt,like,cmp);| DL_SEARCH(head,elt,like,cmp); | CDL_SEARCH(head,elt,like,cmp); |
|LL_LOWER_BOUND(head,elt,like,cmp); | DL_LOWER_BOUND(head,elt,like,cmp); | CDL_LOWER_BOUND(head,elt,like,cmp); |
|LL_COUNT(head,elt,count); | DL_COUNT(head,elt,count);  | CDL_COUNT(head,elt,count); |


Prependとは、既存のリストの先頭に要素を挿入し、リストの先頭を新しい要素に変更することです。

Appendとは、リストの末尾に要素を追加し、それが新しい末尾の要素になることを意味します。

Concatenate は適切に作成された2つのリストを受け取り、2番目のリストを1番目のリストに追加します。  (Visual Studio 2008は `LL_CONCAT` と `DL_CONCAT` をサポートしていませんが、VS2010は大丈夫です)。

リストの先頭ではなく、任意の要素の前に前置するには、 `_PREPEND_ELEM` マクロファミリを使用します。リストの先頭ではなく、任意の要素の後に追加するには、 `_APPEND_ELEM` マクロファミリを使用する。任意のリスト要素を別の要素で「置換」するには `_REPLACE_ELEM` マクロファミリを使用する。

ソート操作はメモリ上の要素を移動させることはなく、各要素の `prev` と `next` ポインタを変更してリストの順番を調整するだけである。また、ソート操作はリストの先頭が新しい要素を指すように変更することもできます。

foreach は、リストの先頭から末尾までを簡単に反復処理するためのものです。使用例を以下に示す。もちろん、'foreach' マクロを使う代わりに `prev` と `next` ポインタを直接使うこともできる。

foreach_safe 演算は、繰り返し処理中にリスト要素を削除する場合に使用する。

search は、特定の要素を探すための反復処理のショートカットである。各要素を手作業で反復してテストするよりも速いわけではない。スカラー」バージョンは、与えられた構造体メンバに対して単純な等式テストを使用して要素を検索します。一般的なバージョンは、`cmp`関数を使用してリスト内の他のすべての要素を比較します。

lower_bound は、指定された `cmp` 関数に従って、指定された `like` 要素よりも大きくないリストの最初の要素を見つける。つまり、適切な挿入ポイントがリストの先頭にある場合は `elt=NULL` となり、適切な挿入ポイントが `p` と `p->next` の間にある場合は `elt=p` となる。

count は、リストを反復処理し、指定されたカウンターをインクリメントする。

上の表に示したパラメータについて、ここで説明する。

__head__:

リストの先頭（リスト要素構造へのポインタ）。

__add__:

リストに追加するリスト要素構造へのポインタ。

__del__:

リストから置換または削除するリスト要素構造へのポインタ。

__elt__:

反復マクロの場合、各リスト要素に連続して割り当てられるポインタ（例を参照）。

__ref__:

prepend および append 操作のための参照要素。ref` がポインタで値が NULL の場合、_PREPEND_ELEM() 操作では新しい要素がリストに追加され、_APPEND_ELEM() 操作では新しい要素が先頭に追加される。代わりに_PREPEND()と_APPEND()マクロファミリーを使用する。

__like__:

検索マクロがマッチを求める `elt` と同じ型の要素ポインタである（マッチが見つかれば `elt` に格納される）。一致するかどうかは、与えられた `cmp` 関数によって決定される。

__cmp__:

比較関数へのポインタです。この関数は2つの引数を受け取りますが、これらは比較される2つの要素構造へのポインタです。比較関数は `int` を返さなければならない。この `int` は負、0、または正であり、それぞれ最初の項目が2番目の項目の前、等しい、または後にソートされるべきかを指定する。(つまり、 `strcmp` で使用されるのと同じ規則である)。Visual Studio 2008では、2つの引数を `void *` として宣言し、実際の型にキャストする必要があるかもしれないことに注意しよう。

__tmp__:

`elt`と同じ型のポインタ。内部的に使用される。初期化する必要はない。

__mbr__:

スカラーサーチマクロでは、構造体 `elt` 内のメンバ名で、値 `val` と等しいかどうかを（`==` を使って）テストします。

__val__:

スカラー検索マクロでは、検索対象の要素の（構造体メンバ `field` の）値を指定する。

__count__:

リストの長さに設定される整数。

### 例

このサンプル・プログラムはテキスト・ファイルから名前を読み込み（1行に1つの名前）、それぞれの名前を2重にリンクされたリストに追加する。そして、ソートして表示する。

#### 二重にリンクされたリスト

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "utlist.h"

#define BUFLEN 20

typedef struct el {
    char bname[BUFLEN];
    struct el *next, *prev;
} el;

int namecmp(el *a, el *b) {
    return strcmp(a->bname,b->bname);
}

el *head = NULL; /* 重要 - NULLに初期化する！ */

int main(int argc, char *argv[]) {
    el *name, *elt, *tmp, etmp;

    char linebuf[BUFLEN];
    int count;
    FILE *file;

    if ( (file = fopen( "test11.dat", "r" )) == NULL ) {
        perror("can't open: ");
        exit(-1);
    }

    while (fgets(linebuf,BUFLEN,file) != NULL) {
        if ( (name = (el *)malloc(sizeof *name)) == NULL) exit(-1);
        strcpy(name->bname, linebuf);
        DL_APPEND(head, name);
    }
    DL_SORT(head, namecmp);
    DL_FOREACH(head,elt) printf("%s", elt->bname);
    DL_COUNT(head, elt, count);
    printf("%d number of elements in list\n", count);

    memcpy(&etmp.bname, "WES\n", 5);
    DL_SEARCH(head,elt,&etmp,namecmp);
    if (elt) printf("found %s\n", elt->bname);

    /* 各要素を削除するには、安全なイテレータを使用する。 */
    DL_FOREACH_SAFE(head,elt,tmp) {
      DL_DELETE(head,elt);
      free(elt);
    }

    fclose(file);

    return 0;
}
```


### prevとnextの他の呼び方

もし `prev` と `next` フィールドの名前が別のものであれば、別のマクロを使わなければならない。これらのマクロは通常のマクロと同じように動作しますが、フィールド名を追加パラメータとして受け取ります。

これらの「柔軟なフィールド名」マクロを以下に示す。これらはすべて`2`で終わります。それぞれは `2` を除いたものと同じ動作をしますが、末尾の引数として `prev` と `next` フィールド名（必要に応じて）を受け取ります。

|Singly-linked                             | Doubly-linked                               | Circular, doubly-linked |
|---|---|---|
|LL_PREPEND2(head,add,next);               | DL_PREPEND2(head,add,prev,next);            | CDL_PREPEND2(head,add,prev,next); |
|LL_PREPEND_ELEM2(head,ref,add,next);      | DL_PREPEND_ELEM2(head,ref,add,prev,next);   | CDL_PREPEND_ELEM2(head,ref,add,prev,next); |
|LL_APPEND_ELEM2(head,ref,add,next);       | DL_APPEND_ELEM2(head,ref,add,prev,next);    | CDL_APPEND_ELEM2(head,ref,add,prev,next); |
|LL_REPLACE_ELEM2(head,del,add,next);      | DL_REPLACE_ELEM2(head,del,add,prev,next);   | CDL_REPLACE_ELEM2(head,del,add,prev,next); |
|LL_APPEND2(head,add,next);                | DL_APPEND2(head,add,prev,next);             | CDL_APPEND2(head,add,prev,next); |
|LL_INSERT_INORDER2(head,add,cmp,next);    | DL_INSERT_INORDER2(head,add,cmp,prev,next); | CDL_INSERT_INORDER2(head,add,cmp,prev,next); |
|LL_CONCAT2(head1,head2,next);             | DL_CONCAT2(head1,head2,prev,next);          | |
|LL_DELETE2(head,del,next);                | DL_DELETE2(head,del,prev,next);             | CDL_DELETE2(head,del,prev,next); |
|LL_SORT2(head,cmp,next);                  | DL_SORT2(head,cmp,prev,next);               | CDL_SORT2(head,cmp,prev,next); |
|LL_FOREACH2(head,elt,next) {...}          | DL_FOREACH2(head,elt,next) {...}            | CDL_FOREACH2(head,elt,next) {...} |
|LL_FOREACH_SAFE2(head,elt,tmp,next) {...} | DL_FOREACH_SAFE2(head,elt,tmp,next) {...}   | CDL_FOREACH_SAFE2(head,elt,tmp1,tmp2,prev,next) {...} |
|LL_SEARCH_SCALAR2(head,elt,mbr,val,next); | DL_SEARCH_SCALAR2(head,elt,mbr,val,next);   | CDL_SEARCH_SCALAR2(head,elt,mbr,val,next); |
|LL_SEARCH2(head,elt,like,cmp,next);       | DL_SEARCH2(head,elt,like,cmp,next);         | CDL_SEARCH2(head,elt,like,cmp,next); |
|LL_LOWER_BOUND2(head,elt,like,cmp,next);  | DL_LOWER_BOUND2(head,elt,like,cmp,next);    | CDL_LOWER_BOUND2(head,elt,like,cmp,next); |
|LL_COUNT2(head,elt,count,next);           | DL_COUNT2(head,elt,count,next);             | CDL_COUNT2(head,elt,count,next); |
