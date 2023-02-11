## duk_get_current_magic() 

1.0.0 magic function

### プロトタイプ

```c
duk_int_t duk_get_current_magic(duk_context *ctx);
```

### スタック

(バリュースタックに影響なし)


### 要約

実行中のDuktape/C関数に関連する16ビット符号付き「マジック」値を取得します。現在起動しているものがない場合は、0が返されます。

magic関数は、同じDuktape/C関数を少し異なる動作で使用することを可能にします； 動作フラグや他のパラメータをmagicフィールドに渡すことができます。これは、動作に関連するフラグやプロパティを通常のプロパティとして関数オブジェクトに持たせるよりも低コストです。

符号なし16ビット値が必要な場合は、単純にビット単位のANDで結果を得ます。

```c
unsigned int my_flags = ((unsigned int) duk_get_current_magic(ctx)) & 0xffffU;
```

### 例

```c
duk_int_t my_flags = duk_get_current_magic(ctx);
if (my_flags & 0x01) {
    printf("flag set\n");
} else {
    printf("flag not set\n");
}
```

### 参照

duk_get_magic
duk_set_magic