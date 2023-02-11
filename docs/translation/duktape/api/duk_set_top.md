## duk_set_top() 

1.0.0 stack

### プロトタイプ

```c
void duk_set_top(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | -> | ... |

### 要約

スタックトップ（スタックサイズ）を引数idxに一致するように設定し、負のインデックス値を正規化します。バリュースタックが縮小する場合、新しいスタックトップより上の値は削除されます。バリュースタックが拡大する場合、未定義の値は新しいスタックスロットにプッシュされます。

負のインデックス値は、他のAPIコールと同様に、現在のスタックトップを基準として解釈されます。例えば、インデックス -1 は、スタックトップを 1 つ減らすことになります。


### 例

```c
/* Assume stack is empty initially. */

duk_push_int(ctx, 123);  /* -> top=1, stack: [ 123 ] */
duk_set_top(ctx, 3);     /* -> top=3, stack: [ 123 undefined undefined ] */
duk_set_top(ctx, -1);    /* -> top=2, stack: [ 123 undefined ] */
duk_set_top(ctx, 0);     /* -> top=0, stack: [ ] */
```