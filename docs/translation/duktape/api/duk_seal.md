## duk_seal() 

2.2.0 property object

### プロトタイプ

```c
void duk_seal(duk_context *ctx, duk_idx_t obj_idx);
```

### スタック

(バリュースタックには影響しません。)


### 要約

obj_idx にあるオブジェクトの Object.seal() に相当します。seal されると、オブジェクトは自動的にコンパクト化されます。封印された場合、オブジェクトは自動的に圧縮されます。インデックスが無効な場合、エラーがスローされます。


### 例

```c
duk_seal(ctx, -3);
```