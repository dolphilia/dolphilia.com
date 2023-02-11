## duk_opt_pointer() 

2.1.0 stack

### プロトタイプ

```c
void *duk_opt_pointer(duk_context *ctx, duk_idx_t idx, void *def_value);
```

### スタック

| ... | val | ... |

### 要約

idxのポインタ値を、値を変更したり強制したりすることなく、void * として取得します。値が未定義であるか、インデックスが無効である場合、def_value デフォルト値が返されます。その他の場合（ヌルまたは非マッチ型）は，エラーを投げます。。


### 例

```c
void *ptr;

ptr = duk_opt_pointer(ctx, -3, (void *) 0x12345678);
printf("my pointer is: %p\n", ptr);
```