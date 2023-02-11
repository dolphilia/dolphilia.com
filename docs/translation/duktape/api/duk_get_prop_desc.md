## duk_get_prop_desc() 

2.0.0 sandbox property

### プロトタイプ

```c
void duk_get_prop_desc(duk_context *ctx, duk_idx_t obj_idx, duk_uint_t flags);
```

### スタック

| ... | obj | ... | key -> | ... | obj | ... | desc | (if property exists)
| ... | obj | ... | key -> | ... | obj | ... | undefined | (if property doesn't exist)

### 要約

C API の Object.getOwnPropertyDescriptor() と同等： obj_idx にあるオブジェクトの名前付きプロパティに対するプロパティ記述子オブジェクトをプッシュします。ターゲットがオブジェクトでない場合 (またはインデックスが無効な場合) は、エラーがスローされます。

フラグはまだ定義されていないので、フラグには 0 を使用します。


### 例

```c
duk_idx_t obj_idx = /* ... */;

/* Check if property "my_prop" is a getter. */

duk_push_string(ctx, "my_prop");
duk_get_prop_desc(ctx, obj_idx, 0 /*flags*/);
if (duk_is_object(ctx, -1)) {
  /* Property found. */
  if (duk_has_prop_string(ctx, -1, "get")) {
    printf("my_prop is a getter\n");
  } else {
    printf("my_prop is not a getter\n");
  }
} else {
  printf("my_prop not found\n");
}
```

### 参照

duk_def_prop