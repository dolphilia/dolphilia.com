## duk_push_external_buffer() 

1.3.0 stack buffer

### プロトタイプ

```c
void duk_push_external_buffer(duk_context *ctx);
```

### スタック

| ... | -> | ... | buf |

### 要約

外部バッファを割り当て、それをバリュースタックにプッシュします。外部バッファとは、Duktape がメモリ管理していない、ユーザが割り当てた外部バッファを指します。最初の外部バッファ・ポインタは NULL で、サイズは 0 です。duk_config_buffer() を使って、外部バッファのポインタとサイズを更新することができます。

外部バッファは ECMAScript コードが外部で割り当てられたデータ構造にアクセスできるようにするのに便利です。例えば、外部で割り当てられたフレームバッファにバイトを書き込むために使用することができます。外部バッファにはアライメント要件がありません（Duktapeはアクセスする際にアライメントの仮定を行いません）。


### 例

```c
void *p;
duk_size_t len;

/* Allocate a frame buffer from a hypothetical graphics library.
 * The frame buffer is allocated outside of Duktape.
 */
p = allocate_frame_buffer(1920 /*width*/, 1080 /*height*/);
len = 1920 * 1080 * 4;

/* Create an external buffer pointing to the frame buffer. */
duk_push_external_buffer(ctx);
duk_config_buffer(ctx, -1, p, len);

/* ECMAScript code with access to the buffer object could now do
 * something like:
 *
 *    buf[100] = 123;
 *
 * Calling code must make sure ECMAScript never reads/writes an
 * external buffer whose backing buffer is no longer valid.
 */
```

### 参照

duk_config_buffer