## duk_to_pointer() 

1.0.0 stack

### プロトタイプ

```c
void *duk_to_pointer(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | pointer(val) | ... |

### 要約

idxの値をポインタに強制された値で置き換えます。結果として得られる void * 値を返す。idxが無効な場合、エラーを投げます。。

強制適用ルール。

ポインタ: それ自身に強制され、変更はない。
すべてのヒープ割り当てオブジェクト（文字列、オブジェクト、バッファ）： Duktape内部ヒープ・ヘッダを指すポインタに強制されます（デバッグにのみ使用、読み書きは不可）。
その他の型：NULLに変換
このAPIコールは、実際にはデバッグにのみ有用です。特に、内部ヒープヘッダを指しているため、返されたポインタにアクセスしてはならないことに注意。これは、文字列/バッファ値の場合でも同様です。返されるポインタは、 duk_get_string() や duk_get_buffer() が返すものとは異なります。

### 例

```c
/* Don't dereference the pointer. */
printf("coerced pointer: %p\n", duk_to_pointer(ctx, -3));
```