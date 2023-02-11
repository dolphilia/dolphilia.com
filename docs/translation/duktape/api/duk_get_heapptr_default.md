## duk_get_heapptr_default() 

2.1.0 stack heap ptr borrowed

### プロトタイプ

```c
void *duk_get_heapptr_default(duk_context *ctx, duk_idx_t idx, void *def_value);
```

### スタック

| ... | val | ... |

### 要約

duk_get_heapptr() と同様ですが、デフォルト値が明示されており、値が boolean でない場合、あるいはインデックスが無効な場合に返されます。

duk_opt_xxx() と duk_get_xxx_default() に与えられたデフォルトポインタの値は、Duktape によって追跡されません、例えば、 duk_opt_string() は、デフォルト文字列引数のコピーを作成しません。呼び出し側は、デフォルト・ポインタがその意図された用途に有効であり続けることを保証する責任があります。例えば、 duk_opt_string(ctx, 3, "localhost") は、文字列定数が常に有効であるため、問題なく動作しますが、引数が libc に割り当てられた文字列である場合、呼び出し側は、 duk_opt_string() が返すポインタが libc に割り当てられた文字列の寿命を越えて使用されないようにしなければなりません。

### 例

```c
void *ptr;

ptr = duk_get_heapptr_default(ctx, 2, default_ptr);
```

### 参照

duk_get_heapptr