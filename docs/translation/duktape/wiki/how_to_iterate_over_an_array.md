# 配列を繰り返し処理する方法

## ECMAScript コード

配列を繰り返し処理する最も速い方法は、次のとおりです。

```js
var i, n, e;
for (i = 0, n = arr.length; i < n; i++) {
    e = arr[i];
    // operate on 'e'
}
```

ループ条件（i < arr.length）で .length を調べるのは少し遅く、arr.forEach()を使うのはかなり遅くなります。

## ネイティブコード

基本的なアプローチは、配列の長さを取得するために duk_get_length() を使用し、配列の要素を要求するために duk_get_prop_index() を使用します。

```c
duk_size_t i, n;

n = duk_get_length(ctx, idx_target);
for (i = 0; i < n; i++) {
    duk_get_prop_index(ctx, idx_target, i);
    /* ... */
    duk_pop(ctx);
}
```

明示的に配列をチェックしない場合、ループはforでも動作します。

- .length プロパティを持つオブジェクト (バッファオブジェクト、型付き配列ビューなど)
- プレーンな文字列 (コードポイントに対する反復処理)
- プレーンなバッファ（バイト単位での繰り返し処理）

これが好ましくない場合は、duk_is_array() を使って値の型をチェックします。

```c
duk_size_t i, n;

if (!duk_is_array(ctx, idx_target)) {
    /* 配列でない */
    return;
}

n = duk_get_length(ctx, idx_target);
for (i = 0; i < n; i++) {
    duk_get_prop_index(ctx, idx_target, i);
    /* ... */
    duk_pop(ctx);
}
```

欠落した要素を（単に未定義の値のように扱うのではなく）特別に処理する必要がある場合。

```c
duk_size_t i, n;

n = duk_get_length(ctx, idx_target);
for (i = 0; i < n; i++) {
    if (duk_get_prop_index(ctx, idx_target, i)) {
        /* 要素が存在する */
    } else {
        /* 要素が存在しない */
    }
    duk_pop(ctx);
}
```