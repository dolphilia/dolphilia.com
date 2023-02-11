## duk_opt_string() 

2.1.0 string stack

### プロトタイプ

```c
const char *duk_opt_string(duk_context *ctx, duk_idx_t idx, const char *def_ptr);
```

### スタック

| ... | val | ... |

### 要約

idx にある文字列の文字データポインタを、値を変更したり強制したりすることなく取得します。読み取り専用でNUL終端の文字列データへのNULLでないポインタを返す。値が未定義であるか、インデックスが無効である場合、def_ptrのデフォルト値が返されます。その他の場合（NULLまたは型が一致しない場合）は，エラーを投げます。。

文字列のバイト長を明示的に得るには（文字列に NUL 文字が埋め込まれている場合に有効）、 duk_opt_lstring() を使用します。

これは、バッファデータポインタの扱い方とは異なります(技術的な理由による)。
duk_opt_xxx() と duk_get_xxx_default() に与えられたデフォルトポインタの値は、Duktape によって追跡されません、例えば、 duk_opt_string() は、デフォルト文字列引数のコピーを作成しません。呼び出し側は、デフォルト・ポインタがその意図された用途に有効であり続けることを保証する責任があります。例えば、 duk_opt_string(ctx, 3, "localhost") は、文字列定数が常に有効であるため、問題なく動作しますが、引数が libc で割り当てられた文字列の場合、呼び出し側は duk_opt_string() から返されたポインタが libc で割り当てられた文字列の寿命以上に使われないようにする必要があります。
シンボル値は C API では文字列として見えるので、 duk_is_symbol() と duk_is_string() の両方が真となります。この動作は、Duktape 1.xの内部文字列と同様です。duk_is_symbol()を使えば、シンボルを普通の文字列と区別することができます。内部表現については、symbols.rstを参照してください。

### 例

```c
const char *host = duk_opt_string(ctx, 3, "localhost");
```

### 参照

duk_opt_lstring