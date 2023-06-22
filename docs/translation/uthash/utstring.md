# utstring: C言語用動的文字列マクロ

- Troy D. Hanson <tdh@tkhanson.net>
- v2.3.0, February 2021

[GitHubプロジェクトページ](https://github.com/troydhanson/uthash)へのリンクです。

## はじめに

Cプログラムのための基本的な動的文字列マクロのセットは、uthashとともに `utstring.h` に含まれています。これらを自分のCプログラムで使うには、`utstring.h`をソースディレクトリにコピーして、自分のプログラムで使うだけでよい。

```c
#include "utstring.h"
```

動的文字列は、データの挿入、連結、長さと内容の取得、部分文字列検索、クリアなどの操作をサポートしている。バイナリデータをutstringに入れることもできる。文字列の `operations,operations` を以下に示す。

一部のutstring操作は、マクロではなく関数として実装されている。

### ダウンロード

`utstring.h`ヘッダーファイルをダウンロードするには、https://github.com/troydhanson/uthash のリンクに従ってuthashをクローンするか、zipファイルを入手し、src/サブディレクトリを探す。

### BSDライセンス

このソフトウェアは、link:license.html(改訂BSDライセンス)の下で利用可能です。フリーでオープンソースです。

### プラットフォーム

`utstring`マクロは以下のプラットフォームでテストされています：

- Linux,
- Windows, using Visual Studio 2008 and Visual Studio 2010

## Usage

### Declaration

動的文字列自体は `UT_string` というデータ型を持っている。次のように宣言される。

```C
UT_string *str;
```

### New and free

次に `utstring_new` を使って文字列を作成する。文字列の作成が終わったら、`utstring_free` を使って文字列を解放する。

### マニピュレーション

`utstring_printf` または `utstring_bincpy` 演算は、文字列にデータを挿入（コピー）する。ある文字列を別の文字列に連結するには `utstring_concat` を使用する。  文字列の内容をクリアするには、 `utstring_clear` を使用する。文字列の長さは `utstring_len` から、内容は `utstring_body` から得ることができる。これは `char*` として評価される。  これが指すバッファは常にヌル終端である。そのため、文字列を期待する外部関数で直接使用することができます。この自動的なヌル終端は、文字列の長さにはカウントされない。

### サンプル

これらの例はutstringの使い方を示している。

Sample 1:

```c
#include <stdio.h>
#include "utstring.h"

int main() {
    UT_string *s;

    utstring_new(s);
    utstring_printf(s, "hello world!" );
    printf("%s\n", utstring_body(s));

    utstring_free(s);
    return 0;
}
```

次の例は、`utstring_printf`が文字列に「追加」することを示している。また、連結も示している。

Sample 2:

```c
#include <stdio.h>
#include "utstring.h"

int main() {
    UT_string *s, *t;

    utstring_new(s);
    utstring_new(t);

    utstring_printf(s, "hello " );
    utstring_printf(s, "world " );

    utstring_printf(t, "hi " );
    utstring_printf(t, "there " );

    utstring_concat(s, t);
    printf("length: %u\n", utstring_len(s));
    printf("%s\n", utstring_body(s));

    utstring_free(s);
    utstring_free(t);
    return 0;
}
```

次の例は、バイナリ・データを文字列に挿入する方法を示している。また、文字列をクリアし、そこに新しいデータをプリントする。

Sample 3:

```c
#include <stdio.h>
#include "utstring.h"

int main() {
    UT_string *s;
    char binary[] = "\xff\xff";

    utstring_new(s);
    utstring_bincpy(s, binary, sizeof(binary));
    printf("length is %u\n", utstring_len(s));

    utstring_clear(s);
    utstring_printf(s,"number %d", 10);
    printf("%s\n", utstring_body(s));

    utstring_free(s);
    return 0;
}
```

## リファレンス

これらはutstringの操作である。

### Operations

| 名前                           | 説明                                            |
|-------------------------------|-------------------------------------------------|
| utstring_new(s)               | 新しい文字列を割り当てる                            |
| utstring_renew(s)             | 新しい utstring を確保する（s が `NULL` の場合）。   |
| utstring_free(s)              | 確保したutstringを解放する                         |
| utstring_init(s)              | utstringを開始する（allocしない）                  |
| utstring_done(s)              | utstringを破棄する（allocしない）                  |
| utstring_printf(s,fmt,...)    | printfをutstringに(追加)                         |
| utstring_bincpy(s,bin,len)    | 長さlenのバイナリデータを挿入（追加）                 |
| utstring_concat(dst,src)      | src utstring を dst utstring の末尾に連結する。     |
| utstring_clear(s)             | sの内容を消去する（長さを0にする）                    |
| utstring_len(s)               | s の長さを符号なし整数で取得する。                    |
| utstring_body(s)              | char*`をsのボディに取得する（バッファは常にヌル文字で終端される） |
| utstring_find(s,pos,str,len)  | posから部分文字列を前方検索 |
| utstring_findR(s,pos,str,len) | pos から部分文字列の逆引き検索 |

### New/free vs. init/done

新しい文字列を確保したり解放したりするには `utstring_new` と `utstring_free` を使用する。UT_string が静的に割り当てられている場合は、`utstring_init` と `utstring_done` を使用して内部メモリを初期化または解放する。

### 部分文字列検索

`utstring_find`と`utstring_findR`を使用して、utstring内の部分文字列を検索する。順方向検索と逆方向検索がある。逆方向の検索では、文字列の末尾から後方にスキャンする。これらは、0（utstringの開始位置）から検索を開始する。  負の位置は文字列の末尾からカウントされるので、-1が最後の位置となる。  逆方向検索では、初期位置は検索対象の部分文字列の「末尾」に固定されることに注意。戻り値は常に、utstring 内で部分文字列が「始まる」オフセットを指す。  一致する部分文字列が見つからない場合は -1 が返される。

例えば、`s`というutstringが含まれているとする：

```c
ABC ABCDAB ABCDABCDABDE
```

そして、`ABC`の部分文字列の前方検索と後方検索を行うと、次のような結果が得られる：

```c
utstring_find(  s, -9, "ABC", 3 ) = 15
utstring_find(  s,  3, "ABC", 3 ) =  4
utstring_find(  s, 16, "ABC", 3 ) = -1
utstring_findR( s, -9, "ABC", 3 ) = 11
utstring_findR( s, 12, "ABC", 3 ) =  4
utstring_findR( s,  2, "ABC", 3 ) =  0
```

### 「複数使用」部分文字列検索

前述の例では、部分文字列マッチングの "シングルユース "バージョンを示しており、内部でKMP（Knuth-Morris-Pratt）テーブルが構築され、検索後に解放されます。ある部分文字列に対して何度も検索を実行する必要がある場合は、 KMP テーブルを保存して再利用する方が効率的です。

KMP テーブルを再利用するには、手動でテーブルを作成し、それを内部検索関数に渡します。関係する関数は次のとおりです：

```C
_utstring_BuildTable  (build the KMP table for a forward search)
_utstring_BuildTableR (build the KMP table for a reverse search)
_utstring_find        (forward search using a prebuilt KMP table)
_utstring_findR       (reverse search using a prebuilt KMP table)
```

これは、"ABC "という部分文字列に対してフォワードKMPテーブルを作成し、それを検索に使用する例である：

```c
long *KPM_TABLE, offset;
KPM_TABLE = (long *)malloc( sizeof(long) * (strlen("ABC")) + 1));
_utstring_BuildTable("ABC", 3, KPM_TABLE);
offset = _utstring_find(utstring_body(s), utstring_len(s), "ABC", 3, KPM_TABLE );
free(KPM_TABLE);
```

内部の `_utstring_find` は、開始位置ではなく、UT_string の長さを第2引数として持っていることに注意してください。文字列の開始アドレスに加算し、その長さから減算することで、位置パラメータをエミュレートすることができる。

### 備考

1. デフォルトのメモリ不足時の処理`（exit(-1)`を呼び出す）をオーバーライドするには、 `utstring.h` をインクルードする前に `utstring_oom()` マクロをオーバーライドしてください。例えば

```c
#define utstring_oom() do { longjmp(error_handling_location); } while (0)
...
#include "utstring.h"
```
