## duk_push_pointer() 

1.0.0 stack

### プロトタイプ

```c
void duk_push_pointer(duk_context *ctx, void *p);
```

### スタック

| ... | -> | ... | ptr |

### 要約

pをポインタ値としてスタックに押し込んでください。Duktapeはこのポインタを何ら解釈しません。


### 例

```c
struct mystruct *p = /* ... */;

duk_push_pointer(ctx, (void *) p);
```