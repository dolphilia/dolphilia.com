# フィルタの拡張

フィルタは基本的に変数に適用することができる関数です。パイプ演算子 (`|`) を使って呼び出され、引数を取ることができます。

```
{{ foo | title }}
{{ foo | join(",") }}
{{ foo | replace("foo", "bar") | capitalize }}
```

### 新規フィルターの定義

プラグインは、そのエントリポイントで `filters` スコープの下にカスタム関数を定義することで、フィルタを拡張することができます。

フィルタリング関数は、フィルタリングするコンテンツを第一引数として受け取り、新しいコンテンツを返す必要があります。
`this` と HonKit API について詳しくは [Context and APIs](./api.md) を参照してください。

```js
module.exports = {
    filters: {
        hello: function(name) {
            return 'Hello '+name;
        }
    }
};
```

すると`hello`というフィルターが本の中で使えるようになります。

```
{{ "Aaron"|hello }}, how are you?
```

### ブロック引数の扱い

フィルターに引数を渡すことができます。

```
Hello {{ "Samy"|fullName("Pesse", man=true}} }}
```

引数は関数に渡され、名前付き引数は最後の引数（オブジェクト）として渡されます。

```js
module.exports = {
    filters: {
        fullName: function(firstName, lastName, kwargs) {
            var name = firstName + ' ' + lastName;

            if (kwargs.man) name = "Mr" + name;
            else name = "Mrs" + name;

            return name;
        }
    }
};
```
