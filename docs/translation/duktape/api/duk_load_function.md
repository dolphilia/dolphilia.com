## duk_load_function() 

1.3.0 stack byte code

### プロトタイプ

```c
void duk_load_function(duk_context *ctx);
```

### スタック

| ... | bytecode | -> | ... | function |

### 要約

バイトコードを含むバッファをロードし、オリジナルのECMAScript関数を再現します（いくつかの制限付き）。バイトコードが互換性のあるDuktapeのバージョンでダンプされ、それ以降にバイトコードが変更されていないことを確認する必要があります。信頼できないソースからバイトコードをロードすると、メモリが安全でなくなり、悪用可能な脆弱性につながる可能性があります。

Duktapeのバイトコードダンプ/ロード、サポートされている機能、既知の制限に関するより詳細な情報は、bytecode.rstを参照してください。Duktapeバイトコード・フォーマットは難読化を意図したものではないので、難読化についての注意を参照してください。

### 例

```c
duk_eval_string(ctx, "(function helloWorld() { print('hello world'); })");
duk_dump_function(ctx);
/* stack top now contains a buffer containing helloWorld bytecode */

duk_load_function(ctx);  /* [ ... bytecode ] -> [ ... function ] */
duk_call(ctx, 0);
duk_pop(ctx);
```

### 参照

duk_dump_function