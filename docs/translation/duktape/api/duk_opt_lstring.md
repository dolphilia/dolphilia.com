## duk_opt_lstring() 

2.1.0 string stack

### プロトタイプ

```c
const char *duk_opt_lstring(duk_context *ctx, duk_idx_t idx, duk_size_t *out_len, const char *def_ptr, duk_size_t def_len);
```

### スタック

| ... | val | ... |

### 要約

idx にある文字列の文字データポインタと長さを、値を変更したり強制したりすることなく取得します。読み取り専用でNUL終端の文字列データへの非NULLポインタを返し、文字列のバイト長を *out_len に書き込む (out_len が非NULLの場合)。値が未定義またはインデックスが無効な場合、def_ptr のデフォルト値が返され、 def_len のデフォルト長が *out_len に書き込まれる (out_len が NULL でない場合)。その他の場合(NULLまたは型が一致しない場合)はエラーを投げます。。

これは、バッファデータポインタの扱い方とは異なります(技術的な理由による)。
duk_opt_xxx() と duk_get_xxx_default() に与えられたデフォルトポインタの値は、Duktape によって追跡されません、例えば、 duk_opt_string() は、デフォルト文字列引数のコピーを作成しません。呼び出し側は、デフォルト・ポインタがその意図された用途に有効であり続けることを保証する責任があります。例えば、 duk_opt_string(ctx, 3, "localhost") は、文字列定数が常に有効であるため、問題なく動作しますが、引数が libc に割り当てられた文字列である場合、呼び出し側は、 duk_opt_string() が返すポインタが libc に割り当てられた文字列の寿命を越えて使用されないようにしなければなりません。

### 例

```c
const char *str;
duk_size_t len;

str = duk_opt_lstring(ctx, -3, &len, "foo" "\x00" "bar", 7);
```

### 参照

duk_opt_string