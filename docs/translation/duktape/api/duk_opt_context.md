## duk_opt_context() 

2.1.0 stack borrowed

### プロトタイプ

```c
duk_context *duk_opt_context(duk_context *ctx, duk_idx_t idx, duk_context *def_value);
```

### スタック

| ... | val | ... |

### 要約

idxにあるDuktapeスレッドのコンテキスト・ポインタを取得します。値が未定義であるか、インデックスが無効な場合、def_value デフォルト値が返されます。その他の場合（NULLまたは型が一致しない）には、エラーを投げます。

duk_opt_xxx() と duk_get_xxx_default() に与えられたデフォルト・ポインタ値は、Duktape によって追跡されません、例えば、 duk_opt_string() は、デフォルト文字列引数のコピーを作成しません。呼び出し側は、デフォルト・ポインタがその意図された用途に有効であり続けることを保証する責任があります。例えば、 duk_opt_string(ctx, 3, "localhost") は、文字列定数が常に有効であるため、問題なく動作しますが、引数が libc に割り当てられた文字列である場合、呼び出し側は、 duk_opt_string() が返すポインタが libc に割り当てられた文字列の寿命を越えて使用されないようにしなければなりません。

### 例

```c
duk_context *target_ctx;

target_ctx = duk_opt_context(ctx, 2, default_ctx);
```