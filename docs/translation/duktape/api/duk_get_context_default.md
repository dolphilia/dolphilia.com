## duk_get_context_default() 

2.1.0 stack borrowed

### プロトタイプ

```c
duk_context *duk_get_context_default(duk_context *ctx, duk_idx_t idx, duk_context *def_value);
```

### スタック

| ... | val | ... |

### 要約

duk_get_context() と同様ですが、デフォルト値が明示されており、値が Duktapeスレッドでない場合、またはインデックスが無効な場合に返されます。

duk_opt_xxx() と duk_get_xxx_default() に与えられたデフォルト・ポインタの値は、Duktape によって追跡されない。例えば、 duk_opt_string() はデフォルト文字列引数のコピーを作らない。呼び出し側は、デフォルト・ポインタがその意図された用途に有効であり続けることを保証する責任があります。例えば、 duk_opt_string(ctx, 3, "localhost") は、文字列定数が常に有効であるため、問題なく動作しますが、引数が libc に割り当てられた文字列である場合、呼び出し側は、 duk_opt_string() が返すポインタが libc に割り当てられた文字列の寿命を越えて使用されないようにしなければなりません。

### 例

```c
duk_context *target_ctx;

target_ctx = duk_get_context_default(ctx, 2, default_ctx);
```

### 参照

duk_get_context