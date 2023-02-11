## duk_put_number_list() 

1.0.0 property module

### プロトタイプ

```c
void duk_put_number_list(duk_context *ctx, duk_idx_t obj_idx, const duk_number_list_entry *numbers);
```

### スタック

| ... | obj | ... | -> | ... | obj | ... |

### 要約

複数の数値（double）プロパティを obj_idx にあるターゲットオブジェクトに設定します。数値リストは、(name, number) のペアのリストとして与えられ、name が NULL であるペアで終了します。

これは、C言語で実装されたモジュールやクラスで数値定数を定義する場合などに有用です。


### 例

```c
const duk_number_list_entry my_module_consts[] = {
    { "FLAG_FOO", (double) (1 << 0) },
    { "FLAG_BAR", (double) (1 << 1) },
    { "FLAG_QUUX", (double) (1 << 2) },
    { "DELAY", 300.0 },
    { NULL, 0.0 }
};

duk_put_number_list(ctx, -3, my_module_consts);
```

### 参照

duk_put_function_list