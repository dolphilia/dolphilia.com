# デバッグプリントを有効にする方法

## Duktape 1.x

- DUK_OPT_DEBUGを有効にする / DUK_USE_DEBUG
- DUK_OPT_DPRINTを有効にする / DUK_USE_DPRINT 最小限のログを取得する。
- DUK_OPT_DDPRINTも有効にする / DUK_USE_DDPRINT 詳細なログを出力する場合
- DUK_OPT_DDDPRINTも有効にする / DUK_USE_DDDPRINT 非常に冗長なログを出力します。

ログは標準エラー出力に書き込まれます。

## Duktape 2.x

- Enable DUK_USE_DEBUG
- DUK_USE_DEBUG_LEVEL=`<n>`を定義する。nは最小ログを0、冗長ログを1、超冗長ログを2にする。
- DUK_USE_DEBUG_WRITE(level,file,line,func,msg) を定義して、ログエントリを書き出す; これにより、デバッグログがどこに行くかを完全に制御できる

手動で編集した duk_config.h の DUK_USE_DEBUG_WRITE の例です。

```c
#define DUK_USE_DEBUG_WRITE(level,file,line,func,msg) do { \
        fprintf(stderr, "D%ld %s:%d (%s): %s\n", \
                (long) (level), (file), (long) (line), (func), (msg));
    } while (0)
```

tools/configure.py の引数と同じ関数です。

```
'-DDUK_USE_DEBUG_WRITE(level,file,line,func,msg)=do {fprintf(stderr, "D%ld %s:%ld (%s): %s\n", (long) (level), (file), (long) (line), (func), (msg));} while(0)'
```