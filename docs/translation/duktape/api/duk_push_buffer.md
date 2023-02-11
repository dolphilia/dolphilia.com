## duk_push_buffer() 

1.0.0 stack buffer

### プロトタイプ

```c
void *duk_push_buffer(duk_context *ctx, duk_size_t size, duk_bool_t dynamic);
```

### スタック

| ... | -> | ... | buf |

### 要約

サイズbyteの新しいバッファを割り当て、それをバリュースタックにプッシュします。ゼロサイズのバッファの場合、NULLまたは非NULLを返します。バッファデータ領域は自動的にゼロになります。dynamicが0でない場合，バッファはサイズ変更可能であり，そうでなければバッファは固定サイズになります。割り当てに失敗した場合は，エラーをスローします。

duk_push_fixed_buffer() と duk_push_dynamic_buffer() というショートカットも存在します。

動的バッファは、内部的に 2 つのメモリ割り当てを必要とします: 1 つはバッファヘッダ用、もう 1 つは現在割り当てられているデータエリア用です。固定バッファでは、バッファヘッダの後にデータ領域が続くため、1つのメモリ割り当てで済みます。
NULLデータ・ポインタはエラーではありませんし、呼び出し元のコードを混乱させることもありません。
Duktape は、割り当てられたバッファ・データの自動ゼロ化機能を無効にする設定オプショ ンを付けてコンパイルすることができます（ゼロ化機能はデフォルトです）。この場合、必要に応じて手動でバッファをゼロにする必要があります。

### 例

```c
/* Allocate a fixed buffer of 1024 bytes.  There is no need to check for
 * the return value: an error is thrown if allocation fails.
 */

void *p;

p = duk_push_buffer(ctx, 1024, 0);
printf("allocated buffer, data area: %p\n", p);
```

### 参照

duk_push_fixed_buffer
duk_push_dynamic_buffer
duk_push_external_buffer