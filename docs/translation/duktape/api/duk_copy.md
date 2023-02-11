## duk_copy() 

1.0.0 stack

### プロトタイプ

```c
void duk_copy(duk_context *ctx, duk_idx_t from_idx, duk_idx_t to_idx);
```

### スタック

| ... | old(to_idx) | ... | val(from_idx) | ... | -> | ... | val(to_idx) | ... | val(from_idx) | ... |

### 要約

from_idxからto_idxに値をコピーし、前の値を上書きします。どちらかのインデックスが無効な場合、エラーを投げます。。

これは，以下の略記法です。

```c
/* to_index must be normalized in case it is negative and would change its
 * meaning after duk_dup().
 */
to_idx = duk_normalize_idx(ctx, to_idx);
duk_dup(ctx, from_idx);
duk_replace(ctx, to_idx);
```

### 例

```c
duk_copy(ctx, -3, 1);
```

### 参照

duk_insert
duk_replace