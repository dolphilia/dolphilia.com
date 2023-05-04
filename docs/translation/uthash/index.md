# uthash

C言語の構造体であれば、uthashを使ってハッシュテーブルに格納することができます。構造体にUT_hash_handleを追加し、キーとして機能するように構造体の1つ以上のフィールドを選択するだけです。次に、これらのマクロを使用して、ハッシュテーブルから項目を格納、取得、削除します。

例1．ハッシュに項目を追加する。

```c
#include "uthash.h"

struct my_struct {
    int id;            /* このフィールドをキーとして使用します */
    char name[10];
    UT_hash_handle hh; /* この構造体をハッシャブルにする */
};

struct my_struct *users = NULL;

void add_user(struct my_struct *s) {
    HASH_ADD_INT( users, id, s );
}
```

例2.ハッシュの中の項目を調べる。

```c
struct my_struct *find_user(int user_id) {
    struct my_struct *s;

    HASH_FIND_INT( users, &user_id, s );
    return s;
}
```

例3．ハッシュから項目を削除する。

```c
void delete_user(struct my_struct *user) {
    HASH_DEL( users, user);
}
```

詳細や使用例については、「ユーザーガイド」をご覧ください。