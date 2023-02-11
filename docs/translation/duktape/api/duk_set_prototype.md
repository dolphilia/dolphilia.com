## duk_set_prototype() 

1.0.0 prototype object

### プロトタイプ

```c
void duk_set_prototype(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | proto | -> | ... | val | ... |

### 要約

idx の値の内部プロトタイプをスタックの先頭の値（オブジェクトまたは未定義でなければならない）に設定します。対象値がオブジェクトでない場合、またはプロトタイプ値がオブジェクトまたは未定義 でない場合は、エラーをスローします。

ECMAScript のプロトタイプ操作プリミティブと異なり、本 API コールはプロトタイプループを作成することができます。Duktapeは長いプロトタイプ・チェーンやループしたプロトタイプ・チェーンを検出してエラーを投げますが、そのような動作は無限ループを避けるための最後の手段としてのみ意図されています。

### 例

```c
/* Create new object, internal prototype is Object.prototype by default. */
duk_push_object(ctx);

/* Change the object's internal prototype to object at index -3. */
duk_dup(ctx, -3);
duk_set_prototype(ctx, -2);  /* [ obj proto ] -> [ obj ] */
```

### 参照

duk_get_prototype