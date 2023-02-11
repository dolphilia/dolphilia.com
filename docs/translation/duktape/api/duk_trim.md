## duk_trim() 

1.0.0 string stack

### プロトタイプ

```c
void duk_trim(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | str | ... | -> | ... | trimmed_str | ... |

### 要約

idxの文字列をトリミングします。idx の値が文字列でない場合、またはインデックスが無効な場合は、エラーを投げます。。

トリミングは、文字列の先頭と末尾の空白文字を削除します。文字列がすべて空白文字で構成されている場合、結果は空文字列となります。ホワイトスペースとみなされる文字のセットは、WhiteSpaceとLineTerminatorの両方を含むStrWhiteSpaceプロダクションによって定義されます。トリミングの動作は String.prototype.trim(), parseInt(), parseFloat() の動作と一致します。


### 例

```c
duk_trim(ctx, -3);
```