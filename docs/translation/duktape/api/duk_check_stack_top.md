## duk_check_stack_top() 

1.0.0 stack

### プロトタイプ

```c
duk_bool_t duk_check_stack_top(duk_context *ctx, duk_idx_t top);
```

### スタック

(バリュースタックに影響なし。)


### 要約

duk_check_stack() と同様であるが、呼び出し側が使用するために、 トップまでのスペースがあることを保証します。これは、(現在のスタックの先頭からの相対的な) 追加要素の数を指定して予約するよりも便利な場合があります。

呼び出し側は、呼び出し側の使用のために確保された最大のスタックトップを指定し、呼び出し側のために予約された最高値のスタックインデックスを指定しない。例えば、top が 500 の場合、呼び出し元のために予約された最高値のスタックインデックス は 499 です。

一般論として、より多くのスタックスペースを確保するために、この関数の代わりに duk_require_stack_top() を使用するべきです。バリュースタックを拡張できない場合、エラーを投げて巻き戻す以外に有用な回復策はほとんどない。


### 例

```c
if (duk_check_stack_top(ctx, 100)) {
    printf("value stack guaranteed up to index 99\n");
} else {
    printf("cannot get value stack space\n");
}
```

### 参照

duk_require_stack_top