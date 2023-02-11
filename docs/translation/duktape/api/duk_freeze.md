## duk_freeze() 

2.2.0 property object

### プロトタイプ

```c
void duk_freeze(duk_context *ctx, duk_idx_t obj_idx);
```

### スタック

(バリュースタックに影響なし)


### 要約

obj_idx にあるオブジェクトの Object.freeze() に相当します。凍結されると、オブジェクトは自動的にコンパクト化されます。凍結された場合、オブジェクトは自動的に圧縮されます。インデックスが無効な場合、エラーがスローされます。


### 例

```c
duk_freeze(ctx, -3);
```