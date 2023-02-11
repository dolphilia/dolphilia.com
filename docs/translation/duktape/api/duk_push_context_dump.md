## duk_push_context_dump() 

1.0.0 stack debug

### プロトタイプ

```c
void duk_push_context_dump(duk_context *ctx);
```

### スタック

| ... | -> | ... | str |

### 要約

コンテキスト ctx の現在のアクティブ化の状態を要約した一行文字列をプッシュします。これは Duktape/C コードのデバッグに有用であり、実稼働環境での使用は意図していない。

正確なダンプ内容はバージョンに依存します。現在のフォーマットでは、スタック・トップ（スタック上の要素数）を含み、現在の要素をJXフォーマット（Duktapeのカスタム拡張JSONフォーマット）の値の配列としてプリントアウトします。以下の例では、次のようなものがプリントされます。

```sh
ctx: top=2, stack=[123,"foo"]
```

プロダクションコードにダンプコールを残しておくべきではありません。

### 例

```c
duk_push_int(ctx, 123);
duk_push_string(ctx, "foo");
duk_push_context_dump(ctx);
printf("%s\n", duk_to_string(ctx, -1));
duk_pop(ctx);
```