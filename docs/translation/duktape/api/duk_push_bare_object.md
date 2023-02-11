## duk_push_bare_object() 

2.0.0 stack object

### プロトタイプ

```c
duk_idx_t duk_push_bare_object(duk_context *ctx);
```

### スタック

| ... | -> | ... | obj |

### 要約

duk_push_object() と似ていますが、プッシュされたオブジェクトは他のオブジェクトを継承していません、つまり、その内部プロトタイプはヌルです。この呼び出しは、Object.create(null) と同じです。プッシュされたオブジェクトの非負のインデックス（スタックの底からの相対値）を返します。


### 例

```c
duk_idx_t obj_idx;

obj_idx = duk_push_bare_object(ctx);
```

### 参照

duk_push_object
duk_push_bare_array