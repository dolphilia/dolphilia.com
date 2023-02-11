## duk_buffer_to_string() 

2.0.0 string stack buffer

### プロトタイプ

```c
const char *duk_buffer_to_string(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | buffer_to_string(val) | ... |

### 要約

idx のバッファ値 (プレーンバッファまたは任意のバッファオブジェクト) を、内部バイト表現がバッファから 1:1 で取得される文字列に置き換えます (バッファデータが duk_push_lstring() でプッシュされた場合と同じです)。読み取り専用でNUL終端の文字列データへの非NULLポインタを返します。(1) 引数がバッファ値でない場合、(2) 引数がバッファオブジェクトで、そのバッキングバッファが見かけのバッファサイズをカバーしていない場合、(3) インデックスが無効な場合、TypeError がスローされます。

バッファデータはそのまま文字列の生成に使用されるため、本APIコールでは、バッファデータのサニタイズ処理を行わない限り、Symbol値の生成は可能です。

カスタムの型強制については、型変換とテストに記載されています。

Duktape 2.0以降、バッファ値に対するduk_to_string()の強制は、通常"[object Uint8Array]" のようになりますが、これは通常意図されたものではありません。

### 例

```c
unsigned char *ptr;
ptr = (unsigned char *) duk_push_fixed_buffer(ctx, 4);
ptr[0] = 0x61;
ptr[1] = 0x62;
ptr[2] = 0x63;
ptr[3] = 0x64;  /* 61 62 63 64 */
printf("coerced string: %s\n", duk_buffer_to_string(ctx, -1));
duk_pop(ctx);
```
