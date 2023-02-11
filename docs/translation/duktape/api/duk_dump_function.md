## duk_dump_function() 

1.3.0 stack bytecode

### プロトタイプ

```c
void duk_dump_function(duk_context *ctx);
```

### スタック

| ... | function | -> | ... | bytecode |

### 要約

スタックトップにある ECMAScript 関数をバイトコードにダンプし、関数をバイトコードデータを含むバッファに置き換えます。バイトコードは duk_load_function() を使ってロードバックすることができます。

Duktapeバイトコードダンプ/ロード、サポートされる機能、および既知の制限に関するより多くの情報については、bytecode.rstを参照してください。Duktapeバイトコード・フォーマットは難読化を意図したものではありませんので、難読化に関する注記を参照してください。

### 例

```c
duk_eval_string(ctx, "(function helloWorld() { print('hello world'); })");
duk_dump_function(ctx);
/* stack top now contains a buffer containing helloWorld bytecode */
```

### 参照

duk_load_function