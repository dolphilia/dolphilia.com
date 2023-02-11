## duk_to_object() 

1.0.0 stack object

### プロトタイプ

```c
void duk_to_object(duk_context *ctx, duk_idx_t idx);
```

### スタック

| ... | val | ... | -> | ... | ToObject(val) | ... |

### 要約

idx の値を ECMAScript の ToObject() で強制された値で置き換えます。戻り値はない。idx の値がオブジェクト強制でない場合、または idx が無効な場合、エラーを投げます。。

以下の型はオブジェクト互換性がない。

- undefined
- null

カスタムタイプの動作: タイプアルゴリズム参照。特に、プレーンなバッファの値は、同等のUint8Arrayオブジェクトに変換されることに注意してください。


### 例

```c
duk_to_object(ctx, -3);
```