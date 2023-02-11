## duk_require_stack() 

1.0.0 stack

### プロトタイプ

```c
void duk_require_stack(duk_context *ctx, duk_idx_t extra);
```

### スタック

(バリュースタックに影響なし。)


### 要約

duk_check_stack() と同様ですが、バリュースタックを再割り当てする必要があり、再割り当てに失敗した場合にエラーがスローされます。

一般的なルールとして、呼び出し側はより多くのスタック空間を確保するためにこの関数を使用する必要があります。バリュースタックを拡張できない場合、エラーを投げてアンワインドする以外、有用な回復策はほとんどない。


### 例

```c
duk_idx_t nargs;

nargs = duk_get_top(ctx);  /* number or arguments */

/* reserve space for one temporary for each input argument */
duk_require_stack(ctx, nargs);
```

### 参照

duk_check_stack