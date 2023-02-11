## duk_require_stack_top() 

1.0.0 stack

### プロトタイプ

```c
void duk_require_stack_top(duk_context *ctx, duk_idx_t top);
```

### スタック

(バリュースタックに影響なし。)


### 要約

duk_check_stack_top() と同様ですが、バリュースタックを再割り当てする必要があり、再割り当てに失敗した場合にエラーがスローされます。

一般的なルールとして、呼び出し側はより多くのスタック空間を確保するためにこの関数を使用すべきです。バリュースタックを拡張できない場合、エラーを投げて巻き戻す以外に有用な回復策はほとんどない。


### 例

```c
duk_require_stack_top(ctx, 100);
printf("value stack guaranteed up to index 99\n");
```

### 参照

duk_check_stack_top