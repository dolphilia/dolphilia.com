## duk_get_prototype() 

1.0.0 prototy pe object

### プロトタイプ

```c
void duk_get_prototype(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | val | ... | proto |

### 要約

idx にある値の内部プロトタイプを取得します。値がオブジェクトでない場合、エラーがスローされます。オブジェクトがプロトタイプを持たない場合（これは「裸のオブジェクト」に対して可能である）、代わりにundefinedがスタックにプッシュされます。


### 例

```c
/* Get the internal prototype of an object at index -3. */
duk_get_prototype(ctx, -3);
```

### 参照

duk_set_prototype