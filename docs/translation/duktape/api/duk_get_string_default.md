## duk_get_string_default() 

2.1.0 string stack

### プロトタイプ

```c
const char *duk_get_string_default(duk_context *ctx, duk_idx_t idx, const char *def_value);
```

### スタック

| ... | val | ... |

### 要約

duk_get_string() と同様ですが、デフォルト値が明示されており、値が文字列でない場合、あるいはインデックスが無効な場合に返されます。

duk_opt_xxx() と duk_get_xxx_default() に与えられたデフォルトポインタの値は、Duktape によって追跡されません、例えば、 duk_opt_string() は、デフォルト文字列引数のコピーを作成しません。呼び出し側は、デフォルト・ポインタがその意図された用途に有効であり続けることを保証する責任があります。例えば、 duk_opt_string(ctx, 3, "localhost") は、文字列定数が常に有効であるため、問題なく動作しますが、引数が libc に割り当てられた文字列である場合、呼び出し側は、 duk_opt_string() が返すポインタが libc に割り当てられた文字列の寿命を越えて使用されないようにしなければなりません。

### 例

```c
const char *host = duk_get_string_default(ctx, 3, "localhost");
```

### 参照

duk_get_lstring_default