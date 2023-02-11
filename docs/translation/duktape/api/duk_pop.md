## duk_pop() 

1.0.0 stack

### プロトタイプ

```c
void duk_pop(duk_context *ctx);
```

### スタック

| ... | val | -> | ... |

### 要約

スタックから要素を1つ取り出します。スタックが空の場合、エラーを投げます。。

複数の要素をポップするには、duk_pop_n() または、よくある場合のショートカットである duk_pop_2() と duk_pop_3() を使用します。


### 例

```c
duk_pop(ctx);
```

### 参照

duk_pop_2
duk_pop_3
duk_pop_n