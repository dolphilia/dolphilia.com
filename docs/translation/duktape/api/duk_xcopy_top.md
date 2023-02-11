## duk_xcopy_top() 

1.0.0 stack slice

### プロトタイプ

```c
void duk_xcopy_top(duk_context *to_ctx, duk_context *from_ctx, duk_idx_t count);
```

### スタック

| ... | val1 | ... | valN | -> | ... | val1 | ... | valN | (on source stack, from_ctx)
| ... | -> | ... | val1 | ... | valN | (on target stack, to_ctx)

### 要約

duk_xmove_top() と同様ですが、コピーされる要素はコピー元スタックからポップアップされません。コピー元とコピー先の両方のスタックは、同じ Duktape ヒープに存在しなければなりません。

Lua の lua_xmove() と比較して、スタックからの順序とスタックへの順序が逆になっています。

### 例

```c
duk_xcopy_top(new_ctx, ctx, 7);
```

### 参照

duk_xmove_top