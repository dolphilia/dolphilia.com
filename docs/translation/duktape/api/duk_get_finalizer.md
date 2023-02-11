## duk_get_finalizer() 

1.0.0 object finalizer

### プロトタイプ

```c
void duk_get_finalizer(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | val | ... | finalizer |

### 要約

idxの値に関連するファイナライザを取得します。値がオブジェクトでない場合、またはファイナライザを持たないオブジェクトである場合、代わりにundefinedがスタックにプッシュされます。


### 例

```c
/* Get the finalizer of an object at index -3. */
duk_get_finalizer(ctx, -3);
```

### 参照

duk_set_finalizer